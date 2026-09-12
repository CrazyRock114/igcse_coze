/**
 * Redox — kernel for lesson 0620/6-4-redox.
 *
 * Three sorting exercises, in the order the definitions actually developed and in the order
 * they get harder.
 *
 * First, oxygen: oxidation is gaining it and reduction is losing it. That definition is easy
 * and it covers rusting, combustion and the blast furnace, which is most of what a Core
 * student meets.
 *
 * Then electrons, which is the definition that survives. It has to be introduced separately
 * because it disagrees with intuition: magnesium burning in oxygen is obviously oxidation, but
 * magnesium reacting with chlorine is oxidation too, and there is no oxygen anywhere in it.
 * Sorting half-equations by which side the electrons are on makes the new definition mechanical
 * rather than a second thing to remember.
 *
 * Then agents, which is where students reliably come unstuck. An oxidising agent is not the
 * thing being oxidised — it is the thing doing the oxidising, and it is therefore reduced
 * itself. The two words point in opposite directions, and no amount of restating fixes it;
 * sorting six substances and being told immediately does.
 *
 * Covers 0620.6.4.3–5, 6.4.6–8 and 6.4.11–13.
 */

import type { Bilingual, SimKernel, SimResult } from '@/content/types'
import {
  correctCount,
  placedCount,
  readAssignment,
  type AssignmentItem,
  type AssignmentTarget,
} from '@/lib/assignment'

export interface RedoxParams extends Record<string, number> {
  /** Which of the exercises is showing, 1-based. */
  stage: number
}

export interface RedoxExercise {
  id: string
  title: Bilingual
  targets: AssignmentTarget[]
  items: AssignmentItem[]
}

// ---------------------------------------------------------------------------
// 1 — oxygen (0620.6.4.3–5)
// ---------------------------------------------------------------------------

const oxygen: RedoxExercise = {
  id: 'oxygen',
  title: { en: 'The oxygen definition', zh: '以氧来定义' },
  targets: [
    {
      id: 'oxidised',
      label: { en: 'Oxidised — it gains oxygen', zh: '被氧化——得到氧' },
      hint: {
        en: 'Compare the substance before and after: has it picked oxygen up?',
        zh: '比较反应前后的这种物质：它是否结合了氧？',
      },
    },
    {
      id: 'reduced',
      label: { en: 'Reduced — it loses oxygen', zh: '被还原——失去氧' },
      hint: {
        en: 'An oxide that ends up as the element has lost its oxygen to something else.',
        zh: '若氧化物最终变成单质，说明它把氧交给了别的物质。',
      },
    },
  ],
  items: [
    {
      id: 'ox-cuo',
      label: { en: 'CuO, in CuO + H₂ → Cu + H₂O', zh: 'CuO，在 CuO + H₂ → Cu + H₂O 中' },
      target: 'reduced',
    },
    {
      id: 'ox-h2',
      label: { en: 'H₂, in CuO + H₂ → Cu + H₂O', zh: 'H₂，在 CuO + H₂ → Cu + H₂O 中' },
      target: 'oxidised',
    },
    {
      id: 'ox-mg',
      label: { en: 'Mg, in 2Mg + O₂ → 2MgO', zh: 'Mg，在 2Mg + O₂ → 2MgO 中' },
      target: 'oxidised',
    },
    {
      id: 'ox-fe2o3',
      label: {
        en: 'Fe₂O₃, in Fe₂O₃ + 3CO → 2Fe + 3CO₂',
        zh: 'Fe₂O₃，在 Fe₂O₃ + 3CO → 2Fe + 3CO₂ 中',
      },
      target: 'reduced',
    },
    {
      id: 'ox-co',
      label: {
        en: 'CO, in Fe₂O₃ + 3CO → 2Fe + 3CO₂',
        zh: 'CO，在 Fe₂O₃ + 3CO → 2Fe + 3CO₂ 中',
      },
      target: 'oxidised',
    },
    {
      id: 'ox-zno',
      label: { en: 'ZnO, in ZnO + C → Zn + CO', zh: 'ZnO，在 ZnO + C → Zn + CO 中' },
      target: 'reduced',
    },
  ],
}

// ---------------------------------------------------------------------------
// 2 — electrons (0620.6.4.6–8)
// ---------------------------------------------------------------------------

