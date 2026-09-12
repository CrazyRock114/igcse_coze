import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import type { DnaHelix3DExtra, Lesson } from '@/content/types'
import { T } from '@/components/i18n/T'
import { ANATOMY_3D, DNA_HELIX_3D } from '@/lib/lessonExtrasStrings'
import {
  DNA_DEFAULT_SEQUENCE,
  DNA_PALETTE,
  HelixScene,
} from '@/components/lesson-extras/DnaHelix3D'

/**
 * Fullscreen 3D DNA helix viewer. Same scene as the in-lesson `DnaHelix3D`
 * card, but the canvas fills the viewport and the side panel floats over
 * it the way the heart anatomy viewer does.
 *
 * Modeled on the heart's `/anatomy/:subject/:slug` page: a fixed header
 * with the back link, lesson title and an auto-rotate toggle; the canvas
 * behind everything; a side panel for the selected rung.
 */
export function DnaHelixFullscreen({
  lesson,
  extra,
}: {
  lesson: Lesson
  extra: DnaHelix3DExtra
}) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(
    extra.initialIndex ?? 0
  )
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const [autoRotate, setAutoRotate] = useState(extra.autoRotate ?? true)

  const sequence = useMemo(
    () => extra.sequence ?? DNA_DEFAULT_SEQUENCE,
    [extra.sequence]
  )
  const selected = selectedIdx != null ? (sequence[selectedIdx] ?? null) : null
  const selectedPair = selected ? `${selected.left}-${selected.right}` : null
  const selectedColors = selectedPair
    ? (DNA_PALETTE[selectedPair] ?? null)
    : null

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-canvas">
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0.6, 6.5], fov: 38 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
          shadows={false}
          frameloop="always"
        >
          <hemisphereLight args={['#fff4e6', '#dbeafe', 0.7]} />
          <ambientLight intensity={1.0} />
          <directionalLight position={[3, 4, 2]} intensity={1.4} color="#fff4e6" />
          <directionalLight position={[-3, -1, -2]} intensity={0.7} color="#dbeafe" />
          <directionalLight position={[0, 2, -3]} intensity={0.6} />

          <HelixScene
            sequence={sequence}
            selectedIdx={selectedIdx}
            hoveredIdx={hoveredIdx}
            onSelect={setSelectedIdx}
            onHover={setHoveredIdx}
            autoRotate={autoRotate}
          />

          <OrbitControls
            enableDamping
            dampingFactor={0.08}
            minDistance={3}
            maxDistance={14}
            target={[0, 0, 0]}
            makeDefault
          />
        </Canvas>
      </div>

      <FullscreenHeader
        lesson={lesson}
        autoRotate={autoRotate}
        onAutoRotateChange={setAutoRotate}
      />

      {/* Drag hint at the bottom centre — same as the in-lesson card. */}
      <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-canvas/85 px-3 py-1 text-[11px] text-ink-soft shadow-sm backdrop-blur">
        <T value={DNA_HELIX_3D.dragHint} />
      </div>

      {/* Side panel for the selected rung — floats on the right edge. */}
      <SidePanel
        selectedIdx={selectedIdx}
        sequence={sequence}
        selected={selected}
        pair={selectedPair}
        colors={selectedColors}
        baseDescriptions={extra.baseDescriptions}
      />
    </div>
  )
}

// ---------------------------------------------------------------------------
// Header
// ---------------------------------------------------------------------------

function FullscreenHeader({
  lesson,
  autoRotate,
  onAutoRotateChange,
}: {
  lesson: Lesson
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
          title="Spin the helix on its own"
        >
          <span aria-hidden="true">{autoRotate ? '⏸' : '↻'}</span>
          <span className="hidden sm:inline">
            {autoRotate
              ? ANATOMY_3D.pauseRotate.en
              : ANATOMY_3D.startRotate.en}
          </span>
        </button>
      </div>
    </header>
  )
}

// ---------------------------------------------------------------------------
// Side panel
// ---------------------------------------------------------------------------

function SidePanel({
  selectedIdx,
  sequence,
  selected,
  pair,
  colors,
  baseDescriptions,
}: {
  selectedIdx: number | null
  sequence: { left: string; right: string }[]
  selected: { left: string; right: string } | null
  pair: string | null
  colors: { a: string; b: string } | null
  baseDescriptions?: DnaHelix3DExtra['baseDescriptions']
}) {
  return (
    <aside className="pointer-events-auto absolute right-4 top-20 z-10 w-[min(320px,calc(100vw-2rem))] rounded-xl border border-line bg-canvas/95 p-4 shadow-lg backdrop-blur">
      <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted">
        <T value={DNA_HELIX_3D.pairLabel} />
        {selectedIdx != null && (
          <>
            {' · '}
            <span className="text-muted-foreground">#{selectedIdx + 1}</span>
          </>
        )}
      </div>

      {selected && pair ? (
        <>
          <div className="mb-3 flex items-baseline gap-2 text-sm font-medium text-ink">
            {colors ? (
              <>
                <span style={{ color: colors.a }}>{selected.left}</span>
                <span className="text-muted">—</span>
                <span style={{ color: colors.b }}>{selected.right}</span>
              </>
            ) : (
              <span>{pair}</span>
            )}
          </div>
          {(() => {
            const desc = baseDescriptions?.[pair]
            if (desc) {
              return (
                <>
                  <h3 className="mb-1 text-sm font-semibold text-ink">
                    <T value={desc.name} />
                  </h3>
                  <p className="text-sm text-ink-soft">
                    <T value={desc.description} />
                  </p>
                </>
              )
            }
            return (
              <p className="text-sm text-ink-soft">
                <T value={DNA_HELIX_3D.pairDefault} />
              </p>
            )
          })()}
          <p className="mt-3 text-xs text-muted">
            <T value={DNA_HELIX_3D.positionLabel} /> {selectedIdx! + 1} / {sequence.length}
          </p>
        </>
      ) : (
        <p className="text-sm text-muted">
          <T value={DNA_HELIX_3D.tapRungHint} />
        </p>
      )}
    </aside>
  )
}
