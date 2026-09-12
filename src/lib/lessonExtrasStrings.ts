/**
 * UI chrome strings for the lesson-extras interactive modules.
 *
 * Course copy (organ descriptions, tooth kinds, food names) lives in the lesson's
 * `extras` data, so it can be edited without touching components and so the bilingual
 * invariant is enforced at the type level. This file is for the buttons, empty-state
 * messages, and other UI strings that the renderer owns and the lesson author
 * should not need to think about.
 *
 * Kept separate from the components to satisfy the `no-Chinese-in-components`
 * ESLint rule, which exists to keep course copy translatable. The glyphs in
 * `src/lib/translatorGlyphs.ts` follow the same pattern.
 */

import type { Bilingual } from '@/content/types'

export const DIGESTIVE_ANATOMY = {
  modeExplore: { en: 'Explore', zh: '探索' } satisfies Bilingual,
  modeFollow: { en: 'Follow the food', zh: '跟着食物走一遍' } satisfies Bilingual,
  followPrompt: {
    en: 'A ball of food is travelling mouth → anus. The right-hand panel follows along.',
    zh: '一团食物正从口腔走向肛门。右侧面板同步讲解。',
  } satisfies Bilingual,
  emptyExplore: {
    en: 'Click an organ in the picture to read what happens there.',
    zh: '点击图中任意器官，查看那里发生什么。',
  } satisfies Bilingual,
  emptyFollow: {
    en: 'Starting the journey — the first organ will appear on the right in a moment.',
    zh: '旅程即将开始，第一个器官马上会出现在右侧。',
  } satisfies Bilingual,
} as const

export const TEETH_ANATOMY = {
  layerHint: {
    en: 'Click a layer of the tooth to read what it does.',
    zh: '点击牙齿任一层，了解它的作用。',
  } satisfies Bilingual,
  kindHint: {
    en: 'Click a tooth below to see what it does.',
    zh: '点击下方任一牙齿，了解它的作用。',
  } satisfies Bilingual,
  gumLabel: { en: 'gum', zh: '牙龈' } satisfies Bilingual,
  nerveLabel: { en: 'nerve & blood vessels', zh: '神经与血管' } satisfies Bilingual,
} as const

export const VILLI_SURFACE_AREA = {
  hint: {
    en: 'Every finger is a villus, every patch of fuzz on a villus is microvilli. Absorption happens across all of it.',
    zh: '每一根指状突起是绒毛，绒毛上的每一片小绒毛是微绒毛。吸收就在这全部的表面上进行。',
  } satisfies Bilingual,
  sliderLabel: { en: 'Villi per cm²', zh: '每平方厘米的绒毛数' } satisfies Bilingual,
  bare: { en: 'Bare tube', zh: '光管' } satisfies Bilingual,
  withVilli: { en: 'With villi', zh: '有绒毛' } satisfies Bilingual,
  bareNote: { en: 'Just length × circumference', zh: '仅长 × 周长' } satisfies Bilingual,
  withVilliNote: { en: 'fold factor', zh: '皱褶系数' } satisfies Bilingual,
  withMicrovilli: { en: 'With microvilli', zh: '有微绒毛' } satisfies Bilingual,
  withMicrovilliNote: { en: '≈ a tennis court', zh: '≈ 一个网球场' } satisfies Bilingual,
  bareCaption: { en: 'Surface area = circumference × length', zh: '表面积 = 周长 × 长度' } satisfies Bilingual,
} as const

export const BILE_EMULSIFICATION = {
  hint: {
    en: 'Click "Add bile" to see what emulsification looks like.',
    zh: '点"+ 加入胆汁"看看乳化的样子。',
  } satisfies Bilingual,
  before: { en: 'Before bile', zh: '加入胆汁前' } satisfies Bilingual,
  after: { en: 'After bile', zh: '加入胆汁后' } satisfies Bilingual,
  add: { en: '+ Add bile', zh: '+ 加入胆汁' } satisfies Bilingual,
  reset: { en: '↺ Reset', zh: '↺ 重置' } satisfies Bilingual,
  on: {
    en: 'Many tiny drops. Lipase has a much larger surface to work on — that is the whole point of bile.',
    zh: '许多小液滴。脂肪酶可接触的表面积大得多——这就是胆汁的全部意义。',
  } satisfies Bilingual,
  off: {
    en: 'Click "Add bile" to see what emulsification looks like.',
    zh: '点"+ 加入胆汁"看看乳化的样子。',
  } satisfies Bilingual,
} as const

