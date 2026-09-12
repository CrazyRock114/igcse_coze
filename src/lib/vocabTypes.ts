/**
 * Vocabulary concept-card system — types.
 *
 * Three layers, kept separate so the renderer can change without touching data:
 *
 *  1. `ConceptEnrichment` extends a `Term` with the things the textbook can give us
 *     that a plain glossary entry can't: an image, the mechanism, the clinical
 *     picture, related terms to study together. Lives in the lesson file as data.
 *
 *  2. `WordEntry` is the user's *relationship* with a word: when they first saw
 *     it, how many times they've reviewed it, what they marked it as. Lives in
 *     localStorage today; the same shape will live in Supabase tomorrow.
 *
 *  3. `StudyStatus` is a tiny enum: 'new' / 'learning' / 'known'. The renderer
 *     colours by it, the scheduler orders by it.
 */

import type { Bilingual, Term } from '@/content/types'

/**
 * A Term plus the textbook-level enrichment: image, mechanism, clinical picture,
 * related terms. Anything in the lesson file is data; nothing here reaches into
 * the lesson object, so a concept card can be rendered standalone (e.g. in
 * /vocab) without the lesson loaded.
 */
export interface ConceptEnrichment {
  /** id of the underlying Term, e.g. 'rickets' */
  termId: string
  /** subject code, e.g. '0610' */
  subject: string
  /** lesson slug, e.g. '7-1-nutrition' */
  slug: string
  /** Optional image path under /public, e.g. '/figures/g8/7-1-nutrition/image-b5-05.png' */
  image?: string
  /** Source attribution for the image (e.g. 'G8 Science p.9, Figure B5.05') */
  imageSource?: string
  /** How / why — the mechanism. For 'rickets', why bones go soft. */
  mechanism?: Bilingual
  /** What it looks like — symptoms, presentation, the clinical picture. */
  clinicalDetails?: Bilingual
  /** Other terms that should be studied alongside this one. */
  relatedTerms?: string[]
}

export type StudyStatus = 'new' | 'learning' | 'known'

/**
 * The user's per-word record. Pure data, no methods — the store wraps it.
 *
 * `lastReviewed` is a Unix-ms timestamp; 0 means never.
 */
export interface WordEntry {
  /** Matches ConceptEnrichment.termId — the join key. */
  termId: string
  /** Subject+slug the word came from, for grouping in the UI. */
  subject: string
  slug: string
  /** When the user first added the word. Unix ms. */
  addedAt: number
  /** Last review action. Unix ms; 0 if never. */
  lastReviewed: number
  /** Times the user has self-assessed this word. */
  reviewCount: number
  /** Current status. */
  status: StudyStatus
  // ---- SRS (SM-2 lite) fields ----
  /** Days until next review. 0 = new, no schedule yet. */
  interval: number
  /** Multiplier on interval. Starts at 2.5; floor 1.3, cap 2.8. */
  ease: number
  /** Consecutive correct reviews since the last lapse. */
  repetitions: number
  /** Times the user has answered "don't know". */
  lapses: number
  /** Unix ms when this word next comes up. 0 = new. */
  nextDue: number
  // ---- meta ----
  /** Optional note the student wrote to themselves. */
  note?: string
}

/**
 * Vocab store contract. Anything that exposes this shape can be the backend —
 * the localStorage implementation in `vocabStore.ts` and a future Supabase
 * implementation are interchangeable.
 */
export interface VocabStore {
  list(): WordEntry[]
  add(entry: Omit<WordEntry, 'addedAt' | 'lastReviewed' | 'reviewCount' | 'status' | 'interval' | 'ease' | 'repetitions' | 'lapses' | 'nextDue'>): WordEntry
  update(termId: string, patch: Partial<WordEntry>): WordEntry | null
  remove(termId: string): void
  /** Bulk add: only adds terms the user doesn't already have. */
  ensureMany(terms: Array<{ termId: string; subject: string; slug: string }>): WordEntry[]
  clear(): void
}

/**
 * Re-export Term so vocab consumers don't have to dig into the lesson type.
 */
export type { Term }
