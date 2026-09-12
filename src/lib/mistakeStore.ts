/**
 * Mistake store — localStorage as source of truth, with a Supabase
 * write-through. Same pattern as `vocabStore`: every write is sync to
 * localStorage, then a window event fires and the sync layer picks
 * it up. See `lib/syncManager.ts` for the actual Supabase push.
 */

import type { Mistake, MistakeStore } from './mistakeTypes'

const STORAGE_KEY = 'igcse.mistakes.v1'
const SCHEMA_VERSION = 1
export const MISTAKE_CHANGED_EVENT = 'igcse:mistake-changed'

interface Persisted {
  v: number
  mistakes: Mistake[]
}

function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
}

function read(): Mistake[] {
  if (!isBrowser()) return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as Persisted
    if (parsed.v !== SCHEMA_VERSION) {
      // Future migrations would go here; today there is only v1.
      return []
    }
    return Array.isArray(parsed.mistakes) ? parsed.mistakes : []
  } catch {
    return []
  }
}

function write(mistakes: Mistake[]): void {
  if (!isBrowser()) return
  const payload: Persisted = { v: SCHEMA_VERSION, mistakes }
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
  } catch {
    // Quota exceeded, private mode, etc. The store degrades silently.
  }
}

function notify(): void {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(MISTAKE_CHANGED_EVENT))
  }
}

class LocalStorageMistakeStore implements MistakeStore {
  list(): Mistake[] {
    return read()
  }

  log(input: Omit<Mistake, 'id' | 'firstSeen' | 'lastSeen' | 'attemptCount' | 'resolved'>): Mistake {
    const mistakes = read()
    const idx = mistakes.findIndex((m) => m.questionId === input.questionId)
    if (idx === -1) {
      const now = Date.now()
      const created: Mistake = {
        ...input,
        id: `${input.questionId}#${now}`,
        firstSeen: now,
        lastSeen: now,
        attemptCount: 1,
        resolved: false,
      }
      mistakes.push(created)
      write(mistakes)
      notify()
      return created
    }
    // Re-attempt: refresh the picked text/index, bump counters, re-open if resolved.
    const prev = mistakes[idx]!
    const updated: Mistake = {
      ...prev,
      pickedIndex: input.pickedIndex,
      pickedText: input.pickedText,
      lastSeen: Date.now(),
      attemptCount: prev.attemptCount + 1,
      resolved: false,
      resolvedAt: undefined,
    }
    mistakes[idx] = updated
    write(mistakes)
    notify()
    return updated
  }

  markResolved(questionId: string): Mistake | null {
    const mistakes = read()
    const idx = mistakes.findIndex((m) => m.questionId === questionId)
    if (idx === -1) return null
    const prev = mistakes[idx]!
    if (prev.resolved) return prev
    const updated: Mistake = { ...prev, resolved: true, resolvedAt: Date.now() }
    mistakes[idx] = updated
    write(mistakes)
    notify()
    return updated
  }

  clear(): void {
    write([])
    notify()
  }
}

/** Singleton — module-level so the whole app sees the same data. */
export const mistakeStore: MistakeStore = new LocalStorageMistakeStore()

// ---------------------------------------------------------------------------
// Pure helpers (no storage I/O) — easy to unit-test, easy to use from React
// selectors and from any future "teacher dashboard" reporting view.
// ---------------------------------------------------------------------------

/** Sorted newest-first. Resolved items go to the end. */
export function sortByRecency(mistakes: Mistake[]): Mistake[] {
  return [...mistakes].sort((a, b) => {
    if (a.resolved !== b.resolved) return a.resolved ? 1 : -1
    return b.lastSeen - a.lastSeen
  })
}

/** Mistakes logged within the last `days` days. */
export function recentMistakes(mistakes: Mistake[], days = 5): Mistake[] {
  const cutoff = Date.now() - days * 24 * 60 * 60 * 1000
  return mistakes.filter((m) => m.lastSeen >= cutoff)
}

/** Only the unresolved ones — what the student should still review. */
export function unresolved(mistakes: Mistake[]): Mistake[] {
  return mistakes.filter((m) => !m.resolved)
}

/** Group by questionId and return the most-failed-N list. */
export function topWrongQuestions(mistakes: Mistake[], n = 5): Mistake[] {
  return [...mistakes]
    .filter((m) => !m.resolved)
    .sort((a, b) => b.attemptCount - a.attemptCount)
    .slice(0, n)
}
