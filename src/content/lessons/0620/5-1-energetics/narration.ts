import type { NarrationScript } from '@/content/types'

export const energeticsNarration: NarrationScript = {
  id: '5-1-energetics',
  sections: [
    {
      id: 'intro',
      type: 'intro',
      title: { en: 'Every reaction is a transaction', zh: '每个反应都是一笔交易' },
      lines: [
        {
          id: 'intro-1',
          text: {
            en: 'Two things happen in every chemical reaction. Old bonds break, and new bonds form. Breaking a bond always costs energy — you are pulling apart atoms that are attracting each other. Making a bond always releases it.',
            zh: '每个化学反应中都发生两件事：旧键断裂、新键形成。断键总是要消耗能量——你在把相互吸引的原子拉开。而成键总是放出能量。',
          },
          action: { type: 'setParams', params: { reaction: 0, activationEnergy: 250 } },
        },
        {
          id: 'intro-2',
          text: {
            en: 'So whether a reaction warms its surroundings or cools them is just bookkeeping. Compare what you paid to break the bonds with what you got back from making them. Nothing more.',
            zh: '所以反应是让周围变暖还是变冷，只是一笔账。把断键付出的与成键收回的作比较，仅此而已。',
          },
        },
        {
          id: 'intro-3',
          text: {
            en: 'Hydrogen plus chlorine. Breaking one H–H and one Cl–Cl costs six hundred and seventy-eight. Making two H–Cl bonds gives back eight hundred and sixty-two. You got more back than you paid, so the surplus leaves as heat. Exothermic.',
            zh: '氢气加氯气。断开一根 H–H 和一根 Cl–Cl 要付出 678，生成两根 H–Cl 键收回 862。收回的比付出的多，多余的部分以热的形式放出。这就是放热。',
          },
        },
      ],
    },
    {
      id: 'sign',
      type: 'concept',
      title: { en: 'Why exothermic is negative', zh: '为什么放热是负值' },
      lines: [
        {
          id: 'sign-1',
          text: {
            en: 'ΔH is minus one hundred and eighty-four. Students find that sign backwards, because the room got *warmer* — so why is it negative?',
            zh: 'ΔH 是 −184。学生常觉得这个符号反了，因为房间变*暖*了——为什么是负的？',
          },
        },
        {
          id: 'sign-2',
          text: {
            en: 'Because ΔH is measured from the chemicals, not the room. The chemicals lost that energy; they gave it away. Energy out of the reaction is negative, and it turned up in the surroundings, which is why the thermometer went up.',
            zh: '因为 ΔH 是从化学物质的角度、而不是从房间的角度衡量的。是化学物质失去了这部分能量，把它送了出去。能量流出反应体系记为负，而它出现在周围环境中，所以温度计读数上升。',
          },
        },
        {
          id: 'sign-3',
          text: {
            en: 'Now switch to nitrogen plus oxygen. Nine hundred and forty-five to break the triple bond, four hundred and ninety-six for the oxygen — and you only get twelve hundred and sixty-two back. You are down by a hundred and seventy-nine.',
            zh: '现在切换到氮气加氧气。断三键要 945，断氧氧双键要 496——而收回的只有 1262，净亏 179。',
          },
          action: { type: 'setParams', params: { reaction: 3, activationEnergy: 250 } },
          pause: 1,
        },
        {
          id: 'sign-4',
          text: {
            en: 'ΔH is positive, and look at the diagram — the products sit above the reactants now. This reaction has to take energy in from somewhere. Endothermic. It does not happen in the air around you, but it does inside a car engine, and that is where the nitrogen oxides in exhaust come from.',
            zh: 'ΔH 是正的，再看图——产物现在高于反应物。这个反应必须从别处吸收能量。这就是吸热。它不会在你周围的空气中发生，但在汽车发动机内会，尾气中的氮氧化物正源于此。',
          },
        },
      ],
    },
    {
      id: 'diagram',
      type: 'interaction',
      title: { en: 'Reading the diagram', zh: '读懂能量图' },
      lines: [
        {
          id: 'diag-1',
          text: {
            en: 'The diagram has three things on it and you should be able to point to all three. The reactant level on the left. The product level on the right. And the hump in between.',
            zh: '图上有三样东西，你应该都能指出来：左边的反应物能级、右边的产物能级，以及中间的那个"山峰"。',
          },
          action: { type: 'setParams', params: { reaction: 1, activationEnergy: 250 } },
        },
        {
          id: 'diag-2',
          text: {
            en: 'The gap between the two levels is ΔH. Products below reactants means exothermic — burning methane drops eight hundred and twenty-two, which is why a gas hob works.',
            zh: '两个能级之间的差距就是 ΔH。产物低于反应物即为放热——甲烷燃烧下降 822，燃气灶正是靠这个工作的。',
          },
        },
        {
          id: 'diag-3',
          text: {
            en: 'The hump is the activation energy: the minimum energy a collision needs before anything can happen at all. Measured from the reactants, not from the products, and not from the bottom of the graph.',
            zh: '那个山峰是活化能：碰撞要引发反应所需的最小能量。它从反应物量起，不是从产物量起，也不是从图的底部量起。',
          },
        },
        {
          id: 'diag-4',
          text: {
            en: 'Now drag the activation energy down and watch carefully. The hump shrinks. The two levels do not move. ΔH is unchanged.',
            zh: '现在把活化能拖低，仔细看。山峰变矮了，但两个能级纹丝不动。ΔH 没有变。',
          },
          action: { type: 'setParams', params: { reaction: 1, activationEnergy: 60 } },
          pause: 1,
        },
        {
          id: 'diag-5',
          text: {
            en: 'That is exactly what a catalyst does. It gives the reaction an easier route over the barrier, so it goes faster. It does not make the reaction release more energy, and it cannot turn an endothermic reaction into an exothermic one.',
            zh: '这正是催化剂的作用。它为反应提供一条更容易越过障碍的路径，使反应更快。它不会让反应放出更多能量，也不可能把吸热反应变成放热反应。',
          },
        },
      ],
    },
    {
      id: 'calculating',
      type: 'concept',
      title: { en: 'Doing the calculation', zh: '做这个计算' },
      lines: [
        {
          id: 'calc-1',
          text: {
            en: 'Three steps, always the same. Add up the bond energies of everything that breaks. Add up the bond energies of everything that forms. Subtract the second from the first. That order — broken minus made — gives you the sign for free.',
            zh: '三步，永远一样。把所有断裂的键的键能加起来。把所有形成的键的键能加起来。用前者减后者。这个顺序——断键减成键——会自动给出正确的符号。',
          },
          action: { type: 'setParams', params: { reaction: 4, activationEnergy: 200 } },
        },
        {
          id: 'calc-2',
          text: {
            en: 'And one thing that catches people out: only count the bonds that actually change. Hydrogenating ethene breaks the C=C and the H–H, and nothing else. Ethene’s four C–H bonds are still there in ethane, untouched, so they appear on neither side.',
            zh: '有一点容易出错：只计算真正发生变化的键。乙烯加氢只断 C=C 和 H–H，别无其他。乙烯原有的四根 C–H 键在乙烷中依然存在、毫发无损，所以两边都不出现它们。',
          },
        },
        {
          id: 'calc-3',
          text: {
            en: 'One honest caveat. These are *mean* bond energies, averaged over many compounds, so a calculated ΔH lands near the measured value rather than on it. Methane comes out at minus eight hundred and twenty-two here; measured, it is about minus eight hundred and ninety. Close, and close is what the method promises.',
            zh: '要坦白一点：这些是*平均*键能，是在许多化合物上取的平均值，所以算出的 ΔH 接近实测值但不等于它。这里甲烷算得 −822，而实测约为 −890。接近——而"接近"正是这个方法所能承诺的。',
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
            en: 'Bond breaking takes energy in; bond making gives it out. ΔH is bonds broken minus bonds made. Negative is exothermic, products below reactants, surroundings get warmer.',
            zh: '断键吸热，成键放热。ΔH = 断键能量 − 成键能量。负值表示放热，产物低于反应物，周围环境变暖。',
          },
        },
        {
          id: 'summary-2',
          text: {
            en: 'When you draw the diagram, label all three: reactants, products and the activation energy arrow from the reactant level up to the peak. An unlabelled curve is not a reaction pathway diagram.',
            zh: '画图时三样都要标注：反应物、产物，以及从反应物能级指向峰顶的活化能箭头。没有标注的曲线不算能量变化图。',
          },
        },
      ],
    },
  ],
}

export default energeticsNarration
