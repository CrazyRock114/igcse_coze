import type { NarrationScript } from '@/content/types'

export const ecosystemNarration: NarrationScript = {
  id: '19-1-ecosystems',
  sections: [
    {
      id: 'intro',
      type: 'intro',
      title: { en: 'Everything comes from the Sun', zh: '一切都来自太阳' },
      lines: [
        {
          id: 'intro-1',
          text: {
            en: 'The Sun is the principal source of energy for every biological system on Earth. Producers — green plants — capture a little of it by photosynthesis and store it in carbohydrates. Everything else eats.',
            zh: '太阳是地球上一切生物系统的主要能量来源。生产者——绿色植物——通过光合作用捕获其中的一小部分，并把它贮存在糖类中。其余的一切都靠"吃"。',
          },
        },
        {
          id: 'intro-2',
          text: {
            en: 'A food chain shows that energy being passed from one organism to the next. Grass, rabbit, fox. The arrows point along the direction the energy travels, which means they point from the eaten to the eater — a detail that costs marks every year when it is drawn backwards.',
            zh: '食物链表示能量从一种生物传递到下一种。草、兔、狐。箭头指向能量传递的方向，也就是从被吃者指向捕食者——每年都有人把箭头画反而丢分。',
          },
        },
        {
          id: 'intro-3',
          text: {
            en: 'The vocabulary is worth getting exact. A producer makes its own organic nutrients. A consumer feeds on other organisms — primary, secondary, tertiary and quaternary as you go up. A herbivore eats plants, a carnivore eats animals. A decomposer feeds on dead or waste organic matter. And a trophic level is simply an organism’s position in the chain.',
            zh: '这些术语值得弄准。生产者能自己制造有机养料。消费者以其他生物为食——依次为初级、次级、三级和四级。植食动物吃植物，肉食动物吃动物。分解者以死亡或废弃的有机物为食。而营养级不过是生物在食物链中所处的位置。',
          },
        },
        {
          id: 'intro-4',
          text: {
            en: 'Real ecosystems are not chains but webs, because almost nothing eats only one thing. That matters practically: remove one species from a web and every organism connected to it is affected. Overharvest a fish and its predators starve while what it fed on multiplies. Introduce a species with no predator of its own and it does the same damage from the other direction.',
            zh: '真实的生态系统不是链而是网，因为几乎没有什么只吃一种东西。这有实际意义：从网中移走一个物种，所有与之相连的生物都会受影响。过度捕捞某种鱼，它的捕食者会挨饿，而它原本吃的东西则大量繁殖。引入一个没有天敌的物种，则会从另一个方向造成同样的破坏。',
          },
        },
      ],
    },
    {
      id: 'pyramids',
      type: 'interaction',
      title: { en: 'Three ways to draw the same chain', zh: '同一条链的三种画法' },
      lines: [
        {
          id: 'pyr-1',
          text: {
            en: 'A pyramid puts the producers at the bottom and each level above the one it eats, with the width showing how much there is. Start with grassland, counted as individuals: a great deal of grass, fewer rabbits, fewer foxes still. A proper pyramid.',
            zh: '金字塔把生产者放在底层，每一层压在它所吃的那一层之上，宽度表示数量的多少。先看草地，按个体数计：草非常多，兔较少，狐更少。这是一个标准的金字塔。',
          },
          action: { type: 'setParams', params: { ecosystem: 1, kind: 1, transfer: 10 } },
        },
        {
          id: 'pyr-2',
          text: {
            en: 'Now switch to the oak woodland, still counting individuals. One oak tree. Half a million insects living on it. The diagram stands on its point — it is not a pyramid at all.',
            zh: '现在切换到橡树林，仍然按个体数计。一棵橡树，上面生活着五十万只昆虫。图形立在了尖端上——这根本不是金字塔。',
          },
          action: { type: 'setParams', params: { ecosystem: 2, kind: 1, transfer: 10 } },
          pause: 1,
        },
        {
          id: 'pyr-3',
          text: {
            en: 'Nothing is wrong with the woodland. What is wrong is counting. A count treats one oak tree and one greenfly as the same thing, and they are not remotely the same thing.',
            zh: '橡树林本身没有任何问题，有问题的是"计数"这件事。计数把一棵橡树和一只蚜虫当作同一样东西，而它们完全不是同一样东西。',
          },
        },
        {
          id: 'pyr-4',
          text: {
            en: 'So weigh them instead. The same woodland, measured as biomass — the dry mass of living material — turns the right way up immediately. That is the advantage of a pyramid of biomass: it does not care how the material is divided into individuals.',
            zh: '那就改为称重。同一片橡树林，以生物量——生物体的干重——来衡量，立刻就正过来了。这就是生物量金字塔的优点：它不在乎这些物质是怎样分给一个个个体的。',
          },
          action: { type: 'setParams', params: { ecosystem: 2, kind: 2, transfer: 10 } },
        },
        {
          id: 'pyr-5',
          text: {
            en: 'Biomass has a fault of its own, though. It is a snapshot, taken on one day. In the sea the phytoplankton are eaten almost as fast as they grow, so at any instant there is less of them than of the animals feeding on them — and a pyramid of biomass for open water can come out inverted too, even though the plankton produce far more over a year.',
            zh: '不过生物量也有自己的缺陷：它是某一天拍下的快照。在海洋中，浮游植物几乎是刚长出来就被吃掉，因此在任一瞬间它们的量都少于以其为食的动物——于是开阔水域的生物量金字塔也可能是倒置的，尽管浮游植物全年的产量要多得多。',
          },
        },
        {
          id: 'pyr-6',
          text: {
            en: 'Which is why the pyramid of energy is the best of the three. It measures energy passed on per unit area per year, so it covers a whole year rather than one moment, and it can never be inverted — a level cannot pass on more energy than it received.',
            zh: '这正是能量金字塔最好的原因。它测量的是单位面积每年传递的能量，因此覆盖的是一整年而不是某一瞬间，而且它永远不可能倒置——一个营养级不可能传出比它接收到的更多的能量。',
          },
          action: { type: 'setParams', params: { ecosystem: 2, kind: 3, transfer: 10 } },
        },
      ],
    },
    {
      id: 'energy',
      type: 'interaction',
      title: { en: 'Where the other ninety per cent goes', zh: '另外那百分之九十去哪了' },
      lines: [
        {
          id: 'en-1',
          text: {
            en: 'Roughly ten per cent of the energy in one trophic level reaches the next. Look at what that does down the chain: the numbers fall off a cliff.',
            zh: '一个营养级中大约只有 10% 的能量能到达下一级。看看这在整条链上造成了什么：数字断崖式下跌。',
          },
          action: { type: 'setParams', params: { ecosystem: 2, kind: 3, transfer: 10 } },
        },
        {
          id: 'en-2',
          text: {
            en: 'The ninety per cent is not destroyed. Most of it is respired — used to move, to grow, and in a mammal or a bird to stay warm — and leaves as heat. Some is excreted as urea. Some is egested, never digested at all. And a good deal is simply never eaten: roots, bones, the parts nothing wants.',
            zh: '那 90% 并没有消失。其中大部分用于呼吸作用——用来运动、生长，哺乳动物和鸟类还要维持体温——最终以热的形式散失。一部分以尿素的形式排泄掉，一部分未经消化就被排遗。还有相当一部分根本没被吃掉：根、骨头，以及没有生物想要的部分。',
          },
        },
        {
          id: 'en-3',
          text: {
            en: 'Now the consequence. Look at the reading for a fifth trophic level. Of the fifty thousand kilojoules the oak captured, a fifth-level carnivore would be left with about five. There is not enough energy left to keep an animal alive, and that is why food chains almost never have more than four or five levels. Not a rule someone made up — an arithmetic result.',
            zh: '接下来看后果。看第五营养级的读数：橡树捕获的五万千焦，到第五级的肉食动物那里只剩下约 5 千焦。剩下的能量已不足以维持一只动物存活，这就是食物链几乎从不超过四五个营养级的原因。这不是谁定下的规矩，而是算出来的结果。',
          },
        },
        {
          id: 'en-4',
          text: {
            en: 'Try lowering the transfer to five per cent and watch the top of the chain collapse further. Then raise it. Ecosystems where the animals are cold-blooded — they spend nothing on staying warm — really do transfer more, and really do support longer chains.',
            zh: '试着把传递效率降到 5%，看链条顶端如何进一步崩塌。然后再调高。在动物是变温动物的生态系统中——它们不必花费能量维持体温——传递效率确实更高，也确实能支持更长的食物链。',
          },
          action: { type: 'setParams', params: { ecosystem: 2, kind: 3, transfer: 5 } },
          pause: 1,
        },
        {
          id: 'en-5',
          text: {
            en: 'And the last reading is the one that matters outside the exam. A field of wheat eaten by people feeds about ten times as many as the same field grazed by cattle that people then eat. Every trophic level you add throws away ninety per cent. That is the whole argument, and it is one line of arithmetic.',
            zh: '最后一个读数是走出考场后真正重要的那个。一块种小麦供人直接食用的田地，养活的人数约是同一块地放牧肉牛再供人食用的十倍。每增加一个营养级，就扔掉 90%。整个论证就是这样，而它只是一行算术。',
          },
          action: { type: 'setParams', params: { ecosystem: 1, kind: 3, transfer: 10 } },
        },
      ],
    },
    {
      id: 'cycles',
      type: 'concept',
      title: { en: 'Energy flows, matter goes round', zh: '能量流动，物质循环' },
      lines: [
        {
          id: 'cyc-1',
          text: {
            en: 'Notice the difference between energy and matter. Energy enters as sunlight and leaves as heat — it flows one way, and the Sun has to keep supplying it. Atoms do not leave. The carbon in you was in the air, and will be again.',
            zh: '注意能量与物质的区别。能量以阳光进入，以热散失——它单向流动，太阳必须持续供应。而原子不会离开。你体内的碳曾经在空气中，将来还会回到空气中。',
          },
        },
        {
          id: 'cyc-2',
          text: {
            en: 'The carbon cycle: photosynthesis takes carbon dioxide out of the air and fixes it into carbohydrates. Respiration in plants, animals and decomposers puts it back. Combustion of wood and fossil fuels puts it back much faster. Decomposition returns the carbon in anything that dies.',
            zh: '碳循环：光合作用把二氧化碳从空气中取出，固定成糖类。植物、动物与分解者的呼吸作用把它送回去。木材和化石燃料的燃烧则以快得多的速度把它送回去。分解作用把一切死亡生物中的碳归还回去。',
          },
        },
        {
          id: 'cyc-3',
          text: {
            en: 'The nitrogen cycle needs microorganisms at nearly every step, which is the part to learn. Nitrogen-fixing bacteria turn nitrogen gas into compounds plants can use. Decomposers break proteins in dead matter down to ammonium. Nitrifying bacteria oxidise ammonium to nitrite and then to nitrate, which is the form roots absorb. Denitrifying bacteria undo it all and return nitrogen gas to the air.',
            zh: '氮循环几乎每一步都需要微生物，这正是要记的部分。固氮细菌把氮气转化为植物可利用的化合物。分解者把死亡有机物中的蛋白质分解为铵。硝化细菌把铵氧化为亚硝酸盐、再氧化为硝酸盐，而硝酸盐正是根所吸收的形式。反硝化细菌则把这一切逆转，把氮气还给空气。',
          },
        },
        {
          id: 'cyc-4',
          text: {
            en: 'Nitrogen gas is four fifths of the air and almost no organism can touch it — the triple bond is too strong. Nearly all the nitrogen in every protein in your body got there because a bacterium broke that bond first.',
            zh: '氮气占空气的五分之四，却几乎没有生物能利用它——三键太强了。你体内每一种蛋白质中的氮，几乎全都是因为某种细菌先打断了那个键才得以进入的。',
          },
        },
      ],
    },
    {
      id: 'populations',
      type: 'concept',
      title: { en: 'Why a population stops growing', zh: '种群为什么会停止增长' },
      lines: [
        {
          id: 'pop-1',
          text: {
            en: 'A population is one species living in the same area at the same time. All the populations together are a community, and the community plus its physical environment is an ecosystem.',
            zh: '种群是在同一时间生活在同一区域的同一物种。所有种群合起来是群落，群落再加上它的物理环境就是生态系统。',
          },
        },
        {
          id: 'pop-2',
          text: {
            en: 'Put a few organisms into a new habitat with plenty of food and the population grows in a shape you can recognise anywhere. First a lag phase: numbers barely move while the organisms settle, mature and begin to reproduce. There are too few of them to make much difference yet.',
            zh: '把少量生物放进食物充足的新生境中，种群的增长会呈现出一种到处都能认出的形状。先是延滞期：数量几乎不动，生物在适应、成熟并开始繁殖。此时个体太少，还形不成气候。',
          },
        },
        {
          id: 'pop-3',
          text: {
            en: 'Then the exponential phase, and it is exponential for a reason worth stating: every individual can reproduce, so the more there are the faster more appear. Food is plentiful, waste has not built up, predators have not found them. Nothing is holding it back.',
            zh: '接着是指数期，而它之所以呈指数增长，原因值得说清楚：每一个个体都能繁殖，因此数量越多，新增得越快。此时食物充足、废物尚未积累、捕食者还没找上门。没有什么在拖住它。',
          },
        },
        {
          id: 'pop-4',
          text: {
            en: 'It cannot last. Food runs short, space runs out, waste accumulates, disease spreads more easily in a crowd and predators arrive. Births and deaths come into balance and the curve flattens into the stationary phase — the population is at the carrying capacity of the habitat.',
            zh: '这不可能持续。食物短缺、空间用尽、废物积累、疾病在密集中更易传播、捕食者也来了。出生与死亡趋于平衡，曲线变平进入稳定期——种群达到了该生境的环境容纳量。',
          },
        },
        {
          id: 'pop-5',
          text: {
            en: 'And in a closed container there is a fourth phase the sigmoid curve does not always show: the death phase, where the food is gone and the waste is toxic, and deaths outnumber births. A wild population does not usually get there, because the stationary phase is a balance rather than a ceiling it crashes into.',
            zh: '而在封闭容器中还有 S 形曲线并不总会显示的第四个阶段：衰亡期——食物耗尽、废物有毒，死亡超过出生。野外种群通常不会走到这一步，因为稳定期是一种平衡，而不是它撞上去的天花板。',
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
            en: 'Arrows in a food chain point from the eaten to the eater, along the flow of energy. Energy flows through and is lost as heat; matter cycles round and is not.',
            zh: '食物链中的箭头由被吃者指向捕食者，沿着能量流动的方向。能量流经系统并以热的形式散失；物质则循环往复，不会消失。',
          },
        },
        {
          id: 'sum-2',
          text: {
            en: 'About ten per cent passes to the next level. The rest is respired, excreted, egested or never eaten — name at least two of those if you are asked why the transfer is inefficient. And that ten per cent is why food chains are short, and why eating the crop feeds more people than eating the animal that ate the crop.',
            zh: '大约 10% 传递到下一级。其余的用于呼吸作用、被排泄、被排遗，或根本没被吃掉——被问到传递为何低效时，至少要说出其中两项。而正是这 10% 决定了食物链为何短，以及为何直接吃作物比吃那些吃了作物的动物能养活更多人。',
          },
        },
        {
          id: 'sum-3',
          text: {
            en: 'A pyramid of numbers can be inverted, because it counts an oak tree as one. A pyramid of biomass usually is not, but it is only a snapshot. A pyramid of energy never is, and that is why it is the best of the three.',
            zh: '数量金字塔可能倒置，因为它把一棵橡树也只算作"一"。生物量金字塔通常不会，但它只是一张快照。能量金字塔永远不会倒置，这正是它在三者中最好的原因。',
          },
        },
      ],
    },
  ],
}

export default ecosystemNarration
