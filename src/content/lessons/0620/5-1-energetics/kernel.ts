/**
 * Chemical energetics — kernel for lesson 0620/5-1-energetics.
 *
 * The reaction pathway diagram is not drawn from a shape; it is drawn from a calculation.
 * Breaking bonds costs energy and making them releases it, so the difference between those
 * two totals *is* the enthalpy change, and the enthalpy change *is* where the product level
 * sits on the diagram. Every reaction here is a real one with real bond energies, so the
 * curve a student reads is the answer to the arithmetic they are asked to do.
 *
 * The activation energy is a separate control on purpose. It changes the height of the
 * hump and nothing else — the reactant and product levels do not move, so ΔH does not
 * change. That is exactly what a catalyst does, and separating the two controls is the
 * clearest way to show they are independent.
 *
 * Covers 0620.5.1.1–8.
 */

import type { Bilingual, SimKernel, SimResult, SimSeries } from '@/content/types'

export interface EnergeticsParams extends Record<string, number> {
  /** Index into REACTIONS */
  reaction: number
  /** Activation energy in kJ/mol */
  activationEnergy: number
}

export interface BondCount {
  /** How the bond is written, e.g. 'C–H'. */
  bond: string
  /** Mean bond energy in kJ/mol. */
  energy: number
  count: number
}

export interface Reaction {
  key: string
  label: Bilingual
  equation: string
  /** Bonds in the reactants, all of which must be broken. */
  broken: BondCount[]
  /** Bonds in the products, all of which are made. */
  made: BondCount[]
  context: Bilingual
}

const bond = (b: string, energy: number, count: number): BondCount => ({ bond: b, energy, count })

/**
 * Real reactions with mean bond energies in kJ/mol.
 *
 * Mean bond energies are averages over many compounds, so a calculated ΔH lands within a
 * few per cent of the measured value rather than on it — methane's comes out at −822 here
 * against a measured −890. That gap is itself worth knowing about, and the narration says so.
 */
export const REACTIONS: Reaction[] = [
  {
    key: 'hcl',
    label: { en: 'Hydrogen + chlorine', zh: '氢气 + 氯气' },
    equation: 'H₂ + Cl₂ → 2HCl',
    broken: [bond('H–H', 436, 1), bond('Cl–Cl', 242, 1)],
    made: [bond('H–Cl', 431, 2)],
    context: {
      en: 'Explosive in sunlight. Two simple molecules, two bonds broken and two made — the easiest bond-energy sum there is.',
      zh: '在阳光下会爆炸。两个简单分子，断两根键、成两根键——这是最简单的键能计算。',
    },
  },
  {
    key: 'methane',
    label: { en: 'Burning methane', zh: '甲烷燃烧' },
    equation: 'CH₄ + 2O₂ → CO₂ + 2H₂O',
    broken: [bond('C–H', 413, 4), bond('O=O', 496, 2)],
    made: [bond('C=O', 805, 2), bond('O–H', 464, 4)],
    context: {
      en: 'The reaction in every gas hob and boiler. Strongly exothermic, which is the entire reason we burn it.',
      zh: '每个燃气灶和锅炉中的反应。强烈放热，这正是我们燃烧它的全部理由。',
    },
  },
  {
    key: 'ammonia',
    label: { en: 'Making ammonia', zh: '合成氨' },
    equation: 'N₂ + 3H₂ → 2NH₃',
    broken: [bond('N≡N', 945, 1), bond('H–H', 436, 3)],
    made: [bond('N–H', 391, 6)],
    context: {
      en: 'The Haber process, which feeds about half the world through the fertiliser it makes. Only just exothermic — the N≡N triple bond is very expensive to break.',
      zh: '哈伯法，它制得的化肥养活了世界上约一半的人口。只是略微放热——断开 N≡N 三键的代价极高。',
    },
  },
  {
    key: 'no',
    label: { en: 'Nitrogen + oxygen', zh: '氮气 + 氧气' },
    equation: 'N₂ + O₂ → 2NO',
    broken: [bond('N≡N', 945, 1), bond('O=O', 496, 1)],
    made: [bond('N=O', 631, 2)],
    context: {
      en: 'Endothermic, so it does not happen at ordinary temperatures — but it does inside a hot engine, which is where the nitrogen oxides in exhaust fumes come from.',
      zh: '吸热反应，所以常温下不会发生——但在高温发动机内会，尾气中的氮氧化物正源于此。',
    },
  },
  {
    key: 'hydrogenation',
    label: { en: 'Hydrogenating ethene', zh: '乙烯加氢' },
    equation: 'C₂H₄ + H₂ → C₂H₆',
    broken: [bond('C=C', 612, 1), bond('H–H', 436, 1)],
    made: [bond('C–C', 347, 1), bond('C–H', 413, 2)],
    context: {
      en: 'Only the bonds that change are counted. The four C–H bonds ethene already has are in the product too, so they never break.',
      zh: '只计算发生变化的键。乙烯原有的四根 C–H 键在产物中依然存在，所以它们从未断裂。',
    },
  },
]

