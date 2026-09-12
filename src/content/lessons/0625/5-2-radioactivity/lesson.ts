import type { Lesson } from '@/content/types'
import { formatSigFigs } from '@/lib/units'
import narration from './narration'

const lesson: Lesson = {
  slug: '5-2-radioactivity',
  subject: '0625',
  syllabus: [
    '0625.5.2.1.1',
    '0625.5.2.1.2',
    '0625.5.2.1.3',
    '0625.5.2.1.4',
    '0625.5.2.1.5',
    '0625.5.2.2.1',
    '0625.5.2.2.2',
    '0625.5.2.2.3',
    '0625.5.2.2.4',
    '0625.5.2.3.1',
    '0625.5.2.3.2',
    '0625.5.2.3.3',
    '0625.5.2.3.4',
    '0625.5.2.3.5',
    '0625.5.2.4.1',
    '0625.5.2.4.2',
    '0625.5.2.4.3',
    '0625.5.2.5.1',
    '0625.5.2.5.2',
    '0625.5.2.5.3',
  ],
  tier: 'extended',
  estimatedMinutes: 60,

  title: { en: 'Radioactivity and half-life', zh: '放射性与半衰期' },
  summary: {
    en: 'Read a half-life off a decay curve — after subtracting the background, which is the step that catches people out.',
    zh: '从衰变曲线读出半衰期——前提是先减去本底，而这一步最容易被忽略。',
  },

  objectives: [
    { en: 'Know what background radiation is and where it comes from.', zh: '知道什么是本底辐射及其来源。' },
    {
      en: 'Use count rate measured in counts per second or per minute.',
      zh: '使用以每秒或每分钟计的计数率。',
    },
    {
      en: 'Use background measurements to find a corrected count rate. (Extended)',
      zh: '用本底测量求校正后的计数率。（Extended）',
    },
    {
      en: 'Identify alpha, beta and gamma by nature, ionising effect and penetrating power.',
      zh: '按性质、电离能力与穿透能力识别 α、β、γ。',
    },
    {
      en: 'Describe how the three emissions deflect in electric and magnetic fields. (Extended)',
      zh: '描述三种辐射在电场与磁场中的偏转。（Extended）',
    },
    {
      en: 'Know that decay is spontaneous and random, and changes the element in alpha or beta decay.',
      zh: '知道衰变是自发随机的，且 α、β 衰变会改变元素种类。',
    },
    { en: 'Use decay equations in nuclide notation. (Extended)', zh: '用核素符号写衰变方程。（Extended）' },
    {
      en: 'Define half-life and use it in calculations, including from decay curves.',
      zh: '定义半衰期并用于计算，包括从衰变曲线求解。',
    },
    {
      en: 'Explain how emission type and half-life determine an isotope’s use. (Extended)',
      zh: '解释辐射类型与半衰期如何决定同位素的用途。（Extended）',
    },
    {
      en: 'State the effects of ionising radiation on living things and describe safe handling.',
      zh: '说出电离辐射对生物的影响并描述安全操作。',
    },
  ],

  glossary: [
    {
      en: 'background radiation',
      zh: '本底辐射',
      definition: {
        en: 'Ionising radiation always present in the environment — from radon, rocks, food and cosmic rays. It must be subtracted before any decay calculation.',
        zh: '环境中始终存在的电离辐射——来自氡、岩石、食物与宇宙射线。任何衰变计算前都必须减去它。',
      },
      syllabus: ['0625.5.2.1.1', '0625.5.2.1.2'],
    },
    {
      en: 'count rate',
      zh: '计数率',
      definition: {
        en: 'The number of decays a detector registers each second or minute.',
        zh: '探测器每秒或每分钟记录到的衰变次数。',
      },
      syllabus: ['0625.5.2.1.4'],
    },
    {
      en: 'half-life',
      zh: '半衰期',
      definition: {
        en: 'The time taken for half the nuclei of an isotope in a sample to decay — equivalently, for the corrected count rate to halve.',
        zh: '样品中一半原子核发生衰变所需的时间——等价于校正后计数率减半所需的时间。',
      },
      syllabus: ['0625.5.2.4.1'],
    },
    {
      en: 'alpha particle',
      zh: 'α 粒子',
      definition: {
        en: 'A helium nucleus: 2 protons and 2 neutrons, charge +2. Most ionising, least penetrating — stopped by paper.',
        zh: '氦核：2 个质子和 2 个中子，电荷 +2。电离最强、穿透最弱，一张纸即可挡住。',
      },
      syllabus: ['0625.5.2.2.2'],
    },
    {
      en: 'beta particle',
      zh: 'β 粒子',
      definition: {
        en: 'A fast electron emitted when a neutron becomes a proton. Charge −1, stopped by a few mm of aluminium.',
        zh: '中子变质子时射出的高速电子。电荷 −1，几毫米铝可挡住。',
      },
      syllabus: ['0625.5.2.2.2'],
    },
    {
      en: 'gamma radiation',
      zh: 'γ 射线',
      definition: {
        en: 'A high-energy electromagnetic wave. No charge, no mass, least ionising but most penetrating — needs thick lead.',
        zh: '高能电磁波。不带电、无质量，电离最弱但穿透最强，需要厚铅板。',
      },
      syllabus: ['0625.5.2.2.2'],
    },
    {
      en: 'isotope',
      zh: '同位素',
      definition: {
        en: 'Atoms of the same element with different numbers of neutrons. Some are unstable and therefore radioactive.',
        zh: '同种元素但中子数不同的原子。有些不稳定，因而具有放射性。',
      },
      syllabus: ['0625.5.2.3.3'],
    },
  ],

  equations: [
    {
      latex: 'A = A_0 \\left(\\tfrac{1}{2}\\right)^{t / t_{1/2}}',
      meaning: {
        en: 'The corrected count rate halves once per half-life, however far along you start.',
        zh: '校正后的计数率每过一个半衰期减半，无论从哪里开始都一样。',
      },
      substitute: (r) =>
        `t_{1/2} = ${formatSigFigs(r['measuredHalfLife'] ?? 0, 3)}\\ \\text{h},\\quad ${formatSigFigs(
          r['halfLivesElapsed'] ?? 0,
          2
        )}\\ \\text{half-lives elapsed}`,
    },
    {
      latex: '^{238}_{92}\\mathrm{U} \\rightarrow\\ ^{234}_{90}\\mathrm{Th} + ^{4}_{2}\\alpha',
      meaning: {
        en: 'Alpha decay: nucleon number falls by 4, proton number by 2. Both columns must balance.',
        zh: 'α 衰变：核子数减 4，质子数减 2。上下两行都必须配平。',
      },
    },
    {
      latex: '^{14}_{6}\\mathrm{C} \\rightarrow\\ ^{14}_{7}\\mathrm{N} + ^{\\ \\ 0}_{-1}\\beta',
      meaning: {
        en: 'Beta decay: a neutron becomes a proton, so the proton number rises by 1 and the nucleon number is unchanged.',
        zh: 'β 衰变：中子变质子，质子数加 1，核子数不变。',
      },
    },
  ],

  sim: {
    primitive: 'plot2d',
    kernel: '5-2-radioactivity',
    hint: {
      en: 'Raise the background and watch the measured curve stop falling to zero — that is why you must correct it first.',
      zh: '调高本底，看测得曲线不再降到零——这就是必须先做校正的原因。',
    },
    params: [
      {
        key: 'halfLife',
        label: { en: 'Half-life', zh: '半衰期' },
        unit: 'h',
        symbol: 't_{1/2}',
        min: 0.5,
        max: 12,
        step: 0.5,
        default: 3,
      },
      {
        key: 'initialRate',
        label: { en: 'Initial count rate', zh: '初始计数率' },
        unit: 'counts / s',
        symbol: 'A_0',
        min: 100,
        max: 1000,
        step: 50,
        default: 800,
      },
      {
        key: 'background',
        label: { en: 'Background rate', zh: '本底计数率' },
        unit: 'counts / s',
        min: 0,
        max: 200,
        step: 10,
        default: 20,
      },
      {
        key: 'duration',
        label: { en: 'Time plotted', zh: '绘图时长' },
        unit: 'h',
        min: 2,
        max: 24,
        step: 1,
        default: 12,
      },
    ],
    readouts: [
      {
        key: 'measuredHalfLife',
        label: { en: 'Half-life from the curve', zh: '由曲线求得的半衰期' },
        unit: 'h',
        sigFigs: 3,
      },
      {
        key: 'halfLivesElapsed',
        label: { en: 'Half-lives elapsed', zh: '经过的半衰期数' },
        unit: '',
        sigFigs: 2,
      },
      {
        key: 'rateAtEnd',
        label: { en: 'Corrected rate at end', zh: '末端校正计数率' },
        unit: 'counts / s',
        sigFigs: 3,
      },
      {
        key: 'measuredAtEnd',
        label: { en: 'Measured rate at end', zh: '末端测得计数率' },
        unit: 'counts / s',
        sigFigs: 3,
      },
    ],
    presets: [
      {
        label: { en: 'Four half-lives', zh: '四个半衰期' },
        params: { halfLife: 3, initialRate: 800, background: 20, duration: 12 },
      },
      {
        label: { en: 'Heavy background', zh: '强本底' },
        params: { halfLife: 3, initialRate: 800, background: 160, duration: 12 },
      },
      {
        label: { en: 'Long half-life', zh: '长半衰期' },
        params: { halfLife: 12, initialRate: 800, background: 20, duration: 24 },
      },
      {
        label: { en: 'Short half-life', zh: '短半衰期' },
        params: { halfLife: 0.5, initialRate: 800, background: 20, duration: 6 },
      },
    ],
  },

  narration,

  checkpoints: [
    {
      id: '5-2-cp1',
      syllabus: ['0625.5.2.4.1'],
      tier: 'core',
      commandWord: 'Determine',
      marks: 3,
      stem: 'A sample has a corrected count rate of 640 counts / s. After 12 hours the corrected count rate is 40 counts / s. Determine the half-life of the sample.',
      markScheme: [
        {
          text: 'Recognises that the rate has halved four times (640 → 320 → 160 → 80 → 40)',
          marks: 1,
        },
        { text: 'Uses 12 hours ÷ 4 half-lives', marks: 1 },
        { text: '3 hours', marks: 1 },
      ],
      examinerNote: {
        en: 'Count the halvings rather than reaching for a formula. 640 to 40 is a factor of 16, which is 2⁴, so four half-lives have passed.',
        zh: '数减半的次数，不必套公式。640 到 40 是 16 倍，即 2⁴，所以经过了四个半衰期。',
      },
    },
    {
      id: '5-2-cp2',
      syllabus: ['0625.5.2.1.5'],
      tier: 'extended',
      commandWord: 'Calculate',
      marks: 2,
      stem: 'A detector records 210 counts / s with a source in place. With the source removed it records 30 counts / s. Calculate the corrected count rate due to the source.',
      markScheme: [
        { text: 'Subtracts the background from the measured rate', marks: 1, alternatives: ['210 − 30'] },
        { text: '180 counts / s', marks: 1 },
      ],
      examinerNote: {
        en: 'The reading with the source removed *is* the background. Forgetting to subtract it is the single most common error in half-life questions.',
        zh: '移走放射源后的读数就是本底。忘记减去它是半衰期题中最常见的错误。',
      },
    },
    {
      id: '5-2-cp3',
      syllabus: ['0625.5.2.2.2'],
      tier: 'core',
      commandWord: 'Identify',
      marks: 1,
      stem: 'A radioactive emission passes through a sheet of paper but is stopped by 3 mm of aluminium. Identify the emission.',
      options: ['Beta', 'Alpha', 'Gamma', 'X-rays'],
      answerIndex: 0,
      markScheme: [{ text: 'Beta', marks: 1 }],
      examinerNote: {
        en: 'Alpha would have been stopped by the paper; gamma would have passed through the aluminium. Only beta fits both observations.',
        zh: 'α 会被纸挡住，γ 会穿过铝板。只有 β 同时符合这两个观察结果。',
      },
    },
    {
      id: '5-2-cp4',
      syllabus: ['0625.5.2.3.5'],
      tier: 'extended',
      commandWord: 'Deduce',
      marks: 2,
      stem: 'A nucleus of ²²⁶₈₈Ra decays by emitting an alpha particle. Deduce the nucleon number and proton number of the nucleus produced.',
      markScheme: [
        { text: 'Nucleon number 222', marks: 1 },
        { text: 'Proton number 86', marks: 1 },
      ],
      examinerNote: {
        en: 'An alpha particle is ⁴₂He, so subtract 4 from the top and 2 from the bottom. Both columns must balance across the arrow.',
        zh: 'α 粒子是 ⁴₂He，所以上标减 4、下标减 2。箭头两边上下两行都要配平。',
      },
    },
    {
      id: '5-2-cp5',
      syllabus: ['0625.5.2.5.3'],
      tier: 'extended',
      commandWord: 'Suggest',
      marks: 3,
      stem: 'A school keeps radioactive sources in a locked lead-lined box and uses long-handled tongs to move them. Suggest how these practices reduce the dose received by a teacher.',
      markScheme: [
        { text: 'The lead lining absorbs the radiation, shielding the surroundings', marks: 1 },
        {
          text: 'The tongs increase the distance between the source and the body, and intensity falls with distance',
          marks: 1,
        },
        {
          text: 'Handling quickly reduces the exposure time, and dose depends on time',
          marks: 1,
          alternatives: ['sources are returned to storage promptly'],
        },
      ],
      examinerNote: {
        en: 'Time, distance and shielding — name the precaution and say what it does. Naming it alone is not enough for a Suggest question.',
        zh: '时间、距离、屏蔽——既要说出措施，也要说明其作用。Suggest 题只写措施名称不够。',
      },
    },
  ],
}

export default lesson
