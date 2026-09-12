/**
 * The electromagnetic spectrum — kernel for lesson 3-3-em-spectrum.
 *
 * The spectrum spans about twenty orders of magnitude, so plotting wavelength directly is
 * hopeless. Instead the x axis is log₁₀ of the wavelength, and two things are plotted on
 * it: log₁₀ of the frequency, which falls as a straight line, and the product f λ, which
 * is dead flat at 3.0 × 10⁸ m / s.
 *
 * That flat line is the syllabus point that matters most (0625.3.3.2): radio waves and
 * gamma rays differ enormously in wavelength and frequency, yet travel at exactly the
 * same speed in a vacuum.
 *
 * Covers 0625.3.3.1–10.
 */

import type { SimKernel, SimResult } from '@/content/types'

export interface SpectrumParams extends Record<string, number> {
  /** Index into REGIONS */
  region: number
  /** 0 = product fλ, 1 = frequency against wavelength */
  quantity: number
}

/** Speed of electromagnetic waves in a vacuum, m / s. */
export const C = 3.0e8

export interface Region {
  name: string
  /** Representative wavelength, in metres — a mid-range value for the band. */
  wavelength: number
  uses: string
  danger: string
}

/** Ordered from longest wavelength to shortest, as the syllabus lists them. */
export const REGIONS: Region[] = [
  { name: 'Radio waves', wavelength: 1e3, uses: 'radio and TV, astronomy, RFID', danger: 'no significant hazard at normal intensities' },
  { name: 'Microwaves', wavelength: 1e-2, uses: 'satellite TV, mobile phones, microwave ovens', danger: 'internal heating of body cells' },
  { name: 'Infrared', wavelength: 1e-5, uses: 'grills, remote controls, thermal imaging, optical fibres', danger: 'skin burns' },
  { name: 'Visible light', wavelength: 5e-7, uses: 'vision, photography, illumination', danger: 'damage to the retina at high intensity' },
  { name: 'Ultraviolet', wavelength: 1e-8, uses: 'security marking, detecting fake notes, sterilising water', danger: 'skin cancer and eye damage' },
  { name: 'X-rays', wavelength: 1e-10, uses: 'medical imaging, security scanners', danger: 'mutation or damage to cells' },
  { name: 'Gamma rays', wavelength: 1e-13, uses: 'sterilising food and equipment, cancer treatment', danger: 'mutation or damage to cells' },
]

/** Frequency from wavelength: f = c / λ. */
export function frequencyFor(wavelength: number): number {
  if (wavelength <= 0) return 0
  return C / wavelength
}

export const spectrumKernel: SimKernel<SpectrumParams, SimResult> = ({ region, quantity }) => {
  const index = Math.min(REGIONS.length - 1, Math.max(0, Math.round(region)))
  const chosen = REGIONS[index]!

  const showProduct = quantity < 0.5

  const points: Array<[number, number]> = REGIONS.map((r) => {
    const logLambda = Math.log10(r.wavelength)
    // The product is c for every region — that is the whole point. Log frequency falls
    // linearly against log wavelength, which is the same fact seen from the other side.
    return [logLambda, showProduct ? frequencyFor(r.wavelength) * r.wavelength : Math.log10(frequencyFor(r.wavelength))]
  })

  return {
    series: [
      {
        key: 'spectrum',
        label: showProduct
          ? { en: 'f × λ across the spectrum', zh: '全谱的 f × λ' }
          : { en: 'log frequency against log wavelength', zh: '对数频率–对数波长' },
        unit: { x: 'log₁₀(λ / m)', y: showProduct ? 'm / s' : 'log₁₀(f / Hz)' },
        points,
      },
    ],
    readouts: {
      wavelength: chosen.wavelength,
      frequency: frequencyFor(chosen.wavelength),
      speed: frequencyFor(chosen.wavelength) * chosen.wavelength,
      // Position in the ordered list, so the readout panel can confirm the ordering the
      // student is asked to recall.
      orderFromLongest: index + 1,
      logWavelength: Math.log10(chosen.wavelength),
    },
  }
}

export default spectrumKernel
