import { useCallback, useEffect, useRef, useState } from 'react'
import type { NarrationScript } from '@/content/types'
import { T } from '@/components/i18n/T'
import { useAssistLevel } from '@/lib/i18n'

interface NarrationPlayerProps {
  script: NarrationScript
  /** Lets a narration line drive the simulation, so speech and graph stay in step. */
  onAction?: (params: Record<string, number>) => void
}

type Lang = 'en' | 'zh'

/**
 * Steps through the narration, optionally speaking it.
 *
 * Audio strategy, three levels of fallback (the approach SynthoMing uses):
 *   1. pre-generated mp3 at /audio/<lang>/<script>/<line>.mp3
 *   2. the browser's speech synthesis
 *   3. text only
 *
 * No audio has been generated yet, so in practice this runs on level 2 or 3 today.
 * The transcript is always on screen, so the lesson works with sound off.
 */
export function NarrationPlayer({ script, onAction }: NarrationPlayerProps) {
  const [assist] = useAssistLevel()
  const [sectionIdx, setSectionIdx] = useState(0)
  const [lineIdx, setLineIdx] = useState(0)
  const [speaking, setSpeaking] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Chinese narration only makes sense when the student has asked for Chinese support.
  const lang: Lang = assist === 'off' ? 'en' : 'zh'

  const section = script.sections[sectionIdx]
  const line = section?.lines[lineIdx]

  const stop = useCallback(() => {
    audioRef.current?.pause()
    audioRef.current = null
    if (typeof speechSynthesis !== 'undefined') speechSynthesis.cancel()
    setSpeaking(false)
  }, [])

  // Never leave audio playing when the student navigates away.
  useEffect(() => stop, [stop])

  const speak = useCallback(() => {
    if (!line) return
    stop()

    const text = (lang === 'zh' ? line.text.zh : line.text.en) ?? line.text.en
    const src = `/audio/${lang}/${script.id}/${line.id}.mp3`

    const audio = new Audio(src)
    audio.onended = () => setSpeaking(false)
    audio.onerror = () => {
      // No pre-generated file — fall back to the browser voice.
      if (typeof speechSynthesis === 'undefined') {
        setSpeaking(false)
        return
      }
      const u = new SpeechSynthesisUtterance(text)
      u.lang = lang === 'zh' ? 'zh-CN' : 'en-GB'
      u.rate = 0.95
      u.onend = () => setSpeaking(false)
      speechSynthesis.speak(u)
    }

    audioRef.current = audio
    setSpeaking(true)
    void audio.play().catch(() => audio.onerror?.(new Event('error')))
  }, [line, lang, script.id, stop])

  const goTo = useCallback(
    (s: number, l: number) => {
      stop()
      setSectionIdx(s)
      setLineIdx(l)
      const target = script.sections[s]?.lines[l]
      if (target?.action?.type === 'setParams' && target.action.params) {
        onAction?.(target.action.params)
      }
    },
    [script.sections, onAction, stop]
  )

  const next = useCallback(() => {
    if (!section) return
    if (lineIdx + 1 < section.lines.length) return goTo(sectionIdx, lineIdx + 1)
    if (sectionIdx + 1 < script.sections.length) return goTo(sectionIdx + 1, 0)
  }, [section, lineIdx, sectionIdx, script.sections.length, goTo])

  const prev = useCallback(() => {
    if (lineIdx > 0) return goTo(sectionIdx, lineIdx - 1)
    if (sectionIdx > 0) {
      const prevSection = script.sections[sectionIdx - 1]
      return goTo(sectionIdx - 1, (prevSection?.lines.length ?? 1) - 1)
    }
  }, [lineIdx, sectionIdx, script.sections, goTo])

  if (!section || !line) return null

  const isFirst = sectionIdx === 0 && lineIdx === 0
  const isLast =
    sectionIdx === script.sections.length - 1 && lineIdx === section.lines.length - 1

  return (
    <div className="rounded-xl border border-line bg-surface p-4">
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <h3 className="text-sm font-semibold text-ink">
          <T value={section.title} />
        </h3>
        <span className="ml-auto text-xs text-muted">
          {sectionIdx + 1} / {script.sections.length}
        </span>
      </div>

      <p className="text-sm leading-relaxed text-ink-soft">{line.text.en}</p>
      {assist !== 'off' && line.text.zh && (
        <p className="zh-scaffold mt-2" lang="zh-CN">
          {line.text.zh}
        </p>
      )}

      <div className="mt-3 flex items-center gap-2">
        <button
          type="button"
          onClick={prev}
          disabled={isFirst}
          className="rounded-lg border border-line px-3 py-1.5 text-sm hover:bg-canvas disabled:opacity-40"
        >
          ‹ Back
        </button>
        {/* Stepping through the transcript is the real experience until recorded audio
            exists; today "read aloud" is the device's own synthesiser and sounds like it.
            So Next is the primary action and speech is offered as a labelled extra, rather
            than a filled Play button implying a produced voice track. */}
        <button
          type="button"
          onClick={next}
          disabled={isLast}
          className="rounded-lg bg-ink px-3 py-1.5 text-sm font-medium text-white hover:bg-ink-soft disabled:opacity-40"
        >
          Next ›
        </button>
        <button
          type="button"
          onClick={speaking ? stop : speak}
          title="Uses your device's built-in voice. Recorded narration is not yet available."
          className="rounded-lg border border-line px-3 py-1.5 text-sm text-muted hover:bg-canvas"
        >
          {speaking ? '■ Stop' : '▶ Read aloud (device voice)'}
        </button>
      </div>

      <ol className="mt-3 flex flex-wrap gap-1">
        {script.sections.map((s, i) => (
          <li key={s.id}>
            <button
              type="button"
              onClick={() => goTo(i, 0)}
              className={
                'rounded px-2 py-0.5 text-xs ' +
                (i === sectionIdx
                  ? 'bg-teal-100 font-medium text-teal-900'
                  : 'text-muted hover:bg-canvas')
              }
            >
              <T value={s.title} />
            </button>
          </li>
        ))}
      </ol>
    </div>
  )
}
