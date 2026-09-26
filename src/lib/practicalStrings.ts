/**
 * Bilingual interface copy for the practical-skills module.
 * (ESLint forbids CJK literals in src/components/**, so UI copy lives here.)
 */
import type { Bilingual } from '@/content/types'

export const PRACTICAL = {
  tabApparatus: { en: 'Apparatus & reading', zh: '器材与读数' } as Bilingual,
  tabGraph: { en: 'Graph paper', zh: '方格纸描点' } as Bilingual,
  apparatusHeading: { en: 'Know your apparatus', zh: '认识常用器材' } as Bilingual,
  apparatusIntro: {
    en: 'Paper 5 asks you to choose instruments and state readings. Tap a card to see what it is for; then drill yourself on cylinder and thermometer readings below.',
    zh: 'Paper 5 会考查选择器材和读数。点卡片了解用途，然后在下方练习量筒和温度计读数。',
  } as Bilingual,
  drillHeading: { en: 'Reading drill', zh: '读数练习' } as Bilingual,
  drillIntro: {
    en: 'Read the instrument to half of its smallest division — that is the tolerance the mark scheme allows.',
    zh: '读到最小刻度的一半——这是评分标准允许的误差。',
  } as Bilingual,
  yourReading: { en: 'Your reading', zh: '你的读数' } as Bilingual,
  submit: { en: 'Check', zh: '检查' } as Bilingual,
  next: { en: 'Next one', zh: '下一题' } as Bilingual,
  correct: { en: 'Correct reading!', zh: '读数正确！' } as Bilingual,
  incorrect: { en: 'Not quite.', zh: '不对哦。' } as Bilingual,
  expectedWas: { en: 'The reading is', zh: '正确读数是' } as Bilingual,
  toleranceHint: {
    en: 'credited within half a smallest division',
    zh: '误差在半个最小刻度内即可得分',
  } as Bilingual,
  streak: { en: 'streak', zh: '连对' } as Bilingual,
  graphHeading: { en: 'Plot the points', zh: '描点练习' } as Bilingual,
  graphIntro: {
    en: 'Click the grid to plot each reading. A point is credited within half a small square of the true position — then compare your best-fit line with the ideal one.',
    zh: '点击方格纸描点。落点在真实位置半个小格内即可得分——然后把你的最佳拟合线与理想线对比。',
  } as Bilingual,
  undoLast: { en: 'Undo last', zh: '撤销一点' } as Bilingual,
  clearPoints: { en: 'Clear', zh: '清空' } as Bilingual,
  checkAnswers: { en: 'Check plot', zh: '检查' } as Bilingual,
  pointsPlotted: { en: 'points plotted', zh: '已描点数' } as Bilingual,
  scoreLine: { en: 'Credited', zh: '得分点' } as Bilingual,
  of: { en: 'of', zh: '/' } as Bilingual,
  perfect: { en: 'Perfect plot — every point credited.', zh: '完美！所有点都在容差内。' } as Bilingual,
  tryAgain: {
    en: 'Red dots show where the missed points should be. Undo and try those again.',
    zh: '红点标出漏掉的点的正确位置。撤销后重新描点。',
  } as Bilingual,
  fitLine: { en: 'best fit (yours)', zh: '最佳拟合（你的）' } as Bilingual,
  fitLineIdeal: { en: 'best fit (ideal)', zh: '最佳拟合（理想）' } as Bilingual,
  fitQuality: { en: 'r² of your line', zh: '你这条线的 r²' } as Bilingual,
  nextTask: { en: 'Next dataset', zh: '下一组数据' } as Bilingual,
  backHome: { en: 'Back to lessons', zh: '返回课程' } as Bilingual,
  heading: { en: 'Practical skills (Paper 5/6)', zh: '实验技能（Paper 5/6）' } as Bilingual,
  intro: {
    en: 'Two exam-critical skills, drilled interactively: choosing and reading apparatus, and plotting data the way the mark scheme wants it.',
    zh: '两项考试关键技能的交互式练习：选择与使用器材读数，以及按评分标准描点作图。',
  } as Bilingual,
  clickToPlot: { en: 'click the grid', zh: '点击网格描点' } as Bilingual,
}
