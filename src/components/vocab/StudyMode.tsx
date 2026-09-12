import { useMemo, useState } from 'react'
import { T } from '@/components/i18n/T'
import type { WordEntry } from '@/lib/vocabTypes'
import { dueForReview, useWordBank } from '@/lib/useVocab'
import { VOCAB } from '@/lib/vocabStrings'
import { recordReview, useStreak, streakLabel } from '@/lib/useStreak'
import { SpeakButton } from './SpeakButton'
import { RelatedChips } from './RelatedChips'

/**
 * Card-flip study mode.
 *
 * The queue is the user's word bank filtered by SRS: anything whose
 * `nextDue` is past or never scheduled. Today the queue is shuffled and
 * presented one at a time. Three self-assessment buttons (know / unsure /
 * don't know) feed the SM-2 lite scheduler (see `lib/srs.ts`).
 *
 * The session is keyed on the bank hash so any add/remove/status change
 * forces a fresh shuffle. A child owns the shuffle (lazy useState) so
 * the parent never calls `Math.random` during render or setState in
 * an effect.
 */
export function StudyMode({
  resolve,
  scope,
}: {
  resolve: (termId: string, subject: string, slug: string) => { term: import('@/content/types').Term; enrichment?: import('@/lib/vocabTypes').ConceptEnrichment } | null
  scope?: import('@/pages/VocabPage').VocabScope
}) {
  const { words, todayQueue, stats } = useWordBank()
  const streak = useStreak()

  const filtered = useMemo(() => {
    if (!scope) return words
    return words.filter((w) => {
      if (scope.subject !== 'all' && w.subject !== scope.subject) return false
      if (scope.slug !== 'all' && w.slug !== scope.slug) return false
      return true
    })
  }, [words, scope])

  const due = useMemo(() => dueForReview(filtered), [filtered])
  const filteredTodayQueue = useMemo(() => {
    if (!scope) return todayQueue
    return todayQueue.filter((w) => {
      if (scope.subject !== 'all' && w.subject !== scope.subject) return false
      if (scope.slug !== 'all' && w.slug !== scope.slug) return false
      return true
    })
  }, [todayQueue, scope])

  if (due.length === 0) {
    return (
      <div className="space-y-3">
        <StreakHUD streak={streak} stats={stats} />
        <p className="rounded-lg border border-dashed border-line bg-canvas p-6 text-center text-sm text-muted">
          <T value={VOCAB.studyEmpty} />
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <StreakHUD streak={streak} stats={stats} />
      <Session
        // Hash the bank so any add/remove/status change forces a fresh shuffle.
        // A new session starts on the first card of the new queue.
        key={bankHash(filtered)}
        due={filteredTodayQueue.length > 0 ? filteredTodayQueue : due}
        resolve={resolve}
        onAssess={() => {
          /* streak subscription already updates via the event */
        }}
      />
    </div>
  )
}

function StreakHUD({
  streak,
  stats,
}: {
  streak: import('@/lib/streak').StreakRecord
  stats: ReturnType<typeof useWordBank>['stats']
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-line bg-canvas px-3 py-2 text-xs">
      <div className="flex flex-wrap items-center gap-3">
        <span className="font-mono text-base" title="Day streak (≥1 review per day)">
          🔥 <span className="text-ink">{streakLabel(streak)}</span>
        </span>
        <span className="text-muted">
          XP <span className="font-mono text-ink">{streak.xp}</span>
        </span>
        <span className="text-muted">
          Best <span className="font-mono text-ink">{streak.longest}</span>
        </span>
      </div>
      <div className="flex flex-wrap items-center gap-3 text-muted">
        <span>
          <T value={VOCAB.statDueToday} />{' '}
          <span className="font-mono text-ink">{stats.dueToday}</span>
        </span>
        <span>
          <T value={VOCAB.statKnown} />{' '}
          <span className="font-mono text-emerald-700">{stats.known}</span>
        </span>
        <span>
          <T value={VOCAB.statLapsed} />{' '}
          <span className="font-mono text-rose-700">{stats.lapsedCount}</span>
        </span>
      </div>
    </div>
  )
}

function bankHash(words: WordEntry[]): string {
  return words
    .map((w) => `${w.termId}:${w.status}:${w.nextDue}:${w.lapses}`)
    .sort()
    .join('|')
}

/**
 * One study session. Owns its own session counter and the shuffle (lazy
 * useState). Remounted by the parent via `key` when the word bank changes.
 */
function Session({
  due,
  resolve,
  onAssess,
}: {
  due: WordEntry[]
  resolve: (termId: string, subject: string, slug: string) => { term: import('@/content/types').Term; enrichment?: import('@/lib/vocabTypes').ConceptEnrichment } | null
  onAssess: () => void
}) {
  const { assess } = useWordBank()
  const [queue] = useState(() => {
    const a = [...due]
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[a[i], a[j]] = [a[j]!, a[i]!]
    }
    return a
  })
  const [idx, setIdx] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [session, setSession] = useState({ done: 0, right: 0, xp: 0 })
  const [done, setDone] = useState(false)

  if (done) {
    return (
      <div className="rounded-xl border border-teal-600 bg-teal-50 p-6 text-center">
        <h3 className="text-lg font-semibold text-ink">
          <T value={VOCAB.studyDone} />
        </h3>
        <p className="mt-1 text-sm text-ink-soft">
          {session.right}/{session.done} <T value={VOCAB.studyRight} /> · +{session.xp} XP
        </p>
        <button
          type="button"
          onClick={() => {
            setIdx(0)
            setFlipped(false)
            setSession({ done: 0, right: 0, xp: 0 })
            setDone(false)
          }}
          className="mt-3 rounded-md bg-ink px-3 py-1.5 text-sm font-medium text-white hover:opacity-90"
        >
          <T value={VOCAB.studyAgain} />
        </button>
      </div>
    )
  }

  const current = queue[idx]
  if (!current) return null
  const resolved = resolve(current.termId, current.subject, current.slug)
  if (!resolved) return null

  const xpFor = (a: 'know' | 'unsure' | 'dont') => (a === 'know' ? 10 : a === 'unsure' ? 5 : 2)

  const doAssess = (a: 'know' | 'unsure' | 'dont') => {
    assess(current.termId, a)
    recordReview(a)
    setSession((p) => ({ done: p.done + 1, right: p.right + (a === 'know' ? 1 : 0), xp: p.xp + xpFor(a) }))
    onAssess()
    setFlipped(false)
    if (idx + 1 >= queue.length) {
      setDone(true)
    } else {
      setIdx((i) => i + 1)
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs text-muted">
        <span>
          <T value={VOCAB.studyProgress} />{' '}
          <span className="font-mono text-ink">
            {Math.min(idx + 1, queue.length)} / {queue.length}
          </span>
        </span>
        {current.lapses > 0 && (
          <span className="rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-semibold text-rose-700">
            <T value={VOCAB.lapseBadge} params={{ count: String(current.lapses) }} />
          </span>
        )}
      </div>

      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        className="block w-full rounded-xl border border-line bg-surface p-4 text-left transition-colors hover:border-teal-500"
        aria-pressed={flipped}
      >
        <div className="flex items-center justify-between gap-2">
          <h3 className="flex-1 text-center text-2xl font-semibold text-ink">
            <T value={{ en: resolved.term.en, zh: resolved.term.zh }} />
          </h3>
          <SpeakButton text={resolved.term.en} />
        </div>
        {flipped ? (
          <div className="mt-3 space-y-2 border-t border-line pt-3">
            <p className="text-sm text-ink-soft">
              <T value={resolved.term.definition} />
            </p>
            {resolved.enrichment?.mechanism && (
              <p className="text-xs text-ink-soft">
                <strong className="text-muted">
                  <T value={VOCAB.mechanismTitle} />:{' '}
                </strong>
                <T value={resolved.enrichment.mechanism} />
              </p>
            )}
            {resolved.enrichment?.relatedTerms && resolved.enrichment.relatedTerms.length > 0 && (
              <RelatedChips
                termIds={resolved.enrichment.relatedTerms}
                current={resolved.term.en}
              />
            )}
          </div>
        ) : (
          <p className="mt-2 text-center text-xs text-muted">
            <T value={VOCAB.studyFlipHint} />
          </p>
        )}
      </button>

      {flipped && (
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => doAssess('dont')}
            className="rounded-md border border-line bg-surface px-2 py-2 text-xs text-ink-soft hover:border-rose-500 hover:text-rose-700"
          >
            <T value={VOCAB.dontKnow} />
            <span className="ml-1 text-[10px] text-muted">+2</span>
          </button>
          <button
            type="button"
            onClick={() => doAssess('unsure')}
            className="rounded-md border border-line bg-surface px-2 py-2 text-xs text-ink-soft hover:border-amber-500 hover:text-amber-700"
          >
            <T value={VOCAB.unsure} />
            <span className="ml-1 text-[10px] text-muted">+5</span>
          </button>
          <button
            type="button"
            onClick={() => doAssess('know')}
            className="rounded-md border border-line bg-surface px-2 py-2 text-xs text-ink-soft hover:border-emerald-500 hover:text-emerald-700"
          >
            <T value={VOCAB.know} />
            <span className="ml-1 text-[10px] text-muted">+10</span>
          </button>
        </div>
      )}
    </div>
  )
}
