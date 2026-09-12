import { useState } from 'react'
import type { DnaToProteinExtra } from '@/content/types'
import { T } from '@/components/i18n/T'
import { DNA_TO_PROTEIN } from '@/lib/lessonExtrasStrings'

/**
 * The central dogma: how a gene becomes a protein (G8 17.1, syllabus
 * 17.1.5–17.1.8). No real PDF figure is available for this chapter in
 * the G8 textbook, so the diagram is a hand-built SVG that mirrors the
 * G8 style — flat colour blocks, thin labels with leader lines.
 *
 * Two stages, each with its own tab:
 *   1. Transcription — DNA unwinds inside the nucleus, mRNA is made.
 *   2. Translation  — mRNA leaves the nucleus, ribosomes read it and
 *      assemble the protein.
 *
 * Each tab shows a single labelled scene with clickable hotspots. The
 * side panel describes what is happening at the chosen point.
 *
 * No real figures; the SVG viewBox is 720 × 360 for both stages so the
 * diagrams align in the layout.
 */
const SVG_W = 720
const SVG_H = 360

export function DnaToProtein({ extra }: { extra: DnaToProteinExtra }) {
  const [stage, setStage] = useState<'transcription' | 'translation'>(
    extra.initialStage ?? 'transcription'
  )
  const [selectedId, setSelectedId] = useState<string | null>(
    stage === 'transcription' ? 'dna-gene' : 'ribosome'
  )

  const currentStage =
    stage === 'transcription' ? extra.transcription : extra.translation
  const selected = currentStage.parts.find((p) => p.id === selectedId) ?? null

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <ModeButton
          active={stage === 'transcription'}
          onClick={() => {
            setStage('transcription')
            setSelectedId('dna-gene')
          }}
        >
          <T value={DNA_TO_PROTEIN.transcriptionLabel} />
        </ModeButton>
        <ModeButton
          active={stage === 'translation'}
          onClick={() => {
            setStage('translation')
            setSelectedId('ribosome')
          }}
        >
          <T value={DNA_TO_PROTEIN.translationLabel} />
        </ModeButton>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_300px]">
        <figure className="relative m-0 overflow-hidden rounded-lg border border-line bg-canvas">
          <svg
            viewBox={`0 0 ${SVG_W} ${SVG_H}`}
            className="block w-full"
            role="img"
            aria-label={currentStage.title.en}
          >
            <title>{currentStage.title.en}</title>
            {stage === 'transcription' ? (
              <TranscriptionScene
                selectedId={selectedId}
                onSelect={setSelectedId}
              />
            ) : (
              <TranslationScene
                selectedId={selectedId}
                onSelect={setSelectedId}
              />
            )}
          </svg>
          <figcaption className="border-t border-line bg-canvas px-3 py-1.5 text-[11px] text-muted">
            <T value={currentStage.title} />
          </figcaption>
        </figure>

        <SidePanel
          selected={selected}
          intro={currentStage.intro}
          stageName={
            stage === 'transcription'
              ? DNA_TO_PROTEIN.transcriptionLabel
              : DNA_TO_PROTEIN.translationLabel
          }
        />
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Scene 1 — transcription
// ---------------------------------------------------------------------------

function TranscriptionScene({
  selectedId,
  onSelect,
}: {
  selectedId: string | null
  onSelect: (id: string) => void
}) {
  return (
    <g>
      {/* Nuclear envelope */}
      <ellipse
        cx={360}
        cy={180}
        rx={320}
        ry={150}
        fill="#f5f3ff"
        stroke="#7c3aed"
        strokeWidth={2}
        strokeDasharray="4 4"
      />
      <text
        x={50}
        y={30}
        fontSize={14}
        fill="#7c3aed"
        fontWeight={600}
      >
        Inside the nucleus
      </text>

      {/* DNA double helix (two parallel strands, one labelled) */}
      <DNAHelix x={170} y={210} onSelect={onSelect} selectedId={selectedId} />

      {/* mRNA being synthesised, exiting the nucleus */}
      <MRNAStrand
        x={420}
        y={210}
        length={210}
        onSelect={onSelect}
        selectedId={selectedId}
      />

      {/* Arrow from DNA to mRNA */}
      <path
        d="M 280 215 Q 360 200 420 215"
        stroke="#0284c7"
        strokeWidth={2}
        fill="none"
        markerEnd="url(#arrowhead)"
      />
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="10"
          refX="8"
          refY="5"
          orient="auto"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#0284c7" />
        </marker>
      </defs>

      {/* Nuclear pore hint */}
      <ellipse
        cx={360}
        cy={330}
        rx={20}
        ry={4}
        fill="#7c3aed"
        opacity={0.4}
      />
    </g>
  )
}

