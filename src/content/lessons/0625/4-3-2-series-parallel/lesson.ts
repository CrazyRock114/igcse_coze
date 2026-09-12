import type { Lesson } from '@/content/types'
import { formatSigFigs } from '@/lib/units'
import narration from './narration'

const lesson: Lesson = {
  slug: '4-3-2-series-parallel',
  subject: '0625',
  syllabus: [
    '0625.4.3.2.1',
    '0625.4.3.2.2',
    '0625.4.3.2.3',
    '0625.4.3.2.4',
    '0625.4.3.2.5',
    '0625.4.3.2.6',
    '0625.4.3.2.7',
    '0625.4.3.2.8',
    '0625.4.3.2.9',
    '0625.4.3.2.10',
    '0625.4.2.2.2',
    '0625.4.2.3.5',
  ],
  tier: 'extended',
  estimatedMinutes: 55,

  title: { en: 'Series and parallel circuits', zh: '串联与并联电路' },
  summary: {
    en: 'Switch a circuit between series and parallel and watch the charge flow change. Current rules, p.d. rules and combined resistance, all on one diagram.',
    zh: '在串联与并联之间切换，观察电荷流动的变化。电流规律、电压规律与总电阻，都在同一张电路图上。',
  },

  objectives: [
    { en: 'Know that the current is the same at every point in a series circuit.', zh: '知道串联电路各处电流相同。' },
    { en: 'Construct and use series and parallel circuits.', zh: '会连接并使用串联与并联电路。' },
    { en: 'Calculate the combined e.m.f. of sources in series.', zh: '计算串联电源的总电动势。' },
    { en: 'Calculate the combined resistance of resistors in series.', zh: '计算串联电阻的总电阻。' },
    {
      en: 'State that the supply current is larger than the current in each parallel branch.',
      zh: '说明干路电流大于各并联支路电流。',
    },
    {
      en: 'State that two resistors in parallel combine to less than either alone.',
      zh: '说明两并联电阻的总电阻小于任一支路。',
    },
    { en: 'State the advantages of connecting lamps in parallel.', zh: '说明灯泡并联的优点。' },
    {
      en: 'Place an ammeter in series and a voltmeter in parallel with the component measured.',
      zh: '把电流表串联、电压表并联在被测元件两端。',
    },
    {
      en: 'Use the junction and p.d. rules in calculations. (Extended)',
      zh: '在计算中使用节点电流与电压关系。（Extended）',
    },
    {
      en: 'Calculate the combined resistance of two resistors in parallel. (Extended)',
      zh: '计算两并联电阻的总电阻。（Extended）',
    },
  ],

  glossary: [
    {
      en: 'series',
      zh: '串联',
      definition: {
        en: 'Components connected one after another, so there is a single path for the current.',
        zh: '元件依次相连，电流只有一条路径。',
      },
      syllabus: ['0625.4.3.2.1'],
    },
    {
      en: 'parallel',
      zh: '并联',
      definition: {
        en: 'Components connected across the same two points, so the current has a choice of paths.',
        zh: '元件接在同两点之间，电流有多条路径可选。',
      },
      syllabus: ['0625.4.3.2.5'],
    },
    {
      en: 'junction',
      zh: '节点',
      definition: {
        en: 'A point where wires meet and current divides or recombines. The current in equals the current out.',
        zh: '导线交汇、电流分流或汇合的点。流入等于流出。',
      },
      syllabus: ['0625.4.3.2.9'],
    },
    {
      en: 'potential difference',
      zh: '电势差',
      definition: {
        en: 'The work done per unit charge passing through a component, measured in volts. Often called p.d. or voltage.',
        zh: '单位电荷通过元件时所做的功，单位伏特。也叫电压。',
      },
      syllabus: ['0625.4.2.3.5'],
    },
    {
      en: 'ammeter',
      zh: '电流表',
      definition: {
        en: 'Measures current. Connected in series, in the wire, because the current must pass through it.',
        zh: '测电流。串联接在导线中，因为电流必须穿过它。',
      },
      syllabus: ['0625.4.2.2.2'],
    },
    {
      en: 'voltmeter',
      zh: '电压表',
      definition: {
        en: 'Measures p.d. Connected in parallel, across the component, because it compares two points.',
        zh: '测电压。并联接在元件两端，因为它比较的是两点之间。',
      },
      syllabus: ['0625.4.2.3.5'],
    },
  ],

  equations: [
    {
      latex: 'R = \\frac{V}{I}',
      meaning: {
        en: 'Resistance is the p.d. across a component divided by the current through it.',
        zh: '电阻等于元件两端的电压除以通过它的电流。',
      },
    },
    {
      latex: 'R_{\\text{series}} = R_1 + R_2',
      meaning: {
        en: 'In series the resistances simply add — the total is always larger than either one.',
        zh: '串联时电阻直接相加——总电阻总是大于任一个。',
      },
    },
    {
      latex: '\\frac{1}{R_{\\text{parallel}}} = \\frac{1}{R_1} + \\frac{1}{R_2}',
      meaning: {
        en: 'In parallel the reciprocals add, so the total is always smaller than either one.',
        zh: '并联时倒数相加，所以总电阻总是小于任一个。',
      },
      // States the rule that applies to the topology currently on screen — in parallel
      // the branch currents sum to the supply current; in series the p.d.s sum to the
      // e.m.f. Showing both at once would bury the one that matters.
      substitute: (r) => {
        const total = formatSigFigs(r['totalResistance'] ?? 0, 3)
        if (r['isParallel'] === 1) {
          const currents = formatSigFigs(r['sumOfCurrents'] ?? 0, 3)
          return `R_{\\text{total}} = ${total}\\ \\Omega,\\quad I_1 + I_2 = ${currents}\\ \\text{A} = I_{\\text{supply}}`
        }
        const pds = formatSigFigs(r['sumOfPds'] ?? 0, 3)
        const supply = formatSigFigs(r['supplyCurrent'] ?? 0, 3)
        return `R_{\\text{total}} = ${total}\\ \\Omega,\\quad V_1 + V_2 = ${pds}\\ \\text{V},\\quad I = ${supply}\\ \\text{A}`
      },
    },
  ],

  sim: {
    primitive: 'circuit',
    kernel: '4-3-2-series-parallel',
    animate: { param: 't', speed: 1, loop: 60 },
    hint: {
      en: 'Switch between series and parallel and watch the dots — in parallel the main wire carries more of them than either branch.',
      zh: '在串联与并联之间切换，注意蓝点——并联时主干线上的点比任一支路都多。',
    },
    params: [
      {
        key: 'parallel',
        label: { en: 'Circuit type', zh: '电路类型' },
        unit: '',
        min: 0,
        max: 1,
        step: 1,
        default: 0,
        options: [
          { value: 0, label: { en: 'Series', zh: '串联' } },
          { value: 1, label: { en: 'Parallel', zh: '并联' } },
        ],
      },
      {
        key: 'emf',
        label: { en: 'Supply e.m.f.', zh: '电源电动势' },
        unit: 'V',
        symbol: 'E',
        min: 1,
        max: 12,
        step: 0.5,
        default: 12,
      },
      {
        key: 'r1',
        label: { en: 'Resistance R₁', zh: '电阻 R₁' },
        unit: 'Ω',
        symbol: 'R_1',
        min: 5,
        max: 100,
        step: 5,
        default: 20,
      },
      {
        key: 'r2',
        label: { en: 'Resistance R₂', zh: '电阻 R₂' },
        unit: 'Ω',
        symbol: 'R_2',
        min: 5,
        max: 100,
        step: 5,
        default: 40,
      },
      {
        key: 't',
        label: { en: 'Time', zh: '时间' },
        unit: 's',
        min: 0,
        max: 60,
        step: 0.01,
        default: 0,
        hidden: true,
      },
    ],
    readouts: [
      {
        key: 'totalResistance',
        label: { en: 'Total resistance', zh: '总电阻' },
        unit: 'Ω',
        sigFigs: 3,
      },
      {
        key: 'supplyCurrent',
        label: { en: 'Supply current', zh: '干路电流' },
        unit: 'A',
        symbol: 'I',
        sigFigs: 3,
      },
      { key: 'sumOfPds', label: { en: 'V₁ + V₂', zh: 'V₁ + V₂' }, unit: 'V', sigFigs: 3 },
      { key: 'sumOfCurrents', label: { en: 'I₁ + I₂', zh: 'I₁ + I₂' }, unit: 'A', sigFigs: 3 },
    ],
    presets: [
      {
        label: { en: 'Series 20 Ω + 40 Ω', zh: '串联 20 Ω + 40 Ω' },
        params: { parallel: 0, emf: 12, r1: 20, r2: 40 },
      },
      {
        label: { en: 'Same pair in parallel', zh: '同一对并联' },
        params: { parallel: 1, emf: 12, r1: 20, r2: 40 },
      },
      {
        label: { en: 'Two equal resistors', zh: '两个相等电阻' },
        params: { parallel: 1, emf: 12, r1: 20, r2: 20 },
      },
      {
        label: { en: 'Very unequal branches', zh: '两支路差别极大' },
        params: { parallel: 1, emf: 12, r1: 5, r2: 100 },
      },
    ],
  },

  narration,

  checkpoints: [
    {
      id: '4-3-2-cp1',
      syllabus: ['0625.4.3.2.1'],
      tier: 'core',
      commandWord: 'State',
      marks: 1,
      stem: 'Three lamps are connected in series with a cell. State how the current at a point just after the cell compares with the current at a point between the second and third lamps.',
      options: [
        'The currents are the same',
        'The current after the cell is larger',
        'The current after the cell is smaller',
        'It depends on the resistance of the lamps',
      ],
      answerIndex: 0,
      markScheme: [{ text: 'The current is the same at both points', marks: 1 }],
      examinerNote: {
        en: 'Current is not "used up" by components. Charge cannot pile up or vanish in a single loop, so the current is identical everywhere in series.',
        zh: '电流不会被元件"用掉"。在单一回路中电荷既不能堆积也不会消失，所以串联各处电流完全相同。',
      },
    },
    {
      id: '4-3-2-cp2',
      syllabus: ['0625.4.3.2.4', '0625.4.3.2.8'],
      tier: 'extended',
      commandWord: 'Calculate',
      marks: 4,
      stem: 'A 12 V battery is connected in series with a 30 Ω resistor and a 60 Ω resistor. Calculate the current in the circuit and the p.d. across the 60 Ω resistor.',
      markScheme: [
        { text: 'Total resistance = 30 + 60 = 90 Ω', marks: 1 },
        { text: 'Uses I = V / R', marks: 1 },
        { text: 'I = 0.13 A (accept 0.133 A)', marks: 1, alternatives: ['12 / 90'] },
        { text: 'p.d. = 0.133 × 60 = 8.0 V', marks: 1 },
      ],
      examinerNote: {
        en: 'Find the total resistance first, then the current, then the individual p.d. Check your answer: the two p.d.s should add to 12 V, and the larger resistor should get the larger share.',
        zh: '先求总电阻，再求电流，最后求分压。自查：两个分压之和应等于 12 V，且较大的电阻分到较大的电压。',
      },
    },
    {
      id: '4-3-2-cp3',
      syllabus: ['0625.4.3.2.6', '0625.4.3.2.10'],
      tier: 'extended',
      commandWord: 'Calculate',
      marks: 3,
      stem: 'A 30 Ω resistor and a 60 Ω resistor are connected in parallel. Calculate their combined resistance.',
      markScheme: [
        { text: 'Uses 1/R = 1/R₁ + 1/R₂ or R = R₁R₂ / (R₁ + R₂)', marks: 1 },
        { text: 'Correct substitution', marks: 1, alternatives: ['(30 × 60) / 90'] },
        { text: '20 Ω', marks: 1 },
      ],
      examinerNote: {
        en: 'A very common error is forgetting the final reciprocal and writing 0.05 Ω. Sanity-check the answer: it must be smaller than 30 Ω, the smaller of the two resistors.',
        zh: '常见错误是忘了最后取倒数，写成 0.05 Ω。自查：答案必须小于 30 Ω，即两者中较小的那个。',
      },
    },
    {
      id: '4-3-2-cp4',
      syllabus: ['0625.4.3.2.7'],
      tier: 'core',
      commandWord: 'Explain',
      marks: 2,
      stem: 'Household lighting circuits connect lamps in parallel rather than in series. Explain one advantage of this.',
      markScheme: [
        {
          text: 'Each lamp receives the full mains p.d., so all lamps are at full brightness',
          marks: 1,
          alternatives: ['lamps are brighter'],
        },
        {
          text: 'If one lamp fails the others still work, because each has its own path for the current',
          marks: 1,
          alternatives: ['can be switched independently'],
        },
      ],
      examinerNote: {
        en: 'The command word is Explain, so each advantage needs its reason. "One can break and the others stay on" earns the mark only when you say why — each branch is a separate path.',
        zh: '命令词是 Explain，每个优点都要给出理由。"一个坏了其他还亮"只有说明原因（每条支路是独立路径）才能得分。',
      },
    },
    {
      id: '4-3-2-cp5',
      syllabus: ['0625.4.2.2.2', '0625.4.2.3.5'],
      tier: 'core',
      commandWord: 'Describe',
      marks: 2,
      stem: 'A student wants to measure the current through a resistor and the p.d. across it. Describe how each meter should be connected.',
      markScheme: [
        { text: 'The ammeter is connected in series with the resistor', marks: 1 },
        { text: 'The voltmeter is connected in parallel with (across) the resistor', marks: 1 },
      ],
      examinerNote: {
        en: 'A voltmeter connected in series has such a high resistance that it stops almost all the current; an ammeter connected in parallel short-circuits the component.',
        zh: '电压表串联时电阻极大，几乎截断电流；电流表并联则会把元件短路。',
      },
    },
  ],
}

export default lesson
