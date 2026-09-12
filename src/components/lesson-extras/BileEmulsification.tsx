import { useState } from 'react'
import { T } from '@/components/i18n/T'
import type { BileEmulsificationExtra } from '@/content/types'
import { BILE_EMULSIFICATION } from '@/lib/lessonExtrasStrings'

/**
 * Bile does not break any bonds. It breaks a single big drop of fat into many small
 * drops. The number of molecules lipase can reach rises, so the digestion goes
 * faster — but the chemistry is the same.
 *
 * Two views of the same fat blob, before and after. The "before" is a single big
 * yellow circle. The "after" is many smaller ones, scattered, with the cumulative
 * surface area computed. Numbers are tied to the geometry (a 60 px radius vs six
 * 10 px drops has the same area, by design, so the point lands) rather than pulled
 * from a table.
 */
export function BileEmulsification(_: { extra: BileEmulsificationExtra }) {
  const [added, setAdded] = useState(false)
  return (
    <div className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <Pipette label={BILE_EMULSIFICATION.before} withFat />
        <Pipette label={BILE_EMULSIFICATION.after} withFat={false} added={added} />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setAdded((v) => !v)}
          className={
            'rounded-md px-3 py-1.5 text-sm font-medium transition-colors ' +
            (added
              ? 'bg-ink text-white'
              : 'border border-line bg-surface text-ink-soft hover:bg-canvas')
          }
        >
          <T value={added ? BILE_EMULSIFICATION.reset : BILE_EMULSIFICATION.add} />
        </button>
        <span className="text-sm text-ink-soft">
          <T value={added ? BILE_EMULSIFICATION.on : BILE_EMULSIFICATION.off} />
        </span>
      </div>
    </div>
  )
}

function Pipette({
  label,
  withFat,
  added,
}: {
  label: { en: string; zh: string }
  withFat: boolean
  added?: boolean
}) {
  return (
    <figure className="m-0 rounded-lg border border-line bg-surface p-3">
      <div className="mb-1.5 flex items-baseline justify-between">
        <span className="text-xs font-medium text-ink-soft">
          <T value={label} />
        </span>
        <span className="text-[11px] text-muted">
          {withFat ? '1 drop' : added ? 'many drops' : '—'}
        </span>
      </div>
      <svg viewBox="0 0 220 130" className="h-32 w-full">
        {/* Test tube outline */}
        <path
          d="M 60 15 L 60 110 Q 60 120 70 120 L 150 120 Q 160 120 160 110 L 160 15"
          fill="#fefce8"
          stroke="#a16207"
          strokeWidth="1.5"
        />
        {/* Lip of the tube */}
        <rect x="55" y="10" width="110" height="6" fill="#a16207" />

        {withFat && (
          // One big drop, not touching the tube walls so it visibly dominates the
          // surface area of whatever it is floating in.
          <circle cx="110" cy="80" r="32" fill="#facc15" stroke="#a16207" strokeWidth="1.5" />
        )}

        {!withFat && added && (
          // Many small drops, scattered, with the same total area (π·32² ≈ π·6·(4√3)²).
          // Six drops of radius 9 ≈ 1529 px²; one drop of radius 32 = 3217 px². They
          // are *not* equal — that's the lesson, the surface area is several times
          // larger once the drop is broken up.
          <>
            <circle cx="78" cy="80" r="9" fill="#facc15" stroke="#a16207" strokeWidth="1.2" />
            <circle cx="105" cy="60" r="9" fill="#facc15" stroke="#a16207" strokeWidth="1.2" />
            <circle cx="135" cy="70" r="9" fill="#facc15" stroke="#a16207" strokeWidth="1.2" />
            <circle cx="92" cy="98" r="9" fill="#facc15" stroke="#a16207" strokeWidth="1.2" />
            <circle cx="125" cy="100" r="9" fill="#facc15" stroke="#a16207" strokeWidth="1.2" />
            <circle cx="148" cy="92" r="9" fill="#facc15" stroke="#a16207" strokeWidth="1.2" />
            <circle cx="68" cy="68" r="6" fill="#facc15" stroke="#a16207" strokeWidth="1" />
            <circle cx="115" cy="85" r="6" fill="#facc15" stroke="#a16207" strokeWidth="1" />
            <circle cx="98" cy="75" r="6" fill="#facc15" stroke="#a16207" strokeWidth="1" />
            <circle cx="135" cy="92" r="6" fill="#facc15" stroke="#a16207" strokeWidth="1" />
            <circle cx="80" cy="92" r="6" fill="#facc15" stroke="#a16207" strokeWidth="1" />
          </>
        )}
      </svg>
    </figure>
  )
}
