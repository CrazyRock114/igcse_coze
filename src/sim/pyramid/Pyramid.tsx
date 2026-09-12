import type { SimViewProps } from '../SimStage'
import { T } from '@/components/i18n/T'
import { ui } from '@/lib/ui-strings'

/**
 * An ecological pyramid.
 *
 * Bars are centred and stacked with the producers at the bottom, so the shape of the whole
 * is what the student reads first — and the shape is the point, because a pyramid of numbers
 * for a woodland is not a pyramid at all.
 *
 * The widths are logarithmic. A pyramid of numbers can run from one oak tree to half a
 * million insects, and drawn to scale every level above the first would be a hairline —
 * which is why textbooks draw pyramids of numbers not to scale at all. The value is printed
 * on each bar, so the number is always available even where the width is only ordinal.
 */

const TINTS = [
  'bg-teal-500/85',
  'bg-sky-500/85',
  'bg-violet-500/85',
  'bg-amber-500/85',
  'bg-rose-500/85',
]

/** Narrowest a bar may be drawn, as a fraction of the widest. */
const MIN_WIDTH = 0.06

/** Prints a value in a form a student would write, without exponent notation. */
function format(value: number): string {
  if (value >= 1_000_000) return `${Number((value / 1_000_000).toFixed(2))} million`
  if (value >= 1000) return value.toLocaleString('en-GB')
  return String(Number(value.toFixed(2)))
}

export function Pyramid({ result }: SimViewProps) {
  const pyramid = result.pyramid
  if (!pyramid) return null

  const values = pyramid.levels.map((l) => Math.max(0, l.value))
  const logs = values.map((v) => Math.log10(v + 1))
  const widest = Math.max(...logs, 1)

  return (
    <figure className="m-0">
      <p className="mb-3 text-sm text-muted">
        <T value={ui.pyramidScale} />
      </p>

      {/* Top of the food chain first, so the drawing reads bottom-up like the diagram. */}
      <ol className="flex flex-col-reverse gap-1.5">
        {pyramid.levels.map((level, i) => {
          const fraction = Math.max(MIN_WIDTH, (logs[i] ?? 0) / widest)
          return (
            <li key={i} className="flex flex-col items-center">
              <div
                className={`flex min-h-11 items-center justify-center rounded px-2 ${TINTS[i % TINTS.length]}`}
                style={{ width: `${(fraction * 100).toFixed(1)}%` }}
              >
                <span className="whitespace-nowrap font-mono text-xs font-semibold text-white">
                  {format(values[i] ?? 0)}
                </span>
              </div>
              <span className="mt-0.5 text-center text-xs text-ink-soft">
                <T value={level.label} />
                {level.detail && (
                  <span className="text-muted">
                    {' · '}
                    <T value={level.detail} />
                  </span>
                )}
              </span>
            </li>
          )
        })}
      </ol>

      <figcaption className="mt-3 text-center text-xs text-muted">{pyramid.unit}</figcaption>

      {(result.markers ?? []).map((marker, i) => (
        <p
          key={i}
          className="mt-3 rounded-lg border border-line bg-canvas px-3 py-2 text-sm font-medium text-ink-soft"
        >
          <T value={marker.label} />
        </p>
      ))}
    </figure>
  )
}
