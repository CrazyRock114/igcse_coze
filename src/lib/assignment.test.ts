import { describe, expect, it } from 'vitest'
import {
  correctCount,
  isComplete,
  placedCount,
  placementKey,
  placementParams,
  readAssignment,
  type AssignmentItem,
  type AssignmentTarget,
} from './assignment'

const targets: AssignmentTarget[] = [
  { id: 'acid', label: { en: 'Acid' }, hint: { en: 'pH below 7' } },
  { id: 'alkali', label: { en: 'Alkali' } },
]

const items: AssignmentItem[] = [
  { id: 'hcl', label: { en: 'Hydrochloric acid' }, target: 'acid' },
  { id: 'naoh', label: { en: 'Sodium hydroxide' }, target: 'alkali' },
]

describe('placementParams', () => {
  it('declares one hidden parameter per item, spanning unplaced to the last target', () => {
    const params = placementParams(items, targets.length)
    expect(params).toHaveLength(2)
    expect(params[0]?.key).toBe(placementKey('hcl'))
    expect(params[0]?.hidden).toBe(true)
    // 0 means unplaced, so the range has to reach one past the number of targets.
    expect(params[0]?.min).toBe(0)
    expect(params[0]?.max).toBe(2)
    expect(params[0]?.default).toBe(0)
  })
})

describe('readAssignment', () => {
  it('leaves an item unplaced when its parameter is absent or zero', () => {
    const a = readAssignment(items, targets, {})
    expect(a.items.every((i) => i.placed === undefined)).toBe(true)
    expect(placedCount(a)).toBe(0)
    expect(correctCount(a)).toBe(0)
  })

  it('resolves a parameter to the nth target, counting from one', () => {
    const a = readAssignment(items, targets, { [placementKey('hcl')]: 1 })
    expect(a.items.find((i) => i.id === 'hcl')?.placed).toBe('acid')
  })

  it('ignores an index past the last target rather than wrapping round', () => {
    // One shared range serves exercises with different numbers of bins, so out-of-range
    // is a normal state, not a fault — it has to read as "not placed anywhere".
    const a = readAssignment(items, targets, { [placementKey('hcl')]: 5 })
    expect(a.items.find((i) => i.id === 'hcl')?.placed).toBeUndefined()
  })

  it('rounds a fractional parameter, since a slider step could produce one', () => {
    const a = readAssignment(items, targets, { [placementKey('naoh')]: 1.9 })
    expect(a.items.find((i) => i.id === 'naoh')?.placed).toBe('alkali')
  })

  it('carries a hint through only when the target has one', () => {
    const a = readAssignment(items, targets, {})
    expect(a.targets[0]?.hint?.en).toBe('pH below 7')
    expect(a.targets[1]).not.toHaveProperty('hint')
  })
})

describe('scoring', () => {
  it('counts a wrong placement as placed but not correct', () => {
    const a = readAssignment(items, targets, {
      [placementKey('hcl')]: 2, // into Alkali — wrong
      [placementKey('naoh')]: 2, // into Alkali — right
    })
    expect(placedCount(a)).toBe(2)
    expect(correctCount(a)).toBe(1)
    expect(isComplete(a)).toBe(false)
  })

  it('is complete only when every item is on its own target', () => {
    const done = readAssignment(items, targets, {
      [placementKey('hcl')]: 1,
      [placementKey('naoh')]: 2,
    })
    expect(isComplete(done)).toBe(true)

    // Half finished, with nothing yet wrong, is still not complete.
    const half = readAssignment(items, targets, { [placementKey('hcl')]: 1 })
    expect(correctCount(half)).toBe(1)
    expect(isComplete(half)).toBe(false)
  })
})
