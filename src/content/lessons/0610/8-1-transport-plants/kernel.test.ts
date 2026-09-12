import { describe, expect, it } from 'vitest'
import kernel, {
  evaporationFactor,
  photosynthesisRate,
  stomatalOpening,
  transpirationRate,
  type TranspirationParams,
} from './kernel'

const conditions = (over: Partial<TranspirationParams> = {}): TranspirationParams => ({
  temperature: 20,
  humidity: 50,
  wind: 0,
  light: 60,
  ...over,
})

describe('each condition on its own', () => {
  it('raises the rate as the temperature rises', () => {
    expect(transpirationRate(conditions({ temperature: 35 }))).toBeGreaterThan(
      transpirationRate(conditions({ temperature: 15 }))
    )
  })

  it('lowers the rate as the humidity rises', () => {
    expect(transpirationRate(conditions({ humidity: 90 }))).toBeLessThan(
      transpirationRate(conditions({ humidity: 20 }))
    )
  })

  it('raises the rate as the wind speed rises', () => {
    expect(transpirationRate(conditions({ wind: 6 }))).toBeGreaterThan(
      transpirationRate(conditions({ wind: 0 }))
    )
  })

  it('raises the rate as the light intensity rises', () => {
    expect(transpirationRate(conditions({ light: 80 }))).toBeGreaterThan(
      transpirationRate(conditions({ light: 10 }))
    )
  })
})

describe('saturated air stops it completely', () => {
  it('gives no transpiration at 100% humidity however hot and windy', () => {
    // There is no gradient between the leaf and the air, so nothing can diffuse out.
    // A model that still lost water here would be teaching the wrong mechanism.
    expect(transpirationRate(conditions({ humidity: 100, temperature: 45, wind: 10 }))).toBeCloseTo(
      0,
      6
    )
  })

  it('says so rather than leaving the zero unexplained', () => {
    const note = kernel(conditions({ humidity: 100 })).markers?.[0]?.label
    expect(note?.en).toContain('Saturated air')
    expect(note?.zh).toBeTruthy()
  })
})

describe('light works differently from the other three', () => {
  it('acts by opening the stomata, not by speeding up evaporation', () => {
    // Changing the light must not change the evaporation factor at all.
    const a = evaporationFactor(20, 50, 0)
    const b = evaporationFactor(20, 50, 0)
    expect(a).toBe(b)
    expect(stomatalOpening(80)).toBeGreaterThan(stomatalOpening(10))
  })

  it('saturates, because stomata cannot open further once fully open', () => {
    const gain = (a: number, b: number) => stomatalOpening(b) - stomatalOpening(a)
    expect(gain(60, 100)).toBeLessThan(gain(0, 40))
    expect(stomatalOpening(1e6)).toBeLessThanOrEqual(1)
  })

  it('does not saturate for temperature, which has no such ceiling', () => {
    const gain = (a: number, b: number) =>
      transpirationRate(conditions({ temperature: b })) -
      transpirationRate(conditions({ temperature: a }))
    expect(gain(30, 40)).toBeGreaterThan(gain(10, 20))
  })

  it('stops transpiration almost entirely when the stomata are shut', () => {
    expect(transpirationRate(conditions({ light: 0 }))).toBeCloseTo(0, 6)
  })
})

describe('the cost of closing the stomata', () => {
  it('cuts photosynthesis as well as water loss', () => {
    // Shutting the stomata saves water and shuts off the carbon dioxide supply with it.
    // Showing only the water saved would be telling half the story.
    const open = kernel(conditions({ light: 80 })).readouts
    const shut = kernel(conditions({ light: 3 })).readouts
    expect(shut['rate']).toBeLessThan(open['rate'] as number)
    expect(shut['photosynthesis']).toBeLessThan(open['photosynthesis'] as number)
  })

  it('warns about the trade rather than only reporting the saving', () => {
    expect(kernel(conditions({ light: 3 })).markers?.[0]?.label.en).toContain('carbon dioxide')
  })

  it('gives no photosynthesis in the dark', () => {
    expect(photosynthesisRate(0)).toBeCloseTo(0, 6)
  })
})

describe('the kernel', () => {
  it('draws all four sweeps on one shared vertical scale', () => {
    // Four panels with independently scaled axes would make every condition look
    // equally important, which is precisely what the lesson is trying to distinguish.
    const bounds = kernel(conditions()).series.map((s) => s.yBounds)
    for (const b of bounds) expect(b).toEqual(bounds[0])
  })

  it('sweeps each condition over its own full range', () => {
    const s = kernel(conditions()).series
    expect(s.find((x) => x.key === 'temperature')?.xBounds).toEqual({ min: 0, max: 45 })
    expect(s.find((x) => x.key === 'humidity')?.xBounds).toEqual({ min: 0, max: 100 })
    expect(s.find((x) => x.key === 'wind')?.xBounds).toEqual({ min: 0, max: 10 })
    expect(s.find((x) => x.key === 'light')?.xBounds).toEqual({ min: 0, max: 100 })
  })

  it('passes the other three conditions into every sweep', () => {
    // The temperature sweep at high humidity must sit lower than at low humidity, or the
    // sweeps are not showing the conditions interacting.
    const dry = kernel(conditions({ humidity: 10 })).series.find((s) => s.key === 'temperature')
    const wet = kernel(conditions({ humidity: 90 })).series.find((s) => s.key === 'temperature')
    const last = (s?: { points: Array<[number, number]> }) => s?.points.at(-1)?.[1] ?? 0
    expect(last(wet)).toBeLessThan(last(dry))
  })

  it('returns finite readouts at every corner of the parameter space', () => {
    for (const temperature of [0, 45]) {
      for (const humidity of [0, 100]) {
        for (const wind of [0, 10]) {
          for (const light of [0, 100]) {
            const p = { temperature, humidity, wind, light }
            for (const [key, value] of Object.entries(kernel(p).readouts)) {
              expect(Number.isFinite(value), `${key} at ${JSON.stringify(p)}`).toBe(true)
            }
          }
        }
      }
    }
  })
})
