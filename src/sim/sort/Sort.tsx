import { useState } from 'react'
import type { SimViewProps } from '../SimStage'
import { T } from '@/components/i18n/T'
import { placementKey } from '@/lib/assignment'
import { ui } from '@/lib/ui-strings'

/**
 * Sorting items into categories.
 *
 * Click an item, then click the bin it belongs in. Click-to-place rather than drag: it
 * works with a keyboard and on a phone, where a drag gesture fights the page scroll.
 *
 * A wrong placement sticks and is marked wrong, rather than being refused. Refusing it
 * turns the exercise into something you cannot fail — the student learns the answer by
 * elimination without ever having to commit to a reason. Being wrong, seeing it, and
 * moving the item is the part that teaches.
 *
 * A bin is a plain box holding real buttons, with a full-size button laid over it while an
 * item is selected. The obvious alternative — making the bin itself the button and the
 * placed items buttons inside it — cannot work: a disabled button swallows clicks on
 * everything inside it, so an item could never be taken back out of a bin at the one moment
 * you want to, which is when nothing else is selected.
 */
export function Sort({ result, onParamChange }: SimViewProps) {
  const assignment = result.assignment
  const [selected, setSelected] = useState<string | null>(null)

  if (!assignment) return null
  const { items, targets } = assignment

  const place = (itemId: string, targetIndex: number) => {
    onParamChange(placementKey(itemId), targetIndex)
    setSelected(null)
  }

  const pool = items.filter((i) => i.placed === undefined)

  return (
    <figure className="m-0">
      <p className="mb-3 text-sm text-muted">
        <T value={selected ? ui.sortChooseTarget : ui.sortChooseItem} />
      </p>

      <div className="grid gap-3 sm:grid-cols-2">
        {targets.map((target, index) => {
          const inHere = items.filter((i) => i.placed === target.id)
          return (
            <div
              key={target.id}
              className={
                'relative min-h-24 rounded-xl border-2 border-dashed p-3 transition-colors ' +
                (selected ? 'border-teal-500 bg-teal-50/50' : 'border-line bg-canvas')
              }
            >
              <span className="block text-sm font-semibold text-ink">
                <T value={target.label} />
              </span>
              {target.hint && (
                <span className="mt-0.5 block text-xs text-muted">
                  <T value={target.hint} />
                </span>
              )}

              <div className="mt-2 flex flex-wrap gap-1.5">
                {inHere.map((item) => {
                  const right = item.placed === item.target
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => place(item.id, 0)}
                      className={
                        'rounded-lg border px-2 py-1 text-xs font-medium ' +
                        (right
                          ? 'border-teal-600 bg-teal-100 text-teal-900'
                          : 'border-amber-500 bg-amber-50 text-amber-900')
                      }
                    >
                      {right ? '✓ ' : '✗ '}
                      <T value={item.label} />
                    </button>
                  )
                })}
              </div>

              {selected && (
                <button
                  type="button"
                  onClick={() => place(selected, index + 1)}
                  className="absolute inset-0 rounded-xl hover:bg-teal-100/50"
                >
                  <span className="sr-only">
                    <T value={target.label} />
                  </span>
                </button>
              )}
            </div>
          )
        })}
      </div>

      {pool.length > 0 && (
        <div className="mt-4 rounded-xl border border-line bg-surface p-3">
          <p className="mb-2 text-xs font-medium text-muted">
            <T value={ui.sortPool} />
          </p>
          <div className="flex flex-wrap gap-2">
            {pool.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelected(selected === item.id ? null : item.id)}
                className={
                  'rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ' +
                  (selected === item.id
                    ? 'border-teal-600 bg-teal-600 text-white'
                    : 'border-line bg-canvas text-ink hover:border-teal-500')
                }
              >
                <T value={item.label} />
              </button>
            ))}
          </div>
        </div>
      )}
    </figure>
  )
}