export const BALANCED_PLATE = {
  cardsHint: {
    en: 'Click a food to add it. Click again to take it off.',
    zh: '点击食物加入餐盘。再点一次则移除。',
  } satisfies Bilingual,
  totalLabel: { en: 'servings on the plate', zh: '份已上盘' } satisfies Bilingual,
  empty: { en: 'Your plate is empty.', zh: '餐盘是空的。' } satisfies Bilingual,
  balanced: { en: 'Balanced — all groups covered.', zh: '均衡——各组都有。' } satisfies Bilingual,
  reset: { en: 'Clear plate', zh: '清空餐盘' } satisfies Bilingual,
  groupLabel: {
    veg: { en: 'Vegetables', zh: '蔬菜' } satisfies Bilingual,
    fruit: { en: 'Fruit', zh: '水果' } satisfies Bilingual,
    protein: { en: 'Protein', zh: '蛋白质' } satisfies Bilingual,
    carb: { en: 'Carbs', zh: '碳水' } satisfies Bilingual,
    dairy: { en: 'Dairy', zh: '乳制品' } satisfies Bilingual,
    fat: { en: 'Healthy fats', zh: '健康脂肪' } satisfies Bilingual,
  },
} as const

export const DIGESTION_FLOW = {
  reveal: { en: 'Show definition', zh: '查看释义' } satisfies Bilingual,
  collapse: { en: 'Hide', zh: '收起' } satisfies Bilingual,
} as const

export const VILLUS_DETAIL = {
  clickHint: {
    en: 'Click any labelled part of the villus to read what it does.',
    zh: '点击绒毛上任意标号部分，了解其作用。',
  } satisfies Bilingual,
  empty: {
    en: 'Click a part of the villus to read about it.',
    zh: '点击绒毛任一部分了解作用。',
  } satisfies Bilingual,
  transportTitle: {
    en: 'Where each nutrient goes',
    zh: '各种营养物质去哪里',
  } satisfies Bilingual,
  lumenLabel: { en: 'lumen of the small intestine', zh: '小肠肠腔' } satisfies Bilingual,
  lactealTag: { en: 'lacteal', zh: '乳糜管' } satisfies Bilingual,
  wallLabel: { en: 'gut wall (one cell thick)', zh: '肠壁（单层细胞）' } satisfies Bilingual,
} as const

export const FOOD_ENERGY = {
  colFood: { en: 'Food', zh: '食物' } satisfies Bilingual,
  colGroup: { en: 'Group', zh: '类别' } satisfies Bilingual,
  colEnergy: { en: 'Energy', zh: '能量' } satisfies Bilingual,
  colBar: { en: 'Relative', zh: '相对量' } satisfies Bilingual,
  pinnedHint: {
    en: 'Pinned for comparison:',
    zh: '已选中用于对比：',
  } satisfies Bilingual,
  clickHint: {
    en: 'Click a row to pin it; click again to clear. Fat carries more than twice the energy of the same mass of carbohydrate or protein.',
    zh: '点击任一行选中对比，再次点击取消。脂肪的能量是同质量碳水或蛋白的两倍以上。',
  } satisfies Bilingual,
  groupLabel: {
    carb: { en: 'Carb', zh: '碳水' } satisfies Bilingual,
    protein: { en: 'Protein', zh: '蛋白质' } satisfies Bilingual,
    fat: { en: 'Fat', zh: '脂肪' } satisfies Bilingual,
    'fruit-veg': { en: 'Fruit / Veg', zh: '果蔬' } satisfies Bilingual,
    dairy: { en: 'Dairy', zh: '乳制品' } satisfies Bilingual,
    mixed: { en: 'Mixed meal', zh: '混合餐' } satisfies Bilingual,
  },
} as const

// ---------------------------------------------------------------------------
// 9-1 Transport in animals — Chapter 2 (B7) extras
// ---------------------------------------------------------------------------

export const HEART_ANATOMY = {
  modeExplore: { en: 'Explore', zh: '探索' } satisfies Bilingual,
  modeFollow: { en: 'Follow the blood', zh: '跟着血液走一遍' } satisfies Bilingual,
  followPrompt: {
    en: 'A red blood cell is travelling body → right heart → lungs → left heart → body. The right-hand panel follows along.',
    zh: '一个红细胞正从全身→右心→肺→左心→全身。右侧面板同步讲解。',
  } satisfies Bilingual,
  emptyExplore: {
    en: 'Click a part of the heart in the picture to read what happens there.',
    zh: '点击图中任意心脏结构，查看那里发生什么。',
  } satisfies Bilingual,
  emptyFollow: {
    en: 'Starting the journey — the first stop will appear on the right in a moment.',
    zh: '旅程即将开始，第一站马上会出现在右侧。',
  } satisfies Bilingual,
  openFullscreen: { en: 'Open fullscreen', zh: '全屏查看' } satisfies Bilingual,
} as const

export const BLOOD_VESSELS_COMPARE = {
  tableHeading: { en: 'Side by side', zh: '并排比较' } satisfies Bilingual,
  yes: { en: 'yes', zh: '有' } satisfies Bilingual,
  no: { en: 'no', zh: '无' } satisfies Bilingual,
  rowLabel: {
    wall: { en: 'Wall', zh: '管壁' } satisfies Bilingual,
    lumen: { en: 'Lumen', zh: '管腔' } satisfies Bilingual,
    hasValves: { en: 'Valves', zh: '瓣膜' } satisfies Bilingual,
    direction: { en: 'Flow direction', zh: '血流方向' } satisfies Bilingual,
    pressure: { en: 'Pressure', zh: '压力' } satisfies Bilingual,
  },
} as const

