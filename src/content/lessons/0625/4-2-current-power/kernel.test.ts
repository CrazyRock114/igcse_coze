import { describe, expect, it } from 'vitest'
import kernel, {
  JOULES_PER_KWH,
  charge,
  energyJoules,
  energyKwh,
  power,
  type PowerParams,
} from './kernel'

const base: PowerParams = { voltage: 230, current: 8.7, hours: 3, pricePerKwh: 28 }
const merge = (p: Partial<PowerParams>): PowerParams => ({
  voltage: p.voltage ?? base.voltage,
  current: p.current ?? base.current,
  hours: p.hours ?? base.hours,
  pricePerKwh: p.pricePerKwh ?? base.pricePerKwh,
})
const run = (p: Partial<PowerParams> = {}) => kernel(merge(p))

describe('power', () => {
  it('is P = IV', () => {
    expect(power(230, 10)).toBe(2300)
  })

  it('gives a kettle about 3 kW on mains', () => {
    // A sanity anchor: if this comes out at 30 W or 300 kW something is wrong.
    expect(power(230, 13)).toBeGreaterThan(2500)
    expect(power(230, 13)).toBeLessThan(3500)
  })
})

describe('the kilowatt-hour', () => {
  it('is a unit of energy, not of power', () => {
    // One kilowatt for one hour. The name contains a power unit and the quantity is not
    // a power, which is where every student's intuition fails.
    expect(energyKwh(1000, 1, 1)).toBeCloseTo(1, 6)
  })

  it('is exactly 3 600 000 joules', () => {
    expect(JOULES_PER_KWH).toBe(3_600_000)
    expect(energyJoules(1000, 1, 1)).toBeCloseTo(JOULES_PER_KWH, 6)
  })

  it('describes the same energy as the joules figure', () => {
    // The two readouts must always agree, or the lesson is teaching two different
    // quantities that happen to share a name.
    for (const hours of [0.5, 3, 24]) {
      const j = energyJoules(230, 8.7, hours)
      const kwh = energyKwh(230, 8.7, hours)
      expect(kwh * JOULES_PER_KWH, `${hours} h`).toBeCloseTo(j, 3)
    }
  })

  it('gives a 2 kW heater running 3 hours 6 kW h', () => {
    expect(energyKwh(1000, 2, 3)).toBeCloseTo(6, 6)
    expect(energyJoules(1000, 2, 3)).toBeCloseTo(21_600_000, 0)
  })

  it('shows both counts side by side rather than only one', () => {
    const note = run().markers?.[0]?.label
    expect(note?.en).toContain('kW h')
    expect(note?.en).toContain('J')
    expect(note?.zh).toBeTruthy()
  })
})

describe('cost', () => {
  it('is the energy in kilowatt-hours times the price', () => {
    // 400 V is the top of the supply range the model accepts; asking for more would be
    // clamped, and a test that ignores its own clamp is testing nothing.
    const r = run({ voltage: 400, current: 5, hours: 3, pricePerKwh: 30 }).readouts
    expect(r['energyKwh']).toBeCloseTo(6, 6)
    expect(r['cost']).toBeCloseTo(180, 6)
  })

  it('doubles when the time doubles', () => {
    // Compared unrounded: the readouts are rounded to the penny, so doubling one and
    // comparing to the other can differ by a rounding step.
    const short = energyKwh(230, 8.7, 2) * 28
    const long = energyKwh(230, 8.7, 4) * 28
    expect(long).toBeCloseTo(short * 2, 6)
  })

  it('costs nothing worth counting for a low-power appliance', () => {
    // A 5 W bulb for an hour: the point of the comparison is that power matters as much
    // as time, and a student who only looks at hours gets it wrong.
    const bulb = run({ voltage: 230, current: 0.022, hours: 1 }).readouts['cost'] as number
    const kettle = run({ voltage: 230, current: 13, hours: 0.1 }).readouts['cost'] as number
    expect(bulb).toBeLessThan(kettle)
  })
})

describe('charge', () => {
  it('is current times time in seconds, not in hours', () => {
    // Q = It with t in seconds. Using hours is out by a factor of 3600.
    expect(charge(2, 1)).toBeCloseTo(7200, 6)
  })
})

describe('the kernel', () => {
  it('returns finite readouts at every corner of the parameter space', () => {
    for (const voltage of [1, 400]) {
      for (const current of [0.01, 50]) {
        for (const hours of [0.1, 24]) {
          for (const pricePerKwh of [1, 100]) {
            const p = { voltage, current, hours, pricePerKwh }
            for (const [key, value] of Object.entries(kernel(p).readouts)) {
              expect(Number.isFinite(value), `${key} at ${JSON.stringify(p)}`).toBe(true)
            }
          }
        }
      }
    }
  })

  it('starts both graphs at zero, since nothing has been used at time zero', () => {
    for (const s of run().series) {
      expect(s.points[0]?.[1]).toBeCloseTo(0, 6)
    }
  })
})
