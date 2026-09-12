/**
 * Cooling curves — kernel for lesson 2-3-heat-transfer.
 *
 * A hot object cooling in cool surroundings, with the surface finish, area and lagging
 * under the student's control. Plotting two surfaces on the same axes turns "a dull black
 * surface is a better emitter" from a sentence to memorise into a gap you can measure
 * (0625.2.3.3.3, .7, .9).
 *
 * Newton's law of cooling: the rate of energy loss is proportional to the temperature
 * excess over the surroundings, so the curve is exponential and every object approaches
 * room temperature without ever quite reaching it.
 */

import type { SimKernel, SimResult } from '@/content/types'

export interface CoolingParams extends Record<string, number> {
  /** Starting temperature of the object, in °C */
  startTemp: number
  /** Temperature of the surroundings, in °C */
  roomTemp: number
  /** 0 = dull black, 1 = shiny silver, 2 = dull white, 3 = shiny black */
  surface: number
  /** Surface area as a multiple of the reference area */
  area: number
  /** Thickness of insulating lagging, 0 = none, 1 = heavy */
  lagging: number
  /** Duration plotted, in minutes */
  duration: number
}

const SAMPLES = 121

/**
 * How well each surface emits infrared, relative to a dull black one.
 *
 * Two factors are at work and students must separate them: colour (dark emits better
 * than light) and texture (dull emits better than shiny). A shiny silver surface is the
 * worst emitter on both counts, which is why vacuum flasks are silvered.
 */
export const SURFACES = [
  { key: 'dull-black', emissivity: 1.0, label: 'dull black' },
  { key: 'shiny-silver', emissivity: 0.3, label: 'shiny silver' },
  { key: 'dull-white', emissivity: 0.7, label: 'dull white' },
  { key: 'shiny-black', emissivity: 0.65, label: 'shiny black' },
] as const

/** Base cooling constant, per minute, for a reference object with a dull black surface. */
const BASE_RATE = 0.055

/**
 * Cooling constant for a given surface, area and lagging.
 *
 * More area means more surface to radiate from, so faster cooling. Lagging traps a layer
 * of still air, which is a poor conductor, so it slows the loss.
 */
export function coolingConstant(surface: number, area: number, lagging: number): number {
  const emissivity = SURFACES[Math.min(SURFACES.length - 1, Math.max(0, Math.round(surface)))]!.emissivity
  return BASE_RATE * emissivity * area * (1 - 0.75 * Math.min(1, Math.max(0, lagging)))
}

/**
 * Temperature after time t: an exponential approach to the surroundings.
 *
 * θ = θ_room + (θ_start − θ_room) e^(−kt). The excess over room temperature halves in
 * equal time intervals, exactly like radioactive decay.
 */
export function temperatureAt(
  startTemp: number,
  roomTemp: number,
  k: number,
  t: number
): number {
  return roomTemp + (startTemp - roomTemp) * Math.exp(-k * t)
}

export const coolingKernel: SimKernel<CoolingParams, SimResult> = ({
  startTemp,
  roomTemp,
  surface,
  area,
  lagging,
  duration,
}) => {
  const k = coolingConstant(surface, area, lagging)
  // Always drawn against a dull black reference, so the chosen surface has something to
  // be compared with — a single curve alone says nothing about surface finish.
  const kReference = coolingConstant(0, area, lagging)

  const chosen: Array<[number, number]> = []
  const reference: Array<[number, number]> = []

  for (let i = 0; i < SAMPLES; i++) {
    const t = (i / (SAMPLES - 1)) * duration
    chosen.push([t, temperatureAt(startTemp, roomTemp, k, t)])
    reference.push([t, temperatureAt(startTemp, roomTemp, kReference, t)])
  }

  const excess = startTemp - roomTemp
  const finalTemp = temperatureAt(startTemp, roomTemp, k, duration)

  return {
    series: [
      {
        key: 'chosen',
        label: { en: 'Chosen surface', zh: '所选表面' },
        unit: { x: 'min', y: '°C' },
        points: chosen,
      },
      {
        key: 'reference',
        label: { en: 'Dull black reference', zh: '粗糙黑色参照' },
        unit: { x: 'min', y: '°C' },
        points: reference,
      },
    ],
    readouts: {
      coolingConstant: k,
      // Initial rate of fall: steepest at the start, because the excess is largest then.
      initialRate: k * excess,
      finalTemp,
      // Time for the excess over room temperature to halve — the cooling analogue of
      // half-life, and a fair way to compare surfaces.
      halfTime: k > 0 ? Math.LN2 / k : 0,
      excessRemaining: finalTemp - roomTemp,
    },
  }
}

export default coolingKernel
