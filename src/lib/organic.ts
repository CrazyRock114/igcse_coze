/**
 * Displayed formulae for unbranched organic molecules.
 *
 * Structures are built by valence bookkeeping rather than looked up in a table: the chain
 * and the functional group claim their bonds, and hydrogen fills whatever each carbon has
 * left. So a carbon ends up with four bonds for the same reason a student's drawing would,
 * and a mistake in the geometry shows up as a valence error a test can catch.
 *
 * Coordinates are in bond lengths, x to the right and y up. The chain runs along y = 0
 * from x = 0, and functional groups go on the right-hand end so that changing the group
 * changes the same corner of the picture.
 */

import type { SimBody, SimLink } from '@/content/types'

export type Direction = 'up' | 'down' | 'left' | 'right'

const OFFSETS: Record<Direction, readonly [number, number]> = {
  up: [0, 1],
  down: [0, -1],
  left: [-1, 0],
  right: [1, 0],
}

/**
 * Directions a hydrogen may take off a carbon, in the order they are tried.
 *
 * Above and below come first so that a terminal CH₂ — the end of every alkene — gets its
 * two hydrogens placed symmetrically, the way every textbook and exam paper draws ethene.
 * Only when a third or fourth hydrogen is needed does one go out to the side, giving the
 * familiar CH₃ end group.
 *
 * The exception is a carbon that already carries something above it, which means the
 * carboxyl carbon of methanoic acid. There the remaining hydrogen belongs out to the left,
 * as H–COOH, rather than tucked underneath.
 */
const FIRST_CARBON_ORDER: Direction[] = ['up', 'down', 'left', 'right']
const FIRST_CARBON_ORDER_BUSY_TOP: Direction[] = ['left', 'down', 'right']
const OTHER_CARBON_ORDER: Direction[] = ['up', 'down', 'right', 'left']

export interface Structure {
  bodies: SimBody[]
  links: SimLink[]
  /** Body indices of the chain carbons, left to right. */
  carbons: number[]
  /** Directions already spoken for on each carbon, indexed as `carbons`. */
  taken: Array<Set<Direction>>
}

/** Families the builder knows how to terminate. */
export type FamilyKey = 'alkane' | 'alkene' | 'alcohol' | 'acid'

/** Smallest chain a family can have. Only the alkenes, needing a C=C, cannot be n = 1. */
export function minimumCarbons(familyKey: string): number {
  return familyKey === 'alkene' ? 2 : 1
}

/** Builds the displayed formula for the `n`-carbon member of a family. */
export function buildStructure(familyKey: string, n: number): Structure {
  const bodies: SimBody[] = []
  const links: SimLink[] = []
  const add = (x: number, y: number, kind: string): number => bodies.push({ x, y, kind }) - 1

  const carbons = Array.from({ length: n }, (_, i) => add(i, 0, 'C'))
  const used = new Array<number>(n).fill(0)
  const taken: Array<Set<Direction>> = carbons.map(() => new Set())
  const structure: Structure = { bodies, links, carbons, taken }

  // Chain. The alkene's double bond goes between the last two carbons, so it sits at the
  // same end as the other families' functional groups.
  for (let i = 0; i < n - 1; i++) {
    const isDouble = familyKey === 'alkene' && i === n - 2
    const order = isDouble ? 2 : 1
    links.push({
      a: carbons[i]!,
      b: carbons[i + 1]!,
      order,
      ...(isDouble ? { kind: 'functional' } : {}),
    })
    used[i]! += order
    used[i + 1]! += order
    taken[i]!.add('right')
    taken[i + 1]!.add('left')
  }

  const last = n - 1

  if (familyKey === 'alcohol') {
    attachChain(structure, last, 'right', ['O', 'H'], 'functional')
    used[last]! += 1
  }

  if (familyKey === 'acid') {
    // C=O above the carboxyl carbon, –O–H to its right.
    attachChain(structure, last, 'up', ['O'], 'functional', 2)
    attachChain(structure, last, 'right', ['O', 'H'], 'functional')
    used[last]! += 3
  }

  // Hydrogen fills every bond each carbon has left. Carbon always takes exactly four.
  for (let i = 0; i < n; i++) {
    const order =
      i === 0
        ? taken[0]!.has('up')
          ? FIRST_CARBON_ORDER_BUSY_TOP
          : FIRST_CARBON_ORDER
        : OTHER_CARBON_ORDER
    let remaining = 4 - used[i]!
    for (const direction of order) {
      if (remaining <= 0) break
      if (taken[i]!.has(direction)) continue
      attachChain(structure, i, direction, ['H'])
      remaining -= 1
    }
  }

  return structure
}

