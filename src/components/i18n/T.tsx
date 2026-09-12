import type { ElementType, ReactNode } from 'react'
import type { Bilingual } from '@/content/types'
import { useAssistLevel } from '@/lib/i18n'

/**
 * Above this length a value is prose, not a label.
 *
 * A dotted underline across several lines of a paragraph looks like a rendering fault, so
 * prose gets the `中` marker and the panel without the rule. Short labels get both.
 */
const HOVER_UNDERLINE_MAX_CHARS = 48

interface TProps {
  value: Bilingual
  /** Element to render as. Defaults to a fragment-ish <span>. */
  as?: ElementType
  className?: string
  /** Class applied to the Chinese scaffold block in `inline` mode. */
  zhClassName?: string
  /**
   * Optional template variables, replaced into `{name}` placeholders in both
   * the English and Chinese strings. Used for count-bearing messages like
   * "5 lessons in this chapter" or "12 attempts".
   */
  params?: Record<string, string | number>
}

/** Substitute `{name}` placeholders with values from `params`. */
function interpolate(template: string, params?: Record<string, string | number>): string {
  if (!params) return template
  return template.replace(/\{(\w+)\}/g, (match, name: string) => {
    if (name in params) return String(params[name])
    return match
  })
}

/**
 * Renders a bilingual value according to the current assist level.
 *
 * - `off`    → English only
 * - `hover`  → English, with Chinese in a `title` tooltip and an underline hint
 * - `inline` → English, with Chinese rendered underneath
 *
 * English is always in the DOM, so search, copy-paste and screen readers get the
 * exam language regardless of the setting.
 */
export function T({ value, as: As = 'span', className, zhClassName, params }: TProps): ReactNode {
  const [level] = useAssistLevel()
  const hasZh = Boolean(value.zh)
  // Cast through `React.HTMLAttributes<HTMLElement>` to dodge a polymorphic
  // `as: ElementType` + `verbatimModuleSyntax` interaction that, with
  // `@types/react` 19.2+, infers `<As>`'s `children` as `never` and rejects
  // every child we pass. The runtime behaviour is unchanged: `As` is still
  // whatever the caller picked. `React.HTMLAttributes<HTMLElement>` already
  // permits `undefined` per prop, which the `exactOptionalPropertyTypes`
  // flag demands we acknowledge.
  const AsAny = As as React.ComponentType<React.HTMLAttributes<HTMLElement>>

  if (level === 'inline' && hasZh) {
    return (
      <AsAny className={className}>
        <span>{interpolate(value.en, params)}</span>
        <span className={zhClassName ?? 'zh-scaffold mt-0.5 block'} lang="zh-CN">
          {interpolate(value.zh!, params)}
        </span>
      </AsAny>
    )
  }

  if (level === 'hover' && hasZh) {
    // Every scaffolded item carries the `中` marker, so this level is visibly different
    // from English-only even on a page that is mostly prose. Short labels additionally
    // get a dotted underline; see HOVER_UNDERLINE_MAX_CHARS for why prose does not.
    const underlined = value.en.length <= HOVER_UNDERLINE_MAX_CHARS
    return (
      <AsAny
        className={`zh-hint ${className ?? ''}`}
        data-zh={value.zh}
        // Deliberately not focusable. Making every scaffolded span a tab stop would put
        // 138 of them before the controls on a syllabus page. Keyboard and touch users are
        // served by the `inline` level, which shows the Chinese without any interaction —
        // and where `T` renders as a link or button the panel still opens on focus.
        style={
          underlined
            ? { textDecoration: 'underline dotted', textUnderlineOffset: '0.25em' }
            : undefined
        }
      >
        {interpolate(value.en, params)}
      </AsAny>
    )
  }

  return <AsAny className={className}>{interpolate(value.en, params)}</AsAny>
}

/**
 * Same rules as `T`, but returns plain strings — for `alt`, `aria-label`, `title`
 * and other places where JSX is not allowed.
 */
export function useBilingualText(value: Bilingual): string {
  const [level] = useAssistLevel()
  if (level === 'inline' && value.zh) return `${value.en} — ${value.zh}`
  return value.en
}
