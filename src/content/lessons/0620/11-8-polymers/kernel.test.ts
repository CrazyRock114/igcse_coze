import { describe, expect, it } from 'vitest'
import type { SimLink } from '@/content/types'
import { molecularFormula, relativeMolecularMass } from '@/lib/molecularFormula'
import { MONOMERS, buildMonomers, buildPolymer, polymerKernel } from './kernel'

const MONOMER_STAGE = 0
const POLYMER_STAGE = 1

const index = (key: string): number => MONOMERS.findIndex((m) => m.key === key)

function run(key: string, repeatUnits: number, polymerised: number) {
  const r = polymerKernel({ monomer: index(key), repeatUnits, polymerised })
  return { ...r, formula: molecularFormula(r.bodies!), name: r.markers![0]!.label.en }
}

function valence(links: SimLink[], i: number): number {
  return links
    .filter((l) => l.a === i || l.b === i)
    .reduce((total, l) => total + (l.order ?? 1), 0)
}

const keys = MONOMERS.map((m) => m.key)

describe('MONOMERS', () => {
  it('offers the three addition polymers 0620 names', () => {
    expect(keys).toEqual(['ethene', 'chloroethene', 'tetrafluoroethene'])
  })

  it('gives every monomer exactly four substituents, since each carbon takes two', () => {
    for (const m of MONOMERS) {
      expect(m.left).toHaveLength(2)
      expect(m.right).toHaveLength(2)
    }
  })

  it('names the plastic as well as the polymer, since exams use both', () => {
    expect(MONOMERS[1]!.polymerName.en).toBe('poly(chloroethene)')
    expect(MONOMERS[1]!.commonName!.en).toBe('PVC')
  })
})

describe('buildMonomers', () => {
  it('gives each monomer one C=C', () => {
    // 0620.11.8.6 — the double bond is what makes addition polymerisation possible.
    for (const key of keys) {
      const { links } = buildMonomers(MONOMERS[index(key)]!, 3)
      expect(links.filter((l) => l.order === 2), key).toHaveLength(3)
    }
  })

  it('builds the right monomer formulae', () => {
    expect(molecularFormula(buildMonomers(MONOMERS[0]!, 1).bodies)).toBe('C₂H₄')
    expect(molecularFormula(buildMonomers(MONOMERS[1]!, 1).bodies)).toBe('C₂H₃Cl')
    expect(molecularFormula(buildMonomers(MONOMERS[2]!, 1).bodies)).toBe('C₂F₄')
  })

  it('keeps separate molecules apart', () => {
    // They must read as three molecules, not one long one.
    const { bodies, links } = buildMonomers(MONOMERS[0]!, 3)
    const seen = new Set(bodies.map((b) => `${b.x},${b.y}`))
    expect(seen.size).toBe(bodies.length)
    // No bond spans the gap between one molecule and the next.
    for (const l of links) {
      expect(Math.hypot(bodies[l.a]!.x - bodies[l.b]!.x, bodies[l.a]!.y - bodies[l.b]!.y)).toBe(1)
    }
  })
})

describe('buildPolymer', () => {
  it('has no double bonds left', () => {
    // 0620.11.8.2 — every C=C opened to make the chain.
    for (const key of keys) {
      const { links } = buildPolymer(MONOMERS[index(key)]!, 3)
      expect(links.filter((l) => l.order === 2), key).toHaveLength(0)
    }
  })

  it('joins the repeat units into one chain', () => {
    const { bodies, links } = buildPolymer(MONOMERS[0]!, 3)
    const carbons = bodies.map((b, i) => [b, i] as const).filter(([b]) => b.kind === 'C')
    expect(carbons).toHaveLength(6)
    // Consecutive carbons are bonded, so the chain is continuous.
    for (let i = 0; i < carbons.length - 1; i++) {
      const a = carbons[i]![1]
      const b = carbons[i + 1]![1]
      expect(links.some((l) => (l.a === a && l.b === b) || (l.a === b && l.b === a))).toBe(true)
    }
  })

  it('sticks a bond out at each end, because the chain carries on', () => {
    const { bodies, links } = buildPolymer(MONOMERS[0]!, 2)
    const stubs = bodies.map((b, i) => [b, i] as const).filter(([b]) => !b.kind)
    expect(stubs).toHaveLength(2)
    for (const [, i] of stubs) {
      expect(valence(links, i)).toBe(1)
    }
  })

  it('gives every carbon four bonds, counting the bonds to the next unit', () => {
    for (const key of keys) {
      for (let n = 1; n <= 4; n++) {
        const { bodies, links } = buildPolymer(MONOMERS[index(key)]!, n)
        bodies.forEach((b, i) => {
          if (b.kind === 'C') expect(valence(links, i), `${key} n=${n} C${i}`).toBe(4)
          if (b.kind && b.kind !== 'C') expect(valence(links, i), `${key} n=${n}`).toBe(1)
        })
      }
    }
  })

  it('never puts two atoms in the same place', () => {
    for (const key of keys) {
      for (let n = 1; n <= 4; n++) {
        const { bodies } = buildPolymer(MONOMERS[index(key)]!, n)
        const seen = new Set(bodies.map((b) => `${b.x},${b.y}`))
        expect(seen.size, `${key} n=${n}`).toBe(bodies.length)
      }
    }
  })

  it('bonds only atoms one bond length apart', () => {
    for (const key of keys) {
      for (let n = 1; n <= 4; n++) {
        const { bodies, links } = buildPolymer(MONOMERS[index(key)]!, n)
        for (const l of links) {
          const a = bodies[l.a]!
          const b = bodies[l.b]!
          expect(Math.hypot(a.x - b.x, a.y - b.y), `${key} n=${n}`).toBeCloseTo(1, 9)
        }
      }
    }
  })
})

