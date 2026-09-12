/**
 * Reflection and thin lenses — kernel for lesson 0625/3-2-lenses.
 *
 * A converging lens with the object distance as the parameter, so the image can be watched
 * changing rather than described three times over. The single most useful fact about lens
 * ray diagrams is that everything turns on where the object sits relative to the principal
 * focus, and the way to make that stick is to walk the object across it and see the image
 * flip from real and inverted to virtual and upright.
 *
 * Inside the focal length the rays diverge and never meet, so the image is where they *would*
 * have come from — extrapolated backwards. The model returns a negative image distance there
 * rather than refusing to answer, because that sign is what the word "virtual" means.
 *
 * Covers 0625.3.2.3.1–8.
 */

import type { SimKernel, SimResult, SimSeries } from '@/content/types'

export interface LensParams extends Record<string, number> {
  /** Distance from the object to the lens, in cm. */
  objectDistance: number
  /** Focal length of the converging lens, in cm. */
  focalLength: number
  /** Height of the object, in cm. */
  objectHeight: number
}

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))

/**
 * Image distance from the thin lens equation, 1/f = 1/u + 1/v.
 *
 * Negative when the object is inside the focal length: the refracted rays diverge, so they
 * never meet and the image is found by extrapolating them backwards. Returning a negative
 * number rather than nothing is the whole content of the word "virtual".
 */
export function imageDistance(u: number, f: number): number {
  const denominator = u - f
  if (Math.abs(denominator) < 1e-9) return Infinity
  return (u * f) / denominator
}

/** Magnification: image height over object height, and equal to v over u. */
export function magnification(u: number, f: number): number {
  const v = imageDistance(u, f)
  if (!Number.isFinite(v) || u === 0) return Infinity
  return v / u
}

export type ImageKind = 'real' | 'virtual' | 'none'

export function imageKind(u: number, f: number): ImageKind {
  if (Math.abs(u - f) < 0.5) return 'none'
  return u > f ? 'real' : 'virtual'
}

const round = (v: number) => Math.round(v * 100) / 100

export const lensKernel: SimKernel<LensParams, SimResult> = (params) => {
  const u = clamp(params['objectDistance'] ?? 30, 1, 100)
  const f = clamp(params['focalLength'] ?? 10, 2, 40)
  const h = clamp(params['objectHeight'] ?? 2, 0.5, 10)

  const v = imageDistance(u, f)
  const m = magnification(u, f)
  const kind = imageKind(u, f)

  const series: SimSeries[] = [
    {
      key: 'imageDistance',
      label: { en: 'Image distance against object distance', zh: '像距随物距的变化' },
      unit: { x: 'object distance u / cm', y: 'image distance v / cm' },
      points: Array.from({ length: 99 }, (_, i) => {
        const x = i + 1
        const y = imageDistance(x, f)
        // The asymptote at u = f would otherwise send the line off to infinity and take
        // the axis with it. Clipping keeps the shape readable on both sides of it.
        return [x, Number.isFinite(y) ? clamp(round(y), -120, 120) : 120] as [number, number]
      }),
      xBounds: { min: 0, max: 100 },
      yBounds: { min: -120, max: 120 },
    },
    {
      key: 'magnification',
      label: { en: 'Magnification against object distance', zh: '放大率随物距的变化' },
      unit: { x: 'object distance u / cm', y: 'magnification' },
      points: Array.from({ length: 99 }, (_, i) => {
        const x = i + 1
        const y = magnification(x, f)
        return [x, Number.isFinite(y) ? clamp(round(y), -8, 8) : 8] as [number, number]
      }),
      xBounds: { min: 0, max: 100 },
      yBounds: { min: -8, max: 8 },
    },
  ]

  return {
    series,
    readouts: {
      imageDistance: Number.isFinite(v) ? round(v) : 0,
      magnification: Number.isFinite(m) ? round(Math.abs(m)) : 0,
      imageHeight: Number.isFinite(m) ? round(Math.abs(m) * h) : 0,
      focalPoint: round(f),
    },
    markers: [
      {
        x: 0,
        y: 0,
        label:
          kind === 'none'
            ? {
                en: 'The object is at the principal focus — the refracted rays emerge parallel, so they never meet and no image is formed at all',
                zh: '物体位于焦点上——折射后的光线平行射出，永不相交，因此根本不成像',
              }
            : kind === 'virtual'
              ? {
                  en: `Inside the focal length: the rays diverge, so the image is virtual, upright and magnified ${round(Math.abs(m))} times — this is a magnifying glass`,
                  zh: `位于焦距以内：光线发散，因此成虚像、正立、放大 ${round(Math.abs(m))} 倍——这就是放大镜`,
                }
              : Math.abs(m) > 1
                ? {
                    en: `Real, inverted and magnified ${round(Math.abs(m))} times — between f and 2f, which is the projector arrangement`,
                    zh: `实像、倒立、放大 ${round(Math.abs(m))} 倍——位于 f 与 2f 之间，这是投影仪的配置`,
                  }
                : {
                    en: `Real, inverted and diminished to ${round(Math.abs(m))} of the object — beyond 2f, which is the camera and the eye`,
                    zh: `实像、倒立、缩小为物体的 ${round(Math.abs(m))} 倍——位于 2f 之外，这是照相机和眼睛的情形`,
                  },
      },
    ],
  }
}

export default lensKernel
