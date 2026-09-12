import { useCallback, useEffect, useRef, useState } from 'react'
import { isTranslatable, translate, type TranslationResult } from '@/lib/translator'
import { useTranslatorEnabled } from '@/lib/translatorEnabled'
import {
  TRANSLATOR_BUTTON_GLYPH,
  TRANSLATOR_BUTTON_LABEL,
  TRANSLATOR_CLOSE_LABEL,
  TRANSLATOR_COPIED_LABEL,
  TRANSLATOR_COPY_LABEL,
  TRANSLATOR_LOADING_TEXT,
  TRANSLATOR_POPOVER_TITLE,
  TRANSLATOR_SOURCE_LANG_TAG,
  TRANSLATOR_TARGET_LANG_TAG,
} from '@/lib/translatorGlyphs'

/**
 * Page-level selection translator.
 *
 * Behaviour:
 *
 * 1. While the feature is off (controlled by the header toggle), this component
 *    is a no-op. The existing `LangToggle` is still the primary language
 *    affordance; this is the on-demand fallback.
 *
 * 2. On mouseup/touchend, if the user has a non-collapsed text selection that
 *    passes the `isTranslatable` filter and is not inside our own floating UI,
 *    we render a small "Translate" affordance positioned just above the
 *    selection.
 *
 * 3. Clicking the affordance calls MyMemory, cancels any in-flight request,
 *    and renders the result in a popover that sits above the affordance. The
 *    popover flips below the selection if there is no room above, and shifts
 *    horizontally to stay on-screen.
 *
 * 4. The popover closes on outside click, Escape, scroll, or selecting
 *    different text.
 *
 * Why a portal-style fixed-position layer rather than DOM insertion near the
 * selection: avoids reflow when the user scrolls the selection out of view,
 * keeps the rest of the page unaware of the translator's existence, and
 * guarantees we never accidentally translate our own UI.
 *
 * Why we ignore selections inside <input>/<textarea>/contenteditable: those
 * are typically the student's own notes or the search box, and the cursor
 * makes the selection meaningless as a "translate this phrase" gesture.
 */