/**
 * Hangs a run of atoms off a carbon, going outwards in one direction — `['O', 'H']` for a
 * hydroxyl group, `['Br']` for a single atom.
 *
 * Returns the body indices of the atoms added.
 */
export function attachChain(
  structure: Structure,
  carbon: number,
  direction: Direction,
  kinds: string[],
  linkKind?: string,
  firstBondOrder = 1
): number[] {
  const { bodies, links, carbons, taken } = structure
  const origin = bodies[carbons[carbon]!]!
  const [dx, dy] = OFFSETS[direction]

  const added: number[] = []
  let previous = carbons[carbon]!
  kinds.forEach((kind, step) => {
    const index =
      bodies.push({
        x: origin.x + dx * (step + 1),
        y: origin.y + dy * (step + 1),
        kind,
      }) - 1
    links.push({
      a: previous,
      b: index,
      order: step === 0 ? firstBondOrder : 1,
      ...(linkKind ? { kind: linkKind } : {}),
    })
    previous = index
    added.push(index)
  })

  taken[carbon]!.add(direction)
  return added
}

/** The first direction off a carbon that nothing has claimed yet. */
export function freeDirection(structure: Structure, carbon: number): Direction | undefined {
  const order: Direction[] = ['left', 'right', 'up', 'down']
  return order.find((d) => !structure.taken[carbon]!.has(d))
}

/**
 * Turns the C=C into a C–C and reports which two carbons it joined.
 *
 * This is what an addition reaction does: the double bond opens, and each of those two
 * carbons is left with a bond going spare for the incoming atoms.
 */
export function openDoubleBond(structure: Structure): [number, number] | undefined {
  const { links, bodies, carbons } = structure
  const link = links.find(
    (l) => l.order === 2 && bodies[l.a]?.kind === 'C' && bodies[l.b]?.kind === 'C'
  )
  if (!link) return undefined

  link.order = 1
  delete link.kind
  return [carbons.indexOf(link.a), carbons.indexOf(link.b)]
}

/**
 * Swaps one hydrogen on a carbon for another atom — a substitution.
 *
 * Takes the outermost hydrogen (smallest x, then smallest y), so the new atom lands on the
 * end of the molecule where it is easy to see, rather than buried between two carbons.
 */
export function replaceHydrogen(
  structure: Structure,
  carbon: number,
  kind: string
): number | undefined {
  const { bodies, links, carbons } = structure
  const carbonIndex = carbons[carbon]
  if (carbonIndex === undefined) return undefined

  const candidates = links
    .filter((l) => l.a === carbonIndex || l.b === carbonIndex)
    .map((l) => (l.a === carbonIndex ? l.b : l.a))
    .filter((i) => bodies[i]?.kind === 'H')
    .sort((a, b) => bodies[a]!.x - bodies[b]!.x || bodies[a]!.y - bodies[b]!.y)

  const target = candidates[0]
  if (target === undefined) return undefined

  bodies[target] = { ...bodies[target]!, kind }
  for (const link of links) {
    if (link.a === target || link.b === target) link.kind = 'functional'
  }
  return target
}
