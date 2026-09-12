/**
 * Ionic and covalent bonding — kernel for lesson 0620/2-4-bonding.
 *
 * Draws dot-and-cross diagrams, and draws them twice: the separate atoms, and what those
 * atoms become once they bond. Running the same control over both kinds of bonding is the
 * point of the lesson — a metal and a non-metal *transfer* electrons and end up as ions
 * pulled together by charge, while two non-metals *share* them and end up as one molecule.
 *
 * Electrons are placed by the same rule either way: an atom's own electrons are its marker
 * (dot or cross), so a cross sitting in a chloride ion's shell is visibly the one sodium
 * gave up. Nothing about the drawing is looked up — the electron counts come from group
 * numbers and the bonds, so an atom that ends up with the wrong number of electrons is a
 * test failure rather than a drawing anyone has to proofread.
 *
 * Covers 0620.2.4.1–7 and 2.5.1–5.
 */

import type { Bilingual, SimBody, SimKernel, SimResult } from '@/content/types'

export interface BondingParams extends Record<string, number> {
  /** Index into SPECIES */
  species: number
  /** 0 draws the separate atoms, 1 draws them bonded */
  bonded: number
}

/** Outer-shell electrons, which for these elements is the group number. */
export const OUTER_ELECTRONS: Record<string, number> = {
  H: 1,
  Li: 1,
  Na: 1,
  K: 1,
  Mg: 2,
  Ca: 2,
  C: 4,
  N: 5,
  O: 6,
  F: 7,
  Cl: 7,
}

export interface IonicSpecies {
  key: string
  kind: 'ionic'
  label: Bilingual
  formula: string
  metal: string
  metalCount: number
  nonMetal: string
  nonMetalCount: number
}

export interface CovalentSpecies {
  key: string
  kind: 'covalent'
  label: Bilingual
  formula: string
  /** The atom the others bond to. For a diatomic molecule, one of the two. */
  central: string
  /** Atoms bonded to the central one, with the number of shared pairs in each bond. */
  outer: Array<{ element: string; bondOrder: number }>
}

export type Species = IonicSpecies | CovalentSpecies

const ionic = (
  key: string,
  label: Bilingual,
  formula: string,
  metal: string,
  metalCount: number,
  nonMetal: string,
  nonMetalCount: number
): IonicSpecies => ({ key, kind: 'ionic', label, formula, metal, metalCount, nonMetal, nonMetalCount })

const covalent = (
  key: string,
  label: Bilingual,
  formula: string,
  central: string,
  outer: Array<[string, number]>
): CovalentSpecies => ({
  key,
  kind: 'covalent',
  label,
  formula,
  central,
  outer: outer.map(([element, bondOrder]) => ({ element, bondOrder })),
})

export const SPECIES: Species[] = [
  ionic('nacl', { en: 'Sodium chloride', zh: '氯化钠' }, 'NaCl', 'Na', 1, 'Cl', 1),
  ionic('mgo', { en: 'Magnesium oxide', zh: '氧化镁' }, 'MgO', 'Mg', 1, 'O', 1),
  ionic('mgcl2', { en: 'Magnesium chloride', zh: '氯化镁' }, 'MgCl₂', 'Mg', 1, 'Cl', 2),
  covalent('h2', { en: 'Hydrogen', zh: '氢气' }, 'H₂', 'H', [['H', 1]]),
  covalent('hcl', { en: 'Hydrogen chloride', zh: '氯化氢' }, 'HCl', 'Cl', [['H', 1]]),
  covalent('h2o', { en: 'Water', zh: '水' }, 'H₂O', 'O', [['H', 1], ['H', 1]]),
  covalent('nh3', { en: 'Ammonia', zh: '氨' }, 'NH₃', 'N', [['H', 1], ['H', 1], ['H', 1]]),
  covalent('ch4', { en: 'Methane', zh: '甲烷' }, 'CH₄', 'C', [['H', 1], ['H', 1], ['H', 1], ['H', 1]]),
  covalent('o2', { en: 'Oxygen', zh: '氧气' }, 'O₂', 'O', [['O', 2]]),
  covalent('co2', { en: 'Carbon dioxide', zh: '二氧化碳' }, 'CO₂', 'C', [['O', 2], ['O', 2]]),
  covalent('n2', { en: 'Nitrogen', zh: '氮气' }, 'N₂', 'N', [['N', 3]]),
]

/** Shell radius. Hydrogen's single shell is drawn smaller, as textbooks draw it. */
export function shellRadius(element: string): number {
  return element === 'H' ? 0.42 : 0.6
}

