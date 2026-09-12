import type { Lesson } from '@/content/types'
import narration from './narration'

const lesson: Lesson = {
  slug: '11-8-polymers',
  subject: '0620',
  syllabus: [
    '0620.11.8.1',
    '0620.11.8.2',
    '0620.11.8.3',
    '0620.11.8.4',
    '0620.11.8.5',
    '0620.11.8.6',
    '0620.11.8.7',
    '0620.11.8.8',
    '0620.11.8.9',
  ],
  tier: 'extended',
  estimatedMinutes: 45,

  title: { en: 'Polymers and plastics', zh: '聚合物与塑料' },
  summary: {
    en: 'Open every double bond and the molecules join end to end. Nothing is added and nothing is lost — which is why the formula under the picture never changes.',
    zh: '打开每一个双键，分子就首尾相连。既不加入也不失去任何原子——所以图下的分子式始终不变。',
  },

  objectives: [
    {
      en: 'Define polymers as large molecules built from many small monomer units.',
      zh: '把聚合物定义为由许多小单体单元构成的大分子。',
    },
    {
      en: 'Describe the formation of poly(ethene) as addition polymerisation.',
      zh: '把聚乙烯的生成描述为加成聚合。',
    },
    { en: 'State that plastics are made from polymers.', zh: '说明塑料由聚合物制成。' },
    {
      en: 'Describe how the properties of plastics cause environmental problems.',
      zh: '说明塑料的性质如何造成环境问题。',
    },
    {
      en: 'Describe the environmental problems caused by the disposal of plastics.',
      zh: '描述塑料废弃处理造成的环境问题。',
    },
    {
      en: 'Draw the structure of an addition polymer from its monomer, and vice versa. (Extended)',
      zh: '由单体画出加聚物的结构，反之亦然。（Extended）',
    },
    {
      en: 'Describe condensation polymerisation as joining monomers with loss of a small molecule. (Extended)',
      zh: '把缩聚描述为单体结合并失去小分子。（Extended）',
    },
    {
      en: 'Describe the formation of nylon and PET as condensation polymers. (Extended)',
      zh: '描述尼龙与 PET 作为缩聚物的生成。（Extended）',
    },
  ],

  glossary: [
    {
      en: 'monomer',
      zh: '单体',
      definition: {
        en: 'The small molecule a polymer is built from. For an addition polymer it must contain a C=C double bond.',
        zh: '构成聚合物的小分子。加聚物的单体必须含有 C=C 双键。',
      },
      syllabus: ['0620.11.8.1'],
    },
    {
      en: 'repeat unit',
      zh: '重复单元',
      definition: {
        en: 'The section of a polymer that repeats along the chain. Drawn with a bond sticking out at each end.',
        zh: '在链中不断重复的那一段结构。画时两端各伸出一根键。',
      },
      syllabus: ['0620.11.8.6'],
    },
    {
      en: 'addition polymerisation',
      zh: '加成聚合',
      definition: {
        en: 'Many unsaturated monomers joining into one long chain, with no other product. The polymer has the same atoms as the monomers.',
        zh: '许多不饱和单体连接成一条长链，没有其他产物。聚合物与单体所含原子完全相同。',
      },
      syllabus: ['0620.11.8.2'],
    },
    {
      en: 'condensation polymerisation',
      zh: '缩合聚合',
      definition: {
        en: 'Monomers with a reactive group at each end joining, losing a small molecule such as water at every join.',
        zh: '两端各有活性基团的单体相互结合，每个连接处脱去一个小分子（如水）。',
      },
      syllabus: ['0620.11.8.8'],
    },
    {
      en: 'non-biodegradable',
      zh: '不可生物降解',
      definition: {
        en: 'Not broken down by microorganisms. Plastics are inert because their carbon–carbon bonds are strong and unreactive.',
        zh: '不能被微生物分解。塑料因碳碳键牢固且不活泼而呈惰性。',
      },
      syllabus: ['0620.11.8.4'],
    },
  ],

  equations: [
    {
      latex: 'n\\,\\mathrm{C_2H_4} \\rightarrow -\\!\\left[\\mathrm{CH_2CH_2}\\right]_n\\!-',
      meaning: {
        en: 'n monomers give one polymer and nothing else. The n on each side must match.',
        zh: 'n 个单体生成一个聚合物，别无其他产物。两边的 n 必须相同。',
      },
      substitute: (r) =>
        `n = ${Math.round(r['repeatUnits'] ?? 0)} · M_r = ${Math.round(r['repeatUnitMass'] ?? 0)} × ${Math.round(r['repeatUnits'] ?? 0)} = ${Math.round(r['relativeMolecularMass'] ?? 0)}`,
    },
    {
      latex: 'M_r(\\text{polymer}) = n \\times M_r(\\text{repeat unit})',
      meaning: {
        en: 'Every repeat unit is identical, so the mass is a simple multiple. A real chain has n in the tens of thousands.',
        zh: '每个重复单元完全相同，所以质量是简单的倍数关系。真实分子链的 n 可达数万。',
      },
    },
  ],

  sim: {
    primitive: 'molecule',
    kernel: '11-8-polymers',
    hint: {
      en: 'Set the monomers, then switch to the polymer — and watch the molecular formula under the drawing stay exactly the same.',
      zh: '先设定单体，再切换到聚合物——注意图下的分子式完全没有变化。',
    },
    params: [
      {
        key: 'polymerised',
        label: { en: 'Stage', zh: '阶段' },
        unit: '',
        min: 0,
        max: 1,
        step: 1,
        default: 0,
        options: [
          { value: 0, label: { en: 'Monomers', zh: '单体' } },
          { value: 1, label: { en: 'Polymer', zh: '聚合物' } },
        ],
      },
      {
        key: 'monomer',
        label: { en: 'Monomer', zh: '单体' },
        unit: '',
        min: 0,
        max: 2,
        step: 1,
        default: 0,
        options: [
          { value: 0, label: { en: 'Ethene', zh: '乙烯' } },
          { value: 1, label: { en: 'Chloroethene', zh: '氯乙烯' } },
          { value: 2, label: { en: 'Tetrafluoroethene', zh: '四氟乙烯' } },
        ],
      },
      {
        key: 'repeatUnits',
        label: { en: 'Units', zh: '单元数' },
        unit: '',
        symbol: 'n',
        min: 1,
        max: 4,
        step: 1,
        default: 3,
      },
    ],
    readouts: [
      {
        key: 'relativeMolecularMass',
        label: { en: 'Relative molecular mass', zh: '相对分子质量' },
        unit: '',
        symbol: 'M_r',
        sigFigs: 3,
        exact: true,
      },
      {
        key: 'repeatUnitMass',
        label: { en: 'Mass per repeat unit', zh: '每个重复单元的质量' },
        unit: '',
        sigFigs: 3,
        exact: true,
      },
      { key: 'repeatUnits', label: { en: 'Units', zh: '单元数' }, unit: '', sigFigs: 1, exact: true },
      { key: 'atoms', label: { en: 'Atoms drawn', zh: '画出的原子数' }, unit: '', sigFigs: 2, exact: true },
    ],
    presets: [
      {
        label: { en: '3 ethene monomers', zh: '3 个乙烯单体' },
        params: { monomer: 0, repeatUnits: 3, polymerised: 0 },
      },
      {
        label: { en: '→ poly(ethene)', zh: '→ 聚乙烯' },
        params: { monomer: 0, repeatUnits: 3, polymerised: 1 },
      },
      {
        label: { en: 'One repeat unit', zh: '单个重复单元' },
        params: { monomer: 0, repeatUnits: 1, polymerised: 1 },
      },
      { label: { en: 'PVC', zh: 'PVC' }, params: { monomer: 1, repeatUnits: 3, polymerised: 1 } },
      { label: { en: 'PTFE', zh: 'PTFE' }, params: { monomer: 2, repeatUnits: 3, polymerised: 1 } },
    ],
  },

  narration,

  checkpoints: [
    {
      id: '0620-11-8-cp1',
      syllabus: ['0620.11.8.6'],
      tier: 'extended',
      commandWord: 'Describe',
      marks: 3,
      stem: 'Propene, CH₃CH=CH₂, forms poly(propene). Describe how you would draw one repeat unit of this polymer.',
      markScheme: [
        { text: 'Draw the two carbon atoms of the C=C joined by a single bond', marks: 1 },
        {
          text: 'Show all four groups: two H on one carbon, and H and CH₃ on the other',
          marks: 1,
        },
        { text: 'Show a bond extending from each end carbon', marks: 1 },
      ],
      examinerNote: {
        en: 'The two bonds sticking out are a mark on their own and are the most commonly forgotten. Without them you have drawn a molecule, not a section of a chain.',
        zh: '两端伸出的键本身就是一个得分点，也是最常被遗漏的。没有它们，画的就是一个分子，而不是链的一段。',
      },
    },
    {
      id: '0620-11-8-cp2',
      syllabus: ['0620.11.8.7'],
      tier: 'extended',
      commandWord: 'Deduce',
      marks: 1,
      stem: 'A section of an addition polymer is –CH₂–CHF–CH₂–CHF–. Deduce the monomer.',
      options: ['CH₂=CHF', 'CH₂=CH₂', 'CHF=CHF', 'CH₃–CH₂F'],
      answerIndex: 0,
      markScheme: [{ text: 'CH₂=CHF (fluoroethene)', marks: 1 }],
      examinerNote: {
        en: 'Find the shortest section that repeats — here two carbons — then put the double bond back between them. The monomer always has the same atoms as one repeat unit.',
        zh: '找出最短的重复片段——这里是两个碳——再把双键补回去。单体的原子组成永远与一个重复单元相同。',
      },
    },
    {
      id: '0620-11-8-cp3',
      syllabus: ['0620.11.8.8', '0620.11.8.9'],
      tier: 'extended',
      commandWord: 'Compare',
      marks: 3,
      stem: 'Poly(ethene) and nylon are both polymers. Compare how they are made.',
      markScheme: [
        {
          text: 'Poly(ethene) is made by addition polymerisation, from monomers containing C=C',
          marks: 1,
        },
        {
          text: 'Nylon is made by condensation polymerisation, from monomers with a reactive group at each end',
          marks: 1,
        },
        {
          text: 'Addition loses no atoms; condensation loses a small molecule such as water at every join',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'The third mark is the discriminator and the one worth learning as a sentence: addition loses nothing, condensation loses a small molecule.',
        zh: '第三个得分点是关键区别，值得当作一句话背下来：加聚不失去任何东西，缩聚会脱去小分子。',
      },
    },
    {
      id: '0620-11-8-cp4',
      syllabus: ['0620.11.8.4', '0620.11.8.5'],
      tier: 'core',
      commandWord: 'Explain',
      marks: 3,
      stem: 'Explain why the disposal of plastics causes environmental problems, and why burning them is not a good solution.',
      markScheme: [
        {
          text: 'Plastics are non-biodegradable, so they are not broken down by microorganisms and persist in landfill',
          marks: 1,
        },
        {
          text: 'Landfill takes up space, and plastic in the oceans harms wildlife',
          marks: 1,
          alternatives: ['Plastics break down into microplastics that enter the food chain'],
        },
        {
          text: 'Burning produces carbon dioxide, and plastics such as PVC give off toxic hydrogen chloride',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Say *why* they are non-biodegradable if you have room — the carbon–carbon bonds are strong and unreactive, so no enzyme attacks them. That is the chemistry behind the environmental point.',
        zh: '有余地的话要说明*为什么*不可降解——碳碳键牢固且不活泼，没有酶能进攻它。这才是环境问题背后的化学原因。',
      },
    },
    {
      id: '0620-11-8-cp5',
      syllabus: ['0620.11.8.1', '0620.11.8.2'],
      tier: 'core',
      commandWord: 'Calculate',
      marks: 2,
      stem: 'A molecule of poly(ethene) is made from 5000 ethene molecules. Calculate its relative molecular mass. (A_r: C = 12, H = 1)',
      markScheme: [
        { text: 'M_r of one repeat unit = 28', marks: 1 },
        { text: '5000 × 28 = 140 000', marks: 1 },
      ],
      examinerNote: {
        en: 'No atoms are lost in addition polymerisation, so the polymer weighs exactly n times the monomer. There is nothing to subtract — that subtraction belongs to condensation polymers.',
        zh: '加聚不失去任何原子，所以聚合物的质量恰好是单体的 n 倍。不需要减去任何东西——需要相减的是缩聚物。',
      },
    },
  ],
}

export default lesson
