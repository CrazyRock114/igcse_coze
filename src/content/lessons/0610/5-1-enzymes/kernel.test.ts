import { describe, expect, it } from 'vitest'
import { ENZYMES, activity, enzymeKernel, phFactor, temperatureFactor } from './kernel'

const at = (key: string) => ENZYMES.find((e) => e.key === key)!
const index = (key: string) => ENZYMES.findIndex((e) => e.key === key)

function run(key: string, temperature = 37, ph = 7) {
  return enzymeKernel({ enzyme: index(key), temperature, ph })
}

describe('ENZYMES', () => {
  it('covers enzymes working at different pH values', () => {
    // The point of the set: pepsin in stomach acid, lipase in the alkaline small intestine.
    expect(at('pepsin').optimumPh).toBe(2)
    expect(at('amylase').optimumPh).toBe(7)
    expect(at('lipase').optimumPh).toBe(8)
  })

  it('includes an enzyme whose optimum temperature is not 37 °C', () => {
    // So that 37 does not look like a property of enzymes rather than of us.
    expect(ENZYMES.some((e) => e.optimumTemperature > 50)).toBe(true)
  })

  it('describes where each one works, in both languages', () => {
    for (const e of ENZYMES) {
      expect(e.label.zh, e.key).toBeTruthy()
      expect(e.where.zh, e.key).toBeTruthy()
      expect(e.where.en.length, e.key).toBeGreaterThan(30)
    }
  })
})

describe('temperatureFactor', () => {
  it('is exactly 1 at the optimum', () => {
    expect(temperatureFactor(37, 37)).toBeCloseTo(1, 6)
    expect(temperatureFactor(70, 70)).toBeCloseTo(1, 6)
  })

  it('roughly doubles for every 10 °C below the optimum', () => {
    // 0610.5.1.8 — more kinetic energy means more frequent effective collisions.
    expect(temperatureFactor(27, 37) * 2).toBeCloseTo(temperatureFactor(37, 37), 6)
    expect(temperatureFactor(17, 37) * 4).toBeCloseTo(temperatureFactor(37, 37), 6)
  })

  it('rises all the way up to the optimum', () => {
    for (let t = 1; t <= 37; t++) {
      expect(temperatureFactor(t, 37)).toBeGreaterThan(temperatureFactor(t - 1, 37))
    }
  })

  it('falls far faster above the optimum than it rose below it', () => {
    // The asymmetry is the whole point: warming is gradual, denaturation is a cliff.
    const climb = temperatureFactor(37, 37) - temperatureFactor(27, 37)
    const fall = temperatureFactor(37, 37) - temperatureFactor(47, 37)
    expect(fall).toBeGreaterThan(climb * 1.5)
  })

  it('is effectively zero well past the optimum', () => {
    expect(temperatureFactor(60, 37)).toBeLessThan(0.01)
    expect(temperatureFactor(80, 37)).toBeLessThan(0.001)
  })

  it('never goes negative or above one', () => {
    for (let t = 0; t <= 90; t++) {
      for (const opt of [37, 70]) {
        const f = temperatureFactor(t, opt)
        expect(f, `T=${t} opt=${opt}`).toBeGreaterThanOrEqual(0)
        expect(f, `T=${t} opt=${opt}`).toBeLessThanOrEqual(1)
      }
    }
  })
})

describe('phFactor', () => {
  it('is 1 at the optimum and symmetric either side', () => {
    // 0610.5.1.9 — too acidic and too alkaline damage the active site the same way.
    expect(phFactor(7, 7)).toBeCloseTo(1, 6)
    expect(phFactor(5, 7)).toBeCloseTo(phFactor(9, 7), 6)
    expect(phFactor(2, 7)).toBeCloseTo(phFactor(12, 7), 6)
  })

  it('falls away either side of the optimum', () => {
    for (const d of [1, 2, 3, 4]) {
      expect(phFactor(7 + d, 7)).toBeLessThan(phFactor(7 + d - 1, 7))
      expect(phFactor(7 - d, 7)).toBeLessThan(phFactor(7 - d + 1, 7))
    }
  })

  it('never goes negative or above one', () => {
    for (let p = 0; p <= 14; p += 0.5) {
      for (const opt of [2, 7, 8]) {
        const f = phFactor(p, opt)
        expect(f).toBeGreaterThanOrEqual(0)
        expect(f).toBeLessThanOrEqual(1)
      }
    }
  })
})

