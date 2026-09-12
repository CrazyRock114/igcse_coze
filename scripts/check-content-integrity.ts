/**
 * Content integrity checks.
 *
 * Catches the class of mistake that is invisible in review but breaks a lesson at
 * runtime: a readout the kernel never produces, a narration line that sets a
 * parameter that does not exist, a mark scheme whose marks do not add up.
 *
 * Runs in the prebuild. Errors fail the build; warnings (such as missing Chinese)
 * are reported but do not block.
 */

import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import type { Bilingual, SimKernel, SimResult } from '../src/content/types.ts'
import { commandWordByName } from '../src/content/syllabus/command-words.ts'
import { c, loadLessons, loadQuestionBanks } from './load-content.ts'

const errors: string[] = []
const warnings: string[] = []

const err = (where: string, msg: string) => errors.push(`${c.bold(where)}: ${msg}`)
const warn = (where: string, msg: string) => warnings.push(`${c.bold(where)}: ${msg}`)

/**
 * Multi-letter words in a LaTeX string that are not commands and not inside a text-mode
 * group — that is, prose that will render as a row of italic variables.
 *
 * Deliberately lenient: `\text{…}`, `\mathrm{…}` and the like are stripped first, along
 * with every command name, so only genuinely bare words are left. Two-letter runs are
 * allowed because subscripted symbols such as `M_r` and `A_r` are legitimately written
 * that way.
 */
function bareWordsIn(latex: string): string[] {
  const stripped = latex
    // Text-mode groups, including one level of nesting.
    .replace(/\\(?:text|textrm|mathrm|mathbf|operatorname)\s*\{(?:[^{}]|\{[^{}]*\})*\}/g, ' ')
    // Command names, which are words but not variables.
    .replace(/\\[a-zA-Z]+/g, ' ')
  return stripped.match(/[a-zA-Z]{3,}/g) ?? []
}

const lessons = await loadLessons()
const banks = await loadQuestionBanks()

if (lessons.length === 0) warn('content', 'no lessons found')

// --- lessons ----------------------------------------------------------------

const translatable: Bilingual[] = []

const seenLessonKeys = new Set<string>()

