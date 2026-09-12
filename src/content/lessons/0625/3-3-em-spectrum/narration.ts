import type { NarrationScript } from '@/content/types'

export const spectrumNarration: NarrationScript = {
  id: '3-3-em-spectrum',
  sections: [
    {
      id: 'intro',
      type: 'intro',
      title: { en: 'One family, seven names', zh: '一个家族，七个名字' },
      lines: [
        {
          id: 'intro-1',
          text: {
            en: 'Radio waves, microwaves, infrared, visible light, ultraviolet, X-rays and gamma rays. Learn that order — longest wavelength to shortest — because almost every question in this topic depends on it.',
            zh: '无线电波、微波、红外线、可见光、紫外线、X 射线、γ 射线。把这个顺序背下来——从最长波长到最短——本主题几乎每道题都依赖它。',
          },
          action: { type: 'setParams', params: { region: 3, quantity: 0 } },
        },
        {
          id: 'intro-2',
          text: {
            en: 'They look like seven different things, but they are one continuous family. The only difference between a radio wave and a gamma ray is wavelength — and the range is enormous, about sixteen powers of ten.',
            zh: '它们看似七种不同的东西，其实是一个连续的家族。无线电波与 γ 射线的唯一区别就是波长——而这个跨度极大，约十六个数量级。',
          },
        },
      ],
    },
    {
      id: 'speed',
      type: 'concept',
      title: { en: 'The flat line', zh: '那条水平线' },
      lines: [
        {
          id: 'speed-1',
          text: {
            en: 'Here is the graph that matters. Along the bottom is wavelength, on a log scale so the whole spectrum fits. Up the side is frequency times wavelength — and it is perfectly flat.',
            zh: '这就是最重要的一张图。横轴是波长，用对数刻度以容纳整个波谱。纵轴是频率乘波长——它是完全水平的。',
          },
          latex: 'c = f\\lambda = 3.0 \\times 10^{8}\\ \\text{m/s}',
        },
        {
          id: 'speed-2',
          text: {
            en: 'Every region gives the same answer: three times ten to the eight metres per second. Radio waves and gamma rays are wildly different in wavelength, yet they travel at exactly the same speed in a vacuum.',
            zh: '每个波段给出相同答案：3 × 10⁸ 米每秒。无线电波与 γ 射线波长差异悬殊，但在真空中速度完全相同。',
          },
        },
        {
          id: 'speed-3',
          text: {
            en: 'Switch to the frequency plot and you see the same fact the other way round. Log frequency falls in a perfectly straight line with a gradient of minus one — because whenever wavelength goes up by a factor of ten, frequency goes down by the same factor.',
            zh: '切换到频率图，你会从另一个角度看到同一事实。对数频率沿一条斜率为 −1 的直线下降——因为波长每增大十倍，频率就减小十倍。',
          },
          action: { type: 'setParams', params: { region: 3, quantity: 1 } },
          pause: 1,
        },
      ],
    },
    {
      id: 'uses',
      type: 'application',
      title: { en: 'Why each one is used where it is', zh: '各波段为何用在那里' },
      lines: [
        {
          id: 'uses-1',
          text: {
            en: 'The uses follow from the physics. Microwaves penetrate walls and need only a short aerial, so they carry mobile phone signals. Radio waves pass through walls but weaken, which suits Bluetooth over short ranges.',
            zh: '用途源于物理性质。微波能穿墙且只需短天线，所以用于手机信号。无线电波能穿墙但会衰减，适合短距离的蓝牙。',
          },
          action: { type: 'setParams', params: { region: 1, quantity: 0 } },
        },
        {
          id: 'uses-2',
          text: {
            en: 'Glass is transparent to visible light and short-wavelength infrared, and those can carry very high data rates — which is why optical fibres run cable television and high-speed broadband.',
            zh: '玻璃对可见光和短波红外透明，而它们能承载极高的数据速率——所以光纤用于有线电视和高速宽带。',
          },
        },
        {
          id: 'uses-3',
          text: {
            en: 'Satellite communication uses microwaves. Some satellite phones use low orbit satellites; satellite television and some phones use geostationary ones, which stay above the same point on the Earth.',
            zh: '卫星通信使用微波。有些卫星电话用低轨卫星；卫星电视和部分电话用地球同步卫星，它们始终位于地面同一点上方。',
          },
        },
      ],
    },
    {
      id: 'dangers',
      type: 'concept',
      title: { en: 'Shorter wavelength, greater hazard', zh: '波长越短，危害越大' },
      lines: [
        {
          id: 'dang-1',
          text: {
            en: 'The dangers follow the same order. Microwaves heat body cells internally. Infrared burns the skin. Ultraviolet damages surface cells and eyes and causes skin cancer. X-rays and gamma rays are ionising and mutate or kill cells.',
            zh: '危害也遵循同一顺序。微波使体内细胞受热；红外线灼伤皮肤；紫外线损伤表层细胞和眼睛并致皮肤癌；X 射线和 γ 射线具有电离性，会使细胞突变或死亡。',
          },
          action: { type: 'setParams', params: { region: 6, quantity: 0 } },
        },
      ],
    },
    {
      id: 'digital',
      type: 'concept',
      title: { en: 'Digital beats analogue', zh: '数字优于模拟' },
      lines: [
        {
          id: 'dig-1',
          text: {
            en: 'One more idea. An analogue signal varies continuously; a digital one is only ever a series of ones and zeros. Sound can be sent either way.',
            zh: '还有一点。模拟信号连续变化；数字信号只有一串 1 和 0。声音两种方式都能传输。',
          },
        },
        {
          id: 'dig-2',
          text: {
            en: 'Digital wins for two reasons: it carries more data per second, and because a receiver only has to tell a one from a zero, the signal can be regenerated cleanly and sent much further without the noise building up.',
            zh: '数字胜出有两个原因：每秒承载的数据更多；而且接收端只需分辨 1 和 0，信号可以被干净地再生并传得更远，噪声不会不断累积。',
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
            en: 'Learn the seven regions in order, both ways round. All of them travel at three times ten to the eight metres per second in a vacuum. And when asked for a use or a danger, name the region first — the marks are for matching them correctly.',
            zh: '把七个波段的顺序正反都背熟。它们在真空中的速度都是 3 × 10⁸ 米每秒。被问到用途或危害时先点明波段——得分靠的是正确对应。',
          },
        },
      ],
    },
  ],
}

export default spectrumNarration
