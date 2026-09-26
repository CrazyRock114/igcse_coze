/**
 * Narration audio — one offline TTS generation pass.
 *
 * The narration *scripts* already live next to every lesson
 * (`src/content/lessons/<subject>/<slug>/narration.ts`, NarrationScript) and
 * NarrationPlayer already looks for pre-generated audio at:
 *
 *     /audio/<lang>/<scriptId>/<lineId>.mp3      (lang: 'en' | 'zh')
 *
 * This script does that single generation pass with the platform TTS client:
 * it walks every narration file, synthesizes each line, and writes the mp3s
 * into public/audio/. It is idempotent — existing files are skipped, so it
 * can be re-run anytime to fill gaps (e.g. after adding new lessons).
 *
 * Usage:
 *   pnpm run gen:narration                          # everything that is missing
 *   pnpm run gen:narration -- --only 3-2-osmosis    # one script
 *   pnpm run gen:narration -- --max 40              # cap calls this run
 *   pnpm run gen:narration -- --langs en            # only English
 *
 * Voices: the IGCSE narration is bilingual. 'en' lines use the VV voice
 * (native Chinese + English bilingual), 'zh' lines use Xiaohe.
 */
import { readdirSync, statSync, existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const OUT_ROOT = join(ROOT, 'public', 'audio')

// --- CLI args ----------------------------------------------------------------
const args = process.argv.slice(2)
const getArg = (name: string) => {
  const i = args.indexOf(`--${name}`)
  return i >= 0 ? args[i + 1] : undefined
}
const ONLY = getArg('only')
const MAX = Number(getArg('max') ?? Number.POSITIVE_INFINITY)
const LANGS = ((getArg('langs') ?? 'en,zh').split(',').filter(Boolean) as Array<'en' | 'zh'>)

const SPEAKERS = {
  en: 'zh_female_vv_uranus_bigtts', // bilingual voice, natural on English text
  zh: 'zh_female_xiaohe_uranus_bigtts',
}

// --- collect narration scripts ------------------------------------------------
const lessonsRoot = join(ROOT, 'src', 'content', 'lessons')
const narrationFiles: string[] = []
for (const subject of readdirSync(lessonsRoot)) {
  const subjectDir = join(lessonsRoot, subject)
  if (!statSync(subjectDir).isDirectory()) continue
  for (const slug of readdirSync(subjectDir)) {
    const f = join(subjectDir, slug, 'narration.ts')
    if (existsSync(f)) narrationFiles.push(f)
  }
}
narrationFiles.sort()

/** Minimal shape of the NarrationScript each narration.ts exports. */
interface ScriptShape {
  id: string
  sections: Array<{ lines: Array<{ id: string; text: { en?: string; zh: string } }> }>
}

/** Each narration.ts has exactly one NarrationScript export; pick it by shape. */
async function loadScript(file: string): Promise<ScriptShape> {
  const mod = (await import(file)) as Record<string, unknown>
  const candidate = Object.values(mod).find(
    (v): v is ScriptShape =>
      !!v && typeof v === 'object' && Array.isArray((v as ScriptShape).sections) && typeof (v as ScriptShape).id === 'string',
  )
  if (!candidate) throw new Error(`no NarrationScript export in ${file}`)
  return candidate
}

// --- main --------------------------------------------------------------------
async function main() {
  const { TTSClient, Config } = await import('coze-coding-dev-sdk')
  const client = new TTSClient(new Config())

  let calls = 0
  let generated = 0
  let skipped = 0
  let failed = 0

  for (const file of narrationFiles) {
    const script = await loadScript(file)
    if (ONLY && !script.id.includes(ONLY)) continue

    for (const lang of LANGS) {
      const outDir = join(OUT_ROOT, lang, script.id)
      for (const section of script.sections) {
        for (const line of section.lines) {
          const out = join(outDir, `${line.id}.mp3`)
          if (existsSync(out)) {
            skipped++
            continue
          }
          const text = lang === 'zh' ? line.text.zh : (line.text.en ?? line.text.zh)
          if (!text) continue
          if (calls >= MAX) {
            console.log(`--max ${MAX} reached; stopping (re-run to continue)`)
            process.exit(0)
          }

          mkdirSync(outDir, { recursive: true })
          try {
            calls++
            const res = await client.synthesize({ uid: 'igcse-narration', text, speaker: SPEAKERS[lang], audioFormat: 'mp3' })
            const resp = await fetch(res.audioUri)
            if (!resp.ok) throw new Error(`download failed: ${resp.status}`)
            const buf = Buffer.from(await resp.arrayBuffer())
            writeFileSync(out, buf)
            generated++
            console.log(`✓ [${lang}] ${script.id}/${line.id}.mp3 (${(buf.length / 1024).toFixed(0)} KB)`)
          } catch (e) {
            failed++
            const msg = e instanceof Error ? e.message : String(e)
            console.warn(`✗ [${lang}] ${script.id}/${line.id}: ${msg.split('\n')[0]}`)
          }
          // Be gentle with the TTS service.
          await new Promise((r) => setTimeout(r, 250))
        }
      }
    }
  }

  console.log(`\ndone: generated=${generated} skipped(existing)=${skipped} failed=${failed} calls=${calls}`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
