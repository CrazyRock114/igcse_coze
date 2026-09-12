import type { Lesson } from '@/content/types'
import { formatSigFigs } from '@/lib/units'
import narration from './narration'

const lesson: Lesson = {
  slug: '6-2-universe',
  subject: '0625',
  syllabus: [
    '0625.6.2.1.1',
    '0625.6.2.1.2',
    '0625.6.2.2.1',
    '0625.6.2.2.2',
    '0625.6.2.2.3',
    '0625.6.2.3.1',
    '0625.6.2.3.2',
    '0625.6.2.3.3',
    '0625.6.2.3.4',
    '0625.6.2.3.5',
    '0625.6.2.3.6',
    '0625.6.2.3.7',
    '0625.6.2.3.8',
    '0625.6.2.3.9',
    '0625.6.2.3.10',
    '0625.6.2.3.11',
  ],
  tier: 'extended',
  estimatedMinutes: 55,

  title: { en: 'Stars and the expanding Universe', zh: '恒星与膨胀的宇宙' },
  summary: {
    en: 'Plot recession speed against distance, measure the gradient, and turn it upside down to estimate the age of the Universe.',
    zh: '作出退行速度–距离图，测出斜率，再取倒数估算宇宙的年龄。',
  },

  objectives: [
    {
      en: 'Know the Sun’s size, composition and main emission regions.',
      zh: '知道太阳的大小、成分与主要辐射波段。',
    },
    {
      en: 'Know that stable stars are powered by hydrogen fusing into helium. (Extended)',
      zh: '知道稳定恒星由氢聚变为氦提供能量。（Extended）',
    },
    {
      en: 'State facts about galaxies, the Milky Way and the light-year.',
      zh: '说出关于星系、银河系与光年的事实。',
    },
    { en: 'Know that one light-year is about 9.5 × 10¹⁵ m. (Extended)', zh: '知道一光年约 9.5 × 10¹⁵ m。（Extended）' },
    { en: 'Describe the life cycle of a star. (Extended)', zh: '描述恒星的一生。（Extended）' },
    { en: 'Know the scale of the Milky Way within the Universe.', zh: '知道银河系在宇宙中的尺度。' },
    {
      en: 'Describe redshift as an increase in observed wavelength from receding galaxies.',
      zh: '把红移描述为退行星系发出的光观测波长变长。',
    },
    {
      en: 'Know that redshift is evidence for an expanding Universe and the Big Bang.',
      zh: '知道红移是宇宙膨胀与大爆炸的证据。',
    },
    {
      en: 'Know about cosmic microwave background radiation and explain its origin. (Extended)',
      zh: '了解宇宙微波背景辐射并解释其来源。（Extended）',
    },
    {
      en: 'Know how recession speed and distance to a far galaxy are measured. (Extended)',
      zh: '知道如何测量遥远星系的退行速度与距离。（Extended）',
    },
    {
      en: 'Define the Hubble constant and use H₀ = v / d. (Extended)',
      zh: '定义哈勃常数并使用 H₀ = v / d。（Extended）',
    },
    {
      en: 'Know that 1 / H₀ estimates the age of the Universe. (Extended)',
      zh: '知道 1 / H₀ 给出宇宙年龄的估计。（Extended）',
    },
  ],

  glossary: [
    {
      en: 'redshift',
      zh: '红移',
      definition: {
        en: 'An increase in the observed wavelength of light from a source moving away from us, shifting it towards the red end of the spectrum.',
        zh: '远离我们的光源发出的光，观测波长变长、向光谱红端移动。',
      },
      syllabus: ['0625.6.2.3.2'],
    },
    {
      en: 'light-year',
      zh: '光年',
      definition: {
        en: 'The distance light travels in one year, about 9.5 × 10¹⁵ m. A unit of distance, not of time.',
        zh: '光在一年中传播的距离，约 9.5 × 10¹⁵ m。这是距离单位，不是时间单位。',
      },
      syllabus: ['0625.6.2.2.1', '0625.6.2.2.2'],
    },
    {
      en: 'Hubble constant',
      zh: '哈勃常数',
      definition: {
        en: 'The ratio of a galaxy’s recession speed to its distance from Earth. Current estimate about 2.2 × 10⁻¹⁸ per second.',
        zh: '星系退行速度与其到地球距离之比。现行估计约 2.2 × 10⁻¹⁸ 每秒。',
      },
      syllabus: ['0625.6.2.3.9', '0625.6.2.3.10'],
    },
    {
      en: 'cosmic microwave background',
      zh: '宇宙微波背景辐射',
      definition: {
        en: 'Faint microwave radiation observed from every direction, produced shortly after the Universe formed and stretched by the expansion since.',
        zh: '来自各个方向的微弱微波辐射，产生于宇宙形成后不久，此后被膨胀拉长。',
      },
      syllabus: ['0625.6.2.3.5', '0625.6.2.3.6'],
    },
    {
      en: 'supernova',
      zh: '超新星',
      definition: {
        en: 'The explosion of a red supergiant, leaving a neutron star or black hole. Its brightness is used to measure distances to far galaxies.',
        zh: '红超巨星的爆发，留下中子星或黑洞。其亮度用于测量遥远星系的距离。',
      },
      syllabus: ['0625.6.2.2.3', '0625.6.2.3.8'],
    },
    {
      en: 'nuclear fusion',
      zh: '核聚变',
      definition: {
        en: 'The joining of light nuclei into heavier ones, releasing energy. Hydrogen fusing to helium powers stable stars.',
        zh: '轻核结合成重核并释放能量。氢聚变为氦为稳定恒星提供能量。',
      },
      syllabus: ['0625.6.2.1.2'],
    },
  ],

  equations: [
    {
      latex: 'H_0 = \\frac{v}{d}',
      meaning: {
        en: 'The Hubble constant is the gradient of the recession speed against distance graph.',
        zh: '哈勃常数就是退行速度–距离图像的斜率。',
      },
      substitute: (r) =>
        `H_0 = ${formatSigFigs(r['hubbleConstant'] ?? 0, 3)} \\times 10^{-18}\\ \\text{s}^{-1},\\quad \\text{gradient} = ${formatSigFigs(
          r['gradient'] ?? 0,
          3
        )}\\ \\text{km/s per Mly}`,
    },
    {
      latex: '\\text{age} \\approx \\frac{1}{H_0}',
      meaning: {
        en: 'One over the Hubble constant estimates how long the Universe has been expanding.',
        zh: '哈勃常数的倒数给出宇宙膨胀持续时间的估计。',
      },
      substitute: (r) =>
        `\\approx ${formatSigFigs(r['ageOfUniverse'] ?? 0, 3)}\\ \\text{billion years}`,
    },
  ],

  sim: {
    primitive: 'plot2d',
    kernel: '6-2-universe',
    hint: {
      en: 'Raise the Hubble constant — the line steepens and the estimated age of the Universe falls.',
      zh: '调高哈勃常数——直线变陡，估算出的宇宙年龄随之减小。',
    },
    params: [
      {
        key: 'hubbleConstant',
        label: { en: 'Hubble constant', zh: '哈勃常数' },
        unit: '× 10⁻¹⁸ / s',
        symbol: 'H_0',
        min: 1,
        max: 4,
        step: 0.1,
        default: 2.2,
      },
      {
        key: 'galaxyCount',
        label: { en: 'Galaxies observed', zh: '观测星系数' },
        unit: '',
        min: 3,
        max: 20,
        step: 1,
        default: 12,
      },
      {
        key: 'scatter',
        label: { en: 'Measurement scatter', zh: '测量散布' },
        unit: '',
        min: 0,
        max: 1,
        step: 0.1,
        default: 0.5,
      },
    ],
    readouts: [
      {
        key: 'ageOfUniverse',
        label: { en: 'Estimated age', zh: '估算年龄' },
        unit: 'billion years',
        sigFigs: 3,
      },
      {
        key: 'gradient',
        label: { en: 'Graph gradient', zh: '图像斜率' },
        unit: 'km/s per Mly',
        sigFigs: 3,
      },
      {
        key: 'farthestSpeed',
        label: { en: 'Speed of farthest galaxy', zh: '最远星系速度' },
        unit: 'km / s',
        sigFigs: 3,
      },
    ],
    presets: [
      {
        label: { en: 'Current best estimate', zh: '现行最佳估计' },
        params: { hubbleConstant: 2.2, galaxyCount: 12, scatter: 0.5 },
      },
      {
        label: { en: 'Perfect data', zh: '理想数据' },
        params: { hubbleConstant: 2.2, galaxyCount: 12, scatter: 0 },
      },
      {
        label: { en: 'Messy real survey', zh: '真实巡天数据' },
        params: { hubbleConstant: 2.2, galaxyCount: 20, scatter: 1 },
      },
      {
        label: { en: 'Faster expansion', zh: '更快膨胀' },
        params: { hubbleConstant: 4, galaxyCount: 12, scatter: 0.5 },
      },
    ],
  },

  narration,

  checkpoints: [
    {
      id: '6-2-cp1',
      syllabus: ['0625.6.2.3.2', '0625.6.2.3.4'],
      tier: 'core',
      commandWord: 'Explain',
      marks: 3,
      stem: 'Light from distant galaxies is redshifted. Explain what redshift means and what it tells us about the Universe.',
      markScheme: [
        {
          text: 'The observed wavelength is longer than the wavelength emitted',
          marks: 1,
          alternatives: ['shifted towards the red end of the spectrum'],
        },
        { text: 'This shows the galaxies are moving away from us', marks: 1 },
        {
          text: 'Since almost all galaxies show it, the Universe is expanding, which supports the Big Bang theory',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Redshift is about wavelength, not colour. Saying "the galaxy looks red" is not enough — state that the observed wavelength has increased.',
        zh: '红移说的是波长，不是颜色。写"星系看起来发红"不够——要写出观测波长变长了。',
      },
    },
    {
      id: '6-2-cp2',
      syllabus: ['0625.6.2.3.9'],
      tier: 'extended',
      commandWord: 'Calculate',
      marks: 3,
      stem: 'A galaxy 4.7 × 10²⁴ m from Earth is receding at 1.0 × 10⁷ m / s. Calculate the Hubble constant.',
      markScheme: [
        { text: 'Uses H₀ = v / d', marks: 1 },
        { text: 'Correct substitution: (1.0 × 10⁷) / (4.7 × 10²⁴)', marks: 1 },
        { text: '2.1 × 10⁻¹⁸ per second', marks: 1 },
      ],
      examinerNote: {
        en: 'The unit is per second, not m / s — the metres cancel. If a distance is given in light-years, convert it using 9.5 × 10¹⁵ m first.',
        zh: '单位是每秒，不是 m/s——米会约掉。若距离以光年给出，先用 9.5 × 10¹⁵ m 换算。',
      },
    },
    {
      id: '6-2-cp3',
      syllabus: ['0625.6.2.3.11'],
      tier: 'extended',
      commandWord: 'Determine',
      marks: 3,
      stem: 'The Hubble constant is 2.2 × 10⁻¹⁸ per second. Determine an estimate for the age of the Universe in seconds, and state one assumption made.',
      markScheme: [
        { text: 'Uses age ≈ 1 / H₀', marks: 1 },
        { text: '4.5 × 10¹⁷ s', marks: 1 },
        {
          text: 'Assumes the rate of expansion has been constant throughout the history of the Universe',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'The assumption is worth a mark on its own and is easy to forget. 4.5 × 10¹⁷ s works out at roughly 14 thousand million years.',
        zh: '这个假设本身就值一分，很容易漏写。4.5 × 10¹⁷ 秒约合一百四十亿年。',
      },
    },
    {
      id: '6-2-cp4',
      syllabus: ['0625.6.2.2.3'],
      tier: 'extended',
      commandWord: 'Describe',
      marks: 3,
      stem: 'A star much more massive than the Sun runs out of hydrogen in its core. Describe what happens to it from that point onwards.',
      markScheme: [
        { text: 'It expands to become a red supergiant', marks: 1 },
        { text: 'It then explodes as a supernova', marks: 1 },
        {
          text: 'leaving behind a neutron star or, if massive enough, a black hole',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'The sequence must be in order. A star of the Sun’s mass takes the other route — red giant, planetary nebula, white dwarf — so read the question for which mass is meant.',
        zh: '顺序必须正确。太阳质量的恒星走另一条路——红巨星、行星状星云、白矮星——所以要看清题目说的是哪种质量。',
      },
    },
  ],
}

export default lesson
