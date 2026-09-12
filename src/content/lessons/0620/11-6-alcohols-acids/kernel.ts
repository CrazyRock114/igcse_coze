/**
 * Isomers, alcohols and carboxylic acids — kernel for lesson 0620/11-6-alcohols-acids.
 *
 * Four structures drawn from explicit coordinates, in two pairs. Each pair has the same
 * molecular formula and a different structure, which is the definition of structural isomerism
 * and is the one thing about it that has to be seen rather than stated: butane and
 * methylpropane are both C₄H₁₀, and no amount of counting atoms will tell them apart.
 *
 * The second pair does the same for alcohols. Propan-1-ol and propan-2-ol are both C₃H₈O, and
 * they differ only in which carbon the hydroxyl group is attached to — which is exactly what
 * the number in the name is for. Students meet those numbers as decoration; here they are the
 * only thing distinguishing two real, different substances.
 *
 * Structures are built by hand rather than through the organic library, because that library
 * builds straight chains and a branch is the whole point of the first pair.
 *
 * Covers 0620.11.1.7 and 11.2.3.
 */

import type { Bilingual, SimBody, SimKernel, SimLink, SimResult } from '@/content/types'

export interface IsomerParams extends Record<string, number> {
  /** 0 butane · 1 methylpropane · 2 propan-1-ol · 3 propan-2-ol. */
  structure: number
}

export const BUTANE = 0
export const METHYLPROPANE = 1
export const PROPAN_1_OL = 2
export const PROPAN_2_OL = 3

interface Built {
  bodies: SimBody[]
  links: SimLink[]
  name: Bilingual
}

/** Relative atomic masses for the three elements that appear here. */
const AR: Record<string, number> = { H: 1, C: 12, O: 16 }

/**
 * Assembles a structure from carbon positions and the atoms hung off each.
 *
 * `attachments` lists, for each carbon, the directions to hang a hydrogen in. Anything more
 * complicated — a branch, a hydroxyl group — is added by the caller afterwards.
 */
function skeleton(
  carbons: Array<[number, number]>,
  attachments: Array<Array<[number, number]>>,
): { bodies: SimBody[]; links: SimLink[]; carbonIndex: number[] } {
  const bodies: SimBody[] = []
  const links: SimLink[] = []
  const carbonIndex = carbons.map(([x, y]) => bodies.push({ x, y, kind: 'C' }) - 1)

  for (let i = 1; i < carbonIndex.length; i++) {
    links.push({ a: carbonIndex[i - 1]!, b: carbonIndex[i]! })
  }

  attachments.forEach((offsets, i) => {
    const origin = carbons[i]!
    for (const [dx, dy] of offsets) {
      const h = bodies.push({ x: origin[0] + dx, y: origin[1] + dy, kind: 'H' }) - 1
      links.push({ a: carbonIndex[i]!, b: h })
    }
  })

  return { bodies, links, carbonIndex }
}

