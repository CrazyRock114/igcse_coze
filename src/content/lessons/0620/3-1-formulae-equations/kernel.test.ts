import { describe, expect, it } from 'vitest'
import kernel, { REACTIONS, tally, unbalanced, type EquationParams } from './kernel'
import { parseFormula } from '@/lib/formula'

const merge = (p: Partial<EquationParams>): EquationParams => ({
  reaction: p.reaction ?? 0,
  a: p.a ?? 1,
  b: p.b ?? 1,
  c: p.c ?? 1,
  d: p.d ?? 1,
})
const run = (p: Partial<EquationParams> = {}) => kernel(merge(p))

/** Runs a reaction with the coefficients its own answer says are correct. */
const solved = (index: number) => {
  const [a = 1, b = 1, c = 1, d = 1] = REACTIONS[index]!.answer
  return kernel({ reaction: index, a, b, c, d })
}

describe('every reaction in the table', () => {
  it('balances at the coefficients it claims are the answer', () => {
    // The one thing that would make this lesson unusable is an answer that does not work.
    REACTIONS.forEach((spec, i) => {
      const r = solved(i)
      expect(r.readouts['elementsBalanced'], spec.name.en).toBe(r.readouts['elementsTotal'])
      expect(r.readouts['atomsLeft'], spec.name.en).toBe(r.readouts['atomsRight'])
    })
  })

  it('has a readable formula for every species', () => {
    // An unparseable formula returns an empty count, which would silently balance an
    // equation by leaving both sides at zero.
    for (const spec of REACTIONS) {
      for (const s of [...spec.reactants, ...spec.products]) {
        expect(Object.keys(parseFormula(s.formula)).length, s.formula).toBeGreaterThan(0)
      }
    }
  })

  it('gives one coefficient per species and no more', () => {
    for (const spec of REACTIONS) {
      expect(spec.answer, spec.name.en).toHaveLength(
        spec.reactants.length + spec.products.length,
      )
    }
  })

  it('needs at least one coefficient above 1, or there is nothing to balance', () => {
    for (const spec of REACTIONS) {
      expect(Math.max(...spec.answer), spec.name.en).toBeGreaterThan(1)
    }
  })

  it('has a state symbol on every species', () => {
    for (const spec of REACTIONS) {
      for (const s of [...spec.reactants, ...spec.products]) {
        expect(['s', 'l', 'g', 'aq'], `${spec.name.en} ${s.formula}`).toContain(s.state)
      }
    }
  })

  it('has a word equation in both languages', () => {
    for (const spec of REACTIONS) {
      expect(spec.word.en, spec.name.en).toContain('→')
      expect(spec.word.zh, spec.name.en).toBeTruthy()
    }
  })
})

describe('the atom tally', () => {
  it('counts both sides from the formulae', () => {
    const rows = tally(
      [{ species: { formula: 'CH4', state: 'g' }, coefficient: 1 }],
      [{ species: { formula: 'CO2', state: 'g' }, coefficient: 1 }],
    )
    expect(rows).toEqual([
      { element: 'C', left: 1, right: 1 },
      { element: 'H', left: 4, right: 0 },
      { element: 'O', left: 0, right: 2 },
    ])
  })

  it('lists an element that appears on only one side', () => {
    // Otherwise a student could balance an equation that loses an element entirely.
    const rows = tally(
      [{ species: { formula: 'H2', state: 'g' }, coefficient: 1 }],
      [{ species: { formula: 'O2', state: 'g' }, coefficient: 1 }],
    )
    expect(rows.map((r) => r.element).sort()).toEqual(['H', 'O'])
  })

  it('names exactly the elements that do not agree', () => {
    const rows = tally(
      [
        { species: { formula: 'H2', state: 'g' }, coefficient: 1 },
        { species: { formula: 'O2', state: 'g' }, coefficient: 1 },
      ],
      [{ species: { formula: 'H2O', state: 'l' }, coefficient: 1 }],
    )
    expect(unbalanced(rows).map((r) => r.element)).toEqual(['O'])
  })
})

describe('the feedback', () => {
  it('names the element that is out and by how much', () => {
    const note = run({ reaction: 0, a: 1, b: 1, c: 1 }).markers?.[1]?.label.en ?? ''
    expect(note).toContain('Not balanced yet')
    expect(note).toContain('O: 2 on the left against 1 on the right')
  })

  it('says so when it is balanced, and why that matters', () => {
    const note = solved(0).markers?.[1]?.label.en ?? ''
    expect(note).toContain('Balanced')
    expect(note).toContain('conservation of mass')
  })

  it('warns against editing a formula instead of a coefficient', () => {
    // The single most common way of getting this wrong, and the exercise makes it
    // impossible — but the reason is worth stating anyway.
    const note = run().markers?.[2]?.label.en ?? ''
    expect(note).toContain('H₂O₂')
    expect(note).toContain('different substance')
  })

  it('shows the word equation alongside', () => {
    expect(run({ reaction: 1 }).markers?.[0]?.label.en).toContain('methane')
    expect(run({ reaction: 1 }).markers?.[0]?.label.zh).toBeTruthy()
  })
})

describe('the equation handed to the view', () => {
  it('carries the coefficients the student set', () => {
    const eq = run({ reaction: 1, a: 1, b: 2, c: 1, d: 2 }).equation!
    expect(eq.left.map((t) => t.coefficient)).toEqual([1, 2])
    expect(eq.right.map((t) => t.coefficient)).toEqual([1, 2])
  })

  it('carries the state symbols', () => {
    const eq = run({ reaction: 0 }).equation!
    expect(eq.left.map((t) => t.state)).toEqual(['g', 'g'])
    expect(eq.right.map((t) => t.state)).toEqual(['l'])
  })
})

describe('the kernel', () => {
  it('returns finite readouts across the parameter space', () => {
    for (let reaction = 0; reaction < REACTIONS.length; reaction++) {
      for (const a of [1, 8]) {
        for (const b of [1, 8]) {
          const p = { reaction, a, b, c: 1, d: 1 }
          for (const [key, value] of Object.entries(kernel(p).readouts)) {
            expect(Number.isFinite(value), `${key} at ${JSON.stringify(p)}`).toBe(true)
          }
        }
      }
    }
  })

  it('clamps a reaction index that does not exist', () => {
    expect(kernel(merge({ reaction: 99 })).equation).toBeDefined()
    expect(kernel(merge({ reaction: -5 })).equation).toBeDefined()
  })

  it('never lets a coefficient be zero', () => {
    // A zero coefficient deletes a species from the equation, which is not a balancing move.
    const eq = kernel(merge({ reaction: 0, a: 0, b: 0, c: 0 })).equation!
    for (const t of [...eq.left, ...eq.right]) expect(t.coefficient).toBeGreaterThanOrEqual(1)
  })
})
