/** Bilingual copy for the AI tutor panel (component files must not hold CJK). */
import type { Bilingual } from '@/content/types'

export const TUTOR = {
  askExplain: { en: 'Ask the AI tutor', zh: '问 AI 导师' } as Bilingual,
  askMark: { en: 'Mark my answer', zh: '批改我的答案' } as Bilingual,
  close: { en: 'Close', zh: '收起' } as Bilingual,
  langToggle: { en: '中文讲解', zh: 'Explain in English' } as Bilingual,
  thinking: { en: 'Tutor is thinking…', zh: '导师思考中…' } as Bilingual,
  retry: { en: 'Retry', zh: '重试' } as Bilingual,
  failed: { en: 'The tutor could not answer just now.', zh: '导师暂时无法回答。' } as Bilingual,
  yourAnswerLabel: { en: 'Write your answer first', zh: '先写下你的答案' } as Bilingual,
  yourAnswerPlaceholder: {
    en: 'Type your full written answer, then ask the examiner to mark it…',
    zh: '写下完整的书面答案，再让考官批改…',
  } as Bilingual,
  disclaimer: {
    en: 'AI explanations can be wrong — always check against the mark scheme above.',
    zh: 'AI 讲解可能有误——请以上方评分标准为准。',
  } as Bilingual,
} as const
