import { describe, expect, it } from 'vitest'
import { efficiency, energyKernel, kineticEnergy, potentialEnergy, speedFrom } from './kernel'
import { G_EARTH } from '@/lib/units'

describe('potentialEnergy', () => {
  it('follows Ep = mgh', () => {
    // 0625.1.7.1.5
    expect(potentialEnergy(2, 5)).toBeCloseTo(2 * G_EARTH * 5, 10)
    expect(potentialEnergy(1, 10)).toBeCloseTo(10 * G_EARTH, 10)
  })

  it('is zero at ground level', () => {
    expect(potentialEnergy(5, 0)).toBe(0)
  })

  it('doubles when either mass or height doubles', () => {
    const base = potentialEnergy(2, 3)
    expect(potentialEnergy(4, 3)).toBeCloseTo(2 * base, 10)
    expect(potentialEnergy(2, 6)).toBeCloseTo(2 * base, 10)
  })
})

describe('kineticEnergy', () => {
  it('follows Ek = ½mv²', () => {
    // 0625.1.7.1.4
    expect(kineticEnergy(4, 3)).toBeCloseTo(18, 10)
    expect(kineticEnergy(2, 10)).toBeCloseTo(100, 10)
  })

  it('quadruples when the speed doubles', () => {
    // The square is the point — a car at twice the speed has four times the energy.
    expect(kineticEnergy(1, 4)).toBeCloseTo(4 * kineticEnergy(1, 2), 10)
  })

  it('is zero at rest', () => {
    expect(kineticEnergy(5, 0)).toBe(0)
  })
})

describe('speedFrom', () => {
  it('inverts the kinetic energy equation', () => {
    expect(speedFrom(4, 18)).toBeCloseTo(3, 10)
    expect(speedFrom(2, 100)).toBeCloseTo(10, 10)
  })

  it('round-trips with kineticEnergy', () => {
    for (const [m, v] of [
      [1, 5],
      [3.5, 12],
      [0.2, 30],
    ]) {
      expect(speedFrom(m!, kineticEnergy(m!, v!))).toBeCloseTo(v!, 8)
    }
  })

  it('guards against nonsense input', () => {
    expect(speedFrom(0, 100)).toBe(0)
    expect(speedFrom(2, -5)).toBe(0)
  })
})

describe('efficiency', () => {
  it('is the useful output as a percentage of the total input', () => {
    // 0625.1.7.3.7
    expect(efficiency(30, 100)).toBeCloseTo(30, 10)
    expect(efficiency(45, 60)).toBeCloseTo(75, 10)
  })

  it('never exceeds 100%, because no machine can', () => {
    expect(efficiency(150, 100)).toBe(100)
  })

  it('returns zero for no input rather than NaN', () => {
    expect(efficiency(10, 0)).toBe(0)
  })
})

describe('energyKernel', () => {
  const base = { mass: 2, height: 10, lossFraction: 0, liftTime: 4 }

  it('plots potential, kinetic and total energy', () => {
    expect(energyKernel(base).series.map((s) => s.key)).toEqual(['ep', 'ek', 'total'])
  })

  it('starts with all the energy as potential and none as kinetic', () => {
    const r = energyKernel(base)
    expect(r.series[0]!.points[0]![1]).toBeCloseTo(potentialEnergy(2, 10), 8)
    expect(r.series[1]!.points[0]![1]).toBeCloseTo(0, 8)
  })

  it('ends with all the energy as kinetic and none as potential', () => {
    const r = energyKernel(base)
    const last = r.series[0]!.points.length - 1
    expect(r.series[0]!.points[last]![1]).toBeCloseTo(0, 8)
    expect(r.series[1]!.points[last]![1]).toBeCloseTo(potentialEnergy(2, 10), 8)
  })

  it('keeps the total constant with no air resistance — conservation of energy', () => {
    // 0625.1.7.1.3. This is the claim the flat line makes to the student.
    const totals = energyKernel(base).series[2]!.points.map(([, e]) => e)
    expect(Math.max(...totals) - Math.min(...totals)).toBeLessThan(1e-8)
  })

  it('tilts the total downwards when energy is lost to the air', () => {
    const pts = energyKernel({ ...base, lossFraction: 0.4 }).series[2]!.points
    expect(pts[pts.length - 1]![1]).toBeLessThan(pts[0]![1]!)
    // And the shortfall is exactly the energy declared lost.
    expect(pts[0]![1]! - pts[pts.length - 1]![1]!).toBeCloseTo(
      potentialEnergy(2, 10) * 0.4,
      6
    )
  })

  it('never lets kinetic energy go negative', () => {
    for (const lossFraction of [0, 0.3, 0.6]) {
      for (const [, e] of energyKernel({ ...base, lossFraction }).series[1]!.points) {
        expect(e).toBeGreaterThanOrEqual(0)
      }
    }
  })

  it('gives the textbook impact speed for a free fall', () => {
    // v = √(2gh): 10 m gives about 14 m/s, independent of mass.
    const light = energyKernel({ ...base, mass: 0.5 })
    const heavy = energyKernel({ ...base, mass: 8 })
    expect(light.readouts['impactSpeed']).toBeCloseTo(Math.sqrt(2 * G_EARTH * 10), 6)
    expect(heavy.readouts['impactSpeed']).toBeCloseTo(light.readouts['impactSpeed']!, 8)
  })

  it('slows the impact when energy is lost to the air', () => {
    const free = energyKernel(base).readouts['impactSpeed']!
    const dragged = energyKernel({ ...base, lossFraction: 0.5 }).readouts['impactSpeed']!
    expect(dragged).toBeLessThan(free)
  })

  it('reports efficiency matching the energy actually delivered', () => {
    const r = energyKernel({ ...base, lossFraction: 0.25 })
    expect(r.readouts['efficiencyPercent']).toBeCloseTo(75, 6)
    expect(r.readouts['wastedEnergy']).toBeCloseTo(potentialEnergy(2, 10) * 0.25, 6)
  })

  it('balances the energy account: useful plus wasted equals the input', () => {
    const r = energyKernel({ ...base, lossFraction: 0.35 })
    expect(r.readouts['impactKinetic']! + r.readouts['wastedEnergy']!).toBeCloseTo(
      r.readouts['startPotential']!,
      6
    )
  })

  it('computes lifting work and power', () => {
    // 0625.1.7.2.2 and 1.7.4.1
    const r = energyKernel({ ...base, liftTime: 4 })
    expect(r.readouts['liftingWork']).toBeCloseTo(potentialEnergy(2, 10), 8)
    expect(r.readouts['liftingPower']).toBeCloseTo(potentialEnergy(2, 10) / 4, 8)
  })

  it('is finite everywhere across the parameter range', () => {
    for (const mass of [0.5, 10]) {
      for (const height of [1, 30]) {
        for (const lossFraction of [0, 0.6]) {
          for (const liftTime of [0.5, 20]) {
            const r = energyKernel({ mass, height, lossFraction, liftTime })
            for (const [k, v] of Object.entries(r.readouts)) {
              expect(Number.isFinite(v), `${k}`).toBe(true)
            }
          }
        }
      }
    }
  })
})
