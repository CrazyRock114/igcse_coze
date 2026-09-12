/**
 * The Periodic Table — kernel for lesson 0620/8-1-periodic-table.
 *
 * The table is not a list of elements to look things up in; it is a picture of electron
 * arrangement. The period is the number of occupied shells and the group is the number of
 * outer electrons, so an element's address in the table *is* its electronic configuration
 * written another way. Everything else in the topic — why a group behaves alike, what
 * charge an ion carries, why the noble gases do nothing — falls out of that one fact.
 *
 * So the group and period here are not stored: they are computed from the proton number
 * through the shell-filling rule, exactly as a student would work them out. Storing them
 * would let the table and the electron configuration drift apart.
 *
 * Covers 0620.8.1.1–6, 8.4.1–2 and 8.5.1–2.
 */

import type { Bilingual, SimBody, SimKernel, SimResult } from '@/content/types'

export interface PeriodicParams extends Record<string, number> {
  /** Proton number of the element to highlight, 1–36 */
  protonNumber: number
}

export type Category = 'metal' | 'transition' | 'metalloid' | 'nonmetal' | 'noble'

export interface TableElement {
  z: number
  symbol: string
  name: Bilingual
  /** Main group I–VIII, or 0 for the transition block. */
  group: number
  period: number
  category: Category
}

type Row = [number, string, string, string, number, number, Category]

const rows: Row[] = [
  [1, 'H', 'hydrogen', '氢', 1, 1, 'nonmetal'],
  [2, 'He', 'helium', '氦', 8, 1, 'noble'],
  [3, 'Li', 'lithium', '锂', 1, 2, 'metal'],
  [4, 'Be', 'beryllium', '铍', 2, 2, 'metal'],
  [5, 'B', 'boron', '硼', 3, 2, 'metalloid'],
  [6, 'C', 'carbon', '碳', 4, 2, 'nonmetal'],
  [7, 'N', 'nitrogen', '氮', 5, 2, 'nonmetal'],
  [8, 'O', 'oxygen', '氧', 6, 2, 'nonmetal'],
  [9, 'F', 'fluorine', '氟', 7, 2, 'nonmetal'],
  [10, 'Ne', 'neon', '氖', 8, 2, 'noble'],
  [11, 'Na', 'sodium', '钠', 1, 3, 'metal'],
  [12, 'Mg', 'magnesium', '镁', 2, 3, 'metal'],
  [13, 'Al', 'aluminium', '铝', 3, 3, 'metal'],
  [14, 'Si', 'silicon', '硅', 4, 3, 'metalloid'],
  [15, 'P', 'phosphorus', '磷', 5, 3, 'nonmetal'],
  [16, 'S', 'sulfur', '硫', 6, 3, 'nonmetal'],
  [17, 'Cl', 'chlorine', '氯', 7, 3, 'nonmetal'],
  [18, 'Ar', 'argon', '氩', 8, 3, 'noble'],
  [19, 'K', 'potassium', '钾', 1, 4, 'metal'],
  [20, 'Ca', 'calcium', '钙', 2, 4, 'metal'],
  [21, 'Sc', 'scandium', '钪', 0, 4, 'transition'],
  [22, 'Ti', 'titanium', '钛', 0, 4, 'transition'],
  [23, 'V', 'vanadium', '钒', 0, 4, 'transition'],
  [24, 'Cr', 'chromium', '铬', 0, 4, 'transition'],
  [25, 'Mn', 'manganese', '锰', 0, 4, 'transition'],
  [26, 'Fe', 'iron', '铁', 0, 4, 'transition'],
  [27, 'Co', 'cobalt', '钴', 0, 4, 'transition'],
  [28, 'Ni', 'nickel', '镍', 0, 4, 'transition'],
  [29, 'Cu', 'copper', '铜', 0, 4, 'transition'],
  [30, 'Zn', 'zinc', '锌', 0, 4, 'transition'],
  [31, 'Ga', 'gallium', '镓', 3, 4, 'metal'],
  [32, 'Ge', 'germanium', '锗', 4, 4, 'metalloid'],
  [33, 'As', 'arsenic', '砷', 5, 4, 'metalloid'],
  [34, 'Se', 'selenium', '硒', 6, 4, 'nonmetal'],
  [35, 'Br', 'bromine', '溴', 7, 4, 'nonmetal'],
  [36, 'Kr', 'krypton', '氪', 8, 4, 'noble'],
]

