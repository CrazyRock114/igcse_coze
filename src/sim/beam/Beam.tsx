import type { SimViewProps } from '../SimStage'
import { formatSigFigs } from '@/lib/units'

const W = 480
const H = 300
const PAD = 16

/**
 * A balance beam on a pivot.
 *
 * The whole point is cause and effect you can feel: move a weight outwards and the
 * beam swings, even though the mass has not changed. That is what makes "moment
 * depends on distance too" stick.
 *
 * The tilt comes from the kernel, so the beam is level exactly when the arithmetic
 * says the moments are equal (asserted in kernel.test.ts).
 */
export function Beam({ result }: SimViewProps) {
  const bounds = result.bounds ?? { xMin: -0.62, xMax: 0.62, yMin: -0.42, yMax: 0.3 }
  const sx = (x: number) => PAD + ((x - bounds.xMin) / (bounds.xMax - bounds.xMin)) * (W - 2 * PAD)
  const sy = (y: number) => PAD + ((bounds.yMax - y) / (bounds.yMax - bounds.yMin)) * (H - 2 * PAD)
  // Radii are in simulation units on the x axis; convert with the same scale.
  const sr = (r: number) => (r / (bounds.xMax - bounds.xMin)) * (W - 2 * PAD)

  const beam = result.series.find((s) => s.key === 'beam')
  const balanced = result.readouts['balanced'] === 1
  const net = result.readouts['netMoment'] ?? 0
  const pivotX = sx(0)
  const pivotY = sy(0)

  return (
    <figure className="m-0">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full select-none"
        role="img"
        aria-label={
          balanced
            ? 'Balance beam, level. The moments are equal.'
            : `Balance beam tilted ${net > 0 ? 'right' : 'left'} side down. Net moment ${formatSigFigs(Math.abs(net), 2)} newton metres.`
        }
      >
        {/* Ground */}
        <line
          x1={PAD}
          y1={sy(bounds.yMin) + 2}
          x2={W - PAD}
          y2={sy(bounds.yMin) + 2}
          stroke="#cbd5e1"
          strokeWidth={2}
        />

        {/* Level reference, so a small tilt is still visible */}
        <line
          x1={sx(bounds.xMin + 0.02)}
          y1={pivotY}
          x2={sx(bounds.xMax - 0.02)}
          y2={pivotY}
          stroke="#e2e8f0"
          strokeWidth={1}
          strokeDasharray="4 5"
        />

        {beam && beam.points.length === 2 && (
          <>
            {/* Distance brackets from the pivot to each weight */}
            {result.bodies?.map((b, i) => (
              <line
                key={`d${i}`}
                x1={pivotX}
                y1={pivotY}
                x2={sx(b.x)}
                y2={sy(b.y)}
                stroke={i === 0 ? '#7c3aed' : '#0d9488'}
                strokeWidth={1}
                strokeDasharray="3 3"
                opacity={0.6}
              />
            ))}

            {/* The beam itself */}
            <line
              x1={sx(beam.points[0]![0])}
              y1={sy(beam.points[0]![1])}
              x2={sx(beam.points[1]![0])}
              y2={sy(beam.points[1]![1])}
              stroke="#334155"
              strokeWidth={7}
              strokeLinecap="round"
            />

            {/* Weights, hanging from the beam */}
            {result.bodies?.map((b, i) => {
              const cx = sx(b.x)
              const cy = sy(b.y)
              const r = Math.max(9, sr(b.r ?? 0.05))
              const colour = i === 0 ? '#7c3aed' : '#0d9488'
              return (
                <g key={i}>
                  <line x1={cx} y1={cy} x2={cx} y2={cy + r + 4} stroke="#94a3b8" strokeWidth={1.5} />
                  <circle
                    cx={cx}
                    cy={cy + r + 4 + r}
                    r={r}
                    fill={colour}
                    opacity={0.85}
                    stroke="#fff"
                    strokeWidth={2}
                  />
                </g>
              )
            })}
          </>
        )}

        {/* Pivot triangle, drawn last so it sits on top of the beam */}
        <polygon
          points={`${pivotX},${pivotY} ${pivotX - 16},${pivotY + 34} ${pivotX + 16},${pivotY + 34}`}
          fill="#64748b"
        />

        {/* Verdict on the canvas, where the student is already looking */}
        <text
          x={W / 2}
          y={H - 4}
          textAnchor="middle"
          fontSize={13}
          fontWeight={700}
          fill={balanced ? '#0d9488' : '#c2410c'}
        >
          {balanced
            ? 'Balanced — moments are equal'
            : net > 0
              ? 'Right side sinks — clockwise moment is larger'
              : 'Left side sinks — anticlockwise moment is larger'}
        </text>
      </svg>

      <figcaption className="mt-1 flex flex-wrap justify-center gap-x-4 text-xs text-muted">
        <span className="inline-flex items-center gap-1">
          <span className="inline-block size-2.5 rounded-full bg-violet-600" />
          left (anticlockwise)
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="inline-block size-2.5 rounded-full bg-teal-600" />
          right (clockwise)
        </span>
      </figcaption>
    </figure>
  )
}
