import { describe, expect, it } from 'vitest'
import { MEDIUM_LENGTH, displacement, waveKernel, waveSpeed } from './kernel'

describe('waveSpeed', () => {
  it('is frequency times wavelength', () => {
    // 0625.3.1.4 — the wave equation
    expect(waveSpeed(2, 3)).toBe(6)
    expect(waveSpeed(50, 0.02)).toBeCloseTo(1, 10)
  })

  it('is unchanged when f doubles and λ halves', () => {
    // The insight the lesson is built around: v is a property of the medium.
    expect(waveSpeed(4, 0.5)).toBeCloseTo(waveSpeed(8, 0.25), 10)
  })
})

describe('displacement', () => {
  it('starts at zero at the origin', () => {
    expect(displacement(0, 0, 1, 2, 1)).toBeCloseTo(0, 10)
  })

  it('never exceeds the amplitude', () => {
    for (let x = 0; x < 8; x += 0.07) {
      for (let t = 0; t < 4; t += 0.11) {
        expect(Math.abs(displacement(x, t, 0.8, 1.5, 2))).toBeLessThanOrEqual(0.8 + 1e-12)
      }
    }
  })

  it('repeats every wavelength in space', () => {
    // 0625.3.1.3 — what wavelength means
    const λ = 1.5
    for (const x of [0.2, 0.7, 1.1]) {
      expect(displacement(x, 0.3, 1, λ, 2)).toBeCloseTo(displacement(x + λ, 0.3, 1, λ, 2), 10)
    }
  })

  it('repeats every period in time', () => {
    const f = 2
    const T = 1 / f
    for (const t of [0, 0.13, 0.4]) {
      expect(displacement(0.6, t, 1, 1.5, f)).toBeCloseTo(displacement(0.6, t + T, 1, 1.5, f), 10)
    }
  })

  it('travels in the +x direction at the wave speed', () => {
    // A crest at x after time t should be at x + v·t.
    const λ = 2
    const f = 1.5
    const v = waveSpeed(f, λ)
    const t = 0.4
    expect(displacement(0.35 + v * t, t, 1, λ, f)).toBeCloseTo(displacement(0.35, 0, 1, λ, f), 8)
  })

  it('is flat for a degenerate wavelength', () => {
    expect(displacement(1, 1, 1, 0, 1)).toBe(0)
  })
})

