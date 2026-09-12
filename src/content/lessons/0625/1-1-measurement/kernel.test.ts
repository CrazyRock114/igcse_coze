import { describe, expect, it } from 'vitest'
import kernel, { bearing, fromScaleDrawing, magnitude, type VectorParams } from './kernel'

const run = (p: Partial<VectorParams> = {}) =>
  kernel({ a: 6, b: 8, scale: 10, ...p } as VectorParams)

describe('the resultant', () => {
  it('gives the 3-4-5 answer', () => {
    expect(magnitude(3, 4)).toBeCloseTo(5, 6)
    expect(magnitude(6, 8)).toBeCloseTo(10, 6)
  })

  it('is longer than either vector but shorter than their sum', () => {
    // The check that catches a student adding the magnitudes: 6 + 8 is 14, not 10.
    for (const [a, b] of [[3, 4], [5, 12], [7, 7]] as const) {
      const r = magnitude(a, b)
      expect(r).toBeGreaterThan(Math.max(a, b))
      expect(r).toBeLessThan(a + b)
    }
  })

  it('reduces to the other vector when one is zero', () => {
    expect(magnitude(0, 9)).toBeCloseTo(9, 6)
    expect(magnitude(9, 0)).toBeCloseTo(9, 6)
    expect(run({ a: 0 }).markers?.[0]?.label.en).toContain('nothing to add')
  })

  it('gives 45 degrees when the two are equal', () => {
    expect(bearing(5, 5)).toBeCloseTo(45, 6)
    expect(bearing(10, 0)).toBeCloseTo(0, 6)
    expect(bearing(0, 10)).toBeCloseTo(90, 6)
  })
})

describe('a scale drawing', () => {
  it('agrees with the calculation to about the precision of a ruler', () => {
    const drawn = fromScaleDrawing(6, 8, 10)
    expect(Math.abs(drawn - 10)).toBeLessThan(0.2)
  })

  it('is more precise at a larger scale', () => {
    // Drawing bigger is the way to a better answer, which is the practical point.
    const coarse = Math.abs(fromScaleDrawing(3.7, 5.3, 2) - magnitude(3.7, 5.3))
    const fine = Math.abs(fromScaleDrawing(3.7, 5.3, 20) - magnitude(3.7, 5.3))
    expect(fine).toBeLessThanOrEqual(coarse)
  })

  it('is reported alongside the calculation rather than instead of it', () => {
    const r = run({ a: 3.7, b: 5.3, scale: 2 }).readouts
    expect(r['resultant']).not.toBe(r['drawn'])
    expect(r['difference']).toBeGreaterThan(0)
  })
})

describe('the diagram', () => {
  it('draws both components and the resultant from the origin', () => {
    const bodies = run().bodies ?? []
    expect(bodies).toHaveLength(3)
    expect(bodies.filter((b) => b.kind === 'resultant')).toHaveLength(1)
  })

  it('puts the resultant tip at the corner of the rectangle', () => {
    // Which is what makes the right angle visible rather than asserted.
    const r = (run().bodies ?? []).find((b) => b.kind === 'resultant')
    expect(r?.x).toBe(6)
    expect(r?.y).toBe(8)
  })

  it('sizes the axes to fit the longest arrow', () => {
    const { bounds } = run({ a: 12, b: 16 })
    expect(bounds?.xMax).toBeGreaterThanOrEqual(magnitude(12, 16))
  })
})

describe('the kernel', () => {
  it('returns finite readouts at every corner of the parameter space', () => {
    for (const a of [0, 20]) {
      for (const b of [0, 20]) {
        for (const scale of [1, 20]) {
          for (const [key, value] of Object.entries(kernel({ a, b, scale }).readouts)) {
            expect(Number.isFinite(value), `${key} at ${a}/${b}/${scale}`).toBe(true)
          }
        }
      }
    }
  })
})
