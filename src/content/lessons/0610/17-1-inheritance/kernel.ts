/**
 * Monohybrid inheritance — kernel for lesson 0610/17-1-inheritance.
 *
 * Three crosses the syllabus treats as separate topics, run through one piece of code,
 * because they are the same operation and only the labels differ. A dominant/recessive
 * cross, a codominant one and a sex-linked one all come down to: split each parent into
 * two alleles, pair every one with every other, count the outcomes.
 *
 * Both parents are chosen the same way in all three — how many copies of the allele of
 * interest they carry, none, one or two — so the control means the same thing whichever
 * cross is showing, and moving between them shows that only the phenotype rules changed.
 *
 * The sex-linked cross has a wrinkle that is worth more than any amount of prose: a father
 * has one X, so "one copy" makes him affected and "two copies" is not a thing he can be.
 * A student who has been told a man cannot be a carrier tends to forget it. A student who
 * has tried to make one and been told why does not.
 *
 * Covers 0610.17.1.4 and 17.4.11–18.
 */

import type { Bilingual, SimKernel, SimResult } from '@/content/types'
import {
  chanceOf,
  chanceOfGenotypes,
  punnett,
  ratio,
  type CrossSpec,
  type Genotype,
} from '@/lib/genetics'

export interface InheritanceParams extends Record<string, number> {
  /** Which cross is showing, 1-based. */
  cross: number
  /** Copies of the allele of interest carried by the father: 0, 1 or 2. */
  father: number
  /** Copies carried by the mother: 0, 1 or 2. */
  mother: number
}

interface Scenario {
  id: string
  title: Bilingual
  /** Genotype for a father carrying 0, 1 or 2 copies. */
  fatherByCopies: [Genotype, Genotype, Genotype]
  motherByCopies: [Genotype, Genotype, Genotype]
  phenotypes: CrossSpec['phenotypes']
  phenotypeOf: Record<Genotype, string>
  /** Phenotype ids, for the readouts. */
  unaffected: string
  affected: string
  /** Genotypes that carry one copy without showing the trait. */
  carrierGenotypes: Genotype[]
  /** Shown when the father cannot be what the slider is asking for. */
  fatherNote?: Bilingual
}

// ---------------------------------------------------------------------------
// 1 — a plain dominant/recessive cross (0610.17.4.11–13)
// ---------------------------------------------------------------------------

const flowers: Scenario = {
  id: 'flowers',
  title: { en: 'Flower colour', zh: '花色' },
  fatherByCopies: ['RR', 'Rr', 'rr'],
  motherByCopies: ['RR', 'Rr', 'rr'],
  phenotypes: [
    { id: 'red', label: { en: 'Red flowers', zh: '红花' } },
    { id: 'white', label: { en: 'White flowers', zh: '白花' } },
  ],
  phenotypeOf: { RR: 'red', Rr: 'red', rr: 'white' },
  unaffected: 'red',
  affected: 'white',
  // A red flower may be RR or Rr and nothing about it says which — which is the whole
  // reason a test cross exists.
  carrierGenotypes: ['Rr'],
}

// ---------------------------------------------------------------------------
// 2 — codominance (0610.17.4.14)
// ---------------------------------------------------------------------------

const sickle: Scenario = {
  id: 'sickle',
  title: { en: 'Sickle cell', zh: '镰状细胞' },
  fatherByCopies: ['NN', 'NS', 'SS'],
  motherByCopies: ['NN', 'NS', 'SS'],
  phenotypes: [
    { id: 'normal', label: { en: 'Unaffected', zh: '未受影响' } },
    { id: 'trait', label: { en: 'Sickle cell trait', zh: '镰状细胞性状' } },
    { id: 'anaemia', label: { en: 'Sickle cell anaemia', zh: '镰状细胞贫血' } },
  ],
  phenotypeOf: { NN: 'normal', NS: 'trait', SS: 'anaemia' },
  unaffected: 'normal',
  affected: 'anaemia',
  carrierGenotypes: ['NS'],
}

// ---------------------------------------------------------------------------
// 3 — sex linkage (0610.17.1.4, 17.4.16–18)
// ---------------------------------------------------------------------------

const colourBlindness: Scenario = {
  id: 'colour',
  title: { en: 'Red–green colour blindness', zh: '红绿色盲' },
  // A father has one X. One copy already makes him colour blind, and two is not a state
  // he can be in — so both settings give the same genotype, and the note says why.
  fatherByCopies: ['XY', 'xY', 'xY'],
  motherByCopies: ['XX', 'Xx', 'xx'],
  phenotypes: [
    { id: 'unaffected', label: { en: 'Normal vision', zh: '色觉正常' } },
    { id: 'carrier', label: { en: 'Carrier daughter', zh: '携带者（女儿）' } },
    { id: 'affected', label: { en: 'Colour blind', zh: '色盲' } },
  ],
  phenotypeOf: {
    XX: 'unaffected',
    Xx: 'carrier',
    xx: 'affected',
    XY: 'unaffected',
    xY: 'affected',
  },
  unaffected: 'unaffected',
  affected: 'affected',
  // XY is two different symbols but is not a carrier: he is simply an unaffected male.
  carrierGenotypes: ['Xx'],
  fatherNote: {
    en: 'A father has only one X chromosome, so he cannot carry two copies — one is enough to make him colour blind.',
    zh: '父亲只有一条 X 染色体，因此不可能携带两个拷贝——一个就足以使他色盲。',
  },
}

export const SCENARIOS: Scenario[] = [flowers, sickle, colourBlindness]

/** Clamps `cross` to a real scenario, so a corner of the parameter space cannot fall off. */
export function scenarioAt(cross: number): Scenario {
  const i = Math.min(SCENARIOS.length, Math.max(1, Math.round(cross))) - 1
  return SCENARIOS[i] as Scenario
}

const copies = (n: number) => Math.min(2, Math.max(0, Math.round(n))) as 0 | 1 | 2

export const inheritanceKernel: SimKernel<InheritanceParams, SimResult> = (params) => {
  const scenario = scenarioAt(params['cross'] ?? 1)
  const f = copies(params['father'] ?? 1)
  const m = copies(params['mother'] ?? 1)

  const father = scenario.fatherByCopies[f]
  const mother = scenario.motherByCopies[m]

  const grid = punnett({
    father,
    mother,
    fatherLabel: { en: `Father ${father}`, zh: `父本 ${father}` },
    motherLabel: { en: `Mother ${mother}`, zh: `母本 ${mother}` },
    phenotypes: scenario.phenotypes,
    phenotypeOf: scenario.phenotypeOf,
  })

  // Only when the slider is asking for something the father cannot be.
  const impossibleFather = scenario.fatherNote !== undefined && f === 2

  const parts = ratio(grid)

  return {
    series: [],
    grid,
    readouts: {
      affected: chanceOf(grid, scenario.affected),
      carrier: chanceOfGenotypes(grid, scenario.carrierGenotypes),
      unaffected: chanceOf(grid, scenario.unaffected),
      // How many distinct phenotypes this cross can produce — 1, 2 or 3. A cross that
      // produces only one is the "breeds true" case the syllabus asks about.
      outcomes: parts.length,
    },
    markers: [
      {
        x: 0,
        y: 0,
        label: impossibleFather
          ? (scenario.fatherNote as Bilingual)
          : parts.length === 1
            ? { en: 'Every offspring is the same — this cross breeds true', zh: '所有子代都相同——这一杂交能稳定遗传' }
            : { en: `Phenotype ratio ${parts.join(' : ')}`, zh: `表现型比 ${parts.join(' : ')}` },
      },
    ],
  }
}

export default inheritanceKernel
