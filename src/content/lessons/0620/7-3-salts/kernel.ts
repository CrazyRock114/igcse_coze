/**
 * Preparing salts — kernel for lesson 0620/7-3-salts.
 *
 * There are three ways to make a salt and the exam asks you to pick one. The choice is not
 * a matter of taste: it follows from two facts about the salt you want. Is it soluble? And
 * is the base you would start from soluble too?
 *
 * So this works the decision the way a student has to. Solubility comes from the rules
 * rather than from a table of answers, the method follows from the solubility, and the
 * steps follow from the method. Change the salt and every one of those falls out again.
 *
 * The formula is derived the same way, by balancing the charges — so a student can check
 * their own against it.
 *
 * Covers 0620.7.2.1–3 and 7.3.1–5.
 */

import type { Bilingual, SimBody, SimKernel, SimResult } from '@/content/types'

export interface SaltParams extends Record<string, number> {
  /** Index into CATIONS */
  cation: number
  /** Index into ANIONS */
  anion: number
}

export interface Cation {
  symbol: string
  name: Bilingual
  charge: number
  /** True for sodium and potassium, whose hydroxides and carbonates are soluble. */
  alwaysSoluble: boolean
}

export interface Anion {
  key: string
  /** Formula of the ion, without its charge. */
  formula: string
  name: Bilingual
  charge: number
  /** Whether the formula needs brackets when more than one is present. */
  polyatomic: boolean
}

export const CATIONS: Cation[] = [
  { symbol: 'Na', name: { en: 'sodium', zh: '钠' }, charge: 1, alwaysSoluble: true },
  { symbol: 'K', name: { en: 'potassium', zh: '钾' }, charge: 1, alwaysSoluble: true },
  { symbol: 'Mg', name: { en: 'magnesium', zh: '镁' }, charge: 2, alwaysSoluble: false },
  { symbol: 'Ca', name: { en: 'calcium', zh: '钙' }, charge: 2, alwaysSoluble: false },
  { symbol: 'Zn', name: { en: 'zinc', zh: '锌' }, charge: 2, alwaysSoluble: false },
  { symbol: 'Cu', name: { en: 'copper(II)', zh: '铜(II)' }, charge: 2, alwaysSoluble: false },
  { symbol: 'Ba', name: { en: 'barium', zh: '钡' }, charge: 2, alwaysSoluble: false },
  { symbol: 'Pb', name: { en: 'lead(II)', zh: '铅(II)' }, charge: 2, alwaysSoluble: false },
  { symbol: 'Ag', name: { en: 'silver', zh: '银' }, charge: 1, alwaysSoluble: false },
]

export const ANIONS: Anion[] = [
  { key: 'nitrate', formula: 'NO₃', name: { en: 'nitrate', zh: '硝酸盐' }, charge: 1, polyatomic: true },
  { key: 'chloride', formula: 'Cl', name: { en: 'chloride', zh: '氯化物' }, charge: 1, polyatomic: false },
  { key: 'sulfate', formula: 'SO₄', name: { en: 'sulfate', zh: '硫酸盐' }, charge: 2, polyatomic: true },
  { key: 'carbonate', formula: 'CO₃', name: { en: 'carbonate', zh: '碳酸盐' }, charge: 2, polyatomic: true },
]

/**
 * The solubility rules 0620 expects, applied in order.
 *
 * Every rule after the first two is "soluble, except…", which is why the exceptions are
 * worth learning as a short list rather than the rules as a long one.
 */
export function isSoluble(cation: Cation, anion: Anion): boolean {
  if (anion.key === 'nitrate') return true
  if (cation.alwaysSoluble) return true
  if (anion.key === 'carbonate') return false
  if (anion.key === 'chloride') return !['Ag', 'Pb'].includes(cation.symbol)
  // Sulfates: barium, lead and calcium are the exceptions.
  return !['Ba', 'Pb', 'Ca'].includes(cation.symbol)
}

export type Method = 'excess-solid' | 'titration' | 'precipitation'

/**
 * Which of the three routes makes this salt.
 *
 * An insoluble salt cannot be crystallised out of solution, so it has to be precipitated.
 * A soluble salt is made from an acid and a base — and whether you can filter off the
 * leftover base decides the rest: an insoluble base can be added in excess and filtered,
 * a soluble one cannot, so it has to be measured out by titration instead.
 */
export function methodFor(cation: Cation, anion: Anion): Method {
  if (!isSoluble(cation, anion)) return 'precipitation'
  return cation.alwaysSoluble ? 'titration' : 'excess-solid'
}

/** Greatest common divisor, for cancelling the charges down. */
function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b)
}

export interface FormulaParts {
  cations: number
  anions: number
  text: string
}

/**
 * The formula, from balancing the charges.
 *
 * Brackets go round a polyatomic ion whenever more than one is needed — Ca(NO₃)₂, not
 * CaNO₃₂ — which is a mark in its own right.
 */
