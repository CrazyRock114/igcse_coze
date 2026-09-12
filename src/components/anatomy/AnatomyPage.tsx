import { Suspense, lazy, useEffect, useMemo, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import type {
  AnatomyOrgan,
  DnaHelix3DExtra,
  FoodWeb3DExtra,
  HeartAnatomyExtra,
  Lesson,
  LessonExtra,
  OrganAnatomyExtra,
} from '@/content/types'
import { findLesson } from '@/lib/registry'
import { T } from '@/components/i18n/T'
import { ANATOMY_3D } from '@/lib/lessonExtrasStrings'
import { assetUrl } from '@/lib/assetUrl'

// Same lazy treatment as the in-lesson 3D extras: these two fullscreen
// viewers import three.js, and AnatomyPage itself is reached from the
// entry chunk — without lazy() the whole three.js library would land in
// the first-load bundle.
const DnaHelixFullscreen = lazy(() =>
  import('./DnaHelixFullscreen').then((m) => ({ default: m.DnaHelixFullscreen }))
)
const FoodWebFullscreen = lazy(() =>
  import('./FoodWebFullscreen').then((m) => ({ default: m.FoodWebFullscreen }))
)

// Same lazy chunk as the in-lesson 3D tab — only downloads the first time
// the student opens either the tab or this page.
const Anatomy3D = lazy(() =>
  import('@/components/lesson-extras/Anatomy3D').then((m) => ({ default: m.Anatomy3D }))
)

/**
 * Fullscreen 3D anatomy viewer. The whole page is the canvas; the part
 * details and the part list float over it as overlay panels, the way a
 * gallery viewer does. Modelled on the Anatomy Atelier layout — heart
 * centred, fills ~70% of the viewport, no fixed sidebar eating space.
 *
 * Includes an Edit mode: the user can flip a toggle, then click a pin
 * and nudge its [x, y, z] via three sliders, watching the dot move in
 * real time. When they're happy, "Copy JSON" puts the full set of
 * overrides on the clipboard, ready to paste into the lesson's TS
 * file. The lesson's source-of-truth `position3d` is left untouched —
 * overrides are a session-only view of the work-in-progress.
 */
export function AnatomyPage() {
  const { subject, slug } = useParams<{ subject: string; slug: string }>()
  const lesson = subject && slug ? findLesson(subject, slug) : undefined
  const extra = useMemo(
    () => (lesson ? find3DExtra(lesson) : undefined),
    [lesson]
  )

  if (!lesson) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="text-2xl font-bold">Lesson not found</h1>
        <Link
          to={`/lesson/${subject ?? ''}/${slug ?? ''}`}
          className="mt-4 inline-block text-accent hover:underline"
        >
          ← Back to all lessons
        </Link>
      </main>
    )
  }

  if (!extra) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="text-2xl font-bold">No 3D model for this lesson</h1>
        <p className="mt-2 text-sm text-muted">
          This lesson doesn't have a 3D viewer wired up yet.
        </p>
        <Link
          to={`/lesson/${lesson.subject}/${lesson.slug}`}
          className="mt-4 inline-block text-accent hover:underline"
        >
          ← Back to the lesson
        </Link>
      </main>
    )
  }

  // Dispatch by extra type: GLB-based extras share the heart's fullscreen
  // surface (with Edit mode for pin calibration); procedural 3D extras
  // (DNA helix, food web) get their own fullscreen views.
  if (extra.type === 'heart-anatomy' || extra.type === 'organ-anatomy') {
    return <GLSurfaceView lesson={lesson} extra={extra} />
  }
  if (extra.type === 'dna-helix-3d') {
    return (
      <Suspense fallback={<FullScreen3DFallback />}>
        <DnaHelixFullscreen lesson={lesson} extra={extra} />
      </Suspense>
    )
  }
  // food-web-3d
  return (
    <Suspense fallback={<FullScreen3DFallback />}>
      <FoodWebFullscreen lesson={lesson} extra={extra} />
    </Suspense>
  )
}

