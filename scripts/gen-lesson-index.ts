/**
 * Generates two derived, lightweight data modules from the full lesson /
 * syllabus sources so that bundle-critical pages never need to import the
 * heavy lesson bodies:
 *
 *   src/content/lesson-index.generated.ts   -> LessonMeta[] (per lesson)
 *   src/content/syllabus/meta.generated.ts  -> SyllabusMeta[] (per subject)
 *
 * The app reads these synchronously; full lesson bodies and syllabus trees
 * are loaded lazily via `src/lib/registry.ts` / `loadSyllabus`. This script
 * runs before dev/build (`predev`, part of `build`) and the generated files
 * are committed so typecheck works from a fresh clone. Re-runs are idempotent
 * — every build regenerates from source, so the index can never drift.
 *
 * Run directly: pnpm tsx scripts/gen-lesson-index.ts
 */

import { writeFile } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import { loadLessons, c } from './load-content.ts'

const ROOT = resolve(import.meta.dirname, '..')
const SYLLABUS_DIR = join(ROOT, 'src/content/syllabus')

// The three syllabus modules are named by subject; keep in step with
// `src/content/syllabus/igcse-*.ts`.
const SYLLABUS_FILES = [
  'igcse-physics-0625.ts',
  'igcse-chemistry-0620.ts',
  'igcse-biology-0610.ts',
] as const

interface SyllabusLike {
  code: string
  title: { en: string; zh: string }
  shortName?: { en: string; zh: string }
  board: string
  cycle: [number, number]
  guidedLearningHours: number
  topics: unknown[]
}

interface SyllabusMeta {
  code: string
  title: { en: string; zh: string }
  shortName?: { en: string; zh: string }
  board: string
  cycle: [number, number]
  guidedLearningHours: number
  topicCount: number
  statementCount: number
}

function countStatements(syl: SyllabusLike): number {
  let n = 0
  for (const topic of syl.topics) {
    for (const sub of (topic as { subtopics: { statements: unknown[] }[] }).subtopics) {
      n += sub.statements.length
    }
  }
  return n
}

async function main(): Promise<void> {
  const loaded = await loadLessons()

  // ---- lesson index --------------------------------------------------------
  const meta = loaded.map(({ lesson, subject, slug }) => ({
    subject,
    slug,
    title: lesson.title,
    summary: lesson.summary,
    syllabus: lesson.syllabus,
    estimatedMinutes: lesson.estimatedMinutes,
    checkpointCount: lesson.checkpoints.length,
  }))

  const lessonTs = `/**
 * GENERATED FILE — do not edit by hand.
 * Source: scripts/gen-lesson-index.ts (runs on predev and build).
 * Regenerates from src/content/lessons/* on every build, so it cannot drift.
 */
import type { LessonMeta } from '@/lib/lessonMeta'

export const LESSON_INDEX: LessonMeta[] = ${JSON.stringify(meta, null, 2)}

export const LESSON_COUNT = ${meta.length}
`
  await writeFile(join(ROOT, 'src/content/lesson-index.generated.ts'), lessonTs, 'utf8')

  // ---- syllabus meta -------------------------------------------------------
  const sylMeta: SyllabusMeta[] = []
  for (const file of SYLLABUS_FILES) {
    const mod = (await import(join(SYLLABUS_DIR, file))) as { default: SyllabusLike }
    if (!mod.default) throw new Error(`syllabus module ${file} has no default export (keys: ${Object.keys(mod).join(',') || 'none'})`)
    const s = mod.default
    sylMeta.push({
      code: s.code,
      title: s.title,
      ...(s.shortName ? { shortName: s.shortName } : {}),
      board: s.board,
      cycle: s.cycle,
      guidedLearningHours: s.guidedLearningHours,
      topicCount: s.topics.length,
      statementCount: countStatements(s),
    })
  }
  sylMeta.sort((a, b) => a.code.localeCompare(b.code))

  const metaTs = `/**
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

export const SYLLABUS_META: SyllabusMeta[] = ${JSON.stringify(sylMeta, null, 2)}
`
  await writeFile(join(ROOT, 'src/content/syllabus/meta.generated.ts'), metaTs, 'utf8')

  const totalStatements = meta.reduce((n, l) => n + l.syllabus.length, 0)
  console.log(
    `${c.green('✓')} lesson index: ${c.bold(String(meta.length))} lessons, ` +
      `${c.bold(String(totalStatements))} lesson→statement links; ` +
      `syllabus meta: ${sylMeta.map((s) => `${s.code}(${s.statementCount})`).join(', ')}`
  )
}

main().catch((err) => {
  console.error(c.red('gen-lesson-index failed:'), err)
  process.exit(1)
})
