import { describe, expect, it } from 'vitest'
import kernel, { CYCLES, emfAt, fluxFraction, peakEmf, type InductionParams } from './kernel'

const base: InductionParams = { turns: 50, fieldStrength: 1, frequency: 1, angle: 90 }
const merge = (p: Partial<InductionParams>): InductionParams => ({
  turns: p.turns ?? base.turns,
  fieldStrength: p.fieldStrength ?? base.fieldStrength,
  frequency: p.frequency ?? base.frequency,
  angle: p.angle ?? base.angle,
})
const run = (p: Partial<InductionParams> = {}) => kernel(merge(p))

describe('where the e.m.f. peaks', () => {
  it('is zero when the coil is face-on to the field', () => {
    // The angle is measured from the face-on position, where the most field lines pass
    // through the coil and its sides are momentarily moving along them.
    expect(emfAt(0, 50, 1, 1)).toBeCloseTo(0, 6)
    expect(emfAt(180, 50, 1, 1)).toBeCloseTo(0, 6)
  })

  it('peaks when the coil is edge-on, moving straight across the field lines', () => {
    expect(Math.abs(emfAt(90, 50, 1, 1))).toBeCloseTo(peakEmf(50, 1, 1), 6)
    expect(Math.abs(emfAt(270, 50, 1, 1))).toBeCloseTo(peakEmf(50, 1, 1), 6)
  })

  it('puts the peak e.m.f. exactly where no field lines pass through the coil', () => {
    // The whole difficulty of this topic in one assertion: the e.m.f. is greatest where the
    // field through the coil is zero, and zero where it is greatest. If these two ever
    // peaked together, the physics — and every explanation in the lesson — would be wrong.
    for (const angle of [0, 180, 360]) {
      expect(fluxFraction(angle), `field at ${angle}`).toBeCloseTo(1, 6)
      expect(emfAt(angle, 50, 1, 1), `e.m.f. at ${angle}`).toBeCloseTo(0, 6)
    }
    for (const angle of [90, 270]) {
      expect(fluxFraction(angle), `field at ${angle}`).toBeCloseTo(0, 6)
      expect(Math.abs(emfAt(angle, 50, 1, 1)), `e.m.f. at ${angle}`).toBeCloseTo(
        peakEmf(50, 1, 1),
        6,
      )
    }
  })

  it('says which case the selected angle is', () => {
    expect(run({ angle: 0 }).markers?.[0]?.label.en).toContain('none are cut')
    expect(run({ angle: 90 }).markers?.[0]?.label.en).toContain('this is where the e.m.f. peaks')
    expect(run({ angle: 45 }).markers?.[0]?.label.en).toContain('Between the two')
    expect(run({ angle: 90 }).markers?.[0]?.label.zh).toBeTruthy()
  })
})

describe('what makes the e.m.f. larger', () => {
  it('increases with the number of turns', () => {
    expect(peakEmf(100, 1, 1)).toBeGreaterThan(peakEmf(50, 1, 1))
  })

  it('increases with the strength of the field', () => {
    expect(peakEmf(50, 2, 1)).toBeGreaterThan(peakEmf(50, 1, 1))
  })

  it('increases with the speed of rotation', () => {
    expect(peakEmf(50, 1, 3)).toBeGreaterThan(peakEmf(50, 1, 1))
  })

  it('induces nothing at all when the coil is stationary', () => {
    // It is the movement that induces, not the field. A stationary coil in the strongest
    // field in the world produces nothing.
    expect(peakEmf(200, 3, 0)).toBe(0)
    expect(run({ frequency: 0, fieldStrength: 3, turns: 200 }).readouts['peak']).toBe(0)
    expect(run({ frequency: 0 }).markers?.[0]?.label.en).toContain('movement that matters')
  })
})

describe('the alternating part', () => {
  it('reverses direction every half turn', () => {
    // Which is what makes it alternating current, and why the axis has to span zero.
    expect(emfAt(90, 50, 1, 1)).toBeGreaterThan(0)
    expect(emfAt(270, 50, 1, 1)).toBeLessThan(0)
  })

  it('plots an axis that spans zero, so the reversal is visible', () => {
    const s = run().series[0]
    expect(s?.yBounds?.min).toBeLessThan(0)
    expect(s?.yBounds?.max).toBeGreaterThan(0)
  })

  it('draws more than one complete cycle', () => {
    const s = run().series[0]
    expect(s?.xBounds?.max).toBe(360 * CYCLES)
    expect(CYCLES).toBeGreaterThan(1)
  })

  it('returns to the same value after a full turn', () => {
    expect(emfAt(45, 50, 1, 1)).toBeCloseTo(emfAt(405, 50, 1, 1), 6)
  })
})

describe('the kernel', () => {
  it('returns finite readouts at every corner of the parameter space', () => {
    for (const turns of [1, 200]) {
      for (const fieldStrength of [0, 3]) {
        for (const frequency of [0, 5]) {
          for (const angle of [0, 360]) {
            const p = { turns, fieldStrength, frequency, angle }
            for (const [key, value] of Object.entries(kernel(p).readouts)) {
              expect(Number.isFinite(value), `${key} at ${JSON.stringify(p)}`).toBe(true)
            }
          }
        }
      }
    }
  })

  it('reports the field through the coil as a percentage', () => {
    expect(run({ angle: 0 }).readouts['fieldThroughCoil']).toBe(100)
    expect(run({ angle: 90 }).readouts['fieldThroughCoil']).toBe(0)
  })
})
