/**
 * UI chrome strings for the vocabulary concept-card system.
 *
 * Course copy (term definitions, mechanisms) lives in the lesson files. This
 * file is for the buttons, status labels, empty-state messages, etc. — the
 * strings the renderer owns and the lesson author should not need to think
 * about.
 *
 * Same `no-Chinese-in-components` rule as `lessonExtrasStrings.ts`.
 */

import type { Bilingual } from '@/content/types'

export const VOCAB = {
  // Tab labels
  tabAll: { en: 'All terms', zh: '全部词条' } satisfies Bilingual,
  tabBank: { en: 'Word bank', zh: '生词本' } satisfies Bilingual,
  tabStudy: { en: 'Study', zh: '记忆' } satisfies Bilingual,
  tabGame: { en: 'Game', zh: '小游戏' } satisfies Bilingual,

  // Page title
  pageTitle: { en: 'Vocabulary', zh: '词汇与概念' } satisfies Bilingual,
  pageSummary: {
    en: 'Glossary terms across all lessons. Mark what you don\'t know, study what you flagged, and play a quick game with words you\'re still on.',
    zh: '所有课程的术语。标记不认识的，重点记忆，玩个小游戏巩固还在学的。',
  } satisfies Bilingual,

  // Concept card controls
  addToBank: { en: '+ Add to word bank', zh: '+ 加入生词本' } satisfies Bilingual,
  removeFromBank: { en: 'Remove', zh: '移除' } satisfies Bilingual,
  markKnown: { en: 'I know it', zh: '我认识' } satisfies Bilingual,
  markLearning: { en: 'Still learning', zh: '在学' } satisfies Bilingual,
  expand: { en: 'Show details', zh: '展开详情' } satisfies Bilingual,
  collapse: { en: 'Hide details', zh: '收起详情' } satisfies Bilingual,

  // Status
  statusNew: { en: 'New', zh: '新词' } satisfies Bilingual,
  statusLearning: { en: 'Learning', zh: '在学' } satisfies Bilingual,
  statusKnown: { en: 'Known', zh: '已掌握' } satisfies Bilingual,

  // From-lesson caption
  fromLesson: { en: 'From', zh: '来源' } satisfies Bilingual,

  // Concept card sections
  mechanismTitle: { en: 'How / Why', zh: '原理' } satisfies Bilingual,
  clinicalTitle: { en: 'Symptoms & signs', zh: '症状与表现' } satisfies Bilingual,

  // Word bank
  bankEmpty: {
    en: 'Your word bank is empty. Open any term below and click "+ Add to word bank" to start collecting words to review.',
    zh: '生词本是空的。打开下方任一词条，点"+ 加入生词本"开始收录要复习的词。',
  } satisfies Bilingual,
  bankNoneInGroup: { en: 'Nothing here yet.', zh: '这里还没有。' } satisfies Bilingual,
  reviewedPrefix: { en: 'reviewed', zh: '已复习' } satisfies Bilingual,

  // Study mode
  studyEmpty: {
    en: 'Nothing to study right now. Add some words to your bank and come back.',
    zh: '现在没东西可记。先去生词本加几个词再来。',
  } satisfies Bilingual,
  studyDone: { en: 'Session done', zh: '本轮完成' } satisfies Bilingual,
  studyAgain: { en: '↻ Study again', zh: '↻ 再来一轮' } satisfies Bilingual,
  studyRight: { en: 'right on first try', zh: '一次就过' } satisfies Bilingual,
  studyProgress: { en: 'Card', zh: '当前' } satisfies Bilingual,
  studyFlipHint: { en: 'Click to flip and see the answer', zh: '点击翻面看答案' } satisfies Bilingual,
  know: { en: 'Know it', zh: '认识' } satisfies Bilingual,
  unsure: { en: 'Unsure', zh: '模糊' } satisfies Bilingual,
  dontKnow: { en: 'Don\'t know', zh: '不认识' } satisfies Bilingual,

  // Game
  gameEmpty: {
    en: 'Add at least 2 words to your word bank to play the game.',
    zh: '至少加 2 个词到生词本才能开始游戏。',
  } satisfies Bilingual,
  gameScore: { en: 'Score', zh: '得分' } satisfies Bilingual,
  gameStreak: { en: 'Streak', zh: '连胜' } satisfies Bilingual,
  gamePrompt: { en: 'Pick the definition of', zh: '选出它的释义' } satisfies Bilingual,
  gameRight: { en: 'Right — next card', zh: '答对——下一题' } satisfies Bilingual,
  gameWrong: { en: 'Not quite — try again', zh: '不对——再来' } satisfies Bilingual,

  // Filters
  filterAll: { en: 'All subjects', zh: '全部学科' } satisfies Bilingual,
  filterLesson: { en: 'Lesson', zh: '课程' } satisfies Bilingual,
  filterAllLessons: { en: 'All lessons', zh: '全部课程' } satisfies Bilingual,

  // Mistake log tab
  tabMistakes: { en: 'Your mistakes', zh: '错题' } satisfies Bilingual,
  mistakesEmpty: {
    en: 'No wrong answers logged yet. Get a question wrong in any lesson\'s "Check yourself" section, and it will appear here for review.',
    zh: '还没有错题记录。在任意课程的"自测"中答错一题，就会出现在这里。',
  } satisfies Bilingual,
  mistakesNoneUnresolved: {
    en: 'You\'re all caught up. No unresolved mistakes right now — come back when you next miss one.',
    zh: '已清空。暂时没有未解决的错题——下次再答错时回来。',
  } satisfies Bilingual,
  mistakesLast5Days: { en: 'Last 5 days', zh: '近 5 天' } satisfies Bilingual,
  mistakesAllTime: { en: 'All time', zh: '全部' } satisfies Bilingual,
  mistakesFilterUnresolved: { en: 'Still wrong', zh: '未解决' } satisfies Bilingual,
  mistakesFilterResolved: { en: 'Resolved', zh: '已掌握' } satisfies Bilingual,
  mistakesResolve: { en: 'Mark resolved', zh: '标为掌握' } satisfies Bilingual,
  mistakesRemove: { en: 'Remove', zh: '删除' } satisfies Bilingual,
  mistakesClearAll: { en: 'Clear all', zh: '清空全部' } satisfies Bilingual,
  mistakesAttemptCount: { en: 'attempts', zh: '次' } satisfies Bilingual,
  mistakesYouPicked: { en: 'You picked', zh: '你选了' } satisfies Bilingual,
  mistakesCorrect: { en: 'Correct', zh: '正确答案' } satisfies Bilingual,
  mistakesGoToLesson: { en: 'Open lesson', zh: '打开这节课' } satisfies Bilingual,
  mistakesSummary: {
    en: '{total} logged · {unresolved} still wrong · {resolved} resolved',
    zh: '共 {total} 条 · 未解决 {unresolved} · 已掌握 {resolved}',
  } satisfies Bilingual,

  // ---- 2026-08-21 Vocabulary v2: SRS, streak, TTS, related-terms ----
  statDueToday: { en: 'Due today', zh: '今日待复习' } satisfies Bilingual,
  statStartReview: { en: 'Start review', zh: '开始复习' } satisfies Bilingual,
  statKnown: { en: 'Known', zh: '已掌握' } satisfies Bilingual,
  statLapsed: { en: 'Lapsed', zh: '薄弱' } satisfies Bilingual,
  lapseBadge: { en: 'Lapsed {count}×', zh: '错 {count} 次' } satisfies Bilingual,
  relatedLabel: { en: 'Related', zh: '相关' } satisfies Bilingual,
  speakLabel: { en: 'Hear pronunciation', zh: '听发音' } satisfies Bilingual,
  // SRS schedule labels (for the concept card)
  srsNextReview: { en: 'Next review', zh: '下次复习' } satisfies Bilingual,
  srsInDays: { en: 'in {n} days', zh: '{n} 天后' } satisfies Bilingual,
  srsDueNow: { en: 'due now', zh: '现在可复习' } satisfies Bilingual,
  srsNew: { en: 'new', zh: '新词' } satisfies Bilingual,
  // Game picker
  gamePickerTitle: { en: 'Pick a game', zh: '选择游戏' } satisfies Bilingual,
  gameMultiChoice: { en: 'Multiple choice', zh: '四选一' } satisfies Bilingual,
  gameMultiChoiceDesc: {
    en: '4-option quiz. Quick to play, easy to do in a few minutes.',
    zh: '四选一测验。上手快，几分钟就能玩一轮。',
  } satisfies Bilingual,
  gameTypeTerm: { en: 'Type the term', zh: '拼写挑战' } satisfies Bilingual,
  gameTypeTermDesc: {
    en: 'See the definition in English, type the term. Hard, but it locks the word in.',
    zh: '看英文释义，拼出单词。难，但记得牢。',
  } satisfies Bilingual,
  gameMatchPairs: { en: 'Match pairs', zh: '连连看' } satisfies Bilingual,
  gameMatchPairsDesc: {
    en: 'Pair each term with its definition by clicking pairs. Spatial memory.',
    zh: '点击配对每个词和它的释义。靠空间记忆。',
  } satisfies Bilingual,
  // Game shared
  gameRoundOver: { en: 'Round done', zh: '本轮结束' } satisfies Bilingual,
  gameCheck: { en: 'Check', zh: '检查' } satisfies Bilingual,
  gameNext: { en: 'Next', zh: '下一题' } satisfies Bilingual,
  gamePrev: { en: 'Previous', zh: '上一题' } satisfies Bilingual,
  gamePlayAgain: { en: '↻ Play again', zh: '↻ 再来一轮' } satisfies Bilingual,
  gameTypePrompt: { en: 'Type the term for:', zh: '拼出这个词:' } satisfies Bilingual,
  gameTypePlaceholder: { en: 'type here…', zh: '在这里打字…' } satisfies Bilingual,
  gameMatchInstructions: {
    en: 'Click a term, then click its definition. Keep going until all pairs are matched.',
    zh: '点一个词，再点它的释义。配对完所有对子即可通关。',
  } satisfies Bilingual,
  gameMatchCleared: { en: 'All matched!', zh: '全部配对完成！' } satisfies Bilingual,
  // ErrorBoundary recovery
  errorTitle: { en: 'Something went wrong rendering this page', zh: '页面渲染出错' } satisfies Bilingual,
  errorBody: {
    en: 'Your saved data is safe. You can try a hard refresh first; if that does not help, reset vocab data to start clean.',
    zh: '你的学习数据都在。可以先试「硬刷新」；如果还不行，「重置生词数据」可以从头开始。',
  } satisfies Bilingual,
  errorHardRefresh: { en: 'Hard refresh', zh: '硬刷新' } satisfies Bilingual,
  errorReset: { en: 'Reset vocab data', zh: '重置生词数据' } satisfies Bilingual,

  // Personal progress card on HomePage
  progressTitle: { en: 'Your study so far', zh: '你的学习进度' } satisfies Bilingual,
  progressSignedOutBody: {
    en: 'Sign in to keep your word bank, mistake log, and study map in sync across devices.',
    zh: '登录后，你的生词本、错题本和学习地图就会在多个设备间同步。',
  } satisfies Bilingual,
  progressLastSeen: { en: 'last seen {time}', zh: '最近活动 {time}' } satisfies Bilingual,
  progressWords: { en: 'Words in bank', zh: '生词本' } satisfies Bilingual,
  progressMistakes: { en: 'Mistakes logged', zh: '错题数' } satisfies Bilingual,
  progressStatements: { en: 'Statements touched', zh: '已涉及知识点' } satisfies Bilingual,
  progressOpenBank: { en: 'Open word bank', zh: '打开生词本' } satisfies Bilingual,
  progressOpenMistakes: { en: 'Open mistakes', zh: '打开错题' } satisfies Bilingual,
  progressAllResolved: { en: 'all resolved', zh: '全部掌握' } satisfies Bilingual,
  progressMastered: { en: 'mastered', zh: '已掌握' } satisfies Bilingual,
  progressStruggling: { en: 'struggling', zh: '薄弱点' } satisfies Bilingual,
  progressStillWrong: { en: 'still wrong', zh: '未掌握' } satisfies Bilingual,
  progressMapLegend: {
    en: 'Syllabus map:',
    zh: '课程地图色块:',
  } satisfies Bilingual,
  progressHudHint: {
    en: '{mastered} mastered · {struggling} struggling',
    zh: '已掌握 {mastered} · 薄弱 {struggling}',
  } satisfies Bilingual,
  progressUntouchedHint: {
    en: 'Open any lesson to start tracking your progress.',
    zh: '打开任意一节课开始记录进度。',
  } satisfies Bilingual,
} as const
