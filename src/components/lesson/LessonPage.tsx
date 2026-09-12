import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import type { Lesson } from '@/content/types'
import { findKernel, findLesson } from '@/lib/registry'
import { statementById, subtopicByStatementId } from '@/content/syllabus'
import { T } from '@/components/i18n/T'
import { Term } from '@/components/i18n/Term'
import { LangToggle } from '@/components/i18n/LangToggle'
import { TranslatorToggle } from '@/components/translator/TranslatorToggle'
import { ParamPanel } from './ParamPanel'
import { ReadoutPanel } from './ReadoutPanel'
import { Equation } from './Equation'
import { SimStage } from '@/sim/SimStage'
import { NarrationPlayer } from '@/components/narration/NarrationPlayer'
import { LessonExtras } from '@/components/lesson-extras/LessonExtras'
import { QuestionCard } from '@/components/assessment/QuestionCard'
import { advanceLooping, useAnimationFrame } from '@/lib/useAnimationFrame'
import { ui } from '@/lib/ui-strings'
import { progressStore } from '@/lib/progressStore'

/**
 * The generic lesson renderer.
 *
 * Every lesson in the course goes through this component — there are no bespoke
 * per-lesson pages. A new lesson is a new `lesson.ts`, not a new React component.
 *
 * Page order follows the layout the reference sites converged on, which reads well:
 * title → narration → simulation → equations → controls and readouts → objectives
 * and glossary → checkpoints.
 */
export function LessonPage() {
  const { subject, slug } = useParams<{ subject: string; slug: string }>()
  const lesson = subject && slug ? findLesson(subject, slug) : undefined

  if (!lesson) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="text-2xl font-bold">Lesson not found</h1>
        <Link to="/" className="mt-4 inline-block text-accent hover:underline">
          ← Back to all lessons
        </Link>
      </main>
    )
  }

  return <LessonView lesson={lesson} key={lesson.slug} />
}

