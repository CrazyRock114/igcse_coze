import type { Lesson } from '@/content/types'
import narration from './narration'

const lesson: Lesson = {
  slug: '11-1-gas-exchange',
  subject: '0610',
  syllabus: [
    '0610.11.1.1',
    '0610.11.1.2',
    '0610.11.1.3',
    '0610.11.1.4',
    '0610.11.1.5',
    '0610.11.1.6',
    '0610.11.1.7',
    '0610.11.1.8',
    '0610.11.1.9',
    '0610.11.1.10',
    '0610.11.1.11',
    '0610.12.1.1',
    '0610.12.1.2',
    '0610.12.2.1',
    '0610.12.2.2',
    '0610.12.2.3',
    '0610.12.3.1',
    '0610.12.3.2',
    '0610.12.3.3',
    '0610.12.3.4',
    '0610.12.3.5',
    '0610.12.3.6',
    '0610.12.3.7',
  ],
  tier: 'extended',
  estimatedMinutes: 65,

  title: { en: 'Gas exchange and respiration', zh: '气体交换与呼吸作用' },
  summary: {
    en: 'Why do you keep panting after you have stopped running? Because the running is over and the debt is not.',
    zh: '为什么停下来之后还在喘？因为跑步结束了，债还没还完。',
  },

  objectives: [
    {
      en: 'Describe the features of gas exchange surfaces and identify the parts of the breathing system.',
      zh: '描述气体交换表面的特征，并识别呼吸系统的组成部分。',
    },
    {
      en: 'Describe and explain the differences in composition between inspired and expired air. (Extended)',
      zh: '描述并解释吸入与呼出气体成分的差异。（Extended）',
    },
    {
      en: 'Explain the roles of the ribs, intercostal muscles and diaphragm in breathing. (Extended)',
      zh: '解释肋骨、肋间肌与膈在呼吸中的作用。（Extended）',
    },
    {
      en: 'Explain the roles of goblet cells, mucus and ciliated cells in protecting the airways. (Extended)',
      zh: '解释杯状细胞、黏液与纤毛细胞对气道的保护作用。（Extended）',
    },
    {
      en: 'State the uses of the energy released by respiration, and the equations for aerobic respiration.',
      zh: '说出呼吸作用释放的能量的用途，以及有氧呼吸的方程式。',
    },
    {
      en: 'State the word equations for anaerobic respiration in muscles and in yeast.',
      zh: '写出肌肉与酵母中无氧呼吸的文字表达式。',
    },
    {
      en: 'Explain the oxygen debt and how it is removed after exercise. (Extended)',
      zh: '解释氧债，以及运动后如何偿还。（Extended）',
    },
  ],

  glossary: [
    {
      en: 'alveolus',
      zh: '肺泡',
      definition: {
        en: 'A tiny air sac in the lung, one cell thick and wrapped in capillaries. Hundreds of millions give an enormous surface area.',
        zh: '肺内微小的气囊，壁仅一个细胞厚，外面缠绕着毛细血管。数亿个肺泡提供了极大的表面积。',
      },
      syllabus: ['0610.11.1.1'],
    },
    {
      en: 'respiration',
      zh: '呼吸作用',
      definition: {
        en: 'The release of energy from nutrient molecules in every living cell. Not the same thing as breathing.',
        zh: '在每个活细胞中从营养分子释放能量的过程。它与"呼吸（换气）"不是一回事。',
      },
      syllabus: ['0610.12.1.1'],
    },
    {
      en: 'anaerobic respiration',
      zh: '无氧呼吸',
      definition: {
        en: 'Releasing energy from glucose without oxygen. Far less energy per molecule — about 2 ATP against 32.',
        zh: '在无氧条件下从葡萄糖释放能量。每分子释放的能量少得多——约 2 个 ATP 对 32 个。',
      },
      syllabus: ['0610.12.3.1', '0610.12.3.2'],
    },
    {
      en: 'oxygen debt',
      zh: '氧债',
      definition: {
        en: 'The extra oxygen needed after exercise to break down the lactic acid built up during it.',
        zh: '运动后为分解运动中积累的乳酸所额外需要的氧。',
      },
      syllabus: ['0610.12.3.6', '0610.12.3.7'],
    },
    {
      en: 'goblet cell',
      zh: '杯状细胞',
      definition: {
        en: 'A cell in the airway lining that secretes mucus to trap dust and bacteria.',
        zh: '气道内衬中分泌黏液、粘住灰尘与细菌的细胞。',
      },
      syllabus: ['0610.11.1.11'],
    },
    {
      en: 'aerobic respiration',
      zh: '有氧呼吸',
      definition: {
        en: 'Releasing energy from glucose with oxygen. The full reaction — glucose + oxygen → carbon dioxide + water — releases about 32 ATP per glucose, against 2 from anaerobic respiration.',
        zh: '在有氧条件下从葡萄糖释放能量。完整反应——葡萄糖+氧→二氧化碳+水——每分子葡萄糖释放约 32 个 ATP，而无氧呼吸只产生 2 个。',
      },
      syllabus: ['0610.12.1.1', '0610.12.1.2'],
    },
    {
      en: 'trachea',
      zh: '气管',
      definition: {
        en: 'The main airway running from the larynx down to where it splits into the two bronchi. Rings of cartilage keep it open against the pressure changes of breathing.',
        zh: '从喉部向下到分为两条支气管处的主气道。软骨的环状结构使它在呼吸的压力变化下保持张开。',
      },
      syllabus: ['0610.11.1.2'],
    },
    {
      en: 'bronchus',
      zh: '支气管',
      definition: {
        en: 'One of the two airways that branch from the trachea, one to each lung. Each bronchus then branches into smaller and smaller bronchioles.',
        zh: '从气管分出的两条气道之一，各进入一侧肺。每条支气管再不断分支成越来越小的细支气管。',
      },
      syllabus: ['0610.11.1.3'],
    },
    {
      en: 'bronchiole',
      zh: '细支气管',
      definition: {
        en: 'A small airway that branches off a bronchus, ending in a cluster of alveoli. Its wall is mostly smooth muscle and lacks the cartilage rings of the trachea.',
        zh: '从支气管分出的小气道，末端连接一团肺泡。其管壁主要是平滑肌，没有气管那样的软骨环。',
      },
      syllabus: ['0610.11.1.4'],
    },
    {
      en: 'cilium',
      zh: '纤毛',
      definition: {
        en: 'A tiny hair-like extension on the surface of a ciliated cell. Cilia lining the airways beat in a synchronised wave, sweeping the layer of mucus (and the dust and pathogens trapped in it) up towards the throat to be swallowed.',
        zh: '纤毛细胞表面的微小毛状突起。气道内的纤毛同步摆动，把黏液层（以及被黏液粘住的灰尘和病原体）向上扫向喉咙，然后被吞下。',
      },
      syllabus: ['0610.11.1.10'],
    },
    {
      en: 'mucus',
      zh: '黏液',
      definition: {
        en: 'Sticky secretion produced by goblet cells in the airway lining. It traps dust, soot and pathogens from the incoming air so that they can be swept back out by the cilia.',
        zh: '由气道内衬的杯状细胞分泌的黏性物质。它把吸入空气中的灰尘、煤烟和病原体粘住，再由纤毛扫出去。',
      },
      syllabus: ['0610.11.1.9'],
    },
    {
      en: 'nicotine',
      zh: '烟碱（尼古丁）',
      definition: {
        en: 'The addictive stimulant in cigarette smoke. It makes the smoker feel alert, narrows the small blood vessels, raises blood pressure, and is the reason smokers find it so hard to stop.',
        zh: '香烟烟雾中的成瘾性兴奋剂。它让吸烟者感到警觉，使小血管变窄，升高血压，也是吸烟者戒烟如此困难的原因。',
      },
      syllabus: ['0610.11.2.1'],
    },
    {
      en: 'carbon monoxide',
      zh: '一氧化碳',
      definition: {
        en: 'A poisonous gas in cigarette smoke. It binds to haemoglobin in red blood cells and stops it carrying oxygen, which is especially harmful to a developing baby.',
        zh: '香烟烟雾中的有毒气体。它与红细胞中的血红蛋白结合，使其无法携带氧气，这对发育中的胎儿尤其有害。',
      },
      syllabus: ['0610.11.2.3'],
    },
    {
      en: 'emphysema',
      zh: '肺气肿',
      definition: {
        en: 'A lung disease in which the walls of the alveoli break down, so the air spaces merge into fewer, larger ones with less total surface area. Gas exchange becomes inefficient, and a person with emphysema gets out of breath walking across a room.',
        zh: '一种肺病——肺泡壁破裂，使许多小气腔合并成少数大气腔，总表面积减小。气体交换效率下降，肺气肿患者走几步路就会气喘。',
      },
      syllabus: ['0610.11.2.5'],
    },
    {
      en: 'asthma',
      zh: '哮喘',
      definition: {
        en: 'A condition in which the small airways (bronchioles) narrow suddenly because the smooth muscle around them contracts. The narrowing is usually triggered by something the person is allergic to, by cold air, or by exercise. A reliever inhaler relaxes the muscle and reopens the airway.',
        zh: '一种细支气管因周围平滑肌收缩而突然变窄的病症。变窄通常由过敏原、冷空气或运动诱发。缓解型吸入剂能放松平滑肌，重新打开气道。',
      },
      syllabus: ['0610.11.1.4'],
    },
    // ---- added 8/6 (G8 11-1 review, gas exchange + respiration) ----
    {
      en: 'cartilage',
      zh: '软骨',
      definition: {
        en: 'A tough, flexible connective tissue. C-shaped rings of cartilage hold the trachea open against the pressure changes of breathing; without them the trachea would collapse on inhalation.',
        zh: '一种坚韧而柔韧的结缔组织。气管里 C 形软骨环让它在呼吸压力变化下保持张开——没有它，气管在吸气时就会塌陷。',
      },
      syllabus: ['0610.11.1.2'],
    },
    {
      en: 'smooth muscle',
      zh: '平滑肌',
      definition: {
        en: 'Involuntary muscle lining the walls of hollow structures — blood vessels, gut, and the smaller airways (bronchioles). In the bronchioles it can contract suddenly, narrowing the airway and causing an asthma attack.',
        zh: '衬在中空器官（血管、消化道、细支气管等）壁上的不随意肌。在细支气管里它会突然收缩，让气道变窄、引发哮喘发作。',
      },
      syllabus: ['0610.11.1.4'],
    },
    {
      en: 'adenosine triphosphate (ATP)',
      zh: '三磷酸腺苷（ATP）',
      definition: {
        en: 'The molecule cells use to power almost everything they do. Made by adding a phosphate group to ADP; broken back down to ADP when the energy is used. Aerobic respiration makes about 32 ATP per glucose; anaerobic makes about 2.',
        zh: '细胞用来给几乎所有活动供能的分子。由 ADP 加上一个磷酸基团合成；能量被使用时又分解回 ADP。有氧呼吸每分子葡萄糖约产生 32 个 ATP；无氧呼吸只产生约 2 个。',
      },
      syllabus: ['0610.12.1.2'],
    },
    {
      en: 'adenosine diphosphate (ADP)',
      zh: '二磷酸腺苷（ADP）',
      definition: {
        en: 'What ATP becomes when its energy has been spent. Adding a phosphate group back onto ADP — using energy from respiration — turns it into ATP again.',
        zh: 'ATP 释放能量后变成的分子。在 ADP 上重新加上一个磷酸基团——用呼吸释放的能量——就又变回 ATP。',
      },
      syllabus: ['0610.12.1.2'],
    },
    {
      en: 'lactic acid',
      zh: '乳酸',
      definition: {
        en: 'The product of anaerobic respiration in muscle. Builds up during a hard sprint and is what causes the burning feeling. Later, with oxygen available, the liver converts it back to glucose or to CO₂ and water.',
        zh: '肌肉无氧呼吸的产物。在全力冲刺时堆积，是那种"烧灼感"的来源。稍后，在有氧的情况下，肝脏把它重新转化为葡萄糖，或彻底分解为二氧化碳和水。',
      },
      syllabus: ['0610.12.3.1'],
    },
    {
      en: 'hypercapnia',
      zh: '高碳酸血症',
      definition: {
        en: 'An abnormally high level of carbon dioxide in the blood. Normally a non-issue because CO₂ is extremely soluble in plasma and is exhaled quickly, but if ventilation is impaired (drowning, severe asthma, opioid overdose) it can build up to dangerous levels.',
        zh: '血液中二氧化碳含量异常升高的情况。正常情况下不是问题——CO₂ 在血浆中溶解度极高、被快速呼出——但如果通气受损（溺水、严重哮喘、阿片类过量）就会积到危险水平。',
      },
      syllabus: ['0610.12.1.1'],
    },
    // ---- 2026-08-21 Vocabulary gap-fill (讲义实际术语) ----
    {
      en: 'diaphragm',
      zh: '膈肌',
      definition: {
        en: 'A sheet of muscle below the lungs, dome-shaped at rest. When it contracts it flattens — the volume of the thorax increases and air is drawn in. When it relaxes the dome returns and air is pushed out.',
        zh: '肺下方一片肌肉，静息时呈拱顶形。收缩时变平——胸腔容积增大，气体被吸入。舒张时拱顶复原，气体被推出。',
      },
      syllabus: ['0610.11.1.8'],
    },
    {
      en: 'intercostal muscles',
      zh: '肋间肌',
      definition: {
        en: 'Muscles between the ribs. The external intercostal muscles contract during inhalation, pulling the ribs upwards and outwards to increase the volume of the thorax.',
        zh: '肋骨之间的肌肉。吸气时外肋间肌收缩，把肋骨向上向外提，以增大胸腔容积。',
      },
      syllabus: ['0610.11.1.8'],
    },
    {
      en: 'inspiration',
      zh: '吸气',
      definition: {
        en: 'Breathing in. The diaphragm contracts and flattens, the external intercostal muscles contract, the ribcage moves up and out, thoracic volume rises, pressure falls, and air flows in down the pressure gradient.',
        zh: '吸气。膈肌收缩变平，外肋间肌收缩，肋骨架上提外展，胸腔容积增大、压力下降，空气沿压力梯度被吸入。',
      },
      syllabus: ['0610.11.1.8'],
    },
    {
      en: 'expiration',
      zh: '呼气',
      definition: {
        en: 'Breathing out. The diaphragm relaxes and domes upwards, the external intercostal muscles relax, thoracic volume falls, pressure rises above atmospheric, and air flows out.',
        zh: '呼气。膈肌舒张并向上拱起，外肋间肌舒张，胸腔容积减小、压力上升超过大气压，气体被呼出。',
      },
      syllabus: ['0610.11.1.8'],
    },
    {
      en: 'gas exchange',
      zh: '气体交换',
      definition: {
        en: 'The diffusion of oxygen from the alveoli into the blood, and of carbon dioxide from the blood into the alveoli. Driven by concentration gradients across the thin alveolar wall.',
        zh: '氧气由肺泡扩散入血、二氧化碳由血液扩散入肺泡。由薄薄的肺泡壁两侧的浓度梯度驱动。',
      },
      syllabus: ['0610.11.1.4'],
    },
    {
      en: 'surfactant',
      zh: '表面活性物质',
      definition: {
        en: 'A layer on the inside of the alveolus that lowers surface tension, keeping the alveolus open and the wall thin. Premature babies who have not yet made enough surfactant cannot keep their alveoli open — neonatal respiratory distress syndrome.',
        zh: '肺泡内表面的一层物质，降低表面张力，使肺泡保持张开、壁保持薄。尚未合成足够表面活性物质的早产儿无法维持肺泡张开——这是新生儿呼吸窘迫综合征。',
      },
      syllabus: ['0610.11.1.7'],
    },
    {
      en: 'lung cancer',
      zh: '肺癌',
      definition: {
        en: 'Uncontrolled growth of cells in the lung, usually starting in the airway lining. Symptoms: a cough that does not go away, coughing up blood, breathlessness, chest pain, unexplained weight loss. Risk for smokers is many times that of non-smokers.',
        zh: '肺部细胞失控增殖，常起始于气道内壁。症状：持续不愈的咳嗽、咳血、呼吸困难、胸痛、不明原因消瘦。吸烟者风险是非吸烟者的数倍。',
      },
      syllabus: ['0610.11.1.12'],
    },
    {
      en: 'tar',
      zh: '焦油',
      definition: {
        en: 'A sticky brown residue in cigarette smoke that settles on the lining of the airways. Contains dozens of chemicals that damage DNA, including benzo[a]pyrene — one of the most potent cancer-causing substances known. It also paralyses the cilia that would normally sweep it out.',
        zh: '香烟烟雾中沉降在气道内壁上的黏性棕黄色残留物。含数十种损伤 DNA 的化学物质，包括苯并[a]芘——已知最强的致癌物之一。它还能麻痹本应清扫它的纤毛。',
      },
      syllabus: ['0610.11.1.11'],
    },
    {
      en: 'PM2.5 / PM10',
      zh: '细颗粒物 / 可吸入颗粒物',
      definition: {
        en: 'Particulate matter in air pollution. PM10 is particles ≤10 µm across — caught in the nose and upper airways. PM2.5 is particles ≤2.5 µm — small enough to reach the alveoli and enter the bloodstream.',
        zh: '空气污染中的颗粒物。PM10 指直径 ≤10 µm 的颗粒——被鼻和上呼吸道阻挡。PM2.5 指直径 ≤2.5 µm 的颗粒——小到能到达肺泡并进入血液。',
      },
      syllabus: ['0610.11.1.14'],
    },
    {
      en: 'larynx',
      zh: '喉',
      definition: {
        en: 'The voice box. The upper part of the airway between the pharynx and the trachea. Contains the vocal cords.',
        zh: '喉头。位于咽与气管之间的气道上部，内有声带。',
      },
      syllabus: ['0610.11.1.1'],
    },
  ],

  equations: [
    {
      latex:
        '\\mathrm{C_6H_{12}O_6} + 6\\,\\mathrm{O_2} \\rightarrow 6\\,\\mathrm{CO_2} + 6\\,\\mathrm{H_2O}',
      meaning: {
        en: 'Aerobic respiration. The reverse of photosynthesis, atom for atom — and about 32 ATP per glucose.',
        zh: '有氧呼吸。逐个原子来看，它正是光合作用的逆过程——每分子葡萄糖约产生 32 个 ATP。',
      },
      substitute: (r) =>
        `\\text{aerobic ceiling } ${r['ceiling'] ?? 0} \\quad \\text{demand } ${r['demand'] ?? 0}`,
    },
    {
      latex: '\\mathrm{C_6H_{12}O_6} \\rightarrow 2\\,\\mathrm{C_2H_5OH} + 2\\,\\mathrm{CO_2}',
      meaning: {
        en: 'Anaerobic respiration in yeast: ethanol and carbon dioxide. In muscle the product is lactic acid instead. Either way, about 2 ATP per glucose.',
        zh: '酵母的无氧呼吸：生成乙醇和二氧化碳。在肌肉中产物则是乳酸。无论哪种，每分子葡萄糖约只产生 2 个 ATP。',
      },
      substitute: (r) =>
        `\\text{shortfall } ${r['shortfall'] ?? 0} \\quad \\text{peak lactic acid } ${r['peakLactate'] ?? 0} \\quad \\text{recovery } ${r['recovery'] ?? 0}\\ \\mathrm{min}`,
    },
  ],

  sim: {
    primitive: 'plot2d',
    kernel: '11-1-gas-exchange',
    hint: {
      en: 'Push the intensity past the aerobic ceiling and watch the second graph lift off zero. Then watch the lactic acid after the exercise stops.',
      zh: '把强度推过有氧上限，看第二张图如何从零抬起。然后观察运动停止后的乳酸变化。',
    },
    params: [
      {
        key: 'intensity',
        label: { en: 'How hard the exercise is', zh: '运动强度' },
        unit: '%',
        min: 0,
        max: 150,
        step: 5,
        default: 80,
      },
      {
        key: 'duration',
        label: { en: 'How long it lasts', zh: '持续时间' },
        unit: 'min',
        min: 0,
        max: 15,
        step: 1,
        default: 4,
      },
      {
        key: 'fitness',
        label: { en: 'How well trained the person is', zh: '训练程度' },
        unit: '%',
        min: 0,
        max: 100,
        step: 5,
        default: 30,
      },
    ],
    readouts: [
      {
        key: 'ceiling',
        label: { en: 'Most that oxygen can supply', zh: '有氧供应的上限' },
        unit: '',
        sigFigs: 3,
        exact: true,
      },
      {
        key: 'demand',
        label: { en: 'Energy demanded', zh: '所需能量' },
        unit: '',
        sigFigs: 3,
        exact: true,
      },
      {
        key: 'shortfall',
        label: { en: 'Must come without oxygen', zh: '必须由无氧提供' },
        unit: '',
        sigFigs: 3,
        exact: true,
      },
      {
        key: 'peakLactate',
        label: { en: 'Most lactic acid built up', zh: '乳酸积累的峰值' },
        unit: '',
        sigFigs: 3,
        exact: true,
      },
      {
        key: 'recovery',
        label: { en: 'Time to repay the debt', zh: '偿还氧债所需时间' },
        unit: 'min',
        sigFigs: 3,
        exact: true,
      },
    ],
    presets: [
      {
        label: { en: 'A gentle jog: all aerobic', zh: '慢跑：全部有氧' },
        params: { intensity: 60, duration: 6, fitness: 30 },
      },
      {
        label: { en: 'Right at the ceiling', zh: '正好达到上限' },
        params: { intensity: 100, duration: 6, fitness: 30 },
      },
      {
        label: { en: 'A hard sprint', zh: '全力冲刺' },
        params: { intensity: 150, duration: 2, fitness: 30 },
      },
      {
        label: { en: 'Too hard for too long', zh: '强度过大且持续过久' },
        params: { intensity: 145, duration: 10, fitness: 30 },
      },
      {
        label: { en: 'The same pace, but trained', zh: '同样的强度，但受过训练' },
        params: { intensity: 145, duration: 10, fitness: 100 },
      },
      {
        label: { en: 'Sitting still', zh: '静坐不动' },
        params: { intensity: 0, duration: 6, fitness: 30 },
      },
    ],
  },

  narration,

  checkpoints: [
    {
      id: '0610-11-1-cp1',
      syllabus: ['0610.12.3.6', '0610.12.3.7'],
      tier: 'extended',
      commandWord: 'Explain',
      marks: 4,
      stem: 'After finishing a sprint, an athlete continues to breathe deeply and rapidly for several minutes. Explain why.',
      markScheme: [
        {
          text: 'During the sprint the demand for energy exceeded what aerobic respiration could supply, so muscles respired anaerobically',
          marks: 1,
        },
        { text: 'Anaerobic respiration in muscle produces lactic acid, which built up', marks: 1 },
        {
          text: 'Oxygen is needed to break the lactic acid down — this extra oxygen is the oxygen debt',
          marks: 1,
        },
        {
          text: 'So breathing stays deep and rapid until enough oxygen has been taken in to repay it',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Name the lactic acid and name the debt. "The body needs more oxygen" is true of the sprint itself, not of the minutes afterwards, and does not answer the question asked.',
        zh: '要点出乳酸，也要点出氧债。"身体需要更多氧气"说的是冲刺过程本身，而不是之后那几分钟，答的不是题目问的。',
      },
    },
    {
      id: '0610-11-1-cp2',
      syllabus: ['0610.12.3.2'],
      tier: 'extended',
      commandWord: 'Explain',
      marks: 3,
      stem: 'A muscle respiring anaerobically uses far more glucose than one respiring aerobically to release the same amount of energy. Explain why, and state the products of each.',
      markScheme: [
        {
          text: 'Aerobic respiration releases about 32 ATP per glucose molecule; anaerobic respiration in muscle releases only about 2',
          marks: 1,
        },
        {
          text: 'so many more glucose molecules must be broken down to release the same energy',
          marks: 1,
        },
        {
          text: 'Aerobic products are carbon dioxide and water; the anaerobic product in muscle is lactic acid',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Anaerobic respiration does not break glucose down completely — the lactic acid still contains most of the energy, which is why it can be oxidised later.',
        zh: '无氧呼吸并没有把葡萄糖彻底分解——乳酸中仍保有大部分能量，这正是它之后可以被氧化的原因。',
      },
    },
    {
      id: '0610-11-1-cp3',
      syllabus: ['0610.11.1.8'],
      tier: 'extended',
      commandWord: 'Describe',
      marks: 4,
      stem: 'Describe how air is drawn into the lungs during inhalation.',
      markScheme: [
        {
          text: 'The external intercostal muscles contract, pulling the ribs upwards and outwards',
          marks: 1,
        },
        { text: 'The diaphragm muscle contracts and flattens, moving downwards', marks: 1 },
        { text: 'The volume of the thorax increases, so the pressure inside decreases', marks: 1 },
        {
          text: 'Air flows in from the atmosphere, down the pressure gradient, until the pressures are equal',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Volume changes and pressure follows — get them in that order. The diaphragm flattens when it contracts, which surprises students who expect a contracting muscle to bunch up.',
        zh: '先容积变化，压力随之改变——顺序不能反。膈肌收缩时是变平的，这一点常让以为"肌肉收缩就会隆起"的学生感到意外。',
      },
    },
    {
      id: '0610-11-1-cp4',
      syllabus: ['0610.11.1.9'],
      tier: 'extended',
      commandWord: 'Explain',
      marks: 3,
      stem: 'Expired air contains less oxygen and about a hundred times more carbon dioxide than inspired air. Explain why.',
      markScheme: [
        {
          text: 'Cells respire aerobically, using oxygen and producing carbon dioxide',
          marks: 1,
        },
        {
          text: 'Oxygen diffuses from the alveoli into the blood, down a concentration gradient, and is carried to the cells',
          marks: 1,
        },
        {
          text: 'Carbon dioxide diffuses from the blood into the alveoli, down its own gradient, and is breathed out',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'The change happens in the cells, not in the lungs. The lungs are where the exchange occurs; respiration is what creates the gradients that drive it.',
        zh: '变化发生在细胞里，而不是肺里。肺是进行交换的场所；呼吸作用才是制造出驱动交换的浓度梯度的原因。',
      },
    },
    {
      id: '0610-11-1-cp5',
      syllabus: ['0610.11.1.11'],
      tier: 'extended',
      commandWord: 'Explain',
      marks: 3,
      stem: 'Explain how goblet cells and ciliated cells protect the lungs, and suggest why a smoker is more likely to develop a chest infection.',
      markScheme: [
        {
          text: 'Goblet cells secrete mucus, which traps dust particles and bacteria in the airway',
          marks: 1,
        },
        {
          text: 'Ciliated cells beat their cilia to sweep the mucus up towards the throat, where it is swallowed',
          marks: 1,
        },
        {
          text: 'Smoking paralyses or destroys the cilia, so mucus and trapped bacteria are not removed and accumulate in the lungs',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Two cell types, two different jobs. And the smoking mark is about the cilia specifically, not about smoke being generally harmful.',
        zh: '两种细胞，两项不同的工作。而与吸烟有关的那一分，说的正是纤毛，而不是笼统的"烟有害"。',
      },
    },
    {
      id: '0610-11-1-cp6',
      syllabus: ['0610.12.1.1'],
      tier: 'core',
      commandWord: 'State',
      marks: 3,
      stem: 'State three uses of the energy released by respiration in a mammal.',
      markScheme: [
        { text: 'Muscle contraction, giving movement', marks: 1 },
        { text: 'Active transport of substances across membranes', marks: 1 },
        {
          text: 'Building large molecules from small ones (such as proteins from amino acids), cell division and growth, or maintaining a constant body temperature',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Maintaining body temperature only applies to mammals and birds, and is worth including because the question says mammal.',
        zh: '"维持体温"只适用于哺乳动物和鸟类；因为题目说的是哺乳动物，写上它是值得的。',
      },
    },
    {
      id: '0610-11-1-cp7',
      syllabus: ['0610.12.1.2'],
      tier: 'core',
      commandWord: 'Predict',
      marks: 3,
      stem: 'Yeast is mixed with glucose solution and the volume of carbon dioxide produced is measured at temperatures from 10 °C to 60 °C. Predict the shape of the graph of rate against temperature, and explain it.',
      markScheme: [
        {
          text: 'The rate increases as the temperature rises from 10 °C, reaching a maximum at an optimum temperature',
          marks: 1,
        },
        {
          text: 'because the molecules have more kinetic energy, so there are more successful collisions between enzymes and substrate',
          marks: 1,
        },
        {
          text: 'Above the optimum the rate falls sharply, because the enzymes controlling respiration are denatured and their active sites change shape',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'This is the enzyme curve again, in a new setting. Respiration is a series of enzyme-controlled reactions, so it has the same optimum and the same collapse.',
        zh: '这又是酶的曲线，只是换了场景。呼吸作用是一系列由酶控制的反应，因此有同样的最适点和同样的骤降。',
      },
    },
  ],

  // Visual / interactive learning modules for Chapter 3 (B8 Gas exchange and
  // respiration). See src/content/types.ts for the `LessonExtra` shape.
  // Each module uses a real figure extracted from the G8 PDF so the student
  // sees the textbook picture, not a hand-drawn approximation.
  extras: [
    // 1) Aerobic vs anaerobic — side-by-side compare with the three word
    //    equations underneath. The "32 vs 2 ATP" line is the most-cited fact
    //    from this chapter and earns its own panel.
    {
      type: 'respiration-compare',
      id: 'respiration',
      title: { en: 'Aerobic vs anaerobic respiration', zh: '有氧 vs 无氧呼吸' },
      hint: {
        en: 'Same idea on both sides: what the cell is doing. The difference is what it has to do it with — and what it has to throw away afterwards.',
        zh: '两边都是同一个核心问题：细胞在做什么。区别只在于用什么做、做完留下什么。',
      },
      rows: [
        {
          id: 'oxygen',
          label: { en: 'Oxygen', zh: '氧气' },
          aerobic: {
            en: 'Required. Glucose is broken down completely into CO₂ and water.',
            zh: '必需。葡萄糖被彻底分解为 CO₂ 和水。',
          },
          anaerobic: {
            en: 'Not used. The cell breaks glucose down only partway, leaving a product that still holds energy (lactic acid in muscle, ethanol in yeast).',
            zh: '不参与。细胞只把葡萄糖部分分解，产物仍含有能量（肌肉里是乳酸，酵母里是乙醇）。',
          },
        },
        {
          id: 'atp',
          label: { en: 'ATP per glucose', zh: '每分子葡萄糖的 ATP' },
          aerobic: {
            en: 'About 32. A glucose molecule is fully oxidised, and most of its bond energy is captured.',
            zh: '约 32。葡萄糖分子被完全氧化，大部分键能被捕获。',
          },
          anaerobic: {
            en: 'About 2. Most of the energy stays locked inside the lactic acid or ethanol — which is why anaerobic respiration has to be "paid back" afterwards (the oxygen debt).',
            zh: '约 2。大部分能量仍锁在乳酸或乙醇里——这就是为什么无氧呼吸之后需要"偿还"（氧债）。',
          },
        },
        {
          id: 'products',
          label: { en: 'Products', zh: '产物' },
          aerobic: {
            en: 'Carbon dioxide and water. Both are easy for the body to get rid of.',
            zh: '二氧化碳和水。两者都易于被身体排出。',
          },
          anaerobic: {
            en: 'Lactic acid in muscle (causes the burn and fatigue), or ethanol and CO₂ in yeast (used in bread and brewing).',
            zh: '肌肉里是乳酸（造成酸胀和疲劳），酵母里是乙醇和 CO₂（用于面包和酿酒）。',
          },
        },
        {
          id: 'where',
          label: { en: 'Where it happens', zh: '发生在哪里' },
          aerobic: {
            en: 'In every living cell, all the time — as long as oxygen is being delivered. Mitochondria are the main site.',
            zh: '在每个活细胞中持续进行——只要有氧送达。线粒体是主要场所。',
          },
          anaerobic: {
            en: 'Only when oxygen cannot keep up: a hard sprint, holding the breath, sudden heavy lifting. Some organisms (yeast, many bacteria) do it all the time.',
            zh: '只在氧跟不上时发生：全力冲刺、憋气、突发大力举重。有些生物（酵母、许多细菌）则一直进行无氧呼吸。',
          },
        },
        {
          id: 'atp-use',
          label: { en: 'What the ATP is for', zh: 'ATP 用来做什么' },
          aerobic: {
            en: 'Movement (muscle contraction), active transport, building large molecules, cell division, maintaining body temperature.',
            zh: '运动（肌肉收缩）、主动运输、合成大分子、细胞分裂、维持体温。',
          },
          anaerobic: {
            en: 'Movement only — the short burst of energy that gets a sprinter off the blocks, for example.',
            zh: '仅用于运动——例如让短跑选手冲过起跑线的那一刹那的爆发。',
          },
        },
      ],
      equations: [
        {
          id: 'aerobic',
          kind: 'aerobic',
          latex: 'C₆H₁₂O₆ + 6 O₂  →  6 CO₂ + 6 H₂O',
          meaning: {
            en: 'Aerobic respiration. The reverse of photosynthesis, atom for atom — and about 32 ATP per glucose.',
            zh: '有氧呼吸。逐个原子来看，正是光合作用的逆过程——每分子葡萄糖约产生 32 个 ATP。',
          },
        },
        {
          id: 'anaerobic-muscle',
          kind: 'anaerobic-muscle',
          latex: 'C₆H₁₂O₆  →  2 C₃H₆O₃',
          meaning: {
            en: 'Anaerobic in muscle: glucose → lactic acid. The lactic acid is what makes the muscle burn.',
            zh: '肌肉中的无氧呼吸：葡萄糖 → 乳酸。乳酸就是肌肉酸胀的来源。',
          },
        },
        {
          id: 'anaerobic-yeast',
          kind: 'anaerobic-yeast',
          latex: 'C₆H₁₂O₆  →  2 C₂H₅OH + 2 CO₂',
          meaning: {
            en: 'Anaerobic in yeast: glucose → ethanol + CO₂. The CO₂ makes bread rise and fermenting drinks fizzy.',
            zh: '酵母中的无氧呼吸：葡萄糖 → 乙醇 + CO₂。CO₂ 让面包蓬松，让发酵中的饮料冒泡。',
          },
        },
      ],
      source: {
        en: 'G8 Science · p.50, Section B8.01, the three word equations',
        zh: 'G8 教材·第 50 页 B8.01 节，三个文字表达式',
      },
    },

    // 2) The gas-exchange system in one picture — 12 hotspots over the G8
    //    Figure B8.01, with "follow the air" mode animating the breath
    //    through the airways.
    {
      type: 'airway-pathway',
      id: 'airways',
      title: { en: 'The gas-exchange system, in one picture', zh: '一张图看气体交换系统' },
      hint: {
        en: 'Click any part of the breathing system. "Follow the air" animates a breath larynx → trachea → bronchus → bronchiole → alveoli.',
        zh: '点击呼吸系统任一结构。点"跟着空气走一遍"会动画演示一缕空气从喉→气管→支气管→细支气管→肺泡的旅程。',
      },
      initialPart: 'larynx',
      parts: [
        {
          id: 'larynx',
          name: { en: 'larynx', zh: '喉' },
          description: {
            en: 'The "voice box" at the top of the trachea. It contains the vocal cords, which vibrate as air passes through to make sound. It also has a flap (the epiglottis) that closes over the trachea when you swallow, so food goes down the oesophagus and not into the lungs.',
            zh: '位于气管顶部的"喉头"。内有声带，气流通过时振动发声。还有一片会厌盖，吞咽时盖住气管，让食物进的是食道而不是肺。',
          },
          stop: 1,
        },
        {
          id: 'trachea',
          name: { en: 'trachea (windpipe)', zh: '气管' },
          description: {
            en: 'The main airway from the larynx down to where it splits into the two bronchi. C-shaped rings of cartilage keep it open against the pressure changes of breathing; the open back lets the oesophagus bulge in when a bolus of food passes down.',
            zh: '从喉向下到分为两条支气管处的主气道。C 形软骨环在呼吸压力变化下保持气管张开；背面不封口，让食团通过时食道可以向内凸出。',
          },
          stop: 2,
        },
        {
          id: 'left-bronchus',
          name: { en: 'left bronchus', zh: '左主支气管' },
          description: {
            en: 'One of two airways branching from the bottom of the trachea, one to each lung. The right bronchus is wider and more vertical than the left — which is also why an inhaled object usually ends up in the right lung.',
            zh: '气管底部分出的两条气道之一，各通入一侧肺。右支气管比左支气管更粗、更垂直——这也是误吸的异物通常进入右肺的原因。',
          },
          stop: 3,
        },
        {
          id: 'bronchiole',
          name: { en: 'bronchiole', zh: '细支气管' },
          description: {
            en: 'A smaller airway inside the lung, branching off a bronchus. Its wall is mostly smooth muscle, with no cartilage rings, so it can constrict (in an asthma attack, for example) and cut off airflow. Each bronchiole ends in a cluster of alveoli.',
            zh: '肺内由支气管分出的小气道。管壁以平滑肌为主，没有软骨环，因此会收缩（譬如哮喘发作时）切断气流。每条细支气管末端连着一团肺泡。',
          },
          stop: 4,
        },
        {
          id: 'alveoli',
          name: { en: 'alveoli (air sacs)', zh: '肺泡' },
          description: {
            en: 'Hundreds of millions of tiny air sacs at the end of the bronchioles. Their walls are one cell thick and wrapped in capillaries, which is what makes them such an effective gas-exchange surface. The total surface area is roughly the size of a tennis court.',
            zh: '细支气管末端数亿个微小的气囊。壁仅一个细胞厚，外面缠绕着毛细血管——这正是它们成为高效气体交换表面的原因。肺泡总表面积约有一个网球场大小。',
          },
          stop: 5,
        },
        {
          id: 'left-lung',
          name: { en: 'left lung', zh: '左肺' },
          description: {
            en: 'One of the two lungs. The left lung is slightly smaller than the right because the heart sits to the left of the centre line, taking up some of the space. The lung is divided into lobes: two on the left, three on the right.',
            zh: '两肺之一。由于心脏偏左，左肺比右肺略小。肺由肺叶组成：左肺两叶，右肺三叶。',
          },
        },
        {
          id: 'ribs',
          name: { en: 'ribs', zh: '肋骨' },
          description: {
            en: 'Twelve pairs of curved bones that form a cage around the heart and lungs. During breathing, the rib cage is pulled upwards and outwards by the external intercostal muscles, increasing the volume of the thorax so air is drawn in.',
            zh: '围绕心肺的十二对弧形骨骼。呼吸时，肋间外肌把肋骨架向上向外拉，使胸腔容积增大，吸入空气。',
          },
        },
        {
          id: 'external-intercostal',
          name: { en: 'external intercostal muscle', zh: '肋间外肌' },
          description: {
            en: 'The outer layer of muscle between the ribs. When it contracts, it pulls the rib cage up and out — the start of breathing in.',
            zh: '肋间的外层肌肉。收缩时把肋骨架向上向外拉——吸气的起点。',
          },
        },
        {
          id: 'internal-intercostal',
          name: { en: 'internal intercostal muscle', zh: '肋间内肌' },
          description: {
            en: 'The inner layer of muscle between the ribs. When it contracts, it pulls the rib cage down and in — driving forced breathing out. (Quiet breathing out is mostly passive recoil.)',
            zh: '肋间的内层肌肉。收缩时把肋骨架向下向内拉——驱动用力呼气。（安静呼气主要靠被动回弹。）',
          },
        },
        {
          id: 'pleural-membranes',
          name: { en: 'pleural membranes', zh: '胸膜' },
          description: {
            en: 'Two thin membranes around each lung, with a thin film of pleural fluid between them. The fluid acts as a lubricant and also makes the two membranes stick together, so the lungs are pulled outwards as the rib cage expands.',
            zh: '每侧肺外的两层薄膜，两层之间有薄薄一层胸膜液。液体起润滑作用，也让两层膜黏合在一起，于是肋骨架扩张时肺被一起向外拉。',
          },
        },
        {
          id: 'heart',
          name: { en: 'heart', zh: '心脏' },
          description: {
            en: 'Sits in the middle of the thorax, between the two lungs, slightly to the left. Its right side pumps blood through the lungs to pick up oxygen; its left side pumps that oxygenated blood out to the rest of the body.',
            zh: '位于胸腔中央、两肺之间，略偏左。右半部分把血泵到肺里取氧，左半部分把含氧血泵往全身。',
          },
        },
        {
          id: 'diaphragm',
          name: { en: 'diaphragm', zh: '膈' },
          description: {
            en: 'A sheet of muscle below the lungs, dome-shaped at rest. When it contracts, it flattens — and the volume of the thorax increases, drawing air in. Relax, and the dome returns, pushing air out again.',
            zh: '肺下方一片肌肉，静息时呈穹顶状。收缩时变平——胸腔容积增大，吸入空气。放松后穹顶复原，空气被推出。',
          },
        },
      ],
    },

    // 3) The four features that make the alveolus a good gas-exchange
    //    surface, one card per feature, with real figures.
    {
      type: 'gas-exchange-features',
      id: 'features',
      title: { en: 'Why the alveolus is so good at gas exchange', zh: '为什么肺泡的气体交换效率那么高' },
      hint: {
        en: 'Each card names one of the four features the syllabus gives, shows the figure that demonstrates it, and explains why it matters.',
        zh: '每张卡片讲考纲中点名的四项特征之一，配以图示并说明为何重要。',
      },
      features: [
        {
          id: 'large-surface-area',
          term: { en: 'Large surface area', zh: '大表面积' },
          mechanism: {
            en: 'Hundreds of millions of alveoli, each a tiny sphere. Spheres have the lowest surface-area-to-volume ratio of any shape — but with hundreds of millions of them, the *total* surface is enormous, roughly the area of a tennis court.',
            zh: '数亿个微小的球形肺泡。球形是各种形状中表面积/体积比最低的——但几亿个加在一起，*总*表面积巨大，约有一个网球场。',
          },
          clinical: {
            en: 'Any disease that destroys alveolar walls (emphysema) cuts this surface area down and gas exchange suffers. That is why a person with emphysema gets out of breath walking across a room.',
            zh: '任何破坏肺泡壁的疾病（如肺气肿）都会减少表面积，气体交换因而受损。这就是肺气肿患者走几步路就气喘的原因。',
          },
          image: '/figures/g8/11-1-gas-exchange/figure-b8-02.png',
          imageSource: { en: 'G8 Science · p.37, Figure B8.02 — alveoli at the end of a bronchiole', zh: 'G8 教材·第 37 页图 B8.02——细支气管末端的肺泡' },
        },
        {
          id: 'thin-wall',
          term: { en: 'Thin wall (one cell thick)', zh: '壁薄（单层细胞）' },
          mechanism: {
            en: 'The alveolar wall is just one cell thick, and so is the wall of the capillary wrapped around it. The gas has only two cells to cross — by diffusion, a tiny distance.',
            zh: '肺泡壁仅一个细胞厚，包裹它的毛细血管壁也只有一个细胞厚。气体只需穿过两层细胞——靠扩散，距离极短。',
          },
          clinical: {
            en: 'Anything that thickens these walls (inflammation, fluid, fibrosis) makes diffusion slower. Pores on the alveolar surface let the surfactant layer spread, which keeps the wall thin in a healthy lung.',
            zh: '任何让壁变厚的情况（炎症、液体潴留、纤维化）都会让扩散变慢。肺泡表面的孔让表面活性剂层铺开，使健康肺的壁保持薄。',
          },
          image: '/figures/g8/11-1-gas-exchange/figure-b8-04.png',
          imageSource: { en: 'G8 Science · p.39, Figure B8.04 — alveolus with red cells in the capillary', zh: 'G8 教材·第 39 页图 B8.04——肺泡与毛细血管内的红细胞' },
        },
        {
          id: 'good-blood-supply',
          term: { en: 'Good blood supply', zh: '血液供应充足' },
          mechanism: {
            en: 'A dense network of capillaries wraps every alveolus. As soon as a red blood cell gives up its oxygen, another one arrives; the concentration gradient is constantly refreshed, so diffusion never slows down for lack of unsaturated blood.',
            zh: '致密的毛细血管网包绕每个肺泡。一个红细胞刚交出氧气，新的就到来；浓度梯度不断刷新，扩散不会因为缺少未饱和血而减慢。',
          },
          clinical: {
            en: 'During exercise the heart pumps harder and faster, sending more blood through these capillaries per minute. That is the body\'s way of raising the rate of gas exchange to meet demand.',
            zh: '运动时心脏泵得更猛更快，每分钟流经这些毛细血管的血量增大。这是身体提高气体交换速率以满足需求的方式。',
          },
          image: '/figures/g8/11-1-gas-exchange/figure-b8-04.png',
          imageSource: { en: 'G8 Science · p.39, Figure B8.04 — red cells in the capillary around the alveolus', zh: 'G8 教材·第 39 页图 B8.04——肺泡周围毛细血管内的红细胞' },
        },
        {
          id: 'moist-surface',
          term: { en: 'Moist surface', zh: '湿润的表面' },
          mechanism: {
            en: 'The alveolar surface is coated with a thin film of moisture. Gases dissolve in this film before they diffuse across — oxygen dissolves on the air side and comes off on the blood side, carbon dioxide the other way around.',
            zh: '肺泡表面覆有一层薄薄的水膜。气体在扩散前先溶入这层液膜——氧气在空气侧溶入，在血液侧释出；二氧化碳反之。',
          },
          clinical: {
            en: 'A surfactant layer on the inside of the alveolus lowers the surface tension, keeping the alveolus open and the wall thin. Premature babies who have not yet made enough surfactant cannot keep their alveoli open — a condition called neonatal respiratory distress syndrome.',
            zh: '肺泡内表面的表面活性剂层降低表面张力，使肺泡保持张开、壁保持薄。早产儿因尚未合成足量表面活性剂，无法维持肺泡张开——这就是新生儿呼吸窘迫综合征。',
          },
          image: '/figures/g8/11-1-gas-exchange/figure-b8-05.png',
          imageSource: { en: 'G8 Science · p.40, Figure B8.05 — diffusion across the moist alveolar wall', zh: 'G8 教材·第 40 页图 B8.05——气体穿越湿润的肺泡壁' },
        },
      ],
    },

    // 4) Smoking — substances in the smoke + the diseases they cause.
    {
      type: 'smoking-effects',
      id: 'smoking',
      title: { en: 'What smoking does to the body', zh: '吸烟对身体的影响' },
      hint: {
        en: 'The first half is what is in cigarette smoke. The second half is what those substances do once they reach the body.',
        zh: '前一部分是香烟烟雾里含什么。后一部分是这些物质进入体内后会做什么。',
      },
      heroImage: '/figures/g8/11-1-gas-exchange/figure-b8-07.png',
      heroImageSource: {
        en: 'G8 Science · p.45, Figure B8.07 — the four substances in cigarette smoke',
        zh: 'G8 教材·第 45 页图 B8.07——香烟烟雾中的四种物质',
      },
      substances: [
        {
          id: 'nicotine',
          term: { en: 'nicotine', zh: '尼古丁' },
          mechanism: {
            en: 'The addictive substance in tobacco. Within seconds of inhaling, nicotine reaches the brain and triggers dopamine release. The brain rewires itself around this reward signal, so absence of nicotine causes withdrawal — irritability, anxiety, poor concentration. Nicotine also narrows small blood vessels and raises blood pressure.',
            zh: '烟草中的成瘾物质。吸入后几秒内即达脑部，触发多巴胺释放。大脑围绕这一奖赏信号重新布线，缺少尼古丁就出现戒断反应——烦躁、焦虑、注意力下降。尼古丁还会收缩小血管、升高血压。',
          },
          clinical: {
            en: 'A regular smoker feels alert soon after a cigarette and edgy before the next one. The narrowing of blood vessels is what makes fingers and toes feel cold, and over years contributes to coronary heart disease.',
            zh: '规律吸烟者抽完烟后会感到清醒，到下一次前又会焦躁。血管收缩使手脚冰凉，积年累月则促成冠心病。',
          },
          image: '/figures/g8/11-1-gas-exchange/figure-b8-07.png',
          imageSource: {
            en: 'G8 Science · p.45, Figure B8.07 — "Nicotine is addictive"',
            zh: 'G8 教材·第 45 页图 B8.07——"尼古丁令人成瘾"',
          },
        },
        {
          id: 'tar',
          term: { en: 'tar', zh: '焦油' },
          mechanism: {
            en: 'A sticky brown residue that settles on the lining of the airways. It contains dozens of chemicals that damage DNA, including benzo[a]pyrene — one of the most potent cancer-causing substances known. The cilia that would normally sweep it out are paralysed by it.',
            zh: '黏稠的褐色残留物，沉积在气道内壁。其中含有数十种损伤 DNA 的化学物质，包括苯并[a]芘——已知最强的致癌物之一。本应把它扫出去的纤毛反被它瘫痪。',
          },
          clinical: {
            en: 'Tar stains the fingers and teeth yellow-brown, and accumulates in the lungs of a smoker as a dark sticky layer. A long-term smoker\'s lungs are visibly blackened on dissection.',
            zh: '焦油把手指和牙齿染成黄褐色，在吸烟者肺里积成黑色黏层。长期吸烟者的肺在解剖时呈明显黑色。',
          },
          image: '/figures/g8/11-1-gas-exchange/figure-b8-07.png',
          imageSource: {
            en: 'G8 Science · p.45, Figure B8.07 — "Tar causes lung cancer"',
            zh: 'G8 教材·第 45 页图 B8.07——"焦油引起肺癌"',
          },
        },
        {
          id: 'carbon-monoxide',
          term: { en: 'carbon monoxide', zh: '一氧化碳' },
          mechanism: {
            en: 'A poisonous gas that binds to haemoglobin about 200 times more tightly than oxygen does. The haemoglobin occupied by carbon monoxide cannot carry oxygen — so the smoker\'s blood effectively has a lower oxygen-carrying capacity. In pregnancy, the same effect starves the developing baby of oxygen.',
            zh: '有毒气体，与血红蛋白的结合力约为氧气的 200 倍。被一氧化碳占据的血红蛋白无法运氧——吸烟者的血液实际运氧能力下降。孕期母亲血液的同样效应会让发育中的胎儿缺氧。',
          },
          clinical: {
            en: 'A heavy smoker can have 10% of their haemoglobin occupied by carbon monoxide — equivalent to mild anaemia. Babies of smoking mothers are, on average, born 200 g lighter than those of non-smokers.',
            zh: '重度吸烟者可能有 10% 的血红蛋白被一氧化碳占据——相当于轻度贫血。吸烟母亲的婴儿平均比不吸烟母亲的轻 200 克。',
          },
          image: '/figures/g8/11-1-gas-exchange/figure-b8-07.png',
          imageSource: {
            en: 'G8 Science · p.45, Figure B8.07 — "Carbon monoxide reduces the oxygen-carrying capacity"',
            zh: 'G8 教材·第 45 页图 B8.07——"一氧化碳降低血液的运氧能力"',
          },
        },
        {
          id: 'particulates',
          term: { en: 'particulates', zh: '颗粒物' },
          mechanism: {
            en: 'Tiny solid particles carried in the smoke. They are small enough to reach the alveoli themselves, where they scratch and inflame the delicate walls, and add to the chemical load that the alveolar macrophages have to clear.',
            zh: '烟雾中夹带的微小固体颗粒。它们小到能直达肺泡，划伤并刺激脆弱的肺泡壁，加重肺泡巨噬细胞必须清除的化学负荷。',
          },
          clinical: {
            en: 'The chronic inflammation from particulates is part of why smokers cough — the lung is trying to dislodge material it cannot clear. Long term, it contributes to chronic bronchitis and emphysema.',
            zh: '颗粒物引起的慢性炎症是吸烟者咳嗽的部分原因——肺试图排清它无法清除的物质。长期下来会引发慢性支气管炎和肺气肿。',
          },
          image: '/figures/g8/11-1-gas-exchange/figure-b8-07.png',
          imageSource: {
            en: 'G8 Science · p.45, Figure B8.07 — "Particulates damage lung surfaces"',
            zh: 'G8 教材·第 45 页图 B8.07——"颗粒物损伤肺表面"',
          },
        },
      ],
      diseases: [
        {
          id: 'chronic-bronchitis',
          term: { en: 'chronic bronchitis', zh: '慢性支气管炎' },
          mechanism: {
            en: 'Cigarette smoke paralyses the cilia that line the airways and inflames the goblet cells, which respond by secreting more mucus. With the escalator stopped, the mucus pools, and the only way to clear it is by coughing. Persistent coughing that brings up mucus for at least three months a year is chronic bronchitis.',
            zh: '香烟烟雾让气道纤毛瘫痪、刺激杯状细胞，杯状细胞则以分泌更多黏液应对。自动梯停转后黏液淤积，唯一的清除方式就是咳嗽。每年至少三个月持续咳出黏液，就是慢性支气管炎。',
          },
          clinical: {
            en: 'A persistent, productive cough, especially in the morning. Breathlessness on exertion, frequent chest infections. Lung tissue itself is intact at first, but the chronic inflammation sets the stage for emphysema later.',
            zh: '持续性、伴有咳痰的咳嗽（尤其在早晨）。活动时气短，胸腔感染反复发作。早期肺组织本身完好，但慢性炎症为日后肺气肿埋下伏笔。',
          },
          image: '/figures/g8/11-1-gas-exchange/figure-b8-08.png',
          imageSource: {
            en: 'G8 Science · p.47, Figure B8.08 — cilia and mucus in healthy airway',
            zh: 'G8 教材·第 47 页图 B8.08——健康气道中的纤毛与黏液',
          },
        },
        {
          id: 'emphysema',
          term: { en: 'emphysema', zh: '肺气肿' },
          mechanism: {
            en: 'The inflammatory response to years of smoke digests the alveolar walls. Many small air sacs merge into a few large ones, so total surface area for gas exchange falls. The lungs also lose their elastic recoil — expelling air becomes a real effort.',
            zh: '多年烟雾引发的炎症反应消化了肺泡壁。许多小气腔合并为几个大气腔，气体交换的总表面积减少。肺也失去弹性回缩力——呼气变得费力。',
          },
          clinical: {
            en: 'A person with emphysema gets out of breath walking across a room. The chest becomes barrel-shaped — held in the expanded position because the lungs can no longer empty. Under a microscope, the spongy mesh of alveoli is replaced by large empty holes.',
            zh: '肺气肿患者走几步路就气喘。胸廓变成桶状——因为肺无法再排空而保持在扩张位。显微镜下，原本蜂窝状的肺泡被大空洞取代。',
          },
          image: '/figures/g8/11-1-gas-exchange/image-b8-03.png',
          imageSource: {
            en: 'G8 Science · p.46, Image B8.03 — (a) healthy lung (b) emphysema lung',
            zh: 'G8 教材·第 46 页图 B8.03——(a) 健康肺 (b) 肺气肿肺',
          },
        },
        {
          id: 'lung-cancer',
          term: { en: 'lung cancer', zh: '肺癌' },
          mechanism: {
            en: 'Tar carries dozens of carcinogens onto the lining of the bronchi. Most DNA damage is repaired, but if a mutation in a gene that controls cell division survives, the cell begins to divide out of control. The resulting tumour grows into the airway, can spread to other parts of the body, and is usually fatal if not caught early.',
            zh: '焦油把数十种致癌物带到支气管内壁。多数 DNA 损伤会被修复，但若控制细胞分裂的某个基因上有一个突变逃过修复，细胞就会失控分裂。形成的肿瘤长入气道，可转移到身体其他部位；除非早期发现，否则通常致命。',
          },
          clinical: {
            en: 'A cough that does not go away, coughing up blood, breathlessness, chest pain, unexplained weight loss. The risk for a smoker is many times that of a non-smoker, and is roughly proportional to the number of cigarettes per day times the number of years smoked.',
            zh: '久咳不愈、咳血、气短、胸痛、不明原因消瘦。吸烟者的风险是不吸烟者的若干倍，并与"每天支数 × 吸烟年数"大致成正比。',
          },
          image: '/figures/g8/11-1-gas-exchange/figure-b8-07.png',
          imageSource: {
            en: 'G8 Science · p.45, Figure B8.07 — tar as the cancer-causing substance',
            zh: 'G8 教材·第 45 页图 B8.07——焦油作为致癌物',
          },
        },
        {
          id: 'coronary-heart-disease',
          term: { en: 'coronary heart disease', zh: '冠心病' },
          mechanism: {
            en: 'Nicotine narrows the small blood vessels and raises blood pressure. Carbon monoxide reduces the blood\'s oxygen-carrying capacity, so the heart has to work harder to deliver the same oxygen. The damage to the lining of the coronary arteries also lets fatty deposits build up faster. The combination puts smokers at much higher risk of a heart attack than non-smokers.',
            zh: '尼古丁收缩小血管、升高血压。一氧化碳降低血液运氧能力，心脏必须更努力工作才能输送等量氧气。冠状动脉内壁的损伤也加速脂肪沉积。这些因素叠加，使吸烟者心脏病发作的风险远高于不吸烟者。',
          },
          clinical: {
            en: 'Chest pain on exertion (angina), breathlessness, and — in the worst case — a heart attack when a coronary artery becomes completely blocked. The risk drops within a year of stopping smoking, and after ten years is back close to that of a non-smoker.',
            zh: '用力时胸痛（心绞痛）、气短，最坏的情况是冠状动脉完全阻塞引发心肌梗塞。戒烟一年内风险即开始下降，十年后接近不吸烟者水平。',
          },
          image: '/figures/g8/11-1-gas-exchange/figure-b8-07.png',
          imageSource: {
            en: 'G8 Science · p.45, Figure B8.07 — nicotine, tar, and CO all contribute',
            zh: 'G8 教材·第 45 页图 B8.07——尼古丁、焦油、一氧化碳共同作用',
          },
        },
      ],
      // Closing "the evidence" panel: Doll's UK correlation, 1911–2001.
      // The graph is what turned suspicion into proof. The 20-year lag
      // (consumption rises, deaths follow two decades later) is the actual
      // evidence of causation — it is exactly the pattern a dose-response
      // curve would predict if smoking caused the cancer.
      evidence: {
        image: '/figures/g8/11-1-gas-exchange/figure-b8-09.png',
        imageSource: {
          en: 'G8 Science · p.46, Figure B8.09 — lung-cancer deaths and smoking rates in the UK, 1911–2001',
          zh: 'G8 教材·第 46 页图 B8.09——1911–2001 年英国肺癌死亡与吸烟率',
        },
        heading: {
          en: 'The evidence: a century of data',
          zh: '证据：一个世纪的数据',
        },
        body: {
          en: 'In the 1950s, the British doctor Richard Doll noticed that lung-cancer cases were rising year on year. He interviewed lung-cancer patients in twenty London hospitals, and almost all of them were smokers. The graph below — annual UK cigarette consumption against annual lung-cancer deaths, 1911 to 2001 — is what settled the question for the rest of the century.',
          zh: '1950 年代,英国医生 Richard Doll 注意到肺癌病例年年攀升。他在伦敦二十家医院访谈肺癌患者,几乎全是吸烟者。下面这张图——英国每年香烟消耗量与每年肺癌死亡数,1911 至 2001 年——让这个问题在之后的几十年中不再有争议。',
        },
        lagNote: {
          en: 'The lung-cancer curve trails the smoking curve by roughly twenty years. That is the lag between damaging the DNA in a cell and that cell becoming a tumour — the smoking that rose in 1950 became the cancer that was diagnosed in 1970.',
          zh: '肺癌曲线比吸烟曲线晚约 20 年。这正是 DNA 损伤与肿瘤形成之间的时滞——1950 年上升的吸烟量,要等到 1970 年才表现为被诊断的癌症。',
        },
      },
    },

    // 5) 3D lungs — the chapter's primary organ. The figure at the top of
    //    the page is fine for labelling, but the 3D model is the only way
    //    to see where the trachea sits relative to the two lungs, and
    //    what "alveoli" actually means in 3D.
    {
      type: 'organ-anatomy',
      id: 'lungs-3d',
      title: { en: 'The lungs, in 3D', zh: '肺部 3D 解剖' },
      hint: {
        en: 'Drag to rotate, scroll to zoom. Click any part to read about it. The two lungs look like one mirror image but they are not — the right has three lobes, the left only two, with a notch where the heart sits.',
        zh: '拖动旋转，滚轮缩放。点击任一部分查看说明。两片肺看似镜像但其实不同——右肺三叶，左肺两叶，给心脏让出位置。',
      },
      intro: {
        en: 'The two lungs are where gas exchange happens. They sit inside the ribcage, one on each side of the heart. This is the model used in 3D viewer.',
        zh: '两片肺是气体交换的场所。它们位于胸腔内，分列心脏两侧。这是 3D 查看器所用的模型。',
      },
      organ: 'lungs',
      system: { en: 'Respiratory system', zh: '呼吸系统' },
      parts: [
        {
          id: 'trachea',
          name: { en: 'trachea', zh: '气管' },
          description: {
            en: 'The windpipe. A rigid tube about 11 cm long held open by C-shaped rings of cartilage. Carries air from the larynx to the two bronchi.',
            zh: '气管。约 11 厘米长，由 C 形软骨环撑开。把空气从喉部送到左右两条支气管。',
          },
          position3d: [0, 1.6, 0.2],
        },
        {
          id: 'right-lung',
          name: { en: 'right lung', zh: '右肺' },
          description: {
            en: 'The larger lung, with three lobes. The extra lobe leaves room above the heart.',
            zh: '较大的一侧肺，有三叶。多出来的一叶给偏左的心脏让出位置。',
          },
          position3d: [-1.2, 0.1, 0.7],
        },
        {
          id: 'left-lung',
          name: { en: 'left lung', zh: '左肺' },
          description: {
            en: 'Smaller, with only two lobes. The cardiac notch on its medial surface is where the heart nestles against it.',
            zh: '较小，只有两叶。其内侧的"心切迹"是心脏贴靠的凹槽。',
          },
          position3d: [1.2, 0.1, 0.7],
        },
        {
          id: 'bronchus',
          name: { en: 'bronchus', zh: '支气管' },
          description: {
            en: 'The two main branches the trachea divides into. Inside each lung they keep branching, eventually ending in tiny bronchioles.',
            zh: '气管分出的两条主支。在肺内继续反复分支，最终成为细支气管。',
          },
          position3d: [-0.03, 0.3, 0.35],
        },
        {
          id: 'alveoli',
          name: { en: 'alveoli', zh: '肺泡' },
          description: {
            en: 'Tiny air sacs wrapped in capillaries. Oxygen diffuses in, carbon dioxide diffuses out. The total surface area is close to that of a tennis court.',
            zh: '被毛细血管包裹的小气囊。氧气向内扩散，二氧化碳向外扩散。总面积接近一个网球场。',
          },
          position3d: [-0.7, -0.6, 0.9],
        },
        {
          id: 'diaphragm',
          name: { en: 'diaphragm', zh: '膈肌' },
          description: {
            en: 'The dome-shaped muscle below the lungs. When it contracts, the chest cavity expands and air is drawn in.',
            zh: '肺下方的圆顶形肌肉。收缩时胸腔扩大，吸入空气。',
          },
          position3d: [0, -1.3, 0],
        },
      ],
      initialPart: 'alveoli',
    },
    // The mucociliary escalator — the one place where the textbook's
    // goblet cell / mucus / cilia story lives as a single connected
    // narrative. The narration has a one-liner and the term cards each
    // have their own mechanism text, but a student who only reads the
    // lesson narrative misses the connection. This block makes the
    // connection explicit, with a real hook from the 8/5 class.
    {
      type: 'concept-explainer',
      id: 'mucociliary-escalator',
      title: { en: 'How the lungs clean themselves', zh: '肺是怎么给自己"打扫卫生"的' },
      hint: {
        en: 'Your lungs take in roughly 10,000 litres of dirty air every day. Without a built-in cleaning system, they would be full of dust within hours. There is one — a thin conveyor belt of sticky mucus, kept moving by millions of tiny beating hairs.',
        zh: '你的肺每天大约要"吸进"一万升脏空气。如果没有一套内置清洁系统，肺几个小时就会被灰尘填满。系统其实有——一层薄薄的黏液传送带，由数百万根微小纤毛不停地摆动来推动。',
      },
      heroImage: '/figures/g8/11-1-gas-exchange/figure-b8-03.png',
      heroImageSource: {
        en: 'G8 Science · Chapter 8, Figure B8.03 — goblet cell releasing mucus, with cilia on adjacent cells beating in a synchronised wave',
        zh: 'G8 教材·第 8 章图 B8.03——杯状细胞正在释放黏液，邻近细胞上的纤毛同步摆动形成波浪',
      },
      blocks: [
        {
          id: 'escalator',
          title: { en: 'Goblet cells, mucus, cilia — the escalator in three lines', zh: '杯状细胞、黏液、纤毛——三行讲完"自动梯"' },
          hook: {
            en: 'After a long day in a city, you cough up grey phlegm. Where did it come from? The air you breathed in carried dust, soot and bacteria; some of it was trapped in a thin layer of mucus on the inside of your airways, and that layer has been steadily moving up to your throat ever since.',
            zh: '在城里待了一整天，你会咳出灰色的痰。它从哪儿来？你吸入的空气里有灰尘、烟尘、细菌；其中一部分被气道内壁薄薄的一层黏液抓住，而那层黏液从你吸入第一口空气起就在不停地向上移动，目的地是咽喉。',
          },
          mechanism: {
            en: 'The airway lining has three cell types doing three jobs. (1) Goblet cells secrete sticky mucus — a thin film that sits on top of the cells. (2) Particles in the incoming air (dust, soot, bacteria, viruses) get caught in this mucus the moment they touch it. (3) Ciliated cells next to the goblet cells have hair-like cilia on their surface, and every cilium beats in the same direction, in a synchronised wave. The wave moves the mucus blanket upwards — about a centimetre a minute — and at the top of the trachea it is swallowed. Stomach acid then kills anything that was caught. This is why textbooks call it the mucociliary escalator.',
            zh: '气道内壁有三种细胞各司其职。(1) 杯状细胞分泌黏液——在细胞表面形成一层薄薄的膜。(2) 吸入的颗粒（灰尘、烟尘、细菌、病毒）碰到这层黏液就被粘住。(3) 杯状细胞旁的纤毛细胞表面长着毛状的纤毛，所有纤毛方向一致地同步摆动，像波浪一样推动黏液向上走——大约每分钟一厘米——到了气管顶端就被吞下。胃酸随后杀死被粘住的任何东西。教材把这一套叫做"黏液-纤毛自动梯"。',
          },
          whyItMatters: {
            en: 'The escalator is the first line of defence for the lungs. On a clean day it clears everything that lands in the airways. The moment it slows down — whether from cigarette smoke, kitchen-oil fumes, chronic PM2.5 exposure, or anaesthesia during surgery — mucus pools, pathogens multiply in the puddle, and chest infections follow. Smokers cough not because the cough "creates" mucus, but because the broken escalator leaves the body no other way to clear it.',
            zh: '自动梯是肺的第一道防线。在空气干净的日子，它把所有进入气道的颗粒清扫干净。一旦它慢下来——无论是香烟烟雾、厨房油烟、长期 PM2.5 暴露，还是手术麻醉——黏液就会淤积，病原体在淤积的黏液里繁殖，胸腔感染随之而来。吸烟者咳嗽不是因为咳嗽"造出了"黏液，而是因为坏掉的自动梯让身体除了咳嗽再无他法把黏液清走。',
          },
          teacherStory: {
            en: 'A small experiment that fits in a single lesson: a student breathes on a cold mirror and watches the fog. The droplets in that fog are mostly water from the upper airway. The reason a single breath is enough to fog the mirror is that the lung has already moved tens of thousands of litres of air through it today, and almost all of the dust, soot and bacteria that came with that air is sitting in your stomach by lunchtime, courtesy of the escalator.',
            zh: '一节课就能做的小实验：一个同学对着冷镜面哈气，看着镜面起雾。雾里的水滴主要来自上气道。一次哈气就能让镜面起雾，说明到这一节课为止，你的肺已经处理了上万升空气，而其中几乎所有的灰尘、烟尘、细菌，到午饭时都已经被自动梯送进你的胃里了。',
          },
        },
      ],
    },

    // Air quality — fog vs haze vs PM2.5 vs PM10. Came out of the 8/5
    // 11-1 lesson discussion of smoking and air pollution. Three blocks
    // because the four terms are easy to mix up.
    {
      type: 'concept-explainer',
      id: 'air-quality',
      title: { en: 'What is in the air? Fog, haze, PM2.5 and PM10', zh: '空气里有什么？雾、霾、PM2.5 和 PM10' },
      hint: {
        en: 'Four terms that get used interchangeably in weather reports but mean quite different things. One is liquid water, the others are solid particles of different sizes — and the size is what decides whether they reach the alveoli or get trapped higher up.',
        zh: '天气预报里常被混用的四个词，其实差异很大。一种是液态水，另外三种是不同大小的固体颗粒——正是大小决定了它们是抵达肺泡，还是在更上层就被截住。',
      },
      blocks: [
        {
          id: 'fog-vs-haze',
          title: { en: 'Fog and haze look the same — but one is water, the other is solid', zh: '雾和霾看起来一样——一个是水，另一个是固体' },
          hook: {
            en: 'A grey-white morning with poor visibility can be either fog (a natural, harmless event) or haze (a pollution event). They look the same to the eye, but the air in each case contains very different things.',
            zh: '一个灰白、能见度差的早晨，可能是雾（自然、无害的天气现象），也可能是霾（污染事件）。肉眼难分，但两种情况里的空气所含物质非常不同。',
          },
          mechanism: {
            en: 'Fog is liquid: water vapour has condensed onto tiny airborne particles (condensation nuclei) and now drifts as microscopic droplets. Haze is solid: it is solid particulate matter — dust, soot, sulphates, nitrates, organic carbon — small enough to stay suspended. When the air is damp the particles swell with water and look like fog, which is why the two are often confused.',
            zh: '雾是液体：水蒸气在微小的悬浮颗粒（凝结核）上凝结，形成微米级的水滴漂在空气中。霾是固体：由固体颗粒物——灰尘、烟尘、硫酸盐、硝酸盐、有机碳——组成，小到可以悬浮。当空气潮湿，颗粒吸水胀大，看起来就像雾，所以两者经常被混淆。',
          },
          whyItMatters: {
            en: 'Fog by itself is uncomfortable but mostly harmless. Haze carries solid particles deep into the lungs and is a public-health concern. A weather report saying "fog" and a report saying "haze" do not mean the same risk to a child with asthma or an elderly neighbour.',
            zh: '雾本身只是不舒服，多数情况下无害。霾则把固体颗粒带入肺的深处，是公共卫生问题。"雾"和"霾"对哮喘孩子或年长邻居意味着完全不同的风险。',
          },
        },
        {
          id: 'pm25-vs-pm10',
          title: { en: 'PM2.5 vs PM10 — the size decides where the particle ends up', zh: 'PM2.5 vs PM10——颗粒大小决定它停在气道的哪一层' },
          hook: {
            en: 'Air-quality reports show two numbers: PM2.5 and PM10. Both are particles, both look like specks of dust, but the difference in their diameter is the difference between "stuck in the nose" and "deposited in the alveoli".',
            zh: '空气质量报告里出现两个数：PM2.5 和 PM10。都是颗粒，都像尘屑，但直径的差别就是"卡在鼻腔"和"沉积在肺泡"之间的差别。',
          },
          mechanism: {
            en: 'PM10 means "particulate matter of 10 micrometres or less in diameter". These are caught in the nose and upper airways — sneezed out, coughed up, swallowed. PM2.5 means "of 2.5 micrometres or less". These slip past the upper airways, ride the airflow all the way down to the alveoli, and settle on the gas-exchange surface itself. The smaller the particle, the more surface area it has per unit mass — and the more reactive its chemistry.',
            zh: 'PM10 指"直径 ≤ 10 微米的颗粒物"。它们被鼻腔和上气道截住——打出喷嚏、咳出、咽下。PM2.5 指"直径 ≤ 2.5 微米"。这些颗粒穿过上气道，随气流一路下到肺泡，沉积在气体交换表面。颗粒越小，单位质量的表面积越大——化学反应活性也越高。',
          },
          whyItMatters: {
            en: 'PM2.5 is the dangerous one. Long-term exposure raises the risk of heart attacks, strokes, lung cancer and chronic lung disease, and short-term spikes drive asthma attacks and acute hospital admissions. China\'s "PM2.5爆表" (off the charts) days in winter are public-health events, not just weather.',
            zh: 'PM2.5 才是危险的那个。长期暴露提升心梗、中风、肺癌和慢性肺病的风险，短期飙升则诱发哮喘发作和急性住院。冬季中国"PM2.5 爆表"的日子是公共卫生事件，不只是天气。',
          },
        },
        {
          id: 'gas-exchange-protection',
          title: { en: 'Why the lung\'s defences struggle against modern air', zh: '为什么肺的防线在现代空气面前力不从心' },
          hook: {
            en: 'The lung already has a built-in cleaning system — mucus traps particles, cilia sweep the mucus up and out. On a clean day it does its job. On a heavily polluted day it is overwhelmed, and the particles that get past it lodge in the alveoli and stay there.',
            zh: '肺本身就有一套清洁系统——黏液捕获颗粒，纤毛把黏液向上扫出体外。在空气干净的日子它干得很好。在重污染的日子它就力不从心，穿过它的颗粒就沉积在肺泡里不走了。',
          },
          mechanism: {
            en: 'Mucociliary clearance moves at a fixed rate; it can clear a normal day\'s worth of particles, but not a polluted one\'s. The particles that get through to the alveoli are removed by macrophages — but macrophages have a limit too. Cigarette smoke, kitchen-oil fumes and chronic PM2.5 exposure all slow cilia and exhaust macrophages. The result is chronic inflammation, eventually the alveolar walls break down (emphysema) and the gas-exchange surface shrinks.',
            zh: '黏液-纤毛清除系统按固定速率工作——能处理"正常一天"的颗粒量，但处理不了"污染一天"的量。漏过到肺泡的颗粒由巨噬细胞处理——但巨噬细胞也有极限。香烟烟雾、厨房油烟和长期 PM2.5 暴露都会让纤毛变慢、耗尽巨噬细胞。结果是慢性炎症，肺泡壁最终被破坏（肺气肿），气体交换面积缩小。',
          },
          whyItMatters: {
            en: 'This is why the "I smoked my whole life and I\'m fine" anecdote is misleading: it is a survivor, not the median. Long-term exposure drives population-level rises in lung cancer, COPD and cardiovascular deaths. The lungs can take a lot, but they cannot take a modern polluted city forever.',
            zh: '这就是为什么"我抽了一辈子烟也没事"的故事具有误导性——那是幸存者，不是中位数。长期暴露在群体层面推高肺癌、慢阻肺和心血管病的死亡率。肺能承受很多，但无法永远承受一座现代污染城市。',
          },
          teacherStory: {
            en: 'When air quality alerts are issued for "PM2.5爆表" (off the charts), the responsible advice is to avoid outdoor exercise — your minute ventilation goes up by 5-10x when you exercise, so you dose yourself with proportionally more particles. A walk in a clean park is fine; a run in heavy haze is not.',
            zh: '"PM2.5 爆表"的日子里，负责任的建议是避免户外运动——运动时每分钟通气量增加 5-10 倍，你按比例吸入更多颗粒。清洁公园里散步可以；重霾下跑步不行。',
          },
        },
      ],
    },
  ],
}

export default lesson
