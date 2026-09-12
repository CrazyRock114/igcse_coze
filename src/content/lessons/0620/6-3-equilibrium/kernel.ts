/**
 * Reversible reactions and equilibrium — kernel for lesson 0620/6-3-equilibrium.
 *
 * The equilibrium yield of ammonia against temperature and against pressure, for the Haber
 * process. Two panels, because the two conditions pull in different directions and the
 * industrial answer is a compromise between them rather than an optimum of either.
 *
 * Where the numbers come from. These are published equilibrium yields for a 1 : 3 nitrogen to
 * hydrogen mixture, tabulated at four pressures and five temperatures, with interpolation
 * between them — linear in temperature and linear in log pressure, since the pressures span
 * more than a decade. It is not a thermodynamic calculation from ΔH and Kp. Interpolating real
 * data is honest in a way that a fitted curve of my own devising would not be: at the tabulated
 * points the model returns exactly what the reference says, and a test holds it to that.
 *
 * What the two panels are for. Lowering the temperature raises the yield, so a student who has
 * just learned Le Chatelier's principle concludes the plant should run cold — and is wrong,
 * because the rate would be uselessly slow and the catalyst ineffective. Raising the pressure
 * raises the yield too, without limit as far as the graph is concerned, and the reason not to
 * is money and safety rather than chemistry. Both curves have to be read against something the
 * graph does not show, which is exactly the point being made about industrial conditions.
 *
 * Covers 0620.6.3.1–6.
 */

import type { Bilingual, SimKernel, SimResult, SimSeries } from '@/content/types'

export interface EquilibriumParams extends Record<string, number> {
  /** Temperature in °C. */
  temperature: number
  /** Pressure in atmospheres. */
  pressure: number
}

/** Tabulated pressures, in atmospheres. */
export const PRESSURES = [10, 100, 200, 400] as const
/** Tabulated temperatures, in °C. */
export const TEMPERATURES = [200, 300, 400, 500, 600] as const

/**
 * Published equilibrium yields of ammonia, as a mole percentage, for a 1 : 3 N₂ : H₂ mixture.
 * Rows follow PRESSURES, columns follow TEMPERATURES.
 */
export const YIELD_TABLE: number[][] = [
  [50.7, 14.7, 3.9, 1.2, 0.5],
  [81.5, 52.1, 25.1, 10.6, 4.5],
  [89.9, 66.7, 38.8, 18.3, 8.3],
  [94.6, 79.7, 55.4, 31.9, 15.3],
]

/** The conditions a real ammonia plant runs at. */
export const INDUSTRIAL = { temperature: 450, pressure: 200 }

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))

/** Position of a value in a sorted list, as an index with a fraction. */
function locate(value: number, points: readonly number[]): { i: number; f: number } {
  const last = points.length - 1
  if (value <= points[0]!) return { i: 0, f: 0 }
  if (value >= points[last]!) return { i: last - 1, f: 1 }
  for (let i = 0; i < last; i++) {
    const lo = points[i]!
    const hi = points[i + 1]!
    if (value <= hi) return { i, f: (value - lo) / (hi - lo) }
  }
  return { i: last - 1, f: 1 }
}

/**
 * Equilibrium yield of ammonia, as a percentage.
 *
 * Interpolated linearly in temperature and linearly in the logarithm of pressure — the
 * pressures span 10 to 400 atmospheres, and interpolating those linearly would badly
 * misplace everything below about 100 atm.
 */
export function ammoniaYield(temperatureC: number, pressureAtm: number): number {
  const t = locate(clamp(temperatureC, 200, 600), TEMPERATURES)
  const logPressures = PRESSURES.map((p) => Math.log(p))
  const p = locate(Math.log(clamp(pressureAtm, 10, 400)), logPressures)

  const at = (pi: number, ti: number) => YIELD_TABLE[pi]![ti]!
  const lower = at(p.i, t.i) + (at(p.i, t.i + 1) - at(p.i, t.i)) * t.f
  const upper = at(p.i + 1, t.i) + (at(p.i + 1, t.i + 1) - at(p.i + 1, t.i)) * t.f
  return lower + (upper - lower) * p.f
}

const round = (v: number, dp = 1) => {
  const f = 10 ** dp
  return Math.round(v * f) / f
}

