import type { SimBody, SimLink } from '@/content/types'
import type { SimViewProps } from '../SimStage'
import { molecularFormula } from '@/lib/molecularFormula'
import { PlotGrid } from '../plot2d/PlotGrid'
import { T } from '@/components/i18n/T'

const W = 460
const STRUCTURE_H = 236

/** Colours by element, so the functional group stands out without needing a key. */
const ELEMENT_COLOUR: Record<string, string> = {
  C: '#334155',
  H: '#94a3b8',
  O: '#dc2626',
  N: '#2563eb',
  Cl: '#15803d',
  Br: '#b45309',
  F: '#0891b2',
}

/** Largest px per bond length. Without a cap, methane would fill the frame. */
const MAX_SCALE = 52
/** Gap left at each end of a bond so the line does not run through the atom's letter. */
const ATOM_GAP = 9

/**
 * Displayed formula — every atom and every bond drawn, which is exactly what 0620 asks
 * students to produce and to read.
 *
 * Bonds come from `links` rather than being inferred from distance: a kernel that knows
 * it made a double bond should say so, and inferring it would quietly turn a drawing
 * error into a chemistry error.
 *
 * The molecular formula in the caption is counted off the atoms actually drawn, so it
 * cannot drift from the picture.
 */
export function Molecule({ result }: SimViewProps) {
  const bodies = result.bodies ?? []
  const links = result.links ?? []
  const markers = result.markers ?? []

  // `markers[0]` names the compound. It goes in the caption rather than on the canvas so
  // it can carry its Chinese gloss; the rest are annotations drawn where they point.
  const [name, ...annotations] = markers

  const geometry = layout(bodies, annotations)
  const formula = molecularFormula(bodies)

  return (
    <figure className="m-0">
      <svg
        viewBox={`0 0 ${W} ${STRUCTURE_H}`}
        className="w-full select-none"
        role="img"
        aria-label={`Displayed formula of ${formula}`}
      >
        <rect x={0} y={0} width={W} height={STRUCTURE_H} fill="#f8fafc" />

        {links.map((link, i) => (
          <Bond key={i} link={link} bodies={bodies} geometry={geometry} />
        ))}

        {bodies.map((b, i) => (
          <text
            key={i}
            x={geometry.sx(b.x)}
            y={geometry.sy(b.y) + 6}
            textAnchor="middle"
            fontSize={b.kind === 'H' ? 15 : 18}
            fontWeight={600}
            fill={ELEMENT_COLOUR[b.kind ?? ''] ?? '#334155'}
          >
            {b.kind}
          </text>
        ))}

        {annotations.map((m, i) => (
          <text
            key={i}
            x={geometry.sx(m.x)}
            y={geometry.sy(m.y)}
            textAnchor="middle"
            fontSize={12}
            fontWeight={600}
            fill="#64748b"
          >
            {m.label.en}
          </text>
        ))}
      </svg>

      <figcaption className="mt-1 text-center">
        <span className="font-mono text-lg font-semibold text-ink">{formula}</span>
        {name && (
          <span className="ml-3 text-sm text-muted">
            <T value={name.label} />
          </span>
        )}
      </figcaption>

      {result.series.length > 0 && (
        <div className="mt-4">
          <PlotGrid series={result.series} height={230} />
        </div>
      )}
    </figure>
  )
}

interface Geometry {
  sx: (x: number) => number
  sy: (y: number) => number
}

/**
 * Fits the molecule into the frame, centred, at no more than `MAX_SCALE` px per bond.
 *
 * Annotations count towards the extent, so a label hung above the structure is inside the
 * frame rather than clipped off the top of it.
 */
function layout(bodies: SimBody[], annotations: Array<{ x: number; y: number }>): Geometry {
  if (bodies.length === 0) {
    return { sx: () => W / 2, sy: () => STRUCTURE_H / 2 }
  }

  const points = [...bodies, ...annotations]
  const xs = points.map((b) => b.x)
  const ys = points.map((b) => b.y)
  const minX = Math.min(...xs)
  const maxX = Math.max(...xs)
  const minY = Math.min(...ys)
  const maxY = Math.max(...ys)

  // Half a bond length of margin all round, so terminal atoms are not flush to the edge.
  const spanX = maxX - minX + 1
  const spanY = maxY - minY + 1
  const scale = Math.min(MAX_SCALE, (W - 40) / spanX, (STRUCTURE_H - 30) / spanY)

  const cx = W / 2 - ((minX + maxX) / 2) * scale
  const cy = STRUCTURE_H / 2 + ((minY + maxY) / 2) * scale

  // Molecule y runs up the page; SVG y runs down it.
  return { sx: (x) => cx + x * scale, sy: (y) => cy - y * scale }
}

interface BondProps {
  link: SimLink
  bodies: SimBody[]
  geometry: Geometry
}

/**
 * One bond. A double bond is two parallel lines, offset perpendicular to the bond —
 * the notation the syllabus uses for the C=C that makes an alkene unsaturated.
 */
function Bond({ link, bodies, geometry }: BondProps) {
  const from = bodies[link.a]
  const to = bodies[link.b]
  if (!from || !to) return null

  const x1 = geometry.sx(from.x)
  const y1 = geometry.sy(from.y)
  const x2 = geometry.sx(to.x)
  const y2 = geometry.sy(to.y)

  const dx = x2 - x1
  const dy = y2 - y1
  const length = Math.hypot(dx, dy) || 1
  const ux = dx / length
  const uy = dy / length

  // Trim both ends clear of the atom labels.
  const ax = x1 + ux * ATOM_GAP
  const ay = y1 + uy * ATOM_GAP
  const bx = x2 - ux * ATOM_GAP
  const by = y2 - uy * ATOM_GAP

  const order = link.order ?? 1
  const highlighted = link.kind === 'functional'
  const colour = highlighted ? '#0d9488' : '#475569'
  const width = highlighted ? 2.6 : 2

  // Perpendicular offsets: one line for a single bond, a symmetric pair for a double.
  const offsets = order === 2 ? [-3, 3] : order === 3 ? [-4, 0, 4] : [0]

  return (
    <g>
      {offsets.map((o, i) => (
        <line
          key={i}
          x1={ax - uy * o}
          y1={ay + ux * o}
          x2={bx - uy * o}
          y2={by + ux * o}
          stroke={colour}
          strokeWidth={width}
          strokeLinecap="round"
        />
      ))}
    </g>
  )
}
