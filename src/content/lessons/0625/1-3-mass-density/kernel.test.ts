import { describe, expect, it } from 'vitest'
import kernel, {
  FIELD_STRENGTHS,
  density,
  floats,
  submergedFraction,
  weight,
  type DensityParams,
} from './kernel'

const base: DensityParams = { mass: 2, volume: 250, gravity: 9.8, fluidDensity: 1 }
const merge = (p: Partial<DensityParams>): DensityParams => ({
  mass: p.mass ?? base.mass,
  volume: p.volume ?? base.volume,
  gravity: p.gravity ?? base.gravity,
  fluidDensity: p.fluidDensity ?? base.fluidDensity,
})
const run = (p: Partial<DensityParams> = {}) => kernel(merge(p))

describe('mass and weight', () => {
  it('changes the weight with the field strength', () => {
    expect(weight(10, FIELD_STRENGTHS.earth)).toBeCloseTo(98, 6)
    expect(weight(10, FIELD_STRENGTHS.moon)).toBeCloseTo(16, 6)
    expect(weight(10, FIELD_STRENGTHS.jupiter)).toBeCloseTo(248, 6)
  })

  it('leaves the mass completely unchanged wherever the object goes', () => {
    // The claim the whole lesson rests on, and the reason mass is plotted as well as
    // stated: a flat line beside one that is not flat.
    const flat = run({ gravity: 1.6 }).series.find((s) => s.key === 'mass')
    const values = flat?.points.map(([, y]) => y) ?? []
    for (const v of values) expect(v).toBe(values[0])
  })

  it('gives zero weight but not zero mass in free space', () => {
    expect(weight(10, FIELD_STRENGTHS.freeSpace)).toBe(0)
    const note = run({ gravity: 0 }).markers?.[0]?.label
    expect(note?.en).toContain('mass is unchanged')
    expect(note?.zh).toBeTruthy()
  })

  it('makes weight proportional to field strength', () => {
    expect(weight(5, 20) / weight(5, 10)).toBeCloseTo(2, 6)
  })
})

describe('density', () => {
  it('converts kilograms and cubic centimetres to g/cm³', () => {
    // 2 kg in 250 cm³ is 8 g/cm³, not 0.008 — the unit conversion is the whole trap.
    expect(density(2, 250)).toBeCloseTo(8, 6)
    expect(density(1, 1000)).toBeCloseTo(1, 6)
  })

  it('does not change when the object is moved', () => {
    // Density depends on mass and volume, neither of which the field strength touches.
    expect(run({ gravity: 1.6 }).readouts['density']).toBe(run({ gravity: 24.8 }).readouts['density'])
  })

  it('returns zero rather than infinity for a zero volume', () => {
    expect(density(5, 0)).toBe(0)
  })
})

describe('floating', () => {
  it('compares with the fluid rather than with a fixed number', () => {
    // Steel sinks in water and floats on mercury, and nothing about the steel changed.
    expect(floats(7.8, 1.0)).toBe(false)
    expect(floats(7.8, 13.6)).toBe(true)
  })

  it('floats anything less dense than the fluid', () => {
    expect(floats(0.9, 1.0)).toBe(true)
    expect(floats(1.1, 1.0)).toBe(false)
  })

  it('submerges the fraction given by the density ratio', () => {
    // Ice at 0.92 in water floats with 92% below the surface, which is the iceberg.
    expect(submergedFraction(0.92, 1.0)).toBeCloseTo(0.92, 6)
    expect(submergedFraction(0.5, 1.0)).toBeCloseTo(0.5, 6)
  })

  it('reports fully submerged for anything that sinks', () => {
    expect(run({ mass: 2, volume: 250, fluidDensity: 1 }).readouts['submerged']).toBe(100)
  })

  it('says which way round it went, and why', () => {
    const sink = run({ mass: 2, volume: 250, fluidDensity: 1 }).markers?.[0]?.label.en ?? ''
    const float = run({ mass: 2, volume: 250, fluidDensity: 13.6 }).markers?.[0]?.label.en ?? ''
    expect(sink).toContain('Sinks')
    expect(float).toContain('Floats')
  })
})

describe('the kernel', () => {
  it('returns finite readouts at every corner of the parameter space', () => {
    for (const mass of [0.1, 100]) {
      for (const volume of [1, 5000]) {
        for (const gravity of [0, 30]) {
          for (const fluidDensity of [0.1, 14]) {
            const p = { mass, volume, gravity, fluidDensity }
            for (const [key, value] of Object.entries(kernel(p).readouts)) {
              expect(Number.isFinite(value), `${key} at ${JSON.stringify(p)}`).toBe(true)
            }
          }
        }
      }
    }
  })
})
