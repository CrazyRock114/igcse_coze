import { useMemo, useState } from 'react'
import { T } from '@/components/i18n/T'
import { useWordBank } from '@/lib/useVocab'
import { recordReview, useStreak, streakLabel } from '@/lib/useStreak'
import { VOCAB } from '@/lib/vocabStrings'
import { assetUrl } from '@/lib/assetUrl'
import { SpeakButton } from './SpeakButton'
import type { Term } from '@/content/types'
import type { ConceptEnrichment } from '@/lib/vocabTypes'

/**
 * Multiple-choice game using the student's word bank.
 *
 * The card shows an English term; the four options are four random terms
 * from the bank (one correct).
 *
 * Design (after user feedback — see the commit message for 1adb50f's
 * successor): the game is now a navigable history, not a runaway counter.
 *
 *   - Each attempt is recorded as a HistoryEntry { correct, options, picked,
 *     isRight, shuffledKey }.
 *   - `idx` points into that history. The user can step prev/next with
 *     explicit buttons.
 *   - A wrong answer STAYS on the same entry (does not advance) and
 *     flashes the correct option in green so the student can read the
 *     right answer before clicking Next. A right answer auto-advances
 *     after a short pause so the flow still feels snappy.
 *   - Round ends when the user has answered every term in the queue at
 *     least once. From there a "Play again" card mirrors the other
 *     games' end-of-round UI.
 *   - Score and streak are derived from the history, so they always
 *     reflect what the user actually did — no more silent reset when
 *     `assess()` filters a word out of the queue.
 *
 * Shuffling still lives in `useBuildOptions`, whose lazy useState runs
 * once per mount. Each HistoryEntry carries a `shuffledKey` so changing
 * entry remounts the option card with a fresh shuffle.
 */
