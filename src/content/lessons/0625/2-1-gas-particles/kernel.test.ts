import { describe, expect, it } from 'vitest'
import { bounce, gasKernel, hashRandom, meanSpeed } from './kernel'

describe('hashRandom', () => {
  it('is deterministic', () => {
    expect(hashRandom(7)).toBe(hashRandom(7))
  })

  it('stays in [0, 1)', () => {
    for (let i = 0; i < 500; i++) {
      const v = hashRandom(i)
      expect(v).toBeGreaterThanOrEqual(0)
      expect(v).toBeLessThan(1)
    }
  })

  it('decorrelates neighbouring seeds, so particles do not start in a line', () => {
    const a = Array.from({ length: 40 }, (_, i) => hashRandom(i))
    // Consecutive values should not march monotonically.
    let ascents = 0
    for (let i = 1; i < a.length; i++) if (a[i]! > a[i - 1]!) ascents++
    expect(ascents).toBeGreaterThan(10)
    expect(ascents).toBeLessThan(30)
  })

  it('spreads across the range', () => {
    const buckets = [0, 0, 0, 0]
    for (let i = 0; i < 400; i++) buckets[Math.floor(hashRandom(i) * 4)]!++
    for (const b of buckets) expect(b).toBeGreaterThan(50)
  })
})

describe('bounce', () => {
  it('travels in a straight line before reaching a wall', () => {
    expect(bounce(0, 1, 0.5, 10)).toBeCloseTo(0.5, 10)
    expect(bounce(2, 3, 1, 10)).toBeCloseTo(5, 10)
  })

  it('never leaves the box, however long it runs', () => {
    for (const v of [-3.7, -1, 0.3, 2.5, 9.1]) {
      for (let t = 0; t < 200; t += 0.37) {
        const x = bounce(0.4, v, t, 1)
        expect(x).toBeGreaterThanOrEqual(0)
        expect(x).toBeLessThanOrEqual(1)
      }
    }
  })

  it('reverses direction at a wall — an elastic bounce', () => {
    // Starting at 0 with v = 1 in a box of length 1: reaches the far wall at t = 1,
    // comes back to 0 at t = 2.
    expect(bounce(0, 1, 1, 1)).toBeCloseTo(1, 10)
    expect(bounce(0, 1, 1.5, 1)).toBeCloseTo(0.5, 10)
    expect(bounce(0, 1, 2, 1)).toBeCloseTo(0, 10)
  })

  it('is periodic with period 2L', () => {
    const L = 1.3
    for (const t of [0.2, 0.9, 1.7]) {
      expect(bounce(0.3, 1, t, L)).toBeCloseTo(bounce(0.3, 1, t + 2 * L, L), 8)
    }
  })

  it('stands still when the velocity is zero', () => {
    expect(bounce(0.4, 0, 99, 1)).toBeCloseTo(0.4, 10)
  })

  it('handles a degenerate box', () => {
    expect(bounce(0.5, 1, 1, 0)).toBe(0)
  })
})

describe('meanSpeed', () => {
  it('goes as the square root of absolute temperature', () => {
    // 0625.2.1.2.2 — particle motion and temperature
    expect(meanSpeed(300)).toBeCloseTo(1, 10)
    expect(meanSpeed(1200)).toBeCloseTo(2, 10)
    expect(meanSpeed(75)).toBeCloseTo(0.5, 10)
  })

  it('is zero at absolute zero — particles have least kinetic energy', () => {
    expect(meanSpeed(0)).toBe(0)
  })

  it('never returns NaN for a nonsensical temperature', () => {
    expect(meanSpeed(-50)).toBe(0)
  })

  it('increases with temperature', () => {
    let previous = 0
    for (const T of [100, 200, 300, 500, 900]) {
      const s = meanSpeed(T)
      expect(s).toBeGreaterThan(previous)
      previous = s
    }
  })
})

