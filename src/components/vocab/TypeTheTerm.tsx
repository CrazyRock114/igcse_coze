/**
 * Type-the-term game.
 *
 * Shows the English definition of a term and asks the student to type
 * the term. Harder than multiple choice because there's no clue in the
 * distractors; this is the mode that actually builds retrieval strength.
 *
 * Per-question flow:
 *   1. Show a definition + a text input.
 *   2. Student types, presses Enter or "Check".
 *   3. On correct: XP + 10, advance, brief green flash.
 *   4. On wrong: shake the input, show the answer in red. The word is
 *      re-queued at the back of the round so the student sees it again
 *      before the round ends.
 *   5. Round ends when every term in the round has been answered right
 *      at least once, or the student quits.
 */
import { useMemo, useState } from 'react'
import { T } from '@/components/i18n/T'
import { useWordBank } from '@/lib/useVocab'
import { recordReview, useStreak, streakLabel } from '@/lib/useStreak'
import { VOCAB } from '@/lib/vocabStrings'
import { assetUrl } from '@/lib/assetUrl'
import { SpeakButton } from './SpeakButton'
import type { Term } from '@/content/types'
import type { ConceptEnrichment } from '@/lib/vocabTypes'
import type { VocabScope } from '@/pages/VocabPage'

const ROUND_SIZE = 6

function normalise(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '').trim()
}

