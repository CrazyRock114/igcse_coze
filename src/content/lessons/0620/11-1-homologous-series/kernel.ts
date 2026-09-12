/**
 * Homologous series — kernel for lesson 0620/11-1-homologous-series.
 *
 * Builds the displayed formula of an unbranched organic molecule from two choices: how
 * many carbon atoms, and which functional group sits on the end of the chain. Both
 * choices are the whole of 11.1 and 11.2 — a homologous series is what you get by holding
 * the functional group and varying the chain, and a functional group is what you get by
 * holding the chain and varying the group.
 *
 * The molecule is built by valence bookkeeping, not from a table of structures: each
 * carbon takes four bonds, the chain and the functional group claim theirs, and hydrogen
 * fills whatever is left. So the drawing is right for the same reason a student's drawing
 * would be right, and the molecular formula is then counted off the atoms drawn.
 *
 * Covers 0620.11.1.1–6 and 11.2.1–2.
 */

import type { Bilingual, SimKernel, SimResult } from '@/content/types'
import { relativeMolecularMass } from '@/lib/molecularFormula'
import { buildStructure, minimumCarbons } from '@/lib/organic'

export interface MoleculeParams extends Record<string, number> {
  /** Carbon atoms in the chain, 1–4 */
  carbons: number
  /** Index into FAMILIES */
  family: number
}

export interface Family {
  key: string
  label: Bilingual
  /** General formula as the syllabus prints it. */
  generalFormula: string
  functionalGroup: Bilingual
  /** Names for 1, 2, 3 and 4 carbon atoms; `null` where no such member exists. */
  names: Array<Bilingual | null>
  /** Measured boiling points in °C, indexed as `names`. Real data, not a formula. */
  boilingPoints: Array<number | null>
}

/**
 * The four series 0620 names. Note the two conventions in the general formulae: the n in
 * an alcohol's CₙH₂ₙ₊₁OH counts every carbon, but the n in a carboxylic acid's
 * CₙH₂ₙ₊₁COOH counts only the carbons *before* the –COOH group. Both are the syllabus's
 * own forms, so both are shown as printed rather than silently regularised.
 */
export const FAMILIES: Family[] = [
  {
    key: 'alkane',
    label: { en: 'Alkane', zh: '烷烃' },
    generalFormula: 'CₙH₂ₙ₊₂',
    functionalGroup: { en: 'no functional group — single bonds only', zh: '无官能团——只有单键' },
    names: [
      { en: 'methane', zh: '甲烷' },
      { en: 'ethane', zh: '乙烷' },
      { en: 'propane', zh: '丙烷' },
      { en: 'butane', zh: '丁烷' },
    ],
    boilingPoints: [-162, -89, -42, 0],
  },
  {
    key: 'alkene',
    label: { en: 'Alkene', zh: '烯烃' },
    generalFormula: 'CₙH₂ₙ',
    functionalGroup: { en: 'C=C double bond', zh: 'C=C 双键' },
    // There is no alkene with one carbon: a C=C needs two carbons to exist.
    names: [
      null,
      { en: 'ethene', zh: '乙烯' },
      { en: 'propene', zh: '丙烯' },
      { en: 'but-1-ene', zh: '丁-1-烯' },
    ],
    boilingPoints: [null, -104, -47, -6],
  },
  {
    key: 'alcohol',
    label: { en: 'Alcohol', zh: '醇' },
    generalFormula: 'CₙH₂ₙ₊₁OH',
    functionalGroup: { en: '–OH hydroxyl group', zh: '–OH 羟基' },
    names: [
      { en: 'methanol', zh: '甲醇' },
      { en: 'ethanol', zh: '乙醇' },
      { en: 'propan-1-ol', zh: '丙-1-醇' },
      { en: 'butan-1-ol', zh: '丁-1-醇' },
    ],
    boilingPoints: [65, 78, 97, 118],
  },
  {
    key: 'acid',
    label: { en: 'Carboxylic acid', zh: '羧酸' },
    generalFormula: 'CₙH₂ₙ₊₁COOH',
    functionalGroup: { en: '–COOH carboxyl group', zh: '–COOH 羧基' },
    names: [
      { en: 'methanoic acid', zh: '甲酸' },
      { en: 'ethanoic acid', zh: '乙酸' },
      { en: 'propanoic acid', zh: '丙酸' },
      { en: 'butanoic acid', zh: '丁酸' },
    ],
    boilingPoints: [101, 118, 141, 164],
  },
]

/**
 * Both axes are pinned, for two different reasons.
 *
 * x: carbon atoms are counted, so the gridlines have to land on whole numbers — 0 to 4
 * in five divisions does; an auto-scaled 0 to 5 would tick at 1.25 and 3.75.
 *
 * y: −200 to 200 covers all four series with room to spare, and holding it still is the
 * point. Switching from ethane to ethanol has to *look* like a jump of 167 °C, which it
 * would not if the axis rescaled to fit whichever family is showing.
 */
const AXES = {
  xBounds: { min: 0, max: 4 },
  yBounds: { min: -200, max: 200 },
} as const

export const moleculeKernel: SimKernel<MoleculeParams, SimResult> = ({ carbons, family }) => {
  const chosen = FAMILIES[Math.min(FAMILIES.length - 1, Math.max(0, Math.round(family)))]!
  const n = Math.min(4, Math.max(minimumCarbons(chosen.key), Math.round(carbons)))

  const { bodies, links } = buildStructure(chosen.key, n)
  const hydrogens = bodies.filter((b) => b.kind === 'H').length
  const boilingPoint = chosen.boilingPoints[n - 1] ?? 0

  // Where to hang the annotations, clear of the drawing.
  const centre = (n - 1) / 2
  const top = chosen.key === 'acid' ? 2.1 : 1.9

  const series = [
    {
      key: chosen.key,
      label: { en: `${chosen.label.en} boiling points`, zh: `${chosen.label.zh ?? ''}沸点` },
      unit: { x: 'carbon atoms', y: '°C' },
      points: trend(chosen),
      ...AXES,
    },
  ]
  // The alkanes stay on the graph as a baseline: same chain, no functional group. It is
  // the gap between the curves that shows what adding the group does.
  if (chosen.key !== 'alkane') {
    series.push({
      key: 'reference',
      label: { en: 'Alkanes for comparison', zh: '烷烃对照' },
      unit: { x: 'carbon atoms', y: '°C' },
      points: trend(FAMILIES[0]!),
      ...AXES,
    })
  }

  return {
    series,
    bodies,
    links,
    markers: [
      // [0] is the compound name, shown bilingually in the caption rather than drawn.
      { x: centre, y: 0, label: chosen.names[n - 1] ?? { en: '' } },
      { x: centre, y: -top, label: { en: `General formula ${chosen.generalFormula}` } },
      { x: centre, y: top, label: chosen.functionalGroup },
    ],
    readouts: {
      carbons: n,
      hydrogens,
      relativeMolecularMass: relativeMolecularMass(bodies),
      boilingPoint,
    },
  }
}

/** The family's measured boiling points as plottable points, skipping members that do not exist. */
function trend(family: Family): Array<[number, number]> {
  const points: Array<[number, number]> = []
  family.boilingPoints.forEach((bp, i) => {
    if (bp !== null) points.push([i + 1, bp])
  })
  return points
}

export default moleculeKernel
