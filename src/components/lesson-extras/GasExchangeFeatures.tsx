import { T } from '@/components/i18n/T'
import type { GasExchangeFeaturesExtra } from '@/content/types'
import { GAS_EXCHANGE_FEATURES } from '@/lib/lessonExtrasStrings'
import { assetUrl } from '@/lib/assetUrl'

/**
 * The four features that make the alveolus an efficient gas-exchange
 * surface, one card each.
 *
 * Modelled on `BloodComponents` (the per-card visual is the same: image
 * at the top, term, function, "what it looks like" — though for these
 * "features" rather than "components", the second paragraph is "why
 * this matters" rather than "appearance").
 */
export function GasExchangeFeatures({ extra }: { extra: GasExchangeFeaturesExtra }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {extra.features.map((f) => (
        <article
          key={f.id}
          data-feature-id={f.id}
          className="overflow-hidden rounded-lg border border-line bg-surface"
        >
          <figure className="m-0">
            <img
              src={assetUrl(f.image)}
              alt={f.term.en}
              className="h-44 w-full bg-canvas object-contain"
              loading="lazy"
            />
            <figcaption className="border-b border-line bg-canvas px-3 py-1 text-[10px] text-muted">
              <T value={f.imageSource} />
            </figcaption>
          </figure>

          <div className="p-3">
            <h3 className="text-base font-semibold text-ink">
              <T value={f.term} />
            </h3>

            <div className="mt-2 space-y-2">
              <div>
                <h4 className="text-[10px] font-semibold uppercase tracking-wide text-muted">
                  <T value={GAS_EXCHANGE_FEATURES.featureLabel} />
                </h4>
                <p className="text-sm leading-relaxed text-ink-soft">
                  <T value={f.mechanism} />
                </p>
              </div>
              <div>
                <h4 className="text-[10px] font-semibold uppercase tracking-wide text-muted">
                  <T value={GAS_EXCHANGE_FEATURES.whyLabel} />
                </h4>
                <p className="text-sm leading-relaxed text-ink-soft">
                  <T value={f.clinical} />
                </p>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}
