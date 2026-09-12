import { describe, expect, it } from 'vitest'
import kernel, {
  TURNS_DRAWN,
  forceOnSide,
  turningEffect,
  turningEffectCommutated,
  type MotorParams,
} from './kernel'

const base: MotorParams = { current: 2, fieldStrength: 1, turns: 20, angle: 90 }
const merge = (p: Partial<MotorParams>): MotorParams => ({
  current: p.current ?? base.current,
  fieldStrength: p.fieldStrength ?? base.fieldStrength,
  turns: p.turns ?? base.turns,
  angle: p.angle ?? base.angle,
})
const run = (p: Partial<MotorParams> = {}) => kernel(merge(p))

describe('the force on the coil', () => {
  it('needs both a current and a field', () => {
    // The force comes from the coil's own field pushing against the applied one.
    expect(forceOnSide(0, 1, 20)).toBe(0)
    expect(forceOnSide(2, 0, 20)).toBe(0)
    expect(forceOnSide(2, 1, 20)).toBeGreaterThan(0)
  })

  it('grows with current, field and number of turns', () => {
    expect(forceOnSide(4, 1, 20)).toBeGreaterThan(forceOnSide(2, 1, 20))
    expect(forceOnSide(2, 2, 20)).toBeGreaterThan(forceOnSide(2, 1, 20))
    expect(forceOnSide(2, 1, 40)).toBeGreaterThan(forceOnSide(2, 1, 20))
  })

  it('does not depend on the angle — only the turning effect does', () => {
    // A common muddle: the force on each side is constant all the way round. What changes
    // is how far its line of action is from the axis.
    const r0 = run({ angle: 0 }).readouts['forceOnSide']
    const r90 = run({ angle: 90 }).readouts['forceOnSide']
    expect(r0).toBe(r90)
    expect(run({ angle: 0 }).readouts['turningNow']).not.toBe(
      run({ angle: 90 }).readouts['turningNow'],
    )
  })
})

describe('where the turning effect is greatest', () => {
  it('is zero face-on and greatest edge-on', () => {
    expect(turningEffect(0, 2, 1, 20)).toBeCloseTo(0, 6)
    expect(turningEffect(180, 2, 1, 20)).toBeCloseTo(0, 6)
    expect(Math.abs(turningEffect(90, 2, 1, 20))).toBeCloseTo(forceOnSide(2, 1, 20), 6)
  })

  it('peaks at the same coil position as the generator e.m.f.', () => {
    // Same angle convention as 4-5-induction, and that is not a coincidence: the torque on
    // a motor coil and the e.m.f. induced in a generator coil are greatest edge-on to the
    // field. If this ever stopped holding, one of the two lessons would be lying.
    for (const angle of [0, 180, 360]) expect(turningEffect(angle, 2, 1, 20)).toBeCloseTo(0, 6)
    for (const angle of [90, 270]) {
      expect(Math.abs(turningEffect(angle, 2, 1, 20))).toBeCloseTo(forceOnSide(2, 1, 20), 6)
    }
  })
})

describe('what the commutator is for', () => {
  it('lets the turning effect reverse without one', () => {
    expect(turningEffect(90, 2, 1, 20)).toBeGreaterThan(0)
    expect(turningEffect(270, 2, 1, 20)).toBeLessThan(0)
  })

  it('keeps the turning effect in the same sense with one', () => {
    // The whole point. If this ever went negative the coil would rock instead of rotate.
    for (let angle = 0; angle <= 720; angle += 5) {
      expect(turningEffectCommutated(angle, 2, 1, 20), `${angle}°`).toBeGreaterThanOrEqual(0)
    }
  })

  it('changes over at an angle where the turning effect is already zero', () => {
    // Which is why the switch causes no jolt: there is nothing to interrupt.
    expect(turningEffectCommutated(180, 2, 1, 20)).toBeCloseTo(0, 6)
    expect(turningEffect(180, 2, 1, 20)).toBeCloseTo(0, 6)
  })

  it('agrees with the plain curve through the first half turn and differs through the second', () => {
    expect(turningEffectCommutated(45, 2, 1, 20)).toBeCloseTo(turningEffect(45, 2, 1, 20), 6)
    expect(turningEffectCommutated(225, 2, 1, 20)).not.toBeCloseTo(
      turningEffect(225, 2, 1, 20),
      6,
    )
  })

  it('draws both curves so the difference is visible', () => {
    const r = run()
    expect(r.series).toHaveLength(2)
    // The uncommutated curve is keyed `reference`, which is what makes the plot dash it.
    // Solid, it would be hidden under the other for the whole of the first half turn.
    expect(r.series.map((s) => s.key).sort()).toEqual(['commutated', 'reference'])
    expect(r.series[0]?.xBounds?.max).toBe(360 * TURNS_DRAWN)
    expect(r.series[1]?.points.some(([, y]) => y < 0)).toBe(true)
    expect(r.series[0]?.points.every(([, y]) => y >= 0)).toBe(true)
  })
})

describe('the note beside the graph', () => {
  it('names the dead point and the change-over together', () => {
    expect(run({ angle: 0 }).markers?.[0]?.label.en).toContain('split ring changes over')
  })

  it('says what happens in the second half turn', () => {
    expect(run({ angle: 225 }).markers?.[0]?.label.en).toContain('rock rather than rotate')
  })

  it('names the position of greatest turning effect', () => {
    expect(run({ angle: 90 }).markers?.[0]?.label.en).toContain('greatest turning effect')
  })

  it('says that both a current and a field are needed', () => {
    expect(run({ current: 0 }).markers?.[0]?.label.en).toContain('both have to be there')
    expect(run({ fieldStrength: 0 }).markers?.[0]?.label.zh).toBeTruthy()
  })
})

describe('the kernel', () => {
  it('returns finite readouts at every corner of the parameter space', () => {
    for (const current of [0, 10]) {
      for (const fieldStrength of [0, 3]) {
        for (const turns of [1, 100]) {
          for (const angle of [0, 360]) {
            const p = { current, fieldStrength, turns, angle }
            for (const [key, value] of Object.entries(kernel(p).readouts)) {
              expect(Number.isFinite(value), `${key} at ${JSON.stringify(p)}`).toBe(true)
            }
          }
        }
      }
    }
  })
})
