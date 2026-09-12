/**
 * Numbers, units and significant figures, IGCSE-style.
 *
 * Significant figures are assessed content in this course (Papers 5 and 6 award
 * marks for them), so formatting is a shared, tested utility rather than an
 * ad-hoc `toFixed()` sprinkled through components.
 */

/**
 * Round to a number of significant figures.
 *
 * `toSigFigs(0.0004567, 2)` → `0.00046`
 * `toSigFigs(40.82, 3)`     → `40.8`
 */
export function toSigFigs(value: number, sigFigs: number): number {
  if (!Number.isFinite(value)) return value
  if (value === 0) return 0
  if (sigFigs < 1) throw new RangeError(`sigFigs must be at least 1, got ${sigFigs}`)

  // `toPrecision` rather than multiply-round-divide. Scaling by 10**(n - 1 - magnitude)
  // and dividing back reintroduces floating-point error for large values — 123456 to
  // 2 s.f. came back as 120000.00000000001 on some platforms but exactly 120000 on
  // others, which is precisely the kind of bug that hides until CI runs on a different
  // machine. `toPrecision` rounds in decimal and `Number` parses the result exactly.
  return Number(value.toPrecision(sigFigs))
}

/**
 * Format a value to a fixed number of significant figures, keeping trailing zeros.
 *
 * Trailing zeros matter: "2.50 s" claims three significant figures, "2.5 s" claims
 * two. Students lose marks for dropping them, so we must not drop them either.
 */
/**
 * An exact value, printed as it is: no significant-figure padding and no trailing zeros.
 *
 * For counts and for sums of tabulated values. An M_r of 30 should read "30", not "30.0",
 * but chloromethane's is genuinely 50.5, so it cannot simply be rounded to a whole number.
 * The rounding is only there to absorb floating-point residue from arithmetic on values
 * like chlorine's 35.5.
 */
export function formatExact(value: number): string {
  if (!Number.isFinite(value)) return String(value)
  return String(Number(value.toFixed(3)))
}

export function formatSigFigs(value: number, sigFigs: number): string {
  if (!Number.isFinite(value)) return String(value)
  if (value === 0) return (0).toFixed(Math.max(0, sigFigs - 1))

  const rounded = toSigFigs(value, sigFigs)
  const magnitude = Math.floor(Math.log10(Math.abs(rounded)))

  // Outside this window, plain decimal notation stops being readable.
  if (magnitude >= 6 || magnitude <= -5) {
    return toScientific(rounded, sigFigs)
  }

  const decimals = Math.max(0, sigFigs - 1 - magnitude)
  return rounded.toFixed(decimals)
}

/** Scientific notation with an explicit power of ten, e.g. `3.00 × 10⁸`. */
export function toScientific(value: number, sigFigs: number): string {
  if (value === 0) return '0'
  const magnitude = Math.floor(Math.log10(Math.abs(value)))
  const mantissa = value / 10 ** magnitude
  return `${mantissa.toFixed(sigFigs - 1)} × 10${toSuperscript(magnitude)}`
}

const SUPERSCRIPTS: Record<string, string> = {
  '0': '⁰',
  '1': '¹',
  '2': '²',
  '3': '³',
  '4': '⁴',
  '5': '⁵',
  '6': '⁶',
  '7': '⁷',
  '8': '⁸',
  '9': '⁹',
  '-': '⁻',
}

export function toSuperscript(n: number): string {
  return String(n)
    .split('')
    .map((c) => SUPERSCRIPTS[c] ?? c)
    .join('')
}

/** A value with its unit, e.g. `formatWithUnit(9.81, 3, 'm / s²')` → `9.81 m / s²`. */
export function formatWithUnit(value: number, sigFigs: number, unit: string): string {
  const num = formatSigFigs(value, sigFigs)
  return unit ? `${num} ${unit}` : num
}

/**
 * Count the significant figures a student's written value claims.
 *
 * Used by the Paper 5/6 data-table marker to check whether recorded readings are
 * quoted to the precision of the instrument.
 *
 * `countSigFigs('0.0450')` → 3   (leading zeros never count, trailing ones do)
 * `countSigFigs('1200')`   → 2   (ambiguous by convention; we take the strict reading)
 */
