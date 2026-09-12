import { describe, expect, it } from 'vitest'
import kernel, {
  ALL_ITEMS,
  EXERCISES,
  MAX_TARGETS,
  exerciseAt,
  type CellsParams,
} from './kernel'
import { placementKey } from '@/lib/assignment'

function allCorrect(stage: number): CellsParams {
  const exercise = exerciseAt(stage)
  const answers: CellsParams = { stage }
  for (const item of exercise.items) {
    answers[placementKey(item.id)] = exercise.targets.findIndex((t) => t.id === item.target) + 1
  }
  return answers
}

describe('exercise data', () => {
  it('gives every item a target that exists in its own exercise', () => {
    for (const exercise of EXERCISES) {
      const ids = new Set(exercise.targets.map((t) => t.id))
      for (const item of exercise.items) {
        expect(ids, `${exercise.id}/${item.id}`).toContain(item.target)
      }
    }
  })

  it('uses every group at least once, so no bin is a decoy', () => {
    for (const exercise of EXERCISES) {
      for (const target of exercise.targets) {
        expect(
          exercise.items.some((i) => i.target === target.id),
          `${exercise.id}/${target.id} has no items`
        ).toBe(true)
      }
    }
  })

  it('does not list the items in the order of the groups', () => {
    for (const exercise of EXERCISES) {
      const inStep = exercise.items.filter((item, i) => exercise.targets[i]?.id === item.target)
      expect(inStep.length, `${exercise.id} answers itself`).toBe(0)
    }
  })

  it('keeps item ids unique across all three exercises', () => {
    const ids = ALL_ITEMS.map((i) => i.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('writes every label and hint in both languages', () => {
    for (const exercise of EXERCISES) {
      for (const item of exercise.items) expect(item.label.zh, item.id).toBeTruthy()
      for (const target of exercise.targets) {
        expect(target.label.zh, target.id).toBeTruthy()
        expect(target.hint?.zh, target.id).toBeTruthy()
      }
    }
  })
})

describe('the biology the sorting asserts', () => {
  const targetOf = (id: string) => ALL_ITEMS.find((i) => i.id === id)?.target

  it('puts the three structures a plant has and an animal does not in one bin', () => {
    for (const id of ['s-chloroplast', 's-vacuole', 's-wall']) {
      expect(targetOf(id), id).toBe('plantOnly')
    }
  })

  it('gives a bacterium no nucleus and no mitochondria', () => {
    // A bacterium differs mostly by what it lacks, which is the point of the exercise.
    expect(targetOf('s-nucleus')).toBe('plantAnimal')
    expect(targetOf('s-mito')).toBe('plantAnimal')
  })

  it('gives a bacterium ribosomes, a membrane and cytoplasm like everything else', () => {
    for (const id of ['s-ribosome', 's-membrane', 's-cytoplasm']) {
      expect(targetOf(id), id).toBe('all')
    }
  })

  it('classifies enzymes and antibodies as proteins, not as their function', () => {
    // Both are named for what they do, and students routinely file them separately.
    expect(targetOf('m-amylase')).toBe('protein')
    expect(targetOf('m-antibody')).toBe('protein')
    expect(targetOf('m-haemoglobin')).toBe('protein')
  })

  it('groups starch, glycogen and cellulose together as carbohydrates', () => {
    for (const id of ['m-starch', 'm-glycogen', 'm-cellulose']) {
      expect(targetOf(id), id).toBe('carbohydrate')
    }
  })

  it('pairs each food with the right test', () => {
    expect(targetOf('t-starch')).toBe('iodine')
    expect(targetOf('t-glucose')).toBe('benedict')
    expect(targetOf('t-protein')).toBe('biuret')
    expect(targetOf('t-fat')).toBe('ethanol')
    expect(targetOf('t-vitc')).toBe('dcpip')
  })
})

describe('the kernel', () => {
  it('starts with nothing placed', () => {
    expect(kernel({ stage: 1 }).readouts['placed']).toBe(0)
  })

  it('scores a complete correct answer for every exercise', () => {
    for (let stage = 1; stage <= EXERCISES.length; stage++) {
      const total = exerciseAt(stage).items.length
      expect(kernel(allCorrect(stage)).readouts['correct'], `stage ${stage}`).toBe(total)
    }
  })

  it('counts a wrong placement as placed but not correct', () => {
    const answers = allCorrect(1)
    const key = placementKey('s-chloroplast')
    answers[key] = answers[key] === 1 ? 2 : 1
    expect(kernel(answers).readouts['placed']).toBe(10)
    expect(kernel(answers).readouts['correct']).toBe(9)
  })

  it('clamps a stage outside the range rather than throwing', () => {
    expect(kernel({ stage: 0 }).assignment?.items.length).toBe(EXERCISES[0]?.items.length)
    expect(kernel({ stage: 99 }).assignment?.items.length).toBe(
      EXERCISES[EXERCISES.length - 1]?.items.length
    )
  })

  it('treats a target index past the end of a short exercise as unplaced', () => {
    const answers: CellsParams = { stage: 2 }
    for (const item of exerciseAt(2).items) answers[placementKey(item.id)] = MAX_TARGETS
    expect(MAX_TARGETS).toBeGreaterThan(exerciseAt(2).targets.length)
    expect(kernel(answers).readouts['placed']).toBe(0)
  })
})
