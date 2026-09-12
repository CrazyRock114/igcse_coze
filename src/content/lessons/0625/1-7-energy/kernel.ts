/**
 * Energy, work and power — kernel for lesson 1-7-energy.
 *
 * Plots kinetic and gravitational potential energy against height for a falling object,
 * plus their total. The total is a flat line when there is no air resistance, which is
 * conservation of energy made visible rather than asserted (0625.1.7.1.3).
 *
 * Turning air resistance on tilts the total downwards, and the gap is the energy
 * transferred to the surroundings — the thing a Sankey diagram accounts for.
 *
 * Covers 0625.1.7.1.1–6, 1.7.2.1–2, 1.7.3.1–7, 1.7.4.1.
 */

import type { SimKernel, SimResult } from '@/content/types'
import { G_EARTH } from '@/lib/units'

export interface EnergyParams extends Record<string, number> {
  /** Mass of the falling object, in kg */
  mass: number
  /** Height it is dropped from, in m */
  height: number
  /** Fraction of the energy lost to air resistance over the whole fall, 0–0.6 */
  lossFraction: number
  /** Time taken by the machine that lifted it, in s — used for the power readout */
  liftTime: number
}

const SAMPLES = 81

/** Gravitational potential energy relative to the ground: Ep = mgh. */
export function potentialEnergy(mass: number, h: number): number {
  return mass * G_EARTH * h
}

/** Kinetic energy: Ek = ½mv². */
export function kineticEnergy(mass: number, v: number): number {
  return 0.5 * mass * v * v
}

/** Speed implied by a kinetic energy — the inverse of the above. */
export function speedFrom(mass: number, ke: number): number {
  if (mass <= 0 || ke <= 0) return 0
  return Math.sqrt((2 * ke) / mass)
}

/**
 * Percentage efficiency of a transfer.
 *
 * Clamped to 100%: a machine cannot deliver more useful energy than it takes in, and a
 * readout claiming otherwise would teach the wrong thing.
 */
export function efficiency(useful: number, total: number): number {
  if (total <= 0) return 0
  return Math.min(100, (useful / total) * 100)
}

export const energyKernel: SimKernel<EnergyParams, SimResult> = ({
  mass,
  height,
  lossFraction,
  liftTime,
}) => {
  const startEp = potentialEnergy(mass, height)

  const ep: Array<[number, number]> = []
  const ek: Array<[number, number]> = []
  const total: Array<[number, number]> = []

  for (let i = 0; i < SAMPLES; i++) {
    // Plotted against distance fallen, so the object moves left to right as it drops.
    const fallen = (i / (SAMPLES - 1)) * height
    const h = height - fallen

    const currentEp = potentialEnergy(mass, h)
    // Energy lost to air resistance accumulates with distance fallen.
    const lost = startEp * lossFraction * (height > 0 ? fallen / height : 0)
    const currentEk = Math.max(0, startEp - currentEp - lost)

    ep.push([fallen, currentEp])
    ek.push([fallen, currentEk])
    total.push([fallen, currentEp + currentEk])
  }

  const finalKe = Math.max(0, startEp * (1 - lossFraction))
  const wasted = startEp - finalKe

  return {
    series: [
      {
        key: 'ep',
        label: { en: 'Potential energy', zh: '重力势能' },
        unit: { x: 'm fallen', y: 'J' },
        points: ep,
      },
      {
        key: 'ek',
        label: { en: 'Kinetic energy', zh: '动能' },
        unit: { x: 'm fallen', y: 'J' },
        points: ek,
      },
      {
        key: 'total',
        label: { en: 'Total energy', zh: '总能量' },
        unit: { x: 'm fallen', y: 'J' },
        points: total,
      },
    ],
    readouts: {
      startPotential: startEp,
      impactKinetic: finalKe,
      impactSpeed: speedFrom(mass, finalKe),
      wastedEnergy: wasted,
      efficiencyPercent: efficiency(finalKe, startEp),
      // Work done lifting it back up equals the potential energy gained; power is that
      // work divided by the time taken (0625.1.7.2.2 and 1.7.4.1).
      liftingWork: startEp,
      liftingPower: liftTime > 0 ? startEp / liftTime : 0,
    },
  }
}

export default energyKernel
