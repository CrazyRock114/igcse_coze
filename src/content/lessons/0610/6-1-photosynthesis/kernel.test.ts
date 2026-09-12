import { describe, expect, it } from 'vitest'
import {
  OPTIMUM_TEMPERATURE,
  carbonDioxideSupply,
  lightSupply,
  limitingFactor,
  photosynthesisKernel,
  photosynthesisRate,
} from './kernel'

const run = (light = 50, carbonDioxide = 0.04, temperature = 30) =>
  photosynthesisKernel({ light, carbonDioxide, temperature })

const series = (key: string, r = run()) => r.series.find((s) => s.key === key)!.points
const peak = (pts: Array<[number, number]>) => Math.max(...pts.map(([, y]) => y))

describe('supply curves', () => {
  it('are zero with none of the raw material', () => {
    expect(lightSupply(0)).toBe(0)
    expect(carbonDioxideSupply(0)).toBe(0)
  })

  it('saturate rather than rising forever', () => {
    // The same *extra* light is worth far more in the shade than in full sun. Comparing
    // doublings would not show this — 50 to 100 adds ten times as much light as 5 to 10.
    const inTheShade = lightSupply(10) - lightSupply(0)
    const inFullSun = lightSupply(110) - lightSupply(100)
    expect(inTheShade).toBeGreaterThan(inFullSun * 10)
    expect(lightSupply(1000)).toBeLessThan(1)
  })

  it('never exceed a full supply', () => {
    for (const v of [0, 1, 10, 100, 1000]) {
      expect(lightSupply(v)).toBeLessThanOrEqual(1)
      expect(carbonDioxideSupply(v)).toBeLessThanOrEqual(1)
    }
  })
})

describe('photosynthesisRate', () => {
  it('is zero in the dark, however warm and however much carbon dioxide', () => {
    expect(photosynthesisRate(0, 0.4, 30)).toBe(0)
  })

  it('is zero without carbon dioxide, however bright', () => {
    expect(photosynthesisRate(100, 0, 30)).toBe(0)
  })

  it('takes the minimum of the two supplies rather than combining them', () => {
    // More light cannot make up for a shortage of carbon dioxide. This is the whole idea.
    const starved = photosynthesisRate(20, 0.01, 30)
    expect(photosynthesisRate(100, 0.01, 30)).toBeCloseTo(starved, 0)
  })

  it('lets extra light work again once carbon dioxide is raised', () => {
    const before = photosynthesisRate(100, 0.01, 30)
    const after = photosynthesisRate(100, 0.2, 30)
    expect(after).toBeGreaterThan(before * 3)
  })

  it('peaks at the optimum temperature and falls above it', () => {
    const best = photosynthesisRate(100, 0.4, OPTIMUM_TEMPERATURE)
    expect(photosynthesisRate(100, 0.4, 15)).toBeLessThan(best)
    expect(photosynthesisRate(100, 0.4, 45)).toBeLessThan(best * 0.1)
  })

  it('never goes negative or above 100', () => {
    for (const l of [0, 10, 50, 100]) {
      for (const c of [0, 0.04, 0.4]) {
        for (const t of [0, 15, 30, 50]) {
          const r = photosynthesisRate(l, c, t)
          expect(r, `${l} ${c} ${t}`).toBeGreaterThanOrEqual(0)
          expect(r, `${l} ${c} ${t}`).toBeLessThanOrEqual(100)
        }
      }
    }
  })
})

describe('limitingFactor', () => {
  it('names light when the plant is in the shade with plenty of everything else', () => {
    expect(limitingFactor(3, 0.4, 30)).toBe('light')
  })

  it('names carbon dioxide in bright light at atmospheric concentration', () => {
    // The usual situation for a crop on a sunny day, and the reason greenhouses enrich it.
    expect(limitingFactor(100, 0.04, 30)).toBe('carbon dioxide')
  })

  it('names temperature when it is cold or hot enough to matter more than either supply', () => {
    expect(limitingFactor(100, 0.4, 5)).toBe('temperature')
    expect(limitingFactor(100, 0.4, 45)).toBe('temperature')
  })

  it('always names the factor that is actually in shortest supply', () => {
    for (const l of [5, 50, 100]) {
      for (const c of [0.01, 0.04, 0.4]) {
        const which = limitingFactor(l, c, 30)
        if (which === 'light') expect(lightSupply(l)).toBeLessThanOrEqual(carbonDioxideSupply(c))
        if (which === 'carbon dioxide') {
          expect(carbonDioxideSupply(c)).toBeLessThan(lightSupply(l))
        }
      }
    }
  })
})

