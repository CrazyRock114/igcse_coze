import type { Lesson } from '@/content/types'
import narration from './narration'

const lesson: Lesson = {
  slug: '10-1-water',
  subject: '0620',
  syllabus: [
    '0620.10.1.1',
    '0620.10.1.2',
    '0620.10.1.3',
    '0620.10.1.4',
    '0620.10.1.5',
    '0620.10.1.6',
    '0620.10.1.7',
    '0620.10.2.1',
    '0620.10.2.2',
  ],
  tier: 'core',
  estimatedMinutes: 45,

  title: { en: 'Water and fertilisers', zh: '水与化肥' },
  summary: {
    en: 'Four treatment stages, four contaminants removed — and one left over. What survives all of it is why practical chemistry uses distilled water.',
    zh: '四个处理阶段除去四种杂质，还剩一种。正是这个"漏网之鱼"，让实验化学必须使用蒸馏水。',
  },

  objectives: [
    {
      en: 'Describe chemical tests for water using anhydrous cobalt(II) chloride and copper(II) sulfate.',
      zh: '描述用无水氯化钴与无水硫酸铜检验水。',
    },
    {
      en: 'Describe how to test the purity of water using melting and boiling points.',
      zh: '说明如何用熔点和沸点检验水的纯度。',
    },
    {
      en: 'Explain why distilled water is used in practical chemistry.',
      zh: '解释实验化学中为何使用蒸馏水。',
    },
    {
      en: 'State that natural water may contain dissolved substances, and which are beneficial or harmful.',
      zh: '说明天然水中可能含有溶解物质，并区分有益与有害的。',
    },
    { en: 'Describe the treatment of the domestic water supply.', zh: '描述生活用水的处理过程。' },
    {
      en: 'State that ammonium salts and nitrates are used as fertilisers, and describe NPK fertilisers.',
      zh: '说明铵盐和硝酸盐用作化肥，并说明 NPK 复合肥。',
    },
  ],

  glossary: [
    {
      en: 'distilled water',
      zh: '蒸馏水',
      definition: {
        en: 'Water with the dissolved substances removed by boiling and condensing. Used in practical chemistry because tap water is a solution, not a solvent.',
        zh: '通过蒸馏冷凝除去溶解物质的水。实验化学使用它，因为自来水是溶液而不是溶剂。',
      },
      syllabus: ['0620.10.1.3'],
    },
    {
      en: 'sedimentation',
      zh: '沉降',
      definition: {
        en: 'Letting water stand still so that heavy suspended solids sink under gravity. Nothing is added.',
        zh: '让水静置，使较重的悬浮固体在重力作用下沉降。不加入任何物质。',
      },
      syllabus: ['0620.10.1.7'],
    },
    {
      en: 'chlorination',
      zh: '氯消毒',
      definition: {
        en: 'Adding chlorine to kill bacteria. The stage that makes water fit to drink — which is not the same as pure.',
        zh: '加入氯以杀灭细菌。这是使水可以饮用的阶段——但可饮用不等于纯净。',
      },
      syllabus: ['0620.10.1.7'],
    },
    {
      en: 'NPK fertiliser',
      zh: 'NPK 复合肥',
      definition: {
        en: 'A fertiliser supplying nitrogen, phosphorus and potassium together — for leaves, roots, and flowers and fruit.',
        zh: '同时提供氮、磷、钾的化肥——分别作用于叶、根，以及花和果实。',
      },
      syllabus: ['0620.10.2.2'],
    },
    {
      en: 'anhydrous',
      zh: '无水的',
      definition: {
        en: 'With the water of crystallisation removed. Anhydrous cobalt(II) chloride is blue and turns pink when it meets water.',
        zh: '已除去结晶水的。无水氯化钴是蓝色的，遇水变为粉红色。',
      },
      syllabus: ['0620.10.1.1'],
    },
  ],

  equations: [
    {
      latex: '\\text{pure water: melts at } 0\\,\\degree\\text{C, boils at } 100\\,\\degree\\text{C}',
      meaning: {
        en: 'Exactly, at normal pressure. Anything dissolved lowers the melting point and raises the boiling point, and a mixture melts over a range.',
        zh: '在常压下恰好如此。任何溶解物都会降低熔点、升高沸点，而混合物是在一个范围内熔化。',
      },
      substitute: (r) =>
        `${Math.round(r['stagesDone'] ?? 0)}\\ \\text{stages done} \\quad ${Math.round(r['contaminantsRemaining'] ?? 0)}\\ \\text{contaminants left} \\quad ${(r['fitToDrink'] ?? 0) > 0 ? '\\text{fit to drink}' : '\\text{not yet safe}'}`,
    },
    {
      latex: '\\mathrm{CoCl_2} \\text{ (blue)} + \\text{water} \\rightarrow \\text{pink}',
      meaning: {
        en: 'Tests that water is present. It says nothing about whether that water is pure.',
        zh: '用于检验水的存在。它对这水是否纯净只字未提。',
      },
    },
    {
      latex: '\\mathrm{CuSO_4} \\text{ (white)} + \\text{water} \\rightarrow \\text{blue}',
      meaning: {
        en: 'The same test with a different salt. Anhydrous copper(II) sulfate turns blue as it becomes hydrated again.',
        zh: '同一类检验，换一种盐。无水硫酸铜重新水合时变为蓝色。',
      },
    },
  ],

  sim: {
    primitive: 'ladder',
    kernel: '10-1-water',
    hint: {
      en: 'Advance the stages one at a time and watch the contaminant count fall. Note where it stops for a public supply.',
      zh: '逐个推进处理阶段，看杂质计数下降。注意公共供水在哪一步就停止了。',
    },
    params: [
      {
        key: 'stage',
        label: { en: 'Treatment stages carried out', zh: '已完成的处理阶段' },
        unit: '',
        min: 0,
        max: 5,
        step: 1,
        default: 0,
      },
    ],
    readouts: [
      {
        key: 'contaminantsRemaining',
        label: { en: 'Contaminants left', zh: '剩余杂质数' },
        unit: '',
        sigFigs: 1,
        exact: true,
      },
      {
        key: 'contaminantsRemoved',
        label: { en: 'Contaminants removed', zh: '已除去的杂质数' },
        unit: '',
        sigFigs: 1,
        exact: true,
      },
      {
        key: 'fitToDrink',
        label: { en: 'Fit to drink? (1 = yes)', zh: '可否饮用？（1 = 是）' },
        unit: '',
        sigFigs: 1,
        exact: true,
      },
      {
        key: 'stagesDone',
        label: { en: 'Stages carried out', zh: '已完成阶段数' },
        unit: '',
        sigFigs: 1,
        exact: true,
      },
    ],
    presets: [
      { label: { en: 'Untreated river water', zh: '未处理的河水' }, params: { stage: 0 } },
      { label: { en: 'After filtration: looks clean', zh: '过滤后：看起来干净' }, params: { stage: 3 } },
      { label: { en: 'After chlorination: safe', zh: '氯消毒后：安全' }, params: { stage: 4 } },
      { label: { en: 'Distilled: actually pure', zh: '蒸馏后：真正纯净' }, params: { stage: 5 } },
    ],
  },

  narration,

  checkpoints: [
    {
      id: '0620-10-1-cp1',
      syllabus: ['0620.10.1.7'],
      tier: 'core',
      commandWord: 'Describe',
      marks: 4,
      stem: 'Describe the four stages used to treat water for a domestic supply, and state what each one removes.',
      markScheme: [
        { text: 'Screening: metal grids remove large debris such as sticks and leaves', marks: 1 },
        { text: 'Sedimentation: heavy suspended solids settle out under gravity', marks: 1 },
        { text: 'Filtration: sand and gravel beds trap fine suspended solids', marks: 1 },
        { text: 'Chlorination: chlorine is added to kill bacteria', marks: 1 },
      ],
      examinerNote: {
        en: 'Each stage needs its job as well as its name. "Filtration" alone is not a mark — say what the filter takes out that the previous stage could not.',
        zh: '每个阶段都要写出名称和作用。只写"过滤"不得分——要说明滤层除去了上一阶段无法除去的什么。',
      },
    },
    {
      id: '0620-10-1-cp2',
      syllabus: ['0620.10.1.1', '0620.10.1.2'],
      tier: 'core',
      commandWord: 'Describe',
      marks: 3,
      stem: 'A student has a colourless liquid. Describe how to show that it contains water, and then how to show that it is pure water.',
      markScheme: [
        {
          text: 'Add anhydrous copper(II) sulfate: it turns from white to blue (or cobalt(II) chloride blue to pink)',
          marks: 1,
        },
        { text: 'Measure the boiling point: pure water boils at exactly 100 °C at normal pressure', marks: 1 },
        {
          text: 'Or measure the melting point: pure water melts at exactly 0 °C',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Two questions, two tests. The colour change would work on tea; it shows water is present, not that the sample is pure. Offering it for both halves scores once.',
        zh: '两个问题，两种检验。颜色变化对茶水也有效；它只说明有水，不能说明样品纯净。两问都用它只能得一分。',
      },
    },
    {
      id: '0620-10-1-cp3',
      syllabus: ['0620.10.1.3'],
      tier: 'core',
      commandWord: 'Explain',
      marks: 2,
      stem: 'Explain why distilled water, rather than tap water, is used when making up solutions in practical chemistry.',
      markScheme: [
        {
          text: 'Tap water contains dissolved substances that treatment does not remove',
          marks: 1,
        },
        {
          text: 'These could take part in the reaction or affect the result',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'The issue is not that tap water is dirty — it has been filtered and chlorinated. It is that it is a solution when what you need is a solvent.',
        zh: '问题不在于自来水脏——它已经过滤和消毒。问题在于你需要的是溶剂，而它是一种溶液。',
      },
    },
    {
      id: '0620-10-1-cp4',
      syllabus: ['0620.10.1.4', '0620.10.1.5', '0620.10.1.6'],
      tier: 'core',
      commandWord: 'State',
      marks: 3,
      stem: 'Natural water contains dissolved substances. State one that is beneficial and two that are potentially harmful, giving a reason in each case.',
      markScheme: [
        {
          text: 'Beneficial: dissolved oxygen, needed by aquatic life; or metal compounds needed by the body',
          marks: 1,
        },
        {
          text: 'Harmful: metal compounds that are toxic',
          marks: 1,
        },
        {
          text: 'Harmful: nitrates washed off farmland from fertilisers',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Note that "metal compounds" appears on both lists — some are needed and some are toxic. Naming the category is not enough; say which effect you mean.',
        zh: '注意"金属化合物"两边都出现——有些是人体所需，有些有毒。只写类别不够，要说明你指的是哪种作用。',
      },
    },
    {
      id: '0620-10-1-cp5',
      syllabus: ['0620.10.2.1', '0620.10.2.2'],
      tier: 'core',
      commandWord: 'State',
      marks: 3,
      stem: 'State the three elements supplied by an NPK fertiliser and what each is needed for, and name one type of compound used to supply nitrogen.',
      markScheme: [
        { text: 'Nitrogen for leaf growth, phosphorus for roots, potassium for flowers and fruit', marks: 1 },
        { text: 'Ammonium salts or nitrates supply the nitrogen', marks: 1 },
        {
          text: 'Both are soluble, so plants can take them up through their roots',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Solubility is the point of the compound choice — a fertiliser a plant cannot absorb is useless. It is also why fertilisers wash into rivers.',
        zh: '选择这类化合物的关键就是可溶性——植物无法吸收的肥料毫无用处。这也正是化肥会被冲入河流的原因。',
      },
    },
  ],
}

export default lesson