describe('activity', () => {
  it('reaches 100% only in the enzyme’s own best conditions', () => {
    expect(activity(at('pepsin'), 37, 2)).toBe(100)
    expect(activity(at('lipase'), 37, 8)).toBe(100)
    expect(activity(at('thermophile'), 70, 7)).toBe(100)
  })

  it('multiplies the two factors rather than taking the worse of them', () => {
    // Both conditions slightly off is worse than either one alone.
    const e = at('amylase')
    const tempOnly = activity(e, 27, 7)
    const phOnly = activity(e, 37, 5.5)
    expect(activity(e, 27, 5.5)).toBeLessThan(Math.min(tempOnly, phOnly))
  })

  it('nearly stops pepsin at neutral pH, where amylase is at its best', () => {
    // The same conditions suit one enzyme and ruin another — that is specificity.
    expect(activity(at('pepsin'), 37, 7)).toBeLessThan(5)
    expect(activity(at('amylase'), 37, 7)).toBe(100)
  })

  it('nearly stops amylase in stomach acid, where pepsin is at its best', () => {
    expect(activity(at('amylase'), 37, 2)).toBeLessThan(5)
    expect(activity(at('pepsin'), 37, 2)).toBe(100)
  })

  it('is never negative', () => {
    for (const e of ENZYMES) {
      for (let t = 0; t <= 90; t += 5) {
        for (let p = 0; p <= 14; p += 1) {
          expect(activity(e, t, p), `${e.key} ${t} ${p}`).toBeGreaterThanOrEqual(0)
        }
      }
    }
  })
})

describe('enzymeKernel', () => {
  it('plots temperature and pH on separate axes', () => {
    const r = run('amylase')
    expect(r.series).toHaveLength(2)
    expect(r.series[0]!.unit.x).toBe('temperature / °C')
    expect(r.series[1]!.unit.x).toBe('pH')
    expect(r.series[0]!.unit.y).toBe(r.series[1]!.unit.y)
  })

  it('pins both activity axes to 0–100', () => {
    // Otherwise a curve at the wrong pH would rescale and look normal.
    for (const s of run('amylase').series) {
      expect(s.yBounds).toEqual({ min: 0, max: 100 })
    }
  })

  it('shrinks the whole temperature curve when the pH is wrong', () => {
    const right = run('pepsin', 37, 2).series[0]!.points
    const wrong = run('pepsin', 37, 7).series[0]!.points
    const peak = (pts: Array<[number, number]>) => Math.max(...pts.map(([, y]) => y))
    expect(peak(right)).toBe(100)
    expect(peak(wrong)).toBeLessThan(10)
  })

  it('moves the temperature peak with the enzyme, not the pH peak', () => {
    const peakAt = (pts: Array<[number, number]>) =>
      pts.reduce((best, p) => (p[1] > best[1] ? p : best))[0]
    expect(peakAt(run('amylase', 37, 7).series[0]!.points)).toBe(37)
    expect(peakAt(run('thermophile', 70, 7).series[0]!.points)).toBe(70)
    expect(peakAt(run('pepsin', 37, 2).series[1]!.points)).toBeCloseTo(2, 1)
  })

  it('redraws the pH curve at whatever temperature is set', () => {
    const warm = run('amylase', 37, 7).series[1]!.points
    const cold = run('amylase', 10, 7).series[1]!.points
    const peak = (pts: Array<[number, number]>) => Math.max(...pts.map(([, y]) => y))
    expect(peak(warm)).toBeGreaterThan(peak(cold) * 3)
  })

  it('flags the enzyme as denatured once it is well past its optimum', () => {
    expect(run('amylase', 37, 7).readouts['denatured']).toBe(0)
    expect(run('amylase', 60, 7).readouts['denatured']).toBe(1)
    // A thermophile is not denatured at a temperature that would destroy amylase.
    expect(run('thermophile', 60, 7).readouts['denatured']).toBe(0)
  })

  it('reports the optimum conditions of the enzyme chosen', () => {
    const r = run('lipase')
    expect(r.readouts['optimumTemperature']).toBe(37)
    expect(r.readouts['optimumPh']).toBe(8)
  })

  it('clamps parameters outside their range', () => {
    expect(enzymeKernel({ enzyme: -2, temperature: 37, ph: 2 }).readouts['activity']).toBe(100)
    expect(enzymeKernel({ enzyme: 99, temperature: 70, ph: 7 }).readouts['activity']).toBe(100)
    expect(enzymeKernel({ enzyme: 1, temperature: -20, ph: 7 }).readouts['activity'])
      .toBeGreaterThanOrEqual(0)
    expect(enzymeKernel({ enzyme: 1, temperature: 37, ph: 99 }).readouts['activity'])
      .toBeGreaterThanOrEqual(0)
  })

  it('is finite everywhere across the parameter range', () => {
    for (let enzyme = 0; enzyme < ENZYMES.length; enzyme++) {
      for (const temperature of [0, 20, 37, 55, 90]) {
        for (const ph of [0, 2, 7, 14]) {
          const r = enzymeKernel({ enzyme, temperature, ph })
          for (const [k, v] of Object.entries(r.readouts)) {
            expect(Number.isFinite(v), `${k} ${enzyme} ${temperature} ${ph}`).toBe(true)
          }
          for (const s of r.series) {
            for (const [, y] of s.points) expect(Number.isFinite(y)).toBe(true)
          }
        }
      }
    }
  })
})
