import type { SimBody } from '@/content/types'

/**
 * Relative atomic masses, to the precision 0620 expects on a Periodic Table.
 * Chlorine is 35.5 — a weighted average over its isotopes, not a whole number.
 */
export const RELATIVE_ATOMIC_MASS: Record<string, number> = {
  H: 1,
  C: 12,
  N: 14,
  O: 16,
  F: 19,
  Na: 23,
  Cl: 35.5,
  Br: 80,
}

const SUBSCRIPTS = ['₀', '₁', '₂', '₃', '₄', '₅', '₆', '₇', '₈', '₉']

/** Renders a count as Unicode subscript digits, so no markup is needed in SVG or HTML. */
export function subscript(n: number): string {
  if (n <= 1) return ''
  return String(n)
    .split('')
    .map((d) => SUBSCRIPTS[Number(d)] ?? d)
    .join('')
}

/** Counts atoms of each element in a set of bodies, keyed by the body's `kind`. */
export function atomCounts(bodies: SimBody[]): Map<string, number> {
  const counts = new Map<string, number>()
  for (const b of bodies) {
    const symbol = b.kind
    if (!symbol) continue
    counts.set(symbol, (counts.get(symbol) ?? 0) + 1)
  }
  return counts
}

/**
 * Molecular formula in Hill order — carbon, then hydrogen, then everything else
 * alphabetically. `C₂H₆O` for ethanol.
 *
 * Derived by counting the atoms actually drawn, so the formula under a structure cannot
 * disagree with the structure above it.
 */
export function molecularFormula(bodies: SimBody[]): string {
  const counts = atomCounts(bodies)
  const others = Array.from(counts.keys())
    .filter((s) => s !== 'C' && s !== 'H')
    .sort()
  const order = ['C', 'H', ...others]

  return order
    .filter((symbol) => (counts.get(symbol) ?? 0) > 0)
    .map((symbol) => `${symbol}${subscript(counts.get(symbol)!)}`)
    .join('')
}

/**
 * Relative molecular mass, summed over the atoms drawn.
 *
 * Throws on an element with no listed mass rather than silently returning a low number —
 * a wrong Mr is worse than a build failure, because a student would work from it.
 */
export function relativeMolecularMass(bodies: SimBody[]): number {
  let total = 0
  for (const [symbol, count] of atomCounts(bodies)) {
    const mass = RELATIVE_ATOMIC_MASS[symbol]
    if (mass === undefined) throw new RangeError(`No relative atomic mass for "${symbol}"`)
    total += mass * count
  }
  // Chlorine's 35.5 leaves floating-point residue once it is multiplied out.
  return Math.round(total * 10) / 10
}
