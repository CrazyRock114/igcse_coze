/**
 * Classroom stories — the "wait, that's why" hooks the teacher drops in
 * class. Each is a real-life story, image or fact that anchors a syllabus
 * statement in something the student remembers a year later.
 *
 * Why this file exists: a 90-minute G8 Biology class easily contains 15-25
 * hooks. They're the part of teaching that doesn't scale — but they can
 * be *captured*, *tagged* and *re-used*. After 20 lessons the bank is
 * 300+ hooks; a teacher picking a new lesson opens the bank, filters by
 * topic, and has a dozen concrete openings to choose from.
 *
 * The TS shape lets the website query the bank later (e.g. "show me all
 * A-level stories for 14-3"). The `transcripts/hook-bank.md` is the
 * human-readable mirror of the same data, for the teacher to skim.
 *
 * Schema:
 *  - `date` is the lesson date (YYYY-MM-DD)
 *  - `lesson` is the IGCSE short code, e.g. '7-1'
 *  - `quality` is the teacher's pick: 'A' = essential, 'B' = useful,
 *    'C' = weak / one-liner
 *  - `topicTags` is a free-form list; pick the most useful 1-3
 *  - `relatedTermIds` cross-references the `Term` ids in lesson
 *    glossaries — so a future /vocab tab can show "stories that mention
 *    this word"
 */

import type { Bilingual } from './types'

export type StoryQuality = 'A' | 'B' | 'C'

export interface ClassroomStory {
  /** URL-safe slug, e.g. 'crocodile-gastrolith' */
  id: string
  /** YYYY-MM-DD of the lesson where the hook was told */
  date: string
  /** Short lesson code, e.g. '7-1', '14-1' */
  lesson: string
  /** The hook in 4-12 Chinese characters, e.g. '鳄鱼吞石头' */
  hookName: string
  /** English equivalent for the bilingual header */
  hookNameEn: string
  /** 1-2 sentence summary, in both languages */
  oneLiner: Bilingual
  /** Where in the transcript it was told, for the teacher to revisit */
  transcriptRef: { date: string; approxLine: number; excerpt: string }
  /** A = essential, B = useful, C = weak */
  quality: StoryQuality
  /** 1-3 free-form topic tags, e.g. ['physical-digestion', 'stomach'] */
  topicTags: string[]
  /** Optional: which Term ids in lesson glossaries this story relates to */
  relatedTermIds?: string[]
  /** Optional: the abstract concept the story replaces or anchors */
  whatItReplaces?: Bilingual
  /** Optional: cultural / scientific source */
  source?: Bilingual
}

// ---------------------------------------------------------------------------
// 7-1 Nutrition — 8/3 lesson
// ---------------------------------------------------------------------------

