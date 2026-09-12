import type { SimBody } from '@/content/types'
import type { SimViewProps } from '../SimStage'
import { PlotGrid } from '../plot2d/PlotGrid'
import { T } from '@/components/i18n/T'

const W = 460
const ROW = 26
const TOP = 16

/**
 * An ordered series drawn as a ladder, with a line across it.
 *
 * The reactivity series is usually met as a list to memorise. Drawing it with a threshold
 * line turns it into something you can read an answer off: everything above the line
 * reacts, everything below it does not, and moving a metal past the line is a visible
 * event rather than a fact to recall.
 *
 * Rung labels arrive as `symbol|name`, since both are wanted — the symbol is how the
 * series is written down and the name is how it is said.
 */
export function Ladder({ result }: SimViewProps) {
  const bodies = result.bodies ?? []
  // Marker convention: [0] names what is being tested, [1] is the equation line and
  // [2] the observation. All three are prose, so they render as HTML rather than SVG text.
  const [, headline, note] = result.markers ?? []

  const rungs = bodies.filter((b) => b.kind !== 'threshold' && b.kind !== 'axis')
  const threshold = bodies.find((b) => b.kind === 'threshold')
  // The axis caption, and which way it points. Group I gets more reactive going *down* the
  // group while Group VII gets more reactive going up, so the arrow cannot be hard-coded.
  const axis = bodies.find((b) => b.kind === 'axis')
  const pointsUp = (axis?.y ?? 1) >= 0
  const height = TOP * 2 + rungs.length * ROW

  const y = (value: number) => TOP + (-value + 0.5) * ROW

  return (
    <figure className="m-0">
      {headline && (
        <p className="mb-2 text-center font-mono text-sm font-semibold text-ink">
          <T value={headline.label} />
        </p>
      )}

      <svg
        viewBox={`0 0 ${W} ${height}`}
        className="w-full select-none"
        role="img"
        aria-label="The reactivity series, with a line marking which metals react"
      >
        <rect x={0} y={0} width={W} height={height} fill="#f8fafc" />

        {/* Direction of the ordering, when there is one. A list of steps has none. */}
        <defs>
          <marker id="ladder-arrow" markerWidth="7" markerHeight="7" refX="3.5" refY="3.5" orient="auto">
            <path d="M0,0 L7,3.5 L0,7 z" fill="#94a3b8" />
          </marker>
        </defs>
        {axis && (
          <g>
            <line
              x1={26}
              y1={pointsUp ? height - TOP - 6 : TOP + 6}
              x2={26}
              y2={pointsUp ? TOP + 6 : height - TOP - 6}
              stroke="#94a3b8"
              strokeWidth={1.4}
              markerEnd="url(#ladder-arrow)"
            />
            <text
              x={16}
              y={height / 2}
              textAnchor="middle"
              fontSize={10}
              fill="#64748b"
              transform={`rotate(-90 16 ${height / 2})`}
            >
              {axis.label}
            </text>
          </g>
        )}

        {rungs.map((b, i) => (
          <Rung key={i} body={b} y={y(b.y)} />
        ))}

        {threshold && (
          <g>
            <line
              x1={44}
              y1={y(threshold.y)}
              x2={W - 16}
              y2={y(threshold.y)}
              stroke="#dc2626"
              strokeWidth={2}
              strokeDasharray="7 4"
            />
            <text x={W - 16} y={y(threshold.y) - 5} textAnchor="end" fontSize={10} fill="#dc2626">
              {threshold.label}
            </text>
          </g>
        )}
      </svg>

      {note && (
        <p className="mt-2 text-center text-sm text-muted">
          <T value={note.label} />
        </p>
      )}

      {result.series.length > 0 && (
        <div className="mt-4">
          <PlotGrid series={result.series} height={220} />
        </div>
      )}
    </figure>
  )
}

/**
 * One rung. Its label is `symbol|name` with an optional third field for an aside, which
 * renders in brackets after the name — "not a metal", "already done".
 *
 * The aside is data rather than a rule in here: what makes an entry an exception belongs
 * to the lesson, not to the thing drawing the list.
 */
function Rung({ body, y }: { body: SimBody; y: number }) {
  const [symbol = '', name = '', aside = ''] = (body.label ?? '').split('|')
  const selected = body.kind === 'selected'
  // Entries that are on the list but not among the things being chosen between — a
  // landmark on a series, or a step already carried out.
  const muted = body.kind === 'reference'
  const done = body.kind === 'done'

  const colour = muted ? '#94a3b8' : selected ? '#0f766e' : done ? '#5eead4' : '#334155'

  return (
    <g>
      {selected && <rect x={44} y={y - 11} width={W - 60} height={22} rx={5} fill="#ccfbf1" />}
      <text x={56} y={y + 5} fontSize={14} fontWeight={selected ? 700 : 600} fill={colour}>
        {symbol}
      </text>
      <text
        x={92}
        y={y + 5}
        fontSize={13}
        fontStyle={muted ? 'italic' : undefined}
        fill={muted || done ? colour : selected ? '#0f766e' : '#64748b'}
      >
        {name}
        {aside ? ` (${aside})` : ''}
      </text>
    </g>
  )
}
