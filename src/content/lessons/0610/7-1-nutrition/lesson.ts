import type { Lesson } from '@/content/types'
import { placementParams } from '@/lib/assignment'
import { ALL_ITEMS, MAX_TARGETS } from './kernel'
import narration from './narration'

const lesson: Lesson = {
  slug: '7-1-nutrition',
  subject: '0610',
  syllabus: [
    '0610.7.1.1',
    '0610.7.1.2',
    '0610.7.1.3',
    '0610.7.2.1',
    '0610.7.2.2',
    '0610.7.3.1',
    '0610.7.3.2',
    '0610.7.3.3',
    '0610.7.3.4',
    '0610.7.3.5',
    '0610.7.3.6',
    '0610.7.3.7',
    '0610.7.4.1',
    '0610.7.4.2',
    '0610.7.4.3',
    '0610.7.4.4',
    '0610.7.4.5',
    '0610.7.4.6',
    '0610.7.4.7',
    '0610.7.4.8',
    '0610.7.5.1',
    '0610.7.5.2',
    '0610.7.5.3',
    '0610.7.5.4',
    '0610.7.5.5',
  ],
  tier: 'extended',
  estimatedMinutes: 60,

  title: { en: 'Human nutrition', zh: '人体的营养' },
  summary: {
    en: 'The gut is a tube running through you, open at both ends. Nothing in it is yours until it has crossed the wall — and digestion exists to make that crossing possible.',
    zh: '消化道是一根贯穿全身、两端开口的管道。其中的东西在穿过管壁之前都不属于你——消化的存在，正是为了让这次穿越成为可能。',
  },

  objectives: [
    {
      en: 'Describe what is meant by a balanced diet, and state the sources and importance of each nutrient.',
      zh: '说明什么是均衡膳食，并说出各类营养素的来源与重要性。',
    },
    { en: 'State the causes of scurvy and rickets.', zh: '说出坏血病与佝偻病的成因。' },
    {
      en: 'Identify the main organs of the digestive system and describe what each does.',
      zh: '识别消化系统的主要器官，并描述各自的功能。',
    },
    {
      en: 'Describe physical digestion, the four types of tooth and the structure of a tooth.',
      zh: '描述物理性消化、四种牙齿以及牙的结构。',
    },
    {
      en: 'Describe chemical digestion and the functions of amylase, protease and lipase.',
      zh: '描述化学性消化以及淀粉酶、蛋白酶和脂肪酶的功能。',
    },
    {
      en: 'Describe the functions of hydrochloric acid in gastric juice.',
      zh: '描述胃液中盐酸的作用。',
    },
    {
      en: 'Explain the role of bile in emulsifying fats and in neutralising stomach acid. (Extended)',
      zh: '解释胆汁在乳化脂肪和中和胃酸中的作用。（Extended）',
    },
    {
      en: 'Explain how villi and microvilli increase the absorbing surface area, and describe the structure of a villus. (Extended)',
      zh: '解释绒毛与微绒毛如何增大吸收面积，并描述绒毛的结构。（Extended）',
    },
  ],

  glossary: [
    {
      en: 'balanced diet',
      zh: '均衡膳食',
      definition: {
        en: 'The right amount of each nutrient in the right proportions for that particular person — which depends on their age, sex and activity.',
        zh: '对某个特定的人而言，各类营养素的量与比例都恰当的膳食——这取决于其年龄、性别与活动量。',
      },
      syllabus: ['0610.7.1.1'],
    },
    {
      en: 'physical digestion',
      zh: '物理性消化',
      definition: {
        en: 'Breaking food into smaller pieces without changing any molecule. It matters because smaller pieces have a much larger total surface area for enzymes.',
        zh: '把食物弄成更小的碎块而不改变任何分子。它之所以重要，是因为更小的碎块拥有大得多的总表面积供酶作用。',
      },
      syllabus: ['0610.7.3.1', '0610.7.3.2'],
    },
    {
      en: 'chemical digestion',
      zh: '化学性消化',
      definition: {
        en: 'Breaking large insoluble molecules into small soluble ones, so they can be absorbed through the gut wall.',
        zh: '把大的不溶分子分解为小的可溶分子，使其能够穿过肠壁被吸收。',
      },
      syllabus: ['0610.7.4.1', '0610.7.4.2'],
    },
    {
      en: 'bile',
      zh: '胆汁',
      definition: {
        en: 'An alkaline liquid made by the liver and stored in the gall bladder. It emulsifies fat and neutralises stomach acid. It contains no enzymes.',
        zh: '由肝脏生成、贮存于胆囊的碱性液体。它乳化脂肪并中和胃酸。其中不含酶。',
      },
      syllabus: ['0610.7.3.7', '0610.7.4.8'],
    },
    {
      en: 'emulsify',
      zh: '乳化',
      definition: {
        en: 'To break one large drop of fat into many tiny droplets. Physical, not chemical — but it multiplies the surface area lipase can reach.',
        zh: '把一大滴脂肪打散成许多微小的液滴。这是物理过程而非化学过程，但它成倍增大了脂肪酶可接触的表面积。',
      },
      syllabus: ['0610.7.3.7'],
    },
    {
      en: 'villus',
      zh: '绒毛',
      definition: {
        en: 'A finger-like fold of the small intestine wall. It has a wall one cell thick, a capillary network and a lacteal.',
        zh: '小肠壁上指状的皱褶。它的壁只有一个细胞厚，内含毛细血管网和一根乳糜管。',
      },
      syllabus: ['0610.7.5.3', '0610.7.5.4'],
    },
    {
      en: 'lacteal',
      zh: '乳糜管',
      definition: {
        en: 'The lymph vessel in the centre of a villus. Fatty acids and glycerol leave this way, not through the blood.',
        zh: '位于绒毛中央的淋巴管。脂肪酸和甘油由此离开，而不是经血液。',
      },
      syllabus: ['0610.7.5.5'],
    },
    {
      en: 'ingestion',
      zh: '摄食',
      definition: {
        en: 'Taking food into the body through the mouth.',
        zh: '把食物经口腔摄入体内。',
      },
      syllabus: ['0610.7.3.1'],
    },
    {
      en: 'egestion',
      zh: '排遗',
      definition: {
        en: 'Passing out of material that has never crossed the gut wall. This is not the same as excretion — faeces are not "metabolic waste".',
        zh: '把从未穿过肠壁的物质排出体外。这与"排泄"不同——粪便不属于"代谢废物"。',
      },
      syllabus: ['0610.7.3.6'],
    },
    {
      en: 'kwashiorkor',
      zh: '恶性营养不良病',
      definition: {
        en: 'A form of severe malnutrition caused by a lack of protein. The child has a swollen belly (oedema) but appears to still have some fat under the skin.',
        zh: '一种因缺乏蛋白质而引起的严重营养不良。患儿腹部水肿鼓胀，但皮下似乎仍有一些脂肪。',
      },
      syllabus: ['0610.7.1.3'],
    },
    {
      en: 'marasmus',
      zh: '消瘦症',
      definition: {
        en: 'Severe malnutrition caused by a lack of both protein and energy (overall starvation). The child is wasted — thin all over, with no fat and very little muscle.',
        zh: '因蛋白质和能量都缺乏（整体饥饿）而引起的严重营养不良。患儿全身消瘦——没有脂肪，肌肉也极少。',
      },
      syllabus: ['0610.7.1.3'],
    },
    {
      en: 'coronary heart disease',
      zh: '冠心病',
      definition: {
        en: 'A disease in which the arteries supplying the heart muscle become narrowed by fatty deposits. Linked to diets high in saturated fat.',
        zh: '为心肌供血的动脉因脂肪沉积而变窄的疾病。与高饱和脂肪饮食相关。',
      },
      syllabus: ['0610.7.1.2'],
    },
    {
      en: 'obesity',
      zh: '肥胖',
      definition: {
        en: 'A condition in which body fat has accumulated to the point that health is at risk. Caused by energy intake consistently exceeding energy use over a long time.',
        zh: '体内脂肪堆积到危害健康的状态。由长期能量摄入持续超过能量消耗所引起。',
      },
      syllabus: ['0610.7.1.2'],
    },
    {
      en: 'night blindness',
      zh: '夜盲症',
      definition: {
        en: 'Difficulty seeing in dim light. Caused by a lack of vitamin A, which is needed to make the retinal pigment in rod cells of the retina.',
        zh: '在弱光下看不清东西。原因是缺乏维生素 A——它是视网膜杆状细胞中视紫红质的原料。',
      },
      syllabus: ['0610.7.1.4'],
    },
    {
      en: 'dental caries',
      zh: '蛀牙',
      definition: {
        en: 'Decay of tooth enamel caused by acid produced when bacteria in the mouth ferment sugars. The enamel (mostly calcium phosphate) cannot regrow once lost — only a dentist can fill it.',
        zh: '口腔细菌发酵糖分产生酸，腐蚀牙釉质所致的龋齿。牙釉质（主要成分磷酸钙）一旦损失便不能再生——只能由牙医补。',
      },
      syllabus: ['0610.7.3.4'],
    },
    {
      en: 'fatty liver',
      zh: '脂肪肝',
      definition: {
        en: 'Excess fat stored inside liver cells, often from sustained over-nutrition. The liver\'s first role is to store surplus glucose as glycogen; once that fills, the rest is turned into fat. Reversible in early stages by cutting energy intake.',
        zh: '肝细胞内堆积过多脂肪，常因长期营养过剩。肝脏的首要功能是把多余的葡萄糖以糖原储存；糖原满后，余下的就转成脂肪。早期通过减少能量摄入可以逆转。',
      },
      syllabus: ['0610.7.1.5'],
    },
    {
      en: 'gallstone',
      zh: '胆结石',
      definition: {
        en: 'A solid crystal that forms in the gall bladder, usually from cholesterol that has come out of solution in the bile. Can block the bile duct, causing severe pain and poor fat digestion.',
        zh: '在胆囊内形成的固体结晶，常因胆汁中胆固醇过饱和析出。可阻塞胆管，引起剧痛和脂肪消化不良。',
      },
      syllabus: ['0610.7.3.7'],
    },
    // ---- 2026-08-21 Vocabulary gap-fill (讲义实际术语) ----
    {
      en: 'carbohydrate',
      zh: '碳水化合物',
      definition: {
        en: 'A nutrient made of carbon, hydrogen and oxygen. The body\'s main energy source. Starch (in bread, rice, potatoes) is broken down to glucose before absorption.',
        zh: '由碳、氢、氧组成的营养素，是身体主要的能量来源。淀粉（面包、米饭、土豆）需先被分解为葡萄糖才能被吸收。',
      },
      syllabus: ['0610.7.1.1'],
    },
    {
      en: 'protein',
      zh: '蛋白质',
      definition: {
        en: 'A nutrient made of amino acids. Used for growth and to repair body tissues. Excess protein is broken down by the liver; the nitrogen part is converted to urea and excreted by the kidneys.',
        zh: '由氨基酸组成的营养素，用于生长和修复身体组织。多余的蛋白质由肝脏分解，含氮部分转化为尿素由肾脏排出。',
      },
      syllabus: ['0610.7.1.1'],
    },
    {
      en: 'fat',
      zh: '脂肪',
      definition: {
        en: 'A nutrient that releases more than twice the energy per gram of carbohydrate or protein. Stored under the skin and around organs as an energy reserve and as insulation.',
        zh: '每克释放的能量是碳水化合物或蛋白质两倍以上的营养素。储存在皮下和器官周围，作为能量储备和保温层。',
      },
      syllabus: ['0610.7.1.1'],
    },
    {
      en: 'vitamin',
      zh: '维生素',
      definition: {
        en: 'An organic nutrient needed in small amounts. The body cannot make most of them, so they must come from the diet. Examples: vitamin A (vision), C (collagen), D (calcium absorption).',
        zh: '少量必需的有机营养素。身体不能合成大多数维生素，必须从食物中获取。例如：维生素 A（视觉）、C（胶原蛋白）、D（钙吸收）。',
      },
      syllabus: ['0610.7.1.3'],
    },
    {
      en: 'mineral',
      zh: '矿物质',
      definition: {
        en: 'An inorganic nutrient needed in small amounts. Examples: calcium (for bones and teeth) and iron (for haemoglobin).',
        zh: '少量必需的无机营养素。例如：钙（骨骼和牙齿）和铁（血红蛋白）。',
      },
      syllabus: ['0610.7.1.3'],
    },
    {
      en: 'fibre (dietary)',
      zh: '膳食纤维',
      definition: {
        en: 'Plant material that cannot be digested. Adds bulk to food, helps the gut muscles push contents along, and reduces the risk of constipation and bowel disease.',
        zh: '不能被消化的植物性物质。它增加食物体积、帮助肠道肌肉推动内容物，并降低便秘和肠道疾病的风险。',
      },
      syllabus: ['0610.7.1.1'],
    },
    {
      en: 'scurvy',
      zh: '坏血病',
      definition: {
        en: 'A disease caused by lack of vitamin C. Symptoms: bleeding gums, loose teeth, bruises without injury, wounds that will not heal, fatigue. Common in sailors on long voyages before fresh fruit was rationed.',
        zh: '由缺乏维生素 C 引起的疾病。症状：牙龈出血、牙齿松动、无外伤的瘀伤、伤口不愈合、疲劳。在新鲜水果成为每日配给前，长航船员常患此病。',
      },
      syllabus: ['0610.7.1.5'],
    },
    {
      en: 'rickets',
      zh: '佝偻病',
      definition: {
        en: 'A disease in children caused by lack of vitamin D or calcium. Bones, especially in the legs, stay soft and bend under the body\'s weight — knees bow outward, ankles turn in, spine curves.',
        zh: '儿童因缺乏维生素 D 或钙而患的疾病。骨骼（尤其是腿部）保持柔软，在体重作用下弯曲——膝盖外翻、踝内翻、脊柱弯曲。',
      },
      syllabus: ['0610.7.1.5'],
    },
    {
      en: 'mouth',
      zh: '口腔',
      definition: {
        en: 'The first part of the digestive system. Teeth break food into smaller pieces; the salivary glands add saliva containing amylase, which starts digesting starch.',
        zh: '消化系统的第一部分。牙齿把食物嚼碎；唾液腺分泌含淀粉酶的唾液，开始消化淀粉。',
      },
      syllabus: ['0610.7.2.1'],
    },
    {
      en: 'oesophagus',
      zh: '食道',
      definition: {
        en: 'A muscular tube that pushes food down to the stomach. Food does not fall — the walls squeeze behind it in a wave called peristalsis. This works even upside down.',
        zh: '将食物推送到胃的肌肉管道。食物不是掉下去的——管壁在它后方以"蠕动"的方式挤压推动。即使倒立也能工作。',
      },
      syllabus: ['0610.7.2.1'],
    },
    {
      en: 'stomach',
      zh: '胃',
      definition: {
        en: 'A muscular sac that churns food and adds gastric juice: hydrochloric acid and a protease called pepsin. The acid kills most bacteria; the low pH (~2) is what pepsin needs to work. Food stays 2–4 hours and turns into chyme.',
        zh: '搅拌食物并加入胃液的肌肉囊：盐酸和一种叫胃蛋白酶的蛋白酶。酸杀灭大多数细菌；低 pH（~2）是胃蛋白酶工作所需。食物停留 2–4 小时变成食糜。',
      },
      syllabus: ['0610.7.2.1'],
    },
    {
      en: 'small intestine',
      zh: '小肠',
      definition: {
        en: 'About 6 m long. Where digestion is finished and the products are absorbed. Its wall is folded into villi and microvilli giving a huge surface area for fast absorption into blood and lymph.',
        zh: '约 6 米长。是消化完成、产物被吸收的地方。管壁折叠成绒毛和微绒毛，提供巨大的表面积，使营养能快速吸收到血液和淋巴。',
      },
      syllabus: ['0610.7.2.1'],
    },
    {
      en: 'large intestine',
      zh: '大肠',
      definition: {
        en: 'About 1.5 m long. Reabsorbs water and salts from undigested food, turning it from liquid into solid faeces. Bacteria here also make vitamin K, which the body absorbs.',
        zh: '约 1.5 米长。从未消化的食物中重吸收水分和盐，将其由液体变为固体粪便。此处的细菌还制造维生素 K，被身体吸收。',
      },
      syllabus: ['0610.7.2.1'],
    },
    {
      en: 'rectum',
      zh: '直肠',
      definition: {
        en: 'The final straight section of the large intestine. Stores faeces until they are released through the anus.',
        zh: '大肠的最后一段直管。储存粪便直至通过肛门排出。',
      },
      syllabus: ['0610.7.2.1'],
    },
    {
      en: 'anus',
      zh: '肛门',
      definition: {
        en: 'The opening at the end of the digestive tract through which faeces leave the body. Its opening is controlled by a ring of muscle (sphincter).',
        zh: '消化道末端的开口，粪便由此排出体外。其开合由一圈肌肉（括约肌）控制。',
      },
      syllabus: ['0610.7.2.1'],
    },
    {
      en: 'peristalsis',
      zh: '蠕动',
      definition: {
        en: 'A wave of muscular contraction that pushes food along the oesophagus and through the gut. The muscles behind the food squeeze, those in front relax.',
        zh: '沿食道和肠道推送食物的肌肉收缩波。食物后方的肌肉收缩挤压，前方的肌肉舒张让路。',
      },
      syllabus: ['0610.7.2.2'],
    },
    {
      en: 'amylase',
      zh: '淀粉酶',
      definition: {
        en: 'An enzyme in saliva and pancreatic juice that breaks starch down to maltose (a sugar). Works best at a near-neutral pH.',
        zh: '唾液和胰液中的酶，把淀粉分解为麦芽糖（一种糖）。在接近中性的 pH 下活性最高。',
      },
      syllabus: ['0610.7.2.3'],
    },
    {
      en: 'pepsin',
      zh: '胃蛋白酶',
      definition: {
        en: 'A protease enzyme in the stomach. Breaks proteins into smaller polypeptides. Works only in acidic conditions (pH ~2) provided by hydrochloric acid in gastric juice.',
        zh: '胃中的蛋白酶，把蛋白质分解为较小的多肽。只在酸性条件（pH ~2）下工作，由胃液中的盐酸提供此环境。',
      },
      syllabus: ['0610.7.2.3'],
    },
    {
      en: 'lipase',
      zh: '脂肪酶',
      definition: {
        en: 'An enzyme that breaks fats into fatty acids and glycerol. Made by the pancreas and released into the small intestine, where bile has already emulsified the fat into tiny droplets.',
        zh: '把脂肪分解为脂肪酸和甘油的酶。由胰腺制造，释放入小肠——此处胆汁已把脂肪乳化成小滴。',
      },
      syllabus: ['0610.7.2.3'],
    },
    {
      en: 'protease',
      zh: '蛋白酶',
      definition: {
        en: 'A general term for an enzyme that breaks proteins into amino acids. Pepsin (stomach) and trypsin (pancreas) are two examples.',
        zh: '把蛋白质分解为氨基酸的酶的通称。胃蛋白酶（胃）和胰蛋白酶（胰腺）是两个例子。',
      },
      syllabus: ['0610.7.2.3'],
    },
    {
      en: 'glucose',
      zh: '葡萄糖',
      definition: {
        en: 'A simple sugar. The main sugar carried in the blood and the main energy source for cells. Made by digestion of starch and by photosynthesis in plants.',
        zh: '一种单糖。血液中运输的主要糖类，是细胞的主要能量来源。由淀粉消化产生，也由植物光合作用产生。',
      },
      syllabus: ['0610.7.2.4'],
    },
    {
      en: 'amino acid',
      zh: '氨基酸',
      definition: {
        en: 'The small soluble molecule that proteins are made of. Absorbed through the villi of the small intestine and used by the body to build its own proteins.',
        zh: '组成蛋白质的小的可溶性分子。通过小肠绒毛吸收，被身体用来构建自身的蛋白质。',
      },
      syllabus: ['0610.7.2.4'],
    },
    {
      en: 'fatty acid',
      zh: '脂肪酸',
      definition: {
        en: 'One of the products of fat digestion. Absorbed into the lacteal (lymph vessel) of a villus, not directly into the blood.',
        zh: '脂肪消化的产物之一。被吸收进绒毛的乳糜管（淋巴管），而不是直接进入血液。',
      },
      syllabus: ['0610.7.2.4'],
    },
    {
      en: 'glycerol',
      zh: '甘油',
      definition: {
        en: 'The other product of fat digestion (along with fatty acids). Absorbed into the lacteal of a villus. Can be converted to glucose by the liver.',
        zh: '脂肪消化的另一产物（与脂肪酸一起）。被吸收进绒毛的乳糜管。可由肝脏转化为葡萄糖。',
      },
      syllabus: ['0610.7.2.4'],
    },
    {
      en: 'absorption',
      zh: '吸收',
      definition: {
        en: 'The movement of digested food molecules through the wall of the small intestine into the blood (and lymph). Happens mainly across the villi.',
        zh: '已消化的食物分子穿过小肠壁进入血液（或淋巴）的过程。主要发生在绒毛表面。',
      },
      syllabus: ['0610.7.2.5'],
    },
    {
      en: 'assimilation',
      zh: '同化',
      definition: {
        en: 'The uptake and use of absorbed nutrients by body cells. Glucose is used for respiration; amino acids are used to build new proteins.',
        zh: '被吸收的营养物质被体细胞摄取并利用的过程。葡萄糖用于呼吸作用；氨基酸用于构建新的蛋白质。',
      },
      syllabus: ['0610.7.2.6'],
    },
    {
      en: 'deficiency',
      zh: '营养缺乏',
      definition: {
        en: 'A shortage of a nutrient in the diet. Common examples: vitamin C deficiency → scurvy; vitamin D / calcium deficiency → rickets; iron deficiency → anaemia; protein + energy deficiency → kwashiorkor or marasmus.',
        zh: '饮食中某种营养素的短缺。常见例子：缺维生素 C → 坏血病；缺维生素 D/钙 → 佝偻病；缺铁 → 贫血；缺蛋白质+能量 → 恶性营养不良病或消瘦症。',
      },
      syllabus: ['0610.7.1.5'],
    },
  ],

  // The content here is a web of one-to-one facts rather than a relationship between
  // quantities, so there is nothing to write as an equation.
  equations: [],

  sim: {
    primitive: 'match',
    kernel: '7-1-nutrition',
    hint: {
      en: 'Pick one on the left, then its partner on the right. Click a paired item to undo it.',
      zh: '先选左侧的一项，再点击右侧与之配对的一项。点击已配对的条目可撤销。',
    },
    params: [
      {
        key: 'stage',
        label: { en: 'Exercise', zh: '练习' },
        unit: '',
        min: 1,
        max: 4,
        step: 1,
        default: 1,
        options: [
          { value: 1, label: { en: 'Nutrients', zh: '营养素' } },
          { value: 2, label: { en: 'Organs', zh: '器官' } },
          { value: 3, label: { en: 'Enzymes', zh: '酶' } },
          { value: 4, label: { en: 'Absorption', zh: '吸收' } },
        ],
      },
      ...placementParams(ALL_ITEMS, MAX_TARGETS),
    ],
    readouts: [
      { key: 'correct', label: { en: 'Correct', zh: '正确' }, unit: '', sigFigs: 2, exact: true },
      { key: 'paired', label: { en: 'Paired', zh: '已配对' }, unit: '', sigFigs: 2, exact: true },
      { key: 'total', label: { en: 'Pairs', zh: '配对总数' }, unit: '', sigFigs: 2, exact: true },
    ],
  },

  narration,

  // Visual / interactive learning modules. See src/content/types.ts for the
  // `LessonExtra` shape — each one is data, the renderers live in
  // src/components/lesson-extras/.
  extras: [
    {
      type: 'digestive-anatomy',
      id: 'anatomy',
      title: { en: 'The digestive system, in one picture', zh: '一张图看消化系统' },
      hint: {
        en: 'Click an organ to read about it. "Follow the food" animates a bolus mouth → anus.',
        zh: '点击任一器官阅读。点"跟着食物走一遍"会动画演示食物从口到肛门的旅程。',
      },
      initialOrgan: 'stomach',
      organs: [
        {
          id: 'mouth',
          name: { en: 'Mouth', zh: '口腔' },
          stop: 1,
          description: {
            en: 'Where physical digestion starts. Teeth tear and grind the food into smaller pieces, and saliva — made by three pairs of salivary glands — wets it and adds amylase, which begins breaking starch down to maltose.',
            zh: '物理性消化的起点。牙齿把食物咬碎磨细，三对唾液腺分泌的唾液湿润食物并加入淀粉酶，开始将淀粉分解为麦芽糖。',
          },
          secretions: [
            { en: 'Saliva', zh: '唾液' },
            { en: 'Amylase', zh: '淀粉酶' },
            { en: 'Mucus', zh: '黏液' },
          ],
        },
        {
          id: 'oesophagus',
          name: { en: 'Oesophagus', zh: '食道' },
          stop: 2,
          description: {
            en: 'A muscular tube that pushes food down to the stomach. Food does not fall — the walls squeeze behind it in a wave called peristalsis. This works even if you are upside down, which is why astronauts can eat in space.',
            zh: '将食物推送到胃的肌肉管道。食物不是靠重力，而是靠管壁从后面挤压的蠕动波送下去的——倒立也能咽下去，所以宇航员在太空中照样能吃东西。',
          },
        },
        {
          id: 'stomach',
          name: { en: 'Stomach', zh: '胃' },
          stop: 3,
          description: {
            en: 'A muscular sac that churns the food and adds gastric juice: hydrochloric acid and a protease called pepsin. The acid kills most bacteria, and the low pH (~2) is what the protease needs to work. Food stays here for 2–4 hours and turns into a thick liquid called chyme.',
            zh: '肌肉质的囊袋，搅拌食物并加入胃液：盐酸与一种叫胃蛋白酶的蛋白酶。盐酸杀死大部分细菌，pH≈2 的强酸环境正是胃蛋白酶所需。食物在此停留 2–4 小时，被搅成稠糊状的食糜。',
          },
          secretions: [
            { en: 'HCl (pH ≈ 2)', zh: '盐酸（pH≈2）' },
            { en: 'Pepsin', zh: '胃蛋白酶' },
            { en: 'Mucus', zh: '黏液' },
          ],
        },
        {
          id: 'liver',
          name: { en: 'Liver', zh: '肝脏' },
          description: {
            en: 'The body’s chemical factory. Among many other jobs, it makes bile, which is shipped to the gall bladder for storage. It also processes the absorbed nutrients from the small intestine.',
            zh: '身体的化工厂。除了众多功能之外，它生成胆汁，运到胆囊贮存。它也处理从小肠吸收来的营养物质。',
          },
          secretions: [{ en: 'Bile', zh: '胆汁' }],
        },
        {
          id: 'gall-bladder',
          name: { en: 'Gall bladder', zh: '胆囊' },
          description: {
            en: 'A small bag under the liver that stores bile and squirts it into the small intestine when fatty food arrives. It is a storage organ, not a gland — the liver is the gland that *makes* bile.',
            zh: '肝脏下方的小囊袋，贮存胆汁。当含脂肪的食物到达小肠时，它就把胆汁挤入小肠。它是贮存器官，不是腺体——制造胆汁的腺体是肝脏。',
          },
        },
        {
          id: 'pancreas',
          name: { en: 'Pancreas', zh: '胰腺' },
          description: {
            en: 'Both a gland and an organ. As a gland it pours three enzymes into the small intestine (amylase, protease, lipase) plus sodium hydrogencarbonate, which neutralises the acid arriving from the stomach. Without the neutralising step, the pancreatic enzymes could not work — they need a pH of 7–8.',
            zh: '既是腺体也是器官。作为腺体，它向小肠注入三种酶（淀粉酶、蛋白酶、脂肪酶）以及碳酸氢钠，后者把从胃来的酸中和掉。没有这一步，胰腺酶根本无法工作——它们需要 pH 7–8 的环境。',
          },
          secretions: [
            { en: 'Amylase', zh: '淀粉酶' },
            { en: 'Protease', zh: '蛋白酶' },
            { en: 'Lipase', zh: '脂肪酶' },
            { en: 'NaHCO₃', zh: '碳酸氢钠' },
          ],
        },
        {
          id: 'small-intestine',
          name: { en: 'Small intestine', zh: '小肠' },
          stop: 4,
          description: {
            en: 'About 6 metres long, and the place where digestion is finished and the products are absorbed. The wall is folded into villi and microvilli that give it the surface area of a tennis court, so glucose, amino acids, fatty acids and glycerol can cross into the blood and lymph fast enough to keep you alive.',
            zh: '约 6 米长，是消化完成、产物被吸收的场所。肠壁皱成绒毛与微绒毛，表面积达一个网球场那么大，葡萄糖、氨基酸、脂肪酸和甘油才得以足够快地进入血液和淋巴，让你活着。',
          },
        },
        {
          id: 'large-intestine',
          name: { en: 'Large intestine (colon)', zh: '大肠（结肠）' },
          stop: 5,
          description: {
            en: 'About 1.5 metres long. Its job is to absorb water and salts from what is left, and to consolidate the remains into faeces. The bacteria living here also make vitamin K, which the body absorbs.',
            zh: '约 1.5 米长。任务是吸收残渣中的水分和盐分，并把残渣固化成粪便。这里的细菌还制造维生素 K，被身体吸收。',
          },
        },
        {
          id: 'anus',
          name: { en: 'Anus', zh: '肛门' },
          stop: 6,
          description: {
            en: 'The end of the line. A sphincter muscle holds the faeces in until it is socially acceptable to release them. This is egestion, not excretion — the material has never been inside the body in the sense of crossing a cell membrane.',
            zh: '消化道的终点。括约肌把粪便关在里面，直到社交上可以释放时。这一步叫排遗（egestion），不是排泄（excretion）——这些物质从未穿过细胞膜进入体内。',
          },
        },
      ],
    },
    {
      type: 'balanced-plate',
      id: 'plate',
      title: { en: 'Build a balanced plate', zh: '搭一盘均衡膳食' },
      hint: {
        en: 'Click a food to add it. Aim for at least 2 veg, 1 fruit, 1 protein, 1 carb, 1 dairy, and a small amount of healthy fat.',
        zh: '点击食物加入餐盘。目标是至少 2 份蔬菜、1 份水果、1 份蛋白质、1 份碳水、1 份乳制品，和少量健康脂肪。',
      },
      targets: { veg: 2, fruit: 1, protein: 1, carb: 1, dairy: 1, fat: 1 },
      foods: [
        { id: 'broccoli', group: 'veg', glyph: '🥦', name: { en: 'Broccoli', zh: '西兰花' } },
        { id: 'carrot', group: 'veg', glyph: '🥕', name: { en: 'Carrot', zh: '胡萝卜' } },
        { id: 'spinach', group: 'veg', glyph: '🥬', name: { en: 'Spinach', zh: '菠菜' } },
        { id: 'apple', group: 'fruit', glyph: '🍎', name: { en: 'Apple', zh: '苹果' } },
        { id: 'orange', group: 'fruit', glyph: '🍊', name: { en: 'Orange', zh: '橙子' } },
        { id: 'banana', group: 'fruit', glyph: '🍌', name: { en: 'Banana', zh: '香蕉' } },
        { id: 'chicken', group: 'protein', glyph: '🍗', name: { en: 'Chicken', zh: '鸡肉' } },
        { id: 'fish', group: 'protein', glyph: '🐟', name: { en: 'Fish', zh: '鱼肉' } },
        { id: 'eggs', group: 'protein', glyph: '🥚', name: { en: 'Eggs', zh: '鸡蛋' } },
        { id: 'beans', group: 'protein', glyph: '🫘', name: { en: 'Beans', zh: '豆类' } },
        { id: 'rice', group: 'carb', glyph: '🍚', name: { en: 'Rice', zh: '米饭' } },
        { id: 'bread', group: 'carb', glyph: '🍞', name: { en: 'Bread', zh: '面包' } },
        { id: 'potato', group: 'carb', glyph: '🥔', name: { en: 'Potato', zh: '马铃薯' } },
        { id: 'milk', group: 'dairy', glyph: '🥛', name: { en: 'Milk', zh: '牛奶' } },
        { id: 'cheese', group: 'dairy', glyph: '🧀', name: { en: 'Cheese', zh: '奶酪' } },
        { id: 'yogurt', group: 'dairy', glyph: '🍦', name: { en: 'Yoghurt', zh: '酸奶' } },
        { id: 'nuts', group: 'fat', glyph: '🥜', name: { en: 'Nuts', zh: '坚果' } },
        { id: 'olive-oil', group: 'fat', glyph: '🫒', name: { en: 'Olive oil', zh: '橄榄油' } },
        { id: 'avocado', group: 'fat', glyph: '🥑', name: { en: 'Avocado', zh: '牛油果' } },
      ],
    },
    {
      type: 'teeth-anatomy',
      id: 'teeth',
      title: { en: 'Teeth — the four types, and the parts of one', zh: '牙齿——四种形状，一颗牙的层次' },
      hint: {
        en: 'Click a layer of the tooth to read what it does, then click each tooth type below.',
        zh: '点击牙齿任一层了解作用，再点击下方四种牙齿。',
      },
      layers: [
        {
          id: 'enamel',
          name: { en: 'Enamel', zh: '牙釉质' },
          description: {
            en: 'The hardest substance in the body — almost pure calcium phosphate. It covers the crown and takes the chewing force. It cannot grow back once it is gone, which is why dentists fill cavities rather than waiting for them to heal.',
            zh: '人体最硬的物质——几乎是纯的磷酸钙。覆盖在牙冠，承受咬合力。一旦磨损就再也长不回来，所以牙医补牙而不是等它自己长好。',
          },
        },
        {
          id: 'dentine',
          name: { en: 'Dentine', zh: '牙本质' },
          description: {
            en: 'A bone-like layer under the enamel. Dentine makes up most of the tooth and contains microscopic channels that lead to the pulp — which is why a cavity that reaches the dentine can be very sensitive.',
            zh: '釉质下面像骨头的一层，构成牙齿的大部分，内有通向牙髓的微管——所以龋齿一旦深及牙本质就会非常敏感。',
          },
        },
        {
          id: 'pulp',
          name: { en: 'Pulp', zh: '牙髓' },
          description: {
            en: 'The soft centre. Contains the blood vessels that keep the tooth alive and the nerves that signal "this hurts, stop chewing here". A tooth that has lost its pulp is "dead" — it can stay in the jaw, but it becomes brittle and may eventually need to be removed.',
            zh: '牙齿中央的软组织。内有血管维持牙齿活着，有神经负责报告"疼，别咬这边"。失去牙髓的牙是"死牙"——可以留在牙床里，但会变脆，最终可能需要拔除。',
          },
        },
        {
          id: 'cementum',
          name: { en: 'Cementum', zh: '牙骨质' },
          description: {
            en: 'Covers the root, anchoring it to the jawbone via the periodontal ligament. It is much softer than enamel — which is why root decay (a common problem in older adults) advances faster than decay in the crown.',
            zh: '覆盖牙根，通过牙周韧带把牙齿固定在牙槽骨上。比釉质软得多——所以牙根的龋坏（老年人常见）比牙冠的龋坏进展更快。',
          },
        },
      ],
      kinds: [
        {
          id: 'incisor',
          name: { en: 'Incisor', zh: '切牙' },
          count: 8,
          role: {
            en: 'Flat, chisel-shaped, at the front. They bite off pieces of food — think of them as the knives.',
            zh: '扁平凿形，位于最前面。负责把食物咬下来——把它们想成刀。',
          },
        },
        {
          id: 'canine',
          name: { en: 'Canine', zh: '尖牙（犬牙）' },
          count: 4,
          role: {
            en: 'Pointed, next to the incisors. They tear and grip — useful for meat, fruit with skin, and refusing to let go of a stubborn sweet wrapper.',
            zh: '尖锥形，紧邻切牙。负责撕裂和抓紧——吃肉、带皮水果、撕不开的糖纸都靠它。',
          },
        },
        {
          id: 'premolar',
          name: { en: 'Premolar', zh: '前磨牙' },
          count: 8,
          role: {
            en: 'Two-cusped, behind the canines. They crush and grind — the start of the chewing process.',
            zh: '两个牙尖，位于尖牙之后。负责压碎和研磨——咀嚼从这里开始。',
          },
        },
        {
          id: 'molar',
          name: { en: 'Molar', zh: '磨牙' },
          count: 12,
          role: {
            en: 'Four-cusped, the largest teeth, right at the back. The grinders — food is small enough to swallow by the time it leaves them.',
            zh: '四个牙尖，体型最大，位于最靠后。研磨的主力——食物过了它们之后已经碎到可以咽下去了。',
          },
        },
      ],
    },
    {
      type: 'bile-emulsification',
      id: 'emulsification',
      title: { en: 'Bile — one big drop becomes many small ones', zh: '胆汁——一大滴脂肪变成许多小滴' },
      hint: {
        en: 'The yellow drop is fat. Adding bile does not break any bonds — it just shatters the drop into smaller ones. Each small drop is the same total amount of fat, but with much more surface for lipase to reach.',
        zh: '黄色的是脂肪。加入胆汁并没有打断任何化学键，只是把大滴打成小滴。每滴还是同样多的脂肪，但脂肪酶可接触的表面积大得多。',
      },
    },
    {
      type: 'villi-surface-area',
      id: 'villi',
      title: { en: 'Why villi — the area maths', zh: '为什么要绒毛——表面积的数学' },
      hint: {
        en: 'A flat tube has the area you would expect. Folding it into villi multiplies that area. Adding microvilli on each villus multiplies it again.',
        zh: '光管的表面积就那么大。把它折成绒毛，表面积成倍增长；每根绒毛上再加一层微绒毛，又再翻几倍。',
      },
      // Real numbers for the small intestine: ~2.5 cm radius, ~6 m long.
      radiusMm: 25,
      lengthMm: 6000,
      baselineVilliPerCm2: 30,
    },
    {
      type: 'digestion-flow',
      id: 'flow',
      title: { en: 'The whole journey, in order', zh: '消化全程，按顺序' },
      hint: {
        en: 'A sandwich to a faeces in five steps. Click a definition card below to read the formal term.',
        zh: '从三明治到粪便的五步旅程。点击下方任一释义卡查看正式术语。',
      },
      stages: [
        {
          id: 'mouth',
          label: { en: 'Mouth', zh: '口腔' },
          summary: { en: 'food enters; teeth grind', zh: '食物入内；牙齿咀嚼' },
        },
        {
          id: 'stomach',
          label: { en: 'Stomach', zh: '胃' },
          summary: { en: 'HCl + pepsin churn it', zh: '盐酸+胃蛋白酶搅拌' },
        },
        {
          id: 'small-intestine',
          label: { en: 'Small intestine', zh: '小肠' },
          summary: { en: 'enzymes finish the job; absorbed', zh: '酶收尾；产物被吸收' },
        },
        {
          id: 'body',
          label: { en: 'Body cells', zh: '体内细胞' },
          summary: { en: 'nutrients are used', zh: '营养物质被利用' },
        },
        {
          id: 'anus',
          label: { en: 'Anus', zh: '肛门' },
          summary: { en: 'waste leaves the body', zh: '废物排出体外' },
        },
      ],
      definitions: [
        {
          id: 'ingestion',
          term: { en: 'Ingestion', zh: '摄食' },
          definition: {
            en: 'Taking food into the body through the mouth.',
            zh: '把食物经口腔摄入体内。',
          },
        },
        {
          id: 'mechanical-digestion',
          term: { en: 'Mechanical digestion', zh: '物理性消化' },
          definition: {
            en: 'Breaking food into smaller pieces without changing any molecule — done by teeth and the churning of the stomach.',
            zh: '把食物弄成更小的碎块而不改变任何分子——由牙齿和胃的搅拌完成。',
          },
        },
        {
          id: 'chemical-digestion',
          term: { en: 'Chemical digestion', zh: '化学性消化' },
          definition: {
            en: 'Breaking large insoluble molecules into small soluble ones using enzymes.',
            zh: '用酶把大的不溶分子分解为小的可溶分子。',
          },
        },
        {
          id: 'absorption',
          term: { en: 'Absorption', zh: '吸收' },
          definition: {
            en: 'The products of digestion moving across the wall of the small intestine into the blood and lymph.',
            zh: '消化产物穿过小肠壁进入血液和淋巴。',
          },
        },
        {
          id: 'assimilation',
          term: { en: 'Assimilation', zh: '同化' },
          definition: {
            en: 'Absorbed nutrients being taken up and used by the body\'s cells for energy, growth and repair.',
            zh: '被吸收的营养物质被身体细胞摄取并用于供能、生长和修复。',
          },
        },
        {
          id: 'egestion',
          term: { en: 'Egestion', zh: '排遗' },
          definition: {
            en: 'Passing out of material that has never crossed the gut wall — faeces are egested, not excreted.',
            zh: '把从未穿过肠壁的物质排出体外——粪便属于排遗，而非排泄。',
          },
        },
      ],
    },
    {
      type: 'villus-detail',
      id: 'villus',
      title: { en: 'Inside one villus — the four named parts', zh: '一根绒毛的内部——四个有名有姓的部分' },
      hint: {
        en: 'Click any part of the villus to read what it does. The transport list on the right shows where each nutrient goes after crossing the wall.',
        zh: '点击绒毛任一部分了解其作用。右侧列表展示每种营养物质穿过肠壁后去向何处。',
      },
      parts: [
        {
          id: 'epithelium',
          name: { en: 'Epithelium', zh: '上皮组织' },
          side: 'outside',
          description: {
            en: 'A single layer of cells wrapping the villus. The fact that it is one cell thick keeps the diffusion distance short, so nutrients cross fast.',
            zh: '包裹绒毛的单层细胞。厚度仅一个细胞，扩散距离极短，营养物质能快速通过。',
          },
        },
        {
          id: 'microvilli',
          name: { en: 'Microvilli', zh: '微绒毛' },
          side: 'surface',
          description: {
            en: 'Tiny finger-like folds on the outer surface of each epithelial cell. They multiply the surface area a further ×20, giving the small intestine the area of a tennis court.',
            zh: '每个上皮细胞外表面的微小指状突起。再使表面积增加约 20 倍，使小肠总面积达到一个网球场大小。',
          },
        },
        {
          id: 'capillary',
          name: { en: 'Capillary network', zh: '毛细血管网' },
          side: 'inside',
          description: {
            en: 'A dense mesh of tiny blood vessels just under the epithelium. Glucose and amino acids pass into the blood here and are carried away, keeping a steep concentration gradient.',
            zh: '上皮下致密的毛细血管网。葡萄糖和氨基酸在此进入血液并被运走，保持着陡峭的浓度梯度。',
          },
        },
        {
          id: 'lacteal',
          name: { en: 'Lacteal', zh: '乳糜管' },
          side: 'core',
          description: {
            en: 'A single lymph vessel running through the core of the villus. Fatty acids and glycerol, which are not soluble in water, are taken up here instead of into the blood.',
            zh: '贯穿绒毛中央的单根淋巴管。不溶于水的脂肪酸和甘油由此进入淋巴，而非血液。',
          },
        },
      ],
      transport: [
        {
          id: 'glucose',
          name: { en: 'Glucose', zh: '葡萄糖' },
          destination: { en: 'capillary → blood', zh: '毛细血管 → 血液' },
        },
        {
          id: 'amino-acids',
          name: { en: 'Amino acids', zh: '氨基酸' },
          destination: { en: 'capillary → blood', zh: '毛细血管 → 血液' },
        },
        {
          id: 'fatty-acids',
          name: { en: 'Fatty acids', zh: '脂肪酸' },
          destination: { en: 'lacteal → lymph', zh: '乳糜管 → 淋巴' },
        },
        {
          id: 'glycerol',
          name: { en: 'Glycerol', zh: '甘油' },
          destination: { en: 'lacteal → lymph', zh: '乳糜管 → 淋巴' },
        },
      ],
    },
    {
      type: 'food-energy',
      id: 'energy',
      title: { en: 'Same mass, very different energy', zh: '同样质量，能量差别很大' },
      hint: {
        en: 'Fat carries more than twice the energy of the same mass of carbohydrate or protein. That single fact explains most of the obesity story.',
        zh: '脂肪的能量是同质量碳水化合物或蛋白质的两倍以上。仅这一条事实就解释了大多数肥胖问题。',
      },
      foods: [
        { id: 'olive-oil', name: { en: 'Olive oil', zh: '橄榄油' }, energy: 3700, group: 'fat' },
        { id: 'butter', name: { en: 'Butter', zh: '黄油' }, energy: 3030, group: 'fat' },
        { id: 'nuts', name: { en: 'Nuts (mixed)', zh: '混合坚果' }, energy: 2400, group: 'fat' },
        { id: 'chocolate', name: { en: 'Plain chocolate', zh: '黑巧克力' }, energy: 2300, group: 'mixed' },
        { id: 'chips', name: { en: 'Potato chips', zh: '薯片' }, energy: 2300, group: 'mixed' },
        { id: 'biscuits', name: { en: 'Biscuits', zh: '饼干' }, energy: 2050, group: 'mixed' },
        { id: 'cheese', name: { en: 'Cheddar cheese', zh: '切达奶酪' }, energy: 1700, group: 'dairy' },
        { id: 'bread', name: { en: 'White bread', zh: '白面包' }, energy: 1000, group: 'carb' },
        { id: 'eggs', name: { en: 'Boiled egg', zh: '水煮蛋' }, energy: 600, group: 'protein' },
        { id: 'rice', name: { en: 'Boiled rice', zh: '白米饭' }, energy: 540, group: 'carb' },
        { id: 'chicken', name: { en: 'Chicken breast', zh: '鸡胸肉' }, energy: 500, group: 'protein' },
        { id: 'banana', name: { en: 'Banana', zh: '香蕉' }, energy: 400, group: 'fruit-veg' },
        { id: 'fish', name: { en: 'White fish', zh: '白鱼肉' }, energy: 350, group: 'protein' },
        { id: 'potato', name: { en: 'Boiled potato', zh: '水煮土豆' }, energy: 350, group: 'carb' },
        { id: 'milk', name: { en: 'Whole milk', zh: '全脂牛奶' }, energy: 270, group: 'dairy' },
        { id: 'apple', name: { en: 'Apple', zh: '苹果' }, energy: 200, group: 'fruit-veg' },
      ],
    },
    {
      type: 'disease-cards',
      id: 'diseases',
      title: {
        en: 'Deficiency and lifestyle diseases — what they actually look like',
        zh: '缺乏症与生活方式病——它们到底长什么样',
      },
      hint: {
        en: 'Real pictures from the source material, the mechanism, and the clinical picture for each. These are the diseases the G8 Science chapter-1.5 block names by name.',
        zh: '讲义原图 + 原理 + 临床表现。讲义 Chapter 1.5 中按名提到的所有疾病。',
      },
      cards: [
        {
          id: 'rickets',
          term: { en: 'Rickets', zh: '佝偻病' },
          image: '/figures/g8/7-1-nutrition/image-b5-07.png',
          imageSource: { en: 'G8 Science · Vitamin D table (Chapter 1.1)', zh: '讲义 Chapter 1.1 维生素 D 表' },
          severity: 'deficiency',
          mechanism: {
            en: 'Vitamin D is needed for calcium to be absorbed from the gut into the blood. Without it, calcium in the diet cannot enter the body — so the bones of a growing child stay soft and bend under the body\'s weight.',
            zh: '维生素 D 是肠道吸收钙的必需物质。没有它，食物中的钙不能进入身体——正在长身体的孩子骨头会保持柔软，承受不住体重就弯曲变形。',
          },
          clinical: {
            en: 'Bones, especially the legs, become soft and deformed: knees bow outward, ankles turn in, spine curves. Once common in industrial cities where children rarely went outside — sunlight on the skin makes vitamin D, and oily fish is a dietary source.',
            zh: '骨骼（尤其腿骨）变软变形：膝盖外翻（O 型腿）、踝内翻、脊柱弯曲。过去工业城市里少见阳光的孩子常发此病——阳光照皮肤能合成维生素 D，含油多的鱼是食物来源。',
          },
        },
        {
          id: 'scurvy',
          term: { en: 'Scurvy', zh: '坏血症' },
          image: '/figures/g8/7-1-nutrition/image-b5-07.png',
          imageSource: { en: 'G8 Science · Vitamin C table (Chapter 1.1)', zh: '讲义 Chapter 1.1 维生素 C 表' },
          severity: 'deficiency',
          mechanism: {
            en: 'Vitamin C is needed to make collagen, the stretchy protein that holds skin, blood-vessel walls, gums and connective tissue together. Without it, the body cannot maintain these tissues — they become fragile, and any wound takes much longer to close.',
            zh: '维生素 C 是合成胶原蛋白的必需物质。胶原蛋白是把皮肤、血管壁、牙龈、结缔组织黏合起来的弹性蛋白。没有它，这些组织变得脆弱，伤口也难愈合。',
          },
          clinical: {
            en: 'Bleeding gums, loose teeth, bruises without injury, wounds that will not heal, joint and muscle pain, fatigue. Historically common in sailors on long voyages with no fresh fruit — it killed thousands on 18th-century ocean voyages until lemon juice became a daily ration.',
            zh: '牙龈出血、牙齿松动、无故淤青、伤口不愈、关节肌肉疼痛、疲倦。历史上常见于长期航行吃不到新鲜水果的水手——18 世纪远洋航行中因此病死亡者成千上万。后来每日配给柠檬汁治好了它。',
          },
        },
        {
          id: 'kwashiorkor',
          term: { en: 'Kwashiorkor', zh: '恶性营养不良' },
          image: '/figures/g8/7-1-nutrition/image-b5-06.png',
          imageSource: { en: 'G8 Science · p.10, Image B5.06', zh: '讲义 p.10，Image B5.06' },
          severity: 'severe',
          mechanism: {
            en: 'A diet that contains enough energy (carbohydrate, fat) but lacks enough protein. The liver cannot make enough of the blood proteins that hold fluid inside the blood vessels, so fluid leaks into the tissues — this is why a kwashiorkor child has a swollen belly while still being underweight overall.',
            zh: '能量（碳水、脂肪）足够但严重缺蛋白的饮食。肝脏合成不出足够的血浆蛋白来锁住血管里的水分，于是液体渗到组织里——这就是恶性营养不良患儿肚子鼓胀但整体体重偏低的原因。',
          },
          clinical: {
            en: 'Swollen belly (oedema — fluid in the tissues), reddish or thinning hair, skin that flakes and tears easily, enlarged liver. Common in children 9 months to 2 years weaned off breast milk onto a low-protein diet. A high-protein diet usually reverses it.',
            zh: '腹部鼓胀（水肿——液体渗到组织中）、头发发红变稀、皮肤易剥落、肝脏肿大。常发生在 9 个月到 2 岁、断奶后改吃低蛋白食物的孩子。改吃高蛋白饮食通常能逆转。',
          },
        },
        {
          id: 'marasmus',
          term: { en: 'Marasmus', zh: '消瘦症' },
          image: '/figures/g8/7-1-nutrition/image-b5-06.png',
          imageSource: { en: 'G8 Science · p.10, severe malnutrition', zh: '讲义 p.10 严重营养不良' },
          severity: 'severe',
          mechanism: {
            en: 'A diet lacking both protein AND energy — overall starvation. The body, starved of fuel and building blocks, breaks down its own muscle and fat. Unlike kwashiorkor, fluid balance is preserved — the child just wastes away.',
            zh: '蛋白质和能量都严重缺乏——整体饥饿。身体既缺燃料又缺建材，只好分解自身的肌肉和脂肪。跟恶性营养不良不同，液体平衡没破——孩子就是单纯地消瘦下去。',
          },
          clinical: {
            en: 'A child who looks emaciated — no fat under the skin, muscles wasted, ribs and shoulder blades visible, "old man" face from loss of the fat pads under the skin. The most severe form of malnutrition. Recovery requires sustained re-feeding with both protein and energy.',
            zh: '患儿极度消瘦——皮下无脂肪、肌肉萎缩、肋骨和肩胛骨清晰可见、皮下脂肪垫消失导致"小老人"面容。营养不良的最严重形式。恢复需要持续补充蛋白质和能量。',
          },
        },
        {
          id: 'coronary-heart-disease',
          term: { en: 'Coronary heart disease (CHD)', zh: '冠心病（CHD）' },
          image: '/figures/g8/7-1-nutrition/image-b5-05.png',
          imageSource: { en: 'G8 Science · p.8-9, saturated fat & heart disease', zh: '讲义 p.8-9 饱和脂肪与心脏病' },
          severity: 'lifestyle',
          mechanism: {
            en: 'The coronary arteries supply the heart muscle with blood. Diets high in saturated fat and cholesterol cause fatty deposits to build up on the inside walls of these arteries, making them stiffer and narrower. Less blood gets through — the heart muscle runs short of oxygen and cannot work properly.',
            zh: '冠状动脉是为心肌本身供血的血管。高饱和脂肪和胆固醇饮食会让脂肪沉积堆积在这些动脉内壁，让它们变硬变窄。血流减少，心肌缺氧，无法正常工作。',
          },
          clinical: {
            en: 'The deposits can trigger a blood clot, which can suddenly block the artery — a heart attack. Symptoms: chest pain (especially on exertion), breathlessness, pain radiating down the left arm. Risk factors: high saturated-fat diet, smoking, lack of exercise, family history.',
            zh: '沉积物可能引发血栓突然完全堵住动脉——这就是心肌梗塞。症状：胸痛（尤其在用力时）、气短、左臂放射性疼痛。危险因素：高饱和脂肪饮食、吸烟、缺乏运动、家族史。',
          },
        },
        {
          id: 'obesity',
          term: { en: 'Obesity', zh: '肥胖' },
          image: '/figures/g8/7-1-nutrition/image-b5-05.png',
          imageSource: { en: 'G8 Science · p.9, Image B5.05', zh: '讲义 p.9，Image B5.05' },
          severity: 'lifestyle',
          mechanism: {
            en: 'Energy in, energy out. If a person takes in more food energy than they use up, the surplus is stored — mostly as fat under the skin and around the organs. Over months and years this accumulates to a level that is harmful to health.',
            zh: '能量进出平衡。如果一个人摄入的能量长期超过消耗，多余的部分就存起来——主要是皮下和内脏周围的脂肪。积月累年到危害健康的程度就是肥胖。',
          },
          clinical: {
            en: 'Excess body fat, especially concentrated around the middle (the "apple" shape), is linked to higher risk of coronary heart disease, strokes, type-2 diabetes, and joint problems in the knees and hips. Most people can control weight with normal balanced meals and regular exercise — crash diets tend to fail.',
            zh: '体内脂肪过多，尤其是脂肪集中在腰腹（"苹果形"体型）的人，患冠心病、中风、2 型糖尿病、膝髋关节问题的风险更高。多数人可以通过正常均衡饮食和规律运动来控制体重——快速节食往往失败。',
          },
        },
      ],
    },
    {
      type: 'energy-needs',
      id: 'energy-needs',
      title: { en: 'How much energy does a person actually need?', zh: '一个人一天到底需要多少能量？' },
      hint: {
        en: 'There is no single "daily requirement" — energy needs depend on age, sex and how active you are. A 15-year-old boy doing manual work needs more than three times what a 5-year-old girl needs.',
        zh: '"每日所需能量"不是个固定数——它取决于年龄、性别和活动量。一个 15 岁干体力活的男孩所需能量是一个 5 岁女孩的三倍多。',
      },
      source: {
        en: 'Adapted from G8 Science Figure B5.01. Numbers are illustrative — actual needs vary.',
        zh: '改自讲义 Figure B5.01。数据为示意值，实际因人而异。',
      },
      rows: [
        {
          demographic: { en: 'Girl, 5 years', zh: '女孩，5 岁' },
          activity: { en: 'Moderately active', zh: '活动量中等' },
          energyKj: 6500,
        },
        {
          demographic: { en: 'Boy, 10 years', zh: '男孩，10 岁' },
          activity: { en: 'Moderately active', zh: '活动量中等' },
          energyKj: 9000,
        },
        {
          demographic: { en: 'Girl, 15 years', zh: '女孩，15 岁' },
          activity: { en: 'Moderately active', zh: '活动量中等' },
          energyKj: 9500,
        },
        {
          demographic: { en: 'Boy, 15 years', zh: '男孩，15 岁' },
          activity: { en: 'Sedentary (desk job)', zh: '久坐（伏案工作）' },
          energyKj: 11500,
        },
        {
          demographic: { en: 'Man, 30 years', zh: '成年男性，30 岁' },
          activity: { en: 'Office work', zh: '办公室工作' },
          energyKj: 10500,
        },
        {
          demographic: { en: 'Man, 30 years', zh: '成年男性，30 岁' },
          activity: { en: 'Heavy manual labour', zh: '重体力劳动' },
          energyKj: 16500,
        },
        {
          demographic: { en: 'Woman, 30 years', zh: '成年女性，30 岁' },
          activity: { en: 'Office work', zh: '办公室工作' },
          energyKj: 8000,
        },
        {
          demographic: { en: 'Woman, 30 years', zh: '成年女性，30 岁' },
          activity: { en: 'Pregnant (last 6 months)', zh: '妊娠期（后 6 个月）' },
          energyKj: 9500,
        },
        {
          demographic: { en: 'Woman, 30 years', zh: '成年女性，30 岁' },
          activity: { en: 'Breast-feeding', zh: '哺乳期' },
          energyKj: 11000,
        },
      ],
    },

    // 3D anatomy: liver + intestine. The 2D figure shows where these are
    // in the body; the 3D model lets the student rotate them and click
    // the parts. Both are core to the chapter but the textbook figure
    // flattens them — the model shows the shape, the lobes, the folds.
    {
      type: 'organ-anatomy',
      id: 'liver-3d',
      title: { en: 'The liver, in 3D', zh: '肝脏 3D 解剖' },
      hint: {
        en: 'Drag to rotate. The liver has a right lobe that does most of the work, a smaller left lobe, and a green gall bladder tucked underneath that stores bile.',
        zh: '拖动旋转。肝脏右叶最大，承担大部分工作；左叶较小；下面藏着一个绿色的胆囊储存胆汁。',
      },
      intro: {
        en: 'The liver is the body\'s chemical factory. Everything absorbed from the gut passes through it before entering the general circulation, which is why it sits where the gut empties into the bloodstream.',
        zh: '肝脏是人体的化工厂。肠道吸收的所有物质都先经过它才进入全身循环，所以它正好位于肠道汇入血液的位置。',
      },
      organ: 'liver',
      system: { en: 'Digestive system', zh: '消化系统' },
      initialPart: 'right-lobe',
      parts: [
        {
          id: 'right-lobe',
          name: { en: 'right lobe', zh: '右叶' },
          description: {
            en: 'The larger of the two main lobes — about six times the volume of the left. Most of the liver\'s work happens here.',
            zh: '两叶中较大的，体积约为左叶的六倍。肝脏大部分工作都在这里完成。',
          },
          position3d: [-0.75, 0.35, 0.75],
        },
        {
          id: 'left-lobe',
          name: { en: 'left lobe', zh: '左叶' },
          description: {
            en: 'Smaller and flatter. Sits above the stomach.',
            zh: '更小更扁。趴在胃的上方。',
          },
          position3d: [0.85, 0.25, 0.75],
        },
        {
          id: 'gall-bladder',
          name: { en: 'gall bladder', zh: '胆囊' },
          description: {
            en: 'A small green sac tucked under the liver. Stores bile made by liver cells, then releases it when fatty food arrives in the small intestine.',
            zh: '藏在肝下的绿色小囊。储存肝细胞制造的胆汁，脂肪食物到达小肠时把它挤出去。',
          },
          position3d: [-0.6, -0.2, 0.85],
        },
        {
          id: 'hepatic-artery',
          name: { en: 'hepatic artery', zh: '肝动脉' },
          description: {
            en: 'Branches off the aorta and brings oxygen-rich blood to the liver cells.',
            zh: '由主动脉分出，把富氧血送到肝细胞。',
          },
          position3d: [0.4, -0.5, 0.8],
        },
        {
          id: 'portal-vein',
          name: { en: 'hepatic portal vein', zh: '肝门静脉' },
          description: {
            en: 'Carries nutrient-rich blood from the small intestine straight to the liver.',
            zh: '把小肠富营养的血直接送到肝脏。',
          },
          position3d: [0.1, -0.3, 0.82],
        },
      ],
    },
    {
      type: 'organ-anatomy',
      id: 'intestine-3d',
      title: { en: 'The intestine, in 3D', zh: '肠道 3D 解剖' },
      hint: {
        en: 'About 6–7 m long when extended, folded into the central and lower abdomen. The small intestine does most of the absorbing; the colon reclaims water.',
        zh: '展开时长约 6–7 米，折叠盘曲在中下腹。小肠负责大部分吸收，结肠回收水分。',
      },
      intro: {
        en: 'The intestine is the body\'s inner surface — folded, villous, and home to trillions of bacteria. Most of what you eat ends up being absorbed across this wall.',
        zh: '肠道是人体的"内表面"——折叠的、绒毛密布的、还住着万亿细菌。你吃的大部分东西最终都从这里被吸收。',
      },
      organ: 'intestine',
      system: { en: 'Digestive system', zh: '消化系统' },
      initialPart: 'jejunum',
      parts: [
        {
          id: 'duodenum',
          name: { en: 'duodenum', zh: '十二指肠' },
          description: {
            en: 'The first, shortest part of the small intestine — about 25 cm. This is where stomach acid is neutralised and where bile and pancreatic enzymes are added.',
            zh: '小肠的第一段，最短，约 25 厘米。胃酸在这里被中和，胆汁和胰液中的酶在这里加入食物。',
          },
          position3d: [0.6, 0.8, 0.75],
        },
        {
          id: 'jejunum',
          name: { en: 'jejunum', zh: '空肠' },
          description: {
            en: 'The middle section and the main site of nutrient absorption. Its wall is covered in villi, each only about 1 mm tall.',
            zh: '小肠的中段，营养吸收的主要场所。肠壁上布满绒毛，每根约 1 毫米高。',
          },
          position3d: [-0.45, 0.1, 0.82],
        },
        {
          id: 'ileum',
          name: { en: 'ileum', zh: '回肠' },
          description: {
            en: 'The final section of the small intestine. It absorbs vitamin B12 and reclaims bile salts.',
            zh: '小肠的最后一段。吸收维生素 B12 并回收胆汁盐。',
          },
          position3d: [-1.0, -0.6, 0.6],
        },
        {
          id: 'colon',
          name: { en: 'colon (large intestine)', zh: '结肠（大肠）' },
          description: {
            en: 'About 1.5 m long. Reabsorbs water and salts from the undigested food, turning it from liquid into solid faeces.',
            zh: '约 1.5 米长。从未消化的食物中回收水和盐，把内容物从液态变成固态粪便。',
          },
          position3d: [0.75, -0.55, 0.72],
        },
        {
          id: 'rectum',
          name: { en: 'rectum', zh: '直肠' },
          description: {
            en: 'The final straight section. Faeces are stored here until they are expelled.',
            zh: '最后一段直行部分。粪便在这里储存直至排出。',
          },
          position3d: [0.85, -0.95, 0.4],
        },
      ],
    },
  ],

  checkpoints: [
    {
      id: '0610-7-1-cp1',
      syllabus: ['0610.7.1.3'],
      tier: 'core',
      commandWord: 'Explain',
      marks: 3,
      stem: 'A child whose diet contains plenty of calcium still develops rickets. Explain how this is possible.',
      markScheme: [
        { text: 'Rickets is caused by a lack of vitamin D', marks: 1 },
        { text: 'Vitamin D is needed for calcium to be absorbed', marks: 1 },
        {
          text: 'So without it the calcium in the diet cannot be used, the bones stay soft and they bend under the child’s weight',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'The question is testing whether you know vitamin D acts on absorption rather than on bone directly. "The child needs more calcium" contradicts the stem and scores nothing.',
        zh: '这道题考查你是否知道维生素 D 作用于"吸收"环节，而不是直接作用于骨骼。写"这个孩子需要更多钙"与题干矛盾，不得分。',
      },
    },
    {
      id: '0610-7-1-cp2',
      syllabus: ['0610.7.3.7', '0610.7.4.8'],
      tier: 'extended',
      commandWord: 'Describe',
      marks: 4,
      stem: 'Describe the two functions of bile in the digestion of a fatty meal, and explain why bile contains no enzymes but still speeds digestion up.',
      markScheme: [
        {
          text: 'Bile emulsifies fat, breaking large drops into many small droplets',
          marks: 1,
        },
        {
          text: 'This increases the surface area available to lipase, so the fat is digested faster',
          marks: 1,
        },
        {
          text: 'Bile is alkaline, so it neutralises the acid arriving from the stomach',
          marks: 1,
        },
        {
          text: 'This raises the pH to the optimum for the pancreatic enzymes working in the small intestine',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Emulsification is physical, not chemical — bile does not break a single chemical bond. Writing "bile digests fat" loses both marks in that half of the answer.',
        zh: '乳化是物理过程而非化学过程——胆汁不切断任何化学键。写"胆汁消化脂肪"会丢掉这半边的两分。',
      },
    },
    {
      id: '0610-7-1-cp3',
      syllabus: ['0610.7.4.3', '0610.7.4.6'],
      tier: 'extended',
      commandWord: 'Describe',
      marks: 3,
      stem: 'Describe the digestion of starch in the human digestive system, naming the enzymes involved and where each acts.',
      markScheme: [
        {
          text: 'Salivary amylase in the mouth begins breaking starch down to maltose',
          marks: 1,
        },
        {
          text: 'Pancreatic amylase continues this in the small intestine',
          marks: 1,
        },
        { text: 'Maltase, on the small intestine wall, breaks maltose down to glucose', marks: 1 },
      ],
      examinerNote: {
        en: 'Starch does not go straight to glucose. Missing out maltose, or missing out maltase, is the commonest way to drop a mark here.',
        zh: '淀粉不会直接变成葡萄糖。漏掉麦芽糖或漏掉麦芽糖酶，是这里最常见的失分方式。',
      },
    },
    {
      id: '0610-7-1-cp4',
      syllabus: ['0610.7.5.3', '0610.7.5.5'],
      tier: 'extended',
      commandWord: 'Explain',
      marks: 4,
      stem: 'Explain how the structure of a villus adapts it for the rapid absorption of the products of digestion.',
      markScheme: [
        {
          text: 'Villi and microvilli give a very large surface area for absorption',
          marks: 1,
        },
        { text: 'The wall is one cell thick, so the diffusion distance is short', marks: 1 },
        {
          text: 'A capillary network carries away glucose and amino acids, maintaining a steep concentration gradient',
          marks: 1,
        },
        { text: 'A lacteal carries away fatty acids and glycerol', marks: 1 },
      ],
      examinerNote: {
        en: 'Three separate ideas — area, distance, gradient — and then the lacteal. Listing features without saying what each achieves scores about half.',
        zh: '这里有三个不同的要点——面积、距离、梯度——然后才是乳糜管。只罗列结构而不说明各自的作用，大约只能拿一半分。',
      },
    },
    {
      id: '0610-7-1-cp5',
      syllabus: ['0610.7.4.5'],
      tier: 'core',
      commandWord: 'State',
      marks: 2,
      stem: 'State two functions of the hydrochloric acid in gastric juice.',
      markScheme: [
        { text: 'It kills bacteria taken in with the food', marks: 1 },
        {
          text: 'It provides the low pH at which the protease in the stomach works best',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'The acid does not digest anything itself. "It breaks down protein" is the protease’s job, and the acid is only setting up the conditions for it.',
        zh: '盐酸本身不消化任何东西。"它分解蛋白质"是蛋白酶的工作，盐酸只是为其创造条件。',
      },
    },
    {
      id: '0610-7-1-cp6',
      syllabus: ['0610.7.3.1', '0610.7.3.2', '0610.7.3.5'],
      tier: 'core',
      commandWord: 'Explain',
      marks: 3,
      stem: 'A person swallows their food without chewing it properly. Explain why this slows down the chemical digestion of the meal.',
      markScheme: [
        {
          text: 'Chewing is physical digestion: it breaks the food into smaller pieces',
          marks: 1,
        },
        { text: 'Smaller pieces have a larger total surface area', marks: 1 },
        {
          text: 'Enzymes can only act at the surface, so a smaller surface area means fewer enzyme–substrate collisions and a slower rate',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'This is the surface-area argument you met with rates of reaction, in a body rather than a beaker. The mark is for the link to enzyme access, not just for saying the pieces are big.',
        zh: '这就是你在反应速率里见过的表面积论证，只是场景从烧杯换成了身体。得分点在于把它与酶能否接触底物联系起来，而不只是说"碎块很大"。',
      },
    },
    {
      id: '0610-7-1-cp7',
      syllabus: ['0610.7.2.2'],
      tier: 'core',
      commandWord: 'Identify',
      marks: 2,
      stem: 'Bile is released into the small intestine. Identify the organ that produces bile and the organ that stores it.',
      markScheme: [
        { text: 'The liver produces bile', marks: 1 },
        { text: 'The gall bladder stores it', marks: 1 },
      ],
      examinerNote: {
        en: 'Two marks for two organs, and swapping them scores nothing. The gall bladder is a bag, not a gland.',
        zh: '两个器官各一分，答反了则一分不得。胆囊是一个囊袋，不是腺体。',
      },
    },
  ],
}

export default lesson
