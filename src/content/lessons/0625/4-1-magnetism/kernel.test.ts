import { describe, expect, it } from 'vitest'
import { fieldAt, fieldStrength, magnetismKernel, polesFor, traceLine } from './kernel'

const BAR = 0
const LIKE = 1
const UNLIKE = 2
const WIRE = 3
const SOLENOID = 4

describe('fieldAt', () => {
  const north = [{ x: 0, y: 0, sign: 1, strength: 1 }]

  it('points away from a north pole', () => {
    // 0625.4.1.7 — field direction is the force on a north pole.
    const [bx, by] = fieldAt(north, 1, 0)
    expect(bx).toBeGreaterThan(0)
    expect(by).toBeCloseTo(0, 10)
  })

  it('points towards a south pole', () => {
    const south = [{ x: 0, y: 0, sign: -1, strength: 1 }]
    const [bx] = fieldAt(south, 1, 0)
    expect(bx).toBeLessThan(0)
  })

  it('gets weaker with distance', () => {
    expect(fieldStrength(north, 0.5, 0)).toBeGreaterThan(fieldStrength(north, 1, 0))
    expect(fieldStrength(north, 1, 0)).toBeGreaterThan(fieldStrength(north, 2, 0))
  })

  it('scales with the strength of the source', () => {
    const strong = [{ x: 0, y: 0, sign: 1, strength: 2 }]
    expect(fieldStrength(strong, 1, 0)).toBeCloseTo(2 * fieldStrength(north, 1, 0), 10)
  })

  it('stays finite at the pole itself', () => {
    const [bx, by] = fieldAt(north, 0, 0)
    expect(Number.isFinite(bx)).toBe(true)
    expect(Number.isFinite(by)).toBe(true)
  })

  it('produces a neutral point midway between two like poles', () => {
    // Equal and opposite contributions cancel — this is why like poles repel.
    const like = polesFor(LIKE, 1)
    expect(fieldStrength(like, 0, 0)).toBeCloseTo(0, 8)
  })

  it('produces no neutral point between two unlike poles', () => {
    const unlike = polesFor(UNLIKE, 1)
    expect(fieldStrength(unlike, 0, 0)).toBeGreaterThan(0.5)
  })
})

describe('traceLine', () => {
  const bar = polesFor(BAR, 1)

  it('starts where it is told to', () => {
    const line = traceLine(bar, -0.6, 0.2, 1)
    expect(line[0]).toEqual([-0.6, 0.2])
  })

  it('follows the field, so each step is along the local field direction', () => {
    const line = traceLine(bar, -0.75, 0.3, 1)
    expect(line.length).toBeGreaterThan(5)
    for (let i = 1; i < Math.min(line.length, 30); i++) {
      const [px, py] = line[i - 1]!
      const [cx, cy] = line[i]!
      const [bx, by] = fieldAt(bar, px, py)
      const mag = Math.hypot(bx, by)
      // Step direction should match the field direction at the previous point.
      const dot = ((cx - px) * bx + (cy - py) * by) / (Math.hypot(cx - px, cy - py) * mag)
      expect(dot).toBeGreaterThan(0.9)
    }
  })

  it('stays within the traced region', () => {
    for (const angle of [0.3, 1.2, 2.5, 4, 5.5]) {
      const line = traceLine(bar, -0.75 + 0.14 * Math.cos(angle), 0.14 * Math.sin(angle), 1)
      for (const [x, y] of line) {
        expect(Math.abs(x)).toBeLessThanOrEqual(5.3)
        expect(Math.abs(y)).toBeLessThanOrEqual(5.3)
      }
    }
  })

  it('terminates rather than looping forever', () => {
    const line = traceLine(bar, -0.75, 0.14, 1)
    expect(line.length).toBeLessThanOrEqual(621)
  })

  it('closes most lines onto the south pole, and sends the rest off the page', () => {
    // 0625.4.1.6. A line leaving N almost directly away from S needs an enormous sweep to
    // return — in an ideal dipole it closes only at infinity. Printed field diagrams show
    // exactly this: most lines arc back to S, a few run off the edge. Both are correct, so
    // the test requires the majority to close and the remainder to leave outward, never to
    // stop somewhere arbitrary in the middle.
    let landed = 0
    let left = 0

    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2 + 0.12
      const line = traceLine(bar, -0.75 + 0.14 * Math.cos(angle), 0.14 * Math.sin(angle), 1)
      const [ex, ey] = line[line.length - 1]!

      if (Math.hypot(ex - 0.75, ey) < 0.2) landed++
      else if (Math.abs(ex) > 3.1 || Math.abs(ey) > 2.1) left++
      else {
        throw new Error(
          `line at angle ${angle.toFixed(2)} stopped mid-frame at (${ex.toFixed(2)}, ${ey.toFixed(2)})`
        )
      }
    }

    expect(landed + left).toBe(12)
    expect(landed).toBeGreaterThanOrEqual(8)
  })
})

