import type { SimViewProps } from '../SimStage'

const W = 500
const H = 300
const PAD = 8

/**
 * Magnetic field lines, with the source drawn in.
 *
 * The lines come from the kernel, traced by integrating the real field, so their spacing
 * carries meaning: crowded near the poles, spread out further away. Arrowheads are placed
 * partway along each line rather than at the end, because field direction is a property of
 * the whole line and students are asked to mark it.
 */
export function Field2D({ result, params, spec }: SimViewProps) {
  const setup = params['setup'] ?? 0
  const bounds = result.bounds ?? { xMin: -3.1, xMax: 3.1, yMin: -2.1, yMax: 2.1 }

  const sx = (x: number) => PAD + ((x - bounds.xMin) / (bounds.xMax - bounds.xMin)) * (W - 2 * PAD)
  const sy = (y: number) => PAD + ((bounds.yMax - y) / (bounds.yMax - bounds.yMin)) * (H - 2 * PAD)

  // Electric and magnetic fields share the geometry but not the iconography.
  if (spec.variant === 'electric') {
    return <ElectricField result={result} setup={setup} sx={sx} sy={sy} />
  }

  const isWire = setup >= 2.5 && setup < 3.5
  const isSolenoid = setup >= 3.5
  const isBar = setup < 0.5
  const isPolePair = setup >= 0.5 && setup < 2.5
  const likePoles = setup >= 0.5 && setup < 1.5

  return (
    <figure className="m-0">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full select-none"
        role="img"
        aria-label={`Magnetic field lines. ${
          isWire
            ? 'Circular field around a current-carrying wire.'
            : isSolenoid
              ? 'Field of a solenoid, uniform inside and like a bar magnet outside.'
              : likePoles
                ? 'Two like poles repelling, with a neutral point between them.'
                : 'Field running from the north pole to the south pole.'
        }`}
      >
        <rect x={0} y={0} width={W} height={H} fill="#f8fafc" />

        {/* Field lines */}
        {result.series.map((s) => {
          if (s.points.length < 2) return null
          const d = s.points
            .map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${sx(x).toFixed(1)},${sy(y).toFixed(1)}`)
            .join(' ')
          return (
            <g key={s.key}>
              <path d={d} fill="none" stroke="#7c3aed" strokeWidth={1.4} opacity={0.85} />
              <LineArrow points={s.points} sx={sx} sy={sy} />
            </g>
          )
        })}

        {/* The source */}
        {isBar && <BarMagnet x1={sx(-1.15)} x2={sx(1.15)} y={sy(0)} />}
        {isPolePair && (
          <>
            <PoleBlock x={sx(-1.1)} y={sy(0)} label="N" colour="#dc2626" />
            <PoleBlock x={sx(1.1)} y={sy(0)} label={likePoles ? 'N' : 'S'} colour={likePoles ? '#dc2626' : '#2563eb'} />
          </>
        )}
        {isSolenoid && <Solenoid x1={sx(-1.05)} x2={sx(1.05)} y={sy(0)} />}
        {isWire && <WireCrossSection x={sx(0)} y={sy(0)} />}

        {likePoles && (
          <text x={sx(0)} y={sy(0) - 26} textAnchor="middle" fontSize={10} fill="#64748b">
            neutral point
          </text>
        )}

        <text x={W / 2} y={H - 6} textAnchor="middle" fontSize={12} fontWeight={600} fill="#334155">
          {isWire
            ? 'Circular field lines — closer together near the wire'
            : isSolenoid
              ? 'Uniform field inside, bar-magnet field outside'
              : likePoles
                ? 'Like poles repel — field lines never meet'
                : 'Field lines run from N to S, crowded where the field is strong'}
        </text>
      </svg>
    </figure>
  )
}

/**
 * Electric field patterns: a point charge, a charged conducting sphere, an unlike pair,
 * and parallel plates.
 *
 * The sphere is worth drawing as a solid: it shows that the lines start at the surface
 * and that there is no field inside a charged conductor, which the point-charge picture
 * cannot say.
 */
function ElectricField({
  result,
  setup,
  sx,
  sy,
}: {
  result: SimViewProps['result']
  setup: number
  sx: (x: number) => number
  sy: (y: number) => number
}) {
  const isPlates = setup >= 2.5
  const isPair = setup >= 1.5 && setup < 2.5
  const isSphere = setup >= 0.5 && setup < 1.5
  const uniform = result.readouts['isUniform'] === 1

  return (
    <figure className="m-0">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full select-none"
        role="img"
        aria-label={
          isPlates
            ? 'Electric field between parallel plates, uniform in the middle.'
            : isPair
              ? 'Electric field between two unlike charges.'
              : 'Radial electric field around a positive charge.'
        }
      >
        <rect x={0} y={0} width={W} height={H} fill="#f8fafc" />

        {result.series.map((s) => {
          if (s.points.length < 2) return null
          const d = s.points
            .map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${sx(x).toFixed(1)},${sy(y).toFixed(1)}`)
            .join(' ')
          return (
            <g key={s.key}>
              <path d={d} fill="none" stroke="#c2410c" strokeWidth={1.4} opacity={0.85} />
              <LineArrow points={s.points} sx={sx} sy={sy} colour="#c2410c" />
            </g>
          )
        })}

        {isPlates && (
          <>
            <Plate x1={sx(-1.5)} x2={sx(1.5)} y={sy(0.55)} sign="+" />
            <Plate x1={sx(-1.5)} x2={sx(1.5)} y={sy(-0.55)} sign="−" />
          </>
        )}
        {isSphere && (
          <g>
            <circle
              cx={sx(0)}
              cy={sy(0)}
              r={sx(0.55) - sx(0)}
              fill="#fecaca"
              stroke="#dc2626"
              strokeWidth={2}
            />
            <text x={sx(0)} y={sy(0) + 5} textAnchor="middle" fontSize={14} fontWeight={700} fill="#991b1b">
              +
            </text>
            <text x={sx(0)} y={sy(0) + 22} textAnchor="middle" fontSize={9} fill="#991b1b">
              no field inside
            </text>
          </g>
        )}
        {!isPlates && !isSphere && (
          <>
            <PointCharge x={sx(isPair ? -1.1 : 0)} y={sy(0)} sign="+" />
            {isPair && <PointCharge x={sx(1.1)} y={sy(0)} sign="−" />}
          </>
        )}

        <text x={W / 2} y={H - 6} textAnchor="middle" fontSize={12} fontWeight={600} fill="#334155">
          {isPlates
            ? uniform
              ? 'Uniform field between the plates — evenly spaced parallel lines'
              : 'Field between parallel plates'
            : isPair
              ? 'Field runs from the positive charge to the negative charge'
              : 'Field lines point away from a positive charge, spreading as they go'}
        </text>
      </svg>
    </figure>
  )
}

