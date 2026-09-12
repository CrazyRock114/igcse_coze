import { describe, expect, it } from 'vitest'
import statesKernel from '@/content/lessons/0620/1-1-states-of-matter/kernel'
import equilibriumKernel, { INDUSTRIAL } from '@/content/lessons/0620/6-3-equilibrium/kernel'
import fuelsKernel from '@/content/lessons/0620/11-3-fuels/kernel'
import type { SimGuide, SimSeries } from '@/content/types'

const guidesOn = (series: SimSeries[], key: string): SimGuide[] =>
  series.find((s) => s.key === key)?.guides ?? []

/**
 * A guide outside the axis range is not drawn, so one placed there is a line the author
 * believes is on the graph and the student never sees. These check the values land inside
 * the panel they are attached to.
 */
const withinBounds = (series: SimSeries[], key: string) => {
  const s = series.find((x) => x.key === key)!
  return (g: SimGuide) => {
    if (g.axis === 'x') {
      const min = s.xBounds?.min ?? Math.min(...s.points.map((p) => p[0]))
      const max = s.xBounds?.max ?? Math.max(...s.points.map((p) => p[0]))
      return g.value >= min && g.value <= max
    }
    const min = s.yBounds?.min ?? Math.min(...s.points.map((p) => p[1]))
    const max = s.yBounds?.max ?? Math.max(...s.points.map((p) => p[1]))
    return g.value >= min && g.value <= max
  }
}

describe('the heating curve', () => {
  it('marks the melting and boiling points at the temperatures the curve levels off', () => {
    // A guide that missed the plateau would point at the wrong place on a correct graph,
    // which is worse than no guide at all.
    const series = statesKernel({
      meltingPoint: -114,
      boilingPoint: 78,
      temperature: 25,
      pressure: 1,
    }).series
    const guides = guidesOn(series, 'heating')
    expect(guides.map((g) => g.value).sort((a, b) => a - b)).toEqual([-114, 78])
    expect(guides.every((g) => g.axis === 'y')).toBe(true)

    const points = series.find((s) => s.key === 'heating')!.points
    for (const g of guides) {
      const flat = points.filter((p) => p[1] === g.value)
      expect(flat.length, `plateau at ${g.value}`).toBe(2)
    }
  })

  it('moves the guides when the substance is changed', () => {
    const water = guidesOn(
      statesKernel({ meltingPoint: 0, boilingPoint: 100, temperature: 25, pressure: 1 }).series,
      'heating',
    )
    expect(water.map((g) => g.value).sort((a, b) => a - b)).toEqual([0, 100])
  })

  it('keeps every guide inside its panel', () => {
    const series = statesKernel({
      meltingPoint: 0,
      boilingPoint: 100,
      temperature: 25,
      pressure: 1,
    }).series
    for (const key of ['heating', 'gas']) {
      const inside = withinBounds(series, key)
      for (const g of guidesOn(series, key)) {
        expect(inside(g), `${key} guide at ${g.value}`).toBe(true)
      }
    }
  })

  it('marks absolute zero and room temperature on the gas panel', () => {
    const guides = guidesOn(
      statesKernel({ meltingPoint: 0, boilingPoint: 100, temperature: 25, pressure: 1 }).series,
      'gas',
    )
    expect(guides.map((g) => g.value).sort((a, b) => a - b)).toEqual([-273, 25])
  })
})

describe('the Haber graphs', () => {
  it('marks the conditions a real plant runs at on both panels', () => {
    const series = equilibriumKernel({ temperature: 450, pressure: 200 }).series
    expect(guidesOn(series, 'vsTemperature')[0]?.value).toBe(INDUSTRIAL.temperature)
    expect(guidesOn(series, 'vsPressure')[0]?.value).toBe(INDUSTRIAL.pressure)
  })

  it('keeps both guides inside their panels', () => {
    const series = equilibriumKernel({ temperature: 450, pressure: 200 }).series
    for (const key of ['vsTemperature', 'vsPressure']) {
      const inside = withinBounds(series, key)
      for (const g of guidesOn(series, key)) {
        expect(inside(g), `${key} guide at ${g.value}`).toBe(true)
      }
    }
  })
})

describe('the fuels graph', () => {
  it('marks room temperature, which separates the gases from the liquids', () => {
    const series = fuelsKernel({ carbonAtoms: 8 }).series
    const guides = guidesOn(series, 'boiling')
    expect(guides).toHaveLength(1)
    expect(guides[0]?.axis).toBe('y')

    // The line has to fall between the refinery-gas fractions and everything else, or it
    // marks nothing. Butane boils below it and pentane above.
    const points = series[0]!.points
    const bp = (n: number) => points.find((p) => p[0] === n)![1]
    expect(bp(4)).toBeLessThan(guides[0]!.value)
    expect(bp(5)).toBeGreaterThan(guides[0]!.value)
  })
})

describe('every guide in the course', () => {
  it('carries a label, since an unlabelled line is a line with no meaning', () => {
    const all = [
      ...statesKernel({ meltingPoint: 0, boilingPoint: 100, temperature: 25, pressure: 1 }).series,
      ...equilibriumKernel({ temperature: 450, pressure: 200 }).series,
      ...fuelsKernel({ carbonAtoms: 8 }).series,
    ].flatMap((s) => s.guides ?? [])

    expect(all.length).toBeGreaterThan(0)
    for (const g of all) {
      expect(g.label, `guide at ${g.value}`).toBeTruthy()
      expect(['x', 'y'], `guide at ${g.value}`).toContain(g.axis)
    }
  })
})
