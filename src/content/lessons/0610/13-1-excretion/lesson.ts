import type { Lesson } from '@/content/types'
import narration from './narration'

const lesson: Lesson = {
  slug: '13-1-excretion',
  subject: '0610',
  syllabus: [
    '0610.13.1.1',
    '0610.13.1.2',
    '0610.13.1.3',
    '0610.13.1.4',
    '0610.13.1.5',
    '0610.13.1.6',
    '0610.13.1.7',
    '0610.13.1.8',
    '0610.13.1.9',
  ],
  tier: 'extended',
  estimatedMinutes: 50,

  title: { en: 'Excretion', zh: '排泄' },
  summary: {
    en: 'A kidney is not a filter. It forces almost everything out of the blood and then takes most of it back, deciding substance by substance what to keep.',
    zh: '肾不是滤器。它先把血液中几乎所有的小分子挤出去，再把大部分收回来，逐一决定留下什么。',
  },

  objectives: [
    {
      en: 'State that carbon dioxide is excreted through the lungs, and that the kidneys excrete urea, excess water and ions.',
      zh: '说明二氧化碳经肺排出，肾排出尿素及多余的水和离子。',
    },
    {
      en: 'Identify the kidneys, ureters, bladder and urethra, and the cortex and medulla of the kidney. (Extended)',
      zh: '识别肾、输尿管、膀胱与尿道，以及肾的皮质与髓质。（Extended）',
    },
    {
      en: 'Outline the structure and function of a nephron and its blood vessels. (Extended)',
      zh: '概述肾单位及其血管的结构与功能。（Extended）',
    },
    {
      en: 'Describe the role of the liver in the assimilation of amino acids, and deamination. (Extended)',
      zh: '描述肝脏在氨基酸同化中的作用，以及脱氨基。（Extended）',
    },
    {
      en: 'Explain the importance of excretion in terms of the toxicity of urea. (Extended)',
      zh: '用尿素的毒性解释排泄的重要性。（Extended）',
    },
  ],

  glossary: [
    {
      en: 'excretion',
      zh: '排泄',
      definition: {
        en: 'Removing the waste products of metabolism, toxic materials and substances in excess of requirements. Not the same as egestion.',
        zh: '排出代谢废物、有毒物质以及超出需要的物质。与排遗不同。',
      },
      syllabus: ['0610.13.1.1'],
    },
    {
      en: 'deamination',
      zh: '脱氨基',
      definition: {
        en: 'Removing the nitrogen-containing part of an amino acid in the liver. There is no store for excess amino acids, so they must be broken down.',
        zh: '在肝脏中去除氨基酸的含氮部分。多余的氨基酸无法贮存，因此必须被分解。',
      },
      syllabus: ['0610.13.1.8'],
    },
    {
      en: 'ultrafiltration',
      zh: '超滤',
      definition: {
        en: 'Filtration at the glomerulus under high pressure, selecting by molecule size alone. Protein molecules are too large to pass.',
        zh: '在肾小球处高压下进行的滤过，只按分子大小筛选。蛋白质分子太大而无法通过。',
      },
      syllabus: ['0610.13.1.5'],
    },
    {
      en: 'selective reabsorption',
      zh: '选择性重吸收',
      definition: {
        en: 'Taking useful substances back from the filtrate into the blood along the tubule — all of the glucose, most of the water, almost none of the urea.',
        zh: '沿肾小管把有用物质从滤液中收回血液——葡萄糖全部收回，水大部分收回，尿素几乎不收回。',
      },
      syllabus: ['0610.13.1.5'],
    },
    {
      en: 'nephron',
      zh: '肾单位',
      definition: {
        en: 'The working unit of a kidney: a glomerulus in a capsule, then a tubule, with its own blood supply running alongside.',
        zh: '肾的功能单位：包在肾小囊中的肾小球，随后是肾小管，并有自己的血管全程伴行。',
      },
      syllabus: ['0610.13.1.5'],
    },
  ],

  equations: [],

  sim: {
    primitive: 'plot2d',
    kernel: '13-1-excretion',
    hint: {
      en: 'Follow the glucose line to the end, then the urea line. Then damage the glomerulus and see which line changes.',
      zh: '先把葡萄糖那条线看到末端，再看尿素那条。然后损伤肾小球，看哪条线发生了变化。',
    },
    params: [
      {
        key: 'water',
        label: { en: 'Water drunk', zh: '饮水量' },
        unit: '%',
        min: 0,
        max: 200,
        step: 10,
        default: 100,
      },
      {
        key: 'protein',
        label: { en: 'Protein in the diet', zh: '膳食中的蛋白质' },
        unit: '%',
        min: 0,
        max: 200,
        step: 10,
        default: 100,
      },
      {
        key: 'damage',
        label: { en: 'Damage to the glomerulus', zh: '肾小球的损伤程度' },
        unit: '%',
        min: 0,
        max: 100,
        step: 5,
        default: 0,
      },
    ],
    readouts: [
      {
        key: 'urineWater',
        label: { en: 'Water in the urine', zh: '尿中的水' },
        unit: '',
        sigFigs: 3,
        exact: true,
      },
      {
        key: 'urineUrea',
        label: { en: 'Urea in the urine', zh: '尿中的尿素' },
        unit: '',
        sigFigs: 3,
        exact: true,
      },
      {
        key: 'urineGlucose',
        label: { en: 'Glucose in the urine', zh: '尿中的葡萄糖' },
        unit: '',
        sigFigs: 3,
        exact: true,
      },
      {
        key: 'urineProtein',
        label: { en: 'Protein in the urine', zh: '尿中的蛋白质' },
        unit: '',
        sigFigs: 3,
        exact: true,
      },
    ],
    presets: [
      {
        label: { en: 'A normal day', zh: '普通的一天' },
        params: { water: 100, protein: 100, damage: 0 },
      },
      {
        label: { en: 'Drank a great deal', zh: '大量饮水' },
        params: { water: 190, protein: 100, damage: 0 },
      },
      {
        label: { en: 'Drank almost nothing', zh: '几乎没喝水' },
        params: { water: 15, protein: 100, damage: 0 },
      },
      {
        label: { en: 'A high-protein diet', zh: '高蛋白饮食' },
        params: { water: 100, protein: 190, damage: 0 },
      },
      {
        label: { en: 'A damaged glomerulus', zh: '肾小球受损' },
        params: { water: 100, protein: 100, damage: 70 },
      },
    ],
  },

  narration,

  checkpoints: [
    {
      id: '0610-13-1-cp1',
      syllabus: ['0610.13.1.5'],
      tier: 'extended',
      commandWord: 'Explain',
      marks: 4,
      stem: 'Glucose is present in the filtrate in the capsule but absent from the urine of a healthy person. Explain why.',
      markScheme: [
        {
          text: 'Glucose molecules are small enough to pass through the capillary wall during ultrafiltration, so all of it enters the filtrate',
          marks: 1,
        },
        {
          text: 'Glucose is a valuable respiratory substrate and must not be lost',
          marks: 1,
        },
        {
          text: 'It is reabsorbed from the tubule back into the blood by selective reabsorption',
          marks: 1,
        },
        {
          text: 'using active transport, against a concentration gradient and requiring energy from respiration',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Ultrafiltration cannot exclude glucose — it selects by size alone, and glucose is small. Everything useful is filtered out first and then reclaimed.',
        zh: '超滤无法把葡萄糖排除在外——它只按分子大小筛选，而葡萄糖很小。所有有用的物质都是先被滤出，再被收回。',
      },
    },
    {
      id: '0610-13-1-cp2',
      syllabus: ['0610.13.1.5'],
      tier: 'extended',
      commandWord: 'Deduce',
      marks: 3,
      stem: 'A urine sample from a patient is found to contain protein. Deduce what this indicates about the patient’s kidneys, and explain your reasoning.',
      markScheme: [
        {
          text: 'The glomerulus (or the capillary wall) is damaged',
          marks: 1,
        },
        {
          text: 'because protein molecules are normally too large to pass through during ultrafiltration, so they never enter the filtrate at all',
          marks: 1,
        },
        {
          text: 'The fault therefore cannot be one of reabsorption — there is normally no protein in the filtrate to reabsorb',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Eating more protein raises urea, not urinary protein — the two are unrelated, and confusing them is the commonest wrong answer here.',
        zh: '多吃蛋白质升高的是尿素，而不是尿蛋白——两者无关，把它们混淆是这道题最常见的错误答案。',
      },
    },
    {
      id: '0610-13-1-cp3',
      syllabus: ['0610.13.1.6', '0610.13.1.7', '0610.13.1.8'],
      tier: 'extended',
      commandWord: 'Describe',
      marks: 4,
      stem: 'Describe what happens to amino acids that are absorbed in excess of the body’s requirements.',
      markScheme: [
        { text: 'Excess amino acids cannot be stored in the body', marks: 1 },
        { text: 'They are carried to the liver and deaminated', marks: 1 },
        {
          text: 'The nitrogen-containing part is removed and converted into urea',
          marks: 1,
        },
        {
          text: 'The remainder is used in respiration or converted to glycogen or fat for storage; the urea is carried in the blood to the kidneys and excreted',
          marks: 1,
        },
      ],
      examinerNote: {
        en: '"Cannot be stored" is the reason the whole process exists, and it is worth stating first. And urea is made in the liver — the kidney only removes it.',
        zh: '"无法贮存"是整个过程存在的原因，值得先写出来。另外，尿素在肝脏产生——肾只负责把它排出。',
      },
    },
    {
      id: '0610-13-1-cp4',
      syllabus: ['0610.13.1.9'],
      tier: 'extended',
      commandWord: 'Explain',
      marks: 2,
      stem: 'Explain why a person whose kidneys have failed will become seriously ill within a few days without treatment.',
      markScheme: [
        {
          text: 'Urea is no longer excreted, so it accumulates in the blood',
          marks: 1,
        },
        {
          text: 'Urea is toxic, and excess water and ions also accumulate, upsetting the water potential of the blood and tissues',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Say that urea is toxic. "Waste builds up" does not say why that matters, and the mark is for the toxicity.',
        zh: '要写明尿素有毒。"废物堆积"没有说清为什么这有影响，得分点正是"毒性"。',
      },
    },
    {
      id: '0610-13-1-cp5',
      syllabus: ['0610.13.1.2'],
      tier: 'core',
      commandWord: 'Predict',
      marks: 3,
      stem: 'A person drinks two litres of water in a short time. Predict what happens to the volume and concentration of their urine over the next few hours, and explain why.',
      markScheme: [
        { text: 'The volume of urine increases and it becomes more dilute', marks: 1 },
        {
          text: 'because the water potential of the blood has risen above normal',
          marks: 1,
        },
        {
          text: 'so less water is reabsorbed from the filtrate along the tubule and more is lost in the urine',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Reabsorption is what changes, not filtration — the same volume is filtered either way. And some water always leaves, because the urea has to go with it.',
        zh: '改变的是重吸收，而不是滤过——两种情况下滤出的量是一样的。而且总会有一部分水离开，因为尿素得随它排出。',
      },
    },
  ],

  // 3D kidneys — the chapter's primary organ. The textbook figure
  // flattens them into two beans; the 3D model shows the cortex and
  // medulla, and where the renal artery and ureter enter.
  extras: [
    {
      type: 'organ-anatomy',
      id: 'kidneys-3d',
      title: { en: 'The kidneys, in 3D', zh: '肾脏 3D 解剖' },
      hint: {
        en: 'Drag to rotate. Each kidney has an outer cortex where blood is first filtered, an inner medulla where urine is concentrated, and a ureter that carries the urine down to the bladder.',
        zh: '拖动旋转。每侧肾脏外层是皮质（最初滤过血液），内层是髓质（浓缩尿液），下方有输尿管把尿液送到膀胱。',
      },
      intro: {
        en: 'The kidneys are paired organs that filter blood and form urine. About 20% of the heart\'s output goes through them — that much blood needs to be cleaned.',
        zh: '肾脏是一对成对器官，负责过滤血液并形成尿液。心输出量的约 20% 经过它们——确实需要清理这么多血。',
      },
      organ: 'kidneys',
      system: { en: 'Urinary system', zh: '泌尿系统' },
      initialPart: 'cortex',
      parts: [
        {
          id: 'cortex',
          name: { en: 'renal cortex', zh: '肾皮质' },
          description: {
            en: 'The outer layer where blood is first filtered. Grainy and pale; you can see it as a thin band around the outside of the kidney in cross-section.',
            zh: '肾脏的外层，血液最初被过滤的地方。颗粒状、颜色淡；切片中可见它作为薄薄一层包在肾外。',
          },
          position3d: [-0.9, 0.55, 0.7],
        },
        {
          id: 'medulla',
          name: { en: 'renal medulla', zh: '肾髓质' },
          description: {
            en: 'The inner part, organised into cone-shaped pyramids. The tubules here concentrate urine by reabsorbing water.',
            zh: '内部，由锥形的肾锥体组成。这里的肾小管通过重吸收水分把尿液浓缩。',
          },
          position3d: [0.85, 0.2, 0.7],
        },
        {
          id: 'renal-artery',
          name: { en: 'renal artery', zh: '肾动脉' },
          description: {
            en: 'Branches off the abdominal aorta. Carries a fifth of the heart\'s output into the kidney for filtering.',
            zh: '从腹主动脉分出。把心输出量的五分之一送入肾脏进行过滤。',
          },
          position3d: [0.5, -0.05, 0.85],
        },
        {
          id: 'renal-vein',
          name: { en: 'renal vein', zh: '肾静脉' },
          description: {
            en: 'Carries the cleaned blood away from the kidney, back to the inferior vena cava.',
            zh: '把已清洁的血液从肾脏送走，回到下腔静脉。',
          },
          position3d: [-0.5, -0.05, 0.85],
        },
        {
          id: 'ureter',
          name: { en: 'ureter', zh: '输尿管' },
          description: {
            en: 'A muscular tube about 25 cm long that carries urine from the kidney to the bladder. Waves of muscle contraction push the urine down.',
            zh: '长约 25 厘米的肌肉管道，把尿液从肾运到膀胱。肌肉蠕动波把尿液向下推。',
          },
          position3d: [0.4, -1.1, 0.5],
        },
      ],
    },
  ],
}

export default lesson
