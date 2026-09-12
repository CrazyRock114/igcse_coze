import { useState } from 'react'
import type { GlucoseLoopExtra, AnatomyOrgan } from '@/content/types'
import { T } from '@/components/i18n/T'
import { GLUCOSE_LOOP } from '@/lib/lessonExtrasStrings'
import { assetUrl } from '@/lib/assetUrl'

/**
 * Blood glucose regulation, in one picture. G8 Figure B9.20 — the loop
 * pancreas ↔ liver ↔ blood, with red arrows for the "high" path (insulin
 * lowers blood glucose) and blue arrows for the "low" path (glucagon
 * raises it).
 *
 * Three modes:
 *   - high:  after a meal. Insulin is secreted; the liver stores glucose
 *            as glycogen; blood glucose falls.
 *   - low:   after exercise. Glucagon is secreted; the liver breaks
 *            glycogen back to glucose; blood glucose rises.
 *   - normal: the set point. Both loops are quiet.
 *
 * Each mode highlights a different set of arrows on the figure and shows
 * the matching explanation in the side panel. The pancreas, islets of
 * Langerhans, the liver (twice — once for each direction) and the
 * "normal levels" bubble are clickable hotspots regardless of mode.
 *
 * Coordinates: figure-b9-20 is 809 × 535 px.
 */
const IMG_W = 809
const IMG_H = 535

type Mode = 'high' | 'normal' | 'low'

type Hotspot = { type: 'circle'; x: number; y: number; r: number }
  | { type: 'ellipse'; x: number; y: number; rx: number; ry: number }

const HOTSPOTS: Record<string, Hotspot> = {
  // The pancreas — the elongated yellow/green shape on the left of the
  // figure.
  pancreas: { type: 'ellipse', x: 175, y: 280, rx: 90, ry: 80 },
  // The islets of Langerhans are the cell groups inside the pancreas that
  // actually secrete the hormones.
  'islets-of-langerhans': { type: 'ellipse', x: 220, y: 290, rx: 35, ry: 30 },
  // The top liver — the upper orange shape, where glucose is taken in and
  // stored as glycogen when blood glucose is high.
  'liver-uptake': { type: 'ellipse', x: 480, y: 120, rx: 130, ry: 70 },
  // The bottom liver — the lower orange shape, where glycogen is broken
  // back to glucose and released when blood glucose is low.
  'liver-release': { type: 'ellipse', x: 460, y: 410, rx: 130, ry: 65 },
  // The "normal levels" bubble — the light blue oval on the right that the
  // system tries to return to.
  'normal-bubble': { type: 'ellipse', x: 700, y: 290, rx: 90, ry: 60 },
}

export function GlucoseLoop({ extra }: { extra: GlucoseLoopExtra }) {
  const [mode, setMode] = useState<Mode>('normal')
  const [selectedId, setSelectedId] = useState<string | null>('pancreas')
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const selected = useMemo(
    () => extra.parts.find((p) => p.id === selectedId) ?? null,
    [extra.parts, selectedId]
  )

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_300px]">
      <div>
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <ModeButton active={mode === 'high'} onClick={() => setMode('high')}>
            <T value={GLUCOSE_LOOP.modeHigh} />
          </ModeButton>
          <ModeButton active={mode === 'normal'} onClick={() => setMode('normal')}>
            <T value={GLUCOSE_LOOP.modeNormal} />
          </ModeButton>
          <ModeButton active={mode === 'low'} onClick={() => setMode('low')}>
            <T value={GLUCOSE_LOOP.modeLow} />
          </ModeButton>
        </div>

        <p className="mb-2 text-xs text-muted">
          <T value={GLUCOSE_LOOP.intro} />
        </p>

        <FigureWithOverlay
          parts={extra.parts}
          mode={mode}
          selectedId={selectedId}
          hoveredId={hoveredId}
          onSelect={setSelectedId}
          onHover={setHoveredId}
        />
      </div>

      <aside className="rounded-lg border border-line bg-canvas p-3 text-sm">
        {selected ? (
          <PartPanel part={selected} mode={mode} />
        ) : (
          <p className="text-muted">
            <T value={GLUCOSE_LOOP.setPoint} />
          </p>
        )}
      </aside>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

import { useMemo } from 'react'

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

function PartPanel({ part, mode }: { part: AnatomyOrgan; mode: Mode }) {
  return (
    <div>
      <h3 className="mb-1 text-base font-semibold text-ink">
        <T value={part.name} />
      </h3>
      <p className="mb-2 leading-relaxed text-ink-soft">
        <T value={part.description} />
      </p>
      {/* Show the matching hormone effect for the two organs that produce
          them — the islets (insulin/glucagon) and the liver. The pancreas
          and the bubble get only their description. */}
      {part.id === 'islets-of-langerhans' && (
        <div className="mt-2 space-y-1.5 border-t border-line pt-2 text-xs">
          {mode === 'high' && (
            <p className="text-ink">
              <span className="font-semibold">
                <T value={GLUCOSE_LOOP.insulinLabel} />
              </span>{' '}
              · <T value={GLUCOSE_LOOP.insulinEffect} />
            </p>
          )}
          {mode === 'low' && (
            <p className="text-ink">
              <span className="font-semibold">
                <T value={GLUCOSE_LOOP.glucagonLabel} />
              </span>{' '}
              · <T value={GLUCOSE_LOOP.glucagonEffect} />
            </p>
          )}
          {mode === 'normal' && (
            <p className="text-muted">
              <T value={GLUCOSE_LOOP.setPoint} />
            </p>
          )}
        </div>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Figure + hotspot overlay
// ---------------------------------------------------------------------------

function FigureWithOverlay({
  parts,
  mode,
  selectedId,
  hoveredId,
  onSelect,
  onHover,
}: {
  parts: AnatomyOrgan[]
  mode: Mode
  selectedId: string | null
  hoveredId: string | null
  onSelect: (id: string) => void
  onHover: (id: string | null) => void
}) {
  return (
    <figure className="relative m-0 overflow-hidden rounded-lg border border-line bg-canvas">
      <img
        src={assetUrl('/figures/g8/14-3-homeostasis/figure-b9-20.png')}
        alt="How blood glucose concentration is regulated: the pancreas and the liver acting on the blood through insulin and glucagon"
        className="block w-full"
        draggable={false}
      />
      <figcaption className="border-t border-line bg-canvas px-3 py-1.5 text-[11px] text-muted">
        G8 Science · p.58, Figure B9.20 · click an organ to read about it
      </figcaption>

      <svg
        viewBox={`0 0 ${IMG_W} ${IMG_H}`}
        className="absolute inset-0 h-full w-full"
        style={{ pointerEvents: 'none' }}
        aria-hidden="true"
      >
        {/* Mode overlay — highlights the active arrows as semi-transparent
            red (high) or blue (low) washes over the figure, or shows
            neither in the "normal" mode. The base image is unchanged. */}
        {mode === 'high' && (
          <g style={{ pointerEvents: 'none' }} opacity="0.18">
            <rect x="0" y="0" width={IMG_W} height={IMG_H} fill="#dc2626" />
          </g>
        )}
        {mode === 'low' && (
          <g style={{ pointerEvents: 'none' }} opacity="0.18">
            <rect x="0" y="0" width={IMG_W} height={IMG_H} fill="#2563eb" />
          </g>
        )}

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
      data-glucose-hotspot={label}
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
