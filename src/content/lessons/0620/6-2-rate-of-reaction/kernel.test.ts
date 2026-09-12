import { describe, expect, it } from 'vitest'
import { SURFACE_FORMS, finalVolume, rateConstant, rateKernel, volumeAt } from './kernel'

const LARGE = 0
const SMALL = 1
const POWDER = 2

const base = {
  concentration: 1,
  temperature: 25,
  surfaceArea: LARGE,
  catalyst: 0,
  duration: 200,
}

describe('SURFACE_FORMS', () => {
  it('increases surface area from chips to powder', () => {
    // 0620.6.2.1 — breaking the solid up exposes more surface.
    expect(SURFACE_FORMS[SMALL]!.factor).toBeGreaterThan(SURFACE_FORMS[LARGE]!.factor)
    expect(SURFACE_FORMS[POWDER]!.factor).toBeGreaterThan(SURFACE_FORMS[SMALL]!.factor)
  })
})

describe('finalVolume', () => {
  it('depends only on concentration, because the acid is limiting', () => {
    // 0620.6.2.4 — the point students most often miss.
    expect(finalVolume(1)).toBe(60)
    expect(finalVolume(2)).toBe(120)
  })

  it('is proportional to concentration', () => {
    expect(finalVolume(3) / finalVolume(1)).toBeCloseTo(3, 10)
  })
})

describe('rateConstant', () => {
  it('roughly doubles for a 10 °C rise', () => {
    // The rule of thumb the syllabus expects.
    const cold = rateConstant(1, 25, LARGE, 0)
    const warm = rateConstant(1, 35, LARGE, 0)
    expect(warm / cold).toBeCloseTo(2, 6)
  })

  it('quadruples for a 20 °C rise', () => {
    expect(rateConstant(1, 45, LARGE, 0) / rateConstant(1, 25, LARGE, 0)).toBeCloseTo(4, 6)
  })

  it('increases with concentration', () => {
    expect(rateConstant(2, 25, LARGE, 0)).toBeGreaterThan(rateConstant(1, 25, LARGE, 0))
  })

  it('increases with surface area', () => {
    expect(rateConstant(1, 25, POWDER, 0)).toBeGreaterThan(rateConstant(1, 25, LARGE, 0))
  })

  it('increases with a catalyst', () => {
    expect(rateConstant(1, 25, LARGE, 1)).toBeGreaterThan(rateConstant(1, 25, LARGE, 0))
  })

  it('clamps an out-of-range surface index', () => {
    expect(Number.isFinite(rateConstant(1, 25, -3, 0))).toBe(true)
    expect(Number.isFinite(rateConstant(1, 25, 99, 0))).toBe(true)
  })
})

describe('volumeAt', () => {
  it('starts at zero', () => {
    expect(volumeAt(60, 0.01, 0)).toBe(0)
  })

  it('approaches the final volume without exceeding it', () => {
    for (const t of [0, 10, 100, 5000]) {
      const v = volumeAt(60, 0.01, t)
      expect(v).toBeGreaterThanOrEqual(0)
      expect(v).toBeLessThanOrEqual(60)
    }
    expect(volumeAt(60, 0.01, 5000)).toBeCloseTo(60, 6)
  })

  it('rises fastest at the start, when most reactant remains', () => {
    const k = 0.01
    const early = volumeAt(60, k, 10) - volumeAt(60, k, 0)
    const late = volumeAt(60, k, 210) - volumeAt(60, k, 200)
    expect(early).toBeGreaterThan(late)
  })
})