export const DOUBLE_CIRCULATION = {
  reveal: { en: 'Show definition', zh: '查看释义' } satisfies Bilingual,
  collapse: { en: 'Hide', zh: '收起' } satisfies Bilingual,
  definitionsHeading: {
    en: 'The terms the syllabus uses',
    zh: '考纲里的术语',
  } satisfies Bilingual,
  connector: {
    en: 'the heart pumps again',
    zh: '心脏再次泵血',
  } satisfies Bilingual,
  rowLabel: {
    pulmonary: { en: 'Pulmonary loop', zh: '肺循环' } satisfies Bilingual,
    systemic: { en: 'Systemic loop', zh: '体循环' } satisfies Bilingual,
  },
} as const

// ---------------------------------------------------------------------------
// 11-1 Gas exchange and respiration — Chapter 3 (B8) extras
// ---------------------------------------------------------------------------

export const AIRWAY_PATHWAY = {
  modeExplore: { en: 'Explore', zh: '探索' } satisfies Bilingual,
  modeFollow: { en: 'Follow the air', zh: '跟着空气走一遍' } satisfies Bilingual,
  followPrompt: {
    en: 'A breath is travelling larynx → trachea → bronchus → bronchiole → alveoli. The right-hand panel follows along.',
    zh: '一缕空气正从喉→气管→支气管→细支气管→肺泡。右侧面板同步讲解。',
  } satisfies Bilingual,
  emptyExplore: {
    en: 'Click a part of the breathing system in the picture to read what it does.',
    zh: '点击图中任一呼吸系统结构，查看它的作用。',
  } satisfies Bilingual,
  emptyFollow: {
    en: 'Starting the journey — the first stop will appear on the right in a moment.',
    zh: '旅程即将开始，第一站马上会出现在右侧。',
  } satisfies Bilingual,
} as const

export const RESPIRATION_COMPARE = {
  heading: { en: 'Aerobic vs anaerobic', zh: '有氧 vs 无氧' } satisfies Bilingual,
  aerobic: { en: 'Aerobic respiration', zh: '有氧呼吸' } satisfies Bilingual,
  anaerobic: { en: 'Anaerobic respiration', zh: '无氧呼吸' } satisfies Bilingual,
  equationsHeading: { en: 'The word equations', zh: '文字表达式' } satisfies Bilingual,
  anaerobicMuscle: { en: 'Anaerobic in muscle', zh: '肌肉中的无氧呼吸' } satisfies Bilingual,
  anaerobicYeast: { en: 'Anaerobic in yeast', zh: '酵母中的无氧呼吸' } satisfies Bilingual,
} as const

export const GAS_EXCHANGE_FEATURES = {
  featureLabel: { en: 'The feature', zh: '特征' } satisfies Bilingual,
  whyLabel: { en: 'Why it matters', zh: '为何重要' } satisfies Bilingual,
} as const

export const SMOKING_EFFECTS = {
  heroAlt: {
    en: 'A burning cigarette, with four arrows pointing at the four things in cigarette smoke that cause harm',
    zh: '一支燃烧的香烟，四支箭头分别指向烟雾中四种有害物质',
  } satisfies Bilingual,
  substancesHeading: {
    en: 'What is in cigarette smoke',
    zh: '香烟烟雾里有什么',
  } satisfies Bilingual,
  substancesIntro: {
    en: 'Four substances in the smoke. Each one does a different kind of damage — together they cause the diseases below.',
    zh: '烟雾中有四种物质。各自造成不同损害——共同引发了下面的疾病。',
  } satisfies Bilingual,
  diseasesHeading: {
    en: 'What smoking does to the body',
    zh: '吸烟对身体的影响',
  } satisfies Bilingual,
  diseasesIntro: {
    en: 'Four diseases the syllabus names. Each card carries a real figure and the mechanism linking the substance above to the disease here.',
    zh: '考纲点名的四种疾病。每张卡片配以真实图示，以及连接上方物质与下方疾病的机理。',
  } satisfies Bilingual,
  mechanismLabel: { en: 'How it harms', zh: '如何伤害' } satisfies Bilingual,
  clinicalLabel: { en: 'What it looks like', zh: '临床表现' } satisfies Bilingual,
  evidenceHeading: {
    en: 'The evidence: a century of data',
    zh: '证据：一个世纪的数据',
  } satisfies Bilingual,
  evidenceBody: {
    en: 'In the 1950s, the British doctor Richard Doll noticed that lung-cancer cases were rising year on year. He interviewed lung-cancer patients in twenty London hospitals, and almost all of them were smokers. The graph below — annual UK cigarette consumption against annual lung-cancer deaths, 1911 to 2001 — is what settled the question for the rest of the century.',
    zh: '1950 年代,英国医生 Richard Doll 注意到肺癌病例年年攀升。他在伦敦二十家医院访谈肺癌患者,几乎全是吸烟者。下面这张图——英国每年香烟消耗量与每年肺癌死亡数,1911 至 2001 年——让这个问题在之后的几十年中不再有争议。',
  } satisfies Bilingual,
  evidenceLag: {
    en: 'The lung-cancer curve trails the smoking curve by roughly twenty years. That is the lag between damaging the DNA in a cell and that cell becoming a tumour — the smoking that rose in 1950 became the cancer that was diagnosed in 1970.',
    zh: '肺癌曲线比吸烟曲线晚约 20 年。这正是 DNA 损伤与肿瘤形成之间的时滞——1950 年上升的吸烟量,要等到 1970 年才表现为被诊断的癌症。',
  } satisfies Bilingual,
} as const