export function formulaFor(cation: Cation, anion: Anion): FormulaParts {
  const common = (cation.charge * anion.charge) / gcd(cation.charge, anion.charge)
  const cations = common / cation.charge
  const anions = common / anion.charge

  const sub = (n: number): string =>
    n <= 1 ? '' : String(n).replace(/\d/g, (d) => '₀₁₂₃₄₅₆₇₈₉'[Number(d)]!)

  const anionText =
    anions > 1 && anion.polyatomic ? `(${anion.formula})${sub(anions)}` : `${anion.formula}${sub(anions)}`

  return { cations, anions, text: `${cation.symbol}${sub(cations)}${anionText}` }
}

interface Route {
  name: Bilingual
  why: Bilingual
  steps: Bilingual[]
}

const ROUTES: Record<Method, Route> = {
  'excess-solid': {
    name: { en: 'Acid + excess insoluble base', zh: '酸 + 过量难溶性碱' },
    why: {
      en: 'The salt is soluble and the base is not, so you can add the base until no more dissolves and simply filter the leftovers out.',
      zh: '盐可溶而碱不可溶，所以可以一直加碱直到不再溶解，再把剩余的过滤掉。',
    },
    steps: [
      { en: 'Warm the dilute acid', zh: '加热稀酸' },
      { en: 'Add the insoluble base until no more dissolves', zh: '加入难溶性碱直到不再溶解' },
      { en: 'Filter off the excess base', zh: '过滤除去过量的碱' },
      { en: 'Heat the filtrate to crystallisation point', zh: '加热滤液至结晶点' },
      { en: 'Leave to crystallise, then dry between filter papers', zh: '冷却结晶，再用滤纸吸干' },
    ],
  },
  titration: {
    name: { en: 'Titration with a soluble base', zh: '与可溶性碱滴定' },
    why: {
      en: 'Both the salt and the base are soluble, so there is nothing to filter. The exact volume that neutralises the acid has to be found first, by titration.',
      zh: '盐和碱都可溶，没有东西可过滤。必须先通过滴定找出恰好中和酸所需的准确体积。',
    },
    steps: [
      { en: 'Titrate the acid against the alkali with an indicator', zh: '加指示剂，用碱滴定酸' },
      { en: 'Note the exact volume needed to neutralise', zh: '记录恰好中和所需的准确体积' },
      { en: 'Repeat with that volume and no indicator', zh: '用该体积重做一次，不加指示剂' },
      { en: 'Heat to crystallisation point', zh: '加热至结晶点' },
      { en: 'Leave to crystallise, then dry between filter papers', zh: '冷却结晶，再用滤纸吸干' },
    ],
  },
  precipitation: {
    name: { en: 'Precipitation', zh: '沉淀法' },
    why: {
      en: 'The salt is insoluble, so it cannot be crystallised out of solution. Mix two soluble solutions that contain its ions and it falls out as a solid.',
      zh: '这种盐不溶，无法从溶液中结晶出来。把两种含其离子的可溶性溶液混合，它就以固体形式析出。',
    },
    steps: [
      { en: 'Mix solutions of two soluble salts containing the two ions', zh: '混合两种含所需离子的可溶性盐溶液' },
      { en: 'The insoluble salt appears as a precipitate', zh: '难溶性盐以沉淀形式出现' },
      { en: 'Filter to collect the precipitate', zh: '过滤收集沉淀' },
      { en: 'Wash it with distilled water', zh: '用蒸馏水洗涤' },
      { en: 'Dry it in a warm oven', zh: '在温热的烘箱中干燥' },
    ],
  },
}

export const saltsKernel: SimKernel<SaltParams, SimResult> = ({ cation, anion }) => {
  const chosenCation = CATIONS[Math.min(CATIONS.length - 1, Math.max(0, Math.round(cation)))]!
  const chosenAnion = ANIONS[Math.min(ANIONS.length - 1, Math.max(0, Math.round(anion)))]!

  const soluble = isSoluble(chosenCation, chosenAnion)
  const method = methodFor(chosenCation, chosenAnion)
  const route = ROUTES[method]
  const formula = formulaFor(chosenCation, chosenAnion)

  // The steps of the chosen route, as a numbered list.
  const bodies: SimBody[] = route.steps.map((step, i) => ({
    x: 0,
    y: -i,
    kind: 'rung',
    label: `${i + 1}|${step.en}`,
  }))

  const headline: Bilingual = {
    en: `${chosenCation.name.en} ${chosenAnion.name.en} · ${formula.text} — ${soluble ? 'soluble' : 'insoluble'}, so: ${route.name.en}`,
    zh: `${chosenCation.name.zh ?? ''}${chosenAnion.name.zh ?? ''} · ${formula.text} —— ${soluble ? '可溶' : '不溶'}，所以采用：${route.name.zh ?? ''}`,
  }

  return {
    series: [],
    bodies,
    markers: [
      {
        x: 0,
        y: 0,
        label: { en: formula.text, zh: formula.text },
      },
      { x: 0, y: 0, label: headline },
      { x: 0, y: 0, label: route.why },
    ],
    readouts: {
      soluble: soluble ? 1 : 0,
      cationCharge: chosenCation.charge,
      cationsInFormula: formula.cations,
      anionsInFormula: formula.anions,
    },
  }
}

export default saltsKernel
