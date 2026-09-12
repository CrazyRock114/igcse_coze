import { useState } from 'react'
import type { PedigreeTraceExtra, PedigreeIndividual } from '@/content/types'
import { T } from '@/components/i18n/T'
import { PEDIGREE_TRACE } from '@/lib/lessonExtrasStrings'

/**
 * A 3-generation pedigree chart (G8 17.1, syllabus 17.4.10–17.4.12,
 * 17.4.16–17.4.18). No real PDF figure is available for this chapter,
 * so the diagram is hand-built. The student clicks any individual to
 * see what their status means and the deduction chain that fixes their
 * genotype.
 *
 * The shape:
 *   - Generation I: 2 grandparents at the top.
 *   - Generation II: their 4 children, with spouses married in.
 *   - Generation III: 5 grandchildren, plus the legend.
 *
 * The chart can be flipped to show the "recessive allele on X" mode
 * (sex-linked) where the colour rules differ — this is what the G8
 * syllabus uses to test the difference between autosomal recessive
 * and X-linked recessive.
 */
const SVG_W = 720
const SVG_H = 420

export function PedigreeTrace({ extra }: { extra: PedigreeTraceExtra }) {
  const [mode, setMode] = useState<'autosomal' | 'sex-linked'>(
    extra.initialMode
  )
  const [selectedId, setSelectedId] = useState<string | null>(
    extra.initialSelected ?? extra.individuals[0]?.id ?? null
  )

  const selected =
    extra.individuals.find((p) => p.id === selectedId) ?? null

  return (
    <div className="space-y-4">
      <p className="text-sm text-ink-soft">
        <T value={extra.intro} />
      </p>

      <div className="flex flex-wrap gap-2">
        <ModeButton
          active={mode === 'autosomal'}
          onClick={() => setMode('autosomal')}
        >
          <T value={PEDIGREE_TRACE.autosomalLabel} />
        </ModeButton>
        <ModeButton
          active={mode === 'sex-linked'}
          onClick={() => setMode('sex-linked')}
        >
          <T value={PEDIGREE_TRACE.sexLinkedLabel} />
        </ModeButton>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_300px]">
        <figure className="m-0 overflow-hidden rounded-lg border border-line bg-canvas">
          <svg
            viewBox={`0 0 ${SVG_W} ${SVG_H}`}
            className="block w-full"
            role="img"
            aria-label={extra.title.en}
          >
            <title>{extra.title.en}</title>
            <PedigreeChart
              individuals={extra.individuals}
              mode={mode}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />
          </svg>
          <figcaption className="border-t border-line bg-canvas px-3 py-1.5 text-[11px] text-muted">
            <T value={extra.title} />
          </figcaption>
        </figure>

        <SidePanel
          selected={selected}
          mode={mode}
        />
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Pedigree chart — the visual
// ---------------------------------------------------------------------------

function PedigreeChart({
  individuals,
  mode,
  selectedId,
  onSelect,
}: {
  individuals: PedigreeIndividual[]
  mode: 'autosomal' | 'sex-linked'
  selectedId: string | null
  onSelect: (id: string) => void
}) {
  return (
    <g>
      {/* Generation labels */}
      <text
        x={30}
        y={60}
        fontSize={12}
        fontWeight={600}
        fill="#64748b"
      >
        I
      </text>
      <text
        x={30}
        y={200}
        fontSize={12}
        fontWeight={600}
        fill="#64748b"
      >
        II
      </text>
      <text
        x={30}
        y={360}
        fontSize={12}
        fontWeight={600}
        fill="#64748b"
      >
        III
      </text>

      {individuals.map((ind) => (
        <PedigreeNode
          key={ind.id}
          ind={ind}
          mode={mode}
          selected={selectedId === ind.id}
          onSelect={() => onSelect(ind.id)}
        />
      ))}

      {/* Mating lines + descent lines: simplified */}
      <MatingLine x1={324} y1={90} x2={396} y2={90} />
      <MatingLine x1={104} y1={230} x2={156} y2={230} />
      <MatingLine x1={304} y1={230} x2={356} y2={230} />
      <MatingLine x1={504} y1={230} x2={556} y2={230} />

      {/* Descent lines (vertical) — drop from the mating line midpoint to the sibship line */}
      <line
        x1={360}
        y1={90}
        x2={360}
        y2={200}
        stroke="#475569"
        strokeWidth={1.5}
      />
      <line
        x1={180}
        y1={254}
        x2={180}
        y2={320}
        stroke="#475569"
        strokeWidth={1.5}
      />
      <line
        x1={360}
        y1={254}
        x2={360}
        y2={320}
        stroke="#475569"
        strokeWidth={1.5}
      />
      <line
        x1={540}
        y1={254}
        x2={540}
        y2={320}
        stroke="#475569"
        strokeWidth={1.5}
      />

      {/* Sibling connectors (horizontal between brothers/sisters) */}
      <line
        x1={120}
        y1={320}
        x2={200}
        y2={320}
        stroke="#475569"
        strokeWidth={1.5}
      />
      <line
        x1={300}
        y1={320}
        x2={380}
        y2={320}
        stroke="#475569"
        strokeWidth={1.5}
      />
      <line
        x1={480}
        y1={320}
        x2={600}
        y2={320}
        stroke="#475569"
        strokeWidth={1.5}
      />
    </g>
  )
}

function PedigreeNode({
  ind,
  mode,
  selected,
  onSelect,
}: {
  ind: PedigreeIndividual
  mode: 'autosomal' | 'sex-linked'
  selected: boolean
  onSelect: () => void
}) {
  // The status determines the visual style
  const status = computeStatus(ind, mode)
  const isMale = ind.sex === 'male'
  const r = 24

  // Status-driven fill
  let fill = '#fff'
  let stroke = '#0f172a'
  let pattern: 'solid' | 'half' | 'empty' = 'empty'
  if (status === 'affected') {
    fill = '#0f172a'
    stroke = '#0f172a'
    pattern = 'solid'
  } else if (status === 'carrier') {
    pattern = 'half'
  } else if (status === 'unaffected') {
    pattern = 'empty'
  }

  return (
    <g
      onClick={onSelect}
      style={{ cursor: 'pointer' }}
      data-pedigree-hotspot={ind.id}
    >
      {isMale ? (
        <rect
          x={ind.x - r}
          y={ind.y - r}
          width={r * 2}
          height={r * 2}
          fill={fill}
          stroke={stroke}
          strokeWidth={2}
        />
      ) : (
        <ellipse
          cx={ind.x}
          cy={ind.y}
          rx={r}
          ry={r}
          fill={fill}
          stroke={stroke}
          strokeWidth={2}
        />
      )}

      {/* Carrier — half shaded */}
      {pattern === 'half' && isMale && (
        <rect
          x={ind.x}
          y={ind.y - r}
          width={r}
          height={r * 2}
          fill="#94a3b8"
        />
      )}
      {pattern === 'half' && !isMale && (
        <path
          d={`M ${ind.x} ${ind.y - r} A ${r} ${r} 0 0 1 ${ind.x} ${ind.y + r} Z`}
          fill="#94a3b8"
        />
      )}

      {/* Selection ring */}
      {selected && (
        isMale ? (
          <rect
            x={ind.x - r - 6}
            y={ind.y - r - 6}
            width={(r + 6) * 2}
            height={(r + 6) * 2}
            fill="none"
            stroke="#0d9488"
            strokeWidth={3}
          />
        ) : (
          <ellipse
            cx={ind.x}
            cy={ind.y}
            rx={r + 6}
            ry={r + 6}
            fill="none"
            stroke="#0d9488"
            strokeWidth={3}
          />
        )
      )}

      {/* Generation III: also label as small letter */}
      <text
        x={ind.x}
        y={ind.y + 4}
        fontSize={10}
        fill={pattern === 'solid' ? '#fff' : '#0f172a'}
        textAnchor="middle"
        fontWeight={500}
      >
        {ind.label ?? ''}
      </text>
    </g>
  )
}

function MatingLine({
  x1,
  y1,
  x2,
  y2,
}: {
  x1: number
  y1: number
  x2: number
  y2: number
}) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="#475569"
      strokeWidth={1.5}
    />
  )
}

