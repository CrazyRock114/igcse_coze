import { describe, expect, it } from 'vitest'
import kernel, {
  isCommonIsotope,
  neutronNumber,
  nucleonNumber,
  type NuclideParams,
} from './kernel'

const base: NuclideParams = { protonNumber: 6, neutrons: 6, charge: 0 }
const merge = (p: Partial<NuclideParams>): NuclideParams => ({
  protonNumber: p.protonNumber ?? base.protonNumber,
  neutrons: p.neutrons ?? base.neutrons,
  charge: p.charge ?? base.charge,
})
const run = (p: Partial<NuclideParams> = {}) => kernel(merge(p))

describe('the numbers on a nuclide', () => {
  it('adds protons and neutrons to give the nucleon number', () => {
    expect(nucleonNumber(6, 6)).toBe(12)
    expect(nucleonNumber(6, 8)).toBe(14)
    expect(run({ protonNumber: 6, neutrons: 8 }).readouts['massNumber']).toBe(14)
  })

  it('subtracts to give the neutron number, which is how exam questions ask it', () => {
    expect(neutronNumber(14, 6)).toBe(8)
    expect(neutronNumber(4, 2)).toBe(2)
  })

  it('is self-consistent both ways round', () => {
    for (const z of [1, 6, 8, 17, 20]) {
      for (const n of [0, 6, 12, 20]) {
        expect(neutronNumber(nucleonNumber(z, n), z), `Z=${z} N=${n}`).toBe(n)
      }
    }
  })
})

describe('what each slider actually changes', () => {
  it('changes the element only when the protons change', () => {
    // The thing students say they know and then get wrong in the next question.
    const carbon = run({ protonNumber: 6, neutrons: 6 }).markers?.[0]?.label.en ?? ''
    const carbon14 = run({ protonNumber: 6, neutrons: 8 }).markers?.[0]?.label.en ?? ''
    const nitrogen = run({ protonNumber: 7, neutrons: 7 }).markers?.[0]?.label.en ?? ''
    expect(carbon).toContain('Carbon')
    expect(carbon14).toContain('Carbon')
    expect(nitrogen).toContain('Nitrogen')
  })

  it('leaves the nucleus alone when the charge changes', () => {
    const atom = run({ protonNumber: 8, neutrons: 8, charge: 0 }).readouts
    const ion = run({ protonNumber: 8, neutrons: 8, charge: -2 }).readouts
    expect(ion['protonNumber']).toBe(atom['protonNumber'])
    expect(ion['neutrons']).toBe(atom['neutrons'])
    expect(ion['massNumber']).toBe(atom['massNumber'])
    expect(ion['nuclearCharge']).toBe(atom['nuclearCharge'])
    expect(ion['electrons']).not.toBe(atom['electrons'])
  })

  it('leaves the electrons alone when the neutrons change', () => {
    // Which is why isotopes of an element are chemically identical.
    expect(run({ protonNumber: 17, neutrons: 18 }).readouts['electrons']).toBe(
      run({ protonNumber: 17, neutrons: 20 }).readouts['electrons'],
    )
  })
})