export function SelectionTranslator() {
  const [enabled] = useTranslatorEnabled()

  // Why a discriminated state machine rather than a constellation of booleans:
  // the three things (button visible, popover visible, current result) have to
  // move together, and we need to be able to invalidate a stale "loading"
  // state when the user picks a new selection mid-flight.
  type Mode =
    | { kind: 'idle' }
    | { kind: 'button'; rect: DOMRect; text: string }
    | {
        kind: 'popover'
        rect: DOMRect
        text: string
        status: 'loading' | 'done' | 'error'
        result?: TranslationResult
      }

  const [mode, setMode] = useState<Mode>({ kind: 'idle' })
  const containerRef = useRef<HTMLDivElement | null>(null)
  const inFlightRef = useRef<AbortController | null>(null)

  const close = useCallback(() => {
    inFlightRef.current?.abort()
    inFlightRef.current = null
    setMode({ kind: 'idle' })
  }, [])

  /**
   * Read the current selection and decide whether to show the button.
   *
   * `mouseup` (not `selectionchange`) because we want the gesture finished —
   * the user has lifted the mouse, the selection is stable. Listening to
   * `selectionchange` fires on every cursor move and would flicker.
   */
  const handleSelectionFinished = useCallback(() => {
    if (!enabled) return

    // Defer to next frame so the browser has finalised the selection rect
    // after the mouseup event fires.
    requestAnimationFrame(() => {
      // IMPORTANT: every setState here uses the *functional* form and checks
      // `prev.kind === 'popover'`. The mouseup that follows a click on our
      // own button arrives *after* the click that opened the popover, so the
      // closure's `mode` is stale. Without the prev check, a button click
      // would: open the popover, then have the trailing mouseup immediately
      // dismiss it because the selection has been cleared by the button's
      // own mousedown.
      const sel = window.getSelection()
      if (!sel || sel.rangeCount === 0) {
        setMode((prev) => (prev.kind === 'popover' ? prev : { kind: 'idle' }))
        return
      }
      const range = sel.getRangeAt(0)
      const text = sel.toString()
      if (!isTranslatable(text)) {
        setMode((prev) => (prev.kind === 'popover' ? prev : { kind: 'idle' }))
        return
      }
      if (isInsideFormField(range.startContainer)) return
      if (isInsideOwnUi(range.startContainer)) return

      const rect = range.getBoundingClientRect()
      if (rect.width === 0 && rect.height === 0) {
        setMode((prev) => (prev.kind === 'popover' ? prev : { kind: 'idle' }))
        return
      }

      // If a popover is already open for the same text, don't reset it
      // (otherwise selecting the same word twice while reading the result
      // would dismiss the result).
      setMode((prev) => {
        if (prev.kind === 'popover' && prev.text === text.trim()) return prev
        return { kind: 'button', rect, text: text.trim() }
      })
    })
  }, [enabled])

  const requestTranslation = useCallback(() => {
    if (mode.kind !== 'button') return
    const { rect, text } = mode

    inFlightRef.current?.abort()
    const ac = new AbortController()
    inFlightRef.current = ac

    setMode({ kind: 'popover', rect, text, status: 'loading' })

    translate(text, { signal: ac.signal }).then((result) => {
      // Discard stale results — user may have picked a new selection.
      if (ac.signal.aborted) return
      if (inFlightRef.current !== ac) return
      setMode((prev) => {
        if (prev.kind !== 'popover' || prev.text !== text) return prev
        return {
          ...prev,
          status: result.ok ? 'done' : 'error',
          result,
        }
      })
    })
  }, [mode])

  // Global listeners. We only attach the heavy ones when enabled, so the
  // off-by-default experience has zero overhead. We also abort any in-flight
  // request when the feature is disabled, so a translation that was queued
  // half a second ago cannot pop up after the user turned the feature off.
  useEffect(() => {
    if (!enabled) {
      inFlightRef.current?.abort()
      inFlightRef.current = null
      return
    }
    document.addEventListener('mouseup', handleSelectionFinished)
    document.addEventListener('touchend', handleSelectionFinished)
    return () => {
      document.removeEventListener('mouseup', handleSelectionFinished)
      document.removeEventListener('touchend', handleSelectionFinished)
    }
  }, [enabled, handleSelectionFinished])

  // Dismiss on outside click, Escape, scroll, or resize.
  useEffect(() => {
    if (mode.kind === 'idle') return

    const onDocMouseDown = (e: MouseEvent) => {
      if (containerRef.current && e.target instanceof Node && containerRef.current.contains(e.target)) {
        return
      }
      close()
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    const onScroll = () => close()
    const onResize = () => close()

    document.addEventListener('mousedown', onDocMouseDown)
    document.addEventListener('keydown', onKey)
    window.addEventListener('scroll', onScroll, true)
    window.addEventListener('resize', onResize)
    return () => {
      document.removeEventListener('mousedown', onDocMouseDown)
      document.removeEventListener('keydown', onKey)
      window.removeEventListener('scroll', onScroll, true)
      window.removeEventListener('resize', onResize)
    }
  }, [mode, close])

  if (!enabled || mode.kind === 'idle') return null

  return (
    <div ref={containerRef} className="translator-layer" data-translator-root="">
      {mode.kind === 'button' && (
        <TranslatorButton rect={mode.rect} onClick={requestTranslation} />
      )}
      {mode.kind === 'popover' && (
        <TranslatorPopover
          rect={mode.rect}
          text={mode.text}
          status={mode.status}
          result={mode.result}
          onClose={close}
        />
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/**
 * Selection starting inside an `<input>`, `<textarea>`, or contenteditable
 * host? Skip — the user is interacting with a form, not selecting prose.
 */
function isInsideFormField(node: Node): boolean {
  let cur: Node | null = node
  while (cur) {
    if (cur instanceof HTMLElement) {
      const tag = cur.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return true
      if (cur.isContentEditable) return true
    }
    cur = cur.parentNode
  }
  return false
}

/**
 * Did the selection start inside our own floating UI? If so, ignore it —
 * otherwise selecting the translation result would re-trigger the translator.
 */
function isInsideOwnUi(node: Node): boolean {
  let cur: Node | null = node
  while (cur) {
    if (cur instanceof Element && cur.closest('[data-translator-root]')) return true
    cur = cur.parentNode
  }
  return false
}

// ---------------------------------------------------------------------------
// Floating button
// ---------------------------------------------------------------------------

interface TranslatorButtonProps {
  rect: DOMRect
  onClick: () => void
}

function TranslatorButton({ rect, onClick }: TranslatorButtonProps) {
  const placement = computeButtonPlacement(rect)
  return (
    <button
      type="button"
      onMouseDown={(e) => {
        // Prevent the click from clearing the selection before we can read it.
        e.preventDefault()
      }}
      onClick={onClick}
      className="translator-btn"
      style={{
        position: 'fixed',
        left: placement.left,
        top: placement.top,
      }}
      aria-label="Translate selection"
    >
      <span className="translator-btn-glyph" aria-hidden="true">
        {TRANSLATOR_BUTTON_GLYPH}
      </span>
      <span className="translator-btn-label">{TRANSLATOR_BUTTON_LABEL}</span>
    </button>
  )
}

function computeButtonPlacement(rect: DOMRect) {
  const margin = 8
  const buttonWidth = 96
  const buttonHeight = 30

  // Centre horizontally over the selection, clamp to viewport.
  const selectionCenterX = rect.left + rect.width / 2
  const left = Math.max(margin, Math.min(window.innerWidth - buttonWidth - margin, selectionCenterX - buttonWidth / 2))

  // Default: place just above the selection. If there isn't room (selection
  // very near the top), flip below.
  const spaceAbove = rect.top
  const placeAbove = spaceAbove > buttonHeight + margin * 2

  const top = placeAbove
    ? Math.max(margin, rect.top - buttonHeight - margin)
    : Math.min(window.innerHeight - buttonHeight - margin, rect.bottom + margin)

  return { left, top }
}

// ---------------------------------------------------------------------------
// Popover
// ---------------------------------------------------------------------------

interface TranslatorPopoverProps {
  rect: DOMRect
  text: string
  status: 'loading' | 'done' | 'error'
  result: TranslationResult | undefined
  onClose: () => void
}

function TranslatorPopover({ rect, text, status, result, onClose }: TranslatorPopoverProps) {
  const placement = computePopoverPlacement(rect)
  return (
    <div
      className="translator-popover"
      role="dialog"
      aria-label="Translation"
      style={{
        position: 'fixed',
        left: placement.left,
        top: placement.top,
        width: placement.width,
      }}
    >
      <header className="translator-popover-head">
        <span className="translator-popover-title">{TRANSLATOR_POPOVER_TITLE}</span>
        <button
          type="button"
          onClick={onClose}
          className="translator-popover-close"
          aria-label={TRANSLATOR_CLOSE_LABEL}
        >
          ×
        </button>
      </header>

      <div className="translator-popover-body">
        <div className="translator-popover-source">
          <span className="translator-popover-lang-tag">{TRANSLATOR_SOURCE_LANG_TAG}</span>
          <span className="translator-popover-text">{text}</span>
        </div>

        <div className="translator-popover-divider" aria-hidden="true" />

        <div className="translator-popover-target">
          <span className="translator-popover-lang-tag">{TRANSLATOR_TARGET_LANG_TAG}</span>
          <div className="translator-popover-text">
            {status === 'loading' && (
              <span className="translator-popover-loading">{TRANSLATOR_LOADING_TEXT}</span>
            )}
            {status === 'error' && (
              <span className="translator-popover-error">{errorMessage(result)}</span>
            )}
            {status === 'done' && result?.ok && <span lang="zh-CN">{result.text}</span>}
          </div>
        </div>
      </div>

      {status === 'done' && result?.ok && (
        <footer className="translator-popover-foot">
          <CopyButton text={result.text} />
          {result.match > 0 && (
            <span className="translator-popover-meta">match {Math.round(result.match * 100)}%</span>
          )}
          {result.cached && <span className="translator-popover-meta">cached</span>}
        </footer>
      )}
    </div>
  )
}

function errorMessage(result: TranslationResult | undefined): string {
  if (!result || result.ok) return 'Translation failed.'
  switch (result.error.kind) {
    case 'empty':
      return 'Nothing to translate.'
    case 'too-long':
      return `Selection is too long (${result.error.length} characters; max ${result.error.max}).`
    case 'network':
      return `Network error: ${result.error.message}`
    case 'http':
      return `Server error ${result.error.status}: ${result.error.message}`
    case 'parse':
      return 'Could not parse the translation response.'
    case 'quota':
      return 'Translation quota exhausted. Try again later.'
    case 'timeout':
      return 'Translation timed out. Check your connection.'
  }
}

function computePopoverPlacement(rect: DOMRect) {
  const margin = 8
  const minWidth = 280
  const maxWidth = 360
  const naturalWidth = Math.min(maxWidth, Math.max(minWidth, rect.width + 80))
  const estimatedHeight = 160

  // Centre horizontally over the selection, clamp to viewport.
  const selectionCenterX = rect.left + rect.width / 2
  const left = Math.max(
    margin,
    Math.min(window.innerWidth - naturalWidth - margin, selectionCenterX - naturalWidth / 2)
  )

  // Default: above the button (which is above the selection). If the
  // selection is high on the page, the button flips below, so the popover
  // should also flip.
  const buttonHeight = 30
  const spaceAbove = rect.top - buttonHeight - margin
  const placeAbove = spaceAbove > estimatedHeight + margin

  const top = placeAbove
    ? Math.max(margin, rect.top - buttonHeight - margin - estimatedHeight)
    : Math.min(window.innerHeight - estimatedHeight - margin, rect.bottom + buttonHeight + margin)

  return { left, top, width: naturalWidth }
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      type="button"
      className="translator-popover-copy"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text)
          setCopied(true)
          setTimeout(() => setCopied(false), 1500)
        } catch {
          // Clipboard may be blocked (insecure context); fail silently — the
          // user can still select the text manually.
        }
      }}
    >
      {copied ? TRANSLATOR_COPIED_LABEL : TRANSLATOR_COPY_LABEL}
    </button>
  )
}
