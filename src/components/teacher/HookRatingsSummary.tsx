import { useEffect, useState } from 'react'
import { T } from '@/components/i18n/T'
import { getHookRatingsSummary, type HookRatingSummary } from '@/lib/teacher'
import { TEACHER } from '@/lib/teacherStrings'

/**
 * Aggregate hook ratings across the class. Until the rate-a-hook UI
 * ships this will usually be empty — that's expected, the panel shows
 * an empty state instead of pretending.
 */
export function HookRatingsSummary() {
  const [rows, setRows] = useState<HookRatingSummary[] | null>(null)

  useEffect(() => {
    let cancelled = false
    getHookRatingsSummary().then((r) => {
      if (!cancelled) setRows(r)
    })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section className="rounded-xl border border-line bg-surface p-4">
      <header className="mb-3">
        <h2 className="text-sm font-semibold text-ink">
          <T value={TEACHER.hookRatingsTitle} />
        </h2>
        <p className="mt-1 text-xs text-muted">
          <T value={TEACHER.hookRatingsSubtitle} />
        </p>
      </header>

      {rows === null ? (
        <div className="h-24 animate-pulse rounded-md bg-canvas" aria-hidden="true" />
      ) : rows.length === 0 ? (
        <p className="rounded-md border border-dashed border-line bg-canvas p-4 text-center text-xs text-muted">
          <T value={TEACHER.hookRatingsEmpty} />
        </p>
      ) : (
        <ul className="space-y-1.5">
          {rows.map((r) => (
            <li
              key={r.hookId}
              className="flex items-center gap-2 rounded-md border border-line bg-canvas/40 px-2 py-1.5 text-xs"
            >
              <span className="font-mono text-ink">{r.hookId}</span>
              <span className="text-teal-700">↑ {r.up}</span>
              <span className="text-rose-700">↓ {r.down}</span>
              <span
                className={
                  'ml-auto font-mono ' +
                  (r.net > 0 ? 'text-teal-700' : r.net < 0 ? 'text-rose-700' : 'text-muted')
                }
              >
                {r.net >= 0 ? '+' : ''}
                {r.net}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
