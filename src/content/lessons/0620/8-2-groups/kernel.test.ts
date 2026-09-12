import { describe, expect, it } from 'vitest'
import { GROUPS, displaces, groupsKernel, stateAtRtp } from './kernel'

const ALKALI = 0
const HALOGEN = 1

const at = (group: number, symbol: string): number =>
  GROUPS[group]!.members.findIndex((m) => m.symbol === symbol)

function run(group: number, symbol: string) {
  const r = groupsKernel({ group, element: at(group, symbol) })
  return { ...r, bodies: r.bodies ?? [] }
}

describe('GROUPS', () => {
  it('covers the two groups the syllabus asks about in detail', () => {
    expect(GROUPS.map((g) => g.number)).toEqual([1, 7])
  })

  it('lists the members in order down the group', () => {
    expect(GROUPS[ALKALI]!.members.map((m) => m.symbol)).toEqual(['Li', 'Na', 'K', 'Rb', 'Cs'])
    expect(GROUPS[HALOGEN]!.members.map((m) => m.symbol)).toEqual(['F', 'Cl', 'Br', 'I'])
  })

  it('has the reactivity trends running opposite ways', () => {
    // 0620.8.2.2 and 8.3.4 — the single thing most often got backwards.
    expect(GROUPS[ALKALI]!.moreReactiveDown).toBe(true)
    expect(GROUPS[HALOGEN]!.moreReactiveDown).toBe(false)
  })

  it('describes every member in both languages', () => {
    for (const g of GROUPS) {
      for (const m of g.members) {
        expect(m.name.zh, m.symbol).toBeTruthy()
        expect(m.appearance.en.length, m.symbol).toBeGreaterThan(0)
        expect(m.appearance.zh, m.symbol).toBeTruthy()
      }
      expect(g.reason.zh, g.key).toBeTruthy()
    }
  })

  it('has Group I melting points falling and Group VII rising', () => {
    // 0620.8.3.1 — and this is the pair of trends the graph puts on one set of axes.
    const alkali = GROUPS[ALKALI]!.members.map((m) => m.meltingPoint)
    for (let i = 1; i < alkali.length; i++) expect(alkali[i]!).toBeLessThan(alkali[i - 1]!)

    const halogen = GROUPS[HALOGEN]!.members.map((m) => m.meltingPoint)
    for (let i = 1; i < halogen.length; i++) expect(halogen[i]!).toBeGreaterThan(halogen[i - 1]!)
  })

  it('has density rising down both groups', () => {
    for (const g of GROUPS) {
      const first = g.members[0]!.density
      const last = g.members[g.members.length - 1]!.density
      expect(last, g.key).toBeGreaterThan(first)
    }
  })
})

describe('stateAtRtp', () => {
  it('gets the three halogens the syllabus names', () => {
    // 0620.8.3.2 — gas, liquid, solid, which is unusual enough to be examined directly.
    expect(stateAtRtp(GROUPS[HALOGEN]!.members[at(HALOGEN, 'Cl')]!)).toBe('gas')
    expect(stateAtRtp(GROUPS[HALOGEN]!.members[at(HALOGEN, 'Br')]!)).toBe('liquid')
    expect(stateAtRtp(GROUPS[HALOGEN]!.members[at(HALOGEN, 'I')]!)).toBe('solid')
  })

  it('makes fluorine a gas', () => {
    expect(stateAtRtp(GROUPS[HALOGEN]!.members[0]!)).toBe('gas')
  })

  it('makes every alkali metal a solid', () => {
    for (const m of GROUPS[ALKALI]!.members) {
      expect(stateAtRtp(m), m.symbol).toBe('solid')
    }
  })
})

describe('displaces', () => {
  it('has a halogen displace every halogen below it', () => {
    // 0620.8.3.3 — chlorine displaces bromine and iodine, but not fluorine.
    expect(displaces(GROUPS[HALOGEN]!, at(HALOGEN, 'F'))).toBe(3)
    expect(displaces(GROUPS[HALOGEN]!, at(HALOGEN, 'Cl'))).toBe(2)
    expect(displaces(GROUPS[HALOGEN]!, at(HALOGEN, 'Br'))).toBe(1)
    expect(displaces(GROUPS[HALOGEN]!, at(HALOGEN, 'I'))).toBe(0)
  })

  it('has an alkali metal displace those above it, the other way round', () => {
    expect(displaces(GROUPS[ALKALI]!, at(ALKALI, 'Li'))).toBe(0)
    expect(displaces(GROUPS[ALKALI]!, at(ALKALI, 'K'))).toBe(2)
    expect(displaces(GROUPS[ALKALI]!, at(ALKALI, 'Cs'))).toBe(4)
  })

  it('never lets an element displace itself or more than the group holds', () => {
    for (const g of GROUPS) {
      for (let i = 0; i < g.members.length; i++) {
        expect(displaces(g, i)).toBeGreaterThanOrEqual(0)
        expect(displaces(g, i)).toBeLessThan(g.members.length)
      }
    }
  })
})

