import { describe, expect, it } from 'vitest'
import kernel, {
  FALL_TIME,
  GRAVITY,
  extension,
  simulateFall,
  terminalVelocity,
  type ForcesParams,
} from './kernel'

const base: ForcesParams = {
  mode: 1,
  springConstant: 25,
  limitOfProportionality: 10,
  mass: 70,
  drag: 0.25,
}
const merge = (p: Partial<ForcesParams>): ForcesParams => ({
  mode: p.mode ?? base.mode,
  springConstant: p.springConstant ?? base.springConstant,
  limitOfProportionality: p.limitOfProportionality ?? base.limitOfProportionality,
  mass: p.mass ?? base.mass,
  drag: p.drag ?? base.drag,
})
const run = (p: Partial<ForcesParams> = {}) => kernel(merge(p))

describe('the spring', () => {
  it('obeys F = kx below the limit of proportionality', () => {
    // 5 N on a 25 N/m spring is 0.2 m, and doubling the load doubles the extension.
    expect(extension(5, 25, 10)).toBeCloseTo(0.2, 6)
    expect(extension(10, 25, 10)).toBeCloseTo(2 * extension(5, 25, 10), 6)
  })

  it('stops obeying it above the limit', () => {
    // If it stayed straight forever the limit of proportionality would be a word with
    // nothing behind it.
    const proportional = (load: number) => load / 25
    expect(extension(20, 25, 10)).toBeGreaterThan(proportional(20))
  })

  it('stretches further for each extra newton once past the limit', () => {
    const step = (from: number) => extension(from + 1, 25, 10) - extension(from, 25, 10)
    expect(step(20)).toBeGreaterThan(step(5))
  })

  it('is continuous at the limit itself', () => {
    // A jump would be a modelling artefact, not a spring.
    const just = extension(10 - 1e-6, 25, 10)
    const at = extension(10, 25, 10)
    expect(Math.abs(at - just)).toBeLessThan(1e-4)
  })

  it('says how far past proportional it has gone', () => {
    expect(run({ mode: 1 }).markers?.[0]?.label.en).toContain('more than doubles')
    expect(run({ mode: 1 }).markers?.[0]?.label.zh).toBeTruthy()
  })
})

describe('the falling object', () => {
  it('starts at rest and accelerates at g when nothing opposes it', () => {
    const fall = simulateFall(70, 0)
    expect(fall.velocity[0]).toBe(0)
    expect(fall.acceleration[0]).toBeCloseTo(GRAVITY, 1)
  })

  it('never levels off without drag', () => {
    const fall = simulateFall(70, 0)
    const last = fall.velocity[fall.velocity.length - 1] ?? 0
    const earlier = fall.velocity[fall.velocity.length - 40] ?? 0
    expect(last).toBeGreaterThan(earlier)
    expect(run({ mode: 2, drag: 0 }).markers?.[0]?.label.en).toContain('without limit')
  })

  it('starts at g with drag too, because the drag is zero at zero speed', () => {
    const fall = simulateFall(70, 0.25)
    expect(fall.acceleration[0]).toBeCloseTo(GRAVITY, 1)
  })

  it('shrinks the resultant and the acceleration as the speed rises', () => {
    const fall = simulateFall(70, 0.25)
    for (let i = 1; i < fall.time.length; i++) {
      expect(fall.resultant[i], `step ${i}`).toBeLessThanOrEqual(
        (fall.resultant[i - 1] as number) + 1e-6
      )
    }
  })

  it('levels off at the speed where drag equals weight', () => {
    // Nothing in the model is told about terminal velocity — it falls out of F = ma when
    // the resultant reaches zero, which is the whole point of integrating it.
    const vt = terminalVelocity(70, 0.25)
    const fall = simulateFall(70, 0.25)
    expect(fall.velocity[fall.velocity.length - 1]).toBeCloseTo(vt, 0)
  })

  it('gives a heavier object a higher terminal velocity for the same drag', () => {
    expect(terminalVelocity(100, 0.25)).toBeGreaterThan(terminalVelocity(50, 0.25))
  })

  it('gives more drag a lower terminal velocity — the parachute', () => {
    expect(terminalVelocity(70, 4)).toBeLessThan(terminalVelocity(70, 0.25))
  })

  it('says the resultant is zero once it has levelled off', () => {
    expect(run({ mode: 2, drag: 4 }).markers?.[0]?.label.en).toContain('resultant is zero')
  })
})

describe('the kernel', () => {
  it('returns finite readouts at every corner of the parameter space', () => {
    for (const mode of [1, 2]) {
      for (const springConstant of [1, 200]) {
        for (const limitOfProportionality of [1, 40]) {
          for (const mass of [0.1, 200]) {
            for (const drag of [0, 20]) {
              const p = { mode, springConstant, limitOfProportionality, mass, drag }
              for (const [key, value] of Object.entries(kernel(p).readouts)) {
                expect(Number.isFinite(value), `${key} at ${JSON.stringify(p)}`).toBe(true)
              }
            }
          }
        }
      }
    }
  })

  it('reports a terminal velocity of zero rather than infinity when there is no drag', () => {
    // Infinity would break every readout downstream, and "no terminal velocity" is the
    // honest reading of it.
    expect(run({ mode: 2, drag: 0 }).readouts['terminal']).toBe(0)
    expect(terminalVelocity(70, 0)).toBe(Infinity)
  })

  it('runs the fall for the full recorded time', () => {
    const fall = simulateFall(70, 0.25)
    expect(fall.time[fall.time.length - 1]).toBeCloseTo(FALL_TIME, 1)
  })
})