for (const { lesson, dir, slug, subject, hasKernel } of lessons) {
  const where = `lesson ${subject}/${slug}`

  if (lesson.slug !== slug) {
    err(where, `slug "${lesson.slug}" does not match its directory name "${slug}"`)
  }

  if (lesson.subject !== subject) {
    err(where, `declares subject "${lesson.subject}" but sits under "${subject}"`)
  }

  const lessonKey = `${subject}/${slug}`
  if (seenLessonKeys.has(lessonKey)) err(where, 'duplicate lesson')
  seenLessonKeys.add(lessonKey)

  // Statement ids carry their subject code, so a lesson must not cite another subject's.
  for (const id of lesson.syllabus) {
    const owner = id.split('.')[0]
    if (owner !== lesson.subject) {
      err(where, `cites statement "${id}" from subject ${owner}, but belongs to ${lesson.subject}`)
    }
  }

  if (lesson.syllabus.length === 0) {
    err(where, 'has no syllabus references — every lesson must be anchored to the syllabus')
  }

  if (lesson.narration.id !== lesson.slug) {
    err(where, `narration id "${lesson.narration.id}" does not match the lesson slug`)
  }

  translatable.push(
    lesson.title,
    lesson.summary,
    ...lesson.objectives,
    ...lesson.equations.map((e) => e.meaning),
    ...lesson.narration.sections.flatMap((s) => [s.title, ...s.lines.map((l) => l.text)])
  )

  // --- simulation wiring ---
  if (lesson.sim) {
    if (!hasKernel) {
      err(where, `declares a simulation but ${join(dir, 'kernel.ts')} does not exist`)
      continue
    }
    if (lesson.sim.kernel !== slug) {
      err(where, `sim.kernel is "${lesson.sim.kernel}" but the kernel lives under "${slug}"`)
    }

    const mod = (await import(pathToFileURL(join(dir, 'kernel.ts')).href)) as {
      default: SimKernel
    }
    const kernel = mod.default

    const defaults = Object.fromEntries(lesson.sim.params.map((p) => [p.key, p.default]))
    let result: SimResult
    try {
      result = kernel(defaults)
    } catch (e) {
      err(where, `kernel threw on its default parameters: ${(e as Error).message}`)
      continue
    }

    // Every declared readout must actually come out of the kernel, at every corner
    // of the parameter space — not just at the defaults.
    const corners = [
      defaults,
      Object.fromEntries(lesson.sim.params.map((p) => [p.key, p.min])),
      Object.fromEntries(lesson.sim.params.map((p) => [p.key, p.max])),
    ]

    for (const r of lesson.sim.readouts) {
      for (const corner of corners) {
        const v = kernel(corner).readouts[r.key]
        if (v === undefined) {
          err(where, `readout "${r.key}" is declared but the kernel does not return it`)
          break
        }
        if (!Number.isFinite(v)) {
          err(where, `readout "${r.key}" is ${v} at ${JSON.stringify(corner)}`)
          break
        }
      }
    }

    const paramSpecs = new Map(lesson.sim.params.map((p) => [p.key, p]))

    for (const p of lesson.sim.params) {
      if (p.min >= p.max) err(where, `param "${p.key}" has min ${p.min} ≥ max ${p.max}`)
      if (p.default < p.min || p.default > p.max) {
        err(where, `param "${p.key}" default ${p.default} is outside [${p.min}, ${p.max}]`)
      }
      for (const o of p.options ?? []) {
        if (o.value < p.min || o.value > p.max) {
          err(where, `param "${p.key}" option ${o.value} is outside [${p.min}, ${p.max}]`)
        }
      }
    }

    if (
      result.series.length === 0 &&
      !result.bodies?.length &&
      !result.assignment &&
      !result.equation &&
      !result.chromatogram
    ) {
      warn(where, 'kernel returns nothing to draw')
    }

    // --- live substitutions must be valid KaTeX, not prose ---
    // `substitute` output is rendered as maths. English words dropped into it come out as
    // a run of italic single-letter variables with the spaces stripped: "reacts with 4 of
    // 4" renders as "reactswith4of4". Nothing throws, so only looking at the page catches
    // it — which is what this check is for.
    for (const [i, block] of lesson.equations.entries()) {
      if (!block.substitute) continue
      for (const corner of corners) {
        const latex = block.substitute(kernel(corner).readouts)
        const prose = bareWordsIn(latex)
        if (prose.length > 0) {
          err(
            where,
            `equation ${i + 1} substitutes prose into maths: ${prose
              .map((w) => `"${w}"`)
              .join(', ')} — wrap words in \\text{…}`
          )
          break
        }
      }
    }

    // --- animation, drag targets and presets must reference real parameters ---
    if (lesson.sim.animate) {
      const a = lesson.sim.animate
      const spec = paramSpecs.get(a.param)
      if (!spec) {
        err(where, `animate.param "${a.param}" is not a declared parameter`)
      } else {
        if (!spec.hidden) {
          warn(where, `animate.param "${a.param}" is clock-driven; it should be hidden`)
        }
        if (a.loop > spec.max) {
          err(where, `animate.loop ${a.loop} exceeds the max of param "${a.param}" (${spec.max})`)
        }
        if (a.speed <= 0) err(where, `animate.speed must be positive, got ${a.speed}`)
      }
    }

    for (const key of lesson.sim.draggable ?? []) {
      if (!paramSpecs.has(key)) err(where, `draggable references unknown parameter "${key}"`)
    }

    for (const [i, preset] of (lesson.sim.presets ?? []).entries()) {
      for (const [k, v] of Object.entries(preset.params)) {
        const spec = paramSpecs.get(k)
        if (!spec) {
          err(where, `preset ${i} ("${preset.label.en}") sets unknown parameter "${k}"`)
        } else if (v < spec.min || v > spec.max) {
          err(
            where,
            `preset ${i} ("${preset.label.en}") sets ${k} = ${v}, outside [${spec.min}, ${spec.max}]`
          )
        }
      }
      // A preset that renders a blank stage is worse than no preset.
      const merged = { ...defaults, ...preset.params }
      try {
        const r = kernel(merged)
        for (const readout of lesson.sim.readouts) {
          if (!Number.isFinite(r.readouts[readout.key])) {
            err(where, `preset ${i} ("${preset.label.en}") makes readout "${readout.key}" non-finite`)
          }
        }
      } catch (e) {
        err(where, `preset ${i} ("${preset.label.en}") makes the kernel throw: ${(e as Error).message}`)
      }
    }

    // --- narration actions must target real parameters, in range ---
    for (const section of lesson.narration.sections) {
      for (const line of section.lines) {
        const params = line.action?.params
        if (!params) continue
        for (const [k, v] of Object.entries(params)) {
          const spec = paramSpecs.get(k)
          if (!spec) {
            err(where, `narration line "${line.id}" sets unknown parameter "${k}"`)
          } else if (v < spec.min || v > spec.max) {
            err(
              where,
              `narration line "${line.id}" sets ${k} = ${v}, outside [${spec.min}, ${spec.max}]`
            )
          }
        }
      }
    }
  } else {
    for (const section of lesson.narration.sections) {
      for (const line of section.lines) {
        if (line.action?.params) {
          err(where, `narration line "${line.id}" sets parameters but the lesson has no simulation`)
        }
      }
    }
  }
}

