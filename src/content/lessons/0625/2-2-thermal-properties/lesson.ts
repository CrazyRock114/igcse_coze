import type { Lesson } from '@/content/types'
import { formatSigFigs } from '@/lib/units'
import narration from './narration'

const lesson: Lesson = {
  slug: '2-2-thermal-properties',
  subject: '0625',
  syllabus: [
    '0625.2.2.1.1',
    '0625.2.2.1.2',
    '0625.2.2.1.3',
    '0625.2.2.2.1',
    '0625.2.2.2.2',
    '0625.2.2.2.3',
    '0625.2.2.2.4',
    '0625.2.2.3.1',
    '0625.2.2.3.2',
    '0625.2.2.3.3',
    '0625.2.2.3.4',
    '0625.2.2.3.5',
    '0625.2.2.3.6',
    '0625.2.2.3.7',
    '0625.2.2.3.8',
  ],
  tier: 'extended',
  estimatedMinutes: 55,

  title: { en: 'Heating, melting and boiling', zh: '加热、熔化与沸腾' },
  summary: {
    en: 'Heat ice steadily and plot the temperature. Two flat plateaus appear where energy goes in but the temperature will not move.',
    zh: '持续加热冰块并记录温度。会出现两段水平平台——能量在输入，温度却不变。',
  },

  objectives: [
    {
      en: 'Describe the thermal expansion of solids, liquids and gases, with everyday consequences.',
      zh: '描述固体、液体和气体的热膨胀及其日常后果。',
    },
    {
      en: 'Explain the relative sizes of expansion using particle arrangement and motion. (Extended)',
      zh: '用粒子排列与运动解释三态膨胀量级的差异。（Extended）',
    },
    { en: 'Know that a rise in temperature increases internal energy.', zh: '知道温度升高会增加内能。' },
    {
      en: 'Describe a temperature rise as an increase in average particle kinetic energy. (Extended)',
      zh: '把升温描述为粒子平均动能增大。（Extended）',
    },
    {
      en: 'Define specific heat capacity and use c = E / (mΔθ). (Extended)',
      zh: '定义比热容并使用 c = E / (mΔθ)。（Extended）',
    },
    {
      en: 'Describe experiments to measure the specific heat capacity of a solid and a liquid. (Extended)',
      zh: '描述测定固体与液体比热容的实验。（Extended）',
    },
    {
      en: 'Describe melting and boiling as energy input without a change in temperature.',
      zh: '把熔化和沸腾描述为吸热而温度不变。',
    },
    {
      en: 'Know the melting and boiling temperatures of water at standard pressure.',
      zh: '知道标准大气压下水的熔点与沸点。',
    },
    {
      en: 'Describe condensation, solidification and evaporation in terms of particles.',
      zh: '用粒子描述凝结、凝固与蒸发。',
    },
    { en: 'Know that evaporation cools the liquid left behind.', zh: '知道蒸发使剩余液体降温。' },
    {
      en: 'Describe the differences between boiling and evaporation. (Extended)',
      zh: '说明沸腾与蒸发的区别。（Extended）',
    },
    {
      en: 'Describe how temperature, surface area and air movement affect evaporation. (Extended)',
      zh: '说明温度、表面积与空气流动对蒸发的影响。（Extended）',
    },
  ],

  glossary: [
    {
      en: 'specific heat capacity',
      zh: '比热容',
      definition: {
        en: 'The energy needed to raise the temperature of 1 kg of a substance by 1 °C. Water’s is unusually high, about 4200 J / (kg °C).',
        zh: '使 1 kg 物质升温 1 °C 所需的能量。水的比热容异常高，约 4200 J / (kg °C)。',
      },
      syllabus: ['0625.2.2.2.3'],
    },
    {
      en: 'internal energy',
      zh: '内能',
      definition: {
        en: 'The total kinetic and potential energy of all the particles in an object. Heating increases it.',
        zh: '物体内所有粒子动能与势能的总和。加热会使其增加。',
      },
      syllabus: ['0625.2.2.2.1'],
    },
    {
      en: 'melting',
      zh: '熔化',
      definition: {
        en: 'The change from solid to liquid at a fixed temperature. Energy goes in but the temperature stays constant.',
        zh: '在固定温度下由固态变为液态。吸收能量但温度不变。',
      },
      syllabus: ['0625.2.2.3.1'],
    },
    {
      en: 'boiling',
      zh: '沸腾',
      definition: {
        en: 'A change from liquid to gas at one fixed temperature, happening throughout the liquid with bubbles forming inside it.',
        zh: '在固定温度下由液态变为气态，发生在液体内部各处并产生气泡。',
      },
      syllabus: ['0625.2.2.3.6'],
    },
    {
      en: 'evaporation',
      zh: '蒸发',
      definition: {
        en: 'The escape of the more energetic particles from the surface of a liquid. Happens at any temperature and cools what is left.',
        zh: '能量较高的粒子从液面逸出。在任何温度下都能发生，并使剩余液体降温。',
      },
      syllabus: ['0625.2.2.3.4', '0625.2.2.3.5'],
    },
    {
      en: 'thermal expansion',
      zh: '热膨胀',
      definition: {
        en: 'The increase in size on heating, caused by particles vibrating more and moving further apart. The particles themselves do not grow.',
        zh: '受热时体积增大，因粒子振动加剧、间距变大。粒子本身并不变大。',
      },
      syllabus: ['0625.2.2.1.1'],
    },
  ],

  equations: [
    {
      latex: 'E = mc\\,\\Delta\\theta',
      meaning: {
        en: 'Use this on the sloping sections, where the temperature is changing.',
        zh: '用于倾斜段，即温度发生变化的部分。',
      },
      substitute: (r) =>
        `\\text{gradient} = ${formatSigFigs(r['liquidGradient'] ?? 0, 3)}\\ ^\\circ\\text{C/s},\\quad E_{\\text{liquid}} = ${formatSigFigs(
          r['energyToHeatLiquid'] ?? 0,
          3
        )}\\ \\text{J}`,
    },
    {
      latex: 'E = mL',
      meaning: {
        en: 'Use this on the flat plateaus, where the state is changing but the temperature is not.',
        zh: '用于水平平台，即物态改变而温度不变的部分。',
      },
      substitute: (r) =>
        `E_{\\text{melt}} = ${formatSigFigs(r['energyToMelt'] ?? 0, 3)}\\ \\text{J},\\quad E_{\\text{boil}} = ${formatSigFigs(
          r['energyToBoil'] ?? 0,
          3
        )}\\ \\text{J}\\ (${formatSigFigs(r['boilToMeltRatio'] ?? 0, 2)}\\times)`,
    },
  ],

  sim: {
    primitive: 'plot2d',
    kernel: '2-2-thermal-properties',
    hint: {
      en: 'Double the specific heat capacity — the sloping sections get shallower, but the plateaus do not move.',
      zh: '把比热容加倍——倾斜段变缓，但两段平台的长度不变。',
    },
    params: [
      {
        key: 'mass',
        label: { en: 'Mass', zh: '质量' },
        unit: 'kg',
        symbol: 'm',
        min: 0.1,
        max: 2,
        step: 0.1,
        default: 0.5,
      },
      {
        key: 'specificHeat',
        label: { en: 'Specific heat capacity', zh: '比热容' },
        unit: 'J / (kg °C)',
        symbol: 'c',
        min: 500,
        max: 8000,
        step: 100,
        default: 4200,
      },
      {
        key: 'latentFusion',
        label: { en: 'Latent heat of fusion', zh: '熔化潜热' },
        unit: 'kJ / kg',
        min: 50,
        max: 500,
        step: 10,
        default: 334,
      },
      {
        key: 'latentVaporisation',
        label: { en: 'Latent heat of vaporisation', zh: '汽化潜热' },
        unit: 'kJ / kg',
        min: 200,
        max: 3000,
        step: 50,
        default: 2260,
      },
      {
        key: 'power',
        label: { en: 'Heater power', zh: '加热功率' },
        unit: 'W',
        symbol: 'P',
        min: 100,
        max: 2000,
        step: 50,
        default: 500,
      },
    ],
    readouts: [
      {
        key: 'liquidGradient',
        label: { en: 'Slope while liquid', zh: '液态段斜率' },
        unit: '°C / s',
        sigFigs: 3,
      },
      {
        key: 'energyToMelt',
        label: { en: 'Energy to melt', zh: '熔化所需能量' },
        unit: 'J',
        sigFigs: 3,
      },
      {
        key: 'energyToBoil',
        label: { en: 'Energy to boil', zh: '沸腾所需能量' },
        unit: 'J',
        sigFigs: 3,
      },
      {
        key: 'boilToMeltRatio',
        label: { en: 'Boiling ÷ melting', zh: '沸腾 ÷ 熔化' },
        unit: '×',
        sigFigs: 3,
      },
    ],
    presets: [
      {
        label: { en: 'Water', zh: '水' },
        params: { mass: 0.5, specificHeat: 4200, latentFusion: 334, latentVaporisation: 2260, power: 500 },
      },
      {
        label: { en: 'Double the specific heat', zh: '比热容加倍' },
        params: { mass: 0.5, specificHeat: 8000, latentFusion: 334, latentVaporisation: 2260, power: 500 },
      },
      {
        label: { en: 'Twice the mass', zh: '质量加倍' },
        params: { mass: 1, specificHeat: 4200, latentFusion: 334, latentVaporisation: 2260, power: 500 },
      },
      {
        label: { en: 'Stronger heater', zh: '加热功率更大' },
        params: { mass: 0.5, specificHeat: 4200, latentFusion: 334, latentVaporisation: 2260, power: 1500 },
      },
    ],
  },

  narration,

  checkpoints: [
    {
      id: '2-2-cp1',
      syllabus: ['0625.2.2.3.1'],
      tier: 'core',
      commandWord: 'Explain',
      marks: 2,
      stem: 'A beaker of pure water is heated steadily. While it is boiling, the temperature stays at 100 °C even though the heater is still on. Explain why.',
      markScheme: [
        {
          text: 'The energy supplied is used to separate the particles / overcome the forces between them',
          marks: 1,
          alternatives: ['used to change state'],
        },
        {
          text: 'rather than to increase the kinetic energy of the particles, so the temperature does not rise',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Both halves are needed: what the energy IS doing, and what it is NOT doing. Saying only "it is changing state" scores one mark.',
        zh: '两半都要写：能量在做什么，以及它没在做什么。只写"在改变状态"得一分。',
      },
    },
    {
      id: '2-2-cp2',
      syllabus: ['0625.2.2.2.3'],
      tier: 'extended',
      commandWord: 'Calculate',
      marks: 3,
      stem: 'A 2.0 kg block of aluminium is heated from 20 °C to 70 °C. The specific heat capacity of aluminium is 900 J / (kg °C). Calculate the energy supplied.',
      markScheme: [
        { text: 'Uses E = mcΔθ', marks: 1 },
        { text: 'Correct substitution: 2.0 × 900 × 50', marks: 1 },
        { text: '90 000 J (accept 90 kJ)', marks: 1 },
      ],
      examinerNote: {
        en: 'Δθ is the temperature CHANGE, 50 °C, not the final temperature of 70 °C. Substituting 70 gives 126 000 J and loses two marks.',
        zh: 'Δθ 是温度变化量 50 °C，不是末温 70 °C。代入 70 会得到 126 000 J，丢两分。',
      },
    },
    {
      id: '2-2-cp3',
      syllabus: ['0625.2.2.3.6'],
      tier: 'extended',
      commandWord: 'Compare',
      marks: 3,
      stem: 'Compare evaporation with boiling.',
      markScheme: [
        {
          text: 'Evaporation happens at any temperature, whereas boiling happens only at one fixed temperature',
          marks: 1,
        },
        {
          text: 'Evaporation happens only at the surface, whereas boiling happens throughout the liquid',
          marks: 1,
        },
        {
          text: 'Bubbles form in the liquid during boiling but not during evaporation',
          marks: 1,
          alternatives: ['evaporation is a slower process'],
        },
      ],
      examinerNote: {
        en: 'Compare means linked statements. Writing three facts about evaporation and then three about boiling usually loses marks — pair them up.',
        zh: 'Compare 要求对照着写。先列三条蒸发再列三条沸腾往往会失分——要成对写。',
      },
    },
    {
      id: '2-2-cp4',
      syllabus: ['0625.2.2.1.3'],
      tier: 'extended',
      commandWord: 'Explain',
      marks: 2,
      stem: 'For the same rise in temperature, a gas expands far more than a solid. Explain why, in terms of particles.',
      markScheme: [
        {
          text: 'In a solid the particles are held closely together by strong forces, so they can only vibrate a little further apart',
          marks: 1,
        },
        {
          text: 'In a gas the forces between particles are negligible, so the particles are free to move much further apart',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Never write that the particles themselves expand. Expansion is entirely about the spacing between particles increasing.',
        zh: '绝不要写粒子本身膨胀。膨胀完全是粒子之间间距增大所致。',
      },
    },
  ],
}

export default lesson
