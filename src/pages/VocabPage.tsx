import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { T } from '@/components/i18n/T'
import { LangToggle } from '@/components/i18n/LangToggle'
import { TranslatorToggle } from '@/components/translator/TranslatorToggle'
import { ConceptCard } from '@/components/vocab/ConceptCard'
import { WordBank } from '@/components/vocab/WordBank'
import { VocabHud } from '@/components/vocab/VocabHud'
import { StudyMode } from '@/components/vocab/StudyMode'
import { GamePicker } from '@/components/vocab/GamePicker'
import { MistakeList } from '@/components/vocab/MistakeList'
import { HooksTab } from '@/components/hooks/HooksTab'
import { lessons } from '@/lib/registry'
import { useWordBank } from '@/lib/useVocab'
import { SYLLABUSES } from '@/content/syllabus'
import type { Lesson, Term, Bilingual } from '@/content/types'
import type { ConceptEnrichment } from '@/lib/vocabTypes'
import { getEnrichment } from '@/content/termEnrichments'
import { VOCAB } from '@/lib/vocabStrings'
import { HOOKS } from '@/lib/hooksStrings'

/**
 * The vocabulary page.
 *
 * Two-level filter (subject → lesson) that affects every tab:
 *   - All terms: browses the in-scope glossary
 *   - Word bank: shows only saved words in scope
 *   - Study: SRS queue filtered to in-scope words
 *   - Game: pool of in-scope terms
 *   - Mistakes: only in-scope mistakes
 *   - Hooks: only in-scope classroom stories
 *
 * URL state: `?tab=study&subject=0610&slug=7-1-nutrition&focus=oviduct`
 * lands on the study tab filtered to 7-1 nutrition, with oviduct
 * scrolled into view.
 */
type Tab = 'all' | 'bank' | 'study' | 'game' | 'mistakes' | 'hooks'

const VALID_TABS: ReadonlySet<Tab> = new Set<Tab>([
  'all',
  'bank',
  'study',
  'game',
  'mistakes',
  'hooks',
])

export interface VocabScope {
  subject: string
  slug: string
}

/** A row in the lesson-picker dropdown. */
interface LessonOption {
  subject: string
  slug: string
  title: Bilingual
  termCount: number
}

function lessonsInSubject(subject: string): LessonOption[] {
  return lessons
    .filter((l) => l.subject === subject)
    .map((l) => ({
      subject: l.subject,
      slug: l.slug,
      title: lessonShortTitle(l),
      termCount: l.glossary.length,
    }))
    .sort((a, b) => a.slug.localeCompare(b.slug, 'en', { numeric: true }))
}

function lessonShortTitle(l: Lesson): Bilingual {
  return l.title
}

