/**
 * On/off state for the selection translator.
 *
 * The translator is opt-in: the existing `LangToggle` already controls how
 * much Chinese scaffolding the page shows, and we do not want to compete
 * with it. The translator is for the *unfamiliar-word* case — select, click,
 * read. So it ships off by default and the user turns it on from the header.
 *
 * Persistence is the same scheme the assist level uses (localStorage, with
 * the same try/catch tolerance for private-browsing storage failures).
 */

import { useSyncExternalStore } from 'react'

const STORAGE_KEY = 'sci.translator'
const DEFAULT = false

function read(): boolean {
  if (typeof localStorage === 'undefined') return DEFAULT
  try {
    return localStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    return DEFAULT
  }
}

let current = read()
const listeners = new Set<() => void>()

function emit() {
  for (const l of listeners) l()
}

export function isTranslatorEnabled(): boolean {
  return current
}

export function setTranslatorEnabled(v: boolean): void {
  if (v === current) return
  current = v
  try {
    localStorage.setItem(STORAGE_KEY, v ? '1' : '0')
  } catch {
    // Storage disabled — the setting just won't persist.
  }
  emit()
}

export function useTranslatorEnabled(): [boolean, (v: boolean) => void] {
  const v = useSyncExternalStore(
    (cb) => {
      listeners.add(cb)
      return () => listeners.delete(cb)
    },
    () => current,
    () => DEFAULT
  )
  return [v, setTranslatorEnabled]
}
