import { describe, expect, it } from 'vitest'
import { C, REGIONS, frequencyFor, spectrumKernel } from './kernel'

const RADIO = 0
const VISIBLE = 3
const GAMMA = 6

describe('REGIONS', () => {
  it('lists the seven regions of the spectrum', () => {
    // 0625.3.3.1
    expect(REGIONS).toHaveLength(7)
  })

  it('orders them from longest wavelength to shortest', () => {
    for (let i = 1; i < REGIONS.length; i++) {
      expect(REGIONS[i]!.wavelength).toBeLessThan(REGIONS[i - 1]!.wavelength)
    }
  })

  it('therefore orders them from lowest frequency to highest', () => {
    for (let i = 1; i < REGIONS.length; i++) {
      expect(frequencyFor(REGIONS[i]!.wavelength)).toBeGreaterThan(
        frequencyFor(REGIONS[i - 1]!.wavelength)
      )
    }
  })

  it('places visible light between infrared and ultraviolet', () => {
    expect(REGIONS[VISIBLE]!.name).toBe('Visible light')
    expect(REGIONS[VISIBLE]!.wavelength).toBeLessThan(REGIONS[2]!.wavelength)
    expect(REGIONS[VISIBLE]!.wavelength).toBeGreaterThan(REGIONS[4]!.wavelength)
  })

  it('uses a visible wavelength of a few hundred nanometres', () => {
    expect(REGIONS[VISIBLE]!.wavelength).toBeGreaterThan(3e-7)
    expect(REGIONS[VISIBLE]!.wavelength).toBeLessThan(8e-7)
  })

  it('records a use and a hazard for every region', () => {
    // 0625.3.3.3 and 3.3.4
    for (const r of REGIONS) {
      expect(r.uses.length).toBeGreaterThan(5)
      expect(r.danger.length).toBeGreaterThan(5)
    }
  })

  it('spans about sixteen orders of magnitude in wavelength', () => {
    const ratio = REGIONS[RADIO]!.wavelength / REGIONS[GAMMA]!.wavelength
    expect(Math.log10(ratio)).toBeGreaterThan(14)
  })
})

describe('frequencyFor', () => {
  it('uses f = c / λ', () => {
    expect(frequencyFor(1)).toBeCloseTo(C, 0)
    expect(frequencyFor(2)).toBeCloseTo(C / 2, 0)
  })

  it('gives visible light a frequency around 10¹⁴ to 10¹⁵ Hz', () => {
    const f = frequencyFor(REGIONS[VISIBLE]!.wavelength)
    expect(Math.log10(f)).toBeGreaterThan(14)
    expect(Math.log10(f)).toBeLessThan(16)
  })

  it('guards against a zero wavelength', () => {
    expect(frequencyFor(0)).toBe(0)
  })
})

describe('spectrumKernel', () => {
  const base = { region: VISIBLE, quantity: 0 }

  it('plots one point per region', () => {
    expect(spectrumKernel(base).series[0]!.points).toHaveLength(7)
  })

  it('gives the same speed for every region — the key syllabus point', () => {
    // 0625.3.3.2 and 3.3.6. This flat line is the claim the lesson makes.
    const speeds = spectrumKernel({ ...base, quantity: 0 }).series[0]!.points.map(([, v]) => v)
    for (const v of speeds) expect(v).toBeCloseTo(C, 0)
    expect(Math.max(...speeds) - Math.min(...speeds)).toBeLessThan(1)
  })

  it('makes log frequency fall linearly against log wavelength', () => {
    const pts = spectrumKernel({ ...base, quantity: 1 }).series[0]!.points
    const gradients: number[] = []
    for (let i = 1; i < pts.length; i++) {
      gradients.push((pts[i]![1] - pts[i - 1]![1]) / (pts[i]![0] - pts[i - 1]![0]))
    }
    // f = c / λ means log f = log c − log λ, so the gradient is exactly −1.
    for (const g of gradients) expect(g).toBeCloseTo(-1, 6)
  })

  it('labels the axes for the quantity being plotted', () => {
    expect(spectrumKernel({ ...base, quantity: 0 }).series[0]!.unit.y).toBe('m / s')
    expect(spectrumKernel({ ...base, quantity: 1 }).series[0]!.unit.y).toBe('log₁₀(f / Hz)')
  })

  it('reports the selected region’s wavelength and frequency', () => {
    const r = spectrumKernel({ region: GAMMA, quantity: 0 })
    expect(r.readouts['wavelength']).toBeCloseTo(REGIONS[GAMMA]!.wavelength, 20)
    expect(r.readouts['frequency']).toBeCloseTo(frequencyFor(REGIONS[GAMMA]!.wavelength), -10)
  })

  it('confirms the speed is c whichever region is selected', () => {
    for (let region = 0; region < REGIONS.length; region++) {
      expect(spectrumKernel({ region, quantity: 0 }).readouts['speed']).toBeCloseTo(C, 0)
    }
  })

  it('reports the position in the ordering from longest wavelength', () => {
    expect(spectrumKernel({ region: RADIO, quantity: 0 }).readouts['orderFromLongest']).toBe(1)
    expect(spectrumKernel({ region: GAMMA, quantity: 0 }).readouts['orderFromLongest']).toBe(7)
  })

  it('clamps an out-of-range region index', () => {
    expect(Number.isFinite(spectrumKernel({ region: -4, quantity: 0 }).readouts['speed']!)).toBe(true)
    expect(Number.isFinite(spectrumKernel({ region: 99, quantity: 0 }).readouts['speed']!)).toBe(true)
  })

  it('is finite everywhere across the parameter range', () => {
    for (let region = 0; region < REGIONS.length; region++) {
      for (const quantity of [0, 1]) {
        const r = spectrumKernel({ region, quantity })
        for (const [k, v] of Object.entries(r.readouts)) {
          expect(Number.isFinite(v), `${k} for region ${region}`).toBe(true)
        }
        for (const [x, y] of r.series[0]!.points) {
          expect(Number.isFinite(x) && Number.isFinite(y)).toBe(true)
        }
      }
    }
  })
})
