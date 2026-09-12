import { useState } from 'react'
import type { FertilisationJourneyExtra, Bilingual } from '@/content/types'
import { T } from '@/components/i18n/T'
import { FERTILISATION_JOURNEY } from '@/lib/lessonExtrasStrings'
import { assetUrl } from '@/lib/assetUrl'

/**
 * The journey from intercourse to implantation, in three G8 figures.
 *
 * - Step 1 (G8 B11.06): how sperm get to the egg — the long swim up
 *   the female tract.
 * - Step 2 (G8 B11.07): fertilisation — the sperm reaches the egg, the
 *   acrosome releases enzymes, the nuclei fuse.
 * - Step 3 (G8 B11.08): implantation — the embryo embeds in the
 *   uterus lining.
 *
 * All three figures are stacked, but only the active one is at full
 * opacity; the others fade to grey. The side panel describes the
 * current step. The numbered stepper across the top also lets you jump
 * to any step.
 */
export function FertilisationJourney({ extra }: { extra: FertilisationJourneyExtra }) {
  const [activeIdx, setActiveIdx] = useState(0)
  const active = extra.steps[activeIdx] ?? null

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_300px]">
      <div>
        <p className="mb-2 text-xs text-muted">
          <T value={FERTILISATION_JOURNEY.intro} />
        </p>

        <div className="mb-3 flex flex-wrap items-center gap-2">
          {extra.steps.map((s, i) => (
            <StepButton
              key={s.id}
              active={i === activeIdx}
              onClick={() => setActiveIdx(i)}
              index={i + 1}
              title={s.title}
            />
          ))}
        </div>

        <div className="space-y-2">
          {extra.steps.map((s, i) => (
            <StepFigure
              key={s.id}
              image={assetUrl(s.image)}
              imageSource={s.imageSource}
              title={s.title}
              index={i + 1}
              isActive={i === activeIdx}
              onActivate={() => setActiveIdx(i)}
            />
          ))}
        </div>
      </div>

      <aside className="rounded-lg border border-line bg-canvas p-3 text-sm">
        {active ? (
          <div>
            <div className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-muted">
              <T value={FERTILISATION_JOURNEY.stepLabel} />
              {activeIdx + 1} <T value={FERTILISATION_JOURNEY.ofLabel} /> {extra.steps.length}
            </div>
            <h3 className="mb-1 text-base font-semibold text-ink">
              <T value={active.title} />
            </h3>
            <p className="leading-relaxed text-ink-soft">
              <T value={active.body} />
            </p>
          </div>
        ) : (
          <p className="text-muted">—</p>
        )}
      </aside>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function StepButton({
  active,
  onClick,
  index,
  title,
}: {
  active: boolean
  onClick: () => void
  index: number
  title: Bilingual
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        'rounded-md px-2.5 py-1 text-xs font-medium transition-colors ' +
        (active
          ? 'bg-ink text-white'
          : 'border border-line bg-surface text-muted hover:bg-canvas hover:text-ink-soft')
      }
    >
      <span className="mr-1 font-bold">{index}.</span>
      <T value={title} />
    </button>
  )
}

function StepFigure({
  image,
  imageSource,
  title,
  index,
  isActive,
  onActivate,
}: {
  image: string
  imageSource: Bilingual
  title: Bilingual
  index: number
  isActive: boolean
  onActivate: () => void
}) {
  return (
    <figure
      onClick={onActivate}
      className={
        'm-0 cursor-pointer overflow-hidden rounded-lg border bg-surface transition-opacity ' +
        (isActive ? 'border-ink opacity-100' : 'border-line opacity-30 hover:opacity-60')
      }
    >
      <img
        src={image}
        alt={imageSource.en}
        className="block w-full"
        loading="lazy"
      />
      <figcaption className="border-t border-line bg-canvas px-3 py-1.5 text-[11px] text-muted">
        <span className="font-semibold">{index}.</span> <T value={title} /> ·{' '}
        <T value={imageSource} />
      </figcaption>
    </figure>
  )
}
