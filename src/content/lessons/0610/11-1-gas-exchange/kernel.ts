/**
 * Gas exchange and respiration — kernel for lesson 0610/11-1-gas-exchange.
 *
 * Energy supply during exercise, split into the aerobic part and the anaerobic part. The
 * syllabus asks for two equations and the statement that anaerobic respiration releases much
 * less energy per glucose molecule; running it shows what that actually costs.
 *
 * Aerobic respiration can only supply energy as fast as oxygen arrives, and delivery has a
 * ceiling. Demand above that ceiling has to be met anaerobically, which works — for a while —
 * but yields a fraction of the energy per glucose and leaves lactic acid behind. The lactic
 * acid accumulates while the shortfall lasts and is only removed afterwards, using oxygen.
 * That is the oxygen debt: not a metaphor, a quantity, and here it is the area under the
 * shortfall.
 *
 * Which is why the breathing rate stays high after you stop running. The exercise is over;
 * the debt is not.
 *
 * Covers 0610.11.1.5, 11.1.10 and 12.3.6–7.
 */

import type { SimKernel, SimResult, SimSeries } from '@/content/types'

export interface RespirationParams extends Record<string, number> {
  /** Intensity of the exercise, as a percentage of what aerobic respiration alone can supply. */
  intensity: number
  /** How long the exercise lasts, in minutes. */
  duration: number
  /** How fit the person is, 0 to 100. Fitness raises the aerobic ceiling. */
  fitness: number
}

export const REST_BEFORE = 1
export const DURATION = 20
const STEP = 0.25

/** Energy per minute an untrained person can supply aerobically, in arbitrary units. */
const BASE_CEILING = 100
/** Resting demand, as a fraction of the untrained ceiling. */
const RESTING_DEMAND = 12

/** ATP yield per glucose molecule. The syllabus wants "much less", these are the numbers. */
export const AEROBIC_YIELD = 32
export const ANAEROBIC_YIELD = 2

/** How fast lactic acid is cleared once oxygen is available again, per minute. */
const CLEARANCE = 0.18

/** The most energy per minute this person can supply with oxygen alone. */
export function aerobicCeiling(fitness: number): number {
  return BASE_CEILING * (1 + 0.8 * (Math.min(100, Math.max(0, fitness)) / 100))
}

/** Energy demanded per minute at this intensity. */
export function demand(intensity: number, fitness: number): number {
  const i = Math.min(150, Math.max(0, intensity)) / 100
  return RESTING_DEMAND + (aerobicCeiling(fitness) - RESTING_DEMAND) * i
}

/**
 * How many times more glucose an anaerobic shortfall costs.
 *
 * Aerobic respiration gets about 32 ATP from a glucose molecule; anaerobic gets 2. So
 * covering the same energy without oxygen burns sixteen times the glucose, which is the
 * concrete meaning of "much less energy per molecule".
 */
export const GLUCOSE_COST_RATIO = AEROBIC_YIELD / ANAEROBIC_YIELD

export interface Trace {
  time: number[]
  aerobic: number[]
  anaerobic: number[]
  lactate: number[]
}

export function simulate(p: RespirationParams): Trace {
  const intensity = Math.min(150, Math.max(0, p.intensity))
  const duration = Math.min(15, Math.max(0, p.duration))
  const fitness = Math.min(100, Math.max(0, p.fitness))

  const ceiling = aerobicCeiling(fitness)
  const working = demand(intensity, fitness)

  const time: number[] = []
  const aerobic: number[] = []
  const anaerobic: number[] = []
  const lactate: number[] = []

  let acid = 0

  for (let t = 0; t <= DURATION + 1e-9; t += STEP) {
    const exercising = t >= REST_BEFORE && t < REST_BEFORE + duration
    const wanted = exercising ? working : RESTING_DEMAND

    // Oxygen can only supply up to the ceiling; the rest has to come without it.
    const fromOxygen = Math.min(ceiling, wanted)
    const shortfall = Math.max(0, wanted - ceiling)

    time.push(Math.round(t * 100) / 100)
    aerobic.push(Math.round(fromOxygen * 10) / 10)
    anaerobic.push(Math.round(shortfall * 10) / 10)
    lactate.push(Math.round(acid * 10) / 10)

    // Lactic acid builds while there is a shortfall, and is only cleared afterwards —
    // using oxygen, which is why the breathing stays hard after the exercise stops.
    acid = Math.max(0, acid + (shortfall * 0.06 - acid * CLEARANCE) * STEP)
  }

  return { time, aerobic, anaerobic, lactate }
}

