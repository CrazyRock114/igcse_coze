import type { SimViewProps } from '../SimStage'
import { T } from '@/components/i18n/T'

const COLUMNS = 18
const CELL = 24
const GAP = 2
const PAD = 8
const W = PAD * 2 + COLUMNS * (CELL + GAP)

/** Colours by category, so the shape of the table carries the chemistry. */
const FILL: Record<string, string> = {
  metal: '#fed7aa',
  transition: '#fde68a',
  metalloid: '#d9f99d',
  nonmetal: '#bfdbfe',
  noble: '#e9d5ff',
  selected: '#0d9488',
}

const STROKE: Record<string, string> = {
  metal: '#f97316',
  transition: '#f59e0b',
  metalloid: '#84cc16',
  nonmetal: '#3b82f6',
  noble: '#a855f7',
  selected: '#0f766e',
}

const LEGEND = [
  ['metal', 'metals'],
  ['transition', 'transition elements'],
  ['metalloid', 'borderline'],
  ['nonmetal', 'non-metals'],
  ['noble', 'noble gases'],
] as const

/**
 * The Periodic Table, drawn as the grid it is.
 *
 * The point of drawing it rather than listing elements is that the layout is the argument:
 * a group is a column because those elements share an outer-shell count, and a period is a
 * row because those elements share a number of shells. Sliding the proton number walks the
 * highlight across a period and drops it to the start of the next, which is the behaviour
 * the whole topic is about.
 *
 * Cell labels arrive as `protonNumber|symbol`.
 */
export function PeriodicTable({ result }: SimViewProps) {
  const bodies = result.bodies ?? []
  // Marker convention: [0] names the element, [1] is its address and [2] the explanation.
  const [, headline, note] = result.markers ?? []

  const periods = Math.max(...bodies.map((b) => -b.y), 1)
  const height = PAD * 2 + 16 + periods * (CELL + GAP)

  const x = (col: number) => PAD + (col - 1) * (CELL + GAP)
  const y = (period: number) => PAD + 16 + (period - 1) * (CELL + GAP)

  return (
    <figure className="m-0">
      {headline && (
        <p className="mb-2 text-center text-sm font-semibold text-ink">
          <T value={headline.label} />
        </p>
      )}

      <svg
        viewBox={`0 0 ${W} ${height}`}
        className="w-full select-none"
        role="img"
        aria-label="Periodic Table, periods 1 to 4"
      >
        <rect x={0} y={0} width={W} height={height} fill="#f8fafc" />

        {/* Group numbers, as the syllabus writes them */}
        {['I', 'II', '', '', '', '', '', '', '', '', '', '', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'].map(
          (label, i) =>
            label ? (
              <text
                key={i}
                x={x(i + 1) + CELL / 2}
                y={PAD + 10}
                textAnchor="middle"
                fontSize={9}
                fill="#94a3b8"
              >
                {label}
              </text>
            ) : null
        )}

        {bodies.map((b, i) => {
          const [z = '', symbol = ''] = (b.label ?? '').split('|')
          const kind = b.kind ?? 'metal'
          const selected = kind === 'selected'
          return (
            <g key={i}>
              <rect
                x={x(b.x)}
                y={y(-b.y)}
                width={CELL}
                height={CELL}
                rx={3}
                fill={FILL[kind] ?? '#e2e8f0'}
                stroke={STROKE[kind] ?? '#94a3b8'}
                strokeWidth={selected ? 2 : 0.8}
              />
              <text
                x={x(b.x) + 2.5}
                y={y(-b.y) + 8}
                fontSize={6.5}
                fill={selected ? '#ccfbf1' : '#64748b'}
              >
                {z}
              </text>
              <text
                x={x(b.x) + CELL / 2}
                y={y(-b.y) + 19}
                textAnchor="middle"
                fontSize={11}
                fontWeight={selected ? 700 : 600}
                fill={selected ? '#ffffff' : '#334155'}
              >
                {symbol}
              </text>
            </g>
          )
        })}
      </svg>

      {note && (
        <p className="mt-2 text-sm text-muted">
          <T value={note.label} />
        </p>
      )}

      <figcaption className="mt-2 flex flex-wrap justify-center gap-x-3 gap-y-1 text-xs text-muted">
        {LEGEND.map(([kind, label]) => (
          <span key={kind} className="inline-flex items-center gap-1.5">
            <span
              className="inline-block size-2.5 rounded-sm"
              style={{ background: FILL[kind], outline: `1px solid ${STROKE[kind]}` }}
            />
            {label}
          </span>
        ))}
      </figcaption>
    </figure>
  )
}