const S_8_3_NUTRITION: ClassroomStory[] = [
  {
    id: 'crocodile-gastrolith',
    date: '2026-08-03',
    lesson: '7-1',
    hookName: '鳄鱼吞石头',
    hookNameEn: 'Crocodiles swallow stones',
    oneLiner: {
      en: 'Crocodiles have no chewing. They swallow stones that sit in the stomach and help grind the food — the same way our teeth do, but internal.',
      zh: '鳄鱼不会咀嚼，它吞下石头放在胃里，靠石头磨碎食物——和我们用牙齿做的事一样，只是发生在身体内部。',
    },
    transcriptRef: { date: '2026-08-03', approxLine: 246, excerpt: '鳄鱼有的时候会吞石头……这些石头是帮助他去磨碎它的食物' },
    quality: 'A',
    topicTags: ['physical-digestion', 'stomach'],
    relatedTermIds: ['peristalsis', 'stomach'],
    whatItReplaces: {
      en: 'The abstract "stomach churns food". With the crocodile image, the student sees that physical breakdown can happen by any mechanical means — teeth, muscles, or even swallowed stones.',
      zh: '抽象的"胃搅拌食物"。有了鳄鱼的画面，学生看到物理性磨碎可以通过任何机械方式完成——牙齿、肌肉、甚至是吞下的石头。',
    },
  },
  {
    id: 'termite-cellulose-symbiont',
    date: '2026-08-03',
    lesson: '7-1',
    hookName: '白蚁吃木头',
    hookNameEn: 'Termites eat wood',
    oneLiner: {
      en: 'Termites eat wood but they cannot digest cellulose themselves — microbes in their gut do it. The termite is a flying house for its microbiome.',
      zh: '白蚁吃木头，但自己不能消化纤维素——是它肠道的微生物在做这件事。白蚁是它体内微生物群落的"飞行房子"。',
    },
    transcriptRef: { date: '2026-08-03', approxLine: 245, excerpt: '白蚁能够食物的西，它有能够消化这个木头里面纤维的' },
    quality: 'A',
    topicTags: ['fibre', 'microbiome', 'digestion'],
    relatedTermIds: ['fibre', 'microbiome'],
    whatItReplaces: {
      en: '"Fibre is undigestible". A more useful framing: humans cannot digest fibre, but the microbes inside us can — and the same is true for every animal that eats plant matter.',
      zh: '"纤维无法消化"。更有用的说法是：人不能消化纤维，但人体内的微生物能——每个吃植物的动物其实都是这样。',
    },
  },
  {
    id: 'duck-feather-oil',
    date: '2026-08-03',
    lesson: '7-1',
    hookName: '鸭子羽毛不沾水',
    hookNameEn: 'A duck\'s feathers do not get wet',
    oneLiner: {
      en: 'Adult ducks secrete oil that coats the feathers and lets them sit on water. Ducklings cannot, so a duckling left in water for two hours will drown. The same physical principle — hydrophobic coating on a low-density body — explains life jackets and submarines.',
      zh: '成年鸭子分泌油脂涂在羽毛上，所以能浮在水面上。小鸭子不会分泌油脂，放进水里两小时就会淹死。同样的物理原理——疏水涂层 + 低密度——也解释了救生衣和潜水艇的工作方式。',
    },
    transcriptRef: { date: '2026-08-03', approxLine: 419, excerpt: '鸭子的这个皮肤表面会分泌很多的油脂……小鸭子的油脂分泌还几乎没有' },
    quality: 'A',
    topicTags: ['lipid', 'physical-properties', 'cross-domain'],
    relatedTermIds: ['lipid', 'fat'],
    whatItReplaces: {
      en: 'A list of "functions of fat" with a single word — insulation. The duck story makes the property tangible: a water-repellent layer that keeps the body dry and warm.',
      zh: '"脂肪功能"列表里只写"保温"一词。鸭子的故事把这个性质具体化了：一层防水层让身体保持干燥和温暖。',
    },
  },
  {
    id: 'aphid-ant-symbiosis',
    date: '2026-08-03',
    lesson: '19-1',
    hookName: '蚂蚁和蚜虫',
    hookNameEn: 'Ants farm aphids',
    oneLiner: {
      en: 'Aphids drink plant sap and excrete a sweet liquid. Ants "milk" the aphids by stroking them, then eat the excretion. The aphids get protection; the ants get sugar. The whole exchange runs on trophic-level collaboration.',
      zh: '蚜虫吸食植物汁液，排出甜甜的液体。蚂蚁"挤奶"蚜虫，吃它们的排泄物。蚜虫得到保护，蚂蚁得到糖分。整个过程建立在营养级协作之上。',
    },
    transcriptRef: { date: '2026-08-03', approxLine: 483, excerpt: '蚜虫是大量的吸那个树枝……屁股后面去出水……蚂蚁呢，它不会去吃那些蚜虫，专门舔他的屁股' },
    quality: 'A',
    topicTags: ['food-web', 'symbiosis', 'producer-consumer'],
    whatItReplaces: {
      en: 'The "food chain" picture of one arrow per step. The ant-aphid story shows that real food webs have loops, mutualism and dependencies that are not linear.',
      zh: '"食物链"一格一格的画面。蚂蚁-蚜虫的故事说明真实的食物网有循环、互利共生和线性的箭头表达不出来的依赖关系。',
    },
  },
  {
    id: 'dog-eats-poop',
    date: '2026-08-03',
    lesson: '7-1',
    hookName: '狗改不了吃屎',
    hookNameEn: 'Why dogs eat what they eat',
    oneLiner: {
      en: 'Dogs evolved from wolves who hung around human camps. The scraps and even the human waste were a reliable food source that other predators could not use. So the dog\'s "disgusting" habit is just a niche carved out 15,000 years ago.',
      zh: '狗从围着人类营地转的狼演化而来。剩饭、甚至人类的排泄物是其他捕食者用不上的稳定食物来源。所以狗"吃屎"的习惯其实是 1.5 万年前就形成的一个生态位。',
    },
    transcriptRef: { date: '2026-08-03', approxLine: 478, excerpt: '狗改不了吃屎……狗是原来的狼群当中有一批，他为了在竞争过程当中，他为了能够找到充分的食物' },
    quality: 'B',
    topicTags: ['evolution', 'ecology', 'digestion'],
  },
  {
    id: 'eat-pig-grow-human',
    date: '2026-08-03',
    lesson: '7-1',
    hookName: '吃猪肉长人肉',
    hookNameEn: 'Eat pig, grow human',
    oneLiner: {
      en: 'Pig protein is cut into amino acids in the gut. The amino acids are then re-assembled into human protein. The "you are what you eat" line is literally true at the molecular level — and it is the simplest proof that digestion is a disassembly, not a transfer.',
      zh: '猪肉蛋白在肠道被切成氨基酸。氨基酸再被组装成人的蛋白质。"吃啥补啥"在分子层面字面成立——也是消化是"拆"而不是"搬"的最简单证据。',
    },
    transcriptRef: { date: '2026-08-03', approxLine: 138, excerpt: '我们吃进去大部分是猪肉……蛋白质切割开以后就是氨基酸' },
    quality: 'A',
    topicTags: ['protein', 'chemical-digestion', 'assimilation'],
    relatedTermIds: ['amino acid', 'protein', 'chemical digestion'],
  },
  {
    id: 'egg-is-a-complete-life',
    date: '2026-08-03',
    lesson: '7-1',
    hookName: '鸡蛋是受精卵的全部营养',
    hookNameEn: 'A chicken egg holds a whole life',
    oneLiner: {
      en: 'One fertilised egg has everything needed to grow a chick: protein for tissue, fat for energy, minerals for bones, vitamins for chemistry. Cutting an egg open at different days of incubation shows the yolk shrinking as the body uses it up — direct evidence of nutrient turnover.',
      zh: '一颗受精卵里有长成小鸡所需的一切：蛋白质长组织、脂肪供能、矿物质长骨、维生素做化学反应。在不同天数剖开鸡蛋看，蛋黄会越用越小——这是营养周转最直观的证据。',
    },
    transcriptRef: { date: '2026-08-03', approxLine: 165, excerpt: '一颗受精卵变成一个完整的生命……它里面还储存了大量的营养物质' },
    quality: 'A',
    topicTags: ['nutrition', 'protein', 'embryology'],
  },
  {
    id: 'balut-and-soft-shelled-egg',
    date: '2026-08-03',
    lesson: '7-1',
    hookName: '活珠子 / 毛蛋',
    hookNameEn: 'Balut and the soft-shelled egg',
    oneLiner: {
      en: 'Balut is a fertilised duck egg incubated to about 17 days, then boiled and eaten. "Soft-shelled" (毛蛋) is the same thing, incubated slightly longer until feathers are visible. Both are real food in parts of China, the Philippines and Vietnam — and a visceral lesson that an egg is a stage of development, not a finished product.',
      zh: '活珠子是孵化约 17 天的受精鸭蛋煮熟后吃。毛蛋再孵几天，已经能看见羽毛。它们在中国部分地区、菲律宾、越南都是真食物——也是"鸡蛋是一个发育阶段"最直观的证据。',
    },
    transcriptRef: { date: '2026-08-03', approxLine: 165, excerpt: '如果你看过一些水生生物……吃过那种叫做毛带……活珠子' },
    quality: 'A',
    topicTags: ['embryology', 'protein', 'culture'],
  },
  {
    id: 'gut-microbiome-controls-cravings',
    date: '2026-08-03',
    lesson: '7-1',
    hookName: '菌群控制大脑',
    hookNameEn: 'Your gut microbes bias what you crave',
    oneLiner: {
      en: 'The microbes in your gut release signalling molecules that act on the brain. Studies where the gut flora of a lean mouse was transplanted into an obese one (and vice versa) showed the recipient\'s appetite shifted. The "I really want a sweet" feeling is not always fully yours.',
      zh: '你肠道里的微生物会释放信号分子作用于大脑。把瘦鼠的肠道菌群移植到胖鼠体内（反之亦然），受体的食欲会跟着改变。"我就是想吃甜的"这种感觉不总是完全属于你。',
    },
    transcriptRef: { date: '2026-08-03', approxLine: 220, excerpt: '这个微生物反过来能控制你的大脑……' },
    quality: 'A',
    topicTags: ['microbiome', 'homeostasis', 'nervous-system'],
    relatedTermIds: ['microbiome'],
  },
  {
    id: 'meal-replacement-psychology',
    date: '2026-08-03',
    lesson: '7-1',
    hookName: '代餐挑战',
    hookNameEn: 'The 30-day meal-replacement challenge',
    oneLiner: {
      en: 'A well-known social-media challenge: eat nothing but nutritionally-complete meal-replacement powder for 30 days. The weight drops and the blood markers normalise, but most people feel psychologically empty — the act of eating, the social context, the chewing, is part of how the body expects to be nourished.',
      zh: '一个有名的社交媒体挑战：30 天只吃营养齐全的代餐粉。体重会降、血液指标会正常化，但多数人心理上感到空虚——吃这个动作本身、社交场景、咀嚼，是身体期待"被喂养"的一部分。',
    },
    transcriptRef: { date: '2026-08-03', approxLine: 142, excerpt: '代餐挑战……其实很痛苦，就是你没有吃东西的快感' },
    quality: 'B',
    topicTags: ['nutrition', 'psychology', 'homeostasis'],
  },
  {
    id: 'spicy-food-dopamine',
    date: '2026-08-03',
    lesson: '14-1',
    hookName: '吃辣让人快乐',
    hookNameEn: 'Spicy food makes you happy',
    oneLiner: {
      en: 'Chilli activates the same pain receptors that fire when you touch something hot. The brain reads this as pain and responds by releasing endorphins and dopamine. The "I love spicy food" feeling is literally your reward system being triggered by a controlled burn.',
      zh: '辣椒激活和"摸到烫东西"一样的痛觉受体。大脑把这读为疼痛，于是释放内啡肽和多巴胺作为回应。"我爱吃辣"这种感觉，本质是你的奖赏系统被一次有控的灼烧激活了。',
    },
    transcriptRef: { date: '2026-08-03', approxLine: 148, excerpt: '吃辣……会刺激多巴胺的形成……是一种痛觉' },
    quality: 'A',
    topicTags: ['nervous-system', 'receptor', 'homeostasis'],
    relatedTermIds: ['dopamine', 'pain receptor'],
  },
  {
    id: 'fish-oil-vs-lard',
    date: '2026-08-03',
    lesson: '7-1',
    hookName: '鱼油 vs 牛油',
    hookNameEn: 'Fish oil vs lard at room temperature',
    oneLiner: {
      en: 'Lard and beef fat are mostly saturated: solid at room temperature, so they pile up on artery walls. Fish oil and olive oil are mostly unsaturated: still liquid at body temperature, so they slide through. The hotpot beef-tallow block is a perfect demo of the chemistry of cardiovascular risk.',
      zh: '猪油、牛油以饱和脂肪为主，常温是固体，所以容易在血管壁上堆积。鱼油、橄榄油以不饱和脂肪为主，体温下仍是液体，能顺利通过。火锅里那一大块牛油就是心血管风险化学的最直观展示。',
    },
    transcriptRef: { date: '2026-08-03', approxLine: 227, excerpt: '牛油……在常温下就二三十度下，它就是一个固体' },
    quality: 'A',
    topicTags: ['lipid', 'cardiovascular-disease', 'saturated-vs-unsaturated'],
    relatedTermIds: ['saturated fat', 'unsaturated fat', 'coronary heart disease'],
  },
  {
    id: 'scurvy-18th-century-sailors',
    date: '2026-08-03',
    lesson: '7-1',
    hookName: '18 世纪水手死于坏血病',
    hookNameEn: '18th-century sailors died of scurvy',
    oneLiner: {
      en: 'On long voyages with no fresh fruit, sailors\' gums would bleed, teeth would fall out, old wounds would reopen. Tens of thousands died. A daily ration of lemon juice cured it. The disease was a clue that the body needs a small molecule it cannot make — and that food is medicine before it is fuel.',
      zh: '长期航行没有新鲜水果时，水手牙龈出血、牙齿脱落、旧伤重新裂开。成千上万人因此死亡。每日配给的柠檬汁治好了它。这种病提示：人体需要一种它自己造不出的微量物质——食物在成为燃料之前首先是药。',
    },
    transcriptRef: { date: '2026-08-03', approxLine: 213, excerpt: '成天上……吃猪肝……下面呢' },
    quality: 'A',
    topicTags: ['vitamin-c', 'history-of-medicine', 'deficiency'],
    relatedTermIds: ['scurvy', 'vitamin c'],
  },
  {
    id: 'ancient-fracture-fossil',
    date: '2026-08-03',
    lesson: '7-1',
    hookName: '古猿人骨折愈合化石',
    hookNameEn: 'A healed femur in a 1.5-million-year-old fossil',
    oneLiner: {
      en: 'A broken thigh-bone that has healed shows the individual survived long enough after the injury to walk again. For almost every other large mammal, a broken femur means death within weeks. The healed fossil is one of the cleanest pieces of evidence that early humans took care of each other.',
      zh: '一根愈合的股骨说明个体在受伤后又活了足够久、能重新行走。对几乎所有其他大型哺乳动物，股骨骨折意味着几周内死亡。愈合的化石是人类早期彼此照护的最干净的证据之一。',
    },
    transcriptRef: { date: '2026-08-03', approxLine: 156, excerpt: '把就我们说化石证据里面把一块断掉大腿骨又愈合了的化石。去证明说人类文明已经超越了其他物种' },
    quality: 'A',
    topicTags: ['calcium', 'bone', 'human-evolution', 'cooperation'],
    relatedTermIds: ['calcium', 'bone'],
  },
  {
    id: 'wood-shavings-allergy',
    date: '2026-08-03',
    lesson: '10-1',
    hookName: '树皮刮到皮肤过敏',
    hookNameEn: 'Touching a tree bark and breaking out',
    oneLiner: {
      en: 'Some people\'s immune systems flag harmless plant molecules as threats. The body mounts the same defence as against a real pathogen — redness, swelling, itching. Allergy is the immune system doing its job too well, on the wrong target.',
      zh: '有些人的免疫系统把无害的植物分子标记为威胁。身体对它们启动和真病原体一样的防御——发红、肿胀、瘙痒。过敏是免疫系统"工作得太好"，但目标选错了。',
    },
    transcriptRef: { date: '2026-08-03', approxLine: 372, excerpt: '树皮……皮肤……过敏……他这边都是' },
    quality: 'B',
    topicTags: ['allergy', 'immune-system', 'hypersensitivity'],
    relatedTermIds: ['allergy', 'phagocyte'],
  },
]

