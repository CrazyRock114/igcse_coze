import { useId, useState } from 'react'
import type { Term as TermData } from '@/content/types'
import { useAssistLevel } from '@/lib/i18n'

interface TermProps {
  term: TermData
}

/**
 * A syllabus term rendered in English with its Chinese gloss available.
 *
 * This is the main vehicle for Chinese scaffolding. Unlike ordinary prose, terms
 * show their gloss even at assist level `off` when the student explicitly clicks —
 * students need the vocabulary bridge in exam-prep mode too, they just should not
 * have it thrust at them while reading.
 */
export function Term({ term }: TermProps) {
  const [level] = useAssistLevel()
  const [open, setOpen] = useState(false)
  const panelId = useId()

  const showGlossAlways = level === 'inline'

  return (
    <span className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={panelId}
        className="cursor-help border-b border-dotted border-teal-600 font-medium text-teal-800 hover:bg-teal-50"
        title={level === 'hover' ? term.zh : undefined}
      >
        {term.en}
        {showGlossAlways && (
          <span className="zh-scaffold ml-1" lang="zh-CN">
            （{term.zh}）
          </span>
        )}
      </button>

      {open && (
        <span
          id={panelId}
          role="tooltip"
          className="absolute top-full left-0 z-20 mt-1 block w-72 rounded-lg border border-line bg-surface p-3 text-sm shadow-lg"
        >
          <span className="block font-semibold">{term.en}</span>
          <span className="zh-scaffold block" lang="zh-CN">
            {term.zh}
          </span>
          <span className="mt-2 block text-ink-soft">{term.definition.en}</span>
          {term.definition.zh && (
            <span className="zh-scaffold mt-1 block" lang="zh-CN">
              {term.definition.zh}
            </span>
          )}
        </span>
      )}
    </span>
  )
}
