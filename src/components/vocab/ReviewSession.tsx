import { useMemo, useState } from 'react'
import { T } from '@/components/i18n/T'
import type { Question } from '@/content/types'
import { mistakeStore } from '@/lib/mistakeStore'
import type { Mistake } from '@/lib/mistakeTypes'
import { VOCAB } from '@/lib/vocabStrings'
import { TutorPanel } from '@/components/tutor/TutorPanel'

export interface ReviewQuestion {
  question: Question
  /** subject code ('0610'…) or 'bank' origin marker */
  subject: string
  slug: string
}

/**
 * One-question-at-a-time redo session over the student's open mistakes.
 *
 * MCQ items: pick an option — correct resolves the mistake, wrong logs
 * another attempt and reveals the answer. Structured items (no options):
 * self-assessed against the mark scheme.
 */
export function ReviewSession({
  queue,
  onExit,
}: {
  queue: ReviewQuestion[]
  onExit: () => void
}) {
  const [idx, setIdx] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [schemeShown, setSchemeShown] = useState(false)
  const [stats, setStats] = useState({ done: 0, ok: 0, resolved: 0 })
  const [finished, setFinished] = useState(false)
  const [tutorOpen, setTutorOpen] = useState(false)

  const item = queue[idx]

  function advance(nextStats: { done: number; ok: number; resolved: number }) {
    setStats(nextStats)
    setPicked(null)
    setSchemeShown(false)
    setTutorOpen(false)
    if (idx + 1 >= queue.length) setFinished(true)
    else setIdx(idx + 1)
  }

  function resolveCurrent() {
    mistakeStore.markResolved(item!.question.id)
    window.dispatchEvent(new Event('igcse:vocab-changed'))
  }

  function logAttempt() {
    const q = item!.question
    const correct = q.answerIndex !== undefined ? q.options?.[q.answerIndex] ?? '' : ''
    mistakeStore.log({
      questionId: q.id,
      subject: item!.subject,
      slug: item!.slug,
      pickedIndex: picked ?? -1,
      pickedText: picked !== null ? q.options?.[picked] ?? '' : '',
      correctIndex: q.answerIndex ?? -1,
      correctText: correct,
    })
    window.dispatchEvent(new Event('igcse:vocab-changed'))
  }

  if (finished) {
    return (
      <div className="rounded-xl border border-line bg-surface p-6 text-center">
        <p className="text-lg font-semibold text-ink">
          <T value={VOCAB.reviewDone} />
        </p>
        <p className="mt-2 text-sm text-ink/70" data-zh>
          {VOCAB.reviewSummary.en.replace('{n}', String(stats.done)).replace('{ok}', String(stats.ok)).replace('{open}', String(stats.done - stats.ok))}
          <br />
          {VOCAB.reviewSummary.zh.replace('{n}', String(stats.done)).replace('{ok}', String(stats.ok)).replace('{open}', String(stats.done - stats.ok))}
        </p>
        <button type="button" onClick={onExit} className="mt-4 rounded-md bg-ink px-4 py-2 text-sm font-medium text-white hover:opacity-90">
          <T value={VOCAB.reviewExit} />
        </button>
      </div>
    )
  }

  if (!item) {
    return (
      <p className="text-sm text-ink/60">
        <T value={VOCAB.reviewNothing} />
      </p>
    )
  }

  const q = item.question
  const isMcq = Boolean(q.options && q.answerIndex !== undefined)
  const isCorrect = picked !== null && picked === q.answerIndex

  function pick(i: number) {
    if (picked !== null) return
    setPicked(i)
    const ok = i === q.answerIndex
    if (ok) {
      resolveCurrent()
      advance({ done: stats.done + 1, ok: stats.ok + 1, resolved: stats.resolved + 1 })
    } else {
      logAttempt()
      advance({ done: stats.done + 1, ok: stats.ok, resolved: stats.resolved })
    }
  }

  return (
    <div className="rounded-xl border border-line bg-surface p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-medium text-ink/80">
          {VOCAB.reviewOf.en.replace('{i}', String(idx + 1)).replace('{n}', String(queue.length))}
          <span className="mx-2 text-ink/30">|</span>
          {VOCAB.reviewOf.zh.replace('{i}', String(idx + 1)).replace('{n}', String(queue.length))}
        </p>
        <div className="flex items-center gap-2">
          <span className="rounded bg-white/10 px-2 py-0.5 font-mono text-xs text-ink/60">
            {q.marks} mk · {q.commandWord} · {q.tier}
          </span>
          {item.subject === 'bank' && (
            <span className="rounded bg-accent/15 px-2 py-0.5 text-xs text-accent" data-zh>
              <T value={VOCAB.reviewBankTag} />
            </span>
          )}
          <button type="button" onClick={onExit} className="text-xs text-ink/50 underline hover:text-ink/80">
            <T value={VOCAB.reviewExit} />
          </button>
        </div>
      </div>

      <p className="mt-3 text-base leading-relaxed text-ink">{q.stem}</p>
      <p className="mt-1 font-mono text-xs text-ink/40">{q.syllabus.join(' · ')}</p>

      {isMcq ? (
        <ul className="mt-4 space-y-2">
          {q.options!.map((opt, i) => {
            const revealed = picked !== null
            const isAnswer = i === q.answerIndex
            const isPicked = i === picked
            return (
              <li key={i}>
                <button
                  type="button"
                  disabled={revealed}
                  onClick={() => pick(i)}
                  className={`w-full rounded-lg border px-3 py-2 text-left text-sm transition-colors ${
                    revealed && isAnswer
                      ? 'border-emerald-500 bg-emerald-500/10 text-ink'
                      : revealed && isPicked
                        ? 'border-rose-500 bg-rose-500/10 text-ink'
                        : 'border-line text-ink/90 hover:border-teal-500 hover:bg-white/5'
                  }`}
                >
                  <span className="mr-2 font-mono text-xs text-ink/50">{'ABCD'[i] ?? '?'}</span>
                  {opt}
                </button>
              </li>
            )
          })}
        </ul>
      ) : schemeShown ? (
        <div className="mt-4 rounded-lg bg-white/5 p-3">
          <ul className="space-y-1 text-sm text-ink/90">
            {q.markScheme.map((mp, i) => (
              <li key={i} className="flex gap-2">
                <span className="font-mono text-xs text-accent">B{i + 1}</span>
                <span>{mp.text}</span>
                <span className="ml-auto font-mono text-xs text-ink/50">[{mp.marks}]</span>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={() => {
                resolveCurrent()
                advance({ done: stats.done + 1, ok: stats.ok + 1, resolved: stats.resolved + 1 })
              }}
              className="rounded-md border border-emerald-500 px-3 py-1.5 text-xs font-medium text-emerald-500 hover:bg-emerald-500/10"
            >
              <T value={VOCAB.reviewGotIt} />
            </button>
            <button
              type="button"
              onClick={() => advance({ done: stats.done + 1, ok: stats.ok, resolved: stats.resolved })}
              className="rounded-md border border-line px-3 py-1.5 text-xs text-ink/70 hover:bg-white/10"
            >
              <T value={VOCAB.reviewStillUnsure} />
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setSchemeShown(true)}
          className="mt-4 rounded-md border border-line px-3 py-1.5 text-xs text-ink/70 hover:bg-white/10"
        >
          <T value={VOCAB.reviewShowScheme} />
        </button>
      )}

      {picked !== null && !isCorrect && (
        <div className="mt-3">
          <p className="text-sm text-rose-500" data-zh>
            <T value={VOCAB.reviewWrong} />
          </p>
          <button
            type="button"
            onClick={() => setTutorOpen((o) => !o)}
            className="mt-2 text-sm text-accent hover:underline"
          >
            {tutorOpen ? '✕ Close AI tutor' : '✨ Ask the AI tutor'}
          </button>
          {tutorOpen && <TutorPanel mode="explain" question={q} onClose={() => setTutorOpen(false)} />}
        </div>
      )}
    </div>
  )
}

/** Build the redo queue: open mistakes, in recency order, questions resolvable from the index. */
export function buildReviewQueue(
  open: Mistake[],
  lookup: Record<string, { question: Question; subject: string; slug: string }>,
): ReviewQuestion[] {
  return open.flatMap((m) => {
    const hit = lookup[m.questionId]
    if (!hit) return []
    return [{ question: hit.question, subject: hit.subject, slug: hit.slug }]
  })
}

export function useReviewQueue(open: Mistake[], lookup: Record<string, { question: Question; subject: string; slug: string }>) {
  return useMemo(() => buildReviewQueue(open, lookup), [open, lookup])
}
