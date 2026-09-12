import { describe, expect, it } from 'vitest'
import {
  GREENHOUSE_GASES,
  climateKernel,
  percentAbovePreIndustrial,
  risePerDecade,
  windowFrom,
} from './kernel'

const at = (key: string) => GREENHOUSE_GASES.find((g) => g.key === key)!
const index = (key: string) => GREENHOUSE_GASES.findIndex((g) => g.key === key)

function run(key: string, startYear = 1750) {
  return climateKernel({ gas: index(key), startYear })
}

describe('GREENHOUSE_GASES', () => {
  it('covers the two gases the syllabus names', () => {
    // 0620.10.3.3
    expect(GREENHOUSE_GASES.map((g) => g.formula)).toEqual(['CO₂', 'CH₄'])
  })

  it('names sources for each, in both languages', () => {
    for (const g of GREENHOUSE_GASES) {
      expect(g.sources.en.length, g.key).toBeGreaterThan(0)
      expect(g.sources.zh, g.key).toBeTruthy()
      expect(g.label.zh, g.key).toBeTruthy()
    }
  })

  it('runs each record from 1750 to 2020 in order, with no repeated years', () => {
    for (const g of GREENHOUSE_GASES) {
      expect(g.record[0]![0], g.key).toBe(1750)
      expect(g.record[g.record.length - 1]![0], g.key).toBe(2020)
      for (let i = 1; i < g.record.length; i++) {
        expect(g.record[i]![0], g.key).toBeGreaterThan(g.record[i - 1]![0])
      }
    }
  })

  it('has every concentration rising', () => {
    // Not a modelling assumption — it is what the measurements do.
    for (const g of GREENHOUSE_GASES) {
      for (let i = 1; i < g.record.length; i++) {
        expect(g.record[i]![1], `${g.key} at ${g.record[i]![0]}`).toBeGreaterThan(
          g.record[i - 1]![1]
        )
      }
    }
  })

  it('uses the unit each gas is actually published in', () => {
    // Methane is a thousand times rarer than carbon dioxide, so it is quoted in ppb.
    expect(at('co2').unit).toBe('ppm')
    expect(at('ch4').unit).toBe('ppb')
  })
})

describe('windowFrom', () => {
  it('keeps only the years from the start onwards', () => {
    const points = windowFrom(at('co2'), 1960)
    expect(points[0]![0]).toBe(1960)
    expect(points.every(([year]) => year >= 1960)).toBe(true)
  })

  it('keeps the whole record when the window starts at the beginning', () => {
    expect(windowFrom(at('co2'), 1750)).toHaveLength(at('co2').record.length)
  })

  it('never returns fewer than two points, so there is always a line', () => {
    for (const g of GREENHOUSE_GASES) {
      for (const start of [1750, 2020, 2500]) {
        expect(windowFrom(g, start).length, `${g.key} from ${start}`).toBeGreaterThanOrEqual(2)
      }
    }
  })
})

describe('risePerDecade', () => {
  it('is far higher over the recent window than the earliest one', () => {
    // The whole argument of the lesson, as a number.
    const early = risePerDecade(at('co2').record.filter(([y]) => y <= 1850))
    const recent = risePerDecade(at('co2').record.filter(([y]) => y >= 1960))
    expect(early).toBeLessThan(1)
    expect(recent).toBeGreaterThan(10)
    expect(recent).toBeGreaterThan(early * 10)
  })

  it('computes the mean rate across the window', () => {
    // 1750 to 1850 is ten decades, 277 to 285 is 8 ppm: 0.8 per decade.
    expect(risePerDecade(at('co2').record.filter(([y]) => y <= 1850))).toBe(0.8)
  })

  it('returns zero rather than dividing by zero on a single instant', () => {
    expect(risePerDecade([[2020, 414]])).toBe(0)
  })

  it('rises as the window is slid forward', () => {
    const rates = [1750, 1850, 1950, 1980].map((start) =>
      risePerDecade(windowFrom(at('co2'), start))
    )
    for (let i = 1; i < rates.length; i++) {
      expect(rates[i]!, `window from index ${i}`).toBeGreaterThan(rates[i - 1]!)
    }
  })
})

describe('percentAbovePreIndustrial', () => {
  it('measures against the 1750 level', () => {
    // 277 → 414 ppm is about a 49% rise; 730 → 1879 ppb is about 157%.
    expect(percentAbovePreIndustrial(at('co2'))).toBe(49)
    expect(percentAbovePreIndustrial(at('ch4'))).toBe(157)
  })

  it('does not change with the window shown', () => {
    // It is a property of the record, not of what is on screen.
    expect(run('co2', 1750).readouts['percentIncrease']).toBe(
      run('co2', 1990).readouts['percentIncrease']
    )
  })
})

