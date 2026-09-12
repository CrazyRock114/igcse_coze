/**
 * States of matter and the kinetic particle model — kernel for lesson 0620/1-1-states-of-matter.
 *
 * Two panels that answer two different questions.
 *
 * The heating curve answers "what is happening while the temperature refuses to rise". Energy
 * goes in steadily and the temperature climbs, stops dead at the melting point, climbs again,
 * stops dead at the boiling point. The flat stretches are where the energy is going into
 * pulling particles apart against the forces holding them together, not into making them move
 * faster — and since temperature measures how fast they move, it cannot change while that is
 * happening. Students describe the plateaus long before they can say why they are there.
 *
 * The gas panel answers "what does temperature actually do to a gas". Volume against
 * temperature is a straight line that extrapolates to zero at −273 °C, and raising the pressure
 * pushes the whole line down.
 *
 * Two honesty notes, both of which are in the marker text as well:
 *
 *   - The energy axis on the heating curve is relative. Real values in kJ/mol exist for water
 *     and would be invented for anything else the sliders can reach, so the axis is labelled
 *     for what it is. The *proportions* are real: it always takes far more energy to boil a
 *     substance than to melt it, and the second plateau is drawn much longer for that reason.
 *   - The gas line is extrapolated. A real gas condenses long before −273 °C, so the lower end
 *     of that line is where the gas would be if it stayed a gas, which it does not.
 *
 * Covers 0620.1.1.1–6 and 1.2.1–2.
 */

import type { SimKernel, SimResult, SimSeries } from '@/content/types'

export interface StatesParams extends Record<string, number> {
  /** Melting point in °C. */
  meltingPoint: number
  /** Boiling point in °C. */
  boilingPoint: number
  /** The temperature the sample is held at, in °C. */
  temperature: number
  /** Pressure on the gas sample, in atmospheres. */
  pressure: number
}

/** Absolute zero in °C. Volume extrapolates to nothing here. */
export const ABSOLUTE_ZERO = -273

/** Molar gas volume at room temperature and pressure, in dm³. The value 0620.3.3.4 uses. */
export const MOLAR_VOLUME_RTP = 24
/** Room temperature in °C, the condition MOLAR_VOLUME_RTP is quoted at. */
export const ROOM_TEMPERATURE = 25

/**
 * Energy needed to melt, relative to raising the liquid's temperature by one degree.
 *
 * Illustrative, but the ordering is not: boiling always costs far more than melting, because
 * melting only loosens the particles while boiling separates them completely.
 */
export const MELT_ENERGY = 60
/** Energy needed to boil, on the same relative scale. */
export const BOIL_ENERGY = 400

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))

/** Which state a substance is in at a given temperature. */
export function stateAt(
  temperature: number,
  meltingPoint: number,
  boilingPoint: number,
): 'solid' | 'liquid' | 'gas' {
  if (temperature < meltingPoint) return 'solid'
  if (temperature < boilingPoint) return 'liquid'
  return 'gas'
}

/**
 * Volume of one mole of gas at a given temperature and pressure, in dm³.
 *
 * Straight from the gas laws, pinned so that 25 °C and 1 atm gives 24 dm³ — the figure the
 * mole lesson uses, so the two cannot disagree.
 */
export function gasVolume(temperatureC: number, pressureAtm: number): number {
  if (pressureAtm <= 0) return 0
  const kelvin = temperatureC - ABSOLUTE_ZERO
  const roomKelvin = ROOM_TEMPERATURE - ABSOLUTE_ZERO
  return Math.max(0, (MOLAR_VOLUME_RTP * kelvin) / roomKelvin / pressureAtm)
}

const round = (v: number, dp = 2) => {
  const f = 10 ** dp
  return Math.round(v * f) / f
}

/**
 * The heating curve, as a list of corner points.
 *
 * Drawn from corners rather than sampled, because the corners are the whole content: a
 * sampled curve would round them off and hide exactly where each change of state begins.
 */
export function heatingCurve(
  meltingPoint: number,
  boilingPoint: number,
): Array<[number, number]> {
  const startTemp = meltingPoint - 40
  const endTemp = boilingPoint + 40
  // One relative energy unit raises the temperature by one degree in any single state.
  let energy = 0
  const points: Array<[number, number]> = [[0, startTemp]]

  energy += meltingPoint - startTemp
  points.push([energy, meltingPoint])
  energy += MELT_ENERGY
  points.push([energy, meltingPoint])

  energy += boilingPoint - meltingPoint
  points.push([energy, boilingPoint])
  energy += BOIL_ENERGY
  points.push([energy, boilingPoint])

  energy += endTemp - boilingPoint
  points.push([energy, endTemp])

  return points.map(([e, t]) => [round(e), round(t)])
}

