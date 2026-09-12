import { describe, expect, it } from 'vitest'
import { balancingMass, moment, momentsKernel, tiltAngle } from './kernel'
import { G_EARTH } from '@/lib/units'

describe('moment', () => {
  it('is force times perpendicular distance', () => {
    // 0625.1.5.2.2
    expect(moment(2, 0.5)).toBeCloseTo(2 * G_EARTH * 0.5, 10)
    expect(moment(1, 0.3)).toBeCloseTo(0.3 * G_EARTH, 10)
  })

  it('doubles when either the mass or the distance doubles', () => {
    const base = moment(1, 0.2)
    expect(moment(2, 0.2)).toBeCloseTo(2 * base, 10)
    expect(moment(1, 0.4)).toBeCloseTo(2 * base, 10)
  })

  it('is zero at the pivot', () => {
    expect(moment(5, 0)).toBe(0)
  })
})

describe('tiltAngle', () => {
  it('is level when there is no net moment', () => {
    expect(tiltAngle(0)).toBe(0)
  })

  it('tips the right-hand side down for a positive net moment', () => {
    expect(tiltAngle(2)).toBeGreaterThan(0)
    expect(tiltAngle(-2)).toBeLessThan(0)
  })

  it('is antisymmetric — equal imbalance either way tilts equally', () => {
    expect(tiltAngle(3)).toBeCloseTo(-tiltAngle(-3), 10)
  })

  it('grows with the imbalance but never leaves the frame', () => {
    let previous = 0
    for (const net of [0.5, 1, 2, 5, 20, 500]) {
      const t = tiltAngle(net)
      expect(t).toBeGreaterThan(previous)
      expect(t).toBeLessThan(22)
      previous = t
    }
  })
})

describe('balancingMass', () => {
  it('solves m₁d₁ = m₂d₂ for the unknown mass', () => {
    // 1 kg at 0.4 m balances 2 kg at 0.2 m
    expect(balancingMass(1, 0.4, 0.2)).toBeCloseTo(2, 10)
    expect(balancingMass(2, 0.3, 0.6)).toBeCloseTo(1, 10)
  })

  it('actually balances the beam it is fed back into', () => {
    const leftMass = 1.4
    const leftDistance = 0.35
    const rightDistance = 0.2
    const m = balancingMass(leftMass, leftDistance, rightDistance)!
    const r = momentsKernel({ leftMass, leftDistance, rightMass: m, rightDistance })
    expect(r.readouts['balanced']).toBe(1)
    expect(r.readouts['tilt']).toBe(0)
  })

  it('returns null when no positive mass would work', () => {
    expect(balancingMass(1, 0.4, 0)).toBeNull()
    expect(balancingMass(0, 0.4, 0.2)).toBeNull()
  })
})

describe('momentsKernel', () => {
  const balancedCase = { leftMass: 2, leftDistance: 0.2, rightMass: 1, rightDistance: 0.4 }

  it('balances when the two moments are equal', () => {
    // 0625.1.5.2.3 — the principle of moments
    const r = momentsKernel(balancedCase)
    expect(r.readouts['anticlockwiseMoment']).toBeCloseTo(r.readouts['clockwiseMoment']!, 10)
    expect(r.readouts['netMoment']).toBeCloseTo(0, 10)
    expect(r.readouts['balanced']).toBe(1)
  })

  it('draws the beam level when balanced — the picture matches the arithmetic', () => {
    const r = momentsKernel(balancedCase)
    const [[, y1], [, y2]] = [r.series[0]!.points[0]!, r.series[0]!.points[1]!]
    expect(y1).toBeCloseTo(0, 10)
    expect(y2).toBeCloseTo(0, 10)
  })

  it('drops the heavier side, and only the heavier side', () => {
    const rightHeavy = momentsKernel({ ...balancedCase, rightMass: 3 })
    expect(rightHeavy.readouts['netMoment']!).toBeGreaterThan(0)
    // Right end of the beam is lower on screen, i.e. smaller y.
    expect(rightHeavy.series[0]!.points[1]![1]).toBeLessThan(
      rightHeavy.series[0]!.points[0]![1]!
    )

    const leftHeavy = momentsKernel({ ...balancedCase, leftMass: 5 })
    expect(leftHeavy.readouts['netMoment']!).toBeLessThan(0)
    expect(leftHeavy.series[0]!.points[0]![1]).toBeLessThan(leftHeavy.series[0]!.points[1]![1]!)
  })

  it('keeps the beam a constant length whatever the tilt', () => {
    for (const rightMass of [0.1, 1, 2, 5]) {
      const r = momentsKernel({ ...balancedCase, rightMass })
      const [[x1, y1], [x2, y2]] = [r.series[0]!.points[0]!, r.series[0]!.points[1]!]
      expect(Math.hypot(x2 - x1, y2 - y1)).toBeCloseTo(1.0, 6)
    }
  })

  it('hangs each weight on the beam at its own distance from the pivot', () => {
    const r = momentsKernel(balancedCase)
    const [left, right] = [r.bodies![0]!, r.bodies![1]!]
    expect(Math.hypot(left.x, left.y)).toBeCloseTo(balancedCase.leftDistance, 6)
    expect(Math.hypot(right.x, right.y)).toBeCloseTo(balancedCase.rightDistance, 6)
  })

  it('moves the weights with the beam when it tilts', () => {
    const tilted = momentsKernel({ ...balancedCase, rightMass: 3 })
    // Right side is down, so its weight sits lower than the left one.
    expect(tilted.bodies![1]!.y).toBeLessThan(tilted.bodies![0]!.y)
  })

  it('scales weight size with the cube root of mass, so volume reads as mass', () => {
    const r = momentsKernel({ ...balancedCase, leftMass: 8, rightMass: 1 })
    expect(r.bodies![0]!.r! / r.bodies![1]!.r!).toBeCloseTo(2, 6)
  })

  it('is finite everywhere across the parameter range', () => {
    for (const leftMass of [0.1, 5]) {
      for (const leftDistance of [0.05, 0.5]) {
        for (const rightMass of [0.1, 5]) {
          for (const rightDistance of [0.05, 0.5]) {
            const r = momentsKernel({ leftMass, leftDistance, rightMass, rightDistance })
            for (const v of Object.values(r.readouts)) expect(Number.isFinite(v)).toBe(true)
          }
        }
      }
    }
  })
})
