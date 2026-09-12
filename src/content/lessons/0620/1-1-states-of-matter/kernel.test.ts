import { describe, expect, it } from 'vitest'
import kernel, {
  ABSOLUTE_ZERO,
  BOIL_ENERGY,
  MELT_ENERGY,
  MOLAR_VOLUME_RTP,
  ROOM_TEMPERATURE,
  gasVolume,
  heatingCurve,
  stateAt,
  type StatesParams,
} from './kernel'

const base: StatesParams = { meltingPoint: 0, boilingPoint: 100, temperature: 25, pressure: 1 }
const merge = (p: Partial<StatesParams>): StatesParams => ({
  meltingPoint: p.meltingPoint ?? base.meltingPoint,
  boilingPoint: p.boilingPoint ?? base.boilingPoint,
  temperature: p.temperature ?? base.temperature,
  pressure: p.pressure ?? base.pressure,
})
const run = (p: Partial<StatesParams> = {}) => kernel(merge(p))

describe('which state a substance is in', () => {
  it('is solid below the melting point, liquid between, gas above the boiling point', () => {
    expect(stateAt(-10, 0, 100)).toBe('solid')
    expect(stateAt(25, 0, 100)).toBe('liquid')
    expect(stateAt(150, 0, 100)).toBe('gas')
  })

  it('changes exactly at the melting and boiling points', () => {
    expect(stateAt(0, 0, 100)).toBe('liquid')
    expect(stateAt(-0.1, 0, 100)).toBe('solid')
    expect(stateAt(100, 0, 100)).toBe('gas')
    expect(stateAt(99.9, 0, 100)).toBe('liquid')
  })

  it('describes the particle arrangement for the state it reports', () => {
    expect(run({ temperature: -10 }).markers?.[0]?.label.en).toContain('vibrate about fixed')
    expect(run({ temperature: 25 }).markers?.[0]?.label.en).toContain('slide past one another')
    expect(run({ temperature: 150 }).markers?.[0]?.label.en).toContain('far apart')
    expect(run({ temperature: 150 }).markers?.[0]?.label.zh).toBeTruthy()
  })

  it('handles a substance that is a gas at room temperature', () => {
    // Oxygen: melts at −218, boils at −183. Both below anything a room reaches.
    expect(stateAt(20, -218, -183)).toBe('gas')
    expect(run({ meltingPoint: -218, boilingPoint: -183, temperature: 20 }).markers?.[0]?.label.en).toContain(
      'this is a gas',
    )
  })
})

describe('the heating curve', () => {
  const curve = heatingCurve(0, 100)

  it('starts below the melting point and ends above the boiling point', () => {
    expect(curve[0]?.[1]).toBeLessThan(0)
    expect(curve[curve.length - 1]?.[1]).toBeGreaterThan(100)
  })

  it('has a flat stretch at each change of state', () => {
    const flats = curve.filter((p, i) => i > 0 && p[1] === curve[i - 1]?.[1])
    expect(flats).toHaveLength(2)
    expect(flats.map((f) => f[1]).sort((a, b) => a - b)).toEqual([0, 100])
  })

  it('makes the boiling plateau much longer than the melting one', () => {
    // Not a drawing choice: separating particles completely costs far more than loosening
    // them. If these were ever drawn the same length the picture would be teaching a lie.
    expect(BOIL_ENERGY).toBeGreaterThan(MELT_ENERGY * 3)
    const [meltStart, meltEnd] = [curve[1], curve[2]]
    const [boilStart, boilEnd] = [curve[3], curve[4]]
    const meltLength = (meltEnd?.[0] ?? 0) - (meltStart?.[0] ?? 0)
    const boilLength = (boilEnd?.[0] ?? 0) - (boilStart?.[0] ?? 0)
    expect(boilLength).toBeGreaterThan(meltLength * 3)
  })

  it('never goes downhill', () => {
    for (let i = 1; i < curve.length; i++) {
      expect(curve[i]?.[0], `energy at ${i}`).toBeGreaterThan(curve[i - 1]?.[0] ?? 0)
      expect(curve[i]?.[1], `temperature at ${i}`).toBeGreaterThanOrEqual(curve[i - 1]?.[1] ?? 0)
    }
  })

  it('follows a melting point that is moved', () => {
    const cold = heatingCurve(-114, 78)
    expect(cold.some(([, t]) => t === -114)).toBe(true)
    expect(cold.some(([, t]) => t === 78)).toBe(true)
  })

  it('explains the plateaus rather than only drawing them', () => {
    const note = run().markers?.[1]?.label.en ?? ''
    expect(note).toContain('pull the particles apart')
    expect(note).toContain('cannot rise')
  })
})

describe('the volume of a gas', () => {
  it('gives the molar gas volume at room temperature and pressure', () => {
    // Pinned to the same 24 dm³ the mole lesson uses, so the two cannot drift apart.
    expect(gasVolume(ROOM_TEMPERATURE, 1)).toBeCloseTo(MOLAR_VOLUME_RTP, 6)
  })

  it('increases with temperature and decreases with pressure', () => {
    expect(gasVolume(100, 1)).toBeGreaterThan(gasVolume(25, 1))
    expect(gasVolume(25, 2)).toBeLessThan(gasVolume(25, 1))
  })

  it('halves when the pressure doubles', () => {
    expect(gasVolume(25, 2)).toBeCloseTo(gasVolume(25, 1) / 2, 6)
  })

  it('extrapolates to nothing at absolute zero', () => {
    expect(gasVolume(ABSOLUTE_ZERO, 1)).toBeCloseTo(0, 6)
    expect(ABSOLUTE_ZERO).toBe(-273)
  })

  it('never returns a negative volume', () => {
    expect(gasVolume(-500, 1)).toBe(0)
  })

  it('says the extrapolation is an extrapolation', () => {
    // A real gas condenses long before −273 °C. Drawing the line without saying so would
    // leave the student believing something false about the substance in front of them.
    const note = run().markers?.[2]?.label.en ?? ''
    expect(note).toContain('condenses')
    expect(note).toContain('if it stayed a gas')
  })
})

describe('the kernel', () => {
  it('keeps the boiling point above the melting point', () => {
    // The sliders can be set to describe nothing at all. It should not draw nothing at all.
    const r = run({ meltingPoint: 100, boilingPoint: -200 }).readouts
    expect(r['boilingPoint']).toBeGreaterThan(r['meltingPoint'] as number)
  })

  it('returns finite readouts at every corner of the parameter space', () => {
    for (const meltingPoint of [-250, 100]) {
      for (const boilingPoint of [-200, 400]) {
        for (const temperature of [-250, 400]) {
          for (const pressure of [0.5, 4]) {
            const p = { meltingPoint, boilingPoint, temperature, pressure }
            for (const [key, value] of Object.entries(kernel(p).readouts)) {
              expect(Number.isFinite(value), `${key} at ${JSON.stringify(p)}`).toBe(true)
            }
          }
        }
      }
    }
  })

  it('draws both panels in their own units', () => {
    const r = run()
    expect(r.series).toHaveLength(2)
    expect(r.series[0]?.unit.y).toBe('temperature / °C')
    expect(r.series[1]?.unit.y).toBe('volume / dm³')
  })
})
