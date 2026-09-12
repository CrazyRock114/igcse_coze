/**
 * Cells and biological molecules — kernel for lesson 0610/2-1-cells.
 *
 * None of this is a quantity, so there is nothing to plot. What there is instead is a set of
 * decisions a student has to be able to make: does this structure belong to a plant cell, an
 * animal cell, or all three kinds; which food test goes with which food; which small
 * molecules build which large one.
 *
 * The first exercise is the one worth building. Plant cells are usually taught as "animal
 * cell plus wall, chloroplasts and vacuole", which quietly implies the shared structures are
 * animal ones the plant borrowed. Sorting them makes the real shape of it visible: almost
 * everything is in the "all three" bin, a bacterium differs by what it *lacks*, and the
 * plant's three extras are a short list.
 *
 * Covers 0610.2.1.1–4 and 4.1.1–3.
 */

import type { Bilingual, SimKernel, SimResult } from '@/content/types'
import {
  correctCount,
  placedCount,
  readAssignment,
  type AssignmentItem,
  type AssignmentTarget,
} from '@/lib/assignment'

export interface CellsParams extends Record<string, number> {
  /** Which of the exercises is showing, 1-based. */
  stage: number
}

export interface CellsExercise {
  id: string
  title: Bilingual
  targets: AssignmentTarget[]
  items: AssignmentItem[]
}

// ---------------------------------------------------------------------------
// 1 — which cells have which structures (0610.2.1.1–4)
// ---------------------------------------------------------------------------

const structures: CellsExercise = {
  id: 'structures',
  title: { en: 'Which cells have it', zh: '哪些细胞拥有它' },
  targets: [
    {
      id: 'all',
      label: { en: 'All three kinds of cell', zh: '三类细胞都有' },
      hint: {
        en: 'Plant, animal and bacterial cells all have these.',
        zh: '植物细胞、动物细胞和细菌细胞都有这些。',
      },
    },
    {
      id: 'plantAnimal',
      label: { en: 'Plant and animal only', zh: '仅植物与动物细胞' },
      hint: {
        en: 'Present in both, but a bacterium has no membrane-bound organelles at all.',
        zh: '两者都有，但细菌完全没有膜包被的细胞器。',
      },
    },
    {
      id: 'plantOnly',
      label: { en: 'Plant cells only', zh: '仅植物细胞' },
      hint: {
        en: 'The short list of things a plant cell has and an animal cell does not.',
        zh: '植物细胞有而动物细胞没有的那一小串结构。',
      },
    },
    {
      id: 'bacteriaOnly',
      label: { en: 'Bacterial cells only', zh: '仅细菌细胞' },
      hint: {
        en: 'Found in prokaryotes and in neither of the others.',
        zh: '只见于原核生物，另外两类都没有。',
      },
    },
  ],
  items: [
    { id: 's-chloroplast', label: { en: 'Chloroplasts', zh: '叶绿体' }, target: 'plantOnly' },
    { id: 's-membrane', label: { en: 'Cell membrane', zh: '细胞膜' }, target: 'all' },
    { id: 's-plasmid', label: { en: 'Plasmids', zh: '质粒' }, target: 'bacteriaOnly' },
    { id: 's-nucleus', label: { en: 'Nucleus', zh: '细胞核' }, target: 'plantAnimal' },
    { id: 's-ribosome', label: { en: 'Ribosomes', zh: '核糖体' }, target: 'all' },
    { id: 's-vacuole', label: { en: 'Large permanent vacuole', zh: '大的永久液泡' }, target: 'plantOnly' },
    { id: 's-cytoplasm', label: { en: 'Cytoplasm', zh: '细胞质' }, target: 'all' },
    { id: 's-mito', label: { en: 'Mitochondria', zh: '线粒体' }, target: 'plantAnimal' },
    { id: 's-loopdna', label: { en: 'Circular DNA, free in the cytoplasm', zh: '游离于细胞质的环状 DNA' }, target: 'bacteriaOnly' },
    { id: 's-wall', label: { en: 'Cellulose cell wall', zh: '纤维素细胞壁' }, target: 'plantOnly' },
  ],
}

// ---------------------------------------------------------------------------
// 2 — the building blocks (0610.4.1.1–2)
// ---------------------------------------------------------------------------

