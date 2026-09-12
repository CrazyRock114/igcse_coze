/**
 * Fossil fuels and fractional distillation — kernel for lesson 0620/11-3-fuels.
 *
 * Boiling point against the number of carbon atoms in the chain, with the fraction that
 * length belongs to named beside it.
 *
 * The fractions are usually met as a list to memorise in order. The graph makes the order
 * inevitable instead: boiling point rises smoothly with chain length, the column is hot at the
 * bottom and cool at the top, so each fraction condenses at the height where the temperature
 * has fallen to its own boiling range. Nothing about the order needs remembering once that is
 * seen — and the same curve explains why the heavy fractions are viscous and hard to ignite.
 *
 * The boiling points are real values for straight-chain alkanes, tabulated and interpolated
 * between. A fraction is a mixture rather than a single compound, so its boiling *range* is
 * what a refinery works with; the curve here is the pure alkane of that length, which is the
 * honest thing to plot and is what makes the trend visible.
 *
 * Covers 0620.11.3.1–5.
 */

import type { Bilingual, SimKernel, SimResult, SimSeries } from '@/content/types'

export interface FuelsParams extends Record<string, number> {
  /** Carbon atoms in the molecule. */
  carbonAtoms: number
}

/** Carbon numbers at which a boiling point is tabulated. */
export const CARBONS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 18, 20, 25, 30, 40] as const
/** Boiling points of the straight-chain alkanes, in °C. */
export const BOILING_POINTS = [
  -162, -89, -42, -0.5, 36, 69, 98, 126, 151, 174, 216, 254, 287, 316, 343, 402, 450, 525,
] as const

export interface Fraction {
  name: Bilingual
  /** Smallest number of carbon atoms in the fraction. */
  from: number
  /** Largest number of carbon atoms in the fraction. */
  to: number
  uses: Bilingual
}

/** The fractions in the order they leave the column, lightest first. */
export const FRACTIONS: Fraction[] = [
  {
    name: { en: 'refinery gas', zh: '炼厂气' },
    from: 1,
    to: 4,
    uses: {
      en: 'bottled gas for heating and cooking',
      zh: '用作加热与烹饪的瓶装燃气',
    },
  },
  {
    name: { en: 'gasoline (petrol)', zh: '汽油' },
    from: 5,
    to: 10,
    uses: { en: 'fuel for cars', zh: '汽车燃料' },
  },
  {
    name: { en: 'naphtha', zh: '石脑油' },
    from: 11,
    to: 12,
    uses: {
      en: 'feedstock for making chemicals and plastics',
      zh: '制造化学品与塑料的原料',
    },
  },
  {
    name: { en: 'kerosene (paraffin)', zh: '煤油' },
    from: 13,
    to: 16,
    uses: { en: 'fuel for aircraft', zh: '航空燃料' },
  },
  {
    name: { en: 'diesel oil (gas oil)', zh: '柴油' },
    from: 17,
    to: 25,
    uses: { en: 'fuel for diesel engines', zh: '柴油发动机燃料' },
  },
  {
    name: { en: 'fuel oil', zh: '燃料油' },
    from: 26,
    to: 34,
    uses: {
      en: 'fuel for ships and for home heating systems',
      zh: '船舶燃料与家庭供暖燃料',
    },
  },
  {
    name: { en: 'lubricating oil and bitumen', zh: '润滑油与沥青' },
    from: 35,
    to: 40,
    uses: {
      en: 'lubricants, waxes and polishes; bitumen for surfacing roads',
      zh: '润滑剂、蜡与抛光剂；沥青用于铺路',
    },
  },
]

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))

/** Boiling point of the straight-chain alkane with a given number of carbons, in °C. */
export function boilingPoint(carbons: number): number {
  const n = clamp(carbons, CARBONS[0], CARBONS[CARBONS.length - 1]!)
  const last = CARBONS.length - 1
  for (let i = 0; i < last; i++) {
    const lo = CARBONS[i]!
    const hi = CARBONS[i + 1]!
    if (n <= hi) {
      const f = (n - lo) / (hi - lo)
      return BOILING_POINTS[i]! + (BOILING_POINTS[i + 1]! - BOILING_POINTS[i]!) * f
    }
  }
  return BOILING_POINTS[last]!
}

