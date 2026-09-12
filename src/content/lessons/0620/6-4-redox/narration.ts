import type { NarrationScript } from '@/content/types'

export const redoxNarration: NarrationScript = {
  id: '6-4-redox',
  sections: [
    {
      id: 'oxygen',
      type: 'interaction',
      title: { en: 'Where the word came from', zh: '这个词的由来' },
      lines: [
        {
          id: 'ox-1',
          text: {
            en: 'Oxidation originally meant exactly what it sounds like: gaining oxygen. Magnesium burns and becomes magnesium oxide — it has been oxidised. Reduction is the opposite, losing oxygen. Copper(II) oxide heated in hydrogen turns back into copper metal, so it has been reduced.',
            zh: '氧化最初的含义就如其字面：得到氧。镁燃烧变成氧化镁——它被氧化了。还原则相反，是失去氧。氧化铜(II)在氢气中加热又变回金属铜，所以它被还原了。',
          },
          action: { type: 'setParams', params: { stage: 1 } },
        },
        {
          id: 'ox-2',
          text: {
            en: 'Notice that both happen in the same reaction. The copper oxide lost its oxygen — but the oxygen went somewhere, onto the hydrogen, which became water. One substance is reduced and another is oxidised, always together. That is why the pair is called a redox reaction.',
            zh: '注意两者发生在同一个反应中。氧化铜失去了氧——但氧总要有去处，它跑到了氢上，生成水。一种物质被还原，另一种被氧化，两者永远同时发生。这正是这一对被称为氧化还原反应的原因。',
          },
        },
        {
          id: 'ox-3',
          text: {
            en: 'Sort these six. Each reaction appears twice, once for each partner, so if you find yourself putting both halves of the same equation in the same bin, one of them is wrong.',
            zh: '把这六个分类。每个反应出现两次，每次对应一个参与者，所以如果你把同一个方程式的两半放进了同一个筐，其中必有一个是错的。',
          },
        },
        {
          id: 'ox-4',
          text: {
            en: 'A note on notation before we go further. Roman numerals in a name give the oxidation number of the metal: iron(II) means the iron is in the plus two state, iron(III) plus three. They exist because many metals form more than one compound with the same element, and iron(II) oxide and iron(III) oxide are genuinely different substances.',
            zh: '在继续之前说一下写法。名称中的罗马数字表示金属的氧化数：铁(II) 表示铁处于 +2 态，铁(III) 是 +3。之所以需要它们，是因为许多金属与同一元素能形成不止一种化合物，而氧化亚铁与氧化铁确实是不同的物质。',
          },
        },
      ],
    },
    {
      id: 'electrons',
      type: 'interaction',
      title: { en: 'A definition that does not need oxygen', zh: '一个不需要氧的定义' },
      lines: [
        {
          id: 'el-1',
          text: {
            en: 'Now a problem for that definition. Magnesium burning in oxygen is obviously oxidation. But magnesium also burns in chlorine, giving magnesium chloride — same violence, same magnesium ion at the end, and no oxygen anywhere in it. Is that oxidation or not?',
            zh: '现在这个定义遇到了麻烦。镁在氧气中燃烧显然是氧化。但镁也能在氯气中燃烧生成氯化镁——同样剧烈，最终同样生成镁离子，而其中根本没有氧。这算不算氧化？',
          },
          action: { type: 'setParams', params: { stage: 2 } },
        },
        {
          id: 'el-2',
          text: {
            en: 'Look at what the magnesium does in both cases and the answer is obvious. It loses two electrons and becomes Mg²⁺. The oxygen and the chlorine were both just there to take them. So the better definition is about electrons: oxidation is loss of electrons, reduction is gain of electrons.',
            zh: '看看两种情况下镁做了什么，答案就很明显。它失去两个电子变成 Mg²⁺。氧和氯都只是来接收电子的。所以更好的定义关乎电子：氧化是失去电子，还原是得到电子。',
          },
        },
        {
          id: 'el-3',
          text: {
            en: 'Which is worth a mnemonic, since it is easy to get backwards. OIL RIG: Oxidation Is Loss, Reduction Is Gain. Loss and gain of electrons, and nothing else.',
            zh: '这值得记一个口诀，因为很容易记反。OIL RIG：Oxidation Is Loss（氧化是失去），Reduction Is Gain（还原是得到）。指的是电子的失与得，别无其他。',
          },
        },
        {
          id: 'el-4',
          text: {
            en: 'Sort these half-equations, and use only one thing: which side of the arrow the electrons are on. Left means gained, so reduction. Right means lost, so oxidation. It is mechanical, and that is the advantage of the definition.',
            zh: '把这些半反应式分类，只用一个依据：电子在箭头的哪一边。左边表示得到，是还原。右边表示失去，是氧化。这是机械的判断，而这正是这个定义的优势。',
          },
        },
        {
          id: 'el-5',
          text: {
            en: 'Watch the iron one. Fe²⁺ becoming Fe³⁺ loses a single electron and remains an ion throughout — it does not turn into an element or a compound. Oxidation does not mean turning into something else; it means losing electrons, and that is all.',
            zh: '注意铁的那一个。Fe²⁺ 变成 Fe³⁺ 只失去一个电子，全程仍是离子——它没有变成单质或化合物。氧化并不意味着变成别的东西；它就是失去电子，仅此而已。',
          },
        },
        {
          id: 'el-6',
          text: {
            en: 'There is a third way of saying the same thing, using oxidation numbers. Oxidation is an increase in oxidation number, reduction a decrease. Iron going from plus two to plus three has increased, so it was oxidised — the same answer the electrons gave, which is the point.',
            zh: '还有第三种说法，用氧化数。氧化是氧化数升高，还原是氧化数降低。铁从 +2 变到 +3 是升高，所以被氧化了——与用电子得到的答案相同，这正是关键所在。',
          },
        },
      ],
    },
    {
      id: 'agents',
      type: 'interaction',
      title: { en: 'The word that points the other way', zh: '那个方向相反的词' },
      lines: [
        {
          id: 'ag-1',
          text: {
            en: 'Now the part that catches almost everyone. An oxidising agent is not a substance that gets oxidised. It is a substance that oxidises something else — it takes the electrons — and so it is itself reduced.',
            zh: '现在说说几乎人人都会栽的地方。氧化剂并不是被氧化的物质。它是使别的物质被氧化的物质——它夺取电子——因此它自身被还原。',
          },
          action: { type: 'setParams', params: { stage: 3 } },
        },
        {
          id: 'ag-2',
          text: {
            en: 'And a reducing agent reduces something else, by giving electrons away, so it is itself oxidised. Both names describe what the substance does to its partner, not what happens to it. Say it that way round every time and the confusion disappears.',
            zh: '而还原剂通过给出电子使别的物质被还原，因此它自身被氧化。两个名称描述的都是这种物质对它的搭档做了什么，而不是它自己发生了什么。每次都这样表述，混淆就消失了。',
          },
        },
        {
          id: 'ag-3',
          text: {
            en: 'Two colour changes are worth learning, because they are how these are tested. Acidified potassium manganate(VII) is purple, and turns colourless when it acts as an oxidising agent — it has been reduced. And potassium iodide is colourless, turning brown as iodine is formed when it acts as a reducing agent — it has been oxidised.',
            zh: '有两个颜色变化值得记住，因为检验就靠它们。酸化的高锰酸钾(VII)是紫色的，作氧化剂时变为无色——它被还原了。而碘化钾是无色的，作还原剂时生成碘而变棕色——它被氧化了。',
          },
        },
        {
          id: 'ag-4',
          text: {
            en: 'Sort these six, and for each one ask the same question: is it taking electrons or giving them? Taking makes it an oxidising agent. The colour changes are given as clues — purple disappearing means the manganate has been reduced, which is what an oxidising agent does.',
            zh: '把这六个分类，每一个都问同一个问题：它是在夺取电子还是给出电子？夺取的就是氧化剂。颜色变化是给出的线索——紫色消失意味着高锰酸盐被还原了，而这正是氧化剂所做的事。',
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
            en: 'Oxidation is gain of oxygen, or loss of electrons, or an increase in oxidation number. Reduction is the opposite of each. OIL RIG. All three definitions give the same answer whenever more than one applies.',
            zh: '氧化是得到氧，或失去电子，或氧化数升高。还原则各自相反。OIL RIG。当多个定义同时适用时，三者给出的答案一致。',
          },
        },
        {
          id: 'sum-2',
          text: {
            en: 'Oxidation and reduction always happen together, which is why they are called redox. If something has been oxidised, name what reduced it.',
            zh: '氧化与还原总是同时发生，这就是称其为氧化还原的原因。若某物被氧化了，就要说出是什么把它还原了。',
          },
        },
        {
          id: 'sum-3',
          text: {
            en: 'An oxidising agent oxidises something else and is reduced itself. A reducing agent reduces something else and is oxidised itself. Acidified potassium manganate(VII) goes purple to colourless as an oxidising agent; potassium iodide goes colourless to brown as a reducing agent.',
            zh: '氧化剂使别的物质被氧化，自身被还原。还原剂使别的物质被还原，自身被氧化。酸化高锰酸钾(VII)作氧化剂时由紫变无色；碘化钾作还原剂时由无色变棕色。',
          },
        },
      ],
    },
  ],
}

export default redoxNarration
