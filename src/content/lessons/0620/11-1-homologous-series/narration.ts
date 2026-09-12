import type { NarrationScript } from '@/content/types'

export const homologousSeriesNarration: NarrationScript = {
  id: '11-1-homologous-series',
  sections: [
    {
      id: 'intro',
      type: 'intro',
      title: { en: 'Two questions about any organic molecule', zh: '面对有机分子只问两个问题' },
      lines: [
        {
          id: 'intro-1',
          text: {
            en: 'There are millions of organic compounds, and you are not expected to learn them one at a time. Instead, ask two questions of any molecule: how long is the carbon chain, and what is stuck on the end of it? Those are the only two controls here.',
            zh: '有机化合物有数百万种，没人指望你一个一个背。面对任何分子只问两个问题：碳链有多长，末端接了什么？这里也只有这两个控件。',
          },
          action: { type: 'setParams', params: { carbons: 1, family: 0 } },
        },
        {
          id: 'intro-2',
          text: {
            en: 'This is methane. One carbon, four hydrogens, and every bond drawn in. That is a displayed formula — you must show every atom and every bond, not just the formula.',
            zh: '这是甲烷。一个碳、四个氢，每一根键都画了出来。这就是结构式——必须画出每个原子和每根键，而不只是写化学式。',
          },
        },
      ],
    },
    {
      id: 'series',
      type: 'interaction',
      title: { en: 'Add one carbon at a time', zh: '一次加一个碳' },
      lines: [
        {
          id: 'series-1',
          text: {
            en: 'Ethane. Watch what was added: one carbon and two hydrogens — a CH₂ unit. Nothing else about the molecule changed.',
            zh: '乙烷。看看多了什么：一个碳、两个氢——也就是一个 CH₂ 单元。分子的其他部分毫无变化。',
          },
          action: { type: 'setParams', params: { carbons: 2, family: 0 } },
        },
        {
          id: 'series-2',
          text: {
            en: 'Propane, then butane. Every step adds exactly one CH₂, so the relative molecular mass climbs by fourteen each time. That is what a homologous series is: a family whose members differ by CH₂ and share one general formula, here CₙH₂ₙ₊₂.',
            zh: '丙烷，然后是丁烷。每一步都恰好增加一个 CH₂，所以相对分子质量每次增加 14。这就是同系物：相差 CH₂、通式相同的一族化合物，这里是 CₙH₂ₙ₊₂。',
          },
          action: { type: 'setParams', params: { carbons: 4, family: 0 } },
          pause: 1,
        },
        {
          id: 'series-3',
          text: {
            en: 'Look at the graph while you do it. The boiling point rises steadily along the series — a gradual change in physical properties, which is the third thing a homologous series always shows.',
            zh: '一边操作一边看图。沸点沿着同系物稳步升高——物理性质渐变，这是同系物的第三个特征。',
          },
        },
      ],
    },
    {
      id: 'groups',
      type: 'concept',
      title: { en: 'Change the end of the chain', zh: '改变链的末端' },
      lines: [
        {
          id: 'group-1',
          text: {
            en: 'Now hold the chain at two carbons and change what is on the end. This is ethene: the two carbons share two pairs of electrons instead of one, so there is a double bond and two fewer hydrogens. The general formula drops to CₙH₂ₙ.',
            zh: '现在把碳链固定在两个碳，改变末端。这是乙烯：两个碳共用两对电子而不是一对，所以有一个双键，氢也少了两个。通式变成 CₙH₂ₙ。',
          },
          action: { type: 'setParams', params: { carbons: 2, family: 1 } },
        },
        {
          id: 'group-2',
          text: {
            en: 'Ethanol. An –OH group in place of one hydrogen, and the name ends in "-ol". Same two carbons, but look at the boiling point: minus eighty-nine for ethane, seventy-eight for ethanol. The group changed everything.',
            zh: '乙醇。一个 –OH 取代了一个氢，名字以 "-ol" 结尾。同样是两个碳，但看沸点：乙烷 −89，乙醇 78。官能团改变了一切。',
          },
          action: { type: 'setParams', params: { carbons: 2, family: 2 } },
          pause: 1,
        },
        {
          id: 'group-3',
          text: {
            en: 'Ethanoic acid — the acid in vinegar. A –COOH group: one oxygen double-bonded to the carbon, one in an O–H. That group is what makes it an acid, and it is the reason the boiling point is higher again.',
            zh: '乙酸——食醋中的酸。一个 –COOH 官能团：一个氧与碳双键相连，另一个在 O–H 中。正是这个基团让它成为酸，也让沸点又高了一截。',
          },
          action: { type: 'setParams', params: { carbons: 2, family: 3 } },
        },
        {
          id: 'group-4',
          text: {
            en: 'The teal bonds are the functional group: the atoms that decide the chemical properties. Everything in grey is just chain. Two compounds with the same functional group react in the same way, however long their chains.',
            zh: '青色的键就是官能团：决定化学性质的那部分原子。灰色的部分只是碳链。官能团相同的两种化合物，不管链多长，反应方式都相同。',
          },
        },
      ],
    },
    {
      id: 'naming',
      type: 'concept',
      title: { en: 'Reading the name', zh: '读懂名字' },
      lines: [
        {
          id: 'name-1',
          text: {
            en: 'Organic names are built in two halves. The stem counts the carbons — meth- one, eth- two, prop- three, but- four. The ending gives the family: -ane, -ene, -ol, -oic acid.',
            zh: '有机物的名字分两半。词干表示碳数——meth- 一、eth- 二、prop- 三、but- 四。词尾表示类别：-ane、-ene、-ol、-oic acid。',
          },
        },
        {
          id: 'name-2',
          text: {
            en: 'So propan-1-ol has to be three carbons with an –OH, and you can draw it without ever having seen it. The number tells you which carbon the group is on.',
            zh: '所以 propan-1-ol 一定是三个碳带一个 –OH，即使没见过也能画出来。中间的数字告诉你官能团在第几个碳上。',
          },
          action: { type: 'setParams', params: { carbons: 3, family: 2 } },
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
            en: 'A homologous series has one general formula, consecutive members differing by CH₂, similar chemical properties, and a gradual trend in physical properties. Learn those four points — they are worth marks on their own.',
            zh: '同系物有四个特征：通式相同、相邻成员相差 CH₂、化学性质相似、物理性质渐变。把这四点背下来——它们本身就是得分点。',
          },
        },
        {
          id: 'summary-2',
          text: {
            en: 'And when a question says "draw the displayed formula", it means every atom and every bond. A carbon with only three bonds on it loses the mark, however good the rest of the answer is.',
            zh: '另外，题目说 "draw the displayed formula" 时，指的是画出每个原子和每根键。碳上只画了三根键就要丢分，答案其他部分再好也没用。',
          },
        },
      ],
    },
  ],
}

export default homologousSeriesNarration