function DNAHelix({
  x,
  y,
  selectedId,
  onSelect,
}: {
  x: number
  y: number
  selectedId: string | null
  onSelect: (id: string) => void
}) {
  const selected = selectedId === 'dna-gene'
  return (
    <g
      onClick={() => onSelect('dna-gene')}
      style={{ cursor: 'pointer' }}
      data-dna-to-protein-hotspot="dna-gene"
    >
      {/* Two parallel strands */}
      <line
        x1={x}
        y1={y - 14}
        x2={x + 180}
        y2={y - 14}
        stroke="#dc2626"
        strokeWidth={4}
      />
      <line
        x1={x}
        y1={y + 14}
        x2={x + 180}
        y2={y + 14}
        stroke="#1d4ed8"
        strokeWidth={4}
      />
      {/* Rungs (base pairs) */}
      {Array.from({ length: 9 }).map((_, i) => {
        const rx = x + i * 22 + 6
        return (
          <line
            key={i}
            x1={rx}
            y1={y - 14}
            x2={rx}
            y2={y + 14}
            stroke="#475569"
            strokeWidth={1.5}
          />
        )
      })}
      {/* Highlight ring on selection */}
      {selected && (
        <rect
          x={x - 8}
          y={y - 24}
          width={196}
          height={48}
          fill="none"
          stroke="#0d9488"
          strokeWidth={3}
          rx={6}
        />
      )}
      <text
        x={x + 90}
        y={y - 32}
        fontSize={12}
        fill="#0f172a"
        textAnchor="middle"
        fontWeight={500}
      >
        DNA (gene)
      </text>
    </g>
  )
}

function MRNAStrand({
  x,
  y,
  length,
  selectedId,
  onSelect,
}: {
  x: number
  y: number
  length: number
  selectedId: string | null
  onSelect: (id: string) => void
}) {
  const selected = selectedId === 'mrna'
  return (
    <g
      onClick={() => onSelect('mrna')}
      style={{ cursor: 'pointer' }}
      data-dna-to-protein-hotspot="mrna"
    >
      <line
        x1={x}
        y1={y}
        x2={x + length}
        y2={y}
        stroke="#0284c7"
        strokeWidth={3}
      />
      {/* Bases drawn as short ticks */}
      {Array.from({ length: 9 }).map((_, i) => {
        const rx = x + i * 24 + 6
        return (
          <circle
            key={i}
            cx={rx}
            cy={y}
            r={4}
            fill="#fff"
            stroke="#0284c7"
            strokeWidth={1.5}
          />
        )
      })}
      {selected && (
        <rect
          x={x - 8}
          y={y - 14}
          width={length + 16}
          height={28}
          fill="none"
          stroke="#0d9488"
          strokeWidth={3}
          rx={6}
        />
      )}
      <text
        x={x + length / 2}
        y={y - 22}
        fontSize={12}
        fill="#0f172a"
        textAnchor="middle"
        fontWeight={500}
      >
        mRNA (copy of the gene)
      </text>
    </g>
  )
}

// ---------------------------------------------------------------------------
// Scene 2 — translation
// ---------------------------------------------------------------------------

function TranslationScene({
  selectedId,
  onSelect,
}: {
  selectedId: string | null
  onSelect: (id: string) => void
}) {
  return (
    <g>
      {/* Top of the cell — outside the nucleus */}
      <text
        x={50}
        y={30}
        fontSize={14}
        fill="#0d9488"
        fontWeight={600}
      >
        In the cytoplasm
      </text>

      {/* Nuclear envelope fragment at top */}
      <path
        d="M 50 60 Q 360 30 670 60 L 670 90 Q 360 60 50 90 z"
        fill="#f5f3ff"
        stroke="#7c3aed"
        strokeWidth={1.5}
        strokeDasharray="4 4"
      />

      {/* mRNA coming out of the nucleus */}
      <MRNAStrandLong
        x={100}
        y={140}
        onSelect={onSelect}
        selectedId={selectedId}
      />

      {/* Ribosome reading the mRNA */}
      <Ribosome
        cx={380}
        cy={160}
        onSelect={onSelect}
        selectedId={selectedId}
      />

      {/* tRNA bringing amino acids */}
      <TRNA
        x={310}
        y={260}
        onSelect={onSelect}
        selectedId={selectedId}
      />
      <TRNA
        x={460}
        y={260}
        onSelect={onSelect}
        selectedId={selectedId}
        label="tRNA"
      />

      {/* Protein chain growing out of the ribosome */}
      <ProteinChain
        x={200}
        y={210}
        onSelect={onSelect}
        selectedId={selectedId}
      />
    </g>
  )
}

function MRNAStrandLong({
  x,
  y,
  selectedId,
  onSelect,
}: {
  x: number
  y: number
  selectedId: string | null
  onSelect: (id: string) => void
}) {
  const selected = selectedId === 'mrna-cyto'
  return (
    <g
      onClick={() => onSelect('mrna-cyto')}
      style={{ cursor: 'pointer' }}
      data-dna-to-protein-hotspot="mrna-cyto"
    >
      <line
        x1={x}
        y1={y}
        x2={x + 540}
        y2={y}
        stroke="#0284c7"
        strokeWidth={3}
      />
      {Array.from({ length: 23 }).map((_, i) => {
        const rx = x + i * 24 + 4
        return (
          <circle
            key={i}
            cx={rx}
            cy={y}
            r={3.5}
            fill="#fff"
            stroke="#0284c7"
            strokeWidth={1.2}
          />
        )
      })}
      {selected && (
        <rect
          x={x - 6}
          y={y - 12}
          width={552}
          height={24}
          fill="none"
          stroke="#0d9488"
          strokeWidth={3}
          rx={6}
        />
      )}
      <text x={x} y={y - 12} fontSize={12} fill="#0f172a" fontWeight={500}>
        mRNA (left the nucleus)
      </text>
    </g>
  )
}

