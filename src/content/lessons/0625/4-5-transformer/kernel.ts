/**
 * The transformer and high-voltage transmission — kernel for lesson 0625/4-5-transformer.
 *
 * A transformer feeding a transmission line, with the power lost in the cable plotted against
 * the voltage the power is sent at.
 *
 * The syllabus asks students to use P = I²R to explain why transmission is done at high
 * voltage, and the explanation is nearly always given back as "high voltage means low current
 * means low losses" without any sense of the size of the effect. Two curves fix that: the
 * current falls as one over the voltage, and the loss falls as one over the voltage *squared*.
 * Sending the same power at ten times the voltage does not cut the loss by ten, it cuts it by
 * a hundred, and that is the whole reason the grid exists.
 *
 * A limit worth stating: at low enough voltage the arithmetic returns a loss larger than the
 * power being sent, which is impossible. Nothing is wrong with P = I²R — what has failed is
 * the assumption that the cable could carry such a current at all. It would melt first. The
 * reported percentage is capped at 100 and the note says so rather than printing 640%.
 *
 * Covers 0625.4.5.6.3, 4.5.6.7 and 4.5.6.8.
 */

import type { SimKernel, SimResult, SimSeries } from '@/content/types'

export interface TransformerParams extends Record<string, number> {
  /** Voltage applied to the primary coil, in volts. */
  primaryVoltage: number
  /** Turns on the primary coil. */
  primaryTurns: number
  /** Turns on the secondary coil. */
  secondaryTurns: number
  /** Power being sent along the line, in megawatts. */
  powerTransmitted: number
  /** Total resistance of the transmission cable, in ohms. */
  cableResistance: number
}

/** Beyond this the loss is not worth reporting as a number — the cable could not survive it. */
export const MAX_REPORTED_LOSS = 100

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))

/** Secondary voltage, from Vp / Vs = Np / Ns. */
export function secondaryVoltage(
  primaryVoltage: number,
  primaryTurns: number,
  secondaryTurns: number,
): number {
  if (primaryTurns <= 0) return 0
  return (primaryVoltage * secondaryTurns) / primaryTurns
}

/** Secondary current for a 100% efficient transformer, from IpVp = IsVs. */
export function secondaryCurrent(
  primaryCurrent: number,
  primaryVoltage: number,
  secondaryVolts: number,
): number {
  if (secondaryVolts <= 0) return 0
  return (primaryCurrent * primaryVoltage) / secondaryVolts
}

/** Current needed to deliver a given power at a given voltage. */
export function lineCurrent(powerWatts: number, volts: number): number {
  if (volts <= 0) return 0
  return powerWatts / volts
}

/** Power dissipated in the cable, from P = I²R. */
export function lossWatts(current: number, resistance: number): number {
  return current * current * resistance
}

const round = (v: number, dp = 2) => {
  const f = 10 ** dp
  return Math.round(v * f) / f
}

/** Voltages sampled along the x-axis, in volts. */
const V_MIN = 5_000
const V_MAX = 500_000

