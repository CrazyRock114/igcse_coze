/**
 * The reactivity series — kernel for lesson 0620/9-4-reactivity-series.
 *
 * The series is a list, and a list on its own is something to memorise rather than
 * understand. What turns it into a tool is the idea of a threshold: for any given reagent
 * there is a line drawn across the series, and every metal above that line reacts while
 * every metal below it does not. So this kernel puts a metal and a reagent together and
 * reports which side of the line the metal falls on, along with what you would actually
 * see in the tube.
 *
 * Carbon and hydrogen sit in the list too. Neither is a metal and neither can be chosen,
 * but the whole of extraction and the whole of acid reactions are read off their
 * positions, so leaving them out would hide the two most useful landmarks on it.
 *
 * Covers 0620.9.1.1–2 and 9.4.1–5.
 */

import type { Bilingual, SimBody, SimKernel, SimResult } from '@/content/types'

export interface ReactivityParams extends Record<string, number> {
  /** Index into METALS */
  metal: number
  /** Index into REAGENTS */
  reagent: number
}

export interface Element {
  symbol: string
  name: Bilingual
  /** Carbon and hydrogen are landmarks on the series, not metals to test. */
  isMetal: boolean
}

/**
 * Most reactive first. Positions are 1-based in everything a student sees, because
 * "potassium is first" is how the series is quoted.
 */
export const SERIES: Element[] = [
  { symbol: 'K', name: { en: 'potassium', zh: '钾' }, isMetal: true },
  { symbol: 'Na', name: { en: 'sodium', zh: '钠' }, isMetal: true },
  { symbol: 'Ca', name: { en: 'calcium', zh: '钙' }, isMetal: true },
  { symbol: 'Mg', name: { en: 'magnesium', zh: '镁' }, isMetal: true },
  { symbol: 'Al', name: { en: 'aluminium', zh: '铝' }, isMetal: true },
  { symbol: 'C', name: { en: 'carbon', zh: '碳' }, isMetal: false },
  { symbol: 'Zn', name: { en: 'zinc', zh: '锌' }, isMetal: true },
  { symbol: 'Fe', name: { en: 'iron', zh: '铁' }, isMetal: true },
  { symbol: 'H', name: { en: 'hydrogen', zh: '氢' }, isMetal: false },
  { symbol: 'Cu', name: { en: 'copper', zh: '铜' }, isMetal: true },
  { symbol: 'Ag', name: { en: 'silver', zh: '银' }, isMetal: true },
  { symbol: 'Au', name: { en: 'gold', zh: '金' }, isMetal: true },
]

/** Indices into SERIES of the entries a student can pick. */
export const METALS: number[] = SERIES.map((e, i) => (e.isMetal ? i : -1)).filter((i) => i >= 0)

interface Band {
  /** Applies to metals at this index in SERIES or above it. */
  upTo: number
  observation: Bilingual
}

export interface Reagent {
  key: string
  label: Bilingual
  /** Last index in SERIES that reacts. Everything past it is untouched. */
  threshold: number
  /** Checked in order; the first band the metal falls into wins. */
  bands: Band[]
  noReaction: Bilingual
  products: Bilingual
}

