import { useTranslatorEnabled } from '@/lib/translatorEnabled'
import { TRANSLATOR_BUTTON_GLYPH } from '@/lib/translatorGlyphs'

/**
 * Header switch for the selection translator.
 *
 * Sits next to `LangToggle` and looks the same at a glance so the header
 * stays calm. The two controls do different jobs and do not conflict:
 *
 *   - `LangToggle` controls how much Chinese scaffolding the page shows
 *     alongside the English. The Chinese is *already in the content*, the
 *     toggle is just a depth switch.
 *
 *   - The translator looks up Chinese for an arbitrary English word the
 *     student does not already have a gloss for. The Chinese is *not* in
 *     the content, it is fetched on demand.
 *
 * Off by default because the existing i18n scaffolding covers most of the
 * curriculum copy already, and the translator's affordance is unnecessary
 * friction for students who do not need it.
 */
export function TranslatorToggle() {
  const [enabled, setEnabled] = useTranslatorEnabled()
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      aria-label="Selection translator"
      title={enabled ? 'Selection translator: on' : 'Selection translator: off'}
      onClick={() => setEnabled(!enabled)}
      className={
        'translator-toggle inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors ' +
        (enabled
          ? 'border-teal-600 bg-teal-50 text-teal-900'
          : 'border-line bg-surface text-muted hover:bg-canvas hover:text-ink-soft')
      }
    >
      <span aria-hidden="true" className="font-semibold">
        {TRANSLATOR_BUTTON_GLYPH}
      </span>
      <span>Translator</span>
    </button>
  )
}
