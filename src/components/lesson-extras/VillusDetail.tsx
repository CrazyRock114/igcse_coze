import { useState } from 'react'
import type { VillusDetailExtra } from '@/content/types'
import { T } from '@/components/i18n/T'
import { assetUrl } from '@/lib/assetUrl'

/**
 * A cross-section of a single villus, with the named structures and where each
 * nutrient goes after absorption.
 *
 * v2: replaces the earlier hand-drawn SVG with the real G8 Science figure
 * (B5.09). The image is the centrepiece; the click-to-learn interaction is
 * via a row of label-buttons beneath the image, so the textbook illustration
 * stays clean and unaltered.
 */
export function VillusDetail({ extra }: { extra: VillusDetailExtra }) {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  return (
    <div className="space-y-4">
      <figure className="m-0 overflow-hidden rounded-lg border border-line bg-canvas">
        <img
          src={assetUrl('/figures/g8/7-1-nutrition/figure-b5-09.png')}
          alt="Longitudinal section through a villus"
          className="h-auto w-full"
          loading="lazy"
        />
        <figcaption className="border-t border-line bg-canvas px-3 py-1.5 text-[11px] text-muted">
          G8 Science · p.16, Figure B5.09 · labelled cross-section of a single villus
        </figcaption>
      </figure>

      <div className="grid gap-2 sm:grid-cols-2">
        {extra.parts.map((p) => {
          const active = p.id === selectedId
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => setSelectedId((cur) => (cur === p.id ? null : p.id))}
              data-part={p.id}
              aria-pressed={active}
              className={
                'rounded-md border px-3 py-2 text-left text-sm transition-colors ' +
                (active
                  ? 'border-teal-600 bg-teal-50 text-ink'
                  : 'border-line bg-surface text-ink-soft hover:border-teal-500')
              }
            >
              <span className="block font-medium">
                <T value={p.name} />
              </span>
              {active && (
                <span className="mt-1 block text-xs leading-relaxed text-ink-soft">
                  <T value={p.description} />
                </span>
              )}
            </button>
          )
        })}
      </div>

      <TransportTable transport={extra.transport} />

      {extra.parts.some((p) => p.id === 'microvilli') && (
        <figure className="m-0 overflow-hidden rounded-lg border border-line bg-canvas">
          <img
            src={assetUrl('/figures/g8/7-1-nutrition/figure-b5-10.png')}
            alt="Detail of the surface of a villus — microvilli on each epithelial cell"
            className="h-auto w-full"
            loading="lazy"
          />
          <figcaption className="border-t border-line bg-canvas px-3 py-1.5 text-[11px] text-muted">
            G8 Science · p.17, Figure B5.10 · microvilli on the surface of a single epithelial cell
          </figcaption>
        </figure>
      )}
    </div>
  )
}

function TransportTable({ transport }: { transport: VillusDetailExtra['transport'] }) {
  return (
    <div>
      <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
        Where each nutrient goes
      </h4>
      <div className="overflow-x-auto rounded-lg border border-line">
        <table className="w-full text-sm">
          <tbody>
            {transport.map((t) => (
              <tr key={t.id} data-transport-id={t.id} className="border-t border-line first:border-t-0">
                <td className="bg-surface px-3 py-1.5 font-medium text-ink-soft">
                  <T value={t.name} />
                </td>
                <td className="bg-canvas px-3 py-1.5 text-ink-soft">
                  <T value={t.destination} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