const electrons: RedoxExercise = {
  id: 'electrons',
  title: { en: 'The electron definition', zh: '以电子来定义' },
  targets: [
    {
      id: 'oxidised',
      label: { en: 'Oxidation — electrons lost', zh: '氧化——失去电子' },
      hint: {
        en: 'The electrons appear on the right-hand side, and the charge becomes more positive.',
        zh: '电子出现在右边，电荷变得更正。',
      },
    },
    {
      id: 'reduced',
      label: { en: 'Reduction — electrons gained', zh: '还原——得到电子' },
      hint: {
        en: 'The electrons appear on the left-hand side, and the charge becomes less positive.',
        zh: '电子出现在左边，电荷变得不那么正。',
      },
    },
  ],
  items: [
    { id: 'el-mg', label: { en: 'Mg → Mg²⁺ + 2e⁻', zh: 'Mg → Mg²⁺ + 2e⁻' }, target: 'oxidised' },
    {
      id: 'el-cl',
      label: { en: 'Cl₂ + 2e⁻ → 2Cl⁻', zh: 'Cl₂ + 2e⁻ → 2Cl⁻' },
      target: 'reduced',
    },
    {
      id: 'el-fe',
      label: { en: 'Fe²⁺ → Fe³⁺ + e⁻', zh: 'Fe²⁺ → Fe³⁺ + e⁻' },
      target: 'oxidised',
    },
    { id: 'el-cu', label: { en: 'Cu²⁺ + 2e⁻ → Cu', zh: 'Cu²⁺ + 2e⁻ → Cu' }, target: 'reduced' },
    { id: 'el-i', label: { en: '2I⁻ → I₂ + 2e⁻', zh: '2I⁻ → I₂ + 2e⁻' }, target: 'oxidised' },
    {
      id: 'el-br',
      label: { en: 'Br₂ + 2e⁻ → 2Br⁻', zh: 'Br₂ + 2e⁻ → 2Br⁻' },
      target: 'reduced',
    },
  ],
}

// ---------------------------------------------------------------------------
// 3 — agents (0620.6.4.11–13)
// ---------------------------------------------------------------------------

const agents: RedoxExercise = {
  id: 'agents',
  title: { en: 'Which one is doing it', zh: '究竟是谁在起作用' },
  targets: [
    {
      id: 'oxidising',
      label: { en: 'Oxidising agent', zh: '氧化剂' },
      hint: {
        en: 'It oxidises something else, by taking electrons from it — so it is reduced itself.',
        zh: '它通过夺取电子使别的物质被氧化——因此它自身被还原。',
      },
    },
    {
      id: 'reducing',
      label: { en: 'Reducing agent', zh: '还原剂' },
      hint: {
        en: 'It reduces something else, by giving electrons to it — so it is oxidised itself.',
        zh: '它通过给出电子使别的物质被还原——因此它自身被氧化。',
      },
    },
  ],
  items: [
    {
      id: 'ag-mno4',
      label: {
        en: 'acidified potassium manganate(VII), turning from purple to colourless',
        zh: '酸化的高锰酸钾(VII)，由紫色变为无色',
      },
      target: 'oxidising',
    },
    {
      id: 'ag-ki',
      label: {
        en: 'potassium iodide, turning from colourless to brown',
        zh: '碘化钾，由无色变为棕色',
      },
      target: 'reducing',
    },
    {
      id: 'ag-o2',
      label: { en: 'oxygen, when magnesium burns in it', zh: '氧，镁在其中燃烧时' },
      target: 'oxidising',
    },
    {
      id: 'ag-c',
      label: {
        en: 'carbon, taking oxygen from iron(III) oxide in the blast furnace',
        zh: '碳，在高炉中夺取氧化铁(III)中的氧',
      },
      target: 'reducing',
    },
    {
      id: 'ag-cl2',
      label: { en: 'chlorine, displacing bromine from potassium bromide', zh: '氯，把溴从溴化钾中置换出来' },
      target: 'oxidising',
    },
    {
      id: 'ag-h2',
      label: { en: 'hydrogen, passed over hot copper(II) oxide', zh: '氢，通过灼热的氧化铜(II)' },
      target: 'reducing',
    },
  ],
}

export const EXERCISES: RedoxExercise[] = [oxygen, electrons, agents]

/** Every item across every exercise — the lesson declares one hidden parameter for each. */
export const ALL_ITEMS: AssignmentItem[] = EXERCISES.flatMap((e) => e.items)

/** The largest number of bins any one exercise offers. */
export const MAX_TARGETS = Math.max(...EXERCISES.map((e) => e.targets.length))

export function exerciseAt(stage: number): RedoxExercise {
  const i = Math.min(EXERCISES.length, Math.max(1, Math.round(stage))) - 1
  return EXERCISES[i] as RedoxExercise
}

export const redoxKernel: SimKernel<RedoxParams, SimResult> = (params) => {
  const exercise = exerciseAt(params['stage'] ?? 1)
  const assignment = readAssignment(exercise.items, exercise.targets, params)

  return {
    series: [],
    assignment,
    readouts: {
      correct: correctCount(assignment),
      placed: placedCount(assignment),
      total: exercise.items.length,
    },
  }
}

export default redoxKernel
