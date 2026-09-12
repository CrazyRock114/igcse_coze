/**
 * Kinetic particle model of a gas — kernel for lesson 2-1-gas-particles.
 *
 * The animation is a *pure function of time*, not a stepped simulation. Each particle
 * has a seeded start position and velocity, and its position at time t is computed in
 * closed form — including elastic bounces off the walls, via a triangle wave. So the
 * scene is reproducible, testable, and frame-rate independent: asking for t = 7.5 s
 * gives the same picture whether or not the intervening frames were drawn.
 *
 * Covers 0625.2.1.2.1–5 (Core), .6–.8 (Supplement) and 0625.2.1.3.1–3.
 */

import type { SimBody, SimKernel, SimResult } from '@/content/types'

export interface GasParams extends Record<string, number> {
  /** Temperature in kelvin */
  temperature: number
  /** Container width as a fraction of its maximum, 0.3–1 */
  volume: number
  /** Number of particles shown */
  count: number
  /** Animation clock, in seconds */
  t: number
}

/** Height of the box in simulation units. Width is `volume`. */
const BOX_HEIGHT = 1

/** Reference temperature at which the speed scale is 1. */
const T_REF = 300

const MAX_PARTICLES = 60

/**
 * Deterministic pseudo-random number in [0, 1) from an integer seed.
 *
 * A hash rather than a sequential generator, so particle 20's start state does not
 * depend on how many particles came before it — changing the count leaves the others
 * where they were.
 */
export function hashRandom(seed: number): number {
  let x = Math.imul(seed ^ 0x9e3779b9, 0x85ebca6b)
  x = Math.imul(x ^ (x >>> 13), 0xc2b2ae35)
  return ((x ^ (x >>> 16)) >>> 0) / 4294967296
}

/**
 * Position along one axis after elastic bounces in a box of length `L`.
 *
 * A particle travelling in a straight line and bouncing off two walls traces a
 * triangle wave of period 2L — so no stepping is needed to know where it is.
 */
export function bounce(start: number, velocity: number, t: number, L: number): number {
  if (L <= 0) return 0
  const u = start + velocity * t
  const period = 2 * L
  // Positive modulo, so negative times behave correctly too.
  const wrapped = ((u % period) + period) % period
  return L - Math.abs(wrapped - L)
}

/**
 * Mean particle speed, scaled from temperature.
 *
 * Kinetic energy is proportional to absolute temperature and to v², so speed goes as
 * the square root of T. That relationship is the reason heating raises pressure.
 */
export function meanSpeed(temperature: number): number {
  return Math.sqrt(Math.max(0, temperature) / T_REF)
}

export const gasKernel: SimKernel<GasParams, SimResult> = ({ temperature, volume, count, t }) => {
  const width = Math.max(0.05, volume)
  const n = Math.min(MAX_PARTICLES, Math.max(1, Math.round(count)))
  const speed = meanSpeed(temperature)

  const bodies: SimBody[] = []
  let fastCount = 0

  for (let i = 0; i < n; i++) {
    // Three independent hashes per particle: start x, start y, and direction.
    const x0 = hashRandom(i * 3 + 1)
    const y0 = hashRandom(i * 3 + 2)
    const angle = hashRandom(i * 3 + 3) * Math.PI * 2

    // Spread of individual speeds around the mean — real gases are not monodisperse,
    // and the spread is what makes evaporation and diffusion make sense later.
    const individual = speed * (0.55 + 1.1 * hashRandom(i * 7 + 11))

    const vx = Math.cos(angle) * individual
    const vy = Math.sin(angle) * individual

    bodies.push({
      x: bounce(x0 * width, vx, t, width),
      y: bounce(y0 * BOX_HEIGHT, vy, t, BOX_HEIGHT),
      r: 0.022,
      kind: individual > speed * 1.25 ? 'fast' : 'normal',
    })
    if (individual > speed * 1.25) fastCount++
  }

  // Pressure from the kinetic model: more particles, hotter, or smaller volume all
  // raise the rate of momentum transfer to the walls. Reported on a relative scale
  // because 0625 only needs the proportionalities, not absolute pascals.
  const pressure = (n / MAX_PARTICLES) * (temperature / T_REF) * (1 / width)

  // Collisions per second with the walls, per particle: speed / distance between walls.
  const collisionRate = width > 0 ? speed / width : 0

  return {
    series: [],
    bodies,
    readouts: {
      pressure,
      meanSpeed: speed,
      collisionRate,
      // pV should stay constant at fixed temperature — surfaced so the student can
      // watch it hold while they change the volume (0625.2.1.3.3).
      pV: pressure * width,
      temperatureCelsius: temperature - 273,
      fastFraction: n > 0 ? fastCount / n : 0,
    },
    bounds: { xMin: 0, xMax: width, yMin: 0, yMax: BOX_HEIGHT },
  }
}

export default gasKernel
