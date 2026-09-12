import { useState } from 'react'
import { useParams } from 'react-router-dom'
import type { Question } from '@/content/types'
import { commandWordByName } from '@/content/syllabus/command-words'
import { T } from '@/components/i18n/T'
import { mistakeStore } from '@/lib/mistakeStore'
import { progressStore } from '@/lib/progressStore'

interface QuestionCardProps {
  question: Question
  index: number
  /** Syllabus statements this question covers. Drives the "Your progress" map. */
  relatedStatementIds?: string[]
}

/**
 * An exam-style question with its mark scheme.
 *
 * The stem is English-only by design — students must practise reading questions in
 * the language of the paper. The command word hint and the examiner's note are where
 * Chinese support lives, because those explain *how to answer*, not *what is asked*.
 */
export function QuestionCard({ question, index, relatedStatementIds }: QuestionCardProps) {
  const { subject, slug } = useParams<{ subject: string; slug: string }>()
  const [revealed, setRevealed] = useState(false)
  const [picked, setPicked] = useState<number | null>(null)
  const [hintOpen, setHintOpen] = useState(false)
  const [loggedAs, setLoggedAs] = useState<'right' | 'wrong' | null>(null)

  const cw = commandWordByName.get(question.commandWord)
  const isMcq = Array.isArray(question.options)

  const handlePick = (i: number) => {
    if (picked !== null) return
    setPicked(i)
    if (!isMcq || question.answerIndex === undefined || !subject || !slug) return
    const pickedText = question.options?.[i] ?? ''
    const correctText = question.options?.[question.answerIndex] ?? ''
    const stmtIds = relatedStatementIds ?? []
    if (i === question.answerIndex) {
      mistakeStore.markResolved(question.id)
      setLoggedAs('right')
      if (stmtIds.length > 0) progressStore.recordAttempt(subject, stmtIds)
    } else {
      mistakeStore.log({
        questionId: question.id,
        subject,
        slug,
        pickedIndex: i,
        pickedText,
        correctIndex: question.answerIndex,
        correctText,
      })
      setLoggedAs('wrong')
      if (stmtIds.length > 0) progressStore.recordWrong(subject, stmtIds)
    }
    window.dispatchEvent(new Event('igcse:vocab-changed'))
  }

  const handleMarkResolved = () => {
    mistakeStore.markResolved(question.id)
    setLoggedAs('right')
    window.dispatchEvent(new Event('igcse:vocab-changed'))
  }

  return (
    <li className="rounded-xl border border-line bg-surface p-4">
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-muted">Q{index + 1}</span>

        <button
          type="button"
          onClick={() => setHintOpen((o) => !o)}
          aria-expanded={hintOpen}
          className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-900 hover:bg-amber-200"
        >
          {question.commandWord}
        </button>

        <span
          className={
            'rounded-full px-2 py-0.5 text-xs font-medium ' +
            (question.tier === 'extended'
              ? 'bg-violet-100 text-violet-800'
              : 'bg-teal-100 text-teal-800')
          }
        >
          {question.tier === 'extended' ? 'Extended' : 'Core'}
        </span>

        <span className="ml-auto text-xs text-muted">
          [{question.marks} mark{question.marks === 1 ? '' : 's'}]
        </span>
      </div>

      {hintOpen && cw && (
        <div className="mb-3 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm">
          <p className="font-medium text-amber-950">
            <T value={cw.meaning} />
          </p>
          <p className="mt-1 text-amber-900">
            <T value={cw.advice} />
          </p>
        </div>
      )}

      {/* English only — this is exam text. */}
      <p className="text-ink">{question.stem}</p>

      {isMcq && (
        <ul className="mt-3 space-y-1.5">
          {question.options!.map((opt, i) => {
            const isAnswer = i === question.answerIndex
            const chosen = picked === i
            const show = revealed || picked !== null
            return (
              <li key={i}>
                <button
                  type="button"
                  disabled={picked !== null}
                  onClick={() => handlePick(i)}
                  className={
                    'w-full rounded-lg border px-3 py-2 text-left text-sm transition-colors ' +
                    (show && isAnswer
                      ? 'border-teal-500 bg-teal-50 text-teal-900'
                      : show && chosen
                        ? 'border-rose-400 bg-rose-50 text-rose-900'
                        : 'border-line hover:bg-canvas disabled:hover:bg-transparent')
                  }
                >
                  <span className="mr-2 font-semibold">{'ABCD'[i]}</span>
                  {opt}
                </button>
              </li>
            )
          })}
        </ul>
      )}

      <button
        type="button"
        onClick={() => setRevealed((r) => !r)}
        className="mt-3 text-sm font-medium text-accent hover:underline"
      >
        {revealed ? 'Hide mark scheme' : 'Show mark scheme'}
      </button>

      {picked !== null && loggedAs === 'wrong' && (
        <div className="mt-2 flex items-center gap-2 rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-900">
          <span>✗ Logged to your mistake list.</span>
          <button
            type="button"
            onClick={handleMarkResolved}
            className="ml-auto rounded-md border border-rose-300 bg-white px-2 py-0.5 text-xs font-medium text-rose-700 hover:bg-rose-100"
          >
            Mark as resolved
          </button>
        </div>
      )}

      {picked !== null && loggedAs === 'right' && (
        <p className="mt-2 rounded-md border border-teal-200 bg-teal-50 px-3 py-2 text-sm text-teal-900">
          ✓ Correct — removed from your mistake list.
        </p>
      )}

      {revealed && (
        <div className="mt-2 rounded-lg border border-line bg-canvas p-3">
          <p className="mb-1.5 text-xs font-semibold tracking-wide text-muted uppercase">
            Mark scheme
          </p>
          <ul className="space-y-1.5 text-sm">
            {question.markScheme.map((m, i) => (
              <li key={i} className="flex gap-2">
                <span className="shrink-0 font-mono text-xs text-teal-700">[{m.marks}]</span>
                <span>
                  {m.text}
                  {m.alternatives?.length ? (
                    <span className="text-muted"> — or {m.alternatives.join(' / ')}</span>
                  ) : null}
                </span>
              </li>
            ))}
          </ul>

          {question.examinerNote && (
            <div className="mt-3 border-t border-line pt-2 text-sm text-ink-soft">
              <span className="font-semibold">Examiner’s note. </span>
              <T value={question.examinerNote} />
            </div>
          )}
        </div>
      )}
    </li>
  )
}
