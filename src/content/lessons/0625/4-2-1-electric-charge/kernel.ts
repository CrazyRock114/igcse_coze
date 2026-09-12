/**
 * Electric charge and electric fields — kernel for lesson 4-2-1-electric-charge.
 *
 * Uses the same field-line integrator as the magnetism lesson, because the geometry is
 * identical — only the sources and the labels differ. Line spacing therefore carries
 * real information here too (0625.4.2.1.10).
 *
 * Parallel plates are modelled as two rows of many small charges rather than as a
 * special case. That is worth the cost: the near-uniform field between them then
 * *emerges* from the charges instead of being asserted, and the fringing at the edges
 * appears on its own — which is exactly why the syllabus excludes end effects.
 *
 * Covers 0625.4.2.1.1–10.
 */

import type { SimKernel, SimResult, SimSeries } from '@/content/types'
import { fieldStrength, ringStarts, traceLine, type Source } from '@/lib/fieldLines'

export interface ElectricParams extends Record<string, number> {
  /** 0 = point charge, 1 = charged sphere, 2 = two unlike charges, 3 = parallel plates */
  setup: number
  /** Number of field lines traced from each positive source */
  lineCount: number
  /** Relative size of the charge */
  charge: number
}

const VIEW_X = 3.1
const VIEW_Y = 2.1

/** Radius of the charged conducting sphere, in view units. */
export const SPHERE_RADIUS = 0.55

/** Charges per plate. Enough that the field between them reads as uniform. */
const PLATE_CHARGES = 14
const PLATE_HALF_WIDTH = 1.5
const PLATE_SEPARATION = 1.1

/**
 * The charge layout for each arrangement.
 *
 * A charged conducting sphere is modelled as a single central charge: outside a uniform
 * sphere the field is identical to that of a point charge at its centre, which is why
 * the two arrangements look the same beyond the surface.
 */
export function chargesFor(setup: number, charge: number): Source[] {
  if (setup >= 2.5) {
    // Parallel plates: a positive row above, a negative row below.
    const per = charge / PLATE_CHARGES
    const plate: Source[] = []
    for (let i = 0; i < PLATE_CHARGES; i++) {
      const x = -PLATE_HALF_WIDTH + (i / (PLATE_CHARGES - 1)) * 2 * PLATE_HALF_WIDTH
      plate.push({ x, y: PLATE_SEPARATION / 2, sign: 1, strength: per })
      plate.push({ x, y: -PLATE_SEPARATION / 2, sign: -1, strength: per })
    }
    return plate
  }
  if (setup >= 1.5) {
    // Two unlike charges.
    return [
      { x: -1.1, y: 0, sign: 1, strength: charge },
      { x: 1.1, y: 0, sign: -1, strength: charge },
    ]
  }
  // A single positive charge, point-like or a sphere.
  return [{ x: 0, y: 0, sign: 1, strength: charge }]
}

export const electricKernel: SimKernel<ElectricParams, SimResult> = ({
  setup,
  lineCount,
  charge,
}) => {
  const sources = chargesFor(setup, charge)
  const n = Math.max(3, Math.round(lineCount))
  const isPlates = setup >= 2.5
  const isSphere = setup >= 0.5 && setup < 1.5

  let series: SimSeries[]

  if (isPlates) {
    // One line from each positive plate charge, running straight down to its partner.
    series = sources
      .filter((s) => s.sign > 0)
      .map((s, i) => ({
        key: `plate-${i}`,
        label: { en: 'Field line', zh: '电场线' },
        unit: { x: '', y: '' },
        points: traceLine(sources, s.x, s.y - 0.08, 1, { bound: 3.4, arriveWithin: 0.1 }),
      }))
  } else {
    // Field lines radiate from the positive charge. For a sphere they are drawn from the
    // surface, since there is no field inside a charged conductor.
    const positive = sources.filter((s) => s.sign > 0)
    series = positive.flatMap((source, si) =>
      ringStarts(source, n, isSphere ? SPHERE_RADIUS + 0.02 : 0.14).map(([sx, sy], i) => ({
        key: `line-${si}-${i}`,
        label: { en: 'Field line', zh: '电场线' },
        unit: { x: '', y: '' },
        points: traceLine(sources, sx, sy, 1),
      }))
    )
  }

  // Sampled where the contrast matters: between the plates the field should be the same
  // at the centre and off to one side, whereas a point charge falls away sharply.
  const near = isPlates ? fieldStrength(sources, 0, 0) : fieldStrength(sources, 0.7, 0)
  const far = isPlates ? fieldStrength(sources, 0.9, 0) : fieldStrength(sources, 2.1, 0)

  return {
    series,
    readouts: {
      strengthNear: near,
      strengthFar: far,
      ratio: far > 0 ? near / far : 0,
      // 1 when the field barely changes across the sampled region — the mark of a
      // uniform field, which is what parallel plates are for.
      isUniform: far > 0 && Math.abs(near / far - 1) < 0.1 ? 1 : 0,
      chargeCount: sources.length,
    },
    bounds: { xMin: -VIEW_X, xMax: VIEW_X, yMin: -VIEW_Y, yMax: VIEW_Y },
  }
}

export default electricKernel
