import type { Lesson } from '@/content/types'
import { formatSigFigs } from '@/lib/units'
import narration from './narration'

const lesson: Lesson = {
  slug: '6-2-rate-of-reaction',
  subject: '0620',
  syllabus: [
    '0620.6.2.1',
    '0620.6.2.2',
    '0620.6.2.3',
    '0620.6.2.4',
    '0620.6.2.5',
    '0620.6.2.6',
    '0620.6.2.7',
    '0620.6.2.8',
  ],
  tier: 'extended',
  estimatedMinutes: 55,

  title: { en: 'Rate of reaction', zh: '反应速率' },
  summary: {
    en: 'Heat it, grind it, add a catalyst — the curve gets steeper but ends in the same place. Only the limiting reactant moves the plateau.',
    zh: '加热、研磨、加催化剂——曲线更陡，终点却相同。只有限量反应物能改变平台高度。',
  },

  objectives: [
    {
      en: 'Describe the effect of concentration, pressure, surface area and temperature on rate.',
      zh: '说明浓度、压强、表面积与温度对反应速率的影响。',
    },
    {
      en: 'State that a catalyst increases rate and is chemically unchanged at the end.',
      zh: '说明催化剂加快反应且反应后化学性质不变。',
    },
    {
      en: 'Describe practical methods for investigating the rate of a reaction.',
      zh: '描述研究反应速率的实验方法。',
    },
    {
      en: 'Interpret data and graphs from rate of reaction experiments.',
      zh: '解读反应速率实验的数据与图像。',
    },
    {
      en: 'Describe collision theory in terms of collision frequency and energy. (Extended)',
      zh: '用碰撞频率与能量描述碰撞理论。（Extended）',
    },
    {
      en: 'Explain the effect of each factor on rate using collision theory. (Extended)',
      zh: '用碰撞理论解释各因素对速率的影响。（Extended）',
    },
    {
      en: 'State that a catalyst decreases the activation energy. (Extended)',
      zh: '说明催化剂降低活化能。（Extended）',
    },
    {
      en: 'Evaluate practical methods for investigating rate of reaction. (Extended)',
      zh: '评价研究反应速率的实验方法。（Extended）',
    },
  ],

  glossary: [
    {
      en: 'rate of reaction',
      zh: '反应速率',
      definition: {
        en: 'How quickly reactants are used up or products formed. On a volume–time graph it is the gradient.',
        zh: '反应物消耗或产物生成的快慢。在体积–时间图上就是斜率。',
      },
      syllabus: ['0620.6.2.4'],
    },
    {
      en: 'collision theory',
      zh: '碰撞理论',
      definition: {
        en: 'Reactions occur when particles collide with at least the activation energy and in a suitable orientation.',
        zh: '当粒子以不低于活化能的能量、以合适取向相互碰撞时反应才发生。',
      },
      syllabus: ['0620.6.2.5'],
    },
    {
      en: 'activation energy',
      zh: '活化能',
      definition: {
        en: 'The minimum energy colliding particles must have for a reaction to occur. Symbol Ea.',
        zh: '碰撞粒子发生反应所需的最小能量，符号 Ea。',
      },
      syllabus: ['0620.6.2.7'],
    },
    {
      en: 'catalyst',
      zh: '催化剂',
      definition: {
        en: 'A substance that speeds up a reaction by providing a route of lower activation energy, and is chemically unchanged at the end.',
        zh: '通过提供活化能更低的途径加快反应、且反应后化学性质不变的物质。',
      },
      syllabus: ['0620.6.2.2', '0620.6.2.7'],
    },
    {
      en: 'limiting reactant',
      zh: '限量反应物',
      definition: {
        en: 'The reactant that runs out first. It alone determines how much product can form.',
        zh: '最先耗尽的反应物。只有它决定能生成多少产物。',
      },
      syllabus: ['0620.6.2.4'],
    },
    {
      en: 'surface area',
      zh: '表面积',
      definition: {
        en: 'The area of solid exposed to the other reactant. Breaking a solid into smaller pieces increases it.',
        zh: '固体暴露给另一反应物的面积。把固体分得越碎，表面积越大。',
      },
      syllabus: ['0620.6.2.1'],
    },
  ],

  equations: [
    {
      latex: '\\text{rate} = \\frac{\\Delta V}{\\Delta t}',
      meaning: {
        en: 'Rate is the gradient of the volume–time curve. Measure the initial rate from a tangent at the origin.',
        zh: '速率是体积–时间曲线的斜率。用原点处的切线求初始速率。',
      },
      substitute: (r) =>
        `\\text{initial rate} = ${formatSigFigs(r['initialRate'] ?? 0, 3)}\\ \\text{cm}^3/\\text{s},\\quad V_{\\text{final}} = ${formatSigFigs(
          r['finalVolume'] ?? 0,
          3
        )}\\ \\text{cm}^3`,
    },
  ],

  sim: {
    primitive: 'plot2d',
    kernel: '6-2-rate-of-reaction',
    hint: {
      en: 'Raise the temperature — the curve steepens but ends in exactly the same place. Only concentration moves the plateau.',
      zh: '升高温度——曲线变陡，但终点完全不变。只有浓度能改变平台高度。',
    },
    params: [
      {
        key: 'concentration',
        label: { en: 'Acid concentration', zh: '酸的浓度' },
        unit: 'mol / dm³',
        min: 0.2,
        max: 3,
        step: 0.2,
        default: 1,
      },
      {
        key: 'temperature',
        label: { en: 'Temperature', zh: '温度' },
        unit: '°C',
        min: 10,
        max: 70,
        step: 5,
        default: 25,
      },
      {
        key: 'surfaceArea',
        label: { en: 'Form of the solid', zh: '固体形态' },
        unit: '',
        min: 0,
        max: 2,
        step: 1,
        default: 0,
        options: [
          { value: 0, label: { en: 'Large chips', zh: '大块' } },
          { value: 1, label: { en: 'Small chips', zh: '小块' } },
          { value: 2, label: { en: 'Powder', zh: '粉末' } },
        ],
      },
      {
        key: 'catalyst',
        label: { en: 'Catalyst', zh: '催化剂' },
        unit: '',
        min: 0,
        max: 1,
        step: 1,
        default: 0,
        options: [
          { value: 0, label: { en: 'None', zh: '无' } },
          { value: 1, label: { en: 'Present', zh: '加入' } },
        ],
      },
      {
        key: 'duration',
        label: { en: 'Time plotted', zh: '绘图时长' },
        unit: 's',
        min: 50,
        max: 500,
        step: 25,
        default: 200,
      },
    ],
    readouts: [
      {
        key: 'initialRate',
        label: { en: 'Initial rate', zh: '初始速率' },
        unit: 'cm³ / s',
        sigFigs: 3,
      },
      {
        key: 'finalVolume',
        label: { en: 'Final volume of gas', zh: '最终气体体积' },
        unit: 'cm³',
        sigFigs: 3,
      },
      {
        key: 'halfTime',
        label: { en: 'Time to reach half', zh: '达到一半所需时间' },
        unit: 's',
        sigFigs: 3,
      },
      {
        key: 'volumeAtEnd',
        label: { en: 'Collected by end', zh: '结束时已收集' },
        unit: 'cm³',
        sigFigs: 3,
      },
    ],
    presets: [
      {
        label: { en: 'Reference run', zh: '参照实验' },
        params: { concentration: 1, temperature: 25, surfaceArea: 0, catalyst: 0, duration: 200 },
      },
      {
        label: { en: 'Hotter', zh: '升温' },
        params: { concentration: 1, temperature: 45, surfaceArea: 0, catalyst: 0, duration: 200 },
      },
      {
        label: { en: 'Powdered', zh: '磨成粉' },
        params: { concentration: 1, temperature: 25, surfaceArea: 2, catalyst: 0, duration: 200 },
      },
      {
        label: { en: 'With catalyst', zh: '加催化剂' },
        params: { concentration: 1, temperature: 25, surfaceArea: 0, catalyst: 1, duration: 200 },
      },
      {
        label: { en: 'Double concentration', zh: '浓度加倍' },
        params: { concentration: 2, temperature: 25, surfaceArea: 0, catalyst: 0, duration: 200 },
      },
    ],
  },

  narration,

  checkpoints: [
    {
      id: '0620-6-2-cp1',
      syllabus: ['0620.6.2.6'],
      tier: 'extended',
      commandWord: 'Explain',
      marks: 3,
      stem: 'Explain, using collision theory, why increasing the temperature increases the rate of a reaction.',
      markScheme: [
        { text: 'The particles gain kinetic energy and move faster', marks: 1 },
        { text: 'so they collide more frequently', marks: 1 },
        {
          text: 'and a greater proportion of collisions has energy equal to or greater than the activation energy',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Both effects are needed, and the second earns most of the credit. "More collisions" alone is a partial answer — the energy of those collisions is what matters most.',
        zh: '两个效应都要写，第二点分值更高。只写"碰撞更多"只是部分答案——碰撞的能量才是关键。',
      },
    },
    {
      id: '0620-6-2-cp2',
      syllabus: ['0620.6.2.4'],
      tier: 'core',
      commandWord: 'Predict',
      marks: 2,
      stem: 'Excess marble chips react with 50 cm³ of 1.0 mol / dm³ hydrochloric acid. The experiment is repeated with the acid warmed to 40 °C. Predict how the total volume of gas collected changes, and explain your answer.',
      markScheme: [
        { text: 'The total volume of gas is unchanged', marks: 1 },
        {
          text: 'because the amount of acid, which is the limiting reactant, has not changed',
          marks: 1,
          alternatives: ['the marble is in excess so the acid determines the yield'],
        },
      ],
      examinerNote: {
        en: 'Heating changes how fast, never how much. The word "excess" in the question is the clue that the acid is limiting.',
        zh: '加热只改变快慢，绝不改变多少。题目中的"过量"一词提示酸是限量反应物。',
      },
    },
    {
      id: '0620-6-2-cp3',
      syllabus: ['0620.6.2.2', '0620.6.2.7'],
      tier: 'extended',
      commandWord: 'State',
      marks: 2,
      stem: 'State how a catalyst increases the rate of a reaction, and state what happens to the catalyst by the end of the reaction.',
      markScheme: [
        {
          text: 'It provides an alternative route with a lower activation energy',
          marks: 1,
        },
        { text: 'It is chemically unchanged at the end of the reaction', marks: 1 },
      ],
      examinerNote: {
        en: 'A catalyst does not "give the particles more energy" and does not lower the energy of the particles — it lowers the energy barrier they must clear.',
        zh: '催化剂不会"给粒子更多能量"，也不降低粒子的能量——它降低的是粒子必须跨越的能垒。',
      },
    },
    {
      id: '0620-6-2-cp4',
      syllabus: ['0620.6.2.1'],
      tier: 'core',
      commandWord: 'Identify',
      marks: 1,
      stem: 'Two experiments use the same mass of calcium carbonate and the same acid. Identify the change that would make the reaction fastest.',
      options: [
        'Using powder instead of large lumps',
        'Using larger lumps instead of powder',
        'Using a larger volume of the same acid',
        'Cooling the acid before adding it',
      ],
      answerIndex: 0,
      markScheme: [
        { text: 'Using powder, because it has a larger surface area', marks: 1 },
      ],
      examinerNote: {
        en: 'Same mass, different surface area. A larger volume of the same acid adds more reactant but does not increase the concentration, so it changes the yield rather than the initial rate.',
        zh: '质量相同、表面积不同。用更大体积的同种酸只是增加反应物总量而不提高浓度，改变的是产量而非初始速率。',
      },
    },
  ],
}

export default lesson
