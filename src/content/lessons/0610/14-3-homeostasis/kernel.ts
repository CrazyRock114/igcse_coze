/**
 * Homeostasis and negative feedback — kernel for lesson 0610/14-3-homeostasis.
 *
 * Blood glucose after a meal, simulated minute by minute. The point of running it rather
 * than describing it is that negative feedback does not hold a value *at* the set point —
 * it chases the set point, always correcting something that has already happened. Give the
 * pancreas a delay and the correction arrives late, so the glucose overshoots on the way
 * down and glucagon has to fetch it back. That wobble is not a flaw in the model; it is what
 * negative feedback looks like, and it is why the real graph is never flat.
 *
 * Two failures are worth producing deliberately. Turn the insulin response to zero and you
 * have untreated Type 1 diabetes: the glucose climbs past the renal threshold and stays
 * there, because nothing is taking it out. Then treat it with an injected dose — and note
 * that the injection is *not* part of the feedback loop. It acts on a timetable, not on a
 * measurement, which is exactly why too large a dose causes a hypo. A student who has seen
 * that on a graph will never again describe insulin treatment as "just replacing what is
 * missing".
 *
 * Glucagon is left working even at zero insulin response, because that is what happens:
 * Type 1 diabetes destroys the beta cells that make insulin and leaves the alpha cells that
 * make glucagon.
 *
 * The constants are chosen to land in the range a student meets in a question — a fasting
 * level near 5 mmol/dm³, a peak near 8 after a normal meal, glucose in the urine above 10.
 * This is not a pharmacokinetic model of a real person and must not be read as one; it is
 * the smallest model that behaves the way the syllabus says the body behaves.
 *
 * Covers 0610.14.4.1–5.
 */

import type { SimKernel, SimResult, SimSeries } from '@/content/types'

export interface HomeostasisParams extends Record<string, number> {
  /** Carbohydrate in the meal, in grams. */
  meal: number
  /** How well the pancreas secretes insulin, as a percentage of normal. 0 is Type 1. */
  insulin: number
  /** Injected insulin, as a percentage of the dose that would match a 60 g meal. */
  injection: number
  /** How long the pancreas takes to notice a change, in minutes. */
  delay: number
}

/** The concentration the body defends, in mmol/dm³. */
export const SET_POINT = 5
/** Above this the kidneys cannot reabsorb it all and glucose appears in the urine. */
export const RENAL_THRESHOLD = 10
/** Below this the brain starts to run short — hypoglycaemia. */
export const HYPO_THRESHOLD = 3.5
/** How far above the set point still counts as having recovered. */
export const NORMAL_CEILING = 6.5

/** Minutes simulated, and the step. Six hours covers a meal and the return to normal. */
export const DURATION = 360
const STEP = 2

/** Rise in mmol/dm³ per gram of carbohydrate, if nothing removed any of it. */
const RISE_PER_GRAM = 0.25
/** Minutes from eating to the peak rate of absorption from the gut. */
const ABSORPTION_PEAK = 45
/** Minutes from an injection to its peak action. Slower than food. */
const INJECTION_PEAK = 75
/** Removal per minute, per mmol/dm³ of excess, at a normal insulin response. */
const INSULIN_RATE = 0.055
/** Release per minute, per mmol/dm³ of shortfall. */
const GLUCAGON_RATE = 0.05
/** Uptake that does not need insulin — the brain does not wait to be told. */
const BASAL_CLEARANCE = 0.002
/** Total mmol/dm³ removed over the whole action of a 100% dose. */
const INJECTION_POWER = 15

/**
 * Ceilings on how much either hormone can pour out at once.
 *
 * A gland has a maximum rate, and without one the model is a bare proportional controller:
 * push the delay up and it does not oscillate, it diverges, with the glucose slamming
 * between zero and the top of the graph. That is a runaway integrator, not physiology, and
 * a student watching it would learn something untrue. Glucagon's ceiling is the lower of
 * the two because raising glucose from stores is the harder direction.
 */
const MAX_INSULIN = 6
const MAX_GLUCAGON = 3

/**
 * Fraction of a dose arriving per minute, `t` minutes after it was taken.
 *
 * A gamma pulse: nothing at the moment of swallowing, a peak while it is being absorbed,
 * then a long tail. Normalised so the whole dose arrives exactly once, wherever the peak
 * is placed — `∫₀^∞ (t/τ²)e^(−t/τ) dt = 1`.
 */
export function pulse(t: number, peak: number): number {
  if (t <= 0) return 0
  return (t / (peak * peak)) * Math.exp(-t / peak)
}

export interface Trace {
  time: number[]
  glucose: number[]
  insulin: number[]
  glucagon: number[]
}

/**
 * Runs the loop.
 *
 * The hormones respond to the glucose level `delay` minutes ago, not to the level now.
 * That one line is where the overshoot comes from, and taking it out would make the
 * simulation agree with the tidy diagram and disagree with the body.
 */
