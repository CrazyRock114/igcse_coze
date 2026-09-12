/**
 * Reproduction — kernel for lesson 0610/16-1-reproduction.
 *
 * The menstrual cycle: four hormones and the thickness of the uterus lining, over one cycle.
 * It is the one part of this topic that is a set of quantities changing together rather than
 * a set of structures to name, and it is the graph that turns up in the exam.
 *
 * Two things are built in that a printed diagram cannot show.
 *
 * The cycle length is adjustable, and ovulation is placed fourteen days *before the next
 * period* rather than fourteen days after the last one. That is the physiological fact — the
 * luteal phase is near-constant while the follicular phase varies — and it is the reason
 * "ovulation is on day 14" is only true of a 28-day cycle. Set the cycle to 35 days and
 * ovulation moves to day 21.
 *
 * And pregnancy is a switch. If the egg is fertilised, progesterone is maintained instead of
 * falling, so the lining is not shed and there is no period; and the high progesterone
 * suppresses FSH and LH, so no further egg is released. That is one mechanism explaining
 * three things at once — why pregnancy stops menstruation, why it stops ovulation, and how
 * the contraceptive pill works.
 *
 * Covers 0610.16.5.2–4.
 */

import type { SimKernel, SimResult, SimSeries } from '@/content/types'

export interface ReproductionParams extends Record<string, number> {
  /** Length of the whole cycle in days. */
  cycleLength: number
  /** Day being inspected. */
  day: number
  /** 1 if the egg was fertilised. */
  pregnant: number
}

/**
 * Days from ovulation to the next period.
 *
 * Near-constant between women and between cycles, unlike the phase before ovulation. This
 * is why ovulation is counted backwards from the next period rather than forwards from the
 * last one.
 */
export const LUTEAL_PHASE = 14
/** Days of menstruation at the start of a cycle. */
export const PERIOD_DAYS = 5

export const MIN_CYCLE = 21
export const MAX_CYCLE = 35

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))

/** Day of ovulation, counted back from the end of the cycle. */
export function ovulationDay(cycleLength: number): number {
  return clamp(cycleLength, MIN_CYCLE, MAX_CYCLE) - LUTEAL_PHASE
}

/** A smooth bump, 1 at the centre and falling away either side. */
function bump(day: number, centre: number, width: number): number {
  return Math.exp(-(((day - centre) / width) ** 2))
}

export interface Levels {
  fsh: number
  lh: number
  oestrogen: number
  progesterone: number
}

/**
 * Hormone levels on a given day, in relative units.
 *
 * Relative because the syllabus asks for the shapes and their causes, not for
 * concentrations — and quoting figures in nanomoles would imply a precision this model
 * does not have.
 */
export function hormones(day: number, cycleLength: number, pregnant: boolean): Levels {
  const ov = ovulationDay(cycleLength)
  const afterOv = day - ov

  const oestrogen = 15 + 60 * bump(day, ov - 1, 3) + 28 * bump(day, ov + 7, 5)
  let progesterone = 5 + 75 * bump(day, ov + 7, 4.5)

  // With a pregnancy the corpus luteum is maintained, so progesterone does not fall away.
  if (pregnant && afterOv >= 7) progesterone = Math.max(progesterone, 80 + afterOv * 0.6)

  // High progesterone inhibits FSH and LH — the same mechanism the contraceptive pill uses.
  const suppression = pregnant && afterOv >= 7 ? 0.12 : 1

  return {
    fsh: (15 + 35 * bump(day, 3, 3) + 22 * bump(day, ov, 1.5)) * suppression,
    lh: (12 + 80 * bump(day, ov, 1.2)) * suppression,
    oestrogen: pregnant && afterOv >= 7 ? Math.max(oestrogen, 55) : oestrogen,
    progesterone,
  }
}

/**
 * Thickness of the uterus lining in mm.
 *
 * Shed during the period, rebuilt through the follicular phase under oestrogen, held thick
 * through the luteal phase under progesterone, and shed again when progesterone falls —
 * unless there is a pregnancy to maintain it.
 */
export function liningThickness(day: number, cycleLength: number, pregnant: boolean): number {
  const cycle = clamp(cycleLength, MIN_CYCLE, MAX_CYCLE)
  const ov = ovulationDay(cycle)

  if (day <= PERIOD_DAYS) {
    // Being shed: falls from what was left to almost nothing.
    return 5 - (4 * (day - 1)) / (PERIOD_DAYS - 1)
  }

  // Rebuilding, then thickening further after ovulation.
  const rebuilt = 1 + (7 * (day - PERIOD_DAYS)) / Math.max(1, ov - PERIOD_DAYS)
  if (day <= ov) return rebuilt

  const peak = 12
  const thickened = 8 + ((peak - 8) * Math.min(day - ov, 7)) / 7
  if (pregnant) return thickened

  // Progesterone falls in the last two days and the lining begins to break down.
  const breakdownFrom = cycle - 2
  if (day <= breakdownFrom) return thickened
  return thickened - (thickened - 5) * ((day - breakdownFrom) / 2)
}