/** Distance from the central nucleus to a bonded one when the atoms are joined. */
const BOND_DISTANCE = 0.95
/** How much further apart the atoms sit before they bond. */
const SEPARATED_DISTANCE = 1.85
/** Half the angular gap between the two electrons of a pair, in radians. */
const PAIR_SPREAD = 0.17

interface Placed {
  bodies: SimBody[]
}

function push(placed: Placed, body: SimBody): void {
  placed.bodies.push(body)
}

/**
 * Spreads `count` positions round a circle, as far as possible from what is already there.
 *
 * Greedy farthest-point placement: each one goes wherever the angular gap to everything
 * placed so far is widest. That keeps lone pairs out of the overlap between two atoms,
 * which is what makes a dot-and-cross diagram readable.
 */
export function spreadAngles(occupied: number[], count: number): number[] {
  const taken = [...occupied]
  const chosen: number[] = []

  for (let i = 0; i < count; i++) {
    let best = 0
    let bestGap = -1
    // A degree at a time is finer than the eye can resolve at this size.
    for (let deg = 0; deg < 360; deg += 1) {
      const angle = (deg * Math.PI) / 180
      const gap = taken.length === 0 ? Math.PI : Math.min(...taken.map((t) => angularGap(angle, t)))
      if (gap > bestGap) {
        bestGap = gap
        best = angle
      }
    }
    chosen.push(best)
    taken.push(best)
  }
  return chosen
}

/** Smallest angle between two directions, in radians. */
function angularGap(a: number, b: number): number {
  const d = Math.abs(a - b) % (Math.PI * 2)
  return Math.min(d, Math.PI * 2 - d)
}

/**
 * Electrons per slot, filled one to a slot before any slot takes a second.
 *
 * This is what makes an unbonded atom's diagram useful: oxygen comes out as two pairs and
 * two singles, and the two singles are exactly the electrons it is about to bond with.
 */
export function distributeIntoSlots(electrons: number, slots: number): number[] {
  const filled = new Array<number>(slots).fill(0)
  for (let i = 0; i < electrons && slots > 0; i++) {
    filled[i % slots]! += 1
  }
  return filled
}

/** Places electrons at one angular slot: one on the angle, two straddling it. */
function placeSlot(
  placed: Placed,
  x: number,
  y: number,
  radius: number,
  angle: number,
  markers: Array<'dot' | 'cross'>
): void {
  const offsets = markers.length === 1 ? [0] : [-PAIR_SPREAD, PAIR_SPREAD]
  markers.forEach((marker, i) => {
    push(placed, {
      x: x + radius * Math.cos(angle + offsets[i]!),
      y: y + radius * Math.sin(angle + offsets[i]!),
      kind: marker,
    })
  })
}

/**
 * A whole outer shell: the atom's own electrons spread one to a slot first, then any
 * electrons it has gained filling the gaps.
 *
 * The gained ones keep the other atom's marker, so a cross sitting in a chloride ion's
 * shell is visibly the electron sodium gave up.
 */
function placeShell(
  placed: Placed,
  x: number,
  y: number,
  element: string,
  own: number,
  gained: number,
  ownMarker: 'dot' | 'cross',
  gainedMarker: 'dot' | 'cross'
): void {
  const slots = element === 'H' ? 1 : 4
  const filled = distributeIntoSlots(own, slots)
  const angles = spreadAngles([], slots)
  const radius = shellRadius(element)

  let remaining = gained
  filled.forEach((count, i) => {
    const markers: Array<'dot' | 'cross'> = new Array(count).fill(ownMarker)
    // Each slot holds two electrons, so a slot with one has room for a gained one.
    if (count < 2 && remaining > 0) {
      markers.push(gainedMarker)
      remaining -= 1
    }
    if (markers.length > 0) placeSlot(placed, x, y, radius, angles[i]!, markers)
  })
}

/** Lone pairs on a bonded atom, placed clear of the bonds it already has. */
function placeLonePairs(
  placed: Placed,
  x: number,
  y: number,
  element: string,
  electrons: number,
  bondAngles: number[],
  marker: 'dot' | 'cross'
): void {
  const pairs = Math.floor(electrons / 2)
  const odd = electrons % 2
  const angles = spreadAngles(bondAngles, pairs + odd)
  const radius = shellRadius(element)

  angles.forEach((angle, i) => {
    placeSlot(placed, x, y, radius, angle, i < pairs ? [marker, marker] : [marker])
  })
}

