import { describe, expect, it } from 'vitest'
import type { SimLink } from '@/content/types'
import { molecularFormula } from '@/lib/molecularFormula'
import { REAGENTS, commentary, outcomeOf, productName, reactionKernel } from './kernel'

const ALKANE = 0
const ALKENE = 1

const reagentIndex = (key: string): number => REAGENTS.findIndex((r) => r.key === key)

function run(family: number, reagentKey: string, carbons: number) {
  const result = reactionKernel({ carbons, family, reagent: reagentIndex(reagentKey) })
  const bodies = result.bodies ?? []
  const links = result.links ?? []
  return {
    ...result,
    bodies,
    links,
    formula: molecularFormula(bodies),
    name: result.markers![0]!.label.en,
  }
}

/** Total bond order on an atom — what its valence must equal. */
function valence(links: SimLink[], index: number): number {
  return links
    .filter((l) => l.a === index || l.b === index)
    .reduce((total, l) => total + (l.order ?? 1), 0)
}

const reagentKeys = REAGENTS.map((r) => r.key)

describe('REAGENTS', () => {
  it('offers nothing, the three addition reagents, and chlorine', () => {
    expect(reagentKeys).toEqual(['none', 'bromine', 'hydrogen', 'steam', 'chlorine'])
  })

  it('adds H and OH across the double bond for steam, not H₂O in one lump', () => {
    const steam = REAGENTS[reagentIndex('steam')]!
    expect(steam.addsInner).toEqual(['O', 'H'])
    expect(steam.addsTerminal).toEqual(['H'])
  })
})

describe('outcomeOf', () => {
  it('gives an alkene an addition reaction with every reagent', () => {
    // 0620.11.5.6
    for (const key of ['bromine', 'hydrogen', 'steam', 'chlorine']) {
      expect(outcomeOf('alkene', key), key).toBe('addition')
    }
  })

  it('leaves an alkane unchanged by everything except chlorine in UV light', () => {
    // 0620.11.4.2 — alkanes are generally unreactive.
    expect(outcomeOf('alkane', 'bromine')).toBe('none')
    expect(outcomeOf('alkane', 'hydrogen')).toBe('none')
    expect(outcomeOf('alkane', 'steam')).toBe('none')
    // 0620.11.4.4 — but chlorine substitutes under ultraviolet light.
    expect(outcomeOf('alkane', 'chlorine')).toBe('substitution')
  })

  it('does nothing at all with no reagent', () => {
    expect(outcomeOf('alkane', 'none')).toBe('none')
    expect(outcomeOf('alkene', 'none')).toBe('none')
  })
})

describe('addition reactions', () => {
  it('turns the double bond into a single bond', () => {
    // 0620.11.5.5 — the C=C opens and the reagent adds across it.
    const before = run(ALKENE, 'none', 2)
    const after = run(ALKENE, 'bromine', 2)
    expect(before.links!.filter((l) => l.order === 2)).toHaveLength(1)
    expect(after.links!.filter((l) => l.order === 2)).toHaveLength(0)
  })

  it('gives 1,2-dibromo compounds with bromine', () => {
    expect(run(ALKENE, 'bromine', 2).formula).toBe('C₂H₄Br₂')
    expect(run(ALKENE, 'bromine', 2).name).toBe('1,2-dibromoethane')
    expect(run(ALKENE, 'bromine', 3).formula).toBe('C₃H₆Br₂')
    expect(run(ALKENE, 'bromine', 4).name).toBe('1,2-dibromobutane')
  })

  it('turns an alkene into the alkane with hydrogen', () => {
    for (let n = 2; n <= 4; n++) {
      const hydrogenated = run(ALKENE, 'hydrogen', n)
      const alkane = run(ALKANE, 'none', n)
      expect(hydrogenated.formula, `n=${n}`).toBe(alkane.formula)
      expect(hydrogenated.name).toBe(alkane.name)
    }
  })

  it('turns ethene into ethanol with steam', () => {
    // 0620.11.6.1 — the industrial route to ethanol.
    const r = run(ALKENE, 'steam', 2)
    expect(r.formula).toBe('C₂H₆O')
    expect(r.name).toBe('ethanol')
  })

  it('puts the –OH on the inner carbon, giving propan-2-ol not propan-1-ol', () => {
    // Water adds the other way round on a longer chain, and naming it wrongly would teach
    // a product that does not form.
    expect(run(ALKENE, 'steam', 3).name).toBe('propan-2-ol')
    expect(run(ALKENE, 'steam', 4).name).toBe('butan-2-ol')

    const { bodies, links } = run(ALKENE, 'steam', 3)
    const oxygen = bodies.findIndex((b) => b.kind === 'O')
    const carbonOfOxygen = links
      .filter((l) => l.a === oxygen || l.b === oxygen)
      .map((l) => (l.a === oxygen ? l.b : l.a))
      .find((i) => bodies[i]!.kind === 'C')!
    // Carbons are laid out left to right from x = 0, so the middle one is at x = 1.
    expect(bodies[carbonOfOxygen]!.x).toBe(1)
  })

  it('reports exactly one product molecule', () => {
    for (const key of ['bromine', 'hydrogen', 'steam', 'chlorine']) {
      expect(run(ALKENE, key, 3).readouts['productMolecules'], key).toBe(1)
    }
  })

  it('adds the whole reagent, so the relative molecular mass jumps by its mass', () => {
    const ethene = run(ALKENE, 'none', 2).readouts['relativeMolecularMass']!
    expect(run(ALKENE, 'bromine', 2).readouts['relativeMolecularMass']! - ethene).toBe(160)
    expect(run(ALKENE, 'hydrogen', 2).readouts['relativeMolecularMass']! - ethene).toBe(2)
    expect(run(ALKENE, 'steam', 2).readouts['relativeMolecularMass']! - ethene).toBe(18)
    expect(run(ALKENE, 'chlorine', 2).readouts['relativeMolecularMass']! - ethene).toBe(71)
  })
})

