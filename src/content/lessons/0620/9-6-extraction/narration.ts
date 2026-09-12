import type { NarrationScript } from '@/content/types'

export const extractionNarration: NarrationScript = {
  id: '9-6-extraction',
  sections: [
    {
      id: 'intro',
      type: 'intro',
      title: { en: 'Why gold is old and aluminium is new', zh: '为什么金很古老而铝很年轻' },
      lines: [
        {
          id: 'intro-1',
          text: {
            en: 'People have used gold for eight thousand years and aluminium for less than two hundred. Aluminium is the most common metal in the Earth’s crust and gold is one of the rarest. That is backwards — until you look at the reactivity series.',
            zh: '人类使用金已有八千年，使用铝却不到两百年。铝是地壳中含量最高的金属，金却是最稀有的之一。这看起来反了——直到你看一眼金属活动性顺序。',
          },
          action: { type: 'setParams', params: { metal: 9, question: 0 } },
        },
        {
          id: 'intro-2',
          text: {
            en: 'Gold is at the very bottom. It is so unreactive that it never formed a compound in the first place — you find it lying in the ground as gold. No chemistry required, which is why it was the first metal anyone used.',
            zh: '金在最底部。它太不活泼，根本没有形成过化合物——你能在地下直接找到金块。不需要任何化学处理，所以它成了人类最早使用的金属。',
          },
        },
      ],
    },
    {
      id: 'carbon-line',
      type: 'interaction',
      title: { en: 'The carbon line', zh: '碳线' },
      lines: [
        {
          id: 'carbon-1',
          text: {
            en: 'Every other metal is locked in a compound, usually an oxide, and getting it out means taking the oxygen away. That is a reduction — and something has to want the oxygen more than the metal does.',
            zh: '其余金属都被锁在化合物中，通常是氧化物，要取出金属就得把氧夺走。这就是还原——必须有某种东西比金属更想要氧。',
          },
        },
        {
          id: 'carbon-2',
          text: {
            en: 'Carbon is cheap and it is quite reactive, so carbon is what we use. Iron sits below carbon, so carbon can take iron’s oxygen. Heat iron ore with coke and you get iron. We have done it for three thousand years.',
            zh: '碳便宜而且相当活泼，所以我们用碳。铁在碳之下，因此碳能夺走铁的氧。把铁矿石与焦炭一起加热就得到铁。这件事我们做了三千年。',
          },
          action: { type: 'setParams', params: { metal: 6, question: 0 } },
          pause: 1,
        },
        {
          id: 'carbon-3',
          text: {
            en: 'Now move up to aluminium. It is above carbon, so carbon cannot take its oxygen — aluminium wants oxygen more than carbon does. Heating bauxite with coke does nothing at all.',
            zh: '现在往上移到铝。它在碳之上，所以碳夺不走它的氧——铝比碳更想要氧。把铝土矿和焦炭一起加热，什么都不会发生。',
          },
          action: { type: 'setParams', params: { metal: 4, question: 0 } },
        },
        {
          id: 'carbon-4',
          text: {
            en: 'The only way is to force it: electrolysis, pushing three electrons onto every aluminium ion. That takes enormous amounts of electricity, so aluminium stayed a precious metal until cheap power arrived. Napoleon III served his best guests on aluminium plates.',
            zh: '唯一的办法是强行进行电解，给每个铝离子推入三个电子。这需要巨量电力，所以在廉价电力出现之前，铝一直是贵金属。拿破仑三世用铝盘招待最尊贵的客人。',
          },
        },
        {
          id: 'carbon-5',
          text: {
            en: 'So the line across the series is carbon. Above it, electrolysis. Below it, heat with carbon. Right at the bottom, just dig it up. One line answers the whole topic.',
            zh: '所以横跨活动性顺序的这条线就是碳。线以上用电解，线以下用碳加热还原，最底下的直接挖出来。一条线回答了整个主题。',
          },
        },
      ],
    },
    {
      id: 'blast-furnace',
      type: 'concept',
      title: { en: 'Inside the blast furnace', zh: '高炉内部' },
      lines: [
        {
          id: 'bf-1',
          text: {
            en: 'Iron ore is haematite, iron(III) oxide. Into the top of the furnace go three things: the ore, coke, and limestone. Hot air is blasted in at the bottom.',
            zh: '铁矿石是赤铁矿，也就是氧化铁（III）。从炉顶加入三样东西：矿石、焦炭和石灰石。热空气从底部鼓入。',
          },
        },
        {
          id: 'bf-2',
          text: {
            en: 'The coke burns in the blast of air, which makes carbon dioxide and gets the furnace up to about fifteen hundred degrees. That carbon dioxide then rises through more hot coke and is reduced to carbon monoxide.',
            zh: '焦炭在鼓入的空气中燃烧，生成二氧化碳并把炉温升到约 1500 °C。二氧化碳上升时穿过更多热焦炭，被还原为一氧化碳。',
          },
        },
        {
          id: 'bf-3',
          text: {
            en: 'Carbon monoxide is the reducing agent that actually does the job. It takes the oxygen from the iron oxide, leaving molten iron that runs to the bottom of the furnace and is tapped off.',
            zh: '真正起作用的还原剂是一氧化碳。它从氧化铁中夺走氧，留下熔融的铁流到炉底被放出。',
          },
        },
        {
          id: 'bf-4',
          text: {
            en: 'And the limestone? The ore is contaminated with sand — silicon dioxide. Limestone decomposes to calcium oxide, which reacts with the sand to make slag. Slag floats on the iron and is drained separately.',
            zh: '那石灰石做什么？矿石中混有砂子，也就是二氧化硅。石灰石分解生成氧化钙，与砂子反应生成炉渣。炉渣浮在铁水上，单独排出。',
          },
        },
      ],
    },
    {
      id: 'rusting',
      type: 'concept',
      title: { en: 'Rusting needs two things', zh: '生锈需要两样东西' },
      lines: [
        {
          id: 'rust-1',
          text: {
            en: 'Having gone to all that trouble to get iron out of its oxide, it immediately starts turning back. Rusting is iron returning to iron oxide — but it needs both water and oxygen. Remove either one and it stops.',
            zh: '费尽力气把铁从氧化物中取出来，它却立刻开始变回去。生锈就是铁重新变成氧化铁——但必须同时有水和氧气。去掉任何一样，生锈就停止。',
          },
        },
        {
          id: 'rust-2',
          text: {
            en: 'That is the classic experiment: three test tubes with a nail in each. One with boiled water and a layer of oil on top — no oxygen, no rust. One with calcium chloride to dry the air — no water, no rust. One with both — rust.',
            zh: '这就是经典实验：三支试管各放一枚铁钉。一支用煮沸过的水并在上面覆一层油——没有氧气，不生锈。一支放氯化钙使空气干燥——没有水，不生锈。一支两者都有——生锈。',
          },
        },
        {
          id: 'rust-3',
          text: {
            en: 'So the simplest defence is a barrier: paint, grease, plastic, or a coating of another metal. Keep the water and oxygen off the surface and nothing can happen. But a barrier only works while it is intact.',
            zh: '所以最简单的防护就是隔离层：油漆、油脂、塑料，或者镀上另一种金属。让水和氧接触不到表面，就什么都不会发生。但隔离层只在完好时有效。',
          },
        },
      ],
    },
    {
      id: 'sacrificial',
      type: 'interaction',
      title: { en: 'Protection that survives a scratch', zh: '划伤后仍然有效的保护' },
      lines: [
        {
          id: 'sac-1',
          text: {
            en: 'Switch the question to protection. The line moves to iron, and now the rule is: a metal protects iron only if it is above it.',
            zh: '把问题切换到保护。线移到了铁，现在的规则是：只有位于铁之上的金属才能保护铁。',
          },
          action: { type: 'setParams', params: { metal: 5, question: 1 } },
        },
        {
          id: 'sac-2',
          text: {
            en: 'Zinc is above iron, so zinc corrodes first. Coat steel in zinc — galvanising — and you get two defences for the price of one: a barrier while the coating is whole, and sacrificial protection once it is scratched. The zinc is eaten away instead of the iron.',
            zh: '锌在铁之上，所以锌会先被腐蚀。把钢镀锌——即镀锌处理——你就一举得到两重防护：镀层完好时是隔离层，被划破后则起牺牲阳极保护。被消耗的是锌，不是铁。',
          },
          pause: 1,
        },
        {
          id: 'sac-3',
          text: {
            en: 'Now try copper, or tin. Both are below iron. A tin coating on a steel can is a barrier and nothing more — scratch it and the iron corrodes faster than bare steel would, because now the tin is helping it along.',
            zh: '再试试铜或锡，两者都在铁之下。马口铁罐上的锡层只是隔离层——一旦划破，铁的腐蚀反而比裸钢更快，因为此时锡在"帮倒忙"。',
          },
          action: { type: 'setParams', params: { metal: 7, question: 1 } },
        },
        {
          id: 'sac-4',
          text: {
            en: 'This is why ships and underground pipelines have blocks of zinc or magnesium bolted to them. The blocks corrode away and get replaced every few years; the hull does not.',
            zh: '这就是船体和地下管道上要焊接锌块或镁块的原因。这些块被腐蚀掉，每隔几年更换一次；而船体安然无恙。',
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
            en: 'Extraction: above carbon, electrolysis; below carbon, reduce with carbon; at the bottom, found native. Rusting needs water and oxygen, both of them. Sacrificial protection needs a metal above iron.',
            zh: '冶炼：碳以上用电解，碳以下用碳还原，最底部的直接以单质形式存在。生锈需要水和氧气，缺一不可。牺牲阳极保护需要位于铁之上的金属。',
          },
        },
        {
          id: 'summary-2',
          text: {
            en: 'For the blast furnace, learn the four equations and what each one is for: coke burns, carbon dioxide is reduced to carbon monoxide, carbon monoxide reduces the ore, limestone removes the sand.',
            zh: '关于高炉，把四个方程式连同各自的作用一起记住：焦炭燃烧、二氧化碳被还原为一氧化碳、一氧化碳还原矿石、石灰石除去砂子。',
          },
        },
      ],
    },
  ],
}

export default extractionNarration
