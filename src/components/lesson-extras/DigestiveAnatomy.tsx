import { useEffect, useMemo, useState } from 'react'
import type { AnatomyOrgan, DigestiveAnatomyExtra } from '@/content/types'
import { T } from '@/components/i18n/T'
import { DIGESTIVE_ANATOMY } from '@/lib/lessonExtrasStrings'
import { assetUrl } from '@/lib/assetUrl'

/**
 * The digestive system as the textbook draws it.
 *
 * Two layers stacked: the real G8 Figure B5.08 as a base image, and an SVG
 * overlay with a transparent hit-area for each food-passing organ. Hover or
 * select a hotspot and the side panel updates; the "Follow the food" mode
 * animates a dot through the same points.
 *
 * Coordinates: the image is 1071 × 932 px (2× DPI from the original 535×466
 * PDF page). The overlay SVG uses the same viewBox so every hotspot is in
 * image-pixel space and scales with the figure automatically.
 */
const IMG_W = 1071
const IMG_H = 932

type Hotspot =
  | { type: 'circle'; x: number; y: number; r: number }
  | { type: 'ellipse'; x: number; y: number; rx: number; ry: number }
  | { type: 'path'; d: string; strokeWidth: number }

/**
 * Where each food-passing organ sits on the figure. Tweaked by eye against
 * the extracted PNG; the radii are generous so a slight drift in extraction
 * won't leave the user unable to click.
 *
 * The large intestine is drawn as a path rather than a circle because it
 * is genuinely U-shaped in the figure (ascending → transverse → descending
 * colon framing the small intestine), and any single ellipse overlaps the
 * small intestine's hotspot. The thick stroke gives the user a click target
 * along the entire U.
 */
const HOTSPOTS: Record<string, Hotspot> = {
  // v9-v10: mouth hotspot moved progressively left/down to sit on the actual
  // mouth in the figure — the previous center sat slightly right of the lips.
  mouth: { type: 'circle', x: 440, y: 190, r: 38 },
  // v6: nudged 15px right — the figure's oesophagus sits further right of
  // midline than the v5 ellipse covered.
  oesophagus: { type: 'ellipse', x: 560, y: 320, rx: 22, ry: 120 },
  stomach: { type: 'ellipse', x: 622, y: 478, rx: 80, ry: 70 },
  liver: { type: 'ellipse', x: 478, y: 472, rx: 100, ry: 42 },
  'gall-bladder': { type: 'circle', x: 475, y: 540, r: 24 },
  // Pancreas sits to the left of the stomach, just under the liver, sweeping
  // from the duodenum (left) back across to the spleen (right). v8: lifted
  // 5px to settle the hotspot higher in the figure.
  pancreas: { type: 'ellipse', x: 560, y: 550, rx: 90, ry: 24 },
  // v6: lifted 40px up — the small-intestine hotspot still sat below the
  // tangled small-bowel bundle in the figure.
  'small-intestine': { type: 'ellipse', x: 530, y: 645, rx: 95, ry: 80 },
  // The large intestine is an INVERTED U (∩) in the figure: the transverse
  // colon is the closed top, the two arms (ascending + descending) come down
  // from it, and the open bottom is where the small intestine enters at the
  // caecum (left) and the rectum descends from the sigmoid (right). v3
  // scaled to 60% of v2 — the U was still too large and swallowed the
  // small-intestine area. v4-v9 progressively shifted and resized. v10
  // applies another 0.9x uniform scale about the v9 bbox centre (545, 707.5)
  // and then shifts (-15, -15) so the U lands a bit further left and up.
  'large-intestine': {
    type: 'path',
    d: 'M 413 761 L 413 604 L 647 604 L 647 760 L 617 781',
    strokeWidth: 27,
  },
  anus: { type: 'circle', x: 542, y: 890, r: 22 },
}

