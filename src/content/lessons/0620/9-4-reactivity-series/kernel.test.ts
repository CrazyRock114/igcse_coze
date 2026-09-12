import { describe, expect, it } from 'vitest'
import {
  ALUMINIUM_INDEX,
  METALS,
  REAGENTS,
  SERIES,
  observation,
  reactionCount,
  reacts,
  reactivityKernel,
} from './kernel'

const at = (symbol: string): number => SERIES.findIndex((e) => e.symbol === symbol)
const reagent = (key: string): Reagent => REAGENTS.find((r) => r.key === key)!
type Reagent = (typeof REAGENTS)[number]

function run(symbol: string, reagentKey: string) {
  const r = reactivityKernel({
    metal: METALS.indexOf(at(symbol)),
    reagent: REAGENTS.findIndex((x) => x.key === reagentKey),
  })
  return { ...r, bodies: r.bodies ?? [] }
}

describe('SERIES', () => {
  it('runs from potassium down to gold', () => {
    // 0620.9.4.1 — the order students are asked to state.
    expect(SERIES.map((e) => e.symbol)).toEqual([
      'K',
      'Na',
      'Ca',
      'Mg',
      'Al',
      'C',
      'Zn',
      'Fe',
      'H',
      'Cu',
      'Ag',
      'Au',
    ])
  })

  it('includes carbon and hydrogen as landmarks, not as metals', () => {
    expect(SERIES[at('C')]!.isMetal).toBe(false)
    expect(SERIES[at('H')]!.isMetal).toBe(false)
    expect(METALS).not.toContain(at('C'))
    expect(METALS).not.toContain(at('H'))
    expect(METALS).toHaveLength(10)
  })

  it('names every entry in both languages', () => {
    for (const e of SERIES) {
      expect(e.name.en.length, e.symbol).toBeGreaterThan(0)
      expect(e.name.zh, e.symbol).toBeTruthy()
    }
  })
})

describe('reacts', () => {
  it('has only the top three metals reacting with cold water', () => {
    // 0620.9.4.2 — potassium, sodium and calcium; magnesium only extremely slowly.
    for (const symbol of ['K', 'Na', 'Ca', 'Mg']) {
      expect(reacts(at(symbol), reagent('water')), symbol).toBe(true)
    }
    for (const symbol of ['Al', 'Zn', 'Fe', 'Cu', 'Ag', 'Au']) {
      expect(reacts(at(symbol), reagent('water')), symbol).toBe(false)
    }
  })

  it('stops dilute acid at hydrogen', () => {
    // The reason hydrogen is in the list at all: a metal below it cannot displace it.
    for (const symbol of ['K', 'Na', 'Ca', 'Mg', 'Al', 'Zn', 'Fe']) {
      expect(reacts(at(symbol), reagent('acid')), symbol).toBe(true)
    }
    for (const symbol of ['Cu', 'Ag', 'Au']) {
      expect(reacts(at(symbol), reagent('acid')), symbol).toBe(false)
    }
    expect(reagent('acid').threshold).toBeLessThan(at('H'))
  })

  it('lets copper displace silver but not the other way round', () => {
    expect(reacts(at('Cu'), reagent('silver-nitrate'))).toBe(true)
    expect(reacts(at('Ag'), reagent('silver-nitrate'))).toBe(false)
    expect(reacts(at('Au'), reagent('silver-nitrate'))).toBe(false)
  })

  it('never has a less reactive metal react where a more reactive one does not', () => {
    // The whole point of a series: reactivity is monotonic down it.
    for (const r of REAGENTS) {
      for (let i = 1; i < SERIES.length; i++) {
        if (reacts(i, r)) expect(reacts(i - 1, r), `${r.key} at ${SERIES[i]!.symbol}`).toBe(true)
      }
    }
  })

  it('leaves gold untouched by everything', () => {
    expect(reactionCount(at('Au'))).toBe(0)
    expect(reactionCount(at('Ag'))).toBe(0)
  })

  it('has potassium attacked by everything', () => {
    expect(reactionCount(at('K'))).toBe(REAGENTS.length)
  })

  it('makes the reaction count fall down the series', () => {
    const counts = METALS.map((i) => reactionCount(i))
    for (let i = 1; i < counts.length; i++) {
      expect(counts[i]!, SERIES[METALS[i]!]!.symbol).toBeLessThanOrEqual(counts[i - 1]!)
    }
  })
})

