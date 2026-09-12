import { describe, expect, it } from 'vitest'
import {
  BODY_TEMPERATURE,
  activeTransportRate,
  diffusionRate,
  diffusionTemperatureFactor,
  transportKernel,
} from './kernel'

const run = (gradient = 50, temperature = 37, surfaceArea = 1) =>
  transportKernel({ gradient, temperature, surfaceArea })

const series = (key: string, r = run()) => r.series.find((s) => s.key === key)!

describe('diffusionRate', () => {
  it('is zero without a concentration gradient', () => {
    // 0610.3.1.1 — diffusion is net movement *down* a gradient. No gradient, no net movement.
    expect(diffusionRate(0, 37, 1)).toBe(0)
    expect(diffusionRate(0, 60, 10)).toBe(0)
  })

  it('reverses when the gradient reverses', () => {
    expect(diffusionRate(-50, 37, 1)).toBeCloseTo(-diffusionRate(50, 37, 1), 10)
  })

  it('is proportional to the gradient', () => {
    // 0610.3.1.5 — one of the three factors a student investigates.
    expect(diffusionRate(100, 37, 1)).toBeCloseTo(2 * diffusionRate(50, 37, 1), 10)
  })

  it('is proportional to the surface area', () => {
    expect(diffusionRate(50, 37, 4)).toBeCloseTo(4 * diffusionRate(50, 37, 1), 10)
  })

  it('increases with temperature and keeps increasing', () => {
    // Nothing in diffusion can be destroyed by heat, so there is no optimum.
    for (let t = 1; t <= 60; t++) {
      expect(diffusionRate(50, t, 1), `${t} °C`).toBeGreaterThan(diffusionRate(50, t - 1, 1))
    }
  })

  it('has a temperature factor of exactly 1 at body temperature', () => {
    expect(diffusionTemperatureFactor(BODY_TEMPERATURE)).toBe(1)
  })
})

describe('activeTransportRate', () => {
  it('does not depend on the concentration gradient at all', () => {
    // 0610.3.3.1 — this is what lets it work against one.
    const flat = series('active-gradient')
    const values = new Set(flat.points.map(([, y]) => y))
    expect(values.size).toBe(1)
  })

  it('keeps going when the gradient is against it', () => {
    // Uphill: diffusion runs backwards out of the cell, active transport still brings it in.
    const r = run(-80, 37, 1)
    expect(r.readouts['diffusionRate']!).toBeLessThan(0)
    expect(r.readouts['activeTransportRate']!).toBeGreaterThan(0)
  })

  it('peaks at body temperature and collapses above it', () => {
    // 0610.3.3.2 — it depends on respiration, and respiration depends on enzymes.
    const peak = activeTransportRate(BODY_TEMPERATURE, 1)
    expect(activeTransportRate(30, 1)).toBeLessThan(peak)
    expect(activeTransportRate(50, 1)).toBeLessThan(peak * 0.1)
    expect(activeTransportRate(60, 1)).toBeLessThan(peak * 0.01)
  })

  it('is proportional to the surface area, like diffusion', () => {
    expect(activeTransportRate(37, 5)).toBeCloseTo(5 * activeTransportRate(37, 1), 10)
  })

  it('is never negative', () => {
    for (let t = 0; t <= 60; t++) {
      expect(activeTransportRate(t, 1), `${t} °C`).toBeGreaterThanOrEqual(0)
    }
  })
})

describe('the contrast between the two', () => {
  it('has diffusion still rising where active transport has already collapsed', () => {
    // The single clearest evidence that one needs living, working enzymes and the other
    // does not.
    const hot = 55
    expect(diffusionRate(50, hot, 1)).toBeGreaterThan(diffusionRate(50, 37, 1))
    expect(activeTransportRate(hot, 1)).toBeLessThan(activeTransportRate(37, 1) * 0.05)
  })

  it('crosses over: diffusion wins at a steep gradient, active transport uphill', () => {
    expect(run(100, 37, 1).readouts['diffusionRate']!).toBeGreaterThan(
      run(100, 37, 1).readouts['activeTransportRate']!
    )
    expect(run(-100, 37, 1).readouts['diffusionRate']!).toBeLessThan(
      run(-100, 37, 1).readouts['activeTransportRate']!
    )
  })
})

describe('transportKernel', () => {
  it('draws four curves on two sets of axes', () => {
    const r = run()
    expect(r.series).toHaveLength(4)
    // Two share the gradient axis, two share the temperature axis.
    expect(series('diffusion-gradient', r).unit).toEqual(series('active-gradient', r).unit)
    expect(series('diffusion-temperature', r).unit).toEqual(series('active-temperature', r).unit)
    expect(series('diffusion-gradient', r).unit.x).not.toBe(series('diffusion-temperature', r).unit.x)
  })

  it('pins every axis so the two processes stay comparable', () => {
    for (const s of run().series) {
      expect(s.yBounds).toEqual({ min: -8, max: 8 })
    }
  })

  it('draws the gradient axis through negative values, where the point is made', () => {
    const s = series('diffusion-gradient')
    expect(s.xBounds!.min).toBeLessThan(0)
    expect(s.points.some(([x]) => x < 0)).toBe(true)
  })

  it('redraws the temperature curves at whatever gradient is set', () => {
    const steep = series('diffusion-temperature', run(100, 37, 1)).points
    const shallow = series('diffusion-temperature', run(20, 37, 1)).points
    const peak = (pts: Array<[number, number]>) => Math.max(...pts.map(([, y]) => y))
    expect(peak(steep)).toBeGreaterThan(peak(shallow))
  })

  it('leaves the active transport temperature curve alone when the gradient changes', () => {
    const a = series('active-temperature', run(100, 37, 1)).points
    const b = series('active-temperature', run(-100, 37, 1)).points
    expect(a).toEqual(b)
  })

  it('scales both processes with surface area', () => {
    const small = run(50, 37, 1)
    const large = run(50, 37, 4)
    expect(large.readouts['diffusionRate']!).toBeCloseTo(small.readouts['diffusionRate']! * 4, 1)
    expect(large.readouts['activeTransportRate']!).toBeCloseTo(
      small.readouts['activeTransportRate']! * 4,
      1
    )
  })

  it('clamps parameters outside their range', () => {
    expect(transportKernel({ gradient: 999, temperature: 37, surfaceArea: 1 }).readouts['gradient'])
      .toBe(100)
    expect(transportKernel({ gradient: -999, temperature: 37, surfaceArea: 1 }).readouts['gradient'])
      .toBe(-100)
    expect(transportKernel({ gradient: 0, temperature: 37, surfaceArea: 99 }).readouts['surfaceArea'])
      .toBe(10)
    expect(transportKernel({ gradient: 0, temperature: -50, surfaceArea: 1 }).readouts['activeTransportRate'])
      .toBeGreaterThanOrEqual(0)
  })

  it('is finite everywhere across the parameter range', () => {
    for (const gradient of [-100, 0, 100]) {
      for (const temperature of [0, 20, 37, 60]) {
        for (const surfaceArea of [1, 5, 10]) {
          const r = transportKernel({ gradient, temperature, surfaceArea })
          for (const [k, v] of Object.entries(r.readouts)) {
            expect(Number.isFinite(v), `${k} ${gradient} ${temperature} ${surfaceArea}`).toBe(true)
          }
          for (const s of r.series) {
            for (const [, y] of s.points) expect(Number.isFinite(y)).toBe(true)
          }
        }
      }
    }
  })
})
