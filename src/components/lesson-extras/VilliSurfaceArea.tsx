import { useMemo, useState } from 'react'
import type { VilliSurfaceAreaExtra } from '@/content/types'
import { T } from '@/components/i18n/T'
import { VILLI_SURFACE_AREA } from '@/lib/lessonExtrasStrings'

/**
 * Why villi? A flat tube has the surface area you'd expect from its length and radius;
 * cover the inside with finger-like folds and that same tube suddenly has many times
 * more area. The factor matters because absorption happens across this surface, and
 * the more surface, the more nutrients per second the body can pull out.
 *
 * The interactive shows three stages the syllabus wants the student to internalise:
 *  1. Plain tube — the bare area
 *  2. With villi — multiplied by the fold factor (~×6 to ×10 for IGCSE purposes)
 *  3. With microvilli on top — multiplied by a further factor (~×20) to reach the
 *     real-world value of around 250 m², "the size of a tennis court".
 *
 * The student gets a slider on the *number of villi* per cm². Behind the scenes, that
 * number drives the fold factor — the math is the lesson, not the slider. Numbers on
 * the readout are computed, not hard-coded, so tweaking the inputs to a different
 * organism (a rabbit? an elephant?) would just work.
 */
export function VilliSurfaceArea({ extra }: { extra: VilliSurfaceAreaExtra }) {
  const baseArea = 2 * Math.PI * extra.radiusMm * extra.lengthMm
  const [villiPerCm2, setVilliPerCm2] = useState(extra.baselineVilliPerCm2)

  // Fold factor from villi. Real numbers in the small intestine land at 6–10x; we
  // map the slider to a 4–12x range so the student can perturb it.
  const villiFactor = useMemo(() => 4 + (villiPerCm2 / extra.baselineVilliPerCm2) * 6, [villiPerCm2, extra.baselineVilliPerCm2])
  // And the further factor from microvilli on top of the villi. Held at ×20 — that
  // is the part the syllabus does not vary, and changing it would only confuse.
  const microvilliFactor = 20
  const total = baseArea * villiFactor * microvilliFactor

  const baseAreaCm2 = baseArea / 100
  const totalAreaCm2 = total / 100
  const totalAreaM2 = totalAreaCm2 / 10000

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <Stat
          label={<T value={VILLI_SURFACE_AREA.bare} />}
          value={`${baseAreaCm2.toFixed(0)} cm²`}
          note={<T value={VILLI_SURFACE_AREA.bareNote} />}
        />
        <Stat
          label={<T value={VILLI_SURFACE_AREA.withVilli} />}
          value={`${(baseAreaCm2 * villiFactor).toFixed(0)} cm²`}
          note={
            <span>
              × {villiFactor.toFixed(1)} <T value={VILLI_SURFACE_AREA.withVilliNote} />
            </span>
          }
        />
        <Stat
          label={<T value={VILLI_SURFACE_AREA.withMicrovilli} />}
          value={`${totalAreaM2.toFixed(1)} m²`}
          note={<T value={VILLI_SURFACE_AREA.withMicrovilliNote} />}
          highlight
        />
      </div>

      <label className="block">
        <span className="mb-1 block text-xs text-muted">
          <T value={VILLI_SURFACE_AREA.sliderLabel} /> — <span className="font-mono text-ink">{villiPerCm2}</span> / cm²
        </span>
        <input
          type="range"
          min={Math.max(1, Math.round(extra.baselineVilliPerCm2 * 0.3))}
          max={Math.round(extra.baselineVilliPerCm2 * 2.5)}
          step={1}
          value={villiPerCm2}
          onChange={(e) => setVilliPerCm2(Number(e.target.value))}
          className="w-full"
        />
      </label>

      <VillusDiagram
        villiPerCm2={villiPerCm2}
        baseline={extra.baselineVilliPerCm2}
        radiusMm={extra.radiusMm}
      />
    </div>
  )
}

function Stat({
  label,
  value,
  note,
  highlight = false,
}: {
  label: React.ReactNode
  value: string
  note: React.ReactNode
  highlight?: boolean
}) {
  return (
    <div
      className={
        'rounded-lg border p-3 ' +
        (highlight ? 'border-teal-600 bg-teal-50' : 'border-line bg-canvas')
      }
    >
      <div className="text-xs text-muted">{label}</div>
      <div className="mt-0.5 font-mono text-lg font-semibold text-ink">{value}</div>
      <div className="text-[11px] text-muted">{note}</div>
    </div>
  )
}

/**
 * Side-by-side cross-section. Left is a plain circle — the unfolded tube. Right is
 * the same circle with a row of fingers around the inside, each a villus. Drawn as
 * a parametric number of fingers so the slider has something to react to.
 */
function VillusDiagram({
  villiPerCm2,
  baseline,
  radiusMm,
}: {
  villiPerCm2: number
  baseline: number
  radiusMm: number
}) {
  // Density multiplier: 0.3 → 2.5 × baseline
  const density = villiPerCm2 / baseline
  const fingerCount = Math.max(8, Math.round(18 * density))

  return (
    <div className="grid grid-cols-2 gap-3">
      <Figure label={<T value={VILLI_SURFACE_AREA.bare} />} caption={<T value={VILLI_SURFACE_AREA.bareCaption} />}>
        <svg viewBox="0 0 200 200" className="h-44 w-full">
          <circle cx="100" cy="100" r="80" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="2" />
          <text x="100" y="105" textAnchor="middle" fontSize="12" fill="var(--color-muted)">
            r = {radiusMm} mm
          </text>
        </svg>
      </Figure>

      <Figure
        label={<T value={VILLI_SURFACE_AREA.withVilli} />}
        caption={`${fingerCount} fingers in this view — ×${density.toFixed(1)}`}
      >
        <svg viewBox="0 0 200 200" className="h-44 w-full">
          <circle cx="100" cy="100" r="80" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="2" />
          {Array.from({ length: fingerCount }).map((_, i) => {
            const a = (i / fingerCount) * 2 * Math.PI
            const x = 100 + Math.cos(a) * 60
            const y = 100 + Math.sin(a) * 60
            return <circle key={i} cx={x} cy={y} r="11" fill="#fbbf24" stroke="#a16207" strokeWidth="1.5" />
          })}
        </svg>
      </Figure>
    </div>
  )
}

function Figure({ label, caption, children }: { label: React.ReactNode; caption: React.ReactNode; children: React.ReactNode }) {
  return (
    <figure className="m-0 rounded-lg border border-line bg-surface p-2">
      <div className="mb-1 flex items-baseline justify-between text-xs">
        <span className="font-medium text-ink-soft">{label}</span>
      </div>
      {children}
      <figcaption className="mt-1 text-[11px] text-muted">{caption}</figcaption>
    </figure>
  )
}
