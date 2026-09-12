/**
 * Rate of reaction — kernel for lesson 0620/6-2-rate-of-reaction.
 *
 * Volume of gas collected against time, for marble chips reacting with hydrochloric acid.
 * The curve rises steeply then levels off as the limiting reactant runs out.
 *
 * The distinction the whole topic turns on is built into the model: temperature, surface
 * area and a catalyst change *how fast* you get there — the gradient — but not *how much*
 * gas you end up with. Concentration changes both, because the acid is the limiting
 * reactant. Students who have only memorised "more of everything is faster" get the
 * plateau question wrong every year.
 *
 * Covers 0620.6.2.1–8.
 */

import type { SimKernel, SimResult } from '@/content/types'

export interface RateParams extends Record<string, number> {
  /** Concentration of the acid, in mol / dm³ */
  concentration: number
  /** Temperature, in °C */
  temperature: number
  /** 0 = large chips, 1 = small chips, 2 = powder */
  surfaceArea: number
  /** 0 = no catalyst, 1 = catalyst present */
  catalyst: number
  /** Duration plotted, in s */
  duration: number
}

const SAMPLES = 121

/** Gas produced per mol/dm³ of acid, in cm³. Fixed acid volume, so yield ∝ concentration. */
const YIELD_PER_MOL = 60

/** Reference temperature for the rate model, in °C. */
const T_REF = 25

/** Relative surface area for each form of the solid. */
export const SURFACE_FORMS = [
  { key: 'large-chips', factor: 1.0, label: 'large chips' },
  { key: 'small-chips', factor: 1.8, label: 'small chips' },
  { key: 'powder', factor: 3.2, label: 'powder' },
] as const

/**
 * Final volume of gas, set by the limiting reactant.
 *
 * Only concentration appears. Heating the flask or grinding the marble cannot create
 * more product — there is only so much acid to react (0620.6.2.4).
 */
export function finalVolume(concentration: number): number {
  return YIELD_PER_MOL * concentration
}

/**
 * Rate constant, in s⁻¹.
 *
 * Every factor that increases the frequency or energy of successful collisions appears
 * here: more concentrated acid, more surface exposed, higher temperature, or a catalyst
 * lowering the activation energy (0620.6.2.5–7).
 *
 * Temperature uses a rough doubling per 10 °C, the rule of thumb 0620 expects.
 */
export function rateConstant(
  concentration: number,
  temperature: number,
  surfaceArea: number,
  catalyst: number
): number {
  const form = SURFACE_FORMS[Math.min(2, Math.max(0, Math.round(surfaceArea)))]!
  const tempFactor = Math.pow(2, (temperature - T_REF) / 10)
  const catalystFactor = catalyst >= 0.5 ? 2.5 : 1
  return 0.012 * concentration * form.factor * tempFactor * catalystFactor
}

/** Volume of gas collected by time t: an exponential approach to the final volume. */
export function volumeAt(finalV: number, k: number, t: number): number {
  return finalV * (1 - Math.exp(-k * t))
}

export const rateKernel: SimKernel<RateParams, SimResult> = ({
  concentration,
  temperature,
  surfaceArea,
  catalyst,
  duration,
}) => {
  const finalV = finalVolume(concentration)
  const k = rateConstant(concentration, temperature, surfaceArea, catalyst)

  // Always drawn against a fixed reference run, so a change has something to be compared
  // with — a single curve alone says nothing about whether it got faster.
  const kReference = rateConstant(1, T_REF, 0, 0)
  const finalReference = finalVolume(1)

  const chosen: Array<[number, number]> = []
  const reference: Array<[number, number]> = []

  for (let i = 0; i < SAMPLES; i++) {
    const t = (i / (SAMPLES - 1)) * duration
    chosen.push([t, volumeAt(finalV, k, t)])
    reference.push([t, volumeAt(finalReference, kReference, t)])
  }

  return {
    series: [
      {
        key: 'chosen',
        label: { en: 'Chosen conditions', zh: '所选条件' },
        unit: { x: 's', y: 'cm³' },
        points: chosen,
      },
      {
        key: 'reference',
        label: { en: 'Reference run', zh: '参照实验' },
        unit: { x: 's', y: 'cm³' },
        points: reference,
      },
    ],
    readouts: {
      // Gradient of the tangent at t = 0 — the measurement students are asked to take.
      initialRate: finalV * k,
      finalVolume: finalV,
      rateConstant: k,
      // Time to reach half the final volume; a fair way to compare runs of different yield.
      halfTime: k > 0 ? Math.LN2 / k : 0,
      volumeAtEnd: volumeAt(finalV, k, duration),
    },
  }
}

export default rateKernel