/** The fraction a chain of a given length belongs to. */
export function fractionFor(carbons: number): Fraction {
  const n = clamp(Math.round(carbons), 1, 40)
  return FRACTIONS.find((f) => n >= f.from && n <= f.to) ?? FRACTIONS[FRACTIONS.length - 1]!
}

/**
 * How far up the column this fraction is drawn off, as a percentage of the height.
 *
 * The column is hottest at the bottom, so the fraction with the highest boiling point
 * condenses lowest. Reported so the readout and the graph tell the same story.
 */
export function columnHeight(carbons: number): number {
  const bp = boilingPoint(carbons)
  const lowest = BOILING_POINTS[0]!
  const highest = BOILING_POINTS[BOILING_POINTS.length - 1]!
  return ((highest - bp) / (highest - lowest)) * 100
}

const round = (v: number, dp = 1) => {
  const f = 10 ** dp
  return Math.round(v * f) / f
}

export const fuelsKernel: SimKernel<FuelsParams, SimResult> = (params) => {
  const carbons = clamp(Math.round(params['carbonAtoms'] ?? 8), 1, 40)
  const fraction = fractionFor(carbons)
  const bp = boilingPoint(carbons)

  const series: SimSeries[] = [
    {
      key: 'boiling',
      label: {
        en: 'Boiling point against chain length',
        zh: '沸点随碳链长度的变化',
      },
      unit: { x: 'carbon atoms in the chain', y: 'boiling point / °C' },
      points: Array.from({ length: 40 }, (_, i) => {
        const n = i + 1
        return [n, round(boilingPoint(n))] as [number, number]
      }),
      xBounds: { min: 0, max: 40 },
      // Everything whose boiling point is below this line is a gas in the room you are
      // sitting in, which is why the first fraction is bottled and the rest are poured.
      guides: [{ axis: 'y', value: 20, label: 'room temperature' }],
    },
  ]

  const fractionNote: Bilingual = {
    en: `${carbons} carbon atoms boils at ${round(bp)} °C, which puts it in the ${fraction.name.en} fraction — used for ${fraction.uses.en}. It is drawn off about ${round(columnHeight(carbons), 0)}% of the way up the column, because the column is hottest at the bottom and each fraction condenses where the temperature has fallen to its own boiling range`,
    zh: `${carbons} 个碳原子的沸点为 ${round(bp)} °C，属于${fraction.name.zh}馏分——用作${fraction.uses.zh}。它在塔高约 ${round(columnHeight(carbons), 0)}% 处被引出，因为塔底最热，每个馏分在温度降到自身沸程的位置冷凝`,
  }

  const trendNote: Bilingual = {
    en: 'Follow the curve and every property of the fractions follows with it. Longer molecules boil at higher temperatures, are more viscous, are less volatile, ignite less easily and burn with a smokier flame. Shorter molecules are the opposite on every count, which is why petrol is a car fuel and bitumen is a road surface',
    zh: '沿着曲线走，各馏分的每一项性质都随之而来。分子越长，沸点越高、黏度越大、挥发性越低、越不易点燃、燃烧时烟越多。分子越短则每一项都相反，这就是汽油作汽车燃料而沥青用来铺路的原因',
  }

  const whyNote: Bilingual = {
    en: 'The reason is the size of the molecules rather than the strength of their bonds. A longer chain touches its neighbours along more of its length, so the forces between molecules are greater and more energy is needed to pull them apart into a gas. The covalent bonds inside the molecules are not broken by boiling at all',
    zh: '原因在于分子的大小，而不是键的强弱。较长的链与相邻分子接触的长度更大，因此分子间作用力更强，把它们分开变成气体需要更多能量。沸腾根本不会破坏分子内部的共价键',
  }

  return {
    series,
    readouts: {
      carbonAtoms: carbons,
      boilingPoint: round(bp),
      columnHeight: round(columnHeight(carbons), 0),
    },
    markers: [
      { x: 0, y: 0, label: fractionNote },
      { x: 0, y: 0, label: trendNote },
      { x: 0, y: 0, label: whyNote },
    ],
  }
}

export default fuelsKernel
