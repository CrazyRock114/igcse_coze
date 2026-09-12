import type { NarrationScript } from '@/content/types'

export const universeNarration: NarrationScript = {
  id: '6-2-universe',
  sections: [
    {
      id: 'intro',
      type: 'intro',
      title: { en: 'Everything is running away', zh: '一切都在远离' },
      lines: [
        {
          id: 'intro-1',
          text: {
            en: 'Light from distant galaxies arrives with its wavelength stretched towards the red end of the spectrum. That is redshift, and almost every galaxy shows it — they are all moving away from us.',
            zh: '来自遥远星系的光，波长被拉长、偏向光谱的红端。这就是红移，几乎每个星系都有——它们都在远离我们。',
          },
          action: { type: 'setParams', params: { hubbleConstant: 2.2, galaxyCount: 12, scatter: 0.5 } },
        },
        {
          id: 'intro-2',
          text: {
            en: 'Measure how fast each one recedes and plot it against distance. The points fall on a straight line through the origin — the further away a galaxy is, the faster it is receding.',
            zh: '测出每个星系的退行速度，再对距离作图。这些点落在一条过原点的直线上——星系越远，退行越快。',
          },
        },
      ],
    },
    {
      id: 'hubble',
      type: 'equation',
      title: { en: 'The gradient has a name', zh: '这个斜率有名字' },
      lines: [
        {
          id: 'hub-1',
          text: {
            en: 'That straight line is Hubble’s law. Its gradient is the Hubble constant — the ratio of a galaxy’s recession speed to its distance from us.',
            zh: '这条直线就是哈勃定律。它的斜率是哈勃常数——星系退行速度与其距离之比。',
          },
          latex: 'H_0 = \\frac{v}{d}',
        },
        {
          id: 'hub-2',
          text: {
            en: 'And here is the remarkable part. Turn that constant upside down and you get a time — an estimate of how long the expansion has been going on. About fourteen thousand million years.',
            zh: '精彩之处在于：把这个常数取倒数，得到的是一段时间——膨胀持续至今的估计时长，约一百四十亿年。',
          },
          latex: '\\text{age} \\approx \\frac{1}{H_0}',
        },
        {
          id: 'hub-3',
          text: {
            en: 'Raise the Hubble constant and watch the age fall. A faster expansion means less time was needed to reach the Universe we see today.',
            zh: '调高哈勃常数，看年龄下降。膨胀越快，达到今天所见的宇宙所需的时间就越短。',
          },
          action: { type: 'setParams', params: { hubbleConstant: 4, galaxyCount: 12, scatter: 0.5 } },
          pause: 1,
        },
      ],
    },
    {
      id: 'measuring',
      type: 'concept',
      title: { en: 'How the two numbers are found', zh: '两个数是怎么测的' },
      lines: [
        {
          id: 'meas-1',
          text: {
            en: 'The speed comes from the redshift: measure how much the wavelength has stretched and you have the recession speed. The distance is harder — astronomers use the brightness of a supernova in that galaxy.',
            zh: '速度来自红移：测出波长被拉长了多少，就得到退行速度。距离更难——天文学家用该星系中超新星的亮度来推算。',
          },
          action: { type: 'setParams', params: { hubbleConstant: 2.2, galaxyCount: 16, scatter: 1 } },
        },
        {
          id: 'meas-2',
          text: {
            en: 'Distances are the uncertain part, which is why the points scatter about the line. Turn the scatter up and the trend is still unmistakable, even though no single point sits exactly on the line.',
            zh: '距离是不确定性的主要来源，所以数据点会散落在直线周围。把散布调大，趋势依然清晰可辨，尽管没有一个点正好落在线上。',
          },
        },
      ],
    },
    {
      id: 'bigbang',
      type: 'application',
      title: { en: 'Two pieces of evidence', zh: '两条证据' },
      lines: [
        {
          id: 'bb-1',
          text: {
            en: 'If everything is flying apart now, then in the past everything was closer together. Run it far enough back and the whole Universe was concentrated in one place. That is the Big Bang theory, and redshift is the first piece of evidence for it.',
            zh: '如果现在一切都在飞散，那么过去一切都更靠近。回溯得足够远，整个宇宙曾集中于一处。这就是大爆炸理论，红移是它的第一条证据。',
          },
        },
        {
          id: 'bb-2',
          text: {
            en: 'The second is the cosmic microwave background — faint microwave radiation coming from every direction in the sky. It was produced shortly after the Universe formed, and has been stretched into the microwave region by the expansion ever since.',
            zh: '第二条是宇宙微波背景辐射——来自天空各个方向的微弱微波。它产生于宇宙形成后不久，此后被膨胀不断拉长，直到落入微波波段。',
          },
        },
      ],
    },
    {
      id: 'stars',
      type: 'concept',
      title: { en: 'Scale, and the life of a star', zh: '尺度与恒星的一生' },
      lines: [
        {
          id: 'stars-1',
          text: {
            en: 'Some scale first. The Sun is a medium-sized star, one of many billions in the Milky Way, which is about a hundred thousand light-years across — and the Milky Way is one of many billions of galaxies.',
            zh: '先说尺度。太阳是一颗中等大小的恒星，是银河系数千亿颗恒星之一；银河系直径约十万光年——而银河系只是数千亿个星系中的一个。',
          },
        },
        {
          id: 'stars-2',
          text: {
            en: 'Stars form from clouds of gas and dust pulled together by gravity. A protostar becomes stable when the inward pull of gravity is balanced by the outward push from its hot centre, where hydrogen is fusing into helium.',
            zh: '恒星由引力聚拢的气体尘埃云形成。当向内的引力与炽热核心向外的压力平衡时，原恒星成为稳定恒星，核心处氢正聚变为氦。',
          },
        },
        {
          id: 'stars-3',
          text: {
            en: 'When the hydrogen runs out, the star swells into a red giant. A star like the Sun then sheds a planetary nebula and leaves a white dwarf. A much more massive star explodes as a supernova, leaving a neutron star or a black hole.',
            zh: '氢耗尽后，恒星膨胀成红巨星。像太阳这样的恒星会抛出行星状星云，留下白矮星；质量大得多的恒星则爆发为超新星，留下中子星或黑洞。',
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
            en: 'Redshift means the observed wavelength is longer, so the source is receding. Hubble’s law is v equals H nought d, and one over H nought estimates the age of the Universe. Learn the star life cycle as a sequence — the order is what earns the marks.',
            zh: '红移意味着观测波长变长，因此光源在远离。哈勃定律是 v = H₀d，而 1/H₀ 给出宇宙年龄的估计。把恒星演化背成一条顺序——得分靠的正是顺序。',
          },
        },
      ],
    },
  ],
}

export default universeNarration
