import { describe, expect, it } from 'vitest'
import kernel, {
  averageForce,
  collide,
  kineticEnergy,
  momentum,
  type MomentumParams,
} from './kernel'

const base: MomentumParams = {
  massA: 1000,
  velocityA: 20,
  massB: 1500,
  velocityB: 0,
  stick: 1,
  contactTime: 0.1,
}
const merge = (p: Partial<MomentumParams>): MomentumParams => ({
  massA: p.massA ?? base.massA,
  velocityA: p.velocityA ?? base.velocityA,
  massB: p.massB ?? base.massB,
  velocityB: p.velocityB ?? base.velocityB,
  stick: p.stick ?? base.stick,
  contactTime: p.contactTime ?? base.contactTime,
})
const run = (p: Partial<MomentumParams> = {}) => kernel(merge(p))

const totalMomentum = (mA: number, vA: number, mB: number, vB: number) =>
  momentum(mA, vA) + momentum(mB, vB)

describe('momentum is conserved', () => {
  it('conserves it when the objects stick together', () => {
    const r = run({ stick: 1 }).readouts
    expect(r['momentumAfter']).toBeCloseTo(r['momentumBefore'] as number, 4)
  })

  it('conserves it when they bounce apart', () => {
    const r = run({ stick: 0 }).readouts
    expect(r['momentumAfter']).toBeCloseTo(r['momentumBefore'] as number, 4)
  })

  it('conserves it in a head-on collision, where the signs matter', () => {
    // The case that catches a model treating momentum as a scalar.
    const r = run({ velocityA: 20, velocityB: -15, stick: 1 }).readouts
    expect(r['momentumAfter']).toBeCloseTo(r['momentumBefore'] as number, 4)
  })

  it('conserves it across every combination of masses and velocities', () => {
    for (const massA of [0.5, 1000, 5000]) {
      for (const velocityA of [-30, 0, 30]) {
        for (const massB of [0.5, 1500]) {
          for (const velocityB of [-20, 0, 20]) {
            for (const stick of [0, 1]) {
              const before = totalMomentum(massA, velocityA, massB, velocityB)
              const { finalA, finalB } = collide(massA, velocityA, massB, velocityB, stick === 1)
              const after = totalMomentum(massA, finalA, massB, finalB)
              expect(after, `${massA}/${velocityA}/${massB}/${velocityB}/${stick}`).toBeCloseTo(
                before,
                6
              )
            }
          }
        }
      }
    }
  })
})

describe('kinetic energy is not', () => {
  it('loses kinetic energy when the objects stick together', () => {
    // Momentum conserved and energy not, in the same collision. That contrast is the
    // whole reason the two quantities are taught together.
    expect(run({ stick: 1 }).readouts['energyLost']).toBeGreaterThan(0)
  })

  it('keeps the kinetic energy when they bounce apart elastically', () => {
    expect(run({ stick: 0 }).readouts['energyLost']).toBeCloseTo(0, 3)
  })

  it('says where the energy went rather than leaving it missing', () => {
    const note = run({ stick: 1 }).markers?.[0]?.label
    expect(note?.en).toContain('kinetic energy has gone')
    expect(note?.zh).toBeTruthy()
  })

  it('never loses energy in the direction that would create it', () => {
    for (const stick of [0, 1]) {
      expect(run({ stick }).readouts['energyLost']).toBeGreaterThanOrEqual(-1e-6)
    }
  })
})

describe('sticking together', () => {
  it('gives both objects the same final velocity', () => {
    const { finalA, finalB } = collide(1000, 20, 1500, 0, true)
    expect(finalA).toBeCloseTo(finalB, 6)
  })

  it('gives the textbook answer for a car hitting a stationary lorry', () => {
    // 1000 × 20 = 20000 kg m/s shared over 2500 kg gives 8 m/s.
    const { finalA } = collide(1000, 20, 1500, 0, true)
    expect(finalA).toBeCloseTo(8, 6)
  })
})

describe('impulse and the crumple zone', () => {
  it('needs less force the longer the collision lasts', () => {
    expect(run({ contactTime: 1 }).readouts['force']).toBeLessThan(
      run({ contactTime: 0.05 }).readouts['force'] as number
    )
  })

  it('halves the force when the time doubles, because the impulse is fixed', () => {
    // The crumple zone cannot change the momentum that has to be lost. All it can change
    // is how long the losing takes.
    const short = run({ contactTime: 0.1 }).readouts['force'] as number
    const long = run({ contactTime: 0.2 }).readouts['force'] as number
    expect(long).toBeCloseTo(short / 2, -1)
  })

  it('returns zero rather than infinity for an instantaneous collision', () => {
    expect(averageForce(1000, 0)).toBe(Infinity)
    expect(run({ contactTime: 0.01 }).readouts['force']).toBeGreaterThan(0)
    expect(Number.isFinite(run({ contactTime: 0.01 }).readouts['force'] as number)).toBe(true)
  })
})

describe('the quantities themselves', () => {
  it('makes momentum a vector and kinetic energy a scalar', () => {
    expect(momentum(5, -4)).toBe(-20)
    expect(kineticEnergy(5, -4)).toBe(kineticEnergy(5, 4))
  })
})

describe('the kernel', () => {
  it('returns finite readouts at every corner of the parameter space', () => {
    for (const massA of [0.1, 5000]) {
      for (const velocityA of [-50, 50]) {
        for (const massB of [0.1, 5000]) {
          for (const stick of [0, 1]) {
            for (const contactTime of [0.01, 2]) {
              const p = { massA, velocityA, massB, velocityB: 0, stick, contactTime }
              for (const [key, value] of Object.entries(kernel(p).readouts)) {
                expect(Number.isFinite(value), `${key} at ${JSON.stringify(p)}`).toBe(true)
              }
            }
          }
        }
      }
    }
  })
})
