import type { MitosisVsMeiosisExtra } from '@/content/types'
import { T } from '@/components/i18n/T'
import { MITOSIS_VS_MEIOSIS } from '@/lib/lessonExtrasStrings'

/**
 * Mitosis vs meiosis — the two divisions a cell can do (G8 17.1,
 * syllabus 17.2.1–17.2.2). No real PDF figure is available for this
 * chapter, so the diagram is hand-built: a tiny chromosome-symbol
 * representation that shows the count and the number of cells.
 *
 * The data drives everything. The lesson.ts file passes the row
 * labels and the answer for each side, so the component is reusable
 * across lessons without touching the React code.
 */
const SVG_W = 720
const SVG_H = 200

export function MitosisVsMeiosis({ extra }: { extra: MitosisVsMeiosisExtra }) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-ink-soft">
        <T value={extra.intro} />
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        <MitosisPanel mitosis={extra.mitosis} />
        <MeiosisPanel meiosis={extra.meiosis} />
      </div>

      <ComparisonTable rows={extra.rows} />
    </div>
  )
}

// ---------------------------------------------------------------------------
// Side panels: the cell-stage picture
// ---------------------------------------------------------------------------

function MitosisPanel({
  mitosis,
}: {
  mitosis: MitosisVsMeiosisExtra['mitosis']
}) {
  return (
    <figure className="m-0 overflow-hidden rounded-lg border border-line bg-canvas">
      <div className="border-b border-line bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-900">
        <T value={mitosis.heading} />
      </div>
      <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="block w-full">
        <title>{mitosis.heading.en}</title>

        {/* Starting cell */}
        <CellCircle cx={120} cy={100} r={50} fill="#dbeafe" stroke="#1d4ed8" />
        <ChromosomePair cx={120} cy={100} />
        <text
          x={120}
          y={180}
          fontSize={12}
          fill="#0f172a"
          textAnchor="middle"
          fontWeight={500}
        >
          Parent cell (2n = 4)
        </text>

        {/* Arrow */}
        <ArrowLine x1={185} y1={100} x2={330} y2={100} />

        {/* Result: two cells */}
        <CellCircle cx={400} cy={100} r={45} fill="#dbeafe" stroke="#1d4ed8" />
        <ChromosomePair cx={400} cy={100} small />
        <CellCircle
          cx={520}
          cy={100}
          r={45}
          fill="#dbeafe"
          stroke="#1d4ed8"
        />
        <ChromosomePair cx={520} cy={100} small />
        <text
          x={460}
          y={180}
          fontSize={12}
          fill="#0f172a"
          textAnchor="middle"
          fontWeight={500}
        >
          2 daughter cells (2n = 4)
        </text>
      </svg>
      <figcaption className="border-t border-line bg-canvas px-3 py-1.5 text-[11px] text-muted">
        <T value={mitosis.outcome} />
      </figcaption>
    </figure>
  )
}

function MeiosisPanel({
  meiosis,
}: {
  meiosis: MitosisVsMeiosisExtra['meiosis']
}) {
  return (
    <figure className="m-0 overflow-hidden rounded-lg border border-line bg-canvas">
      <div className="border-b border-line bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-900">
        <T value={meiosis.heading} />
      </div>
      <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="block w-full">
        <title>{meiosis.heading.en}</title>

        {/* Starting cell */}
        <CellCircle cx={90} cy={100} r={45} fill="#fce7f3" stroke="#be185d" />
        <ChromosomePair cx={90} cy={100} />
        <text
          x={90}
          y={180}
          fontSize={12}
          fill="#0f172a"
          textAnchor="middle"
          fontWeight={500}
        >
          Parent cell (2n = 4)
        </text>

        {/* First arrow */}
        <ArrowLine x1={150} y1={100} x2={240} y2={100} />

        {/* Meiosis I: two cells, each with homologous pair separated */}
        <CellCircle
          cx={290}
          cy={100}
          r={40}
          fill="#fce7f3"
          stroke="#be185d"
        />
        <SingleChromosome cx={290} cy={100} />
        <CellCircle
          cx={380}
          cy={100}
          r={40}
          fill="#fce7f3"
          stroke="#be185d"
        />
        <SingleChromosome cx={380} cy={100} mirror />

        {/* Second arrow */}
        <ArrowLine x1={430} y1={100} x2={490} y2={100} />

        {/* Meiosis II: four cells, each haploid */}
        {[
          { x: 530, y: 60, mirror: false },
          { x: 530, y: 140, mirror: false },
          { x: 620, y: 60, mirror: true },
          { x: 620, y: 140, mirror: true },
        ].map((c, i) => (
          <g key={i}>
            <CellCircle
              cx={c.x}
              cy={c.y}
              r={28}
              fill="#fce7f3"
              stroke="#be185d"
            />
            <SingleChromosome cx={c.x} cy={c.y} small mirror={c.mirror} />
          </g>
        ))}
        <text
          x={570}
          y={195}
          fontSize={12}
          fill="#0f172a"
          textAnchor="middle"
          fontWeight={500}
        >
          4 daughter cells (n = 2)
        </text>
      </svg>
      <figcaption className="border-t border-line bg-canvas px-3 py-1.5 text-[11px] text-muted">
        <T value={meiosis.outcome} />
      </figcaption>
    </figure>
  )
}

