import { useState } from 'react'
import type { NutrientCycleExtra, NutrientProcess } from '@/content/types'
import { T } from '@/components/i18n/T'
import { NUTRIENT_CYCLE } from '@/lib/lessonExtrasStrings'

/**
 * The carbon cycle (G8 19.3, syllabus 19.3.1–19.3.3). No real PDF
 * figure is available for this chapter, so the diagram is a hand-built
 * SVG showing the four reservoirs (atmosphere, plants, animals, fossil
 * fuels) and the processes that move carbon between them.
 *
 * The student clicks any process arrow to see what is happening. A
 * "Show reservoirs" toggle highlights the four pools with their
 * approximate carbon stocks.
 */
const SVG_W = 720
const SVG_H = 440

export function NutrientCycle({ extra }: { extra: NutrientCycleExtra }) {
  const [selectedId, setSelectedId] = useState<string | null>(
    extra.initialSelected ?? extra.processes[0]?.id ?? null
  )
  const [showReservoirs, setShowReservoirs] = useState(false)

  const selected = extra.processes.find((p) => p.id === selectedId) ?? null

  return (
    <div className="space-y-4">
      <p className="text-sm text-ink-soft">
        <T value={extra.intro} />
      </p>

      <div className="flex flex-wrap gap-2">
        <ModeButton
          active={showReservoirs}
          onClick={() => setShowReservoirs((v) => !v)}
        >
          <T
            value={
              showReservoirs ? NUTRIENT_CYCLE.hideReservoirs : NUTRIENT_CYCLE.showReservoirs
            }
          />
        </ModeButton>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_300px]">
        <figure className="m-0 overflow-hidden rounded-lg border border-line bg-canvas">
          <svg
            viewBox={`0 0 ${SVG_W} ${SVG_H}`}
            className="block w-full"
            role="img"
            aria-label={extra.title.en}
          >
            <title>{extra.title.en}</title>

            {/* Reservoirs */}
            {extra.reservoirs.map((r) => (
              <g key={r.id}>
                <rect
                  x={r.x - 80}
                  y={r.y - 36}
                  width={160}
                  height={72}
                  rx={10}
                  fill={r.color}
                  stroke="#0f172a"
                  strokeWidth={1.5}
                />
                <text
                  x={r.x}
                  y={r.y - 4}
                  fontSize={13}
                  fill="#0f172a"
                  textAnchor="middle"
                  fontWeight={600}
                >
                  <T value={r.label} />
                </text>
                {showReservoirs && (
                  <text
                    x={r.x}
                    y={r.y + 14}
                    fontSize={11}
                    fill="#334155"
                    textAnchor="middle"
                  >
                    <T value={r.stock} />
                  </text>
                )}
              </g>
            ))}

            {/* Process arrows */}
            {extra.processes.map((p) => {
              const from = extra.reservoirs.find((r) => r.id === p.from)
              const to = extra.reservoirs.find((r) => r.id === p.to)
              if (!from || !to) return null
              const isSelected = p.id === selectedId
              return (
                <g
                  key={p.id}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setSelectedId(p.id)}
                  data-nutrient-cycle-hotspot={p.id}
                >
                  <line
                    x1={from.x}
                    y1={from.y}
                    x2={to.x}
                    y2={to.y}
                    stroke={isSelected ? '#0d9488' : p.color}
                    strokeWidth={isSelected ? 3 : 1.8}
                    strokeDasharray={p.dashed ? '6 4' : undefined}
                    markerEnd="url(#nc-arrow)"
                  />
                  <text
                    x={(from.x + to.x) / 2}
                    y={(from.y + to.y) / 2 - 6}
                    fontSize={11}
                    fill={isSelected ? '#0d9488' : p.color}
                    textAnchor="middle"
                    fontWeight={isSelected ? 700 : 500}
                  >
                    <T value={p.label} />
                  </text>
                </g>
              )
            })}

            <defs>
              <marker
                id="nc-arrow"
                markerWidth="9"
                markerHeight="9"
                refX="7"
                refY="4.5"
                orient="auto"
              >
                <path d="M 0 0 L 9 4.5 L 0 9 z" fill="#475569" />
              </marker>
            </defs>
          </svg>
          <figcaption className="border-t border-line bg-canvas px-3 py-1.5 text-[11px] text-muted">
            <T value={extra.title} />
          </figcaption>
        </figure>

        <SidePanel process={selected} />
      </div>
    </div>
  )
}

function SidePanel({ process }: { process: NutrientProcess | null }) {
  if (!process) {
    return (
      <aside className="rounded-lg border border-line bg-surface p-4">
        <p className="text-sm text-muted">
          <T value={NUTRIENT_CYCLE.empty} />
        </p>
      </aside>
    )
  }
  return (
    <aside className="space-y-3 rounded-lg border border-line bg-surface p-4">
      <h3 className="text-base font-semibold text-ink">
        <T value={process.label} />
      </h3>
      <p className="text-sm text-ink-soft">
        <T value={process.description} />
      </p>
      {process.example && (
        <div className="rounded-md border border-line bg-canvas/50 p-2 text-xs text-ink-soft">
          <div className="mb-1 font-semibold text-muted">
            <T value={NUTRIENT_CYCLE.exampleHeading} />
          </div>
          <T value={process.example} />
        </div>
      )}
    </aside>
  )
}

function ModeButton({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        'rounded-md px-3 py-1.5 text-sm font-medium transition-colors ' +
        (active
          ? 'bg-ink text-white'
          : 'border border-line bg-surface text-muted hover:bg-canvas hover:text-ink-soft')
      }
    >
      {children}
    </button>
  )
}
