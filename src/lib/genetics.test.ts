import { describe, expect, it } from 'vitest'
import { chanceOf, combine, gametes, punnett, ratio, tally, type CrossSpec } from './genetics'

const parents = {
  fatherLabel: { en: 'Father' },
  motherLabel: { en: 'Mother' },
}

/** A standard dominant/recessive trait: B tall, b short. */
const height = (father: string, mother: string): CrossSpec => ({
  father,
  mother,
  ...parents,
  phenotypes: [
    { id: 'tall', label: { en: 'Tall' } },
    { id: 'short', label: { en: 'Short' } },
  ],
  phenotypeOf: { BB: 'tall', Bb: 'tall', bb: 'short' },
})

describe('gametes', () => {
  it('splits a heterozygote into its two different alleles', () => {
    expect(gametes('Bb')).toEqual(['B', 'b'])
  })

  it('gives a homozygote the same allele twice', () => {
    // Both cells of that edge must be filled, or the square comes out 2×1 and the
    // ratios are halved.
    expect(gametes('BB')).toEqual(['B', 'B'])
    expect(gametes('bb')).toEqual(['b', 'b'])
  })
})

describe('combine', () => {
  it('writes the dominant allele first however the pair arrives', () => {
    expect(combine('B', 'b')).toBe('Bb')
    expect(combine('b', 'B')).toBe('Bb')
  })

  it('treats bB and Bb as one genotype, not two', () => {
    // Otherwise a heterozygote appears twice in the legend and the ratio reads 1:1:1:1.
    expect(combine('b', 'B')).toBe(combine('B', 'b'))
  })

  it('keeps the sex chromosomes in the conventional order', () => {
    expect(combine('Y', 'X')).toBe('XY')
    expect(combine('X', 'X')).toBe('XX')
  })

  it('writes Y last even when the X carries a recessive allele', () => {
    // Capitals-first on its own would give "Yx", which is not how any textbook writes a
    // colour-blind male and would make the grid look wrong to a student.
    expect(combine('Y', 'x')).toBe('xY')
    expect(combine('x', 'Y')).toBe('xY')
  })
})

describe('a monohybrid cross', () => {
  it('gives the 3 : 1 ratio from two heterozygous parents', () => {
    const grid = punnett(height('Bb', 'Bb'))
    expect(tally(grid)).toEqual({ tall: 3, short: 1 })
    expect(ratio(grid)).toEqual([3, 1])
    expect(chanceOf(grid, 'short')).toBe(25)
  })

  it('gives 1 : 1 from a test cross against the recessive', () => {
    const grid = punnett(height('Bb', 'bb'))
    expect(ratio(grid)).toEqual([1, 1])
    expect(chanceOf(grid, 'short')).toBe(50)
  })

  it('gives every offspring the dominant phenotype when one parent is homozygous dominant', () => {
    const grid = punnett(height('BB', 'bb'))
    expect(tally(grid)).toEqual({ tall: 4 })
    // Not "4 : 0" — a cross with one outcome has a ratio of 1.
    expect(ratio(grid)).toEqual([1])
    expect(chanceOf(grid, 'short')).toBe(0)
  })

  it('lists only the phenotypes this particular cross can produce', () => {
    const grid = punnett(height('BB', 'BB'))
    expect(grid.groups.map((g) => g.id)).toEqual(['tall'])
  })

  it('always fills all four cells', () => {
    for (const [f, m] of [
      ['BB', 'BB'],
      ['Bb', 'bb'],
      ['bb', 'Bb'],
    ] as const) {
      const grid = punnett(height(f, m))
      expect(grid.cells.flat(), `${f} × ${m}`).toHaveLength(4)
    }
  })
})

describe('codominance', () => {
  // Sickle cell: neither allele is recessive, so the heterozygote has its own phenotype.
  const sickle = (father: string, mother: string): CrossSpec => ({
    father,
    mother,
    ...parents,
    phenotypes: [
      { id: 'normal', label: { en: 'Unaffected' } },
      { id: 'trait', label: { en: 'Sickle cell trait' } },
      { id: 'anaemia', label: { en: 'Sickle cell anaemia' } },
    ],
    phenotypeOf: { NN: 'normal', NS: 'trait', SS: 'anaemia' },
  })

  it('gives three phenotypes in a 1 : 2 : 1 ratio, not two in 3 : 1', () => {
    const grid = punnett(sickle('NS', 'NS'))
    expect(tally(grid)).toEqual({ normal: 1, trait: 2, anaemia: 1 })
    expect(ratio(grid)).toEqual([1, 2, 1])
  })

  it('gives two carriers a one in four chance of an affected child', () => {
    expect(chanceOf(punnett(sickle('NS', 'NS')), 'anaemia')).toBe(25)
  })

  it('cannot produce an affected child if only one parent carries the allele', () => {
    const grid = punnett(sickle('NS', 'NN'))
    expect(chanceOf(grid, 'anaemia')).toBe(0)
    expect(chanceOf(grid, 'trait')).toBe(50)
  })
})

describe('sex determination', () => {
  const sex: CrossSpec = {
    father: 'XY',
    mother: 'XX',
    ...parents,
    phenotypes: [
      { id: 'female', label: { en: 'Female' } },
      { id: 'male', label: { en: 'Male' } },
    ],
    phenotypeOf: { XX: 'female', XY: 'male' },
  }

  it('gives an equal chance of each sex', () => {
    const grid = punnett(sex)
    expect(ratio(grid)).toEqual([1, 1])
    expect(chanceOf(grid, 'male')).toBe(50)
  })

  it('shows that the father decides it', () => {
    // Every column from the mother is X, so the sex of a child is set entirely by which
    // of the father's two gametes fertilises the egg.
    const grid = punnett(sex)
    expect(grid.rows).toEqual(['X', 'X'])
    expect(grid.columns).toEqual(['X', 'Y'])
  })
})

describe('a sex-linked cross', () => {
  // Colour blindness. The father has only one X, so he cannot be a carrier: he either has
  // the allele and is affected, or he does not.
  const colourBlind = (father: string, mother: string): CrossSpec => ({
    father,
    mother,
    ...parents,
    phenotypes: [
      { id: 'unaffected', label: { en: 'Unaffected' } },
      { id: 'carrier', label: { en: 'Carrier female' } },
      { id: 'affected', label: { en: 'Colour blind' } },
    ],
    phenotypeOf: {
      XX: 'unaffected',
      Xx: 'carrier',
      xx: 'affected',
      XY: 'unaffected',
      xY: 'affected',
    },
  })

  it('gives a carrier mother and unaffected father affected sons but no affected daughters', () => {
    const grid = punnett(colourBlind('XY', 'Xx'))
    // Half the sons: one of the four cells is an affected male.
    expect(chanceOf(grid, 'affected')).toBe(25)
    expect(chanceOf(grid, 'carrier')).toBe(25)
  })

  it('gives an affected father carrier daughters and no affected children', () => {
    const grid = punnett(colourBlind('xY', 'XX'))
    expect(chanceOf(grid, 'affected')).toBe(0)
    expect(chanceOf(grid, 'carrier')).toBe(50)
  })
})

describe('ratio', () => {
  it('reduces to the smallest whole numbers a mark scheme would accept', () => {
    const grid = punnett(height('Bb', 'Bb'))
    expect(ratio(grid)).toEqual([3, 1])
  })

  it('returns nothing for a grid with no cells', () => {
    expect(
      ratio({
        columns: [],
        rows: [],
        cells: [],
        columnsLabel: { en: '' },
        rowsLabel: { en: '' },
        groups: [],
        groupOf: {},
      })
    ).toEqual([])
  })
})
