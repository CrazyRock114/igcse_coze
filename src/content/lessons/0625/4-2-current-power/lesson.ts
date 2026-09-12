import type { Lesson } from '@/content/types'
import narration from './narration'

const lesson: Lesson = {
  slug: '4-2-current-power',
  subject: '0625',
  syllabus: [
    '0625.4.2.2.1',
    '0625.4.2.2.3',
    '0625.4.2.2.4',
    '0625.4.2.2.5',
    '0625.4.2.2.6',
    '0625.4.2.3.1',
    '0625.4.2.3.2',
    '0625.4.2.3.3',
    '0625.4.2.3.4',
    '0625.4.2.3.6',
    '0625.4.2.3.7',
    '0625.4.2.5.1',
    '0625.4.2.5.2',
    '0625.4.2.5.3',
    '0625.4.2.5.4',
  ],
  tier: 'extended',
  estimatedMinutes: 55,

  title: { en: 'Current, voltage and electrical power', zh: '电流、电压与电功率' },
  summary: {
    en: 'A kilowatt-hour has a power unit in its name and is not a power. It is a kilowatt for an hour — a rate times a time, which is an amount.',
    zh: '千瓦时的名称里带着功率单位，它却不是功率。它是"1 千瓦持续 1 小时"——速率乘以时间，得到的是总量。',
  },

  objectives: [
    {
      en: 'Know that current relates to the flow of charge, and describe conduction in metals as the movement of free electrons.',
      zh: '知道电流与电荷的流动有关，并把金属中的导电描述为自由电子的移动。',
    },
    {
      en: 'Define current as charge per unit time and use I = Q / t, and state the directions of conventional current and electron flow. (Extended)',
      zh: '把电流定义为单位时间的电荷量并使用 I = Q/t，说出常规电流与电子流的方向。（Extended）',
    },
    {
      en: 'Know the difference between direct and alternating current.',
      zh: '掌握直流与交流的区别。',
    },
    {
      en: 'Define e.m.f. and p.d., know that both are measured in volts, and use E = W / Q and V = W / Q. (Extended)',
      zh: '定义电动势与电势差，知道两者单位均为伏特，并使用 E = W/Q 与 V = W/Q。（Extended）',
    },
    {
      en: 'Understand that circuits transfer energy, and use P = IV and E = IVt.',
      zh: '理解电路传递能量，并使用 P = IV 与 E = IVt。',
    },
    {
      en: 'Define the kilowatt-hour and calculate the cost of using electrical appliances.',
      zh: '定义千瓦时并计算使用电器的费用。',
    },
  ],

  glossary: [
    {
      en: 'current',
      zh: '电流',
      definition: {
        en: 'The flow of electric charge — charge per unit time, I = Q / t, in amperes. One ampere is one coulomb per second.',
        zh: '电荷的流动——单位时间通过的电荷，I = Q/t，单位安培。1 安培即每秒 1 库仑。',
      },
      syllabus: ['0625.4.2.2.1', '0625.4.2.2.5'],
    },
    {
      en: 'electromotive force',
      zh: '电动势',
      definition: {
        en: 'The work done by a source per unit charge driven round a complete circuit. Measured in volts, despite the name.',
        zh: '电源驱动单位电荷绕完整回路一周所做的功。尽管名称如此，其单位是伏特。',
      },
      syllabus: ['0625.4.2.3.1', '0625.4.2.3.6'],
    },
    {
      en: 'potential difference',
      zh: '电势差',
      definition: {
        en: 'The work done by a unit charge passing through a component. Also in volts — energy out, where e.m.f. is energy in.',
        zh: '单位电荷通过某元件时所做的功。单位同样是伏特——它是"输出"的能量，而电动势是"输入"的能量。',
      },
      syllabus: ['0625.4.2.3.3', '0625.4.2.3.7'],
    },
    {
      en: 'kilowatt-hour',
      zh: '千瓦时',
      definition: {
        en: 'A unit of energy, not of power: one kilowatt for one hour, equal to 3.6 million joules.',
        zh: '能量单位而非功率单位：1 千瓦持续 1 小时，等于 360 万焦耳。',
      },
      syllabus: ['0625.4.2.5.4'],
    },
    {
      en: 'conventional current',
      zh: '常规电流',
      definition: {
        en: 'Current taken to flow from positive to negative. Electrons actually move the other way; the convention predates knowing that.',
        zh: '规定为从正极流向负极的电流。电子实际的移动方向相反；这个约定早于人们对此的了解。',
      },
      syllabus: ['0625.4.2.2.6'],
    },
  ],

  equations: [
    {
      latex: 'I = \\dfrac{Q}{t}',
      meaning: {
        en: 'Current is charge per second, so t must be in seconds. Rearranged, Q = It — and using hours here is out by a factor of 3600.',
        zh: '电流是每秒通过的电荷，因此 t 必须以秒计。变形得 Q = It——这里若用小时会差 3600 倍。',
      },
    },
    {
      latex: 'P = IV \\qquad E = IVt',
      meaning: {
        en: 'V is joules per coulomb and I is coulombs per second, so IV is joules per second. The formula is two units multiplied, not something to memorise.',
        zh: 'V 是焦耳每库仑，I 是库仑每秒，因此 IV 就是焦耳每秒。这个公式只是两个单位相乘，不必硬背。',
      },
      substitute: (r) =>
        `P = ${r['power'] ?? 0}\\ \\mathrm{W} \\quad E = ${r['energyJoules'] ?? 0}\\ \\mathrm{J} = ${r['energyKwh'] ?? 0}\\ \\mathrm{kW\\,h}`,
    },
    {
      latex: '1\\ \\mathrm{kW\\,h} = 3.6 \\times 10^{6}\\ \\mathrm{J}',
      meaning: {
        en: 'A thousand watts times three thousand six hundred seconds. To find a cost, work in kilowatts and hours and then multiply by the price.',
        zh: '1000 瓦乘以 3600 秒。计算费用时用千瓦和小时，再乘以单价。',
      },
      substitute: (r) => `\\text{cost} = ${r['cost'] ?? 0}\\ \\text{pence}`,
    },
  ],

  sim: {
    primitive: 'plot2d',
    kernel: '4-2-current-power',
    hint: {
      en: 'Look at the two energy readings together — the same electricity in joules and in kilowatt-hours.',
      zh: '把两个能量读数放在一起看——同一份电能，分别以焦耳和千瓦时计。',
    },
    params: [
      {
        key: 'voltage',
        label: { en: 'Supply voltage', zh: '电源电压' },
        unit: 'V',
        min: 1,
        max: 400,
        step: 1,
        default: 230,
      },
      {
        key: 'current',
        label: { en: 'Current drawn', zh: '取用的电流' },
        unit: 'A',
        min: 0.01,
        max: 50,
        step: 0.01,
        default: 8.7,
      },
      {
        key: 'hours',
        label: { en: 'How long it runs', zh: '运行时长' },
        unit: 'hours',
        min: 0.1,
        max: 24,
        step: 0.1,
        default: 3,
      },
      {
        key: 'pricePerKwh',
        label: { en: 'Price of electricity', zh: '电价' },
        unit: 'p/kWh',
        min: 1,
        max: 100,
        step: 1,
        default: 28,
      },
    ],
    readouts: [
      { key: 'power', label: { en: 'Power', zh: '功率' }, unit: 'W', sigFigs: 4, exact: true },
      {
        key: 'energyKwh',
        label: { en: 'Energy used', zh: '消耗的能量' },
        unit: 'kW h',
        sigFigs: 4,
        exact: true,
      },
      {
        key: 'energyJoules',
        label: { en: 'The same energy', zh: '同样的能量' },
        unit: 'J',
        sigFigs: 4,
        exact: true,
      },
      {
        key: 'cost',
        label: { en: 'Cost to run', zh: '运行费用' },
        unit: 'pence',
        sigFigs: 4,
        exact: true,
      },
    ],
    presets: [
      {
        label: { en: 'A 2 kW heater for 3 hours', zh: '2 千瓦取暖器，3 小时' },
        params: { voltage: 230, current: 8.7, hours: 3, pricePerKwh: 28 },
      },
      {
        label: { en: 'A 3 kW kettle for 6 minutes', zh: '3 千瓦水壶，6 分钟' },
        params: { voltage: 230, current: 13, hours: 0.1, pricePerKwh: 28 },
      },
      {
        label: { en: 'A 5 W bulb left on all day', zh: '5 瓦灯泡开一整天' },
        params: { voltage: 230, current: 0.02, hours: 24, pricePerKwh: 28 },
      },
      {
        label: { en: 'A 60 W lamp for an evening', zh: '60 瓦台灯，一晚上' },
        params: { voltage: 230, current: 0.26, hours: 5, pricePerKwh: 28 },
      },
      {
        label: { en: 'A 12 V car headlamp', zh: '12 伏汽车前照灯' },
        params: { voltage: 12, current: 5, hours: 2, pricePerKwh: 28 },
      },
    ],
  },

  narration,

  checkpoints: [
    {
      id: '0625-4-2-cp1',
      syllabus: ['0625.4.2.5.4'],
      tier: 'core',
      commandWord: 'Calculate',
      marks: 4,
      stem: 'An electric heater is rated at 2.0 kW. It is used for 3.0 hours. Electricity costs 28 pence per kilowatt-hour. Calculate the energy transferred in kilowatt-hours and the cost of using it.',
      markScheme: [
        { text: 'Energy = power × time = 2.0 × 3.0', marks: 1 },
        { text: '= 6.0 kW h', marks: 1 },
        { text: 'Cost = 6.0 × 28', marks: 1 },
        { text: '= 168 pence (£1.68)', marks: 1 },
      ],
      examinerNote: {
        en: 'Work in kilowatts and hours throughout — converting to watts and seconds gives 21.6 million joules, which is correct but useless for the cost.',
        zh: '全程用千瓦和小时计算——换算成瓦和秒会得到 2160 万焦耳，虽然正确，但对算费用毫无用处。',
      },
    },
    {
      id: '0625-4-2-cp2',
      syllabus: ['0625.4.2.5.4'],
      tier: 'core',
      commandWord: 'Explain',
      marks: 2,
      stem: 'A student says that the kilowatt-hour is a unit of power because its name contains the word "kilowatt". Explain why the student is wrong.',
      markScheme: [
        {
          text: 'A kilowatt-hour is a power multiplied by a time, and power × time gives energy',
          marks: 1,
        },
        {
          text: 'so it is a unit of energy, equal to 3.6 × 10⁶ J — a kilowatt is the rate, and a kilowatt-hour is the amount',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'The distinction is rate against amount, and it is the same one as speed against distance. Nobody thinks a "mile per hour hour" is a speed.',
        zh: '区别在于"速率"与"总量"，这与"速率"和"距离"的关系是一样的。没有人会以为"英里每小时·小时"是速率。',
      },
    },
    {
      id: '0625-4-2-cp3',
      syllabus: ['0625.4.2.2.5'],
      tier: 'extended',
      commandWord: 'Calculate',
      marks: 3,
      stem: 'A current of 0.50 A flows through a lamp for 4.0 minutes. Calculate the charge that passes through the lamp.',
      markScheme: [
        { text: 'Converts the time: 4.0 minutes = 240 s', marks: 1 },
        { text: 'Q = I t = 0.50 × 240', marks: 1 },
        { text: '= 120 C', marks: 1 },
      ],
      examinerNote: {
        en: 'The ampere is a coulomb per second, so the time must be in seconds. Using 4.0 gives 2.0 C, which is out by a factor of 60.',
        zh: '安培是库仑每秒，因此时间必须以秒计。直接用 4.0 会得到 2.0 C，差了 60 倍。',
      },
    },
    {
      id: '0625-4-2-cp4',
      syllabus: ['0625.4.2.3.1', '0625.4.2.3.3'],
      tier: 'extended',
      commandWord: 'Compare',
      marks: 2,
      stem: 'Compare what is meant by the e.m.f. of a cell and the potential difference across a lamp.',
      markScheme: [
        {
          text: 'The e.m.f. is the energy supplied by the cell to each coulomb of charge driven round the complete circuit',
          marks: 1,
        },
        {
          text: 'The potential difference is the energy transferred from each coulomb as it passes through the lamp; both are measured in volts',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'E.m.f. is energy in, p.d. is energy out, both per coulomb. Saying "they are both voltages" describes the unit rather than the quantity.',
        zh: '电动势是"输入"的能量，电势差是"输出"的能量，都以每库仑计。写"它们都是电压"说的是单位，不是物理量。',
      },
    },
    {
      id: '0625-4-2-cp5',
      syllabus: ['0625.4.2.2.3', '0625.4.2.2.6'],
      tier: 'extended',
      commandWord: 'Describe',
      marks: 3,
      stem: 'Describe how a current flows in a copper wire, and state the direction of the electron flow relative to the conventional current.',
      markScheme: [
        {
          text: 'Copper contains free electrons — outer electrons not bound to any one atom',
          marks: 1,
        },
        {
          text: 'When a p.d. is applied across the wire these electrons drift through the metal lattice, and that flow of charge is the current',
          marks: 1,
        },
        {
          text: 'The electrons flow from negative to positive, which is opposite to the conventional current direction',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Free electrons, not "electricity". And the convention was fixed before anyone knew which way the charge moved, so the two directions genuinely disagree.',
        zh: '要写"自由电子"，而不是笼统的"电"。另外这个约定是在人们弄清电荷流向之前定下的，所以两个方向确实相反。',
      },
    },
    {
      id: '0625-4-2-cp6',
      syllabus: ['0625.4.2.5.2'],
      tier: 'core',
      commandWord: 'Calculate',
      marks: 2,
      stem: 'A hairdryer is connected to a 230 V supply and draws a current of 4.5 A. Calculate its power.',
      markScheme: [
        { text: 'P = IV = 4.5 × 230', marks: 1 },
        { text: '= 1035 W (about 1.0 kW)', marks: 1 },
      ],
      examinerNote: {
        en: 'A quick sanity check: mains appliances run from a few watts to about three kilowatts. An answer of 51 W or 100 kW should look wrong at once.',
        zh: '快速核对：市电电器的功率从几瓦到约 3 千瓦。算出 51 瓦或 100 千瓦，应该立刻看着不对。',
      },
    },
  ],
}

export default lesson
