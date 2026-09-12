import type { Bilingual, SimGrid } from '@/content/types'

/**
 * Monohybrid crosses.
 *
 * Everything the syllabus treats as four separate topics — a dominant/recessive cross,
 * codominance, sex determination, and a sex-linked cross — is the same operation: split each
 * parent into its two alleles, pair every one of the father's with every one of the mother's,
 * and count what comes out. Writing it once makes that visible; writing four Punnett squares
 * by hand would hide it, and would also let the four disagree with each other.
 *
 * A genotype here is just a two-character string, so `Bb`, `XY` and its sex-linked cousins
 * all go through unchanged. The only thing the caller has to supply is which phenotype each
 * genotype produces, because that is the one part genetics does not derive from the letters.
 */

export type Genotype = string

/** The two alleles a parent can pass on. `Bb` gives `['B', 'b']`; `BB` gives `['B', 'B']`. */
export function gametes(genotype: Genotype): [string, string] {
  const a = genotype[0] ?? ''
  const b = genotype[1] ?? ''
  return [a, b]
}

/**
 * Combines two alleles into an offspring genotype.
 *
 * Sorted so that `bB` and `Bb` are the same heterozygote and not two entries in the legend —
 * capitals first, which is how a genotype is conventionally written.
 *
 * Y is the exception and is always written last, whatever the case of what it is paired
 * with. A colour-blind male is written with the affected X first and the Y after it; the
 * capitals-first rule on its own would put the Y in front, which is not how anyone writes
 * a genotype and would make the grid look wrong to a student who had seen one before.
 */
export function combine(one: string, two: string): Genotype {
  if (one === 'Y') return two + one
  if (two === 'Y') return one + two

  const upperFirst = (s: string) => (s === s.toUpperCase() ? 0 : 1)
  const rank = (s: string) => upperFirst(s) * 100 + s.toLowerCase().charCodeAt(0)
  return rank(one) <= rank(two) ? one + two : two + one
}

export interface CrossSpec {
  /** Genotype of the parent whose gametes form the columns. */
  father: Genotype
  fatherLabel: Bilingual
  /** Genotype of the parent whose gametes form the rows. */
  mother: Genotype
  motherLabel: Bilingual
  /** Distinct phenotypes, in the order they should be listed. */
  phenotypes: Array<{ id: string; label: Bilingual }>
  /** Which phenotype each genotype produces. */
  phenotypeOf: Record<Genotype, string>
}

/** Builds the Punnett square for a cross. */
export function punnett(spec: CrossSpec): SimGrid {
  const columns = gametes(spec.father)
  const rows = gametes(spec.mother)

  const cells = rows.map((r) => columns.map((c) => combine(c, r)))

  // Only the genotypes this cross can actually produce, so a legend never lists an
  // outcome the student cannot reach from the parents in front of them.
  const produced = new Set(cells.flat())
  const groupOf: Record<string, string> = {}
  for (const genotype of produced) {
    groupOf[genotype] = spec.phenotypeOf[genotype] ?? genotype
  }

  const used = new Set(Object.values(groupOf))

  return {
    columns,
    columnsLabel: spec.fatherLabel,
    rows,
    rowsLabel: spec.motherLabel,
    cells,
    groups: spec.phenotypes.filter((p) => used.has(p.id)),
    groupOf,
  }
}

/** How many of the four cells fall into each phenotype, keyed by phenotype id. */
export function tally(grid: SimGrid): Record<string, number> {
  const counts: Record<string, number> = {}
  for (const group of grid.groups) counts[group.id] = 0
  for (const genotype of grid.cells.flat()) {
    const id = grid.groupOf[genotype]
    if (id !== undefined) counts[id] = (counts[id] ?? 0) + 1
  }
  return counts
}

/** Percentage of offspring expected to show `phenotype`. */
export function chanceOf(grid: SimGrid, phenotype: string): number {
  const total = grid.cells.flat().length
  if (total === 0) return 0
  return Math.round(((tally(grid)[phenotype] ?? 0) / total) * 100)
}

/**
 * Percentage of offspring with one of the given genotypes.
 *
 * Carrying an allele is a fact about the genotype, not the phenotype, and in a
 * dominant/recessive cross the two do not line up: a red flower may be `RR` or `Rr` and
 * nothing about it says which. Counting carriers off the phenotype tally would report the
 * same number as "shows the dominant phenotype" and quietly teach that they are the same
 * thing, which is the misconception the topic exists to correct.
 */
export function chanceOfGenotypes(grid: SimGrid, genotypes: Genotype[]): number {
  const cells = grid.cells.flat()
  if (cells.length === 0) return 0
  const wanted = new Set(genotypes)
  return Math.round((cells.filter((g) => wanted.has(g)).length / cells.length) * 100)
}

/**
 * The phenotype ratio, as small whole numbers in the order the groups are listed.
 *
 * Divided by their highest common factor, because "3 : 1" is the answer a mark scheme
 * expects and "3 : 1" written as "3 : 1 out of 4" is not. Groups that do not appear are
 * dropped rather than written as zero — a cross producing only one phenotype has a ratio
 * of "1", not "4 : 0".
 */
export function ratio(grid: SimGrid): number[] {
  const counts = grid.groups.map((g) => tally(grid)[g.id] ?? 0).filter((n) => n > 0)
  if (counts.length === 0) return []

  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b))
  const divisor = counts.reduce(gcd)
  return counts.map((n) => n / divisor)
}
