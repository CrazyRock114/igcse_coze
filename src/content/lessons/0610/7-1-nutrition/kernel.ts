/**
 * Human nutrition — kernel for lesson 0610/7-1-nutrition.
 *
 * Like classification, none of this is a quantity, so there is no curve to draw. What there
 * is instead is a great many one-to-one facts a student has to hold: which nutrient prevents
 * which disease, which organ makes which secretion, which enzyme breaks which molecule into
 * which product. Those are exactly what a matching exercise is for, and exactly what a
 * paragraph of prose is worst at — read it and you feel you know it; pair it up and you find
 * out whether you do.
 *
 * Four exercises, selected by `stage`, which together follow food through the body:
 * what it must contain, which organ handles it, which enzyme cuts it up, and how the
 * products get into the blood.
 *
 * Covers 0610.7.1.1–3, 7.2.1–2, 7.3.7, 7.4.1–8 and 7.5.1–5.
 */

import type { Bilingual, SimKernel, SimResult } from '@/content/types'
import {
  correctCount,
  placedCount,
  readAssignment,
  type AssignmentItem,
  type AssignmentTarget,
} from '@/lib/assignment'

export interface NutritionParams extends Record<string, number> {
  /** Which of the four exercises is showing, 1-based. */
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
 * Left in writing order the exercise answers itself: the student pairs row one with row one
 * all the way down and never reads a word. Sorting by a hash of the id scatters them without
 * any randomness — the kernel has to stay a pure function of its inputs — but a hash is not
 * a derangement, and on this data it still left half the diet pairs facing each other. So the
 * sort is followed by a repair pass that swaps any survivor with its neighbour.
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

/**
 * Builds a one-to-one exercise from pairs, so the two columns cannot drift apart.
 *
 * Writing the items and the targets as two separate lists would make it possible to add a
 * nutrient and forget its disease, leaving an item whose `target` names nothing.
 */
function pairs(
  id: string,
  title: Bilingual,
  rows: Array<[key: string, left: Bilingual, right: Bilingual]>
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

  return { id, title, items, targets: scramble(targets, items.map((i) => i.target)) }
}

// ---------------------------------------------------------------------------
// 1 — a balanced diet (0610.7.1.1–3)
// ---------------------------------------------------------------------------

const diet = pairs('d', { en: 'What a diet must contain', zh: '膳食中必须包含什么' }, [
  [
    'carb',
    { en: 'Carbohydrate', zh: '糖类' },
    { en: 'The main source of energy. Bread, rice, potatoes.', zh: '主要的能量来源。面包、米饭、马铃薯。' },
  ],
  [
    'protein',
    { en: 'Protein', zh: '蛋白质' },
    { en: 'Growth and repair of tissues. Meat, fish, eggs, beans.', zh: '组织的生长与修复。肉、鱼、蛋、豆类。' },
  ],
  [
    'fat',
    { en: 'Fat and oil', zh: '脂肪与油' },
    { en: 'An energy store, and insulation under the skin. Butter, nuts.', zh: '能量的贮存形式，并在皮下起隔热作用。黄油、坚果。' },
  ],
  [
    'vitc',
    { en: 'Vitamin C', zh: '维生素 C' },
    { en: 'Too little causes scurvy: bleeding gums and wounds that will not heal. Citrus fruit.', zh: '摄入不足会引起坏血病：牙龈出血、伤口难愈。柑橘类水果。' },
  ],
  [
    'vitd',
    { en: 'Vitamin D', zh: '维生素 D' },
    { en: 'Needed to absorb calcium; too little causes rickets, and soft bent bones. Oily fish, sunlight.', zh: '吸收钙所必需；不足会引起佝偻病，骨骼变软弯曲。油性鱼类、日照。' },
  ],
  [
    'calcium',
    { en: 'Calcium', zh: '钙' },
    { en: 'Hardens bones and teeth, and is needed for blood to clot. Milk, cheese.', zh: '使骨与牙坚硬，并为血液凝固所必需。牛奶、奶酪。' },
  ],
  [
    'iron',
    { en: 'Iron', zh: '铁' },
    { en: 'Needed to make haemoglobin; too little causes anaemia. Red meat, leafy greens.', zh: '合成血红蛋白所必需；不足会引起贫血。红肉、绿叶蔬菜。' },
  ],
  [
    'fibre',
    { en: 'Fibre (roughage)', zh: '膳食纤维' },
    { en: 'Not digested at all. It gives the gut muscles something to grip and push against.', zh: '完全不被消化。它给肠道肌肉提供可以抓握并推动的物质。' },
  ],
])

// ---------------------------------------------------------------------------
// 2 — the organs (0610.7.2.1–2, 7.3.7)
// ---------------------------------------------------------------------------

const organs = pairs('o', { en: 'Which organ does what', zh: '各器官各司其职' }, [
  [
    'mouth',
    { en: 'Mouth', zh: '口腔' },
    { en: 'Teeth break the food up; saliva contains amylase, which starts on starch.', zh: '牙齿把食物磨碎；唾液含淀粉酶，开始分解淀粉。' },
  ],
  [
    'stomach',
    { en: 'Stomach', zh: '胃' },
    { en: 'Churns the food and adds hydrochloric acid and a protease.', zh: '搅拌食物，并加入盐酸和一种蛋白酶。' },
  ],
  [
    'liver',
    { en: 'Liver', zh: '肝脏' },
    { en: 'Makes bile.', zh: '生成胆汁。' },
  ],
  [
    'gall',
    { en: 'Gall bladder', zh: '胆囊' },
    { en: 'Stores bile and releases it into the small intestine.', zh: '贮存胆汁，并将其释放到小肠。' },
  ],
  [
    'pancreas',
    { en: 'Pancreas', zh: '胰腺' },
    { en: 'Secretes amylase, protease and lipase into the small intestine.', zh: '把淀粉酶、蛋白酶和脂肪酶分泌到小肠。' },
  ],
  [
    'small',
    { en: 'Small intestine', zh: '小肠' },
    { en: 'Digestion is finished here, and the products are absorbed into the blood.', zh: '消化在此完成，产物在此被吸收进血液。' },
  ],
  [
    'colon',
    { en: 'Colon', zh: '结肠' },
    { en: 'Absorbs water from what is left.', zh: '从剩余物中吸收水分。' },
  ],
  [
    'anus',
    { en: 'Anus', zh: '肛门' },
    { en: 'Egests the undigested remains as faeces.', zh: '把未被消化的残渣作为粪便排出。' },
  ],
])

// ---------------------------------------------------------------------------
// 3 — the enzymes (0610.7.4.1–8)
// ---------------------------------------------------------------------------

const enzymes = pairs('e', { en: 'Which enzyme cuts what', zh: '哪种酶切断什么' }, [
  [
    'amylase',
    { en: 'Amylase', zh: '淀粉酶' },
    { en: 'Starch → maltose', zh: '淀粉 → 麦芽糖' },
  ],
  [
    'maltase',
    { en: 'Maltase', zh: '麦芽糖酶' },
    { en: 'Maltose → glucose', zh: '麦芽糖 → 葡萄糖' },
  ],
  [
    'protease',
    { en: 'Protease', zh: '蛋白酶' },
    { en: 'Protein → amino acids', zh: '蛋白质 → 氨基酸' },
  ],
  [
    'lipase',
    { en: 'Lipase', zh: '脂肪酶' },
    { en: 'Fats and oils → fatty acids and glycerol', zh: '脂肪与油 → 脂肪酸和甘油' },
  ],
  [
    'hcl',
    { en: 'Hydrochloric acid', zh: '盐酸' },
    { en: 'Not an enzyme. It kills bacteria and gives the stomach protease the low pH it needs.', zh: '它不是酶。它杀灭细菌，并为胃蛋白酶提供所需的低 pH。' },
  ],
  [
    'bile',
    { en: 'Bile', zh: '胆汁' },
    { en: 'Not an enzyme either. It emulsifies fat into droplets, and neutralises stomach acid.', zh: '它也不是酶。它把脂肪乳化成小液滴，并中和胃酸。' },
  ],
])

// ---------------------------------------------------------------------------
// 4 — absorption (0610.7.5.1–5)
// ---------------------------------------------------------------------------

const villus = pairs('v', { en: 'Getting it into the blood', zh: '让养分进入血液' }, [
  [
    'villi',
    { en: 'Villi', zh: '绒毛' },
    { en: 'Thousands of finger-like folds of the intestine wall, multiplying the surface area.', zh: '肠壁上千万个指状皱褶，使表面积成倍增加。' },
  ],
  [
    'microvilli',
    { en: 'Microvilli', zh: '微绒毛' },
    { en: 'Folds on the surface of each single cell, multiplying that area again.', zh: '每个细胞表面上的皱褶，使面积再次成倍增加。' },
  ],
  [
    'thin',
    { en: 'A wall one cell thick', zh: '仅一个细胞厚的壁' },
    { en: 'Makes the distance a molecule has to diffuse as short as it can be.', zh: '使分子需要扩散的距离尽可能短。' },
  ],
  [
    'capillary',
    { en: 'Capillary network', zh: '毛细血管网' },
    { en: 'Carries glucose and amino acids away in the blood, keeping the gradient steep.', zh: '把葡萄糖和氨基酸经血液运走，从而维持陡峭的浓度梯度。' },
  ],
  [
    'lacteal',
    { en: 'Lacteal', zh: '乳糜管' },
    { en: 'Carries fatty acids and glycerol away — in the lymph, not the blood.', zh: '把脂肪酸和甘油运走——走的是淋巴，而不是血液。' },
  ],
])

export const EXERCISES: MatchExercise[] = [diet, organs, enzymes, villus]

/** Every item across every exercise — the lesson declares one hidden parameter for each. */
export const ALL_ITEMS: AssignmentItem[] = EXERCISES.flatMap((e) => e.items)

/** The largest number of partners any one exercise offers. */
export const MAX_TARGETS = Math.max(...EXERCISES.map((e) => e.targets.length))

/** Clamps `stage` to a real exercise, so a corner of the parameter space cannot fall off. */
export function exerciseAt(stage: number): MatchExercise {
  const i = Math.min(EXERCISES.length, Math.max(1, Math.round(stage))) - 1
  return EXERCISES[i] as MatchExercise
}

export const nutritionKernel: SimKernel<NutritionParams, SimResult> = (params) => {
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

export default nutritionKernel
