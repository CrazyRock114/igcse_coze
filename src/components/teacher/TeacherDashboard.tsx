import { T } from '@/components/i18n/T'
import { TEACHER } from '@/lib/teacherStrings'
import { StudentList } from './StudentList'
import { ClassHeatmap } from './ClassHeatmap'
import { HookRatingsSummary } from './HookRatingsSummary'

/**
 * The /teacher landing page.
 *
 * Top: student list (the main thing a teacher wants).
 * Below: class struggle map (which statements hurt the most across
 * the class), then hook ratings (currently empty, future-proofed).
 */
export function TeacherDashboard() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-ink">
          <T value={TEACHER.dashboardTitle} />
        </h1>
        <p className="mt-1 max-w-2xl text-sm text-ink-soft">
          <T value={TEACHER.dashboardSubtitle} />
        </p>
      </header>

      <section className="mb-6">
        <StudentList />
      </section>

      <div className="grid gap-4 lg:grid-cols-2">
        <ClassHeatmap />
        <HookRatingsSummary />
      </div>
    </main>
  )
}
