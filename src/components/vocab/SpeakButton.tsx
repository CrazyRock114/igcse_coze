/**
 * TTS (text-to-speech) button.
 *
 * Uses the browser's built-in `SpeechSynthesis` API. Free, no network,
 * no model to ship. Picks the first English voice from the system, or
 * falls back to the default voice.
 *
 * The button is intentionally small — a "🔊" chip. The full audio
 * affordance is "click to hear it"; we don't auto-play on render, and
 * we don't keep a long-lived utterance alive (browsers cancel speech
 * on navigation, which we want).
 */

import { useCallback, useState } from 'react'

export function SpeakButton({
  text,
  lang = 'en-GB',
  className = '',
}: {
  text: string
  lang?: string
  className?: string
}) {
  const [playing, setPlaying] = useState(false)

  const speak = useCallback(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
    try {
      window.speechSynthesis.cancel()
      const u = new SpeechSynthesisUtterance(text)
      u.lang = lang
      u.rate = 0.9
      const voices = window.speechSynthesis.getVoices()
      const prefer = voices.find((v) => v.lang === lang) ?? voices.find((v) => v.lang?.startsWith('en')) ?? null
      if (prefer) u.voice = prefer
      u.onend = () => setPlaying(false)
      u.onerror = () => setPlaying(false)
      setPlaying(true)
      window.speechSynthesis.speak(u)
    } catch {
      setPlaying(false)
    }
  }, [text, lang])

  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return null
  }

  return (
    <button
      type="button"
      onClick={speak}
      className={
        'inline-flex h-8 w-8 items-center justify-center rounded-full border border-line bg-canvas text-base text-ink-soft transition-colors hover:border-teal-500 hover:text-teal-700 ' +
        (playing ? 'border-teal-500 text-teal-700' : '') +
        ' ' +
        className
      }
      aria-label="Hear pronunciation"
      title="Hear pronunciation"
    >
      {playing ? '🔊' : '🔈'}
    </button>
  )
}
