/**
 * The mole and reacting masses — kernel for lesson 0620/3-3-moles.
 *
 * A reaction with one reactant added in increasing amounts, and the mass of product plotted
 * against it. The graph rises in a straight line and then goes flat, and the corner is the
 * whole lesson: past that point the other reactant has run out, and adding more of the first
 * one produces nothing at all.
 *
 * Limiting reactants are usually taught as a rule for spotting which number to use in a
 * calculation. The corner turns that back into something physical — the yield stops rising
 * because there is nothing left for the extra reactant to react with. Where the corner sits
 * moves when the amount of the second reactant is changed, which is the check that the idea
 * has landed.
 *
 * The magnesium and oxygen figures are real: 2Mg + O₂ → 2MgO, Ar(Mg) = 24, Mr(O₂) = 32,
 * Mr(MgO) = 40. Every number the readouts report can be checked by hand, which matters in a
 * topic where the whole skill is arithmetic a student is expected to reproduce.
 *
 * Covers 0620.3.2.1–3 and 3.3.1–5.
 */

import type { SimKernel, SimResult, SimSeries } from '@/content/types'
import { relativeMass } from '@/lib/formula'

export interface MolesParams extends Record<string, number> {
  /** Mass of magnesium burnt, in grams. */
  magnesium: number
  /** Mass of oxygen available, in grams. */
  oxygen: number
  /** Volume the product is dissolved in, in cm³ — for the concentration readout. */
  volume: number
}

/** Relative atomic masses, to the precision 0620 uses. */
export const AR: Record<string, number> = { H: 1, C: 12, N: 14, O: 16, Mg: 24, S: 32, Cl: 35.5, Ca: 40 }

/** The Avogadro constant: particles in one mole. */
export const AVOGADRO = 6.02e23
/** Molar gas volume at room temperature and pressure, in dm³. */
export const MOLAR_VOLUME = 24

/** Amount of substance, in moles, from a mass and a relative formula mass. */
export function moles(massGrams: number, mr: number): number {
  if (mr <= 0) return 0
  return massGrams / mr
}

/** Mass from an amount of substance. */
export function massOf(mol: number, mr: number): number {
  return mol * mr
}

/**
 * Which reactant runs out first, and how much product that allows.
 *
 * 2Mg + O₂ → 2MgO. One mole of oxygen serves two moles of magnesium, so the comparison is
 * between the magnesium's moles and twice the oxygen's — the step students most often skip,
 * comparing raw masses or raw moles and getting the wrong reactant.
 */
export function limiting(
  magnesiumMoles: number,
  oxygenMoles: number,
): { limiting: 'magnesium' | 'oxygen' | 'neither'; productMoles: number } {
  const fromMagnesium = magnesiumMoles
  const fromOxygen = oxygenMoles * 2
  if (Math.abs(fromMagnesium - fromOxygen) < 1e-9) {
    return { limiting: 'neither', productMoles: fromMagnesium }
  }
  return fromMagnesium < fromOxygen
    ? { limiting: 'magnesium', productMoles: fromMagnesium }
    : { limiting: 'oxygen', productMoles: fromOxygen }
}

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))
const round = (v: number, dp = 2) => {
  const f = 10 ** dp
  return Math.round(v * f) / f
}

