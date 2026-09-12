import type { NarrationScript } from '@/content/types'

export const groupsNarration: NarrationScript = {
  id: '8-2-groups',
  sections: [
    {
      id: 'intro',
      type: 'intro',
      title: { en: 'Two groups, two directions', zh: '两个族，两个方向' },
      lines: [
        {
          id: 'intro-1',
          text: {
            en: 'Group I and Group VII are the two groups the syllabus wants in detail, and there is one thing that goes wrong more than anything else: the direction. One gets more reactive going down. The other gets less.',
            zh: '第 I 主族和第 VII 主族是考纲要求详细掌握的两个族，而最容易出错的只有一件事：方向。一个越往下越活泼，另一个越往下越不活泼。',
          },
          action: { type: 'setParams', params: { group: 0, element: 0 } },
        },
        {
          id: 'intro-2',
          text: {
            en: 'Group I, the alkali metals. Lithium fizzes on water and floats. Sodium melts into a ball and skims about. Potassium bursts into a lilac flame. Each one further down is more violent than the last.',
            zh: '第 I 主族，碱金属。锂在水面上冒泡并浮着。钠熔成小球四处游动。钾则燃起淡紫色火焰。越往下，反应一个比一个剧烈。',
          },
          action: { type: 'setParams', params: { group: 0, element: 2 } },
          pause: 1,
        },
        {
          id: 'intro-3',
          text: {
            en: 'Rubidium and caesium are below potassium, and you have never seen them demonstrated because they explode. That is the trend, and it lets you predict properties of elements you will never handle.',
            zh: '铷和铯排在钾之下，你从没见过它们的演示实验，因为它们会爆炸。这就是趋势，它让你能预测那些永远接触不到的元素的性质。',
          },
          action: { type: 'setParams', params: { group: 0, element: 4 } },
        },
      ],
    },
    {
      id: 'halogens',
      type: 'interaction',
      title: { en: 'Now the other way', zh: '再看相反的方向' },
      lines: [
        {
          id: 'hal-1',
          text: {
            en: 'Switch to Group VII. Look at the arrow — it has turned round. The halogens get *less* reactive as you go down, not more.',
            zh: '切换到第 VII 主族。看那个箭头——它掉头了。卤素越往下*越不*活泼，而不是越活泼。',
          },
          action: { type: 'setParams', params: { group: 1, element: 1 } },
        },
        {
          id: 'hal-2',
          text: {
            en: 'And there is one reason behind both directions. Going down a group, the outer shell is further from the nucleus and better shielded by the shells inside it.',
            zh: '而这两个方向背后的原因是同一个。沿族向下，最外层离原子核更远，内层的屏蔽作用也更强。',
          },
        },
        {
          id: 'hal-3',
          text: {
            en: 'A Group I metal reacts by *losing* its outer electron. Further away and better shielded means it is held less tightly, so it goes more easily. More reactive.',
            zh: '第 I 主族金属的反应方式是*失去*最外层电子。离得更远、屏蔽更强意味着束缚更弱，所以更容易失去。因此更活泼。',
          },
        },
        {
          id: 'hal-4',
          text: {
            en: 'A halogen reacts by *gaining* an electron. Further away and better shielded means an incoming electron is pulled in less strongly, so it is harder to capture. Less reactive. Same cause, opposite effect — because one is giving and the other is taking.',
            zh: '卤素的反应方式是*得到*一个电子。离得更远、屏蔽更强意味着对外来电子的吸引更弱，因而更难捕获。因此更不活泼。原因相同、结果相反——因为一个是给，一个是拿。',
          },
        },
      ],
    },
    {
      id: 'appearance',
      type: 'concept',
      title: { en: 'What the halogens look like', zh: '卤素的样子' },
      lines: [
        {
          id: 'app-1',
          text: {
            en: 'The halogens are the one group where you are asked for appearances by name. Chlorine: a yellow-green gas. Bromine: a red-brown liquid. Iodine: a grey-black solid that sublimes to a purple vapour.',
            zh: '卤素是唯一一个要求你按名称说出外观的族。氯：黄绿色气体。溴：红棕色液体。碘：灰黑色固体，升华为紫色蒸气。',
          },
          action: { type: 'setParams', params: { group: 1, element: 2 } },
        },
        {
          id: 'app-2',
          text: {
            en: 'Gas, liquid, solid, in three consecutive elements — you will not find that anywhere else in the table. Look at the melting point graph: the halogen line climbs steeply and crosses room temperature between bromine and iodine.',
            zh: '气、液、固三态出现在连续三个元素中——表中别处找不到这种情况。看熔点图：卤素那条线陡峭上升，在溴与碘之间越过室温。',
          },
        },
        {
          id: 'app-3',
          text: {
            en: 'And on the same axes, the Group I line falls. Two groups, two opposite trends, one graph. If you can see that picture in your head you will not get the direction wrong.',
            zh: '而在同一坐标系上，第 I 主族那条线是下降的。两个族、两个相反的趋势、一张图。脑中有这幅图，方向就不会记反。',
          },
        },
      ],
    },
    {
      id: 'displacement',
      type: 'interaction',
      title: { en: 'Halogens pushing each other out', zh: '卤素之间的置换' },
      lines: [
        {
          id: 'disp-1',
          text: {
            en: 'Because reactivity has an order, a halogen can take an electron off the ion of a less reactive one. Add chlorine water to potassium bromide and the solution turns orange — the chlorine has pushed the bromine out.',
            zh: '因为活动性有次序，活泼的卤素能从较不活泼卤素的离子上夺走电子。把氯水加入溴化钾溶液，溶液变橙——氯把溴置换出来了。',
          },
          action: { type: 'setParams', params: { group: 1, element: 1 } },
        },
        {
          id: 'disp-2',
          text: {
            en: 'The line shows what chlorine can reach: bromine and iodine, both below it. Try bromine instead and the line moves up — it can displace iodine, but not chlorine.',
            zh: '这条线显示了氯能够到的范围：溴和碘，都在它下面。换成溴，线就上移了——它能置换碘，但置换不了氯。',
          },
          action: { type: 'setParams', params: { group: 1, element: 2 } },
          pause: 1,
        },
        {
          id: 'disp-3',
          text: {
            en: 'Iodine is at the bottom, so it displaces nothing and the line disappears. Add iodine to potassium chloride and absolutely nothing happens — which is a result worth stating, because it is half the evidence for the order.',
            zh: '碘在最下面，所以它谁也置换不了，线也随之消失。把碘加入氯化钾溶液，什么都不会发生——这个结果值得写出来，因为它是确定次序的另一半证据。',
          },
          action: { type: 'setParams', params: { group: 1, element: 3 } },
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
            en: 'Group I: soft, low density, low melting points, and more reactive down the group. Group VII: colours darkening and melting points rising down the group, and less reactive down it.',
            zh: '第 I 主族：软、密度低、熔点低，沿族向下越来越活泼。第 VII 主族：沿族向下颜色变深、熔点升高，但活动性降低。',
          },
        },
        {
          id: 'summary-2',
          text: {
            en: 'When asked to explain either trend, say where the outer shell is: further from the nucleus, more shielded. Then say what that does to losing an electron, or to gaining one. That second half is the mark.',
            zh: '被要求解释任一趋势时，先说最外层的位置：离核更远、屏蔽更强。再说这对失去电子、或对得到电子有什么影响。后半句才是得分点。',
          },
        },
      ],
    },
  ],
}

export default groupsNarration
