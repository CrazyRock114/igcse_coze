/**
 * Alloys — kernel for lesson 0620/9-3-alloys.
 *
 * A pure metal is layers of identical atoms, and identical atoms in neat rows slide over
 * one another easily. That sliding is what "soft" and "malleable" mean at the atomic
 * scale. Put atoms of a different size in among them and the rows are no longer neat, so
 * they catch instead of sliding — which is the whole of why an alloy is harder than the
 * metal it is made from.
 *
 * So the model here is literally that: rows of atoms, a force that slides the upper rows
 * across the lower ones, and a slip distance that collapses as soon as a differently sized
 * atom sits on the slip plane. Nothing is a lookup — the hardness comes out of the
 * geometry, which is what makes it worth drawing rather than stating.
 *
 * Covers 0620.9.2.1 and 9.3.1–5.
 */

import type { Bilingual, SimBody, SimKernel, SimResult } from '@/content/types'

export interface AlloyParams extends Record<string, number> {
  /** Index into MIXTURES */
  mixture: number
  /** Force pushing the upper layers sideways, 0 to 1 */
  force: number
}

export interface Mixture {
  key: string
  label: Bilingual
  /** Guest atoms in the block drawn. Zero is the pure metal. */
  guests: number
  /** Guest radius relative to the host's. Different in either direction spoils the rows. */
  guestRadius: number
  use: Bilingual
}

export const MIXTURES: Mixture[] = [
  {
    key: 'pure',
    label: { en: 'Pure copper', zh: '纯铜' },
    guests: 0,
    guestRadius: 1,
    use: { en: 'wiring, where softness is wanted so it can be bent', zh: '电线，需要柔软以便弯折' },
  },
  {
    key: 'brass',
    label: { en: 'Brass: copper + zinc', zh: '黄铜：铜 + 锌' },
    guests: 3,
    guestRadius: 0.86,
    use: { en: 'door handles and instruments — harder, and it resists corrosion', zh: '门把手和乐器——更硬，且耐腐蚀' },
  },
  {
    key: 'steel',
    label: { en: 'Steel: iron + carbon', zh: '钢：铁 + 碳' },
    guests: 2,
    guestRadius: 0.55,
    use: { en: 'girders and tools, where strength matters most', zh: '钢梁和工具，最看重强度' },
  },
  {
    key: 'stainless',
    label: { en: 'Stainless steel: iron + chromium', zh: '不锈钢：铁 + 铬' },
    guests: 6,
    guestRadius: 1.12,
    use: { en: 'cutlery and sinks — hard, and it does not rust', zh: '餐具和水槽——坚硬，且不生锈' },
  },
]

/**
 * Atoms per row and rows in the block drawn.
 *
 * Four rows so that two layers slide over two — one row moving over one would not read as
 * layers. The guest counts are schematic: real steel is under 2% carbon, but one atom in
 * thirty-two is the fewest that still shows the mechanism.
 */
export const COLUMNS = 8
export const ROWS = 4
/** The rows above this index slide; the ones below stay put. */
const SLIP_ROW = 1

/**
 * Where the guest atoms go, spread through the block rather than clustered.
 *
 * Deterministic: a lesson that redrew its own diagram differently on every render would
 * be impossible to talk about, and a test could not pin it down.
 */
export function guestPositions(count: number): number[] {
  const total = COLUMNS * ROWS
  if (count <= 0) return []
  // Even spacing with an offset, so guests do not all land in one row or one column.
  const step = total / count
  return Array.from({ length: count }, (_, i) => Math.floor(i * step + step / 2) % total)
}

/**
 * How far the upper layers can slide, in atom spacings.
 *
 * A pure metal slides a whole spacing — one row of atoms simply moves along to the next
 * identical site. A guest atom on the slip plane is the wrong size for that site, so the
 * rows catch: the more guests near the plane, the less it gives.
 */
export function maximumSlip(mixture: Mixture): number {
  if (mixture.guests === 0) return 1

  const onPlane = guestPositions(mixture.guests).filter((p) => {
    const row = Math.floor(p / COLUMNS)
    return row === SLIP_ROW || row === SLIP_ROW + 1
  }).length

  // Each obstructing atom costs the layers most of what is left of their freedom, and a
  // more mismatched atom costs more than a slightly mismatched one.
  const mismatch = Math.abs(1 - mixture.guestRadius)
  return Math.max(0.06, 1 / (1 + onPlane * (1 + mismatch * 4)))
}

export const alloyKernel: SimKernel<AlloyParams, SimResult> = ({ mixture, force }) => {
  const chosen = MIXTURES[Math.min(MIXTURES.length - 1, Math.max(0, Math.round(mixture)))]!
  const push = Math.min(1, Math.max(0, force))
  const slip = maximumSlip(chosen) * push

  const guests = new Set(guestPositions(chosen.guests))
  const bodies: SimBody[] = []

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLUMNS; col++) {
      const index = row * COLUMNS + col
      const isGuest = guests.has(index)
      // Rows above the slip plane carry the whole displacement; the ones below do not move.
      const shift = row > SLIP_ROW ? slip : 0
      bodies.push({
        x: col + shift,
        y: row,
        r: isGuest ? chosen.guestRadius * 0.5 : 0.5,
        kind: isGuest ? 'guest' : 'host',
      })
    }
  }

  // The slip plane itself, so the student can see which layers are being asked to move.
  bodies.push({ x: -0.6, y: SLIP_ROW + 0.5, kind: 'slip-plane' })

  const percent = Math.round((chosen.guests / (COLUMNS * ROWS)) * 100)
  const isPure = chosen.guests === 0

  const headline: Bilingual = isPure
    ? { en: 'Pure metal — the layers slide freely', zh: '纯金属——层与层之间自由滑动' }
    : {
        en: `Alloy — ${percent}% of the atoms are a different size`,
        zh: `合金——${percent}% 的原子大小不同`,
      }

  const note: Bilingual = isPure
    ? {
        en: 'Identical atoms in identical rows, so a layer can move to the next site without resistance. That is why a pure metal is soft and easy to shape.',
        zh: '相同的原子排成相同的行，所以一层可以毫无阻力地移到下一个位置。这就是纯金属柔软易加工的原因。',
      }
    : {
        en: 'The different-sized atoms distort the rows, so the layers catch instead of sliding. Same elements, no chemical reaction — just a mixture that cannot deform. Used for ' + chosen.use.en + '.',
        zh: '大小不同的原子使原子层排列变形，层与层不再滑动而是相互卡住。元素相同、没有化学反应——只是一种无法变形的混合物。用于' + (chosen.use.zh ?? '') + '。',
      }

  return {
    series: [],
    bodies,
    markers: [
      { x: 0, y: 0, label: chosen.label },
      { x: 0, y: 0, label: headline },
      { x: 0, y: 0, label: note },
    ],
    readouts: {
      layerSlip: Math.round(slip * 100) / 100,
      maximumSlip: Math.round(maximumSlip(chosen) * 100) / 100,
      guestAtoms: chosen.guests,
      percentGuest: percent,
    },
    bounds: { xMin: -1, xMax: COLUMNS + 1, yMin: -1, yMax: ROWS },
  }
}

export default alloyKernel
