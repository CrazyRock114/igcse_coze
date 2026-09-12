/**
 * Osmosis — kernel for lesson 0610/3-2-osmosis.
 *
 * The potato-cylinder practical, and the reason for doing it. A student usually leaves this
 * experiment thinking the point was "cells gain water in dilute solutions". The point is the
 * intercept: the concentration at which the cylinders neither gain nor lose mass is the
 * concentration *inside* them, which is otherwise not measurable at all. You find something
 * hidden by finding where a line crosses zero.
 *
 * So the cell sap concentration is a parameter, and the graph's x-intercept follows it. Move
 * one and the other moves with it, which makes the relationship impossible to miss and
 * impossible to memorise the wrong way round.
 *
 * The gain is capped and the loss is not, because a plant cell has a cell wall. Water entering
 * raises the pressure against the wall until the wall pushes back hard enough to stop any
 * more coming in — that is what turgid means. Nothing stops water leaving.
 *
 * Covers 0610.3.2.4–9.
 */

import type { SimKernel, SimResult, SimSeries } from '@/content/types'

export interface OsmosisParams extends Record<string, number> {
  /** Sucrose concentration of the solution outside, in mol/dm³. */
  external: number
  /** Concentration of the cell sap inside, in mol/dm³. */
  cellSap: number
  /** Minutes the cylinder has been in the solution. */
  minutes: number
}

/** Minutes simulated on the time graph. */
export const DURATION = 60
/** Most mass a cylinder can gain, as a percentage. The cell wall stops it going further. */
export const MAX_GAIN = 22
/** Percentage mass change per mol/dm³ of difference, before the wall intervenes. */
const RESPONSE = 55
/** Minutes for the change to get most of the way to its final value. */
const TIME_CONSTANT = 18

/**
 * Final percentage change in mass, once the cylinder has stopped changing.
 *
 * Proportional to the difference in concentration, which sets both the size and the
 * direction — and the direction is the whole answer to "will it gain or lose?".
 */
export function finalChange(external: number, cellSap: number): number {
  const raw = RESPONSE * (cellSap - external)
  // A cell wall limits how much water can enter; nothing limits how much can leave.
  return raw > 0 ? Math.min(MAX_GAIN, raw) : Math.max(-60, raw)
}

/** Percentage change in mass after `minutes` in the solution. */
export function changeAt(minutes: number, external: number, cellSap: number): number {
  const t = Math.max(0, minutes)
  return finalChange(external, cellSap) * (1 - Math.exp(-t / TIME_CONSTANT))
}

export type CellState = 'turgid' | 'atEquilibrium' | 'flaccid' | 'plasmolysed'

/**
 * What the cell looks like under a microscope.
 *
 * Flaccid and plasmolysed are not the same thing and are worth separating: flaccid is
 * limp, with the membrane still against the wall; plasmolysed is when so much water has
 * gone that the membrane has pulled away from the wall entirely.
 */
export function cellState(external: number, cellSap: number): CellState {
  const difference = cellSap - external
  if (difference > 0.05) return 'turgid'
  if (difference > -0.05) return 'atEquilibrium'
  if (difference > -0.25) return 'flaccid'
  return 'plasmolysed'
}

const STATE_LABEL: Record<CellState, { en: string; zh: string }> = {
  turgid: {
    en: 'Turgid — water has entered and the cell is pushing hard against its wall',
    zh: '膨胀——水已进入，细胞正紧紧顶住细胞壁',
  },
  atEquilibrium: {
    en: 'No net change — the solution is the same concentration as the cell sap',
    zh: '无净变化——外界溶液与细胞液浓度相同',
  },
  flaccid: {
    en: 'Flaccid — water has left and the cell has gone limp',
    zh: '萎蔫——水已流出，细胞变软',
  },
  plasmolysed: {
    en: 'Plasmolysed — so much water has left that the membrane has pulled away from the wall',
    zh: '质壁分离——失水过多，细胞膜已从细胞壁上分离',
  },
}

const round = (v: number) => Math.round(v * 10) / 10

export const osmosisKernel: SimKernel<OsmosisParams, SimResult> = (params) => {
  const external = Math.min(1, Math.max(0, params['external'] ?? 0.2))
  const cellSap = Math.min(0.8, Math.max(0.05, params['cellSap'] ?? 0.3))
  const minutes = Math.min(DURATION, Math.max(0, params['minutes'] ?? 30))

  const series: SimSeries[] = [
    {
      key: 'concentration',
      label: {
        en: 'Change in mass against sucrose concentration',
        zh: '质量变化随蔗糖浓度的变化',
      },
      unit: { x: 'sucrose concentration / mol dm⁻³', y: 'change in mass / %' },
      points: Array.from({ length: 41 }, (_, i) => {
        const x = Math.round(i * 0.025 * 1000) / 1000
        return [x, round(changeAt(minutes, x, cellSap))] as [number, number]
      }),
      xBounds: { min: 0, max: 1 },
      // Spans zero, because where the line crosses zero is the answer the practical exists
      // to find. An axis starting at the lowest value would hide the crossing.
      yBounds: { min: -40, max: 30 },
    },
    {
      key: 'time',
      label: { en: 'Change in mass over time', zh: '质量变化随时间的变化' },
      unit: { x: 'time / min', y: 'change in mass / %' },
      points: Array.from({ length: 61 }, (_, t) => [
        t,
        round(changeAt(t, external, cellSap)),
      ] as [number, number]),
      xBounds: { min: 0, max: DURATION },
      yBounds: { min: -40, max: 30 },
    },
  ]

  return {
    series,
    readouts: {
      change: round(changeAt(minutes, external, cellSap)),
      final: round(finalChange(external, cellSap)),
      // Where the line crosses zero — which is the cell sap concentration, and the whole
      // reason for plotting the graph.
      intercept: Math.round(cellSap * 1000) / 1000,
      difference: Math.round((cellSap - external) * 1000) / 1000,
    },
    markers: [{ x: 0, y: 0, label: STATE_LABEL[cellState(external, cellSap)] }],
  }
}

export default osmosisKernel
