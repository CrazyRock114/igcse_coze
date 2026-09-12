/**
 * The Solar System — kernel for lesson 6-1-solar-system.
 *
 * Built on real planetary data rather than invented numbers, because the syllabus asks
 * students to *analyse and interpret* that data (0625.6.1.2.8). Plotting orbital speed
 * against distance then shows the trend falling away from the Sun (0625.6.1.2.9) as a
 * consequence of the data, not as a claim to be believed.
 *
 * Covers 0625.6.1.1.1–4 and 6.1.2.1–10.
 */

import type { SimKernel, SimResult } from '@/content/types'

export interface SolarParams extends Record<string, number> {
  /** Index into PLANETS */
  planet: number
  /** 0 = orbital speed against distance, 1 = surface gravity, 2 = orbital period */
  quantity: number
}

export interface Planet {
  name: string
  /** Mean orbital radius, in millions of km */
  radiusGm: number
  /** Orbital period, in Earth years */
  periodYears: number
  /** Gravitational field strength at the surface, in N / kg */
  surfaceGravity: number
  /** Mean density, in kg / m³ */
  density: number
  rocky: boolean
}

/** Mean values, rounded to the precision a 0625 data table would print. */
export const PLANETS: Planet[] = [
  { name: 'Mercury', radiusGm: 57.9, periodYears: 0.241, surfaceGravity: 3.7, density: 5430, rocky: true },
  { name: 'Venus', radiusGm: 108.2, periodYears: 0.615, surfaceGravity: 8.9, density: 5240, rocky: true },
  { name: 'Earth', radiusGm: 149.6, periodYears: 1.0, surfaceGravity: 9.8, density: 5510, rocky: true },
  { name: 'Mars', radiusGm: 227.9, periodYears: 1.88, surfaceGravity: 3.7, density: 3930, rocky: true },
  { name: 'Jupiter', radiusGm: 778.6, periodYears: 11.9, surfaceGravity: 23.1, density: 1330, rocky: false },
  { name: 'Saturn', radiusGm: 1433.5, periodYears: 29.4, surfaceGravity: 9.0, density: 687, rocky: false },
  { name: 'Uranus', radiusGm: 2872.5, periodYears: 84.0, surfaceGravity: 8.7, density: 1270, rocky: false },
  { name: 'Neptune', radiusGm: 4495.1, periodYears: 164.8, surfaceGravity: 11.0, density: 1640, rocky: false },
]

/** Speed of light, m / s. */
export const C = 3.0e8

const SECONDS_PER_YEAR = 365.25 * 24 * 3600

/**
 * Average orbital speed: v = 2πr / T.
 *
 * Distance once round the orbit divided by the time to go round — the definition the
 * syllabus asks students to recall and use (0625.6.1.1.4).
 */
export function orbitalSpeed(radiusGm: number, periodYears: number): number {
  if (periodYears <= 0) return 0
  const r = radiusGm * 1e9 // millions of km → metres
  return (2 * Math.PI * r) / (periodYears * SECONDS_PER_YEAR)
}

/** Time for light to travel a distance, in seconds. */
export function lightTravelTime(distanceGm: number): number {
  return (distanceGm * 1e9) / C
}

export const solarKernel: SimKernel<SolarParams, SimResult> = ({ planet, quantity }) => {
  const index = Math.min(PLANETS.length - 1, Math.max(0, Math.round(planet)))
  const chosen = PLANETS[index]!

  const pick = (p: Planet): number => {
    if (quantity >= 1.5) return p.periodYears
    if (quantity >= 0.5) return p.surfaceGravity
    return orbitalSpeed(p.radiusGm, p.periodYears) / 1000 // km / s reads better than m / s
  }

  const unitY = quantity >= 1.5 ? 'years' : quantity >= 0.5 ? 'N / kg' : 'km / s'

  return {
    series: [
      {
        key: 'planets',
        label:
          quantity >= 1.5
            ? { en: 'Orbital period against distance', zh: '公转周期–距离' }
            : quantity >= 0.5
              ? { en: 'Surface gravity against distance', zh: '表面重力–距离' }
              : { en: 'Orbital speed against distance', zh: '轨道速度–距离' },
        unit: { x: 'million km', y: unitY },
        points: PLANETS.map((p) => [p.radiusGm, pick(p)] as [number, number]),
      },
    ],
    readouts: {
      orbitalSpeed: orbitalSpeed(chosen.radiusGm, chosen.periodYears) / 1000,
      distanceFromSun: chosen.radiusGm,
      lightMinutes: lightTravelTime(chosen.radiusGm) / 60,
      surfaceGravity: chosen.surfaceGravity,
      density: chosen.density,
      orbitalPeriod: chosen.periodYears,
      // 1 for the four inner rocky planets, 0 for the four gas giants.
      isRocky: chosen.rocky ? 1 : 0,
    },
  }
}

export default solarKernel
