/**
 * React binding for the vocab store.
 *
 * Subscribes to the localStorage `storage` event so two open tabs stay in
 * sync, and exposes a `mutate` helper that wraps a store call and bumps a
 * version counter so components re-render. No external state library —
 * the store is small enough that one number is enough.
 */

import { useCallback, useEffect, useState } from 'react'
import { vocabStore } from './vocabStore'
import type { StudyStatus, WordEntry } from './vocabTypes'
import { buildTodayQueue, computeStats, nextSchedule } from './srs'
import type { Assessment, VocabStats } from './srs'

export function useWordBank() {
  const [version, setVersion] = useState(0)
  const [words, setWords] = useState<WordEntry[]>(() => vocabStore.list())

  const refresh = useCallback(() => {
    setWords(vocabStore.list())
    setVersion((v) => v + 1)
  }, [])

  // Cross-tab sync: another tab writes, this one re-reads.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key && e.key.startsWith('igcse.vocab')) refresh()
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [refresh])

  const add = useCallback(
    (termId: string, subject: string, slug: string) => {
      vocabStore.add({ termId, subject, slug })
      refresh()
    },
    [refresh]
  )

  const remove = useCallback(
    (termId: string) => {
      vocabStore.remove(termId)
      refresh()
    },
    [refresh]
  )

  /**
   * Self-assessment with the SM-2 lite algorithm. Replaces the old
   * `setStatus` — callers now pass the assessment directly; we map
   * "know" → known, "dont" → new, "unsure" → unchanged-or-learning, and
   * also update interval/ease/repetitions/lapses/nextDue.
   */
  const assess = useCallback(
    (termId: string, assessment: Assessment) => {
      const w = words.find((x) => x.termId === termId)
      if (!w) return
      const now = Date.now()
      const sched = nextSchedule(w, assessment, now)
      const nextStatus: StudyStatus =
        assessment === 'know' ? 'known' : assessment === 'dont' ? 'new' : w.status === 'new' ? 'learning' : w.status
      vocabStore.update(termId, {
        status: nextStatus,
        lastReviewed: now,
        reviewCount: w.reviewCount + 1,
        ...sched,
      })
      refresh()
    },
    [refresh, words]
  )

  /**
   * Status override without re-running SRS — used by the word bank
   * "Mark known / learning" buttons where the user wants to set a label
   * without an assessment.
   */
  const setStatus = useCallback(
    (termId: string, status: StudyStatus) => {
      vocabStore.update(termId, { status })
      refresh()
    },
    [refresh]
  )

  const setNote = useCallback(
    (termId: string, note: string) => {
      vocabStore.update(termId, { note })
      refresh()
    },
    [refresh]
  )

  const ensure = useCallback(
    (terms: Array<{ termId: string; subject: string; slug: string }>) => {
      vocabStore.ensureMany(terms)
      refresh()
    },
    [refresh]
  )

  // Derived selectors
  const todayQueue = buildTodayQueue(words)
  const stats = computeStats(words)

  return {
    words,
    version,
    add,
    remove,
    setStatus,
    setNote,
    assess,
    ensure,
    refresh,
    todayQueue,
    stats,
  }
}

/** Selector helpers — pure, no React, so they can be reused in tests. */
export function groupByStatus(words: WordEntry[]): Record<StudyStatus, WordEntry[]> {
  const out: Record<StudyStatus, WordEntry[]> = { new: [], learning: [], known: [] }
  for (const w of words) out[w.status].push(w)
  return out
}

/**
 * The flat "due" pool. Used by the study-mode shuffle and the games'
 * queue. Anything in `todayQueue` plus any word the user has marked
 * known but whose `nextDue` is past.
 */
export function dueForReview(words: WordEntry[], now = Date.now()): WordEntry[] {
  return words.filter((w) => {
    if (w.nextDue === 0) return true
    return w.nextDue <= now
  })
}

// Re-export SRS helpers for tests
export { buildTodayQueue, computeStats, nextSchedule }
export type { Assessment, VocabStats }
