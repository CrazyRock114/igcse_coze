import type { SimViewProps } from '../SimStage'
import { T } from '@/components/i18n/T'

const W = 460
const H = 320

/**
 * A giant structure — atoms at fixed positions with the bonds between them drawn.
 *
 * Unlike the molecule primitive, nothing is laid out here: the kernel supplies coordinates
 * and this draws them. Giant structures are about geometry, and a layout algorithm that
 * decided where the atoms went would be deciding the content.
 *
 * Delocalised electrons are drawn as small filled dots in the gaps rather than attached to
 * any atom, which is the point being made about them.
 *
 * Marker convention, shared with the lattice and bonding primitives: [0] names the
 * structure, [1] is the headline above the drawing and [2] the note below it.
 */
export function Giant({ result }: SimViewProps) {
  const bodies = result.bodies ?? []
  const links = result.links ?? []
  const [name, headline, note] = result.markers ?? []

  const bounds = result.bounds ?? { xMin: -1, xMax: 9, yMin: -1, yMax: 5 }
  const scale = Math.min(
    (W - 24) / (bounds.xMax - bounds.xMin),
    (H - 24) / (bounds.yMax - bounds.yMin),
  )
  const cx = W / 2 - ((bounds.xMin + bounds.xMax) / 2) * scale
  const cy = H / 2 + ((bounds.yMin + bounds.yMax) / 2) * scale

  const sx = (x: number) => cx + x * scale
  // Rows count upwards in the model and downwards on the screen.
  const sy = (y: number) => cy - y * scale

  const hasElectrons = bodies.some((b) => b.kind === 'electron')
  const otherLabel = bodies.find((b) => b.kind === 'other')?.label

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
        aria-label={`Structure of ${name?.label.en ?? 'a giant structure'}: ${bodies.filter((b) => b.kind !== 'electron').length} atoms and ${links.length} bonds`}
      >
        <rect x={0} y={0} width={W} height={H} fill="#f8fafc" />

        {links.map((l, i) => {
          const a = bodies[l.a]
          const b = bodies[l.b]
          if (!a || !b) return null
          return (
            <line
              key={i}
              x1={sx(a.x)}
              y1={sy(a.y)}
              x2={sx(b.x)}
              y2={sy(b.y)}
              stroke="#94a3b8"
              strokeWidth={2}
            />
          )
        })}

        {bodies.map((b, i) => {
          if (b.kind === 'electron') {
            return (
              <circle
                key={i}
                cx={sx(b.x)}
                cy={sy(b.y)}
                r={(b.r ?? 0.14) * scale}
                fill="#0d9488"
                stroke="#0f766e"
                strokeWidth={1}
              />
            )
          }
          const ion = b.kind === 'ion'
          const other = b.kind === 'other'
          return (
            <g key={i}>
              <circle
                cx={sx(b.x)}
                cy={sy(b.y)}
                r={(b.r ?? 0.34) * scale}
                fill={ion ? '#fca5a5' : other ? '#bfdbfe' : '#e2e8f0'}
                stroke={ion ? '#b91c1c' : other ? '#1d4ed8' : '#64748b'}
                strokeWidth={1.4}
              />
              {b.label && (
                <text
                  x={sx(b.x)}
                  y={sy(b.y) + 4}
                  textAnchor="middle"
                  fontSize={11}
                  fontWeight={600}
                  fill="#0f172a"
                >
                  {b.label}
                </text>
              )}
            </g>
          )
        })}
      </svg>

      {note && (
        <p className="mt-2 rounded-lg border border-line bg-canvas px-3 py-2 text-sm text-ink-soft">
          <T value={note.label} />
        </p>
      )}

      <figcaption className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-muted">
        {bodies.some((b) => b.kind === 'atom') && (
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block size-2.5 rounded-full bg-slate-200 ring-1 ring-slate-500" />
            atoms
          </span>
        )}
        {otherLabel && (
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block size-2.5 rounded-full bg-blue-200 ring-1 ring-blue-700" />
            {otherLabel} atoms
          </span>
        )}
        {bodies.some((b) => b.kind === 'ion') && (
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block size-2.5 rounded-full bg-red-300 ring-1 ring-red-700" />
            positive metal ions
          </span>
        )}
        {hasElectrons && (
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block size-2 rounded-full bg-teal-600" />
            delocalised electrons
          </span>
        )}
      </figcaption>
    </figure>
  )
}

export default Giant
