import { useMemo, useState } from 'react'
import type { PunnettGridExtra, PunnettCross, PunnettParentGenotype, PunnettGamete } from '@/content/types'
import { T } from '@/components/i18n/T'
import { PUNNETT_GRID } from '@/lib/lessonExtrasStrings'

/**
 * An interactive Punnett square (G8 17.1, syllabus 17.4.1–17.4.18).
 * The student picks the cross type and the two parents' genotypes, and
 * the grid updates live to show the offspring genotypes and the ratio.
 *
 * Three cross types are supported (per the G8 syllabus):
 *   - monohybrid dominant/recessive (3:1)
 *   - codominant (1:2:1, e.g. sickle cell)
 *   - sex-linked (X-linked recessive, e.g. colour blindness)
 *
 * For sex-linked, the grid is 4x4 because each parent can contribute
 * X or Y, and the offspring sex depends on which sperm meets the egg.
 */
interface Bilingual {
  en: string
  zh?: string
}

const PARENT_OPTIONS: { value: PunnettParentGenotype; label: Bilingual }[] = [
  { value: 'AA', label: PUNNETT_GRID.autosomalParents.AA },
  { value: 'Aa', label: PUNNETT_GRID.autosomalParents.Aa },
  { value: 'aa', label: PUNNETT_GRID.autosomalParents.aa },
]

const SEX_LINKED_PARENT_OPTIONS: { value: PunnettParentGenotype; label: Bilingual }[] = [
  { value: 'XY', label: PUNNETT_GRID.sexLinkedParents.XY },
  { value: 'XX', label: PUNNETT_GRID.sexLinkedParents.XX },
  { value: 'Xy', label: PUNNETT_GRID.sexLinkedParents.Xy },
  { value: 'Xx', label: PUNNETT_GRID.sexLinkedParents.Xx },
  { value: 'xx', label: PUNNETT_GRID.sexLinkedParents.xx },
]

export function PunnettGrid({ extra }: { extra: PunnettGridExtra }) {
  const [cross, setCross] = useState<PunnettCross>(extra.initialCross)
  const [father, setFather] = useState<PunnettParentGenotype>(extra.initialFather)
  const [mother, setMother] = useState<PunnettParentGenotype>(extra.initialMother)

  const isSexLinked = cross === 'sex-linked'
  const parentOptions = isSexLinked ? SEX_LINKED_PARENT_OPTIONS : PARENT_OPTIONS

  // Reset to valid genotypes when switching cross type
  const onCrossChange = (next: PunnettCross) => {
    setCross(next)
    if (next === 'sex-linked') {
      setFather('XY')
      setMother('Xx')
    } else {
      setFather('Aa')
      setMother('Aa')
    }
  }

  const grid = useMemo(
    () => computeGrid(cross, father, mother),
    [cross, father, mother]
  )

  return (
    <div className="space-y-4">
      <p className="text-sm text-ink-soft">
        <T value={extra.intro} />
      </p>

      <div className="grid gap-3 md:grid-cols-3">
        <Field
          label={PUNNETT_GRID.crossLabel}
          value={cross}
          onChange={(v) => onCrossChange(v as PunnettCross)}
          options={[
            { value: 'monohybrid', label: PUNNETT_GRID.monohybrid },
            { value: 'codominant', label: PUNNETT_GRID.codominant },
            { value: 'sex-linked', label: PUNNETT_GRID.sexLinked },
          ]}
        />
        <Field
          label={PUNNETT_GRID.fatherLabel}
          value={father}
          onChange={(v) => setFather(v as PunnettParentGenotype)}
          options={parentOptions}
        />
        <Field
          label={PUNNETT_GRID.motherLabel}
          value={mother}
          onChange={(v) => setMother(v as PunnettParentGenotype)}
          options={parentOptions}
        />
      </div>

      <GridDisplay grid={grid} />

      <RatioSummary cells={grid.cells} />
    </div>
  )
}

// ---------------------------------------------------------------------------
// Field
// ---------------------------------------------------------------------------

function Field({
  label,
  value,
  onChange,
  options,
}: {
  label: Bilingual
  value: string
  onChange: (v: string) => void
  options: { value: string; label: Bilingual }[]
}) {
  return (
    <label className="block">
      <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted">
        <T value={label} />
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-line bg-surface px-2 py-1.5 text-sm text-ink"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            <T value={o.label} />
          </option>
        ))}
      </select>
    </label>
  )
}

