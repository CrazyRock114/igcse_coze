/**
 * Group I and Group VII — kernel for lesson 0620/8-2-groups.
 *
 * The two groups the syllabus asks about in detail, put side by side because the thing
 * students get wrong is the direction. Group I gets *more* reactive going down; Group VII
 * gets *less*. Both follow from the same cause — the outer shell moves further from the
 * nucleus — but a metal wants to lose an electron and a halogen wants to gain one, so the
 * same change helps one and hinders the other.
 *
 * So the arrow on the ladder is data, not decoration: it flips when you switch group, and
 * that flip is the lesson.
 *
 * Physical data is measured, not modelled. Melting points and densities are real values,
 * and the trends a student is asked to describe are trends in those numbers.
 *
 * Covers 0620.8.2.1–2 and 8.3.1–4.
 */

import type { Bilingual, SimBody, SimKernel, SimResult, SimSeries } from '@/content/types'

export interface GroupParams extends Record<string, number> {
  /** 0 for Group I, 1 for Group VII */
  group: number
  /** Index into the chosen group's members, most reactive end first in the list */
  element: number
}

export interface GroupMember {
  symbol: string
  name: Bilingual
  /** Melting point in °C. */
  meltingPoint: number
  /** Density in g/cm³, measured at r.t.p. */
  density: number
  appearance: Bilingual
}

export interface Group {
  key: string
  number: number
  label: Bilingual
  /** Members in order down the group. */
  members: GroupMember[]
  /** True when reactivity increases going down the group. */
  moreReactiveDown: boolean
  reason: Bilingual
}

export const GROUPS: Group[] = [
  {
    key: 'alkali',
    number: 1,
    label: { en: 'Group I: the alkali metals', zh: '第 I 主族：碱金属' },
    moreReactiveDown: true,
    reason: {
      en: 'Each one has a single outer electron to lose. Further down, that electron is further from the nucleus and more shielded, so it is lost more easily — and losing it is what reacting means.',
      zh: '它们最外层都只有一个电子要失去。越往下，这个电子离原子核越远、屏蔽越强，因而更容易失去——而失去它正是"反应"的含义。',
    },
    members: [
      {
        symbol: 'Li',
        name: { en: 'lithium', zh: '锂' },
        meltingPoint: 181,
        density: 0.53,
        appearance: {
          en: 'Fizzes steadily on water and floats, giving off hydrogen.',
          zh: '在水面上稳定冒泡并浮着，放出氢气。',
        },
      },
      {
        symbol: 'Na',
        name: { en: 'sodium', zh: '钠' },
        meltingPoint: 98,
        density: 0.97,
        appearance: {
          en: 'Melts into a ball and skims across the surface of the water.',
          zh: '熔成小球并在水面上快速游动。',
        },
      },
      {
        symbol: 'K',
        name: { en: 'potassium', zh: '钾' },
        meltingPoint: 63,
        density: 0.86,
        appearance: {
          en: 'Bursts into a lilac flame on the water. Violent.',
          zh: '在水面上燃起淡紫色火焰。非常剧烈。',
        },
      },
      {
        symbol: 'Rb',
        name: { en: 'rubidium', zh: '铷' },
        meltingPoint: 39,
        density: 1.53,
        appearance: {
          en: 'Explosive on contact with water — never demonstrated in a school.',
          zh: '一接触水就爆炸——学校绝不会演示。',
        },
      },
      {
        symbol: 'Cs',
        name: { en: 'caesium', zh: '铯' },
        meltingPoint: 29,
        density: 1.88,
        appearance: {
          en: 'Explodes violently enough to shatter the container. Melts in your hand — if you could hold it.',
          zh: '爆炸剧烈到能炸碎容器。在手心就会熔化——如果你拿得住的话。',
        },
      },
    ],
  },
  {
    key: 'halogen',
    number: 7,
    label: { en: 'Group VII: the halogens', zh: '第 VII 主族：卤素' },
    moreReactiveDown: false,
    reason: {
      en: 'Each one needs to gain a single electron. Further down, the outer shell is further from the nucleus, so an incoming electron is attracted less strongly and is harder to capture.',
      zh: '它们都需要得到一个电子。越往下，最外层离原子核越远，对外来电子的吸引越弱，因而越难捕获。',
    },
    members: [
      {
        symbol: 'F',
        name: { en: 'fluorine', zh: '氟' },
        meltingPoint: -220,
        density: 0.0017,
        appearance: {
          en: 'A pale yellow gas. So reactive it attacks almost anything it touches.',
          zh: '淡黄色气体。活泼到几乎会侵蚀所接触的一切。',
        },
      },
      {
        symbol: 'Cl',
        name: { en: 'chlorine', zh: '氯' },
        meltingPoint: -101,
        density: 0.0032,
        appearance: {
          en: 'A yellow-green gas at r.t.p. Poisonous, with a sharp smell.',
          zh: '室温常压下为黄绿色气体。有毒，气味刺鼻。',
        },
      },
      {
        symbol: 'Br',
        name: { en: 'bromine', zh: '溴' },
        meltingPoint: -7,
        density: 3.1,
        appearance: {
          en: 'A red-brown liquid at r.t.p., giving off an orange vapour.',
          zh: '室温常压下为红棕色液体，会挥发出橙色蒸气。',
        },
      },
      {
        symbol: 'I',
        name: { en: 'iodine', zh: '碘' },
        meltingPoint: 114,
        density: 4.9,
        appearance: {
          en: 'A grey-black solid at r.t.p. that sublimes to a purple vapour.',
          zh: '室温常压下为灰黑色固体，升华为紫色蒸气。',
        },
      },
    ],
  },
]

