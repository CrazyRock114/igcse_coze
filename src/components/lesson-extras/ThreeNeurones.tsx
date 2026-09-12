import { useMemo, useState } from 'react'
import type { ThreeNeuronesExtra } from '@/content/types'
import { T } from '@/components/i18n/T'
import { THREE_NEURONES } from '@/lib/lessonExtrasStrings'

/**
 * G8 Figure B9.05 — the three types of neurone side by side.
 *
 * A 480×240 inline-SVG diagram shows three simplified neurones in three
 * columns. The user picks one of the three and:
 *   - that column is highlighted in teal
 *   - the cell body and the long fibre of that neurone are drawn in
 *     colour, while the other two stay greyed out
 *   - the side panel shows the neurone's full description and a
 *     one-line "distinguishing feature" callout
 *
 * Drawing the three neurones is data-driven in the sense that the
 * renderer owns the geometry; the lesson author only carries the
 * bilingual names and the description of what makes each type
 * different. The three neurones are positioned at fixed columns
 * (x = 80, 240, 400) so the data is just text, not pixel coordinates.
 */
const W = 480
const H = 240

export function ThreeNeurones({ extra }: { extra: ThreeNeuronesExtra }) {
  const [activeId, setActiveId] = useState<ThreeNeuronesExtra['neurones'][number]['id']>(
    extra.neurones[0]?.id ?? 'sensory'
  )
  const active = useMemo(
    () => extra.neurones.find((n) => n.id === activeId) ?? extra.neurones[0] ?? null,
    [extra.neurones, activeId]
  )

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_300px]">
      <div>
        <div className="mb-2 flex flex-wrap gap-1.5">
          {extra.neurones.map((n) => (
            <button
              key={n.id}
              type="button"
              onClick={() => setActiveId(n.id)}
              className={
                'rounded-md px-2.5 py-1 text-xs font-medium transition-colors ' +
                (n.id === activeId
                  ? 'bg-ink text-white'
                  : 'border border-line bg-surface text-muted hover:bg-canvas hover:text-ink-soft')
              }
            >
              <T value={n.name} />
            </button>
          ))}
        </div>

        <figure className="relative m-0 overflow-hidden rounded-lg border border-line bg-canvas">
          <svg viewBox={`0 0 ${W} ${H}`} className="block h-60 w-full" role="img" aria-label="The three types of neurone side by side">
            <ThreeNeuronesFigure activeId={activeId} />
          </svg>
          <figcaption className="border-t border-line bg-canvas px-3 py-1.5 text-[11px] text-muted">
            <T value={THREE_NEURONES.figcaption} />
          </figcaption>
        </figure>
      </div>

      <aside className="rounded-lg border border-line bg-canvas p-3 text-sm">
        {active ? (
          <div>
            <h3 className="mb-1 text-base font-semibold text-ink">
              <T value={active.name} />
            </h3>
            <p className="mb-2 rounded border border-teal-200 bg-teal-50 px-2 py-1 text-[11px] text-teal-800">
              <span className="font-semibold">Distinguishing feature: </span>
              <T value={active.distinguishingFeature} />
            </p>
            <p className="leading-relaxed text-ink-soft">
              <T value={active.description} />
            </p>
          </div>
        ) : (
          <p className="text-muted">
            <T value={THREE_NEURONES.empty} />
          </p>
        )}
      </aside>
    </div>
  )
}

// ---------------------------------------------------------------------------
// The figure: three simplified neurones at fixed x positions
// ---------------------------------------------------------------------------

/**
 * Each neurone is drawn in a 160×220 column. The fibre layout is:
 *
 *   SENSORY (x=80)               RELAY (x=240)               MOTOR (x=400)
 *                                
 *   ┌─dendrite (long)─┐          ┌─dendrite (short)─┐       ┌─dendrite─┐
 *                    │                                   │          │
 *                cell body                          cell body      cell body
 *                    │                                   │
 *   └─axon (short)───┘          └─axon (short)───┘       └─axon (long)───┘
 *
 * Three things the user has to learn:
 *   1. Sensory: dendrite is the long one (carries signal from receptor)
 *   2. Relay: both fibres are short (it only connects two neurones)
 *   3. Motor: axon is the long one (carries signal to muscle)
 *
 * The cell body position also differs: sensory's cell body sits on a
 * side branch off the main fibre, relay's is right in the middle,
 * motor's sits at the start of the long axon. We render that
 * difference too — sensory's cell body is drawn as a small bulge off
 * to the side of the main fibre, while relay and motor have the cell
 * body in the line.
 */
function ThreeNeuronesFigure({ activeId }: { activeId: string }) {
  return (
    <g>
      {/* Faint background columns so the user can see the three panels */}
      <line x1="160" y1="20" x2="160" y2="220" stroke="#e2e8f0" strokeDasharray="4 4" />
      <line x1="320" y1="20" x2="320" y2="220" stroke="#e2e8f0" strokeDasharray="4 4" />

      {/* SENSORY — cell body on a side branch, long dendrite above */}
      <SensoryNeurone cx={80} active={activeId === 'sensory'} />

      {/* RELAY — symmetric, cell body in the middle of both short fibres */}
      <RelayNeurone cx={240} active={activeId === 'relay'} />

      {/* MOTOR — cell body at top of long axon */}
      <MotorNeurone cx={400} active={activeId === 'motor'} />
    </g>
  )
}

