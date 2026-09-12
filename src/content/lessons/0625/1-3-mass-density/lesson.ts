import type { Lesson } from '@/content/types'
import narration from './narration'

const lesson: Lesson = {
  slug: '1-3-mass-density',
  subject: '0625',
  syllabus: [
    '0625.1.3.1',
    '0625.1.3.2',
    '0625.1.3.3',
    '0625.1.3.4',
    '0625.1.3.5',
    '0625.1.4.1',
    '0625.1.4.2',
    '0625.1.4.3',
    '0625.1.4.4',
  ],
  tier: 'extended',
  estimatedMinutes: 45,

  title: { en: 'Mass, weight and density', zh: '质量、重力与密度' },
  summary: {
    en: 'Take the object to the Moon and one line drops to a sixth while the other does not move at all. Saying "mass does not change" is easy; seeing it beside a line that does is not.',
    zh: '把物体带到月球，一条线降到六分之一，另一条纹丝不动。嘴上说"质量不变"很容易；把它放在一条确实在变的线旁边看，就不一样了。',
  },

  objectives: [
    {
      en: 'State that mass measures the quantity of matter, and that weight is a gravitational force acting on a mass.',
      zh: '说明质量衡量物质的多少，而重力是作用在质量上的引力。',
    },
    {
      en: 'Define gravitational field strength and use g = W / m.',
      zh: '定义重力场强度并使用 g = W / m。',
    },
    {
      en: 'Compare weights and masses using a balance, and describe weight as the effect of a gravitational field on a mass. (Extended)',
      zh: '用天平比较重力与质量，并把重力描述为重力场作用于质量的效果。（Extended）',
    },
    { en: 'Define density and use ρ = m / V.', zh: '定义密度并使用 ρ = m / V。' },
    {
      en: 'Determine the density of a liquid, a regular solid and an irregular solid.',
      zh: '测定液体、规则固体与不规则固体的密度。',
    },
    {
      en: 'Decide from density data whether an object floats, and whether one liquid floats on another. (Extended)',
      zh: '根据密度数据判断物体是否漂浮，以及一种液体能否浮在另一种之上。（Extended）',
    },
  ],

  glossary: [
    {
      en: 'mass',
      zh: '质量',
      definition: {
        en: 'The quantity of matter in an object, in kilograms. A property of the object, unchanged by where it is.',
        zh: '物体中物质的多少，单位为千克。它是物体的属性，与所处位置无关。',
      },
      syllabus: ['0625.1.3.1'],
    },
    {
      en: 'weight',
      zh: '重力',
      definition: {
        en: 'The gravitational force acting on a mass, in newtons. It changes with the gravitational field strength.',
        zh: '作用在质量上的引力，单位为牛顿。它随重力场强度而变化。',
      },
      syllabus: ['0625.1.3.2', '0625.1.3.5'],
    },
    {
      en: 'gravitational field strength',
      zh: '重力场强度',
      definition: {
        en: 'The force per unit mass, in newtons per kilogram. About 9.8 N/kg on Earth, 1.6 on the Moon.',
        zh: '单位质量所受的力，单位是牛每千克。地球上约为 9.8 N/kg，月球上为 1.6。',
      },
      syllabus: ['0625.1.3.3'],
    },
    {
      en: 'density',
      zh: '密度',
      definition: {
        en: 'Mass per unit volume. Unchanged by where the object is, because neither mass nor volume changes.',
        zh: '单位体积的质量。它与物体所在位置无关，因为质量和体积都不随位置改变。',
      },
      syllabus: ['0625.1.4.1'],
    },
  ],

  equations: [
    {
      latex: 'W = mg',
      meaning: {
        en: 'Weight is a force in newtons; mass is in kilograms. Rearranged, g = W / m is the gravitational field strength — the force per unit mass.',
        zh: '重力是以牛顿为单位的力，质量以千克为单位。变形后 g = W / m 就是重力场强度——单位质量所受的力。',
      },
      substitute: (r) =>
        `W = ${r['weight'] ?? 0}\\ \\mathrm{N} \\quad \\text{at } g = ${r['fieldStrength'] ?? 0}\\ \\mathrm{N\\,kg^{-1}}`,
    },
    {
      latex: '\\rho = \\dfrac{m}{V}',
      meaning: {
        en: 'Convert the units before dividing. Grams and cubic centimetres give g/cm³; kilograms and cubic metres give kg/m³, and the two differ by a factor of 1000.',
        zh: '做除法之前先换算单位。克与立方厘米得到 g/cm³；千克与立方米得到 kg/m³，两者相差 1000 倍。',
      },
      substitute: (r) =>
        `\\rho = ${r['density'] ?? 0}\\ \\mathrm{g\\,cm^{-3}} \\quad \\text{submerged } ${r['submerged'] ?? 0}\\%`,
    },
  ],

  sim: {
    primitive: 'plot2d',
    kernel: '1-3-mass-density',
    hint: {
      en: 'Move the object to the Moon and compare the two graphs. Then change the fluid to mercury and watch it float.',
      zh: '把物体移到月球，比较两张图。然后把流体换成汞，看它浮起来。',
    },
    params: [
      {
        key: 'mass',
        label: { en: 'Mass of the object', zh: '物体的质量' },
        unit: 'kg',
        min: 0.1,
        max: 100,
        step: 0.1,
        default: 2,
      },
      {
        key: 'volume',
        label: { en: 'Volume of the object', zh: '物体的体积' },
        unit: 'cm³',
        min: 1,
        max: 5000,
        step: 10,
        default: 250,
      },
      {
        key: 'gravity',
        label: { en: 'Gravitational field strength', zh: '重力场强度' },
        unit: 'N/kg',
        min: 0,
        max: 30,
        step: 0.1,
        default: 9.8,
      },
      {
        key: 'fluidDensity',
        label: { en: 'Density of the fluid', zh: '流体的密度' },
        unit: 'g/cm³',
        min: 0.1,
        max: 14,
        step: 0.1,
        default: 1,
      },
    ],
    readouts: [
      {
        key: 'weight',
        label: { en: 'Weight', zh: '重力' },
        unit: 'N',
        sigFigs: 4,
        exact: true,
      },
      {
        key: 'density',
        label: { en: 'Density of the object', zh: '物体的密度' },
        unit: 'g/cm³',
        sigFigs: 4,
        exact: true,
      },
      {
        key: 'fieldStrength',
        label: { en: 'Field strength here', zh: '此处的场强' },
        unit: 'N/kg',
        sigFigs: 3,
        exact: true,
      },
      {
        key: 'submerged',
        label: { en: 'Fraction submerged', zh: '浸没的比例' },
        unit: '%',
        sigFigs: 3,
        exact: true,
      },
    ],
    presets: [
      {
        label: { en: 'On Earth', zh: '在地球上' },
        params: { mass: 2, volume: 250, gravity: 9.8, fluidDensity: 1 },
      },
      {
        label: { en: 'On the Moon', zh: '在月球上' },
        params: { mass: 2, volume: 250, gravity: 1.6, fluidDensity: 1 },
      },
      {
        label: { en: 'In free space', zh: '在自由空间中' },
        params: { mass: 2, volume: 250, gravity: 0, fluidDensity: 1 },
      },
      {
        label: { en: 'The same block, on mercury', zh: '同一块物体，放在汞上' },
        params: { mass: 2, volume: 250, gravity: 9.8, fluidDensity: 13.6 },
      },
      {
        label: { en: 'Ice in water: the iceberg', zh: '冰在水中：冰山' },
        params: { mass: 0.92, volume: 1000, gravity: 9.8, fluidDensity: 1 },
      },
      {
        label: { en: 'Oil on water', zh: '油浮在水上' },
        params: { mass: 0.8, volume: 1000, gravity: 9.8, fluidDensity: 1 },
      },
    ],
  },

  narration,

  checkpoints: [
    {
      id: '0625-1-3-cp1',
      syllabus: ['0625.1.3.1', '0625.1.3.2', '0625.1.3.5'],
      tier: 'extended',
      commandWord: 'Explain',
      marks: 3,
      stem: 'An astronaut takes a 5.0 kg toolbox to the Moon, where g = 1.6 N/kg. Explain what happens to its mass and to its weight, and calculate the weight on the Moon.',
      markScheme: [
        {
          text: 'The mass stays at 5.0 kg, because mass is the quantity of matter in the object and does not depend on where it is',
          marks: 1,
        },
        {
          text: 'The weight decreases, because weight is the gravitational force on the mass and the Moon’s gravitational field strength is smaller',
          marks: 1,
        },
        { text: 'W = mg = 5.0 × 1.6 = 8.0 N', marks: 1 },
      ],
      examinerNote: {
        en: 'Give the reason for each, not just the outcome. And weight is in newtons — an answer of "8.0 kg" contradicts the definition it was just asked for.',
        zh: '两者都要给出理由，而不只是结果。另外重力的单位是牛顿——答"8.0 kg"与刚刚被问到的定义自相矛盾。',
      },
    },
    {
      id: '0625-1-3-cp2',
      syllabus: ['0625.1.4.1', '0625.1.4.2'],
      tier: 'core',
      commandWord: 'Calculate',
      marks: 3,
      stem: 'A block of metal has a mass of 810 g. It measures 10.0 cm by 5.0 cm by 6.0 cm. Calculate its density and state the unit.',
      markScheme: [
        { text: 'Volume = 10.0 × 5.0 × 6.0 = 300 cm³', marks: 1 },
        { text: 'ρ = m / V = 810 / 300', marks: 1 },
        { text: '= 2.7 g/cm³', marks: 1 },
      ],
      examinerNote: {
        en: 'The unit is a mark. And 2.7 g/cm³ is aluminium — a sanity check worth doing, since a density of 27 or 0.27 should look wrong immediately.',
        zh: '单位本身就是一个得分点。另外 2.7 g/cm³ 是铝——这个常识性核对值得做，因为算出 27 或 0.27 应该立刻看着不对。',
      },
    },
    {
      id: '0625-1-3-cp3',
      syllabus: ['0625.1.4.3', '0625.1.4.4'],
      tier: 'extended',
      commandWord: 'Predict',
      marks: 3,
      stem: 'A solid cube of density 7.8 g/cm³ is placed first in water (1.0 g/cm³) and then in mercury (13.6 g/cm³). Predict what happens in each, and explain the difference.',
      markScheme: [
        { text: 'It sinks in water, because its density is greater than that of water', marks: 1 },
        { text: 'It floats on mercury, because its density is less than that of mercury', marks: 1 },
        {
          text: 'Nothing about the cube has changed — floating depends on the comparison between the object’s density and the density of the fluid it is in',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'The third mark is the one that matters. There is no such thing as an object that "is dense enough to sink" — only one that is denser than a particular fluid.',
        zh: '第三个得分点才是关键。不存在"密度大到会下沉"的物体——只有"比某种特定流体密度大"的物体。',
      },
    },
    {
      id: '0625-1-3-cp4',
      syllabus: ['0625.1.4.2'],
      tier: 'core',
      commandWord: 'Describe',
      marks: 4,
      stem: 'Describe how to determine the density of an irregularly shaped pebble using a balance and a measuring cylinder.',
      markScheme: [
        { text: 'Measure the mass of the pebble on the balance', marks: 1 },
        {
          text: 'Part-fill the measuring cylinder with water and record the volume, reading at eye level',
          marks: 1,
        },
        {
          text: 'Lower the pebble in until fully submerged and record the new volume; the volume of the pebble is the difference between the two readings',
          marks: 1,
        },
        { text: 'Calculate the density as mass divided by volume', marks: 1 },
      ],
      examinerNote: {
        en: 'Fully submerged, and read at eye level — both are marks. This is a Paper 6 answer, so the detail is the point rather than the physics.',
        zh: '"完全浸没"和"平视读数"都是得分点。这是一道 Paper 6 式的答案，考的是细节而不是物理本身。',
      },
    },
    {
      id: '0625-1-3-cp5',
      syllabus: ['0625.1.3.4'],
      tier: 'core',
      commandWord: 'Suggest',
      marks: 2,
      stem: 'A beam balance and a spring balance both read correctly on Earth. Suggest what each would read for the same object on the Moon, and explain the difference.',
      markScheme: [
        {
          text: 'The beam balance reads the same, because it compares two masses and the reduced gravity acts equally on both sides, cancelling out',
          marks: 1,
        },
        {
          text: 'The spring balance reads about a sixth, because it measures the force of gravity on the object and that force has decreased',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'The instrument decides which quantity you are measuring. A beam balance measures mass however weak the gravity, provided there is some.',
        zh: '仪器决定了你测的是哪个量。只要还有引力，杠杆天平无论引力多弱测得的都是质量。',
      },
    },
  ],
}

export default lesson
