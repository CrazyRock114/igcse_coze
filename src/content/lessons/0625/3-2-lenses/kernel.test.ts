import { describe, expect, it } from 'vitest'
import kernel, {
  imageDistance,
  imageKind,
  magnification,
  type LensParams,
} from './kernel'

const base: LensParams = { objectDistance: 30, focalLength: 10, objectHeight: 2 }
const merge = (p: Partial<LensParams>): LensParams => ({
  objectDistance: p.objectDistance ?? base.objectDistance,
  focalLength: p.focalLength ?? base.focalLength,
  objectHeight: p.objectHeight ?? base.objectHeight,
})
const run = (p: Partial<LensParams> = {}) => kernel(merge(p))

describe('the thin lens equation', () => {
  it('agrees with 1/f = 1/u + 1/v', () => {
    for (const [u, f] of [[30, 10], [15, 10], [40, 5]] as const) {
      const v = imageDistance(u, f)
      expect(1 / f, `u=${u} f=${f}`).toBeCloseTo(1 / u + 1 / v, 8)
    }
  })

  it('puts the image at 2f when the object is at 2f', () => {
    // The one case a student can check without a calculator, and a good sanity test.
    expect(imageDistance(20, 10)).toBeCloseTo(20, 6)
    expect(magnification(20, 10)).toBeCloseTo(1, 6)
  })
})

describe('beyond the focal length', () => {
  it('forms a real image', () => {
    expect(imageKind(30, 10)).toBe('real')
    expect(imageDistance(30, 10)).toBeGreaterThan(0)
  })

  it('diminishes the image beyond 2f — the camera and the eye', () => {
    expect(Math.abs(magnification(40, 10))).toBeLessThan(1)
    expect(run({ objectDistance: 40 }).markers?.[0]?.label.en).toContain('diminished')
  })

  it('magnifies the image between f and 2f — the projector', () => {
    expect(Math.abs(magnification(15, 10))).toBeGreaterThan(1)
    expect(run({ objectDistance: 15 }).markers?.[0]?.label.en).toContain('magnified')
  })

  it('moves the image further out as the object approaches the focus', () => {
    expect(imageDistance(12, 10)).toBeGreaterThan(imageDistance(30, 10))
  })
})

describe('inside the focal length', () => {
  it('gives a negative image distance, which is what virtual means', () => {
    // Returning nothing here would hide the whole idea. The rays diverge, so the image is
    // where they would have come from — behind the lens, hence the sign.
    expect(imageDistance(5, 10)).toBeLessThan(0)
    expect(imageKind(5, 10)).toBe('virtual')
  })

  it('magnifies and keeps the image upright — the magnifying glass', () => {
    expect(Math.abs(magnification(5, 10))).toBeGreaterThan(1)
    expect(run({ objectDistance: 5 }).markers?.[0]?.label.en).toContain('magnifying glass')
    expect(run({ objectDistance: 5 }).markers?.[0]?.label.zh).toBeTruthy()
  })
})

describe('at the focal point itself', () => {
  it('forms no image, because the refracted rays emerge parallel', () => {
    expect(imageKind(10, 10)).toBe('none')
    expect(run({ objectDistance: 10 }).markers?.[0]?.label.en).toContain('no image')
  })

  it('reports zero rather than infinity, so nothing downstream breaks', () => {
    expect(imageDistance(10, 10)).toBe(Infinity)
    const r = run({ objectDistance: 10 }).readouts
    for (const [key, value] of Object.entries(r)) {
      expect(Number.isFinite(value), key).toBe(true)
    }
  })
})

describe('the readouts', () => {
  it('scales the image height by the magnification', () => {
    const r = run({ objectDistance: 15, focalLength: 10, objectHeight: 3 }).readouts
    expect(r['imageHeight']).toBeCloseTo(
      (r['magnification'] as number) * 3,
      1
    )
  })

  it('returns finite readouts at every corner of the parameter space', () => {
    for (const objectDistance of [1, 100]) {
      for (const focalLength of [2, 40]) {
        for (const objectHeight of [0.5, 10]) {
          const p = { objectDistance, focalLength, objectHeight }
          for (const [key, value] of Object.entries(kernel(p).readouts)) {
            expect(Number.isFinite(value), `${key} at ${JSON.stringify(p)}`).toBe(true)
          }
        }
      }
    }
  })

  it('clips the asymptote rather than letting it take the axis with it', () => {
    const s = run().series.find((x) => x.key === 'imageDistance')
    for (const [, y] of s?.points ?? []) {
      expect(Math.abs(y)).toBeLessThanOrEqual(120)
    }
  })
})
