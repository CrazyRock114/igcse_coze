import type { NarrationScript } from '@/content/types'

export const heatingNarration: NarrationScript = {
  id: '2-2-thermal-properties',
  sections: [
    {
      id: 'intro',
      type: 'intro',
      title: { en: 'Two flat bits', zh: '两段水平线' },
      lines: [
        {
          id: 'intro-1',
          text: {
            en: 'Heat a block of ice steadily and plot its temperature against time. Most of the graph slopes upwards, as you would expect. But twice it goes completely flat — and the heater never stopped.',
            zh: '对一块冰持续加热，画出温度–时间图。大部分是向上的斜线，正如你所料。但有两段完全水平——而加热器一直没停。',
          },
          action: {
            type: 'setParams',
            params: { mass: 0.5, specificHeat: 4200, latentFusion: 334, latentVaporisation: 2260, power: 500 },
          },
        },
        {
          id: 'intro-2',
          text: {
            en: 'Those flat sections are melting and boiling. Energy is going in the whole time, but the temperature does not budge. That energy is separating the particles instead of speeding them up.',
            zh: '这两段水平线是熔化和沸腾。能量一直在输入，但温度纹丝不动。这些能量用于拉开粒子间距，而不是让粒子运动得更快。',
          },
        },
      ],
    },
    {
      id: 'gradient',
      type: 'equation',
      title: { en: 'The slope is the specific heat capacity', zh: '斜率对应比热容' },
      lines: [
        {
          id: 'grad-1',
          text: {
            en: 'On the sloping sections, energy raises the temperature. How much energy each degree costs is the specific heat capacity — the energy needed per kilogram per degree.',
            zh: '在倾斜段，能量使温度升高。每升高一度所需的能量就是比热容——每千克每度所需的能量。',
          },
          latex: 'c = \\frac{E}{m\\,\\Delta\\theta}',
        },
        {
          id: 'grad-2',
          text: {
            en: 'Watch what happens when I double the specific heat capacity. The slope halves. A substance with a high specific heat capacity is stubborn — it takes a lot of energy to warm it up.',
            zh: '看我把比热容加倍时会怎样。斜率减半。比热容大的物质很"倔"——要让它升温需要很多能量。',
          },
          action: {
            type: 'setParams',
            params: { mass: 0.5, specificHeat: 8000, latentFusion: 334, latentVaporisation: 2260, power: 500 },
          },
          pause: 1,
        },
        {
          id: 'grad-3',
          text: {
            en: 'That is why water is used in central heating and car radiators, and why coastal places have milder weather than inland ones. Water stores a lot of energy for each degree.',
            zh: '这就是为什么暖气和汽车散热器都用水，也是沿海地区气候比内陆温和的原因。水每升高一度能储存大量能量。',
          },
        },
      ],
    },
    {
      id: 'latent',
      type: 'concept',
      title: { en: 'Why boiling takes so much longer', zh: '为什么沸腾要久得多' },
      lines: [
        {
          id: 'lat-1',
          text: {
            en: 'Back to water. Now compare the two flat sections. The boiling plateau is nearly seven times longer than the melting one, with the same heater running.',
            zh: '回到水。比较两段水平线。在同样的加热功率下，沸腾平台比熔化平台长将近七倍。',
          },
          action: {
            type: 'setParams',
            params: { mass: 0.5, specificHeat: 4200, latentFusion: 334, latentVaporisation: 2260, power: 500 },
          },
        },
        {
          id: 'lat-2',
          text: {
            en: 'Melting only has to loosen the particles enough to let them slide past each other. Boiling has to pull them completely apart, against all the forces holding the liquid together. That takes far more energy.',
            zh: '熔化只需让粒子松动到能相互滑动。沸腾则要克服液体内部所有作用力，把粒子彻底拉开。所需能量多得多。',
          },
        },
      ],
    },
    {
      id: 'evaporation',
      type: 'concept',
      title: { en: 'Evaporation is not boiling', zh: '蒸发不是沸腾' },
      lines: [
        {
          id: 'evap-1',
          text: {
            en: 'Evaporation happens at any temperature, only at the surface, and only the most energetic particles escape. Boiling happens at one fixed temperature, throughout the liquid, with bubbles forming inside it.',
            zh: '蒸发在任何温度下都能发生，只在表面进行，且只有能量最高的粒子逸出。沸腾在固定温度下发生，在液体内部各处进行，内部会产生气泡。',
          },
        },
        {
          id: 'evap-2',
          text: {
            en: 'Because the fastest particles leave, the average energy of those remaining falls — so the liquid cools. That is why sweating works, and why you feel cold stepping out of a swimming pool.',
            zh: '由于跑掉的是最快的粒子，剩下粒子的平均能量下降——液体因此变冷。这就是出汗降温的原理，也是你出泳池时感到冷的原因。',
          },
        },
      ],
    },
    {
      id: 'expansion',
      type: 'application',
      title: { en: 'Heating makes things bigger', zh: '受热会变大' },
      lines: [
        {
          id: 'exp-1',
          text: {
            en: 'One more effect. Heat almost anything and it expands, because the particles vibrate more and push each other further apart. Gases expand most, then liquids, then solids — because the particles start out most tightly held in a solid.',
            zh: '还有一个效应。几乎所有物质受热都会膨胀，因为粒子振动加剧、彼此推得更开。气体膨胀最多，其次液体，最后固体——因为固体中粒子束缚得最紧。',
          },
        },
        {
          id: 'exp-2',
          text: {
            en: 'Engineers plan for it: gaps between railway rails, rollers under bridges, and loops in overhead power lines. Note that the particles themselves never get bigger — only the spaces between them.',
            zh: '工程师会预留余量：铁轨之间的缝隙、桥梁下的滚轴、高压线的下垂弧度。注意粒子本身从不变大——变大的只是它们之间的间隙。',
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
            en: 'Flat means changing state, sloped means changing temperature — never mix the two equations up. Use E = mcΔθ on the slopes and E = mL on the plateaus. And expansion is about spacing, never about particle size.',
            zh: '水平段是物态变化，倾斜段是温度变化——两个公式绝不能混用。斜线段用 E = mcΔθ，平台段用 E = mL。膨胀说的是间距，绝不是粒子变大。',
          },
        },
      ],
    },
  ],
}

export default heatingNarration