export function DigestiveAnatomy({ extra }: { extra: DigestiveAnatomyExtra }) {
  const organs = extra.organs
  const [selectedId, setSelectedId] = useState<string | null>(extra.initialOrgan ?? null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [mode, setMode] = useState<'explore' | 'follow'>('explore')
  const [followStep, setFollowStep] = useState(0)

  // Memoize the ordered list of "follow" organs once.
  const orderedForFollow = useMemo(
    () => organs.filter((o) => typeof o.stop === 'number').sort((a, b) => a.stop! - b.stop!),
    [organs]
  )

  const selected = useMemo(
    () => organs.find((o) => o.id === selectedId) ?? null,
    [organs, selectedId]
  )

  // "Follow the food" mode — advance through the path of organs in `stop` order.
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
            <T value={DIGESTIVE_ANATOMY.modeExplore} />
          </ModeButton>
          <ModeButton active={mode === 'follow'} onClick={startFollow}>
            <T value={DIGESTIVE_ANATOMY.modeFollow} />
          </ModeButton>
          {mode === 'follow' && (
            <span className="text-xs text-muted">
              <T value={DIGESTIVE_ANATOMY.followPrompt} />
            </span>
          )}
        </div>

        <FigureWithHotspots
          organs={organs}
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
          <OrganPanel organ={selected} />
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

function OrganPanel({ organ }: { organ: AnatomyOrgan }) {
  return (
    <div>
      <h3 className="mb-1 text-base font-semibold text-ink">
        <T value={organ.name} />
      </h3>
      <p className="mb-2 leading-relaxed text-ink-soft">
        <T value={organ.description} />
      </p>
      {organ.secretions && organ.secretions.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {organ.secretions.map((s, i) => (
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
      <T value={mode === 'follow' ? DIGESTIVE_ANATOMY.emptyFollow : DIGESTIVE_ANATOMY.emptyExplore} />
    </p>
  )
}

// ---------------------------------------------------------------------------
// Figure + hotspot overlay
// ---------------------------------------------------------------------------

function FigureWithHotspots({
  organs,
  selectedId,
  hoveredId,
  onSelect,
  onHover,
  followStep,
  orderedForFollow,
}: {
  organs: AnatomyOrgan[]
  selectedId: string | null
  hoveredId: string | null
  onSelect: (id: string) => void
  onHover: (id: string | null) => void
  followStep: number
  orderedForFollow: AnatomyOrgan[]
}) {
  // Compute the follow-dot's position for the current step.
  const followTarget = orderedForFollow[Math.min(followStep, Math.max(0, orderedForFollow.length - 1))]
  const followHotspot = followTarget ? HOTSPOTS[followTarget.id] : null

  return (
    <figure className="relative m-0 overflow-hidden rounded-lg border border-line bg-canvas">
      {/* The base image — the textbook figure. */}
      <img
        src={assetUrl('/figures/g8/7-1-nutrition/figure-b5-08.png')}
        alt="The human digestive system"
        className="block w-full"
        draggable={false}
      />
      <figcaption className="border-t border-line bg-canvas px-3 py-1.5 text-[11px] text-muted">
        G8 Science · p.14, Figure B5.08 · click an organ to read about it
      </figcaption>

      {/* Overlay: transparent SVG with click/hover hit areas. */}
      <svg
        viewBox={`0 0 ${IMG_W} ${IMG_H}`}
        className="absolute inset-0 h-full w-full"
        // Don't let the empty SVG catch clicks — only the shapes inside.
        style={{ pointerEvents: 'none' }}
        aria-hidden="true"
      >
        {organs.map((o) => {
          const h = HOTSPOTS[o.id]
          if (!h) return null
          const isSelected = selectedId === o.id
          const isHovered = hoveredId === o.id
          return (
            <HotspotShape
              key={o.id}
              h={h}
              isSelected={isSelected}
              isHovered={isHovered}
              label={o.name.en}
              onSelect={() => onSelect(o.id)}
              onHover={(v) => onHover(v ? o.id : null)}
            />
          )
        })}

        {/* Follow-the-food dot. Pulses. */}
        {followHotspot && (
          <FollowDot hotspot={followHotspot} />
        )}
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
  // Colour the ring teal when selected, slate when merely hovered.
  const ringStroke = isSelected ? '#0d9488' : '#0f172a'
  const ringFill = isSelected ? 'rgba(13,148,136,0.18)' : 'rgba(15,23,42,0.06)'
  const labelBg = isSelected ? '#0d9488' : '#0f172a'

  return (
    <g
      onClick={onSelect}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      style={{ cursor: 'pointer', pointerEvents: 'auto' }}
      data-organ-hotspot={label}
    >
      {h.type === 'circle' ? (
        <circle
          cx={h.x}
          cy={h.y}
          r={showRing ? h.r : Math.max(h.r - 6, 6)}
          fill={showRing ? ringFill : 'transparent'}
          stroke={showRing ? ringStroke : 'transparent'}
          strokeWidth={2}
        />
      ) : h.type === 'ellipse' ? (
        <ellipse
          cx={h.x}
          cy={h.y}
          rx={showRing ? h.rx : Math.max(h.rx - 4, 12)}
          ry={showRing ? h.ry : Math.max(h.ry - 4, 20)}
          fill={showRing ? ringFill : 'transparent'}
          stroke={showRing ? ringStroke : 'transparent'}
          strokeWidth={2}
        />
      ) : (
        <path
          d={h.d}
          fill="none"
          stroke={showRing ? ringStroke : 'transparent'}
          strokeWidth={showRing ? h.strokeWidth : Math.max(h.strokeWidth - 12, 18)}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={showRing ? 0.18 : 0}
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
  // For the path (large intestine) the dot sits at the caecum end —
  // the entry point from the small intestine. For other shapes, the
  // shape's own center. v10: caecum end sits at (413, 761) after the
  // 0.9x scale + (-15, -15) shift.
  const cx = hotspot.type === 'path' ? 413 : hotspot.x
  const cy = hotspot.type === 'path' ? 761 : hotspot.y
  return (
    <g style={{ pointerEvents: 'none' }}>
      <circle cx={cx} cy={cy} r="11" fill="#dc2626" stroke="#7f1d1d" strokeWidth="2">
        <animate attributeName="r" values="11;15;11" dur="1.4s" repeatCount="indefinite" />
      </circle>
      <circle cx={cx} cy={cy} r="4" fill="white" />
    </g>
  )
}

/**
 * The label/tooltip that appears when a hotspot is hovered or selected.
 * Anchored above the hotspot's top edge so it doesn't overlap the figure.
 * For the path hotspot (large intestine) we anchor above the transverse
 * colon top so the label sits in the empty space above the U.
 */
function LabelTag({
  hotspot,
  label,
  labelBg,
}: {
  hotspot: Hotspot
  label: string
  labelBg: string
}) {
  const cx = hotspot.type === 'path' ? 530 : hotspot.x
  const top =
    hotspot.type === 'circle'
      ? hotspot.y - hotspot.r
      : hotspot.type === 'ellipse'
      ? hotspot.y - hotspot.ry
      : 604 // path: above the (v10-scaled) transverse colon top
  return (
    <>
      <rect x={cx - 60} y={top - 28} width="120" height="22" rx="4" fill={labelBg} />
      <text x={cx} y={top - 13} textAnchor="middle" fontSize="12" fontWeight="600" fill="white">
        {label}
      </text>
    </>
  )
}
