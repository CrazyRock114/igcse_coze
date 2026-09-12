import { describe, expect, it } from 'vitest'
import type { SimBody } from '@/content/types'
import {
  OUTER_ELECTRONS,
  SPECIES,
  analyse,
  bondingKernel,
  chargeLabel,
  distributeIntoSlots,
  spreadAngles,
} from './kernel'

const index = (key: string): number => SPECIES.findIndex((s) => s.key === key)

function run(key: string, bonded: number) {
  const r = bondingKernel({ species: index(key), bonded })
  return { ...r, bodies: r.bodies ?? [] }
}

const count = (bodies: SimBody[], kind: string): number => bodies.filter((b) => b.kind === kind).length
const electrons = (bodies: SimBody[]): number => count(bodies, 'dot') + count(bodies, 'cross')

const keys = SPECIES.map((s) => s.key)

describe('distributeIntoSlots', () => {
  it('fills one to a slot before doubling any up', () => {
    // Oxygen: two pairs and two singles, and the singles are what it bonds with.
    expect(distributeIntoSlots(6, 4)).toEqual([2, 2, 1, 1])
    expect(distributeIntoSlots(7, 4)).toEqual([2, 2, 2, 1])
    expect(distributeIntoSlots(8, 4)).toEqual([2, 2, 2, 2])
    expect(distributeIntoSlots(1, 4)).toEqual([1, 0, 0, 0])
    expect(distributeIntoSlots(2, 4)).toEqual([1, 1, 0, 0])
  })

  it('never puts three electrons in one slot', () => {
    for (let e = 0; e <= 8; e++) {
      expect(Math.max(...distributeIntoSlots(e, 4))).toBeLessThanOrEqual(2)
    }
  })

  it('accounts for every electron', () => {
    for (let e = 0; e <= 8; e++) {
      expect(distributeIntoSlots(e, 4).reduce((a, b) => a + b, 0)).toBe(e)
    }
  })
})

describe('spreadAngles', () => {
  it('puts a single position opposite what is already there', () => {
    const [angle] = spreadAngles([0], 1)
    expect(Math.abs(angle! - Math.PI)).toBeLessThan(0.05)
  })

  it('keeps lone pairs well clear of a bond', () => {
    // A lone pair drawn in the overlap between two atoms would be unreadable.
    const bonds = [0]
    for (const angle of spreadAngles(bonds, 3)) {
      const gap = Math.min(...bonds.map((b) => Math.abs(((angle - b + Math.PI) % (2 * Math.PI)) - Math.PI)))
      expect(gap).toBeGreaterThan(0.7)
    }
  })

  it('spreads positions apart from each other, not just from the bonds', () => {
    const angles = spreadAngles([], 4)
    for (let i = 0; i < angles.length; i++) {
      for (let j = i + 1; j < angles.length; j++) {
        const d = Math.abs(((angles[i]! - angles[j]! + Math.PI) % (2 * Math.PI)) - Math.PI)
        expect(d).toBeGreaterThan(1.0)
      }
    }
  })
})

describe('chargeLabel', () => {
  it('omits the 1 and uses a proper minus sign', () => {
    expect(chargeLabel(1)).toBe('+')
    expect(chargeLabel(2)).toBe('2+')
    expect(chargeLabel(-1)).toBe('−')
    expect(chargeLabel(-2)).toBe('2−')
    expect(chargeLabel(0)).toBe('')
  })
})

describe('analyse', () => {
  it('transfers every outer electron the metal has', () => {
    // 0620.2.4.1 — the metal loses its outer shell entirely.
    expect(analyse(SPECIES[index('nacl')]!).electronsTransferred).toBe(1)
    expect(analyse(SPECIES[index('mgo')]!).electronsTransferred).toBe(2)
    expect(analyse(SPECIES[index('mgcl2')]!).electronsTransferred).toBe(2)
  })

  it('leaves every bonded atom with a full outer shell', () => {
    // 0620.2.4.3 and 2.5.1 — the reason both kinds of bonding happen at all.
    for (const species of SPECIES) {
      const full = species.kind === 'covalent' && species.central === 'H' ? 2 : 8
      expect(analyse(species).outerElectronsWhenBonded, species.key).toBe(full)
    }
  })

  it('counts shared pairs, and only for covalent compounds', () => {
    expect(analyse(SPECIES[index('h2')]!).sharedPairs).toBe(1)
    expect(analyse(SPECIES[index('h2o')]!).sharedPairs).toBe(2)
    expect(analyse(SPECIES[index('ch4')]!).sharedPairs).toBe(4)
    expect(analyse(SPECIES[index('o2')]!).sharedPairs).toBe(2)
    expect(analyse(SPECIES[index('n2')]!).sharedPairs).toBe(3)
    expect(analyse(SPECIES[index('co2')]!).sharedPairs).toBe(4)
    expect(analyse(SPECIES[index('nacl')]!).sharedPairs).toBe(0)
  })

  it('never both shares and transfers', () => {
    for (const species of SPECIES) {
      const a = analyse(species)
      expect(a.sharedPairs === 0 || a.electronsTransferred === 0, species.key).toBe(true)
    }
  })
})

