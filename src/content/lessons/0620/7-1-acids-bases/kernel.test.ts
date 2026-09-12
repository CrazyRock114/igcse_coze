import { describe, expect, it } from 'vitest'
import {
  KA_WEAK,
  equivalenceVolume,
  strongAcidPh,
  titrationKernel,
  weakAcidPh,
} from './kernel'

const base = {
  acidConcentration: 0.1,
  alkaliConcentration: 0.1,
  acidVolume: 25,
  maxVolume: 50,
}

describe('equivalenceVolume', () => {
  it('is equal volumes when the concentrations match', () => {
    expect(equivalenceVolume(0.1, 0.1, 25)).toBeCloseTo(25, 10)
  })

  it('halves when the alkali is twice as concentrated', () => {
    expect(equivalenceVolume(0.1, 0.2, 25)).toBeCloseTo(12.5, 10)
  })

  it('doubles when the acid is twice as concentrated', () => {
    expect(equivalenceVolume(0.2, 0.1, 25)).toBeCloseTo(50, 10)
  })

  it('guards against a zero alkali concentration', () => {
    expect(equivalenceVolume(0.1, 0, 25)).toBe(0)
  })
})

describe('strongAcidPh', () => {
  it('starts at pH 1 for 0.1 mol/dm³ acid', () => {
    // Fully dissociated, so [H⁺] = 0.1 and pH = 1.
    expect(strongAcidPh(0.1, 0.1, 25, 0)).toBeCloseTo(1, 6)
  })

  it('gives pH 7 exactly at the equivalence point', () => {
    // 0620.7.1.8 — neutralisation of a strong acid by a strong alkali.
    expect(strongAcidPh(0.1, 0.1, 25, 25)).toBeCloseTo(7, 10)
  })

  it('stays acidic before equivalence and alkaline after', () => {
    expect(strongAcidPh(0.1, 0.1, 25, 20)).toBeLessThan(7)
    expect(strongAcidPh(0.1, 0.1, 25, 30)).toBeGreaterThan(7)
  })

  it('rises steeply through the equivalence point', () => {
    // The near-vertical section is what makes the end-point easy to spot.
    const before = strongAcidPh(0.1, 0.1, 25, 24.9)
    const after = strongAcidPh(0.1, 0.1, 25, 25.1)
    expect(after - before).toBeGreaterThan(4)
  })

  it('rises monotonically as alkali is added', () => {
    let previous = -Infinity
    for (let v = 0; v <= 50; v += 0.5) {
      const ph = strongAcidPh(0.1, 0.1, 25, v)
      expect(ph).toBeGreaterThanOrEqual(previous - 1e-9)
      previous = ph
    }
  })

  it('stays within the pH scale', () => {
    for (const v of [0, 10, 25, 50, 200]) {
      const ph = strongAcidPh(0.1, 0.1, 25, v)
      expect(ph).toBeGreaterThanOrEqual(0)
      expect(ph).toBeLessThanOrEqual(14)
    }
  })
})

