/**
 * Classification — kernel for lesson 0610/1-1-classification.
 *
 * There is nothing to plot here, and that is the point. Classification is not a quantity
 * that varies with a slider; it is a decision the student makes about an organism, and the
 * only way to find out whether they can make it is to ask them to make it. So this kernel
 * returns an `assignment` instead of a series: organisms to be placed into groups, with the
 * defining features written on each group.
 *
 * Four exercises in sequence, selected by `stage`, because the syllabus asks for the same
 * skill at four levels of the hierarchy: kingdoms, then vertebrate classes, then arthropod
 * groups, then the plant groups. Running them as one lesson makes visible the thing that
 * separate exercises hide — that you are always doing the same thing, comparing an organism
 * against a list of features, only the list gets narrower as you go down.
 *
 * The awkward cases are chosen deliberately. A bat flies and a penguin swims, so neither can
 * be placed by what it does; a cyanobacterium photosynthesises but has no nucleus, so it is
 * not a plant. Every item that looks like it belongs somewhere else is there to force the
 * student back to the feature list.
 *
 * Covers 0610.1.3.1–7.
 */

import type { Bilingual, SimKernel, SimResult } from '@/content/types'
import {
  correctCount,
  placedCount,
  readAssignment,
  type AssignmentItem,
  type AssignmentTarget,
} from '@/lib/assignment'

export interface ClassificationParams extends Record<string, number> {
  /** Which of the four exercises is showing, 1-based. */
  stage: number
}

export interface ClassificationExercise {
  id: string
  title: Bilingual
  targets: AssignmentTarget[]
  items: AssignmentItem[]
}

// ---------------------------------------------------------------------------
// 1 — the five kingdoms (0610.1.3.4)
// ---------------------------------------------------------------------------

const kingdoms: ClassificationExercise = {
  id: 'kingdoms',
  title: { en: 'The five kingdoms', zh: '五界' },
  targets: [
    {
      id: 'animal',
      label: { en: 'Animal', zh: '动物界' },
      hint: {
        en: 'Many cells, no cell wall, no chloroplasts. Feeds on food made by other organisms.',
        zh: '多细胞，无细胞壁，无叶绿体。以其他生物制造的食物为食。',
      },
    },
    {
      id: 'plant',
      label: { en: 'Plant', zh: '植物界' },
      hint: {
        en: 'Many cells, cellulose cell walls, chloroplasts. Makes its own food by photosynthesis.',
        zh: '多细胞，纤维素细胞壁，有叶绿体。通过光合作用自己制造食物。',
      },
    },
    {
      id: 'fungus',
      label: { en: 'Fungus', zh: '真菌界' },
      hint: {
        en: 'Cell walls, but not of cellulose. No chloroplasts. Digests dead matter outside its body and absorbs it.',
        zh: '有细胞壁，但不是纤维素的。无叶绿体。在体外消化死亡的有机物再吸收。',
      },
    },
    {
      id: 'prokaryote',
      label: { en: 'Prokaryote', zh: '原核生物界' },
      hint: {
        en: 'One cell, and no nucleus — the DNA is a loop lying free in the cytoplasm.',
        zh: '单细胞，且无细胞核——DNA 是游离在细胞质中的环状分子。',
      },
    },
    {
      id: 'protoctist',
      label: { en: 'Protoctist', zh: '原生生物界' },
      hint: {
        en: 'Usually one cell, but it does have a nucleus. Some have chloroplasts, some do not.',
        zh: '通常是单细胞，但确实有细胞核。有些有叶绿体，有些没有。',
      },
    },
  ],
  items: [
    { id: 'k-mushroom', label: { en: 'Mushroom', zh: '蘑菇' }, target: 'fungus' },
    { id: 'k-cyano', label: { en: 'Cyanobacterium', zh: '蓝细菌' }, target: 'prokaryote' },
    { id: 'k-oak', label: { en: 'Oak tree', zh: '橡树' }, target: 'plant' },
    { id: 'k-earthworm', label: { en: 'Earthworm', zh: '蚯蚓' }, target: 'animal' },
    { id: 'k-yeast', label: { en: 'Yeast', zh: '酵母菌' }, target: 'fungus' },
    { id: 'k-amoeba', label: { en: 'Amoeba', zh: '变形虫' }, target: 'protoctist' },
    { id: 'k-housefly', label: { en: 'Housefly', zh: '家蝇' }, target: 'animal' },
    { id: 'k-ecoli', label: { en: 'Escherichia coli', zh: '大肠杆菌' }, target: 'prokaryote' },
    { id: 'k-moss', label: { en: 'Moss', zh: '苔藓' }, target: 'plant' },
    { id: 'k-plasmodium', label: { en: 'Plasmodium', zh: '疟原虫' }, target: 'protoctist' },
  ],
}

