import type { Lesson } from '@/content/types'
import narration from './narration'

const lesson: Lesson = {
  slug: '21-1-biotechnology',
  subject: '0610',
  syllabus: [
    '0610.21.1.1',
    '0610.21.1.2',
    '0610.21.2.1',
    '0610.21.2.2',
    '0610.21.2.3',
    '0610.21.2.4',
    '0610.21.2.5',
    '0610.21.2.6',
    '0610.21.2.7',
    '0610.21.3.1',
    '0610.21.3.2',
    '0610.21.3.3',
    '0610.21.3.4',
  ],
  tier: 'extended',
  estimatedMinutes: 55,

  title: { en: 'Biotechnology and genetic modification', zh: '生物技术与基因改造' },
  summary: {
    en: 'The water jacket on a fermenter is there to take heat away, not to supply it. The microorganisms heat the vessel themselves, and without cooling they denature their own enzymes.',
    zh: '发酵罐上的水冷夹层是用来带走热量的，不是供热的。微生物自己把罐加热，若不冷却，它们会让自己的酶变性。',
  },

  objectives: [
    {
      en: 'Discuss why bacteria are useful in biotechnology and genetic modification. (Extended)',
      zh: '讨论细菌为何在生物技术与基因改造中有用。（Extended）',
    },
    {
      en: 'Describe the role of anaerobic respiration in yeast in making ethanol and in bread-making.',
      zh: '描述酵母无氧呼吸在制取乙醇与面包制作中的作用。',
    },
    {
      en: 'Describe the use of pectinase in fruit juice production and of enzymes in biological washing powders.',
      zh: '描述果胶酶在果汁生产中的应用，以及酶在生物洗衣粉中的作用。',
    },
    {
      en: 'Explain the use of lactase to produce lactose-free milk. (Extended)',
      zh: '解释用乳糖酶生产无乳糖牛奶。（Extended）',
    },
    {
      en: 'Describe how fermenters are used, and describe and explain the conditions controlled inside them. (Extended)',
      zh: '描述发酵罐的用途，并描述与解释罐内需要控制的条件。（Extended）',
    },
    {
      en: 'Describe genetic modification and outline the process of using bacteria to make a human protein. (Extended)',
      zh: '描述基因改造，并概述利用细菌生产人类蛋白质的过程。（Extended）',
    },
    {
      en: 'Discuss the advantages and disadvantages of genetically modifying crops. (Extended)',
      zh: '讨论转基因作物的优点与缺点。（Extended）',
    },
  ],

  glossary: [
    {
      en: 'fermenter',
      zh: '发酵罐',
      definition: {
        en: 'A large sterile vessel for growing microorganisms on an industrial scale, with temperature, pH, oxygen and stirring all controlled.',
        zh: '用于工业规模培养微生物的大型无菌容器，温度、pH、氧气与搅拌都受到控制。',
      },
      syllabus: ['0610.21.2.6'],
    },
    {
      en: 'plasmid',
      zh: '质粒',
      definition: {
        en: 'A small ring of DNA in a bacterium that can be cut open, given a new gene and put back.',
        zh: '细菌中的小环状 DNA，可以被切开、插入新基因后再放回。',
      },
      syllabus: ['0610.21.3.3'],
    },
    {
      en: 'restriction enzyme',
      zh: '限制酶',
      definition: {
        en: 'An enzyme that cuts DNA at a specific sequence, leaving sticky ends. It does the cutting.',
        zh: '在特定序列处切开 DNA、留下黏性末端的酶。它负责"切"。',
      },
      syllabus: ['0610.21.3.3'],
    },
    {
      en: 'ligase',
      zh: '连接酶',
      definition: {
        en: 'An enzyme that joins DNA fragments together permanently. It does the joining.',
        zh: '把 DNA 片段永久连接在一起的酶。它负责"接"。',
      },
      syllabus: ['0610.21.3.3'],
    },
    {
      en: 'sticky ends',
      zh: '黏性末端',
      definition: {
        en: 'Short single-stranded overhangs left by a restriction enzyme. They pair with complementary ends, which is what lets a human gene fit into a bacterial plasmid.',
        zh: '限制酶切割后留下的短单链突出端。它们与互补末端配对，正因如此人类基因才能嵌入细菌质粒。',
      },
      syllabus: ['0610.21.3.3'],
    },
  ],

  equations: [
    {
      latex: '\\mathrm{C_6H_{12}O_6} \\rightarrow 2\\,\\mathrm{C_2H_5OH} + 2\\,\\mathrm{CO_2}',
      meaning: {
        en: 'Anaerobic respiration in yeast. In brewing the ethanol is the product; in bread-making the carbon dioxide is. One reaction, two industries.',
        zh: '酵母的无氧呼吸。酿酒时乙醇是产物，做面包时二氧化碳才是。一个反应，两个行业。',
      },
      substitute: (r) =>
        `\\text{temperature } ${r['temperature'] ?? 0}\\ ^\\circ\\mathrm{C} \\quad \\text{growth } ${r['growthRate'] ?? 0}\\% \\quad \\text{yield } ${r['yield'] ?? 0}`,
    },
  ],

  sim: {
    primitive: 'plot2d',
    kernel: '21-1-biotechnology',
    hint: {
      en: 'Turn the cooling down and watch the temperature go up. Nothing heated it from outside.',
      zh: '把冷却调低，看温度如何上升。没有任何外部热源加热它。',
    },
    params: [
      {
        key: 'target',
        label: { en: 'Temperature the jacket holds', zh: '夹层维持的温度' },
        unit: '°C',
        min: 5,
        max: 45,
        step: 1,
        default: 30,
      },
      {
        key: 'oxygen',
        label: { en: 'Oxygen bubbled through', zh: '通入的氧气' },
        unit: '%',
        min: 0,
        max: 200,
        step: 5,
        default: 100,
      },
      {
        key: 'ph',
        label: { en: 'pH of the culture', zh: '培养液的 pH' },
        unit: '',
        min: 3,
        max: 10,
        step: 0.5,
        default: 6.5,
      },
      {
        key: 'cooling',
        label: { en: 'How well the cooling works', zh: '冷却系统的效能' },
        unit: '%',
        min: 0,
        max: 100,
        step: 5,
        default: 100,
      },
    ],
    readouts: [
      {
        key: 'temperature',
        label: { en: 'Temperature reached', zh: '实际达到的温度' },
        unit: '°C',
        sigFigs: 3,
        exact: true,
      },
      {
        key: 'growthRate',
        label: { en: 'Growth rate', zh: '生长速率' },
        unit: '%',
        sigFigs: 3,
        exact: true,
      },
      {
        key: 'finalBiomass',
        label: { en: 'Microorganisms at the end', zh: '结束时的微生物量' },
        unit: '',
        sigFigs: 3,
        exact: true,
      },
      {
        key: 'yield',
        label: { en: 'Product obtained', zh: '获得的产物' },
        unit: '',
        sigFigs: 3,
        exact: true,
      },
    ],
    presets: [
      {
        label: { en: 'Everything at its optimum', zh: '各项条件均为最适' },
        params: { target: 30, oxygen: 100, ph: 6.5, cooling: 100 },
      },
      {
        label: { en: 'The cooling has failed', zh: '冷却系统失效' },
        params: { target: 30, oxygen: 100, ph: 6.5, cooling: 0 },
      },
      {
        label: { en: 'Cooling only half working', zh: '冷却只发挥一半作用' },
        params: { target: 30, oxygen: 100, ph: 6.5, cooling: 50 },
      },
      {
        label: { en: 'Short of oxygen', zh: '氧气不足' },
        params: { target: 30, oxygen: 5, ph: 6.5, cooling: 100 },
      },
      {
        label: { en: 'The pH has drifted', zh: 'pH 已偏离' },
        params: { target: 30, oxygen: 100, ph: 3.5, cooling: 100 },
      },
      {
        label: { en: 'Set too cold', zh: '设定温度过低' },
        params: { target: 10, oxygen: 100, ph: 6.5, cooling: 100 },
      },
    ],
  },

  narration,

  checkpoints: [
    {
      id: '0610-21-1-cp1',
      syllabus: ['0610.21.2.7'],
      tier: 'extended',
      commandWord: 'Explain',
      marks: 4,
      stem: 'Explain why the temperature, pH, oxygen supply and stirring must all be controlled inside an industrial fermenter.',
      markScheme: [
        {
          text: 'Temperature is kept at the optimum for the enzymes controlling the reactions; too high and they denature',
          marks: 1,
        },
        {
          text: 'pH is kept at the optimum for those enzymes, so the reactions proceed at the maximum rate',
          marks: 1,
        },
        {
          text: 'Oxygen is supplied because the microorganisms respire aerobically, which releases far more energy per glucose molecule',
          marks: 1,
        },
        {
          text: 'Stirring keeps the microorganisms suspended and in contact with the nutrients and oxygen, and distributes the heat evenly',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Four conditions, four reasons — a list of the conditions with no reasons scores nothing. Two of the four reasons are about enzymes, which is worth saying explicitly.',
        zh: '四项条件、四条理由——只罗列条件而不给理由，一分不得。其中两条理由都与酶有关，值得明确写出来。',
      },
    },
    {
      id: '0610-21-1-cp2',
      syllabus: ['0610.21.2.7'],
      tier: 'extended',
      commandWord: 'Explain',
      marks: 3,
      stem: 'A large industrial fermenter is fitted with a jacket through which cold water is circulated. Explain why cooling, rather than heating, is needed.',
      markScheme: [
        {
          text: 'The microorganisms respire, and respiration releases energy as heat',
          marks: 1,
        },
        {
          text: 'There are very large numbers of them, and a large vessel has a small surface area relative to its volume, so the heat cannot escape fast enough',
          marks: 1,
        },
        {
          text: 'Without cooling the temperature would rise above the optimum and the enzymes would denature, killing the culture',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'The heat comes from inside. Students who assume a fermenter is heated like a water bath miss the whole point of the jacket.',
        zh: '热量来自内部。以为发酵罐像水浴一样需要加热的学生，就完全没有抓住夹层的用意。',
      },
    },
    {
      id: '0610-21-1-cp3',
      syllabus: ['0610.21.3.3'],
      tier: 'extended',
      commandWord: 'Describe',
      marks: 5,
      stem: 'Describe how bacteria can be genetically modified to produce human insulin.',
      markScheme: [
        {
          text: 'A restriction enzyme is used to cut the insulin gene out of human DNA, leaving sticky ends',
          marks: 1,
        },
        {
          text: 'The same restriction enzyme cuts open a plasmid taken from a bacterium, leaving complementary sticky ends',
          marks: 1,
        },
        {
          text: 'The sticky ends of the gene and the plasmid pair up, and ligase joins them together',
          marks: 1,
        },
        {
          text: 'The plasmid is inserted into a bacterium, which is then grown in a fermenter',
          marks: 1,
        },
        {
          text: 'Every descendant carries the gene and produces human insulin, which is extracted and purified',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Name both enzymes and keep their jobs straight: restriction enzymes cut, ligase joins. The sticky ends are why the gene stays in the plasmid rather than falling out.',
        zh: '两种酶都要说出，且分工不能弄混：限制酶负责切，连接酶负责接。黏性末端正是基因能留在质粒中而不掉出来的原因。',
      },
    },
    {
      id: '0610-21-1-cp4',
      syllabus: ['0610.21.2.1', '0610.21.2.2'],
      tier: 'core',
      commandWord: 'Compare',
      marks: 3,
      stem: 'Yeast is used in both brewing and bread-making. Compare how the same reaction is used differently in each.',
      markScheme: [
        {
          text: 'In both, yeast respires anaerobically, converting glucose into ethanol and carbon dioxide',
          marks: 1,
        },
        {
          text: 'In brewing the ethanol is the useful product and the carbon dioxide is usually allowed to escape',
          marks: 1,
        },
        {
          text: 'In bread-making the carbon dioxide is the useful product — it is trapped in the dough and makes it rise — while the ethanol evaporates during baking',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Start by saying the reaction is the same, then split. And "it makes the dough rise" needs the gas being trapped, not just produced.',
        zh: '先说明反应是同一个，再分开讲。另外"使面团发起来"需要气体被截留，而不只是被产生出来。',
      },
    },
    {
      id: '0610-21-1-cp5',
      syllabus: ['0610.21.1.2'],
      tier: 'extended',
      commandWord: 'Explain',
      marks: 3,
      stem: 'Explain why bacteria are particularly suitable for use in genetic modification.',
      markScheme: [
        {
          text: 'They contain plasmids, small rings of DNA that can be removed, cut open, given a gene and returned',
          marks: 1,
        },
        {
          text: 'They reproduce very rapidly, so large numbers of the modified bacteria are produced quickly',
          marks: 1,
        },
        {
          text: 'The genetic code is universal, so a human gene is read in the same way and the bacterium produces the human protein; and there are few ethical objections compared with using animals',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'The universal genetic code is the mark most often missed, and it is the reason the whole technique works at all.',
        zh: '"遗传密码通用"这一分最常被漏掉，而它正是整项技术之所以可行的根本原因。',
      },
    },
    {
      id: '0610-21-1-cp6',
      syllabus: ['0610.21.2.5'],
      tier: 'extended',
      commandWord: 'Explain',
      marks: 2,
      stem: 'Explain how lactase is used to produce milk suitable for people who cannot digest lactose.',
      markScheme: [
        {
          text: 'Lactase breaks down the lactose in the milk into glucose and galactose',
          marks: 1,
        },
        {
          text: 'These are absorbed without needing the person’s own lactase, so the milk can be drunk without symptoms',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'The enzyme does the digestion before the milk is drunk, so the person does not have to. That is the whole idea.',
        zh: '这种酶在牛奶被喝下之前就完成了消化，使人不必自己去消化。整个思路就在于此。',
      },
    },
    {
      id: '0610-21-1-cp7',
      syllabus: ['0610.21.3.4'],
      tier: 'extended',
      commandWord: 'Suggest',
      marks: 4,
      stem: 'Suggest two advantages and two disadvantages of growing genetically modified crops.',
      markScheme: [
        {
          text: 'Advantage: higher yields, so more food is produced from the same area of land',
          marks: 1,
        },
        {
          text: 'Advantage: resistance to pests or herbicides reduces pesticide use, or added nutrients such as vitamin A address deficiency diseases',
          marks: 1,
        },
        {
          text: 'Disadvantage: modified genes may spread to wild relatives by pollination, or long-term effects on health are not fully known',
          marks: 1,
        },
        {
          text: 'Disadvantage: seed is often patented so farmers cannot save it, or loss of traditional varieties reduces genetic variation',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Two of each. Answering with only one side loses half the marks however well it is argued.',
        zh: '正反各两点。只写一面，无论论述多好都会丢掉一半分数。',
      },
    },
  ],
}

export default lesson
