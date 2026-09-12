import type { NarrationScript } from '@/content/types'

export const waterNarration: NarrationScript = {
  id: '10-1-water',
  sections: [
    {
      id: 'intro',
      type: 'intro',
      title: { en: 'What is in river water', zh: '河水里有什么' },
      lines: [
        {
          id: 'intro-1',
          text: {
            en: 'Water out of a river carries four kinds of passenger: things floating in it, things suspended in it, things living in it, and things dissolved in it. Treatment deals with them one at a time, and it does not get all of them.',
            zh: '河水中带着四类"乘客"：漂浮的、悬浮的、活着的，以及溶解的。净化处理逐一对付它们，但并不能全部除去。',
          },
          action: { type: 'setParams', params: { stage: 0 } },
        },
        {
          id: 'intro-2',
          text: {
            en: 'And not everything dissolved in it is unwanted. Dissolved oxygen keeps fish alive. Metal compounds a body needs are in there. So are nitrates washed off farmland and metal compounds that are toxic — and treatment cannot tell the difference.',
            zh: '而且溶解的东西并非都不受欢迎。溶解氧让鱼得以存活，人体需要的金属化合物也在其中。同时还有从农田冲刷下来的硝酸盐和有毒的金属化合物——处理过程无法区分它们。',
          },
        },
      ],
    },
    {
      id: 'stages',
      type: 'interaction',
      title: { en: 'Four stages, four jobs', zh: '四个阶段，四项任务' },
      lines: [
        {
          id: 'st-1',
          text: {
            en: 'Screening first. Metal grids catch the sticks, leaves and litter before they can damage anything downstream. Crude, but it has to come first.',
            zh: '首先是格栅。金属栅网拦住树枝、树叶和垃圾，以免它们损坏后续设备。方法粗糙，但必须放在最前面。',
          },
          action: { type: 'setParams', params: { stage: 1 } },
        },
        {
          id: 'st-2',
          text: {
            en: 'Then sedimentation. The water sits still in large tanks and gravity does the work — sand and grit sink to the bottom. Nothing is added; you simply wait.',
            zh: '然后是沉降。水在大池中静置，靠重力完成工作——沙粒和砂砾沉到池底。不加任何东西，只是等待。',
          },
          action: { type: 'setParams', params: { stage: 2 } },
        },
        {
          id: 'st-3',
          text: {
            en: 'Filtration next, through beds of sand and gravel. This catches the fine particles that were too light to settle. Three stages in and the water looks clean — but looking clean is not the same as being safe.',
            zh: '接着是过滤，让水流过砂石滤层，截留那些太轻而无法沉降的细小颗粒。三个阶段之后水看起来很干净——但看起来干净不等于安全。',
          },
          action: { type: 'setParams', params: { stage: 3 } },
          pause: 1,
        },
        {
          id: 'st-4',
          text: {
            en: 'Chlorination. Chlorine is added to kill the bacteria, and this is the stage that makes the water fit to drink. Look at the readings: fit to drink now reads one.',
            zh: '氯消毒。加入氯杀灭细菌，正是这一步使水可以饮用。看读数：现在"可饮用"显示为 1。',
          },
          action: { type: 'setParams', params: { stage: 4 } },
        },
        {
          id: 'st-5',
          text: {
            en: 'And look at the other reading. One contaminant left. The dissolved salts went through every stage untouched, because nothing in the process was ever going to remove them.',
            zh: '再看另一个读数：还剩一种杂质。溶解的盐类毫发无损地穿过了每一个阶段，因为整个流程中没有任何一步会去除它们。',
          },
        },
      ],
    },
    {
      id: 'distilled',
      type: 'concept',
      title: { en: 'Why the laboratory uses distilled water', zh: '实验室为什么用蒸馏水' },
      lines: [
        {
          id: 'dis-1',
          text: {
            en: 'Slide one stage further, past the line. Distillation: boil the water, condense the steam, and the dissolved salts stay behind in the flask. Now nothing is left.',
            zh: '再往下滑一个阶段，越过那条线。蒸馏：把水煮沸、冷凝蒸汽，溶解的盐留在烧瓶里。现在什么都不剩了。',
          },
          action: { type: 'setParams', params: { stage: 5 } },
          pause: 1,
        },
        {
          id: 'dis-2',
          text: {
            en: 'No public water supply does this — it is far too expensive for the volumes involved. So tap water always has dissolved substances in it, and those substances would take part in your reactions and ruin your results.',
            zh: '公共供水系统不会这样做——对如此大的水量来说成本太高。所以自来水中总是含有溶解物质，而这些物质会参与你的反应，破坏实验结果。',
          },
        },
        {
          id: 'dis-3',
          text: {
            en: 'That is the whole answer to "why is distilled water used in practical chemistry". Not because tap water is dirty — because it is a solution, and you need a solvent.',
            zh: '这就是"实验化学为什么用蒸馏水"的完整答案。不是因为自来水脏——而是因为它是一种溶液，而你需要的是溶剂。',
          },
        },
      ],
    },
    {
      id: 'tests',
      type: 'concept',
      title: { en: 'Testing for water, and for pure water', zh: '检验水，与检验纯水' },
      lines: [
        {
          id: 'test-1',
          text: {
            en: 'Two different questions with two different tests, and mixing them up is a reliable way to lose a mark. To show a liquid *contains* water: anhydrous cobalt chloride turns from blue to pink, or anhydrous copper sulfate from white to blue.',
            zh: '两个不同的问题、两种不同的检验方法，把它们混淆是丢分的可靠方式。要证明液体*含有*水：无水氯化钴由蓝变粉，或无水硫酸铜由白变蓝。',
          },
        },
        {
          id: 'test-2',
          text: {
            en: 'But those tests will go off for tea, or seawater, or anything watery. They say water is present. They say nothing about purity.',
            zh: '但这些检验对茶水、海水或任何含水的东西都会呈阳性。它们只说明有水存在，对纯度只字未提。',
          },
        },
        {
          id: 'test-3',
          text: {
            en: 'For purity you need the melting and boiling points. Pure water melts at exactly zero and boils at exactly one hundred degrees at normal pressure. Anything dissolved in it lowers the melting point and raises the boiling point — and a mixture melts over a range rather than at a point.',
            zh: '要判断纯度就要看熔点和沸点。纯水在常压下恰好 0 °C 熔化、100 °C 沸腾。任何溶解物都会降低熔点、升高沸点——而且混合物是在一个温度范围内熔化，而不是在一个点。',
          },
        },
      ],
    },
    {
      id: 'fertilisers',
      type: 'concept',
      title: { en: 'What ends up in the water', zh: '什么会进入水体' },
      lines: [
        {
          id: 'fert-1',
          text: {
            en: 'Plants need nitrogen to make protein, and they cannot use the nitrogen in the air. So it is supplied as ammonium salts and nitrates, both of which are soluble — which is exactly what makes them useful and exactly what makes them a problem.',
            zh: '植物需要氮来合成蛋白质，却无法利用空气中的氮。所以要以铵盐和硝酸盐的形式供给，两者都可溶——这正是它们有用的原因，也正是它们成为问题的原因。',
          },
        },
        {
          id: 'fert-2',
          text: {
            en: 'An NPK fertiliser supplies three elements at once: nitrogen for leaf growth, phosphorus for roots, potassium for flowers and fruit. The three letters are the three symbols.',
            zh: 'NPK 复合肥同时提供三种元素：氮促进叶片生长，磷促进根系，钾促进开花结果。这三个字母就是三个元素符号。',
          },
        },
        {
          id: 'fert-3',
          text: {
            en: 'Because they dissolve, rain washes them off the fields and into rivers. And once there, no stage of water treatment takes them out again.',
            zh: '正因为它们可溶，雨水会把它们从农田冲进河流。而一旦进入河流，水处理的任何阶段都无法再把它们除去。',
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
            en: 'Screening, sedimentation, filtration, chlorination — four stages, and know what each removes. Chlorination is the one that makes it safe to drink.',
            zh: '格栅、沉降、过滤、氯消毒——四个阶段，要知道每一步除去什么。氯消毒是使水可以安全饮用的那一步。',
          },
        },
        {
          id: 'summary-2',
          text: {
            en: 'Cobalt chloride and copper sulfate test for the *presence* of water. Melting and boiling points test its *purity*. If a question asks whether a sample is pure water, a colour change is the wrong answer.',
            zh: '氯化钴和硫酸铜检验水的*存在*，熔点和沸点检验水的*纯度*。如果题目问某样品是否为纯水，用颜色变化回答就是错的。',
          },
        },
      ],
    },
  ],
}

export default waterNarration
