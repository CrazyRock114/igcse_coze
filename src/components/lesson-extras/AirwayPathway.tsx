import { useEffect, useMemo, useState } from 'react'
import type { AirwayPathwayExtra, AnatomyOrgan } from '@/content/types'
import { T } from '@/components/i18n/T'
import { AIRWAY_PATHWAY } from '@/lib/lessonExtrasStrings'
import { assetUrl } from '@/lib/assetUrl'

/**
 * The human gas-exchange system, in one picture.
 *
 * Two layers stacked: the real G8 Figure B8.01 (front-view of the human thorax
 * showing the larynx, trachea, lungs, bronchi, bronchioles, alveoli, ribs,
 * intercostal muscles, pleural membranes, heart and diaphragm) as a base image,
 * and an SVG overlay with a transparent hit-area for each labelled part. Hover
 * or select a hotspot and the side panel updates; "Follow the air" mode
 * animates a dot through the airways in airflow order.
 *
 * Coordinates: the base image is 951 × 394 px (2× DPI of the extracted PDF
 * region). The overlay SVG uses the same viewBox so every hotspot is in
 * image-pixel space and scales with the figure automatically. Hotspot
 * positions were estimated by eye against the figure and may need the same
 * kind of multi-round nudge that `DigestiveAnatomy` and `HeartAnatomy` got.
 */
const IMG_W = 951
const IMG_H = 394

type Hotspot =
  | { type: 'circle'; x: number; y: number; r: number }
  | { type: 'ellipse'; x: number; y: number; rx: number; ry: number }

/**
 * Airway-part positions on the figure. Approximate; the goal is that the click
 * area covers the part without overlapping a neighbour, not pixel-perfect.
 *
 * The airflow path is larynx → trachea → (left bronchus or right bronchus, here
 * only left bronchus is labelled) → bronchiole → alveoli. Surrounding the
 * pathway are the structures that make the breathing mechanism work: ribs +
 * intercostal muscles + diaphragm + pleural membranes + the heart in the
 * middle of the thorax.
 */
const HOTSPOTS: Record<string, Hotspot> = {
  // Larynx — the "voice box" at the top of the trachea
  larynx: { type: 'ellipse', x: 480, y: 25, rx: 30, ry: 25 },
  // Trachea — the windpipe, with cartilage rings
  trachea: { type: 'ellipse', x: 480, y: 100, rx: 22, ry: 55 },
  // Left bronchus — the airway branching into the left lung
  'left-bronchus': { type: 'ellipse', x: 535, y: 175, rx: 30, ry: 18 },
  // Bronchiole — the smaller airways inside the lung
  bronchiole: { type: 'ellipse', x: 290, y: 245, rx: 60, ry: 30 },
  // Alveoli — the bunch-of-grapes air sacs at the end of the bronchioles
  alveoli: { type: 'ellipse', x: 270, y: 305, rx: 70, ry: 40 },
  // Left lung — the right-hand red mass (it is the patient's left)
  'left-lung': { type: 'ellipse', x: 660, y: 200, rx: 130, ry: 105 },
  // Ribs — the cross-section labelled in the left of the figure
  ribs: { type: 'ellipse', x: 140, y: 160, rx: 55, ry: 35 },
  // External intercostal muscle — between the ribs, outer layer
  'external-intercostal': { type: 'ellipse', x: 195, y: 145, rx: 35, ry: 18 },
  // Internal intercostal muscle — between the ribs, inner layer
  'internal-intercostal': { type: 'ellipse', x: 200, y: 185, rx: 35, ry: 18 },
  // Pleural membranes — the two thin layers around each lung
  'pleural-membranes': { type: 'ellipse', x: 175, y: 220, rx: 38, ry: 18 },
  // Heart — the purple/red organ in the middle of the thorax
  heart: { type: 'ellipse', x: 480, y: 260, rx: 50, ry: 50 },
  // Diaphragm — the dome-shaped muscle below the lungs
  diaphragm: { type: 'ellipse', x: 475, y: 370, rx: 220, ry: 18 },
}

export function AirwayPathway({ extra }: { extra: AirwayPathwayExtra }) {
  const parts = extra.parts
  const [selectedId, setSelectedId] = useState<string | null>(extra.initialPart ?? null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [mode, setMode] = useState<'explore' | 'follow'>('explore')
  const [followStep, setFollowStep] = useState(0)

  // Memoize the ordered list of "follow" parts once.
  const orderedForFollow = useMemo(
    () => parts.filter((p) => typeof p.stop === 'number').sort((a, b) => a.stop! - b.stop!),
    [parts]
  )

  const selected = useMemo(() => parts.find((p) => p.id === selectedId) ?? null, [parts, selectedId])

  // "Follow the air" mode — advance through the airway in `stop` order.
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
          <ModeButton active={mode === 'explore'} onClick={stopFollow}>
            <T value={AIRWAY_PATHWAY.modeExplore} />
          </ModeButton>
          <ModeButton active={mode === 'follow'} onClick={startFollow}>
            <T value={AIRWAY_PATHWAY.modeFollow} />
          </ModeButton>
          {mode === 'follow' && (
            <span className="text-xs text-muted">
              <T value={AIRWAY_PATHWAY.followPrompt} />
            </span>
          )}
        </div>

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
      <T value={mode === 'follow' ? AIRWAY_PATHWAY.emptyFollow : AIRWAY_PATHWAY.emptyExplore} />
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
        src={assetUrl('/figures/g8/11-1-gas-exchange/figure-b8-01.png')}
        alt="Front view of the human thorax showing the gas-exchange system"
        className="block w-full"
        draggable={false}
      />
      <figcaption className="border-t border-line bg-canvas px-3 py-1.5 text-[11px] text-muted">
        G8 Science · p.36, Figure B8.01 · click a part to read about it
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

        {/* Follow-the-air dot — coloured blue to read as "air" rather than blood. */}
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
      data-airway-hotspot={label}
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
      <circle cx={hotspot.x} cy={hotspot.y} r="11" fill="#0284c7" stroke="#0c4a6e" strokeWidth="2">
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