describe('photosynthesisKernel', () => {
  it('plots against all three factors on their own axes', () => {
    const r = run()
    expect(r.series).toHaveLength(3)
    expect(new Set(r.series.map((s) => s.unit.x)).size).toBe(3)
    expect(new Set(r.series.map((s) => s.unit.y)).size).toBe(1)
  })

  it('pins every rate axis to 0–100 so the curves stay comparable', () => {
    for (const s of run().series) expect(s.yBounds).toEqual({ min: 0, max: 100 })
  })

  it('flattens the light curve when carbon dioxide is the shortage', () => {
    // The classic plateau: past a point, extra light does nothing.
    const pts = series('light', run(50, 0.01, 30))
    const atHalf = pts.find(([x]) => x === 50)![1]
    const atFull = pts.find(([x]) => x === 100)![1]
    expect(atFull - atHalf).toBeLessThan(1)
  })

  it('raises the plateau when carbon dioxide is raised', () => {
    // Same graph, higher ceiling — which is what a greenhouse is buying.
    expect(peak(series('light', run(50, 0.2, 30)))).toBeGreaterThan(
      peak(series('light', run(50, 0.02, 30))) * 2
    )
  })

  it('gives the temperature curve an optimum, unlike the other two', () => {
    const temp = series('temperature', run(100, 0.4, 30))
    const highest = temp.reduce((best, p) => (p[1] > best[1] ? p : best))
    expect(highest[0]).toBe(OPTIMUM_TEMPERATURE)
    expect(temp[temp.length - 1]![1]).toBeLessThan(highest[1] * 0.2)

    // Light and carbon dioxide only ever climb.
    const light = series('light', run(100, 0.4, 30))
    for (let i = 1; i < light.length; i++) {
      expect(light[i]![1]).toBeGreaterThanOrEqual(light[i - 1]![1])
    }
  })

  it('names the limiting factor, in both languages', () => {
    expect(run(3, 0.4, 30).markers![0]!.label.en).toMatch(/Light is limiting/)
    expect(run(100, 0.04, 30).markers![0]!.label.en).toMatch(/Carbon dioxide is limiting/)
    expect(run(100, 0.4, 45).markers![0]!.label.zh).toBeTruthy()
  })

  it('reports each supply so the student can see which is lowest', () => {
    const r = run(100, 0.02, 30)
    expect(r.readouts['lightSupply']!).toBeGreaterThan(r.readouts['carbonDioxideSupply']!)
    expect(r.readouts['temperatureEffect']).toBe(100)
  })

  it('clamps parameters outside their range', () => {
    expect(photosynthesisKernel({ light: 999, carbonDioxide: 0.04, temperature: 30 }).readouts['lightSupply'])
      .toBe(80)
    expect(photosynthesisKernel({ light: -5, carbonDioxide: 0.04, temperature: 30 }).readouts['rate'])
      .toBe(0)
    expect(photosynthesisKernel({ light: 50, carbonDioxide: 99, temperature: 30 }).readouts['carbonDioxideSupply'])
      .toBeLessThanOrEqual(100)
  })

  it('is finite everywhere across the parameter range', () => {
    for (const light of [0, 50, 100]) {
      for (const carbonDioxide of [0, 0.04, 0.4]) {
        for (const temperature of [0, 30, 50]) {
          const r = photosynthesisKernel({ light, carbonDioxide, temperature })
          for (const [k, v] of Object.entries(r.readouts)) {
            expect(Number.isFinite(v), `${k} ${light} ${carbonDioxide} ${temperature}`).toBe(true)
          }
          for (const s of r.series) {
            for (const [, y] of s.points) expect(Number.isFinite(y)).toBe(true)
          }
        }
      }
    }
  })
})
