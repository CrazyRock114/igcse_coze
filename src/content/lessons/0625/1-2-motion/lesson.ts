import type { Lesson } from '@/content/types'
import { formatSigFigs } from '@/lib/units'
import narration from './narration'

/**
 * 1.2 Motion — the vertical slice for this course.
 *
 * Everything a lesson can carry is exercised here: syllabus anchoring, bilingual
 * copy, a tested kernel, live equations, glossary scaffolding, narration that drives
 * the simulation, and exam-style checkpoints with mark schemes.
 */
const lesson: Lesson = {
  slug: '1-2-motion',
  subject: '0625',
  syllabus: [
    '0625.1.2.1',
    '0625.1.2.2',
    '0625.1.2.3',
    '0625.1.2.4',
    '0625.1.2.5',
    '0625.1.2.6',
    '0625.1.2.7',
    '0625.1.2.8',
    '0625.1.2.9',
    '0625.1.2.11',
    '0625.1.2.12',
  ],
  tier: 'extended',
  estimatedMinutes: 45,

  title: { en: 'Motion graphs', zh: '运动图像' },
  summary: {
    en: 'Read speed and acceleration off distance–time and speed–time graphs, and get distance back from the area underneath.',
    zh: '从位移–时间图和速度–时间图中读出速度与加速度，并由图像下的面积求路程。',
  },

  objectives: [
    {
      en: 'Define speed and velocity, and use v = s / t.',
      zh: '定义速率与速度，并使用 v = s / t。',
    },
    {
      en: 'Sketch, plot and interpret distance–time and speed–time graphs.',
      zh: '画出并解读位移–时间图与速度–时间图。',
    },
    {
      en: 'Decide from a graph whether an object is at rest, moving steadily, accelerating or decelerating.',
      zh: '由图像判断物体处于静止、匀速、加速还是减速。',
    },
    {
      en: 'Find speed from the gradient of a distance–time graph.',
      zh: '由位移–时间图的斜率求速度。',
    },
    {
      en: 'Find distance from the area under a speed–time graph.',
      zh: '由速度–时间图下的面积求路程。',
    },
    {
      en: 'Find acceleration from the gradient of a speed–time graph, treating deceleration as negative. (Extended)',
      zh: '由速度–时间图的斜率求加速度，减速视为负值。（Extended）',
    },
  ],

  glossary: [
    {
      en: 'speed',
      zh: '速率',
      definition: {
        en: 'The distance travelled per unit time. A scalar — it has no direction.',
        zh: '单位时间内通过的距离。标量，没有方向。',
      },
      syllabus: ['0625.1.2.1'],
    },
    {
      en: 'velocity',
      zh: '速度',
      definition: {
        en: 'Speed in a given direction. A vector. Exams penalise using this word when you mean speed.',
        zh: '有指定方向的速率。矢量。考试中把它与速率混用会失分。',
      },
      syllabus: ['0625.1.2.2'],
    },
    {
      en: 'gradient',
      zh: '斜率',
      definition: {
        en: 'The steepness of a line, found as the change in the y value divided by the change in the x value.',
        zh: '直线的陡峭程度，等于纵坐标变化量除以横坐标变化量。',
      },
      syllabus: ['0625.1.2.6', '0625.1.2.11'],
    },
    {
      en: 'acceleration',
      zh: '加速度',
      definition: {
        en: 'The change in velocity per unit time. Measured in m / s².',
        zh: '单位时间内速度的变化量。单位为 m / s²。',
      },
      syllabus: ['0625.1.2.9'],
    },
    {
      en: 'deceleration',
      zh: '减速',
      definition: {
        en: 'Slowing down. In calculations it is simply a negative acceleration.',
        zh: '速度减小。在计算中它就是负的加速度。',
      },
      syllabus: ['0625.1.2.12'],
    },
  ],

  equations: [
    {
      latex: 'v = \\frac{s}{t}',
      meaning: {
        en: 'Speed is distance travelled divided by the time taken.',
        zh: '速率等于通过的距离除以所用时间。',
      },
    },
    {
      latex: 'a = \\frac{\\Delta v}{\\Delta t}',
      meaning: {
        en: 'Acceleration is the change in velocity divided by the time it took.',
        zh: '加速度等于速度变化量除以所用时间。',
      },
    },
    {
      latex: 's = ut + \\tfrac{1}{2}at^{2}',
      meaning: {
        en: 'Distance travelled under constant acceleration — this is what the graph below is drawing.',
        zh: '匀加速运动通过的距离——下方图像画的就是它。',
      },
      substitute: (r) =>
        `s = ${formatSigFigs(r['distance'] ?? 0, 3)}\\ \\text{m},\\quad v = ${formatSigFigs(
          r['finalSpeed'] ?? 0,
          3
        )}\\ \\text{m/s}`,
    },
  ],

  sim: {
    primitive: 'plot2d',
    kernel: '1-2-motion',
    params: [
      {
        key: 'u',
        label: { en: 'Initial speed', zh: '初速度' },
        unit: 'm / s',
        symbol: 'u',
        min: 0,
        max: 30,
        step: 0.5,
        default: 0,
      },
      {
        key: 'a',
        label: { en: 'Acceleration', zh: '加速度' },
        unit: 'm / s²',
        symbol: 'a',
        min: -6,
        max: 6,
        step: 0.1,
        default: 2,
      },
      {
        key: 'duration',
        label: { en: 'Time', zh: '时间' },
        unit: 's',
        symbol: 't',
        min: 1,
        max: 20,
        step: 0.5,
        default: 10,
      },
    ],
    readouts: [
      {
        key: 'finalSpeed',
        label: { en: 'Final speed', zh: '末速度' },
        unit: 'm / s',
        symbol: 'v',
        sigFigs: 3,
      },
      {
        key: 'distance',
        label: { en: 'Distance travelled', zh: '通过的路程' },
        unit: 'm',
        symbol: 's',
        sigFigs: 3,
      },
      {
        key: 'averageSpeed',
        label: { en: 'Average speed', zh: '平均速率' },
        unit: 'm / s',
        sigFigs: 3,
      },
      {
        key: 'timeToRest',
        label: { en: 'Time until at rest', zh: '停止所需时间' },
        unit: 's',
        sigFigs: 3,
      },
    ],
  },

  narration,

  checkpoints: [
    {
      id: '1-2-motion-cp1',
      syllabus: ['0625.1.2.5'],
      tier: 'core',
      commandWord: 'Identify',
      marks: 1,
      stem: 'A distance–time graph for a moving object is a horizontal straight line. Identify the motion of the object.',
      options: [
        'It is at rest',
        'It is moving at constant speed',
        'It is accelerating',
        'It is decelerating',
      ],
      answerIndex: 0,
      markScheme: [{ text: 'At rest / stationary / not moving', marks: 1 }],
      examinerNote: {
        en: 'A horizontal line on a distance–time graph means the distance is not changing, so the object is stationary. Candidates who read it as "constant speed" have confused it with a speed–time graph.',
        zh: '位移–时间图上的水平线表示位移不变，物体静止。选"匀速"的同学是把它当成速度–时间图了。',
      },
    },
    {
      id: '1-2-motion-cp2',
      syllabus: ['0625.1.2.7'],
      tier: 'core',
      commandWord: 'Calculate',
      marks: 3,
      stem: 'A car accelerates uniformly from rest to 20 m / s in 8.0 s. Calculate the distance it travels in this time.',
      markScheme: [
        {
          text: 'Uses the area under the speed–time graph, or s = ½(u + v)t',
          marks: 1,
          alternatives: ['½ × 8.0 × 20', 'average speed = 10 m/s'],
        },
        { text: 'Correct substitution of values', marks: 1 },
        { text: '80 m', marks: 1, alternatives: ['80'] },
      ],
      examinerNote: {
        en: 'The graph is a triangle, so the area is ½ × base × height = ½ × 8.0 × 20 = 80 m. A common error is 20 × 8.0 = 160 m, which treats the speed as constant.',
        zh: '图像是三角形，面积 = ½ × 底 × 高 = ½ × 8.0 × 20 = 80 m。常见错误是算成 20 × 8.0 = 160 m，那是把速度当成恒定值了。',
      },
    },
    {
      id: '1-2-motion-cp3',
      syllabus: ['0625.1.2.11', '0625.1.2.12'],
      tier: 'extended',
      commandWord: 'Determine',
      marks: 3,
      stem: 'A cyclist travelling at 12 m / s brakes and comes to rest in 4.0 s. Determine the acceleration of the cyclist, and state what the sign of your answer means.',
      markScheme: [
        { text: 'Uses a = Δv / Δt', marks: 1, alternatives: ['(0 − 12) / 4.0'] },
        { text: '−3.0 m / s²', marks: 1, alternatives: ['3.0 m/s² deceleration'] },
        {
          text: 'The negative sign shows the cyclist is decelerating / slowing down',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'The change in velocity is the final value minus the initial value, so 0 − 12 = −12 m / s. Writing 12 / 4.0 = 3.0 without a sign or the word "deceleration" loses the third mark.',
        zh: '速度变化量是末速度减初速度，即 0 − 12 = −12 m / s。只写 12 / 4.0 = 3.0 而不加负号或"减速"二字，会丢掉第三分。',
      },
    },
  ],
}

export default lesson
