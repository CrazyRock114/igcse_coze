import { describe, expect, it } from 'vitest'
import kernel, {
  DENATURE_ABOVE,
  DURATION,
  OPTIMUM_PH,
  OPTIMUM_TEMPERATURE,
  actualTemperature,
  oxygenFactor,
  phFactor,
  simulate,
  temperatureFactor,
  type FermenterParams,
} from './kernel'

const base: FermenterParams = { target: 30, oxygen: 100, ph: 6.5, cooling: 100 }
const merge = (p: Partial<FermenterParams>): FermenterParams => ({
  target: p.target ?? base.target,
  oxygen: p.oxygen ?? base.oxygen,
  ph: p.ph ?? base.ph,
  cooling: p.cooling ?? base.cooling,
})
const run = (p: Partial<FermenterParams> = {}) => kernel(merge(p))

describe('the fermenter heats itself', () => {
  it('runs hotter than its target when the cooling is poor', () => {
    // Respiration releases heat and a large vessel cannot shed it, which is why the
    // industrial problem is cooling rather than heating.
    expect(actualTemperature(merge({ cooling: 0 }))).toBeGreaterThan(
      actualTemperature(merge({ cooling: 100 }))
    )
  })

  it('holds the target exactly when the cooling is perfect', () => {
    expect(actualTemperature(merge({ cooling: 100 }))).toBeCloseTo(30, 6)
  })

  it('cooks the culture with its own waste heat if the cooling fails', () => {
    const failed = run({ cooling: 0 })
    expect(failed.readouts['temperature']).toBeGreaterThanOrEqual(DENATURE_ABOVE)
    expect(failed.readouts['growthRate']).toBe(0)
    expect(failed.readouts['yield']).toBe(0)
  })

  it('says the heat came from the culture rather than from outside', () => {
    const note = run({ cooling: 0 }).markers?.[0]?.label
    expect(note?.en).toContain('Respiration released this heat')
    expect(note?.zh).toBeTruthy()
  })
})

describe('each condition has an optimum', () => {
  it('peaks the temperature factor at the optimum and collapses above it', () => {
    expect(temperatureFactor(OPTIMUM_TEMPERATURE)).toBeCloseTo(1, 6)
    expect(temperatureFactor(OPTIMUM_TEMPERATURE - 10)).toBeLessThan(1)
    expect(temperatureFactor(DENATURE_ABOVE)).toBe(0)
    expect(temperatureFactor(DENATURE_ABOVE + 10)).toBe(0)
  })

  it('peaks the pH factor at the optimum and falls away either side', () => {
    expect(phFactor(OPTIMUM_PH)).toBeCloseTo(1, 6)
    expect(phFactor(OPTIMUM_PH - 2)).toBeLessThan(1)
    expect(phFactor(OPTIMUM_PH + 2)).toBeLessThan(1)
  })

  it('saturates the oxygen factor, because more than enough is not better', () => {
    const gain = (a: number, b: number) => oxygenFactor(b) - oxygenFactor(a)
    expect(gain(100, 200)).toBeLessThan(gain(0, 100))
    expect(oxygenFactor(1e6)).toBeLessThanOrEqual(1)
  })

  it('gives no growth at all with no oxygen', () => {
    expect(run({ oxygen: 0 }).readouts['growthRate']).toBe(0)
  })
})

describe('the yield', () => {
  it('is highest when all four conditions are near their optimum', () => {
    const best = run().readouts['yield'] ?? 0
    for (const p of [{ ph: 3 }, { oxygen: 5 }, { cooling: 40 }, { target: 44 }]) {
      expect(run(p).readouts['yield'], JSON.stringify(p)).toBeLessThan(best)
    }
  })

  it('grows the culture towards a ceiling rather than without limit', () => {
    // Nutrients and space run out, so a fermenter is a batch process.
    const t = simulate(base)
    expect(t.biomass[t.biomass.length - 1]).toBeLessThanOrEqual(100)
    const late = (t.biomass[DURATION] ?? 0) - (t.biomass[DURATION - 4] ?? 0)
    const early = (t.biomass[8] ?? 0) - (t.biomass[4] ?? 0)
    expect(late).toBeLessThan(early)
  })

  it('never produces anything from a dead culture', () => {
    expect(run({ target: 45, cooling: 100 }).readouts['yield']).toBe(0)
  })
})

describe('the kernel', () => {
  it('returns finite readouts at every corner of the parameter space', () => {
    for (const target of [5, 45]) {
      for (const oxygen of [0, 200]) {
        for (const ph of [3, 10]) {
          for (const cooling of [0, 100]) {
            const p = { target, oxygen, ph, cooling }
            for (const [key, value] of Object.entries(kernel(p).readouts)) {
              expect(Number.isFinite(value), `${key} at ${JSON.stringify(p)}`).toBe(true)
            }
          }
        }
      }
    }
  })

  it('never reports a negative biomass or yield', () => {
    for (const cooling of [0, 50, 100]) {
      const t = simulate(merge({ cooling }))
      for (const v of [...t.biomass, ...t.product]) expect(v).toBeGreaterThanOrEqual(0)
    }
  })
})
