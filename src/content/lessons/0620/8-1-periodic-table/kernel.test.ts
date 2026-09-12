import { describe, expect, it } from 'vitest'
import {
  CONFIGURATION_LIMIT,
  ELEMENTS,
  column,
  ionCharge,
  outerElectrons,
  periodicKernel,
  roman,
  shellCount,
  shellPattern,
} from './kernel'

const at = (symbol: string) => ELEMENTS.find((e) => e.symbol === symbol)!

function run(symbol: string) {
  const r = periodicKernel({ protonNumber: at(symbol).z })
  return { ...r, bodies: r.bodies ?? [] }
}

describe('ELEMENTS', () => {
  it('covers periods 1 to 4 with no gaps in proton number', () => {
    // 0620.8.1.1 — the table is an arrangement in order of proton number.
    expect(ELEMENTS).toHaveLength(36)
    ELEMENTS.forEach((e, i) => expect(e.z).toBe(i + 1))
  })

  it('names every element in both languages', () => {
    for (const e of ELEMENTS) {
      expect(e.name.en.length, e.symbol).toBeGreaterThan(0)
      expect(e.name.zh, e.symbol).toBeTruthy()
    }
  })

  it('has the right number of elements in each period', () => {
    // 2, 8, 8, 18 — the shell capacities, which is why the table is that shape.
    const counts = [1, 2, 3, 4].map((p) => ELEMENTS.filter((e) => e.period === p).length)
    expect(counts).toEqual([2, 8, 8, 18])
  })

  it('runs a full column down groups I and VIII', () => {
    expect(ELEMENTS.filter((e) => e.group === 1)).toHaveLength(4) // H, Li, Na, K
    expect(ELEMENTS.filter((e) => e.group === 8)).toHaveLength(4) // He, Ne, Ar, Kr
    expect(ELEMENTS.filter((e) => e.category === 'transition')).toHaveLength(10)
  })

  it('puts a noble gas at the end of every period', () => {
    for (const period of [1, 2, 3, 4]) {
      const inPeriod = ELEMENTS.filter((e) => e.period === period)
      expect(inPeriod[inPeriod.length - 1]!.category, `period ${period}`).toBe('noble')
    }
  })

  it('runs metal to non-metal across a period', () => {
    // 0620.8.1.2 — the change is left to right, and it is gradual.
    const period3 = ELEMENTS.filter((e) => e.period === 3)
    expect(period3[0]!.category).toBe('metal')
    expect(period3[1]!.category).toBe('metal')
    expect(period3[3]!.category).toBe('metalloid')
    expect(period3[6]!.category).toBe('nonmetal')
  })
})

describe('column', () => {
  it('gives every element a place of its own', () => {
    const seen = new Set(ELEMENTS.map((e) => `${column(e)},${e.period}`))
    expect(seen.size).toBe(ELEMENTS.length)
  })

  it('keeps every element inside the eighteen columns', () => {
    for (const e of ELEMENTS) {
      expect(column(e), e.symbol).toBeGreaterThanOrEqual(1)
      expect(column(e), e.symbol).toBeLessThanOrEqual(18)
    }
  })

  it('puts a group in one column, all the way down', () => {
    // 0620.8.1.4 — a group is a column precisely because those elements are alike.
    for (const group of [1, 2, 3, 4, 5, 6, 7, 8]) {
      const columns = new Set(ELEMENTS.filter((e) => e.group === group).map(column))
      expect(columns.size, `group ${group}`).toBe(1)
    }
  })

  it('pushes groups III to VIII to the right, leaving the gap', () => {
    expect(column(at('B'))).toBe(13)
    expect(column(at('Ne'))).toBe(18)
    expect(column(at('Sc'))).toBe(3)
    expect(column(at('Zn'))).toBe(12)
  })
})

describe('outerElectrons', () => {
  it('equals the group number', () => {
    // 0620.8.1.5 — position and electronic configuration are the same information.
    expect(outerElectrons(at('Na'))).toBe(1)
    expect(outerElectrons(at('Mg'))).toBe(2)
    expect(outerElectrons(at('Cl'))).toBe(7)
    expect(outerElectrons(at('Ar'))).toBe(8)
  })

  it('gives helium two, not eight', () => {
    // Its shell is full at two, which is what puts it in Group VIII.
    expect(outerElectrons(at('He'))).toBe(2)
  })
})

describe('ionCharge', () => {
  it('matches the group number for groups I to III', () => {
    // 0620.8.1.3
    expect(ionCharge(at('Na'))).toBe(1)
    expect(ionCharge(at('Mg'))).toBe(2)
    expect(ionCharge(at('Al'))).toBe(3)
  })

  it('is negative for groups V to VII, counting back from eight', () => {
    expect(ionCharge(at('N'))).toBe(-3)
    expect(ionCharge(at('O'))).toBe(-2)
    expect(ionCharge(at('Cl'))).toBe(-1)
  })

  it('is zero for Group IV and the noble gases', () => {
    // Group IV would have to move four electrons either way, so it shares instead.
    expect(ionCharge(at('C'))).toBe(0)
    expect(ionCharge(at('Si'))).toBe(0)
    expect(ionCharge(at('Ne'))).toBe(0)
  })

  it('is zero for the transition elements, which have variable oxidation numbers', () => {
    for (const e of ELEMENTS.filter((x) => x.category === 'transition')) {
      expect(ionCharge(e), e.symbol).toBe(0)
    }
  })

  it('never asks an atom to move more than three electrons', () => {
    for (const e of ELEMENTS) {
      expect(Math.abs(ionCharge(e)), e.symbol).toBeLessThanOrEqual(3)
    }
  })
})

