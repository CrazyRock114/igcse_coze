import type { NarrationScript } from '@/content/types'

export const measurementNarration: NarrationScript = {
  id: '1-1-measurement',
  sections: [
    {
      id: 'measuring',
      type: 'intro',
      title: { en: 'Measuring something too small to measure', zh: '测量小到无法直接测量的东西' },
      lines: [
        {
          id: 'me-1',
          text: {
            en: 'Length with a ruler, volume with a measuring cylinder, time with a clock or a digital timer. Simple enough — until the thing you want is smaller than your instrument can resolve.',
            zh: '长度用尺，体积用量筒，时间用钟表或电子计时器。看起来很简单——直到你要测的东西小于仪器所能分辨的程度。',
          },
        },
        {
          id: 'me-2',
          text: {
            en: 'The trick is to measure many and divide. The thickness of one sheet of paper is beyond a ruler, so measure a hundred sheets and divide by a hundred. The period of one swing of a pendulum is hard to time, so time twenty swings and divide by twenty.',
            zh: '办法是"测多个再除"。一张纸的厚度尺子量不出来，那就量一百张再除以一百。单摆摆动一次的周期难以计时，那就给二十次计时再除以二十。',
          },
        },
        {
          id: 'me-3',
          text: {
            en: 'And it is worth being clear why this works, because it is not averaging away random scatter. Your reading uncertainty is the same whether you measure one sheet or a hundred — about half a millimetre either way. Divide by a hundred and that uncertainty is divided by a hundred too.',
            zh: '而且值得弄清它为什么有效，因为它并不是在平均掉随机波动。无论你量一张还是一百张，读数的不确定度都一样——大约半毫米。除以一百之后，这个不确定度也被除以了一百。',
          },
        },
        {
          id: 'me-4',
          text: {
            en: 'For an irregular solid, use displacement: put it in a measuring cylinder of water and read the rise. And for anything measured off a scale, read at eye level — looking from an angle gives a parallax error, which is a systematic mistake and does not average out.',
            zh: '测不规则固体则用排水法：放进装水的量筒，读取水面上升的量。而任何从刻度上读数的操作，都要平视——斜着看会产生视差误差，那是系统误差，不会被平均掉。',
          },
        },
      ],
    },
    {
      id: 'scalars',
      type: 'concept',
      title: { en: 'Two kinds of quantity', zh: '两类物理量' },
      lines: [
        {
          id: 'sc-1',
          text: {
            en: 'A scalar has magnitude only: how much, and nothing else. A vector has magnitude and direction, and the direction is part of the quantity rather than extra information about it.',
            zh: '标量只有大小：多少，没有别的。矢量既有大小又有方向，而方向是这个量本身的一部分，不是关于它的附加信息。',
          },
        },
        {
          id: 'sc-2',
          text: {
            en: 'Scalars: distance, speed, time, mass, energy, temperature. Vectors: displacement, velocity, acceleration, force, weight, momentum, and the strength of a gravitational, electric or magnetic field.',
            zh: '标量：距离、速率、时间、质量、能量、温度。矢量：位移、速度、加速度、力、重力、动量，以及重力场、电场或磁场的强度。',
          },
        },
        {
          id: 'sc-3',
          text: {
            en: 'The pairs are the ones to learn: distance and displacement, speed and velocity. Walk once round a running track and your distance is four hundred metres and your displacement is zero. Your average speed was several metres per second and your average velocity was nothing at all.',
            zh: '要记的是这些成对的量：距离与位移、速率与速度。绕跑道走一圈，你的距离是四百米，位移是零。你的平均速率有每秒几米，平均速度却完全为零。',
          },
        },
      ],
    },
    {
      id: 'adding',
      type: 'interaction',
      title: { en: 'Why it is not just addition', zh: '为什么不能简单相加' },
      lines: [
        {
          id: 'ad-1',
          text: {
            en: 'Add two scalars and you add the numbers. Add two vectors and you cannot, unless they happen to point the same way. Here are two perpendicular vectors — six units east and eight units north.',
            zh: '两个标量相加，就是数字相加。两个矢量相加则不行，除非它们恰好方向相同。这里有两个互相垂直的矢量——向东 6 个单位、向北 8 个单位。',
          },
          action: { type: 'setParams', params: { a: 6, b: 8, scale: 10 } },
        },
        {
          id: 'ad-2',
          text: {
            en: 'Six plus eight is fourteen, and the answer is ten. Look at the dashed lines: they complete the rectangle, and the resultant is its diagonal. That is where the right angle comes from, and it is why Pythagoras applies at all.',
            zh: '6 加 8 是 14，而答案是 10。看那两条虚线：它们补全了矩形，合矢量就是它的对角线。直角正是从这里来的，勾股定理也正因此才适用。',
          },
        },
        {
          id: 'ad-3',
          text: {
            en: 'Notice the resultant is longer than either vector on its own but shorter than their sum. That is always true for two vectors at any angle other than zero, and it is a quick check on an answer.',
            zh: '注意合矢量比任一分矢量都长，但短于两者之和。对于夹角不为零的两个矢量，这总是成立的，可以用来快速检验答案。',
          },
        },
        {
          id: 'ad-4',
          text: {
            en: 'There are two legitimate methods. Calculate: the magnitude is the square root of six squared plus eight squared, and the angle comes from the tangent. Or draw it to scale with a ruler and protractor and measure the diagonal.',
            zh: '有两种都算数的方法。计算：大小是 6 的平方加 8 的平方再开根，角度由正切求得。或者按比例作图，用直尺和量角器量出对角线。',
          },
        },
        {
          id: 'ad-5',
          text: {
            en: 'Both readings are on screen. Set the scale small — two millimetres per unit — and look at the difference. The drawing and the calculation no longer agree, because a ruler reads to the nearest millimetre and at that scale a millimetre is half a unit.',
            zh: '两个读数都显示在屏幕上。把比例尺调小——每单位 2 毫米——再看差值。作图与计算不再一致了，因为尺子只能读到毫米，而在这个比例下 1 毫米就是半个单位。',
          },
          action: { type: 'setParams', params: { a: 3.7, b: 5.3, scale: 2 } },
          pause: 1,
        },
        {
          id: 'ad-6',
          text: {
            en: 'Now draw it larger. The difference shrinks. A scale drawing is not a worse method than calculating — it is a method with a precision you control, and the way to control it is to draw big.',
            zh: '现在画大一些，差值就缩小了。作图并不是比计算更差的方法——它是一种精度由你掌握的方法，而掌握它的办法就是把图画大。',
          },
          action: { type: 'setParams', params: { a: 3.7, b: 5.3, scale: 20 } },
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
            en: 'To measure something small, measure many and divide — the uncertainty is divided too. Read scales at eye level to avoid parallax.',
            zh: '测很小的量，就测很多个再除——不确定度也被一并除掉了。读刻度要平视，以免产生视差。',
          },
        },
        {
          id: 'sum-2',
          text: {
            en: 'Scalar: magnitude only. Vector: magnitude and direction. Distance and speed are scalars; displacement, velocity, acceleration and force are vectors.',
            zh: '标量：只有大小。矢量：既有大小又有方向。距离和速率是标量；位移、速度、加速度和力是矢量。',
          },
        },
        {
          id: 'sum-3',
          text: {
            en: 'For two perpendicular vectors, the resultant is the diagonal of the rectangle: Pythagoras for the magnitude, tangent for the angle. And always state the direction — a vector answer without one is only half an answer.',
            zh: '对两个垂直矢量，合矢量是矩形的对角线：大小用勾股定理，角度用正切。而且一定要写出方向——矢量的答案没有方向，只答了一半。',
          },
        },
      ],
    },
  ],
}

export default measurementNarration