describe('substitution reactions', () => {
  it('replaces one hydrogen with chlorine', () => {
    // 0620.11.4.3 — one atom swapped for another, not added on.
    const before = run(ALKANE, 'none', 1)
    const after = run(ALKANE, 'chlorine', 1)
    expect(before.formula).toBe('CH₄')
    expect(after.formula).toBe('CH₃Cl')
    expect(after.bodies).toHaveLength(before.bodies!.length)
  })

  it('names the product from the position of the chlorine', () => {
    expect(run(ALKANE, 'chlorine', 1).name).toBe('chloromethane')
    expect(run(ALKANE, 'chlorine', 2).name).toBe('chloroethane')
    expect(run(ALKANE, 'chlorine', 3).name).toBe('1-chloropropane')
    expect(run(ALKANE, 'chlorine', 4).name).toBe('1-chlorobutane')
  })

  it('puts the chlorine on an end carbon, matching the name', () => {
    for (let n = 1; n <= 4; n++) {
      const { bodies } = run(ALKANE, 'chlorine', n)
      const chlorine = bodies.find((b) => b.kind === 'Cl')!
      // Carbon 1 sits at x = 0, so its substituent is at x = −1 or on the y axis above it.
      expect(Math.abs(chlorine.x), `n=${n}`).toBeLessThanOrEqual(1)
    }
  })

  it('reports two product molecules, because HCl comes off as well', () => {
    for (let n = 1; n <= 4; n++) {
      expect(run(ALKANE, 'chlorine', n).readouts['productMolecules']).toBe(2)
    }
  })

  it('mentions the ultraviolet light, without which nothing happens', () => {
    expect(commentary('alkane', 'chlorine').note.en).toMatch(/ultraviolet/i)
  })
})

describe('no reaction', () => {
  it('leaves the alkane exactly as it was', () => {
    for (const key of ['bromine', 'hydrogen', 'steam']) {
      const untouched = run(ALKANE, 'none', 3)
      const exposed = run(ALKANE, key, 3)
      expect(exposed.formula, key).toBe(untouched.formula)
      expect(exposed.bodies, key).toEqual(untouched.bodies)
      expect(exposed.readouts['productMolecules'], key).toBe(0)
    }
  })

  it('says the bromine water stays orange, which is the negative test result', () => {
    // 0620.11.5.4 — the test only means something if the negative result is stated too.
    expect(commentary('alkane', 'bromine').note.en).toMatch(/stays orange/i)
    expect(commentary('alkene', 'bromine').note.en).toMatch(/colourless/i)
  })
})

