import type { NarrationScript } from '@/content/types'

export const resistanceNarration: NarrationScript = {
  id: '4-2-4-resistance',
  sections: [
    {
      id: 'intro',
      type: 'intro',
      title: { en: 'A straight line means a constant resistance', zh: '直线意味着电阻恒定' },
      lines: [
        {
          id: 'intro-1',
          text: {
            en: 'Plot current against p.d. for a fixed resistor and you get a straight line through the origin. Double the voltage, double the current. That is Ohm’s law, and a component that behaves this way is called ohmic.',
            zh: '给定值电阻作电流–电压图，得到一条过原点的直线。电压加倍，电流加倍。这就是欧姆定律，符合这一规律的元件称为欧姆元件。',
          },
          action: {
            type: 'setParams',
            params: { component: 0, resistance: 20, lengthFactor: 1, areaFactor: 1 },
          },
        },
        {
          id: 'intro-2',
          text: {
            en: 'The resistance is the gradient of the p.d. against current — or just V divided by I at any point on the line. For a straight line you get the same answer wherever you measure.',
            zh: '电阻是电压对电流图像的斜率——或者说线上任一点的 V 除以 I。对直线来说，在哪里测结果都一样。',
          },
          latex: 'R = \\frac{V}{I}',
        },
      ],
    },
    {
      id: 'lamp',
      type: 'interaction',
      title: { en: 'The lamp bends', zh: '灯泡的曲线会弯' },
      lines: [
        {
          id: 'lamp-1',
          text: {
            en: 'Now switch to a filament lamp. The line bends over. Push more current through and the filament gets hotter — and a hotter filament has a higher resistance.',
            zh: '现在切换到灯丝灯泡。曲线弯了。电流越大，灯丝越热——而灯丝越热，电阻越大。',
          },
          action: {
            type: 'setParams',
            params: { component: 1, resistance: 20, lengthFactor: 1, areaFactor: 1 },
          },
        },
        {
          id: 'lamp-2',
          text: {
            en: 'So a lamp does not have one resistance. Look at the measured value in the readings — it is higher than the cold twenty ohms, because it was measured with the filament already warm.',
            zh: '所以灯泡没有单一的电阻值。看读数里测得的电阻——它高于冷态的二十欧，因为测量时灯丝已经变热了。',
          },
          pause: 1,
        },
      ],
    },
    {
      id: 'diode',
      type: 'concept',
      title: { en: 'The diode only lets one way through', zh: '二极管只让一个方向通过' },
      lines: [
        {
          id: 'diode-1',
          text: {
            en: 'A diode is stranger still. In reverse, nothing at all — the graph sits flat on the axis. Forwards, nothing until about nought point seven volts, and then the current rises very steeply.',
            zh: '二极管更奇怪。反向时完全不导通——图像平贴在坐标轴上。正向时在约零点七伏之前也不导通，之后电流急剧上升。',
          },
          action: {
            type: 'setParams',
            params: { component: 2, resistance: 20, lengthFactor: 1, areaFactor: 1 },
          },
        },
        {
          id: 'diode-2',
          text: {
            en: 'That one-way behaviour is what makes diodes useful for turning alternating current into direct current.',
            zh: '这种单向导电性正是二极管能把交流变成直流的原因。',
          },
        },
      ],
    },
    {
      id: 'geometry',
      type: 'concept',
      title: { en: 'Longer and thinner means more resistance', zh: '越长越细，电阻越大' },
      lines: [
        {
          id: 'geom-1',
          text: {
            en: 'Back to the resistor. Resistance also depends on the shape of the wire. Make it three times longer and the resistance triples — three times as much obstacle course to get through.',
            zh: '回到定值电阻。电阻还取决于导线的形状。把它变长三倍，电阻变成三倍——要通过的"障碍"多了三倍。',
          },
          action: {
            type: 'setParams',
            params: { component: 0, resistance: 20, lengthFactor: 3, areaFactor: 1 },
          },
        },
        {
          id: 'geom-2',
          text: {
            en: 'Now make it thicker instead. Four times the cross-sectional area, a quarter of the resistance. A wider road carries the same traffic more easily.',
            zh: '现在改为把它变粗。横截面积变成四倍，电阻变成四分之一。路更宽，同样的车流更容易通过。',
          },
          action: {
            type: 'setParams',
            params: { component: 0, resistance: 20, lengthFactor: 1, areaFactor: 4 },
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
            en: 'Learn the three graph shapes by heart: straight through the origin for a resistor, curving towards the voltage axis for a lamp, and flat then steep for a diode. Sketch questions on these come up constantly.',
            zh: '把三种图形背下来：定值电阻是过原点的直线，灯泡向电压轴弯曲，二极管先平后陡。要求画这三种图的题目非常常见。',
          },
        },
      ],
    },
  ],
}

export default resistanceNarration
