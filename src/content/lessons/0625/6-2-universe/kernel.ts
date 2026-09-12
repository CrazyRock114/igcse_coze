/**
 * Redshift and the expanding Universe — kernel for lesson 6-2-universe.
 *
 * Plots recession speed against distance for a set of galaxies. The straight line through
 * the origin *is* Hubble's law, and its gradient is the Hubble constant — so the student
 * measures H₀ off the graph rather than being handed it (0625.6.2.3.9).
 *
 * The reciprocal of that gradient estimates the age of the Universe (0625.6.2.3.11),
 * which is the payoff: a number about the beginning of everything, read off a straight
 * line a student drew themselves.
 *
 * Covers 0625.6.2.1.1–2, 6.2.2.1–3, 6.2.3.1–11.
 */

import type { SimKernel, SimResult } from '@/content/types'

export interface UniverseParams extends Record<string, number> {
  /** Hubble constant, in units of 10⁻¹⁸ per second */
  hubbleConstant: number
  /** Number of galaxies plotted */
  galaxyCount: number
  /** Scatter in the measurements, 0 = perfect data, 1 = realistically messy */
  scatter: number
}

/** Metres in one light-year. */
export const METRES_PER_LIGHT_YEAR = 9.5e15

/** Seconds in one year, for converting 1 / H₀ into an age. */
const SECONDS_PER_YEAR = 365.25 * 24 * 3600

/** Farthest galaxy plotted, in millions of light-years. */
const MAX_DISTANCE_MLY = 600

/**
 * Recession speed from Hubble's law: v = H₀d.
 *
 * `hubbleConstant` arrives in units of 10⁻¹⁸ s⁻¹ (the current estimate is about 2.2),
 * and distance in millions of light-years. Returns km / s, the unit used on sky surveys.
 */
export function recessionSpeed(hubbleConstant: number, distanceMly: number): number {
  const h0 = hubbleConstant * 1e-18
  const d = distanceMly * 1e6 * METRES_PER_LIGHT_YEAR
  return (h0 * d) / 1000
}

/**
 * Age of the Universe estimated as 1 / H₀, in billions of years.
 *
 * This assumes the expansion rate has always been what it is now — a simplification, but
 * the one the syllabus asks for, and it lands close to the accepted 13.8 billion years.
 */
export function universeAge(hubbleConstant: number): number {
  if (hubbleConstant <= 0) return 0
  const h0 = hubbleConstant * 1e-18
  return 1 / h0 / SECONDS_PER_YEAR / 1e9
}

/**
 * Deterministic scatter, so the plotted data looks like a real survey but does not
 * reshuffle on every render.
 */
function jitter(seed: number): number {
  const x = Math.sin(seed * 127.1) * 43758.5453
  return (x - Math.floor(x)) * 2 - 1
}

export const universeKernel: SimKernel<UniverseParams, SimResult> = ({
  hubbleConstant,
  galaxyCount,
  scatter,
}) => {
  const n = Math.max(3, Math.round(galaxyCount))

  const observed: Array<[number, number]> = []
  const bestFit: Array<[number, number]> = []

  for (let i = 0; i < n; i++) {
    const d = ((i + 1) / n) * MAX_DISTANCE_MLY
    const trueV = recessionSpeed(hubbleConstant, d)
    // Scatter grows with distance, as real distance measurements do.
    observed.push([d, Math.max(0, trueV * (1 + scatter * 0.18 * jitter(i + 1)))])
  }

  // The line a student would draw: straight, through the origin.
  for (let i = 0; i <= 20; i++) {
    const d = (i / 20) * MAX_DISTANCE_MLY
    bestFit.push([d, recessionSpeed(hubbleConstant, d)])
  }

  return {
    series: [
      {
        key: 'observed',
        label: { en: 'Observed galaxies', zh: '观测到的星系' },
        unit: { x: 'million light-years', y: 'km / s' },
        points: observed,
      },
      {
        key: 'bestFit',
        label: { en: 'Best-fit line', zh: '最佳拟合直线' },
        unit: { x: 'million light-years', y: 'km / s' },
        points: bestFit,
      },
    ],
    readouts: {
      hubbleConstant: hubbleConstant,
      ageOfUniverse: universeAge(hubbleConstant),
      // Speed of the most distant galaxy shown, so the scale of the numbers registers.
      farthestSpeed: recessionSpeed(hubbleConstant, MAX_DISTANCE_MLY),
      // Gradient of the fitted line in km/s per million light-years, which is what a
      // student would actually compute from two points on their graph.
      gradient: recessionSpeed(hubbleConstant, MAX_DISTANCE_MLY) / MAX_DISTANCE_MLY,
    },
  }
}

export default universeKernel
