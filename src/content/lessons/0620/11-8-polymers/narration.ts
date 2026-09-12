import type { NarrationScript } from '@/content/types'

export const polymersNarration: NarrationScript = {
  id: '11-8-polymers',
  sections: [
    {
      id: 'intro',
      type: 'intro',
      title: { en: 'Small molecules, joined end to end', zh: '小分子首尾相连' },
      lines: [
        {
          id: 'intro-1',
          text: {
            en: 'Here are three ethene molecules. Each has one carbon–carbon double bond, and that is all they need to become a plastic.',
            zh: '这里有三个乙烯分子。每个都有一个碳碳双键，而这正是它们变成塑料所需要的全部条件。',
          },
          action: { type: 'setParams', params: { monomer: 0, repeatUnits: 3, polymerised: 0 } },
        },
        {
          id: 'intro-2',
          text: {
            en: 'Now polymerise them. Every double bond has opened, and the bond that was freed up has reached across to the next molecule. The three separate molecules are now one chain.',
            zh: '现在让它们聚合。每个双键都打开了，腾出的那根键伸向下一个分子。原本分开的三个分子现在连成了一条链。',
          },
          action: { type: 'setParams', params: { monomer: 0, repeatUnits: 3, polymerised: 1 } },
          pause: 1,
        },
        {
          id: 'intro-3',
          text: {
            en: 'Look at the molecular formula underneath. It did not change. Not one atom was gained or lost — the monomers simply joined up. That is what addition polymerisation means, and it is the mark most often lost on this topic.',
            zh: '看下面的分子式。它没有变。没有增加也没有失去任何一个原子——单体只是连接起来了。这就是加成聚合的含义，也是本主题最常丢的一分。',
          },
        },
      ],
    },
    {
      id: 'repeat',
      type: 'interaction',
      title: { en: 'The repeat unit', zh: '重复单元' },
      lines: [
        {
          id: 'repeat-1',
          text: {
            en: 'Slide the repeat units down to one. This is what an exam asks you to draw: two carbon atoms, all four groups shown, and a bond sticking out at each end because the chain carries on.',
            zh: '把重复单元滑到 1。这就是考试要你画的：两个碳原子、四个基团全部画出，两端各伸出一根键，因为链还在继续。',
          },
          action: { type: 'setParams', params: { monomer: 0, repeatUnits: 1, polymerised: 1 } },
        },
        {
          id: 'repeat-2',
          text: {
            en: 'Those two bonds sticking out matter. Without them you have drawn a molecule, not a section of a polymer, and it will not score.',
            zh: '两端伸出的键很重要。没有它们，你画的就是一个分子，而不是聚合物的一段，这样是得不到分的。',
          },
        },
        {
          id: 'repeat-3',
          text: {
            en: 'Add units back and watch the relative molecular mass: twenty-eight, fifty-six, eighty-four, one hundred and twelve. Twenty-eight each time, because every repeat unit is identical. A real polythene chain has tens of thousands of them.',
            zh: '再增加单元，看相对分子质量：28、56、84、112。每次增加 28，因为每个重复单元完全相同。真实的聚乙烯分子链有数万个这样的单元。',
          },
          action: { type: 'setParams', params: { monomer: 0, repeatUnits: 4, polymerised: 1 } },
        },
      ],
    },
    {
      id: 'others',
      type: 'concept',
      title: { en: 'Change the monomer, change the plastic', zh: '换单体，换塑料' },
      lines: [
        {
          id: 'other-1',
          text: {
            en: 'Swap one hydrogen for a chlorine and the monomer is chloroethene. Polymerise it and you get PVC — rigid enough for drainpipes and window frames.',
            zh: '把一个氢换成氯，单体就成了氯乙烯。聚合后得到 PVC——硬到可以做排水管和窗框。',
          },
          action: { type: 'setParams', params: { monomer: 1, repeatUnits: 3, polymerised: 1 } },
        },
        {
          id: 'other-2',
          text: {
            en: 'Replace all four hydrogens with fluorine and you get PTFE, the non-stick coating on a frying pan. Same reaction, same mechanism — a completely different material.',
            zh: '把四个氢全换成氟，就得到 PTFE，也就是煎锅上的不粘涂层。反应相同、机理相同——材料却完全不同。',
          },
          action: { type: 'setParams', params: { monomer: 2, repeatUnits: 3, polymerised: 1 } },
          pause: 1,
        },
        {
          id: 'other-3',
          text: {
            en: 'This also works backwards, and exams like asking it that way. Given a section of polymer, find the repeat unit, put the double bond back between its two carbon atoms, and remove the bonds sticking out. That is the monomer.',
            zh: '这个过程也可以反过来，考试很喜欢这样出题。给你一段聚合物，找出重复单元，在两个碳之间把双键补回去，去掉两端伸出的键。这就是单体。',
          },
        },
      ],
    },
    {
      id: 'condensation',
      type: 'concept',
      title: { en: 'The other kind of polymerisation', zh: '另一种聚合' },
      lines: [
        {
          id: 'cond-1',
          text: {
            en: 'Nylon and PET are made differently. Their monomers have a reactive group at each end, and when two of them join, a small molecule is squeezed out — water, usually. That is condensation polymerisation.',
            zh: '尼龙和 PET 的制法不同。它们的单体两端各有一个活性基团，两个单体结合时会挤出一个小分子——通常是水。这就是缩聚。',
          },
        },
        {
          id: 'cond-2',
          text: {
            en: 'So the test is simple. If the polymer weighs exactly as much as the monomers that made it, it was addition. If something small came off at every join, it was condensation. Nylon is a polyamide, PET a polyester.',
            zh: '所以判断很简单。如果聚合物的质量与所用单体完全相等，那是加聚；如果每个连接处都脱去了小分子，那是缩聚。尼龙是聚酰胺，PET 是聚酯。',
          },
        },
      ],
    },
    {
      id: 'environment',
      type: 'concept',
      title: { en: 'Why plastics are a problem', zh: '塑料为什么成为问题' },
      lines: [
        {
          id: 'env-1',
          text: {
            en: 'The chain you just built is nothing but strong carbon–carbon single bonds. That is exactly why it is useful — and exactly why it is a problem. Bacteria have no enzyme that will break it, so the plastic is non-biodegradable.',
            zh: '你刚刚搭出来的这条链，除了牢固的碳碳单键什么都没有。这正是它有用的原因——也正是它成为问题的原因。细菌没有能分解它的酶，所以塑料不可生物降解。',
          },
        },
        {
          id: 'env-2',
          text: {
            en: 'In landfill it stays for centuries and the space runs out. In the sea it breaks into microplastics that animals swallow. And burning it is no escape: PVC contains chlorine, so it gives off toxic hydrogen chloride, and burning any plastic releases carbon dioxide.',
            zh: '填埋时它能存留几百年，而填埋场终会用尽。在海洋中它碎裂成微塑料，被动物吞食。焚烧也不是出路：PVC 含氯，燃烧会放出有毒的氯化氢，而且烧任何塑料都会释放二氧化碳。',
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
            en: 'Addition polymerisation: many monomers with C=C, one product, no atoms lost. Draw the repeat unit with all four groups and a bond out of each end. Condensation polymerisation: a small molecule lost at every join.',
            zh: '加聚：许多含 C=C 的单体，只有一种产物，不失去原子。画重复单元时四个基团都要画出，两端各伸出一根键。缩聚：每个连接处都脱去一个小分子。',
          },
        },
      ],
    },
  ],
}

export default polymersNarration
