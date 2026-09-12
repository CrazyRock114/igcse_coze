import { describe, expect, it } from 'vitest'
import { addAtoms, elementsIn, parseFormula, relativeMass, subscript } from './formula'

describe('parseFormula', () => {
  it('counts a single element', () => {
    expect(parseFormula('O')).toEqual({ O: 1 })
    expect(parseFormula('O2')).toEqual({ O: 2 })
  })

  it('counts a compound', () => {
    expect(parseFormula('H2O')).toEqual({ H: 2, O: 1 })
    expect(parseFormula('CO2')).toEqual({ C: 1, O: 2 })
    expect(parseFormula('H2SO4')).toEqual({ H: 2, S: 1, O: 4 })
  })

  it('tells a two-letter symbol from two one-letter symbols', () => {
    // CO is carbon monoxide; Co is cobalt. Getting this wrong would silently corrupt
    // every equation containing either.
    expect(parseFormula('CO')).toEqual({ C: 1, O: 1 })
    expect(parseFormula('Co')).toEqual({ Co: 1 })
    expect(parseFormula('NaCl')).toEqual({ Na: 1, Cl: 1 })
  })

  it('applies a bracket multiplier to everything inside it', () => {
    // Every hydroxide and nitrate in the syllabus is written this way.
    expect(parseFormula('Ca(OH)2')).toEqual({ Ca: 1, O: 2, H: 2 })
    expect(parseFormula('Mg(NO3)2')).toEqual({ Mg: 1, N: 2, O: 6 })
    expect(parseFormula('Al2(SO4)3')).toEqual({ Al: 2, S: 3, O: 12 })
  })

  it('handles a bracket with no number after it', () => {
    expect(parseFormula('Na(OH)')).toEqual({ Na: 1, O: 1, H: 1 })
  })

  it('adds up an element that appears more than once', () => {
    expect(parseFormula('NH4NO3')).toEqual({ N: 2, H: 4, O: 3 })
  })

  it('returns nothing for input it cannot read', () => {
    // A bad formula in lesson data is for the content gate to catch. Blanking the page is
    // not the parser's decision, and neither is guessing.
    expect(parseFormula('h2o')).toEqual({})
    expect(parseFormula('H2O)')).toEqual({})
    expect(parseFormula('(H2O')).toEqual({})
    expect(parseFormula('H2-O')).toEqual({})
    expect(parseFormula('')).toEqual({})
  })
})

describe('addAtoms', () => {
  it('multiplies by the coefficient', () => {
    expect(addAtoms({}, 'H2O', 3)).toEqual({ H: 6, O: 3 })
  })

  it('accumulates across several formulae', () => {
    const total = {}
    addAtoms(total, 'CO2', 1)
    addAtoms(total, 'H2O', 2)
    expect(total).toEqual({ C: 1, O: 4, H: 4 })
  })

  it('contributes nothing at a coefficient of zero', () => {
    expect(addAtoms({}, 'H2O', 0)).toEqual({ H: 0, O: 0 })
  })
})

describe('elementsIn', () => {
  it('lists every element once, in the order first seen', () => {
    expect(elementsIn(['CH4', 'O2', 'CO2', 'H2O'])).toEqual(['C', 'H', 'O'])
  })
})

describe('relativeMass', () => {
  const masses = { H: 1, C: 12, N: 14, O: 16, Ca: 40 }

  it('adds the relative atomic masses', () => {
    expect(relativeMass('H2O', masses)).toBe(18)
    expect(relativeMass('CO2', masses)).toBe(44)
    expect(relativeMass('CH4', masses)).toBe(16)
  })

  it('applies bracket multipliers', () => {
    expect(relativeMass('Ca(OH)2', masses)).toBe(74)
  })

  it('refuses rather than undercounting when an element is missing from the table', () => {
    // A silently-too-small Mr looks perfectly plausible, which is what makes it dangerous.
    expect(relativeMass('NaCl', masses)).toBeNaN()
  })
})

describe('subscript', () => {
  it('turns digits into subscripts', () => {
    expect(subscript('H2O')).toBe('H₂O')
    expect(subscript('Al2(SO4)3')).toBe('Al₂(SO₄)₃')
  })

  it('leaves a formula with no digits alone', () => {
    expect(subscript('NaCl')).toBe('NaCl')
  })
})
