/**
 * Radioactive decay — kernel for lesson 5-2-radioactivity.
 *
 * Two things students routinely conflate are kept visibly separate here: the *measured*
 * count rate, which includes background, and the *corrected* count rate, which is what
 * half-life must be read from. Plotting both makes the correction concrete rather than a
 * rule to remember (0625.5.2.1.5, 0625.5.2.4.2).
 *
 * Decay is exponential, so the corrected curve halves in equal time intervals however
 * far along you start — the defining property of half-life.
 *
 * Covers 0625.5.2.1.1–5, 5.2.2.1–4, 5.2.3.1–5, 5.2.4.1–3, 5.2.5.1–3.
 */

import type { SimKernel, SimResult } from '@/content/types'

export interface DecayParams extends Record<string, number> {
  /** Half-life of the source, in hours */
  halfLife: number
  /** Corrected count rate at t = 0, in counts per second */
  initialRate: number
  /** Background count rate, in counts per second */
  background: number
  /** Duration plotted, in hours */
  duration: number
}

const SAMPLES = 121

/**
 * Corrected count rate after time t.
 *
 * A = A₀ × (1/2)^(t / t½). Exponential, so the fraction remaining depends only on how
 * many half-lives have elapsed — never on where you started counting.
 */
export function activityAt(initialRate: number, halfLife: number, t: number): number {
  if (halfLife <= 0) return 0
  return initialRate * Math.pow(0.5, t / halfLife)
}

/**
 * Half-life read back from two corrected readings.
 *
 * Used to check that the curve the student sees really does yield the half-life the
 * lesson claims — the same measurement they would make off graph paper.
 */
export function halfLifeFrom(rateA: number, rateB: number, elapsed: number): number {
  if (rateA <= 0 || rateB <= 0 || rateB >= rateA) return 0
  return (elapsed * Math.LN2) / Math.log(rateA / rateB)
}

/** Penetration and ionising power of the three emissions, for the comparison table. */
export const EMISSIONS = {
  alpha: { stoppedBy: 'paper', ionising: 3, penetrating: 1, charge: +2 },
  beta: { stoppedBy: 'a few mm of aluminium', ionising: 2, penetrating: 2, charge: -1 },
  gamma: { stoppedBy: 'thick lead', ionising: 1, penetrating: 3, charge: 0 },
} as const

export const decayKernel: SimKernel<DecayParams, SimResult> = ({
  halfLife,
  initialRate,
  background,
  duration,
}) => {
  const corrected: Array<[number, number]> = []
  const measured: Array<[number, number]> = []

  for (let i = 0; i < SAMPLES; i++) {
    const t = (i / (SAMPLES - 1)) * duration
    const a = activityAt(initialRate, halfLife, t)
    corrected.push([t, a])
    // What a detector actually reads: the source plus the background it cannot exclude.
    measured.push([t, a + background])
  }

  // Recovered from the plotted curve rather than from the parameter, so the readout is
  // a genuine check that the graph and the physics agree.
  const measuredHalfLife = halfLifeFrom(
    activityAt(initialRate, halfLife, 0),
    activityAt(initialRate, halfLife, halfLife),
    halfLife
  )

  const halfLivesElapsed = halfLife > 0 ? duration / halfLife : 0

  return {
    series: [
      {
        key: 'measured',
        label: { en: 'Measured count rate', zh: '测得计数率' },
        unit: { x: 'h', y: 'counts / s' },
        points: measured,
      },
      {
        key: 'corrected',
        label: { en: 'Corrected count rate', zh: '校正后计数率' },
        unit: { x: 'h', y: 'counts / s' },
        points: corrected,
      },
    ],
    readouts: {
      measuredHalfLife,
      halfLivesElapsed,
      rateAtEnd: activityAt(initialRate, halfLife, duration),
      // The measured curve flattens onto the background rather than reaching zero —
      // which is exactly why it cannot be used for half-life directly.
      measuredAtEnd: activityAt(initialRate, halfLife, duration) + background,
      fractionRemaining: initialRate > 0 ? activityAt(initialRate, halfLife, duration) / initialRate : 0,
    },
  }
}

export default decayKernel
