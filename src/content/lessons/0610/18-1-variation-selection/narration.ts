import type { NarrationScript } from '@/content/types'

export const selectionNarration: NarrationScript = {
  id: '18-1-variation-selection',
  sections: [
    {
      id: 'variation',
      type: 'intro',
      title: { en: 'Two shapes of difference', zh: '差异的两种形态' },
      lines: [
        {
          id: 'va-1',
          text: {
            en: 'Variation is the differences between individuals of the same species, and it comes in two shapes. Continuous variation gives a whole range between two extremes — height, mass, leaf length — and plotted as a graph it makes a smooth bell curve.',
            zh: '变异是同种个体之间的差异，它有两种形态。连续变异在两个极端之间给出完整的连续范围——身高、体重、叶长——画成图是一条平滑的钟形曲线。',
          },
        },
        {
          id: 'va-2',
          text: {
            en: 'Discontinuous variation gives a limited number of distinct categories with nothing in between — blood group A, B, AB or O; able to roll your tongue or not. Plotted, it makes separate bars.',
            zh: '不连续变异只给出有限的几个截然不同的类别，中间没有过渡——血型 A、B、AB 或 O；能不能卷舌。画成图是彼此分开的柱形。',
          },
        },
        {
          id: 'va-3',
          text: {
            en: 'And the shape tells you the cause. Discontinuous variation is controlled by genes alone, usually one gene with a few alleles. Continuous variation is controlled by several genes together *and* is affected by the environment — which is why identical twins are not identical heights.',
            zh: '而形态本身就说明了原因。不连续变异完全由基因决定，通常是一个基因的少数几个等位基因。连续变异由多个基因共同决定，*而且*受环境影响——这就是为什么同卵双胞胎身高并不完全相同。',
          },
        },
        {
          id: 'va-4',
          text: {
            en: 'Where does new variation come from? Mutation — a random change in the DNA base sequence. Mutation is the only way a genuinely new allele can arise, and it happens at a low rate all the time. Ionising radiation and some chemicals raise that rate.',
            zh: '新的变异从哪里来？突变——DNA 碱基序列的随机改变。突变是产生真正全新等位基因的唯一途径，它以低频率持续发生。电离辐射和某些化学物质会提高这个频率。',
          },
        },
      ],
    },
    {
      id: 'selection',
      type: 'interaction',
      title: { en: 'Nothing here changes an individual', zh: '这里没有任何个体发生改变' },
      lines: [
        {
          id: 'se-1',
          text: {
            en: 'Natural selection is four steps. There is variation in a population. More offspring are produced than can survive, so there is competition. Individuals with an advantageous feature are more likely to survive and reproduce. And because the feature is inherited, more of the next generation have it.',
            zh: '自然选择有四步。种群中存在变异。产生的后代多于能存活的数量，因此存在竞争。具有有利特征的个体更可能存活并繁殖。而由于该特征可遗传，下一代中拥有它的比例就更高。',
          },
          action: { type: 'setParams', params: { startingFrequency: 2, pressure: 30, mutationRate: 0, generations: 25 } },
        },
        {
          id: 'se-2',
          text: {
            en: 'Watch the allele spread. It starts in two per cent of the population and ends in nearly all of it. And here is the thing to hold on to: nothing in this model ever changed an individual. Not one organism adapted to anything. The only thing that changed is how many of each kind there are.',
            zh: '看这个等位基因如何扩散。它一开始只存在于 2% 的个体中，最后几乎遍及全部。而要牢牢记住的是：这个模型中从未有任何个体发生改变。没有一个生物"适应"了什么。改变的只是各类个体的数量比例。',
          },
        },
        {
          id: 'se-3',
          text: {
            en: 'That is the sentence students most often get wrong. Organisms do not change to suit their environment. The environment changes which organisms are left. Adaptation is something that happens to a population over generations, not to an individual during its life.',
            zh: '这正是学生最常写错的一句话。生物不会为了适应环境而改变，是环境改变了哪些生物能留下来。适应是种群在世代间发生的事，而不是个体在一生中发生的事。',
          },
        },
        {
          id: 'se-4',
          text: {
            en: 'Now set the starting frequency to zero, leave the selection pressure at maximum, and watch. Nothing happens. The line stays flat forever, however hard the environment pushes.',
            zh: '现在把起始频率设为零，选择压力保持最大，然后观察。什么也没发生。无论环境施加多大的压力，这条线永远是平的。',
          },
          action: { type: 'setParams', params: { startingFrequency: 0, pressure: 100, mutationRate: 0, generations: 25 } },
          pause: 1,
        },
        {
          id: 'se-5',
          text: {
            en: 'Because selection can only act on variation that is already there. It has no power to create an allele that does not exist. Which is exactly what mutation is for — turn the mutation rate up and the allele appears from nothing, and then selection has something to work on.',
            zh: '因为选择只能作用于已经存在的变异，它没有能力创造出并不存在的等位基因。这正是突变的意义所在——把突变率调高，等位基因就从无到有地出现，选择这才有了可作用的对象。',
          },
          action: { type: 'setParams', params: { startingFrequency: 0, pressure: 100, mutationRate: 8, generations: 25 } },
        },
        {
          id: 'se-6',
          text: {
            en: 'And notice that mutation happens whether or not it is useful. Set the selection pressure to zero and the mutation still supplies new copies — slowly, and going nowhere. Mutation is random with respect to advantage. It does not know what the population needs.',
            zh: '还要注意，突变不管有用无用都会发生。把选择压力设为零，突变仍在提供新的拷贝——只是很慢，而且哪儿也去不了。突变相对于"是否有利"是随机的，它并不知道种群需要什么。',
          },
          action: { type: 'setParams', params: { startingFrequency: 0, pressure: 0, mutationRate: 8, generations: 25 } },
        },
        {
          id: 'se-7',
          text: {
            en: 'The dashed line is the control — the same population with no selection at all. It is worth having, because without it you cannot tell how much of the change was selection and how much was simply mutation trickling in.',
            zh: '虚线是对照——同一个种群，完全没有选择作用。有它很重要，因为没有它你就无法分辨变化中有多少来自选择、有多少只是突变缓慢累积的结果。',
          },
        },
      ],
    },
    {
      id: 'antibiotics',
      type: 'concept',
      title: { en: 'The same thing, in a hospital', zh: '同样的事，发生在医院里' },
      lines: [
        {
          id: 'ab-1',
          text: {
            en: 'Antibiotic resistance is natural selection you can watch happen in a human lifetime. In a large population of bacteria, mutation produces a few individuals resistant to a particular antibiotic — before the antibiotic is ever used.',
            zh: '抗生素耐药性是你能在一个人的一生中亲眼看到的自然选择。在庞大的细菌种群中，突变会产生少数对某种抗生素耐药的个体——而这发生在抗生素被使用之前。',
          },
        },
        {
          id: 'ab-2',
          text: {
            en: 'Give the antibiotic and the non-resistant bacteria die. The resistant few survive, and with the competition removed they reproduce rapidly — bacteria divide every twenty minutes — and pass the resistance allele on.',
            zh: '使用抗生素后，不耐药的细菌死去。少数耐药个体存活下来，竞争者被清除后它们迅速繁殖——细菌每二十分钟分裂一次——并把耐药等位基因传下去。',
          },
        },
        {
          id: 'ab-3',
          text: {
            en: 'Within a few days the population is mostly resistant. Not because any bacterium changed, and not because they got used to the drug — because the drug removed everything except the ones that already happened to survive it.',
            zh: '几天之内，整个种群就以耐药者为主了。这不是因为哪个细菌发生了改变，也不是因为它们"习惯"了药物——而是因为药物清除了除本来就恰好能存活的那些以外的一切。',
          },
        },
      ],
    },
    {
      id: 'adaptations',
      type: 'concept',
      title: { en: 'Built for where they live', zh: '为生存之地而生' },
      lines: [
        {
          id: 'ad-1',
          text: {
            en: 'An adaptive feature is an inherited feature that helps an organism survive and reproduce in its environment. Inherited is the operative word — a suntan is not an adaptive feature, because it is not passed on.',
            zh: '适应性特征是有助于生物在其环境中生存与繁殖的、可遗传的特征。"可遗传"是关键词——晒黑不是适应性特征，因为它不会遗传。',
          },
        },
        {
          id: 'ad-2',
          text: {
            en: 'A xerophyte lives where water is scarce, and every feature is about keeping it. A thick waxy cuticle. Few stomata, and sunken into pits where humid air collects. Leaves reduced to spines, cutting the surface area right down. Deep or very wide roots. And often a swollen stem storing water.',
            zh: '旱生植物生活在缺水之地，它的每一个特征都是为了保住水分：厚厚的蜡质角质层；气孔少，且凹陷在小坑中以聚集潮湿空气；叶退化成刺，把表面积大幅削减；根系很深或很广；茎往往膨大以贮水。',
          },
        },
        {
          id: 'ad-3',
          text: {
            en: 'A hydrophyte lives in water and has the opposite problems. It needs no support, because water holds it up, so it has little strengthening tissue. It needs air, so it has large air spaces in the tissues to float and to store oxygen. And its stomata are on the upper surface of the leaf, the only side in contact with air.',
            zh: '水生植物生活在水中，面临的问题正相反。它不需要支撑，因为水会托住它，所以加强组织很少。它需要空气，因此组织中有大的气腔用来漂浮和贮存氧气。而它的气孔长在叶的上表面——那是唯一与空气接触的一面。',
          },
        },
      ],
    },
    {
      id: 'breeding',
      type: 'concept',
      title: { en: 'When the selector is a person', zh: '当选择者是人的时候' },
      lines: [
        {
          id: 'bd-1',
          text: {
            en: 'Selective breeding is the same arithmetic with a human doing the choosing. Select the individuals with the desired feature, breed them together, select again from the offspring, and repeat over many generations.',
            zh: '选择育种是同样的算术，只是由人来做选择。选出具有目标特征的个体，让它们交配，再从后代中继续选择，如此重复许多世代。',
          },
        },
        {
          id: 'bd-2',
          text: {
            en: 'It is how every crop and every farm animal came to be what it is — wheat with larger grains, cows producing more milk, dogs from wolves. And it is far faster than natural selection, for a simple reason: a breeder can apply a selection pressure far stronger than anything the wild applies. Turn the pressure up on the graph and watch the generations needed collapse.',
            zh: '所有作物和家畜都是这样变成今天的样子的——籽粒更大的小麦、产奶更多的奶牛、由狼而来的狗。它比自然选择快得多，原因很简单：育种者能施加的选择压力，远强于野外的任何压力。把图上的压力调高，看所需世代数如何骤减。',
          },
        },
        {
          id: 'bd-3',
          text: {
            en: 'The difference between the two is only who does the selecting, and what for. Natural selection favours whatever helps the organism survive and reproduce. Artificial selection favours whatever the person wants — which may be no use to the organism at all.',
            zh: '两者的区别只在于由谁来选择、为了什么而选择。自然选择偏爱一切有助于生物生存与繁殖的特征。人工选择偏爱人所想要的特征——而那对生物本身可能毫无用处。',
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
            en: 'Never write that organisms change to suit their environment. Write: there was already variation; those with the advantageous allele survived and reproduced; they passed it on; so the proportion with it increased over generations.',
            zh: '绝不要写"生物为了适应环境而改变"。要写：本来就存在变异；携带有利等位基因的个体存活并繁殖；它们把它传了下去；因此拥有该基因的比例在世代间增加。',
          },
        },
        {
          id: 'sum-2',
          text: {
            en: 'Mutation is the source of new alleles and it is random — it happens whether or not the allele is useful. Selection cannot create variation; it can only change how common the variation already there is.',
            zh: '突变是新等位基因的来源，而且是随机的——不论该等位基因有用与否都会发生。选择不能创造变异，只能改变已有变异的常见程度。',
          },
        },
        {
          id: 'sum-3',
          text: {
            en: 'Continuous variation: many genes plus the environment, a smooth range. Discontinuous variation: genes alone, distinct categories. The shape of the graph tells you which.',
            zh: '连续变异：多基因加环境，呈平滑的连续范围。不连续变异：仅由基因决定，呈离散的类别。图形的形状就能告诉你是哪一种。',
          },
        },
      ],
    },
  ],
}

export default selectionNarration