describe('rateKernel', () => {
  it('plots the chosen run against a fixed reference', () => {
    expect(rateKernel(base).series.map((s) => s.key)).toEqual(['chosen', 'reference'])
  })

  it('makes the two curves identical at the reference conditions', () => {
    const r = rateKernel(base)
    for (let i = 0; i < r.series[0]!.points.length; i++) {
      expect(r.series[0]!.points[i]![1]).toBeCloseTo(r.series[1]!.points[i]![1]!, 10)
    }
  })

  describe('changes the gradient but not the plateau', () => {
    it('for temperature', () => {
      // 0620.6.2.1 and .6 — heating speeds the reaction up without creating more product.
      const hot = rateKernel({ ...base, temperature: 45 })
      expect(hot.readouts['initialRate']!).toBeGreaterThan(rateKernel(base).readouts['initialRate']!)
      expect(hot.readouts['finalVolume']).toBeCloseTo(rateKernel(base).readouts['finalVolume']!, 10)
    })

    it('for surface area', () => {
      const powder = rateKernel({ ...base, surfaceArea: POWDER })
      expect(powder.readouts['initialRate']!).toBeGreaterThan(
        rateKernel(base).readouts['initialRate']!
      )
      expect(powder.readouts['finalVolume']).toBeCloseTo(
        rateKernel(base).readouts['finalVolume']!,
        10
      )
    })

    it('for a catalyst', () => {
      // 0620.6.2.2 — a catalyst is unchanged and yields no extra product.
      const cat = rateKernel({ ...base, catalyst: 1 })
      expect(cat.readouts['initialRate']!).toBeGreaterThan(rateKernel(base).readouts['initialRate']!)
      expect(cat.readouts['finalVolume']).toBeCloseTo(rateKernel(base).readouts['finalVolume']!, 10)
    })
  })

  it('changes both the gradient and the plateau for concentration', () => {
    // Concentration is different: the acid is the limiting reactant.
    const strong = rateKernel({ ...base, concentration: 2 })
    const weak = rateKernel(base)
    expect(strong.readouts['initialRate']!).toBeGreaterThan(weak.readouts['initialRate']!)
    expect(strong.readouts['finalVolume']!).toBeGreaterThan(weak.readouts['finalVolume']!)
    expect(strong.readouts['finalVolume']).toBeCloseTo(2 * weak.readouts['finalVolume']!, 10)
  })

  it('never lets the curve exceed its final volume', () => {
    for (const concentration of [0.5, 1, 2]) {
      for (const temperature of [15, 60]) {
        const r = rateKernel({ ...base, concentration, temperature, duration: 600 })
        const finalV = r.readouts['finalVolume']!
        for (const [, v] of r.series[0]!.points) {
          expect(v).toBeLessThanOrEqual(finalV + 1e-9)
        }
      }
    }
  })

  it('rises monotonically — gas is never un-produced', () => {
    const pts = rateKernel({ ...base, temperature: 40 }).series[0]!.points
    for (let i = 1; i < pts.length; i++) {
      expect(pts[i]![1]).toBeGreaterThanOrEqual(pts[i - 1]![1]!)
    }
  })

  it('reports an initial rate matching the tangent at t = 0', () => {
    // The measurement a student takes by drawing a tangent at the origin.
    const r = rateKernel({ ...base, duration: 200 })
    const pts = r.series[0]!.points
    const measured = (pts[1]![1] - pts[0]![1]) / (pts[1]![0] - pts[0]![0])
    expect(measured).toBeCloseTo(r.readouts['initialRate']!, 1)
  })

  it('reports a half-time that actually reaches half the final volume', () => {
    const r = rateKernel(base)
    const v = volumeAt(r.readouts['finalVolume']!, r.readouts['rateConstant']!, r.readouts['halfTime']!)
    expect(v).toBeCloseTo(r.readouts['finalVolume']! / 2, 6)
  })

  it('is finite everywhere across the parameter range', () => {
    for (const concentration of [0.2, 3]) {
      for (const temperature of [10, 70]) {
        for (const surfaceArea of [0, 1, 2]) {
          for (const catalyst of [0, 1]) {
            const r = rateKernel({ ...base, concentration, temperature, surfaceArea, catalyst })
            for (const [k, v] of Object.entries(r.readouts)) {
              expect(Number.isFinite(v), `${k}`).toBe(true)
            }
          }
        }
      }
    }
  })
})
