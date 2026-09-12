/**
 * Bilingual rendering: English-primary with Chinese scaffolding.
 *
 * The model here is deliberately *not* a general i18n library. This course has one
 * content language (English — the language of the exam) plus an optional support
 * language. A student who reads only the Chinese would not be prepared to sit the
 * paper, so Chinese never replaces English; it sits alongside it or on hover.
 *
 * Assist levels (borrowed from SynthoMing's `body[data-age]` depth switcher, which
 * did the same trick for reading age):
 *   off    — English only. Exam-condition mode.
 *   hover  — Chinese appears on hover/tap. Default.
 *   inline — Chinese shown alongside English. For students newest to the language.
 */

import { useSyncExternalStore } from 'react'
import type { Bilingual } from '@/content/types'

export type AssistLevel = 'off' | 'hover' | 'inline'

export const ASSIST_LEVELS: AssistLevel[] = ['off', 'hover', 'inline']

export const assistLevelLabels: Record<AssistLevel, Bilingual> = {
  off: { en: 'English only — exam conditions', zh: '纯英文——考试模式' },
  hover: {
    en: 'English, with Chinese revealed when you hover the 中 marker',
    zh: '英文为主，悬停 中 标记即显示中文',
  },
  inline: { en: 'Chinese shown under every line', zh: '每句下方并列中文' },
}

/**
 * Compact labels for the toggle itself.
 *
 * These live here rather than in the component because the `中` glyph is the
 * affordance — a component may not contain Chinese literals (enforced by ESLint),
 * and this is metadata about the setting, not course copy.
 */
export const assistLevelShortLabels: Record<AssistLevel, string> = {
  off: 'EN',
  hover: 'EN + 中?',
  inline: 'EN + 中',
}

const STORAGE_KEY = 'sci.assist'
const DEFAULT: AssistLevel = 'hover'

function isAssistLevel(v: unknown): v is AssistLevel {
  return v === 'off' || v === 'hover' || v === 'inline'
}

function read(): AssistLevel {
  if (typeof localStorage === 'undefined') return DEFAULT
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    return isAssistLevel(v) ? v : DEFAULT
  } catch {
    return DEFAULT
  }
}

let current: AssistLevel = read()
const listeners = new Set<() => void>()

function emit() {
  for (const l of listeners) l()
}

export function getAssistLevel(): AssistLevel {
  return current
}

export function setAssistLevel(level: AssistLevel): void {
  if (level === current) return
  current = level
  try {
    localStorage.setItem(STORAGE_KEY, level)
  } catch {
    // Private browsing or storage disabled — the setting just won't persist.
  }
  if (typeof document !== 'undefined') {
    document.body.dataset['assist'] = level
  }
  emit()
}

function subscribe(cb: () => void): () => void {
  listeners.add(cb)
  return () => listeners.delete(cb)
}

/** React binding. Re-renders when the assist level changes. */
export function useAssistLevel(): [AssistLevel, (l: AssistLevel) => void] {
  const level = useSyncExternalStore(subscribe, getAssistLevel, () => DEFAULT)
  return [level, setAssistLevel]
}

/** Applies the persisted level to `document.body` on boot, before first paint. */
export function initAssistLevel(): void {
  if (typeof document === 'undefined') return
  document.body.dataset['assist'] = current
}

// ---------------------------------------------------------------------------
// Reading Bilingual values
// ---------------------------------------------------------------------------

/** The English text. Always present — that is the point of the `Bilingual` type. */
export function en(value: Bilingual): string {
  return value.en
}

/**
 * The Chinese text, or `undefined` if this value has not been translated.
 * Callers must handle absence: partial translation is a normal, expected state.
 */
export function zh(value: Bilingual): string | undefined {
  return value.zh
}

/** Whether Chinese should be rendered inline at the current assist level. */
export function showsInline(level: AssistLevel, value: Bilingual): boolean {
  return level === 'inline' && Boolean(value.zh)
}

/** Whether Chinese should be reachable on hover/focus at the current assist level. */
export function showsOnHover(level: AssistLevel, value: Bilingual): boolean {
  return level === 'hover' && Boolean(value.zh)
}

/**
 * Coverage of Chinese scaffolding across a set of values — used by the content
 * integrity script to report how much of a lesson has been translated.
 */
export function translationCoverage(values: Bilingual[]): { total: number; translated: number } {
  return {
    total: values.length,
    translated: values.filter((v) => Boolean(v.zh?.trim())).length,
  }
}
