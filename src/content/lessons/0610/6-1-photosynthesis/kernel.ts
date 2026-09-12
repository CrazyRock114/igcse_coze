/**
 * Photosynthesis and limiting factors — kernel for lesson 0610/6-1-photosynthesis.
 *
 * A limiting factor is the one in shortest supply, and the reason that idea is worth a
 * simulation is that it is *not* additive. Give a plant more light when carbon dioxide is
 * what it is short of and nothing happens at all — the curve flattens and stays flat. Raise
 * the carbon dioxide and the same extra light suddenly works.
 *
 * So the rate takes the *minimum* of the light and carbon dioxide supplies rather than
 * combining them, and temperature multiplies on top, because temperature does not supply a
 * raw material — it changes how fast the enzymes handle whatever arrives. That is also why
 * the temperature curve has an optimum and the other two do not.
 *
 * Covers 0610.6.1.1–11 and 6.2.1–3.
 */

import type { SimKernel, SimResult, SimSeries } from '@/content/types'
import { temperatureFactor } from '../5-1-enzymes/kernel'

export interface PhotosynthesisParams extends Record<string, number> {
  /** Light intensity, as a percentage of full sunlight */
  light: number
  /** Carbon dioxide concentration as a percentage; the atmosphere is about 0.04 */
  carbonDioxide: number
  /** Temperature in °C */
  temperature: number
}

/** Most temperate crop plants photosynthesise fastest at around here. */
export const OPTIMUM_TEMPERATURE = 30
/** Light intensity, as a percentage, at which light stops being the shortage. */
const LIGHT_HALF_SATURATION = 25
/** Carbon dioxide percentage at which it stops being the shortage. */
const CO2_HALF_SATURATION = 0.06

/**
 * How well supplied the plant is with light, 0 to 1.
 *
 * Saturating rather than linear: doubling the light from very dim to dim helps a great
 * deal, doubling it from bright to very bright helps almost not at all.
 */
export function lightSupply(light: number): number {
  const l = Math.max(0, light)
  return l / (l + LIGHT_HALF_SATURATION)
}

/** How well supplied the plant is with carbon dioxide, 0 to 1. */
export function carbonDioxideSupply(percent: number): number {
  const c = Math.max(0, percent)
  return c / (c + CO2_HALF_SATURATION)
}

/**
 * Relative rate of photosynthesis, 0 to 100.
 *
 * The two raw materials are combined with `min`, not by multiplying: a plant cannot make
 * up for a shortage of carbon dioxide by being given more light. Temperature multiplies,
 * because it is not a raw material — it sets how fast the enzymes work on what arrives.
 */
export function photosynthesisRate(
  light: number,
  carbonDioxide: number,
  temperature: number
): number {
  const supply = Math.min(lightSupply(light), carbonDioxideSupply(carbonDioxide))
  const rate = supply * temperatureFactor(temperature, OPTIMUM_TEMPERATURE) * 100
  return Math.round(rate * 10) / 10
}

/** Which factor is holding the rate back. */
export type Limiting = 'light' | 'carbon dioxide' | 'temperature'

export function limitingFactor(
  light: number,
  carbonDioxide: number,
  temperature: number
): Limiting {
  // Temperature wins only when it is doing more damage than either shortage.
  const t = temperatureFactor(temperature, OPTIMUM_TEMPERATURE)
  const l = lightSupply(light)
  const c = carbonDioxideSupply(carbonDioxide)
  if (t < Math.min(l, c)) return 'temperature'
  return l <= c ? 'light' : 'carbon dioxide'
}

export const photosynthesisKernel: SimKernel<PhotosynthesisParams, SimResult> = ({
  light,
  carbonDioxide,
  temperature,
}) => {
  const l = Math.min(100, Math.max(0, light))
  const c = Math.min(0.4, Math.max(0, carbonDioxide))
  const t = Math.min(50, Math.max(0, temperature))

  const series: SimSeries[] = [
    {
      key: 'light',
      label: { en: 'Rate against light intensity', zh: '速率随光照强度的变化' },
      unit: { x: 'light intensity / %', y: 'relative rate / %' },
      points: Array.from({ length: 51 }, (_, i) => {
        const x = i * 2
        return [x, photosynthesisRate(x, c, t)] as [number, number]
      }),
      xBounds: { min: 0, max: 100 },
      yBounds: { min: 0, max: 100 },
    },
    {
      key: 'co2',
      label: { en: 'Rate against carbon dioxide', zh: '速率随二氧化碳浓度的变化' },
      unit: { x: 'carbon dioxide / %', y: 'relative rate / %' },
      points: Array.from({ length: 41 }, (_, i) => {
        const x = Math.round(i * 0.01 * 100) / 100
        return [x, photosynthesisRate(l, x, t)] as [number, number]
      }),
      xBounds: { min: 0, max: 0.4 },
      yBounds: { min: 0, max: 100 },
    },
    {
      key: 'temperature',
      label: { en: 'Rate against temperature', zh: '速率随温度的变化' },
      unit: { x: 'temperature / °C', y: 'relative rate / %' },
      points: Array.from({ length: 51 }, (_, x) => [x, photosynthesisRate(l, c, x)] as [number, number]),
      xBounds: { min: 0, max: 50 },
      yBounds: { min: 0, max: 100 },
    },
  ]

  const limiting = limitingFactor(l, c, t)

  return {
    series,
    readouts: {
      rate: photosynthesisRate(l, c, t),
      lightSupply: Math.round(lightSupply(l) * 100),
      carbonDioxideSupply: Math.round(carbonDioxideSupply(c) * 100),
      temperatureEffect: Math.round(temperatureFactor(t, OPTIMUM_TEMPERATURE) * 100),
    },
    markers: [
      {
        x: 0,
        y: 0,
        label:
          limiting === 'light'
            ? { en: 'Light is limiting', zh: '光照是限制因素' }
            : limiting === 'carbon dioxide'
              ? { en: 'Carbon dioxide is limiting', zh: '二氧化碳是限制因素' }
              : { en: 'Temperature is limiting', zh: '温度是限制因素' },
      },
    ],
  }
}

export default photosynthesisKernel
