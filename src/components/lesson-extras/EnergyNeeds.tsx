import { T } from '@/components/i18n/T'
import type { EnergyNeedsExtra } from '@/content/types'

/**
 * The "how much energy do you need" table. The data is a re-presentation of
 * G8 Science Figure B5.01: a row per demographic, with their daily energy
 * need in kJ. Sorted by energy descending so the heavy users sit at the top.
 */
export function EnergyNeeds({ extra }: { extra: EnergyNeedsExtra }) {
  const sorted = [...extra.rows].sort((a, b) => b.energyKj - a.energyKj)
  const max = sorted[0]?.energyKj ?? 1

  return (
    <div>
      <div className="overflow-x-auto rounded-lg border border-line">
        <table className="w-full text-sm">
          <thead className="bg-canvas text-xs uppercase tracking-wide text-muted">
            <tr>
              <th className="px-3 py-2 text-left">Who</th>
              <th className="px-3 py-2 text-left">Activity</th>
              <th className="px-3 py-2 text-right">kJ / day</th>
              <th className="px-3 py-2 text-left">Relative</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((r, i) => (
              <tr key={i} className="border-t border-line bg-surface">
                <td className="px-3 py-1.5 font-medium text-ink-soft">
                  <T value={r.demographic} />
                </td>
                <td className="px-3 py-1.5 text-ink-soft">
                  <T value={r.activity} />
                </td>
                <td className="px-3 py-1.5 text-right font-mono text-ink">{r.energyKj.toLocaleString()}</td>
                <td className="px-3 py-1.5">
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-canvas">
                    <div
                      className="h-full rounded-full bg-teal-500"
                      style={{ width: `${(r.energyKj / max) * 100}%` }}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-[11px] text-muted">
        <T value={extra.source} />
      </p>
    </div>
  )
}
