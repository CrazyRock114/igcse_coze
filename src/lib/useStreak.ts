/**
 * `useStreak` — live streak value, kept in sync with localStorage.
 *
 * Wraps `useSyncExternalStore` so multiple components share one
 * subscription rather than each opening its own storage read on
 * render. The subscription is to a custom event ('vocab:streak-changed')
 * that `recordReview` fires after a write, so the streak chip on the
 * page updates immediately when the user reviews a card.
 */
import { useSyncExternalStore } from 'react'
import { readStreak, recordReview, streakLabel } from './streak'
import type { StreakRecord } from './streak'

const EVENT = 'vocab:streak-changed'

function subscribe(cb: () => void): () => void {
  if (typeof window === 'undefined') return () => {}
  window.addEventListener(EVENT, cb)
  return () => window.removeEventListener(EVENT, cb)
}

function getSnapshot(): StreakRecord {
  return readStreak()
}

function getServerSnapshot(): StreakRecord {
  return { current: 0, longest: 0, xp: 0, lastReviewDay: '' }
}

export function useStreak(): StreakRecord {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

/** Re-export recordReview so callers can do `import { useStreak, recordReview } from ...`. */
export { recordReview, streakLabel }
export type { StreakRecord }
