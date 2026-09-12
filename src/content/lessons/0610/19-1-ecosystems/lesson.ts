import type { Lesson, FoodWebNode, FoodWebEdge } from '@/content/types'
import narration from './narration'

/**
 * The woodland food-web species list. Shared by the 2D `food-web` extra
 * and the 3D `food-web-3d` extra so we keep one source of truth for
 * the network.
 */
const FOOD_WEB_NODES: FoodWebNode[] = [
  // Producers (bottom band)
  {
    id: 'oak',
    shortLabel: 'oak',
    name: { en: 'oak tree', zh: '橡树' },
    description: {
      en: 'A producer — makes its own food by photosynthesis. In a woodland, oaks are the structural backbone: their acorns feed mice, voles, squirrels, and many insects; their leaves and bark feed caterpillars and beetle larvae.',
      zh: '生产者——通过光合作用自养。在林地里，橡树是结构性骨干：橡子喂养老鼠、田鼠、松鼠及许多昆虫；叶子和树皮喂养毛毛虫和甲虫幼虫。',
    },
    trophic: 'producer',
    eats: [],
    eatenBy: [
      { id: 'caterpillar', label: { en: 'caterpillars', zh: '毛毛虫' } },
      { id: 'mouse', label: { en: 'wood mice', zh: '林鼠' } },
      { id: 'rabbit', label: { en: 'rabbits (bark)', zh: '兔子（树皮）' } },
    ],
    x: 200,
    y: 380,
  },
  {
    id: 'grass',
    shortLabel: 'grass',
    name: { en: 'grass', zh: '草' },
    description: {
      en: 'A producer that forms the understorey. Short, fast-growing, eaten constantly by rabbits, voles, and grazing insects.',
      zh: '构成林地下层植被的生产者。矮小、生长快，被兔子、田鼠和取食昆虫持续啃食。',
    },
    trophic: 'producer',
    eats: [],
    eatenBy: [
      { id: 'rabbit', label: { en: 'rabbits', zh: '兔子' } },
      { id: 'caterpillar', label: { en: 'caterpillars', zh: '毛毛虫' } },
    ],
    x: 500,
    y: 380,
  },
  // Primary consumers
  {
    id: 'caterpillar',
    shortLabel: 'caterpillar',
    name: { en: 'caterpillar', zh: '毛毛虫' },
    description: {
      en: 'A primary consumer (herbivore) — eats leaves. Caterpillars are eaten in huge numbers by small birds, especially in spring. The number of caterpillars is what limits how many chicks the woodland can raise.',
      zh: '初级消费者（植食动物）——以叶为食。毛毛虫被小型鸟类大量捕食，尤其在春季。毛毛虫的数量是林地能养多少雏鸟的限制因素。',
    },
    trophic: 'primary',
    eats: [
      { id: 'oak', label: { en: 'oak leaves', zh: '橡树叶' } },
      { id: 'grass', label: { en: 'grass', zh: '草' } },
    ],
    eatenBy: [
      { id: 'robin', label: { en: 'robins', zh: '知更鸟' } },
      { id: 'shrew', label: { en: 'shrews', zh: '鼩鼱' } },
    ],
    x: 80,
    y: 270,
  },
  {
    id: 'rabbit',
    shortLabel: 'rabbit',
    name: { en: 'rabbit', zh: '兔子' },
    description: {
      en: 'A primary consumer (herbivore) — grazes grass and gnaws bark. Rabbits reproduce fast; their numbers are limited mostly by predators and disease, not by food.',
      zh: '初级消费者（植食动物）——啃食青草、咬食树皮。兔子繁殖快，其数量主要由捕食者和疾病限制，而非食物。',
    },
    trophic: 'primary',
    eats: [
      { id: 'grass', label: { en: 'grass', zh: '草' } },
      { id: 'oak', label: { en: 'oak bark', zh: '橡树皮' } },
    ],
    eatenBy: [
      { id: 'fox', label: { en: 'foxes', zh: '狐狸' } },
    ],
    x: 360,
    y: 270,
  },
  {
    id: 'mouse',
    shortLabel: 'mouse',
    name: { en: 'wood mouse', zh: '林鼠' },
    description: {
      en: 'A primary consumer — eats seeds, nuts, and shoots. Mice are the staple diet of owls and foxes in the woodland; without them, the predators would not survive.',
      zh: '初级消费者——以种子、坚果和嫩芽为食。老鼠是林地中猫头鹰和狐狸的主食；没有它们，捕食者也活不下来。',
    },
    trophic: 'primary',
    eats: [
      { id: 'oak', label: { en: 'acorns and seeds', zh: '橡子和种子' } },
    ],
    eatenBy: [
      { id: 'fox', label: { en: 'foxes', zh: '狐狸' } },
      { id: 'owl', label: { en: 'owls', zh: '猫头鹰' } },
    ],
    x: 580,
    y: 270,
  },
  // Secondary consumers
  {
    id: 'robin',
    shortLabel: 'robin',
    name: { en: 'robin', zh: '知更鸟' },
    description: {
      en: 'A secondary consumer — eats caterpillars and other insects. Robins are themselves eaten by sparrowhawks.',
      zh: '次级消费者——捕食毛毛虫和其它昆虫。知更鸟自己又被雀鹰捕食。',
    },
    trophic: 'secondary',
    eats: [
      { id: 'caterpillar', label: { en: 'caterpillars', zh: '毛毛虫' } },
    ],
    eatenBy: [
      { id: 'hawk', label: { en: 'sparrowhawks', zh: '雀鹰' } },
    ],
    x: 120,
    y: 160,
  },
  {
    id: 'shrew',
    shortLabel: 'shrew',
    name: { en: 'shrew', zh: '鼩鼱' },
    description: {
      en: 'A small insectivore. Shrews are eaten by owls, foxes, and kestrels. They have such a fast metabolism that they have to eat almost constantly — many die if they go more than a few hours without food.',
      zh: '小型食虫哺乳动物。鼩鼱被猫头鹰、狐狸和红隼捕食。它们代谢极快，必须不停地吃——几小时不进食就可能死。',
    },
    trophic: 'secondary',
    eats: [
      { id: 'caterpillar', label: { en: 'caterpillars and insects', zh: '毛毛虫和昆虫' } },
    ],
    eatenBy: [
      { id: 'owl', label: { en: 'owls', zh: '猫头鹰' } },
      { id: 'fox', label: { en: 'foxes', zh: '狐狸' } },
    ],
    x: 280,
    y: 160,
  },
  // Tertiary
  {
    id: 'fox',
    shortLabel: 'fox',
    name: { en: 'fox', zh: '狐狸' },
    description: {
      en: 'A tertiary consumer (top predator) — eats rabbits, mice, and shrews. Foxes have few predators of their own in the woodland, so they are near the top of the web.',
      zh: '三级消费者（顶级捕食者）——捕食兔子、老鼠和鼩鼱。在林地中狐狸几乎没有天敌，所以它位于食物网接近顶端的位置。',
    },
    trophic: 'tertiary',
    eats: [
      { id: 'rabbit', label: { en: 'rabbits', zh: '兔子' } },
      { id: 'mouse', label: { en: 'wood mice', zh: '林鼠' } },
      { id: 'shrew', label: { en: 'shrews', zh: '鼩鼱' } },
    ],
    eatenBy: [],
    x: 380,
    y: 60,
  },
  {
    id: 'owl',
    shortLabel: 'owl',
    name: { en: 'tawny owl', zh: '灰林鸮' },
    description: {
      en: 'A tertiary consumer — nocturnal, hunts mice and shrews. Owls swallow small prey whole and later cough up the bones and fur as a pellet — which is how ecologists find out what they have been eating.',
      zh: '三级消费者——夜行性，捕食老鼠和鼩鼱。猫头鹰将小型猎物整只吞下，然后把骨头和毛以"食丸"形式吐出——生态学家正是用食丸来研究它们的食性。',
    },
    trophic: 'tertiary',
    eats: [
      { id: 'mouse', label: { en: 'wood mice', zh: '林鼠' } },
      { id: 'shrew', label: { en: 'shrews', zh: '鼩鼱' } },
    ],
    eatenBy: [],
    x: 600,
    y: 60,
  },
  {
    id: 'hawk',
    shortLabel: 'hawk',
    name: { en: 'sparrowhawk', zh: '雀鹰' },
    description: {
      en: 'A tertiary consumer — eats small birds, especially in the breeding season when it has chicks to feed. Sparrowhawks are adapted to weaving between trees at speed, which is why they can catch robins.',
      zh: '三级消费者——捕食小型鸟类，尤其在育雏期。雀鹰能高速在树木间穿行，所以能抓到知更鸟这样的灵活小鸟。',
    },
    trophic: 'tertiary',
    eats: [
      { id: 'robin', label: { en: 'robins and small birds', zh: '知更鸟等小型鸟类' } },
    ],
    eatenBy: [],
    x: 60,
    y: 60,
  },
]

