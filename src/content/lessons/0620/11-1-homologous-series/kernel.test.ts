import { describe, expect, it } from 'vitest'
import type { SimBody, SimLink } from '@/content/types'
import { molecularFormula, relativeMolecularMass } from '@/lib/molecularFormula'
import { buildStructure, minimumCarbons } from '@/lib/organic'
import { FAMILIES, moleculeKernel } from './kernel'

/** Total bond order on a given atom — what its valence must equal. */
function valence(links: SimLink[], index: number): number {
  return links
    .filter((l) => l.a === index || l.b === index)
    .reduce((total, l) => total + (l.order ?? 1), 0)
}

function structureOf(familyKey: string, n: number) {
  const { bodies, links } = buildStructure(familyKey, n)
  return { bodies, links, formula: molecularFormula(bodies) }
}

const familyKeys = FAMILIES.map((f) => f.key)

describe('FAMILIES', () => {
  it('covers the four series 0620 names', () => {
    expect(familyKeys).toEqual(['alkane', 'alkene', 'alcohol', 'acid'])
  })

  it('has no one-carbon alkene, because a C=C needs two carbons', () => {
    const alkene = FAMILIES[1]!
    expect(alkene.names[0]).toBeNull()
    expect(alkene.boilingPoints[0]).toBeNull()
    expect(minimumCarbons('alkene')).toBe(2)
    expect(minimumCarbons('alkane')).toBe(1)
  })

  it('names the first four members of each series', () => {
    expect(FAMILIES[0]!.names.map((n) => n?.en)).toEqual([
      'methane',
      'ethane',
      'propane',
      'butane',
    ])
    expect(FAMILIES[2]!.names.map((n) => n?.en)).toEqual([
      'methanol',
      'ethanol',
      'propan-1-ol',
      'butan-1-ol',
    ])
  })

  it('gives every named member a boiling point', () => {
    for (const family of FAMILIES) {
      family.names.forEach((name, i) => {
        expect(name === null).toBe(family.boilingPoints[i] === null)
      })
    }
  })

  it('boils higher as the chain gets longer, in every series', () => {
    // 0620.11.1.5 — a homologous series shows a gradual change in physical properties.
    for (const family of FAMILIES) {
      const points = family.boilingPoints.filter((b): b is number => b !== null)
      for (let i = 1; i < points.length; i++) {
        expect(points[i]!).toBeGreaterThan(points[i - 1]!)
      }
    }
  })
})

