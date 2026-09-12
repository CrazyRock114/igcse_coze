import type { Lesson } from '@/content/types'
import { placementParams } from '@/lib/assignment'
import { ALL_ITEMS, MAX_TARGETS } from './kernel'
import narration from './narration'

const lesson: Lesson = {
  slug: '12-5-tests',
  subject: '0620',
  syllabus: [
    '0620.12.2.1',
    '0620.12.2.2',
    '0620.12.5.1',
    '0620.12.5.2',
    '0620.12.5.3',
    '0620.12.5.4',
  ],
  tier: 'core',
  estimatedMinutes: 45,

  title: { en: 'Titrations and identifying ions and gases', zh: '滴定与离子、气体的检验' },
  summary: {
    en: 'Three cations give a white precipitate with sodium hydroxide. Naming the colour is not enough — what separates them is what happens when you keep adding.',
    zh: '有三种阳离子与氢氧化钠都生成白色沉淀。只说颜色是不够的——区分它们的是继续加下去会发生什么。',
  },

  objectives: [
    {
      en: 'Describe an acid–base titration using a burette, a pipette and a suitable indicator.',
      zh: '描述用滴定管、移液管与合适指示剂进行酸碱滴定。',
    },
    { en: 'Describe how to identify the end-point using an indicator.', zh: '说明如何用指示剂判断滴定终点。' },
    {
      en: 'Describe the tests used to identify the common anions.',
      zh: '描述常见阴离子的检验方法。',
    },
    {
      en: 'Describe the tests for cations using aqueous sodium hydroxide and aqueous ammonia.',
      zh: '描述用氢氧化钠溶液与氨水检验阳离子。',
    },
    { en: 'Describe the tests used to identify the common gases.', zh: '描述常见气体的检验方法。' },
    { en: 'Describe the use of flame tests to identify cations.', zh: '描述用焰色反应检验阳离子。' },
  ],

  glossary: [
    {
      en: 'end-point',
      zh: '滴定终点',
      definition: {
        en: 'The moment in a titration when the indicator changes colour, showing the two solutions have exactly reacted. Reached one drop at a time.',
        zh: '滴定中指示剂变色的那一刻，表明两种溶液恰好完全反应。要逐滴加入才能准确到达。',
      },
      syllabus: ['0620.12.2.2'],
    },
    {
      en: 'titre',
      zh: '滴定体积',
      definition: {
        en: 'The volume run out of the burette to reach the end-point — the difference between the two burette readings. Repeated until two agree closely.',
        zh: '为达到终点从滴定管放出的体积——两次读数之差。需重复到两次结果接近一致。',
      },
      syllabus: ['0620.12.2.1'],
    },
    {
      en: 'precipitate',
      zh: '沉淀',
      definition: {
        en: 'An insoluble solid formed when two solutions are mixed. Its colour, and whether it dissolves in excess reagent, identify the ion.',
        zh: '两种溶液混合时生成的不溶固体。它的颜色以及是否在过量试剂中溶解，可用来确定离子。',
      },
      syllabus: ['0620.12.5.2'],
    },
    {
      en: 'flame test',
      zh: '焰色反应',
      definition: {
        en: 'Identifying a metal ion by the colour it gives a hot flame. The wire is cleaned first, because a trace of sodium hides every other colour.',
        zh: '通过金属离子使高温火焰呈现的颜色来鉴定它。要先清洗铂丝，因为微量的钠会掩盖其他所有颜色。',
      },
      syllabus: ['0620.12.5.4'],
    },
  ],

  equations: [
    {
      latex: '\\text{titre} = V_{\\text{final}} - V_{\\text{initial}}',
      meaning: {
        en: 'The volume delivered by a burette is a difference between two readings, not a single number read off the scale. Both readings go in the table.',
        zh: '滴定管放出的体积是两次读数之差，而不是从刻度上直接读出的一个数。两次读数都要记入表格。',
      },
      substitute: (r) =>
        `\\text{correct } ${r['correct'] ?? 0}/${r['total'] ?? 0} \\quad \\text{paired } ${r['paired'] ?? 0}`,
    },
  ],

  sim: {
    primitive: 'match',
    kernel: '12-5-tests',
    hint: {
      en: 'Click an ion, then click its observation. Three of the cations give a white precipitate — read past the colour before you commit.',
      zh: '先点一个离子，再点它对应的现象。有三种阳离子生成白色沉淀——决定之前请读完颜色之后的部分。',
    },
    params: [
      {
        key: 'stage',
        label: { en: 'Exercise', zh: '练习' },
        unit: '',
        min: 1,
        max: 4,
        step: 1,
        default: 1,
        options: [
          { value: 1, label: { en: 'Cations', zh: '阳离子' } },
          { value: 2, label: { en: 'Anions', zh: '阴离子' } },
          { value: 3, label: { en: 'Gases', zh: '气体' } },
          { value: 4, label: { en: 'Flame tests', zh: '焰色反应' } },
        ],
      },
      ...placementParams(ALL_ITEMS, MAX_TARGETS),
    ],
    readouts: [
      { key: 'correct', label: { en: 'Correct', zh: '正确数' }, unit: '', sigFigs: 2, exact: true },
      { key: 'paired', label: { en: 'Paired', zh: '已配对' }, unit: '', sigFigs: 2, exact: true },
      {
        key: 'total',
        label: { en: 'Pairs in this exercise', zh: '本练习配对数' },
        unit: '',
        sigFigs: 2,
        exact: true,
      },
    ],
    presets: [
      { label: { en: 'Cations with sodium hydroxide', zh: '阳离子与氢氧化钠' }, params: { stage: 1 } },
      { label: { en: 'Anions', zh: '阴离子' }, params: { stage: 2 } },
      { label: { en: 'Gases', zh: '气体' }, params: { stage: 3 } },
      { label: { en: 'Flame tests', zh: '焰色反应' }, params: { stage: 4 } },
    ],
  },

  narration,

  checkpoints: [
    {
      id: '0620-12-5-cp1',
      syllabus: ['0620.12.5.2'],
      tier: 'core',
      commandWord: 'Describe',
      marks: 3,
      stem: 'A colourless solution contains either calcium ions or zinc ions. Describe a test using aqueous sodium hydroxide that would distinguish between them, and state the result for each.',
      markScheme: [
        {
          text: 'Add aqueous sodium hydroxide a little at a time; both give a white precipitate',
          marks: 1,
        },
        { text: 'Continue adding until the sodium hydroxide is in excess', marks: 1 },
        {
          text: 'With zinc the white precipitate dissolves to give a colourless solution; with calcium it remains as a white precipitate',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'A test that gives the same result for both substances distinguishes nothing. The excess step is the test here — the first observation is only the setup.',
        zh: '对两种物质给出相同结果的实验区分不了任何东西。这里真正的检验是"过量"那一步——第一个现象只是铺垫。',
      },
    },
    {
      id: '0620-12-5-cp2',
      syllabus: ['0620.12.5.1'],
      tier: 'core',
      commandWord: 'Explain',
      marks: 3,
      stem: 'To test for sulfate ions, a solution is first acidified with dilute nitric acid and then aqueous barium nitrate is added. Explain why the acid is added first, and why nitric acid is used rather than sulfuric or hydrochloric acid.',
      markScheme: [
        {
          text: 'Any carbonate present would also give a white precipitate with barium nitrate and could be mistaken for a sulfate',
          marks: 1,
        },
        {
          text: 'The dilute acid reacts with and removes any carbonate first, so a white precipitate afterwards must be barium sulfate',
          marks: 1,
        },
        {
          text: 'Sulfuric acid would add sulfate ions and hydrochloric acid would add chloride ions, either of which could give a false positive result',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'The choice of acid matters as much as the acidifying itself. Adding the very ion you are testing for guarantees a positive result and proves nothing.',
        zh: '选哪种酸与"要酸化"同样重要。加入你正要检验的那种离子必然得到阳性结果，却什么也证明不了。',
      },
    },
    {
      id: '0620-12-5-cp3',
      syllabus: ['0620.12.5.3'],
      tier: 'core',
      commandWord: 'Describe',
      marks: 4,
      stem: 'Describe a test, with its result, for each of these gases: hydrogen, oxygen, carbon dioxide and chlorine.',
      markScheme: [
        { text: 'Hydrogen: a lighted splint burns with a squeaky pop', marks: 1 },
        { text: 'Oxygen: a glowing splint relights', marks: 1 },
        { text: 'Carbon dioxide: bubbled through limewater, it turns milky', marks: 1 },
        { text: 'Chlorine: damp litmus paper is bleached white', marks: 1 },
      ],
      examinerNote: {
        en: 'Lighted for hydrogen, glowing for oxygen — one adjective apart and the commonest slip on this page. And the litmus has to be damp, or the gas cannot act on it.',
        zh: '氢气用点燃的木条，氧气用带火星的木条——只差一个形容词，却是本页最常见的失误。而石蕊必须是湿润的，否则气体无法对它起作用。',
      },
    },
    {
      id: '0620-12-5-cp4',
      syllabus: ['0620.12.2.1', '0620.12.2.2'],
      tier: 'core',
      commandWord: 'Describe',
      marks: 4,
      stem: 'Describe how a titration would be carried out to find the volume of dilute hydrochloric acid that exactly reacts with 25.0 cm³ of sodium hydroxide solution.',
      markScheme: [
        {
          text: 'Use a pipette to transfer 25.0 cm³ of the sodium hydroxide into a conical flask, and add a few drops of a suitable indicator',
          marks: 1,
        },
        {
          text: 'Fill a burette with the dilute hydrochloric acid and record the initial reading',
          marks: 1,
        },
        {
          text: 'Add the acid, swirling the flask, adding dropwise near the end-point, until the indicator changes colour permanently; record the final reading and subtract to find the titre',
          marks: 1,
        },
        {
          text: 'Repeat until two titres agree closely, and take the average of those',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'The repeat is worth a mark on its own, and so is subtracting the two burette readings. A single reading has nothing to check it against.',
        zh: '"重复"本身值一分，"两次读数相减"也值一分。单次读数没有任何可核对的对象。',
      },
    },
    {
      id: '0620-12-5-cp5',
      syllabus: ['0620.12.5.4'],
      tier: 'core',
      commandWord: 'Describe',
      marks: 3,
      stem: 'Describe how a flame test is carried out, state the flame colour given by potassium ions, and explain why the wire must be cleaned thoroughly first.',
      markScheme: [
        {
          text: 'Clean a wire with concentrated hydrochloric acid, dip it into the solid sample and hold it in a hot blue Bunsen flame',
          marks: 1,
        },
        { text: 'Potassium gives a lilac flame', marks: 1 },
        {
          text: 'Sodium is a very common contaminant and gives an intense yellow flame that would mask the colour of any other ion present',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'The flame must be the hot blue one. A yellow luminous flame is itself yellow, so no colour could be read against it.',
        zh: '必须用高温的蓝色火焰。黄色的明亮火焰本身就是黄的，在它的映衬下读不出任何颜色。',
      },
    },
    {
      id: '0620-12-5-cp6',
      syllabus: ['0620.12.5.1', '0620.12.5.2'],
      tier: 'core',
      commandWord: 'Identify',
      marks: 3,
      stem: 'A solid dissolves in water to give a colourless solution. With aqueous sodium hydroxide there is no precipitate, but on warming a gas is given off that turns damp red litmus blue. With dilute nitric acid and aqueous silver nitrate a white precipitate forms. Identify the compound and justify your answer.',
      markScheme: [
        {
          text: 'The gas turning damp red litmus blue on warming with sodium hydroxide shows the ammonium ion is present',
          marks: 1,
        },
        {
          text: 'The white precipitate with acidified silver nitrate shows the chloride ion is present',
          marks: 1,
        },
        { text: 'The compound is ammonium chloride', marks: 1 },
      ],
      examinerNote: {
        en: 'Two results, two ions, then put them together. Answering "ammonium chloride" without saying which observation showed which ion earns only the final mark.',
        zh: '两个现象、两种离子，再把它们组合起来。只答"氯化铵"而不说明哪个现象对应哪种离子，只能得最后一分。',
      },
    },
  ],
}

export default lesson