describe('the drawing conserves electrons', () => {
  it('draws every outer electron of every atom, before bonding', () => {
    for (const species of SPECIES) {
      const expected =
        species.kind === 'ionic'
          ? (OUTER_ELECTRONS[species.metal] ?? 0) * species.metalCount +
            (OUTER_ELECTRONS[species.nonMetal] ?? 0) * species.nonMetalCount
          : (OUTER_ELECTRONS[species.central] ?? 0) +
            species.outer.reduce((t, o) => t + (OUTER_ELECTRONS[o.element] ?? 0), 0)
      expect(electrons(run(species.key, 0).bodies), species.key).toBe(expected)
    }
  })

  it('draws the same electrons after bonding as before, for covalent compounds', () => {
    // Sharing moves electrons; it does not create or destroy them.
    for (const species of SPECIES.filter((s) => s.kind === 'covalent')) {
      expect(electrons(run(species.key, 1).bodies), species.key).toBe(
        electrons(run(species.key, 0).bodies)
      )
    }
  })

  it('loses the metal’s electrons from the picture when ions form', () => {
    // They are still drawn — as crosses, in the non-metal's shell.
    for (const species of SPECIES.filter((s) => s.kind === 'ionic')) {
      expect(electrons(run(species.key, 1).bodies), species.key).toBe(
        electrons(run(species.key, 0).bodies)
      )
    }
  })

  it('puts the transferred electrons in the anion’s shell as crosses', () => {
    // 0620.2.4.1 — you have to be able to see where the electron went.
    const { bodies } = run('nacl', 1)
    expect(count(bodies, 'cross')).toBe(1)
    expect(count(bodies, 'dot')).toBe(7)

    const mgcl2 = run('mgcl2', 1).bodies
    expect(count(mgcl2, 'cross')).toBe(2) // one into each chloride
    expect(count(mgcl2, 'dot')).toBe(14)
  })

  it('leaves the metal ion with nothing in its outer shell', () => {
    for (const species of SPECIES.filter((s) => s.kind === 'ionic')) {
      const { bodies } = run(species.key, 1)
      const metalShell = bodies.find((b) => b.kind === 'ion' && b.label === species.metal)!
      const near = bodies.filter(
        (b) =>
          (b.kind === 'dot' || b.kind === 'cross') &&
          Math.hypot(b.x - metalShell.x, b.y - metalShell.y) < 0.9
      )
      expect(near, species.key).toHaveLength(0)
    }
  })
})

