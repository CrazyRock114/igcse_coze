import type { SimViewProps } from '../SimStage'
import { formatSigFigs } from '@/lib/units'

const W = 500
const H = 320

/** A wire path in view coordinates. Charge dots are placed along it by fraction. */
type Path = Array<[number, number]>

/**
 * Length-parameterised point on a polyline.
 *
 * Charge must drift at a constant apparent speed round the loop, so the fraction has to
 * index arc length rather than segment number — otherwise dots would sprint along short
 * segments and crawl along long ones.
 */
function pointAt(path: Path, fraction: number): [number, number] {
  if (path.length < 2) return path[0] ?? [0, 0]

  const lengths: number[] = []
  let total = 0
  for (let i = 1; i < path.length; i++) {
    const l = Math.hypot(path[i]![0] - path[i - 1]![0], path[i]![1] - path[i - 1]![1])
    lengths.push(l)
    total += l
  }
  if (total === 0) return path[0]!

  let target = (fraction - Math.floor(fraction)) * total
  for (let i = 0; i < lengths.length; i++) {
    if (target <= lengths[i]!) {
      const s = lengths[i]! === 0 ? 0 : target / lengths[i]!
      const a = path[i]!
      const b = path[i + 1]!
      return [a[0] + (b[0] - a[0]) * s, a[1] + (b[1] - a[1]) * s]
    }
    target -= lengths[i]!
  }
  return path[path.length - 1]!
}