export const statesKernel: SimKernel<StatesParams, SimResult> = (params) => {
  const meltingPoint = clamp(params['meltingPoint'] ?? 0, -250, 100)
  // A boiling point at or below the melting point describes nothing, so it is pushed clear.
  const boilingPoint = Math.max(
    meltingPoint + 10,
    clamp(params['boilingPoint'] ?? 100, -200, 400),
  )
  const temperature = clamp(params['temperature'] ?? 25, -250, 400)
  const pressure = clamp(params['pressure'] ?? 1, 0.5, 4)

  const curve = heatingCurve(meltingPoint, boilingPoint)
  const state = stateAt(temperature, meltingPoint, boilingPoint)

  const series: SimSeries[] = [
    {
      key: 'heating',
      label: { en: 'Temperature as energy is supplied', zh: '温度随供给能量的变化' },
      unit: { x: 'energy supplied (relative)', y: 'temperature / °C' },
      points: curve,
      // The two plateaus sit at these temperatures, so the lines land exactly on them —
      // which is the point being made about where a change of state happens.
      guides: [
        { axis: 'y', value: round(meltingPoint, 0), label: `melting point ${round(meltingPoint, 0)} °C` },
        { axis: 'y', value: round(boilingPoint, 0), label: `boiling point ${round(boilingPoint, 0)} °C` },
      ],
    },
    {
      key: 'gas',
      label: { en: 'Volume of one mole of gas', zh: '1 摩尔气体的体积' },
      unit: { x: 'temperature / °C', y: 'volume / dm³' },
      points: Array.from({ length: 60 }, (_, i) => {
        const t = ABSOLUTE_ZERO + ((400 - ABSOLUTE_ZERO) * i) / 59
        return [round(t, 1), round(gasVolume(t, pressure))] as [number, number]
      }),
      xBounds: { min: ABSOLUTE_ZERO, max: 400 },
      guides: [
        { axis: 'x', value: ABSOLUTE_ZERO, label: 'absolute zero' },
        { axis: 'x', value: ROOM_TEMPERATURE, label: 'room temperature' },
      ],
    },
  ]

  const stateNote =
    state === 'solid'
      ? {
          en: `At ${round(temperature, 0)} °C this is a solid — below its melting point of ${round(meltingPoint, 0)} °C. The particles are packed closely in a regular pattern and can only vibrate about fixed positions, which is why a solid keeps both its shape and its volume`,
          zh: `在 ${round(temperature, 0)} °C 下它是固体——低于 ${round(meltingPoint, 0)} °C 的熔点。粒子紧密地排列成规则的结构，只能在固定位置附近振动，因此固体既保持形状也保持体积`,
        }
      : state === 'liquid'
        ? {
            en: `At ${round(temperature, 0)} °C this is a liquid — above ${round(meltingPoint, 0)} °C but below ${round(boilingPoint, 0)} °C. The particles are still close together but now irregularly arranged and able to slide past one another, so a liquid keeps its volume but takes the shape of its container`,
            zh: `在 ${round(temperature, 0)} °C 下它是液体——高于 ${round(meltingPoint, 0)} °C 但低于 ${round(boilingPoint, 0)} °C。粒子仍然靠得很近，但排列不规则且能相互滑动，因此液体保持体积却随容器改变形状`,
          }
        : {
            en: `At ${round(temperature, 0)} °C this is a gas — above its boiling point of ${round(boilingPoint, 0)} °C. The particles are far apart and moving quickly in all directions, so a gas has neither a fixed shape nor a fixed volume and can be compressed`,
            zh: `在 ${round(temperature, 0)} °C 下它是气体——高于 ${round(boilingPoint, 0)} °C 的沸点。粒子相距很远并向各个方向快速运动，因此气体既没有固定形状也没有固定体积，并且可以被压缩`,
          }

  const plateauNote = {
    en: `The two flat stretches are the changes of state. Energy is still going in, but it is being used to pull the particles apart against the forces holding them together rather than to make them move faster — and temperature measures how fast they move, so it cannot rise until the change is complete. Boiling takes far longer than melting because melting only loosens the particles while boiling separates them completely`,
    zh: `两段水平线就是物态变化。能量仍在输入，但它被用来克服粒子间的作用力把粒子分开，而不是让粒子运动得更快——而温度衡量的正是粒子运动的快慢，所以在变化完成之前温度无法上升。沸腾比熔化耗时长得多，因为熔化只是让粒子松动，沸腾则是把它们彻底分开`,
  }

  const gasNote = {
    en: `One mole of gas occupies ${round(gasVolume(temperature, pressure), 1)} dm³ at ${round(temperature, 0)} °C and ${round(pressure, 1)} atm. Heating makes the particles move faster, so they hit the walls harder and more often and push the walls further out; raising the pressure squeezes them back. The line extrapolates to nothing at −273 °C — though a real gas condenses to a liquid long before it gets there, so the lower end of that line is where the gas would be if it stayed a gas`,
    zh: `在 ${round(temperature, 0)} °C、${round(pressure, 1)} atm 下，1 摩尔气体占 ${round(gasVolume(temperature, pressure), 1)} dm³。加热使粒子运动更快，撞击器壁更有力也更频繁，从而把器壁推得更远；加压则把它们压回去。这条直线外推到 −273 °C 时体积为零——不过真实气体远在到达那里之前就已凝结成液体，因此这条线的下端表示的是"假如它仍是气体"的情形`,
  }

  return {
    series,
    readouts: {
      meltingPoint: round(meltingPoint, 0),
      boilingPoint: round(boilingPoint, 0),
      temperature: round(temperature, 0),
      gasVolume: round(gasVolume(temperature, pressure), 1),
    },
    markers: [
      { x: 0, y: 0, label: stateNote },
      { x: 0, y: 0, label: plateauNote },
      { x: 0, y: 0, label: gasNote },
    ],
  }
}

export default statesKernel
