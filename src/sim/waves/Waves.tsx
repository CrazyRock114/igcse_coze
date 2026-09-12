import type { SimViewProps } from '../SimStage'

const W = 480
const H = 300
const PAD = 22
const SPLIT = 0.52

/**
 * A travelling wave, shown two ways at once.
 *
 * Top: the medium itself, so you can see *how the particles move* — up and down for a
 * transverse wave, back and forth for a longitudinal one. Bottom: the displacement
 * graph, which is what exam questions actually print. Seeing both at the same time is
 * what stops students reading a longitudinal wave's graph as an up-and-down motion.
 *
 * Wavelength is marked on the graph, so λ is something you can point at.
 */
export function Waves({ result, params }: SimViewProps) {
  const bounds = result.bounds ?? { xMin: 0, xMax: 4, yMin: -1.35, yMax: 1.35 }
  const isLongitudinal = (params['longitudinal'] ?? 0) >= 0.5
  const wavelength = params['wavelength'] ?? 1

  const mediumH = (H - 2 * PAD) * SPLIT
  const graphH = (H - 2 * PAD) * (1 - SPLIT) - 14

  const sx = (x: number) => PAD + ((x - bounds.xMin) / (bounds.xMax - bounds.xMin)) * (W - 2 * PAD)
  // Medium panel: y in [-1, 1] maps into the top band.
  const my = (y: number) => PAD + ((1 - y) / 2) * mediumH
  // Graph panel: displacement maps into the lower band.
  const gy = (y: number) => PAD + mediumH + 26 + ((1 - y / 1.35) / 2) * graphH

  const path = result.series[0]!.points
    .map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${sx(x).toFixed(2)},${gy(y).toFixed(2)}`)
    .join(' ')

  const axisY = gy(0)

  return (
    <figure className="m-0">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full select-none"
        role="img"
        aria-label={`${isLongitudinal ? 'Longitudinal' : 'Transverse'} wave. Wavelength ${wavelength} metres, speed ${(result.readouts['waveSpeed'] ?? 0).toFixed(2)} metres per second.`}
      >
        {/* --- medium --- */}
        <rect x={PAD} y={PAD} width={W - 2 * PAD} height={mediumH} fill="#f8fafc" rx={4} />

        {result.bodies?.map((b, i) => (
          <circle key={i} cx={sx(b.x)} cy={my(b.y)} r={3.2} fill="#0d9488" opacity={0.8} />
        ))}

        {/* Vibration-direction arrow: the one thing that distinguishes the two types */}
        {isLongitudinal ? (
          <g stroke="#c2410c" strokeWidth={1.6} fill="none">
            <line x1={W - PAD - 46} y1={PAD + 12} x2={W - PAD - 10} y2={PAD + 12} />
            <polyline points={`${W - PAD - 16},${PAD + 8} ${W - PAD - 10},${PAD + 12} ${W - PAD - 16},${PAD + 16}`} />
            <polyline points={`${W - PAD - 40},${PAD + 8} ${W - PAD - 46},${PAD + 12} ${W - PAD - 40},${PAD + 16}`} />
          </g>
        ) : (
          <g stroke="#c2410c" strokeWidth={1.6} fill="none">
            <line x1={W - PAD - 28} y1={PAD + 6} x2={W - PAD - 28} y2={PAD + 40} />
            <polyline points={`${W - PAD - 32},${PAD + 12} ${W - PAD - 28},${PAD + 6} ${W - PAD - 24},${PAD + 12}`} />
            <polyline points={`${W - PAD - 32},${PAD + 34} ${W - PAD - 28},${PAD + 40} ${W - PAD - 24},${PAD + 34}`} />
          </g>
        )}

        <text x={PAD + 4} y={PAD + 13} fontSize={10} fontWeight={600} fill="#334155">
          {isLongitudinal ? 'particles vibrate along the wave' : 'particles vibrate across the wave'}
        </text>

        {/* Direction of travel */}
        <g stroke="#64748b" strokeWidth={1.4} fill="none">
          <line x1={PAD + 4} y1={PAD + mediumH + 12} x2={PAD + 74} y2={PAD + mediumH + 12} />
          <polyline
            points={`${PAD + 68},${PAD + mediumH + 8} ${PAD + 74},${PAD + mediumH + 12} ${PAD + 68},${PAD + mediumH + 16}`}
          />
        </g>
        <text x={PAD + 80} y={PAD + mediumH + 16} fontSize={10} fill="#64748b">
          direction of travel
        </text>

        {/* --- displacement graph --- */}
        <line x1={PAD} y1={axisY} x2={W - PAD} y2={axisY} stroke="#cbd5e1" strokeWidth={1} />
        <path d={path} fill="none" stroke="#2563eb" strokeWidth={2.5} strokeLinejoin="round" />

        {/* One wavelength marked out, so λ is a thing you can point at.
            Placed in the headroom above the crest — where textbooks put it — rather
            than below the trough, which runs out of the viewBox. */}
        {wavelength > 0 && sx(wavelength) < W - PAD && (
          <g stroke="#7c3aed" strokeWidth={1.4}>
            <line x1={sx(0)} y1={gy(1.12)} x2={sx(wavelength)} y2={gy(1.12)} />
            <line x1={sx(0)} y1={gy(1.02)} x2={sx(0)} y2={gy(1.22)} />
            <line x1={sx(wavelength)} y1={gy(1.02)} x2={sx(wavelength)} y2={gy(1.22)} />
            <text
              x={(sx(0) + sx(wavelength)) / 2}
              y={gy(1.12) - 5}
              textAnchor="middle"
              fontSize={12}
              fontStyle="italic"
              fill="#7c3aed"
              stroke="none"
            >
              λ
            </text>
          </g>
        )}

        <text x={PAD} y={H - 4} fontSize={10} fill="#64748b">
          displacement against distance
        </text>
      </svg>
    </figure>
  )
}
