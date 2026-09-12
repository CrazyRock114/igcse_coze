import type { Lesson } from '@/content/types'
import { formatSigFigs } from '@/lib/units'
import narration from './narration'

const lesson: Lesson = {
  slug: '2-3-heat-transfer',
  subject: '0625',
  syllabus: [
    '0625.2.3.1.1',
    '0625.2.3.1.2',
    '0625.2.3.1.3',
    '0625.2.3.1.4',
    '0625.2.3.2.1',
    '0625.2.3.2.2',
    '0625.2.3.3.1',
    '0625.2.3.3.2',
    '0625.2.3.3.3',
    '0625.2.3.3.4',
    '0625.2.3.3.5',
    '0625.2.3.3.6',
    '0625.2.3.3.7',
    '0625.2.3.3.8',
    '0625.2.3.3.9',
    '0625.2.3.4.1',
    '0625.2.3.4.2',
  ],
  tier: 'extended',
  estimatedMinutes: 55,

  title: { en: 'Conduction, convection and radiation', zh: '传导、对流与辐射' },
  summary: {
    en: 'Cool a hot object and compare surfaces on the same axes. A shiny silver surface stays measurably hotter than a dull black one.',
    zh: '冷却一个热物体，在同一坐标上比较不同表面。光亮银色明显比粗糙黑色保持更高温度。',
  },

  objectives: [
    {
      en: 'Describe experiments comparing good and bad thermal conductors.',
      zh: '描述比较良导热体与绝热体的实验。',
    },
    {
      en: 'Explain conduction using lattice vibrations and free electrons. (Extended)',
      zh: '用晶格振动与自由电子解释热传导。（Extended）',
    },
    {
      en: 'Explain why gases and most liquids conduct badly. (Extended)',
      zh: '解释气体与多数液体导热为何差。（Extended）',
    },
    {
      en: 'Know that convection transfers energy in liquids and gases, and explain it using density changes.',
      zh: '知道对流在液体与气体中传热，并用密度变化解释。',
    },
    {
      en: 'Know that thermal radiation is infrared, emitted by all objects, and needs no medium.',
      zh: '知道热辐射是红外线，所有物体都发射，且不需要介质。',
    },
    {
      en: 'Describe how surface colour and texture affect emission, absorption and reflection.',
      zh: '说明表面颜色与粗糙度对发射、吸收和反射的影响。',
    },
    {
      en: 'Describe experiments distinguishing good and bad emitters and absorbers of infrared.',
      zh: '描述区分红外良/劣发射体与吸收体的实验。',
    },
    {
      en: 'Know that constant temperature requires equal rates of energy in and out. (Extended)',
      zh: '知道恒温要求吸收与放出能量的速率相等。（Extended）',
    },
    {
      en: 'Know how the Earth’s temperature depends on the radiation balance. (Extended)',
      zh: '知道地球温度取决于辐射平衡。（Extended）',
    },
    {
      en: 'Describe how emission rate depends on surface temperature and area. (Extended)',
      zh: '说明辐射速率与表面温度及面积的关系。（Extended）',
    },
    {
      en: 'Explain everyday applications of conduction, convection and radiation.',
      zh: '解释传导、对流与辐射的日常应用。',
    },
  ],

  glossary: [
    {
      en: 'conduction',
      zh: '热传导',
      definition: {
        en: 'Energy transfer through a material without the material moving. Fast in metals because free electrons carry the energy.',
        zh: '能量在物质中传递而物质本身不移动。金属中很快，因为自由电子携带能量。',
      },
      syllabus: ['0625.2.3.1.2'],
    },
    {
      en: 'convection',
      zh: '对流',
      definition: {
        en: 'Energy transfer by the bulk movement of a fluid. Warmed fluid expands, becomes less dense and rises.',
        zh: '靠流体整体流动传递能量。受热流体膨胀、密度变小而上升。',
      },
      syllabus: ['0625.2.3.2.2'],
    },
    {
      en: 'thermal radiation',
      zh: '热辐射',
      definition: {
        en: 'Infrared emitted by every object. The only transfer that works across a vacuum.',
        zh: '所有物体都发射的红外线。唯一能穿过真空的传热方式。',
      },
      syllabus: ['0625.2.3.3.1', '0625.2.3.3.2'],
    },
    {
      en: 'emitter',
      zh: '发射体',
      definition: {
        en: 'A surface giving out infrared. Dull dark surfaces are the best emitters; shiny light ones the worst.',
        zh: '发出红外线的表面。粗糙深色最好，光亮浅色最差。',
      },
      syllabus: ['0625.2.3.3.7'],
    },
    {
      en: 'absorber',
      zh: '吸收体',
      definition: {
        en: 'A surface taking in infrared. A good emitter is always an equally good absorber.',
        zh: '吸收红外线的表面。良好的发射体同样是良好的吸收体。',
      },
      syllabus: ['0625.2.3.3.8'],
    },
    {
      en: 'insulator',
      zh: '绝热体',
      definition: {
        en: 'A material that conducts badly, usually by trapping still air. It slows energy transfer but never stops it.',
        zh: '导热差的材料，通常靠封住不流动的空气。它减慢能量传递，但无法完全阻止。',
      },
      syllabus: ['0625.2.3.1.1'],
    },
  ],

  equations: [
    {
      latex: '\\text{rate of cooling} \\propto \\Delta\\theta',
      meaning: {
        en: 'Energy escapes faster the hotter the object is relative to its surroundings — so cooling slows as it proceeds.',
        zh: '物体相对环境越热，能量逃逸越快——因此冷却过程会越来越慢。',
      },
      substitute: (r) =>
        `\\text{initial rate} = ${formatSigFigs(r['initialRate'] ?? 0, 3)}\\ ^\\circ\\text{C/min},\\quad \\text{excess halves in } ${formatSigFigs(
          r['halfTime'] ?? 0,
          3
        )}\\ \\text{min}`,
    },
  ],

  sim: {
    primitive: 'plot2d',
    kernel: '2-3-heat-transfer',
    hint: {
      en: 'Switch to shiny silver — the grey reference stays dull black, so the gap between them is the surface effect.',
      zh: '切换到光亮银色——灰色参照线始终是粗糙黑色，两线之间的差距就是表面效应。',
    },
    params: [
      {
        key: 'surface',
        label: { en: 'Surface finish', zh: '表面处理' },
        unit: '',
        min: 0,
        max: 3,
        step: 1,
        default: 0,
        options: [
          { value: 0, label: { en: 'Dull black', zh: '粗糙黑色' } },
          { value: 1, label: { en: 'Shiny silver', zh: '光亮银色' } },
          { value: 2, label: { en: 'Dull white', zh: '粗糙白色' } },
          { value: 3, label: { en: 'Shiny black', zh: '光亮黑色' } },
        ],
      },
      {
        key: 'startTemp',
        label: { en: 'Starting temperature', zh: '初始温度' },
        unit: '°C',
        min: 25,
        max: 100,
        step: 5,
        default: 80,
      },
      {
        key: 'roomTemp',
        label: { en: 'Room temperature', zh: '室温' },
        unit: '°C',
        min: 0,
        max: 30,
        step: 1,
        default: 20,
      },
      {
        key: 'area',
        label: { en: 'Surface area', zh: '表面积' },
        unit: '× reference',
        symbol: 'A',
        min: 0.5,
        max: 3,
        step: 0.5,
        default: 1,
      },
      {
        key: 'lagging',
        label: { en: 'Insulating lagging', zh: '保温层' },
        unit: '',
        min: 0,
        max: 1,
        step: 0.1,
        default: 0,
      },
      {
        key: 'duration',
        label: { en: 'Time plotted', zh: '绘图时长' },
        unit: 'min',
        min: 10,
        max: 90,
        step: 5,
        default: 40,
      },
    ],
    readouts: [
      {
        key: 'initialRate',
        label: { en: 'Initial cooling rate', zh: '初始冷却速率' },
        unit: '°C / min',
        sigFigs: 3,
      },
      {
        key: 'halfTime',
        label: { en: 'Time for excess to halve', zh: '温差减半所需时间' },
        unit: 'min',
        sigFigs: 3,
      },
      {
        key: 'finalTemp',
        label: { en: 'Temperature at end', zh: '末温' },
        unit: '°C',
        sigFigs: 3,
      },
      {
        key: 'excessRemaining',
        label: { en: 'Excess still remaining', zh: '剩余温差' },
        unit: '°C',
        sigFigs: 3,
      },
    ],
    presets: [
      {
        label: { en: 'Dull black', zh: '粗糙黑色' },
        params: { startTemp: 80, roomTemp: 20, surface: 0, area: 1, lagging: 0, duration: 40 },
      },
      {
        label: { en: 'Shiny silver', zh: '光亮银色' },
        params: { startTemp: 80, roomTemp: 20, surface: 1, area: 1, lagging: 0, duration: 40 },
      },
      {
        label: { en: 'Triple the area', zh: '表面积三倍' },
        params: { startTemp: 80, roomTemp: 20, surface: 0, area: 3, lagging: 0, duration: 40 },
      },
      {
        label: { en: 'Well lagged', zh: '厚保温层' },
        params: { startTemp: 80, roomTemp: 20, surface: 0, area: 1, lagging: 1, duration: 40 },
      },
    ],
  },

  narration,

  checkpoints: [
    {
      id: '2-3-cp1',
      syllabus: ['0625.2.3.1.2', '0625.2.3.1.3'],
      tier: 'extended',
      commandWord: 'Explain',
      marks: 3,
      stem: 'Explain why a metal spoon conducts thermal energy much better than a plastic one.',
      markScheme: [
        {
          text: 'In both, particles vibrate more when heated and pass energy to neighbouring particles',
          marks: 1,
        },
        {
          text: 'A metal also contains free (delocalised) electrons',
          marks: 1,
        },
        {
          text: 'These move through the metal carrying energy, which is a much faster process',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Both mechanisms should appear. The free-electron route is what makes metals special — lattice vibration alone happens in the plastic too.',
        zh: '两种机制都要写到。自由电子通道才是金属的特殊之处——晶格振动在塑料中同样存在。',
      },
    },
    {
      id: '2-3-cp2',
      syllabus: ['0625.2.3.2.2'],
      tier: 'core',
      commandWord: 'Explain',
      marks: 3,
      stem: 'A heater is placed at the bottom of a tank of water. Explain how convection warms the whole tank.',
      markScheme: [
        { text: 'Water near the heater is warmed and expands', marks: 1 },
        {
          text: 'so its density decreases and it rises',
          marks: 1,
        },
        {
          text: 'Cooler, denser water sinks to take its place, setting up a convection current',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'The chain is expand → less dense → rises. Writing "hot water rises" without the density step is worth only one mark.',
        zh: '因果链是膨胀 → 密度变小 → 上升。只写"热水上升"而不提密度，最多得一分。',
      },
    },
    {
      id: '2-3-cp3',
      syllabus: ['0625.2.3.3.3'],
      tier: 'core',
      commandWord: 'Predict',
      marks: 2,
      stem: 'Two identical cans of hot water are left to cool. One is painted dull black, the other polished silver. Predict which cools faster and give a reason.',
      markScheme: [
        { text: 'The dull black can cools faster', marks: 1 },
        {
          text: 'because a dull dark surface is a better emitter of infrared radiation',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Give the prediction and the reason. Note that "black absorbs better" is true but not the reason here — the can is emitting, not absorbing.',
        zh: '既要给预测也要给理由。注意"黑色吸收更好"虽然正确但不是这里的理由——罐子是在发射而不是吸收。',
      },
    },
    {
      id: '2-3-cp4',
      syllabus: ['0625.2.3.3.4', '0625.2.3.3.6'],
      tier: 'extended',
      commandWord: 'Explain',
      marks: 2,
      stem: 'The Earth has stayed at a roughly steady average temperature for a long time. Explain what this implies about the radiation it receives and emits.',
      markScheme: [
        {
          text: 'The Earth must emit energy at the same rate as it receives it from the Sun',
          marks: 1,
        },
        {
          text: 'If the rates were unequal the average temperature would rise or fall until balance was restored',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Constant temperature always means equal rates in and out — not that no energy is being transferred at all.',
        zh: '恒温永远意味着吸收与放出速率相等——而不是完全没有能量传递。',
      },
    },
  ],
}

export default lesson
