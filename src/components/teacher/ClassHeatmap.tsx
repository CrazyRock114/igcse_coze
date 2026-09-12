import { useEffect, useState } from 'react'
import { T } from '@/components/i18n/T'
import { getClassHeatmap, type ClassHeatmapEntry } from '@/lib/teacher'
import { TEACHER } from '@/lib/teacherStrings'

/**
 * Class-wide struggle map.
 *
 * Sorts statement_progress by wrong rate and surfaces the top 30. Each
 * row shows: how many students have the statement, the total wrongs,
 * the average wrong rate. Click the rate chip to copy the statement id.
 */
export function ClassHeatmap() {
  const [rows, setRows] = useState<ClassHeatmapEntry[] | null>(null)
  const [err, setErr] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    getClassHeatmap()
      .then((r) => {
        if (!cancelled) {
          r.sort((a, b) => {
            // First by avgWrongRate desc, then by totalWrong desc.
            const dw = b.avgWrongRate - a.avgWrongRate
            if (Math.abs(dw) > 0.0001) return dw
            return b.totalWrong - a.totalWrong
          })
          setRows(r.slice(0, 30))
        }
      })
      .catch((e) => {
        if (!cancelled) setErr(e instanceof Error ? e.message : String(e))
      })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section className="rounded-xl border border-line bg-surface p-4">
      <header className="mb-3">
        <h2 className="text-sm font-semibold text-ink">
          <T value={TEACHER.heatmapTitle} />
        </h2>
        <p className="mt-1 text-xs text-muted">
          <T value={TEACHER.heatmapSubtitle} />
        </p>
      </header>

      {err && (
        <p className="rounded-md border border-rose-200 bg-rose-50 p-2 text-xs text-rose-900">
          {err}
        </p>
      )}

      {rows === null ? (
        <div className="h-32 animate-pulse rounded-md bg-canvas" aria-hidden="true" />
      ) : rows.length === 0 ? (
        <p className="rounded-md border border-dashed border-line bg-canvas p-4 text-center text-xs text-muted">
          <T value={TEACHER.empty} />
        </p>
      ) : (
        <ul className="space-y-1.5">
          {rows.map((r) => {
            const intensity =
              r.avgWrongRate >= 0.5
                ? 'bg-rose-100 text-rose-900'
                : r.avgWrongRate >= 0.25
                  ? 'bg-amber-100 text-amber-900'
                  : 'bg-teal-50 text-teal-900'
            return (
              <li
                key={r.statementId}
                className="flex items-center gap-2 rounded-md border border-line bg-canvas/40 px-2 py-1.5 text-xs"
              >
                <button
                  type="button"
                  onClick={() => {
                    void navigator.clipboard?.writeText(r.statementId)
                  }}
                  className="font-mono text-ink hover:text-accent"
                  title="Copy"
                >
                  {r.statementId}
                </button>
                <span className="text-muted">
                  <T value={TEACHER.colStudentsTouched} />: {r.studentsTouched}
                </span>
                <span className="text-muted">
                  <T value={TEACHER.colTotalWrong} />: {r.totalWrong} / {r.totalAttempts}
                </span>
                <span
                  className={`ml-auto rounded-full px-2 py-0.5 font-mono font-semibold ${intensity}`}
                >
                  {(r.avgWrongRate * 100).toFixed(0)}%
                </span>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}
