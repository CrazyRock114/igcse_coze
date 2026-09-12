import type { Lesson } from '@/content/types'
import narration from './narration'

const lesson: Lesson = {
  slug: '5-1-energetics',
  subject: '0620',
  syllabus: [
    '0620.5.1.1',
    '0620.5.1.2',
    '0620.5.1.3',
    '0620.5.1.4',
    '0620.5.1.5',
    '0620.5.1.6',
    '0620.5.1.7',
    '0620.5.1.8',
  ],
  tier: 'extended',
  estimatedMinutes: 50,

  title: { en: 'Exothermic and endothermic reactions', zh: '放热反应与吸热反应' },
  summary: {
    en: 'Breaking bonds costs energy and making them releases it. The difference is ΔH — and ΔH is where the product level sits on the diagram.',
    zh: '断键消耗能量，成键放出能量。两者之差就是 ΔH——而 ΔH 决定了产物在能量图上的高度。',
  },

  objectives: [
    {
      en: 'State that an exothermic reaction transfers thermal energy to the surroundings.',
      zh: '说明放热反应向环境放出热能。',
    },
    {
      en: 'State that an endothermic reaction takes in thermal energy from the surroundings.',
      zh: '说明吸热反应从环境吸收热能。',
    },
    {
      en: 'Interpret reaction pathway diagrams for exothermic and endothermic reactions.',
      zh: '解读放热与吸热反应的能量变化图。',
    },
    {
      en: 'Use ΔH, negative for exothermic and positive for endothermic. (Extended)',
      zh: '使用 ΔH，放热为负、吸热为正。（Extended）',
    },
    { en: 'Define activation energy, Ea. (Extended)', zh: '定义活化能 Ea。（Extended）' },
    {
      en: 'Draw and label reaction pathway diagrams including Ea and ΔH. (Extended)',
      zh: '画出并标注含 Ea 与 ΔH 的能量变化图。（Extended）',
    },
    {
      en: 'State that bond breaking is endothermic and bond making is exothermic. (Extended)',
      zh: '说明断键吸热、成键放热。（Extended）',
    },
    {
      en: 'Calculate the enthalpy change of a reaction using bond energies. (Extended)',
      zh: '用键能计算反应的焓变。（Extended）',
    },
  ],

  glossary: [
    {
      en: 'exothermic',
      zh: '放热',
      definition: {
        en: 'Transferring thermal energy to the surroundings, so they get warmer. ΔH is negative — the chemicals lost that energy.',
        zh: '向环境放出热能，使环境温度升高。ΔH 为负——是化学物质失去了这部分能量。',
      },
      syllabus: ['0620.5.1.1'],
    },
    {
      en: 'endothermic',
      zh: '吸热',
      definition: {
        en: 'Taking thermal energy in from the surroundings, so they get colder. ΔH is positive.',
        zh: '从环境吸收热能，使环境温度降低。ΔH 为正。',
      },
      syllabus: ['0620.5.1.2'],
    },
    {
      en: 'activation energy',
      zh: '活化能',
      definition: {
        en: 'The minimum energy colliding particles need for a reaction to happen. Measured from the reactant level to the top of the hump.',
        zh: '碰撞粒子引发反应所需的最小能量。从反应物能级量到峰顶。',
      },
      syllabus: ['0620.5.1.5'],
    },
    {
      en: 'enthalpy change',
      zh: '焓变',
      definition: {
        en: 'ΔH, the overall energy change of a reaction: bonds broken minus bonds made. It is the gap between the two levels on the diagram.',
        zh: 'ΔH，反应的总能量变化：断键能量减成键能量。它就是能量图上两个能级之间的差距。',
      },
      syllabus: ['0620.5.1.4'],
    },
    {
      en: 'bond energy',
      zh: '键能',
      definition: {
        en: 'The energy needed to break one mole of a particular bond. A mean value averaged over many compounds, so a calculation lands close to the measured ΔH rather than on it.',
        zh: '断裂 1 摩尔某种键所需的能量。它是在许多化合物上取的平均值，所以计算结果接近实测 ΔH 但不等于它。',
      },
      syllabus: ['0620.5.1.8'],
    },
  ],

  equations: [
    {
      latex: '\\Delta H = \\Sigma(\\text{bonds broken}) - \\Sigma(\\text{bonds made})',
      meaning: {
        en: 'Breaking costs, making pays back. Written in this order the sign comes out right on its own.',
        zh: '断键付出，成键收回。按这个顺序写，符号会自动正确。',
      },
      substitute: (r) =>
        `${Math.round(r['energyIn'] ?? 0)} - ${Math.round(r['energyOut'] ?? 0)} = ${Math.round(r['enthalpyChange'] ?? 0)}\\ \\text{kJ/mol}`,
    },
    {
      latex: '\\Delta H < 0 \\Rightarrow \\text{exothermic}',
      meaning: {
        en: 'Measured from the chemicals, not the room. They lost the energy, so it is negative — and the room got warmer because that is where it went.',
        zh: '从化学物质而非房间的角度衡量。它们失去了能量，所以是负值——而房间变暖，正是因为能量去了那里。',
      },
    },
    {
      latex: 'E_a \\text{ is measured from the reactants to the peak}',
      meaning: {
        en: 'Not from the products, and not from the bottom of the graph. A catalyst lowers it and changes nothing else.',
        zh: '不是从产物量起，也不是从图的底部量起。催化剂降低它，其余一概不变。',
      },
    },
  ],

  sim: {
    primitive: 'plot2d',
    kernel: '5-1-energetics',
    hint: {
      en: 'Drag the activation energy and watch the hump change while the two levels stay put — that is what a catalyst does.',
      zh: '拖动活化能，看山峰变化而两个能级保持不动——这正是催化剂的作用。',
    },
    params: [
      {
        key: 'reaction',
        label: { en: 'Reaction', zh: '反应' },
        unit: '',
        min: 0,
        max: 4,
        step: 1,
        default: 0,
        options: [
          { value: 0, label: { en: 'H₂ + Cl₂', zh: 'H₂ + Cl₂' } },
          { value: 1, label: { en: 'Burning CH₄', zh: '甲烷燃烧' } },
          { value: 2, label: { en: 'N₂ + 3H₂ (Haber)', zh: 'N₂ + 3H₂（哈伯法）' } },
          { value: 3, label: { en: 'N₂ + O₂ (endothermic)', zh: 'N₂ + O₂（吸热）' } },
          { value: 4, label: { en: 'C₂H₄ + H₂', zh: 'C₂H₄ + H₂' } },
        ],
      },
      {
        key: 'activationEnergy',
        label: { en: 'Activation energy', zh: '活化能' },
        unit: 'kJ/mol',
        symbol: 'E_a',
        min: 20,
        max: 600,
        step: 10,
        default: 250,
      },
    ],
    readouts: [
      {
        key: 'energyIn',
        label: { en: 'Energy to break bonds', zh: '断键所需能量' },
        unit: 'kJ/mol',
        sigFigs: 4,
        exact: true,
      },
      {
        key: 'energyOut',
        label: { en: 'Energy from making bonds', zh: '成键放出能量' },
        unit: 'kJ/mol',
        sigFigs: 4,
        exact: true,
      },
      {
        key: 'enthalpyChange',
        label: { en: 'Enthalpy change', zh: '焓变' },
        unit: 'kJ/mol',
        symbol: '\\Delta H',
        sigFigs: 3,
        exact: true,
      },
      {
        key: 'activationEnergy',
        label: { en: 'Activation energy', zh: '活化能' },
        unit: 'kJ/mol',
        symbol: 'E_a',
        sigFigs: 3,
        exact: true,
      },
    ],
    presets: [
      {
        label: { en: 'Burning methane', zh: '甲烷燃烧' },
        params: { reaction: 1, activationEnergy: 250 },
      },
      {
        label: { en: 'Endothermic: N₂ + O₂', zh: '吸热：N₂ + O₂' },
        params: { reaction: 3, activationEnergy: 400 },
      },
      {
        label: { en: 'Catalyst: a lower hump', zh: '催化剂：更矮的山峰' },
        params: { reaction: 1, activationEnergy: 60 },
      },
      {
        label: { en: 'Haber: only just exothermic', zh: '哈伯法：仅略微放热' },
        params: { reaction: 2, activationEnergy: 300 },
      },
      {
        label: { en: 'Only changed bonds count', zh: '只算变化的键' },
        params: { reaction: 4, activationEnergy: 200 },
      },
    ],
  },

  narration,

  checkpoints: [
    {
      id: '0620-5-1-cp1',
      syllabus: ['0620.5.1.1', '0620.5.1.4'],
      tier: 'extended',
      commandWord: 'Explain',
      marks: 2,
      stem: 'When magnesium is added to dilute hydrochloric acid, the temperature of the mixture rises. State whether the reaction is exothermic or endothermic, and state the sign of ΔH.',
      markScheme: [
        { text: 'Exothermic', marks: 1 },
        { text: 'ΔH is negative', marks: 1 },
      ],
      examinerNote: {
        en: 'The temperature rising means the *surroundings* gained energy, so the chemicals lost it. ΔH is measured from the chemicals, so it is negative. That inversion is the whole difficulty.',
        zh: '温度升高意味着*环境*得到了能量，所以化学物质失去了它。ΔH 从化学物质的角度衡量，所以是负值。这个"反转"就是全部难点所在。',
      },
    },
    {
      id: '0620-5-1-cp2',
      syllabus: ['0620.5.1.8', '0620.5.1.7'],
      tier: 'extended',
      commandWord: 'Calculate',
      marks: 3,
      stem: 'Hydrogen reacts with chlorine: H₂ + Cl₂ → 2HCl. Bond energies in kJ/mol: H–H 436, Cl–Cl 242, H–Cl 431. Calculate ΔH for this reaction.',
      markScheme: [
        { text: 'Bonds broken: 436 + 242 = 678 kJ/mol', marks: 1 },
        { text: 'Bonds made: 2 × 431 = 862 kJ/mol', marks: 1 },
        { text: 'ΔH = 678 − 862 = −184 kJ/mol', marks: 1 },
      ],
      examinerNote: {
        en: 'Two H–Cl bonds form, not one — the balanced equation has a 2 in front. Dropping it gives −29 and loses two marks, and it is the single most common slip in this calculation.',
        zh: '生成的是两根 H–Cl 键，不是一根——配平方程式前面有个 2。漏掉它会算成 −29，丢掉两分，而这正是本计算中最常见的失误。',
      },
    },
    {
      id: '0620-5-1-cp3',
      syllabus: ['0620.5.1.3', '0620.5.1.6'],
      tier: 'extended',
      commandWord: 'Sketch',
      marks: 3,
      stem: 'Sketch a reaction pathway diagram for an endothermic reaction. Label the reactants, the products, ΔH and the activation energy.',
      markScheme: [
        { text: 'Products drawn at a higher energy level than the reactants', marks: 1 },
        { text: 'A hump between them, higher than both levels', marks: 1 },
        {
          text: 'ΔH arrowed between the two levels, and Ea arrowed from the reactant level to the top of the hump',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Ea is measured from the reactants to the peak — not from the bottom of the axis, and not from the products. Marking it from the wrong place is a common way to lose the third mark.',
        zh: 'Ea 是从反应物量到峰顶——不是从坐标轴底部，也不是从产物量起。标错起点是丢掉第三分的常见方式。',
      },
    },
    {
      id: '0620-5-1-cp4',
      syllabus: ['0620.5.1.5'],
      tier: 'extended',
      commandWord: 'Explain',
      marks: 2,
      stem: 'A catalyst is added to an exothermic reaction. Explain the effect on the activation energy and on ΔH.',
      markScheme: [
        {
          text: 'The activation energy is lowered, because the catalyst provides an alternative route',
          marks: 1,
        },
        {
          text: 'ΔH is unchanged, because the reactants and products are the same substances at the same energies',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'The second mark is the discriminator. A catalyst changes the route, not the destination — so it cannot change how much energy the reaction releases overall.',
        zh: '第二个得分点是关键区别。催化剂改变的是路径，不是终点——所以它无法改变反应总共放出多少能量。',
      },
    },
    {
      id: '0620-5-1-cp5',
      syllabus: ['0620.5.1.7'],
      tier: 'extended',
      commandWord: 'Explain',
      marks: 2,
      stem: 'A reaction has ΔH = +52 kJ/mol. Explain what this tells you about the bonds broken and the bonds made.',
      markScheme: [
        {
          text: 'More energy was needed to break the bonds than was released when new bonds formed',
          marks: 1,
        },
        {
          text: 'so the reaction takes energy in overall and is endothermic',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Bond breaking is always endothermic and bond making always exothermic, in every reaction. It is only which total is larger that decides the overall sign.',
        zh: '在任何反应中，断键总是吸热、成键总是放热。决定总体符号的只是哪一边的总量更大。',
      },
    },
  ],
}

export default lesson
