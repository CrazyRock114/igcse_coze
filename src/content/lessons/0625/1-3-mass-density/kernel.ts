/**
 * Mass, weight and density — kernel for lesson 0625/1-3-mass-density.
 *
 * One object, taken to different places. Mass is a property of the object and does not
 * change; weight is a force and changes with where you are. Students are told this and then
 * asked "what is your weight?" in kilograms for the rest of their lives, so the model keeps
 * both numbers on screen at once and lets the gravitational field strength be the thing that
 * moves.
 *
 * Density then decides floating, and the comparison is with the *fluid* rather than with any
 * absolute figure. A block that sinks in water floats in mercury, and nothing about the block
 * changed — which is the point a single "denser than water" rule cannot make.
 *
 * Covers 0625.1.3.1–5 and 1.4.1–4.
 */

import type { SimKernel, SimResult, SimSeries } from '@/content/types'

export interface DensityParams extends Record<string, number> {
  /** Mass of the object in kg. */
  mass: number
  /** Volume of the object in cm³. */
  volume: number
  /** Gravitational field strength where the object is, in N/kg. */
  gravity: number
  /** Density of the fluid it is placed in, in g/cm³. */
  fluidDensity: number
}

/** Gravitational field strength in N/kg at some familiar places. */
export const FIELD_STRENGTHS = {
  earth: 9.8,
  moon: 1.6,
  jupiter: 24.8,
  freeSpace: 0,
} as const

/** Weight in newtons. */
export function weight(massKg: number, gravity: number): number {
  return massKg * gravity
}

/** Density in g/cm³. */
export function density(massKg: number, volumeCm3: number): number {
  if (volumeCm3 <= 0) return 0
  return (massKg * 1000) / volumeCm3
}

/**
 * Whether the object floats in a fluid of the given density.
 *
 * The comparison is always with the fluid, never with a fixed number. Steel floats on
 * mercury; oak sinks in petrol. "Denser than water" is a special case, not the rule.
 */
export function floats(objectDensity: number, fluidDensity: number): boolean {
  return objectDensity < fluidDensity
}

/** Fraction of the object submerged when it floats, 0 to 1. */
export function submergedFraction(objectDensity: number, fluidDensity: number): number {
  if (fluidDensity <= 0) return 1
  return Math.min(1, objectDensity / fluidDensity)
}

const round = (v: number) => Math.round(v * 1000) / 1000

export const densityKernel: SimKernel<DensityParams, SimResult> = (params) => {
  const mass = Math.min(100, Math.max(0.1, params['mass'] ?? 2))
  const volume = Math.min(5000, Math.max(1, params['volume'] ?? 250))
  const gravity = Math.min(30, Math.max(0, params['gravity'] ?? 9.8))
  const fluid = Math.min(14, Math.max(0.1, params['fluidDensity'] ?? 1))

  const rho = density(mass, volume)

  const series: SimSeries[] = [
    {
      key: 'weight',
      label: { en: 'Weight against gravitational field strength', zh: '重力随重力场强度的变化' },
      unit: { x: 'g / N kg⁻¹', y: 'weight / N' },
      points: Array.from({ length: 31 }, (_, i) => {
        const x = i
        return [x, round(weight(mass, x))] as [number, number]
      }),
      xBounds: { min: 0, max: 30 },
      yBounds: { min: 0, max: 600 },
    },
    {
      key: 'mass',
      label: { en: 'Mass against gravitational field strength', zh: '质量随重力场强度的变化' },
      unit: { x: 'g / N kg⁻¹', y: 'mass / kg' },
      // Deliberately plotted: a flat line is the whole claim. Describing mass as
      // "unchanged" is weaker than showing it beside a line that does change.
      points: Array.from({ length: 31 }, (_, i) => [i, round(mass)] as [number, number]),
      xBounds: { min: 0, max: 30 },
      yBounds: { min: 0, max: 30 },
    },
  ]

  const willFloat = floats(rho, fluid)

  return {
    series,
    readouts: {
      weight: round(weight(mass, gravity)),
      density: round(rho),
      submerged: willFloat ? Math.round(submergedFraction(rho, fluid) * 100) : 100,
      fieldStrength: round(gravity),
    },
    markers: [
      {
        x: 0,
        y: 0,
        label:
          gravity === 0
            ? {
                en: 'In free space the weight is zero, but the mass is unchanged — there is still exactly as much matter there',
                zh: '在自由空间中重力为零，但质量不变——那里的物质一点也没有少',
              }
            : willFloat
              ? {
                  en: `Floats: ${round(rho)} g/cm³ is less dense than the fluid at ${round(fluid)} g/cm³`,
                  zh: `会浮起：${round(rho)} g/cm³ 小于流体的 ${round(fluid)} g/cm³`,
                }
              : {
                  en: `Sinks: ${round(rho)} g/cm³ is denser than the fluid at ${round(fluid)} g/cm³`,
                  zh: `会下沉：${round(rho)} g/cm³ 大于流体的 ${round(fluid)} g/cm³`,
                },
      },
    ],
  }
}

export default densityKernel
