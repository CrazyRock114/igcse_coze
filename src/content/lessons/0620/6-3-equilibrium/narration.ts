import type { NarrationScript } from '@/content/types'

export const equilibriumNarration: NarrationScript = {
  id: '6-3-equilibrium',
  sections: [
    {
      id: 'changes',
      type: 'intro',
      title: { en: 'Two kinds of change, and going backwards', zh: '两类变化，以及往回走' },
      lines: [
        {
          id: 'ch-1',
          text: {
            en: 'A physical change alters the form of a substance without making a new one. Melting ice, dissolving salt, boiling water — the particles are the same before and after, and the change is easy to reverse.',
            zh: '物理变化只改变物质的形态，不产生新物质。冰熔化、盐溶解、水沸腾——粒子前后相同，而且变化容易逆转。',
          },
        },
        {
          id: 'ch-2',
          text: {
            en: 'A chemical change makes one or more new substances. Bonds are broken and new ones formed, there is usually an energy change you can feel, and the products often look nothing like what you started with. Burning magnesium is a chemical change; melting it is not.',
            zh: '化学变化生成一种或多种新物质。旧键断裂、新键形成，通常伴随能感觉到的能量变化，而且产物往往与起始物毫不相像。镁燃烧是化学变化；镁熔化不是。',
          },
        },
        {
          id: 'ch-3',
          text: {
            en: 'Chemical changes are often described as hard to reverse, and many are. But some run in both directions, and those are written with a special arrow — a double arrow with a half-head at each end. It means the forward and backward reactions both happen, in the same vessel, at the same time.',
            zh: '化学变化常被说成难以逆转，许多确实如此。但有些反应能向两个方向进行，这类反应用一种特殊的箭头来表示——两端各有半个箭头的双向箭头。它表示正反应和逆反应在同一容器中同时进行。',
          },
        },
        {
          id: 'ch-4',
          text: {
            en: 'Hydrated copper(II) sulfate is the demonstration everyone remembers. Heat the blue crystals and they turn white as the water is driven off; add water to the white powder and it turns blue again, getting warm as it does. Same reaction, both directions, decided by the conditions.',
            zh: '含水硫酸铜是大家都记得的演示。加热蓝色晶体，水被赶走，晶体变白；向白色粉末加水，它又变蓝，同时放热。同一个反应，两个方向，由条件决定走哪一边。',
          },
        },
      ],
    },
    {
      id: 'equilibrium',
      type: 'concept',
      title: { en: 'Busy, and going nowhere', zh: '很忙，却哪儿也没去' },
      lines: [
        {
          id: 'eq-1',
          text: {
            en: 'Now close the vessel so nothing can escape. At first there are only reactants, so the forward reaction is fast and the backward one cannot happen at all. As products build up, the forward reaction slows and the backward one speeds up.',
            zh: '现在把容器封闭，使任何物质都无法逸出。起初只有反应物，所以正反应很快，逆反应根本无法发生。随着生成物积累，正反应变慢，逆反应变快。',
          },
        },
        {
          id: 'eq-2',
          text: {
            en: 'Eventually the two rates become equal, and that is equilibrium. From the outside nothing changes any more — the concentrations of everything stay constant. From the inside both reactions are still running flat out. It is called a dynamic equilibrium for exactly that reason.',
            zh: '最终两个速率相等，这就是平衡。从外部看不再有任何变化——各物质的浓度都保持恒定。而在内部，两个反应仍在全速进行。正因如此它被称为动态平衡。',
          },
        },
        {
          id: 'eq-3',
          text: {
            en: 'Three things to say if asked to describe it. The rates of the forward and backward reactions are equal. The concentrations of reactants and products remain constant. And it can only be reached in a closed system — if anything escapes, the backward reaction is starved and the system never settles.',
            zh: '若要求描述平衡，有三点要说。正反应与逆反应的速率相等。反应物和生成物的浓度保持恒定。而且它只能在封闭体系中达到——若有物质逸出，逆反应就没有原料，体系永远无法稳定。',
          },
        },
        {
          id: 'eq-4',
          text: {
            en: 'Constant does not mean equal. An equilibrium mixture can be ninety per cent product or ninety per cent reactant; what is constant is that the numbers have stopped moving. Where the balance sits is what the conditions control.',
            zh: '"恒定"不等于"相等"。平衡混合物可以有 90% 是生成物，也可以有 90% 是反应物；恒定的是这些数字不再变动。平衡落在哪里，由条件控制。',
          },
        },
      ],
    },
    {
      id: 'haber',
      type: 'interaction',
      title: { en: 'The compromise on the graph', zh: '图上的那个折中' },
      lines: [
        {
          id: 'ha-1',
          text: {
            en: 'The Haber process makes ammonia from nitrogen and hydrogen, and it is the reaction that feeds most of the world through fertilisers. Nitrogen from the air, hydrogen usually from natural gas, an iron catalyst, and the equation is reversible: N₂ plus three H₂ gives two NH₃.',
            zh: '哈伯法用氮和氢制氨，正是这个反应通过化肥养活了世界上大多数人。氮来自空气，氢通常来自天然气，用铁作催化剂，方程式是可逆的：N₂ + 3H₂ ⇌ 2NH₃。',
          },
          action: { type: 'setParams', params: { temperature: 450, pressure: 200 } },
        },
        {
          id: 'ha-2',
          text: {
            en: 'Look at the temperature graph. The yield falls steadily as it gets hotter, and the reason is that the forward reaction gives out heat. Heat the mixture and the equilibrium shifts back the way that absorbs heat — away from ammonia.',
            zh: '看温度图。随着温度升高，产率稳步下降，原因是正反应放热。加热混合物，平衡会向吸热的方向移动——也就是远离氨的方向。',
          },
        },
        {
          id: 'ha-3',
          text: {
            en: 'So cool it down. At two hundred and fifty degrees the yield is enormous. Set it there and read the note underneath — because this is where the obvious answer turns out to be wrong.',
            zh: '那就降温。在 250 度时产率非常高。把温度设到那里，读一读下面的说明——因为显而易见的答案在这里恰恰是错的。',
          },
          action: { type: 'setParams', params: { temperature: 250, pressure: 200 } },
        },
        {
          id: 'ha-4',
          text: {
            en: 'A cold reactor would take an impractically long time to reach that equilibrium, and the iron catalyst barely works at low temperatures. A wonderful yield reached in a week is worth less than a poor yield reached in seconds. So the plant runs at about four hundred and fifty degrees and accepts a yield of around a quarter.',
            zh: '低温反应器要花长得不切实际的时间才能达到那个平衡，而且铁催化剂在低温下几乎不起作用。用一周达到极好的产率，不如几秒钟达到较低的产率有价值。所以工厂在约 450 度下运行，接受约四分之一的产率。',
          },
        },
        {
          id: 'ha-5',
          text: {
            en: 'And the unreacted nitrogen and hydrogen are not thrown away — they are cooled to condense out the ammonia and then fed straight back in. Over many passes almost everything is converted, so the low yield per pass costs far less than it looks.',
            zh: '而且未反应的氮和氢并没有被丢弃——把混合气冷却使氨液化分离后，剩下的气体直接送回反应器。经过多次循环，几乎全部原料最终都转化了，所以单程产率低的代价远比看上去小。',
          },
        },
        {
          id: 'ha-6',
          text: {
            en: 'Now the pressure graph. Four molecules of gas on the left, two on the right — so squeezing the mixture pushes the equilibrium towards the side with fewer molecules, which is the ammonia. The yield climbs all the way up the graph, and chemistry never says stop.',
            zh: '现在看压强图。左边 4 个气体分子，右边 2 个——所以压缩混合物会把平衡推向分子数较少的一边，也就是氨这一边。产率在整幅图上一路上升，化学本身从不叫停。',
          },
          action: { type: 'setParams', params: { temperature: 450, pressure: 400 } },
        },
        {
          id: 'ha-7',
          text: {
            en: 'What says stop is money. Containing two hundred atmospheres needs thick steel pipework and large compressors; four hundred needs far more of both, and the plant becomes more dangerous as well as more expensive. Around two hundred atmospheres is where the extra ammonia stops paying for the extra steel.',
            zh: '叫停的是钱。承受 200 个大气压需要厚壁钢管和大型压缩机；400 个大气压需要的更多，工厂也随之更危险、更昂贵。约 200 个大气压就是多产的氨不再抵得上多花的钢材的界限。',
          },
          action: { type: 'setParams', params: { temperature: 450, pressure: 200 } },
        },
        {
          id: 'ha-8',
          text: {
            en: 'One last thing about the catalyst, because it is a favourite trap. Iron speeds up the forward and backward reactions equally, so equilibrium is reached sooner — but the position of the equilibrium is not moved at all. A catalyst changes when, never how much.',
            zh: '最后说说催化剂，因为这是常考的陷阱。铁使正反应和逆反应同等地加快，因此更快达到平衡——但平衡的位置丝毫不变。催化剂改变的是"什么时候"，绝不是"多少"。',
          },
        },
      ],
    },
    {
      id: 'contact',
      type: 'concept',
      title: { en: 'The same reasoning, a different plant', zh: '同样的推理，另一座工厂' },
      lines: [
        {
          id: 'co-1',
          text: {
            en: 'The Contact process makes sulfuric acid, and its key step is the same kind of equilibrium: two sulfur dioxide plus one oxygen gives two sulfur trioxide, reversible, with a vanadium(V) oxide catalyst at about four hundred and fifty degrees and two atmospheres.',
            zh: '接触法制硫酸，其关键一步是同一类平衡：2SO₂ + O₂ ⇌ 2SO₃，可逆，用五氧化二钒作催化剂，约 450 度、2 个大气压。',
          },
        },
        {
          id: 'co-2',
          text: {
            en: 'Notice the pressure — only two atmospheres, where the Haber process needs two hundred. Three molecules of gas become two, so pressure does help, but the yield is already about ninety-five per cent at atmospheric pressure. There is almost nothing left to gain, so there is no case for the expense.',
            zh: '注意压强——只有 2 个大气压，而哈伯法需要 200 个。3 个气体分子变成 2 个，所以加压确实有帮助，但在常压下产率已经约 95%。几乎没有提升空间，因此不值得为此花钱。',
          },
        },
        {
          id: 'co-3',
          text: {
            en: 'That comparison is the point of learning both. The chemistry says the same thing in each case — exothermic, fewer molecules of gas — but the industrial answer is different, because the answer depends on how much there is to gain and what it costs to get.',
            zh: '两者的对比正是同时学习它们的意义。两个例子中化学给出的结论相同——放热、气体分子数减少——但工业上的答案不同，因为答案取决于能获得多少收益、以及为此要付出多少成本。',
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
            en: 'A physical change makes no new substance; a chemical change does. A reversible reaction is written with ⇌, and in a closed system it reaches a dynamic equilibrium: forward and backward rates equal, concentrations constant, both reactions still running.',
            zh: '物理变化不生成新物质；化学变化会。可逆反应用 ⇌ 表示，在封闭体系中达到动态平衡：正逆反应速率相等，浓度恒定，而两个反应仍在进行。',
          },
        },
        {
          id: 'sum-2',
          text: {
            en: 'To predict a shift, ask two questions. Is the forward reaction exothermic? Then cooling favours the products. Are there fewer molecules of gas on the product side? Then pressure favours the products. A catalyst shifts nothing.',
            zh: '预测平衡移动时问两个问题。正反应是放热的吗？那么降温有利于生成物。生成物一侧的气体分子数更少吗？那么加压有利于生成物。催化剂不会移动平衡。',
          },
        },
        {
          id: 'sum-3',
          text: {
            en: 'Haber: N₂ + 3H₂ ⇌ 2NH₃, iron catalyst, about 450 °C and 200 atm. Contact: 2SO₂ + O₂ ⇌ 2SO₃, vanadium(V) oxide, about 450 °C and 2 atm. In both, the temperature is a compromise between yield and rate.',
            zh: '哈伯法：N₂ + 3H₂ ⇌ 2NH₃，铁催化剂，约 450 °C、200 atm。接触法：2SO₂ + O₂ ⇌ 2SO₃，五氧化二钒，约 450 °C、2 atm。两者的温度都是产率与速率之间的折中。',
          },
        },
      ],
    },
  ],
}

export default equilibriumNarration
