import { useMemo, useState } from 'react'
import type { NeuroneStructureExtra } from '@/content/types'
import { T } from '@/components/i18n/T'
import { NEURONE_STRUCTURE } from '@/lib/lessonExtrasStrings'

/**
 * G8 Figure B9.01 — a motor neurone in section. One diagram, six
 * clickable parts (cell body, nucleus, dendrites, axon, myelin sheath,
 * axon terminals). The visible artwork (cell-body outline, axon line,
 * myelin segments, terminal branches) is drawn inline in SVG so the
 * project has no image-file dependency and the diagram scales crisply
 * to any size.
 *
 * Same data-driven pattern as `EyeAnatomy`: the `parts` array in
 * lesson.ts carries the bilingual name + description for each part,
 * and a `hotspot` field in viewBox coordinates. Clicking a part shows
 * its description in the side panel. Hovering shows a coloured ring.
 */
const DEFAULT_W = 400
const DEFAULT_H = 200

export function NeuroneStructure({ extra }: { extra: NeuroneStructureExtra }) {
  const parts = extra.parts
  const w = extra.viewBox?.width ?? DEFAULT_W
  const h = extra.viewBox?.height ?? DEFAULT_H

  const [selectedId, setSelectedId] = useState<string | null>(parts[0]?.id ?? null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const selected = useMemo(
    () => parts.find((p) => p.id === selectedId) ?? null,
    [parts, selectedId]
  )

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_300px]">
      <div>
        <figure className="relative m-0 overflow-hidden rounded-lg border border-line bg-canvas">
          <svg
            viewBox={`0 0 ${w} ${h}`}
            className="block h-56 w-full"
            role="img"
            aria-label="A motor neurone in section"
          >
            <NeuroneFigure />
            {/* Clickable hotspots on top of the figure */}
            {parts.map((p) => (
              <Hotspot
                key={p.id}
                part={p}
                isSelected={selectedId === p.id}
                isHovered={hoveredId === p.id}
                onSelect={() => setSelectedId(p.id)}
                onHover={(v) => setHoveredId(v ? p.id : null)}
              />
            ))}
          </svg>
          <figcaption className="border-t border-line bg-canvas px-3 py-1.5 text-[11px] text-muted">
            <T value={NEURONE_STRUCTURE.figcaption} />
          </figcaption>
        </figure>
      </div>

      <aside className="rounded-lg border border-line bg-canvas p-3 text-sm">
        {selected ? (
          <div>
            <h3 className="mb-1 text-base font-semibold text-ink">
              <T value={selected.name} />
            </h3>
            <p className="leading-relaxed text-ink-soft">
              <T value={selected.description} />
            </p>
          </div>
        ) : (
          <p className="text-muted">
            <T value={NEURONE_STRUCTURE.empty} />
          </p>
        )}
      </aside>
    </div>
  )
}

// ---------------------------------------------------------------------------
// The figure itself
// ---------------------------------------------------------------------------

/**
 * A 400×200 motor neurone drawn inline.
 *
 * Anatomy (left to right):
 *   - Dendrites: 4 short branched fibres on the left, fanning out
 *     from the cell body
 *   - Cell body: a soft star / blob shape, the "soma"
 *   - Nucleus: a small darker oval inside the cell body
 *   - Axon hillock: the funnel where the axon leaves the cell body
 *   - Axon: a long horizontal line
 *   - Myelin sheath: 5 oval segments wrapping the axon, with gaps
 *     (Nodes of Ranvier) between them
 *   - Axon terminals: a spray of 4 short branches at the right end
 */
