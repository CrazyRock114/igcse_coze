import { useCallback, useRef } from 'react'
import type { SimViewProps } from '../SimStage'
import { toDegrees } from '@/lib/units'

const W = 480
const H = 340
const PAD = 18

const RAY_STYLE: Record<string, { colour: string; dash?: string }> = {
  incident: { colour: '#c2410c' },
  refracted: { colour: '#2563eb' },
  reflected: { colour: '#94a3b8', dash: '5 4' },
}

/**
 * Ray diagram for refraction at a plane boundary.
 *
 * The student drags the incident ray round the normal and watches the refracted ray
 * swing — and, past the critical angle, vanish. That moment is the point of the
 * lesson, so total internal reflection is called out on the canvas itself rather than
 * only in a readout.
 *
 * Angles are drawn from the kernel's geometry, so what a protractor measures here is
 * what Snell's law predicts (asserted in kernel.test.ts).
 */
export function RayTrace({ result, params, onParamChange, spec }: SimViewProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  const bounds = result.bounds ?? { xMin: -1.15, xMax: 1.15, yMin: -1.15, yMax: 1.15 }
  const { xMin, xMax, yMin, yMax } = bounds
  const sx = (x: number) => PAD + ((x - xMin) / (xMax - xMin)) * (W - 2 * PAD)
  const sy = (y: number) => PAD + ((yMax - y) / (yMax - yMin)) * (H - 2 * PAD)

  const goingOut = (params['fromDenser'] ?? 0) >= 0.5
  const isTIR = result.readouts['totalInternalReflection'] === 1
  const dragKey = spec.draggable?.[0]

  // The origin in screen coordinates, as plain numbers — so the drag handler below can
  // depend on stable values rather than on freshly-created scale functions.
  const originX = PAD + ((0 - xMin) / (xMax - xMin)) * (W - 2 * PAD)
  const originY = PAD + ((yMax - 0) / (yMax - yMin)) * (H - 2 * PAD)

  /** Turn a pointer position into an angle from the normal. */
  const pointerToAngle = useCallback(
    (clientX: number, clientY: number): number | null => {
      const svg = svgRef.current
      if (!svg) return null
      const rect = svg.getBoundingClientRect()
      // Map screen pixels back through the viewBox scale to simulation units.
      const px = ((clientX - rect.left) / rect.width) * W
      const py = ((clientY - rect.top) / rect.height) * H
      const dx = px - originX
      // The incident side is above the boundary going in, below coming out.
      const dy = goingOut ? py - originY : originY - py
      if (dy <= 0) return null
      return Math.min(89, Math.max(0, toDegrees(Math.atan2(Math.abs(dx), dy))))
    },
    [goingOut, originX, originY]
  )

  const handlePointer = useCallback(
    (e: React.PointerEvent<SVGSVGElement>) => {
      if (!dragKey || e.buttons === 0) return
      const angle = pointerToAngle(e.clientX, e.clientY)
      if (angle !== null) onParamChange(dragKey, Math.round(angle))
    },
    [dragKey, pointerToAngle, onParamChange]
  )

  const boundaryY = sy(0)
  const denseFill = goingOut ? { y: boundaryY, h: H - boundaryY - PAD + PAD } : { y: PAD, h: 0 }

  return (
    <figure className="m-0">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        className={'w-full touch-none select-none ' + (dragKey ? 'cursor-crosshair' : '')}
        onPointerDown={handlePointer}
        onPointerMove={handlePointer}
        role="img"
        aria-label={`Ray diagram. Angle of incidence ${Math.round(
          result.readouts['angleOfIncidence'] ?? 0
        )} degrees, ${
          isTIR
            ? 'total internal reflection'
            : `angle of refraction ${Math.round(result.readouts['angleOfRefraction'] ?? 0)} degrees`
        }.`}
      >
        {/* The denser medium is shaded, so which side is which is never in doubt. */}
        <rect
          x={PAD}
          y={goingOut ? PAD : boundaryY}
          width={W - 2 * PAD}
          height={goingOut ? boundaryY - PAD : H - PAD - boundaryY}
          fill="#dbeafe"
          opacity={0.75}
        />
        <rect
          x={PAD}
          y={goingOut ? boundaryY : PAD}
          width={W - 2 * PAD}
          height={goingOut ? H - PAD - boundaryY : boundaryY - PAD}
          fill="#f8fafc"
        />
        <rect x={PAD} y={denseFill.y} width={0} height={0} />

        {/* Boundary */}
        <line
          x1={PAD}
          y1={boundaryY}
          x2={W - PAD}
          y2={boundaryY}
          stroke="#334155"
          strokeWidth={2}
        />

        {/* Normal — dashed, as drawn in exam papers */}
        <line
          x1={sx(0)}
          y1={PAD}
          x2={sx(0)}
          y2={H - PAD}
          stroke="#64748b"
          strokeWidth={1}
          strokeDasharray="4 4"
        />
        <text x={sx(0) + 5} y={PAD + 11} fontSize={10} fill="#64748b">
          normal
        </text>

        {/* Angle arcs, drawn before the rays so the rays sit on top */}
        <AngleArc
          cx={sx(0)}
          cy={boundaryY}
          angle={result.readouts['angleOfIncidence'] ?? 0}
          side={goingOut ? 'down' : 'up'}
          direction="left"
          radius={44}
          colour="#c2410c"
          label="i"
        />
        {!isTIR && (
          <AngleArc
            cx={sx(0)}
            cy={boundaryY}
            angle={result.readouts['angleOfRefraction'] ?? 0}
            side={goingOut ? 'up' : 'down'}
            direction="right"
            radius={60}
            colour="#2563eb"
            label="r"
          />
        )}

        {/* Rays */}
        {result.series.map((s) => {
          if (s.points.length < 2) return null
          const style = RAY_STYLE[s.key] ?? { colour: '#334155' }
          const [[x1, y1], [x2, y2]] = [s.points[0]!, s.points[1]!]
          const emphasised = s.key === 'reflected' && isTIR
          return (
            <g key={s.key}>
              <line
                x1={sx(x1)}
                y1={sy(y1)}
                x2={sx(x2)}
                y2={sy(y2)}
                stroke={emphasised ? '#c2410c' : style.colour}
                strokeWidth={emphasised ? 3 : 2.5}
                strokeDasharray={emphasised ? undefined : style.dash}
              />
              <ArrowHead
                x1={sx(x1)}
                y1={sy(y1)}
                x2={sx(x2)}
                y2={sy(y2)}
                colour={emphasised ? '#c2410c' : style.colour}
              />
            </g>
          )
        })}

        {/* Drag handle on the incident ray */}
        {dragKey && result.series[0]!.points.length === 2 && (
          <circle
            cx={sx(result.series[0]!.points[0]![0])}
            cy={sy(result.series[0]!.points[0]![1])}
            r={7}
            fill="#c2410c"
            stroke="#fff"
            strokeWidth={2}
          />
        )}

        {isTIR && (
          <text
            x={W / 2}
            y={H - 6}
            textAnchor="middle"
            fontSize={12}
            fontWeight={600}
            fill="#c2410c"
          >
            Total internal reflection — no ray escapes
          </text>
        )}
      </svg>

      <figcaption className="mt-1 flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-muted">
        <Key colour="#c2410c">incident</Key>
        <Key colour="#2563eb">refracted</Key>
        <Key colour="#94a3b8">reflected</Key>
        {dragKey && <span className="text-ink-soft">drag the orange dot to change the angle</span>}
      </figcaption>
    </figure>
  )
}

