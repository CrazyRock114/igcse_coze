/**
 * Magnetic fields — kernel for lesson 4-1-magnetism.
 *
 * Field lines are traced by stepping along the field direction from a ring of starting
 * points, rather than drawn as decorative arcs. That matters pedagogically: because the
 * lines are integrated from the real field, their spacing genuinely represents field
 * strength (0625.4.1.11) instead of merely looking as though it does.
 *
 * Sources are modelled as magnetic poles — a bar magnet as a pole pair, a straight wire
 * as a circular field, a solenoid as a pole pair with a strong uniform interior. Each
 * pole behaves as a 2-D monopole, whose field falls as 1/r; a pair of them reproduces
 * the textbook dipole pattern.
 *
 * Covers 0625.4.1.1–11 and supports 0625.4.5.3.1.
 */

import type { SimKernel, SimResult, SimSeries } from '@/content/types'
import { fieldStrength, ringStarts, traceLine, type Source } from '@/lib/fieldLines'

export interface MagnetismParams extends Record<string, number> {
  /** 0 = bar magnet, 1 = two like poles, 2 = two unlike poles, 3 = straight wire, 4 = solenoid */
  setup: number
  /** Number of field lines traced from each source */
  lineCount: number
  /** Relative strength of the source */
  strength: number
}

/** A magnetic pole. `sign` is +1 for north, −1 for south. */
export type Pole = Source

/** The visible frame. Tracing runs further (see lib/fieldLines) so lines close properly. */
const VIEW_X = 3.1
const VIEW_Y = 2.1

export { fieldAt, fieldStrength, traceLine } from '@/lib/fieldLines'

/** Circular field lines round a current-carrying wire, drawn as concentric rings. */
function wireRings(count: number): SimSeries[] {
  const rings: SimSeries[] = []
  for (let i = 0; i < count; i++) {
    // Radii grow so that spacing widens outwards — the field weakens with distance.
    const radius = 0.32 + i * 0.36
    const pts: Array<[number, number]> = []
    for (let a = 0; a <= 64; a++) {
      const th = (a / 64) * Math.PI * 2
      pts.push([radius * Math.cos(th), radius * Math.sin(th)])
    }
    rings.push({
      key: `ring-${i}`,
      label: { en: 'Field line', zh: '磁感线' },
      unit: { x: '', y: '' },
      points: pts,
    })
  }
  return rings
}

/** The pole layout for each setup. */
export function polesFor(setup: number, strength: number): Pole[] {
  const s = strength
  if (setup >= 3.5) {
    // Solenoid: a pole pair placed at its ends, close together, giving a strong interior.
    return [
      { x: -0.9, y: 0, sign: 1, strength: s * 1.3 },
      { x: 0.9, y: 0, sign: -1, strength: s * 1.3 },
    ]
  }
  if (setup >= 2.5) {
    // Straight wire: handled as rings, no poles.
    return []
  }
  if (setup >= 1.5) {
    // Two unlike poles facing each other — attraction.
    return [
      { x: -1.1, y: 0, sign: 1, strength: s },
      { x: 1.1, y: 0, sign: -1, strength: s },
    ]
  }
  if (setup >= 0.5) {
    // Two like poles facing each other — repulsion, with a neutral point between them.
    return [
      { x: -1.1, y: 0, sign: 1, strength: s },
      { x: 1.1, y: 0, sign: 1, strength: s },
    ]
  }
  // Single bar magnet: N at one end, S at the other.
  return [
    { x: -0.75, y: 0, sign: 1, strength: s },
    { x: 0.75, y: 0, sign: -1, strength: s },
  ]
}

export const magnetismKernel: SimKernel<MagnetismParams, SimResult> = ({
  setup,
  lineCount,
  strength,
}) => {
  const isWire = setup >= 2.5 && setup < 3.5
  const poles = polesFor(setup, strength)
  const n = Math.max(3, Math.round(lineCount))

  const series: SimSeries[] = isWire
    ? wireRings(n)
    : poles
        .filter((p) => p.sign > 0)
        .flatMap((pole, pi) =>
          // Start on a small ring round each north pole and follow the field outwards.
          ringStarts(pole, n).map(([sx, sy], i) => ({
            key: `line-${pi}-${i}`,
            label: { en: 'Field line', zh: '磁感线' },
            unit: { x: '', y: '' },
            points: traceLine(poles, sx, sy, 1),
          }))
        )

  // Field strength sampled just outside a pole and far away, so the readouts back up
  // what the line spacing shows.
  const near = isWire ? strength / 0.32 : fieldStrength(poles, -0.75, 0.45)
  const far = isWire ? strength / 2.4 : fieldStrength(poles, 0, 2.2)

  return {
    series,
    readouts: {
      strengthNear: near,
      strengthFar: far,
      // How much weaker the field is further out — the point of unequal line spacing.
      ratio: far > 0 ? near / far : 0,
      poleCount: poles.length,
    },
    bounds: { xMin: -VIEW_X, xMax: VIEW_X, yMin: -VIEW_Y, yMax: VIEW_Y },
  }
}

export default magnetismKernel
