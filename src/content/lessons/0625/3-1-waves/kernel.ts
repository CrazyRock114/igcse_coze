/**
 * Wave motion — kernel for lesson 3-1-waves.
 *
 * One kernel serves both wave types, because the physics is the same and only the
 * direction of vibration differs. That is exactly the point students are assessed on,
 * so the code makes it structural rather than incidental: the same displacement
 * function drives a transverse curve and a longitudinal particle spacing.
 *
 * Covers 0625.3.1.1–8 (Core) and 0625.3.1.9–10 (Supplement, qualitatively).
 */

import type { SimBody, SimKernel, SimResult } from '@/content/types'

export interface WaveParams extends Record<string, number> {
  /** Frequency in Hz */
  frequency: number
  /** Wavelength in m */
  wavelength: number
  /** Amplitude in m */
  amplitude: number
  /** 0 = transverse, 1 = longitudinal */
  longitudinal: number
  /** Animation clock, in seconds */
  t: number
}

/** Horizontal extent of the medium shown, in metres. */
export const MEDIUM_LENGTH = 4

const SAMPLES = 160
const PARTICLE_ROWS = 3
const PARTICLES_PER_ROW = 34

/**
 * Displacement of the medium at position x and time t.
 *
 * The wave travels in the +x direction, hence the minus sign: a point further along
 * repeats what an earlier point did, a moment later.
 */
export function displacement(
  x: number,
  t: number,
  amplitude: number,
  wavelength: number,
  frequency: number
): number {
  if (wavelength <= 0) return 0
  return amplitude * Math.sin(2 * Math.PI * (x / wavelength - frequency * t))
}

/** Wave speed from the wave equation. This is the relationship the lesson is built on. */
export function waveSpeed(frequency: number, wavelength: number): number {
  return frequency * wavelength
}

/**
 * Largest longitudinal shift that keeps neighbouring particles in order.
 *
 * Particles displaced along the direction of travel bunch up in the compressions. Push
 * the displacement too far and the pattern inverts — particles overtake their
 * neighbours, drawing a medium that could not exist. The ordering is preserved as long
 * as the peak displacement gradient stays below 1, i.e. shift × 2π/λ < 1. The 0.8
 * factor keeps a margin, so the compressions stay strictly ordered at every amplitude
 * and wavelength the sliders allow.
 *
 * This is honest as well as safe: in a real longitudinal wave the displacement
 * amplitude is a small fraction of the wavelength.
 */
export function maxLongitudinalShift(wavelength: number): number {
  return ((wavelength / (2 * Math.PI)) * 0.8)
}

export const waveKernel: SimKernel<WaveParams, SimResult> = ({
  frequency,
  wavelength,
  amplitude,
  longitudinal,
  t,
}) => {
  const isLongitudinal = longitudinal >= 0.5
  const shift = Math.min(amplitude * 0.45, maxLongitudinalShift(wavelength))

  // The travelling waveform. Drawn for both types: for a longitudinal wave it is the
  // graph of displacement, which is what exam questions plot even though the particles
  // move back and forth rather than up and down.
  const points: Array<[number, number]> = []
  for (let i = 0; i < SAMPLES; i++) {
    const x = (i / (SAMPLES - 1)) * MEDIUM_LENGTH
    points.push([x, displacement(x, t, amplitude, wavelength, frequency)])
  }

  // Medium particles. For a transverse wave they ride up and down; for a longitudinal
  // wave they shift along x, bunching into compressions and spreading into rarefactions.
  const bodies: SimBody[] = []
  for (let row = 0; row < PARTICLE_ROWS; row++) {
    const y0 = ((row + 1) / (PARTICLE_ROWS + 1)) * 2 - 1
    for (let i = 0; i < PARTICLES_PER_ROW; i++) {
      const x0 = (i / (PARTICLES_PER_ROW - 1)) * MEDIUM_LENGTH
      const d = displacement(x0, t, amplitude, wavelength, frequency)
      bodies.push(
        isLongitudinal
          ? // Displacement along the direction of travel, bounded so neighbouring
            // particles crowd together without ever crossing over.
            {
              x: x0 + (amplitude > 0 ? (d / amplitude) * shift : 0),
              y: y0 * 0.55,
              r: 0.04,
              kind: 'medium',
            }
          : { x: x0, y: y0 * 0.25 + d, r: 0.04, kind: 'medium' }
      )
    }
  }

  const speed = waveSpeed(frequency, wavelength)

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
      waveSpeed: speed,
      period: frequency > 0 ? 1 / frequency : 0,
      wavelength,
      amplitude,
      // Number of complete waves visible, so wavelength reads as a countable thing.
      wavesVisible: wavelength > 0 ? MEDIUM_LENGTH / wavelength : 0,
    },
    bounds: { xMin: 0, xMax: MEDIUM_LENGTH, yMin: -1.35, yMax: 1.35 },
  }
}

export default waveKernel
