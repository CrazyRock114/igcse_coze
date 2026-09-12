import type { NarrationScript } from '@/content/types'

export const photosynthesisNarration: NarrationScript = {
  id: '6-1-photosynthesis',
  sections: [
    {
      id: 'intro',
      type: 'intro',
      title: { en: 'Building sugar out of air', zh: '用空气造糖' },
      lines: [
        {
          id: 'intro-1',
          text: {
            en: 'Photosynthesis is how plants make carbohydrates from raw materials, using energy from light. Carbon dioxide and water go in; glucose and oxygen come out. Every atom of carbon in a tree arrived as a gas.',
            zh: '光合作用是植物利用光能、由原料合成糖类的过程。二氧化碳和水进去，葡萄糖和氧气出来。一棵树中的每一个碳原子，都是以气体的形式到来的。',
          },
          action: { type: 'setParams', params: { light: 50, carbonDioxide: 0.04, temperature: 30 } },
        },
        {
          id: 'intro-2',
          text: {
            en: 'Chlorophyll is the green pigment in the chloroplasts, and its job is to transfer energy from light into chemicals. It is not consumed — it is the machine, not the fuel.',
            zh: '叶绿素是叶绿体中的绿色色素，它的作用是把光能转移到化学物质中。它本身不被消耗——它是机器，不是燃料。',
          },
        },
        {
          id: 'intro-3',
          text: {
            en: 'The glucose does not stay glucose. Some is respired for energy straight away. Some is converted to starch for storage, because starch is insoluble and will not upset the water balance of the cell. Some becomes cellulose for cell walls, and some becomes amino acids — for which the plant needs nitrate ions from the soil.',
            zh: '葡萄糖不会一直是葡萄糖。一部分立刻用于呼吸作用供能；一部分转化为淀粉贮存，因为淀粉不溶，不会打乱细胞的水分平衡；一部分变成细胞壁的纤维素；还有一部分变成氨基酸——为此植物需要从土壤中获取硝酸根离子。',
          },
        },
        {
          id: 'intro-4',
          text: {
            en: 'And magnesium ions, because magnesium is part of the chlorophyll molecule itself. A plant short of magnesium turns yellow, because it cannot build the pigment.',
            zh: '还需要镁离子，因为镁是叶绿素分子本身的组成部分。缺镁的植物会发黄，因为它造不出这种色素。',
          },
        },
      ],
    },
    {
      id: 'plateau',
      type: 'interaction',
      title: { en: 'Why the graph goes flat', zh: '图为什么会变平' },
      lines: [
        {
          id: 'plat-1',
          text: {
            en: 'Turn the light down almost to nothing and bring it up. At first every extra bit of light buys you rate — the curve is steep, and light is what the plant is short of.',
            zh: '把光调到几乎没有，然后逐渐增强。起初每增加一点光都能换来速率——曲线很陡，此时光正是植物所缺的。',
          },
          action: { type: 'setParams', params: { light: 8, carbonDioxide: 0.04, temperature: 30 } },
        },
        {
          id: 'plat-2',
          text: {
            en: 'Keep going and the curve flattens. Now double the light again. Nothing. The rate does not move, and the reason is not that the plant has had enough light — it is that it has run out of something else.',
            zh: '继续增强，曲线变平了。再把光加倍——没有变化。速率纹丝不动，原因不是植物的光够了，而是别的东西不够了。',
          },
          action: { type: 'setParams', params: { light: 100, carbonDioxide: 0.04, temperature: 30 } },
          pause: 1,
        },
        {
          id: 'plat-3',
          text: {
            en: 'Look at the readings. Light supply is high; carbon dioxide supply is low. Air is only about four hundredths of one per cent carbon dioxide, and on a bright day that is what holds a plant back.',
            zh: '看读数：光的供应很充足，二氧化碳的供应很低。空气中二氧化碳只占约万分之四，在晴天里正是它限制着植物。',
          },
        },
        {
          id: 'plat-4',
          text: {
            en: 'So raise it. Watch the whole light curve lift — the plateau moves up. The extra light that was doing nothing a moment ago is suddenly worth something, because now there is carbon dioxide for it to work on.',
            zh: '那就提高它。看整条光曲线抬升——平台上移了。刚才毫无用处的额外光照，现在忽然有了价值，因为有二氧化碳供它使用了。',
          },
          action: { type: 'setParams', params: { light: 100, carbonDioxide: 0.2, temperature: 30 } },
        },
        {
          id: 'plat-5',
          text: {
            en: 'That is a limiting factor: the one in shortest supply, the one that sets the ceiling. Give a plant more of anything else and nothing happens. Give it more of that one and everything moves.',
            zh: '这就是限制因素：供应最短缺的那一个，决定上限的那一个。给植物增加别的东西毫无作用，唯独增加它，一切才会改变。',
          },
        },
        {
          id: 'plat-6',
          text: {
            en: 'And it is why commercial greenhouses burn fuel to enrich the air with carbon dioxide. They are not warming the place — well, not only. They are buying the plateau upwards.',
            zh: '这也是商业温室要燃烧燃料以提高空气中二氧化碳浓度的原因。他们不只是在保温——而是在花钱把那个平台抬高。',
          },
        },
      ],
    },
    {
      id: 'temperature',
      type: 'interaction',
      title: { en: 'The odd one out', zh: '与众不同的那一个' },
      lines: [
        {
          id: 'temp-1',
          text: {
            en: 'Two of these three curves only ever go up. The temperature one does not — it rises, peaks, and falls away. You have seen that shape twice already.',
            zh: '这三条曲线中有两条只会上升。温度那条不是——它上升、达峰、然后回落。这个形状你已经见过两次了。',
          },
          action: { type: 'setParams', params: { light: 100, carbonDioxide: 0.4, temperature: 10 } },
        },
        {
          id: 'temp-2',
          text: {
            en: 'Because temperature is not a raw material. Light and carbon dioxide are things the plant consumes; temperature is a condition. It sets how fast the enzymes of photosynthesis work, and above about forty degrees those enzymes denature.',
            zh: '因为温度不是原料。光和二氧化碳是植物消耗的东西，温度只是一个条件。它决定光合作用相关酶的工作速率，而超过约 40 °C 这些酶就变性了。',
          },
          action: { type: 'setParams', params: { light: 100, carbonDioxide: 0.4, temperature: 45 } },
          pause: 1,
        },
        {
          id: 'temp-3',
          text: {
            en: 'So temperature can be the limiting factor too — on a cold bright morning it usually is. But it limits for a different reason, and if a question asks you to explain the shape you have to say which reason applies.',
            zh: '所以温度也可能成为限制因素——寒冷而晴朗的早晨通常就是如此。但它的限制原因不同，如果题目要求解释曲线形状，就必须说清是哪个原因。',
          },
        },
      ],
    },
    {
      id: 'leaf',
      type: 'concept',
      title: { en: 'A leaf is built for this', zh: '叶片就是为此而生的' },
      lines: [
        {
          id: 'leaf-1',
          text: {
            en: 'Every feature of a leaf is an answer to one of these three shortages. Broad and flat: a large surface area to catch light. Thin: carbon dioxide has a short distance to diffuse to any cell that needs it.',
            zh: '叶片的每一个特征，都是对这三种短缺之一的回应。宽而扁平：大表面积以捕获光照。薄：二氧化碳只需扩散很短距离就能到达任何需要它的细胞。',
          },
        },
        {
          id: 'leaf-2',
          text: {
            en: 'Inside, the palisade cells are at the top, packed with chloroplasts and lined up in a column, because that is where the light arrives first. Below them the spongy mesophyll is full of air spaces, so carbon dioxide can move about freely.',
            zh: '内部，栅栏组织细胞位于上层，富含叶绿体并排列成柱状，因为光首先到达那里。下方的海绵组织充满气腔，二氧化碳可以自由移动。',
          },
        },
        {
          id: 'leaf-3',
          text: {
            en: 'Stomata in the lower epidermis let that carbon dioxide in, with guard cells to close them when water is short. And a network of veins brings water from the xylem and takes the sugars away in the phloem.',
            zh: '下表皮的气孔让二氧化碳进入，保卫细胞在缺水时把它们关闭。而叶脉网络由木质部输入水分、由韧皮部运走糖分。',
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
          id: 'summary-1',
          text: {
            en: 'Carbon dioxide plus water, in the presence of light and chlorophyll, gives glucose plus oxygen. Learn the word equation, and the balanced one if you are taking the Extended paper.',
            zh: '二氧化碳加水，在光照和叶绿素存在下，生成葡萄糖和氧气。文字表达式要背，考 Extended 的还要会写配平的化学方程式。',
          },
        },
        {
          id: 'summary-2',
          text: {
            en: 'When a graph flattens, name the factor that has become limiting and say the rate cannot rise until *that* is increased. Answering "the plant has enough light now" describes the flat part without explaining it, and gets no marks.',
            zh: '当图变平时，要指出成为限制因素的是什么，并说明只有增加*它*速率才能上升。写"植物的光已经够了"只是描述平的那一段而没有解释，得不到分。',
          },
        },
      ],
    },
  ],
}

export default photosynthesisNarration
