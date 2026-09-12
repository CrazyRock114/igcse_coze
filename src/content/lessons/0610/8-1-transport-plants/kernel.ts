/**
 * Transport in plants — kernel for lesson 0610/8-1-transport-plants.
 *
 * Transpiration rate against the four conditions the syllabus names, measured the way a
 * potometer measures it. The point of running it rather than listing the four is that they
 * do not all act the same way: three of them change how fast water evaporates from the
 * mesophyll, and light does something different — it opens the stomata. So light has an
 * effect that saturates once the stomata are fully open, and the others do not.
 *
 * That difference is also why a plant closing its stomata in a drought is a real trade: shut
 * them and transpiration nearly stops, but so does the carbon dioxide supply, and so does
 * photosynthesis. The model reports both, so the cost is visible rather than asserted.
 *
 * Covers 0610.8.3.3 and 8.3.6.
 */

import type { SimKernel, SimResult, SimSeries } from '@/content/types'

export interface TranspirationParams extends Record<string, number> {
  /** Air temperature in °C. */
  temperature: number
  /** Relative humidity of the air, as a percentage. */
  humidity: number
  /** Wind speed in m/s. */
  wind: number
  /** Light intensity, as a percentage of full daylight. */
  light: number
}

/** Transpiration rate in arbitrary units when every condition is at its reference value. */
const BASE_RATE = 20

/**
 * How far the stomata are open, 0 to 1.
 *
 * Light is the only one of the four that acts on the stomata rather than on evaporation,
 * and the response saturates: once they are fully open, more light cannot open them further.
 */
export function stomatalOpening(light: number): number {
  const l = Math.max(0, light)
  return l / (l + 15)
}

/**
 * How fast water evaporates from the mesophyll surfaces, relative to the reference.
 *
 * Temperature raises it — more kinetic energy, so more molecules escape, and the air can
 * hold more. Humidity lowers it by flattening the gradient between leaf and air. Wind
 * raises it by sweeping the humid air away and keeping the gradient steep.
 */
export function evaporationFactor(temperature: number, humidity: number, wind: number): number {
  const t = Math.min(45, Math.max(0, temperature))
  const h = Math.min(100, Math.max(0, humidity))
  const w = Math.min(10, Math.max(0, wind))

  // Doubles roughly every ten degrees, as an evaporation rate does.
  const heat = 2 ** ((t - 20) / 10)
  // At 100% humidity the air outside is as wet as the air inside, so there is no gradient
  // and no net loss however hot or windy it is.
  const gradient = 1 - h / 100
  // Wind helps a great deal at first and then very little, once the boundary layer is gone.
  const stirring = 1 + (1.5 * w) / (w + 2)

  return heat * gradient * stirring
}

/** Transpiration rate in arbitrary units. */
export function transpirationRate(p: TranspirationParams): number {
  return (
    BASE_RATE *
    stomatalOpening(p.light) *
    evaporationFactor(p.temperature, p.humidity, p.wind)
  )
}

/**
 * Relative rate of photosynthesis, limited by how far the stomata are open.
 *
 * Included so the cost of closing them is on screen. A plant that shuts its stomata to save
 * water also shuts off its carbon dioxide supply, and a lesson that shows only the water
 * saved is telling half the story.
 */
export function photosynthesisRate(light: number): number {
  return 100 * stomatalOpening(light) * (0.3 + 0.7 * Math.min(1, light / 60))
}

const round = (v: number) => Math.round(v * 10) / 10

export const transpirationKernel: SimKernel<TranspirationParams, SimResult> = (params) => {
  const p: TranspirationParams = {
    temperature: Math.min(45, Math.max(0, params['temperature'] ?? 20)),
    humidity: Math.min(100, Math.max(0, params['humidity'] ?? 50)),
    wind: Math.min(10, Math.max(0, params['wind'] ?? 0)),
    light: Math.min(100, Math.max(0, params['light'] ?? 60)),
  }

  const sweep = (
    key: string,
    label: { en: string; zh: string },
    unit: string,
    max: number,
    steps: number,
    set: (v: number) => TranspirationParams
  ): SimSeries => ({
    key,
    label,
    unit: { x: unit, y: 'transpiration rate / arbitrary units' },
    points: Array.from({ length: steps + 1 }, (_, i) => {
      const x = (i / steps) * max
      return [round(x), round(transpirationRate(set(x)))] as [number, number]
    }),
    xBounds: { min: 0, max },
    // One fixed scale across all four, so the sweeps can be compared with each other —
    // which is the whole reason for drawing four of them.
    yBounds: { min: 0, max: 60 },
  })

  const series: SimSeries[] = [
    sweep(
      'temperature',
      { en: 'Against temperature', zh: '随温度变化' },
      'temperature / °C',
      45,
      45,
      (v) => ({ ...p, temperature: v })
    ),
    sweep(
      'humidity',
      { en: 'Against humidity', zh: '随湿度变化' },
      'humidity / %',
      100,
      50,
      (v) => ({ ...p, humidity: v })
    ),
    sweep(
      'wind',
      { en: 'Against wind speed', zh: '随风速变化' },
      'wind speed / m s⁻¹',
      10,
      50,
      (v) => ({ ...p, wind: v })
    ),
    sweep(
      'light',
      { en: 'Against light intensity', zh: '随光照强度变化' },
      'light intensity / %',
      100,
      50,
      (v) => ({ ...p, light: v })
    ),
  ]

  const rate = transpirationRate(p)
  const opening = stomatalOpening(p.light)

  return {
    series,
    readouts: {
      rate: round(rate),
      opening: Math.round(opening * 100),
      photosynthesis: Math.round(photosynthesisRate(p.light)),
      evaporation: round(evaporationFactor(p.temperature, p.humidity, p.wind)),
    },
    markers: [
      {
        x: 0,
        y: 0,
        label:
          p.humidity >= 99
            ? {
                en: 'Saturated air — no gradient, so no water leaves however hot or windy it is',
                zh: '空气已饱和——没有梯度，无论多热多大风都不会有水散失',
              }
            : opening < 0.3
              ? {
                  en: 'Stomata nearly shut — little water lost, but little carbon dioxide taken in either',
                  zh: '气孔近乎关闭——失水很少，但吸入的二氧化碳也很少',
                }
              : rate > 35
                ? {
                    en: 'Losing water faster than the roots are likely to replace it — the plant will wilt',
                    zh: '失水速度超过根系可能的补充速度——植物将会萎蔫',
                  }
                : {
                    en: 'Water lost is being replaced by the transpiration stream',
                    zh: '散失的水正由蒸腾流补充',
                  },
      },
    ],
  }
}

export default transpirationKernel
