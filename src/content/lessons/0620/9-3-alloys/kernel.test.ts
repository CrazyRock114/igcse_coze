import { describe, expect, it } from 'vitest'
import { COLUMNS, MIXTURES, ROWS, alloyKernel, guestPositions, maximumSlip } from './kernel'

const index = (key: string): number => MIXTURES.findIndex((m) => m.key === key)

function run(key: string, force: number) {
  const r = alloyKernel({ mixture: index(key), force })
  return { ...r, bodies: r.bodies ?? [] }
}

const atoms = (key: string, force: number) => run(key, force).bodies.filter((b) => b.kind !== 'slip-plane')

describe('MIXTURES', () => {
  it('offers a pure metal and three alloys 0620 names', () => {
    expect(MIXTURES.map((m) => m.key)).toEqual(['pure', 'brass', 'steel', 'stainless'])
  })

  it('has exactly one with no other element in it', () => {
    expect(MIXTURES.filter((m) => m.guests === 0)).toHaveLength(1)
    expect(MIXTURES[0]!.key).toBe('pure')
  })

  it('gives every alloy an atom of a genuinely different size', () => {
    // If the guest were the same size it would slot into the rows and change nothing.
    for (const m of MIXTURES.slice(1)) {
      expect(Math.abs(1 - m.guestRadius), m.key).toBeGreaterThan(0.05)
    }
  })

  it('includes both a smaller and a larger guest atom', () => {
    // Either mismatch spoils the rows; carbon in steel is small, chromium is large.
    expect(MIXTURES.some((m) => m.guestRadius < 1)).toBe(true)
    expect(MIXTURES.some((m) => m.guestRadius > 1)).toBe(true)
  })

  it('states a use for each, in both languages', () => {
    for (const m of MIXTURES) {
      expect(m.use.en.length, m.key).toBeGreaterThan(0)
      expect(m.use.zh, m.key).toBeTruthy()
      expect(m.label.zh, m.key).toBeTruthy()
    }
  })
})

describe('guestPositions', () => {
  it('places exactly as many guests as asked for', () => {
    for (const m of MIXTURES) {
      expect(guestPositions(m.guests), m.key).toHaveLength(m.guests)
    }
  })

  it('never puts two guests in the same place', () => {
    for (const m of MIXTURES) {
      expect(new Set(guestPositions(m.guests)).size, m.key).toBe(m.guests)
    }
  })

  it('keeps every guest inside the block', () => {
    for (const m of MIXTURES) {
      for (const p of guestPositions(m.guests)) {
        expect(p).toBeGreaterThanOrEqual(0)
        expect(p).toBeLessThan(COLUMNS * ROWS)
      }
    }
  })

  it('spreads them out rather than clustering them in one row', () => {
    for (const m of MIXTURES.slice(1)) {
      const rows = new Set(guestPositions(m.guests).map((p) => Math.floor(p / COLUMNS)))
      expect(rows.size, m.key).toBeGreaterThan(1)
    }
  })

  it('is deterministic, so the diagram is the same every render', () => {
    expect(guestPositions(4)).toEqual(guestPositions(4))
  })
})

describe('maximumSlip', () => {
  it('lets a pure metal slide a whole atom spacing', () => {
    // 0620.9.3.2 — this is what makes a pure metal soft.
    expect(maximumSlip(MIXTURES[0]!)).toBe(1)
  })

  it('lets every alloy slide less than the pure metal', () => {
    // 0620.9.3.5 — the structural reason an alloy is harder and stronger.
    for (const m of MIXTURES.slice(1)) {
      expect(maximumSlip(m), m.key).toBeLessThan(maximumSlip(MIXTURES[0]!))
    }
  })

  it('never seizes completely, since a real alloy still deforms under enough force', () => {
    for (const m of MIXTURES) {
      expect(maximumSlip(m), m.key).toBeGreaterThan(0)
    }
  })
})

