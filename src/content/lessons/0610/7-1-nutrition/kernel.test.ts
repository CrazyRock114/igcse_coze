import { describe, expect, it } from 'vitest'
import kernel, {
  ALL_ITEMS,
  EXERCISES,
  MAX_TARGETS,
  exerciseAt,
  type NutritionParams,
} from './kernel'
import { placementKey } from '@/lib/assignment'

/** Answers that pair every item of `stage` with its correct partner. */
function allCorrect(stage: number): NutritionParams {
  const exercise = exerciseAt(stage)
  const answers: NutritionParams = { stage }
  for (const item of exercise.items) {
    answers[placementKey(item.id)] = exercise.targets.findIndex((t) => t.id === item.target) + 1
  }
  return answers
}

describe('exercise data', () => {
  it('is one-to-one: as many partners as items, each claimed by exactly one', () => {
    for (const exercise of EXERCISES) {
      expect(exercise.targets.length, exercise.id).toBe(exercise.items.length)
      const claimed = exercise.items.map((i) => i.target)
      expect(new Set(claimed).size, exercise.id).toBe(exercise.targets.length)
    }
  })

  it('gives every item a partner that exists', () => {
    for (const exercise of EXERCISES) {
      const ids = new Set(exercise.targets.map((t) => t.id))
      for (const item of exercise.items) {
        expect(ids, `${exercise.id}/${item.id}`).toContain(item.target)
      }
    }
  })

  it('keeps item ids unique across all four exercises', () => {
    const ids = ALL_ITEMS.map((i) => i.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('does not leave the two columns in the same order', () => {
    // If partner n sits opposite item n the exercise answers itself, and a student can
    // finish it without reading either column.
    for (const exercise of EXERCISES) {
      const aligned = exercise.items.filter(
        (item, i) => exercise.targets[i]?.id === item.target
      ).length
      expect(aligned, `${exercise.id} has ${aligned} pairs sitting opposite each other`).toBe(0)
    }
  })

  it('writes both columns in both languages', () => {
    for (const exercise of EXERCISES) {
      for (const item of exercise.items) expect(item.label.zh, item.id).toBeTruthy()
      for (const target of exercise.targets) expect(target.label.zh, target.id).toBeTruthy()
    }
  })
})

describe('nutrition kernel', () => {
  it('starts with nothing paired', () => {
    const result = kernel({ stage: 1 })
    expect(result.readouts['paired']).toBe(0)
    expect(result.readouts['correct']).toBe(0)
  })

  it('scores a complete correct answer for every exercise', () => {
    for (let stage = 1; stage <= EXERCISES.length; stage++) {
      const result = kernel(allCorrect(stage))
      const total = exerciseAt(stage).items.length
      expect(result.readouts['total'], `stage ${stage}`).toBe(total)
      expect(result.readouts['paired'], `stage ${stage}`).toBe(total)
      expect(result.readouts['correct'], `stage ${stage}`).toBe(total)
    }
  })

  it('counts two items sent to the same partner as one right and one wrong', () => {
    // Nothing stops a student doing this, so the score has to stay sensible when they do.
    const answers = allCorrect(3)
    answers[placementKey('e-maltase')] = answers[placementKey('e-amylase')] as number

    const result = kernel(answers)
    expect(result.readouts['paired']).toBe(6)
    expect(result.readouts['correct']).toBe(5)
  })

  it('shows only the pairs of the selected exercise', () => {
    expect(kernel({ stage: 4 }).assignment?.items.map((i) => i.id)).toEqual(
      EXERCISES[3]?.items.map((i) => i.id)
    )
  })

  it('clamps a stage outside the range rather than throwing', () => {
    expect(kernel({ stage: 0 }).assignment?.items.length).toBe(EXERCISES[0]?.items.length)
    expect(kernel({ stage: 99 }).assignment?.items.length).toBe(
      EXERCISES[EXERCISES.length - 1]?.items.length
    )
  })

  it('treats an index past the end of a short exercise as unpaired', () => {
    const answers: NutritionParams = { stage: 4 }
    for (const item of exerciseAt(4).items) answers[placementKey(item.id)] = MAX_TARGETS

    expect(MAX_TARGETS).toBeGreaterThan(exerciseAt(4).targets.length)
    expect(kernel(answers).readouts['paired']).toBe(0)
  })
})

describe('the pairs students most often get the wrong way round', () => {
  const partnerOf = (id: string) => {
    const item = ALL_ITEMS.find((i) => i.id === id)
    const exercise = EXERCISES.find((e) => e.items.includes(item as never))
    return exercise?.targets.find((t) => t.id === item?.target)?.label.en
  }

  it('sends fat to the lacteal and sugar to the capillary, not the other way about', () => {
    expect(partnerOf('v-lacteal')).toContain('fatty acids')
    expect(partnerOf('v-capillary')).toContain('glucose')
  })

  it('keeps bile and hydrochloric acid out of the enzymes', () => {
    // Both sit in the enzyme exercise precisely because they are not enzymes.
    expect(partnerOf('e-bile')).toContain('Not an enzyme')
    expect(partnerOf('e-hcl')).toContain('Not an enzyme')
  })

  it('separates the liver, which makes bile, from the gall bladder, which stores it', () => {
    expect(partnerOf('o-liver')).toContain('Makes bile')
    expect(partnerOf('o-gall')).toContain('Stores bile')
  })

  it('ties vitamin D to rickets and vitamin C to scurvy', () => {
    expect(partnerOf('d-vitd')).toContain('rickets')
    expect(partnerOf('d-vitc')).toContain('scurvy')
  })
})