// ---------------------------------------------------------------------------
// 7-1 Nutrition continued + Dental — 8/4 lesson
// ---------------------------------------------------------------------------

const S_8_4_NUTRITION: ClassroomStory[] = [
  {
    id: 'wo-xin-chang-dan',
    date: '2026-08-04',
    lesson: '7-1',
    hookName: '卧薪尝胆',
    hookNameEn: 'Sleeping on firewood, tasting bile',
    oneLiner: {
      en: 'A 5th-century-BC Chinese king kept a piece of bitter gall bladder on his bed and tasted it daily to remind himself of past humiliation. The story became a byword for delayed revenge — and a useful reminder that bile is one of the bitterest substances the body makes.',
      zh: '公元前 5 世纪一位中国国王把苦胆挂在床边，每天品尝以提醒自己曾经的屈辱。卧薪尝胆成了"延迟复仇"的代名词——也提醒我们：胆汁是人体制造的最苦的物质之一。',
    },
    transcriptRef: { date: '2026-08-04', approxLine: 159, excerpt: '卧薪尝胆，为什么要尝胆？尝胆，因为胆非常非常苦' },
    quality: 'A',
    topicTags: ['bile', 'liver', 'history', 'etymology'],
    relatedTermIds: ['bile', 'gallstone', 'gall bladder'],
  },
  {
    id: 'xin-shui-cang-yu',
    date: '2026-08-04',
    lesson: '7-1',
    hookName: '薪水 = 柴火',
    hookNameEn: '"Salary" comes from firewood',
    oneLiner: {
      en: 'The Chinese word for salary (薪水) literally means "firewood and water" — the two things a worker historically had to fetch to keep a household going. The biology class is a great place to mention it because the rad­ical 薪 (firewood) is part of the visual story.',
      zh: '"薪水"字面意思就是"柴火和水"——以前工人为了维持家计必须取回的两样东西。生物课讲到"胆"字很顺带就能讲一下这个字源，因为"薪"字本身就是把柴火的意思写在字形里。',
    },
    transcriptRef: { date: '2026-08-04', approxLine: 409, excerpt: '新时像是柴火……薪水就变成了工资了' },
    quality: 'B',
    topicTags: ['etymology', 'bile', 'history'],
    relatedTermIds: ['bile'],
  },
  {
    id: 'menieres-disease',
    date: '2026-08-04',
    lesson: '14-1',
    hookName: '美尼尔氏综合征',
    hookNameEn: 'Ménière\'s disease',
    oneLiner: {
      en: 'Ménière\'s is a disorder of the inner-ear labyrinth: fluid builds up, the balance system misfires, and the world spins. An attack is often so violent that the person vomits repeatedly. When the stomach is finally empty, what comes up is green and bitter — the bile stored in the gall bladder. A first-hand tour of three organ systems in one bad night.',
      zh: '美尼尔氏综合征是内耳迷路的疾病：液体积聚、平衡系统错乱、世界开始旋转。一次发作常剧烈到反复呕吐。胃里终于空了之后吐出来的是绿色苦水——胆囊里储存的胆汁。一次难受的晚上把三个系统全走过一遍。',
    },
    transcriptRef: { date: '2026-08-04', approxLine: 52, excerpt: '美尼尔氏综合症……他这个美尼尔氏综合症……迷路系统……积水' },
    quality: 'A',
    topicTags: ['ear', 'vestibular', 'bile', 'nervous-system'],
    relatedTermIds: ['bile', 'gall bladder'],
  },
  {
    id: 'submarine-ballast-tank',
    date: '2026-08-04',
    lesson: '7-1',
    hookName: '潜水艇的气囊',
    hookNameEn: 'A submarine\'s ballast tank',
    oneLiner: {
      en: 'A submarine surfaces by blowing the water out of its ballast tanks so the air-filled volume pushes it up. If a hole lets water in, the air escapes and the sub sinks. The same physics — buoyancy is set by displaced volume, not by what the body is made of — explains why a soaked down jacket kills you faster than a dry one.',
      zh: '潜水艇上浮是把压载水舱里的水排出去，让充满空气的舱体把它顶起来。如果有洞让水灌进来、空气跑掉，潜艇就下沉。同样的物理——浮力取决于排开水的体积，而不是身体的材质——也解释了为什么湿透的羽绒服比干羽绒服更快让你沉下去。',
    },
    transcriptRef: { date: '2026-08-04', approxLine: 425, excerpt: '潜水艇里面也有一个气囊……你前点坏了漏洞了，那气囊里面的水就不断的往里涌' },
    quality: 'A',
    topicTags: ['physical-properties', 'buoyancy', 'cross-domain'],
    relatedTermIds: ['lipid', 'fat'],
  },
  {
    id: 'chicken-breast-vs-fish',
    date: '2026-08-04',
    lesson: '7-1',
    hookName: '鸡胸肉 vs 鱼',
    hookNameEn: 'Why bodybuilders eat chicken breast',
    oneLiner: {
      en: 'Per 100 g, chicken breast has about 30 g protein and very little fat, while salmon has 20 g protein and 13 g of (mostly healthy) fat. For cutting weight, chicken wins on protein-per-calorie. For an everyday diet, fish gives you the omega-3s chicken cannot.',
      zh: '每 100 克，鸡胸肉含约 30 克蛋白质和极少脂肪；三文鱼含 20 克蛋白质和 13 克（多数是有益的）脂肪。减脂期，鸡胸肉在"每卡路里含蛋白"上胜出。日常吃鱼则能补到鸡胸肉没有的 ω-3 脂肪酸。',
    },
    transcriptRef: { date: '2026-08-04', approxLine: 162, excerpt: '鸡胸肉……蛋白质……它主要提供的是高的蛋白质……这个都不算饱' },
    quality: 'B',
    topicTags: ['protein', 'fat', 'diet'],
    relatedTermIds: ['protein', 'saturated fat', 'unsaturated fat'],
  },
  {
    id: 'tooth-four-layers',
    date: '2026-08-04',
    lesson: '7-1',
    hookName: '牙齿的 4 层结构',
    hookNameEn: 'The four layers of a tooth',
    oneLiner: {
      en: 'Enamel is the hardest substance in the body — almost pure calcium phosphate. Dentin underneath is softer and full of microtubules. Pulp is the living core with nerves and blood vessels. Root anchors the tooth in the jawbone. A cavity hurts only once it has crossed enamel into dentin; if it reaches the pulp, the pain is severe and a root canal is the only fix.',
      zh: '牙釉质是人体最硬的物质——几乎全是磷酸钙。下面的牙本质更软、里面有微管。牙髓是核心，含神经和血管。牙根把牙齿锚定在颌骨里。龋洞只有穿过釉质进入牙本质才会痛；到达牙髓时剧痛，根管治疗是唯一办法。',
    },
    transcriptRef: { date: '2026-08-04', approxLine: 85, excerpt: '牙齿其实分也分好几个部分……牙釉质……牙本质……牙髓……牙根' },
    quality: 'A',
    topicTags: ['tooth', 'calcium', 'nervous-system', 'pain'],
    relatedTermIds: ['dental caries', 'enamel', 'calcium'],
  },
  {
    id: 'toothpaste-and-decay',
    date: '2026-08-04',
    lesson: '7-1',
    hookName: '不补就不长',
    hookNameEn: 'Enamel does not regrow',
    oneLiner: {
      en: 'Once the acid from oral bacteria has dissolved a hole in the enamel, only a dentist can fill it. The body cannot lay down new enamel in the mouth. The best strategy is therefore prevention — fluoride, less sugar, more saliva — not treatment after the fact.',
      zh: '口腔细菌产生的酸在牙釉质上溶出洞之后，只有牙医能补。身体无法在口腔里重新长出釉质。所以最好的策略是预防——氟、少糖、多唾液——而不是事后修补。',
    },
    transcriptRef: { date: '2026-08-04', approxLine: 85, excerpt: '不补的话，它就是没有办法再长出来的' },
    quality: 'A',
    topicTags: ['tooth', 'prevention'],
    relatedTermIds: ['dental caries', 'enamel'],
  },
  {
    id: 'atp-cell-battery',
    date: '2026-08-04',
    lesson: '7-1',
    hookName: 'ATP = 手机电池',
    hookNameEn: 'ATP is the cell\'s phone battery',
    oneLiner: {
      en: 'Glucose is the bulky power bank. To use the energy, the cell must first charge the smaller, more convenient battery — ATP. Every cell on Earth runs on ATP, charged and discharged thousands of times a day. The metaphor makes the otherwise dry ADP/ATP cycle feel like a real engineering problem.',
      zh: '葡萄糖是又大又笨的充电宝。要使用这份能量，细胞必须先给更小更便携的电池——ATP——充上电。地球上每个细胞都用 ATP，每天充放电数千次。这个比喻让原本枯燥的 ADP/ATP 循环变成一个真实的工程问题。',
    },
    transcriptRef: { date: '2026-08-04', approxLine: 195, excerpt: 'ATP才是真正每一个是就是我们地球上的细胞能够直接使用的能量来源。你可以理解为那个是我们手机里面的电视' },
    quality: 'A',
    topicTags: ['atp', 'respiration', 'metabolism'],
    relatedTermIds: ['atp', 'aerobic respiration'],
  },
  {
    id: 'small-intestine-tennis-court',
    date: '2026-08-04',
    lesson: '7-1',
    hookName: '小肠展开 = 一个网球场',
    hookNameEn: 'A small intestine unfolded is the size of a tennis court',
    oneLiner: {
      en: 'A bare tube the diameter of the small intestine would have only about 1 m² of surface. Add villi and microvilli and you get roughly 200 m² — the same as a tennis court. The student usually has not seen a 200 m² space; the visual is unforgettable.',
      zh: '一根光滑的小肠管道表面积只有约 1 平方米。加上绒毛和微绒毛后达到约 200 平方米——相当于一个网球场。学生通常没见过 200 平方米的空间，这个画面很难忘。',
    },
    transcriptRef: { date: '2026-08-04', approxLine: 102, excerpt: '扩大了 200 倍……一个平方米差不多到了 200 多平方米' },
    quality: 'A',
    topicTags: ['small-intestine', 'absorption', 'surface-area'],
    relatedTermIds: ['villus', 'small intestine'],
  },
]

