import { describe, expect, it } from 'vitest'
import { bestFitLine, checkReading, gradePlot, makeMeasuringTask, mulberry32 } from './kernel'

describe('mulberry32', () => {
  it('is deterministic for a given seed', () => {
    const a = mulberry32(42)
    const b = mulberry32(42)
    expect([a(), a(), a()]).toEqual([b(), b(), b()])
  })

  it('produces values in [0, 1)', () => {
    const r = mulberry32(7)
    for (let i = 0; i < 200; i++) {
      const v = r()
      expect(v).toBeGreaterThanOrEqual(0)
      expect(v).toBeLessThan(1)
    }
  })
})

describe('makeMeasuringTask', () => {
  it('is deterministic per seed', () => {
    expect(makeMeasuringTask(123)).toEqual(makeMeasuringTask(123))
  })

  it('keeps the liquid inside the scale', () => {
    for (let seed = 0; seed < 500; seed++) {
      const t = makeMeasuringTask(seed)
      expect(t.liquidValue).toBeGreaterThanOrEqual(t.minValue)
      expect(t.liquidValue).toBeLessThanOrEqual(t.maxValue)
      // the level always sits on a half-minor boundary (round1 introduces fp noise)
      const rel = (t.liquidValue - t.minValue) / t.minorValue
      expect(Math.abs(rel - Math.round(rel * 2) / 2)).toBeLessThan(1e-6)
    }
  })

  it('emits both kinds across seeds', () => {
    const kinds = new Set(Array.from({ length: 60 }, (_, i) => makeMeasuringTask(i).kind))
    expect(kinds.has('cylinder')).toBe(true)
    expect(kinds.has('thermometer')).toBe(true)
  })
})

describe('checkReading', () => {
  const task = makeMeasuringTask(0)
  it('accepts the exact value', () => {
    expect(checkReading(task, task.liquidValue)).toBe(true)
  })
  it('accepts within half a smallest division (mark-scheme tolerance)', () => {
    const near = task.liquidValue + task.minorValue / 2
    expect(checkReading(task, near)).toBe(true)
  })
  it('rejects a full smallest division off', () => {
    const off = task.liquidValue + task.minorValue * 1.01
    expect(checkReading(task, off)).toBe(false)
  })
})

describe('bestFitLine', () => {
  it('recovers an exact linear relation', () => {
    const pts = [
      { x: 0, y: 1 },
      { x: 1, y: 3 },
      { x: 2, y: 5 },
      { x: 3, y: 7 },
    ]
    const fit = bestFitLine(pts)
    expect(fit.m).toBeCloseTo(2, 9)
    expect(fit.b).toBeCloseTo(1, 9)
    expect(fit.r2).toBeCloseTo(1, 9)
  })

  it('gives r2 < 1 for noisy data', () => {
    const pts = [
      { x: 0, y: 1 },
      { x: 1, y: 3.4 },
      { x: 2, y: 4.6 },
      { x: 3, y: 7.2 },
    ]
    const fit = bestFitLine(pts)
    expect(fit.r2).toBeGreaterThan(0.9)
    expect(fit.r2).toBeLessThan(1)
  })

  it('handles empty input without throwing', () => {
    expect(bestFitLine([]).m).toBe(0)
  })
})

describe('gradePlot', () => {
  const task = {
    id: 't',
    title: { en: 't', zh: 't' },
    prompt: { en: 'p', zh: 'p' },
    xLabel: 'x',
    yLabel: 'y',
    xMin: 0,
    xMax: 10,
    yMin: 0,
    yMax: 10,
    xMinor: 0.5,
    yMinor: 0.5,
    points: [
      { x: 1, y: 2 },
      { x: 4, y: 5 },
      { x: 8, y: 9 },
    ],
  }

  it('credits exact plots fully', () => {
    const g = gradePlot(task, task.points)
    expect(g.score).toBe(1)
    expect(g.extras).toBe(0)
  })

  it('credits within half a small square', () => {
    const g = gradePlot(task, [{ x: 1.2, y: 2.1 }, { x: 4, y: 5.2 }, { x: 8.1, y: 9 }])
    expect(g.score).toBe(1)
  })

  it('rejects points a full square away', () => {
    const g = gradePlot(task, [{ x: 1.6, y: 2.6 }, { x: 4.7, y: 5.7 }, { x: 8.7, y: 9.7 }])
    expect(g.score).toBe(0)
  })

  it('reports unmatched extras', () => {
    const g = gradePlot(task, [...task.points, { x: 0.1, y: 0.1 }])
    expect(g.score).toBe(1)
    expect(g.extras).toBe(1)
  })

  it('each plotted point can only match one expected point', () => {
    // Two expected points, one plotted point between them far from both.
    const g = gradePlot(task, [{ x: 1, y: 2 }], 2)
    expect(g.per.filter(Boolean).length).toBe(1)
  })
})