describe('charge', () => {
  it('makes a neutral atom when protons and electrons are equal', () => {
    const r = run({ protonNumber: 11, neutrons: 12, charge: 0 }).readouts
    expect(r['electrons']).toBe(r['protonNumber'])
    expect(r['netCharge']).toBe(0)
  })

  it('takes electrons away to make a positive ion', () => {
    const r = run({ protonNumber: 11, neutrons: 12, charge: 1 }).readouts
    expect(r['electrons']).toBe(10)
    expect(r['netCharge']).toBe(1)
  })

  it('adds electrons to make a negative ion', () => {
    const r = run({ protonNumber: 17, neutrons: 18, charge: -1 }).readouts
    expect(r['electrons']).toBe(18)
    expect(r['netCharge']).toBe(-1)
  })

  it('reports the nuclear charge as +Z whatever the electrons are doing', () => {
    // 5.1.2.7. The charge on the nucleus is a property of the nucleus, and an ion has not
    // changed its nucleus at all — reporting the net charge here would teach the opposite.
    for (const charge of [-2, 0, 3]) {
      expect(run({ protonNumber: 13, charge }).readouts['nuclearCharge'], `${charge}`).toBe(13)
    }
  })

  it('says in the note which kind of particle it is', () => {
    expect(run({ charge: 0 }).markers?.[1]?.label.en).toContain('neutral atom')
    expect(run({ charge: 2 }).markers?.[1]?.label.en).toContain('positive ion')
    expect(run({ charge: -1 }).markers?.[1]?.label.en).toContain('negative ion')
    expect(run({ charge: -1 }).markers?.[1]?.label.zh).toBeTruthy()
  })

  it('gets the plural right for a single electron', () => {
    expect(run({ charge: 1 }).markers?.[1]?.label.en).toContain('1 electron removed')
    expect(run({ charge: 2 }).markers?.[1]?.label.en).toContain('2 electrons removed')
    expect(run({ charge: -1 }).markers?.[1]?.label.en).toContain('1 extra electron,')
  })
})

describe('isotopes', () => {
  it('recognises the common isotope of an element', () => {
    expect(isCommonIsotope(6, 6)).toBe(true)
    expect(isCommonIsotope(6, 8)).toBe(false)
    expect(isCommonIsotope(1, 0)).toBe(true)
  })

  it('says an uncommon neutron count is an isotope, not a different element', () => {
    const note = run({ protonNumber: 6, neutrons: 8 }).markers?.[0]?.label.en ?? ''
    expect(note).toContain('isotope')
    expect(note).toContain('behaves identically')
  })

  it('argues the chemistry point without quoting an electron count', () => {
    // It once said "there are still N of them", meaning N unchanged by the extra neutrons.
    // On an ion that N is the ion's count, and a reader compares it against the common
    // isotope's — so a C²⁺ read "still 4 electrons" when neutral carbon has 6.
    for (const charge of [-2, 0, 2]) {
      const note = run({ protonNumber: 6, neutrons: 8, charge }).markers?.[0]?.label.en ?? ''
      expect(note, `charge ${charge}`).toContain('adding neutrons does not touch them')
      expect(note, `charge ${charge}`).not.toMatch(/still \d+ of them/)
    }
  })
})

describe('the drawing', () => {
  it('places one body per electron', () => {
    for (const charge of [-2, 0, 2]) {
      const r = run({ protonNumber: 12, charge })
      expect(r.bodies?.length, `charge ${charge}`).toBe(r.readouts['electrons'])
    }
  })

  it('marks the outer shell, which is the one that matters chemically', () => {
    const r = run({ protonNumber: 11 })
    expect(r.bodies?.some((b) => b.kind === 'outer')).toBe(true)
    expect(r.bodies?.some((b) => b.kind === 'inner')).toBe(true)
  })

  it('does not claim a group or a period', () => {
    // Those belong to the chemistry lesson. This one is about the nucleus.
    const r = run().readouts
    expect(r['group']).toBeUndefined()
    expect(r['period']).toBeUndefined()
  })
})

describe('the kernel', () => {
  it('returns finite readouts at every corner of the parameter space', () => {
    for (const protonNumber of [1, 20]) {
      for (const neutrons of [0, 30]) {
        for (const charge of [-2, 3]) {
          const p = { protonNumber, neutrons, charge }
          for (const [key, value] of Object.entries(kernel(p).readouts)) {
            expect(Number.isFinite(value), `${key} at ${JSON.stringify(p)}`).toBe(true)
          }
        }
      }
    }
  })

  it('never reports a negative electron count', () => {
    // Hydrogen stripped of three electrons is not a thing, and the diagram must not try.
    const r = run({ protonNumber: 1, charge: 3 }).readouts
    expect(r['electrons']).toBeGreaterThanOrEqual(0)
  })
})
