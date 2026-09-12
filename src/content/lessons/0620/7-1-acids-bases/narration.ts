import type { NarrationScript } from '@/content/types'

export const titrationNarration: NarrationScript = {
  id: '7-1-acids-bases',
  sections: [
    {
      id: 'intro',
      type: 'intro',
      title: { en: 'It is all about H⁺', zh: '一切都关乎 H⁺' },
      lines: [
        {
          id: 'intro-1',
          text: {
            en: 'Every property of an acid traces back to one thing: in solution it releases hydrogen ions. Acids react with metals to give hydrogen, with carbonates to give carbon dioxide, and with bases to give a salt and water.',
            zh: '酸的一切性质都归结于一点：它在溶液中释放氢离子。酸与金属反应生成氢气，与碳酸盐反应生成二氧化碳，与碱反应生成盐和水。',
          },
          action: {
            type: 'setParams',
            params: { acidConcentration: 0.1, alkaliConcentration: 0.1, acidVolume: 25, maxVolume: 50 },
          },
        },
        {
          id: 'intro-2',
          text: {
            en: 'Alkalis are the mirror image: they release hydroxide ions. Neutralisation is simply those two combining to make water, which is why the equation is the same whatever acid and alkali you use.',
            zh: '碱正好相反：它释放氢氧根离子。中和反应就是这两者结合生成水——这就是为什么无论用哪种酸碱，离子方程式都相同。',
          },
          latex: '\\mathrm{H^{+}(aq) + OH^{-}(aq) \\rightarrow H_2O(l)}',
        },
      ],
    },
    {
      id: 'ph',
      type: 'concept',
      title: { en: 'The pH scale', zh: 'pH 值' },
      lines: [
        {
          id: 'ph-1',
          text: {
            en: 'pH measures hydrogen ion concentration. Below seven is acidic, seven is neutral, above seven is alkaline. Each step of one on the scale is a factor of ten in concentration — pH three is ten times more acidic than pH four.',
            zh: 'pH 衡量氢离子浓度。小于七为酸性，等于七为中性，大于七为碱性。每变化一个单位，浓度相差十倍——pH 三比 pH 四酸性强十倍。',
          },
        },
        {
          id: 'ph-2',
          text: {
            en: 'The blue curve is hydrochloric acid being titrated with sodium hydroxide. It starts at pH one, barely moves for a long time, then leaps almost vertically before flattening out again.',
            zh: '蓝色曲线是用氢氧化钠滴定盐酸。它从 pH 一开始，很长一段几乎不变，随后近乎垂直地跃升，然后再次趋平。',
          },
        },
        {
          id: 'ph-3',
          text: {
            en: 'That near-vertical section is the end-point, and it is why titration works. A single drop takes you from acidic to alkaline, so an indicator changes colour sharply and you can read the volume precisely.',
            zh: '那段近乎垂直的部分就是滴定终点，也是滴定法有效的原因。一滴之差就能从酸性跨到碱性，指示剂颜色骤变，体积便可精确读出。',
          },
        },
      ],
    },
    {
      id: 'strong-weak',
      type: 'interaction',
      title: { en: 'Strong is not concentrated', zh: '"强"不等于"浓"' },
      lines: [
        {
          id: 'sw-1',
          text: {
            en: 'Now the orange curve — ethanoic acid, at exactly the same concentration. It starts at pH three, not pH one. Same number of acid molecules in the flask, very different pH.',
            zh: '现在看橙色曲线——乙酸，浓度完全相同。它从 pH 三开始，而不是 pH 一。烧瓶里酸分子数目相同，pH 却大不相同。',
          },
        },
        {
          id: 'sw-2',
          text: {
            en: 'That is the difference between strong and weak. A strong acid is fully dissociated — every molecule gives up its proton. A weak acid is only partly dissociated, so most molecules stay intact and far fewer hydrogen ions are released.',
            zh: '这就是强酸与弱酸的区别。强酸完全电离——每个分子都释放质子。弱酸只部分电离，大多数分子保持完整，释放的氢离子少得多。',
          },
        },
        {
          id: 'sw-3',
          text: {
            en: 'Be careful with the words. Strong and weak describe how completely an acid dissociates. Concentrated and dilute describe how much acid is in a given volume. A concentrated weak acid is perfectly possible.',
            zh: '注意用词。强和弱描述电离的完全程度；浓和稀描述一定体积中酸的多少。浓的弱酸完全可能存在。',
          },
        },
      ],
    },
    {
      id: 'curves',
      type: 'concept',
      title: { en: 'Two clues in the curves', zh: '曲线中的两条线索' },
      lines: [
        {
          id: 'cur-1',
          text: {
            en: 'Compare the two curves and there are two more differences. First, the weak acid ends up at an equivalence point above pH seven, not exactly at seven — because the salt it forms is slightly alkaline.',
            zh: '对比两条曲线还有两点不同。第一，弱酸的等当点在 pH 七以上，而不是正好七——因为它生成的盐略呈碱性。',
          },
        },
        {
          id: 'cur-2',
          text: {
            en: 'Second, the vertical jump is shorter for the weak acid. That matters practically: it limits which indicators will work, because the indicator must change colour inside that jump.',
            zh: '第二，弱酸的垂直跃升更短。这在实践中很重要：它限制了可用的指示剂，因为指示剂必须在这段跃升范围内变色。',
          },
        },
        {
          id: 'cur-3',
          text: {
            en: 'Now double the concentration of the alkali in the burette. The equivalence point halves — you need only half as much to neutralise the same acid.',
            zh: '现在把滴定管中碱的浓度加倍。等当点体积减半——中和同样的酸只需一半的量。',
          },
          action: {
            type: 'setParams',
            params: { acidConcentration: 0.1, alkaliConcentration: 0.2, acidVolume: 25, maxVolume: 50 },
          },
          pause: 1,
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
            en: 'Acids give H⁺, alkalis give OH⁻, and neutralisation combines them into water. Never confuse strong with concentrated. And on a pH curve, the sharp vertical section is the end-point — that is where the indicator has to change.',
            zh: '酸给出 H⁺，碱给出 OH⁻，中和把它们结合成水。切勿把"强"与"浓"混为一谈。在 pH 曲线上，陡直的那一段就是终点——指示剂必须在那里变色。',
          },
        },
      ],
    },
  ],
}

export default titrationNarration