// ---------------------------------------------------------------------------
// Status + side panel
// ---------------------------------------------------------------------------

function computeStatus(
  ind: PedigreeIndividual,
  mode: 'autosomal' | 'sex-linked'
): 'affected' | 'carrier' | 'unaffected' | 'unknown' {
  // For the auto-recessive case, status is fixed.
  // For sex-linked, status can change meaning depending on sex.
  if (mode === 'autosomal') {
    return ind.autosomalStatus
  }
  // sex-linked
  if (ind.sex === 'male') {
    // A male has only one X: either he has the allele (affected) or he doesn't
    if (ind.autosomalStatus === 'affected') return 'affected'
    return 'unaffected'
  }
  // female: can be carrier if she has one allele
  return ind.autosomalStatus
}

function SidePanel({
  selected,
  mode,
}: {
  selected: PedigreeIndividual | null
  mode: 'autosomal' | 'sex-linked'
}) {
  if (!selected) return null

  const status = computeStatus(selected, mode)
  const statusText =
    status === 'affected'
      ? PEDIGREE_TRACE.statusAffected
      : status === 'carrier'
        ? PEDIGREE_TRACE.statusCarrier
        : status === 'unaffected'
          ? PEDIGREE_TRACE.statusUnaffected
          : PEDIGREE_TRACE.statusUnknown

  const deduction =
    mode === 'sex-linked' && selected.sex === 'male' && selected.autosomalStatus === 'affected'
      ? PEDIGREE_TRACE.sexLinkedAffectedMale
      : selected.deduction

  return (
    <aside className="rounded-lg border border-line bg-surface p-4">
      <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted">
        {selected.sex === 'male' ? '♂' : '♀'} · {selected.generation}
      </div>
      <h3 className="mb-2 text-base font-semibold text-ink">
        <T value={selected.name} />
      </h3>
      <div className="mb-3 inline-flex items-center rounded-md bg-canvas px-2 py-1 text-xs font-semibold text-ink">
        <T value={statusText} />
      </div>
      <p className="mb-3 text-sm text-ink-soft">
        <T value={selected.description} />
      </p>
      <div className="rounded-md border border-line bg-canvas/50 p-2">
        <div className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-muted">
          <T value={PEDIGREE_TRACE.deductionHeading} />
        </div>
        <p className="text-sm text-ink-soft">
          <T value={deduction} />
        </p>
      </div>
    </aside>
  )
}

// ---------------------------------------------------------------------------
// Mode button
// ---------------------------------------------------------------------------

function ModeButton({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        'rounded-md px-3 py-1.5 text-sm font-medium transition-colors ' +
        (active
          ? 'bg-ink text-white'
          : 'border border-line bg-surface text-muted hover:bg-canvas hover:text-ink-soft')
      }
    >
      {children}
    </button>
  )
}