describe('weakAcidPh', () => {
  it('starts at a higher pH than the strong acid of the same concentration', () => {
    // 0620.7.1.12 — partial dissociation means fewer H⁺ ions.
    expect(weakAcidPh(0.1, 0.1, 25, 0)).toBeGreaterThan(strongAcidPh(0.1, 0.1, 25, 0))
  })

  it('starts near pH 2.9 for 0.1 mol/dm³ ethanoic acid', () => {
    // [H⁺] = √(Ka·C) = √(1.8e-5 × 0.1) ≈ 1.34e-3
    expect(weakAcidPh(0.1, 0.1, 25, 0)).toBeCloseTo(2.87, 1)
  })

  it('passes through pH = pKa at half neutralisation', () => {
    // The buffer half-way point, where [salt] = [acid].
    const halfway = weakAcidPh(0.1, 0.1, 25, 12.5)
    expect(halfway).toBeCloseTo(-Math.log10(KA_WEAK), 6)
  })

  it('gives an equivalence point above pH 7', () => {
    // 0620.7.1.9 — the conjugate base hydrolyses, so the salt solution is alkaline.
    const ph = weakAcidPh(0.1, 0.1, 25, 25)
    expect(ph).toBeGreaterThan(7)
    expect(ph).toBeLessThan(10)
  })

  it('has a smaller vertical jump at equivalence than the strong acid', () => {
    // This is the real signature of a weak acid, and the reason indicator choice
    // matters. Note it is *not* true that the weak curve rises more gently throughout —
    // in the buffer region it actually rises faster, because it starts from a much
    // higher pH and the strong acid is still barely moving.
    const strongJump = strongAcidPh(0.1, 0.1, 25, 26) - strongAcidPh(0.1, 0.1, 25, 24)
    const weakJump = weakAcidPh(0.1, 0.1, 25, 26) - weakAcidPh(0.1, 0.1, 25, 24)
    expect(weakJump).toBeLessThan(strongJump)
    expect(weakJump).toBeGreaterThan(2)
  })

  it('is flattest around half neutralisation, where the buffer is strongest', () => {
    const gradientAt = (v: number) => weakAcidPh(0.1, 0.1, 25, v + 0.5) - weakAcidPh(0.1, 0.1, 25, v - 0.5)
    // The buffer resists pH change most where [salt] = [acid].
    expect(gradientAt(12.5)).toBeLessThan(gradientAt(3))
    expect(gradientAt(12.5)).toBeLessThan(gradientAt(23))
  })

  it('converges with the strong acid well past equivalence', () => {
    // Once excess alkali dominates, the acid it neutralised no longer matters.
    expect(weakAcidPh(0.1, 0.1, 25, 45)).toBeCloseTo(strongAcidPh(0.1, 0.1, 25, 45), 3)
  })

  it('rises monotonically as alkali is added', () => {
    let previous = -Infinity
    for (let v = 0; v <= 50; v += 0.5) {
      const ph = weakAcidPh(0.1, 0.1, 25, v)
      expect(ph).toBeGreaterThanOrEqual(previous - 1e-9)
      previous = ph
    }
  })

  it('stays within the pH scale', () => {
    for (const v of [0, 12.5, 25, 50, 200]) {
      const ph = weakAcidPh(0.1, 0.1, 25, v)
      expect(ph).toBeGreaterThanOrEqual(0)
      expect(ph).toBeLessThanOrEqual(14)
    }
  })
})

describe('titrationKernel', () => {
  it('plots both acids on the same axes', () => {
    const r = titrationKernel(base)
    expect(r.series.map((s) => s.key)).toEqual(['strong', 'weak'])
    // Same units, so the renderer overlays them — which is the whole point.
    expect(r.series[0]!.unit).toEqual(r.series[1]!.unit)
  })

  it('reports the equivalence volume', () => {
    expect(titrationKernel(base).readouts['equivalenceVolume']).toBeCloseTo(25, 10)
  })

  it('reports the strong acid starting lower than the weak one', () => {
    const r = titrationKernel(base)
    expect(r.readouts['strongStartPh']!).toBeLessThan(r.readouts['weakStartPh']!)
  })

  it('reports a weak-acid equivalence point above neutral', () => {
    expect(titrationKernel(base).readouts['weakEquivalencePh']!).toBeGreaterThan(7)
  })

  it('moves the equivalence point when concentrations change', () => {
    const r = titrationKernel({ ...base, alkaliConcentration: 0.2 })
    expect(r.readouts['equivalenceVolume']).toBeCloseTo(12.5, 10)
  })

  it('agrees between the plotted curve and the reported starting pH', () => {
    const r = titrationKernel(base)
    expect(r.series[0]!.points[0]![1]).toBeCloseTo(r.readouts['strongStartPh']!, 8)
    expect(r.series[1]!.points[0]![1]).toBeCloseTo(r.readouts['weakStartPh']!, 8)
  })

  it('is finite everywhere across the parameter range', () => {
    for (const acidConcentration of [0.01, 0.1, 1]) {
      for (const alkaliConcentration of [0.01, 0.1, 1]) {
        for (const acidVolume of [10, 50]) {
          const r = titrationKernel({ ...base, acidConcentration, alkaliConcentration, acidVolume })
          for (const [k, v] of Object.entries(r.readouts)) {
            expect(Number.isFinite(v), `${k}`).toBe(true)
          }
          for (const s of r.series) {
            for (const [, ph] of s.points) {
              expect(Number.isFinite(ph)).toBe(true)
              expect(ph).toBeGreaterThanOrEqual(0)
              expect(ph).toBeLessThanOrEqual(14)
            }
          }
        }
      }
    }
  })
})
