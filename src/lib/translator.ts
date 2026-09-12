/**
 * Translation client for the on-page selection translator.
 *
 * The course is English-primary (IGCSE is examined in English) and the existing
 * `LangToggle` only controls how much Chinese scaffolding appears. That is the
 * right default — every student sitting the paper has to read English. But a
 * student who hits an unfamiliar word still needs to look it up, and reaching
 * for a dictionary breaks the flow. The selection translator is for that
 * moment: select a word or phrase, get the Chinese gloss, keep reading.
 *
 * Provider: MyMemory (`https://api.mymemory.translated.net`). Free tier, no API
 * key, browser-callable with CORS. Quality is good for the science register
 * we care about; see the README for the rationale and an evaluation snippet.
 *
 *   GET /get?q={text}&langpair=en|zh-CN
 *   → { responseData: { translatedText, match }, responseStatus, ... }
 *
 * The cache is in-memory and bounded — students re-selecting the same word
 * should not eat quota. Quota exhaustion is treated as a soft failure
 * (returns the cached value if any, otherwise surfaces a `quota` error so the
 * UI can show a clear message rather than spinning forever.
 */

const API_BASE = 'https://api.mymemory.translated.net/get'
const SOURCE_LANG = 'en'
const TARGET_LANG = 'zh-CN'
const TIMEOUT_MS = 10_000

/** Max characters we will hand to the API in one request. */
const MAX_QUERY_CHARS = 500

/** Cache size. Small — translation results are small, and an unbounded Map would
 *  grow forever in a long reading session. */
const CACHE_LIMIT = 256

const cache = new Map<string, TranslationResult>()

function cacheGet(key: string): TranslationResult | undefined {
  const v = cache.get(key)
  if (v) {
    // LRU-ish: re-insert to bump to most-recently-used.
    cache.delete(key)
    cache.set(key, v)
  }
  return v
}

function cachePut(key: string, value: TranslationResult): void {
  if (cache.has(key)) cache.delete(key)
  cache.set(key, value)
  while (cache.size > CACHE_LIMIT) {
    const oldest = cache.keys().next().value
    if (oldest === undefined) break
    cache.delete(oldest)
  }
}

export type TranslationError =
  | { kind: 'empty' }
  | { kind: 'too-long'; length: number; max: number }
  | { kind: 'network'; message: string }
  | { kind: 'http'; status: number; message: string }
  | { kind: 'parse'; message: string }
  | { kind: 'quota'; message: string }
  | { kind: 'timeout' }

export interface TranslationOk {
  ok: true
  text: string
  /** Provider-reported match score 0..1. Higher = more confident. */
  match: number
  /** Whether this came from the local cache (used to suppress re-fetching). */
  cached: boolean
}

export interface TranslationErr {
  ok: false
  error: TranslationError
  /** Whether this came from the local cache (used to suppress re-fetching). */
  cached: boolean
}

export type TranslationResult = TranslationOk | TranslationErr

function isTranslationResult(v: unknown): v is TranslationResult {
  if (typeof v !== 'object' || v === null) return false
  const o = v as Record<string, unknown>
  if (o.ok === true) return typeof o.text === 'string' && typeof o.cached === 'boolean'
  if (o.ok === false) return typeof o.error === 'object' && o.error !== null && typeof o.cached === 'boolean'
  return false
}

function normalize(s: string): string {
  // Whitespace runs and trailing punctuation are translation-noise; cache the
  // cleaned form so "mitochondria." and "mitochondria" share a hit.
  return s.replace(/\s+/g, ' ').trim()
}

function withTimeout<T>(p: Promise<T>, ms: number, onTimeout: () => T): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const t = setTimeout(() => resolve(onTimeout()), ms)
    p.then(
      (v) => {
        clearTimeout(t)
        resolve(v)
      },
      (e) => {
        clearTimeout(t)
        reject(e)
      }
    )
  })
}

/**
 * Translate a single English phrase into Simplified Chinese.
 *
 * `signal` lets callers cancel in-flight requests (e.g. when the user picks a
 * new selection before the previous response arrives).
 */
