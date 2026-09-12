/**
 * Giant structures — kernel for lesson 0620/2-6-giant-structures.
 *
 * Four structures drawn from the same code: diamond, graphite, silicon(IV) oxide and a metal.
 * Each is generated as a set of atom positions with bonds worked out by distance, so the
 * geometry is computed rather than drawn by hand and the bond count per atom is a fact the
 * tests can check rather than an illustration that might be wrong.
 *
 * The point of putting them side by side is that every property in this topic falls out of
 * the picture, and none of it has to be memorised:
 *
 *   - Diamond: every carbon bonded to four others in a rigid three-dimensional network. No
 *     free electrons and nothing that can slide, so it is extremely hard and does not conduct.
 *   - Graphite: every carbon bonded to only three, in flat layers with nothing but weak forces
 *     between the layers. The fourth outer electron is delocalised, so graphite conducts; the
 *     layers slide, so it is soft and slippery. Same element, opposite properties.
 *   - Silicon(IV) oxide: the diamond network with an oxygen bridging every silicon–silicon
 *     bond. Each silicon still has four bonds, each oxygen has two — which is where the
 *     formula SiO₂ comes from.
 *   - A metal: positive ions in a regular lattice with a sea of delocalised electrons. The
 *     electrons move, so metals conduct; the layers slide, so metals are malleable.
 *
 * There is deliberately no melting-point readout. Diamond and graphite do not melt at ordinary
 * pressure at all — they sublime — so quoting one for them would be a small lie told with a
 * number beside it. The temperatures that do exist are in the notes, where they can be
 * qualified. What is reported instead is the count of delocalised electrons, which is the
 * quantity that genuinely separates the four: none in diamond or silica, and both of those
 * are insulators.
 *
 * Covers 0620.2.6.1–3 and 2.7.1–2.
 */

import type { SimBody, SimKernel, SimLink, SimResult } from '@/content/types'

export interface GiantParams extends Record<string, number> {
  /** 0 diamond · 1 graphite · 2 silicon(IV) oxide · 3 a metal. */
  structure: number
}

export const DIAMOND = 0
export const GRAPHITE = 1
export const SILICA = 2
export const METAL = 3

const key = (x: number, y: number) => `${x.toFixed(3)},${y.toFixed(3)}`

/** Bonds every pair of points that sit a given distance apart. */
export function bondByDistance(
  points: Array<{ x: number; y: number }>,
  distance: number,
  tolerance = 0.05,
): SimLink[] {
  const links: SimLink[] = []
  for (let a = 0; a < points.length; a++) {
    for (let b = a + 1; b < points.length; b++) {
      const pa = points[a]!
      const pb = points[b]!
      if (Math.abs(Math.hypot(pa.x - pb.x, pa.y - pb.y) - distance) < tolerance) {
        links.push({ a, b })
      }
    }
  }
  return links
}

/** How many bonds each atom has, by index. */
export function bondCounts(atomCount: number, links: SimLink[]): number[] {
  const counts = new Array<number>(atomCount).fill(0)
  for (const l of links) {
    counts[l.a] = (counts[l.a] ?? 0) + 1
    counts[l.b] = (counts[l.b] ?? 0) + 1
  }
  return counts
}

/**
 * The diamond network, as a two-dimensional projection.
 *
 * Rows alternate offset so that every interior atom has four neighbours — the real
 * coordination number, which is the one thing a flat drawing of diamond has to get right.
 */
export function diamondPositions(): Array<{ x: number; y: number }> {
  const points: Array<{ x: number; y: number }> = []
  for (let row = 0; row <= 4; row++) {
    const offset = row % 2 === 0 ? 0 : 1
    for (let i = 0; i * 2 + offset <= 8; i++) {
      points.push({ x: i * 2 + offset, y: row })
    }
  }
  return points
}

