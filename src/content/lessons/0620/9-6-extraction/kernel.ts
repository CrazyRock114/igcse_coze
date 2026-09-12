/**
 * Extracting and protecting metals — kernel for lesson 0620/9-6-extraction.
 *
 * Two questions that look unrelated and are answered the same way. How do you get a metal
 * out of its ore? And will one metal protect another from rusting? Both are settled by
 * looking at where the metal sits relative to a landmark on the reactivity series — carbon
 * for extraction, iron for sacrificial protection — so both are the same ladder with the
 * line drawn in a different place.
 *
 * The series data itself comes from the reactivity lesson: there is one reactivity series,
 * and two copies of it would be two chances to disagree.
 *
 * Covers 0620.9.5.1–5 and 9.6.1–4.
 */

import type { Bilingual, SimBody, SimKernel, SimResult } from '@/content/types'
import { METALS, SERIES } from '../9-4-reactivity-series/kernel'

export interface ExtractionParams extends Record<string, number> {
  /** Index into METALS */
  metal: number
  /** 0 asks how the metal is extracted, 1 asks whether it protects iron */
  question: number
}

const CARBON = SERIES.findIndex((e) => e.symbol === 'C')
const IRON = SERIES.findIndex((e) => e.symbol === 'Fe')

/** Charge on the metal's usual ion — the electrons electrolysis has to supply per atom. */
export const ION_CHARGE: Record<string, number> = {
  K: 1,
  Na: 1,
  Ca: 2,
  Mg: 2,
  Al: 3,
  Zn: 2,
  Fe: 3,
  Cu: 2,
  Ag: 1,
  Au: 3,
}

export type Method = 'electrolysis' | 'carbon' | 'native'

/**
 * How the metal is obtained.
 *
 * Above carbon, carbon cannot pull the oxygen off it, so the only route is electrolysis —
 * which is why aluminium was a precious metal until electricity was cheap. Below carbon,
 * heating the ore with coke is enough. At the very bottom the metal is unreactive enough
 * to be found as the element itself.
 */
export function extractionMethod(index: number): Method {
  if (index < CARBON) return 'electrolysis'
  return SERIES[index]!.symbol === 'Ag' || SERIES[index]!.symbol === 'Au' ? 'native' : 'carbon'
}

/** A metal protects iron only if it is the more reactive of the two — it corrodes instead. */
export function protectsIron(index: number): boolean {
  return index < IRON
}

interface Answer {
  headline: Bilingual
  note: Bilingual
}

export function extractionAnswer(index: number): Answer {
  const element = SERIES[index]!
  const charge = ION_CHARGE[element.symbol] ?? 0

  switch (extractionMethod(index)) {
    case 'electrolysis':
      return {
        headline: {
          en: `${element.name.en}: electrolysis of the molten compound`,
          zh: `${element.name.zh ?? ''}：电解熔融化合物`,
        },
        note: {
          en: `Above carbon, so carbon cannot take the oxygen away from it. Electrolysis must supply ${charge} electron${charge === 1 ? '' : 's'} to every ion, which is why it is so expensive. Aluminium is extracted this way from bauxite.`,
          zh: `位于碳之上，所以碳无法把氧从它那里夺走。电解必须给每个离子提供 ${charge} 个电子，这就是成本高昂的原因。铝就是这样从铝土矿中提取的。`,
        },
      }
    case 'carbon':
      return {
        headline: {
          en: `${element.name.en}: reduction by heating the ore with carbon`,
          zh: `${element.name.zh ?? ''}：用碳加热还原矿石`,
        },
        note: {
          en: 'Below carbon, so carbon is reactive enough to take the oxygen away. Iron is made this way in a blast furnace, which is why iron has been cheap for three thousand years and aluminium has not.',
          zh: '位于碳之下，所以碳的活动性足以夺走氧。铁就是在高炉中这样炼成的——这也是三千年来铁一直便宜、而铝并非如此的原因。',
        },
      }
    default:
      return {
        headline: {
          en: `${element.name.en}: found uncombined in the ground`,
          zh: `${element.name.zh ?? ''}：以单质形式存在于地下`,
        },
        note: {
          en: 'So unreactive that it does not form compounds in the first place. No extraction is needed — which is why gold was the first metal people ever used.',
          zh: '太不活泼，根本不会形成化合物。无需冶炼——这也是金成为人类最早使用的金属的原因。',
        },
      }
  }
}