function SensoryNeurone({ cx, active }: { cx: number; active: boolean }) {
  // Dendrite: long, goes from receptor (top-left) down to where the
  // cell-body side branch meets it
  const mainFibreColour = active ? '#0d9488' : '#94a3b8'
  const cellBodyColour = active ? '#0d9488' : '#cbd5e1'
  const cellBodyFill = active ? '#ccfbf1' : '#f1f5f9'
  return (
    <g>
      {/* Long dendrite (the "long" fibre) — from receptor at top, down
          to the cell-body side branch */}
      <line
        x1={cx - 20}
        y1="20"
        x2={cx - 20}
        y2="110"
        stroke={mainFibreColour}
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Receptor indicator at the top of the dendrite */}
      <circle cx={cx - 20} cy="20" r="6" fill={active ? '#0d9488' : '#cbd5e1'} />

      {/* Cell body — a bulge on a SIDE branch off the main fibre */}
      <line
        x1={cx - 20}
        y1="110"
        x2={cx + 10}
        y2="110"
        stroke={mainFibreColour}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <ellipse
        cx={cx + 30}
        cy="110"
        rx="22"
        ry="16"
        fill={cellBodyFill}
        stroke={cellBodyColour}
        strokeWidth="2"
      />

      {/* Short axon — from the cell body, back to the main fibre, then
          down into the spinal cord */}
      <line
        x1={cx + 10}
        y1="110"
        x2={cx - 20}
        y2="110"
        stroke={mainFibreColour}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line
        x1={cx - 20}
        y1="110"
        x2={cx - 20}
        y2="200"
        stroke={mainFibreColour}
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* "long dendrite" label */}
      {active && <ColumnLabel x={cx - 20} y={50} text="long dendrite" />}
      {active && <ColumnLabel x={cx - 20} y={215} text="short axon" />}
    </g>
  )
}

function RelayNeurone({ cx, active }: { cx: number; active: boolean }) {
  const mainFibreColour = active ? '#0d9488' : '#94a3b8'
  const cellBodyColour = active ? '#0d9488' : '#cbd5e1'
  const cellBodyFill = active ? '#ccfbf1' : '#f1f5f9'
  return (
    <g>
      {/* Short dendrite (top) */}
      <line
        x1={cx}
        y1="20"
        x2={cx}
        y2="100"
        stroke={mainFibreColour}
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Cell body — in the middle, on the line itself */}
      <ellipse
        cx={cx}
        cy="110"
        rx="22"
        ry="16"
        fill={cellBodyFill}
        stroke={cellBodyColour}
        strokeWidth="2"
      />
      {/* Short axon (bottom) */}
      <line
        x1={cx}
        y1="120"
        x2={cx}
        y2="200"
        stroke={mainFibreColour}
        strokeWidth="3"
        strokeLinecap="round"
      />
      {active && <ColumnLabel x={cx} y={50} text="short dendrite" />}
      {active && <ColumnLabel x={cx} y={215} text="short axon" />}
    </g>
  )
}

function MotorNeurone({ cx, active }: { cx: number; active: boolean }) {
  const mainFibreColour = active ? '#0d9488' : '#94a3b8'
  const cellBodyColour = active ? '#0d9488' : '#cbd5e1'
  const cellBodyFill = active ? '#ccfbf1' : '#f1f5f9'
  return (
    <g>
      {/* Short dendrites (top) — branching into the cell body */}
      <line
        x1={cx - 15}
        y1="20"
        x2={cx - 5}
        y2="100"
        stroke={mainFibreColour}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <line
        x1={cx + 15}
        y1="20"
        x2={cx + 5}
        y2="100"
        stroke={mainFibreColour}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Cell body — at the top, where the dendrites meet the axon */}
      <ellipse
        cx={cx}
        cy="108"
        rx="22"
        ry="16"
        fill={cellBodyFill}
        stroke={cellBodyColour}
        strokeWidth="2"
      />
      {/* Long axon — the "long" fibre, down to the muscle */}
      <line
        x1={cx}
        y1="124"
        x2={cx}
        y2="200"
        stroke={mainFibreColour}
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Muscle indicator at the bottom of the axon */}
      <rect
        x={cx - 10}
        y="200"
        width="20"
        height="10"
        fill={active ? '#0d9488' : '#cbd5e1'}
        stroke="none"
      />

      {active && <ColumnLabel x={cx} y={50} text="short dendrites" />}
      {active && <ColumnLabel x={cx} y={215} text="long axon" />}
    </g>
  )
}

function ColumnLabel({ x, y, text }: { x: number; y: number; text: string }) {
  return (
    <g style={{ pointerEvents: 'none' }}>
      <rect x={x - 50} y={y - 12} width="100" height="20" rx="4" fill="#0d9488" />
      <text x={x} y={y + 2} textAnchor="middle" fontSize="10" fontWeight="600" fill="white">
        {text}
      </text>
    </g>
  )
}
