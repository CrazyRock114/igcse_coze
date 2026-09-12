/**
 * useProgressSnapshot — reactive view of the user's learning state.
 *
 * Returns a snapshot of:
 *   - word bank count (from vocabStore)
 *   - mistake count, broken into unresolved / resolved
 *   - per-statement progress, classified into seen / practising / struggling / mastered
 *   - the timestamp of the most recent activity across all three stores
 *
 * Uses `useSyncExternalStore` to subscribe to the three stores' change
 * events. The snapshot is a stable reference between events, so React
 * doesn't re-render on every parent update — only when one of the
 * underlying stores actually changes.
 *
 * SSR-safe: `getServerSnapshot` returns a zero-state object, and the
 * module-level `cached` reference is replaced only on event firings.
 */

import { useSyncExternalStore } from 'react'
import { vocabStore, VOCAB_CHANGED_EVENT } from '@/lib/vocabStore'
import { mistakeStore, MISTAKE_CHANGED_EVENT } from '@/lib/mistakeStore'
import { progressStore, PROGRESS_CHANGED_EVENT, lastActivityAt } from '@/lib/progressStore'
import { classify, type StatementProgress, type StatementStatus } from '@/lib/progressTypes'
import { isDue } from '@/lib/srs'

export interface ProgressSnapshot {
  wordCount: number
  /** Words due for review right now (SRS queue, not just new words). */
  dueTodayCount: number
  mistakeCount: number
  unresolvedMistakeCount: number
  resolvedMistakeCount: number
  /** Per-statement row keyed by statementId. */
  progressById: Map<string, StatementProgress>
  /** Per-statement count, grouped by classify(). */
  byStatus: Record<StatementStatus, number>
  /** Most recent activity timestamp across all three stores. 0 = never. */
  lastActivityAt: number
  /** Number of unique statements with any data. */
  touchedStatementCount: number
}

const EMPTY: ProgressSnapshot = {
  wordCount: 0,
  dueTodayCount: 0,
  mistakeCount: 0,
  unresolvedMistakeCount: 0,
  resolvedMistakeCount: 0,
  progressById: new Map(),
  byStatus: {
    untouched: 0,
    seen: 0,
    practising: 0,
    struggling: 0,
    mastered: 0,
  },
  lastActivityAt: 0,
  touchedStatementCount: 0,
}

function compute(): ProgressSnapshot {
  const now = Date.now()
  const words = vocabStore.list()
  const mistakes = mistakeStore.list()
  const progress = progressStore.list()
  const progressById = new Map(progress.map((p) => [p.statementId, p]))

  const byStatus: Record<StatementStatus, number> = {
    untouched: 0,
    seen: 0,
    practising: 0,
    struggling: 0,
    mastered: 0,
  }
  for (const p of progress) {
    byStatus[classify(p)] += 1
  }

  let last = 0
  for (const w of words) last = Math.max(last, w.lastReviewed, w.addedAt)
  for (const m of mistakes) last = Math.max(last, m.lastSeen, m.firstSeen)
  for (const p of progress) last = Math.max(last, lastActivityAt(p))

  return {
    wordCount: words.length,
    dueTodayCount: words.filter((w) => isDue(w, now)).length,
    mistakeCount: mistakes.length,
    unresolvedMistakeCount: mistakes.filter((m) => !m.resolved).length,
    resolvedMistakeCount: mistakes.filter((m) => m.resolved).length,
    progressById,
    byStatus,
    lastActivityAt: last,
    touchedStatementCount: progress.length,
  }
}

// Module-level cache so the snapshot reference is stable between events.
// `useSyncExternalStore` requires the snapshot to be referentially equal
// across calls when nothing has changed — otherwise React's "tearing" check
// fails in concurrent mode.
let cached: ProgressSnapshot = EMPTY
let initialized = false

function getSnapshot(): ProgressSnapshot {
  // First client-side call — compute against the real stores. Subsequent
  // calls return the cached value (updated by the subscribe callback below).
  if (!initialized) {
    cached = compute()
    initialized = true
  }
  return cached
}

function subscribe(notify: () => void): () => void {
  const refresh = () => {
    cached = compute()
    notify()
  }
  window.addEventListener(VOCAB_CHANGED_EVENT, refresh)
  window.addEventListener(MISTAKE_CHANGED_EVENT, refresh)
  window.addEventListener(PROGRESS_CHANGED_EVENT, refresh)
  return () => {
    window.removeEventListener(VOCAB_CHANGED_EVENT, refresh)
    window.removeEventListener(MISTAKE_CHANGED_EVENT, refresh)
    window.removeEventListener(PROGRESS_CHANGED_EVENT, refresh)
  }
}

function getServerSnapshot(): ProgressSnapshot {
  return EMPTY
}

export function useProgressSnapshot(): ProgressSnapshot {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

/** Human-friendly relative time, e.g. "5m ago", "2h ago", "3d ago", or the date. */
export function formatRelativeTime(ts: number, now: number = Date.now()): string {
  if (ts === 0) return ''
  const diff = now - ts
  if (diff < 0) return ''
  const m = Math.floor(diff / 60_000)
  if (m < 1) return 'just now'
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  const d = Math.floor(h / 24)
  if (d < 7) return `${d}d ago`
  return new Date(ts).toLocaleDateString()
}
