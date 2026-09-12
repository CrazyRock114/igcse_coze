import { describe, expect, it } from 'vitest'
import kernel, {
  ALL_ITEMS,
  EXERCISES,
  MAX_TARGETS,
  exerciseAt,
  type ElectrolysisParams,
} from './kernel'
import { placementKey } from '@/lib/assignment'

const run = (stage: number, answers: Record<string, number> = {}) =>
  kernel({ stage, ...answers } as ElectrolysisParams)

/** Places every item of an exercise on its correct target. */
const allCorrect = (stage: number) => {
  const exercise = exerciseAt(stage)
  const answers: Record<string, number> = {}
  for (const item of exercise.items) {
    answers[placementKey(item.id)] = exercise.targets.findIndex((t) => t.id === item.target) + 1
  }
  return answers
}

describe('the exercises', () => {
  it('has a target for every item', () => {
    // An item pointing at a bin that does not exist could never be got right.
    for (const exercise of EXERCISES) {
      const ids = exercise.targets.map((t) => t.id)
      for (const item of exercise.items) {
        expect(ids, `${exercise.id} / ${item.id}`).toContain(item.target)
      }
    }
  })

  it('uses every bin in every exercise', () => {
    // A bin nothing belongs in is a bin the student learns to ignore.
    for (const exercise of EXERCISES) {
      for (const target of exercise.targets) {
        expect(
          exercise.items.some((i) => i.target === target.id),
          `${exercise.id} / ${target.id}`,
        ).toBe(true)
      }
    }
  })

  it('gives every item and bin a Chinese gloss', () => {
    for (const exercise of EXERCISES) {
      for (const item of exercise.items) expect(item.label.zh, item.id).toBeTruthy()
      for (const target of exercise.targets) expect(target.label.zh, target.id).toBeTruthy()
    }
  })

  it('has unique item ids across all three exercises', () => {
    // They share one parameter namespace, so a duplicate would make two items move together.
    const ids = ALL_ITEMS.map((i) => i.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('does not list the items grouped by their answer', () => {
    // Listed cathode-cathode-cathode then anode-anode-anode, the exercise can be finished
    // by pattern alone without reading a single label.
    for (const exercise of EXERCISES) {
      const targets = exercise.items.map((i) => i.target)
      const runs = targets.filter((t, i) => i === 0 || t !== targets[i - 1]).length
      expect(runs, `${exercise.id} has only ${runs} runs`).toBeGreaterThan(2)
    }
  })
})

describe('molten compounds', () => {
  const items = Object.fromEntries(EXERCISES[0]!.items.map((i) => [i.id, i.target]))

  it('puts the metal at the cathode and the non-metal at the anode', () => {
    expect(items['molten-pb']).toBe('cathode')
    expect(items['molten-br']).toBe('anode')
    expect(items['molten-al']).toBe('cathode')
    expect(items['molten-o']).toBe('anode')
    expect(items['molten-na']).toBe('cathode')
    expect(items['molten-cl']).toBe('anode')
  })
})

describe('aqueous solutions', () => {
  const items = Object.fromEntries(EXERCISES[1]!.items.map((i) => [i.id, i.target]))

  it('gives hydrogen at the cathode when the metal is more reactive than hydrogen', () => {
    // Sodium is above hydrogen, so a sodium chloride solution gives hydrogen, not sodium.
    // Getting this backwards is the single most common error in the topic.
    expect(items['aq-brine-h']).toBe('cathode')
    expect(items['aq-dilute-h']).toBe('cathode')
  })

  it('gives the metal at the cathode when it is less reactive than hydrogen', () => {
    expect(items['aq-cuso4-cu']).toBe('cathode')
  })

  it('gives the halogen at the anode only from a concentrated halide', () => {
    // Concentrated chloride gives chlorine; dilute chloride gives oxygen from the water.
    expect(items['aq-brine-cl']).toBe('anode')
    expect(items['aq-dilute-o']).toBe('anode')
  })

  it('gives oxygen at the anode from a sulfate or a dilute solution', () => {
    expect(items['aq-cuso4-o']).toBe('anode')
    expect(items['aq-acid-o']).toBe('anode')
  })

  it('covers both electrodes for the same electrolyte more than once', () => {
    // Otherwise a student can guess from the product name alone without ever thinking
    // about which solution it came from.
    const labels = EXERCISES[1]!.items.map((i) => i.label.en)
    const brine = labels.filter((l) => l.includes('concentrated sodium chloride'))
    expect(brine).toHaveLength(2)
  })
})

describe('half-equations', () => {
  const items = Object.fromEntries(EXERCISES[2]!.items.map((i) => [i.id, i.target]))

  it('calls electrons gained reduction and electrons lost oxidation', () => {
    for (const item of EXERCISES[2]!.items) {
      const [left = '', right = ''] = item.label.en.split('→')
      const electronsOnLeft = left.includes('e⁻')
      const electronsOnRight = right.includes('e⁻')
      expect(electronsOnLeft !== electronsOnRight, item.id).toBe(true)
      expect(item.target, item.id).toBe(electronsOnLeft ? 'cathode' : 'anode')
    }
  })

  it('includes the hydroxide half-equation, which is the one people forget', () => {
    expect(items['half-oh']).toBe('anode')
  })
})

describe('the kernel', () => {
  it('reports a full score once every item is placed correctly', () => {
    for (let stage = 1; stage <= EXERCISES.length; stage++) {
      const r = run(stage, allCorrect(stage))
      expect(r.readouts['correct'], `stage ${stage}`).toBe(r.readouts['total'])
      expect(r.readouts['placed'], `stage ${stage}`).toBe(r.readouts['total'])
    }
  })

  it('starts with nothing placed', () => {
    const r = run(1)
    expect(r.readouts['placed']).toBe(0)
    expect(r.readouts['correct']).toBe(0)
  })

  it('counts a wrong placement as placed but not correct', () => {
    const exercise = exerciseAt(1)
    const item = exercise.items[0]!
    const wrong = exercise.targets.findIndex((t) => t.id !== item.target) + 1
    const r = run(1, { [placementKey(item.id)]: wrong })
    expect(r.readouts['placed']).toBe(1)
    expect(r.readouts['correct']).toBe(0)
  })

  it('clamps a stage that does not exist', () => {
    expect(exerciseAt(0).id).toBe(EXERCISES[0]!.id)
    expect(exerciseAt(99).id).toBe(EXERCISES[EXERCISES.length - 1]!.id)
  })

  it('offers as many bins as the widest exercise needs', () => {
    expect(MAX_TARGETS).toBe(Math.max(...EXERCISES.map((e) => e.targets.length)))
  })
})
