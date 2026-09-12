import { describe, expect, it } from 'vitest'
import { ANIONS, CATIONS, formulaFor, isSoluble, methodFor, saltsKernel } from './kernel'

const cat = (symbol: string) => CATIONS.find((c) => c.symbol === symbol)!
const an = (key: string) => ANIONS.find((a) => a.key === key)!

function run(cationSymbol: string, anionKey: string) {
  const r = saltsKernel({
    cation: CATIONS.findIndex((c) => c.symbol === cationSymbol),
    anion: ANIONS.findIndex((a) => a.key === anionKey),
  })
  return { ...r, bodies: r.bodies ?? [] }
}

describe('the ion tables', () => {
  it('names every ion in both languages and gives it a charge', () => {
    for (const c of CATIONS) {
      expect(c.name.zh, c.symbol).toBeTruthy()
      expect(c.charge, c.symbol).toBeGreaterThan(0)
    }
    for (const a of ANIONS) {
      expect(a.name.zh, a.key).toBeTruthy()
      expect(a.charge, a.key).toBeGreaterThan(0)
    }
  })

  it('marks only sodium and potassium as always soluble', () => {
    expect(CATIONS.filter((c) => c.alwaysSoluble).map((c) => c.symbol)).toEqual(['Na', 'K'])
  })
})

describe('isSoluble', () => {
  it('makes every nitrate soluble', () => {
    // 0620.7.3.2 — the one rule with no exceptions.
    for (const c of CATIONS) {
      expect(isSoluble(c, an('nitrate')), c.symbol).toBe(true)
    }
  })

  it('makes every sodium and potassium salt soluble', () => {
    for (const a of ANIONS) {
      expect(isSoluble(cat('Na'), a), a.key).toBe(true)
      expect(isSoluble(cat('K'), a), a.key).toBe(true)
    }
  })

  it('makes carbonates insoluble apart from sodium and potassium', () => {
    expect(isSoluble(cat('Ca'), an('carbonate'))).toBe(false)
    expect(isSoluble(cat('Cu'), an('carbonate'))).toBe(false)
    expect(isSoluble(cat('Na'), an('carbonate'))).toBe(true)
  })

  it('knows the two insoluble chlorides', () => {
    expect(isSoluble(cat('Ag'), an('chloride'))).toBe(false)
    expect(isSoluble(cat('Pb'), an('chloride'))).toBe(false)
    expect(isSoluble(cat('Mg'), an('chloride'))).toBe(true)
  })

  it('knows the insoluble sulfates', () => {
    expect(isSoluble(cat('Ba'), an('sulfate'))).toBe(false)
    expect(isSoluble(cat('Pb'), an('sulfate'))).toBe(false)
    expect(isSoluble(cat('Cu'), an('sulfate'))).toBe(true)
  })

  it('gives silver a soluble nitrate and an insoluble chloride', () => {
    // Both are needed to precipitate silver chloride, which is the standard example.
    expect(isSoluble(cat('Ag'), an('nitrate'))).toBe(true)
    expect(isSoluble(cat('Ag'), an('chloride'))).toBe(false)
  })
})

describe('methodFor', () => {
  it('precipitates every insoluble salt', () => {
    // 0620.7.3.4 — an insoluble salt cannot be crystallised out of solution.
    for (const c of CATIONS) {
      for (const a of ANIONS) {
        if (!isSoluble(c, a)) {
          expect(methodFor(c, a), `${c.symbol} ${a.key}`).toBe('precipitation')
        }
      }
    }
  })

  it('titrates when the base is soluble, because there is nothing to filter', () => {
    expect(methodFor(cat('Na'), an('chloride'))).toBe('titration')
    expect(methodFor(cat('K'), an('sulfate'))).toBe('titration')
  })

  it('uses excess solid when the base is insoluble', () => {
    // 0620.7.3.1 — add until no more dissolves, then filter the leftovers off.
    expect(methodFor(cat('Cu'), an('sulfate'))).toBe('excess-solid')
    expect(methodFor(cat('Zn'), an('chloride'))).toBe('excess-solid')
    expect(methodFor(cat('Mg'), an('nitrate'))).toBe('excess-solid')
  })

  it('picks exactly one method for every salt in the table', () => {
    for (const c of CATIONS) {
      for (const a of ANIONS) {
        expect(['excess-solid', 'titration', 'precipitation']).toContain(methodFor(c, a))
      }
    }
  })
})

