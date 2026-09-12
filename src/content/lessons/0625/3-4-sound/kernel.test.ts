import { describe, expect, it } from 'vitest'
import {
  AUDIBLE_MAX,
  AUDIBLE_MIN,
  MEDIA,
  echoTime,
  isAudible,
  soundKernel,
  wavelengthFor,
} from './kernel'

const AIR = 0
const WATER = 1
const STEEL = 2

const base = { frequency: 440, medium: AIR, amplitude: 0.6, wallDistance: 100, t: 0 }

describe('MEDIA', () => {
  it('makes sound fastest in solids and slowest in gases', () => {
    // 0625.3.4.11
    expect(MEDIA[STEEL]!.speed).toBeGreaterThan(MEDIA[WATER]!.speed)
    expect(MEDIA[WATER]!.speed).toBeGreaterThan(MEDIA[AIR]!.speed)
  })

  it('uses the standard value for air', () => {
    // 0625.3.4.5 — approximately 330 to 350 m / s.
    expect(MEDIA[AIR]!.speed).toBeGreaterThanOrEqual(330)
    expect(MEDIA[AIR]!.speed).toBeLessThanOrEqual(350)
  })
})

describe('wavelengthFor', () => {
  it('rearranges the wave equation to λ = v / f', () => {
    expect(wavelengthFor(340, 340)).toBeCloseTo(1, 10)
    expect(wavelengthFor(340, 170)).toBeCloseTo(2, 10)
  })

  it('gives a longer wavelength in a faster medium at the same frequency', () => {
    // The point students get backwards: the source sets f, the medium sets v, so λ changes.
    const inAir = wavelengthFor(MEDIA[AIR]!.speed, 440)
    const inSteel = wavelengthFor(MEDIA[STEEL]!.speed, 440)
    expect(inSteel).toBeGreaterThan(inAir)
    expect(inSteel / inAir).toBeCloseTo(MEDIA[STEEL]!.speed / MEDIA[AIR]!.speed, 6)
  })

  it('guards against a zero frequency', () => {
    expect(wavelengthFor(340, 0)).toBe(0)
  })
})

describe('echoTime', () => {
  it('accounts for the sound travelling there and back', () => {
    // 0625.3.4.6 — the factor of two is the classic trap.
    expect(echoTime(170, 340)).toBeCloseTo(1, 10)
    expect(echoTime(340, 340)).toBeCloseTo(2, 10)
  })

  it('is twice what a one-way calculation would give', () => {
    const oneWay = 500 / 340
    expect(echoTime(500, 340)).toBeCloseTo(2 * oneWay, 10)
  })

  it('returns sooner in a faster medium', () => {
    expect(echoTime(100, MEDIA[STEEL]!.speed)).toBeLessThan(echoTime(100, MEDIA[AIR]!.speed))
  })

  it('guards against a zero speed', () => {
    expect(echoTime(100, 0)).toBe(0)
  })
})

describe('isAudible', () => {
  it('accepts frequencies inside the human range', () => {
    // 0625.3.4.3 — roughly 20 Hz to 20 000 Hz.
    expect(isAudible(440)).toBe(true)
    expect(isAudible(AUDIBLE_MIN)).toBe(true)
    expect(isAudible(AUDIBLE_MAX)).toBe(true)
  })

  it('rejects frequencies outside it', () => {
    expect(isAudible(10)).toBe(false)
    expect(isAudible(30000)).toBe(false)
  })
})

describe('soundKernel', () => {
  it('reports the speed of the chosen medium', () => {
    expect(soundKernel({ ...base, medium: AIR }).readouts['speed']).toBe(MEDIA[AIR]!.speed)
    expect(soundKernel({ ...base, medium: STEEL }).readouts['speed']).toBe(MEDIA[STEEL]!.speed)
  })

  it('keeps the frequency fixed while the wavelength changes with the medium', () => {
    // The source sets the frequency; the medium sets the speed; λ follows.
    const air = soundKernel({ ...base, medium: AIR })
    const water = soundKernel({ ...base, medium: WATER })
    expect(air.readouts['period']).toBeCloseTo(water.readouts['period']!, 10)
    expect(water.readouts['wavelength']!).toBeGreaterThan(air.readouts['wavelength']!)
  })

  it('satisfies v = fλ for every medium', () => {
    for (const medium of [AIR, WATER, STEEL]) {
      const r = soundKernel({ ...base, medium })
      expect(base.frequency * r.readouts['wavelength']!).toBeCloseTo(r.readouts['speed']!, 6)
    }
  })

  it('flags ultrasound above 20 kHz', () => {
    // 0625.3.4.9
    expect(soundKernel({ ...base, frequency: 40000 }).readouts['ultrasound']).toBe(1)
    expect(soundKernel({ ...base, frequency: 40000 }).readouts['audible']).toBe(0)
    expect(soundKernel({ ...base, frequency: 440 }).readouts['ultrasound']).toBe(0)
    expect(soundKernel({ ...base, frequency: 440 }).readouts['audible']).toBe(1)
  })

  it('reports an echo time matching the wall distance and medium', () => {
    const r = soundKernel({ ...base, wallDistance: 170, medium: AIR })
    expect(r.readouts['echoTime']).toBeCloseTo(1, 6)
  })

  it('displaces the particles along the direction of travel', () => {
    // 0625.3.4.2 — sound is longitudinal.
    const a = soundKernel({ ...base, t: 0 })
    const b = soundKernel({ ...base, t: 0.25 })
    const dx = a.bodies!.map((p, i) => Math.abs(p.x - b.bodies![i]!.x))
    const dy = a.bodies!.map((p, i) => Math.abs(p.y - b.bodies![i]!.y))
    expect(Math.max(...dx)).toBeGreaterThan(0.05)
    expect(Math.max(...dy)).toBeCloseTo(0, 12)
  })

  it('creates compressions and rarefactions without particles crossing', () => {
    // 0625.3.4.10
    for (const t of [0, 0.3, 0.7]) {
      for (const amplitude of [0.2, 0.6, 1]) {
        const row = soundKernel({ ...base, amplitude, t }).bodies!.slice(0, 34).map((b) => b.x)
        for (let i = 1; i < row.length; i++) {
          expect(row[i]!).toBeGreaterThan(row[i - 1]!)
        }
      }
    }
  })

  it('is a pure function of time', () => {
    expect(soundKernel({ ...base, t: 1.4 })).toEqual(soundKernel({ ...base, t: 1.4 }))
  })

  it('is finite everywhere across the parameter range', () => {
    for (const frequency of [20, 440, 40000]) {
      for (const medium of [AIR, WATER, STEEL]) {
        for (const wallDistance of [10, 500]) {
          const r = soundKernel({ ...base, frequency, medium, wallDistance })
          for (const [k, v] of Object.entries(r.readouts)) {
            expect(Number.isFinite(v), `${k}`).toBe(true)
          }
        }
      }
    }
  })
})
