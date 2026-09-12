import type { SimViewProps } from '../SimStage'
import { T } from '@/components/i18n/T'
import { ELEMENTS } from '@/content/lessons/0620/2-2-atomic-structure/kernel'

const W = 460
const H = 340

/**
 * Electron shell diagram — the drawing 0620 asks students to produce.
 *
 * Electrons sit on visible shell circles rather than floating freely, because the
 * assessed skill is counting them per shell and writing the configuration. The outer
 * shell is highlighted, since that is the one that decides the chemistry.
 *
 * The nucleus label carries the nuclide notation, so the mass number and proton number
 * are read in the same place they appear in an exam question.
 */
export function Atom({ result }: SimViewProps) {
  const bounds = result.bounds ?? { xMin: -1.3, xMax: 1.3, yMin: -1.3, yMax: 1.3 }
  const scale = Math.min(W, H) / (bounds.xMax - bounds.xMin) / 1.05
  const cx = W / 2
  const cy = H / 2 - 6

  const sx = (x: number) => cx + x * scale
  const sy = (y: number) => cy + y * scale

  const r = result.readouts
  const z = Math.round(r['protonNumber'] ?? 1)
  const element = ELEMENTS[z - 1]
  const charge = Math.round(r['netCharge'] ?? 0)
  const shellCount = Math.round(r['shellCount'] ?? 0)

  const chargeLabel =
    charge === 0 ? '' : `${Math.abs(charge) === 1 ? '' : Math.abs(charge)}${charge > 0 ? '+' : '−'}`

  // Radii must match the kernel's placement: 0.35 + shellIndex * 0.28.
  const shellRadii = Array.from({ length: shellCount }, (_, i) => 0.35 + i * 0.28)

  return (
    <figure className="m-0">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full select-none"
        role="img"
        aria-label={`${element?.name ?? 'Atom'}: ${z} protons, ${Math.round(r['neutrons'] ?? 0)} neutrons, ${Math.round(r['electrons'] ?? 0)} electrons${charge !== 0 ? `, charge ${chargeLabel}` : ''}`}
      >
        <rect x={0} y={0} width={W} height={H} fill="#f8fafc" />

        {/* Shells */}
        {shellRadii.map((radius, i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={radius * scale}
            fill="none"
            stroke={i === shellCount - 1 ? '#0d9488' : '#cbd5e1'}
            strokeWidth={i === shellCount - 1 ? 1.6 : 1}
            strokeDasharray={i === shellCount - 1 ? undefined : '3 4'}
          />
        ))}

        {/* Electrons */}
        {result.bodies?.map((b, i) => (
          <circle
            key={i}
            cx={sx(b.x)}
            cy={sy(b.y)}
            r={Math.max(3.5, (b.r ?? 0.045) * scale)}
            fill={b.kind === 'outer' ? '#0d9488' : '#64748b'}
            stroke="#f8fafc"
            strokeWidth={1.5}
          />
        ))}

        {/* Nucleus */}
        <circle cx={cx} cy={cy} r={26} fill="#dc2626" opacity={0.9} />
        <text x={cx} y={cy - 3} textAnchor="middle" fontSize={11} fontWeight={700} fill="#fff">
          {z}p
        </text>
        <text x={cx} y={cy + 10} textAnchor="middle" fontSize={11} fontWeight={700} fill="#fff">
          {Math.round(r['neutrons'] ?? 0)}n
        </text>

        {/* Nuclide notation, as printed in exam questions */}
        <g>
          <text x={22} y={34} fontSize={13} fill="#334155">
            <tspan fontSize={11} dy={-8}>
              {Math.round(r['massNumber'] ?? 0)}
            </tspan>
            <tspan fontSize={11} dy={14} x={22}>
              {z}
            </tspan>
            <tspan fontSize={22} fontWeight={700} dy={-7} dx={4}>
              {element?.symbol ?? '?'}
            </tspan>
            {chargeLabel && (
              <tspan fontSize={13} dy={-9}>
                {chargeLabel}
              </tspan>
            )}
          </text>
        </g>

        <text x={W - 16} y={30} textAnchor="end" fontSize={13} fontWeight={600} fill="#334155">
          {element?.name}
        </text>
        {/* Only for kernels that report a periodic-table position. A physics lesson on the
            nucleus draws the same diagram and has no business claiming a group. */}
        {r['group'] !== undefined && r['period'] !== undefined && (
          <text x={W - 16} y={48} textAnchor="end" fontSize={11} fill="#64748b">
            Group {Math.round(r['group'])} · Period {Math.round(r['period'])}
          </text>
        )}

        <text x={W / 2} y={H - 8} textAnchor="middle" fontSize={12} fontWeight={600} fill="#334155">
          {charge === 0
            ? `Configuration ${configurationText(result)}`
            : `Ion ${chargeLabel} — configuration ${configurationText(result)}`}
        </text>
      </svg>

      <figcaption className="mt-1 flex flex-wrap justify-center gap-x-4 text-xs text-muted">
        <span className="inline-flex items-center gap-1">
          <span className="inline-block size-2.5 rounded-full bg-red-600" />
          nucleus
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="inline-block size-2.5 rounded-full bg-slate-500" />
          inner electrons
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="inline-block size-2.5 rounded-full bg-teal-600" />
          outer shell
        </span>
      </figcaption>

      {/* A kernel may annotate the diagram — which isotope this is, whether it is an ion.
          The chemistry lesson emits none and so prints nothing here. */}
      {(result.markers ?? []).map((marker, i) => (
        <p
          key={i}
          className="mt-3 rounded-lg border border-line bg-canvas px-3 py-2 text-sm font-medium text-ink-soft"
        >
          <T value={marker.label} />
        </p>
      ))}
    </figure>
  )
}

/** Rebuilds "2,8,1" from the drawn electrons, so the caption cannot drift from the picture. */
function configurationText(result: SimViewProps['result']): string {
  const bodies = result.bodies ?? []
  if (bodies.length === 0) return '—'

  // Group by radius: electrons on the same shell are the same distance out.
  const counts = new Map<string, number>()
  for (const b of bodies) {
    const key = Math.hypot(b.x, b.y).toFixed(3)
    counts.set(key, (counts.get(key) ?? 0) + 1)
  }
  return Array.from(counts.entries())
    .sort((a, b) => Number(a[0]) - Number(b[0]))
    .map(([, n]) => n)
    .join(',')
}