// ---------------------------------------------------------------------------
// Comparison table
// ---------------------------------------------------------------------------

function ComparisonTable({ rows }: { rows: MitosisVsMeiosisExtra['rows'] }) {
  return (
    <div className="overflow-hidden rounded-lg border border-line bg-surface">
      <table className="w-full text-left text-sm">
        <thead className="bg-canvas text-xs font-semibold uppercase tracking-wide text-muted">
          <tr>
            <th className="px-3 py-2" />
            <th className="px-3 py-2 text-emerald-900">
              <T value={MITOSIS_VS_MEIOSIS.mitosisShort} />
            </th>
            <th className="px-3 py-2 text-rose-900">
              <T value={MITOSIS_VS_MEIOSIS.meiosisShort} />
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={row.id}
              className={i % 2 === 0 ? 'bg-surface' : 'bg-canvas/50'}
            >
              <td className="px-3 py-2 font-medium text-ink">
                <T value={row.label} />
              </td>
              <td className="px-3 py-2 text-ink-soft">
                <T value={row.mitosis} />
              </td>
              <td className="px-3 py-2 text-ink-soft">
                <T value={row.meiosis} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Tiny SVG primitives — no real figures, just the symbols of the cell
// ---------------------------------------------------------------------------

function CellCircle({
  cx,
  cy,
  r,
  fill,
  stroke,
}: {
  cx: number
  cy: number
  r: number
  fill: string
  stroke: string
}) {
  return (
    <ellipse
      cx={cx}
      cy={cy}
      rx={r}
      ry={r * 0.85}
      fill={fill}
      stroke={stroke}
      strokeWidth={2}
    />
  )
}

function ChromosomePair({ cx, cy, small }: { cx: number; cy: number; small?: boolean }) {
  const r = small ? 4 : 6
  return (
    <g>
      {/* Two X-shaped chromosomes of different sizes */}
      <Chromosome cx={cx - 10} cy={cy} r={r} color="#1d4ed8" />
      <Chromosome cx={cx + 10} cy={cy} r={r} color="#dc2626" />
    </g>
  )
}

function SingleChromosome({
  cx,
  cy,
  small,
  mirror,
}: {
  cx: number
  cy: number
  small?: boolean
  mirror?: boolean
}) {
  const r = small ? 3 : 5
  return (
    <Chromosome
      cx={cx}
      cy={cy}
      r={r}
      color={mirror ? '#dc2626' : '#1d4ed8'}
    />
  )
}

function Chromosome({
  cx,
  cy,
  r,
  color,
}: {
  cx: number
  cy: number
  r: number
  color: string
}) {
  // An X-shape: two diagonals
  return (
    <g stroke={color} strokeWidth={1.6} strokeLinecap="round">
      <line x1={cx - r} y1={cy - r} x2={cx + r} y2={cy + r} />
      <line x1={cx - r} y1={cy + r} x2={cx + r} y2={cy - r} />
    </g>
  )
}

function ArrowLine({
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
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={x2 - 6}
        y2={y2}
        stroke="#475569"
        strokeWidth={1.5}
        markerEnd="url(#mitosis-arrow)"
      />
      <defs>
        <marker
          id="mitosis-arrow"
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="4"
          orient="auto"
        >
          <path d="M 0 0 L 8 4 L 0 8 z" fill="#475569" />
        </marker>
      </defs>
    </g>
  )
}
