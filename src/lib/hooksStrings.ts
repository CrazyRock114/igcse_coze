/**
 * UI chrome strings for the classroom hooks tab.
 *
 * The hook data itself (hookName, oneLiner, whatItReplaces) is in
 * `src/content/classroom-stories.ts` — bilingual there. This file is
 * for the tab chrome: filter labels, "expand" / "collapse" hints,
 * empty states, quality-tier labels.
 *
 * Same `no-Chinese-in-components` rule as the other *Strings files.
 */

import type { Bilingual } from '@/content/types'

export const HOOKS = {
  // Tab
  tabHooks: { en: 'Hooks', zh: '课堂钩子' } satisfies Bilingual,
  tabHooksCount: { en: '{count} stories', zh: '共 {count} 条' } satisfies Bilingual,

  // Page header
  hooksPageTitle: { en: 'Classroom hooks', zh: '课堂钩子库' } satisfies Bilingual,
  hooksPageSummary: {
    en: 'Story-shaped openings the teacher dropped in class — "wait, that\'s why" moments. Browse by lesson, or sort by quality. Click any hook to see the mechanism (what it replaces) and the transcript reference.',
    zh: '老师课上抛出的"等一下，原来是这样"的故事式开场。按课程筛选，按质量排序。点开任意一条看教学原理（替代了什么抽象概念）和录音原文位置。',
  } satisfies Bilingual,

  // Filter bar
  filterLesson: { en: 'Lesson', zh: '课程' } satisfies Bilingual,
  filterAllLessons: { en: 'All lessons', zh: '全部课程' } satisfies Bilingual,
  filterQuality: { en: 'Quality', zh: '质量' } satisfies Bilingual,
  filterSort: { en: 'Sort', zh: '排序' } satisfies Bilingual,
  sortQualityDate: { en: 'Quality · newest', zh: '质量 · 最新' } satisfies Bilingual,
  sortDate: { en: 'Newest first', zh: '最新优先' } satisfies Bilingual,
  sortLesson: { en: 'Lesson order', zh: '课程顺序' } satisfies Bilingual,
  clearFilters: { en: 'Clear', zh: '清除' } satisfies Bilingual,

  // Quality tier labels (A / B / C)
  qualityA: { en: 'A · essential', zh: 'A · 必讲' } satisfies Bilingual,
  qualityB: { en: 'B · useful', zh: 'B · 有用' } satisfies Bilingual,
  qualityC: { en: 'C · weak', zh: 'C · 一般' } satisfies Bilingual,

  // Card bits
  fromLesson: { en: 'From', zh: '来源' } satisfies Bilingual,
  toldOn: { en: 'Told on', zh: '讲于' } satisfies Bilingual,
  expand: { en: 'Why it works', zh: '为什么有效' } satisfies Bilingual,
  collapse: { en: 'Hide', zh: '收起' } satisfies Bilingual,
  transcriptRef: { en: 'Transcript', zh: '录音原文' } satisfies Bilingual,
  lineRef: { en: 'line ~{line}', zh: '行 ~{line}' } satisfies Bilingual,
  relatedTerms: { en: 'Related terms', zh: '相关词条' } satisfies Bilingual,
  source: { en: 'Source', zh: '来源说明' } satisfies Bilingual,

  // Empty / zero states
  hooksEmpty: {
    en: 'No hooks match these filters. Try clearing them or pick a different lesson.',
    zh: '没有匹配的钩子。试着清除筛选条件或选别的课。',
  } satisfies Bilingual,
} as const
