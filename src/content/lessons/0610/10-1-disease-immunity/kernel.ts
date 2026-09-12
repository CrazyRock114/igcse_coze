/**
 * Disease and immunity — kernel for lesson 0610/10-1-disease-immunity.
 *
 * Antibody concentration after a first exposure and after a second. The whole of active
 * immunity is in the difference between those two curves, and it is a difference a printed
 * graph states rather than demonstrates: the second response is faster, higher and longer,
 * and the reason is memory cells left behind by the first.
 *
 * So memory cells are what the model actually tracks. Antibody production is driven by them,
 * and vaccination is simply a first exposure that does not make you ill — which is why
 * switching the first exposure between "infection" and "vaccination" changes the illness
 * and leaves the antibody curve alone.
 *
 * Passive immunity is the control that proves the point. Antibodies given directly work
 * immediately and then decay, and because no memory cells are made, a later exposure gets
 * the slow primary response all over again. Turn it on and the second peak collapses.
 *
 * Covers 0610.10.1.6–15.
 */

import type { SimKernel, SimResult, SimSeries } from '@/content/types'

export interface ImmunityParams extends Record<string, number> {
  /** Day of the second exposure. */
  secondExposure: number
  /** 1 if the first exposure was a vaccination rather than a live infection. */
  vaccinated: number
  /** 1 if antibodies were given directly instead of being made — passive immunity. */
  passive: number
}

/** Day of the first exposure. Fixed, so the two responses can be compared. */
export const FIRST_EXPOSURE = 5
export const DURATION = 120
const STEP = 1

/** Days the antibody level takes to fall by half once production stops. */
const ANTIBODY_HALF_LIFE = 12
/** Days memory cells persist. Years in reality; compressed here so the graph fits. */
const MEMORY_HALF_LIFE = 200

/**
 * A response curve: nothing, then a rise, then a decay.
 *
 * `lag` is the days before antibodies appear at all, and it is the number that matters —
 * a primary response spends about a week finding and multiplying the one lymphocyte that
 * happens to fit the antigen. A secondary response has thousands ready.
 */
function response(day: number, start: number, lag: number, peak: number, riseDays: number): number {
  const t = day - start - lag
  if (t <= 0) return 0
  const rising = 1 - Math.exp(-t / riseDays)
  const falling = 2 ** (-Math.max(0, t - riseDays * 2) / ANTIBODY_HALF_LIFE)
  return peak * rising * falling
}

export interface Trace {
  day: number[]
  antibodies: number[]
  memory: number[]
  pathogen: number[]
}

export function simulate(p: ImmunityParams): Trace {
  const second = Math.min(DURATION, Math.max(FIRST_EXPOSURE + 5, Math.round(p.secondExposure)))
  const vaccinated = (p.vaccinated ?? 0) >= 0.5
  const passive = (p.passive ?? 0) >= 0.5

  const day: number[] = []
  const antibodies: number[] = []
  const memory: number[] = []
  const pathogen: number[] = []

  for (let d = 0; d <= DURATION; d += STEP) {
    let ab: number
    let mem: number

    if (passive) {
      // Antibodies handed over ready-made: no lag at all, and no memory cells, because
      // the body never made them and so never learnt anything.
      ab = response(d, FIRST_EXPOSURE, 0, 55, 2) + response(d, second, 0, 55, 2)
      mem = 0
    } else {
      // Primary: about a week's lag while the matching lymphocyte is found and multiplied.
      const primary = response(d, FIRST_EXPOSURE, 7, 30, 6)
      // Secondary: memory cells are already there, so it is quicker, bigger and lasts longer.
      const secondary = response(d, second, 2, 95, 3)
      ab = primary + secondary

      const sinceFirst = d - FIRST_EXPOSURE - 7
      const sinceSecond = d - second - 2
      mem =
        (sinceFirst > 0 ? 40 * (1 - Math.exp(-sinceFirst / 8)) * 2 ** (-sinceFirst / MEMORY_HALF_LIFE) : 0) +
        (sinceSecond > 0 ? 60 * (1 - Math.exp(-sinceSecond / 5)) * 2 ** (-sinceSecond / MEMORY_HALF_LIFE) : 0)
    }

    // How ill the person gets. A vaccine carries a weakened or dead pathogen, so the first
    // exposure produces no illness; a live infection does, until the antibodies arrive.
    const firstIllness = vaccinated ? 0 : response(d, FIRST_EXPOSURE, 0, 70, 4)
    // On a second exposure the antibodies are there almost at once, so the pathogen is
    // destroyed before it can multiply enough to cause symptoms — unless nothing was learnt.
    const secondIllness = passive
      ? response(d, second, 0, 60, 4)
      : response(d, second, 0, 8, 2)

    day.push(d)
    antibodies.push(Math.round(ab * 10) / 10)
    memory.push(Math.round(mem * 10) / 10)
    pathogen.push(Math.round((firstIllness + secondIllness) * 10) / 10)
  }

  return { day, antibodies, memory, pathogen }
}