// ---------------------------------------------------------------------------
// Grid display
// ---------------------------------------------------------------------------

function GridDisplay({
  grid,
}: {
  grid: ComputedGrid
}) {
  const n = grid.cells.length
  const cellPx = 96

  return (
    <figure className="m-0 overflow-hidden rounded-lg border border-line bg-canvas">
      <div className="border-b border-line bg-canvas px-3 py-1.5">
        <div className="text-xs font-semibold uppercase tracking-wide text-muted">
          <T value={PUNNETT_GRID.gridHeading} />
        </div>
        <div className="text-sm font-medium text-ink">
          <T value={grid.title} />
        </div>
        <div className="text-xs text-muted">
          <T value={grid.subtitle} />
        </div>
      </div>
      <div className="p-3">
        <div
          className="grid"
          style={{
            gridTemplateColumns: `60px repeat(${n}, ${cellPx}px)`,
            gridTemplateRows: `40px repeat(${n}, ${cellPx}px)`,
            width: 'fit-content',
            margin: '0 auto',
          }}
        >
          {/* row 1: empty + mother gametes (col 1..n) */}
          <div style={{ gridColumn: 1, gridRow: 1 }} />
          {grid.motherGametes.map((g, j) => (
            <div
              key={`m-${j}`}
              style={{
                gridColumn: j + 2,
                gridRow: 1,
                height: 40,
                width: cellPx,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid var(--line, #cbd5e1)',
                background: '#ecfdf5',
                color: '#064e3b',
                fontSize: 16,
                fontWeight: 600,
              }}
            >
              {g}
            </div>
          ))}
          {/* rows 2..n+1: father gamete (col 1) + cells (col 2..n+1) */}
          {grid.fatherGametes.map((g, i) => (
            <FragmentRow
              key={`row-${i}`}
              gamete={g}
              cells={grid.cells[i] ?? []}
              rowIndex={i + 2}
              cellPx={cellPx}
            />
          ))}
        </div>
      </div>
    </figure>
  )
}

function FragmentRow({
  gamete,
  cells,
  rowIndex,
  cellPx,
}: {
  gamete: PunnettGamete
  cells: string[]
  rowIndex: number
  cellPx: number
}) {
  return (
    <>
      <div
        style={{
          gridColumn: 1,
          gridRow: rowIndex,
          height: 96,
          width: 60,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid var(--line, #cbd5e1)',
          background: '#fff1f2',
          color: '#881337',
          fontSize: 16,
          fontWeight: 600,
        }}
      >
        {gamete}
      </div>
      {cells.map((c, j) => (
        <div
          key={`c-${j}`}
          style={{
            gridColumn: j + 2,
            gridRow: rowIndex,
            height: 96,
            width: cellPx,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid var(--line, #cbd5e1)',
            background: '#f8fafc',
            color: '#0f172a',
            fontSize: 18,
            fontWeight: 700,
          }}
        >
          {c}
        </div>
      ))}
    </>
  )
}

// ---------------------------------------------------------------------------
// Ratio summary
// ---------------------------------------------------------------------------

function RatioSummary({ cells }: { cells: string[][] }) {
  const counts: Record<string, number> = {}
  let total = 0
  for (const row of cells) {
    for (const c of row) {
      counts[c] = (counts[c] ?? 0) + 1
      total++
    }
  }
  const entries = Object.entries(counts).sort((a, b) => b[1] - a[1])

  return (
    <div className="rounded-lg border border-line bg-surface p-3">
      <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
        <T value={PUNNETT_GRID.summaryHeading} />
      </div>
      <div className="flex flex-wrap gap-3 text-sm">
        {entries.map(([g, c]) => (
          <span
            key={g}
            className="rounded-md border border-line bg-canvas px-2 py-1 font-medium text-ink"
          >
            {g} × {c}/{total}
          </span>
        ))}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Grid computation
// ---------------------------------------------------------------------------

interface ComputedGrid {
  title: Bilingual
  subtitle: Bilingual
  fatherGametes: PunnettGamete[]
  motherGametes: PunnettGamete[]
  cells: string[][]
}

function computeGrid(
  cross: PunnettCross,
  father: PunnettParentGenotype,
  mother: PunnettParentGenotype
): ComputedGrid {
  if (cross === 'sex-linked') {
    return computeSexLinked(father, mother)
  }
  return computeAutosomal(cross, father, mother)
}

function computeAutosomal(
  cross: PunnettCross,
  father: PunnettParentGenotype,
  mother: PunnettParentGenotype
): ComputedGrid {
  // The gametes: pick A or a from each parent based on genotype
  const fatherGametes: PunnettGamete[] = allelesOf(father)
  const motherGametes: PunnettGamete[] = allelesOf(mother)

  const cells: string[][] = []
  for (const f of fatherGametes) {
    const row: string[] = []
    for (const m of motherGametes) {
      row.push(combine(f, m, cross))
    }
    cells.push(row)
  }

  return {
    title: { en: `${father} × ${mother}`, zh: `${father} × ${mother}` },
    subtitle:
      cross === 'codominant'
        ? PUNNETT_GRID.subtitleCodominant
        : PUNNETT_GRID.subtitleMonohybrid,
    fatherGametes,
    motherGametes,
    cells,
  }
}

function computeSexLinked(
  father: PunnettParentGenotype,
  mother: PunnettParentGenotype
): ComputedGrid {
  // Father: XY or Xy or xx/XX (mapped)
  // Mother: XX, Xx, or xx
  // Each gamete from father is a single chromosome (X or Y)
  // Each gamete from mother is a single X (with or without the allele)
  const fatherGametes: PunnettGamete[] = father === 'XY' ? ['X', 'Y'] : father === 'Xy' ? ['X', 'Y'] : ['X', 'X']
  const motherGametes: PunnettGamete[] = allelesOfMother(mother)

  const cells: string[][] = []
  for (const f of fatherGametes) {
    const row: string[] = []
    for (const m of motherGametes) {
      row.push(combineSexLinked(f, m))
    }
    cells.push(row)
  }

  return {
    title: { en: `${father} × ${mother}`, zh: `${father} × ${mother}` },
    subtitle: PUNNETT_GRID.subtitleSexLinked,
    fatherGametes,
    motherGametes,
    cells,
  }
}

function allelesOf(genotype: PunnettParentGenotype): PunnettGamete[] {
  if (genotype === 'AA') return ['A', 'A']
  if (genotype === 'aa') return ['a', 'a']
  if (genotype === 'Aa') return ['A', 'a']
  // For sex-linked mother: XX, Xx, xx
  if (genotype === 'XX') return ['X', 'X']
  if (genotype === 'Xx') return ['X', 'x']
  if (genotype === 'xx') return ['x', 'x']
  if (genotype === 'XY') return ['X', 'Y']
  if (genotype === 'Xy') return ['X', 'Y']
  return ['A', 'A']
}

function allelesOfMother(genotype: PunnettParentGenotype): PunnettGamete[] {
  if (genotype === 'XX') return ['X', 'X']
  if (genotype === 'Xx') return ['X', 'x']
  if (genotype === 'xx') return ['x', 'x']
  if (genotype === 'XY') return ['X', 'Y']
  if (genotype === 'Xy') return ['X', 'Y']
  return ['X', 'X']
}

function combine(f: string, m: string, cross: PunnettCross): string {
  // For monohybrid: A is dominant. Aa → shows A phenotype.
  // For codominant: Aa → shows both (e.g. sickle cell trait, blood group AB)
  // The genotype string is just the sorted pair of alleles.
  const sorted = [f, m].sort((a, b) => {
    if (a === b) return 0
    return a < b ? -1 : 1
  })
  const genotype = sorted.join('')
  if (cross === 'codominant') {
    return genotype
  }
  // monohybrid: just genotype
  return genotype
}

function combineSexLinked(f: string, m: string): string {
  // f is father's gamete (X or Y), m is mother's (X or x)
  // Result: daughters are fX? no — daughters get X from father + X from mother
  // Sons get Y from father + X from mother
  const child = f + m
  if (f === 'Y') {
    // son
    return child // e.g. YX or Yx
  }
  // daughter
  return child // e.g. XX or Xx
}
