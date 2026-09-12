import type { NarrationScript } from '@/content/types'

export const biotechnologyNarration: NarrationScript = {
  id: '21-1-biotechnology',
  sections: [
    {
      id: 'bacteria',
      type: 'intro',
      title: { en: 'Why bacteria, of all things', zh: '为什么偏偏是细菌' },
      lines: [
        {
          id: 'bc-1',
          text: {
            en: 'Bacteria are the workhorses of biotechnology, and there are four reasons. They reproduce extremely rapidly — dividing every twenty minutes in good conditions — so a useful strain becomes a vat of useful strain in a day.',
            zh: '细菌是生物技术的主力，原因有四。它们繁殖极快——条件适宜时每二十分钟分裂一次——因此一株有用的菌一天之内就能变成满罐。',
          },
        },
        {
          id: 'bc-2',
          text: {
            en: 'They have plasmids — small rings of DNA that can be taken out, altered and put back, which makes them straightforward to genetically modify. They have no ethical objections in the way that animals do. And they can be grown on waste materials from other industries, which is cheap.',
            zh: '它们有质粒——可以取出、改造、再放回的小环状 DNA，因此很容易进行基因改造。它们不像动物那样涉及伦理争议。而且它们可以用其他行业的废料培养，成本低廉。',
          },
        },
        {
          id: 'bc-3',
          text: {
            en: 'And one more that matters: the genetic code is universal. A human gene put into a bacterium is read the same way, so the bacterium makes the human protein — actual human protein, not an approximation of it.',
            zh: '还有很重要的一点：遗传密码是通用的。把人的基因放进细菌，细菌以同样的方式读取它，于是产生的就是人类蛋白质——是真正的人类蛋白质，而不是它的近似物。',
          },
        },
      ],
    },
    {
      id: 'yeast',
      type: 'concept',
      title: { en: 'One reaction, two industries', zh: '一个反应，两个行业' },
      lines: [
        {
          id: 'ys-1',
          text: {
            en: 'Yeast respiring anaerobically converts glucose into ethanol and carbon dioxide. That single reaction underlies two entirely different industries, and which product you want decides everything about how you run it.',
            zh: '酵母进行无氧呼吸，把葡萄糖转化为乙醇和二氧化碳。就是这一个反应支撑起两个完全不同的行业，而你想要哪种产物，决定了整个操作方式。',
          },
        },
        {
          id: 'ys-2',
          text: {
            en: 'For brewing, the ethanol is the product. Yeast is mixed with a sugar solution from barley or grapes, kept anaerobic, and left to ferment. The carbon dioxide is the by-product — though in a sparkling wine it is kept in.',
            zh: '酿酒时，乙醇是产物。把酵母与来自大麦或葡萄的糖液混合，保持无氧条件，任其发酵。二氧化碳是副产物——不过在起泡酒中它被保留了下来。',
          },
        },
        {
          id: 'ys-3',
          text: {
            en: 'For bread, the carbon dioxide is the product. Yeast is mixed into dough, and the gas bubbles are trapped by the gluten, so the dough rises. The ethanol is the by-product, and it evaporates in the oven — which is why bread does not make you drunk.',
            zh: '做面包时，二氧化碳才是产物。把酵母揉进面团，气泡被面筋网络截留，面团于是发起来。乙醇成了副产物，在烤箱中蒸发掉——这就是为什么面包不会让人喝醉。',
          },
        },
        {
          id: 'ys-4',
          text: {
            en: 'Enzymes are used industrially too, and the pattern is always the same: an enzyme does at low temperature what would otherwise need heat, harsh chemicals or nothing at all. Pectinase breaks down pectin in fruit cell walls, releasing more juice and making it clear rather than cloudy.',
            zh: '酶也被用于工业，模式总是相同的：酶能在低温下完成本来需要加热、强化学品、甚至根本无法完成的事。果胶酶分解水果细胞壁中的果胶，释放出更多果汁，并使其澄清而非浑浊。',
          },
        },
        {
          id: 'ys-5',
          text: {
            en: 'Biological washing powders contain proteases and lipases, which digest protein and fat stains into small soluble molecules that wash away — and they work at low temperatures, which saves energy. Lactase converts the lactose in milk into glucose and galactose, producing lactose-free milk for people who cannot digest it themselves.',
            zh: '生物洗衣粉含蛋白酶和脂肪酶，把蛋白质和油脂污渍消化成可溶的小分子而被洗去——而且它们在低温下就能起作用，从而省电。乳糖酶把牛奶中的乳糖转化为葡萄糖和半乳糖，为不能自行消化乳糖的人生产无乳糖牛奶。',
          },
        },
      ],
    },
    {
      id: 'fermenter',
      type: 'interaction',
      title: { en: 'Four dials on a steel tank', zh: '钢罐上的四个旋钮' },
      lines: [
        {
          id: 'fm-1',
          text: {
            en: 'To do any of this on an industrial scale you need a fermenter: a large sterile steel vessel with four conditions controlled inside it. Start with all four right and watch the culture grow.',
            zh: '要把这些放大到工业规模，就需要发酵罐：一个巨大的无菌钢制容器，内部有四项条件受到控制。先把四项都调对，看培养物如何生长。',
          },
          action: { type: 'setParams', params: { target: 30, oxygen: 100, ph: 6.5, cooling: 100 } },
        },
        {
          id: 'fm-2',
          text: {
            en: 'Oxygen is bubbled in, because the microorganisms respire aerobically and aerobic respiration releases far more energy per glucose. Cut it off and growth almost stops.',
            zh: '要向罐中通入氧气，因为微生物进行有氧呼吸，而有氧呼吸每分子葡萄糖释放的能量多得多。切断氧气，生长几乎停止。',
          },
          action: { type: 'setParams', params: { target: 30, oxygen: 5, ph: 6.5, cooling: 100 } },
        },
        {
          id: 'fm-3',
          text: {
            en: 'pH is monitored and corrected, because the reactions are enzyme-controlled and enzymes have an optimum pH. Push it away from the optimum and the rate falls — the same curve you met in the enzymes lesson, in a steel tank.',
            zh: '要监测并校正 pH，因为这些反应由酶控制，而酶有最适 pH。把它推离最适值，速率就下降——这正是你在酶那一课见过的曲线，只不过搬进了钢罐。',
          },
          action: { type: 'setParams', params: { target: 30, oxygen: 100, ph: 3.5, cooling: 100 } },
        },
        {
          id: 'fm-4',
          text: {
            en: 'A paddle stirs it, keeping the microorganisms suspended and in contact with the nutrients and oxygen instead of settling at the bottom. And the whole thing is sterilised first, so nothing else grows in it and competes.',
            zh: '搅拌桨不停搅动，使微生物悬浮并与养分和氧充分接触，而不是沉到罐底。整个罐体事先灭菌，以免其他生物在其中生长并与之竞争。',
          },
        },
        {
          id: 'fm-5',
          text: {
            en: 'Now the fourth, and it is the one people get backwards. Turn the cooling down and watch the temperature reading. It goes up — a long way up — and the culture dies.',
            zh: '现在看第四项，也是最常被想反的一项。把冷却调低，看温度读数：它上升了——上升了很多——培养物随之死亡。',
          },
          action: { type: 'setParams', params: { target: 30, oxygen: 100, ph: 6.5, cooling: 0 } },
          pause: 1,
        },
        {
          id: 'fm-6',
          text: {
            en: 'Nothing heated it from outside. The microorganisms are respiring, respiration releases energy as heat, and there are billions of them in a vessel whose surface area is tiny compared with its volume. The heat has nowhere to go.',
            zh: '没有任何外部热源。是微生物在进行呼吸作用，呼吸作用把能量以热的形式释放出来，而罐中有数以十亿计的微生物，其容器的表面积相对于容积又极小。热量无处可去。',
          },
        },
        {
          id: 'fm-7',
          text: {
            en: 'So the water jacket on every fermenter diagram is there to take heat away, not to supply it. And that is why the answer to "why is the temperature controlled?" is not only "for the optimum" — it is that without active cooling the culture would denature its own enzymes.',
            zh: '因此每张发酵罐示意图上的水冷夹层，是用来带走热量的，而不是供热的。这也是为什么"为什么要控制温度"的答案不只是"为了最适温度"——而是若不主动冷却，培养物会让自己的酶变性。',
          },
        },
      ],
    },
    {
      id: 'gm',
      type: 'concept',
      title: { en: 'Moving a gene', zh: '把一个基因搬过去' },
      lines: [
        {
          id: 'gm-1',
          text: {
            en: 'Genetic modification is changing an organism’s genetic material by removing, changing or inserting individual genes. Insulin-producing bacteria, crops resistant to herbicides or insects, and rice modified to make beta-carotene are the standard examples.',
            zh: '基因改造是通过删除、改变或插入单个基因来改变生物的遗传物质。能生产胰岛素的细菌、抗除草剂或抗虫的作物，以及经改造能合成 β-胡萝卜素的水稻，都是标准实例。',
          },
        },
        {
          id: 'gm-2',
          text: {
            en: 'Making human insulin in bacteria goes like this. Restriction enzymes cut the human insulin gene out of human DNA, leaving sticky ends — short single-stranded overhangs. The same restriction enzyme cuts open a bacterial plasmid, leaving complementary sticky ends.',
            zh: '用细菌生产人胰岛素的过程是这样的。限制酶把人胰岛素基因从人的 DNA 中切下来，留下黏性末端——短的单链突出端。同一种限制酶切开细菌的质粒，留下互补的黏性末端。',
          },
        },
        {
          id: 'gm-3',
          text: {
            en: 'The ends pair up, and ligase joins them permanently. The plasmid is put back into a bacterium, which is grown in a fermenter — and every one of its descendants carries the human gene and makes human insulin, which is then extracted and purified.',
            zh: '两端配对，连接酶把它们永久连在一起。质粒被放回细菌，细菌在发酵罐中培养——它的每一个后代都携带这个人类基因并生产人胰岛素，随后加以提取和纯化。',
          },
        },
        {
          id: 'gm-4',
          text: {
            en: 'Both enzymes matter and both are examinable. The restriction enzyme cuts; the ligase joins. And the sticky ends are what make it work at all — they are why the human gene fits into a bacterial plasmid instead of simply falling out.',
            zh: '两种酶都重要，也都是考点。限制酶负责切，连接酶负责连。而黏性末端才是整件事能成立的关键——正因为有它们，人类基因才能嵌进细菌质粒，而不是直接掉出来。',
          },
        },
        {
          id: 'gm-5',
          text: {
            en: 'The arguments about GM crops are worth knowing on both sides. For: higher yields, so more food from the same land; resistance to pests, so fewer pesticides; added nutrients, such as vitamin A in golden rice; and tolerance of drought or salt.',
            zh: '关于转基因作物的争论，两方的理由都值得了解。支持方：产量更高，同样的土地产出更多粮食；抗虫，从而减少杀虫剂使用；增加营养，如黄金大米中的维生素 A；以及耐旱或耐盐。',
          },
        },
        {
          id: 'gm-6',
          text: {
            en: 'Against: the modified genes may spread to wild relatives by pollination; the long-term effects on health are not fully known; seed is often patented, so farmers cannot save it; and the loss of traditional varieties reduces genetic variation — which, as you saw with conservation, is what a species needs in order to adapt.',
            zh: '反对方：改造过的基因可能经传粉扩散到野生近缘种；对健康的长期影响尚未完全清楚；种子往往被专利保护，农民无法留种；而传统品种的消失会减少遗传变异——正如你在保护那一节看到的，遗传变异正是物种适应变化所必需的。',
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
            en: 'For a fermenter, name all four conditions and give a reason for each: oxygen for aerobic respiration, temperature for the enzyme optimum, pH for the enzyme optimum, and stirring to keep the culture suspended.',
            zh: '关于发酵罐，要说出全部四项条件并各给一个理由：通氧以进行有氧呼吸、控温以维持酶的最适温度、控 pH 以维持酶的最适 pH，以及搅拌以保持培养物悬浮。',
          },
        },
        {
          id: 'sum-2',
          text: {
            en: 'And the temperature is controlled by cooling, not heating. The microorganisms respire and release heat, and a large vessel cannot lose it fast enough on its own.',
            zh: '而温度是靠冷却来控制的，不是靠加热。微生物呼吸产热，而大型容器自身散热不够快。',
          },
        },
        {
          id: 'sum-3',
          text: {
            en: 'In yeast, glucose becomes ethanol and carbon dioxide. In brewing the ethanol is wanted; in bread-making the carbon dioxide is. One reaction, two products, two industries.',
            zh: '在酵母中，葡萄糖变成乙醇和二氧化碳。酿酒要的是乙醇，做面包要的是二氧化碳。一个反应，两种产物，两个行业。',
          },
        },
      ],
    },
  ],
}

export default biotechnologyNarration
