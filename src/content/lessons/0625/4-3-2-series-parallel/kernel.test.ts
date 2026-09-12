import { describe, expect, it } from 'vitest'
import { chargeDots, circuitKernel, parallelResistance, seriesResistance } from './kernel'

describe('seriesResistance', () => {
  it('adds the resistances', () => {
    // 0625.4.3.2.4
    expect(seriesResistance(10, 20)).toBe(30)
    expect(seriesResistance(4.7, 2.3)).toBeCloseTo(7, 10)
  })

  it('is always at least as large as either resistor', () => {
    for (const [a, b] of [
      [1, 1],
      [5, 100],
      [47, 3],
    ]) {
      const total = seriesResistance(a!, b!)
      expect(total).toBeGreaterThanOrEqual(a!)
      expect(total).toBeGreaterThanOrEqual(b!)
    }
  })
})

describe('parallelResistance', () => {
  it('uses the product over sum rule', () => {
    // 0625.4.3.2.10
    expect(parallelResistance(10, 10)).toBeCloseTo(5, 10)
    expect(parallelResistance(20, 30)).toBeCloseTo(12, 10)
    expect(parallelResistance(6, 3)).toBeCloseTo(2, 10)
  })

  it('is always less than either resistor alone', () => {
    // 0625.4.3.2.6 — the statement students most often get backwards.
    for (const [a, b] of [
      [1, 1],
      [5, 100],
      [47, 3],
      [100, 100],
    ]) {
      const total = parallelResistance(a!, b!)
      expect(total).toBeLessThan(a!)
      expect(total).toBeLessThan(b!)
    }
  })

  it('halves for two equal resistors', () => {
    expect(parallelResistance(47, 47)).toBeCloseTo(23.5, 10)
  })

  it('agrees with the reciprocal form', () => {
    for (const [a, b] of [
      [10, 15],
      [22, 47],
      [3.3, 6.8],
    ]) {
      expect(parallelResistance(a!, b!)).toBeCloseTo(1 / (1 / a! + 1 / b!), 8)
    }
  })

  it('handles a degenerate resistance without returning NaN', () => {
    expect(parallelResistance(0, 10)).toBe(0)
  })
})

describe('chargeDots', () => {
  it('shows more dots for a larger current', () => {
    expect(chargeDots('main', 2, 0).length).toBeGreaterThan(chargeDots('main', 0.5, 0).length)
  })

  it('shows no dots when no current flows', () => {
    expect(chargeDots('main', 0, 0)).toHaveLength(0)
  })

  it('keeps every dot on the branch, at all times', () => {
    for (let t = 0; t < 40; t += 0.37) {
      for (const dot of chargeDots('r1', 1.5, t)) {
        expect(dot.x).toBeGreaterThanOrEqual(0)
        expect(dot.x).toBeLessThan(1)
      }
    }
  })

  it('spaces the dots evenly — charge does not bunch up in a wire', () => {
    // Checked mid-drift, not just at t = 0, since that is when uneven spacing would show.
    for (const t of [0, 0.7, 3.2]) {
      const xs = chargeDots('main', 1, t)
        .map((d) => d.x)
        .sort((a, b) => a - b)
      const gaps: number[] = []
      for (let i = 1; i < xs.length; i++) gaps.push(xs[i]! - xs[i - 1]!)
      expect(Math.max(...gaps) - Math.min(...gaps)).toBeLessThan(1e-9)
    }
  })

  it('tags each dot with its branch so the renderer can place it', () => {
    expect(chargeDots('r2', 1, 0).every((d) => d.kind === 'r2')).toBe(true)
  })

  it('moves the dots as time advances', () => {
    const a = chargeDots('main', 1, 0).map((d) => d.x)
    const b = chargeDots('main', 1, 1).map((d) => d.x)
    expect(a).not.toEqual(b)
  })

  it('caps the dot count so a large current does not draw a solid line', () => {
    expect(chargeDots('main', 50, 0).length).toBeLessThanOrEqual(15)
  })

  it('shows enough dots at a typical circuit current to read as a flow', () => {
    // 12 V across 60 Ω gives 0.2 A — the default. One dot would not look like current.
    expect(chargeDots('main', 0.2, 0).length).toBeGreaterThanOrEqual(3)
    expect(chargeDots('main', 0.06, 0).length).toBeGreaterThanOrEqual(3)
  })

  it('completes a visible fraction of a loop per second at a typical current', () => {
    // Slow enough to follow, fast enough not to look frozen.
    const before = chargeDots('main', 0.2, 0)[0]!.x
    const after = chargeDots('main', 0.2, 1)[0]!.x
    expect(Math.abs(after - before)).toBeGreaterThan(0.05)
  })
})

