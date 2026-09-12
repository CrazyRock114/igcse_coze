/**
 * Forces — kernel for lesson 0625/1-5-forces.
 *
 * Two experiments that between them contain most of what a force does.
 *
 * The load–extension graph is straight and then it is not, and the point at which it stops
 * being straight is a named thing the syllabus asks for. Modelling the limit of
 * proportionality rather than drawing a permanently straight line matters: a student who has
 * only seen `F = kx` believes springs obey it forever, and the whole reason the limit has a
 * name is that they do not.
 *
 * The falling object is `F = ma` with a force that grows as you go. Weight is constant, drag
 * grows with speed, so the resultant shrinks and so does the acceleration — and when drag
 * equals weight the resultant is zero and the speed stops changing. Terminal velocity is not
 * a special rule; it is what `F = ma` says when the resultant reaches zero, and the model is
 * built so that falls out rather than being imposed.
 *
 * Covers 0625.1.2.13, 1.5.1.2, 1.5.1.9–11.
 */

import type { SimKernel, SimResult, SimSeries } from '@/content/types'

export interface ForcesParams extends Record<string, number> {
  /** 1 the load–extension experiment, 2 the falling object. */
  mode: number
  /** Spring constant in N/m. */
  springConstant: number
  /** Load at which the spring stops obeying Hooke's law, in N. */
  limitOfProportionality: number
  /** Mass of the falling object in kg. */
  mass: number
  /** How much drag the object experiences, as a relative figure. */
  drag: number
}

export const GRAVITY = 9.8
/** Seconds simulated for the fall. */
export const FALL_TIME = 20
const STEP = 0.05

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))

/**
 * Extension of a spring under a load, in metres.
 *
 * Proportional up to the limit, and beyond it the spring stretches faster for each extra
 * newton — the curve bends away from the line. Drawing it straight forever would make the
 * limit of proportionality a word with nothing behind it.
 */
export function extension(load: number, k: number, limit: number): number {
  if (k <= 0) return 0
  if (load <= limit) return load / k
  const atLimit = limit / k
  // Past the limit the spring gives way progressively rather than all at once.
  const beyond = load - limit
  return atLimit + (beyond / k) * (1 + beyond / Math.max(1, limit))
}

/** Terminal velocity: the speed at which drag has grown to equal the weight. */
export function terminalVelocity(mass: number, drag: number): number {
  if (drag <= 0) return Infinity
  return Math.sqrt((mass * GRAVITY) / drag)
}

export interface Fall {
  time: number[]
  velocity: number[]
  acceleration: number[]
  resultant: number[]
}

/**
 * A fall with drag, integrated step by step.
 *
 * Nothing here knows about terminal velocity. The drag grows with the square of the speed,
 * the resultant is weight minus drag, and the acceleration is the resultant over the mass.
 * The speed levels off because the arithmetic makes it, which is the point.
 */
export function simulateFall(mass: number, drag: number): Fall {
  const m = clamp(mass, 0.1, 200)
  const d = clamp(drag, 0, 20)
  const w = m * GRAVITY

  const time: number[] = []
  const velocity: number[] = []
  const acceleration: number[] = []
  const resultant: number[] = []

  let v = 0

  for (let t = 0; t <= FALL_TIME + 1e-9; t += STEP) {
    const dragForce = d * v * v
    const net = w - dragForce
    const a = net / m

    time.push(Math.round(t * 100) / 100)
    velocity.push(Math.round(v * 100) / 100)
    acceleration.push(Math.round(a * 100) / 100)
    resultant.push(Math.round(net * 10) / 10)

    v = Math.max(0, v + a * STEP)
  }

  return { time, velocity, acceleration, resultant }
}

const round = (v: number) => Math.round(v * 100) / 100

