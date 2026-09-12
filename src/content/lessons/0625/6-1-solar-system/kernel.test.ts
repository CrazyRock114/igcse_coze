import { describe, expect, it } from 'vitest'
import { C, PLANETS, lightTravelTime, orbitalSpeed, solarKernel } from './kernel'

const EARTH = 2
const JUPITER = 4
const NEPTUNE = 7

describe('PLANETS', () => {
  it('lists the eight planets in order from the Sun', () => {
    expect(PLANETS).toHaveLength(8)
    for (let i = 1; i < PLANETS.length; i++) {
      expect(PLANETS[i]!.radiusGm).toBeGreaterThan(PLANETS[i - 1]!.radiusGm)
    }
  })

  it('marks the four inner planets rocky and the four outer ones not', () => {
    // 0625.6.1.2.2
    expect(PLANETS.slice(0, 4).every((p) => p.rocky)).toBe(true)
    expect(PLANETS.slice(4).every((p) => !p.rocky)).toBe(true)
  })

  it('gives the rocky planets much higher densities than the gas giants', () => {
    const rockyMin = Math.min(...PLANETS.filter((p) => p.rocky).map((p) => p.density))
    const gasMax = Math.max(...PLANETS.filter((p) => !p.rocky).map((p) => p.density))
    expect(rockyMin).toBeGreaterThan(gasMax)
  })

  it('increases orbital period with distance from the Sun', () => {
    for (let i = 1; i < PLANETS.length; i++) {
      expect(PLANETS[i]!.periodYears).toBeGreaterThan(PLANETS[i - 1]!.periodYears)
    }
  })

  it('uses Earth as the reference year and field strength', () => {
    expect(PLANETS[EARTH]!.name).toBe('Earth')
    expect(PLANETS[EARTH]!.periodYears).toBe(1.0)
    expect(PLANETS[EARTH]!.surfaceGravity).toBeCloseTo(9.8, 6)
  })
})

describe('orbitalSpeed', () => {
  it('gives Earth about 30 km / s', () => {
    // The standard figure, and a good sanity check on the whole calculation.
    expect(orbitalSpeed(149.6, 1.0) / 1000).toBeCloseTo(29.8, 0)
  })

  it('follows v = 2πr / T', () => {
    // Doubling the radius at fixed period doubles the speed.
    expect(orbitalSpeed(200, 1)).toBeCloseTo(2 * orbitalSpeed(100, 1), 6)
    // Doubling the period at fixed radius halves it.
    expect(orbitalSpeed(100, 2)).toBeCloseTo(orbitalSpeed(100, 1) / 2, 6)
  })

  it('falls steadily with distance from the Sun', () => {
    // 0625.6.1.2.9 — the trend the graph is there to show.
    const speeds = PLANETS.map((p) => orbitalSpeed(p.radiusGm, p.periodYears))
    for (let i = 1; i < speeds.length; i++) {
      expect(speeds[i]!).toBeLessThan(speeds[i - 1]!)
    }
  })

  it('makes Neptune far slower than Mercury', () => {
    const mercury = orbitalSpeed(PLANETS[0]!.radiusGm, PLANETS[0]!.periodYears)
    const neptune = orbitalSpeed(PLANETS[NEPTUNE]!.radiusGm, PLANETS[NEPTUNE]!.periodYears)
    expect(mercury / neptune).toBeGreaterThan(5)
  })

  it('guards against a zero period', () => {
    expect(orbitalSpeed(100, 0)).toBe(0)
  })
})

describe('lightTravelTime', () => {
  it('gives about 8.3 minutes from the Sun to the Earth', () => {
    // 0625.6.1.2.4 — the classic calculation.
    expect(lightTravelTime(149.6) / 60).toBeCloseTo(8.3, 1)
  })

  it('is proportional to distance', () => {
    expect(lightTravelTime(300)).toBeCloseTo(2 * lightTravelTime(150), 6)
  })

  it('uses 3.0 × 10⁸ m / s', () => {
    expect(lightTravelTime(C / 1e9)).toBeCloseTo(1, 6)
  })
})

describe('solarKernel', () => {
  const base = { planet: EARTH, quantity: 0 }

  it('plots one point per planet', () => {
    expect(solarKernel(base).series[0]!.points).toHaveLength(8)
  })

  it('plots orbital speed falling with distance', () => {
    const pts = solarKernel({ ...base, quantity: 0 }).series[0]!.points
    for (let i = 1; i < pts.length; i++) {
      expect(pts[i]![1]).toBeLessThan(pts[i - 1]![1]!)
    }
  })

  it('switches the plotted quantity and its unit', () => {
    expect(solarKernel({ ...base, quantity: 0 }).series[0]!.unit.y).toBe('km / s')
    expect(solarKernel({ ...base, quantity: 1 }).series[0]!.unit.y).toBe('N / kg')
    expect(solarKernel({ ...base, quantity: 2 }).series[0]!.unit.y).toBe('years')
  })

  it('plots orbital period rising steeply with distance', () => {
    const pts = solarKernel({ ...base, quantity: 2 }).series[0]!.points
    for (let i = 1; i < pts.length; i++) {
      expect(pts[i]![1]).toBeGreaterThan(pts[i - 1]![1]!)
    }
  })

  it('reports the selected planet’s data', () => {
    const r = solarKernel({ planet: JUPITER, quantity: 0 })
    expect(r.readouts['surfaceGravity']).toBeCloseTo(23.1, 6)
    expect(r.readouts['orbitalPeriod']).toBeCloseTo(11.9, 6)
    expect(r.readouts['isRocky']).toBe(0)
  })

  it('reports Earth as rocky with 8.3 light-minutes from the Sun', () => {
    const r = solarKernel({ planet: EARTH, quantity: 0 })
    expect(r.readouts['isRocky']).toBe(1)
    expect(r.readouts['lightMinutes']).toBeCloseTo(8.3, 1)
  })

  it('agrees between the readout and the plotted point for the chosen planet', () => {
    // The graph and the readings must be the same numbers.
    const r = solarKernel({ planet: NEPTUNE, quantity: 0 })
    const point = r.series[0]!.points[NEPTUNE]!
    expect(point[1]).toBeCloseTo(r.readouts['orbitalSpeed']!, 8)
    expect(point[0]).toBeCloseTo(r.readouts['distanceFromSun']!, 8)
  })

  it('clamps an out-of-range planet index', () => {
    expect(Number.isFinite(solarKernel({ planet: -5, quantity: 0 }).readouts['orbitalSpeed']!)).toBe(true)
    expect(Number.isFinite(solarKernel({ planet: 99, quantity: 0 }).readouts['orbitalSpeed']!)).toBe(true)
  })

  it('is finite everywhere across the parameter range', () => {
    for (let planet = 0; planet < 8; planet++) {
      for (const quantity of [0, 1, 2]) {
        const r = solarKernel({ planet, quantity })
        for (const [k, v] of Object.entries(r.readouts)) {
          expect(Number.isFinite(v), `${k} for planet ${planet}`).toBe(true)
        }
      }
    }
  })
})