/** Total energy needed to break every bond in the reactants. Always positive: bond breaking takes energy in. */
export function energyIn(reaction: Reaction): number {
  return reaction.broken.reduce((total, b) => total + b.energy * b.count, 0)
}

/** Total energy released as the product bonds form. Always positive as written; it comes back out. */
export function energyOut(reaction: Reaction): number {
  return reaction.made.reduce((total, b) => total + b.energy * b.count, 0)
}

/**
 * ΔH = energy taken in − energy given out.
 *
 * Negative means more came out than went in, so the surroundings got warmer: exothermic.
 * The sign convention is from the point of view of the chemicals, not the beaker, and
 * getting it backwards is the commonest error in the topic.
 */
export function enthalpyChange(reaction: Reaction): number {
  return energyIn(reaction) - energyOut(reaction)
}

export function isExothermic(reaction: Reaction): boolean {
  return enthalpyChange(reaction) < 0
}

/** Smooth step from 0 to 1, so the diagram curves the way a textbook draws it. */
function ease(t: number): number {
  return (1 - Math.cos(Math.PI * Math.min(1, Math.max(0, t)))) / 2
}

/** Smallest barrier that still leaves the transition state above both levels. */
const MINIMUM_BARRIER = 20

/**
 * The lowest activation energy this reaction could possibly have.
 *
 * For an endothermic reaction the two are not independent: the reaction has to climb at
 * least as far as the products, so Ea can never be smaller than ΔH. Letting the slider go
 * below it would draw products sitting above the transition state, which is not a diagram
 * of anything.
 */
export function minimumActivation(reaction: Reaction): number {
  return Math.max(MINIMUM_BARRIER, enthalpyChange(reaction) + MINIMUM_BARRIER)
}

/**
 * The reaction pathway: flat at the reactant level, over the activation-energy hump, down
 * to the product level, flat again.
 *
 * The peak sits at the reactant level plus Ea, because activation energy is measured from
 * where the reactants start — not from the products, and not from zero.
 */
export function pathway(reaction: Reaction, activation: number): Array<[number, number]> {
  const products = enthalpyChange(reaction)
  const peak = Math.max(activation, minimumActivation(reaction))
  const points: Array<[number, number]> = []

  for (let i = 0; i <= 80; i++) {
    const x = i / 80
    let y: number
    if (x <= 0.15) y = 0
    else if (x <= 0.45) y = peak * ease((x - 0.15) / 0.3)
    else if (x <= 0.8) y = peak + (products - peak) * ease((x - 0.45) / 0.35)
    else y = products
    points.push([x, Math.round(y * 10) / 10])
  }
  return points
}

export const energeticsKernel: SimKernel<EnergeticsParams, SimResult> = ({
  reaction,
  activationEnergy,
}) => {
  const chosen = REACTIONS[Math.min(REACTIONS.length - 1, Math.max(0, Math.round(reaction)))]!
  // The floor is the reaction's own, not a fixed number: an endothermic reaction cannot
  // have a barrier smaller than its enthalpy change.
  const activation = Math.min(600, Math.max(minimumActivation(chosen), activationEnergy))
  const delta = enthalpyChange(chosen)
  const exothermic = isExothermic(chosen)

  const series: SimSeries[] = [
    {
      key: 'pathway',
      label: {
        en: `${chosen.equation} — ${exothermic ? 'exothermic' : 'endothermic'}`,
        zh: `${chosen.equation} —— ${exothermic ? '放热' : '吸热'}`,
      },
      unit: { x: 'progress of reaction', y: 'energy / kJ mol⁻¹' },
      points: pathway(chosen, activation),
      xBounds: { min: 0, max: 1 },
    },
  ]

  return {
    series,
    readouts: {
      energyIn: energyIn(chosen),
      energyOut: energyOut(chosen),
      enthalpyChange: delta,
      activationEnergy: Math.round(activation),
    },
  }
}

export default energeticsKernel
