import { describe, expect, it } from 'vitest'
import {
  REACTIONS,
  energeticsKernel,
  energyIn,
  energyOut,
  enthalpyChange,
  isExothermic,
  minimumActivation,
  pathway,
} from './kernel'

const at = (key: string) => REACTIONS.find((r) => r.key === key)!
const index = (key: string) => REACTIONS.findIndex((r) => r.key === key)

function run(key: string, activationEnergy = 200) {
  return energeticsKernel({ reaction: index(key), activationEnergy })
}

describe('REACTIONS', () => {
  it('includes at least one endothermic reaction', () => {
    // A lesson on exothermic and endothermic needs both, or half of it is unillustrated.
    expect(REACTIONS.some((r) => !isExothermic(r))).toBe(true)
    expect(REACTIONS.some(isExothermic)).toBe(true)
  })

  it('describes every reaction in both languages', () => {
    for (const r of REACTIONS) {
      expect(r.label.zh, r.key).toBeTruthy()
      expect(r.context.zh, r.key).toBeTruthy()
      expect(r.equation.length, r.key).toBeGreaterThan(0)
    }
  })

  it('gives every bond a positive energy and a positive count', () => {
    for (const r of REACTIONS) {
      for (const b of [...r.broken, ...r.made]) {
        expect(b.energy, `${r.key} ${b.bond}`).toBeGreaterThan(0)
        expect(b.count, `${r.key} ${b.bond}`).toBeGreaterThan(0)
      }
    }
  })

  it('uses one energy per bond type across every reaction', () => {
    // A mean bond energy is a property of the bond, not of the reaction it appears in.
    const seen = new Map<string, number>()
    for (const r of REACTIONS) {
      for (const b of [...r.broken, ...r.made]) {
        const existing = seen.get(b.bond)
        if (existing !== undefined) expect(b.energy, b.bond).toBe(existing)
        seen.set(b.bond, b.energy)
      }
    }
  })
})

describe('the bond-energy calculation', () => {
  it('gets hydrogen plus chlorine right', () => {
    // 436 + 242 = 678 in; 2 × 431 = 862 out; ΔH = −184 kJ/mol.
    expect(energyIn(at('hcl'))).toBe(678)
    expect(energyOut(at('hcl'))).toBe(862)
    expect(enthalpyChange(at('hcl'))).toBe(-184)
  })

  it('gets burning methane right', () => {
    expect(energyIn(at('methane'))).toBe(2644)
    expect(energyOut(at('methane'))).toBe(3466)
    expect(enthalpyChange(at('methane'))).toBe(-822)
  })

  it('makes nitrogen and oxygen endothermic', () => {
    // 0620.5.1.2 — it takes energy in, which is why it only happens in a hot engine.
    expect(enthalpyChange(at('no'))).toBe(179)
    expect(isExothermic(at('no'))).toBe(false)
  })

  it('makes the Haber process only just exothermic', () => {
    // The N≡N triple bond is expensive, so most of the energy released pays for breaking it.
    expect(enthalpyChange(at('ammonia'))).toBe(-93)
    expect(Math.abs(enthalpyChange(at('ammonia')))).toBeLessThan(
      Math.abs(enthalpyChange(at('methane')))
    )
  })

  it('counts only the bonds that change in hydrogenation', () => {
    // Ethene's four C–H bonds survive into ethane, so they are in neither list.
    const r = at('hydrogenation')
    expect(r.broken.some((b) => b.bond === 'C=C')).toBe(true)
    expect(r.broken.some((b) => b.bond === 'C–H')).toBe(false)
    expect(enthalpyChange(r)).toBe(-125)
  })

  it('always has bond breaking cost energy and bond making release it', () => {
    // 0620.5.1.7 — both totals are positive; it is the difference that carries the sign.
    for (const r of REACTIONS) {
      expect(energyIn(r), r.key).toBeGreaterThan(0)
      expect(energyOut(r), r.key).toBeGreaterThan(0)
    }
  })

  it('gives ΔH the sign the convention demands', () => {
    // 0620.5.1.4 — negative for exothermic, and that is from the chemicals' point of view.
    for (const r of REACTIONS) {
      expect(isExothermic(r), r.key).toBe(enthalpyChange(r) < 0)
      expect(enthalpyChange(r), r.key).toBe(energyIn(r) - energyOut(r))
    }
  })
})

