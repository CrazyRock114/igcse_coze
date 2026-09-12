import type { NarrationScript } from '@/content/types'

export const decayNarration: NarrationScript = {
  id: '5-2-radioactivity',
  sections: [
    {
      id: 'intro',
      type: 'intro',
      title: { en: 'Random, but predictable in bulk', zh: '单个随机，整体可测' },
      lines: [
        {
          id: 'intro-1',
          text: {
            en: 'Radioactive decay is spontaneous and random. You cannot say when any one nucleus will decay — nothing you do to it makes any difference. But with billions of nuclei, the statistics are utterly reliable.',
            zh: '放射性衰变是自发且随机的。你无法预测某一个原子核何时衰变——对它做任何事都不起作用。但当原子核数以十亿计时，统计规律极其可靠。',
          },
          action: { type: 'setParams', params: { halfLife: 3, initialRate: 800, background: 20, duration: 12 } },
        },
        {
          id: 'intro-2',
          text: {
            en: 'That reliability is the decay curve. Every three hours here, the count rate halves — eight hundred, four hundred, two hundred, one hundred. That three hours is the half-life.',
            zh: '这种可靠性就是衰变曲线。这里每过三小时计数率减半——八百、四百、二百、一百。这三小时就是半衰期。',
          },
        },
      ],
    },
    {
      id: 'background',
      type: 'concept',
      title: { en: 'Subtract the background first', zh: '先减去本底' },
      lines: [
        {
          id: 'bg-1',
          text: {
            en: 'There are two curves here, and the gap between them matters. Background radiation is always present — radon in the air, rocks, food, cosmic rays. A detector counts it whether or not your source is there.',
            zh: '这里有两条曲线，它们之间的间距很重要。本底辐射始终存在——空气中的氡、岩石、食物、宇宙射线。无论有没有放射源，探测器都会计到它。',
          },
        },
        {
          id: 'bg-2',
          text: {
            en: 'Turn the background up and watch the measured curve lift. It no longer falls to zero — it flattens out onto the background. If you read a half-life off that curve you will get the wrong answer.',
            zh: '把本底调高，看测得曲线整体抬升。它不再降到零，而是趋平于本底值。若从这条曲线读半衰期，你会得到错误答案。',
          },
          action: { type: 'setParams', params: { halfLife: 3, initialRate: 800, background: 120, duration: 12 } },
          pause: 1,
        },
        {
          id: 'bg-3',
          text: {
            en: 'So always subtract the background first. The corrected curve is the one that halves properly, and it is the only one you may take a half-life from.',
            zh: '所以一定要先减去本底。校正后的曲线才会正常减半，也只有它能用来求半衰期。',
          },
        },
      ],
    },
    {
      id: 'emissions',
      type: 'concept',
      title: { en: 'Alpha, beta, gamma', zh: 'α、β、γ' },
      lines: [
        {
          id: 'em-1',
          text: {
            en: 'Three kinds of emission. Alpha is a helium nucleus — heavy, charge plus two, stopped by a sheet of paper. Beta is a fast electron, charge minus one, stopped by a few millimetres of aluminium. Gamma is a wave, no charge, and needs thick lead.',
            zh: '三种辐射。α 是氦核——质量大、带正二价电荷，一张纸就能挡住。β 是高速电子，带负一价电荷，几毫米铝可挡住。γ 是电磁波，不带电，需要厚铅板。',
          },
        },
        {
          id: 'em-2',
          text: {
            en: 'Notice the pattern: the most ionising is the least penetrating. Alpha loses its energy fast precisely because it ionises so strongly, so it does not get far.',
            zh: '注意这个规律：电离能力最强的穿透能力最弱。α 正因为电离作用强而迅速损失能量，所以走不远。',
          },
        },
      ],
    },
    {
      id: 'equations',
      type: 'worked-example',
      title: { en: 'Decay equations', zh: '衰变方程' },
      lines: [
        {
          id: 'eq-1',
          text: {
            en: 'In alpha decay the nucleus loses two protons and two neutrons, so the nucleon number falls by four and the proton number by two. It becomes a different element.',
            zh: 'α 衰变中原子核失去两个质子和两个中子，核子数减四、质子数减二，变成另一种元素。',
          },
          latex: '^{238}_{92}\\mathrm{U} \\rightarrow\\ ^{234}_{90}\\mathrm{Th} + ^{4}_{2}\\alpha',
        },
        {
          id: 'eq-2',
          text: {
            en: 'In beta decay a neutron turns into a proton and an electron. The electron leaves, so the proton number goes up by one while the nucleon number stays the same.',
            zh: 'β 衰变中一个中子变成一个质子和一个电子。电子射出，质子数加一，核子数不变。',
          },
          latex: '^{14}_{6}\\mathrm{C} \\rightarrow\\ ^{14}_{7}\\mathrm{N} + ^{\\ \\ 0}_{-1}\\beta',
        },
      ],
    },
    {
      id: 'safety',
      type: 'application',
      title: { en: 'Time, distance, shielding', zh: '时间、距离、屏蔽' },
      lines: [
        {
          id: 'safety-1',
          text: {
            en: 'Ionising radiation damages living cells — it can kill them, cause mutations, or lead to cancer. Three precautions cover almost every exam answer: reduce the time of exposure, increase the distance from the source, and put shielding in between.',
            zh: '电离辐射会损伤活细胞——可致细胞死亡、突变或癌变。三条防护措施几乎能答遍所有考题：缩短照射时间、增大与源的距离、在中间加屏蔽。',
          },
          action: { type: 'setParams', params: { halfLife: 3, initialRate: 800, background: 20, duration: 12 } },
        },
        {
          id: 'safety-2',
          text: {
            en: 'Sources are stored in lead-lined containers and handled with tongs at arm’s length, which is time, distance and shielding all at once.',
            zh: '放射源存放在铅罐中，并用长柄夹保持距离操作——这同时用上了时间、距离与屏蔽三条。',
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
            en: 'Subtract background before doing anything with a count rate. Half-life is the time for the corrected rate to halve, from wherever you start. And check both numbers balance on every decay equation you write.',
            zh: '处理任何计数率之前先减本底。半衰期是校正后计数率减半所需的时间，从哪里开始都一样。写衰变方程时，上下两个数字都要配平。',
          },
        },
      ],
    },
  ],
}

export default decayNarration
