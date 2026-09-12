/**
 * Alkanes and alkenes — kernel for lesson 0620/11-5-alkenes.
 *
 * Puts the same four reagents to a saturated molecule and to an unsaturated one, and draws
 * whatever comes out. That comparison is the point of the topic: an alkene's double bond
 * opens and swallows the reagent whole, giving one product; an alkane has nothing to open,
 * so it either does nothing at all or, under ultraviolet light, swaps a hydrogen out and
 * gives two products.
 *
 * The structures come from `lib/organic`, so a product is drawn by applying the reaction
 * to a real structure rather than by looking the answer up.
 *
 * Covers 0620.11.4.1–4 and 11.5.1–6.
 */

import type { Bilingual, SimKernel, SimResult } from '@/content/types'
import { relativeMolecularMass } from '@/lib/molecularFormula'
import {
  attachChain,
  buildStructure,
  freeDirection,
  minimumCarbons,
  openDoubleBond,
  replaceHydrogen,
} from '@/lib/organic'

export interface ReactionParams extends Record<string, number> {
  /** Carbon atoms in the chain, 1–4 */
  carbons: number
  /** 0 alkane, 1 alkene */
  family: number
  /** Index into REAGENTS */
  reagent: number
}

export type Outcome = 'none' | 'addition' | 'substitution'

export interface Reagent {
  key: string
  label: Bilingual
  /** Atoms added to each of the two carbons when a C=C opens. */
  addsInner: string[]
  addsTerminal: string[]
}

/**
 * Chlorine is last because it is the one that behaves differently on the two families:
 * substitution on an alkane under ultraviolet light, straightforward addition on an alkene.
 */
export const REAGENTS: Reagent[] = [
  { key: 'none', label: { en: 'No reagent', zh: '不加试剂' }, addsInner: [], addsTerminal: [] },
  {
    key: 'bromine',
    label: { en: 'Bromine Br₂', zh: '溴 Br₂' },
    addsInner: ['Br'],
    addsTerminal: ['Br'],
  },
  {
    key: 'hydrogen',
    label: { en: 'Hydrogen H₂', zh: '氢气 H₂' },
    addsInner: ['H'],
    addsTerminal: ['H'],
  },
  {
    key: 'steam',
    // Water adds as H– and –OH. The –OH goes on the inner carbon of the double bond, which
    // is the product that actually forms: ethene gives ethanol, propene propan-2-ol.
    label: { en: 'Steam H₂O', zh: '水蒸气 H₂O' },
    addsInner: ['O', 'H'],
    addsTerminal: ['H'],
  },
  {
    key: 'chlorine',
    label: { en: 'Chlorine Cl₂ + UV', zh: '氯气 Cl₂ + 紫外光' },
    addsInner: ['Cl'],
    addsTerminal: ['Cl'],
  },
]

const STEMS = ['meth', 'eth', 'prop', 'but']
const ZH_STEMS = ['甲', '乙', '丙', '丁']

/** What the reagent does to this family. */
export function outcomeOf(familyKey: string, reagentKey: string): Outcome {
  if (reagentKey === 'none') return 'none'
  if (familyKey === 'alkene') return 'addition'
  // An alkane is saturated: there is no double bond for a reagent to add across, so
  // nothing happens unless ultraviolet light drives a substitution.
  return reagentKey === 'chlorine' ? 'substitution' : 'none'
}

/** Name of the product, built from the stem rather than looked up. */
export function productName(familyKey: string, reagentKey: string, n: number): Bilingual {
  const stem = STEMS[n - 1] ?? ''
  const zh = ZH_STEMS[n - 1] ?? ''
  const outcome = outcomeOf(familyKey, reagentKey)

  if (outcome === 'substitution') {
    // Chlorine lands on the end carbon, so it is position 1 whenever position matters.
    const prefix = n >= 3 ? '1-' : ''
    return { en: `${prefix}chloro${stem}ane`, zh: `${prefix}氯${zh}烷` }
  }

  if (outcome === 'addition') {
    if (reagentKey === 'hydrogen') return { en: `${stem}ane`, zh: `${zh}烷` }
    if (reagentKey === 'steam') {
      return n === 2
        ? { en: 'ethanol', zh: '乙醇' }
        : { en: `${stem}an-2-ol`, zh: `${zh}-2-醇` }
    }
    const halide = reagentKey === 'bromine' ? 'bromo' : 'chloro'
    const zhHalide = reagentKey === 'bromine' ? '溴' : '氯'
    return { en: `1,2-di${halide}${stem}ane`, zh: `1,2-二${zhHalide}${zh}烷` }
  }

  if (familyKey === 'alkene') {
    return n === 2
      ? { en: 'ethene', zh: '乙烯' }
      : n === 3
        ? { en: 'propene', zh: '丙烯' }
        : { en: 'but-1-ene', zh: '丁-1-烯' }
  }
  return { en: `${stem}ane`, zh: `${zh}烷` }
}

interface Commentary {
  headline: Bilingual
  note: Bilingual
}