export function protectionAnswer(index: number): Answer {
  const element = SERIES[index]!
  if (element.symbol === 'Fe') {
    return {
      headline: { en: 'Iron cannot protect itself', zh: '铁无法保护自己' },
      note: {
        en: 'Sacrificial protection needs a metal more reactive than the one being protected. Iron is the metal being protected.',
        zh: '牺牲阳极保护需要比被保护金属更活泼的金属。而铁正是被保护的那一个。',
      },
    }
  }

  return protectsIron(index)
    ? {
        headline: {
          en: `${element.name.en} protects iron — it corrodes instead`,
          zh: `${element.name.zh ?? ''}能保护铁——它会代替铁被腐蚀`,
        },
        note: {
          en: 'More reactive than iron, so it loses electrons first and is eaten away while the iron is left alone. Blocks of zinc or magnesium are bolted to ships and pipelines for exactly this.',
          zh: '比铁更活泼，所以它先失去电子被消耗掉，而铁完好无损。船体和管道上焊接锌块或镁块正是为此。',
        },
      }
    : {
        headline: {
          en: `${element.name.en} does not protect iron`,
          zh: `${element.name.zh ?? ''}不能保护铁`,
        },
        note: {
          en: 'Less reactive than iron, so the iron would corrode first. A tin coating on steel is a barrier only — scratch it and the can rusts faster than bare steel would.',
          zh: '活动性低于铁，所以铁会先被腐蚀。马口铁上的锡层只是隔离层——一旦划破，罐子生锈反而比裸钢更快。',
        },
      }
}

export const extractionKernel: SimKernel<ExtractionParams, SimResult> = ({ metal, question }) => {
  const chosen = METALS[Math.min(METALS.length - 1, Math.max(0, Math.round(metal)))]!
  const askingAboutProtection = Math.round(question) >= 1
  const element = SERIES[chosen]!

  // Extraction turns on carbon's position; sacrificial protection turns on iron's.
  const landmark = askingAboutProtection ? IRON : CARBON

  const bodies: SimBody[] = SERIES.map((e, i) => ({
    x: 0,
    y: -i,
    kind: i === chosen ? 'selected' : e.isMetal ? 'rung' : 'reference',
    label: `${e.symbol}|${e.name.en}${e.isMetal ? '' : '|not a metal'}`,
  }))

  bodies.push({
    x: 0,
    y: -(landmark - 0.5),
    kind: 'threshold',
    label: askingAboutProtection
      ? 'above this line: protects iron'
      : 'above this line: needs electrolysis',
  })

  const { headline, note } = askingAboutProtection
    ? protectionAnswer(chosen)
    : extractionAnswer(chosen)

  return {
    series: [],
    bodies,
    markers: [
      {
        x: 0,
        y: 0,
        label: {
          en: askingAboutProtection
            ? `Will ${element.name.en} protect iron?`
            : `How is ${element.name.en} extracted?`,
          zh: askingAboutProtection
            ? `${element.name.zh ?? ''}能保护铁吗？`
            : `${element.name.zh ?? ''}如何冶炼？`,
        },
      },
      { x: 0, y: 0, label: headline },
      { x: 0, y: 0, label: note },
    ],
    readouts: {
      position: chosen + 1,
      landmarkPosition: landmark + 1,
      metalsAboveLine: METALS.filter((i) => i < landmark).length,
      electronsPerAtom: ION_CHARGE[element.symbol] ?? 0,
    },
  }
}

export default extractionKernel
