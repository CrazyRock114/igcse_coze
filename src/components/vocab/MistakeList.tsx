import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { T } from '@/components/i18n/T'
import { VOCAB } from '@/lib/vocabStrings'
import {
  mistakeStore,
  recentMistakes,
  sortByRecency,
  topWrongQuestions,
  unresolved,
} from '@/lib/mistakeStore'
import type { Mistake } from '@/lib/mistakeTypes'
import { lessons } from '@/lib/registry'
import type { Question } from '@/content/types'

/**
 * The "Your mistakes" tab on /vocab.
 *
 * Three sections, top to bottom:
 *   1. Top 5 still-wrong questions (sorted by attemptCount)
 *   2. Recent (last 5 days)
 *   3. Resolved (read-only — what the student has already cleared)
 *
 * Each row links to the lesson that owns the question, and the right-side
 * action is "Mark resolved" (or "Remove" for resolved rows).
 *
 * Re-renders when the store changes. The store is module-level, so the
 * only reliable signal is a custom event dispatched by anything that
 * mutates it (the QuestionCard in this build, plus the buttons below).
 */
type Filter = 'unresolved' | 'resolved' | 'all'

export function MistakeList({ scope }: { scope?: import('@/pages/VocabPage').VocabScope }) {
  const [rows, setRows] = useState<Mistake[]>(() => mistakeStore.list())
  const [filter, setFilter] = useState<Filter>('unresolved')

  // Re-read whenever anything in the app signals that the store changed.
  // The QuestionCard dispatches this event after log/markResolved.
  useEffect(() => {
    const onChange = () => setRows(mistakeStore.list())
    window.addEventListener('igcse:vocab-changed', onChange)
    return () => window.removeEventListener('igcse:vocab-changed', onChange)
  }, [])

  // Build a quick lookup: questionId -> Question (so we can show the stem
  // and the mark scheme in the row).
  const questionById = useMemo(() => {
    const map: Record<string, { question: Question; subject: string; slug: string }> = {}
    for (const l of lessons) {
      for (const q of l.checkpoints) {
        map[q.id] = { question: q, subject: l.subject, slug: l.slug }
      }
    }
    return map
  }, [])

  const scopedRows = useMemo(() => {
    if (!scope) return rows
    return rows.filter((m) => {
      if (scope.subject !== 'all' && m.subject !== scope.subject) return false
      if (scope.slug !== 'all' && m.slug !== scope.slug) return false
      return true
    })
  }, [rows, scope])

  const filtered = useMemo(() => {
    let pool = scopedRows
    if (filter === 'unresolved') pool = unresolved(pool)
    else if (filter === 'resolved') pool = pool.filter((m) => m.resolved)
    return sortByRecency(pool)
  }, [scopedRows, filter])

  const last5 = useMemo(() => recentMistakes(scopedRows, 5), [scopedRows])
  const top5 = useMemo(() => topWrongQuestions(scopedRows, 5), [scopedRows])

  const total = scopedRows.length
  const unres = unresolved(scopedRows).length
  const res = total - unres

  const empty = total === 0
  const noUnresolved = !empty && unres === 0

  const handleResolve = (qid: string) => {
    mistakeStore.markResolved(qid)
    setRows(mistakeStore.list())
    window.dispatchEvent(new Event('igcse:vocab-changed'))
  }

  const handleRemove = (qid: string) => {
    const next = mistakeStore.list().filter((m) => m.questionId !== qid)
    // No public remove-by-questionId method; clear-and-restore is overkill
    // for v1. Instead we use the store's clear + log all-but-one. Easiest
    // path: clear, then re-log everything else. For a small N (typical
    // student mistake log is <30 entries) this is fine.
    mistakeStore.clear()
    for (const m of next) {
      const wasResolved = m.resolved
      // Re-log preserves the row; we re-derive the input shape that log() wants.
      const input = {
        questionId: m.questionId,
        subject: m.subject,
        slug: m.slug,
        pickedIndex: m.pickedIndex,
        pickedText: m.pickedText,
        correctIndex: m.correctIndex,
        correctText: m.correctText,
      }
      mistakeStore.log(input)
      if (wasResolved) mistakeStore.markResolved(m.questionId)
    }
    setRows(mistakeStore.list())
    window.dispatchEvent(new Event('igcse:vocab-changed'))
  }

  const handleClearAll = () => {
    if (!window.confirm('Clear all logged mistakes? This cannot be undone.')) return
    mistakeStore.clear()
    setRows([])
    window.dispatchEvent(new Event('igcse:vocab-changed'))
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm text-ink-soft">
          <T
            value={VOCAB.mistakesSummary}
            params={{ total: String(total), unresolved: String(unres), resolved: String(res) }}
          />
        </p>
        <div className="flex flex-wrap items-center gap-1">
          {(
            [
              { id: 'unresolved' as const, label: VOCAB.mistakesFilterUnresolved },
              { id: 'resolved' as const, label: VOCAB.mistakesFilterResolved },
              { id: 'all' as const, label: VOCAB.mistakesAllTime },
            ]
          ).map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={
                'rounded-md border px-2 py-0.5 text-xs ' +
                (filter === f.id
                  ? 'border-teal-600 bg-teal-50 text-teal-800'
                  : 'border-line bg-surface text-ink-soft hover:bg-canvas')
              }
            >
              <T value={f.label} />
            </button>
          ))}
          {total > 0 && (
            <button
              type="button"
              onClick={handleClearAll}
              className="ml-2 rounded-md border border-rose-300 px-2 py-0.5 text-xs text-rose-700 hover:bg-rose-50"
            >
              <T value={VOCAB.mistakesClearAll} />
            </button>
          )}
        </div>
      </div>

      {empty && (
        <p className="rounded-lg border border-dashed border-line bg-canvas p-6 text-center text-sm text-muted">
          <T value={VOCAB.mistakesEmpty} />
        </p>
      )}

      {noUnresolved && (
        <p className="rounded-lg border border-teal-200 bg-teal-50 p-4 text-sm text-teal-900">
          <T value={VOCAB.mistakesNoneUnresolved} />
        </p>
      )}

      {/* Top wrong (always visible if there are unresolved) */}
      {!empty && top5.length > 0 && filter !== 'resolved' && (
        <section>
          <h3 className="mb-2 text-sm font-semibold text-ink">
            Top 5 most-wrong <span className="text-xs text-muted">(unresolved)</span>
          </h3>
          <ul className="space-y-2">
            {top5.map((m) => (
              <MistakeRow
                key={m.id}
                m={m}
                qref={questionById[m.questionId]}
                onResolve={handleResolve}
                onRemove={handleRemove}
              />
            ))}
          </ul>
        </section>
      )}

      {/* The full list, filtered */}
      {!empty && (
        <section>
          <h3 className="mb-2 text-sm font-semibold text-ink">
            {filter === 'unresolved' && 'Still wrong'}
            {filter === 'resolved' && 'Resolved'}
            {filter === 'all' && 'All logged'}
            <span className="ml-2 text-xs font-normal text-muted">
              ({filtered.length} {last5 === filtered ? 'in last 5 days' : ''})
            </span>
          </h3>
          {filtered.length === 0 ? (
            <p className="rounded-md border border-dashed border-line bg-canvas p-3 text-center text-xs text-muted">
              {filter === 'unresolved' && 'No unresolved mistakes in this view.'}
              {filter === 'resolved' && 'Nothing resolved yet.'}
              {filter === 'all' && 'No mistakes logged.'}
            </p>
          ) : (
            <ul className="space-y-2">
              {filtered.map((m) => (
                <MistakeRow
                  key={m.id}
                  m={m}
                  qref={questionById[m.questionId]}
                  onResolve={handleResolve}
                  onRemove={handleRemove}
                />
              ))}
            </ul>
          )}
        </section>
      )}
    </div>
  )
}

