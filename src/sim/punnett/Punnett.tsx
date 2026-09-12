import type { SimViewProps } from '../SimStage'
import { T } from '@/components/i18n/T'
import { ui } from '@/lib/ui-strings'

/**
 * A Punnett square.
 *
 * Drawn as a real table rather than as SVG, because that is what it is: a small grid of
 * text with two headers. A table also reads correctly to a screen reader and reflows on a
 * phone, neither of which an SVG of the same thing would do.
 *
 * Each cell is tinted by the phenotype it produces, and the tally underneath counts them.
 * The colour is doing the work that a student normally does by hand and gets wrong — seeing
 * that three of these four squares are the same outcome even though only two of them carry
 * the same letters.
 */

/** Tints for the phenotype groups, in the order the kernel lists them. */
const TINTS = [
  'bg-teal-100 text-teal-900 border-teal-300',
  'bg-violet-100 text-violet-900 border-violet-300',
  'bg-amber-100 text-amber-900 border-amber-300',
  'bg-sky-100 text-sky-900 border-sky-300',
]

export function Punnett({ result }: SimViewProps) {
  const grid = result.grid
  if (!grid) return null

  const tintOf = (genotype: string) => {
    const index = grid.groups.findIndex((g) => g.id === grid.groupOf[genotype])
    return TINTS[index < 0 ? 0 : index % TINTS.length]
  }

  const counts = grid.groups.map((group) => ({
    ...group,
    n: grid.cells.flat().filter((c) => grid.groupOf[c] === group.id).length,
  }))

  return (
    <figure className="m-0">
      <p className="mb-3 text-sm text-muted">
        <T value={ui.punnettHint} />
      </p>

      <div className="overflow-x-auto">
        <table className="border-separate border-spacing-1 text-center">
          <caption className="sr-only">
            <T value={ui.punnettCaption} />
          </caption>
          <thead>
            <tr>
              {/* Two leading blanks, not one: every body row begins with the mother's
                  label and then her gamete, so a single spacer here would shift every
                  column heading one cell to the left of the squares it names. */}
              <td />
              <td />
              <th
                scope="colgroup"
                colSpan={grid.columns.length}
                className="pb-1 text-xs font-medium text-muted"
              >
                <T value={grid.columnsLabel} />
              </th>
            </tr>
            <tr>
              {/* Two leading blanks, not one: every body row begins with the mother's
                  label and then her gamete, so a single spacer here would shift every
                  column heading one cell to the left of the squares it names. */}
              <td />
              <td />
              {grid.columns.map((allele, i) => (
                <th
                  key={`${allele}-${i}`}
                  scope="col"
                  className="w-20 rounded-lg bg-surface px-3 py-2 font-mono text-base font-semibold text-ink"
                >
                  {allele}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {grid.rows.map((rowAllele, r) => (
              <tr key={`${rowAllele}-${r}`}>
                {r === 0 && (
                  <th
                    scope="rowgroup"
                    rowSpan={grid.rows.length}
                    className="pr-1 align-middle text-xs font-medium text-muted"
                  >
                    {/* Written down the side, so it does not force the table wide. */}
                    <span className="block max-w-16 leading-tight">
                      <T value={grid.rowsLabel} />
                    </span>
                  </th>
                )}
                <th
                  scope="row"
                  className="w-20 rounded-lg bg-surface px-3 py-2 font-mono text-base font-semibold text-ink"
                >
                  {rowAllele}
                </th>
                {(grid.cells[r] ?? []).map((genotype, c) => (
                  <td
                    key={`${genotype}-${c}`}
                    className={`w-20 rounded-lg border px-3 py-3 font-mono text-lg font-semibold ${tintOf(genotype)}`}
                  >
                    {genotype}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {(result.markers ?? []).map((marker, i) => (
        <p
          key={i}
          className="mt-4 rounded-lg border border-line bg-canvas px-3 py-2 text-sm font-medium text-ink-soft"
        >
          <T value={marker.label} />
        </p>
      ))}

      <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-sm">
        {counts.map((group, i) => (
          <li key={group.id} className="inline-flex items-center gap-2">
            <span
              className={`inline-block h-3 w-3 rounded border ${TINTS[i % TINTS.length]}`}
              aria-hidden
            />
            <T value={group.label} />
            <span className="font-mono text-xs text-muted">{group.n}/4</span>
          </li>
        ))}
      </ul>
    </figure>
  )
}