describe('buildStructure', () => {
  describe('valence', () => {
    it('gives every carbon exactly four bonds', () => {
      // The single rule the whole drawing is built from.
      for (const key of familyKeys) {
        for (let n = minimumCarbons(key); n <= 4; n++) {
          const { bodies, links } = structureOf(key, n)
          bodies.forEach((b, i) => {
            if (b.kind === 'C') expect(valence(links, i), `${key} n=${n} carbon ${i}`).toBe(4)
          })
        }
      }
    })

    it('gives every hydrogen exactly one bond and every oxygen two', () => {
      for (const key of familyKeys) {
        for (let n = minimumCarbons(key); n <= 4; n++) {
          const { bodies, links } = structureOf(key, n)
          bodies.forEach((b, i) => {
            if (b.kind === 'H') expect(valence(links, i), `${key} n=${n} H${i}`).toBe(1)
            if (b.kind === 'O') expect(valence(links, i), `${key} n=${n} O${i}`).toBe(2)
          })
        }
      }
    })
  })

  describe('molecular formulae', () => {
    it('builds the alkanes', () => {
      expect(structureOf('alkane', 1).formula).toBe('CH₄')
      expect(structureOf('alkane', 2).formula).toBe('C₂H₆')
      expect(structureOf('alkane', 3).formula).toBe('C₃H₈')
      expect(structureOf('alkane', 4).formula).toBe('C₄H₁₀')
    })

    it('builds the alkenes', () => {
      expect(structureOf('alkene', 2).formula).toBe('C₂H₄')
      expect(structureOf('alkene', 3).formula).toBe('C₃H₆')
      expect(structureOf('alkene', 4).formula).toBe('C₄H₈')
    })

    it('builds the alcohols', () => {
      expect(structureOf('alcohol', 1).formula).toBe('CH₄O')
      expect(structureOf('alcohol', 2).formula).toBe('C₂H₆O')
      expect(structureOf('alcohol', 3).formula).toBe('C₃H₈O')
      expect(structureOf('alcohol', 4).formula).toBe('C₄H₁₀O')
    })

    it('builds the carboxylic acids', () => {
      expect(structureOf('acid', 1).formula).toBe('CH₂O₂')
      expect(structureOf('acid', 2).formula).toBe('C₂H₄O₂')
      expect(structureOf('acid', 3).formula).toBe('C₃H₆O₂')
      expect(structureOf('acid', 4).formula).toBe('C₄H₈O₂')
    })

    it('matches each family’s general formula', () => {
      // CₙH₂ₙ₊₂, CₙH₂ₙ, CₙH₂ₙ₊₁OH and CₙH₂ₙ₊₁COOH, checked as arithmetic on the atoms drawn.
      const expectedHydrogens: Record<string, (n: number) => number> = {
        alkane: (n) => 2 * n + 2,
        alkene: (n) => 2 * n,
        alcohol: (n) => 2 * n + 2,
        // CₙH₂ₙ₊₁COOH has n+1 carbons in total, so in terms of total carbons m it is
        // C(m)H(2m)O₂.
        acid: (n) => 2 * n,
      }
      for (const key of familyKeys) {
        for (let n = minimumCarbons(key); n <= 4; n++) {
          const { bodies } = structureOf(key, n)
          const h = bodies.filter((b) => b.kind === 'H').length
          expect(h, `${key} n=${n}`).toBe(expectedHydrogens[key]!(n))
        }
      }
    })

    it('adds exactly one CH₂ between consecutive members', () => {
      // 0620.11.1.4 — the definition of a homologous series.
      for (const key of familyKeys) {
        for (let n = minimumCarbons(key); n < 4; n++) {
          const a = structureOf(key, n).bodies
          const b = structureOf(key, n + 1).bodies
          expect(count(b, 'C') - count(a, 'C'), `${key} carbons ${n}→${n + 1}`).toBe(1)
          expect(count(b, 'H') - count(a, 'H'), `${key} hydrogens ${n}→${n + 1}`).toBe(2)
          expect(count(b, 'O')).toBe(count(a, 'O'))
        }
      }
    })

    it('adds exactly 14 to the relative molecular mass each step', () => {
      // Which is what a CH₂ weighs: 12 + 2.
      for (const key of familyKeys) {
        for (let n = minimumCarbons(key); n < 4; n++) {
          const a = relativeMolecularMass(structureOf(key, n).bodies)
          const b = relativeMolecularMass(structureOf(key, n + 1).bodies)
          expect(b - a, `${key} n=${n}`).toBe(14)
        }
      }
    })
  })

  describe('functional groups', () => {
    it('gives an alkane only single bonds', () => {
      // 0620.11.4.1 — alkanes are saturated.
      for (let n = 1; n <= 4; n++) {
        const { links } = structureOf('alkane', n)
        expect(links.every((l) => (l.order ?? 1) === 1)).toBe(true)
      }
    })

    it('gives an alkene exactly one carbon–carbon double bond', () => {
      // 0620.11.5.1 — alkenes are unsaturated.
      for (let n = 2; n <= 4; n++) {
        const { bodies, links } = structureOf('alkene', n)
        const doubles = links.filter((l) => l.order === 2)
        expect(doubles).toHaveLength(1)
        const [d] = doubles
        expect(bodies[d!.a]!.kind).toBe('C')
        expect(bodies[d!.b]!.kind).toBe('C')
      }
    })

    it('gives an alcohol one O bonded to a carbon and a hydrogen', () => {
      const { bodies, links } = structureOf('alcohol', 2)
      const oxygens = bodies.map((b, i) => [b, i] as const).filter(([b]) => b.kind === 'O')
      expect(oxygens).toHaveLength(1)
      const [, o] = oxygens[0]!
      const neighbours = links
        .filter((l) => l.a === o || l.b === o)
        .map((l) => bodies[l.a === o ? l.b : l.a]!.kind)
      expect(neighbours.sort()).toEqual(['C', 'H'])
    })

    it('gives a carboxylic acid a C=O and a C–O–H', () => {
      // 0620.11.7 — the –COOH group, drawn as the syllabus prints it.
      const { bodies, links } = structureOf('acid', 2)
      expect(bodies.filter((b) => b.kind === 'O')).toHaveLength(2)
      const carbonyl = links.find((l) => l.order === 2)!
      expect([bodies[carbonyl.a]!.kind, bodies[carbonyl.b]!.kind].sort()).toEqual(['C', 'O'])
    })

    it('marks the functional group so the drawing can pick it out', () => {
      for (const key of ['alkene', 'alcohol', 'acid']) {
        const { links } = structureOf(key, 2)
        expect(links.some((l) => l.kind === 'functional'), key).toBe(true)
      }
      expect(structureOf('alkane', 2).links.some((l) => l.kind === 'functional')).toBe(false)
    })
  })

  describe('where the hydrogens go', () => {
    /** Positions of the hydrogens bonded to carbon `c`, sorted for comparison. */
    function hydrogensOn(familyKey: string, n: number, c: number): string[] {
      const { bodies, links } = structureOf(familyKey, n)
      return links
        .filter((l) => l.a === c || l.b === c)
        .map((l) => bodies[l.a === c ? l.b : l.a]!)
        .filter((b) => b.kind === 'H')
        .map((b) => `${b.x},${b.y}`)
        .sort()
    }

    it('draws a terminal CH₂ symmetrically, above and below', () => {
      // Ethene is the most-drawn molecule in the topic and it has to look like the one in
      // the textbook: H above and below each carbon, not one tucked out to the side.
      expect(hydrogensOn('alkene', 2, 0)).toEqual(['0,-1', '0,1'])
      expect(hydrogensOn('alkene', 2, 1)).toEqual(['1,-1', '1,1'])
    })

    it('draws a terminal CH₃ as up, down and out to the side', () => {
      expect(hydrogensOn('alkane', 2, 0)).toEqual(['-1,0', '0,-1', '0,1'])
      expect(hydrogensOn('alkane', 2, 1)).toEqual(['1,-1', '1,1', '2,0'])
    })

    it('puts methane’s four hydrogens on all four sides', () => {
      expect(hydrogensOn('alkane', 1, 0)).toEqual(['-1,0', '0,-1', '0,1', '1,0'])
    })

    it('draws methanoic acid as H–COOH, with the hydrogen out to the left', () => {
      // Its carbon already carries the C=O above and the –OH to the right.
      expect(hydrogensOn('acid', 1, 0)).toEqual(['-1,0'])
    })
  })

  it('never puts two atoms in the same place', () => {
    for (const key of familyKeys) {
      for (let n = minimumCarbons(key); n <= 4; n++) {
        const { bodies } = structureOf(key, n)
        const seen = new Set(bodies.map((b) => `${b.x},${b.y}`))
        expect(seen.size, `${key} n=${n}`).toBe(bodies.length)
      }
    }
  })

  it('bonds only atoms that are one bond length apart', () => {
    // A displayed formula with a bond running across the page would be unreadable, and
    // would mean the geometry and the chemistry had come apart.
    for (const key of familyKeys) {
      for (let n = minimumCarbons(key); n <= 4; n++) {
        const { bodies, links } = structureOf(key, n)
        for (const l of links) {
          const a = bodies[l.a]!
          const b = bodies[l.b]!
          expect(Math.hypot(a.x - b.x, a.y - b.y), `${key} n=${n}`).toBeCloseTo(1, 9)
        }
      }
    }
  })

  it('indexes every link to an atom that exists', () => {
    for (const key of familyKeys) {
      for (let n = minimumCarbons(key); n <= 4; n++) {
        const { bodies, links } = structureOf(key, n)
        for (const l of links) {
          expect(bodies[l.a]).toBeDefined()
          expect(bodies[l.b]).toBeDefined()
          expect(l.a).not.toBe(l.b)
        }
      }
    }
  })
})

