import { describe, expect, it } from 'vitest'
import kernel, {
  ALL_ITEMS,
  EXERCISES,
  MAX_TARGETS,
  exerciseAt,
  type ClassificationParams,
} from './kernel'
import { placementKey } from '@/lib/assignment'

/** Answers that put every item of `stage` on its correct target. */
function allCorrect(stage: number): ClassificationParams {
  const exercise = exerciseAt(stage)
  const answers: ClassificationParams = { stage }
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
    // Housefly, oak, mushroom, E. coli, amoeba against Animal, Plant, Fungus, Prokaryote,
    // Protoctist answers itself: the student works down both lists in step and never has
    // to read a feature.
    for (const exercise of EXERCISES) {
      const inStep = exercise.items.filter(
        (item, i) => exercise.targets[i]?.id === item.target
      ).length
      expect(inStep, `${exercise.id} has ${inStep} items sitting in group order`).toBe(0)
    }
  })

  it('keeps item ids unique across all four exercises', () => {
    // They share one flat namespace of parameters, so a collision would silently make
    // two organisms answer for each other.
    const ids = ALL_ITEMS.map((i) => i.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('gives every group a feature list, since that is what the student classifies by', () => {
    for (const exercise of EXERCISES) {
      for (const target of exercise.targets) {
        expect(target.hint?.en, `${exercise.id}/${target.id}`).toBeTruthy()
        expect(target.hint?.zh, `${exercise.id}/${target.id}`).toBeTruthy()
      }
    }
  })
})

describe('classification kernel', () => {
  it('starts with nothing placed', () => {
    const result = kernel({ stage: 1 })
    expect(result.readouts['placed']).toBe(0)
    expect(result.readouts['correct']).toBe(0)
    expect(result.assignment?.items.every((i) => i.placed === undefined)).toBe(true)
  })

  it('scores a complete correct answer for every exercise', () => {
    for (let stage = 1; stage <= EXERCISES.length; stage++) {
      const result = kernel(allCorrect(stage))
      const total = exerciseAt(stage).items.length
      expect(result.readouts['total'], `stage ${stage}`).toBe(total)
      expect(result.readouts['placed'], `stage ${stage}`).toBe(total)
      expect(result.readouts['correct'], `stage ${stage}`).toBe(total)
    }
  })

  it('counts a wrong placement as placed but not correct', () => {
    const answers = allCorrect(1)
    // Move the housefly out of Animal and into whichever group is not its own.
    const wrong = answers[placementKey('k-housefly')] === 1 ? 2 : 1
    answers[placementKey('k-housefly')] = wrong

    const result = kernel(answers)
    expect(result.readouts['placed']).toBe(10)
    expect(result.readouts['correct']).toBe(9)

    // And the renderer can tell the student *which* one is wrong.
    const fly = result.assignment?.items.find((i) => i.id === 'k-housefly')
    expect(fly?.placed).toBeDefined()
    expect(fly?.placed).not.toBe(fly?.target)
  })

  it('shows only the items of the selected exercise', () => {
    expect(kernel({ stage: 2 }).assignment?.items.map((i) => i.id)).toEqual(
      EXERCISES[1]?.items.map((i) => i.id)
    )
  })

  it('clamps a stage outside the range rather than throwing', () => {
    expect(kernel({ stage: 0 }).assignment?.items.length).toBe(EXERCISES[0]?.items.length)
    expect(kernel({ stage: 99 }).assignment?.items.length).toBe(
      EXERCISES[EXERCISES.length - 1]?.items.length
    )
  })

  it('treats a target index past the end of a short exercise as unplaced', () => {
    // The plant exercise has three groups but the parameter allows up to MAX_TARGETS,
    // because one range has to serve all four. Index 4 must not resolve to anything.
    const answers: ClassificationParams = { stage: 4 }
    for (const item of exerciseAt(4).items) answers[placementKey(item.id)] = MAX_TARGETS

    const result = kernel(answers)
    expect(MAX_TARGETS).toBeGreaterThan(exerciseAt(4).targets.length)
    expect(result.readouts['placed']).toBe(0)
  })
})

describe('the awkward cases that make the exercise worth doing', () => {
  const targetOf = (id: string) => ALL_ITEMS.find((i) => i.id === id)?.target

  it('classifies a bat by its hair, not by the fact that it flies', () => {
    expect(targetOf('v-bat')).toBe('mammal')
    expect(targetOf('v-penguin')).toBe('bird')
    expect(targetOf('v-dolphin')).toBe('mammal')
  })

  it('keeps a photosynthesising bacterium out of the plant kingdom', () => {
    // A cyanobacterium makes its own food, but it has no nucleus, and that decides it.
    expect(targetOf('k-cyano')).toBe('prokaryote')
  })

  it('separates the two long-bodied arthropods from the two eight-legged ones', () => {
    expect(targetOf('a-centipede')).toBe('myriapod')
    expect(targetOf('a-millipede')).toBe('myriapod')
    expect(targetOf('a-scorpion')).toBe('arachnid')
    // A woodlouse looks like an insect and is not one.
    expect(targetOf('a-woodlouse')).toBe('crustacean')
  })
})
