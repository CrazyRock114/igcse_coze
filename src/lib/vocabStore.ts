/**
 * Vocab store — localStorage as source of truth, with a Supabase write-through.
 *
 * Pattern: the UI calls sync `add` / `update` / `remove` / `ensureMany`.
 * The localStorage write happens first (fast, no network), then the store
 * fires a `igcse:vocab-changed` window event. The sync layer (see
 * `lib/syncManager.ts`) listens for that event and pushes the change to
 * Supabase in the background, if the user is signed in.
 *
 * Why this shape:
 *   - The localStorage is always populated, so first paint and offline
 *     use work without any network round-trip.
 *   - The Supabase write is a write-through cache: it never blocks the
 *     UI, and a transient network failure only causes the next sign-in
 *     to be missing the in-flight change, never data loss.
 *   - The sign-in flow can do a one-time migration of any localStorage
 *     data the user had before they had a Supabase account.
 */

import type { StudyStatus, VocabStore, WordEntry } from './vocabTypes'
import { DEFAULT_SRS, migrateLegacySrs } from './srs'

const STORAGE_KEY = 'igcse.vocab.wordbank.v1'
const SCHEMA_VERSION = 2
export const VOCAB_CHANGED_EVENT = 'igcse:vocab-changed'

interface Persisted {
  v: number
  words: WordEntry[]
}

function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
}

/**
 * De-duplicate by termId, keeping the first occurrence. Some lessons
 * accidentally listed the same term twice in their `glossary` array
 * (e.g. 11-1 had "oxygen debt" at index 4 and again at index 20).
 * When the bank was first seeded, that produced two entries sharing a
 * termId — the second one quietly shadowed the first, so the user saw
 * a duplicate and only the second review was recorded. Now that the
 * source lessons are deduped, the bank still has the legacy duplicates
 * for anyone who opened /vocab before this fix. Strip them on every
 * read so the in-memory bank converges to one entry per term.
 */
function dedupeByTermId(words: WordEntry[]): WordEntry[] {
  const seen = new Set<string>()
  const out: WordEntry[] = []
  for (const w of words) {
    if (seen.has(w.termId)) continue
    seen.add(w.termId)
    out.push(w)
  }
  return out
}

function read(): WordEntry[] {
  if (!isBrowser()) return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as Persisted
    if (parsed.v === 1) {
      // v1 → v2: add SRS fields to legacy entries.
      const migrated = Array.isArray(parsed.words)
        ? parsed.words.map(migrateLegacySrs)
        : []
      const cleaned = dedupeByTermId(migrated)
      if (cleaned.length !== migrated.length) write(cleaned)
      return cleaned
    }
    if (parsed.v !== SCHEMA_VERSION) {
      // Unknown version — drop to start fresh.
      return []
    }
    const words = Array.isArray(parsed.words) ? parsed.words : []
    const cleaned = dedupeByTermId(words)
    if (cleaned.length !== words.length) write(cleaned)
    return cleaned
  } catch {
    return []
  }
}

function write(words: WordEntry[]): void {
  if (!isBrowser()) return
  const payload: Persisted = { v: SCHEMA_VERSION, words }
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
  } catch {
    // Quota exceeded, private mode, etc. The store degrades silently; the UI
    // re-reads on next mount and the user sees their previous state.
  }
}

/** Notify the sync layer that localStorage changed. */
function notify(): void {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(VOCAB_CHANGED_EVENT))
  }
}

/**
 * The actual store. Tiny — five methods, all delegating to read/write. Keeping
 * the surface small means swapping the backend is a five-minute job.
 */
class LocalStorageVocabStore implements VocabStore {
  list(): WordEntry[] {
    return read()
  }

  add(entry: Omit<WordEntry, 'addedAt' | 'lastReviewed' | 'reviewCount' | 'status' | 'interval' | 'ease' | 'repetitions' | 'lapses' | 'nextDue'>): WordEntry {
    const words = read()
    const existing = words.find((w) => w.termId === entry.termId)
    if (existing) return existing
    const created: WordEntry = {
      ...entry,
      addedAt: Date.now(),
      lastReviewed: 0,
      reviewCount: 0,
      status: 'new',
      ...DEFAULT_SRS,
    }
    words.push(created)
    write(words)
    notify()
    return created
  }

  update(termId: string, patch: Partial<WordEntry>): WordEntry | null {
    const words = read()
    const idx = words.findIndex((w) => w.termId === termId)
    if (idx === -1) return null
    const next: WordEntry = { ...words[idx]!, ...patch, termId }
    words[idx] = next
    write(words)
    notify()
    return next
  }

  remove(termId: string): void {
    write(read().filter((w) => w.termId !== termId))
    notify()
  }

  ensureMany(terms: Array<{ termId: string; subject: string; slug: string }>): WordEntry[] {
    const words = read()
    const haveIds = new Set(words.map((w) => w.termId))
    const now = Date.now()
    let changed = false
    for (const t of terms) {
      if (haveIds.has(t.termId)) continue
      words.push({
        termId: t.termId,
        subject: t.subject,
        slug: t.slug,
        addedAt: now,
        lastReviewed: 0,
        reviewCount: 0,
        status: 'new',
        ...DEFAULT_SRS,
      })
      changed = true
    }
    if (changed) {
      write(words)
      notify()
    }
    return words
  }

  clear(): void {
    write([])
    notify()
  }
}

/** Singleton — module-level so the whole app sees the same data. */
export const vocabStore: VocabStore = new LocalStorageVocabStore()

/**
 * The status ladder. Called from the study-mode card and from the word-bank
 * buttons. Lifted out so the UI doesn't have to know the order.
 */
export function nextStatus(current: StudyStatus, selfAssessment: 'know' | 'unsure' | 'dont'): StudyStatus {
  if (selfAssessment === 'know') return 'known'
  if (selfAssessment === 'dont') return 'new'
  // 'unsure' keeps you where you are — but if you're new, learning is progress
  return current === 'new' ? 'learning' : current
}
