import type { NarrationScript } from '@/content/types'

export const circuitNarration: NarrationScript = {
  id: '4-3-2-series-parallel',
  sections: [
    {
      id: 'intro',
      type: 'intro',
      title: { en: 'One path or two', zh: '一条路还是两条路' },
      lines: [
        {
          id: 'intro-1',
          text: {
            en: 'Everything about circuits comes down to one question: does the charge have one path to follow, or a choice of paths? Series means one path. Parallel means a choice.',
            zh: '电路的一切都归结为一个问题：电荷只有一条路可走，还是有多条可选？串联是一条路，并联是有选择。',
          },
          action: { type: 'setParams', params: { parallel: 0, emf: 12, r1: 20, r2: 40 } },
        },
        {
          id: 'intro-2',
          text: {
            en: 'This is a series circuit. Watch the blue dots — the flowing charge. They move in lockstep all the way round, because there is nowhere else for them to go.',
            zh: '这是串联电路。看那些蓝点——流动的电荷。它们全程步调一致，因为没有别的路可走。',
          },
        },
      ],
    },
    {
      id: 'series',
      type: 'concept',
      title: { en: 'Series: current same, p.d. shares', zh: '串联：电流相同，电压分配' },
      lines: [
        {
          id: 'series-1',
          text: {
            en: 'The current is the same at every point. Both resistors read the same amps. That is why an ammeter can go anywhere in a series loop and give the same answer.',
            zh: '电流在各处都相同。两个电阻读到的电流一样。这就是为什么电流表放在串联回路的任何位置读数都相同。',
          },
        },
        {
          id: 'series-2',
          text: {
            en: 'But the p.d. does not. The forty-ohm resistor takes eight volts and the twenty-ohm resistor takes four. Twice the resistance, twice the share — and together they add up to the full twelve volts of the supply.',
            zh: '但电压不同。四十欧的电阻分到八伏，二十欧的分到四伏。电阻加倍，分压加倍——两者相加正好等于电源的十二伏。',
          },
          latex: 'V_1 + V_2 = \\text{e.m.f.}',
        },
      ],
    },
    {
      id: 'parallel',
      type: 'interaction',
      title: { en: 'Parallel: p.d. same, current splits', zh: '并联：电压相同，电流分流' },
      lines: [
        {
          id: 'parallel-1',
          text: {
            en: 'Now switch to parallel. Everything swaps over. Both resistors now get the full twelve volts, because each branch connects straight across the supply.',
            zh: '现在切换到并联。一切都反过来了。两个电阻现在都得到完整的十二伏，因为每条支路都直接接在电源两端。',
          },
          action: { type: 'setParams', params: { parallel: 1, emf: 12, r1: 20, r2: 40 } },
        },
        {
          id: 'parallel-2',
          text: {
            en: 'Look at the dots in the main wire compared with either branch. There are visibly more of them, because the main wire carries both branch currents added together.',
            zh: '比较主干线和任一支路上的蓝点数量。主干线上明显更多，因为它承载两条支路的电流之和。',
          },
          latex: 'I_{\\text{supply}} = I_1 + I_2',
          pause: 1,
        },
        {
          id: 'parallel-3',
          text: {
            en: 'And here is the result that catches people out: the combined resistance is thirteen point three ohms — less than either resistor on its own. Adding a second path always makes it easier for charge to flow, never harder.',
            zh: '还有一个最容易搞错的结论：总电阻是十三点三欧——比任何一个单独的电阻都小。多加一条路径总是让电荷更容易流动，绝不会更难。',
          },
        },
      ],
    },
    {
      id: 'meters',
      type: 'concept',
      title: { en: 'Where the meters go', zh: '电表怎么接' },
      lines: [
        {
          id: 'meters-1',
          text: {
            en: 'An ammeter goes in series, in the wire, so the current it measures passes through it. A voltmeter goes in parallel, across the component, so it samples the p.d. between two points without taking the current.',
            zh: '电流表串联接在导线里，被测电流要穿过它。电压表并联接在元件两端，测量两点间的电压而不分走电流。',
          },
        },
        {
          id: 'meters-2',
          text: {
            en: 'Swap them by mistake and the circuit breaks. A voltmeter in series has such a high resistance that almost no current flows at all.',
            zh: '接反了电路就不能工作。电压表串联时电阻极大，几乎没有电流能通过。',
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
            en: 'Series: current the same, p.d.s add, resistances add. Parallel: p.d. the same, currents add, combined resistance smaller than either. Decide which you are looking at before you write anything down.',
            zh: '串联：电流相同、电压相加、电阻相加。并联：电压相同、电流相加、总电阻小于任一支路。下笔之前先判断这是哪一种。',
          },
        },
      ],
    },
  ],
}

export default circuitNarration
