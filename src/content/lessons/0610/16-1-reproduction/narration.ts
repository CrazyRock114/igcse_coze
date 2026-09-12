import type { NarrationScript } from '@/content/types'

export const reproductionNarration: NarrationScript = {
  id: '16-1-reproduction',
  sections: [
    {
      id: 'intro',
      type: 'intro',
      title: { en: 'One parent or two', zh: '一个亲本还是两个' },
      lines: [
        {
          id: 'intro-1',
          text: {
            en: 'Asexual reproduction produces offspring genetically identical to the one parent — a clone. Bacteria dividing, a strawberry plant sending out runners, a potato growing new tubers, a fungus releasing spores.',
            zh: '无性生殖产生与唯一亲本遗传上完全相同的后代——克隆体。细菌分裂、草莓抽出匍匐茎、马铃薯长出新块茎、真菌释放孢子，都属于此类。',
          },
        },
        {
          id: 'intro-2',
          text: {
            en: 'Sexual reproduction is the fusion of the nuclei of two gametes. The gamete nuclei are haploid — one set of chromosomes each — and fusing them gives a diploid zygote. That is why gametes have to be made by meiosis: otherwise the chromosome number would double every generation.',
            zh: '有性生殖是两个配子细胞核的融合。配子的核是单倍体——各含一套染色体——融合后形成二倍体的合子。这正是配子必须由减数分裂产生的原因：否则染色体数目会每一代翻倍。',
          },
        },
        {
          id: 'intro-3',
          text: {
            en: 'Each has a cost. Asexual is fast, needs no partner, and passes on a genotype that is already working — but every offspring is identical, so one disease or one change in the environment can take out the whole population.',
            zh: '两者各有代价。无性生殖快速、无需配偶，并把一个已经行得通的基因型传下去——但每个后代都完全相同，因此一种疾病或一次环境变化就可能让整个种群覆灭。',
          },
        },
        {
          id: 'intro-4',
          text: {
            en: 'Sexual reproduction is slow and needs two organisms to find each other, but it produces variation. And variation is what natural selection has to work on, so a population that reproduces sexually can adapt where a clone cannot.',
            zh: '有性生殖缓慢，且需要两个个体相遇，但它产生变异。而变异正是自然选择赖以起作用的材料，因此有性生殖的种群能够适应环境，克隆种群则不能。',
          },
        },
      ],
    },
    {
      id: 'plants',
      type: 'concept',
      title: { en: 'A flower is a reproductive organ', zh: '花就是生殖器官' },
      lines: [
        {
          id: 'pl-1',
          text: {
            en: 'The male parts are the stamens: an anther, which makes pollen, held up by a filament. The female parts are the carpel: a stigma that catches pollen, a style holding it up, and an ovary containing ovules. Around them, petals to attract insects and sepals that protected the bud.',
            zh: '雄性部分是雄蕊：产生花粉的花药，由花丝托起。雌性部分是心皮：接受花粉的柱头、支撑它的花柱，以及含有胚珠的子房。围绕它们的是吸引昆虫的花瓣，以及曾保护花蕾的萼片。',
          },
        },
        {
          id: 'pl-2',
          text: {
            en: 'Pollination is the transfer of pollen from an anther to a stigma. It is not fertilisation — that comes later, when a pollen nucleus fuses with a nucleus in an ovule. Getting those two words the wrong way round is one of the commonest errors in the paper.',
            zh: '传粉是花粉由花药转移到柱头。它不是受精——受精发生在之后，当花粉的核与胚珠中的核融合时。把这两个词弄反，是试卷上最常见的错误之一。',
          },
        },
        {
          id: 'pl-3',
          text: {
            en: 'An insect-pollinated flower advertises: large bright petals, scent, nectar, and anthers and stigma tucked inside where an insect must brush past them. Its pollen is sticky or spiky, in small amounts, so it clings to the insect.',
            zh: '虫媒花在"做广告"：花瓣大而鲜艳、有香气、有花蜜，花药和柱头藏在里面，昆虫必须擦身而过。它的花粉黏或带刺、数量少，以便附着在昆虫身上。',
          },
        },
        {
          id: 'pl-4',
          text: {
            en: 'A wind-pollinated flower does none of that. Small dull petals or none, no scent, no nectar. Anthers dangle outside in the airflow and stigmas are large and feathery to catch what drifts by. And it makes enormous quantities of small, smooth, light pollen — because the wind is not aiming.',
            zh: '风媒花完全不做这些。花瓣小而暗淡甚至没有，无香气、无花蜜。花药悬垂在外承接气流，柱头大而呈羽毛状以捕捉飘过的花粉。它产生大量细小、光滑、轻盈的花粉——因为风不会瞄准。',
          },
        },
        {
          id: 'pl-5',
          text: {
            en: 'Self-pollination is pollen reaching a stigma of the same plant; cross-pollination is pollen reaching a different plant of the same species. Self-pollination is reliable — no pollinator needed — but it produces less variation, so the population adapts more slowly. Cross-pollination is the opposite trade.',
            zh: '自花传粉是花粉落到同一植株的柱头上；异花传粉则是落到同种的另一植株上。自花传粉可靠——不需要传粉者——但产生的变异较少，因而种群适应得更慢。异花传粉正好相反。',
          },
        },
        {
          id: 'pl-6',
          text: {
            en: 'Once pollen lands, a pollen tube grows down through the style to the ovary, carrying the male nucleus with it into the ovule. And a seed needs three things to germinate — water, oxygen and a suitable temperature. Not light: most seeds germinate underground in the dark.',
            zh: '花粉落定后，花粉管沿花柱向下生长至子房，把雄性细胞核带入胚珠。种子萌发需要三个条件——水、氧气和适宜的温度。不需要光：大多数种子是在地下的黑暗中萌发的。',
          },
        },
      ],
    },
    {
      id: 'gametes',
      type: 'concept',
      title: { en: 'Two cells built for opposite jobs', zh: '为相反任务而生的两种细胞' },
      lines: [
        {
          id: 'gm-1',
          text: {
            en: 'A sperm has to travel. So it is small, it has a tail to swim with, and a middle section packed with mitochondria to release the energy for swimming. At its tip is an acrosome, holding enzymes that digest a way through the egg’s outer layers.',
            zh: '精子必须移动。因此它很小，有一条用来游动的尾，中段密布线粒体以释放游动所需的能量。顶端是顶体，内含能消化卵细胞外层的酶。',
          },
        },
        {
          id: 'gm-2',
          text: {
            en: 'An egg has to supply. So it is very much larger, full of cytoplasm containing the food store the embryo will live on before it implants. Its jelly coat changes the moment one sperm gets in, so no second one can — otherwise the zygote would be triploid.',
            zh: '卵细胞必须"供养"。因此它大得多，充满细胞质，其中含有胚胎在植入前赖以生存的养料贮备。一旦有一个精子进入，它的胶质层立即改变，第二个精子便无法进入——否则合子将成为三倍体。',
          },
        },
        {
          id: 'gm-3',
          text: {
            en: 'And the numbers are opposite too: millions of sperm, released together and mobile; one egg a month, released alone and moved along the oviduct by cilia. Fertilisation is the fusion of the two nuclei, and it happens in the oviduct, not in the uterus.',
            zh: '数量上也相反：精子数以百万计，一同释放且能自主移动；卵子每月一个，单独排出，由纤毛沿输卵管推送。受精是两个细胞核的融合，发生在输卵管中，而不是子宫里。',
          },
        },
        {
          id: 'gm-4',
          text: {
            en: 'The zygote divides as it travels down to the uterus and arrives as a ball of cells, an embryo, which implants in the uterus lining. And then it needs feeding, which is what the placenta is for.',
            zh: '合子一边向子宫移动一边分裂，到达时已是一团细胞，即胚胎，随后植入子宫内膜。接下来它需要营养，这正是胎盘的作用。',
          },
        },
      ],
    },
    {
      id: 'placenta',
      type: 'concept',
      title: { en: 'Two circulations that never touch', zh: '两套永不相接的循环' },
      lines: [
        {
          id: 'pc-1',
          text: {
            en: 'The placenta is where the mother’s blood and the fetus’s blood come very close together and exchange materials by diffusion. Oxygen, glucose, amino acids and antibodies cross to the fetus; carbon dioxide and urea cross back.',
            zh: '胎盘是母体血液与胎儿血液极为靠近、通过扩散交换物质的地方。氧气、葡萄糖、氨基酸和抗体进入胎儿；二氧化碳和尿素返回母体。',
          },
        },
        {
          id: 'pc-2',
          text: {
            en: 'Close together, but never mixed, and that matters. The two may have different blood groups, and the mother’s blood is at a much higher pressure — enough to damage the fetus’s vessels. The umbilical cord carries the blood between fetus and placenta.',
            zh: '虽然靠得很近，却从不混合，这一点很重要。两者的血型可能不同，而母体血液的压力高得多——足以损伤胎儿的血管。脐带负责在胎儿与胎盘之间输送血液。',
          },
        },
        {
          id: 'pc-3',
          text: {
            en: 'Around the fetus, the amniotic sac holds amniotic fluid, which cushions it against knocks and supports its weight so it can grow evenly.',
            zh: '胎儿周围是羊膜囊，内含羊水，可以缓冲外来撞击并支撑胎儿的重量，使其能够均匀生长。',
          },
        },
        {
          id: 'pc-4',
          text: {
            en: 'But the placenta is a filter, not a wall. Some pathogens cross it — rubella, HIV — and so do toxins including nicotine, alcohol and many drugs. That is why what a pregnant woman takes in reaches the fetus too.',
            zh: '但胎盘是筛子，不是墙。有些病原体能够穿过它——风疹病毒、HIV——毒素也能，包括尼古丁、酒精和许多药物。这就是孕妇摄入的东西同样会到达胎儿的原因。',
          },
        },
      ],
    },
    {
      id: 'childbirth',
      type: 'concept',
      title: { en: 'Nine months later — what childbirth actually is', zh: '九个月之后——分娩究竟是什么' },
      lines: [
        {
          id: 'cb-1',
          text: {
            en: 'Childbirth has three stages and they happen in a fixed order. First, the muscular wall of the uterus begins to contract — strongly and regularly. The contractions dilate the cervix, which has to open wide enough to let the baby through. A first labour can last twelve hours or more; later ones are usually shorter.',
            zh: '分娩分三个阶段，按固定顺序发生。第一阶段，子宫肌壁开始有规律地强烈收缩。宫缩使子宫颈扩张，必须开得足够大才能让婴儿通过。初产妇分娩可能持续 12 小时甚至更久；后面的通常较短。',
          },
        },
        {
          id: 'cb-2',
          text: {
            en: 'Second, the contractions push the baby out through the dilated cervix and along the vagina. The baby is still attached to the placenta by the umbilical cord — that does not need to be cut until after the baby is breathing on its own. The cord is clamped and cut, and what is left on the baby\'s abdomen heals into the belly button.',
            zh: '第二阶段，收缩把婴儿从已扩张的子宫颈推出，沿阴道娩出。婴儿此时仍通过脐带与胎盘相连——不必在婴儿自己开始呼吸之前切断。脐带被夹住、剪断，留在婴儿腹部的那段会愈合成肚脐。',
          },
        },
        {
          id: 'cb-3',
          text: {
            en: 'Third, the placenta itself comes out — the "afterbirth". The same uterine contractions that pushed the baby out now push the placenta away from the uterus wall, and it passes out through the vagina. The umbilical cord, by then, is already cut. Losing the placenta is the end of the pregnancy, and the uterus goes back to its pre-pregnancy size over the following weeks.',
            zh: '第三阶段，胎盘本身也排出体外——即"胞衣（afterbirth）"。推出婴儿的同一波子宫收缩现在把胎盘从子宫壁上剥下来，并从阴道排出。脐带此时已被剪断。胎盘排出是妊娠的结束，子宫将在接下来的几周内恢复到怀孕前的大小。',
          },
        },
        {
          id: 'cb-4',
          text: {
            en: 'The placenta is delivered because the contractions that pushed the baby out also shear it off the uterine wall. It is a deliberate biological sequence: birth first, then afterbirth, then the long recovery of the uterus. Get any stage wrong and the bleeding that follows can be dangerous — which is why obstructed labour is a medical emergency, and why every modern birth has a trained attendant with a clock.',
            zh: '胎盘之所以能排出，是因为推出婴儿的同一波收缩也把它从子宫壁上剥下来。这是一个有序的生物序列：先是分娩，然后是胞衣，最后是子宫的长期恢复。任何一阶段出错，紧随其后的出血都可能致命——这就是为什么难产是医疗急症，以及为什么现代每一次分娩都有训练有素、带着钟表的助产士在场。',
          },
        },
      ],
    },
    {
      id: 'cycle',
      type: 'interaction',
      title: { en: 'Four hormones and a lining', zh: '四种激素与一层内膜' },
      lines: [
        {
          id: 'cy-0',
          text: {
            en: 'One whole cycle, on average, takes about 28 days — but the textbook number is misleading. Cycles of 25 or 35 days are normal; what is "fixed" is the second half of the cycle (always about 14 days from ovulation to the next period), not the first half. The bleeding itself usually lasts about five days.',
            zh: '整个月经周期平均约 28 天——但教材里这个数字有迷惑性。25 或 35 天的周期都属正常；"固定"的是周期后半段（从排卵到下次月经几乎总是 14 天），不是前半段。经期出血本身通常持续约 5 天。',
          },
        },
        {
          id: 'cy-1',
          text: {
            en: 'The menstrual cycle is four hormones running one lining, and the graph is easier than it looks if you follow the lining first. Day one is the first day of bleeding: the lining is being shed. Set the day to two and look at it.',
            zh: '月经周期就是四种激素在管理一层内膜，只要先跟着内膜看，这张图就没有看上去那么难。第 1 天是出血的第一天：内膜正在脱落。把日期设为 2，看看它。',
          },
          action: { type: 'setParams', params: { cycleLength: 28, day: 2, pregnant: 0 } },
        },
        {
          id: 'cy-2',
          text: {
            en: 'FSH — follicle stimulating hormone — is high early on. It does two things: it makes a follicle in the ovary develop, and it stimulates the ovary to make oestrogen. Watch oestrogen climb through the first half of the cycle.',
            zh: 'FSH——促卵泡激素——在周期早期较高。它做两件事：促使卵巢中的卵泡发育，并刺激卵巢分泌雌激素。看雌激素在周期前半段如何攀升。',
          },
          action: { type: 'setParams', params: { cycleLength: 28, day: 10, pregnant: 0 } },
        },
        {
          id: 'cy-3',
          text: {
            en: 'Oestrogen rebuilds the lining, and it does one more thing: when it gets high enough it triggers a surge of LH. Look at day fourteen — that spike in LH is what makes the follicle burst and release the egg. That is ovulation.',
            zh: '雌激素重建子宫内膜，还做一件事：当它升到足够高时，会触发 LH 的激增。看第 14 天——LH 的那个尖峰使卵泡破裂并释放卵子，这就是排卵。',
          },
          action: { type: 'setParams', params: { cycleLength: 28, day: 14, pregnant: 0 } },
          pause: 1,
        },
        {
          id: 'cy-4',
          text: {
            en: 'What is left of the follicle becomes the corpus luteum, and it makes progesterone. Progesterone maintains the thickened lining, ready for an embryo, and it inhibits FSH and LH so no second egg is released.',
            zh: '卵泡剩下的部分变成黄体，它分泌孕激素。孕激素维持已增厚的内膜，为胚胎做好准备，同时抑制 FSH 和 LH，使第二个卵子不会排出。',
          },
          action: { type: 'setParams', params: { cycleLength: 28, day: 21, pregnant: 0 } },
        },
        {
          id: 'cy-5',
          text: {
            en: 'If no embryo implants, the corpus luteum breaks down, so progesterone falls — and the moment it falls the lining is no longer maintained. It breaks down, and that is the next period. The cycle is a loop, and the fall in progesterone is what closes it.',
            zh: '如果没有胚胎植入，黄体退化，孕激素随之下降——它一下降，内膜就失去了维持，于是崩解脱落，这就是下一次月经。这个周期是一个环，而孕激素的下降正是闭合这个环的一环。',
          },
          action: { type: 'setParams', params: { cycleLength: 28, day: 27, pregnant: 0 } },
        },
        {
          id: 'cy-6',
          text: {
            en: 'Now switch on the pregnancy and look at the same days again. Progesterone does not fall — the corpus luteum is kept going. So the lining is not shed, and there is no period. That is usually the first sign.',
            zh: '现在打开"妊娠"，再看同样这些日子。孕激素没有下降——黄体被维持住了。因此内膜不脱落，也就没有月经。这通常是最先出现的信号。',
          },
          action: { type: 'setParams', params: { cycleLength: 28, day: 27, pregnant: 1 } },
          pause: 1,
        },
        {
          id: 'cy-7',
          text: {
            en: 'And look at FSH and LH — flattened. High progesterone suppresses them, so no further egg is released during the pregnancy. One mechanism explaining three things: why the period stops, why ovulation stops, and how the contraceptive pill works, because it does exactly this on purpose.',
            zh: '再看 FSH 和 LH——被压平了。高浓度孕激素抑制了它们，因此妊娠期间不再排卵。一个机制同时解释了三件事：为什么月经停止、为什么排卵停止，以及避孕药如何起作用——因为它正是有意在做同样的事。',
          },
        },
        {
          id: 'cy-8',
          text: {
            en: 'One last thing, and it is the part most often got wrong. Change the cycle length to thirty-five days. Ovulation does not stay on day fourteen — it moves to day twenty-one. The half of the cycle after ovulation is almost always fourteen days; it is the half before that varies. So you count back from the next period, not forward from the last one.',
            zh: '最后一点，也是最常被弄错的一点。把周期长度改为 35 天。排卵并没有停在第 14 天——它移到了第 21 天。排卵之后的那半段几乎总是 14 天；变化的是排卵之前的那半段。所以要从下一次月经往回数，而不是从上一次月经往后数。',
          },
          action: { type: 'setParams', params: { cycleLength: 35, day: 21, pregnant: 0 } },
        },
      ],
    },
    {
      id: 'sti',
      type: 'concept',
      title: { en: 'Infections that travel this way', zh: '经由这一途径传播的感染' },
      lines: [
        {
          id: 'st-1',
          text: {
            en: 'A sexually transmitted infection is one passed on through sexual contact. HIV is a pathogen that causes one, and an untreated HIV infection may eventually lead to AIDS.',
            zh: '性传播感染是通过性接触传播的感染。HIV 是引起这类感染的病原体，未经治疗的 HIV 感染最终可能发展为艾滋病。',
          },
        },
        {
          id: 'st-1b',
          text: {
            en: 'One reason HIV is hard to catch is that the virus itself is fragile — it cannot live outside the human body, and is much less tough than the cold or flu virus. It cannot survive on a toilet seat, on a cup, in a swimming pool, or on a handshake. It gets in only when body fluids from an infected person reach the body fluids of someone else — and almost all those routes can be interrupted.',
            zh: 'HIV 难以传染的一个原因是病毒本身很脆弱——它**无法在人体外存活**，比感冒或流感病毒要不耐受得多。它不会在马桶座、杯子、泳池或一次握手之上存活。它只在感染者的体液进入他人的体液时才能进入——而几乎所有这些路径都可以被切断。',
          },
        },
        {
          id: 'st-2',
          text: {
            en: 'HIV is transmitted in body fluids: through unprotected sexual contact, through blood — sharing needles, or transfusion of infected blood — and from a mother to her child across the placenta, during birth, or in breast milk.',
            zh: 'HIV 通过体液传播：无保护的性接触；血液——共用针具或输入被感染的血液；以及母亲经胎盘、分娩过程或母乳传给孩子。',
          },
        },
        {
          id: 'st-3',
          text: {
            en: 'Control is about breaking those routes. Condoms, screening blood before transfusion, single-use needles, testing and treating people who are infected, and educating people about how transmission actually happens.',
            zh: '控制的关键在于切断这些途径：使用安全套、输血前筛查血液、使用一次性针具、对感染者进行检测与治疗，以及向公众普及真正的传播方式。',
          },
        },
        {
          id: 'st-4',
          text: {
            en: 'HIV attacks white blood cells called lymphocytes — the very cells that make antibodies. So the damage is not what the virus does directly; it is that the immune system stops being able to deal with anything else. AIDS is what other infections do to a body that can no longer defend itself.',
            zh: 'HIV 攻击一种称为淋巴细胞的白细胞——正是产生抗体的那类细胞。因此危害并非病毒直接造成，而在于免疫系统再也无法应对其他任何病原体。艾滋病，是其他感染对一个已无力自卫的身体所造成的后果。',
          },
        },
      ],
    },
    {
      id: 'summary',
      type: 'summary',
      title: { en: 'What to take into the exam', zh: '考场上要记住的' },
      lines: [
        {
          id: 'sum-1',
          text: {
            en: 'Pollination is pollen anther to stigma; fertilisation is the fusion of nuclei, and it comes afterwards. Fertilisation in humans happens in the oviduct, and the embryo implants in the uterus.',
            zh: '传粉是花粉从花药到柱头；受精是细胞核的融合，发生在其后。人的受精发生在输卵管，胚胎则植入子宫。',
          },
        },
        {
          id: 'sum-2',
          text: {
            en: 'For the cycle, learn it as a chain of causes rather than four separate curves. FSH makes the follicle grow and oestrogen rise; oestrogen rebuilds the lining and triggers the LH surge; LH causes ovulation; progesterone from the corpus luteum maintains the lining; progesterone falling causes the period.',
            zh: '对于月经周期，要把它当作一条因果链来记，而不是四条互不相干的曲线。FSH 促使卵泡生长、雌激素上升；雌激素重建内膜并触发 LH 峰；LH 引起排卵；黄体分泌的孕激素维持内膜；孕激素下降则引起月经。',
          },
        },
        {
          id: 'sum-3',
          text: {
            en: 'And at the placenta the two bloods exchange materials but never mix — different blood groups, and the mother’s pressure would burst the fetus’s vessels. Say "exchange", not "the blood passes across".',
            zh: '在胎盘处，两套血液交换物质但绝不混合——血型可能不同，且母体的血压会胀破胎儿的血管。要写"交换"，而不是"血液流过去"。',
          },
        },
      ],
    },
  ],
}

export default reproductionNarration
