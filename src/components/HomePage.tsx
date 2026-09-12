import { Link, useParams } from 'react-router-dom'
import { SYLLABUSES, syllabusByCode } from '@/content/syllabus'
import { assessmentObjectives } from '@/content/syllabus/command-words'
import { coveredStatementIds, lessons, lessonsForStatement } from '@/lib/registry'
import { T } from '@/components/i18n/T'
import { LangToggle } from '@/components/i18n/LangToggle'
import { TranslatorToggle } from '@/components/translator/TranslatorToggle'
import { UserMenu } from '@/components/auth/UserMenu'
import { ProgressCard } from '@/components/progress/ProgressCard'
import { useProgressSnapshot } from '@/hooks/useProgressSnapshot'
import { classify, statementFillClass } from '@/lib/progressTypes'

/**
 * The syllabus *is* the home page.
 *
 * Rather than a gallery of simulations, the landing view is the statement map with
 * coverage marked on it — so a student can always see what is taught, what is still to
 * come, and which lesson to open for a given statement.
 */
export function HomePage() {
  const { subject } = useParams<{ subject: string }>()
  // `??` alone would not catch an empty route param, since '' is not nullish.
  const syllabus = (subject ? syllabusByCode.get(subject) : undefined) ?? SYLLABUSES[0]!

  const covered = coveredStatementIds()
  const subjectLessons = lessons.filter((l) => l.subject === syllabus.code)
  const progress = useProgressSnapshot()

  const allIds = syllabus.topics.flatMap((t) =>
    t.subtopics.flatMap((s) => s.statements.map((x) => x.id))
  )
  const coveredCount = allIds.filter((id) => covered.has(id)).length
  const pct = allIds.length ? Math.round((coveredCount / allIds.length) * 100) : 0

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <header className="mb-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-ink">
              <T value={syllabus.title} />
            </h1>
            <p className="mt-1 text-ink-soft">
              Syllabus {syllabus.code} · for examination in {syllabus.cycle[0]}–{syllabus.cycle[1]} ·{' '}
              {syllabus.guidedLearningHours} guided learning hours
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              to="/vocab"
              className="rounded-md border border-line bg-surface px-2.5 py-1 text-xs font-medium text-ink-soft hover:border-teal-500 hover:text-teal-700"
            >
              📚 Vocabulary
            </Link>
            <TranslatorToggle />
            <LangToggle />
            <UserMenu />
          </div>
        </div>

        {SYLLABUSES.length > 1 && (
          <nav className="mt-4 flex flex-wrap gap-2">
            {SYLLABUSES.map((s) => {
              const active = s.code === syllabus.code
              const taught = lessons.filter((l) => l.subject === s.code).length
              return (
                <Link
                  key={s.code}
                  to={`/subject/${s.code}`}
                  className={
                    'rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ' +
                    (active
                      ? 'border-teal-600 bg-teal-50 text-teal-900'
                      : 'border-line text-muted hover:bg-canvas')
                  }
                >
                  <T value={s.title} />
                  <span className="ml-2 text-xs opacity-70">
                    {taught} lesson{taught === 1 ? '' : 's'}
                  </span>
                </Link>
              )
            })}
          </nav>
        )}

        <div className="mt-6 space-y-3">
          <ProgressCard />

          <div className="rounded-xl border border-line bg-surface p-4">
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-medium text-ink-soft">Syllabus coverage</span>
              <span className="font-mono text-sm text-ink">
                {coveredCount} / {allIds.length} statements · {pct}%
              </span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-canvas">
              <div className="h-full rounded-full bg-teal-600" style={{ width: `${pct}%` }} />
            </div>
            <p className="mt-2 text-xs text-muted">
              How many syllabus statements have a published lesson. This is a
              developer-side number, not your progress.
            </p>
            <p className="mt-1 text-xs text-muted">
              {subjectLessons.length} lesson{subjectLessons.length === 1 ? '' : 's'} published.
              Assessment weighting:{' '}
              {assessmentObjectives.map((ao) => `${ao.code} ${ao.weight}%`).join(' · ')}
            </p>
          </div>
        </div>

        {/* The squares below are one per syllabus statement, and nothing on the page says
            so. Without this the map reads as decoration and the only way to find a lesson
            is to click a 10-pixel square and hope. The OUTER ring is the course
            status (core/supplement/not taught) — the INNER fill is the student's
            personal progress, layered on top when there's data. */}
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted">
          <span>Each square is one syllabus statement.</span>
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block size-2.5 rounded-sm bg-teal-600" />
            Core, taught
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block size-2.5 rounded-sm bg-violet-500" />
            Supplement, taught
          </span>
          {progress.touchedStatementCount > 0 && (
            <>
              <span className="ml-3 inline-flex items-center gap-1.5">
                <span className="inline-block size-2.5 rounded-sm bg-teal-500" />
                mastered
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="inline-block size-2.5 rounded-sm bg-teal-300" />
                practising
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="inline-block size-2.5 rounded-sm bg-rose-300" />
                struggling
              </span>
            </>
          )}
        </div>
      </header>

      <div className="space-y-8">
        {syllabus.topics.map((topic) => {
          const ids = topic.subtopics.flatMap((s) => s.statements.map((x) => x.id))
          const done = ids.filter((id) => covered.has(id)).length
          return (
            <section key={topic.number}>
              <h2 className="mb-3 flex items-baseline gap-3 text-xl font-semibold text-ink">
                <span className="font-mono text-muted">{topic.number}</span>
                <T value={topic.title} />
                <span className="ml-auto text-sm font-normal text-muted">
                  {done} / {ids.length}
                </span>
              </h2>

              <ul className="space-y-2">
                {topic.subtopics.map((sub) => {
                  const subDone = sub.statements.filter((s) => covered.has(s.id)).length
                  // Every lesson that teaches any statement in this subtopic, de-duplicated.
                  // The row itself links to the first — clicking the title is what anyone
                  // tries, and until now only the individual squares were clickable.
                  const lessons = Array.from(
                    new Map(
                      sub.statements
                        .flatMap((s) => lessonsForStatement(s.id))
                        .map((l) => [`${l.subject}/${l.slug}`, l])
                    ).values()
                  )
                  const first = lessons[0]

                  const heading = (
                    <>
                      <span className="font-mono text-sm font-medium text-ink">{sub.id}</span>
                      <span className="text-sm text-ink-soft">
                        <T value={sub.title} />
                      </span>
                    </>
                  )

                  return (
                    <li key={sub.id} className="rounded-lg border border-line bg-surface px-3 py-2">
                      <div className="flex flex-wrap items-center gap-2">
                        {first ? (
                          <Link
                            to={`/lesson/${first.subject}/${first.slug}`}
                            className="flex items-center gap-2 rounded hover:text-teal-700"
                          >
                            {heading}
                          </Link>
                        ) : (
                          <span className="flex items-center gap-2 opacity-70">{heading}</span>
                        )}
                        <span className="ml-auto flex gap-0.5">
                          {sub.statements.map((s) => {
                            const isCovered = covered.has(s.id)
                            const target = lessonsForStatement(s.id)[0]
                            const userStatus = classify(progress.progressById.get(s.id))
                            const userFill = statementFillClass(userStatus)
                            // The outer ring is the course status (core/supplement/none).
                            // The inner fill is the student's personal status, only shown
                            // when the user has any data for this statement.
                            const showUserFill = userStatus !== 'untouched'
                            const courseBg = isCovered
                              ? s.tier === 'supplement'
                                ? 'bg-violet-500'
                                : 'bg-teal-600'
                              : 'bg-slate-200'
                            const dot = (
                              <span
                                title={`${s.id} · ${s.tier === 'supplement' ? 'Supplement' : 'Core'} · ${s.label.en}`}
                                className={`relative block size-2.5 rounded-sm ${courseBg}`}
                              >
                                {showUserFill && (
                                  <span
                                    className={`absolute inset-0.5 rounded-[1px] ${userFill}`}
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            )
                            return target ? (
                              <Link key={s.id} to={`/lesson/${target.subject}/${target.slug}`}>
                                {dot}
                              </Link>
                            ) : (
                              <span key={s.id}>{dot}</span>
                            )
                          })}
                        </span>
                        {subDone > 0 && (
                          <span className="font-mono text-xs text-muted">
                            {subDone}/{sub.statements.length}
                          </span>
                        )}
                      </div>

                      {lessons.length > 0 && (
                        <p className="mt-1 flex flex-wrap gap-x-3 text-xs">
                          {lessons.map((l) => (
                            <Link
                              key={`${l.subject}/${l.slug}`}
                              to={`/lesson/${l.subject}/${l.slug}`}
                              className="text-teal-700 hover:underline"
                            >
                              <T value={l.title} />
                            </Link>
                          ))}
                        </p>
                      )}
                    </li>
                  )
                })}
              </ul>
            </section>
          )
        })}
      </div>

      {subjectLessons.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-3 text-xl font-semibold text-ink">Published lessons</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {subjectLessons.map((l) => (
              <li key={`${l.subject}/${l.slug}`}>
                <Link
                  to={`/lesson/${l.subject}/${l.slug}`}
                  className="block rounded-xl border border-line bg-surface p-4 transition-colors hover:border-teal-500"
                >
                  <h3 className="font-semibold text-ink">
                    <T value={l.title} />
                  </h3>
                  <p className="mt-1 text-sm text-ink-soft">
                    <T value={l.summary} />
                  </p>
                  <p className="mt-2 text-xs text-muted">
                    {l.syllabus.length} statements · {l.estimatedMinutes} min ·{' '}
                    {l.checkpoints.length} checkpoints
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <footer className="mt-12 border-t border-line pt-6 text-xs text-muted">
        <p>
          Not affiliated with or endorsed by Cambridge International. Syllabus references are used
          for curriculum mapping only; all lesson text and questions are original to this course.
        </p>
      </footer>
    </main>
  )
}
