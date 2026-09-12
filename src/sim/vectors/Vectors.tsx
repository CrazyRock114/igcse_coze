import type { SimViewProps } from '../SimStage'
import { T } from '@/components/i18n/T'
import { ui } from '@/lib/ui-strings'

/**
 * Vector arrows drawn from a common origin.
 *
 * Each body is the tip of an arrow starting at the origin, so a body's `x` and `y` are the
 * components of a vector rather than the position of an object — the one place in this
 * codebase where that is true, and the reason this primitive exists rather than reusing
 * `particles`.
 *
 * A body tagged `resultant` is drawn heavier, and the construction lines completing the
 * rectangle are drawn behind it. Those lines are the whole point: a student who has only
 * been told "use Pythagoras" does not see where the right angle comes from, and a student
 * who has drawn the rectangle cannot miss it.
 */

const COLOURS: Record<string, string> = {
  component: '#2563eb',
  resultant: '#c2410c',
}

export function Vectors({ result }: SimViewProps) {
  const bodies = result.bodies ?? []
  if (bodies.length === 0) return null

  const bounds = result.bounds ?? { xMin: -10, xMax: 10, yMin: -10, yMax: 10 }
  const width = 460
  const height = 300
  const pad = 34

  const sx = (x: number) =>
    pad + ((x - bounds.xMin) / (bounds.xMax - bounds.xMin || 1)) * (width - 2 * pad)
  const sy = (y: number) =>
    height - pad - ((y - bounds.yMin) / (bounds.yMax - bounds.yMin || 1)) * (height - 2 * pad)

  const ox = sx(0)
  const oy = sy(0)

  const resultant = bodies.find((b) => b.kind === 'resultant')
  const components = bodies.filter((b) => b.kind !== 'resultant')

  return (
    <figure className="m-0">
      <p className="mb-3 text-sm text-muted">
        <T value={ui.vectorsHint} />
      </p>

      <svg viewBox={`0 0 ${width} ${height}`} className="w-full" role="img" aria-label="Vector diagram">
        <defs>
          {Object.entries(COLOURS).map(([kind, colour]) => (
            <marker
              key={kind}
              id={`head-${kind}`}
              markerWidth={8}
              markerHeight={8}
              refX={7}
              refY={3}
              orient="auto"
            >
              <path d="M0,0 L8,3 L0,6 z" fill={colour} />
            </marker>
          ))}
        </defs>

        {/* Axes through the origin, so the components can be read off. */}
        <line x1={pad} y1={oy} x2={width - pad} y2={oy} stroke="#cbd5e1" strokeWidth={1} />
        <line x1={ox} y1={pad} x2={ox} y2={height - pad} stroke="#cbd5e1" strokeWidth={1} />

        {/* The rectangle that makes the right angle visible. */}
        {resultant && (
          <>
            <line
              x1={sx(resultant.x)}
              y1={sy(0)}
              x2={sx(resultant.x)}
              y2={sy(resultant.y)}
              stroke="#94a3b8"
              strokeWidth={1.5}
              strokeDasharray="5 4"
            />
            <line
              x1={sx(0)}
              y1={sy(resultant.y)}
              x2={sx(resultant.x)}
              y2={sy(resultant.y)}
              stroke="#94a3b8"
              strokeWidth={1.5}
              strokeDasharray="5 4"
            />
          </>
        )}

        {[...components, ...(resultant ? [resultant] : [])].map((b, i) => {
          const kind = b.kind === 'resultant' ? 'resultant' : 'component'
          const colour = COLOURS[kind] as string
          const tipX = sx(b.x)
          const tipY = sy(b.y)
          // Nudge the label clear of the arrowhead, along the direction of the arrow.
          const len = Math.hypot(tipX - ox, tipY - oy) || 1
          const lx = tipX + ((tipX - ox) / len) * 16
          const ly = tipY + ((tipY - oy) / len) * 14

          return (
            <g key={i}>
              <line
                x1={ox}
                y1={oy}
                x2={tipX}
                y2={tipY}
                stroke={colour}
                strokeWidth={kind === 'resultant' ? 3.5 : 2.5}
                markerEnd={`url(#head-${kind})`}
              />
              {b.label && (
                <text
                  x={lx}
                  y={ly}
                  textAnchor="middle"
                  fontSize={12}
                  fontWeight={600}
                  fill={colour}
                >
                  {b.label}
                </text>
              )}
            </g>
          )
        })}
      </svg>

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
