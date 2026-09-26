/**
 * Hand-drawn style inline SVG art for each apparatus id.
 * One export per instrument, all stroke-based so they follow text colour.
 */
export function ApparatusArt({ id }: { id: string }) {
  switch (id) {
    case 'beaker':
      return (
        <svg viewBox="0 0 64 64" className="h-14 w-14" aria-hidden>
          <path d="M18 10h28v38a6 6 0 0 1-6 6H24a6 6 0 0 1-6-6z" fill="none" stroke="currentColor" strokeWidth="2.5" />
          <path d="M20 40h24" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
          <path d="M20 34h24v14a6 6 0 0 1-6 6H26a6 6 0 0 1-6-6z" fill="currentColor" opacity="0.15" stroke="none" />
          <path d="M46 14l4 4" stroke="currentColor" strokeWidth="2" />
        </svg>
      )
    case 'measuring-cylinder':
      return (
        <svg viewBox="0 0 64 64" className="h-14 w-14" aria-hidden>
          <path d="M24 8h16v44a4 4 0 0 1-4 4h-8a4 4 0 0 1-4-4z" fill="none" stroke="currentColor" strokeWidth="2.5" />
          <path d="M24 14h16" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
          <path d="M26 50h12M26 44h12M26 38h12M26 32h12M26 26h12M26 20h12" stroke="currentColor" strokeWidth="1.2" opacity="0.7" />
          <path d="M25.5 36h13v16a4 4 0 0 1-4 4h-5a4 4 0 0 1-4-4z" fill="currentColor" opacity="0.15" stroke="none" />
          <ellipse cx="32" cy="36" rx="6.5" ry="1.5" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.7" />
        </svg>
      )
    case 'thermometer':
      return (
        <svg viewBox="0 0 64 64" className="h-14 w-14" aria-hidden>
          <circle cx="32" cy="50" r="7" fill="none" stroke="currentColor" strokeWidth="2.5" />
          <path d="M29 46V12a3 3 0 0 1 6 0v34" fill="none" stroke="currentColor" strokeWidth="2.5" />
          <path d="M31 44V20h2v24" fill="currentColor" opacity="0.35" stroke="none" />
          <path d="M36 16h6M36 22h6M36 28h6M36 34h6" stroke="currentColor" strokeWidth="1.2" opacity="0.7" />
        </svg>
      )
    case 'ruler':
      return (
        <svg viewBox="0 0 64 64" className="h-14 w-14" aria-hidden>
          <rect x="6" y="24" width="52" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="2.5" />
          <path d="M14 24v6M22 24v6M30 24v6M38 24v6M46 24v6M54 24v6M18 24v3M26 24v3M34 24v3M42 24v3M50 24v3" stroke="currentColor" strokeWidth="1.2" opacity="0.7" />
        </svg>
      )
    case 'stopwatch':
      return (
        <svg viewBox="0 0 64 64" className="h-14 w-14" aria-hidden>
          <circle cx="32" cy="36" r="20" fill="none" stroke="currentColor" strokeWidth="2.5" />
          <path d="M32 36V22M32 36l9 6" stroke="currentColor" strokeWidth="2" />
          <path d="M28 10h8M32 10v6M50 18l4 4M10 18l-4 4" stroke="currentColor" strokeWidth="2.5" />
        </svg>
      )
    case 'balance':
      return (
        <svg viewBox="0 0 64 64" className="h-14 w-14" aria-hidden>
          <rect x="10" y="22" width="44" height="14" rx="3" fill="none" stroke="currentColor" strokeWidth="2.5" />
          <rect x="20" y="14" width="24" height="8" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M22 36v14M42 36v14M14 50h36" stroke="currentColor" strokeWidth="2.5" />
          <circle cx="32" cy="29" r="2" fill="currentColor" />
        </svg>
      )
    case 'burette':
      return (
        <svg viewBox="0 0 64 64" className="h-14 w-14" aria-hidden>
          <path d="M27 6h10v40h-10z" fill="none" stroke="currentColor" strokeWidth="2.5" />
          <path d="M28 14h8M28 20h8M28 26h8M28 32h8M28 38h8" stroke="currentColor" strokeWidth="1" opacity="0.7" />
          <path d="M27 46h10l-4 8h-2z" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="32" cy="43" r="2.5" fill="currentColor" opacity="0.4" stroke="none" />
        </svg>
      )
    case 'pipette':
      return (
        <svg viewBox="0 0 64 64" className="h-14 w-14" aria-hidden>
          <path d="M30 6c0 14 2 24 2 32v14a2 2 0 0 0 4 0V38c0-8 2-18 2-32z" fill="none" stroke="currentColor" strokeWidth="2.5" />
          <path d="M29 44h10" stroke="currentColor" strokeWidth="1.2" opacity="0.7" />
          <circle cx="32" cy="30" r="2" fill="currentColor" opacity="0.4" stroke="none" />
        </svg>
      )
    default:
      return null
  }
}
