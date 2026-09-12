import type { SimViewProps } from '../SimStage'
import { T } from '@/components/i18n/T'

const W = 460
const H = 340
const MARGIN = { top: 22, bottom: 46, left: 30, right: 16 }

/**
 * A developed chromatogram: the paper, the pencil baseline, the solvent front and the spots.
 *
 * Drawn the way it is set up rather than the way an answer is written, because the two lines
 * a student has to identify are the two that are easiest to forget. The baseline is dashed
 * and labelled as pencil — ink would dissolve and run up the paper with everything else,
 * which is the reason for the rule and the reason it is worth drawing.
 *
 * Every spot is placed from its distance in centimetres, and its Rf is printed beside it. The
 * two cannot disagree, which is the point being made: run the plate for longer and the
 * distances all change while the ratios do not.
 */
export function Chromatogram({ result }: SimViewProps) {
  const chart = result.chromatogram
  const note = result.markers?.[0]

  if (!chart || chart.lanes.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-line px-4 py-8 text-center text-sm text-muted">
        This kernel did not return a chromatogram to draw.
      </p>
    )
  }

  const plotH = H - MARGIN.top - MARGIN.bottom
  const plotW = W - MARGIN.left - MARGIN.right
  // A little headroom above the solvent front, so the front line is not flush to the edge.
  const scale = plotH / (chart.solventDistance * 1.12)
  const baseY = MARGIN.top + plotH
  const y = (distance: number) => baseY - distance * scale

  const laneW = plotW / chart.lanes.length
  const laneX = (i: number) => MARGIN.left + laneW * (i + 0.5)

  return (
    <figure className="m-0">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full select-none"
        role="img"
        aria-label={`Chromatogram with ${chart.lanes.length} lanes; the solvent front travelled ${chart.solventDistance} centimetres`}
      >
        <rect
          x={MARGIN.left - 8}
          y={MARGIN.top - 10}
          width={plotW + 16}
          height={plotH + 18}
          fill="#fffdf7"
          stroke="#e2e8f0"
        />

        <line
          x1={MARGIN.left - 8}
          y1={y(chart.solventDistance)}
          x2={W - MARGIN.right + 8}
          y2={y(chart.solventDistance)}
          stroke="#0891b2"
          strokeWidth={1.5}
        />
        <text x={MARGIN.left - 6} y={y(chart.solventDistance) - 6} fontSize={10} fill="#0e7490">
          solvent front · {chart.solventDistance} cm
        </text>

        <line
          x1={MARGIN.left - 8}
          y1={baseY}
          x2={W - MARGIN.right + 8}
          y2={baseY}
          stroke="#94a3b8"
          strokeWidth={1.4}
          strokeDasharray="5 3"
        />
        <text x={MARGIN.left - 6} y={baseY + 14} fontSize={10} fill="#64748b">
          baseline, drawn in pencil
        </text>

        {chart.lanes.map((lane, i) => (
          <g key={i}>
            {lane.spots.map((spot, j) => (
              <g key={j}>
                <ellipse
                  cx={laneX(i)}
                  cy={y(spot.distance)}
                  rx={13}
                  ry={7}
                  fill={spot.highlighted ? '#0d9488' : '#cbd5e1'}
                  stroke={spot.highlighted ? '#0f766e' : '#94a3b8'}
                  strokeWidth={1.2}
                />
                <text
                  x={laneX(i) + 17}
                  y={y(spot.distance) + 4}
                  fontSize={10}
                  fill={spot.highlighted ? '#0f766e' : '#64748b'}
                >
                  {spot.rf.toFixed(2)}
                </text>
              </g>
            ))}
            <text
              x={laneX(i)}
              y={H - 10}
              textAnchor="middle"
              fontSize={10}
              fontWeight={600}
              fill="#334155"
            >
              {lane.label.en}
            </text>
          </g>
        ))}
      </svg>

      {note && (
        <p className="mt-3 rounded-lg border border-line bg-canvas px-3 py-2 text-sm text-ink-soft">
          <T value={note.label} />
        </p>
      )}
    </figure>
  )
}

export default Chromatogram
