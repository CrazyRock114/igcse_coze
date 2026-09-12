/**
 * Sync manager — bridge between the localStorage stores (vocab, mistakes,
 * progress) and the Supabase tables (`word_bank`, `mistakes`, `statement_progress`).
 *
 * Lifecycle:
 *   1. The user signs in (`signIn` / `signUp`).
 *   2. `startSyncForUser(userId)` is called. It:
 *        a. One-time: pulls the user's existing data from Supabase and
 *           merges it into localStorage (Supabase wins on conflict).
 *        b. Subscribes to `VOCAB_CHANGED_EVENT`, `MISTAKE_CHANGED_EVENT`,
 *           and `PROGRESS_CHANGED_EVENT` window events.
 *        c. On each event, reads the current localStorage and pushes any
 *           new/modified rows to Supabase (idempotent upsert).
 *   3. The user signs out → `stopSync()` unsubscribes and clears the
 *      last-known userId. localStorage data stays on disk for the
 *      next sign-in.
 *
 * Design notes:
 *   - Sync is one-way (localStorage → Supabase). Reads always come from
 *     localStorage for speed. The one-time pull on sign-in reconciles.
 *   - Failures are swallowed (logged to console.warn). The next event
 *     will retry; eventually a manual "Sync now" button can force it.
 *   - Coalescing: if a burst of writes happens, we debounce by 500ms
 *     so a 5-write burst is one Supabase round-trip, not five.
 */

import { supabase } from './supabase'
import { vocabStore, VOCAB_CHANGED_EVENT } from './vocabStore'
import type { WordEntry } from './vocabTypes'
import { mistakeStore, MISTAKE_CHANGED_EVENT } from './mistakeStore'
import type { Mistake } from './mistakeTypes'
import { progressStore, PROGRESS_CHANGED_EVENT } from './progressStore'
import type { StatementProgress } from './progressTypes'

let activeUserId: string | null = null
let vocabTimer: number | null = null
let mistakeTimer: number | null = null
let progressTimer: number | null = null

/** Convert a localStorage WordEntry to a Supabase row. */
function wordEntryToRow(entry: WordEntry, userId: string) {
  return {
    user_id: userId,
    term_id: entry.termId,
    subject: entry.subject,
    slug: entry.slug,
    status: entry.status,
    note: entry.note ?? null,
    added_at: new Date(entry.addedAt).toISOString(),
    last_reviewed: entry.lastReviewed ? new Date(entry.lastReviewed).toISOString() : null,
    review_count: entry.reviewCount,
    interval: entry.interval,
    ease: entry.ease,
    repetitions: entry.repetitions,
    lapses: entry.lapses,
    next_due: entry.nextDue ? new Date(entry.nextDue).toISOString() : null,
  }
}

function mistakeToRow(m: Mistake, userId: string) {
  return {
    user_id: userId,
    question_id: m.questionId,
    subject: m.subject,
    slug: m.slug,
    picked_index: m.pickedIndex,
    picked_text: m.pickedText,
    correct_index: m.correctIndex,
    correct_text: m.correctText,
    first_seen: new Date(m.firstSeen).toISOString(),
    last_seen: new Date(m.lastSeen).toISOString(),
    attempt_count: m.attemptCount,
    resolved: m.resolved,
    resolved_at: m.resolvedAt ? new Date(m.resolvedAt).toISOString() : null,
  }
}

function progressToRow(p: StatementProgress, userId: string) {
  return {
    user_id: userId,
    statement_id: p.statementId,
    subject: p.subject,
    first_seen_at: p.firstSeenAt ? new Date(p.firstSeenAt).toISOString() : null,
    last_seen_at: p.lastSeenAt ? new Date(p.lastSeenAt).toISOString() : null,
    seen_count: p.seenCount,
    attempts: p.attempts,
    wrong_count: p.wrongCount,
    last_attempt_at: p.lastAttemptAt ? new Date(p.lastAttemptAt).toISOString() : null,
    last_wrong_at: p.lastWrongAt ? new Date(p.lastWrongAt).toISOString() : null,
  }
}

