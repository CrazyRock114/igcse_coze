import { describe, expect, it } from 'vitest'
import kernel, { SCENARIOS, scenarioAt, type InheritanceParams } from './kernel'

const run = (cross: number, father: number, mother: number) =>
  kernel({ cross, father, mother } satisfies InheritanceParams)

const FLOWERS = 1
const SICKLE = 2
const COLOUR = 3

describe('scenario data', () => {
  it('gives every reachable genotype a phenotype', () => {
    // A genotype with no phenotype falls through to being its own group, which would put
    // a raw pair of letters in the legend where a phenotype name belongs.
    for (const scenario of SCENARIOS) {
      for (let f = 0; f <= 2; f++) {
        for (let m = 0; m <= 2; m++) {
          const grid = kernel({ cross: SCENARIOS.indexOf(scenario) + 1, father: f, mother: m }).grid
          for (const genotype of grid?.cells.flat() ?? []) {
            expect(
              scenario.phenotypeOf[genotype],
              `${scenario.id}: ${genotype} has no phenotype`
            ).toBeDefined()
          }
        }
      }
    }
  })

  it('names every phenotype in both languages', () => {
    for (const scenario of SCENARIOS) {
      for (const p of scenario.phenotypes) {
        expect(p.label.zh, `${scenario.id}/${p.id}`).toBeTruthy()
      }
    }
  })
})

describe('a dominant and recessive cross', () => {
  it('gives 3 : 1 from two heterozygous parents', () => {
    const r = run(FLOWERS, 1, 1)
    expect(r.readouts['affected']).toBe(25)
    expect(r.readouts['unaffected']).toBe(75)
    expect(r.markers?.[0]?.label.en).toContain('3 : 1')
  })

  it('counts carriers by genotype, not by phenotype', () => {
    // Rr and RR both show red. If carriers were counted off the phenotype the readout
    // would say 75%, and the difference between genotype and phenotype — the point of
    // the whole topic — would be invisible.
    const r = run(FLOWERS, 1, 1)
    expect(r.readouts['carrier']).toBe(50)
    expect(r.readouts['carrier']).not.toBe(r.readouts['unaffected'])
  })

  it('breeds true when both parents are homozygous for the same allele', () => {
    expect(run(FLOWERS, 0, 0).readouts['outcomes']).toBe(1)
    expect(run(FLOWERS, 2, 2).readouts['outcomes']).toBe(1)
    expect(run(FLOWERS, 0, 0).markers?.[0]?.label.en).toContain('breeds true')
  })

  it('hides the recessive allele completely in the first generation of a pure cross', () => {
    // RR × rr: every offspring is Rr, every one is red, and the white allele is present
    // in all of them.
    const r = run(FLOWERS, 0, 2)
    expect(r.readouts['affected']).toBe(0)
    expect(r.readouts['carrier']).toBe(100)
  })

  it('reveals an unknown genotype by a test cross against the recessive', () => {
    // The whole use of a test cross: a homozygous parent gives no white offspring, a
    // heterozygous one gives half.
    expect(run(FLOWERS, 0, 2).readouts['affected']).toBe(0)
    expect(run(FLOWERS, 1, 2).readouts['affected']).toBe(50)
  })
})

describe('codominance', () => {
  it('gives three phenotypes in 1 : 2 : 1, not two in 3 : 1', () => {
    const r = run(SICKLE, 1, 1)
    expect(r.readouts['outcomes']).toBe(3)
    expect(r.markers?.[0]?.label.en).toContain('1 : 2 : 1')
  })

  it('gives two carriers a one in four chance of an affected child', () => {
    expect(run(SICKLE, 1, 1).readouts['affected']).toBe(25)
  })

  it('cannot produce an affected child unless both parents carry the allele', () => {
    expect(run(SICKLE, 1, 0).readouts['affected']).toBe(0)
    expect(run(SICKLE, 0, 1).readouts['affected']).toBe(0)
  })
})

describe('sex linkage', () => {
  it('gives a carrier mother and unaffected father affected sons but no affected daughters', () => {
    const r = run(COLOUR, 0, 1)
    expect(r.readouts['affected']).toBe(25)
    expect(r.readouts['carrier']).toBe(25)
  })

  it('gives an affected father carrier daughters and no affected children', () => {
    const r = run(COLOUR, 1, 0)
    expect(r.readouts['affected']).toBe(0)
    expect(r.readouts['carrier']).toBe(50)
  })

  it('writes a colour-blind male with the X first', () => {
    // "Yx" is not how anyone writes a genotype, and a student who has seen a textbook
    // would read it as a mistake.
    const cells = run(COLOUR, 1, 0).grid?.cells.flat() ?? []
    expect(cells).toContain('Xx')
    expect(cells.some((c) => c.startsWith('Y'))).toBe(false)
  })

  it('refuses to make a father carry two copies, and says why', () => {
    const two = run(COLOUR, 2, 1)
    const one = run(COLOUR, 1, 1)
    expect(two.grid?.columns).toEqual(one.grid?.columns)
    expect(two.markers?.[0]?.label.en).toContain('only one X')
    expect(two.markers?.[0]?.label.zh).toBeTruthy()
  })

  it('does not count an unaffected male as a carrier', () => {
    // XY has two different symbols but is not a carrier of anything.
    const r = run(COLOUR, 0, 0)
    expect(r.grid?.cells.flat()).toContain('XY')
    expect(r.readouts['carrier']).toBe(0)
  })

  it('can produce an affected daughter, but only from an affected father', () => {
    // xY × Xx is the only way, and students routinely say it is impossible.
    expect(run(COLOUR, 1, 1).grid?.cells.flat()).toContain('xx')
    expect(run(COLOUR, 0, 1).grid?.cells.flat()).not.toContain('xx')
  })
})

describe('the kernel', () => {
  it('shows the parents’ genotypes in the grid headings', () => {
    // The controls say "one copy"; only the heading says what that genotype is.
    expect(run(FLOWERS, 1, 2).grid?.columnsLabel.en).toContain('Rr')
    expect(run(FLOWERS, 1, 2).grid?.rowsLabel.en).toContain('rr')
  })

  it('returns finite readouts at every corner of the parameter space', () => {
    for (let cross = 0; cross <= 4; cross++) {
      for (const f of [0, 2]) {
        for (const m of [0, 2]) {
          for (const [key, value] of Object.entries(run(cross, f, m).readouts)) {
            expect(Number.isFinite(value), `${key} at ${cross}/${f}/${m}`).toBe(true)
          }
        }
      }
    }
  })

  it('clamps a cross outside the range rather than throwing', () => {
    expect(run(0, 1, 1).grid?.cells.flat()).toEqual(run(1, 1, 1).grid?.cells.flat())
    expect(run(99, 1, 1).grid?.cells.flat()).toEqual(
      run(SCENARIOS.length, 1, 1).grid?.cells.flat()
    )
  })

  it('always fills all four cells', () => {
    for (let cross = 1; cross <= SCENARIOS.length; cross++) {
      for (let f = 0; f <= 2; f++) {
        for (let m = 0; m <= 2; m++) {
          expect(run(cross, f, m).grid?.cells.flat(), `${cross}/${f}/${m}`).toHaveLength(4)
        }
      }
    }
  })

  it('exposes the same three scenarios the lesson offers', () => {
    expect(SCENARIOS.map((s) => s.id)).toEqual(['flowers', 'sickle', 'colour'])
    expect(scenarioAt(2).id).toBe('sickle')
  })
})
