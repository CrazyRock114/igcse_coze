/**
 * Addition polymers — kernel for lesson 0620/11-8-polymers.
 *
 * Draws n monomer molecules, or the polymer they make, from the same data. The point the
 * drawing has to carry is that nothing is lost: every atom in the monomers appears in the
 * polymer, so the molecular formula under the picture is *identical* in the two stages.
 * That is what separates addition polymerisation from condensation polymerisation, where
 * a small molecule is expelled at every join.
 *
 * Monomers here all carry single-atom substituents. A methyl branch, as in propene, would
 * collide with the neighbouring repeat unit's hydrogens on this lattice, and a drawing
 * with two atoms in the same place teaches nothing.
 *
 * Covers 0620.11.8.1–3 and 11.8.6–7; the environmental and condensation statements are
 * carried by the narration and checkpoints.
 */

import type { Bilingual, SimBody, SimKernel, SimLink, SimResult } from '@/content/types'
import { relativeMolecularMass } from '@/lib/molecularFormula'

export interface PolymerParams extends Record<string, number> {
  /** Index into MONOMERS */
  monomer: number
  /** Monomer molecules, or repeat units in the chain: 1–4 */
  repeatUnits: number
  /** 0 shows the separate monomers, 1 shows the polymer */
  polymerised: number
}

export interface Monomer {
  key: string
  /** Name of the monomer, e.g. ethene. */
  label: Bilingual
  /** Name of the polymer it forms. */
  polymerName: Bilingual
  /** Everyday name of the plastic, where it has one. */
  commonName?: Bilingual
  /** Substituents on the first carbon of the repeat unit, above and below. */
  left: [string, string]
  /** Substituents on the second carbon, above and below. */
  right: [string, string]
  use: Bilingual
}

export const MONOMERS: Monomer[] = [
  {
    key: 'ethene',
    label: { en: 'ethene', zh: '乙烯' },
    polymerName: { en: 'poly(ethene)', zh: '聚乙烯' },
    commonName: { en: 'polythene', zh: '聚乙烯塑料' },
    left: ['H', 'H'],
    right: ['H', 'H'],
    use: { en: 'plastic bags, bottles, buckets', zh: '塑料袋、瓶子、水桶' },
  },
  {
    key: 'chloroethene',
    label: { en: 'chloroethene', zh: '氯乙烯' },
    polymerName: { en: 'poly(chloroethene)', zh: '聚氯乙烯' },
    commonName: { en: 'PVC', zh: 'PVC' },
    left: ['H', 'H'],
    right: ['H', 'Cl'],
    use: { en: 'drainpipes, window frames, cable insulation', zh: '排水管、窗框、电缆绝缘层' },
  },
  {
    key: 'tetrafluoroethene',
    label: { en: 'tetrafluoroethene', zh: '四氟乙烯' },
    polymerName: { en: 'poly(tetrafluoroethene)', zh: '聚四氟乙烯' },
    commonName: { en: 'PTFE', zh: 'PTFE' },
    left: ['F', 'F'],
    right: ['F', 'F'],
    use: { en: 'non-stick pans, low-friction bearings', zh: '不粘锅、低摩擦轴承' },
  },
]

/** Spacing between separate monomer molecules, in bond lengths. */
const MONOMER_PITCH = 3

interface Built {
  bodies: SimBody[]
  links: SimLink[]
}

/** Places a carbon with its two substituents above and below. */
function carbonWith(
  built: Built,
  x: number,
  substituents: [string, string]
): number {
  const carbon = built.bodies.push({ x, y: 0, kind: 'C' }) - 1
  const [above, below] = substituents
  for (const [kind, dy] of [
    [above, 1],
    [below, -1],
  ] as const) {
    const index = built.bodies.push({ x, y: dy, kind }) - 1
    built.links.push({
      a: carbon,
      b: index,
      order: 1,
      // Anything that is not hydrogen is what makes this polymer different from the last.
      ...(kind === 'H' ? {} : { kind: 'functional' }),
    })
  }
  return carbon
}

