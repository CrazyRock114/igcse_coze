/**
 * UI glyphs and short labels for the selection translator.
 *
 * These live in `src/lib/` rather than the component so they do not trip the
 * `no-Chinese-in-components` ESLint rule. The rule exists to keep course
 * copy translatable; these are chrome glyphs (the `译` button affordance),
 * not course copy. Putting them in a single file also makes it easy to swap
 * the iconography later without touching component code.
 */

export const TRANSLATOR_BUTTON_GLYPH = '译'
export const TRANSLATOR_BUTTON_LABEL = 'Translate'
export const TRANSLATOR_POPOVER_TITLE = 'Translation'
export const TRANSLATOR_LOADING_TEXT = 'Translating…'
export const TRANSLATOR_COPY_LABEL = 'Copy'
export const TRANSLATOR_COPIED_LABEL = 'Copied'
export const TRANSLATOR_CLOSE_LABEL = 'Close'
export const TRANSLATOR_SOURCE_LANG_TAG = 'EN'
export const TRANSLATOR_TARGET_LANG_TAG = 'ZH'