/**
 * Shared by 14-1 reflex-arc + eye-anatomy. Same idea as AIRWAY_PATHWAY:
 * an explore mode (free) and a follow mode (animated sequence).
 */
export const REFLEX_ARC = {
  modeExplore: { en: 'Explore', zh: '探索' } satisfies Bilingual,
  modeFollow: { en: 'Follow the impulse', zh: '跟着脉冲走' } satisfies Bilingual,
  followPrompt: {
    en: 'Receptor → sensory neurone → relay neurone → motor neurone → effector. Note what the impulse does *not* visit.',
    zh: '感受器→感觉神经→中间神经→运动神经→效应器。注意脉冲*不*经过什么。',
  } satisfies Bilingual,
  emptyExplore: {
    en: 'Click any part of the reflex arc on the left. Or press "Follow the impulse" to walk through the reflex step by step.',
    zh: '点击左侧反射弧的任一部分。或按"跟着脉冲走"逐步走一遍反射。',
  } satisfies Bilingual,
  emptyFollow: {
    en: 'Watch the dot. The reflex turns round at the spinal cord — your hand is off the hot plate before your brain knows you have been hurt.',
    zh: '看着圆点走。反射在脊髓折返——手离开热盘比大脑知道烫还快。',
  } satisfies Bilingual,
} as const

export const EYE_ANATOMY = {
  empty: {
    en: 'Click any labelled part of the eye. The cornea and lens focus light on the retina; the iris controls how much.',
    zh: '点击眼的任一标注部分。角膜和晶状体把光聚焦到视网膜；虹膜控制进光量。',
  } satisfies Bilingual,
  followPrompt: {
    en: 'Light → cornea → aqueous humour → pupil → lens → vitreous humour → retina → optic nerve. The image is upside down and back to front at first — the brain flips it.',
    zh: '光→角膜→房水→瞳孔→晶状体→玻璃体→视网膜→视神经。最初的像是倒置的——是大脑把它翻正的。',
  } satisfies Bilingual,
  modeExplore: { en: 'Explore', zh: '探索' } satisfies Bilingual,
  modeFollow: { en: 'Follow the light', zh: '跟着光走' } satisfies Bilingual,
  modeProtect: { en: 'Protect the eye', zh: '眼睛的防护' } satisfies Bilingual,
  protectPrompt: {
    en: 'The eye is exposed to the air directly, so it needs a layer of protection. The list on the right is the four-part defence: bone, membrane, fluid, lid.',
    zh: '眼球直接暴露在空气中，所以需要一套防护。右侧列表是四道防线：骨头、薄膜、液体、眼睑。',
  } satisfies Bilingual,
  protectEmpty: {
    en: 'Pick a part from the list to read what it does.',
    zh: '从列表中选一个部分查看它的作用。',
  } satisfies Bilingual,
} as const

// ---------------------------------------------------------------------------
// NeuroneStructure + ThreeNeurones — G8 Figures B9.01 and B9.05.
// One diagram each, drawn inline in SVG; the lesson author only carries
// the bilingual labels and a few key facts about each part. The renderer
// owns the figure geometry.
// ---------------------------------------------------------------------------

export const NEURONE_STRUCTURE = {
  figcaption: {
    en: 'G8 Science · p.47, Figure B9.01 · click a part to read about it',
    zh: 'G8 Science · 第 47 页，图 B9.01 · 点击任一部分查看',
  } satisfies Bilingual,
  empty: {
    en: 'Click any part of the motor neurone to read what it does.',
    zh: '点击运动神经元任一部分，查看它的作用。',
  } satisfies Bilingual,
} as const

export const THREE_NEURONES = {
  figcaption: {
    en: 'G8 Science · p.50, Figure B9.05 · pick a neurone to read about its shape',
    zh: 'G8 Science · 第 50 页，图 B9.05 · 选一种神经元查看它的形态',
  } satisfies Bilingual,
  empty: {
    en: 'Pick a neurone type to see its structure.',
    zh: '选一种神经元查看它的形态。',
  } satisfies Bilingual,
} as const