// ---------------------------------------------------------------------------
// 2 — vertebrate groups (0610.1.3.2)
// ---------------------------------------------------------------------------

const vertebrates: ClassificationExercise = {
  id: 'vertebrates',
  title: { en: 'Vertebrate groups', zh: '脊椎动物类群' },
  targets: [
    {
      id: 'mammal',
      label: { en: 'Mammal', zh: '哺乳类' },
      hint: {
        en: 'Hair. Young fed on milk from mammary glands. External ear flaps.',
        zh: '有毛发。幼体以乳腺分泌的乳汁为食。有外耳廓。',
      },
    },
    {
      id: 'bird',
      label: { en: 'Bird', zh: '鸟类' },
      hint: {
        en: 'Feathers. A beak with no teeth. Front limbs are wings. Hard-shelled eggs.',
        zh: '有羽毛。有喙无齿。前肢为翼。卵有硬壳。',
      },
    },
    {
      id: 'reptile',
      label: { en: 'Reptile', zh: '爬行类' },
      hint: {
        en: 'Dry skin covered in scales. Soft-shelled eggs laid on land.',
        zh: '皮肤干燥，覆有鳞片。在陆地上产软壳卵。',
      },
    },
    {
      id: 'amphibian',
      label: { en: 'Amphibian', zh: '两栖类' },
      hint: {
        en: 'Moist skin with no scales. Eggs laid in water with no shell; the young live in water.',
        zh: '皮肤湿润无鳞。在水中产无壳卵；幼体生活在水中。',
      },
    },
    {
      id: 'fish',
      label: { en: 'Fish', zh: '鱼类' },
      hint: {
        en: 'Wet scales. Gills. Fins.',
        zh: '湿润的鳞片。用鳃呼吸。有鳍。',
      },
    },
  ],
  items: [
    { id: 'v-shark', label: { en: 'Shark', zh: '鲨鱼' }, target: 'fish' },
    { id: 'v-crocodile', label: { en: 'Crocodile', zh: '鳄鱼' }, target: 'reptile' },
    { id: 'v-bat', label: { en: 'Bat', zh: '蝙蝠' }, target: 'mammal' },
    { id: 'v-penguin', label: { en: 'Penguin', zh: '企鹅' }, target: 'bird' },
    { id: 'v-newt', label: { en: 'Newt', zh: '蝾螈' }, target: 'amphibian' },
    { id: 'v-tortoise', label: { en: 'Tortoise', zh: '陆龟' }, target: 'reptile' },
    { id: 'v-dolphin', label: { en: 'Dolphin', zh: '海豚' }, target: 'mammal' },
    { id: 'v-frog', label: { en: 'Frog', zh: '青蛙' }, target: 'amphibian' },
  ],
}

// ---------------------------------------------------------------------------
// 3 — arthropod groups (0610.1.3.2)
// ---------------------------------------------------------------------------

