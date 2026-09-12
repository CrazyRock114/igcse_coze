import type { NarrationScript } from '@/content/types'

export const soundNarration: NarrationScript = {
  id: '3-4-sound',
  sections: [
    {
      id: 'intro',
      type: 'intro',
      title: { en: 'Sound is a squeeze, not a wiggle', zh: '声音是挤压，不是摆动' },
      lines: [
        {
          id: 'intro-1',
          text: {
            en: 'Sound is made by something vibrating — a string, a speaker cone, your vocal cords. That vibration pushes on the air next to it, and the push travels outwards.',
            zh: '声音由振动产生——琴弦、扬声器纸盆、你的声带。振动推挤旁边的空气，这个推挤便向外传播。',
          },
          action: { type: 'setParams', params: { frequency: 440, medium: 0, amplitude: 0.6, wallDistance: 100 } },
        },
        {
          id: 'intro-2',
          text: {
            en: 'Watch the green particles. They move back and forth along the direction the wave travels, not across it. Sound is longitudinal — the crowded regions are compressions and the spread-out ones are rarefactions.',
            zh: '看绿色粒子。它们沿波的传播方向前后运动，而不是横向摆动。声波是纵波——密集处是密部，稀疏处是疏部。',
          },
        },
      ],
    },
    {
      id: 'medium',
      type: 'interaction',
      title: { en: 'The medium sets the speed', zh: '介质决定声速' },
      lines: [
        {
          id: 'med-1',
          text: {
            en: 'Sound needs a medium. In a vacuum there is nothing to squeeze, so there is no sound — which is why the classic bell-in-a-jar experiment goes silent as the air is pumped out.',
            zh: '声音需要介质。真空中没有可挤压的物质，所以没有声音——这就是经典的钟罩抽气实验中铃声逐渐消失的原因。',
          },
        },
        {
          id: 'med-2',
          text: {
            en: 'Now switch from air to steel. The speed jumps from about three hundred and forty metres per second to five thousand. Particles in a solid are packed close together, so a push passes on almost immediately.',
            zh: '现在从空气切换到钢。声速从约每秒三百四十米跃升到五千米。固体中粒子紧密排列，挤压几乎瞬间传递下去。',
          },
          action: { type: 'setParams', params: { frequency: 440, medium: 2, amplitude: 0.6, wallDistance: 100 } },
          pause: 1,
        },
        {
          id: 'med-3',
          text: {
            en: 'Notice what did and did not change. The frequency is set by the source, so it stays at four hundred and forty hertz. The speed changed, so the wavelength had to change with it.',
            zh: '注意什么变了、什么没变。频率由声源决定，仍是四百四十赫兹。速度变了，波长就必须随之改变。',
          },
          latex: 'v = f\\lambda \\;\\Rightarrow\\; \\lambda = \\frac{v}{f}',
        },
      ],
    },
    {
      id: 'pitch',
      type: 'concept',
      title: { en: 'Pitch and loudness', zh: '音调与响度' },
      lines: [
        {
          id: 'pitch-1',
          text: {
            en: 'Two properties, two causes, and they are independent. Frequency sets the pitch — higher frequency, higher note. Amplitude sets the loudness — bigger amplitude, louder sound.',
            zh: '两个性质，两个成因，彼此独立。频率决定音调——频率越高，音越高。振幅决定响度——振幅越大，声音越响。',
          },
          action: { type: 'setParams', params: { frequency: 880, medium: 0, amplitude: 1, wallDistance: 100 } },
        },
        {
          id: 'pitch-2',
          text: {
            en: 'A healthy young person hears from about twenty hertz up to twenty thousand hertz. Above that limit is ultrasound — inaudible to us, but bats, dolphins and medical scanners all use it.',
            zh: '健康的年轻人能听到约二十赫兹到两万赫兹。超过这个上限就是超声波——我们听不见，但蝙蝠、海豚和医学扫描仪都在使用它。',
          },
        },
      ],
    },
    {
      id: 'echo',
      type: 'worked-example',
      title: { en: 'Echoes and the factor of two', zh: '回声与那个 2' },
      lines: [
        {
          id: 'echo-1',
          text: {
            en: 'An echo is simply reflected sound. Shout at a cliff a hundred metres away and the sound has to get there and come back — two hundred metres in total, not one hundred.',
            zh: '回声就是被反射的声音。对着一百米外的峭壁喊，声音要过去再回来——总共两百米，不是一百米。',
          },
          action: { type: 'setParams', params: { frequency: 440, medium: 0, amplitude: 0.6, wallDistance: 100 } },
        },
        {
          id: 'echo-2',
          text: {
            en: 'That factor of two is where nearly every lost mark in this topic comes from. The same idea powers sonar and ultrasound scans: measure the time, halve it, multiply by the speed.',
            zh: '这个 2 正是本主题几乎所有失分的来源。声呐和超声扫描用的是同一原理：测出时间，除以二，再乘声速。',
          },
          latex: 'd = \\frac{v\\,t}{2}',
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
            en: 'Sound is longitudinal and needs a medium. Frequency comes from the source and never changes; the medium sets the speed, so the wavelength adjusts. And in any echo question, remember the sound made the journey twice.',
            zh: '声波是纵波且需要介质。频率由声源决定、始终不变；介质决定声速，波长随之调整。任何回声题都要记得声音走了两趟。',
          },
        },
      ],
    },
  ],
}

export default soundNarration
