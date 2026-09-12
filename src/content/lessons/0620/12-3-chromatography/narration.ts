import type { NarrationScript } from '@/content/types'

export const chromatographyNarration: NarrationScript = {
  id: '12-3-chromatography',
  sections: [
    {
      id: 'apparatus',
      type: 'intro',
      title: { en: 'The right instrument for the quantity', zh: '量什么用什么仪器' },
      lines: [
        {
          id: 'ap-1',
          text: {
            en: 'Before any technique, the measurements. Time with a stopwatch or a clock; temperature with a thermometer; mass with a balance; volume of a liquid with a measuring cylinder, a pipette or a burette; volume of a gas with a gas syringe.',
            zh: '在讲技术之前先说测量。时间用秒表或钟；温度用温度计；质量用天平；液体体积用量筒、移液管或滴定管；气体体积用注射器。',
          },
        },
        {
          id: 'ap-2',
          text: {
            en: 'The three liquid instruments are not interchangeable, and choosing between them is an assessed skill. A measuring cylinder is quick but approximate. A pipette delivers one fixed volume very accurately. A burette delivers any volume you like and lets you read off exactly how much was added, which is why it is the one used for titrations.',
            zh: '三种量取液体的仪器不能互换，选择哪一种是考查的技能。量筒快但不精确。移液管只能准确量取一个固定体积。滴定管可以放出任意体积，并能读出加入了多少，这正是滴定使用它的原因。',
          },
        },
        {
          id: 'ap-3',
          text: {
            en: 'Three words to keep straight. The solute is the substance that dissolves; the solvent is the liquid it dissolves in; the solution is the two together. And a saturated solution is one that has dissolved as much solute as it can at that temperature — add more and it sits on the bottom.',
            zh: '有三个词要分清。溶质是被溶解的物质；溶剂是溶解它的液体；溶液是两者的混合物。而饱和溶液是在该温度下已溶解了最多溶质的溶液——再加就会沉在底部。',
          },
        },
        {
          id: 'ap-4',
          text: {
            en: 'The temperature matters in that definition. A solution saturated at twenty degrees will usually dissolve more if warmed, and will drop crystals out again if cooled — which is the whole basis of purification by crystallisation.',
            zh: '这个定义中的温度很重要。在 20 度饱和的溶液加热后通常还能溶解更多，冷却时又会析出晶体——这正是结晶提纯的全部依据。',
          },
        },
      ],
    },
    {
      id: 'separating',
      type: 'concept',
      title: { en: 'Choosing how to separate', zh: '如何选择分离方法' },
      lines: [
        {
          id: 'se-1',
          text: {
            en: 'Which technique to use is decided by what the two substances differ in. Filtration separates an insoluble solid from a liquid: the solid stays on the paper as the residue, the liquid passes through as the filtrate.',
            zh: '用哪种方法，取决于两种物质在什么性质上不同。过滤把不溶固体与液体分开：固体作为残渣留在滤纸上，液体作为滤液流过。',
          },
        },
        {
          id: 'se-2',
          text: {
            en: 'Crystallisation recovers a soluble solid from its solution: warm to evaporate some of the solvent, stop while it is still hot, and let it cool so crystals form. Evaporating right to dryness would leave any impurities behind with the crystals, which is why it is not the same thing.',
            zh: '结晶从溶液中回收可溶固体：加热蒸发部分溶剂，趁热停止，冷却使晶体析出。若一直蒸干，杂质会和晶体一起留下，所以两者并不相同。',
          },
        },
        {
          id: 'se-3',
          text: {
            en: 'Simple distillation gets the solvent back from a solution — the liquid boils, the vapour passes through a condenser and drips out pure, leaving the dissolved solid behind. Fractional distillation separates two liquids from each other, using the difference between their boiling points, and needs a fractionating column.',
            zh: '简单蒸馏从溶液中取回溶剂——液体沸腾，蒸气经冷凝管冷凝后滴出纯净液体，溶解的固体留在原处。分馏则利用两种液体沸点的差异把它们彼此分开，需要分馏柱。',
          },
        },
        {
          id: 'se-4',
          text: {
            en: 'And melting and boiling points do a second job: identifying a substance and judging how pure it is. A pure substance melts at one sharp temperature. An impure one melts over a range, and melts lower than it should — which is why salt is put on icy roads.',
            zh: '熔点和沸点还有第二个用途：鉴定物质并判断纯度。纯净物在一个确定的温度熔化。不纯的物质在一个温度范围内熔化，而且熔点偏低——这正是在结冰的路面撒盐的原因。',
          },
        },
      ],
    },
    {
      id: 'chromatography',
      type: 'interaction',
      title: { en: 'The number that does not move', zh: '那个不会变的数' },
      lines: [
        {
          id: 'ch-1',
          text: {
            en: 'Paper chromatography separates a mixture of soluble coloured substances. A spot of the mixture goes on a pencil line near the bottom of the paper, and the bottom edge dips into a solvent — below the line, so the spot is not simply washed off.',
            zh: '纸色谱分离可溶有色物质的混合物。把混合物点在纸下方的铅笔线上，纸的下缘浸入溶剂——液面要低于铅笔线，以免斑点被直接冲掉。',
          },
          action: { type: 'setParams', params: { solventDistance: 8, mixture: 0, selected: 0 } },
        },
        {
          id: 'ch-2',
          text: {
            en: 'The line is drawn in pencil for a reason worth stating in an answer: ink would dissolve in the solvent and run up the paper along with everything else, ruining the chromatogram. Pencil is graphite, and graphite does not dissolve.',
            zh: '基线用铅笔画，其中的道理值得写进答案：墨水会溶于溶剂并随之上行，把色谱图毁掉。铅笔芯是石墨，而石墨不溶。',
          },
        },
        {
          id: 'ch-3',
          text: {
            en: 'The solvent rises up the paper and carries the substances with it. Each one travels at its own rate — the more soluble it is in the solvent and the less strongly it is held by the paper, the further it goes. So a mixture becomes a column of separate spots.',
            zh: '溶剂沿纸上升，把各物质一同带上去。每种物质有自己的移动速率——在溶剂中越易溶、被纸吸附得越弱，走得越远。于是混合物变成一列彼此分开的斑点。',
          },
        },
        {
          id: 'ch-4',
          text: {
            en: 'To identify them, run reference substances alongside. A spot in the unknown at the same height as a reference is that substance. Look at the unknown lane and the four references, and read off which are present.',
            zh: '为了鉴定它们，在旁边同时跑参照物。未知样品中与某参照物高度相同的斑点就是该物质。看未知样品那一列与四个参照物，读出其中含有哪些。',
          },
        },
        {
          id: 'ch-5',
          text: {
            en: 'Now the important part. Slide the solvent distance up and watch what happens. Every spot moves further from the baseline — the distances all change. Slide it back down and they all shrink again.',
            zh: '现在是关键部分。把溶剂前沿距离滑大，看会发生什么。每个斑点都离基线更远——所有距离都变了。再滑回去，它们又都缩小。',
          },
          action: { type: 'setParams', params: { solventDistance: 14, mixture: 0, selected: 0 } },
        },
        {
          id: 'ch-6',
          text: {
            en: 'But look at the numbers beside the spots: not one of them changed. That is the retention factor, Rf — the distance the spot moved divided by the distance the solvent moved. Both distances grew in the same proportion, so the ratio stayed put.',
            zh: '但看斑点旁边的数字：没有一个改变。那就是比移值 Rf——斑点移动的距离除以溶剂移动的距离。两个距离按相同比例增大，所以比值不变。',
          },
        },
        {
          id: 'ch-7',
          text: {
            en: 'Which is why Rf is worth quoting and a distance is not. A distance describes one particular run of one particular plate. An Rf describes the substance in that solvent, so it can be compared with a value someone else measured in a different laboratory on a different day.',
            zh: '这就是 Rf 值得被引用而距离不值得的原因。距离只描述某一次实验中的某一张纸。Rf 描述的是该物质在该溶剂中的性质，因此可以与别人在另一个实验室、另一天测得的数值比较。',
          },
          action: { type: 'setParams', params: { solventDistance: 8, mixture: 2, selected: 1 } },
        },
        {
          id: 'ch-8',
          text: {
            en: 'Two measuring details that get marks. Measure to the centre of each spot, not its bottom or top — spots spread as they travel. And mark the solvent front in pencil the moment the paper comes out of the tank, because it evaporates within a minute and then cannot be found at all.',
            zh: '有两个测量细节能得分。要量到每个斑点的中心，而不是下缘或上缘——斑点在移动过程中会扩散。而且纸一从槽中取出就要用铅笔标出溶剂前沿，因为它一分钟内就会蒸发，之后完全找不到了。',
          },
        },
        {
          id: 'ch-9',
          text: {
            en: 'One last problem. All of this assumes you can see the spots — and most substances are colourless. Amino acids and sugars separate perfectly well and leave nothing visible at all.',
            zh: '还有最后一个问题。这一切都假定你能看见斑点——而大多数物质是无色的。氨基酸和糖能很好地分离，却完全看不出任何痕迹。',
          },
        },
        {
          id: 'ch-10',
          text: {
            en: 'The answer is a locating agent: a chemical sprayed onto the dried chromatogram that reacts with the spots to make them visible. Ninhydrin is the one used for amino acids, turning each spot purple. Without it the separation still happened; you simply could not read it.',
            zh: '办法是显色剂：喷在晾干的色谱纸上、与斑点反应使其显现的化学试剂。检验氨基酸用茚三酮，使每个斑点变成紫色。没有它，分离照样发生了；只是你读不出来。',
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
            en: 'Solute dissolves in solvent to make a solution; a saturated solution holds as much as it can at that temperature. Filtration for an insoluble solid, crystallisation for a soluble one, simple distillation for the solvent, fractional distillation for two liquids.',
            zh: '溶质溶于溶剂成为溶液；饱和溶液在该温度下已溶解到最大限度。不溶固体用过滤，可溶固体用结晶，取回溶剂用简单蒸馏，分离两种液体用分馏。',
          },
        },
        {
          id: 'sum-2',
          text: {
            en: 'A pure substance melts at a sharp temperature; an impurity lowers the melting point and spreads it into a range.',
            zh: '纯净物在确定的温度熔化；杂质会降低熔点并把它拉成一个范围。',
          },
        },
        {
          id: 'sum-3',
          text: {
            en: 'Rf is the distance moved by the spot divided by the distance moved by the solvent, measured to the centre of the spot. It is the same however long the plate is run, which is what makes it worth quoting. Colourless substances need a locating agent.',
            zh: 'Rf 等于斑点移动距离除以溶剂移动距离，量到斑点中心。无论层析跑多久它都不变，这正是它值得引用的原因。无色物质需要用显色剂。',
          },
        },
      ],
    },
  ],
}

export default chromatographyNarration
