/**
 * Motion under constant acceleration — simulation kernel for lesson 1-2-motion.
 *
 * Pure function: parameters in, series and readouts out. No DOM, no React, no
 * randomness — so the physics can be unit-tested on its own, and the numbers the
 * student sees on the graph are provably the numbers in the readouts.
 *
 * Covers 0625.1.2.1–8 (Core) and 0625.1.2.9, .11, .12 (Supplement).
 */

import type { SimKernel, SimResult } from '@/content/types'

export interface MotionParams extends Record<string, number> {
  /** Initial speed u, in m / s */
  u: number
  /** Acceleration a, in m / s² (negative for deceleration) */
  a: number
  /** Duration of the motion, in s */
  duration: number
}

/** Number of points sampled per series. Enough for a smooth curve, cheap to compute. */
const SAMPLES = 120

/**
 * Speed at time t under constant acceleration: v = u + at.
 *
 * Clamped at zero: a decelerating object stops, it does not reverse. This matters
 * because 0625 treats "deceleration" as motion coming to rest, and a graph that
 * dips below the axis would teach the wrong thing.
 */
export function speedAt(u: number, a: number, t: number): number {
  return Math.max(0, u + a * t)
}

/** The time at which a decelerating object comes to rest, or `Infinity` if it never does. */
export function timeToRest(u: number, a: number): number {
  if (a >= 0) return Infinity
  return -u / a
}

/**
 * Distance travelled by time t.
 *
 * Uses s = ut + ½at² while moving, then holds constant once the object has stopped —
 * consistent with `speedAt` clamping at zero.
 */
export function distanceAt(u: number, a: number, t: number): number {
  const stop = timeToRest(u, a)
  const tEff = Math.min(t, stop)
  return u * tEff + 0.5 * a * tEff * tEff
}

export const motionKernel: SimKernel<MotionParams, SimResult> = ({ u, a, duration }) => {
  const dt = duration / (SAMPLES - 1)

  const distanceTime: Array<[number, number]> = []
  const speedTime: Array<[number, number]> = []

  for (let i = 0; i < SAMPLES; i++) {
    const t = i * dt
    distanceTime.push([t, distanceAt(u, a, t)])
    speedTime.push([t, speedAt(u, a, t)])
  }

  const finalSpeed = speedAt(u, a, duration)
  const distance = distanceAt(u, a, duration)
  const averageSpeed = duration > 0 ? distance / duration : 0
  const stop = timeToRest(u, a)

  return {
    series: [
      {
        key: 'distance',
        label: { en: 'Distance–time', zh: '位移–时间' },
        unit: { x: 's', y: 'm' },
        points: distanceTime,
      },
      {
        key: 'speed',
        label: { en: 'Speed–time', zh: '速度–时间' },
        unit: { x: 's', y: 'm / s' },
        points: speedTime,
      },
    ],
    readouts: {
      finalSpeed,
      distance,
      averageSpeed,
      // Reported so the student can check the graph against the equation.
      // Infinity would render as garbage, so surface the duration instead.
      timeToRest: Number.isFinite(stop) ? Math.min(stop, duration) : duration,
    },
  }
}

export default motionKernel
