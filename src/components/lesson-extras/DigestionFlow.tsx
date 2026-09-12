import { useState } from 'react'
import type { DigestionFlowExtra } from '@/content/types'
import { T } from '@/components/i18n/T'
import { DIGESTION_FLOW } from '@/lib/lessonExtrasStrings'
import { assetUrl } from '@/lib/assetUrl'

/**
 * The whole-journey picture + the six formal syllabus terms.
 *
 * The textbook figure (G8 Figure B5.02, the fox) is the centrepiece: a real
 * illustration with the four labelled stages drawn in. Below it: the
 * ordered pipeline the food actually passes through, then a togglable card
 * grid of the six definition terms the syllabus wants remembered.
 */
export function DigestionFlow({ extra }: { extra: DigestionFlowExtra }) {
  const [openId, setOpenId] = useState<string | null>(null)
  return (
    <div className="space-y-4">
      <figure className="m-0 overflow-hidden rounded-lg border border-line bg-canvas">
        <img
          src={assetUrl('/figures/g8/7-1-nutrition/figure-b5-02.png')}
          alt="How an animal deals with food — a mammal's four-stage food journey"
          className="h-auto w-full"
          loading="lazy"
        />
        <figcaption className="border-t border-line bg-canvas px-3 py-1.5 text-[11px] text-muted">
          G8 Science · p.11, Figure B5.02 · ingestion → digestion → absorption → egestion
        </figcaption>
      </figure>

      <Flow stages={extra.stages} />

      <div>
        <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
          The six terms the syllabus uses
        </h4>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {extra.definitions.map((d) => (
            <DefCard
              key={d.id}
              id={d.id}
              term={d.term}
              definition={d.definition}
              open={openId === d.id}
              onToggle={() => setOpenId((cur) => (cur === d.id ? null : d.id))}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Flow row
// ---------------------------------------------------------------------------

/**
 * Horizontal flow of stages, drawn as boxes connected by arrows. The boxes
 * are sized by content; on narrow screens they wrap rather than shrink, so
 * the arrow direction stays readable. Selecting a stage is left to the
 * definitions grid below — the flow is a picture, not an input.
 */
function Flow({ stages }: { stages: DigestionFlowExtra['stages'] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-line bg-canvas p-3">
      <div className="flex min-w-fit items-stretch gap-0">
        {stages.map((s, i) => (
          <div key={s.id} className="flex items-stretch">
            <div className="flex w-32 flex-col justify-between rounded-md border border-line bg-surface p-2 text-center">
              <span className="text-[10px] font-mono text-muted">{i + 1}</span>
              <span className="text-sm font-semibold text-ink">
                <T value={s.label} />
              </span>
              <span className="text-[10px] text-ink-soft">
                <T value={s.summary} />
              </span>
            </div>
            {i < stages.length - 1 && (
              <div className="flex w-6 items-center justify-center text-muted" aria-hidden="true">
                →
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Definition card
// ---------------------------------------------------------------------------

function DefCard({
  id,
  term,
  definition,
  open,
  onToggle,
}: {
  id: string
  term: DigestionFlowExtra['definitions'][number]['term']
  definition: DigestionFlowExtra['definitions'][number]['definition']
  open: boolean
  onToggle: () => void
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      data-def-id={id}
      className={
        'rounded-lg border p-3 text-left transition-colors ' +
        (open
          ? 'border-teal-600 bg-teal-50'
          : 'border-line bg-surface hover:border-ink-soft hover:bg-canvas')
      }
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-semibold text-ink">
          <T value={term} />
        </span>
        <span className="text-xs text-muted">
          <T value={open ? DIGESTION_FLOW.collapse : DIGESTION_FLOW.reveal} />
        </span>
      </div>
      {open && (
        <p className="mt-1.5 text-xs leading-relaxed text-ink-soft">
          <T value={definition} />
        </p>
      )}
    </button>
  )
}
