import type { NarrationScript } from '@/content/types'

export const osmosisNarration: NarrationScript = {
  id: '3-2-osmosis',
  sections: [
    {
      id: 'intro',
      type: 'intro',
      title: { en: 'Diffusion, but only the water', zh: '扩散，但只有水' },
      lines: [
        {
          id: 'intro-1',
          text: {
            en: 'Water is the solvent of life. Almost every reaction in a cell happens in solution, and almost everything transported round an organism is dissolved in water first.',
            zh: '水是生命的溶剂。细胞中几乎每一个反应都在溶液中进行，生物体内运输的几乎一切物质，也都先溶解在水里。',
          },
        },
        {
          id: 'intro-2',
          text: {
            en: 'Osmosis is the diffusion of water through a partially permeable membrane. Partially permeable means it lets water through but not the dissolved sucrose. So when the water cannot equalise the concentrations by moving sugar, it equalises them by moving itself.',
            zh: '渗透是水通过半透膜的扩散。"半透"是指它让水通过，却不让溶解的蔗糖通过。因此，当无法靠移动糖来使两侧浓度相等时，水就靠移动自己来达成。',
          },
        },
        {
          id: 'intro-3',
          text: {
            en: 'And say water potential, not "concentration of water". Water moves from a region of higher water potential to one of lower — from the dilute side to the concentrated side. Pure water has the highest water potential there is.',
            zh: '要说"水势"，而不是"水的浓度"。水从水势较高的区域移向水势较低的区域——从稀溶液一侧移向浓溶液一侧。纯水的水势是最高的。',
          },
        },
      ],
    },
    {
      id: 'practical',
      type: 'interaction',
      title: { en: 'What the potato experiment is really for', zh: '马铃薯实验究竟为了什么' },
      lines: [
        {
          id: 'pr-1',
          text: {
            en: 'You cut cylinders of potato, weigh them, leave each in a different concentration of sucrose, and weigh them again. Start with a weak solution — much more dilute than the cell sap inside. Water moves in, and the cylinder gains mass.',
            zh: '你切下马铃薯圆柱，称重，把它们分别放进不同浓度的蔗糖溶液，再称一次。先看稀溶液——比细胞内的细胞液稀得多。水进入，圆柱质量增加。',
          },
          action: { type: 'setParams', params: { external: 0.05, cellSap: 0.3, minutes: 60 } },
        },
        {
          id: 'pr-2',
          text: {
            en: 'Now a strong solution. Water moves out, and the cylinder loses mass — and it loses much more than it ever gained, which is worth noticing.',
            zh: '现在换浓溶液。水流出，圆柱质量减少——而且减少的幅度远大于它曾经增加的幅度，这一点值得注意。',
          },
          action: { type: 'setParams', params: { external: 0.8, cellSap: 0.3, minutes: 60 } },
          pause: 1,
        },
        {
          id: 'pr-3',
          text: {
            en: 'The reason is the cell wall. As water enters, the pressure inside pushes against the wall, and the wall pushes back. Eventually it pushes back hard enough to stop any more water coming in — the cell is turgid, and that pressure is what holds a non-woody plant up. Nothing at all stops water leaving.',
            zh: '原因在于细胞壁。水进入时，内部压力顶住细胞壁，细胞壁则反推回来。最终它推得足够强，阻止更多水进入——细胞处于膨胀状态，而这种压力正是支撑非木质植物直立的力量。但没有任何东西能阻止水流出。',
          },
        },
        {
          id: 'pr-4',
          text: {
            en: 'Which is why a plant wilts. Lose enough water and the cells go flaccid, the pressure against the walls disappears, and the stem has nothing holding it up. Lose more and the membrane pulls away from the wall altogether — plasmolysis, and by then the cell is usually dead.',
            zh: '这也是植物萎蔫的原因。失水足够多时，细胞变得松软，顶住细胞壁的压力消失，茎便失去了支撑。再失水更多，细胞膜就会完全从细胞壁上分离——这就是质壁分离，到那时细胞通常已经死了。',
          },
        },
        {
          id: 'pr-5',
          text: {
            en: 'Now the part that makes this a real experiment rather than a demonstration. Look at the first graph and find where the line crosses zero — the concentration at which the cylinders neither gain nor lose. At that point the outside and the inside are the same, so that reading *is* the concentration of the cell sap.',
            zh: '现在是让这成为一个真正实验、而不只是演示的部分。看第一张图，找到直线穿过零点的位置——在那个浓度下，圆柱既不增重也不减重。此时内外浓度相同，所以那个读数*就是*细胞液的浓度。',
          },
          action: { type: 'setParams', params: { external: 0.3, cellSap: 0.3, minutes: 60 } },
        },
        {
          id: 'pr-6',
          text: {
            en: 'You have just measured something inside a cell without ever getting inside it. Change the cell sap concentration and watch the crossing point follow it exactly. That is what the graph is for, and it is why you plot percentage change rather than the raw masses — the cylinders were not all the same size to start with.',
            zh: '你刚刚在从未进入细胞的情况下测出了细胞内部的一个量。改变细胞液的浓度，看那个交点如何精确地随之移动。这正是画这张图的目的，也是为什么要画质量变化的百分比而不是原始质量——因为各个圆柱起初的大小并不相同。',
          },
          action: { type: 'setParams', params: { external: 0.3, cellSap: 0.55, minutes: 60 } },
          pause: 1,
        },
      ],
    },
    {
      id: 'animal',
      type: 'concept',
      title: { en: 'An animal cell has no wall', zh: '动物细胞没有细胞壁' },
      lines: [
        {
          id: 'an-1',
          text: {
            en: 'Everything above depended on the cell wall. An animal cell has none, so nothing stops water entering — it swells and eventually bursts. A red blood cell put into pure water does exactly that.',
            zh: '以上一切都依赖细胞壁。动物细胞没有细胞壁，因此没有什么能阻止水进入——它会膨胀，最终胀破。把红细胞放进纯水中，正是如此。',
          },
        },
        {
          id: 'an-2',
          text: {
            en: 'And in a concentrated solution an animal cell shrinks and crinkles instead of plasmolysing, because there is no wall for the membrane to pull away from. That is why the water potential of your blood is controlled so carefully — it is the same osmosis, with no wall to save you.',
            zh: '而在浓溶液中，动物细胞会皱缩变形，而不是发生质壁分离，因为根本没有细胞壁供细胞膜脱离。这就是为什么血液的水势受到如此严格的调控——同样是渗透，只是没有细胞壁来救你。',
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
          id: 'sum-1',
          text: {
            en: 'Osmosis is the movement of water from a higher water potential to a lower one, through a partially permeable membrane. Say "water potential", say "partially permeable", and say which direction — all three are marked.',
            zh: '渗透是水通过半透膜、由水势高处向水势低处的移动。要写"水势"、要写"半透"、还要写清方向——这三点都给分。',
          },
        },
        {
          id: 'sum-2',
          text: {
            en: 'Turgid, flaccid, plasmolysed — three different states, not two. And when asked why the graph crosses zero where it does, the answer is that the solution and the cell sap have the same concentration, so there is no net movement in either direction.',
            zh: '膨胀、萎蔫、质壁分离——是三种不同状态，不是两种。当被问到图为何在那个位置穿过零点时，答案是：该处溶液与细胞液浓度相同，因此两个方向都没有净移动。',
          },
        },
      ],
    },
  ],
}

export default osmosisNarration
