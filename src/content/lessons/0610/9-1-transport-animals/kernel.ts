/**
 * Transport in animals — kernel for lesson 0610/9-1-transport-animals.
 *
 * Heart rate through a rest, exercise and recovery cycle: the investigation the syllabus
 * asks for, run as a simulation so a student can change what they cannot change in a
 * classroom — how fit the subject is.
 *
 * The one fact worth building the whole model around is that cardiac output at rest is about
 * five litres a minute in everybody. A trained athlete does not pump more blood while sitting
 * still; they pump the same amount with a much slower, much larger heartbeat. So the resting
 * stroke volume here is *derived* from the resting heart rate rather than tabulated
 * separately — 5040 divided by the rate — which makes the trade-off exact rather than
 * approximate, and makes "why is an athlete's resting pulse so low" answerable from the
 * numbers on screen.
 *
 * Recovery time is the other thing fitness buys, and it is the measure a Paper 6 question
 * actually asks for: not how high the rate went, but how quickly it came back.
 *
 * Covers 0610.9.2.4 and 9.2.11.
 */

import type { SimKernel, SimResult, SimSeries } from '@/content/types'

export interface TransportParams extends Record<string, number> {
  /** How hard the exercise is, as a percentage of maximal effort. */
  intensity: number
  /** How long it lasts, in minutes. */
  duration: number
  /** How well trained the subject is, 0 untrained to 100 elite. */
  fitness: number
}

/** Minutes of rest recorded before the exercise starts. */
export const REST_BEFORE = 2
/** Total minutes simulated. */
export const DURATION = 20
const STEP = 0.25

/** Cardiac output at rest, in cm³ per minute. Much the same in everybody. */
export const RESTING_OUTPUT = 5040
/** Fastest a young adult heart will go, in beats per minute. */
export const MAX_RATE = 200
/** Within this many beats per minute of resting counts as recovered. */
export const RECOVERED_WITHIN = 10

/** Resting heart rate in beats per minute. Training lowers it a great deal. */
export function restingRate(fitness: number): number {
  const f = Math.min(100, Math.max(0, fitness))
  return 72 - 0.3 * f
}

/**
 * Stroke volume at rest, in cm³.
 *
 * Derived, not tabulated: everyone's resting cardiac output is about the same, so a slower
 * heart must be moving more blood per beat. That is the whole explanation of an athlete's
 * pulse, and deriving it means the two numbers cannot drift apart.
 */
export function restingStroke(fitness: number): number {
  return RESTING_OUTPUT / restingRate(fitness)
}

/**
 * Stroke volume during exercise, in cm³.
 *
 * Rises by about 40% and then stops. Unlike heart rate, stroke volume plateaus early —
 * beyond moderate effort the heart simply cannot fill any further between beats, so all
 * the extra output has to come from beating faster.
 */
export function strokeVolume(fitness: number, intensity: number): number {
  const effort = Math.min(1, Math.max(0, intensity) / 50)
  return restingStroke(fitness) * (1 + 0.4 * effort)
}

/** Heart rate the body is aiming for at this intensity, in beats per minute. */
export function targetRate(fitness: number, intensity: number): number {
  const rest = restingRate(fitness)
  const effort = Math.min(100, Math.max(0, intensity)) / 100
  return rest + (MAX_RATE - rest) * effort
}

/** Minutes for the rate to fall back once the exercise stops. Fitness is most of it. */
export function recoveryConstant(fitness: number): number {
  const f = Math.min(100, Math.max(0, fitness))
  return 1.8 - 0.012 * f
}

export interface Trace {
  time: number[]
  rate: number[]
  output: number[]
}

/**
 * Runs the cycle.
 *
 * The rate chases its target exponentially rather than jumping, in both directions, because
 * that is what the trace on a heart monitor looks like — and because the shape of the fall
 * is the part the student is being asked to read.
 */
