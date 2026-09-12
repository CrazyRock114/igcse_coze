import { describe, expect, it } from 'vitest'
import kernel, {
  DURATION,
  LETHAL_OXYGEN,
  dayReaching,
  simulate,
  type EutrophicationParams,
} from './kernel'

const base: EutrophicationParams = { nitrate: 80, flow: 10, day: 40 }
const merge = (p: Partial<EutrophicationParams>): EutrophicationParams => ({
  nitrate: p.nitrate ?? base.nitrate,
  flow: p.flow ?? base.flow,
  day: p.day ?? base.day,
})
const chain = (p: Partial<EutrophicationParams> = {}) => simulate(merge(p))
const run = (p: Partial<EutrophicationParams> = {}) => kernel(merge(p))

describe('the chain happens in order', () => {
  const c = chain()

  it('blooms the algae first', () => {
    expect(dayReaching(c.algae, 50)).toBeGreaterThan(0)
  })

  it('kills the plants below only after the algae have bloomed', () => {
    // The algae have to block the light before anything beneath them can be shaded out.
    expect(dayReaching(c.plants, 50, false)).toBeGreaterThan(dayReaching(c.algae, 50))
  })

  it('multiplies the decomposers after the plants have died', () => {
    expect(dayReaching(c.bacteria, 50)).toBeGreaterThan(dayReaching(c.plants, 50, false))
  })

  it('strips the oxygen only once the decomposers have started to multiply', () => {
    // Stated as the causal claim rather than as two arbitrary thresholds, which can
    // interleave: the oxygen must be untouched on every day when there are no
    // decomposers respiring.
    const startingOxygen = c.oxygen[0] as number
    for (let i = 0; i < c.day.length; i++) {
      if ((c.bacteria[i] as number) < 1) {
        expect(c.oxygen[i], `day ${i}`).toBeCloseTo(startingOxygen, 6)
      }
    }
    expect(dayReaching(c.oxygen, startingOxygen - 5, false)).toBeGreaterThanOrEqual(
      dayReaching(c.bacteria, 1)
    )
  })

  it('kills the fish last of all', () => {
    // Four steps between the fertiliser arriving and the fish dying. A model where they
    // died at once would teach that the fertiliser is toxic, which is the misconception.
    const fishDie = dayReaching(c.fish, 50, false)
    expect(fishDie).toBeGreaterThan(dayReaching(c.algae, 50))
    expect(fishDie).toBeGreaterThan(dayReaching(c.bacteria, 50))
  })

  it('leaves everything untouched on the day the nitrate arrives', () => {
    expect(c.algae[0]).toBeCloseTo(0, 6)
    expect(c.fish[0]).toBeCloseTo(100, 6)
  })
})

describe('what the fish actually die of', () => {
  it('blames the decomposers rather than the fertiliser', () => {
    const note = run({ day: 55 }).markers?.[0]?.label
    expect(note?.en).toContain('suffocated')
    expect(note?.zh).toBeTruthy()
  })

  it('never kills fish while the oxygen is still high', () => {
    const c = chain()
    for (let i = 0; i < c.day.length; i++) {
      if ((c.oxygen[i] as number) >= LETHAL_OXYGEN) {
        expect(c.fish[i], `day ${i}`).toBeCloseTo(100, 6)
      }
    }
  })
})

describe('how bad it gets', () => {
  it('does nothing at all with no nitrate added', () => {
    const c = chain({ nitrate: 0 })
    expect(Math.max(...c.algae)).toBeCloseTo(0, 6)
    expect(Math.min(...c.fish)).toBeCloseTo(100, 6)
  })

  it('gets worse the more nitrate enters', () => {
    expect(run({ nitrate: 100, day: 50 }).readouts['oxygen']).toBeLessThan(
      run({ nitrate: 30, day: 50 }).readouts['oxygen'] as number
    )
  })

  it('is eased by a faster flow, which dilutes and re-oxygenates', () => {
    expect(run({ flow: 90, day: 50 }).readouts['oxygen']).toBeGreaterThan(
      run({ flow: 0, day: 50 }).readouts['oxygen'] as number
    )
  })

  it('can save the fish entirely if the river runs fast enough', () => {
    expect(run({ nitrate: 100, flow: 100, day: 50 }).readouts['fish']).toBeCloseTo(100, 0)
  })
})

describe('dayReaching', () => {
  it('finds the first day a rising series passes a threshold', () => {
    expect(dayReaching([0, 10, 60, 90], 50)).toBe(2)
  })

  it('finds the first day a falling series drops below one', () => {
    expect(dayReaching([100, 80, 20, 5], 30, false)).toBe(2)
  })

  it('returns -1 rather than a fabricated day when it never happens', () => {
    expect(dayReaching([0, 1, 2], 50)).toBe(-1)
  })
})

describe('the kernel', () => {
  it('plots all five links on one shared scale', () => {
    const bounds = run().series.map((s) => s.yBounds)
    for (const b of bounds) expect(b).toEqual(bounds[0])
  })

  it('returns finite readouts at every corner of the parameter space', () => {
    for (const nitrate of [0, 100]) {
      for (const flow of [0, 100]) {
        for (const day of [0, DURATION]) {
          const p = { nitrate, flow, day }
          for (const [key, value] of Object.entries(kernel(p).readouts)) {
            expect(Number.isFinite(value), `${key} at ${JSON.stringify(p)}`).toBe(true)
          }
        }
      }
    }
  })

  it('never reports a negative amount of anything', () => {
    for (const nitrate of [0, 50, 100]) {
      for (const flow of [0, 100]) {
        const c = chain({ nitrate, flow })
        for (const values of [c.algae, c.plants, c.bacteria, c.oxygen, c.fish]) {
          for (const v of values) expect(v).toBeGreaterThanOrEqual(0)
        }
      }
    }
  })
})
