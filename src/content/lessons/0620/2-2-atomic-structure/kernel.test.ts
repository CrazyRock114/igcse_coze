import { describe, expect, it } from 'vitest'
import {
  ELEMENTS,
  atomKernel,
  electronConfiguration,
  groupNumber,
  outerElectrons,
  periodNumber,
} from './kernel'

const base = { protonNumber: 11, extraNeutrons: 0, charge: 0 }

describe('ELEMENTS', () => {
  it('covers the first twenty elements in order', () => {
    expect(ELEMENTS).toHaveLength(20)
    expect(ELEMENTS[0]!.symbol).toBe('H')
    expect(ELEMENTS[5]!.symbol).toBe('C')
    expect(ELEMENTS[19]!.symbol).toBe('Ca')
  })

  it('gives carbon 6 neutrons, so its mass number is 12', () => {
    expect(ELEMENTS[5]!.neutrons).toBe(6)
  })
})

describe('electronConfiguration', () => {
  it('fills 2, 8, 8, 2 in order', () => {
    // 0620.2.2.5 — the notation students write.
    expect(electronConfiguration(11)).toEqual([2, 8, 1]) // sodium
    expect(electronConfiguration(17)).toEqual([2, 8, 7]) // chlorine
    expect(electronConfiguration(20)).toEqual([2, 8, 8, 2]) // calcium
  })

  it('handles the smallest atoms', () => {
    expect(electronConfiguration(1)).toEqual([1]) // hydrogen
    expect(electronConfiguration(2)).toEqual([2]) // helium
  })

  it('returns only occupied shells', () => {
    expect(electronConfiguration(10)).toEqual([2, 8]) // neon: two shells, not four
  })

  it('accounts for every electron', () => {
    for (let e = 1; e <= 20; e++) {
      const total = electronConfiguration(e).reduce((a, b) => a + b, 0)
      expect(total).toBe(e)
    }
  })

  it('never exceeds a shell capacity', () => {
    for (let e = 1; e <= 20; e++) {
      const shells = electronConfiguration(e)
      shells.forEach((n, i) => {
        expect(n).toBeLessThanOrEqual([2, 8, 8, 2][i]!)
      })
    }
  })

  it('returns nothing for zero electrons', () => {
    expect(electronConfiguration(0)).toEqual([])
  })
})

describe('outerElectrons', () => {
  it('gives the count in the outermost occupied shell', () => {
    expect(outerElectrons(11)).toBe(1) // Na
    expect(outerElectrons(17)).toBe(7) // Cl
    expect(outerElectrons(2)).toBe(2) // He
  })
})

describe('groupNumber', () => {
  it('equals the number of outer electrons for most elements', () => {
    // 0620.8.1.3
    expect(groupNumber(11)).toBe(1) // Na, Group I
    expect(groupNumber(12)).toBe(2) // Mg, Group II
    expect(groupNumber(17)).toBe(7) // Cl, Group VII
  })

  it('puts the noble gases in Group VIII', () => {
    expect(groupNumber(10)).toBe(8) // Ne, full outer shell
    expect(groupNumber(18)).toBe(8) // Ar
  })

  it('puts helium in Group VIII despite having only two electrons', () => {
    // Its single shell is full, which is what makes it unreactive.
    expect(groupNumber(2)).toBe(8)
  })
})

describe('periodNumber', () => {
  it('equals the number of occupied shells', () => {
    expect(periodNumber(1)).toBe(1) // H
    expect(periodNumber(11)).toBe(3) // Na
    expect(periodNumber(20)).toBe(4) // Ca
  })
})

