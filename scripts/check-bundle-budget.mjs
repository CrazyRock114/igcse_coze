#!/usr/bin/env node
/* Bundle budget check — runs after `vite build`.
 *
 * Guards two invariants that previous regressions violated:
 *   1. vendor-three must NOT be reachable from the entry chunk. When Rollup
 *      mis-places the __vitePreload helper (or a 3D component stops being
 *      lazy), the entry starts statically importing ~1 MB of three.js. We
 *      detect this by reading dist/index.html: neither its entry <script>
 *      nor any modulepreload link may reference the vendor-three chunk.
 *   2. The entry chunk must stay under a gzip budget (first-load JS).
 *
 * Failing this script fails `pnpm run build`, so CI catches regressions.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { gzipSync } from 'node:zlib'

const dist = new URL('../dist', import.meta.url).pathname

const ENTRY_GZIP_BUDGET = 400 * 1024 // 400 KB gzipped, entry chunk only
const FIRSTLOAD_GZIP_BUDGET = 500 * 1024 // 400..500 KB gzipped, entry + its static css/preloads

let failed = false
const fail = (msg) => {
  console.error(`✗ ${msg}`)
  failed = true
}

// --- 1. locate chunks -------------------------------------------------------
const assetsDir = join(dist, 'assets')
const chunks = readdirSync(assetsDir)
  .filter((f) => f.endsWith('.js'))
  .map((f) => {
    const raw = readFileSync(join(assetsDir, f))
    return { name: f, raw: raw.length, gzip: gzipSync(raw).length }
  })
  .sort((a, b) => b.gzip - a.gzip)

const indexHtml = readFileSync(join(dist, 'index.html'), 'utf8')

// --- 2. vendor-three must stay out of the entry graph ------------------------
// dist/index.html references the entry chunk via <script type="module"> and
// static css via <link rel="stylesheet">. modulepreload links should be absent
// (modulePreload: false) — if one appears and points at vendor-three, the 3D
// stack is back on the critical path.
const preloadHrefs = [...indexHtml.matchAll(/<link[^>]+rel="modulepreload"[^>]+href="([^"]+)"/g)].map((m) => m[1])
const scriptSrcs = [...indexHtml.matchAll(/<script[^>]+type="module"[^>]+src="([^"]+)"/g)].map((m) => m[1])
const threeRefs = [...preloadHrefs, ...scriptSrcs].filter((href) => /vendor-three/i.test(href))
if (threeRefs.length > 0) {
  fail(`vendor-three statically reachable from entry via ${threeRefs.join(', ')}`)
} else {
  console.log('✓ vendor-three is not in the entry graph')
}

// --- 3. entry chunk gzip budget ---------------------------------------------
const entrySrc = scriptSrcs[0]
if (!entrySrc) {
  fail('no module entry <script> found in dist/index.html')
} else {
  const entryName = entrySrc.split('/').pop()
  const entry = chunks.find((c) => c.name === entryName)
  if (!entry) {
    fail(`entry chunk ${entryName} not found in dist/assets`)
  } else {
    const kb = (n) => `${(n / 1024).toFixed(1)} KB`
    if (entry.gzip > ENTRY_GZIP_BUDGET) {
      fail(`entry chunk ${entry.name} is ${kb(entry.gzip)} gzipped (budget ${kb(ENTRY_GZIP_BUDGET)})`)
    } else {
      console.log(`✓ entry chunk ${entry.name}: ${kb(entry.gzip)} gzip (budget ${kb(ENTRY_GZIP_BUDGET)})`)
    }
  }
}

// --- 4. informational: heaviest chunks --------------------------------------
const heaviest = chunks.slice(0, 5).map((c) => `${c.name} ${(c.gzip / 1024).toFixed(0)}K.gz`).join(', ')
console.log(`ℹ heaviest chunks: ${heaviest}`)

process.exit(failed ? 1 : 0)