function MistakeRow({
  m,
  qref,
  onResolve,
  onRemove,
}: {
  m: Mistake
  qref?: { question: Question; subject: string; slug: string } | undefined
  onResolve: (qid: string) => void
  onRemove: (qid: string) => void
}) {
  const dateLabel = new Date(m.lastSeen).toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
  return (
    <li
      data-mistake-id={m.questionId}
      className={
        'rounded-lg border bg-surface p-3 ' +
        (m.resolved ? 'border-teal-200 bg-teal-50/40' : 'border-rose-200')
      }
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div className="flex flex-wrap items-baseline gap-2">
          <span
            className={
              'rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ' +
              (m.resolved ? 'bg-teal-100 text-teal-800' : 'bg-rose-100 text-rose-800')
            }
          >
            {m.resolved ? 'Resolved' : 'Wrong'}
          </span>
          <span className="text-xs text-muted">
            {m.attemptCount}× <T value={VOCAB.mistakesAttemptCount} /> · {dateLabel}
          </span>
        </div>
        <div className="flex items-center gap-1">
          {qref && (
            <Link
              to={`/lesson/${qref.subject}/${qref.slug}#q-${m.questionId}`}
              className="rounded-md border border-line bg-canvas px-2 py-0.5 text-[11px] text-ink-soft hover:border-accent hover:text-accent"
            >
              <T value={VOCAB.mistakesGoToLesson} />
            </Link>
          )}
          {!m.resolved ? (
            <button
              type="button"
              onClick={() => onResolve(m.questionId)}
              className="rounded-md border border-teal-300 bg-white px-2 py-0.5 text-[11px] font-medium text-teal-700 hover:bg-teal-50"
            >
              <T value={VOCAB.mistakesResolve} />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onRemove(m.questionId)}
              className="rounded-md border border-line bg-white px-2 py-0.5 text-[11px] text-muted hover:border-rose-300 hover:text-rose-700"
            >
              <T value={VOCAB.mistakesRemove} />
            </button>
          )}
        </div>
      </div>
      {qref ? (
        <p className="mt-2 text-sm text-ink">{qref.question.stem}</p>
      ) : (
        <p className="mt-2 text-xs text-muted">
          (question <code className="font-mono">{m.questionId}</code> not found in any current
          lesson — it may have been removed.)
        </p>
      )}
      {qref && (
        <div className="mt-2 grid gap-1 text-xs sm:grid-cols-2">
          <p className="rounded-md border border-rose-200 bg-rose-50 px-2 py-1 text-rose-900">
            <span className="font-semibold">
              <T value={VOCAB.mistakesYouPicked} />:{' '}
            </span>
            {m.pickedText}
          </p>
          <p className="rounded-md border border-teal-200 bg-teal-50 px-2 py-1 text-teal-900">
            <span className="font-semibold">
              <T value={VOCAB.mistakesCorrect} />:{' '}
            </span>
            {m.correctText}
          </p>
        </div>
      )}
    </li>
  )
}