export type Phase = 'menstruation' | 'follicular' | 'ovulation' | 'luteal' | 'pregnancy'

export function phaseOn(day: number, cycleLength: number, pregnant: boolean): Phase {
  const ov = ovulationDay(cycleLength)
  // Only from the point where the hormones actually diverge. For the first week after
  // fertilisation the cycle is indistinguishable from any other, which is precisely why
  // a pregnancy cannot be noticed immediately — so labelling those days differently
  // would be claiming something the graph does not show.
  if (pregnant && day >= ov + 7) return 'pregnancy'
  if (day <= PERIOD_DAYS) return 'menstruation'
  if (Math.abs(day - ov) < 1) return 'ovulation'
  return day < ov ? 'follicular' : 'luteal'
}

const PHASE_LABEL: Record<Phase, { en: string; zh: string }> = {
  menstruation: {
    en: 'Menstruation — the lining is being shed',
    zh: '月经期——子宫内膜正在脱落',
  },
  follicular: {
    en: 'Before ovulation — oestrogen is rebuilding the lining',
    zh: '排卵前——雌激素正在重建子宫内膜',
  },
  ovulation: {
    en: 'Ovulation — the LH surge releases the egg',
    zh: '排卵——LH 峰值促使卵子排出',
  },
  luteal: {
    en: 'After ovulation — progesterone is maintaining the lining',
    zh: '排卵后——孕激素正在维持子宫内膜',
  },
  pregnancy: {
    en: 'Pregnancy — progesterone stays high, so there is no period and no further ovulation',
    zh: '妊娠——孕激素持续偏高，因此不来月经，也不再排卵',
  },
}

const round = (v: number) => Math.round(v * 10) / 10

export const reproductionKernel: SimKernel<ReproductionParams, SimResult> = (params) => {
  const cycle = clamp(Math.round(params['cycleLength'] ?? 28), MIN_CYCLE, MAX_CYCLE)
  const pregnant = (params['pregnant'] ?? 0) >= 0.5
  const day = clamp(Math.round(params['day'] ?? 1), 1, cycle)

  const days = Array.from({ length: cycle }, (_, i) => i + 1)
  const at = (d: number) => hormones(d, cycle, pregnant)

  const series: SimSeries[] = [
    {
      key: 'fsh',
      label: { en: 'FSH', zh: '促卵泡激素 FSH' },
      unit: { x: 'day of cycle', y: 'hormone level / relative units' },
      points: days.map((d) => [d, round(at(d).fsh)]),
      xBounds: { min: 0, max: MAX_CYCLE },
      yBounds: { min: 0, max: 120 },
    },
    {
      key: 'lh',
      label: { en: 'LH', zh: '促黄体生成素 LH' },
      unit: { x: 'day of cycle', y: 'hormone level / relative units' },
      points: days.map((d) => [d, round(at(d).lh)]),
      xBounds: { min: 0, max: MAX_CYCLE },
      yBounds: { min: 0, max: 120 },
    },
    {
      key: 'oestrogen',
      label: { en: 'Oestrogen', zh: '雌激素' },
      unit: { x: 'day of cycle', y: 'ovarian hormone / relative units' },
      points: days.map((d) => [d, round(at(d).oestrogen)]),
      xBounds: { min: 0, max: MAX_CYCLE },
      yBounds: { min: 0, max: 120 },
    },
    {
      key: 'progesterone',
      label: { en: 'Progesterone', zh: '孕激素' },
      unit: { x: 'day of cycle', y: 'ovarian hormone / relative units' },
      points: days.map((d) => [d, round(at(d).progesterone)]),
      xBounds: { min: 0, max: MAX_CYCLE },
      yBounds: { min: 0, max: 120 },
    },
    {
      key: 'lining',
      label: { en: 'Thickness of the uterus lining', zh: '子宫内膜厚度' },
      unit: { x: 'day of cycle', y: 'lining / mm' },
      points: days.map((d) => [d, round(liningThickness(d, cycle, pregnant))]),
      xBounds: { min: 0, max: MAX_CYCLE },
      yBounds: { min: 0, max: 15 },
    },
  ]

  const today = at(day)

  return {
    series,
    readouts: {
      ovulation: ovulationDay(cycle),
      oestrogen: round(today.oestrogen),
      progesterone: round(today.progesterone),
      lining: round(liningThickness(day, cycle, pregnant)),
    },
    markers: [{ x: 0, y: 0, label: PHASE_LABEL[phaseOn(day, cycle, pregnant)] }],
  }
}

export default reproductionKernel
