/**
 * Term index — a flat lookup `termId → { subject, slug, term }`.
 *
 * Built once from the `lessons` registry at module load. We need this
 * in two places:
 *   - `RelatedChips` in ConceptCard / StudyMode: when a chip says
 *     "see also: oviduct", we want to look up oviduct's Chinese
 *     translation so a hover tooltip can show it without the user
 *     clicking.
 *   - `VocabPage` filter: when the user picks a related term, the
 *     page should jump to that term — we need to know which lesson
 *     it came from to set the filter correctly.
 *
 * The same termId could in principle exist in two lessons (cross-
 * references are allowed). We keep both — `getTermLocations` returns
 * the list, and `findFirstTerm` returns the first match for the
 * common single-source case.
 */

import type { Lesson, Term } from '@/content/types'
import { loadAllSubjects } from './registry'

export interface TermLocation {
  subject: string
  slug: string
  lesson: Lesson
  term: Term
}

const locationsByTermId = new Map<string, TermLocation[]>()

let built = false
let building: Promise<Map<string, TermLocation[]>> | null = null

/**
 * Glossaries live inside lesson bodies, so the index builds lazily on
 * first query — consumers suspend via `use(ensureTermIndex())`. The
 * result is cached for the session and shared across pages.
 */
export function ensureTermIndex(): Promise<Map<string, TermLocation[]>> {
  if (built) return Promise.resolve(locationsByTermId)
  building ??= loadAllSubjects().then((bundles) => {
    for (const bundle of bundles) {
      for (const lesson of bundle.lessons) {
        for (const term of lesson.glossary) {
          const list = locationsByTermId.get(term.en) ?? []
          list.push({ subject: lesson.subject, slug: lesson.slug, lesson, term })
          locationsByTermId.set(term.en, list)
        }
      }
    }
    built = true
    return locationsByTermId
  })
  return building
}

/** All glossary entries that match `termId`, across all lessons. */
export function getTermLocations(termId: string): TermLocation[] {
  return locationsByTermId.get(termId) ?? []
}

/** The first match, or null if the term is not in any glossary. */
export function findFirstTerm(termId: string): TermLocation | null {
  const list = locationsByTermId.get(termId)
  return list && list.length > 0 ? list[0]! : null
}

/**
 * The Chinese translation, or the English if the term has no
 * `zh` field. Returns null if the term is not in any glossary.
 */
export function findTermChinese(termId: string, current?: string): string | null {
  if (current && termId === current) return null
  const loc = findFirstTerm(termId)
  if (!loc) return null
  return loc.term.zh ?? loc.term.en
}