export function WordGame({
  resolve,
  pool,
}: {
  resolve: (termId: string, subject: string, slug: string) => { term: Term; enrichment?: ConceptEnrichment } | null
  /** All terms across all lessons — needed to build distractors. */
  pool: Array<{ term: Term }>
}) {
  const { words, assess } = useWordBank()
  const dayStreak = useStreak()

  // The queue: the user's bank resolved to terms, with terms the user
  // has marked 'known' filtered out. Frozen for the life of the round
  // — once the round starts, an in-game "know" assessment does not
  // change which terms the round contains. Otherwise the user could
  // answer a question, see the score flash, then watch the term
  // disappear from the queue and the game restart on the next tick.
  const queue = useMemo(() => {
    const inBank = new Set(words.filter((w) => w.status !== 'known').map((w) => w.termId))
    return pool.filter((p) => inBank.has(p.term.en))
  }, [words, pool])

  type HistoryEntry = {
    correct: Term
    /** Options actually shown, in the order the user saw them. */
    options: Term[]
    /** The user's pick, or null if not answered yet. */
    picked: Term | null
    isRight: boolean | null
    /** Stable per-entry id used as React key for the options card. */
    shuffledKey: string
  }

  // Lazily build the first entry from the queue. Subsequent entries
  // are appended on every answer; the user can step through them.
  const [history, setHistory] = useState<HistoryEntry[]>(() =>
    queue.length > 0 ? [buildEntry(queue, 0, words)] : []
  )
  const [idx, setIdx] = useState(0)
  // Right/wrong tally derived from history (no more parallel counters
  // that can drift from what the user actually saw on screen).
  const { score, streak, maxStreak } = useMemo(() => {
    let r = 0
    let w = 0
    let s = 0
    let max = 0
    for (const e of history) {
      if (e.picked === null) continue
      if (e.isRight) {
        r++
        s++
        if (s > max) max = s
      } else {
        w++
        s = 0
      }
    }
    return { score: { right: r, wrong: w }, streak: s, maxStreak: max }
  }, [history])

  // Round is "done" once the user has answered every term in the queue
  // at least once AND has moved past the last entry. We don't end on
  // the last pick — we end when the user clicks Next past the last
  // answered entry, so they get to see the result of their last answer
  // before the round-over card shows up.
  const answeredCount = history.filter((e) => e.picked !== null).length
  const roundComplete = answeredCount >= queue.length && idx >= history.length - 1 && history.length > 0
  const isPlaying = !roundComplete && history.length > 0 && idx < history.length

  if (queue.length < 2) {
    return (
      <p className="rounded-lg border border-dashed border-line bg-canvas p-6 text-center text-sm text-muted">
        <T value={VOCAB.gameEmpty} />
      </p>
    )
  }

  if (roundComplete) {
    return (
      <div className="rounded-xl border border-teal-600 bg-teal-50 p-6 text-center">
        <h3 className="text-lg font-semibold text-ink">
          <T value={VOCAB.gameRoundOver} />
        </h3>
        <p className="mt-1 text-sm text-ink-soft">
          {score.right} / {queue.length} · 🔥 {streakLabel(dayStreak)}
        </p>
        <p className="mt-0.5 text-xs text-ink-soft">
          <T value={VOCAB.gameStreak} />: {maxStreak}
        </p>
        <button
          type="button"
          onClick={() => {
            // Rebuild the queue from the *current* bank (so terms the
            // user just marked 'known' are excluded) and start a fresh
            // history.
            const inBank = new Set(words.filter((w) => w.status !== 'known').map((w) => w.termId))
            const next = pool.filter((p) => inBank.has(p.term.en))
            setHistory(next.length > 0 ? [buildEntry(next, 0, words)] : [])
            setIdx(0)
          }}
          className="mt-3 rounded-md bg-ink px-3 py-1.5 text-sm font-medium text-white hover:opacity-90"
        >
          <T value={VOCAB.gamePlayAgain} />
        </button>
      </div>
    )
  }

  const current = history[idx]!
  const correctWithMeta = resolve(current.correct.en, '', '')

  const onAnswer = (t: Term) => {
    // No-op if the user has already answered this entry — they should
    // use Next to move on. Otherwise re-clicking the same wrong option
    // would double-count the SRS assessment and the score.
    if (current.picked !== null) return
    const isRight = t.en === current.correct.en

    setHistory((prev) => {
      const next = prev.slice()
      next[idx] = { ...current, picked: t, isRight }
      return next
    })

    // Drive the SRS exactly once per answered entry. The bank entry
    // lookup is best-effort — if a term was removed from the bank
    // between round start and now, we still want to record the streak.
    const bankEntry = words.find((w) => w.termId === current.correct.en)
    if (bankEntry) {
      assess(bankEntry.termId, isRight ? 'know' : 'dont')
      recordReview(isRight ? 'know' : 'dont')
    } else {
      // Even without a bank row, the daily-streak chip cares about
      // every review action.
      recordReview(isRight ? 'know' : 'dont')
    }
  }

  const onNext = () => {
    // If the user is at the last answered entry and there's still an
    // unanswered term in the queue, append a fresh entry and move to
    // it. Otherwise, just step forward in the history (lets them
    // re-read their last answer).
    if (idx === history.length - 1 && current.picked !== null) {
      const lastAnsweredCorrectEn = current.correct.en
      const answeredEns = new Set(
        history.filter((e) => e.picked !== null).map((e) => e.correct.en)
      )
      const nextTerm = queue.find(
        (p) => !answeredEns.has(p.term.en)
      )
      if (nextTerm) {
        setHistory((prev) => [
          ...prev,
          buildEntry(queue, prev.length, words, lastAnsweredCorrectEn),
        ])
        setIdx(history.length) // idx of the new tail entry
        return
      }
    }
    setIdx((i) => Math.min(i + 1, history.length - 1))
  }

  const onPrev = () => {
    setIdx((i) => Math.max(0, i - 1))
  }

  return (
    <div className="space-y-3">
      <div className="flex items-baseline justify-between text-xs text-muted">
        <span>
          <T value={VOCAB.gameScore} />:{' '}
          <span className="font-mono text-emerald-700">{score.right}</span> /{' '}
          <span className="font-mono text-rose-700">{score.wrong}</span>
        </span>
        <span>
          🔥 <span className="font-mono text-ink">{streakLabel(dayStreak)}</span> ·{' '}
          <T value={VOCAB.gameStreak} />:{' '}
          <span className="font-mono text-ink">{streak}</span>
        </span>
      </div>

      {/* Question counter — lets the user know where they are in the
         round and how many terms are left. */}
      <div className="text-[10px] uppercase tracking-wide text-muted">
        Question {idx + 1} / {queue.length}
      </div>

      {correctWithMeta?.enrichment?.image && (
        <img
          src={assetUrl(correctWithMeta.enrichment.image)}
          alt={current.correct.en}
          className="mx-auto h-32 w-full max-w-md rounded object-cover"
        />
      )}
      <div className="flex items-center justify-center gap-2">
        <p className="text-center text-lg font-semibold text-ink">
          <T value={VOCAB.gamePrompt} />:{' '}
          <span className="text-teal-700">
            <T value={{ en: current.correct.en, zh: current.correct.zh }} />
          </span>
        </p>
        <SpeakButton text={current.correct.en} />
      </div>

      <QuestionCard
        // Key on the entry's stable shuffledKey so a different entry
        // remounts the options card with a fresh shuffle, but going
        // back to the same entry shows the same options in the same
        // places (so the user can re-read what they picked).
        key={current.shuffledKey}
        options={current.options}
        correct={current.correct}
        pickedEn={current.picked?.en ?? null}
        pickedIsRight={current.isRight}
        onAnswer={onAnswer}
        isPlaying={isPlaying}
      />

      {/* Feedback + navigation. Stays on the same entry after a wrong
         answer so the user can read the correction. The "Next" button
         is the only way to move forward. */}
      {current.picked !== null && (
        <div className="space-y-2">
          <p
            className={
              'rounded-md border p-2 text-center text-xs ' +
              (current.isRight
                ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                : 'border-rose-500 bg-rose-50 text-rose-800')
            }
          >
            <T value={current.isRight ? VOCAB.gameRight : VOCAB.gameWrong} />
            {!current.isRight && (
              <>
                {' '}
                ·{' '}
                <span className="font-mono font-semibold text-ink">
                  {current.correct.en}
                </span>
              </>
            )}
          </p>
          <div className="flex items-center justify-between gap-2 text-xs">
            <button
              type="button"
              onClick={onPrev}
              disabled={idx === 0}
              className="rounded-md border border-line bg-surface px-3 py-1.5 text-ink hover:border-teal-500 hover:text-teal-700 disabled:opacity-30"
            >
              ← <T value={VOCAB.gamePrev} />
            </button>
            <span className="text-muted">
              {idx + 1} / {queue.length}
            </span>
            <button
              type="button"
              onClick={onNext}
              className="rounded-md border border-teal-600 bg-teal-600 px-3 py-1.5 font-medium text-white hover:opacity-90"
            >
              <T value={VOCAB.gameNext} /> →
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

/**
 * Build one history entry — pick the correct term, shuffle 3
 * distractors, and produce a stable per-entry key for React.
 *
 * `excludeTermEn` lets the next entry avoid showing the same correct
 * term twice in a row if the queue has at least 2 distinct terms.
 */
function buildEntry(
  queue: Array<{ term: Term }>,
  entryIndex: number,
  _words: ReadonlyArray<{ termId: string }>,
  excludeTermEn?: string
): {
  correct: Term
  options: Term[]
  picked: Term | null
  isRight: boolean | null
  shuffledKey: string
} {
  // Choose the correct term. Skip `excludeTermEn` if there is at least
  // one other term available, so the next question isn't a repeat.
  const candidates = queue
    .map((p) => p.term)
    .filter((t) => (excludeTermEn ? t.en !== excludeTermEn : true))
  const pool = candidates.length > 0 ? candidates : queue.map((p) => p.term)
  const correct = pool[Math.floor(Math.random() * pool.length)]!

  // Pick 3 distractors from anything in the broader pool that isn't the
  // correct term. We use the original `queue` for distractors so the
  // game has enough variety even when the filtered `pool` is tiny.
  const allTerms = queue.map((p) => p.term)
  const others = allTerms.filter((t) => t.en !== correct.en)
  for (let i = others.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[others[i], others[j]] = [others[j]!, others[i]!]
  }
  const distractorTerms = others.slice(0, 3)

  const options = [...distractorTerms, correct]
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[options[i], options[j]] = [options[j]!, options[i]!]
  }

  return {
    correct,
    options,
    picked: null,
    isRight: null,
    // Stable per-entry key — built from entry index and a random
    // suffix so two entries never collide.
    shuffledKey: `${entryIndex}-${Math.random().toString(36).slice(2, 8)}`,
  }
}

/**
 * The 4-option card. Owns the shuffle (already done in buildEntry;
 * the parent supplies the options array, this component just renders).
 *
 * Visual states:
 *   - Unanswered: all four options look the same; the user's pick
 *     highlights in either emerald (right) or rose (wrong), and the
 *     right answer is also revealed in green after a wrong pick.
 *   - Answered: the picked option's colour is locked; the user must
 *     click Next to advance.
 */
function QuestionCard({
  options,
  correct,
  pickedEn,
  pickedIsRight,
  onAnswer,
  isPlaying,
}: {
  options: Term[]
  correct: Term
  pickedEn: string | null
  pickedIsRight: boolean | null
  onAnswer: (t: Term) => void
  isPlaying: boolean
}) {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {options.map((t) => {
        const isPicked = pickedEn === t.en
        const isCorrect = t.en === correct.en
        // Show the correct answer in green after any answer (right or
        // wrong) so the student always knows what the answer was.
        const revealed = pickedEn !== null && isCorrect
        return (
          <button
            key={t.en}
            type="button"
            onClick={() => onAnswer(t)}
            disabled={!isPlaying || pickedEn !== null}
            className={
              'rounded-lg border bg-surface p-3 text-left text-sm text-ink-soft transition-colors ' +
              (revealed
                ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
                : isPicked
                ? pickedIsRight
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
                  : 'border-rose-500 bg-rose-50 text-rose-900'
                : 'border-line hover:border-teal-500 hover:bg-canvas')
            }
          >
            <T
              value={{
                en: t.definition.en,
                zh: t.definition.zh ?? '',
              }}
            />
          </button>
        )
      })}
    </div>
  )
}
