import { describe, expect, it } from 'vitest'
import kernel, {
  BUTANE,
  ISOMER_OF,
  METHYLPROPANE,
  PROPAN_1_OL,
  PROPAN_2_OL,
  atomCounts,
  structureMass,
  type IsomerParams,
} from './kernel'

const run = (structure: number) => kernel({ structure } as IsomerParams)
const countsOf = (structure: number) => atomCounts(run(structure).bodies ?? [])

describe('the two pairs are genuinely isomers', () => {
  it('gives butane and methylpropane the same molecular formula', () => {
    // The definition of a structural isomer, and the one fact a drawing has to get right.
    // If these counts ever differed, the lesson would be showing two different compounds.
    expect(countsOf(BUTANE)).toEqual(countsOf(METHYLPROPANE))
    expect(countsOf(BUTANE)).toEqual({ C: 4, H: 10 })
  })

  it('gives propan-1-ol and propan-2-ol the same molecular formula', () => {
    expect(countsOf(PROPAN_1_OL)).toEqual(countsOf(PROPAN_2_OL))
    expect(countsOf(PROPAN_1_OL)).toEqual({ C: 3, H: 8, O: 1 })
  })

  it('gives each pair the same relative molecular mass', () => {
    expect(structureMass(run(BUTANE).bodies ?? [])).toBe(58)
    expect(structureMass(run(METHYLPROPANE).bodies ?? [])).toBe(58)
    expect(structureMass(run(PROPAN_1_OL).bodies ?? [])).toBe(60)
    expect(structureMass(run(PROPAN_2_OL).bodies ?? [])).toBe(60)
  })

  it('draws each pair with a different arrangement of bonds', () => {
    // Same formula, different structure. If the bodies were identical the two would be the
    // same molecule drawn twice.
    const positions = (s: number) =>
      (run(s).bodies ?? []).map((b) => `${b.kind}@${b.x},${b.y}`).sort().join('|')
    expect(positions(BUTANE)).not.toBe(positions(METHYLPROPANE))
    expect(positions(PROPAN_1_OL)).not.toBe(positions(PROPAN_2_OL))
  })

  it('pairs each structure with its partner both ways round', () => {
    for (const [a, b] of Object.entries(ISOMER_OF)) {
      expect(ISOMER_OF[b], `${a} and ${b}`).toBe(Number(a))
    }
  })
})

describe('every carbon has four bonds', () => {
  it('holds for all four structures', () => {
    // A carbon with three or five bonds is a drawing error that looks fine at a glance and
    // teaches a valence that does not exist.
    for (const s of [BUTANE, METHYLPROPANE, PROPAN_1_OL, PROPAN_2_OL]) {
      const r = run(s)
      const bodies = r.bodies ?? []
      const counts = new Array<number>(bodies.length).fill(0)
      for (const l of r.links ?? []) {
        counts[l.a] = (counts[l.a] ?? 0) + (l.order ?? 1)
        counts[l.b] = (counts[l.b] ?? 0) + (l.order ?? 1)
      }
      bodies.forEach((b, i) => {
        const expected = b.kind === 'C' ? 4 : b.kind === 'O' ? 2 : 1
        expect(counts[i], `${b.kind} at ${b.x},${b.y} in structure ${s}`).toBe(expected)
      })
    }
  })
})

describe('the branch and the group position', () => {
  it('puts a carbon off the main chain in methylpropane and not in butane', () => {
    const offChain = (s: number) =>
      (run(s).bodies ?? []).filter((b) => b.kind === 'C' && b.y !== 0).length
    expect(offChain(BUTANE)).toBe(0)
    expect(offChain(METHYLPROPANE)).toBe(1)
  })

  it('puts the hydroxyl on an end carbon in propan-1-ol and the middle one in propan-2-ol', () => {
    // Which is the entire meaning of the number in the name.
    const oxygenOf = (s: number) => (run(s).bodies ?? []).find((b) => b.kind === 'O')!
    expect(oxygenOf(PROPAN_1_OL).y).toBe(0)
    expect(oxygenOf(PROPAN_2_OL).y).toBeGreaterThan(0)
  })

  it('marks the hydroxyl bonds as the functional group', () => {
    for (const s of [PROPAN_1_OL, PROPAN_2_OL]) {
      const functional = (run(s).links ?? []).filter((l) => l.kind === 'functional')
      expect(functional, `structure ${s}`).toHaveLength(2)
    }
  })

  it('has no functional group on either alkane', () => {
    for (const s of [BUTANE, METHYLPROPANE]) {
      expect((run(s).links ?? []).some((l) => l.kind === 'functional'), `structure ${s}`).toBe(
        false,
      )
    }
  })
})

describe('the kernel', () => {
  it('names each structure and its partner, in both languages', () => {
    expect(run(BUTANE).markers?.[0]?.label.en).toBe(
      'butane — a structural isomer of methylpropane',
    )
    expect(run(PROPAN_2_OL).markers?.[0]?.label.en).toContain('propan-1-ol')
    expect(run(PROPAN_2_OL).markers?.[0]?.label.zh).toBeTruthy()
  })

  it('returns finite readouts and clamps out-of-range values', () => {
    for (const s of [-3, BUTANE, METHYLPROPANE, PROPAN_1_OL, PROPAN_2_OL, 99]) {
      const r = kernel({ structure: s } as IsomerParams)
      expect((r.bodies ?? []).length, `structure ${s}`).toBeGreaterThan(0)
      for (const [key, value] of Object.entries(r.readouts)) {
        expect(Number.isFinite(value), `${key} at structure ${s}`).toBe(true)
      }
    }
  })
})
