import { useMemo } from 'react'
import type { Bilingual, SimSeries } from '@/content/types'
import { T } from '@/components/i18n/T'
import { niceAxisMax, niceAxisMin } from '@/lib/units'
import { Plot2D } from './Plot2D'

export const SERIES_COLOURS = ['#2563eb', '#0d9488', '#7c3aed', '#c2410c']

/** Series shown as areas rather than plain lines, keyed by series id. */
const FILLED_SERIES = ['speed']

interface PlotGridProps {
  series: SimSeries[]
  /** Height when a single panel is drawn; two panels shrink automatically. */
  height?: number
  /**
   * Conclusions to print under the plots — which factor is limiting, whether the glucose
   * went into the urine, whether the object is too close to focus.
   *
   * Opt-in, because a primitive that draws its own picture alongside a plot already shows
   * these itself and would otherwise print them twice.
   */
  notes?: Bilingual[]
}

/**
 * Signed axis range for a set of values, snapped to round numbers.
 *
 * Three cases:
 * - all non-negative (a speed–time graph): keep a zero baseline, so a shaded area under
 *   the curve still means something.
 * - roughly balanced about zero (an I–V characteristic): use a symmetric range, so the
 *   origin sits where the axes cross and all four quadrants read naturally.
 * - dips below zero but is not centred on it (a heating curve from −25 °C to 125 °C):
 *   round each end separately. Mirroring the maximum here would give −200 to 200 and
 *   squash the curve into the middle third of the plot.
 */
export function axisRange(values: number[]): { min: number; max: number } {
  const lo = Math.min(...values)
  const hi = Math.max(...values)
  if (lo >= 0) return { min: 0, max: niceAxisMax(hi) }

  const balanced = Math.abs(lo) > 0.4 * Math.abs(hi) && Math.abs(hi) > 0.4 * Math.abs(lo)
  if (balanced) {
    const bound = niceAxisMax(Math.max(Math.abs(lo), Math.abs(hi)))
    return { min: -bound, max: bound }
  }
  return { min: niceAxisMin(lo), max: niceAxisMax(hi) }
}

/**
 * Plots a result's series.
 *
 * Curves that share both axis units go on one set of axes; curves measuring different
 * things get a panel each. That split matters — most of these lessons ask the student to
 * compare two runs, and a comparison spread across two independently scaled panels shows
 * nothing.
 *
 * Lives apart from `SimStage` because it is not only the `plot2d` renderer: a primitive
 * that draws a physical picture can plot alongside it, which is how a molecule's structure
 * and its homologous series' boiling-point trend end up on the same canvas.
 */
export function PlotGrid({ series: allSeries, height = 300, notes = [] }: PlotGridProps) {
  const groups = useMemo(() => {
    // Group by axis units, preserving the order the kernel emitted them in.
    const byUnit = new Map<string, SimSeries[]>()
    for (const s of allSeries) {
      const key = `${s.unit.x}|${s.unit.y}`
      const existing = byUnit.get(key)
      if (existing) existing.push(s)
      else byUnit.set(key, [s])
    }

    return Array.from(byUnit.values()).map((series) => {
      // A series may pin either axis where the quantity has natural bounds the data does
      // not reach — pH stops at 14 whether or not any point gets there.
      const pinnedY = series.find((s) => s.yBounds)?.yBounds
      const pinnedX = series.find((s) => s.xBounds)?.xBounds
      return {
        series,
        x: pinnedX ?? axisRange(series.flatMap((s) => s.points.map(([x]) => x))),
        y: pinnedY ?? axisRange(series.flatMap((s) => s.points.map(([, y]) => y))),
      }
    })
  }, [allSeries])

  return (
    <>
      {/* `[&>*]:min-w-0` for the same reason as the lesson column: a grid track will not
          shrink below its item's intrinsic width, and an SVG always reports one. Two panels
          side by side on a tablet would otherwise force the page wider than the screen. */}
      <div
        className={
          'grid gap-4 [&>*]:min-w-0 ' + (groups.length > 1 ? 'sm:grid-cols-2' : '')
        }
      >
        {groups.map((g) => (
          <Plot2D
            key={g.series.map((s) => s.key).join('+')}
            series={g.series}
            xMin={g.x.min}
            xMax={g.x.max}
            yMin={g.y.min}
            yMax={g.y.max}
            colours={SERIES_COLOURS}
            fillKeys={FILLED_SERIES}
            height={groups.length === 1 ? height : Math.round(height * 0.8)}
          />
        ))}
      </div>

      {notes.length > 0 && (
        <p className="mt-3 rounded-lg border border-line bg-canvas px-3 py-2 text-sm font-medium text-ink-soft">
          {notes.map((note, i) => (
            <span key={i} className="mr-4 inline-block">
              <T value={note} />
            </span>
          ))}
        </p>
      )}
    </>
  )
}
