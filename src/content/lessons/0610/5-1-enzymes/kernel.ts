/**
 * Enzymes — kernel for lesson 0610/5-1-enzymes.
 *
 * The two curves in this topic are not the same shape, and drawing them as though they
 * were is the commonest error in it. Activity against pH is a bell: wrong either side, by
 * the same amount, for the same reason. Activity against temperature is not — it climbs
 * gently, because warmer particles collide more often, and then falls off a cliff, because
 * the active site has lost its shape and is not coming back.
 *
 * So the model is two separate factors multiplied together, and the temperature factor is
 * deliberately asymmetric: a Q₁₀ of about 2 on the way up, a steep collapse on the way
 * down. Both curves are drawn at the *other* variable's current setting, so putting an
 * enzyme at the wrong pH visibly shrinks its whole temperature curve rather than moving it.
 *
 * Covers 0610.5.1.1–9.
 */

import type { Bilingual, SimKernel, SimResult, SimSeries } from '@/content/types'

export interface EnzymeParams extends Record<string, number> {
  /** Index into ENZYMES */
  enzyme: number
  /** Temperature in °C */
  temperature: number
  /** pH of the surroundings */
  ph: number
}

export interface Enzyme {
  key: string
  label: Bilingual
  optimumTemperature: number
  optimumPh: number
  where: Bilingual
}

export const ENZYMES: Enzyme[] = [
  {
    key: 'pepsin',
    label: { en: 'Pepsin', zh: '胃蛋白酶' },
    optimumTemperature: 37,
    optimumPh: 2,
    where: {
      en: 'A protease in the stomach, where hydrochloric acid keeps the pH at about 2. It is the acid that gives pepsin its working conditions.',
      zh: '胃中的一种蛋白酶，胃酸使 pH 保持在约 2。正是这些盐酸为胃蛋白酶提供了工作条件。',
    },
  },
  {
    key: 'amylase',
    label: { en: 'Salivary amylase', zh: '唾液淀粉酶' },
    optimumTemperature: 37,
    optimumPh: 7,
    where: {
      en: 'Breaks starch down in the mouth, where saliva is close to neutral. Swallow, and the stomach acid stops it working almost at once.',
      zh: '在口腔中分解淀粉，唾液接近中性。一旦吞下，胃酸几乎立刻使它停止工作。',
    },
  },
  {
    key: 'lipase',
    label: { en: 'Pancreatic lipase', zh: '胰脂肪酶' },
    optimumTemperature: 37,
    optimumPh: 8,
    where: {
      en: 'Digests fats in the small intestine. Bile makes the contents alkaline, which is exactly the pH this enzyme needs.',
      zh: '在小肠中消化脂肪。胆汁使肠内容物呈碱性，这正是该酶所需的 pH。',
    },
  },
  {
    key: 'thermophile',
    label: { en: 'An enzyme from a hot spring', zh: '来自温泉的酶' },
    optimumTemperature: 70,
    optimumPh: 7,
    where: {
      en: 'From bacteria living in water near boiling. Thirty-seven degrees is not a magic number — it is simply the temperature this particular set of organisms lives at.',
      zh: '来自生活在近沸腾水中的细菌。37 °C 并不是什么神奇数字——它只是我们这类生物所处的温度而已。',
    },
  },
]

/** Rate roughly doubles for every 10 °C, up to the optimum. */
const Q10 = 2
/** How many degrees past the optimum halve the activity. */
const DENATURE_SCALE = 5
/** How many pH units either side of the optimum halve the activity. */
const PH_SCALE = 1.5

/**
 * The temperature factor, 0 to 1.
 *
 * Two different mechanisms either side of the optimum, which is why the curve is not
 * symmetric. Below it, warming speeds the reaction up because particles collide more often
 * and with more energy. Above it, the bonds holding the active site in shape start to
 * break — and a denatured enzyme does not recover when it cools down again.
 */
export function temperatureFactor(temperature: number, optimum: number): number {
  if (temperature <= optimum) return Q10 ** ((temperature - optimum) / 10)
  const over = temperature - optimum
  return 0.5 ** (over / DENATURE_SCALE) ** 2
}

/**
 * The pH factor, 0 to 1.
 *
 * Symmetric, because being too acidic and too alkaline damage the active site in the same
 * way — the charges holding its shape are disrupted either way.
 */
export function phFactor(ph: number, optimum: number): number {
  return 0.5 ** ((ph - optimum) / PH_SCALE) ** 2
}

/** Activity as a percentage of what this enzyme manages in its best conditions. */
export function activity(enzyme: Enzyme, temperature: number, ph: number): number {
  const value =
    temperatureFactor(temperature, enzyme.optimumTemperature) * phFactor(ph, enzyme.optimumPh)
  return Math.round(value * 1000) / 10
}

/** Below this, the enzyme is doing nothing worth measuring. */
const DENATURED_BELOW = 1

export const enzymeKernel: SimKernel<EnzymeParams, SimResult> = ({ enzyme, temperature, ph }) => {
  const chosen = ENZYMES[Math.min(ENZYMES.length - 1, Math.max(0, Math.round(enzyme)))]!
  const t = Math.min(90, Math.max(0, temperature))
  const p = Math.min(14, Math.max(0, ph))

  // Each curve is drawn at the other variable's current value, so the two factors are
  // visibly multiplied rather than shown one at a time.
  const byTemperature: Array<[number, number]> = []
  for (let x = 0; x <= 90; x += 1) byTemperature.push([x, activity(chosen, x, p)])

  const byPh: Array<[number, number]> = []
  for (let x = 0; x <= 14; x += 0.2) {
    byPh.push([Math.round(x * 10) / 10, activity(chosen, t, x)])
  }

  const series: SimSeries[] = [
    {
      key: 'temperature',
      label: { en: `Activity against temperature at pH ${p}`, zh: `pH ${p} 时活性随温度的变化` },
      unit: { x: 'temperature / °C', y: 'relative activity / %' },
      points: byTemperature,
      xBounds: { min: 0, max: 80 },
      // Pinned, so putting the enzyme at the wrong pH shrinks the curve instead of
      // rescaling the axis and hiding what just happened.
      yBounds: { min: 0, max: 100 },
    },
    {
      key: 'ph',
      label: { en: `Activity against pH at ${t} °C`, zh: `${t} °C 时活性随 pH 的变化` },
      unit: { x: 'pH', y: 'relative activity / %' },
      points: byPh,
      xBounds: { min: 0, max: 14 },
      yBounds: { min: 0, max: 100 },
    },
  ]

  const current = activity(chosen, t, p)
  const denatured = t > chosen.optimumTemperature + DENATURE_SCALE * 2

  return {
    series,
    readouts: {
      activity: current,
      optimumTemperature: chosen.optimumTemperature,
      optimumPh: chosen.optimumPh,
      denatured: denatured ? 1 : 0,
    },
  }
}

export default enzymeKernel
export { DENATURED_BELOW }
