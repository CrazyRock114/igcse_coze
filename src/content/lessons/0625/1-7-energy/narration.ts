import type { NarrationScript } from '@/content/types'

export const energyNarration: NarrationScript = {
  id: '1-7-energy',
  sections: [
    {
      id: 'intro',
      type: 'intro',
      title: { en: 'Energy is never lost', zh: '能量从不消失' },
      lines: [
        {
          id: 'intro-1',
          text: {
            en: 'Drop something and its potential energy falls while its kinetic energy rises. Watch the two curves cross. Now watch the third line — the total. It does not move.',
            zh: '让物体下落，它的势能减少而动能增加。看这两条曲线相交。再看第三条线——总能量。它纹丝不动。',
          },
          action: { type: 'setParams', params: { mass: 2, height: 10, lossFraction: 0, liftTime: 4 } },
        },
        {
          id: 'intro-2',
          text: {
            en: 'That flat line is the principle of conservation of energy. Energy is not created or destroyed, only shifted between stores — here, from the gravitational store to the kinetic store.',
            zh: '这条水平线就是能量守恒定律。能量既不产生也不消灭，只在不同储存形式间转移——这里是从重力势能转到动能。',
          },
        },
      ],
    },
    {
      id: 'equations',
      type: 'equation',
      title: { en: 'Two equations do most of the work', zh: '两个公式解决大部分问题' },
      lines: [
        {
          id: 'eq-1',
          text: {
            en: 'Potential energy is mass times gravitational field strength times height. Kinetic energy is a half times mass times speed squared. Notice the square — double the speed and you quadruple the energy.',
            zh: '势能等于质量乘重力场强度乘高度。动能等于二分之一乘质量乘速度的平方。注意那个平方——速度加倍，能量变四倍。',
          },
          latex: 'E_p = mg\\Delta h, \\qquad E_k = \\tfrac{1}{2}mv^2',
        },
        {
          id: 'eq-2',
          text: {
            en: 'Set them equal and the mass cancels. That is why a heavy ball and a light ball hit the ground at the same speed — change the mass and watch the impact speed stay put.',
            zh: '令两者相等，质量就约掉了。这就是重球和轻球落地速度相同的原因——改变质量，看撞击速度保持不变。',
          },
          action: { type: 'setParams', params: { mass: 8, height: 10, lossFraction: 0, liftTime: 4 } },
          pause: 1,
        },
      ],
    },
    {
      id: 'waste',
      type: 'interaction',
      title: { en: 'Where the energy goes', zh: '能量去哪了' },
      lines: [
        {
          id: 'waste-1',
          text: {
            en: 'Now add air resistance. The total line tilts downwards — but the energy has not vanished. It has been transferred to the surrounding air as internal energy, heating it very slightly.',
            zh: '现在加入空气阻力。总能量线向下倾斜——但能量并没有消失，而是转移给周围空气成为内能，使空气极轻微地升温。',
          },
          action: { type: 'setParams', params: { mass: 2, height: 10, lossFraction: 0.4, liftTime: 4 } },
        },
        {
          id: 'waste-2',
          text: {
            en: 'The useful energy divided by the total input, as a percentage, is the efficiency. A Sankey diagram is just this accounting drawn as arrows whose widths are the energies.',
            zh: '有用能量除以总输入再乘百分之百，就是效率。桑基图不过是把这笔账画成宽度代表能量的箭头。',
          },
          latex: '\\text{efficiency} = \\frac{\\text{useful output}}{\\text{total input}} \\times 100\\%',
        },
      ],
    },
    {
      id: 'work-power',
      type: 'concept',
      title: { en: 'Work and power', zh: '功与功率' },
      lines: [
        {
          id: 'wp-1',
          text: {
            en: 'Work done is simply energy transferred. Lifting this object back up takes exactly the potential energy it had at the top — force times distance.',
            zh: '做功就是能量转移。把这个物体重新举上去，所需的功正好等于它在顶端的势能——力乘距离。',
          },
          latex: 'W = Fd = \\Delta E',
        },
        {
          id: 'wp-2',
          text: {
            en: 'Power is how fast you do it. The same work in half the time needs twice the power. Change the lifting time and watch the power readout — the work never changes, only the power.',
            zh: '功率是做功的快慢。同样的功用一半时间完成，就需要两倍的功率。改变提升时间，观察功率读数——功不变，只有功率在变。',
          },
          latex: 'P = \\frac{W}{t} = \\frac{E}{t}',
        },
      ],
    },
    {
      id: 'resources',
      type: 'application',
      title: { en: 'Where our energy comes from', zh: '我们的能源从哪来' },
      lines: [
        {
          id: 'res-1',
          text: {
            en: 'Almost every energy resource traces back to the Sun. Fossil fuels are ancient sunlight stored by plants; wind comes from uneven solar heating; hydroelectric water was lifted by solar-driven evaporation.',
            zh: '几乎所有能源都可以追溯到太阳。化石燃料是植物储存的远古阳光；风来自太阳不均匀加热；水电站的水由太阳驱动的蒸发抬升。',
          },
        },
        {
          id: 'res-2',
          text: {
            en: 'Only three do not: geothermal, nuclear, and tidal. That is a favourite exam question, and the Sun itself is powered by nuclear fusion of hydrogen into helium.',
            zh: '只有三种例外：地热、核能和潮汐。这是常考点。而太阳本身的能量来自氢聚变为氦的核聚变。',
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
            en: 'Energy questions are accounting: input equals useful output plus waste, always. Watch for the square in the kinetic energy equation, and remember that work is energy while power is energy per second.',
            zh: '能量题就是记账：输入永远等于有用输出加损耗。注意动能公式里的平方，并记住功是能量、功率是每秒的能量。',
          },
        },
      ],
    },
  ],
}

export default energyNarration
