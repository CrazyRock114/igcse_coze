import type { NarrationScript } from '@/content/types'

export const bondingNarration: NarrationScript = {
  id: '2-4-bonding',
  sections: [
    {
      id: 'intro',
      type: 'intro',
      title: { en: 'Two ways to fill an outer shell', zh: '填满最外层的两种办法' },
      lines: [
        {
          id: 'intro-1',
          text: {
            en: 'Almost all of chemistry comes down to one thing: atoms want a full outer shell. There are only two ways to get one. Hand electrons over, or share them. Which one happens depends entirely on who is involved.',
            zh: '几乎全部化学都归结为一件事：原子想要填满最外层。而办法只有两种——把电子交出去，或者共用。发生哪一种，完全取决于参与的是谁。',
          },
          action: { type: 'setParams', params: { species: 0, bonded: 0 } },
        },
        {
          id: 'intro-2',
          text: {
            en: 'Sodium and chlorine, before anything happens. Sodium has one outer electron drawn as a cross; chlorine has seven, drawn as dots. Sodium needs to lose one, chlorine needs to gain one. You can see the deal from here.',
            zh: '这是钠和氯发生反应之前。钠最外层有一个电子，画成叉；氯有七个，画成点。钠需要失去一个，氯需要得到一个。这笔交易一目了然。',
          },
        },
      ],
    },
    {
      id: 'ionic',
      type: 'interaction',
      title: { en: 'Transfer: ionic bonding', zh: '转移：离子键' },
      lines: [
        {
          id: 'ionic-1',
          text: {
            en: 'Now let them react. Sodium’s cross has moved into chlorine’s shell. That is the only thing that happened — one electron changed address.',
            zh: '现在让它们反应。钠的那个叉移进了氯的电子层。整个过程只发生了这一件事——一个电子换了地方。',
          },
          action: { type: 'setParams', params: { species: 0, bonded: 1 } },
          pause: 1,
        },
        {
          id: 'ionic-2',
          text: {
            en: 'Look at what it cost them. Sodium has eleven protons but now only ten electrons, so it is one plus. Chlorine has one extra electron, so it is one minus. Both are in square brackets with their charge outside — draw it that way or you lose the mark.',
            zh: '看看代价是什么。钠有 11 个质子但现在只有 10 个电子，所以带一个正电荷。氯多了一个电子，带一个负电荷。两者都写在方括号里、电荷标在外面——必须这样画，否则要丢分。',
          },
        },
        {
          id: 'ionic-3',
          text: {
            en: 'And the bond itself? There is no bond drawn between them, because an ionic bond is not a line. It is the electrostatic attraction between a positive ion and a negative ion. Opposite charges pull. That is all it is.',
            zh: '那么键本身呢？图上并没有画出连接它们的线，因为离子键不是一根线。它是正离子与负离子之间的静电引力。异号电荷相互吸引，仅此而已。',
          },
        },
        {
          id: 'ionic-4',
          text: {
            en: 'Magnesium has two outer electrons and gives away both, so it becomes two plus. Watch where the two crosses go with magnesium chloride: one into each of two chlorine atoms, because each chlorine only has room for one.',
            zh: '镁最外层有两个电子，两个都会给出去，所以变成 2+。看氯化镁中两个叉的去向：分别进入两个氯原子，因为每个氯只有一个空位。',
          },
          action: { type: 'setParams', params: { species: 2, bonded: 1 } },
          pause: 1,
        },
        {
          id: 'ionic-5',
          text: {
            en: 'That is why the formula is MgCl₂ and not MgCl. The formula of an ionic compound is not something to memorise — it falls out of the charges balancing.',
            zh: '这就是化学式为 MgCl₂ 而不是 MgCl 的原因。离子化合物的化学式不需要死记——它是由电荷平衡自然得出的。',
          },
        },
      ],
    },
    {
      id: 'covalent',
      type: 'interaction',
      title: { en: 'Sharing: covalent bonding', zh: '共用：共价键' },
      lines: [
        {
          id: 'cov-1',
          text: {
            en: 'Two chlorine atoms, or two hydrogens, or a carbon and four hydrogens — all non-metals. Nobody is going to hand over an electron here, because neither side wants to lose one. So instead they share.',
            zh: '两个氯原子，或两个氢原子，或一个碳和四个氢——都是非金属。这里谁也不会把电子交出去，因为双方都不想失去电子。于是它们改为共用。',
          },
          action: { type: 'setParams', params: { species: 5, bonded: 0 } },
        },
        {
          id: 'cov-2',
          text: {
            en: 'Water. The circles now overlap, and in each overlap sits one dot and one cross — a shared pair. A covalent bond *is* a shared pair of electrons. Nothing more.',
            zh: '水。两个圆现在重叠了，每个重叠区里有一个点和一个叉——这就是一对共用电子。共价键*就是*一对共用电子，没有别的。',
          },
          action: { type: 'setParams', params: { species: 5, bonded: 1 } },
          pause: 1,
        },
        {
          id: 'cov-3',
          text: {
            en: 'Here is the trick that makes it work. Count oxygen’s electrons: four of its own, plus both electrons in each shared pair. Eight. Now count a hydrogen’s: both electrons in its shared pair. Two. The same electrons got counted twice, and everybody is satisfied.',
            zh: '这里有个让它成立的窍门。数一数氧的电子：自己的四个，加上每对共用电子中的两个，共八个。再数氢的：它那对共用电子中的两个，共两个。同一批电子被数了两次，而所有原子都满足了。',
          },
        },
        {
          id: 'cov-4',
          text: {
            en: 'Methane. Carbon has four outer electrons and four hydrogens to bond with, so four shared pairs and nothing left over. Ammonia has three bonds and one pair left on the nitrogen — that leftover pair is called a lone pair, and it must still be drawn.',
            zh: '甲烷。碳最外层有四个电子，正好与四个氢成键，所以有四对共用电子，一个不剩。氨有三根键，氮上还剩一对——这对叫孤对电子，仍然必须画出来。',
          },
          action: { type: 'setParams', params: { species: 7, bonded: 1 } },
        },
        {
          id: 'cov-5',
          text: {
            en: 'And when one shared pair is not enough, atoms share two pairs, or three. Oxygen shares two — a double bond. Nitrogen shares three, which is why nitrogen gas is so unreactive: breaking three bonds at once is expensive.',
            zh: '当一对共用电子不够时，原子会共用两对甚至三对。氧共用两对——双键。氮共用三对，这就是氮气极不活泼的原因：一次断开三根键的代价太高了。',
          },
          action: { type: 'setParams', params: { species: 10, bonded: 1 } },
          pause: 1,
        },
      ],
    },
    {
      id: 'properties',
      type: 'concept',
      title: { en: 'Why this changes everything', zh: '这为什么改变了一切' },
      lines: [
        {
          id: 'prop-1',
          text: {
            en: 'Sodium chloride is not two ions. It is billions of them, stacked in a giant lattice, every positive one surrounded by negatives. To melt it you must break all those attractions at once, which is why it melts at eight hundred degrees.',
            zh: '氯化钠不是两个离子，而是数以亿计的离子堆积成的巨型晶格，每个正离子都被负离子包围。要熔化它就必须同时破坏所有这些引力，所以它的熔点高达 800 °C。',
          },
        },
        {
          id: 'prop-2',
          text: {
            en: 'And it conducts electricity — but only when molten or dissolved. Solid, the ions are locked in place and nothing can move. Melt it and the ions are free to carry charge. That distinction is worth marks on its own.',
            zh: '它能导电——但只在熔融或溶解时。固态时离子被固定，什么也动不了。熔化后离子就能自由移动、携带电荷。这个区别本身就是得分点。',
          },
        },
        {
          id: 'prop-3',
          text: {
            en: 'Water is the opposite. The bonds inside each molecule are strong, but the forces *between* separate molecules are weak. Boiling water does not break a single O–H bond — it only pulls the molecules apart. That is why simple molecular substances have low melting and boiling points.',
            zh: '水正相反。每个分子内部的键很强，但分子*之间*的作用力很弱。把水烧开并不会断裂任何一根 O–H 键——只是把分子彼此拉开。这就是简单分子物质熔沸点低的原因。',
          },
        },
        {
          id: 'prop-4',
          text: {
            en: 'And with no ions and no free electrons, there is nothing to carry a current. Simple molecular substances do not conduct, in any state.',
            zh: '而且既没有离子也没有自由电子，就没有东西能传导电流。简单分子物质在任何状态下都不导电。',
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
            en: 'Metal plus non-metal, electrons transferred, ions formed, ionic bonding. Non-metal plus non-metal, electrons shared, molecules formed, covalent bonding. Get that first sort right and the rest follows.',
            zh: '金属加非金属，电子转移，形成离子，是离子键。非金属加非金属，电子共用，形成分子，是共价键。先把这个判断做对，其余都会顺理成章。',
          },
        },
        {
          id: 'summary-2',
          text: {
            en: 'When you draw one: outer shells only, dots for one atom and crosses for the other, brackets and charges on ions, and every lone pair still shown. Examiners count the electrons.',
            zh: '画图时：只画最外层，一个原子用点、另一个用叉，离子要加方括号和电荷，孤对电子也必须画出。考官会数电子。',
          },
        },
      ],
    },
  ],
}

export default bondingNarration
