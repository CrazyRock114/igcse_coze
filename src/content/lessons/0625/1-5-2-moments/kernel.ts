/**
 * Moments and the balance beam — kernel for lesson 1-5-2-moments.
 *
 * The beam tilts by an amount derived from the *net* moment, so the picture and the
 * arithmetic can never disagree: if the numbers say balanced, the beam is level.
 *
 * Sign convention: the left-hand weight turns the beam anticlockwise, the right-hand
 * weight clockwise. Net moment is clockwise minus anticlockwise, so a positive net
 * moment tips the right-hand side down.
 *
 * Covers 0625.1.5.2.1–6.
 */

import type { SimKernel, SimResult } from '@/content/types'
import { G_EARTH } from '@/lib/units'

export interface MomentsParams extends Record<string, number> {
  /** Mass hung on the left of the pivot, in kg */
  leftMass: number
  /** Distance of the left mass from the pivot, in m */
  leftDistance: number
  rightMass: number
  rightDistance: number
}

/** Half-length of the beam, in metres. Distances are limited to this. */
export const BEAM_HALF_LENGTH = 0.5

/** Largest tilt shown, in degrees. A real beam would swing further; this reads better. */
const MAX_TILT = 22

/** Net moment at which the beam is drawn at full tilt. */
const TILT_SCALE = 4

/** Below this the beam counts as balanced — a beam is never exactly level in practice. */
const BALANCE_TOLERANCE = 0.01

/** Moment of a force about a pivot: the force times the perpendicular distance. */
export function moment(mass: number, distance: number): number {
  return mass * G_EARTH * distance
}

/**
 * Tilt angle in degrees from the net moment.
 *
 * `atan` gives a soft saturation, so a large imbalance still looks large without the
 * beam ever swinging past `MAX_TILT` and out of the frame.
 */
export function tiltAngle(netMoment: number): number {
  return (Math.atan(netMoment / TILT_SCALE) / (Math.PI / 2)) * MAX_TILT
}

/**
 * The mass on the right that would balance the beam, given everything else.
 *
 * Backs the "balance it for me" button: the student sees what balance looks like,
 * then perturbs it. Returns `null` when no positive mass would do it.
 */
export function balancingMass(
  leftMass: number,
  leftDistance: number,
  rightDistance: number
): number | null {
  if (rightDistance <= 0) return null
  const m = (leftMass * leftDistance) / rightDistance
  return Number.isFinite(m) && m > 0 ? m : null
}

export const momentsKernel: SimKernel<MomentsParams, SimResult> = ({
  leftMass,
  leftDistance,
  rightMass,
  rightDistance,
}) => {
  const anticlockwise = moment(leftMass, leftDistance)
  const clockwise = moment(rightMass, rightDistance)
  const net = clockwise - anticlockwise
  const balanced = Math.abs(net) < BALANCE_TOLERANCE

  const tilt = balanced ? 0 : tiltAngle(net)
  const rad = (tilt * Math.PI) / 180

  // Beam endpoints, rotated about the pivot at the origin. Positive tilt drops the
  // right-hand end, which is why the y term is negated on the right.
  const cos = Math.cos(rad)
  const sin = Math.sin(rad)
  const beam: Array<[number, number]> = [
    [-BEAM_HALF_LENGTH * cos, BEAM_HALF_LENGTH * sin],
    [BEAM_HALF_LENGTH * cos, -BEAM_HALF_LENGTH * sin],
  ]

  // Weights hang from the beam at their own distances, so they ride up and down with it.
  const bodies = [
    {
      x: -leftDistance * cos,
      y: leftDistance * sin,
      r: Math.cbrt(leftMass) * 0.055,
      kind: 'left',
    },
    {
      x: rightDistance * cos,
      y: -rightDistance * sin,
      r: Math.cbrt(rightMass) * 0.055,
      kind: 'right',
    },
  ]

  return {
    series: [
      { key: 'beam', label: { en: 'Beam', zh: '杠杆' }, unit: { x: 'm', y: 'm' }, points: beam },
    ],
    bodies,
    readouts: {
      anticlockwiseMoment: anticlockwise,
      clockwiseMoment: clockwise,
      netMoment: net,
      balanced: balanced ? 1 : 0,
      tilt,
    },
    bounds: { xMin: -0.62, xMax: 0.62, yMin: -0.42, yMax: 0.3 },
  }
}

export default momentsKernel
