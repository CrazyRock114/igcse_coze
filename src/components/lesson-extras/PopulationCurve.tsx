import { useMemo, useState } from 'react'
import type { PopulationCurveExtra, PopulationPoint } from '@/content/types'
import { T } from '@/components/i18n/T'
import { POPULATION_CURVE } from '@/lib/lessonExtrasStrings'

/**
 * The sigmoid (S-shaped) population growth curve (G8 19.4, syllabus
 * 19.4.1–19.4.5). No real PDF figure is available for this chapter,
 * so the curve is hand-drawn from a small array of data points.
 *
 * The student picks a phase to highlight (lag, exponential, stationary,
 * decline) and the matching description appears below. The four phases
 * match the four common textbook labels for the curve.
 */
const SVG_W = 720
const SVG_H = 380

export function PopulationCurve({ extra }: { extra: PopulationCurveExtra }) {
  const [phase, setPhase] = useState<PopulationPoint['phase']>(
    extra.initialPhase ?? 'exponential'
  )

  const points = extra.points
  const maxX = Math.max(...points.map((p) => p.x))
  const maxY = Math.max(...points.map((p) => p.y), 1)
  const selected = points.find((p) => p.phase === phase) ?? null

  const path = useMemo(() => buildPath(points, maxX, maxY), [points, maxX, maxY])

  return (
    <div className="space-y-4">
      <p className="text-sm text-ink-soft">
        <T value={extra.intro} />
      </p>

      <div className="grid gap-4 lg:grid-cols-[1fr_300px]">
        <figure className="m-0 overflow-hidden rounded-lg border border-line bg-canvas">
          <svg
            viewBox={`0 0 ${SVG_W} ${SVG_H}`}
            className="block w-full"
            role="img"
            aria-label={extra.title.en}
          >
            <title>{extra.title.en}</title>

            {/* Axes */}
            <line
              x1={50}
              y1={SVG_H - 40}
              x2={SVG_W - 20}
              y2={SVG_H - 40}
              stroke="#0f172a"
              strokeWidth={1.5}
            />
            <line
              x1={50}
              y1={20}
              x2={50}
              y2={SVG_H - 40}
              stroke="#0f172a"
              strokeWidth={1.5}
            />

            {/* Axis labels */}
            <text
              x={SVG_W / 2}
              y={SVG_H - 10}
              fontSize={11}
              fill="#0f172a"
              textAnchor="middle"
              fontWeight={500}
            >
              {extra.xAxisLabel}
            </text>
            <text
              x={20}
              y={20}
              fontSize={11}
              fill="#0f172a"
              textAnchor="start"
              fontWeight={500}
            >
              {extra.yAxisLabel}
            </text>

            {/* Carrying capacity line */}
            {extra.carryingCapacity !== undefined && (
              <line
                x1={50}
                y1={scaleY(extra.carryingCapacity, maxY)}
                x2={SVG_W - 20}
                y2={scaleY(extra.carryingCapacity, maxY)}
                stroke="#dc2626"
                strokeWidth={1.5}
                strokeDasharray="6 4"
              />
            )}
            {extra.carryingCapacity !== undefined && (
              <text
                x={SVG_W - 24}
                y={scaleY(extra.carryingCapacity, maxY) - 4}
                fontSize={10}
                fill="#dc2626"
                textAnchor="end"
                fontWeight={500}
              >
                <T value={POPULATION_CURVE.carryingCapacityLabel} />
              </text>
            )}

            {/* Curve */}
            <path d={path} fill="none" stroke="#0d9488" strokeWidth={2.5} />

            {/* Phase dots */}
            {points.map((p) => {
              const cx = scaleX(p.x, maxX)
              const cy = scaleY(p.y, maxY)
              const isSelected = p.phase === phase
              return (
                <g
                  key={p.phase}
                  onClick={() => setPhase(p.phase)}
                  style={{ cursor: 'pointer' }}
                  data-population-curve-hotspot={p.phase}
                >
                  <circle
                    cx={cx}
                    cy={cy}
                    r={isSelected ? 10 : 6}
                    fill={isSelected ? '#0d9488' : '#fff'}
                    stroke={isSelected ? '#0d9488' : '#475569'}
                    strokeWidth={isSelected ? 3 : 1.5}
                  />
                  <text
                    x={cx}
                    y={cy - 14}
                    fontSize={10}
                    fill="#0f172a"
                    textAnchor="middle"
                    fontWeight={isSelected ? 600 : 400}
                  >
                    <T value={p.label} />
                  </text>
                </g>
              )
            })}
          </svg>
          <figcaption className="border-t border-line bg-canvas px-3 py-1.5 text-[11px] text-muted">
            <T value={extra.title} />
          </figcaption>
        </figure>

        <SidePanel point={selected} />
      </div>
    </div>
  )
}

function SidePanel({ point }: { point: PopulationPoint | null }) {
  if (!point) {
    return (
      <aside className="rounded-lg border border-line bg-surface p-4">
        <p className="text-sm text-muted">
          <T value={POPULATION_CURVE.empty} />
        </p>
      </aside>
    )
  }
  return (
    <aside className="space-y-3 rounded-lg border border-line bg-surface p-4">
      <h3 className="text-base font-semibold text-ink">
        <T value={point.label} />
      </h3>
      <p className="text-sm text-ink-soft">
        <T value={point.description} />
      </p>
      {point.factors && (
        <div>
          <div className="mb-1 text-xs font-semibold text-muted">
            <T value={POPULATION_CURVE.factorsHeading} />
          </div>
          <ul className="space-y-1 text-sm text-ink-soft">
            {point.factors.map((f, i) => (
              <li key={i}>· <T value={f} /></li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  )
}

// ----- helpers -----

function scaleX(x: number, maxX: number): number {
  return 50 + (x / maxX) * (SVG_W - 80)
}

function scaleY(y: number, maxY: number): number {
  return 20 + (1 - y / maxY) * (SVG_H - 80)
}

function buildPath(points: PopulationPoint[], maxX: number, maxY: number): string {
  if (points.length === 0) return ''
  const segments: string[] = []
  points.forEach((p, i) => {
    const cx = scaleX(p.x, maxX)
    const cy = scaleY(p.y, maxY)
    if (i === 0) {
      segments.push(`M ${cx} ${cy}`)
    } else {
      segments.push(`L ${cx} ${cy}`)
    }
  })
  return segments.join(' ')
}
