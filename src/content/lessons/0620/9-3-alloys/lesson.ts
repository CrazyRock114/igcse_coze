import type { Lesson } from '@/content/types'
import narration from './narration'

const lesson: Lesson = {
  slug: '9-3-alloys',
  subject: '0620',
  syllabus: [
    '0620.9.2.1',
    '0620.9.3.1',
    '0620.9.3.2',
    '0620.9.3.3',
    '0620.9.3.4',
    '0620.9.3.5',
  ],
  tier: 'extended',
  estimatedMinutes: 40,

  title: { en: 'Alloys', zh: '合金' },
  summary: {
    en: 'Layers of identical atoms slide over each other easily. Put an atom of a different size in the way and they catch — which is the whole of why an alloy is harder.',
    zh: '相同原子构成的层可以轻易相互滑动。塞进一个大小不同的原子，它们就卡住了——这就是合金更硬的全部原因。',
  },

  objectives: [
    {
      en: 'Describe the uses of metals in terms of their physical properties.',
      zh: '用物理性质说明金属的用途。',
    },
    {
      en: 'Describe an alloy as a mixture of a metal with other elements.',
      zh: '把合金描述为金属与其他元素的混合物。',
    },
    {
      en: 'State that alloys can be harder and stronger than the pure metals.',
      zh: '说明合金可以比纯金属更硬更强。',
    },
    { en: 'Describe the uses of alloys in terms of their properties.', zh: '用性质说明合金的用途。' },
    { en: 'Identify alloys from diagrams of their structure.', zh: '由结构图识别合金。' },
    {
      en: 'Explain in terms of structure why alloys are harder and stronger. (Extended)',
      zh: '用结构解释合金为何更硬更强。（Extended）',
    },
  ],

  glossary: [
    {
      en: 'alloy',
      zh: '合金',
      definition: {
        en: 'A mixture of a metal with one or more other elements. A mixture, not a compound — no reaction has taken place and there is no formula.',
        zh: '金属与一种或多种其他元素的混合物。是混合物而非化合物——没有发生反应，也没有化学式。',
      },
      syllabus: ['0620.9.3.1'],
    },
    {
      en: 'malleable',
      zh: '有延展性',
      definition: {
        en: 'Able to be hammered into shape without breaking, because layers of atoms can slide over one another.',
        zh: '可以被锤打成形而不断裂，因为原子层之间能够相互滑动。',
      },
      syllabus: ['0620.9.2.1'],
    },
    {
      en: 'layers of atoms',
      zh: '原子层',
      definition: {
        en: 'The regular rows a metal’s atoms sit in. Whether these can slide decides whether the metal is soft or hard.',
        zh: '金属原子排列成的规则行列。它们能否滑动，决定了金属是软还是硬。',
      },
      syllabus: ['0620.9.3.5'],
    },
  ],

  equations: [
    {
      latex: '\\text{slip} = \\text{applied force} \\times \\text{how far the layers can move}',
      meaning: {
        en: 'The same push moves a pure metal’s layers a whole atom along, and an alloy’s hardly at all.',
        zh: '同样的推力能让纯金属的层滑过整整一个原子，而合金的层几乎不动。',
      },
      substitute: (r) =>
        `${(r['layerSlip'] ?? 0).toFixed(2)} \\text{ of a possible } ${(r['maximumSlip'] ?? 0).toFixed(2)} \\quad ${Math.round(r['percentGuest'] ?? 0)}\\%\\ \\text{other atoms}`,
    },
  ],

  sim: {
    primitive: 'lattice',
    kernel: '9-3-alloys',
    hint: {
      en: 'Push the force slider to its maximum, then switch between the pure metal and the alloys with the force held there.',
      zh: '把力的滑块推到最大，然后保持不变，在纯金属与各种合金之间切换。',
    },
    params: [
      {
        key: 'mixture',
        label: { en: 'Material', zh: '材料' },
        unit: '',
        min: 0,
        max: 3,
        step: 1,
        default: 0,
        options: [
          { value: 0, label: { en: 'Pure copper', zh: '纯铜' } },
          { value: 1, label: { en: 'Brass', zh: '黄铜' } },
          { value: 2, label: { en: 'Steel', zh: '钢' } },
          { value: 3, label: { en: 'Stainless steel', zh: '不锈钢' } },
        ],
      },
      {
        key: 'force',
        label: { en: 'Force on the upper layers', zh: '施加在上层的力' },
        unit: '',
        min: 0,
        max: 1,
        step: 0.05,
        default: 0,
      },
    ],
    readouts: [
      {
        key: 'layerSlip',
        label: { en: 'Layers have slipped', zh: '层已滑动' },
        unit: '× spacing',
        sigFigs: 2,
        exact: true,
      },
      {
        key: 'maximumSlip',
        label: { en: 'Most they could slip', zh: '最多能滑动' },
        unit: '× spacing',
        sigFigs: 2,
        exact: true,
      },
      {
        key: 'percentGuest',
        label: { en: 'Of the atoms drawn', zh: '占图中原子的比例' },
        unit: '%',
        sigFigs: 2,
        exact: true,
      },
      {
        key: 'guestAtoms',
        label: { en: 'Other-element atoms', zh: '其他元素原子数' },
        unit: '',
        sigFigs: 2,
        exact: true,
      },
    ],
    presets: [
      { label: { en: 'Pure copper, pushed', zh: '纯铜，施力' }, params: { mixture: 0, force: 1 } },
      { label: { en: 'Brass, same push', zh: '黄铜，同样的力' }, params: { mixture: 1, force: 1 } },
      { label: { en: 'Steel: a smaller atom', zh: '钢：更小的原子' }, params: { mixture: 2, force: 1 } },
      {
        label: { en: 'Stainless: a larger atom', zh: '不锈钢：更大的原子' },
        params: { mixture: 3, force: 1 },
      },
      { label: { en: 'No force applied', zh: '不施力' }, params: { mixture: 1, force: 0 } },
    ],
  },

  narration,

  checkpoints: [
    {
      id: '0620-9-3-cp1',
      syllabus: ['0620.9.3.1'],
      tier: 'core',
      commandWord: 'Define',
      marks: 1,
      stem: 'Define the term alloy.',
      markScheme: [
        { text: 'A mixture of a metal with one or more other elements', marks: 1 },
      ],
      examinerNote: {
        en: 'The word "mixture" is doing the work. Calling an alloy a compound is wrong — no reaction happens and there is no fixed composition.',
        zh: '关键词是"混合物"。把合金说成化合物是错的——没有发生反应，也没有固定组成。',
      },
    },
    {
      id: '0620-9-3-cp2',
      syllabus: ['0620.9.3.5'],
      tier: 'extended',
      commandWord: 'Explain',
      marks: 3,
      stem: 'Explain, in terms of structure, why brass is harder than pure copper.',
      markScheme: [
        { text: 'Brass contains zinc atoms, which are a different size from copper atoms', marks: 1 },
        { text: 'These distort the regular layers of copper atoms', marks: 1 },
        {
          text: 'so the layers can no longer slide over one another, making the alloy harder',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'All three steps are needed, and the middle one is the one most often skipped. "It contains zinc so it is harder" states the input and the output with no mechanism between them.',
        zh: '三步都要写，最常被跳过的是中间那一步。"含有锌所以更硬"只写了原因和结果，中间的机理没有交代。',
      },
    },
    {
      id: '0620-9-3-cp3',
      syllabus: ['0620.9.3.4'],
      tier: 'core',
      commandWord: 'Identify',
      marks: 2,
      stem: 'Two diagrams show circles representing atoms. In diagram A all the circles are the same size and sit in regular rows. In diagram B there are circles of two sizes and the rows are irregular. Identify which shows an alloy and justify your choice.',
      markScheme: [
        { text: 'Diagram B', marks: 1 },
        {
          text: 'because it contains atoms of two different sizes, so it is a mixture of two elements',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Look for two sizes of circle, not for untidiness on its own. A pure metal drawn badly is still a pure metal.',
        zh: '要找的是两种大小的圆，而不是仅仅"排列不整齐"。纯金属画得潦草仍然是纯金属。',
      },
    },
    {
      id: '0620-9-3-cp4',
      syllabus: ['0620.9.2.1', '0620.9.3.3'],
      tier: 'core',
      commandWord: 'Suggest',
      marks: 2,
      stem: 'Electrical cables are made from pure copper, but bridges are made from steel rather than pure iron. Suggest a reason for each choice.',
      markScheme: [
        {
          text: 'Copper is a good electrical conductor and is soft enough to bend, so cables can be routed',
          marks: 1,
        },
        {
          text: 'Steel is much stronger and harder than pure iron, so it can carry the load without deforming',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Each answer must match the property to the job. "Copper conducts" is not enough on its own — say why softness is wanted in a cable.',
        zh: '每个答案都要把性质与用途对应起来。只写"铜导电"不够——要说明电缆为什么需要柔软。',
      },
    },
  ],
}

export default lesson
