import { describe, expect, it } from 'vitest'
import {
  countSigFigs,
  formatExact,
  formatSigFigs,
  formatWithUnit,
  niceAxisMax,
  niceAxisMin,
  niceRange,
  toRadians,
  toScientific,
  toSigFigs,
  toSuperscript,
} from './units'

describe('toSigFigs', () => {
  it('rounds to the requested number of significant figures', () => {
    expect(toSigFigs(40.82, 3)).toBe(40.8)
    expect(toSigFigs(40.82, 2)).toBe(41)
    expect(toSigFigs(0.0004567, 2)).toBeCloseTo(0.00046, 10)
    expect(toSigFigs(123456, 2)).toBe(120000)
  })

  it('returns exact values, with no floating-point residue', () => {
    // Regression: the old scale-round-unscale implementation returned
    // 120000.00000000001 here on some platforms but not others.
    for (const [value, figs, expected] of [
      [123456, 2, 120000],
      [987654321, 3, 988000000],
      [0.000123456, 3, 0.000123],
      [5.5555e12, 4, 5.556e12],
    ] as const) {
      expect(toSigFigs(value, figs)).toBe(expected)
    }
  })

  it('handles zero and negatives', () => {
    expect(toSigFigs(0, 3)).toBe(0)
    expect(toSigFigs(-40.82, 3)).toBe(-40.8)
  })

  it('rejects fewer than one significant figure', () => {
    expect(() => toSigFigs(1.23, 0)).toThrow(RangeError)
  })
})

describe('formatSigFigs', () => {
  it('keeps trailing zeros, because they carry precision', () => {
    // "2.50" claims 3 s.f.; "2.5" claims 2. Students are marked on the difference.
    expect(formatSigFigs(2.5, 3)).toBe('2.50')
    expect(formatSigFigs(9.8, 3)).toBe('9.80')
    expect(formatSigFigs(10, 4)).toBe('10.00')
  })

  it('formats typical readouts', () => {
    expect(formatSigFigs(40.8163, 3)).toBe('40.8')
    expect(formatSigFigs(2.8867, 3)).toBe('2.89')
    expect(formatSigFigs(0.5, 2)).toBe('0.50')
  })

  it('switches to scientific notation at the extremes', () => {
    expect(formatSigFigs(3e8, 3)).toBe('3.00 × 10⁸')
    expect(formatSigFigs(0.0000022, 2)).toBe('2.2 × 10⁻⁶')
  })

  it('handles zero', () => {
    expect(formatSigFigs(0, 3)).toBe('0.00')
  })
})

describe('toScientific', () => {
  it('renders a mantissa and a superscript power', () => {
    expect(toScientific(3e8, 3)).toBe('3.00 × 10⁸')
    expect(toScientific(9.5e15, 2)).toBe('9.5 × 10¹⁵')
    expect(toScientific(2.2e-18, 2)).toBe('2.2 × 10⁻¹⁸')
  })
})

describe('toSuperscript', () => {
  it('converts digits and the minus sign', () => {
    expect(toSuperscript(8)).toBe('⁸')
    expect(toSuperscript(-6)).toBe('⁻⁶')
    expect(toSuperscript(15)).toBe('¹⁵')
  })
})

describe('formatWithUnit', () => {
  it('appends the unit', () => {
    expect(formatWithUnit(9.81, 3, 'm / s²')).toBe('9.81 m / s²')
  })

  it('omits the space when there is no unit', () => {
    expect(formatWithUnit(9.81, 3, '')).toBe('9.81')
  })
})

describe('countSigFigs', () => {
  it('ignores leading zeros and counts trailing ones after a decimal point', () => {
    expect(countSigFigs('0.0450')).toBe(3)
    expect(countSigFigs('2.50')).toBe(3)
    expect(countSigFigs('0.5')).toBe(1)
  })

  it('formats an exact value without padding it', () => {
    // Counts and sums of tabulated masses are exact: "30.0" for an M_r would be wrong.
    expect(formatExact(30)).toBe('30')
    expect(formatExact(23)).toBe('23')
    expect(formatExact(0)).toBe('0')
    // But chloromethane's M_r really is 50.5, so it cannot just be rounded.
    expect(formatExact(50.5)).toBe('50.5')
    expect(formatExact(-162)).toBe('-162')
  })

  it('absorbs floating-point residue from exact arithmetic', () => {
    // 35.5 × 4 + 12 comes out just off in binary floating point.
    expect(formatExact(154.00000000000003)).toBe('154')
    expect(formatExact(22.999999999)).toBe('23')
  })

  it('does not count trailing zeros in a bare integer', () => {
    expect(countSigFigs('1200')).toBe(2)
    expect(countSigFigs('105')).toBe(3)
  })

  it('handles signs and whitespace', () => {
    expect(countSigFigs(' -12.30 ')).toBe(4)
  })

  it('returns 0 for values that are not numbers', () => {
    expect(countSigFigs('about 5')).toBe(0)
    expect(countSigFigs('')).toBe(0)
  })
})