function LessonView({ lesson }: { lesson: Lesson }) {
  const kernel = findKernel(lesson.subject, lesson.slug)

  const [params, setParams] = useState<Record<string, number>>(() =>
    Object.fromEntries(lesson.sim?.params.map((p) => [p.key, p.default]) ?? [])
  )

  const result = useMemo(() => {
    if (!kernel || !lesson.sim) return null
    return kernel(params)
  }, [kernel, lesson.sim, params])

  const setParam = useCallback((key: string, value: number) => {
    setParams((prev) => ({ ...prev, [key]: value }))
  }, [])

  // Narration lines and presets both set several parameters at once.
  const applyParams = useCallback((next: Record<string, number>) => {
    setParams((prev) => ({ ...prev, ...next }))
  }, [])

  // The animation clock advances one named parameter. The kernel stays pure — this is
  // the same write a slider would make, just driven by a timer.
  const animate = lesson.sim?.animate
  const clock = useAnimationFrame(
    Boolean(animate),
    useCallback(
      (delta: number) => {
        if (!animate) return
        setParams((prev) => ({
          ...prev,
          [animate.param]: advanceLooping(
            prev[animate.param] ?? 0,
            delta,
            animate.speed,
            animate.loop
          ),
        }))
      },
      [animate]
    )
  )

  // Mark every syllabus statement this lesson covers as "seen" once on mount.
  // The store is idempotent within 1s so a route re-mount won't double-count.
  useEffect(() => {
    if (lesson.syllabus.length > 0) {
      progressStore.markSeen(lesson.subject, lesson.syllabus)
    }
  }, [lesson.subject, lesson.syllabus])

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <nav className="mb-6 flex items-center gap-3 text-sm">
        <Link to="/" className="text-accent hover:underline">
          ← All lessons
        </Link>
        <span className="ml-auto flex flex-wrap items-center gap-2">
          <Link
            to="/vocab"
            className="rounded-md border border-line bg-surface px-2.5 py-1 text-xs font-medium text-ink-soft hover:border-teal-500 hover:text-teal-700"
          >
            📚 Vocabulary
          </Link>
          <TranslatorToggle />
          <LangToggle />
        </span>
      </nav>

      <header className="mb-6">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <span
            className={
              'rounded-full px-2.5 py-0.5 text-xs font-medium ' +
              (lesson.tier === 'extended'
                ? 'bg-violet-100 text-violet-800'
                : 'bg-teal-100 text-teal-800')
            }
          >
            {lesson.tier === 'extended' ? 'Core + Extended' : 'Core'}
          </span>
          <span className="text-xs text-muted">{lesson.estimatedMinutes} min</span>
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-ink">
          <T value={lesson.title} />
        </h1>
        <p className="mt-2 max-w-2xl text-ink-soft">
          <T value={lesson.summary} />
        </p>

        <SyllabusChips ids={lesson.syllabus} />
      </header>

      {/* `min-w-0` on the column is load-bearing, not tidying. A grid item defaults to
          `min-width: auto`, so the track cannot shrink below the widest thing inside it —
          and an SVG with a 460-unit viewBox reports 460px of intrinsic width however small
          `w-full` draws it. Without this the whole page grew to about 470px on a 375px
          phone, so every paragraph on the lesson scrolled sideways with it. */}
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="min-w-0 space-y-6">
          {result && lesson.sim && (
            <section className="rounded-xl border border-line bg-surface p-4">
              <SimStage
                spec={lesson.sim}
                result={result}
                params={params}
                onParamChange={setParam}
              />

              {animate && (
                <div className="mt-3 border-t border-line pt-3">
                  <button
                    type="button"
                    onClick={clock.toggle}
                    className="rounded-lg bg-ink px-3 py-1.5 text-sm font-medium text-white hover:bg-ink-soft"
                  >
                    {clock.playing ? '■ Pause' : '▶ Play'}
                  </button>
                </div>
              )}
            </section>
          )}

          {/* The explanation sits directly under the canvas, not beside it. Narration
              lines drive the simulation, so it has to stay near the picture — but it is
              tall, and in the sidebar it pushed the controls out of line with the
              canvas, which made it impossible to adjust a parameter and watch the
              result at the same time. */}
          <NarrationPlayer script={lesson.narration} onAction={applyParams} />

          {lesson.extras && lesson.extras.length > 0 && <LessonExtras extras={lesson.extras} />}

          {lesson.equations.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-ink">Equations</h2>
              {lesson.equations.map((eq, i) => (
                <Equation key={i} block={eq} {...(result ? { readouts: result.readouts } : {})} />
              ))}
            </section>
          )}

          <section>
            <h2 className="mb-3 text-lg font-semibold text-ink">Learning outcomes</h2>
            <ul className="space-y-1.5">
              {lesson.objectives.map((o, i) => (
                <li key={i} className="flex gap-2 text-ink-soft">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-teal-600" />
                  <T value={o} />
                </li>
              ))}
            </ul>
          </section>

          {lesson.glossary.length > 0 && (
            <section>
              <h2 className="mb-3 text-lg font-semibold text-ink">Key terms</h2>
              <p className="flex flex-wrap gap-x-4 gap-y-2">
                {lesson.glossary.map((t) => (
                  <Term key={t.en} term={t} />
                ))}
              </p>
            </section>
          )}

          {lesson.checkpoints.length > 0 && (
            <section>
              <h2 className="mb-3 text-lg font-semibold text-ink">Check yourself</h2>
              <ol className="space-y-3">
                {lesson.checkpoints.map((q, i) => (
                  <QuestionCard key={q.id} question={q} index={i} relatedStatementIds={lesson.syllabus} />
                ))}
              </ol>
            </section>
          )}
        </div>

        {/* Sticky, and starting level with the canvas, so a parameter can be changed
            while its effect is still on screen. */}
        <aside className="space-y-4 lg:sticky lg:top-6 lg:self-start">
          {lesson.sim && (
            <div className="rounded-xl border border-line bg-surface p-4">
              <h3 className="text-sm font-semibold text-ink">Controls</h3>
              <p className="mt-1 mb-3 text-xs leading-relaxed text-muted">
                <T value={lesson.sim.hint ?? ui.controlsHintFallback} />
              </p>
              <ParamPanel
                params={lesson.sim.params}
                values={params}
                onChange={setParam}
                {...(lesson.sim.presets ? { presets: lesson.sim.presets } : {})}
                onPreset={applyParams}
              />
            </div>
          )}

          {lesson.sim && result && (
            <div className="rounded-xl border border-line bg-surface p-4">
              <h3 className="mb-3 text-sm font-semibold text-ink">Readings</h3>
              <ReadoutPanel readouts={lesson.sim.readouts} values={result.readouts} />
            </div>
          )}
        </aside>
      </div>
    </main>
  )
}

function SyllabusChips({ ids }: { ids: string[] }) {
  // Group by subtopic so a long list reads as "1.2 Motion ×11", not 11 loose codes.
  const groups = new Map<string, { title: string; count: number }>()
  for (const id of ids) {
    const sub = subtopicByStatementId.get(id)
    if (!sub) continue
    const g = groups.get(sub.id)
    if (g) g.count++
    else groups.set(sub.id, { title: sub.title.en, count: 1 })
  }

  const supplement = ids.filter((id) => statementById.get(id)?.tier === 'supplement').length

  return (
    <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
      <span className="text-muted">Syllabus</span>
      {Array.from(groups.entries()).map(([id, g]) => (
        <span key={id} className="rounded border border-line bg-surface px-2 py-0.5 text-ink-soft">
          <span className="font-mono font-medium">{id}</span> {g.title}
          <span className="ml-1 text-muted">×{g.count}</span>
        </span>
      ))}
      {supplement > 0 && (
        <span className="text-muted">
          ({supplement} Supplement statement{supplement === 1 ? '' : 's'})
        </span>
      )}
    </div>
  )
}
