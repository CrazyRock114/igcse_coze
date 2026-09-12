/**
 * Mistake log — every wrong checkpoint answer the user has made.
 *
 * Designed to answer two questions:
 *   1. "What have I got wrong recently?" → list, sorted by recency
 *   2. "What am I still getting wrong?" → list of unresolved items
 *
 * Each unique `questionId` gets a single Mistake row that grows over time:
 * re-attempts increment `attemptCount` and update `lastSeen`. Resolved
 * (re-attempted correctly) is a one-way flag, so the row keeps the history
 * while no longer showing up in the "active" list.
 *
 * Storage: localStorage under `igcse.mistakes.v1` (see `mistakeStore.ts`).
 * The shape is intentionally identical to a future Supabase `mistakes` table
 * so a backend swap is a five-line change in `mistakeStore.ts`.
 */

export interface Mistake {
  /** id format: `${questionId}#${firstSeen}` — one row per unique question. */
  id: string
  questionId: string
  subject: string
  slug: string
  /** What the user picked */
  pickedIndex: number
  pickedText: string
  /** The right answer */
  correctIndex: number
  correctText: string
  /** When the user first got this question wrong (Unix ms) */
  firstSeen: number
  /** When the user most recently got this question wrong (Unix ms) */
  lastSeen: number
  /** Times the user has gotten this question wrong in a row. */
  attemptCount: number
  /** Once the user re-attempts and gets it right, this flips to true. */
  resolved: boolean
  resolvedAt?: number | undefined
}

export interface MistakeStore {
  list(): Mistake[]
  /** Log a wrong answer. If a row for this questionId already exists, it is
   *  updated: attemptCount++, lastSeen = now, and the picked text/index
   *  refresh. If the row is already resolved, a new wrong answer re-opens it
   *  (resolved=false, resolvedAt cleared). */
  log(input: Omit<Mistake, 'id' | 'firstSeen' | 'lastSeen' | 'attemptCount' | 'resolved'>): Mistake
  /** Mark a question as resolved (user got it right later). */
  markResolved(questionId: string): Mistake | null
  /** Wipe the log — used by the "Clear all mistakes" button. */
  clear(): void
}
