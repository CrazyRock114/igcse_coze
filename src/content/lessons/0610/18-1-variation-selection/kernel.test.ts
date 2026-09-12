import { describe, expect, it } from 'vitest'
import kernel, {
  MAX_GENERATIONS,
  frequencies,
  generationsTo,
  type SelectionParams,
} from './kernel'

const base: SelectionParams = {
  startingFrequency: 2,
  pressure: 30,
  mutationRate: 0,
  generations: 25,
}

const merge = (p: Partial<SelectionParams>): SelectionParams => ({
  startingFrequency: p.startingFrequency ?? base.startingFrequency,
  pressure: p.pressure ?? base.pressure,
  mutationRate: p.mutationRate ?? base.mutationRate,
  generations: p.generations ?? base.generations,
})

const run = (p: Partial<SelectionParams> = {}) => kernel(merge(p))
const series = (p: Partial<SelectionParams> = {}) => frequencies(merge(p))

describe('selection acting on existing variation', () => {
  it('spreads an advantageous allele through the population', () => {
    const f = series()
    expect(f[f.length - 1]).toBeGreaterThan(f[0] as number)
    expect(f[f.length - 1]).toBeGreaterThan(50)
  })

  it('spreads it faster the stronger the advantage', () => {
    expect(run({ pressure: 80 }).readouts['toHalf']).toBeLessThan(
      run({ pressure: 15 }).readouts['toHalf'] as number
    )
  })

  it('rises monotonically — an advantage never makes an allele rarer', () => {
    const f = series({ pressure: 50 })
    for (let i = 1; i < f.length; i++) {
      expect(f[i], `generation ${i}`).toBeGreaterThanOrEqual(f[i - 1] as number)
    }
  })

  it('never exceeds the whole population', () => {
    const f = series({ pressure: 100, generations: MAX_GENERATIONS })
    for (const v of f) expect(v).toBeLessThanOrEqual(100)
  })
})

describe('selection cannot invent an allele', () => {
  it('does nothing at all when the allele is absent and nothing mutates', () => {
    // The single most important thing the model has to refuse to do. Selection acts on
    // variation that already exists; it cannot create it however strong the pressure.
    const f = series({ startingFrequency: 0, pressure: 100, mutationRate: 0 })
    for (const v of f) expect(v).toBe(0)
  })

  it('says so rather than leaving a flat line unexplained', () => {
    const note = run({ startingFrequency: 0, mutationRate: 0 }).markers?.[0]?.label
    expect(note?.en).toContain('only mutation')
    expect(note?.zh).toBeTruthy()
  })

  it('lets mutation supply the allele where selection cannot', () => {
    const f = series({ startingFrequency: 0, pressure: 60, mutationRate: 5 })
    expect(f[f.length - 1]).toBeGreaterThan(0)
  })

  it('mutates whether or not the allele is advantageous', () => {
    // Mutation is random with respect to advantage. If it only happened under selection
    // pressure the model would be teaching that organisms mutate on demand.
    const f = series({ startingFrequency: 0, pressure: 0, mutationRate: 10 })
    expect(f[f.length - 1]).toBeGreaterThan(0)
  })
})

describe('the control line', () => {
  it('plots the same population with no selection alongside', () => {
    const s = run().series
    expect(s.map((x) => x.key)).toContain('reference')
  })

  it('shows no change at all without selection or mutation', () => {
    const reference = run().series.find((s) => s.key === 'reference')
    const values = reference?.points.map(([, y]) => y) ?? []
    for (const v of values) expect(v).toBeCloseTo(values[0] as number, 6)
  })

  it('separates the effect of selection from the effect of mutation', () => {
    // With both running, the selected line must rise faster than mutation alone would.
    const withBoth = run({ mutationRate: 5 }).series.find((s) => s.key === 'selected')
    const mutationOnly = run({ mutationRate: 5 }).series.find((s) => s.key === 'reference')
    expect(withBoth?.points.at(-1)?.[1]).toBeGreaterThan(mutationOnly?.points.at(-1)?.[1] ?? 0)
  })
})

describe('no selection pressure', () => {
  it('leaves the frequency where it started', () => {
    const f = series({ pressure: 0, mutationRate: 0 })
    expect(f[f.length - 1]).toBeCloseTo(f[0] as number, 6)
  })

  it('says the frequency only drifts with mutation', () => {
    expect(run({ pressure: 0 }).markers?.[0]?.label.en).toContain('No selection pressure')
  })
})

describe('the readouts', () => {
  it('counts generations to reach half the population', () => {
    const f = series()
    expect(generationsTo(f, 50)).toBeGreaterThan(0)
    expect(f[generationsTo(f, 50)]).toBeGreaterThanOrEqual(50)
  })

  it('returns the last generation when the target is never reached', () => {
    const f = series({ pressure: 0, mutationRate: 0, generations: 10 })
    expect(generationsTo(f, 95)).toBe(f.length - 1)
  })

  it('returns finite readouts at every corner of the parameter space', () => {
    for (const startingFrequency of [0, 100]) {
      for (const pressure of [0, 100]) {
        for (const mutationRate of [0, 20]) {
          for (const generations of [1, MAX_GENERATIONS]) {
            const p = { startingFrequency, pressure, mutationRate, generations }
            for (const [key, value] of Object.entries(kernel(p).readouts)) {
              expect(Number.isFinite(value), `${key} at ${JSON.stringify(p)}`).toBe(true)
            }
          }
        }
      }
    }
  })
})