export function VocabPage() {
  const [searchParams, setSearchParams] = useSearchParams()

  // -- URL → state on first mount (one-way read) --
  const urlTab = searchParams.get('tab')
  const initialTab: Tab = urlTab && VALID_TABS.has(urlTab as Tab) ? (urlTab as Tab) : 'all'
  const [tab, setTab] = useState<Tab>(initialTab)

  const urlSubject = searchParams.get('subject') ?? 'all'
  const urlSlug = searchParams.get('slug') ?? 'all'
  // If the slug from the URL doesn't belong to the subject, fall back
  // to 'all' so the picker doesn't show a non-existent combination.
  const validSlug = (() => {
    if (urlSubject === 'all' || urlSlug === 'all') return urlSlug
    const ok = lessons.some((l) => l.subject === urlSubject && l.slug === urlSlug)
    return ok ? urlSlug : 'all'
  })()
  const [subject, setSubject] = useState<string>(urlSubject === 'all' ? 'all' : urlSubject)
  const [slug, setSlug] = useState<string>(validSlug)

  // If the user changes subject, reset slug to 'all' (handled in
  // SubjectLessonFilter's onSubjectChange).

  // -- state → URL (one-way write) --
  useEffect(() => {
    const current = {
      tab: searchParams.get('tab'),
      subject: searchParams.get('subject'),
      slug: searchParams.get('slug'),
      focus: searchParams.get('focus'),
    }
    const want: Record<string, string | null> = {
      tab: tab === 'all' ? null : tab,
      subject: subject === 'all' ? null : subject,
      slug: slug === 'all' ? null : slug,
      focus: current.focus, // managed separately by the focus effect
    }
    if (
      current.tab === want.tab &&
      current.subject === want.subject &&
      current.slug === want.slug
    ) {
      return
    }
    setSearchParams(
      (prev) => {
        const out = new URLSearchParams(prev)
        for (const [k, v] of Object.entries(want)) {
          if (v === null) out.delete(k)
          else out.set(k, v)
        }
        return out
      },
      { replace: true }
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, subject, slug])

  // -- focus scrolling: when ?focus=xxx, scroll to that term on tab=all --
  const focusTerm = searchParams.get('focus')
  const hasScrolledRef = useRef<string | null>(null)
  useEffect(() => {
    if (tab !== 'all' || !focusTerm) return
    if (hasScrolledRef.current === focusTerm) return
    // Wait for the next paint so the term is in the DOM.
    const id = requestAnimationFrame(() => {
      const el = document.getElementById(`term-${focusTerm}`)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' })
        // Brief ring to draw the eye.
        el.classList.add('ring-2', 'ring-teal-400', 'ring-offset-2')
        setTimeout(() => {
          el.classList.remove('ring-2', 'ring-teal-400', 'ring-offset-2')
        }, 1600)
        hasScrolledRef.current = focusTerm
      }
    })
    return () => cancelAnimationFrame(id)
  }, [tab, focusTerm])

  // -- data --
  const scope: VocabScope = { subject, slug }
  const allTerms = useMemo(() => {
    const rows: Array<{
      term: Term
      subject: string
      slug: string
      enrichment: ConceptEnrichment | undefined
    }> = []
    for (const l of lessons) {
      if (subject !== 'all' && l.subject !== subject) continue
      if (slug !== 'all' && l.slug !== slug) continue
      for (const t of l.glossary) {
        rows.push({
          term: t,
          subject: l.subject,
          slug: l.slug,
          enrichment: getEnrichment(l.subject, l.slug, t.en),
        })
      }
    }
    return rows
  }, [subject, slug])

  // The flat pool the games use — same data, exposed as `term` so the
  // component can pick definitions.
  const pool = useMemo(() => allTerms.map((r) => ({ term: r.term })), [allTerms])

  const resolve = (termId: string, subj: string, slg: string): {
    term: Term
    enrichment?: ConceptEnrichment
  } | null => {
    const lesson = lessons.find((l) => l.subject === subj && l.slug === slg)
    if (!lesson) return null
    const term = lesson.glossary.find((t) => t.en === termId)
    if (!term) return null
    const enrichment = getEnrichment(subj, slg, termId)
    return enrichment ? { term, enrichment } : { term }
  }

  const filterLabel = useMemo<string | null>(() => {
    if (subject === 'all' && slug === 'all') return null
    if (slug !== 'all') {
      const l = lessons.find((x) => x.subject === subject && x.slug === slug)
      return l ? `${l.title.en}` : `${subject} / ${slug}`
    }
    const s = SYLLABUSES.find((s) => s.code === subject)
    return s ? s.title.en : subject
  }, [subject, slug])

  // Total glossary count across every lesson of the currently selected
  // subject. Used by the "All (N)" chip in the subject row. Must live at
  // the top of the component (not inside the JSX) to respect the rules
  // of hooks — calling useMemo from inside a prop expression will trip
  // a hook-order check in some bundlers and break renders.
  const totalCount = useMemo(() => {
    let n = 0
    for (const l of lessons) {
      if (subject !== 'all' && l.subject !== subject) continue
      n += l.glossary.length
    }
    return n
  }, [subject])

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <header className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div>
          <Link to="/" className="text-xs text-muted hover:text-ink-soft">
            ← <T value={{ en: 'All lessons', zh: '返回首页' }} />
          </Link>
          <h1 className="mt-1 text-3xl font-bold text-ink">
            <T value={VOCAB.pageTitle} />
          </h1>
          <p className="mt-1 max-w-2xl text-sm text-ink-soft">
            <T value={VOCAB.pageSummary} />
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <VocabHud scope={scope} />
          <TranslatorToggle />
          <LangToggle />
        </div>
      </header>

      <nav className="mb-4 flex flex-wrap gap-1 border-b border-line">
        {(
          [
            { id: 'all', label: VOCAB.tabAll },
            { id: 'bank', label: VOCAB.tabBank },
            { id: 'study', label: VOCAB.tabStudy },
            { id: 'game', label: VOCAB.tabGame },
            { id: 'mistakes', label: VOCAB.tabMistakes },
            { id: 'hooks', label: HOOKS.tabHooks },
          ] as const
        ).map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={
              'rounded-t-md border-b-2 px-3 py-1.5 text-sm font-medium transition-colors ' +
              (tab === t.id
                ? 'border-teal-600 text-teal-700'
                : 'border-transparent text-muted hover:text-ink-soft')
            }
          >
            <T value={t.label} />
          </button>
        ))}
      </nav>

      <div className="mb-4">
        <SubjectLessonFilter
          subject={subject}
          slug={slug}
          onSubjectChange={(s) => {
            setSubject(s)
            setSlug('all')
          }}
          onSlugChange={setSlug}
          count={allTerms.length}
          totalCount={totalCount}
          filterLabel={filterLabel}
        />
      </div>

      {tab === 'all' && (
        <div className="space-y-3">
          {allTerms.length === 0 ? (
            <p className="rounded-lg border border-dashed border-line bg-canvas p-6 text-center text-sm text-muted">
              <T value={VOCAB.bankNoneInGroup} />
            </p>
          ) : (
            <ul className="grid gap-3">
              {allTerms.map((r) => (
                <li key={`${r.subject}/${r.slug}/${r.term.en}`}>
                  {r.enrichment ? (
                    <ConceptCard term={r.term} enrichment={r.enrichment} variant="inline" />
                  ) : (
                    <ConceptCard term={r.term} variant="inline" />
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {tab === 'bank' && <WordBank resolve={resolve} scope={scope} />}

      {tab === 'study' && <StudyMode resolve={resolve} scope={scope} />}

      {tab === 'game' && <GamePicker resolve={resolve} pool={pool} scope={scope} />}

      {tab === 'mistakes' && <MistakeList scope={scope} />}

      {tab === 'hooks' && <HooksTab scope={scope} />}

      <WordBankSeeder scope={scope} />
    </main>
  )
}

/**
 * Two-row filter: subject chips, then a lesson dropdown for the
 * currently selected subject. When subject is 'all' the lesson row
 * shows a count summary instead.
 */
function SubjectLessonFilter({
  subject,
  slug,
  onSubjectChange,
  onSlugChange,
  count,
  totalCount,
  filterLabel,
}: {
  subject: string
  slug: string
  onSubjectChange: (s: string) => void
  onSlugChange: (s: string) => void
  count: number
  totalCount: number
  filterLabel: string | null
}) {
  const lessonOptions = subject === 'all' ? [] : lessonsInSubject(subject)
  return (
    <div className="rounded-lg border border-line bg-canvas px-3 py-2 text-xs">
      <div className="flex flex-wrap items-center gap-2 text-muted">
        <span>
          <T value={VOCAB.filterAll} /> ·
        </span>
        <button
          type="button"
          onClick={() => {
            onSubjectChange('all')
            onSlugChange('all')
          }}
          className={
            'rounded-md border px-2 py-0.5 ' +
            (subject === 'all' ? 'border-teal-600 bg-teal-50 text-teal-800' : 'border-line bg-surface')
          }
        >
          All ({totalCount})
        </button>
        {SYLLABUSES.map((s) => (
          <button
            key={s.code}
            type="button"
            onClick={() => onSubjectChange(s.code)}
            title={s.title.en}
            className={
              'inline-flex items-center gap-1 rounded-md border px-2 py-0.5 ' +
              (subject === s.code ? 'border-teal-600 bg-teal-50 text-teal-800' : 'border-line bg-surface')
            }
          >
            <T value={s.shortName ?? s.title} />
            <span className="font-mono text-[10px] text-muted">{s.code}</span>
          </button>
        ))}
        {filterLabel && (
          <span className="ml-2 truncate text-ink">
            · <span className="font-medium">{filterLabel}</span> ({count})
          </span>
        )}
      </div>
      {lessonOptions.length > 0 && (
        <div className="mt-2 flex flex-wrap items-center gap-2 text-muted">
          <span>
            <T value={VOCAB.filterLesson} /> ·
          </span>
          <button
            type="button"
            onClick={() => onSlugChange('all')}
            className={
              'rounded-md border px-2 py-0.5 ' +
              (slug === 'all'
                ? 'border-teal-600 bg-teal-50 text-teal-800'
                : 'border-line bg-surface')
            }
          >
            <T value={VOCAB.filterAllLessons} />
          </button>
          {lessonOptions.map((l) => (
            <button
              key={l.slug}
              type="button"
              onClick={() => onSlugChange(l.slug)}
              className={
                'rounded-md border px-2 py-0.5 ' +
                (slug === l.slug
                  ? 'border-teal-600 bg-teal-50 text-teal-800'
                  : 'border-line bg-surface')
              }
              title={l.title.en}
            >
              {l.slug}{' '}
              <span className="text-[10px] text-muted">({l.termCount})</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

/**
 * Ensures every lesson's glossary terms exist in the user's bank. Called on
 * mount so the student has a starting set to interact with — without this
 * the bank is empty until they manually add each term, which feels broken.
 * Idempotent: terms the user has already removed are not re-added.
 *
 * When a scope is set, only that lesson's terms are seeded into the bank.
 * This keeps the bank lean for the next class — the student can drill
 * one lesson at a time without 480 entries competing for attention.
 */
function WordBankSeeder({ scope }: { scope: VocabScope }) {
  const { ensure, words } = useWordBank()
  // Compute the missing terms. `words` is a dependency because every
  // ensure() bumps the bank and we want the next render to see a
  // shorter seed (or an empty one, when the bank catches up).
  const seed = useMemo(() => {
    const all = lessons.flatMap((l) => {
      if (scope.subject !== 'all' && l.subject !== scope.subject) return []
      if (scope.slug !== 'all' && l.slug !== scope.slug) return []
      return l.glossary.map((t) => ({ termId: t.en, subject: l.subject, slug: l.slug }))
    })
    const have = new Set(words.map((w) => w.termId))
    return all.filter((a) => !have.has(a.termId))
  }, [words, scope.subject, scope.slug])

  // IMPORTANT: do NOT call ensure() from the render body. setState during
  // render in React 19 trips "Maximum update depth exceeded" (error #185)
  // because the ensure() call refreshes words, which re-renders, which
  // re-computes seed, which — depending on the bundle's batching — can
  // fire another ensure() before React gets to commit. The fix is to
  // move the side effect into useEffect, which runs *after* the commit
  // phase and only re-fires when the seed actually changes.
  //
  // In-flight dedup: even after moving to useEffect, a single edge case
  // can re-trigger: when the user is between two scopes and the lesson
  // set overlaps (e.g. switching from 7-1 to 7-1+8-1), the same termId
  // can briefly appear in two seed arrays. ensure() is already idempotent
  // (ensureMany skips termIds it already has), so the dedup is just a
  // belt-and-suspenders optimization to avoid the pointless write.
  const inFlight = useRef(new Set<string>())
  useEffect(() => {
    const todo = seed.filter((s) => !inFlight.current.has(s.termId))
    if (todo.length > 0) {
      for (const t of todo) inFlight.current.add(t.termId)
      ensure(todo)
    }
  }, [seed, ensure])

  return null
}