export const REAGENTS: Reagent[] = [
  {
    key: 'water',
    label: { en: 'Cold water', zh: '冷水' },
    threshold: 3,
    bands: [
      {
        upTo: 1,
        observation: {
          en: 'Violent. The metal melts, skims across the surface and the hydrogen given off catches fire.',
          zh: '非常剧烈。金属熔化并在水面上四处游动，放出的氢气会燃烧起来。',
        },
      },
      {
        upTo: 2,
        observation: {
          en: 'A steady stream of bubbles. The metal sinks, then rises as bubbles collect on it.',
          zh: '持续冒出气泡。金属先下沉，气泡附着后又浮起。',
        },
      },
      {
        upTo: 3,
        observation: {
          en: 'Extremely slow — only a few bubbles after several days. This is why magnesium is tested with steam instead.',
          zh: '极其缓慢——放置几天才有少量气泡。所以镁改用水蒸气来检验。',
        },
      },
    ],
    noReaction: { en: 'No reaction, however long you leave it.', zh: '无论放多久都不反应。' },
    products: { en: 'metal hydroxide + hydrogen', zh: '金属氢氧化物 + 氢气' },
  },
  {
    key: 'steam',
    label: { en: 'Steam', zh: '水蒸气' },
    threshold: 7,
    bands: [
      {
        upTo: 2,
        observation: {
          en: 'Far too violent to attempt. These metals react with cold water already, so nobody heats them with steam.',
          zh: '过于剧烈，不可尝试。这些金属遇冷水就已反应，没人会用水蒸气去加热它们。',
        },
      },
      {
        upTo: 4,
        observation: {
          en: 'Burns with a brilliant white flame, leaving a white oxide. The hydrogen produced can be collected and ignited.',
          zh: '发出耀眼白光燃烧，留下白色氧化物。产生的氢气可以收集并点燃。',
        },
      },
      {
        upTo: 7,
        observation: {
          en: 'Reacts when heated strongly, giving the oxide and hydrogen. Iron needs continuous heating to keep going.',
          zh: '强热时反应，生成氧化物和氢气。铁需要持续加热才能继续反应。',
        },
      },
    ],
    noReaction: { en: 'No reaction, even when heated red hot in steam.', zh: '即使在水蒸气中烧至红热也不反应。' },
    products: { en: 'metal oxide + hydrogen', zh: '金属氧化物 + 氢气' },
  },
  {
    key: 'acid',
    label: { en: 'Dilute hydrochloric acid', zh: '稀盐酸' },
    threshold: 7,
    bands: [
      {
        upTo: 2,
        observation: {
          en: 'Dangerously violent — never done in a school laboratory.',
          zh: '危险且极其剧烈——学校实验室绝不进行。',
        },
      },
      {
        upTo: 4,
        observation: {
          en: 'Vigorous fizzing. Hydrogen comes off fast enough to give a squeaky pop straight away.',
          zh: '剧烈冒泡。氢气放出很快，立刻就能听到爆鸣声。',
        },
      },
      {
        upTo: 7,
        observation: {
          en: 'Steady fizzing, slower as you go down the series. Iron is slow enough to watch comfortably.',
          zh: '稳定冒泡，越往下越慢。铁的反应慢到可以从容观察。',
        },
      },
    ],
    noReaction: {
      en: 'No reaction. These metals sit below hydrogen, so they cannot displace it from an acid.',
      zh: '不反应。这些金属排在氢之下，无法把氢从酸中置换出来。',
    },
    products: { en: 'salt + hydrogen', zh: '盐 + 氢气' },
  },
  {
    key: 'silver-nitrate',
    label: { en: 'Silver nitrate solution', zh: '硝酸银溶液' },
    threshold: 9,
    bands: [
      {
        upTo: 7,
        observation: {
          en: 'Needles of silver grow on the metal within minutes as it is pushed out of solution.',
          zh: '几分钟内金属表面就长出银针状结晶，银被从溶液中置换出来。',
        },
      },
      {
        upTo: 9,
        observation: {
          en: 'A silver "tree" grows on the copper and the solution turns blue as copper ions enter it.',
          zh: '铜上长出银"树"，同时铜离子进入溶液使其变蓝。',
        },
      },
    ],
    noReaction: {
      en: 'No reaction. A metal can only displace one below it in the series.',
      zh: '不反应。金属只能置换活动性顺序中排在它之下的金属。',
    },
    products: { en: 'metal nitrate + silver', zh: '金属硝酸盐 + 银' },
  },
]

/** Whether the metal at `index` in SERIES is attacked by this reagent. */
export function reacts(index: number, reagent: Reagent): boolean {
  return index <= reagent.threshold
}

