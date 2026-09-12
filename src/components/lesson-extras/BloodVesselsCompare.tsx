import type { BloodVesselsCompareExtra } from '@/content/types'
import { T } from '@/components/i18n/T'
import { BLOOD_VESSELS_COMPARE } from '@/lib/lessonExtrasStrings'
import { assetUrl } from '@/lib/assetUrl'

/**
 * Three-way compare of artery, capillary and vein.
 *
 * Each vessel type gets a card with its cross-section figure and a per-row
 * comparison table underneath. The table is the same one the G8 PDF
 * presents as Table B7.01: wall, lumen, valves, direction, pressure.
 *
 * Designed so a student can read the three cards top-to-bottom and see
 * exactly which structural difference follows from which functional
 * requirement — that is the syllabus point.
 */
export function BloodVesselsCompare({ extra }: { extra: BloodVesselsCompareExtra }) {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {extra.vessels.map((v) => (
          <VesselCard key={v.id} vessel={v} />
        ))}
      </div>
      <CompareTable vessels={extra.vessels} />
    </div>
  )
}

// ---------------------------------------------------------------------------
// One vessel card
// ---------------------------------------------------------------------------

function VesselCard({ vessel }: { vessel: BloodVesselsCompareExtra['vessels'][number] }) {
  return (
    <article className="overflow-hidden rounded-lg border border-line bg-surface">
      <figure className="m-0 bg-canvas">
        <img
          src={assetUrl(vessel.image)}
          alt={`Cross-section of a ${typeof vessel.name === 'string' ? vessel.name : vessel.name.en}`}
          className="h-40 w-full object-contain"
          loading="lazy"
        />
        <figcaption className="border-t border-line bg-canvas px-2 py-1 text-[10px] text-muted">
          <T value={vessel.imageSource} />
        </figcaption>
      </figure>
      <div className="space-y-1.5 p-3">
        <h3 className="text-base font-semibold text-ink">
          <T value={vessel.name} />
        </h3>
        <p className="text-xs leading-relaxed text-ink-soft">
          <T value={vessel.function} />
        </p>
      </div>
    </article>
  )
}

// ---------------------------------------------------------------------------
// Comparison table
// ---------------------------------------------------------------------------

/**
 * The same comparison as a single table, so the differences sit side by side
 * rather than scattered across three cards. The table is rendered as CSS
 * grid (not <table>) so the column widths match the card grid above and the
 * layout is identical on mobile.
 */
function CompareTable({ vessels }: { vessels: BloodVesselsCompareExtra['vessels'] }) {
  const ROWS: Array<{ key: 'wall' | 'lumen' | 'hasValves' | 'direction' | 'pressure'; label: BilingualText }> = [
    { key: 'wall', label: BLOOD_VESSELS_COMPARE.rowLabel.wall },
    { key: 'lumen', label: BLOOD_VESSELS_COMPARE.rowLabel.lumen },
    { key: 'hasValves', label: BLOOD_VESSELS_COMPARE.rowLabel.hasValves },
    { key: 'direction', label: BLOOD_VESSELS_COMPARE.rowLabel.direction },
    { key: 'pressure', label: BLOOD_VESSELS_COMPARE.rowLabel.pressure },
  ]
  return (
    <div className="overflow-x-auto rounded-lg border border-line bg-canvas">
      <div
        className="grid min-w-[480px] text-xs"
        style={{ gridTemplateColumns: `120px repeat(${vessels.length}, minmax(0, 1fr))` }}
      >
        <Cell header muted>
          <T value={BLOOD_VESSELS_COMPARE.tableHeading} />
        </Cell>
        {vessels.map((v) => (
          <Cell key={v.id} header>
            <T value={v.name} />
          </Cell>
        ))}
        {ROWS.map((row) => (
          <Row key={row.key} label={row.label}>
            {vessels.map((v) => (
              <Cell key={v.id}>
                {row.key === 'hasValves' ? (
                  v.hasValves ? (
                    <T value={BLOOD_VESSELS_COMPARE.yes} />
                  ) : (
                    <T value={BLOOD_VESSELS_COMPARE.no} />
                  )
                ) : (
                  <T value={v[row.key] as BilingualText} />
                )}
              </Cell>
            ))}
          </Row>
        ))}
      </div>
    </div>
  )
}

type BilingualText = { en: string; zh?: string }

function Row({ label, children }: { label: BilingualText; children: React.ReactNode }) {
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
