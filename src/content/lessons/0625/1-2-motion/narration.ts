/**
 * Narration script for 1-2-motion.
 *
 * Lines can drive the simulation through `action`, so the explanation and the graph
 * stay in step — when the narrator says "watch what happens when it decelerates",
 * the sliders actually move. (Pattern adapted from mathviz's narration model.)
 *
 * Audio is pre-generated per language into public/audio/{en,zh}/1-2-motion/<lineId>.mp3
 * and falls back to the browser's speech synthesis when a file is missing.
 */

import type { NarrationScript } from '@/content/types'

export const motionNarration: NarrationScript = {
  id: '1-2-motion',
  sections: [
    {
      id: 'intro',
      type: 'intro',
      title: { en: 'Two graphs, one journey', zh: '两张图，一段旅程' },
      lines: [
        {
          id: 'intro-1',
          text: {
            en: 'Every motion question in this course comes down to reading one of two graphs: distance against time, or speed against time. They describe the same journey, but they are not the same shape — and confusing them is the most common way to lose marks in this topic.',
            zh: '这门课里所有运动题，归根到底都是读两种图之一：位移–时间图，或速度–时间图。它们描述同一段旅程，但形状不同——把两者混淆是本主题最常见的失分原因。',
          },
          action: { type: 'setParams', params: { u: 0, a: 2, duration: 10 } },
        },
        {
          id: 'intro-2',
          text: {
            en: 'Right now the object starts from rest and speeds up steadily. Look at the two graphs side by side: the speed–time graph is a straight line, but the distance–time graph is a curve.',
            zh: '现在物体从静止开始匀加速。对比两张图：速度–时间图是直线，而位移–时间图是曲线。',
          },
          pause: 1,
        },
      ],
    },
    {
      id: 'gradient',
      type: 'concept',
      title: { en: 'Gradient tells you the rate', zh: '斜率代表变化率' },
      lines: [
        {
          id: 'gradient-1',
          text: {
            en: 'The gradient of a distance–time graph is the speed. Steeper means faster. A horizontal line means the object is at rest.',
            zh: '位移–时间图的斜率就是速度。越陡越快。水平线表示物体静止。',
          },
          latex: 'v = \\frac{\\Delta s}{\\Delta t}',
        },
        {
          id: 'gradient-2',
          text: {
            en: 'The gradient of a speed–time graph is the acceleration. Set the acceleration to zero and watch the speed–time line go flat while the distance–time graph becomes a straight slope.',
            zh: '速度–时间图的斜率是加速度。把加速度设为零，速度–时间图变成水平线，而位移–时间图变成一条直的斜线。',
          },
          latex: 'a = \\frac{\\Delta v}{\\Delta t}',
          action: { type: 'setParams', params: { u: 10, a: 0, duration: 10 } },
          pause: 1,
        },
      ],
    },
    {
      id: 'area',
      type: 'concept',
      title: { en: 'Area under speed–time is distance', zh: '速度–时间图的面积是路程' },
      lines: [
        {
          id: 'area-1',
          text: {
            en: 'The area under a speed–time graph gives the distance travelled. For a rectangle that is just speed times time; for a triangle it is a half times base times height.',
            zh: '速度–时间图下的面积给出通过的路程。矩形就是速度乘时间；三角形是二分之一乘底乘高。',
          },
          latex: 's = \\text{area under } v\\text{–}t',
        },
        {
          id: 'area-2',
          text: {
            en: 'This is not an approximation. Check it: the distance readout below is calculated from the equation, and it matches the area under the graph exactly.',
            zh: '这不是近似。你可以验证：下方的路程读数由公式算出，与图像下的面积完全一致。',
          },
          action: { type: 'setParams', params: { u: 0, a: 2, duration: 10 } },
        },
      ],
    },
    {
      id: 'deceleration',
      type: 'interaction',
      title: { en: 'Deceleration is negative acceleration', zh: '减速就是负加速度' },
      lines: [
        {
          id: 'decel-1',
          text: {
            en: 'Now the object starts at twenty metres per second and decelerates at four metres per second squared. Notice the speed–time line slopes downwards, and the distance–time curve flattens out.',
            zh: '现在物体以每秒二十米出发，以每二次方秒四米减速。注意速度–时间图向下倾斜，位移–时间曲线逐渐变平。',
          },
          action: { type: 'setParams', params: { u: 20, a: -4, duration: 8 } },
        },
        {
          id: 'decel-2',
          text: {
            en: 'It comes to rest after five seconds and then stays still — the distance stops increasing. In calculations, treat deceleration as a negative acceleration and the equations still work.',
            zh: '它在五秒后停下并保持静止——路程不再增加。计算时把减速当作负加速度，公式依然成立。',
          },
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
            en: 'Before you read any motion graph, check the vertical axis. Distance on the axis means gradient equals speed. Speed on the axis means gradient equals acceleration and area equals distance.',
            zh: '读任何运动图像前，先看纵轴。纵轴是位移，斜率就是速度；纵轴是速度，斜率就是加速度、面积就是路程。',
          },
        },
      ],
    },
  ],
}

export default motionNarration
