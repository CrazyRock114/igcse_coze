/**
 * Filesystem loader for the build scripts.
 *
 * The app discovers content with `import.meta.glob`, which only exists inside Vite.
 * The check scripts run under plain Node, so they walk the directory themselves.
 * Both paths must agree on the layout — that agreement is asserted below.
 */

import { readdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import type { Lesson, Question } from '../src/content/types.ts'

const ROOT = resolve(import.meta.dirname, '..')
export const LESSONS_DIR = join(ROOT, 'src/content/lessons')
export const QUESTIONS_DIR = join(ROOT, 'src/content/questions')

async function importDefault<T>(path: string): Promise<T> {
  const mod = (await import(pathToFileURL(path).href)) as { default: T }
  return mod.default
}

export interface LoadedLesson {
  lesson: Lesson
  dir: string
  slug: string
  subject: string
  hasKernel: boolean
}

/**
 * Walks `content/lessons/<subject>/<slug>/`.
 *
 * Two levels, matching the `import.meta.glob` the app uses. The two must stay in step;
 * the integrity check asserts each lesson's declared subject matches its directory.
 */
export async function loadLessons(): Promise<LoadedLesson[]> {
  if (!existsSync(LESSONS_DIR)) return []

  const loaded: LoadedLesson[] = []
  const subjects = await readdir(LESSONS_DIR, { withFileTypes: true })

  for (const s of subjects) {
    if (!s.isDirectory()) continue
    const subjectDir = join(LESSONS_DIR, s.name)

    for (const e of await readdir(subjectDir, { withFileTypes: true })) {
      if (!e.isDirectory()) continue
      const dir = join(subjectDir, e.name)
      const manifest = join(dir, 'lesson.ts')
      if (!existsSync(manifest)) continue

      loaded.push({
        lesson: await importDefault<Lesson>(manifest),
        dir,
        slug: e.name,
        subject: s.name,
        hasKernel: existsSync(join(dir, 'kernel.ts')),
      })
    }
  }

  return loaded.sort(
    (a, b) =>
      a.subject.localeCompare(b.subject) || a.slug.localeCompare(b.slug, 'en', { numeric: true })
  )
}

export async function loadQuestionBanks(): Promise<Map<string, Question[]>> {
  if (!existsSync(QUESTIONS_DIR)) return new Map()

  const files = (await readdir(QUESTIONS_DIR)).filter((f) => f.endsWith('.ts'))
  const banks = new Map<string, Question[]>()

  for (const f of files) {
    banks.set(f.replace(/\.ts$/, ''), await importDefault<Question[]>(join(QUESTIONS_DIR, f)))
  }

  return banks
}

// --- terminal helpers -------------------------------------------------------

const supportsColour = process.stdout.isTTY && process.env['NO_COLOR'] === undefined

export const c = {
  red: (s: string) => (supportsColour ? `\x1b[31m${s}\x1b[0m` : s),
  green: (s: string) => (supportsColour ? `\x1b[32m${s}\x1b[0m` : s),
  yellow: (s: string) => (supportsColour ? `\x1b[33m${s}\x1b[0m` : s),
  dim: (s: string) => (supportsColour ? `\x1b[2m${s}\x1b[0m` : s),
  bold: (s: string) => (supportsColour ? `\x1b[1m${s}\x1b[0m` : s),
}
