/**
 * Variation and selection — kernel for lesson 0610/18-1-variation-selection.
 *
 * Allele frequency over generations under selection. Natural selection is described in every
 * textbook as four sentences — variation, competition, survival of the better adapted,
 * inheritance — and a student can recite all four while still believing that organisms change
 * to suit their environment. Running it is the cure: nothing in the model ever changes an
 * individual. The only thing that changes is how many of each kind there are.
 *
 * The starting frequency is a parameter, and it matters more than students expect. The allele
 * has to be there already; selection cannot invent it. Set it to zero and nothing happens
 * however strong the selection, which is the whole role of mutation — it is the only source
 * of genuinely new alleles, and it happens whether or not it is needed.
 *
 * Artificial selection is the same arithmetic with a human choosing instead of the
 * environment, which is why it is so much faster: a breeder can apply a selection pressure
 * far stronger than anything the wild applies.
 *
 * Covers 0610.18.1.6–10 and 18.3.1–6.
 */

import type { SimKernel, SimResult, SimSeries } from '@/content/types'

export interface SelectionParams extends Record<string, number> {
  /** Percentage of the population carrying the advantageous allele at the start. */
  startingFrequency: number
  /** How much better the carriers survive, as a percentage advantage. */
  pressure: number
  /** Chance per generation that a new copy of the allele arises by mutation, per 1000. */
  mutationRate: number
  /** Generations to run. */
  generations: number
}

export const MAX_GENERATIONS = 40

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))

/**
 * Frequency of the allele in each generation, as a percentage.
 *
 * One line does all the work: the carriers' share of the next generation is their share of
 * this one weighted by how well they survive. Nothing here modifies an individual — the
 * proportions change because different numbers of each kind survive to reproduce.
 */
export function frequencies(p: SelectionParams): number[] {
  const pressure = clamp(p.pressure, 0, 100) / 100
  const mutation = clamp(p.mutationRate, 0, 20) / 1000
  const generations = Math.round(clamp(p.generations, 1, MAX_GENERATIONS))

  let f = clamp(p.startingFrequency, 0, 100) / 100
  const out: number[] = []

  for (let g = 0; g <= generations; g++) {
    out.push(Math.round(f * 1000) / 10)

    // Relative survival: carriers survive `1 + pressure` times as well as non-carriers.
    const carriers = f * (1 + pressure)
    const others = 1 - f
    f = carriers / (carriers + others)

    // Mutation supplies new copies whether or not any are needed — it is random with
    // respect to advantage, and it is the only way an allele that is absent can appear.
    f = f + mutation * (1 - f)
    f = clamp(f, 0, 1)
  }

  return out
}

/** Generations until the allele is carried by at least `target` per cent. */
export function generationsTo(series: number[], target: number): number {
  for (let i = 0; i < series.length; i++) {
    if ((series[i] as number) >= target) return i
  }
  return series.length - 1
}

export const selectionKernel: SimKernel<SelectionParams, SimResult> = (params) => {
  const p: SelectionParams = {
    startingFrequency: clamp(params['startingFrequency'] ?? 2, 0, 100),
    pressure: clamp(params['pressure'] ?? 30, 0, 100),
    mutationRate: clamp(params['mutationRate'] ?? 0, 0, 20),
    generations: Math.round(clamp(params['generations'] ?? 25, 1, MAX_GENERATIONS)),
  }

  const withSelection = frequencies(p)
  // The control: the same population with nothing selecting. Without it a student cannot
  // tell how much of the change was selection and how much was simply mutation.
  const without = frequencies({ ...p, pressure: 0 })

  const series: SimSeries[] = [
    {
      key: 'selected',
      label: { en: 'With selection', zh: '有选择作用' },
      unit: { x: 'generation', y: 'carrying the allele / %' },
      points: withSelection.map((v, g) => [g, v] as [number, number]),
      xBounds: { min: 0, max: MAX_GENERATIONS },
      yBounds: { min: 0, max: 100 },
    },
    {
      key: 'reference',
      label: { en: 'With no selection', zh: '没有选择作用' },
      unit: { x: 'generation', y: 'carrying the allele / %' },
      points: without.map((v, g) => [g, v] as [number, number]),
      xBounds: { min: 0, max: MAX_GENERATIONS },
      yBounds: { min: 0, max: 100 },
    },
  ]

  const final = withSelection[withSelection.length - 1] ?? 0

  return {
    series,
    readouts: {
      start: withSelection[0] ?? 0,
      final: Math.round(final * 10) / 10,
      toHalf: generationsTo(withSelection, 50),
      toMost: generationsTo(withSelection, 95),
    },
    markers: [
      {
        x: 0,
        y: 0,
        label:
          p.startingFrequency <= 0 && p.mutationRate <= 0
            ? {
                en: 'Nothing happens — the allele is not there. Selection can only act on variation that already exists; only mutation can create it',
                zh: '什么也没发生——这个等位基因根本不存在。选择只能作用于已有的变异；只有突变才能创造它',
              }
            : p.pressure <= 0
              ? {
                  en: 'No selection pressure — the frequency drifts only as fast as mutation supplies new copies',
                  zh: '没有选择压力——频率只随突变提供新拷贝的速度缓慢变化',
                }
              : final > 90
                ? {
                    en: 'The allele has spread through the population — not because any individual changed, but because more carriers survived to reproduce',
                    zh: '该等位基因已在种群中扩散——不是因为任何个体发生了改变，而是因为更多携带者存活并繁殖了',
                  }
                : {
                    en: 'Spreading, but slowly — a weak advantage takes many generations',
                    zh: '正在扩散，但很慢——微弱的优势需要许多世代才能显现',
                  },
      },
    ],
  }
}

export default selectionKernel
