/**
 * Measurement and vectors — kernel for lesson 0625/1-1-measurement.
 *
 * Adding two perpendicular vectors, drawn rather than asserted. Students are taught to reach
 * for Pythagoras without seeing where the right angle comes from; the rectangle in the
 * diagram is the answer, and it is the thing a scale-drawing question is actually testing.
 *
 * The two methods are both reported side by side — the calculated magnitude and the one you
 * would get from a scale drawing measured to the nearest millimetre. They differ, and by how
 * much is the point: a scale drawing is a legitimate method with a limited precision, not a
 * worse version of the calculation.
 *
 * Covers 0625.1.1.7.
 */

import type { SimKernel, SimResult } from '@/content/types'

export interface VectorParams extends Record<string, number> {
  /** First vector, along x. */
  a: number
  /** Second vector, along y and perpendicular to the first. */
  b: number
  /** Millimetres per unit chosen for the scale drawing. */
  scale: number
}

/** Magnitude of the resultant of two perpendicular vectors. */
export function magnitude(a: number, b: number): number {
  return Math.hypot(a, b)
}

/** Angle of the resultant from the first vector, in degrees. */
export function bearing(a: number, b: number): number {
  if (a === 0 && b === 0) return 0
  return (Math.atan2(b, a) * 180) / Math.PI
}

/**
 * What a scale drawing would give, measured to the nearest millimetre.
 *
 * Rounding the drawn length to a whole millimetre and converting back is exactly what a
 * student does with a ruler, and it is why a scale drawing and a calculation rarely agree
 * to more than two significant figures.
 */
export function fromScaleDrawing(a: number, b: number, mmPerUnit: number): number {
  const drawnMm = magnitude(a, b) * mmPerUnit
  return Math.round(drawnMm) / mmPerUnit
}

const round = (v: number) => Math.round(v * 100) / 100

export const vectorKernel: SimKernel<VectorParams, SimResult> = (params) => {
  const a = Math.min(20, Math.max(0, params['a'] ?? 6))
  const b = Math.min(20, Math.max(0, params['b'] ?? 8))
  const scale = Math.min(20, Math.max(1, params['scale'] ?? 10))

  const limit = Math.max(4, Math.ceil(Math.max(a, b, magnitude(a, b)) * 1.15))

  return {
    series: [],
    bodies: [
      { x: a, y: 0, kind: 'component', label: `${round(a)}` },
      { x: 0, y: b, kind: 'component', label: `${round(b)}` },
      { x: a, y: b, kind: 'resultant', label: `${round(magnitude(a, b))}` },
    ],
    bounds: { xMin: 0, xMax: limit, yMin: 0, yMax: limit },
    readouts: {
      resultant: round(magnitude(a, b)),
      angle: round(bearing(a, b)),
      drawn: round(fromScaleDrawing(a, b, scale)),
      difference: round(Math.abs(magnitude(a, b) - fromScaleDrawing(a, b, scale))),
    },
    markers: [
      {
        x: 0,
        y: 0,
        label:
          a === 0 || b === 0
            ? {
                en: 'With one vector zero the resultant is just the other one — there is nothing to add',
                zh: '当其中一个向量为零时，合矢量就是另一个——没有什么需要相加',
              }
            : {
                en: `The resultant is longer than either vector but shorter than their sum: ${round(magnitude(a, b))} against ${round(a + b)}`,
                zh: `合矢量比任一分矢量都长，但短于两者之和：${round(magnitude(a, b))} 对 ${round(a + b)}`,
              },
      },
    ],
  }
}

export default vectorKernel
