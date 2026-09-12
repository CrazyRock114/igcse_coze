/**
 * Regenerates the factual blocks of the README from the content itself.
 *
 * The README carried hand-typed coverage figures for months and they were wrong within a
 * day of being written — the front page of the repository said Biology was at 8% while the
 * site served 100%. Numbers that have to be remembered are numbers that go stale, so these
 * ones are now derived.
 *
 * `npm run readme` rewrites the blocks. `npm run readme -- --check` rewrites nothing and
 * exits non-zero if they are out of date, which is what the audit calls so that drift is
 * reported rather than discovered by a reader.
 */

import { readFileSync, writeFileSync } from 'node:fs'
import { igcseBiology0610 } from '../src/content/syllabus/igcse-biology-0610.ts'
import { igcseChemistry0620 } from '../src/content/syllabus/igcse-chemistry-0620.ts'
import { igcsePhysics0625 } from '../src/content/syllabus/igcse-physics-0625.ts'
import type { Syllabus } from '../src/content/types.ts'
import { c, loadLessons } from './load-content.ts'

const README = new URL('../README.md', import.meta.url)
const check = process.argv.includes('--check')

const syllabuses: Syllabus[] = [igcsePhysics0625, igcseChemistry0620, igcseBiology0610]
const lessons = await loadLessons()

interface Figures {
  code: string
  name: string
  statements: number
  taught: number
  assessed: number
  lessons: number
  topics: Array<{ number: number; title: string; taught: number; total: number }>
}

function figuresFor(s: Syllabus): Figures {
  const mine = lessons.filter((l) => l.subject === s.code)
  const taught = new Set(mine.flatMap((l) => l.lesson.syllabus))
  const assessed = new Set(
    mine.flatMap((l) => l.lesson.checkpoints.flatMap((q) => q.syllabus)),
  )
  const all = s.topics.flatMap((t) => t.subtopics.flatMap((sub) => sub.statements))

  return {
    code: s.code,
    name: s.title.en.replace('Cambridge IGCSE ', ''),
    statements: all.length,
    taught: all.filter((st) => taught.has(st.id)).length,
    assessed: all.filter((st) => assessed.has(st.id)).length,
    lessons: mine.length,
    topics: s.topics.map((t) => {
      const ids = t.subtopics.flatMap((sub) => sub.statements.map((st) => st.id))
      return {
        number: t.number,
        title: t.title.en,
        taught: ids.filter((id) => taught.has(id)).length,
        total: ids.length,
      }
    }),
  }
}

const figures = syllabuses.map(figuresFor)
const pct = (a: number, b: number) => (b === 0 ? 0 : Math.round((a / b) * 100))

// --- the summary table at the top ------------------------------------------

const summary = [
  '| Subject | Statements | Taught | Lessons |',
  '| --- | --- | --- | --- |',
  ...figures.map(
    (f) =>
      `| ${f.name} ${f.code} | ${f.statements} | **${f.taught} / ${f.statements} — ${pct(f.taught, f.statements)}%** | ${f.lessons} |`,
  ),
].join('\n')

// --- the per-topic status block --------------------------------------------

const totalStatements = figures.reduce((n, f) => n + f.statements, 0)
const totalTaught = figures.reduce((n, f) => n + f.taught, 0)
const totalAssessed = figures.reduce((n, f) => n + f.assessed, 0)
const totalLessons = figures.reduce((n, f) => n + f.lessons, 0)

const status = [
  `**${totalTaught} of ${totalStatements} statements taught (${pct(totalTaught, totalStatements)}%)** across ${totalLessons} lessons.`,
  '',
  `${totalAssessed} statements carry at least one checkpoint question with a mark scheme.`,
  '',
  ...figures.flatMap((f) => [
    `### ${f.name} ${f.code} — ${pct(f.taught, f.statements)}%`,
    '',
    '| Topic | Taught |',
    '| --- | --- |',
    ...f.topics.map(
      (t) =>
        `| ${t.number} ${t.title} | ${t.taught === t.total ? `**${t.taught} / ${t.total}**` : `${t.taught} / ${t.total}`} |`,
    ),
    '',
  ]),
].join('\n')

// --- the primitives list ----------------------------------------------------

const usage = new Map<string, string[]>()
for (const { lesson, slug, subject } of lessons) {
  if (!lesson.sim) continue
  const key = lesson.sim.primitive
  const list = usage.get(key) ?? []
  list.push(`${subject}/${slug}`)
  usage.set(key, list)
}

const primitives = [
  '| Primitive | Lessons using it |',
  '| --- | --- |',
  ...[...usage.entries()]
    .sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0]))
    .map(([name, used]) => `| \`${name}\` | ${used.length} |`),
].join('\n')

// --- splice ------------------------------------------------------------------

function splice(text: string, marker: string, body: string): string {
  const start = `<!-- ${marker}:start -->`
  const end = `<!-- ${marker}:end -->`
  const i = text.indexOf(start)
  const j = text.indexOf(end)
  if (i === -1 || j === -1) {
    console.error(c.red(`  ✗ README is missing the ${start} … ${end} markers`))
    process.exit(1)
  }
  return `${text.slice(0, i + start.length)}\n\n${body}\n\n${text.slice(j)}`
}

const before = readFileSync(README, 'utf8')
let after = splice(before, 'coverage', summary)
after = splice(after, 'status', status)
after = splice(after, 'primitives', primitives)

if (after === before) {
  console.log(c.green('\n  ✓ README figures are up to date\n'))
  process.exit(0)
}

if (check) {
  console.error(
    c.red('\n  ✗ README figures are out of date. Run `npm run readme` to regenerate.\n'),
  )
  process.exit(1)
}

writeFileSync(README, after)
console.log(
  c.green(
    `\n  ✓ README updated — ${totalTaught}/${totalStatements} statements across ${totalLessons} lessons\n`,
  ),
)
