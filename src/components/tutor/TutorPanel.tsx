import { useRef, useState } from 'react'
import { T } from '@/components/i18n/T'
import type { Question } from '@/content/types'
import { TUTOR } from '@/lib/tutorStrings'

type Mode = 'explain' | 'mark'
type Lang = 'en' | 'zh'

/**
 * Streaming AI tutor panel.
 *
 * Consumes the POST /api/tutor SSE endpoint with fetch + ReadableStream and
 * renders the reply with a typewriter effect — the panel fills as tokens
 * arrive, it never waits for the full answer.
 */
export function TutorPanel({
  mode,
  question,
  onClose,
}: {
  mode: Mode
  question: Question
  onClose: () => void
}) {
  const [lang, setLang] = useState<Lang>('en')
  const [text, setText] = useState('')
  const [streaming, setStreaming] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [studentAnswer, setStudentAnswer] = useState('')
  const startedRef = useRef(false)

  async function run() {
    if (streaming) return
    setStreaming(true)
    setError(null)
    setText('')
    startedRef.current = true
    try {
      const res = await fetch('/api/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode,
          lang,
          studentAnswer: studentAnswer || undefined,
          question: {
            stem: question.stem,
            options: question.options,
            answerIndex: question.answerIndex,
            markScheme: question.markScheme,
            marks: question.marks,
            commandWord: question.commandWord,
            tier: question.tier,
          },
        }),
      })
      if (!res.ok || !res.body) throw new Error(`HTTP ${res.status}`)

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''
      let failed: string | null = null

      for (;;) {
        const { value, done } = await reader.read()
        if (done) break
        buffer += decoder.decode(value, { stream: true })
        const frames = buffer.split('\n\n')
        buffer = frames.pop() ?? ''
        for (const frame of frames) {
          const line = frame.trim()
          if (!line.startsWith('data:')) continue
          const payload = line.slice(5).trim()
          if (payload === '[DONE]') continue
          try {
            const evt = JSON.parse(payload) as { content?: string; error?: string }
            if (evt.error) failed = evt.error
            else if (evt.content) setText((prev) => prev + evt.content)
          } catch {
            // keep-alive or partial frame — ignore
          }
        }
      }
      if (failed) setError(failed)
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e))
    } finally {
      setStreaming(false)
    }
  }

  const hasText = text.length > 0

  return (
    <div className="mt-3 rounded-xl border border-accent/30 bg-accent/5 p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-semibold text-accent">
          {mode === 'mark' ? '🧑‍🏫 ' : '✨ '}
          <T value={mode === 'mark' ? TUTOR.askMark : TUTOR.askExplain} />
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setLang(lang === 'en' ? 'zh' : 'en')}
            className="rounded-md border border-line px-2 py-0.5 text-xs text-ink/70 hover:bg-white/10"
          >
            <T value={TUTOR.langToggle} />
          </button>
          <button type="button" onClick={onClose} className="text-xs text-ink/50 underline hover:text-ink">
            <T value={TUTOR.close} />
          </button>
        </div>
      </div>

      {mode === 'mark' && (
        <label className="mt-3 block text-sm text-ink/80">
          <T value={TUTOR.yourAnswerLabel} />:
          <textarea
            value={studentAnswer}
            onChange={(e) => setStudentAnswer(e.target.value)}
            placeholder={TUTOR.yourAnswerPlaceholder.en}
            rows={3}
            className="mt-1 w-full rounded-lg border border-line bg-white/5 px-3 py-2 text-sm text-ink placeholder:text-ink/30 focus:border-accent focus:outline-none"
          />
        </label>
      )}

      {!hasText && !streaming && !error && (
        <button
          type="button"
          onClick={run}
          disabled={mode === 'mark' && studentAnswer.trim().length === 0}
          className="mt-3 rounded-md bg-accent px-4 py-1.5 text-sm font-medium text-white hover:opacity-90 disabled:opacity-40"
        >
          {mode === 'mark' ? <T value={TUTOR.askMark} /> : <T value={TUTOR.askExplain} />}
        </button>
      )}

      {streaming && (
        <p className="mt-3 animate-pulse text-xs text-ink/60" data-zh>
          <T value={TUTOR.thinking} />
        </p>
      )}

      {hasText && (
        <div className="mt-3 whitespace-pre-wrap rounded-lg bg-surface p-3 text-sm leading-relaxed text-ink">
          {text}
          {streaming && <span className="ml-0.5 inline-block h-4 w-1.5 animate-pulse bg-accent align-middle" />}
        </div>
      )}

      {error && (
        <p className="mt-3 text-sm text-rose-500">
          <T value={TUTOR.failed} />
          <button type="button" onClick={run} className="ml-2 underline hover:no-underline">
            <T value={TUTOR.retry} />
          </button>
        </p>
      )}

      {(hasText || streaming) && (
        <p className="mt-2 text-xs text-ink/40" data-zh>
          <T value={TUTOR.disclaimer} />
        </p>
      )}
    </div>
  )
}