export function TypeTheTerm({
  resolve,
  pool,
  scope,
}: {
  resolve: (termId: string, subject: string, slug: string) => { term: Term; enrichment?: ConceptEnrichment } | null
  pool: Array<{ term: Term }>
  scope?: VocabScope
}) {
  const { words, assess } = useWordBank()
  const streak = useStreak()
  const scopedPool = useMemo(() => {
    if (!scope) return pool
    return pool // pool is already filtered by VocabPage
  }, [pool, scope])
  const scopedWords = useMemo(() => {
    if (!scope) return words
    return words.filter((w) => {
      if (scope.subject !== 'all' && w.subject !== scope.subject) return false
      if (scope.slug !== 'all' && w.slug !== scope.slug) return false
      return true
    })
  }, [words, scope])
  const [round, setRound] = useState(() => makeRound(scopedPool, scopedWords, ROUND_SIZE))
  const [idx, setIdx] = useState(0)
  const [input, setInput] = useState('')
  const [feedback, setFeedback] = useState<'right' | 'wrong' | null>(null)
  const [correctCount, setCorrectCount] = useState(0)
  const [wrongIds, setWrongIds] = useState<Set<string>>(new Set())
  const [done, setDone] = useState(false)

  const queue = useMemo(() => round.terms, [round])
  const current = queue[idx]
  // Look up the bank entry for `current` so we can pass real subject/slug
  // to resolve(). The previous code passed '' for both, which made
  // VocabPage's resolve always return null (its lookup is
  // `lessons.find(l => l.subject === subj && l.slug === slg)` — empty
  // strings never match). That null short-circuited the early-return
  // guard below, so the game opened straight into the "round done"
  // screen and Play again couldn't recover. Round terms are built
  // from scopedWords so the bank entry is guaranteed to exist.
  const bankEntry = current ? scopedWords.find((w) => w.termId === current.en) : undefined
  const currentResolved =
    current && bankEntry ? resolve(current.en, bankEntry.subject, bankEntry.slug) : null

  if (queue.length < 2) {
    return (
      <p className="rounded-lg border border-dashed border-line bg-canvas p-6 text-center text-sm text-muted">
        <T value={VOCAB.gameEmpty} />
      </p>
    )
  }

  // We used to gate on `!currentResolved` here, but enrichment is optional
  // (some terms have no image, some have no enrichment at all). The render
  // already uses `currentResolved?.enrichment?.image` so a null enrichment
  // just hides the image; we still want to show the term definition and
  // the input. The only true "round done" condition is the boolean `done`.
  if (done) {
    return (
      <div className="rounded-xl border border-teal-600 bg-teal-50 p-6 text-center">
        <h3 className="text-lg font-semibold text-ink">
          <T value={VOCAB.gameRoundOver} />
        </h3>
        <p className="mt-1 text-sm text-ink-soft">
          {correctCount} / {queue.length} · 🔥 {streakLabel(streak)}
        </p>
        <button
          type="button"
          onClick={() => {
            setRound(makeRound(scopedPool, scopedWords, ROUND_SIZE))
            setIdx(0)
            setInput('')
            setFeedback(null)
            setCorrectCount(0)
            setWrongIds(new Set())
            setDone(false)
          }}
          className="mt-3 rounded-md bg-ink px-3 py-1.5 text-sm font-medium text-white hover:opacity-90"
        >
          <T value={VOCAB.gamePlayAgain} />
        </button>
      </div>
    )
  }

  // After the early returns above, queue has at least 2 terms, but
  // `current` could still be undefined if `idx` ever goes out of range
  // (defensive — should not happen given how `advance` keeps idx in
  // bounds, but we don't want a runtime crash). Render nothing rather
  // than the round-done screen, because no real round is done.
  if (!current) return null

  const check = () => {
    if (!input.trim()) return
    const isRight = normalise(input) === normalise(current.en)
    if (isRight) {
      setFeedback('right')
      setCorrectCount((c) => c + 1)
      // Mark the word as a success in the SRS — this counts as a "know".
      const bankEntry = scopedWords.find((w) => w.termId === current.en)
      if (bankEntry) {
        assess(bankEntry.termId, 'know')
        recordReview('know')
      }
      setTimeout(() => {
        setFeedback(null)
        setInput('')
        advance()
      }, 700)
    } else {
      setFeedback('wrong')
      setWrongIds((s) => new Set(s).add(current.en))
      // Mark the word as a fail in the SRS — this counts as a "dont".
      const bankEntry = scopedWords.find((w) => w.termId === current.en)
      if (bankEntry) {
        assess(bankEntry.termId, 'dont')
        recordReview('dont')
      }
      setTimeout(() => setFeedback(null), 1200)
    }
  }

  const advance = () => {
    // If the round has any unresolved wrongs, jump to the next wrong;
    // otherwise advance normally.
    const nextWrongIdx = (() => {
      for (let i = idx + 1; i < queue.length; i++) {
        if (wrongIds.has(queue[i]!.en) && queue[i]!.en !== current.en) return i
      }
      // If we're at the end, wrap and look from start
      for (let i = 0; i < idx; i++) {
        if (wrongIds.has(queue[i]!.en)) return i
      }
      return -1
    })()
    if (nextWrongIdx === -1) {
      setDone(true)
    } else {
      setIdx(nextWrongIdx)
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs text-muted">
        <span>
          <T value={VOCAB.gameScore} />:{' '}
          <span className="font-mono text-emerald-700">{correctCount}</span> / {queue.length}
        </span>
        <span>
          🔥 <span className="font-mono text-ink">{streakLabel(streak)}</span>
        </span>
      </div>

      <div className="rounded-xl border border-line bg-surface p-4">
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm text-ink-soft">
            <T value={VOCAB.gameTypePrompt} />
          </p>
          <SpeakButton text={current.en} />
        </div>
        <p className="mt-2 text-base text-ink">
          <T value={current.definition} />
        </p>
        {currentResolved?.enrichment?.image && (
          <img
            src={assetUrl(currentResolved.enrichment.image)}
            alt={current.en}
            className="mx-auto mt-3 h-28 w-full max-w-md rounded object-cover"
          />
        )}
        {current.zh && (
          <p className="mt-2 text-xs text-muted">
            {current.zh}
          </p>
        )}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') check()
          }}
          placeholder={VOCAB.gameTypePlaceholder.en}
          autoFocus
          className={
            'flex-1 rounded-md border bg-canvas px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-teal-500 ' +
            (feedback === 'right'
              ? 'border-emerald-500 bg-emerald-50'
              : feedback === 'wrong'
              ? 'border-rose-500 bg-rose-50'
              : 'border-line')
          }
        />
        <button
          type="button"
          onClick={check}
          disabled={!input.trim()}
          className="rounded-md bg-ink px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-40"
        >
          <T value={VOCAB.gameCheck} />
        </button>
      </div>

      {feedback === 'wrong' && (
        <p className="rounded-md border border-rose-300 bg-rose-50 p-2 text-center text-xs text-rose-800">
          <T value={VOCAB.gameWrong} /> <span className="font-mono">{current.en}</span>
        </p>
      )}
    </div>
  )
}

interface Round {
  terms: Term[]
}

function makeRound(pool: Array<{ term: Term }>, words: import('@/lib/vocabTypes').WordEntry[], size: number): Round {
  // Prefer the user's today-queue (SRS-prioritised) terms, then fall back
  // to the wider pool. Drop entries that aren't in the pool (defensive).
  const poolByEn = new Map(pool.map((p) => [p.term.en, p.term]))
  const inBank = new Set(words.filter((w) => w.status !== 'known').map((w) => w.termId))
  const candidates: Term[] = []
  for (const w of words) {
    if (!inBank.has(w.termId)) continue
    const t = poolByEn.get(w.termId)
    if (t) candidates.push(t)
  }
  if (candidates.length < size) {
    // top up from the pool
    for (const p of pool) {
      if (candidates.length >= size) break
      if (!candidates.find((c) => c.en === p.term.en)) candidates.push(p.term)
    }
  }
  // shuffle and take
  const a = [...candidates].slice(0, size)
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j]!, a[i]!]
  }
  return { terms: a }
}
