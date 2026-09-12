import type { NarrationScript } from '@/content/types'

export const fuelsNarration: NarrationScript = {
  id: '11-3-fuels',
  sections: [
    {
      id: 'fuels',
      type: 'intro',
      title: { en: 'Three fuels, one origin', zh: '三种燃料，同一来源' },
      lines: [
        {
          id: 'fu-1',
          text: {
            en: 'The fossil fuels are coal, natural gas and petroleum. All three formed over millions of years from the remains of living things buried under sediment, which is what makes them finite — they are being used far faster than they are being made.',
            zh: '化石燃料是煤、天然气和石油。三者都是由埋在沉积物之下的生物遗骸经过数百万年形成的，这正是它们不可再生的原因——消耗的速度远快于生成的速度。',
          },
        },
        {
          id: 'fu-2',
          text: {
            en: 'Natural gas is mostly methane, the simplest alkane — one carbon and four hydrogens. That is worth knowing precisely, because questions ask for the main constituent by name.',
            zh: '天然气的主要成分是甲烷，最简单的烷烃——1 个碳和 4 个氢。这一点值得准确记住，因为题目会要求写出主要成分的名称。',
          },
        },
        {
          id: 'fu-3',
          text: {
            en: 'Petroleum, or crude oil, is different: it is not one substance at all but a mixture of very many hydrocarbons, mostly alkanes, with chains from one carbon atom to forty or more. As it comes out of the ground it is useless — the point of a refinery is to separate it.',
            zh: '石油（原油）则不同：它根本不是一种物质，而是许多烃的混合物，主要是烷烃，碳链从 1 个碳到 40 个甚至更多。刚开采出来时它毫无用处——炼油厂的作用就是把它分开。',
          },
        },
      ],
    },
    {
      id: 'column',
      type: 'interaction',
      title: { en: 'Why the column works', zh: '分馏塔为什么有效' },
      lines: [
        {
          id: 'co-1',
          text: {
            en: 'Look at the graph before the column. Boiling point against the number of carbon atoms in the chain, and it climbs steadily the whole way — from minus a hundred and sixty for methane to over five hundred for the longest chains.',
            zh: '在讲分馏塔之前先看这幅图。沸点随碳链中碳原子数变化，一路稳步上升——从甲烷的 −160 度到最长链的 500 度以上。',
          },
          action: { type: 'setParams', params: { carbonAtoms: 8 } },
        },
        {
          id: 'co-2',
          text: {
            en: 'That single curve is the whole of fractional distillation. The crude oil is heated until it vaporises and fed into the bottom of a tall column that is hot at the bottom and cool at the top. The vapours rise, and each one condenses at the height where the temperature has fallen to its own boiling point.',
            zh: '这一条曲线就是分馏的全部。原油被加热汽化后从高塔底部送入，塔底热、塔顶冷。蒸气上升，每一种在温度降到自身沸点的高度处冷凝。',
          },
        },
        {
          id: 'co-3',
          text: {
            en: 'So the order is not something to memorise — it is forced by the curve. The shortest chains boil lowest, so they travel highest before condensing, and refinery gas is drawn off at the top. The longest chains barely vaporise at all and collect as bitumen at the bottom.',
            zh: '所以顺序不需要背——它是曲线决定的。最短的链沸点最低，因此在冷凝前上升得最高，炼厂气从塔顶引出。最长的链几乎不汽化，作为沥青在塔底收集。',
          },
        },
        {
          id: 'co-4',
          text: {
            en: 'Try eight carbons. That is in the gasoline range — petrol for cars — condensing about three quarters of the way up. Now try twenty: diesel oil, much lower down, and much further along the curve.',
            zh: '试试 8 个碳。那在汽油范围内——汽车用汽油——在约四分之三高度处冷凝。再试 20：柴油，位置低得多，在曲线上也远得多。',
          },
          action: { type: 'setParams', params: { carbonAtoms: 20 } },
        },
        {
          id: 'co-5',
          text: {
            en: 'A fraction is a mixture, not a single compound — gasoline is everything from about five to ten carbons. So each one has a boiling range rather than a boiling point, and the column separates ranges rather than pure substances. That is why a fraction still has to be processed further before it becomes a product.',
            zh: '一个馏分是混合物而不是单一化合物——汽油包含约 5 到 10 个碳的所有成分。所以每个馏分有的是沸程而不是沸点，分馏塔分离的是沸程范围而不是纯物质。这也是馏分还需进一步加工才能成为产品的原因。',
          },
        },
      ],
    },
    {
      id: 'trends',
      type: 'interaction',
      title: { en: 'Everything follows the same curve', zh: '一切都沿着同一条曲线' },
      lines: [
        {
          id: 'tr-1',
          text: {
            en: 'Now the trends, which are all consequences of that one graph. As the chains get longer: the boiling point rises, the liquid becomes more viscous — thicker and slower to pour — it is less volatile, it ignites less easily, and it burns with a smokier flame.',
            zh: '现在说趋势，它们都是那幅图的推论。随着碳链变长：沸点升高，液体黏度增大——更稠、流动更慢——挥发性降低，越不易点燃，燃烧时烟越多。',
          },
          action: { type: 'setParams', params: { carbonAtoms: 40 } },
        },
        {
          id: 'tr-2',
          text: {
            en: 'And the uses follow from the properties, not the other way round. Petrol has to vaporise in an engine and catch light instantly, so it must be short-chain and volatile. Bitumen has to stay put on a road in the sun, so it must be long-chain and barely volatile at all. Nobody chose which fraction did what.',
            zh: '而用途源自性质，而不是相反。汽油必须在发动机中汽化并立刻点燃，所以必须是短链、易挥发的。沥青必须在烈日下留在路面上，所以必须是长链、几乎不挥发的。没有人挑选哪个馏分做什么。',
          },
        },
        {
          id: 'tr-3',
          text: {
            en: 'The reason behind all of it is worth getting right, because the common answer is wrong. Longer molecules do not have stronger covalent bonds. They are simply bigger, so each one touches its neighbours along more of its length, and the forces between the molecules are greater. Boiling separates molecules from each other; it never breaks the bonds inside them.',
            zh: '这一切背后的原因值得弄对，因为常见的答案是错的。较长的分子并没有更强的共价键。它们只是更大，因此每个分子与相邻分子接触的长度更大，分子间作用力更强。沸腾是把分子彼此分开；它绝不会破坏分子内部的键。',
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
            en: 'The fossil fuels are coal, natural gas and petroleum. Natural gas is mainly methane. Petroleum is a mixture of hydrocarbons separated by fractional distillation.',
            zh: '化石燃料是煤、天然气和石油。天然气的主要成分是甲烷。石油是烃的混合物，用分馏法分离。',
          },
        },
        {
          id: 'sum-2',
          text: {
            en: 'From the top down: refinery gas, gasoline, naphtha, kerosene, diesel oil, fuel oil, and lubricating oil with bitumen. Learn one use for each — bottled gas, cars, chemicals, aircraft, diesel engines, ships and heating, lubricants and roads.',
            zh: '自上而下：炼厂气、汽油、石脑油、煤油、柴油、燃料油，以及润滑油与沥青。每种记一个用途——瓶装燃气、汽车、化工原料、飞机、柴油机、船舶与供暖、润滑剂与铺路。',
          },
        },
        {
          id: 'sum-3',
          text: {
            en: 'Down the column the chains get longer, the boiling point rises, the fraction becomes more viscous, less volatile and harder to ignite. The cause is stronger forces between larger molecules — not stronger bonds within them.',
            zh: '沿塔向下，碳链变长，沸点升高，馏分黏度更大、挥发性更低、更难点燃。原因是较大分子之间的作用力更强——而不是分子内部的键更强。',
          },
        },
      ],
    },
  ],
}

export default fuelsNarration
