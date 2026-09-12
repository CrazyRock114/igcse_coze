import { useMemo } from 'react'
import type { SimSeries } from '@/content/types'
import { useBilingualText } from '@/components/i18n/T'

interface Plot2DProps {
  /** One or more curves. Several are drawn on shared axes with a legend. */
  series: SimSeries[]
  /** Axis extents. Mins default to 0; pass negatives for graphs like I–V that cross it. */
  xMax: number
  yMax: number
  xMin?: number
  yMin?: number
  colours: string[]
  /** Keys of series whose area under the curve should be shaded. */
  fillKeys?: string[]
  height?: number
  /** Caption under the plot. Omitted when the legend already names the curves. */
  caption?: string
}

// The top padding carries the y-axis label on its own line. Sitting it beside the topmost
// tick, as is tempting, works only while every unit is one or two characters — anything
// like "energy / kJ mol⁻¹" then runs straight over the tick value.
const PADDING = { top: 24, right: 18, bottom: 34, left: 50 }

/**
 * Axis tick label. Axis extents are already round numbers, so quarter divisions of them
 * are too — `toPrecision` would render those as "1.0e+2", which is not what a student
 * reads off graph paper.
 */
function tickLabel(value: number): string {
  if (value === 0) return '0'
  const abs = Math.abs(value)
  // Only abbreviate past five digits. Four fit comfortably, and a year must never be
  // rendered as "1.75k".
  if (abs >= 10000) return `${value / 1000}k`
  if (Number.isInteger(value)) return String(value)
  return String(Number(value.toFixed(2)))
}

/**
 * A 2-D line graph, drawn as SVG.
 *
 * SVG rather than a charting library on purpose: these graphs must look like the ones in
 * an exam paper — visible axes, labelled units, gridlines a student could count squares
 * on — and that is easier to control directly than to configure.
 *
 * Curves sharing units are drawn on one set of axes. That is not a cosmetic choice: half
 * these lessons ask the student to *compare* two runs, and a comparison split across two
 * panels with independently scaled axes is no comparison at all.
 *
 * Axes pass through the origin when the range spans it, so an I–V characteristic shows
 * all four quadrants the way the syllabus prints it.
 */