describe('covalent drawings', () => {
  it('puts every shared pair in the overlap between the two atoms it joins', () => {
    for (const species of SPECIES.filter((s) => s.kind === 'covalent')) {
      const bonded = run(species.key, 1)
      const central = bonded.bodies.find((b) => b.kind === 'shell')!
      // Bond midpoints: halfway from the central nucleus to each of the others.
      const midpoints = bonded.bodies
        .filter((b) => b.kind === 'shell' && b !== central)
        .map((b) => ({ x: (b.x + central.x) / 2, y: (b.y + central.y) / 2 }))

      const shared = bonded.bodies.filter(
        (b) =>
          (b.kind === 'dot' || b.kind === 'cross') &&
          midpoints.some((m) => Math.hypot(b.x - m.x, b.y - m.y) < 0.25)
      )
      expect(shared.length, species.key).toBe(analyse(species).sharedPairs * 2)
    }
  })

  it('gives a double bond two pairs and a triple bond three, drawn apart', () => {
    expect(analyse(SPECIES[index('o2')]!).sharedPairs).toBe(2)
    expect(analyse(SPECIES[index('n2')]!).sharedPairs).toBe(3)

    // Three separate pairs stacked across the bond, not one blob of six.
    const n2 = run('n2', 1).bodies.filter((b) => b.kind === 'dot' || b.kind === 'cross')
    const central = run('n2', 1).bodies.find((b) => b.kind === 'shell')!
    const other = run('n2', 1).bodies.filter((b) => b.kind === 'shell')[1]!
    const mid = { x: (central.x + other.x) / 2, y: (central.y + other.y) / 2 }

    const shared = n2.filter((b) => Math.hypot(b.x - mid.x, b.y - mid.y) < 0.25)
    expect(shared).toHaveLength(6)
    // The three pairs sit at three distinct offsets across the bond axis.
    expect(new Set(shared.map((b) => b.y.toFixed(3))).size).toBe(3)
  })

  it('lays a diatomic molecule out side by side, not stacked', () => {
    for (const key of ['h2', 'o2', 'n2', 'hcl']) {
      const shells = run(key, 1).bodies.filter((b) => b.kind === 'shell')
      expect(shells, key).toHaveLength(2)
      expect(Math.abs(shells[0]!.y - shells[1]!.y), key).toBeLessThan(0.01)
      expect(Math.abs(shells[0]!.x - shells[1]!.x), key).toBeGreaterThan(0.5)
    }
  })

  it('draws hydrogen with a smaller shell than the atom it bonds to', () => {
    const { bodies } = run('ch4', 1)
    const carbon = bodies.find((b) => b.kind === 'shell' && b.label === 'C')!
    const hydrogen = bodies.find((b) => b.kind === 'shell' && b.label === 'H')!
    expect(hydrogen.r!).toBeLessThan(carbon.r!)
  })

  it('moves the atoms together when they bond', () => {
    for (const species of SPECIES.filter((s) => s.kind === 'covalent')) {
      const apart = run(species.key, 0).bodies.filter((b) => b.kind === 'shell')
      const joined = run(species.key, 1).bodies.filter((b) => b.kind === 'shell')
      const spread = (bs: SimBody[]) => Math.max(...bs.map((b) => Math.hypot(b.x, b.y)))
      expect(spread(joined), species.key).toBeLessThan(spread(apart))
    }
  })
})

describe('bondingKernel', () => {
  it('names the compound with its formula', () => {
    expect(run('h2o', 1).markers![0]!.label.en).toBe('H₂O · Water')
    expect(run('nacl', 1).markers![0]!.label.en).toBe('NaCl · Sodium chloride')
  })

  it('says which kind of bonding it is once the atoms have joined', () => {
    expect(run('nacl', 1).markers![1]!.label.en).toMatch(/^Ionic/)
    expect(run('h2o', 1).markers![1]!.label.en).toMatch(/^Covalent/)
    expect(run('h2o', 0).markers![1]!.label.en).toMatch(/before bonding/)
  })

  it('reports readings that match the analysis', () => {
    for (const species of SPECIES) {
      const r = run(species.key, 1)
      const a = analyse(species)
      expect(r.readouts['sharedPairs'], species.key).toBe(a.sharedPairs)
      expect(r.readouts['electronsTransferred'], species.key).toBe(a.electronsTransferred)
      expect(r.readouts['atoms'], species.key).toBe(a.atoms)
    }
  })

  it('draws one shell per atom', () => {
    for (const key of keys) {
      const { bodies } = run(key, 1)
      const shells = count(bodies, 'shell') + count(bodies, 'ion')
      expect(shells, key).toBe(run(key, 1).readouts['atoms'])
    }
  })

  it('gives every ion a charge label', () => {
    for (const species of SPECIES.filter((s) => s.kind === 'ionic')) {
      const { bodies } = run(species.key, 1)
      expect(count(bodies, 'charge'), species.key).toBe(analyse(species).atoms)
      expect(bodies.filter((b) => b.kind === 'charge').every((b) => b.label)).toBe(true)
    }
    // A molecule has no charges to label.
    expect(count(run('h2o', 1).bodies, 'charge')).toBe(0)
  })

  it('clamps parameters outside their range', () => {
    expect(bondingKernel({ species: -5, bonded: 1 }).readouts['electronsTransferred']).toBe(1)
    expect(bondingKernel({ species: 99, bonded: 1 }).readouts['sharedPairs']).toBe(3)
  })

  it('is finite everywhere across the parameter range', () => {
    for (const key of keys) {
      for (const bonded of [0, 1]) {
        const r = run(key, bonded)
        for (const [k, v] of Object.entries(r.readouts)) {
          expect(Number.isFinite(v), `${k} ${key} bonded=${bonded}`).toBe(true)
        }
        for (const b of r.bodies) {
          expect(Number.isFinite(b.x) && Number.isFinite(b.y), key).toBe(true)
        }
        expect(r.markers!.every((m) => m.label.zh)).toBe(true)
      }
    }
  })
})