export function countSigFigs(written: string): number {
  const s = written.trim().replace(/^[+-]/, '')
  if (!/^\d*\.?\d+$/.test(s)) return 0

  if (s.includes('.')) {
    // Strip leading zeros (and the point); everything left is significant.
    return s.replace('.', '').replace(/^0+/, '').length
  }
  // Integer: trailing zeros are not significant without a decimal point.
  return s.replace(/^0+/, '').replace(/0+$/, '').length || 1
}

/**
 * Round an axis maximum up to the next "nice" value — 1, 2 or 5 times a power of ten.
 *
 * Graphs in this course should read like the ones in an exam paper: axes ending on
 * round numbers a student could count squares against. Snapping to these boundaries
 * also means the axis only rescales when the data crosses one, so a curve does not
 * shimmer under the hand while a slider is dragged.
 *
 * `niceAxisMax(87)` → 100 · `niceAxisMax(23)` → 25 · `niceAxisMax(0.42)` → 0.5
 */
export function niceAxisMax(value: number): number {
  if (!Number.isFinite(value) || value <= 0) return 1
  const magnitude = 10 ** Math.floor(Math.log10(value))
  const normalised = value / magnitude
  const step = normalised <= 1 ? 1 : normalised <= 2 ? 2 : normalised <= 2.5 ? 2.5 : normalised <= 5 ? 5 : 10
  return step * magnitude
}

/**
 * Step sizes an axis division may take, per decade.
 *
 * Deliberately coarse. A step of 75 divides 1750–2050 exactly and is useless on a year
 * axis, because nobody labels a gridline 1725. Sticking to 1, 2, 2.5, 4 and 5 keeps every
 * tick on a number a reader recognises.
 */
const STEP_LADDER = [1, 2, 2.5, 4, 5, 10]

/**
 * An axis range framing data that does not live near zero.
 *
 * The default rule keeps a zero baseline, which is right for a speed–time graph — the area
 * under the curve means something there. It is wrong for a calendar year, and wrong for a
 * concentration whose whole interesting variation sits far from the origin: carbon dioxide
 * from 277 to 414 ppm plotted from zero is a flat line near the top of the frame.
 *
 * Returns four equal divisions on a round step, with both ends of the data inside.
 */
export function niceRange(lo: number, hi: number): { min: number; max: number } {
  if (!Number.isFinite(lo) || !Number.isFinite(hi)) return { min: 0, max: 1 }
  if (hi < lo) return niceRange(hi, lo)
  if (hi === lo) return { min: lo - 1, max: lo + 1 }

  const rough = (hi - lo) / 4
  const magnitude = 10 ** Math.floor(Math.log10(rough))

  for (let decade = magnitude; decade <= magnitude * 10; decade *= 10) {
    for (const rung of STEP_LADDER) {
      const step = rung * decade
      if (step < rough) continue
      const min = Math.floor(lo / step) * step
      // Four divisions must reach past the top of the data, or a point falls off the plot.
      if (min + 4 * step >= hi) return { min, max: min + 4 * step }
    }
  }
  return { min: lo, max: hi }
}

/**
 * Round an axis minimum *down* to a nice value.
 *
 * The counterpart to `niceAxisMax` for data that dips below zero without being centred
 * on it — a heating curve starting at −25 °C and rising to 125 °C, say. Mirroring the
 * maximum instead would give −200 and squash the curve into the middle of the plot.
 */
export function niceAxisMin(value: number): number {
  if (!Number.isFinite(value) || value >= 0) return 0
  return -niceAxisMax(-value)
}

/** Degrees to radians. */
export function toRadians(degrees: number): number {
  return (degrees * Math.PI) / 180
}

/** Radians to degrees. */
export function toDegrees(radians: number): number {
  return (radians * 180) / Math.PI
}

/** Standard acceleration of free fall used throughout 0625. */
export const G_EARTH = 9.8