describe('pathway', () => {
  it('starts at the reactant level, which is the zero of the diagram', () => {
    const points = pathway(at('methane'), 200)
    expect(points[0]![1]).toBe(0)
  })

  it('ends at the product level, which is ΔH', () => {
    for (const r of REACTIONS) {
      const points = pathway(r, 200)
      expect(points[points.length - 1]![1], r.key).toBeCloseTo(enthalpyChange(r), 0)
    }
  })

  it('rises to exactly the activation energy above the reactants', () => {
    // 0620.5.1.5 — Ea is measured from where the reactants start, not from the products.
    for (const activation of [50, 200, 450]) {
      const peak = Math.max(...pathway(at('methane'), activation).map(([, y]) => y))
      expect(peak, `Ea=${activation}`).toBeCloseTo(activation, 0)
    }
  })

  it('always has a hump, even when the reaction is exothermic', () => {
    // Every reaction needs energy to get started, whichever way ΔH points.
    for (const r of REACTIONS) {
      const points = pathway(r, 150)
      const peak = Math.max(...points.map(([, y]) => y))
      expect(peak, r.key).toBeGreaterThan(points[0]![1])
      expect(peak, r.key).toBeGreaterThan(points[points.length - 1]![1])
    }
  })

  it('leaves ΔH untouched when the activation energy changes', () => {
    // This is what a catalyst does: lowers the hump, moves neither level.
    const low = pathway(at('methane'), 60)
    const high = pathway(at('methane'), 400)
    expect(low[0]![1]).toBe(high[0]![1])
    expect(low[low.length - 1]![1]).toBe(high[high.length - 1]![1])
  })

  it('goes downhill overall for an exothermic reaction and uphill for an endothermic one', () => {
    for (const r of REACTIONS) {
      const points = pathway(r, 200)
      const net = points[points.length - 1]![1] - points[0]![1]
      expect(net < 0, r.key).toBe(isExothermic(r))
    }
  })

  it('runs from 0 to 1 across the progress axis, with no repeated points', () => {
    const points = pathway(at('hcl'), 200)
    expect(points[0]![0]).toBe(0)
    expect(points[points.length - 1]![0]).toBe(1)
    for (let i = 1; i < points.length; i++) {
      expect(points[i]![0]).toBeGreaterThan(points[i - 1]![0])
    }
  })
})

describe('energeticsKernel', () => {
  it('reports the three numbers the calculation needs', () => {
    const r = run('hcl')
    expect(r.readouts['energyIn']).toBe(678)
    expect(r.readouts['energyOut']).toBe(862)
    expect(r.readouts['enthalpyChange']).toBe(-184)
  })

  it('names the reaction as exothermic or endothermic on the curve', () => {
    expect(run('methane').series[0]!.label.en).toMatch(/exothermic/)
    expect(run('no').series[0]!.label.en).toMatch(/endothermic/)
    expect(run('no').series[0]!.label.en).not.toMatch(/^.*[^d]exothermic/)
  })

  it('pins the progress axis, which has no units to scale', () => {
    expect(run('hcl').series[0]!.xBounds).toEqual({ min: 0, max: 1 })
  })

  it('clamps parameters outside their range', () => {
    expect(energeticsKernel({ reaction: -2, activationEnergy: 200 }).readouts['enthalpyChange'])
      .toBe(-184)
    expect(energeticsKernel({ reaction: 99, activationEnergy: 200 }).readouts['enthalpyChange'])
      .toBe(-125)
    expect(energeticsKernel({ reaction: 0, activationEnergy: -50 }).readouts['activationEnergy'])
      .toBe(20)
    expect(energeticsKernel({ reaction: 0, activationEnergy: 9999 }).readouts['activationEnergy'])
      .toBe(600)
  })

  it('will not let an endothermic reaction have a barrier smaller than its ΔH', () => {
    // Otherwise the products would sit above the transition state, which is not a diagram
    // of any reaction. The reported value is the one actually drawn.
    const r = energeticsKernel({ reaction: index('no'), activationEnergy: 50 })
    expect(r.readouts['activationEnergy']!).toBeGreaterThan(r.readouts['enthalpyChange']!)
    expect(r.readouts['activationEnergy']).toBe(minimumActivation(at('no')))
  })

  it('reports the activation energy that is actually on the curve', () => {
    for (let reaction = 0; reaction < REACTIONS.length; reaction++) {
      for (const activationEnergy of [20, 150, 300]) {
        const r = energeticsKernel({ reaction, activationEnergy })
        const peak = Math.max(...r.series[0]!.points.map(([, y]) => y))
        expect(peak, `${REACTIONS[reaction]!.key} Ea=${activationEnergy}`).toBeCloseTo(
          r.readouts['activationEnergy']!,
          0
        )
      }
    }
  })

  it('is finite everywhere across the parameter range', () => {
    for (let reaction = 0; reaction < REACTIONS.length; reaction++) {
      for (const activationEnergy of [20, 200, 600]) {
        const r = energeticsKernel({ reaction, activationEnergy })
        for (const [k, v] of Object.entries(r.readouts)) {
          expect(Number.isFinite(v), `${k} reaction=${reaction} Ea=${activationEnergy}`).toBe(true)
        }
        for (const [, y] of r.series[0]!.points) {
          expect(Number.isFinite(y)).toBe(true)
        }
      }
    }
  })
})
