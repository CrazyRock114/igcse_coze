import type { Bilingual } from '@/content/types'

/**
 * Lightweight, build-time derived lesson metadata.
 *
 * `scripts/gen-lesson-index.ts` projects the full lesson modules (which embed
 * narration, checkpoints and sim configs — several hundred KB per subject)
 * into `src/content/lesson-index.generated.ts`. Pages that only need to list
 * or link lessons (home coverage map, vocab, hooks, mistake list) read this
 * index synchronously; the full lesson bodies load on demand through
 * `src/lib/registry.ts`.
 */
export interface LessonMeta {
  subject: string
  slug: string
  title: Bilingual
  summary: Bilingual
  /** Syllabus statement ids this lesson maps to. */
  syllabus: string[]
  estimatedMinutes: number
  checkpointCount: number
}