function Key({ colour, children }: { colour: string; children: string }) {
  return (
    <span className="inline-flex items-center gap-1">
      <span className="inline-block h-0.5 w-4" style={{ background: colour }} />
      {children}
    </span>
  )
}

function ArrowHead({
  x1,
  y1,
  x2,
  y2,
  colour,
}: {
  x1: number
  y1: number
  x2: number
  y2: number
  colour: string
}) {
  // Placed at the midpoint so it reads as "direction of travel" rather than crowding
  // the boundary where all three rays meet.
  const mx = (x1 + x2) / 2
  const my = (y1 + y2) / 2
  const a = Math.atan2(y2 - y1, x2 - x1)
  const size = 7
  const p = [
    [mx + size * Math.cos(a), my + size * Math.sin(a)],
    [mx - size * 0.5 * Math.cos(a) + size * 0.5 * Math.sin(a), my - size * 0.5 * Math.sin(a) - size * 0.5 * Math.cos(a)],
    [mx - size * 0.5 * Math.cos(a) - size * 0.5 * Math.sin(a), my - size * 0.5 * Math.sin(a) + size * 0.5 * Math.cos(a)],
  ]
  return <polygon points={p.map(([x, y]) => `${x},${y}`).join(' ')} fill={colour} />
}

/** Arc from the normal out to a ray, with its letter — the way exam diagrams mark angles. */
function AngleArc({
  cx,
  cy,
  angle,
  side,
  direction,
  radius,
  colour,
  label,
}: {
  cx: number
  cy: number
  angle: number
  side: 'up' | 'down'
  direction: 'left' | 'right'
  radius: number
  colour: string
  label: string
}) {
  if (angle < 2) return null
  const sign = direction === 'left' ? -1 : 1
  const vertical = side === 'up' ? -1 : 1
  const rad = (angle * Math.PI) / 180

  const start = { x: cx, y: cy + vertical * radius }
  const end = { x: cx + sign * radius * Math.sin(rad), y: cy + vertical * radius * Math.cos(rad) }
  // sweep flips with each mirroring so the arc always bulges the short way round.
  const sweep = (side === 'up' ? 1 : 0) ^ (direction === 'left' ? 1 : 0)

  const mid = rad / 2
  return (
    <g>
      <path
        d={`M${start.x},${start.y} A${radius},${radius} 0 0 ${sweep} ${end.x},${end.y}`}
        fill="none"
        stroke={colour}
        strokeWidth={1.2}
        opacity={0.8}
      />
      <text
        x={cx + sign * (radius + 12) * Math.sin(mid)}
        y={cy + vertical * (radius + 12) * Math.cos(mid) + 4}
        fontSize={12}
        fontStyle="italic"
        fill={colour}
        textAnchor="middle"
      >
        {label}
      </text>
    </g>
  )
}
