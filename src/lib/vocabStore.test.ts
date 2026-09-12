// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { vocabStore, VOCAB_CHANGED_EVENT } from './vocabStore'
import type { WordEntry } from './vocabTypes'
import { DEFAULT_SRS } from './srs'

const STORAGE_KEY = 'igcse.vocab.wordbank.v1'

function clearStorage(): void {
  if (typeof localStorage === 'undefined') return
  localStorage.removeItem(STORAGE_KEY)
}

function writeRaw(payload: unknown): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
}

function makeEntry(overrides: Partial<WordEntry> = {}): WordEntry {
  return {
    termId: 'oxygen debt',
    subject: '0610',
    slug: '11-1-gas-exchange',
    addedAt: 1000,
    lastReviewed: 0,
    reviewCount: 0,
    status: 'new',
    ...DEFAULT_SRS,
    ...overrides,
  }
}

describe('vocabStore dedupe', () => {
  beforeEach(() => {
    clearStorage()
  })
  afterEach(() => {
    clearStorage()
  })

  it('read() dedupes legacy entries sharing a termId', () => {
    // Simulate the 11-1 duplicate bug: same termId, two entries,
    // second one with more review history (the one that won the
    // "last review wins" race when the user reviewed the second
    // card and the first was shadowed).
    const first = makeEntry({ addedAt: 1000, lastReviewed: 1700000000000, reviewCount: 1 })
    const second = makeEntry({ addedAt: 2000, lastReviewed: 1700001000000, reviewCount: 2 })
    writeRaw({ v: 2, words: [first, second] })
    const words = vocabStore.list()
    expect(words).toHaveLength(1)
    // First occurrence wins — the dedupe keeps the earlier entry,
    // which matches what the seed originally produced. JSON.parse
    // doesn't preserve object identity, so we check values, not refs.
    expect(words[0]?.addedAt).toBe(1000)
    expect(words[0]?.reviewCount).toBe(1)
  })

  it('dedupe persists: after a list() call the localStorage has the cleaned list', () => {
    const first = makeEntry({ addedAt: 1000 })
    const second = makeEntry({ addedAt: 2000 })
    writeRaw({ v: 2, words: [first, second] })
    vocabStore.list() // triggers dedupe + write
    const raw = localStorage.getItem(STORAGE_KEY)
    expect(raw).not.toBeNull()
    const persisted = JSON.parse(raw as string) as { v: number; words: WordEntry[] }
    expect(persisted.words).toHaveLength(1)
    expect(persisted.words[0]?.addedAt).toBe(1000)
  })

  it('ensureMany is also idempotent against future dedup gaps', () => {
    vocabStore.ensureMany([{ termId: 'a', subject: '0610', slug: 'x' }])
    vocabStore.ensureMany([{ termId: 'a', subject: '0610', slug: 'x' }])
    expect(vocabStore.list()).toHaveLength(1)
  })

  it('different termIds are not deduped', () => {
    vocabStore.ensureMany([
      { termId: 'a', subject: '0610', slug: 'x' },
      { termId: 'b', subject: '0610', slug: 'x' },
    ])
    expect(vocabStore.list()).toHaveLength(2)
  })
})

describe('vocabStore event dispatch', () => {
  beforeEach(() => clearStorage())
  afterEach(() => clearStorage())

  it('dispatches VOCAB_CHANGED_EVENT on add', () => {
    let count = 0
    const handler = (): void => {
      count++
    }
    window.addEventListener(VOCAB_CHANGED_EVENT, handler)
    vocabStore.add({ termId: 'a', subject: '0610', slug: 'x' })
    window.removeEventListener(VOCAB_CHANGED_EVENT, handler)
    expect(count).toBeGreaterThanOrEqual(1)
  })
})
