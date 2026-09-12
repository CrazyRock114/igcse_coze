import type { NarrationScript } from '@/content/types'

export const climateNarration: NarrationScript = {
  id: '10-3-air-and-climate',
  sections: [
    {
      id: 'composition',
      type: 'intro',
      title: { en: 'What clean air is made of', zh: '洁净空气的组成' },
      lines: [
        {
          id: 'comp-1',
          text: {
            en: 'Clean dry air is about seventy-eight per cent nitrogen and twenty-one per cent oxygen. That is ninety-nine per cent of it. The last one per cent is mostly argon, and carbon dioxide is a fraction of what remains — about four hundredths of one per cent.',
            zh: '洁净干燥的空气约含 78% 氮气和 21% 氧气，这已经是 99%。剩下的 1% 主要是氩气，而二氧化碳只占其中一小部分——约万分之四。',
          },
          action: { type: 'setParams', params: { gas: 0, startYear: 1750 } },
        },
        {
          id: 'comp-2',
          text: {
            en: 'Learn those three numbers. Seventy-eight, twenty-one, and carbon dioxide as a trace. They come up as a one-mark question almost every year.',
            zh: '把这三个数字记住：78、21，以及作为痕量成分的二氧化碳。它们几乎每年都作为一分题出现。',
          },
        },
      ],
    },
    {
      id: 'greenhouse',
      type: 'concept',
      title: { en: 'How the greenhouse effect works', zh: '温室效应的原理' },
      lines: [
        {
          id: 'gh-1',
          text: {
            en: 'Energy arrives from the Sun as mostly short-wavelength radiation, and the atmosphere lets it straight through. The ground absorbs it, warms up, and radiates it back out — but at a longer wavelength, because the ground is much cooler than the Sun.',
            zh: '来自太阳的能量主要以短波辐射的形式到达，大气几乎让它直接穿过。地面吸收后升温，再把能量辐射出去——但波长更长，因为地面比太阳冷得多。',
          },
        },
        {
          id: 'gh-2',
          text: {
            en: 'And that is where the difference lies. Carbon dioxide and methane absorb the longer wavelength going out, and re-emit it in all directions — including back down. Energy that would have left keeps some of the atmosphere warm on its way.',
            zh: '区别就在这里。二氧化碳和甲烷会吸收射出的长波辐射，并向各个方向重新发射——包括向下。本该离开的能量，在途中把部分大气留住了热量。',
          },
        },
        {
          id: 'gh-3',
          text: {
            en: 'This is not a fault. Without any greenhouse effect the Earth would average about minus eighteen degrees and be uninhabitable. The question is not whether it happens but how much of it there is, and that depends on how much of these gases the air holds.',
            zh: '这本身不是坏事。若完全没有温室效应，地球平均温度约为 −18 °C，无法居住。问题不在于它是否存在，而在于强弱程度，这取决于空气中这些气体的含量。',
          },
        },
      ],
    },
    {
      id: 'record',
      type: 'interaction',
      title: { en: 'What the measurements show', zh: '测量结果告诉我们什么' },
      lines: [
        {
          id: 'rec-1',
          text: {
            en: 'Here is carbon dioxide from 1750 onwards. Ice cores give us the early part — air trapped in bubbles in Antarctic ice — and direct measurement takes over from about 1960. The flat grey line is the level before industrialisation.',
            zh: '这是 1750 年以来的二氧化碳。早期数据来自冰芯——南极冰层气泡中封存的空气——1960 年前后开始改为直接测量。那条灰色水平线是工业化之前的水平。',
          },
        },
        {
          id: 'rec-2',
          text: {
            en: 'From 1750 to 1850 it rose by eight parts per million in a century. Under one per decade. That is what a stable atmosphere looks like.',
            zh: '1750 到 1850 年的一个世纪里，它上升了 8 ppm，每十年不到 1 ppm。这就是一个稳定大气的样子。',
          },
        },
        {
          id: 'rec-3',
          text: {
            en: 'Now slide the window forward to 1960. The rate per decade jumps to about sixteen — twenty times what it was. And it is still climbing. Nothing about that shape is gradual.',
            zh: '现在把窗口移到 1960 年。每十年的增速跃升到约 16 ppm——是原来的二十倍，而且仍在攀升。这条曲线的形状没有任何"渐进"可言。',
          },
          action: { type: 'setParams', params: { gas: 0, startYear: 1960 } },
          pause: 1,
        },
        {
          id: 'rec-4',
          text: {
            en: 'Methane tells the same story more sharply. It is a thousand times rarer, which is why it is quoted in parts per billion — but it has more than doubled since 1750, where carbon dioxide is up by about half.',
            zh: '甲烷讲述了同一个故事，而且更为陡峭。它的浓度低一千倍，所以用 ppb 计——但自 1750 年以来它已增加一倍多，而二氧化碳约上升了一半。',
          },
          action: { type: 'setParams', params: { gas: 1, startYear: 1750 } },
        },
        {
          id: 'rec-5',
          text: {
            en: 'Carbon dioxide comes from burning fossil fuels and from clearing the forests that would have absorbed it. Methane comes from livestock, rice paddies, rotting waste in landfill, and leaks from gas extraction.',
            zh: '二氧化碳来自燃烧化石燃料，以及砍伐本可吸收它的森林。甲烷来自牲畜、稻田、垃圾填埋场中腐烂的废物，以及天然气开采中的泄漏。',
          },
        },
      ],
    },
    {
      id: 'pollutants',
      type: 'concept',
      title: { en: 'The other things in the air', zh: '空气中的其他东西' },
      lines: [
        {
          id: 'poll-1',
          text: {
            en: 'Greenhouse gases are not the same thing as pollutants, and the syllabus wants four pollutants with a source and an effect for each. Carbon monoxide: incomplete combustion. It is toxic because it binds to haemoglobin and stops your blood carrying oxygen.',
            zh: '温室气体不等于污染物，考纲要求掌握四种污染物，各自的来源与危害。一氧化碳：不完全燃烧产生。它有毒，因为它与血红蛋白结合，使血液无法运输氧气。',
          },
        },
        {
          id: 'poll-2',
          text: {
            en: 'Sulfur dioxide: from burning fossil fuels that contain sulfur compounds. It dissolves in rain to make acid rain, which damages buildings, kills trees and acidifies lakes.',
            zh: '二氧化硫：燃烧含硫化合物的化石燃料时产生。它溶于雨水形成酸雨，腐蚀建筑、毁坏树木、使湖泊酸化。',
          },
        },
        {
          id: 'poll-3',
          text: {
            en: 'Oxides of nitrogen: made inside a hot engine, where nitrogen and oxygen from the air react together. Endothermic, so it only happens where it is hot enough. They cause acid rain too, and photochemical smog in sunlight.',
            zh: '氮氧化物：在高温发动机内生成，空气中的氮气与氧气在那里反应。这是吸热反应，所以只在足够高温处发生。它们同样造成酸雨，并在阳光下形成光化学烟雾。',
          },
        },
        {
          id: 'poll-4',
          text: {
            en: 'And particulates — tiny solid specks from incomplete combustion, mostly carbon. They lodge in lungs and cause respiratory disease.',
            zh: '还有颗粒物——不完全燃烧产生的微小固体颗粒，主要是碳。它们沉积在肺部，引起呼吸系统疾病。',
          },
        },
      ],
    },
    {
      id: 'solutions',
      type: 'concept',
      title: { en: 'What can be done about it', zh: '可以采取什么措施' },
      lines: [
        {
          id: 'sol-1',
          text: {
            en: 'A catalytic converter deals with three of those at once. Inside the exhaust, over a platinum surface, carbon monoxide and nitrogen monoxide react with each other: the carbon monoxide is oxidised to carbon dioxide and the nitrogen monoxide is reduced to nitrogen.',
            zh: '催化转化器能同时处理其中三种。在排气管内的铂表面上，一氧化碳与一氧化氮相互反应：一氧化碳被氧化为二氧化碳，一氧化氮被还原为氮气。',
          },
        },
        {
          id: 'sol-2',
          text: {
            en: 'Two poisons in, two harmless gases out. Notice it does nothing about the carbon dioxide — it makes more of it. A catalytic converter is an air-quality device, not a climate one, and that distinction is worth marks.',
            zh: '两种有毒气体进去，两种无害气体出来。注意它对二氧化碳毫无帮助——反而生成更多。催化转化器是治理空气质量的装置，不是治理气候的，这个区别是得分点。',
          },
        },
        {
          id: 'sol-3',
          text: {
            en: 'For the climate itself, the strategies are: use less fossil fuel and more renewable energy, plant trees to absorb carbon dioxide, capture and store it at power stations, and reduce methane from farming and landfill.',
            zh: '至于气候本身，措施包括：减少化石燃料、增加可再生能源；植树以吸收二氧化碳；在电厂捕集并封存二氧化碳；减少农业与垃圾填埋产生的甲烷。',
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
            en: 'Air is 78% nitrogen, 21% oxygen. Four pollutants, each with a source and an effect. Two greenhouse gases: carbon dioxide and methane. And a catalytic converter fixes air quality, not the climate.',
            zh: '空气含 78% 氮气、21% 氧气。四种污染物，各有来源与危害。两种温室气体：二氧化碳和甲烷。催化转化器改善空气质量，而不是气候。',
          },
        },
        {
          id: 'summary-2',
          text: {
            en: 'When explaining the greenhouse effect, name the two wavelengths. Short in, long out, and the greenhouse gases absorb the long one. An answer that just says "the gases trap the heat" is describing the result, not the mechanism.',
            zh: '解释温室效应时，要提到两种波长：短波进入、长波射出，而温室气体吸收长波。只写"这些气体把热量困住了"是在描述结果，不是机理。',
          },
        },
      ],
    },
  ],
}

export default climateNarration
