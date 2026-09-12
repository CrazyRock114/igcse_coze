import { useState } from 'react'
import type { SimViewProps } from '../SimStage'
import { T } from '@/components/i18n/T'
import { placementKey } from '@/lib/assignment'
import { ui } from '@/lib/ui-strings'

/**
 * Pairing each item on the left with one on the right.
 *
 * The same data as `sort` — items assigned to targets — drawn as two columns instead of
 * bins, because the pairing is one-to-one and the two sides are different *kinds* of thing:
 * a nutrient and a deficiency disease, an organ and its function, an ion and its test.
 *
 * A target already spoken for is shown as taken rather than hidden, so the student can see
 * the whole right-hand column while working and has to reason about which pairing to undo.
 */
export function Match({ result, onParamChange }: SimViewProps) {
  const assignment = result.assignment
  const [selected, setSelected] = useState<string | null>(null)

  if (!assignment) return null
  const { items, targets } = assignment

  const pair = (itemId: string, targetIndex: number) => {
    onParamChange(placementKey(itemId), targetIndex)
    setSelected(null)
  }

  /**
   * Which items have claimed this target — all of them, not just the first.
   *
   * Nothing stops a student pairing two items with the same partner, and hiding the second
   * one would leave them staring at an item marked wrong with no visible reason. Showing
   * both makes the clash the obvious thing to fix.
   */
  const claimants = (targetId: string) => items.filter((i) => i.placed === targetId)

  return (
    <figure className="m-0">
      <p className="mb-3 text-sm text-muted">
        <T value={selected ? ui.matchChooseTarget : ui.matchChooseItem} />
      </p>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          {items.map((item) => {
            const done = item.placed !== undefined
            const right = item.placed === item.target
            return (
              <button
                key={item.id}
                type="button"
                onClick={() =>
                  done ? pair(item.id, 0) : setSelected(selected === item.id ? null : item.id)
                }
                className={
                  'block w-full rounded-lg border px-3 py-2 text-left text-sm transition-colors ' +
                  (selected === item.id
                    ? 'border-teal-600 bg-teal-600 font-medium text-white'
                    : done
                      ? right
                        ? 'border-teal-600 bg-teal-50 text-teal-900'
                        : 'border-amber-500 bg-amber-50 text-amber-900'
                      : 'border-line bg-canvas text-ink hover:border-teal-500')
                }
              >
                {done && (right ? '✓ ' : '✗ ')}
                <T value={item.label} />
              </button>
            )
          })}
        </div>

        <div className="space-y-2">
          {targets.map((target, index) => {
            const taken = claimants(target.id)
            return (
              <button
                key={target.id}
                type="button"
                onClick={() => selected && pair(selected, index + 1)}
                disabled={!selected}
                className={
                  'block w-full rounded-lg border px-3 py-2 text-left text-sm transition-colors ' +
                  (selected
                    ? 'border-teal-500 bg-teal-50/50 text-ink hover:bg-teal-50'
                    : taken.length > 0
                      ? 'border-line bg-canvas text-muted'
                      : 'border-line bg-surface text-ink')
                }
              >
                <T value={target.label} />
                {taken.map((item) => (
                  <span key={item.id} className="mt-0.5 block text-xs text-muted">
                    ← <T value={item.label} />
                  </span>
                ))}
              </button>
            )
          })}
        </div>
      </div>
    </figure>
  )
}