const arthropods: ClassificationExercise = {
  id: 'arthropods',
  title: { en: 'Arthropod groups', zh: '节肢动物类群' },
  targets: [
    {
      id: 'insect',
      label: { en: 'Insect', zh: '昆虫纲' },
      hint: {
        en: 'Body in three parts. Three pairs of legs. One pair of antennae. Usually two pairs of wings.',
        zh: '身体分三部分。三对足。一对触角。通常有两对翅。',
      },
    },
    {
      id: 'arachnid',
      label: { en: 'Arachnid', zh: '蛛形纲' },
      hint: {
        en: 'Body in two parts. Four pairs of legs. No wings and no antennae.',
        zh: '身体分两部分。四对足。无翅、无触角。',
      },
    },
    {
      id: 'crustacean',
      label: { en: 'Crustacean', zh: '甲壳纲' },
      hint: {
        en: 'Two pairs of antennae. More than four pairs of legs. A chalky exoskeleton. Gills.',
        zh: '两对触角。四对以上的足。石灰质外骨骼。用鳃呼吸。',
      },
    },
    {
      id: 'myriapod',
      label: { en: 'Myriapod', zh: '多足类' },
      hint: {
        en: 'A long body of many similar segments, each carrying legs. One pair of antennae.',
        zh: '身体长，由许多相似的体节组成，每节都有足。一对触角。',
      },
    },
  ],
  items: [
    { id: 'a-woodlouse', label: { en: 'Woodlouse', zh: '鼠妇' }, target: 'crustacean' },
    { id: 'a-butterfly', label: { en: 'Butterfly', zh: '蝴蝶' }, target: 'insect' },
    { id: 'a-millipede', label: { en: 'Millipede', zh: '马陆' }, target: 'myriapod' },
    { id: 'a-scorpion', label: { en: 'Scorpion', zh: '蝎子' }, target: 'arachnid' },
    { id: 'a-crab', label: { en: 'Crab', zh: '螃蟹' }, target: 'crustacean' },
    { id: 'a-ant', label: { en: 'Ant', zh: '蚂蚁' }, target: 'insect' },
    { id: 'a-centipede', label: { en: 'Centipede', zh: '蜈蚣' }, target: 'myriapod' },
    { id: 'a-spider', label: { en: 'Spider', zh: '蜘蛛' }, target: 'arachnid' },
  ],
}

// ---------------------------------------------------------------------------
// 4 — plant groups (0610.1.3.5)
// ---------------------------------------------------------------------------

const plants: ClassificationExercise = {
  id: 'plants',
  title: { en: 'Plant groups', zh: '植物类群' },
  targets: [
    {
      id: 'fern',
      label: { en: 'Fern', zh: '蕨类' },
      hint: {
        en: 'Leaves called fronds. Reproduces by spores, not seeds. No flowers.',
        zh: '叶称为羽叶。以孢子繁殖，而非种子。无花。',
      },
    },
    {
      id: 'monocot',
      label: { en: 'Monocotyledon', zh: '单子叶植物' },
      hint: {
        en: 'A flowering plant. Seed with one cotyledon. Long narrow leaves with parallel veins.',
        zh: '开花植物。种子有一片子叶。叶细长，叶脉平行。',
      },
    },
    {
      id: 'dicot',
      label: { en: 'Dicotyledon', zh: '双子叶植物' },
      hint: {
        en: 'A flowering plant. Seed with two cotyledons. Broad leaves with a branching network of veins.',
        zh: '开花植物。种子有两片子叶。叶宽阔，叶脉呈网状分支。',
      },
    },
  ],
  items: [
    { id: 'p-maize', label: { en: 'Maize', zh: '玉米' }, target: 'monocot' },
    { id: 'p-sunflower', label: { en: 'Sunflower', zh: '向日葵' }, target: 'dicot' },
    { id: 'p-bracken', label: { en: 'Bracken', zh: '欧洲蕨' }, target: 'fern' },
    { id: 'p-bean', label: { en: 'Bean plant', zh: '菜豆' }, target: 'dicot' },
    { id: 'p-treefern', label: { en: 'Tree fern', zh: '树蕨' }, target: 'fern' },
    { id: 'p-wheat', label: { en: 'Wheat', zh: '小麦' }, target: 'monocot' },
  ],
}

export const EXERCISES: ClassificationExercise[] = [kingdoms, vertebrates, arthropods, plants]

/** Every item across every exercise — the lesson declares one hidden parameter for each. */
export const ALL_ITEMS: AssignmentItem[] = EXERCISES.flatMap((e) => e.items)

/** The largest number of groups any one exercise offers. */
export const MAX_TARGETS = Math.max(...EXERCISES.map((e) => e.targets.length))

/** Clamps `stage` to a real exercise, so a corner of the parameter space cannot fall off. */
export function exerciseAt(stage: number): ClassificationExercise {
  const i = Math.min(EXERCISES.length, Math.max(1, Math.round(stage))) - 1
  return EXERCISES[i] as ClassificationExercise
}

export const classificationKernel: SimKernel<ClassificationParams, SimResult> = (params) => {
  const exercise = exerciseAt(params['stage'] ?? 1)
  const assignment = readAssignment(exercise.items, exercise.targets, params)

  return {
    // Nothing to plot: the exercise itself is the visualisation.
    series: [],
    assignment,
    readouts: {
      correct: correctCount(assignment),
      placed: placedCount(assignment),
      total: exercise.items.length,
    },
  }
}

export default classificationKernel