// ---------------------------------------------------------------------------
// 9-1 + 11-1 — 8/5 lesson
// ---------------------------------------------------------------------------

const S_8_5_CIRCULATION_AND_GAS: ClassroomStory[] = [
  {
    id: 'varicose-veins-in-twenties',
    date: '2026-08-05',
    lesson: '9-1',
    hookName: '20 多岁就静脉曲张',
    hookNameEn: 'Varicose veins in one\'s twenties',
    oneLiner: {
      en: 'Most people associate varicose veins with old age. The teacher had a congenital valve defect and needed surgery in his twenties — a striking illustration that "old-age disease" is sometimes a genetic lottery, and that the leg\'s one-way valves are mechanical parts that can fail at any age.',
      zh: '多数人把静脉曲张和老年联系在一起。老师本人因为先天瓣膜缺陷，20 多岁就做了手术——很说明问题："老年病"有时是基因抽签的结果，而腿部的单向瓣膜是机械部件，任何年龄都可能坏。',
    },
    transcriptRef: { date: '2026-08-05', approxLine: 269, excerpt: '我是属于这个先天这个静脉膜缺失更严更厉害，所以我20多岁就就表现出来很严重的一个状态' },
    quality: 'A',
    topicTags: ['vein', 'valve', 'genetic-defect', 'first-person'],
    relatedTermIds: ['varicose vein', 'vein'],
  },
  {
    id: 'leech-anticoagulant',
    date: '2026-08-05',
    lesson: '9-1',
    hookName: '蚂蟥的抗凝血',
    hookNameEn: 'Leeches vs platelets',
    oneLiner: {
      en: 'A leech bites, releases an anaesthetic so the host does not feel it, drinks until full — and then releases a chemical that blocks the host\'s platelets. The wound keeps bleeding long after the leech drops off. The leech is, in effect, a portable pharmacy for anticoagulants.',
      zh: '蚂蟥叮咬时先释放麻醉剂让宿主感觉不到，喝饱后又会释放一种化学物质阻止宿主的血小板凝固。蚂蟥离开后伤口还会继续流血。蚂蟥本质上是一座行走的抗凝血剂药房。',
    },
    transcriptRef: { date: '2026-08-05', approxLine: 285, excerpt: '他会在这个伤口的部分……去释放一些防止凝血的一些物质……蚂蟥给你释放了大量的值' },
    quality: 'A',
    topicTags: ['platelet', 'parasite', 'drug-discovery'],
    relatedTermIds: ['platelet', 'phagocyte'],
  },
  {
    id: 'co-hemoglobin-200x',
    date: '2026-08-05',
    lesson: '11-1',
    hookName: '一氧化碳比氧气强 200 倍',
    hookNameEn: 'Carbon monoxide grabs haemoglobin 200× more tightly than oxygen',
    oneLiner: {
      en: 'Haemoglobin\'s binding affinity for CO is about 200× that for O₂. Even a few percent CO in the air can occupy a tenth of a person\'s haemoglobin and effectively anaesthetise the blood. This is why charcoal-burning suicide in a closed room is fast and quiet, and why winter coal-heating without ventilation is fatal.',
      zh: '血红蛋白对 CO 的亲和力约为对 O₂ 的 200 倍。空气中只要有百分之几的 CO，就能占据人 10% 的血红蛋白，让血液在功能上"贫血"。这就是为什么密闭空间里烧炭自杀很快且安静，也为什么冬天不通风的煤炉取暖会致命。',
    },
    transcriptRef: { date: '2026-08-05', approxLine: 466, excerpt: '它跟血红蛋白结合的这个强度呢，会比氧气强200倍……他一氧化碳中毒需要的浓度是不用很高的' },
    quality: 'A',
    topicTags: ['haemoglobin', 'carbon-monoxide', 'poisoning', 'public-health'],
    relatedTermIds: ['carbon monoxide', 'haemoglobin', 'red blood cell'],
  },
  {
    id: 'coronary-artery-heart-attack',
    date: '2026-08-05',
    lesson: '9-1',
    hookName: '心梗抢救 1 分钟 = 1 块心肌',
    hookNameEn: 'In a heart attack, every minute is muscle',
    oneLiner: {
      en: 'Cardiac muscle does not regrow. When a coronary artery is blocked, the heart muscle downstream dies within 20-30 minutes and is replaced by non-contracting scar tissue. The reason hospitals run a "chest pain centre" is that every minute of delay loses more function permanently.',
      zh: '心肌不能再生。冠状动脉被堵后，远端的心肌 20-30 分钟内就会死亡，被不能收缩的瘢痕组织替代。医院设"胸痛中心"的原因就是：每延迟一分钟就永久损失一份功能。',
    },
    transcriptRef: { date: '2026-08-05', approxLine: 132, excerpt: '心脏一旦出了问题，你真的停了或者完全堵死了，那几分钟就过去了' },
    quality: 'A',
    topicTags: ['coronary-artery', 'heart-attack', 'first-response'],
    relatedTermIds: ['myocardial infarction', 'coronary heart disease'],
  },
  {
    id: 'detective-novel-arterial-spray',
    date: '2026-08-05',
    lesson: '9-1',
    hookName: '侦探小说里的喷血痕迹',
    hookNameEn: 'The arterial spray in detective fiction',
    oneLiner: {
      en: 'A cut vein bleeds; a cut artery sprays. The pressure in the aorta at the moment of left-ventricular contraction is enough to throw a column of blood metres high. Crime-scene investigators use luminol to find traces of cleaned blood because even a sprayed and wiped drop leaves detectable haem behind.',
      zh: '静脉伤口是渗血；动脉伤口是喷血。左心室收缩瞬间主动脉的压力足以把血柱喷出几米高。刑侦人员用鲁米诺检测擦拭过的血迹，因为哪怕是喷出后被擦掉的点滴，也会留下可被检测到的血红蛋白痕迹。',
    },
    transcriptRef: { date: '2026-08-05', approxLine: 270, excerpt: '在某个房间里面出现了那个这种喷血的痕迹……这个血会喷出来' },
    quality: 'A',
    topicTags: ['artery', 'pressure', 'forensic-science'],
    relatedTermIds: ['artery', 'blood pressure'],
  },
  {
    id: 'typhoon-coriolis',
    date: '2026-08-05',
    lesson: '9-1',
    hookName: '北半球台风逆时针',
    hookNameEn: 'Typhoons rotate counter-clockwise in the Northern Hemisphere',
    oneLiner: {
      en: 'A typhoon is a low-pressure centre. Air rushes in from all sides; the Earth\'s rotation deflects the inflowing air, and the system spins. In the Northern Hemisphere that deflection is to the right, so the spin is counter-clockwise. The same pressure-driven, deflected-by-rotation flow explains why blood in arteries and veins behaves the way it does — and even why ocean currents loop the way they do.',
      zh: '台风是一个低压中心。空气从四面八方涌入，地球自转使这股涌入的气流偏转，系统于是旋转。在北半球偏转向右，所以台风是逆时针旋转。同样的"由压强差驱动、被旋转偏转"的原理，解释了动脉和静脉中血液的流动方式——也解释了洋流为什么是环形的。',
    },
    transcriptRef: { date: '2026-08-05', approxLine: 396, excerpt: '台风它形成一个漩涡……在北半球是逆时针旋转的气流……右手法则' },
    quality: 'A',
    topicTags: ['pressure', 'circulation', 'cross-domain', 'physics'],
  },
  {
    id: 'free-diver-1m43s-breath-hold',
    date: '2026-08-05',
    lesson: '11-1',
    hookName: '自由潜 1 分 43 秒',
    hookNameEn: 'A 1:43 static breath-hold',
    oneLiner: {
      en: 'Static apnea (lying still, holding your breath) world records are over 11 minutes, but for an untrained student 1:43 is impressive. The trick is relaxation: a tense body and an active brain burn oxygen fast. A relaxed body in cold water has much lower oxygen demand. The lesson: the breath is not a passive system — every cell asks for a share.',
      zh: '静态闭气（静卧、屏住呼吸）的世界纪录超过 11 分钟，但对一个没训练过的学生来说 1:43 已经惊人。诀窍是放松：紧张的身体和活跃的大脑会快速消耗氧气。放松的身体在凉水中耗氧量低得多。教训是：呼吸不是一个被动的系统——每个细胞都在争取一份。',
    },
    transcriptRef: { date: '2026-08-05', approxLine: 167, excerpt: '1分43秒……不管是水下憋气，还是你自己躺床上，是下跌我能编' },
    quality: 'A',
    topicTags: ['respiration', 'breath-hold', 'first-person'],
    relatedTermIds: ['breathing', 'gas exchange'],
  },
  {
    id: 'winter-cold-heart-attack',
    date: '2026-08-05',
    lesson: '9-1',
    hookName: '冬天一冷一热，心梗发作',
    hookNameEn: 'Winter cold-snap heart attacks',
    oneLiner: {
      en: 'When a person walks out of a warm room into cold air, the blood vessels under the skin constrict sharply to keep core temperature up. If the coronary arteries were already partially narrowed by fatty deposits, the extra constriction can be the last straw. This is one of the cleanest population-level correlations in cardiovascular epidemiology: cold days, more heart attacks.',
      zh: '人从温暖的房间走到冷空气里时，皮肤下的血管急剧收缩以保持核心体温。如果冠状动脉本来就被脂肪斑块部分堵住，这一下收缩就可能是"压垮骆驼的最后一根稻草"。这是心血管流行病学里最干净的群体相关性之一：冷天，心梗发作更多。',
    },
    transcriptRef: { date: '2026-08-05', approxLine: 477, excerpt: '冬天……在比如室内比较暖，到室外比较冷，一冷一热……冠心病容易发生的这个事件' },
    quality: 'A',
    topicTags: ['cold-response', 'heart-attack', 'epidemiology', 'prevention'],
    relatedTermIds: ['myocardial infarction', 'coronary heart disease'],
  },
  {
    id: 'hela-cells-immortal',
    date: '2026-08-05',
    lesson: '17-1',
    hookName: 'HeLa 细胞至今还在长',
    hookNameEn: 'HeLa cells are still growing',
    oneLiner: {
      en: 'In 1951 a researcher took a cell from Henrietta Lacks\' cervical tumour. The cells are still dividing in labs worldwide — 70+ years and counting. The reason is telomerase: most cancer cells switch it on, so the protective cap at the end of each chromosome never shortens, and the cell never reaches the Hayflick limit. "Immortality" is a cell-biology term before it is a metaphysical one.',
      zh: '1951 年一位研究者从 Henrietta Lacks 的宫颈肿瘤中取出一个细胞。这些细胞至今仍在全世界实验室里分裂——70 多年过去了。原因就是端粒酶：大多数癌细胞会开启它，让每条染色体末端的保护帽永不缩短，细胞永远到不了 Hayflick 上限。"永生"首先是一个细胞生物学名词，然后才是一个哲学名词。',
    },
    transcriptRef: { date: '2026-08-05', approxLine: 574, excerpt: 'HeLa 细胞……那个胃癌病人的一个癌细胞拿到培养皿里面去培养……一直活到现在还没死' },
    quality: 'A',
    topicTags: ['telomere', 'cancer', 'hayflick-limit', 'history-of-science'],
    relatedTermIds: ['telomere', 'cancer'],
  },
  {
    id: 'hygiene-hypothesis-allergy-rise',
    date: '2026-08-05',
    lesson: '10-1',
    hookName: '卫生假说',
    hookNameEn: 'A bit of dirt is part of training',
    oneLiner: {
      en: 'Allergic diseases — asthma, eczema, hay fever, peanut allergy — have roughly tripled in wealthy countries since the 1980s. The leading explanation is the "hygiene hypothesis": children whose immune systems meet fewer microbes in early life end up with a Th2 branch that is over-reactive to harmless things like pollen and food proteins.',
      zh: '过敏性疾病（哮喘、湿疹、花粉症、花生过敏）在富裕国家自 1980 年代以来大约翻了三倍。主流解释是"卫生假说"：免疫系统在生命早期接触微生物太少的孩子，Th2 分支会对花粉和食物蛋白这些无害物质过度反应。',
    },
    transcriptRef: { date: '2026-08-05', approxLine: 339, excerpt: '过敏性疾病在以前并不多，那现在越来越多，其实是现在的很多人从小对孩子的这种，这个这个这个生长环境过于的干净了' },
    quality: 'A',
    topicTags: ['allergy', 'immune-system', 'epidemiology', 'th1-th2'],
    relatedTermIds: ['allergy', 'phagocyte', 'lymphocyte'],
  },
  {
    id: 'asthma-inhaler-movie',
    date: '2026-08-05',
    lesson: '11-1',
    hookName: '电影里的哮喘喷剂',
    hookNameEn: 'The asthma inhaler in a Jay Chou film',
    oneLiner: {
      en: 'In a Jay Chou film, a character reaches for a reliever inhaler during an asthma attack. The prop is medically accurate: a salbutamol inhaler relaxes the smooth muscle wrapped around the bronchioles, opening the airway within minutes. Without it, a severe attack can cause death from hypoxia in minutes.',
      zh: '周杰伦的一部电影里，一个角色在哮喘发作时抓起一支缓解型吸入器。这个道具医学上是对的：沙丁胺醇吸入剂能放松细支气管周围的平滑肌，几分钟内打开气道。严重发作时没有它，可能因缺氧几分钟内死亡。',
    },
    transcriptRef: { date: '2026-08-05', approxLine: 159, excerpt: '我自己小时候，我有有哮喘……陆小雨他不是就是要拿出一个喷的东西嘛' },
    quality: 'A',
    topicTags: ['asthma', 'rescue-inhaler', 'pop-culture', 'first-person'],
    relatedTermIds: ['asthma', 'bronchiole'],
  },
  {
    id: 'mucociliary-escalator-phlegm',
    date: '2026-08-05',
    lesson: '11-1',
    hookName: '咳出来的灰痰',
    hookNameEn: 'Where the grey phlegm comes from',
    oneLiner: {
      en: 'After a long day in Beijing traffic, a student coughs up a grey blob and asks where it came from. The answer is the mucociliary escalator: a thin layer of sticky mucus on the airway lining has been moving all day, sweeping up dust and soot and bacteria, and at the top of the trachea it is swallowed. The grey colour is the day\'s pollution, trapped and removed.',
      zh: '在北京的街头走了一整天，一个学生咳出一团灰痰，问它从哪儿来。答案是"黏液-纤毛自动梯"：气道内壁那层黏液一整天都在向上移动，把灰尘、烟尘、细菌扫到气管顶端，然后被咽下。灰色就是当天吸入的污染物，被抓住、被清出来了。',
    },
    transcriptRef: {
      date: '2026-08-05',
      approxLine: 145,
      excerpt: '……黏液-纤毛自动梯……像传送带一样……往上推',
    },
    quality: 'A',
    topicTags: ['mucociliary-escalator', 'goblet-cell', 'cilium', 'mucus', 'pollution', 'first-person'],
    relatedTermIds: ['goblet cell', 'mucus', 'cilium', 'trachea'],
    whatItReplaces: {
      en: 'The abstract "lungs have a cleaning system". With the coughing-up-grey-phlegm image, the student sees the escalator as something with a real product you can hold in a tissue. The mechanism (goblet cell → mucus → cilia → throat) stops being a list of glossary words and becomes a thing that explains a moment they have lived.',
      zh: '抽象的"肺有一套清洁系统"。有了"咳出灰痰"的画面，自动梯变成了一张真的能用纸巾接住的东西。机制（杯状细胞→黏液→纤毛→喉咙）不再是一串生词，而能解释他们自己经历过的一个具体瞬间。',
    },
    source: {
      en: 'G8 Science · p.38, Section B8.02, Goblet cells paragraph — "cilia beat in a synchronised wave, sweeping the mucus up toward the back of the throat"',
      zh: 'G8 教材·第 38 页 B8.02 节，杯状细胞段——"纤毛同步摆动，把黏液向上扫到咽喉"',
    },
  },
  {
    id: 'insulin-glucagon-pendulum',
    date: '2026-08-05',
    lesson: '14-3',
    hookName: '胰岛素 vs 胰高血糖素',
    hookNameEn: 'Insulin and glucagon as a pendulum',
    oneLiner: {
      en: 'After a meal, blood glucose rises; insulin is released, the body stores the excess as glycogen. A few hours later, glucose starts to fall; glucagon is released, the body breaks glycogen back down into glucose. The two hormones are a single two-way feedback loop — the textbook example of a homeostatic pendulum.',
      zh: '饭后血糖升高，胰岛素释放，多余的糖以糖原形式储存。几小时后血糖开始下降，胰高血糖素释放，身体把糖原再分解为葡萄糖。两种激素构成一个双向反馈回路——稳态钟摆的教科书例子。',
    },
    transcriptRef: { date: '2026-08-05', approxLine: 30, excerpt: '通过就是胰胰脏分泌胰岛素……还有另外一种就是能够再把血糖放回去' },
    quality: 'A',
    topicTags: ['homeostasis', 'glucose', 'feedback-loop', 'pancreas'],
    relatedTermIds: ['insulin', 'glucagon', 'pancreas', 'glycogen', 'diabetes mellitus'],
  },
  {
    id: 'fish-single-loop-vs-mammal-double',
    date: '2026-08-05',
    lesson: '9-1',
    hookName: '鱼只有一套循环',
    hookNameEn: 'A fish has only one circuit',
    oneLiner: {
      en: 'A fish has a single-circuit circulation: heart → gills (gas exchange) → body → heart. Mammals evolved a second loop because our lungs are far from the heart and a single loop cannot deliver enough oxygen at the pressures a four-chambered heart can produce. The cleanest anatomy comparison in cardiovascular biology.',
      zh: '鱼只有单循环：心→鳃（气体交换）→身体→心。哺乳动物演化出第二套循环，因为我们的肺离心脏远，单循环无法以四腔心脏能产生的压力输送足够氧气。心血管生物学里最干净的解剖对比。',
    },
    transcriptRef: { date: '2026-08-05', approxLine: 532, excerpt: '而比如说像鱼，它就只有一套循环……它就直接把这个血经过塞在塞的时候就直接换气了' },
    quality: 'A',
    topicTags: ['evolution', 'circulation', 'comparative-anatomy'],
    relatedTermIds: ['double circulation', 'heart'],
  },
  {
    id: 'anaerobic-yeast-bread',
    date: '2026-08-05',
    lesson: '7-1',
    hookName: '发面 = 酵母的无氧呼吸',
    hookNameEn: 'Bread rises because yeast suffocate',
    oneLiner: {
      en: 'When yeast runs out of oxygen in a dough, it switches to anaerobic respiration: glucose is broken down into ethanol and CO₂. The CO₂ gets trapped in the elastic dough and inflates it. The same process, with different microbes, is brewing. Fermentation is biology\'s most ancient form of energy harvesting.',
      zh: '酵母在面团里用完氧气后切换到无氧呼吸：葡萄糖被分解为乙醇和 CO₂。CO₂ 被面团截住、把它撑大。同样的过程换个微生物就是酿酒。发酵是生物最古老的能量获取方式。',
    },
    transcriptRef: { date: '2026-08-05', approxLine: 256, excerpt: '面团会从小小的变变大……酵母菌在呼吸……产生了很多的二氧化碳' },
    quality: 'A',
    topicTags: ['anaerobic-respiration', 'fermentation', 'yeast', 'food'],
    relatedTermIds: ['anaerobic respiration', 'yeast', 'lactic acid'],
  },
  {
    id: 'end-replication-telomere',
    date: '2026-08-05',
    lesson: '17-1',
    hookName: '端粒每复制一次短一点',
    hookNameEn: 'Telomeres shorten with every division',
    oneLiner: {
      en: 'Every cell division loses a few letters from the ends of every chromosome. The body protects the important genes by capping each chromosome with a long stretch of throwaway repeats (TTAGGG) — the telomere. When the telomere is gone, the cell stops dividing and dies. Cancer cells cheat by switching on telomerase to rebuild the cap.',
      zh: '每次细胞分裂，每条染色体末端都会损失几个字母。身体把真正重要的基因用一长串可丢弃的重复序列（人类是 TTAGGG）保护起来——这就是端粒。端粒用完后，细胞就停止分裂并死亡。癌细胞作弊：开启端粒酶，把端粒重新补上。',
    },
    transcriptRef: { date: '2026-08-05', approxLine: 562, excerpt: '有一段尾巴叫做DNA的端粒，这段尾巴会每复制一次会缩短一点，直到缩短到这个尾巴没了以后，它就没法再复制了' },
    quality: 'A',
    topicTags: ['telomere', 'ageing', 'cancer', 'cell-division'],
    relatedTermIds: ['chromosome', 'dna', 'gene'],
  },
]

