import type { NarrationScript } from '@/content/types'

export const rateNarration: NarrationScript = {
  id: '6-2-rate-of-reaction',
  sections: [
    {
      id: 'intro',
      type: 'intro',
      title: { en: 'Steep then flat', zh: '先陡后平' },
      lines: [
        {
          id: 'intro-1',
          text: {
            en: 'Marble chips in hydrochloric acid give off carbon dioxide. Collect the gas and plot its volume against time, and you get this shape every time: steep at the start, then levelling off.',
            zh: '大理石块与盐酸反应放出二氧化碳。收集气体并作体积–时间图，每次都得到这个形状：起初陡峭，随后趋于水平。',
          },
          action: {
            type: 'setParams',
            params: { concentration: 1, temperature: 25, surfaceArea: 0, catalyst: 0, duration: 200 },
          },
        },
        {
          id: 'intro-2',
          text: {
            en: 'It is steepest at the beginning because that is when the most reactant is present, so collisions are most frequent. As the acid is used up the reaction slows, and when it runs out the line goes flat.',
            zh: '开始时最陡，因为此时反应物最多、碰撞最频繁。随着酸被消耗反应变慢，酸耗尽时曲线变成水平。',
          },
        },
      ],
    },
    {
      id: 'gradient',
      type: 'concept',
      title: { en: 'Gradient is the rate', zh: '斜率就是速率' },
      lines: [
        {
          id: 'grad-1',
          text: {
            en: 'The rate of reaction is the gradient of this curve. To measure the initial rate, draw a tangent at the origin and find its slope — that is the standard exam technique.',
            zh: '反应速率就是这条曲线的斜率。测初始速率的方法是在原点处画切线并求其斜率——这是标准的考试技巧。',
          },
        },
        {
          id: 'grad-2',
          text: {
            en: 'Now raise the temperature to forty-five degrees. The curve shoots up far more steeply. The grey reference line is the original run, so you can see exactly how much faster it got.',
            zh: '现在把温度升到四十五度。曲线陡峭得多。灰色参照线是原来的实验，可以清楚看出快了多少。',
          },
          action: {
            type: 'setParams',
            params: { concentration: 1, temperature: 45, surfaceArea: 0, catalyst: 0, duration: 200 },
          },
          pause: 1,
        },
        {
          id: 'grad-3',
          text: {
            en: 'But look where it ends up. Exactly the same volume of gas as before. Heating the flask made the reaction faster; it did not make any more carbon dioxide.',
            zh: '但看它最终停在哪里——和之前完全相同的气体体积。加热让反应更快，但并没有产生更多二氧化碳。',
          },
        },
      ],
    },
    {
      id: 'collisions',
      type: 'concept',
      title: { en: 'Why each factor works', zh: '各因素为何有效' },
      lines: [
        {
          id: 'coll-1',
          text: {
            en: 'Collision theory explains all of it. A reaction happens when particles collide with enough energy — at least the activation energy — and in the right orientation.',
            zh: '碰撞理论能解释这一切。反应发生的条件是：粒子相互碰撞、能量足够（至少达到活化能）、且取向合适。',
          },
        },
        {
          id: 'coll-2',
          text: {
            en: 'Higher temperature gives the particles more kinetic energy, so they collide more often *and* a greater fraction of collisions has enough energy. That second part is why heating has such a large effect.',
            zh: '温度升高使粒子动能增大，碰撞更频繁，*而且*能量足够的碰撞比例更大。第二点正是加热效果如此显著的原因。',
          },
        },
        {
          id: 'coll-3',
          text: {
            en: 'Grinding the marble into powder exposes far more surface, so the acid can reach more of it at once. Same amount of marble, many more places for collisions to happen.',
            zh: '把大理石磨成粉末暴露出多得多的表面，酸能同时接触更多部分。大理石总量不变，但可发生碰撞的位置多得多。',
          },
          action: {
            type: 'setParams',
            params: { concentration: 1, temperature: 25, surfaceArea: 2, catalyst: 0, duration: 200 },
          },
        },
        {
          id: 'coll-4',
          text: {
            en: 'A catalyst works differently. It provides a route with a lower activation energy, so a larger fraction of collisions succeeds. And it is chemically unchanged at the end — you get it all back.',
            zh: '催化剂的作用方式不同。它提供活化能更低的途径，使更大比例的碰撞成功。而且反应结束时催化剂化学性质不变——可以全部回收。',
          },
          action: {
            type: 'setParams',
            params: { concentration: 1, temperature: 25, surfaceArea: 0, catalyst: 1, duration: 200 },
          },
        },
      ],
    },
    {
      id: 'plateau',
      type: 'interaction',
      title: { en: 'The one that moves the plateau', zh: '唯一能改变平台的因素' },
      lines: [
        {
          id: 'plat-1',
          text: {
            en: 'Three factors so far, all of them steeper, all of them ending at the same volume. Now double the concentration of the acid and watch what is different.',
            zh: '到目前三个因素都让曲线变陡，但终点体积都一样。现在把酸的浓度加倍，看看有什么不同。',
          },
          action: {
            type: 'setParams',
            params: { concentration: 2, temperature: 25, surfaceArea: 0, catalyst: 0, duration: 200 },
          },
        },
        {
          id: 'plat-2',
          text: {
            en: 'The plateau moved. Twice the volume of gas. That is because the acid is the limiting reactant — there is excess marble, so doubling the acid doubles how much can react.',
            zh: '平台上移了，气体体积翻倍。因为酸是限量反应物——大理石过量，所以酸加倍，能反应的量也加倍。',
          },
          pause: 1,
        },
        {
          id: 'plat-3',
          text: {
            en: 'So in the exam, always ask which reactant runs out. Temperature, surface area and catalyst change the gradient only. Concentration changes the gradient *and* the final volume — but only when it is the limiting reactant.',
            zh: '所以考试时永远先问：哪种反应物先耗尽。温度、表面积和催化剂只改变斜率；浓度既改变斜率*又*改变终体积——但仅当它是限量反应物时。',
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
            en: 'Explain rate with collisions: frequency and energy. Steeper curve means faster, higher plateau means more product, and only the limiting reactant can move the plateau. A catalyst lowers the activation energy and is recovered unchanged.',
            zh: '用碰撞解释速率：频率与能量。曲线越陡越快，平台越高产物越多，而只有限量反应物能改变平台。催化剂降低活化能且反应后不变。',
          },
        },
      ],
    },
  ],
}

export default rateNarration