export const GLUCOSE_LOOP = {
  modeHigh: { en: 'After a meal (high)', zh: '饭后（血糖高）' } satisfies Bilingual,
  modeNormal: { en: 'Normal', zh: '正常' } satisfies Bilingual,
  modeLow: { en: 'After exercise (low)', zh: '运动后（血糖低）' } satisfies Bilingual,
  intro: {
    en: 'Three snapshots of the same loop. The pancreas watches the blood glucose concentration; the liver is the store. The arrows that fire depend on which way the level has moved.',
    zh: '同一个环的三种状态。胰腺监测血糖浓度，肝脏是糖的仓库。哪条箭头动作，取决于血糖是高了还是低了。',
  } satisfies Bilingual,
  insulinLabel: { en: 'insulin', zh: '胰岛素' } satisfies Bilingual,
  glucagonLabel: { en: 'glucagon', zh: '胰高血糖素' } satisfies Bilingual,
  insulinEffect: {
    en: 'Insulin is secreted by the islets of Langerhans. It tells the liver to take glucose out of the blood and store it as glycogen. Blood glucose falls.',
    zh: '胰岛素由胰岛分泌。它告诉肝脏把血糖取走并以糖原形式贮存起来。血糖下降。',
  } satisfies Bilingual,
  glucagonEffect: {
    en: 'Glucagon is also secreted by the islets of Langerhans. It tells the liver to break glycogen back down into glucose and release it into the blood. Blood glucose rises.',
    zh: '胰高血糖素也由胰岛分泌。它告诉肝脏把糖原分解为葡萄糖并释放到血液中。血糖上升。',
  } satisfies Bilingual,
  setPoint: {
    en: 'Set point ≈ 5 mmol/dm³. The pancreas secretes insulin or glucagon to bring the level back to this value, whichever side of it the blood has moved to.',
    zh: '设定点约 5 mmol/dm³。无论血糖偏向哪一侧，胰腺都会通过分泌胰岛素或胰高血糖素把它拉回此值。',
  } satisfies Bilingual,
} as const

export const TEMPERATURE_CONTROL = {
  modeHot: { en: 'Body too hot', zh: '太热时' } satisfies Bilingual,
  modeNormal: { en: 'Normal (≈ 37 °C)', zh: '正常（≈ 37 °C）' } satisfies Bilingual,
  modeCold: { en: 'Body too cold', zh: '太冷时' } satisfies Bilingual,
  intro: {
    en: 'The hypothalamus watches the temperature of the blood running through it. When the temperature moves off the set point, it sends impulses to the skin — and the skin does four things, each one a knob the body can turn up or down.',
    zh: '下丘脑监测流经它的血液温度。当温度偏离设定点时，它向皮肤发出脉冲——皮肤有四件事可做，每一件都是一个可调旋钮。',
  } satisfies Bilingual,
  hypothalamus: { en: 'Hypothalamus (control centre)', zh: '下丘脑（控制中心）' } satisfies Bilingual,
  arteriole: { en: 'Arterioles in the skin', zh: '皮肤内小动脉' } satisfies Bilingual,
  sweat: { en: 'Sweat glands', zh: '汗腺' } satisfies Bilingual,
  hair: { en: 'Hair + erector muscles', zh: '毛发与立毛肌' } satisfies Bilingual,
  shiver: { en: 'Skeletal muscle (shivering)', zh: '骨骼肌（寒战）' } satisfies Bilingual,
} as const

export const REPRODUCTIVE_ANATOMY = {
  tabFemale: { en: 'Female', zh: '女性' } satisfies Bilingual,
  tabMale: { en: 'Male', zh: '男性' } satisfies Bilingual,
  emptyFemale: {
    en: 'Click any labelled part of the female reproductive system. The egg is made in the ovary; fertilisation happens in the oviduct; the fetus develops in the uterus.',
    zh: '点击女性生殖系统的任一标注部分。卵子在卵巢中产生，受精发生在输卵管，胎儿在子宫中发育。',
  } satisfies Bilingual,
  emptyMale: {
    en: 'Click any labelled part of the male reproductive system. Sperm are made in the testes, mature in the epididymis, and travel out through the sperm duct and urethra.',
    zh: '点击男性生殖系统的任一标注部分。精子在睾丸中产生，在附睾中成熟，经输精管和尿道排出。',
  } satisfies Bilingual,
} as const

export const SPERM_VS_EGG = {
  heading: { en: 'How the two gametes differ', zh: '两种配子的不同之处' } satisfies Bilingual,
  spermHeading: { en: 'Sperm', zh: '精子' } satisfies Bilingual,
  eggHeading: { en: 'Egg', zh: '卵细胞' } satisfies Bilingual,
  featureLabel: { en: 'Feature', zh: '特征' } satisfies Bilingual,
  spermSizeLabel: { en: 'Size', zh: '大小' } satisfies Bilingual,
  spermMotilityLabel: { en: 'Motility', zh: '运动能力' } satisfies Bilingual,
  spermCytoplasmLabel: { en: 'Cytoplasm', zh: '细胞质' } satisfies Bilingual,
  spermFoodLabel: { en: 'Food store', zh: '营养储备' } satisfies Bilingual,
  spermAcrosomeLabel: { en: 'Acrosome', zh: '顶体' } satisfies Bilingual,
  spermCountLabel: { en: 'Numbers made', zh: '产出数量' } satisfies Bilingual,
} as const