/** Puts the shared pairs of one bond in the overlap between two atoms. */
function placeSharedPairs(
  placed: Placed,
  from: { x: number; y: number },
  to: { x: number; y: number },
  bondOrder: number
): void {
  const dx = to.x - from.x
  const dy = to.y - from.y
  const length = Math.hypot(dx, dy) || 1
  const ux = dx / length
  const uy = dy / length
  const mx = (from.x + to.x) / 2
  const my = (from.y + to.y) / 2

  // One pair sits on the bond axis; two or three stack either side of it.
  const across = bondOrder === 1 ? [0] : bondOrder === 2 ? [-0.13, 0.13] : [-0.19, 0, 0.19]

  for (const offset of across) {
    const px = mx - uy * offset
    const py = my + ux * offset
    // The dot leans towards the atom it came from and the cross towards the other, so a
    // shared pair still shows which atom contributed which electron.
    push(placed, { x: px - ux * 0.06, y: py - uy * 0.06, kind: 'dot' })
    push(placed, { x: px + ux * 0.06, y: py + uy * 0.06, kind: 'cross' })
  }
}

export interface Analysis {
  sharedPairs: number
  electronsTransferred: number
  lonePairs: number
  atoms: number
  /** Outer electrons around the central atom, or the anion, once bonded. */
  outerElectronsWhenBonded: number
}

/** What the bonding does, worked out from group numbers alone. */
export function analyse(species: Species): Analysis {
  if (species.kind === 'ionic') {
    const perMetal = OUTER_ELECTRONS[species.metal] ?? 0
    const transferred = perMetal * species.metalCount
    const anionOuter = (OUTER_ELECTRONS[species.nonMetal] ?? 0) + transferred / species.nonMetalCount
    return {
      sharedPairs: 0,
      electronsTransferred: transferred,
      // Each ion ends with a full shell, so every anion carries four pairs.
      lonePairs: (anionOuter / 2) * species.nonMetalCount,
      atoms: species.metalCount + species.nonMetalCount,
      outerElectronsWhenBonded: anionOuter,
    }
  }

  const centralOuter = OUTER_ELECTRONS[species.central] ?? 0
  const bondElectrons = species.outer.reduce((total, o) => total + o.bondOrder, 0)
  const centralLone = centralOuter - bondElectrons

  const outerLone = species.outer.reduce(
    (total, o) => total + ((OUTER_ELECTRONS[o.element] ?? 0) - o.bondOrder),
    0
  )

  return {
    sharedPairs: bondElectrons,
    electronsTransferred: 0,
    lonePairs: (centralLone + outerLone) / 2,
    atoms: 1 + species.outer.length,
    // Every bonding electron is counted by both atoms, which is why sharing works.
    outerElectronsWhenBonded: centralLone + bondElectrons * 2,
  }
}

function buildIonic(species: IonicSpecies, bonded: boolean): Placed {
  const placed: Placed = { bodies: [] }
  const gap = bonded ? 1.35 : 1.95
  const donated = (OUTER_ELECTRONS[species.metal] ?? 0) * species.metalCount
  const gainedPerAnion = donated / species.nonMetalCount

  const column = (count: number, x: number, element: string, isMetal: boolean) => {
    for (let i = 0; i < count; i++) {
      const y = count === 1 ? 0 : (i - (count - 1) / 2) * 1.65
      const own = OUTER_ELECTRONS[element] ?? 0

      push(placed, {
        x,
        y,
        r: shellRadius(element),
        kind: bonded ? 'ion' : 'shell',
        label: element,
      })

      if (!bonded) {
        placeShell(placed, x, y, element, own, 0, isMetal ? 'cross' : 'dot', 'dot')
      } else if (isMetal) {
        // The metal has lost its whole outer shell, so there is nothing left to draw.
        push(placed, { x, y, r: shellRadius(element), kind: 'charge', label: chargeLabel(own) })
      } else {
        placeShell(placed, x, y, element, own, gainedPerAnion, 'dot', 'cross')
        push(placed, {
          x,
          y,
          r: shellRadius(element),
          kind: 'charge',
          label: chargeLabel(-gainedPerAnion),
        })
      }
    }
  }

  column(species.metalCount, -gap, species.metal, true)
  column(species.nonMetalCount, gap, species.nonMetal, false)
  return placed
}

/** "+", "2+", "−", "2−" — the notation that goes outside the square brackets. */
export function chargeLabel(charge: number): string {
  if (charge === 0) return ''
  const size = Math.abs(charge) === 1 ? '' : String(Math.abs(charge))
  return `${size}${charge > 0 ? '+' : '−'}`
}

