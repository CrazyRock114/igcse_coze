import { describe, expect, it } from 'vitest'
import { fieldAt, fieldStrength, ringStarts, traceLine, type Source } from './fieldLines'

const positive: Source[] = [{ x: 0, y: 0, sign: 1, strength: 1 }]
const negative: Source[] = [{ x: 0, y: 0, sign: -1, strength: 1 }]
const dipole: Source[] = [
  { x: -0.75, y: 0, sign: 1, strength: 1 },
  { x: 0.75, y: 0, sign: -1, strength: 1 },
]

describe('fieldAt', () => {
  it('points away from a positive source', () => {
    const [fx, fy] = fieldAt(positive, 1, 0)
    expect(fx).toBeGreaterThan(0)
    expect(fy).toBeCloseTo(0, 10)
  })

  it('points towards a negative source', () => {
    expect(fieldAt(negative, 1, 0)[0]).toBeLessThan(0)
  })

  it('falls off with distance', () => {
    expect(fieldStrength(positive, 0.5, 0)).toBeGreaterThan(fieldStrength(positive, 1, 0))
    expect(fieldStrength(positive, 1, 0)).toBeGreaterThan(fieldStrength(positive, 3, 0))
  })

  it('follows a 1/r law, matching a two-dimensional cross-section', () => {
    // Documented behaviour, so worth pinning: halving r should double the field.
    expect(fieldStrength(positive, 1, 0) / fieldStrength(positive, 2, 0)).toBeCloseTo(2, 6)
  })

  it('scales linearly with source strength', () => {
    const strong: Source[] = [{ x: 0, y: 0, sign: 1, strength: 3 }]
    expect(fieldStrength(strong, 1, 0)).toBeCloseTo(3 * fieldStrength(positive, 1, 0), 10)
  })

  it('superposes contributions from several sources', () => {
    const two: Source[] = [
      { x: -1, y: 0, sign: 1, strength: 1 },
      { x: 1, y: 0, sign: 1, strength: 1 },
    ]
    // Two like sources cancel exactly midway between them.
    expect(fieldStrength(two, 0, 0)).toBeCloseTo(0, 8)
  })

  it('stays finite at the source itself', () => {
    const [fx, fy] = fieldAt(positive, 0, 0)
    expect(Number.isFinite(fx) && Number.isFinite(fy)).toBe(true)
  })

  it('returns zero field for no sources', () => {
    expect(fieldStrength([], 1, 1)).toBe(0)
  })
})

describe('traceLine', () => {
  it('starts where it is told to', () => {
    expect(traceLine(dipole, -0.6, 0.2, 1)[0]).toEqual([-0.6, 0.2])
  })

  it('steps along the local field direction', () => {
    const line = traceLine(dipole, -0.75, 0.14, 1)
    expect(line.length).toBeGreaterThan(5)
    for (let i = 1; i < Math.min(line.length, 25); i++) {
      const [px, py] = line[i - 1]!
      const [cx, cy] = line[i]!
      const [fx, fy] = fieldAt(dipole, px, py)
      const dot =
        ((cx - px) * fx + (cy - py) * fy) / (Math.hypot(cx - px, cy - py) * Math.hypot(fx, fy))
      expect(dot).toBeGreaterThan(0.9)
    }
  })

  it('reverses when traced in the other direction', () => {
    const forward = traceLine(dipole, -0.6, 0.3, 1)
    const backward = traceLine(dipole, -0.6, 0.3, -1)
    expect(forward[1]![0]).not.toBeCloseTo(backward[1]![0], 6)
  })

  it('terminates on arrival at a sink', () => {
    const line = traceLine(dipole, -0.75 + 0.14, 0.02, 1)
    const [ex, ey] = line[line.length - 1]!
    expect(Math.hypot(ex - 0.75, ey)).toBeLessThan(0.2)
  })

  it('respects the step count limit', () => {
    expect(traceLine(dipole, -0.75, 0.14, 1, { maxSteps: 30 }).length).toBeLessThanOrEqual(31)
  })

  it('respects the bound', () => {
    const line = traceLine(positive, 0.2, 0, 1, { bound: 2 })
    for (const [x, y] of line) {
      expect(Math.abs(x)).toBeLessThanOrEqual(2.1)
      expect(Math.abs(y)).toBeLessThanOrEqual(2.1)
    }
  })

  it('honours a custom step size', () => {
    const coarse = traceLine(positive, 0.2, 0, 1, { step: 0.2, bound: 2 })
    const fine = traceLine(positive, 0.2, 0, 1, { step: 0.05, bound: 2 })
    expect(fine.length).toBeGreaterThan(coarse.length)
  })

  it('produces finite coordinates throughout', () => {
    for (const [x, y] of traceLine(dipole, -0.75, 0.14, 1)) {
      expect(Number.isFinite(x) && Number.isFinite(y)).toBe(true)
    }
  })
})

describe('ringStarts', () => {
  const source: Source = { x: 2, y: -1, sign: 1, strength: 1 }

  it('places every start point on the ring', () => {
    for (const [x, y] of ringStarts(source, 8, 0.2)) {
      expect(Math.hypot(x - source.x, y - source.y)).toBeCloseTo(0.2, 10)
    }
  })

  it('returns the requested number of points', () => {
    expect(ringStarts(source, 12)).toHaveLength(12)
  })

  it('spaces them evenly, so line density means something', () => {
    const angles = ringStarts(source, 8)
      .map(([x, y]) => Math.atan2(y - source.y, x - source.x))
      .map((a) => (a < 0 ? a + Math.PI * 2 : a))
      .sort((a, b) => a - b)
    const gaps: number[] = []
    for (let i = 1; i < angles.length; i++) gaps.push(angles[i]! - angles[i - 1]!)
    expect(Math.max(...gaps) - Math.min(...gaps)).toBeLessThan(1e-9)
  })

  it('avoids starting exactly on the axis, where direction would be ambiguous', () => {
    for (const [, y] of ringStarts(source, 4)) {
      expect(Math.abs(y - source.y)).toBeGreaterThan(1e-6)
    }
  })
})
