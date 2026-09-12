import { describe, expect, it } from 'vitest'
import { SURFACES, coolingConstant, coolingKernel, temperatureAt } from './kernel'

const DULL_BLACK = 0
const SHINY_SILVER = 1
const DULL_WHITE = 2
const SHINY_BLACK = 3

const base = {
  startTemp: 80,
  roomTemp: 20,
  surface: DULL_BLACK,
  area: 1,
  lagging: 0,
  duration: 40,
}

describe('SURFACES', () => {
  it('makes dull black the best emitter and shiny silver the worst', () => {
    // 0625.2.3.3.3 — colour and texture both matter.
    expect(SURFACES[DULL_BLACK]!.emissivity).toBeGreaterThan(SURFACES[DULL_WHITE]!.emissivity)
    expect(SURFACES[DULL_WHITE]!.emissivity).toBeGreaterThan(SURFACES[SHINY_SILVER]!.emissivity)
    expect(SURFACES[SHINY_SILVER]!.emissivity).toBeLessThan(SURFACES[SHINY_BLACK]!.emissivity)
  })

  it('separates the effect of colour from the effect of texture', () => {
    // Same colour, different texture: dull black beats shiny black.
    expect(SURFACES[DULL_BLACK]!.emissivity).toBeGreaterThan(SURFACES[SHINY_BLACK]!.emissivity)
    // Same texture, different colour: dull black beats dull white.
    expect(SURFACES[DULL_BLACK]!.emissivity).toBeGreaterThan(SURFACES[DULL_WHITE]!.emissivity)
  })
})

describe('coolingConstant', () => {
  it('is larger for a better emitting surface', () => {
    expect(coolingConstant(DULL_BLACK, 1, 0)).toBeGreaterThan(coolingConstant(SHINY_SILVER, 1, 0))
  })

  it('scales with surface area', () => {
    // 0625.2.3.3.9 — rate of emission depends on surface area.
    const single = coolingConstant(DULL_BLACK, 1, 0)
    expect(coolingConstant(DULL_BLACK, 2, 0)).toBeCloseTo(2 * single, 8)
  })

  it('falls when lagging is added', () => {
    const bare = coolingConstant(DULL_BLACK, 1, 0)
    const lagged = coolingConstant(DULL_BLACK, 1, 1)
    expect(lagged).toBeLessThan(bare)
    expect(lagged).toBeGreaterThan(0)
  })

  it('clamps an out-of-range surface index instead of returning NaN', () => {
    expect(Number.isFinite(coolingConstant(-3, 1, 0))).toBe(true)
    expect(Number.isFinite(coolingConstant(99, 1, 0))).toBe(true)
  })

  it('never goes negative, however heavy the lagging', () => {
    expect(coolingConstant(DULL_BLACK, 1, 5)).toBeGreaterThan(0)
  })
})

describe('temperatureAt', () => {
  it('starts at the starting temperature', () => {
    expect(temperatureAt(80, 20, 0.05, 0)).toBeCloseTo(80, 10)
  })

  it('approaches room temperature without reaching it', () => {
    const late = temperatureAt(80, 20, 0.05, 500)
    expect(late).toBeGreaterThan(20)
    expect(late).toBeCloseTo(20, 4)
  })

  it('halves the excess in equal time intervals', () => {
    // The exponential signature — same idea as radioactive half-life.
    const k = 0.05
    const half = Math.LN2 / k
    for (const start of [0, half, 2 * half]) {
      const a = temperatureAt(80, 20, k, start) - 20
      const b = temperatureAt(80, 20, k, start + half) - 20
      expect(b / a).toBeCloseTo(0.5, 8)
    }
  })

  it('cools fastest at the beginning, when the excess is largest', () => {
    const k = 0.05
    const early = temperatureAt(80, 20, k, 0) - temperatureAt(80, 20, k, 1)
    const late = temperatureAt(80, 20, k, 30) - temperatureAt(80, 20, k, 31)
    expect(early).toBeGreaterThan(late)
  })

  it('stays put when the object is already at room temperature', () => {
    expect(temperatureAt(20, 20, 0.05, 30)).toBeCloseTo(20, 10)
  })
})

describe('coolingKernel', () => {
  it('always plots the chosen surface against a dull black reference', () => {
    const r = coolingKernel(base)
    expect(r.series.map((s) => s.key)).toEqual(['chosen', 'reference'])
  })

  it('makes the two curves identical when dull black is chosen', () => {
    const r = coolingKernel({ ...base, surface: DULL_BLACK })
    for (let i = 0; i < r.series[0]!.points.length; i++) {
      expect(r.series[0]!.points[i]![1]).toBeCloseTo(r.series[1]!.points[i]![1]!, 10)
    }
  })

  it('leaves a shiny silver surface hotter than the dull black reference', () => {
    // The whole point: a poor emitter keeps its energy for longer.
    const r = coolingKernel({ ...base, surface: SHINY_SILVER })
    const last = r.series[0]!.points.length - 1
    expect(r.series[0]!.points[last]![1]).toBeGreaterThan(r.series[1]!.points[last]![1]!)
  })

  it('cools faster with a bigger surface area', () => {
    const small = coolingKernel({ ...base, area: 0.5 }).readouts['finalTemp']!
    const large = coolingKernel({ ...base, area: 3 }).readouts['finalTemp']!
    expect(large).toBeLessThan(small)
  })

  it('stays hotter for longer when lagged', () => {
    // 0625.2.3.1.1 and 2.3.4.1 — insulation reduces the rate of energy transfer.
    const bare = coolingKernel({ ...base, lagging: 0 }).readouts['finalTemp']!
    const lagged = coolingKernel({ ...base, lagging: 1 }).readouts['finalTemp']!
    expect(lagged).toBeGreaterThan(bare)
  })

  it('never cools below room temperature', () => {
    for (const surface of [DULL_BLACK, SHINY_SILVER, DULL_WHITE, SHINY_BLACK]) {
      for (const [, temp] of coolingKernel({ ...base, surface, duration: 200 }).series[0]!.points) {
        expect(temp).toBeGreaterThanOrEqual(base.roomTemp - 1e-9)
      }
    }
  })

  it('reports an initial rate matching the curve', () => {
    // The gradient a student would measure by drawing a tangent at t = 0.
    const r = coolingKernel(base)
    const pts = r.series[0]!.points
    const measured = (pts[0]![1] - pts[1]![1]) / (pts[1]![0] - pts[0]![0])
    expect(measured).toBeCloseTo(r.readouts['initialRate']!, 1)
  })

  it('reports a half-time that actually halves the excess', () => {
    const r = coolingKernel(base)
    const half = r.readouts['halfTime']!
    const t = temperatureAt(base.startTemp, base.roomTemp, r.readouts['coolingConstant']!, half)
    expect(t - base.roomTemp).toBeCloseTo((base.startTemp - base.roomTemp) / 2, 6)
  })

  it('is finite everywhere across the parameter range', () => {
    for (const surface of [0, 1, 2, 3]) {
      for (const area of [0.5, 3]) {
        for (const lagging of [0, 1]) {
          for (const startTemp of [25, 100]) {
            const r = coolingKernel({ ...base, surface, area, lagging, startTemp })
            for (const [k, v] of Object.entries(r.readouts)) {
              expect(Number.isFinite(v), `${k}`).toBe(true)
            }
          }
        }
      }
    }
  })
})