export function simulate(p: HomeostasisParams): Trace {
  const meal = Math.max(0, p.meal)
  const secretion = Math.max(0, p.insulin) / 100
  const dose = Math.max(0, p.injection) / 100
  const lag = Math.max(0, Math.round(p.delay / STEP))

  const steps = Math.round(DURATION / STEP)
  const time: number[] = []
  const glucose: number[] = []
  const insulin: number[] = []
  const glucagon: number[] = []

  let g = SET_POINT

  for (let i = 0; i <= steps; i++) {
    const t = i * STEP

    // Recorded before the hormones read it, so that at zero delay `sensed` is the level
    // right now. Reading the history first would leave index i unwritten, the lookup would
    // fall back to the set point, and a pancreas with no delay would secrete nothing at
    // all — a healthy person would come out looking diabetic.
    time.push(t)
    glucose.push(g)

    // What the pancreas is reacting to: the concentration it last measured.
    const sensed = glucose[Math.max(0, i - lag)] ?? SET_POINT
    const secreted = Math.min(MAX_INSULIN, secretion * Math.max(0, sensed - SET_POINT))
    const glucagonOut = Math.min(MAX_GLUCAGON, Math.max(0, SET_POINT - sensed))

    // The injection is deliberately outside the loop. It works to a timetable rather than
    // to a measurement, which is the whole reason an overdose can cause a hypo: it goes on
    // removing glucose that has already gone.
    const injected = dose * INJECTION_POWER * pulse(t, INJECTION_PEAK)

    // Both hormones on one scale, so an injected dose can be compared with what a working
    // pancreas would have secreted for the same meal.
    insulin.push(secreted + injected / INSULIN_RATE)
    glucagon.push(glucagonOut)

    const fromGut = meal * RISE_PER_GRAM * pulse(t, ABSORPTION_PEAK)
    const removed = INSULIN_RATE * secreted + injected + BASAL_CLEARANCE * (g - SET_POINT)
    const released = GLUCAGON_RATE * glucagonOut

    g = Math.max(0, g + (fromGut + released - removed) * STEP)
  }

  return { time, glucose, insulin, glucagon }
}

/** How long the glucose stayed above the renal threshold, in minutes. */
export function minutesAboveThreshold(trace: Trace): number {
  return trace.glucose.filter((v) => v > RENAL_THRESHOLD).length * STEP
}

/**
 * When the glucose came back inside the normal range and stayed there.
 *
 * Returns the whole duration if it never settles — an honest answer for an untreated
 * diabetic run, where "time to recover" has no value because it does not recover.
 */
export function minutesToSettle(trace: Trace): number {
  const normal = (v: number) => v >= HYPO_THRESHOLD && v <= NORMAL_CEILING
  for (let i = 0; i < trace.glucose.length; i++) {
    if (trace.glucose.slice(i).every(normal)) return i * STEP
  }
  return DURATION
}

const round = (v: number) => Math.round(v * 100) / 100

export const homeostasisKernel: SimKernel<HomeostasisParams, SimResult> = (params) => {
  const trace = simulate(params)
  const points = (ys: number[]): Array<[number, number]> =>
    trace.time.map((t, i) => [t, round(ys[i] ?? 0)])

  const series: SimSeries[] = [
    {
      key: 'glucose',
      label: { en: 'Blood glucose after the meal', zh: '进餐后的血糖' },
      unit: { x: 'time / min', y: 'glucose / mmol dm⁻³' },
      points: points(trace.glucose),
      xBounds: { min: 0, max: DURATION },
      // Fixed, so that switching the insulin off sends the curve off the top of the graph
      // instead of the axis quietly rescaling and hiding how bad it got.
      yBounds: { min: 0, max: 20 },
    },
    {
      key: 'insulin',
      label: { en: 'Insulin acting', zh: '起作用的胰岛素' },
      unit: { x: 'time / min', y: 'relative amount' },
      points: points(trace.insulin),
      xBounds: { min: 0, max: DURATION },
      yBounds: { min: 0, max: 10 },
    },
    {
      key: 'glucagon',
      label: { en: 'Glucagon secreted', zh: '胰高血糖素分泌' },
      unit: { x: 'time / min', y: 'relative amount' },
      points: points(trace.glucagon),
      xBounds: { min: 0, max: DURATION },
      yBounds: { min: 0, max: 10 },
    },
  ]

  const peak = Math.max(...trace.glucose)
  const trough = Math.min(...trace.glucose)

  return {
    series,
    readouts: {
      peak: round(peak),
      trough: round(trough),
      urine: minutesAboveThreshold(trace),
      settle: minutesToSettle(trace),
    },
    markers: [
      {
        x: 0,
        y: 0,
        label:
          trough < HYPO_THRESHOLD
            ? { en: 'Hypoglycaemia — the correction overshot', zh: '低血糖——校正过头了' }
            : peak > RENAL_THRESHOLD
              ? { en: 'Glucose is appearing in the urine', zh: '尿中出现了葡萄糖' }
              : { en: 'Held inside the normal range', zh: '维持在正常范围内' },
      },
    ],
  }
}

export default homeostasisKernel
