/**
 * The nervous system and the eye — kernel for lesson 0610/14-1-nervous-system.
 *
 * Two things in this topic are quantities rather than facts, and both are reflexes, which
 * is the point: a reflex is a control loop, and you can watch it work.
 *
 * The pupil reflex sets the pupil diameter against the light intensity, and the readouts
 * show what that buys. Not constancy: the pupil runs from 8 mm to 2 mm, so its *area* — and
 * the light admitted — changes by a factor of sixteen and no more. Across a ten-thousandfold
 * change in brightness the retina still sees a several-hundredfold change. The reflex blunts
 * a sudden increase; it does not cancel it, and most of an eye's adjustment to darkness is
 * chemical and neural rather than muscular. A student who leaves thinking the pupil holds
 * the retinal illumination constant has learnt something untrue, so the simulation is built
 * to show the ceiling rather than to imply there is none.
 *
 * Accommodation sets the power the lens must have to focus an object at a given distance.
 * The near point is not an arbitrary number: it is where the lens runs out of power, and
 * the simulation makes that a limit you hit rather than a figure to memorise.
 *
 * One idealisation to be aware of: treating the eye as a single thin lens in air gives a
 * total power near 45 D where a real eye is nearer 60 D, because the inside of the eye is
 * not air. The *change* in power is unaffected, and the change is what accommodation means —
 * 4 D between infinity and a near point of 25 cm, which is the real figure.
 *
 * Covers 0610.14.2.4–6.
 */

import type { SimKernel, SimResult, SimSeries } from '@/content/types'

export interface NervousParams extends Record<string, number> {
  /** Light intensity, as a percentage of full daylight. */
  light: number
  /** Distance to the object being looked at, in cm. */
  distance: number
  /**
   * Whether the iris muscles are working, as a percentage. Some drugs and some injuries
   * stop the reflex, and a pupil that no longer responds is a clinical emergency.
   */
  reflex: number
}

/** Pupil diameter in bright light and in the dark, in mm. */
export const PUPIL_MIN = 2
export const PUPIL_MAX = 8
/** Distance from lens to retina in a human eye, in cm. Fixed — this is why the lens changes. */
export const EYE_LENGTH = 2.2
/** Closest distance a young eye can focus on, in cm. */
export const NEAR_POINT = 25

/**
 * Pupil diameter for a given light intensity.
 *
 * Logarithmic in the intensity, because the range of brightness an eye works over is
 * enormous and a linear response would use up the whole reflex in the first few per cent.
 * At `reflex` = 0 the iris is fixed part-way open and the intensity makes no difference.
 */
export function pupilDiameter(lightPercent: number, reflexPercent = 100): number {
  const light = Math.min(100, Math.max(0.01, lightPercent))
  const working = Math.min(1, Math.max(0, reflexPercent / 100))

  // 0 in the dark, 1 in full daylight.
  const brightness = (Math.log10(light) + 2) / 4
  const responsive = PUPIL_MAX - (PUPIL_MAX - PUPIL_MIN) * brightness
  const fixed = (PUPIL_MAX + PUPIL_MIN) / 2

  return fixed + (responsive - fixed) * working
}

/**
 * Light reaching the retina, in arbitrary units.
 *
 * Proportional to the intensity and to the *area* of the pupil, not its diameter. Halving
 * the diameter quarters the light, which is why so small a movement is worth so much.
 */
export function retinalLight(lightPercent: number, reflexPercent = 100): number {
  const d = pupilDiameter(lightPercent, reflexPercent)
  return Math.min(100, Math.max(0.01, lightPercent)) * Math.PI * (d / 2) ** 2
}

/**
 * Power the lens must have to focus an object `u` cm away onto the retina, in dioptres.
 *
 * From the thin lens equation with the image distance pinned at the length of the eye:
 * `P = 1/v + 1/u`, in metres. The eye cannot move its retina, so `v` is a constant and
 * every change in object distance has to be met by the lens itself.
 */
export function lensPower(distanceCm: number): number {
  const u = Math.max(1, distanceCm) / 100
  return 1 / (EYE_LENGTH / 100) + 1 / u
}

/** The most power the lens of a young eye can produce, set by the near point. */
export const MAX_POWER = lensPower(NEAR_POINT)

export const nervousKernel: SimKernel<NervousParams, SimResult> = (params) => {
  const light = Math.min(100, Math.max(0, params['light'] ?? 50))
  const distance = Math.max(5, params['distance'] ?? 100)
  const reflex = Math.min(100, Math.max(0, params['reflex'] ?? 100))

  // Log-spaced, because that is how the reflex is spaced. Sampling 0–100 evenly would put
  // nearly every point in the bright end and draw the interesting half as one straight line.
  const intensities = Array.from({ length: 61 }, (_, i) => 10 ** (-2 + (i / 60) * 4))

  const series: SimSeries[] = [
    {
      key: 'pupil',
      label: { en: 'Pupil diameter against light intensity', zh: '瞳孔直径随光照强度的变化' },
      unit: { x: 'light intensity / %', y: 'pupil diameter / mm' },
      points: intensities.map((x) => [
        Math.round(x * 100) / 100,
        Math.round(pupilDiameter(x, reflex) * 100) / 100,
      ]),
      xBounds: { min: 0, max: 100 },
      yBounds: { min: 0, max: 10 },
    },
    {
      key: 'lens',
      label: { en: 'Lens power needed against object distance', zh: '所需晶状体屈光力随物距的变化' },
      unit: { x: 'object distance / cm', y: 'lens power / D' },
      // From 15 cm rather than from zero: the power needed rises without limit as the
      // object approaches the eye, so a curve starting any closer leaves the top of the
      // plot and reads as a rendering fault rather than as a physical limit.
      points: Array.from({ length: 60 }, (_, i) => {
        const x = 15 + i * 5
        return [x, Math.round(lensPower(x) * 100) / 100] as [number, number]
      }),
      xBounds: { min: 0, max: 310 },
      // Just wide enough for the whole curve. A 0–60 axis would draw the 4 D the lens
      // actually moves between infinity and the near point as a flat line.
      yBounds: { min: 44, max: 54 },
    },
  ]

  const power = lensPower(distance)

  return {
    series,
    readouts: {
      pupil: Math.round(pupilDiameter(light, reflex) * 100) / 100,
      retina: Math.round(retinalLight(light, reflex) * 10) / 10,
      power: Math.round(power * 100) / 100,
      spare: Math.round((MAX_POWER - power) * 100) / 100,
    },
    markers: [
      {
        x: 0,
        y: 0,
        label:
          distance < NEAR_POINT
            ? { en: 'Closer than the near point — it cannot be focused', zh: '比近点还近——无法聚焦' }
            : reflex < 50
              ? { en: 'The pupil reflex is not working', zh: '瞳孔反射没有起作用' }
              : { en: 'Focused, with the retina protected', zh: '已聚焦，且视网膜受到保护' },
      },
    ],
  }
}

export default nervousKernel
