/**
 * Excretion — kernel for lesson 0610/13-1-excretion.
 *
 * What happens to four substances as they pass along a nephron. The kidney is usually taught
 * as a filter, and a filter is exactly the wrong picture: a filter separates once and keeps
 * what it caught. A nephron filters almost everything out of the blood and then takes most
 * of it back, deciding substance by substance what to keep.
 *
 * Following four substances along the same tubule makes that visible. Glucose is filtered
 * out completely and reabsorbed completely — it appears in the filtrate and never in the
 * urine. Urea is filtered out and barely reabsorbed. Water is reabsorbed by a variable
 * amount, which is how the body adjusts. And protein is never filtered out at all, because
 * its molecules are too large to pass through — so if it turns up in urine, something is
 * damaged.
 *
 * Covers 0610.13.1.5 and 13.1.9.
 */

import type { Bilingual, SimKernel, SimResult, SimSeries } from '@/content/types'

export interface ExcretionParams extends Record<string, number> {
  /** How much water the person has drunk, as a percentage of a normal day's intake. */
  water: number
  /** Protein in the diet, as a percentage of normal. More protein means more urea. */
  protein: number
  /**
   * Whether the glomerulus is damaged, 0 to 100. Damage lets large molecules through
   * that should never be filtered at all.
   */
  damage: number
}

/**
 * The three stages, as a position along the nephron.
 *
 * 0 is blood arriving in the glomerulus, 1 is the filtrate in the capsule, 2 is after
 * reabsorption in the tubule, 3 is the urine leaving.
 */
export const STAGES = 4

/** Blood concentrations, in arbitrary units. */
const IN_BLOOD = { glucose: 100, urea: 30, water: 100, protein: 80 }

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))

/**
 * How much of each substance is present at each stage.
 *
 * Filtration is by size alone: small molecules go through whatever they are, large ones do
 * not. Reabsorption is selective, and that is where the deciding happens.
 */
export function alongNephron(p: ExcretionParams): Record<string, number[]> {
  const water = clamp(p.water, 0, 200) / 100
  const protein = clamp(p.protein, 0, 200) / 100
  const damage = clamp(p.damage, 0, 100) / 100

  // More dietary protein means more amino acids deaminated in the liver, so more urea.
  const ureaLoad = IN_BLOOD.urea * (0.4 + 0.6 * protein)

  // Drink more and less water is reabsorbed, so more leaves as urine. Drink less and
  // almost all of it is taken back.
  const waterKept = clamp(0.99 - 0.06 * water, 0.86, 0.995)

  return {
    // Filtered completely, then reabsorbed completely. Never in normal urine.
    glucose: [IN_BLOOD.glucose, IN_BLOOD.glucose, IN_BLOOD.glucose * 0.02, 0],
    // Filtered, and almost none taken back — this is what the kidney is for.
    urea: [ureaLoad, ureaLoad, ureaLoad * 0.95, ureaLoad * 0.95],
    // Filtered, and most taken back. How much is the adjustable part.
    water: [
      IN_BLOOD.water,
      IN_BLOOD.water,
      IN_BLOOD.water * (1 - waterKept) * 3,
      IN_BLOOD.water * (1 - waterKept) * 3,
    ],
    // Too large to be filtered at all — unless the glomerulus is damaged.
    protein: [
      IN_BLOOD.protein,
      IN_BLOOD.protein * damage * 0.5,
      IN_BLOOD.protein * damage * 0.5,
      IN_BLOOD.protein * damage * 0.5,
    ],
  }
}

const STAGE_LABEL = ['blood in', 'filtrate', 'tubule', 'urine']

const round = (v: number) => Math.round(v * 10) / 10

export const excretionKernel: SimKernel<ExcretionParams, SimResult> = (params) => {
  const p: ExcretionParams = {
    water: clamp(params['water'] ?? 100, 0, 200),
    protein: clamp(params['protein'] ?? 100, 0, 200),
    damage: clamp(params['damage'] ?? 0, 0, 100),
  }

  const levels = alongNephron(p)

  const line = (key: string, label: Bilingual): SimSeries => ({
    key,
    label,
    unit: { x: 'stage along the nephron', y: 'amount / arbitrary units' },
    points: (levels[key] ?? []).map((v, i) => [i, round(v)] as [number, number]),
    xBounds: { min: 0, max: STAGES - 1 },
    // One scale for all four, because the lesson is a comparison between them.
    yBounds: { min: 0, max: 120 },
  })

  const series: SimSeries[] = [
    line('glucose', { en: 'Glucose', zh: '葡萄糖' }),
    line('urea', { en: 'Urea', zh: '尿素' }),
    line('water', { en: 'Water', zh: '水' }),
    line('protein', { en: 'Protein', zh: '蛋白质' }),
  ]

  const urine = (key: string) => round((levels[key] ?? [])[STAGES - 1] ?? 0)

  return {
    series,
    readouts: {
      urineWater: urine('water'),
      urineUrea: urine('urea'),
      urineGlucose: urine('glucose'),
      urineProtein: urine('protein'),
    },
    markers: [
      {
        x: 0,
        y: 0,
        label:
          p.damage > 10
            ? {
                en: 'Protein in the urine — the glomerulus is damaged, because protein molecules should be too large to be filtered at all',
                zh: '尿中出现蛋白质——肾小球受损，因为蛋白质分子本应大到根本无法被滤过',
              }
            : p.water > 140
              ? {
                  en: 'Plenty of water drunk — less is reabsorbed, so the urine is dilute and there is more of it',
                  zh: '饮水充足——重吸收减少，因此尿液稀释且量多',
                }
              : p.water < 60
                ? {
                    en: 'Little water drunk — almost all of it is reabsorbed, so the urine is scant and concentrated',
                    zh: '饮水很少——几乎全部被重吸收，因此尿量少而浓',
                  }
                : {
                    en: 'Glucose filtered out and entirely reabsorbed; urea filtered out and kept out',
                    zh: '葡萄糖被滤出后全部重吸收；尿素被滤出后不再回收',
                  },
      },
    ],
    bounds: { xMin: 0, xMax: STAGES - 1, yMin: 0, yMax: 120 },
  }
}

export { STAGE_LABEL }
export default excretionKernel
