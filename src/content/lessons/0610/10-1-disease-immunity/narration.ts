import type { NarrationScript } from '@/content/types'

export const immunityNarration: NarrationScript = {
  id: '10-1-disease-immunity',
  sections: [
    {
      id: 'intro',
      type: 'intro',
      title: { en: 'Getting in, and being kept out', zh: '侵入，与被挡在外面' },
      lines: [
        {
          id: 'in-1',
          text: {
            en: 'A pathogen is an organism that causes disease. A transmissible disease is one in which the pathogen can pass from one host to another — in the air, in water, in food, by direct contact, or carried by an animal such as a mosquito.',
            zh: '病原体是引起疾病的生物。传染病是指病原体能从一个宿主传到另一个宿主的疾病——经空气、水、食物、直接接触，或由蚊子之类的动物携带传播。',
          },
        },
        {
          id: 'in-2',
          text: {
            en: 'The body’s first defences are not the immune system at all. Skin is a barrier. Hairs in the nose trap particles. Mucus traps them in the airways and cilia sweep it up to be swallowed. Stomach acid kills most of what you swallow. Blood clots seal wounds before anything gets in.',
            zh: '身体最先的防线其实并不是免疫系统。皮肤是屏障。鼻毛拦截颗粒。气道中的黏液把它们粘住，纤毛再把黏液扫上去被吞下。胃酸杀死你吞下的大部分微生物。血凝块在任何东西进入之前就封住伤口。',
          },
        },
        {
          id: 'in-3',
          text: {
            en: 'Which is why hygiene works so well: washing hands, treating sewage, providing clean water and keeping food covered all break the route before the immune system is ever needed. Most of the improvement in human health over the last two centuries came from that rather than from medicine.',
            zh: '这也是卫生措施如此有效的原因：洗手、处理污水、提供清洁饮水、把食物盖好，都是在免疫系统被用到之前就切断了传播途径。过去两个世纪人类健康的改善，大部分来自于此，而不是来自药物。',
          },
        },
      ],
    },
    {
      id: 'response',
      type: 'interaction',
      title: { en: 'Why the second time is different', zh: '为什么第二次不一样' },
      lines: [
        {
          id: 'rs-1',
          text: {
            en: 'If a pathogen does get in, lymphocytes make antibodies. Every pathogen carries antigens — molecules on its surface with a particular shape — and an antibody is a protein with a shape complementary to one specific antigen. One antibody, one antigen, like an enzyme and its substrate.',
            zh: '如果病原体确实侵入了，淋巴细胞就会产生抗体。每种病原体都带有抗原——表面具有特定形状的分子——而抗体是形状与某一特定抗原互补的蛋白质。一种抗体对应一种抗原，就像酶与它的底物。',
          },
          action: { type: 'setParams', params: { secondExposure: 60, vaccinated: 0, passive: 0 } },
        },
        {
          id: 'rs-2',
          text: {
            en: 'Look at the first response. Nothing happens for about a week. That lag is the problem: the body has to find the one lymphocyte in millions that happens to fit this antigen, and then multiply it. Meanwhile the pathogen is multiplying too — which is why you are ill.',
            zh: '看第一次反应：大约一周内什么也没发生。这段延迟就是问题所在：身体必须在数百万个淋巴细胞中找到恰好与这种抗原吻合的那一个，再让它大量增殖。与此同时病原体也在繁殖——所以你才会生病。',
          },
        },
        {
          id: 'rs-3',
          text: {
            en: 'Antibodies then bind to the antigens, sticking pathogens together in clumps and marking them for phagocytes to engulf. The infection clears, the antibody level falls away — and something is left behind. Memory cells.',
            zh: '随后抗体与抗原结合，把病原体粘成团，并标记它们供吞噬细胞吞噬。感染被清除，抗体水平下降——但有东西留了下来：记忆细胞。',
          },
        },
        {
          id: 'rs-4',
          text: {
            en: 'Now the same pathogen arrives again, on day sixty. Compare the two peaks. The second response starts in a day or two instead of a week, and it reaches a level several times higher. The pathogen is destroyed before it can multiply enough to make you ill at all — look at the third graph.',
            zh: '现在同一种病原体在第 60 天再次到来。比较两个峰：第二次反应在一两天内就开始，而不是一周，而且达到的水平高出好几倍。病原体在繁殖到足以致病之前就被消灭了——看第三张图。',
          },
          pause: 1,
        },
        {
          id: 'rs-5',
          text: {
            en: 'The whole difference is the memory cells. They are already there, already the right shape, and already in large numbers, so none of the searching has to be done again. That is what being immune means — not that you cannot be infected, but that you deal with it before you notice.',
            zh: '全部差别就在记忆细胞。它们已经存在、形状已经对路、数量也已经很多，因此不必再重新搜寻。这就是"免疫"的含义——不是你不会被感染，而是你在察觉之前就把它解决了。',
          },
        },
        {
          id: 'rs-6',
          text: {
            en: 'And notice that a late second exposure works just as well as an early one. Memory cells last for years, sometimes for life. That is why you catch measles once.',
            zh: '还要注意：晚一些的第二次接触与早一些的效果一样好。记忆细胞可以存在数年，有时终生。这就是麻疹为什么只会得一次。',
          },
          action: { type: 'setParams', params: { secondExposure: 110, vaccinated: 0, passive: 0 } },
        },
      ],
    },
    {
      id: 'vaccination',
      type: 'interaction',
      title: { en: 'Getting the memory without the illness', zh: '不生病也能获得记忆' },
      lines: [
        {
          id: 'vc-1',
          text: {
            en: 'So here is the idea. The useful part of a first infection is the memory cells; the unwanted part is being ill. What if you could have the first without the second?',
            zh: '于是有了这样一个想法：第一次感染中有用的是记忆细胞，不想要的是生病。如果能只要前者、不要后者呢？',
          },
          action: { type: 'setParams', params: { secondExposure: 60, vaccinated: 1, passive: 0 } },
        },
        {
          id: 'vc-2',
          text: {
            en: 'A vaccine contains the antigens of the pathogen — as a weakened or dead version, or just the antigens on their own. The lymphocytes cannot tell the difference, because they only ever recognised the shape. So they respond exactly as they would to the real thing.',
            zh: '疫苗含有病原体的抗原——可以是减毒或灭活的病原体，也可以只是抗原本身。淋巴细胞分辨不出差别，因为它们本来就只识别形状。所以它们的反应与面对真正的病原体时完全一样。',
          },
        },
        {
          id: 'vc-3',
          text: {
            en: 'Look at the antibody graph. It is identical to the infection. So are the memory cells. Only the illness graph has changed — it is flat, because the weakened pathogen cannot multiply and cause symptoms.',
            zh: '看抗体图：它与感染时完全相同，记忆细胞也一样。只有患病程度那张图变了——它是平的，因为减毒的病原体无法繁殖并引起症状。',
          },
        },
        {
          id: 'vc-4',
          text: {
            en: 'And when enough people in a population are vaccinated, the pathogen cannot find enough susceptible hosts to keep passing between, so it stops spreading — which protects even the people who were not vaccinated. That is how smallpox was eradicated altogether.',
            zh: '当人群中接种的人足够多时，病原体找不到足够多的易感宿主继续传播，也就传不下去了——这样连未接种的人也受到保护。天花正是这样被彻底消灭的。',
          },
        },
      ],
    },
    {
      id: 'passive',
      type: 'interaction',
      title: { en: 'Borrowed antibodies', zh: '借来的抗体' },
      lines: [
        {
          id: 'ps-1',
          text: {
            en: 'There is another way to have antibodies: be given them. That is passive immunity — antibodies made by someone else, handed over ready-made.',
            zh: '还有另一种获得抗体的方式：被给予。这就是被动免疫——由别人产生的抗体，现成地交给你。',
          },
          action: { type: 'setParams', params: { secondExposure: 60, vaccinated: 0, passive: 1 } },
        },
        {
          id: 'ps-2',
          text: {
            en: 'The advantage is obvious on the graph: no lag at all. The antibodies are there immediately, which is why passive immunity is used when someone has already been exposed to something dangerous and there is no time to wait a week.',
            zh: '优点在图上一目了然：完全没有延迟。抗体立刻就在，这正是为什么当一个人已经接触到危险病原体、来不及等上一周时，会采用被动免疫。',
          },
        },
        {
          id: 'ps-3',
          text: {
            en: 'But look at the memory cell graph. It is empty. The body never made these antibodies, so it never learnt anything. And when the second exposure comes, the person gets the full slow primary response — and is ill all over again.',
            zh: '但看记忆细胞那张图：空的。身体从未产生过这些抗体，因此什么也没学到。当第二次接触到来时，这个人得到的是完整而缓慢的初次反应——于是又病了一场。',
          },
          pause: 1,
        },
        {
          id: 'ps-4',
          text: {
            en: 'The most important case of passive immunity is one you have already had. Antibodies cross the placenta before birth and come through breast milk afterwards, so a newborn is protected for a few months while its own immune system is still learning. Short-term, and no memory cells — but it covers the gap.',
            zh: '被动免疫最重要的例子，你自己就经历过。抗体在出生前经胎盘进入，出生后又随母乳而来，因此新生儿在自身免疫系统尚在学习期间可获得数月的保护。它是短期的，也不产生记忆细胞——但恰好补上了这个空档。',
          },
        },
      ],
    },
    {
      id: 'cholera',
      type: 'concept',
      title: { en: 'What a toxin actually does', zh: '毒素究竟做了什么' },
      lines: [
        {
          id: 'ch-1',
          text: {
            en: 'Cholera is a bacterial disease, transmitted in water contaminated with faeces from an infected person. It is a disease of sanitation more than of medicine.',
            zh: '霍乱是一种细菌性疾病，经被感染者粪便污染的水传播。与其说它是医学问题，不如说它是卫生设施的问题。',
          },
        },
        {
          id: 'ch-2',
          text: {
            en: 'The bacterium produces a toxin that makes the cells lining the small intestine secrete chloride ions into the gut. That lowers the water potential of the gut contents below that of the cells — so water follows by osmosis, out of the body and into the intestine.',
            zh: '这种细菌产生一种毒素，使小肠上皮细胞把氯离子分泌到肠腔中。这使肠内容物的水势低于细胞的水势——于是水通过渗透随之而去，从身体流入肠道。',
          },
        },
        {
          id: 'ch-3',
          text: {
            en: 'That is the diarrhoea, and it is why cholera kills so quickly: not the bacterium itself but the loss of water and ions. Which is also why the treatment is so simple — rehydration solution, water with the right salts and some glucose, replacing what is being lost.',
            zh: '这就是腹泻的由来，也是霍乱致死如此之快的原因：致命的不是细菌本身，而是水和离子的流失。这同样解释了为何治疗如此简单——口服补液盐，含适当盐分和一些葡萄糖的水，把流失的补回去。',
          },
        },
      ],
    },
    {
      id: 'antibiotics',
      type: 'concept',
      title: { en: 'Antibiotics, and why they stop working', zh: '抗生素，以及它们为何会失效' },
      lines: [
        {
          id: 'ab-1',
          text: {
            en: 'A drug is any substance taken into the body that modifies or affects chemical reactions in it. Antibiotics are the ones that kill bacteria — by attacking structures a bacterium has and your cells do not, such as its cell wall.',
            zh: '药物是进入体内、改变或影响体内化学反应的任何物质。抗生素是其中能杀死细菌的一类——它们攻击细菌有而你的细胞没有的结构，例如细胞壁。',
          },
        },
        {
          id: 'ab-2',
          text: {
            en: 'Which is exactly why antibiotics do nothing to a virus. A virus has no cell wall, no ribosomes of its own, no metabolism to poison — it is genetic material in a protein coat, reproducing inside your cells. There is nothing there for an antibiotic to attack.',
            zh: '这正是抗生素对病毒毫无作用的原因。病毒没有细胞壁、没有自己的核糖体、没有可被毒害的代谢——它只是蛋白质外壳里的遗传物质，在你的细胞内复制。那里没有任何东西供抗生素攻击。',
          },
        },
        {
          id: 'ab-3',
          text: {
            en: 'Antibiotic resistance is natural selection, running in a hospital instead of a forest. In any large population of bacteria a few carry a mutation that lets them survive the drug. Give the antibiotic, and the ones without it die while those few survive and reproduce.',
            zh: '抗生素耐药性就是自然选择，只不过发生在医院而不是森林里。在任何庞大的细菌种群中，总有少数携带能使其在药物下存活的突变。用了抗生素，没有该突变的死去，而这少数存活并繁殖。',
          },
        },
        {
          id: 'ab-4',
          text: {
            en: 'So the population becomes resistant — not because individual bacteria changed, but because the resistant ones were the only ones left to breed. Every unnecessary course of antibiotics runs that selection once more, which is why they are prescribed only when they are really needed.',
            zh: '于是整个种群变得耐药——不是因为个别细菌发生了改变，而是因为只剩下耐药的那些还能繁殖。每一次不必要的抗生素疗程都会把这个选择过程再跑一遍，这就是为什么只有真正需要时才开抗生素。',
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
            en: 'Active immunity: your own lymphocytes make the antibodies, it is slow to start, and it leaves memory cells so it lasts. Passive immunity: antibodies come from elsewhere, they work at once, there are no memory cells, and it is short-lived.',
            zh: '主动免疫：由你自己的淋巴细胞产生抗体，起效慢，但留下记忆细胞因而持久。被动免疫：抗体来自别处，立即起效，不产生记忆细胞，因而短暂。',
          },
        },
        {
          id: 'sum-2',
          text: {
            en: 'When a question shows two antibody peaks, describe all three differences — the second is faster, higher and lasts longer — and give memory cells as the reason for all three.',
            zh: '当题目给出两个抗体峰时，要写出全部三点差异——第二次更快、更高、持续更久——并把记忆细胞作为这三点共同的原因。',
          },
        },
        {
          id: 'sum-3',
          text: {
            en: 'And antibiotics kill bacteria, not viruses. Resistance arises by natural selection acting on mutations that were already there — not by bacteria "getting used to" the drug.',
            zh: '还有：抗生素杀细菌，不杀病毒。耐药性是自然选择作用于原本就存在的突变而产生的——不是细菌"逐渐习惯"了药物。',
          },
        },
      ],
    },
  ],
}

export default immunityNarration
