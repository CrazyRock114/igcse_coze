import type { SpermVsEggExtra, Bilingual } from '@/content/types'
import { T } from '@/components/i18n/T'
import { SPERM_VS_EGG } from '@/lib/lessonExtrasStrings'
import { assetUrl } from '@/lib/assetUrl'

/**
 * The human sperm and egg, side by side.
 *
 * Two real G8 figures (B11.04 egg, B11.05 sperm) above a comparison
 * table. The table rows are the syllabus-defined differences: size,
 * motility, cytoplasm, food store, acrosome, numbers. Each row states
 * the difference in the same sentence — left says what the sperm has,
 * right says what the egg has, with the feature as the row title.
 *
 * The point of the layout is the comparison. A bullet list would not
 * make the asymmetry as obvious; the side-by-side table makes it
 * impossible to miss that the gamete roles are completely different.
 */
export function SpermVsEgg({ extra }: { extra: SpermVsEggExtra }) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <FigureCard
          image={assetUrl(extra.spermImage)}
          imageSource={extra.spermImageSource}
          heading={SPERM_VS_EGG.spermHeading}
          altText="A human sperm cell, showing the head, midpiece and tail"
        />
        <FigureCard
          image={assetUrl(extra.eggImage)}
          imageSource={extra.eggImageSource}
          heading={SPERM_VS_EGG.eggHeading}
          altText="A human egg cell, surrounded by a few sperm"
        />
      </div>

      <div className="overflow-hidden rounded-lg border border-line bg-surface">
        <table className="w-full text-sm">
          <thead className="border-b border-line bg-canvas text-xs uppercase tracking-wide text-muted">
            <tr>
              <th className="px-3 py-2 text-left font-semibold">
                <T value={SPERM_VS_EGG.featureLabel} />
              </th>
              <th className="px-3 py-2 text-left font-semibold">
                <T value={SPERM_VS_EGG.spermHeading} />
              </th>
              <th className="px-3 py-2 text-left font-semibold">
                <T value={SPERM_VS_EGG.eggHeading} />
              </th>
            </tr>
          </thead>
          <tbody>
            {extra.rows.map((row) => (
              <tr key={row.id} className="border-b border-line last:border-0 align-top">
                <td className="px-3 py-3 text-ink">
                  <T value={row.feature} />
                </td>
                <td className="px-3 py-3 text-ink-soft">
                  <T value={row.sperm} />
                </td>
                <td className="px-3 py-3 text-ink-soft">
                  <T value={row.egg} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function FigureCard({
  image,
  imageSource,
  heading,
  altText,
}: {
  image: string
  imageSource: Bilingual
  heading: Bilingual
  altText: string
}) {
  return (
    <figure className="overflow-hidden rounded-lg border border-line bg-surface">
      <div className="bg-canvas">
        <img
          src={image}
          alt={altText}
          className="block w-full"
          loading="lazy"
        />
      </div>
      <figcaption className="border-t border-line bg-surface px-3 py-2">
        <div className="text-base font-semibold text-ink">
          <T value={heading} />
        </div>
        <div className="mt-0.5 text-[10px] text-muted">
          <T value={imageSource} />
        </div>
      </figcaption>
    </figure>
  )
}
