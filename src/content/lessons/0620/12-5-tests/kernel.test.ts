import { describe, expect, it } from 'vitest'
import kernel, { ALL_ITEMS, EXERCISES, exerciseAt, type TestsParams } from './kernel'
import { placementKey } from '@/lib/assignment'

const run = (stage: number, answers: Record<string, number> = {}) =>
  kernel({ stage, ...answers } as TestsParams)

const allCorrect = (stage: number) => {
  const exercise = exerciseAt(stage)
  const answers: Record<string, number> = {}
  for (const item of exercise.items) {
    answers[placementKey(item.id)] = exercise.targets.findIndex((t) => t.id === item.target) + 1
  }
  return answers
}

describe('the exercises', () => {
  it('pairs every item with exactly one partner that exists', () => {
    for (const exercise of EXERCISES) {
      const ids = exercise.targets.map((t) => t.id)
      expect(exercise.items.length, exercise.id).toBe(exercise.targets.length)
      for (const item of exercise.items) expect(ids, item.id).toContain(item.target)
    }
  })

  it('uses each partner exactly once', () => {
    // A one-to-one exercise where two items shared a partner could not be completed.
    for (const exercise of EXERCISES) {
      const used = exercise.items.map((i) => i.target)
      expect(new Set(used).size, exercise.id).toBe(used.length)
    }
  })

  it('has unique item ids across every exercise', () => {
    const ids = ALL_ITEMS.map((i) => i.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('gives every item and partner a Chinese gloss', () => {
    for (const exercise of EXERCISES) {
      for (const item of exercise.items) expect(item.label.zh, item.id).toBeTruthy()
      for (const target of exercise.targets) expect(target.label.zh, target.id).toBeTruthy()
    }
  })

  it('never leaves a partner opposite its own item', () => {
    // In writing order the exercise answers itself — pair row one with row one all the way
    // down and never read a word. This is the check that the scramble actually worked.
    for (const exercise of EXERCISES) {
      exercise.items.forEach((item, i) => {
        expect(exercise.targets[i]?.id, `${exercise.id} row ${i}`).not.toBe(item.target)
      })
    }
  })
})

describe('the cation tests', () => {
  const rows = Object.fromEntries(
    EXERCISES[0]!.items.map((i) => [
      i.id,
      EXERCISES[0]!.targets.find((t) => t.id === i.target)!.label.en,
    ]),
  )

  it('distinguishes the three white precipitates by what excess does', () => {
    // Calcium and zinc both give a white precipitate. Only the behaviour in excess tells
    // them apart, and an exercise that did not say so would be unanswerable.
    expect(rows['cations-ca']).toContain('white precipitate')
    expect(rows['cations-zn']).toContain('white precipitate')
    expect(rows['cations-ca']).toContain('insoluble in excess')
    expect(rows['cations-zn']).toContain('dissolving in excess')
  })

  it('gives the coloured precipitates their right colours', () => {
    expect(rows['cations-cu']).toContain('light blue')
    expect(rows['cations-fe2']).toContain('green')
    expect(rows['cations-fe3']).toContain('red-brown')
  })

  it('gives ammonium no precipitate at all', () => {
    // The only cation in the list that does not precipitate, and the reason the test is
    // done by warming and smelling rather than by looking.
    expect(rows['cations-nh4']).toContain('no precipitate')
    expect(rows['cations-nh4']).toContain('litmus blue')
  })
})

describe('the anion tests', () => {
  const rows = Object.fromEntries(
    EXERCISES[1]!.items.map((i) => [
      i.id,
      EXERCISES[1]!.targets.find((t) => t.id === i.target)!.label.en,
    ]),
  )

  it('acidifies before adding silver nitrate or barium nitrate', () => {
    // Without acidifying first, a carbonate present in the sample would give its own white
    // precipitate and be mistaken for a chloride or a sulfate.
    for (const id of ['anions-cl', 'anions-i', 'anions-so4']) {
      expect(rows[id], id).toContain('acidify with dilute nitric acid')
    }
  })

  it('separates chloride from iodide by the colour of the precipitate', () => {
    expect(rows['anions-cl']).toContain('white precipitate')
    expect(rows['anions-i']).toContain('yellow precipitate')
  })
})

describe('the gas tests', () => {
  const rows = Object.fromEntries(
    EXERCISES[2]!.items.map((i) => [
      i.id,
      EXERCISES[2]!.targets.find((t) => t.id === i.target)!.label.en,
    ]),
  )

  it('uses a lighted splint for hydrogen and a glowing one for oxygen', () => {
    // Swapping the two is the classic error, and the words differ by one adjective.
    expect(rows['gases-h2']).toContain('lighted splint')
    expect(rows['gases-h2']).toContain('squeaky pop')
    expect(rows['gases-o2']).toContain('glowing splint')
    expect(rows['gases-o2']).toContain('relights')
  })

  it('distinguishes ammonia from chlorine on damp litmus', () => {
    // Both act on damp litmus. One turns it blue, the other destroys the colour entirely.
    expect(rows['gases-nh3']).toContain('turns blue')
    expect(rows['gases-cl2']).toContain('bleached')
  })
})

describe('the flame tests', () => {
  it('gives every cation a distinct flame colour', () => {
    const colours = EXERCISES[3]!.targets.map((t) => t.label.en)
    expect(new Set(colours).size).toBe(colours.length)
  })
})

describe('the kernel', () => {
  it('reports a full score once every pair is made correctly', () => {
    for (let stage = 1; stage <= EXERCISES.length; stage++) {
      const r = run(stage, allCorrect(stage))
      expect(r.readouts['correct'], `stage ${stage}`).toBe(r.readouts['total'])
      expect(r.readouts['paired'], `stage ${stage}`).toBe(r.readouts['total'])
    }
  })

  it('counts a wrong pairing as paired but not correct', () => {
    const exercise = exerciseAt(1)
    const item = exercise.items[0]!
    const wrong = exercise.targets.findIndex((t) => t.id !== item.target) + 1
    const r = run(1, { [placementKey(item.id)]: wrong })
    expect(r.readouts['paired']).toBe(1)
    expect(r.readouts['correct']).toBe(0)
  })

  it('clamps a stage that does not exist', () => {
    expect(exerciseAt(0).id).toBe(EXERCISES[0]!.id)
    expect(exerciseAt(99).id).toBe(EXERCISES[EXERCISES.length - 1]!.id)
  })
})