/** Periods 1 to 4. Beyond krypton the table needs the f-block, which 0620 does not use. */
export const ELEMENTS: TableElement[] = rows.map(([z, symbol, en, zh, group, period, category]) => ({
  z,
  symbol,
  name: { en, zh },
  group,
  period,
  category,
}))

/** Where the transition block starts, in the eighteen-column layout. */
const TRANSITION_START_COLUMN = 3

/**
 * Column in the eighteen-wide table.
 *
 * Groups I and II sit on the left, the transition block fills the middle, and groups III
 * to VIII are pushed to the right — which is why there is a gap in periods 2 and 3.
 */
export function column(element: TableElement): number {
  if (element.category === 'transition') return TRANSITION_START_COLUMN + (element.z - 21)
  return element.group <= 2 ? element.group : element.group + 10
}

/**
 * Outer-shell electrons.
 *
 * Equal to the group number for the main groups. Helium is the exception the syllabus asks
 * about: it is in Group VIII because its outer shell is full, but that shell holds two.
 */
export function outerElectrons(element: TableElement): number {
  if (element.symbol === 'He') return 2
  return element.group
}

/**
 * Charge on the ion the element forms.
 *
 * Groups I to III lose electrons, groups V to VII gain them, and the number lost or gained
 * is however many it takes to reach a full shell. Group IV would have to move four either
 * way, so it shares instead; the noble gases have no reason to move any.
 */
export function ionCharge(element: TableElement): number {
  if (element.category === 'transition') return 0
  if (element.group <= 3) return element.group
  if (element.group >= 5 && element.group <= 7) return element.group - 8
  return 0
}

const CATEGORY_NOTE: Record<Category, Bilingual> = {
  metal: {
    en: 'A metal: it loses its outer electrons to form a positive ion. Metals are on the left of the table and non-metals on the right, and the change happens as you cross a period.',
    zh: '金属：失去最外层电子形成正离子。金属在表的左侧、非金属在右侧，沿周期横向移动时逐渐变化。',
  },
  transition: {
    en: 'A transition element: a metal, but a dense and hard one with a high melting point. These form coloured compounds, have variable oxidation numbers, and are used as catalysts.',
    zh: '过渡元素：也是金属，但密度大、硬度高、熔点高。它们形成有色化合物，具有可变氧化数，常用作催化剂。',
  },
  metalloid: {
    en: 'On the borderline: it has some properties of a metal and some of a non-metal. The change across a period is gradual, not a sharp line.',
    zh: '处于分界处：兼有金属和非金属的部分性质。跨周期的变化是渐变的，没有一条明确的分界线。',
  },
  nonmetal: {
    en: 'A non-metal: it gains electrons to form a negative ion, or shares them. Non-metals are on the right of the table.',
    zh: '非金属：得到电子形成负离子，或与其他原子共用电子。非金属位于表的右侧。',
  },
  noble: {
    en: 'A noble gas: a full outer shell, so it has nothing to gain by losing, gaining or sharing electrons. That is why they are unreactive, and why they exist as single atoms rather than molecules.',
    zh: '稀有气体：最外层已满，所以失去、得到或共用电子都无利可图。这就是它们不活泼的原因，也是它们以单原子而非分子形式存在的原因。',
  },
}

/**
 * The simple 2, 8, 8, 2 filling rule stops being true after calcium.
 *
 * Beyond it the third shell goes on filling to 18 while the fourth already holds two, so
 * iron is 2,8,14,2 and not the 2,8,8,8 a naive rule would give. 0620 only asks for
 * configurations up to element 20, so this returns nothing past that rather than inventing
 * a number a student might write down.
 */
