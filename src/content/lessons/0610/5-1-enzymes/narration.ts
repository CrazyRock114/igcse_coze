import type { NarrationScript } from '@/content/types'

export const enzymeNarration: NarrationScript = {
  id: '5-1-enzymes',
  sections: [
    {
      id: 'intro',
      type: 'intro',
      title: { en: 'Why life needs catalysts', zh: '生命为什么需要催化剂' },
      lines: [
        {
          id: 'intro-1',
          text: {
            en: 'Every reaction in your body would happen eventually without help. The problem is "eventually". Digesting a meal without enzymes would take years, and you would starve long before it finished.',
            zh: '你体内的每一个反应，没有帮助最终也会发生。问题在于"最终"。没有酶，消化一顿饭要花上几年，而你在那之前早就饿死了。',
          },
          action: { type: 'setParams', params: { enzyme: 1, temperature: 37, ph: 7 } },
        },
        {
          id: 'intro-2',
          text: {
            en: 'A catalyst speeds a reaction up without being used up itself — so one molecule can do the job over and over. Enzymes are proteins that act as biological catalysts, and there is one for every reaction your cells carry out.',
            zh: '催化剂能加快反应而自身不被消耗——所以一个分子可以反复做同一件事。酶是充当生物催化剂的蛋白质，细胞进行的每一个反应都有对应的酶。',
          },
        },
        {
          id: 'intro-3',
          text: {
            en: 'Being a protein is the key to all of it. A protein is a long chain folded into one particular shape, and part of that shape is a pocket called the active site. Only a molecule that fits the pocket can react there.',
            zh: '"是蛋白质"这一点解释了全部。蛋白质是折叠成特定形状的长链，其中有一处凹陷叫活性位点。只有形状与之契合的分子才能在那里反应。',
          },
        },
      ],
    },
    {
      id: 'specificity',
      type: 'concept',
      title: { en: 'One enzyme, one job', zh: '一种酶，一件事' },
      lines: [
        {
          id: 'spec-1',
          text: {
            en: 'The substrate fits the active site the way a key fits a lock. They come together as an enzyme–substrate complex, the reaction happens, the products leave, and the enzyme is unchanged and ready for the next one.',
            zh: '底物与活性位点的契合就像钥匙配锁。二者结合形成酶—底物复合物，反应发生，产物离开，而酶毫无变化，随时准备接待下一个底物。',
          },
        },
        {
          id: 'spec-2',
          text: {
            en: 'And because the fit has to be exact, each enzyme works on one substrate and no other. Amylase breaks down starch and will not touch protein. That is what specificity means, and it is entirely a consequence of shape.',
            zh: '正因为必须精确契合，每种酶只作用于一种底物。淀粉酶分解淀粉，对蛋白质完全不起作用。这就是专一性，而它完全是形状带来的结果。',
          },
        },
        {
          id: 'spec-3',
          text: {
            en: 'Keep hold of that. Everything else in this topic is about what happens when the shape is disturbed.',
            zh: '记住这一点。本主题其余全部内容，讲的都是形状被破坏之后会发生什么。',
          },
        },
      ],
    },
    {
      id: 'temperature',
      type: 'interaction',
      title: { en: 'The temperature curve is not a bell', zh: '温度曲线不是钟形' },
      lines: [
        {
          id: 'temp-1',
          text: {
            en: 'Start cold and warm the enzyme up. The rate climbs steadily — roughly doubling for every ten degrees, because the molecules move faster, collide more often, and collide harder.',
            zh: '从低温开始给酶加热。速率稳步上升——每升高 10 °C 大约翻一倍，因为分子运动更快、碰撞更频繁、碰撞也更有力。',
          },
          action: { type: 'setParams', params: { enzyme: 1, temperature: 10, ph: 7 } },
        },
        {
          id: 'temp-2',
          text: {
            en: 'At thirty-seven degrees it peaks. That is the optimum temperature — not because thirty-seven is special, but because that is the temperature our bodies run at.',
            zh: '在 37 °C 达到峰值。这就是最适温度——不是因为 37 有什么特别，而是因为我们的身体就在这个温度下运转。',
          },
          action: { type: 'setParams', params: { enzyme: 1, temperature: 37, ph: 7 } },
          pause: 1,
        },
        {
          id: 'temp-3',
          text: {
            en: 'Now push past it. Look at how fast it falls. Not a gentle decline mirroring the rise — a collapse. By fifty-five degrees there is almost nothing left.',
            zh: '现在继续升温。看它下降得多快。这不是与上升对称的缓慢回落——而是崩塌。到 55 °C 时几乎什么都不剩了。',
          },
          action: { type: 'setParams', params: { enzyme: 1, temperature: 55, ph: 7 } },
        },
        {
          id: 'temp-4',
          text: {
            en: 'Because the two sides are different processes. Going up, you are speeding up collisions. Coming down, the bonds holding the protein in shape are breaking, and the active site is no longer complementary to the substrate. The enzyme is denatured.',
            zh: '因为两侧是不同的过程。上升时，你在加快碰撞；下降时，维持蛋白质形状的化学键正在断裂，活性位点不再与底物互补。酶变性了。',
          },
        },
        {
          id: 'temp-5',
          text: {
            en: 'And denaturation does not reverse. Cool a boiled egg and it does not go runny again. That asymmetry is what an examiner looks for in your sketch — a gentle rise, a sharp fall, and no going back.',
            zh: '而且变性不可逆。把煮熟的鸡蛋冷却，它不会重新变回液态。考官在你画的草图中要找的正是这种不对称——缓升、陡降、且不可恢复。',
          },
        },
      ],
    },
    {
      id: 'ph',
      type: 'interaction',
      title: { en: 'The pH curve is a bell', zh: 'pH 曲线才是钟形' },
      lines: [
        {
          id: 'ph-1',
          text: {
            en: 'pH behaves differently — this one really is symmetric. Too acidic and too alkaline are equally bad, because both disrupt the charges holding the active site in shape, in the same way.',
            zh: 'pH 的表现不同——这条曲线确实是对称的。过酸和过碱同样糟糕，因为两者都以相同的方式破坏了维持活性位点形状的电荷。',
          },
          action: { type: 'setParams', params: { enzyme: 1, temperature: 37, ph: 7 } },
        },
        {
          id: 'ph-2',
          text: {
            en: 'Amylase peaks at neutral, in the mouth. Now switch to pepsin, which works in the stomach — its peak is at pH two, in acid strong enough to destroy most proteins.',
            zh: '淀粉酶在中性时活性最高，位于口腔。现在换成胃蛋白酶，它在胃里工作——峰值在 pH 2，那里的酸强到足以破坏大多数蛋白质。',
          },
          action: { type: 'setParams', params: { enzyme: 0, temperature: 37, ph: 2 } },
          pause: 1,
        },
        {
          id: 'ph-3',
          text: {
            en: 'Watch what happens if you put pepsin at neutral pH. Not just the pH curve — the whole temperature curve shrinks to almost nothing, because the two factors multiply. Optimum temperature is no use at the wrong pH.',
            zh: '看看把胃蛋白酶放在中性 pH 会怎样。不只是 pH 曲线——整条温度曲线都缩得几乎为零，因为两个因素是相乘的。pH 不对时，最适温度毫无用处。',
          },
          action: { type: 'setParams', params: { enzyme: 0, temperature: 37, ph: 7 } },
        },
        {
          id: 'ph-4',
          text: {
            en: 'And that is why swallowing stops salivary amylase almost at once. It is not that the mouth was doing something clever — the stomach is simply at a pH where amylase cannot work.',
            zh: '这也是唾液淀粉酶在吞咽后几乎立刻停止工作的原因。并不是口腔做了什么高明的事——只是胃的 pH 让淀粉酶无法工作。',
          },
        },
      ],
    },
    {
      id: 'optimum',
      type: 'concept',
      title: { en: 'Optimum is not a universal number', zh: '最适值不是普适常数' },
      lines: [
        {
          id: 'opt-1',
          text: {
            en: 'It is easy to come away thinking enzymes optimise at thirty-seven degrees and neutral pH. They do not. They optimise wherever the organism lives and wherever in it they work.',
            zh: '很容易以为酶的最适条件就是 37 °C 和中性 pH。并非如此。酶的最适条件取决于生物所处的环境，以及它在体内工作的部位。',
          },
          action: { type: 'setParams', params: { enzyme: 3, temperature: 70, ph: 7 } },
        },
        {
          id: 'opt-2',
          text: {
            en: 'This one comes from bacteria living in a hot spring, near boiling. Its optimum is seventy degrees — a temperature that would have destroyed amylase twenty degrees ago.',
            zh: '这一种来自生活在近沸温泉中的细菌，最适温度是 70 °C——而淀粉酶在低于此 20 °C 时就已经被破坏了。',
          },
        },
        {
          id: 'opt-3',
          text: {
            en: 'Same chemistry, same lock-and-key, same denaturation. Only the number differs, because the protein folded differently to suit different conditions.',
            zh: '化学原理相同、锁钥模型相同、变性机制相同。不同的只是数值，因为蛋白质折叠方式不同，以适应不同的环境。',
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
            en: 'Enzymes are proteins acting as biological catalysts. Their active site is complementary to one substrate, which is where specificity comes from. Anything that changes that shape stops them working.',
            zh: '酶是充当生物催化剂的蛋白质。活性位点与某一种底物互补，专一性由此而来。任何改变这一形状的因素都会使酶停止工作。',
          },
        },
        {
          id: 'summary-2',
          text: {
            en: 'When you sketch the temperature curve, make the rise gradual and the fall steep. When you explain it, give a different reason for each side: kinetic energy going up, denaturation coming down. One reason for both sides loses the mark.',
            zh: '画温度曲线时，上升要缓、下降要陡。解释时两侧要给出不同的原因：上升是动能增加，下降是变性。两侧用同一个原因会丢分。',
          },
        },
      ],
    },
  ],
}

export default enzymeNarration
