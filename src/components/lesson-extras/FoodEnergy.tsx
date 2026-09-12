import { useMemo, useState } from 'react'
import type { FoodEnergyExtra } from '@/content/types'
import { T } from '@/components/i18n/T'
import { FOOD_ENERGY } from '@/lib/lessonExtrasStrings'

/**
 * Energy content of foods, kJ per 100 g.
 *
 * The point of the table is *comparison*, not precision: the same mass of fat carries
 * more than twice the energy of the same mass of carbohydrate or protein, and that
 * is the explanation for the obesity / fried-food line in Chapter 1.1. Sorting by
 * energy makes the inequality visible; the colour coding reinforces the grouping
 * even before the student reads the numbers.
 *
 * Click a row to pin it — the rest of the table dims slightly so the comparison
 * reads at a glance. Click again or click the headline to clear.
 */
export function FoodEnergy({ extra }: { extra: FoodEnergyExtra }) {
  const sorted = useMemo(() => [...extra.foods].sort((a, b) => b.energy - a.energy), [extra.foods])
  const [pinnedId, setPinnedId] = useState<string | null>(null)

  const min = sorted[sorted.length - 1]?.energy ?? 0
  const max = sorted[0]?.energy ?? 1
  const pinned = sorted.find((f) => f.id === pinnedId) ?? null

  return (
    <div className="space-y-3">
      <div className="overflow-x-auto rounded-lg border border-line">
        <table className="w-full text-sm">
          <thead className="bg-canvas text-xs uppercase tracking-wide text-muted">
            <tr>
              <th className="px-3 py-2 text-left">
                <T value={FOOD_ENERGY.colFood} />
              </th>
              <th className="px-3 py-2 text-left">
                <T value={FOOD_ENERGY.colGroup} />
              </th>
              <th className="px-3 py-2 text-right">
                <T value={FOOD_ENERGY.colEnergy} />
              </th>
              <th className="px-3 py-2 text-left">
                <T value={FOOD_ENERGY.colBar} />
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((f) => {
              const isPinned = f.id === pinnedId
              const dim = pinnedId !== null && !isPinned
              return (
                <tr
                  key={f.id}
                  onClick={() => setPinnedId((cur) => (cur === f.id ? null : f.id))}
                  data-food-id={f.id}
                  className={
                    'cursor-pointer border-t border-line transition-colors ' +
                    (isPinned ? 'bg-teal-50' : dim ? 'bg-surface opacity-50 hover:opacity-80' : 'bg-surface hover:bg-canvas')
                  }
                >
                  <td className="px-3 py-1.5 font-medium text-ink">
                    <T value={f.name} />
                  </td>
                  <td className="px-3 py-1.5">
                    <GroupBadge group={f.group} />
                  </td>
                  <td className="px-3 py-1.5 text-right font-mono text-ink-soft">
                    {f.energy} <span className="text-[10px] text-muted">kJ / 100 g</span>
                  </td>
                  <td className="px-3 py-1.5">
                    <Bar value={f.energy} min={min} max={max} group={f.group} />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {pinned ? (
        <p className="rounded-md border border-teal-600 bg-teal-50 px-3 py-2 text-xs text-ink-soft">
          <T value={FOOD_ENERGY.pinnedHint} />
          <span className="ml-1 font-mono text-ink">
            {pinned.energy} kJ / 100 g
          </span>
        </p>
      ) : (
        <p className="text-[11px] text-muted">
          <T value={FOOD_ENERGY.clickHint} />
        </p>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Group badge + bar
// ---------------------------------------------------------------------------

const GROUP_COLOR: Record<FoodEnergyExtra['foods'][number]['group'], { bg: string; fg: string; bar: string }> = {
  carb: { bg: '#fef3c7', fg: '#92400e', bar: '#f59e0b' },
  protein: { bg: '#fce7f3', fg: '#9d174d', bar: '#ec4899' },
  fat: { bg: '#fef9c3', fg: '#854d0e', bar: '#eab308' },
  'fruit-veg': { bg: '#dcfce7', fg: '#166534', bar: '#22c55e' },
  dairy: { bg: '#e0f2fe', fg: '#075985', bar: '#0ea5e9' },
  mixed: { bg: '#ede9fe', fg: '#5b21b6', bar: '#8b5cf6' },
}

function GroupBadge({ group }: { group: FoodEnergyExtra['foods'][number]['group'] }) {
  const c = GROUP_COLOR[group]
  return (
    <span
      className="inline-block rounded-full px-2 py-0.5 text-[10px] font-medium"
      style={{ backgroundColor: c.bg, color: c.fg }}
    >
      <T value={FOOD_ENERGY.groupLabel[group]} />
    </span>
  )
}

function Bar({
  value,
  min,
  max,
  group,
}: {
  value: number
  min: number
  max: number
  group: FoodEnergyExtra['foods'][number]['group']
}) {
  const pct = max === min ? 0 : ((value - min) / (max - min)) * 100
  const c = GROUP_COLOR[group]
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-canvas">
      <div
        className="h-full rounded-full"
        style={{ width: `${pct}%`, backgroundColor: c.bar }}
      />
    </div>
  )
}
