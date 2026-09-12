import { useState } from 'react'
import type { Bilingual, DoubleCirculationExtra } from '@/content/types'
import { T } from '@/components/i18n/T'
import { DOUBLE_CIRCULATION } from '@/lib/lessonExtrasStrings'
import { assetUrl } from '@/lib/assetUrl'

/**
 * The double circulation as two horizontal loops, with a base image above.
 *
 * The textbook figure (G8 Figure B7.01) sits at the top as a reference. Below
 * it, the 10 stations are arranged as two rows — pulmonary loop on top, systemic
 * loop on the bottom — with the colour of each station saying whether the blood
 * there is oxygenated (red) or deoxygenated (blue). A "connector" between the
 * rows marks the moment the heart re-pressurises the blood.
 *
 * The 6 togglable definition cards at the bottom carry the formal terms the
 * syllabus wants remembered: double circulation, single circulation, pulmonary
 * artery, pulmonary vein, systemic, oxygenated blood, etc.
 */
export function DoubleCirculation({ extra }: { extra: DoubleCirculationExtra }) {
  const [openId, setOpenId] = useState<string | null>(null)
  // The two loops, in the order they were authored.
  const pulmonary = extra.stations.filter((s) => s.loop === 'pulmonary')
  const systemic = extra.stations.filter((s) => s.loop === 'systemic')
  return (
    <div className="space-y-4">
      <figure className="m-0 overflow-hidden rounded-lg border border-line bg-canvas">
        <img src={assetUrl(extra.image)} alt="The double circulation of a human" className="h-auto w-full" loading="lazy" />
        <figcaption className="border-t border-line bg-canvas px-3 py-1.5 text-[11px] text-muted">
          <T value={extra.imageSource} />
        </figcaption>
      </figure>

      <LoopRow stations={pulmonary} rowLabel={DOUBLE_CIRCULATION.rowLabel.pulmonary} />
      <Connector />
      <LoopRow stations={systemic} rowLabel={DOUBLE_CIRCULATION.rowLabel.systemic} />

      <div>
        <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
          <T value={DOUBLE_CIRCULATION.definitionsHeading} />
        </h4>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {extra.definitions.map((d) => (
            <DefCard
              key={d.id}
              id={d.id}
              term={d.term}
              definition={d.definition}
              open={openId === d.id}
              onToggle={() => setOpenId((cur) => (cur === d.id ? null : d.id))}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// One loop row
// ---------------------------------------------------------------------------

function LoopRow({
  stations,
  rowLabel,
}: {
  stations: DoubleCirculationExtra['stations']
  rowLabel: Bilingual
}) {
  return (
    <div className="rounded-lg border border-line bg-canvas p-3">
      <div className="mb-2 flex items-baseline gap-2">
        <span className="text-[10px] font-semibold uppercase tracking-wide text-ink">
          {rowLabel.en}
        </span>
        {rowLabel.zh && <span className="text-[10px] text-muted">{rowLabel.zh}</span>}
      </div>
      <div className="overflow-x-auto">
        <div className="flex min-w-fit items-stretch gap-0">
          {stations.map((s, i) => (
            <div key={s.id} className="flex items-stretch">
              <Station station={s} index={i} />
              {i < stations.length - 1 && (
                <div className="flex w-6 items-center justify-center text-muted" aria-hidden="true">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/**
 * One station in the loop. The colour scheme is the textbook convention:
 * red = oxygenated blood, blue = deoxygenated, neutral (grey) = "mixed" —
 * usually the lung or body capillaries where gas exchange happens.
 */
function Station({ station, index }: { station: DoubleCirculationExtra['stations'][number]; index: number }) {
  const palette = STATION_PALETTE[station.bloodState]
  return (
    <div
      className={
        'flex w-28 flex-col justify-between rounded-md border p-2 text-center ' +
        palette.box
      }
      data-station={station.id}
    >
      <span className={'text-[10px] font-mono ' + palette.num}>{index + 1}</span>
      <span className={'text-xs font-semibold ' + palette.title}>
        <T value={station.label} />
      </span>
      <span className={'text-[10px] ' + palette.summary}>
        <T value={station.summary} />
      </span>
    </div>
  )
}

const STATION_PALETTE: Record<DoubleCirculationExtra['stations'][number]['bloodState'], {
  box: string
  num: string
  title: string
  summary: string
}> = {
  oxygenated: {
    box: 'border-red-300 bg-red-50',
    num: 'text-red-700',
    title: 'text-red-900',
    summary: 'text-red-800',
  },
  deoxygenated: {
    box: 'border-blue-300 bg-blue-50',
    num: 'text-blue-700',
    title: 'text-blue-900',
    summary: 'text-blue-800',
  },
  mixed: {
    box: 'border-slate-300 bg-slate-50',
    num: 'text-slate-500',
    title: 'text-slate-800',
    summary: 'text-slate-700',
  },
}

// ---------------------------------------------------------------------------
// Connector between the two loops
// ---------------------------------------------------------------------------

/**
 * The "the heart pumps again" callout that joins the end of the pulmonary
 * loop to the start of the systemic loop, and the systemic loop back to
 * the pulmonary loop. Drawn as a single visual seam, not text.
 */
function Connector() {
  return (
    <div className="grid grid-cols-1 gap-1 sm:grid-cols-[1fr_auto_1fr]">
      <div className="hidden sm:block" />
      <div className="flex flex-col items-center justify-center gap-1 rounded-md border border-dashed border-line bg-canvas px-2 py-1 text-center text-[10px] text-muted">
        <span aria-hidden="true">↓</span>
        <T value={DOUBLE_CIRCULATION.connector} />
        <span aria-hidden="true">↓</span>
      </div>
      <div className="hidden sm:block" />
    </div>
  )
}

// ---------------------------------------------------------------------------
// Definition card
// ---------------------------------------------------------------------------

function DefCard({
  id,
  term,
  definition,
  open,
  onToggle,
}: {
  id: string
  term: DoubleCirculationExtra['definitions'][number]['term']
  definition: DoubleCirculationExtra['definitions'][number]['definition']
  open: boolean
  onToggle: () => void
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      data-def-id={id}
      className={
        'rounded-lg border p-3 text-left transition-colors ' +
        (open
          ? 'border-teal-600 bg-teal-50'
          : 'border-line bg-surface hover:border-ink-soft hover:bg-canvas')
      }
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-semibold text-ink">
          <T value={term} />
        </span>
        <span className="text-xs text-muted">
          <T value={open ? DOUBLE_CIRCULATION.collapse : DOUBLE_CIRCULATION.reveal} />
        </span>
      </div>
      {open && (
        <p className="mt-1.5 text-xs leading-relaxed text-ink-soft">
          <T value={definition} />
        </p>
      )}
    </button>
  )
}
