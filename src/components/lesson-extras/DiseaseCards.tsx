import { T } from '@/components/i18n/T'
import type { DiseaseCardsExtra } from '@/content/types'
import { assetUrl } from '@/lib/assetUrl'

/**
 * A grid of disease / deficiency cards. Each card is a small clinical
 * picture (a real photograph or textbook figure) plus the mechanism, the
 * clinical picture, and the term in both languages.
 *
 * Sized for a 2-column grid on desktop, 1-column on mobile. The image is
 * cropped to a 4:3 aspect so the cards line up regardless of source.
 */
export function DiseaseCards({ extra }: { extra: DiseaseCardsExtra }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {extra.cards.map((c) => (
        <article
          key={c.id}
          data-disease-id={c.id}
          className={
            'overflow-hidden rounded-lg border bg-surface ' +
            (c.severity === 'severe'
              ? 'border-rose-300'
              : c.severity === 'lifestyle'
              ? 'border-amber-300'
              : 'border-line')
          }
        >
          <figure className="m-0">
            <img
              src={assetUrl(c.image)}
              alt={c.term.en}
              className="h-44 w-full bg-canvas object-cover"
              loading="lazy"
            />
            <figcaption className="border-b border-line bg-canvas px-3 py-1 text-[10px] text-muted">
              <T value={c.imageSource} />
            </figcaption>
          </figure>

          <div className="p-3">
            <h3 className="text-base font-semibold text-ink">
              <T value={c.term} />
            </h3>

            <div className="mt-2 space-y-2">
              <div>
                <h4 className="text-[10px] font-semibold uppercase tracking-wide text-muted">
                  How / why
                </h4>
                <p className="text-sm leading-relaxed text-ink-soft">
                  <T value={c.mechanism} />
                </p>
              </div>
              <div>
                <h4 className="text-[10px] font-semibold uppercase tracking-wide text-muted">
                  What it looks like
                </h4>
                <p className="text-sm leading-relaxed text-ink-soft">
                  <T value={c.clinical} />
                </p>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}
