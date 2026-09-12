/**
 * Electromagnetic induction and the a.c. generator — kernel for lesson 0625/4-5-induction.
 *
 * A coil turning in a magnetic field, with the induced e.m.f. plotted against the angle turned.
 * The syllabus asks students to sketch and interpret that graph and relate it to the position of
 * the coil, and the thing a static diagram cannot show is *why* the peak is where it is.
 *
 * The induced e.m.f. depends on how fast the coil cuts field lines, not on how many are passing
 * through it. Those two peak in different places, and that is the whole difficulty:
 *
 *   - Plane of the coil at right angles to the field (face-on): the greatest number of field
 *     lines pass through the coil, and yet its sides are momentarily sliding *along* those
 *     lines rather than across them. Nothing is cut, so the e.m.f. is zero.
 *   - Plane of the coil parallel to the field (edge-on): no field lines pass through the coil
 *     at all, and its sides are moving straight across them, cutting fastest. The e.m.f. peaks.
 *
 * So `angle` here is measured from the face-on position, and the e.m.f. is a sine of it.
 *
 * Covers 0625.4.5.1.3 and 4.5.2.2.
 */

import type { SimKernel, SimResult, SimSeries } from '@/content/types'

export interface InductionParams extends Record<string, number> {
  /** Turns on the coil. */
  turns: number
  /** Strength of the magnetic field, in relative units. */
  fieldStrength: number
  /** Rotations per second. */
  frequency: number
  /**
   * Angle of the coil at the instant being inspected, in degrees, measured from the
   * position where the plane of the coil is at right angles to the field.
   */
  angle: number
}

/** Cycles drawn on the graph. */
export const CYCLES = 2

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))

/**
 * Induced e.m.f. at a given angle, in relative units.
 *
 * A sine of the angle, because the e.m.f. follows the rate at which the coil cuts field lines.
 * At 0° the coil is face-on to the field and its sides are momentarily moving along the lines,
 * so it cuts none. At 90° it is edge-on, moving straight across them, and the e.m.f. peaks.
 */
export function emfAt(angleDegrees: number, turns: number, field: number, frequency: number): number {
  const radians = (angleDegrees * Math.PI) / 180
  return turns * field * frequency * Math.sin(radians)
}

/** Peak e.m.f. — the value at 90°, where the cutting is fastest. */
export function peakEmf(turns: number, field: number, frequency: number): number {
  return turns * field * frequency
}

/**
 * How much of the field passes through the coil, as a fraction of the most it ever does.
 *
 * Reported alongside the e.m.f. purely so the two can be seen disagreeing: this is greatest
 * at exactly the angle where the e.m.f. is zero.
 */
export function fluxFraction(angleDegrees: number): number {
  return Math.abs(Math.cos((angleDegrees * Math.PI) / 180))
}

const round = (v: number) => Math.round(v * 100) / 100

export const inductionKernel: SimKernel<InductionParams, SimResult> = (params) => {
  const turns = clamp(params['turns'] ?? 50, 1, 200)
  const field = clamp(params['fieldStrength'] ?? 1, 0, 3)
  const frequency = clamp(params['frequency'] ?? 1, 0, 5)
  const angle = clamp(params['angle'] ?? 90, 0, 360)

  const scale = 0.02
  const series: SimSeries[] = [
    {
      key: 'emf',
      label: { en: 'Induced e.m.f. against coil angle', zh: '感应电动势随线圈转角的变化' },
      unit: { x: 'angle turned / degrees', y: 'e.m.f. / V' },
      points: Array.from({ length: 145 }, (_, i) => {
        const x = (i / 144) * 360 * CYCLES
        return [round(x), round(emfAt(x, turns, field, frequency) * scale)] as [number, number]
      }),
      xBounds: { min: 0, max: 360 * CYCLES },
      // Symmetric about zero, because the e.m.f. genuinely reverses each half turn — an
      // axis starting at zero would hide the alternating part of alternating current.
      yBounds: { min: -25, max: 25 },
    },
  ]

  const now = emfAt(angle, turns, field, frequency) * scale
  const peak = peakEmf(turns, field, frequency) * scale
  const sine = Math.abs(Math.sin((angle * Math.PI) / 180))

  return {
    series,
    readouts: {
      emfNow: round(now),
      peak: round(peak),
      fieldThroughCoil: round(fluxFraction(angle) * 100),
      turns,
    },
    markers: [
      {
        x: 0,
        y: 0,
        label:
          frequency === 0
            ? {
                en: 'The coil is not turning, so no field lines are being cut and no e.m.f. is induced at all — it is the movement that matters, not the field',
                zh: '线圈没有转动，因此没有切割磁感线，也就完全不产生感应电动势——起作用的是运动，而不是磁场本身',
              }
            : sine < 0.08
              ? {
                  en: 'The plane of the coil is at right angles to the field: the greatest number of field lines pass through it, and yet its sides are sliding along those lines rather than across them, so none are cut and the e.m.f. is zero',
                  zh: '线圈平面与磁场垂直：此时穿过它的磁感线最多，然而它的两边是沿着磁感线滑动而不是横切它们，因此不切割磁感线，电动势为零',
                }
              : sine > 0.92
                ? {
                    en: 'The plane of the coil is parallel to the field: no field lines pass through it at all, and its sides are moving straight across them, cutting fastest — this is where the e.m.f. peaks',
                    zh: '线圈平面与磁场平行：此时完全没有磁感线穿过它，而它的两边正垂直横切磁感线，切割最快——这里正是电动势的峰值',
                  }
                : {
                    en: 'Between the two: the coil is cutting lines at some intermediate rate, so the e.m.f. is between zero and its peak',
                    zh: '介于两者之间：线圈以中等速率切割磁感线，因此电动势介于零与峰值之间',
                  },
      },
    ],
  }
}

export default inductionKernel
