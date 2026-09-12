import type { Lesson } from '@/content/types'
import narration from './narration'

const lesson: Lesson = {
  slug: '2-4-bonding',
  subject: '0620',
  syllabus: [
    '0620.2.4.1',
    '0620.2.4.2',
    '0620.2.4.3',
    '0620.2.4.4',
    '0620.2.4.5',
    '0620.2.4.6',
    '0620.2.4.7',
    '0620.2.5.1',
    '0620.2.5.2',
    '0620.2.5.3',
    '0620.2.5.4',
    '0620.2.5.5',
  ],
  tier: 'extended',
  estimatedMinutes: 55,

  title: { en: 'Ionic and covalent bonding', zh: '离子键与共价键' },
  summary: {
    en: 'Every atom wants a full outer shell, and there are only two ways to get one: hand electrons over, or share them.',
    zh: '每个原子都想填满最外层，而办法只有两种：把电子交出去，或者共用。',
  },

  objectives: [
    {
      en: 'Describe the formation of cations and anions by the loss and gain of electrons.',
      zh: '描述通过失去和得到电子形成阳离子与阴离子。',
    },
    {
      en: 'State that an ionic bond is a strong electrostatic attraction between oppositely charged ions.',
      zh: '说明离子键是异号离子间的强静电引力。',
    },
    {
      en: 'Describe ionic bond formation between Group I and Group VII elements, and between metals and non-metals generally.',
      zh: '描述第 I 族与第 VII 族元素之间、以及金属与非金属之间离子键的形成。',
    },
    {
      en: 'Describe the giant lattice structure and properties of ionic compounds.',
      zh: '描述离子化合物的巨型晶格结构与性质。',
    },
    { en: 'State that a covalent bond is a shared pair of electrons.', zh: '说明共价键是一对共用电子。' },
    {
      en: 'Draw dot-and-cross diagrams for simple molecules, including those with double and triple bonds.',
      zh: '画出简单分子的电子式，包括含双键和三键的分子。',
    },
    {
      en: 'Explain the properties of ionic and simple molecular compounds in terms of structure and bonding.',
      zh: '用结构与成键解释离子化合物和简单分子化合物的性质。',
    },
  ],

  glossary: [
    {
      en: 'ionic bond',
      zh: '离子键',
      definition: {
        en: 'The strong electrostatic attraction between oppositely charged ions. Not a line on a diagram — a pull between charges.',
        zh: '异号离子之间的强静电引力。它不是图上的一根线，而是电荷之间的吸引。',
      },
      syllabus: ['0620.2.4.2'],
    },
    {
      en: 'covalent bond',
      zh: '共价键',
      definition: {
        en: 'A shared pair of electrons between two atoms. Both atoms count both electrons, so both reach a full outer shell.',
        zh: '两个原子之间共用的一对电子。两个原子都把这两个电子算作自己的，因此都达到满壳层。',
      },
      syllabus: ['0620.2.5.1'],
    },
    {
      en: 'cation',
      zh: '阳离子',
      definition: {
        en: 'A positive ion, formed when an atom loses electrons. Metals form cations.',
        zh: '原子失去电子形成的正离子。金属形成阳离子。',
      },
      syllabus: ['0620.2.4.1'],
    },
    {
      en: 'anion',
      zh: '阴离子',
      definition: {
        en: 'A negative ion, formed when an atom gains electrons. Non-metals form anions.',
        zh: '原子得到电子形成的负离子。非金属形成阴离子。',
      },
      syllabus: ['0620.2.4.1'],
    },
    {
      en: 'lone pair',
      zh: '孤对电子',
      definition: {
        en: 'A pair of outer electrons not involved in bonding. It must still be drawn in a dot-and-cross diagram.',
        zh: '未参与成键的一对最外层电子。在电子式中仍然必须画出。',
      },
      syllabus: ['0620.2.5.2'],
    },
    {
      en: 'giant lattice',
      zh: '巨型晶格',
      definition: {
        en: 'A regular three-dimensional arrangement of billions of alternating positive and negative ions.',
        zh: '数以亿计的正、负离子交替排列形成的规则三维结构。',
      },
      syllabus: ['0620.2.4.5'],
    },
  ],

  equations: [
    {
      latex: '\\mathrm{Na} \\rightarrow \\mathrm{Na^+} + e^-',
      meaning: {
        en: 'A metal loses its outer electrons. The nucleus is untouched, so it is still sodium — just charged.',
        zh: '金属失去最外层电子。原子核毫无变化，所以它仍是钠，只是带了电。',
      },
      substitute: (r) =>
        `${Math.round(r['electronsTransferred'] ?? 0)}\\ \\text{transferred} \\quad ${Math.round(r['sharedPairs'] ?? 0)}\\ \\text{shared pairs} \\quad ${Math.round(r['outerElectronsWhenBonded'] ?? 0)}\\ \\text{in the outer shell}`,
    },
    {
      latex: '\\mathrm{Cl} + e^- \\rightarrow \\mathrm{Cl^-}',
      meaning: {
        en: 'A non-metal gains electrons to complete its outer shell. Seven plus one is eight.',
        zh: '非金属得到电子以填满最外层。七加一等于八。',
      },
    },
    {
      latex: '\\text{outer electrons} = \\text{own} + 2 \\times \\text{shared pairs}',
      meaning: {
        en: 'In a covalent bond both atoms count both shared electrons. That double-counting is what lets sharing work at all.',
        zh: '在共价键中，两个原子都把共用的两个电子算作自己的。正是这种"重复计数"使共用成为可能。',
      },
    },
  ],

  sim: {
    primitive: 'bonding',
    kernel: '2-4-bonding',
    hint: {
      en: 'Pick a compound, then switch from atoms to bonded. Crosses belong to one atom and dots to the other — watch where the crosses end up.',
      zh: '先选一种化合物，再从"原子"切到"成键"。叉属于一个原子、点属于另一个——注意叉最后去了哪里。',
    },
    params: [
      {
        key: 'bonded',
        label: { en: 'Stage', zh: '阶段' },
        unit: '',
        min: 0,
        max: 1,
        step: 1,
        default: 0,
        options: [
          { value: 0, label: { en: 'Separate atoms', zh: '独立原子' } },
          { value: 1, label: { en: 'Bonded', zh: '已成键' } },
        ],
      },
      {
        key: 'species',
        label: { en: 'Compound', zh: '化合物' },
        unit: '',
        min: 0,
        max: 10,
        step: 1,
        default: 0,
        options: [
          { value: 0, label: { en: 'NaCl', zh: 'NaCl' } },
          { value: 1, label: { en: 'MgO', zh: 'MgO' } },
          { value: 2, label: { en: 'MgCl₂', zh: 'MgCl₂' } },
          { value: 3, label: { en: 'H₂', zh: 'H₂' } },
          { value: 4, label: { en: 'HCl', zh: 'HCl' } },
          { value: 5, label: { en: 'H₂O', zh: 'H₂O' } },
          { value: 6, label: { en: 'NH₃', zh: 'NH₃' } },
          { value: 7, label: { en: 'CH₄', zh: 'CH₄' } },
          { value: 8, label: { en: 'O₂', zh: 'O₂' } },
          { value: 9, label: { en: 'CO₂', zh: 'CO₂' } },
          { value: 10, label: { en: 'N₂', zh: 'N₂' } },
        ],
      },
    ],
    readouts: [
      {
        key: 'electronsTransferred',
        label: { en: 'Electrons transferred', zh: '转移的电子数' },
        unit: '',
        sigFigs: 1,
        exact: true,
      },
      {
        key: 'sharedPairs',
        label: { en: 'Shared pairs', zh: '共用电子对数' },
        unit: '',
        sigFigs: 1,
        exact: true,
      },
      {
        key: 'outerElectronsWhenBonded',
        label: { en: 'Outer shell when bonded', zh: '成键后最外层电子数' },
        unit: '',
        sigFigs: 1,
        exact: true,
      },
      { key: 'atoms', label: { en: 'Atoms', zh: '原子数' }, unit: '', sigFigs: 1, exact: true },
    ],
    presets: [
      { label: { en: 'Na + Cl atoms', zh: 'Na + Cl 原子' }, params: { species: 0, bonded: 0 } },
      { label: { en: '→ Na⁺ and Cl⁻', zh: '→ Na⁺ 和 Cl⁻' }, params: { species: 0, bonded: 1 } },
      { label: { en: 'MgCl₂: two chlorines', zh: 'MgCl₂：两个氯' }, params: { species: 2, bonded: 1 } },
      { label: { en: 'Water', zh: '水' }, params: { species: 5, bonded: 1 } },
      { label: { en: 'Methane', zh: '甲烷' }, params: { species: 7, bonded: 1 } },
      { label: { en: 'N₂: a triple bond', zh: 'N₂：三键' }, params: { species: 10, bonded: 1 } },
    ],
  },

  narration,

  checkpoints: [
    {
      id: '0620-2-4-cp1',
      syllabus: ['0620.2.4.2'],
      tier: 'core',
      commandWord: 'Define',
      marks: 2,
      stem: 'Define the term ionic bond.',
      markScheme: [
        { text: 'A strong electrostatic attraction', marks: 1 },
        { text: 'between oppositely charged ions', marks: 1 },
      ],
      examinerNote: {
        en: '"Attraction between ions" is one mark at most — it has to be *oppositely charged* ions, and the attraction is *electrostatic*. Both words are doing work.',
        zh: '只写"离子之间的吸引"最多得一分——必须是*异号*离子，而且吸引是*静电*性的。这两个词都不可少。',
      },
    },
    {
      id: '0620-2-4-cp2',
      syllabus: ['0620.2.4.1', '0620.2.4.6'],
      tier: 'extended',
      commandWord: 'Deduce',
      marks: 1,
      stem: 'Calcium is in Group II and fluorine in Group VII. Deduce the formula of calcium fluoride.',
      options: ['CaF₂', 'CaF', 'Ca₂F', 'Ca₂F₇'],
      answerIndex: 0,
      markScheme: [{ text: 'CaF₂', marks: 1 }],
      examinerNote: {
        en: 'Calcium loses 2 electrons and each fluorine gains 1, so it takes two fluorines to take both. The charges must balance: one 2+ needs two 1−.',
        zh: '钙失去 2 个电子，每个氟得到 1 个，所以需要两个氟才能接收。电荷必须平衡：一个 2+ 需要两个 1−。',
      },
    },
    {
      id: '0620-2-4-cp3',
      syllabus: ['0620.2.4.4', '0620.2.4.7'],
      tier: 'extended',
      commandWord: 'Explain',
      marks: 3,
      stem: 'Sodium chloride has a high melting point and conducts electricity when molten but not when solid. Explain both observations.',
      markScheme: [
        {
          text: 'It has a giant lattice of ions held by strong electrostatic attractions',
          marks: 1,
        },
        {
          text: 'A large amount of energy is needed to overcome all of these attractions, so the melting point is high',
          marks: 1,
        },
        {
          text: 'When molten the ions are free to move and carry charge; in the solid they are held in fixed positions',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'The conduction mark needs the contrast, not just half of it. Say the ions are *free to move* when molten and *fixed* when solid — "the ions move" alone does not explain why the solid fails to conduct.',
        zh: '导电这一分需要对比，不能只说一半。要写熔融时离子*可以自由移动*、固态时离子*被固定*——只写"离子会移动"无法解释固体为什么不导电。',
      },
    },
    {
      id: '0620-2-4-cp4',
      syllabus: ['0620.2.5.1', '0620.2.5.2'],
      tier: 'core',
      commandWord: 'Describe',
      marks: 3,
      stem: 'Describe the bonding in a molecule of ammonia, NH₃, and state how many outer electrons the nitrogen atom has in the molecule.',
      markScheme: [
        {
          text: 'Three covalent bonds, each a shared pair of electrons between nitrogen and a hydrogen',
          marks: 1,
        },
        { text: 'Nitrogen also has one lone pair that is not shared', marks: 1 },
        { text: 'Eight outer electrons: two lone plus three shared pairs counted in full', marks: 1 },
      ],
      examinerNote: {
        en: 'Count shared electrons in full for both atoms. Nitrogen’s eight is 2 lone + 6 from three shared pairs — not 2 + 3.',
        zh: '共用电子对两个原子都要完整计数。氮的八个 = 2 个孤对电子 + 三对共用电子的 6 个——不是 2 + 3。',
      },
    },
    {
      id: '0620-2-4-cp5',
      syllabus: ['0620.2.5.3', '0620.2.5.5'],
      tier: 'extended',
      commandWord: 'Explain',
      marks: 3,
      stem: 'Water boils at 100 °C, but sodium chloride melts at 801 °C. Both contain strong bonds. Explain the difference.',
      markScheme: [
        {
          text: 'Water is a simple molecular substance with weak forces between its molecules',
          marks: 1,
        },
        {
          text: 'Boiling only has to overcome those intermolecular forces, not the covalent bonds within the molecules',
          marks: 1,
        },
        {
          text: 'Sodium chloride is a giant lattice, so melting must overcome strong ionic attractions throughout the structure',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'The whole answer turns on separating forces *between* molecules from bonds *within* them. Saying "water has weak bonds" is wrong and scores nothing — its O–H bonds are strong.',
        zh: '整道题的关键是区分分子*之间*的作用力与分子*内部*的键。写"水的键很弱"是错的，得不到分——它的 O–H 键很强。',
      },
    },
    {
      id: '0620-2-4-cp6',
      syllabus: ['0620.2.5.4'],
      tier: 'extended',
      commandWord: 'State',
      marks: 2,
      stem: 'A nitrogen molecule, N₂, contains a triple bond. State how many electrons are shared between the two atoms, and how many lone pairs each nitrogen atom has.',
      markScheme: [
        { text: 'Six electrons shared (three shared pairs)', marks: 1 },
        { text: 'One lone pair on each nitrogen atom', marks: 1 },
      ],
      examinerNote: {
        en: 'Nitrogen has five outer electrons: three go into the bond and two are left as a lone pair. Forgetting to draw that lone pair is the usual way to lose the mark.',
        zh: '氮最外层有五个电子：三个用于成键，剩下两个构成孤对。忘记画这对孤对电子是最常见的丢分方式。',
      },
    },
  ],
}

export default lesson
