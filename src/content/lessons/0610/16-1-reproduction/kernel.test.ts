import { describe, expect, it } from 'vitest'
import kernel, {
  LUTEAL_PHASE,
  MAX_CYCLE,
  MIN_CYCLE,
  PERIOD_DAYS,
  hormones,
  liningThickness,
  ovulationDay,
  phaseOn,
  type ReproductionParams,
} from './kernel'

const run = (over: Partial<ReproductionParams> = {}) =>
  kernel({ cycleLength: 28, day: 1, pregnant: 0, ...over })

/** Day on which `pick` is highest, over one cycle. */
function peakDay(cycle: number, pick: (d: number) => number): number {
  let best = 1
  for (let d = 1; d <= cycle; d++) if (pick(d) > pick(best)) best = d
  return best
}

describe('when ovulation happens', () => {
  it('falls on day 14 of a 28-day cycle', () => {
    expect(ovulationDay(28)).toBe(14)
  })

  it('is counted back from the next period, not forward from the last one', () => {
    // The luteal phase is near-constant; the follicular phase is what varies. Placing
    // ovulation at "day 14" regardless of cycle length is the commonest misconception
    // in the topic, and this is the model refusing to reproduce it.
    expect(ovulationDay(21)).toBe(21 - LUTEAL_PHASE)
    expect(ovulationDay(35)).toBe(35 - LUTEAL_PHASE)
    expect(ovulationDay(35)).not.toBe(14)
  })

  it('always leaves the same number of days after it', () => {
    for (let cycle = MIN_CYCLE; cycle <= MAX_CYCLE; cycle++) {
      expect(cycle - ovulationDay(cycle), `cycle ${cycle}`).toBe(LUTEAL_PHASE)
    }
  })
})

describe('the hormones', () => {
  it('spikes LH at ovulation, which is what releases the egg', () => {
    for (const cycle of [21, 28, 35]) {
      expect(peakDay(cycle, (d) => hormones(d, cycle, false).lh), `cycle ${cycle}`).toBe(
        ovulationDay(cycle)
      )
    }
  })

  it('peaks oestrogen just before ovulation, not after it', () => {
    // The oestrogen peak is what triggers the LH surge, so it has to come first.
    const cycle = 28
    const peak = peakDay(cycle, (d) => hormones(d, cycle, false).oestrogen)
    expect(peak).toBeLessThan(ovulationDay(cycle))
  })

  it('peaks progesterone about a week after ovulation', () => {
    const cycle = 28
    const peak = peakDay(cycle, (d) => hormones(d, cycle, false).progesterone)
    expect(peak - ovulationDay(cycle)).toBeGreaterThanOrEqual(5)
    expect(peak - ovulationDay(cycle)).toBeLessThanOrEqual(9)
  })

  it('raises FSH early in the cycle, when a follicle has to be started', () => {
    const cycle = 28
    expect(hormones(3, cycle, false).fsh).toBeGreaterThan(hormones(10, cycle, false).fsh)
  })

  it('lets progesterone fall away at the end of a cycle with no pregnancy', () => {
    const cycle = 28
    const peak = hormones(ovulationDay(cycle) + 7, cycle, false).progesterone
    expect(hormones(cycle, cycle, false).progesterone).toBeLessThan(peak / 2)
  })
})

describe('a pregnancy', () => {
  const cycle = 28
  const late = ovulationDay(cycle) + 10

  it('keeps progesterone high instead of letting it fall', () => {
    expect(hormones(late, cycle, true).progesterone).toBeGreaterThan(
      hormones(late, cycle, false).progesterone
    )
    expect(hormones(cycle, cycle, true).progesterone).toBeGreaterThan(70)
  })

  it('suppresses FSH and LH, so no further egg is released', () => {
    // The same mechanism the contraceptive pill uses, which is why one explanation
    // covers both.
    expect(hormones(late, cycle, true).fsh).toBeLessThan(hormones(late, cycle, false).fsh / 2)
    expect(hormones(late, cycle, true).lh).toBeLessThan(hormones(late, cycle, false).lh / 2)
  })

  it('holds the lining thick, so there is no period', () => {
    expect(liningThickness(cycle, cycle, true)).toBeGreaterThan(
      liningThickness(cycle, cycle, false)
    )
    expect(liningThickness(cycle, cycle, true)).toBeGreaterThan(10)
  })

  it('looks identical to any other cycle for the first week after fertilisation', () => {
    // Nothing distinguishes them yet, which is exactly why a pregnancy cannot be
    // noticed immediately — so the label must not claim otherwise.
    const soon = ovulationDay(cycle) + 3
    expect(hormones(soon, cycle, true)).toEqual(hormones(soon, cycle, false))
    expect(phaseOn(soon, cycle, true)).toBe('luteal')
    expect(phaseOn(late, cycle, true)).toBe('pregnancy')
  })
})