/** State at room temperature and pressure, read off the melting point. */
export function stateAtRtp(member: GroupMember): 'solid' | 'liquid' | 'gas' {
  // Boiling points are not tabulated here; the two halogens that are liquid or gas at
  // r.t.p. are distinguished by density, since a gas is three orders of magnitude lighter.
  if (member.meltingPoint > 20) return 'solid'
  return member.density < 0.1 ? 'gas' : 'liquid'
}

/**
 * How many members of the group this one can displace from a solution of its compounds.
 *
 * A halogen displaces every halogen below it, because it holds an electron more tightly.
 * The same logic runs the other way for the alkali metals: a metal lower down displaces
 * those above it, because it gives its electron up more readily.
 */
export function displaces(group: Group, index: number): number {
  return group.moreReactiveDown ? index : group.members.length - 1 - index
}

const PROPERTY_SERIES = (group: Group): SimSeries[] => [
  {
    key: group.key,
    label: {
      en: `${group.label.en} melting point`,
      zh: `${group.label.zh ?? ''}熔点`,
    },
    unit: { x: 'position down the group', y: '°C' },
    points: group.members.map((m, i) => [i + 1, m.meltingPoint] as [number, number]),
    xBounds: { min: 0, max: 5 },
    // Held still across both groups so the two trends are compared on the same scale —
    // one climbing and one falling is the whole point, and a self-scaling axis would hide it.
    yBounds: { min: -250, max: 250 },
  },
  {
    key: 'reference',
    label: {
      en: `${GROUPS.find((g) => g.key !== group.key)!.label.en} for comparison`,
      zh: `${GROUPS.find((g) => g.key !== group.key)!.label.zh ?? ''}对照`,
    },
    unit: { x: 'position down the group', y: '°C' },
    points: GROUPS.find((g) => g.key !== group.key)!.members.map(
      (m, i) => [i + 1, m.meltingPoint] as [number, number]
    ),
    xBounds: { min: 0, max: 5 },
    yBounds: { min: -250, max: 250 },
  },
]

export const groupsKernel: SimKernel<GroupParams, SimResult> = ({ group, element }) => {
  const chosenGroup = GROUPS[Math.min(GROUPS.length - 1, Math.max(0, Math.round(group)))]!
  const index = Math.min(
    chosenGroup.members.length - 1,
    Math.max(0, Math.round(element))
  )
  const member = chosenGroup.members[index]!

  const bodies: SimBody[] = chosenGroup.members.map((m, i) => ({
    x: 0,
    y: -i,
    kind: i === index ? 'selected' : 'rung',
    label: `${m.symbol}|${m.name.en}`,
  }))

  // The line separates what this element can displace from what it cannot.
  const canDisplace = displaces(chosenGroup, index)
  if (canDisplace > 0) {
    bodies.push({
      x: 0,
      y: chosenGroup.moreReactiveDown ? -(index - 0.5) : -(index + 0.5),
      kind: 'threshold',
      label: chosenGroup.moreReactiveDown
        ? 'displaces everything above this line'
        : 'displaces everything below this line',
    })
  }

  bodies.push({
    x: 0,
    y: chosenGroup.moreReactiveDown ? -1 : 1,
    kind: 'axis',
    label: 'more reactive',
  })

  const state = stateAtRtp(member)
  const headline: Bilingual = {
    en: `${member.name.en} — ${state} at r.t.p., melts at ${member.meltingPoint} °C`,
    zh: `${member.name.zh ?? ''}——室温常压下为${
      state === 'solid' ? '固体' : state === 'liquid' ? '液体' : '气体'
    }，熔点 ${member.meltingPoint} °C`,
  }

  const note: Bilingual = {
    en: `${member.appearance.en} ${chosenGroup.reason.en}`,
    zh: `${member.appearance.zh ?? ''} ${chosenGroup.reason.zh ?? ''}`,
  }

  return {
    series: PROPERTY_SERIES(chosenGroup),
    bodies,
    markers: [
      { x: 0, y: 0, label: chosenGroup.label },
      { x: 0, y: 0, label: headline },
      { x: 0, y: 0, label: note },
    ],
    readouts: {
      meltingPoint: member.meltingPoint,
      density: member.density,
      position: index + 1,
      displaces: canDisplace,
    },
  }
}

export default groupsKernel
