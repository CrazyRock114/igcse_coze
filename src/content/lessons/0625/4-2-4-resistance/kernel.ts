/**
 * Resistance and I–V characteristics — kernel for lesson 4-2-4-resistance.
 *
 * Three components share one kernel, because the point of the topic is the *contrast*:
 * a fixed resistor gives a straight line through the origin, a filament lamp curves as
 * it heats up, and a diode conducts one way only. Putting them behind one selector lets
 * a student flip between them on the same axes.
 *
 * Covers 0625.4.2.4.1–5.
 */

import type { SimKernel, SimResult } from '@/content/types'

export interface ResistanceParams extends Record<string, number> {
  /** 0 = fixed resistor, 1 = filament lamp, 2 = diode */
  component: number
  /** Resistance at room temperature, in Ω */
  resistance: number
  /** Wire length as a multiple of its reference length */
  lengthFactor: number
  /** Wire cross-sectional area as a multiple of its reference area */
  areaFactor: number
}

/** Voltage range plotted, in volts. Symmetric so the diode's blocking direction shows. */
const V_MAX = 6
const SAMPLES = 121

/** Forward voltage a silicon diode needs before it conducts appreciably. */
const DIODE_KNEE = 0.7

/**
 * Resistance of a wire from its geometry.
 *
 * Directly proportional to length, inversely proportional to cross-sectional area —
 * the relationship students must recall (0625.4.2.4.5). A longer wire is a longer
 * obstacle course; a thicker wire is a wider road.
 */
export function wireResistance(base: number, lengthFactor: number, areaFactor: number): number {
  if (areaFactor <= 0) return Infinity
  return (base * lengthFactor) / areaFactor
}

/**
 * Current through a component at a given p.d.
 *
 * - resistor: Ohm's law, so I ∝ V and the graph is a straight line.
 * - filament lamp: the filament heats as current rises, resistance climbs, so the
 *   graph bends over towards the voltage axis.
 * - diode: essentially no current below the knee voltage, then a steep rise; nothing
 *   at all in reverse.
 */
export function currentThrough(component: number, resistance: number, v: number): number {
  if (!Number.isFinite(resistance) || resistance <= 0) return 0

  if (component >= 1.5) {
    // Diode
    if (v <= DIODE_KNEE) return 0
    return (v - DIODE_KNEE) / (resistance * 0.15)
  }

  if (component >= 0.5) {
    // Filament lamp. Resistance rises with the heating effect, which goes as I²R and
    // therefore with |V|; modelled as R(1 + k|V|) so the curve flattens smoothly.
    return v / (resistance * (1 + 0.28 * Math.abs(v)))
  }

  // Fixed resistor
  return v / resistance
}

export const resistanceKernel: SimKernel<ResistanceParams, SimResult> = ({
  component,
  resistance,
  lengthFactor,
  areaFactor,
}) => {
  const effectiveR = wireResistance(resistance, lengthFactor, areaFactor)

  const points: Array<[number, number]> = []
  for (let i = 0; i < SAMPLES; i++) {
    const v = -V_MAX + (i / (SAMPLES - 1)) * 2 * V_MAX
    points.push([v, currentThrough(component, effectiveR, v)])
  }

  // Resistance measured at a working point, the way it is measured in the lab: take a
  // voltmeter and ammeter reading and divide. For the lamp this differs from the
  // room-temperature value, which is the whole lesson.
  const vWork = 4
  const iWork = currentThrough(component, effectiveR, vWork)
  const measuredR = iWork > 0 ? vWork / iWork : Infinity

  return {
    series: [
      {
        key: 'iv',
        label: { en: 'Current against p.d.', zh: '电流–电压特性' },
        unit: { x: 'V', y: 'A' },
        points,
      },
    ],
    readouts: {
      effectiveResistance: effectiveR,
      currentAt4V: iWork,
      measuredResistance: Number.isFinite(measuredR) ? measuredR : 0,
      // Shown so the student sees the lamp's resistance is not a fixed number.
      isOhmic: component < 0.5 ? 1 : 0,
    },
  }
}

export default resistanceKernel
