import type { NarrationScript } from '@/content/types'

export const molesNarration: NarrationScript = {
  id: '3-3-moles',
  sections: [
    {
      id: 'masses',
      type: 'intro',
      title: { en: 'Counting by weighing', zh: '用称量来计数' },
      lines: [
        {
          id: 'ma-1',
          text: {
            en: 'Relative atomic mass, Ar, compares the mass of an atom with a twelfth of a carbon-12 atom. Chlorine’s is 35.5, which is not a rounding error — chlorine is a mixture of two isotopes, three quarters of mass 35 and one quarter of mass 37, and 35.5 is the average.',
            zh: '相对原子质量 Ar 是把一个原子的质量与碳-12 原子质量的十二分之一相比。氯的 Ar 是 35.5，这不是四舍五入的误差——氯是两种同位素的混合物，四分之三质量为 35、四分之一质量为 37，35.5 是它们的平均值。',
          },
        },
        {
          id: 'ma-2',
          text: {
            en: 'Relative molecular mass, Mr, is just the sum of the relative atomic masses in the formula. Water: two hydrogens at one plus one oxygen at sixteen, so eighteen. Calcium hydroxide, Ca(OH)₂: forty, plus two lots of sixteen-plus-one, so seventy-four. Watch the bracket.',
            zh: '相对分子质量 Mr 就是化学式中各相对原子质量之和。水：2 个氢各 1 加 1 个氧 16，共 18。氢氧化钙 Ca(OH)₂：40 加上两份 (16+1)，共 74。要注意括号。',
          },
        },
        {
          id: 'ma-3',
          text: {
            en: 'That already lets you do reacting masses by proportion. If 24 g of magnesium makes 40 g of magnesium oxide, then 4.8 g makes 8 g — a fifth of the magnesium, a fifth of the product. Nothing more sophisticated is needed at Core level.',
            zh: '有了这些就能用比例计算反应质量。若 24 g 镁生成 40 g 氧化镁，则 4.8 g 生成 8 g——镁是五分之一，产物也是五分之一。在 Core 层次不需要更复杂的方法。',
          },
        },
      ],
    },
    {
      id: 'mole',
      type: 'concept',
      title: { en: 'Why chemists invented a new unit', zh: '化学家为什么要发明一个新单位' },
      lines: [
        {
          id: 'mo-1',
          text: {
            en: 'A balanced equation counts particles: two magnesium atoms react with one oxygen molecule. But nobody can count atoms, and nobody can weigh one. The mole bridges the gap — it is the unit of amount of substance, and one mole contains 6.02 times ten to the twenty-three particles.',
            zh: '配平的方程式数的是粒子：2 个镁原子与 1 个氧分子反应。但没有人能数原子，也没有人能称量单个原子。摩尔架起了这座桥——它是物质的量的单位，1 摩尔含有 6.02 × 10²³ 个粒子。',
          },
        },
        {
          id: 'mo-2',
          text: {
            en: 'The number is chosen so that one mole of any substance weighs its Ar or Mr in grams. One mole of magnesium is 24 g. One mole of water is 18 g. So weighing something tells you how many particles you have, which is exactly what the equation wanted to know.',
            zh: '这个数目的选取使得任何物质 1 摩尔的质量恰好是它的 Ar 或 Mr 以克为单位的数值。1 摩尔镁是 24 g。1 摩尔水是 18 g。因此称量就能知道有多少个粒子，而这正是方程式想知道的。',
          },
        },
        {
          id: 'mo-3',
          text: {
            en: 'One relationship carries the whole topic: amount in moles equals mass divided by molar mass. Rearrange it whichever way the question needs. And for gases at room temperature and pressure there is a second: one mole occupies 24 cubic decimetres, whatever the gas.',
            zh: '一个关系式贯穿整个主题：物质的量 = 质量 ÷ 摩尔质量。按题目需要变形即可。对于室温常压下的气体还有第二个：无论什么气体，1 摩尔都占 24 立方分米。',
          },
        },
        {
          id: 'mo-4',
          text: {
            en: 'Concentration comes in two units and the difference is where marks go. Grams per cubic decimetre is a mass in a volume; moles per cubic decimetre is an amount in a volume. Convert with the same relationship, and remember a cubic decimetre is a thousand cubic centimetres.',
            zh: '浓度有两种单位，两者的区别正是得分点。克每立方分米是单位体积内的质量；摩尔每立方分米是单位体积内的物质的量。用同一个关系式换算，并记住 1 立方分米等于 1000 立方厘米。',
          },
        },
      ],
    },
    {
      id: 'limiting',
      type: 'interaction',
      title: { en: 'The corner in the graph', zh: '图像上的那个拐点' },
      lines: [
        {
          id: 'li-1',
          text: {
            en: 'Magnesium burns in oxygen: two magnesium plus one oxygen molecule gives two magnesium oxide. Start with 4.8 g of magnesium, which is 4.8 over 24, so 0.2 moles. And 3.2 g of oxygen, which is 3.2 over 32, so 0.1 moles.',
            zh: '镁在氧气中燃烧：2 个镁加 1 个氧分子生成 2 个氧化镁。先取 4.8 g 镁，即 4.8 ÷ 24 = 0.2 摩尔。再取 3.2 g 氧，即 3.2 ÷ 32 = 0.1 摩尔。',
          },
          action: { type: 'setParams', params: { magnesium: 4.8, oxygen: 3.2, volume: 250 } },
        },
        {
          id: 'li-2',
          text: {
            en: 'Point two moles of magnesium and point one of oxygen — and the equation asks for two magnesium per oxygen, so that is exactly right. Both are used up completely. The 8 g of magnesium oxide produced weighs exactly what the 4.8 and the 3.2 weighed together, as it must.',
            zh: '0.2 摩尔镁对 0.1 摩尔氧——方程式要求每 1 个氧配 2 个镁，所以恰好合适。两者都完全反应。生成的 8 g 氧化镁的质量正好等于 4.8 与 3.2 之和，这是必然的。',
          },
        },
        {
          id: 'li-3',
          text: {
            en: 'Now add more magnesium and watch the graph. It climbs, and then it stops climbing. Past that corner the extra magnesium produces nothing at all, because the oxygen has run out — the oxygen is the limiting reactant, and it is the limiting reactant that decides the yield.',
            zh: '现在加更多的镁，看图像。它上升，然后停止上升。过了那个拐点，多加的镁完全不产生任何东西，因为氧已经用完了——氧是限量反应物，而正是限量反应物决定产量。',
          },
          action: { type: 'setParams', params: { magnesium: 18, oxygen: 3.2, volume: 250 } },
        },
        {
          id: 'li-4',
          text: {
            en: 'Here is the step that goes wrong most often. Do not compare the two mole counts directly. Point seven five moles of magnesium against point one of oxygen looks like magnesium is in excess — and it is, but only because the equation needs two magnesium per oxygen. Compare the magnesium against twice the oxygen. Always divide by the coefficient first.',
            zh: '下面这一步最容易出错。不要直接比较两个物质的量。0.75 摩尔镁对 0.1 摩尔氧，看上去镁过量——它确实过量，但那是因为方程式要求每 1 个氧配 2 个镁。要拿镁与氧的两倍相比。永远先除以系数。',
          },
        },
        {
          id: 'li-5',
          text: {
            en: 'Double the oxygen and the corner moves right. More oxygen means more magnesium can be burnt before it runs out, so the straight part lasts longer. That is the check that this is a real physical limit rather than a rule about which number to pick.',
            zh: '把氧加倍，拐点向右移。氧更多意味着在它耗尽之前能燃烧更多的镁，所以直线段更长。这就是验证：这是一个真实的物理限制，而不是"该选哪个数"的规则。',
          },
          action: { type: 'setParams', params: { magnesium: 18, oxygen: 12.8, volume: 250 } },
        },
        {
          id: 'li-6',
          text: {
            en: 'Read the concentration too. Point two moles dissolved in 250 cubic centimetres is not point two over 250 — it is point two over point two five cubic decimetres, so point eight moles per cubic decimetre. Every year, people divide by the number of cubic centimetres and are out by a factor of a thousand.',
            zh: '也看看浓度。0.2 摩尔溶于 250 立方厘米，不是 0.2 ÷ 250——而是 0.2 ÷ 0.25 立方分米，即 0.8 摩尔每立方分米。每年都有人直接除以立方厘米数，结果差了一千倍。',
          },
          action: { type: 'setParams', params: { magnesium: 4.8, oxygen: 3.2, volume: 250 } },
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
            en: 'Ar is an average over the isotopes; Mr is the sum of the Ar values in the formula. One mole is 6.02 times ten to the twenty-three particles, and weighs the Ar or Mr in grams.',
            zh: 'Ar 是同位素的平均值；Mr 是化学式中各 Ar 之和。1 摩尔含 6.02 × 10²³ 个粒子，其质量为 Ar 或 Mr 的克数。',
          },
        },
        {
          id: 'sum-2',
          text: {
            en: 'Moles equals mass over molar mass. One mole of any gas occupies 24 cubic decimetres at r.t.p. Concentration in mol per dm³ is moles over volume in cubic decimetres — divide cubic centimetres by a thousand first.',
            zh: '物质的量 = 质量 ÷ 摩尔质量。室温常压下任何气体 1 摩尔占 24 立方分米。以 mol/dm³ 计的浓度 = 物质的量 ÷ 体积（立方分米）——先把立方厘米除以 1000。',
          },
        },
        {
          id: 'sum-3',
          text: {
            en: 'To find the limiting reactant, convert both to moles and then divide each by its coefficient in the equation. The smaller answer is the one that runs out, and it alone decides the yield.',
            zh: '求限量反应物时，先把两者都换算成物质的量，再各自除以方程式中的系数。较小的那个会先耗尽，产量只由它决定。',
          },
        },
      ],
    },
  ],
}

export default molesNarration
