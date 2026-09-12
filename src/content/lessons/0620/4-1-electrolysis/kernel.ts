/**
 * Electrolysis — kernel for lesson 0620/4-1-electrolysis.
 *
 * Three sorting exercises, because none of this is a quantity and all of it is a decision:
 * which electrode does this product appear at, what happens when the compound is dissolved
 * rather than melted, and which half-equation is the oxidation.
 *
 * Predicting products is taught as two rules and remembered as one. Sorting forces the
 * distinction to be used rather than recited — the cathode always gets the metal from a molten
 * compound, but from an aqueous one it gets hydrogen instead whenever the metal is more
 * reactive than hydrogen, and a student who has only ever recited "metal at the cathode" puts
 * sodium in the wrong bin and finds out immediately.
 *
 * The half-equation exercise is deliberately the last of the three. Oxidation and reduction
 * are defined by electron transfer here, and the anode/cathode answer the student has just
 * worked out twice is what makes the electrons visible: electrons are pulled off at the anode,
 * pushed on at the cathode, and those are the definitions rather than facts about equipment.
 *
 * Covers 0620.4.1.3–5, 4.1.9–10.
 */

import type { Bilingual, SimKernel, SimResult } from '@/content/types'
import {
  correctCount,
  placedCount,
  readAssignment,
  type AssignmentItem,
  type AssignmentTarget,
} from '@/lib/assignment'

export interface ElectrolysisParams extends Record<string, number> {
  /** Which of the exercises is showing, 1-based. */
  stage: number
}

export interface ElectrolysisExercise {
  id: string
  title: Bilingual
  targets: AssignmentTarget[]
  items: AssignmentItem[]
}

const CATHODE: AssignmentTarget = {
  id: 'cathode',
  label: { en: 'At the cathode (negative)', zh: '在阴极（负极）' },
  hint: {
    en: 'Positive ions are attracted here and gain electrons. Metals and hydrogen form at the cathode.',
    zh: '正离子被吸引到这里并得到电子。金属和氢在阴极生成。',
  },
}

const ANODE: AssignmentTarget = {
  id: 'anode',
  label: { en: 'At the anode (positive)', zh: '在阳极（正极）' },
  hint: {
    en: 'Negative ions are attracted here and lose electrons. Non-metals form at the anode.',
    zh: '负离子被吸引到这里并失去电子。非金属在阳极生成。',
  },
}

// ---------------------------------------------------------------------------
// 1 — molten compounds (0620.4.1.3–4)
// ---------------------------------------------------------------------------

const molten: ElectrolysisExercise = {
  id: 'molten',
  title: { en: 'Melt the compound and split it', zh: '熔融化合物并分解它' },
  targets: [CATHODE, ANODE],
  items: [
    {
      id: 'molten-pb',
      label: { en: 'lead, from molten lead(II) bromide', zh: '铅，来自熔融溴化铅(II)' },
      target: 'cathode',
    },
    {
      id: 'molten-br',
      label: { en: 'bromine, from molten lead(II) bromide', zh: '溴，来自熔融溴化铅(II)' },
      target: 'anode',
    },
    {
      id: 'molten-o',
      label: { en: 'oxygen, from molten aluminium oxide', zh: '氧，来自熔融氧化铝' },
      target: 'anode',
    },
    {
      id: 'molten-al',
      label: { en: 'aluminium, from molten aluminium oxide', zh: '铝，来自熔融氧化铝' },
      target: 'cathode',
    },
    {
      id: 'molten-cl',
      label: { en: 'chlorine, from molten sodium chloride', zh: '氯，来自熔融氯化钠' },
      target: 'anode',
    },
    {
      id: 'molten-na',
      label: { en: 'sodium, from molten sodium chloride', zh: '钠，来自熔融氯化钠' },
      target: 'cathode',
    },
  ],
}

// ---------------------------------------------------------------------------
// 2 — aqueous solutions (0620.4.1.5, 4.1.9)
// ---------------------------------------------------------------------------

