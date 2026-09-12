/**
 * Biotechnology — kernel for lesson 0610/21-1-biotechnology.
 *
 * An industrial fermenter, and the four conditions that have to be controlled inside it.
 * The syllabus asks students to describe and explain those conditions; running it turns that
 * from a list into a set of trade-offs, because three of the four have an optimum and
 * pushing past it makes things worse rather than better.
 *
 * Temperature is the one worth building the model around. Microorganisms respire, and
 * respiration releases heat, so a large fermenter heats itself — which is why the problem in
 * industry is cooling rather than heating, and why a water jacket is on the diagram. Turn the
 * cooling off and the culture cooks itself with its own waste heat.
 *
 * Covers 0610.21.2.6–7.
 */

import type { SimKernel, SimResult, SimSeries } from '@/content/types'

export interface FermenterParams extends Record<string, number> {
  /** Temperature the cooling jacket is set to hold, in °C. */
  target: number
  /** How much oxygen is bubbled through, as a percentage of what the culture needs. */
  oxygen: number
  /** pH of the culture. */
  ph: number
  /** How well the cooling jacket works, 0 to 100. */
  cooling: number
}

export const DURATION = 48
export const OPTIMUM_TEMPERATURE = 30
export const OPTIMUM_PH = 6.5
/** Above this the enzymes denature and the culture is lost. */
export const DENATURE_ABOVE = 45

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))

/** Growth factor from temperature: rises to an optimum, then collapses as enzymes denature. */
export function temperatureFactor(t: number): number {
  if (t >= DENATURE_ABOVE) return 0
  const below = 2 ** ((t - OPTIMUM_TEMPERATURE) / 10)
  const damage = t > OPTIMUM_TEMPERATURE ? 1 - (t - OPTIMUM_TEMPERATURE) / (DENATURE_ABOVE - OPTIMUM_TEMPERATURE) : 1
  return clamp(Math.min(below, 1) * damage, 0, 1)
}

/** Growth factor from pH: an optimum, falling away either side. */
export function phFactor(ph: number): number {
  return clamp(1 - ((ph - OPTIMUM_PH) / 2.5) ** 2, 0, 1)
}

/** Growth factor from oxygen supply. Saturates — more than enough is not better. */
export function oxygenFactor(percent: number): number {
  const o = clamp(percent, 0, 200)
  return o / (o + 25)
}

/**
 * The temperature the culture actually reaches.
 *
 * Respiration releases heat, and a big vessel has a small surface area for its volume, so
 * the heat has nowhere to go. Without cooling the culture climbs well past its own optimum
 * and denatures its own enzymes — which is why the industrial problem is removing heat, not
 * supplying it.
 */
export function actualTemperature(p: FermenterParams): number {
  const cooling = clamp(p.cooling, 0, 100) / 100
  const selfHeating = 22 * (1 - cooling)
  return clamp(p.target + selfHeating, 0, 60)
}

export interface Trace {
  hour: number[]
  biomass: number[]
  product: number[]
  temperature: number[]
}

export function simulate(p: FermenterParams): Trace {
  const temperature = actualTemperature(p)
  const rate =
    temperatureFactor(temperature) * phFactor(clamp(p.ph, 0, 14)) * oxygenFactor(p.oxygen)

  const hour: number[] = []
  const biomass: number[] = []
  const product: number[] = []
  const temperatures: number[] = []

  let cells = 2
  let made = 0

  for (let h = 0; h <= DURATION; h++) {
    hour.push(h)
    biomass.push(Math.round(cells * 10) / 10)
    product.push(Math.round(made * 10) / 10)
    temperatures.push(Math.round(temperature * 10) / 10)

    // Logistic growth: fast while there is room and nutrient, levelling off as it runs out.
    const growth = rate * cells * (1 - cells / 100) * 0.35
    cells = clamp(cells + growth, 0, 100)
    made += cells * rate * 0.05
  }

  return { hour, biomass, product, temperature: temperatures }
}

const round = (v: number) => Math.round(v * 10) / 10

export const fermenterKernel: SimKernel<FermenterParams, SimResult> = (params) => {
  const p: FermenterParams = {
    target: clamp(params['target'] ?? 30, 5, 45),
    oxygen: clamp(params['oxygen'] ?? 100, 0, 200),
    ph: clamp(params['ph'] ?? 6.5, 3, 10),
    cooling: clamp(params['cooling'] ?? 100, 0, 100),
  }

  const trace = simulate(p)
  const temperature = actualTemperature(p)

  const series: SimSeries[] = [
    {
      key: 'biomass',
      label: { en: 'Microorganisms in the vessel', zh: '罐内的微生物量' },
      unit: { x: 'time / hours', y: 'relative amount' },
      points: trace.hour.map((h, i) => [h, trace.biomass[i] ?? 0]),
      xBounds: { min: 0, max: DURATION },
      yBounds: { min: 0, max: 110 },
    },
    {
      key: 'product',
      label: { en: 'Product made', zh: '生成的产物' },
      unit: { x: 'time / hours', y: 'relative amount' },
      points: trace.hour.map((h, i) => [h, trace.product[i] ?? 0]),
      xBounds: { min: 0, max: DURATION },
      yBounds: { min: 0, max: 200 },
    },
  ]

  return {
    series,
    readouts: {
      temperature: round(temperature),
      growthRate: Math.round(
        temperatureFactor(temperature) * phFactor(p.ph) * oxygenFactor(p.oxygen) * 100
      ),
      finalBiomass: trace.biomass[trace.biomass.length - 1] ?? 0,
      yield: trace.product[trace.product.length - 1] ?? 0,
    },
    markers: [
      {
        x: 0,
        y: 0,
        label:
          temperature >= DENATURE_ABOVE
            ? {
                en: 'Too hot — the enzymes have denatured and the culture is dead. Respiration released this heat itself; the cooling jacket is there to remove it',
                zh: '温度过高——酶已变性，培养物死亡。这些热量正是呼吸作用自身释放的；冷却夹层的作用就是把它带走',
              }
            : temperature > OPTIMUM_TEMPERATURE + 4
              ? {
                  en: 'Above the optimum — the culture is heating itself faster than the jacket can cool it',
                  zh: '高于最适温度——培养物自身产热的速度超过了夹层的冷却能力',
                }
              : oxygenFactor(p.oxygen) < 0.5
                ? {
                    en: 'Short of oxygen — aerobic respiration is limited, so growth is slow',
                    zh: '氧气不足——有氧呼吸受限，因此生长缓慢',
                  }
                : phFactor(p.ph) < 0.5
                  ? {
                      en: 'The pH is far from the optimum, so the enzymes work slowly',
                      zh: 'pH 远离最适值，酶的作用速率很低',
                    }
                  : {
                      en: 'All four conditions near their optimum — the culture is growing as fast as it can',
                      zh: '四项条件都接近最适——培养物正以最快速度生长',
                    },
      },
    ],
  }
}

export default fermenterKernel