function buildCovalent(species: CovalentSpecies, bonded: boolean): Placed {
  const placed: Placed = { bodies: [] }
  const distance = bonded ? BOND_DISTANCE : SEPARATED_DISTANCE
  const n = species.outer.length

  // Outer atoms spread evenly round the central one, starting to the right for one or two
  // of them so that a diatomic molecule sits side by side rather than stacked. Two come
  // out linear, which is how carbon dioxide really is and near enough for the rest — a
  // dot-and-cross diagram is about counting electrons, not about shape.
  const start = n <= 2 ? 0 : Math.PI / 2
  const angles = species.outer.map((_, i) => (i / n) * Math.PI * 2 + start)
  const positions = angles.map((a) => ({ x: distance * Math.cos(a), y: distance * Math.sin(a) }))

  push(placed, { x: 0, y: 0, r: shellRadius(species.central), kind: 'shell', label: species.central })
  species.outer.forEach((o, i) => {
    const p = positions[i]!
    push(placed, { x: p.x, y: p.y, r: shellRadius(o.element), kind: 'shell', label: o.element })
  })

  const centralOuter = OUTER_ELECTRONS[species.central] ?? 0
  const bondElectrons = species.outer.reduce((total, o) => total + o.bondOrder, 0)

  if (bonded) {
    species.outer.forEach((o, i) => {
      placeSharedPairs(placed, { x: 0, y: 0 }, positions[i]!, o.bondOrder)
    })
    placeLonePairs(placed, 0, 0, species.central, centralOuter - bondElectrons, angles, 'dot')
    species.outer.forEach((o, i) => {
      const p = positions[i]!
      const back = angles[i]! + Math.PI
      const own = OUTER_ELECTRONS[o.element] ?? 0
      placeLonePairs(placed, p.x, p.y, o.element, own - o.bondOrder, [back], 'cross')
    })
  } else {
    placeShell(placed, 0, 0, species.central, centralOuter, 0, 'dot', 'dot')
    species.outer.forEach((o, i) => {
      const p = positions[i]!
      placeShell(placed, p.x, p.y, o.element, OUTER_ELECTRONS[o.element] ?? 0, 0, 'cross', 'cross')
    })
  }

  return placed
}

export const bondingKernel: SimKernel<BondingParams, SimResult> = ({ species, bonded }) => {
  const chosen = SPECIES[Math.min(SPECIES.length - 1, Math.max(0, Math.round(species)))]!
  const joined = Math.round(bonded) >= 1
  const analysis = analyse(chosen)

  const { bodies } = chosen.kind === 'ionic' ? buildIonic(chosen, joined) : buildCovalent(chosen, joined)

  const extent = Math.max(...bodies.map((b) => Math.abs(b.y) + (b.r ?? 0)), 1)

  const headline: Bilingual = joined
    ? chosen.kind === 'ionic'
      ? {
          en: `Ionic — ${analysis.electronsTransferred} electron${analysis.electronsTransferred === 1 ? '' : 's'} transferred`,
          zh: `离子键——转移了 ${analysis.electronsTransferred} 个电子`,
        }
      : {
          en: `Covalent — ${analysis.sharedPairs} shared pair${analysis.sharedPairs === 1 ? '' : 's'}`,
          zh: `共价键——共用 ${analysis.sharedPairs} 对电子`,
        }
    : { en: 'Separate atoms, before bonding', zh: '成键前的独立原子' }

  const note: Bilingual = joined
    ? chosen.kind === 'ionic'
      ? {
          en: 'Both ions now have a full outer shell. The bond is the electrostatic attraction between opposite charges.',
          zh: '两种离子的最外层都已填满。离子键就是异号电荷之间的静电引力。',
        }
      : {
          en: 'Each shared pair counts for both atoms, so both reach a full outer shell without either losing an electron.',
          zh: '每对共用电子对两个原子都算数，所以两者都达到满壳层，而谁都没有失去电子。',
        }
    : {
          en: 'Crosses belong to one atom, dots to the other. Watch where the crosses end up.',
          zh: '叉属于一个原子，点属于另一个。注意叉最后去了哪里。',
        }

  return {
    series: [],
    bodies,
    markers: [
      // [0] names the compound; the rest are annotations drawn on the canvas.
      { x: 0, y: 0, label: { en: `${chosen.formula} · ${chosen.label.en}`, zh: chosen.label.zh ?? '' } },
      { x: 0, y: extent + 0.55, label: headline },
      { x: 0, y: -(extent + 0.55), label: note },
    ],
    readouts: {
      sharedPairs: analysis.sharedPairs,
      electronsTransferred: analysis.electronsTransferred,
      outerElectronsWhenBonded: analysis.outerElectronsWhenBonded,
      atoms: analysis.atoms,
    },
  }
}

export default bondingKernel
