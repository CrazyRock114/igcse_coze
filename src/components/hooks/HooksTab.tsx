import { useMemo, useState } from 'react'
import { classroomStories, type StoryQuality } from '@/content/classroom-stories'
import { lessons } from '@/lib/registry'
import { T } from '@/components/i18n/T'
import { HOOKS } from '@/lib/hooksStrings'
import { HookCard } from './HookCard'
import type { VocabScope } from '@/pages/VocabPage'

/**
 * The "Hooks" tab content — the browse view for the 30+ classroom
 * stories collected across 7 lessons.
 *
 * Filters: lesson (one of the syllabuses' published lessons) and
 * quality (A / B / C, multi-select chips). Sort: by quality-then-date
 * (default), by date, or by lesson order.
 *
 * When the page-level `scope` is set, the story filter is overridden:
 * the page filter takes precedence so the user only sees hooks for
 * the currently selected lesson.
 */
export function HooksTab({ scope }: { scope?: VocabScope }) {
  // The set of lesson codes that have hooks AND have a published lesson.
  // We surface only those so the dropdown matches what the user can
  // actually open.
  const lessonOptions = useMemo(() => {
    const codesWithStories = new Set(classroomStories.map((s) => s.lesson))
    return lessons
      .filter((l) => codesWithStories.has(l.slug.split('-').slice(0, 2).join('-')))
      .map((l) => ({ code: l.slug.split('-').slice(0, 2).join('-'), title: l.title }))
  }, [])

  // The page-level scope wins: if the user has filtered to a specific
  // lesson (e.g. 7-1-nutrition), the hooks tab shows only that lesson's
  // stories. The local dropdown is hidden in that case — the user
  // can't override the page-level filter from inside the hooks tab.
  const scopeIsLocked = !!(scope && scope.slug !== 'all')
  const scopedLesson = scopeIsLocked
    ? scope!.slug.split('-').slice(0, 2).join('-')
    : 'all'

  const [lesson, setLesson] = useState<string>('all')
  const [quality, setQuality] = useState<Set<StoryQuality>>(new Set())
  const [sort, setSort] = useState<'qualityDate' | 'date' | 'lesson'>('qualityDate')

  // Effective lesson filter = scope wins, else user's local pick.
  const effectiveLesson = scopeIsLocked ? scopedLesson : lesson

  const filtered = useMemo(() => {
    let rows = classroomStories.slice()
    if (effectiveLesson !== 'all') rows = rows.filter((s) => s.lesson === effectiveLesson)
    if (quality.size > 0) rows = rows.filter((s) => quality.has(s.quality))

    const byQuality = (q: StoryQuality) => (q === 'A' ? 0 : q === 'B' ? 1 : 2)
    rows.sort((a, b) => {
      if (sort === 'qualityDate') {
        const dq = byQuality(a.quality) - byQuality(b.quality)
        if (dq !== 0) return dq
        return a.date < b.date ? 1 : a.date > b.date ? -1 : 0
      }
      if (sort === 'date') {
        return a.date < b.date ? 1 : a.date > b.date ? -1 : 0
      }
      // lesson order: sort by lesson code, then quality, then date.
      const dl = a.lesson.localeCompare(b.lesson)
      if (dl !== 0) return dl
      const dq = byQuality(a.quality) - byQuality(b.quality)
      if (dq !== 0) return dq
      return a.date < b.date ? 1 : a.date > b.date ? -1 : 0
    })
    return rows
  }, [effectiveLesson, quality, sort])

  const toggleQuality = (q: StoryQuality) => {
    setQuality((prev) => {
      const next = new Set(prev)
      if (next.has(q)) next.delete(q)
      else next.add(q)
      return next
    })
  }

  const hasFilter = effectiveLesson !== 'all' || quality.size > 0

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
        {/* Lesson filter — hidden when the page-level scope is locked */}
        {!scopeIsLocked && (
          <div className="flex items-center gap-1.5">
            <span className="text-muted">
              <T value={HOOKS.filterLesson} />:
            </span>
            <select
              value={lesson}
              onChange={(e) => setLesson(e.target.value)}
              className="rounded-md border border-line bg-surface px-1.5 py-0.5 text-xs"
            >
              <option value="all">
                <T value={HOOKS.filterAllLessons} />
              </option>
              {lessonOptions.map((o) => (
                <option key={o.code} value={o.code}>
                  {o.code} · <T value={o.title} />
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Quality filter */}
        <div className="flex items-center gap-1.5">
          <span className="text-muted">
            <T value={HOOKS.filterQuality} />:
          </span>
          {(['A', 'B', 'C'] as const).map((q) => {
            const active = quality.has(q)
            return (
              <button
                key={q}
                type="button"
                onClick={() => toggleQuality(q)}
                className={
                  'rounded-md border px-2 py-0.5 font-mono ' +
                  (active
                    ? q === 'A'
                      ? 'border-teal-500 bg-teal-50 text-teal-800'
                      : q === 'B'
                        ? 'border-amber-500 bg-amber-50 text-amber-800'
                        : 'border-slate-500 bg-slate-100 text-slate-800'
                    : 'border-line bg-surface text-muted')
                }
              >
                {q}
              </button>
            )
          })}
        </div>

        {/* Sort */}
        <div className="flex items-center gap-1.5">
          <span className="text-muted">
            <T value={HOOKS.filterSort} />:
          </span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as 'qualityDate' | 'date' | 'lesson')}
            className="rounded-md border border-line bg-surface px-1.5 py-0.5 text-xs"
          >
            <option value="qualityDate">
              <T value={HOOKS.sortQualityDate} />
            </option>
            <option value="date">
              <T value={HOOKS.sortDate} />
            </option>
            <option value="lesson">
              <T value={HOOKS.sortLesson} />
            </option>
          </select>
        </div>

        <span className="ml-auto text-muted">
          <T value={HOOKS.tabHooksCount} params={{ count: filtered.length }} />
        </span>

        {hasFilter && (
          <button
            type="button"
            onClick={() => {
              setLesson('all')
              setQuality(new Set())
            }}
            disabled={scopeIsLocked}
            className="rounded-md border border-line bg-surface px-2 py-0.5 text-xs text-muted hover:border-teal-500 hover:text-teal-700 disabled:opacity-50"
          >
            <T value={HOOKS.clearFilters} />
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-lg border border-dashed border-line bg-canvas p-6 text-center text-sm text-muted">
          <T value={HOOKS.hooksEmpty} />
        </p>
      ) : (
        <ul className="grid gap-2">
          {filtered.map((s) => (
            <HookCard key={s.id} story={s} />
          ))}
        </ul>
      )}
    </div>
  )
}
