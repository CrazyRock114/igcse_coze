import type { NarrationScript } from '@/content/types'

export const alkenesNarration: NarrationScript = {
  id: '11-5-alkenes',
  sections: [
    {
      id: 'intro',
      type: 'intro',
      title: { en: 'One double bond changes everything', zh: '一个双键改变一切' },
      lines: [
        {
          id: 'intro-1',
          text: {
            en: 'Ethane and ethene differ by two hydrogen atoms. That is the whole difference on paper — and it is the difference between a molecule that does almost nothing and a molecule that reacts with everything you put near it.',
            zh: '乙烷和乙烯只差两个氢原子。纸面上的差别仅此而已——但它决定了一个分子几乎什么都不做，而另一个几乎见什么反应什么。',
          },
          action: { type: 'setParams', params: { carbons: 2, family: 0, reagent: 0 } },
        },
        {
          id: 'intro-2',
          text: {
            en: 'This is ethane. Every carbon–carbon bond is a single bond and every carbon already holds as many hydrogens as it can. We call that saturated: there is no room for anything more.',
            zh: '这是乙烷。碳碳之间都是单键，每个碳都已经连了尽可能多的氢。我们称之为饱和：再也装不下别的东西了。',
          },
        },
        {
          id: 'intro-3',
          text: {
            en: 'Now switch to ethene. Two of the bonds between the carbons are doubled up, and two hydrogens have gone. Unsaturated. That double bond is the functional group, and everything in this lesson happens there.',
            zh: '现在切换到乙烯。两个碳之间成了双键，同时少了两个氢。这就是不饱和。那个双键就是官能团，本课所有反应都发生在那里。',
          },
          action: { type: 'setParams', params: { carbons: 2, family: 1, reagent: 0 } },
          pause: 1,
        },
      ],
    },
    {
      id: 'test',
      type: 'interaction',
      title: { en: 'The bromine water test', zh: '溴水检验' },
      lines: [
        {
          id: 'test-1',
          text: {
            en: 'Add bromine water to the alkane first. Nothing. The bromine water stays orange, because there is no double bond for it to open.',
            zh: '先给烷烃加溴水。没有变化。溴水仍是橙色，因为没有可以打开的双键。',
          },
          action: { type: 'setParams', params: { carbons: 2, family: 0, reagent: 1 } },
        },
        {
          id: 'test-2',
          text: {
            en: 'Now the alkene. The double bond opens, a bromine atom lands on each carbon, and the orange colour disappears. Orange to colourless is the test for unsaturation, and you need both halves of that sentence to score the mark.',
            zh: '再看烯烃。双键打开，每个碳上接一个溴原子，橙色随之消失。橙色变无色就是不饱和烃的检验，两个结果都要写出来才能得分。',
          },
          action: { type: 'setParams', params: { carbons: 2, family: 1, reagent: 1 } },
          pause: 1,
        },
        {
          id: 'test-3',
          text: {
            en: 'Look at the relative molecular mass while you switch: twenty-eight to a hundred and eighty-eight. The whole Br₂ molecule went in. Nothing came off. That is what makes it an addition reaction — one reagent, one product, no leftovers.',
            zh: '切换时看相对分子质量：从 28 变到 188。整个 Br₂ 分子都进去了，什么也没脱去。这就是加成反应——一种试剂，一种产物，没有副产物。',
          },
        },
      ],
    },
    {
      id: 'addition',
      type: 'concept',
      title: { en: 'Three things that add across a C=C', zh: '三种可以加成到 C=C 上的物质' },
      lines: [
        {
          id: 'add-1',
          text: {
            en: 'Hydrogen adds across it too, over a nickel catalyst at about a hundred and fifty degrees. Look at the product — that is the alkane again. Adding hydrogen to an unsaturated molecule saturates it, which is exactly how margarine is made from vegetable oil.',
            zh: '氢气也能加成上去，用镍作催化剂、约 150 °C。看产物——又变回烷烃了。给不饱和分子加氢就是使其饱和，人造黄油正是这样由植物油制得的。',
          },
          action: { type: 'setParams', params: { carbons: 2, family: 1, reagent: 2 } },
        },
        {
          id: 'add-2',
          text: {
            en: 'Steam adds as H and OH, giving an alcohol. Ethene plus steam gives ethanol, over a catalyst at about three hundred degrees and sixty atmospheres. This is how most industrial ethanol is made.',
            zh: '水蒸气以 H 和 OH 的形式加成，生成醇。乙烯加水蒸气生成乙醇，条件是催化剂、约 300 °C、60 atm。工业乙醇大多是这样制得的。',
          },
          action: { type: 'setParams', params: { carbons: 2, family: 1, reagent: 3 } },
          pause: 1,
        },
        {
          id: 'add-3',
          text: {
            en: 'In every one of those, the double bond became a single bond and there was exactly one product. Count the product molecules in the readings — always one.',
            zh: '这三个反应中，双键都变成了单键，而且产物都只有一种。看读数里的产物分子数——始终是 1。',
          },
        },
      ],
    },
    {
      id: 'substitution',
      type: 'interaction',
      title: { en: 'What an alkane does instead', zh: '烷烃则是另一回事' },
      lines: [
        {
          id: 'sub-1',
          text: {
            en: 'Alkanes are unreactive. They burn, and apart from that they mostly sit there. But shine ultraviolet light on an alkane with chlorine and something does happen.',
            zh: '烷烃不活泼。它们能燃烧，除此之外基本上什么都不做。但如果在紫外光下让烷烃与氯气接触，就会发生反应。',
          },
          action: { type: 'setParams', params: { carbons: 1, family: 0, reagent: 4 } },
        },
        {
          id: 'sub-2',
          text: {
            en: 'A chlorine atom has taken the place of a hydrogen atom. Taken the place of — not added on. The molecule has the same number of atoms as before. That is a substitution reaction.',
            zh: '一个氯原子取代了一个氢原子。是取代，不是加成。分子中的原子总数和之前一样。这就是取代反应。',
          },
          pause: 1,
        },
        {
          id: 'sub-3',
          text: {
            en: 'And the hydrogen that was displaced has to go somewhere: it leaves as hydrogen chloride. So substitution gives two products, where addition gave one. That contrast is worth marks in itself.',
            zh: '被替换下来的氢总得有去处：它以氯化氢的形式离开。所以取代生成两种产物，而加成只生成一种。这个对比本身就是得分点。',
          },
        },
      ],
    },
    {
      id: 'cracking',
      type: 'concept',
      title: { en: 'Where alkenes come from', zh: '烯烃从哪里来' },
      lines: [
        {
          id: 'crack-1',
          text: {
            en: 'Crude oil gives us far more long-chain alkanes than anyone wants, and far fewer short ones than everyone needs. Petrol sells; bitumen sits in the tank.',
            zh: '原油中长链烷烃远多于市场所需，短链烷烃却远远不够。汽油供不应求，沥青却堆在罐里。',
          },
        },
        {
          id: 'crack-2',
          text: {
            en: 'So the long molecules are cracked: heated to about six hundred degrees over a catalyst, which breaks them into shorter ones. A ten-carbon alkane might crack into an eight-carbon alkane and ethene.',
            zh: '于是把长分子裂化：在催化剂存在下加热到约 600 °C，把它们断成较短的分子。一个十碳烷烃可能裂化成一个八碳烷烃和乙烯。',
          },
        },
        {
          id: 'crack-3',
          text: {
            en: 'Two reasons to do it, and an exam question usually wants both. It converts surplus long-chain fractions into petrol, which is in demand. And it is the source of alkenes, which are the starting point for alcohols and for every addition polymer.',
            zh: '这样做有两个原因，考题通常两个都要。一是把过剩的长链馏分转化为紧缺的汽油。二是它是烯烃的来源，而烯烃是制醇和所有加聚物的起点。',
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
            en: 'Alkane, saturated, single bonds, unreactive except burning and substitution in ultraviolet light — two products. Alkene, unsaturated, C=C, adds bromine, hydrogen and steam — one product.',
            zh: '烷烃：饱和、单键、除燃烧与紫外光下的取代外不活泼——取代生成两种产物。烯烃：不饱和、含 C=C，能与溴、氢和水蒸气加成——只生成一种产物。',
          },
        },
        {
          id: 'summary-2',
          text: {
            en: 'If a question asks you to distinguish an alkane from an alkene, bromine water is the answer every time. Say what happens with each: stays orange with the alkane, goes colourless with the alkene.',
            zh: '如果题目要求区分烷烃和烯烃，答案永远是溴水。两种情况都要写：遇烷烃保持橙色，遇烯烃变为无色。',
          },
        },
      ],
    },
  ],
}

export default alkenesNarration
