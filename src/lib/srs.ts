/**
 * Spaced repetition — SM-2 lite scheduler.
 *
 * The "lite" version drops the binary quality scale and the per-card `EF`
 * normalisation that the full SM-2 has. We have only three self-assessments
 * from the user ("know", "unsure", "don't know"), and they map to a 5/3/1
 * quality score. The state per word is just four numbers: repetitions,
 * interval (in days), ease, and next-due. That's enough to space reviews
 * across days and weeks and to push hard-to-remember words back to the
 * front of the queue.
 *
 * Why SM-2 and not FSRS or Anki's modified scheduler? SM-2 is small enough
 * to keep in one file, has no per-user calibration step, and matches what
 * teachers tend to expect: a "first review tomorrow, then a week, then
 * scaled by ease". FSRS is more accurate but heavier; we can swap in
 * later without changing the public surface.
 *
 * Field summary on a WordEntry:
 *   `interval`     — days until next review. 0 means "new, review now".
 *   `ease`         — a multiplier for the interval, default 2.5. Drops on
 *                    a lapse, climbs on a success. Capped at 2.8, floored
 *                    at 1.3.
 *   `repetitions`  — consecutive correct reviews since the last lapse. 0
 *                    after a failure, 1 after the first success, etc.
 *   `lapses`       — total times the user has answered "don't know". Used
 *                    for the "still struggling" indicator.
 *   `nextDue`      — Unix ms timestamp of when the word should next
 *                    appear. 0 = new (no schedule yet).
 */

import type { WordEntry } from './vocabTypes'

export type Assessment = 'know' | 'unsure' | 'dont'

/** Map self-assessment to SM-2 quality score (0–5). */
export function qualityOf(a: Assessment): number {
  if (a === 'know') return 5
  if (a === 'unsure') return 3
  return 1
}

interface SrsFields {
  interval: number
  ease: number
  repetitions: number
  lapses: number
  nextDue: number
}

export const DEFAULT_SRS: SrsFields = {
  interval: 0,
  ease: 2.5,
  repetitions: 0,
  lapses: 0,
  nextDue: 0,
}

/**
 * Compute the next schedule after an assessment. Pure: takes the current
 * SRS state, returns the new state. The caller is responsible for
 * stamping `lastReviewed` and `reviewCount` and persisting the record.
 *
 * The full SM-2 formula is:
 *   if q < 3:  I = 1, n = 0
 *   else:      n += 1; I = n == 1 ? 1 : n == 2 ? 6 : round(I * EF)
 *   EF = max(1.3, EF + 0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
 */
export function nextSchedule(
  current: Pick<WordEntry, 'interval' | 'ease' | 'repetitions' | 'lapses'>,
  assessment: Assessment,
  now = Date.now()
): SrsFields {
  const q = qualityOf(assessment)
  const ease = clampEase(current.ease + 0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
  if (q < 3) {
    return {
      interval: 1,
      ease,
      repetitions: 0,
      lapses: current.lapses + (assessment === 'dont' ? 1 : 0),
      nextDue: now + 1 * DAY,
    }
  }
  const reps = current.repetitions + 1
  const interval =
    reps === 1 ? 1 : reps === 2 ? 6 : Math.max(1, Math.round(current.interval * ease))
  return {
    interval,
    ease,
    repetitions: reps,
    lapses: current.lapses,
    nextDue: now + interval * DAY,
  }
}

const DAY = 24 * 60 * 60 * 1000
const EASE_MIN = 1.3
const EASE_MAX = 2.8

function clampEase(ef: number): number {
  if (ef < EASE_MIN) return EASE_MIN
  if (ef > EASE_MAX) return EASE_MAX
  return Math.round(ef * 1000) / 1000
}

/** A word is "due now" if its next-due is in the past, or never scheduled. */
export function isDue(word: Pick<WordEntry, 'nextDue' | 'status'>, now = Date.now()): boolean {
  if (word.nextDue === 0) return true
  return word.nextDue <= now
}

/**
 * Build the "today's review" queue, ordered for the most learning:
 *   1. Lapsed words (lapses > 0 and due)
 *   2. New words (never reviewed)
 *   3. Due reviews (nextDue <= now)
 * The user can choose "all" to bypass the ordering and just see them flat.
 */
export function buildTodayQueue(words: WordEntry[], now = Date.now()): WordEntry[] {
  const due = words.filter((w) => isDue(w, now))
  const lapsed = due.filter((w) => w.lapses > 0)
  const fresh = due.filter((w) => w.lapses === 0 && w.reviewCount === 0)
  const rest = due.filter((w) => !lapsed.includes(w) && !fresh.includes(w))
  return [...lapsed, ...fresh, ...rest]
}

/**
 * Add the SRS fields to a legacy WordEntry that doesn't have them yet.
 * Existing entries with `status === 'new'` and `lastReviewed === 0` get
 * the defaults; existing entries with `lastReviewed > 0` are treated as
 * "promoted to a 6-day interval" so the next review comes back in a week
 * (which is what the old `dueForReview` heuristic was approximating).
 */
export function migrateLegacySrs(word: WordEntry): WordEntry {
  if (word.interval !== undefined) return word
  const reviewed = word.lastReviewed > 0
  return {
    ...word,
    interval: reviewed ? 6 : 0,
    ease: 2.5,
    repetitions: reviewed ? 2 : 0,
    lapses: 0,
    nextDue: reviewed ? word.lastReviewed + 6 * DAY : 0,
  }
}

/**
 * Lightweight stats for the HUD: how many words are due today, how many
 * known, what the average interval looks like. Pure.
 */
export interface VocabStats {
  total: number
  new: number
  learning: number
  known: number
  dueToday: number
  lapsedCount: number
  averageIntervalDays: number
  longestStreak: number
  totalReviews: number
}

export function computeStats(words: WordEntry[], now = Date.now()): VocabStats {
  let newCount = 0
  let learning = 0
  let known = 0
  let due = 0
  let lapsed = 0
  let totalInterval = 0
  let intervalCount = 0
  let totalReviews = 0
  for (const w of words) {
    totalReviews += w.reviewCount
    if (w.status === 'new') newCount++
    else if (w.status === 'learning') learning++
    else known++
    if (isDue(w, now)) due++
    if (w.lapses > 0) lapsed++
    if (w.interval > 0) {
      totalInterval += w.interval
      intervalCount++
    }
  }
  return {
    total: words.length,
    new: newCount,
    learning,
    known,
    dueToday: due,
    lapsedCount: lapsed,
    averageIntervalDays: intervalCount === 0 ? 0 : Math.round(totalInterval / intervalCount),
    longestStreak: 0, // filled by streak module
    totalReviews,
  }
}
