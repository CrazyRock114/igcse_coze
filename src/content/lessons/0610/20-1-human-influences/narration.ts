import type { NarrationScript } from '@/content/types'

export const humanInfluencesNarration: NarrationScript = {
  id: '20-1-human-influences',
  sections: [
    {
      id: 'food',
      type: 'intro',
      title: { en: 'Feeding eight billion people', zh: '养活八十亿人' },
      lines: [
        {
          id: 'fd-1',
          text: {
            en: 'Food production has been increased in four main ways: machinery, so larger areas can be worked; chemical fertilisers, so crops grow faster; herbicides and pesticides, so less is lost to weeds and pests; and selective breeding, so each plant and animal yields more.',
            zh: '提高粮食产量主要有四种方式：机械化，使更大面积得以耕作；化肥，使作物生长更快；除草剂与杀虫剂，减少杂草和害虫造成的损失；以及选择育种，使每株作物、每头牲畜的产出更多。',
          },
        },
        {
          id: 'fd-2',
          text: {
            en: 'Monoculture — growing one crop over a large area — makes all of that efficient. Sowing, treating and harvesting can all be done at once with the same machine. But a field of genetically similar plants is a field where one pest or one disease can take everything, and the same crop takes the same nutrients out of the soil year after year.',
            zh: '单一栽培——在大片土地上种植同一种作物——使上述一切变得高效。播种、施药、收割都能用同一台机器一次完成。但一整片遗传上相似的作物，也意味着一种害虫或一种病害就能把它们全部毁掉，而同一种作物年复一年地消耗着土壤中同样的养分。',
          },
        },
        {
          id: 'fd-3',
          text: {
            en: 'Intensive livestock production works the same way: keep animals warm and confined so less energy is wasted on movement and on staying warm, and more of the food becomes meat. It is genuinely more efficient in energy terms. It also raises real concerns about animal welfare and about disease spreading in crowded conditions — which is why antibiotics are so heavily used there, and why that use drives resistance.',
            zh: '集约化畜牧的道理相同：让动物保持温暖并限制活动，减少用于运动和维持体温的能量消耗，使更多饲料转化为肉。从能量角度看它确实更高效。但它也引发了动物福利方面的真实关切，以及密集环境中疾病传播的问题——这正是那里大量使用抗生素的原因，而这种使用又推动了耐药性。',
          },
        },
      ],
    },
    {
      id: 'habitat',
      type: 'concept',
      title: { en: 'What is lost when a habitat goes', zh: '栖息地消失时失去了什么' },
      lines: [
        {
          id: 'hb-1',
          text: {
            en: 'Biodiversity is the number of different species living in an area. Habitats are destroyed to extract materials such as timber or minerals, to make room for housing and industry, and above all to clear land for farming.',
            zh: '生物多样性是指某一地区不同物种的数目。栖息地被破坏的原因包括：开采木材或矿产等资源、为住房和工业腾出空间，尤其是为农业开垦土地。',
          },
        },
        {
          id: 'hb-2',
          text: {
            en: 'Deforestation has four consequences worth naming separately. Habitats and species are lost, so biodiversity falls. With no roots to bind it, soil is washed away and rivers silt up — soil erosion and flooding. Less photosynthesis means less carbon dioxide removed from the air, and burning the timber puts more back.',
            zh: '森林砍伐有四项后果值得分别说明。栖息地和物种消失，生物多样性下降。没有根系固持，土壤被冲走、河流淤塞——这就是水土流失与洪涝。光合作用减少意味着从空气中移除的二氧化碳减少，而焚烧木材又把更多二氧化碳送回空气。',
          },
        },
        {
          id: 'hb-3',
          text: {
            en: 'And because a food web is connected, removing one species affects everything joined to it. Its predators lose a food source; what it fed on multiplies unchecked. That is a general principle, and it is why "we only removed one species" is never a complete answer.',
            zh: '而由于食物网是相互连接的，移走一个物种会影响所有与之相连的生物。它的捕食者失去食物来源；它原本捕食的对象则失控增殖。这是一条普遍原理，也是为什么"我们只移走了一个物种"从来不是一个完整的答案。',
          },
        },
      ],
    },
    {
      id: 'eutrophication',
      type: 'interaction',
      title: { en: 'Five steps between the field and the fish', zh: '从农田到死鱼之间的五步' },
      lines: [
        {
          id: 'eu-1',
          text: {
            en: 'Fertiliser washes off a field into a river, or untreated sewage is discharged into it. Both do the same thing: they add nitrate. Watch what follows, and watch the order.',
            zh: '化肥从农田被雨水冲进河流，或者未经处理的污水被排入其中。两者做的是同一件事：增加硝酸盐。看接下来发生了什么，也看它们发生的顺序。',
          },
          action: { type: 'setParams', params: { nitrate: 80, flow: 10, day: 5 } },
        },
        {
          id: 'eu-2',
          text: {
            en: 'Step one: the algae bloom. Nitrate was the limiting factor on their growth — the same idea as in photosynthesis — and removing a limiting factor lets the rate rise. A green layer spreads across the surface.',
            zh: '第一步：藻类大量繁殖。硝酸盐原本是限制它们生长的因素——与光合作用中的道理相同——而解除限制因素就会让速率上升。水面上铺开一层绿色。',
          },
          action: { type: 'setParams', params: { nitrate: 80, flow: 10, day: 15 } },
        },
        {
          id: 'eu-3',
          text: {
            en: 'Step two: that layer blocks the light. The plants growing below the surface cannot photosynthesise, so they die. Notice the timing — the plants only start falling once the algae are already up.',
            zh: '第二步：这层藻遮住了光。生长在水面下的植物无法进行光合作用，于是死亡。注意时间——只有在藻类已经繁盛之后，植物才开始减少。',
          },
          action: { type: 'setParams', params: { nitrate: 80, flow: 10, day: 25 } },
        },
        {
          id: 'eu-4',
          text: {
            en: 'Step three: decomposer bacteria multiply on all that dead material — the dead plants, and then the algae as they die too. There is suddenly a great deal for them to feed on.',
            zh: '第三步：分解者细菌在这些死亡物质上大量繁殖——先是死去的植物，随后是同样死去的藻类。它们忽然有了大量食物。',
          },
          action: { type: 'setParams', params: { nitrate: 80, flow: 10, day: 40 } },
        },
        {
          id: 'eu-5',
          text: {
            en: 'Step four: those bacteria respire aerobically, and they use the oxygen dissolved in the water. Watch the oxygen line fall — and notice it only falls once the bacteria are up. Nothing before that touched it.',
            zh: '第四步：这些细菌进行有氧呼吸，消耗溶解在水中的氧。看氧气那条线下降——并注意它只有在细菌增多之后才下降。在此之前什么都没有影响到它。',
          },
        },
        {
          id: 'eu-6',
          text: {
            en: 'Step five: the fish suffocate. And that is the whole point of running this. The fish did not die of the fertiliser — the fertiliser is not poisonous to them. They died because bacteria, four steps downstream, used up the oxygen they needed.',
            zh: '第五步：鱼窒息而死。而这正是做这个模拟的全部意义。鱼不是被化肥毒死的——化肥对它们并没有毒性。它们死于四步之外的细菌耗尽了它们所需的氧气。',
          },
          action: { type: 'setParams', params: { nitrate: 80, flow: 10, day: 55 } },
          pause: 1,
        },
        {
          id: 'eu-7',
          text: {
            en: 'Now turn the flow right up. A fast river dilutes the nitrate and dissolves oxygen back in from the air as it tumbles along, and the chain never gets started. It is the same amount of fertiliser — what changed is whether the water could cope with it.',
            zh: '现在把水流调到最大。湍急的河流稀释硝酸盐，并在翻腾中把空气中的氧重新溶入水里，于是这条链根本没有启动。化肥的量是一样的——变的是水体能否承受它。',
          },
          action: { type: 'setParams', params: { nitrate: 80, flow: 95, day: 55 } },
        },
      ],
    },
    {
      id: 'pollution',
      type: 'concept',
      title: { en: 'What does not break down', zh: '不会分解的东西' },
      lines: [
        {
          id: 'po-1',
          text: {
            en: 'Non-biodegradable plastics cannot be broken down by decomposers, so they stay. In the sea they are eaten by animals that mistake them for food, filling the gut so the animal starves; larger pieces entangle and drown them.',
            zh: '不可生物降解的塑料无法被分解者分解，因此会长期存在。在海中，动物误把它们当作食物吞下，塑料填满消化道，动物因此饿死；更大的碎片则会缠住它们并使其溺亡。',
          },
        },
        {
          id: 'po-2',
          text: {
            en: 'Carbon dioxide and methane are greenhouse gases: they absorb heat radiated from the Earth and re-radiate some of it back, warming the surface. Carbon dioxide comes mostly from burning fossil fuels and from deforestation. Methane comes from cattle, from rice paddies and from decaying waste in landfill.',
            zh: '二氧化碳和甲烷是温室气体：它们吸收地球辐射出的热量，再把其中一部分辐射回地面，使地表升温。二氧化碳主要来自化石燃料燃烧和森林砍伐。甲烷来自牛、稻田以及垃圾填埋场中腐烂的废弃物。',
          },
        },
        {
          id: 'po-3',
          text: {
            en: 'The consequences are the ones you already know: rising average temperatures, ice melting and sea levels rising, more extreme weather, and changes in the distribution of species as the climate they are adapted to moves.',
            zh: '后果你已经知道：平均气温上升、冰层融化、海平面上升、极端天气增多，以及随着其所适应的气候带迁移，物种分布发生改变。',
          },
        },
      ],
    },
    {
      id: 'conservation',
      type: 'concept',
      title: { en: 'Taking no more than grows back', zh: '取用不超过再生的量' },
      lines: [
        {
          id: 'cn-1',
          text: {
            en: 'A sustainable resource is one that is replaced as fast as it is removed. Forests and fish stocks can both be managed that way, and both are managed badly by default because the incentive is always to take a little more.',
            zh: '可持续资源是指其补充速度不低于消耗速度的资源。森林和鱼类资源都可以这样管理，而在没有约束时两者通常都被管理得很糟，因为"再多拿一点"的动机始终存在。',
          },
        },
        {
          id: 'cn-2',
          text: {
            en: 'For a forest: replant as you fell, take only mature trees, leave the rest standing, and rotate which area is cut. For fish: set quotas, restrict the mesh size so young fish escape and can breed, close the fishery during the breeding season, and protect some areas entirely.',
            zh: '对森林而言：边砍边种、只伐成熟树木、其余保留、并轮换采伐区域。对渔业而言：设定配额、限制网目尺寸使幼鱼得以逃脱并繁殖、在繁殖季禁渔，并把部分海域完全划为保护区。',
          },
        },
        {
          id: 'cn-3',
          text: {
            en: 'Species become endangered through habitat destruction, hunting, pollution, competition from introduced species and climate change — usually several at once. They can be conserved in wildlife reserves, in captive breeding programmes using artificial insemination and IVF, in seed banks, and by education and legal protection.',
            zh: '物种濒危的原因包括栖息地破坏、猎捕、污染、引入物种的竞争以及气候变化——通常是数种同时发生。保护手段包括自然保护区、采用人工授精与试管受精的圈养繁育计划、种子库，以及教育与法律保护。',
          },
        },
        {
          id: 'cn-4',
          text: {
            en: 'And there is one risk worth understanding rather than listing. A species reduced to very few individuals loses genetic variation, because the alleles carried by the ones that died are gone for good. With little variation there is little for natural selection to act on — so the population cannot adapt to a new disease or a changing climate, even if its numbers recover.',
            zh: '还有一种风险值得理解而不只是罗列。个体数量降到极少的物种会失去遗传变异，因为死去的个体所携带的等位基因永远消失了。变异少，自然选择可作用的对象就少——因此即使数量恢复，这个种群也无法适应新的疾病或变化的气候。',
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
            en: 'Eutrophication in order: nitrate enters, algae bloom, light is blocked, plants die, decomposers multiply, decomposers respire and use the oxygen, fish suffocate. Six links, and the marks are for the sequence.',
            zh: '富营养化按顺序：硝酸盐进入、藻类繁盛、光被遮挡、植物死亡、分解者增殖、分解者呼吸耗氧、鱼窒息。六个环节，得分点就在这个顺序上。',
          },
        },
        {
          id: 'sum-2',
          text: {
            en: 'Never write that the fertiliser poisons the fish. It does not. It is the decomposers respiring that removes the oxygen, and that is four steps further down the chain.',
            zh: '绝不要写"化肥毒死了鱼"。它没有。夺走氧气的是分解者的呼吸作用，而那已是这条链上再往下四步的事。',
          },
        },
        {
          id: 'sum-3',
          text: {
            en: 'And for deforestation, give the four consequences separately: loss of habitat and biodiversity, soil erosion, flooding, and more carbon dioxide in the atmosphere.',
            zh: '至于森林砍伐，要分别写出四项后果：栖息地与生物多样性丧失、水土流失、洪涝，以及大气中二氧化碳增多。',
          },
        },
      ],
    },
  ],
}

export default humanInfluencesNarration
