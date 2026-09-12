/**
 * Per-statement progress store — localStorage as source of truth, with a
 * Supabase write-through. Same pattern as `vocabStore` and `mistakeStore`:
 * the UI calls sync `markSeen` / `recordAttempt` / `recordWrong`, the
 * localStorage write happens first, then a window event fires and the
 * sync layer pushes the change to Supabase in the background.
 *
 * Why per-statement: the HomePage syllabus map shows one square per
 * statement, and we want to colour that square with the user's real
 * status. The lesson covers an array of statements, and any single
 * question attempt in the lesson counts as an attempt on every covered
 * statement — coarse, but enough for the map and the progress card.
 */

import type { ProgressStore, StatementProgress } from './progressTypes'

const STORAGE_KEY = 'igcse.progress.v1'
const SCHEMA_VERSION = 1
export const PROGRESS_CHANGED_EVENT = 'igcse:progress-changed'

interface Persisted {
  v: number
  rows: StatementProgress[]
}

function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
}

function read(): StatementProgress[] {
  if (!isBrowser()) return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as Persisted
    if (parsed.v !== SCHEMA_VERSION) return []
    return Array.isArray(parsed.rows) ? parsed.rows : []
  } catch {
    return []
  }
}

function write(rows: StatementProgress[]): void {
  if (!isBrowser()) return
  try {
    const payload: Persisted = { v: SCHEMA_VERSION, rows }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
  } catch {
    // Quota / private mode — silent degrade.
  }
}

function notify(): void {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(PROGRESS_CHANGED_EVENT))
  }
}

class LocalStorageProgressStore implements ProgressStore {
  list(): StatementProgress[] {
    return read()
  }

  markSeen(subject: string, statementIds: string[]): void {
    if (statementIds.length === 0) return
    const rows = read()
    const now = Date.now()
    let changed = false
    for (const id of statementIds) {
      const idx = rows.findIndex((r) => r.statementId === id)
      if (idx === -1) {
        rows.push({
          statementId: id,
          subject,
          firstSeenAt: now,
          lastSeenAt: now,
          seenCount: 1,
          attempts: 0,
          wrongCount: 0,
          lastAttemptAt: 0,
          lastWrongAt: 0,
        })
        changed = true
      } else {
        const prev = rows[idx]!
        // Idempotent within a tight window: if the user just opened this
        // lesson (within 1s) we skip — saves a write when the LessonPage
        // re-mounts on route param changes.
        if (now - prev.lastSeenAt < 1000) continue
        rows[idx] = {
          ...prev,
          lastSeenAt: now,
          seenCount: prev.seenCount + 1,
        }
        changed = true
      }
    }
    if (changed) {
      write(rows)
      notify()
    }
  }

  recordAttempt(subject: string, statementIds: string[]): void {
    if (statementIds.length === 0) return
    const rows = read()
    const now = Date.now()
    let changed = false
    for (const id of statementIds) {
      const idx = rows.findIndex((r) => r.statementId === id)
      if (idx === -1) {
        // markSeen was never called for this statement (e.g. dev tools
        // opened a lesson URL directly without going through HomePage).
        // Create the row so the attempt counts.
        rows.push({
          statementId: id,
          subject,
          firstSeenAt: now,
          lastSeenAt: now,
          seenCount: 1,
          attempts: 1,
          wrongCount: 0,
          lastAttemptAt: now,
          lastWrongAt: 0,
        })
        changed = true
      } else {
        const prev = rows[idx]!
        rows[idx] = { ...prev, attempts: prev.attempts + 1, lastAttemptAt: now }
        changed = true
      }
    }
    if (changed) {
      write(rows)
      notify()
    }
  }

  recordWrong(subject: string, statementIds: string[]): void {
    if (statementIds.length === 0) return
    const rows = read()
    const now = Date.now()
    let changed = false
    for (const id of statementIds) {
      const idx = rows.findIndex((r) => r.statementId === id)
      if (idx === -1) {
        rows.push({
          statementId: id,
          subject,
          firstSeenAt: now,
          lastSeenAt: now,
          seenCount: 1,
          attempts: 1,
          wrongCount: 1,
          lastAttemptAt: now,
          lastWrongAt: now,
        })
        changed = true
      } else {
        const prev = rows[idx]!
        rows[idx] = {
          ...prev,
          attempts: prev.attempts + 1,
          wrongCount: prev.wrongCount + 1,
          lastAttemptAt: now,
          lastWrongAt: now,
        }
        changed = true
      }
    }
    if (changed) {
      write(rows)
      notify()
    }
  }

  upsert(row: StatementProgress): void {
    const rows = read()
    const idx = rows.findIndex((r) => r.statementId === row.statementId)
    if (idx === -1) {
      rows.push(row)
    } else {
      rows[idx] = row
    }
    write(rows)
    notify()
  }

  clear(): void {
    write([])
    notify()
  }
}

export const progressStore: ProgressStore = new LocalStorageProgressStore()

// ---------------------------------------------------------------------------
// Pure helpers — no storage I/O.
// ---------------------------------------------------------------------------

/** Map from statementId → row, for O(1) lookup in the HomePage map. */
export function progressById(rows: StatementProgress[]): Map<string, StatementProgress> {
  return new Map(rows.map((r) => [r.statementId, r]))
}

/** Most recent activity across all three timestamps on the row. */
export function lastActivityAt(row: StatementProgress): number {
  return Math.max(row.lastSeenAt, row.lastAttemptAt, row.lastWrongAt)
}
