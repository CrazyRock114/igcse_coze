import type { Lesson } from '@/content/types'
import { formatSigFigs } from '@/lib/units'
import narration from './narration'

const lesson: Lesson = {
  slug: '1-5-2-moments',
  subject: '0625',
  syllabus: [
    '0625.1.5.2.1',
    '0625.1.5.2.2',
    '0625.1.5.2.3',
    '0625.1.5.2.4',
    '0625.1.5.2.5',
    '0625.1.5.2.6',
  ],
  tier: 'extended',
  estimatedMinutes: 40,

  title: { en: 'Moments and balance', zh: '力矩与平衡' },
  summary: {
    en: 'Move masses along a beam and watch it tip. Turning effect depends on distance from the pivot, not just on force.',
    zh: '在杠杆上移动重物，看它如何倾斜。转动效果取决于到支点的距离，而不只是力的大小。',
  },

  objectives: [
    {
      en: 'Describe the moment of a force as its turning effect, and give everyday examples.',
      zh: '把力矩描述为转动效果，并举出日常例子。',
    },
    {
      en: 'Use moment = force × perpendicular distance from the pivot.',
      zh: '使用 力矩 = 力 × 到支点的垂直距离。',
    },
    {
      en: 'Apply the principle of moments to a beam with one force each side of the pivot.',
      zh: '对支点两侧各有一个力的杠杆应用力矩平衡原理。',
    },
    {
      en: 'State the condition for equilibrium: no resultant force and no resultant moment.',
      zh: '说明平衡条件：合力为零且合力矩为零。',
    },
    {
      en: 'Apply the principle of moments with more than one force each side. (Extended)',
      zh: '对每侧多个力的情形应用力矩平衡原理。（Extended）',
    },
    {
      en: 'Describe an experiment showing there is no resultant moment in equilibrium. (Extended)',
      zh: '描述验证平衡时合力矩为零的实验。（Extended）',
    },
  ],

  glossary: [
    {
      en: 'moment',
      zh: '力矩',
      definition: {
        en: 'The turning effect of a force about a pivot: force × perpendicular distance. Measured in N m.',
        zh: '力绕支点的转动效果：力 × 垂直距离。单位为 N m。',
      },
      syllabus: ['0625.1.5.2.1', '0625.1.5.2.2'],
    },
    {
      en: 'pivot',
      zh: '支点',
      definition: {
        en: 'The fixed point about which an object turns. Also called the fulcrum.',
        zh: '物体转动时所绕的固定点，也称为支点。',
      },
      syllabus: ['0625.1.5.2.1'],
    },
    {
      en: 'perpendicular distance',
      zh: '垂直距离',
      definition: {
        en: 'The shortest distance from the pivot to the line of action of the force — measured at right angles to it.',
        zh: '从支点到力的作用线的最短距离——与力的方向垂直。',
      },
      syllabus: ['0625.1.5.2.2'],
    },
    {
      en: 'principle of moments',
      zh: '力矩平衡原理',
      definition: {
        en: 'For a balanced object, the total clockwise moment about any pivot equals the total anticlockwise moment.',
        zh: '对平衡的物体，绕任一支点的顺时针力矩总和等于逆时针力矩总和。',
      },
      syllabus: ['0625.1.5.2.3'],
    },
    {
      en: 'equilibrium',
      zh: '平衡',
      definition: {
        en: 'No resultant force and no resultant moment. The object neither accelerates nor starts to turn.',
        zh: '合力为零且合力矩为零。物体既不加速也不开始转动。',
      },
      syllabus: ['0625.1.5.2.4'],
    },
  ],

  equations: [
    {
      latex: '\\text{moment} = F \\times d',
      meaning: {
        en: 'The moment of a force equals the force multiplied by the perpendicular distance from the pivot.',
        zh: '力矩等于力乘以到支点的垂直距离。',
      },
    },
    {
      latex: 'F_1 d_1 = F_2 d_2',
      meaning: {
        en: 'At balance, the anticlockwise moment equals the clockwise moment.',
        zh: '平衡时，逆时针力矩等于顺时针力矩。',
      },
      // Self-narrating: the equation states which way it tips, not just the numbers.
      substitute: (r) => {
        const a = formatSigFigs(r['anticlockwiseMoment'] ?? 0, 3)
        const c = formatSigFigs(r['clockwiseMoment'] ?? 0, 3)
        if (r['balanced'] === 1) return `${a} = ${c}\\ \\text{N m} \\;\\Rightarrow\\; \\text{balanced}`
        const bigger = (r['netMoment'] ?? 0) > 0
        return bigger
          ? `${a} < ${c}\\ \\text{N m} \\;\\Rightarrow\\; \\text{right sinks}`
          : `${a} > ${c}\\ \\text{N m} \\;\\Rightarrow\\; \\text{left sinks}`
      },
    },
  ],

  sim: {
    primitive: 'beam',
    kernel: '1-5-2-moments',
    hint: {
      en: 'Change a distance without changing a mass — the beam still tips.',
      zh: '只改距离、不改质量——杠杆照样会倾斜。',
    },
    params: [
      {
        key: 'leftMass',
        label: { en: 'Left mass', zh: '左侧质量' },
        unit: 'kg',
        symbol: 'm_1',
        min: 0.1,
        max: 5,
        step: 0.1,
        default: 2,
      },
      {
        key: 'leftDistance',
        label: { en: 'Left distance', zh: '左侧距离' },
        unit: 'm',
        symbol: 'd_1',
        min: 0.05,
        max: 0.5,
        step: 0.05,
        default: 0.2,
      },
      {
        key: 'rightMass',
        label: { en: 'Right mass', zh: '右侧质量' },
        unit: 'kg',
        symbol: 'm_2',
        min: 0.1,
        max: 5,
        step: 0.1,
        default: 1,
      },
      {
        key: 'rightDistance',
        label: { en: 'Right distance', zh: '右侧距离' },
        unit: 'm',
        symbol: 'd_2',
        min: 0.05,
        max: 0.5,
        step: 0.05,
        default: 0.4,
      },
    ],
    readouts: [
      {
        key: 'anticlockwiseMoment',
        label: { en: 'Anticlockwise', zh: '逆时针力矩' },
        unit: 'N m',
        sigFigs: 3,
      },
      {
        key: 'clockwiseMoment',
        label: { en: 'Clockwise', zh: '顺时针力矩' },
        unit: 'N m',
        sigFigs: 3,
      },
    ],
    presets: [
      {
        label: { en: 'Balanced', zh: '平衡' },
        params: { leftMass: 2, leftDistance: 0.2, rightMass: 1, rightDistance: 0.4 },
      },
      {
        label: { en: 'Same distance, different mass', zh: '距离相同，质量不同' },
        params: { leftMass: 3, leftDistance: 0.3, rightMass: 1, rightDistance: 0.3 },
      },
      {
        label: { en: 'Child lifts an adult', zh: '小孩跷起大人' },
        params: { leftMass: 5, leftDistance: 0.1, rightMass: 1, rightDistance: 0.5 },
      },
    ],
  },

  narration,

  checkpoints: [
    {
      id: '1-5-2-moments-cp1',
      syllabus: ['0625.1.5.2.2'],
      tier: 'core',
      commandWord: 'Calculate',
      marks: 2,
      stem: 'A force of 12 N acts at a perpendicular distance of 0.25 m from a pivot. Calculate the moment of the force.',
      markScheme: [
        { text: 'Uses moment = force × perpendicular distance', marks: 1, alternatives: ['12 × 0.25'] },
        { text: '3.0 N m', marks: 1, alternatives: ['3 N m'] },
      ],
      examinerNote: {
        en: 'The unit is newton metres, not newtons. Dropping or mis-stating the unit costs a mark in most moment questions.',
        zh: '单位是牛顿米，不是牛顿。在多数力矩题中漏写或写错单位都会失分。',
      },
    },
    {
      id: '1-5-2-moments-cp2',
      syllabus: ['0625.1.5.2.3'],
      tier: 'core',
      commandWord: 'Determine',
      marks: 3,
      stem: 'A uniform beam is pivoted at its centre. A weight of 6.0 N hangs 40 cm to the left of the pivot. A second weight hangs 30 cm to the right of the pivot and the beam balances. Determine the size of the second weight.',
      markScheme: [
        { text: 'Uses the principle of moments: F₁d₁ = F₂d₂', marks: 1 },
        { text: 'Correct substitution, e.g. 6.0 × 0.40 = F₂ × 0.30', marks: 1 },
        { text: '8.0 N', marks: 1 },
      ],
      examinerNote: {
        en: 'Distances may stay in centimetres provided both sides use the same unit — but converting to metres first is safer. The answer must be larger than 6.0 N because the second weight is closer in.',
        zh: '只要两边单位一致，距离可以都用厘米——但先换成米更稳妥。答案必须大于 6.0 N，因为第二个重物离支点更近。',
      },
    },
    {
      id: '1-5-2-moments-cp3',
      syllabus: ['0625.1.5.2.4'],
      tier: 'core',
      commandWord: 'State',
      marks: 2,
      stem: 'State the two conditions that must be satisfied for an object to be in equilibrium.',
      markScheme: [
        { text: 'There is no resultant force on the object', marks: 1 },
        {
          text: 'There is no resultant moment about any point',
          marks: 1,
          alternatives: ['clockwise moments = anticlockwise moments'],
        },
      ],
      examinerNote: {
        en: 'Both conditions are needed. An object with balanced moments but an unbalanced force is not in equilibrium — it accelerates without turning.',
        zh: '两个条件都要满足。力矩平衡但合力不为零的物体并不平衡——它会平动加速而不转动。',
      },
    },
    {
      id: '1-5-2-moments-cp4',
      syllabus: ['0625.1.5.2.5'],
      tier: 'extended',
      commandWord: 'Calculate',
      marks: 4,
      stem: 'A light rod is pivoted at one end. Weights of 4.0 N and 6.0 N hang at 0.20 m and 0.50 m from the pivot on the same side. A single upward force F acts at 0.80 m from the pivot and holds the rod horizontal. Calculate F.',
      markScheme: [
        { text: 'Total clockwise moment = (4.0 × 0.20) + (6.0 × 0.50)', marks: 1 },
        { text: '= 0.80 + 3.0 = 3.8 N m', marks: 1 },
        { text: 'Sets F × 0.80 equal to the total moment', marks: 1 },
        { text: 'F = 4.75 N (accept 4.8 N)', marks: 1 },
      ],
      examinerNote: {
        en: 'With several forces on one side, every moment must be added before balancing. Using only the larger weight gives 3.75 N and loses three marks.',
        zh: '同侧有多个力时，必须先把各力矩相加再求平衡。只用较大的那个重物会得到 3.75 N，丢掉三分。',
      },
    },
  ],
}

export default lesson
