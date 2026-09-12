import type { SimBody } from '@/content/types'
import type { SimViewProps } from '../SimStage'
import { T } from '@/components/i18n/T'

const W = 460
const H = 300

/**
 * Dot-and-cross diagram — the drawing 0620 asks students to produce for both kinds of
 * bonding.
 *
 * Electrons really are drawn as dots and crosses rather than two colours of dot. The
 * distinction is the whole convention: it is how a marker tells which atom an electron
 * started on, and a student who has only ever seen colours cannot reproduce it in pencil.
 *
 * An ion gets square brackets and a charge outside them, because that is the notation an
 * answer has to use to score.
 */
export function Bonding({ result }: SimViewProps) {
  const bodies = result.bodies ?? []
  // Marker convention: [0] names the compound, [1] is the headline above the diagram and
  // [2] the note below it. All three are prose, so none is drawn inside the SVG — text in
  // an SVG neither wraps nor carries its Chinese gloss, and both of those matter here.
  const [name, headline, note] = result.markers ?? []

  const geometry = layout(bodies)

  return (
    <figure className="m-0">
      {headline && (
        <p className="mb-1 text-center text-sm font-semibold text-ink-soft">
          <T value={headline.label} />
        </p>
      )}
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full select-none"
        role="img"
        aria-label={`Dot-and-cross diagram of ${name?.label.en ?? ''}`}
      >
        <rect x={0} y={0} width={W} height={H} fill="#f8fafc" />

        {/* Shells first, so electrons sit on top of the circles */}
        {bodies.map((b, i) => {
          if (b.kind !== 'shell' && b.kind !== 'ion') return null
          const r = (b.r ?? 0.5) * geometry.scale
          return (
            <g key={i}>
              <circle
                cx={geometry.sx(b.x)}
                cy={geometry.sy(b.y)}
                r={r}
                fill="#fff"
                stroke="#94a3b8"
                strokeWidth={1.4}
              />
              <text
                x={geometry.sx(b.x)}
                y={geometry.sy(b.y) + 6}
                textAnchor="middle"
                fontSize={17}
                fontWeight={700}
                fill="#334155"
              >
                {b.label}
              </text>
              {b.kind === 'ion' && <Brackets cx={geometry.sx(b.x)} cy={geometry.sy(b.y)} r={r} />}
            </g>
          )
        })}

        {bodies.map((b, i) => {
          if (b.kind === 'dot') {
            return (
              <circle
                key={i}
                cx={geometry.sx(b.x)}
                cy={geometry.sy(b.y)}
                r={3.4}
                fill="#1d4ed8"
              />
            )
          }
          if (b.kind === 'cross') {
            const x = geometry.sx(b.x)
            const y = geometry.sy(b.y)
            const a = 3.4
            return (
              <g key={i} stroke="#b91c1c" strokeWidth={1.9} strokeLinecap="round">
                <line x1={x - a} y1={y - a} x2={x + a} y2={y + a} />
                <line x1={x - a} y1={y + a} x2={x + a} y2={y - a} />
              </g>
            )
          }
          if (b.kind === 'charge') {
            const r = (b.r ?? 0.5) * geometry.scale
            return (
              <text
                key={i}
                x={geometry.sx(b.x) + r + 14}
                y={geometry.sy(b.y) - r - 2}
                textAnchor="middle"
                fontSize={15}
                fontWeight={700}
                fill="#334155"
              >
                {b.label}
              </text>
            )
          }
          return null
        })}

      </svg>

      {note && (
        <p className="mt-2 text-center text-sm text-muted">
          <T value={note.label} />
        </p>
      )}

      <figcaption className="mt-1 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-muted">
        {name && (
          <span className="font-medium text-ink">
            <T value={name.label} />
          </span>
        )}
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block size-2 rounded-full bg-blue-700" />
          one atom’s electrons
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="font-bold text-red-700">✕</span>
          the other’s
        </span>
      </figcaption>
    </figure>
  )
}

/** Square brackets round an ion, with room for the charge outside the top right. */
function Brackets({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  const h = r + 9
  const w = r + 9
  const tick = 7
  return (
    <g stroke="#334155" strokeWidth={1.6} fill="none" strokeLinecap="round">
      <path d={`M${cx - w + tick},${cy - h} L${cx - w},${cy - h} L${cx - w},${cy + h} L${cx - w + tick},${cy + h}`} />
      <path d={`M${cx + w - tick},${cy - h} L${cx + w},${cy - h} L${cx + w},${cy + h} L${cx + w - tick},${cy + h}`} />
    </g>
  )
}

interface Geometry {
  sx: (x: number) => number
  sy: (y: number) => number
  scale: number
}

/** Fits the diagram into the frame, leaving room for brackets and charge labels. */
function layout(bodies: SimBody[]): Geometry {
  if (bodies.length === 0) {
    return { sx: () => W / 2, sy: () => H / 2, scale: 1 }
  }

  // The padding is what keeps an ion's brackets and its charge inside the frame.
  const points = bodies.map((b) => ({ x: b.x, y: b.y, pad: (b.r ?? 0) + 0.3 }))
  const minX = Math.min(...points.map((p) => p.x - p.pad))
  const maxX = Math.max(...points.map((p) => p.x + p.pad))
  const minY = Math.min(...points.map((p) => p.y - p.pad))
  const maxY = Math.max(...points.map((p) => p.y + p.pad))

  const scale = Math.min((W - 24) / (maxX - minX || 1), (H - 18) / (maxY - minY || 1))
  const cx = W / 2 - ((minX + maxX) / 2) * scale
  const cy = H / 2 + ((minY + maxY) / 2) * scale

  return { sx: (x) => cx + x * scale, sy: (y) => cy - y * scale, scale }
}