export const forcesKernel: SimKernel<ForcesParams, SimResult> = (params) => {
  const mode = Math.round(clamp(params['mode'] ?? 1, 1, 2))
  const k = clamp(params['springConstant'] ?? 25, 1, 200)
  const limit = clamp(params['limitOfProportionality'] ?? 10, 1, 40)
  const mass = clamp(params['mass'] ?? 70, 0.1, 200)
  const drag = clamp(params['drag'] ?? 0.25, 0, 20)

  // Everything is computed for both experiments, and only the graph changes with the mode.
  // Returning different readouts per mode would leave the lesson declaring readouts the
  // kernel does not always produce — which the integrity check rightly refuses.
  const fall = simulateFall(mass, drag)
  const vt = terminalVelocity(mass, drag)
  const finalA = fall.acceleration[fall.acceleration.length - 1] ?? 0

  const maxLoad = 40
  const springSeries: SimSeries[] = [
    {
      key: 'extension',
      label: { en: 'Extension against load', zh: '伸长量随载荷的变化' },
      unit: { x: 'load / N', y: 'extension / m' },
      points: Array.from({ length: 81 }, (_, i) => {
        const x = (i / 80) * maxLoad
        return [round(x), round(extension(x, k, limit))] as [number, number]
      }),
      xBounds: { min: 0, max: maxLoad },
      yBounds: { min: 0, max: 3 },
    },
  ]

  const fallSeries: SimSeries[] = [
    {
      key: 'velocity',
      label: { en: 'Speed as it falls', zh: '下落过程中的速率' },
      unit: { x: 'time / s', y: 'speed / m s⁻¹' },
      points: fall.time.map((t, i) => [t, fall.velocity[i] ?? 0]),
      xBounds: { min: 0, max: FALL_TIME },
      yBounds: { min: 0, max: 120 },
    },
    {
      key: 'resultant',
      label: { en: 'Resultant force on it', zh: '所受的合力' },
      unit: { x: 'time / s', y: 'resultant force / N' },
      points: fall.time.map((t, i) => [t, fall.resultant[i] ?? 0]),
      xBounds: { min: 0, max: FALL_TIME },
      yBounds: { min: 0, max: 2000 },
    },
  ]

  const readouts = {
    springConstant: round(k),
    weight: round(mass * GRAVITY),
    // Zero rather than Infinity when there is no drag: "no terminal velocity" is the
    // honest reading, and an infinity would break every readout downstream.
    terminal: Number.isFinite(vt) ? round(vt) : 0,
    finalAcceleration: round(finalA),
  }

  const springNote = {
    en: `Straight up to ${round(limit)} N, then not. Doubling the load past the limit more than doubles the extension: ${round(extension(limit * 2, k, limit))} m against ${round(extension(limit, k, limit) * 2)} m if it had stayed proportional`,
    zh: `在 ${round(limit)} N 以内是直线，之后就不是了。超过极限后把载荷加倍，伸长量增加得更多：${round(extension(limit * 2, k, limit))} m，而若保持正比应为 ${round(extension(limit, k, limit) * 2)} m`,
  }

  const fallNote =
    drag <= 0
      ? {
          en: 'No air resistance — the resultant stays equal to the weight, so the acceleration never changes and the speed rises without limit',
          zh: '没有空气阻力——合力始终等于重力，因此加速度不变，速率无限上升',
        }
      : finalA < 0.2
        ? {
            en: `At terminal velocity: drag has grown until it equals the weight, so the resultant is zero and the speed stops changing at ${round(vt)} m/s`,
            zh: `已达终极速度：阻力增大到与重力相等，合力为零，速率停止变化于 ${round(vt)} m/s`,
          }
        : {
            en: 'Still speeding up, but less quickly — drag is growing, so the resultant and the acceleration are both shrinking',
            zh: '仍在加速，但越来越慢——阻力在增大，因此合力和加速度都在减小',
          }

  return {
    series: mode === 1 ? springSeries : fallSeries,
    readouts,
    markers: [{ x: 0, y: 0, label: mode === 1 ? springNote : fallNote }],
  }
}

export default forcesKernel
