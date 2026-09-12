import { useMemo, useState } from 'react'
import type { FoodWebExtra, FoodWebNode } from '@/content/types'
import { T } from '@/components/i18n/T'
import { FOOD_WEB } from '@/lib/lessonExtrasStrings'

/**
 * A food web for a temperate woodland ecosystem (G8 19.2). No real
 * PDF figure is available for this chapter, so the diagram is a
 * hand-built SVG. The student clicks any organism to see its trophic
 * level, what it eats, and what eats it. The optional "remove a
 * species" simulator shows what happens to a chain if a producer or
 * primary consumer is removed.
 *
 * The viewBox is 720 × 460 so the diagram fits the same column as the
 * other chapter extras. Nodes are positioned in trophic-level bands:
 * producers at the bottom, primary consumers above, secondary, then
 * tertiary at the top.
 */
const SVG_W = 720
const SVG_H = 460

type Bilingual = { en: string; zh?: string }

export function FoodWeb({ extra }: { extra: FoodWebExtra }) {
  const [selectedId, setSelectedId] = useState<string | null>(
    extra.initialSelected ?? extra.nodes[0]?.id ?? null
  )
  const [scenario, setScenario] = useState<'normal' | 'no-fox' | 'no-rabbit'>(
    'normal'
  )

  // The scenario: hide some species to model what happens to the web.
  const hiddenIds = useMemo(() => {
    if (scenario === 'no-fox') {
      return new Set([extra.foxId])
    }
    if (scenario === 'no-rabbit') {
      return new Set([extra.rabbitId])
    }
    return new Set<string>()
  }, [scenario, extra.foxId, extra.rabbitId])

  const visibleNodes = extra.nodes.filter((n) => !hiddenIds.has(n.id))
  const visibleEdges = extra.edges.filter(
    (e) => !hiddenIds.has(e.from) && !hiddenIds.has(e.to)
  )

  // Effect propagation: which downstream species lose their food
  // source because of the removed species?
  const removedDownstream = useMemo(() => {
    if (hiddenIds.size === 0) return new Set<string>()
    const downstream = new Set<string>()
    const removed = hiddenIds
    let changed = true
    while (changed) {
      changed = false
      for (const e of visibleEdges) {
        if (removed.has(e.from) && !downstream.has(e.to)) {
          downstream.add(e.to)
          changed = true
        }
      }
    }
    return downstream
  }, [hiddenIds, visibleEdges])

  const selected = extra.nodes.find((n) => n.id === selectedId) ?? null

  return (
    <div className="space-y-4">
      <p className="text-sm text-ink-soft">
        <T value={extra.intro} />
      </p>

      <div className="flex flex-wrap gap-2">
        <ModeButton
          active={scenario === 'normal'}
          onClick={() => setScenario('normal')}
        >
          <T value={FOOD_WEB.normal} />
        </ModeButton>
        <ModeButton
          active={scenario === 'no-fox'}
          onClick={() => setScenario('no-fox')}
        >
          <T value={FOOD_WEB.removeFox} />
        </ModeButton>
        <ModeButton
          active={scenario === 'no-rabbit'}
          onClick={() => setScenario('no-rabbit')}
        >
          <T value={FOOD_WEB.removeRabbit} />
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

            {/* Trophic level bands */}
            <rect
              x={0}
              y={0}
              width={SVG_W}
              height={SVG_H / 4}
              fill="#fef3c7"
              opacity={0.4}
            />
            <rect
              x={0}
              y={SVG_H / 4}
              width={SVG_W}
              height={SVG_H / 4}
              fill="#dcfce7"
              opacity={0.4}
            />
            <rect
              x={0}
              y={SVG_H / 2}
              width={SVG_W}
              height={SVG_H / 4}
              fill="#dbeafe"
              opacity={0.4}
            />
            <rect
              x={0}
              y={(3 * SVG_H) / 4}
              width={SVG_W}
              height={SVG_H / 4}
              fill="#fce7f3"
              opacity={0.4}
            />
            <text x={20} y={20} fontSize={11} fill="#92400e" fontWeight={600}>
              Tertiary
            </text>
            <text x={20} y={SVG_H / 4 + 20} fontSize={11} fill="#166534" fontWeight={600}>
              Secondary
            </text>
            <text x={20} y={SVG_H / 2 + 20} fontSize={11} fill="#1e40af" fontWeight={600}>
              Primary
            </text>
            <text
              x={20}
              y={(3 * SVG_H) / 4 + 20}
              fontSize={11}
              fill="#9d174d"
              fontWeight={600}
            >
              Producers
            </text>

            {/* Edges — drawn first so nodes overlay */}
            {visibleEdges.map((e) => {
              const from = extra.nodes.find((n) => n.id === e.from)
              const to = extra.nodes.find((n) => n.id === e.to)
              if (!from || !to) return null
              return (
                <line
                  key={`${e.from}-${e.to}`}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke="#475569"
                  strokeWidth={1.5}
                  markerEnd="url(#fw-arrow)"
                />
              )
            })}

            <defs>
              <marker
                id="fw-arrow"
                markerWidth="8"
                markerHeight="8"
                refX="6"
                refY="4"
                orient="auto"
              >
                <path d="M 0 0 L 8 4 L 0 8 z" fill="#475569" />
              </marker>
            </defs>

            {/* Nodes */}
            {visibleNodes.map((n) => (
              <FoodWebNode
                key={n.id}
                node={n}
                affected={removedDownstream.has(n.id)}
                selected={selectedId === n.id}
                onSelect={() => setSelectedId(n.id)}
              />
            ))}
          </svg>
          <figcaption className="border-t border-line bg-canvas px-3 py-1.5 text-[11px] text-muted">
            <T value={extra.title} />
          </figcaption>
        </figure>

        <SidePanel
          node={selected}
          affected={selected ? removedDownstream.has(selected.id) : false}
          scenario={scenario}
        />
      </div>
    </div>
  )
}