async function pullFromSupabase(userId: string): Promise<void> {
  // Pull remote word bank + mistakes + progress and merge into localStorage.
  // Supabase wins on conflict (it's the source of truth across devices).
  const [
    { data: remoteWords, error: wErr },
    { data: remoteMistakes, error: mErr },
    { data: remoteProgress, error: pErr },
  ] = await Promise.all([
    supabase
      .from('word_bank')
      .select('term_id, subject, slug, status, note, added_at, last_reviewed, review_count, interval, ease, repetitions, lapses, next_due')
      .eq('user_id', userId),
    supabase
      .from('mistakes')
      .select(
        'question_id, subject, slug, picked_index, picked_text, correct_index, correct_text, first_seen, last_seen, attempt_count, resolved, resolved_at'
      )
      .eq('user_id', userId),
    supabase
      .from('statement_progress')
      .select(
        'statement_id, subject, first_seen_at, last_seen_at, seen_count, attempts, wrong_count, last_attempt_at, last_wrong_at'
      )
      .eq('user_id', userId),
  ])

  if (wErr) console.warn('pull word_bank failed:', wErr.message)
  if (mErr) console.warn('pull mistakes failed:', mErr.message)
  if (pErr) console.warn('pull statement_progress failed:', pErr.message)

  if (remoteWords && remoteWords.length) {
    const existing = vocabStore.list()
    const byKey = new Map<string, WordEntry>(existing.map((w) => [w.termId, w]))
    for (const row of remoteWords) {
      const termId = row.term_id as string
      const local = byKey.get(termId)
      const remoteNote = (row.note as string | null) ?? undefined
      // `note?` is `string` (not `string | undefined`) under exactOptionalPropertyTypes,
      // so build the entry without the `note` key when the remote row has no note.
      const base: WordEntry = {
        termId,
        subject: row.subject as string,
        slug: row.slug as string,
        status: row.status as WordEntry['status'],
        addedAt: new Date(row.added_at as string).getTime(),
        lastReviewed: row.last_reviewed ? new Date(row.last_reviewed as string).getTime() : 0,
        reviewCount: row.review_count as number,
        interval: (row.interval as number | null) ?? 0,
        ease: (row.ease as number | null) ?? 2.5,
        repetitions: (row.repetitions as number | null) ?? 0,
        lapses: (row.lapses as number | null) ?? 0,
        nextDue: row.next_due ? new Date(row.next_due as string).getTime() : 0,
      }
      const remoteEntry: WordEntry =
        remoteNote !== undefined ? { ...base, note: remoteNote } : base
      // Supabase wins — overwrite local. lastReviewing newer wins.
      if (!local || local.lastReviewed < remoteEntry.lastReviewed) {
        vocabStore.update(termId, remoteEntry)
      }
    }
  }

  if (remoteMistakes && remoteMistakes.length) {
    const existing = mistakeStore.list()
    const byQid = new Map(existing.map((m) => [m.questionId, m]))
    for (const row of remoteMistakes) {
      const qid = row.question_id as string
      const local = byQid.get(qid)
      const remoteMistake: Mistake = {
        id: `${qid}#${new Date(row.first_seen as string).getTime()}`,
        questionId: qid,
        subject: row.subject as string,
        slug: row.slug as string,
        pickedIndex: row.picked_index as number,
        pickedText: row.picked_text as string,
        correctIndex: row.correct_index as number,
        correctText: row.correct_text as string,
        firstSeen: new Date(row.first_seen as string).getTime(),
        lastSeen: new Date(row.last_seen as string).getTime(),
        attemptCount: row.attempt_count as number,
        resolved: row.resolved as boolean,
        resolvedAt: row.resolved_at ? new Date(row.resolved_at as string).getTime() : undefined,
      }
      if (!local || local.lastSeen < remoteMistake.lastSeen) {
        // Re-create via log if missing; otherwise mark resolved and update.
        if (!local) {
          mistakeStore.log({
            questionId: remoteMistake.questionId,
            subject: remoteMistake.subject,
            slug: remoteMistake.slug,
            pickedIndex: remoteMistake.pickedIndex,
            pickedText: remoteMistake.pickedText,
            correctIndex: remoteMistake.correctIndex,
            correctText: remoteMistake.correctText,
          })
        }
        if (remoteMistake.resolved) mistakeStore.markResolved(qid)
      }
    }
  }

  if (remoteProgress && remoteProgress.length) {
    // Per-statement: take the row with the most recent activity across
    // seen / attempt / wrong. Field-by-field max — counters can only go up
    // and timestamps only move forward.
    const existing = progressStore.list()
    const byKey = new Map(existing.map((p) => [p.statementId, p]))
    for (const row of remoteProgress) {
      const sid = row.statement_id as string
      const local = byKey.get(sid)
      const remoteRow: StatementProgress = {
        statementId: sid,
        subject: row.subject as string,
        firstSeenAt: row.first_seen_at ? new Date(row.first_seen_at as string).getTime() : 0,
        lastSeenAt: row.last_seen_at ? new Date(row.last_seen_at as string).getTime() : 0,
        seenCount: row.seen_count as number,
        attempts: row.attempts as number,
        wrongCount: row.wrong_count as number,
        lastAttemptAt: row.last_attempt_at ? new Date(row.last_attempt_at as string).getTime() : 0,
        lastWrongAt: row.last_wrong_at ? new Date(row.last_wrong_at as string).getTime() : 0,
      }
      if (!local) {
        progressStore.upsert(remoteRow)
        continue
      }
      // Field-by-field max — counters only grow; timestamps only move forward.
      const merged: StatementProgress = {
        statementId: sid,
        subject: remoteRow.subject,
        firstSeenAt: Math.min(local.firstSeenAt || Infinity, remoteRow.firstSeenAt || Infinity) || 0,
        lastSeenAt: Math.max(local.lastSeenAt, remoteRow.lastSeenAt),
        seenCount: Math.max(local.seenCount, remoteRow.seenCount),
        attempts: Math.max(local.attempts, remoteRow.attempts),
        wrongCount: Math.max(local.wrongCount, remoteRow.wrongCount),
        lastAttemptAt: Math.max(local.lastAttemptAt, remoteRow.lastAttemptAt),
        lastWrongAt: Math.max(local.lastWrongAt, remoteRow.lastWrongAt),
      }
      // Skip the write if nothing changed.
      if (
        merged.firstSeenAt !== local.firstSeenAt ||
        merged.lastSeenAt !== local.lastSeenAt ||
        merged.seenCount !== local.seenCount ||
        merged.attempts !== local.attempts ||
        merged.wrongCount !== local.wrongCount ||
        merged.lastAttemptAt !== local.lastAttemptAt ||
        merged.lastWrongAt !== local.lastWrongAt
      ) {
        progressStore.upsert(merged)
      }
    }
  }
}

