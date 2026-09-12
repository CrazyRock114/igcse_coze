import { describe, expect, it } from 'vitest'
import kernel, {
  DIAMOND,
  GRAPHITE,
  METAL,
  SILICA,
  bondByDistance,
  bondCounts,
  diamondPositions,
  graphiteLayer,
} from './kernel'

const run = (structure: number) => kernel({ structure })
const atomsOf = (structure: number) =>
  (run(structure).bodies ?? []).filter((b) => b.kind !== 'electron')

describe('working out bonds from positions', () => {
  it('bonds only pairs at the given distance', () => {
    const points = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 5, y: 0 },
    ]
    const links = bondByDistance(points, 1)
    expect(links).toHaveLength(1)
    expect(links[0]).toEqual({ a: 0, b: 1 })
  })

  it('never bonds an atom to itself or the same pair twice', () => {
    const links = bondByDistance(
      [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
      ],
      1,
    )
    expect(links).toHaveLength(1)
    expect(links.every((l) => l.a !== l.b)).toBe(true)
  })

  it('counts bonds on both ends of every link', () => {
    expect(bondCounts(2, [{ a: 0, b: 1 }])).toEqual([1, 1])
  })
})

describe('diamond', () => {
  it('gives interior carbons four bonds each', () => {
    // The one thing a flat drawing of diamond has to get right. Anything less and the
    // picture is teaching a coordination number that does not exist.
    const points = diamondPositions()
    const counts = bondCounts(points.length, bondByDistance(points, Math.SQRT2))
    expect(Math.max(...counts)).toBe(4)
    expect(run(DIAMOND).readouts['maxBondsOnAnyAtom']).toBe(4)
    expect(run(DIAMOND).readouts['bondsPerAtom']).toBe(4)
  })

  it('labels every atom as carbon', () => {
    expect(atomsOf(DIAMOND).every((b) => b.label === 'C')).toBe(true)
  })

  it('has no delocalised electrons, which is why it does not conduct', () => {
    expect((run(DIAMOND).bodies ?? []).some((b) => b.kind === 'electron')).toBe(false)
    expect(run(DIAMOND).markers?.[2]?.label.en).toContain('does not conduct')
  })
})

describe('graphite', () => {
  it('gives carbons three bonds, not four', () => {
    // The whole difference from diamond, and the reason the fourth electron is free.
    const counts = bondCounts(atomsOf(GRAPHITE).length, run(GRAPHITE).links ?? [])
    expect(Math.max(...counts)).toBe(3)
    expect(run(GRAPHITE).readouts['bondsPerAtom']).toBe(3)
  })

  it('leaves the layers unbonded to each other', () => {
    // If any bond crossed between the layers, graphite could not be soft — so this is a
    // property of the drawing that has to hold, not a detail.
    const bodies = atomsOf(GRAPHITE)
    for (const l of run(GRAPHITE).links ?? []) {
      const a = bodies[l.a]!
      const b = bodies[l.b]!
      const bothLower = a.y < 2 && b.y < 2
      const bothUpper = a.y >= 2 && b.y >= 2
      expect(bothLower || bothUpper, `link ${l.a}-${l.b}`).toBe(true)
    }
  })

  it('draws delocalised electrons between the layers', () => {
    const electrons = (run(GRAPHITE).bodies ?? []).filter((b) => b.kind === 'electron')
    expect(electrons.length).toBeGreaterThan(0)
    for (const e of electrons) {
      expect(e.y).toBeGreaterThan(1)
      expect(e.y).toBeLessThan(3)
    }
  })

  it('makes both consequences explicit', () => {
    const note = run(GRAPHITE).markers?.[2]?.label.en ?? ''
    expect(note).toContain('conducts electricity')
    expect(note).toContain('slide')
  })
})

describe('a layer of graphite', () => {
  it('shares vertices between neighbouring hexagons rather than repeating them', () => {
    // Six vertices for one hexagon; each extra hexagon shares two, so adds only four.
    expect(graphiteLayer(1, 0)).toHaveLength(6)
    expect(graphiteLayer(2, 0)).toHaveLength(10)
    expect(graphiteLayer(3, 0)).toHaveLength(14)
  })
})