// ---------------------------------------------------------------------------
// 11-1 review + 14-1 nervous system + eye + visual — 8/6 lesson
// ---------------------------------------------------------------------------

const S_8_6_NERVOUS_AND_VISION: ClassroomStory[] = [
  {
    id: 'back-of-hand-electricity',
    date: '2026-08-06',
    lesson: '14-1',
    hookName: '用手背去摸电门',
    hookNameEn: 'Touch a live wire with the back of your hand',
    oneLiner: {
      en: 'If you grip a live wire, the reflex arc contracts your fingers tighter and you cannot let go. If you brush it with the back of your hand, the reflex contracts the extensors and snaps you away. A reflex arc is fast — too fast to override — so the safety rule is to use the back of the hand, not the palm.',
      zh: '握住带电的电线时，反射弧会让手指越抓越紧，你根本松不开。但若用手背蹭到，反射会让伸肌收缩，手自动弹开。反射弧反应快到你来不及控制——所以安全原则是用手背摸，不是用掌心。',
    },
    transcriptRef: {
      date: '2026-08-06',
      approxLine: 348,
      excerpt: '如果你手背触了电，你马上就收回来。但如果你是这样子去抓，那就是一把抓住以后你是不受控制的',
    },
    quality: 'A',
    topicTags: ['reflex-arc', 'antagonistic-muscles', 'safety', 'real-world'],
    relatedTermIds: ['reflex action', 'motor neurone', 'effector'],
    whatItReplaces: {
      en: 'The textbook "reflex is fast" line. With the live-wire example, the student sees that the same speed that protects you from a hotplate can also lock you onto a live wire — and that the choice of which side of the hand to use is a literal life-safety decision.',
      zh: '教材"反射很快"那句笼统的总结。带电电线的例子让学生看到：保护你远离热盘的速度，也可能让你死死抓在电线上——用哪面手去摸，是真真切切的生死选择。',
    },
    source: {
      en: 'Teacher anecdote, G8 classroom 8/6',
      zh: '老师口述，G8 课堂 8/6',
    },
  },
  {
    id: 'invisible-gorilla',
    date: '2026-08-06',
    lesson: '14-1',
    hookName: '看不见的大猩猩',
    hookNameEn: 'The invisible gorilla',
    oneLiner: {
      en: 'In Simons & Chabris\' 1999 experiment, viewers count basketball passes between players in white shirts. About half miss a person in a gorilla suit walking through the middle of the game, thumping their chest. The "I would have seen it" instinct is wrong — attention is a spotlight, and what is outside the spotlight does not enter consciousness at all.',
      zh: '1999 年 Simons 与 Chabris 的实验：让观众数白队球员之间的传球次数。大约一半的人完全没看见一个穿大猩猩戏服的人从赛场中央走过、拍打胸脯。"我肯定会看到"只是一种直觉——注意力是一束聚光灯，聚光灯之外的东西根本进不了意识。',
    },
    transcriptRef: {
      date: '2026-08-06',
      approxLine: 413,
      excerpt: '这个视频当中里面有两支球队，他们白队一共传了几次球？... 你发现了什么... 你注意到黑队有一名队员离场了',
    },
    quality: 'A',
    topicTags: ['selective-attention', 'change-blindness', 'visual-perception', 'classic-experiment'],
    relatedTermIds: ['visual perception', 'cerebral cortex'],
    whatItReplaces: {
      en: '"The eye sees everything that is in front of it". The gorilla experiment shows that attention is a resource with a narrow spotlight — what falls outside it is invisible even when it is in plain view.',
      zh: '"眼睛把面前所有东西都看到了"。大猩猩实验说明，注意力是带宽有限的聚光灯——落在光圈之外的东西，就算在视野正中央，也完全看不见。',
    },
    source: {
      en: 'Simons, D. J., & Chabris, C. F. (1999). "Gorillas in our midst", Perception, played in class 8/6',
      zh: 'Simons, D. J., & Chabris, C. F. (1999). "Gorillas in our midst", Perception, 课堂播放于 8/6',
    },
  },
  {
    id: 'missing-puzzle-piece-on-face',
    date: '2026-08-06',
    lesson: '14-1',
    hookName: '拼图缺块就贴在脸上',
    hookNameEn: 'The missing piece is on her face',
    oneLiner: {
      en: 'A puzzle shows a woman sitting in a chair. The student is told one piece is missing. They search for five minutes, then give up. The piece was on the woman\'s face — large, right in the centre, the size of a hand. The brain knows the shape of a face, so it skips the discrepancy and "completes" what should be there. This is change blindness at its most embarrassing.',
      zh: '一张拼图：一位女士坐在椅子上。提示少了一块。学生找五分钟，放弃。那块就在女士脸上——又大、又在正中央、有一个巴掌那么大。但大脑"知道"脸长什么样，自动把缺失的部分"补"了出来。这就是变化盲最让人尴尬的样子。',
    },
    transcriptRef: {
      date: '2026-08-06',
      approxLine: 419,
      excerpt: '请你在哪里... 我找了5分钟，我都没找到在哪里... 他那个眼霜正好是大块，但我始终，我从来都没有发现',
    },
    quality: 'A',
    topicTags: ['change-blindness', 'visual-completion', 'selective-attention'],
    relatedTermIds: ['visual perception', 'cerebral cortex'],
    whatItReplaces: {
      en: 'The abstract "the brain fills in missing information". The face-puzzle example makes the cost concrete: you can stare straight at a missing piece and never see it, because the brain\'s pattern-completion is faster than your conscious inspection.',
      zh: '"大脑会把缺失的信息补全"——抽象描述。脸拼图的例子把这个代价讲清楚了：你可能直直盯着缺失的那块看，但根本看不见，因为大脑的"模式补全"比你自觉的检查快得多。',
    },
  },
  {
    id: 'corpus-callosotomy-epilepsy',
    date: '2026-08-06',
    lesson: '14-1',
    hookName: '把左右脑切一刀人还活着',
    hookNameEn: 'Cut the brain in half — the patient lives',
    oneLiner: {
      en: 'For severe epilepsy, surgeons in the mid-20th century severed the corpus callosum — the thick bundle of fibres that lets the two hemispheres talk. The seizures stopped, the patient walked out of hospital, and personality tests later showed that the two halves of the brain were now thinking independently. The operation revealed, by accident, that the brain is two cooperating organs, not one.',
      zh: '上世纪中叶，对严重的癫痫，外科医生切断胼胝体——连接两个大脑半球的那束粗大纤维。癫痫停了，病人走出医院，事后人格测试发现：两个半球已经在独立思考。这个手术意外地揭示了一件事：大脑其实是两个互相配合的器官，不是一个。',
    },
    transcriptRef: {
      date: '2026-08-06',
      approxLine: 405,
      excerpt: '大脑左右半球当中连接的那个通路给它切掉，就硬生生直接给它切掉... 这个人还是活的好好的',
    },
    quality: 'A',
    topicTags: ['brain-hemispheres', 'corpus-callosum', 'epilepsy', 'neurosurgery', 'cortical-plasticity'],
    relatedTermIds: ['cerebrum', 'cerebral hemisphere'],
    whatItReplaces: {
      en: '"The brain is one organ". The split-brain story replaces this with the more accurate "the brain is two cooperating organs that we now know are partly independent — and which half of the brain handles a task depends on the task".',
      zh: '"大脑是一个器官"。裂脑实验把它换成更准确的"大脑是互相配合的两个器官，我们现在知道它们部分是独立的——具体哪一半负责什么，取决于任务"。',
    },
    source: {
      en: 'Sperry, R. & Gazzaniga, M., split-brain studies 1960s',
      zh: 'Sperry, R. 与 Gazzaniga, M. 1960 年代裂脑研究',
    },
  },
  {
    id: 'brainport-tongue-sees',
    date: '2026-08-06',
    lesson: '14-1',
    hookName: '舌头能看见',
    hookNameEn: 'A tongue can learn to "see"',
    oneLiner: {
      en: 'BrainPort, a device from the 2000s, puts a camera on a blind person\'s forehead and routes the image to a small electrode array on the tongue. The pixels arrive as tiny tingles; the blind person\'s brain learns to read the tingles as a low-resolution picture within days — and uses it to navigate around obstacles. The eye is not magic; the brain is plastic.',
      zh: '2000 年代的 BrainPort 设备，把摄像头装在盲人额头，把图像转成舌面上一片小电极的微弱电刺激。盲人的大脑几天之内就学会把"舌尖上的麻点"读成一张低分辨率图像——并用它避开障碍。眼睛没有魔法；大脑是可塑的。',
    },
    transcriptRef: {
      date: '2026-08-06',
      approxLine: 285,
      excerpt: '在在舌头下面。查一些电极... 对于那些盲人，在你头上装个摄像头... 能够感知到空间当中的障碍物',
    },
    quality: 'A',
    topicTags: ['brain-computer-interface', 'cortical-plasticity', 'vision', 'neural-implant'],
    relatedTermIds: ['cerebral cortex', 'neurone'],
    whatItReplaces: {
      en: '"Vision is in the eye". BrainPort replaces this with "vision is in the brain — the eye is one possible input, but any signal the brain can learn to interpret will do, including tingles on the tongue".',
      zh: '"视觉是眼睛的事"。BrainPort 把它换成"视觉是大脑的事——眼睛只是众多可能的输入之一，任何大脑能学会解读的信号都可以，包括舌尖的麻点"。',
    },
    source: {
      en: 'BrainPort vision prosthesis, Wicab Inc., 2000s; teacher recalled a visit to an Israeli research lab',
      zh: 'BrainPort 视觉假体，Wicab 公司，2000 年代；老师回忆一次以色列研究机构访问',
    },
  },
  {
    id: 'shanghai-chopstick-shadow',
    date: '2026-08-06',
    lesson: '14-1',
    hookName: '上海的筷子永远有影子',
    hookNameEn: 'A chopstick in Shanghai always has a shadow',
    oneLiner: {
      en: 'The Earth\'s axis tilts at 23.5° (the "obliquity"). The Tropic of Cancer sits at 23.5° N — anywhere north of it, the sun never reaches the zenith. Stick a chopstick vertically into the ground in Shanghai (~31° N): it always has a shadow at noon. Only between the two tropics does a vertical pole briefly cast no shadow at all — twice a year, on the equinox-ish days.',
      zh: '地球自转轴倾斜 23.5°（"黄赤交角"）。北回归线就在北纬 23.5°——比这更北的地方，太阳永远到不了天顶。在上海（约北纬 31°）立一根垂直的筷子，正午永远有影子。只有南北回归线之间的地带，垂直的杆子一年里才会有两三天完全没有影子。',
    },
    transcriptRef: {
      date: '2026-08-06',
      approxLine: 19,
      excerpt: '我们上海是在北纬30~31度附近，它是超过北回归线... 你树一根垂直于地面的筷子，它是完全没有影子的',
    },
    quality: 'A',
    topicTags: ['axial-tilt', 'seasons', 'sun', 'tropic-of-cancer', 'earth-geometry'],
    relatedTermIds: ['sun', 'seasons'],
    whatItReplaces: {
      en: '"The Earth is tilted, that is why we have seasons" — usually taught as a fact without a daily-life consequence. The chopstick line turns it into something the student can actually check: tomorrow at noon, take a chopstick outside.',
      zh: '"地球是斜的，所以才有四季"——平时只作为事实讲授，没有落到日常。筷子这一句把它变成学生真能验证的事：明早正午，拿根筷子出门。',
    },
    source: {
      en: 'G8 classroom 8/6, axial tilt = 23.5°',
      zh: 'G8 课堂 8/6，黄赤交角 = 23.5°',
    },
  },
  {
    id: 'right-bronchus-wider',
    date: '2026-08-06',
    lesson: '11-1',
    hookName: '右边气管更粗更直',
    hookNameEn: 'The right bronchus is wider and straighter',
    oneLiner: {
      en: 'An inhaled peanut almost always ends up in the right lung, not the left. Three reasons stack up: the right lung has three lobes vs the left\'s two, so the right bronchus gets more "slots"; the right main bronchus is wider; and it is more vertical — it is the path of least resistance for a falling object. Food "going down the wrong way" lands in the right lung about 7 times out of 10.',
      zh: '误吸的花生几乎总落在右肺而不是左肺。三条原因叠在一起：右肺三叶左肺两叶，右支气管"分到的位置"更多；右主支气管更粗；而且更垂直——是下落物体的最小阻力路径。食物"呛到气管"约 10 次有 7 次落在右肺。',
    },
    transcriptRef: {
      date: '2026-08-06',
      approxLine: 233,
      excerpt: '右边有3片，左边有两片... 这根管子呢，又粗又垂直... 它掉的话，是不是更容易掉到这个垂直的关节',
    },
    quality: 'A',
    topicTags: ['airway-anatomy', 'aspiration', 'choking', 'right-vs-left'],
    relatedTermIds: ['bronchus', 'lung'],
    whatItReplaces: {
      en: '"Foreign bodies go into the lungs" without further detail. With the right-vs-left detail, the student sees anatomy explaining a daily-life observation: why first-aid trainers tell you to slap the back, not press the chest, when a child has inhaled a peanut.',
      zh: '"异物进入肺"——到此为止的描述。讲清左右差异后，学生能从一个日常观察反推解剖：为什么小孩呛到花生时急救培训师让你拍背，不让你压胸。',
    },
    source: {
      en: 'G8 Science Chapter 8 (B8), Figure B8.01 + B8.06',
      zh: 'G8 教材第 8 章（B8），图 B8.01 + B8.06',
    },
  },
  {
    id: 'o2-scalper-haemoglobin',
    date: '2026-08-06',
    lesson: '11-1',
    hookName: 'O₂ 的黄牛',
    hookNameEn: 'Oxygen\'s ticket scalper',
    oneLiner: {
      en: 'Carbon monoxide binds to haemoglobin about 200 times more tightly than oxygen does. A heavy smoker can have ~10% of their haemoglobin occupied by CO — that is the same effective oxygen-carrying loss as a mild anaemia, except the haemoglobin is still there, it is just blocked. Think of CO as a scalper who sits in 99% of the seats and lets almost no one else on.',
      zh: '一氧化碳与血红蛋白的结合力大约是氧气的 200 倍。重度吸烟者可能有约 10% 的血红蛋白被 CO 占据——运氧能力的实际损失相当于轻度贫血，只不过血红蛋白还在那里，只是被占住了。把 CO 想象成黄牛：占了 99% 的座位，几乎不让人上去。',
    },
    transcriptRef: {
      date: '2026-08-06',
      approxLine: 261,
      excerpt: '一氧化碳的对于红细胞的亲和力比氧要强200倍... 那群黄牛，抢票能力特别。抢99%的票都被他抢走了',
    },
    quality: 'B',
    topicTags: ['haemoglobin', 'carbon-monoxide', 'smoking', 'analogy'],
    relatedTermIds: ['haemoglobin', 'carbon monoxide'],
    whatItReplaces: {
      en: '"CO is bad because it binds haemoglobin". The scalper analogy turns the 200× number into something the student can picture: not "200 times more tightly" but "sits in 99 of 100 seats, blocks everyone else".',
      zh: '"CO 不好是因为它会结合血红蛋白"。黄牛的比喻把"200 倍"这个数变成学生脑子里能浮现的画面——不是"亲和力强 200 倍"，而是"占了 100 个座位里的 99 个，把别的乘客挡在外面"。',
    },
    source: {
      en: 'G8 Science Chapter 8 (B8), p.45 + teacher\'s "ticket scalper" framing 8/6',
      zh: 'G8 教材第 8 章（B8）第 45 页 + 老师 8/6 课堂"黄牛抢票"说法',
    },
  },
]

