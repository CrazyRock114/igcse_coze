import { T } from '@/components/i18n/T'
import type { BloodComponentsExtra } from '@/content/types'
import { assetUrl } from '@/lib/assetUrl'

/**
 * The four components of blood as a 2×2 grid of real-figure cards.
 *
 * Re-uses the `DiseaseCardEntry` shape (image + term + mechanism + clinical)
 * even though these are *components*, not diseases — the per-card visual is
 * the same: a real figure from the G8 PDF, one paragraph of function, and a
 * paragraph of "what it looks like" (which here is "what you see down a
 * microscope" or "where it lives in the body").
 *
 * No `severity` border colour — blood components are not more or less
 * severe than each other, so the default neutral border is correct.
 */
export function BloodComponents({ extra }: { extra: BloodComponentsExtra }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {extra.cards.map((c) => (
        <article
          key={c.id}
          data-component-id={c.id}
          className="overflow-hidden rounded-lg border border-line bg-surface"
        >
          <figure className="m-0">
            <img
              src={assetUrl(c.image)}
              alt={c.term.en}
              className="h-44 w-full bg-canvas object-contain"
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
                  Function
                </h4>
                <p className="text-sm leading-relaxed text-ink-soft">
                  <T value={c.mechanism} />
                </p>
              </div>
              <div>
                <h4 className="text-[10px] font-semibold uppercase tracking-wide text-muted">
                  Appearance / location
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
