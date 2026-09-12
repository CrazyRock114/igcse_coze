import type { Lesson } from '@/content/types'
import narration from './narration'

const lesson: Lesson = {
  slug: '9-4-reactivity-series',
  subject: '0620',
  syllabus: [
    '0620.9.1.1',
    '0620.9.1.2',
    '0620.9.4.1',
    '0620.9.4.2',
    '0620.9.4.3',
    '0620.9.4.4',
    '0620.9.4.5',
  ],
  tier: 'extended',
  estimatedMinutes: 50,

  title: { en: 'The reactivity series', zh: '金属活动性顺序' },
  summary: {
    en: 'Every reagent draws a line across the series. Above the line it reacts, below the line it does not — so you can predict reactions you have never seen.',
    zh: '每种试剂都在活动性顺序上划出一条线。线以上反应，线以下不反应——所以你能预测从未见过的反应。',
  },

  objectives: [
    {
      en: 'Compare the general physical and chemical properties of metals and non-metals.',
      zh: '比较金属与非金属的一般物理性质和化学性质。',
    },
    { en: 'State the order of the reactivity series.', zh: '说出金属活动性顺序。' },
    {
      en: 'Describe the reactions of metals with cold water, steam and dilute acids.',
      zh: '描述金属与冷水、水蒸气和稀酸的反应。',
    },
    {
      en: 'Deduce an order of reactivity from experimental results.',
      zh: '由实验结果推出金属活动性顺序。',
    },
    {
      en: 'Explain relative reactivity in terms of the tendency to form positive ions. (Extended)',
      zh: '用形成正离子的倾向解释相对活动性。（Extended）',
    },
    {
      en: 'Explain the apparent unreactivity of aluminium in terms of its oxide layer. (Extended)',
      zh: '用氧化膜解释铝表观上的不活泼。（Extended）',
    },
  ],

  glossary: [
    {
      en: 'reactivity series',
      zh: '金属活动性顺序',
      definition: {
        en: 'Metals listed in order of how readily they react, most reactive first. Carbon and hydrogen are included as reference points.',
        zh: '按反应难易程度排列的金属顺序，最活泼的在前。碳和氢作为参照点列在其中。',
      },
      syllabus: ['0620.9.4.1'],
    },
    {
      en: 'displacement reaction',
      zh: '置换反应',
      definition: {
        en: 'A more reactive metal pushing a less reactive one out of its compound. It works only downwards in the series.',
        zh: '较活泼的金属把较不活泼的金属从其化合物中置换出来。只能沿活动性顺序向下发生。',
      },
      syllabus: ['0620.9.4.3'],
    },
    {
      en: 'oxide layer',
      zh: '氧化膜',
      definition: {
        en: 'A thin, tough coating of aluminium oxide that seals the metal beneath and stops it reacting.',
        zh: '一层薄而致密的氧化铝，把下面的金属封住，使其无法反应。',
      },
      syllabus: ['0620.9.4.5'],
    },
  ],

  equations: [
    {
      latex: '\\text{metal} + \\text{water} \\rightarrow \\text{metal hydroxide} + \\mathrm{H_2}',
      meaning: {
        en: 'Only the top few metals do this with cold water. Hydrogen is displaced, so it comes off as a gas.',
        zh: '只有最上面几种金属能与冷水这样反应。氢被置换出来，以气体形式放出。',
      },
      substitute: (r) =>
        `\\text{position } ${Math.round(r['position'] ?? 0)} \\quad \\text{reacts with } ${Math.round(r['reactionsOutOf4'] ?? 0)} \\text{ of the 4 reagents}`,
    },
    {
      latex: '\\text{metal} + \\text{acid} \\rightarrow \\text{salt} + \\mathrm{H_2}',
      meaning: {
        en: 'Only for metals above hydrogen in the series. Below it, nothing happens at all.',
        zh: '只适用于排在氢之上的金属。排在氢之下则完全不反应。',
      },
    },
    {
      latex: '\\mathrm{M} \\rightarrow \\mathrm{M^{n+}} + n e^-',
      meaning: {
        en: 'The more readily a metal does this — gives up electrons to become a positive ion — the higher it sits.',
        zh: '金属越容易做到这一点——失去电子变成正离子——它的位置就越高。',
      },
    },
  ],

  sim: {
    primitive: 'ladder',
    kernel: '9-4-reactivity-series',
    hint: {
      en: 'Pick a reagent to draw its line, then move the metal up and down through it. Everything above the line reacts.',
      zh: '先选一种试剂画出它的线，再让金属在线的上下移动。线以上的都反应。',
    },
    params: [
      {
        key: 'reagent',
        label: { en: 'Reagent', zh: '试剂' },
        unit: '',
        min: 0,
        max: 3,
        step: 1,
        default: 0,
        options: [
          { value: 0, label: { en: 'Cold water', zh: '冷水' } },
          { value: 1, label: { en: 'Steam', zh: '水蒸气' } },
          { value: 2, label: { en: 'Dilute HCl', zh: '稀盐酸' } },
          { value: 3, label: { en: 'AgNO₃ solution', zh: '硝酸银溶液' } },
        ],
      },
      {
        key: 'metal',
        label: { en: 'Metal', zh: '金属' },
        unit: '',
        min: 0,
        max: 9,
        step: 1,
        default: 0,
        options: [
          { value: 0, label: { en: 'K', zh: 'K' } },
          { value: 1, label: { en: 'Na', zh: 'Na' } },
          { value: 2, label: { en: 'Ca', zh: 'Ca' } },
          { value: 3, label: { en: 'Mg', zh: 'Mg' } },
          { value: 4, label: { en: 'Al', zh: 'Al' } },
          { value: 5, label: { en: 'Zn', zh: 'Zn' } },
          { value: 6, label: { en: 'Fe', zh: 'Fe' } },
          { value: 7, label: { en: 'Cu', zh: 'Cu' } },
          { value: 8, label: { en: 'Ag', zh: 'Ag' } },
          { value: 9, label: { en: 'Au', zh: 'Au' } },
        ],
      },
    ],
    readouts: [
      {
        key: 'position',
        label: { en: 'Position in the series', zh: '在顺序中的位置' },
        unit: '',
        sigFigs: 2,
        exact: true,
      },
      {
        key: 'reactionsOutOf4',
        label: { en: 'Reacts with (of 4)', zh: '能反应的试剂数（共 4）' },
        unit: '',
        sigFigs: 1,
        exact: true,
      },
      {
        key: 'lastPositionThatReacts',
        label: { en: 'Line sits after position', zh: '线位于第几位之后' },
        unit: '',
        sigFigs: 2,
        exact: true,
      },
      {
        key: 'metalsThatReact',
        label: { en: 'Metals this attacks', zh: '该试剂能侵蚀的金属数' },
        unit: '',
        sigFigs: 2,
        exact: true,
      },
    ],
    presets: [
      { label: { en: 'K + cold water', zh: '钾 + 冷水' }, params: { metal: 0, reagent: 0 } },
      { label: { en: 'Mg: the last to react', zh: '镁：最后一个反应的' }, params: { metal: 3, reagent: 0 } },
      { label: { en: 'Fe + acid', zh: '铁 + 稀酸' }, params: { metal: 6, reagent: 2 } },
      { label: { en: 'Cu + acid: nothing', zh: '铜 + 稀酸：无反应' }, params: { metal: 7, reagent: 2 } },
      { label: { en: 'Cu displaces silver', zh: '铜置换银' }, params: { metal: 7, reagent: 3 } },
      { label: { en: 'Aluminium’s oxide layer', zh: '铝的氧化膜' }, params: { metal: 4, reagent: 2 } },
    ],
  },

  narration,

  checkpoints: [
    {
      id: '0620-9-4-cp1',
      syllabus: ['0620.9.4.2'],
      tier: 'core',
      commandWord: 'Predict',
      marks: 2,
      stem: 'Zinc is above hydrogen in the reactivity series and copper is below it. Predict what you would see when each metal is added to dilute hydrochloric acid.',
      markScheme: [
        { text: 'Zinc: steady bubbling / fizzing as hydrogen is given off', marks: 1 },
        { text: 'Copper: no reaction, no bubbles', marks: 1 },
      ],
      examinerNote: {
        en: '"Copper is less reactive" describes the cause, not the observation. A predict-what-you-see question wants the observation: no bubbles.',
        zh: '写"铜的活动性较低"是在说原因，不是现象。问"你会看到什么"的题要写现象：没有气泡。',
      },
    },
    {
      id: '0620-9-4-cp2',
      syllabus: ['0620.9.4.3'],
      tier: 'core',
      commandWord: 'Deduce',
      marks: 3,
      stem: 'Metal X displaces metal Y from its sulfate solution. Metal Z displaces metal X. Metal Y does not react with dilute acid. Deduce the order of reactivity of X, Y and Z, and state whether each is above or below hydrogen.',
      markScheme: [
        { text: 'Order, most reactive first: Z, X, Y', marks: 1 },
        { text: 'Y is below hydrogen, since it does not react with dilute acid', marks: 1 },
        { text: 'Z and X are above hydrogen', marks: 1 },
      ],
      examinerNote: {
        en: 'Take the displacements one at a time: X above Y, then Z above X, which chains to Z above X above Y. The acid result then places hydrogen between X and Y.',
        zh: '逐条处理置换关系：X 在 Y 之上，Z 在 X 之上，串起来就是 Z > X > Y。再由酸的结果把氢定位在 X 与 Y 之间。',
      },
    },
    {
      id: '0620-9-4-cp3',
      syllabus: ['0620.9.4.4'],
      tier: 'extended',
      commandWord: 'Explain',
      marks: 2,
      stem: 'Explain, in terms of electrons, why potassium is more reactive than iron.',
      markScheme: [
        {
          text: 'Potassium loses its outer electron(s) more readily than iron does',
          marks: 1,
        },
        { text: 'so it forms a positive ion more easily', marks: 1 },
      ],
      examinerNote: {
        en: 'The answer must be about *losing electrons to form positive ions*, not about "having fewer electrons" or "being a better metal". Reactivity of a metal is exactly its willingness to be oxidised.',
        zh: '答案必须围绕*失去电子形成正离子*，而不是"电子更少"或"更像金属"。金属的活动性就是它被氧化的意愿。',
      },
    },
    {
      id: '0620-9-4-cp4',
      syllabus: ['0620.9.4.5'],
      tier: 'extended',
      commandWord: 'Explain',
      marks: 2,
      stem: 'Aluminium is above zinc in the reactivity series, yet aluminium saucepans do not react with the food cooked in them. Explain why.',
      markScheme: [
        {
          text: 'A layer of aluminium oxide forms on the surface as soon as the metal meets air',
          marks: 1,
        },
        {
          text: 'This layer is unreactive and seals the metal beneath, preventing it from reacting',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Aluminium is not actually unreactive — say the oxide layer is what stops it, not that aluminium itself is unreactive. That distinction is the mark.',
        zh: '铝本身并非不活泼——要写是氧化膜阻止了反应，而不是说铝不活泼。这个区分就是得分点。',
      },
    },
    {
      id: '0620-9-4-cp5',
      syllabus: ['0620.9.1.1', '0620.9.1.2'],
      tier: 'core',
      commandWord: 'Compare',
      marks: 3,
      stem: 'Compare the general physical properties of metals and non-metals. Give three differences.',
      markScheme: [
        { text: 'Metals conduct electricity and heat well; non-metals generally do not', marks: 1 },
        {
          text: 'Metals are malleable and ductile; non-metals are brittle when solid',
          marks: 1,
        },
        {
          text: 'Metals generally have high melting and boiling points and are shiny; non-metals generally do not',
          marks: 1,
          alternatives: ['Metals have high density; non-metals generally have low density'],
        },
      ],
      examinerNote: {
        en: 'A compare question needs both sides for each point. "Metals conduct electricity" is half a comparison and scores nothing on its own.',
        zh: '比较题每一点都要写出双方。只写"金属导电"只是半个比较，单独写得不到分。',
      },
    },
  ],
}

export default lesson