export function Plot2D({
  series,
  xMax,
  yMax,
  xMin = 0,
  yMin = 0,
  colours,
  fillKeys = [],
  height = 240,
  caption,
}: Plot2DProps) {
  const width = 460
  const plotW = width - PADDING.left - PADDING.right
  const plotH = height - PADDING.top - PADDING.bottom

  const first = series[0]
  const label = useBilingualText(first?.label ?? { en: '' })

  const paths = useMemo(() => {
    const sx = (x: number) => PADDING.left + ((x - xMin) / (xMax - xMin || 1)) * plotW
    const sy = (y: number) => PADDING.top + plotH - ((y - yMin) / (yMax - yMin || 1)) * plotH

    return series.map((s) => {
      const d = s.points
        .map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${sx(x).toFixed(2)},${sy(y).toFixed(2)}`)
        .join(' ')

      const a = s.points[0]
      const b = s.points[s.points.length - 1]
      const area =
        a && b
          ? `${d} L${sx(b[0]).toFixed(2)},${sy(0).toFixed(2)} L${sx(a[0]).toFixed(2)},${sy(0).toFixed(2)} Z`
          : d

      return { key: s.key, d, area }
    })
  }, [series, xMin, xMax, yMin, yMax, plotW, plotH])

  const sx = (x: number) => PADDING.left + ((x - xMin) / (xMax - xMin || 1)) * plotW
  const sy = (y: number) => PADDING.top + plotH - ((y - yMin) / (yMax - yMin || 1)) * plotH

  // Five gridlines each way — close enough to an exam grid to count squares on.
  const fractions = [0, 0.25, 0.5, 0.75, 1]

  // Axes sit on the origin when it is in range, otherwise on the edge of the plot.
  const axisX = xMin <= 0 && xMax >= 0 ? sx(0) : PADDING.left
  const axisY = yMin <= 0 && yMax >= 0 ? sy(0) : PADDING.top + plotH

  const showLegend = series.length > 1

  // Guides belong to the panel, not to one curve, so they are collected across every series
  // sharing it — a kernel should not have to decide which of two curves carries the line.
  const guides = series.flatMap((s) => s.guides ?? [])

  return (
    <figure className="m-0">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full"
        role="img"
        aria-label={
          showLegend
            ? `Graph of ${series.map((s) => s.label.en).join(' and ')}, ${first?.unit.y} against ${first?.unit.x}`
            : `${label} graph, ${first?.unit.y} against ${first?.unit.x}`
        }
      >
        {fractions.map((f) => {
          const gx = PADDING.left + f * plotW
          const gy = PADDING.top + plotH - f * plotH
          return (
            <g key={f}>
              <line
                x1={PADDING.left}
                y1={gy}
                x2={PADDING.left + plotW}
                y2={gy}
                stroke="#e2e8f0"
                strokeWidth={1}
              />
              <line
                x1={gx}
                y1={PADDING.top}
                x2={gx}
                y2={PADDING.top + plotH}
                stroke="#e2e8f0"
                strokeWidth={1}
              />
              <text x={PADDING.left - 6} y={gy + 3} textAnchor="end" fontSize={10} fill="#64748b">
                {tickLabel(yMin + f * (yMax - yMin))}
              </text>
              <text
                x={gx}
                y={PADDING.top + plotH + 14}
                textAnchor="middle"
                fontSize={10}
                fill="#64748b"
              >
                {tickLabel(xMin + f * (xMax - xMin))}
              </text>
            </g>
          )
        })}

        {/* Axes, on top of the gridlines */}
        <line
          x1={axisX}
          y1={PADDING.top}
          x2={axisX}
          y2={PADDING.top + plotH}
          stroke="#334155"
          strokeWidth={1.5}
        />
        <line
          x1={PADDING.left}
          y1={axisY}
          x2={PADDING.left + plotW}
          y2={axisY}
          stroke="#334155"
          strokeWidth={1.5}
        />

        {/* Reference lines, under the curves so they never obscure the data. Drawn amber
            and dashed so they read as annotation rather than as a second curve. */}
        {guides.map((g, i) => {
          const inRange =
            g.axis === 'x' ? g.value >= xMin && g.value <= xMax : g.value >= yMin && g.value <= yMax
          if (!inRange) return null

          const vertical = g.axis === 'x'
          const px = vertical ? sx(g.value) : 0
          const py = vertical ? 0 : sy(g.value)
          return (
            <g key={i}>
              <line
                x1={vertical ? px : PADDING.left}
                y1={vertical ? PADDING.top : py}
                x2={vertical ? px : PADDING.left + plotW}
                y2={vertical ? PADDING.top + plotH : py}
                stroke="#d97706"
                strokeWidth={1.2}
                strokeDasharray="4 3"
              />
              {g.label && (
                <text
                  x={vertical ? px + 4 : PADDING.left + plotW - 3}
                  y={vertical ? PADDING.top + 10 : py - 4}
                  textAnchor={vertical ? 'start' : 'end'}
                  fontSize={9}
                  fill="#b45309"
                >
                  {g.label}
                </text>
              )}
            </g>
          )
        })}

        {paths.map((p, i) => {
          const colour = colours[i % colours.length]!
          return (
            <g key={p.key}>
              {fillKeys.includes(p.key) && <path d={p.area} fill={colour} opacity={0.14} />}
              <path
                d={p.d}
                fill="none"
                stroke={colour}
                strokeWidth={2.5}
                strokeLinejoin="round"
                // A reference curve is dashed, so the two read apart even in greyscale.
                strokeDasharray={p.key === 'reference' ? '6 4' : undefined}
              />
            </g>
          )
        })}

        <text
          x={PADDING.left + plotW}
          y={PADDING.top + plotH + 30}
          textAnchor="end"
          fontSize={11}
          fill="#334155"
        >
          {first?.unit.x}
        </text>
        <text x={6} y={11} fontSize={11} fill="#334155">
          {first?.unit.y}
        </text>
      </svg>

      {showLegend ? (
        <figcaption className="mt-1 flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-ink-soft">
          {series.map((s, i) => (
            <span key={s.key} className="inline-flex items-center gap-1.5">
              <span
                className="inline-block h-0.5 w-5"
                style={
                  // The swatch is dashed for a reference curve, to match how it is drawn.
                  // A solid swatch beside a dashed line is the sort of small mismatch that
                  // makes a reader doubt they are looking at the same curve.
                  s.key === 'reference'
                    ? {
                        backgroundImage: `repeating-linear-gradient(to right, ${colours[i % colours.length]} 0 4px, transparent 4px 7px)`,
                        opacity: 0.75,
                      }
                    : { background: colours[i % colours.length] }
                }
              />
              {s.label.en}
            </span>
          ))}
        </figcaption>
      ) : (
        <figcaption className="mt-1 text-center text-xs font-medium text-ink-soft">
          {caption ?? label}
        </figcaption>
      )}
    </figure>
  )
}
