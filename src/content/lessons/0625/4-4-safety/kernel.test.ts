import { describe, expect, it } from 'vitest'
import kernel, {
  FUSE_RATINGS,
  dividerVoltage,
  seriesCurrent,
  suitableFuse,
  type SafetyParams,
} from './kernel'

const base: SafetyParams = { supply: 12, r1: 100, r2: 200, fuseRating: 3 }
const merge = (p: Partial<SafetyParams>): SafetyParams => ({
  supply: p.supply ?? base.supply,
  r1: p.r1 ?? base.r1,
  r2: p.r2 ?? base.r2,
  fuseRating: p.fuseRating ?? base.fuseRating,
})
const run = (p: Partial<SafetyParams> = {}) => kernel(merge(p))

describe('the potential divider', () => {
  it('splits the supply in the ratio of the resistances', () => {
    // 100 and 200 out of 12 V gives 4 V and 8 V.
    expect(dividerVoltage(12, 100, 200)).toBeCloseTo(4, 6)
    expect(12 - dividerVoltage(12, 100, 200)).toBeCloseTo(8, 6)
  })

  it('always makes the two voltages add to the supply', () => {
    // The constraint the ratio rule on its own hides, and the reason both are plotted.
    for (const [supply, r1, r2] of [[12, 100, 200], [230, 47, 3], [5, 1000, 1]] as const) {
      const v1 = dividerVoltage(supply, r1, r2)
      expect(v1 + (supply - v1), `${supply}/${r1}/${r2}`).toBeCloseTo(supply, 6)
    }
  })

  it('gives equal resistances half the supply each', () => {
    expect(dividerVoltage(12, 150, 150)).toBeCloseTo(6, 6)
  })

  it('lowers the other share when one resistance is raised', () => {
    // Doubling one resistance does not double its share, because they must still add up.
    const before = dividerVoltage(12, 100, 200)
    const after = dividerVoltage(12, 200, 200)
    expect(after).toBeGreaterThan(before)
    expect(after).toBeLessThan(before * 2)
  })

  it('obeys V₁/V₂ = R₁/R₂', () => {
    const v1 = dividerVoltage(12, 100, 200)
    const v2 = 12 - v1
    expect(v1 / v2).toBeCloseTo(100 / 200, 6)
  })
})

describe('choosing a fuse', () => {
  it('picks the smallest standard rating above the working current', () => {
    expect(suitableFuse(0.5)).toBe(1)
    expect(suitableFuse(2.2)).toBe(3)
    expect(suitableFuse(4.0)).toBe(5)
    expect(suitableFuse(8.7)).toBe(10)
  })

  it('never picks a rating at or below the working current', () => {
    // A fuse rated at the working current blows in normal use, which protects nothing
    // and breaks the appliance.
    for (const current of [0.1, 1, 2.9, 3, 4.5, 12.9]) {
      expect(suitableFuse(current), `${current} A`).toBeGreaterThan(current)
    }
  })

  it('only ever returns a rating that fuses are actually made in', () => {
    for (const current of [0.2, 2, 6, 11]) {
      expect(FUSE_RATINGS).toContain(suitableFuse(current))
    }
  })

  it('warns when the fitted fuse would blow in normal use', () => {
    const note = run({ supply: 230, r1: 20, r2: 20, fuseRating: 1 }).markers?.[0]?.label
    expect(note?.en).toContain('blow in normal use')
    expect(note?.zh).toBeTruthy()
  })

  it('warns when the fitted fuse is too large to protect anything', () => {
    const note = run({ supply: 12, r1: 100, r2: 200, fuseRating: 13 }).markers?.[0]?.label.en ?? ''
    expect(note).toContain('larger than needed')
  })

  it('approves a correctly chosen fuse', () => {
    const current = seriesCurrent(12, 100, 200)
    const note = run({ fuseRating: suitableFuse(current) }).markers?.[0]?.label.en ?? ''
    expect(note).toContain('right choice')
  })
})

describe('the kernel', () => {
  it('returns finite readouts at every corner of the parameter space', () => {
    for (const supply of [1, 250]) {
      for (const r1 of [1, 1000]) {
        for (const r2 of [1, 1000]) {
          for (const fuseRating of [1, 13]) {
            const p = { supply, r1, r2, fuseRating }
            for (const [key, value] of Object.entries(kernel(p).readouts)) {
              expect(Number.isFinite(value), `${key} at ${JSON.stringify(p)}`).toBe(true)
            }
          }
        }
      }
    }
  })

  it('reports two voltages that add to the supply', () => {
    const r = run({ supply: 230, r1: 330, r2: 470 }).readouts
    expect((r['v1'] as number) + (r['v2'] as number)).toBeCloseTo(230, 1)
  })
})
