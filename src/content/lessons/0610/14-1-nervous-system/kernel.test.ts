import { describe, expect, it } from 'vitest'
import kernel, {
  EYE_LENGTH,
  MAX_POWER,
  NEAR_POINT,
  PUPIL_MAX,
  PUPIL_MIN,
  lensPower,
  pupilDiameter,
  retinalLight,
} from './kernel'

describe('the pupil reflex', () => {
  it('opens in the dark and closes in bright light', () => {
    expect(pupilDiameter(0.01)).toBeCloseTo(PUPIL_MAX, 1)
    expect(pupilDiameter(100)).toBeCloseTo(PUPIL_MIN, 1)
    expect(pupilDiameter(1)).toBeGreaterThan(pupilDiameter(50))
  })

  it('never leaves the range a real iris can reach', () => {
    for (const light of [0, 0.001, 0.5, 37, 100, 1000]) {
      const d = pupilDiameter(light)
      expect(d, `at ${light}%`).toBeGreaterThanOrEqual(PUPIL_MIN - 0.001)
      expect(d, `at ${light}%`).toBeLessThanOrEqual(PUPIL_MAX + 0.001)
    }
  })

  it('spreads its response across the whole range of brightness, not just the bright end', () => {
    // A linear response would spend the entire reflex below 10% and be flat above it.
    // Each tenfold step in light should move the pupil by a similar amount.
    const steps = [0.01, 0.1, 1, 10, 100].map((l) => pupilDiameter(l))
    const drops = steps.slice(1).map((d, i) => (steps[i] as number) - d)
    for (const drop of drops) expect(drop).toBeCloseTo(drops[0] as number, 1)
  })

  it('stops responding when the iris muscles are not working', () => {
    const dark = pupilDiameter(0.01, 0)
    const bright = pupilDiameter(100, 0)
    expect(dark).toBeCloseTo(bright, 6)
  })
})

describe('what the reflex is worth', () => {
  it('cuts the light on the retina as the brightness rises', () => {
    const withReflex = retinalLight(100) / retinalLight(0.01)
    const without = retinalLight(100, 0) / retinalLight(0.01, 0)
    expect(withReflex).toBeLessThan(without)
  })

  it('cannot do better than the ratio of the pupil areas, which is sixteen', () => {
    // The honest ceiling. Claiming the reflex holds retinal illumination constant would
    // be teaching something false, so the model must not appear to manage it.
    const withReflex = retinalLight(100) / retinalLight(0.01)
    const without = retinalLight(100, 0) / retinalLight(0.01, 0)
    const areaRatio = (PUPIL_MAX / PUPIL_MIN) ** 2
    expect(without / withReflex).toBeCloseTo(areaRatio, 1)
    // And what is left is still a change of many hundredfold, not constancy.
    expect(withReflex).toBeGreaterThan(100)
  })

  it('depends on the area of the pupil, not its diameter', () => {
    // Halving the diameter must quarter the light, or the reflex looks four times weaker
    // than it is and the physics of it is lost.
    const wide = retinalLight(1)
    const narrow = retinalLight(1, 0)
    expect(wide / narrow).toBeCloseTo((pupilDiameter(1) / pupilDiameter(1, 0)) ** 2, 4)
  })
})

describe('accommodation', () => {
  it('needs more power for a near object than a distant one', () => {
    expect(lensPower(25)).toBeGreaterThan(lensPower(100))
    expect(lensPower(100)).toBeGreaterThan(lensPower(10000))
  })

  it('agrees with the thin lens equation with the image pinned at the retina', () => {
    // P = 1/v + 1/u, in metres. If this drifts the graph is no longer physics.
    for (const u of [25, 60, 150]) {
      expect(lensPower(u)).toBeCloseTo(100 / EYE_LENGTH + 100 / u, 6)
    }
  })

  it('gives a range of accommodation of 4 dioptres, the real figure', () => {
    // Absolute power is idealised low by treating the eye as a lens in air, but the
    // *change* between infinity and the near point is exactly 1/0.25 m.
    const distant = lensPower(1e9)
    expect(MAX_POWER - distant).toBeCloseTo(100 / NEAR_POINT, 2)
  })

  it('runs out of power at the near point', () => {
    expect(kernel({ light: 50, distance: NEAR_POINT, reflex: 100 }).readouts['spare']).toBeCloseTo(
      0,
      2
    )
    expect(kernel({ light: 50, distance: 10, reflex: 100 }).readouts['spare']).toBeLessThan(0)
    expect(kernel({ light: 50, distance: 200, reflex: 100 }).readouts['spare']).toBeGreaterThan(0)
  })
})

describe('the kernel', () => {
  it('returns finite readouts at every corner of the parameter space', () => {
    const corners = [
      { light: 0, distance: 5, reflex: 0 },
      { light: 100, distance: 300, reflex: 100 },
      { light: 0, distance: 300, reflex: 100 },
      { light: 100, distance: 5, reflex: 0 },
    ]
    for (const c of corners) {
      for (const [key, value] of Object.entries(kernel(c).readouts)) {
        expect(Number.isFinite(value), `${key} at ${JSON.stringify(c)}`).toBe(true)
      }
    }
  })

  it('samples the pupil curve logarithmically, so the dim end is not one straight line', () => {
    const pupil = kernel({ light: 50, distance: 100, reflex: 100 }).series.find(
      (s) => s.key === 'pupil'
    )
    const xs = pupil?.points.map(([x]) => x) ?? []
    const belowOne = xs.filter((x) => x < 1).length
    // Half the interesting behaviour happens below 1% of full daylight.
    expect(belowOne).toBeGreaterThan(xs.length / 3)
  })

  it('says so when the object is closer than the eye can focus', () => {
    const label = kernel({ light: 50, distance: 10, reflex: 100 }).markers?.[0]?.label.en ?? ''
    expect(label).toContain('near point')
  })
})
