/**
 * Content registry.
 *
 * Lessons, kernels and question banks are discovered from the filesystem at build
 * time via `import.meta.glob`. Adding a lesson means adding a directory — there is
 * no central list to edit and no chance of the list drifting from reality.
 *
 * This replaces the pattern used by the reference projects, where a single
 * `catalog.ts` grew to ~100 KB and every new experiment had to be registered in
 * several places at once.
 */

import type { Lesson, SimKernel, Question } from '@/content/types'

type Module<T> = { default: T }

// Two levels: content/lessons/<subject>/<slug>/. Subject-scoped directories keep slugs
// from colliding across subjects — physics and chemistry both have a topic 1.
const lessonModules = import.meta.glob<Module<Lesson>>('../content/lessons/*/*/lesson.ts', {
  eager: true,
})

const kernelModules = import.meta.glob<Module<SimKernel>>('../content/lessons/*/*/kernel.ts', {
  eager: true,
})

const questionModules = import.meta.glob<Module<Question[]>>('../content/questions/*.ts', {
  eager: true,
})

/** Pulls the slug out of `../content/lessons/<subject>/<slug>/lesson.ts`. */
function slugFromPath(path: string): string {
  const parts = path.split('/')
  return parts[parts.length - 2] ?? ''
}

/** Pulls the subject code out of the same path. */
function subjectFromPath(path: string): string {
  const parts = path.split('/')
  return parts[parts.length - 3] ?? ''
}

/** Pulls the file name out of `../content/questions/<name>.ts`. */
function nameFromPath(path: string): string {
  const file = path.split('/').pop() ?? ''
  return file.replace(/\.ts$/, '')
}

export const lessons: Lesson[] = Object.entries(lessonModules)
  .map(([path, mod]) => {
    const lesson = mod.default
    const dirSlug = slugFromPath(path)
    const dirSubject = subjectFromPath(path)
    // Caught here rather than silently routing to a 404 later.
    if (lesson.slug !== dirSlug) {
      throw new Error(
        `Lesson slug mismatch: directory "${dirSlug}" declares slug "${lesson.slug}". They must match.`
      )
    }
    if (lesson.subject !== dirSubject) {
      throw new Error(
        `Lesson subject mismatch: "${dirSlug}" sits under "${dirSubject}" but declares subject "${lesson.subject}".`
      )
    }
    return lesson
  })
  .sort(
    (a, b) =>
      a.subject.localeCompare(b.subject) ||
      a.slug.localeCompare(b.slug, 'en', { numeric: true })
  )

/** Slugs are unique within a subject, so lessons are keyed by both. */
function key(subject: string, slug: string): string {
  return `${subject}/${slug}`
}

export const lessonBySlug: ReadonlyMap<string, Lesson> = new Map(
  lessons.map((l) => [key(l.subject, l.slug), l])
)

/** Look up a lesson by its subject code and slug. */
export function findLesson(subject: string, slug: string): Lesson | undefined {
  return lessonBySlug.get(key(subject, slug))
}

/** Lessons belonging to one subject, in order. */
export function lessonsForSubject(subject: string): Lesson[] {
  return lessons.filter((l) => l.subject === subject)
}

/** Kernels keyed by subject and slug. A lesson without a simulation has no kernel. */
export const kernels: ReadonlyMap<string, SimKernel> = new Map(
  Object.entries(kernelModules).map(([path, mod]) => [
    key(subjectFromPath(path), slugFromPath(path)),
    mod.default,
  ])
)

/** The kernel for a lesson, if it has one. */
export function findKernel(subject: string, slug: string): SimKernel | undefined {
  return kernels.get(key(subject, slug))
}

export const questionBanks: ReadonlyMap<string, Question[]> = new Map(
  Object.entries(questionModules).map(([path, mod]) => [nameFromPath(path), mod.default])
)

/** Every question across every bank, plus the inline checkpoints in lessons. */
export const allQuestions: Question[] = [
  ...Array.from(questionBanks.values()).flat(),
  ...lessons.flatMap((l) => l.checkpoints),
]

/** Lessons that teach a given syllabus statement id. */
export function lessonsForStatement(statementId: string): Lesson[] {
  return lessons.filter((l) => l.syllabus.includes(statementId))
}

/** Questions that assess a given syllabus statement id. */
export function questionsForStatement(statementId: string): Question[] {
  return allQuestions.filter((q) => q.syllabus.includes(statementId))
}

/** The set of statement ids covered by at least one lesson. */
export function coveredStatementIds(): Set<string> {
  return new Set(lessons.flatMap((l) => l.syllabus))
}