export const FERTILISATION_JOURNEY = {
  intro: {
    en: 'Three snapshots, in the order they happen. Each figure is the textbook one; the highlight moves from step to step.',
    zh: '三个时刻按发生顺序排列。每张图都是教材原图，高亮随步骤切换。',
  } satisfies Bilingual,
  stepLabel: { en: 'Step', zh: '第' } satisfies Bilingual,
  ofLabel: { en: 'of', zh: '共' } satisfies Bilingual,
} as const

export const PLACENTA_EXCHANGE = {
  intro: {
    en: 'Click any part of the placenta. The two blood supplies never mix; they only come close enough to exchange materials by diffusion.',
    zh: '点击胎盘的任一部分。两套血液系统从不混合——只靠扩散隔着薄膜交换物质。',
  } satisfies Bilingual,
  toFetusHeading: { en: 'What passes to the fetus', zh: '哪些物质从母体到胎儿' } satisfies Bilingual,
  toMotherHeading: { en: 'What passes to the mother', zh: '哪些物质从胎儿到母体' } satisfies Bilingual,
  exchangeNote: {
    en: 'The two bloods do not mix — that would risk agglutination and the higher maternal pressure would damage fetal vessels. Substances cross the placenta by diffusion through a thin membrane, in the direction of their concentration gradient.',
    zh: '两套血液并不混合——一旦混合会有凝集风险，且母体血压更高会损伤胎儿血管。物质靠扩散穿过薄膜，按浓度梯度方向移动。',
  } satisfies Bilingual,
} as const

// Shared by the 3D anatomy viewer (`Anatomy3D`). One block because the
// component is the only consumer; if more 3D scenes appear, split it.
export const ANATOMY_3D = {
  dragHint: {
    en: 'Drag to rotate · scroll to zoom · click a pin to read',
    zh: '拖动旋转·滚轮缩放·点击标记查看',
  } satisfies Bilingual,
  pageHint: {
    en: 'Click pins in the model · ← → keys to step · Esc to clear',
    zh: '点击模型上的标记·← → 键切换·Esc 清除',
  } satisfies Bilingual,
  partsHeading: {
    en: 'All parts',
    zh: '全部结构',
  } satisfies Bilingual,
  listHint: {
    en: 'Or pick one from the list to highlight it without rotating.',
    zh: '也可以从这里选一个标记，无需旋转模型。',
  } satisfies Bilingual,
  startRotate: { en: 'Auto-rotate', zh: '自动旋转' } satisfies Bilingual,
  pauseRotate: { en: 'Pause', zh: '暂停' } satisfies Bilingual,
  calloutHint: {
    en: 'Click another pin, or press Esc to close',
    zh: '点其他标记继续，或按 Esc 关闭',
  } satisfies Bilingual,
  showAllParts: { en: 'All parts', zh: '全部结构' } satisfies Bilingual,
  hideAllParts: { en: 'Hide list', zh: '收起列表' } satisfies Bilingual,
  editingOn: { en: 'Editing', zh: '编辑中' } satisfies Bilingual,
  editingOff: { en: 'Edit positions', zh: '编辑坐标' } satisfies Bilingual,
  editHint: {
    en: 'Pick a pin tab above or click a pin in the model, then drag a slider. Click Copy JSON to grab the { id: [x, y, z] } map for the lesson file.',
    zh: '在顶部选一个 pin 或点 3D 中的标记，再拖动滑块。点 Copy JSON 复制 { id: [x, y, z] } 格式用于 lesson 文件。',
  } satisfies Bilingual,
} as const

// ---------------------------------------------------------------------------
// Chapter 6 (17 Inheritance) extras
// ---------------------------------------------------------------------------

export const DNA_TO_PROTEIN = {
  transcriptionLabel: { en: 'Transcription', zh: '转录' } satisfies Bilingual,
  translationLabel: { en: 'Translation', zh: '翻译' } satisfies Bilingual,
} as const

export const MITOSIS_VS_MEIOSIS = {
  mitosisShort: { en: 'Mitosis', zh: '有丝分裂' } satisfies Bilingual,
  meiosisShort: { en: 'Meiosis', zh: '减数分裂' } satisfies Bilingual,
} as const

