import type { ReadoutSpec } from '@/content/types'
import { T } from '@/components/i18n/T'
import { formatExact, formatSigFigs } from '@/lib/units'

interface ReadoutPanelProps {
  readouts: ReadoutSpec[]
  values: Record<string, number>
}

/**
 * Derived quantities, quoted to the significant figures the spec asks for.
 *
 * These are the numbers a student would be asked to calculate, so they are shown
 * with the same precision discipline the exam expects rather than raw floats.
 */
export function ReadoutPanel({ readouts, values }: ReadoutPanelProps) {
  return (
    <dl className="grid grid-cols-2 gap-3">
      {readouts.map((r) => (
        <div key={r.key} className="rounded-lg border border-line bg-canvas px-3 py-2">
          <dt className="text-xs text-muted">
            <T value={r.label} />
            {r.symbol && <span className="ml-1 font-mono">{r.symbol}</span>}
          </dt>
          <dd className="mt-0.5 font-mono text-lg tabular-nums text-ink">
            {r.exact
              ? formatExact(values[r.key] ?? 0)
              : formatSigFigs(values[r.key] ?? 0, r.sigFigs)}
            <span className="ml-1 text-xs font-normal text-muted">{r.unit}</span>
          </dd>
        </div>
      ))}
    </dl>
  )
}
