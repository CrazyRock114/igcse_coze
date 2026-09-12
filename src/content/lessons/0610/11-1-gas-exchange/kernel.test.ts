import { describe, expect, it } from 'vitest'
import kernel, {
  AEROBIC_YIELD,
  ANAEROBIC_YIELD,
  DURATION,
  GLUCOSE_COST_RATIO,
  REST_BEFORE,
  aerobicCeiling,
  demand,
  recoveryMinutes,
  simulate,
  type RespirationParams,
} from './kernel'

const run = (over: Partial<RespirationParams> = {}) =>
  kernel({ intensity: 80, duration: 4, fitness: 30, ...over })

const trace = (over: Partial<RespirationParams> = {}) =>
  simulate({ intensity: 80, duration: 4, fitness: 30, ...over })

describe('the yields', () => {
  it('gives aerobic respiration far more ATP per glucose than anaerobic', () => {
    expect(AEROBIC_YIELD).toBeGreaterThan(ANAEROBIC_YIELD * 10)
  })

  it('turns "much less energy per molecule" into a number', () => {
    // Covering the same energy without oxygen burns sixteen times the glucose.
    expect(GLUCOSE_COST_RATIO).toBe(16)
  })
})

describe('below the aerobic ceiling', () => {
  it('supplies everything aerobically and builds no lactic acid', () => {
    const t = trace({ intensity: 60 })
    expect(Math.max(...t.anaerobic)).toBe(0)
    expect(Math.max(...t.lactate)).toBeCloseTo(0, 6)
  })

  it('says the pace could be held indefinitely', () => {
    expect(run({ intensity: 60 }).markers?.[0]?.label.en).toContain('Entirely aerobic')
    expect(run({ intensity: 60 }).markers?.[0]?.label.zh).toBeTruthy()
  })

  it('never exceeds the ceiling with the aerobic supply', () => {
    for (const intensity of [0, 50, 100, 150]) {
      const t = trace({ intensity })
      expect(Math.max(...t.aerobic), `intensity ${intensity}`).toBeLessThanOrEqual(
        aerobicCeiling(30) + 1e-6
      )
    }
  })
})

describe('above the aerobic ceiling', () => {
  it('makes up the shortfall anaerobically', () => {
    const r = run({ intensity: 140 }).readouts
    expect(r['demand']).toBeGreaterThan(r['ceiling'] as number)
    expect(r['shortfall']).toBeGreaterThan(0)
  })

  it('accumulates lactic acid while the shortfall lasts', () => {
    const t = trace({ intensity: 140, duration: 6 })
    expect(Math.max(...t.lactate)).toBeGreaterThan(1)
  })

  it('builds more lactic acid the longer the exercise goes on', () => {
    const short = run({ intensity: 140, duration: 2 }).readouts['peakLactate'] ?? 0
    const long = run({ intensity: 140, duration: 10 }).readouts['peakLactate'] ?? 0
    expect(long).toBeGreaterThan(short)
  })

  it('says how much must come without oxygen, and what it costs', () => {
    const note = run({ intensity: 140 }).markers?.[0]?.label.en ?? ''
    expect(note).toContain('anaerobically')
    expect(note).toContain('16')
  })
})

describe('the oxygen debt', () => {
  it('goes on clearing lactic acid after the exercise has stopped', () => {
    // The whole point: the exercise is over and the breathing is still hard.
    const t = trace({ intensity: 140, duration: 4 })
    const endedAt = REST_BEFORE + 4
    const atEnd = t.lactate[t.time.indexOf(endedAt)] ?? 0
    const later = t.lactate[t.time.indexOf(endedAt + 4)] ?? 0
    expect(atEnd).toBeGreaterThan(0)
    expect(later).toBeGreaterThan(0)
    expect(later).toBeLessThan(atEnd)
  })

  it('takes longer to clear after a harder effort', () => {
    const mild = run({ intensity: 115, duration: 4 }).readouts['recovery'] ?? 0
    const hard = run({ intensity: 150, duration: 4 }).readouts['recovery'] ?? 0
    expect(hard).toBeGreaterThan(mild)
  })

  it('needs no recovery at all when nothing was owed', () => {
    expect(run({ intensity: 50 }).readouts['recovery']).toBe(0)
  })
})

describe('fitness', () => {
  it('raises the aerobic ceiling', () => {
    expect(aerobicCeiling(100)).toBeGreaterThan(aerobicCeiling(0))
  })

  it('lets a fitter person work harder before going anaerobic', () => {
    // Same absolute demand, different outcome.
    const untrainedCeiling = aerobicCeiling(0)
    expect(demand(100, 0)).toBeCloseTo(untrainedCeiling, 6)
    expect(demand(100, 100)).toBeGreaterThan(untrainedCeiling)
  })
})

describe('the kernel', () => {
  it('returns finite readouts at every corner of the parameter space', () => {
    for (const intensity of [0, 150]) {
      for (const duration of [0, 15]) {
        for (const fitness of [0, 100]) {
          const p = { intensity, duration, fitness }
          for (const [key, value] of Object.entries(kernel(p).readouts)) {
            expect(Number.isFinite(value), `${key} at ${JSON.stringify(p)}`).toBe(true)
          }
        }
      }
    }
  })

  it('plots the two energy supplies on one shared scale', () => {
    // They add up to the demand, so comparing them across two different axes would be
    // meaningless.
    const s = run().series
    expect(s.find((x) => x.key === 'aerobic')?.yBounds).toEqual(
      s.find((x) => x.key === 'anaerobic')?.yBounds
    )
  })

  it('reports the whole recording time when the acid never clears', () => {
    const p = { intensity: 150, duration: 15, fitness: 0 }
    expect(recoveryMinutes(simulate(p), p)).toBeLessThanOrEqual(DURATION - REST_BEFORE - 15)
  })
})
