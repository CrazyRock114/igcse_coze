import type { Lesson } from '@/content/types'
import narration from './narration'

const lesson: Lesson = {
  slug: '20-1-human-influences',
  subject: '0610',
  syllabus: [
    '0610.20.1.1',
    '0610.20.1.2',
    '0610.20.1.3',
    '0610.20.2.1',
    '0610.20.2.2',
    '0610.20.2.3',
    '0610.20.2.4',
    '0610.20.3.1',
    '0610.20.3.2',
    '0610.20.3.3',
    '0610.20.3.4',
    '0610.20.4.1',
    '0610.20.4.2',
    '0610.20.4.3',
    '0610.20.4.4',
    '0610.20.4.5',
    '0610.20.4.6',
    '0610.20.4.7',
    '0610.20.4.8',
    '0610.20.4.9',
  ],
  tier: 'extended',
  estimatedMinutes: 60,

  title: { en: 'Human influences on ecosystems', zh: '人类对生态系统的影响' },
  summary: {
    en: 'The fish did not die of the fertiliser — it is not poisonous to them. They died because bacteria, four steps down the chain, used up the oxygen.',
    zh: '鱼不是被化肥毒死的——化肥对它们没有毒性。它们死于这条链上再往下四步的细菌耗尽了氧气。',
  },

  objectives: [
    {
      en: 'Describe how humans have increased food production, and the advantages and disadvantages of monocultures and intensive livestock production.',
      zh: '描述人类提高粮食产量的方式，以及单一栽培与集约化畜牧的优缺点。',
    },
    {
      en: 'Describe biodiversity, the reasons for habitat destruction, and the undesirable effects of deforestation.',
      zh: '描述生物多样性、栖息地被破坏的原因，以及森林砍伐的不良后果。',
    },
    {
      en: 'Describe the effects of untreated sewage, excess fertiliser and non-biodegradable plastics on ecosystems.',
      zh: '描述未处理污水、过量化肥与不可降解塑料对生态系统的影响。',
    },
    { en: 'Explain the process of eutrophication. (Extended)', zh: '解释水体富营养化的过程。（Extended）' },
    {
      en: 'Describe the sources and effects of methane and carbon dioxide pollution.',
      zh: '描述甲烷与二氧化碳污染的来源与影响。',
    },
    {
      en: 'Describe sustainable resources, and explain how forests and fish stocks can be conserved. (Extended)',
      zh: '描述可持续资源，并解释如何保护森林与鱼类资源。（Extended）',
    },
    {
      en: 'Explain why organisms become endangered, how they can be conserved, and the risks of losing genetic variation. (Extended)',
      zh: '解释生物为何濒危、如何加以保护，以及失去遗传变异的风险。（Extended）',
    },
  ],

  glossary: [
    {
      en: 'biodiversity',
      zh: '生物多样性',
      definition: {
        en: 'The number of different species living in an area.',
        zh: '某一地区不同物种的数目。',
      },
      syllabus: ['0610.20.2.1'],
    },
    {
      en: 'eutrophication',
      zh: '水体富营养化',
      definition: {
        en: 'Nitrate enrichment of water leading, through an algal bloom and decomposition, to the removal of dissolved oxygen.',
        zh: '水体硝酸盐富集，经藻类繁盛与分解作用，最终导致溶解氧被耗尽。',
      },
      syllabus: ['0610.20.3.4'],
    },
    {
      en: 'monoculture',
      zh: '单一栽培',
      definition: {
        en: 'Growing a single crop over a large area. Efficient to work, but vulnerable to one pest or disease.',
        zh: '在大片土地上种植同一种作物。作业高效，但易受某一种害虫或病害的毁灭性影响。',
      },
      syllabus: ['0610.20.1.2'],
    },
    {
      en: 'sustainable resource',
      zh: '可持续资源',
      definition: {
        en: 'One that is replaced as fast as it is removed, so it can be used indefinitely.',
        zh: '补充速度不低于消耗速度的资源，因而可以长期使用。',
      },
      syllabus: ['0610.20.4.1'],
    },
    {
      en: 'non-biodegradable',
      zh: '不可生物降解的',
      definition: {
        en: 'Cannot be broken down by decomposers, so it remains in the environment indefinitely.',
        zh: '无法被分解者分解，因而会长期留存在环境中。',
      },
      syllabus: ['0610.20.3.2'],
    },
  ],

  equations: [],

  sim: {
    primitive: 'plot2d',
    kernel: '20-1-human-influences',
    hint: {
      en: 'Step the day forward and watch the five curves rise and fall in order. Then turn the flow up and see the chain never start.',
      zh: '把日期逐步推进，看五条曲线依次起落。然后把水流调大，看这条链如何根本没有启动。',
    },
    params: [
      {
        key: 'nitrate',
        label: { en: 'Nitrate entering the water', zh: '进入水体的硝酸盐' },
        unit: '',
        min: 0,
        max: 100,
        step: 5,
        default: 70,
      },
      {
        key: 'flow',
        label: { en: 'How fast the river flows', zh: '河水流速' },
        unit: '',
        min: 0,
        max: 100,
        step: 5,
        default: 20,
      },
      {
        key: 'day',
        label: { en: 'Days after it arrives', zh: '进入水体后的天数' },
        unit: 'days',
        min: 0,
        max: 60,
        step: 1,
        default: 30,
      },
    ],
    readouts: [
      { key: 'algae', label: { en: 'Algae', zh: '藻类' }, unit: '', sigFigs: 3, exact: true },
      {
        key: 'oxygen',
        label: { en: 'Dissolved oxygen', zh: '溶解氧' },
        unit: '',
        sigFigs: 3,
        exact: true,
      },
      {
        key: 'fish',
        label: { en: 'Fish surviving', zh: '存活的鱼' },
        unit: '%',
        sigFigs: 3,
        exact: true,
      },
      {
        key: 'bloomDay',
        label: { en: 'Day the algae bloomed', zh: '藻类爆发的日子' },
        unit: '',
        sigFigs: 3,
        exact: true,
      },
      {
        key: 'deathDay',
        label: { en: 'Day the oxygen ran out', zh: '氧气耗尽的日子' },
        unit: '',
        sigFigs: 3,
        exact: true,
      },
    ],
    presets: [
      {
        label: { en: 'Before anything happens', zh: '事情尚未发生' },
        params: { nitrate: 80, flow: 10, day: 3 },
      },
      {
        label: { en: 'The algal bloom', zh: '藻类爆发' },
        params: { nitrate: 80, flow: 10, day: 15 },
      },
      {
        label: { en: 'The plants below have died', zh: '水下植物已死亡' },
        params: { nitrate: 80, flow: 10, day: 28 },
      },
      {
        label: { en: 'The oxygen has gone', zh: '氧气已耗尽' },
        params: { nitrate: 80, flow: 10, day: 55 },
      },
      {
        label: { en: 'A fast-flowing river copes', zh: '湍急的河流能够承受' },
        params: { nitrate: 80, flow: 95, day: 55 },
      },
      {
        label: { en: 'No fertiliser at all', zh: '完全没有化肥' },
        params: { nitrate: 0, flow: 20, day: 55 },
      },
    ],
  },

  narration,

  checkpoints: [
    {
      id: '0610-20-1-cp1',
      syllabus: ['0610.20.3.4'],
      tier: 'extended',
      commandWord: 'Explain',
      marks: 5,
      stem: 'Fertiliser washed from a field into a river causes fish downstream to die several weeks later. Explain the process that leads to their death.',
      markScheme: [
        {
          text: 'The fertiliser adds nitrate ions to the water, which had been the limiting factor on algal growth',
          marks: 1,
        },
        { text: 'Algae grow rapidly and form a bloom over the surface of the water', marks: 1 },
        {
          text: 'The bloom blocks light from reaching the plants below, so they cannot photosynthesise and they die',
          marks: 1,
        },
        {
          text: 'Decomposer bacteria multiply, feeding on the dead plants and dead algae',
          marks: 1,
        },
        {
          text: 'The bacteria respire aerobically and use up the dissolved oxygen, so the fish cannot respire and suffocate',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Five links, and the marks are for the sequence. The fertiliser is not toxic to the fish — saying so throws away four of the five marks even though the conclusion is right.',
        zh: '五个环节，得分点就在这个顺序上。化肥对鱼并没有毒性——写它有毒，即使结论对了也会丢掉五分中的四分。',
      },
    },
    {
      id: '0610-20-1-cp2',
      syllabus: ['0610.20.2.4'],
      tier: 'core',
      commandWord: 'Explain',
      marks: 4,
      stem: 'Explain four undesirable effects of clearing a large area of forest.',
      markScheme: [
        {
          text: 'Habitats are destroyed, so species are lost and biodiversity is reduced',
          marks: 1,
        },
        {
          text: 'Tree roots no longer bind the soil, so it is washed away — soil erosion',
          marks: 1,
        },
        {
          text: 'Less water is taken up and intercepted, so rivers receive more run-off and flooding increases',
          marks: 1,
        },
        {
          text: 'Less photosynthesis removes less carbon dioxide from the atmosphere, and burning the timber releases more, contributing to the greenhouse effect',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Four separate effects, not one effect described four ways. The carbon dioxide point has two halves — less taken out, and more put back.',
        zh: '这是四项不同的后果，不是把同一件事说四遍。二氧化碳这一点有两半——吸收的减少了，排放的增加了。',
      },
    },
    {
      id: '0610-20-1-cp3',
      syllabus: ['0610.20.4.6'],
      tier: 'extended',
      commandWord: 'Describe',
      marks: 3,
      stem: 'Describe three measures that could be used to conserve a fish stock, and explain how each one works.',
      markScheme: [
        {
          text: 'Quotas limit the mass of fish that may be caught, so fewer are removed than are replaced by breeding',
          marks: 1,
        },
        {
          text: 'A minimum mesh size lets young fish escape the nets so they survive to breed at least once',
          marks: 1,
        },
        {
          text: 'Closed seasons or protected areas allow fish to breed undisturbed, or one from: fish farming reduces pressure on wild stocks',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Every measure needs its mechanism. "Catch fewer fish" is the aim of all three and does not distinguish them.',
        zh: '每项措施都要说清其机理。"少捕鱼"是这三项共同的目的，并不能把它们区分开。',
      },
    },
    {
      id: '0610-20-1-cp4',
      syllabus: ['0610.20.4.9'],
      tier: 'extended',
      commandWord: 'Explain',
      marks: 3,
      stem: 'A species is reduced to a very small number of individuals before a conservation programme increases its numbers again. Explain why the species may still be at risk.',
      markScheme: [
        {
          text: 'The small population has lost much of its genetic variation, because alleles carried only by the individuals that died have been lost permanently',
          marks: 1,
        },
        {
          text: 'The recovered population is descended from few individuals, so it remains genetically very similar',
          marks: 1,
        },
        {
          text: 'With little variation there is little for natural selection to act on, so the species may be unable to adapt to a new disease or a change in the environment',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Numbers recovering does not restore variation. This is the natural selection lesson applied to conservation — selection needs variation, and the variation is gone.',
        zh: '数量恢复并不能恢复变异。这是把自然选择那一课用到保护生物学上——选择需要变异，而变异已经没有了。',
      },
    },
    {
      id: '0610-20-1-cp5',
      syllabus: ['0610.20.1.2'],
      tier: 'core',
      commandWord: 'Describe',
      marks: 3,
      stem: 'Describe one advantage and two disadvantages of growing a single crop over a very large area.',
      markScheme: [
        {
          text: 'Sowing, treating and harvesting can all be mechanised and done at once, so it is efficient and yields more food per worker',
          marks: 1,
        },
        {
          text: 'The plants are genetically similar, so a single pest or disease can destroy the entire crop',
          marks: 1,
        },
        {
          text: 'Growing the same crop repeatedly removes the same mineral ions from the soil, and habitats and biodiversity are reduced',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'The vulnerability comes from the plants being genetically similar, not simply from there being many of them.',
        zh: '这种脆弱性来自作物在遗传上高度相似，而不只是因为数量多。',
      },
    },
    {
      id: '0610-20-1-cp6',
      syllabus: ['0610.20.3.2', '0610.20.3.3'],
      tier: 'core',
      commandWord: 'Describe',
      marks: 3,
      stem: 'Describe the effects of non-biodegradable plastics on aquatic ecosystems, and state one source of methane pollution.',
      markScheme: [
        {
          text: 'Plastics cannot be broken down by decomposers, so they remain in the environment indefinitely',
          marks: 1,
        },
        {
          text: 'Animals eat them mistaking them for food, filling the gut so the animal starves; or larger pieces entangle animals and drown them',
          marks: 1,
        },
        {
          text: 'Methane comes from cattle, from rice paddies, or from decaying waste in landfill sites',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Say why plastics persist — decomposers cannot break them down. "They last a long time" describes it without explaining it.',
        zh: '要说明塑料为何持久存在——分解者无法分解它们。写"它们能存在很久"只是描述，没有解释。',
      },
    },
  ],
}

export default lesson
