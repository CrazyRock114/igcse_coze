/**
 * GENERATED FILE — do not edit by hand.
 * Source: scripts/gen-lesson-index.ts (runs on predev and build).
 */
export interface SyllabusMeta {
  code: string
  title: { en: string; zh: string }
  shortName?: { en: string; zh: string }
  board: string
  cycle: [number, number]
  guidedLearningHours: number
  topicCount: number
  statementCount: number
}

export const SYLLABUS_META: SyllabusMeta[] = [
  {
    "code": "0610",
    "title": {
      "en": "Cambridge IGCSE Biology",
      "zh": "剑桥 IGCSE 生物"
    },
    "shortName": {
      "en": "Biology",
      "zh": "生物"
    },
    "board": "Cambridge International",
    "cycle": [
      2026,
      2028
    ],
    "guidedLearningHours": 130,
    "topicCount": 21,
    "statementCount": 389
  },
  {
    "code": "0620",
    "title": {
      "en": "Cambridge IGCSE Chemistry",
      "zh": "剑桥 IGCSE 化学"
    },
    "shortName": {
      "en": "Chemistry",
      "zh": "化学"
    },
    "board": "Cambridge International",
    "cycle": [
      2026,
      2028
    ],
    "guidedLearningHours": 130,
    "topicCount": 12,
    "statementCount": 231
  },
  {
    "code": "0625",
    "title": {
      "en": "Cambridge IGCSE Physics",
      "zh": "剑桥 IGCSE 物理"
    },
    "shortName": {
      "en": "Physics",
      "zh": "物理"
    },
    "board": "Cambridge International",
    "cycle": [
      2026,
      2028
    ],
    "guidedLearningHours": 130,
    "topicCount": 6,
    "statementCount": 324
  }
]
