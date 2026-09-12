/**
 * Formulae and balanced equations — kernel for lesson 0620/3-1-formulae-equations.
 *
 * A reaction with the coefficients under the student's control, and the atom count on each
 * side worked out element by element from the formulae themselves.
 *
 * Balancing is taught as a procedure and practised as a guess. The tally is what turns it back
 * into reasoning: two columns of numbers that have to agree, with the element that does not
 * agree named. A student who can see that oxygen is 2 against 3 knows what to change next; a
 * student staring at an unbalanced equation does not.
 *
 * The one rule that matters is enforced by the shape of the exercise rather than stated and
 * hoped for: the formulae cannot be edited, only the numbers in front of them. Changing H₂O
 * to H₂O₂ to make the oxygens work is the single most common way of getting this wrong, and
 * here it is not available.
 *
 * Covers 0620.3.1.1–4 and 3.1.7.
 */

import type { Bilingual, SimEquation, SimKernel, SimResult } from '@/content/types'
import { addAtoms, elementsIn } from '@/lib/formula'

export interface EquationParams extends Record<string, number> {
  /** Which reaction to balance. */
  reaction: number
  /** Coefficients, in the order the species are written. */
  a: number
  b: number
  c: number
  d: number
}

export interface Species {
  formula: string
  /** State symbol: s, l, g or aq. */
  state: string
}

export interface ReactionSpec {
  name: Bilingual
  /** The word equation, which is what 0620.3.1.4 asks students to construct first. */
  word: Bilingual
  reactants: Species[]
  products: Species[]
  /** The correct coefficients, reactants then products. */
  answer: number[]
}

export const REACTIONS: ReactionSpec[] = [
  {
    name: { en: 'Hydrogen burning', zh: '氢气燃烧' },
    word: { en: 'hydrogen + oxygen → water', zh: '氢气 + 氧气 → 水' },
    reactants: [
      { formula: 'H2', state: 'g' },
      { formula: 'O2', state: 'g' },
    ],
    products: [{ formula: 'H2O', state: 'l' }],
    answer: [2, 1, 2],
  },
  {
    name: { en: 'Methane burning', zh: '甲烷燃烧' },
    word: {
      en: 'methane + oxygen → carbon dioxide + water',
      zh: '甲烷 + 氧气 → 二氧化碳 + 水',
    },
    reactants: [
      { formula: 'CH4', state: 'g' },
      { formula: 'O2', state: 'g' },
    ],
    products: [
      { formula: 'CO2', state: 'g' },
      { formula: 'H2O', state: 'l' },
    ],
    answer: [1, 2, 1, 2],
  },
  {
    name: { en: 'Iron rusting', zh: '铁生锈' },
    word: { en: 'iron + oxygen → iron(III) oxide', zh: '铁 + 氧气 → 氧化铁(III)' },
    reactants: [
      { formula: 'Fe', state: 's' },
      { formula: 'O2', state: 'g' },
    ],
    products: [{ formula: 'Fe2O3', state: 's' }],
    answer: [4, 3, 2],
  },
  {
    name: { en: 'Making ammonia', zh: '合成氨' },
    word: { en: 'nitrogen + hydrogen → ammonia', zh: '氮气 + 氢气 → 氨' },
    reactants: [
      { formula: 'N2', state: 'g' },
      { formula: 'H2', state: 'g' },
    ],
    products: [{ formula: 'NH3', state: 'g' }],
    answer: [1, 3, 2],
  },
  {
    name: { en: 'A metal with an acid', zh: '金属与酸反应' },
    word: {
      en: 'calcium + hydrochloric acid → calcium chloride + hydrogen',
      zh: '钙 + 盐酸 → 氯化钙 + 氢气',
    },
    reactants: [
      { formula: 'Ca', state: 's' },
      { formula: 'HCl', state: 'aq' },
    ],
    products: [
      { formula: 'CaCl2', state: 'aq' },
      { formula: 'H2', state: 'g' },
    ],
    answer: [1, 2, 1, 1],
  },
  {
    name: { en: 'Neutralising with a hydroxide', zh: '用氢氧化物中和' },
    word: {
      en: 'sodium hydroxide + sulfuric acid → sodium sulfate + water',
      zh: '氢氧化钠 + 硫酸 → 硫酸钠 + 水',
    },
    reactants: [
      { formula: 'NaOH', state: 'aq' },
      { formula: 'H2SO4', state: 'aq' },
    ],
    products: [
      { formula: 'Na2SO4', state: 'aq' },
      { formula: 'H2O', state: 'l' },
    ],
    answer: [2, 1, 1, 2],
  },
]

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))

