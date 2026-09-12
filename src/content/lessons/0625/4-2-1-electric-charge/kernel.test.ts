import { describe, expect, it } from 'vitest'
import { chargesFor, electricKernel, SPHERE_RADIUS } from './kernel'
import { fieldStrength } from '@/lib/fieldLines'

const POINT = 0
const SPHERE = 1
const DIPOLE = 2
const PLATES = 3

describe('chargesFor', () => {
  it('gives a point charge a single positive source', () => {
    const s = chargesFor(POINT, 1)
    expect(s).toHaveLength(1)
    expect(s[0]!.sign).toBe(1)
  })

  it('models a charged sphere as a point charge at its centre', () => {
    // Outside a uniform sphere the field is identical to a point charge — which is why
    // the two arrangements look the same beyond the surface.
    expect(chargesFor(SPHERE, 1)).toEqual(chargesFor(POINT, 1))
  })

  it('gives two unlike charges opposite signs', () => {
    const s = chargesFor(DIPOLE, 1)
    expect(s).toHaveLength(2)
    expect(s[0]!.sign).toBe(-s[1]!.sign)
  })

  it('builds parallel plates from two rows of charges', () => {
    const s = chargesFor(PLATES, 1)
    expect(s.length).toBeGreaterThan(20)
    expect(s.filter((c) => c.sign > 0)).toHaveLength(s.length / 2)
    expect(s.filter((c) => c.sign < 0)).toHaveLength(s.length / 2)
  })

  it('puts the positive plate above the negative one', () => {
    const s = chargesFor(PLATES, 1)
    expect(s.filter((c) => c.sign > 0).every((c) => c.y > 0)).toBe(true)
    expect(s.filter((c) => c.sign < 0).every((c) => c.y < 0)).toBe(true)
  })

  it('shares the total charge across the plate, so strength stays comparable', () => {
    const s = chargesFor(PLATES, 1)
    const totalPositive = s.filter((c) => c.sign > 0).reduce((sum, c) => sum + c.strength, 0)
    expect(totalPositive).toBeCloseTo(1, 8)
  })

  it('scales with the charge parameter', () => {
    expect(chargesFor(POINT, 3)[0]!.strength).toBe(3)
  })
})

describe('electric field patterns', () => {
  it('points radially outward from a positive charge', () => {
    // 0625.4.2.1.9 — field direction is the force on a positive charge.
    const s = chargesFor(POINT, 1)
    for (const [x, y] of [
      [1, 0],
      [0, 1],
      [-1, 0],
      [0, -1],
    ]) {
      const strength = fieldStrength(s, x!, y!)
      expect(strength).toBeGreaterThan(0)
    }
  })

  it('has the same strength all round a point charge at a given distance', () => {
    const s = chargesFor(POINT, 1)
    const r = 1.3
    const samples = [0, 1, 2, 3, 4].map((i) => {
      const a = (i / 5) * Math.PI * 2
      return fieldStrength(s, r * Math.cos(a), r * Math.sin(a))
    })
    expect(Math.max(...samples) - Math.min(...samples)).toBeLessThan(1e-9)
  })

  it('produces a near-uniform field between parallel plates', () => {
    // 0625.4.2.1.10(c). Sampled well inside the plates, away from the fringing edges.
    const s = chargesFor(PLATES, 1)
    const samples = [-0.8, -0.4, 0, 0.4, 0.8].map((x) => fieldStrength(s, x, 0))
    const spread = (Math.max(...samples) - Math.min(...samples)) / Math.max(...samples)
    expect(spread).toBeLessThan(0.1)
  })

  it('shows the field weakening beyond the edge of the plates', () => {
    // Fringing — which is why the syllabus excludes end effects from examination.
    const s = chargesFor(PLATES, 1)
    expect(fieldStrength(s, 2.6, 0)).toBeLessThan(fieldStrength(s, 0, 0))
  })

  it('falls away sharply from a point charge, unlike between plates', () => {
    const point = chargesFor(POINT, 1)
    expect(fieldStrength(point, 0.7, 0) / fieldStrength(point, 2.1, 0)).toBeCloseTo(3, 6)
  })
})

describe('electricKernel', () => {
  const base = { setup: POINT, lineCount: 10, charge: 1 }

  it('traces the requested number of lines from a point charge', () => {
    expect(electricKernel({ ...base, lineCount: 8 }).series).toHaveLength(8)
    expect(electricKernel({ ...base, lineCount: 14 }).series).toHaveLength(14)
  })

  it('starts sphere field lines on the surface, since there is no field inside', () => {
    const r = electricKernel({ ...base, setup: SPHERE })
    for (const s of r.series) {
      const [x, y] = s.points[0]!
      expect(Math.hypot(x, y)).toBeGreaterThanOrEqual(SPHERE_RADIUS)
    }
  })

  it('starts point-charge lines much closer in than sphere lines', () => {
    const point = electricKernel({ ...base, setup: POINT }).series[0]!.points[0]!
    const sphere = electricKernel({ ...base, setup: SPHERE }).series[0]!.points[0]!
    expect(Math.hypot(point[0], point[1])).toBeLessThan(Math.hypot(sphere[0], sphere[1]))
  })

  it('draws one line per positive plate charge', () => {
    const r = electricKernel({ ...base, setup: PLATES })
    const positives = chargesFor(PLATES, 1).filter((c) => c.sign > 0).length
    expect(r.series).toHaveLength(positives)
  })

  it('runs plate field lines from the positive plate down to the negative one', () => {
    // 0625.4.2.1.10(c): the field runs from + to −.
    const r = electricKernel({ ...base, setup: PLATES })
    // Ignore the outermost lines, which fringe outwards rather than crossing.
    for (const s of r.series.slice(3, -3)) {
      const [, startY] = s.points[0]!
      const [, endY] = s.points[s.points.length - 1]!
      expect(startY).toBeGreaterThan(0)
      expect(endY).toBeLessThan(startY)
    }
  })

  it('flags the parallel-plate field as uniform and the others as not', () => {
    expect(electricKernel({ ...base, setup: PLATES }).readouts['isUniform']).toBe(1)
    expect(electricKernel({ ...base, setup: POINT }).readouts['isUniform']).toBe(0)
    expect(electricKernel({ ...base, setup: DIPOLE }).readouts['isUniform']).toBe(0)
  })

  it('reports a falling field for a point charge', () => {
    const r = electricKernel(base)
    expect(r.readouts['strengthNear']!).toBeGreaterThan(r.readouts['strengthFar']!)
    expect(r.readouts['ratio']!).toBeGreaterThan(1)
  })

  it('gives every line at least a few points', () => {
    for (const setup of [POINT, SPHERE, DIPOLE, PLATES]) {
      for (const s of electricKernel({ ...base, setup }).series) {
        expect(s.points.length, `setup ${setup}, line ${s.key}`).toBeGreaterThan(2)
      }
    }
  })

  it('is finite everywhere across the parameter range', () => {
    for (const setup of [POINT, SPHERE, DIPOLE, PLATES]) {
      for (const charge of [0.5, 1, 2]) {
        const r = electricKernel({ setup, lineCount: 10, charge })
        for (const [k, v] of Object.entries(r.readouts)) {
          expect(Number.isFinite(v), `${k} for setup ${setup}`).toBe(true)
        }
        for (const s of r.series) {
          for (const [x, y] of s.points) {
            expect(Number.isFinite(x) && Number.isFinite(y)).toBe(true)
          }
        }
      }
    }
  })
})
