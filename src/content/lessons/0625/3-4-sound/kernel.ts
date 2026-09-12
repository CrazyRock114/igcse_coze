/**
 * Sound — kernel for lesson 3-4-sound.
 *
 * Reuses the `waves` primitive, because sound *is* a wave and the syllabus wants students
 * to see it as longitudinal: particles vibrating along the direction of travel, bunching
 * into compressions and spreading into rarefactions (0625.3.4.2, 3.4.10).
 *
 * The medium is a parameter, so switching from air to water to steel changes the speed
 * and the wavelength while the frequency — set by the source — stays put. That is the
 * point students most often get backwards.
 *
 * Covers 0625.3.4.1–12.
 */

import type { SimBody, SimKernel, SimResult } from '@/content/types'
import { displacement, MEDIUM_LENGTH } from '../3-1-waves/kernel'

export interface SoundParams extends Record<string, number> {
  /** Frequency of the source, in Hz */
  frequency: number
  /** Index into MEDIA */
  medium: number
  /** Amplitude, as a fraction of the maximum */
  amplitude: number
  /** Distance to a reflecting wall, in m — for the echo calculation */
  wallDistance: number
  /** Animation clock, in seconds */
  t: number
}

/** Speeds are the standard approximate values used in 0625 questions. */
export const MEDIA = [
  { key: 'air', speed: 340, label: 'air' },
  { key: 'water', speed: 1500, label: 'water' },
  { key: 'steel', speed: 5000, label: 'steel' },
] as const

/** Lowest and highest frequencies a healthy young human can hear, in Hz. */
export const AUDIBLE_MIN = 20
export const AUDIBLE_MAX = 20000

/** Ultrasound is sound above the upper limit of human hearing. */
export const ULTRASOUND_THRESHOLD = 20000

const PARTICLE_ROWS = 3
const PARTICLES_PER_ROW = 34

/** Wavelength from the wave equation, rearranged: λ = v / f. */
export function wavelengthFor(speed: number, frequency: number): number {
  if (frequency <= 0) return 0
  return speed / frequency
}

/**
 * Time for an echo to return from a wall.
 *
 * The sound travels there *and back*, so the distance is twice the wall distance — the
 * factor of two is the single most common error in echo questions (0625.3.4.6, 3.4.12).
 */
export function echoTime(distance: number, speed: number): number {
  if (speed <= 0) return 0
  return (2 * distance) / speed
}

/** Whether a frequency lies inside the human audible range. */
export function isAudible(frequency: number): boolean {
  return frequency >= AUDIBLE_MIN && frequency <= AUDIBLE_MAX
}

export const soundKernel: SimKernel<SoundParams, SimResult> = ({
  frequency,
  medium,
  amplitude,
  wallDistance,
  t,
}) => {
  const index = Math.min(MEDIA.length - 1, Math.max(0, Math.round(medium)))
  const speed = MEDIA[index]!.speed
  const trueWavelength = wavelengthFor(speed, frequency)

  // The display shows a fixed number of waves so the pattern stays legible across a huge
  // real range of wavelengths; the readouts carry the true physical values.
  const displayWavelength = MEDIUM_LENGTH / 3
  const displayFrequency = 1

  const points: Array<[number, number]> = []
  for (let i = 0; i < 160; i++) {
    const x = (i / 159) * MEDIUM_LENGTH
    points.push([x, displacement(x, t, amplitude, displayWavelength, displayFrequency)])
  }

  // Longitudinal particles: displaced along the direction of travel, bounded so
  // neighbours crowd together without ever crossing over.
  const shift = Math.min(amplitude * 0.45, (displayWavelength / (2 * Math.PI)) * 0.8)
  const bodies: SimBody[] = []
  for (let row = 0; row < PARTICLE_ROWS; row++) {
    const y0 = ((row + 1) / (PARTICLE_ROWS + 1)) * 2 - 1
    for (let i = 0; i < PARTICLES_PER_ROW; i++) {
      const x0 = (i / (PARTICLES_PER_ROW - 1)) * MEDIUM_LENGTH
      const d = displacement(x0, t, amplitude, displayWavelength, displayFrequency)
      bodies.push({
        x: x0 + (amplitude > 0 ? (d / amplitude) * shift : 0),
        y: y0 * 0.55,
        r: 0.04,
        kind: 'medium',
      })
    }
  }

  return {
    series: [
      {
        key: 'displacement',
        label: { en: 'Displacement', zh: '位移' },
        unit: { x: 'm', y: 'm' },
        points,
      },
    ],
    bodies,
    readouts: {
      speed,
      wavelength: trueWavelength,
      period: frequency > 0 ? 1 / frequency : 0,
      echoTime: echoTime(wallDistance, speed),
      audible: isAudible(frequency) ? 1 : 0,
      ultrasound: frequency > ULTRASOUND_THRESHOLD ? 1 : 0,
    },
    bounds: { xMin: 0, xMax: MEDIUM_LENGTH, yMin: -1.35, yMax: 1.35 },
  }
}

export default soundKernel
