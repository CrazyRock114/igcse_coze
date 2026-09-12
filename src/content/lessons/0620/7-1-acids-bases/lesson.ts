import type { Lesson } from '@/content/types'
import { formatSigFigs } from '@/lib/units'
import narration from './narration'

const lesson: Lesson = {
  slug: '7-1-acids-bases',
  subject: '0620',
  syllabus: [
    '0620.7.1.1',
    '0620.7.1.2',
    '0620.7.1.3',
    '0620.7.1.4',
    '0620.7.1.5',
    '0620.7.1.6',
    '0620.7.1.7',
    '0620.7.1.8',
    '0620.7.1.9',
    '0620.7.1.10',
    '0620.7.1.11',
    '0620.7.1.12',
  ],
  tier: 'extended',
  estimatedMinutes: 55,

  title: { en: 'Acids, bases and pH', zh: '酸、碱与 pH' },
  summary: {
    en: 'Titrate a strong and a weak acid side by side. Same concentration, very different pH — because "strong" and "concentrated" are not the same thing.',
    zh: '并排滴定强酸与弱酸。浓度相同，pH 却大不相同——因为"强"和"浓"不是一回事。',
  },

  objectives: [
    {
      en: 'Describe the characteristic reactions of acids with metals, bases and carbonates.',
      zh: '描述酸与金属、碱和碳酸盐的特征反应。',
    },
    {
      en: 'Describe the effect of acids and alkalis on litmus, thymolphthalein and methyl orange.',
      zh: '描述酸碱对石蕊、百里酚酞与甲基橙的作用。',
    },
    {
      en: 'State that bases are metal oxides or hydroxides, and that alkalis are soluble bases.',
      zh: '说明碱是金属氧化物或氢氧化物，可溶的碱称为强碱溶液。',
    },
    {
      en: 'State that acidic solutions contain H⁺ ions and alkaline solutions contain OH⁻ ions.',
      zh: '说明酸性溶液含 H⁺，碱性溶液含 OH⁻。',
    },
    {
      en: 'Compare hydrogen ion concentration and neutrality using the pH scale.',
      zh: '用 pH 比较氢离子浓度并判断中性。',
    },
    {
      en: 'Describe the neutralisation reaction between an acid and an alkali.',
      zh: '描述酸与碱的中和反应。',
    },
    {
      en: 'Define acids as proton donors and bases as proton acceptors. (Extended)',
      zh: '把酸定义为质子给体、碱定义为质子受体。（Extended）',
    },
    {
      en: 'Define strong and weak acids in terms of complete and partial dissociation. (Extended)',
      zh: '用完全电离与部分电离定义强酸与弱酸。（Extended）',
    },
    {
      en: 'Describe how to distinguish a strong acid from a weak acid. (Extended)',
      zh: '说明如何区分强酸与弱酸。（Extended）',
    },
    {
      en: 'Explain the pH difference between strong and weak acids of the same concentration. (Extended)',
      zh: '解释同浓度强酸与弱酸的 pH 差异。（Extended）',
    },
  ],

  glossary: [
    {
      en: 'acid',
      zh: '酸',
      definition: {
        en: 'A substance that releases hydrogen ions in aqueous solution. In Brønsted terms, a proton donor.',
        zh: '在水溶液中释放氢离子的物质。按布朗斯特理论，即质子给体。',
      },
      syllabus: ['0620.7.1.6', '0620.7.1.9'],
    },
    {
      en: 'base',
      zh: '碱',
      definition: {
        en: 'A metal oxide or hydroxide that neutralises an acid. In Brønsted terms, a proton acceptor.',
        zh: '能中和酸的金属氧化物或氢氧化物。按布朗斯特理论，即质子受体。',
      },
      syllabus: ['0620.7.1.3', '0620.7.1.9'],
    },
    {
      en: 'alkali',
      zh: '可溶性碱',
      definition: {
        en: 'A base that dissolves in water, giving a solution containing hydroxide ions.',
        zh: '能溶于水的碱，其溶液含氢氧根离子。',
      },
      syllabus: ['0620.7.1.3'],
    },
    {
      en: 'strong acid',
      zh: '强酸',
      definition: {
        en: 'An acid that is fully dissociated in solution — every molecule releases its proton. Nothing to do with how concentrated it is.',
        zh: '在溶液中完全电离的酸——每个分子都释放质子。与浓度无关。',
      },
      syllabus: ['0620.7.1.10'],
    },
    {
      en: 'weak acid',
      zh: '弱酸',
      definition: {
        en: 'An acid that is only partly dissociated, so most molecules stay intact and fewer H⁺ ions are released.',
        zh: '只部分电离的酸，大多数分子保持完整，释放的 H⁺ 较少。',
      },
      syllabus: ['0620.7.1.10'],
    },
    {
      en: 'neutralisation',
      zh: '中和',
      definition: {
        en: 'The reaction of H⁺ with OH⁻ to form water, giving a salt as the other product.',
        zh: 'H⁺ 与 OH⁻ 结合生成水的反应，另一产物为盐。',
      },
      syllabus: ['0620.7.1.8'],
    },
    {
      en: 'pH scale',
      zh: 'pH 值',
      definition: {
        en: 'A measure of hydrogen ion concentration. Each unit is a factor of ten; 7 is neutral.',
        zh: '氢离子浓度的量度。每差一个单位相差十倍；7 为中性。',
      },
      syllabus: ['0620.7.1.7'],
    },
  ],

  equations: [
    {
      latex: '\\mathrm{H^{+}(aq) + OH^{-}(aq) \\rightarrow H_2O(l)}',
      meaning: {
        en: 'The ionic equation for every acid–alkali neutralisation, whichever acid and alkali are used.',
        zh: '任何酸碱中和的离子方程式，与所用的具体酸碱无关。',
      },
      substitute: (r) =>
        `\\text{equivalence at } ${formatSigFigs(r['equivalenceVolume'] ?? 0, 3)}\\ \\text{cm}^3`,
    },
    {
      latex: '\\text{acid} + \\text{base} \\rightarrow \\text{salt} + \\text{water}',
      meaning: {
        en: 'The general pattern. With a carbonate you also get carbon dioxide; with a metal you get hydrogen.',
        zh: '通式。与碳酸盐反应还生成二氧化碳；与金属反应生成氢气。',
      },
      substitute: (r) =>
        `\\text{start: strong pH } ${formatSigFigs(r['strongStartPh'] ?? 0, 2)},\\ \\text{weak pH } ${formatSigFigs(
          r['weakStartPh'] ?? 0,
          2
        )}`,
    },
  ],

  sim: {
    primitive: 'plot2d',
    kernel: '7-1-acids-bases',
    hint: {
      en: 'Both acids are at the same concentration — yet they start three pH units apart. That gap is dissociation.',
      zh: '两种酸浓度完全相同——起始 pH 却相差三个单位。这个差距就是电离程度。',
    },
    params: [
      {
        key: 'acidConcentration',
        label: { en: 'Acid concentration', zh: '酸的浓度' },
        unit: 'mol / dm³',
        min: 0.01,
        max: 1,
        step: 0.01,
        default: 0.1,
      },
      {
        key: 'alkaliConcentration',
        label: { en: 'Alkali concentration', zh: '碱的浓度' },
        unit: 'mol / dm³',
        min: 0.01,
        max: 1,
        step: 0.01,
        default: 0.1,
      },
      {
        key: 'acidVolume',
        label: { en: 'Volume of acid', zh: '酸的体积' },
        unit: 'cm³',
        min: 10,
        max: 50,
        step: 5,
        default: 25,
      },
      {
        key: 'maxVolume',
        label: { en: 'Alkali added (max)', zh: '加入碱的最大体积' },
        unit: 'cm³',
        min: 20,
        max: 100,
        step: 10,
        default: 50,
      },
    ],
    readouts: [
      {
        key: 'equivalenceVolume',
        label: { en: 'Equivalence point', zh: '等当点' },
        unit: 'cm³',
        sigFigs: 3,
      },
      {
        key: 'strongStartPh',
        label: { en: 'Strong acid start pH', zh: '强酸初始 pH' },
        unit: '',
        sigFigs: 2,
      },
      {
        key: 'weakStartPh',
        label: { en: 'Weak acid start pH', zh: '弱酸初始 pH' },
        unit: '',
        sigFigs: 2,
      },
      {
        key: 'weakEquivalencePh',
        label: { en: 'Weak acid pH at equivalence', zh: '弱酸等当点 pH' },
        unit: '',
        sigFigs: 2,
      },
    ],
    presets: [
      {
        label: { en: 'Equal concentrations', zh: '浓度相同' },
        params: { acidConcentration: 0.1, alkaliConcentration: 0.1, acidVolume: 25, maxVolume: 50 },
      },
      {
        label: { en: 'Double the alkali', zh: '碱浓度加倍' },
        params: { acidConcentration: 0.1, alkaliConcentration: 0.2, acidVolume: 25, maxVolume: 50 },
      },
      {
        label: { en: 'Dilute acid', zh: '稀酸' },
        params: { acidConcentration: 0.01, alkaliConcentration: 0.1, acidVolume: 25, maxVolume: 50 },
      },
      {
        label: { en: 'More acid in the flask', zh: '烧瓶中酸更多' },
        params: { acidConcentration: 0.1, alkaliConcentration: 0.1, acidVolume: 50, maxVolume: 100 },
      },
    ],
  },

  narration,

  checkpoints: [
    {
      id: '0620-7-1-cp1',
      syllabus: ['0620.7.1.10', '0620.7.1.12'],
      tier: 'extended',
      commandWord: 'Explain',
      marks: 3,
      stem: 'Hydrochloric acid and ethanoic acid both have a concentration of 0.1 mol / dm³. The hydrochloric acid has a pH of 1 and the ethanoic acid has a pH of about 3. Explain this difference.',
      markScheme: [
        {
          text: 'Hydrochloric acid is a strong acid and is fully dissociated into ions',
          marks: 1,
        },
        {
          text: 'Ethanoic acid is a weak acid and is only partially dissociated',
          marks: 1,
        },
        {
          text: 'so the ethanoic acid has a lower concentration of hydrogen ions, giving a higher pH',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'The concentrations are identical — this question is entirely about dissociation. Answering "the ethanoic acid is more dilute" is the classic error and scores zero.',
        zh: '两者浓度完全相同——本题只考电离程度。答"乙酸更稀"是典型错误，得零分。',
      },
    },
    {
      id: '0620-7-1-cp2',
      syllabus: ['0620.7.1.8'],
      tier: 'core',
      commandWord: 'State',
      marks: 1,
      stem: 'State the ionic equation for the neutralisation of any acid by any alkali.',
      options: [
        'H⁺(aq) + OH⁻(aq) → H₂O(l)',
        'H⁺(aq) + Cl⁻(aq) → HCl(aq)',
        'Na⁺(aq) + OH⁻(aq) → NaOH(aq)',
        'H₂O(l) → H⁺(aq) + OH⁻(aq)',
      ],
      answerIndex: 0,
      markScheme: [{ text: 'H⁺(aq) + OH⁻(aq) → H₂O(l)', marks: 1 }],
      examinerNote: {
        en: 'The spectator ions cancel, which is why one equation covers every acid–alkali pair. State symbols are expected.',
        zh: '旁观离子相互抵消，所以一个方程式适用于所有酸碱组合。需要写状态符号。',
      },
    },
    {
      id: '0620-7-1-cp3',
      syllabus: ['0620.7.1.1'],
      tier: 'core',
      commandWord: 'Describe',
      marks: 3,
      stem: 'Describe what you would observe, and name the products, when dilute hydrochloric acid is added to solid calcium carbonate.',
      markScheme: [
        { text: 'Effervescence / bubbles of gas are seen and the solid dissolves', marks: 1 },
        { text: 'The gas produced is carbon dioxide', marks: 1 },
        {
          text: 'The other products are calcium chloride and water',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Acid + carbonate always gives salt + water + carbon dioxide. Name the salt from the acid used: hydrochloric gives a chloride, sulfuric a sulfate, nitric a nitrate.',
        zh: '酸 + 碳酸盐永远生成盐 + 水 + 二氧化碳。盐由所用的酸决定：盐酸生成氯化物，硫酸生成硫酸盐，硝酸生成硝酸盐。',
      },
    },
    {
      id: '0620-7-1-cp4',
      syllabus: ['0620.7.1.11'],
      tier: 'extended',
      commandWord: 'Suggest',
      marks: 2,
      stem: 'Suggest one experiment, other than measuring pH, that would distinguish a strong acid from a weak acid of the same concentration.',
      markScheme: [
        {
          text: 'Add the same piece of magnesium to each and compare the rate of effervescence',
          marks: 1,
          alternatives: ['compare the electrical conductivity of the two solutions'],
        },
        {
          text: 'The strong acid reacts faster / conducts better, because it has a higher concentration of ions',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Both acids will eventually produce the same volume of hydrogen — the same amount of acid is present. Only the rate differs, because only the H⁺ concentration differs.',
        zh: '两种酸最终生成的氢气体积相同——酸的总量相同。只有速率不同，因为只有 H⁺ 浓度不同。',
      },
    },
  ],
}

export default lesson