export const equilibriumKernel: SimKernel<EquilibriumParams, SimResult> = (params) => {
  const temperature = clamp(params['temperature'] ?? 450, 200, 600)
  const pressure = clamp(params['pressure'] ?? 200, 10, 400)

  const series: SimSeries[] = [
    {
      key: 'vsTemperature',
      label: {
        en: 'Yield of ammonia against temperature',
        zh: '氨的产率随温度的变化',
      },
      unit: { x: 'temperature / °C', y: 'yield of ammonia / %' },
      points: Array.from({ length: 41 }, (_, i) => {
        const t = 200 + (400 * i) / 40
        return [round(t, 0), round(ammoniaYield(t, pressure))] as [number, number]
      }),
      xBounds: { min: 200, max: 600 },
      yBounds: { min: 0, max: 100 },
      // Reading "the yield at 450 °C" off this curve by eye is where the compromise
      // argument is won or lost, so the line does the finding.
      guides: [{ axis: 'x', value: INDUSTRIAL.temperature, label: 'industrial 450 °C' }],
    },
    {
      key: 'vsPressure',
      label: { en: 'Yield of ammonia against pressure', zh: '氨的产率随压强的变化' },
      unit: { x: 'pressure / atm', y: 'yield of ammonia / %' },
      points: Array.from({ length: 41 }, (_, i) => {
        const p = 10 + (390 * i) / 40
        return [round(p, 0), round(ammoniaYield(temperature, p))] as [number, number]
      }),
      xBounds: { min: 0, max: 400 },
      yBounds: { min: 0, max: 100 },
      guides: [{ axis: 'x', value: INDUSTRIAL.pressure, label: 'industrial 200 atm' }],
    },
  ]

  const here = ammoniaYield(temperature, pressure)
  const industrial = ammoniaYield(INDUSTRIAL.temperature, INDUSTRIAL.pressure)

  const shiftNote: Bilingual = {
    en: `At ${round(temperature, 0)} °C and ${round(pressure, 0)} atm the equilibrium yield is ${round(here)}%. The forward reaction is exothermic, so cooling shifts the equilibrium towards ammonia; and four molecules of gas become two, so raising the pressure shifts it towards ammonia as well. Both graphs agree with that`,
    zh: `在 ${round(temperature, 0)} °C、${round(pressure, 0)} atm 下平衡产率为 ${round(here)}%。正反应是放热的，因此降温使平衡向生成氨的方向移动；而 4 个气体分子变成 2 个，因此加压也使平衡向生成氨的方向移动。两幅图都与此一致`,
  }

  const compromiseNote: Bilingual = {
    en:
      temperature < 350
        ? `A real plant does not run this cold, even though the yield looks far better. At ${round(temperature, 0)} °C the reaction is far too slow to be useful and the iron catalyst barely works, so very little ammonia is made per hour however good the equilibrium position is. About 450 °C is the compromise: a yield of only ${round(industrial)}%, reached quickly enough to matter`
        : temperature > 550
          ? `Hot enough to react quickly, but the yield has collapsed to ${round(here)}%. Rate and yield pull in opposite directions here, and pushing either one to its limit gives a worse plant than the compromise at about 450 °C`
          : `Around the industrial temperature. The yield of ${round(industrial)}% at 450 °C and 200 atm looks poor beside what a cold reactor would give, but it is reached fast enough to be worth having — and the unreacted nitrogen and hydrogen are recycled, so nothing is wasted`,
    zh:
      temperature < 350
        ? `真实工厂不会在这么低的温度下运行，尽管产率看起来好得多。在 ${round(temperature, 0)} °C 下反应太慢，铁催化剂也几乎不起作用，因此无论平衡位置多有利，每小时生成的氨都很少。约 450 °C 是折中：产率只有 ${round(industrial)}%，但快到足以有意义`
        : temperature > 550
          ? `温度高到足以快速反应，但产率已跌到 ${round(here)}%。速率与产率在这里方向相反，把任何一个推到极端，都不如约 450 °C 的折中`
          : `接近工业温度。450 °C、200 atm 下 ${round(industrial)}% 的产率与低温反应器相比显得不高，但它达到得够快，值得采用——而且未反应的氮和氢会循环使用，不会浪费`,
  }

  const pressureNote: Bilingual = {
    en: `Pressure is limited by cost rather than by chemistry: the yield keeps climbing all the way up the graph, but the pipework and compressors to contain ${round(pressure, 0)} atm are expensive to build and dangerous to run. Around 200 atm is where the extra ammonia stops being worth the extra steel`,
    zh: `限制压强的是成本而不是化学：产率在整幅图上一直上升，但要容纳 ${round(pressure, 0)} atm 的管道和压缩机建造昂贵、运行危险。约 200 atm 是多产的氨不再值得多花钢材的界限`,
  }

  return {
    series,
    readouts: {
      yieldHere: round(here),
      yieldIndustrial: round(industrial),
      temperature: round(temperature, 0),
      pressure: round(pressure, 0),
    },
    markers: [
      { x: 0, y: 0, label: shiftNote },
      { x: 0, y: 0, label: compromiseNote },
      { x: 0, y: 0, label: pressureNote },
    ],
  }
}

export default equilibriumKernel
