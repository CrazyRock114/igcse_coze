import { describe, expect, it } from 'vitest'
import {
  BOILING_POINT,
  MELTING_POINT,
  heatEnergy,
  heatingKernel,
  latentEnergy,
  stageBoundaries,
  temperatureAt,
} from './kernel'

const base = {
  mass: 0.5,
  specificHeat: 4200,
  latentFusion: 334,
  latentVaporisation: 2260,
  power: 500,
}

describe('heatEnergy', () => {
  it('follows E = mcΔθ', () => {
    // 0625.2.2.2.3
    expect(heatEnergy(2, 4200, 10)).toBeCloseTo(84000, 6)
    expect(heatEnergy(0.5, 900, 40)).toBeCloseTo(18000, 6)
  })

  it('scales with each factor independently', () => {
    const b = heatEnergy(1, 1000, 10)
    expect(heatEnergy(2, 1000, 10)).toBeCloseTo(2 * b, 6)
    expect(heatEnergy(1, 2000, 10)).toBeCloseTo(2 * b, 6)
    expect(heatEnergy(1, 1000, 20)).toBeCloseTo(2 * b, 6)
  })

  it('is zero for no temperature change', () => {
    expect(heatEnergy(2, 4200, 0)).toBe(0)
  })
})

describe('latentEnergy', () => {
  it('follows E = mL, converting kJ to J', () => {
    expect(latentEnergy(1, 334)).toBeCloseTo(334000, 6)
    expect(latentEnergy(0.5, 2260)).toBeCloseTo(1130000, 6)
  })
})

describe('temperatureAt', () => {
  it('starts below the melting point', () => {
    expect(temperatureAt(base, 0)).toBeLessThan(MELTING_POINT)
  })

  it('holds at the melting point right through melting', () => {
    // 0625.2.2.3.1 — energy input with no temperature change.
    const [, b1, b2] = stageBoundaries(base)
    const samples = [0.1, 0.3, 0.5, 0.7, 0.9].map((f) =>
      temperatureAt(base, b1! + f * (b2! - b1!))
    )
    for (const t of samples) expect(t).toBeCloseTo(MELTING_POINT, 8)
  })

  it('holds at the boiling point right through boiling', () => {
    const [, , , b3, b4] = stageBoundaries(base)
    for (const f of [0.1, 0.5, 0.9]) {
      expect(temperatureAt(base, b3! + f * (b4! - b3!))).toBeCloseTo(BOILING_POINT, 8)
    }
  })

  it('rises steadily while the liquid is being heated', () => {
    const [, , b2, b3] = stageBoundaries(base)
    const a = temperatureAt(base, b2! + 0.25 * (b3! - b2!))
    const b = temperatureAt(base, b2! + 0.75 * (b3! - b2!))
    expect(a).toBeGreaterThan(MELTING_POINT)
    expect(b).toBeGreaterThan(a)
    expect(b).toBeLessThan(BOILING_POINT)
  })

  it('reaches exactly the melting point at the end of the solid stage', () => {
    const [, b1] = stageBoundaries(base)
    expect(temperatureAt(base, b1!)).toBeCloseTo(MELTING_POINT, 8)
  })

  it('reaches exactly the boiling point at the end of the liquid stage', () => {
    const [, , , b3] = stageBoundaries(base)
    expect(temperatureAt(base, b3!)).toBeCloseTo(BOILING_POINT, 8)
  })

  it('never decreases as energy is supplied', () => {
    const total = stageBoundaries(base).at(-1)!
    let previous = -Infinity
    for (let i = 0; i <= 300; i++) {
      const t = temperatureAt(base, (i / 300) * total)
      expect(t).toBeGreaterThanOrEqual(previous - 1e-9)
      previous = t
    }
  })
})

describe('stageBoundaries', () => {
  it('gives five stages in increasing order', () => {
    const b = stageBoundaries(base)
    expect(b).toHaveLength(6)
    for (let i = 1; i < b.length; i++) expect(b[i]!).toBeGreaterThan(b[i - 1]!)
  })

  it('makes the boiling plateau far longer than the melting plateau', () => {
    // For water, L_v is about 6.8× L_f — the long second plateau surprises students.
    const b = stageBoundaries(base)
    const melt = b[2]! - b[1]!
    const boil = b[4]! - b[3]!
    expect(boil / melt).toBeCloseTo(2260 / 334, 6)
    expect(boil).toBeGreaterThan(melt * 5)
  })

  it('scales the whole curve with mass', () => {
    const single = stageBoundaries(base).at(-1)!
    const double = stageBoundaries({ ...base, mass: base.mass * 2 }).at(-1)!
    expect(double).toBeCloseTo(2 * single, 6)
  })
})

describe('heatingKernel', () => {
  it('plots temperature against time', () => {
    const r = heatingKernel(base)
    expect(r.series[0]!.unit).toEqual({ x: 's', y: '°C' })
  })

  it('produces two flat plateaus in the curve', () => {
    // The defining feature of the graph. Counted by finding runs of near-zero gradient.
    const pts = heatingKernel(base).series[0]!.points
    let plateaus = 0
    let inPlateau = false
    for (let i = 1; i < pts.length; i++) {
      const flat = Math.abs(pts[i]![1] - pts[i - 1]![1]) < 1e-6
      if (flat && !inPlateau) {
        plateaus++
        inPlateau = true
      } else if (!flat) inPlateau = false
    }
    expect(plateaus).toBe(2)
  })

  it('gives a shallower slope for a larger specific heat capacity', () => {
    // 0625.2.2.2.3 — gradient is power / (mc).
    const low = heatingKernel({ ...base, specificHeat: 2000 }).readouts['liquidGradient']!
    const high = heatingKernel({ ...base, specificHeat: 8000 }).readouts['liquidGradient']!
    expect(high).toBeLessThan(low)
    expect(low / high).toBeCloseTo(4, 6)
  })

  it('recovers the specific heat capacity from the gradient', () => {
    // The measurement a student makes: c = P / (m × gradient).
    const r = heatingKernel(base)
    const c = base.power / (base.mass * r.readouts['liquidGradient']!)
    expect(c).toBeCloseTo(base.specificHeat, 6)
  })

  it('doubles every energy figure when the mass doubles', () => {
    const a = heatingKernel(base).readouts
    const b = heatingKernel({ ...base, mass: base.mass * 2 }).readouts
    expect(b['energyToMelt']).toBeCloseTo(2 * a['energyToMelt']!, 6)
    expect(b['energyToBoil']).toBeCloseTo(2 * a['energyToBoil']!, 6)
    expect(b['totalTime']).toBeCloseTo(2 * a['totalTime']!, 6)
  })

  it('halves the total time when the heater power doubles', () => {
    const a = heatingKernel(base).readouts['totalTime']!
    const b = heatingKernel({ ...base, power: base.power * 2 }).readouts['totalTime']!
    expect(b).toBeCloseTo(a / 2, 6)
  })

  it('reports how much longer boiling takes than melting', () => {
    expect(heatingKernel(base).readouts['boilToMeltRatio']).toBeCloseTo(2260 / 334, 6)
  })

  it('is finite everywhere across the parameter range', () => {
    for (const mass of [0.1, 2]) {
      for (const specificHeat of [500, 8000]) {
        for (const power of [100, 2000]) {
          const r = heatingKernel({ ...base, mass, specificHeat, power })
          for (const [k, v] of Object.entries(r.readouts)) {
            expect(Number.isFinite(v), `${k}`).toBe(true)
          }
          for (const [, temp] of r.series[0]!.points) expect(Number.isFinite(temp)).toBe(true)
        }
      }
    }
  })
})
