/**
 * Syllabus registry.
 *
 * Everything downstream — the coverage report, the home page, the lesson header —
 * resolves statements through here rather than importing one subject directly. Adding a
 * subject means adding a file and one entry in `SYLLABUSES`; nothing else changes.
 */

import type { Syllabus, SyllabusStatement, SyllabusSubtopic } from '../types'
import { igcsePhysics0625 } from './igcse-physics-0625'
import { igcseChemistry0620 } from './igcse-chemistry-0620'
import { igcseBiology0610 } from './igcse-biology-0610'

/** Every syllabus the course covers, in the order they should be offered. */
export const SYLLABUSES: Syllabus[] = [igcsePhysics0625, igcseChemistry0620, igcseBiology0610]

export const syllabusByCode: ReadonlyMap<string, Syllabus> = new Map(
  SYLLABUSES.map((s) => [s.code, s])
)

/** Every statement across every subject, flattened. */
export const allStatements: SyllabusStatement[] = SYLLABUSES.flatMap((s) =>
  s.topics.flatMap((t) => t.subtopics.flatMap((sub) => sub.statements))
)

/**
 * Statement lookup by fully-qualified id, e.g. `0625.1.2.6` or `0620.2.1.3`.
 *
 * Ids carry their subject code, so one flat map is unambiguous across subjects.
 */
export const statementById: ReadonlyMap<string, SyllabusStatement> = new Map(
  allStatements.map((s) => [s.id, s])
)

export const subtopicByStatementId: ReadonlyMap<string, SyllabusSubtopic> = new Map(
  SYLLABUSES.flatMap((s) =>
    s.topics.flatMap((t) =>
      t.subtopics.flatMap((sub) => sub.statements.map((st) => [st.id, sub] as const))
    )
  )
)

/** The subject code a statement id belongs to — the part before the first dot. */
export function subjectOfStatement(id: string): string {
  return id.split('.')[0] ?? ''
}

/** All statements belonging to one subject. */
export function statementsForSubject(code: string): SyllabusStatement[] {
  const syllabus = syllabusByCode.get(code)
  if (!syllabus) return []
  return syllabus.topics.flatMap((t) => t.subtopics.flatMap((s) => s.statements))
}

export { igcsePhysics0625, igcseChemistry0620 }
