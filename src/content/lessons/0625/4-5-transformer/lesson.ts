import type { Lesson } from '@/content/types'
import narration from './narration'

const lesson: Lesson = {
  slug: '4-5-transformer',
  subject: '0625',
  syllabus: [
    '0625.4.5.6.1',
    '0625.4.5.6.2',
    '0625.4.5.6.3',
    '0625.4.5.6.4',
    '0625.4.5.6.5',
    '0625.4.5.6.6',
    '0625.4.5.6.7',
    '0625.4.5.6.8',
  ],
  tier: 'extended',
  estimatedMinutes: 45,

  title: { en: 'Transformers and high-voltage transmission', zh: '变压器与高压输电' },
  summary: {
    en: 'Doubling the transmission voltage does not halve the loss in the cable — it cuts it to a quarter. The current curve and the loss curve have visibly different shapes, and that difference is the whole reason the grid exists.',
    zh: '把输电电压加倍，电缆中的损耗不是减半，而是降到四分之一。电流曲线与损耗曲线的形状明显不同，这个差别正是电网存在的全部理由。',
  },

  objectives: [
    {
      en: 'Describe the construction of a simple transformer with a soft iron core.',
      zh: '描述带软铁芯的简单变压器的构造。',
    },
    {
      en: 'Use the terms primary, secondary, step-up and step-down correctly.',
      zh: '正确使用原线圈、副线圈、升压与降压等术语。',
    },
    { en: 'Use Vp / Vs = Np / Ns.', zh: '使用 Vp/Vs = Np/Ns。' },
    {
      en: 'Describe how transformers are used in the high-voltage transmission of electricity, and state the advantages.',
      zh: '说明变压器在高压输电中的应用，并说出高压输电的优点。',
    },
    {
      en: 'Explain how an iron-cored transformer works, and why it will not work on d.c. (Extended)',
      zh: '解释铁芯变压器的工作原理，以及它为何不能用于直流。（Extended）',
    },
    {
      en: 'Use IpVp = IsVs for a 100% efficient transformer. (Extended)',
      zh: '对效率为 100% 的变压器使用 IpVp = IsVs。（Extended）',
    },
    {
      en: 'Use P = I²R to explain why power losses in transmission cables are lower at high voltage. (Extended)',
      zh: '用 P = I²R 解释为何高压输电时电缆损耗更低。（Extended）',
    },
  ],

  glossary: [
    {
      en: 'primary coil',
      zh: '原线圈',
      definition: {
        en: 'The coil connected to the a.c. supply. Its changing current is what makes the changing field in the core.',
        zh: '接交流电源的线圈。它的变化电流在铁芯中产生变化的磁场。',
      },
      syllabus: ['0625.4.5.6.2'],
    },
    {
      en: 'step-up transformer',
      zh: '升压变压器',
      definition: {
        en: 'More turns on the secondary than the primary, so the output voltage is higher — and, since power is conserved, the output current is correspondingly smaller.',
        zh: '副线圈匝数多于原线圈，输出电压更高——而由于功率守恒，输出电流相应更小。',
      },
      syllabus: ['0625.4.5.6.2'],
    },
    {
      en: 'soft iron core',
      zh: '软铁芯',
      definition: {
        en: 'Carries the magnetic field from one coil to the other. Soft iron is used because it magnetises and demagnetises easily, so it can follow a field reversing 50 times a second.',
        zh: '把磁场从一个线圈导引到另一个线圈。之所以用软铁，是因为它易磁化也易退磁，能跟上每秒反向 50 次的磁场。',
      },
      syllabus: ['0625.4.5.6.1', '0625.4.5.6.6'],
    },
    {
      en: 'transmission loss',
      zh: '输电损耗',
      definition: {
        en: 'Power wasted heating the cable, equal to I²R. Because it depends on the square of the current, sending power at a high voltage reduces it dramatically.',
        zh: '电缆发热浪费的功率，等于 I²R。因为它取决于电流的平方，用高压输送电力能使其大幅下降。',
      },
      syllabus: ['0625.4.5.6.8'],
    },
  ],

  equations: [
    {
      latex: '\\dfrac{V_p}{V_s} = \\dfrac{N_p}{N_s}',
      meaning: {
        en: 'Voltage in the same ratio as turns. More turns on the secondary steps the voltage up; fewer steps it down.',
        zh: '电压之比等于匝数之比。副线圈匝数多则升压，匝数少则降压。',
      },
      substitute: (r) => `V_s = ${r['secondaryVoltage'] ?? 0}\\ \\mathrm{kV}`,
    },
    {
      latex: 'I_p V_p = I_s V_s',
      meaning: {
        en: 'Power in equals power out for a perfect transformer. Step the voltage up by sixteen and the current is divided by sixteen — a transformer trades one against the other and never increases both.',
        zh: '理想变压器输入功率等于输出功率。电压升高 16 倍，电流就变为十六分之一——变压器只是在两者之间交换，绝不会同时增大两者。',
      },
      substitute: (r) => `I = ${r['lineCurrent'] ?? 0}\\ \\mathrm{A}`,
    },
    {
      latex: 'P = I^2 R',
      meaning: {
        en: 'Power wasted heating the cable. It is the square that matters: doubling the transmission voltage halves the current and so cuts the loss to a quarter.',
        zh: '电缆发热浪费的功率。关键在于平方：输电电压加倍使电流减半，损耗因此降到四分之一。',
      },
      substitute: (r) =>
        `P_{\\text{lost}} = ${r['powerLost'] ?? 0}\\ \\mathrm{MW} = ${r['percentLost'] ?? 0}\\%`,
    },
  ],

  sim: {
    primitive: 'plot2d',
    kernel: '4-5-transformer',
    hint: {
      en: 'Compare the shapes of the two graphs. The current falls as 1/V; the loss falls as 1/V², which is why it drops off a cliff.',
      zh: '比较两幅图的形状。电流按 1/V 下降；损耗按 1/V² 下降，所以它会陡然坠落。',
    },
    params: [
      {
        key: 'primaryVoltage',
        label: { en: 'Voltage into the primary', zh: '原线圈输入电压' },
        unit: 'V',
        min: 100,
        max: 25000,
        step: 100,
        default: 25000,
      },
      {
        key: 'primaryTurns',
        label: { en: 'Turns on the primary', zh: '原线圈匝数' },
        unit: '',
        min: 1,
        max: 500,
        step: 1,
        default: 100,
      },
      {
        key: 'secondaryTurns',
        label: { en: 'Turns on the secondary', zh: '副线圈匝数' },
        unit: '',
        min: 1,
        max: 5000,
        step: 10,
        default: 1600,
      },
      {
        key: 'powerTransmitted',
        label: { en: 'Power sent down the line', zh: '沿线路输送的功率' },
        unit: 'MW',
        min: 1,
        max: 200,
        step: 1,
        default: 100,
      },
      {
        key: 'cableResistance',
        label: { en: 'Resistance of the cable', zh: '电缆的电阻' },
        unit: 'Ω',
        min: 1,
        max: 50,
        step: 1,
        default: 10,
      },
    ],
    readouts: [
      {
        key: 'secondaryVoltage',
        label: { en: 'Voltage out of the secondary', zh: '副线圈输出电压' },
        unit: 'kV',
        sigFigs: 3,
        exact: true,
      },
      {
        key: 'lineCurrent',
        label: { en: 'Current in the cable', zh: '电缆中的电流' },
        unit: 'A',
        sigFigs: 3,
        exact: true,
      },
      {
        key: 'powerLost',
        label: { en: 'Power lost as heat', zh: '作为热损失的功率' },
        unit: 'MW',
        sigFigs: 3,
        exact: true,
      },
      {
        key: 'percentLost',
        label: { en: 'Fraction of the power lost', zh: '损失功率的占比' },
        unit: '%',
        sigFigs: 3,
        exact: true,
      },
    ],
    presets: [
      {
        label: { en: 'A grid: 25 kV stepped up to 400 kV', zh: '电网：25 kV 升压到 400 kV' },
        params: {
          primaryVoltage: 25000,
          primaryTurns: 100,
          secondaryTurns: 1600,
          powerTransmitted: 100,
          cableResistance: 10,
        },
      },
      {
        label: { en: 'No step-up at all', zh: '完全不升压' },
        params: {
          primaryVoltage: 25000,
          primaryTurns: 100,
          secondaryTurns: 100,
          powerTransmitted: 100,
          cableResistance: 10,
        },
      },
      {
        label: { en: 'Stepped up only to 100 kV', zh: '只升压到 100 kV' },
        params: {
          primaryVoltage: 25000,
          primaryTurns: 100,
          secondaryTurns: 400,
          powerTransmitted: 100,
          cableResistance: 10,
        },
      },
      {
        label: { en: 'A step-down transformer', zh: '降压变压器' },
        params: {
          primaryVoltage: 25000,
          primaryTurns: 400,
          secondaryTurns: 100,
          powerTransmitted: 100,
          cableResistance: 10,
        },
      },
      {
        label: { en: 'A longer, thinner cable', zh: '更长更细的电缆' },
        params: {
          primaryVoltage: 25000,
          primaryTurns: 100,
          secondaryTurns: 1600,
          powerTransmitted: 100,
          cableResistance: 40,
        },
      },
      {
        label: { en: 'Twice the power down the same line', zh: '同一线路输送双倍功率' },
        params: {
          primaryVoltage: 25000,
          primaryTurns: 100,
          secondaryTurns: 1600,
          powerTransmitted: 200,
          cableResistance: 10,
        },
      },
    ],
  },

  narration,

  checkpoints: [
    {
      id: '0625-4-5-6-cp1',
      syllabus: ['0625.4.5.6.3'],
      tier: 'core',
      commandWord: 'Calculate',
      marks: 3,
      stem: 'A transformer has 1200 turns on its primary coil and 80 turns on its secondary coil. The primary is connected to a 240 V a.c. supply. Calculate the secondary voltage, and state whether this is a step-up or a step-down transformer.',
      markScheme: [
        { text: 'Vs = Vp × Ns / Np = 240 × 80 / 1200', marks: 1 },
        { text: 'Vs = 16 V', marks: 1 },
        { text: 'Step-down, because the secondary has fewer turns than the primary', marks: 1 },
      ],
      examinerNote: {
        en: 'Check the answer against the turns before writing it down. Fewer turns must give a smaller voltage; if your answer is bigger, the ratio went in upside down.',
        zh: '写下答案前先与匝数核对一下。匝数更少就必须得到更小的电压；如果算出来更大，说明比例用反了。',
      },
    },
    {
      id: '0625-4-5-6-cp2',
      syllabus: ['0625.4.5.6.6'],
      tier: 'extended',
      commandWord: 'Explain',
      marks: 4,
      stem: 'Explain how an iron-cored transformer produces a voltage across its secondary coil, and explain why it produces no steady output when the primary is connected to a battery instead of an a.c. supply.',
      markScheme: [
        {
          text: 'The alternating current in the primary produces a magnetic field that is continually changing in size and direction',
          marks: 1,
        },
        {
          text: 'The soft iron core carries this changing magnetic field to the secondary coil',
          marks: 1,
        },
        {
          text: 'The changing field through the secondary induces an alternating e.m.f. across it, at the same frequency',
          marks: 1,
        },
        {
          text: 'A battery gives a steady current, so the field in the core is constant and not changing; no e.m.f. is induced, apart from a brief pulse at the moment of switching on or off',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'The word "changing" has to appear, and it has to be attached to the field. "The current in the primary induces a voltage in the secondary" describes d.c. just as well as a.c., so it earns nothing.',
        zh: '答案中必须出现"变化"二字，而且要修饰磁场。"原线圈中的电流在副线圈感应出电压"这句话对直流同样成立，因此得不到分。',
      },
    },
    {
      id: '0625-4-5-6-cp3',
      syllabus: ['0625.4.5.6.7'],
      tier: 'extended',
      commandWord: 'Calculate',
      marks: 3,
      stem: 'A 100% efficient transformer steps 240 V down to 12 V. The current in the secondary coil is 2.0 A. Calculate the current in the primary coil.',
      markScheme: [
        { text: 'IpVp = IsVs, so Ip × 240 = 2.0 × 12', marks: 1 },
        { text: 'Ip = 24 / 240', marks: 1 },
        { text: 'Ip = 0.10 A', marks: 1 },
      ],
      examinerNote: {
        en: 'The primary current must come out smaller than the secondary current here, because the primary is at the higher voltage. An answer of 40 A means the equation was used upside down.',
        zh: '这里原线圈电流必须小于副线圈电流，因为原线圈处在较高电压一侧。若算得 40 A，说明公式用反了。',
      },
    },
    {
      id: '0625-4-5-6-cp4',
      syllabus: ['0625.4.5.6.8'],
      tier: 'extended',
      commandWord: 'Explain',
      marks: 4,
      stem: 'A power station transmits 50 MW along a cable of resistance 8.0 Ω. Explain, using P = I²R, why the electricity is transmitted at 400 kV rather than at 100 kV, and calculate the power lost in the cable at each voltage.',
      markScheme: [
        {
          text: 'At 400 kV: I = P / V = 50 × 10⁶ / 400 × 10³ = 125 A, so power lost = 125² × 8.0 = 0.125 MW',
          marks: 1,
        },
        {
          text: 'At 100 kV: I = 50 × 10⁶ / 100 × 10³ = 500 A, so power lost = 500² × 8.0 = 2.0 MW',
          marks: 1,
        },
        {
          text: 'A higher transmission voltage means a smaller current is needed to deliver the same power',
          marks: 1,
        },
        {
          text: 'and because the power lost depends on the square of the current, four times the voltage gives a quarter of the current and one sixteenth of the loss',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'The last mark is for the squaring. "A smaller current means less power is lost" is true of almost any circuit and does not answer why the effect is worth building a national grid for.',
        zh: '最后一分给的是"平方"这一点。"电流小损耗就小"几乎对任何电路都成立，并没有回答为什么值得为此建设全国电网。',
      },
    },
    {
      id: '0625-4-5-6-cp5',
      syllabus: ['0625.4.5.6.4', '0625.4.5.6.5'],
      tier: 'core',
      commandWord: 'Describe',
      marks: 3,
      stem: 'Describe how transformers are used between a power station and a house, and state two advantages of transmitting electricity at a high voltage.',
      markScheme: [
        {
          text: 'A step-up transformer at the power station raises the voltage for transmission, and step-down transformers lower it again in stages for towns and finally for houses',
          marks: 1,
        },
        {
          text: 'Less energy is wasted heating the cables, because the current is smaller',
          marks: 1,
        },
        {
          text: 'Thinner and cheaper cable can be used, needing fewer or lighter pylons to support it',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Two advantages means two different ones. "Less energy is lost" and "it is more efficient" are the same advantage said twice.',
        zh: '两个优点要写两个不同的优点。"损耗更少"和"效率更高"是同一个优点说了两遍。',
      },
    },
    {
      id: '0625-4-5-6-cp6',
      syllabus: ['0625.4.5.6.1', '0625.4.5.6.2'],
      tier: 'core',
      commandWord: 'Describe',
      marks: 3,
      stem: 'Describe the construction of a simple transformer, and state why the core is made of soft iron rather than steel.',
      markScheme: [
        {
          text: 'Two coils of insulated wire, the primary and the secondary, wound on the same core and not electrically connected to each other',
          marks: 1,
        },
        { text: 'The core is a complete loop of iron, which carries the magnetic field from one coil to the other', marks: 1 },
        {
          text: 'Soft iron magnetises and demagnetises easily, so it can follow the rapidly changing field; steel would retain its magnetism and waste energy',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'The coils are insulated and separate. A diagram showing a wire running from the primary to the secondary loses the mark, because the whole point is that nothing conducts between them.',
        zh: '两个线圈是绝缘且彼此分离的。若图中画出从原线圈连到副线圈的导线就会丢分，因为要点恰恰是两者之间没有导电连接。',
      },
    },
  ],
}

export default lesson