describe('silicon(IV) oxide', () => {
  it('gives each silicon four bonds and each oxygen two', () => {
    // Which is exactly where the formula SiO₂ comes from, so it is worth pinning.
    const bodies = atomsOf(SILICA)
    const counts = bondCounts(bodies.length, run(SILICA).links ?? [])
    const silicon = bodies.map((b, i) => [b, counts[i]!] as const).filter(([b]) => b.label === 'Si')
    const oxygen = bodies.map((b, i) => [b, counts[i]!] as const).filter(([b]) => b.label === 'O')
    expect(Math.max(...silicon.map(([, c]) => c))).toBe(4)
    expect(oxygen.every(([, c]) => c === 2)).toBe(true)
  })

  it('has more oxygen atoms than silicon atoms', () => {
    const bodies = atomsOf(SILICA)
    const si = bodies.filter((b) => b.label === 'Si').length
    const o = bodies.filter((b) => b.label === 'O').length
    expect(o).toBeGreaterThan(si)
  })

  it('explains where the formula comes from', () => {
    expect(run(SILICA).markers?.[2]?.label.en).toContain('SiO₂')
  })
})

describe('a metal', () => {
  it('draws positive ions with a sea of electrons and no covalent bonds', () => {
    const r = run(METAL)
    expect(r.links ?? []).toHaveLength(0)
    expect((r.bodies ?? []).filter((b) => b.kind === 'ion').length).toBeGreaterThan(0)
    expect((r.bodies ?? []).filter((b) => b.kind === 'electron').length).toBeGreaterThan(0)
  })

  it('gives both properties their reason', () => {
    const note = run(METAL).markers?.[2]?.label.en ?? ''
    expect(note).toContain('conduct')
    expect(note).toContain('slide')
  })
})

describe('delocalised electrons', () => {
  it('reports them only for the structures that conduct', () => {
    // The quantity that actually separates the four, and the one the notes rely on.
    expect(run(DIAMOND).readouts['delocalisedElectrons']).toBe(0)
    expect(run(SILICA).readouts['delocalisedElectrons']).toBe(0)
    expect(run(GRAPHITE).readouts['delocalisedElectrons']).toBeGreaterThan(0)
    expect(run(METAL).readouts['delocalisedElectrons']).toBeGreaterThan(0)
  })

  it('never claims a melting point for a substance that sublimes', () => {
    // Diamond and graphite have none at ordinary pressure. A number here would be a lie
    // told confidently, which is the worst kind in a revision resource.
    for (const s of [DIAMOND, GRAPHITE]) {
      expect(run(s).readouts['meltingPoint'], `structure ${s}`).toBeUndefined()
      expect(run(s).markers?.[2]?.label.en, `structure ${s}`).not.toMatch(/melting at about/)
    }
    expect(run(SILICA).markers?.[2]?.label.en).toContain('1710')
  })
})

describe('the kernel', () => {
  it('draws something for every structure and clamps out-of-range values', () => {
    for (const s of [-5, DIAMOND, GRAPHITE, SILICA, METAL, 99]) {
      const r = kernel({ structure: s })
      expect((r.bodies ?? []).length, `structure ${s}`).toBeGreaterThan(0)
      expect(r.markers?.[1]?.label.zh, `structure ${s}`).toBeTruthy()
      for (const [key, value] of Object.entries(r.readouts)) {
        expect(Number.isFinite(value), `${key} at structure ${s}`).toBe(true)
      }
    }
  })

  it('keeps every atom inside the bounds it reports', () => {
    for (const s of [DIAMOND, GRAPHITE, SILICA, METAL]) {
      const r = kernel({ structure: s })
      const b = r.bounds!
      for (const body of r.bodies ?? []) {
        expect(body.x, `x at structure ${s}`).toBeGreaterThanOrEqual(b.xMin)
        expect(body.x, `x at structure ${s}`).toBeLessThanOrEqual(b.xMax)
        expect(body.y, `y at structure ${s}`).toBeGreaterThanOrEqual(b.yMin)
        expect(body.y, `y at structure ${s}`).toBeLessThanOrEqual(b.yMax)
      }
    }
  })
})
