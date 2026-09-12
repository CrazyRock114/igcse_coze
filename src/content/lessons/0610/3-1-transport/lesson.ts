import type { Lesson } from '@/content/types'
import narration from './narration'

const lesson: Lesson = {
  slug: '3-1-transport',
  subject: '0610',
  syllabus: [
    '0610.3.1.1',
    '0610.3.1.2',
    '0610.3.1.3',
    '0610.3.1.4',
    '0610.3.1.5',
    '0610.3.3.1',
    '0610.3.3.2',
    '0610.3.3.3',
  ],
  tier: 'extended',
  estimatedMinutes: 45,

  title: { en: 'Diffusion and active transport', zh: '扩散与主动运输' },
  summary: {
    en: 'Plot both against gradient and against temperature, and look for where they disagree. One flatlines without a gradient; the other collapses when its enzymes do.',
    zh: '把两者分别对梯度和温度作图，看它们在哪里出现分歧。一个没有梯度就归零，另一个在酶变性时崩溃。',
  },

  objectives: [
    {
      en: 'Describe diffusion as net movement down a concentration gradient.',
      zh: '把扩散描述为沿浓度梯度的净移动。',
    },
    {
      en: 'State that the energy for diffusion comes from the random motion of particles.',
      zh: '说明扩散的能量来自粒子的随机运动。',
    },
    {
      en: 'State that some substances cross the cell membrane by diffusion.',
      zh: '说明某些物质通过扩散穿过细胞膜。',
    },
    {
      en: 'Describe the importance of the diffusion of gases and solutes in organisms.',
      zh: '描述气体与溶质的扩散对生物的重要性。',
    },
    {
      en: 'Investigate the factors that influence the rate of diffusion.',
      zh: '探究影响扩散速率的因素。',
    },
    {
      en: 'Describe active transport as movement against a gradient, using energy.',
      zh: '把主动运输描述为消耗能量、逆浓度梯度的移动。',
    },
    {
      en: 'Explain the importance of active transport, including ion uptake by root hairs. (Extended)',
      zh: '解释主动运输的重要性，包括根毛吸收离子。（Extended）',
    },
    {
      en: 'State that protein carriers move molecules across the membrane. (Extended)',
      zh: '说明载体蛋白把分子运过细胞膜。（Extended）',
    },
  ],

  glossary: [
    {
      en: 'diffusion',
      zh: '扩散',
      definition: {
        en: 'Net movement of particles from a higher to a lower concentration, down a gradient, using only the random motion they already have.',
        zh: '粒子从高浓度向低浓度的净移动，沿梯度进行，只依靠其本身已有的随机运动。',
      },
      syllabus: ['0610.3.1.1'],
    },
    {
      en: 'concentration gradient',
      zh: '浓度梯度',
      definition: {
        en: 'The difference in concentration between two regions. Without one there is no net diffusion at all.',
        zh: '两个区域之间的浓度差。没有浓度差就完全没有净扩散。',
      },
      syllabus: ['0610.3.1.1'],
    },
    {
      en: 'net movement',
      zh: '净移动',
      definition: {
        en: 'The difference between what crosses one way and what crosses the other. Particles keep moving at equilibrium; they just balance out.',
        zh: '两个方向穿过量之差。达到平衡时粒子仍在运动，只是彼此抵消。',
      },
      syllabus: ['0610.3.1.2'],
    },
    {
      en: 'active transport',
      zh: '主动运输',
      definition: {
        en: 'Movement of particles through carrier proteins against a concentration gradient, using energy from respiration.',
        zh: '通过载体蛋白逆浓度梯度运输粒子，能量来自呼吸作用。',
      },
      syllabus: ['0610.3.3.1'],
    },
    {
      en: 'carrier protein',
      zh: '载体蛋白',
      definition: {
        en: 'A protein in the membrane that binds a specific molecule, changes shape and releases it on the other side.',
        zh: '膜上的一种蛋白，它结合特定分子、改变构象，并在另一侧释放。',
      },
      syllabus: ['0610.3.3.3'],
    },
  ],

  equations: [
    {
      latex: '\\text{rate of diffusion} \\propto \\text{gradient} \\times \\text{surface area}',
      meaning: {
        en: 'And inversely proportional to the distance across. Zero gradient means zero net movement, however warm it is.',
        zh: '并与穿越距离成反比。梯度为零时净移动即为零，无论温度多高。',
      },
      substitute: (r) =>
        `\\text{diffusion } ${r['diffusionRate'] ?? 0} \\quad \\text{active transport } ${r['activeTransportRate'] ?? 0} \\quad \\text{gradient } ${Math.round(r['gradient'] ?? 0)}`,
    },
    {
      latex: '\\text{active transport} \\ne f(\\text{gradient})',
      meaning: {
        en: 'A flat line across the whole graph, including where the gradient opposes it. That independence is what makes it useful.',
        zh: '整张图上都是一条水平线，包括梯度不利的一侧。这种"不受梯度影响"正是它的价值所在。',
      },
    },
    {
      latex: '\\text{active transport} = f(\\text{respiration}) = f(\\text{enzymes})',
      meaning: {
        en: 'Which is why its temperature curve is the enzyme curve, and why cyanide or lack of oxygen stops it dead.',
        zh: '所以它的温度曲线就是酶的曲线，也因此氰化物或缺氧会使它完全停止。',
      },
    },
  ],

  sim: {
    primitive: 'plot2d',
    kernel: '3-1-transport',
    hint: {
      en: 'Take the gradient negative and watch diffusion reverse while active transport carries on. Then push the temperature past 40 °C.',
      zh: '把梯度调为负值，看扩散反向而主动运输照常进行。然后把温度升过 40 °C。',
    },
    params: [
      {
        key: 'gradient',
        label: { en: 'Concentration gradient', zh: '浓度梯度' },
        unit: '',
        min: -100,
        max: 100,
        step: 10,
        default: 60,
      },
      {
        key: 'temperature',
        label: { en: 'Temperature', zh: '温度' },
        unit: '°C',
        min: 0,
        max: 60,
        step: 1,
        default: 37,
      },
      {
        key: 'surfaceArea',
        label: { en: 'Surface area', zh: '表面积' },
        unit: '× one cell',
        min: 1,
        max: 10,
        step: 1,
        default: 1,
      },
    ],
    readouts: [
      {
        key: 'diffusionRate',
        label: { en: 'Diffusion rate', zh: '扩散速率' },
        unit: '',
        sigFigs: 3,
        exact: true,
      },
      {
        key: 'activeTransportRate',
        label: { en: 'Active transport rate', zh: '主动运输速率' },
        unit: '',
        sigFigs: 3,
        exact: true,
      },
      {
        key: 'gradient',
        label: { en: 'Gradient (− is uphill)', zh: '梯度（负为逆浓度）' },
        unit: '',
        sigFigs: 3,
        exact: true,
      },
      {
        key: 'surfaceArea',
        label: { en: 'Surface area', zh: '表面积' },
        unit: '×',
        sigFigs: 2,
        exact: true,
      },
    ],
    presets: [
      { label: { en: 'A steep gradient', zh: '陡峭的梯度' }, params: { gradient: 100, temperature: 37, surfaceArea: 1 } },
      { label: { en: 'No gradient: diffusion stops', zh: '没有梯度：扩散停止' }, params: { gradient: 0, temperature: 37, surfaceArea: 1 } },
      { label: { en: 'Uphill: only active transport', zh: '逆浓度：只有主动运输' }, params: { gradient: -80, temperature: 37, surfaceArea: 1 } },
      { label: { en: 'Heated to 50 °C', zh: '加热到 50 °C' }, params: { gradient: 60, temperature: 50, surfaceArea: 1 } },
      { label: { en: 'Six times the surface area', zh: '表面积的六倍' }, params: { gradient: 60, temperature: 37, surfaceArea: 6 } },
    ],
  },

  narration,

  checkpoints: [
    {
      id: '0610-3-1-cp1',
      syllabus: ['0610.3.1.1', '0610.3.1.2'],
      tier: 'core',
      commandWord: 'Explain',
      marks: 2,
      stem: 'A drop of dye is added to still water and eventually the colour is even throughout. Explain why the colour stops changing, and state whether the dye particles have stopped moving.',
      markScheme: [
        {
          text: 'The concentration is now the same everywhere, so there is no concentration gradient and no net movement',
          marks: 1,
        },
        {
          text: 'The particles are still moving randomly — as many move one way as the other',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Diffusion is *net* movement. Saying the particles have stopped is a common and costly error — equilibrium is a balance, not a halt.',
        zh: '扩散是*净*移动。写粒子停止运动是常见且代价不小的错误——平衡是两个方向相抵，而不是停止。',
      },
    },
    {
      id: '0610-3-1-cp2',
      syllabus: ['0610.3.3.1', '0610.3.3.2'],
      tier: 'extended',
      commandWord: 'Explain',
      marks: 3,
      stem: 'Root hair cells take up mineral ions from soil in which the ion concentration is lower than in the cytoplasm. Explain how, and why diffusion cannot account for it.',
      markScheme: [
        {
          text: 'The ions are taken in by active transport, against the concentration gradient',
          marks: 1,
        },
        {
          text: 'using energy from respiration and carrier proteins in the cell membrane',
          marks: 1,
        },
        {
          text: 'Diffusion only moves particles down a gradient, so it would move ions out of the cell, not in',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'The third mark asks you to rule diffusion out, not just to name the alternative. Saying which way diffusion *would* go is what earns it.',
        zh: '第三分要求你排除扩散，而不只是说出替代机制。写明扩散*会*朝哪个方向进行，才能拿到这一分。',
      },
    },
    {
      id: '0610-3-1-cp3',
      syllabus: ['0610.3.1.5'],
      tier: 'core',
      commandWord: 'Predict',
      marks: 3,
      stem: 'Cubes of agar containing indicator are placed in acid. State three changes that would each make the acid diffuse into a cube faster, and give a reason for one of them.',
      markScheme: [
        { text: 'A higher acid concentration, giving a steeper concentration gradient', marks: 1 },
        { text: 'A higher temperature', marks: 1 },
        {
          text: 'Smaller cubes, giving a greater surface area to volume ratio; or any one reason correctly explained',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'For the cube size, it is the surface area *to volume ratio* that matters, not surface area alone — smaller cubes have less total surface but far more of it per unit of inside.',
        zh: '关于立方体大小，起作用的是表面积*与体积之比*，而不是表面积本身——小立方体总表面积更小，但单位体积拥有的表面积大得多。',
      },
    },
    {
      id: '0610-3-1-cp4',
      syllabus: ['0610.3.3.2'],
      tier: 'extended',
      commandWord: 'Suggest',
      marks: 2,
      stem: 'Plant roots take up far fewer mineral ions when the soil is waterlogged. Suggest why.',
      markScheme: [
        {
          text: 'Waterlogged soil contains little oxygen, so the root cells cannot respire aerobically',
          marks: 1,
        },
        {
          text: 'Less energy is released, so less active transport of mineral ions can take place',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'The chain is oxygen → respiration → energy → active transport. An answer that jumps from "no oxygen" straight to "no ions" has left out the step being tested.',
        zh: '因果链是：氧气 → 呼吸作用 → 能量 → 主动运输。从"没有氧气"直接跳到"没有离子"，恰恰漏掉了要考的那一步。',
      },
    },
    {
      id: '0610-3-1-cp5',
      syllabus: ['0610.3.1.4'],
      tier: 'core',
      commandWord: 'Describe',
      marks: 2,
      stem: 'Describe how oxygen reaches a muscle cell from the air in an alveolus, naming the process involved.',
      markScheme: [
        {
          text: 'Oxygen diffuses from the alveolus into the blood, down a concentration gradient',
          marks: 1,
        },
        {
          text: 'and diffuses from the blood into the muscle cell, where respiration keeps its concentration low',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Respiration inside the cell is what maintains the gradient — it keeps using the oxygen up. Without that, diffusion would stop as soon as the concentrations equalised.',
        zh: '细胞内的呼吸作用维持着这个梯度——它不断消耗氧气。否则浓度一相等，扩散就会停止。',
      },
    },
  ],
}

export default lesson