export const PUNNETT_GRID = {
  crossLabel: { en: 'Cross type', zh: '杂交类型' } satisfies Bilingual,
  fatherLabel: { en: 'Father', zh: '父亲' } satisfies Bilingual,
  motherLabel: { en: 'Mother', zh: '母亲' } satisfies Bilingual,
  monohybrid: { en: 'Monohybrid (dominant / recessive)', zh: '单基因（显/隐）' } satisfies Bilingual,
  codominant: { en: 'Codominant (both alleles show)', zh: '共显性（两等位基因都表达）' } satisfies Bilingual,
  sexLinked: { en: 'Sex-linked (X chromosome)', zh: '伴性（X 染色体）' } satisfies Bilingual,
  gridHeading: { en: 'Punnett square', zh: '棋盘格' } satisfies Bilingual,
  summaryHeading: { en: 'Offspring ratios', zh: '子代比例' } satisfies Bilingual,
  // Parent genotype option labels — the actual Punnett calculations
  // also need the genotype string itself, so we keep both.
  autosomalParents: {
    AA: { en: 'AA (homozygous dominant)', zh: 'AA（纯合显性）' } satisfies Bilingual,
    Aa: { en: 'Aa (heterozygous)', zh: 'Aa（杂合）' } satisfies Bilingual,
    aa: { en: 'aa (homozygous recessive)', zh: 'aa（纯合隐性）' } satisfies Bilingual,
  },
  sexLinkedParents: {
    XY: { en: 'XY — male (no allele on Y)', zh: 'XY——男性（Y 上无等位基因）' } satisfies Bilingual,
    XX: { en: 'XX — female, two Xs', zh: 'XX——女性，两条 X' } satisfies Bilingual,
    Xy: { en: 'Xy — affected male (X carries the allele)', zh: 'Xy——患病男性（X 携带该等位基因）' } satisfies Bilingual,
    Xx: { en: 'Xx — carrier female', zh: 'Xx——携带者女性' } satisfies Bilingual,
    xx: { en: 'xx — affected female (rare)', zh: 'xx——患病女性（罕见）' } satisfies Bilingual,
  },
  subtitleMonohybrid: {
    en: 'Monohybrid cross — capital letter is dominant',
    zh: '单基因杂交——大写字母为显性',
  } satisfies Bilingual,
  subtitleCodominant: {
    en: 'Codominance — both alleles visible in the heterozygote',
    zh: '共显性——两个等位基因都在杂合体中表现出来',
  } satisfies Bilingual,
  subtitleSexLinked: {
    en: 'X-linked recessive — the Y has no allele to mask it',
    zh: 'X 伴性隐性——Y 上无等位基因来掩盖',
  } satisfies Bilingual,
} as const

export const PEDIGREE_TRACE = {
  autosomalLabel: { en: 'Autosomal recessive', zh: '常染色体隐性' } satisfies Bilingual,
  sexLinkedLabel: { en: 'Sex-linked recessive (X)', zh: 'X 伴性隐性' } satisfies Bilingual,
  deductionHeading: { en: 'Deduction', zh: '推断' } satisfies Bilingual,
  statusAffected: { en: 'Affected (homozygous, aa)', zh: '患病（纯合 aa）' } satisfies Bilingual,
  statusCarrier: { en: 'Carrier (heterozygous, Aa)', zh: '携带者（杂合 Aa）' } satisfies Bilingual,
  statusUnaffected: { en: 'Unaffected (AA or Aa)', zh: '未患病（AA 或 Aa）' } satisfies Bilingual,
  statusUnknown: { en: 'Unknown genotype', zh: '基因型未知' } satisfies Bilingual,
  /** Deduction shown for an affected male in sex-linked mode. */
  sexLinkedAffectedMale: {
    en: 'A male has only one X. If that X carries the allele, the condition shows — there is no second X to mask it.',
    zh: '男性只有一条 X。那条 X 若携带该等位基因，症状就表现出来——没有第二条 X 来掩盖。',
  } satisfies Bilingual,
} as const

// ---------------------------------------------------------------------------
// Chapter 7 (19 Organisms and their environment) extras
// ---------------------------------------------------------------------------

export const FOOD_WEB = {
  empty: {
    en: 'Click any organism in the web to see its trophic level, what it eats, and what eats it.',
    zh: '点击食物网中的任一生物，查看其营养级、它的食物和它的天敌。',
  } satisfies Bilingual,
  normal: { en: 'Web intact', zh: '完整食物网' } satisfies Bilingual,
  removeFox: { en: 'Remove the fox', zh: '去掉狐狸' } satisfies Bilingual,
  removeRabbit: { en: 'Remove the rabbit', zh: '去掉兔子' } satisfies Bilingual,
  trophicProducer: { en: 'Producer', zh: '生产者' } satisfies Bilingual,
  trophicPrimary: { en: 'Primary consumer', zh: '初级消费者' } satisfies Bilingual,
  trophicSecondary: { en: 'Secondary consumer', zh: '次级消费者' } satisfies Bilingual,
  trophicTertiary: { en: 'Tertiary consumer', zh: '三级消费者' } satisfies Bilingual,
  eatsHeading: { en: 'Eats', zh: '食物' } satisfies Bilingual,
  eatenByHeading: { en: 'Eaten by', zh: '天敌' } satisfies Bilingual,
  eatsNothing: { en: '— (producer)', zh: '——（生产者）' } satisfies Bilingual,
  eatenByNothing: { en: '— (top predator)', zh: '——（顶级捕食者）' } satisfies Bilingual,
  affectedNote: {
    en: 'Affected by the removal — its food source is gone, or its predator has been removed.',
    zh: '受移除影响——它失去了食物来源，或它的捕食者被去掉了。',
  } satisfies Bilingual,
} as const

export const PYRAMID_COMPARE = {
  numbers: { en: 'Pyramid of numbers', zh: '数量金字塔' } satisfies Bilingual,
  biomass: { en: 'Pyramid of biomass', zh: '生物量金字塔' } satisfies Bilingual,
  energy: { en: 'Pyramid of energy', zh: '能量金字塔' } satisfies Bilingual,
} as const

