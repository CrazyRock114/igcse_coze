/**
 * Identifying ions and gases — kernel for lesson 0620/12-5-tests.
 *
 * Four matching exercises. Qualitative analysis is a page of the syllabus that is pure
 * recall — reagent, observation, conclusion — and a paragraph of prose is the worst possible
 * way to meet it: read it and you feel you know it, pair it up and you find out.
 *
 * Matching is used rather than sorting because these facts really are one-to-one. Every cation
 * has its own observation with sodium hydroxide, and the observations are deliberately similar
 * — three of them are a white precipitate, and two of those three dissolve in excess. A student
 * who has read the table can recite "white precipitate"; only one who has used it can say
 * which white precipitate.
 *
 * The right-hand column is scrambled by a hash of the id, because in writing order the exercise
 * answers itself: pair row one with row one all the way down and never read a word.
 *
 * Covers 0620.12.5.1–4.
 */

import type { Bilingual, SimKernel, SimResult } from '@/content/types'
import {
  correctCount,
  placedCount,
  readAssignment,
  type AssignmentItem,
  type AssignmentTarget,
} from '@/lib/assignment'

export interface TestsParams extends Record<string, number> {
  /** Which of the exercises is showing, 1-based. */
  stage: number
}

export interface MatchExercise {
  id: string
  title: Bilingual
  items: AssignmentItem[]
  targets: AssignmentTarget[]
}

