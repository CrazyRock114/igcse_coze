import type { SimViewProps } from '../SimStage'

const W = 480
const H = 300
const PAD = 20
/** Widest the container can be drawn, in pixels. Smaller volumes shrink from the right. */
const MAX_BOX_W = W - 2 * PAD - 56

/**
 * Gas particles in a container with a movable wall.
 *
 * This is the lesson where something invisible becomes visible: pressure is not a
 * property the gas "has", it is the drumming of particles on the walls. Compress the
 * box and the drumming gets faster — you can see why the pressure gauge rises.
 *
 * The piston is drawn at the right-hand wall so a change in volume reads as a physical
 * squeeze rather than a rescale of the whole picture.
 */
export function Particles({ result, params }: SimViewProps) {
  const volume = params['volume'] ?? 1
  const bounds = result.bounds ?? { xMin: 0, xMax: volume, yMin: 0, yMax: 1 }

  const boxW = MAX_BOX_W * volume
  const boxH = H - 2 * PAD - 26
  const boxX = PAD
  const boxY = PAD

  const sx = (x: number) => boxX + (x / (bounds.xMax || 1)) * boxW
  const sy = (y: number) => boxY + (1 - y / (bounds.yMax || 1)) * boxH

  const speed = result.readouts['meanSpeed'] ?? 1
  const collisionRate = result.readouts['collisionRate'] ?? 0

  // Pressure bar is relative; 2.0 is the top of the range the sliders can reach.
  const pressureFrac = Math.min(1, (result.readouts['pressure'] ?? 0) / 2)

  return (
    <figure className="m-0">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full select-none"
        role="img"
        aria-label={`${result.bodies?.length ?? 0} gas particles in a container. Mean speed ${speed.toFixed(2)} relative units, ${collisionRate.toFixed(1)} wall collisions per second per particle.`}
      >
        {/* Container walls */}
        <rect x={boxX} y={boxY} width={boxW} height={boxH} fill="#f8fafc" stroke="#334155" strokeWidth={2} />

        {/* Particles. Faster ones are warmer in colour, so the speed spread is visible. */}
        {result.bodies?.map((b, i) => (
          <circle
            key={i}
            cx={sx(b.x)}
            cy={sy(b.y)}
            r={Math.max(2.5, (b.r ?? 0.02) * boxH)}
            fill={b.kind === 'fast' ? '#e11d48' : '#2563eb'}
            opacity={b.kind === 'fast' ? 0.9 : 0.72}
          />
        ))}

        {/* Piston at the movable wall */}
        <g>
          <rect x={boxX + boxW - 3} y={boxY} width={6} height={boxH} fill="#64748b" />
          <rect x={boxX + boxW + 3} y={boxY + boxH / 2 - 5} width={40} height={10} fill="#94a3b8" />
          <text
            x={boxX + boxW + 24}
            y={boxY + boxH / 2 - 12}
            textAnchor="middle"
            fontSize={9}
            fill="#64748b"
          >
            piston
          </text>
        </g>

        {/* Pressure gauge — the macroscopic consequence, next to its microscopic cause */}
        <g>
          <text x={boxX} y={H - 12} fontSize={10} fill="#64748b">
            pressure
          </text>
          <rect x={boxX + 52} y={H - 21} width={MAX_BOX_W} height={11} rx={5} fill="#e2e8f0" />
          <rect
            x={boxX + 52}
            y={H - 21}
            width={Math.max(2, MAX_BOX_W * pressureFrac)}
            height={11}
            rx={5}
            fill="#e11d48"
          />
        </g>
      </svg>

      <figcaption className="mt-1 flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-muted">
        <span className="inline-flex items-center gap-1">
          <span className="inline-block size-2.5 rounded-full bg-blue-600 opacity-75" />
          typical speed
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="inline-block size-2.5 rounded-full bg-rose-600" />
          faster than average
        </span>
      </figcaption>
    </figure>
  )
}