function PointCharge({ x, y, sign }: { x: number; y: number; sign: '+' | '−' }) {
  const positive = sign === '+'
  return (
    <g>
      <circle cx={x} cy={y} r={13} fill={positive ? '#dc2626' : '#2563eb'} />
      <text x={x} y={y + 6} textAnchor="middle" fontSize={17} fontWeight={700} fill="#fff">
        {sign}
      </text>
    </g>
  )
}

function Plate({ x1, x2, y, sign }: { x1: number; x2: number; y: number; sign: '+' | '−' }) {
  const positive = sign === '+'
  return (
    <g>
      <rect x={x1} y={y - 5} width={x2 - x1} height={10} fill={positive ? '#dc2626' : '#2563eb'} />
      <text
        x={x1 - 12}
        y={y + 5}
        textAnchor="middle"
        fontSize={16}
        fontWeight={700}
        fill={positive ? '#dc2626' : '#2563eb'}
      >
        {sign}
      </text>
    </g>
  )
}

/** Arrowhead partway along a traced line, showing the field direction. */
function LineArrow({
  points,
  sx,
  sy,
  colour = '#7c3aed',
}: {
  points: Array<[number, number]>
  sx: (x: number) => number
  sy: (y: number) => number
  colour?: string
}) {
  // A third of the way along is usually clear of both the source and the frame edge.
  const i = Math.max(1, Math.floor(points.length * 0.34))
  const a = points[i - 1]!
  const b = points[i]!
  const x = sx(b[0])
  const y = sy(b[1])
  const angle = Math.atan2(sy(b[1]) - sy(a[1]), sx(b[0]) - sx(a[0]))
  const size = 5
  const pts = [
    [x + size * Math.cos(angle), y + size * Math.sin(angle)],
    [
      x - size * 0.6 * Math.cos(angle) + size * 0.6 * Math.sin(angle),
      y - size * 0.6 * Math.sin(angle) - size * 0.6 * Math.cos(angle),
    ],
    [
      x - size * 0.6 * Math.cos(angle) - size * 0.6 * Math.sin(angle),
      y - size * 0.6 * Math.sin(angle) + size * 0.6 * Math.cos(angle),
    ],
  ]
  return <polygon points={pts.map(([px, py]) => `${px},${py}`).join(' ')} fill={colour} />
}

