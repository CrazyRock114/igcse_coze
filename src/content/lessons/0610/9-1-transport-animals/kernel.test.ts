import { describe, expect, it } from 'vitest'
import kernel, {
  DURATION,
  MAX_RATE,
  REST_BEFORE,
  RESTING_OUTPUT,
  recoveryConstant,
  recoveryTime,
  restingRate,
  restingStroke,
  simulate,
  strokeVolume,
  targetRate,
  type TransportParams,
} from './kernel'

const subject = (over: Partial<TransportParams> = {}): TransportParams => ({
  intensity: 60,
  duration: 5,
  fitness: 0,
  ...over,
})

describe('resting values', () => {
  it('gives an untrained adult a pulse near 72 and an athlete one near 42', () => {
    expect(restingRate(0)).toBeCloseTo(72, 0)
    expect(restingRate(100)).toBeCloseTo(42, 0)
  })

  it('keeps resting cardiac output the same whatever the fitness', () => {
    // The fact the whole model is built on: training does not make you pump more blood
    // while sitting still, it makes you pump it in fewer, bigger beats.
    for (const fitness of [0, 25, 50, 75, 100]) {
      expect(restingRate(fitness) * restingStroke(fitness), `fitness ${fitness}`).toBeCloseTo(
        RESTING_OUTPUT,
        6
      )
    }
  })

  it('gives the fitter heart the larger stroke volume', () => {
    expect(restingStroke(100)).toBeGreaterThan(restingStroke(0))
    expect(restingStroke(0)).toBeCloseTo(70, 0)
    expect(restingStroke(100)).toBeCloseTo(120, 0)
  })
})

describe('during exercise', () => {
  it('raises the rate towards the maximum as the effort rises', () => {
    expect(targetRate(0, 0)).toBeCloseTo(restingRate(0), 6)
    expect(targetRate(0, 100)).toBeCloseTo(MAX_RATE, 6)
    expect(targetRate(0, 50)).toBeGreaterThan(targetRate(0, 20))
  })

  it('gives the same maximum rate however fit the subject is', () => {
    // Training raises stroke volume, not maximum heart rate — which is age-limited. A
    // model that let an athlete's rate go higher would teach the opposite.
    expect(targetRate(100, 100)).toBeCloseTo(targetRate(0, 100), 6)
  })

  it('plateaus the stroke volume well before maximal effort', () => {
    // Beyond moderate effort the heart cannot fill any further between beats, so all
    // the extra output has to come from beating faster.
    expect(strokeVolume(0, 50)).toBeCloseTo(strokeVolume(0, 100), 6)
    expect(strokeVolume(0, 25)).toBeLessThan(strokeVolume(0, 50))
  })

  it('reaches a peak cardiac output in the range a real subject would', () => {
    const untrained = kernel(subject({ intensity: 100 })).readouts['peakOutput'] ?? 0
    const athlete = kernel(subject({ intensity: 100, fitness: 100 })).readouts['peakOutput'] ?? 0
    expect(untrained).toBeGreaterThan(15)
    expect(untrained).toBeLessThan(25)
    expect(athlete).toBeGreaterThan(28)
    expect(athlete).toBeLessThan(40)
  })

  it('does not raise the rate at all when the subject never exercises', () => {
    const trace = simulate(subject({ intensity: 0 }))
    expect(Math.max(...trace.rate)).toBeCloseTo(restingRate(0), 1)
  })
})

describe('recovery', () => {
  it('brings a fitter subject back to resting sooner', () => {
    const untrained = kernel(subject({ fitness: 0 })).readouts['recovery'] ?? 0
    const athlete = kernel(subject({ fitness: 100 })).readouts['recovery'] ?? 0
    expect(athlete).toBeLessThan(untrained)
  })

  it('falls monotonically with fitness, so the slider always means the same thing', () => {
    const times = [0, 25, 50, 75, 100].map((fitness) => kernel(subject({ fitness })).readouts['recovery'] ?? 0)
    for (let i = 1; i < times.length; i++) {
      expect(times[i], `step ${i}`).toBeLessThanOrEqual(times[i - 1] as number)
    }
  })

  it('speeds up recovery as fitness rises', () => {
    expect(recoveryConstant(100)).toBeLessThan(recoveryConstant(0))
  })

  it('measures from the end of the exercise, not from the start of the recording', () => {
    // A longer bout does not make the recovery look longer just by shifting the clock.
    const short = kernel(subject({ duration: 2 })).readouts['recovery'] ?? 0
    const long = kernel(subject({ duration: 8 })).readouts['recovery'] ?? 0
    expect(Math.abs(long - short)).toBeLessThan(1)
  })

  it('reports the time left rather than inventing one if it never recovers', () => {
    const p = subject({ intensity: 100, duration: 10, fitness: 0 })
    const trace = simulate(p)
    const reported = recoveryTime(trace, p)
    expect(reported).toBeLessThanOrEqual(DURATION - REST_BEFORE - 10)
  })
})

describe('the trace', () => {
  it('rests, exercises, then recovers, in that order', () => {
    const trace = simulate(subject({ intensity: 80, duration: 4 }))
    const at = (t: number) => trace.rate[trace.time.indexOf(t)] ?? 0
    expect(at(1)).toBeCloseTo(restingRate(0), 1) // resting before
    expect(at(5)).toBeGreaterThan(at(1)) // raised during
    expect(at(12)).toBeLessThan(at(5)) // falling after
  })

  it('drops the cardiac output back the moment the exercise stops', () => {
    // Stroke volume is only raised while the muscles are asking for it.
    const trace = simulate(subject({ intensity: 80, duration: 4 }))
    const duringIndex = trace.time.indexOf(5)
    const afterIndex = trace.time.indexOf(15)
    expect(trace.output[afterIndex]).toBeLessThan(trace.output[duringIndex] as number)
  })

  it('plots both curves over the same fixed time axis', () => {
    const { series } = kernel(subject())
    expect(series).toHaveLength(2)
    for (const s of series) expect(s.xBounds).toEqual({ min: 0, max: DURATION })
  })
})

describe('the kernel', () => {
  it('returns finite readouts at every corner of the parameter space', () => {
    for (const intensity of [0, 100]) {
      for (const duration of [0, 10]) {
        for (const fitness of [0, 100]) {
          const params = { intensity, duration, fitness }
          for (const [key, value] of Object.entries(kernel(params).readouts)) {
            expect(Number.isFinite(value), `${key} at ${JSON.stringify(params)}`).toBe(true)
          }
        }
      }
    }
  })

  it('says in the note how long the recovery took', () => {
    expect(kernel(subject({ fitness: 100 })).markers?.[0]?.label.en).toContain('Back to resting')
    expect(kernel(subject({ fitness: 100 })).markers?.[0]?.label.zh).toBeTruthy()
  })
})
