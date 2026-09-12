import type { Lesson } from '@/content/types'
import { placementParams } from '@/lib/assignment'
import { ALL_ITEMS, MAX_TARGETS } from './kernel'
import narration from './narration'

const lesson: Lesson = {
  slug: '6-4-redox',
  subject: '0620',
  syllabus: [
    '0620.6.4.1',
    '0620.6.4.2',
    '0620.6.4.3',
    '0620.6.4.4',
    '0620.6.4.5',
    '0620.6.4.6',
    '0620.6.4.7',
    '0620.6.4.8',
    '0620.6.4.9',
    '0620.6.4.10',
    '0620.6.4.11',
    '0620.6.4.12',
    '0620.6.4.13',
  ],
  tier: 'extended',
  estimatedMinutes: 50,

  title: { en: 'Oxidation and reduction', zh: '氧化与还原' },
  summary: {
    en: 'An oxidising agent is not the thing being oxidised — it is the thing doing the oxidising, and it is reduced itself. The two words point in opposite directions.',
    zh: '氧化剂不是被氧化的那一方——它是使别的物质被氧化的一方，而它自身被还原。这两个词指向相反的方向。',
  },

  objectives: [
    { en: 'Use Roman numerals to indicate the oxidation number of an element in a name.', zh: '用罗马数字表示名称中某元素的氧化数。' },
    {
      en: 'Define redox as simultaneous oxidation and reduction, and define each in terms of oxygen.',
      zh: '把氧化还原定义为氧化与还原同时发生，并用氧来定义两者。',
    },
    { en: 'Identify redox reactions by the gain or loss of oxygen.', zh: '通过得氧或失氧识别氧化还原反应。' },
    {
      en: 'Define oxidation as loss of electrons or an increase in oxidation number, and reduction as the opposite. (Extended)',
      zh: '把氧化定义为失去电子或氧化数升高，还原则相反。（Extended）',
    },
    {
      en: 'Identify redox reactions by electron transfer and by changes in oxidation number. (Extended)',
      zh: '通过电子转移与氧化数变化识别氧化还原反应。（Extended）',
    },
    {
      en: 'Identify redox reactions by the colour changes of common oxidising and reducing agents. (Extended)',
      zh: '通过常见氧化剂与还原剂的颜色变化识别氧化还原反应。（Extended）',
    },
    {
      en: 'Define and identify oxidising and reducing agents. (Extended)',
      zh: '定义并识别氧化剂与还原剂。（Extended）',
    },
  ],

  glossary: [
    {
      en: 'oxidation',
      zh: '氧化',
      definition: {
        en: 'Gain of oxygen, or loss of electrons, or an increase in oxidation number. All three describe the same thing whenever more than one applies.',
        zh: '得到氧，或失去电子，或氧化数升高。当多个定义同时适用时，三者描述的是同一件事。',
      },
      syllabus: ['0620.6.4.3', '0620.6.4.6'],
    },
    {
      en: 'redox reaction',
      zh: '氧化还原反应',
      definition: {
        en: 'One in which oxidation and reduction happen at the same time. They always do — electrons lost by one substance are gained by another.',
        zh: '氧化与还原同时发生的反应。它们总是同时发生——一种物质失去的电子由另一种得到。',
      },
      syllabus: ['0620.6.4.2'],
    },
    {
      en: 'oxidising agent',
      zh: '氧化剂',
      definition: {
        en: 'A substance that oxidises another by taking electrons from it, and is therefore reduced itself.',
        zh: '通过夺取电子使另一种物质被氧化的物质，因此其自身被还原。',
      },
      syllabus: ['0620.6.4.11'],
    },
    {
      en: 'oxidation number',
      zh: '氧化数',
      definition: {
        en: 'A number showing the state of an element in a compound, written in Roman numerals in the name — iron(II) is +2, iron(III) is +3.',
        zh: '表示元素在化合物中所处状态的数字，在名称中用罗马数字书写——铁(II) 为 +2，铁(III) 为 +3。',
      },
      syllabus: ['0620.6.4.1'],
    },
  ],

  equations: [
    {
      latex: '\\mathrm{Mg} \\rightarrow \\mathrm{Mg^{2+}} + 2e^-',
      meaning: {
        en: 'Oxidation: electrons on the right, so they have been lost, and the oxidation number rises from 0 to +2. Magnesium does this whether it meets oxygen or chlorine.',
        zh: '氧化：电子在右边，说明被失去，氧化数由 0 升到 +2。无论遇到氧还是氯，镁都会这样。',
      },
      substitute: (r) =>
        `\\text{correct } ${r['correct'] ?? 0}/${r['total'] ?? 0} \\quad \\text{placed } ${r['placed'] ?? 0}`,
    },
    {
      latex: '\\mathrm{CuO} + \\mathrm{H_2} \\rightarrow \\mathrm{Cu} + \\mathrm{H_2O}',
      meaning: {
        en: 'Both halves at once: the copper oxide loses oxygen and is reduced, the hydrogen gains it and is oxidised. Neither can happen without the other.',
        zh: '两半同时发生：氧化铜失去氧被还原，氢得到氧被氧化。二者缺一不可。',
      },
      substitute: (r) => `${r['placed'] ?? 0}\\ \\text{placed}`,
    },
  ],

  sim: {
    primitive: 'sort',
    kernel: '6-4-redox',
    hint: {
      en: 'In the last exercise, ask what each substance does to its partner — not what happens to it. That is what the name describes.',
      zh: '在最后一个练习中，问每种物质对它的搭档做了什么——而不是它自己怎么了。名称描述的正是前者。',
    },
    params: [
      {
        key: 'stage',
        label: { en: 'Exercise', zh: '练习' },
        unit: '',
        min: 1,
        max: 3,
        step: 1,
        default: 1,
        options: [
          { value: 1, label: { en: 'Oxygen', zh: '以氧判断' } },
          { value: 2, label: { en: 'Electrons', zh: '以电子判断' } },
          { value: 3, label: { en: 'Agents', zh: '氧化剂与还原剂' } },
        ],
      },
      ...placementParams(ALL_ITEMS, MAX_TARGETS),
    ],
    readouts: [
      { key: 'correct', label: { en: 'Correct', zh: '正确数' }, unit: '', sigFigs: 2, exact: true },
      { key: 'placed', label: { en: 'Placed', zh: '已放置' }, unit: '', sigFigs: 2, exact: true },
      {
        key: 'total',
        label: { en: 'Items in this exercise', zh: '本练习条目数' },
        unit: '',
        sigFigs: 2,
        exact: true,
      },
    ],
    presets: [
      { label: { en: 'The oxygen definition', zh: '以氧来定义' }, params: { stage: 1 } },
      { label: { en: 'The electron definition', zh: '以电子来定义' }, params: { stage: 2 } },
      { label: { en: 'Oxidising and reducing agents', zh: '氧化剂与还原剂' }, params: { stage: 3 } },
    ],
  },

  narration,

  checkpoints: [
    {
      id: '0620-6-4-cp1',
      syllabus: ['0620.6.4.4', '0620.6.4.5'],
      tier: 'core',
      commandWord: 'Identify',
      marks: 3,
      stem: 'In the blast furnace: Fe₂O₃ + 3CO → 2Fe + 3CO₂. Identify the substance that is oxidised and the substance that is reduced, and in each case state how you can tell.',
      markScheme: [
        { text: 'The carbon monoxide is oxidised, because it gains oxygen to become carbon dioxide', marks: 1 },
        { text: 'The iron(III) oxide is reduced, because it loses oxygen to become iron', marks: 1 },
        {
          text: 'Both happen in the same reaction, so this is a redox reaction — the oxygen lost by one substance is gained by the other',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Every "is reduced" needs a partner that is oxidised. If your answer names only one, you have not finished reading the equation.',
        zh: '每一个"被还原"都要有一个"被氧化"的搭档。如果答案只写了一个，说明方程式还没读完。',
      },
    },
    {
      id: '0620-6-4-cp2',
      syllabus: ['0620.6.4.6', '0620.6.4.8'],
      tier: 'extended',
      commandWord: 'Explain',
      marks: 3,
      stem: 'Magnesium reacts with chlorine to form magnesium chloride, and there is no oxygen involved. Explain, in terms of electrons, why this is a redox reaction, and state which species is oxidised.',
      markScheme: [
        {
          text: 'Each magnesium atom loses two electrons to form Mg²⁺, which is oxidation — oxidation is loss of electrons',
          marks: 1,
        },
        {
          text: 'Each chlorine atom gains one electron to form Cl⁻, which is reduction — reduction is gain of electrons',
          marks: 1,
        },
        {
          text: 'Both happen together and the electrons lost by the magnesium are exactly those gained by the chlorine, so it is a redox reaction; the magnesium is oxidised',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'This is why the electron definition exists. The oxygen definition cannot classify this reaction at all, and it is a perfectly ordinary redox reaction.',
        zh: '这正是需要电子定义的原因。用氧的定义完全无法归类这个反应，而它是一个再普通不过的氧化还原反应。',
      },
    },
    {
      id: '0620-6-4-cp3',
      syllabus: ['0620.6.4.11', '0620.6.4.13'],
      tier: 'extended',
      commandWord: 'Identify',
      marks: 3,
      stem: 'Chlorine is bubbled through potassium bromide solution: Cl₂ + 2KBr → 2KCl + Br₂. Identify the oxidising agent and the reducing agent, and justify your choice of oxidising agent.',
      markScheme: [
        { text: 'Chlorine is the oxidising agent', marks: 1 },
        { text: 'The bromide ion is the reducing agent', marks: 1 },
        {
          text: 'Chlorine takes electrons from the bromide ions, oxidising them to bromine, and is itself reduced to chloride ions in doing so',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'The oxidising agent is the one that is reduced. Reading the two words as descriptions of what happens to the substance itself gives exactly the wrong answer both times.',
        zh: '氧化剂是被还原的那个。把这两个词理解成"该物质自身发生了什么"，两次都会得到恰好相反的答案。',
      },
    },
    {
      id: '0620-6-4-cp4',
      syllabus: ['0620.6.4.10'],
      tier: 'extended',
      commandWord: 'Predict',
      marks: 3,
      stem: 'Acidified potassium manganate(VII) solution is added to a solution containing iron(II) ions. Predict the colour change observed, and explain what it shows about the manganate(VII) ion.',
      markScheme: [
        { text: 'The purple colour fades to colourless', marks: 1 },
        {
          text: 'The manganate(VII) has acted as an oxidising agent, oxidising the Fe²⁺ ions to Fe³⁺',
          marks: 1,
        },
        {
          text: 'and in doing so it has gained electrons and been reduced itself, which is why its colour is lost',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Purple to colourless is the standard test for a reducing agent being present. State the colour before and after; "it changes colour" earns nothing.',
        zh: '紫色变无色是检验还原剂存在的标准现象。要写出变化前后的颜色；只写"颜色改变了"得不到分。',
      },
    },
    {
      id: '0620-6-4-cp5',
      syllabus: ['0620.6.4.1', '0620.6.4.9'],
      tier: 'extended',
      commandWord: 'Deduce',
      marks: 2,
      stem: 'Iron(II) sulfate solution is converted to iron(III) sulfate solution. Deduce the change in the oxidation number of the iron, and state whether the iron has been oxidised or reduced.',
      markScheme: [
        { text: 'The oxidation number rises from +2 to +3, an increase of one', marks: 1 },
        { text: 'An increase in oxidation number is oxidation, so the iron has been oxidised', marks: 1 },
      ],
      examinerNote: {
        en: 'The Roman numeral in the name is the oxidation number, so the question has already given you both values.',
        zh: '名称中的罗马数字就是氧化数，所以题目已经把两个数值都给出来了。',
      },
    },
    {
      id: '0620-6-4-cp6',
      syllabus: ['0620.6.4.2', '0620.6.4.12'],
      tier: 'extended',
      commandWord: 'Define',
      marks: 2,
      stem: 'Define a redox reaction, and define a reducing agent.',
      markScheme: [
        { text: 'A redox reaction is one in which oxidation and reduction occur at the same time', marks: 1 },
        {
          text: 'A reducing agent is a substance that reduces another substance, and is itself oxidised in the process',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'The second half of the agent definition is worth stating even when not explicitly asked for. It is what shows you have the direction the right way round.',
        zh: '即使题目没有明确要求，也值得写出"剂"定义的后半句。正是它表明你把方向理解对了。',
      },
    },
  ],
}

export default lesson
