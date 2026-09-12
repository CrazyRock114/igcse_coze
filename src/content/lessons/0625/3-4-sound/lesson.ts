import type { Lesson } from '@/content/types'
import { formatSigFigs } from '@/lib/units'
import narration from './narration'

const lesson: Lesson = {
  slug: '3-4-sound',
  subject: '0625',
  syllabus: [
    '0625.3.4.1',
    '0625.3.4.2',
    '0625.3.4.3',
    '0625.3.4.4',
    '0625.3.4.5',
    '0625.3.4.6',
    '0625.3.4.7',
    '0625.3.4.8',
    '0625.3.4.9',
    '0625.3.4.10',
    '0625.3.4.11',
    '0625.3.4.12',
  ],
  tier: 'extended',
  estimatedMinutes: 45,

  title: { en: 'Sound', zh: '声' },
  summary: {
    en: 'Watch particles bunch into compressions, switch the medium and see the wavelength change while the frequency holds — then get the echo factor of two right.',
    zh: '看粒子挤成密部，切换介质时波长改变而频率不变——再把回声里那个 2 弄对。',
  },

  objectives: [
    { en: 'Describe how vibrating sources produce sound.', zh: '描述振动物体如何产生声音。' },
    { en: 'Describe the longitudinal nature of sound waves.', zh: '描述声波的纵波性质。' },
    {
      en: 'State the audible range as roughly 20 Hz to 20 000 Hz.',
      zh: '说出人耳听觉范围约 20 Hz 至 20 000 Hz。',
    },
    { en: 'Know that sound needs a medium and cannot travel in a vacuum.', zh: '知道声传播需要介质，真空中不能传声。' },
    { en: 'Know that the speed of sound in air is about 330–350 m / s.', zh: '知道空气中声速约 330–350 m / s。' },
    {
      en: 'Describe a method for determining the speed of sound in air.',
      zh: '描述测定空气中声速的方法。',
    },
    {
      en: 'Describe how amplitude and frequency affect loudness and pitch.',
      zh: '说明振幅与频率如何影响响度与音调。',
    },
    { en: 'Describe an echo as reflected sound.', zh: '把回声描述为声的反射。' },
    { en: 'Define ultrasound as sound above 20 kHz.', zh: '把超声定义为高于 20 kHz 的声。' },
    { en: 'Describe compression and rarefaction. (Extended)', zh: '描述密部与疏部。（Extended）' },
    {
      en: 'Know that sound travels fastest in solids and slowest in gases. (Extended)',
      zh: '知道声速固体最快、气体最慢。（Extended）',
    },
    {
      en: 'Describe uses of ultrasound, including depth and distance calculations. (Extended)',
      zh: '说明超声的应用，含深度与距离计算。（Extended）',
    },
  ],

  glossary: [
    {
      en: 'compression',
      zh: '密部',
      definition: {
        en: 'A region of a longitudinal wave where the particles are pushed closer together than normal.',
        zh: '纵波中粒子比平常更靠近的区域。',
      },
      syllabus: ['0625.3.4.10'],
    },
    {
      en: 'rarefaction',
      zh: '疏部',
      definition: {
        en: 'A region of a longitudinal wave where the particles are spread further apart than normal.',
        zh: '纵波中粒子比平常更分散的区域。',
      },
      syllabus: ['0625.3.4.10'],
    },
    {
      en: 'pitch',
      zh: '音调',
      definition: {
        en: 'How high or low a note sounds. Determined by the frequency of the wave.',
        zh: '声音听起来的高低。由波的频率决定。',
      },
      syllabus: ['0625.3.4.7'],
    },
    {
      en: 'loudness',
      zh: '响度',
      definition: {
        en: 'How loud a sound is. Determined by the amplitude of the wave, not its frequency.',
        zh: '声音的大小。由波的振幅决定，与频率无关。',
      },
      syllabus: ['0625.3.4.7'],
    },
    {
      en: 'echo',
      zh: '回声',
      definition: {
        en: 'Sound heard again after reflecting from a surface. The sound covers the distance twice.',
        zh: '声音经表面反射后再次被听到。声音走了两倍的距离。',
      },
      syllabus: ['0625.3.4.8'],
    },
    {
      en: 'ultrasound',
      zh: '超声',
      definition: {
        en: 'Sound with a frequency above 20 kHz, too high for humans to hear. Used in sonar and medical scanning.',
        zh: '频率高于 20 kHz 的声，人耳听不到。用于声呐与医学扫描。',
      },
      syllabus: ['0625.3.4.9', '0625.3.4.12'],
    },
  ],

  equations: [
    {
      latex: 'v = f\\lambda',
      meaning: {
        en: 'The source fixes the frequency; the medium fixes the speed; the wavelength follows.',
        zh: '声源决定频率，介质决定声速，波长随之确定。',
      },
      substitute: (r) =>
        `v = ${formatSigFigs(r['speed'] ?? 0, 3)}\\ \\text{m/s},\\quad \\lambda = ${formatSigFigs(
          r['wavelength'] ?? 0,
          3
        )}\\ \\text{m}`,
    },
    {
      latex: 'd = \\frac{v\\,t}{2}',
      meaning: {
        en: 'For an echo or a sonar ping, halve the measured time — the sound made the journey twice.',
        zh: '回声或声呐要把测得的时间除以二——声音走了两趟。',
      },
      substitute: (r) => `t_{\\text{echo}} = ${formatSigFigs(r['echoTime'] ?? 0, 3)}\\ \\text{s}`,
    },
  ],

  sim: {
    primitive: 'waves',
    kernel: '3-4-sound',
    animate: { param: 't', speed: 1, loop: 60 },
    hint: {
      en: 'Switch from air to steel — the frequency stays put but the wavelength jumps, because the speed did.',
      zh: '从空气切换到钢——频率不变，但波长骤变，因为声速变了。',
    },
    params: [
      {
        key: 'medium',
        label: { en: 'Medium', zh: '介质' },
        unit: '',
        min: 0,
        max: 2,
        step: 1,
        default: 0,
        options: [
          { value: 0, label: { en: 'Air 340 m/s', zh: '空气 340 m/s' } },
          { value: 1, label: { en: 'Water 1500 m/s', zh: '水 1500 m/s' } },
          { value: 2, label: { en: 'Steel 5000 m/s', zh: '钢 5000 m/s' } },
        ],
      },
      {
        key: 'frequency',
        label: { en: 'Frequency', zh: '频率' },
        unit: 'Hz',
        symbol: 'f',
        min: 20,
        max: 40000,
        step: 20,
        default: 440,
      },
      {
        key: 'amplitude',
        label: { en: 'Amplitude', zh: '振幅' },
        unit: '',
        symbol: 'A',
        min: 0.1,
        max: 1,
        step: 0.05,
        default: 0.6,
      },
      {
        key: 'wallDistance',
        label: { en: 'Distance to wall', zh: '到反射面的距离' },
        unit: 'm',
        min: 10,
        max: 500,
        step: 10,
        default: 100,
      },
      {
        key: 't',
        label: { en: 'Time', zh: '时间' },
        unit: 's',
        min: 0,
        max: 60,
        step: 0.01,
        default: 0,
        hidden: true,
      },
    ],
    readouts: [
      { key: 'speed', label: { en: 'Speed of sound', zh: '声速' }, unit: 'm / s', symbol: 'v', sigFigs: 3 },
      {
        key: 'wavelength',
        label: { en: 'Wavelength', zh: '波长' },
        unit: 'm',
        symbol: 'λ',
        sigFigs: 3,
      },
      { key: 'echoTime', label: { en: 'Echo returns after', zh: '回声返回时间' }, unit: 's', sigFigs: 3 },
      { key: 'period', label: { en: 'Period', zh: '周期' }, unit: 's', symbol: 'T', sigFigs: 3 },
    ],
    presets: [
      {
        label: { en: 'Musical note in air', zh: '空气中的乐音' },
        params: { frequency: 440, medium: 0, amplitude: 0.6, wallDistance: 100 },
      },
      {
        label: { en: 'Same note in steel', zh: '钢中的同一乐音' },
        params: { frequency: 440, medium: 2, amplitude: 0.6, wallDistance: 100 },
      },
      {
        label: { en: 'Higher pitch, louder', zh: '更高更响' },
        params: { frequency: 880, medium: 0, amplitude: 1, wallDistance: 100 },
      },
      {
        label: { en: 'Ultrasound in water', zh: '水中的超声' },
        params: { frequency: 40000, medium: 1, amplitude: 0.6, wallDistance: 100 },
      },
    ],
  },

  narration,

  checkpoints: [
    {
      id: '3-4-cp1',
      syllabus: ['0625.3.4.4'],
      tier: 'core',
      commandWord: 'Explain',
      marks: 2,
      stem: 'An electric bell is ringing inside a sealed glass jar. As the air is pumped out, the sound gets quieter and eventually cannot be heard at all. Explain why.',
      markScheme: [
        {
          text: 'Sound is a wave that needs particles of a medium to travel through',
          marks: 1,
        },
        {
          text: 'As the air is removed there are fewer particles to pass the vibrations on, and in a vacuum there are none',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'The bell is still vibrating — the point is that there is nothing left to carry the vibration. Light from the bell still reaches you, which is why you can see it ringing.',
        zh: '铃仍在振动——关键是没有介质来传递振动。铃发出的光仍能到达你，所以你还能看见它在响。',
      },
    },
    {
      id: '3-4-cp2',
      syllabus: ['0625.3.4.6', '0625.3.4.8'],
      tier: 'core',
      commandWord: 'Calculate',
      marks: 3,
      stem: 'A student stands 165 m from a large wall, claps once, and hears the echo 1.0 s later. Calculate the speed of sound in air.',
      markScheme: [
        {
          text: 'Recognises the sound travels to the wall and back, a total of 330 m',
          marks: 1,
        },
        { text: 'Uses v = d / t', marks: 1 },
        { text: '330 m / s', marks: 1 },
      ],
      examinerNote: {
        en: 'Using 165 m gives 165 m / s, which is far below any sensible value for air. If your answer is not near 330–350 m / s, you have probably forgotten the return journey.',
        zh: '用 165 m 会得到 165 m/s，远低于空气中任何合理值。若答案不在 330–350 m/s 附近，多半是漏了返程。',
      },
    },
    {
      id: '3-4-cp3',
      syllabus: ['0625.3.4.7'],
      tier: 'core',
      commandWord: 'State',
      marks: 2,
      stem: 'A note played on a guitar is made louder without changing the note. State which property of the sound wave changes, and which stays the same.',
      markScheme: [
        { text: 'The amplitude increases', marks: 1 },
        { text: 'The frequency stays the same', marks: 1 },
      ],
      examinerNote: {
        en: 'Loudness and pitch are independent. Changing the amplitude alone changes only the loudness — the note is the same note.',
        zh: '响度与音调彼此独立。只改变振幅只会改变响度——音高不变。',
      },
    },
    {
      id: '3-4-cp4',
      syllabus: ['0625.3.4.12'],
      tier: 'extended',
      commandWord: 'Calculate',
      marks: 3,
      stem: 'A ship sends an ultrasound pulse towards the seabed. The pulse returns 0.16 s later. The speed of sound in seawater is 1500 m / s. Calculate the depth of the water.',
      markScheme: [
        { text: 'Total distance travelled = 1500 × 0.16 = 240 m', marks: 1 },
        { text: 'Halves the distance because the pulse travelled down and back', marks: 1 },
        { text: 'Depth = 120 m', marks: 1 },
      ],
      examinerNote: {
        en: 'Same factor of two as an echo. Sonar, ultrasound scans and radar all work this way — measure the round trip, then halve it.',
        zh: '和回声是同一个 2。声呐、超声扫描和雷达都是这样——测出往返，再除以二。',
      },
    },
  ],
}

export default lesson
