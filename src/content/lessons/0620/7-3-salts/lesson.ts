import type { Lesson } from '@/content/types'
import narration from './narration'

const lesson: Lesson = {
  slug: '7-3-salts',
  subject: '0620',
  syllabus: [
    '0620.7.2.1',
    '0620.7.2.2',
    '0620.7.2.3',
    '0620.7.3.1',
    '0620.7.3.2',
    '0620.7.3.3',
    '0620.7.3.4',
    '0620.7.3.5',
  ],
  tier: 'extended',
  estimatedMinutes: 50,

  title: { en: 'Oxides and preparing salts', zh: '氧化物与盐的制备' },
  summary: {
    en: 'Three ways to make a salt, and the choice is not a matter of taste. Is the salt soluble, and can you filter the leftover base out?',
    zh: '制盐有三条路线，选哪条不是凭喜好：这种盐可溶吗？剩余的碱能过滤掉吗？',
  },

  objectives: [
    {
      en: 'Classify oxides as acidic or basic, related to metallic and non-metallic character.',
      zh: '按金属性与非金属性把氧化物分为酸性和碱性。',
    },
    {
      en: 'Describe amphoteric oxides as reacting with both acids and alkalis. (Extended)',
      zh: '把两性氧化物描述为既能与酸又能与碱反应。（Extended）',
    },
    {
      en: 'Classify aluminium oxide and zinc oxide as amphoteric. (Extended)',
      zh: '把氧化铝与氧化锌归为两性氧化物。（Extended）',
    },
    {
      en: 'Describe the preparation, separation and purification of soluble salts.',
      zh: '描述可溶性盐的制备、分离与提纯。',
    },
    { en: 'Describe the general solubility rules for salts.', zh: '说出盐的一般溶解性规律。' },
    {
      en: 'Define a hydrated substance and an anhydrous substance.',
      zh: '定义结晶水合物与无水物。',
    },
    {
      en: 'Describe the preparation of insoluble salts by precipitation. (Extended)',
      zh: '描述用沉淀法制备难溶性盐。（Extended）',
    },
    { en: 'Define water of crystallisation. (Extended)', zh: '定义结晶水。（Extended）' },
  ],

  glossary: [
    {
      en: 'amphoteric oxide',
      zh: '两性氧化物',
      definition: {
        en: 'An oxide that reacts with both acids and alkalis. Aluminium oxide and zinc oxide are the two to know.',
        zh: '既能与酸又能与碱反应的氧化物。要记住的是氧化铝和氧化锌。',
      },
      syllabus: ['0620.7.2.2'],
    },
    {
      en: 'water of crystallisation',
      zh: '结晶水',
      definition: {
        en: 'Water molecules built into a crystal structure. Hydrated copper sulfate is blue; drive the water off and the anhydrous salt is white.',
        zh: '嵌入晶体结构中的水分子。硫酸铜晶体是蓝色的；把水赶走，无水盐是白色的。',
      },
      syllabus: ['0620.7.3.5'],
    },
    {
      en: 'hydrated',
      zh: '含结晶水的',
      definition: {
        en: 'Containing water of crystallisation. The opposite is anhydrous — the same salt with the water removed.',
        zh: '含有结晶水的。相反的是无水的——同一种盐去掉了水。',
      },
      syllabus: ['0620.7.3.3'],
    },
    {
      en: 'precipitate',
      zh: '沉淀',
      definition: {
        en: 'An insoluble solid that appears when two solutions are mixed. The route to any salt that will not dissolve.',
        zh: '两种溶液混合时析出的不溶固体。这是制取任何难溶盐的途径。',
      },
      syllabus: ['0620.7.3.4'],
    },
    {
      en: 'crystallisation point',
      zh: '结晶点',
      definition: {
        en: 'The point where crystals just begin to form on a cool glass rod. Heat past it and you boil the solution dry, losing the crystal shape.',
        zh: '把冷玻璃棒伸入时刚开始析出晶体的时刻。超过这一点继续加热就会把溶液蒸干，失去晶形。',
      },
      syllabus: ['0620.7.3.1'],
    },
  ],

  equations: [
    {
      latex: '\\text{acid} + \\text{base} \\rightarrow \\text{salt} + \\text{water}',
      meaning: {
        en: 'The reaction behind two of the three routes. Which route you use depends on whether the base can be filtered out afterwards.',
        zh: '三条路线中有两条基于这个反应。用哪一条，取决于事后能否把碱过滤掉。',
      },
      substitute: (r) =>
        `\\text{charge } ${Math.round(r['cationCharge'] ?? 0)}+ \\Rightarrow ${Math.round(r['cationsInFormula'] ?? 0)}:${Math.round(r['anionsInFormula'] ?? 0)} \\quad ${(r['soluble'] ?? 0) > 0 ? '\\text{soluble}' : '\\text{insoluble}'}`,
    },
    {
      latex:
        '\\mathrm{Ba(NO_3)_2} + \\mathrm{Na_2SO_4} \\rightarrow \\mathrm{BaSO_4} + 2\\,\\mathrm{NaNO_3}',
      meaning: {
        en: 'Precipitation. Two soluble salts in, one insoluble salt out — it falls as a solid the instant the ions meet.',
        zh: '沉淀反应。两种可溶盐进去，一种难溶盐出来——离子一相遇它就以固体析出。',
      },
    },
    {
      latex:
        '\\mathrm{CuSO_4 \\cdot 5H_2O} \\xrightarrow{\\text{heat}} \\mathrm{CuSO_4} + 5\\,\\mathrm{H_2O}',
      meaning: {
        en: 'Blue to white as the water of crystallisation is driven off. Add water back and the blue returns — which is the test for water.',
        zh: '结晶水被赶走时由蓝变白。再加水又变回蓝色——这正是水的检验方法。',
      },
    },
  ],

  sim: {
    primitive: 'ladder',
    kernel: '7-3-salts',
    hint: {
      en: 'Pick a salt and the method follows. Watch the steps change when the salt turns out to be insoluble, or the base soluble.',
      zh: '选定一种盐，方法随之确定。注意当盐不溶、或碱可溶时步骤如何变化。',
    },
    params: [
      {
        key: 'cation',
        label: { en: 'Metal ion', zh: '金属离子' },
        unit: '',
        min: 0,
        max: 8,
        step: 1,
        default: 5,
        options: [
          { value: 0, label: { en: 'Na⁺', zh: 'Na⁺' } },
          { value: 1, label: { en: 'K⁺', zh: 'K⁺' } },
          { value: 2, label: { en: 'Mg²⁺', zh: 'Mg²⁺' } },
          { value: 3, label: { en: 'Ca²⁺', zh: 'Ca²⁺' } },
          { value: 4, label: { en: 'Zn²⁺', zh: 'Zn²⁺' } },
          { value: 5, label: { en: 'Cu²⁺', zh: 'Cu²⁺' } },
          { value: 6, label: { en: 'Ba²⁺', zh: 'Ba²⁺' } },
          { value: 7, label: { en: 'Pb²⁺', zh: 'Pb²⁺' } },
          { value: 8, label: { en: 'Ag⁺', zh: 'Ag⁺' } },
        ],
      },
      {
        key: 'anion',
        label: { en: 'Negative ion', zh: '负离子' },
        unit: '',
        min: 0,
        max: 3,
        step: 1,
        default: 2,
        options: [
          { value: 0, label: { en: 'Nitrate', zh: '硝酸盐' } },
          { value: 1, label: { en: 'Chloride', zh: '氯化物' } },
          { value: 2, label: { en: 'Sulfate', zh: '硫酸盐' } },
          { value: 3, label: { en: 'Carbonate', zh: '碳酸盐' } },
        ],
      },
    ],
    readouts: [
      {
        key: 'soluble',
        label: { en: 'Soluble? (1 = yes)', zh: '是否可溶？（1 = 是）' },
        unit: '',
        sigFigs: 1,
        exact: true,
      },
      {
        key: 'cationCharge',
        label: { en: 'Charge on the metal ion', zh: '金属离子电荷' },
        unit: '',
        sigFigs: 1,
        exact: true,
      },
      {
        key: 'cationsInFormula',
        label: { en: 'Metal ions in the formula', zh: '化学式中的金属离子数' },
        unit: '',
        sigFigs: 1,
        exact: true,
      },
      {
        key: 'anionsInFormula',
        label: { en: 'Negative ions in the formula', zh: '化学式中的负离子数' },
        unit: '',
        sigFigs: 1,
        exact: true,
      },
    ],
    presets: [
      { label: { en: 'Copper sulfate: excess solid', zh: '硫酸铜：过量固体法' }, params: { cation: 5, anion: 2 } },
      { label: { en: 'Sodium chloride: titration', zh: '氯化钠：滴定法' }, params: { cation: 0, anion: 1 } },
      { label: { en: 'Barium sulfate: precipitation', zh: '硫酸钡：沉淀法' }, params: { cation: 6, anion: 2 } },
      { label: { en: 'Silver chloride: insoluble', zh: '氯化银：不溶' }, params: { cation: 8, anion: 1 } },
      { label: { en: 'Silver nitrate: soluble', zh: '硝酸银：可溶' }, params: { cation: 8, anion: 0 } },
      { label: { en: 'Calcium carbonate', zh: '碳酸钙' }, params: { cation: 3, anion: 3 } },
    ],
  },

  narration,

  checkpoints: [
    {
      id: '0620-7-3-cp1',
      syllabus: ['0620.7.3.2'],
      tier: 'core',
      commandWord: 'State',
      marks: 1,
      stem: 'Which of these salts is insoluble in water?',
      options: ['Barium sulfate', 'Sodium carbonate', 'Copper(II) nitrate', 'Zinc chloride'],
      answerIndex: 0,
      markScheme: [{ text: 'Barium sulfate', marks: 1 }],
      examinerNote: {
        en: 'Sulfates are soluble except barium, lead and calcium. Sodium salts are always soluble and nitrates always are, so those two can be ruled out immediately.',
        zh: '硫酸盐可溶，钡、铅、钙除外。钠盐永远可溶、硝酸盐永远可溶，所以那两个可以立刻排除。',
      },
    },
    {
      id: '0620-7-3-cp2',
      syllabus: ['0620.7.3.1'],
      tier: 'core',
      commandWord: 'Describe',
      marks: 4,
      stem: 'Describe how you would prepare pure, dry crystals of copper(II) sulfate from copper(II) oxide and dilute sulfuric acid.',
      markScheme: [
        {
          text: 'Warm the dilute sulfuric acid and add copper(II) oxide until no more dissolves',
          marks: 1,
        },
        { text: 'Filter to remove the excess copper(II) oxide', marks: 1 },
        { text: 'Heat the filtrate to the point of crystallisation', marks: 1 },
        { text: 'Leave to cool and crystallise, then dry the crystals between filter papers', marks: 1 },
      ],
      examinerNote: {
        en: 'Never write "evaporate to dryness". Boiling it dry drives off the water of crystallisation and leaves a powder, not crystals — that alone can cost two of these marks.',
        zh: '绝不要写"蒸干"。煮干会赶走结晶水，留下粉末而不是晶体——单是这一点就可能丢掉两分。',
      },
    },
    {
      id: '0620-7-3-cp3',
      syllabus: ['0620.7.3.4'],
      tier: 'extended',
      commandWord: 'Describe',
      marks: 3,
      stem: 'Lead(II) iodide is insoluble. Describe how you would prepare a pure, dry sample of it, naming two solutions you would use.',
      markScheme: [
        {
          text: 'Mix solutions of lead(II) nitrate and potassium iodide, both of which are soluble',
          marks: 1,
        },
        { text: 'Filter to collect the yellow precipitate', marks: 1 },
        { text: 'Wash it with distilled water and dry it', marks: 1 },
      ],
      examinerNote: {
        en: 'The washing step is the one most often left out, and it is the one that makes the sample *pure* — without it the soluble potassium nitrate dries onto the crystals.',
        zh: '洗涤这一步最常被遗漏，而它正是使样品*纯净*的关键——不洗的话，可溶的硝酸钾会干在晶体上。',
      },
    },
    {
      id: '0620-7-3-cp4',
      syllabus: ['0620.7.2.1', '0620.7.2.2', '0620.7.2.3'],
      tier: 'extended',
      commandWord: 'Explain',
      marks: 3,
      stem: 'Classify sodium oxide, sulfur dioxide and zinc oxide as acidic, basic or amphoteric, and explain what amphoteric means.',
      markScheme: [
        { text: 'Sodium oxide is basic; sulfur dioxide is acidic', marks: 1 },
        { text: 'Zinc oxide is amphoteric', marks: 1 },
        { text: 'An amphoteric oxide reacts with both acids and alkalis', marks: 1 },
      ],
      examinerNote: {
        en: 'Metal oxides are basic and non-metal oxides acidic — that gets you the first two. Only aluminium oxide and zinc oxide are amphoteric at this level.',
        zh: '金属氧化物呈碱性、非金属氧化物呈酸性——前两个据此即可判断。本阶段只有氧化铝和氧化锌是两性的。',
      },
    },
    {
      id: '0620-7-3-cp5',
      syllabus: ['0620.7.3.3', '0620.7.3.5'],
      tier: 'extended',
      commandWord: 'Explain',
      marks: 2,
      stem: 'Blue crystals of hydrated copper(II) sulfate turn white when heated. Explain what happens, using the term water of crystallisation.',
      markScheme: [
        {
          text: 'The water of crystallisation — water molecules built into the crystal structure — is driven off by the heat',
          marks: 1,
        },
        {
          text: 'leaving white anhydrous copper(II) sulfate; adding water turns it blue again',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'The colour change is reversible, and that is what makes it a test for water. Saying only that it turns white describes half of a two-way change.',
        zh: '这个颜色变化是可逆的，正因如此它才能作为水的检验方法。只写"变白"只描述了双向变化的一半。',
      },
    },
    {
      id: '0620-7-3-cp6',
      syllabus: ['0620.7.3.1'],
      tier: 'core',
      commandWord: 'Explain',
      marks: 2,
      stem: 'Sodium chloride cannot be prepared by adding excess sodium hydroxide to hydrochloric acid. Explain why, and state what method should be used instead.',
      markScheme: [
        {
          text: 'Sodium hydroxide is soluble, so any excess cannot be filtered off and would contaminate the product',
          marks: 1,
        },
        { text: 'Titration should be used to find the exact volume needed', marks: 1 },
      ],
      examinerNote: {
        en: 'The excess-solid method depends entirely on the base being insoluble. Once you see that, the whole choice between the three routes becomes one question.',
        zh: '过量固体法完全依赖于碱不可溶这一点。看清这一点后，三条路线之间的选择就归结为一个问题。',
      },
    },
  ],
}

export default lesson
