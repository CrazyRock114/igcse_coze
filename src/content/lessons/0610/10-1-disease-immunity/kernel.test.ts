import { describe, expect, it } from 'vitest'
import kernel, {
  DURATION,
  FIRST_EXPOSURE,
  lagAfter,
  peakBetween,
  simulate,
  type ImmunityParams,
} from './kernel'

const run = (over: Partial<ImmunityParams> = {}) =>
  kernel({ secondExposure: 60, vaccinated: 0, passive: 0, ...over })

const trace = (over: Partial<ImmunityParams> = {}) =>
  simulate({ secondExposure: 60, vaccinated: 0, passive: 0, ...over })

describe('the primary response', () => {
  it('takes about a week before any antibodies appear', () => {
    // The lag is the whole reason a first infection makes you ill: the body has to find
    // and multiply the one lymphocyte that fits before it can do anything.
    const lag = run().readouts['firstLag'] ?? 0
    expect(lag).toBeGreaterThanOrEqual(5)
    expect(lag).toBeLessThanOrEqual(12)
  })

  it('produces no antibodies at all before the first exposure', () => {
    const t = trace()
    for (let i = 0; i < FIRST_EXPOSURE; i++) expect(t.antibodies[i]).toBe(0)
  })
})

describe('the secondary response', () => {
  it('is higher than the primary', () => {
    const r = run().readouts
    expect(r['secondPeak']).toBeGreaterThan(r['firstPeak'] as number)
  })

  it('is faster than the primary', () => {
    const r = run().readouts
    expect(r['secondLag']).toBeLessThan(r['firstLag'] as number)
  })

  it('needs the memory cells the first response left behind', () => {
    const t = trace()
    const atSecond = t.memory[t.day.indexOf(59)] ?? 0
    expect(atSecond).toBeGreaterThan(0)
  })

  it('happens whenever the second exposure comes, not only soon after the first', () => {
    // Memory cells persist, so a late second exposure must still get a big response.
    for (const secondExposure of [20, 60, 110]) {
      const r = run({ secondExposure }).readouts
      expect(r['secondPeak'], `day ${secondExposure}`).toBeGreaterThan(r['firstPeak'] as number)
    }
  })

  it('stops the person becoming ill the second time', () => {
    const t = trace()
    const firstIllness = Math.max(...t.pathogen.slice(FIRST_EXPOSURE, 40))
    const secondIllness = Math.max(...t.pathogen.slice(60, 90))
    expect(secondIllness).toBeLessThan(firstIllness / 3)
  })
})

describe('vaccination', () => {
  it('gives the same antibody response as an infection', () => {
    // A vaccine is a first exposure that does not make you ill. If the antibody curve
    // changed too, the model would be teaching that a vaccine is a weaker kind of immunity.
    const infected = run().readouts
    const vaccinated = run({ vaccinated: 1 }).readouts
    expect(vaccinated['firstPeak']).toBeCloseTo(infected['firstPeak'] as number, 6)
    expect(vaccinated['secondPeak']).toBeCloseTo(infected['secondPeak'] as number, 6)
  })

  it('leaves the same memory cells behind', () => {
    const a = trace()
    const b = trace({ vaccinated: 1 })
    expect(b.memory).toEqual(a.memory)
  })

  it('produces no illness from the first exposure', () => {
    const t = trace({ vaccinated: 1 })
    expect(Math.max(...t.pathogen.slice(FIRST_EXPOSURE, 50))).toBeCloseTo(0, 6)
  })
})

describe('passive immunity', () => {
  it('gives antibodies immediately, with no lag', () => {
    expect(run({ passive: 1 }).readouts['firstLag']).toBeLessThan(
      run().readouts['firstLag'] as number
    )
  })

  it('produces no memory cells, because the body made nothing itself', () => {
    expect(Math.max(...trace({ passive: 1 }).memory)).toBe(0)
  })

  it('leaves the person ill again on a second exposure', () => {
    // The control that proves memory cells are what matters: same antibodies at first,
    // no protection later.
    const t = trace({ passive: 1 })
    const secondIllness = Math.max(...t.pathogen.slice(60, 90))
    expect(secondIllness).toBeGreaterThan(30)
  })

  it('says why in the note', () => {
    const note = run({ passive: 1 }).markers?.[0]?.label
    expect(note?.en).toContain('no memory cells')
    expect(note?.zh).toBeTruthy()
  })
})

describe('the readouts', () => {
  it('measures each peak in its own window', () => {
    const t = trace()
    expect(peakBetween(t, FIRST_EXPOSURE, 59)).toBeLessThan(peakBetween(t, 60, DURATION))
  })

  it('returns finite readouts at every corner of the parameter space', () => {
    for (const secondExposure of [10, DURATION]) {
      for (const vaccinated of [0, 1]) {
        for (const passive of [0, 1]) {
          const p = { secondExposure, vaccinated, passive }
          for (const [key, value] of Object.entries(kernel(p).readouts)) {
            expect(Number.isFinite(value), `${key} at ${JSON.stringify(p)}`).toBe(true)
          }
        }
      }
    }
  })

  it('keeps the second exposure after the first, whatever is asked for', () => {
    const t = simulate({ secondExposure: 1, vaccinated: 0, passive: 0 })
    expect(lagAfter(t, FIRST_EXPOSURE)).toBeGreaterThan(0)
  })
})