describe('moleculeKernel', () => {
  it('reports counts and mass matching the structure drawn', () => {
    const r = moleculeKernel({ carbons: 2, family: 2 }) // ethanol
    expect(r.readouts['carbons']).toBe(2)
    expect(r.readouts['hydrogens']).toBe(6)
    expect(r.readouts['relativeMolecularMass']).toBe(46)
    expect(molecularFormula(r.bodies!)).toBe('C₂H₆O')
  })

  it('reports the measured boiling point of the member on screen', () => {
    expect(moleculeKernel({ carbons: 1, family: 0 }).readouts['boilingPoint']).toBe(-162)
    expect(moleculeKernel({ carbons: 2, family: 3 }).readouts['boilingPoint']).toBe(118)
  })

  it('names the compound', () => {
    expect(moleculeKernel({ carbons: 3, family: 1 }).markers![0]!.label.en).toBe('propene')
    expect(moleculeKernel({ carbons: 4, family: 2 }).markers![0]!.label.en).toBe('butan-1-ol')
  })

  it('skips to ethene when asked for a one-carbon alkene', () => {
    const r = moleculeKernel({ carbons: 1, family: 1 })
    expect(r.readouts['carbons']).toBe(2)
    expect(r.markers![0]!.label.en).toBe('ethene')
  })

  it('plots the alkanes alongside any other series, on shared axes', () => {
    // Same chain length, different functional group — the gap is the point being made.
    const alcohol = moleculeKernel({ carbons: 2, family: 2 })
    expect(alcohol.series).toHaveLength(2)
    expect(alcohol.series[1]!.key).toBe('reference')
    expect(alcohol.series[0]!.unit).toEqual(alcohol.series[1]!.unit)

    // The alkanes need no reference against themselves.
    expect(moleculeKernel({ carbons: 2, family: 0 }).series).toHaveLength(1)
  })

  it('plots one point per existing member', () => {
    expect(moleculeKernel({ carbons: 2, family: 0 }).series[0]!.points).toHaveLength(4)
    expect(moleculeKernel({ carbons: 2, family: 1 }).series[0]!.points).toHaveLength(3)
  })

  it('clamps parameters outside their range', () => {
    expect(moleculeKernel({ carbons: 99, family: 0 }).readouts['carbons']).toBe(4)
    expect(moleculeKernel({ carbons: -3, family: 0 }).readouts['carbons']).toBe(1)
    expect(moleculeKernel({ carbons: 2, family: 99 }).markers![0]!.label.en).toBe('ethanoic acid')
    expect(moleculeKernel({ carbons: 2, family: -1 }).markers![0]!.label.en).toBe('ethane')
  })

  it('is finite everywhere across the parameter range', () => {
    for (let family = 0; family < FAMILIES.length; family++) {
      for (let carbons = 1; carbons <= 4; carbons++) {
        const r = moleculeKernel({ carbons, family })
        for (const [k, v] of Object.entries(r.readouts)) {
          expect(Number.isFinite(v), `${k} at family=${family} n=${carbons}`).toBe(true)
        }
      }
    }
  })
})

function count(bodies: SimBody[], kind: string): number {
  return bodies.filter((b) => b.kind === kind).length
}
