import type { Lesson } from '@/content/types'
import narration from './narration'

const lesson: Lesson = {
  slug: '11-6-alcohols-acids',
  subject: '0620',
  syllabus: [
    '0620.11.1.7',
    '0620.11.2.3',
    '0620.11.6.1',
    '0620.11.6.2',
    '0620.11.6.3',
    '0620.11.6.4',
    '0620.11.7.1',
    '0620.11.7.2',
    '0620.11.7.3',
  ],
  tier: 'extended',
  estimatedMinutes: 50,

  title: { en: 'Isomers, alcohols and carboxylic acids', zh: '异构体、醇与羧酸' },
  summary: {
    en: 'Butane and methylpropane are both C₄H₁₀ and are different substances. A molecular formula says what is in the box, not how it is put together.',
    zh: '丁烷和甲基丙烷都是 C₄H₁₀，却是不同的物质。分子式只说明盒子里有什么，不说明它是怎么组装的。',
  },

  objectives: [
    {
      en: 'Define structural isomers as compounds with the same molecular formula but different structures. (Extended)',
      zh: '把结构异构体定义为分子式相同、结构不同的化合物。（Extended）',
    },
    {
      en: 'Name and draw the structural isomers of compounds with up to four carbon atoms. (Extended)',
      zh: '命名并画出四个碳以内化合物的结构异构体。（Extended）',
    },
    {
      en: 'Describe the manufacture of ethanol by fermentation and by the catalytic addition of steam to ethene.',
      zh: '描述用发酵法与乙烯催化加成水蒸气法制乙醇。',
    },
    { en: 'Describe the combustion of ethanol and state its uses.', zh: '描述乙醇的燃烧并说出它的用途。' },
    {
      en: 'Describe the advantages and disadvantages of the two methods of manufacturing ethanol. (Extended)',
      zh: '说明两种制乙醇方法的优缺点。（Extended）',
    },
    {
      en: 'Describe the reactions of ethanoic acid with metals, bases and carbonates.',
      zh: '描述乙酸与金属、碱和碳酸盐的反应。',
    },
    {
      en: 'Describe the formation of ethanoic acid by the oxidation of ethanol, and the formation of an ester from a carboxylic acid and an alcohol. (Extended)',
      zh: '描述乙醇氧化生成乙酸，以及羧酸与醇生成酯。（Extended）',
    },
  ],

  glossary: [
    {
      en: 'structural isomers',
      zh: '结构异构体',
      definition: {
        en: 'Compounds with the same molecular formula but different structures — different arrangements of the same atoms. They are different substances with different properties.',
        zh: '分子式相同但结构不同的化合物——同样的原子有不同的排列方式。它们是性质不同的不同物质。',
      },
      syllabus: ['0620.11.1.7'],
    },
    {
      en: 'fermentation',
      zh: '发酵',
      definition: {
        en: 'Yeast converting glucose into ethanol and carbon dioxide, at about 30 °C in the absence of air.',
        zh: '酵母在约 30 °C 隔绝空气的条件下把葡萄糖转化为乙醇和二氧化碳。',
      },
      syllabus: ['0620.11.6.1'],
    },
    {
      en: 'carboxylic acid',
      zh: '羧酸',
      definition: {
        en: 'An organic compound containing the –COOH group. Ethanoic acid is the one the syllabus uses, and it is a weak acid.',
        zh: '含 –COOH 基团的有机化合物。考纲使用的是乙酸，它是一种弱酸。',
      },
      syllabus: ['0620.11.7.1'],
    },
    {
      en: 'ester',
      zh: '酯',
      definition: {
        en: 'The product of a carboxylic acid and an alcohol, with water also formed. Esters smell of fruit and flowers, which is what they are made for.',
        zh: '羧酸与醇反应的产物，同时生成水。酯有果香和花香，这正是制取它们的目的。',
      },
      syllabus: ['0620.11.7.3'],
    },
  ],

  equations: [
    {
      latex: '\\mathrm{C_6H_{12}O_6} \\rightarrow 2\\mathrm{C_2H_5OH} + 2\\mathrm{CO_2}',
      meaning: {
        en: 'Fermentation: glucose to ethanol and carbon dioxide, with yeast at about 30 °C and no air. Renewable and cheap, but slow and impure.',
        zh: '发酵：葡萄糖生成乙醇和二氧化碳，用酵母、约 30 °C、隔绝空气。可再生且便宜，但慢且不纯。',
      },
      substitute: (r) =>
        `\\mathrm{C}_{${r['carbonAtoms'] ?? 0}}\\mathrm{H}_{${r['hydrogenAtoms'] ?? 0}} \\quad M_r = ${r['relativeMolecularMass'] ?? 0}`,
    },
    {
      latex: '\\mathrm{C_2H_4} + \\mathrm{H_2O} \\rightarrow \\mathrm{C_2H_5OH}',
      meaning: {
        en: 'Catalytic addition: steam added across the double bond of ethene, at about 300 °C and 60 atm. Fast, continuous and pure, but from a finite resource.',
        zh: '催化加成：水蒸气加到乙烯的双键上，约 300 °C、60 atm。快速、连续、纯净，但原料有限。',
      },
      substitute: (r) => `M_r = ${r['relativeMolecularMass'] ?? 0}`,
    },
    {
      latex:
        '\\mathrm{CH_3COOH} + \\mathrm{C_2H_5OH} \\rightleftharpoons \\mathrm{CH_3COOC_2H_5} + \\mathrm{H_2O}',
      meaning: {
        en: 'Ethanoic acid plus ethanol gives ethyl ethanoate and water, with concentrated sulfuric acid as the catalyst. The alcohol names the first half of the ester, the acid the second.',
        zh: '乙酸加乙醇生成乙酸乙酯和水，用浓硫酸作催化剂。酯名称的前半来自醇，后半来自酸。',
      },
      substitute: (r) => `\\text{oxygen atoms} = ${r['oxygenAtoms'] ?? 0}`,
    },
  ],

  sim: {
    primitive: 'molecule',
    kernel: '11-6-alcohols-acids',
    hint: {
      en: 'Switch between the first two and count the atoms each time. The formula underneath does not change — and yet these are different substances.',
      zh: '在前两个之间切换，每次都数一数原子。下方的分子式没有变——然而它们是不同的物质。',
    },
    params: [
      {
        key: 'structure',
        label: { en: 'Structure', zh: '结构' },
        unit: '',
        min: 0,
        max: 3,
        step: 1,
        default: 0,
        options: [
          { value: 0, label: { en: 'butane', zh: '丁烷' } },
          { value: 1, label: { en: 'methylpropane', zh: '甲基丙烷' } },
          { value: 2, label: { en: 'propan-1-ol', zh: '丙-1-醇' } },
          { value: 3, label: { en: 'propan-2-ol', zh: '丙-2-醇' } },
        ],
      },
    ],
    readouts: [
      {
        key: 'carbonAtoms',
        label: { en: 'Carbon atoms', zh: '碳原子数' },
        unit: '',
        sigFigs: 2,
        exact: true,
      },
      {
        key: 'hydrogenAtoms',
        label: { en: 'Hydrogen atoms', zh: '氢原子数' },
        unit: '',
        sigFigs: 2,
        exact: true,
      },
      {
        key: 'oxygenAtoms',
        label: { en: 'Oxygen atoms', zh: '氧原子数' },
        unit: '',
        sigFigs: 2,
        exact: true,
      },
      {
        key: 'relativeMolecularMass',
        label: { en: 'Relative molecular mass', zh: '相对分子质量' },
        unit: '',
        sigFigs: 3,
        exact: true,
      },
    ],
    presets: [
      { label: { en: 'butane', zh: '丁烷' }, params: { structure: 0 } },
      { label: { en: 'methylpropane — same formula', zh: '甲基丙烷——分子式相同' }, params: { structure: 1 } },
      { label: { en: 'propan-1-ol', zh: '丙-1-醇' }, params: { structure: 2 } },
      { label: { en: 'propan-2-ol — same formula', zh: '丙-2-醇——分子式相同' }, params: { structure: 3 } },
    ],
  },

  narration,

  checkpoints: [
    {
      id: '0620-11-6-cp1',
      syllabus: ['0620.11.1.7', '0620.11.2.3'],
      tier: 'extended',
      commandWord: 'Define',
      marks: 3,
      stem: 'Define a structural isomer. Give the names of the two structural isomers with the molecular formula C₄H₁₀, and describe how their structures differ.',
      markScheme: [
        {
          text: 'Structural isomers are compounds with the same molecular formula but different structures',
          marks: 1,
        },
        { text: 'Butane and methylpropane', marks: 1 },
        {
          text: 'Butane has all four carbon atoms in an unbranched chain, while methylpropane has a chain of three carbons with the fourth attached to the middle one',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'The atoms must be counted and found equal — that is what makes them isomers rather than two unrelated compounds. Describing only one structure answers half the question.',
        zh: '必须数清原子并确认相等——正是这一点使它们成为异构体而不是两种无关的化合物。只描述一个结构只回答了一半。',
      },
    },
    {
      id: '0620-11-6-cp2',
      syllabus: ['0620.11.6.1', '0620.11.6.4'],
      tier: 'extended',
      commandWord: 'Compare',
      marks: 4,
      stem: 'Ethanol can be manufactured by fermentation or by the catalytic addition of steam to ethene. Compare the two methods, giving one advantage and one disadvantage of each.',
      markScheme: [
        {
          text: 'Fermentation uses a renewable resource (a plant crop) and runs at low temperature and pressure, so the energy cost and equipment cost are low',
          marks: 1,
        },
        {
          text: 'but it is a slow batch process and produces impure, dilute ethanol that must be distilled',
          marks: 1,
        },
        {
          text: 'Catalytic addition is a fast continuous process giving pure ethanol directly',
          marks: 1,
        },
        {
          text: 'but it needs a high temperature and pressure, so the energy cost is high, and it uses petroleum, which is a finite resource',
          marks: 1,
        },
      ],
      examinerNote: {
        en: '"Batch" and "continuous" are the words the mark scheme wants. Fermentation has to be stopped, emptied and restarted; the other runs without interruption.',
        zh: '评分标准要的是"间歇"与"连续"这两个词。发酵必须停下、清空、重新开始；另一种则不间断运行。',
      },
    },
    {
      id: '0620-11-6-cp3',
      syllabus: ['0620.11.7.1'],
      tier: 'core',
      commandWord: 'Describe',
      marks: 3,
      stem: 'Describe what is observed and name the products when dilute ethanoic acid is added to (i) magnesium ribbon and (ii) sodium carbonate.',
      markScheme: [
        {
          text: '(i) The magnesium fizzes and dissolves; the products are magnesium ethanoate and hydrogen',
          marks: 1,
        },
        {
          text: '(ii) The sodium carbonate fizzes and dissolves; carbon dioxide is given off',
          marks: 1,
        },
        { text: '(ii) The other products are sodium ethanoate and water', marks: 1 },
      ],
      examinerNote: {
        en: 'Both fizz, so "bubbles" alone does not distinguish them. The gas identifies which reaction it is — hydrogen from a metal, carbon dioxide from a carbonate.',
        zh: '两者都会冒泡，所以只写"有气泡"无法区分。气体的种类才能确定是哪个反应——金属放氢气，碳酸盐放二氧化碳。',
      },
    },
    {
      id: '0620-11-6-cp4',
      syllabus: ['0620.11.7.2', '0620.11.7.3'],
      tier: 'extended',
      commandWord: 'Describe',
      marks: 3,
      stem: 'Describe how ethanoic acid can be made from ethanol, and describe how ethyl ethanoate can then be made from that ethanoic acid.',
      markScheme: [
        {
          text: 'Ethanol is oxidised to ethanoic acid, by warming it with an oxidising agent such as acidified potassium manganate(VII) — or slowly by the oxygen in the air',
          marks: 1,
        },
        {
          text: 'The ethanoic acid is warmed with ethanol',
          marks: 1,
        },
        {
          text: 'using concentrated sulfuric acid as a catalyst; ethyl ethanoate and water are formed',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Water is a product of the esterification and is worth writing down. An ester question that produces no water has usually forgotten where the –OH went.',
        zh: '水是酯化反应的产物之一，值得写出来。若酯化题中没有生成水，通常是忘了 –OH 去了哪里。',
      },
    },
    {
      id: '0620-11-6-cp5',
      syllabus: ['0620.11.6.2', '0620.11.6.3'],
      tier: 'core',
      commandWord: 'State',
      marks: 3,
      stem: 'State the products of the complete combustion of ethanol, and state two uses of ethanol.',
      markScheme: [
        { text: 'Carbon dioxide and water', marks: 1 },
        { text: 'As a fuel, on its own or blended with petrol', marks: 1 },
        { text: 'As a solvent, in perfumes, inks or medicines; or in alcoholic drinks', marks: 1 },
      ],
      examinerNote: {
        en: 'Complete combustion means plenty of air. In a limited supply you would get carbon monoxide or soot instead, and the question tells you which case it wants.',
        zh: '完全燃烧意味着空气充足。空气不足时会生成一氧化碳或炭黑，题目会说明问的是哪种情况。',
      },
    },
    {
      id: '0620-11-6-cp6',
      syllabus: ['0620.11.2.3'],
      tier: 'extended',
      commandWord: 'Give',
      marks: 2,
      stem: 'Propanol has two structural isomers. Give the name of each and state which carbon atom the –OH group is attached to in each case.',
      markScheme: [
        { text: 'Propan-1-ol, with the –OH on an end carbon atom', marks: 1 },
        { text: 'Propan-2-ol, with the –OH on the middle carbon atom', marks: 1 },
      ],
      examinerNote: {
        en: 'The number is counted from whichever end gives the smaller value, which is why there is no such thing as propan-3-ol — it would be propan-1-ol counted backwards.',
        zh: '编号从能得到较小数值的一端数起，因此不存在丙-3-醇——那只是从另一端数的丙-1-醇。',
      },
    },
  ],
}

export default lesson
