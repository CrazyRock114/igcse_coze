/**
 * Diffusion and active transport — kernel for lesson 0610/3-1-transport.
 *
 * Two ways across a membrane, and the cleanest way to tell them apart is to plot both
 * against the same two variables and look at where they disagree.
 *
 * Against concentration gradient: diffusion is a straight line through the origin. No
 * gradient, no movement — and if the gradient reverses, so does the flow, because nothing
 * is driving it. Active transport is a flat line: it does not care about the gradient at
 * all, and it keeps going when the gradient is against it, which is the whole reason cells
 * bother with it.
 *
 * Against temperature: diffusion climbs gently and keeps climbing. Active transport climbs,
 * peaks near body temperature and collapses — because it depends on respiration, and
 * respiration depends on enzymes. That collapse is imported from the enzyme lesson rather
 * than modelled again here: it is the same fact about proteins, and two copies of it would
 * be two chances to disagree.
 *
 * Covers 0610.3.1.1–5 and 3.3.1–3.
 */

import type { SimKernel, SimResult, SimSeries } from '@/content/types'
import { temperatureFactor } from '../5-1-enzymes/kernel'

export interface TransportParams extends Record<string, number> {
  /** Concentration difference across the membrane, in arbitrary units. Negative is uphill. */
  gradient: number
  /** Temperature in °C */
  temperature: number
  /** Membrane surface area, relative to a single cell */
  surfaceArea: number
}

/** Respiration peaks near body temperature because its enzymes do. */
export const BODY_TEMPERATURE = 37

/** Rate per unit of gradient, per unit of area, at 37 °C. Sets the scale of the graphs. */
const DIFFUSION_CONSTANT = 0.012
/** What the carrier proteins in one unit of membrane can shift, flat out. */
const CARRIER_CAPACITY = 0.6

/**
 * How much faster particles diffuse as they warm.
 *
 * Kinetic energy only — there is nothing in diffusion that can be destroyed by heat, so
 * unlike active transport this keeps rising all the way up.
 */
export function diffusionTemperatureFactor(temperature: number): number {
  return 1 + (temperature - BODY_TEMPERATURE) / 100
}

/**
 * Net diffusion rate. Proportional to the gradient, so it is zero without one and reverses
 * when the gradient does.
 */
export function diffusionRate(gradient: number, temperature: number, surfaceArea: number): number {
  return DIFFUSION_CONSTANT * gradient * surfaceArea * diffusionTemperatureFactor(temperature)
}

/**
 * Active transport rate.
 *
 * Independent of the gradient — the carriers work at whatever rate respiration can supply
 * energy for, uphill or down. What limits it is how many carrier proteins there are and
 * how fast the cell is respiring.
 */
export function activeTransportRate(temperature: number, surfaceArea: number): number {
  return CARRIER_CAPACITY * surfaceArea * temperatureFactor(temperature, BODY_TEMPERATURE)
}

const round = (v: number): number => Math.round(v * 100) / 100

export const transportKernel: SimKernel<TransportParams, SimResult> = ({
  gradient,
  temperature,
  surfaceArea,
}) => {
  const g = Math.min(100, Math.max(-100, gradient))
  const t = Math.min(60, Math.max(0, temperature))
  const a = Math.min(10, Math.max(1, surfaceArea))

  const byGradient: SimSeries[] = [
    {
      key: 'diffusion-gradient',
      label: { en: 'Diffusion', zh: '扩散' },
      unit: { x: 'concentration gradient', y: 'rate into the cell' },
      points: Array.from({ length: 41 }, (_, i) => {
        const x = -100 + i * 5
        return [x, round(diffusionRate(x, t, a))] as [number, number]
      }),
      xBounds: { min: -100, max: 100 },
      yBounds: { min: -8, max: 8 },
    },
    {
      key: 'active-gradient',
      label: { en: 'Active transport', zh: '主动运输' },
      unit: { x: 'concentration gradient', y: 'rate into the cell' },
      points: Array.from({ length: 41 }, (_, i) => {
        const x = -100 + i * 5
        return [x, round(activeTransportRate(t, a))] as [number, number]
      }),
      xBounds: { min: -100, max: 100 },
      yBounds: { min: -8, max: 8 },
    },
  ]

  const byTemperature: SimSeries[] = [
    {
      key: 'diffusion-temperature',
      label: { en: 'Diffusion', zh: '扩散' },
      unit: { x: 'temperature / °C', y: 'rate at this gradient' },
      points: Array.from({ length: 61 }, (_, x) => [x, round(diffusionRate(g, x, a))] as [number, number]),
      xBounds: { min: 0, max: 60 },
      yBounds: { min: -8, max: 8 },
    },
    {
      key: 'active-temperature',
      label: { en: 'Active transport', zh: '主动运输' },
      unit: { x: 'temperature / °C', y: 'rate at this gradient' },
      points: Array.from({ length: 61 }, (_, x) => [x, round(activeTransportRate(x, a))] as [number, number]),
      xBounds: { min: 0, max: 60 },
      yBounds: { min: -8, max: 8 },
    },
  ]

  return {
    series: [...byGradient, ...byTemperature],
    readouts: {
      diffusionRate: round(diffusionRate(g, t, a)),
      activeTransportRate: round(activeTransportRate(t, a)),
      gradient: g,
      surfaceArea: a,
    },
  }
}

export default transportKernel
