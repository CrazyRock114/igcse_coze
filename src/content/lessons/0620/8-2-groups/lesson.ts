import type { Lesson } from '@/content/types'
import narration from './narration'

const lesson: Lesson = {
  slug: '8-2-groups',
  subject: '0620',
  syllabus: [
    '0620.8.2.1',
    '0620.8.2.2',
    '0620.8.3.1',
    '0620.8.3.2',
    '0620.8.3.3',
    '0620.8.3.4',
  ],
  tier: 'core',
  estimatedMinutes: 45,

  title: { en: 'Group I and Group VII', zh: '第 I 主族与第 VII 主族' },
  summary: {
    en: 'Down a group the outer shell moves further from the nucleus. That makes a metal more reactive and a halogen less — same cause, opposite effect.',
    zh: '沿族向下，最外层离原子核越来越远。这使金属更活泼、卤素更不活泼——原因相同，结果相反。',
  },

  objectives: [
    {
      en: 'Describe the Group I alkali metals and their reactions with water.',
      zh: '描述第 I 主族碱金属及其与水的反应。',
    },
    {
      en: 'Predict the properties of other Group I elements from the trends.',
      zh: '由趋势预测第 I 主族其他元素的性质。',
    },
    {
      en: 'Describe the Group VII halogens and their trends in colour, density and melting point.',
      zh: '描述第 VII 主族卤素在颜色、密度与熔点上的变化趋势。',
    },
    {
      en: 'State the appearance of chlorine, bromine and iodine at r.t.p.',
      zh: '说出室温常压下氯、溴、碘的外观。',
    },
    {
      en: 'Describe and explain the displacement reactions of halogens with halide ions.',
      zh: '描述并解释卤素与卤离子的置换反应。',
    },
    {
      en: 'Predict the properties of other Group VII elements from the trends.',
      zh: '由趋势预测第 VII 主族其他元素的性质。',
    },
  ],

  glossary: [
    {
      en: 'alkali metal',
      zh: '碱金属',
      definition: {
        en: 'A Group I element. Soft, low density, low melting point, and reacts with water to give a hydroxide and hydrogen.',
        zh: '第 I 主族元素。软、密度低、熔点低，与水反应生成氢氧化物和氢气。',
      },
      syllabus: ['0620.8.2.1'],
    },
    {
      en: 'halogen',
      zh: '卤素',
      definition: {
        en: 'A Group VII element. Coloured, diatomic, and needs one electron to complete its outer shell.',
        zh: '第 VII 主族元素。有颜色、双原子分子，只需再得到一个电子就能填满最外层。',
      },
      syllabus: ['0620.8.3.1'],
    },
    {
      en: 'halide ion',
      zh: '卤离子',
      definition: {
        en: 'The 1− ion a halogen forms — chloride, bromide, iodide. A more reactive halogen displaces a less reactive one from its halide.',
        zh: '卤素形成的 1− 离子——氯离子、溴离子、碘离子。较活泼的卤素能把较不活泼的从其卤化物中置换出来。',
      },
      syllabus: ['0620.8.3.3'],
    },
    {
      en: 'shielding',
      zh: '屏蔽效应',
      definition: {
        en: 'Inner shells of electrons getting between the nucleus and the outer shell, weakening the pull on it.',
        zh: '内层电子挡在原子核与最外层之间，削弱原子核对最外层的吸引。',
      },
      syllabus: ['0620.8.2.2'],
    },
  ],

  equations: [
    {
      latex: '2\\,\\mathrm{Na} + 2\\,\\mathrm{H_2O} \\rightarrow 2\\,\\mathrm{NaOH} + \\mathrm{H_2}',
      meaning: {
        en: 'Every alkali metal does this. The product is an alkaline hydroxide solution, which is where the name comes from.',
        zh: '每种碱金属都会这样反应。产物是碱性的氢氧化物溶液，"碱金属"之名由此而来。',
      },
      substitute: (r) =>
        `\\text{position } ${Math.round(r['position'] ?? 0)} \\quad \\text{melts at } ${Math.round(r['meltingPoint'] ?? 0)}\\ \\degree\\text{C} \\quad \\text{displaces } ${Math.round(r['displaces'] ?? 0)}`,
    },
    {
      latex:
        '\\mathrm{Cl_2} + 2\\,\\mathrm{KBr} \\rightarrow 2\\,\\mathrm{KCl} + \\mathrm{Br_2}',
      meaning: {
        en: 'Chlorine is above bromine, so it takes the electron and the bromine is pushed out. The solution turns orange.',
        zh: '氯排在溴之上，所以它夺走电子，把溴置换出来。溶液变为橙色。',
      },
    },
  ],

  sim: {
    primitive: 'ladder',
    kernel: '8-2-groups',
    hint: {
      en: 'Switch group and watch the arrow turn round. Both trends are on the graph below, on the same axes.',
      zh: '切换族，注意箭头掉头。两条趋势线在下方同一坐标系的图中。',
    },
    params: [
      {
        key: 'group',
        label: { en: 'Group', zh: '族' },
        unit: '',
        min: 0,
        max: 1,
        step: 1,
        default: 0,
        options: [
          { value: 0, label: { en: 'Group I: alkali metals', zh: '第 I 主族：碱金属' } },
          { value: 1, label: { en: 'Group VII: halogens', zh: '第 VII 主族：卤素' } },
        ],
      },
      {
        key: 'element',
        label: { en: 'Position down the group', zh: '族中的位置' },
        unit: '',
        min: 0,
        max: 4,
        step: 1,
        default: 0,
      },
    ],
    readouts: [
      {
        key: 'meltingPoint',
        label: { en: 'Melting point', zh: '熔点' },
        unit: '°C',
        sigFigs: 3,
        exact: true,
      },
      {
        key: 'density',
        label: { en: 'Density', zh: '密度' },
        unit: 'g/cm³',
        sigFigs: 2,
        exact: true,
      },
      {
        key: 'position',
        label: { en: 'Position down the group', zh: '族中的位置' },
        unit: '',
        sigFigs: 1,
        exact: true,
      },
      {
        key: 'displaces',
        label: { en: 'Members it displaces', zh: '可置换的成员数' },
        unit: '',
        sigFigs: 1,
        exact: true,
      },
    ],
    presets: [
      { label: { en: 'Lithium: the gentle one', zh: '锂：最温和的' }, params: { group: 0, element: 0 } },
      { label: { en: 'Potassium: lilac flame', zh: '钾：淡紫色火焰' }, params: { group: 0, element: 2 } },
      { label: { en: 'Caesium: explosive', zh: '铯：爆炸性' }, params: { group: 0, element: 4 } },
      { label: { en: 'Chlorine: a green gas', zh: '氯：黄绿色气体' }, params: { group: 1, element: 1 } },
      { label: { en: 'Bromine: a liquid', zh: '溴：液体' }, params: { group: 1, element: 2 } },
      { label: { en: 'Iodine: displaces nothing', zh: '碘：谁也置换不了' }, params: { group: 1, element: 3 } },
    ],
  },

  narration,

  checkpoints: [
    {
      id: '0620-8-2-cp1',
      syllabus: ['0620.8.2.1'],
      tier: 'core',
      commandWord: 'Describe',
      marks: 3,
      stem: 'Describe what you would see when a small piece of sodium is added to a trough of cold water, and name the products.',
      markScheme: [
        {
          text: 'It floats, melts into a ball and moves rapidly across the surface, fizzing',
          marks: 1,
        },
        { text: 'The products are sodium hydroxide and hydrogen', marks: 1 },
        {
          text: 'The resulting solution is alkaline, so universal indicator turns purple',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Melting into a ball is worth stating explicitly: it happens because the reaction gives out enough heat and sodium melts at only 98 °C. Observations, not explanations, unless asked.',
        zh: '"熔成小球"要明确写出来：这是因为反应放出的热量足够，而钠的熔点只有 98 °C。除非题目要求，只写现象、不写解释。',
      },
    },
    {
      id: '0620-8-2-cp2',
      syllabus: ['0620.8.2.2'],
      tier: 'core',
      commandWord: 'Predict',
      marks: 2,
      stem: 'Rubidium is below potassium in Group I. Predict its melting point relative to potassium’s (63 °C) and how vigorously it reacts with water.',
      markScheme: [
        { text: 'A lower melting point than potassium', marks: 1 },
        { text: 'A more vigorous reaction than potassium, likely explosive', marks: 1 },
      ],
      examinerNote: {
        en: 'Two trends run opposite ways in Group I: melting point falls but reactivity rises. Getting one right and the other backwards is the usual way to drop a mark here.',
        zh: '第 I 主族有两个方向相反的趋势：熔点下降但活动性上升。一个对一个反，是这里最常见的丢分方式。',
      },
    },
    {
      id: '0620-8-2-cp3',
      syllabus: ['0620.8.3.2'],
      tier: 'core',
      commandWord: 'State',
      marks: 3,
      stem: 'State the colour and physical state at r.t.p. of chlorine, bromine and iodine.',
      markScheme: [
        { text: 'Chlorine: yellow-green gas', marks: 1 },
        { text: 'Bromine: red-brown liquid', marks: 1 },
        { text: 'Iodine: grey-black solid', marks: 1 },
      ],
      examinerNote: {
        en: 'Colour *and* state for each — one without the other does not score. These three are worth learning verbatim; they come up almost every year.',
        zh: '每一个都要写颜色*和*状态——只写一样得不到分。这三条值得逐字背下来，几乎年年都考。',
      },
    },
    {
      id: '0620-8-2-cp4',
      syllabus: ['0620.8.3.3'],
      tier: 'core',
      commandWord: 'Predict',
      marks: 3,
      stem: 'Aqueous chlorine is added to potassium iodide solution. Predict what happens, write the word equation, and explain why the reaction occurs.',
      markScheme: [
        { text: 'The solution turns brown as iodine is formed', marks: 1 },
        { text: 'chlorine + potassium iodide → potassium chloride + iodine', marks: 1 },
        {
          text: 'Chlorine is more reactive than iodine, so it displaces it from the compound',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Say the direction, not just "chlorine is more reactive". A displacement only happens one way round, and the mark is for tying that to which one is higher in the group.',
        zh: '要说明方向，而不只是"氯更活泼"。置换只朝一个方向发生，得分点在于把它与谁在族中位置更高联系起来。',
      },
    },
    {
      id: '0620-8-2-cp5',
      syllabus: ['0620.8.3.4', '0620.8.2.2'],
      tier: 'extended',
      commandWord: 'Explain',
      marks: 3,
      stem: 'Explain why reactivity increases down Group I but decreases down Group VII.',
      markScheme: [
        {
          text: 'Down both groups the outer shell is further from the nucleus and more shielded by inner shells',
          marks: 1,
        },
        {
          text: 'A Group I atom reacts by losing its outer electron, which is therefore lost more easily',
          marks: 1,
        },
        {
          text: 'A Group VII atom reacts by gaining an electron, which is therefore attracted less strongly',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'One cause, two consequences. The first mark is the shared cause; the other two are for saying what losing and gaining each do with it. An answer that only handles one group gets at most two.',
        zh: '一个原因，两个结果。第一分是共同原因，另外两分分别在于说明"失去"和"得到"各自受到什么影响。只讨论一个族的答案最多得两分。',
      },
    },
  ],
}

export default lesson