function Ribosome({
  cx,
  cy,
  selectedId,
  onSelect,
}: {
  cx: number
  cy: number
  selectedId: string | null
  onSelect: (id: string) => void
}) {
  const selected = selectedId === 'ribosome'
  return (
    <g
      onClick={() => onSelect('ribosome')}
      style={{ cursor: 'pointer' }}
      data-dna-to-protein-hotspot="ribosome"
    >
      <ellipse
        cx={cx}
        cy={cy}
        rx={48}
        ry={28}
        fill="#a78bfa"
        stroke="#6d28d9"
        strokeWidth={2}
      />
      <ellipse
        cx={cx + 12}
        cy={cy + 6}
        rx={30}
        ry={20}
        fill="#c4b5fd"
        stroke="#6d28d9"
        strokeWidth={1.5}
      />
      {selected && (
        <ellipse
          cx={cx}
          cy={cy}
          rx={56}
          ry={36}
          fill="none"
          stroke="#0d9488"
          strokeWidth={3}
        />
      )}
      <text
        x={cx}
        y={cy - 38}
        fontSize={12}
        fill="#0f172a"
        textAnchor="middle"
        fontWeight={500}
      >
        Ribosome
      </text>
    </g>
  )
}

function TRNA({
  x,
  y,
  selectedId,
  onSelect,
  label = 'tRNA',
}: {
  x: number
  y: number
  selectedId: string | null
  onSelect: (id: string) => void
  label?: string
}) {
  const selected = selectedId === 'trna'
  return (
    <g
      onClick={() => onSelect('trna')}
      style={{ cursor: 'pointer' }}
      data-dna-to-protein-hotspot="trna"
    >
      {/* tRNA drawn as a cloverleaf simplified into a rounded square */}
      <rect
        x={x}
        y={y}
        width={32}
        height={28}
        rx={6}
        fill="#fbbf24"
        stroke="#b45309"
        strokeWidth={1.5}
      />
      <text
        x={x + 16}
        y={y + 19}
        fontSize={10}
        fill="#0f172a"
        textAnchor="middle"
        fontWeight={500}
      >
        aa
      </text>
      {selected && (
        <rect
          x={x - 4}
          y={y - 4}
          width={40}
          height={36}
          fill="none"
          stroke="#0d9488"
          strokeWidth={3}
          rx={8}
        />
      )}
      <text
        x={x + 16}
        y={y + 50}
        fontSize={11}
        fill="#0f172a"
        textAnchor="middle"
        fontWeight={500}
      >
        {label}
      </text>
    </g>
  )
}

function ProteinChain({
  x,
  y,
  selectedId,
  onSelect,
}: {
  x: number
  y: number
  selectedId: string | null
  onSelect: (id: string) => void
}) {
  const selected = selectedId === 'protein'
  // A short chain of beads emerging from the ribosome
  const beads = [
    { dx: 0, color: '#60a5fa' },
    { dx: 14, color: '#34d399' },
    { dx: 28, color: '#f472b6' },
    { dx: 42, color: '#fbbf24' },
    { dx: 56, color: '#a78bfa' },
  ]
  return (
    <g
      onClick={() => onSelect('protein')}
      style={{ cursor: 'pointer' }}
      data-dna-to-protein-hotspot="protein"
    >
      {beads.map((b, i) => (
        <circle
          key={i}
          cx={x + b.dx}
          cy={y}
          r={5}
          fill={b.color}
          stroke="#0f172a"
          strokeWidth={1}
        />
      ))}
      {selected && (
        <rect
          x={x - 8}
          y={y - 8}
          width={72}
          height={16}
          fill="none"
          stroke="#0d9488"
          strokeWidth={3}
          rx={6}
        />
      )}
      <text
        x={x + 28}
        y={y + 22}
        fontSize={12}
        fill="#0f172a"
        textAnchor="middle"
        fontWeight={500}
      >
        Protein
      </text>
    </g>
  )
}

// ---------------------------------------------------------------------------
// Side panel + small components
// ---------------------------------------------------------------------------

function SidePanel({
  selected,
  intro,
  stageName,
}: {
  selected: { name: { en: string }; description: { en: string } } | null
  intro: { en: string; zh?: string }
  stageName: { en: string; zh?: string }
}) {
  return (
    <aside className="rounded-lg border border-line bg-surface p-4">
      <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
        <T value={stageName} />
      </div>
      {selected ? (
        <>
          <h3 className="mb-2 text-base font-semibold text-ink">
            <T value={selected.name} />
          </h3>
          <p className="text-sm text-ink-soft">
            <T value={selected.description} />
          </p>
        </>
      ) : (
        <p className="text-sm text-muted">
          <T value={intro} />
        </p>
      )}
    </aside>
  )
}

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