describe('gasKernel', () => {
  const base = { temperature: 300, volume: 1, count: 40, t: 0 }

  it('produces the requested number of particles', () => {
    expect(gasKernel({ ...base, count: 25 }).bodies).toHaveLength(25)
  })

  it('keeps every particle inside the container at all times', () => {
    for (const t of [0, 0.3, 1.1, 5.7, 40]) {
      for (const volume of [0.3, 0.6, 1]) {
        const r = gasKernel({ ...base, volume, t })
        for (const b of r.bodies!) {
          expect(b.x).toBeGreaterThanOrEqual(0)
          expect(b.x).toBeLessThanOrEqual(volume)
          expect(b.y).toBeGreaterThanOrEqual(0)
          expect(b.y).toBeLessThanOrEqual(1)
        }
      }
    }
  })

  it('is a pure function of time — same t, same picture', () => {
    const a = gasKernel({ ...base, t: 3.25 })
    const b = gasKernel({ ...base, t: 3.25 })
    expect(a.bodies).toEqual(b.bodies)
  })

  it('actually moves the particles as time advances', () => {
    const a = gasKernel({ ...base, t: 0 })
    const b = gasKernel({ ...base, t: 0.4 })
    const moved = a.bodies!.filter((p, i) => Math.hypot(p.x - b.bodies![i]!.x, p.y - b.bodies![i]!.y) > 1e-6)
    expect(moved.length).toBe(a.bodies!.length)
  })

  it('leaves existing particles undisturbed when the count changes', () => {
    // Changing the slider should add particles, not reshuffle the whole gas.
    const small = gasKernel({ ...base, count: 20, t: 1 })
    const large = gasKernel({ ...base, count: 40, t: 1 })
    expect(large.bodies!.slice(0, 20)).toEqual(small.bodies)
  })

  it('raises pressure when temperature rises at constant volume', () => {
    // 0625.2.1.3.1(a)
    const cold = gasKernel({ ...base, temperature: 200 })
    const hot = gasKernel({ ...base, temperature: 600 })
    expect(hot.readouts['pressure']!).toBeGreaterThan(cold.readouts['pressure']!)
  })

  it('raises pressure when volume falls at constant temperature', () => {
    // 0625.2.1.3.1(b)
    const big = gasKernel({ ...base, volume: 1 })
    const small = gasKernel({ ...base, volume: 0.5 })
    expect(small.readouts['pressure']!).toBeGreaterThan(big.readouts['pressure']!)
  })

  it('holds pV constant at fixed temperature — Boyle’s law', () => {
    // 0625.2.1.3.3. This is the claim the readout panel makes to the student.
    const reference = gasKernel({ ...base, volume: 1 }).readouts['pV']!
    for (const volume of [0.3, 0.45, 0.7, 0.9, 1]) {
      expect(gasKernel({ ...base, volume }).readouts['pV']!).toBeCloseTo(reference, 10)
    }
  })

  it('breaks pV constancy when temperature changes, as it must', () => {
    const a = gasKernel({ ...base, temperature: 300 }).readouts['pV']!
    const b = gasKernel({ ...base, temperature: 600 }).readouts['pV']!
    expect(b).toBeCloseTo(2 * a, 10)
  })

  it('raises pressure with more particles', () => {
    const few = gasKernel({ ...base, count: 10 })
    const many = gasKernel({ ...base, count: 50 })
    expect(many.readouts['pressure']!).toBeGreaterThan(few.readouts['pressure']!)
  })

  it('increases the wall collision rate when heated or compressed', () => {
    expect(gasKernel({ ...base, temperature: 900 }).readouts['collisionRate']!).toBeGreaterThan(
      gasKernel(base).readouts['collisionRate']!
    )
    expect(gasKernel({ ...base, volume: 0.35 }).readouts['collisionRate']!).toBeGreaterThan(
      gasKernel(base).readouts['collisionRate']!
    )
  })

  it('converts kelvin to celsius using T = θ + 273', () => {
    // 0625.2.1.3.2
    expect(gasKernel({ ...base, temperature: 273 }).readouts['temperatureCelsius']).toBeCloseTo(0, 10)
    expect(gasKernel({ ...base, temperature: 373 }).readouts['temperatureCelsius']).toBeCloseTo(100, 10)
  })

  it('marks a minority of particles as fast, giving a visible speed spread', () => {
    const f = gasKernel({ ...base, count: 60 }).readouts['fastFraction']!
    expect(f).toBeGreaterThan(0)
    expect(f).toBeLessThan(0.6)
  })

  it('reports the container bounds so the renderer can draw the walls', () => {
    expect(gasKernel({ ...base, volume: 0.6 }).bounds).toEqual({
      xMin: 0,
      xMax: 0.6,
      yMin: 0,
      yMax: 1,
    })
  })

  it('is finite everywhere across the parameter range', () => {
    for (const temperature of [0, 100, 300, 900]) {
      for (const volume of [0.3, 1]) {
        for (const count of [1, 60]) {
          const r = gasKernel({ temperature, volume, count, t: 2.5 })
          for (const v of Object.values(r.readouts)) expect(Number.isFinite(v)).toBe(true)
        }
      }
    }
  })
})