function BarMagnet({ x1, x2, y }: { x1: number; x2: number; y: number }) {
  const h = 30
  const mid = (x1 + x2) / 2
  return (
    <g>
      <rect x={x1} y={y - h / 2} width={mid - x1} height={h} fill="#dc2626" stroke="#7f1d1d" />
      <rect x={mid} y={y - h / 2} width={x2 - mid} height={h} fill="#2563eb" stroke="#1e3a8a" />
      <text x={(x1 + mid) / 2} y={y + 5} textAnchor="middle" fontSize={14} fontWeight={700} fill="#fff">
        N
      </text>
      <text x={(mid + x2) / 2} y={y + 5} textAnchor="middle" fontSize={14} fontWeight={700} fill="#fff">
        S
      </text>
    </g>
  )
}

function PoleBlock({
  x,
  y,
  label,
  colour,
}: {
  x: number
  y: number
  label: string
  colour: string
}) {
  return (
    <g>
      <rect x={x - 15} y={y - 15} width={30} height={30} rx={4} fill={colour} />
      <text x={x} y={y + 6} textAnchor="middle" fontSize={15} fontWeight={700} fill="#fff">
        {label}
      </text>
    </g>
  )
}

/** A solenoid in section: a row of coil turns with the current direction marked. */
function Solenoid({ x1, x2, y }: { x1: number; x2: number; y: number }) {
  const turns = 7
  const h = 34
  const gap = (x2 - x1) / (turns - 1)
  return (
    <g>
      <rect x={x1 - 6} y={y - h / 2 - 4} width={x2 - x1 + 12} height={h + 8} fill="#fff" opacity={0.55} />
      {Array.from({ length: turns }, (_, i) => {
        const cx = x1 + i * gap
        return (
          <g key={i}>
            {/* Dot = current towards you, cross = away — the standard convention */}
            <circle cx={cx} cy={y - h / 2} r={5} fill="#fff" stroke="#334155" strokeWidth={1.4} />
            <circle cx={cx} cy={y - h / 2} r={1.6} fill="#334155" />
            <circle cx={cx} cy={y + h / 2} r={5} fill="#fff" stroke="#334155" strokeWidth={1.4} />
            <line
              x1={cx - 3}
              y1={y + h / 2 - 3}
              x2={cx + 3}
              y2={y + h / 2 + 3}
              stroke="#334155"
              strokeWidth={1.4}
            />
            <line
              x1={cx - 3}
              y1={y + h / 2 + 3}
              x2={cx + 3}
              y2={y + h / 2 - 3}
              stroke="#334155"
              strokeWidth={1.4}
            />
          </g>
        )
      })}
    </g>
  )
}

/** A wire seen end-on, current coming out of the page. */
function WireCrossSection({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={9} fill="#fff" stroke="#334155" strokeWidth={2} />
      <circle cx={x} cy={y} r={2.8} fill="#334155" />
      <text x={x + 15} y={y + 4} fontSize={10} fill="#64748b">
        current out of page
      </text>
    </g>
  )
}
