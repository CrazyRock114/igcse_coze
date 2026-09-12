import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { T } from '@/components/i18n/T'
import { getStudentDetail, type StudentDetail as StudentDetailData } from '@/lib/teacher'
import { TEACHER } from '@/lib/teacherStrings'
import { statementFillClass, classify } from '@/lib/progressTypes'
import { formatRelativeTime } from '@/hooks/useProgressSnapshot'

/**
 * Per-student view. Fetches the full record once on mount and renders
 * four sections: profile, word bank, mistake log, statement progress.
 */
export function StudentDetail() {
  const { userId } = useParams<{ userId: string }>()
  const [data, setData] = useState<StudentDetailData | null>(null)
  const [err, setErr] = useState<string | null>(null)

  useEffect(() => {
    if (!userId) return
    let cancelled = false
    getStudentDetail(userId)
      .then((d) => {
        if (cancelled) setData(d)
      })
      .catch((e) => {
        if (cancelled) setErr(e instanceof Error ? e.message : String(e))
      })
    return () => {
      cancelled = true
    }
  }, [userId])

  if (err) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-8">
        <Back />
        <p className="rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-900">
          <T value={TEACHER.loadFailed} />: <span className="font-mono text-xs">{err}</span>
        </p>
      </main>
    )
  }
  if (!data) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-8">
        <Back />
        <div className="h-48 animate-pulse rounded-xl border border-line bg-canvas" aria-hidden="true" />
      </main>
    )
  }

  const { profile, wordBank, mistakes, progress, hookRatings } = data

  // Group mistakes by lesson slug so the teacher can see per-lesson
  // patterns at a glance.
  const mistakesByLesson = groupBy(mistakes, (m) => `${m.subject}/${m.slug}`)

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <Back />

      <header className="mb-6 flex flex-wrap items-center gap-3">
        <span className="text-3xl">{profile.emoji}</span>
        <div>
          <h1 className="text-2xl font-bold text-ink">
            {profile.displayName}
            {profile.isTeacher && (
              <span className="ml-2 rounded-full border border-teal-300 bg-teal-50 px-2 py-0.5 text-[10px] font-semibold text-teal-800">
                <T value={TEACHER.teacherBadge} />
              </span>
            )}
          </h1>
          <p className="font-mono text-xs text-muted">{profile.id}</p>
        </div>
      </header>

      <Section title={<T value={TEACHER.studentWordBank} />} count={wordBank.length}>
        {wordBank.length === 0 ? (
          <Empty />
        ) : (
          <ul className="grid gap-1.5 sm:grid-cols-2">
            {wordBank.map((w) => (
              <li
                key={w.termId}
                className="flex items-center gap-2 rounded-md border border-line bg-canvas/40 px-2 py-1.5 text-xs"
              >
                <span className="font-mono text-ink">{w.termId}</span>
                <span className="text-muted">· {w.subject}/{w.slug}</span>
                <span className="ml-auto text-[10px] text-muted">
                  {w.lastReviewed > 0 ? formatRelativeTime(w.lastReviewed) : <T value={TEACHER.never} />}
                </span>
              </li>
            ))}
          </ul>
        )}
      </Section>

      <Section title={<T value={TEACHER.studentMistakes} />} count={mistakes.length}>
        {mistakes.length === 0 ? (
          <Empty />
        ) : (
          <div className="space-y-3">
            {Object.entries(mistakesByLesson).map(([key, rows]) => (
              <div key={key}>
                <p className="mb-1 font-mono text-xs text-muted">{key}</p>
                <ul className="space-y-1.5">
                  {rows.map((m) => (
                    <li
                      key={m.id}
                      className="rounded-md border border-line bg-canvas/40 px-2 py-1.5 text-xs"
                    >
                      <p className="font-mono text-ink">{m.questionId}</p>
                      <p className="mt-0.5">
                        <span className="text-rose-700">Picked:</span> {m.pickedText} ·{' '}
                        <span className="text-teal-700">Correct:</span> {m.correctText}
                      </p>
                      <p className="mt-0.5 text-[10px] text-muted">
                        {m.attemptCount} attempt{m.attemptCount === 1 ? '' : 's'} · last{' '}
                        {formatRelativeTime(m.lastSeen)}
                        {m.resolved ? ' · resolved' : ''}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </Section>

      <Section title={<T value={TEACHER.studentProgress} />} count={progress.length}>
        {progress.length === 0 ? (
          <Empty />
        ) : (
          <ul className="grid gap-1.5 sm:grid-cols-2">
            {progress.map((p) => {
              const status = classify(p)
              return (
                <li
                  key={p.statementId}
                  className="flex items-center gap-2 rounded-md border border-line bg-canvas/40 px-2 py-1.5 text-xs"
                >
                  <span
                    className={`inline-block size-2.5 shrink-0 rounded-sm ${statementFillClass(status)}`}
                    aria-hidden="true"
                  />
                  <span className="font-mono text-ink">{p.statementId}</span>
                  <span className="text-muted">
                    {p.attempts} att · {p.wrongCount} wrong
                  </span>
                  <span className="ml-auto text-[10px] text-muted">
                    {p.lastSeenAt > 0 ? formatRelativeTime(p.lastSeenAt) : <T value={TEACHER.never} />}
                  </span>
                </li>
              )
            })}
          </ul>
        )}
      </Section>

      <Section title={<T value={TEACHER.studentHookRatings} />} count={hookRatings.length}>
        {hookRatings.length === 0 ? (
          <Empty />
        ) : (
          <ul className="space-y-1.5">
            {hookRatings.map((r) => (
              <li
                key={r.hookId}
                className="flex items-center gap-2 rounded-md border border-line bg-canvas/40 px-2 py-1.5 text-xs"
              >
                <span className="font-mono text-ink">{r.hookId}</span>
                <span className={r.rating === 'up' ? 'text-teal-700' : 'text-rose-700'}>
                  {r.rating === 'up' ? '👍' : '👎'}
                </span>
                <span className="ml-auto text-[10px] text-muted">
                  {formatRelativeTime(r.ratedAt)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </Section>
    </main>
  )
}

function Back() {
  return (
    <Link to="/teacher" className="mb-4 inline-block text-xs text-muted hover:text-ink-soft">
      <T value={TEACHER.backToList} />
    </Link>
  )
}

function Section({
  title,
  count,
  children,
}: {
  title: React.ReactNode
  count: number
  children: React.ReactNode
}) {
  return (
    <section className="mb-6 rounded-xl border border-line bg-surface p-4">
      <header className="mb-3 flex items-baseline justify-between">
        <h2 className="text-sm font-semibold text-ink">{title}</h2>
        <span className="font-mono text-xs text-muted">{count}</span>
      </header>
      {children}
    </section>
  )
}

function Empty() {
  return (
    <p className="rounded-md border border-dashed border-line bg-canvas p-3 text-center text-xs text-muted">
      <T value={TEACHER.empty} />
    </p>
  )
}

function groupBy<T, K extends string>(rows: T[], key: (t: T) => K): Record<K, T[]> {
  const out = {} as Record<K, T[]>
  for (const r of rows) {
    const k = key(r)
    if (!out[k]) out[k] = []
    out[k].push(r)
  }
  return out
}