function NeuroneFigure() {
  // Cell body — a closed bezier blob, intentionally a bit irregular to
  // feel like a real neurone and not a perfect circle.
  const cellBodyD = [
    'M 110 70',
    'C 140 70, 150 95, 145 115',
    'C 150 130, 130 145, 110 140',
    'C 90 145, 70 130, 70 110',
    'C 65 95, 80 75, 110 70',
    'Z',
  ].join(' ')

  return (
    <g stroke="#0f172a" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* Dendrites — 4 short branches fanning out to the left of the
          cell body, each forking once at the tip. */}
      <g stroke="#475569" strokeWidth="1.2">
        <path d="M 78 92 C 60 86, 40 70, 22 56" />
        <path d="M 22 56 L 14 50" />
        <path d="M 22 56 L 26 44" />

        <path d="M 72 80 C 50 70, 30 50, 16 30" />
        <path d="M 16 30 L 8 22" />
        <path d="M 16 30 L 18 16" />

        <path d="M 70 105 C 48 105, 28 100, 8 96" />
        <path d="M 8 96 L 0 90" />
        <path d="M 8 96 L 2 104" />

        <path d="M 76 128 C 56 138, 36 148, 18 158" />
        <path d="M 18 158 L 8 162" />
        <path d="M 18 158 L 22 170" />
      </g>

      {/* Cell body */}
      <path d={cellBodyD} fill="#fde68a" />

      {/* Nucleus — a small dark oval inside the cell body */}
      <ellipse cx="105" cy="108" rx="14" ry="10" fill="#7c2d12" stroke="#7c2d12" />

      {/* Axon hillock — small funnel from cell body to axon */}
      <path d="M 142 105 C 150 100, 160 100, 170 100" strokeWidth="2" />

      {/* Axon — long horizontal line from cell body to terminals */}
      <line x1="170" y1="100" x2="320" y2="100" strokeWidth="2" stroke="#1e293b" />

      {/* Myelin sheath — 5 oval segments, with small gaps between them
          (Nodes of Ranvier) */}
      <g fill="#fef3c7" stroke="#92400e" strokeWidth="1.2">
        <ellipse cx="190" cy="100" rx="12" ry="9" />
        <ellipse cx="220" cy="100" rx="12" ry="9" />
        <ellipse cx="250" cy="100" rx="12" ry="9" />
        <ellipse cx="280" cy="100" rx="12" ry="9" />
        <ellipse cx="310" cy="100" rx="12" ry="9" />
      </g>

      {/* Axon terminals — 4 short branches at the right end */}
      <g stroke="#475569" strokeWidth="1.2">
        <path d="M 320 100 C 335 92, 350 80, 365 70" />
        <path d="M 320 100 C 335 100, 350 100, 372 100" />
        <path d="M 320 100 C 335 108, 350 120, 365 130" />
        <path d="M 320 100 C 340 110, 358 120, 376 132" />
      </g>
    </g>
  )
}

// ---------------------------------------------------------------------------
// Hotspot overlay
// ---------------------------------------------------------------------------

function Hotspot({
  part,
  isSelected,
  isHovered,
  onSelect,
  onHover,
}: {
  part: NeuroneStructureExtra['parts'][number]
  isSelected: boolean
  isHovered: boolean
  onSelect: () => void
  onHover: (v: boolean) => void
}) {
  const showRing = isSelected || isHovered
  const h = part.hotspot
  const ringStroke = isSelected ? '#0d9488' : '#0f172a'
  const ringFill = isSelected ? 'rgba(13,148,136,0.20)' : 'rgba(15,23,42,0.06)'

  return (
    <g
      onClick={onSelect}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      style={{ cursor: 'pointer' }}
      data-neurone-hotspot={part.id}
    >
      {h.type === 'circle' && (
        <circle
          cx={h.cx}
          cy={h.cy}
          r={showRing ? h.r : Math.max(h.r - 4, 6)}
          fill={showRing ? ringFill : 'transparent'}
          stroke={showRing ? ringStroke : 'transparent'}
          strokeWidth={2}
        />
      )}
      {h.type === 'ellipse' && (
        <ellipse
          cx={h.cx}
          cy={h.cy}
          rx={showRing ? h.rx : Math.max(h.rx - 3, 8)}
          ry={showRing ? h.ry : Math.max(h.ry - 3, 8)}
          fill={showRing ? ringFill : 'transparent'}
          stroke={showRing ? ringStroke : 'transparent'}
          strokeWidth={2}
        />
      )}
      {h.type === 'rect' && (
        <rect
          x={h.x}
          y={h.y}
          width={showRing ? h.width : Math.max(h.width - 3, 8)}
          height={showRing ? h.height : Math.max(h.height - 3, 8)}
          fill={showRing ? ringFill : 'transparent'}
          stroke={showRing ? ringStroke : 'transparent'}
          strokeWidth={2}
        />
      )}

      {(isSelected || isHovered) && (
        <g style={{ pointerEvents: 'none' }}>
          <LabelTag hotspot={h} label={part.name.en} labelBg={ringStroke} />
        </g>
      )}
    </g>
  )
}

function LabelTag({
  hotspot,
  label,
  labelBg,
}: {
  hotspot: NeuroneStructureExtra['parts'][number]['hotspot']
  label: string
  labelBg: string
}) {
  // Place the label tag above the hotspot, regardless of shape.
  const top =
    hotspot.type === 'circle'
      ? hotspot.cy - hotspot.r
      : hotspot.type === 'ellipse'
        ? hotspot.cy - hotspot.ry
        : hotspot.y
  const cx =
    hotspot.type === 'circle'
      ? hotspot.cx
      : hotspot.type === 'ellipse'
        ? hotspot.cx
        : hotspot.x + hotspot.width / 2
  return (
    <>
      <rect x={cx - 60} y={top - 28} width="120" height="22" rx="4" fill={labelBg} />
      <text x={cx} y={top - 13} textAnchor="middle" fontSize="11" fontWeight="600" fill="white">
        {label}
      </text>
    </>
  )
}