describe('addition polymerisation loses nothing', () => {
  it('gives the polymer exactly the same molecular formula as its monomers', () => {
    // 0620.11.8.2 and 11.8.8 — this is the whole difference from condensation
    // polymerisation, where a small molecule is expelled at every join.
    for (const key of keys) {
      for (let n = 1; n <= 4; n++) {
        expect(run(key, n, POLYMER_STAGE).formula, `${key} n=${n}`).toBe(
          run(key, n, MONOMER_STAGE).formula
        )
      }
    }
  })

  it('keeps the same relative molecular mass and atom count', () => {
    for (const key of keys) {
      for (let n = 1; n <= 4; n++) {
        const monomers = run(key, n, MONOMER_STAGE)
        const polymer = run(key, n, POLYMER_STAGE)
        expect(polymer.readouts['relativeMolecularMass']).toBe(
          monomers.readouts['relativeMolecularMass']
        )
        expect(polymer.readouts['atoms']).toBe(monomers.readouts['atoms'])
      }
    }
  })

  it('scales the mass in exact multiples of the repeat unit', () => {
    // 0620.11.8.1 — a polymer is many identical units, so its mass is n times one of them.
    for (const key of keys) {
      const unit = run(key, 1, POLYMER_STAGE).readouts['repeatUnitMass']!
      for (let n = 1; n <= 4; n++) {
        expect(run(key, n, POLYMER_STAGE).readouts['relativeMolecularMass'], `${key} n=${n}`).toBe(
          unit * n
        )
      }
    }
  })

  it('reports a repeat unit mass that does not change with chain length', () => {
    for (const key of keys) {
      const masses = [1, 2, 3, 4].map((n) => run(key, n, POLYMER_STAGE).readouts['repeatUnitMass'])
      expect(new Set(masses).size, key).toBe(1)
    }
  })

  it('gets the repeat unit masses right', () => {
    expect(run('ethene', 1, POLYMER_STAGE).readouts['repeatUnitMass']).toBe(28)
    expect(run('chloroethene', 1, POLYMER_STAGE).readouts['repeatUnitMass']).toBe(62.5)
    expect(run('tetrafluoroethene', 1, POLYMER_STAGE).readouts['repeatUnitMass']).toBe(100)
  })
})

describe('polymerKernel', () => {
  it('names the polymer and the plastic', () => {
    expect(run('ethene', 2, POLYMER_STAGE).name).toBe('poly(ethene) — polythene')
    expect(run('chloroethene', 2, POLYMER_STAGE).name).toBe('poly(chloroethene) — PVC')
  })

  it('names the monomers by how many there are', () => {
    expect(run('ethene', 3, MONOMER_STAGE).name).toBe('3 × ethene')
  })

  it('says how many repeat units are shown, not how many the polymer has', () => {
    // A real chain has thousands; the drawing shows a section of it.
    expect(run('ethene', 1, POLYMER_STAGE).markers![1]!.label.en).toMatch(/1 repeat unit shown/)
    expect(run('ethene', 3, POLYMER_STAGE).markers![1]!.label.en).toMatch(/3 repeat units shown/)
  })

  it('clamps parameters outside their range', () => {
    expect(run('ethene', 99, POLYMER_STAGE).readouts['repeatUnits']).toBe(4)
    expect(run('ethene', 0, POLYMER_STAGE).readouts['repeatUnits']).toBe(1)
    expect(polymerKernel({ monomer: 99, repeatUnits: 1, polymerised: 1 }).readouts['repeatUnitMass']).toBe(100)
  })

  it('is finite everywhere across the parameter range', () => {
    for (const key of keys) {
      for (let n = 1; n <= 4; n++) {
        for (const stage of [MONOMER_STAGE, POLYMER_STAGE]) {
          const r = run(key, n, stage)
          for (const [k, v] of Object.entries(r.readouts)) {
            expect(Number.isFinite(v), `${k} ${key} n=${n} stage=${stage}`).toBe(true)
          }
          expect(r.markers!.every((m) => m.label.zh)).toBe(true)
        }
      }
    }
  })

  it('reports a mass built only from atoms that are actually drawn', () => {
    for (const key of keys) {
      const r = run(key, 3, POLYMER_STAGE)
      expect(r.readouts['relativeMolecularMass']).toBe(relativeMolecularMass(r.bodies!))
    }
  })
})
