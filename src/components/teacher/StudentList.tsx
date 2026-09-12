import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { T } from '@/components/i18n/T'
import { listStudents, type StudentSummary } from '@/lib/teacher'
import { TEACHER } from '@/lib/teacherStrings'
import { formatRelativeTime } from '@/hooks/useProgressSnapshot'

/**
 * Teacher view: list of all students with rollup stats.
 *
 * The "wrong rate" column is attempts ÷ wrong, only shown when there's
 * at least one attempt — otherwise the cell is a dash. We surface this
 * prominently because a student with many wrongs but low attempts is
 * different from a student who's been actively trying.
 */
export function StudentList() {
  const [rows, setRows] = useState<StudentSummary[] | null>(null)
  const [err, setErr] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    listStudents()
      .then((r) => {
        if (!cancelled) setRows(r)
      })
      .catch((e) => {
        if (!cancelled) setErr(e instanceof Error ? e.message : String(e))
      })
    return () => {
      cancelled = true
    }
  }, [])

  if (err) {
    return (
      <p className="rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-900">
        <T value={TEACHER.loadError} />
        <br />
        <span className="font-mono text-xs">{err}</span>
      </p>
    )
  }
  if (rows === null) {
    return <div className="h-48 animate-pulse rounded-lg border border-line bg-canvas" aria-hidden="true" />
  }
  if (rows.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-line bg-canvas p-6 text-center text-sm text-muted">
        <T value={TEACHER.empty} />
      </p>
    )
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-line bg-surface">
      <table className="w-full text-sm">
        <thead className="border-b border-line bg-canvas text-xs uppercase tracking-wide text-muted">
          <tr>
            <th className="px-3 py-2 text-left">
              <T value={TEACHER.colName} />
            </th>
            <th className="px-3 py-2 text-right">
              <T value={TEACHER.colLastActive} />
            </th>
            <th className="px-3 py-2 text-right">
              <T value={TEACHER.colMistakes} />
            </th>
            <th className="px-3 py-2 text-right">
              <T value={TEACHER.colWords} />
            </th>
            <th className="px-3 py-2 text-right">
              <T value={TEACHER.colStatements} />
            </th>
            <th className="px-3 py-2 text-right">
              <T value={TEACHER.colAttempts} />
            </th>
            <th className="px-3 py-2 text-right">
              <T value={TEACHER.colWrongRate} />
            </th>
            <th className="px-3 py-2" />
          </tr>
        </thead>
        <tbody>
          {rows.map((s) => {
            const rate = s.totalAttempts > 0 ? s.totalWrong / s.totalAttempts : null
            return (
              <tr key={s.id} className="border-b border-line last:border-0 hover:bg-canvas/50">
                <td className="px-3 py-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg leading-none">{s.emoji}</span>
                    <span className="font-medium text-ink">{s.displayName}</span>
                    {s.isSelf && (
                      <span className="rounded-full border border-violet-300 bg-violet-50 px-1.5 py-0.5 text-[10px] font-semibold text-violet-800">
                        <T value={TEACHER.selfBadge} />
                      </span>
                    )}
                    {s.isTeacher && (
                      <span className="rounded-full border border-teal-300 bg-teal-50 px-1.5 py-0.5 text-[10px] font-semibold text-teal-800">
                        <T value={TEACHER.teacherBadge} />
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-3 py-2 text-right text-xs text-muted">
                  {s.lastActivityAt > 0 ? formatRelativeTime(s.lastActivityAt) : <T value={TEACHER.never} />}
                </td>
                <td className="px-3 py-2 text-right font-mono">
                  {s.mistakeCount > 0 ? (
                    <span>
                      {s.unresolvedMistakeCount > 0 ? (
                        <span className="text-rose-700">{s.unresolvedMistakeCount}</span>
                      ) : (
                        <span className="text-muted">0</span>
                      )}
                      <span className="text-muted"> / {s.mistakeCount}</span>
                    </span>
                  ) : (
                    <span className="text-muted">0</span>
                  )}
                </td>
                <td className="px-3 py-2 text-right font-mono text-ink">{s.wordBankCount}</td>
                <td className="px-3 py-2 text-right font-mono text-ink">{s.statementTouchedCount}</td>
                <td className="px-3 py-2 text-right font-mono text-ink">{s.totalAttempts}</td>
                <td className="px-3 py-2 text-right font-mono">
                  {rate === null ? (
                    <span className="text-muted">—</span>
                  ) : (
                    <span
                      className={
                        rate >= 0.5
                          ? 'text-rose-700'
                          : rate >= 0.25
                            ? 'text-amber-700'
                            : 'text-teal-700'
                      }
                    >
                      {(rate * 100).toFixed(0)}%
                    </span>
                  )}
                </td>
                <td className="px-3 py-2 text-right">
                  <Link
                    to={`/teacher/${s.id}`}
                    className="text-xs text-accent hover:underline"
                  >
                    <T value={TEACHER.openStudent} /> →
                  </Link>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
