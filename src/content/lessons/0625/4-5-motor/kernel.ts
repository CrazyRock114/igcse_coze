/**
 * The magnetic effect of a current and the d.c. motor — kernel for lesson 0625/4-5-motor.
 *
 * The turning effect on a current-carrying coil in a magnetic field, plotted against the angle
 * the coil has turned through, drawn twice: once with a split-ring commutator and once without.
 *
 * The commutator is the part students describe without understanding, and a pair of curves
 * settles it. Without one, the turning effect is positive for half a turn and negative for the
 * next — the coil is pushed back the way it came, and it oscillates instead of rotating. With
 * one, the current reverses each half turn and the second lobe is flipped up, so the turning
 * effect is always in the same sense.
 *
 * The angle is measured from the face-on position, the same convention as the a.c. generator
 * lesson, and deliberately so: the turning effect on a motor coil and the e.m.f. induced in a
 * generator coil are greatest at the same orientation. Carrying one picture across both is
 * worth more than a locally convenient axis.
 *
 * A detail that matters: the commutator swaps the connections at the exact angle where the
 * turning effect passes through zero, so nothing is jolted — the coil coasts through the dead
 * point on its own momentum and the current is already reversed when it comes out the far side.
 *
 * Covers 0625.4.5.4.1 and 4.5.5.1–2.
 */

import type { SimKernel, SimResult, SimSeries } from '@/content/types'

export interface MotorParams extends Record<string, number> {
  /** Current in the coil, in amps. */
  current: number
  /** Strength of the magnetic field, in relative units. */
  fieldStrength: number
  /** Turns on the coil. */
  turns: number
  /**
   * Angle the coil has turned through, in degrees, measured from the face-on position
   * where the turning effect is zero.
   */
  angle: number
}

/** Turns drawn on the graph. */
export const TURNS_DRAWN = 2

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))

/** The force on each side of the coil. It does not depend on the angle — only the moment does. */
export function forceOnSide(current: number, field: number, turns: number): number {
  return current * field * turns
}

/**
 * Turning effect without a commutator, in relative units.
 *
 * Positive through the first half turn and negative through the second, because the sides of
 * the coil have swapped over while the current in them has not.
 */
export function turningEffect(
  angleDegrees: number,
  current: number,
  field: number,
  turns: number,
): number {
  return forceOnSide(current, field, turns) * Math.sin((angleDegrees * Math.PI) / 180)
}

/**
 * Turning effect with a split-ring commutator.
 *
 * The commutator reverses the current every half turn, which flips the negative lobe up.
 */
export function turningEffectCommutated(
  angleDegrees: number,
  current: number,
  field: number,
  turns: number,
): number {
  return Math.abs(turningEffect(angleDegrees, current, field, turns))
}

const round = (v: number) => Math.round(v * 100) / 100

export const motorKernel: SimKernel<MotorParams, SimResult> = (params) => {
  const current = clamp(params['current'] ?? 2, 0, 10)
  const field = clamp(params['fieldStrength'] ?? 1, 0, 3)
  const turns = clamp(params['turns'] ?? 20, 1, 100)
  const angle = clamp(params['angle'] ?? 90, 0, 360)

  const scale = 0.05
  const span = 360 * TURNS_DRAWN
  const sample = (f: (a: number) => number) =>
    Array.from({ length: 145 }, (_, i) => {
      const x = (i / 144) * span
      return [round(x), round(f(x) * scale)] as [number, number]
    })

  const series: SimSeries[] = [
    {
      key: 'commutated',
      label: {
        en: 'Turning effect with a split-ring commutator',
        zh: '装有换向器时的转动效果',
      },
      unit: { x: 'angle turned / degrees', y: 'turning effect / N cm' },
      points: sample((a) => turningEffectCommutated(a, current, field, turns)),
      xBounds: { min: 0, max: span },
    },
    {
      // Keyed `reference` so the plot draws it dashed. The two curves lie exactly on top of
      // one another through the first half turn, and a second solid line would simply be
      // hidden there — making the commutated curve look as though it began at 180°.
      key: 'reference',
      label: {
        en: 'Turning effect with no commutator',
        zh: '没有换向器时的转动效果',
      },
      unit: { x: 'angle turned / degrees', y: 'turning effect / N cm' },
      // Drawn beside the first on purpose: the difference between the two curves is the
      // entire job of the commutator, and it is invisible in either one alone.
      points: sample((a) => turningEffect(a, current, field, turns)),
      xBounds: { min: 0, max: span },
    },
  ]

  const sine = Math.sin((angle * Math.PI) / 180)
  const force = forceOnSide(current, field, turns)

  return {
    series,
    readouts: {
      forceOnSide: round(force * scale),
      turningNow: round(turningEffectCommutated(angle, current, field, turns) * scale),
      turningNoCommutator: round(turningEffect(angle, current, field, turns) * scale),
      peakTurning: round(force * scale),
    },
    markers: [
      {
        x: 0,
        y: 0,
        label:
          current === 0 || field === 0
            ? {
                en: 'With no current, or no field, there is no force on the coil at all — the force comes from one field pushing against the other, so both have to be there',
                zh: '没有电流，或没有磁场，线圈就完全不受力——力来自两个磁场之间的相互推挤，因此两者缺一不可',
              }
            : Math.abs(sine) < 0.08
              ? {
                  en: 'The coil is face-on to the field and the turning effect is momentarily zero. This is exactly where the split ring changes over, so nothing is jolted: the coil coasts through on its own momentum and comes out with the current already reversed',
                  zh: '线圈此刻正对磁场，转动效果瞬时为零。换向器恰好在这里换接，因此不会产生冲击：线圈靠惯性滑过这一点，出来时电流已经反向',
                }
              : sine < 0
                ? {
                    en: 'Second half of the turn. Without a commutator the turning effect has reversed and the coil would be pushed back the way it came — it would rock rather than rotate. With one, the current has already been reversed, so it carries on turning the same way',
                    zh: '转到了后半圈。若没有换向器，转动效果已经反向，线圈会被推回原路——只会来回摆动而不能持续旋转。装了换向器，电流已经反向，因此线圈继续朝同一方向转动',
                  }
                : Math.abs(sine) > 0.92
                  ? {
                      en: 'The coil is edge-on to the field, where the forces on its two sides have their full turning effect — this is the greatest turning effect it gets',
                      zh: '线圈此刻侧对磁场，两边所受的力发挥出全部力矩——这是它能获得的最大转动效果',
                    }
                  : {
                      en: 'Between the two: the forces on the sides are as large as ever, but they are no longer acting at their full distance from the axis, so the turning effect is smaller',
                      zh: '介于两者之间：两边受到的力大小不变，但作用线到转轴的距离不再是最大值，因此转动效果较小',
                    },
      },
    ],
  }
}

export default motorKernel