const FOOD_WEB_EDGES: FoodWebEdge[] = [
  // Producers → primary consumers
  { from: 'oak', to: 'caterpillar' },
  { from: 'oak', to: 'mouse' },
  { from: 'oak', to: 'rabbit' },
  { from: 'grass', to: 'rabbit' },
  { from: 'grass', to: 'caterpillar' },
  // Primary → secondary
  { from: 'caterpillar', to: 'robin' },
  { from: 'caterpillar', to: 'shrew' },
  { from: 'rabbit', to: 'fox' },
  { from: 'mouse', to: 'fox' },
  { from: 'mouse', to: 'owl' },
  // Secondary → tertiary
  { from: 'robin', to: 'hawk' },
  { from: 'shrew', to: 'fox' },
  { from: 'shrew', to: 'owl' },
]

const lesson: Lesson = {
  slug: '19-1-ecosystems',
  subject: '0610',
  syllabus: [
    '0610.19.1.1',
    '0610.19.1.2',
    '0610.19.2.1',
    '0610.19.2.2',
    '0610.19.2.3',
    '0610.19.2.4',
    '0610.19.2.5',
    '0610.19.2.6',
    '0610.19.2.7',
    '0610.19.2.8',
    '0610.19.2.9',
    '0610.19.2.10',
    '0610.19.2.11',
    '0610.19.2.12',
    '0610.19.2.13',
    '0610.19.2.14',
    '0610.19.2.15',
    '0610.19.2.16',
    '0610.19.2.17',
    '0610.19.2.18',
    '0610.19.2.19',
    '0610.19.3.1',
    '0610.19.3.2',
    '0610.19.3.3',
    '0610.19.4.1',
    '0610.19.4.2',
    '0610.19.4.3',
    '0610.19.4.4',
    '0610.19.4.5',
    '0610.19.4.6',
    '0610.19.4.7',
  ],
  tier: 'extended',
  estimatedMinutes: 65,

  title: { en: 'Organisms and their environment', zh: '生物与环境' },
  summary: {
    en: 'One oak tree supports half a million insects, so counting them gives a pyramid standing on its point. Weigh them instead and it turns the right way up.',
    zh: '一棵橡树养活着五十万只昆虫，因此按数量画出的金字塔是立在尖端上的。改为称重，它立刻就正了过来。',
  },

  objectives: [
    {
      en: 'State that the Sun is the principal source of energy for biological systems, and describe how energy flows through organisms.',
      zh: '说明太阳是生物系统的主要能量来源，并描述能量如何在生物之间流动。',
    },
    {
      en: 'Construct and interpret food chains and food webs, and use them to describe the impact of overharvesting and introduced species.',
      zh: '构建并解读食物链与食物网，并用它们说明过度捕捞与引入物种的影响。',
    },
    {
      en: 'Define producer, consumer, herbivore, carnivore, decomposer and trophic level.',
      zh: '给生产者、消费者、植食动物、肉食动物、分解者与营养级下定义。',
    },
    {
      en: 'Draw and interpret pyramids of numbers and of biomass, and discuss the advantages of each.',
      zh: '绘制并解读数量金字塔与生物量金字塔，并讨论各自的优点。',
    },
    {
      en: 'Draw and interpret pyramids of energy, and explain why they are preferred. (Extended)',
      zh: '绘制并解读能量金字塔，并解释为何它更受青睐。（Extended）',
    },
    {
      en: 'Explain why energy transfer between trophic levels is inefficient, why food chains are short, and why eating crops is more efficient than eating livestock. (Extended)',
      zh: '解释营养级间能量传递为何低效、食物链为何短，以及为何食用作物比食用牲畜更节能。（Extended）',
    },
    {
      en: 'Describe the carbon cycle, and the nitrogen cycle including the roles of microorganisms. (Extended)',
      zh: '描述碳循环，以及包含微生物作用的氮循环。（Extended）',
    },
    {
      en: 'Define population, community and ecosystem, and identify and explain the phases of a sigmoid growth curve.',
      zh: '给种群、群落与生态系统下定义，并识别与解释 S 形增长曲线的各阶段。',
    },
  ],

  glossary: [
    {
      en: 'trophic level',
      zh: '营养级',
      definition: {
        en: 'An organism’s position in a food chain — producer, primary consumer, secondary consumer, and so on.',
        zh: '生物在食物链中所处的位置——生产者、初级消费者、次级消费者，依此类推。',
      },
      syllabus: ['0610.19.2.13'],
    },
    {
      en: 'producer',
      zh: '生产者',
      definition: {
        en: 'An organism that makes its own organic nutrients, usually by photosynthesis. Always the first trophic level.',
        zh: '能自己制造有机养料的生物，通常通过光合作用。它永远是第一营养级。',
      },
      syllabus: ['0610.19.2.4'],
    },
    {
      en: 'decomposer',
      zh: '分解者',
      definition: {
        en: 'An organism that feeds on dead or waste organic matter, returning its nutrients to the environment.',
        zh: '以死亡或废弃有机物为食的生物，把其中的养分归还给环境。',
      },
      syllabus: ['0610.19.2.9'],
    },
    {
      en: 'biomass',
      zh: '生物量',
      definition: {
        en: 'The dry mass of living material. Better than a count because it does not treat an oak tree and a greenfly as equals.',
        zh: '生物体的干重。它优于计数，因为它不会把橡树和蚜虫等量齐观。',
      },
      syllabus: ['0610.19.2.11'],
    },
    {
      en: 'carrying capacity',
      zh: '环境容纳量',
      definition: {
        en: 'The population a habitat can support indefinitely. The stationary phase of a growth curve sits at it.',
        zh: '一个生境能长期维持的种群数量。增长曲线的稳定期正处于这一水平。',
      },
      syllabus: ['0610.19.4.7'],
    },
    {
      en: 'ecosystem',
      zh: '生态系统',
      definition: {
        en: 'A community of populations together with the physical environment they live in.',
        zh: '由各种群构成的群落，连同它们所处的物理环境。',
      },
      syllabus: ['0610.19.4.3'],
    },
  ],

  equations: [
    {
      latex: 'E_{n} = E_{1} \\times t^{\\,n-1}',
      meaning: {
        en: 'Energy at the nth trophic level, where t is the fraction passed on at each step. Because t is about a tenth, the fall is not steady — it is a factor of ten every level.',
        zh: '第 n 营养级的能量，其中 t 是每一步传递的比例。由于 t 约为十分之一，下降不是匀速的——而是每升高一级就减少到十分之一。',
      },
      substitute: (r) =>
        `\\text{top level } ${r['top'] ?? 0}\\ \\mathrm{kJ\\,m^{-2}\\,yr^{-1}} \\quad (${r['efficiency'] ?? 0}\\%)`,
    },
    {
      latex: '\\text{people fed} \\;\\propto\\; \\dfrac{1}{t}',
      meaning: {
        en: 'Feed a crop to an animal and you get back only the fraction t of its energy. Eating the crop directly feeds 1/t times as many people from the same land.',
        zh: '把作物喂给动物，你只能取回其能量的 t 倍。直接食用作物，同样的土地能养活 1/t 倍的人。',
      },
      substitute: (r) =>
        `\\dfrac{1}{t} = ${r['cropAdvantage'] ?? 0} \\quad \\text{5th level: } ${r['fifth'] ?? 0}\\ \\mathrm{kJ\\,m^{-2}\\,yr^{-1}}`,
    },
  ],

  sim: {
    primitive: 'pyramid',
    kernel: '19-1-ecosystems',
    hint: {
      en: 'Draw the woodland as numbers, then as biomass. The ecosystem has not changed — only what you measured.',
      zh: '先按数量画出橡树林，再按生物量画一次。生态系统没有变，变的只是你测量的东西。',
    },
    params: [
      {
        key: 'ecosystem',
        label: { en: 'Food chain', zh: '食物链' },
        unit: '',
        min: 1,
        max: 2,
        step: 1,
        default: 1,
        options: [
          { value: 1, label: { en: 'Grassland', zh: '草地' } },
          { value: 2, label: { en: 'Oak woodland', zh: '橡树林' } },
        ],
      },
      {
        key: 'kind',
        label: { en: 'Measured as', zh: '衡量方式' },
        unit: '',
        min: 1,
        max: 3,
        step: 1,
        default: 1,
        options: [
          { value: 1, label: { en: 'Numbers', zh: '数量' } },
          { value: 2, label: { en: 'Biomass', zh: '生物量' } },
          { value: 3, label: { en: 'Energy', zh: '能量' } },
        ],
      },
      {
        key: 'transfer',
        label: { en: 'Energy passed to the next level', zh: '传给下一营养级的能量' },
        unit: '%',
        min: 1,
        max: 30,
        step: 1,
        default: 10,
      },
    ],
    readouts: [
      {
        key: 'top',
        label: { en: 'Energy at the top level', zh: '顶级营养级的能量' },
        unit: 'kJ/m²/yr',
        sigFigs: 4,
        exact: true,
      },
      {
        key: 'efficiency',
        label: { en: 'Fraction of the producers’ energy', zh: '占生产者能量的比例' },
        unit: '%',
        sigFigs: 3,
        exact: true,
      },
      {
        key: 'fifth',
        label: { en: 'Left for a fifth level', zh: '留给第五营养级的能量' },
        unit: 'kJ/m²/yr',
        sigFigs: 3,
        exact: true,
      },
      {
        key: 'cropAdvantage',
        label: { en: 'Crops feed this many times more', zh: '直接吃作物可多养活的倍数' },
        unit: '×',
        sigFigs: 3,
        exact: true,
      },
    ],
    presets: [
      {
        label: { en: 'Grassland, counted', zh: '草地，按数量' },
        params: { ecosystem: 1, kind: 1, transfer: 10 },
      },
      {
        label: { en: 'Woodland, counted: inverted', zh: '橡树林，按数量：倒置' },
        params: { ecosystem: 2, kind: 1, transfer: 10 },
      },
      {
        label: { en: 'The same woodland, weighed', zh: '同一片林，按重量' },
        params: { ecosystem: 2, kind: 2, transfer: 10 },
      },
      {
        label: { en: 'Woodland energy', zh: '橡树林的能量' },
        params: { ecosystem: 2, kind: 3, transfer: 10 },
      },
      {
        label: { en: 'A wasteful chain (5%)', zh: '低效的食物链（5%）' },
        params: { ecosystem: 2, kind: 3, transfer: 5 },
      },
      {
        label: { en: 'An efficient one (25%)', zh: '高效的食物链（25%）' },
        params: { ecosystem: 2, kind: 3, transfer: 25 },
      },
    ],
  },

  narration,

  checkpoints: [
    {
      id: '0610-19-1-cp1',
      syllabus: ['0610.19.2.17'],
      tier: 'extended',
      commandWord: 'Explain',
      marks: 3,
      stem: 'Only about 10% of the energy in one trophic level is transferred to the next. Explain what happens to the rest.',
      markScheme: [
        {
          text: 'Much of it is released by respiration and lost to the surroundings as heat',
          marks: 1,
        },
        { text: 'Some is lost in excretion as urea, and in egestion as undigested faeces', marks: 1 },
        {
          text: 'Not all of the organism is eaten — roots, bones and other parts are left',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Energy is not "used up" or "destroyed" — say where it went. Heat from respiration is the largest share and the one most often left out.',
        zh: '能量不会被"用光"或"消灭"——要说清它去了哪里。呼吸作用产生的热量占最大份额，也是最常被漏掉的一项。',
      },
    },
    {
      id: '0610-19-1-cp2',
      syllabus: ['0610.19.2.12'],
      tier: 'core',
      commandWord: 'Explain',
      marks: 3,
      stem: 'A pyramid of numbers for the food chain oak tree → insects → small birds → hawks is not pyramid-shaped. Explain why, and explain why a pyramid of biomass for the same food chain is a better diagram.',
      markScheme: [
        {
          text: 'There is only one oak tree but very many insects, so the second level is wider than the first',
          marks: 1,
        },
        {
          text: 'A pyramid of numbers counts every organism as one, regardless of its size',
          marks: 1,
        },
        {
          text: 'A pyramid of biomass measures the mass of living material instead, so the single large tree outweighs all the insects and the diagram is the right way up',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'The fault is in the counting, not in the woodland. Saying "there are more insects than trees" describes the diagram; the mark is for saying why counting misleads.',
        zh: '问题出在"计数"这件事上，而不在橡树林。写"昆虫比树多"只是描述图形；得分点在于说明计数为何具有误导性。',
      },
    },
    {
      id: '0610-19-1-cp3',
      syllabus: ['0610.19.2.18'],
      tier: 'extended',
      commandWord: 'Explain',
      marks: 3,
      stem: 'Food chains rarely have more than four or five trophic levels. Explain why, using figures.',
      markScheme: [
        { text: 'Only about 10% of the energy passes from one level to the next', marks: 1 },
        {
          text: 'So a fifth trophic level receives about 0.01% of the energy the producers captured',
          marks: 1,
        },
        {
          text: 'There would not be enough energy to support a viable population at that level',
          marks: 1,
        },
      ],
      examinerNote: {
        en: '"Using figures" is an instruction. Multiply the 10% out and quote the result; an answer with no numbers in it cannot get full marks here.',
        zh: '"用数字说明"是一项要求。把 10% 逐级乘下去并给出结果；不含任何数字的答案在这里拿不到满分。',
      },
    },
    {
      id: '0610-19-1-cp4',
      syllabus: ['0610.19.2.19'],
      tier: 'extended',
      commandWord: 'Suggest',
      marks: 3,
      stem: 'A country with limited farmland wants to feed more people from the same area. Suggest why growing crops for people to eat directly is more efficient than using the land to raise cattle for meat.',
      markScheme: [
        {
          text: 'Eating the crop directly makes people the primary consumers, so there is one trophic level instead of two',
          marks: 1,
        },
        {
          text: 'About 90% of the energy is lost at each transfer, mostly as heat from respiration by the cattle',
          marks: 1,
        },
        {
          text: 'So roughly ten times as much energy from the same area reaches people, feeding about ten times as many',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'This is the 10% rule applied to a real decision. Answers about cattle being expensive or needing water miss the point — the argument is about trophic levels.',
        zh: '这是把 10% 规律用在一个现实决策上。写"养牛成本高"或"牛需要水"都没有抓住要点——论证的核心是营养级。',
      },
    },
    {
      id: '0610-19-1-cp5',
      syllabus: ['0610.19.4.5', '0610.19.4.7'],
      tier: 'extended',
      commandWord: 'Explain',
      marks: 4,
      stem: 'Bacteria are grown in a closed flask of nutrient broth. Their population follows a sigmoid curve. Explain what causes the lag phase, the exponential phase and the stationary phase.',
      markScheme: [
        {
          text: 'Lag phase: few organisms are present and they are adjusting to the conditions and synthesising enzymes before they begin to divide',
          marks: 1,
        },
        {
          text: 'Exponential phase: nutrients are plentiful and there is little competition or waste, and every organism can reproduce, so numbers double repeatedly',
          marks: 1,
        },
        {
          text: 'Stationary phase: nutrients run short and toxic waste accumulates',
          marks: 1,
        },
        {
          text: 'so the birth rate falls until it equals the death rate and the population stops increasing',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'The stationary phase is a balance of births and deaths, not a stop in reproduction. Writing "they stop reproducing" loses the last mark.',
        zh: '稳定期是出生与死亡之间的平衡，而不是繁殖停止。写"它们停止繁殖"会丢掉最后一分。',
      },
    },
    {
      id: '0610-19-1-cp6',
      syllabus: ['0610.19.3.3'],
      tier: 'extended',
      commandWord: 'Describe',
      marks: 4,
      stem: 'Describe the roles of four types of microorganism in the nitrogen cycle.',
      markScheme: [
        {
          text: 'Nitrogen-fixing bacteria convert nitrogen gas into nitrogen compounds plants can use',
          marks: 1,
        },
        {
          text: 'Decomposers break down proteins in dead organisms and waste, releasing ammonium compounds',
          marks: 1,
        },
        {
          text: 'Nitrifying bacteria oxidise ammonium to nitrite and then to nitrate, the form roots absorb',
          marks: 1,
        },
        { text: 'Denitrifying bacteria convert nitrate back to nitrogen gas', marks: 1 },
      ],
      examinerNote: {
        en: 'Four groups, four different jobs. The commonest error is to swap nitrifying and denitrifying — nitrifying builds nitrate up, denitrifying takes it away.',
        zh: '四类微生物，四种不同的作用。最常见的错误是把硝化与反硝化搞反——硝化生成硝酸盐，反硝化则把它带走。',
      },
    },
    {
      id: '0610-19-1-cp7',
      syllabus: ['0610.19.2.10'],
      tier: 'core',
      commandWord: 'Predict',
      marks: 3,
      stem: 'In a food web, seals eat cod, and cod eat herring. Predict the effect on the numbers of seals and of herring if cod are overharvested by fishing, and explain your answer.',
      markScheme: [
        { text: 'The number of seals would fall', marks: 1 },
        { text: 'because cod are a food source for them, so less food is available', marks: 1 },
        {
          text: 'The number of herring would rise, because fewer cod are eating them',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Work outwards in both directions: what eats it, and what it eats. Answering only about the seals leaves half the food web untouched.',
        zh: '要向两个方向推：谁吃它，以及它吃谁。只回答海豹的部分，就漏掉了食物网的另一半。',
      },
    },
  ],

  // Visual / interactive learning modules for Chapter 7 (19.1 —
  // organisms and their environment). The G8 PDF available in this
  // project covers only B5–B11, so the diagrams here are hand-built
  // SVG. Each module is data-driven.
  extras: [
    // 1) A food web for a temperate woodland, with two "remove a
    //    species" scenarios. Clicking any node shows trophic level,
    //    prey, and predators; removing the fox or rabbit propagates
    //    the effect through the rest of the web.
    {
      type: 'food-web',
      id: 'food-web',
      title: { en: 'A woodland food web', zh: '温带林地食物网' },
      hint: {
        en: 'Click any organism to see its trophic level, what it eats, and what eats it. Toggle the scenarios above to see what happens when a top predator or a primary consumer is removed.',
        zh: '点击任一生物查看其营养级、食物和天敌。切换上方的场景，观察去掉顶级捕食者或初级消费者时，食物网其它部分会怎么变化。',
      },
      intro: {
        en: 'A food web is several food chains joined together — the same organism can be eaten by more than one predator, and can eat more than one prey. Arrows show the direction of energy flow: from the eaten to the eater.',
        zh: '食物网是若干条食物链交织在一起——同一生物可能被多种捕食者吃，也可能吃多种猎物。箭头表示能量流动的方向：被捕食者指向捕食者。',
      },
      initialSelected: 'rabbit',
      foxId: 'fox',
      rabbitId: 'rabbit',
      nodes: FOOD_WEB_NODES,
      edges: FOOD_WEB_EDGES,
    },

    // 1b) 3D version of the same food web. Stacks the species by
    //     trophic level on the Y axis and rotates so the student sees
    //     the producer floor and the tertiary-customer ceiling at the
    //     same time. Re-uses the same node + edge data as the 2D
    //     `food-web` extra above.
    {
      type: 'food-web-3d',
      id: 'food-web-3d',
      title: { en: 'The woodland food web, in 3D', zh: '温带林地食物网，3D 展示' },
      hint: {
        en: 'Drag to rotate. The four trophic levels stack vertically: producers at the bottom, tertiary consumers at the top. Click any node to read about that species and see what it eats (down) and what eats it (up).',
        zh: '拖动旋转。四个营养级在垂直方向分层：底层生产者，顶层顶级消费者。点击任一节点查看该物种的说明，并看到它的食物（向下）和天敌（向上）。',
      },
      initialSelected: 'rabbit',
      nodes: FOOD_WEB_NODES,
      edges: FOOD_WEB_EDGES,
    },

    // 2) Three ecological pyramids side by side. Toggling between
    //    them shows the difference in shape (oak tree has an
    //    inverted pyramid of numbers but a normal pyramid of biomass
    //    and energy).
    {
      type: 'pyramid-compare',
      id: 'pyramid-compare',
      title: { en: 'Three pyramids, one ecosystem', zh: '三种金字塔，同一生态系统' },
      hint: {
        en: 'Same ecosystem, three different ways to measure. The pyramid of numbers for an oak tree is unusual — one tree supports half a million insects, so the count stands on its point. The other two pyramids stay the right way up.',
        zh: '同一生态系统，三种不同的测量方法。橡树的数量金字塔比较特别——一棵树养活五十万只昆虫，所以数字上小下大倒立。其它两种金字塔则保持正立。',
      },
      intro: {
        en: 'The shape of the pyramid depends on what you measure. Numbers, biomass, and energy all tell different stories — the G8 syllabus asks for all three because each one is useful in a different situation.',
        zh: '金字塔的形状取决于你量什么。数量、生物量、能量讲的是不同的故事——G8 教学大纲要求三种都要会，因为每种在不同情境下都有用。',
      },
      initialActive: 'numbers',
      pyramids: {
        numbers: {
          title: { en: 'Pyramid of numbers — oak woodland', zh: '数量金字塔——橡树林' },
          unit: 'individuals',
          caption: {
            en: 'One tree at the base, half a million insects above it, then a few small birds, then a single sparrowhawk at the top.',
            zh: '底部一棵树，上方是五十万只昆虫，再往上是少数小型鸟类，顶部一只雀鹰。',
          },
          whyUseful: {
            en: 'Easiest to count in the field. But the numbers can be misleading — one oak can support 500 000 caterpillars.',
            zh: '在野外最容易清点。但数字可能误导——一棵橡树能养活 50 万只毛毛虫。',
          },
          limit: {
            en: 'Tells you nothing about the size or mass of the organisms. A parasite and an oak count equally.',
            zh: '看不出生物的大小或质量。寄生虫和橡树在数量上同等计。',
          },
          levels: [
            { label: 'Tertiary (sparrowhawk)', value: 1, color: '#fef3c7' },
            { label: 'Secondary (robin)', value: 4, color: '#dcfce7' },
            { label: 'Primary (caterpillar)', value: 500000, color: '#dbeafe' },
            { label: 'Producer (oak)', value: 1, color: '#fce7f3' },
          ],
        },
        biomass: {
          title: { en: 'Pyramid of biomass — oak woodland', zh: '生物量金字塔——橡树林' },
          unit: 'kg',
          caption: {
            en: 'Weighed dry, the oak is many tonnes of carbon, the caterpillars far less, the robins and the sparrowhawk even less.',
            zh: '以干重计算，橡树有几吨碳，毛毛虫远少，知更鸟和雀鹰更少。',
          },
          whyUseful: {
            en: 'Measures the actual amount of living material at each level. Biomass is what a forest fire would burn.',
            zh: '测量每一营养级的活物质总量。生物量就是一场林火能烧掉多少。',
          },
          limit: {
            en: 'Hard to measure (you have to dry and weigh samples). Does not show how fast the biomass is being replaced — a tree stands for a century, a caterpillar for a week.',
            zh: '难以测量（必须烘干称重）。看不出生物量被替换的速度——一棵树能立一百年，一只毛毛虫只活一周。',
          },
          levels: [
            { label: 'Tertiary', value: 2, color: '#fef3c7' },
            { label: 'Secondary', value: 10, color: '#dcfce7' },
            { label: 'Primary', value: 800, color: '#dbeafe' },
            { label: 'Producer', value: 30000, color: '#fce7f3' },
          ],
        },
        energy: {
          title: { en: 'Pyramid of energy — any ecosystem', zh: '能量金字塔——任何生态系统' },
          unit: 'kJ m⁻² yr⁻¹',
          caption: {
            en: 'Roughly 10% of the energy at one trophic level is passed on to the next. The rest is lost as heat in respiration, in undigested waste, and in movement.',
            zh: '一个营养级大约只有 10% 的能量传递到下一级。其余以呼吸的废热、未被消化的废物和运动的形式损失。',
          },
          whyUseful: {
            en: 'Never inverted — energy must decrease at every step because of the second law of thermodynamics. This is the only one of the three pyramids that is always the right shape.',
            zh: '永不会倒立——根据热力学第二定律，能量在每一步必然减少。这是三种金字塔中唯一形状永远正确的。',
          },
          limit: {
            en: 'Hardest to measure (you have to account for respiration, egestion, and death, not just biomass).',
            zh: '最难测量（必须把呼吸、排遗、死亡都算进去，不只是生物量）。',
          },
          levels: [
            { label: 'Tertiary', value: 5, color: '#fef3c7' },
            { label: 'Secondary', value: 50, color: '#dcfce7' },
            { label: 'Primary', value: 500, color: '#dbeafe' },
            { label: 'Producer', value: 5000, color: '#fce7f3' },
          ],
        },
      },
    },

    // 3) The carbon cycle. Four reservoirs (atmosphere, plants,
    //    animals, fossil fuels), with the processes that move carbon
    //    between them. Optional "show stocks" toggle shows
    //    approximate carbon amounts.
    {
      type: 'nutrient-cycle',
      id: 'nutrient-cycle',
      title: { en: 'The carbon cycle', zh: '碳循环' },
      hint: {
        en: 'Click any arrow to see what process it shows. Toggle "Show carbon stocks" to see how much carbon sits in each reservoir.',
        zh: '点击任一箭头查看它代表的过程。切换"显示碳储量"查看每个储库的碳含量。',
      },
      intro: {
        en: 'Carbon moves between four main reservoirs — the atmosphere, living things, the ocean (omitted here for clarity), and fossil fuels. Burning fossil fuels adds carbon to the atmosphere faster than photosynthesis can remove it, which is why atmospheric CO₂ is rising.',
        zh: '碳在四个主要储库之间流动——大气、生物、海洋（为简洁此处省略）和化石燃料。燃烧化石燃料向大气释放碳的速度比光合作用吸收的速度快，所以大气 CO₂ 在上升。',
      },
      initialSelected: 'photosynthesis',
      reservoirs: [
        {
          id: 'atmosphere',
          label: { en: 'Atmosphere', zh: '大气' },
          stock: { en: '≈ 870 Gt C as CO₂', zh: '≈ 870 Gt 碳（以 CO₂ 形式）' },
          x: 360,
          y: 80,
          color: '#dbeafe',
        },
        {
          id: 'plants',
          label: { en: 'Plants (producers)', zh: '植物（生产者）' },
          stock: { en: '≈ 560 Gt C', zh: '≈ 560 Gt 碳' },
          x: 130,
          y: 240,
          color: '#dcfce7',
        },
        {
          id: 'animals',
          label: { en: 'Animals (consumers)', zh: '动物（消费者）' },
          stock: { en: '≈ 2 Gt C', zh: '≈ 2 Gt 碳' },
          x: 580,
          y: 240,
          color: '#fce7f3',
        },
        {
          id: 'fossil-fuels',
          label: { en: 'Fossil fuels', zh: '化石燃料' },
          stock: { en: '≈ 10 000 Gt C (locked)', zh: '≈ 10 000 Gt 碳（封存）' },
          x: 360,
          y: 390,
          color: '#fef3c7',
        },
      ],
      processes: [
        {
          id: 'photosynthesis',
          label: { en: 'photosynthesis', zh: '光合作用' },
          description: {
            en: 'Plants take CO₂ from the atmosphere and use the energy of sunlight to make glucose. The carbon is now part of the plant. This is the only process that removes carbon from the atmosphere on a large scale.',
            zh: '植物从大气中吸收 CO₂，利用太阳能合成葡萄糖。碳由此进入植物体内。这是大规模把碳从大气中移走的唯一过程。',
          },
          example: {
            en: '≈ 120 Gt C/yr absorbed by land plants + ocean algae',
            zh: '陆地植物 + 海洋藻类每年吸收约 120 Gt 碳',
          },
          from: 'atmosphere',
          to: 'plants',
          color: '#15803d',
        },
        {
          id: 'feeding',
          label: { en: 'feeding', zh: '取食' },
          description: {
            en: 'Animals eat plants (or other animals). Carbon moves from one trophic level to the next as glucose, proteins, and fats in the food.',
            zh: '动物吃植物（或其它动物）。碳以食物中葡萄糖、蛋白质和脂肪的形式从一个营养级进入下一个。',
          },
          example: {
            en: 'A caterpillar eating a leaf transfers that leaf\'s carbon into the caterpillar\'s body',
            zh: '毛毛虫吃叶片，把叶中的碳转移到自己体内',
          },
          from: 'plants',
          to: 'animals',
          color: '#15803d',
        },
        {
          id: 'respiration',
          label: { en: 'respiration', zh: '呼吸' },
          description: {
            en: 'All living things respire — they break down glucose to release energy, and release CO₂ back to the atmosphere as a waste product. Respiration happens in plants, animals, and decomposers.',
            zh: '所有生物都呼吸——分解葡萄糖释放能量，并把 CO₂ 作为废物排回大气。植物、动物、分解者都进行呼吸。',
          },
          example: {
            en: '≈ 60 Gt C/yr released by land plants and animals combined',
            zh: '陆地动植物每年合计释放约 60 Gt 碳',
          },
          from: 'plants',
          to: 'atmosphere',
          color: '#b91c1c',
        },
        {
          id: 'animal-respiration',
          label: { en: 'animal respiration', zh: '动物呼吸' },
          description: {
            en: 'Animals respire too — they release CO₂ back to the atmosphere. This is the counterpart to "feeding" in the cycle.',
            zh: '动物也呼吸——把 CO₂ 排回大气。这是循环中"取食"的反向过程。',
          },
          from: 'animals',
          to: 'atmosphere',
          color: '#b91c1c',
        },
        {
          id: 'death-decay',
          label: { en: 'death and decay', zh: '死亡与分解' },
          description: {
            en: 'When plants and animals die, decomposers (bacteria and fungi) break down their bodies. Most of the carbon returns to the atmosphere as CO₂ through the decomposers\' respiration.',
            zh: '动植物死亡后，分解者（细菌和真菌）分解它们的遗体。大部分碳通过分解者的呼吸以 CO₂ 形式回到大气。',
          },
          from: 'animals',
          to: 'atmosphere',
          color: '#b91c1c',
          dashed: true,
        },
        {
          id: 'burial',
          label: { en: 'burial (over millions of years)', zh: '埋藏（数百万年）' },
          description: {
            en: 'Some dead organisms did not fully decompose — they were buried under sediment and, over millions of years, turned into coal, oil, and natural gas. The carbon stayed locked underground.',
            zh: '部分死亡生物没有完全分解——被沉积物埋藏，经数百万年变成煤、石油和天然气。碳被封存在地下。',
          },
          from: 'plants',
          to: 'fossil-fuels',
          color: '#92400e',
          dashed: true,
        },
        {
          id: 'burning',
          label: { en: 'burning fossil fuels', zh: '燃烧化石燃料' },
          description: {
            en: 'Humans burn coal, oil, and gas for energy. The carbon that was locked underground for hundreds of millions of years is released back to the atmosphere in a few centuries. This is faster than photosynthesis can remove it.',
            zh: '人类燃烧煤、石油和天然气获取能量。封存数亿年的碳在几百年的时间里被释放回大气，速度超过光合作用的吸收。',
          },
          example: {
            en: '≈ 10 Gt C/yr — net addition to the atmosphere',
            zh: '每年约 10 Gt 碳——净增到大气',
          },
          from: 'fossil-fuels',
          to: 'atmosphere',
          color: '#b91c1c',
        },
      ],
    },

    // 4) The sigmoid population growth curve. Click any of the
    //    four phases to read the textbook description and the
    //    factors driving the change.
    {
      type: 'population-curve',
      id: 'population-curve',
      title: { en: 'The sigmoid growth curve', zh: 'S 形增长曲线' },
      hint: {
        en: 'A typical population starts slowly, accelerates, then levels off at the carrying capacity. Click any dot to read what is happening in that phase.',
        zh: '典型的种群先缓慢增长，然后加速，最后稳定在环境容纳量附近。点击任一点查看该阶段的情况。',
      },
      intro: {
        en: 'In a closed system with limited resources, a population does not grow exponentially forever. It follows a sigmoid (S-shaped) curve: slow start, fast middle, then a plateau at the carrying capacity K.',
        zh: '在资源有限的封闭系统中，种群不会永远指数增长。它遵循 S 形曲线：起始缓慢，中期加速，最终在环境容纳量 K 附近稳定下来。',
      },
      initialPhase: 'exponential',
      xAxisLabel: 'Time',
      yAxisLabel: 'Population size (N)',
      carryingCapacity: 1000,
      points: [
        {
          phase: 'lag',
          label: { en: 'lag', zh: '停滞期' },
          description: {
            en: 'A few individuals have arrived in a new habitat. They are still adjusting — finding food, finding mates, establishing territory. Reproduction is slow.',
            zh: '少量个体刚到达新栖息地。它们仍在适应——寻找食物、寻找配偶、建立领地。繁殖较慢。',
          },
          factors: [
            { en: 'Few individuals', zh: '个体数少' },
            { en: 'Still acclimatising', zh: '仍在适应' },
          ],
          x: 1,
          y: 20,
        },
        {
          phase: 'exponential',
          label: { en: 'exponential', zh: '指数期' },
          description: {
            en: 'Resources are abundant, predators and disease are rare, and the population grows faster and faster — each generation has more potential parents than the last.',
            zh: '资源充足，捕食者和疾病较少，种群增长越来越快——每代潜在的父母数量比上一代多。',
          },
          factors: [
            { en: 'Plentiful food', zh: '食物充足' },
            { en: 'Few predators', zh: '捕食者少' },
            { en: 'Low disease', zh: '疾病少' },
          ],
          x: 4,
          y: 600,
        },
        {
          phase: 'stationary',
          label: { en: 'stationary', zh: '稳定期' },
          description: {
            en: 'The population has reached the carrying capacity K. Birth rate ≈ death rate, so the size stays roughly constant. Resources are tight, competition is high.',
            zh: '种群已达到环境容纳量 K。出生率 ≈ 死亡率，因此数量大致恒定。资源紧张，竞争激烈。',
          },
          factors: [
            { en: 'Food becomes limiting', zh: '食物成为限制因素' },
            { en: 'More predators and disease', zh: '捕食者和疾病增多' },
            { en: 'Competition for space', zh: '空间竞争' },
          ],
          x: 8,
          y: 980,
        },
        {
          phase: 'decline',
          label: { en: 'decline', zh: '衰退期' },
          description: {
            en: 'If the environment changes (a drought, a new disease, an introduced predator) the carrying capacity can drop. The population may then fall below the new K.',
            zh: '如果环境发生变化（旱灾、新疾病、外来捕食者），环境容纳量可能下降。种群数量可能跌破新的 K。',
          },
          factors: [
            { en: 'Habitat change', zh: '栖息地变化' },
            { en: 'New disease', zh: '新疾病' },
            { en: 'Resource collapse', zh: '资源崩溃' },
          ],
          x: 10,
          y: 700,
        },
      ],
    },
  ],
}

export default lesson