describe('climateKernel', () => {
  it('plots the record against a flat pre-industrial baseline', () => {
    const r = run('co2', 1750)
    expect(r.series).toHaveLength(2)
    expect(r.series[1]!.key).toBe('reference')
    const baseline = r.series[1]!.points
    expect(baseline[0]![1]).toBe(baseline[1]![1])
    expect(baseline[0]![1]).toBe(277)
  })

  it('keeps the baseline spanning the same years as the curve', () => {
    for (const start of [1750, 1900, 1990]) {
      const r = run('co2', start)
      const curve = r.series[0]!.points
      const baseline = r.series[1]!.points
      expect(baseline[0]![0], `from ${start}`).toBe(curve[0]![0])
      expect(baseline[1]![0], `from ${start}`).toBe(curve[curve.length - 1]![0])
    }
  })

  it('labels the axis with the gas and its own unit', () => {
    expect(run('co2').series[0]!.unit.y).toBe('CO₂ / ppm')
    expect(run('ch4').series[0]!.unit.y).toBe('CH₄ / ppb')
  })

  it('puts both series on the same axes', () => {
    const r = run('ch4')
    expect(r.series[0]!.unit).toEqual(r.series[1]!.unit)
  })

  it('never plots the year axis from year zero', () => {
    // The default rule keeps a zero baseline, which would squash three centuries into the
    // last tenth of the plot.
    for (const start of [1750, 1900, 1990]) {
      const x = run('co2', start).series[0]!.xBounds!
      expect(x.min, `from ${start}`).toBeGreaterThan(1600)
      expect(x.min, `from ${start}`).toBeLessThanOrEqual(start)
      expect(x.max, `from ${start}`).toBeGreaterThanOrEqual(2020)
    }
  })

  it('frames the concentration axis around the data, not around zero', () => {
    // 277 to 414 ppm plotted from zero is a flat line near the top of the frame.
    const y = run('co2', 1750).series[0]!.yBounds!
    expect(y.min).toBeGreaterThan(0)
    expect(y.min).toBeLessThanOrEqual(277)
    expect(y.max).toBeGreaterThanOrEqual(414)
  })

  it('keeps the pre-industrial baseline inside the frame', () => {
    // The baseline is the thing the rise is measured against; off-frame it proves nothing.
    for (const key of ['co2', 'ch4']) {
      for (const start of [1750, 1960, 2000]) {
        const r = run(key, start)
        const y = r.series[0]!.yBounds!
        expect(r.readouts['preIndustrial']!, `${key} from ${start}`).toBeGreaterThanOrEqual(y.min)
        expect(r.readouts['preIndustrial']!, `${key} from ${start}`).toBeLessThanOrEqual(y.max)
      }
    }
  })

  it('reports the pre-industrial and latest levels', () => {
    const r = run('co2')
    expect(r.readouts['preIndustrial']).toBe(277)
    expect(r.readouts['latest']).toBe(414)
  })

  it('changes the rate but not the totals as the window moves', () => {
    const wide = run('co2', 1750)
    const narrow = run('co2', 1980)
    expect(narrow.readouts['latest']).toBe(wide.readouts['latest'])
    expect(narrow.readouts['risePerDecade']!).toBeGreaterThan(wide.readouts['risePerDecade']!)
  })

  it('clamps parameters outside their range', () => {
    expect(climateKernel({ gas: -3, startYear: 1750 }).readouts['latest']).toBe(414)
    expect(climateKernel({ gas: 99, startYear: 1750 }).readouts['latest']).toBe(1879)
    // A window starting past the end of the record still yields a drawable line.
    expect(climateKernel({ gas: 0, startYear: 3000 }).series[0]!.points.length).toBe(2)
  })

  it('is finite everywhere across the parameter range', () => {
    for (let gas = 0; gas < GREENHOUSE_GASES.length; gas++) {
      for (const startYear of [1750, 1850, 1950, 2010]) {
        const r = climateKernel({ gas, startYear })
        for (const [k, v] of Object.entries(r.readouts)) {
          expect(Number.isFinite(v), `${k} gas=${gas} from=${startYear}`).toBe(true)
        }
        for (const s of r.series) {
          for (const [x, y] of s.points) {
            expect(Number.isFinite(x) && Number.isFinite(y)).toBe(true)
          }
        }
      }
    }
  })
})