/** The line above the structure and the line below it. */
export function commentary(familyKey: string, reagentKey: string): Commentary {
  const outcome = outcomeOf(familyKey, reagentKey)

  if (outcome === 'substitution') {
    return {
      headline: { en: 'Substitution — 2 products', zh: '取代反应——两种产物' },
      note: {
        en: 'One H is replaced by Cl, giving HCl as well. Needs ultraviolet light.',
        zh: '一个 H 被 Cl 取代，同时生成 HCl。需要紫外光。',
      },
    }
  }

  if (outcome === 'addition') {
    const headline: Bilingual = { en: 'Addition — 1 product', zh: '加成反应——只有一种产物' }
    switch (reagentKey) {
      case 'bromine':
        return {
          headline,
          note: {
            en: 'Bromine water: orange → colourless. This is the test for unsaturation.',
            zh: '溴水：橙色 → 无色。这就是不饱和烃的检验方法。',
          },
        }
      case 'hydrogen':
        return {
          headline,
          note: { en: 'Nickel catalyst, about 150 °C.', zh: '镍催化剂，约 150 °C。' },
        }
      case 'steam':
        return {
          headline,
          note: {
            en: 'Catalyst, about 300 °C and 60 atm — this is how ethanol is made industrially.',
            zh: '催化剂，约 300 °C、60 atm——工业上就是这样制乙醇的。',
          },
        }
      default:
        return {
          headline,
          note: {
            en: 'No ultraviolet light needed: the C=C opens on its own.',
            zh: '不需要紫外光：C=C 自己就会打开。',
          },
        }
    }
  }

  if (reagentKey === 'none') {
    return familyKey === 'alkene'
      ? {
          headline: { en: 'Unsaturated — one C=C', zh: '不饱和——含一个 C=C' },
          note: {
            en: 'The double bond is the functional group. It is where every reaction happens.',
            zh: '双键就是官能团。所有反应都发生在这里。',
          },
        }
      : {
          headline: { en: 'Saturated — single bonds only', zh: '饱和——只有单键' },
          note: {
            en: 'Every carbon already holds as many hydrogens as it can.',
            zh: '每个碳都已经连接了尽可能多的氢。',
          },
        }
  }

  return {
    headline: { en: 'No reaction', zh: '不反应' },
    note:
      reagentKey === 'bromine'
        ? {
            en: 'Bromine water stays orange — there is no double bond to open.',
            zh: '溴水仍是橙色——没有可以打开的双键。',
          }
        : {
            en: 'Alkanes are unreactive except in combustion. There is nothing to add across.',
            zh: '烷烃除燃烧外一般不反应。没有可供加成的位置。',
          },
  }
}

export const reactionKernel: SimKernel<ReactionParams, SimResult> = ({
  carbons,
  family,
  reagent,
}) => {
  const familyKey = Math.round(family) >= 1 ? 'alkene' : 'alkane'
  const chosen = REAGENTS[Math.min(REAGENTS.length - 1, Math.max(0, Math.round(reagent)))]!
  const n = Math.min(4, Math.max(minimumCarbons(familyKey), Math.round(carbons)))

  const structure = buildStructure(familyKey, n)
  const outcome = outcomeOf(familyKey, chosen.key)

  if (outcome === 'addition') {
    const opened = openDoubleBond(structure)
    if (opened) {
      const [inner, terminal] = opened
      // Each carbon has exactly one bond going spare once the C=C has opened.
      const innerDirection = freeDirection(structure, inner)
      const terminalDirection = freeDirection(structure, terminal)
      if (innerDirection) {
        attachChain(structure, inner, innerDirection, chosen.addsInner, 'functional')
      }
      if (terminalDirection) {
        attachChain(structure, terminal, terminalDirection, chosen.addsTerminal, 'functional')
      }
    }
  }

  if (outcome === 'substitution') {
    replaceHydrogen(structure, 0, 'Cl')
  }

  const { bodies, links } = structure
  const hydrogens = bodies.filter((b) => b.kind === 'H').length
  const { headline, note } = commentary(familyKey, chosen.key)

  // Somewhere clear of the drawing to hang the two lines of commentary.
  const centre = (n - 1) / 2
  const extent = Math.max(...bodies.map((b) => Math.abs(b.y)))

  return {
    series: [],
    bodies,
    links,
    markers: [
      // [0] is the product name, shown bilingually in the caption rather than drawn.
      { x: centre, y: 0, label: productName(familyKey, chosen.key, n) },
      { x: centre, y: extent + 1.1, label: headline },
      { x: centre, y: -(extent + 1.1), label: note },
    ],
    readouts: {
      carbons: n,
      hydrogens,
      relativeMolecularMass: relativeMolecularMass(bodies),
      // 0 when nothing happens, 1 for an addition, 2 for a substitution. Addition giving
      // exactly one product is an assessed point in its own right (0620.11.5.5).
      productMolecules: outcome === 'none' ? 0 : outcome === 'addition' ? 1 : 2,
    },
  }
}

export default reactionKernel
