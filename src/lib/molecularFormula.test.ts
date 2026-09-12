import { describe, expect, it } from 'vitest'
import type { SimBody } from '@/content/types'
import {
  atomCounts,
  molecularFormula,
  relativeMolecularMass,
  subscript,
} from './molecularFormula'

const atoms = (...kinds: string[]): SimBody[] => kinds.map((kind, i) => ({ x: i, y: 0, kind }))

describe('subscript', () => {
  it('leaves 1 and 0 off, since C₁ is written C', () => {
    expect(subscript(1)).toBe('')
    expect(subscript(0)).toBe('')
  })

  it('renders multi-digit counts', () => {
    expect(subscript(2)).toBe('₂')
    expect(subscript(10)).toBe('₁₀')
    expect(subscript(204)).toBe('₂₀₄')
  })
})

describe('atomCounts', () => {
  it('tallies by element symbol', () => {
    expect(atomCounts(atoms('C', 'H', 'H', 'O'))).toEqual(
      new Map([
        ['C', 1],
        ['H', 2],
        ['O', 1],
      ])
    )
  })

  it('ignores bodies with no element', () => {
    expect(atomCounts([{ x: 0, y: 0 }])).toEqual(new Map())
  })
})

describe('molecularFormula', () => {
  it('uses Hill order: carbon, then hydrogen, then the rest alphabetically', () => {
    expect(molecularFormula(atoms('O', 'H', 'H', 'C', 'C', 'H', 'H', 'H', 'H'))).toBe('C₂H₆O')
  })

  it('sorts the remaining elements alphabetically', () => {
    // Br before Cl regardless of the order the kernel emitted them.
    expect(molecularFormula(atoms('Cl', 'C', 'Br', 'H', 'H'))).toBe('CH₂BrCl')
  })

  it('omits a subscript of one', () => {
    expect(molecularFormula(atoms('C', 'H', 'H', 'H', 'H'))).toBe('CH₄')
  })

  it('handles a molecule with no carbon', () => {
    expect(molecularFormula(atoms('H', 'H', 'O'))).toBe('H₂O')
  })

  it('is empty for no atoms', () => {
    expect(molecularFormula([])).toBe('')
  })
})

describe('relativeMolecularMass', () => {
  it('sums the relative atomic masses', () => {
    expect(relativeMolecularMass(atoms('C', 'H', 'H', 'H', 'H'))).toBe(16) // CH₄
    expect(relativeMolecularMass(atoms('H', 'H', 'O'))).toBe(18) // H₂O
  })

  it('handles chlorine’s non-integer mass without floating-point residue', () => {
    // HCl: 1 + 35.5. Left unrounded this comes out as 36.5 exactly, but CCl₄ would not.
    expect(relativeMolecularMass(atoms('H', 'Cl'))).toBe(36.5)
    expect(relativeMolecularMass(atoms('C', 'Cl', 'Cl', 'Cl', 'Cl'))).toBe(154)
  })

  it('refuses an element it has no mass for, rather than under-reporting', () => {
    expect(() => relativeMolecularMass(atoms('C', 'Xx'))).toThrow(/Xx/)
  })
})