function d(path: Path): string {
  return path.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x},${y}`).join(' ')
}

/**
 * Series and parallel circuit diagrams with live meters and drifting charge.
 *
 * Drawn with the symbols used in exam papers — a cell as long and short bars, resistors
 * as plain rectangles, meters as labelled circles — because part of what is assessed is
 * reading a circuit diagram, not just the arithmetic.
 *
 * The moving dots do the teaching the numbers cannot: in series they move in lockstep
 * everywhere, and in parallel the main wire carries visibly more of them than either
 * branch.
 */
export function Circuit({ result, params }: SimViewProps) {
  const isParallel = (params['parallel'] ?? 0) >= 0.5
  const r = result.readouts

  // --- geometry -------------------------------------------------------------
  // Series: one loop, both resistors on the top wire.
  // Parallel: the loop splits between two junctions, one resistor on each branch.
  const L = 60
  const R = W - 60
  const TOP = 70
  const BOT = 250
  const JL = 190 // left junction
  const JR = 330 // right junction
  const MID = 160 // lower branch in the parallel layout

  const seriesLoop: Path = [
    [L, BOT],
    [L, TOP],
    [R, TOP],
    [R, BOT],
    [L, BOT],
  ]

  // Main path in parallel: supply out to the split, and back from the join.
  const parallelMain: Path = [
    [L, BOT],
    [L, TOP],
    [JL, TOP],
  ]
  const parallelReturn: Path = [
    [JR, TOP],
    [R, TOP],
    [R, BOT],
    [L, BOT],
  ]
  const branchTop: Path = [
    [JL, TOP],
    [JR, TOP],
  ]
  const branchLower: Path = [
    [JL, TOP],
    [JL, MID],
    [JR, MID],
    [JR, TOP],
  ]

  const paths: Record<string, Path> = isParallel
    ? { main: [...parallelMain, ...parallelReturn.slice(1)], r1: branchTop, r2: branchLower }
    : { main: seriesLoop, r1: seriesLoop, r2: seriesLoop }

  // In series all three "branches" are the same loop, so drawing dots for each would
  // treble them. One set is the honest picture: one current, one stream of charge.
  const dotBranches = isParallel ? ['main', 'r1', 'r2'] : ['main']

  const r1Pos: [number, number] = isParallel ? [(JL + JR) / 2, TOP] : [L + (R - L) * 0.3, TOP]
  const r2Pos: [number, number] = isParallel ? [(JL + JR) / 2, MID] : [L + (R - L) * 0.7, TOP]

  return (
    <figure className="m-0">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full select-none"
        role="img"
        aria-label={`${isParallel ? 'Parallel' : 'Series'} circuit. Supply current ${formatSigFigs(
          r['supplyCurrent'] ?? 0,
          2
        )} amps, total resistance ${formatSigFigs(r['totalResistance'] ?? 0, 3)} ohms.`}
      >
        {/* Wires */}
        {isParallel ? (
          <>
            <path d={d(parallelMain)} fill="none" stroke="#334155" strokeWidth={2.5} />
            <path d={d(parallelReturn)} fill="none" stroke="#334155" strokeWidth={2.5} />
            <path d={d(branchTop)} fill="none" stroke="#334155" strokeWidth={2.5} />
            <path d={d(branchLower)} fill="none" stroke="#334155" strokeWidth={2.5} />
            {/* Junction dots, so the split is unambiguous */}
            <circle cx={JL} cy={TOP} r={4} fill="#334155" />
            <circle cx={JR} cy={TOP} r={4} fill="#334155" />
          </>
        ) : (
          <path d={d(seriesLoop)} fill="none" stroke="#334155" strokeWidth={2.5} />
        )}

        {/* Drifting charge */}
        {dotBranches.flatMap((branch) =>
          (result.bodies ?? [])
            .filter((b) => b.kind === branch)
            .map((b, i) => {
              const [x, y] = pointAt(paths[branch]!, b.x)
              return <circle key={`${branch}-${i}`} cx={x} cy={y} r={3.4} fill="#2563eb" />
            })
        )}

        {/* Cell, on the left-hand wire */}
        <Cell x={L} y={(TOP + BOT) / 2} emf={params['emf'] ?? 0} />

        {/* Resistors. Readings sit below each one, which is clear space in both layouts. */}
        <Resistor
          x={r1Pos[0]}
          y={r1Pos[1]}
          label="R₁"
          ohms={params['r1'] ?? 0}
          current={r['i1'] ?? 0}
          pd={r['v1'] ?? 0}
        />
        <Resistor
          x={r2Pos[0]}
          y={r2Pos[1]}
          label="R₂"
          ohms={params['r2'] ?? 0}
          current={r['i2'] ?? 0}
          pd={r['v2'] ?? 0}
        />

        {/* Ammeter in series with the supply — that is where an ammeter belongs */}
        <Meter
          x={(L + R) / 2}
          y={BOT}
          kind="A"
          reading={`${formatSigFigs(r['supplyCurrent'] ?? 0, 2)} A`}
          below
        />

        {/* Voltmeter across R₁ — in parallel with the component, never in series */}
        <Voltmeter
          x={r1Pos[0]}
          y={r1Pos[1]}
          reading={`${formatSigFigs(r['v1'] ?? 0, 2)} V`}
          dropTo={TOP - 38}
        />

        <text x={W / 2} y={H - 8} textAnchor="middle" fontSize={12} fontWeight={600} fill="#334155">
          {isParallel
            ? 'Parallel — same p.d. across each branch, currents add up'
            : 'Series — same current everywhere, p.d.s add up'}
        </text>
      </svg>

      <figcaption className="mt-1 text-center text-xs text-muted">
        Blue dots are flowing charge — more dots means more current
      </figcaption>
    </figure>
  )
}

function Cell({ x, y, emf }: { x: number; y: number; emf: number }) {
  return (
    <g>
      {/* Break the wire so the cell sits in it */}
      <rect x={x - 11} y={y - 13} width={22} height={26} fill="#f8fafc" />
      {/* Long bar = positive terminal, short bar = negative */}
      <line x1={x - 11} y1={y - 13} x2={x + 11} y2={y - 13} stroke="#334155" strokeWidth={3} />
      <line x1={x - 5} y1={y + 5} x2={x + 5} y2={y + 5} stroke="#334155" strokeWidth={3} />
      <text x={x - 18} y={y + 4} textAnchor="end" fontSize={11} fill="#334155">
        {formatSigFigs(emf, 2)} V
      </text>
    </g>
  )
}

function Resistor({
  x,
  y,
  label,
  ohms,
  current,
  pd,
}: {
  x: number
  y: number
  label: string
  ohms: number
  current: number
  pd: number
}) {
  return (
    <g>
      <rect x={x - 26} y={y - 9} width={52} height={18} fill="#fff" stroke="#334155" strokeWidth={2} />
      <text x={x} y={y + 4} textAnchor="middle" fontSize={11} fontWeight={600} fill="#334155">
        {formatSigFigs(ohms, 2)} Ω
      </text>
      <text
        x={x + 34}
        y={y + 4}
        fontSize={11}
        fontStyle="italic"
        fill="#64748b"
        textAnchor="start"
      >
        {label}
      </text>
      {/* Per-component readings, placed clear of the wire */}
      <text x={x} y={y + 24} textAnchor="middle" fontSize={10} fill="#0d9488">
        {formatSigFigs(current, 2)} A · {formatSigFigs(pd, 2)} V
      </text>
    </g>
  )
}

function Meter({
  x,
  y,
  kind,
  reading,
  below,
}: {
  x: number
  y: number
  kind: 'A' | 'V'
  reading: string
  below?: boolean
}) {
  return (
    <g>
      <circle cx={x} cy={y} r={16} fill="#fff" stroke="#334155" strokeWidth={2} />
      <text x={x} y={y + 5} textAnchor="middle" fontSize={13} fontWeight={700} fill="#334155">
        {kind}
      </text>
      {/* Below for the ammeter in the bottom wire; beside for the voltmeter, whose
          circle sits near the top edge where there is no room above it. */}
      {below ? (
        <text x={x} y={y + 32} textAnchor="middle" fontSize={11} fontWeight={600} fill="#c2410c">
          {reading}
        </text>
      ) : (
        <text x={x + 22} y={y + 4} fontSize={11} fontWeight={600} fill="#c2410c">
          {reading}
        </text>
      )}
    </g>
  )
}

/** A voltmeter is wired in parallel with the component it measures. */
function Voltmeter({
  x,
  y,
  reading,
  dropTo,
}: {
  x: number
  y: number
  reading: string
  dropTo: number
}) {
  return (
    <g>
      <path
        d={`M${x - 26},${y} L${x - 26},${dropTo} L${x + 26},${dropTo} L${x + 26},${y}`}
        fill="none"
        stroke="#94a3b8"
        strokeWidth={1.5}
      />
      <Meter x={x} y={dropTo} kind="V" reading={reading} />
    </g>
  )
}