const aqueous: ElectrolysisExercise = {
  id: 'aqueous',
  title: { en: 'Dissolve it instead, and water joins in', zh: '改为溶解，水也参与进来' },
  targets: [CATHODE, ANODE],
  items: [
    {
      id: 'aq-brine-h',
      label: {
        en: 'hydrogen, from concentrated sodium chloride solution',
        zh: '氢，来自浓氯化钠溶液',
      },
      target: 'cathode',
    },
    {
      id: 'aq-brine-cl',
      label: {
        en: 'chlorine, from concentrated sodium chloride solution',
        zh: '氯，来自浓氯化钠溶液',
      },
      target: 'anode',
    },
    {
      id: 'aq-cuso4-o',
      label: { en: 'oxygen, from copper(II) sulfate solution', zh: '氧，来自硫酸铜(II)溶液' },
      target: 'anode',
    },
    {
      id: 'aq-cuso4-cu',
      label: { en: 'copper, from copper(II) sulfate solution', zh: '铜，来自硫酸铜(II)溶液' },
      target: 'cathode',
    },
    {
      id: 'aq-dilute-o',
      label: {
        en: 'oxygen, from dilute sodium chloride solution',
        zh: '氧，来自稀氯化钠溶液',
      },
      target: 'anode',
    },
    {
      id: 'aq-acid-h',
      label: { en: 'hydrogen, from dilute sulfuric acid', zh: '氢，来自稀硫酸' },
      target: 'cathode',
    },
    {
      id: 'aq-acid-o',
      label: { en: 'oxygen, from dilute sulfuric acid', zh: '氧，来自稀硫酸' },
      target: 'anode',
    },
    {
      id: 'aq-dilute-h',
      label: { en: 'hydrogen, from dilute sodium chloride solution', zh: '氢，来自稀氯化钠溶液' },
      target: 'cathode',
    },
  ],
}

// ---------------------------------------------------------------------------
// 3 — half-equations (0620.4.1.10)
// ---------------------------------------------------------------------------

const halfEquations: ElectrolysisExercise = {
  id: 'half',
  title: { en: 'Which way do the electrons go', zh: '电子往哪个方向走' },
  targets: [
    {
      id: 'cathode',
      label: { en: 'Reduction, at the cathode', zh: '还原，在阴极' },
      hint: {
        en: 'Electrons are gained. Look for the electrons on the left-hand side.',
        zh: '得到电子。看电子是否在左边。',
      },
    },
    {
      id: 'anode',
      label: { en: 'Oxidation, at the anode', zh: '氧化，在阳极' },
      hint: {
        en: 'Electrons are lost. Look for the electrons on the right-hand side.',
        zh: '失去电子。看电子是否在右边。',
      },
    },
  ],
  items: [
    { id: 'half-pb', label: { en: 'Pb²⁺ + 2e⁻ → Pb', zh: 'Pb²⁺ + 2e⁻ → Pb' }, target: 'cathode' },
    {
      id: 'half-br',
      label: { en: '2Br⁻ → Br₂ + 2e⁻', zh: '2Br⁻ → Br₂ + 2e⁻' },
      target: 'anode',
    },
    {
      id: 'half-oh',
      label: { en: '4OH⁻ → O₂ + 2H₂O + 4e⁻', zh: '4OH⁻ → O₂ + 2H₂O + 4e⁻' },
      target: 'anode',
    },
    { id: 'half-h', label: { en: '2H⁺ + 2e⁻ → H₂', zh: '2H⁺ + 2e⁻ → H₂' }, target: 'cathode' },
    {
      id: 'half-cl',
      label: { en: '2Cl⁻ → Cl₂ + 2e⁻', zh: '2Cl⁻ → Cl₂ + 2e⁻' },
      target: 'anode',
    },
    { id: 'half-cu', label: { en: 'Cu²⁺ + 2e⁻ → Cu', zh: 'Cu²⁺ + 2e⁻ → Cu' }, target: 'cathode' },
  ],
}

export const EXERCISES: ElectrolysisExercise[] = [molten, aqueous, halfEquations]

/** Every item across every exercise — the lesson declares one hidden parameter for each. */
export const ALL_ITEMS: AssignmentItem[] = EXERCISES.flatMap((e) => e.items)

/** The largest number of bins any one exercise offers. */
export const MAX_TARGETS = Math.max(...EXERCISES.map((e) => e.targets.length))

export function exerciseAt(stage: number): ElectrolysisExercise {
  const i = Math.min(EXERCISES.length, Math.max(1, Math.round(stage))) - 1
  return EXERCISES[i] as ElectrolysisExercise
}

export const electrolysisKernel: SimKernel<ElectrolysisParams, SimResult> = (params) => {
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

export default electrolysisKernel
