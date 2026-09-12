/**
 * Syllabus coverage report, across every subject.
 *
 * Answers the question the reference projects could not: *which parts of the exam does
 * this course actually teach?* Runs in the prebuild, so a lesson can never reference a
 * statement that does not exist.
 *
 *   npm run check:syllabus
 *   npm run check:syllabus -- --min 80    # also fail below 80% overall coverage
 */

import { SYLLABUSES, statementById } from '../src/content/syllabus/index.ts'
import { c, loadLessons, loadQuestionBanks } from './load-content.ts'

const minArgIndex = process.argv.indexOf('--min')
const minCoverage = minArgIndex >= 0 ? Number(process.argv[minArgIndex + 1]) : null

const lessons = await loadLessons()
const banks = await loadQuestionBanks()

const questions = [
  ...Array.from(banks.values()).flat(),
  ...lessons.flatMap((l) => l.lesson.checkpoints),
]

// --- dangling references (hard failure) -------------------------------------

const dangling: string[] = []

for (const { lesson, slug } of lessons) {
  for (const id of lesson.syllabus) {
    if (!statementById.has(id)) dangling.push(`lesson ${slug} → ${id}`)
  }
}
for (const q of questions) {
  for (const id of q.syllabus) {
    if (!statementById.has(id)) dangling.push(`question ${q.id} → ${id}`)
  }
}

// --- coverage, per subject --------------------------------------------------

const taught = new Set(lessons.flatMap((l) => l.lesson.syllabus))
const assessed = new Set(questions.flatMap((q) => q.syllabus))

let grandTotal = 0
let grandTaught = 0

for (const syllabus of SYLLABUSES) {
  const statements = syllabus.topics.flatMap((t) => t.subtopics.flatMap((s) => s.statements))
  const total = statements.length
  const taughtCount = statements.filter((s) => taught.has(s.id)).length
  const assessedCount = statements.filter((s) => assessed.has(s.id)).length
  const subjectLessons = lessons.filter((l) => l.lesson.subject === syllabus.code).length

  grandTotal += total
  grandTaught += taughtCount

  const pct = total ? Math.round((taughtCount / total) * 100) : 0

  console.log(
    c.bold(
      `\n${syllabus.title.en} ${syllabus.code} — ${syllabus.cycle[0]}–${syllabus.cycle[1]}\n`
    )
  )

  for (const topic of syllabus.topics) {
    const ids = topic.subtopics.flatMap((s) => s.statements)
    const done = ids.filter((s) => taught.has(s.id)).length
    const bar = '█'.repeat(Math.round((done / ids.length) * 20)).padEnd(20, '·')
    const line = `  ${String(topic.number).padStart(2)}  ${topic.title.en.padEnd(42)} ${bar} ${String(done).padStart(3)}/${ids.length}`
    console.log(done === ids.length ? c.green(line) : done > 0 ? line : c.dim(line))
  }

  console.log(
    `\n  ${c.bold('Taught')}    ${taughtCount}/${total} (${pct}%)` +
      `   ${c.bold('Assessed')}  ${assessedCount}/${total}` +
      `   ${c.dim(`${subjectLessons} lessons`)}`
  )
}

// --- verdict ----------------------------------------------------------------

const overallPct = grandTotal ? Math.round((grandTaught / grandTotal) * 100) : 0
console.log(
  c.bold(`\nAll subjects: ${grandTaught}/${grandTotal} statements (${overallPct}%)\n`)
)

if (dangling.length > 0) {
  console.error(c.red(`  ✗ ${dangling.length} reference(s) to statements that do not exist:`))
  for (const d of dangling) console.error(c.red(`    ${d}`))
  console.error()
  process.exit(1)
}

if (minCoverage !== null && overallPct < minCoverage) {
  console.error(c.red(`  ✗ Coverage ${overallPct}% is below the required ${minCoverage}%\n`))
  process.exit(1)
}

console.log(c.green('  ✓ All syllabus references resolve\n'))
