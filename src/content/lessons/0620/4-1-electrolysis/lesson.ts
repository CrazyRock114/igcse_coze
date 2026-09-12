import type { Lesson } from '@/content/types'
import { placementParams } from '@/lib/assignment'
import { ALL_ITEMS, MAX_TARGETS } from './kernel'
import narration from './narration'

const lesson: Lesson = {
  slug: '4-1-electrolysis',
  subject: '0620',
  syllabus: [
    '0620.4.1.1',
    '0620.4.1.2',
    '0620.4.1.3',
    '0620.4.1.4',
    '0620.4.1.5',
    '0620.4.1.6',
    '0620.4.1.7',
    '0620.4.1.8',
    '0620.4.1.9',
    '0620.4.1.10',
    '0620.4.2.1',
    '0620.4.2.2',
  ],
  tier: 'extended',
  estimatedMinutes: 55,

  title: { en: 'Electrolysis and fuel cells', zh: '电解与燃料电池' },
  summary: {
    en: '"Metal at the cathode" is only true for a molten compound. Dissolve it and sodium chloride gives hydrogen instead — the water competes, and the reactivity series decides.',
    zh: '"阴极得金属"只对熔融化合物成立。溶解后，氯化钠给出的是氢——水会来竞争，而由活动性顺序决定胜负。',
  },

  objectives: [
    {
      en: 'Define electrolysis, and identify the anode as positive and the cathode as negative.',
      zh: '定义电解，并指出阳极为正、阴极为负。',
    },
    {
      en: 'Identify the products at each electrode for molten binary compounds.',
      zh: '判断熔融二元化合物在各电极上的产物。',
    },
    {
      en: 'Predict the products of the electrolysis of aqueous solutions.',
      zh: '预测水溶液电解的产物。',
    },
    { en: 'State why metal objects are electroplated, and describe how.', zh: '说明金属物件电镀的原因，并描述其做法。' },
    {
      en: 'Describe how charge is transferred during electrolysis — by ions in the electrolyte and by electrons in the wires. (Extended)',
      zh: '描述电解过程中电荷的传递——电解质中靠离子，导线中靠电子。（Extended）',
    },
    {
      en: 'Use the reactivity series and the concentration of a solution to identify the products. (Extended)',
      zh: '用活动性顺序与溶液浓度判断产物。（Extended）',
    },
    {
      en: 'Write ionic half-equations for the reactions at each electrode. (Extended)',
      zh: '写出各电极反应的离子半反应式。（Extended）',
    },
    {
      en: 'State that a hydrogen–oxygen fuel cell produces electricity and water only, and describe its advantages and disadvantages. (Extended)',
      zh: '说明氢氧燃料电池只产生电和水，并说明其优缺点。（Extended）',
    },
  ],

  glossary: [
    {
      en: 'electrolysis',
      zh: '电解',
      definition: {
        en: 'The breaking down of an ionic compound, when molten or in aqueous solution, by passing electricity through it. It does not work on a solid, whose ions cannot move.',
        zh: '让电流通过熔融或水溶液状态的离子化合物，使其分解。对固体无效，因为固体中的离子无法移动。',
      },
      syllabus: ['0620.4.1.1'],
    },
    {
      en: 'cathode',
      zh: '阴极',
      definition: {
        en: 'The negative electrode. Positive ions are attracted to it and gain electrons, so metals and hydrogen form here.',
        zh: '负电极。正离子被吸引到这里并得到电子，因此金属和氢在这里生成。',
      },
      syllabus: ['0620.4.1.2'],
    },
    {
      en: 'anode',
      zh: '阳极',
      definition: {
        en: 'The positive electrode. Negative ions are attracted to it and lose electrons, so non-metals form here.',
        zh: '正电极。负离子被吸引到这里并失去电子，因此非金属在这里生成。',
      },
      syllabus: ['0620.4.1.2'],
    },
    {
      en: 'electroplating',
      zh: '电镀',
      definition: {
        en: 'Coating an object with a thin layer of metal by making the object the cathode. Done to improve appearance or to protect the metal beneath from corrosion.',
        zh: '把物体作为阴极，在其表面镀上一薄层金属。目的是改善外观或保护下面的金属不被腐蚀。',
      },
      syllabus: ['0620.4.1.6', '0620.4.1.7'],
    },
  ],

  equations: [
    {
      latex: '\\mathrm{Pb^{2+}} + 2e^- \\rightarrow \\mathrm{Pb}',
      meaning: {
        en: 'Reduction at the cathode: electrons on the left means electrons gained. The number of electrons always matches the charge on the ion.',
        zh: '阴极的还原：电子在左边表示得到电子。电子数总是与离子所带电荷数相同。',
      },
      substitute: (r) =>
        `\\text{correct } ${r['correct'] ?? 0}/${r['total'] ?? 0} \\quad \\text{placed } ${r['placed'] ?? 0}`,
    },
    {
      latex: '2\\mathrm{Br^-} \\rightarrow \\mathrm{Br_2} + 2e^-',
      meaning: {
        en: 'Oxidation at the anode: electrons on the right means electrons lost. Check that the total charge is the same on both sides — here it is zero either way.',
        zh: '阳极的氧化：电子在右边表示失去电子。要核对两边总电荷是否相等——这里两边都是零。',
      },
      substitute: (r) => `${r['placed'] ?? 0}\\ \\text{placed}`,
    },
  ],

  sim: {
    primitive: 'sort',
    kernel: '4-1-electrolysis',
    hint: {
      en: 'Click an item, then click the electrode it forms at. A wrong placement stays put and is marked, so you can see it and move it.',
      zh: '先点一个条目，再点它生成的电极。放错的会留在原处并被标记，这样你能看到并把它移走。',
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
          { value: 1, label: { en: 'Molten compounds', zh: '熔融化合物' } },
          { value: 2, label: { en: 'Aqueous solutions', zh: '水溶液' } },
          { value: 3, label: { en: 'Half-equations', zh: '半反应式' } },
        ],
      },
      ...placementParams(ALL_ITEMS, MAX_TARGETS),
    ],
    readouts: [
      {
        key: 'correct',
        label: { en: 'Correct', zh: '正确数' },
        unit: '',
        sigFigs: 2,
        exact: true,
      },
      {
        key: 'placed',
        label: { en: 'Placed', zh: '已放置' },
        unit: '',
        sigFigs: 2,
        exact: true,
      },
      {
        key: 'total',
        label: { en: 'Items in this exercise', zh: '本练习条目数' },
        unit: '',
        sigFigs: 2,
        exact: true,
      },
    ],
    presets: [
      { label: { en: 'Molten compounds', zh: '熔融化合物' }, params: { stage: 1 } },
      { label: { en: 'Aqueous solutions', zh: '水溶液' }, params: { stage: 2 } },
      { label: { en: 'Half-equations', zh: '半反应式' }, params: { stage: 3 } },
    ],
  },

  narration,

  checkpoints: [
    {
      id: '0620-4-1-cp1',
      syllabus: ['0620.4.1.1', '0620.4.1.8'],
      tier: 'extended',
      commandWord: 'Explain',
      marks: 4,
      stem: 'Solid lead(II) bromide does not conduct electricity, but molten lead(II) bromide does and is decomposed by the current. Explain both observations, and describe how charge passes round the complete circuit.',
      markScheme: [
        {
          text: 'In the solid the ions are held in fixed positions in the lattice and cannot move, so no charge can flow',
          marks: 1,
        },
        {
          text: 'When molten the ions are free to move, so they can carry charge through the liquid',
          marks: 1,
        },
        {
          text: 'Pb²⁺ ions move to the cathode and Br⁻ ions to the anode, where they are discharged, decomposing the compound',
          marks: 1,
        },
        {
          text: 'Charge is carried by moving ions in the electrolyte and by moving electrons in the external wires; electrons are given up at the anode and taken in at the cathode',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Electrons do not travel through the electrolyte. Saying so loses the last mark, however good the rest of the answer is.',
        zh: '电子不会在电解质中穿行。写成那样就丢掉最后一分，无论答案其余部分写得多好。',
      },
    },
    {
      id: '0620-4-1-cp2',
      syllabus: ['0620.4.1.5', '0620.4.1.9'],
      tier: 'extended',
      commandWord: 'Predict',
      marks: 4,
      stem: 'Predict the product at each electrode for (i) concentrated aqueous sodium chloride and (ii) dilute aqueous sodium chloride, using inert electrodes. Justify each answer.',
      markScheme: [
        {
          text: '(i) Hydrogen at the cathode, because sodium is more reactive than hydrogen, so hydrogen is discharged in preference',
          marks: 1,
        },
        {
          text: '(i) Chlorine at the anode, because the solution is a concentrated halide',
          marks: 1,
        },
        { text: '(ii) Hydrogen at the cathode, for the same reason as before', marks: 1 },
        {
          text: '(ii) Oxygen at the anode, because the halide is dilute, so hydroxide ions from the water are discharged instead',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'The two parts differ at one electrode only. A question that gives you a concentration is telling you the anode product is what it wants you to think about.',
        zh: '两问只在一个电极上不同。题目特意给出浓度，就是在提示它要你思考的是阳极产物。',
      },
    },
    {
      id: '0620-4-1-cp3',
      syllabus: ['0620.4.1.10'],
      tier: 'extended',
      commandWord: 'Give',
      marks: 3,
      stem: 'Molten aluminium oxide is electrolysed. Give the ionic half-equation at each electrode, and state which one is the oxidation.',
      markScheme: [
        { text: 'Cathode: Al³⁺ + 3e⁻ → Al', marks: 1 },
        { text: 'Anode: 2O²⁻ → O₂ + 4e⁻', marks: 1 },
        {
          text: 'The anode reaction is the oxidation, because the oxide ions lose electrons',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Two oxide ions are needed to make one oxygen molecule, so four electrons are released, not two. Count the atoms before counting the electrons.',
        zh: '生成 1 个氧分子需要 2 个氧离子，因此放出 4 个电子而不是 2 个。先数原子，再数电子。',
      },
    },
    {
      id: '0620-4-1-cp4',
      syllabus: ['0620.4.1.6', '0620.4.1.7'],
      tier: 'core',
      commandWord: 'Describe',
      marks: 3,
      stem: 'A steel spoon is to be electroplated with silver. Describe how this is done, and state one reason for electroplating an object.',
      markScheme: [
        { text: 'The spoon is made the cathode, connected to the negative terminal', marks: 1 },
        {
          text: 'The electrolyte is a solution of a silver salt, and the anode is made of silver',
          marks: 1,
        },
        {
          text: 'Objects are electroplated to improve their appearance, or to protect the metal underneath from corrosion',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'The object must be the cathode. Silver ions are positive, so they move to the negative electrode — making the spoon the anode would dissolve it instead of coating it.',
        zh: '被镀物体必须作阴极。银离子带正电，因此移向负电极——若把勺子作阳极，会把它溶解而不是镀上银。',
      },
    },
    {
      id: '0620-4-1-cp5',
      syllabus: ['0620.4.2.1', '0620.4.2.2'],
      tier: 'extended',
      commandWord: 'Compare',
      marks: 4,
      stem: 'Compare a hydrogen–oxygen fuel cell with a petrol engine as a way of powering a car. Give two advantages and two disadvantages of the fuel cell.',
      markScheme: [
        {
          text: 'Advantage: the only product is water, so there are no carbon dioxide emissions and no pollutants from the vehicle itself',
          marks: 1,
        },
        {
          text: 'Advantage: a fuel cell is more efficient than a petrol engine, and keeps working as long as hydrogen is supplied rather than needing to be recharged',
          marks: 1,
        },
        {
          text: 'Disadvantage: hydrogen is a highly flammable gas that is difficult and expensive to store and transport, and refuelling stations are scarce',
          marks: 1,
        },
        {
          text: 'Disadvantage: the hydrogen has to be manufactured, often from fossil fuels or by electrolysis using electricity from fossil fuels, so the emissions may only have been moved elsewhere',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'The last point is the one that distinguishes a strong answer. "Zero emissions" is only true at the vehicle; where the hydrogen came from decides whether it is true overall.',
        zh: '最后一点是区分优秀答案的关键。"零排放"只在车辆本身成立；氢从哪里来才决定整体上是否真的零排放。',
      },
    },
    {
      id: '0620-4-1-cp6',
      syllabus: ['0620.4.1.3', '0620.4.1.4'],
      tier: 'core',
      commandWord: 'State',
      marks: 2,
      stem: 'Molten zinc chloride is electrolysed using inert electrodes. State the product formed at each electrode.',
      markScheme: [
        { text: 'Zinc at the cathode', marks: 1 },
        { text: 'Chlorine at the anode', marks: 1 },
      ],
      examinerNote: {
        en: 'The compound is molten, not dissolved, so there is no water to compete and the simple rule applies: metal at the cathode, non-metal at the anode.',
        zh: '化合物是熔融的而不是溶解的，因此没有水来竞争，简单规则成立：阴极得金属，阳极得非金属。',
      },
    },
  ],
}

export default lesson
