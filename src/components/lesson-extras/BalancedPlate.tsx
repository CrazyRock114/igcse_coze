import { useMemo, useState } from 'react'
import type { BalancedPlateExtra } from '@/content/types'
import { T } from '@/components/i18n/T'
import { BALANCED_PLATE } from '@/lib/lessonExtrasStrings'

/**
 * A "build a plate" mini-game.
 *
 * Click a food card to add one serving; click it again to remove. The plate on the
 * right shows the running total as a section diagram, and the checklist underneath
 * says which food groups are still under the recommended amount. The goal is
 * deliberately generous — half the plate vegetables, a quarter protein, a quarter
 * carbohydrate — not a precise calorie count, because the lesson is "what groups
 * does a balanced diet contain" not "what is your BMR".
 *
 * The plate diagram is plain CSS / SVG: a circle divided into 6 sectors in fixed
 * positions, each sector lit up when the group has at least one serving. There is
 * no drag-and-drop, because clicking is faster on touch and the visual feedback is
 * clearer when something snaps in.
 */
export function BalancedPlate({ extra }: { extra: BalancedPlateExtra }) {
  const [picks, setPicks] = useState<Record<string, number>>({})

  const counts = useMemo(() => {
    const c: Record<string, number> = {}
    for (const f of extra.foods) c[f.group] = (c[f.group] ?? 0) + (picks[f.id] ?? 0)
    return c
  }, [picks, extra.foods])

  const allGroups: Array<keyof typeof extra.targets> = ['veg', 'fruit', 'protein', 'carb', 'dairy', 'fat']
  const metTargets = allGroups.filter((g) => (counts[g] ?? 0) >= extra.targets[g]).length
  const isBalanced = metTargets === allGroups.length

  const total = Object.values(counts).reduce((a, b) => a + b, 0)

  const add = (id: string) => setPicks((p) => ({ ...p, [id]: (p[id] ?? 0) + 1 }))
  const remove = (id: string) =>
    setPicks((p) => {
      const current = p[id] ?? 0
      if (current <= 1) {
        const next = { ...p }
        delete next[id]
        return next
      }
      return { ...p, [id]: current - 1 }
    })
  const reset = () => setPicks({})

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_240px]">
      {/* Food cards */}
      <div>
        <p className="mb-2 text-xs text-muted">
          <T value={BALANCED_PLATE.cardsHint} />
        </p>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
          {extra.foods.map((f) => {
            const picked = picks[f.id] ?? 0
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => (picked > 0 ? remove(f.id) : add(f.id))}
                className={
                  'flex flex-col items-center rounded-lg border p-2 transition-colors ' +
                  (picked > 0
                    ? 'border-teal-600 bg-teal-50'
                    : 'border-line bg-surface hover:bg-canvas')
                }
                aria-pressed={picked > 0}
              >
                <span className="text-2xl leading-none" aria-hidden="true">
                  {f.glyph}
                </span>
                <span className="mt-1 text-xs font-medium text-ink">
                  <T value={f.name} />
                </span>
                {picked > 0 && (
                  <span className="mt-0.5 text-[10px] text-teal-700">×{picked}</span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Plate diagram */}
      <div className="flex flex-col items-center">
        <PlateDiagram counts={counts} />
        <p className="mt-2 text-center text-xs text-muted">
          {total === 0 ? (
            <T value={BALANCED_PLATE.empty} />
          ) : isBalanced ? (
            <T value={BALANCED_PLATE.balanced} />
          ) : (
            <span>
              {total} <T value={BALANCED_PLATE.totalLabel} />
            </span>
          )}
        </p>
        {total > 0 && (
          <button
            type="button"
            onClick={reset}
            className="mt-1 text-[11px] text-muted underline hover:text-ink-soft"
          >
            <T value={BALANCED_PLATE.reset} />
          </button>
        )}
      </div>

      {/* Checklist */}
      <div className="lg:col-span-2">
        <ul className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
          {allGroups.map((g) => {
            const target = extra.targets[g]
            const got = counts[g] ?? 0
            const met = got >= target
            return (
              <li
                key={g}
                className={
                  'flex items-center gap-2 rounded-md border px-2 py-1 text-xs ' +
                  (met
                    ? 'border-teal-600 bg-teal-50 text-ink'
                    : 'border-line bg-canvas text-ink-soft')
                }
              >
                <span
                  className={
                    'inline-block size-2 shrink-0 rounded-full ' +
                    (met ? 'bg-teal-600' : 'bg-line')
                  }
                  aria-hidden="true"
                />
                <span className="capitalize">
                  {g} <span className="text-muted">{got} / {target}</span>
                </span>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

/**
 * The plate, drawn as a circle split into 6 sectors. Each sector is the same size —
 * the diagram is a layout, not a pie chart. A sector is filled when its group has at
 * least one serving, with a darker tone for hitting the target.
 */
function PlateDiagram({ counts }: { counts: Record<string, number> }) {
  // Six groups, arranged clockwise from 12 o'clock. The order is the order the
  // checklist uses, so the eye can match sector to row.
  const groups: Array<{ id: string; label: string; color: string; angle: number }> = [
    { id: 'veg', label: 'V', color: '#16a34a', angle: 0 },
    { id: 'fruit', label: 'F', color: '#dc2626', angle: 60 },
    { id: 'protein', label: 'P', color: '#a16207', angle: 120 },
    { id: 'carb', label: 'C', color: '#ca8a04', angle: 180 },
    { id: 'dairy', label: 'D', color: '#0ea5e9', angle: 240 },
    { id: 'fat', label: 'O', color: '#7c3aed', angle: 300 },
  ]
  const targets: Record<string, number> = { veg: 2, fruit: 1, protein: 1, carb: 1, dairy: 1, fat: 1 }
  const r = 80
  return (
    <svg viewBox="-100 -100 200 200" className="h-44 w-44" role="img" aria-label="A plate divided into six sectors">
      {/* Plate base */}
      <circle r={r + 6} fill="#fff" stroke="#cbd5e1" strokeWidth="2" />
      {groups.map((g) => {
        const filled = (counts[g.id] ?? 0) > 0
        const met = (counts[g.id] ?? 0) >= (targets[g.id] ?? 0)
        const start = (g.angle - 30) * (Math.PI / 180)
        const end = (g.angle + 30) * (Math.PI / 180)
        const x1 = Math.cos(start) * r
        const y1 = Math.sin(start) * r
        const x2 = Math.cos(end) * r
        const y2 = Math.sin(end) * r
        const d = `M 0 0 L ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2} Z`
        return (
          <g key={g.id}>
            <path
              d={d}
              fill={filled ? (met ? g.color : g.color + '55') : '#f1f5f9'}
              stroke="#cbd5e1"
              strokeWidth="1"
            />
            <SectorLabel angle={g.angle} r={r * 0.55} label={g.label} />
          </g>
        )
      })}
    </svg>
  )
}

function SectorLabel({ angle, r, label }: { angle: number; r: number; label: string }) {
  const a = angle * (Math.PI / 180)
  const x = Math.cos(a) * r
  const y = Math.sin(a) * r
  return (
    <text
      x={x}
      y={y + 4}
      textAnchor="middle"
      fontSize="12"
      fontWeight="600"
      fill="var(--color-ink)"
      style={{ pointerEvents: 'none' }}
    >
      {label}
    </text>
  )
}
