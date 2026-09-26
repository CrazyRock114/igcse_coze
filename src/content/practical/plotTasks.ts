/**
 * Plot-the-points tasks for the graph-paper trainer. Data only.
 */
import type { Bilingual } from '@/content/types'

export interface PlotTask {
  id: string
  title: Bilingual
  prompt: Bilingual
  xLabel: string
  yLabel: string
  xMin: number
  xMax: number
  yMin: number
  yMax: number
  /** value of one small square on each axis */
  xMinor: number
  yMinor: number
  /** the true data points the student should plot */
  points: { x: number; y: number }[]
}

export const PLOT_TASKS: PlotTask[] = [
  {
    id: 'spring-extension',
    title: { en: 'Stretching a spring', zh: '弹簧拉伸' },
    prompt: {
      en: 'A mass m (g) hangs on a spring. Plot the extension x (mm) against m.',
      zh: '弹簧下挂质量 m（g）。请描出伸长量 x（mm）对 m 的点。',
    },
    xLabel: 'm / g',
    yLabel: 'x / mm',
    xMin: 0,
    xMax: 100,
    yMin: 0,
    yMax: 50,
    xMinor: 5,
    yMinor: 2.5,
    points: [
      { x: 0, y: 0 },
      { x: 20, y: 10 },
      { x: 40, y: 20 },
      { x: 60, y: 30 },
      { x: 80, y: 40 },
      { x: 100, y: 50 },
    ],
  },
  {
    id: 'cooling-curve',
    title: { en: 'Cooling of stearic acid', zh: '硬脂酸冷却' },
    prompt: {
      en: 'Temperature θ (°C) recorded every 30 s as liquid stearic acid cools. Plot θ against t.',
      zh: '液态硬脂酸每 30 s 记录一次温度 θ（°C）。请描出 θ 对 t 的点。',
    },
    xLabel: 't / s',
    yLabel: 'θ / °C',
    xMin: 0,
    xMax: 240,
    yMin: 40,
    yMax: 90,
    xMinor: 10,
    yMinor: 2.5,
    points: [
      { x: 0, y: 88 },
      { x: 30, y: 82 },
      { x: 60, y: 76 },
      { x: 90, y: 70 },
      { x: 120, y: 70 },
      { x: 150, y: 70 },
      { x: 180, y: 66 },
      { x: 210, y: 61 },
    ],
  },
  {
    id: 'resistance-length',
    title: { en: 'Resistance of a wire', zh: '导线的电阻' },
    prompt: {
      en: 'Resistance R (Ω) of a wire against its length L (cm). Plot R against L.',
      zh: '导线电阻 R（Ω）随长度 L（cm）变化。请描出 R 对 L 的点。',
    },
    xLabel: 'L / cm',
    yLabel: 'R / Ω',
    xMin: 0,
    xMax: 100,
    yMin: 0,
    yMax: 12,
    xMinor: 5,
    yMinor: 0.5,
    points: [
      { x: 10, y: 1.5 },
      { x: 20, y: 2.4 },
      { x: 30, y: 3.6 },
      { x: 40, y: 4.4 },
      { x: 50, y: 5.6 },
      { x: 60, y: 6.4 },
      { x: 70, y: 7.7 },
      { x: 80, y: 8.5 },
      { x: 90, y: 9.6 },
    ],
  },
]