describe('circuitKernel', () => {
  const base = { parallel: 0, emf: 12, r1: 20, r2: 40, t: 0 }

  describe('series', () => {
    it('adds the resistances and applies Ohm’s law to the total', () => {
      const r = circuitKernel(base)
      expect(r.readouts['totalResistance']).toBeCloseTo(60, 10)
      expect(r.readouts['supplyCurrent']).toBeCloseTo(0.2, 10)
    })

    it('drives the same current through both resistors', () => {
      // 0625.4.3.2.1 — the rule the animation is there to show.
      const r = circuitKernel(base)
      expect(r.readouts['i1']).toBeCloseTo(r.readouts['i2']!, 10)
      expect(r.readouts['i1']).toBeCloseTo(r.readouts['supplyCurrent']!, 10)
    })

    it('shares the p.d. in proportion to resistance', () => {
      const r = circuitKernel(base)
      expect(r.readouts['v1']).toBeCloseTo(4, 10) // 0.2 × 20
      expect(r.readouts['v2']).toBeCloseTo(8, 10) // 0.2 × 40
      expect(r.readouts['v1']! / r.readouts['v2']!).toBeCloseTo(20 / 40, 10)
    })

    it('makes the p.d.s add up to the e.m.f.', () => {
      // 0625.4.3.2.8(b)
      for (const [r1, r2] of [
        [10, 10],
        [22, 47],
        [1, 100],
      ]) {
        const r = circuitKernel({ ...base, r1: r1!, r2: r2! })
        expect(r.readouts['sumOfPds']).toBeCloseTo(base.emf, 8)
      }
    })

    it('gives every branch the same number of charge dots', () => {
      const r = circuitKernel({ ...base, emf: 12, r1: 20, r2: 40 })
      const count = (k: string) => r.bodies!.filter((b) => b.kind === k).length
      expect(count('r1')).toBe(count('r2'))
      expect(count('main')).toBe(count('r1'))
    })
  })

  describe('parallel', () => {
    const par = { ...base, parallel: 1 }

    it('gives a combined resistance below either resistor', () => {
      const r = circuitKernel(par)
      expect(r.readouts['totalResistance']).toBeCloseTo(40 / 3, 6)
      expect(r.readouts['totalResistance']!).toBeLessThan(20)
    })

    it('puts the full e.m.f. across both resistors', () => {
      // 0625.4.3.2.8(c)
      const r = circuitKernel(par)
      expect(r.readouts['v1']).toBeCloseTo(12, 10)
      expect(r.readouts['v2']).toBeCloseTo(12, 10)
    })

    it('makes the branch currents add up to the supply current', () => {
      // 0625.4.3.2.8(a) and .9 — Kirchhoff at a junction.
      for (const [r1, r2] of [
        [10, 10],
        [22, 47],
        [1, 100],
      ]) {
        const r = circuitKernel({ ...par, r1: r1!, r2: r2! })
        expect(r.readouts['sumOfCurrents']).toBeCloseTo(r.readouts['supplyCurrent']!, 8)
      }
    })

    it('sends more current down the lower-resistance branch', () => {
      const r = circuitKernel({ ...par, r1: 10, r2: 40 })
      expect(r.readouts['i1']!).toBeGreaterThan(r.readouts['i2']!)
      expect(r.readouts['i1']! / r.readouts['i2']!).toBeCloseTo(4, 8)
    })

    it('draws more dots in the main branch than in either branch', () => {
      // 0625.4.3.2.5 — supply current exceeds the current in each branch.
      const r = circuitKernel({ ...par, emf: 12, r1: 20, r2: 20 })
      const count = (k: string) => r.bodies!.filter((b) => b.kind === k).length
      expect(count('main')).toBeGreaterThan(count('r1'))
      expect(count('main')).toBeGreaterThan(count('r2'))
    })
  })

  it('reports which topology is in play, so the lesson can state the right rule', () => {
    expect(circuitKernel(base).readouts['isParallel']).toBe(0)
    expect(circuitKernel({ ...base, parallel: 1 }).readouts['isParallel']).toBe(1)
  })

  it('draws a lower total resistance in parallel than in series, for the same resistors', () => {
    const s = circuitKernel(base).readouts['totalResistance']!
    const p = circuitKernel({ ...base, parallel: 1 }).readouts['totalResistance']!
    expect(p).toBeLessThan(s)
  })

  it('computes supply power as e.m.f. times current', () => {
    const r = circuitKernel(base)
    expect(r.readouts['power']).toBeCloseTo(12 * 0.2, 10)
  })

  it('is a pure function of time', () => {
    expect(circuitKernel({ ...base, t: 2.5 })).toEqual(circuitKernel({ ...base, t: 2.5 }))
  })

  it('is finite everywhere across the parameter range', () => {
    for (const parallel of [0, 1]) {
      for (const emf of [1, 12]) {
        for (const r1 of [1, 100]) {
          for (const r2 of [1, 100]) {
            const r = circuitKernel({ parallel, emf, r1, r2, t: 3 })
            for (const [k, v] of Object.entries(r.readouts)) {
              expect(Number.isFinite(v), `${k} at ${JSON.stringify({ parallel, emf, r1, r2 })}`).toBe(
                true
              )
            }
          }
        }
      }
    }
  })
})