/** What you would see in the tube. */
export function observation(index: number, reagent: Reagent): Bilingual {
  if (!reacts(index, reagent)) return reagent.noReaction
  const band = reagent.bands.find((b) => index <= b.upTo)
  return band?.observation ?? reagent.noReaction
}

/** How many of the four reagents attack this metal — a direct measure of how reactive it is. */
export function reactionCount(index: number): number {
  return REAGENTS.filter((r) => reacts(index, r)).length
}

/**
 * Aluminium is the exception the syllabus asks about by name: it sits high in the series
 * but behaves as if it sat low, because an oxide layer forms the instant it meets air.
 */
export const ALUMINIUM_INDEX = SERIES.findIndex((e) => e.symbol === 'Al')

export const reactivityKernel: SimKernel<ReactivityParams, SimResult> = ({ metal, reagent }) => {
  const chosenMetal = METALS[Math.min(METALS.length - 1, Math.max(0, Math.round(metal)))]!
  const chosenReagent = REAGENTS[Math.min(REAGENTS.length - 1, Math.max(0, Math.round(reagent)))]!
  const element = SERIES[chosenMetal]!
  const willReact = reacts(chosenMetal, chosenReagent)

  // The ladder runs down the page, most reactive at the top.
  const bodies: SimBody[] = SERIES.map((e, i) => ({
    x: 0,
    y: -i,
    kind: i === chosenMetal ? 'selected' : e.isMetal ? 'rung' : 'reference',
    // Symbol, name and an optional aside, split by the renderer. Both the symbol and the
    // name are wanted: the symbol is how the series is written down, the name is how it is
    // said. The aside marks the two entries that are landmarks rather than metals.
    label: `${e.symbol}|${e.name.en}${e.isMetal ? '' : '|not a metal'}`,
  }))

  // The line sits in the gap between the last metal that reacts and the first that does not.
  bodies.push({
    x: 0,
    y: -(chosenReagent.threshold + 0.5),
    kind: 'threshold',
    label: 'above this line: reacts',
  })

  const headline: Bilingual = willReact
    ? {
        en: `${element.name.en} + ${chosenReagent.label.en.toLowerCase()} → ${chosenReagent.products.en}`,
        zh: `${element.name.zh ?? ''} + ${chosenReagent.label.zh ?? ''} → ${chosenReagent.products.zh ?? ''}`,
      }
    : {
        en: `${element.name.en} + ${chosenReagent.label.en.toLowerCase()} → no reaction`,
        zh: `${element.name.zh ?? ''} + ${chosenReagent.label.zh ?? ''} → 不反应`,
      }

  const seen = observation(chosenMetal, chosenReagent)
  const note: Bilingual =
    chosenMetal === ALUMINIUM_INDEX
      ? {
          en: `${seen.en} In practice a tough oxide layer forms on aluminium the moment it meets air, so it behaves as though it sat much lower in the series.`,
          zh: `${seen.zh ?? ''} 实际上铝一接触空气就生成致密氧化膜，所以它表现得像排在活动性顺序中低得多的位置。`,
        }
      : seen

  return {
    series: [],
    bodies,
    markers: [
      // [0] names what is being tested; [1] is the equation line and [2] the observation.
      {
        x: 0,
        y: 0,
        label: {
          en: `${element.name.en} with ${chosenReagent.label.en.toLowerCase()}`,
          zh: `${element.name.zh ?? ''}与${chosenReagent.label.zh ?? ''}`,
        },
      },
      { x: 0, y: 0, label: headline },
      { x: 0, y: 0, label: note },
    ],
    readouts: {
      position: chosenMetal + 1,
      reactionsOutOf4: reactionCount(chosenMetal),
      lastPositionThatReacts: chosenReagent.threshold + 1,
      metalsThatReact: METALS.filter((i) => reacts(i, chosenReagent)).length,
    },
  }
}

export default reactivityKernel
