import { describe, expect, it } from 'vitest'
import { currentThrough, resistanceKernel, wireResistance } from './kernel'

const RESISTOR = 0
const LAMP = 1
const DIODE = 2

describe('wireResistance', () => {
  it('is directly proportional to length', () => {
    // 0625.4.2.4.5(a)
    expect(wireResistance(10, 1, 1)).toBeCloseTo(10, 10)
    expect(wireResistance(10, 2, 1)).toBeCloseTo(20, 10)
    expect(wireResistance(10, 3, 1)).toBeCloseTo(30, 10)
  })

  it('is inversely proportional to cross-sectional area', () => {
    // 0625.4.2.4.5(b)
    expect(wireResistance(10, 1, 2)).toBeCloseTo(5, 10)
    expect(wireResistance(10, 1, 4)).toBeCloseTo(2.5, 10)
  })

  it('cancels when length and area are doubled together', () => {
    expect(wireResistance(10, 2, 2)).toBeCloseTo(10, 10)
  })

  it('returns Infinity for a zero-area wire rather than NaN', () => {
    expect(wireResistance(10, 1, 0)).toBe(Infinity)
  })
})

describe('currentThrough — fixed resistor', () => {
  it('obeys Ohm’s law', () => {
    // 0625.4.2.4.1
    expect(currentThrough(RESISTOR, 20, 12)).toBeCloseTo(0.6, 10)
    expect(currentThrough(RESISTOR, 100, 5)).toBeCloseTo(0.05, 10)
  })

  it('is a straight line through the origin — doubling V doubles I', () => {
    // 0625.4.2.4.4: the defining feature of an ohmic conductor.
    const a = currentThrough(RESISTOR, 20, 2)
    const b = currentThrough(RESISTOR, 20, 4)
    expect(b).toBeCloseTo(2 * a, 10)
    expect(currentThrough(RESISTOR, 20, 0)).toBe(0)
  })

  it('conducts equally in both directions', () => {
    expect(currentThrough(RESISTOR, 20, -3)).toBeCloseTo(-currentThrough(RESISTOR, 20, 3), 10)
  })

  it('gives the same resistance at every working point', () => {
    for (const v of [1, 3, 5]) {
      expect(v / currentThrough(RESISTOR, 25, v)).toBeCloseTo(25, 8)
    }
  })
})

describe('currentThrough — filament lamp', () => {
  it('curves away from a straight line as the filament heats', () => {
    // 0625.4.2.4.4. Doubling V gives less than double the current.
    const a = currentThrough(LAMP, 20, 2)
    const b = currentThrough(LAMP, 20, 4)
    expect(b).toBeGreaterThan(a)
    expect(b).toBeLessThan(2 * a)
  })

  it('shows a rising resistance at higher p.d.', () => {
    const rLow = 1 / (currentThrough(LAMP, 20, 1) / 1)
    const rHigh = 4 / currentThrough(LAMP, 20, 4)
    expect(rHigh).toBeGreaterThan(rLow)
  })

  it('still passes through the origin', () => {
    expect(currentThrough(LAMP, 20, 0)).toBe(0)
  })

  it('is symmetric — a lamp does not care which way round it is connected', () => {
    expect(currentThrough(LAMP, 20, -4)).toBeCloseTo(-currentThrough(LAMP, 20, 4), 10)
  })

  it('tends to the room-temperature resistance at very small p.d.', () => {
    const tiny = 0.001
    expect(tiny / currentThrough(LAMP, 20, tiny)).toBeCloseTo(20, 1)
  })
})

describe('currentThrough — diode', () => {
  it('blocks current in reverse', () => {
    // 0625.4.2.4.4
    for (const v of [-0.5, -2, -6]) {
      expect(currentThrough(DIODE, 20, v)).toBe(0)
    }
  })

  it('blocks current below the forward knee voltage', () => {
    expect(currentThrough(DIODE, 20, 0.3)).toBe(0)
    expect(currentThrough(DIODE, 20, 0.7)).toBe(0)
  })

  it('conducts sharply once past the knee', () => {
    const justAfter = currentThrough(DIODE, 20, 1)
    const wellAfter = currentThrough(DIODE, 20, 3)
    expect(justAfter).toBeGreaterThan(0)
    expect(wellAfter).toBeGreaterThan(justAfter * 3)
  })

  it('is not symmetric, unlike a resistor or a lamp', () => {
    expect(currentThrough(DIODE, 20, 3)).toBeGreaterThan(0)
    expect(currentThrough(DIODE, 20, -3)).toBe(0)
  })
})

describe('currentThrough — guards', () => {
  it('returns zero for a non-finite or non-positive resistance', () => {
    expect(currentThrough(RESISTOR, Infinity, 5)).toBe(0)
    expect(currentThrough(RESISTOR, 0, 5)).toBe(0)
    expect(currentThrough(LAMP, -10, 5)).toBe(0)
  })
})

describe('resistanceKernel', () => {
  const base = { component: RESISTOR, resistance: 20, lengthFactor: 1, areaFactor: 1 }

  it('plots current against p.d. across positive and negative voltage', () => {
    const pts = resistanceKernel(base).series[0]!.points
    expect(pts[0]![0]).toBeCloseTo(-6, 10)
    expect(pts[pts.length - 1]![0]).toBeCloseTo(6, 10)
    expect(resistanceKernel(base).series[0]!.unit).toEqual({ x: 'V', y: 'A' })
  })

  it('applies the wire geometry to the effective resistance', () => {
    expect(resistanceKernel({ ...base, lengthFactor: 3 }).readouts['effectiveResistance']).toBeCloseTo(60, 10)
    expect(resistanceKernel({ ...base, areaFactor: 4 }).readouts['effectiveResistance']).toBeCloseTo(5, 10)
  })

  it('recovers the true resistance from V / I for an ohmic conductor', () => {
    // The graph and the readout must agree — this is the claim made to the student.
    const r = resistanceKernel({ ...base, resistance: 25 })
    expect(r.readouts['measuredResistance']).toBeCloseTo(25, 8)
  })

  it('measures a higher resistance than the cold value for a lamp', () => {
    const r = resistanceKernel({ ...base, component: LAMP, resistance: 20 })
    expect(r.readouts['measuredResistance']!).toBeGreaterThan(20)
  })

  it('flags whether the component is ohmic', () => {
    expect(resistanceKernel(base).readouts['isOhmic']).toBe(1)
    expect(resistanceKernel({ ...base, component: LAMP }).readouts['isOhmic']).toBe(0)
    expect(resistanceKernel({ ...base, component: DIODE }).readouts['isOhmic']).toBe(0)
  })

  it('agrees between the plotted curve and the reported current at 4 V', () => {
    const r = resistanceKernel({ ...base, component: LAMP })
    const at4 = r.series[0]!.points.find(([v]) => Math.abs(v - 4) < 1e-9)
    expect(at4).toBeDefined()
    expect(at4![1]).toBeCloseTo(r.readouts['currentAt4V']!, 10)
  })

  it('is finite everywhere across the parameter range', () => {
    for (const component of [RESISTOR, LAMP, DIODE]) {
      for (const resistance of [5, 100]) {
        for (const lengthFactor of [0.5, 3]) {
          for (const areaFactor of [0.5, 3]) {
            const r = resistanceKernel({ component, resistance, lengthFactor, areaFactor })
            for (const [k, v] of Object.entries(r.readouts)) {
              expect(Number.isFinite(v), `${k}`).toBe(true)
            }
            for (const [, i] of r.series[0]!.points) expect(Number.isFinite(i)).toBe(true)
          }
        }
      }
    }
  })
})