// --- questions --------------------------------------------------------------

const allQuestions = [
  ...Array.from(banks.entries()).flatMap(([bank, qs]) => qs.map((q) => ({ q, where: `bank ${bank}` }))),
  ...lessons.flatMap(({ lesson, slug, subject }) =>
    lesson.checkpoints.map((q) => ({ q, where: `lesson ${subject}/${slug}` }))
  ),
]

const seenIds = new Set<string>()

for (const { q, where } of allQuestions) {
  const at = `${where} → ${q.id}`

  if (seenIds.has(q.id)) err(at, 'duplicate question id')
  seenIds.add(q.id)

  if (!commandWordByName.has(q.commandWord)) {
    err(at, `"${q.commandWord}" is not one of the 15 syllabus command words`)
  }

  const schemeMarks = q.markScheme.reduce((sum, m) => sum + m.marks, 0)
  if (schemeMarks !== q.marks) {
    err(at, `mark scheme totals ${schemeMarks} but the question is worth ${q.marks}`)
  }

  if (q.marks < 1) err(at, 'must be worth at least 1 mark')
  if (q.syllabus.length === 0) err(at, 'has no syllabus reference')

  if (q.options) {
    if (q.options.length !== 4) {
      // Papers 1 and 2 are four-option multiple choice throughout.
      warn(at, `has ${q.options.length} options; IGCSE multiple choice uses 4`)
    }
    if (q.answerIndex === undefined) {
      err(at, 'has options but no answerIndex')
    } else if (q.answerIndex < 0 || q.answerIndex >= q.options.length) {
      err(at, `answerIndex ${q.answerIndex} is out of range`)
    }
  } else if (q.answerIndex !== undefined) {
    err(at, 'has an answerIndex but no options')
  }

  // Stems are English-only on purpose; a CJK character here means copy leaked in.
  if (/[一-鿿]/.test(q.stem)) {
    err(at, 'stem contains Chinese — question stems must be English only')
  }
}

// --- translation coverage (informational) -----------------------------------

const translated = translatable.filter((v) => Boolean(v.zh?.trim())).length
const zhPct = translatable.length ? Math.round((translated / translatable.length) * 100) : 100

// --- report -----------------------------------------------------------------

console.log(c.bold('\nContent integrity\n'))
console.log(
  `  ${lessons.length} lesson(s), ${allQuestions.length} question(s)\n` +
    `  Chinese scaffolding: ${translated}/${translatable.length} strings (${zhPct}%)\n`
)

for (const w of warnings) console.log(c.yellow(`  ! ${w}`))
if (warnings.length > 0) console.log()

if (errors.length > 0) {
  for (const e of errors) console.error(c.red(`  ✗ ${e}`))
  console.error(c.red(`\n  ${errors.length} error(s)\n`))
  process.exit(1)
}

console.log(c.green('  ✓ All content checks passed\n'))
