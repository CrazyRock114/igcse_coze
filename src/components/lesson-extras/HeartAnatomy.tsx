import { Suspense, lazy, useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import type { AnatomyOrgan, HeartAnatomyExtra } from '@/content/types'
import { T } from '@/components/i18n/T'
import { HEART_ANATOMY } from '@/lib/lessonExtrasStrings'
import { assetUrl } from '@/lib/assetUrl'

// The 3D viewer pulls in three.js + @react-three/fiber + drei (~+275 KB
// gzipped). Loaded only when the student switches to the 3D tab, so lessons
// that don't use 3D don't pay the cost.
const Anatomy3D = lazy(() =>
  import('./Anatomy3D').then((m) => ({ default: m.Anatomy3D }))
)

/**
 * The mammalian heart, in one picture.
 *
 * Two layers stacked: the real G8 Figure B7.03 (vertical section through a
 * human heart) as a base image, and an SVG overlay with a transparent hit-area
 * for each chamber, valve and great vessel. Hover or select a hotspot and the
 * side panel updates; "Follow the blood" mode animates a dot through the
 * chambers in circulation order.
 *
 * Coordinates: the base image is 951 × 564 px (2× DPI of the extracted
 * PDF region). The overlay SVG uses the same viewBox so every hotspot is in
 * image-pixel space and scales with the figure automatically. Hotspot
 * positions were estimated by eye against the figure and may need the same
 * kind of multi-round nudge that `DigestiveAnatomy` got.
 */
const IMG_W = 951
const IMG_H = 564

type Hotspot =
  | { type: 'circle'; x: number; y: number; r: number }
  | { type: 'ellipse'; x: number; y: number; rx: number; ry: number }

/**
 * Heart-part positions on the figure. Approximate; the goal is that the click
 * area covers the part without overlapping a neighbour, not pixel-perfect.
 *
 * Right side of the heart carries deoxygenated blood (blue in the figure);
 * left side carries oxygenated (red). The two sides are separated by the
 * septum in the middle.
 */
const HOTSPOTS: Record<string, Hotspot> = {
  // Veins entering the right atrium (top-left) — two of them
  'vena-cava': { type: 'ellipse', x: 230, y: 95, rx: 50, ry: 30 },
  // Right atrium — the upper-right chamber on the blue side
  'right-atrium': { type: 'ellipse', x: 270, y: 240, rx: 75, ry: 75 },
  // Tricuspid valve — between RA and RV
  'tricuspid-valve': { type: 'ellipse', x: 350, y: 320, rx: 35, ry: 18 },
  // Right ventricle — lower-right chamber on the blue side
  'right-ventricle': { type: 'ellipse', x: 350, y: 410, rx: 85, ry: 75 },
  // Pulmonary artery — leaves the RV going up
  'pulmonary-artery': { type: 'ellipse', x: 410, y: 90, rx: 35, ry: 70 },
  // Pulmonary vein — enters the LA from the right
  'pulmonary-vein': { type: 'ellipse', x: 750, y: 130, rx: 55, ry: 30 },
  // Left atrium — upper-left chamber on the red side
  'left-atrium': { type: 'ellipse', x: 670, y: 240, rx: 65, ry: 65 },
  // Bicuspid (mitral) valve — between LA and LV
  'bicuspid-valve': { type: 'ellipse', x: 620, y: 310, rx: 30, ry: 16 },
  // Left ventricle — lower-left chamber on the red side; thicker wall
  'left-ventricle': { type: 'ellipse', x: 580, y: 420, rx: 95, ry: 80 },
  // Aorta — leaves the LV going up, arches over
  aorta: { type: 'ellipse', x: 590, y: 90, rx: 50, ry: 70 },
  // Septum — the wall between left and right
  septum: { type: 'ellipse', x: 460, y: 380, rx: 22, ry: 120 },
}

export function HeartAnatomy({ extra }: { extra: HeartAnatomyExtra }) {
  const parts = extra.parts
  const has3D = typeof extra.model3d === 'string'
  const [selectedId, setSelectedId] = useState<string | null>(extra.initialPart ?? null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [mode, setMode] = useState<'explore' | 'follow'>('explore')
  const [view, setView] = useState<'2d' | '3d'>(has3D ? '3d' : '2d')
  const [followStep, setFollowStep] = useState(0)
  const { subject, slug } = useParams<{ subject: string; slug: string }>()

  // Memoize the ordered list of "follow" parts once.
  const orderedForFollow = useMemo(
    () => parts.filter((p) => typeof p.stop === 'number').sort((a, b) => a.stop! - b.stop!),
    [parts]
  )

  const selected = useMemo(() => parts.find((p) => p.id === selectedId) ?? null, [parts, selectedId])

  // "Follow the blood" mode — advance through the chambers in `stop` order.
  useEffect(() => {
    if (mode !== 'follow') return
    if (orderedForFollow.length === 0) return
    const id = setInterval(() => {
      setFollowStep((s) => {
        const next = s + 1
        if (next >= orderedForFollow.length) {
          setTimeout(() => {
            setMode('explore')
            setSelectedId(null)
          }, 2500)
          return s
        }
        setSelectedId(orderedForFollow[next]?.id ?? null)
        return next
      })
    }, 2200)
    return () => clearInterval(id)
  }, [mode, orderedForFollow])

  const startFollow = () => {
    setFollowStep(0)
    setSelectedId(orderedForFollow[0]?.id ?? null)
    setMode('follow')
  }
  const stopFollow = () => {
    setMode('explore')
    setSelectedId(null)
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_300px]">
      <div>
        <div className="mb-2 flex flex-wrap items-center gap-2">
          {has3D && (
            <ViewTab active={view === '3d'} onClick={() => setView('3d')}>
              3D
            </ViewTab>
          )}
          {has3D && (
            <ViewTab active={view === '2d'} onClick={() => setView('2d')}>
              2D
            </ViewTab>
          )}
          <span className="mx-1 h-4 w-px bg-line" aria-hidden="true" />
          <ModeButton active={mode === 'explore'} onClick={stopFollow}>
            <T value={HEART_ANATOMY.modeExplore} />
          </ModeButton>
          <ModeButton active={mode === 'follow'} onClick={startFollow}>
            <T value={HEART_ANATOMY.modeFollow} />
          </ModeButton>
          {mode === 'follow' && (
            <span className="text-xs text-muted">
              <T value={HEART_ANATOMY.followPrompt} />
            </span>
          )}
        </div>

        {view === '3d' && has3D ? (
          <div className="relative">
            <Suspense fallback={<ThreeDFallback />}>
              <Anatomy3D
                modelUrl={assetUrl(extra.model3d!)}
                parts={parts}
                selectedId={selectedId}
                hoveredId={hoveredId}
                onSelect={(id) => {
                  setMode('explore')
                  setSelectedId(id)
                }}
                onHover={setHoveredId}
                followStep={followStep}
                orderedForFollow={orderedForFollow}
              />
            </Suspense>
            {subject && slug && (
              <Link
                to={`/anatomy/${subject}/${slug}`}
                target="_blank"
                rel="noopener"
                className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-md border border-line bg-canvas/90 px-2.5 py-1 text-[11px] font-medium text-ink-soft shadow-sm transition-colors hover:bg-surface hover:text-ink"
                title="Open the fullscreen 3D viewer in a new tab"
              >
                <span aria-hidden="true">⛶</span>
                <T value={HEART_ANATOMY.openFullscreen} />
              </Link>
            )}
          </div>
        ) : (
          <FigureWithHotspots
            parts={parts}
            selectedId={selectedId}
            hoveredId={hoveredId}
            onSelect={(id) => {
              setMode('explore')
              setSelectedId(id)
            }}
            onHover={setHoveredId}
            followStep={followStep}
            orderedForFollow={orderedForFollow}
          />
        )}
      </div>

      <aside className="rounded-lg border border-line bg-canvas p-3 text-sm">
        {selected ? (
          <PartPanel part={selected} />
        ) : (
          <EmptyHint mode={mode} />
        )}
      </aside>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function ModeButton({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        'rounded-md px-2.5 py-1 text-xs font-medium transition-colors ' +
        (active
          ? 'bg-ink text-white'
          : 'border border-line bg-surface text-muted hover:bg-canvas hover:text-ink-soft')
      }
    >
      {children}
    </button>
  )
}

function ViewTab({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        'rounded-md px-2.5 py-1 text-xs font-semibold tracking-wide transition-colors ' +
        (active
          ? 'bg-teal-600 text-white'
          : 'border border-line bg-surface text-muted hover:bg-canvas hover:text-ink-soft')
      }
    >
      {children}
    </button>
  )
}

function ThreeDFallback() {
  return (
    <div className="flex h-[460px] w-full items-center justify-center rounded-lg border border-line bg-canvas text-xs text-muted">
      Loading 3D viewer…
    </div>
  )
}

function PartPanel({ part }: { part: AnatomyOrgan }) {
  return (
    <div>
      <h3 className="mb-1 text-base font-semibold text-ink">
        <T value={part.name} />
      </h3>
      <p className="mb-2 leading-relaxed text-ink-soft">
        <T value={part.description} />
      </p>
      {part.secretions && part.secretions.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {part.secretions.map((s, i) => (
            <span
              key={i}
              className="rounded-full border border-line bg-surface px-2 py-0.5 text-xs text-ink-soft"
            >
              <T value={s} />
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

function EmptyHint({ mode }: { mode: 'explore' | 'follow' }) {
  return (
    <p className="text-muted">
      <T value={mode === 'follow' ? HEART_ANATOMY.emptyFollow : HEART_ANATOMY.emptyExplore} />
    </p>
  )
}

// ---------------------------------------------------------------------------
// Figure + hotspot overlay
// ---------------------------------------------------------------------------

function FigureWithHotspots({
  parts,
  selectedId,
  hoveredId,
  onSelect,
  onHover,
  followStep,
  orderedForFollow,
}: {
  parts: AnatomyOrgan[]
  selectedId: string | null
  hoveredId: string | null
  onSelect: (id: string) => void
  onHover: (id: string | null) => void
  followStep: number
  orderedForFollow: AnatomyOrgan[]
}) {
  const followTarget = orderedForFollow[Math.min(followStep, Math.max(0, orderedForFollow.length - 1))]
  const followHotspot = followTarget ? HOTSPOTS[followTarget.id] : null

  return (
    <figure className="relative m-0 overflow-hidden rounded-lg border border-line bg-canvas">
      <img
        src={assetUrl('/figures/g8/9-1-transport-animals/figure-b7-03.png')}
        alt="Vertical section through a human heart"
        className="block w-full"
        draggable={false}
      />
      <figcaption className="border-t border-line bg-canvas px-3 py-1.5 text-[11px] text-muted">
        G8 Science · p.23, Figure B7.03 · click a part to read about it
      </figcaption>

      <svg
        viewBox={`0 0 ${IMG_W} ${IMG_H}`}
        className="absolute inset-0 h-full w-full"
        style={{ pointerEvents: 'none' }}
        aria-hidden="true"
      >
        {parts.map((p) => {
          const h = HOTSPOTS[p.id]
          if (!h) return null
          const isSelected = selectedId === p.id
          const isHovered = hoveredId === p.id
          return (
            <HotspotShape
              key={p.id}
              h={h}
              isSelected={isSelected}
              isHovered={isHovered}
              label={p.name.en}
              onSelect={() => onSelect(p.id)}
              onHover={(v) => onHover(v ? p.id : null)}
            />
          )
        })}

        {/* Follow-the-blood dot. */}
        {followHotspot && <FollowDot hotspot={followHotspot} />}
      </svg>
    </figure>
  )
}

function HotspotShape({
  h,
  isSelected,
  isHovered,
  label,
  onSelect,
  onHover,
}: {
  h: Hotspot
  isSelected: boolean
  isHovered: boolean
  label: string
  onSelect: () => void
  onHover: (v: boolean) => void
}) {
  const showRing = isSelected || isHovered
  const ringStroke = isSelected ? '#0d9488' : '#0f172a'
  const ringFill = isSelected ? 'rgba(13,148,136,0.18)' : 'rgba(15,23,42,0.06)'
  const labelBg = isSelected ? '#0d9488' : '#0f172a'

  return (
    <g
      onClick={onSelect}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      style={{ cursor: 'pointer', pointerEvents: 'auto' }}
      data-heart-hotspot={label}
    >
      {h.type === 'circle' ? (
        <circle
          cx={h.x}
          cy={h.y}
          r={showRing ? h.r : Math.max(h.r - 4, 6)}
          fill={showRing ? ringFill : 'transparent'}
          stroke={showRing ? ringStroke : 'transparent'}
          strokeWidth={2}
        />
      ) : (
        <ellipse
          cx={h.x}
          cy={h.y}
          rx={showRing ? h.rx : Math.max(h.rx - 3, 10)}
          ry={showRing ? h.ry : Math.max(h.ry - 3, 10)}
          fill={showRing ? ringFill : 'transparent'}
          stroke={showRing ? ringStroke : 'transparent'}
          strokeWidth={2}
        />
      )}

      {(isSelected || isHovered) && (
        <g style={{ pointerEvents: 'none' }}>
          <LabelTag hotspot={h} label={label} labelBg={labelBg} />
        </g>
      )}
    </g>
  )
}

function FollowDot({ hotspot }: { hotspot: Hotspot }) {
  return (
    <g style={{ pointerEvents: 'none' }}>
      <circle cx={hotspot.x} cy={hotspot.y} r="11" fill="#dc2626" stroke="#7f1d1d" strokeWidth="2">
        <animate attributeName="r" values="11;15;11" dur="1.4s" repeatCount="indefinite" />
      </circle>
      <circle cx={hotspot.x} cy={hotspot.y} r="4" fill="white" />
    </g>
  )
}

function LabelTag({
  hotspot,
  label,
  labelBg,
}: {
  hotspot: Hotspot
  label: string
  labelBg: string
}) {
  const top = hotspot.type === 'circle' ? hotspot.y - hotspot.r : hotspot.y - hotspot.ry
  return (
    <>
      <rect x={hotspot.x - 60} y={top - 28} width="120" height="22" rx="4" fill={labelBg} />
      <text x={hotspot.x} y={top - 13} textAnchor="middle" fontSize="11" fontWeight="600" fill="white">
        {label}
      </text>
    </>
  )
}
