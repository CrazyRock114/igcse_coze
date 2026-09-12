/**
 * Electrical safety and potential dividers — kernel for lesson 0625/4-4-safety.
 *
 * A potential divider, and a fuse chosen for the circuit it protects. The two look unrelated
 * and are the same arithmetic seen twice: a series circuit shares the supply voltage between
 * its resistances in proportion, and a fuse is a deliberately weak link sized to the current
 * that ought to flow.
 *
 * The divider is worth running because the ratio rule is easy to state and easy to get
 * backwards. Doubling one resistance does not double its share — the shares must add to the
 * supply, so raising one lowers the other, and the model makes that constraint visible by
 * reporting both.
 *
 * Fuse choice is where students reach for the smallest number available. The model reports
 * the working current alongside, so choosing a rating below it visibly breaks the appliance
 * that was meant to be protected.
 *
 * Covers 0625.4.3.3.2–3 and 4.4.3.
 */

import type { SimKernel, SimResult, SimSeries } from '@/content/types'

export interface SafetyParams extends Record<string, number> {
  /** Supply voltage in volts. */
  supply: number
  /** First resistance in the divider, in ohms. */
  r1: number
  /** Second resistance in the divider, in ohms. */
  r2: number
  /** Fuse rating fitted, in amps. */
  fuseRating: number
}

/** Ratings a fuse is actually made in. Choosing anything else is not an option in practice. */
export const FUSE_RATINGS = [1, 3, 5, 10, 13] as const
/** Nothing larger than this is made for a domestic plug. */
export const LARGEST_FUSE = 13

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))

/** Voltage across the first resistor of a two-resistor divider. */
export function dividerVoltage(supply: number, r1: number, r2: number): number {
  const total = r1 + r2
  if (total <= 0) return 0
  return (supply * r1) / total
}

/** Current through a series circuit. */
export function seriesCurrent(supply: number, r1: number, r2: number): number {
  const total = r1 + r2
  if (total <= 0) return 0
  return supply / total
}

/**
 * The smallest standard fuse that will carry a given current.
 *
 * A fuse must be rated above the working current or it blows in normal use, and as little
 * above it as possible or it will not blow when something goes wrong. Both halves matter,
 * and students reliably remember only the second.
 */
export function suitableFuse(workingCurrent: number): number {
  // A current beyond the largest rating made has no suitable plug fuse at all, and
  // returning the largest is the honest answer rather than inventing a bigger one.
  return FUSE_RATINGS.find((r) => r > workingCurrent) ?? LARGEST_FUSE
}

const round = (v: number) => Math.round(v * 100) / 100

export const safetyKernel: SimKernel<SafetyParams, SimResult> = (params) => {
  const supply = clamp(params['supply'] ?? 12, 1, 250)
  const r1 = clamp(params['r1'] ?? 100, 1, 1000)
  const r2 = clamp(params['r2'] ?? 200, 1, 1000)
  const fitted = clamp(params['fuseRating'] ?? 3, 1, 13)

  const v1 = dividerVoltage(supply, r1, r2)
  const v2 = supply - v1
  const current = seriesCurrent(supply, r1, r2)
  const recommended = suitableFuse(current)

  const series: SimSeries[] = [
    {
      key: 'v1',
      label: { en: 'Voltage across R₁', zh: 'R₁ 两端的电压' },
      unit: { x: 'R₁ / Ω', y: 'voltage / V' },
      points: Array.from({ length: 101 }, (_, i) => {
        const x = i * 10
        return [x, round(dividerVoltage(supply, x, r2))] as [number, number]
      }),
      xBounds: { min: 0, max: 1000 },
      yBounds: { min: 0, max: 250 },
    },
    {
      key: 'v2',
      label: { en: 'Voltage across R₂', zh: 'R₂ 两端的电压' },
      unit: { x: 'R₁ / Ω', y: 'voltage / V' },
      // Plotted together on purpose: the two must always add to the supply, and seeing
      // one rise as the other falls is the constraint that the ratio rule alone hides.
      points: Array.from({ length: 101 }, (_, i) => {
        const x = i * 10
        return [x, round(supply - dividerVoltage(supply, x, r2))] as [number, number]
      }),
      xBounds: { min: 0, max: 1000 },
      yBounds: { min: 0, max: 250 },
    },
  ]

  return {
    series,
    readouts: {
      v1: round(v1),
      v2: round(v2),
      current: round(current),
      recommendedFuse: recommended,
    },
    markers: [
      {
        x: 0,
        y: 0,
        label:
          fitted <= current
            ? {
                en: `A ${fitted} A fuse would blow in normal use — the circuit draws ${round(current)} A. A fuse must be rated above the working current`,
                zh: `${fitted} A 的保险丝在正常使用时就会熔断——电路取用 ${round(current)} A。保险丝的额定值必须高于工作电流`,
              }
            : fitted > recommended
              ? {
                  en: `A ${fitted} A fuse is larger than needed. The smallest standard rating above ${round(current)} A is ${recommended} A — a fuse too far above the working current will not blow soon enough to protect anything`,
                  zh: `${fitted} A 的保险丝偏大。高于 ${round(current)} A 的最小标准额定值是 ${recommended} A——额定值过高的保险丝无法及时熔断，起不到保护作用`,
                }
              : {
                  en: `${fitted} A is the right choice: just above the working current of ${round(current)} A. The two voltages add to the supply, as they must`,
                  zh: `${fitted} A 是正确的选择：略高于 ${round(current)} A 的工作电流。两个电压之和等于电源电压，这是必然的`,
                },
      },
    ],
  }
}

export default safetyKernel
