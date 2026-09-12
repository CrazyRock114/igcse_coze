import { useState } from 'react'
import type { PyramidCompareExtra, PyramidLevel } from '@/content/types'
import { T } from '@/components/i18n/T'
import { PYRAMID_COMPARE } from '@/lib/lessonExtrasStrings'

/**
 * A side-by-side comparison of the three ecological pyramids
 * (G8 19.2, syllabus 19.2.13–19.2.19). No real PDF figure is available
 * for this chapter, so all three diagrams are hand-built SVG bars.
 *
 * The student picks which pyramid to focus on, and the matching
 * explanation appears below. The level values are driven by data, so
 * the component is reusable across the textbook's three example
 * pyramids (oak tree / grass / pond).
 */
const SVG_W = 480
const SVG_H = 360

export function PyramidCompare({ extra }: { extra: PyramidCompareExtra }) {
  const [active, setActive] = useState<'numbers' | 'biomass' | 'energy'>(
    extra.initialActive
  )
  const activeData = extra.pyramids[active]

  return (
    <div className="space-y-4">
      <p className="text-sm text-ink-soft">
        <T value={extra.intro} />
      </p>

      <div className="flex flex-wrap gap-2">
        <ModeButton
          active={active === 'numbers'}
          onClick={() => setActive('numbers')}
        >
          <T value={PYRAMID_COMPARE.numbers} />
        </ModeButton>
        <ModeButton
          active={active === 'biomass'}
          onClick={() => setActive('biomass')}
        >
          <T value={PYRAMID_COMPARE.biomass} />
        </ModeButton>
        <ModeButton
          active={active === 'energy'}
          onClick={() => setActive('energy')}
        >
          <T value={PYRAMID_COMPARE.energy} />
        </ModeButton>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_300px]">
        <figure className="m-0 overflow-hidden rounded-lg border border-line bg-canvas">
          <div className="border-b border-line bg-canvas px-3 py-1.5">
            <div className="text-xs font-semibold uppercase tracking-wide text-muted">
              <T value={PYRAMID_COMPARE[active]} />
            </div>
            <div className="text-sm font-medium text-ink">
              <T value={activeData.title} />
            </div>
          </div>
          <Pyramid levels={activeData.levels} unit={activeData.unit} />
          <figcaption className="border-t border-line bg-canvas px-3 py-1.5 text-[11px] text-muted">
            <T value={activeData.caption} />
          </figcaption>
        </figure>

        <aside className="space-y-3 rounded-lg border border-line bg-surface p-4">
          <h3 className="text-base font-semibold text-ink">
            <T value={PYRAMID_COMPARE[active]} />
          </h3>
          <p className="text-sm text-ink-soft">
            <T value={activeData.whyUseful} />
          </p>
          <div className="rounded-md border border-line bg-canvas/50 p-2 text-xs text-ink-soft">
            <T value={activeData.limit} />
          </div>
        </aside>
      </div>
    </div>
  )
}

function Pyramid({
  levels,
  unit,
}: {
  levels: PyramidLevel[]
  unit: string
}) {
  const max = Math.max(...levels.map((l) => l.value), 1)
  const baseY = SVG_H - 50
  const barHeight = (SVG_H - 100) / levels.length

  return (
    <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="block w-full">
      <title>Pyramid</title>
      {levels.map((l, i) => {
        const w = (l.value / max) * (SVG_W - 160)
        const x = 120
        const y = baseY - (i + 1) * barHeight
        return (
          <g key={i}>
            <rect
              x={x}
              y={y}
              width={w}
              height={barHeight - 4}
              fill={l.color}
              stroke="#0f172a"
              strokeWidth={1}
            />
            <text
              x={x - 6}
              y={y + barHeight / 2 + 4}
              fontSize={11}
              fill="#0f172a"
              textAnchor="end"
              fontWeight={500}
            >
              {l.label}
            </text>
            <text
              x={x + w + 6}
              y={y + barHeight / 2 + 4}
              fontSize={11}
              fill="#0f172a"
              textAnchor="start"
            >
              {formatValue(l.value, unit)}
            </text>
          </g>
        )
      })}
      <text
        x={10}
        y={SVG_H - 10}
        fontSize={10}
        fill="#64748b"
      >
        Trophic level
      </text>
      <text
        x={SVG_W - 10}
        y={SVG_H - 10}
        fontSize={10}
        fill="#64748b"
        textAnchor="end"
      >
        {unit}
      </text>
    </svg>
  )
}

function formatValue(v: number, unit: string): string {
  if (v >= 10000) return `${(v / 1000).toFixed(1)}k ${unit}`
  if (v >= 100) return `${v} ${unit}`
  if (Number.isInteger(v)) return `${v} ${unit}`
  return `${v.toFixed(1)} ${unit}`
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
