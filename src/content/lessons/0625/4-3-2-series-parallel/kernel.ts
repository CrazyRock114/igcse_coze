/**
 * Series and parallel circuits — kernel for lesson 4-3-2-series-parallel.
 *
 * Two fixed topologies rather than a free circuit editor: those are the two the
 * syllabus examines, and fixing them means every reading on screen is a value the
 * kernel computed and a test can check.
 *
 * The kernel also places the animated charge carriers. They are what makes the two
 * hardest rules visible — in series the same current flows everywhere, in parallel the
 * main branch carries the sum of the branch currents. Dot *spacing* encodes current, so
 * a branch with twice the current shows twice as many dots moving past a point.
 *
 * Covers 0625.4.3.2.1–10, and supports 0625.4.2.4.1 and 0625.4.3.1.1.
 */

import type { SimBody, SimKernel, SimResult } from '@/content/types'

export interface CircuitParams extends Record<string, number> {
  /** 0 = series, 1 = parallel */
  parallel: number
  /** e.m.f. of the supply, in V */
  emf: number
  /** First resistance, in Ω */
  r1: number
  /** Second resistance, in Ω */
  r2: number
  /** Animation clock, in seconds */
  t: number
}

/** Branch identifiers the renderer knows how to draw. */
export type Branch = 'main' | 'r1' | 'r2'

/**
 * Charge-dot calibration.
 *
 * Currents in these circuits span roughly 0.06 A to 5 A, and the dots have two jobs at
 * once: there must always be enough of them to read as a flow, and there must be visibly
 * more of them where the current is larger. A bare count proportional to current gives
 * only one dot at a typical 0.2 A, so a floor is added and the slope is steep enough that
 * the parallel main wire still clearly out-populates either branch.
 */
const MIN_DOTS = 3
const DOTS_PER_AMP = 10
const MAX_DOTS_PER_BRANCH = 15

/** Loops per second per amp. Fast enough at 0.2 A to look like motion, not a crawl. */
const DRIFT_PER_AMP = 0.75

/** Combined resistance of two resistors in series. */
export function seriesResistance(r1: number, r2: number): number {
  return r1 + r2
}

/**
 * Combined resistance of two resistors in parallel.
 *
 * Always less than either resistor on its own — the fact students are asked to state
 * (0625.4.3.2.6) and routinely get backwards.
 */
export function parallelResistance(r1: number, r2: number): number {
  if (r1 <= 0 || r2 <= 0) return 0
  return (r1 * r2) / (r1 + r2)
}

/**
 * Charge carriers along one branch.
 *
 * `x` is the fraction along that branch's path, which the renderer maps onto its own
 * wire geometry. Count scales with current, so density reads as current directly.
 */
export function chargeDots(branch: Branch, current: number, t: number): SimBody[] {
  if (current <= 0) return []
  const count = Math.min(MAX_DOTS_PER_BRANCH, MIN_DOTS + Math.round(current * DOTS_PER_AMP))

  const dots: SimBody[] = []
  const drift = current * DRIFT_PER_AMP
  for (let i = 0; i < count; i++) {
    // Evenly spaced, all drifting together — charge does not bunch up in a circuit.
    const phase = i / count + t * drift
    dots.push({ x: phase - Math.floor(phase), y: 0, kind: branch })
  }
  return dots
}

export const circuitKernel: SimKernel<CircuitParams, SimResult> = ({
  parallel,
  emf,
  r1,
  r2,
  t,
}) => {
  const isParallel = parallel >= 0.5

  const totalResistance = isParallel ? parallelResistance(r1, r2) : seriesResistance(r1, r2)
  const supplyCurrent = totalResistance > 0 ? emf / totalResistance : 0

  // In series one current flows through both resistors and the p.d.s share out.
  // In parallel both resistors get the full e.m.f. and the currents add up.
  const i1 = isParallel ? emf / r1 : supplyCurrent
  const i2 = isParallel ? emf / r2 : supplyCurrent
  const v1 = isParallel ? emf : supplyCurrent * r1
  const v2 = isParallel ? emf : supplyCurrent * r2

  const bodies = [
    ...chargeDots('main', supplyCurrent, t),
    ...chargeDots('r1', i1, t),
    ...chargeDots('r2', i2, t),
  ]

  return {
    series: [],
    bodies,
    readouts: {
      // Reported so the lesson can state the rule that actually applies to the topology
      // on screen, rather than trying to infer it from the numbers.
      isParallel: isParallel ? 1 : 0,
      totalResistance,
      supplyCurrent,
      i1,
      i2,
      v1,
      v2,
      // Surfaced so the student can check the rule that applies to their topology:
      // series → the p.d.s add to the e.m.f.; parallel → the currents add to the supply.
      sumOfPds: v1 + v2,
      sumOfCurrents: i1 + i2,
      power: emf * supplyCurrent,
    },
  }
}

export default circuitKernel
