import { describe, expect, it } from 'vitest'
import kernel, {
  HYPO_THRESHOLD,
  RENAL_THRESHOLD,
  SET_POINT,
  minutesAboveThreshold,
  minutesToSettle,
  pulse,
  simulate,
  type HomeostasisParams,
} from './kernel'

const healthy = (over: Partial<HomeostasisParams> = {}): HomeostasisParams => ({
  meal: 60,
  insulin: 100,
  injection: 0,
  delay: 10,
  ...over,
})

describe('the absorption pulse', () => {
  it('delivers nothing before the meal is eaten', () => {
    expect(pulse(0, 45)).toBe(0)
    expect(pulse(-10, 45)).toBe(0)
  })

  it('peaks at the time it is told to', () => {
    const at = (t: number) => pulse(t, 45)
    expect(at(45)).toBeGreaterThan(at(20))
    expect(at(45)).toBeGreaterThan(at(80))
  })

  it('delivers the whole dose exactly once, wherever the peak is put', () => {
    // Every constant in the model is calibrated in mmol per gram, so a pulse that
    // integrated to 1.2 would silently make every meal 20% bigger.
    for (const peak of [30, 45, 75]) {
      let total = 0
      for (let t = 0; t < 6000; t += 0.5) total += pulse(t, peak) * 0.5
      expect(total, `peak ${peak}`).toBeCloseTo(1, 2)
    }
  })
})

describe('a working pancreas', () => {
  it('holds the glucose at the set point when nothing is eaten', () => {
    const trace = simulate(healthy({ meal: 0 }))
    expect(Math.max(...trace.glucose)).toBeCloseTo(SET_POINT, 6)
    expect(Math.min(...trace.glucose)).toBeCloseTo(SET_POINT, 6)
  })

  it('takes a normal meal to a peak in the range a question would quote', () => {
    const { readouts } = kernel(healthy())
    expect(readouts['peak']).toBeGreaterThan(6.5)
    expect(readouts['peak']).toBeLessThan(9)
  })

  it('brings it back to normal within a few hours', () => {
    const { readouts } = kernel(healthy())
    expect(readouts['settle']).toBeGreaterThan(0)
    expect(readouts['settle']).toBeLessThan(180)
  })

  it('keeps even a very large meal out of the urine', () => {
    // If a healthy person spilled glucose after a big lunch the model would be teaching
    // the opposite of the syllabus.
    const { readouts } = kernel(healthy({ meal: 120 }))
    expect(readouts['peak']).toBeLessThan(RENAL_THRESHOLD)
    expect(readouts['urine']).toBe(0)
  })

  it('secretes insulin as the glucose rises and glucagon only when it falls below', () => {
    const trace = simulate(healthy())
    expect(Math.max(...trace.insulin)).toBeGreaterThan(0)
    // Nothing dips below the set point on a normal meal, so glucagon is never called on.
    expect(Math.max(...trace.glucagon)).toBe(0)
  })
})

describe('a delay is what makes it overshoot', () => {
  it('secretes insulin even at zero delay', () => {
    // The history is written before it is read. Get that the wrong way round and the
    // lookup falls back to the set point, so a pancreas with no delay does nothing and a
    // healthy person comes out looking diabetic.
    const trace = simulate(healthy({ delay: 0 }))
    expect(Math.max(...trace.insulin)).toBeGreaterThan(0)
    expect(Math.max(...trace.glucose)).toBeLessThan(9)
  })

  it('lets the peak climb the longer the pancreas takes to notice', () => {
    const peaks = [0, 10, 20, 25].map((delay) => kernel(healthy({ delay })).readouts['peak'] ?? 0)
    for (let i = 1; i < peaks.length; i++) {
      expect(peaks[i], `delay step ${i}`).toBeGreaterThan(peaks[i - 1] as number)
    }
  })

  it('overshoots below the set point once the delay is long enough', () => {
    const prompt = kernel(healthy({ delay: 5 })).readouts['trough'] ?? 0
    const slow = kernel(healthy({ delay: 25 })).readouts['trough'] ?? 0
    expect(prompt).toBeCloseTo(SET_POINT, 6)
    expect(slow).toBeLessThan(SET_POINT)
  })

  it('calls glucagon in to fetch it back after an overshoot', () => {
    const trace = simulate(healthy({ delay: 25 }))
    expect(Math.max(...trace.glucagon)).toBeGreaterThan(0)
  })
})

describe('untreated Type 1 diabetes', () => {
  const untreated = healthy({ insulin: 0 })

  it('lets the glucose climb past the renal threshold and stay there', () => {
    const { readouts } = kernel(untreated)
    expect(readouts['peak']).toBeGreaterThan(RENAL_THRESHOLD)
    expect(readouts['urine']).toBeGreaterThan(120)
  })

  it('never recovers within the six hours simulated', () => {
    expect(kernel(untreated).readouts['settle']).toBe(360)
  })

  it('leaves glucagon working, because Type 1 destroys the beta cells only', () => {
    const trace = simulate(untreated)
    expect(Math.max(...trace.insulin)).toBe(0)
    // Glucose never falls below the set point here, so glucagon is not needed — but the
    // machinery must still be present.
    expect(simulate({ ...untreated, injection: 250 }).glucagon.some((v) => v > 0)).toBe(true)
  })
})

describe('treating it by injection', () => {
  it('brings a matched dose back under the renal threshold', () => {
    const { readouts } = kernel(healthy({ insulin: 0, injection: 100 }))
    expect(readouts['peak']).toBeLessThan(RENAL_THRESHOLD)
    expect(readouts['urine']).toBe(0)
  })

  it('causes a hypo if the dose is too large', () => {
    // The whole point of modelling the injection outside the feedback loop: it goes on
    // working to its timetable after the glucose it was meant for has gone.
    const { readouts } = kernel(healthy({ insulin: 0, injection: 250 }))
    expect(readouts['trough']).toBeLessThan(HYPO_THRESHOLD)
  })

  it('does not respond to the glucose level, unlike a pancreas', () => {
    // Same dose, two very different meals: the injection delivers the same insulin either
    // way. A pancreas would not.
    const small = simulate(healthy({ insulin: 0, injection: 100, meal: 20 }))
    const large = simulate(healthy({ insulin: 0, injection: 100, meal: 120 }))
    expect(Math.max(...small.insulin)).toBeCloseTo(Math.max(...large.insulin), 6)
    expect(Math.min(...small.glucose)).toBeLessThan(Math.min(...large.glucose))
  })
})

describe('readouts stay honest at the edges', () => {
  it('reports every corner of the parameter space as a finite number', () => {
    const corners: HomeostasisParams[] = [
      { meal: 0, insulin: 0, injection: 0, delay: 0 },
      { meal: 120, insulin: 150, injection: 250, delay: 25 },
      { meal: 120, insulin: 0, injection: 0, delay: 25 },
    ]
    for (const c of corners) {
      for (const [key, value] of Object.entries(kernel(c).readouts)) {
        expect(Number.isFinite(value), `${key} at ${JSON.stringify(c)}`).toBe(true)
      }
    }
  })

  it('counts no time above the threshold when the glucose never gets there', () => {
    expect(minutesAboveThreshold(simulate(healthy({ meal: 0 })))).toBe(0)
  })

  it('reports an immediate settle when nothing ever left the normal range', () => {
    expect(minutesToSettle(simulate(healthy({ meal: 0 })))).toBe(0)
  })
})
