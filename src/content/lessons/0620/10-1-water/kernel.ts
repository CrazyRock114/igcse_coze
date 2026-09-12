/**
 * Water treatment — kernel for lesson 0620/10-1-water.
 *
 * Treating water is a sequence, and each stage in it has exactly one job. Rather than
 * listing the stages, this tracks what is still in the water as it passes through them:
 * five contaminants going in, one removed at each stage.
 *
 * The number that matters is the one at the end of the domestic process. After
 * chlorination the water is fit to drink and there is still something in it — the
 * dissolved salts, which no stage of a public supply removes. That is the whole answer to
 * why practical chemistry uses distilled water and not tap water, and it is a count rather
 * than an assertion.
 *
 * Covers 0620.10.1.1–7 and 10.2.1–2.
 */

import type { Bilingual, SimBody, SimKernel, SimResult } from '@/content/types'

export interface WaterParams extends Record<string, number> {
  /** How many treatment stages have been carried out, 0 to 5 */
  stage: number
}

export interface Stage {
  key: string
  name: Bilingual
  /** The one contaminant this stage takes out. */
  removes: Bilingual
  how: Bilingual
  /** False for distillation, which no public water supply carries out. */
  inDomesticSupply: boolean
}

export const STAGES: Stage[] = [
  {
    key: 'screening',
    name: { en: 'Screening', zh: '格栅过滤' },
    removes: { en: 'large debris', zh: '大块杂物' },
    how: {
      en: 'Metal grids catch sticks, leaves and litter before anything else can be damaged by them.',
      zh: '金属格栅拦住树枝、树叶和垃圾，以免后续设备被损坏。',
    },
    inDomesticSupply: true,
  },
  {
    key: 'sedimentation',
    name: { en: 'Sedimentation', zh: '沉降' },
    removes: { en: 'heavy suspended solids', zh: '较重的悬浮固体' },
    how: {
      en: 'The water is left still in large tanks so that sand and grit sink to the bottom under gravity.',
      zh: '水在大池中静置，沙粒和砂砾在重力作用下沉到池底。',
    },
    inDomesticSupply: true,
  },
  {
    key: 'filtration',
    name: { en: 'Filtration', zh: '过滤' },
    removes: { en: 'fine suspended solids', zh: '细小悬浮固体' },
    how: {
      en: 'The water passes down through beds of sand and gravel, which trap the fine particles the tanks could not settle.',
      zh: '水向下流过砂石滤层，滤层截留沉降池无法除去的细小颗粒。',
    },
    inDomesticSupply: true,
  },
  {
    key: 'chlorination',
    name: { en: 'Chlorination', zh: '氯消毒' },
    removes: { en: 'bacteria', zh: '细菌' },
    how: {
      en: 'Chlorine is added to kill bacteria and other microorganisms. This is the stage that makes the water safe to drink.',
      zh: '加入氯以杀灭细菌和其他微生物。正是这一步使水可以安全饮用。',
    },
    inDomesticSupply: true,
  },
  {
    key: 'distillation',
    name: { en: 'Distillation', zh: '蒸馏' },
    removes: { en: 'dissolved salts', zh: '溶解的盐类' },
    how: {
      en: 'Boiling the water and condensing the steam leaves the dissolved salts behind. No public water supply does this — it is how distilled water for the laboratory is made.',
      zh: '把水煮沸再把蒸汽冷凝，溶解的盐类被留下。公共供水系统不做这一步——实验室用的蒸馏水就是这样制得的。',
    },
    inDomesticSupply: false,
  },
]

/** Contaminants in untreated river water, in the order the stages remove them. */
export const CONTAMINANTS = STAGES.map((s) => s.removes)

/** The last stage a public water supply carries out. */
export const DOMESTIC_STAGES = STAGES.filter((s) => s.inDomesticSupply).length

/** Stage number, counting from one, at which the bacteria are killed. */
const CHLORINATION = STAGES.findIndex((s) => s.key === 'chlorination') + 1

/**
 * Water is safe to drink once the bacteria are gone.
 *
 * Which is not the same as pure, and the gap between the two is the point: this turns true
 * while a contaminant is still in the water.
 */
export function fitToDrink(stagesDone: number): boolean {
  return stagesDone >= CHLORINATION
}

export const waterKernel: SimKernel<WaterParams, SimResult> = ({ stage }) => {
  const done = Math.min(STAGES.length, Math.max(0, Math.round(stage)))

  const bodies: SimBody[] = STAGES.map((s, i) => ({
    x: 0,
    y: -i,
    kind: i + 1 < done ? 'done' : i + 1 === done ? 'selected' : 'rung',
    label: `${i + 1}|${s.name.en}|removes ${s.removes.en}`,
  }))

  // Everything below this line is laboratory work, not public water treatment.
  bodies.push({
    x: 0,
    y: -(DOMESTIC_STAGES - 0.5),
    kind: 'threshold',
    label: 'a public water supply stops here',
  })

  const remaining = STAGES.length - done
  const current = done > 0 ? STAGES[done - 1]! : undefined

  const headline: Bilingual = current
    ? {
        en: `After ${current.name.en.toLowerCase()}: ${remaining} contaminant${remaining === 1 ? '' : 's'} left`,
        zh: `${current.name.zh ?? ''}之后：还剩 ${remaining} 种杂质`,
      }
    : {
        en: `Untreated river water: ${remaining} contaminants`,
        zh: `未处理的河水：${remaining} 种杂质`,
      }

  const note: Bilingual = current
    ? {
        en:
          done === DOMESTIC_STAGES
            ? `${current.how.en} The water is now fit to drink — but the dissolved salts are still there, which is why practical chemistry uses distilled water and not tap water.`
            : current.how.en,
        zh:
          done === DOMESTIC_STAGES
            ? `${current.how.zh ?? ''} 现在水已可以饮用——但溶解的盐仍在其中，这就是实验化学使用蒸馏水而不是自来水的原因。`
            : (current.how.zh ?? ''),
      }
    : {
        en: 'Natural water carries large debris, suspended solids, bacteria and dissolved salts. Some of what is dissolved is beneficial, some is harmful, and treatment does not distinguish between them.',
        zh: '天然水中含有大块杂物、悬浮固体、细菌和溶解的盐类。溶解物中有的有益、有的有害，而处理过程并不区分它们。',
      }

  return {
    series: [],
    bodies,
    markers: [
      { x: 0, y: 0, label: { en: 'Treating a water supply', zh: '水的净化处理' } },
      { x: 0, y: 0, label: headline },
      { x: 0, y: 0, label: note },
    ],
    readouts: {
      stagesDone: done,
      contaminantsRemaining: remaining,
      contaminantsRemoved: done,
      fitToDrink: fitToDrink(done) ? 1 : 0,
    },
  }
}

export default waterKernel
