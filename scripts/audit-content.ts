/**
 * A deeper content audit than the build gate runs.
 *
 * The gate checks what would break a lesson at runtime. This checks what would quietly make
 * one wrong or misleading: a checkpoint testing something the lesson never taught, a lesson
 * labelled Core that assesses Supplement material, a glossary entry pointing at a statement
 * the lesson does not cover, an untranslated string in a course that promises a Chinese gloss.
 *
 * Run with `npm run audit`. It reports and exits non-zero on findings, but is deliberately
 * not part of the prebuild — some of what it flags is a judgement call rather than a fault.
 */

import { spawnSync } from 'node:child_process'
import { igcseBiology0610 } from '../src/content/syllabus/igcse-biology-0610.ts'
import { igcseChemistry0620 } from '../src/content/syllabus/igcse-chemistry-0620.ts'
import { igcsePhysics0625 } from '../src/content/syllabus/igcse-physics-0625.ts'
import type { Bilingual, Syllabus } from '../src/content/types.ts'
import { c, loadLessons } from './load-content.ts'

const findings: Array<{ where: string; msg: string; severity: 'error' | 'note' }> = []
const bad = (where: string, msg: string) => findings.push({ where, msg, severity: 'error' })
const note = (where: string, msg: string) => findings.push({ where, msg, severity: 'note' })

const syllabuses: Syllabus[] = [igcsePhysics0625, igcseChemistry0620, igcseBiology0610]
const tierOf = new Map<string, 'core' | 'supplement'>()
for (const s of syllabuses) {
  for (const t of s.topics) {
    for (const sub of t.subtopics) {
      for (const st of sub.statements) tierOf.set(st.id, st.tier)
    }
  }
}

const lessons = await loadLessons()

// --- per-lesson checks ------------------------------------------------------

const titles = new Map<string, string>()

for (const { lesson, slug, subject } of lessons) {
  const where = `${subject}/${slug}`
  const covers = new Set(lesson.syllabus)

  // A lesson labelled Core must not carry Supplement material, or a Core student
  // revising from it meets content that cannot appear on their paper.
  const supplement = lesson.syllabus.filter((id) => tierOf.get(id) === 'supplement')
  if (lesson.tier === 'core' && supplement.length > 0) {
    bad(where, `tier is "core" but it covers Supplement statements: ${supplement.join(', ')}`)
  }
  if (lesson.tier === 'extended' && supplement.length === 0) {
    note(where, 'tier is "extended" but every statement it covers is Core')
  }

  // A checkpoint testing something the lesson never taught is a question with no lesson
  // behind it — the student has no way to have learned the answer here.
  for (const q of lesson.checkpoints) {
    for (const id of q.syllabus) {
      if (!covers.has(id)) bad(`${where} → ${q.id}`, `tests ${id}, which this lesson does not cover`)
    }
    // A question's tier uses the paper vocabulary ('core' | 'extended'), while a statement's
    // uses the syllabus one ('core' | 'supplement'). They are not the same words for the same
    // thing and comparing them directly silently never fires — which is how this check was
    // first written, and it found nothing until the vocabularies were lined up.
    if (q.tier === 'extended' && q.syllabus.every((id) => tierOf.get(id) === 'core')) {
      note(`${where} → ${q.id}`, 'marked extended but tests only Core statements')
    }
    if (q.tier === 'core' && q.syllabus.some((id) => tierOf.get(id) === 'supplement')) {
      bad(`${where} → ${q.id}`, 'marked core but tests a Supplement statement')
    }
  }

  // Glossary entries anchor a term to a statement; one pointing outside the lesson is a
  // cross-reference the reader cannot follow.
  for (const term of lesson.glossary) {
    for (const id of term.syllabus ?? []) {
      if (!covers.has(id)) {
        bad(`${where} → glossary "${term.en}"`, `cites ${id}, which this lesson does not cover`)
      }
    }
  }

  // Duplicate narration line ids break the player's position tracking.
  const lineIds = lesson.narration.sections.flatMap((s) => s.lines.map((l) => l.id))
  const dupLines = lineIds.filter((id, i) => lineIds.indexOf(id) !== i)
  if (dupLines.length > 0) bad(where, `duplicate narration line ids: ${[...new Set(dupLines)].join(', ')}`)

  const sectionIds = lesson.narration.sections.map((s) => s.id)
  const dupSections = sectionIds.filter((id, i) => sectionIds.indexOf(id) !== i)
  if (dupSections.length > 0) bad(where, `duplicate narration section ids: ${dupSections.join(', ')}`)

  // Two presets with the same label are two buttons a student cannot tell apart.
  const presetLabels = (lesson.sim?.presets ?? []).map((p) => p.label.en)
  const dupPresets = presetLabels.filter((l, i) => presetLabels.indexOf(l) !== i)
  if (dupPresets.length > 0) bad(where, `duplicate preset labels: ${dupPresets.join(', ')}`)

  const existing = titles.get(lesson.title.en)
  if (existing) bad(where, `shares its title with ${existing}`)
  titles.set(lesson.title.en, where)

  if (lesson.objectives.length === 0) bad(where, 'has no learning objectives')
  if (lesson.checkpoints.length < 3) note(where, `has only ${lesson.checkpoints.length} checkpoints`)
  if (lesson.estimatedMinutes < 15 || lesson.estimatedMinutes > 90) {
    note(where, `estimatedMinutes is ${lesson.estimatedMinutes}`)
  }

  // --- Chinese scaffolding -------------------------------------------------
  const strings: Array<[string, Bilingual]> = [
    ['title', lesson.title],
    ['summary', lesson.summary],
    ...lesson.objectives.map((o, i) => [`objective ${i + 1}`, o] as [string, Bilingual]),
    ...lesson.glossary.map((g, i) => [`glossary ${i + 1} definition`, g.definition] as [string, Bilingual]),
    ...lesson.equations.map((e, i) => [`equation ${i + 1} meaning`, e.meaning] as [string, Bilingual]),
    ...lesson.narration.sections.flatMap((s) => [
      [`section "${s.id}" title`, s.title] as [string, Bilingual],
      ...s.lines.map((l) => [`narration line ${l.id}`, l.text] as [string, Bilingual]),
    ]),
    ...(lesson.sim?.hint ? [['sim hint', lesson.sim.hint] as [string, Bilingual]] : []),
    ...(lesson.sim?.params ?? []).map((p, i) => [`param ${i + 1} label`, p.label] as [string, Bilingual]),
    ...(lesson.sim?.readouts ?? []).map(
      (r, i) => [`readout ${i + 1} label`, r.label] as [string, Bilingual],
    ),
    ...(lesson.sim?.presets ?? []).map(
      (p, i) => [`preset ${i + 1} label`, p.label] as [string, Bilingual],
    ),
    ...lesson.checkpoints.flatMap((q) =>
      q.examinerNote ? [[`${q.id} examiner note`, q.examinerNote] as [string, Bilingual]] : [],
    ),
  ]

  const missing = strings.filter(([, v]) => !v.zh?.trim())
  if (missing.length > 0) {
    bad(where, `${missing.length} string(s) with no Chinese: ${missing.map(([k]) => k).join(', ')}`)
  }

  // Chinese that is merely the English copied across is worse than none — it looks
  // translated and is not. The test requires a run of *lower-case* letters, so prose is
  // caught while notation and acronyms are not: "PTFE" and "3 A" are correctly identical
  // in both languages, and flagging them would train the reader to ignore this check.
  const echoed = strings.filter(([, v]) => v.zh && v.zh === v.en && /[a-z]{4,}/.test(v.en))
  if (echoed.length > 0) {
    bad(where, `${echoed.length} Chinese string(s) identical to the English: ${echoed.map(([k]) => k).join(', ')}`)
  }
}

