import { describe, expect, it } from 'vitest'
import kernel, {
  AR,
  AVOGADRO,
  MOLAR_VOLUME,
  limiting,
  massOf,
  moles,
  type MolesParams,
} from './kernel'
import { relativeMass } from '@/lib/formula'

const merge = (p: Partial<MolesParams>): MolesParams => ({
  magnesium: p.magnesium ?? 4.8,
  oxygen: p.oxygen ?? 3.2,
  volume: p.volume ?? 250,
})
const run = (p: Partial<MolesParams> = {}) => kernel(merge(p))

describe('moles from mass', () => {
  it('divides mass by relative formula mass', () => {
    expect(moles(24, 24)).toBe(1)
    expect(moles(4.8, 24)).toBeCloseTo(0.2, 9)
    expect(moles(88, 44)).toBe(2)
  })

  it('inverts back to the mass it came from', () => {
    for (const mass of [0.5, 4.8, 24]) {
      expect(massOf(moles(mass, 24), 24), `${mass} g`).toBeCloseTo(mass, 9)
    }
  })

  it('refuses to divide by a relative mass of zero', () => {
    expect(moles(10, 0)).toBe(0)
  })

  it('uses relative masses that give the standard values', () => {
    // These are quoted all over the lesson text, so they had better agree with the table.
    expect(relativeMass('Mg', AR)).toBe(24)
    expect(relativeMass('O2', AR)).toBe(32)
    expect(relativeMass('MgO', AR)).toBe(40)
    expect(relativeMass('CO2', AR)).toBe(44)
    expect(relativeMass('H2O', AR)).toBe(18)
    expect(relativeMass('Ca(OH)2', AR)).toBe(74)
  })
})

describe('which reactant runs out', () => {
  it('compares moles in the ratio the equation demands, not raw moles', () => {
    // 2Mg + O2 -> 2MgO. One mole of oxygen serves two of magnesium. Comparing the two mole
    // counts directly — the usual slip — would name oxygen as limiting here, and it is not.
    expect(limiting(1, 0.6).limiting).toBe('magnesium')
    expect(limiting(1, 0.4).limiting).toBe('oxygen')
  })

  it('reports neither when they match exactly', () => {
    expect(limiting(0.4, 0.2).limiting).toBe('neither')
    expect(limiting(0.4, 0.2).productMoles).toBeCloseTo(0.4, 9)
  })

  it('gives product moles equal to the magnesium when magnesium limits', () => {
    // Two magnesium give two magnesium oxide, so the numbers are equal.
    expect(limiting(0.3, 5).productMoles).toBeCloseTo(0.3, 9)
  })

  it('gives twice the oxygen when oxygen limits', () => {
    expect(limiting(5, 0.3).productMoles).toBeCloseTo(0.6, 9)
  })

  it('produces nothing when a reactant is absent', () => {
    expect(limiting(0, 1).productMoles).toBe(0)
    expect(limiting(1, 0).productMoles).toBe(0)
  })
})

describe('the yield graph', () => {
  it('rises then goes flat, and never falls', () => {
    // The flat part is the whole point: past the corner the extra magnesium has nothing to
    // burn with. A yield that fell would be describing a reaction running backwards.
    const points = run({ oxygen: 3.2 }).series[0]!.points
    for (let i = 1; i < points.length; i++) {
      expect(points[i]![1], `at ${points[i]![0]} g`).toBeGreaterThanOrEqual(points[i - 1]![1])
    }
    expect(points[points.length - 1]![1]).toBe(points[points.length - 2]![1])
  })

  it('moves the corner when more oxygen is supplied', () => {
    const cornerOf = (oxygen: number) => {
      const points = kernel(merge({ oxygen })).series[0]!.points
      const max = Math.max(...points.map((p) => p[1]))
      return points.find((p) => p[1] >= max - 1e-9)![0]
    }
    expect(cornerOf(6.4)).toBeGreaterThan(cornerOf(3.2))
  })

  it('caps the yield at what the oxygen allows', () => {
    // 3.2 g of oxygen is 0.1 mol, which serves 0.2 mol of magnesium and makes 0.2 mol
    // (8.0 g) of magnesium oxide however much magnesium is thrown in.
    const points = run({ oxygen: 3.2 }).series[0]!.points
    expect(Math.max(...points.map((p) => p[1]))).toBeCloseTo(8, 1)
  })
})

describe('the readouts', () => {
  it('reports the worked example correctly', () => {
    // 4.8 g Mg = 0.2 mol; 3.2 g O2 = 0.1 mol, which serves exactly 0.2 mol of Mg.
    const r = run({ magnesium: 4.8, oxygen: 3.2 }).readouts
    expect(r['magnesiumMoles']).toBeCloseTo(0.2, 3)
    expect(r['oxygenMoles']).toBeCloseTo(0.1, 3)
    expect(r['productMass']).toBeCloseTo(8, 2)
  })

  it('conserves mass: the product weighs what both reactants used weighed', () => {
    // A mass that appeared from nowhere would contradict the equation lesson next door.
    const r = run({ magnesium: 4.8, oxygen: 3.2 }).readouts
    expect(r['productMass']).toBeCloseTo(4.8 + 3.2, 2)
  })

  it('gives concentration in mol per dm³', () => {
    // 0.2 mol in 250 cm³ is 0.8 mol/dm³ — the units trap, since the volume is given in cm³.
    expect(run({ magnesium: 4.8, oxygen: 3.2, volume: 250 }).readouts['concentration']).toBeCloseTo(
      0.8,
      3,
    )
    expect(run({ magnesium: 4.8, oxygen: 3.2, volume: 1000 }).readouts['concentration']).toBeCloseTo(
      0.2,
      3,
    )
  })
})

describe('the notes', () => {
  it('names the limiting reactant and says why', () => {
    expect(run({ magnesium: 24, oxygen: 3.2 }).markers?.[0]?.label.en).toContain(
      'Oxygen is the limiting reactant',
    )
    expect(run({ magnesium: 1.2, oxygen: 16 }).markers?.[0]?.label.en).toContain(
      'Magnesium is the limiting reactant',
    )
    expect(run({ magnesium: 4.8, oxygen: 3.2 }).markers?.[0]?.label.en).toContain(
      'Exactly balanced',
    )
    expect(run().markers?.[0]?.label.zh).toBeTruthy()
  })

  it('shows the arithmetic rather than only the answer', () => {
    const note = run({ magnesium: 4.8 }).markers?.[1]?.label.en ?? ''
    expect(note).toContain('÷ 24')
    expect(note).toContain('Mr of 40')
  })
})

describe('the constants', () => {
  it('uses the values the syllabus quotes', () => {
    expect(AVOGADRO).toBeCloseTo(6.02e23, -21)
    expect(MOLAR_VOLUME).toBe(24)
  })
})

describe('the kernel', () => {
  it('returns finite readouts at every corner of the parameter space', () => {
    for (const magnesium of [0, 24]) {
      for (const oxygen of [0, 16]) {
        for (const volume of [50, 1000]) {
          const p = { magnesium, oxygen, volume }
          for (const [key, value] of Object.entries(kernel(p).readouts)) {
            expect(Number.isFinite(value), `${key} at ${JSON.stringify(p)}`).toBe(true)
          }
        }
      }
    }
  })
})
