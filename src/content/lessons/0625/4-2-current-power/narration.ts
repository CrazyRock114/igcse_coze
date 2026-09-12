import type { NarrationScript } from '@/content/types'

export const powerNarration: NarrationScript = {
  id: '4-2-current-power',
  sections: [
    {
      id: 'current',
      type: 'intro',
      title: { en: 'What is actually moving', zh: '究竟是什么在移动' },
      lines: [
        {
          id: 'cu-1',
          text: {
            en: 'Current is the flow of electric charge. In a metal the charge that moves is free electrons — the outer electrons of the metal atoms, not held to any one atom, drifting through the lattice when a supply pushes them.',
            zh: '电流是电荷的流动。在金属中移动的电荷是自由电子——金属原子的外层电子，不被任何单个原子束缚，在电源推动下在晶格中漂移。',
          },
        },
        {
          id: 'cu-2',
          text: {
            en: 'Formally, current is charge per unit time: I equals Q over t, in amperes, where one ampere is one coulomb per second. Rearranged, Q equals I t — and the t is in seconds, which is where the arithmetic usually goes wrong.',
            zh: '严格地说，电流是单位时间通过的电荷：I = Q/t，单位是安培，1 安培即每秒 1 库仑。变形得到 Q = It——这里的 t 以秒为单位，运算出错通常就出在这里。',
          },
        },
        {
          id: 'cu-3',
          text: {
            en: 'There is a wrinkle worth knowing about direction. Conventional current is defined as flowing from positive to negative, and every circuit diagram uses it. Electrons actually flow the other way, from negative to positive — the convention was fixed before anyone knew what was moving, and it was never changed.',
            zh: '关于方向有一个值得了解的细节。常规电流被定义为从正极流向负极，所有电路图都采用这个约定。而电子实际上是反方向流动的，从负极流向正极——这个约定在人们弄清是什么在移动之前就定下了，此后一直没有改。',
          },
        },
        {
          id: 'cu-4',
          text: {
            en: 'And direct current flows one way only — a cell or a battery gives d.c. Alternating current reverses direction repeatedly, many times a second; the mains supply is a.c. at fifty or sixty hertz.',
            zh: '直流只朝一个方向流动——电池提供直流。交流则反复改变方向，每秒许多次；市电是 50 或 60 赫兹的交流。',
          },
        },
      ],
    },
    {
      id: 'emf',
      type: 'concept',
      title: { en: 'Two quantities, both in volts', zh: '两个量，单位都是伏特' },
      lines: [
        {
          id: 'em-1',
          text: {
            en: 'Electromotive force is the work done by a source in driving a unit charge round a complete circuit: E equals W over Q. It is measured in volts, despite the word "force" in its name, which is a historical accident.',
            zh: '电动势是电源驱动单位电荷绕完整回路一周所做的功：E = W/Q。尽管名称中有"力"字，它的单位是伏特——这是历史遗留的叫法。',
          },
        },
        {
          id: 'em-2',
          text: {
            en: 'Potential difference is the work done by a unit charge passing through a component: V equals W over Q. Also volts. The two look identical as equations, and the difference is entirely in what the work is doing.',
            zh: '电势差是单位电荷通过某个元件时所做的功：V = W/Q。单位同样是伏特。两个式子看起来完全一样，区别全在于"功"是在做什么。',
          },
        },
        {
          id: 'em-3',
          text: {
            en: 'The clean way to hold them apart: e.m.f. is energy going in, per coulomb, from the source. Potential difference is energy coming out, per coulomb, at a component. A cell supplies e.m.f.; a lamp has a p.d. across it.',
            zh: '清晰区分它们的办法是：电动势是电源每库仑电荷"输入"的能量；电势差是元件上每库仑电荷"输出"的能量。电池提供电动势；灯泡两端存在电势差。',
          },
        },
        {
          id: 'em-4',
          text: {
            en: 'And a volt is a joule per coulomb. A twelve-volt battery gives twelve joules to every coulomb that goes round. That reading of the unit makes both equations obvious rather than arbitrary.',
            zh: '1 伏特就是 1 焦耳每库仑。12 伏电池给每一库仑绕行一周的电荷 12 焦耳的能量。这样理解单位，两个公式就变得显而易见，而不再是硬记的规定。',
          },
        },
      ],
    },
    {
      id: 'power',
      type: 'interaction',
      title: { en: 'The unit that is not what it looks like', zh: '那个名不副实的单位' },
      lines: [
        {
          id: 'po-1',
          text: {
            en: 'A circuit transfers energy from the source to the components, and from them to the surroundings. The rate at which it does that is the power: P equals I V, in watts.',
            zh: '电路把能量从电源传递到各元件，再由元件传递到周围环境。传递的速率就是功率：P = IV，单位为瓦特。',
          },
          action: { type: 'setParams', params: { voltage: 230, current: 8.7, hours: 3, pricePerKwh: 28 } },
        },
        {
          id: 'po-2',
          text: {
            en: 'That follows straight from the definitions. Power is energy per second; V is joules per coulomb and I is coulombs per second — multiply them and the coulombs cancel, leaving joules per second. It is not a formula to memorise, it is two units multiplied.',
            zh: '这直接由定义推出。功率是每秒的能量；V 是焦耳每库仑，I 是库仑每秒——相乘后库仑抵消，剩下焦耳每秒。这不是需要背的公式，只是两个单位相乘。',
          },
        },
        {
          id: 'po-3',
          text: {
            en: 'For the total energy, multiply by the time: E equals I V t, in joules. This appliance is drawing nearly nine amps at two hundred and thirty volts, so it is a two-kilowatt heater. Look at the joules reading after three hours.',
            zh: '要算总能量，再乘以时间：E = IVt，单位焦耳。这个电器在 230 伏下取用近 9 安，是一台 2 千瓦的取暖器。看运行三小时后的焦耳读数。',
          },
        },
        {
          id: 'po-4',
          text: {
            en: 'Twenty-one million joules. Which is a useless number for a bill, and that is exactly why the electricity industry uses a different unit — the kilowatt-hour.',
            zh: '两千一百多万焦耳。这个数字对电费单来说毫无用处，这正是电力行业改用另一个单位的原因——千瓦时。',
          },
        },
        {
          id: 'po-5',
          text: {
            en: 'And here is where nearly everyone goes wrong. A kilowatt-hour has a power unit in its name and it is not a power. It is a kilowatt *for an hour* — a rate multiplied by a time, which gives an amount. It is a unit of energy, exactly like the joule, only very much bigger.',
            zh: '几乎所有人都在这里出错。千瓦时的名称里带着功率单位，但它本身不是功率。它是"1 千瓦持续 1 小时"——速率乘以时间，得到的是总量。它是能量单位，和焦耳一样，只是大得多。',
          },
        },
        {
          id: 'po-6',
          text: {
            en: 'Look at the two readings together. Six kilowatt-hours and twenty-one million six hundred thousand joules are the same electricity, counted two ways. One kilowatt-hour is three point six million joules — a thousand watts times three thousand six hundred seconds.',
            zh: '把两个读数放在一起看。6 千瓦时和 21 600 000 焦耳是同一份电能的两种计法。1 千瓦时等于 360 万焦耳——1000 瓦乘以 3600 秒。',
          },
        },
        {
          id: 'po-7',
          text: {
            en: 'The cost then follows: energy in kilowatt-hours times the price per kilowatt-hour. Notice that both the power and the time matter. A five-watt bulb left on all day costs almost nothing; a three-kilowatt kettle for six minutes costs more.',
            zh: '费用随之而来：以千瓦时计的能量乘以每千瓦时的价格。注意功率和时间都重要。5 瓦的灯泡开一整天几乎不花钱；3 千瓦的水壶烧 6 分钟反而更贵。',
          },
          action: { type: 'setParams', params: { voltage: 230, current: 13, hours: 0.1, pricePerKwh: 28 } },
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
            en: 'Current is charge per second, I = Q / t, with t in seconds. Conventional current runs positive to negative; electrons run the other way.',
            zh: '电流是每秒通过的电荷，I = Q/t，其中 t 以秒计。常规电流从正到负；电子的流向相反。',
          },
        },
        {
          id: 'sum-2',
          text: {
            en: 'E.m.f. is energy supplied per coulomb by the source; p.d. is energy delivered per coulomb at a component. Both are volts, and a volt is a joule per coulomb.',
            zh: '电动势是电源每库仑所提供的能量；电势差是元件上每库仑所输出的能量。两者单位都是伏特，而 1 伏特就是 1 焦耳每库仑。',
          },
        },
        {
          id: 'sum-3',
          text: {
            en: 'P = IV, E = IVt. And a kilowatt-hour is a unit of energy equal to 3.6 million joules — to find the cost, work in kilowatts and hours, then multiply by the price.',
            zh: 'P = IV，E = IVt。千瓦时是能量单位，等于 360 万焦耳——计算费用时用千瓦和小时，再乘以单价。',
          },
        },
      ],
    },
  ],
}

export default powerNarration
