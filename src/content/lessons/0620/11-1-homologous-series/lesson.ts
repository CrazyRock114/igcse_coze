import type { Lesson } from '@/content/types'
import narration from './narration'

const lesson: Lesson = {
  slug: '11-1-homologous-series',
  subject: '0620',
  syllabus: [
    '0620.11.1.1',
    '0620.11.1.2',
    '0620.11.1.3',
    '0620.11.1.4',
    '0620.11.1.5',
    '0620.11.1.6',
    '0620.11.2.1',
    '0620.11.2.2',
  ],
  tier: 'core',
  estimatedMinutes: 45,

  title: { en: 'Homologous series and functional groups', zh: '同系物与官能团' },
  summary: {
    en: 'Millions of organic compounds, two questions. How long is the carbon chain, and what is on the end of it?',
    zh: '数百万种有机物，只问两个问题：碳链有多长，末端接了什么？',
  },

  objectives: [
    { en: 'Draw and interpret displayed formulae of molecules.', zh: '画出并解读分子的结构式。' },
    {
      en: 'Write and interpret the general formula of a homologous series.',
      zh: '写出并解读同系物的通式。',
    },
    {
      en: 'Identify a functional group as the atoms that determine chemical properties.',
      zh: '把官能团理解为决定化学性质的原子团。',
    },
    { en: 'Define a homologous series and state its characteristics.', zh: '定义同系物并说出其特征。' },
    {
      en: 'State the type of compound present from its functional group.',
      zh: '由官能团判断化合物属于哪一类。',
    },
    {
      en: 'Name and draw the first four alkanes, alkenes and alcohols, and ethanoic acid.',
      zh: '命名并画出前四种烷烃、烯烃、醇以及乙酸。',
    },
  ],

  glossary: [
    {
      en: 'displayed formula',
      zh: '结构式',
      definition: {
        en: 'A drawing showing every atom and every bond in a molecule. A carbon must have four bonds on it.',
        zh: '画出分子中每个原子与每根键的图示。碳原子必须画满四根键。',
      },
      syllabus: ['0620.11.1.1'],
    },
    {
      en: 'general formula',
      zh: '通式',
      definition: {
        en: 'One formula covering every member of a series, written with n for the number of carbon atoms — alkanes are CₙH₂ₙ₊₂.',
        zh: '用 n 表示碳原子数、涵盖整个系列所有成员的化学式——烷烃是 CₙH₂ₙ₊₂。',
      },
      syllabus: ['0620.11.1.2'],
    },
    {
      en: 'functional group',
      zh: '官能团',
      definition: {
        en: 'The atom or group of atoms that determines the chemical properties of a compound. The chain length barely matters; the group is everything.',
        zh: '决定化合物化学性质的原子或原子团。链的长短影响很小，官能团才是关键。',
      },
      syllabus: ['0620.11.1.3'],
    },
    {
      en: 'homologous series',
      zh: '同系物',
      definition: {
        en: 'A family of compounds with the same functional group and general formula, whose consecutive members differ by CH₂.',
        zh: '官能团与通式相同、相邻成员相差一个 CH₂ 的一族化合物。',
      },
      syllabus: ['0620.11.1.4'],
    },
    {
      en: 'saturated',
      zh: '饱和',
      definition: {
        en: 'Containing only single carbon–carbon bonds. Alkanes are saturated; alkenes, with a C=C, are not.',
        zh: '只含碳碳单键。烷烃是饱和的；含 C=C 的烯烃则不是。',
      },
    },
  ],

  equations: [
    {
      latex: 'M_r = \\sum (\\text{atoms} \\times A_r)',
      meaning: {
        en: 'Relative molecular mass is the sum over every atom in the formula. C is 12, H is 1, O is 16.',
        zh: '相对分子质量是分子式中所有原子的加和。C 为 12，H 为 1，O 为 16。',
      },
      substitute: (r) =>
        `${Math.round(r['carbons'] ?? 0)}×12 + ${Math.round(r['hydrogens'] ?? 0)}×1 + … = ${Math.round(r['relativeMolecularMass'] ?? 0)}`,
    },
    {
      latex: '\\Delta M_r = 14 \\text{ per } \\mathrm{CH_2}',
      meaning: {
        en: 'Each step up a homologous series adds one CH₂ — 12 for the carbon plus 2 for the hydrogens.',
        zh: '同系物每上升一级就增加一个 CH₂——碳 12 加上两个氢 2。',
      },
    },
  ],

  sim: {
    primitive: 'molecule',
    kernel: '11-1-homologous-series',
    hint: {
      en: 'Move the carbon slider to walk up a series; switch family to change only the group on the end. Teal bonds are the functional group.',
      zh: '拖动碳数滑块可沿同系物向上走；切换类别只改变末端的基团。青色的键就是官能团。',
    },
    params: [
      {
        key: 'carbons',
        label: { en: 'Carbon atoms', zh: '碳原子数' },
        unit: '',
        symbol: 'n',
        min: 1,
        max: 4,
        step: 1,
        default: 1,
      },
      {
        key: 'family',
        label: { en: 'Homologous series', zh: '同系物类别' },
        unit: '',
        min: 0,
        max: 3,
        step: 1,
        default: 0,
        options: [
          { value: 0, label: { en: 'Alkane', zh: '烷烃' } },
          { value: 1, label: { en: 'Alkene', zh: '烯烃' } },
          { value: 2, label: { en: 'Alcohol', zh: '醇' } },
          { value: 3, label: { en: 'Carboxylic acid', zh: '羧酸' } },
        ],
      },
    ],
    readouts: [
      // All four are exact rather than measured, so they print as they are.
      { key: 'carbons', label: { en: 'Carbon atoms', zh: '碳原子数' }, unit: '', sigFigs: 2, exact: true },
      { key: 'hydrogens', label: { en: 'Hydrogen atoms', zh: '氢原子数' }, unit: '', sigFigs: 2, exact: true },
      {
        key: 'relativeMolecularMass',
        label: { en: 'Relative molecular mass', zh: '相对分子质量' },
        unit: '',
        symbol: 'M_r',
        sigFigs: 3,
        exact: true,
      },
      {
        key: 'boilingPoint',
        label: { en: 'Boiling point', zh: '沸点' },
        unit: '°C',
        sigFigs: 3,
        exact: true,
      },
    ],
    presets: [
      { label: { en: 'Methane', zh: '甲烷' }, params: { carbons: 1, family: 0 } },
      { label: { en: 'Ethene', zh: '乙烯' }, params: { carbons: 2, family: 1 } },
      { label: { en: 'Ethanol', zh: '乙醇' }, params: { carbons: 2, family: 2 } },
      { label: { en: 'Ethanoic acid', zh: '乙酸' }, params: { carbons: 2, family: 3 } },
      { label: { en: 'Butane', zh: '丁烷' }, params: { carbons: 4, family: 0 } },
    ],
  },

  narration,

  checkpoints: [
    {
      id: '0620-11-1-cp1',
      syllabus: ['0620.11.1.2'],
      tier: 'core',
      commandWord: 'Deduce',
      marks: 1,
      stem: 'An alkane has 6 carbon atoms. Deduce its molecular formula.',
      options: ['C₆H₁₄', 'C₆H₁₂', 'C₆H₆', 'C₆H₁₆'],
      answerIndex: 0,
      markScheme: [{ text: 'C₆H₁₄', marks: 1 }],
      examinerNote: {
        en: 'Use the general formula CₙH₂ₙ₊₂ rather than trying to picture the molecule: 2 × 6 + 2 = 14. C₆H₁₂ is the alkene, which is the trap.',
        zh: '用通式 CₙH₂ₙ₊₂，不要去想分子长什么样：2 × 6 + 2 = 14。C₆H₁₂ 是对应的烯烃，正是设下的陷阱。',
      },
    },
    {
      id: '0620-11-1-cp2',
      syllabus: ['0620.11.1.4', '0620.11.1.5'],
      tier: 'core',
      commandWord: 'Describe',
      marks: 3,
      stem: 'Describe three characteristics of a homologous series.',
      markScheme: [
        { text: 'All members have the same general formula', marks: 1 },
        {
          text: 'Consecutive members differ by CH₂',
          marks: 1,
          alternatives: ['Consecutive members differ by 14 in relative molecular mass'],
        },
        {
          text: 'They have similar chemical properties, because they share a functional group',
          marks: 1,
          alternatives: ['They show a gradual change in physical properties down the series'],
        },
      ],
      examinerNote: {
        en: 'Four characteristics are worth learning as a list; three marks means three of them. "They are similar" scores nothing — say *chemical* properties are similar and *physical* properties change gradually.',
        zh: '这四个特征值得当作清单背下来；三分就写三条。只写"它们相似"得不到分——要说明*化学*性质相似、*物理*性质渐变。',
      },
    },
    {
      id: '0620-11-1-cp3',
      syllabus: ['0620.11.1.3', '0620.11.1.6'],
      tier: 'core',
      commandWord: 'Identify',
      marks: 2,
      stem: 'A compound has the structure CH₃CH₂COOH. Identify the functional group and state the type of compound.',
      markScheme: [
        { text: '–COOH (carboxyl group)', marks: 1 },
        { text: 'Carboxylic acid', marks: 1 },
      ],
      examinerNote: {
        en: 'Give the group, not the whole molecule. Writing "COOH" is enough; writing "CH₃CH₂COOH" answers a question that was not asked and scores nothing.',
        zh: '要写官能团，不是整个分子。写 "COOH" 就够了；写 "CH₃CH₂COOH" 答的是别的问题，得不到分。',
      },
    },
    {
      id: '0620-11-1-cp4',
      syllabus: ['0620.11.2.1', '0620.11.1.1'],
      tier: 'core',
      commandWord: 'State',
      marks: 2,
      stem: 'Ethene and ethane both contain two carbon atoms. State one difference in their displayed formulae and one difference in their molecular formulae.',
      markScheme: [
        {
          text: 'Ethene has a double bond between the two carbon atoms; ethane has a single bond',
          marks: 1,
        },
        { text: 'Ethene is C₂H₄ and ethane is C₂H₆, so ethene has two fewer hydrogen atoms', marks: 1 },
      ],
      examinerNote: {
        en: 'The two differences are linked: the double bond uses up two of carbon’s four bonds, so there are two fewer places for hydrogen. Saying so shows you understand rather than remember.',
        zh: '这两个差别是相连的：双键占用了碳四根键中的两根，所以能接氢的位置少了两个。写出这层联系说明你是理解而非死记。',
      },
    },
    {
      id: '0620-11-1-cp5',
      syllabus: ['0620.11.1.5'],
      tier: 'core',
      commandWord: 'Predict',
      marks: 2,
      stem: 'The boiling points of methane, ethane and propane are −162 °C, −89 °C and −42 °C. Predict the boiling point of butane and justify your answer.',
      markScheme: [
        { text: 'A value between −20 °C and +10 °C', marks: 1 },
        {
          text: 'Boiling point increases down the series, and the increases are getting smaller (73 then 47)',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Butane boils at about 0 °C. A "predict" question wants a number and a reason from the data — a bare number, however close, is one mark at most.',
        zh: '丁烷沸点约为 0 °C。"Predict" 类题要求给出数值并用数据说明理由——只写数字，再准也最多一分。',
      },
    },
  ],
}

export default lesson