/** Minutes after the exercise ends before the lactic acid is essentially gone. */
export function recoveryMinutes(trace: Trace, p: RespirationParams): number {
  const endedAt = REST_BEFORE + Math.min(15, Math.max(0, p.duration))
  for (let i = 0; i < trace.time.length; i++) {
    const t = trace.time[i] as number
    if (t < endedAt) continue
    if ((trace.lactate[i] as number) < 0.5) return Math.round((t - endedAt) * 100) / 100
  }
  return Math.round((DURATION - endedAt) * 100) / 100
}

export const respirationKernel: SimKernel<RespirationParams, SimResult> = (params) => {
  const p: RespirationParams = {
    intensity: Math.min(150, Math.max(0, params['intensity'] ?? 80)),
    duration: Math.min(15, Math.max(0, params['duration'] ?? 4)),
    fitness: Math.min(100, Math.max(0, params['fitness'] ?? 30)),
  }
  const trace = simulate(p)

  const series: SimSeries[] = [
    {
      key: 'aerobic',
      label: { en: 'Energy from aerobic respiration', zh: '有氧呼吸提供的能量' },
      unit: { x: 'time / min', y: 'energy per minute / arbitrary units' },
      points: trace.time.map((t, i) => [t, trace.aerobic[i] ?? 0]),
      xBounds: { min: 0, max: DURATION },
      yBounds: { min: 0, max: 300 },
    },
    {
      key: 'anaerobic',
      label: { en: 'Energy from anaerobic respiration', zh: '无氧呼吸提供的能量' },
      unit: { x: 'time / min', y: 'energy per minute / arbitrary units' },
      points: trace.time.map((t, i) => [t, trace.anaerobic[i] ?? 0]),
      xBounds: { min: 0, max: DURATION },
      yBounds: { min: 0, max: 300 },
    },
    {
      key: 'lactate',
      label: { en: 'Lactic acid in the muscles', zh: '肌肉中的乳酸' },
      unit: { x: 'time / min', y: 'lactic acid / arbitrary units' },
      points: trace.time.map((t, i) => [t, trace.lactate[i] ?? 0]),
      xBounds: { min: 0, max: DURATION },
      yBounds: { min: 0, max: 30 },
    },
  ]

  const ceiling = aerobicCeiling(p.fitness)
  const wanted = demand(p.intensity, p.fitness)
  const shortfall = Math.max(0, wanted - ceiling)

  return {
    series,
    readouts: {
      ceiling: Math.round(ceiling),
      demand: Math.round(wanted),
      shortfall: Math.round(shortfall),
      peakLactate: Math.round(Math.max(...trace.lactate) * 10) / 10,
      recovery: recoveryMinutes(trace, p),
    },
    markers: [
      {
        x: 0,
        y: 0,
        label:
          shortfall <= 0
            ? {
                en: 'Entirely aerobic — oxygen is keeping up, so no lactic acid builds and this pace could be held for hours',
                zh: '完全有氧——氧供应跟得上，不积累乳酸，这个强度可以维持数小时',
              }
            : {
                en: `Oxygen cannot keep up: ${Math.round(shortfall)} units a minute must come anaerobically, at ${GLUCOSE_COST_RATIO} times the glucose`,
                zh: `氧供应跟不上：每分钟有 ${Math.round(shortfall)} 单位必须由无氧呼吸提供，消耗的葡萄糖是 ${GLUCOSE_COST_RATIO} 倍`,
              },
      },
    ],
  }
}

export default respirationKernel
