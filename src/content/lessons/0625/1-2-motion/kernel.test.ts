import { describe, expect, it } from 'vitest'
import { distanceAt, motionKernel, speedAt, timeToRest } from './kernel'

describe('speedAt', () => {
  it('follows v = u + at', () => {
    expect(speedAt(0, 2, 5)).toBe(10)
    expect(speedAt(10, 0, 5)).toBe(10)
    expect(speedAt(5, 3, 4)).toBe(17)
  })

  it('clamps at rest rather than reversing', () => {
    // 20 m/s decelerating at 4 m/s² stops after 5 s and stays stopped.
    expect(speedAt(20, -4, 5)).toBe(0)
    expect(speedAt(20, -4, 8)).toBe(0)
  })
})

describe('timeToRest', () => {
  it('returns u / |a| for a decelerating object', () => {
    expect(timeToRest(20, -4)).toBe(5)
    expect(timeToRest(9, -3)).toBe(3)
  })

  it('is infinite when the object is not slowing down', () => {
    expect(timeToRest(10, 0)).toBe(Infinity)
    expect(timeToRest(10, 2)).toBe(Infinity)
  })
})

describe('distanceAt', () => {
  it('follows s = ut + ½at²', () => {
    expect(distanceAt(0, 2, 5)).toBe(25) // ½ × 2 × 25
    expect(distanceAt(10, 0, 5)).toBe(50) // constant speed
    expect(distanceAt(5, 2, 4)).toBe(36) // 20 + 16
  })

  it('stops accumulating once the object comes to rest', () => {
    // Stops at t = 5 s having travelled 50 m; still 50 m at t = 8 s.
    expect(distanceAt(20, -4, 5)).toBe(50)
    expect(distanceAt(20, -4, 8)).toBe(50)
  })
})

describe('motionKernel', () => {
  it('produces both graphs the syllabus asks students to interpret', () => {
    const r = motionKernel({ u: 0, a: 2, duration: 10 })
    expect(r.series.map((s) => s.key)).toEqual(['distance', 'speed'])
    expect(r.series[0]?.unit).toEqual({ x: 's', y: 'm' })
    expect(r.series[1]?.unit).toEqual({ x: 's', y: 'm / s' })
  })

  it('samples the full duration, starting at the origin', () => {
    const r = motionKernel({ u: 0, a: 2, duration: 10 })
    const speed = r.series[1]!.points
    expect(speed[0]).toEqual([0, 0])
    expect(speed[speed.length - 1]?.[0]).toBeCloseTo(10, 10)
  })

  it('agrees with the equations at the end of the motion', () => {
    const r = motionKernel({ u: 5, a: 2, duration: 4 })
    expect(r.readouts['finalSpeed']).toBeCloseTo(13, 10) // 5 + 2×4
    expect(r.readouts['distance']).toBeCloseTo(36, 10) // 5×4 + ½×2×16
    expect(r.readouts['averageSpeed']).toBeCloseTo(9, 10) // 36 / 4
  })

  it('makes the area under the speed–time graph equal the distance', () => {
    // This is 0625.1.2.7 — the numeric claim the lesson makes must hold in the data.
    const p = { u: 4, a: 1.5, duration: 8 }
    const r = motionKernel(p)
    const speed = r.series[1]!.points

    let area = 0
    for (let i = 1; i < speed.length; i++) {
      const [t0, v0] = speed[i - 1]!
      const [t1, v1] = speed[i]!
      area += ((v0 + v1) / 2) * (t1 - t0)
    }

    expect(area).toBeCloseTo(r.readouts['distance']!, 6)
  })

  it('makes the gradient of the distance–time graph equal the speed', () => {
    // 0625.1.2.6. Checked mid-motion, away from the sampling end points.
    const r = motionKernel({ u: 3, a: 2, duration: 10 })
    const dist = r.series[0]!.points
    const i = 60
    const [t0, s0] = dist[i - 1]!
    const [t1, s1] = dist[i + 1]!
    const gradient = (s1 - s0) / (t1 - t0)
    const tMid = dist[i]![0]

    expect(gradient).toBeCloseTo(speedAt(3, 2, tMid), 4)
  })

  it('holds distance constant after a decelerating object stops', () => {
    const r = motionKernel({ u: 20, a: -4, duration: 8 })
    expect(r.readouts['finalSpeed']).toBe(0)
    expect(r.readouts['distance']).toBeCloseTo(50, 10)
    expect(r.readouts['timeToRest']).toBeCloseTo(5, 10)
  })

  it('reports the duration as time-to-rest when the object never stops', () => {
    const r = motionKernel({ u: 5, a: 2, duration: 6 })
    expect(r.readouts['timeToRest']).toBe(6)
  })

  it('handles constant speed, where acceleration is zero', () => {
    const r = motionKernel({ u: 12, a: 0, duration: 5 })
    expect(r.readouts['finalSpeed']).toBe(12)
    expect(r.readouts['distance']).toBeCloseTo(60, 10)
    expect(r.readouts['averageSpeed']).toBeCloseTo(12, 10)
  })
})