describe('alloyKernel', () => {
  it('draws a full block of atoms plus the slip plane', () => {
    const { bodies } = run('steel', 0)
    expect(bodies.filter((b) => b.kind !== 'slip-plane')).toHaveLength(COLUMNS * ROWS)
    expect(bodies.filter((b) => b.kind === 'slip-plane')).toHaveLength(1)
  })

  it('draws the right number of guest atoms', () => {
    for (const m of MIXTURES) {
      expect(atoms(m.key, 0).filter((b) => b.kind === 'guest'), m.key).toHaveLength(m.guests)
    }
  })

  it('draws guest atoms at a different size from the host', () => {
    for (const m of MIXTURES.slice(1)) {
      const guest = atoms(m.key, 0).find((b) => b.kind === 'guest')!
      const host = atoms(m.key, 0).find((b) => b.kind === 'host')!
      expect(guest.r, m.key).not.toBe(host.r)
    }
  })

  it('leaves the block undisturbed with no force applied', () => {
    for (const m of MIXTURES) {
      const xs = atoms(m.key, 0).map((b) => b.x)
      // Every atom sits on a whole-number column.
      expect(xs.every((x) => Number.isInteger(x)), m.key).toBe(true)
      expect(run(m.key, 0).readouts['layerSlip'], m.key).toBe(0)
    }
  })

  it('moves the upper layers and not the lower ones', () => {
    const still = atoms('pure', 0)
    const pushed = atoms('pure', 1)
    const moved = pushed.filter((b, i) => b.x !== still[i]!.x)
    const stayed = pushed.filter((b, i) => b.x === still[i]!.x)

    expect(moved.length).toBeGreaterThan(0)
    expect(stayed.length).toBeGreaterThan(0)
    // Everything that moved is above everything that did not.
    expect(Math.min(...moved.map((b) => b.y))).toBeGreaterThan(Math.max(...stayed.map((b) => b.y)))
  })

  it('slides the pure metal further than any alloy under the same force', () => {
    const pure = run('pure', 1).readouts['layerSlip']!
    for (const m of MIXTURES.slice(1)) {
      expect(run(m.key, 1).readouts['layerSlip']!, m.key).toBeLessThan(pure)
    }
  })

  it('slides further the harder it is pushed', () => {
    for (const m of MIXTURES) {
      const slips = [0, 0.25, 0.5, 0.75, 1].map((f) => run(m.key, f).readouts['layerSlip']!)
      for (let i = 1; i < slips.length; i++) {
        expect(slips[i]!, m.key).toBeGreaterThanOrEqual(slips[i - 1]!)
      }
    }
  })

  it('reports a composition that matches the atoms drawn', () => {
    for (const m of MIXTURES) {
      const r = run(m.key, 0)
      expect(r.readouts['guestAtoms'], m.key).toBe(
        atoms(m.key, 0).filter((b) => b.kind === 'guest').length
      )
      expect(r.readouts['percentGuest'], m.key).toBe(
        Math.round((m.guests / (COLUMNS * ROWS)) * 100)
      )
    }
  })

  it('says a pure metal is a pure metal and an alloy is a mixture', () => {
    // 0620.9.3.1 — an alloy is a mixture, not a compound. No reaction has happened.
    expect(run('pure', 0).markers![1]!.label.en).toMatch(/Pure metal/)
    expect(run('brass', 0).markers![2]!.label.en).toMatch(/mixture/)
  })

  it('clamps parameters outside their range', () => {
    expect(alloyKernel({ mixture: -2, force: 0 }).readouts['guestAtoms']).toBe(0)
    expect(alloyKernel({ mixture: 99, force: 0 }).readouts['guestAtoms']).toBe(6)
    expect(alloyKernel({ mixture: 0, force: 5 }).readouts['layerSlip']).toBe(1)
    expect(alloyKernel({ mixture: 0, force: -5 }).readouts['layerSlip']).toBe(0)
  })

  it('is finite everywhere across the parameter range', () => {
    for (let mixture = 0; mixture < MIXTURES.length; mixture++) {
      for (const force of [0, 0.5, 1]) {
        const r = alloyKernel({ mixture, force })
        for (const [k, v] of Object.entries(r.readouts)) {
          expect(Number.isFinite(v), `${k} mixture=${mixture} force=${force}`).toBe(true)
        }
        for (const b of r.bodies!) {
          expect(Number.isFinite(b.x) && Number.isFinite(b.y)).toBe(true)
        }
        expect(r.markers!.every((m) => m.label.zh)).toBe(true)
      }
    }
  })
})
