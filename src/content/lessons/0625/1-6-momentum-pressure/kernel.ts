/**
 * Momentum and pressure — kernel for lesson 0625/1-6-momentum-pressure.
 *
 * A collision, run as a conservation problem. Momentum is conserved whatever the objects do
 * afterwards, and the way to make that convincing is to let the student choose whether they
 * bounce apart or stick together and watch the total stay put while the kinetic energy does
 * not. Momentum conserved and energy not conserved in the same collision is the fact that
 * separates the two quantities, and no amount of stating it does the work.
 *
 * Impulse is the same equation rearranged, and it is the one with a use outside the exam: a
 * crumple zone cannot change the momentum a car has to lose, so the only thing left to
 * change is the time — and the force falls in proportion.
 *
 * Covers 0625.1.6.1–4.
 */

import type { SimKernel, SimResult, SimSeries } from '@/content/types'

export interface MomentumParams extends Record<string, number> {
  /** Mass of the moving object, in kg. */
  massA: number
  /** Its velocity before the collision, in m/s. */
  velocityA: number
  /** Mass of the object it hits, in kg. */
  massB: number
  /** Its velocity before the collision, in m/s. Negative means head-on. */
  velocityB: number
  /** 1 they stick together, 0 they bounce apart elastically. */
  stick: number
  /** Time the collision takes, in seconds — the crumple zone. */
  contactTime: number
}

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))

/** Momentum in kg m/s. A vector, so the sign carries the direction. */
export function momentum(mass: number, velocity: number): number {
  return mass * velocity
}

/** Kinetic energy in joules. A scalar, so the sign of the velocity does not matter. */
export function kineticEnergy(mass: number, velocity: number): number {
  return 0.5 * mass * velocity * velocity
}

export interface Collision {
  finalA: number
  finalB: number
}

/**
 * Velocities after the collision.
 *
 * Sticking together: one combined mass, and conservation alone fixes the answer. Bouncing
 * apart elastically: conservation of momentum and of kinetic energy together, which give
 * the standard pair of expressions.
 */
export function collide(
  mA: number,
  uA: number,
  mB: number,
  uB: number,
  stick: boolean
): Collision {
  const total = mA + mB
  if (total <= 0) return { finalA: 0, finalB: 0 }

  if (stick) {
    const v = (mA * uA + mB * uB) / total
    return { finalA: v, finalB: v }
  }

  return {
    finalA: ((mA - mB) / total) * uA + ((2 * mB) / total) * uB,
    finalB: ((2 * mA) / total) * uA + ((mB - mA) / total) * uB,
  }
}

/** Average force during a collision, from the change in momentum and the time it took. */
export function averageForce(changeInMomentum: number, seconds: number): number {
  if (seconds <= 0) return Infinity
  return changeInMomentum / seconds
}

const round = (v: number) => Math.round(v * 100) / 100

export const momentumKernel: SimKernel<MomentumParams, SimResult> = (params) => {
  const mA = clamp(params['massA'] ?? 1000, 0.1, 5000)
  const uA = clamp(params['velocityA'] ?? 20, -50, 50)
  const mB = clamp(params['massB'] ?? 1500, 0.1, 5000)
  const uB = clamp(params['velocityB'] ?? 0, -50, 50)
  const stick = (params['stick'] ?? 1) >= 0.5
  const time = clamp(params['contactTime'] ?? 0.1, 0.01, 2)

  const before = momentum(mA, uA) + momentum(mB, uB)
  const { finalA, finalB } = collide(mA, uA, mB, uB, stick)
  const after = momentum(mA, finalA) + momentum(mB, finalB)

  const keBefore = kineticEnergy(mA, uA) + kineticEnergy(mB, uB)
  const keAfter = kineticEnergy(mA, finalA) + kineticEnergy(mB, finalB)

  // The impulse on A: how much momentum it had to lose, and over how long.
  const impulseA = Math.abs(momentum(mA, finalA) - momentum(mA, uA))
  const force = averageForce(impulseA, time)

  const series: SimSeries[] = [
    {
      key: 'force',
      label: { en: 'Average force against contact time', zh: '平均作用力随接触时间的变化' },
      unit: { x: 'contact time / s', y: 'average force / N' },
      points: Array.from({ length: 60 }, (_, i) => {
        const x = round(0.02 + (i / 59) * 1.98)
        return [x, Math.round(averageForce(impulseA, x))] as [number, number]
      }),
      xBounds: { min: 0, max: 2 },
      yBounds: { min: 0, max: 200000 },
    },
  ]

  return {
    series,
    readouts: {
      momentumBefore: round(before),
      momentumAfter: round(after),
      energyLost: round(keBefore - keAfter),
      force: Number.isFinite(force) ? Math.round(force) : 0,
    },
    markers: [
      {
        x: 0,
        y: 0,
        label:
          Math.abs(before - after) > 1e-6
            ? {
                en: 'Momentum is not conserved — something is wrong with the model',
                zh: '动量不守恒——模型出了问题',
              }
            : stick
              ? {
                  en: `Momentum is unchanged at ${round(before)} kg m/s, but ${round(keBefore - keAfter)} J of kinetic energy has gone — into deforming the metal, heat and sound`,
                  zh: `动量保持在 ${round(before)} kg m/s 不变，但有 ${round(keBefore - keAfter)} J 的动能消失了——变成了金属形变、热和声音`,
                }
              : {
                  en: `Momentum unchanged at ${round(before)} kg m/s, and this time the kinetic energy is unchanged too — an elastic collision`,
                  zh: `动量保持在 ${round(before)} kg m/s 不变，而且这次动能也没有损失——这是弹性碰撞`,
                },
      },
    ],
  }
}

export default momentumKernel
