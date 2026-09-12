import type { NarrationScript } from '@/content/types'

export const alloysNarration: NarrationScript = {
  id: '9-3-alloys',
  sections: [
    {
      id: 'intro',
      type: 'intro',
      title: { en: 'Why we hardly ever use a pure metal', zh: '为什么我们几乎不用纯金属' },
      lines: [
        {
          id: 'intro-1',
          text: {
            en: 'Almost nothing around you is made of a pure metal. Cutlery, girders, coins, aircraft, door handles — all alloys. Pure metals are usually too soft to be useful, and this is why.',
            zh: '你身边几乎没有什么东西是用纯金属做的。餐具、钢梁、硬币、飞机、门把手——全是合金。纯金属通常太软而不实用，原因就在这里。',
          },
          action: { type: 'setParams', params: { mixture: 0, force: 0 } },
        },
        {
          id: 'intro-2',
          text: {
            en: 'Here is pure copper: identical atoms, stacked in neat rows. Every atom has the same neighbours as every other. Now push the top layers sideways.',
            zh: '这是纯铜：相同的原子整齐地排成行。每个原子的邻居都完全一样。现在把上面几层向侧面推。',
          },
        },
        {
          id: 'intro-3',
          text: {
            en: 'They slide a whole atom along, and nothing resists them — because the site they arrive at is identical to the one they left. That sliding is exactly what "soft" and "malleable" mean at this scale. Hammer copper and this is what happens inside it.',
            zh: '它们整整滑过一个原子的距离，毫无阻力——因为到达的位置与离开的位置完全相同。在这个尺度上，"软"和"有延展性"指的就是这种滑动。锤打铜时，内部发生的正是这件事。',
          },
          action: { type: 'setParams', params: { mixture: 0, force: 1 } },
          pause: 1,
        },
      ],
    },
    {
      id: 'alloy',
      type: 'interaction',
      title: { en: 'Put something else in the way', zh: '往里面塞点别的' },
      lines: [
        {
          id: 'alloy-1',
          text: {
            en: 'Now brass — copper with some zinc mixed in. Zinc atoms are a slightly different size, shown in orange. Look at the rows: they are no longer neat.',
            zh: '现在看黄铜——铜中混入了一些锌。锌原子大小略有不同，用橙色表示。看这些行：已经不整齐了。',
          },
          action: { type: 'setParams', params: { mixture: 1, force: 0 } },
        },
        {
          id: 'alloy-2',
          text: {
            en: 'Push just as hard as before. The layers barely move. A differently sized atom sitting on the boundary does not fit the site the layer is trying to slide into, so the layers catch instead of sliding.',
            zh: '用和刚才一样的力去推。层几乎不动。边界上那个大小不同的原子无法嵌入该层想要滑入的位置，所以层与层卡住而不是滑动。',
          },
          action: { type: 'setParams', params: { mixture: 1, force: 1 } },
          pause: 1,
        },
        {
          id: 'alloy-3',
          text: {
            en: 'That is the entire explanation, and it is worth a mark every time: the different-sized atoms distort the layers so they cannot slide over each other, which makes the alloy harder and stronger than the pure metal.',
            zh: '这就是全部解释，而且每次都值一分：大小不同的原子使原子层变形，层与层无法相互滑动，因此合金比纯金属更硬更强。',
          },
        },
        {
          id: 'alloy-4',
          text: {
            en: 'Steel is iron with a little carbon. Carbon atoms are much smaller than iron atoms, and it works just as well — it is the mismatch that matters, not whether the guest is bigger or smaller.',
            zh: '钢是铁加少量碳。碳原子比铁原子小得多，效果同样好——关键是尺寸不匹配，而不是外来原子更大还是更小。',
          },
          action: { type: 'setParams', params: { mixture: 2, force: 1 } },
        },
      ],
    },
    {
      id: 'mixture',
      type: 'concept',
      title: { en: 'An alloy is a mixture', zh: '合金是混合物' },
      lines: [
        {
          id: 'mix-1',
          text: {
            en: 'Notice what has not happened. No bonds broke, no new substance formed, no reaction took place. The copper is still copper and the zinc is still zinc — they are simply mixed at the atomic scale.',
            zh: '注意什么*没有*发生。没有键断裂、没有新物质生成、没有发生反应。铜还是铜，锌还是锌——它们只是在原子尺度上混合在一起。',
          },
          action: { type: 'setParams', params: { mixture: 1, force: 0 } },
        },
        {
          id: 'mix-2',
          text: {
            en: 'So an alloy is a mixture, not a compound. That is why it has no formula and no fixed composition — you can make brass with more zinc or less, and it is still brass.',
            zh: '所以合金是混合物，不是化合物。这就是它没有化学式、没有固定组成的原因——黄铜里锌多一点少一点，仍然是黄铜。',
          },
        },
        {
          id: 'mix-3',
          text: {
            en: 'And that is how you spot one in a diagram. A pure metal is circles of one size in regular rows. An alloy is circles of two sizes, and the rows are pushed out of line by the odd ones.',
            zh: '这也是在图中识别合金的方法。纯金属是同样大小的圆排成规则的行。合金有两种大小的圆，而且行被那些"异类"挤得不齐。',
          },
        },
      ],
    },
    {
      id: 'uses',
      type: 'concept',
      title: { en: 'Choosing an alloy for a job', zh: '按用途选择合金' },
      lines: [
        {
          id: 'use-1',
          text: {
            en: 'Once you can make a metal harder, you choose the property you need. Steel for girders and tools, because strength is everything. Brass for door handles and instruments, because it is hard and resists corrosion.',
            zh: '一旦能让金属变硬，就可以按所需性质来选择。钢用于钢梁和工具，因为强度最重要。黄铜用于门把手和乐器，因为它既硬又耐腐蚀。',
          },
          action: { type: 'setParams', params: { mixture: 3, force: 0 } },
        },
        {
          id: 'use-2',
          text: {
            en: 'Stainless steel adds chromium, whose atoms are larger than iron’s. Hard, and it does not rust — so cutlery, sinks and surgical instruments. And where you want the opposite, you use the pure metal: copper wiring is soft on purpose, so it bends round corners.',
            zh: '不锈钢中加入了铬，铬原子比铁原子大。它既硬又不生锈——所以用于餐具、水槽和手术器械。而当你需要相反的性质时就用纯金属：铜导线故意做得柔软，以便绕过转角。',
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
            en: 'An alloy is a mixture of a metal with one or more other elements. The added atoms are a different size, so the layers of atoms cannot slide over each other, so the alloy is harder and stronger than the pure metal.',
            zh: '合金是金属与一种或多种其他元素的混合物。加入的原子大小不同，因此原子层之间无法滑动，所以合金比纯金属更硬更强。',
          },
        },
        {
          id: 'summary-2',
          text: {
            en: 'Write that middle step. "Alloys are harder because they contain other atoms" skips the mechanism and loses the mark — the layers not sliding is what the examiner is looking for.',
            zh: '中间这一步一定要写出来。"合金因为含有其他原子所以更硬"跳过了机理，要丢分——考官要看的是"层之间无法滑动"。',
          },
        },
      ],
    },
  ],
}

export default alloysNarration
