import type { Lesson } from '@/content/types'
import { formatSigFigs } from '@/lib/units'
import narration from './narration'

const lesson: Lesson = {
  slug: '4-2-4-resistance',
  subject: '0625',
  syllabus: [
    '0625.4.2.4.1',
    '0625.4.2.4.2',
    '0625.4.2.4.3',
    '0625.4.2.4.4',
    '0625.4.2.4.5',
  ],
  tier: 'extended',
  estimatedMinutes: 45,

  title: { en: 'Resistance and I–V characteristics', zh: '电阻与伏安特性' },
  summary: {
    en: 'Flip between a resistor, a filament lamp and a diode on the same axes, and stretch a wire to see resistance change with its shape.',
    zh: '在同一坐标上切换定值电阻、灯丝灯泡与二极管，并改变导线形状，看电阻如何随之变化。',
  },

  objectives: [
    { en: 'Recall and use R = V / I.', zh: '记住并使用 R = V / I。' },
    {
      en: 'Describe an experiment to determine resistance using a voltmeter and an ammeter.',
      zh: '描述用电压表和电流表测电阻的实验。',
    },
    {
      en: 'State qualitatively how the resistance of a metallic wire depends on its length and cross-sectional area.',
      zh: '定性说明金属导线电阻与长度及横截面积的关系。',
    },
    {
      en: 'Sketch and explain the I–V graphs for a fixed resistor, a filament lamp and a diode. (Extended)',
      zh: '画出并解释定值电阻、灯丝灯泡与二极管的伏安特性曲线。（Extended）',
    },
    {
      en: 'Use R ∝ l and R ∝ 1 / A for a metallic conductor. (Extended)',
      zh: '对金属导体使用 R ∝ l 与 R ∝ 1 / A。（Extended）',
    },
  ],

  glossary: [
    {
      en: 'resistance',
      zh: '电阻',
      definition: {
        en: 'How strongly a component opposes the current through it. R = V / I, measured in ohms.',
        zh: '元件对电流阻碍作用的大小。R = V / I，单位欧姆。',
      },
      syllabus: ['0625.4.2.4.1'],
    },
    {
      en: 'ohmic conductor',
      zh: '欧姆导体',
      definition: {
        en: 'A component whose resistance stays constant, so its I–V graph is a straight line through the origin.',
        zh: '电阻保持恒定的元件，其伏安特性是过原点的直线。',
      },
      syllabus: ['0625.4.2.4.4'],
    },
    {
      en: 'filament lamp',
      zh: '灯丝灯泡',
      definition: {
        en: 'A lamp with a thin metal wire that glows. Its resistance rises as it heats, so its I–V graph curves.',
        zh: '内有发光细金属丝的灯泡。灯丝受热后电阻增大，伏安特性因此弯曲。',
      },
      syllabus: ['0625.4.2.4.4'],
    },
    {
      en: 'diode',
      zh: '二极管',
      definition: {
        en: 'A component that conducts in one direction only, and only above a small forward voltage.',
        zh: '只在一个方向导电，且需超过一个较小正向电压才导通的元件。',
      },
      syllabus: ['0625.4.2.4.4'],
    },
    {
      en: 'cross-sectional area',
      zh: '横截面积',
      definition: {
        en: 'The area of a slice through the wire. A thicker wire has a larger area and a lower resistance.',
        zh: '垂直切开导线所得截面的面积。导线越粗，面积越大，电阻越小。',
      },
      syllabus: ['0625.4.2.4.5'],
    },
  ],

  equations: [
    {
      latex: 'R = \\frac{V}{I}',
      meaning: {
        en: 'Resistance is the p.d. across a component divided by the current through it.',
        zh: '电阻等于元件两端电压除以通过它的电流。',
      },
      // Names what the readings mean for the component currently selected.
      substitute: (r) => {
        const measured = formatSigFigs(r['measuredResistance'] ?? 0, 3)
        return r['isOhmic'] === 1
          ? `R = ${measured}\\ \\Omega \\text{ — the same at every point}`
          : `R = ${measured}\\ \\Omega \\text{ at this p.d. only}`
      },
    },
    {
      latex: 'R \\propto \\dfrac{l}{A}',
      meaning: {
        en: 'Resistance is proportional to length and inversely proportional to cross-sectional area.',
        zh: '电阻与长度成正比，与横截面积成反比。',
      },
      substitute: (r) =>
        `R_{\\text{effective}} = ${formatSigFigs(r['effectiveResistance'] ?? 0, 3)}\\ \\Omega`,
    },
  ],

  sim: {
    primitive: 'plot2d',
    kernel: '4-2-4-resistance',
    hint: {
      en: 'Switch component to compare the three graph shapes — these are the sketches exams ask for.',
      zh: '切换元件，比较三种图形——考试常要求画的正是这三种。',
    },
    params: [
      {
        key: 'component',
        label: { en: 'Component', zh: '元件' },
        unit: '',
        min: 0,
        max: 2,
        step: 1,
        default: 0,
        options: [
          { value: 0, label: { en: 'Fixed resistor', zh: '定值电阻' } },
          { value: 1, label: { en: 'Filament lamp', zh: '灯丝灯泡' } },
          { value: 2, label: { en: 'Diode', zh: '二极管' } },
        ],
      },
      {
        key: 'resistance',
        label: { en: 'Resistance when cold', zh: '冷态电阻' },
        unit: 'Ω',
        symbol: 'R',
        min: 5,
        max: 100,
        step: 5,
        default: 20,
      },
      {
        key: 'lengthFactor',
        label: { en: 'Wire length', zh: '导线长度' },
        unit: '× reference',
        symbol: 'l',
        min: 0.5,
        max: 3,
        step: 0.5,
        default: 1,
      },
      {
        key: 'areaFactor',
        label: { en: 'Cross-sectional area', zh: '横截面积' },
        unit: '× reference',
        symbol: 'A',
        min: 0.5,
        max: 4,
        step: 0.5,
        default: 1,
      },
    ],
    readouts: [
      {
        key: 'effectiveResistance',
        label: { en: 'Resistance from geometry', zh: '由形状决定的电阻' },
        unit: 'Ω',
        sigFigs: 3,
      },
      {
        key: 'measuredResistance',
        label: { en: 'Measured V / I at 4 V', zh: '4 V 处测得的 V / I' },
        unit: 'Ω',
        sigFigs: 3,
      },
      {
        key: 'currentAt4V',
        label: { en: 'Current at 4 V', zh: '4 V 时的电流' },
        unit: 'A',
        sigFigs: 3,
      },
    ],
    presets: [
      {
        label: { en: 'Fixed resistor', zh: '定值电阻' },
        params: { component: 0, resistance: 20, lengthFactor: 1, areaFactor: 1 },
      },
      {
        label: { en: 'Filament lamp', zh: '灯丝灯泡' },
        params: { component: 1, resistance: 20, lengthFactor: 1, areaFactor: 1 },
      },
      {
        label: { en: 'Diode', zh: '二极管' },
        params: { component: 2, resistance: 20, lengthFactor: 1, areaFactor: 1 },
      },
      {
        label: { en: 'Three times longer', zh: '长度三倍' },
        params: { component: 0, resistance: 20, lengthFactor: 3, areaFactor: 1 },
      },
      {
        label: { en: 'Four times thicker', zh: '截面四倍' },
        params: { component: 0, resistance: 20, lengthFactor: 1, areaFactor: 4 },
      },
    ],
  },

  narration,

  checkpoints: [
    {
      id: '4-2-4-cp1',
      syllabus: ['0625.4.2.4.1'],
      tier: 'core',
      commandWord: 'Calculate',
      marks: 2,
      stem: 'The p.d. across a resistor is 9.0 V and the current through it is 0.30 A. Calculate the resistance of the resistor.',
      markScheme: [
        { text: 'Uses R = V / I', marks: 1, alternatives: ['9.0 / 0.30'] },
        { text: '30 Ω', marks: 1 },
      ],
      examinerNote: {
        en: 'Watch for currents given in milliamps. 300 mA is 0.30 A; substituting 300 gives 0.03 Ω, which is out by a factor of a thousand.',
        zh: '注意题目中电流可能以毫安给出。300 mA 即 0.30 A；直接代入 300 会得到 0.03 Ω，差了一千倍。',
      },
    },
    {
      id: '4-2-4-cp2',
      syllabus: ['0625.4.2.4.4'],
      tier: 'extended',
      commandWord: 'Explain',
      marks: 3,
      stem: 'The I–V graph for a filament lamp is a curve rather than a straight line. Explain why.',
      markScheme: [
        {
          text: 'As the p.d. increases, the current increases and the filament gets hotter',
          marks: 1,
        },
        {
          text: 'The resistance of the filament increases with temperature',
          marks: 1,
        },
        {
          text: 'So the current increases less than in proportion to the p.d., and the graph bends towards the voltage axis',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'The chain must be complete: more current → hotter → higher resistance → curve. Saying only "the resistance changes" earns one mark at most.',
        zh: '因果链要完整：电流变大 → 温度升高 → 电阻增大 → 曲线弯曲。只写"电阻变化"最多得一分。',
      },
    },
    {
      id: '4-2-4-cp3',
      syllabus: ['0625.4.2.4.5'],
      tier: 'extended',
      commandWord: 'Determine',
      marks: 3,
      stem: 'A wire has a resistance of 8.0 Ω. A second wire of the same material is twice as long and has twice the cross-sectional area. Determine the resistance of the second wire.',
      markScheme: [
        { text: 'Doubling the length doubles the resistance', marks: 1 },
        { text: 'Doubling the cross-sectional area halves the resistance', marks: 1 },
        { text: 'The two effects cancel, so R = 8.0 Ω', marks: 1 },
      ],
      examinerNote: {
        en: 'Deal with the two changes separately, then combine. Candidates who spot only one of them answer 16 Ω or 4.0 Ω.',
        zh: '先分别处理两个变化，再合起来。只注意到其中一个的同学会答 16 Ω 或 4.0 Ω。',
      },
    },
    {
      id: '4-2-4-cp4',
      syllabus: ['0625.4.2.4.4'],
      tier: 'extended',
      commandWord: 'Identify',
      marks: 1,
      stem: 'An I–V graph shows no current for all negative p.d., no current up to about +0.7 V, and then a steeply rising current. Identify the component.',
      options: ['A diode', 'A fixed resistor', 'A filament lamp', 'A thermistor'],
      answerIndex: 0,
      markScheme: [{ text: 'A diode', marks: 1, alternatives: ['light-emitting diode'] }],
      examinerNote: {
        en: 'One-way conduction is unique to the diode among the components on this syllabus. Resistors and lamps both conduct symmetrically.',
        zh: '在本考纲的元件中，只有二极管单向导电。定值电阻和灯泡都是对称导电的。',
      },
    },
  ],
}

export default lesson
