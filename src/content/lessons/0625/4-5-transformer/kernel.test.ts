import { describe, expect, it } from 'vitest'
import kernel, {
  MAX_REPORTED_LOSS,
  lineCurrent,
  lossWatts,
  secondaryCurrent,
  secondaryVoltage,
  type TransformerParams,
} from './kernel'

const base: TransformerParams = {
  primaryVoltage: 25_000,
  primaryTurns: 100,
  secondaryTurns: 1600,
  powerTransmitted: 100,
  cableResistance: 10,
}
const merge = (p: Partial<TransformerParams>): TransformerParams => ({
  primaryVoltage: p.primaryVoltage ?? base.primaryVoltage,
  primaryTurns: p.primaryTurns ?? base.primaryTurns,
  secondaryTurns: p.secondaryTurns ?? base.secondaryTurns,
  powerTransmitted: p.powerTransmitted ?? base.powerTransmitted,
  cableResistance: p.cableResistance ?? base.cableResistance,
})
const run = (p: Partial<TransformerParams> = {}) => kernel(merge(p))

describe('the turns ratio', () => {
  it('obeys Vp / Vs = Np / Ns', () => {
    expect(secondaryVoltage(240, 1000, 100)).toBeCloseTo(24, 6)
    expect(secondaryVoltage(25_000, 100, 1600)).toBeCloseTo(400_000, 6)
  })

  it('steps up when the secondary has more turns and down when it has fewer', () => {
    expect(secondaryVoltage(100, 10, 50)).toBeGreaterThan(100)
    expect(secondaryVoltage(100, 50, 10)).toBeLessThan(100)
    expect(secondaryVoltage(100, 20, 20)).toBeCloseTo(100, 6)
  })

  it('names which kind of transformer it is', () => {
    expect(run({ primaryTurns: 100, secondaryTurns: 1600 }).markers?.[0]?.label.en).toContain(
      'step-up',
    )
    expect(run({ primaryTurns: 1600, secondaryTurns: 100 }).markers?.[0]?.label.en).toContain(
      'step-down',
    )
    expect(run({ primaryTurns: 100, secondaryTurns: 100 }).markers?.[0]?.label.en).toContain(
      'Equal turns',
    )
    expect(run().markers?.[0]?.label.zh).toBeTruthy()
  })
})

describe('what a transformer cannot do', () => {
  it('raises the current whenever it lowers the voltage', () => {
    // IpVp = IsVs. A transformer is not a source of power, and the arithmetic has to show it.
    const vs = secondaryVoltage(230, 1000, 100)
    const is = secondaryCurrent(1, 230, vs)
    expect(vs).toBeLessThan(230)
    expect(is).toBeGreaterThan(1)
    expect(is * vs).toBeCloseTo(1 * 230, 6)
  })

  it('lowers the current whenever it raises the voltage', () => {
    const vs = secondaryVoltage(230, 100, 1000)
    const is = secondaryCurrent(1, 230, vs)
    expect(vs).toBeGreaterThan(230)
    expect(is).toBeLessThan(1)
    expect(is * vs).toBeCloseTo(230, 6)
  })
})

describe('why transmission is done at high voltage', () => {
  it('needs less current to deliver the same power at a higher voltage', () => {
    expect(lineCurrent(1e8, 4e5)).toBeCloseTo(250, 6)
    expect(lineCurrent(1e8, 2.5e4)).toBeCloseTo(4000, 6)
  })

  it('cuts the loss by four when the voltage is doubled, not by two', () => {
    // The point of P = I²R, and the thing students say they know and then get wrong.
    const at100kV = lossWatts(lineCurrent(1e8, 1e5), 10)
    const at200kV = lossWatts(lineCurrent(1e8, 2e5), 10)
    expect(at100kV / at200kV).toBeCloseTo(4, 6)
  })

  it('falls as one over the voltage squared while the current falls as one over the voltage', () => {
    const r = run()
    const loss = r.series.find((s) => s.key === 'loss')
    const current = r.series.find((s) => s.key === 'current')
    const ratio = (s: typeof loss) => {
      const a = s?.points[10]
      const b = s?.points[50]
      return (a?.[1] ?? 0) / (b?.[1] ?? 1)
    }
    // Over the same stretch of x, the loss drops by roughly the square of the factor the
    // current drops by. Approximate because the samples are not exact multiples.
    expect(ratio(loss)).toBeGreaterThan(ratio(current) ** 2 * 0.9)
    expect(ratio(loss)).toBeLessThan(ratio(current) ** 2 * 1.1)
  })

  it('says so in the note, with numbers', () => {
    expect(run().markers?.[1]?.label.en).toMatch(/A in the cable/)
    expect(run({ secondaryTurns: 400 }).markers?.[1]?.label.en).toMatch(/lost as heat|impossible/)
  })
})

describe('the point where the model gives up', () => {
  it('refuses to report a loss greater than the power being sent', () => {
    // 25 kV carrying 100 MW would need 4000 A, and I²R then exceeds the power itself.
    // The equation is fine; the assumption that any cable could carry that is not.
    const r = run({ primaryTurns: 100, secondaryTurns: 100 })
    expect(r.readouts['percentLost']).toBeLessThanOrEqual(MAX_REPORTED_LOSS)
    expect(r.markers?.[1]?.label.en).toContain('impossible')
    expect(r.markers?.[1]?.label.en).toContain('melt')
  })

  it('caps the plotted curve at the same place', () => {
    const loss = run({ cableResistance: 50, powerTransmitted: 200 }).series.find(
      (s) => s.key === 'loss',
    )
    for (const [x, y] of loss?.points ?? []) {
      expect(y, `${x} kV`).toBeLessThanOrEqual(MAX_REPORTED_LOSS)
    }
  })
})

describe('the kernel', () => {
  it('returns finite readouts at every corner of the parameter space', () => {
    for (const primaryVoltage of [100, 25_000]) {
      for (const primaryTurns of [1, 500]) {
        for (const secondaryTurns of [1, 5000]) {
          for (const powerTransmitted of [1, 200]) {
            for (const cableResistance of [1, 50]) {
              const p = {
                primaryVoltage,
                primaryTurns,
                secondaryTurns,
                powerTransmitted,
                cableResistance,
              }
              for (const [key, value] of Object.entries(kernel(p).readouts)) {
                expect(Number.isFinite(value), `${key} at ${JSON.stringify(p)}`).toBe(true)
              }
            }
          }
        }
      }
    }
  })

  it('reports the default grid case in sensible units', () => {
    const r = run().readouts
    expect(r['secondaryVoltage']).toBeCloseTo(400, 1)
    expect(r['lineCurrent']).toBeCloseTo(250, 0)
    expect(r['powerLost']).toBeCloseTo(0.625, 2)
    expect(r['percentLost']).toBeCloseTo(0.63, 1)
  })
})
