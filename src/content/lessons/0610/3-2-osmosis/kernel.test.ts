import { describe, expect, it } from 'vitest'
import kernel, {
  DURATION,
  MAX_GAIN,
  cellState,
  changeAt,
  finalChange,
  type OsmosisParams,
} from './kernel'

const run = (over: Partial<OsmosisParams> = {}) =>
  kernel({ external: 0.2, cellSap: 0.3, minutes: 60, ...over })

describe('which way the water goes', () => {
  it('gains mass in a solution more dilute than the cell sap', () => {
    expect(finalChange(0.05, 0.3)).toBeGreaterThan(0)
  })

  it('loses mass in a solution more concentrated than the cell sap', () => {
    expect(finalChange(0.6, 0.3)).toBeLessThan(0)
  })

  it('does not change at all when the two are equal', () => {
    for (const c of [0.1, 0.3, 0.5]) expect(finalChange(c, c)).toBeCloseTo(0, 6)
  })

  it('depends on the difference, not on either concentration alone', () => {
    // 0.1 into 0.3 and 0.4 into 0.6 are the same experiment as far as the water is
    // concerned. A student who thinks "dilute means gain" has learnt the wrong rule.
    expect(finalChange(0.1, 0.3)).toBeCloseTo(finalChange(0.4, 0.6), 6)
  })
})

describe('the cell wall', () => {
  it('caps how much mass can be gained', () => {
    // Water entering raises the pressure against the wall until the wall pushes back
    // hard enough to stop any more coming in.
    expect(finalChange(0, 0.8)).toBeLessThanOrEqual(MAX_GAIN)
    expect(finalChange(0, 0.8)).toBeCloseTo(MAX_GAIN, 6)
  })

  it('does not cap how much can be lost by anything like as much', () => {
    expect(Math.abs(finalChange(1, 0.05))).toBeGreaterThan(MAX_GAIN)
  })
})

describe('over time', () => {
  it('starts at no change and approaches the final value', () => {
    expect(changeAt(0, 0.05, 0.3)).toBeCloseTo(0, 6)
    expect(changeAt(DURATION, 0.05, 0.3)).toBeCloseTo(finalChange(0.05, 0.3), 0)
  })

  it('never overshoots the final value in either direction', () => {
    for (const external of [0, 0.3, 1]) {
      const target = finalChange(external, 0.3)
      for (let t = 0; t <= DURATION; t++) {
        const v = changeAt(t, external, 0.3)
        expect(Math.abs(v), `t=${t} external=${external}`).toBeLessThanOrEqual(
          Math.abs(target) + 1e-9
        )
      }
    }
  })

  it('slows down as it approaches equilibrium rather than stopping abruptly', () => {
    const early = changeAt(10, 0.05, 0.3) - changeAt(0, 0.05, 0.3)
    const late = changeAt(60, 0.05, 0.3) - changeAt(50, 0.05, 0.3)
    expect(late).toBeLessThan(early)
  })
})

describe('the intercept is the point of the experiment', () => {
  it('reports the cell sap concentration as the zero-change point', () => {
    for (const cellSap of [0.15, 0.3, 0.45]) {
      expect(run({ cellSap }).readouts['intercept']).toBeCloseTo(cellSap, 6)
    }
  })

  it('moves the crossing point when the cell sap changes', () => {
    // If the intercept did not track the cell sap the practical would prove nothing.
    const weak = run({ cellSap: 0.15 })
    const strong = run({ cellSap: 0.45 })

    const crossing = (r: typeof weak) => {
      const pts = r.series.find((s) => s.key === 'concentration')?.points ?? []
      for (let i = 1; i < pts.length; i++) {
        const [, y0] = pts[i - 1] as [number, number]
        const [x1, y1] = pts[i] as [number, number]
        if (y0 > 0 && y1 <= 0) return x1
      }
      return NaN
    }

    expect(crossing(weak)).toBeLessThan(crossing(strong))
    expect(crossing(strong)).toBeCloseTo(0.45, 1)
  })
})

describe('what the cell looks like', () => {
  it('is turgid in a dilute solution and plasmolysed in a concentrated one', () => {
    expect(cellState(0, 0.3)).toBe('turgid')
    expect(cellState(0.9, 0.3)).toBe('plasmolysed')
  })

  it('separates flaccid from plasmolysed rather than treating them as one', () => {
    // Flaccid is limp with the membrane still against the wall; plasmolysed is when the
    // membrane has pulled away from it. Questions distinguish them.
    expect(cellState(0.45, 0.3)).toBe('flaccid')
    expect(cellState(0.7, 0.3)).toBe('plasmolysed')
  })

  it('reports no net change when the concentrations match', () => {
    expect(cellState(0.3, 0.3)).toBe('atEquilibrium')
    expect(run({ external: 0.3, cellSap: 0.3 }).markers?.[0]?.label.en).toContain('No net change')
    expect(run({ external: 0.3, cellSap: 0.3 }).markers?.[0]?.label.zh).toBeTruthy()
  })
})

describe('the kernel', () => {
  it('returns finite readouts at every corner of the parameter space', () => {
    for (const external of [0, 1]) {
      for (const cellSap of [0.05, 0.8]) {
        for (const minutes of [0, DURATION]) {
          const params = { external, cellSap, minutes }
          for (const [key, value] of Object.entries(kernel(params).readouts)) {
            expect(Number.isFinite(value), `${key} at ${JSON.stringify(params)}`).toBe(true)
          }
        }
      }
    }
  })

  it('plots an axis that spans zero, so the crossing is visible', () => {
    const s = run().series.find((x) => x.key === 'concentration')
    expect(s?.yBounds?.min).toBeLessThan(0)
    expect(s?.yBounds?.max).toBeGreaterThan(0)
  })
})
