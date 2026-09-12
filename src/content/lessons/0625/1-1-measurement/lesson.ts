import type { Lesson } from '@/content/types'
import narration from './narration'

const lesson: Lesson = {
  slug: '1-1-measurement',
  subject: '0625',
  syllabus: [
    '0625.1.1.1',
    '0625.1.1.2',
    '0625.1.1.3',
    '0625.1.1.4',
    '0625.1.1.5',
    '0625.1.1.6',
    '0625.1.1.7',
  ],
  tier: 'extended',
  estimatedMinutes: 45,

  title: { en: 'Measurement, scalars and vectors', zh: '测量、标量与矢量' },
  summary: {
    en: 'Six east plus eight north is ten, not fourteen. The dashed rectangle is where the right angle comes from — and why Pythagoras applies at all.',
    zh: '向东 6 加向北 8 等于 10，而不是 14。虚线矩形正是直角的来源——也是勾股定理之所以适用的原因。',
  },

  objectives: [
    {
      en: 'Measure length and volume with rulers and measuring cylinders, and time intervals with clocks and timers.',
      zh: '用直尺与量筒测量长度和体积，用钟表与计时器测量时间间隔。',
    },
    {
      en: 'Find an average for a small distance or a short time by measuring multiples.',
      zh: '通过测量多个来求得微小距离或极短时间的平均值。',
    },
    {
      en: 'Distinguish scalars from vectors, and identify which quantities are which. (Extended)',
      zh: '区分标量与矢量，并识别各物理量属于哪一类。（Extended）',
    },
    {
      en: 'Find the resultant of two perpendicular vectors by calculation or by scale drawing. (Extended)',
      zh: '用计算或按比例作图求两个垂直矢量的合矢量。（Extended）',
    },
  ],

  glossary: [
    {
      en: 'scalar',
      zh: '标量',
      definition: {
        en: 'A quantity with magnitude only — distance, speed, mass, time, energy.',
        zh: '只有大小的物理量——距离、速率、质量、时间、能量。',
      },
      syllabus: ['0625.1.1.4', '0625.1.1.5'],
    },
    {
      en: 'vector',
      zh: '矢量',
      definition: {
        en: 'A quantity with magnitude and direction — displacement, velocity, acceleration, force, momentum.',
        zh: '既有大小又有方向的物理量——位移、速度、加速度、力、动量。',
      },
      syllabus: ['0625.1.1.4', '0625.1.1.6'],
    },
    {
      en: 'resultant',
      zh: '合矢量',
      definition: {
        en: 'The single vector that has the same effect as two or more acting together. For perpendicular vectors it is the diagonal of the rectangle.',
        zh: '与两个或多个矢量共同作用效果相同的单一矢量。对垂直矢量而言，它是矩形的对角线。',
      },
      syllabus: ['0625.1.1.7'],
    },
    {
      en: 'parallax error',
      zh: '视差误差',
      definition: {
        en: 'Reading a scale from an angle rather than at eye level. It is systematic, so repeating the measurement does not remove it.',
        zh: '不平视而是斜着读刻度所造成的误差。它是系统误差，因此重复测量并不能消除它。',
      },
      syllabus: ['0625.1.1.1'],
    },
  ],

  equations: [
    {
      latex: 'R = \\sqrt{a^{2} + b^{2}}',
      meaning: {
        en: 'The magnitude of the resultant of two perpendicular vectors — the diagonal of the rectangle they form. Never simply a + b.',
        zh: '两个垂直矢量的合矢量的大小——它们所构成矩形的对角线。绝不是简单的 a + b。',
      },
      substitute: (r) =>
        `R = ${r['resultant'] ?? 0} \\quad \\theta = ${r['angle'] ?? 0}^\\circ \\quad \\text{from drawing } ${r['drawn'] ?? 0}`,
    },
    {
      latex: '\\tan\\theta = \\dfrac{b}{a}',
      meaning: {
        en: 'The direction, measured from the first vector. A vector answer without a direction is only half an answer.',
        zh: '方向，从第一个矢量量起。矢量的答案若没有方向，只答了一半。',
      },
    },
  ],

  sim: {
    primitive: 'vectors',
    kernel: '1-1-measurement',
    hint: {
      en: 'Compare the calculated resultant with what a scale drawing would give, then make the scale bigger.',
      zh: '把计算所得的合矢量与按比例作图所得的结果作比较，然后把比例尺调大。',
    },
    params: [
      {
        key: 'a',
        label: { en: 'First vector, east', zh: '第一个矢量（向东）' },
        unit: '',
        min: 0,
        max: 20,
        step: 0.1,
        default: 6,
      },
      {
        key: 'b',
        label: { en: 'Second vector, north', zh: '第二个矢量（向北）' },
        unit: '',
        min: 0,
        max: 20,
        step: 0.1,
        default: 8,
      },
      {
        key: 'scale',
        label: { en: 'Scale used for the drawing', zh: '作图所用的比例尺' },
        unit: 'mm per unit',
        min: 1,
        max: 20,
        step: 1,
        default: 10,
      },
    ],
    readouts: [
      {
        key: 'resultant',
        label: { en: 'Resultant, calculated', zh: '合矢量（计算）' },
        unit: '',
        sigFigs: 3,
        exact: true,
      },
      {
        key: 'angle',
        label: { en: 'Angle from the first vector', zh: '与第一个矢量的夹角' },
        unit: '°',
        sigFigs: 3,
        exact: true,
      },
      {
        key: 'drawn',
        label: { en: 'Resultant, from the drawing', zh: '合矢量（作图）' },
        unit: '',
        sigFigs: 3,
        exact: true,
      },
      {
        key: 'difference',
        label: { en: 'Difference between the two', zh: '两者之差' },
        unit: '',
        sigFigs: 3,
        exact: true,
      },
    ],
    presets: [
      { label: { en: 'A 3-4-5 triangle', zh: '3-4-5 直角三角形' }, params: { a: 3, b: 4, scale: 20 } },
      { label: { en: 'Six east, eight north', zh: '东 6，北 8' }, params: { a: 6, b: 8, scale: 10 } },
      { label: { en: 'Equal, so 45°', zh: '两者相等，故为 45°' }, params: { a: 7, b: 7, scale: 10 } },
      {
        label: { en: 'A coarse scale drawing', zh: '粗糙的比例作图' },
        params: { a: 3.7, b: 5.3, scale: 2 },
      },
      {
        label: { en: 'The same, drawn larger', zh: '同一题，画得更大' },
        params: { a: 3.7, b: 5.3, scale: 20 },
      },
      { label: { en: 'One vector is zero', zh: '其中一个矢量为零' }, params: { a: 0, b: 9, scale: 10 } },
    ],
  },

  narration,

  checkpoints: [
    {
      id: '0625-1-1-cp1',
      syllabus: ['0625.1.1.7'],
      tier: 'extended',
      commandWord: 'Calculate',
      marks: 3,
      stem: 'A boat is rowed east at 3.0 m/s across a river that flows north at 4.0 m/s. Calculate the magnitude and direction of the resultant velocity.',
      markScheme: [
        { text: 'Recognises the two velocities are perpendicular and uses R² = 3.0² + 4.0²', marks: 1 },
        { text: 'Magnitude = 5.0 m/s', marks: 1 },
        {
          text: 'Direction: tan θ = 4.0 / 3.0, so θ = 53° north of east (or equivalent)',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'The direction is a mark in its own right. A velocity is a vector, so "5.0 m/s" alone is an incomplete answer however correct the arithmetic.',
        zh: '方向本身就是一个得分点。速度是矢量，因此只写"5.0 m/s"是不完整的答案，无论算式多正确。',
      },
    },
    {
      id: '0625-1-1-cp2',
      syllabus: ['0625.1.1.3'],
      tier: 'core',
      commandWord: 'Describe',
      marks: 3,
      stem: 'Describe how you would measure the thickness of one sheet of paper accurately, using only a ruler.',
      markScheme: [
        { text: 'Stack a large, counted number of identical sheets — say 100', marks: 1 },
        { text: 'Measure the total thickness of the stack with the ruler', marks: 1 },
        { text: 'Divide the total thickness by the number of sheets', marks: 1 },
      ],
      examinerNote: {
        en: 'Say why it works if you have room: the reading uncertainty is the same for the stack as for one sheet, so dividing by 100 divides the uncertainty by 100 too.',
        zh: '有余地的话要说明原理：整摞纸与一张纸的读数不确定度相同，因此除以 100 也把不确定度除以了 100。',
      },
    },
    {
      id: '0625-1-1-cp3',
      syllabus: ['0625.1.1.4', '0625.1.1.5', '0625.1.1.6'],
      tier: 'extended',
      commandWord: 'Explain',
      marks: 3,
      stem: 'A runner completes exactly one lap of a 400 m circular track in 80 s. Explain why their average speed is not zero but their average velocity is.',
      markScheme: [
        {
          text: 'Speed is a scalar, calculated from the distance travelled: 400 / 80 = 5.0 m/s',
          marks: 1,
        },
        {
          text: 'Velocity is a vector, calculated from the displacement — the straight-line distance from start to finish',
          marks: 1,
        },
        {
          text: 'The runner finishes where they started, so the displacement is zero and the average velocity is zero',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'This is the cleanest test of whether the scalar–vector distinction has landed. Distance and displacement are different quantities, not two words for the same thing.',
        zh: '这是检验标量与矢量之分是否真正掌握的最干净的一题。距离与位移是不同的物理量，不是同一件事的两种说法。',
      },
    },
    {
      id: '0625-1-1-cp4',
      syllabus: ['0625.1.1.7'],
      tier: 'extended',
      commandWord: 'Suggest',
      marks: 2,
      stem: 'A student finds the resultant of two perpendicular forces by scale drawing and gets an answer 0.4 N different from the calculated value. Suggest how they could reduce this difference.',
      markScheme: [
        {
          text: 'Use a larger scale, so that each newton is represented by a greater length on the paper',
          marks: 1,
        },
        {
          text: 'A ruler still reads to the nearest millimetre, so a larger scale makes that millimetre correspond to a smaller force — and use a sharp pencil and measure carefully',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'The precision of a scale drawing is set by the scale, and it is under the student’s control. "Be more careful" alone is not a method.',
        zh: '比例作图的精度由比例尺决定，而这是学生可以控制的。只写"更仔细一些"算不上方法。',
      },
    },
    {
      id: '0625-1-1-cp5',
      syllabus: ['0625.1.1.1', '0625.1.1.2'],
      tier: 'core',
      commandWord: 'Describe',
      marks: 3,
      stem: 'Describe how to measure the volume of a small irregularly shaped stone, and state one precaution needed for an accurate reading.',
      markScheme: [
        {
          text: 'Part-fill a measuring cylinder with water and record the initial volume',
          marks: 1,
        },
        {
          text: 'Lower the stone in until it is fully submerged and record the new volume; the volume of the stone is the difference',
          marks: 1,
        },
        {
          text: 'Read the bottom of the meniscus at eye level, to avoid a parallax error',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'The stone must be fully submerged, and the reading must be at eye level. Both are marks, and both are the sort of detail Paper 6 is built on.',
        zh: '石块必须完全浸没，读数必须平视。两者都是得分点，也正是 Paper 6 所看重的那类细节。',
      },
    },
  ],
}

export default lesson