export const NUTRIENT_CYCLE = {
  empty: {
    en: 'Click any arrow to see which process it shows and an example of where it happens.',
    zh: '点击任一箭头查看它代表的过程及发生的具体例子。',
  } satisfies Bilingual,
  showReservoirs: { en: 'Show carbon stocks', zh: '显示碳储量' } satisfies Bilingual,
  hideReservoirs: { en: 'Hide carbon stocks', zh: '隐藏碳储量' } satisfies Bilingual,
  exampleHeading: { en: 'Example', zh: '实例' } satisfies Bilingual,
} as const

export const POPULATION_CURVE = {
  empty: {
    en: 'Click any dot on the curve to see what is happening in that phase.',
    zh: '点击曲线上的任一点查看该阶段的情况。',
  } satisfies Bilingual,
  factorsHeading: { en: 'Key factors', zh: '关键因素' } satisfies Bilingual,
  carryingCapacityLabel: { en: 'Carrying capacity (K)', zh: '环境容纳量 (K)' } satisfies Bilingual,
} as const

// ---------------------------------------------------------------------------
// Organ anatomy viewer (3D, shared by 8 organs: lungs, liver, intestine,
// kidneys, brain, eyeball, pancreas, skin — heart has its own
// HeartAnatomy with deeper content).
// ---------------------------------------------------------------------------

export const ORGAN_ANATOMY = {
  loading: { en: 'Loading 3D model…', zh: '正在加载 3D 模型…' } satisfies Bilingual,
  systemLabel: { en: 'Body system', zh: '所属系统' } satisfies Bilingual,
} as const

export const DNA_HELIX_3D = {
  loading: { en: 'Drawing the helix…', zh: '正在绘制螺旋…' } satisfies Bilingual,
  dragHint: {
    en: 'Drag to rotate · scroll to zoom · click a rung to read the base pair',
    zh: '拖动旋转 · 滚轮缩放 · 点击碱基对查看说明',
  } satisfies Bilingual,
  pairLabel: { en: 'Base pair', zh: '碱基对' } satisfies Bilingual,
  positionLabel: { en: 'Position', zh: '位置' } satisfies Bilingual,
  pairDefault: {
    en: 'Each letter pairs with only one partner: A with T, G with C. The two backbones hold the pairs in a regular helix.',
    zh: '每个字母只能与一个配对：A 配 T，G 配 C。两条主链把碱基对固定在规则的螺旋中。',
  } satisfies Bilingual,
  tapRungHint: {
    en: 'Click any rung to read the base pair.',
    zh: '点击任一碱基对查看说明。',
  } satisfies Bilingual,
} as const

export const FOOD_WEB_3D = {
  loading: { en: 'Drawing the web…', zh: '正在绘制食物网…' } satisfies Bilingual,
  dragHint: {
    en: 'Drag to rotate · scroll to zoom · click a node to read about it',
    zh: '拖动旋转 · 滚轮缩放 · 点击节点查看说明',
  } satisfies Bilingual,
  tapNodeHint: {
    en: 'Click any node to read about that species.',
    zh: '点击任一节点查看该物种的说明。',
  } satisfies Bilingual,
  eatsLabel: { en: 'Eats', zh: '捕食' } satisfies Bilingual,
  eatenByLabel: { en: 'Eaten by', zh: '被…捕食' } satisfies Bilingual,
  trophic: {
    producer: { en: 'Producer', zh: '生产者' } satisfies Bilingual,
    primary: { en: 'Primary consumer', zh: '初级消费者' } satisfies Bilingual,
    secondary: { en: 'Secondary consumer', zh: '次级消费者' } satisfies Bilingual,
    tertiary: { en: 'Tertiary consumer', zh: '顶级消费者' } satisfies Bilingual,
  },
} as const

// ---------------------------------------------------------------------------
// Concept explainer — a vertical stack of "hook → mechanism → why-it-matters"
// blocks. Used for the lesson extensions that came out of the G8 classroom
// transcripts: telomere / Hayflick / HeLa (17-1), the hygiene hypothesis
// (14-1), and the fog / haze / PM2.5 distinction (11-1).
// ---------------------------------------------------------------------------

export const CONCEPT_EXPLAINER = {
  sectionHook: { en: 'The hook', zh: '开场故事' } satisfies Bilingual,
  sectionMechanism: { en: 'The science', zh: '科学原理' } satisfies Bilingual,
  sectionWhy: { en: 'Why it matters', zh: '为什么重要' } satisfies Bilingual,
  sectionStory: { en: 'Classroom story', zh: '课堂故事' } satisfies Bilingual,
  /**
   * Alt text for an optional hero figure (see `ConceptExplainerExtra.heroImage`).
   * Kept here so the i18n is in one place — figure alt text is short and
   * describes what the student is looking at, not what they should learn.
   */
  heroAlt: {
    en: 'A textbook figure that anchors the explainer',
    zh: '作为本解释器主图示的教科书插图',
  } satisfies Bilingual,
} as const
