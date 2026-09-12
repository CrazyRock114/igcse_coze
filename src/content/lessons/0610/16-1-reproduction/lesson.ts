import type { Lesson } from '@/content/types'
import narration from './narration'

const lesson: Lesson = {
  slug: '16-1-reproduction',
  subject: '0610',
  syllabus: [
    '0610.16.1.1',
    '0610.16.1.2',
    '0610.16.1.3',
    '0610.16.2.1',
    '0610.16.2.2',
    '0610.16.2.3',
    '0610.16.2.4',
    '0610.16.3.1',
    '0610.16.3.2',
    '0610.16.3.3',
    '0610.16.3.4',
    '0610.16.3.5',
    '0610.16.3.6',
    '0610.16.3.7',
    '0610.16.3.8',
    '0610.16.3.9',
    '0610.16.3.10',
    '0610.16.3.11',
    '0610.16.3.12',
    '0610.16.4.1',
    '0610.16.4.2',
    '0610.16.4.3',
    '0610.16.4.4',
    '0610.16.4.5',
    '0610.16.4.6',
    '0610.16.4.7',
    '0610.16.4.8',
    '0610.16.4.9',
    '0610.16.4.10',
    '0610.16.5.1',
    '0610.16.5.2',
    '0610.16.5.3',
    '0610.16.5.4',
    '0610.16.6.1',
    '0610.16.6.2',
    '0610.16.6.3',
    '0610.16.6.4',
    '0610.16.6.5',
  ],
  tier: 'extended',
  estimatedMinutes: 75,

  title: { en: 'Reproduction', zh: '生殖' },
  summary: {
    en: 'Ovulation is fourteen days before the next period, not fourteen days after the last one. Lengthen the cycle and watch it move.',
    zh: '排卵是在下一次月经的前十四天，而不是上一次月经之后的第十四天。把周期调长，看它如何移动。',
  },

  objectives: [
    {
      en: 'Describe asexual and sexual reproduction, and discuss the advantages and disadvantages of each. (Extended)',
      zh: '描述无性生殖与有性生殖，并讨论各自的优缺点。（Extended）',
    },
    {
      en: 'Identify the parts of an insect-pollinated flower and state their functions.',
      zh: '识别虫媒花的各部分并说出其功能。',
    },
    {
      en: 'Describe pollination and fertilisation in plants, and the adaptations of insect- and wind-pollinated flowers.',
      zh: '描述植物的传粉与受精，以及虫媒花与风媒花的适应特征。',
    },
    {
      en: 'Describe self- and cross-pollination and their effects on a population, and the growth of the pollen tube. (Extended)',
      zh: '描述自花与异花传粉及其对种群的影响，以及花粉管的生长。（Extended）',
    },
    {
      en: 'Identify the parts of the human reproductive systems and explain the adaptive features of sperm and egg cells.',
      zh: '识别人体生殖系统各部分，并解释精子与卵细胞的适应性特征。',
    },
    {
      en: 'State the functions of the placenta, umbilical cord and amniotic sac, and describe exchange at the placenta. (Extended)',
      zh: '说出胎盘、脐带与羊膜囊的功能，并描述胎盘处的物质交换。（Extended）',
    },
    {
      en: 'Describe and explain the hormonal control of the menstrual cycle and of pregnancy. (Extended)',
      zh: '描述并解释月经周期与妊娠的激素调控。（Extended）',
    },
    {
      en: 'Describe sexually transmitted infections, the transmission of HIV, and how their spread is controlled.',
      zh: '描述性传播感染、HIV 的传播途径，以及如何控制其扩散。',
    },
  ],

  glossary: [
    {
      en: 'pollination',
      zh: '传粉',
      definition: {
        en: 'The transfer of pollen from an anther to a stigma. Not fertilisation — that happens afterwards, when nuclei fuse.',
        zh: '花粉由花药转移到柱头。它不是受精——受精发生在其后，当细胞核融合时。',
      },
      syllabus: ['0610.16.3.5'],
    },
    {
      en: 'fertilisation',
      zh: '受精',
      definition: {
        en: 'The fusion of the nuclei of two gametes, giving a diploid zygote. In humans it happens in the oviduct.',
        zh: '两个配子细胞核的融合，形成二倍体合子。在人体中它发生于输卵管。',
      },
      syllabus: ['0610.16.2.2', '0610.16.4.3'],
    },
    {
      en: 'zygote',
      zh: '合子',
      definition: {
        en: 'The diploid cell formed when two haploid gamete nuclei fuse. It divides to form an embryo.',
        zh: '两个单倍体配子核融合后形成的二倍体细胞。它分裂形成胚胎。',
      },
      syllabus: ['0610.16.2.3'],
    },
    {
      en: 'corpus luteum',
      zh: '黄体',
      definition: {
        en: 'What remains of the follicle after ovulation. It secretes progesterone, and breaks down if no embryo implants.',
        zh: '排卵后卵泡剩余的部分。它分泌孕激素，若无胚胎植入便会退化。',
      },
      syllabus: ['0610.16.5.3'],
    },
    {
      en: 'placenta',
      zh: '胎盘',
      definition: {
        en: 'The organ where the mother’s and the fetus’s blood come close enough to exchange materials by diffusion — without ever mixing.',
        zh: '母体血液与胎儿血液足够接近以进行扩散交换的器官——但两者从不混合。',
      },
      syllabus: ['0610.16.4.8', '0610.16.4.9'],
    },
    {
      en: 'acrosome',
      zh: '顶体',
      definition: {
        en: 'The tip of a sperm, holding enzymes that digest a path through the outer layers of the egg.',
        zh: '精子的顶端，内含能消化卵细胞外层、开出通路的酶。',
      },
      syllabus: ['0610.16.4.4'],
    },
    {
      en: 'amniotic fluid',
      zh: '羊水',
      definition: {
        en: 'The fluid in the amniotic sac. It cushions the fetus against knocks and supports its weight.',
        zh: '羊膜囊中的液体。它缓冲外来撞击并支撑胎儿的重量。',
      },
      syllabus: ['0610.16.4.8'],
    },
    // ---- 2026-08-21 Vocabulary gap-fill (讲义实际术语) ----
    {
      en: 'asexual reproduction',
      zh: '无性生殖',
      definition: {
        en: 'Reproduction that needs only one parent, producing offspring that are genetically identical clones. Examples: bacteria dividing, strawberry runners, potato tubers, fungal spores.',
        zh: '只需要一个亲本的生殖方式，后代是与亲本遗传上完全一致的克隆。例子：细菌分裂、草莓匍匐茎、马铃薯块茎、真菌孢子。',
      },
      syllabus: ['0610.16.1.1'],
    },
    {
      en: 'sexual reproduction',
      zh: '有性生殖',
      definition: {
        en: 'Reproduction that fuses the nuclei of two gametes (one from each parent) to form a diploid zygote. Produces variation.',
        zh: '融合两个配子（各来自一个亲本）的细胞核、形成二倍体合子的生殖方式。能产生变异。',
      },
      syllabus: ['0610.16.1.2'],
    },
    {
      en: 'gamete',
      zh: '配子',
      definition: {
        en: 'A haploid sex cell (sperm or egg) carrying one set of chromosomes. Two gametes fuse at fertilisation to make a diploid zygote.',
        zh: '单倍体的性细胞（精子或卵），带有一套染色体。两个配子在受精时融合，形成二倍体合子。',
      },
      syllabus: ['0610.16.2.1'],
    },
    {
      en: 'haploid',
      zh: '单倍体',
      definition: {
        en: 'A cell with a single set of chromosomes (n). Human gametes are haploid; the zygote and all body cells are diploid (2n).',
        zh: '只有一套染色体的细胞（n）。人的配子是单倍体；合子与所有体细胞都是二倍体（2n）。',
      },
      syllabus: ['0610.16.2.1'],
    },
    {
      en: 'diploid',
      zh: '二倍体',
      definition: {
        en: 'A cell with two sets of chromosomes (2n). Formed when two haploid gametes fuse at fertilisation.',
        zh: '有两套染色体的细胞（2n）。两个单倍体配子在受精时融合后形成。',
      },
      syllabus: ['0610.16.2.3'],
    },
    {
      en: 'meiosis',
      zh: '减数分裂',
      definition: {
        en: 'The cell division that produces gametes. Halves the chromosome number so fertilisation restores the diploid state.',
        zh: '产生配子的细胞分裂方式。它把染色体数目减半，使受精后恢复二倍体状态。',
      },
      syllabus: ['0610.16.2.1'],
    },
    {
      en: 'stamen',
      zh: '雄蕊',
      definition: {
        en: 'The male reproductive part of a flower. Made of an anther (which makes pollen) on a filament.',
        zh: '花的雄性生殖部分。由产生花粉的花药和支持它的花丝组成。',
      },
      syllabus: ['0610.16.3.1'],
    },
    {
      en: 'anther',
      zh: '花药',
      definition: {
        en: 'The pollen-producing part at the tip of a stamen.',
        zh: '雄蕊顶端产生花粉的部分。',
      },
      syllabus: ['0610.16.3.1'],
    },
    {
      en: 'carpel',
      zh: '心皮',
      definition: {
        en: 'The female reproductive part of a flower. Made of a stigma (top), a style (middle), and an ovary (base, containing ovules).',
        zh: '花的雌性生殖部分。由柱头（顶部）、花柱（中部）和含胚珠的子房（基部）组成。',
      },
      syllabus: ['0610.16.3.1'],
    },
    {
      en: 'stigma',
      zh: '柱头',
      definition: {
        en: 'The sticky top of a carpel. Catches pollen during pollination.',
        zh: '心皮顶端的黏性部分。传粉时接收花粉。',
      },
      syllabus: ['0610.16.3.1'],
    },
    {
      en: 'ovule',
      zh: '胚珠',
      definition: {
        en: 'The structure inside an ovary that contains the female gamete. After fertilisation it becomes the seed.',
        zh: '子房内含雌配子的结构。受精后发育成种子。',
      },
      syllabus: ['0610.16.3.1'],
    },
    {
      en: 'pollen tube',
      zh: '花粉管',
      definition: {
        en: 'A tube that grows from a pollen grain down through the style to the ovule, carrying the male nucleus to the female gamete.',
        zh: '从花粉粒沿花柱向下长入胚珠的管子，把雄核运到雌配子处。',
      },
      syllabus: ['0610.16.3.5'],
    },
    {
      en: 'sperm',
      zh: '精子',
      definition: {
        en: 'The male gamete. Tiny, motile (has a tail), and released in huge numbers — millions per day after puberty. Built to travel, not to feed.',
        zh: '雄配子。微小、能动（有尾）、数量极多——青春期后每天数百万。为运动而造，不承担供养。',
      },
      syllabus: ['0610.16.4.1', '0610.16.4.4'],
    },
    {
      en: 'egg',
      zh: '卵(子)',
      definition: {
        en: 'The female gamete. Much larger than a sperm, full of cytoplasm and food store for the early embryo. Does not move on its own.',
        zh: '雌配子。比精子大得多，富含细胞质和早期胚胎所需的营养物质。自身不能移动。',
      },
      syllabus: ['0610.16.4.2', '0610.16.4.5'],
    },
    {
      en: 'testis',
      zh: '睾丸',
      definition: {
        en: 'The male gonad. Produces sperm (millions per day from about age 12–14) and the hormone testosterone. Hangs outside the body because sperm production needs a temperature slightly below core temperature.',
        zh: '男性性腺。生成精子（自 12–14 岁起每天数百万）并分泌睾酮。位于体外是因为精子生成需要略低于核心体温的温度。',
      },
      syllabus: ['0610.16.4.1'],
    },
    {
      en: 'scrotum',
      zh: '阴囊',
      definition: {
        en: 'The pouch of skin holding the testes outside the body. Its muscle wall contracts in the cold and relaxes in the heat, regulating testicular temperature.',
        zh: '兜住睾丸位于体外的皮囊。肌壁在寒冷时收缩、炎热时放松，调节睾丸温度。',
      },
      syllabus: ['0610.16.4.1'],
    },
    {
      en: 'epididymis',
      zh: '附睾',
      definition: {
        en: 'A long coiled tube on the outside of each testis where sperm mature and become motile. Sperm take about a week to pass through it.',
        zh: '睾丸外侧的细长盘曲管道，精子在此成熟并获得运动能力。精子通过约需一周。',
      },
      syllabus: ['0610.16.4.1'],
    },
    {
      en: 'vas deferens',
      zh: '输精管',
      definition: {
        en: 'The tube that carries sperm from the epididymis up into the body and around the bladder to join the urethra. It is cut in a vasectomy.',
        zh: '把精子从附睾向上绕膀胱送到尿道的管道。输精管结扎术就是切断它。',
      },
      syllabus: ['0610.16.4.1'],
    },
    {
      en: 'prostate gland',
      zh: '前列腺',
      definition: {
        en: 'Adds a milky alkaline fluid to sperm as they pass through the urethra. The fluid activates sperm and neutralises the acidity of the female tract.',
        zh: '在精子通过尿道时给它加入一种奶状碱性液体。这种液体激活精子，并中和女性生殖道的酸性。',
      },
      syllabus: ['0610.16.4.1'],
    },
    {
      en: 'urethra',
      zh: '尿道',
      definition: {
        en: 'The tube that carries urine from the bladder (and semen from the reproductive tract in males) out of the body. In males, urine and semen do not mix because a sphincter closes during ejaculation.',
        zh: '把尿液（男性还包括精液）排出体外的管道。男性排精时括约肌关闭，使尿和精液不混。',
      },
      syllabus: ['0610.16.4.1'],
    },
    {
      en: 'penis',
      zh: '阴茎',
      definition: {
        en: 'Deposits semen inside the female reproductive tract. Its erectile tissue fills with blood during arousal, making it rigid.',
        zh: '把精液送到女性生殖道内的器官。性唤起时其海绵组织充血而变硬。',
      },
      syllabus: ['0610.16.4.1'],
    },
    {
      en: 'ovary',
      zh: '卵巢',
      definition: {
        en: 'The female gonad. Stores and develops eggs (a baby girl is born with about a million in each ovary). From puberty to menopause, only ONE egg is released at a time, usually one per month — about 400 in a lifetime.',
        zh: '女性性腺。储存并发育卵子（女婴出生时每侧约一百万个）。青春期到绝经期间，每次只排出一个，通常每月一个——一生约 400 个。',
      },
      syllabus: ['0610.16.4.2'],
    },
    {
      en: 'oviduct',
      zh: '输卵管',
      definition: {
        en: 'A tube from the ovary to the uterus, with a funnel-shaped opening that wraps around the ovary. The egg is released into the funnel, where cilia beat rhythmically to waft it in. Fertilisation must happen here within 8 to 24 hours of ovulation.',
        zh: '从卵巢通向子宫的管道，开口端是漏斗状，把卵巢包住。卵子被释放到漏斗里，纤毛有节奏摆动把它"拨"进管内。受精必须发生在排卵后 8–24 小时内。',
      },
      syllabus: ['0610.16.4.2', '0610.16.4.3'],
    },
    {
      en: 'uterus',
      zh: '子宫',
      definition: {
        en: 'The muscular organ where the embryo implants and develops. Its inner lining (endometrium) thickens each cycle and is shed as menstruation if no embryo implants.',
        zh: '胚胎着床并发育的肌肉器官。其内膜（子宫内膜）每个周期增厚，若无胚胎植入则作为月经脱落。',
      },
      syllabus: ['0610.16.4.2', '0610.16.5.5'],
    },
    {
      en: 'endometrium',
      zh: '子宫内膜',
      definition: {
        en: 'The inner lining of the uterus. It thickens under the influence of oestrogen in the first half of the cycle, ready to receive an embryo. If no embryo implants, it is shed as the next period.',
        zh: '子宫的内层。周期前半段在雌激素作用下增厚，准备接受胚胎；若没有胚胎植入，则作为下次月经脱落。',
      },
      syllabus: ['0610.16.5.5'],
    },
    {
      en: 'cervix',
      zh: '子宫颈',
      definition: {
        en: 'The narrow opening at the lower end of the uterus, opening into the vagina. Usually closed, but dilates during childbirth. Cells at its surface are sampled in a cervical smear test.',
        zh: '子宫下端通向阴道的狭窄开口。通常是关闭的，但分娩时会扩张。其表面细胞可由宫颈涂片检查取样。',
      },
      syllabus: ['0610.16.4.2'],
    },
    {
      en: 'vagina',
      zh: '阴道',
      definition: {
        en: 'The muscular tube leading from the cervix to the outside. It is the birth canal and the route by which sperm enter the female reproductive tract. Its lining is kept moist and acidic by mucus.',
        zh: '从子宫颈通向体外的肌肉管道。是产道，也是精子进入女性生殖道的路径。其内壁由黏液保持湿润和酸性。',
      },
      syllabus: ['0610.16.4.2'],
    },
    {
      en: 'FSH',
      zh: '促卵泡激素',
      definition: {
        en: 'Follicle-stimulating hormone. High early in the menstrual cycle. Stimulates a follicle in the ovary to develop and makes the ovary secrete oestrogen.',
        zh: '促卵泡激素。月经周期早期较高。促使卵巢中的卵泡发育，并刺激卵巢分泌雌激素。',
      },
      syllabus: ['0610.16.5.1'],
    },
    {
      en: 'LH',
      zh: '黄体生成素',
      definition: {
        en: 'Luteinising hormone. A mid-cycle surge of LH triggers ovulation — the follicle bursts and releases the egg.',
        zh: '黄体生成素。周期中段的 LH 峰触发排卵——卵泡破裂并释放卵子。',
      },
      syllabus: ['0610.16.5.2'],
    },
    {
      en: 'oestrogen',
      zh: '雌激素',
      definition: {
        en: 'A hormone secreted by the developing follicle. Rebuilds the uterine lining each cycle and, when it gets high enough, triggers the LH surge that causes ovulation.',
        zh: '由发育中的卵泡分泌的激素。每个周期重建子宫内膜，并在浓度足够高时触发引起排卵的 LH 峰。',
      },
      syllabus: ['0610.16.5.3'],
    },
    {
      en: 'progesterone',
      zh: '孕激素',
      definition: {
        en: 'A hormone secreted by the corpus luteum. Maintains the thickened uterine lining so a fertilised egg can implant. Falling progesterone triggers menstruation.',
        zh: '由黄体分泌的激素。维持已增厚的子宫内膜，让受精卵能着床。孕激素下降触发月经。',
      },
      syllabus: ['0610.16.5.4'],
    },
    {
      en: 'ovulation',
      zh: '排卵',
      definition: {
        en: 'The release of an egg from a follicle in the ovary, triggered by the LH surge around day 14 of a 28-day cycle. The egg then travels down the oviduct.',
        zh: '卵子从卵巢的卵泡中释放出来，由周期约第 14 天的 LH 峰触发。卵子随后进入输卵管。',
      },
      syllabus: ['0610.16.5.2'],
    },
    {
      en: 'menstrual cycle',
      zh: '月经周期',
      definition: {
        en: 'The ~28-day cycle of hormone-driven changes in the ovary and uterus. Average 28 days, but the second half is fixed (~14 days from ovulation to next period); the first half varies. Bleeding itself usually lasts about 5 days.',
        zh: '由激素驱动的卵巢和子宫的 ~28 天周期变化。平均 28 天，但后半段固定（排卵到下次月经约 14 天），前半段可变。经期出血本身通常约 5 天。',
      },
      syllabus: ['0610.16.5.5'],
    },
    {
      en: 'implantation',
      zh: '着床',
      definition: {
        en: 'The embedding of the embryo into the thickened uterine lining, about a week after fertilisation. Maintained by progesterone from the corpus luteum.',
        zh: '受精约一周后，胚胎嵌入已增厚的子宫内膜的过程。由黄体分泌的孕激素维持。',
      },
      syllabus: ['0610.16.4.7'],
    },
    {
      en: 'amniotic sac',
      zh: '羊膜囊',
      definition: {
        en: 'The fluid-filled sac that surrounds the fetus. The amniotic fluid cushions knocks and supports the fetus\'s weight so it can grow evenly.',
        zh: '包围胎儿的充满液体的囊。羊水缓冲撞击并支撑胎儿重量，使其能均匀发育。',
      },
      syllabus: ['0610.16.4.8'],
    },
    {
      en: 'umbilical cord',
      zh: '脐带',
      definition: {
        en: 'A flexible tube about 50 cm long linking the fetus to the placenta. Carries two umbilical arteries (fetal → placenta) and one umbilical vein (placenta → fetus). Cut at birth; what remains becomes the belly button.',
        zh: '约 50 cm 长的柔性管，把胎儿与胎盘连接起来。含两条脐动脉（胎儿→胎盘）和一条脐静脉（胎盘→胎儿）。出生时被剪断，残留部分变成肚脐。',
      },
      syllabus: ['0610.16.4.8'],
    },
    {
      en: 'embryo',
      zh: '胚胎',
      definition: {
        en: 'The early stage of development after fertilisation, from the first cell division through to about 8 weeks, when it becomes a fetus.',
        zh: '受精后早期发育阶段，从第一次细胞分裂到约第 8 周，之后称为胎儿。',
      },
      syllabus: ['0610.16.4.7'],
    },
    {
      en: 'fetus',
      zh: '胎儿',
      definition: {
        en: 'The developing baby from about 8 weeks after fertilisation until birth.',
        zh: '从受精约第 8 周到出生期间的发育中的婴儿。',
      },
      syllabus: ['0610.16.4.7'],
    },
    {
      en: 'HIV',
      zh: '人类免疫缺陷病毒',
      definition: {
        en: 'Human Immunodeficiency Virus — the pathogen that causes AIDS. A fragile virus that cannot survive outside the human body; it gets in only when body fluids from an infected person reach the body fluids of someone else.',
        zh: '人类免疫缺陷病毒——引起艾滋病的病原体。脆弱的病毒，不能在人体外存活；只有当感染者的体液进入他人体液时才能传播。',
      },
      syllabus: ['0610.16.6.1'],
    },
    {
      en: 'AIDS',
      zh: '艾滋病',
      definition: {
        en: 'Acquired Immune Deficiency Syndrome — the late stage of untreated HIV infection, in which the immune system can no longer defend the body against other infections.',
        zh: '获得性免疫缺陷综合征——未经治疗的 HIV 感染的晚期，免疫系统已无法抵御其他感染。',
      },
      syllabus: ['0610.16.6.2'],
    },
    {
      en: 'lymphocyte',
      zh: '淋巴细胞',
      definition: {
        en: 'A type of white blood cell. HIV attacks lymphocytes — the very cells that make antibodies — so the immune system loses the ability to fight other infections.',
        zh: '一种白细胞。HIV 攻击淋巴细胞——正是产生抗体的细胞——使免疫系统失去抵御其他感染的能力。',
      },
      syllabus: ['0610.16.6.3'],
    },
  ],

  equations: [],

  sim: {
    primitive: 'plot2d',
    kernel: '16-1-reproduction',
    hint: {
      en: 'Step the day through one cycle and follow the lining first. Then switch the pregnancy on, and then lengthen the cycle.',
      zh: '把日期逐天推进一个周期，先跟着子宫内膜看。然后打开"妊娠"，再把周期调长。',
    },
    params: [
      {
        key: 'day',
        label: { en: 'Day of the cycle', zh: '周期的第几天' },
        unit: '',
        min: 1,
        max: 35,
        step: 1,
        default: 14,
      },
      {
        key: 'cycleLength',
        label: { en: 'Length of the cycle', zh: '周期长度' },
        unit: 'days',
        min: 21,
        max: 35,
        step: 1,
        default: 28,
      },
      {
        key: 'pregnant',
        label: { en: 'Was the egg fertilised?', zh: '卵子是否受精？' },
        unit: '',
        min: 0,
        max: 1,
        step: 1,
        default: 0,
        options: [
          { value: 0, label: { en: 'No', zh: '否' } },
          { value: 1, label: { en: 'Yes', zh: '是' } },
        ],
      },
    ],
    readouts: [
      {
        key: 'ovulation',
        label: { en: 'Ovulation falls on day', zh: '排卵发生在第几天' },
        unit: '',
        sigFigs: 2,
        exact: true,
      },
      {
        key: 'oestrogen',
        label: { en: 'Oestrogen today', zh: '当天的雌激素' },
        unit: '',
        sigFigs: 3,
        exact: true,
      },
      {
        key: 'progesterone',
        label: { en: 'Progesterone today', zh: '当天的孕激素' },
        unit: '',
        sigFigs: 3,
        exact: true,
      },
      {
        key: 'lining',
        label: { en: 'Lining thickness today', zh: '当天的内膜厚度' },
        unit: 'mm',
        sigFigs: 3,
        exact: true,
      },
    ],
    presets: [
      {
        label: { en: 'Menstruation', zh: '月经期' },
        params: { day: 2, cycleLength: 28, pregnant: 0 },
      },
      {
        label: { en: 'Rebuilding the lining', zh: '内膜重建期' },
        params: { day: 10, cycleLength: 28, pregnant: 0 },
      },
      {
        label: { en: 'Ovulation: the LH surge', zh: '排卵：LH 峰' },
        params: { day: 14, cycleLength: 28, pregnant: 0 },
      },
      {
        label: { en: 'Progesterone at its peak', zh: '孕激素峰值' },
        params: { day: 21, cycleLength: 28, pregnant: 0 },
      },
      {
        label: { en: 'No pregnancy: the lining goes', zh: '未受孕：内膜脱落' },
        params: { day: 27, cycleLength: 28, pregnant: 0 },
      },
      {
        label: { en: 'Pregnancy: it is maintained', zh: '妊娠：内膜得以维持' },
        params: { day: 27, cycleLength: 28, pregnant: 1 },
      },
      {
        label: { en: 'A 35-day cycle', zh: '35 天的周期' },
        params: { day: 21, cycleLength: 35, pregnant: 0 },
      },
    ],
  },

  narration,

  checkpoints: [
    {
      id: '0610-16-1-cp1',
      syllabus: ['0610.16.5.4'],
      tier: 'extended',
      commandWord: 'Explain',
      marks: 4,
      stem: 'Explain how the hormones FSH, oestrogen, LH and progesterone control the menstrual cycle.',
      markScheme: [
        {
          text: 'FSH from the pituitary gland causes a follicle to develop in the ovary and stimulates the ovary to secrete oestrogen',
          marks: 1,
        },
        {
          text: 'Oestrogen causes the uterus lining to thicken, and when it is high enough it triggers a surge of LH',
          marks: 1,
        },
        { text: 'The LH surge causes ovulation — the release of the egg from the follicle', marks: 1 },
        {
          text: 'Progesterone from the corpus luteum maintains the thickened lining and inhibits FSH and LH',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Answer it as a chain of causes, not four separate descriptions. Each hormone should be doing something *to* the next stage.',
        zh: '要把它当作一条因果链来答，而不是四段互不相干的描述。每种激素都应当对下一阶段"起作用"。',
      },
    },
    {
      id: '0610-16-1-cp2',
      syllabus: ['0610.16.5.4'],
      tier: 'extended',
      commandWord: 'Explain',
      marks: 3,
      stem: 'Explain why menstruation does not occur if the egg is fertilised and the embryo implants.',
      markScheme: [
        {
          text: 'The corpus luteum is maintained rather than breaking down, so progesterone stays high',
          marks: 1,
        },
        { text: 'Progesterone maintains the thickened uterus lining', marks: 1 },
        {
          text: 'so the lining is not shed, and it continues to supply the embryo until the placenta takes over',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'The mechanism is progesterone *not falling*. Answers that say "the body knows it is pregnant" describe the outcome without naming the hormone.',
        zh: '机制在于孕激素"没有下降"。写"身体知道自己怀孕了"只是描述结果，没有说出激素。',
      },
    },
    {
      id: '0610-16-1-cp3',
      syllabus: ['0610.16.4.9'],
      tier: 'extended',
      commandWord: 'Explain',
      marks: 3,
      stem: 'At the placenta the blood of the mother and the blood of the fetus come very close together but do not mix. Explain why they must not mix, and state two substances that pass from mother to fetus.',
      markScheme: [
        {
          text: 'The mother’s blood is at a much higher pressure and would damage the fetus’s vessels',
          marks: 1,
        },
        {
          text: 'The two may have different blood groups, so the blood could clot / agglutinate',
          marks: 1,
        },
        { text: 'Two from: oxygen, glucose, amino acids, antibodies, water, minerals', marks: 1 },
      ],
      examinerNote: {
        en: 'Say "exchange by diffusion", never "the blood passes across". Materials cross the placenta; blood does not.',
        zh: '要写"通过扩散进行交换"，绝不要写"血液流过去"。穿过胎盘的是物质，不是血液。',
      },
    },
    {
      id: '0610-16-1-cp4',
      syllabus: ['0610.16.4.4', '0610.16.4.5', '0610.16.4.6'],
      tier: 'core',
      commandWord: 'Compare',
      marks: 3,
      stem: 'Compare a human sperm cell with a human egg cell, giving three differences and relating each to its function.',
      markScheme: [
        {
          text: 'The sperm is much smaller and has a tail so that it can swim to the egg; the egg is large and does not move itself',
          marks: 1,
        },
        {
          text: 'The egg has a large amount of cytoplasm containing a food store for the early embryo; the sperm has very little',
          marks: 1,
        },
        {
          text: 'Sperm are produced in millions while one egg is usually released per cycle; or the sperm has an acrosome of enzymes to penetrate the egg',
          marks: 1,
        },
      ],
      examinerNote: {
        en: '"Relating each to its function" is part of the question. A list of differences with no reasons scores about half.',
        zh: '"把每一点与功能联系起来"是题目的一部分。只列差异而不给理由，大约只能得一半分。',
      },
    },
    {
      id: '0610-16-1-cp5',
      syllabus: ['0610.16.3.7'],
      tier: 'core',
      commandWord: 'Explain',
      marks: 4,
      stem: 'Explain how the structure of a wind-pollinated flower is adapted for pollination by wind.',
      markScheme: [
        {
          text: 'Anthers hang outside the flower so that the wind can carry the pollen away',
          marks: 1,
        },
        {
          text: 'Stigmas are large and feathery, giving a large surface area to catch pollen from the air',
          marks: 1,
        },
        {
          text: 'Pollen is produced in very large quantities, because most of it will not land on a stigma',
          marks: 1,
        },
        {
          text: 'Pollen grains are small, light and smooth so that they are carried easily by the wind',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Every feature needs its reason. "It has no petals" alone scores nothing — the mark is for saying there is no insect to attract.',
        zh: '每个特征都要给出理由。只写"它没有花瓣"不得分——得分点在于说明没有需要吸引的昆虫。',
      },
    },
    {
      id: '0610-16-1-cp6',
      syllabus: ['0610.16.1.3', '0610.16.2.4'],
      tier: 'extended',
      commandWord: 'Suggest',
      marks: 3,
      stem: 'A grower propagates strawberry plants from runners rather than from seed. Suggest one advantage and one disadvantage of this for the grower.',
      markScheme: [
        {
          text: 'Advantage: the offspring are genetically identical to the parent, so a variety with desirable features is reproduced exactly',
          marks: 1,
        },
        {
          text: 'It is also faster and needs no pollinator or second plant',
          marks: 1,
        },
        {
          text: 'Disadvantage: there is no genetic variation, so a single disease or change in conditions could destroy the whole crop',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'The question asks for both sides, so give both. And the disadvantage is about the whole crop, not about an individual plant being weaker.',
        zh: '题目要求两面都答，就都要写。而缺点针对的是整片作物，不是说单株植物更弱。',
      },
    },
    {
      id: '0610-16-1-cp7',
      syllabus: ['0610.16.6.4', '0610.16.6.5'],
      tier: 'core',
      commandWord: 'Describe',
      marks: 3,
      stem: 'Describe two ways in which HIV is transmitted, and describe two methods used to control the spread of the infection.',
      markScheme: [
        {
          text: 'Two from: unprotected sexual contact; sharing needles; transfusion of infected blood; mother to child across the placenta, during birth or in breast milk',
          marks: 2,
        },
        {
          text: 'Two from: using condoms; screening donated blood; using single-use needles; testing and treating those infected; education about transmission',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'HIV is not spread by ordinary contact — sharing cups, shaking hands or coughing. Naming one of those loses the mark.',
        zh: 'HIV 不通过日常接触传播——共用杯子、握手或咳嗽都不会。写出其中任何一项都会失分。',
      },
    },
    {
      id: '0610-16-1-cp8',
      syllabus: ['0610.16.3.5', '0610.16.3.12'],
      tier: 'extended',
      commandWord: 'Describe',
      marks: 3,
      stem: 'Describe what happens between a pollen grain landing on a stigma and the fertilisation of an ovule.',
      markScheme: [
        { text: 'The pollen grain germinates and a pollen tube grows out of it', marks: 1 },
        {
          text: 'The pollen tube grows down through the style towards the ovary, carrying the male nucleus',
          marks: 1,
        },
        {
          text: 'It enters an ovule, and the male nucleus fuses with the female nucleus inside it — fertilisation',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'The pollen grain does not travel down the style — the tube grows down and carries the nucleus. That distinction is worth a mark.',
        zh: '花粉粒本身并不沿花柱下行——是花粉管向下生长并携带细胞核。这个区别值一分。',
      },
    },
  ],

  // Visual / interactive learning modules for Chapter 5 (16.1 —
  // reproduction, with most of the chapter on humans, plus a section
  // on flower reproduction at the start). See src/content/types.ts
  // for the `LessonExtra` shape. Each module uses a real figure
  // extracted from the G8 PDF so the student sees the textbook picture,
  // not a hand-drawn approximation.
  extras: [
    // 1) The human reproductive systems, in two tabs. The figures are
    //    different sizes and the labelled parts are on different sides,
    //    so each tab keeps its own hotspot coordinate space.
    {
      type: 'reproductive-anatomy',
      id: 'reproductive-anatomy',
      title: { en: 'The human reproductive systems', zh: '人体生殖系统' },
      hint: {
        en: 'Two tabs. Click any labelled part to read about it. Female on the left, male on the right — the figures cannot share coordinates because the body is mirrored.',
        zh: '两个 tab。点击任一标注部分查看说明。左侧女性，右侧男性——因为身体是镜像的，两张图不能共用坐标。',
      },
      initialTab: 'female',
      initialPart: 'oviduct-fallopian-tube',
      female: {
        image: '/figures/g8/16-1-reproduction/figure-b11-01.png',
        imageSource: {
          en: 'G8 Science · p.61, Figure B11.01 — the female reproductive organs',
          zh: 'G8 教材·第 61 页图 B11.01——女性生殖器官',
        },
        parts: [
          {
            id: 'oviduct-fallopian-tube',
            name: { en: 'oviduct (Fallopian tube)', zh: '输卵管' },
            description: {
              en: 'A tube from the ovary to the uterus, with a funnel-shaped opening that wraps around the ovary. The egg is released into the funnel, where cilia beat rhythmically to waft it into the tube; peristalsis then moves it slowly along. Fertilisation has to happen here within 8 to 24 hours of ovulation, or the egg dies — which is why the sperm\'s swim up the female tract is a race against the egg\'s short survival window.',
              zh: '从卵巢通向子宫的管道，开口端是漏斗状，把卵巢包住。卵子被释放到漏斗里，纤毛有节奏地摆动把它"拨"进管内；然后靠蠕动缓慢前进。受精必须发生在排卵后 **8 到 24 小时内**，否则卵子死亡——这正是精子沿女性生殖道上行之所以是一场"和卵子短暂存活窗口赛跑"的原因。',
            },
          },
          {
            id: 'ovary',
            name: { en: 'ovary', zh: '卵巢' },
            description: {
              en: 'Stores and develops the eggs. A baby girl is born with all the eggs she will ever have — about a million in each ovary. They stay partly developed until puberty, when (from around age 10 to 14) a few begin to mature. From then until the menopause, only ONE egg is released at a time, usually one per month — of the million or so she started with, only about 400 will ever be released.',
              zh: '卵子的储存与发育场所。女婴出生时已带有终其一生的全部卵子——每侧卵巢约一百万个。出生后它们停留在"部分发育"状态，直到青春期（大约 10-14 岁）才有少数开始成熟。此后到绝经为止，**每次只有一个卵子**排出——通常每月一个——最初那一百多万个里，真正排出的约只有 400 个。',
            },
          },
          {
            id: 'uterus-wall',
            name: { en: 'uterus wall (myometrium)', zh: '子宫壁（肌层）' },
            description: {
              en: 'The thick muscular outer wall. During childbirth it contracts powerfully to push the baby out. It is the same muscle layer that, when it contracts during menstruation, is what causes the cramping some people feel.',
              zh: '厚而有力的肌肉外壁。分娩时强烈收缩，把婴儿推出体外。它也是月经期收缩的肌肉——有些人经期痉挛就是它在收缩。',
            },
          },
          {
            id: 'uterus-lining-endometrium',
            name: { en: 'uterus lining (endometrium)', zh: '子宫内膜' },
            description: {
              en: 'The inner lining. It thickens in the first half of the menstrual cycle under the influence of oestrogen, ready to receive an embryo. If no embryo implants, the lining is shed in the next period. If one does implant, the lining is maintained by progesterone and becomes the decidua.',
              zh: '子宫内壁。在月经周期的前半段受雌激素作用增厚，准备接受胚胎。若无胚胎植入，它就在下次月经中脱落；若胚胎植入，孕激素会维持它，并变成蜕膜。',
            },
          },
          {
            id: 'cervix',
            name: { en: 'cervix', zh: '子宫颈' },
            description: {
              en: 'The narrow opening at the lower end of the uterus, opening into the vagina. It is usually closed, but dilates during childbirth. Cells at its surface are sampled in a cervical smear test for early signs of cancer.',
              zh: '子宫下端通向阴道的窄开口。平时是闭合的，分娩时会扩张。子宫颈表面的细胞可经"宫颈涂片"取样筛查早期癌变。',
            },
          },
          {
            id: 'vagina',
            name: { en: 'vagina', zh: '阴道' },
            description: {
              en: 'The muscular tube leading from the cervix to the outside. It is the birth canal and the route by which sperm enter the female reproductive tract. Its lining is kept moist and acidic by mucus, which also acts as a barrier to infection.',
              zh: '从子宫颈通向体外的肌肉管道。它是产道，也是精子进入女性生殖道的通道。其内壁靠黏液保持湿润与酸性，黏液也是阻挡感染的屏障。',
            },
          },
        ],
      },
      male: {
        image: '/figures/g8/16-1-reproduction/figure-b11-03.png',
        imageSource: {
          en: 'G8 Science · p.62, Figure B11.03 — the male reproductive organs',
          zh: 'G8 教材·第 62 页图 B11.03——男性生殖器官',
        },
        parts: [
          {
            id: 'bladder',
            name: { en: 'bladder', zh: '膀胱' },
            description: {
              en: 'Stores urine. It is in the diagram as a landmark — the urethra passes through the prostate gland just below it. The reproductive and urinary tracts share the last few centimetres of the urethra in males, but not in females.',
              zh: '储存尿液。图中作为定位标志——尿道正好从它下方的前列腺穿过。在男性中，生殖道与泌尿道共用尿道末端最后几厘米，女性则不然。',
            },
          },
          {
            id: 'urethra',
            name: { en: 'urethra', zh: '尿道' },
            description: {
              en: 'Carries urine from the bladder, and semen from the reproductive tract, out of the body. A ring of muscle (the sphincter) controls when urine can pass; during ejaculation, the sphincter closes so that urine and semen do not mix.',
              zh: '将尿液从膀胱、将精液从生殖道排出体外。一圈肌肉（括约肌）控制何时排尿；射精时括约肌闭合，尿液与精液不会混合。',
            },
          },
          {
            id: 'prostate-gland',
            name: { en: 'prostate gland', zh: '前列腺' },
            description: {
              en: 'Adds a milky alkaline fluid to the sperm as they pass through the urethra. The fluid activates the sperm and neutralises the acidity of the female tract so the sperm can survive long enough to swim.',
              zh: '在精子穿过尿道时给它加入乳白色的碱性液体。这份液体激活精子，并中和女性生殖道的酸性，让精子能存活足够久来游动。',
            },
          },
          {
            id: 'sperm-duct',
            name: { en: 'sperm duct (vas deferens)', zh: '输精管' },
            description: {
              en: 'Carries sperm from the epididymis up into the body and around the bladder, where it joins the urethra. It is the tube that is cut in a vasectomy — the snip is what makes a man unable to father children.',
              zh: '把精子从附睾送入体内、绕过膀胱、汇入尿道。输精管结扎术切断的正是这条管——这就是男性绝育手术。',
            },
          },
          {
            id: 'epididymis',
            name: { en: 'epidymis', zh: '附睾' },
            description: {
              en: 'A long coiled tube on the outside of each testis where sperm mature and become motile. Sperm take about a week to pass through it; if they are not released, they are reabsorbed.',
              zh: '附在每侧睾丸外的一条长而盘曲的管道，精子在这里成熟并获得运动能力。精子通过附睾约需一周；若未被排出，则被重新吸收。',
            },
          },
          {
            id: 'testis',
            name: { en: 'testis', zh: '睾丸' },
            description: {
              en: 'Produces sperm — millions of them every day from about age 12 to 14 onwards (around the same time as the eggs in girls start to mature). Also produces the hormone testosterone, which is what brings on the secondary sexual characteristics at puberty. The testis hangs outside the body because sperm production needs a temperature slightly below core body temperature — which is why hot baths, hot laptops and tight underwear can temporarily reduce sperm counts.',
              zh: '生成精子——从大约 12-14 岁开始每天数百万（与女孩的卵子开始成熟的时间相近）。同时分泌睾酮，引发青春期第二性征。睾丸位于体外，是因为精子生成需要略低于核心体温的温度——这也是为什么热水浴、发热笔记本、紧身内裤都会暂时性减少精子数量。',
            },
          },
          {
            id: 'scrotum',
            name: { en: 'scrotum', zh: '阴囊' },
            description: {
              en: 'The pouch of skin that holds the testes outside the body. It is a temperature regulator — the muscle fibres in its wall contract in the cold to pull the testes closer to the body for warmth, and relax in the heat to let them hang lower and cool down.',
              zh: '挂在体外的容纳睾丸的皮囊。它是一个温度调节器——壁上的肌肉纤维遇冷收缩把睾丸拉近身体保暖，遇热舒张让它们垂得更低来降温。',
            },
          },
          {
            id: 'penis',
            name: { en: 'penis', zh: '阴茎' },
            description: {
              en: 'Deposits semen inside the female reproductive tract. The erectile tissue inside it fills with blood during sexual arousal, making the penis rigid — that is what allows it to enter the vagina and place the sperm as close to the cervix as possible.',
              zh: '将精液送入女性生殖道。内部的勃起组织在性兴奋时充血，让阴茎变硬——这才能进入阴道，并尽量把精子送到靠近宫颈的位置。',
            },
          },
          {
            id: 'erectile-tissue',
            name: { en: 'erectile tissue', zh: '勃起组织' },
            description: {
              en: 'Spongy tissue with a rich blood supply. During sexual arousal the arteries supplying it dilate and the veins draining it constrict, so it fills with blood and becomes rigid. The "erection" is a hydraulic event, not a muscular one.',
              zh: '富于血液供应的海绵状组织。性兴奋时，供应它的动脉舒张、引流它的静脉收缩，于是它充血变硬。"勃起"是一个液压事件，不是肌肉事件。',
            },
          },
        ],
      },
    },

    // 2) Sperm vs egg, side by side. The figures are the real G8
    //    B11.04 (egg) and B11.05 (sperm); the comparison rows below
    //    are the syllabus-defined differences, paired across the table
    //    so the asymmetry is visible at a glance.
    {
      type: 'sperm-vs-egg',
      id: 'sperm-vs-egg',
      title: { en: 'Sperm and egg, side by side', zh: '精子与卵细胞：左右对比' },
      hint: {
        en: 'Each row is one feature, with the sperm on the left and the egg on the right. The two gametes are built for opposite jobs — and almost everything about them shows it.',
        zh: '每一行是一项特征，左侧精子，右侧卵细胞。两种配子为相反的工作而生——它们几乎每个细节都体现出这一点。',
      },
      spermImage: '/figures/g8/16-1-reproduction/figure-b11-05.png',
      spermImageSource: {
        en: 'G8 Science · p.64, Figure B11.05 — a human sperm cell',
        zh: 'G8 教材·第 64 页图 B11.05——人类精子',
      },
      eggImage: '/figures/g8/16-1-reproduction/figure-b11-04.png',
      eggImageSource: {
        en: 'G8 Science · p.63, Figure B11.04 — a human egg cell',
        zh: 'G8 教材·第 63 页图 B11.04——人类卵细胞',
      },
      rows: [
        {
          id: 'size',
          feature: { en: 'Size', zh: '大小' },
          sperm: {
            en: 'Small — about 50 µm long including the tail. Tiny enough to be propelled by a single flagellum.',
            zh: '很小——含尾约 50 µm 长。足够小，可被一根鞭毛推动。',
          },
          egg: {
            en: 'Large — about 0.1 mm across, visible to the naked eye. Big because it must carry the food store for the early embryo.',
            zh: '很大——直径约 0.1 mm，肉眼可见。之所以大，是因为它要为早期胚胎携带营养储备。',
          },
        },
        {
          id: 'motility',
          feature: { en: 'Motility', zh: '运动能力' },
          sperm: {
            en: 'A long tail (flagellum) that whips back and forth, propelling the sperm at about 4 mm/min. Movement is the sperm\'s whole reason to exist.',
            zh: '长尾（鞭毛）来回摆动，每分钟推动精子约 4 mm。运动是精子存在的全部意义。',
          },
          egg: {
            en: 'Does not move itself. It is swept along the oviduct by cilia and peristalsis; it just sits and waits to be fertilised.',
            zh: '自己不会动。它靠纤毛与蠕动沿输卵管被动前进；只是静静等待受精。',
          },
        },
        {
          id: 'cytoplasm',
          feature: { en: 'Cytoplasm', zh: '细胞质' },
          sperm: {
            en: 'Almost none — the streamlined head and tail are mostly nucleus and flagellum, with a thin mitochondrial sheath in the midpiece to power the tail.',
            zh: '几乎没有——流线型的头和尾主要是细胞核和鞭毛，中段有一圈薄薄的线粒体鞘为尾巴供能。',
          },
          egg: {
            en: 'Lots — packed with organelles, ribosomes, mRNA, and a large food store. The volume is what supports the embryo for its first few days of divisions.',
            zh: '很多——装满细胞器、核糖体、mRNA 和一大份营养储备。正是这份体积支撑胚胎最初几天的分裂。',
          },
        },
        {
          id: 'food',
          feature: { en: 'Food store', zh: '营养储备' },
          sperm: {
            en: 'None. The sperm is built for one job — get there first. It does not need to feed anything.',
            zh: '没有。精子只为做一件事而生——先到。它不需要养活任何东西。',
          },
          egg: {
            en: 'Plenty of yolk and other reserves, used by the embryo before it implants in the uterus lining. A human egg has less yolk than a bird\'s, but the principle is the same.',
            zh: '大量卵黄和其他储备，供胚胎在植入子宫内膜之前使用。人类卵子的卵黄比鸟类的少，但原理相同。',
          },
        },
        {
          id: 'acrosome',
          feature: { en: 'Acrosome', zh: '顶体' },
          sperm: {
            en: 'Present — a cap at the very front of the head holding enzymes that digest a path through the outer layers of the egg. Without it the sperm cannot get in.',
            zh: '有——位于头顶前端，内含能消化卵细胞外层、开辟通路的酶。没有它精子进不去。',
          },
          egg: {
            en: 'No acrosome. The egg is the destination, not the destroyer. Its outer layer is what the sperm\'s acrosome is built to attack.',
            zh: '没有顶体。卵细胞是目的地，不是破坏者。它的外层正是精子顶体要攻击的对象。',
          },
        },
        {
          id: 'numbers',
          feature: { en: 'Numbers made', zh: '产出数量' },
          sperm: {
            en: 'In huge numbers — hundreds of millions per day after puberty. Most never reach an egg; the redundancy is the point.',
            zh: '数量极大——青春期后每天数亿个。多数到不了卵子，冗余正是目的。',
          },
          egg: {
            en: 'One at a time, usually — about one a month from puberty to the menopause, in alternation between the two ovaries. About 400 in a lifetime.',
            zh: '通常一次一个——青春期到绝经之间每月一个，两侧卵巢交替。一生约 400 个。',
          },
        },
      ],
    },

    // 3) The three stages from intercourse to implantation. Same
    //    figures the G8 textbook uses, stacked so the student can
    //    compare them at a glance.
    {
      type: 'fertilisation-journey',
      id: 'fertilisation-journey',
      title: { en: 'From intercourse to implantation', zh: '从受精到着床' },
      hint: {
        en: 'Three snapshots in the order they happen. Click any figure or step number to jump to it.',
        zh: '按发生顺序排列的三个时刻。点击任一图或步骤号即可跳到该步。',
      },
      steps: [
        {
          id: 'swim',
          image: '/figures/g8/16-1-reproduction/figure-b11-06.png',
          imageSource: {
            en: 'G8 Science · p.65, Figure B11.06 — how sperm get to the egg',
            zh: 'G8 教材·第 65 页图 B11.06——精子如何到达卵细胞',
          },
          title: { en: '1. Sperm swim up the female tract', zh: '1. 精子沿女性生殖道上行' },
          body: {
            en: 'Sperm are deposited in the vagina, close to the cervix. They have to swim the full length of the uterus and most of the way up the oviduct to reach the egg — about 15 cm, which at 4 mm/min takes around 30 to 60 minutes for the fastest sperm. Most never make it.',
            zh: '精子被排在阴道里，靠近宫颈。它们必须游过整个子宫、穿过大部分输卵管才能到达卵细胞——约 15 cm，按 4 mm/分钟计，最快的精子也要 30 到 60 分钟。多数精子到不了。',
          },
        },
        {
          id: 'fertilisation',
          image: '/figures/g8/16-1-reproduction/figure-b11-07.png',
          imageSource: {
            en: 'G8 Science · p.65, Figure B11.07 — fertilisation',
            zh: 'G8 教材·第 65 页图 B11.07——受精',
          },
          title: { en: '2. The acrosome reaction and fusion', zh: '2. 顶体反应与融合' },
          body: {
            en: 'When a sperm meets the outer layer of the egg (the zona pellucida), its acrosome releases enzymes that digest a path through. The sperm\'s nucleus then enters the egg, the two nuclei fuse, and a fertilised egg — a zygote — is formed. The zona pellucida then hardens, so no other sperm can get in.',
            zh: '当精子遇到卵细胞外层（透明带），顶体释放酶把外层消化开路。精子的细胞核进入卵子，两个核融合，形成受精卵（合子）。之后透明带硬化，阻止其他精子再进入。',
          },
        },
        {
          id: 'implantation',
          image: '/figures/g8/16-1-reproduction/figure-b11-08.png',
          imageSource: {
            en: 'G8 Science · p.66, Figure B11.08 — implantation',
            zh: 'G8 教材·第 66 页图 B11.08——着床',
          },
          title: { en: '3. Implantation in the uterus lining', zh: '3. 在子宫内膜着床' },
          body: {
            en: 'The zygote divides as it travels, becoming a ball of 16 or 32 cells by the time it reaches the uterus. Cilia and peristalsis in the oviduct push it down; about a week after fertilisation it embeds itself in the thickened lining, where it will develop through the next nine months. The lining is maintained by progesterone from the corpus luteum — which is why no period comes.',
            zh: '合子在行进中持续分裂，到达子宫时已是一团 16 或 32 个细胞的球。输卵管的纤毛与蠕动把它推下去；约在受精一周后嵌入已增厚的内膜，开始接下来九个月的发育。内膜由黄体分泌的孕激素维持——所以没有月经来潮。',
          },
        },
      ],
    },

    // 4) The placenta and the substances that cross it. The figure is
    //    G8 B11.09, with hotspots on the maternal and fetal sides plus
    //    the umbilical vessels. Below the figure, a two-column card
    //    shows what passes in each direction — and a closing note
    //    explains why the two bloods must not mix.
    {
      type: 'placenta-exchange',
      id: 'placenta',
      title: { en: 'What crosses the placenta', zh: '胎盘上的物质交换' },
      hint: {
        en: 'Click any part of the placenta. Below the figure, a two-column card lists what passes to the fetus and what passes to the mother.',
        zh: '点击胎盘的任一部分。下方有一个双栏卡片，分别列出哪些物质从母体到胎儿、哪些从胎儿到母体。',
      },
      image: '/figures/g8/16-1-reproduction/figure-b11-09.png',
      imageSource: {
        en: 'G8 Science · p.67, Figure B11.09 — part of the placenta',
        zh: 'G8 教材·第 67 页图 B11.09——胎盘局部',
      },
      parts: [
        {
          id: 'lining-of-uterus',
          name: { en: 'lining of uterus (maternal side)', zh: '子宫内膜（母体侧）' },
          description: {
            en: 'The part of the uterus that holds the placenta. It is rich in maternal blood vessels, which break down to form the space on the maternal side of the placenta. The lining is maintained by progesterone so it is not shed during pregnancy.',
            zh: '容纳胎盘的子宫部分。它有丰富的母体血管，这些血管破裂形成胎盘母体侧的血窦。整个内膜由孕激素维持，所以妊娠期间不会脱落。',
          },
        },
        {
          id: 'maternal-blood-space',
          name: { en: 'space filled with the mother\'s blood', zh: '充满母体血液的血窦' },
          description: {
            en: 'Not a vessel — a space, inside the placenta, where maternal blood pools and bathes the fetal capillaries. The blood is at the higher maternal arterial pressure. From this space, oxygen and nutrients diffuse into the fetal blood.',
            zh: '不是血管——是胎盘内的一片空腔，母体血液汇集其中，浸浴着胎儿毛细血管。压力较高（与母体动脉压一致）。氧与营养物质从这片血窦扩散进入胎儿血液。',
          },
        },
        {
          id: 'fetal-capillaries',
          name: { en: 'fetal capillaries (in the villi)', zh: '胎儿毛细血管（绒毛内）' },
          description: {
            en: 'Tiny vessels branching off the umbilical cord into the placenta. They are bundled into finger-like projections called VILLI that reach into the maternal blood space, giving a huge surface area for exchange. The wall of each capillary is the thin membrane across which all the exchange happens — one cell thick. They carry fetal blood at the lower fetal pressure, so the two bloods do not push into each other.',
            zh: '由脐带分支进入胎盘的微小血管。它们聚集成指状突起——**绒毛（villi）**——伸入母体血液的空间中，从而提供巨大的交换面积。每根毛细血管的壁就是发生交换的那层薄膜——只有一个细胞厚。血管内流动的是胎儿血液，压力比母体低，所以两套血液不会互相冲击。',
          },
        },
        {
          id: 'placental-wall',
          name: { en: 'thin wall of placenta', zh: '胎盘薄膜' },
          description: {
            en: 'A single layer of cells separating fetal blood from maternal blood. All exchange happens by diffusion across this wall. The thinner it stays, the more efficient the exchange — and the easier it is for oxygen to get across. The whole placenta at birth is a flat, soft, dark-red disc about 12 cm in diameter and 3 cm thick, weighing roughly 500 g. It looks and feels like raw liver.',
            zh: '把胎儿血液与母体血液隔开的单层细胞。所有的物质交换都靠穿过这层薄膜进行扩散。它越薄，交换效率越高，氧也越容易穿过。整个胎盘在出生时是一片柔软、暗红、扁平的圆盘，直径约 12 cm，厚约 3 cm，重量约 500 g——看起来和摸起来都像生肝。',
          },
        },
        {
          id: 'umbilical-cord',
          name: { en: 'umbilical cord', zh: '脐带' },
          description: {
            en: 'A flexible tube about 50 cm long linking the fetus to the placenta. It carries two umbilical arteries (carrying deoxygenated blood from the fetus to the placenta) and one umbilical vein (carrying oxygenated blood back). The cord is cut at birth — what is left becomes the belly button.',
            zh: '长约 50 cm 的柔韧管子，把胎儿与胎盘连起来。内有两条脐动脉（从胎儿向胎盘运去氧合低的血）和一条脐静脉（把含氧血送回胎儿）。出生时被剪断，残留部分就是肚脐。',
          },
        },
        {
          id: 'umbilical-artery',
          name: { en: 'umbilical artery', zh: '脐动脉' },
          description: {
            en: 'Carries deoxygenated, waste-laden blood from the fetus to the placenta. The two umbilical arteries are the only arteries in the body that carry deoxygenated blood — the reverse of everywhere else, because the fetus is sending blood to be re-oxygenated, not to be delivered to tissues.',
            zh: '把含氧低、含废物多的血从胎儿送到胎盘。这两条脐动脉是人体中唯一运缺氧血的动脉——与其他地方相反，因为胎儿送血是为了"再加氧"，不是送去给组织用氧。',
          },
        },
        {
          id: 'umbilical-vein',
          name: { en: 'umbilical vein', zh: '脐静脉' },
          description: {
            en: 'Carries oxygenated, nutrient-rich blood from the placenta to the fetus. It is the only vein in the body that carries oxygenated blood — the reverse of everywhere else, for the same reason as the umbilical arteries.',
            zh: '把含氧高、营养丰富的血从胎盘送回胎儿。这是人体中唯一运富氧血的静脉——同样因为方向相反。',
          },
        },
      ],
      toFetus: [
        { en: 'oxygen', zh: '氧气' },
        { en: 'glucose', zh: '葡萄糖' },
        { en: 'amino acids', zh: '氨基酸' },
        { en: 'minerals (e.g. iron, calcium)', zh: '矿物质（如铁、钙）' },
        { en: 'water', zh: '水' },
        { en: 'antibodies (passive immunity)', zh: '抗体（被动免疫）' },
      ],
      toMother: [
        { en: 'carbon dioxide', zh: '二氧化碳' },
        { en: 'urea', zh: '尿素' },
        { en: 'other metabolic wastes', zh: '其他代谢废物' },
        { en: 'water', zh: '水' },
      ],
      exchangeNote: {
        en: 'The two bloods do not mix — that would risk agglutination (the mother and fetus can have different blood groups), and the higher maternal blood pressure would damage the fetal vessels. Substances cross the placenta by diffusion through the thin placental wall, in the direction of their concentration gradient. The placenta also acts as a barrier — most bacteria and many viruses cannot cross it, which is why the fetus is partly protected.',
        zh: '两套血液并不混合——一旦混合会有凝集风险（母体和胎儿血型可能不同），且母体血压更高会损伤胎儿血管。物质靠扩散穿过胎盘薄膜，按浓度梯度方向移动。胎盘也是一道屏障——多数细菌和许多病毒不能穿过，所以胎儿受到部分保护。',
      },
    },
  ],
}

export default lesson