function build(structure: number): Built {
  if (structure === BUTANE) {
    const { bodies, links } = skeleton(
      [
        [0, 0],
        [1, 0],
        [2, 0],
        [3, 0],
      ],
      [
        [
          [-1, 0],
          [0, 1],
          [0, -1],
        ],
        [
          [0, 1],
          [0, -1],
        ],
        [
          [0, 1],
          [0, -1],
        ],
        [
          [1, 0],
          [0, 1],
          [0, -1],
        ],
      ],
    )
    return { bodies, links, name: { en: 'butane', zh: '丁烷' } }
  }

  if (structure === METHYLPROPANE) {
    const { bodies, links, carbonIndex } = skeleton(
      [
        [0, 0],
        [1, 0],
        [2, 0],
      ],
      [
        [
          [-1, 0],
          [0, 1],
          [0, -1],
        ],
        [[0, -1]],
        [
          [1, 0],
          [0, 1],
          [0, -1],
        ],
      ],
    )
    // The branch: a fourth carbon above the middle one, with its own three hydrogens.
    const branch = bodies.push({ x: 1, y: 1, kind: 'C' }) - 1
    links.push({ a: carbonIndex[1]!, b: branch })
    for (const [x, y] of [
      [0, 1],
      [2, 1],
      [1, 2],
    ] as const) {
      const h = bodies.push({ x, y, kind: 'H' }) - 1
      links.push({ a: branch, b: h })
    }
    return { bodies, links, name: { en: 'methylpropane', zh: '甲基丙烷' } }
  }

  if (structure === PROPAN_1_OL) {
    const { bodies, links, carbonIndex } = skeleton(
      [
        [0, 0],
        [1, 0],
        [2, 0],
      ],
      [
        [
          [-1, 0],
          [0, 1],
          [0, -1],
        ],
        [
          [0, 1],
          [0, -1],
        ],
        [
          [0, 1],
          [0, -1],
        ],
      ],
    )
    const o = bodies.push({ x: 3, y: 0, kind: 'O' }) - 1
    const h = bodies.push({ x: 4, y: 0, kind: 'H' }) - 1
    links.push({ a: carbonIndex[2]!, b: o, kind: 'functional' })
    links.push({ a: o, b: h, kind: 'functional' })
    return { bodies, links, name: { en: 'propan-1-ol', zh: '丙-1-醇' } }
  }

  const { bodies, links, carbonIndex } = skeleton(
    [
      [0, 0],
      [1, 0],
      [2, 0],
    ],
    [
      [
        [-1, 0],
        [0, 1],
        [0, -1],
      ],
      [[0, -1]],
      [
        [1, 0],
        [0, 1],
        [0, -1],
      ],
    ],
  )
  // The hydroxyl group on the middle carbon — the only difference from propan-1-ol.
  const o = bodies.push({ x: 1, y: 1, kind: 'O' }) - 1
  const h = bodies.push({ x: 1, y: 2, kind: 'H' }) - 1
  links.push({ a: carbonIndex[1]!, b: o, kind: 'functional' })
  links.push({ a: o, b: h, kind: 'functional' })
  return { bodies, links, name: { en: 'propan-2-ol', zh: '丙-2-醇' } }
}

/** Atom counts by element, from the drawn structure. */
export function atomCounts(bodies: SimBody[]): Record<string, number> {
  const counts: Record<string, number> = {}
  for (const b of bodies) {
    const kind = b.kind ?? ''
    counts[kind] = (counts[kind] ?? 0) + 1
  }
  return counts
}

/** Relative molecular mass of the drawn structure. */
export function structureMass(bodies: SimBody[]): number {
  return Object.entries(atomCounts(bodies)).reduce(
    (sum, [element, n]) => sum + (AR[element] ?? 0) * n,
    0,
  )
}

/** The structure each one is an isomer of. */
export const ISOMER_OF: Record<number, number> = {
  [BUTANE]: METHYLPROPANE,
  [METHYLPROPANE]: BUTANE,
  [PROPAN_1_OL]: PROPAN_2_OL,
  [PROPAN_2_OL]: PROPAN_1_OL,
}

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))

export const isomerKernel: SimKernel<IsomerParams, SimResult> = (params) => {
  const structure = clamp(Math.round(params['structure'] ?? BUTANE), BUTANE, PROPAN_2_OL)
  const { bodies, links, name } = build(structure)
  const counts = atomCounts(bodies)
  const partner = build(ISOMER_OF[structure] ?? structure)

  return {
    series: [],
    bodies,
    links,
    readouts: {
      carbonAtoms: counts['C'] ?? 0,
      hydrogenAtoms: counts['H'] ?? 0,
      oxygenAtoms: counts['O'] ?? 0,
      relativeMolecularMass: structureMass(bodies),
    },
    markers: [
      {
        x: 0,
        y: 0,
        label: {
          en: `${name.en} — a structural isomer of ${partner.name.en}`,
          zh: `${name.zh ?? name.en}——${partner.name.zh ?? partner.name.en}的结构异构体`,
        },
      },
    ],
  }
}

export default isomerKernel