export const transformerKernel: SimKernel<TransformerParams, SimResult> = (params) => {
  const primaryVoltage = clamp(params['primaryVoltage'] ?? 25_000, 100, 25_000)
  const primaryTurns = clamp(params['primaryTurns'] ?? 100, 1, 500)
  const secondaryTurns = clamp(params['secondaryTurns'] ?? 1600, 1, 5000)
  const powerMW = clamp(params['powerTransmitted'] ?? 100, 1, 200)
  const resistance = clamp(params['cableResistance'] ?? 10, 1, 50)

  const powerWatts = powerMW * 1e6
  const vs = secondaryVoltage(primaryVoltage, primaryTurns, secondaryTurns)

  const lossPercentAt = (volts: number) =>
    Math.min(MAX_REPORTED_LOSS, (lossWatts(lineCurrent(powerWatts, volts), resistance) / powerWatts) * 100)

  const sample = (f: (volts: number) => number) =>
    Array.from({ length: 100 }, (_, i) => {
      const volts = V_MIN + ((V_MAX - V_MIN) * i) / 99
      return [round(volts / 1000, 1), round(f(volts), 3)] as [number, number]
    })

  const series: SimSeries[] = [
    {
      key: 'loss',
      label: { en: 'Power lost in the cable', zh: '电缆中损失的功率' },
      unit: { x: 'transmission voltage / kV', y: 'power lost / % of that sent' },
      points: sample(lossPercentAt),
      xBounds: { min: 0, max: 500 },
      yBounds: { min: 0, max: MAX_REPORTED_LOSS },
    },
    {
      key: 'current',
      label: { en: 'Current in the cable', zh: '电缆中的电流' },
      // A second panel, in different units, precisely so the two shapes can be compared.
      // The current falls as 1/V and the loss as 1/V², and seeing one curve bend away far
      // more sharply than the other is the point P = I²R is making.
      unit: { x: 'transmission voltage / kV', y: 'current / A' },
      points: sample((volts) => lineCurrent(powerWatts, volts)),
      xBounds: { min: 0, max: 500 },
    },
  ]

  const current = lineCurrent(powerWatts, vs)
  const loss = lossWatts(current, resistance)
  const rawPercent = powerWatts > 0 ? (loss / powerWatts) * 100 : 0

  const ratioNote =
    secondaryTurns > primaryTurns
      ? {
          en: `A step-up transformer: ${primaryTurns} turns to ${secondaryTurns}, so ${round(primaryVoltage / 1000, 1)} kV becomes ${round(vs / 1000, 1)} kV. The voltage goes up in the same ratio as the turns`,
          zh: `这是升压变压器：${primaryTurns} 匝对 ${secondaryTurns} 匝，于是 ${round(primaryVoltage / 1000, 1)} kV 变成 ${round(vs / 1000, 1)} kV。电压按与匝数相同的比例升高`,
        }
      : secondaryTurns < primaryTurns
        ? {
            en: `A step-down transformer: ${primaryTurns} turns to ${secondaryTurns}, so ${round(primaryVoltage / 1000, 1)} kV becomes ${round(vs / 1000, 1)} kV. Note that the current in the secondary goes up as the voltage comes down — the transformer does not create power`,
            zh: `这是降压变压器：${primaryTurns} 匝对 ${secondaryTurns} 匝，于是 ${round(primaryVoltage / 1000, 1)} kV 变成 ${round(vs / 1000, 1)} kV。注意副线圈电压降低时电流会升高——变压器并不产生功率`,
          }
        : {
            en: 'Equal turns on both coils, so the secondary voltage equals the primary. Such a transformer is used to isolate one circuit from another, not to change a voltage',
            zh: '两个线圈匝数相同，副线圈电压等于原线圈电压。这种变压器用于隔离两个电路，而不是改变电压',
          }

  const lossNote =
    rawPercent > MAX_REPORTED_LOSS
      ? {
          en: `At only ${round(vs / 1000, 1)} kV the line would need ${round(current)} A, and P = I²R then gives a loss larger than the power being sent — which is impossible. Nothing is wrong with the equation: the cable would melt long before carrying such a current. This is why no grid transmits at this voltage`,
          zh: `仅 ${round(vs / 1000, 1)} kV 时线路需要 ${round(current)} A，代入 P = I²R 得到的损耗大于所输送的功率——这是不可能的。公式没有问题：电缆在承载这样的电流之前早就熔断了。这正是没有任何电网在此电压下输电的原因`,
        }
      : // A real grid loses a couple of per cent. Anything above about five is worth
        // flagging rather than congratulating the student on.
        rawPercent > 5
        ? {
            en: `${round(rawPercent, 1)}% of the power is being lost as heat in the cable. Doubling the transmission voltage would halve the current and so cut this loss to a quarter, because the loss goes as the current squared`,
            zh: `有 ${round(rawPercent, 1)}% 的功率作为热量损失在电缆中。把输电电压提高一倍，电流减半，损耗则降到四分之一，因为损耗与电流的平方成正比`,
          }
        : {
            en: `${round(current)} A in the cable and only ${round(rawPercent, 2)}% of the power lost. This is what high-voltage transmission buys: the same power delivered with a current small enough that I²R barely matters`,
            zh: `电缆中电流为 ${round(current)} A，损失的功率仅 ${round(rawPercent, 2)}%。这正是高压输电的好处：输送同样的功率，而电流小到使 I²R 几乎无关紧要`,
          }

  return {
    series,
    readouts: {
      secondaryVoltage: round(vs / 1000, 1),
      lineCurrent: round(current),
      powerLost: round(loss / 1e6, 3),
      percentLost: round(Math.min(MAX_REPORTED_LOSS, rawPercent), 2),
    },
    markers: [
      { x: 0, y: 0, label: ratioNote },
      { x: 0, y: 0, label: lossNote },
    ],
  }
}

export default transformerKernel
