import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { ClassroomStory } from '@/content/classroom-stories'
import { findLesson } from '@/lib/registry'
import { T } from '@/components/i18n/T'
import { HOOKS } from '@/lib/hooksStrings'

/**
 * One classroom story — the compact card.
 *
 * Default: hook name, English mirror, quality badge, lesson badge, tags.
 * Click to expand: bilingual oneLiner, "whatItReplaces" (the mechanism),
 * transcript reference, related terms, source.
 *
 * All the bilingual data is rendered through `<T>` — no CJK strings here.
 */
export function HookCard({ story }: { story: ClassroomStory }) {
  const [open, setOpen] = useState(false)
  const lesson = findLesson('0610', `${story.lesson}-${slugFromLessonCode(story.lesson)}`)
  const lessonSlug = lesson ? lesson.slug : `${story.lesson}`
  const lessonTitle = lesson?.title
  const termLink = (termId: string) => {
    if (!lesson) return null
    return (
      <Link
        key={termId}
        to={`/lesson/${lesson.subject}/${lesson.slug}`}
        className="rounded border border-line bg-canvas px-1.5 py-0.5 text-xs text-ink-soft hover:border-teal-500 hover:text-teal-700"
        title={`Open ${lesson.subject}/${lesson.slug}`}
      >
        {termId}
      </Link>
    )
  }

  return (
    <li className="rounded-xl border border-line bg-surface p-3">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-start gap-3 text-left"
        aria-expanded={open}
      >
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-2">
            <span className="truncate text-sm font-semibold text-ink">{story.hookName}</span>
            <span className="truncate text-xs text-muted">{story.hookNameEn}</span>
          </div>
          {lessonTitle && (
            <p className="mt-0.5 text-xs text-muted">
              <T value={HOOKS.fromLesson} /> ·{' '}
              <span className="font-mono">{story.lesson}</span> ·{' '}
              <T value={lessonTitle} />
            </p>
          )}
          {story.topicTags.length > 0 && (
            <p className="mt-1 flex flex-wrap gap-1">
              {story.topicTags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-line bg-canvas px-2 py-0.5 text-[10px] text-muted"
                >
                  {t}
                </span>
              ))}
            </p>
          )}
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1">
          <QualityBadge quality={story.quality} />
          <span className="text-[10px] text-muted">
            <T value={HOOKS.toldOn} /> {story.date}
          </span>
        </div>
      </button>

      {open && (
        <div className="mt-3 space-y-3 border-t border-line pt-3 text-sm">
          {/* The hook itself, in both languages. */}
          <div>
            <p className="text-ink">
              <T value={story.oneLiner} />
            </p>
          </div>

          {/* The mechanism — why this hook works. */}
          {story.whatItReplaces && (
            <div>
              <p className="text-xs font-semibold tracking-wide text-muted uppercase">
                <T value={HOOKS.expand} />
              </p>
              <p className="mt-1 text-ink-soft">
                <T value={story.whatItReplaces} />
              </p>
            </div>
          )}

          {/* Transcript reference. */}
          <div>
            <p className="text-xs font-semibold tracking-wide text-muted uppercase">
              <T value={HOOKS.transcriptRef} />
            </p>
            <p className="mt-1 text-xs text-muted">
              {story.transcriptRef.date} ·{' '}
              <T
                value={HOOKS.lineRef}
                params={{ line: story.transcriptRef.approxLine }}
              />
            </p>
            <blockquote className="mt-1 border-l-2 border-line pl-2 text-xs italic text-ink-soft">
              {story.transcriptRef.excerpt}
            </blockquote>
          </div>

          {/* Related terms → links to the lesson. */}
          {story.relatedTermIds && story.relatedTermIds.length > 0 && (
            <div>
              <p className="text-xs font-semibold tracking-wide text-muted uppercase">
                <T value={HOOKS.relatedTerms} />
              </p>
              <p className="mt-1 flex flex-wrap gap-1">
                {story.relatedTermIds.map((id) => termLink(id))}
              </p>
            </div>
          )}

          {/* Optional source attribution. */}
          {story.source && (
            <div>
              <p className="text-xs font-semibold tracking-wide text-muted uppercase">
                <T value={HOOKS.source} />
              </p>
              <p className="mt-1 text-xs text-muted">
                <T value={story.source} />
              </p>
            </div>
          )}

          {/* Bottom-row: jump to the lesson. */}
          {lesson && (
            <div className="border-t border-line pt-2">
              <Link
                to={`/lesson/${lesson.subject}/${lessonSlug}`}
                className="text-xs text-accent hover:underline"
              >
                <T value={lesson.title} /> →
              </Link>
            </div>
          )}
        </div>
      )}
    </li>
  )
}

function slugFromLessonCode(code: string): string {
  // classroom-stories.lesson is the short code, e.g. "7-1".
  // Lesson slugs are like "7-1-nutrition". We have to derive the suffix
  // from the registry, but if the lookup fails we just use the short code.
  const map: Record<string, string> = {
    '7-1': 'nutrition',
    '9-1': 'transport-animals',
    '10-1': 'disease-immunity',
    '11-1': 'gas-exchange',
    '14-1': 'nervous-system',
    '14-3': 'homeostasis',
    '17-1': 'inheritance',
    '19-1': 'ecosystems',
  }
  return map[code] ?? code
}

function QualityBadge({ quality }: { quality: ClassroomStory['quality'] }) {
  const styles =
    quality === 'A'
      ? 'border-teal-300 bg-teal-50 text-teal-800'
      : quality === 'B'
        ? 'border-amber-300 bg-amber-50 text-amber-800'
        : 'border-slate-300 bg-slate-50 text-slate-700'
  const label = quality === 'A' ? HOOKS.qualityA : quality === 'B' ? HOOKS.qualityB : HOOKS.qualityC
  return (
    <span
      className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${styles}`}
    >
      <T value={label} />
    </span>
  )
}
