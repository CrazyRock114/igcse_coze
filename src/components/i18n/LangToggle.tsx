import {
  ASSIST_LEVELS,
  assistLevelLabels,
  assistLevelShortLabels,
  useAssistLevel,
} from '@/lib/i18n'

/**
 * Three-position switch for the Chinese scaffolding level.
 *
 * Not a language switcher — there is no "Chinese version" of this course to switch
 * to. It controls how much support appears next to the English.
 */
export function LangToggle() {
  const [level, setLevel] = useAssistLevel()

  return (
    <div
      className="inline-flex rounded-lg border border-line bg-surface p-0.5"
      role="radiogroup"
      aria-label="Chinese support level"
    >
      {ASSIST_LEVELS.map((l) => (
        <button
          key={l}
          type="button"
          role="radio"
          aria-checked={level === l}
          onClick={() => setLevel(l)}
          title={`${assistLevelLabels[l].en} · ${assistLevelLabels[l].zh}`}
          className={
            'rounded-md px-2.5 py-1 text-xs font-medium transition-colors ' +
            (level === l
              ? 'bg-ink text-white'
              : 'text-muted hover:bg-canvas hover:text-ink-soft')
          }
        >
          {assistLevelShortLabels[l]}
        </button>
      ))}
    </div>
  )
}
