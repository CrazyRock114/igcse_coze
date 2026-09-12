import { describe, expect, it } from 'vitest'
import kernel, {
  MIXTURES,
  REFERENCES,
  retentionFactor,
  spotDistance,
  type ChromatographyParams,
} from './kernel'

const merge = (p: Partial<ChromatographyParams>): ChromatographyParams => ({
  solventDistance: p.solventDistance ?? 8,
  mixture: p.mixture ?? 0,
  selected: p.selected ?? 0,
})
const run = (p: Partial<ChromatographyParams> = {}) => kernel(merge(p))

describe('the Rf equation', () => {
  it('divides the spot distance by the solvent distance', () => {
    expect(retentionFactor(3, 10)).toBeCloseTo(0.3, 9)
    expect(retentionFactor(6.8, 8)).toBeCloseTo(0.85, 9)
  })

  it('never exceeds 1, because a spot cannot outrun the solvent carrying it', () => {
    for (const ref of REFERENCES) {
      expect(ref.rf, ref.code).toBeGreaterThan(0)
      expect(ref.rf, ref.code).toBeLessThanOrEqual(1)
    }
  })

  it('refuses to divide by a solvent distance of zero', () => {
    expect(retentionFactor(3, 0)).toBe(0)
  })

  it('inverts back to the distance it came from', () => {
    for (const ref of REFERENCES) {
      expect(retentionFactor(spotDistance(ref.rf, 9), 9), ref.code).toBeCloseTo(ref.rf, 9)
    }
  })
})

describe('running the plate for longer', () => {
  it('moves every spot further', () => {
    const short = run({ solventDistance: 5 }).chromatogram!
    const long = run({ solventDistance: 14 }).chromatogram!
    short.lanes.forEach((lane, i) => {
      lane.spots.forEach((spot, j) => {
        expect(long.lanes[i]!.spots[j]!.distance, `${lane.label.en} spot ${j}`).toBeGreaterThan(
          spot.distance,
        )
      })
    })
  })

  it('leaves every Rf exactly where it was', () => {
    // The entire reason Rf is quoted rather than a distance. If this ever failed, the
    // lesson's central claim would be false.
    for (const solventDistance of [4, 6, 8, 11, 14]) {
      const chart = kernel(merge({ solventDistance })).chromatogram!
      for (const lane of chart.lanes) {
        for (const spot of lane.spots) {
          expect(spot.rf, `${lane.label.en} at ${solventDistance} cm`).toBeCloseTo(
            retentionFactor(spot.distance, solventDistance),
            2,
          )
        }
      }
    }
  })

  it('reports the same Rf whatever the run length', () => {
    expect(run({ solventDistance: 4, selected: 2 }).readouts['rf']).toBe(
      run({ solventDistance: 14, selected: 2 }).readouts['rf'],
    )
  })
})

describe('the chromatogram drawn', () => {
  it('never places a spot above the solvent front', () => {
    // A spot past the front is physically impossible and would make the picture nonsense.
    for (const solventDistance of [4, 8, 14]) {
      const chart = kernel(merge({ solventDistance })).chromatogram!
      for (const lane of chart.lanes) {
        for (const spot of lane.spots) {
          expect(spot.distance, `${lane.label.en} at ${solventDistance} cm`).toBeLessThanOrEqual(
            chart.solventDistance,
          )
        }
      }
    }
  })

  it('shows the unknown alongside a lane for every reference', () => {
    const chart = run().chromatogram!
    expect(chart.lanes).toHaveLength(REFERENCES.length + 1)
    expect(chart.lanes[0]!.label.en).toBe('unknown')
  })

  it('gives each reference lane exactly one spot', () => {
    for (const lane of run().chromatogram!.lanes.slice(1)) {
      expect(lane.spots, lane.label.en).toHaveLength(1)
    }
  })

  it('puts a spot in the unknown at the same height as each substance it contains', () => {
    // Which is how a chromatogram is actually read.
    MIXTURES.forEach((present, mixture) => {
      const chart = kernel(merge({ mixture })).chromatogram!
      const unknownRfs = chart.lanes[0]!.spots.map((s) => s.rf).sort()
      expect(unknownRfs, `mixture ${mixture}`).toEqual(
        present.map((i) => REFERENCES[i]!.rf).sort(),
      )
    })
  })

  it('highlights the selected substance in both its own lane and the unknown', () => {
    const chart = run({ mixture: 0, selected: 2 }).chromatogram!
    expect(chart.lanes[0]!.spots.some((s) => s.highlighted)).toBe(true)
    expect(chart.lanes[3]!.spots[0]!.highlighted).toBe(true)
  })
})

describe('the note', () => {
  it('shows the division rather than only the answer', () => {
    const note = run({ solventDistance: 8, selected: 3 }).markers?.[0]?.label.en ?? ''
    expect(note).toContain('÷ 8')
    expect(note).toContain('= 0.85')
  })

  it('says whether the substance is in the mixture', () => {
    expect(run({ mixture: 0, selected: 0 }).markers?.[0]?.label.en).toContain('is present')
    expect(run({ mixture: 0, selected: 1 }).markers?.[0]?.label.en).toContain('is not present')
    expect(run().markers?.[0]?.label.zh).toBeTruthy()
  })

  it('makes the point about running the plate for longer', () => {
    expect(run().markers?.[0]?.label.en).toContain('the Rf does not change')
  })
})

describe('the kernel', () => {
  it('returns finite readouts at every corner of the parameter space', () => {
    for (const solventDistance of [4, 14]) {
      for (let mixture = 0; mixture < MIXTURES.length; mixture++) {
        for (let selected = 0; selected < REFERENCES.length; selected++) {
          const p = { solventDistance, mixture, selected }
          for (const [key, value] of Object.entries(kernel(p).readouts)) {
            expect(Number.isFinite(value), `${key} at ${JSON.stringify(p)}`).toBe(true)
          }
        }
      }
    }
  })

  it('gives the references distinct Rf values, or two spots would coincide', () => {
    const rfs = REFERENCES.map((r) => r.rf)
    expect(new Set(rfs).size).toBe(rfs.length)
  })
})
