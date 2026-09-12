import type { Lesson } from '@/content/types'
import { formatSigFigs } from '@/lib/units'
import narration from './narration'

const lesson: Lesson = {
  slug: '4-2-1-electric-charge',
  subject: '0625',
  syllabus: [
    '0625.4.2.1.1',
    '0625.4.2.1.2',
    '0625.4.2.1.3',
    '0625.4.2.1.4',
    '0625.4.2.1.5',
    '0625.4.2.1.6',
    '0625.4.2.1.7',
    '0625.4.2.1.8',
    '0625.4.2.1.9',
    '0625.4.2.1.10',
  ],
  tier: 'extended',
  estimatedMinutes: 45,

  title: { en: 'Electric charge and electric fields', zh: '电荷与电场' },
  summary: {
    en: 'Charging is electron transfer, nothing else. Then trace the field around a charge, a sphere, and the uniform field between parallel plates.',
    zh: '起电就是电子转移，仅此而已。再描绘点电荷、带电球以及平行板之间匀强电场的分布。',
  },

  objectives: [
    { en: 'State that there are positive and negative charges.', zh: '说明电荷有正负两种。' },
    { en: 'State that like charges repel and unlike charges attract.', zh: '说明同种电荷相斥、异种相吸。' },
    {
      en: 'Describe experiments producing and detecting electrostatic charge.',
      zh: '描述产生与检验静电荷的实验。',
    },
    {
      en: 'Explain charging by friction as a transfer of electrons only.',
      zh: '把摩擦起电解释为只转移电子。',
    },
    {
      en: 'Describe an experiment distinguishing conductors from insulators.',
      zh: '描述区分导体与绝缘体的实验。',
    },
    {
      en: 'Use a simple electron model to explain conductors and insulators.',
      zh: '用简单电子模型解释导体与绝缘体。',
    },
    { en: 'State that charge is measured in coulombs. (Extended)', zh: '说明电荷单位是库仑。（Extended）' },
    {
      en: 'Describe an electric field as a region where a charge experiences a force. (Extended)',
      zh: '把电场描述为电荷受力的区域。（Extended）',
    },
    {
      en: 'State that field direction is the force on a positive charge. (Extended)',
      zh: '说明电场方向是正电荷受力的方向。（Extended）',
    },
    {
      en: 'Describe the field patterns around a point charge, a charged sphere and between parallel plates. (Extended)',
      zh: '描述点电荷、带电球以及平行板之间的电场分布。（Extended）',
    },
  ],

  glossary: [
    {
      en: 'electrostatic charge',
      zh: '静电荷',
      definition: {
        en: 'Charge that stays on an insulator rather than flowing away. Produced by transferring electrons.',
        zh: '停留在绝缘体上而不流走的电荷，由电子转移产生。',
      },
      syllabus: ['0625.4.2.1.3'],
    },
    {
      en: 'electric field',
      zh: '电场',
      definition: {
        en: 'A region in which an electric charge experiences a force.',
        zh: '电荷在其中受到力的区域。',
      },
      syllabus: ['0625.4.2.1.8'],
    },
    {
      en: 'uniform field',
      zh: '匀强电场',
      definition: {
        en: 'A field of the same strength and direction everywhere — drawn as straight, parallel, evenly spaced lines. Found between parallel plates.',
        zh: '各处强度与方向都相同的电场，画成直的、平行的、等间距的线。存在于平行板之间。',
      },
      syllabus: ['0625.4.2.1.10'],
    },
    {
      en: 'coulomb',
      zh: '库仑',
      definition: { en: 'The unit of electric charge, symbol C.', zh: '电荷的单位，符号 C。' },
      syllabus: ['0625.4.2.1.7'],
    },
    {
      en: 'conductor',
      zh: '导体',
      definition: {
        en: 'A material with free electrons that can move through it, so charge flows.',
        zh: '内部有可自由移动电子的材料，电荷能在其中流动。',
      },
      syllabus: ['0625.4.2.1.6'],
    },
    {
      en: 'insulator',
      zh: '绝缘体',
      definition: {
        en: 'A material with no free electrons, so charge stays where it is put.',
        zh: '没有自由电子的材料，电荷停留在原处。',
      },
      syllabus: ['0625.4.2.1.6'],
    },
  ],

  equations: [
    {
      latex: '\\text{field direction} = \\text{force on a } +\\text{ charge}',
      meaning: {
        en: 'Field lines point away from positive charge and towards negative charge. This is a definition, not a formula.',
        zh: '电场线从正电荷指出、指向负电荷。这是定义，不是公式。',
      },
      substitute: (r) =>
        r['isUniform'] === 1
          ? `\\text{uniform: strength is the same across the gap}`
          : `\\text{near} : \\text{far} = ${formatSigFigs(r['ratio'] ?? 0, 3)} : 1`,
    },
  ],

  sim: {
    primitive: 'field2d',
    variant: 'electric',
    kernel: '4-2-1-electric-charge',
    hint: {
      en: 'Try parallel plates — the lines go straight and evenly spaced, except at the edges.',
      zh: '试试平行板——除边缘外，电场线笔直且等间距。',
    },
    params: [
      {
        key: 'setup',
        label: { en: 'Arrangement', zh: '装置' },
        unit: '',
        min: 0,
        max: 3,
        step: 1,
        default: 0,
        options: [
          { value: 0, label: { en: 'Point charge', zh: '点电荷' } },
          { value: 1, label: { en: 'Charged sphere', zh: '带电球' } },
          { value: 2, label: { en: 'Unlike pair', zh: '异种电荷' } },
          { value: 3, label: { en: 'Parallel plates', zh: '平行板' } },
        ],
      },
      {
        key: 'lineCount',
        label: { en: 'Number of field lines', zh: '电场线数量' },
        unit: '',
        min: 4,
        max: 16,
        step: 1,
        default: 10,
      },
      {
        key: 'charge',
        label: { en: 'Charge', zh: '电荷量' },
        unit: '× reference',
        symbol: 'Q',
        min: 0.5,
        max: 2,
        step: 0.1,
        default: 1,
      },
    ],
    readouts: [
      {
        key: 'strengthNear',
        label: { en: 'Field at the centre', zh: '中心处场强' },
        unit: '(rel.)',
        sigFigs: 3,
      },
      {
        key: 'strengthFar',
        label: { en: 'Field further out', zh: '外侧场强' },
        unit: '(rel.)',
        sigFigs: 3,
      },
      { key: 'ratio', label: { en: 'Centre ÷ outer', zh: '中心 ÷ 外侧' }, unit: '×', sigFigs: 3 },
    ],
    presets: [
      { label: { en: 'Point charge', zh: '点电荷' }, params: { setup: 0, lineCount: 10, charge: 1 } },
      { label: { en: 'Charged sphere', zh: '带电球' }, params: { setup: 1, lineCount: 10, charge: 1 } },
      { label: { en: 'Unlike charges', zh: '异种电荷' }, params: { setup: 2, lineCount: 10, charge: 1 } },
      { label: { en: 'Parallel plates', zh: '平行板' }, params: { setup: 3, lineCount: 10, charge: 1 } },
    ],
  },

  narration,

  checkpoints: [
    {
      id: '4-2-1-cp1',
      syllabus: ['0625.4.2.1.4'],
      tier: 'core',
      commandWord: 'Explain',
      marks: 3,
      stem: 'A polythene rod becomes negatively charged when it is rubbed with a dry cloth. Explain how this happens.',
      markScheme: [
        { text: 'Electrons are transferred from the cloth to the rod', marks: 1 },
        { text: 'The rod gains electrons, so it becomes negatively charged', marks: 1 },
        {
          text: 'The cloth loses electrons, so it is left positively charged',
          marks: 1,
          alternatives: ['equal and opposite charge on the cloth'],
        },
      ],
      examinerNote: {
        en: 'Only electrons move. Writing that "positive charge moves to the cloth" is wrong — protons are bound in nuclei and never transfer by rubbing.',
        zh: '只有电子会移动。写"正电荷转移到布上"是错的——质子被束缚在原子核中，摩擦不会使其转移。',
      },
    },
    {
      id: '4-2-1-cp2',
      syllabus: ['0625.4.2.1.9'],
      tier: 'extended',
      commandWord: 'State',
      marks: 1,
      stem: 'State the direction of the electric field at a point.',
      options: [
        'The direction of the force on a positive charge placed at that point',
        'The direction of the force on a negative charge placed at that point',
        'The direction from negative to positive',
        'The direction in which the field is strongest',
      ],
      answerIndex: 0,
      markScheme: [{ text: 'The direction of the force on a positive charge at that point', marks: 1 }],
      examinerNote: {
        en: 'The convention uses a positive test charge, so lines leave positive charges and enter negative ones. A negative charge feels a force the opposite way.',
        zh: '约定用正试探电荷，所以电场线从正电荷发出、进入负电荷。负电荷受力方向相反。',
      },
    },
    {
      id: '4-2-1-cp3',
      syllabus: ['0625.4.2.1.10'],
      tier: 'extended',
      commandWord: 'Describe',
      marks: 3,
      stem: 'Describe the electric field between two oppositely charged parallel plates. Ignore end effects.',
      markScheme: [
        { text: 'The field lines are straight and parallel', marks: 1 },
        { text: 'They are evenly spaced, showing a uniform field of constant strength', marks: 1 },
        {
          text: 'They run from the positive plate to the negative plate',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'All three features are needed: straight, evenly spaced, and directed. "Uniform" on its own does not describe the pattern.',
        zh: '三个特征都要写：直、等间距、有方向。只写"匀强"没有描述出图形。',
      },
    },
    {
      id: '4-2-1-cp4',
      syllabus: ['0625.4.2.1.6'],
      tier: 'core',
      commandWord: 'Explain',
      marks: 2,
      stem: 'Explain, in terms of electrons, why copper is a good electrical conductor but polythene is not.',
      markScheme: [
        { text: 'Copper has free (delocalised) electrons that can move through it', marks: 1 },
        {
          text: 'Polythene has no free electrons, so charge cannot flow through it',
          marks: 1,
          alternatives: ['its electrons are bound to atoms'],
        },
      ],
      examinerNote: {
        en: 'The word "free" is doing the work. Both materials contain electrons — the difference is whether those electrons can move.',
        zh: '关键在"自由"二字。两种材料都含有电子，区别在于电子能否移动。',
      },
    },
  ],
}

export default lesson
