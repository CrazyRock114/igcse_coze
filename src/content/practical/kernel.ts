/**
 * Practical-skills kernels (Paper 5/6 style).
 *
 * Pure functions only — no DOM, no React (see AGENTS.md). The React side
 * (`src/components/practical/`) renders whatever these produce and feeds
 * student answers back in for grading.
 *
 * Two skills are covered:
 *   1. Reading analog instruments (measuring cylinder / thermometer) with the
 *      standard tolerance rule: half of the smallest division.
 *   2. Plotting points on graph paper and judging a best-fit line.
 */
import type { Bilingual } from '@/content/types'

// ---------------------------------------------------------------------------
// Deterministic RNG — tasks must be reproducible for tests and for "same task
// on next render" behaviour.
// ---------------------------------------------------------------------------

export type Rng = () => number

/** mulberry32 — tiny, fast, good enough distribution for task randomisation. */
export function mulberry32(seed: number): Rng {
  let a = seed >>> 0
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// ---------------------------------------------------------------------------
// Instrument reading
// ---------------------------------------------------------------------------

export interface MeasuringTask {
  kind: 'cylinder' | 'thermometer'
  unitLabel: string
  /** Value between two labelled (major) gridlines. */
  majorEvery: number
  /** Value of one smallest division. */
  minorValue: number
  /** Lowest value on the scale. */
  minValue: number
  /** Highest value on the scale. */
  maxValue: number
  /** The true liquid reading the student must report. */
  liquidValue: number
}

interface CylinderSpec {
  capacity: number
  majorEvery: number
  minorValue: number
}

const CYLINDER_SPECS: CylinderSpec[] = [
  { capacity: 25, majorEvery: 5, minorValue: 0.5 },
  { capacity: 50, majorEvery: 10, minorValue: 1 },
  { capacity: 100, majorEvery: 20, minorValue: 2 },
]

const round1 = (n: number): number => Math.round(n * 10) / 10

/**
 * Build a random instrument-reading task.
 *
 * The liquid level always lands on a smallest-division boundary, sometimes on
 * a half-division (the classic "estimate to half the smallest division" case
 * from Paper 5 mark schemes). With the same seed you always get the same task.
 */
export function makeMeasuringTask(seed: number): MeasuringTask {
  const rng = mulberry32(seed)
  if (rng() < 0.55) {
    const spec = CYLINDER_SPECS[Math.floor(rng() * CYLINDER_SPECS.length)]!
    // Fill between ~1/5 and ~4/5 of the scale, snapped to minor (or half-minor).
    const span = spec.capacity - spec.minorValue
    const minFill = Math.round((0.2 * span) / spec.minorValue) * spec.minorValue + spec.minorValue
    const half = rng() < 0.35
    // One unit = minor (whole division) or half-minor (estimate case). Advancing a
    // whole number of units keeps the level on the boundary grid; clamping by step
    // count (never by Math.min) keeps it under the top of the scale.
    const unit = half ? spec.minorValue / 2 : spec.minorValue
    const capTop = spec.capacity - spec.minorValue / 2
    const maxUnits = Math.floor((capTop - minFill) / unit)
    const k = Math.floor(rng() * maxUnits) + 1
    return {
      kind: 'cylinder',
      unitLabel: 'cm³',
      majorEvery: spec.majorEvery,
      minorValue: spec.minorValue,
      minValue: 0,
      maxValue: spec.capacity,
      liquidValue: minFill + k * unit,
    }
  }
  // Thermometer −10…110 °C, 1 °C minors, liquid between 5 and 100.
  const base = Math.floor(rng() * 95) + 5 // 5..99
  const half = rng() < 0.35
  return {
    kind: 'thermometer',
    unitLabel: '°C',
    majorEvery: 10,
    minorValue: 1,
    minValue: -10,
    maxValue: 110,
    liquidValue: round1(base + (half ? 0.5 : 0)),
  }
}

/**
 * Paper 5 rule: the reading is credited when it is within half a smallest
 * division of the true value.
 */
export function checkReading(task: MeasuringTask, answer: number): boolean {
  const tol = task.minorValue / 2 + 1e-9
  return Math.abs(answer - task.liquidValue) <= tol
}

// ---------------------------------------------------------------------------
// Graph plotting
// ---------------------------------------------------------------------------

export interface PlotPoint {
  x: number
  y: number
}

export interface PlotTask {
  id: string
  title: Bilingual
  prompt: Bilingual
  xLabel: string
  yLabel: string
  xMin: number
  xMax: number
  yMin: number
  yMax: number
  /** Data value of one small grid square. */
  xMinor: number
  yMinor: number
  /** Expected points (the "correct" plot). */
  points: PlotPoint[]
}

export interface FitLine {
  m: number
  b: number
  r2: number
}

/** Ordinary least squares. With <2 distinct points the fit is degenerate. */
export function bestFitLine(points: ReadonlyArray<{ x: number; y: number }>): FitLine {
  const n = points.length
  if (n === 0) return { m: 0, b: 0, r2: 0 }
  const sx = points.reduce((s, p) => s + p.x, 0)
  const sy = points.reduce((s, p) => s + p.y, 0)
  const mx = sx / n
  const my = sy / n
  let sxx = 0
  let sxy = 0
  let syy = 0
  for (const p of points) {
    sxx += (p.x - mx) * (p.x - mx)
    sxy += (p.x - mx) * (p.y - my)
    syy += (p.y - my) * (p.y - my)
  }
  const m = sxx === 0 ? 0 : sxy / sxx
  const b = my - m * mx
  const r2 = syy === 0 ? (sxx === 0 ? 1 : 0) : (sxy * sxy) / (sxx * syy)
  return { m, b, r2 }
}

export interface PlotGrade {
  /** Fraction of expected points correctly plotted (0..1). */
  score: number
  /** Per expected point: is there a plotted point within tolerance? */
  per: boolean[]
  /** Plotted points that matched nothing — likely slips. */
  extras: number
}

/**
 * Grade a student's plot against the expected one. A point counts when a
 * plotted marker falls within `tolDivisions` small squares (each axis) of the
 * expected position — half a small square is the mark-scheme standard.
 */
export function gradePlot(
  task: PlotTask,
  plotted: ReadonlyArray<{ x: number; y: number }>,
  tolDivisions = 0.5,
): PlotGrade {
  const tolX = tolDivisions * task.xMinor
  const tolY = tolDivisions * task.yMinor
  const used = new Set<number>()
  const per = task.points.map((exp) => {
    for (let i = 0; i < plotted.length; i++) {
      if (used.has(i)) continue
      const p = plotted[i]!
      if (Math.abs(p.x - exp.x) <= tolX && Math.abs(p.y - exp.y) <= tolY) {
        used.add(i)
        return true
      }
    }
    return false
  })
  const matched = per.filter(Boolean).length
  return { score: task.points.length === 0 ? 0 : matched / task.points.length, per, extras: plotted.length - used.size }
}