describe('polesFor', () => {
  it('gives a bar magnet one north and one south pole', () => {
    const poles = polesFor(BAR, 1)
    expect(poles).toHaveLength(2)
    expect(poles.filter((p) => p.sign > 0)).toHaveLength(1)
    expect(poles.filter((p) => p.sign < 0)).toHaveLength(1)
  })

  it('gives two like poles the same sign', () => {
    const poles = polesFor(LIKE, 1)
    expect(poles.every((p) => p.sign > 0)).toBe(true)
  })

  it('gives two unlike poles opposite signs', () => {
    const poles = polesFor(UNLIKE, 1)
    expect(poles[0]!.sign).toBe(-poles[1]!.sign)
  })

  it('uses no poles for a straight wire, whose field is circular', () => {
    expect(polesFor(WIRE, 1)).toHaveLength(0)
  })

  it('gives a solenoid a stronger pole pair than a bar magnet', () => {
    expect(polesFor(SOLENOID, 1)[0]!.strength).toBeGreaterThan(polesFor(BAR, 1)[0]!.strength)
  })
})

describe('magnetismKernel', () => {
  const base = { setup: BAR, lineCount: 8, strength: 1 }

  it('traces the requested number of field lines', () => {
    expect(magnetismKernel({ ...base, lineCount: 6 }).series).toHaveLength(6)
    expect(magnetismKernel({ ...base, lineCount: 12 }).series).toHaveLength(12)
  })

  it('gives every line at least a few points', () => {
    for (const s of magnetismKernel(base).series) {
      expect(s.points.length).toBeGreaterThan(2)
    }
  })

  it('draws concentric rings for a straight wire', () => {
    // 0625.4.5.3.1 — the field due to a current in a straight wire.
    const r = magnetismKernel({ ...base, setup: WIRE, lineCount: 4 })
    expect(r.series).toHaveLength(4)
    for (const ring of r.series) {
      const radii = ring.points.map(([x, y]) => Math.hypot(x, y))
      // Every point on a ring is the same distance from the wire.
      expect(Math.max(...radii) - Math.min(...radii)).toBeLessThan(1e-9)
      // And the ring closes.
      expect(ring.points[0]![0]).toBeCloseTo(ring.points[ring.points.length - 1]![0], 8)
    }
  })

  it('spaces the wire rings further apart as they get bigger', () => {
    // Widening spacing is how the drawing says the field weakens with distance.
    const r = magnetismKernel({ ...base, setup: WIRE, lineCount: 4 })
    const radii = r.series.map((s) => Math.hypot(s.points[0]![0], s.points[0]![1]))
    for (let i = 1; i < radii.length; i++) expect(radii[i]!).toBeGreaterThan(radii[i - 1]!)
  })

  it('reports a stronger field near a pole than far from it', () => {
    // 0625.4.1.11 — line spacing represents relative strength.
    const r = magnetismKernel(base)
    expect(r.readouts['strengthNear']!).toBeGreaterThan(r.readouts['strengthFar']!)
    expect(r.readouts['ratio']!).toBeGreaterThan(1)
  })

  it('reports a stronger field for a stronger source', () => {
    const weak = magnetismKernel({ ...base, strength: 0.5 })
    const strong = magnetismKernel({ ...base, strength: 2 })
    expect(strong.readouts['strengthNear']!).toBeGreaterThan(weak.readouts['strengthNear']!)
  })

  it('reports the bounds the renderer needs', () => {
    expect(magnetismKernel(base).bounds).toEqual({
      xMin: -3.1,
      xMax: 3.1,
      yMin: -2.1,
      yMax: 2.1,
    })
  })

  it('is finite everywhere across the parameter range', () => {
    for (const setup of [BAR, LIKE, UNLIKE, WIRE, SOLENOID]) {
      for (const strength of [0.5, 1, 2]) {
        const r = magnetismKernel({ setup, lineCount: 8, strength })
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