async function pushVocab(userId: string): Promise<void> {
  const entries = vocabStore.list()
  if (entries.length === 0) return
  const rows = entries.map((e) => wordEntryToRow(e, userId))
  const { error } = await supabase
    .from('word_bank')
    .upsert(rows, { onConflict: 'user_id,subject,slug,term_id' })
  if (error) console.warn('push word_bank failed:', error.message)
}

async function pushMistakes(userId: string): Promise<void> {
  const mistakes = mistakeStore.list()
  if (mistakes.length === 0) return
  const rows = mistakes.map((m) => mistakeToRow(m, userId))
  const { error } = await supabase
    .from('mistakes')
    .upsert(rows, { onConflict: 'user_id,question_id' })
  if (error) console.warn('push mistakes failed:', error.message)
}

async function pushProgress(userId: string): Promise<void> {
  const rows = progressStore.list()
  if (rows.length === 0) return
  const payload = rows.map((p) => progressToRow(p, userId))
  const { error } = await supabase
    .from('statement_progress')
    .upsert(payload, { onConflict: 'user_id,statement_id' })
  if (error) console.warn('push statement_progress failed:', error.message)
}

function scheduleVocabPush(userId: string): void {
  if (vocabTimer) window.clearTimeout(vocabTimer)
  vocabTimer = window.setTimeout(() => {
    vocabTimer = null
    void pushVocab(userId)
  }, 500)
}

function scheduleMistakePush(userId: string): void {
  if (mistakeTimer) window.clearTimeout(mistakeTimer)
  mistakeTimer = window.setTimeout(() => {
    mistakeTimer = null
    void pushMistakes(userId)
  }, 500)
}

function scheduleProgressPush(userId: string): void {
  if (progressTimer) window.clearTimeout(progressTimer)
  progressTimer = window.setTimeout(() => {
    progressTimer = null
    void pushProgress(userId)
  }, 500)
}

let unsubVocab: (() => void) | null = null
let unsubMistake: (() => void) | null = null
let unsubProgress: (() => void) | null = null

export async function startSyncForUser(userId: string): Promise<void> {
  if (activeUserId === userId) return
  stopSync()
  activeUserId = userId

  // 1) Pull remote first — it may have rows the local device never saw
  //    (e.g. user signed in on a different device yesterday).
  await pullFromSupabase(userId)

  // 2) Push whatever is in localStorage now (covers first sign-in on a
  //    new device that already had local data).
  await pushVocab(userId)
  await pushMistakes(userId)
  await pushProgress(userId)

  // 3) Subscribe to local changes from here on.
  const onVocab = () => {
    if (activeUserId) scheduleVocabPush(activeUserId)
  }
  const onMistake = () => {
    if (activeUserId) scheduleMistakePush(activeUserId)
  }
  const onProgress = () => {
    if (activeUserId) scheduleProgressPush(activeUserId)
  }
  window.addEventListener(VOCAB_CHANGED_EVENT, onVocab)
  window.addEventListener(MISTAKE_CHANGED_EVENT, onMistake)
  window.addEventListener(PROGRESS_CHANGED_EVENT, onProgress)
  unsubVocab = () => window.removeEventListener(VOCAB_CHANGED_EVENT, onVocab)
  unsubMistake = () => window.removeEventListener(MISTAKE_CHANGED_EVENT, onMistake)
  unsubProgress = () => window.removeEventListener(PROGRESS_CHANGED_EVENT, onProgress)
}

export function stopSync(): void {
  if (unsubVocab) {
    unsubVocab()
    unsubVocab = null
  }
  if (unsubMistake) {
    unsubMistake()
    unsubMistake = null
  }
  if (unsubProgress) {
    unsubProgress()
    unsubProgress = null
  }
  if (vocabTimer) {
    window.clearTimeout(vocabTimer)
    vocabTimer = null
  }
  if (mistakeTimer) {
    window.clearTimeout(mistakeTimer)
    mistakeTimer = null
  }
  if (progressTimer) {
    window.clearTimeout(progressTimer)
    progressTimer = null
  }
  activeUserId = null
}

/** Force a sync now — useful for a "Sync now" button in the user menu. */
export async function syncNow(): Promise<void> {
  if (!activeUserId) return
  await Promise.all([
    pushVocab(activeUserId),
    pushMistakes(activeUserId),
    pushProgress(activeUserId),
  ])
}
