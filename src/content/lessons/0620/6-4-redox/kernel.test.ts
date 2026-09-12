import { describe, expect, it } from 'vitest'
import kernel, { ALL_ITEMS, EXERCISES, exerciseAt, type RedoxParams } from './kernel'
import { placementKey } from '@/lib/assignment'

const run = (stage: number, answers: Record<string, number> = {}) =>
  kernel({ stage, ...answers } as RedoxParams)

const allCorrect = (stage: number) => {
  const exercise = exerciseAt(stage)
  const answers: Record<string, number> = {}
  for (const item of exercise.items) {
    answers[placementKey(item.id)] = exercise.targets.findIndex((t) => t.id === item.target) + 1
  }
  return answers
}

describe('the exercises', () => {
  it('has a target for every item and uses every bin', () => {
    for (const exercise of EXERCISES) {
      const ids = exercise.targets.map((t) => t.id)
      for (const item of exercise.items) expect(ids, item.id).toContain(item.target)
      for (const target of exercise.targets) {
        expect(
          exercise.items.some((i) => i.target === target.id),
          `${exercise.id} / ${target.id}`,
        ).toBe(true)
      }
    }
  })

  it('has unique item ids across all three exercises', () => {
    const ids = ALL_ITEMS.map((i) => i.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('gives every item and bin a Chinese gloss', () => {
    for (const exercise of EXERCISES) {
      for (const item of exercise.items) expect(item.label.zh, item.id).toBeTruthy()
      for (const target of exercise.targets) expect(target.label.zh, target.id).toBeTruthy()
    }
  })

  it('does not list the items grouped by their answer', () => {
    for (const exercise of EXERCISES) {
      const targets = exercise.items.map((i) => i.target)
      const runs = targets.filter((t, i) => i === 0 || t !== targets[i - 1]).length
      expect(runs, `${exercise.id} has only ${runs} runs`).toBeGreaterThan(2)
    }
  })
})

describe('the oxygen definition', () => {
  const items = Object.fromEntries(EXERCISES[0]!.items.map((i) => [i.id, i.target]))

  it('calls gaining oxygen oxidation and losing it reduction', () => {
    expect(items['ox-mg']).toBe('oxidised')
    expect(items['ox-h2']).toBe('oxidised')
    expect(items['ox-co']).toBe('oxidised')
    expect(items['ox-cuo']).toBe('reduced')
    expect(items['ox-fe2o3']).toBe('reduced')
    expect(items['ox-zno']).toBe('reduced')
  })

  it('pairs both halves of the same reaction, so redox is seen to be simultaneous', () => {
    // Anything oxidised is oxidised by something, and that something is reduced. Showing
    // only one half of a reaction lets a student believe oxidation happens on its own.
    const labels = EXERCISES[0]!.items.map((i) => i.label.en)
    expect(labels.filter((l) => l.includes('CuO + H₂'))).toHaveLength(2)
    expect(labels.filter((l) => l.includes('Fe₂O₃ + 3CO'))).toHaveLength(2)
  })
})

describe('the electron definition', () => {
  it('sorts by which side the electrons are on', () => {
    for (const item of EXERCISES[1]!.items) {
      const [left = '', right = ''] = item.label.en.split('→')
      const gained = left.includes('e⁻')
      const lost = right.includes('e⁻')
      expect(gained !== lost, item.id).toBe(true)
      expect(item.target, item.id).toBe(gained ? 'reduced' : 'oxidised')
    }
  })

  it('includes an example with no oxygen anywhere in it', () => {
    // The whole reason the electron definition is needed. Magnesium and chlorine is a redox
    // reaction, and the oxygen definition cannot say anything about it at all.
    const labels = EXERCISES[1]!.items.map((i) => i.label.en)
    expect(labels.some((l) => l.includes('Cl'))).toBe(true)
    expect(labels.every((l) => !l.includes('O'))).toBe(true)
  })

  it('includes an ion oxidised without becoming an element', () => {
    // Fe2+ to Fe3+ loses one electron and stays an ion. A student who thinks oxidation
    // means "turning into a compound" cannot place it.
    const items = Object.fromEntries(EXERCISES[1]!.items.map((i) => [i.id, i.target]))
    expect(items['el-fe']).toBe('oxidised')
  })
})

describe('agents', () => {
  const items = Object.fromEntries(EXERCISES[2]!.items.map((i) => [i.id, i.target]))

  it('calls the substance that oxidises another the oxidising agent', () => {
    expect(items['ag-mno4']).toBe('oxidising')
    expect(items['ag-o2']).toBe('oxidising')
    expect(items['ag-cl2']).toBe('oxidising')
  })

  it('calls the substance that reduces another the reducing agent', () => {
    expect(items['ag-c']).toBe('reducing')
    expect(items['ag-h2']).toBe('reducing')
    expect(items['ag-ki']).toBe('reducing')
  })

  it('names the colour change for the two reagents the syllabus tests', () => {
    const mno4 = EXERCISES[2]!.items.find((i) => i.id === 'ag-mno4')!
    const ki = EXERCISES[2]!.items.find((i) => i.id === 'ag-ki')!
    expect(mno4.label.en).toContain('purple to colourless')
    expect(ki.label.en).toContain('colourless to brown')
  })

  it('puts the hint the right way round', () => {
    // The trap in the whole topic: an oxidising agent is reduced itself. A hint that got
    // this backwards would teach the error it exists to prevent.
    const targets = Object.fromEntries(EXERCISES[2]!.targets.map((t) => [t.id, t.hint?.en ?? '']))
    expect(targets['oxidising']).toContain('reduced itself')
    expect(targets['reducing']).toContain('oxidised itself')
  })
})

describe('the kernel', () => {
  it('reports a full score once every item is placed correctly', () => {
    for (let stage = 1; stage <= EXERCISES.length; stage++) {
      const r = run(stage, allCorrect(stage))
      expect(r.readouts['correct'], `stage ${stage}`).toBe(r.readouts['total'])
    }
  })

  it('counts a wrong placement as placed but not correct', () => {
    const exercise = exerciseAt(2)
    const item = exercise.items[0]!
    const wrong = exercise.targets.findIndex((t) => t.id !== item.target) + 1
    const r = run(2, { [placementKey(item.id)]: wrong })
    expect(r.readouts['placed']).toBe(1)
    expect(r.readouts['correct']).toBe(0)
  })

  it('clamps a stage that does not exist', () => {
    expect(exerciseAt(0).id).toBe(EXERCISES[0]!.id)
    expect(exerciseAt(99).id).toBe(EXERCISES[EXERCISES.length - 1]!.id)
  })
})
