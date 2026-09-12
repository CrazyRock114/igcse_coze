import { describe, expect, it } from 'vitest'
import { METRES_PER_LIGHT_YEAR, recessionSpeed, universeAge, universeKernel } from './kernel'

const base = { hubbleConstant: 2.2, galaxyCount: 12, scatter: 0.5 }

describe('METRES_PER_LIGHT_YEAR', () => {
  it('uses the value the syllabus quotes', () => {
    // 0625.6.2.2.2
    expect(METRES_PER_LIGHT_YEAR).toBeCloseTo(9.5e15, -10)
  })
})

describe('recessionSpeed', () => {
  it('is proportional to distance — Hubble’s law', () => {
    // 0625.6.2.3.9
    const near = recessionSpeed(2.2, 100)
    const far = recessionSpeed(2.2, 300)
    expect(far).toBeCloseTo(3 * near, 6)
  })

  it('is proportional to the Hubble constant', () => {
    expect(recessionSpeed(4.4, 100)).toBeCloseTo(2 * recessionSpeed(2.2, 100), 6)
  })

  it('is zero at zero distance, so the line passes through the origin', () => {
    expect(recessionSpeed(2.2, 0)).toBe(0)
  })

  it('gives a physically sensible speed for a nearby galaxy', () => {
    // 100 million light-years should recede at a few thousand km/s.
    const v = recessionSpeed(2.2, 100)
    expect(v).toBeGreaterThan(1000)
    expect(v).toBeLessThan(5000)
  })

  it('never exceeds the speed of light over the range plotted', () => {
    expect(recessionSpeed(3, 600)).toBeLessThan(3e5)
  })
})

describe('universeAge', () => {
  it('estimates about 14 billion years for the current Hubble constant', () => {
    // 0625.6.2.3.10 and .11 — the accepted figure is 13.8 billion years.
    const age = universeAge(2.2)
    expect(age).toBeGreaterThan(12)
    expect(age).toBeLessThan(16)
  })

  it('gives a younger Universe for a larger Hubble constant', () => {
    // Faster expansion means less time to reach the present size.
    expect(universeAge(4)).toBeLessThan(universeAge(2))
  })

  it('is inversely proportional to the Hubble constant', () => {
    expect(universeAge(2) / universeAge(4)).toBeCloseTo(2, 6)
  })

  it('guards against a zero or negative constant', () => {
    expect(universeAge(0)).toBe(0)
    expect(universeAge(-1)).toBe(0)
  })
})

describe('universeKernel', () => {
  it('plots the observations and a best-fit line', () => {
    expect(universeKernel(base).series.map((s) => s.key)).toEqual(['observed', 'bestFit'])
  })

  it('plots the requested number of galaxies', () => {
    expect(universeKernel({ ...base, galaxyCount: 8 }).series[0]!.points).toHaveLength(8)
    expect(universeKernel({ ...base, galaxyCount: 20 }).series[0]!.points).toHaveLength(20)
  })

  it('draws the best-fit line through the origin', () => {
    const fit = universeKernel(base).series[1]!.points
    expect(fit[0]![0]).toBeCloseTo(0, 10)
    expect(fit[0]![1]).toBeCloseTo(0, 10)
  })

  it('makes the best-fit line straight', () => {
    // Constant gradient between every pair of adjacent points.
    const fit = universeKernel(base).series[1]!.points
    const gradients: number[] = []
    for (let i = 1; i < fit.length; i++) {
      gradients.push((fit[i]![1] - fit[i - 1]![1]) / (fit[i]![0] - fit[i - 1]![0]))
    }
    expect(Math.max(...gradients) - Math.min(...gradients)).toBeLessThan(1e-9)
  })

  it('gives exact data when scatter is zero', () => {
    const r = universeKernel({ ...base, scatter: 0 })
    for (const [d, v] of r.series[0]!.points) {
      expect(v).toBeCloseTo(recessionSpeed(base.hubbleConstant, d), 6)
    }
  })

  it('scatters the observations without changing the trend', () => {
    const messy = universeKernel({ ...base, scatter: 1 }).series[0]!.points
    let deviations = 0
    for (const [d, v] of messy) {
      if (Math.abs(v - recessionSpeed(base.hubbleConstant, d)) > 1) deviations++
    }
    expect(deviations).toBeGreaterThan(messy.length / 2)
  })

  it('is deterministic, so the data does not reshuffle on every frame', () => {
    expect(universeKernel(base)).toEqual(universeKernel(base))
  })

  it('never plots a negative recession speed', () => {
    for (const [, v] of universeKernel({ ...base, scatter: 1 }).series[0]!.points) {
      expect(v).toBeGreaterThanOrEqual(0)
    }
  })

  it('reports a gradient matching the plotted line', () => {
    // The measurement a student makes: rise over run on their own graph.
    const r = universeKernel(base)
    const fit = r.series[1]!.points
    const measured =
      (fit[fit.length - 1]![1] - fit[0]![1]) / (fit[fit.length - 1]![0] - fit[0]![0])
    expect(measured).toBeCloseTo(r.readouts['gradient']!, 8)
  })

  it('reports an age consistent with the Hubble constant used', () => {
    const r = universeKernel({ ...base, hubbleConstant: 2.2 })
    expect(r.readouts['ageOfUniverse']).toBeCloseTo(universeAge(2.2), 8)
  })

  it('is finite everywhere across the parameter range', () => {
    for (const hubbleConstant of [1, 2.2, 4]) {
      for (const galaxyCount of [3, 20]) {
        for (const scatter of [0, 1]) {
          const r = universeKernel({ hubbleConstant, galaxyCount, scatter })
          for (const [k, v] of Object.entries(r.readouts)) {
            expect(Number.isFinite(v), `${k}`).toBe(true)
          }
        }
      }
    }
  })
})