export const molesKernel: SimKernel<MolesParams, SimResult> = (params) => {
  const magnesium = clamp(params['magnesium'] ?? 4.8, 0, 24)
  const oxygen = clamp(params['oxygen'] ?? 3.2, 0, 16)
  const volume = clamp(params['volume'] ?? 250, 50, 1000)

  const mrMg = relativeMass('Mg', AR)
  const mrO2 = relativeMass('O2', AR)
  const mrMgO = relativeMass('MgO', AR)

  const mgMol = moles(magnesium, mrMg)
  const o2Mol = moles(oxygen, mrO2)
  const outcome = limiting(mgMol, o2Mol)
  const productMass = massOf(outcome.productMoles, mrMgO)

  const yieldAt = (mgMass: number) => {
    const r = limiting(moles(mgMass, mrMg), o2Mol)
    return massOf(r.productMoles, mrMgO)
  }

  const series: SimSeries[] = [
    {
      key: 'yield',
      label: {
        en: 'Mass of magnesium oxide made',
        zh: '生成氧化镁的质量',
      },
      unit: { x: 'mass of magnesium burnt / g', y: 'mass of magnesium oxide / g' },
      points: Array.from({ length: 97 }, (_, i) => {
        const x = (24 * i) / 96
        return [round(x), round(yieldAt(x))] as [number, number]
      }),
      xBounds: { min: 0, max: 24 },
    },
  ]

  const concentration = outcome.productMoles / (volume / 1000)

  const limitNote =
    outcome.limiting === 'magnesium'
      ? {
          en: `Magnesium is the limiting reactant: ${round(mgMol, 3)} mol of it against ${round(o2Mol, 3)} mol of oxygen, and the equation 2Mg + O₂ → 2MgO needs two magnesium for every one oxygen. All the magnesium is used up and some oxygen is left over, so adding more oxygen would make no difference at all`,
          zh: `镁是限量反应物：${round(mgMol, 3)} mol 镁对 ${round(o2Mol, 3)} mol 氧，而方程式 2Mg + O₂ → 2MgO 要求每 1 个氧对应 2 个镁。镁全部反应完而氧有剩余，因此再加氧完全不起作用`,
        }
      : outcome.limiting === 'oxygen'
        ? {
            en: `Oxygen is the limiting reactant: ${round(o2Mol, 3)} mol of it serves only ${round(o2Mol * 2, 3)} mol of magnesium, and there is ${round(mgMol, 3)} mol present. This is where the graph goes flat — the extra magnesium has nothing left to burn with, so it simply stays as magnesium`,
            zh: `氧是限量反应物：${round(o2Mol, 3)} mol 氧只能供给 ${round(o2Mol * 2, 3)} mol 镁反应，而现有 ${round(mgMol, 3)} mol 镁。图像正是在这里变平——多余的镁没有可反应的对象，就仍然以镁的形式留下`,
          }
        : {
            en: `Exactly balanced: ${round(mgMol, 3)} mol of magnesium and ${round(o2Mol, 3)} mol of oxygen, in the 2 : 1 ratio the equation demands. Both are used up completely, and this is the corner of the graph`,
            zh: `恰好完全反应：${round(mgMol, 3)} mol 镁与 ${round(o2Mol, 3)} mol 氧，正是方程式要求的 2∶1。两者都恰好消耗完，这就是图像的拐点`,
          }

  const arithmeticNote = {
    en: `${round(magnesium, 2)} g of magnesium is ${round(magnesium, 2)} ÷ 24 = ${round(mgMol, 3)} mol, which is ${round(mgMol * AVOGADRO, 2).toExponential(2)} atoms. The ${round(productMass, 2)} g of magnesium oxide produced is ${round(outcome.productMoles, 3)} mol — mass divided by an Mr of 40. Every number here is one division`,
    zh: `${round(magnesium, 2)} g 镁即 ${round(magnesium, 2)} ÷ 24 = ${round(mgMol, 3)} mol，也就是 ${round(mgMol * AVOGADRO, 2).toExponential(2)} 个原子。生成的 ${round(productMass, 2)} g 氧化镁为 ${round(outcome.productMoles, 3)} mol——质量除以 Mr = 40。这里每个数字都只是一次除法`,
  }

  return {
    series,
    readouts: {
      magnesiumMoles: round(mgMol, 3),
      oxygenMoles: round(o2Mol, 3),
      productMass: round(productMass, 2),
      concentration: round(concentration, 3),
    },
    markers: [
      { x: 0, y: 0, label: limitNote },
      { x: 0, y: 0, label: arithmeticNote },
    ],
  }
}

export default molesKernel
