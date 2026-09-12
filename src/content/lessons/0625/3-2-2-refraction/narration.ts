import type { NarrationScript } from '@/content/types'

export const refractionNarration: NarrationScript = {
  id: '3-2-2-refraction',
  sections: [
    {
      id: 'intro',
      type: 'intro',
      title: { en: 'Why a straw looks broken', zh: '吸管为什么看起来是断的' },
      lines: [
        {
          id: 'intro-1',
          text: {
            en: 'Light changes speed when it crosses from one material into another, and when it does, it changes direction. That is refraction — and it is why a straw in a glass of water looks bent at the surface.',
            zh: '光从一种介质进入另一种介质时速度改变，方向也随之改变。这就是折射——也是水杯里的吸管在水面处看起来折断的原因。',
          },
          action: { type: 'setParams', params: { angleOfIncidence: 45, n: 1.5, fromDenser: 0 } },
        },
        {
          id: 'intro-2',
          text: {
            en: 'Drag the orange dot to change the angle of incidence. Notice the refracted ray always bends towards the normal on the way into glass — angle r is always smaller than angle i.',
            zh: '拖动橙色圆点改变入射角。注意光线进入玻璃时总是向法线偏折——折射角 r 总小于入射角 i。',
          },
        },
      ],
    },
    {
      id: 'snell',
      type: 'equation',
      title: { en: 'The ratio is constant', zh: '这个比值是常数' },
      lines: [
        {
          id: 'snell-1',
          text: {
            en: 'Here is the useful part: however you change the angle, the ratio of sine i to sine r stays the same. That constant is the refractive index of the material.',
            zh: '关键在于：无论你怎么改变角度，sin i 与 sin r 的比值始终不变。这个常数就是介质的折射率。',
          },
          latex: 'n = \\frac{\\sin i}{\\sin r}',
        },
        {
          id: 'snell-2',
          text: {
            en: 'Switch the material to diamond. Its refractive index is 2.42, so it bends light far more sharply than glass — which is exactly why cut diamonds sparkle.',
            zh: '把介质换成钻石。它的折射率是 2.42，比玻璃偏折得厉害得多——这正是切割过的钻石会闪耀的原因。',
          },
          action: { type: 'setParams', params: { angleOfIncidence: 45, n: 2.42, fromDenser: 0 } },
        },
      ],
    },
    {
      id: 'tir',
      type: 'interaction',
      title: { en: 'When light cannot get out', zh: '当光出不去的时候' },
      lines: [
        {
          id: 'tir-1',
          text: {
            en: 'Now send the light the other way, from inside the glass out to the air. It bends away from the normal, so angle r is now larger than angle i.',
            zh: '现在让光反向传播，从玻璃内部射向空气。它向背离法线的方向偏折，所以折射角 r 反而大于入射角 i。',
          },
          action: { type: 'setParams', params: { angleOfIncidence: 30, n: 1.5, fromDenser: 1 } },
        },
        {
          id: 'tir-2',
          text: {
            en: 'Increase the angle slowly. At about forty-two degrees the refracted ray lies flat along the boundary. That angle is the critical angle.',
            zh: '慢慢增大角度。在约四十二度时，折射光线正好沿着界面。这个角度就是临界角。',
          },
          action: { type: 'setParams', params: { angleOfIncidence: 41, n: 1.5, fromDenser: 1 } },
        },
        {
          id: 'tir-3',
          text: {
            en: 'Push past it and the refracted ray disappears completely. All the light reflects back inside. This is total internal reflection, and it is how optical fibres carry data across oceans without leaking light.',
            zh: '再往上一点，折射光线完全消失，所有光都反射回介质内部。这就是全反射，也是光纤能横跨大洋传输数据而不漏光的原理。',
          },
          action: { type: 'setParams', params: { angleOfIncidence: 55, n: 1.5, fromDenser: 1 } },
          pause: 1,
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
            en: 'Angles are always measured from the normal, never from the surface. Into a denser medium, the ray bends towards the normal. Out of one, away from it — and beyond the critical angle, it does not get out at all.',
            zh: '角度永远从法线量起，绝不从界面量起。进入光密介质，光线向法线偏折；射出时背离法线；超过临界角则完全出不去。',
          },
        },
      ],
    },
  ],
}

export default refractionNarration
