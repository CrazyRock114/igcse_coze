import { T } from '@/components/i18n/T'
import type { RespirationCompareExtra } from '@/content/types'
import { RESPIRATION_COMPARE } from '@/lib/lessonExtrasStrings'

/**
 * Aerobic vs anaerobic respiration, side by side.
 *
 * Same shape as `BloodVesselsCompare`: a column per option with the
 * comparison rows underneath. Three word equations below the table (aerobic,
 * anaerobic in muscle, anaerobic in yeast) so the student sees the chemistry
 * rather than just the words.
 */
export function RespirationCompare({ extra }: { extra: RespirationCompareExtra }) {
  return (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-lg border border-line bg-canvas">
        <div
          className="grid min-w-[480px] text-xs"
          style={{ gridTemplateColumns: `140px repeat(2, minmax(0, 1fr))` }}
        >
          <Cell header muted>
            <T value={RESPIRATION_COMPARE.heading} />
          </Cell>
          <Cell header>
            <T value={RESPIRATION_COMPARE.aerobic} />
          </Cell>
          <Cell header>
            <T value={RESPIRATION_COMPARE.anaerobic} />
          </Cell>
          {extra.rows.map((row) => (
            <Row key={row.id} label={row.label}>
              <Cell>
                <T value={row.aerobic} />
              </Cell>
              <Cell>
                <T value={row.anaerobic} />
              </Cell>
            </Row>
          ))}
        </div>
      </div>

      <div>
        <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
          <T value={RESPIRATION_COMPARE.equationsHeading} />
        </h4>
        <div className="grid gap-2 sm:grid-cols-3">
          {extra.equations.map((eq) => (
            <EquationCard key={eq.id} eq={eq} />
          ))}
        </div>
      </div>

      <p className="text-[11px] text-muted">
        <T value={extra.source} />
      </p>
    </div>
  )
}

function Row({ label, children }: { label: { en: string; zh?: string }; children: React.ReactNode }) {
  return (
    <>
      <Cell muted>
        <T value={label} />
      </Cell>
      {children}
    </>
  )
}

function Cell({
  children,
  header,
  muted,
}: {
  children: React.ReactNode
  header?: boolean
  muted?: boolean
}) {
  return (
    <div
      className={
        'border-b border-line px-3 py-2 last:border-b-0 ' +
        (header
          ? 'bg-surface font-semibold text-ink'
          : muted
          ? 'bg-canvas text-muted'
          : 'text-ink-soft')
      }
    >
      {children}
    </div>
  )
}

function EquationCard({ eq }: { eq: RespirationCompareExtra['equations'][number] }) {
  return (
    <div className="rounded-lg border border-line bg-surface p-3">
      <div className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-muted">
        <T
          value={
            eq.kind === 'aerobic'
              ? RESPIRATION_COMPARE.aerobic
              : eq.kind === 'anaerobic-muscle'
              ? RESPIRATION_COMPARE.anaerobicMuscle
              : RESPIRATION_COMPARE.anaerobicYeast
          }
        />
      </div>
      <div className="font-mono text-[13px] leading-snug text-ink">{eq.latex}</div>
      <p className="mt-1 text-[11px] leading-relaxed text-ink-soft">
        <T value={eq.meaning} />
      </p>
    </div>
  )
}
