import type { NarrationScript } from '@/content/types'

export const saltsNarration: NarrationScript = {
  id: '7-3-salts',
  sections: [
    {
      id: 'oxides',
      type: 'intro',
      title: { en: 'Which oxides are which', zh: '氧化物的分类' },
      lines: [
        {
          id: 'ox-1',
          text: {
            en: 'Before making salts, one piece of sorting. Metal oxides are basic — they react with acids to give a salt and water. Non-metal oxides are acidic — they dissolve to give acidic solutions, which is what sulfur dioxide does in rain.',
            zh: '制盐之前先做一次分类。金属氧化物是碱性的——与酸反应生成盐和水。非金属氧化物是酸性的——溶解后得到酸性溶液，二氧化硫在雨水中就是这样。',
          },
          action: { type: 'setParams', params: { cation: 5, anion: 2 } },
        },
        {
          id: 'ox-2',
          text: {
            en: 'That split runs left to right across the Periodic Table, exactly as metallic character does. Sodium oxide is basic; sulfur dioxide is acidic; and in between there is a middle ground.',
            zh: '这个分界沿周期表从左到右变化，与金属性的变化完全一致。氧化钠是碱性的，二氧化硫是酸性的，中间还有一个过渡地带。',
          },
        },
        {
          id: 'ox-3',
          text: {
            en: 'Aluminium oxide and zinc oxide sit in that middle ground. They react with acids like a base, and with alkalis like an acid. Both, from the same substance. That is what amphoteric means, and those two are the examples to learn.',
            zh: '氧化铝和氧化锌就处在这个过渡地带。它们与酸反应时像碱，与碱反应时又像酸。同一种物质，两种行为。这就是两性的含义，这两个就是要记住的例子。',
          },
        },
      ],
    },
    {
      id: 'question',
      type: 'concept',
      title: { en: 'Three routes, one question', zh: '三条路线，一个问题' },
      lines: [
        {
          id: 'q-1',
          text: {
            en: 'There are three ways to make a salt, and the exam will ask you to pick one. It is not a matter of taste. Two facts about the salt decide it, and you can work both out.',
            zh: '制盐有三条路线，考试会要求你选一条。这不是凭喜好。有两个关于这种盐的事实决定了答案，而这两点你都能推出来。',
          },
        },
        {
          id: 'q-2',
          text: {
            en: 'First: is the salt soluble? All nitrates are, and all sodium and potassium salts. Carbonates are not, except sodium and potassium. Chlorides are, except silver and lead. Sulfates are, except barium, lead and calcium.',
            zh: '第一：这种盐可溶吗？所有硝酸盐都可溶，所有钠盐和钾盐也都可溶。碳酸盐不溶，钠钾除外。氯化物可溶，银和铅除外。硫酸盐可溶，钡、铅和钙除外。',
          },
        },
        {
          id: 'q-3',
          text: {
            en: 'Learn the exceptions, not the rules. There are only five of them and everything else is soluble.',
            zh: '要背的是例外，不是规则。例外只有五个，其余全都可溶。',
          },
        },
      ],
    },
    {
      id: 'insoluble-base',
      type: 'interaction',
      title: { en: 'When you can filter the leftovers', zh: '当剩余物可以过滤时' },
      lines: [
        {
          id: 'ib-1',
          text: {
            en: 'Copper sulfate. Soluble — so it can be crystallised out of solution. And the base you start from, copper oxide, is insoluble.',
            zh: '硫酸铜。可溶——所以能从溶液中结晶出来。而所用的碱，氧化铜，是不溶的。',
          },
          action: { type: 'setParams', params: { cation: 5, anion: 2 } },
        },
        {
          id: 'ib-2',
          text: {
            en: 'That is a gift. Warm the acid, tip in copper oxide until no more will dissolve, and you know the acid is used up because there is solid left over. Filter that off and what passes through is pure copper sulfate solution.',
            zh: '这是个便利条件。把酸加热，不断加入氧化铜直到不再溶解，此时你就知道酸已耗尽，因为有固体剩下。把它过滤掉，透过滤纸的就是纯净的硫酸铜溶液。',
          },
        },
        {
          id: 'ib-3',
          text: {
            en: 'Then heat to crystallisation point — not to dryness, which would drive off the water of crystallisation and leave a powder instead of crystals. Leave it to cool, and dry the crystals between filter papers.',
            zh: '然后加热至结晶点——不要蒸干，那会赶走结晶水，得到粉末而不是晶体。放置冷却，再用滤纸把晶体吸干。',
          },
          pause: 1,
        },
        {
          id: 'ib-4',
          text: {
            en: 'Those blue crystals are hydrated copper sulfate: water molecules built into the crystal structure itself. Heat them and they turn white, because the water has gone — that is the anhydrous salt. Add water back and the blue returns, which is the test for water.',
            zh: '那些蓝色晶体是硫酸铜晶体：水分子嵌在晶体结构之中。加热后变白，因为水已失去——这就是无水盐。再加水，蓝色又回来了，这正是水的检验方法。',
          },
        },
      ],
    },
    {
      id: 'titration',
      type: 'interaction',
      title: { en: 'When you cannot', zh: '当剩余物无法过滤时' },
      lines: [
        {
          id: 't-1',
          text: {
            en: 'Now sodium chloride. Still soluble, so it still crystallises out. But the base is sodium hydroxide, and that is soluble too. Add too much and there is nothing to filter — it is simply dissolved in your product.',
            zh: '再看氯化钠。它同样可溶，所以仍能结晶出来。但所用的碱是氢氧化钠，它也是可溶的。加多了就没有东西可以过滤——它只是溶在你的产物里。',
          },
          action: { type: 'setParams', params: { cation: 0, anion: 1 } },
        },
        {
          id: 't-2',
          text: {
            en: 'So you have to measure. Titrate first, with an indicator, to find exactly what volume neutralises the acid. Then throw that away and repeat with the same volumes and no indicator — otherwise the indicator ends up in your crystals.',
            zh: '所以必须精确量取。先加指示剂滴定，找出恰好中和酸所需的体积。然后把这一份倒掉，用同样的体积、不加指示剂重做一次——否则指示剂会留在晶体里。',
          },
        },
        {
          id: 't-3',
          text: {
            en: 'That second run is the step people forget, and it is what the question is testing. The whole reason for titrating at all is that you cannot filter a soluble base out afterwards.',
            zh: '第二次操作是最常被遗漏的一步，而这正是题目要考的。之所以要滴定，全因可溶性碱事后无法过滤除去。',
          },
        },
      ],
    },
    {
      id: 'precipitation',
      type: 'interaction',
      title: { en: 'When it will not dissolve at all', zh: '当它根本不溶时' },
      lines: [
        {
          id: 'p-1',
          text: {
            en: 'Barium sulfate. Insoluble — so crystallising it out of solution is not an option, because it was never in solution.',
            zh: '硫酸钡。不溶——所以从溶液中结晶根本不可能，因为它从来就没溶进去过。',
          },
          action: { type: 'setParams', params: { cation: 6, anion: 2 } },
        },
        {
          id: 'p-2',
          text: {
            en: 'Instead, bring the two ions together in solution and let them fall out. Barium nitrate is soluble and sodium sulfate is soluble. Mix them, and barium sulfate appears as a white precipitate the instant they meet.',
            zh: '换个思路：让两种离子在溶液中相遇，自行析出。硝酸钡可溶，硫酸钠也可溶。把它们混合，两者一相遇就立刻生成白色的硫酸钡沉淀。',
          },
          pause: 1,
        },
        {
          id: 'p-3',
          text: {
            en: 'Filter it, wash it with distilled water — otherwise the soluble sodium nitrate dries onto your crystals — and dry it in a warm oven. Filter, wash, dry. Three steps, and the washing is the one that earns the mark.',
            zh: '过滤，用蒸馏水洗涤——否则可溶的硝酸钠会干在晶体上——再放进温热的烘箱干燥。过滤、洗涤、干燥。三步，而"洗涤"才是那个得分点。',
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
            en: 'Insoluble salt: precipitation, then filter, wash and dry. Soluble salt from an insoluble base: excess solid, then filter and crystallise. Soluble salt from a soluble base: titrate, then repeat without indicator and crystallise.',
            zh: '难溶盐：沉淀法，然后过滤、洗涤、干燥。由难溶性碱制可溶盐：加过量固体，然后过滤、结晶。由可溶性碱制可溶盐：滴定，再不加指示剂重做一次，然后结晶。',
          },
        },
        {
          id: 'summary-2',
          text: {
            en: 'And never say "evaporate to dryness". Heat to the point where crystals just begin to form and let it cool — boiling it dry destroys the water of crystallisation and you get powder, not crystals.',
            zh: '另外，千万不要写"蒸干"。加热到刚开始出现晶体就停下，让它冷却——煮干会破坏结晶水，得到的是粉末而不是晶体。',
          },
        },
      ],
    },
  ],
}

export default saltsNarration
