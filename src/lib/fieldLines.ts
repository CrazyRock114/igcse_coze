/**
 * Field-line tracing, shared by the magnetic and electric field lessons.
 *
 * Lines are integrated by stepping along the local field direction rather than drawn as
 * decorative arcs. That is what makes line spacing carry real information: crowded lines
 * genuinely mean a strong field, because the tracer had nowhere else to put them. Both
 * 0625.4.1.11 (magnetic) and 0625.4.2.1.10 (electric) rest on that being true.
 *
 * Magnetic poles and electric charges obey the same geometry here, so one integrator
 * serves both — only the labels and the drawing differ.
 */

/** A point source of field. `sign` is +1 for a north pole or positive charge. */
export interface Source {
  x: number
  y: number
  sign: number
  strength: number
}

export interface TraceOptions {
  /** Arc length per integration step. Smaller is smoother and slower. */
  step?: number
  /** Give up after this many steps, so a line can never loop forever. */
  maxSteps?: number
  /** Stop tracing beyond this distance from the origin, on either axis. */
  bound?: number
  /** Treat arrival within this distance of a sink as the end of the line. */
  arriveWithin?: number
}

const DEFAULTS: Required<TraceOptions> = {
  step: 0.055,
  maxSteps: 620,
  bound: 5.2,
  arriveWithin: 0.11,
}

/**
 * Field at a point, summed over all sources.
 *
 * Each source contributes radially with a 1/r falloff — the two-dimensional case, which
 * is what a cross-section diagram shows. A source pair then reproduces the textbook
 * dipole pattern.
 */
export function fieldAt(sources: Source[], x: number, y: number): [number, number] {
  let fx = 0
  let fy = 0
  for (const s of sources) {
    const dx = x - s.x
    const dy = y - s.y
    // Softened at the source itself, where the idealised field diverges.
    const r = Math.sqrt(Math.max(dx * dx + dy * dy, 0.0016))
    const k = (s.sign * s.strength) / (r * r)
    fx += k * dx
    fy += k * dy
  }
  return [fx, fy]
}

/** Magnitude of the field — used to check that line spacing really does track strength. */
export function fieldStrength(sources: Source[], x: number, y: number): number {
  const [fx, fy] = fieldAt(sources, x, y)
  return Math.hypot(fx, fy)
}

/**
 * Trace one field line from a starting point, following the field direction.
 *
 * Stops on leaving the traced region or on reaching a source, so lines terminate on
 * sinks the way real field lines do rather than spiralling indefinitely. Tracing
 * normally runs well past the visible frame so that a line sweeping far out still curves
 * back and lands, instead of being cut off mid-arc.
 */
export function traceLine(
  sources: Source[],
  startX: number,
  startY: number,
  direction: 1 | -1,
  options: TraceOptions = {}
): Array<[number, number]> {
  const { step, maxSteps, bound, arriveWithin } = { ...DEFAULTS, ...options }

  const points: Array<[number, number]> = [[startX, startY]]
  let x = startX
  let y = startY

  for (let i = 0; i < maxSteps; i++) {
    const [fx, fy] = fieldAt(sources, x, y)
    const mag = Math.hypot(fx, fy)
    if (mag < 1e-9) break

    x += (direction * step * fx) / mag
    y += (direction * step * fy) / mag

    if (Math.abs(x) > bound || Math.abs(y) > bound) break
    points.push([x, y])

    if (sources.some((s) => Math.hypot(x - s.x, y - s.y) < arriveWithin)) break
  }

  return points
}

/**
 * Start points evenly spaced on a small ring around a source.
 *
 * Starting on a ring rather than at the source itself avoids the softened singularity,
 * and spreading them evenly is what makes the resulting line density meaningful.
 */
export function ringStarts(
  source: Source,
  count: number,
  radius = 0.14
): Array<[number, number]> {
  return Array.from({ length: count }, (_, i) => {
    // The offset stops a line starting exactly on the axis, where it would be ambiguous.
    const angle = (i / count) * Math.PI * 2 + 0.12
    return [source.x + radius * Math.cos(angle), source.y + radius * Math.sin(angle)] as [
      number,
      number,
    ]
  })
}
