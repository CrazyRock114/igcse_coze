import type { Lesson } from '@/content/types'
import narration from './narration'

const lesson: Lesson = {
  slug: '11-3-fuels',
  subject: '0620',
  syllabus: ['0620.11.3.1', '0620.11.3.2', '0620.11.3.3', '0620.11.3.4', '0620.11.3.5'],
  tier: 'core',
  estimatedMinutes: 35,

  title: { en: 'Fossil fuels and fractional distillation', zh: '化石燃料与分馏' },
  summary: {
    en: 'The order of the fractions is not a list to memorise. Boiling point climbs steadily with chain length, the column is hot at the bottom, and the order follows.',
    zh: '各馏分的顺序不是要背的清单。沸点随碳链长度稳步上升，塔底最热，顺序自然就定了。',
  },

  objectives: [
    { en: 'Name the fossil fuels: coal, natural gas and petroleum.', zh: '说出化石燃料：煤、天然气与石油。' },
    { en: 'Name methane as the main constituent of natural gas.', zh: '说明甲烷是天然气的主要成分。' },
    {
      en: 'Describe petroleum as a mixture of hydrocarbons separated by fractional distillation.',
      zh: '把石油描述为可用分馏分离的烃类混合物。',
    },
    { en: 'Name the fractions and state a use for each.', zh: '说出各馏分并说明各自的一种用途。' },
    {
      en: 'Describe the trend in the properties of the fractions with chain length.',
      zh: '描述各馏分性质随碳链长度的变化趋势。',
    },
  ],

  glossary: [
    {
      en: 'fractional distillation',
      zh: '分馏',
      definition: {
        en: 'Separating a mixture of liquids by their different boiling points, in a column that is hot at the bottom and cool at the top.',
        zh: '在塔底热、塔顶冷的分馏塔中，利用沸点不同分离液体混合物。',
      },
      syllabus: ['0620.11.3.3'],
    },
    {
      en: 'fraction',
      zh: '馏分',
      definition: {
        en: 'A group of hydrocarbons with similar chain lengths that condense together. A fraction is still a mixture, so it has a boiling range rather than a boiling point.',
        zh: '碳链长度相近、一同冷凝的一组烃。馏分仍是混合物，因此它有沸程而不是沸点。',
      },
      syllabus: ['0620.11.3.4'],
    },
    {
      en: 'volatility',
      zh: '挥发性',
      definition: {
        en: 'How readily a liquid turns to vapour. It falls as the chains get longer, which is why petrol evaporates in an engine and bitumen does not evaporate off a road.',
        zh: '液体变成蒸气的难易程度。碳链越长挥发性越低，这就是汽油能在发动机中汽化而沥青不会从路面蒸发的原因。',
      },
      syllabus: ['0620.11.3.5'],
    },
    {
      en: 'viscosity',
      zh: '黏度',
      definition: {
        en: 'How thick a liquid is and how slowly it pours. It rises with chain length, because larger molecules attract each other more strongly.',
        zh: '液体的稠度与流动的缓慢程度。它随碳链变长而增大，因为较大的分子之间吸引力更强。',
      },
      syllabus: ['0620.11.3.5'],
    },
  ],

  equations: [
    {
      latex: '\\text{boiling point} \\uparrow \\text{ as chain length} \\uparrow',
      meaning: {
        en: 'The one trend behind everything in this topic — the order of the fractions, their viscosity, their volatility and their uses. Larger molecules attract each other more strongly, so more energy is needed to separate them.',
        zh: '本主题一切内容背后的唯一趋势——馏分的顺序、黏度、挥发性与用途。较大的分子之间吸引力更强，因此分开它们需要更多能量。',
      },
      substitute: (r) =>
        `\\mathrm{C}_{${r['carbonAtoms'] ?? 0}} \\rightarrow ${r['boilingPoint'] ?? 0}\\,^{\\circ}\\mathrm{C}`,
    },
  ],

  sim: {
    primitive: 'plot2d',
    kernel: '11-3-fuels',
    hint: {
      en: 'Slide from 1 carbon to 40 and watch the fraction name change. The order of the column is just this curve read from the top down.',
      zh: '把碳数从 1 滑到 40，看馏分名称如何变化。分馏塔的顺序，就是这条曲线自上而下读出来的。',
    },
    params: [
      {
        key: 'carbonAtoms',
        label: { en: 'Carbon atoms in the chain', zh: '碳链中的碳原子数' },
        unit: '',
        min: 1,
        max: 40,
        step: 1,
        default: 8,
      },
    ],
    readouts: [
      {
        key: 'carbonAtoms',
        label: { en: 'Carbon atoms', zh: '碳原子数' },
        unit: '',
        sigFigs: 2,
        exact: true,
      },
      {
        key: 'boilingPoint',
        label: { en: 'Boiling point', zh: '沸点' },
        unit: '°C',
        sigFigs: 4,
        exact: true,
      },
      {
        key: 'columnHeight',
        label: { en: 'Height up the column', zh: '在塔中的高度' },
        unit: '%',
        sigFigs: 3,
        exact: true,
      },
    ],
    presets: [
      { label: { en: 'Methane — natural gas', zh: '甲烷——天然气' }, params: { carbonAtoms: 1 } },
      { label: { en: 'Refinery gas', zh: '炼厂气' }, params: { carbonAtoms: 3 } },
      { label: { en: 'Petrol for a car', zh: '汽车用汽油' }, params: { carbonAtoms: 8 } },
      { label: { en: 'Kerosene for an aircraft', zh: '飞机用煤油' }, params: { carbonAtoms: 14 } },
      { label: { en: 'Diesel oil', zh: '柴油' }, params: { carbonAtoms: 20 } },
      { label: { en: 'Bitumen for a road', zh: '铺路用沥青' }, params: { carbonAtoms: 40 } },
    ],
  },

  narration,

  checkpoints: [
    {
      id: '0620-11-3-cp1',
      syllabus: ['0620.11.3.3'],
      tier: 'core',
      commandWord: 'Describe',
      marks: 4,
      stem: 'Describe how the fractions of petroleum are separated in a fractionating column, and explain why they separate at different heights.',
      markScheme: [
        {
          text: 'The crude oil is heated until most of it vaporises and the vapour is fed into the bottom of the column',
          marks: 1,
        },
        {
          text: 'The column is hot at the bottom and gets cooler towards the top',
          marks: 1,
        },
        {
          text: 'Each fraction rises until it reaches a height where the temperature has fallen to its own boiling range, where it condenses and is drawn off',
          marks: 1,
        },
        {
          text: 'Fractions with shorter chains have lower boiling points, so they rise higher before condensing; those with longer chains condense lower down',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'The temperature gradient is the mechanism, so the answer has to say the column is hotter at the bottom. Without that, nothing explains why anything condenses anywhere.',
        zh: '温度梯度是原理所在，因此答案必须写出塔底更热。没有这一点，就无法解释任何物质为何在某处冷凝。',
      },
    },
    {
      id: '0620-11-3-cp2',
      syllabus: ['0620.11.3.4'],
      tier: 'core',
      commandWord: 'State',
      marks: 3,
      stem: 'State the name of one fraction obtained from petroleum that is used as a fuel for aircraft, one used as a feedstock for making chemicals, and one used for surfacing roads.',
      markScheme: [
        { text: 'Kerosene (paraffin) for aircraft', marks: 1 },
        { text: 'Naphtha for making chemicals', marks: 1 },
        { text: 'Bitumen for surfacing roads', marks: 1 },
      ],
      examinerNote: {
        en: 'Naphtha is the one most often left out of revision, and it is the only fraction whose main purpose is not to be burnt.',
        zh: '石脑油最容易在复习中被漏掉，而它是唯一一个主要用途不是燃烧的馏分。',
      },
    },
    {
      id: '0620-11-3-cp3',
      syllabus: ['0620.11.3.5'],
      tier: 'core',
      commandWord: 'Describe',
      marks: 3,
      stem: 'Describe how the boiling point, the viscosity and the ease of ignition of the fractions change as the number of carbon atoms in the molecules increases.',
      markScheme: [
        { text: 'The boiling point increases', marks: 1 },
        { text: 'The viscosity increases — the liquid becomes thicker and flows less easily', marks: 1 },
        { text: 'The fraction ignites less easily / is less flammable', marks: 1 },
      ],
      examinerNote: {
        en: 'Ease of ignition goes down while the other two go up. Answering "they all increase" gets two marks out of three and looks like a guess.',
        zh: '易燃性下降，而另外两项上升。答"三者都增大"只能得三分之二，而且看起来像是猜的。',
      },
    },
    {
      id: '0620-11-3-cp4',
      syllabus: ['0620.11.3.5'],
      tier: 'extended',
      commandWord: 'Explain',
      marks: 2,
      stem: 'Explain why the boiling point of a hydrocarbon increases as the number of carbon atoms in its molecules increases.',
      markScheme: [
        {
          text: 'Larger molecules have stronger forces of attraction between them, because there is more contact between neighbouring molecules',
          marks: 1,
        },
        {
          text: 'so more energy is needed to separate the molecules from one another and turn the liquid into a gas',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Boiling separates molecules; it does not break the covalent bonds inside them. Writing "the bonds are stronger" is the standard wrong answer and scores nothing.',
        zh: '沸腾是把分子分开；它不会破坏分子内部的共价键。写"键更强"是标准的错误答案，得不到分。',
      },
    },
    {
      id: '0620-11-3-cp5',
      syllabus: ['0620.11.3.1', '0620.11.3.2'],
      tier: 'core',
      commandWord: 'State',
      marks: 3,
      stem: 'State the names of the three fossil fuels, and state the main constituent of natural gas.',
      markScheme: [
        { text: 'Coal', marks: 1 },
        { text: 'Natural gas and petroleum (crude oil)', marks: 1 },
        { text: 'The main constituent of natural gas is methane', marks: 1 },
      ],
      examinerNote: {
        en: '"Oil" on its own is loose — petroleum or crude oil is what is wanted, since a fraction such as fuel oil is also an oil.',
        zh: '只写"油"太笼统——要写石油或原油，因为燃料油等馏分同样是"油"。',
      },
    },
  ],
}

export default lesson
