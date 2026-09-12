import type { NarrationScript } from '@/content/types'

export const transportNarration: NarrationScript = {
  id: '3-1-transport',
  sections: [
    {
      id: 'intro',
      type: 'intro',
      title: { en: 'Two ways across a membrane', zh: '穿过细胞膜的两条路' },
      lines: [
        {
          id: 'intro-1',
          text: {
            en: 'A cell has to get things in and push things out, and it has two methods for doing it. They look similar from outside — something ends up on the other side of the membrane — but they work on completely different principles.',
            zh: '细胞必须把东西运进来、把东西排出去，为此有两种方法。从外面看它们很像——总之有东西到了膜的另一侧——但原理完全不同。',
          },
          action: { type: 'setParams', params: { gradient: 60, temperature: 37, surfaceArea: 1 } },
        },
        {
          id: 'intro-2',
          text: {
            en: 'The fastest way to tell them apart is to plot both against the same two things and look for where they disagree. Start with the concentration gradient.',
            zh: '区分它们最快的办法，是把两者对同样的两个变量作图，看它们在哪里出现分歧。先看浓度梯度。',
          },
        },
      ],
    },
    {
      id: 'gradient',
      type: 'interaction',
      title: { en: 'The gradient graph', zh: '浓度梯度图' },
      lines: [
        {
          id: 'grad-1',
          text: {
            en: 'Diffusion is a straight line through the origin. Steepen the gradient and it goes faster, in proportion. That is because nothing is pushing — particles are simply moving randomly, and there happen to be more of them on one side than the other.',
            zh: '扩散是一条过原点的直线。梯度越陡，速率成正比增大。因为并没有什么在推动它——粒子只是随机运动，只不过一侧的粒子恰好比另一侧多。',
          },
        },
        {
          id: 'grad-2',
          text: {
            en: 'Now take the gradient to zero. Diffusion stops. Not slows — stops. Particles are still moving as fast as ever; it is just that as many now cross one way as the other. Net movement is what diffusion means, and there is none.',
            zh: '现在把梯度降到零。扩散停止了。不是变慢——是停止。粒子的运动一点没变慢，只是此刻两个方向穿过的一样多。扩散指的是净移动，而净移动为零。',
          },
          action: { type: 'setParams', params: { gradient: 0, temperature: 37, surfaceArea: 1 } },
          pause: 1,
        },
        {
          id: 'grad-3',
          text: {
            en: 'Push the gradient negative — more inside the cell than outside — and diffusion goes into reverse. It runs out of the cell. It has no choice: it only ever goes downhill.',
            zh: '把梯度调成负值——细胞内比细胞外还多——扩散就反向了，物质流出细胞。它别无选择：它只能往低处走。',
          },
          action: { type: 'setParams', params: { gradient: -60, temperature: 37, surfaceArea: 1 } },
        },
        {
          id: 'grad-4',
          text: {
            en: 'Now look at the other line. Flat. Completely flat, right across the graph — and still positive out here where the gradient is against it. Active transport is still bringing the substance in, uphill, and it does not care how steep the hill is.',
            zh: '再看另一条线。是平的。整张图上完全水平——而且在梯度不利的这一侧仍然为正。主动运输仍在把物质"逆坡"运进来，而且完全不在乎坡有多陡。',
          },
        },
        {
          id: 'grad-5',
          text: {
            en: 'That is the entire reason a cell bothers with it. Root hair cells sit in soil with a far lower mineral ion concentration than their own cytoplasm. Diffusion would empty them. Active transport fills them.',
            zh: '这正是细胞不惜代价使用它的全部原因。根毛细胞周围土壤中矿质离子的浓度远低于细胞质本身。靠扩散只会让它流失，靠主动运输才能积累。',
          },
        },
      ],
    },
    {
      id: 'temperature',
      type: 'interaction',
      title: { en: 'The temperature graph', zh: '温度图' },
      lines: [
        {
          id: 'temp-1',
          text: {
            en: 'Now the second graph. Both processes speed up as things warm — so far, no help in telling them apart.',
            zh: '再看第二张图。两个过程都随温度升高而加快——到这里还看不出区别。',
          },
          action: { type: 'setParams', params: { gradient: 60, temperature: 20, surfaceArea: 1 } },
        },
        {
          id: 'temp-2',
          text: {
            en: 'Keep going past thirty-seven. Diffusion carries on climbing — warmer particles have more kinetic energy, move faster, and cross the membrane more often. There is nothing about diffusion that heat can break.',
            zh: '继续升过 37 °C。扩散仍在上升——温度越高，粒子动能越大、运动越快、穿膜越频繁。扩散中没有任何东西会被热破坏。',
          },
          action: { type: 'setParams', params: { gradient: 60, temperature: 50, surfaceArea: 1 } },
        },
        {
          id: 'temp-3',
          text: {
            en: 'And active transport has fallen off a cliff. You have seen that shape before — it is the enzyme curve. Active transport needs energy from respiration, respiration is run by enzymes, and above about forty degrees those enzymes denature.',
            zh: '而主动运输已经坠落。这个形状你见过——就是酶的曲线。主动运输需要呼吸作用提供能量，呼吸作用由酶驱动，而超过约 40 °C 这些酶就变性了。',
          },
          pause: 1,
        },
        {
          id: 'temp-4',
          text: {
            en: 'So there is your experiment. Heat the tissue until it is dead, or starve it of oxygen, or poison its respiration with cyanide. Whatever still crosses the membrane was diffusing. Whatever stopped was being actively transported.',
            zh: '实验设计就出来了：把组织加热致死，或断绝氧气，或用氰化物毒害其呼吸作用。仍能穿膜的就是扩散，停下来的就是主动运输。',
          },
        },
      ],
    },
    {
      id: 'factors',
      type: 'concept',
      title: { en: 'What else changes the rate', zh: '还有什么影响速率' },
      lines: [
        {
          id: 'fac-1',
          text: {
            en: 'Surface area affects both, and in the same way — double the membrane, double the traffic. That is why anything built for exchange is folded, branched or flattened: villi, alveoli, root hairs, gills.',
            zh: '表面积对两者都有影响，而且方式相同——膜面积加倍，通量加倍。所以凡是用于交换的结构都是折叠、分支或扁平的：绒毛、肺泡、根毛、鳃。',
          },
          action: { type: 'setParams', params: { gradient: 60, temperature: 37, surfaceArea: 6 } },
        },
        {
          id: 'fac-2',
          text: {
            en: 'Distance matters too, though it is not on this graph: the thinner the barrier, the faster the crossing. An alveolus wall is one cell thick for exactly that reason.',
            zh: '距离同样重要，虽然这张图上没有：屏障越薄，穿越越快。肺泡壁只有一个细胞厚，原因正在于此。',
          },
        },
        {
          id: 'fac-3',
          text: {
            en: 'And one thing that only affects active transport: the number of carrier proteins. Each one is a specific protein in the membrane that binds the molecule, changes shape, and releases it on the other side. Run out of carriers and the rate stops rising however much energy you supply.',
            zh: '还有一样只影响主动运输：载体蛋白的数量。每个载体都是膜上的特定蛋白，它结合分子、改变构象、在另一侧释放。载体用尽后，再多的能量也无法提高速率。',
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
            en: 'Diffusion: net movement down a gradient, from higher to lower concentration, using only the random motion the particles already have. No gradient, no diffusion. No energy from the cell either.',
            zh: '扩散：沿梯度从高浓度向低浓度的净移动，只依靠粒子本身已有的随机运动。没有梯度就没有扩散，也不消耗细胞的能量。',
          },
        },
        {
          id: 'summary-2',
          text: {
            en: 'Active transport: movement against a gradient, through carrier proteins, using energy from respiration. When a question says "against a concentration gradient" or "requires energy", it is asking about active transport and nothing else.',
            zh: '主动运输：逆浓度梯度、通过载体蛋白、消耗呼吸作用提供的能量。题目一旦出现"逆浓度梯度"或"需要能量"，问的就是主动运输，不会是别的。',
          },
        },
      ],
    },
  ],
}

export default transportNarration
