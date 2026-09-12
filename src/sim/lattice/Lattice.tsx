import type { SimViewProps } from '../SimStage'
import { T } from '@/components/i18n/T'

const W = 460
const H = 220

/**
 * A block of metal atoms in rows, with the upper layers pushed sideways.
 *
 * The whole of "why is an alloy harder" is here in the geometry: layers of identical
 * atoms slide, layers with a differently sized atom wedged in them catch. Drawing it is
 * worth more than stating it, because the student can push the layers themselves and feel
 * where they stop.
 *
 * The arrow marks the slip plane — the boundary the upper layers move across.
 */
export function Lattice({ result }: SimViewProps) {
  const bodies = result.bodies ?? []
  // Marker convention: [0] names the material, [1] is the headline and [2] the note.
  const [name, headline, note] = result.markers ?? []

  const bounds = result.bounds ?? { xMin: -1, xMax: 9, yMin: -1, yMax: 3 }
  const scale = Math.min(
    (W - 20) / (bounds.xMax - bounds.xMin),
    (H - 20) / (bounds.yMax - bounds.yMin)
  )
  const cx = W / 2 - ((bounds.xMin + bounds.xMax) / 2) * scale
  const cy = H / 2 + ((bounds.yMin + bounds.yMax) / 2) * scale

  const sx = (x: number) => cx + x * scale
  // Rows count upwards in the model and downwards on the screen.
  const sy = (y: number) => cy - y * scale

  const plane = bodies.find((b) => b.kind === 'slip-plane')

  return (
    <figure className="m-0">
      {headline && (
        <p className="mb-2 text-center text-sm font-semibold text-ink-soft">
          <T value={headline.label} />
        </p>
      )}

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full select-none"
        role="img"
        aria-label={`Metal structure: ${name?.label.en ?? ''}`}
      >
        <rect x={0} y={0} width={W} height={H} fill="#f8fafc" />

        {plane && (
          <g>
            <line
              x1={12}
              y1={sy(plane.y)}
              x2={W - 12}
              y2={sy(plane.y)}
              stroke="#cbd5e1"
              strokeWidth={1.4}
              strokeDasharray="5 4"
            />
            <text x={14} y={sy(plane.y) - 6} fontSize={10} fill="#94a3b8">
              layers above here are being pushed →
            </text>
          </g>
        )}

        {bodies.map((b, i) => {
          if (b.kind === 'slip-plane') return null
          const guest = b.kind === 'guest'
          return (
            <circle
              key={i}
              cx={sx(b.x)}
              cy={sy(b.y)}
              r={(b.r ?? 0.5) * scale * 0.92}
              fill={guest ? '#f59e0b' : '#cbd5e1'}
              stroke={guest ? '#b45309' : '#94a3b8'}
              strokeWidth={1.2}
            />
          )
        })}
      </svg>

      {note && (
        <p className="mt-2 text-center text-sm text-muted">
          <T value={note.label} />
        </p>
      )}

      <figcaption className="mt-1 flex flex-wrap justify-center gap-x-4 text-xs text-muted">
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block size-2.5 rounded-full bg-slate-300 ring-1 ring-slate-400" />
          atoms of the main metal
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block size-2.5 rounded-full bg-amber-500 ring-1 ring-amber-700" />
          atoms of the other element
        </span>
      </figcaption>
    </figure>
  )
}
