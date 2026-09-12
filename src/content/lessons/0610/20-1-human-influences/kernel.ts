/**
 * Human influences on ecosystems — kernel for lesson 0610/20-1-human-influences.
 *
 * Eutrophication, as a sequence rather than a word. The chain has five links and every one
 * of them is a step a student has to be able to state; run as a simulation the sequence has
 * to happen in order, and the fish die at the end of it rather than at the beginning.
 *
 * That order is the whole difficulty. Fertiliser does not poison fish. It feeds algae, the
 * algae block the light, the plants beneath die, decomposers multiply on the dead material,
 * and it is the *decomposers* respiring that strips the oxygen out of the water. Four steps
 * between the cause and the effect, and a student who has only the word "eutrophication"
 * usually reaches for "the fertiliser is toxic".
 *
 * Covers 0610.20.3.1 and 20.3.4.
 */

import type { SimKernel, SimResult, SimSeries } from '@/content/types'

export interface EutrophicationParams extends Record<string, number> {
  /** Nitrate entering the water from fertiliser or sewage, as a relative amount. */
  nitrate: number
  /** How fast the river flows, which dilutes and re-oxygenates it. */
  flow: number
  /** Days after the nitrate arrives to inspect. */
  day: number
}

export const DURATION = 60
export const LETHAL_OXYGEN = 30

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))

/** A delayed, saturating rise: nothing at first, then a build-up towards a ceiling. */
function ramp(day: number, delay: number, rate: number): number {
  const t = day - delay
  if (t <= 0) return 0
  return 1 - Math.exp(-t / rate)
}

export interface Chain {
  day: number[]
  algae: number[]
  plants: number[]
  bacteria: number[]
  oxygen: number[]
  fish: number[]
}

/**
 * The chain, link by link, with each step waiting on the one before it.
 *
 * The delays are what make it a sequence rather than four things happening at once. Take
 * them out and the model would show fish dying the moment the fertiliser arrives, which is
 * exactly the misunderstanding it exists to correct.
 */
export function simulate(p: EutrophicationParams): Chain {
  const nitrate = clamp(p.nitrate, 0, 100) / 100
  // A fast river dilutes the nitrate and dissolves oxygen back in from the air.
  const flow = clamp(p.flow, 0, 100) / 100
  const load = nitrate * (1 - 0.7 * flow)

  const day: number[] = []
  const algae: number[] = []
  const plants: number[] = []
  const bacteria: number[] = []
  const oxygen: number[] = []
  const fish: number[] = []

  for (let d = 0; d <= DURATION; d++) {
    // 1. Nitrate is a limiting factor for algae. Remove the limit and they bloom.
    const bloom = 100 * load * ramp(d, 2, 6)
    // 2. The bloom blocks the light, so the plants below it die — after the bloom, not with it.
    const shaded = 100 * (1 - Math.min(1, (bloom / 100) * ramp(d, 10, 8)))
    // 3. Decomposers multiply on the dead plants and dead algae.
    const decomposers = 100 * load * ramp(d, 18, 8)
    // 4. Decomposers respire aerobically, and it is this that strips the oxygen out.
    //    The water starts well oxygenated and only falls as they multiply — a baseline
    //    that started low would have the oxygen crossing the lethal line before the
    //    decomposers had done anything, which is the opposite of the point.
    const baseline = 70 + 30 * flow
    const used = decomposers * 0.9
    const dissolved = clamp(baseline - used, 0, 100)
    // 5. Fish suffocate — last of all.
    const surviving = dissolved < LETHAL_OXYGEN ? clamp((dissolved / LETHAL_OXYGEN) * 100, 0, 100) : 100

    day.push(d)
    algae.push(Math.round(bloom * 10) / 10)
    plants.push(Math.round(shaded * 10) / 10)
    bacteria.push(Math.round(decomposers * 10) / 10)
    oxygen.push(Math.round(dissolved * 10) / 10)
    fish.push(Math.round(surviving * 10) / 10)
  }

  return { day, algae, plants, bacteria, oxygen, fish }
}

/** The first day on which a series passes a threshold, or -1 if it never does. */
export function dayReaching(values: number[], threshold: number, rising = true): number {
  for (let i = 0; i < values.length; i++) {
    const v = values[i] as number
    if (rising ? v >= threshold : v <= threshold) return i
  }
  return -1
}

export const eutrophicationKernel: SimKernel<EutrophicationParams, SimResult> = (params) => {
  const p: EutrophicationParams = {
    nitrate: clamp(params['nitrate'] ?? 70, 0, 100),
    flow: clamp(params['flow'] ?? 20, 0, 100),
    day: Math.round(clamp(params['day'] ?? 30, 0, DURATION)),
  }
  const chain = simulate(p)

  const line = (key: string, en: string, zh: string, values: number[]): SimSeries => ({
    key,
    label: { en, zh },
    unit: { x: 'days after the nitrate arrives', y: 'relative amount' },
    points: chain.day.map((d, i) => [d, values[i] ?? 0] as [number, number]),
    xBounds: { min: 0, max: DURATION },
    yBounds: { min: 0, max: 110 },
  })

  const series: SimSeries[] = [
    line('algae', 'Algae', '藻类', chain.algae),
    line('plants', 'Plants below the surface', '水下植物', chain.plants),
    line('bacteria', 'Decomposer bacteria', '分解者细菌', chain.bacteria),
    line('oxygen', 'Dissolved oxygen', '溶解氧', chain.oxygen),
    line('fish', 'Fish surviving', '存活的鱼', chain.fish),
  ]

  const i = p.day
  const oxygenNow = chain.oxygen[i] ?? 0

  return {
    series,
    readouts: {
      algae: chain.algae[i] ?? 0,
      oxygen: oxygenNow,
      fish: chain.fish[i] ?? 0,
      bloomDay: dayReaching(chain.algae, 50),
      deathDay: dayReaching(chain.oxygen, LETHAL_OXYGEN, false),
    },
    markers: [
      {
        x: 0,
        y: 0,
        label:
          (chain.fish[i] ?? 100) < 50
            ? {
                en: 'The fish are dying — not poisoned by the fertiliser, but suffocated by decomposers respiring',
                zh: '鱼正在死亡——不是被化肥毒死的，而是被分解者的呼吸作用耗尽氧气而窒息',
              }
            : (chain.algae[i] ?? 0) > 50
              ? {
                  en: 'Algal bloom — the nitrate was the limiting factor, and it has been removed',
                  zh: '藻类大量繁殖——硝酸盐原本是限制因素，现在这个限制被解除了',
                }
              : oxygenNow > 60
                ? {
                    en: 'The water is still healthy — either the load is small or the flow is washing it away',
                    zh: '水体仍然健康——要么负荷较小，要么水流把它冲走了',
                  }
                : {
                    en: 'Oxygen falling as the decomposers multiply',
                    zh: '随着分解者增殖，氧气正在下降',
                  },
      },
    ],
  }
}

export default eutrophicationKernel
