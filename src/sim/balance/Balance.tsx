import type { SimViewProps } from '../SimStage'
import { T } from '@/components/i18n/T'
import { subscript } from '@/lib/formula'

/**
 * A chemical equation with its atom tally.
 *
 * The equation is drawn as text rather than in an SVG, so that formulae wrap on a phone and
 * the subscripts are real characters a screen reader can read out.
 *
 * The tally beside it is the point of the whole primitive. Balancing is two columns of
 * numbers that have to agree, and a row is marked wrong the moment it disagrees — no
 * accumulating, no revealing at the end. A student who can see that oxygen is 2 against 3
 * knows what to change next.
 *
 * Marker convention: [0] is the word equation, [1] the balance status, [2] the standing note
 * about what may be changed.
 */
/** One side of the equation as words, with the unwritten coefficient of 1 left out. */
function spoken(terms: Array<{ coefficient: number; formula: string }>): string {
  return terms
    .map((t) => (t.coefficient === 1 ? t.formula : `${t.coefficient} ${t.formula}`))
    .join(' plus ')
}

export function Balance({ result }: SimViewProps) {
  const equation = result.equation
  const [word, status, rule] = result.markers ?? []

  if (!equation) {
    return (
      <p className="rounded-lg border border-dashed border-line px-4 py-8 text-center text-sm text-muted">
        This kernel did not return an equation to balance.
      </p>
    )
  }

  const balanced = equation.tally.every((r) => r.left === r.right)

  const side = (terms: typeof equation.left) =>
    terms.map((t, i) => (
      <span key={i} className="whitespace-nowrap">
        {i > 0 && <span className="mx-1.5 text-muted">+</span>}
        {/* A leading 1 is never written in a chemical equation. The space it would occupy
            is still reserved, so the formulae do not jump sideways as coefficients change —
            but the character itself is absent rather than merely invisible, so it does not
            end up in copied text or read out by a screen reader. */}
        <span className="inline-block w-[1ch] text-right font-semibold tabular-nums text-teal-700">
          {t.coefficient === 1 ? '' : t.coefficient}
        </span>
        <span className="text-ink">{subscript(t.formula)}</span>
        <span className="text-xs text-muted">({t.state})</span>
      </span>
    ))

  return (
    <figure className="m-0">
      {word && (
        <p className="mb-3 text-center text-sm text-muted">
          <T value={word.label} />
        </p>
      )}

      <div
        className="flex flex-wrap items-baseline justify-center gap-x-2 gap-y-1 rounded-lg border border-line bg-canvas px-4 py-5 text-lg"
        role="img"
        aria-label={`${spoken(equation.left)} gives ${spoken(equation.right)}`}
      >
        {side(equation.left)}
        <span className="mx-2 text-muted">→</span>
        {side(equation.right)}
      </div>

      <table className="mt-4 w-full border-collapse text-sm">
        <caption className="caption-top pb-2 text-left text-xs text-muted">
          Atoms of each element on each side
        </caption>
        <thead>
          <tr className="text-left text-xs text-muted">
            <th className="border-b border-line py-1 pr-2 font-medium">element</th>
            <th className="border-b border-line py-1 pr-2 font-medium">left</th>
            <th className="border-b border-line py-1 pr-2 font-medium">right</th>
            <th className="border-b border-line py-1 font-medium" />
          </tr>
        </thead>
        <tbody>
          {equation.tally.map((row) => {
            const ok = row.left === row.right
            return (
              <tr key={row.element} className={ok ? '' : 'bg-amber-50'}>
                <td className="border-b border-line py-1 pr-2 font-medium text-ink">
                  {row.element}
                </td>
                <td className="border-b border-line py-1 pr-2 tabular-nums text-ink-soft">
                  {row.left}
                </td>
                <td className="border-b border-line py-1 pr-2 tabular-nums text-ink-soft">
                  {row.right}
                </td>
                <td
                  className={
                    'border-b border-line py-1 ' + (ok ? 'text-teal-700' : 'text-amber-700')
                  }
                >
                  {ok ? '✓' : '✗'}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      {status && (
        <p
          className={
            'mt-3 rounded-lg border px-3 py-2 text-sm font-medium ' +
            (balanced
              ? 'border-teal-200 bg-teal-50 text-teal-900'
              : 'border-amber-200 bg-amber-50 text-amber-900')
          }
        >
          <T value={status.label} />
        </p>
      )}

      {rule && (
        <p className="mt-2 text-sm text-muted">
          <T value={rule.label} />
        </p>
      )}
    </figure>
  )
}

export default Balance
