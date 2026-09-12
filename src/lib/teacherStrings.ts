/**
 * UI chrome strings for the teacher dashboard.
 *
 * Same `no-Chinese-in-components` rule as the other *Strings files.
 */

import type { Bilingual } from '@/content/types'

export const TEACHER = {
  // Gate
  gateSignInTitle: { en: 'Sign in to use the teacher dashboard', zh: '登录后进入教师后台' } satisfies Bilingual,
  gateNotTeacherTitle: { en: 'Teacher mode is off', zh: '教师模式未开启' } satisfies Bilingual,
  gateNotTeacherBody: {
    en: 'Open the user menu (top right) and toggle "Teacher mode" to view every student\'s learning data.',
    zh: '打开右上角用户菜单，开启"教师模式"即可查看所有学生的学习数据。',
  } satisfies Bilingual,

  // Dashboard header
  dashboardTitle: { en: 'Teacher dashboard', zh: '教师后台' } satisfies Bilingual,
  dashboardSubtitle: {
    en: 'Every student who has signed in to the site. Click a row to see their full word bank, mistake log, and study map.',
    zh: '所有在本网站登录过的学生。点开任意一行查看完整生词本、错题本和学习地图。',
  } satisfies Bilingual,
  studentCount: { en: '{count} students', zh: '共 {count} 名学生' } satisfies Bilingual,

  // Table columns
  colName: { en: 'Student', zh: '学生' } satisfies Bilingual,
  colLastActive: { en: 'Last active', zh: '最近活动' } satisfies Bilingual,
  colMistakes: { en: 'Mistakes', zh: '错题数' } satisfies Bilingual,
  colWords: { en: 'Word bank', zh: '生词数' } satisfies Bilingual,
  colStatements: { en: 'Statements', zh: '知识点' } satisfies Bilingual,
  colAttempts: { en: 'Attempts', zh: '答题数' } satisfies Bilingual,
  colWrongRate: { en: 'Wrong rate', zh: '错题率' } satisfies Bilingual,
  teacherBadge: { en: 'teacher', zh: '教师' } satisfies Bilingual,
  /**
   * Tag on the teacher's own row in the student list, so it is obvious
   * that "Open" is going to load the teacher's own study data, not a
   * separate student. Same wording in both languages — short, neutral.
   */
  selfBadge: { en: 'you', zh: '你' } satisfies Bilingual,
  never: { en: 'never', zh: '从未' } satisfies Bilingual,
  openStudent: { en: 'Open', zh: '打开' } satisfies Bilingual,

  // Heatmap
  heatmapTitle: { en: 'Class struggle map', zh: '全班薄弱点' } satisfies Bilingual,
  heatmapSubtitle: {
    en: 'Statements where students collectively have the highest wrong rate. Hover a row to see the IGCSE code; click to copy.',
    zh: '按全班错题率排序的薄弱知识点。鼠标悬停看完整 IGCSE 编号；点击复制。',
  } satisfies Bilingual,
  colStudentsTouched: { en: 'Students', zh: '涉及学生' } satisfies Bilingual,
  colTotalWrong: { en: 'Total wrong', zh: '累计错' } satisfies Bilingual,

  // Hook ratings
  hookRatingsTitle: { en: 'Hook ratings', zh: '钩子评分' } satisfies Bilingual,
  hookRatingsSubtitle: {
    en: 'Thumbs up / down on classroom hooks (once the rate-a-hook UI ships). Net = up − down.',
    zh: '课堂钩子的赞踩（评分 UI 上线后才有数据）。净值 = 赞 − 踩。',
  } satisfies Bilingual,
  hookRatingsEmpty: { en: 'No hook ratings yet.', zh: '还没有钩子评分。' } satisfies Bilingual,
  hookUp: { en: 'up', zh: '赞' } satisfies Bilingual,
  hookDown: { en: 'down', zh: '踩' } satisfies Bilingual,
  hookNet: { en: 'net', zh: '净值' } satisfies Bilingual,

  // Student detail
  studentDetailTitle: { en: 'Student detail', zh: '学生详情' } satisfies Bilingual,
  studentProfile: { en: 'Profile', zh: '账号信息' } satisfies Bilingual,
  studentWordBank: { en: 'Word bank', zh: '生词本' } satisfies Bilingual,
  studentMistakes: { en: 'Mistake log', zh: '错题本' } satisfies Bilingual,
  studentProgress: { en: 'Statement progress', zh: '学习进度' } satisfies Bilingual,
  studentHookRatings: { en: 'Hook ratings', zh: '钩子评分' } satisfies Bilingual,
  backToList: { en: '← Back to all students', zh: '← 返回学生列表' } satisfies Bilingual,
  empty: { en: 'Nothing yet.', zh: '暂无数据。' } satisfies Bilingual,
  loadError: { en: 'Could not load. Check RLS and the network tab.', zh: '加载失败，检查 RLS 和网络。' } satisfies Bilingual,
  loadFailed: { en: 'Failed to load', zh: '加载失败' } satisfies Bilingual,

  // UserMenu toggle
  teacherModeOn: { en: 'Teacher mode (on)', zh: '教师模式（已开启）' } satisfies Bilingual,
  teacherModeOff: { en: 'Teacher mode (off)', zh: '教师模式（未开启）' } satisfies Bilingual,
  teacherDashboardLink: { en: 'Open teacher dashboard', zh: '打开教师后台' } satisfies Bilingual,
} as const