/** n separate monomer molecules, each with its C=C intact. */
export function buildMonomers(monomer: Monomer, n: number): Built {
  const built: Built = { bodies: [], links: [] }
  for (let i = 0; i < n; i++) {
    const a = carbonWith(built, i * MONOMER_PITCH, monomer.left)
    const b = carbonWith(built, i * MONOMER_PITCH + 1, monomer.right)
    built.links.push({ a, b, order: 2, kind: 'functional' })
  }
  return built
}

/**
 * The polymer chain: every double bond now a single bond, and the repeat units joined end
 * to end. Bonds stick out at each end to stubs with no element, which is how a section of
 * a polymer is drawn — the chain carries on past what is shown.
 */
export function buildPolymer(monomer: Monomer, n: number): Built {
  const built: Built = { bodies: [], links: [] }
  const carbons: number[] = []

  for (let i = 0; i < n; i++) {
    carbons.push(carbonWith(built, i * 2, monomer.left))
    carbons.push(carbonWith(built, i * 2 + 1, monomer.right))
  }

  for (let i = 0; i < carbons.length - 1; i++) {
    built.links.push({ a: carbons[i]!, b: carbons[i + 1]!, order: 1 })
  }

  // Stubs carry no element, so they cost nothing in the molecular formula while still
  // giving the end carbons their fourth bond — which is a real bond, to the next unit.
  const leftStub = built.bodies.push({ x: -1, y: 0 }) - 1
  const rightStub = built.bodies.push({ x: n * 2, y: 0 }) - 1
  built.links.push({ a: leftStub, b: carbons[0]!, order: 1 })
  built.links.push({ a: carbons[carbons.length - 1]!, b: rightStub, order: 1 })

  return built
}

export const polymerKernel: SimKernel<PolymerParams, SimResult> = ({
  monomer,
  repeatUnits,
  polymerised,
}) => {
  const chosen = MONOMERS[Math.min(MONOMERS.length - 1, Math.max(0, Math.round(monomer)))]!
  const n = Math.min(4, Math.max(1, Math.round(repeatUnits)))
  const isPolymer = Math.round(polymerised) >= 1

  const { bodies, links } = isPolymer ? buildPolymer(chosen, n) : buildMonomers(chosen, n)
  const repeatUnitMass = relativeMolecularMass(buildMonomers(chosen, 1).bodies)

  const width = isPolymer ? n * 2 - 1 : (n - 1) * MONOMER_PITCH + 1
  const centre = (isPolymer ? -1 + n * 2 : width) / 2

  const name: Bilingual = isPolymer
    ? {
        en: chosen.commonName
          ? `${chosen.polymerName.en} — ${chosen.commonName.en}`
          : chosen.polymerName.en,
        zh: chosen.polymerName.zh ?? '',
      }
    : { en: `${n} × ${chosen.label.en}`, zh: `${n} × ${chosen.label.zh ?? ''}` }

  const headline: Bilingual = isPolymer
    ? { en: `Polymer — ${n} repeat unit${n === 1 ? '' : 's'} shown`, zh: `聚合物——图中显示 ${n} 个重复单元` }
    : { en: `${n} monomer molecule${n === 1 ? '' : 's'}`, zh: `${n} 个单体分子` }

  const note: Bilingual = isPolymer
    ? {
        en: 'Every double bond has opened and joined the next unit. No atoms were lost.',
        zh: '每个双键都已打开并与下一个单元相连。没有失去任何原子。',
      }
    : {
        en: 'Each monomer has one C=C. That is what lets it join the chain.',
        zh: '每个单体都含一个 C=C。正是它使单体能够连成链。',
      }

  return {
    series: [],
    bodies,
    links,
    markers: [
      // [0] is the name, shown bilingually in the caption rather than drawn.
      { x: centre, y: 0, label: name },
      { x: centre, y: 2.1, label: headline },
      { x: centre, y: -2.1, label: note },
    ],
    readouts: {
      repeatUnits: n,
      relativeMolecularMass: relativeMolecularMass(bodies),
      repeatUnitMass,
      atoms: bodies.filter((b) => b.kind).length,
    },
  }
}

export default polymerKernel
