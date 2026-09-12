import { describe, expect, it } from 'vitest'
import kernel, { STAGES, alongNephron, type ExcretionParams } from './kernel'

const normal: ExcretionParams = { water: 100, protein: 100, damage: 0 }

/**
 * Fills in the unset parameters explicitly.
 *
 * Spreading a `Partial` would widen every value to `number | undefined`, which the kernel's
 * index signature will not accept — and silently casting it away would let a genuinely
 * missing parameter through.
 */
const merge = (p: Partial<ExcretionParams>): ExcretionParams => ({
  water: p.water ?? normal.water,
  protein: p.protein ?? normal.protein,
  damage: p.damage ?? normal.damage,
})

const at = (p: Partial<ExcretionParams>, key: string) => alongNephron(merge(p))[key] ?? []
const urine = (p: Partial<ExcretionParams>, key: string) => at(p, key)[STAGES - 1] ?? 0

describe('glucose', () => {
  it('is filtered out of the blood completely', () => {
    // Small enough to pass, so filtration cannot keep it in — that is the point.
    expect(at({}, 'glucose')[1]).toBeCloseTo(at({}, 'glucose')[0] as number, 6)
  })

  it('is then reabsorbed completely, so none reaches the urine', () => {
    expect(urine({}, 'glucose')).toBeCloseTo(0, 6)
  })

  it('shows that a filter is the wrong picture for a kidney', () => {
    // Filtered out and taken straight back: a filter that separates once could not do it.
    const g = at({}, 'glucose')
    expect(g[1]).toBeGreaterThan(0)
    expect(g[STAGES - 1]).toBeCloseTo(0, 6)
  })
})

describe('urea', () => {
  it('is filtered out and barely reabsorbed', () => {
    const u = at({}, 'urea')
    expect(u[STAGES - 1]).toBeGreaterThan((u[0] as number) * 0.8)
  })

  it('increases when more protein is eaten', () => {
    // Excess amino acids cannot be stored, so they are deaminated and the nitrogen
    // becomes urea. More protein in means more urea out.
    expect(urine({ protein: 180 }, 'urea')).toBeGreaterThan(urine({ protein: 40 }, 'urea'))
  })
})

describe('water', () => {
  it('produces more urine when more is drunk', () => {
    expect(urine({ water: 190 }, 'water')).toBeGreaterThan(urine({ water: 20 }, 'water'))
  })

  it('reabsorbs almost all of it when little is drunk', () => {
    const filtered = at({ water: 20 }, 'water')[1] ?? 0
    expect(urine({ water: 20 }, 'water')).toBeLessThan(filtered * 0.1)
  })

  it('never reabsorbs so much that no urine is produced at all', () => {
    // Urea has to leave in something. A kidney that reclaimed every drop would poison
    // the body it was protecting.
    expect(urine({ water: 0 }, 'water')).toBeGreaterThan(0)
  })

  it('says which way round it is', () => {
    const dry = kernel({ ...normal, water: 20 }).markers?.[0]?.label.en ?? ''
    const wet = kernel({ ...normal, water: 190 }).markers?.[0]?.label.en ?? ''
    expect(dry).toContain('concentrated')
    expect(wet).toContain('dilute')
  })
})

describe('protein', () => {
  it('is never filtered out of a healthy glomerulus', () => {
    // Not selective reabsorption — it never gets into the filtrate in the first place,
    // because the molecules are too large to pass through.
    expect(at({}, 'protein')[1]).toBeCloseTo(0, 6)
    expect(urine({}, 'protein')).toBeCloseTo(0, 6)
  })

  it('appears in the urine only when the glomerulus is damaged', () => {
    expect(urine({ damage: 60 }, 'protein')).toBeGreaterThan(0)
  })

  it('warns that protein in urine means damage rather than a dietary effect', () => {
    const note = kernel({ ...normal, damage: 60 }).markers?.[0]?.label
    expect(note?.en).toContain('damaged')
    expect(note?.zh).toBeTruthy()
  })

  it('is unaffected by how much protein is eaten', () => {
    // Dietary protein raises urea, not urinary protein. Confusing the two is the
    // commonest wrong answer to "why is there protein in this urine sample?".
    expect(urine({ protein: 200 }, 'protein')).toBeCloseTo(0, 6)
  })
})

describe('the kernel', () => {
  it('follows every substance through the same four stages', () => {
    for (const s of kernel(normal).series) {
      expect(s.points, s.key).toHaveLength(STAGES)
    }
  })

  it('plots all four on one shared scale, since the lesson compares them', () => {
    const bounds = kernel(normal).series.map((s) => s.yBounds)
    for (const b of bounds) expect(b).toEqual(bounds[0])
  })

  it('returns finite readouts at every corner of the parameter space', () => {
    for (const water of [0, 200]) {
      for (const protein of [0, 200]) {
        for (const damage of [0, 100]) {
          const p = { water, protein, damage }
          for (const [key, value] of Object.entries(kernel(p).readouts)) {
            expect(Number.isFinite(value), `${key} at ${JSON.stringify(p)}`).toBe(true)
          }
        }
      }
    }
  })

  it('never reports a negative amount of anything', () => {
    for (const water of [0, 100, 200]) {
      for (const damage of [0, 100]) {
        for (const values of Object.values(alongNephron({ water, protein: 100, damage }))) {
          for (const v of values) expect(v).toBeGreaterThanOrEqual(0)
        }
      }
    }
  })
})
