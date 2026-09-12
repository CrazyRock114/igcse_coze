import { describe, expect, it } from 'vitest'
import { criticalAngle, refractedAngle, refractionKernel } from './kernel'
import { toDegrees, toRadians } from '@/lib/units'

const GLASS = 1.5
const WATER = 1.33
const DIAMOND = 2.42

describe('refractedAngle', () => {
  it('bends light towards the normal on entering a denser medium', () => {
    const r = refractedAngle(1, GLASS, 45)
    expect(r).not.toBeNull()
    expect(r!).toBeLessThan(45)
    // sin r = sin 45 / 1.5 → r ≈ 28.1°
    expect(r!).toBeCloseTo(28.13, 1)
  })

  it('bends light away from the normal on leaving a denser medium', () => {
    const r = refractedAngle(GLASS, 1, 20)
    expect(r).not.toBeNull()
    expect(r!).toBeGreaterThan(20)
    expect(r!).toBeCloseTo(30.87, 1)
  })

  it('passes straight through at normal incidence', () => {
    expect(refractedAngle(1, GLASS, 0)).toBeCloseTo(0, 10)
  })

  it('returns null when the ray cannot escape — total internal reflection', () => {
    // Critical angle for glass is ~41.8°, so 45° is beyond it.
    expect(refractedAngle(GLASS, 1, 45)).toBeNull()
    expect(refractedAngle(GLASS, 1, 60)).toBeNull()
  })

  it('still transmits just below the critical angle', () => {
    const c = criticalAngle(GLASS)
    expect(refractedAngle(GLASS, 1, c - 0.5)).not.toBeNull()
  })

  it('satisfies n = sin i / sin r, the relationship students must use', () => {
    // 0625.3.2.2.7
    for (const i of [10, 25, 40, 55, 70]) {
      const r = refractedAngle(1, GLASS, i)!
      const ratio = Math.sin(toRadians(i)) / Math.sin(toRadians(r))
      expect(ratio).toBeCloseTo(GLASS, 6)
    }
  })
})

describe('criticalAngle', () => {
  it('matches the standard values students are expected to recognise', () => {
    expect(criticalAngle(GLASS)).toBeCloseTo(41.8, 1)
    expect(criticalAngle(WATER)).toBeCloseTo(48.8, 1)
    expect(criticalAngle(DIAMOND)).toBeCloseTo(24.4, 1)
  })

  it('satisfies n = 1 / sin c', () => {
    // 0625.3.2.2.8
    for (const n of [1.2, WATER, GLASS, 2.0, DIAMOND]) {
      expect(1 / Math.sin(toRadians(criticalAngle(n)))).toBeCloseTo(n, 6)
    }
  })

  it('gives a larger critical angle for a less dense medium', () => {
    expect(criticalAngle(WATER)).toBeGreaterThan(criticalAngle(GLASS))
    expect(criticalAngle(GLASS)).toBeGreaterThan(criticalAngle(DIAMOND))
  })

  it('degenerates to 90° when there is no density difference', () => {
    expect(criticalAngle(1)).toBe(90)
  })
})

describe('refractionKernel', () => {
  const into = (angleOfIncidence: number, n = GLASS) =>
    refractionKernel({ angleOfIncidence, n, fromDenser: 0 })
  const out = (angleOfIncidence: number, n = GLASS) =>
    refractionKernel({ angleOfIncidence, n, fromDenser: 1 })

  it('returns the three rays a ray diagram needs', () => {
    expect(into(45).series.map((s) => s.key)).toEqual(['incident', 'refracted', 'reflected'])
  })

  it('drops the refracted ray under total internal reflection', () => {
    const r = out(50)
    expect(r.readouts['totalInternalReflection']).toBe(1)
    expect(r.series.find((s) => s.key === 'refracted')!.points).toHaveLength(0)
    // The reflected ray must still be drawn — that is the whole phenomenon.
    expect(r.series.find((s) => s.key === 'reflected')!.points).toHaveLength(2)
  })

  it('draws the refracted ray when light does get through', () => {
    const r = into(45)
    expect(r.readouts['totalInternalReflection']).toBe(0)
    expect(r.series.find((s) => s.key === 'refracted')!.points).toHaveLength(2)
  })

  it('puts every ray on the correct side of the boundary', () => {
    // Going in: incident and reflected above (y > 0), refracted below (y < 0).
    const r = into(45)
    expect(r.series[0]!.points[0]![1]).toBeGreaterThan(0)
    expect(r.series[2]!.points[1]![1]).toBeGreaterThan(0)
    expect(r.series[1]!.points[1]![1]).toBeLessThan(0)

    // Coming out, every side flips.
    const o = out(20)
    expect(o.series[0]!.points[0]![1]).toBeLessThan(0)
    expect(o.series[2]!.points[1]![1]).toBeLessThan(0)
    expect(o.series[1]!.points[1]![1]).toBeGreaterThan(0)
  })

  it('draws rays whose measured angles equal the reported angles', () => {
    // The claim the lesson makes to the student: protractor on screen agrees with
    // the readout. Measured from the normal, which is the y axis.
    const r = into(55)
    const [ix, iy] = r.series[0]!.points[0]!
    expect(toDegrees(Math.atan2(Math.abs(ix), Math.abs(iy)))).toBeCloseTo(
      r.readouts['angleOfIncidence']!,
      6
    )

    const [rx, ry] = r.series[1]!.points[1]!
    expect(toDegrees(Math.atan2(Math.abs(rx), Math.abs(ry)))).toBeCloseTo(
      r.readouts['angleOfRefraction']!,
      6
    )
  })

  it('obeys the law of reflection, i = angle of reflection', () => {
    const r = into(37)
    const [x, y] = r.series[2]!.points[1]!
    expect(toDegrees(Math.atan2(Math.abs(x), Math.abs(y)))).toBeCloseTo(37, 6)
  })

  it('reports the critical angle regardless of travel direction', () => {
    // Students are asked for the critical angle of a material, not of a journey.
    expect(into(30).readouts['criticalAngle']).toBeCloseTo(criticalAngle(GLASS), 10)
    expect(out(30).readouts['criticalAngle']).toBeCloseTo(criticalAngle(GLASS), 10)
  })

  it('is finite everywhere across the parameter range', () => {
    for (const angleOfIncidence of [0, 15, 42, 60, 89]) {
      for (const n of [1, WATER, GLASS, DIAMOND]) {
        for (const fromDenser of [0, 1]) {
          const r = refractionKernel({ angleOfIncidence, n, fromDenser })
          for (const v of Object.values(r.readouts)) expect(Number.isFinite(v)).toBe(true)
        }
      }
    }
  })
})