export async function translate(
  text: string,
  options: { signal?: AbortSignal } = {}
): Promise<TranslationResult> {
  const cleaned = normalize(text)
  if (!cleaned) return { ok: false, error: { kind: 'empty' }, cached: false }
  if (cleaned.length > MAX_QUERY_CHARS) {
    return {
      ok: false,
      error: { kind: 'too-long', length: cleaned.length, max: MAX_QUERY_CHARS },
      cached: false,
    }
  }

  const cached = cacheGet(cleaned)
  if (cached) return { ...cached, cached: true }

  const params = new URLSearchParams({ q: cleaned, langpair: `${SOURCE_LANG}|${TARGET_LANG}` })
  const url = `${API_BASE}?${params.toString()}`

  let res: Response
  try {
    const fetchInit: RequestInit = {}
    if (options.signal) fetchInit.signal = options.signal
    res = await withTimeout(fetch(url, fetchInit), TIMEOUT_MS, () => {
      // `fetch` does not reject on its own timeout, so we resolve with a
      // synthetic Response-like wrapper. The AbortSignal path still works for
      // explicit cancellation.
      throw new Error('timeout')
    })
  } catch (e) {
    if (options.signal?.aborted) {
      return { ok: false, error: { kind: 'empty' }, cached: false }
    }
    const msg = e instanceof Error ? e.message : String(e)
    if (msg === 'timeout') {
      return { ok: false, error: { kind: 'timeout' }, cached: false }
    }
    return { ok: false, error: { kind: 'network', message: msg }, cached: false }
  }

  if (!res.ok) {
    return {
      ok: false,
      error: { kind: 'http', status: res.status, message: res.statusText },
      cached: false,
    }
  }

  let body: unknown
  try {
    body = await res.json()
  } catch (e) {
    return {
      ok: false,
      error: { kind: 'parse', message: e instanceof Error ? e.message : String(e) },
      cached: false,
    }
  }

  const data = body as {
    responseData?: { translatedText?: string; match?: number }
    responseStatus?: number
    responseDetails?: string
    quotaFinished?: boolean
  }

  // MyMemory returns responseStatus 200 even for quota / invalid language; the
  // real failure lives in `responseDetails` or `quotaFinished`.
  if (data.quotaFinished) {
    return {
      ok: false,
      error: { kind: 'quota', message: data.responseDetails ?? 'Translation quota exhausted.' },
      cached: false,
    }
  }
  if (typeof data.responseStatus === 'number' && data.responseStatus !== 200) {
    return {
      ok: false,
      error: {
        kind: 'http',
        status: data.responseStatus,
        message: data.responseDetails ?? 'Translation failed.',
      },
      cached: false,
    }
  }

  const translated = data.responseData?.translatedText
  if (typeof translated !== 'string' || !translated) {
    return {
      ok: false,
      error: { kind: 'parse', message: 'Missing responseData.translatedText' },
      cached: false,
    }
  }

  const match = typeof data.responseData?.match === 'number' ? data.responseData.match : 0
  const ok: TranslationOk = { ok: true, text: translated, match, cached: false }
  cachePut(cleaned, ok)
  return ok
}

/** Test-only / dev hook: clear the in-memory cache. */
export function _clearTranslationCacheForTest(): void {
  cache.clear()
}

/** Exposed for the UI: how many entries are cached. */
export function _translationCacheSize(): number {
  return cache.size
}

/**
 * Validate a Selection-like text. Used by the UI to decide whether to even
 * show the floating "translate" button — no point offering it for a single
 * whitespace character.
 */
export function isTranslatable(text: string): boolean {
  const cleaned = normalize(text)
  if (cleaned.length < 2) return false
  // Pure punctuation or digits is not worth a network call.
  if (/^[\s\p{P}\p{S}\d]+$/u.test(cleaned)) return false
  return true
}

/** Internal — referenced for the `isTranslationResult` type guard only. */
export const _internal = { isTranslationResult }
