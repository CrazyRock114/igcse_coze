import { describe, expect, it } from 'vitest'
import {
  buildTodayQueue,
  computeStats,
  DEFAULT_SRS,
  isDue,
  migrateLegacySrs,
  nextSchedule,
  qualityOf,
} from './srs'
import type { WordEntry } from './vocabTypes'

const DAY = 24 * 60 * 60 * 1000

function makeEntry(overrides: Partial<WordEntry> = {}): WordEntry {
  return {
    termId: 'x',
    subject: '0610',
    slug: '7-1',
    addedAt: 0,
    lastReviewed: 0,
    reviewCount: 0,
    status: 'new',
    ...DEFAULT_SRS,
    ...overrides,
  }
}

describe('qualityOf', () => {
  it('maps self-assessments to SM-2 quality scores', () => {
    expect(qualityOf('know')).toBe(5)
    expect(qualityOf('unsure')).toBe(3)
    expect(qualityOf('dont')).toBe(1)
  })
})

describe('nextSchedule — first review', () => {
  it('a correct first review schedules 1 day out', () => {
    const now = 1_000_000
    const next = nextSchedule(makeEntry(), 'know', now)
    expect(next.interval).toBe(1)
    expect(next.repetitions).toBe(1)
    expect(next.lapses).toBe(0)
    expect(next.nextDue).toBe(now + 1 * DAY)
  })

  it('a wrong first review schedules 1 day out, increments lapses', () => {
    const now = 1_000_000
    const next = nextSchedule(makeEntry(), 'dont', now)
    expect(next.interval).toBe(1)
    expect(next.repetitions).toBe(0)
    expect(next.lapses).toBe(1)
    expect(next.nextDue).toBe(now + 1 * DAY)
  })

  it('an unsure first review (q=3) counts as a pass — repetitions becomes 1', () => {
    // SM-2 threshold: q >= 3 is a pass. "unsure" maps to q=3.
    const next = nextSchedule(makeEntry(), 'unsure', 0)
    expect(next.repetitions).toBe(1)
    expect(next.interval).toBe(1)
  })
})

describe('nextSchedule — second correct review', () => {
  it('jumps to 6 days', () => {
    const first = nextSchedule(makeEntry(), 'know', 0)
    const second = nextSchedule({ ...makeEntry(), ...first }, 'know', 1 * DAY)
    expect(second.interval).toBe(6)
    expect(second.repetitions).toBe(2)
  })
})

describe('nextSchedule — third+ correct reviews', () => {
  it('scales by ease', () => {
    let e = makeEntry()
    e = { ...e, ...nextSchedule(e, 'know', 0) }
    e = { ...e, ...nextSchedule(e, 'know', 1 * DAY) }
    const third = nextSchedule(e, 'know', 7 * DAY)
    // After two correct reviews, ease climbed 2.5 → 2.6 → 2.7 (clamped later).
    // interval = round(6 * 2.7) = 16.
    expect(third.interval).toBeGreaterThanOrEqual(15)
    expect(third.interval).toBeLessThanOrEqual(17)
    expect(third.repetitions).toBe(3)
  })
})

describe('nextSchedule — ease floor and ceiling', () => {
  it('ease does not drop below 1.3', () => {
    let e = makeEntry()
    for (let i = 0; i < 10; i++) {
      e = { ...e, ...nextSchedule(e, 'dont', 0) }
    }
    expect(e.ease).toBeGreaterThanOrEqual(1.3)
  })

  it('ease does not exceed 2.8', () => {
    let e = makeEntry()
    for (let i = 0; i < 10; i++) {
      e = { ...e, ...nextSchedule(e, 'know', 0) }
    }
    expect(e.ease).toBeLessThanOrEqual(2.8)
  })
})

describe('isDue', () => {
  it('a never-scheduled word is due', () => {
    expect(isDue(makeEntry())).toBe(true)
  })
  it('a word whose next-due is in the past is due', () => {
    expect(isDue(makeEntry({ nextDue: 100 }))).toBe(true)
  })
  it('a word whose next-due is in the future is not due', () => {
    const future = Date.now() + 10 * DAY
    expect(isDue(makeEntry({ nextDue: future }))).toBe(false)
  })
})

describe('buildTodayQueue', () => {
  it('orders lapsed → new → due, in stable input order within each bucket', () => {
    const now = 10_000
    const lapsed = makeEntry({ termId: 'a', lapses: 1, nextDue: now - DAY, status: 'learning' })
    // b: fresh, never reviewed
    const b = makeEntry({ termId: 'b', nextDue: 0, status: 'new' })
    // c: due, but with prior review history → goes to "rest", not "fresh"
    const c = makeEntry({ termId: 'c', nextDue: now - DAY, status: 'learning', reviewCount: 2 })
    const future = makeEntry({ termId: 'd', nextDue: now + 10 * DAY, status: 'learning' })
    const queue = buildTodayQueue([c, future, b, lapsed], now)
    expect(queue.map((w) => w.termId)).toEqual(['a', 'b', 'c'])
  })
})

describe('migrateLegacySrs', () => {
  it('adds SRS fields to an entry that has none', () => {
    const legacy: WordEntry = makeEntry({ lastReviewed: 0, status: 'new' })
    delete (legacy as Partial<WordEntry>).interval
    const migrated = migrateLegacySrs(legacy)
    expect(migrated.interval).toBe(0)
    expect(migrated.ease).toBe(2.5)
    expect(migrated.repetitions).toBe(0)
    expect(migrated.lapses).toBe(0)
    expect(migrated.nextDue).toBe(0)
  })

  it('treats a previously-reviewed entry as 6 days out', () => {
    const legacy = makeEntry({ lastReviewed: 1_000_000, status: 'learning' })
    delete (legacy as Partial<WordEntry>).interval
    const migrated = migrateLegacySrs(legacy)
    expect(migrated.interval).toBe(6)
    expect(migrated.repetitions).toBe(2)
    expect(migrated.nextDue).toBe(1_000_000 + 6 * DAY)
  })

  it('is idempotent on entries that already have SRS fields', () => {
    const e = makeEntry({ interval: 12, ease: 2.6, repetitions: 4, lapses: 1, nextDue: 999 })
    const migrated = migrateLegacySrs(e)
    expect(migrated.interval).toBe(12)
    expect(migrated.ease).toBe(2.6)
  })
})

describe('computeStats', () => {
  it('counts by status and computes due-today', () => {
    const now = 100_000
    const words = [
      makeEntry({ termId: 'a', status: 'new', nextDue: 0 }),
      makeEntry({ termId: 'b', status: 'learning', nextDue: 0 }),
      makeEntry({ termId: 'c', status: 'known', nextDue: now - DAY }),
      makeEntry({ termId: 'd', status: 'known', nextDue: now + 10 * DAY }),
    ]
    const stats = computeStats(words, now)
    expect(stats.total).toBe(4)
    expect(stats.new).toBe(1)
    expect(stats.learning).toBe(1)
    expect(stats.known).toBe(2)
    expect(stats.dueToday).toBe(3) // a, b, c (d is in future)
    expect(stats.lapsedCount).toBe(0)
  })

  it('counts lapses', () => {
    const now = 100_000
    const words = [
      makeEntry({ termId: 'a', lapses: 1, nextDue: 0 }),
      makeEntry({ termId: 'b', lapses: 3, nextDue: 0 }),
    ]
    expect(computeStats(words, now).lapsedCount).toBe(2)
  })
})
