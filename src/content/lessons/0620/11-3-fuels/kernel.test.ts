import { describe, expect, it } from 'vitest'
import kernel, {
  BOILING_POINTS,
  CARBONS,
  FRACTIONS,
  boilingPoint,
  columnHeight,
  fractionFor,
  type FuelsParams,
} from './kernel'

const run = (carbonAtoms: number) => kernel({ carbonAtoms } as FuelsParams)

describe('boiling points', () => {
  it('returns the tabulated value at every tabulated chain length', () => {
    CARBONS.forEach((n, i) => {
      expect(boilingPoint(n), `C${n}`).toBeCloseTo(BOILING_POINTS[i]!, 6)
    })
  })

  it('rises with every extra carbon atom', () => {
    // The whole lesson rests on this being monotonic. A dip anywhere would put a fraction
    // in the wrong place in the column.
    for (let n = 1; n < 40; n++) {
      expect(boilingPoint(n + 1), `C${n} to C${n + 1}`).toBeGreaterThan(boilingPoint(n))
    }
  })

  it('starts below room temperature and ends far above it', () => {
    // Which is why the first fraction is a gas and the last is a solid at room temperature.
    expect(boilingPoint(1)).toBeLessThan(20)
    expect(boilingPoint(4)).toBeLessThan(20)
    expect(boilingPoint(5)).toBeGreaterThan(20)
    expect(boilingPoint(40)).toBeGreaterThan(400)
  })

  it('clamps outside the tabulated range rather than extrapolating', () => {
    expect(boilingPoint(0)).toBeCloseTo(boilingPoint(1), 6)
    expect(boilingPoint(100)).toBeCloseTo(boilingPoint(40), 6)
  })
})

describe('the fractions', () => {
  it('covers every chain length from 1 to 40 with no gap and no overlap', () => {
    // A gap would leave a chain length with no fraction; an overlap would make the answer
    // depend on which entry was written first.
    for (let n = 1; n <= 40; n++) {
      const matches = FRACTIONS.filter((f) => n >= f.from && n <= f.to)
      expect(matches, `C${n} matches ${matches.length} fractions`).toHaveLength(1)
    }
  })

  it('lists them in order of increasing chain length', () => {
    for (let i = 1; i < FRACTIONS.length; i++) {
      expect(FRACTIONS[i]!.from, FRACTIONS[i]!.name.en).toBe(FRACTIONS[i - 1]!.to + 1)
    }
  })

  it('names the fraction and a use for every chain length', () => {
    for (let n = 1; n <= 40; n++) {
      const f = fractionFor(n)
      expect(f.name.en, `C${n}`).toBeTruthy()
      expect(f.name.zh, `C${n}`).toBeTruthy()
      expect(f.uses.en, `C${n}`).toBeTruthy()
      expect(f.uses.zh, `C${n}`).toBeTruthy()
    }
  })

  it('puts the familiar fuels where they belong', () => {
    expect(fractionFor(1).name.en).toContain('refinery gas')
    expect(fractionFor(8).name.en).toContain('gasoline')
    expect(fractionFor(14).name.en).toContain('kerosene')
    expect(fractionFor(20).name.en).toContain('diesel')
    expect(fractionFor(40).name.en).toContain('bitumen')
  })
})

describe('the fractionating column', () => {
  it('draws off the lightest fraction highest and the heaviest lowest', () => {
    // The column is hottest at the bottom. A model that put bitumen at the top would be
    // teaching the column upside down.
    expect(columnHeight(1)).toBeGreaterThan(columnHeight(8))
    expect(columnHeight(8)).toBeGreaterThan(columnHeight(20))
    expect(columnHeight(20)).toBeGreaterThan(columnHeight(40))
  })

  it('reports a position within the column', () => {
    for (let n = 1; n <= 40; n++) {
      expect(columnHeight(n), `C${n}`).toBeGreaterThanOrEqual(0)
      expect(columnHeight(n), `C${n}`).toBeLessThanOrEqual(100)
    }
  })
})

describe('the notes', () => {
  it('names the fraction, its use and where it comes off', () => {
    const note = run(8).markers?.[0]?.label.en ?? ''
    expect(note).toContain('gasoline')
    expect(note).toContain('fuel for cars')
    expect(note).toContain('% of the way up')
    expect(run(8).markers?.[0]?.label.zh).toBeTruthy()
  })

  it('lists the trend across all the properties, not only boiling point', () => {
    const note = run(8).markers?.[1]?.label.en ?? ''
    for (const word of ['viscous', 'volatile', 'ignite']) {
      expect(note, word).toContain(word)
    }
  })

  it('attributes the trend to forces between molecules, not to bond strength', () => {
    // The standard wrong answer is that longer molecules have "stronger bonds". Boiling
    // does not break covalent bonds at all, and the note has to say so.
    const note = run(8).markers?.[2]?.label.en ?? ''
    expect(note).toContain('forces between molecules')
    expect(note).toContain('not broken by boiling')
  })
})

describe('the kernel', () => {
  it('returns finite readouts across the whole range', () => {
    for (let n = 1; n <= 40; n++) {
      for (const [key, value] of Object.entries(run(n).readouts)) {
        expect(Number.isFinite(value), `${key} at C${n}`).toBe(true)
      }
    }
  })

  it('plots one point per carbon atom', () => {
    expect(run(8).series[0]!.points).toHaveLength(40)
  })
})
