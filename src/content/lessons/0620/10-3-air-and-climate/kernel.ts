/**
 * Air quality and climate — kernel for lesson 0620/10-3-air-and-climate.
 *
 * The greenhouse effect is usually taught as a mechanism and left there, which makes it
 * hard to tell an ordinary fact from an alarming one. So this works from the measured
 * record instead: how much of each greenhouse gas the atmosphere held, going back to
 * before anyone was burning coal at scale.
 *
 * The interesting control is where the window starts. Slide it back to 1750 and the line
 * is almost flat for a century; slide it forward and the rate per decade climbs by a
 * factor of tens. The shape of that curve is the argument, and it is made of measurements
 * rather than of adjectives.
 *
 * Covers 0620.10.3.1–8; the composition of clean air, the pollutant sources and the
 * catalytic converter equations are carried by the narration and the checkpoints.
 */

import type { Bilingual, SimKernel, SimResult, SimSeries } from '@/content/types'
import { niceRange } from '@/lib/units'

export interface ClimateParams extends Record<string, number> {
  /** Index into GREENHOUSE_GASES */
  gas: number
  /** First year shown on the graph */
  startYear: number
}

export interface GreenhouseGas {
  key: string
  label: Bilingual
  formula: string
  /** Concentration unit, as the measurements are published. */
  unit: string
  /** [year, concentration], oldest first. */
  record: Array<[number, number]>
  sources: Bilingual
}

/**
 * Approximate published concentrations: ice cores before about 1960, direct measurement
 * after. Rounded, because the trend is what is being read and spurious precision would
 * suggest these came from one instrument.
 */
export const GREENHOUSE_GASES: GreenhouseGas[] = [
  {
    key: 'co2',
    label: { en: 'Carbon dioxide', zh: '二氧化碳' },
    formula: 'CO₂',
    unit: 'ppm',
    record: [
      [1750, 277],
      [1800, 283],
      [1850, 285],
      [1900, 296],
      [1920, 303],
      [1940, 311],
      [1960, 317],
      [1970, 326],
      [1980, 339],
      [1990, 354],
      [2000, 369],
      [2010, 389],
      [2020, 414],
    ],
    sources: {
      en: 'Burning fossil fuels for electricity, heating and transport, and clearing forests that would otherwise absorb it.',
      zh: '燃烧化石燃料用于发电、供暖和交通，以及砍伐本可吸收它的森林。',
    },
  },
  {
    key: 'ch4',
    label: { en: 'Methane', zh: '甲烷' },
    formula: 'CH₄',
    unit: 'ppb',
    record: [
      [1750, 730],
      [1800, 750],
      [1850, 800],
      [1900, 900],
      [1920, 970],
      [1940, 1080],
      [1960, 1250],
      [1970, 1400],
      [1980, 1570],
      [1990, 1700],
      [2000, 1773],
      [2010, 1799],
      [2020, 1879],
    ],
    sources: {
      en: 'Cattle and other livestock, rice paddies, decomposing waste in landfill, and leaks from natural gas extraction.',
      zh: '牛等牲畜、稻田、垃圾填埋场中腐烂的废物，以及天然气开采中的泄漏。',
    },
  },
]

/** The part of the record from `startYear` onwards. */
export function windowFrom(gas: GreenhouseGas, startYear: number): Array<[number, number]> {
  const points = gas.record.filter(([year]) => year >= startYear)
  // Never return fewer than two points, or there is no line and no rate to quote.
  return points.length >= 2 ? points : gas.record.slice(-2)
}

/**
 * Mean rise per decade across the window shown.
 *
 * The number that makes the point: over 1750–1850 carbon dioxide rose under one part per
 * million per decade, and since 1960 it has risen about sixteen.
 */
export function risePerDecade(points: Array<[number, number]>): number {
  const first = points[0]!
  const last = points[points.length - 1]!
  const decades = (last[0] - first[0]) / 10
  if (decades <= 0) return 0
  return Math.round(((last[1] - first[1]) / decades) * 10) / 10
}

/** How much higher than the pre-industrial level, as a percentage. */
export function percentAbovePreIndustrial(gas: GreenhouseGas): number {
  const start = gas.record[0]![1]
  const now = gas.record[gas.record.length - 1]![1]
  return Math.round(((now - start) / start) * 100)
}

export const climateKernel: SimKernel<ClimateParams, SimResult> = ({ gas, startYear }) => {
  const chosen = GREENHOUSE_GASES[Math.min(GREENHOUSE_GASES.length - 1, Math.max(0, Math.round(gas)))]!
  const points = windowFrom(chosen, startYear)
  const preIndustrial = chosen.record[0]![1]
  const latest = chosen.record[chosen.record.length - 1]![1]

  // Both axes are pinned. The default rule keeps a zero baseline, which would put the
  // origin of the year axis at year zero and squash three centuries into the last tenth of
  // the plot — and would make a rise from 277 to 414 ppm look like a flat line.
  const xBounds = niceRange(points[0]![0], points[points.length - 1]![0])
  const yBounds = niceRange(
    Math.min(preIndustrial, ...points.map(([, v]) => v)),
    Math.max(preIndustrial, ...points.map(([, v]) => v))
  )

  const series: SimSeries[] = [
    {
      key: chosen.key,
      label: {
        en: `${chosen.formula} in the atmosphere`,
        zh: `大气中的 ${chosen.formula}`,
      },
      unit: { x: 'year', y: `${chosen.formula} / ${chosen.unit}` },
      points,
      xBounds,
      yBounds,
    },
    {
      // A flat line at the 1750 level, so the rise is measured against something rather
      // than just looking steep.
      key: 'reference',
      label: { en: 'Level in 1750, before industrialisation', zh: '1750 年工业化之前的水平' },
      unit: { x: 'year', y: `${chosen.formula} / ${chosen.unit}` },
      points: [
        [points[0]![0], preIndustrial],
        [points[points.length - 1]![0], preIndustrial],
      ],
    },
  ]

  return {
    series,
    readouts: {
      latest,
      preIndustrial,
      percentIncrease: percentAbovePreIndustrial(chosen),
      risePerDecade: risePerDecade(points),
    },
  }
}

export default climateKernel