// --- assessment coverage ----------------------------------------------------

const assessed = new Set(
  lessons.flatMap(({ lesson }) => lesson.checkpoints.flatMap((q) => q.syllabus)),
)

for (const s of syllabuses) {
  for (const t of s.topics) {
    const ids = t.subtopics.flatMap((sub) => sub.statements.map((st) => st.id))
    const covered = ids.filter((id) => assessed.has(id)).length
    if (covered === 0) {
      bad(`${s.code} topic ${t.number}`, `"${t.title.en}" has no checkpoint on any statement`)
    }
  }
}

// --- the README's own figures -----------------------------------------------

// The front page of the repository claimed Biology was at 8% for weeks after it reached
// 100%, because the numbers were typed by hand. They are generated now, and stale ones are
// a finding rather than something a reader discovers.
const readmeCheck = spawnSync(
  process.execPath,
  [...process.execArgv, new URL('./update-readme.ts', import.meta.url).pathname, '--check'],
  { encoding: 'utf8' },
)
if (readmeCheck.status !== 0) {
  bad('README.md', 'coverage figures are out of date — run `npm run readme`')
}

// --- report -----------------------------------------------------------------

console.log(c.bold('\nContent audit\n'))
console.log(`  ${lessons.length} lessons across ${syllabuses.length} subjects`)
console.log(`  ${assessed.size} statements have at least one checkpoint\n`)

const errs = findings.filter((f) => f.severity === 'error')
const notes = findings.filter((f) => f.severity === 'note')

for (const n of notes) console.log(c.yellow(`  ! ${c.bold(n.where)}: ${n.msg}`))
if (notes.length > 0) console.log()

for (const e of errs) console.error(c.red(`  ✗ ${c.bold(e.where)}: ${e.msg}`))

if (errs.length > 0) {
  console.error(c.red(`\n  ${errs.length} finding(s)\n`))
  process.exit(1)
}
console.log(c.green('  ✓ No faults found\n'))
