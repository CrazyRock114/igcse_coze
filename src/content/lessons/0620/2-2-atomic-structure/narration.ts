import type { NarrationScript } from '@/content/types'

export const atomNarration: NarrationScript = {
  id: '2-2-atomic-structure',
  sections: [
    {
      id: 'intro',
      type: 'intro',
      title: { en: 'Three particles, three jobs', zh: '三种粒子，三种角色' },
      lines: [
        {
          id: 'intro-1',
          text: {
            en: 'An atom is a tiny dense nucleus of protons and neutrons, surrounded by electrons in shells. Protons are positive, electrons negative, neutrons neutral — and a neutral atom has equal numbers of protons and electrons.',
            zh: '原子由质子和中子构成的微小而致密的原子核，以及分布在壳层中的电子组成。质子带正电、电子带负电、中子不带电——中性原子中质子数与电子数相等。',
          },
          action: { type: 'setParams', params: { protonNumber: 11, extraNeutrons: 0, charge: 0 } },
        },
        {
          id: 'intro-2',
          text: {
            en: 'The proton number defines which element it is. Eleven protons is sodium, and nothing can change that without changing the element itself.',
            zh: '质子数决定它是哪种元素。十一个质子就是钠，除非改变质子数，否则元素不会变。',
          },
        },
      ],
    },
    {
      id: 'shells',
      type: 'concept',
      title: { en: 'Filling the shells', zh: '电子排布' },
      lines: [
        {
          id: 'shell-1',
          text: {
            en: 'Electrons fill the shells from the inside out: two in the first, then eight, then eight. Sodium has eleven electrons, so two, eight, one. Write it exactly like that — two, comma, eight, comma, one.',
            zh: '电子从内向外填充：第一层两个，然后八个，再八个。钠有十一个电子，所以是 2,8,1。就这样写——2、逗号、8、逗号、1。',
          },
        },
        {
          id: 'shell-2',
          text: {
            en: 'That last number, the outer shell, does almost all the chemistry. It gives you the group number straight away: one outer electron means Group One. And the number of shells gives the period.',
            zh: '最后那个数字，也就是最外层电子数，几乎决定了全部化学性质。它直接给出族数：最外层一个电子就是第 I 主族。而壳层数给出周期数。',
          },
        },
        {
          id: 'shell-3',
          text: {
            en: 'Switch to argon. Eighteen electrons, two, eight, eight — a full outer shell. That is why the noble gases barely react: there is nothing to gain by losing or gaining electrons.',
            zh: '切换到氩。十八个电子，2,8,8——最外层已满。这就是稀有气体几乎不反应的原因：失去或得到电子都无利可图。',
          },
          action: { type: 'setParams', params: { protonNumber: 18, extraNeutrons: 0, charge: 0 } },
          pause: 1,
        },
      ],
    },
    {
      id: 'isotopes',
      type: 'interaction',
      title: { en: 'Change the neutrons', zh: '改变中子数' },
      lines: [
        {
          id: 'iso-1',
          text: {
            en: 'Now carbon, with six protons and six neutrons — carbon twelve. Watch the mass number as I add neutrons, and watch what does *not* change.',
            zh: '现在看碳，六个质子六个中子——碳十二。注意我增加中子时质量数的变化，也注意什么*没有*变。',
          },
          action: { type: 'setParams', params: { protonNumber: 6, extraNeutrons: 0, charge: 0 } },
        },
        {
          id: 'iso-2',
          text: {
            en: 'Carbon fourteen. The mass number rose by two but the electron diagram is untouched. Same protons, same electrons, same outer shell — so identical chemical properties. These are isotopes.',
            zh: '碳十四。质量数增加了二，但电子排布毫无变化。质子相同、电子相同、最外层相同——所以化学性质完全一样。这就是同位素。',
          },
          action: { type: 'setParams', params: { protonNumber: 6, extraNeutrons: 2, charge: 0 } },
        },
        {
          id: 'iso-3',
          text: {
            en: 'That is why relative atomic mass is rarely a whole number. Chlorine is thirty-five point five because a real sample is a mixture of chlorine thirty-five and chlorine thirty-seven — it is a weighted average, not a count.',
            zh: '这就是相对原子质量往往不是整数的原因。氯是 35.5，因为真实样品是氯 35 与氯 37 的混合——它是加权平均值，而不是某一个数。',
          },
        },
      ],
    },
    {
      id: 'ions',
      type: 'interaction',
      title: { en: 'Change the electrons', zh: '改变电子数' },
      lines: [
        {
          id: 'ion-1',
          text: {
            en: 'Back to sodium. It has one lonely outer electron. Lose it, and what remains has a full outer shell of eight — much more stable.',
            zh: '回到钠。它最外层只有一个孤零零的电子。失去它，剩下的最外层就有完整的八个电子——稳定得多。',
          },
          action: { type: 'setParams', params: { protonNumber: 11, extraNeutrons: 0, charge: 0 } },
        },
        {
          id: 'ion-2',
          text: {
            en: 'There it is. Eleven protons but only ten electrons, so an overall charge of one plus. The nucleus has not changed at all — it is still sodium, just a sodium ion.',
            zh: '就是它。十一个质子却只有十个电子，所以整体带一个正电荷。原子核完全没变——它仍是钠，只是钠离子。',
          },
          action: { type: 'setParams', params: { protonNumber: 11, extraNeutrons: 0, charge: 1 } },
          pause: 1,
        },
        {
          id: 'ion-3',
          text: {
            en: 'Non-metals do the opposite. Chlorine has seven outer electrons, so gaining one is easier than losing seven. It becomes a chloride ion with a single negative charge.',
            zh: '非金属正相反。氯最外层有七个电子，得到一个比失去七个容易得多。它变成带一个负电荷的氯离子。',
          },
          action: { type: 'setParams', params: { protonNumber: 17, extraNeutrons: 0, charge: -1 } },
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
            en: 'Protons decide the element, neutrons decide the isotope, electrons decide the charge and the chemistry. Mass number is protons plus neutrons — never include the electrons, they weigh almost nothing.',
            zh: '质子决定元素，中子决定同位素，电子决定电荷和化学性质。质量数是质子加中子——绝不要算上电子，它们的质量几乎可以忽略。',
          },
        },
      ],
    },
  ],
}

export default atomNarration
