import { describe, expect, it } from 'vitest'
import kernel, {
  ECOSYSTEMS,
  KINDS,
  ecosystemAt,
  energyByLevel,
  inversions,
  kindAt,
  type EcosystemParams,
} from './kernel'

const NUMBERS = 1
const BIOMASS = 2
const ENERGY = 3
const GRASSLAND = 1
const WOODLAND = 2

const run = (ecosystem: number, kind: number, transfer = 10) =>
  kernel({ ecosystem, kind, transfer } satisfies EcosystemParams)

const valuesOf = (r: ReturnType<typeof kernel>) => r.pyramid?.levels.map((l) => l.value) ?? []

describe('the data', () => {
  it('names every level in both languages', () => {
    for (const e of ECOSYSTEMS) {
      for (const l of e.levels) expect(l.label.zh, `${e.id}/${l.label.en}`).toBeTruthy()
    }
  })

  it('gives every level a positive number and biomass', () => {
    // A zero would sit at the minimum bar width and read as "very small" rather than
    // "none", which is a different claim.
    for (const e of ECOSYSTEMS) {
      for (const l of e.levels) {
        expect(l.numbers, `${e.id}/${l.label.en}`).toBeGreaterThan(0)
        expect(l.biomass, `${e.id}/${l.label.en}`).toBeGreaterThan(0)
      }
    }
  })
})

describe('the shape of each pyramid', () => {
  it('draws grassland the right way up however it is measured', () => {
    for (const kind of [NUMBERS, BIOMASS, ENERGY]) {
      expect(inversions(valuesOf(run(GRASSLAND, kind))), `kind ${kind}`).toBe(0)
    }
  })

  it('stands the woodland pyramid of numbers on its point', () => {
    // One oak supporting half a million insects. This is the entire argument for
    // preferring a pyramid of biomass, and it has to actually come out inverted.
    expect(inversions(valuesOf(run(WOODLAND, NUMBERS)))).toBeGreaterThan(0)
  })

  it('turns the same woodland the right way up when weighed instead of counted', () => {
    expect(inversions(valuesOf(run(WOODLAND, BIOMASS)))).toBe(0)
    expect(inversions(valuesOf(run(WOODLAND, ENERGY)))).toBe(0)
  })

  it('says which of the two it is', () => {
    expect(run(WOODLAND, NUMBERS).markers?.[0]?.label.en).toContain('not a pyramid')
    expect(run(WOODLAND, BIOMASS).markers?.[0]?.label.en).toContain('proper pyramid')
  })

  it('cannot invert an energy pyramid at any transfer efficiency', () => {
    // Energy is calculated rather than counted, and each level is a fixed fraction of
    // the one below, so an inverted energy pyramid would mean the model was broken.
    for (const ecosystem of [GRASSLAND, WOODLAND]) {
      for (const transfer of [1, 5, 10, 20, 30]) {
        expect(inversions(valuesOf(run(ecosystem, ENERGY, transfer))), `${ecosystem}/${transfer}`).toBe(0)
      }
    }
  })
})

describe('energy down the chain', () => {
  it('starts at the energy the producers captured', () => {
    const e = ecosystemAt(GRASSLAND)
    expect(energyByLevel(e, 10)[0]).toBe(e.producerEnergy)
  })

  it('passes on exactly the stated fraction at each step', () => {
    const levels = energyByLevel(ecosystemAt(GRASSLAND), 10)
    for (let i = 1; i < levels.length; i++) {
      expect((levels[i] as number) / (levels[i - 1] as number)).toBeCloseTo(0.1, 6)
    }
  })

  it('leaves less at the top the longer the chain', () => {
    // Four levels lose a step more than three, from a bigger start.
    const short = run(GRASSLAND, ENERGY).readouts['efficiency'] ?? 0
    const long = run(WOODLAND, ENERGY).readouts['efficiency'] ?? 0
    expect(long).toBeLessThan(short)
  })

  it('leaves almost nothing for a fifth level, which is why chains are short', () => {
    const r = run(GRASSLAND, ENERGY, 10)
    const producer = ecosystemAt(GRASSLAND).producerEnergy
    expect(r.readouts['fifth']).toBeCloseTo(producer * 1e-4, 4)
    // Two thousandths of one per cent of what the grass caught.
    expect((r.readouts['fifth'] as number) / producer).toBeLessThan(0.001)
  })

  it('leaves more at the top when the transfer is more efficient', () => {
    expect(run(GRASSLAND, ENERGY, 20).readouts['top']).toBeGreaterThan(
      run(GRASSLAND, ENERGY, 5).readouts['top'] as number
    )
  })
})

describe('crops against livestock', () => {
  it('feeds ten times as many people from the crop at a tenth transfer', () => {
    expect(run(GRASSLAND, ENERGY, 10).readouts['cropAdvantage']).toBe(10)
  })

  it('narrows the gap as the animal gets more efficient', () => {
    expect(run(GRASSLAND, ENERGY, 25).readouts['cropAdvantage']).toBe(4)
  })
})

describe('the kernel', () => {
  it('returns finite readouts at every corner of the parameter space', () => {
    for (const ecosystem of [0, 1, 2, 9]) {
      for (const kind of [0, 1, 2, 3, 9]) {
        for (const transfer of [1, 10, 30]) {
          for (const [key, value] of Object.entries(run(ecosystem, kind, transfer).readouts)) {
            expect(Number.isFinite(value), `${key} at ${ecosystem}/${kind}/${transfer}`).toBe(true)
          }
        }
      }
    }
  })

  it('clamps an index outside the range rather than throwing', () => {
    expect(valuesOf(run(0, NUMBERS))).toEqual(valuesOf(run(1, NUMBERS)))
    expect(valuesOf(run(99, NUMBERS))).toEqual(valuesOf(run(ECOSYSTEMS.length, NUMBERS)))
    expect(kindAt(0)).toBe('numbers')
    expect(kindAt(99)).toBe(KINDS[KINDS.length - 1])
  })

  it('labels the units differently for each kind, since they measure different things', () => {
    const units = [NUMBERS, BIOMASS, ENERGY].map((k) => run(GRASSLAND, k).pyramid?.unit)
    expect(new Set(units).size).toBe(3)
  })

  it('gives one bar per trophic level', () => {
    for (const ecosystem of [GRASSLAND, WOODLAND]) {
      for (const kind of [NUMBERS, BIOMASS, ENERGY]) {
        expect(run(ecosystem, kind).pyramid?.levels).toHaveLength(
          ecosystemAt(ecosystem).levels.length
        )
      }
    }
  })
})
