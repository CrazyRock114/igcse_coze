import { describe, expect, it } from 'vitest'
import kernel, {
  INDUSTRIAL,
  PRESSURES,
  TEMPERATURES,
  YIELD_TABLE,
  ammoniaYield,
  type EquilibriumParams,
} from './kernel'

const merge = (p: Partial<EquilibriumParams>): EquilibriumParams => ({
  temperature: p.temperature ?? 450,
  pressure: p.pressure ?? 200,
})
const run = (p: Partial<EquilibriumParams> = {}) => kernel(merge(p))

describe('the published data', () => {
  it('returns the tabulated value exactly at every tabulated point', () => {
    // The model is interpolation over real published yields. If it disagreed with the
    // reference at the reference's own points, it would be a curve of my own invention
    // wearing the data's clothes.
    PRESSURES.forEach((pressure, pi) => {
      TEMPERATURES.forEach((temperature, ti) => {
        expect(ammoniaYield(temperature, pressure), `${temperature} °C, ${pressure} atm`).toBeCloseTo(
          YIELD_TABLE[pi]![ti]!,
          6,
        )
      })
    })
  })

  it('has a complete rectangular table', () => {
    expect(YIELD_TABLE).toHaveLength(PRESSURES.length)
    for (const row of YIELD_TABLE) expect(row).toHaveLength(TEMPERATURES.length)
  })

  it('never reports a yield outside 0 to 100 per cent', () => {
    for (let t = 150; t <= 700; t += 10) {
      for (let p = 1; p <= 500; p += 10) {
        const y = ammoniaYield(t, p)
        expect(y, `${t} °C, ${p} atm`).toBeGreaterThanOrEqual(0)
        expect(y, `${t} °C, ${p} atm`).toBeLessThanOrEqual(100)
      }
    }
  })
})

describe('which way the equilibrium shifts', () => {
  it('falls as the temperature rises, at every pressure', () => {
    // The forward reaction is exothermic. A yield that rose with temperature would
    // contradict the explanation the whole lesson gives.
    for (const pressure of [10, 100, 200, 400]) {
      for (let t = 200; t < 600; t += 25) {
        expect(ammoniaYield(t + 25, pressure), `${t} °C at ${pressure} atm`).toBeLessThan(
          ammoniaYield(t, pressure),
        )
      }
    }
  })

  it('rises as the pressure rises, at every temperature', () => {
    // Four molecules of gas become two, so the equilibrium moves towards the smaller number.
    for (const temperature of [200, 300, 400, 500, 600]) {
      for (let p = 10; p < 400; p += 30) {
        expect(ammoniaYield(temperature, p + 30), `${p} atm at ${temperature} °C`).toBeGreaterThan(
          ammoniaYield(temperature, p),
        )
      }
    }
  })

  it('clamps outside the tabulated range rather than extrapolating', () => {
    // Extrapolating published data past its ends invents numbers that look measured.
    expect(ammoniaYield(100, 200)).toBeCloseTo(ammoniaYield(200, 200), 6)
    expect(ammoniaYield(900, 200)).toBeCloseTo(ammoniaYield(600, 200), 6)
    expect(ammoniaYield(450, 1)).toBeCloseTo(ammoniaYield(450, 10), 6)
    expect(ammoniaYield(450, 5000)).toBeCloseTo(ammoniaYield(450, 400), 6)
  })
})

describe('the industrial compromise', () => {
  it('gives a modest yield at the conditions a real plant uses', () => {
    // Around 25-30% at 450 °C and 200 atm. If this came out near 90% the lesson's whole
    // point — that the plant accepts a poor yield to get a usable rate — would be false.
    const y = ammoniaYield(INDUSTRIAL.temperature, INDUSTRIAL.pressure)
    expect(y).toBeGreaterThan(15)
    expect(y).toBeLessThan(40)
  })

  it('shows that a colder reactor would give a far better yield', () => {
    expect(ammoniaYield(250, 200)).toBeGreaterThan(
      ammoniaYield(INDUSTRIAL.temperature, INDUSTRIAL.pressure) * 2,
    )
  })

  it('says why the plant is not run cold', () => {
    const note = run({ temperature: 250 }).markers?.[1]?.label.en ?? ''
    expect(note).toContain('too slow')
    expect(note).toContain('catalyst')
  })

  it('says why the pressure is not raised further', () => {
    const note = run().markers?.[2]?.label.en ?? ''
    expect(note).toContain('cost rather than by chemistry')
  })

  it('gives the reason for each shift, not just the direction', () => {
    const note = run().markers?.[0]?.label.en ?? ''
    expect(note).toContain('exothermic')
    expect(note).toContain('four molecules of gas become two')
    expect(run().markers?.[0]?.label.zh).toBeTruthy()
  })
})

describe('the two panels', () => {
  it('plots yield against temperature and against pressure, in their own units', () => {
    const r = run()
    expect(r.series).toHaveLength(2)
    expect(r.series[0]?.unit.x).toBe('temperature / °C')
    expect(r.series[1]?.unit.x).toBe('pressure / atm')
  })

  it('uses a full-percentage axis on both, so the two are read on the same scale', () => {
    for (const s of run().series) {
      expect(s.yBounds).toEqual({ min: 0, max: 100 })
    }
  })

  it('redraws the temperature curve when the pressure is changed', () => {
    const low = run({ pressure: 10 }).series[0]!.points
    const high = run({ pressure: 400 }).series[0]!.points
    expect(high[10]![1]).toBeGreaterThan(low[10]![1])
  })
})

describe('the kernel', () => {
  it('returns finite readouts at every corner of the parameter space', () => {
    for (const temperature of [200, 600]) {
      for (const pressure of [10, 400]) {
        const p = { temperature, pressure }
        for (const [key, value] of Object.entries(kernel(p).readouts)) {
          expect(Number.isFinite(value), `${key} at ${JSON.stringify(p)}`).toBe(true)
        }
      }
    }
  })
})
