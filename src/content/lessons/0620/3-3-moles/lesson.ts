import type { Lesson } from '@/content/types'
import narration from './narration'

const lesson: Lesson = {
  slug: '3-3-moles',
  subject: '0620',
  syllabus: [
    '0620.3.2.1',
    '0620.3.2.2',
    '0620.3.2.3',
    '0620.3.3.1',
    '0620.3.3.2',
    '0620.3.3.3',
    '0620.3.3.4',
    '0620.3.3.5',
  ],
  tier: 'extended',
  estimatedMinutes: 50,

  title: { en: 'Relative masses, the mole and reacting quantities', zh: '相对质量、摩尔与反应量' },
  summary: {
    en: 'Add more and more magnesium and the yield climbs, then stops dead. The corner is where the oxygen ran out — and where the limiting reactant stops being a rule and becomes a thing you can see.',
    zh: '不断加镁，产量上升，然后突然停住。那个拐点就是氧耗尽的地方——限量反应物在这里不再是一条规则，而成了看得见的事实。',
  },

  objectives: [
    {
      en: 'Describe relative atomic mass Ar as an average over the isotopes of an element.',
      zh: '把相对原子质量 Ar 描述为元素各同位素的平均值。',
    },
    {
      en: 'Define relative molecular mass Mr as the sum of the relative atomic masses in the formula.',
      zh: '把相对分子质量 Mr 定义为化学式中各相对原子质量之和。',
    },
    { en: 'Calculate reacting masses in simple proportions.', zh: '按简单比例计算反应质量。' },
    {
      en: 'State that concentration can be measured in g/dm³ or mol/dm³.',
      zh: '说明浓度可用 g/dm³ 或 mol/dm³ 表示。',
    },
    {
      en: 'State that the mole is the unit of amount of substance, containing 6.02 × 10²³ particles. (Extended)',
      zh: '说明摩尔是物质的量的单位，含 6.02 × 10²³ 个微粒。（Extended）',
    },
    {
      en: 'Use the relationship between amount of substance, mass and molar mass, and the molar gas volume of 24 dm³ at r.t.p. (Extended)',
      zh: '使用物质的量、质量与摩尔质量的关系，以及室温常压下 24 dm³ 的气体摩尔体积。（Extended）',
    },
    {
      en: 'Calculate stoichiometric reacting masses, limiting reactants and concentrations. (Extended)',
      zh: '计算化学计量反应质量、限量反应物与浓度。（Extended）',
    },
  ],

  glossary: [
    {
      en: 'relative atomic mass (Ar)',
      zh: '相对原子质量 (Ar)',
      definition: {
        en: 'The average mass of the atoms of an element, weighted across its isotopes, compared with one twelfth of a carbon-12 atom. Chlorine’s 35.5 is an average, not a rounding.',
        zh: '元素各同位素原子质量的加权平均值，与碳-12 原子质量的十二分之一相比。氯的 35.5 是平均值，不是四舍五入。',
      },
      syllabus: ['0620.3.2.1'],
    },
    {
      en: 'mole',
      zh: '摩尔',
      definition: {
        en: 'The unit of amount of substance. One mole contains 6.02 × 10²³ particles and weighs the Ar or Mr in grams.',
        zh: '物质的量的单位。1 摩尔含 6.02 × 10²³ 个微粒，其质量为 Ar 或 Mr 的克数。',
      },
      syllabus: ['0620.3.3.2'],
    },
    {
      en: 'molar gas volume',
      zh: '气体摩尔体积',
      definition: {
        en: '24 dm³ per mole at room temperature and pressure, for any gas. The identity of the gas makes no difference.',
        zh: '室温常压下任何气体每摩尔占 24 dm³。与是哪种气体无关。',
      },
      syllabus: ['0620.3.3.4'],
    },
    {
      en: 'limiting reactant',
      zh: '限量反应物',
      definition: {
        en: 'The reactant that runs out first and therefore decides how much product forms. Found by dividing each reactant’s moles by its coefficient in the equation.',
        zh: '最先耗尽、因而决定产量的反应物。方法是把各反应物的物质的量除以方程式中的系数。',
      },
      syllabus: ['0620.3.3.5'],
    },
  ],

  equations: [
    {
      latex: 'n = \\dfrac{m}{M_r}',
      meaning: {
        en: 'Amount of substance from mass and molar mass. Rearrange it whichever way the question needs — nearly every calculation in this topic is this one line used twice.',
        zh: '由质量与摩尔质量求物质的量。按题目需要变形即可——本主题几乎每道计算都是这一行用两次。',
      },
      substitute: (r) =>
        `n(\\mathrm{Mg}) = ${r['magnesiumMoles'] ?? 0}\\ \\mathrm{mol} \\quad n(\\mathrm{O_2}) = ${r['oxygenMoles'] ?? 0}\\ \\mathrm{mol}`,
    },
    {
      latex: 'c = \\dfrac{n}{V}',
      meaning: {
        en: 'Concentration in mol/dm³, with the volume in cubic decimetres. A volume given in cm³ has to be divided by 1000 first, and forgetting that is out by a factor of a thousand.',
        zh: '以 mol/dm³ 计的浓度，体积用立方分米。若题目给的是 cm³，必须先除以 1000，忘记这一步会差一千倍。',
      },
      substitute: (r) => `c = ${r['concentration'] ?? 0}\\ \\mathrm{mol/dm^3}`,
    },
    {
      latex: 'V_{\\text{gas}} = 24n \\ \\mathrm{dm^3\\ (r.t.p.)}',
      meaning: {
        en: 'One mole of any gas takes up 24 dm³ at room temperature and pressure. Which gas it is makes no difference at all.',
        zh: '室温常压下任何气体 1 摩尔占 24 dm³。是哪种气体完全没有影响。',
      },
      substitute: (r) => `m(\\mathrm{MgO}) = ${r['productMass'] ?? 0}\\ \\mathrm{g}`,
    },
  ],

  sim: {
    primitive: 'plot2d',
    kernel: '3-3-moles',
    hint: {
      en: 'Push the magnesium up until the graph goes flat. Then add more oxygen and watch the corner move right.',
      zh: '把镁加到图像变平为止。然后加更多的氧，看拐点如何右移。',
    },
    params: [
      {
        key: 'magnesium',
        label: { en: 'Magnesium burnt', zh: '燃烧的镁' },
        unit: 'g',
        min: 0,
        max: 24,
        step: 0.6,
        default: 4.8,
      },
      {
        key: 'oxygen',
        label: { en: 'Oxygen available', zh: '可用的氧' },
        unit: 'g',
        min: 0,
        max: 16,
        step: 0.8,
        default: 3.2,
      },
      {
        key: 'volume',
        label: { en: 'Volume it is dissolved in', zh: '溶解所用体积' },
        unit: 'cm³',
        min: 50,
        max: 1000,
        step: 50,
        default: 250,
      },
    ],
    readouts: [
      {
        key: 'magnesiumMoles',
        label: { en: 'Magnesium', zh: '镁' },
        unit: 'mol',
        sigFigs: 3,
        exact: true,
      },
      {
        key: 'oxygenMoles',
        label: { en: 'Oxygen', zh: '氧' },
        unit: 'mol',
        sigFigs: 3,
        exact: true,
      },
      {
        key: 'productMass',
        label: { en: 'Magnesium oxide made', zh: '生成的氧化镁' },
        unit: 'g',
        sigFigs: 3,
        exact: true,
      },
      {
        key: 'concentration',
        label: { en: 'Concentration of the product', zh: '产物的浓度' },
        unit: 'mol/dm³',
        sigFigs: 3,
        exact: true,
      },
    ],
    presets: [
      {
        label: { en: 'Exactly balanced amounts', zh: '恰好完全反应的用量' },
        params: { magnesium: 4.8, oxygen: 3.2, volume: 250 },
      },
      {
        label: { en: 'Magnesium in excess', zh: '镁过量' },
        params: { magnesium: 18, oxygen: 3.2, volume: 250 },
      },
      {
        label: { en: 'Oxygen in excess', zh: '氧过量' },
        params: { magnesium: 2.4, oxygen: 16, volume: 250 },
      },
      {
        label: { en: 'More oxygen — the corner moves', zh: '更多的氧——拐点移动' },
        params: { magnesium: 18, oxygen: 12.8, volume: 250 },
      },
      {
        label: { en: 'The same amount in 1 dm³', zh: '同样的量溶于 1 dm³' },
        params: { magnesium: 4.8, oxygen: 3.2, volume: 1000 },
      },
      {
        label: { en: 'One mole of magnesium', zh: '1 摩尔镁' },
        params: { magnesium: 24, oxygen: 16, volume: 500 },
      },
    ],
  },

  narration,

  checkpoints: [
    {
      id: '0620-3-3-cp1',
      syllabus: ['0620.3.2.2'],
      tier: 'core',
      commandWord: 'Calculate',
      marks: 2,
      stem: 'Calculate the relative molecular mass of calcium nitrate, Ca(NO₃)₂. (Ar: N = 14, O = 16, Ca = 40.)',
      markScheme: [
        { text: 'Ca = 40, and 2 × (14 + 3 × 16) = 2 × 62 = 124', marks: 1 },
        { text: 'Mr = 40 + 124 = 164', marks: 1 },
      ],
      examinerNote: {
        en: 'The bracket multiplies everything inside it, nitrogen included. An answer of 102 means the 2 was applied only to the oxygens.',
        zh: '括号外的 2 要乘以括号内的全部内容，氮也在内。若答案是 102，说明只把 2 乘到了氧上。',
      },
    },
    {
      id: '0620-3-3-cp2',
      syllabus: ['0620.3.2.1'],
      tier: 'core',
      commandWord: 'Explain',
      marks: 2,
      stem: 'The relative atomic mass of chlorine is 35.5, but no chlorine atom has a mass of 35.5. Explain why.',
      markScheme: [
        {
          text: 'Chlorine exists as two isotopes, of mass number 35 and 37, which are chemically identical but have different masses',
          marks: 1,
        },
        {
          text: 'The relative atomic mass is the average mass of the atoms in a sample, weighted by how common each isotope is — about three quarters are chlorine-35 — so it falls between the two',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'The average has to be weighted. A plain average of 35 and 37 would give 36, and the fact that the answer is nearer 35 tells you chlorine-35 is the more abundant.',
        zh: '这个平均值必须是加权的。35 与 37 的简单平均是 36，而答案更接近 35，这说明氯-35 更为丰富。',
      },
    },
    {
      id: '0620-3-3-cp3',
      syllabus: ['0620.3.3.3', '0620.3.3.5'],
      tier: 'extended',
      commandWord: 'Calculate',
      marks: 4,
      stem: 'Calcium carbonate decomposes on heating: CaCO₃ → CaO + CO₂. Calculate the mass of calcium oxide produced when 25 g of calcium carbonate is fully decomposed. (Ar: C = 12, O = 16, Ca = 40.)',
      markScheme: [
        { text: 'Mr(CaCO₃) = 40 + 12 + 48 = 100', marks: 1 },
        { text: 'Moles of CaCO₃ = 25 / 100 = 0.25 mol', marks: 1 },
        { text: 'The equation is 1 : 1, so 0.25 mol of CaO is formed', marks: 1 },
        { text: 'Mr(CaO) = 56, so mass = 0.25 × 56 = 14 g', marks: 1 },
      ],
      examinerNote: {
        en: 'Four steps, one mark each: Mr in, moles in, ratio across, mass out. Setting the calculation out that way makes the ratio step visible instead of assumed.',
        zh: '四步，每步一分：算 Mr、算物质的量、按比例换算、算质量。这样列式能让"按比例"这一步显现出来，而不是被默认跳过。',
      },
    },
    {
      id: '0620-3-3-cp4',
      syllabus: ['0620.3.3.5'],
      tier: 'extended',
      commandWord: 'Determine',
      marks: 4,
      stem: '4.8 g of magnesium is burnt in 1.6 g of oxygen: 2Mg + O₂ → 2MgO. Determine which reactant is limiting and the mass of magnesium oxide formed. (Ar: O = 16, Mg = 24.)',
      markScheme: [
        { text: 'Moles of Mg = 4.8 / 24 = 0.20 mol; moles of O₂ = 1.6 / 32 = 0.05 mol', marks: 1 },
        {
          text: 'Dividing by the coefficients: 0.20 / 2 = 0.10 for magnesium and 0.05 / 1 = 0.05 for oxygen',
          marks: 1,
        },
        { text: 'Oxygen is limiting, as it gives the smaller value', marks: 1 },
        {
          text: '0.05 mol of O₂ gives 0.10 mol of MgO, and Mr(MgO) = 40, so the mass is 4.0 g',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Dividing by the coefficient is the step that decides the answer. Comparing 0.20 mol with 0.05 mol directly names oxygen too, but by luck — with the numbers reversed the same shortcut gives the wrong reactant.',
        zh: '除以系数这一步决定答案。直接比较 0.20 mol 与 0.05 mol 也能得出氧，但那是碰巧——若数字反过来，同样的捷径就会选错反应物。',
      },
    },
    {
      id: '0620-3-3-cp5',
      syllabus: ['0620.3.3.1', '0620.3.3.3'],
      tier: 'extended',
      commandWord: 'Calculate',
      marks: 3,
      stem: '5.85 g of sodium chloride is dissolved in water and made up to 250 cm³ of solution. Calculate the concentration in mol/dm³. (Ar: Na = 23, Cl = 35.5.)',
      markScheme: [
        { text: 'Mr(NaCl) = 58.5, so moles = 5.85 / 58.5 = 0.100 mol', marks: 1 },
        { text: 'Volume = 250 / 1000 = 0.250 dm³', marks: 1 },
        { text: 'Concentration = 0.100 / 0.250 = 0.400 mol/dm³', marks: 1 },
      ],
      examinerNote: {
        en: 'Convert cm³ to dm³ before dividing. Dividing by 250 instead of 0.250 gives an answer a thousand times too small, and it is the commonest arithmetic error in this topic.',
        zh: '相除之前先把 cm³ 换算成 dm³。除以 250 而不是 0.250，答案会小一千倍，这是本主题最常见的算术错误。',
      },
    },
    {
      id: '0620-3-3-cp6',
      syllabus: ['0620.3.3.4'],
      tier: 'extended',
      commandWord: 'Calculate',
      marks: 3,
      stem: 'Calculate the volume of carbon dioxide, measured at r.t.p., produced when 10 g of calcium carbonate reacts completely with excess hydrochloric acid. CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂. (Ar: C = 12, O = 16, Ca = 40; molar gas volume = 24 dm³.)',
      markScheme: [
        { text: 'Moles of CaCO₃ = 10 / 100 = 0.10 mol', marks: 1 },
        { text: 'The ratio is 1 : 1, so 0.10 mol of CO₂ is produced', marks: 1 },
        { text: 'Volume = 0.10 × 24 = 2.4 dm³', marks: 1 },
      ],
      examinerNote: {
        en: '"Excess hydrochloric acid" means the acid cannot be limiting, so there is no need to check it. Questions say this on purpose, to tell you which reactant to work from.',
        zh: '"盐酸过量"意味着酸不可能是限量反应物，因此无需核对它。题目特意这样写，是在告诉你从哪种反应物入手。',
      },
    },
  ],
}

export default lesson