describe('every structure the lesson can draw', () => {
  it('gives every carbon four bonds and every hydrogen one', () => {
    for (const family of [ALKANE, ALKENE]) {
      for (const key of reagentKeys) {
        for (let carbons = 1; carbons <= 4; carbons++) {
          const { bodies, links } = run(family, key, carbons)
          const where = `family=${family} ${key} n=${carbons}`
          bodies.forEach((b, i) => {
            if (b.kind === 'C') expect(valence(links, i), `${where} C${i}`).toBe(4)
            if (b.kind === 'H') expect(valence(links, i), `${where} H${i}`).toBe(1)
            if (b.kind === 'O') expect(valence(links, i), `${where} O${i}`).toBe(2)
            // A halogen forms exactly one bond, which is why it takes the place of one H.
            if (b.kind === 'Br' || b.kind === 'Cl') {
              expect(valence(links, i), `${where} ${b.kind}${i}`).toBe(1)
            }
          })
        }
      }
    }
  })

  it('never puts two atoms in the same place', () => {
    for (const family of [ALKANE, ALKENE]) {
      for (const key of reagentKeys) {
        for (let carbons = 1; carbons <= 4; carbons++) {
          const { bodies } = run(family, key, carbons)
          const seen = new Set(bodies.map((b) => `${b.x},${b.y}`))
          expect(seen.size, `family=${family} ${key} n=${carbons}`).toBe(bodies.length)
        }
      }
    }
  })

  it('bonds only atoms one bond length apart', () => {
    for (const family of [ALKANE, ALKENE]) {
      for (const key of reagentKeys) {
        for (let carbons = 1; carbons <= 4; carbons++) {
          const { bodies, links } = run(family, key, carbons)
          for (const l of links) {
            const a = bodies[l.a]!
            const b = bodies[l.b]!
            expect(Math.hypot(a.x - b.x, a.y - b.y), `${key} n=${carbons}`).toBeCloseTo(1, 9)
          }
        }
      }
    }
  })

  it('always has somewhere to put the incoming atoms', () => {
    // Every addition must actually attach both groups. If a carbon had no free direction
    // the reagent would silently vanish and the formula would be wrong.
    for (const key of ['bromine', 'hydrogen', 'chlorine']) {
      for (let carbons = 2; carbons <= 4; carbons++) {
        const before = run(ALKENE, 'none', carbons).bodies!.length
        const after = run(ALKENE, key, carbons).bodies!.length
        expect(after - before, `${key} n=${carbons}`).toBe(2)
      }
    }
    for (let carbons = 2; carbons <= 4; carbons++) {
      // Steam adds three atoms: H on one carbon, O and H on the other.
      expect(run(ALKENE, 'steam', carbons).bodies!.length - run(ALKENE, 'none', carbons).bodies!.length).toBe(3)
    }
  })

  it('is finite everywhere across the parameter range', () => {
    for (const family of [ALKANE, ALKENE]) {
      for (const key of reagentKeys) {
        for (let carbons = 1; carbons <= 4; carbons++) {
          const r = run(family, key, carbons)
          for (const [k, v] of Object.entries(r.readouts)) {
            expect(Number.isFinite(v), `${k} ${key} n=${carbons}`).toBe(true)
          }
          expect(r.name.length).toBeGreaterThan(0)
        }
      }
    }
  })
})

describe('reactionKernel', () => {
  it('skips to ethene when asked for a one-carbon alkene', () => {
    expect(run(ALKENE, 'none', 1).name).toBe('ethene')
    expect(run(ALKENE, 'none', 1).readouts['carbons']).toBe(2)
  })

  it('clamps parameters outside their range', () => {
    expect(reactionKernel({ carbons: 99, family: 0, reagent: 0 }).readouts['carbons']).toBe(4)
    expect(reactionKernel({ carbons: 2, family: 0, reagent: 99 }).readouts['carbons']).toBe(2)
    expect(reactionKernel({ carbons: 2, family: 9, reagent: 0 }).markers![0]!.label.en).toBe(
      'ethene'
    )
  })

  it('gives every state a headline and a note', () => {
    for (const family of ['alkane', 'alkene']) {
      for (const key of reagentKeys) {
        const c = commentary(family, key)
        expect(c.headline.en.length, `${family} ${key}`).toBeGreaterThan(0)
        expect(c.note.en.length, `${family} ${key}`).toBeGreaterThan(0)
        expect(c.headline.zh).toBeTruthy()
        expect(c.note.zh).toBeTruthy()
      }
    }
  })

  it('names a product for every combination', () => {
    for (const family of ['alkane', 'alkene']) {
      for (const key of reagentKeys) {
        for (let n = family === 'alkene' ? 2 : 1; n <= 4; n++) {
          const name = productName(family, key, n)
          expect(name.en, `${family} ${key} n=${n}`).not.toMatch(/undefined/)
          expect(name.zh, `${family} ${key} n=${n}`).toBeTruthy()
        }
      }
    }
  })
})