function FoodWebNode({
  node,
  affected,
  selected,
  onSelect,
}: {
  node: FoodWebNode
  affected: boolean
  selected: boolean
  onSelect: () => void
}) {
  const colors = colorForTrophic(node.trophic)
  return (
    <g
      onClick={onSelect}
      style={{ cursor: 'pointer' }}
      data-food-web-hotspot={node.id}
    >
      <circle
        cx={node.x}
        cy={node.y}
        r={28}
        fill={affected ? '#fef2f2' : colors.fill}
        stroke={selected ? '#0d9488' : affected ? '#dc2626' : colors.stroke}
        strokeWidth={selected || affected ? 3 : 2}
      />
      <text
        x={node.x}
        y={node.y + 4}
        fontSize={11}
        fill={colors.text}
        textAnchor="middle"
        fontWeight={600}
      >
        {node.shortLabel}
      </text>
      {selected && (
        <circle
          cx={node.x}
          cy={node.y}
          r={34}
          fill="none"
          stroke="#0d9488"
          strokeWidth={2}
        />
      )}
    </g>
  )
}

function colorForTrophic(level: FoodWebNode['trophic']): {
  fill: string
  stroke: string
  text: string
} {
  if (level === 'producer') {
    return { fill: '#fce7f3', stroke: '#9d174d', text: '#831843' }
  }
  if (level === 'primary') {
    return { fill: '#dbeafe', stroke: '#1e40af', text: '#1e3a8a' }
  }
  if (level === 'secondary') {
    return { fill: '#dcfce7', stroke: '#166534', text: '#14532d' }
  }
  return { fill: '#fef3c7', stroke: '#92400e', text: '#78350f' }
}

function SidePanel({
  node,
  affected,
  scenario,
}: {
  node: FoodWebNode | null
  affected: boolean
  scenario: 'normal' | 'no-fox' | 'no-rabbit'
}) {
  if (!node) {
    return (
      <aside className="rounded-lg border border-line bg-surface p-4">
        <p className="text-sm text-muted">
          <T value={FOOD_WEB.empty} />
        </p>
      </aside>
    )
  }

  return (
    <aside className="space-y-3 rounded-lg border border-line bg-surface p-4">
      <div>
        <div className="text-xs font-semibold uppercase tracking-wide text-muted">
          <T value={trophicLabel(node.trophic)} />
        </div>
        <h3 className="text-base font-semibold text-ink">
          <T value={node.name} />
        </h3>
      </div>

      <p className="text-sm text-ink-soft">
        <T value={node.description} />
      </p>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <div>
          <div className="font-semibold text-muted">
            <T value={FOOD_WEB.eatsHeading} />
          </div>
          <ul className="mt-1 space-y-0.5 text-ink-soft">
            {node.eats.length === 0 ? (
              <li>
                <T value={FOOD_WEB.eatsNothing} />
              </li>
            ) : (
              node.eats.map((e) => <li key={e.id}>· <T value={e.label} /></li>)
            )}
          </ul>
        </div>
        <div>
          <div className="font-semibold text-muted">
            <T value={FOOD_WEB.eatenByHeading} />
          </div>
          <ul className="mt-1 space-y-0.5 text-ink-soft">
            {node.eatenBy.length === 0 ? (
              <li>
                <T value={FOOD_WEB.eatenByNothing} />
              </li>
            ) : (
              node.eatenBy.map((e) => <li key={e.id}>· <T value={e.label} /></li>)
            )}
          </ul>
        </div>
      </div>

      {affected && scenario !== 'normal' && (
        <div className="rounded-md border border-rose-200 bg-rose-50 p-2 text-xs text-rose-900">
          <T value={FOOD_WEB.affectedNote} />
        </div>
      )}
    </aside>
  )
}

function trophicLabel(level: FoodWebNode['trophic']): Bilingual {
  if (level === 'producer') return FOOD_WEB.trophicProducer
  if (level === 'primary') return FOOD_WEB.trophicPrimary
  if (level === 'secondary') return FOOD_WEB.trophicSecondary
  return FOOD_WEB.trophicTertiary
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
