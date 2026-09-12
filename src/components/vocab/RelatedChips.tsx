/**
 * RelatedChips — the row of "see also" terms that appears at the
 * bottom of a concept card and at the bottom of a flipped study card.
 *
 * Each chip is a plain `<button>` (not a `<Link>`) so its onClick is
 * guaranteed to run. react-router 7's `<Link>` swallows the user-supplied
 * `onClick` when `isSpaLink` is true (which is the default) — the Link
 * uses its own `handleClick` and never invokes our prop. That made
 * earlier chips no-op: `e.preventDefault()` + `goToTerm()` were dead
 * code, and the user saw "the chip does nothing" even though the
 * `to="#term-…"` href looked right.
 *
 * On click we:
 *   1. Set `?tab=all&subject=…&slug=…&focus=…` via setSearchParams so
 *      the page filter pins to the term's lesson (VocabPage reads the
 *      focus param and runs the scroll + ring-flash effect).
 *   2. As a belt-and-suspenders fallback, also call scrollIntoView
 *      directly — the term is already in the DOM (the current scope
 *      contains it in 99% of cases), so we don't need to wait for a
 *      re-render.
 *   3. Clear the focus param after 800ms so a hard refresh doesn't
 *      reopen straight onto that term.
 *
 * On hover, a small tooltip shows the Chinese translation (looked
 * up via `findTermChinese`). The hover works on touch too — a
 * tap-and-hold shows the tooltip via CSS focus-within.
 */
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { T } from '@/components/i18n/T'
import { VOCAB } from '@/lib/vocabStrings'
import { findFirstTerm, findTermChinese } from '@/lib/termIndex'

export function RelatedChips({
  termIds,
  current,
}: {
  termIds: string[]
  current: string
}) {
  const [, setSearchParams] = useSearchParams()
  const [openTermId, setOpenTermId] = useState<string | null>(null)

  const filtered = termIds.filter((t) => t !== current)
  if (filtered.length === 0) return null

  const goToTerm = (termId: string) => {
    const loc = findFirstTerm(termId)
    setSearchParams(
      (prev) => {
        const out = new URLSearchParams(prev)
        out.set('tab', 'all')
        out.set('subject', loc?.subject ?? 'all')
        out.set('slug', loc?.slug ?? 'all')
        out.set('focus', termId)
        return out
      },
      { replace: true }
    )
    // The anchor scroll happens after the next paint; clear the focus
    // param once we've scrolled so a hard refresh doesn't open straight
    // to that term.
    setTimeout(() => {
      setSearchParams(
        (prev) => {
          const out = new URLSearchParams(prev)
          out.delete('focus')
          return out
        },
        { replace: true }
      )
    }, 800)
  }

  return (
    <div className="mt-3 flex flex-wrap items-center gap-1 border-t border-line pt-2">
      <span className="text-[10px] uppercase tracking-wide text-muted">
        <T value={VOCAB.relatedLabel} />
      </span>
      {filtered.map((t) => {
        const zh = findTermChinese(t, current)
        return (
          <span
            key={t}
            className="relative"
            onMouseEnter={() => setOpenTermId(t)}
            onMouseLeave={() => setOpenTermId((cur) => (cur === t ? null : cur))}
            onFocus={() => setOpenTermId(t)}
            onBlur={() => setOpenTermId((cur) => (cur === t ? null : cur))}
          >
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault()
                goToTerm(t)
                // The term is usually already in the DOM (the current
                // scope contains it for same-lesson related terms);
                // scroll directly so the user gets feedback even if
                // the focus effect races with the focus-param-clear
                // timeout. VocabPage's focus effect will run too and
                // add the ring flash; this is a parallel path, not a
                // duplicate, so re-clicking works reliably.
                requestAnimationFrame(() => {
                  const el = document.getElementById(`term-${t}`)
                  el?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                })
              }}
              className="inline-flex items-center gap-1 rounded-full border border-teal-300 bg-teal-50 px-2.5 py-0.5 text-[11px] text-teal-800 transition-colors hover:border-teal-500 hover:bg-teal-100 hover:text-teal-900"
              title={zh ?? t}
            >
              {t}
              {zh && zh !== t && (
                <span className="text-[10px] text-teal-700/70">译</span>
              )}
            </button>
            {openTermId === t && zh && (
              <span
                role="tooltip"
                className="pointer-events-none absolute left-1/2 top-full z-20 mt-1 -translate-x-1/2 whitespace-nowrap rounded-md border border-line bg-ink px-2 py-1 text-[11px] text-white shadow-md"
              >
                {zh}
              </span>
            )}
          </span>
        )
      })}
    </div>
  )
}

// Re-export for legacy imports — some files import from this module
// under the same name as before.
export { RelatedChips as default }