/** One flat layer of graphite: hexagons sharing edges, every carbon bonded to three. */
export function graphiteLayer(hexagons: number, yOffset: number): Array<{ x: number; y: number }> {
  const seen = new Set<string>()
  const points: Array<{ x: number; y: number }> = []
  for (let h = 0; h < hexagons; h++) {
    const cx = h * Math.sqrt(3)
    for (let v = 0; v < 6; v++) {
      const angle = (Math.PI / 180) * (30 + v * 60)
      const x = Math.round((cx + Math.cos(angle)) * 1000) / 1000
      const y = Math.round((yOffset + Math.sin(angle)) * 1000) / 1000
      if (!seen.has(key(x, y))) {
        seen.add(key(x, y))
        points.push({ x, y })
      }
    }
  }
  return points
}

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))

export const giantKernel: SimKernel<GiantParams, SimResult> = (params) => {
  const structure = clamp(Math.round(params['structure'] ?? DIAMOND), DIAMOND, METAL)

  let bodies: SimBody[] = []
  let links: SimLink[] = []
  let bondsPerAtom = 0
  let bounds = { xMin: -1, xMax: 9, yMin: -1, yMax: 5 }
  let name = { en: '', zh: '' }
  let headline = { en: '', zh: '' }
  let note = { en: '', zh: '' }

  if (structure === DIAMOND) {
    const points = diamondPositions()
    links = bondByDistance(points, Math.SQRT2)
    bodies = points.map((p) => ({ ...p, r: 0.34, kind: 'atom', label: 'C' }))
    bondsPerAtom = 4
    name = { en: 'diamond', zh: '金刚石' }
    headline = {
      en: 'Diamond — every carbon bonded to four others',
      zh: '金刚石——每个碳原子与另外四个成键',
    }
    note = {
      en: 'A rigid three-dimensional network of strong covalent bonds running right through the crystal. There are no free electrons, so diamond does not conduct electricity, and nothing can slide, so it is the hardest natural substance — which is why it is used in cutting tools and drill tips. At ordinary pressure it has no melting point at all: heated far enough, it turns straight to gas.',
      zh: '强共价键构成的刚性三维网状结构贯穿整块晶体。没有自由电子，所以金刚石不导电；没有可滑动的部分，所以它是最硬的天然物质——因此用于切割工具和钻头。在常压下它根本没有熔点：加热到足够高时它直接变成气体。',
    }
  } else if (structure === GRAPHITE) {
    const lower = graphiteLayer(4, 0)
    const upper = graphiteLayer(4, 3.2)
    const points = [...lower, ...upper]
    // Bonds only within a layer: at 3.2 apart the layers are far outside bonding range,
    // which is the whole reason graphite behaves as it does.
    links = bondByDistance(points, 1)
    bodies = points.map((p) => ({ ...p, r: 0.3, kind: 'atom', label: 'C' }))
    // Delocalised electrons drawn between the layers, where the fourth outer electron goes.
    for (let i = 0; i < 7; i++) {
      bodies.push({ x: i * 0.9 + 0.2, y: 1.85, r: 0.12, kind: 'electron' })
    }
    bondsPerAtom = 3
    bounds = { xMin: -1.4, xMax: 6.6, yMin: -1.4, yMax: 4.6 }
    name = { en: 'graphite', zh: '石墨' }
    headline = {
      en: 'Graphite — every carbon bonded to only three, in flat layers',
      zh: '石墨——每个碳原子只与另外三个成键，形成平面层',
    }
    note = {
      en: 'Each carbon uses three of its four outer electrons for bonding, so the fourth is delocalised and free to move between the layers — which is why graphite conducts electricity while diamond does not. Only weak forces hold the layers together, so they slide over one another easily, making graphite soft and slippery enough to use as a lubricant and in pencils.',
      zh: '每个碳用四个外层电子中的三个成键，第四个电子离域，可以在层间自由移动——这正是石墨导电而金刚石不导电的原因。层与层之间只有微弱的作用力，因此容易相互滑动，使石墨柔软滑腻，可用作润滑剂和铅笔芯。',
    }
  } else if (structure === SILICA) {
    const silicon = diamondPositions()
    const siliconLinks = bondByDistance(silicon, Math.SQRT2)
    const points = silicon.map((p) => ({ ...p }))
    // An oxygen sits at the midpoint of every silicon–silicon bond, so each silicon keeps
    // its four bonds while each oxygen has exactly two. That ratio is the formula SiO₂.
    for (const l of siliconLinks) {
      const a = silicon[l.a]!
      const b = silicon[l.b]!
      const index = points.length
      points.push({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 })
      links.push({ a: l.a, b: index }, { a: index, b: l.b })
    }
    bodies = points.map((p, i) => ({
      ...p,
      r: i < silicon.length ? 0.34 : 0.26,
      kind: i < silicon.length ? 'atom' : 'other',
      label: i < silicon.length ? 'Si' : 'O',
    }))
    bondsPerAtom = 4
    name = { en: 'silicon(IV) oxide', zh: '二氧化硅' }
    headline = {
      en: 'Silicon(IV) oxide — the diamond network with an oxygen in every bond',
      zh: '二氧化硅——在金刚石网络的每一条键上插入一个氧',
    }
    note = {
      en: 'Each silicon is bonded to four oxygens and each oxygen to two silicons, which is where the formula SiO₂ comes from — there are twice as many oxygen atoms as silicon. The structure and properties are those of diamond: a rigid covalent network, very hard, melting at about 1710 °C, and no free electrons to carry a current. This is what sand and quartz are.',
      zh: '每个硅与四个氧成键，每个氧与两个硅成键，化学式 SiO₂ 正由此而来——氧原子数是硅的两倍。其结构与性质都与金刚石相似：刚性共价网络、非常硬、约在 1710 °C 熔化、没有自由电子导电。沙子和石英就是这种物质。',
    }
  } else {
    const points: Array<{ x: number; y: number }> = []
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 6; col++) points.push({ x: col * 1.4, y: row * 1.4 })
    }
    bodies = points.map((p) => ({ ...p, r: 0.42, kind: 'ion', label: '+' }))
    // Electrons in the gaps between the ions — the sea, not attached to any one atom.
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 5; col++) {
        bodies.push({ x: col * 1.4 + 0.7, y: row * 1.4 + 0.7, r: 0.14, kind: 'electron' })
      }
    }
    bondsPerAtom = 0
    bounds = { xMin: -1, xMax: 8, yMin: -1, yMax: 5.2 }
    name = { en: 'a metal', zh: '金属' }
    headline = {
      en: 'A metal — positive ions in a sea of delocalised electrons',
      zh: '金属——浸在离域电子海中的正离子',
    }
    note = {
      en: 'Metallic bonding is the attraction between the lattice of positive ions and the delocalised electrons moving freely between them. The electrons are free to move, so metals conduct electricity and heat well. The ions are all identical, so layers can slide over one another without breaking the bonding — which is why metals can be bent and hammered into shape rather than shattering.',
      zh: '金属键是正离子晶格与在其间自由移动的离域电子之间的吸引。电子可以自由移动，因此金属导电导热良好。离子彼此相同，因此层与层可以相互滑动而不破坏金属键——这正是金属能被弯折和锤打成形而不碎裂的原因。',
    }
  }

  const atoms = bodies.filter((b) => b.kind !== 'electron').length
  const counts = bondCounts(atoms, links)

  return {
    series: [],
    bodies,
    links,
    bounds,
    readouts: {
      bondsPerAtom,
      atomsShown: atoms,
      bondsShown: links.length,
      // The quantity that actually separates these four. Diamond and silica have none and
      // do not conduct; graphite and the metal have them and do.
      delocalisedElectrons: bodies.filter((b) => b.kind === 'electron').length,
      maxBondsOnAnyAtom: counts.length > 0 ? Math.max(...counts) : 0,
    },
    markers: [
      { x: 0, y: 0, label: name },
      { x: 0, y: 0, label: headline },
      { x: 0, y: 0, label: note },
    ],
  }
}

export default giantKernel
