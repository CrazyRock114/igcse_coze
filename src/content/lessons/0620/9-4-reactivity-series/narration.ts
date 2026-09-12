import type { NarrationScript } from '@/content/types'

export const reactivityNarration: NarrationScript = {
  id: '9-4-reactivity-series',
  sections: [
    {
      id: 'intro',
      type: 'intro',
      title: { en: 'A list you can read answers off', zh: '一张能直接读出答案的表' },
      lines: [
        {
          id: 'intro-1',
          text: {
            en: 'The reactivity series looks like something to memorise, and you do have to learn the order. But it is not a list of facts — it is a tool. Once you have it, you can predict reactions you have never seen.',
            zh: '金属活动性顺序看上去只是要背的东西，顺序确实要记。但它不是一堆事实，而是一件工具。掌握之后，你能预测从未见过的反应。',
          },
          action: { type: 'setParams', params: { metal: 0, reagent: 0 } },
        },
        {
          id: 'intro-2',
          text: {
            en: 'Here is potassium meeting cold water. Violent — it melts, skims across the surface, and the hydrogen it releases catches fire. Now watch what happens as I move down the list.',
            zh: '这是钾遇到冷水。非常剧烈——它熔化并在水面上游动，放出的氢气还会燃烧。现在看我沿着表往下走会发生什么。',
          },
        },
      ],
    },
    {
      id: 'threshold',
      type: 'interaction',
      title: { en: 'The line across the series', zh: '横跨表的那条线' },
      lines: [
        {
          id: 'thr-1',
          text: {
            en: 'Calcium. Still reacts, but calmly now — a steady stream of bubbles instead of a fire. Sodium and potassium above it were far more violent. Reactivity falls as you go down.',
            zh: '钙。仍然反应，但平稳多了——只是持续冒泡，不再着火。上面的钠和钾要剧烈得多。越往下活动性越低。',
          },
          action: { type: 'setParams', params: { metal: 2, reagent: 0 } },
        },
        {
          id: 'thr-2',
          text: {
            en: 'Magnesium is only just still reacting: a few bubbles after several days. And zinc, one step further down, does nothing at all. The red line is where reaction stops.',
            zh: '镁只是勉强还在反应：放几天才有少量气泡。再往下一步的锌则完全不反应。红线就是反应停止的地方。',
          },
          action: { type: 'setParams', params: { metal: 5, reagent: 0 } },
          pause: 1,
        },
        {
          id: 'thr-3',
          text: {
            en: 'That line is the whole idea. Every reagent draws its own line across the series. Above the line, reaction. Below it, nothing. You do not have to remember which metals react with what — you only have to remember where each line sits.',
            zh: '这条线就是全部要领。每一种试剂都会在表上划出自己的线。线以上反应，线以下不反应。你不必记住哪些金属与什么反应——只需要记住每条线的位置。',
          },
        },
        {
          id: 'thr-4',
          text: {
            en: 'Switch to steam and the line drops to iron. Metals too unreactive for cold water will still react with steam, because steam is hotter and gives them the energy they need.',
            zh: '换成水蒸气，线降到了铁。对冷水不够活泼的金属仍能与水蒸气反应，因为水蒸气温度更高，提供了所需的能量。',
          },
          action: { type: 'setParams', params: { metal: 5, reagent: 1 } },
        },
      ],
    },
    {
      id: 'hydrogen',
      type: 'concept',
      title: { en: 'Why hydrogen is on the list', zh: '为什么表上有氢' },
      lines: [
        {
          id: 'hyd-1',
          text: {
            en: 'Hydrogen is not a metal, so what is it doing in a table of metals? Because a metal reacting with an acid is displacing hydrogen from it. Whether it can do that depends on which of the two is higher.',
            zh: '氢不是金属，为什么会出现在金属表里？因为金属与酸反应，实际上是把氢从酸中置换出来。能否做到，取决于两者谁在上面。',
          },
          action: { type: 'setParams', params: { metal: 6, reagent: 2 } },
        },
        {
          id: 'hyd-2',
          text: {
            en: 'Iron is above hydrogen, so it displaces it: steady fizzing, and the gas gives a squeaky pop. Copper is below hydrogen, so it cannot. Put copper in hydrochloric acid and absolutely nothing happens.',
            zh: '铁在氢之上，所以能置换：稳定冒泡，气体点燃有爆鸣声。铜在氢之下，做不到。把铜放进盐酸，什么反应都没有。',
          },
          action: { type: 'setParams', params: { metal: 7, reagent: 2 } },
          pause: 1,
        },
        {
          id: 'hyd-3',
          text: {
            en: 'That is also why copper is used for water pipes and iron is not. Not because copper is special, but because of where it sits relative to hydrogen.',
            zh: '这也是水管用铜而不用铁的原因。不是因为铜有什么特别，而是因为它相对于氢的位置。',
          },
        },
      ],
    },
    {
      id: 'displacement',
      type: 'interaction',
      title: { en: 'Metals pushing each other out', zh: '金属之间的置换' },
      lines: [
        {
          id: 'disp-1',
          text: {
            en: 'The same rule works between two metals. Put copper into silver nitrate and the copper pushes the silver out of solution — a silver tree grows on the wire while the solution turns blue.',
            zh: '同样的规则也适用于两种金属之间。把铜放进硝酸银溶液，铜会把银从溶液中置换出来——铜丝上长出银"树"，溶液则变蓝。',
          },
          action: { type: 'setParams', params: { metal: 7, reagent: 3 } },
        },
        {
          id: 'disp-2',
          text: {
            en: 'Try it the other way and nothing happens. Silver cannot displace copper, because silver is lower. This is how you work out an order from experiments without being told it: test every pair and see who displaces whom.',
            zh: '反过来做则毫无变化。银不能置换铜，因为银在下面。这正是不被告知顺序时、由实验推出顺序的方法：把每一对都试一遍，看谁能置换谁。',
          },
          action: { type: 'setParams', params: { metal: 8, reagent: 3 } },
          pause: 1,
        },
        {
          id: 'disp-3',
          text: {
            en: 'And underneath all of it is one idea. A reactive metal is one that gives up its outer electrons easily to become a positive ion. Potassium does it instantly; gold barely does it at all. The series is really a ranking of how badly each metal wants to be an ion.',
            zh: '而这一切的背后只有一个思想。活泼的金属就是容易失去最外层电子变成正离子的金属。钾一瞬间就做到，金几乎不做。这张表实际上是各金属"多想变成离子"的排名。',
          },
        },
      ],
    },
    {
      id: 'aluminium',
      type: 'concept',
      title: { en: 'The exception: aluminium', zh: '例外：铝' },
      lines: [
        {
          id: 'al-1',
          text: {
            en: 'Aluminium sits high in the series, just below magnesium, so it should be very reactive. Yet we make saucepans, window frames and drinks cans out of it, and they do not dissolve.',
            zh: '铝在表中位置很高，就在镁下面，理应非常活泼。可我们用它做锅、窗框和易拉罐，它们并不会溶解。',
          },
          action: { type: 'setParams', params: { metal: 4, reagent: 2 } },
        },
        {
          id: 'al-2',
          text: {
            en: 'The moment aluminium meets air, a thin layer of aluminium oxide forms on the surface and seals it. The metal underneath is as reactive as the series says — it just never gets to meet anything. Scratch the layer off under water and it reacts immediately.',
            zh: '铝一接触空气，表面立刻生成一层薄薄的氧化铝把它封住。下面的金属确实和表上写的一样活泼——只是永远接触不到别的东西。在水下把这层膜刮掉，它立刻就反应。',
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
            en: 'Learn the order, including carbon and hydrogen. Cold water stops at magnesium, steam and dilute acid stop at iron, and any metal displaces one below it. Everything else follows from those three lines.',
            zh: '把顺序背下来，包括碳和氢。冷水到镁为止，水蒸气和稀酸到铁为止，任何金属都能置换排在它下面的金属。其余全都由这三条线推出。',
          },
        },
        {
          id: 'summary-2',
          text: {
            en: 'When a question gives you experimental results and asks for an order, work from the displacements: if A displaces B, A is above B. Two or three of those pin the whole order down.',
            zh: '当题目给出实验结果要求排序时，从置换关系入手：若 A 能置换 B，则 A 在 B 之上。两三个这样的关系就能确定整个顺序。',
          },
        },
      ],
    },
  ],
}

export default reactivityNarration
