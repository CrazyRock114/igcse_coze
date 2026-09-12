import { describe, expect, it } from 'vitest'
import { advanceLooping } from './useAnimationFrame'

describe('advanceLooping', () => {
  it('advances at the given speed', () => {
    // 0.5 s at 2 units/s = 1 unit
    expect(advanceLooping(0, 0.5, 2, 10)).toBeCloseTo(1, 10)
    expect(advanceLooping(3, 0.25, 4, 10)).toBeCloseTo(4, 10)
  })

  it('wraps at the loop point', () => {
    expect(advanceLooping(9.5, 1, 1, 10)).toBeCloseTo(0.5, 10)
    expect(advanceLooping(9, 2, 1, 10)).toBeCloseTo(1, 10)
  })

  it('stays inside the loop for many steps, so the animation never drifts out', () => {
    let v = 0
    for (let i = 0; i < 5000; i++) {
      v = advanceLooping(v, 1 / 60, 3, 6.283185307179586)
      expect(v).toBeGreaterThanOrEqual(0)
      expect(v).toBeLessThan(6.283185307179586)
    }
  })

  it('honours a non-zero minimum', () => {
    expect(advanceLooping(4.5, 1, 1, 5, 1)).toBeCloseTo(1.5, 10)
    const v = advanceLooping(1, 0.5, 2, 5, 1)
    expect(v).toBeGreaterThanOrEqual(1)
    expect(v).toBeLessThan(5)
  })

  it('leaves the value alone for a degenerate loop', () => {
    expect(advanceLooping(3, 1, 1, 0)).toBe(3)
    expect(advanceLooping(3, 1, 1, 5, 5)).toBe(3)
  })

  it('handles a negative current value without escaping the range', () => {
    const v = advanceLooping(-1, 0.1, 1, 10)
    expect(v).toBeGreaterThanOrEqual(0)
    expect(v).toBeLessThan(10)
  })
})