describe('atomKernel', () => {
  it('reports the particle counts for a neutral atom', () => {
    // Sodium: 11 protons, 12 neutrons, 11 electrons.
    const r = atomKernel(base)
    expect(r.readouts['protonNumber']).toBe(11)
    expect(r.readouts['neutrons']).toBe(12)
    expect(r.readouts['electrons']).toBe(11)
    expect(r.readouts['massNumber']).toBe(23)
    expect(r.readouts['netCharge']).toBe(0)
  })

  it('computes mass number as protons plus neutrons', () => {
    // 0620.2.2.4
    for (let z = 1; z <= 20; z++) {
      const r = atomKernel({ ...base, protonNumber: z })
      expect(r.readouts['massNumber']).toBe(r.readouts['protonNumber']! + r.readouts['neutrons']!)
    }
  })

  describe('isotopes: changing neutrons only', () => {
    it('changes the mass number but not the element or its chemistry', () => {
      // 0620.2.3.1 and 2.3.3
      const normal = atomKernel({ ...base, protonNumber: 6, extraNeutrons: 0 })
      const heavy = atomKernel({ ...base, protonNumber: 6, extraNeutrons: 8 })

      expect(heavy.readouts['massNumber']).toBe(normal.readouts['massNumber']! + 8)
      expect(heavy.readouts['protonNumber']).toBe(normal.readouts['protonNumber'])
      // Same electron arrangement, so identical chemical properties.
      expect(heavy.readouts['electrons']).toBe(normal.readouts['electrons'])
      expect(heavy.readouts['outerElectrons']).toBe(normal.readouts['outerElectrons'])
    })

    it('leaves the electron diagram untouched', () => {
      const a = atomKernel({ ...base, protonNumber: 6, extraNeutrons: 0 })
      const b = atomKernel({ ...base, protonNumber: 6, extraNeutrons: 8 })
      expect(a.bodies).toEqual(b.bodies)
    })
  })

  describe('ions: changing electrons only', () => {
    it('loses electrons to form a positive ion', () => {
      // 0620.2.4.1 — sodium loses one electron to become Na⁺.
      const ion = atomKernel({ ...base, protonNumber: 11, charge: 1 })
      expect(ion.readouts['electrons']).toBe(10)
      expect(ion.readouts['netCharge']).toBe(1)
      // And it now has a full outer shell, like neon.
      expect(ion.readouts['outerElectrons']).toBe(8)
    })

    it('gains electrons to form a negative ion', () => {
      // Chlorine gains one to become Cl⁻.
      const ion = atomKernel({ ...base, protonNumber: 17, charge: -1 })
      expect(ion.readouts['electrons']).toBe(18)
      expect(ion.readouts['netCharge']).toBe(-1)
      expect(ion.readouts['outerElectrons']).toBe(8)
    })

    it('still reports the element’s own group, not the ion’s arrangement', () => {
      // Na⁺ has a neon-like 2,8 shell arrangement, but sodium is Group I.
      const ion = atomKernel({ ...base, protonNumber: 11, charge: 1 })
      expect(ion.readouts['group']).toBe(1)
      expect(ion.readouts['period']).toBe(3)
      // The outer-shell count does reflect the ion, which is why it now reads 8.
      expect(ion.readouts['outerElectrons']).toBe(8)

      const chloride = atomKernel({ ...base, protonNumber: 17, charge: -1 })
      expect(chloride.readouts['group']).toBe(7)
    })

    it('leaves the nucleus untouched', () => {
      const atom = atomKernel({ ...base, protonNumber: 11, charge: 0 })
      const ion = atomKernel({ ...base, protonNumber: 11, charge: 1 })
      expect(ion.readouts['protonNumber']).toBe(atom.readouts['protonNumber'])
      expect(ion.readouts['neutrons']).toBe(atom.readouts['neutrons'])
      expect(ion.readouts['massNumber']).toBe(atom.readouts['massNumber'])
    })

    it('keeps net charge equal to protons minus electrons', () => {
      for (const charge of [-2, -1, 0, 1, 2, 3]) {
        const r = atomKernel({ ...base, protonNumber: 13, charge })
        expect(r.readouts['netCharge']).toBe(
          r.readouts['protonNumber']! - r.readouts['electrons']!
        )
      }
    })
  })

  it('draws one electron per electron', () => {
    for (const z of [1, 6, 11, 17, 20]) {
      const r = atomKernel({ ...base, protonNumber: z })
      expect(r.bodies).toHaveLength(r.readouts['electrons']!)
    }
  })

  it('marks the outer shell separately, since it drives the chemistry', () => {
    const r = atomKernel({ ...base, protonNumber: 11 })
    expect(r.bodies!.filter((b) => b.kind === 'outer')).toHaveLength(1)
    expect(r.bodies!.filter((b) => b.kind === 'inner')).toHaveLength(10)
  })

  it('spaces electrons evenly round each shell', () => {
    const r = atomKernel({ ...base, protonNumber: 10 })
    const inner = r.bodies!.filter((b) => b.kind === 'inner')
    const radii = inner.map((b) => Math.hypot(b.x, b.y))
    expect(Math.max(...radii) - Math.min(...radii)).toBeLessThan(1e-9)
  })

  it('clamps an out-of-range proton number', () => {
    expect(atomKernel({ ...base, protonNumber: 0 }).readouts['protonNumber']).toBe(1)
    expect(atomKernel({ ...base, protonNumber: 99 }).readouts['protonNumber']).toBe(20)
  })

  it('is finite everywhere across the parameter range', () => {
    for (let z = 1; z <= 20; z++) {
      for (const extraNeutrons of [-4, 0, 8]) {
        for (const charge of [-2, 0, 3]) {
          const r = atomKernel({ protonNumber: z, extraNeutrons, charge })
          for (const [k, v] of Object.entries(r.readouts)) {
            expect(Number.isFinite(v), `${k} at Z=${z}`).toBe(true)
          }
          expect(r.readouts['neutrons']).toBeGreaterThanOrEqual(0)
          expect(r.readouts['electrons']).toBeGreaterThanOrEqual(0)
        }
      }
    }
  })
})
