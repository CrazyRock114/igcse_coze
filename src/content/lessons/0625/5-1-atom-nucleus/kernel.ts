/**
 * The atom and the nucleus — kernel for lesson 0625/5-1-atom-nucleus.
 *
 * The same shell diagram the chemistry course uses, driven from the quantities physics asks
 * about: proton number, neutron number, and the charge on the particle.
 *
 * Three sliders that look interchangeable and are not, which is the point:
 *
 *   - change the protons and it is a different element;
 *   - change the neutrons and it is the same element, a different isotope, and chemically
 *     identical, because chemistry is decided by the electrons;
 *   - change the electrons and it is the same isotope, now an ion, with the nucleus untouched.
 *
 * Students who can recite all three still tend to imagine that adding a neutron changes what
 * something is. Moving the neutron slider and watching the element name refuse to change is
 * worth more than the sentence.
 *
 * The element table is imported from the chemistry lesson rather than duplicated. It is the
 * same twenty elements and the same neutron counts; a second copy would drift.
 *
 * Covers 0625.5.1.1.1–2 and 5.1.2.1–5, 7–8.
 */

import type { SimBody, SimKernel, SimResult } from '@/content/types'
import { ELEMENTS, electronConfiguration } from '@/content/lessons/0620/2-2-atomic-structure/kernel'

export interface NuclideParams extends Record<string, number> {
  /** Proton number Z. */
  protonNumber: number
  /** Neutron number N. */
  neutrons: number
  /** Charge on the particle, in units of e: −2 to +3. */
  charge: number
}

/** Nucleon number A = Z + N. */
export function nucleonNumber(protons: number, neutrons: number): number {
  return protons + neutrons
}

/** Neutron number from the nuclide notation: N = A − Z. */
export function neutronNumber(nucleons: number, protons: number): number {
  return nucleons - protons
}

/**
 * Whether this neutron count is the common isotope of the element.
 *
 * Used only to word the note. Every entry in the table is a real, naturally occurring
 * isotope, so "not the common one" does not mean "does not exist".
 */
export function isCommonIsotope(protons: number, neutrons: number): boolean {
  return ELEMENTS[protons - 1]?.neutrons === neutrons
}

export const nuclideKernel: SimKernel<NuclideParams, SimResult> = (params) => {
  const z = Math.min(ELEMENTS.length, Math.max(1, Math.round(params['protonNumber'] ?? 6)))
  const element = ELEMENTS[z - 1]!
  const n = Math.min(30, Math.max(0, Math.round(params['neutrons'] ?? element.neutrons)))
  const charge = Math.min(3, Math.max(-2, Math.round(params['charge'] ?? 0)))

  const electrons = Math.max(0, z - charge)
  const shells = electronConfiguration(electrons)
  const a = nucleonNumber(z, n)

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

  const common = element.neutrons
  const isotopeNote = isCommonIsotope(z, n)
    ? {
        en: `${element.name}-${a}, the common isotope. Every atom of ${element.name} has ${z} protons — that is what makes it ${element.name}, and nothing else about the atom can change it`,
        zh: `${element.name}-${a}，常见的同位素。每个该元素的原子都有 ${z} 个质子——这正是它之所以是这种元素的原因，原子的其他任何变化都无法改变这一点`,
      }
    : {
        // Deliberately no electron count here. The argument is that adding neutrons leaves
        // the electrons alone, and quoting the current number would be read as a comparison
        // with the common isotope — wrong the moment the particle is also an ion.
        en: `${element.name}-${a}: an isotope with ${n} neutrons instead of the usual ${common}. Same proton number, so it is still ${element.name} and still behaves identically in every chemical reaction — chemistry is decided by the electrons, and adding neutrons does not touch them`,
        zh: `${element.name}-${a}：一种同位素，有 ${n} 个中子而不是通常的 ${common} 个。质子数相同，所以它仍是这种元素，在一切化学反应中的表现也完全相同——化学性质由电子决定，而增加中子并不会影响电子`,
      }

  const chargeNote =
    charge === 0
      ? {
          en: `A neutral atom: ${z} protons and ${electrons} electrons, whose charges cancel exactly. The nucleus itself carries a relative charge of +${z} — one for each proton — and a relative mass of ${a}, one for each nucleon`,
          zh: `中性原子：${z} 个质子与 ${electrons} 个电子，电荷恰好抵消。原子核本身带 +${z} 的相对电荷——每个质子贡献 1——相对质量为 ${a}，每个核子贡献 1`,
        }
      : charge > 0
        ? {
            en: `A positive ion: ${charge} electron${charge === 1 ? '' : 's'} removed, leaving ${electrons} against ${z} protons. Notice what has not changed — the nucleus. Ions are made by moving electrons, never by altering the nucleus, so the relative nuclear charge is still +${z}`,
            zh: `正离子：移走了 ${charge} 个电子，剩下 ${electrons} 个电子对 ${z} 个质子。注意什么没有改变——原子核。离子是通过移动电子形成的，绝不是改变原子核，因此核的相对电荷仍是 +${z}`,
          }
        : {
            en: `A negative ion: ${-charge} extra electron${charge === -1 ? '' : 's'}, giving ${electrons} against ${z} protons. The nucleus is untouched, so this is still ${element.name} — an atom that has gained electrons, not a different element`,
            zh: `负离子：多了 ${-charge} 个电子，共 ${electrons} 个电子对 ${z} 个质子。原子核未受影响，因此它仍是这种元素——一个得到电子的原子，而不是另一种元素`,
          }

  return {
    series: [],
    bodies,
    readouts: {
      protonNumber: z,
      neutrons: n,
      massNumber: a,
      electrons,
      // The relative charge on the *nucleus*, which is +Z whatever the electrons are doing.
      nuclearCharge: z,
      netCharge: z - electrons,
      shellCount: shells.length,
    },
    bounds: { xMin: -1.3, xMax: 1.3, yMin: -1.3, yMax: 1.3 },
    markers: [
      { x: 0, y: 0, label: isotopeNote },
      { x: 0, y: 0, label: chargeNote },
    ],
  }
}

export default nuclideKernel
