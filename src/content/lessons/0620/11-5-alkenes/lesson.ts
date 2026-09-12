import type { Lesson } from '@/content/types'
import narration from './narration'

const lesson: Lesson = {
  slug: '11-5-alkenes',
  subject: '0620',
  syllabus: [
    '0620.11.4.1',
    '0620.11.4.2',
    '0620.11.4.3',
    '0620.11.4.4',
    '0620.11.5.1',
    '0620.11.5.2',
    '0620.11.5.3',
    '0620.11.5.4',
    '0620.11.5.5',
    '0620.11.5.6',
  ],
  tier: 'extended',
  estimatedMinutes: 50,

  title: { en: 'Alkanes and alkenes: addition and substitution', zh: '烷烃与烯烃：加成与取代' },
  summary: {
    en: 'Put the same reagent to a saturated molecule and an unsaturated one. One does nothing; the other opens its double bond and swallows the reagent whole.',
    zh: '把同一种试剂分别加给饱和分子与不饱和分子。前者毫无反应，后者打开双键把试剂整个吞下。',
  },

  objectives: [
    {
      en: 'State that alkanes contain only single covalent bonds and are saturated.',
      zh: '说明烷烃只含单键、属于饱和烃。',
    },
    {
      en: 'Describe alkanes as generally unreactive except in combustion.',
      zh: '说明烷烃除燃烧外一般不活泼。',
    },
    {
      en: 'State that a substitution reaction replaces one atom or group with another. (Extended)',
      zh: '说明取代反应是一个原子或基团被另一个替换。（Extended）',
    },
    {
      en: 'Describe the substitution of alkanes with chlorine in ultraviolet light. (Extended)',
      zh: '描述烷烃在紫外光下与氯的取代反应。（Extended）',
    },
    {
      en: 'State that alkenes contain a C=C double bond and are unsaturated.',
      zh: '说明烯烃含碳碳双键、属于不饱和烃。',
    },
    {
      en: 'Describe the manufacture of alkenes by cracking, and why it is done.',
      zh: '描述用裂化法制取烯烃，并说明其原因。',
    },
    { en: 'Describe the bromine water test for unsaturation.', zh: '描述用溴水检验不饱和烃。' },
    {
      en: 'State that an addition reaction gives only one product. (Extended)',
      zh: '说明加成反应只生成一种产物。（Extended）',
    },
    {
      en: 'Describe the addition reactions of alkenes with bromine, hydrogen and steam. (Extended)',
      zh: '描述烯烃与溴、氢气和水蒸气的加成反应。（Extended）',
    },
  ],

  glossary: [
    {
      en: 'unsaturated',
      zh: '不饱和',
      definition: {
        en: 'Containing at least one carbon–carbon double bond, so more atoms can still be added.',
        zh: '含有至少一个碳碳双键，因此还能再加上原子。',
      },
      syllabus: ['0620.11.5.1'],
    },
    {
      en: 'addition reaction',
      zh: '加成反应',
      definition: {
        en: 'A reaction in which a double bond opens and a reagent adds across it, giving a single product.',
        zh: '双键打开、试剂加成到两端的反应，只生成一种产物。',
      },
      syllabus: ['0620.11.5.5'],
    },
    {
      en: 'substitution reaction',
      zh: '取代反应',
      definition: {
        en: 'A reaction in which one atom or group is replaced by another. The displaced atom leaves as a second product.',
        zh: '一个原子或基团被另一个替换的反应。被替换下来的原子成为第二种产物。',
      },
      syllabus: ['0620.11.4.3'],
    },
    {
      en: 'cracking',
      zh: '裂化',
      definition: {
        en: 'Breaking long-chain alkanes into shorter alkanes and alkenes, using heat and a catalyst.',
        zh: '在加热和催化剂作用下把长链烷烃断裂成较短的烷烃和烯烃。',
      },
      syllabus: ['0620.11.5.2'],
    },
  ],

  equations: [
    {
      latex: '\\mathrm{C_2H_4} + \\mathrm{Br_2} \\rightarrow \\mathrm{C_2H_4Br_2}',
      meaning: {
        en: 'Addition: the whole reagent joins the molecule, so nothing appears on the right except the single product.',
        zh: '加成：整个试剂并入分子，右边除了唯一的产物什么都没有。',
      },
      substitute: (r) =>
        `M_r = ${Math.round(r['relativeMolecularMass'] ?? 0)} \\quad ${Math.round(r['productMolecules'] ?? 0)}\\ \\text{product molecules}`,
    },
    {
      latex: '\\mathrm{CH_4} + \\mathrm{Cl_2} \\xrightarrow{\\text{UV}} \\mathrm{CH_3Cl} + \\mathrm{HCl}',
      meaning: {
        en: 'Substitution: one hydrogen is swapped out, and it leaves as hydrogen chloride — a second product.',
        zh: '取代：一个氢被换下，并以氯化氢的形式离开——这就是第二种产物。',
      },
    },
    {
      latex: '\\mathrm{C_{10}H_{22}} \\rightarrow \\mathrm{C_8H_{18}} + \\mathrm{C_2H_4}',
      meaning: {
        en: 'Cracking: a long alkane breaks into a shorter alkane and an alkene. The atoms must balance on both sides.',
        zh: '裂化：长链烷烃断裂成较短的烷烃和一个烯烃。两边原子数必须配平。',
      },
    },
  ],

  sim: {
    primitive: 'molecule',
    kernel: '11-5-alkenes',
    hint: {
      en: 'Pick a reagent, then flip between alkane and alkene with everything else held still. Watch the product molecule count.',
      zh: '先选一种试剂，再在烷烃与烯烃之间切换，其余条件不变。注意产物分子数的变化。',
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
        default: 2,
      },
      {
        key: 'family',
        label: { en: 'Hydrocarbon', zh: '烃的类别' },
        unit: '',
        min: 0,
        max: 1,
        step: 1,
        default: 1,
        options: [
          { value: 0, label: { en: 'Alkane (saturated)', zh: '烷烃（饱和）' } },
          { value: 1, label: { en: 'Alkene (unsaturated)', zh: '烯烃（不饱和）' } },
        ],
      },
      {
        key: 'reagent',
        label: { en: 'Reagent', zh: '试剂' },
        unit: '',
        min: 0,
        max: 4,
        step: 1,
        default: 0,
        options: [
          { value: 0, label: { en: 'None', zh: '不加' } },
          { value: 1, label: { en: 'Bromine Br₂', zh: '溴 Br₂' } },
          { value: 2, label: { en: 'Hydrogen H₂', zh: '氢气 H₂' } },
          { value: 3, label: { en: 'Steam H₂O', zh: '水蒸气 H₂O' } },
          { value: 4, label: { en: 'Chlorine Cl₂ + UV', zh: '氯气 Cl₂ + 紫外光' } },
        ],
      },
    ],
    readouts: [
      {
        key: 'productMolecules',
        label: { en: 'Product molecules', zh: '产物分子数' },
        unit: '',
        sigFigs: 1,
        exact: true,
      },
      {
        key: 'relativeMolecularMass',
        label: { en: 'Relative molecular mass', zh: '相对分子质量' },
        unit: '',
        symbol: 'M_r',
        sigFigs: 3,
        // Exact, not measured — and chloromethane's really is 50.5, not 51.
        exact: true,
      },
      { key: 'carbons', label: { en: 'Carbon atoms', zh: '碳原子数' }, unit: '', sigFigs: 2, exact: true },
      {
        key: 'hydrogens',
        label: { en: 'Hydrogen atoms', zh: '氢原子数' },
        unit: '',
        sigFigs: 2,
        exact: true,
      },
    ],
    presets: [
      {
        label: { en: 'Bromine water: alkane', zh: '溴水：烷烃' },
        params: { carbons: 2, family: 0, reagent: 1 },
      },
      {
        label: { en: 'Bromine water: alkene', zh: '溴水：烯烃' },
        params: { carbons: 2, family: 1, reagent: 1 },
      },
      {
        label: { en: 'Ethene + steam → ethanol', zh: '乙烯 + 水蒸气 → 乙醇' },
        params: { carbons: 2, family: 1, reagent: 3 },
      },
      {
        label: { en: 'Methane + chlorine (UV)', zh: '甲烷 + 氯气（紫外光）' },
        params: { carbons: 1, family: 0, reagent: 4 },
      },
      {
        label: { en: 'Hydrogenating propene', zh: '丙烯加氢' },
        params: { carbons: 3, family: 1, reagent: 2 },
      },
    ],
  },

  narration,

  checkpoints: [
    {
      id: '0620-11-5-cp1',
      syllabus: ['0620.11.5.4'],
      tier: 'core',
      commandWord: 'Describe',
      marks: 2,
      stem: 'Describe a chemical test that would distinguish ethane from ethene, and give the result for each.',
      markScheme: [
        { text: 'Add bromine water to each', marks: 1 },
        {
          text: 'Ethene decolourises it (orange to colourless); ethane leaves it orange',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Both results are needed. "Ethene decolourises bromine water" alone does not distinguish anything — a test only identifies something if you say what the other one does.',
        zh: '两个结果都要写。只写"乙烯使溴水褪色"无法区分——必须说明另一种物质的现象，检验才成立。',
      },
    },
    {
      id: '0620-11-5-cp2',
      syllabus: ['0620.11.4.3', '0620.11.5.5'],
      tier: 'extended',
      commandWord: 'Compare',
      marks: 3,
      stem: 'Ethene reacts with bromine, and ethane reacts with chlorine in ultraviolet light. Compare these two reactions.',
      markScheme: [
        {
          text: 'Ethene undergoes addition: the C=C opens and the whole Br₂ molecule adds on',
          marks: 1,
        },
        {
          text: 'Ethane undergoes substitution: a chlorine atom replaces a hydrogen atom',
          marks: 1,
        },
        {
          text: 'Addition gives one product; substitution gives two, the second being HCl',
          marks: 1,
          alternatives: ['The substitution needs ultraviolet light; the addition does not'],
        },
      ],
      examinerNote: {
        en: 'A "compare" question needs both sides in the same sentence — say what each does, not two separate descriptions. The number of products is the cleanest single difference.',
        zh: '"Compare" 类题要在同一句里比较双方——说明各自的行为，而不是写两段独立描述。产物数目是最清晰的一个差别。',
      },
    },
    {
      id: '0620-11-5-cp3',
      syllabus: ['0620.11.5.2', '0620.11.5.3'],
      tier: 'core',
      commandWord: 'Explain',
      marks: 3,
      stem: 'Long-chain alkanes from crude oil are cracked. Explain why this is done and state the conditions used.',
      markScheme: [
        {
          text: 'There is a surplus of long-chain fractions and a shortage of shorter ones such as petrol',
          marks: 1,
        },
        {
          text: 'Cracking also produces alkenes, which are needed to make alcohols and polymers',
          marks: 1,
        },
        { text: 'A high temperature (about 600 °C) and a catalyst', marks: 1 },
      ],
      examinerNote: {
        en: 'Two reasons, not one. "To make petrol" is half the answer — the alkenes produced are the feedstock for the whole polymer industry, and examiners look for that second reason.',
        zh: '有两个原因，不是一个。只写"为了制汽油"只答了一半——生成的烯烃是整个高分子工业的原料，考官要找的正是第二个原因。',
      },
    },
    {
      id: '0620-11-5-cp4',
      syllabus: ['0620.11.5.6'],
      tier: 'extended',
      commandWord: 'Deduce',
      marks: 2,
      stem: 'Propene, C₃H₆, reacts completely with hydrogen. Deduce the molecular formula of the product and name it.',
      options: ['C₃H₈, propane', 'C₃H₆, propene', 'C₃H₈O, propan-1-ol', 'C₃H₆Br₂, dibromopropane'],
      answerIndex: 0,
      markScheme: [
        { text: 'C₃H₈', marks: 1 },
        { text: 'Propane', marks: 1 },
      ],
      examinerNote: {
        en: 'Hydrogen adds as H₂, so two hydrogen atoms join and the double bond becomes single. The carbon count never changes in an addition reaction.',
        zh: '氢以 H₂ 形式加成，所以增加两个氢原子，双键变为单键。加成反应中碳原子数不会改变。',
      },
    },
    {
      id: '0620-11-5-cp5',
      syllabus: ['0620.11.4.1', '0620.11.4.2'],
      tier: 'core',
      commandWord: 'State',
      marks: 2,
      stem: 'State what is meant by a saturated hydrocarbon, and state one reaction that alkanes do undergo.',
      markScheme: [
        { text: 'A hydrocarbon containing only single carbon–carbon bonds', marks: 1 },
        { text: 'Combustion (burning in oxygen)', marks: 1 },
      ],
      examinerNote: {
        en: 'Saying "it has no double bonds" is accepted, but "all its bonds are full" is not — the mark is for single bonds between carbon atoms specifically.',
        zh: '写"没有双键"可以接受，但写"键都饱和了"不行——得分点是碳原子之间只有单键。',
      },
    },
  ],
}

export default lesson