describe('observation', () => {
  it('describes what is seen for every metal and reagent, in both languages', () => {
    for (const i of METALS) {
      for (const r of REAGENTS) {
        const o = observation(i, r)
        expect(o.en.length, `${SERIES[i]!.symbol} ${r.key}`).toBeGreaterThan(0)
        expect(o.zh, `${SERIES[i]!.symbol} ${r.key}`).toBeTruthy()
      }
    }
  })

  it('says nothing happens when nothing happens', () => {
    expect(observation(at('Au'), reagent('acid'))).toEqual(reagent('acid').noReaction)
    expect(observation(at('Cu'), reagent('water'))).toEqual(reagent('water').noReaction)
  })

  it('separates the violent from the barely visible', () => {
    expect(observation(at('K'), reagent('water')).en).toMatch(/violent/i)
    expect(observation(at('Mg'), reagent('water')).en).toMatch(/slow/i)
  })

  it('gives every band a metal that lands in it', () => {
    // A band no metal ever reaches is dead data pretending to be content.
    for (const r of REAGENTS) {
      for (const band of r.bands) {
        const reached = METALS.some((i) => reacts(i, r) && r.bands.find((b) => i <= b.upTo) === band)
        expect(reached, `${r.key} band upTo ${band.upTo}`).toBe(true)
      }
    }
  })
})

describe('reactivityKernel', () => {
  it('draws one rung per element plus the threshold line', () => {
    const { bodies } = run('Fe', 'acid')
    expect(bodies.filter((b) => b.kind !== 'threshold')).toHaveLength(SERIES.length)
    expect(bodies.filter((b) => b.kind === 'threshold')).toHaveLength(1)
  })

  it('highlights exactly the metal chosen', () => {
    for (const symbol of ['K', 'Fe', 'Au']) {
      const selected = run(symbol, 'acid').bodies.filter((b) => b.kind === 'selected')
      expect(selected, symbol).toHaveLength(1)
      expect(selected[0]!.label!.startsWith(`${symbol}|`)).toBe(true)
    }
  })

  it('marks carbon and hydrogen apart from the metals', () => {
    const { bodies } = run('Fe', 'acid')
    expect(bodies.filter((b) => b.kind === 'reference')).toHaveLength(2)
  })

  it('puts the threshold line between the last metal that reacts and the first that does not', () => {
    for (const r of REAGENTS) {
      const { bodies } = run('Fe', r.key)
      const line = bodies.find((b) => b.kind === 'threshold')!
      const lastReacting = bodies.find((b) => b.label?.startsWith(`${SERIES[r.threshold]!.symbol}|`))!
      const firstNot = bodies.find((b) => b.label?.startsWith(`${SERIES[r.threshold + 1]!.symbol}|`))
      expect(line.y, r.key).toBeLessThan(lastReacting.y)
      if (firstNot) expect(line.y, r.key).toBeGreaterThan(firstNot.y)
    }
  })

  it('puts a reacting metal above the line and an unreactive one below it', () => {
    const line = (symbol: string, key: string) => {
      const { bodies } = run(symbol, key)
      const l = bodies.find((b) => b.kind === 'threshold')!
      const m = bodies.find((b) => b.kind === 'selected')!
      return m.y > l.y
    }
    expect(line('Mg', 'acid')).toBe(true)
    expect(line('Cu', 'acid')).toBe(false)
    expect(line('Cu', 'silver-nitrate')).toBe(true)
  })

  it('writes the equation when there is a reaction and says so when there is not', () => {
    expect(run('Mg', 'acid').markers![1]!.label.en).toMatch(/salt \+ hydrogen/)
    expect(run('Cu', 'acid').markers![1]!.label.en).toMatch(/no reaction/)
  })

  it('adds the oxide layer explanation only for aluminium', () => {
    // 0620.9.4.5 — the exception the syllabus names.
    expect(run('Al', 'acid').markers![2]!.label.en).toMatch(/oxide layer/)
    expect(run('Zn', 'acid').markers![2]!.label.en).not.toMatch(/oxide layer/)
    expect(SERIES[ALUMINIUM_INDEX]!.symbol).toBe('Al')
  })

  it('reports the position as it is quoted, counting from one', () => {
    expect(run('K', 'acid').readouts['position']).toBe(1)
    expect(run('Au', 'acid').readouts['position']).toBe(SERIES.length)
  })

  it('reports how many metals the reagent attacks', () => {
    expect(run('K', 'water').readouts['metalsThatReact']).toBe(4) // K, Na, Ca, Mg
    expect(run('K', 'acid').readouts['metalsThatReact']).toBe(7) // down to iron
    expect(run('K', 'silver-nitrate').readouts['metalsThatReact']).toBe(8) // and copper too
  })

  it('clamps parameters outside their range', () => {
    expect(reactivityKernel({ metal: -4, reagent: 0 }).readouts['position']).toBe(1)
    expect(reactivityKernel({ metal: 99, reagent: 0 }).readouts['position']).toBe(SERIES.length)
    expect(reactivityKernel({ metal: 0, reagent: 99 }).readouts['metalsThatReact']).toBe(8)
  })

  it('is finite everywhere across the parameter range', () => {
    for (let metal = 0; metal < METALS.length; metal++) {
      for (let reagent = 0; reagent < REAGENTS.length; reagent++) {
        const r = reactivityKernel({ metal, reagent })
        for (const [k, v] of Object.entries(r.readouts)) {
          expect(Number.isFinite(v), `${k} metal=${metal} reagent=${reagent}`).toBe(true)
        }
        expect(r.markers!.every((m) => m.label.en.length > 0 && m.label.zh)).toBe(true)
      }
    }
  })
})
