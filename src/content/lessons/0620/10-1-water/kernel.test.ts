import { describe, expect, it } from 'vitest'
import { CONTAMINANTS, DOMESTIC_STAGES, STAGES, fitToDrink, waterKernel } from './kernel'

const run = (stage: number) => {
  const r = waterKernel({ stage })
  return { ...r, bodies: r.bodies ?? [] }
}

const rungs = (stage: number) => run(stage).bodies.filter((b) => b.kind !== 'threshold')

describe('STAGES', () => {
  it('runs in the order a treatment works carries them out', () => {
    // 0620.10.1.7
    expect(STAGES.map((s) => s.key)).toEqual([
      'screening',
      'sedimentation',
      'filtration',
      'chlorination',
      'distillation',
    ])
  })

  it('gives each stage exactly one job', () => {
    // One contaminant per stage, so the count falling is the same as the work being done.
    expect(new Set(CONTAMINANTS.map((c) => c.en)).size).toBe(STAGES.length)
  })

  it('describes every stage in both languages', () => {
    for (const s of STAGES) {
      expect(s.name.zh, s.key).toBeTruthy()
      expect(s.removes.zh, s.key).toBeTruthy()
      expect(s.how.zh, s.key).toBeTruthy()
      expect(s.how.en.length, s.key).toBeGreaterThan(20)
    }
  })

  it('leaves distillation out of the domestic supply', () => {
    // No public supply distils its water; that is the whole reason tap water is not pure.
    expect(DOMESTIC_STAGES).toBe(4)
    expect(STAGES[4]!.key).toBe('distillation')
    expect(STAGES[4]!.inDomesticSupply).toBe(false)
    expect(STAGES.slice(0, 4).every((s) => s.inDomesticSupply)).toBe(true)
  })
})

describe('fitToDrink', () => {
  it('becomes true at chlorination and not before', () => {
    expect(fitToDrink(3)).toBe(false)
    expect(fitToDrink(4)).toBe(true)
    expect(fitToDrink(5)).toBe(true)
  })

  it('is true while a contaminant is still in the water', () => {
    // 0620.10.1.3 — safe to drink is not the same as pure, and this is where they part.
    const r = run(DOMESTIC_STAGES)
    expect(r.readouts['fitToDrink']).toBe(1)
    expect(r.readouts['contaminantsRemaining']).toBe(1)
  })
})

describe('waterKernel', () => {
  it('draws one rung per stage, plus the line', () => {
    expect(rungs(0)).toHaveLength(STAGES.length)
    expect(run(0).bodies.filter((b) => b.kind === 'threshold')).toHaveLength(1)
  })

  it('marks completed stages as done and the current one as selected', () => {
    const bodies = rungs(3)
    expect(bodies.filter((b) => b.kind === 'done')).toHaveLength(2)
    expect(bodies.filter((b) => b.kind === 'selected')).toHaveLength(1)
    expect(bodies.filter((b) => b.kind === 'rung')).toHaveLength(2)
    expect(bodies[2]!.kind).toBe('selected')
  })

  it('selects nothing when no stage has been carried out', () => {
    expect(rungs(0).every((b) => b.kind === 'rung')).toBe(true)
  })

  it('numbers the stages and says what each removes', () => {
    rungs(0).forEach((b, i) => {
      const [n, name, aside] = b.label!.split('|')
      expect(n).toBe(String(i + 1))
      expect(name).toBe(STAGES[i]!.name.en)
      expect(aside).toBe(`removes ${STAGES[i]!.removes.en}`)
    })
  })

  it('puts the line where the public supply stops', () => {
    const line = run(0).bodies.find((b) => b.kind === 'threshold')!
    const chlorination = rungs(0)[DOMESTIC_STAGES - 1]!
    const distillation = rungs(0)[DOMESTIC_STAGES]!
    expect(line.y).toBeLessThan(chlorination.y)
    expect(line.y).toBeGreaterThan(distillation.y)
  })

  it('removes exactly one contaminant per stage', () => {
    for (let stage = 0; stage <= STAGES.length; stage++) {
      const r = run(stage)
      expect(r.readouts['contaminantsRemoved'], `stage ${stage}`).toBe(stage)
      expect(r.readouts['contaminantsRemaining'], `stage ${stage}`).toBe(STAGES.length - stage)
    }
  })

  it('only reaches zero contaminants after distillation', () => {
    expect(run(4).readouts['contaminantsRemaining']).toBe(1)
    expect(run(5).readouts['contaminantsRemaining']).toBe(0)
  })

  it('says why distilled water is used in the laboratory, at the point it becomes relevant', () => {
    expect(run(DOMESTIC_STAGES).markers![2]!.label.en).toMatch(/distilled water and not tap water/)
    expect(run(1).markers![2]!.label.en).not.toMatch(/distilled water and not tap water/)
  })

  it('describes untreated water before any stage has been applied', () => {
    expect(run(0).markers![1]!.label.en).toMatch(/Untreated river water/)
    expect(run(0).markers![2]!.label.en).toMatch(/beneficial/)
    expect(run(0).markers![2]!.label.en).toMatch(/harmful/)
  })

  it('gets the singular right for the last remaining contaminant', () => {
    expect(run(4).markers![1]!.label.en).toMatch(/1 contaminant left/)
    expect(run(2).markers![1]!.label.en).toMatch(/3 contaminants left/)
  })

  it('clamps parameters outside their range', () => {
    expect(waterKernel({ stage: -3 }).readouts['stagesDone']).toBe(0)
    expect(waterKernel({ stage: 99 }).readouts['stagesDone']).toBe(STAGES.length)
  })

  it('is finite everywhere across the parameter range', () => {
    for (let stage = 0; stage <= STAGES.length; stage++) {
      const r = waterKernel({ stage })
      for (const [k, v] of Object.entries(r.readouts)) {
        expect(Number.isFinite(v), `${k} at stage ${stage}`).toBe(true)
      }
      expect(r.markers!.every((m) => m.label.en.length > 0 && m.label.zh)).toBe(true)
    }
  })
})
