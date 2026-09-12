import type { NarrationScript } from '@/content/types'

export const testsNarration: NarrationScript = {
  id: '12-5-tests',
  sections: [
    {
      id: 'titration',
      type: 'intro',
      title: { en: 'Measuring exactly how much', zh: '精确测出用了多少' },
      lines: [
        {
          id: 'ti-1',
          text: {
            en: 'A titration finds exactly how much of one solution reacts with a known amount of another. Use a pipette to put a fixed volume of one — usually the alkali — into a conical flask, and add a few drops of indicator.',
            zh: '滴定用来精确测定一种溶液与已知量的另一种溶液恰好反应的用量。用移液管把固定体积的一种溶液——通常是碱——移入锥形瓶，再滴入几滴指示剂。',
          },
        },
        {
          id: 'ti-2',
          text: {
            en: 'Fill a burette with the other solution, take the starting reading, and run it in — swirling the flask as you go — until the indicator changes colour. That colour change is the end-point, and the volume added is the difference between the two burette readings, called the titre.',
            zh: '把另一种溶液装入滴定管，记下初读数，边滴边摇动锥形瓶，直到指示剂变色。这个变色点就是终点，加入的体积等于滴定管前后两次读数之差，称为滴定体积。',
          },
        },
        {
          id: 'ti-3',
          text: {
            en: 'Two things make it accurate rather than approximate. Add drop by drop near the end-point, so the colour changes on a single drop rather than somewhere within half a cubic centimetre. And repeat until two titres agree closely, then average those — a single reading has nothing to check it against.',
            zh: '有两件事使它从"大致"变成"精确"。接近终点时逐滴加入，使颜色在一滴之内变化，而不是在半立方厘米的范围内某处变化。并且重复滴定直到两次结果接近一致，再取平均——单次读数没有任何可核对的对象。',
          },
        },
        {
          id: 'ti-4',
          text: {
            en: 'The indicator has to give one sharp change, not a gradual fade. Litmus is no use in a titration for exactly that reason — it changes over too wide a range of pH. Methyl orange and thymolphthalein change sharply, which is why those are the ones used.',
            zh: '指示剂必须给出一次明锐的变色，而不是逐渐褪色。石蕊之所以不能用于滴定正是这个原因——它在过宽的 pH 范围内变色。甲基橙和百里酚酞变色明锐，因此用它们。',
          },
        },
      ],
    },
    {
      id: 'cations',
      type: 'interaction',
      title: { en: 'Three white precipitates', zh: '三种白色沉淀' },
      lines: [
        {
          id: 'ca-1',
          text: {
            en: 'Add sodium hydroxide solution to a solution of an unknown metal salt and most metal ions come down as an insoluble hydroxide. The colour of that precipitate is the first clue: light blue for copper, green for iron two, red-brown for iron three.',
            zh: '向未知金属盐溶液中加入氢氧化钠溶液，大多数金属离子会以不溶氢氧化物的形式沉淀出来。沉淀的颜色是第一条线索：铜是浅蓝色，铁(II) 是绿色，铁(III) 是红棕色。',
          },
          action: { type: 'setParams', params: { stage: 1 } },
        },
        {
          id: 'ca-2',
          text: {
            en: 'But calcium and zinc both give a white precipitate, and so does aluminium. Colour alone cannot separate them, so there is a second step: keep adding the sodium hydroxide until it is in excess.',
            zh: '但钙和锌都生成白色沉淀，铝也是。仅凭颜色无法区分，所以还有第二步：继续加氢氧化钠直到过量。',
          },
        },
        {
          id: 'ca-3',
          text: {
            en: 'Zinc hydroxide dissolves again in excess, giving a colourless solution. Calcium hydroxide does not — it stays as a white solid however much you add. That single difference is what identifies which white precipitate you have, and it is the detail an answer has to include.',
            zh: '氢氧化锌在过量时会重新溶解，得到无色溶液。氢氧化钙不会——无论加多少它都保持白色固体。正是这一个差别确定了你得到的是哪种白色沉淀，这也是答案中必须包含的细节。',
          },
        },
        {
          id: 'ca-4',
          text: {
            en: 'Ammonium is the odd one out: no precipitate at all, because there is no insoluble ammonium hydroxide. Warm the mixture instead and ammonia gas comes off, which turns damp red litmus blue. Match these six up.',
            zh: '铵是个例外：完全没有沉淀，因为不存在不溶的氢氧化铵。改为加热混合物，会放出氨气，使湿润的红色石蕊变蓝。把这六个配对起来。',
          },
        },
      ],
    },
    {
      id: 'anions',
      type: 'interaction',
      title: { en: 'Acidify first, and here is why', zh: '先酸化，原因在此' },
      lines: [
        {
          id: 'an-1',
          text: {
            en: 'For the negative ions each test has its own reagent. A carbonate fizzes with dilute acid and the gas turns limewater milky. A halide gives a precipitate with silver nitrate — white for chloride, cream for bromide, yellow for iodide. A sulfate gives a white precipitate with barium nitrate.',
            zh: '检验阴离子时每种都有自己的试剂。碳酸盐与稀酸反应冒泡，气体使澄清石灰水变浑浊。卤化物与硝酸银生成沉淀——氯化物白色、溴化物米黄色、碘化物黄色。硫酸盐与硝酸钡生成白色沉淀。',
          },
          action: { type: 'setParams', params: { stage: 2 } },
        },
        {
          id: 'an-2',
          text: {
            en: 'Notice that both the halide test and the sulfate test start by acidifying with dilute nitric acid. That step is not decoration, and it is worth a mark. If a carbonate happened to be present it would give its own white precipitate with either reagent, and be mistaken for a chloride or a sulfate.',
            zh: '注意卤化物检验和硫酸盐检验都先用稀硝酸酸化。这一步不是装饰，而且是有分的。如果样品中恰好含有碳酸盐，它与这两种试剂都会生成自己的白色沉淀，从而被误判为氯化物或硫酸盐。',
          },
        },
        {
          id: 'an-3',
          text: {
            en: 'The acid destroys any carbonate first, fizzing it away as carbon dioxide, so whatever precipitate appears afterwards can be trusted. Nitric acid specifically — hydrochloric would add chloride ions and sulfuric would add sulfate ions, either of which would give a false positive.',
            zh: '酸先把碳酸盐分解掉，以二氧化碳的形式冒走，这样之后出现的沉淀才可信。必须用硝酸——盐酸会引入氯离子，硫酸会引入硫酸根，两者都会造成假阳性。',
          },
        },
        {
          id: 'an-4',
          text: {
            en: 'The nitrate test is different from all of them: add sodium hydroxide and aluminium foil and warm, and the nitrate is reduced to ammonia, identified by damp red litmus turning blue. Two ions in this syllabus produce ammonia — nitrate and ammonium — and telling them apart is whether you had to add aluminium.',
            zh: '硝酸根的检验与其他都不同：加氢氧化钠和铝箔并加热，硝酸根被还原为氨，用湿润红色石蕊变蓝来确认。本考纲中有两种离子会产生氨——硝酸根和铵——区分它们的是有没有加铝。',
          },
        },
      ],
    },
    {
      id: 'gases',
      type: 'interaction',
      title: { en: 'Splints, litmus and limewater', zh: '木条、石蕊与石灰水' },
      lines: [
        {
          id: 'ga-1',
          text: {
            en: 'The gas tests are short and the wording matters. Hydrogen: a lighted splint gives a squeaky pop. Oxygen: a glowing splint relights. One adjective apart, and swapping them is the most common slip on the whole page.',
            zh: '气体检验很简短，但用词很重要。氢气：点燃的木条发出爆鸣声。氧气：带火星的木条复燃。只差一个形容词，而把两者弄反是整页中最常见的失误。',
          },
          action: { type: 'setParams', params: { stage: 3 } },
        },
        {
          id: 'ga-2',
          text: {
            en: 'Carbon dioxide turns limewater milky. Ammonia turns damp red litmus blue. Chlorine bleaches damp litmus white — note that it does not turn it a colour, it destroys the colour, and an answer saying chlorine "turns litmus white" is describing bleaching correctly.',
            zh: '二氧化碳使澄清石灰水变浑浊。氨使湿润的红色石蕊变蓝。氯气把湿润的石蕊漂白成白色——注意它不是把石蕊变成某种颜色，而是把颜色破坏掉，写氯气"使石蕊变白"正是在正确描述漂白。',
          },
        },
        {
          id: 'ga-3',
          text: {
            en: 'The litmus must be damp in both cases. A dry gas cannot act on dry paper — the substance has to dissolve in the water on the paper before it can do anything at all. Leaving out "damp" loses marks every year.',
            zh: '两种情况下石蕊都必须是湿润的。干燥的气体对干燥的试纸不起作用——物质必须先溶解在试纸的水中才能起作用。漏掉"湿润"二字，每年都有人因此丢分。',
          },
        },
        {
          id: 'ga-4',
          text: {
            en: 'Finally the flame tests, which identify a metal ion without any reagent at all. Clean a wire with concentrated hydrochloric acid, dip it in the solid, and hold it in a hot blue flame: lithium red, sodium yellow, potassium lilac, calcium orange-red, copper blue-green.',
            zh: '最后是焰色反应，它不用任何试剂就能鉴定金属离子。用浓盐酸清洗铂丝，蘸取固体，放入高温蓝色火焰中：锂红色、钠黄色、钾紫色、钙橙红色、铜蓝绿色。',
          },
          action: { type: 'setParams', params: { stage: 4 } },
        },
        {
          id: 'ga-5',
          text: {
            en: 'The wire is cleaned first because sodium is everywhere — in dust, in sweat, in tap water — and its yellow flame is so strong that the least trace of it hides everything else. Clean until the flame stays colourless, and only then dip.',
            zh: '先清洗铂丝，是因为钠无处不在——灰尘里、汗里、自来水里——而它的黄色火焰极强，极微量就会把别的颜色全部掩盖。要洗到火焰保持无色，然后才蘸取样品。',
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
            en: 'Titration: pipette a fixed volume into the flask, add indicator, run the burette in dropwise near the end-point, repeat until two titres agree and average them.',
            zh: '滴定：用移液管取固定体积于锥形瓶，加指示剂，接近终点时逐滴加入，重复至两次结果接近一致后取平均。',
          },
        },
        {
          id: 'sum-2',
          text: {
            en: 'Cations with sodium hydroxide: copper light blue, iron(II) green, iron(III) red-brown, all insoluble in excess. Calcium and zinc both white — zinc dissolves in excess, calcium does not. Ammonium gives no precipitate but ammonia on warming.',
            zh: '阳离子与氢氧化钠：铜浅蓝、铁(II) 绿色、铁(III) 红棕色，过量时均不溶。钙与锌都是白色——锌在过量时溶解，钙不溶。铵不产生沉淀，但加热放出氨。',
          },
        },
        {
          id: 'sum-3',
          text: {
            en: 'Acidify with dilute nitric acid before the silver nitrate or barium nitrate test, or a carbonate gives a false positive. Lighted splint for hydrogen, glowing splint for oxygen, and the litmus must be damp.',
            zh: '在做硝酸银或硝酸钡检验前先用稀硝酸酸化，否则碳酸盐会造成假阳性。氢气用点燃的木条，氧气用带火星的木条，而石蕊必须是湿润的。',
          },
        },
      ],
    },
  ],
}

export default testsNarration
