import { describe, expect, it } from 'vitest'
import { activityAt, decayKernel, EMISSIONS, halfLifeFrom } from './kernel'

describe('activityAt', () => {
  it('halves after one half-life', () => {
    // 0625.5.2.4.1 — the definition.
    expect(activityAt(800, 3, 3)).toBeCloseTo(400, 8)
    expect(activityAt(800, 3, 6)).toBeCloseTo(200, 8)
    expect(activityAt(800, 3, 9)).toBeCloseTo(100, 8)
  })

  it('starts at the initial rate', () => {
    expect(activityAt(640, 5, 0)).toBeCloseTo(640, 10)
  })

  it('halves in equal intervals wherever you start — the mark of exponential decay', () => {
    const h = 4
    for (const start of [0, 2.7, 9.1, 15]) {
      const a = activityAt(1000, h, start)
      const b = activityAt(1000, h, start + h)
      expect(b / a).toBeCloseTo(0.5, 8)
    }
  })

  it('never reaches zero', () => {
    expect(activityAt(800, 3, 100)).toBeGreaterThan(0)
  })

  it('decays faster for a shorter half-life', () => {
    expect(activityAt(800, 1, 5)).toBeLessThan(activityAt(800, 10, 5))
  })

  it('returns zero for a nonsensical half-life rather than NaN', () => {
    expect(activityAt(800, 0, 5)).toBe(0)
    expect(activityAt(800, -3, 5)).toBe(0)
  })
})

describe('halfLifeFrom', () => {
  it('recovers the half-life from two readings', () => {
    // Reading off a decay curve is the skill being assessed.
    expect(halfLifeFrom(800, 400, 3)).toBeCloseTo(3, 8)
    expect(halfLifeFrom(800, 200, 6)).toBeCloseTo(3, 8)
    expect(halfLifeFrom(1000, 250, 10)).toBeCloseTo(5, 8)
  })

  it('works from readings that are not whole half-lives apart', () => {
    const h = 4
    const a = activityAt(1000, h, 1.3)
    const b = activityAt(1000, h, 7.9)
    expect(halfLifeFrom(a, b, 7.9 - 1.3)).toBeCloseTo(h, 6)
  })

  it('guards against readings that cannot come from decay', () => {
    expect(halfLifeFrom(400, 800, 3)).toBe(0)
    expect(halfLifeFrom(400, 400, 3)).toBe(0)
    expect(halfLifeFrom(0, 100, 3)).toBe(0)
  })
})

describe('EMISSIONS', () => {
  it('orders penetrating power alpha < beta < gamma', () => {
    // 0625.5.2.2.2(c)
    expect(EMISSIONS.alpha.penetrating).toBeLessThan(EMISSIONS.beta.penetrating)
    expect(EMISSIONS.beta.penetrating).toBeLessThan(EMISSIONS.gamma.penetrating)
  })

  it('orders ionising effect the other way round', () => {
    // 0625.5.2.2.2(b) — the most ionising is the least penetrating.
    expect(EMISSIONS.alpha.ionising).toBeGreaterThan(EMISSIONS.beta.ionising)
    expect(EMISSIONS.beta.ionising).toBeGreaterThan(EMISSIONS.gamma.ionising)
  })

  it('records the charges used to predict deflection in a field', () => {
    // 0625.5.2.2.3
    expect(EMISSIONS.alpha.charge).toBe(+2)
    expect(EMISSIONS.beta.charge).toBe(-1)
    expect(EMISSIONS.gamma.charge).toBe(0)
  })
})

describe('decayKernel', () => {
  const base = { halfLife: 3, initialRate: 800, background: 20, duration: 12 }

  it('plots both the measured and the corrected curve', () => {
    const r = decayKernel(base)
    expect(r.series.map((s) => s.key)).toEqual(['measured', 'corrected'])
    expect(r.series[0]!.unit).toEqual({ x: 'h', y: 'counts / s' })
  })

  it('separates the two curves by exactly the background rate', () => {
    // 0625.5.2.1.5 — the correction is a subtraction, nothing more.
    const r = decayKernel(base)
    const measured = r.series[0]!.points
    const corrected = r.series[1]!.points
    for (let i = 0; i < measured.length; i++) {
      expect(measured[i]![1] - corrected[i]![1]).toBeCloseTo(base.background, 8)
    }
  })

  it('flattens the measured curve onto the background, not onto zero', () => {
    // This is why half-life cannot be read off the measured curve directly.
    const r = decayKernel({ ...base, duration: 60 })
    expect(r.readouts['measuredAtEnd']!).toBeGreaterThan(base.background * 0.99)
    expect(r.readouts['measuredAtEnd']!).toBeLessThan(base.background * 1.05)
    expect(r.readouts['rateAtEnd']!).toBeLessThan(1)
  })

  it('recovers the stated half-life from the plotted curve', () => {
    // The graph and the parameter must agree — this is the claim made to the student.
    for (const halfLife of [1, 3, 7.5]) {
      expect(decayKernel({ ...base, halfLife }).readouts['measuredHalfLife']).toBeCloseTo(
        halfLife,
        6
      )
    }
  })

  it('counts the half-lives elapsed over the plotted period', () => {
    expect(decayKernel({ ...base, halfLife: 3, duration: 12 }).readouts['halfLivesElapsed']).toBeCloseTo(4, 10)
  })

  it('reports the fraction remaining, matching one half per half-life', () => {
    const r = decayKernel({ ...base, halfLife: 3, duration: 12 })
    expect(r.readouts['fractionRemaining']).toBeCloseTo(1 / 16, 8)
  })

  it('starts the corrected curve at the initial rate', () => {
    const r = decayKernel(base)
    expect(r.series[1]!.points[0]![1]).toBeCloseTo(base.initialRate, 8)
  })

  it('decreases monotonically', () => {
    const pts = decayKernel(base).series[1]!.points
    for (let i = 1; i < pts.length; i++) {
      expect(pts[i]![1]).toBeLessThan(pts[i - 1]![1]!)
    }
  })

  it('is finite everywhere across the parameter range', () => {
    for (const halfLife of [0.5, 3, 12]) {
      for (const initialRate of [100, 1000]) {
        for (const background of [0, 50]) {
          for (const duration of [2, 24]) {
            const r = decayKernel({ halfLife, initialRate, background, duration })
            for (const [k, v] of Object.entries(r.readouts)) {
              expect(Number.isFinite(v), `${k}`).toBe(true)
            }
          }
        }
      }
    }
  })
})
