import type { Lesson } from '@/content/types'
import narration from './narration'

const lesson: Lesson = {
  slug: '9-6-extraction',
  subject: '0620',
  syllabus: [
    '0620.9.5.1',
    '0620.9.5.2',
    '0620.9.5.3',
    '0620.9.5.4',
    '0620.9.5.5',
    '0620.9.6.1',
    '0620.9.6.2',
    '0620.9.6.3',
    '0620.9.6.4',
  ],
  tier: 'extended',
  estimatedMinutes: 50,

  title: { en: 'Extracting metals and stopping rust', zh: '金属的冶炼与防锈' },
  summary: {
    en: 'How do you get a metal out of its ore, and will one metal protect another? Both questions are answered by the same ladder, with the line drawn in a different place.',
    zh: '如何把金属从矿石中取出？一种金属能否保护另一种？两个问题都由同一张表回答，只是线画在不同位置。',
  },

  objectives: [
    { en: 'State the conditions required for iron to rust.', zh: '说出铁生锈所需的条件。' },
    {
      en: 'State common barrier methods of rust prevention and describe how they work.',
      zh: '说出常见的隔离防锈方法并说明其原理。',
    },
    {
      en: 'Describe galvanising as both a barrier method and sacrificial protection. (Extended)',
      zh: '把镀锌描述为隔离法与牺牲阳极保护的结合。（Extended）',
    },
    {
      en: 'Explain sacrificial protection using the reactivity series. (Extended)',
      zh: '用金属活动性顺序解释牺牲阳极保护。（Extended）',
    },
    {
      en: 'Relate the method used to extract a metal to its position in the reactivity series.',
      zh: '把冶炼方法与金属在活动性顺序中的位置联系起来。',
    },
    {
      en: 'Describe the extraction of iron from haematite in the blast furnace.',
      zh: '描述高炉中由赤铁矿炼铁。',
    },
    {
      en: 'State that aluminium is extracted from bauxite by electrolysis.',
      zh: '说明铝由铝土矿电解制取。',
    },
    {
      en: 'State the symbol equations for the extraction of iron. (Extended)',
      zh: '写出炼铁的化学方程式。（Extended）',
    },
  ],

  glossary: [
    {
      en: 'ore',
      zh: '矿石',
      definition: {
        en: 'A rock containing enough of a metal compound to be worth extracting the metal from.',
        zh: '含有足够多金属化合物、值得从中提取金属的岩石。',
      },
      syllabus: ['0620.9.6.1'],
    },
    {
      en: 'reduction',
      zh: '还原',
      definition: {
        en: 'Loss of oxygen. Extracting a metal from its oxide is a reduction, and something must want the oxygen more than the metal does.',
        zh: '失去氧。从氧化物中提取金属就是还原，必须有比金属更想要氧的物质。',
      },
      syllabus: ['0620.9.6.2'],
    },
    {
      en: 'sacrificial protection',
      zh: '牺牲阳极保护',
      definition: {
        en: 'Attaching a more reactive metal so that it corrodes instead of the iron. It works even when the surface is scratched.',
        zh: '接上一种更活泼的金属，让它代替铁被腐蚀。即使表面划伤仍然有效。',
      },
      syllabus: ['0620.9.5.5'],
    },
    {
      en: 'galvanising',
      zh: '镀锌',
      definition: {
        en: 'Coating steel with zinc. A barrier while intact, and sacrificial protection once scratched — two defences at once.',
        zh: '在钢上镀一层锌。完好时是隔离层，划破后是牺牲阳极保护——一举两得。',
      },
      syllabus: ['0620.9.5.4'],
    },
    {
      en: 'slag',
      zh: '炉渣',
      definition: {
        en: 'Calcium silicate, formed when limestone removes the sandy impurities from iron ore. It floats on the molten iron.',
        zh: '硅酸钙，由石灰石除去铁矿石中的砂质杂质时生成。它浮在铁水上面。',
      },
      syllabus: ['0620.9.6.2'],
    },
  ],

  equations: [
    {
      latex: '\\mathrm{C} + \\mathrm{O_2} \\rightarrow \\mathrm{CO_2}',
      meaning: {
        en: 'The coke burns in the blast of hot air. This is what heats the furnace to about 1500 °C.',
        zh: '焦炭在鼓入的热空气中燃烧。正是它把炉温加热到约 1500 °C。',
      },
      substitute: (r) =>
        `\\text{position } ${Math.round(r['position'] ?? 0)} \\quad \\text{the line sits at position } ${Math.round(r['landmarkPosition'] ?? 0)}`,
    },
    {
      latex: '\\mathrm{CO_2} + \\mathrm{C} \\rightarrow 2\\,\\mathrm{CO}',
      meaning: {
        en: 'Carbon dioxide rises through hot coke and is reduced to carbon monoxide — the reducing agent that does the real work.',
        zh: '二氧化碳上升穿过热焦炭，被还原为一氧化碳——真正起还原作用的就是它。',
      },
    },
    {
      latex: '\\mathrm{Fe_2O_3} + 3\\,\\mathrm{CO} \\rightarrow 2\\,\\mathrm{Fe} + 3\\,\\mathrm{CO_2}',
      meaning: {
        en: 'Carbon monoxide takes the oxygen from the ore. The molten iron runs to the bottom of the furnace.',
        zh: '一氧化碳夺走矿石中的氧。熔融的铁流到炉底。',
      },
    },
    {
      latex: '\\mathrm{CaCO_3} \\rightarrow \\mathrm{CaO} + \\mathrm{CO_2}',
      meaning: {
        en: 'Limestone decomposes in the heat. The calcium oxide then reacts with sandy impurities to make slag.',
        zh: '石灰石受热分解。生成的氧化钙再与砂质杂质反应生成炉渣。',
      },
    },
    {
      latex: '\\mathrm{CaO} + \\mathrm{SiO_2} \\rightarrow \\mathrm{CaSiO_3}',
      meaning: {
        en: 'The slag. It floats on the molten iron and is drained off separately.',
        zh: '这就是炉渣。它浮在铁水上，单独排出。',
      },
    },
  ],

  sim: {
    primitive: 'ladder',
    kernel: '9-6-extraction',
    hint: {
      en: 'Switch the question and watch the line move: carbon decides how a metal is extracted, iron decides what can protect it.',
      zh: '切换问题，注意线的移动：碳决定金属如何冶炼，铁决定什么能保护它。',
    },
    params: [
      {
        key: 'question',
        label: { en: 'Question', zh: '问题' },
        unit: '',
        min: 0,
        max: 1,
        step: 1,
        default: 0,
        options: [
          { value: 0, label: { en: 'How is it extracted?', zh: '如何冶炼？' } },
          { value: 1, label: { en: 'Does it protect iron?', zh: '能否保护铁？' } },
        ],
      },
      {
        key: 'metal',
        label: { en: 'Metal', zh: '金属' },
        unit: '',
        min: 0,
        max: 9,
        step: 1,
        default: 4,
        options: [
          { value: 0, label: { en: 'K', zh: 'K' } },
          { value: 1, label: { en: 'Na', zh: 'Na' } },
          { value: 2, label: { en: 'Ca', zh: 'Ca' } },
          { value: 3, label: { en: 'Mg', zh: 'Mg' } },
          { value: 4, label: { en: 'Al', zh: 'Al' } },
          { value: 5, label: { en: 'Zn', zh: 'Zn' } },
          { value: 6, label: { en: 'Fe', zh: 'Fe' } },
          { value: 7, label: { en: 'Cu', zh: 'Cu' } },
          { value: 8, label: { en: 'Ag', zh: 'Ag' } },
          { value: 9, label: { en: 'Au', zh: 'Au' } },
        ],
      },
    ],
    readouts: [
      {
        key: 'position',
        label: { en: 'Position in the series', zh: '在顺序中的位置' },
        unit: '',
        sigFigs: 2,
        exact: true,
      },
      {
        key: 'landmarkPosition',
        label: { en: 'The line sits at', zh: '线所在位置' },
        unit: '',
        sigFigs: 2,
        exact: true,
      },
      {
        key: 'metalsAboveLine',
        label: { en: 'Metals above the line', zh: '线以上的金属数' },
        unit: '',
        sigFigs: 2,
        exact: true,
      },
      {
        key: 'electronsPerAtom',
        label: { en: 'Electrons per ion', zh: '每个离子需要的电子' },
        unit: '',
        sigFigs: 1,
        exact: true,
      },
    ],
    presets: [
      { label: { en: 'Aluminium: electrolysis', zh: '铝：电解' }, params: { metal: 4, question: 0 } },
      { label: { en: 'Iron: blast furnace', zh: '铁：高炉' }, params: { metal: 6, question: 0 } },
      { label: { en: 'Gold: dug up as gold', zh: '金：直接开采' }, params: { metal: 9, question: 0 } },
      { label: { en: 'Zinc protects iron', zh: '锌保护铁' }, params: { metal: 5, question: 1 } },
      { label: { en: 'Copper does not', zh: '铜不能' }, params: { metal: 7, question: 1 } },
    ],
  },

  narration,

  checkpoints: [
    {
      id: '0620-9-6-cp1',
      syllabus: ['0620.9.5.1'],
      tier: 'core',
      commandWord: 'State',
      marks: 2,
      stem: 'State the two substances that must both be present for iron to rust, and name the product formed.',
      markScheme: [
        { text: 'Water and oxygen, both of them', marks: 1 },
        { text: 'Hydrated iron(III) oxide (rust)', marks: 1 },
      ],
      examinerNote: {
        en: '"Air and water" is accepted, but "air" alone is not — it is the oxygen in the air that matters. Both substances are needed; remove either and rusting stops.',
        zh: '写"空气和水"可以接受，但只写"空气"不行——起作用的是空气中的氧气。两者缺一不可，去掉任何一样都不会生锈。',
      },
    },
    {
      id: '0620-9-6-cp2',
      syllabus: ['0620.9.5.4', '0620.9.5.5'],
      tier: 'extended',
      commandWord: 'Explain',
      marks: 3,
      stem: 'A steel bucket is coated in zinc. Explain why the steel does not rust even after the coating is scratched.',
      markScheme: [
        { text: 'Zinc is more reactive than iron', marks: 1 },
        {
          text: 'so the zinc loses electrons and corrodes in preference to the iron',
          marks: 1,
        },
        {
          text: 'This is sacrificial protection, and it continues to work once the barrier is broken',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'The question says "after the coating is scratched" precisely to rule out the barrier answer. If your answer would work equally well for paint, you have not answered it.',
        zh: '题目特意写"镀层被划破后"，就是为了排除隔离层的答案。如果你的答案换成油漆也同样成立，那就没有答到点上。',
      },
    },
    {
      id: '0620-9-6-cp3',
      syllabus: ['0620.9.6.1'],
      tier: 'core',
      commandWord: 'Explain',
      marks: 2,
      stem: 'Zinc is extracted by heating its ore with carbon, but magnesium must be extracted by electrolysis. Explain why.',
      markScheme: [
        { text: 'Zinc is below carbon in the reactivity series, so carbon can reduce it', marks: 1 },
        {
          text: 'Magnesium is above carbon, so carbon cannot remove the oxygen from it and electrolysis must be used',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Say which side of carbon each metal is on. "Magnesium is more reactive" is only half of it — more reactive *than carbon* is the point.',
        zh: '要说明每种金属在碳的哪一侧。只写"镁更活泼"只答了一半——关键是比*碳*更活泼。',
      },
    },
    {
      id: '0620-9-6-cp4',
      syllabus: ['0620.9.6.2', '0620.9.6.4'],
      tier: 'extended',
      commandWord: 'Describe',
      marks: 4,
      stem: 'Describe how iron is extracted from haematite in the blast furnace. Include two equations.',
      markScheme: [
        {
          text: 'Iron ore, coke and limestone are added at the top and hot air is blasted in at the bottom',
          marks: 1,
        },
        { text: 'C + O₂ → CO₂, then CO₂ + C → 2CO', marks: 1 },
        { text: 'Fe₂O₃ + 3CO → 2Fe + 3CO₂ — carbon monoxide reduces the ore', marks: 1 },
        {
          text: 'Limestone decomposes and the calcium oxide removes sandy impurities as slag',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'The reducing agent is carbon monoxide, not carbon. Carbon’s job is to burn and to make the carbon monoxide — writing Fe₂O₃ + 3C loses the mark.',
        zh: '还原剂是一氧化碳，不是碳。碳的作用是燃烧供热并生成一氧化碳——写成 Fe₂O₃ + 3C 会丢分。',
      },
    },
    {
      id: '0620-9-6-cp5',
      syllabus: ['0620.9.5.2', '0620.9.5.3'],
      tier: 'core',
      commandWord: 'Describe',
      marks: 2,
      stem: 'Describe one barrier method of preventing rust and explain how it works.',
      markScheme: [
        { text: 'Painting, greasing, oiling or coating with plastic', marks: 1 },
        {
          text: 'It keeps water and oxygen away from the iron surface, so the reaction cannot happen',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Naming a method is one mark; the second is for saying what it excludes. "It stops the iron rusting" restates the question and scores nothing.',
        zh: '说出方法得一分；第二分要说明它隔绝了什么。写"它能防止铁生锈"只是复述题目，得不到分。',
      },
    },
    {
      id: '0620-9-6-cp6',
      syllabus: ['0620.9.6.3'],
      tier: 'core',
      commandWord: 'Suggest',
      marks: 2,
      stem: 'Aluminium is the most abundant metal in the Earth’s crust, yet it is more expensive than iron. Suggest why.',
      markScheme: [
        {
          text: 'Aluminium must be extracted by electrolysis, since it is above carbon in the reactivity series',
          marks: 1,
        },
        {
          text: 'Electrolysis uses very large amounts of electricity, which is expensive',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Cost follows from the method, and the method follows from the position. A "suggest" question wants that chain, not just "it is hard to extract".',
        zh: '成本由方法决定，方法由位置决定。"Suggest" 类题要的是这条完整的因果链，而不只是"它难以提取"。',
      },
    },
  ],
}

export default lesson