export const CONFIGURATION_LIMIT = 20

export function shellPattern(z: number): number[] | null {
  if (z > CONFIGURATION_LIMIT) return null
  const capacities = [2, 8, 8, 2]
  const shells: number[] = []
  let remaining = z
  for (const capacity of capacities) {
    if (remaining <= 0) break
    const inShell = Math.min(capacity, remaining)
    shells.push(inShell)
    remaining -= inShell
  }
  return shells
}

/**
 * Occupied shells — which is the period, and is what the table is a picture of.
 *
 * Valid across the whole table drawn here, unlike the configuration itself: the fourth
 * shell starts at potassium either way, so counting shells stays right even where the
 * simple filling rule does not.
 */
export function shellCount(z: number): number {
  if (z <= 2) return 1
  if (z <= 10) return 2
  if (z <= 18) return 3
  return 4
}

export const periodicKernel: SimKernel<PeriodicParams, SimResult> = ({ protonNumber }) => {
  const z = Math.min(ELEMENTS.length, Math.max(1, Math.round(protonNumber)))
  const chosen = ELEMENTS[z - 1]!

  const bodies: SimBody[] = ELEMENTS.map((e) => ({
    x: column(e),
    y: -e.period,
    kind: e.z === z ? 'selected' : e.category,
    label: `${e.z}|${e.symbol}`,
  }))

  const charge = ionCharge(chosen)
  const chargeText =
    charge === 0 ? 'no simple ion' : `${Math.abs(charge)}${charge > 0 ? '+' : '−'} ion`

  const headline: Bilingual = {
    en: `${chosen.symbol} · ${chosen.name.en} — ${
      chosen.group === 0 ? 'transition block' : `Group ${roman(chosen.group)}`
    }, Period ${chosen.period}`,
    zh: `${chosen.symbol} · ${chosen.name.zh ?? ''} —— ${
      chosen.group === 0 ? '过渡元素区' : `第 ${roman(chosen.group)} 主族`
    }，第 ${chosen.period} 周期`,
  }

  const pattern = shellPattern(z)
  const address: Bilingual = pattern
    ? {
        en: `${pattern.join(',')} — ${pattern.length} shells, so Period ${chosen.period}; ${outerElectrons(chosen)} in the outer shell, so Group ${roman(chosen.group)}. Forms ${chargeText}.`,
        zh: `${pattern.join(',')}——共 ${pattern.length} 层，所以是第 ${chosen.period} 周期；最外层 ${outerElectrons(chosen)} 个电子，所以是第 ${roman(chosen.group)} 主族。`,
      }
    : {
        en: `${shellCount(z)} occupied shells, so Period ${chosen.period}. Past calcium the simple 2,8,8,2 rule stops holding, and 0620 does not ask for configurations beyond element 20.`,
        zh: `共有 ${shellCount(z)} 个已占据的电子层，所以是第 ${chosen.period} 周期。钙之后简单的 2,8,8,2 规则不再成立，0620 也不要求写出 20 号元素之后的电子排布。`,
      }

  const note: Bilingual = {
    en: `${address.en} ${CATEGORY_NOTE[chosen.category].en}`,
    zh: `${address.zh ?? ''} ${CATEGORY_NOTE[chosen.category].zh ?? ''}`,
  }

  return {
    series: [],
    bodies,
    markers: [
      { x: 0, y: 0, label: { en: chosen.name.en, zh: chosen.name.zh ?? '' } },
      { x: 0, y: 0, label: headline },
      { x: 0, y: 0, label: note },
    ],
    readouts: {
      protonNumber: z,
      group: chosen.group,
      period: chosen.period,
      ionCharge: charge,
    },
  }
}

/** The syllabus writes group numbers as Roman numerals. */
export function roman(n: number): string {
  return ['0', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'][n] ?? String(n)
}

export default periodicKernel