describe('the uterus lining', () => {
  it('is shed during the period and is thinnest at the end of it', () => {
    expect(liningThickness(PERIOD_DAYS, 28, false)).toBeLessThan(liningThickness(1, 28, false))
    expect(liningThickness(PERIOD_DAYS, 28, false)).toBeLessThan(2)
  })

  it('thickens continuously from the end of the period to a week after ovulation', () => {
    const cycle = 28
    for (let d = PERIOD_DAYS + 1; d <= ovulationDay(cycle) + 7; d++) {
      expect(
        liningThickness(d, cycle, false),
        `day ${d} is not thicker than day ${d - 1}`
      ).toBeGreaterThanOrEqual(liningThickness(d - 1, cycle, false))
    }
  })

  it('breaks down again at the very end of a cycle with no pregnancy', () => {
    const cycle = 28
    expect(liningThickness(cycle, cycle, false)).toBeLessThan(
      liningThickness(cycle - 3, cycle, false)
    )
  })

  it('never goes negative or absurdly thick at any cycle length', () => {
    for (let cycle = MIN_CYCLE; cycle <= MAX_CYCLE; cycle++) {
      for (let d = 1; d <= cycle; d++) {
        for (const pregnant of [false, true]) {
          const mm = liningThickness(d, cycle, pregnant)
          expect(mm, `cycle ${cycle} day ${d}`).toBeGreaterThanOrEqual(0)
          expect(mm, `cycle ${cycle} day ${d}`).toBeLessThanOrEqual(15)
        }
      }
    }
  })
})

describe('the kernel', () => {
  it('names the phase the selected day falls in', () => {
    expect(run({ day: 2 }).markers?.[0]?.label.en).toContain('Menstruation')
    expect(run({ day: 14 }).markers?.[0]?.label.en).toContain('Ovulation')
    expect(run({ day: 25, pregnant: 1 }).markers?.[0]?.label.en).toContain('Pregnancy')
    expect(run({ day: 25, pregnant: 1 }).markers?.[0]?.label.zh).toBeTruthy()
  })

  it('reports the day of ovulation for the cycle length chosen', () => {
    expect(run({ cycleLength: 35 }).readouts['ovulation']).toBe(21)
  })

  it('plots exactly one point per day of the cycle', () => {
    for (const cycleLength of [21, 28, 35]) {
      for (const s of run({ cycleLength }).series) {
        expect(s.points, `${s.key} at ${cycleLength}`).toHaveLength(cycleLength)
      }
    }
  })

  it('holds every curve to the same fixed axes, so cycle lengths can be compared', () => {
    for (const s of run().series) expect(s.xBounds).toEqual({ min: 0, max: MAX_CYCLE })
  })

  it('returns finite readouts at every corner of the parameter space', () => {
    for (const cycleLength of [MIN_CYCLE, MAX_CYCLE]) {
      for (const day of [1, MAX_CYCLE]) {
        for (const pregnant of [0, 1]) {
          const params = { cycleLength, day, pregnant }
          for (const [key, value] of Object.entries(kernel(params).readouts)) {
            expect(Number.isFinite(value), `${key} at ${JSON.stringify(params)}`).toBe(true)
          }
        }
      }
    }
  })

  it('clamps a day beyond the end of a short cycle rather than reading off the end', () => {
    expect(run({ cycleLength: 21, day: 35 }).readouts['lining']).toBe(
      run({ cycleLength: 21, day: 21 }).readouts['lining']
    )
  })
})
