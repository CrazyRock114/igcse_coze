import type { Lesson } from '@/content/types'
import narration from './narration'

const lesson: Lesson = {
  slug: '3-1-formulae-equations',
  subject: '0620',
  syllabus: [
    '0620.3.1.1',
    '0620.3.1.2',
    '0620.3.1.3',
    '0620.3.1.4',
    '0620.3.1.5',
    '0620.3.1.6',
    '0620.3.1.7',
    '0620.3.1.8',
  ],
  tier: 'extended',
  estimatedMinutes: 50,

  title: { en: 'Formulae and balanced equations', zh: '化学式与配平方程式' },
  summary: {
    en: 'Balancing is not guessing coefficients until it looks right. It is making two columns of numbers agree — and here you can see which element disagrees.',
    zh: '配平不是不停试系数直到看着顺眼。它是让两列数字相等——而这里你能看见是哪种元素不相等。',
  },

  objectives: [
    { en: 'State the formulae of the elements and compounds named in the syllabus.', zh: '写出考纲中所列元素与化合物的化学式。' },
    {
      en: 'Define the molecular formula of a compound, and deduce a formula from the numbers of atoms or from a model.',
      zh: '定义化合物的分子式，并由原子数目或模型推导化学式。',
    },
    { en: 'Construct word equations and balanced symbol equations.', zh: '写出文字方程式与配平的符号方程式。' },
    {
      en: 'Define the empirical formula as the simplest whole-number ratio of the atoms. (Extended)',
      zh: '把实验式定义为原子的最简整数比。（Extended）',
    },
    {
      en: 'Deduce the formula of an ionic compound from the charges on its ions. (Extended)',
      zh: '由离子所带电荷推导离子化合物的化学式。（Extended）',
    },
    {
      en: 'Construct symbol equations with state symbols, including ionic equations, and deduce them for unfamiliar reactions. (Extended)',
      zh: '写出带状态符号的方程式（含离子方程式），并为陌生反应推导方程式。（Extended）',
    },
  ],

  glossary: [
    {
      en: 'molecular formula',
      zh: '分子式',
      definition: {
        en: 'The number of atoms of each element in one molecule of a compound. C₂H₄ for ethene.',
        zh: '化合物一个分子中每种元素的原子数目。乙烯为 C₂H₄。',
      },
      syllabus: ['0620.3.1.2'],
    },
    {
      en: 'empirical formula',
      zh: '实验式',
      definition: {
        en: 'The simplest whole-number ratio of the atoms in a compound. CH₂ for ethene — the same substance as C₂H₄, described a different way.',
        zh: '化合物中原子数目的最简整数比。乙烯为 CH₂——与 C₂H₄ 是同一物质的另一种表示。',
      },
      syllabus: ['0620.3.1.5'],
    },
    {
      en: 'state symbol',
      zh: '状态符号',
      definition: {
        en: '(s) solid, (l) liquid, (g) gas, (aq) aqueous — dissolved in water. Part of a complete equation at Extended level.',
        zh: '(s) 固体、(l) 液体、(g) 气体、(aq) 水溶液——溶于水。在 Extended 层次是完整方程式的一部分。',
      },
      syllabus: ['0620.3.1.7'],
    },
    {
      en: 'spectator ion',
      zh: '旁观离子',
      definition: {
        en: 'An ion present before and after a reaction with no change at all. Ionic equations leave them out, which is what makes them shorter than the full equation.',
        zh: '反应前后都存在且毫无变化的离子。离子方程式把它们略去，这正是它比完整方程式简短的原因。',
      },
      syllabus: ['0620.3.1.7'],
    },
  ],

  equations: [
    {
      latex: '\\text{atoms in} = \\text{atoms out}',
      meaning: {
        en: 'The law of conservation of mass, and the only reason equations are balanced at all. Atoms are rearranged in a reaction, never created or destroyed.',
        zh: '质量守恒定律，也是方程式需要配平的唯一原因。反应中原子只是重新排列，绝不会产生或消失。',
      },
      substitute: (r) =>
        `${r['atomsLeft'] ?? 0} \\rightarrow ${r['atomsRight'] ?? 0} \\quad (${r['elementsBalanced'] ?? 0}/${r['elementsTotal'] ?? 0}\\text{ elements})`,
    },
  ],

  sim: {
    primitive: 'balance',
    kernel: '3-1-formulae-equations',
    hint: {
      en: 'The formulae cannot be changed — only the numbers in front. Read the table to see which element is out before touching a slider.',
      zh: '化学式不能改——只能改前面的系数。在动滑块之前，先读表看哪种元素不相等。',
    },
    params: [
      {
        key: 'reaction',
        label: { en: 'Reaction', zh: '反应' },
        unit: '',
        min: 0,
        max: 5,
        step: 1,
        default: 0,
        options: [
          { value: 0, label: { en: 'Hydrogen burning', zh: '氢气燃烧' } },
          { value: 1, label: { en: 'Methane burning', zh: '甲烷燃烧' } },
          { value: 2, label: { en: 'Iron rusting', zh: '铁生锈' } },
          { value: 3, label: { en: 'Making ammonia', zh: '合成氨' } },
          { value: 4, label: { en: 'Metal + acid', zh: '金属 + 酸' } },
          { value: 5, label: { en: 'Neutralisation', zh: '中和反应' } },
        ],
      },
      {
        key: 'a',
        label: { en: 'First reactant', zh: '第一种反应物' },
        unit: '×',
        min: 1,
        max: 8,
        step: 1,
        default: 1,
      },
      {
        key: 'b',
        label: { en: 'Second reactant', zh: '第二种反应物' },
        unit: '×',
        min: 1,
        max: 8,
        step: 1,
        default: 1,
      },
      {
        key: 'c',
        label: { en: 'First product', zh: '第一种生成物' },
        unit: '×',
        min: 1,
        max: 8,
        step: 1,
        default: 1,
      },
      {
        key: 'd',
        label: { en: 'Second product', zh: '第二种生成物' },
        unit: '×',
        min: 1,
        max: 8,
        step: 1,
        default: 1,
      },
    ],
    readouts: [
      {
        key: 'elementsBalanced',
        label: { en: 'Elements balanced', zh: '已配平的元素数' },
        unit: '',
        sigFigs: 2,
        exact: true,
      },
      {
        key: 'elementsTotal',
        label: { en: 'Elements in the equation', zh: '方程式中的元素数' },
        unit: '',
        sigFigs: 2,
        exact: true,
      },
      {
        key: 'atomsLeft',
        label: { en: 'Atoms on the left', zh: '左边原子总数' },
        unit: '',
        sigFigs: 3,
        exact: true,
      },
      {
        key: 'atomsRight',
        label: { en: 'Atoms on the right', zh: '右边原子总数' },
        unit: '',
        sigFigs: 3,
        exact: true,
      },
    ],
    presets: [
      {
        label: { en: 'Hydrogen burning — start here', zh: '氢气燃烧——从这里开始' },
        params: { reaction: 0, a: 1, b: 1, c: 1, d: 1 },
      },
      {
        label: { en: 'Hydrogen burning, balanced', zh: '氢气燃烧，已配平' },
        params: { reaction: 0, a: 2, b: 1, c: 2, d: 1 },
      },
      {
        label: { en: 'Methane burning', zh: '甲烷燃烧' },
        params: { reaction: 1, a: 1, b: 1, c: 1, d: 1 },
      },
      {
        label: { en: 'Iron rusting — the hard one', zh: '铁生锈——较难的一个' },
        params: { reaction: 2, a: 1, b: 1, c: 1, d: 1 },
      },
      {
        label: { en: 'Making ammonia', zh: '合成氨' },
        params: { reaction: 3, a: 1, b: 1, c: 1, d: 1 },
      },
      {
        label: { en: 'Neutralisation', zh: '中和反应' },
        params: { reaction: 5, a: 1, b: 1, c: 1, d: 1 },
      },
    ],
  },

  narration,

  checkpoints: [
    {
      id: '0620-3-1-cp1',
      syllabus: ['0620.3.1.4'],
      tier: 'core',
      commandWord: 'Give',
      marks: 3,
      stem: 'Aluminium reacts with chlorine to form aluminium chloride, AlCl₃. Give the word equation for this reaction and the balanced symbol equation.',
      markScheme: [
        { text: 'aluminium + chlorine → aluminium chloride', marks: 1 },
        { text: 'Al + Cl₂ → AlCl₃ with correct formulae', marks: 1 },
        { text: 'Balanced as 2Al + 3Cl₂ → 2AlCl₃', marks: 1 },
      ],
      examinerNote: {
        en: 'Chlorine as an element is Cl₂, not Cl. Seven non-metal elements are diatomic — H₂, N₂, O₂, F₂, Cl₂, Br₂, I₂ — and writing one of them as a single atom loses the formula mark before any balancing begins.',
        zh: '作为单质的氯是 Cl₂ 而不是 Cl。有七种非金属单质是双原子分子——H₂、N₂、O₂、F₂、Cl₂、Br₂、I₂——把其中之一写成单个原子，在配平之前就已经丢掉了化学式那一分。',
      },
    },
    {
      id: '0620-3-1-cp2',
      syllabus: ['0620.3.1.6'],
      tier: 'extended',
      commandWord: 'Deduce',
      marks: 3,
      stem: 'Deduce the formula of the compound formed between each of these pairs of ions: (i) Na⁺ and O²⁻, (ii) Mg²⁺ and NO₃⁻, (iii) Al³⁺ and SO₄²⁻.',
      markScheme: [
        { text: '(i) Na₂O', marks: 1 },
        { text: '(ii) Mg(NO₃)₂', marks: 1 },
        { text: '(iii) Al₂(SO₄)₃', marks: 1 },
      ],
      examinerNote: {
        en: 'The compound must come out electrically neutral: total positive charge equals total negative charge. When more than one of a group ion is needed, the group goes in brackets — Mg(NO₃)₂, never MgNO₃₂.',
        zh: '化合物必须整体电中性：正电荷总数等于负电荷总数。当需要不止一个原子团离子时，要给原子团加括号——写 Mg(NO₃)₂，绝不能写 MgNO₃₂。',
      },
    },
    {
      id: '0620-3-1-cp3',
      syllabus: ['0620.3.1.5'],
      tier: 'extended',
      commandWord: 'Determine',
      marks: 3,
      stem: 'A compound contains 2.4 g of carbon and 0.6 g of hydrogen. (Ar: C = 12, H = 1.) Determine its empirical formula.',
      markScheme: [
        { text: 'Moles of C = 2.4 / 12 = 0.2; moles of H = 0.6 / 1 = 0.6', marks: 1 },
        { text: 'Ratio C : H = 0.2 : 0.6, divided by the smaller = 1 : 3', marks: 1 },
        { text: 'Empirical formula = CH₃', marks: 1 },
      ],
      examinerNote: {
        en: 'Divide by the smallest of the two numbers, not by the first one. And an empirical formula is the ratio only — it is not required to correspond to a molecule that exists.',
        zh: '要除以两个数中较小的那个，而不是第一个。而且实验式只表示比例——它不必对应某个真实存在的分子。',
      },
    },
    {
      id: '0620-3-1-cp4',
      syllabus: ['0620.3.1.7'],
      tier: 'extended',
      commandWord: 'Give',
      marks: 3,
      stem: 'Silver nitrate solution is added to sodium chloride solution and a white precipitate of silver chloride forms. Give the ionic equation for this reaction, with state symbols, and identify the spectator ions.',
      markScheme: [
        { text: 'Ag⁺(aq) + Cl⁻(aq) → AgCl(s)', marks: 1 },
        { text: 'State symbols correct throughout, including (s) for the precipitate', marks: 1 },
        { text: 'The spectator ions are Na⁺ and NO₃⁻', marks: 1 },
      ],
      examinerNote: {
        en: 'Both the atoms and the total charge must balance: one positive and one negative on the left cancel to zero, matching the neutral solid on the right.',
        zh: '原子和总电荷都必须平衡：左边一个正电荷与一个负电荷相消为零，与右边中性的固体相符。',
      },
    },
    {
      id: '0620-3-1-cp5',
      syllabus: ['0620.3.1.8'],
      tier: 'extended',
      commandWord: 'Deduce',
      marks: 2,
      stem: 'Solid copper(II) carbonate, CuCO₃, decomposes on heating to give solid copper(II) oxide and carbon dioxide gas. Deduce the balanced symbol equation, including state symbols.',
      markScheme: [
        { text: 'CuCO₃ → CuO + CO₂ with correct formulae', marks: 1 },
        { text: 'CuCO₃(s) → CuO(s) + CO₂(g), already balanced, with state symbols', marks: 1 },
      ],
      examinerNote: {
        en: 'Some equations balance as written. Check rather than assuming a coefficient must be added somewhere — an unnecessary one makes the equation wrong.',
        zh: '有些方程式本身就是配平的。要核对，而不要以为一定得在某处加系数——多余的系数会让方程式变错。',
      },
    },
    {
      id: '0620-3-1-cp6',
      syllabus: ['0620.3.1.2', '0620.3.1.3'],
      tier: 'core',
      commandWord: 'State',
      marks: 2,
      stem: 'A molecule of ethanoic acid contains two carbon atoms, four hydrogen atoms and two oxygen atoms. State its molecular formula, and state the total number of atoms in one molecule.',
      markScheme: [
        { text: 'C₂H₄O₂', marks: 1 },
        { text: '8 atoms', marks: 1 },
      ],
      examinerNote: {
        en: 'Ethanoic acid is often written CH₃COOH to show its structure. That is the same molecular formula written to make the functional group visible, not a different compound.',
        zh: '乙酸常写作 CH₃COOH 以显示其结构。那是同一个分子式的另一种写法，目的是让官能团可见，而不是另一种化合物。',
      },
    },
  ],
}

export default lesson
