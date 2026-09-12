import type { Lesson } from '@/content/types'
import narration from './narration'

const lesson: Lesson = {
  slug: '2-2-atomic-structure',
  subject: '0620',
  syllabus: [
    '0620.2.1.1',
    '0620.2.2.1',
    '0620.2.2.2',
    '0620.2.2.3',
    '0620.2.2.4',
    '0620.2.2.5',
    '0620.2.3.1',
    '0620.2.3.2',
    '0620.2.3.3',
    '0620.2.3.4',
  ],
  tier: 'extended',
  estimatedMinutes: 50,

  title: { en: 'Atomic structure and isotopes', zh: '原子结构与同位素' },
  summary: {
    en: 'Change the neutrons and you get an isotope. Change the electrons and you get an ion. Change the protons and it is a different element entirely.',
    zh: '改变中子得到同位素，改变电子得到离子，改变质子就是另一种元素了。',
  },

  objectives: [
    {
      en: 'Describe the differences between elements, compounds and mixtures.',
      zh: '说明元素、化合物与混合物的区别。',
    },
    {
      en: 'Describe the atom as a nucleus of protons and neutrons with electrons in shells.',
      zh: '把原子描述为质子中子构成的核与壳层中的电子。',
    },
    {
      en: 'State the relative charges and masses of protons, neutrons and electrons.',
      zh: '说出质子、中子与电子的相对电荷和相对质量。',
    },
    { en: 'Define proton number and mass number.', zh: '定义质子数与质量数。' },
    {
      en: 'Determine the electronic configuration of elements and their ions.',
      zh: '确定元素及其离子的电子排布。',
    },
    {
      en: 'Define isotopes as atoms of the same element with different numbers of neutrons.',
      zh: '把同位素定义为中子数不同的同种元素原子。',
    },
    { en: 'Interpret and use symbols for atoms and ions.', zh: '解读并使用原子与离子的符号。' },
    {
      en: 'State that isotopes of an element have the same chemical properties. (Extended)',
      zh: '说明同位素的化学性质相同。（Extended）',
    },
    {
      en: 'Calculate relative atomic mass from relative abundances. (Extended)',
      zh: '由相对丰度计算相对原子质量。（Extended）',
    },
  ],

  glossary: [
    {
      en: 'proton number',
      zh: '质子数',
      definition: {
        en: 'The number of protons in the nucleus. It defines which element the atom is. Also called the atomic number.',
        zh: '原子核中质子的数目。它决定原子属于哪种元素，也称原子序数。',
      },
      syllabus: ['0620.2.2.3'],
    },
    {
      en: 'mass number',
      zh: '质量数',
      definition: {
        en: 'The total number of protons and neutrons. Electrons are not counted — their mass is negligible.',
        zh: '质子与中子的总数。不计电子——其质量可忽略。',
      },
      syllabus: ['0620.2.2.4'],
    },
    {
      en: 'isotope',
      zh: '同位素',
      definition: {
        en: 'Atoms of the same element with different numbers of neutrons. Same chemistry, different mass.',
        zh: '中子数不同的同种元素原子。化学性质相同，质量不同。',
      },
      syllabus: ['0620.2.3.1'],
    },
    {
      en: 'ion',
      zh: '离子',
      definition: {
        en: 'An atom that has lost or gained electrons, so it carries a charge. The nucleus is unchanged.',
        zh: '失去或得到电子而带电的原子。原子核不变。',
      },
      syllabus: ['0620.2.3.2'],
    },
    {
      en: 'electronic configuration',
      zh: '电子排布',
      definition: {
        en: 'How electrons are arranged in shells, written innermost first — sodium is 2,8,1.',
        zh: '电子在各壳层中的排布，从内层写起——钠是 2,8,1。',
      },
      syllabus: ['0620.2.2.5'],
    },
    {
      en: 'relative atomic mass',
      zh: '相对原子质量',
      definition: {
        en: 'The average mass of an element’s atoms across its isotopes, weighted by abundance. Rarely a whole number.',
        zh: '元素各同位素原子质量按丰度加权的平均值。通常不是整数。',
      },
      syllabus: ['0620.2.3.4'],
    },
  ],

  equations: [
    {
      latex: '\\text{mass number} = \\text{protons} + \\text{neutrons}',
      meaning: {
        en: 'Electrons are never counted — their mass is about 1/1836 of a proton.',
        zh: '绝不计入电子——其质量约为质子的 1/1836。',
      },
      substitute: (r) =>
        `${Math.round(r['protonNumber'] ?? 0)} + ${Math.round(r['neutrons'] ?? 0)} = ${Math.round(r['massNumber'] ?? 0)}`,
    },
    {
      latex: '\\text{charge} = \\text{protons} - \\text{electrons}',
      meaning: {
        en: 'A neutral atom has equal numbers. Losing electrons gives a positive ion, gaining them a negative one.',
        zh: '中性原子两者相等。失电子成正离子，得电子成负离子。',
      },
      substitute: (r) =>
        `${Math.round(r['protonNumber'] ?? 0)} - ${Math.round(r['electrons'] ?? 0)} = ${Math.round(r['netCharge'] ?? 0)}`,
    },
    {
      latex: 'A_r = \\frac{\\sum (\\text{mass} \\times \\text{abundance})}{100}',
      meaning: {
        en: 'Relative atomic mass is a weighted average over isotopes — which is why chlorine is 35.5.',
        zh: '相对原子质量是各同位素的加权平均——这就是氯为 35.5 的原因。',
      },
    },
  ],

  sim: {
    primitive: 'atom',
    kernel: '2-2-atomic-structure',
    hint: {
      en: 'Add neutrons and the electron diagram never moves — that is why isotopes behave identically.',
      zh: '增加中子时电子排布完全不动——这就是同位素化学性质相同的原因。',
    },
    params: [
      {
        key: 'protonNumber',
        label: { en: 'Proton number', zh: '质子数' },
        unit: '',
        symbol: 'Z',
        min: 1,
        max: 20,
        step: 1,
        default: 11,
      },
      {
        key: 'extraNeutrons',
        label: { en: 'Extra neutrons', zh: '额外中子' },
        unit: '',
        min: -4,
        max: 8,
        step: 1,
        default: 0,
      },
      {
        key: 'charge',
        label: { en: 'Charge', zh: '电荷' },
        unit: '',
        min: -2,
        max: 3,
        step: 1,
        default: 0,
      },
    ],
    readouts: [
      // Counts, not measurements — rendered as whole numbers.
      { key: 'massNumber', label: { en: 'Mass number', zh: '质量数' }, unit: '', symbol: 'A', sigFigs: 3, exact: true },
      { key: 'electrons', label: { en: 'Electrons', zh: '电子数' }, unit: '', sigFigs: 3, exact: true },
      { key: 'outerElectrons', label: { en: 'Outer shell', zh: '最外层电子' }, unit: '', sigFigs: 2, exact: true },
      { key: 'group', label: { en: 'Group', zh: '族' }, unit: '', sigFigs: 2, exact: true },
    ],
    presets: [
      { label: { en: 'Sodium atom', zh: '钠原子' }, params: { protonNumber: 11, extraNeutrons: 0, charge: 0 } },
      { label: { en: 'Sodium ion Na⁺', zh: '钠离子 Na⁺' }, params: { protonNumber: 11, extraNeutrons: 0, charge: 1 } },
      { label: { en: 'Chloride ion Cl⁻', zh: '氯离子 Cl⁻' }, params: { protonNumber: 17, extraNeutrons: 0, charge: -1 } },
      { label: { en: 'Carbon-14', zh: '碳 14' }, params: { protonNumber: 6, extraNeutrons: 2, charge: 0 } },
      { label: { en: 'Argon: full shell', zh: '氩：满壳层' }, params: { protonNumber: 18, extraNeutrons: 0, charge: 0 } },
    ],
  },

  narration,

  checkpoints: [
    {
      id: '0620-2-2-cp1',
      syllabus: ['0620.2.2.5'],
      tier: 'core',
      commandWord: 'State',
      marks: 1,
      stem: 'An atom has 17 protons and 18 neutrons. State its electronic configuration.',
      options: ['2,8,7', '2,8,8', '2,8,8,1', '2,8,18,7'],
      answerIndex: 0,
      markScheme: [{ text: '2,8,7', marks: 1 }],
      examinerNote: {
        en: 'A neutral atom has as many electrons as protons, so 17 electrons — the neutrons are irrelevant to the configuration. Fill 2, then 8, leaving 7.',
        zh: '中性原子电子数等于质子数，即 17 个电子——中子与电子排布无关。先填 2，再填 8，剩下 7。',
      },
    },
    {
      id: '0620-2-2-cp2',
      syllabus: ['0620.2.3.1', '0620.2.3.3'],
      tier: 'extended',
      commandWord: 'Explain',
      marks: 3,
      stem: 'Chlorine-35 and chlorine-37 are isotopes. Explain what this means and why they have identical chemical properties.',
      markScheme: [
        {
          text: 'They are atoms of the same element, so they have the same number of protons',
          marks: 1,
        },
        { text: 'but different numbers of neutrons, giving different mass numbers', marks: 1 },
        {
          text: 'Chemical properties depend on the electron arrangement, which is the same for both',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'The third mark is the one most often missed. Saying they "have the same electrons" is not enough — say that chemistry is determined by electron arrangement.',
        zh: '第三分最容易丢。只写"电子数相同"不够——要说明化学性质由电子排布决定。',
      },
    },
    {
      id: '0620-2-2-cp3',
      syllabus: ['0620.2.3.4'],
      tier: 'extended',
      commandWord: 'Calculate',
      marks: 3,
      stem: 'A sample of chlorine contains 75% chlorine-35 and 25% chlorine-37. Calculate the relative atomic mass of chlorine.',
      markScheme: [
        { text: 'Uses (35 × 75) + (37 × 25)', marks: 1 },
        { text: 'Divides by 100', marks: 1 },
        { text: '35.5', marks: 1 },
      ],
      examinerNote: {
        en: 'A weighted average, not a simple mean. Averaging 35 and 37 to get 36 ignores the abundances and scores nothing.',
        zh: '这是加权平均，不是简单平均。把 35 和 37 平均得到 36 忽略了丰度，得不到分。',
      },
    },
    {
      id: '0620-2-2-cp4',
      syllabus: ['0620.2.2.2'],
      tier: 'core',
      commandWord: 'Describe',
      marks: 2,
      stem: 'A sodium atom loses one electron to form a sodium ion. Describe how the ion differs from the atom.',
      markScheme: [
        {
          text: 'The ion has one fewer electron than the atom, so it has a charge of 1+',
          marks: 1,
        },
        {
          text: 'The nucleus is unchanged — the numbers of protons and neutrons are the same',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Forming an ion never changes the nucleus. If the proton number changed it would be a different element, not an ion.',
        zh: '形成离子绝不改变原子核。若质子数变了，那就是另一种元素，而不是离子。',
      },
    },
  ],
}

export default lesson
