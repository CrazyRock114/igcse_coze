/**
 * Per-statement progress — types.
 *
 * One row per (user, statementId). Tracks whether the student has opened
 * a lesson that covers the statement (seen) and whether they have
 * practised a question in that lesson (attempted, with wrong counts).
 *
 * Mirrors the `statement_progress` Supabase table, but the localStorage
 * store is the source of truth — Supabase is a write-through cache.
 *
 * Statement ids are the IGCSE syllabus codes, e.g. '7.1.1' or 'B1.1'.
 * They are the same ids that appear in `lesson.syllabus[]`.
 */

export interface StatementProgress {
  /** Local primary key, e.g. '7.1.1' (the statement id) — unique per user. */
  statementId: string
  /** Subject code, e.g. '0610'. Lets one user track multiple syllabuses. */
  subject: string
  /** First time the student opened a lesson that covers this. Unix ms; 0 = never. */
  firstSeenAt: number
  /** Most recent open. Unix ms; 0 = never. */
  lastSeenAt: number
  /** Number of times a covering lesson was opened. */
  seenCount: number
  /** Total question attempts in any covering lesson. */
  attempts: number
  /** Total wrong answers. */
  wrongCount: number
  /** Last time the student picked an answer (right or wrong). Unix ms; 0 = never. */
  lastAttemptAt: number
  /** Last time the student got one wrong. Unix ms; 0 = never. */
  lastWrongAt: number
}

export interface ProgressStore {
  list(): StatementProgress[]
  /** Mark a set of statements as seen (idempotent — only updates timestamps). */
  markSeen(subject: string, statementIds: string[]): void
  /** Bump attempts on a set of statements (called when the student picks any answer). */
  recordAttempt(subject: string, statementIds: string[]): void
  /** Bump wrong_count on a set of statements. */
  recordWrong(subject: string, statementIds: string[]): void
  /** Overwrite a single row wholesale. Used by the sync pull. */
  upsert(row: StatementProgress): void
  /** Wipe local progress (e.g. on user switch). Does not touch Supabase. */
  clear(): void
}

/**
 * Pure helpers — no I/O. Used by the HomePage map and the ProgressCard.
 */

/** A student-friendly classification of one statement, given their data. */
export type StatementStatus = 'untouched' | 'seen' | 'practising' | 'struggling' | 'mastered'

export function classify(prog: StatementProgress | undefined): StatementStatus {
  if (!prog || prog.lastSeenAt === 0) return 'untouched'
  if (prog.wrongCount > 0 && prog.attempts > 0 && prog.wrongCount / prog.attempts >= 0.5) {
    return 'struggling'
  }
  if (prog.attempts >= 3 && prog.wrongCount === 0) return 'mastered'
  if (prog.attempts > 0) return 'practising'
  return 'seen'
}

/** Map a StatementStatus to a Tailwind background class for the syllabus map. */
export function statementFillClass(status: StatementStatus): string {
  switch (status) {
    case 'untouched':
      return 'bg-slate-200'
    case 'seen':
      return 'bg-teal-100'
    case 'practising':
      return 'bg-teal-300'
    case 'struggling':
      return 'bg-rose-300'
    case 'mastered':
      return 'bg-teal-500'
  }
}