function GLSurfaceView({
  lesson,
  extra,
}: {
  lesson: Lesson
  extra: HeartAnatomyExtra | OrganAnatomyExtra
}) {
  const parts = extra.parts
  const [selectedId, setSelectedId] = useState<string | null>(extra.initialPart ?? null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [listOpen, setListOpen] = useState(false)
  const [autoRotate, setAutoRotate] = useState(true)
  const [selectedScreenPos, setSelectedScreenPos] = useState<{ x: number; y: number } | null>(null)
  const [viewport, setViewport] = useState<{ w: number; h: number }>({ w: 0, h: 0 })
  const canvasWrapRef = useRef<HTMLDivElement>(null)

  // Edit mode + the per-pin [0,1] overrides the user has dialled in.
  // Lives here, not in the viewer, so the lesson's `position3d` stays
  // the source of truth and a refresh wipes the in-progress work.
  const [editMode, setEditMode] = useState(false)
  const [pinOverrides, setPinOverrides] = useState<Record<string, [number, number, number]>>({})
  const [editingId, setEditingId] = useState<string | null>(null)
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle')

  const selected: AnatomyOrgan | null = useMemo(
    () => parts.find((p) => p.id === selectedId) ?? null,
    [parts, selectedId]
  )

  // Track the canvas wrapper's size so the screen→viewport math matches
  // what the renderer sees.
  useEffect(() => {
    const el = canvasWrapRef.current
    if (!el) return
    const ro = new ResizeObserver((entries) => {
      const r = entries[0]?.contentRect
      if (r) setViewport({ w: r.width, h: r.height })
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // Keyboard shortcuts: arrow keys step through parts, Esc clears. Edit
  // mode suppresses selection-side-effects; arrow keys still cycle which
  // part is being edited, but callout/leader-line stay quiet so the
  // sliders stay readable.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (editMode) {
          setEditingId(null)
        } else {
          setSelectedId(null)
          setListOpen(false)
        }
      } else if (e.key === 'ArrowRight' || e.key === ']') {
        const list = editMode && editingId ? [editingId] : parts.map((p) => p.id)
        const cur = editMode ? editingId : selectedId
        const i = list.indexOf(cur ?? '')
        const next = list[(i + 1 + list.length) % list.length]
        if (next) (editMode ? setEditingId : setSelectedId)(next)
      } else if (e.key === 'ArrowLeft' || e.key === '[') {
        const list = editMode && editingId ? [editingId] : parts.map((p) => p.id)
        const cur = editMode ? editingId : selectedId
        const i = list.indexOf(cur ?? '')
        const next = list[(i - 1 + list.length) % list.length]
        if (next) (editMode ? setEditingId : setSelectedId)(next)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [parts, selectedId, editMode, editingId])

  // Visible position for any part: lesson value, falling back to a
  // neutral centre if there is none. Used by the editor panel and by
  // the leader-line target.
  const effectivePos = (id: string): [number, number, number] => {
    const ov = pinOverrides[id]
    if (ov) return ov
    const part = parts.find((p) => p.id === id)
    if (part?.position3d) return part.position3d
    return [0.5, 0.5, 0.5]
  }

  const handleCopy = async () => {
    // Bundle every override (and every lesson value the user has
    // touched) into a single JSON object the user can paste into the
    // lesson's TS file.
    const payload: Record<string, [number, number, number]> = {}
    for (const part of parts) {
      payload[part.id] = effectivePos(part.id)
    }
    const text = JSON.stringify(payload, null, 2)
    try {
      await navigator.clipboard.writeText(text)
      setCopyState('copied')
      setTimeout(() => setCopyState('idle'), 1800)
    } catch {
      setCopyState('failed')
      setTimeout(() => setCopyState('idle'), 1800)
    }
  }

  const handleResetOverrides = () => {
    setPinOverrides({})
    setEditingId(null)
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-canvas">
      <div ref={canvasWrapRef} className="absolute inset-0">
        <Suspense fallback={<FullScreen3DFallback />}>
          <FullScreen3D
            parts={parts}
            selectedId={selectedId}
            hoveredId={hoveredId}
            onSelect={(id) => {
              if (editMode) {
                setEditingId(id)
                setSelectedId(null)
              } else {
                setSelectedId(id)
              }
            }}
            onHover={setHoveredId}
            autoRotate={autoRotate}
            // Skip the per-frame screen-position reporter while in edit
            // mode: nothing is selected (the editor uses `editingId`),
            // so the only thing the reporter would do is setState
            // `null` 60 times a second and storm the parent into
            // 60 Hz re-renders. That storm is what made the slider
            // input feel stuck after the first change.
            onSelectedScreenPos={editMode ? undefined : setSelectedScreenPos}
            pinOverrides={editMode ? pinOverrides : undefined}
            editMode={editMode}
            onPinAdjust={(id) => setEditingId(id)}
            modelUrl={getModelUrl(extra)}
          />
        </Suspense>
      </div>

      <Header
        lesson={lesson}
        onToggleList={() => setListOpen((v) => !v)}
        listOpen={listOpen}
        editMode={editMode}
        onToggleEdit={() => {
          // Toggle edit mode and pause auto-rotate together. The whole
          // point of edit mode is to nudge pins to a precise 3D position
          // — a spinning model fights that, and worse, the 60 Hz render
          // loop competes with the slider's pointer events for the main
          // thread, which makes the slider feel "stuck" after the first
          // drag. Symmetric: pause when entering, resume when leaving.
          // Lint blocks doing this in a useEffect (set-state-in-effect);
          // toggling inside the click handler is the canonical pattern.
          const willEnter = !editMode
          setEditMode(willEnter)
          setAutoRotate(!willEnter)
          setSelectedId(null)
          setListOpen(false)
        }}
        overrideCount={Object.keys(pinOverrides).length}
        onCopy={handleCopy}
        onReset={handleResetOverrides}
        copyState={copyState}
        autoRotate={autoRotate}
        onAutoRotateChange={setAutoRotate}
      />

      {/* Floating part list (left). Toggle from the header. */}
      {listOpen && (
        <PartListOverlay
          parts={parts}
          selectedId={editMode ? editingId : selectedId}
          onSelect={(id) => {
            if (editMode) setEditingId(id)
            else setSelectedId(id)
            setListOpen(false)
          }}
          onClose={() => setListOpen(false)}
        />
      )}

      {/* Read-mode callout (right of the selected dot). */}
      {!editMode && selected && selectedScreenPos && viewport.w > 0 && (
        <Callout
          part={selected}
          parts={parts}
          screenPos={selectedScreenPos}
          viewport={viewport}
          onSelect={setSelectedId}
          onClose={() => setSelectedId(null)}
        />
      )}

      {/* Edit-mode slider panel (bottom-centre). Stays until the user
          turns edit mode off or the JSON is copied out. */}
      {editMode && (
        <EditPanel
          parts={parts}
          editingId={editingId}
          pinOverrides={pinOverrides}
          effectivePos={effectivePos}
          onPickPart={setEditingId}
          onChangePart={(id, next) =>
            setPinOverrides((prev) => ({ ...prev, [id]: next }))
          }
          onClearPart={(id) => {
            setPinOverrides((prev) => {
              const rest = { ...prev }
              delete rest[id]
              return rest
            })
          }}
        />
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function Header({
  lesson,
  onToggleList,
  listOpen,
  editMode,
  onToggleEdit,
  overrideCount,
  onCopy,
  onReset,
  copyState,
  autoRotate,
  onAutoRotateChange,
}: {
  lesson: Lesson
  onToggleList: () => void
  listOpen: boolean
  editMode: boolean
  onToggleEdit: () => void
  overrideCount: number
  onCopy: () => void
  onReset: () => void
  copyState: 'idle' | 'copied' | 'failed'
  autoRotate: boolean
  onAutoRotateChange: (v: boolean) => void
}) {
  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-[80] flex flex-wrap items-start justify-between gap-2 p-3">
      <div className="pointer-events-auto max-w-[60%] rounded-lg border border-line bg-canvas/85 px-3 py-1.5 shadow-sm backdrop-blur">
        <Link
          to={`/lesson/${lesson.subject}/${lesson.slug}`}
          className="text-[11px] text-accent hover:underline"
        >
          ← Back to lesson
        </Link>
        <h1 className="text-sm font-semibold text-ink">
          <T value={lesson.title} />
        </h1>
      </div>

      {/* Right side: every control the page exposes lives here, in one
          horizontal row. The 3D viewer no longer renders its own controls
          — the parent owns the chrome so layout is unambiguous. */}
      <div className="pointer-events-auto flex flex-wrap items-center gap-1.5">
        <button
          type="button"
          onClick={() => onAutoRotateChange(!autoRotate)}
          aria-pressed={autoRotate}
          className={
            'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-xs font-medium shadow-sm backdrop-blur transition-colors ' +
            (autoRotate
              ? 'border-accent bg-accent text-white'
              : 'border-line bg-canvas/85 text-ink-soft hover:bg-surface')
          }
          title="Spin the heart on its own"
        >
          <span aria-hidden="true">{autoRotate ? '⏸' : '↻'}</span>
          <span className="hidden sm:inline">
            {autoRotate ? ANATOMY_3D.pauseRotate.en : ANATOMY_3D.startRotate.en}
          </span>
        </button>

        <button
          type="button"
          onClick={onToggleList}
          className="inline-flex items-center gap-1.5 rounded-full border border-line bg-canvas/85 px-2.5 py-1.5 text-xs font-medium text-ink-soft shadow-sm backdrop-blur transition-colors hover:bg-surface"
        >
          <span aria-hidden="true">☰</span>
          <span className="hidden sm:inline">
            <T value={listOpen ? ANATOMY_3D.hideAllParts : ANATOMY_3D.showAllParts} />
          </span>
        </button>

        {editMode && (
          <>
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-1.5 rounded-full border border-line bg-canvas/85 px-2.5 py-1.5 text-xs font-medium text-ink-soft shadow-sm backdrop-blur transition-colors hover:bg-surface"
              title="Clear all in-progress overrides and start over"
            >
              <span aria-hidden="true">↺</span>
              <span className="hidden sm:inline">Reset</span>
              {overrideCount > 0 && (
                <span className="rounded-full bg-canvas px-1.5 text-[10px] text-muted">
                  {overrideCount}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={onCopy}
              className={
                'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-xs font-medium shadow-sm backdrop-blur transition-colors ' +
                (copyState === 'copied'
                  ? 'border-emerald-500 bg-emerald-500 text-white'
                  : copyState === 'failed'
                  ? 'border-rose-500 bg-rose-500 text-white'
                  : 'border-amber-500 bg-amber-500 text-white hover:bg-amber-600')
              }
            >
              <span aria-hidden="true">⧉</span>
              <span className="hidden sm:inline">
                {copyState === 'copied'
                  ? 'Copied!'
                  : copyState === 'failed'
                  ? 'Copy failed'
                  : 'Copy JSON'}
              </span>
            </button>
          </>
        )}

        <button
          type="button"
          onClick={onToggleEdit}
          aria-pressed={editMode}
          className={
            'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-xs font-medium shadow-sm backdrop-blur transition-colors ' +
            (editMode
              ? 'border-amber-500 bg-amber-500 text-white'
              : 'border-line bg-canvas/85 text-ink-soft hover:bg-surface')
          }
        >
          <span aria-hidden="true">✎</span>
          <span className="hidden sm:inline">
            <T value={editMode ? ANATOMY_3D.editingOn : ANATOMY_3D.editingOff} />
          </span>
        </button>
      </div>
    </header>
  )
}

function FullScreen3D({
  parts,
  selectedId,
  hoveredId,
  onSelect,
  onHover,
  autoRotate,
  onSelectedScreenPos,
  pinOverrides,
  editMode,
  onPinAdjust,
  modelUrl,
}: {
  parts: AnatomyOrgan[]
  selectedId: string | null
  hoveredId: string | null
  onSelect: (id: string) => void
  onHover: (id: string | null) => void
  autoRotate: boolean
  // Optional so edit mode can pass `undefined` and skip the per-frame
  // screen-position reporter (see GLSurfaceView for the full reason).
  onSelectedScreenPos?: ((pos: { x: number; y: number } | null) => void) | undefined
  pinOverrides?: Record<string, [number, number, number]> | undefined
  editMode: boolean
  onPinAdjust: (id: string) => void
  modelUrl: string
}) {
  return (
    <Anatomy3D
      modelUrl={modelUrl}
      parts={parts}
      selectedId={selectedId}
      hoveredId={hoveredId}
      onSelect={onSelect}
      onHover={onHover}
      followStep={-1}
      orderedForFollow={[]}
      autoRotate={autoRotate}
      onSelectedScreenPos={onSelectedScreenPos}
      pinOverrides={pinOverrides}
      editMode={editMode}
      onPinAdjust={onPinAdjust}
    />
  )
}

function FullScreen3DFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center text-sm text-muted">
      Loading 3D viewer…
    </div>
  )
}

const CALLOUT_WIDTH = 360
const CALLOUT_GAP = 16

function Callout({
  part,
  parts,
  screenPos,
  viewport,
  onSelect,
  onClose,
}: {
  part: AnatomyOrgan
  parts: AnatomyOrgan[]
  screenPos: { x: number; y: number }
  viewport: { w: number; h: number }
  onSelect: (id: string) => void
  onClose: () => void
}) {
  const idx = parts.findIndex((p) => p.id === part.id)

  // Position the callout to the right of the dot, but if that would push
  // it off the right edge, flip it to the left. Same for vertical.
  const rightX = screenPos.x + CALLOUT_GAP + 8
  const leftX = screenPos.x - CALLOUT_GAP - 8 - CALLOUT_WIDTH
  const placeRight = rightX + CALLOUT_WIDTH <= viewport.w
  const calloutX = placeRight ? rightX : Math.max(8, leftX)
  const calloutY = Math.max(8, Math.min(screenPos.y - 80, viewport.h - 320))

  const lineStartX = placeRight ? calloutX : calloutX + CALLOUT_WIDTH
  const lineStartY = Math.max(40, Math.min(screenPos.y, calloutY + 80))
  const lineEndX = screenPos.x
  const lineEndY = screenPos.y

  return (
    <>
      <svg
        className="pointer-events-none absolute inset-0 z-10"
        width={viewport.w}
        height={viewport.h}
        aria-hidden="true"
      >
        <line
          x1={lineStartX}
          y1={lineStartY}
          x2={lineEndX}
          y2={lineEndY}
          stroke="#0d9488"
          strokeWidth={1.5}
          strokeDasharray="3 3"
          opacity={0.8}
        />
        <circle cx={lineStartX} cy={lineStartY} r={3} fill="#0d9488" />
      </svg>

      <aside
        className="pointer-events-auto absolute z-10 rounded-xl border border-line bg-canvas/95 p-4 shadow-lg backdrop-blur"
        style={{ left: calloutX, top: calloutY, width: CALLOUT_WIDTH }}
      >
        <div className="mb-2 flex items-baseline justify-between gap-2">
          <h2 className="text-base font-semibold text-ink">
            <T value={part.name} />
          </h2>
          <span className="text-[10px] uppercase tracking-wide text-muted">
            {idx + 1} / {parts.length}
          </span>
        </div>

        <p className="text-sm leading-relaxed text-ink-soft">
          <T value={part.description} />
        </p>

        {part.secretions && part.secretions.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {part.secretions.map((s, i) => (
              <span
                key={i}
                className="rounded-full border border-line bg-canvas px-2 py-0.5 text-xs text-ink-soft"
              >
                <T value={s} />
              </span>
            ))}
          </div>
        )}

        <div className="mt-4 flex items-center gap-2">
          <button
            type="button"
            onClick={() => onSelect(parts[(idx - 1 + parts.length) % parts.length]!.id)}
            className="flex-1 rounded-md border border-line bg-canvas px-2 py-1.5 text-xs text-ink-soft hover:bg-surface"
          >
            ← Prev
          </button>
          <button
            type="button"
            onClick={() => onSelect(parts[(idx + 1) % parts.length]!.id)}
            className="flex-1 rounded-md border border-line bg-canvas px-2 py-1.5 text-xs text-ink-soft hover:bg-surface"
          >
            Next →
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-line bg-canvas px-2 py-1.5 text-xs text-ink-soft hover:bg-surface"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
      </aside>
    </>
  )
}

function EditPanel({
  parts,
  editingId,
  pinOverrides,
  effectivePos,
  onPickPart,
  onChangePart,
  onClearPart,
}: {
  parts: AnatomyOrgan[]
  editingId: string | null
  pinOverrides: Record<string, [number, number, number]>
  effectivePos: (id: string) => [number, number, number]
  onPickPart: (id: string) => void
  onChangePart: (id: string, next: [number, number, number]) => void
  onClearPart: (id: string) => void
}) {
  const partsWithPos = parts.filter((p) => p.position3d)
  const editingPart = partsWithPos.find((p) => p.id === editingId) ?? partsWithPos[0] ?? null
  const pos = editingPart ? effectivePos(editingPart.id) : [0.5, 0.5, 0.5]
  const isOverride = editingPart ? Boolean(pinOverrides[editingPart.id]) : false

  // Step size: how far one tick of the slider or +/− button moves the
  // pin. The bbox is 1.0 wide in normalised space, so 0.01 ≈ 1% of the
  // model width — visible. 0.05 ≈ 5% — clearly visible on a single
  // tick. 0.20 = 20% — coarse for big jumps. The previous defaults
  // (0.005 / 0.02) were too fine to be useful on a 951-px heart; the
  // new default of 0.05 lands the dot somewhere noticeably different
  // on each tick.
  const [step, setStep] = useState(0.05)
  const stepOptions: { value: number; label: string }[] = [
    { value: 0.01, label: 'Fine' },
    { value: 0.05, label: 'Normal' },
    { value: 0.2, label: 'Coarse' },
  ]

  return (
    <div className="pointer-events-auto absolute bottom-3 left-1/2 z-[80] w-[min(720px,calc(100vw-2rem))] -translate-x-1/2 rounded-xl border border-amber-500/40 bg-canvas/95 p-3 shadow-lg backdrop-blur">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[10px] font-semibold uppercase tracking-wide text-amber-600">
            Edit
          </span>
          {partsWithPos.map((p) => {
            const active = p.id === editingPart?.id
            const isO = Boolean(pinOverrides[p.id])
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => onPickPart(p.id)}
                className={
                  'rounded-md border px-2 py-1 text-xs transition-colors ' +
                  (active
                    ? 'border-amber-500 bg-amber-500 text-white'
                    : isO
                    ? 'border-amber-500/60 bg-amber-50 text-ink hover:bg-amber-100'
                    : 'border-line bg-canvas text-ink-soft hover:bg-surface')
                }
                data-pin-tab={p.id}
              >
                <T value={p.name} />
              </button>
            )
          })}
        </div>
        <div className="flex items-center gap-2">
          {editingPart && isOverride && (
            <button
              type="button"
              onClick={() => onClearPart(editingPart.id)}
              className="text-[11px] text-amber-600 hover:underline"
              title="Drop the override for this pin and use the lesson value"
            >
              Clear override
            </button>
          )}
          <div className="flex overflow-hidden rounded-md border border-line">
            {stepOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setStep(opt.value)}
                className={
                  'px-2 py-0.5 text-[10px] font-medium transition-colors ' +
                  (step === opt.value
                    ? 'bg-amber-500 text-white'
                    : 'bg-canvas text-ink-soft hover:bg-surface')
                }
                title={`Step ${opt.value} per slider tick`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {editingPart ? (
        <div className="grid gap-3 sm:grid-cols-3">
          {(['x', 'y', 'z'] as const).map((axis, i) => (
            <div key={axis} className="text-xs text-ink-soft">
              <div className="mb-1 flex items-baseline justify-between font-mono">
                <span className="uppercase">{axis}</span>
                <span className="text-muted">{(pos[i] ?? 0).toFixed(3)}</span>
              </div>
              <input
                type="range"
                min={0}
                max={1}
                step={step}
                value={pos[i]}
                onChange={(e) => {
                  const next: [number, number, number] = [...pos] as [number, number, number]
                  next[i] = Number(e.target.value)
                  onChangePart(editingPart.id, next)
                }}
                className="w-full accent-amber-500"
                data-edit-axis={axis}
              />
              <div className="mt-1 flex gap-1">
                <button
                  type="button"
                  onClick={() => {
                    const next: [number, number, number] = [...pos] as [number, number, number]
                    next[i] = Math.max(0, (pos[i] ?? 0) - step)
                    onChangePart(editingPart.id, next)
                  }}
                  className="flex-1 rounded border border-line bg-canvas px-1 py-0.5 text-[10px] text-ink-soft hover:bg-surface"
                  aria-label={`Decrement ${axis} by ${step}`}
                >
                  −
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const next: [number, number, number] = [...pos] as [number, number, number]
                    next[i] = Math.min(1, (pos[i] ?? 0) + step)
                    onChangePart(editingPart.id, next)
                  }}
                  className="flex-1 rounded border border-line bg-canvas px-1 py-0.5 text-[10px] text-ink-soft hover:bg-surface"
                  aria-label={`Increment ${axis} by ${step}`}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xs text-muted">No part with a 3D position yet.</p>
      )}

      <p className="mt-2 text-[10px] text-muted">
        <T value={ANATOMY_3D.editHint} />
      </p>
    </div>
  )
}

function PartListOverlay({
  parts,
  selectedId,
  onSelect,
  onClose,
}: {
  parts: AnatomyOrgan[]
  selectedId: string | null
  onSelect: (id: string) => void
  onClose: () => void
}) {
  return (
    <aside className="pointer-events-auto absolute left-4 top-20 z-10 w-[min(320px,calc(100vw-2rem))] rounded-xl border border-line bg-canvas/95 p-4 shadow-lg backdrop-blur">
      <div className="mb-2 flex items-baseline justify-between gap-2">
        <h2 className="text-sm font-semibold text-ink">
          <T value={ANATOMY_3D.partsHeading} />
        </h2>
        <button
          type="button"
          onClick={onClose}
          className="rounded-md px-1.5 py-0.5 text-xs text-muted hover:bg-canvas"
          aria-label="Close"
        >
          ✕
        </button>
      </div>
      <p className="mb-2 text-[11px] text-muted">
        <T value={ANATOMY_3D.listHint} />
      </p>
      <ul className="max-h-[60vh] space-y-1 overflow-y-auto pr-1">
        {parts.map((p, i) => {
          const isActive = selectedId === p.id
          return (
            <li key={p.id}>
              <button
                type="button"
                onClick={() => onSelect(p.id)}
                className={
                  'w-full rounded-md border px-2.5 py-1.5 text-left text-sm transition-colors ' +
                  (isActive
                    ? 'border-accent bg-accent/10 text-ink'
                    : 'border-line bg-canvas text-ink-soft hover:border-accent hover:bg-surface')
                }
              >
                <span className="mr-2 text-[10px] font-mono text-muted">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <T value={p.name} />
              </button>
            </li>
          )
        })}
      </ul>
    </aside>
  )
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** First 3D-capable extra in a lesson. We support four types:
 *  - `heart-anatomy` (GLB, with Edit-mode pin calibration)
 *  - `organ-anatomy` (GLB for any of 8 non-heart organs, same Edit mode)
 *  - `dna-helix-3d` (procedural DNA double helix, no GLB)
 *  - `food-web-3d` (procedural food web, no GLB)
 */
type Fullscreen3DExtra =
  | HeartAnatomyExtra
  | OrganAnatomyExtra
  | DnaHelix3DExtra
  | FoodWeb3DExtra

function find3DExtra(lesson: Lesson): Fullscreen3DExtra | undefined {
  return lesson.extras?.find(
    (e): e is Fullscreen3DExtra => is3DExtra(e)
  )
}

function is3DExtra(e: LessonExtra): e is Fullscreen3DExtra {
  if (e.type === 'dna-helix-3d' || e.type === 'food-web-3d') return true
  if (e.type === 'heart-anatomy') return Boolean(e.model3d)
  if (e.type === 'organ-anatomy') return true
  return false
}

/** Where the GLB lives, by extra type. Heart carries an explicit
 *  `model3d`; organs are looked up by slug. */
function getModelUrl(extra: HeartAnatomyExtra | OrganAnatomyExtra): string {
  if (extra.type === 'heart-anatomy') return assetUrl(extra.model3d!)
  return assetUrl(`/figures/3d/${extra.organ}.glb`)
}