// ---------------------------------------------------------------------------
// Public export
// ---------------------------------------------------------------------------

/** Every classroom story captured so far, in story-date order. */
export const classroomStories: ClassroomStory[] = [
  ...S_8_3_NUTRITION,
  ...S_8_4_NUTRITION,
  ...S_8_5_CIRCULATION_AND_GAS,
  ...S_8_6_NERVOUS_AND_VISION,
].sort((a, b) => a.date.localeCompare(b.date) || a.lesson.localeCompare(b.lesson))

/** Filter helper. Empty / missing fields are not used. */
export function storiesFor(opts: {
  lesson?: string
  topic?: string
  quality?: StoryQuality
  date?: string
}): ClassroomStory[] {
  return classroomStories.filter((s) => {
    if (opts.lesson && s.lesson !== opts.lesson) return false
    if (opts.topic && !s.topicTags.includes(opts.topic)) return false
    if (opts.quality && s.quality !== opts.quality) return false
    if (opts.date && s.date !== opts.date) return false
    return true
  })
}

/** Group stories by lesson, in lesson order. */
export function storiesByLesson(): Record<string, ClassroomStory[]> {
  const out: Record<string, ClassroomStory[]> = {}
  for (const s of classroomStories) {
    if (!out[s.lesson]) out[s.lesson] = []
    out[s.lesson]!.push(s)
  }
  return out
}

/** Look up a single story by its slug. */
export function findStory(id: string): ClassroomStory | undefined {
  return classroomStories.find((s) => s.id === id)
}
