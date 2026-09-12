import type { NarrationScript } from '@/content/types'

export const classificationNarration: NarrationScript = {
  id: '1-1-classification',
  sections: [
    {
      id: 'intro',
      type: 'intro',
      title: { en: 'Seven things everything alive does', zh: '一切生物都在做的七件事' },
      lines: [
        {
          id: 'intro-1',
          text: {
            en: 'Before you can sort living organisms you need to know what makes something living at all. There are seven characteristics, and every organism shows all seven: movement, respiration, sensitivity, growth, reproduction, excretion and nutrition.',
            zh: '在给生物分类之前，先要知道什么才算"活的"。共有七个特征，每一种生物都全部具备：运动、呼吸作用、应激性、生长、繁殖、排泄和营养。',
          },
        },
        {
          id: 'intro-2',
          text: {
            en: 'Be careful with two of them. Movement does not mean walking about — a plant moves its leaves towards light. And excretion is not the same as egestion: excretion is getting rid of waste your own reactions made, while egestion is passing out food you never absorbed in the first place. Examiners separate those two every year.',
            zh: '有两个要特别小心。运动不等于走动——植物把叶片转向光也是运动。排泄也不等于排遗：排泄是排出自身反应产生的废物，排遗则是排出根本没被吸收的食物。考官每年都会区分这两者。',
          },
        },
      ],
    },
    {
      id: 'species',
      type: 'concept',
      title: { en: 'What a species actually is', zh: '物种究竟是什么' },
      lines: [
        {
          id: 'sp-1',
          text: {
            en: 'A species is a group of organisms that can reproduce to produce fertile offspring. The word fertile is doing all the work. A horse and a donkey will breed and give you a mule — but a mule cannot itself breed, so horses and donkeys stay two species.',
            zh: '物种是一群能交配并产生*可育*后代的生物。关键全在"可育"二字。马和驴能交配生出骡子——但骡子本身不能生育，所以马和驴仍是两个物种。',
          },
        },
        {
          id: 'sp-2',
          text: {
            en: 'Each species gets a two-part name: the genus first, with a capital letter, then the species, in lower case. Homo sapiens. Panthera leo. Both parts in italics, or underlined if you are writing by hand. The system is international, so a biologist anywhere reads the same name for the same organism.',
            zh: '每个物种都有一个两部分的名称：先是属名，首字母大写，再是种加词，全小写。Homo sapiens、Panthera leo。两部分都用斜体，手写时则加下划线。这套系统是国际通用的，任何地方的生物学家看到同一个名字，指的都是同一种生物。',
          },
        },
        {
          id: 'sp-3',
          text: {
            en: 'And classification is not just filing. Groups are meant to reflect how closely organisms are related by evolution — how recently they shared an ancestor. Features are how we guess at that, but they are only a guess.',
            zh: '而且分类不只是归档。分组的目的是反映生物在进化上的亲缘远近——即它们的共同祖先有多近。特征是我们推测亲缘关系的依据，但那只是推测。',
          },
        },
        {
          id: 'sp-4',
          text: {
            en: 'The direct evidence is DNA. Compare the base sequences of two species: the more recent their common ancestor, the fewer differences have had time to accumulate, so the more similar the sequences. That is why some organisms have been moved between groups — the DNA disagreed with the way they looked.',
            zh: '直接的证据是 DNA。比较两个物种的碱基序列：共同祖先越近，积累差异的时间就越短，序列也就越相似。这正是某些生物被重新归类的原因——DNA 与它们的外表不一致。',
          },
        },
      ],
    },
    {
      id: 'sorting',
      type: 'interaction',
      title: { en: 'Sorting by features, not by impressions', zh: '按特征分类，而不是按印象' },
      lines: [
        {
          id: 'sort-1',
          text: {
            en: 'Start with the five kingdoms. Read the features on each box before you move anything — that list is the whole method. An organism goes where its features fit, not where it feels like it belongs.',
            zh: '先从五界开始。在动手之前先读每个框上的特征——这份清单就是全部方法。生物应归入其特征吻合之处，而不是"感觉像"的地方。',
          },
          action: { type: 'setParams', params: { stage: 1 } },
        },
        {
          id: 'sort-2',
          text: {
            en: 'Two of these will catch you. A yeast is a single cell, but it has a cell wall that is not cellulose and it feeds on dead matter, so it is a fungus, not a prokaryote. And a cyanobacterium photosynthesises exactly as a plant does — but it has no nucleus, so it is a prokaryote. No nucleus outranks everything else.',
            zh: '其中有两个会让你栽跟头。酵母菌是单细胞的，但它有非纤维素的细胞壁，且以死亡有机物为食，所以它是真菌而非原核生物。而蓝细菌的光合作用与植物一模一样——但它没有细胞核，所以是原核生物。"没有细胞核"这一条压倒其他一切。',
          },
        },
        {
          id: 'sort-3',
          text: {
            en: 'Now the vertebrates. A bat flies and a penguin swims, and neither fact is any use to you. Hair and milk make a mammal wherever it lives; feathers make a bird even if it never leaves the water.',
            zh: '接下来是脊椎动物。蝙蝠会飞、企鹅会游，这两件事对你毫无帮助。无论生活在哪里，有毛发和乳汁的就是哺乳类；有羽毛的就是鸟类，哪怕它从不离开水面。',
          },
          action: { type: 'setParams', params: { stage: 2 } },
        },
        {
          id: 'sort-4',
          text: {
            en: 'A tortoise and a newt look similar at a glance and are two groups apart. Dry scaly skin and shelled eggs on land: reptile. Moist bare skin and jelly-covered eggs in water: amphibian. Skin and eggs decide it, every time.',
            zh: '陆龟和蝾螈乍看相似，实则分属两类。皮肤干燥有鳞、在陆地上产带壳的卵：爬行类。皮肤湿润无鳞、在水中产被胶质包裹的卵：两栖类。每一次都由皮肤和卵来决定。',
          },
        },
        {
          id: 'sort-5',
          text: {
            en: 'The arthropods come down to counting. Count the body parts, count the pairs of legs, count the antennae. Three parts and three pairs of legs: insect. Two parts, four pairs, no antennae: arachnid. A woodlouse looks like a beetle and has far too many legs to be one.',
            zh: '节肢动物归根结底靠数数：数体节、数足的对数、数触角。三部分、三对足：昆虫。两部分、四对足、无触角：蛛形纲。鼠妇看着像甲虫，可它的足多得根本不可能是昆虫。',
          },
          action: { type: 'setParams', params: { stage: 3 } },
        },
        {
          id: 'sort-6',
          text: {
            en: 'And the plants. Ferns have no flowers and reproduce by spores. Among the flowering plants, count the cotyledons in the seed, or just look at a leaf: parallel veins mean one cotyledon, a branching network means two.',
            zh: '最后是植物。蕨类不开花，靠孢子繁殖。在开花植物中，数一数种子的子叶，或者干脆看叶片：叶脉平行的是单子叶，叶脉呈网状分支的是双子叶。',
          },
          action: { type: 'setParams', params: { stage: 4 } },
        },
      ],
    },
    {
      id: 'keys',
      type: 'concept',
      title: { en: 'Turning that into a key', zh: '把它写成检索表' },
      lines: [
        {
          id: 'key-1',
          text: {
            en: 'A dichotomous key writes the sorting you just did as a chain of questions. Dichotomous means it splits in two: at every step there are exactly two options, and the answer sends you either to another pair of options or to a name.',
            zh: '二歧检索表把你刚才做的分类写成一串问题。"二歧"就是一分为二：每一步恰好只有两个选项，答案要么把你引向下一对选项，要么直接给出名称。',
          },
        },
        {
          id: 'key-2',
          text: {
            en: 'Two rules will get you the marks. Use features you can actually see on the specimen — number of legs, presence of wings, leaf shape. Never use size, colour or habitat on their own: an animal can be young, and colour varies within a species.',
            zh: '记住两条规则就能拿分。只用标本上真正看得见的特征——足的数目、有无翅、叶形。绝不要单独使用大小、颜色或栖息地：动物可能还是幼体，而颜色在同一物种内也会变化。',
          },
        },
        {
          id: 'key-3',
          text: {
            en: 'And phrase each pair so that every organism matches exactly one side. "Has wings" and "has no wings" is a proper pair. "Has wings" and "has six legs" is not, because an insect answers yes to both.',
            zh: '而且每一对的措辞都要保证任何生物恰好只符合其中一边。"有翅"与"无翅"是合格的一对。"有翅"与"有六足"就不是，因为昆虫两条都符合。',
          },
        },
      ],
    },
    {
      id: 'viruses',
      type: 'concept',
      title: { en: 'The thing that fits nowhere', zh: '无处安放的那一类' },
      lines: [
        {
          id: 'vir-1',
          text: {
            en: 'Viruses are in none of the five kingdoms. A virus is genetic material inside a protein coat, and that is all — no cytoplasm, no cell membrane, no cell.',
            zh: '病毒不属于五界中的任何一界。病毒就是蛋白质外壳里包着的遗传物质，仅此而已——没有细胞质，没有细胞膜，没有细胞。',
          },
        },
        {
          id: 'vir-2',
          text: {
            en: 'It cannot respire, grow or reproduce on its own; it can only be copied by a host cell it has invaded. Whether that counts as alive is a real argument, and the syllabus sidesteps it by asking you only for the structure: protein coat, genetic material.',
            zh: '它无法自行呼吸、生长或繁殖，只能由被它侵入的宿主细胞复制。它算不算活的，是一个真实存在的争论；考纲绕开了这个问题，只要求你说出结构：蛋白质外壳、遗传物质。',
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
            en: 'A species produces fertile offspring. The binomial name is Genus with a capital, species in lower case, both in italics. Classification aims to show evolutionary relationships, and DNA base sequences are the direct evidence for them.',
            zh: '同一物种能产生可育后代。双名法是：属名首字母大写、种加词全小写，两者都用斜体。分类的目标是显示进化上的亲缘关系，而 DNA 碱基序列是其直接证据。',
          },
        },
        {
          id: 'sum-2',
          text: {
            en: 'When a question asks you to classify something, quote the feature you used. "It is a mammal" is one mark at best; "it is a mammal because it has hair and feeds its young on milk" is the answer they are paying for.',
            zh: '当题目要求分类时，要写出你依据的特征。只写"它是哺乳动物"最多得一分；"它是哺乳动物，因为有毛发并用乳汁哺育幼体"才是他们要给分的答案。',
          },
        },
      ],
    },
  ],
}

export default classificationNarration
