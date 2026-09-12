import type { NarrationScript } from '@/content/types'

export const electrolysisNarration: NarrationScript = {
  id: '4-1-electrolysis',
  sections: [
    {
      id: 'setup',
      type: 'intro',
      title: { en: 'Taking a compound apart with electricity', zh: '用电把化合物拆开' },
      lines: [
        {
          id: 'se-1',
          text: {
            en: 'Electrolysis is the breaking down of an ionic compound, when molten or in solution, by passing electricity through it. Both conditions matter: an ionic solid does not conduct at all, because its ions are locked in the lattice and cannot move. Melt it or dissolve it and the ions are free.',
            zh: '电解是让电流通过熔融或溶解状态的离子化合物，从而把它分解。两个条件都重要：离子固体完全不导电，因为它的离子被固定在晶格中无法移动。熔化或溶解后，离子就自由了。',
          },
        },
        {
          id: 'se-2',
          text: {
            en: 'Two electrodes dip into the liquid. The anode is the positive one and the cathode is the negative one — and the way to keep them straight is by what they attract. Negative ions, called anions, go to the anode. Positive ions, cations, go to the cathode. Opposite charges attract, as always.',
            zh: '两个电极浸在液体中。阳极是正极，阴极是负极——记住它们的办法是看它们吸引什么。负离子（阴离子）走向阳极。正离子（阳离子）走向阴极。异性电荷相吸，一如既往。',
          },
        },
        {
          id: 'se-3',
          text: {
            en: 'Now follow the charge all the way round, because this is what a full-mark answer describes. In the wires, electrons move from the power supply to the cathode. In the liquid, there are no free electrons at all — the charge is carried by ions moving. At the cathode, positive ions collect electrons; at the anode, negative ions give electrons up, and those electrons travel back through the wire to the supply.',
            zh: '现在把电荷的路径完整走一遍，因为满分答案描述的正是这个。在导线中，电子从电源移向阴极。在液体中根本没有自由电子——电荷由离子的移动来传递。在阴极，正离子获得电子；在阳极，负离子放出电子，这些电子经导线回到电源。',
          },
        },
        {
          id: 'se-4',
          text: {
            en: 'That last point is worth saying plainly, because it is a common misconception: electrons do not travel through the electrolyte. Ions do. The circuit is complete because two different carriers hand over to each other at the electrodes.',
            zh: '最后这一点值得明确说出，因为这是常见的误解：电子并不在电解质中穿行。移动的是离子。电路之所以完整，是因为两种不同的载流子在电极处完成了交接。',
          },
        },
      ],
    },
    {
      id: 'molten',
      type: 'interaction',
      title: { en: 'Molten: the simple case', zh: '熔融：简单的情形' },
      lines: [
        {
          id: 'mo-1',
          text: {
            en: 'Melt a binary compound — one made of just two elements — and the answer is as simple as it looks. The metal appears at the cathode and the non-metal at the anode. Molten lead bromide gives lead and bromine; molten aluminium oxide gives aluminium and oxygen.',
            zh: '熔化一种二元化合物——只由两种元素组成——答案就和看上去一样简单。金属出现在阴极，非金属出现在阳极。熔融溴化铅给出铅和溴；熔融氧化铝给出铝和氧。',
          },
          action: { type: 'setParams', params: { stage: 1 } },
        },
        {
          id: 'mo-2',
          text: {
            en: 'Sort these six products. There is nothing to weigh up here — a metal ion is positive, so it is drawn to the negative cathode, and there is no competition because nothing else is in the liquid.',
            zh: '把这六种产物分类。这里没有什么要权衡的——金属离子带正电，被吸引到负的阴极，而且因为液体中没有别的东西，也就没有竞争。',
          },
        },
        {
          id: 'mo-3',
          text: {
            en: 'This is how aluminium is actually extracted, and it is why aluminium was once more valuable than gold. Aluminium is too reactive to be extracted with carbon, so electrolysis is the only route — and melting aluminium oxide takes an enormous amount of electricity, which is what makes the metal expensive to produce and so worth recycling.',
            zh: '铝就是这样冶炼出来的，这也解释了铝曾经比黄金还贵重的原因。铝太活泼，无法用碳还原，因此电解是唯一途径——而熔化氧化铝需要极大的电量，这正是生产这种金属成本高、因而值得回收的原因。',
          },
        },
      ],
    },
    {
      id: 'aqueous',
      type: 'interaction',
      title: { en: 'In solution, water competes', zh: '在溶液中，水会来竞争' },
      lines: [
        {
          id: 'aq-1',
          text: {
            en: 'Dissolve the compound instead and something changes: the water is there too, and water itself provides hydrogen ions and hydroxide ions. So at each electrode there are now two candidates, and only one of them gets discharged.',
            zh: '改为把化合物溶解，情况就变了：水也在场，而水本身提供氢离子和氢氧根离子。于是每个电极现在都有两个候选者，而只有一个会被放电。',
          },
          action: { type: 'setParams', params: { stage: 2 } },
        },
        {
          id: 'aq-2',
          text: {
            en: 'At the cathode the rule uses the reactivity series. The less reactive of the two is discharged — so if the metal is below hydrogen, you get the metal; if it is above hydrogen, you get hydrogen instead. Copper sulfate solution gives copper. Sodium chloride solution gives hydrogen, not sodium, however much sodium is dissolved in it.',
            zh: '在阴极，规则要用到活动性顺序。两者中活动性较弱的那个被放电——所以如果金属排在氢之下，得到金属；如果排在氢之上，得到的是氢。硫酸铜溶液给出铜。氯化钠溶液给出氢而不是钠，不论其中溶了多少钠。',
          },
        },
        {
          id: 'aq-3',
          text: {
            en: 'That is the sentence to hold on to. "Metal at the cathode" is only true for molten compounds. In solution it is true only when the metal is less reactive than hydrogen, and sodium, potassium, calcium, magnesium and aluminium are all more reactive than hydrogen.',
            zh: '这句话要记牢。"阴极得金属"只对熔融化合物成立。在溶液中，只有当金属的活动性弱于氢时才成立，而钠、钾、钙、镁、铝的活动性都强于氢。',
          },
        },
        {
          id: 'aq-4',
          text: {
            en: 'At the anode the rule is different again. A concentrated halide solution gives the halogen — concentrated sodium chloride gives chlorine, which is how chlorine is manufactured. Anything else, including a dilute halide, gives oxygen from the hydroxide ions in the water.',
            zh: '阳极的规则又不一样。浓的卤化物溶液给出卤素单质——浓氯化钠给出氯气，工业上正是这样制氯的。其他情况，包括稀的卤化物溶液，都是水中的氢氧根放电生成氧。',
          },
        },
        {
          id: 'aq-5',
          text: {
            en: 'So the same salt gives different products at different concentrations. Concentrated sodium chloride gives chlorine at the anode; dilute sodium chloride gives oxygen. Both appear in the exercise on purpose, and if you sorted them the same way, that is the point being made.',
            zh: '所以同一种盐在不同浓度下给出不同的产物。浓氯化钠在阳极给出氯气；稀氯化钠给出氧气。练习中特意把两者都放进来，如果你把它们归到了同一类，那正是这里要说明的问题。',
          },
        },
        {
          id: 'aq-6',
          text: {
            en: 'One more use worth knowing: electroplating. A thin layer of one metal is deposited on another by making the object the cathode and putting the plating metal in the solution. Objects are plated to improve their appearance, or to protect the metal underneath from corrosion — chromium on a bumper, silver on cutlery.',
            zh: '还有一个值得了解的应用：电镀。把物体作为阴极、把镀层金属放在溶液中，就能在另一种金属上沉积一层薄薄的金属。电镀的目的是改善外观，或保护下面的金属不被腐蚀——保险杠上的铬、餐具上的银。',
          },
        },
        {
          id: 'aq-7',
          text: {
            en: 'The object must be the cathode, and that follows from everything so far: metal ions in the solution are positive, so they move to the negative electrode and are deposited there. Making the object the anode would dissolve it instead.',
            zh: '被镀物体必须作阴极，这由前面的一切自然得出：溶液中的金属离子带正电，因此移向负电极并在那里沉积。若把物体作阳极，反而会把它溶解掉。',
          },
        },
      ],
    },
    {
      id: 'redox',
      type: 'interaction',
      title: { en: 'Where the electrons actually go', zh: '电子究竟去了哪里' },
      lines: [
        {
          id: 're-1',
          text: {
            en: 'Now write down what happens at each electrode as a half-equation — one that shows the electrons explicitly. At the cathode a lead ion collects two electrons and becomes a lead atom: Pb²⁺ plus two electrons gives Pb.',
            zh: '现在把每个电极上发生的事写成半反应式——把电子明确写出来的那种。在阴极，铅离子获得两个电子变成铅原子：Pb²⁺ + 2e⁻ → Pb。',
          },
          action: { type: 'setParams', params: { stage: 3 } },
        },
        {
          id: 're-2',
          text: {
            en: 'At the anode two bromide ions give up an electron each and join into a bromine molecule: two Br minus gives Br₂ plus two electrons. Notice the electrons have moved to the other side of the arrow.',
            zh: '在阳极，两个溴离子各失去一个电子并结合成溴分子：2Br⁻ → Br₂ + 2e⁻。注意电子跑到了箭头的另一边。',
          },
        },
        {
          id: 're-3',
          text: {
            en: 'And that side is all you need. Electrons on the left means electrons gained, which is reduction, and reduction always happens at the cathode. Electrons on the right means electrons lost, which is oxidation, at the anode. Sort these six by looking at nothing but which side the electrons are on.',
            zh: '而看那一边就够了。电子在左边表示得到电子，即还原，还原总是发生在阴极。电子在右边表示失去电子，即氧化，发生在阳极。只看电子在哪一边，就能把这六个分类。',
          },
        },
        {
          id: 're-4',
          text: {
            en: 'Two habits that save marks. Balance the charges as well as the atoms — the total charge must be the same on both sides. And check the electrons against the ion: a two-plus ion needs two electrons, a three-plus ion needs three.',
            zh: '两个能保分的习惯。除原子外还要配平电荷——两边的总电荷必须相等。并且核对电子数与离子电荷：2+ 的离子需要 2 个电子，3+ 的离子需要 3 个。',
          },
        },
      ],
    },
    {
      id: 'fuelcell',
      type: 'concept',
      title: { en: 'Running it backwards', zh: '把它反过来运行' },
      lines: [
        {
          id: 'fu-1',
          text: {
            en: 'Electrolysis uses electricity to split water into hydrogen and oxygen. A hydrogen–oxygen fuel cell does the reverse: it combines hydrogen and oxygen and produces electricity, with water as the only product.',
            zh: '电解是用电把水分解成氢和氧。氢氧燃料电池则相反：它让氢和氧结合并产生电，唯一的产物是水。',
          },
        },
        {
          id: 'fu-2',
          text: {
            en: 'The advantages are real. Nothing comes out of the exhaust but water — no carbon dioxide, no nitrogen oxides, no particulates. It is more efficient than a petrol engine, because it is not limited by burning fuel to make heat first. And it keeps working as long as hydrogen is supplied, rather than needing hours to recharge.',
            zh: '优点是实实在在的。排放的只有水——没有二氧化碳、没有氮氧化物、没有颗粒物。它比汽油发动机效率更高，因为不必先烧燃料产生热。而且只要持续供氢就能持续工作，不需要几小时的充电。',
          },
        },
        {
          id: 'fu-3',
          text: {
            en: 'The disadvantages are equally real, and a question asking for both expects them. Hydrogen is a gas that is difficult and expensive to store and transport safely, and it is highly flammable. There are very few filling stations. And the hydrogen has to be made in the first place — usually from fossil fuels or by electrolysis using electricity that may itself have come from fossil fuels, in which case the emissions have been moved rather than removed.',
            zh: '缺点同样实在，题目若两方面都问就要写出来。氢是气体，安全储存和运输困难且昂贵，而且极易燃。加氢站极少。此外氢本身还得先制取——通常来自化石燃料，或者用电解制取而电本身可能来自化石燃料，那样只是把排放转移了，而不是消除了。',
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
            en: 'Electrolysis breaks down an ionic compound when molten or in solution. Anode positive, cathode negative; anions to the anode, cations to the cathode. Charge is carried by ions in the electrolyte and by electrons in the wires.',
            zh: '电解把熔融或溶解状态的离子化合物分解。阳极为正、阴极为负；阴离子去阳极，阳离子去阴极。电荷在电解质中由离子传递，在导线中由电子传递。',
          },
        },
        {
          id: 'sum-2',
          text: {
            en: 'Molten binary compound: metal at the cathode, non-metal at the anode. In solution: hydrogen at the cathode unless the metal is below hydrogen in the reactivity series, and oxygen at the anode unless the solution is a concentrated halide.',
            zh: '熔融二元化合物：阴极得金属，阳极得非金属。在溶液中：阴极得氢，除非金属在活动性顺序中位于氢之下；阳极得氧，除非溶液是浓的卤化物。',
          },
        },
        {
          id: 'sum-3',
          text: {
            en: 'Half-equations: electrons on the left is reduction at the cathode, electrons on the right is oxidation at the anode. Balance the charge as well as the atoms.',
            zh: '半反应式：电子在左边是阴极的还原，电子在右边是阳极的氧化。除原子外还要配平电荷。',
          },
        },
      ],
    },
  ],
}

export default electrolysisNarration