describe('waveKernel', () => {
  const base = { frequency: 1, wavelength: 1, amplitude: 0.6, longitudinal: 0, t: 0 }

  it('reports a speed matching the wave equation', () => {
    const r = waveKernel({ ...base, frequency: 2, wavelength: 1.5 })
    expect(r.readouts['waveSpeed']).toBeCloseTo(3, 10)
  })

  it('reports the period as the reciprocal of the frequency', () => {
    expect(waveKernel({ ...base, frequency: 4 }).readouts['period']).toBeCloseTo(0.25, 10)
  })

  it('counts the whole waves that fit in the medium', () => {
    expect(waveKernel({ ...base, wavelength: 1 }).readouts['wavesVisible']).toBeCloseTo(
      MEDIUM_LENGTH,
      10
    )
    expect(waveKernel({ ...base, wavelength: 2 }).readouts['wavesVisible']).toBeCloseTo(
      MEDIUM_LENGTH / 2,
      10
    )
  })

  it('draws a waveform spanning the medium', () => {
    const pts = waveKernel(base).series[0]!.points
    expect(pts[0]![0]).toBeCloseTo(0, 10)
    expect(pts[pts.length - 1]![0]).toBeCloseTo(MEDIUM_LENGTH, 10)
  })

  it('keeps the waveform within the amplitude', () => {
    const r = waveKernel({ ...base, amplitude: 0.5 })
    for (const [, y] of r.series[0]!.points) {
      expect(Math.abs(y)).toBeLessThanOrEqual(0.5 + 1e-12)
    }
  })

  it('moves particles across the direction of travel for a transverse wave', () => {
    // 0625.3.1.5 — vibration at right angles to propagation.
    const a = waveKernel({ ...base, longitudinal: 0, t: 0 })
    const b = waveKernel({ ...base, longitudinal: 0, t: 0.25 })
    const moved = a.bodies!.map((p, i) => ({
      dx: Math.abs(p.x - b.bodies![i]!.x),
      dy: Math.abs(p.y - b.bodies![i]!.y),
    }))
    // x never changes; y does.
    expect(Math.max(...moved.map((m) => m.dx))).toBeCloseTo(0, 12)
    expect(Math.max(...moved.map((m) => m.dy))).toBeGreaterThan(0.1)
  })

  it('moves particles along the direction of travel for a longitudinal wave', () => {
    // 0625.3.1.6 — vibration parallel to propagation.
    const a = waveKernel({ ...base, longitudinal: 1, t: 0 })
    const b = waveKernel({ ...base, longitudinal: 1, t: 0.25 })
    const moved = a.bodies!.map((p, i) => ({
      dx: Math.abs(p.x - b.bodies![i]!.x),
      dy: Math.abs(p.y - b.bodies![i]!.y),
    }))
    expect(Math.max(...moved.map((m) => m.dx))).toBeGreaterThan(0.1)
    expect(Math.max(...moved.map((m) => m.dy))).toBeCloseTo(0, 12)
  })

  it('creates compressions and rarefactions in a longitudinal wave', () => {
    // Neighbouring particle gaps must genuinely vary — that is what a compression is.
    const r = waveKernel({ ...base, longitudinal: 1, wavelength: 1, amplitude: 0.6 })
    const row = r.bodies!.slice(0, 34).map((b) => b.x)
    const gaps: number[] = []
    for (let i = 1; i < row.length; i++) gaps.push(row[i]! - row[i - 1]!)
    expect(Math.max(...gaps) - Math.min(...gaps)).toBeGreaterThan(0.05)
  })

  it('never lets longitudinal particles pass through each other', () => {
    // Particles overtaking their neighbours would draw a medium that cannot exist.
    // Checked across the whole slider range, not just the default.
    for (const t of [0, 0.2, 0.45, 0.8]) {
      for (const amplitude of [0.1, 0.4, 0.6, 1]) {
        for (const wavelength of [0.4, 1, 2]) {
          const r = waveKernel({ ...base, longitudinal: 1, amplitude, wavelength, t })
          const row = r.bodies!.slice(0, 34).map((b) => b.x)
          for (let i = 1; i < row.length; i++) {
            expect(row[i]!).toBeGreaterThan(row[i - 1]!)
          }
        }
      }
    }
  })

  it('is a pure function of time', () => {
    expect(waveKernel({ ...base, t: 1.75 })).toEqual(waveKernel({ ...base, t: 1.75 }))
  })

  it('animates — the waveform shifts as time advances', () => {
    const a = waveKernel({ ...base, t: 0 }).series[0]!.points
    const b = waveKernel({ ...base, t: 0.2 }).series[0]!.points
    const differing = a.filter((p, i) => Math.abs(p[1] - b[i]![1]) > 1e-6)
    expect(differing.length).toBeGreaterThan(a.length / 2)
  })

  it('is finite everywhere across the parameter range', () => {
    for (const frequency of [0.2, 1, 4]) {
      for (const wavelength of [0.4, 1, 2]) {
        for (const longitudinal of [0, 1]) {
          const r = waveKernel({ frequency, wavelength, amplitude: 0.6, longitudinal, t: 1.3 })
          for (const v of Object.values(r.readouts)) expect(Number.isFinite(v)).toBe(true)
          for (const b of r.bodies!) {
            expect(Number.isFinite(b.x)).toBe(true)
            expect(Number.isFinite(b.y)).toBe(true)
          }
        }
      }
    }
  })
})
