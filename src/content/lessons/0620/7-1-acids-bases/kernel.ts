/**
 * Acids, bases and the pH curve — kernel for lesson 0620/7-1-acids-bases.
 *
 * Titrates an acid with sodium hydroxide and plots pH against volume added. Strong and
 * weak acids of the *same concentration* are drawn together, which is the comparison the
 * syllabus asks for (0620.7.1.10–12): the weak acid starts at a higher pH, rises more
 * gently, and its equivalence point sits above pH 7 rather than at it.
 *
 * pH is computed from the chemistry at each stage rather than sketched, so the curve a
 * student reads is one they could derive.
 *
 * Covers 0620.7.1.1–12.
 */

import type { SimKernel, SimResult } from '@/content/types'

export interface TitrationParams extends Record<string, number> {
  /** Concentration of the acid in the flask, in mol / dm³ */
  acidConcentration: number
  /** Concentration of the sodium hydroxide in the burette, in mol / dm³ */
  alkaliConcentration: number
  /** Volume of acid in the flask, in cm³ */
  acidVolume: number
  /** Volume of alkali plotted, in cm³ */
  maxVolume: number
}

const SAMPLES = 181

/** Acid dissociation constant of ethanoic acid — the weak acid 0620 uses. */
export const KA_WEAK = 1.8e-5

/** Ionic product of water at 25 °C. */
const KW = 1.0e-14

const clampPh = (ph: number) => Math.min(14, Math.max(0, ph))

/**
 * pH of a strong monobasic acid being titrated with a strong alkali.
 *
 * A strong acid is fully dissociated, so [H⁺] is simply the concentration of acid that
 * has not yet been neutralised (0620.7.1.10).
 */
export function strongAcidPh(
  acidConc: number,
  alkaliConc: number,
  acidVol: number,
  addedVol: number
): number {
  const molAcid = (acidConc * acidVol) / 1000
  const molBase = (alkaliConc * addedVol) / 1000
  const totalVol = (acidVol + addedVol) / 1000

  if (totalVol <= 0) return 7

  const excessAcid = molAcid - molBase
  if (excessAcid > 1e-12) return clampPh(-Math.log10(excessAcid / totalVol))
  if (excessAcid < -1e-12) {
    const oh = -excessAcid / totalVol
    return clampPh(14 + Math.log10(oh))
  }
  // Exactly at the equivalence point: the salt is neutral, so pH is 7.
  return 7
}

/**
 * pH of a weak monobasic acid being titrated with a strong alkali.
 *
 * Three regimes, each with its own chemistry:
 * - before any alkali: only partial dissociation, so [H⁺] = √(Ka·C)
 * - part-way: a buffer of acid and its salt, given by Henderson–Hasselbalch
 * - at equivalence: the salt hydrolyses, leaving the solution alkaline (pH > 7)
 * - beyond: excess strong alkali dominates
 */
export function weakAcidPh(
  acidConc: number,
  alkaliConc: number,
  acidVol: number,
  addedVol: number
): number {
  const molAcid = (acidConc * acidVol) / 1000
  const molBase = (alkaliConc * addedVol) / 1000
  const totalVol = (acidVol + addedVol) / 1000

  if (totalVol <= 0 || acidConc <= 0) return 7

  if (molBase <= 1e-12) {
    // Partial dissociation only.
    return clampPh(-Math.log10(Math.sqrt(KA_WEAK * acidConc)))
  }

  const remainingAcid = molAcid - molBase

  if (remainingAcid > 1e-12) {
    // Buffer region: pH = pKa + log([salt] / [acid]).
    return clampPh(-Math.log10(KA_WEAK) + Math.log10(molBase / remainingAcid))
  }

  if (remainingAcid < -1e-12) {
    const oh = -remainingAcid / totalVol
    return clampPh(14 + Math.log10(oh))
  }

  // At equivalence the conjugate base hydrolyses: Kb = Kw / Ka.
  const saltConc = molAcid / totalVol
  const kb = KW / KA_WEAK
  const oh = Math.sqrt(kb * saltConc)
  return clampPh(14 + Math.log10(oh))
}

/** Volume of alkali needed to exactly neutralise the acid, in cm³. */
export function equivalenceVolume(
  acidConc: number,
  alkaliConc: number,
  acidVol: number
): number {
  if (alkaliConc <= 0) return 0
  return (acidConc * acidVol) / alkaliConc
}

export const titrationKernel: SimKernel<TitrationParams, SimResult> = ({
  acidConcentration,
  alkaliConcentration,
  acidVolume,
  maxVolume,
}) => {
  const strong: Array<[number, number]> = []
  const weak: Array<[number, number]> = []

  for (let i = 0; i < SAMPLES; i++) {
    const v = (i / (SAMPLES - 1)) * maxVolume
    strong.push([v, strongAcidPh(acidConcentration, alkaliConcentration, acidVolume, v)])
    weak.push([v, weakAcidPh(acidConcentration, alkaliConcentration, acidVolume, v)])
  }

  const equivalence = equivalenceVolume(acidConcentration, alkaliConcentration, acidVolume)

  return {
    series: [
      {
        key: 'strong',
        label: { en: 'Strong acid (HCl)', zh: '强酸（HCl）' },
        unit: { x: 'cm³ alkali added', y: 'pH' },
        // pH is bounded 0–14 by definition, so the axis should say so.
        yBounds: { min: 0, max: 14 },
        points: strong,
      },
      {
        key: 'weak',
        label: { en: 'Weak acid (CH₃COOH)', zh: '弱酸（CH₃COOH）' },
        unit: { x: 'cm³ alkali added', y: 'pH' },
        yBounds: { min: 0, max: 14 },
        points: weak,
      },
    ],
    readouts: {
      equivalenceVolume: equivalence,
      strongStartPh: strongAcidPh(acidConcentration, alkaliConcentration, acidVolume, 0),
      weakStartPh: weakAcidPh(acidConcentration, alkaliConcentration, acidVolume, 0),
      // At equivalence a strong acid gives exactly 7; a weak acid gives more, because
      // its conjugate base hydrolyses.
      weakEquivalencePh: weakAcidPh(
        acidConcentration,
        alkaliConcentration,
        acidVolume,
        equivalence
      ),
      pKa: -Math.log10(KA_WEAK),
    },
  }
}

export default titrationKernel