export function simulate(p: TransportParams): Trace {
  const intensity = Math.min(100, Math.max(0, p.intensity))
  const duration = Math.min(10, Math.max(0, p.duration))
  const fitness = Math.min(100, Math.max(0, p.fitness))

  const rest = restingRate(fitness)
  const target = targetRate(fitness, intensity)
  const fall = recoveryConstant(fitness)
  // Speeding up is quick and much the same in everybody; it is slowing down that training
  // changes, which is why the recovery half is the half worth measuring.
  const rise = 0.45

  const time: number[] = []
  const rate: number[] = []
  const output: number[] = []

  let hr = rest

  for (let t = 0; t <= DURATION + 1e-9; t += STEP) {
    const exercising = t >= REST_BEFORE && t < REST_BEFORE + duration
    const aim = exercising ? target : rest
    const constant = exercising ? rise : fall

    time.push(Math.round(t * 100) / 100)
    rate.push(Math.round(hr * 10) / 10)
    // Stroke volume only rises while the muscles are demanding it.
    const stroke = exercising ? strokeVolume(fitness, intensity) : restingStroke(fitness)
    output.push(Math.round((hr * stroke) / 100) / 10)

    hr += ((aim - hr) / constant) * STEP
  }

  return { time, rate, output }
}

/**
 * Minutes from the end of the exercise until the rate is back near resting.
 *
 * Returns the time remaining in the recording if it never gets there, rather than a
 * fabricated figure — an honest "still elevated when we stopped watching".
 */
export function recoveryTime(trace: Trace, p: TransportParams): number {
  const rest = restingRate(p.fitness)
  const endedAt = REST_BEFORE + Math.min(10, Math.max(0, p.duration))

  for (let i = 0; i < trace.time.length; i++) {
    const t = trace.time[i] as number
    if (t < endedAt) continue
    if ((trace.rate[i] as number) - rest <= RECOVERED_WITHIN) return Math.round((t - endedAt) * 100) / 100
  }
  return Math.round((DURATION - endedAt) * 100) / 100
}

export const transportKernel: SimKernel<TransportParams, SimResult> = (params) => {
  const trace = simulate(params)
  const fitness = Math.min(100, Math.max(0, params['fitness'] ?? 0))
  const intensity = Math.min(100, Math.max(0, params['intensity'] ?? 60))

  const series: SimSeries[] = [
    {
      key: 'rate',
      label: { en: 'Heart rate', zh: '心率' },
      unit: { x: 'time / min', y: 'heart rate / beats min⁻¹' },
      points: trace.time.map((t, i) => [t, trace.rate[i] ?? 0]),
      xBounds: { min: 0, max: DURATION },
      // Fixed, so that comparing an athlete with an untrained subject compares the traces
      // rather than two axes quietly rescaled to look alike.
      yBounds: { min: 0, max: 220 },
    },
    {
      key: 'output',
      label: { en: 'Cardiac output', zh: '心输出量' },
      unit: { x: 'time / min', y: 'output / dm³ min⁻¹' },
      points: trace.time.map((t, i) => [t, trace.output[i] ?? 0]),
      xBounds: { min: 0, max: DURATION },
      yBounds: { min: 0, max: 40 },
    },
  ]

  const peak = Math.max(...trace.rate)
  const recovery = recoveryTime(trace, {
    intensity,
    duration: params['duration'] ?? 5,
    fitness,
  })

  return {
    series,
    readouts: {
      resting: Math.round(restingRate(fitness) * 10) / 10,
      stroke: Math.round(restingStroke(fitness)),
      peak: Math.round(peak * 10) / 10,
      peakOutput: Math.round(Math.max(...trace.output) * 10) / 10,
      recovery,
    },
    markers: [
      {
        x: 0,
        y: 0,
        label:
          recovery >= DURATION - REST_BEFORE - Math.min(10, params['duration'] ?? 5)
            ? {
                en: 'Still above resting when the recording ended',
                zh: '记录结束时心率仍高于静息值',
              }
            : {
                en: `Back to resting ${recovery} minutes after stopping`,
                zh: `停止运动后 ${recovery} 分钟恢复到静息心率`,
              },
      },
    ],
  }
}

export default transportKernel
