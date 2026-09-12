import type { NarrationScript } from '@/content/types'

export const solarNarration: NarrationScript = {
  id: '6-1-solar-system',
  sections: [
    {
      id: 'intro',
      type: 'intro',
      title: { en: 'Two families of planets', zh: '两类行星' },
      lines: [
        {
          id: 'intro-1',
          text: {
            en: 'Eight planets orbit the Sun. The four nearest are small and rocky; the four furthest are large and gaseous. That is not a coincidence — it is a clue about how the Solar System formed.',
            zh: '八颗行星绕太阳运行。最近的四颗小而多岩，最远的四颗大而多气。这不是巧合——而是太阳系如何形成的线索。',
          },
          action: { type: 'setParams', params: { planet: 2, quantity: 0 } },
        },
        {
          id: 'intro-2',
          text: {
            en: 'A cloud of gas and dust collapsed under its own gravity and began to spin, flattening into a disc. Close to the young Sun it was too hot for ice and gas to survive, so only rock and metal were left behind. Further out, the gases stayed.',
            zh: '一团气体与尘埃在自身引力下坍缩并开始旋转，逐渐摊平成盘。靠近年轻太阳处温度太高，冰和气体无法留存，只剩岩石与金属；更远处气体则得以保留。',
          },
        },
      ],
    },
    {
      id: 'orbits',
      type: 'equation',
      title: { en: 'Further out means slower', zh: '越远越慢' },
      lines: [
        {
          id: 'orb-1',
          text: {
            en: 'Average orbital speed is just the distance once round the orbit divided by the time to go round: two pi r over T.',
            zh: '平均轨道速度就是绕行一周的路程除以周期：2πr 除以 T。',
          },
          latex: 'v = \\frac{2\\pi r}{T}',
        },
        {
          id: 'orb-2',
          text: {
            en: 'Look at the graph. Every planet further from the Sun moves more slowly. Mercury races round at about forty-eight kilometres per second; Neptune crawls at five.',
            zh: '看图。离太阳越远的行星运动越慢。水星以每秒约四十八公里飞驰，海王星只有每秒五公里。',
          },
        },
        {
          id: 'orb-3',
          text: {
            en: 'The reason is gravity. The Sun holds nearly all the mass of the Solar System, and its gravitational field gets weaker with distance — so distant planets need less speed to stay in orbit.',
            zh: '原因是引力。太阳几乎占有太阳系全部质量，其引力场随距离减弱——所以远处的行星只需更小的速度就能维持轨道。',
          },
        },
      ],
    },
    {
      id: 'gravity',
      type: 'interaction',
      title: { en: 'Surface gravity is a different question', zh: '表面重力是另一回事' },
      lines: [
        {
          id: 'grav-1',
          text: {
            en: 'Switch the graph to surface gravity and the neat trend vanishes. Jupiter has by far the strongest surface gravity, and Mercury and Mars are about equal despite Mars being much further out.',
            zh: '把图切换到表面重力，整齐的趋势消失了。木星的表面重力遥遥领先，而水星和火星大致相当，尽管火星远得多。',
          },
          action: { type: 'setParams', params: { planet: 4, quantity: 1 } },
        },
        {
          id: 'grav-2',
          text: {
            en: 'That is because surface gravity depends on the mass of the planet itself, not on its distance from the Sun. Two different questions, two different answers — a favourite trap in data-analysis questions.',
            zh: '因为表面重力取决于行星自身的质量，而不是它与太阳的距离。两个不同的问题，两个不同的答案——这是数据分析题最爱设的陷阱。',
          },
          pause: 1,
        },
      ],
    },
    {
      id: 'light',
      type: 'application',
      title: { en: 'Light takes time', zh: '光需要时间' },
      lines: [
        {
          id: 'light-1',
          text: {
            en: 'The Sun is a hundred and fifty million kilometres away. Divide by the speed of light and you get about eight and a third minutes. You never see the Sun as it is now — only as it was eight minutes ago.',
            zh: '太阳距我们一亿五千万公里。除以光速，约得八又三分之一分钟。你从未看到此刻的太阳——只看到八分钟前的它。',
          },
          action: { type: 'setParams', params: { planet: 2, quantity: 0 } },
        },
        {
          id: 'light-2',
          text: {
            en: 'For Neptune it is four hours. Any calculation like this is just distance divided by three times ten to the eight metres per second — remember to convert the distance into metres first.',
            zh: '到海王星要四小时。这类计算就是距离除以 3 × 10⁸ 米每秒——记得先把距离换算成米。',
          },
        },
      ],
    },
    {
      id: 'earth',
      type: 'concept',
      title: { en: 'Day, year and month', zh: '日、年与月' },
      lines: [
        {
          id: 'earth-1',
          text: {
            en: 'Three cycles, three different motions. The Earth spins on its tilted axis once in about twenty-four hours, giving day and night. It orbits the Sun once in about three hundred and sixty-five days, and because the axis is tilted, that gives the seasons.',
            zh: '三种周期，三种运动。地球绕倾斜的自转轴约二十四小时转一圈，形成昼夜；绕太阳约三百六十五天转一圈，而由于自转轴倾斜，便产生了四季。',
          },
        },
        {
          id: 'earth-2',
          text: {
            en: 'The Moon takes about a month to orbit the Earth, which gives the cycle of phases. Keep those three straight — mixing up rotation and orbit is a common and expensive slip.',
            zh: '月球绕地球约一个月一圈，形成月相变化。把这三者分清楚——混淆自转与公转是常见且代价不小的错误。',
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
            en: 'Learn the planet order. Orbital speed falls with distance because the Sun’s field weakens; surface gravity depends on the planet’s own mass instead. And convert to metres and seconds before using v equals two pi r over T.',
            zh: '记住行星顺序。轨道速度随距离减小，因为太阳引力场变弱；表面重力则取决于行星自身质量。使用 v = 2πr/T 前先换算成米和秒。',
          },
        },
      ],
    },
  ],
}

export default solarNarration
