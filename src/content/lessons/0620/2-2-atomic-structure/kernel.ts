/**
 * Atomic structure — kernel for lesson 0620/2-2-atomic-structure.
 *
 * Builds an electron shell diagram from the proton number, and lets the mass number and
 * charge vary independently. That separation is the whole point of the topic: change the
 * neutrons and you get an isotope (same element, same chemistry); change the electrons
 * and you get an ion (same element, different charge); change the protons and it is a
 * different element altogether.
 *
 * Shell filling uses the 2, 8, 8, 2 pattern the syllabus expects for the first 20
 * elements — not the full aufbau order, which 0620 does not assess.
 *
 * Covers 0620.2.1.1, 2.2.1–5 and 2.3.1–4.
 */

import type { SimBody, SimKernel, SimResult } from '@/content/types'

export interface AtomParams extends Record<string, number> {
  /** Proton number (atomic number), 1–20 */
  protonNumber: number
  /** Extra neutrons relative to the most common isotope */
  extraNeutrons: number
  /** Charge on the particle: −2 to +3 */
  charge: number
}

/** Shell capacities for the first twenty elements. */
export const SHELL_CAPACITY = [2, 8, 8, 2]

/** Symbols and common neutron counts for the first twenty elements. */
export const ELEMENTS = [
  { symbol: 'H', name: 'Hydrogen', neutrons: 0 },
  { symbol: 'He', name: 'Helium', neutrons: 2 },
  { symbol: 'Li', name: 'Lithium', neutrons: 4 },
  { symbol: 'Be', name: 'Beryllium', neutrons: 5 },
  { symbol: 'B', name: 'Boron', neutrons: 6 },
  { symbol: 'C', name: 'Carbon', neutrons: 6 },
  { symbol: 'N', name: 'Nitrogen', neutrons: 7 },
  { symbol: 'O', name: 'Oxygen', neutrons: 8 },
  { symbol: 'F', name: 'Fluorine', neutrons: 10 },
  { symbol: 'Ne', name: 'Neon', neutrons: 10 },
  { symbol: 'Na', name: 'Sodium', neutrons: 12 },
  { symbol: 'Mg', name: 'Magnesium', neutrons: 12 },
  { symbol: 'Al', name: 'Aluminium', neutrons: 14 },
  { symbol: 'Si', name: 'Silicon', neutrons: 14 },
  { symbol: 'P', name: 'Phosphorus', neutrons: 16 },
  { symbol: 'S', name: 'Sulfur', neutrons: 16 },
  { symbol: 'Cl', name: 'Chlorine', neutrons: 18 },
  { symbol: 'Ar', name: 'Argon', neutrons: 22 },
  { symbol: 'K', name: 'Potassium', neutrons: 20 },
  { symbol: 'Ca', name: 'Calcium', neutrons: 20 },
] as const

/**
 * Electrons per shell, filling innermost first.
 *
 * Returns only the occupied shells, so `[2, 8, 1]` for sodium — the notation students
 * are asked to write (0620.2.2.5).
 */
export function electronConfiguration(electrons: number): number[] {
  const shells: number[] = []
  let remaining = Math.max(0, electrons)

  for (const capacity of SHELL_CAPACITY) {
    if (remaining <= 0) break
    const inShell = Math.min(capacity, remaining)
    shells.push(inShell)
    remaining -= inShell
  }
  return shells
}

/** Electrons in the outermost occupied shell — what determines chemical behaviour. */
export function outerElectrons(electrons: number): number {
  const shells = electronConfiguration(electrons)
  return shells[shells.length - 1] ?? 0
}

/**
 * Group number from the electron configuration.
 *
 * Group equals the number of outer-shell electrons, except for the noble gases, which
 * sit in Group VIII with a full outer shell (0620.8.1.3).
 */
export function groupNumber(electrons: number): number {
  const shells = electronConfiguration(electrons)
  const outer = outerElectrons(electrons)
  const capacity = SHELL_CAPACITY[shells.length - 1] ?? 8
  if (outer === capacity || (shells.length === 1 && outer === 2)) return 8
  return outer
}

/** Period number is the count of occupied shells. */
export function periodNumber(electrons: number): number {
  return electronConfiguration(electrons).length
}

export const atomKernel: SimKernel<AtomParams, SimResult> = ({
  protonNumber,
  extraNeutrons,
  charge,
}) => {
  const z = Math.min(ELEMENTS.length, Math.max(1, Math.round(protonNumber)))
  const element = ELEMENTS[z - 1]!

  const neutrons = Math.max(0, element.neutrons + Math.round(extraNeutrons))
  // A positive ion has lost electrons, so subtract the charge.
  const electrons = Math.max(0, z - Math.round(charge))
  const shells = electronConfiguration(electrons)

  // Electrons placed evenly round each occupied shell, so the diagram is countable.
  const bodies: SimBody[] = []
  shells.forEach((count, shellIndex) => {
    const radius = 0.35 + shellIndex * 0.28
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 - Math.PI / 2
      bodies.push({
        x: radius * Math.cos(angle),
        y: radius * Math.sin(angle),
        r: 0.045,
        kind: shellIndex === shells.length - 1 ? 'outer' : 'inner',
      })
    }
  })

  return {
    series: [],
    bodies,
    readouts: {
      protonNumber: z,
      neutrons,
      electrons,
      massNumber: z + neutrons,
      outerElectrons: outerElectrons(electrons),
      // Group and period are properties of the *element*, so they come from the proton
      // number, not from the ion's electron count. Na⁺ has a neon-like 2,8 arrangement
      // but sodium is still Group I — reporting Group VIII here would teach the wrong
      // thing, and it is the ion's parent element a student is asked to place.
      group: groupNumber(z),
      period: periodNumber(z),
      // Overall charge, so the student can check it equals protons minus electrons.
      netCharge: z - electrons,
      shellCount: shells.length,
    },
    bounds: { xMin: -1.3, xMax: 1.3, yMin: -1.3, yMax: 1.3 },
  }
}

export default atomKernel
