/**
 * Heating curve — kernel for lesson 2-2-thermal-properties.
 *
 * Temperature against energy supplied, for a substance taken from solid to gas at a
 * steady heating power. The graph does the teaching: sloped sections where the
 * temperature rises, and two flat plateaus where energy goes in but the temperature does
 * not move at all. That is the single hardest idea in this topic (0625.2.2.3.1), and it
 * is far more convincing seen than asserted.
 *
 * The gradient of a sloped section is 1/(mc), so a bigger specific heat capacity gives a
 * shallower slope — the definition made visible (0625.2.2.2.3).
 *
 * Covers 0625.2.2.1.1–3, 2.2.2.1–4, 2.2.3.1–8.
 */

import type { SimKernel, SimResult } from '@/content/types'

export interface HeatingParams extends Record<string, number> {
  /** Mass being heated, in kg */
  mass: number
  /** Specific heat capacity of the liquid, in J / (kg °C) */
  specificHeat: number
  /** Specific latent heat of fusion, in kJ / kg */
  latentFusion: number
  /** Specific latent heat of vaporisation, in kJ / kg */
  latentVaporisation: number
  /** Heater power, in W */
  power: number
}

/** Melting and boiling points of the substance modelled, in °C. Water-like by default. */
export const MELTING_POINT = 0
export const BOILING_POINT = 100
const START_TEMP = -25
const END_TEMP = 125

/** Solids and gases generally take less energy per degree than the liquid phase. */
const SOLID_C_RATIO = 0.5
const GAS_C_RATIO = 0.47

/** Energy needed to change the temperature of a mass: E = mcΔθ. */
export function heatEnergy(mass: number, c: number, deltaTheta: number): number {
  return mass * c * deltaTheta
}

/** Energy needed to change state without changing temperature: E = mL. */
export function latentEnergy(mass: number, latentKJ: number): number {
  return mass * latentKJ * 1000
}

/**
 * The five stages of the curve, as cumulative energy in joules.
 *
 * Returned so tests can check the plateaus land where the physics says they should,
 * rather than merely somewhere plausible.
 */
export function stageBoundaries(p: HeatingParams): number[] {
  const { mass, specificHeat, latentFusion, latentVaporisation } = p
  const solidHeat = heatEnergy(mass, specificHeat * SOLID_C_RATIO, MELTING_POINT - START_TEMP)
  const melt = latentEnergy(mass, latentFusion)
  const liquidHeat = heatEnergy(mass, specificHeat, BOILING_POINT - MELTING_POINT)
  const boil = latentEnergy(mass, latentVaporisation)
  const gasHeat = heatEnergy(mass, specificHeat * GAS_C_RATIO, END_TEMP - BOILING_POINT)

  const b: number[] = [0]
  for (const stage of [solidHeat, melt, liquidHeat, boil, gasHeat]) b.push(b[b.length - 1]! + stage)
  return b
}

/** Temperature after a given energy input. */
export function temperatureAt(p: HeatingParams, energy: number): number {
  const [, b1, b2, b3, b4] = stageBoundaries(p) as [number, number, number, number, number, number]
  const { mass, specificHeat } = p

  if (energy <= b1) {
    // Warming the solid.
    const c = specificHeat * SOLID_C_RATIO
    return START_TEMP + (mass * c > 0 ? energy / (mass * c) : 0)
  }
  // Melting: energy goes in, temperature holds.
  if (energy <= b2) return MELTING_POINT
  if (energy <= b3) {
    return MELTING_POINT + (mass * specificHeat > 0 ? (energy - b2) / (mass * specificHeat) : 0)
  }
  // Boiling: the second plateau, and the longer one for water.
  if (energy <= b4) return BOILING_POINT
  const c = specificHeat * GAS_C_RATIO
  return Math.min(END_TEMP, BOILING_POINT + (mass * c > 0 ? (energy - b4) / (mass * c) : 0))
}

const SAMPLES = 220

export const heatingKernel: SimKernel<HeatingParams, SimResult> = (params) => {
  const boundaries = stageBoundaries(params)
  const totalEnergy = boundaries[boundaries.length - 1]!

  const points: Array<[number, number]> = []
  for (let i = 0; i < SAMPLES; i++) {
    const energy = (i / (SAMPLES - 1)) * totalEnergy
    // Plotted against time, since that is what a student actually measures with a
    // stopwatch while a heater of known power runs.
    const t = params.power > 0 ? energy / params.power : 0
    points.push([t, temperatureAt(params, energy)])
  }

  const meltEnergy = latentEnergy(params.mass, params.latentFusion)
  const boilEnergy = latentEnergy(params.mass, params.latentVaporisation)
  const liquidHeat = heatEnergy(params.mass, params.specificHeat, BOILING_POINT - MELTING_POINT)

  return {
    series: [
      {
        key: 'heating',
        label: { en: 'Temperature against time', zh: '温度–时间图' },
        unit: { x: 's', y: '°C' },
        points,
      },
    ],
    readouts: {
      // Gradient of the liquid section: the steepness a student would measure.
      liquidGradient:
        params.mass * params.specificHeat > 0 ? params.power / (params.mass * params.specificHeat) : 0,
      energyToMelt: meltEnergy,
      energyToHeatLiquid: liquidHeat,
      energyToBoil: boilEnergy,
      totalTime: params.power > 0 ? totalEnergy / params.power : 0,
      // Boiling always takes far more energy than melting — worth surfacing, because the
      // long second plateau surprises students every year.
      boilToMeltRatio: meltEnergy > 0 ? boilEnergy / meltEnergy : 0,
    },
  }
}

export default heatingKernel
