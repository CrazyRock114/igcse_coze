/**
 * Streak + XP — daily review habit tracker.
 *
 * Two numbers, both kept in localStorage:
 *   - `streak` — consecutive days the user has reviewed ≥1 word.
 *   - `xp`     — total experience points, earned per review action.
 *   - `lastReviewDay` — the YYYY-MM-DD of the most recent review (in
 *                      the user's local timezone), so we can decide
 *                      whether a new review is "yesterday", "today",
 *                      or "missed a day" without a server clock.
 *
 * XP is awarded per assessment: know → 10, unsure → 5, dont → 2. The
 * "dont" case still gets a small reward — the act of trying counts
 * even when the result is wrong. (Anki and Duolingo both have this
 * asymmetry; review friction is what they are after.)
 *
 * Streak logic:
 *   - First review ever → streak = 1.
 *   - Same day → streak unchanged.
 *   - Day after last review → streak += 1.
 *   - ≥2 days since last review → streak resets to 1.
 */

const STORAGE_KEY = 'igcse.vocab.streak.v1'

export interface StreakRecord {
  current: number
  longest: number
  xp: number
  lastReviewDay: string // YYYY-MM-DD local
}

const DEFAULT: StreakRecord = {
  current: 0,
  longest: 0,
  xp: 0,
  lastReviewDay: '',
}

// Cache for the readStreak snapshot. See the long comment in readStreak
// for why this is necessary — TL;DR useSyncExternalStore's getSnapshot
// must return a stable reference, so we memoise by raw string.
let cache: { raw: string | null; value: StreakRecord } | null = null

/** Invalidate the readStreak cache. Called by recordReview after a write. */
function invalidateStreakCache(): void {
  cache = null
}

function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
}

export function readStreak(): StreakRecord {
  if (!isBrowser()) return DEFAULT
  const raw = window.localStorage.getItem(STORAGE_KEY)
  // CRITICAL: useSyncExternalStore's getSnapshot must return a stable
  // reference when the underlying value is unchanged. React compares
  // snapshots with Object.is; returning a freshly-constructed object
  // every call (the obvious "just spread the parsed JSON" shape) trips
  // an infinite re-render loop, surfaced as React error #185. Cache
  // by raw-string identity — if the localStorage bytes haven't changed,
  // we hand back the same object reference we built last time. When
  // the bytes change (e.g. recordReview just wrote), the cache misses
  // and we rebuild once.
  if (cache && cache.raw === raw) return cache.value
  let value: StreakRecord
  if (!raw) {
    value = DEFAULT
  } else {
    try {
      const parsed = JSON.parse(raw) as StreakRecord
      value = {
        current: parsed.current ?? 0,
        longest: parsed.longest ?? 0,
        xp: parsed.xp ?? 0,
        lastReviewDay: parsed.lastReviewDay ?? '',
      }
    } catch {
      value = DEFAULT
    }
  }
  cache = { raw, value }
  return value
}

function writeStreak(s: StreakRecord): void {
  if (!isBrowser()) return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(s))
  } catch {
    // ignore
  }
}

function localDateString(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

function dayDiff(a: string, b: string): number {
  // a, b in YYYY-MM-DD; positive means a is N days after b.
  const ad = new Date(a + 'T00:00:00').getTime()
  const bd = new Date(b + 'T00:00:00').getTime()
  return Math.round((ad - bd) / (24 * 60 * 60 * 1000))
}

const XP_BY_ASSESSMENT: Record<string, number> = {
  know: 10,
  unsure: 5,
  dont: 2,
}

/**
 * Call after a review action. Returns the updated record so the UI
 * can show "🔥 5" without re-reading storage.
 */
export function recordReview(assessment: 'know' | 'unsure' | 'dont', now = new Date()): StreakRecord {
  const prev = readStreak()
  const today = localDateString(now)
  let next: StreakRecord
  if (!prev.lastReviewDay) {
    next = { current: 1, longest: 1, xp: prev.xp + (XP_BY_ASSESSMENT[assessment] ?? 0), lastReviewDay: today }
  } else {
    const diff = dayDiff(today, prev.lastReviewDay)
    let current = prev.current
    if (diff === 0) {
      // same day, unchanged
    } else if (diff === 1) {
      current = prev.current + 1
    } else if (diff > 1) {
      // missed a day
      current = 1
    } else {
      // diff < 0 — clock went backwards; treat as today
      current = prev.current
    }
    next = {
      current,
      longest: Math.max(prev.longest, current),
      xp: prev.xp + (XP_BY_ASSESSMENT[assessment] ?? 0),
      lastReviewDay: today,
    }
  }
  writeStreak(next)
  invalidateStreakCache()
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('vocab:streak-changed'))
  }
  return next
}

/** Streak display: "🔥 5" or "—". */
export function streakLabel(s: StreakRecord): string {
  if (s.current <= 0) return '—'
  return `${s.current}`
}
