import { describe, expect, it } from 'vitest'
import { METALS, SERIES } from '../9-4-reactivity-series/kernel'
import {
  ION_CHARGE,
  extractionAnswer,
  extractionKernel,
  extractionMethod,
  protectionAnswer,
  protectsIron,
} from './kernel'

const at = (symbol: string): number => SERIES.findIndex((e) => e.symbol === symbol)
const EXTRACTION = 0
const PROTECTION = 1

function run(symbol: string, question: number) {
  const r = extractionKernel({ metal: METALS.indexOf(at(symbol)), question })
  return { ...r, bodies: r.bodies ?? [] }
}

describe('extractionMethod', () => {
  it('needs electrolysis for every metal above carbon', () => {
    // 0620.9.6.1 and 9.6.3 — this is why aluminium is extracted from bauxite this way.
    for (const symbol of ['K', 'Na', 'Ca', 'Mg', 'Al']) {
      expect(extractionMethod(at(symbol)), symbol).toBe('electrolysis')
    }
  })

  it('reduces the metals below carbon by heating with carbon', () => {
    // 0620.9.6.2 — including iron, which is what a blast furnace does.
    for (const symbol of ['Zn', 'Fe', 'Cu']) {
      expect(extractionMethod(at(symbol)), symbol).toBe('carbon')
    }
  })

  it('finds silver and gold as the metal itself', () => {
    expect(extractionMethod(at('Ag'))).toBe('native')
    expect(extractionMethod(at('Au'))).toBe('native')
  })

  it('splits exactly at carbon, with nothing straddling it', () => {
    const carbon = at('C')
    for (const i of METALS) {
      const needsElectrolysis = extractionMethod(i) === 'electrolysis'
      expect(needsElectrolysis, SERIES[i]!.symbol).toBe(i < carbon)
    }
  })

  it('gets harder to extract as the metal gets more reactive', () => {
    // No metal below another may need a harder method than it.
    const difficulty: Record<string, number> = { native: 0, carbon: 1, electrolysis: 2 }
    const ordered = METALS.map((i) => difficulty[extractionMethod(i)]!)
    for (let i = 1; i < ordered.length; i++) {
      expect(ordered[i]!, SERIES[METALS[i]!]!.symbol).toBeLessThanOrEqual(ordered[i - 1]!)
    }
  })
})

describe('protectsIron', () => {
  it('is true only for metals above iron', () => {
    // 0620.9.5.5 — sacrificial protection needs the *more* reactive metal.
    for (const symbol of ['K', 'Na', 'Ca', 'Mg', 'Al', 'Zn']) {
      expect(protectsIron(at(symbol)), symbol).toBe(true)
    }
    for (const symbol of ['Fe', 'Cu', 'Ag', 'Au']) {
      expect(protectsIron(at(symbol)), symbol).toBe(false)
    }
  })

  it('names zinc, which is what galvanising uses', () => {
    // 0620.9.5.4 — galvanising is a barrier *and* sacrificial protection.
    expect(protectsIron(at('Zn'))).toBe(true)
    expect(protectionAnswer(at('Zn')).headline.en).toMatch(/protects iron/)
  })

  it('says iron cannot protect itself rather than giving a misleading yes or no', () => {
    expect(protectionAnswer(at('Fe')).headline.en).toMatch(/cannot protect itself/)
  })

  it('warns that a less reactive coating is a barrier only', () => {
    // Tin-plated steel rusts faster once scratched, which is the counter-intuitive part.
    expect(protectionAnswer(at('Cu')).note.en).toMatch(/barrier/)
  })
})

describe('ION_CHARGE', () => {
  it('covers every metal a student can pick', () => {
    for (const i of METALS) {
      expect(ION_CHARGE[SERIES[i]!.symbol], SERIES[i]!.symbol).toBeGreaterThan(0)
    }
  })

  it('gives aluminium three, the reason its extraction is so energy-hungry', () => {
    expect(ION_CHARGE['Al']).toBe(3)
    expect(extractionAnswer(at('Al')).note.en).toMatch(/3 electrons/)
  })

  it('gets the singular right for a one-plus ion', () => {
    expect(extractionAnswer(at('Na')).note.en).toMatch(/1 electron to/)
  })
})