describe('shellPattern and shellCount', () => {
  it('fills 2, 8, 8, 2 for the first twenty elements', () => {
    expect(shellPattern(11)).toEqual([2, 8, 1])
    expect(shellPattern(17)).toEqual([2, 8, 7])
    expect(shellPattern(20)).toEqual([2, 8, 8, 2])
  })

  it('refuses to invent a configuration past calcium', () => {
    // Iron is 2,8,14,2 — the simple rule gives 2,8,8,8, which a student might write down.
    expect(shellPattern(21)).toBeNull()
    expect(shellPattern(26)).toBeNull()
    expect(CONFIGURATION_LIMIT).toBe(20)
  })

  it('counts shells correctly for every element in the table', () => {
    // Unlike the configuration, the shell count stays right past calcium.
    for (const e of ELEMENTS) {
      expect(shellCount(e.z), e.symbol).toBe(e.period)
    }
  })

  it('agrees with the pattern where the pattern is defined', () => {
    for (let z = 1; z <= CONFIGURATION_LIMIT; z++) {
      expect(shellPattern(z)!.length, `z=${z}`).toBe(shellCount(z))
    }
  })

  it('accounts for every electron', () => {
    for (let z = 1; z <= CONFIGURATION_LIMIT; z++) {
      expect(shellPattern(z)!.reduce((a, b) => a + b, 0)).toBe(z)
    }
  })
})

describe('roman', () => {
  it('writes group numbers the way the syllabus does', () => {
    expect(roman(1)).toBe('I')
    expect(roman(4)).toBe('IV')
    expect(roman(7)).toBe('VII')
    expect(roman(8)).toBe('VIII')
  })
})

describe('periodicKernel', () => {
  it('draws every element once', () => {
    expect(run('Na').bodies).toHaveLength(ELEMENTS.length)
  })

  it('highlights exactly the element chosen', () => {
    for (const symbol of ['H', 'Fe', 'Kr']) {
      const selected = run(symbol).bodies.filter((b) => b.kind === 'selected')
      expect(selected, symbol).toHaveLength(1)
      expect(selected[0]!.label).toBe(`${at(symbol).z}|${symbol}`)
    }
  })

  it('colours the others by what they are', () => {
    const kinds = new Set(run('Na').bodies.map((b) => b.kind))
    expect(kinds).toContain('metal')
    expect(kinds).toContain('nonmetal')
    expect(kinds).toContain('noble')
    expect(kinds).toContain('transition')
  })

  it('gives the element’s address in the table', () => {
    expect(run('Cl').markers![1]!.label.en).toMatch(/Group VII, Period 3/)
    expect(run('Fe').markers![1]!.label.en).toMatch(/transition block, Period 4/)
  })

  it('reads the configuration off the position, for elements that have one', () => {
    expect(run('Na').markers![2]!.label.en).toMatch(/2,8,1/)
    expect(run('Na').markers![2]!.label.en).toMatch(/Group I/)
  })

  it('says why it cannot give a configuration past calcium', () => {
    const note = run('Fe').markers![2]!.label.en
    expect(note).not.toMatch(/2,8,8,8/)
    expect(note).toMatch(/does not ask for configurations beyond element 20/)
  })

  it('describes the noble gases by their full outer shell', () => {
    // 0620.8.5.1-2
    const note = run('Ar').markers![2]!.label.en
    expect(note).toMatch(/full outer shell/)
    expect(note).toMatch(/unreactive/)
    expect(note).toMatch(/single atoms/)
  })

  it('describes the transition elements by what makes them different', () => {
    // 0620.8.4.1-2
    const note = run('Cu').markers![2]!.label.en
    expect(note).toMatch(/coloured compounds/)
    expect(note).toMatch(/variable oxidation numbers/)
    expect(note).toMatch(/catalysts/)
  })

  it('reports readings that match the element', () => {
    const r = run('S')
    expect(r.readouts['protonNumber']).toBe(16)
    expect(r.readouts['group']).toBe(6)
    expect(r.readouts['period']).toBe(3)
    expect(r.readouts['ionCharge']).toBe(-2)
  })

  it('clamps parameters outside their range', () => {
    expect(periodicKernel({ protonNumber: 0 }).readouts['protonNumber']).toBe(1)
    expect(periodicKernel({ protonNumber: 99 }).readouts['protonNumber']).toBe(36)
  })

  it('is finite everywhere across the parameter range', () => {
    for (let z = 1; z <= ELEMENTS.length; z++) {
      const r = periodicKernel({ protonNumber: z })
      for (const [k, v] of Object.entries(r.readouts)) {
        expect(Number.isFinite(v), `${k} at z=${z}`).toBe(true)
      }
      expect(r.markers!.every((m) => m.label.en.length > 0 && m.label.zh)).toBe(true)
    }
  })
})
