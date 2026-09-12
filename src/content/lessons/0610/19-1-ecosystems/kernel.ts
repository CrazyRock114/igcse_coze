/**
 * Ecosystems and energy flow — kernel for lesson 0610/19-1-ecosystems.
 *
 * The same food chain drawn three ways. Numbers and biomass are counted — they are
 * observations, and they are tabulated here as such. Energy is *calculated*, level by level,
 * from whatever transfer efficiency the student sets, and that difference is deliberate:
 * the energy pyramid is the only one that follows from a rule rather than from a survey,
 * which is exactly why it is the only one that is always the right shape.
 *
 * The woodland is here to break the pyramid of numbers. One oak tree supports half a million
 * insects, so counting individuals gives a diagram standing on its point. Weigh them instead
 * and it turns the right way up. A student who has seen that needs no help remembering why a
 * pyramid of biomass is preferred, which is a Core statement, and it takes one click.
 *
 * The transfer efficiency then does two more jobs. Wind it down and the top of a long chain
 * falls to nothing — that is why food chains run out at four or five levels. And one over
 * the efficiency is how many times more people a field feeds as crops than as livestock,
 * which is the same arithmetic wearing a different hat.
 *
 * Covers 0610.19.1.1–2, 19.2.11–19 and 19.4.4–7.
 */

import type { Bilingual, SimKernel, SimPyramid, SimResult } from '@/content/types'

export interface EcosystemParams extends Record<string, number> {
  /** Which food chain, 1-based. */
  ecosystem: number
  /** 1 numbers, 2 biomass, 3 energy. */
  kind: number
  /** Percentage of energy passed on at each step. */
  transfer: number
}

interface Level {
  label: Bilingual
  /** Individuals per hectare. */
  numbers: number
  /** Dry mass in g/m². */
  biomass: number
}

interface Ecosystem {
  id: string
  title: Bilingual
  /** Energy captured by the producers, in kJ/m² per year. */
  producerEnergy: number
  levels: Level[]
}

const grassland: Ecosystem = {
  id: 'grassland',
  title: { en: 'Grassland', zh: '草地' },
  producerEnergy: 20000,
  levels: [
    { label: { en: 'Grass', zh: '草' }, numbers: 1_500_000, biomass: 500 },
    { label: { en: 'Rabbits', zh: '兔' }, numbers: 200, biomass: 20 },
    { label: { en: 'Foxes', zh: '狐' }, numbers: 2, biomass: 1.5 },
  ],
}

const woodland: Ecosystem = {
  id: 'woodland',
  title: { en: 'Oak woodland', zh: '橡树林' },
  producerEnergy: 50000,
  levels: [
    // One tree, and everything above it is more numerous. This is the whole reason a
    // pyramid of numbers is a poor diagram.
    { label: { en: 'Oak tree', zh: '橡树' }, numbers: 1, biomass: 20000 },
    { label: { en: 'Insects', zh: '昆虫' }, numbers: 500_000, biomass: 150 },
    { label: { en: 'Small birds', zh: '小型鸟类' }, numbers: 200, biomass: 15 },
    { label: { en: 'Hawks', zh: '鹰' }, numbers: 2, biomass: 1.5 },
  ],
}

export const ECOSYSTEMS: Ecosystem[] = [grassland, woodland]

/** The three ways of measuring a trophic level. */
export type Kind = 'numbers' | 'biomass' | 'energy'
export const KINDS: Kind[] = ['numbers', 'biomass', 'energy']

const clampIndex = (n: number, length: number) =>
  Math.min(length, Math.max(1, Math.round(n))) - 1

export function ecosystemAt(n: number): Ecosystem {
  return ECOSYSTEMS[clampIndex(n, ECOSYSTEMS.length)] as Ecosystem
}

export function kindAt(n: number): Kind {
  return KINDS[clampIndex(n, KINDS.length)] as Kind
}

/**
 * Energy at each trophic level, in kJ/m² per year.
 *
 * A fixed fraction passes on at each step. The rest is lost — respired to keep the animal
 * alive and warm, excreted, egested undigested, or simply never eaten.
 */
export function energyByLevel(ecosystem: Ecosystem, transferPercent: number): number[] {
  const fraction = Math.min(1, Math.max(0.001, transferPercent / 100))
  return ecosystem.levels.map((_, i) => ecosystem.producerEnergy * fraction ** i)
}

/** How many levels are wider than the level below them — zero for a proper pyramid. */
export function inversions(values: number[]): number {
  return values.filter((v, i) => i > 0 && v > (values[i - 1] ?? 0)).length
}

export const ecosystemKernel: SimKernel<EcosystemParams, SimResult> = (params) => {
  const ecosystem = ecosystemAt(params['ecosystem'] ?? 1)
  const kind = kindAt(params['kind'] ?? 1)
  const transfer = Math.min(30, Math.max(1, params['transfer'] ?? 10))

  const energy = energyByLevel(ecosystem, transfer)
  const values =
    kind === 'numbers'
      ? ecosystem.levels.map((l) => l.numbers)
      : kind === 'biomass'
        ? ecosystem.levels.map((l) => l.biomass)
        : energy.map((e) => Math.round(e * 10) / 10)

  const unit =
    kind === 'numbers' ? 'individuals per hectare' : kind === 'biomass' ? 'g / m²' : 'kJ / m² / year'

  const pyramid: SimPyramid = {
    unit,
    levels: ecosystem.levels.map((level, i) => ({
      label: level.label,
      value: values[i] ?? 0,
    })),
  }

  const top = energy[energy.length - 1] ?? 0
  const wrongWayUp = inversions(values)

  // What would be left for a fifth level, whether or not this chain has one. The number
  // is the argument for why chains are short, so it is worth showing even when it is
  // hypothetical.
  const fifth = ecosystem.producerEnergy * (transfer / 100) ** 4

  return {
    series: [],
    pyramid,
    readouts: {
      top: Math.round(top * 10) / 10,
      efficiency: Math.round((top / ecosystem.producerEnergy) * 10000) / 100,
      fifth: Math.round(fifth * 100) / 100,
      // One over the transfer fraction: eat the crop and you get all of it, feed it to an
      // animal and you get this fraction back.
      cropAdvantage: Math.round((100 / transfer) * 10) / 10,
    },
    markers: [
      {
        x: 0,
        y: 0,
        label:
          wrongWayUp > 0
            ? {
                en: 'This is not a pyramid — a level is wider than the one below it',
                zh: '这不是金字塔——有一层比它下面的一层还宽',
              }
            : {
                en: 'A proper pyramid: every level is smaller than the one below',
                zh: '一个标准的金字塔：每一层都小于其下方的一层',
              },
      },
    ],
  }
}

export default ecosystemKernel