describe('niceRange', () => {
  it('frames data that does not live near zero', () => {
    // Carbon dioxide, 277 to 414 ppm. From a zero baseline this is a flat line near the top.
    expect(niceRange(277, 414)).toEqual({ min: 250, max: 450 })
    // Calendar years: 1750 to 2020 must not be plotted from year zero.
    expect(niceRange(1750, 2020)).toEqual({ min: 1700, max: 2100 })
  })

  it('lands year gridlines on years a reader recognises', () => {
    for (const [lo, hi] of [
      [1750, 2020],
      [1900, 2020],
      [1960, 2020],
      [1990, 2020],
    ] as Array<[number, number]>) {
      const { min, max } = niceRange(lo, hi)
      const step = (max - min) / 4
      // No half-decades: every tick is a whole number of years on a round step.
      expect(Number.isInteger(step), `${lo}–${hi} step ${step}`).toBe(true)
      expect(Number.isInteger(min), `${lo}–${hi} min ${min}`).toBe(true)
    }
  })

  it('always contains both ends of the data', () => {
    for (const [lo, hi] of [
      [277, 414],
      [730, 1879],
      [1750, 2020],
      [1990, 2020],
      [-25, 125],
      [0.001, 0.009],
    ] as Array<[number, number]>) {
      const r = niceRange(lo, hi)
      expect(r.min, `${lo}–${hi}`).toBeLessThanOrEqual(lo)
      expect(r.max, `${lo}–${hi}`).toBeGreaterThanOrEqual(hi)
    }
  })

  it('divides into four equal steps on a round number', () => {
    for (const [lo, hi] of [
      [277, 414],
      [730, 1879],
      [1750, 2020],
    ] as Array<[number, number]>) {
      const { min, max } = niceRange(lo, hi)
      const step = (max - min) / 4
      // Every gridline lands on a multiple of the step, so no tick reads 1997.5.
      expect(Number.isInteger(step) || step >= 1, `${lo}–${hi} step ${step}`).toBe(true)
      expect(min % step, `${lo}–${hi}`).toBeCloseTo(0, 6)
    }
  })

  it('handles a degenerate range without collapsing the axis', () => {
    expect(niceRange(5, 5)).toEqual({ min: 4, max: 6 })
    expect(niceRange(414, 277)).toEqual(niceRange(277, 414))
  })
})

describe('niceAxisMax', () => {
  it('rounds up to 1, 2, 2.5 or 5 times a power of ten', () => {
    expect(niceAxisMax(87)).toBe(100)
    expect(niceAxisMax(23)).toBe(25)
    expect(niceAxisMax(12)).toBe(20)
    expect(niceAxisMax(6)).toBe(10)
    expect(niceAxisMax(0.42)).toBe(0.5)
  })

  it('leaves values already on a boundary alone', () => {
    expect(niceAxisMax(100)).toBe(100)
    expect(niceAxisMax(20)).toBe(20)
    expect(niceAxisMax(5)).toBe(5)
  })

  it('never returns something smaller than its input', () => {
    for (const v of [1, 3, 7, 13, 44, 99, 101, 999, 1234, 0.07]) {
      expect(niceAxisMax(v)).toBeGreaterThanOrEqual(v)
    }
  })

  it('falls back to 1 for zero and invalid input', () => {
    expect(niceAxisMax(0)).toBe(1)
    expect(niceAxisMax(-5)).toBe(1)
    expect(niceAxisMax(NaN)).toBe(1)
  })
})

describe('niceAxisMin', () => {
  it('is zero for non-negative data, keeping a zero baseline', () => {
    expect(niceAxisMin(0)).toBe(0)
    expect(niceAxisMin(5)).toBe(0)
  })

  it('rounds a negative minimum down to a nice value', () => {
    expect(niceAxisMin(-25)).toBe(-25)
    expect(niceAxisMin(-23)).toBe(-25)
    expect(niceAxisMin(-87)).toBe(-100)
  })

  it('never returns something larger than its input', () => {
    for (const v of [-0.07, -3, -12, -44, -101, -999]) {
      expect(niceAxisMin(v)).toBeLessThanOrEqual(v)
    }
  })

  it('handles invalid input', () => {
    expect(niceAxisMin(NaN)).toBe(0)
  })
})

describe('toRadians', () => {
  it('converts degrees to radians', () => {
    expect(toRadians(180)).toBeCloseTo(Math.PI, 10)
    expect(toRadians(45)).toBeCloseTo(Math.PI / 4, 10)
  })
})
