import { T } from '@/components/i18n/T'
import type { SmokingEffectsExtra, SmokingEffectEntry } from '@/content/types'
import { SMOKING_EFFECTS } from '@/lib/lessonExtrasStrings'
import { assetUrl } from '@/lib/assetUrl'

/**
 * The harm smoking does, in two halves.
 *
 * The G8 chapter on smoking (B8) breaks the harm into two stages: what is
 * actually in cigarette smoke, and what those substances do once they reach
 * the body. The first half uses G8 Figure B8.07 (cigarette with four arrows
 * pointing at the harm each substance causes) as a hero image, then four
 * substance cards underneath — nicotine, tar, carbon monoxide, particulates.
 *
 * The second half is the disease cards: chronic bronchitis, emphysema, lung
 * cancer, coronary heart disease. Each card carries a real figure from the
 * G8 PDF, the mechanism (what the substance did to cause the disease), and
 * the clinical picture (what the disease actually looks like).
 */
export function SmokingEffects({ extra }: { extra: SmokingEffectsExtra }) {
  return (
    <div className="space-y-6">
      {extra.heroImage && (
        <figure className="overflow-hidden rounded-lg border border-line bg-surface">
          <img
            src={assetUrl(extra.heroImage)}
            alt={SMOKING_EFFECTS.heroAlt.en}
            className="block w-full bg-canvas"
            loading="lazy"
          />
          {extra.heroImageSource && (
            <figcaption className="border-t border-line bg-canvas px-3 py-1 text-[10px] text-muted">
              <T value={extra.heroImageSource} />
            </figcaption>
          )}
        </figure>
      )}

      <section>
        <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted">
          <T value={SMOKING_EFFECTS.substancesHeading} />
        </h3>
        <p className="mb-3 text-xs text-ink-soft">
          <T value={SMOKING_EFFECTS.substancesIntro} />
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {extra.substances.map((s) => (
            <EffectCard key={s.id} entry={s} />
          ))}
        </div>
      </section>

      <section>
        <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted">
          <T value={SMOKING_EFFECTS.diseasesHeading} />
        </h3>
        <p className="mb-3 text-xs text-ink-soft">
          <T value={SMOKING_EFFECTS.diseasesIntro} />
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {extra.diseases.map((d) => (
            <EffectCard key={d.id} entry={d} />
          ))}
        </div>
      </section>

      {extra.evidence && (
        <section>
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted">
            <T value={SMOKING_EFFECTS.evidenceHeading} />
          </h3>
          <figure className="overflow-hidden rounded-lg border border-line bg-surface">
            <img
              src={assetUrl(extra.evidence.image)}
              alt={SMOKING_EFFECTS.evidenceHeading.en}
              className="block w-full bg-canvas"
              loading="lazy"
            />
            {extra.evidence.imageSource && (
              <figcaption className="border-t border-line bg-canvas px-3 py-1 text-[10px] text-muted">
                <T value={extra.evidence.imageSource} />
              </figcaption>
            )}
            <figcaption className="space-y-2 border-t border-line bg-canvas px-3 py-3 text-xs text-ink-soft">
              <p className="leading-relaxed">
                <T value={SMOKING_EFFECTS.evidenceBody} />
              </p>
              <p className="leading-relaxed text-ink">
                <T value={SMOKING_EFFECTS.evidenceLag} />
              </p>
            </figcaption>
          </figure>
        </section>
      )}
    </div>
  )
}

function EffectCard({ entry }: { entry: SmokingEffectEntry }) {
  return (
    <article
      className="overflow-hidden rounded-lg border border-line bg-surface"
      data-smoking-id={entry.id}
    >
      <figure className="m-0">
        <img
          src={assetUrl(entry.image)}
          alt={entry.term.en}
          className="h-40 w-full bg-canvas object-contain"
          loading="lazy"
        />
        <figcaption className="border-b border-line bg-canvas px-3 py-1 text-[10px] text-muted">
          <T value={entry.imageSource} />
        </figcaption>
      </figure>

      <div className="p-3">
        <h4 className="text-base font-semibold text-ink">
          <T value={entry.term} />
        </h4>

        <div className="mt-2 space-y-2">
          <div>
            <h5 className="text-[10px] font-semibold uppercase tracking-wide text-muted">
              <T value={SMOKING_EFFECTS.mechanismLabel} />
            </h5>
            <p className="text-sm leading-relaxed text-ink-soft">
              <T value={entry.mechanism} />
            </p>
          </div>
          <div>
            <h5 className="text-[10px] font-semibold uppercase tracking-wide text-muted">
              <T value={SMOKING_EFFECTS.clinicalLabel} />
            </h5>
            <p className="text-sm leading-relaxed text-ink-soft">
              <T value={entry.clinical} />
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