describe('answers', () => {
  it('gives every metal an answer to both questions, in both languages', () => {
    for (const i of METALS) {
      for (const answer of [extractionAnswer(i), protectionAnswer(i)]) {
        expect(answer.headline.en.length, SERIES[i]!.symbol).toBeGreaterThan(0)
        expect(answer.headline.zh, SERIES[i]!.symbol).toBeTruthy()
        expect(answer.note.zh, SERIES[i]!.symbol).toBeTruthy()
      }
    }
  })
})

describe('extractionKernel', () => {
  it('draws the same series as the reactivity lesson', () => {
    // One reactivity series, not two — two copies would be two chances to disagree.
    const { bodies } = run('Fe', EXTRACTION)
    const rungs = bodies.filter((b) => b.kind !== 'threshold')
    expect(rungs.map((b) => b.label!.split('|')[0])).toEqual(SERIES.map((e) => e.symbol))
  })

  it('puts the line at carbon for extraction and at iron for protection', () => {
    const lineY = (symbol: string, q: number) =>
      run(symbol, q).bodies.find((b) => b.kind === 'threshold')!.y
    expect(lineY('Fe', EXTRACTION)).toBe(-(at('C') - 0.5))
    expect(lineY('Fe', PROTECTION)).toBe(-(at('Fe') - 0.5))
  })

  it('labels what the line means, since it means something different each time', () => {
    expect(
      run('Fe', EXTRACTION).bodies.find((b) => b.kind === 'threshold')!.label
    ).toMatch(/electrolysis/)
    expect(
      run('Fe', PROTECTION).bodies.find((b) => b.kind === 'threshold')!.label
    ).toMatch(/protects iron/)
  })

  it('puts a metal needing electrolysis above the carbon line', () => {
    const above = (symbol: string) => {
      const { bodies } = run(symbol, EXTRACTION)
      return bodies.find((b) => b.kind === 'selected')!.y > bodies.find((b) => b.kind === 'threshold')!.y
    }
    expect(above('Al')).toBe(true)
    expect(above('Fe')).toBe(false)
  })

  it('asks the right question in the caption', () => {
    expect(run('Zn', EXTRACTION).markers![0]!.label.en).toMatch(/How is zinc extracted/)
    expect(run('Zn', PROTECTION).markers![0]!.label.en).toMatch(/Will zinc protect iron/)
  })

  it('counts how many metals fall above the line', () => {
    // Above carbon: K, Na, Ca, Mg, Al. Above iron: those five plus zinc.
    expect(run('Fe', EXTRACTION).readouts['metalsAboveLine']).toBe(5)
    expect(run('Fe', PROTECTION).readouts['metalsAboveLine']).toBe(6)
  })

  it('reports the landmark position, which moves with the question', () => {
    expect(run('Fe', EXTRACTION).readouts['landmarkPosition']).toBe(at('C') + 1)
    expect(run('Fe', PROTECTION).readouts['landmarkPosition']).toBe(at('Fe') + 1)
  })

  it('clamps parameters outside their range', () => {
    expect(extractionKernel({ metal: -3, question: 0 }).readouts['position']).toBe(1)
    expect(extractionKernel({ metal: 99, question: 0 }).readouts['position']).toBe(SERIES.length)
  })

  it('is finite everywhere across the parameter range', () => {
    for (let metal = 0; metal < METALS.length; metal++) {
      for (const question of [EXTRACTION, PROTECTION]) {
        const r = extractionKernel({ metal, question })
        for (const [k, v] of Object.entries(r.readouts)) {
          expect(Number.isFinite(v), `${k} metal=${metal} question=${question}`).toBe(true)
        }
        expect(r.markers!.every((m) => m.label.en.length > 0 && m.label.zh)).toBe(true)
      }
    }
  })
})
