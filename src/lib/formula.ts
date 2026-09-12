/**
 * Reading a chemical formula as a count of atoms.
 *
 * Needed wherever a lesson has to know what is in a formula rather than merely print it —
 * balancing an equation, checking that a student's coefficients agree, working out an Mr.
 * Kept here rather than in a lesson because more than one lesson needs it and two copies
 * of a parser drift.
 *
 * Handles element symbols, subscripts and brackets: `Ca(OH)2` is one calcium, two oxygen and
 * two hydrogen. Brackets matter — they are how every hydroxide and nitrate is written, and a
 * parser that ignored them would quietly get half the salts in the syllabus wrong.
 */

/** Atom counts by element symbol. */
export type AtomCount = Record<string, number>

const TOKEN = /([A-Z][a-z]?)(\d*)|(\()|(\)(\d*))/g

/**
 * Counts the atoms in a formula.
 *
 * Unparseable input returns an empty count rather than throwing: a formula typed into lesson
 * data is a mistake to be caught by the content gate, not a reason to blank the page.
 */
export function parseFormula(formula: string): AtomCount {
  const stack: AtomCount[] = [{}]
  TOKEN.lastIndex = 0

  let consumed = 0
  let match: RegExpExecArray | null
  while ((match = TOKEN.exec(formula)) !== null) {
    if (match.index !== consumed) return {}
    consumed = match.index + match[0].length

    const [, element, count, open, close, closeCount] = match
    const top = stack[stack.length - 1]!

    if (element) {
      top[element] = (top[element] ?? 0) + (count ? Number(count) : 1)
    } else if (open) {
      stack.push({})
    } else if (close !== undefined) {
      const group = stack.pop()
      if (!group || stack.length === 0) return {}
      const multiplier = closeCount ? Number(closeCount) : 1
      const below = stack[stack.length - 1]!
      for (const [el, n] of Object.entries(group)) below[el] = (below[el] ?? 0) + n * multiplier
    }
  }

  if (consumed !== formula.length || stack.length !== 1) return {}
  return stack[0]!
}

/** Adds a formula's atoms into a running total, multiplied by a coefficient. */
export function addAtoms(total: AtomCount, formula: string, coefficient: number): AtomCount {
  for (const [element, n] of Object.entries(parseFormula(formula))) {
    total[element] = (total[element] ?? 0) + n * coefficient
  }
  return total
}

/** Every element appearing in a list of formulae, in the order first seen. */
export function elementsIn(formulae: string[]): string[] {
  const seen: string[] = []
  for (const f of formulae) {
    for (const element of Object.keys(parseFormula(f))) {
      if (!seen.includes(element)) seen.push(element)
    }
  }
  return seen
}

/** Relative formula mass, given a table of relative atomic masses. */
export function relativeMass(formula: string, masses: Record<string, number>): number {
  let total = 0
  for (const [element, n] of Object.entries(parseFormula(formula))) {
    const ar = masses[element]
    // An element with no mass in the table would silently contribute nothing, which is
    // worse than refusing to answer — an Mr that is quietly too small looks plausible.
    if (ar === undefined) return Number.NaN
    total += ar * n
  }
  return total
}

/** Digits rendered as subscripts, so `H2O` prints as H₂O. */
export function subscript(formula: string): string {
  const digits = '₀₁₂₃₄₅₆₇₈₉'
  return formula.replace(/\d/g, (d) => digits[Number(d)] ?? d)
}