/** Highest antibody level reached in a window of days. */
export function peakBetween(trace: Trace, from: number, to: number): number {
  let best = 0
  for (let i = 0; i < trace.day.length; i++) {
    const d = trace.day[i] as number
    if (d >= from && d <= to) best = Math.max(best, trace.antibodies[i] as number)
  }
  return Math.round(best * 10) / 10
}

/** Days from an exposure until antibodies become detectable. */
export function lagAfter(trace: Trace, exposure: number): number {
  for (let i = 0; i < trace.day.length; i++) {
    const d = trace.day[i] as number
    if (d < exposure) continue
    if ((trace.antibodies[i] as number) > 2) return d - exposure
  }
  return DURATION - exposure
}

export const immunityKernel: SimKernel<ImmunityParams, SimResult> = (params) => {
  const second = Math.min(
    DURATION,
    Math.max(FIRST_EXPOSURE + 5, Math.round(params['secondExposure'] ?? 60))
  )
  const p: ImmunityParams = {
    secondExposure: second,
    vaccinated: params['vaccinated'] ?? 0,
    passive: params['passive'] ?? 0,
  }
  const trace = simulate(p)

  const series: SimSeries[] = [
    {
      key: 'antibodies',
      label: { en: 'Antibody concentration', zh: '抗体浓度' },
      unit: { x: 'time / days', y: 'concentration / arbitrary units' },
      points: trace.day.map((d, i) => [d, trace.antibodies[i] ?? 0]),
      xBounds: { min: 0, max: DURATION },
      yBounds: { min: 0, max: 100 },
    },
    {
      key: 'memory',
      label: { en: 'Memory cells', zh: '记忆细胞' },
      unit: { x: 'time / days', y: 'concentration / arbitrary units' },
      points: trace.day.map((d, i) => [d, trace.memory[i] ?? 0]),
      xBounds: { min: 0, max: DURATION },
      yBounds: { min: 0, max: 100 },
    },
    {
      key: 'pathogen',
      label: { en: 'How ill the person is', zh: '患病的严重程度' },
      unit: { x: 'time / days', y: 'symptoms / arbitrary units' },
      points: trace.day.map((d, i) => [d, trace.pathogen[i] ?? 0]),
      xBounds: { min: 0, max: DURATION },
      yBounds: { min: 0, max: 100 },
    },
  ]

  const firstPeak = peakBetween(trace, FIRST_EXPOSURE, second - 1)
  const secondPeak = peakBetween(trace, second, DURATION)

  return {
    series,
    readouts: {
      firstPeak,
      secondPeak,
      firstLag: lagAfter(trace, FIRST_EXPOSURE),
      secondLag: lagAfter(trace, second),
      illness: Math.round(Math.max(...trace.pathogen) * 10) / 10,
    },
    markers: [
      {
        x: 0,
        y: 0,
        label:
          p.passive >= 0.5
            ? {
                en: 'Passive immunity — the antibodies work at once, but no memory cells are made, so the second exposure makes the person ill again',
                zh: '被动免疫——抗体立即起效，但不产生记忆细胞，因此第二次接触时仍会患病',
              }
            : p.vaccinated >= 0.5
              ? {
                  en: 'Vaccinated — the same antibody response, and the same memory cells, without the illness',
                  zh: '已接种疫苗——获得同样的抗体反应和记忆细胞，却不必生病',
                }
              : {
                  en: 'The second response is faster and higher, because memory cells were left behind by the first',
                  zh: '第二次反应更快也更强，因为第一次留下了记忆细胞',
                },
      },
    ],
  }
}

export default immunityKernel