/** FNV-1a. Any stable string-to-number function would do; this one is short. */
function hash(s: string): number {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

/**
 * Reorders the right-hand column so that no partner sits opposite its own item.
 *
 * A hash sorts them without randomness — the kernel has to stay a pure function — but a hash
 * is not a derangement, so the sort is followed by a repair pass that swaps any survivor with
 * its neighbour.
 */
function scramble(targets: AssignmentTarget[], wanted: string[]): AssignmentTarget[] {
  const out = [...targets].sort((a, b) => hash(a.id) - hash(b.id))

  for (let pass = 0; pass < out.length; pass++) {
    let clean = true
    for (let i = 0; i < out.length; i++) {
      if (out[i]?.id === wanted[i]) {
        const j = (i + 1) % out.length
        ;[out[i], out[j]] = [out[j] as AssignmentTarget, out[i] as AssignmentTarget]
        clean = false
      }
    }
    if (clean) break
  }
  return out
}

/** Builds a one-to-one exercise from pairs, so the two columns cannot drift apart. */
function pairs(
  id: string,
  title: Bilingual,
  rows: Array<[key: string, left: Bilingual, right: Bilingual]>,
): MatchExercise {
  const items: AssignmentItem[] = rows.map(([key, left]) => ({
    id: `${id}-${key}`,
    label: left,
    target: `${id}-${key}-t`,
  }))
  const targets: AssignmentTarget[] = rows.map(([key, , right]) => ({
    id: `${id}-${key}-t`,
    label: right,
  }))

  return {
    id,
    title,
    items,
    targets: scramble(
      targets,
      items.map((i) => i.target),
    ),
  }
}

const cations = pairs(
  'cations',
  { en: 'Cations with aqueous sodium hydroxide', zh: '阳离子与氢氧化钠溶液' },
  [
    [
      'ca',
      { en: 'calcium, Ca²⁺', zh: '钙 Ca²⁺' },
      {
        en: 'white precipitate, insoluble in excess',
        zh: '白色沉淀，过量时不溶解',
      },
    ],
    [
      'zn',
      { en: 'zinc, Zn²⁺', zh: '锌 Zn²⁺' },
      {
        en: 'white precipitate, dissolving in excess to a colourless solution',
        zh: '白色沉淀，过量时溶解为无色溶液',
      },
    ],
    [
      'cu',
      { en: 'copper(II), Cu²⁺', zh: '铜(II) Cu²⁺' },
      { en: 'light blue precipitate, insoluble in excess', zh: '浅蓝色沉淀，过量时不溶解' },
    ],
    [
      'fe2',
      { en: 'iron(II), Fe²⁺', zh: '铁(II) Fe²⁺' },
      { en: 'green precipitate, insoluble in excess', zh: '绿色沉淀，过量时不溶解' },
    ],
    [
      'fe3',
      { en: 'iron(III), Fe³⁺', zh: '铁(III) Fe³⁺' },
      { en: 'red-brown precipitate, insoluble in excess', zh: '红棕色沉淀，过量时不溶解' },
    ],
    [
      'nh4',
      { en: 'ammonium, NH₄⁺', zh: '铵 NH₄⁺' },
      {
        en: 'no precipitate; on warming, a gas that turns damp red litmus blue',
        zh: '无沉淀；加热时放出能使湿润红色石蕊变蓝的气体',
      },
    ],
  ],
)

const anions = pairs(
  'anions',
  { en: 'Anions and the reagent that finds them', zh: '阴离子及其检验试剂' },
  [
    [
      'co3',
      { en: 'carbonate, CO₃²⁻', zh: '碳酸根 CO₃²⁻' },
      {
        en: 'add dilute acid — effervescence, and the gas turns limewater milky',
        zh: '加稀酸——冒泡，气体使澄清石灰水变浑浊',
      },
    ],
    [
      'cl',
      { en: 'chloride, Cl⁻', zh: '氯离子 Cl⁻' },
      {
        en: 'acidify with dilute nitric acid, then add aqueous silver nitrate — white precipitate',
        zh: '用稀硝酸酸化后加硝酸银溶液——白色沉淀',
      },
    ],
    [
      'i',
      { en: 'iodide, I⁻', zh: '碘离子 I⁻' },
      {
        en: 'acidify with dilute nitric acid, then add aqueous silver nitrate — yellow precipitate',
        zh: '用稀硝酸酸化后加硝酸银溶液——黄色沉淀',
      },
    ],
    [
      'so4',
      { en: 'sulfate, SO₄²⁻', zh: '硫酸根 SO₄²⁻' },
      {
        en: 'acidify with dilute nitric acid, then add aqueous barium nitrate — white precipitate',
        zh: '用稀硝酸酸化后加硝酸钡溶液——白色沉淀',
      },
    ],
    [
      'no3',
      { en: 'nitrate, NO₃⁻', zh: '硝酸根 NO₃⁻' },
      {
        en: 'add aqueous sodium hydroxide and aluminium foil, then warm — ammonia given off',
        zh: '加氢氧化钠溶液与铝箔后加热——放出氨气',
      },
    ],
  ],
)

const gases = pairs(
  'gases',
  { en: 'Gases and how to test for them', zh: '气体及其检验方法' },
  [
    [
      'h2',
      { en: 'hydrogen', zh: '氢气' },
      { en: 'a lighted splint gives a squeaky pop', zh: '点燃的木条发出爆鸣声' },
    ],
    [
      'o2',
      { en: 'oxygen', zh: '氧气' },
      { en: 'a glowing splint relights', zh: '带火星的木条复燃' },
    ],
    [
      'co2',
      { en: 'carbon dioxide', zh: '二氧化碳' },
      { en: 'limewater turns milky', zh: '澄清石灰水变浑浊' },
    ],
    [
      'nh3',
      { en: 'ammonia', zh: '氨气' },
      { en: 'damp red litmus paper turns blue', zh: '湿润的红色石蕊试纸变蓝' },
    ],
    [
      'cl2',
      { en: 'chlorine', zh: '氯气' },
      {
        en: 'damp litmus paper is bleached white',
        zh: '湿润的石蕊试纸被漂白成白色',
      },
    ],
  ],
)

const flames = pairs(
  'flames',
  { en: 'Flame tests', zh: '焰色反应' },
  [
    ['li', { en: 'lithium, Li⁺', zh: '锂 Li⁺' }, { en: 'red flame', zh: '红色火焰' }],
    ['na', { en: 'sodium, Na⁺', zh: '钠 Na⁺' }, { en: 'yellow flame', zh: '黄色火焰' }],
    ['k', { en: 'potassium, K⁺', zh: '钾 K⁺' }, { en: 'lilac flame', zh: '紫色火焰' }],
    ['ca-f', { en: 'calcium, Ca²⁺', zh: '钙 Ca²⁺' }, { en: 'orange-red flame', zh: '橙红色火焰' }],
    ['cu-f', { en: 'copper(II), Cu²⁺', zh: '铜(II) Cu²⁺' }, { en: 'blue-green flame', zh: '蓝绿色火焰' }],
  ],
)

export const EXERCISES: MatchExercise[] = [cations, anions, gases, flames]

/** Every item across every exercise — the lesson declares one hidden parameter for each. */
export const ALL_ITEMS: AssignmentItem[] = EXERCISES.flatMap((e) => e.items)

/** The largest number of partners any one exercise offers. */
export const MAX_TARGETS = Math.max(...EXERCISES.map((e) => e.targets.length))

export function exerciseAt(stage: number): MatchExercise {
  const i = Math.min(EXERCISES.length, Math.max(1, Math.round(stage))) - 1
  return EXERCISES[i] as MatchExercise
}

export const testsKernel: SimKernel<TestsParams, SimResult> = (params) => {
  const exercise = exerciseAt(params['stage'] ?? 1)
  const assignment = readAssignment(exercise.items, exercise.targets, params)

  return {
    series: [],
    assignment,
    readouts: {
      correct: correctCount(assignment),
      paired: placedCount(assignment),
      total: exercise.items.length,
    },
  }
}

export default testsKernel