describe('formulaFor', () => {
  it('balances the charges', () => {
    expect(formulaFor(cat('Na'), an('chloride')).text).toBe('NaCl')
    expect(formulaFor(cat('Mg'), an('chloride')).text).toBe('MgCl₂')
    expect(formulaFor(cat('Na'), an('sulfate')).text).toBe('Na₂SO₄')
    expect(formulaFor(cat('Cu'), an('sulfate')).text).toBe('CuSO₄')
  })

  it('brackets a polyatomic ion when more than one is needed', () => {
    // Ca(NO₃)₂, not CaNO₃₂ — a mark in its own right.
    expect(formulaFor(cat('Ca'), an('nitrate')).text).toBe('Ca(NO₃)₂')
    expect(formulaFor(cat('Zn'), an('nitrate')).text).toBe('Zn(NO₃)₂')
  })

  it('does not bracket a single polyatomic ion', () => {
    expect(formulaFor(cat('Na'), an('nitrate')).text).toBe('NaNO₃')
    expect(formulaFor(cat('Ba'), an('sulfate')).text).toBe('BaSO₄')
  })

  it('does not bracket a monatomic ion', () => {
    expect(formulaFor(cat('Ca'), an('chloride')).text).toBe('CaCl₂')
    expect(formulaFor(cat('Ca'), an('chloride')).text).not.toContain('(')
  })

  it('cancels the charges down to the simplest ratio', () => {
    // Mg²⁺ with SO₄²⁻ is MgSO₄, not Mg₂(SO₄)₂.
    const f = formulaFor(cat('Mg'), an('sulfate'))
    expect(f.cations).toBe(1)
    expect(f.anions).toBe(1)
    expect(f.text).toBe('MgSO₄')
  })

  it('balances the charge for every salt in the table', () => {
    for (const c of CATIONS) {
      for (const a of ANIONS) {
        const f = formulaFor(c, a)
        expect(f.cations * c.charge, `${c.symbol} ${a.key}`).toBe(f.anions * a.charge)
        expect(Math.min(f.cations, f.anions), `${c.symbol} ${a.key}`).toBe(1)
      }
    }
  })
})

describe('saltsKernel', () => {
  it('lists the steps of the chosen method, numbered', () => {
    const { bodies } = run('Cu', 'sulfate')
    expect(bodies.length).toBeGreaterThanOrEqual(4)
    bodies.forEach((b, i) => {
      expect(b.label!.split('|')[0]).toBe(String(i + 1))
      expect(b.label!.split('|')[1]!.length).toBeGreaterThan(0)
    })
  })

  it('gives different methods different steps', () => {
    const excess = run('Cu', 'sulfate').bodies.map((b) => b.label)
    const titration = run('Na', 'chloride').bodies.map((b) => b.label)
    const precipitation = run('Ba', 'sulfate').bodies.map((b) => b.label)
    expect(excess).not.toEqual(titration)
    expect(titration).not.toEqual(precipitation)
  })

  it('mentions filtering off the excess only where there is excess to filter', () => {
    expect(run('Cu', 'sulfate').bodies.some((b) => /Filter off the excess/.test(b.label!))).toBe(
      true
    )
    expect(run('Na', 'chloride').bodies.some((b) => /Filter off the excess/.test(b.label!))).toBe(
      false
    )
  })

  it('states the formula and the solubility in the headline', () => {
    expect(run('Ca', 'nitrate').markers![1]!.label.en).toMatch(/Ca\(NO₃\)₂/)
    expect(run('Ca', 'nitrate').markers![1]!.label.en).toMatch(/soluble/)
    expect(run('Ba', 'sulfate').markers![1]!.label.en).toMatch(/insoluble/)
  })

  it('explains why the method was chosen, not just which it is', () => {
    expect(run('Cu', 'sulfate').markers![2]!.label.en).toMatch(/filter/)
    expect(run('Na', 'chloride').markers![2]!.label.en).toMatch(/nothing to filter/)
    expect(run('Ba', 'sulfate').markers![2]!.label.en).toMatch(/cannot be crystallised/)
  })

  it('reports readings that match the formula', () => {
    const r = run('Ca', 'nitrate')
    expect(r.readouts['soluble']).toBe(1)
    expect(r.readouts['cationCharge']).toBe(2)
    expect(r.readouts['cationsInFormula']).toBe(1)
    expect(r.readouts['anionsInFormula']).toBe(2)
  })

  it('clamps parameters outside their range', () => {
    expect(saltsKernel({ cation: -4, anion: 0 }).readouts['cationCharge']).toBe(1)
    expect(saltsKernel({ cation: 99, anion: 0 }).readouts['cationCharge']).toBe(1) // silver
    expect(saltsKernel({ cation: 0, anion: 99 }).readouts['soluble']).toBe(1)
  })

  it('is finite everywhere across the parameter range', () => {
    for (let cation = 0; cation < CATIONS.length; cation++) {
      for (let anion = 0; anion < ANIONS.length; anion++) {
        const r = saltsKernel({ cation, anion })
        for (const [k, v] of Object.entries(r.readouts)) {
          expect(Number.isFinite(v), `${k} at ${cation},${anion}`).toBe(true)
        }
        expect(r.markers!.every((m) => m.label.en.length > 0 && m.label.zh)).toBe(true)
        expect(r.bodies!.every((b) => b.label && b.label.includes('|'))).toBe(true)
      }
    }
  })
})
