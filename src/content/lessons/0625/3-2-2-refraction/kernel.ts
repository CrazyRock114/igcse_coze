/**
 * Refraction and total internal reflection — kernel for lesson 3-2-2-refraction.
 *
 * All geometry is computed here so the drawing is provably the physics: the angle the
 * student measures with a protractor on screen is the angle Snell's law predicts.
 *
 * Coordinate space: the boundary is the horizontal line y = 0, the normal is the
 * y axis, and light travels towards the origin from the upper left. Medium 1 (the
 * incident side) is above; medium 2 is below.
 *
 * Covers 0625.3.2.2.1–9.
 */

import type { SimKernel, SimResult } from '@/content/types'
import { toDegrees, toRadians } from '@/lib/units'

export interface RefractionParams extends Record<string, number> {
  /** Angle of incidence, measured from the normal, in degrees */
  angleOfIncidence: number
  /** Refractive index of the optically denser medium */
  n: number
  /** 0 = travelling into the denser medium, 1 = travelling out of it */
  fromDenser: number
}

/** Length of each drawn ray, in simulation units. */
const RAY = 1

/**
 * Snell's law, solved for the angle of refraction.
 *
 * Returns `null` when the light cannot leave the medium — the sine required would
 * exceed 1, which is total internal reflection.
 */
export function refractedAngle(n1: number, n2: number, incidenceDeg: number): number | null {
  const sinR = (n1 * Math.sin(toRadians(incidenceDeg))) / n2
  if (sinR > 1) return null
  return toDegrees(Math.asin(sinR))
}

/**
 * Critical angle for a boundary with a less dense medium: c = arcsin(1 / n).
 *
 * Only defined going from dense to less dense; there is no critical angle on the way
 * in, because the ray bends towards the normal and can always get through.
 */
export function criticalAngle(n: number): number {
  if (n <= 1) return 90
  return toDegrees(Math.asin(1 / n))
}

export const refractionKernel: SimKernel<RefractionParams, SimResult> = ({
  angleOfIncidence,
  n,
  fromDenser,
}) => {
  const goingOut = fromDenser >= 0.5
  const n1 = goingOut ? n : 1
  const n2 = goingOut ? 1 : n

  const i = angleOfIncidence
  const r = refractedAngle(n1, n2, i)
  const isTIR = r === null

  const iRad = toRadians(i)

  // Incident ray: comes in from the upper left towards the origin. `incidentSide`
  // flips the drawing when the light starts inside the dense medium (below).
  const incidentSide = goingOut ? -1 : 1
  const incident: Array<[number, number]> = [
    [-RAY * Math.sin(iRad), incidentSide * RAY * Math.cos(iRad)],
    [0, 0],
  ]

  // Reflected ray: mirrors about the normal, staying on the incident side.
  // Always present — refraction is never 100% efficient — but it is only the whole
  // story under total internal reflection.
  const reflected: Array<[number, number]> = [
    [0, 0],
    [RAY * Math.sin(iRad), incidentSide * RAY * Math.cos(iRad)],
  ]

  // Transmitted ray: crosses to the far side, bent by the refracted angle.
  const transmitted: Array<[number, number]> = isTIR
    ? []
    : [
        [0, 0],
        [RAY * Math.sin(toRadians(r)), -incidentSide * RAY * Math.cos(toRadians(r))],
      ]

  return {
    series: [
      {
        key: 'incident',
        label: { en: 'Incident ray', zh: '入射光线' },
        unit: { x: '', y: '' },
        points: incident,
      },
      {
        key: 'refracted',
        label: { en: 'Refracted ray', zh: '折射光线' },
        unit: { x: '', y: '' },
        points: transmitted,
      },
      {
        key: 'reflected',
        label: { en: 'Reflected ray', zh: '反射光线' },
        unit: { x: '', y: '' },
        points: reflected,
      },
    ],
    readouts: {
      angleOfIncidence: i,
      // Under TIR there is no refracted ray; report 0 rather than a misleading angle.
      angleOfRefraction: r ?? 0,
      criticalAngle: criticalAngle(n),
      // Exposed as a number so it can drive the readout panel and be asserted in tests.
      totalInternalReflection: isTIR ? 1 : 0,
    },
    bounds: { xMin: -1.15, xMax: 1.15, yMin: -1.15, yMax: 1.15 },
  }
}

export default refractionKernel