describe('groupsKernel', () => {
  it('draws one rung per member of the chosen group', () => {
    expect(run(ALKALI, 'Na').bodies.filter((b) => b.kind === 'rung' || b.kind === 'selected'))
      .toHaveLength(5)
    expect(run(HALOGEN, 'Cl').bodies.filter((b) => b.kind === 'rung' || b.kind === 'selected'))
      .toHaveLength(4)
  })

  it('highlights exactly the element chosen', () => {
    const selected = run(HALOGEN, 'Br').bodies.filter((b) => b.kind === 'selected')
    expect(selected).toHaveLength(1)
    expect(selected[0]!.label!.startsWith('Br|')).toBe(true)
  })

  it('flips the reactivity arrow between the two groups', () => {
    // The arrow's sign is what tells the renderer which way to point it.
    const alkaliAxis = run(ALKALI, 'Na').bodies.find((b) => b.kind === 'axis')!
    const halogenAxis = run(HALOGEN, 'Cl').bodies.find((b) => b.kind === 'axis')!
    expect(alkaliAxis.y).toBeLessThan(0) // downwards
    expect(halogenAxis.y).toBeGreaterThan(0) // upwards
    expect(alkaliAxis.label).toBe(halogenAxis.label)
  })

  it('puts the displacement line on the side the element can reach', () => {
    const halogen = run(HALOGEN, 'Cl')
    const line = halogen.bodies.find((b) => b.kind === 'threshold')!
    const chlorine = halogen.bodies.find((b) => b.kind === 'selected')!
    expect(line.label).toMatch(/below/)
    expect(line.y).toBeLessThan(chlorine.y)

    const alkali = run(ALKALI, 'K')
    const alkaliLine = alkali.bodies.find((b) => b.kind === 'threshold')!
    const potassium = alkali.bodies.find((b) => b.kind === 'selected')!
    expect(alkaliLine.label).toMatch(/above/)
    expect(alkaliLine.y).toBeGreaterThan(potassium.y)
  })

  it('draws no line for an element that displaces nothing', () => {
    expect(run(HALOGEN, 'I').bodies.filter((b) => b.kind === 'threshold')).toHaveLength(0)
    expect(run(ALKALI, 'Li').bodies.filter((b) => b.kind === 'threshold')).toHaveLength(0)
  })

  it('plots both groups on one set of axes, so the trends can be compared', () => {
    const r = run(HALOGEN, 'Cl')
    expect(r.series).toHaveLength(2)
    expect(r.series[1]!.key).toBe('reference')
    expect(r.series[0]!.unit).toEqual(r.series[1]!.unit)
    // Held still, so switching group does not renormalise the difference away.
    expect(r.series[0]!.yBounds).toEqual(r.series[1]!.yBounds)
  })

  it('plots the chosen group first and the other as the reference', () => {
    expect(run(ALKALI, 'Na').series[0]!.points).toHaveLength(5)
    expect(run(ALKALI, 'Na').series[1]!.points).toHaveLength(4)
    expect(run(HALOGEN, 'Cl').series[0]!.points).toHaveLength(4)
  })

  it('states the state at r.t.p. in the headline', () => {
    expect(run(HALOGEN, 'Br').markers![1]!.label.en).toMatch(/liquid at r\.t\.p\./)
    expect(run(HALOGEN, 'I').markers![1]!.label.en).toMatch(/solid at r\.t\.p\./)
  })

  it('explains the trend by where the outer shell is, not just that there is one', () => {
    expect(run(ALKALI, 'Na').markers![2]!.label.en).toMatch(/further from the nucleus/)
    expect(run(HALOGEN, 'Cl').markers![2]!.label.en).toMatch(/further from the nucleus/)
  })

  it('reports readings that match the element', () => {
    const r = run(HALOGEN, 'Br')
    expect(r.readouts['meltingPoint']).toBe(-7)
    expect(r.readouts['density']).toBe(3.1)
    expect(r.readouts['position']).toBe(3)
    expect(r.readouts['displaces']).toBe(1)
  })

  it('clamps parameters outside their range', () => {
    expect(groupsKernel({ group: -1, element: 0 }).readouts['position']).toBe(1)
    expect(groupsKernel({ group: 99, element: 0 }).readouts['position']).toBe(1)
    // Group VII has only four members, so an index of 9 must land on iodine.
    expect(groupsKernel({ group: 1, element: 9 }).readouts['meltingPoint']).toBe(114)
  })

  it('is finite everywhere across the parameter range', () => {
    for (let group = 0; group < GROUPS.length; group++) {
      for (let element = 0; element < GROUPS[group]!.members.length; element++) {
        const r = groupsKernel({ group, element })
        for (const [k, v] of Object.entries(r.readouts)) {
          expect(Number.isFinite(v), `${k} group=${group} element=${element}`).toBe(true)
        }
        expect(r.markers!.every((m) => m.label.en.length > 0 && m.label.zh)).toBe(true)
      }
    }
  })
})
