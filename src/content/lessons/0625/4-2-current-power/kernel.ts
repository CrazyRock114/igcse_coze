/**
 * Current, e.m.f. and electrical power — kernel for lesson 0625/4-2-current-power.
 *
 * An appliance on a mains supply, with the cost of running it. The syllabus asks for P = IV,
 * E = IVt and the kilowatt-hour, and the reason to run them rather than state them is that
 * the kilowatt-hour is where every student's intuition fails: it is a unit of *energy*, not
 * of power, despite having a power unit in its name.
 *
 * So the model reports the same quantity of energy in joules and in kilowatt-hours side by
 * side. A 2 kW heater for 3 hours is 6 kWh and 21 600 000 J, and seeing those two numbers
 * describe the same electricity is the only thing that makes the unit stop being a trick.
 *
 * Covers 0625.4.2.5.1–4.
 */

import type { SimKernel, SimResult, SimSeries } from '@/content/types'

export interface PowerParams extends Record<string, number> {
  /** Supply voltage in volts. */
  voltage: number
  /** Current drawn by the appliance in amps. */
  current: number
  /** How long it runs, in hours. */
  hours: number
  /** Price of electricity in pence per kilowatt-hour. */
  pricePerKwh: number
}

/** Joules in one kilowatt-hour: 1000 W × 3600 s. */
export const JOULES_PER_KWH = 3_600_000

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))

/** Power in watts. */
export function power(voltage: number, current: number): number {
  return voltage * current
}

/** Energy transferred in joules. */
export function energyJoules(voltage: number, current: number, hours: number): number {
  return power(voltage, current) * hours * 3600
}

/**
 * Energy in kilowatt-hours.
 *
 * The unit that looks like a power and is not. A kilowatt-hour is a kilowatt *for an hour* —
 * a rate multiplied by a time, which is an amount.
 */
export function energyKwh(voltage: number, current: number, hours: number): number {
  return (power(voltage, current) / 1000) * hours
}

/** Charge that has flowed, in coulombs. */
export function charge(current: number, hours: number): number {
  return current * hours * 3600
}

const round = (v: number) => Math.round(v * 100) / 100

export const powerKernel: SimKernel<PowerParams, SimResult> = (params) => {
  const v = clamp(params['voltage'] ?? 230, 1, 400)
  const i = clamp(params['current'] ?? 8.7, 0.01, 50)
  const h = clamp(params['hours'] ?? 3, 0.1, 24)
  const price = clamp(params['pricePerKwh'] ?? 28, 1, 100)

  const p = power(v, i)

  const series: SimSeries[] = [
    {
      key: 'energy',
      label: { en: 'Energy transferred against time', zh: '传递的能量随时间的变化' },
      unit: { x: 'time / hours', y: 'energy / kW h' },
      points: Array.from({ length: 49 }, (_, n) => {
        const x = round((n / 48) * 24)
        return [x, round(energyKwh(v, i, x))] as [number, number]
      }),
      xBounds: { min: 0, max: 24 },
      yBounds: { min: 0, max: 60 },
    },
    {
      key: 'cost',
      label: { en: 'Cost against time', zh: '费用随时间的变化' },
      unit: { x: 'time / hours', y: 'cost / pence' },
      points: Array.from({ length: 49 }, (_, n) => {
        const x = round((n / 48) * 24)
        return [x, round(energyKwh(v, i, x) * price)] as [number, number]
      }),
      xBounds: { min: 0, max: 24 },
      yBounds: { min: 0, max: 2000 },
    },
  ]

  return {
    series,
    readouts: {
      power: round(p),
      energyKwh: round(energyKwh(v, i, h)),
      energyJoules: Math.round(energyJoules(v, i, h)),
      cost: round(energyKwh(v, i, h) * price),
    },
    markers: [
      {
        x: 0,
        y: 0,
        label: {
          en: `${round(p / 1000)} kW for ${round(h)} hours is ${round(energyKwh(v, i, h))} kW h — which is ${Math.round(energyJoules(v, i, h)).toLocaleString('en-GB')} J. The same electricity, counted two ways`,
          zh: `${round(p / 1000)} kW 运行 ${round(h)} 小时是 ${round(energyKwh(v, i, h))} kW·h——也就是 ${Math.round(energyJoules(v, i, h)).toLocaleString('en-GB')} J。同样的电能，两种计法`,
        },
      },
    ],
  }
}

export default powerKernel
