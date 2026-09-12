import type { Lesson } from '@/content/types'
import { formatSigFigs } from '@/lib/units'
import narration from './narration'

/** Refractive indices students meet in 0625 questions. */
const MEDIA = [
  { value: 1.33, label: { en: 'Water 1.33', zh: '水 1.33' } },
  { value: 1.5, label: { en: 'Glass 1.50', zh: '玻璃 1.50' } },
  { value: 2.42, label: { en: 'Diamond 2.42', zh: '钻石 2.42' } },
]

const lesson: Lesson = {
  slug: '3-2-2-refraction',
  subject: '0625',
  syllabus: [
    '0625.3.2.2.1',
    '0625.3.2.2.2',
    '0625.3.2.2.3',
    '0625.3.2.2.4',
    '0625.3.2.2.5',
    '0625.3.2.2.6',
    '0625.3.2.2.7',
    '0625.3.2.2.8',
    '0625.3.2.2.9',
  ],
  tier: 'extended',
  estimatedMinutes: 50,

  title: { en: 'Refraction and total internal reflection', zh: '折射与全反射' },
  summary: {
    en: 'Drag a ray across a boundary to see how light bends, find the critical angle, and watch refraction stop altogether.',
    zh: '拖动光线穿过界面，观察光如何偏折、找出临界角，并看到折射彻底停止的瞬间。',
  },

  objectives: [
    {
      en: 'Use the terms normal, angle of incidence and angle of refraction correctly.',
      zh: '正确使用法线、入射角与折射角这些术语。',
    },
    {
      en: 'Describe the path of light through a transparent block, and the experiment that shows it.',
      zh: '描述光通过透明砖的路径，以及演示它的实验。',
    },
    { en: 'State what the critical angle means.', zh: '说明临界角的含义。' },
    {
      en: 'Describe internal and total internal reflection, with everyday examples.',
      zh: '描述内反射与全反射，并举出日常例子。',
    },
    {
      en: 'Define refractive index and use n = sin i / sin r. (Extended)',
      zh: '定义折射率并使用 n = sin i / sin r。（Extended）',
    },
    { en: 'Use n = 1 / sin c to find the critical angle. (Extended)', zh: '用 n = 1 / sin c 求临界角。（Extended）' },
    {
      en: 'Describe how optical fibres use total internal reflection. (Extended)',
      zh: '描述光纤如何利用全反射。（Extended）',
    },
  ],

  glossary: [
    {
      en: 'normal',
      zh: '法线',
      definition: {
        en: 'The line drawn at right angles to the surface at the point where the ray hits it. All angles are measured from it.',
        zh: '在光线入射点处与界面垂直的线。所有角度都从它量起。',
      },
      syllabus: ['0625.3.2.2.1'],
    },
    {
      en: 'angle of incidence',
      zh: '入射角',
      definition: {
        en: 'The angle between the incoming ray and the normal.',
        zh: '入射光线与法线之间的夹角。',
      },
      syllabus: ['0625.3.2.2.1'],
    },
    {
      en: 'angle of refraction',
      zh: '折射角',
      definition: {
        en: 'The angle between the refracted ray and the normal, on the far side of the boundary.',
        zh: '界面另一侧折射光线与法线之间的夹角。',
      },
      syllabus: ['0625.3.2.2.1'],
    },
    {
      en: 'refractive index',
      zh: '折射率',
      definition: {
        en: 'How strongly a material bends light — the ratio of the speed of light in the two media. Glass is about 1.5.',
        zh: '介质使光偏折的程度——即光在两种介质中速度之比。玻璃约为 1.5。',
      },
      syllabus: ['0625.3.2.2.6'],
    },
    {
      en: 'critical angle',
      zh: '临界角',
      definition: {
        en: 'The angle of incidence inside the denser medium at which the refracted ray just grazes the boundary. Beyond it, no light escapes.',
        zh: '在光密介质内部，折射光线刚好沿界面时的入射角。超过它，光就无法射出。',
      },
      syllabus: ['0625.3.2.2.4'],
    },
    {
      en: 'total internal reflection',
      zh: '全反射',
      definition: {
        en: 'Past the critical angle, all the light reflects back into the denser medium and none is refracted out.',
        zh: '超过临界角后，光全部反射回光密介质，没有光折射出去。',
      },
      syllabus: ['0625.3.2.2.5'],
    },
  ],

  equations: [
    {
      latex: 'n = \\frac{\\sin i}{\\sin r}',
      meaning: {
        en: 'The refractive index is the ratio of the sine of the angle of incidence to the sine of the angle of refraction.',
        zh: '折射率等于入射角的正弦与折射角的正弦之比。',
      },
      // The self-narrating equation: it states the outcome, not just the numbers.
      substitute: (r) => {
        const i = r['angleOfIncidence'] ?? 0
        const rr = r['angleOfRefraction'] ?? 0
        if (r['totalInternalReflection'] === 1) {
          return `i = ${formatSigFigs(i, 3)}^\\circ > c = ${formatSigFigs(
            r['criticalAngle'] ?? 0,
            3
          )}^\\circ \\;\\Rightarrow\\; \\text{no refracted ray}`
        }
        return `i = ${formatSigFigs(i, 3)}^\\circ,\\quad r = ${formatSigFigs(rr, 3)}^\\circ`
      },
    },
    {
      latex: 'n = \\frac{1}{\\sin c}',
      meaning: {
        en: 'The critical angle follows directly from the refractive index — a denser material has a smaller critical angle.',
        zh: '临界角由折射率直接决定——介质越密，临界角越小。',
      },
      substitute: (r) => `c = ${formatSigFigs(r['criticalAngle'] ?? 0, 3)}^\\circ`,
    },
  ],

  sim: {
    primitive: 'raytrace',
    kernel: '3-2-2-refraction',
    draggable: ['angleOfIncidence'],
    hint: {
      en: 'Drag the orange dot to change the angle of incidence, or use the slider.',
      zh: '拖动橙色圆点改变入射角，也可以用滑块。',
    },
    params: [
      {
        key: 'angleOfIncidence',
        label: { en: 'Angle of incidence', zh: '入射角' },
        unit: '°',
        symbol: 'i',
        min: 0,
        max: 89,
        step: 1,
        default: 45,
      },
      {
        key: 'n',
        label: { en: 'Denser medium', zh: '光密介质' },
        unit: '',
        symbol: 'n',
        min: 1.33,
        max: 2.42,
        step: 0.01,
        default: 1.5,
        options: MEDIA,
      },
      {
        key: 'fromDenser',
        label: { en: 'Direction of travel', zh: '传播方向' },
        unit: '',
        min: 0,
        max: 1,
        step: 1,
        default: 0,
        options: [
          { value: 0, label: { en: 'Air → medium', zh: '空气 → 介质' } },
          { value: 1, label: { en: 'Medium → air', zh: '介质 → 空气' } },
        ],
      },
    ],
    readouts: [
      {
        key: 'angleOfRefraction',
        label: { en: 'Angle of refraction', zh: '折射角' },
        unit: '°',
        symbol: 'r',
        sigFigs: 3,
      },
      {
        key: 'criticalAngle',
        label: { en: 'Critical angle', zh: '临界角' },
        unit: '°',
        symbol: 'c',
        sigFigs: 3,
      },
    ],
    presets: [
      {
        label: { en: 'Into glass at 45°', zh: '45° 射入玻璃' },
        params: { angleOfIncidence: 45, n: 1.5, fromDenser: 0 },
      },
      {
        label: { en: 'Just below critical', zh: '略低于临界角' },
        params: { angleOfIncidence: 41, n: 1.5, fromDenser: 1 },
      },
      {
        label: { en: 'Total internal reflection', zh: '全反射' },
        params: { angleOfIncidence: 55, n: 1.5, fromDenser: 1 },
      },
      {
        label: { en: 'Diamond sparkle', zh: '钻石的闪耀' },
        params: { angleOfIncidence: 30, n: 2.42, fromDenser: 1 },
      },
    ],
  },

  narration,

  checkpoints: [
    {
      id: '3-2-2-refraction-cp1',
      syllabus: ['0625.3.2.2.1'],
      tier: 'core',
      commandWord: 'Identify',
      marks: 1,
      stem: 'A ray of light travels from air into a glass block. Identify the line from which the angle of incidence is measured.',
      options: [
        'The normal to the surface',
        'The surface of the glass block',
        'The refracted ray',
        'The base of the glass block',
      ],
      answerIndex: 0,
      markScheme: [{ text: 'The normal', marks: 1, alternatives: ['normal to the surface'] }],
      examinerNote: {
        en: 'Measuring from the surface instead of the normal gives the complement of the correct angle (90° − i) and is the single most common error in this topic.',
        zh: '从界面而不是法线量角，会得到正确角度的余角（90° − i），这是本主题最常见的错误。',
      },
    },
    {
      id: '3-2-2-refraction-cp2',
      syllabus: ['0625.3.2.2.7'],
      tier: 'extended',
      commandWord: 'Calculate',
      marks: 3,
      stem: 'A ray of light enters a glass block of refractive index 1.50 at an angle of incidence of 40°. Calculate the angle of refraction.',
      markScheme: [
        { text: 'Uses n = sin i / sin r', marks: 1, alternatives: ['sin r = sin 40 / 1.50'] },
        { text: 'sin r = 0.4285 (or equivalent)', marks: 1 },
        { text: 'r = 25.4° (accept 25° to 25.4°)', marks: 1, alternatives: ['25°'] },
      ],
      examinerNote: {
        en: 'Rearrange before substituting. Multiplying by n instead of dividing gives 74.6°, which is larger than i — impossible on the way into a denser medium, so it should be spotted as wrong.',
        zh: '先变形再代入。若误乘 n 而非除以 n，会得到 74.6°，比入射角还大——光进入光密介质时不可能如此，应能自查发现错误。',
      },
    },
    {
      id: '3-2-2-refraction-cp3',
      syllabus: ['0625.3.2.2.5', '0625.3.2.2.8'],
      tier: 'extended',
      commandWord: 'Explain',
      marks: 4,
      stem: 'The critical angle for a certain glass is 42°. Explain what happens to a ray of light travelling inside this glass that strikes the boundary with air at an angle of incidence of 50°.',
      markScheme: [
        { text: 'The angle of incidence is greater than the critical angle', marks: 1 },
        { text: 'No light is refracted out of the glass', marks: 1, alternatives: ['no refraction occurs'] },
        {
          text: 'All of the light is reflected back into the glass',
          marks: 1,
          alternatives: ['totally reflected'],
        },
        { text: 'This is total internal reflection', marks: 1 },
      ],
      examinerNote: {
        en: 'The command word is Explain, so comparing 50° with 42° is required — simply naming total internal reflection earns only part of the marks.',
        zh: '命令词是 Explain，所以必须把 50° 与 42° 作比较；只写出"全反射"这个名称只能得部分分。',
      },
    },
  ],
}

export default lesson