const molecules: CellsExercise = {
  id: 'molecules',
  title: { en: 'What each is built from', zh: '各由什么构成' },
  targets: [
    {
      id: 'carbohydrate',
      label: { en: 'Made of simple sugars', zh: '由单糖构成' },
      hint: {
        en: 'Carbohydrates: carbon, hydrogen and oxygen only.',
        zh: '糖类：只含碳、氢、氧。',
      },
    },
    {
      id: 'protein',
      label: { en: 'Made of amino acids', zh: '由氨基酸构成' },
      hint: {
        en: 'Proteins: carbon, hydrogen, oxygen and nitrogen — nitrogen is the giveaway.',
        zh: '蛋白质：含碳、氢、氧、氮——"氮"是判断的关键。',
      },
    },
    {
      id: 'fat',
      label: { en: 'Made of fatty acids and glycerol', zh: '由脂肪酸和甘油构成' },
      hint: {
        en: 'Fats and oils: carbon, hydrogen and oxygen, but far less oxygen than a carbohydrate.',
        zh: '脂肪与油：含碳、氢、氧，但氧比糖类少得多。',
      },
    },
  ],
  items: [
    { id: 'm-haemoglobin', label: { en: 'Haemoglobin', zh: '血红蛋白' }, target: 'protein' },
    { id: 'm-oliveoil', label: { en: 'Olive oil', zh: '橄榄油' }, target: 'fat' },
    { id: 'm-starch', label: { en: 'Starch', zh: '淀粉' }, target: 'carbohydrate' },
    { id: 'm-amylase', label: { en: 'Amylase', zh: '淀粉酶' }, target: 'protein' },
    { id: 'm-cellulose', label: { en: 'Cellulose', zh: '纤维素' }, target: 'carbohydrate' },
    { id: 'm-butter', label: { en: 'Butter', zh: '黄油' }, target: 'fat' },
    { id: 'm-glycogen', label: { en: 'Glycogen', zh: '糖原' }, target: 'carbohydrate' },
    { id: 'm-antibody', label: { en: 'An antibody', zh: '抗体' }, target: 'protein' },
  ],
}

// ---------------------------------------------------------------------------
// 3 — the food tests (0610.4.1.3)
// ---------------------------------------------------------------------------

const tests: CellsExercise = {
  id: 'tests',
  title: { en: 'Which test finds what', zh: '哪种检验测什么' },
  targets: [
    {
      id: 'iodine',
      label: { en: 'Iodine solution', zh: '碘液' },
      hint: { en: 'Orange-brown to blue-black.', zh: '由橙棕色变为蓝黑色。' },
    },
    {
      id: 'benedict',
      label: { en: 'Benedict’s solution, heated', zh: '本尼迪克特试剂，加热' },
      hint: { en: 'Blue to green, yellow, orange or brick red.', zh: '由蓝色变为绿、黄、橙或砖红色。' },
    },
    {
      id: 'biuret',
      label: { en: 'Biuret reagent', zh: '双缩脲试剂' },
      hint: { en: 'Blue to purple. No heating.', zh: '由蓝色变为紫色。不需加热。' },
    },
    {
      id: 'ethanol',
      label: { en: 'Ethanol emulsion test', zh: '乙醇乳化试验' },
      hint: { en: 'A cloudy white emulsion forms.', zh: '形成白色浑浊乳浊液。' },
    },
    {
      id: 'dcpip',
      label: { en: 'DCPIP', zh: 'DCPIP（二氯酚靛酚）' },
      hint: { en: 'Blue dye is decolourised.', zh: '蓝色染料被褪色。' },
    },
  ],
  items: [
    { id: 't-vitc', label: { en: 'Vitamin C', zh: '维生素 C' }, target: 'dcpip' },
    { id: 't-starch', label: { en: 'Starch', zh: '淀粉' }, target: 'iodine' },
    { id: 't-fat', label: { en: 'Fat', zh: '脂肪' }, target: 'ethanol' },
    { id: 't-glucose', label: { en: 'Glucose (a reducing sugar)', zh: '葡萄糖（还原糖）' }, target: 'benedict' },
    { id: 't-protein', label: { en: 'Protein', zh: '蛋白质' }, target: 'biuret' },
  ],
}

export const EXERCISES: CellsExercise[] = [structures, molecules, tests]

/** Every item across every exercise — the lesson declares one hidden parameter for each. */
export const ALL_ITEMS: AssignmentItem[] = EXERCISES.flatMap((e) => e.items)

/** The largest number of groups any one exercise offers. */
export const MAX_TARGETS = Math.max(...EXERCISES.map((e) => e.targets.length))

export function exerciseAt(stage: number): CellsExercise {
  const i = Math.min(EXERCISES.length, Math.max(1, Math.round(stage))) - 1
  return EXERCISES[i] as CellsExercise
}

export const cellsKernel: SimKernel<CellsParams, SimResult> = (params) => {
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

export default cellsKernel
