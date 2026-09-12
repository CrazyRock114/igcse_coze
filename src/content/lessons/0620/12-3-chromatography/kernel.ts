/**
 * Chromatography and separation — kernel for lesson 0620/12-3-chromatography.
 *
 * A developed chromatogram: an unknown mixture beside four reference substances, with the
 * distance the solvent front travelled under the student's control.
 *
 * The point of the interaction is what happens when the plate is run for longer. Every spot
 * moves further up the paper, so every measured distance changes — and every Rf stays exactly
 * where it was. That is the whole reason Rf exists rather than quoting distances: it is a
 * property of the substance in that solvent, and it survives a change in how long the
 * experiment was left running. Reading it off a static diagram never makes that point.
 *
 * The unknown is matched to the references by Rf, which is how a chromatogram is actually
 * interpreted — a spot at the same height as a reference is that substance.
 *
 * Covers 0620.12.3.1–4.
 */

import type { Bilingual, SimChromatogram, SimKernel, SimResult } from '@/content/types'

export interface ChromatographyParams extends Record<string, number> {
  /** How far the solvent front travelled from the baseline, in cm. */
  solventDistance: number
  /** Which mixture is in the unknown lane. */
  mixture: number
  /** Which reference substance to report the Rf of. */
  selected: number
}

export interface Reference {
  /** Short label drawn on the paper. */
  code: string
  name: Bilingual
  /** Retention factor in this solvent — a property of the substance, not of the run. */
  rf: number
}

export const REFERENCES: Reference[] = [
  { code: 'A', name: { en: 'dye A', zh: '染料 A' }, rf: 0.2 },
  { code: 'B', name: { en: 'dye B', zh: '染料 B' }, rf: 0.45 },
  { code: 'C', name: { en: 'dye C', zh: '染料 C' }, rf: 0.68 },
  { code: 'D', name: { en: 'dye D', zh: '染料 D' }, rf: 0.85 },
]

/** Which references are present in each of the mixtures on offer. */
export const MIXTURES: number[][] = [
  [0, 2],
  [1, 3],
  [0, 1, 2],
  [2],
]

/** Rf = distance moved by the spot ÷ distance moved by the solvent. */
export function retentionFactor(spotDistance: number, solventDistance: number): number {
  if (solventDistance <= 0) return 0
  return spotDistance / solventDistance
}

/** How far a substance with a given Rf moves when the solvent runs a given distance. */
export function spotDistance(rf: number, solventDistance: number): number {
  return rf * solventDistance
}

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))
const round = (v: number, dp = 2) => {
  const f = 10 ** dp
  return Math.round(v * f) / f
}

export const chromatographyKernel: SimKernel<ChromatographyParams, SimResult> = (params) => {
  const solventDistance = clamp(params['solventDistance'] ?? 8, 4, 14)
  const mixtureIndex = clamp(Math.round(params['mixture'] ?? 0), 0, MIXTURES.length - 1)
  const selected = clamp(Math.round(params['selected'] ?? 0), 0, REFERENCES.length - 1)

  const present = MIXTURES[mixtureIndex]!
  const chosen = REFERENCES[selected]!

  const chromatogram: SimChromatogram = {
    solventDistance: round(solventDistance, 1),
    lanes: [
      {
        label: { en: 'unknown', zh: '未知样品' },
        spots: present.map((i) => {
          const ref = REFERENCES[i]!
          return {
            label: ref.code,
            distance: round(spotDistance(ref.rf, solventDistance)),
            rf: ref.rf,
            highlighted: i === selected,
          }
        }),
      },
      ...REFERENCES.map((ref, i) => ({
        label: { en: ref.code, zh: ref.code },
        spots: [
          {
            label: ref.code,
            distance: round(spotDistance(ref.rf, solventDistance)),
            rf: ref.rf,
            highlighted: i === selected,
          },
        ],
      })),
    ],
  }

  const inMixture = present.includes(selected)
  const distance = spotDistance(chosen.rf, solventDistance)

  const note: Bilingual = {
    en: `${chosen.name.en} moved ${round(distance)} cm while the solvent moved ${round(solventDistance, 1)} cm, so its Rf is ${round(distance, 3)} ÷ ${round(solventDistance, 1)} = ${chosen.rf}. ${
      inMixture
        ? `There is a spot at the same height in the unknown, so ${chosen.name.en} is present in the mixture.`
        : `Nothing in the unknown sits at that height, so ${chosen.name.en} is not present.`
    } Run the plate for longer and both distances grow together — the Rf does not change, which is why it is worth quoting at all`,
    zh: `${chosen.name.zh ?? chosen.name.en}移动了 ${round(distance)} cm，而溶剂移动了 ${round(solventDistance, 1)} cm，因此 Rf = ${round(distance, 3)} ÷ ${round(solventDistance, 1)} = ${chosen.rf}。${
      inMixture
        ? `未知样品中在相同高度有一个斑点，所以混合物中含有该物质。`
        : `未知样品中该高度上没有斑点，所以混合物中不含该物质。`
    }把层析跑得更久，两个距离会同步增大——而 Rf 不变，这正是它值得被引用的原因`,
  }

  return {
    series: [],
    chromatogram,
    readouts: {
      rf: chosen.rf,
      spotDistance: round(distance),
      solventDistance: round(solventDistance, 1),
      spotsInMixture: present.length,
    },
    markers: [{ x: 0, y: 0, label: note }],
  }
}

export default chromatographyKernel
