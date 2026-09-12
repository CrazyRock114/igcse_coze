import type { NarrationScript } from '@/content/types'

export const equationNarration: NarrationScript = {
  id: '3-1-formulae-equations',
  sections: [
    {
      id: 'formulae',
      type: 'intro',
      title: { en: 'What a formula tells you', zh: '化学式告诉你什么' },
      lines: [
        {
          id: 'fo-1',
          text: {
            en: 'A molecular formula says exactly how many atoms of each element are in one molecule. H₂SO₄ is two hydrogens, one sulfur and four oxygens — not a ratio, a count.',
            zh: '分子式说明一个分子中每种元素各有多少个原子。H₂SO₄ 是 2 个氢、1 个硫、4 个氧——它是数目，不是比例。',
          },
        },
        {
          id: 'fo-2',
          text: {
            en: 'The empirical formula is different: it is the simplest whole-number ratio of the atoms. Ethene is C₂H₄ as a molecular formula but CH₂ as an empirical formula. Both are correct answers to different questions, and reading which one is being asked for is half the mark.',
            zh: '实验式则不同：它是原子数的最简整数比。乙烯的分子式是 C₂H₄，实验式是 CH₂。两者分别是不同问题的正确答案，看清题目问的是哪一个，就已经拿到一半的分。',
          },
        },
        {
          id: 'fo-3',
          text: {
            en: 'Watch the brackets. Ca(OH)₂ means the whole OH group is doubled — one calcium, two oxygens and two hydrogens. Reading it as one oxygen is a common slip, and it wrecks every calculation that follows.',
            zh: '要注意括号。Ca(OH)₂ 表示整个 OH 基团有两个——1 个钙、2 个氧、2 个氢。把它读成 1 个氧是常见错误，而且会毁掉后面所有的计算。',
          },
        },
        {
          id: 'fo-4',
          text: {
            en: 'For an ionic compound the formula comes from the charges, and there is a rule that always works: the compound must be electrically neutral overall. Magnesium is Mg²⁺ and chloride is Cl⁻, so you need two chlorides for every magnesium — MgCl₂. Aluminium is Al³⁺ and oxide is O²⁻, so two aluminiums and three oxides balance at six positive and six negative: Al₂O₃.',
            zh: '离子化合物的化学式由电荷决定，有一条永远适用的规则：化合物整体必须电中性。镁是 Mg²⁺，氯离子是 Cl⁻，所以每个镁需要 2 个氯离子——MgCl₂。铝是 Al³⁺，氧离子是 O²⁻，2 个铝和 3 个氧离子恰好各为 6 个正电荷和 6 个负电荷：Al₂O₃。',
          },
        },
      ],
    },
    {
      id: 'balancing',
      type: 'interaction',
      title: { en: 'Two columns that have to agree', zh: '必须相等的两列数' },
      lines: [
        {
          id: 'ba-1',
          text: {
            en: 'Start with the word equation — reactants on the left, products on the right, an arrow between them. Hydrogen plus oxygen gives water. Then replace each name with its formula, and you have a symbol equation. It is not finished yet.',
            zh: '先写文字方程式——反应物在左，生成物在右，中间用箭头连接。氢气加氧气生成水。然后把每个名称换成化学式，就得到符号方程式。但它还没写完。',
          },
          action: { type: 'setParams', params: { reaction: 0, a: 1, b: 1, c: 1, d: 1 } },
        },
        {
          id: 'ba-2',
          text: {
            en: 'Look at the table. Hydrogen: two on the left, two on the right — fine. Oxygen: two on the left, one on the right. As it stands this equation says one oxygen atom vanished, and atoms do not vanish. That is the law of conservation of mass, and balancing is how an equation obeys it.',
            zh: '看这张表。氢：左边 2 个，右边 2 个——没问题。氧：左边 2 个，右边 1 个。照现在这样写，方程式说有 1 个氧原子消失了，而原子不会消失。这就是质量守恒定律，配平就是让方程式遵守它。',
          },
        },
        {
          id: 'ba-3',
          text: {
            en: 'Here is the rule that decides everything. You may change the big number in front of a formula, and you may not change the formula itself. Turning H₂O into H₂O₂ would balance the oxygens instantly — and it would be describing hydrogen peroxide, a bleach, instead of water. The formula is fixed by the substance.',
            zh: '这里有一条决定一切的规则。你可以改动化学式前面的大数字，但不能改动化学式本身。把 H₂O 改成 H₂O₂ 立刻就能配平氧——但那写的是过氧化氢，一种漂白剂，而不是水。化学式由物质本身决定。',
          },
        },
        {
          id: 'ba-4',
          text: {
            en: 'So put a two in front of the water. Now oxygen is two against two. But look at hydrogen — it has gone to two against four. Fixing one element has broken another, which is what makes balancing feel like whack-a-mole until you get used to it.',
            zh: '那就在水前面写 2。现在氧是 2 对 2。但看氢——它变成了 2 对 4。修好一个元素却弄坏了另一个，这正是配平在熟练之前让人觉得像打地鼠的原因。',
          },
          action: { type: 'setParams', params: { reaction: 0, a: 1, b: 1, c: 2, d: 1 } },
        },
        {
          id: 'ba-5',
          text: {
            en: 'Two in front of the hydrogen as well, and both rows agree: four hydrogens and two oxygens on each side. Read the finished equation as a recipe — two molecules of hydrogen react with one of oxygen to give two of water.',
            zh: '在氢气前面也写 2，两行就都相等了：两边各 4 个氢、2 个氧。把配平后的方程式当作配方来读——2 个氢分子与 1 个氧分子反应生成 2 个水分子。',
          },
          action: { type: 'setParams', params: { reaction: 0, a: 2, b: 1, c: 2, d: 1 } },
        },
        {
          id: 'ba-6',
          text: {
            en: 'Notice the small letters in brackets. Those are state symbols: s for solid, l for liquid, g for gas, and aq for aqueous — dissolved in water. They are part of a complete answer at Extended level, and a question that gives you states expects them back.',
            zh: '注意括号里的小写字母。那是状态符号：s 固体、l 液体、g 气体、aq 水溶液——溶于水。在 Extended 层次这是完整答案的一部分，题目给了状态就要求你写回去。',
          },
        },
        {
          id: 'ba-7',
          text: {
            en: 'Now try methane burning, which has four species. A useful order: leave the element on its own until last. Balance the carbons, then the hydrogens, and only then use the oxygen molecules to mop up whatever oxygen the other two demanded.',
            zh: '现在试试甲烷燃烧，它有四种物质。一个有用的顺序：把单质留到最后。先配平碳，再配平氢，最后才用氧分子去补齐前两者所需要的氧。',
          },
          action: { type: 'setParams', params: { reaction: 1, a: 1, b: 1, c: 1, d: 1 } },
        },
        {
          id: 'ba-8',
          text: {
            en: 'One carbon each side already. Four hydrogens on the left needs two waters on the right. That puts two oxygens in the water and two in the carbon dioxide, four in total — so two oxygen molecules on the left. Done, and never once by guessing.',
            zh: '碳两边已经各 1 个。左边 4 个氢需要右边 2 个水。这样水里有 2 个氧、二氧化碳里有 2 个氧，共 4 个——所以左边需要 2 个氧分子。完成，而且全程没有靠猜。',
          },
          action: { type: 'setParams', params: { reaction: 1, a: 1, b: 2, c: 1, d: 2 } },
        },
        {
          id: 'ba-9',
          text: {
            en: 'Iron rusting is the one people find hardest, because the answer needs a four and a three. Try it. If you get stuck, count the oxygens: Fe₂O₃ has three, and an oxygen molecule has two, so the smallest number of oxygen atoms both can make is six.',
            zh: '铁生锈是大家觉得最难的一个，因为答案需要 4 和 3。试试看。如果卡住了，就数氧：Fe₂O₃ 有 3 个氧，一个氧分子有 2 个，两者都能凑出的最小氧原子数是 6。',
          },
          action: { type: 'setParams', params: { reaction: 2, a: 1, b: 1, c: 1, d: 1 } },
        },
      ],
    },
    {
      id: 'ionic',
      type: 'concept',
      title: { en: 'Leaving out what did not do anything', zh: '把没参与的略去' },
      lines: [
        {
          id: 'io-1',
          text: {
            en: 'When silver nitrate solution is added to sodium chloride solution, a white precipitate of silver chloride forms. The full equation has four compounds in it — but look at what actually happened.',
            zh: '把硝酸银溶液加入氯化钠溶液，会生成氯化银白色沉淀。完整方程式里有四种化合物——但看看真正发生了什么。',
          },
        },
        {
          id: 'io-2',
          text: {
            en: 'Both solutions contain separate ions drifting about. The silver ions and the chloride ions found each other and stuck together as a solid. The sodium ions and the nitrate ions were in solution before and are still in solution afterwards — nothing happened to them at all. They are called spectator ions, and an ionic equation leaves them out.',
            zh: '两种溶液里都是彼此分开、四处游动的离子。银离子与氯离子相遇并结合成固体。钠离子和硝酸根离子反应前在溶液中、反应后仍在溶液中——它们什么变化也没有。它们被称为旁观离子，离子方程式把它们略去。',
          },
        },
        {
          id: 'io-3',
          text: {
            en: 'So the ionic equation is silver ion plus chloride ion gives silver chloride solid. Three species instead of four compounds, and it says something the full equation does not: this same reaction happens with any soluble silver salt and any soluble chloride, because the spectators never mattered.',
            zh: '于是离子方程式就是：银离子 + 氯离子 → 氯化银固体。三种微粒代替了四种化合物，而且它说出了完整方程式没说的事：任何可溶银盐与任何可溶氯化物都会发生同样的反应，因为旁观离子从来就无关紧要。',
          },
        },
        {
          id: 'io-4',
          text: {
            en: 'Two things must balance in an ionic equation, not one: the atoms, and the total charge. If the charges do not add up to the same value on both sides, the equation is wrong however neat the atoms look.',
            zh: '离子方程式必须配平两样东西，而不是一样：原子和总电荷。如果两边的电荷总数不相等，那么无论原子看起来多整齐，方程式都是错的。',
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
            en: 'A molecular formula counts the atoms in a molecule; an empirical formula gives their simplest ratio. For an ionic compound, work the formula out from the charges — the compound must come out neutral.',
            zh: '分子式给出分子中原子的数目；实验式给出它们的最简比。离子化合物的化学式由电荷推出——化合物必须整体电中性。',
          },
        },
        {
          id: 'sum-2',
          text: {
            en: 'Balance by changing only the numbers in front. Never alter a formula to make it fit. Check every element, and remember the state symbols: s, l, g, aq.',
            zh: '配平时只改动前面的系数。绝不为了凑数而改动化学式。逐个元素核对，并记住状态符号：s、l、g、aq。',
          },
        },
        {
          id: 'sum-3',
          text: {
            en: 'In an ionic equation, leave out the spectator ions — the ones unchanged on both sides — and check that the charges balance as well as the atoms.',
            zh: '在离子方程式中略去旁观离子——两边都没有变化的那些——并且要同时核对电荷与原子是否平衡。',
          },
        },
      ],
    },
  ],
}

export default equationNarration