/** The atom tally on each side, for every element in the reaction. */
export function tally(
  reactants: Array<{ species: Species; coefficient: number }>,
  products: Array<{ species: Species; coefficient: number }>,
): SimEquation['tally'] {
  const left: Record<string, number> = {}
  const right: Record<string, number> = {}
  for (const r of reactants) addAtoms(left, r.species.formula, r.coefficient)
  for (const p of products) addAtoms(right, p.species.formula, p.coefficient)

  const elements = elementsIn([
    ...reactants.map((r) => r.species.formula),
    ...products.map((p) => p.species.formula),
  ])
  return elements.map((element) => ({
    element,
    left: left[element] ?? 0,
    right: right[element] ?? 0,
  }))
}

/** Elements whose two columns do not agree. */
export function unbalanced(rows: SimEquation['tally']): SimEquation['tally'] {
  return rows.filter((r) => r.left !== r.right)
}

export const equationKernel: SimKernel<EquationParams, SimResult> = (params) => {
  const index = clamp(Math.round(params['reaction'] ?? 0), 0, REACTIONS.length - 1)
  const spec = REACTIONS[index]!
  const coefficients = [
    clamp(Math.round(params['a'] ?? 1), 1, 8),
    clamp(Math.round(params['b'] ?? 1), 1, 8),
    clamp(Math.round(params['c'] ?? 1), 1, 8),
    clamp(Math.round(params['d'] ?? 1), 1, 8),
  ]

  const reactants = spec.reactants.map((species, i) => ({
    species,
    coefficient: coefficients[i]!,
  }))
  const products = spec.products.map((species, i) => ({
    species,
    coefficient: coefficients[spec.reactants.length + i]!,
  }))

  const rows = tally(reactants, products)
  const wrong = unbalanced(rows)
  const balanced = wrong.length === 0

  const equation: SimEquation = {
    left: reactants.map((r) => ({
      coefficient: r.coefficient,
      formula: r.species.formula,
      state: r.species.state,
    })),
    right: products.map((p) => ({
      coefficient: p.coefficient,
      formula: p.species.formula,
      state: p.species.state,
    })),
    tally: rows,
  }

  const statusNote: Bilingual = balanced
    ? {
        en: 'Balanced — every element has the same number of atoms on each side, which is what the law of conservation of mass demands: atoms are rearranged in a reaction, never created or destroyed',
        zh: '已配平——每种元素在两边的原子数相同，这正是质量守恒定律的要求：反应中原子只是重新排列，绝不会产生或消失',
      }
    : {
        en: `Not balanced yet. ${wrong
          .map((r) => `${r.element}: ${r.left} on the left against ${r.right} on the right`)
          .join('; ')}`,
        zh: `尚未配平。${wrong
          .map((r) => `${r.element}：左边 ${r.left} 个，右边 ${r.right} 个`)
          .join('；')}`,
      }

  const ruleNote: Bilingual = {
    en: 'Only the big numbers in front can be changed. A formula is fixed by the compound it names — turning H₂O into H₂O₂ to make the oxygens work would be describing hydrogen peroxide instead of water, which is a different substance with different reactions',
    zh: '只能改动前面的系数。化学式由它所表示的化合物决定——为了让氧配平而把 H₂O 改成 H₂O₂，写出的就是过氧化氢而不是水，那是性质与反应都不同的另一种物质',
  }

  return {
    series: [],
    equation,
    readouts: {
      elementsBalanced: rows.length - wrong.length,
      elementsTotal: rows.length,
      atomsLeft: rows.reduce((sum, r) => sum + r.left, 0),
      atomsRight: rows.reduce((sum, r) => sum + r.right, 0),
    },
    markers: [
      { x: 0, y: 0, label: spec.word },
      { x: 0, y: 0, label: statusNote },
      { x: 0, y: 0, label: ruleNote },
    ],
  }
}

export default equationKernel
