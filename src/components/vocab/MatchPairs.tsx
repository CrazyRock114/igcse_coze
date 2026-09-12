/**
 * Match-pairs game — connect each term to its definition.
 *
 * Round of 5 random pairs. The student clicks a term, then a definition.
 * A correct pair clears both tiles. A wrong pair flashes red briefly
 * and resets. The round ends when all pairs are matched.
 *
 * The "matched" set is held in state; the `tiles` array is computed
 * once per round (lazy useState) and not mutated, so React can render
 * by identity comparison.
 */
import { useState } from 'react'
import { T } from '@/components/i18n/T'
import { useWordBank } from '@/lib/useVocab'
import { recordReview, useStreak, streakLabel } from '@/lib/useStreak'
import { VOCAB } from '@/lib/vocabStrings'
import type { Term } from '@/content/types'
import type { VocabScope } from '@/pages/VocabPage'

const ROUND_SIZE = 5

type Side = 'term' | 'def'
interface Tile {
  id: string
  side: Side
  termId: string
  text: string
}

export function MatchPairs({
  pool,
  scope,
}: {
  pool: Array<{ term: Term }>
  scope?: VocabScope
}) {
  const { words, assess } = useWordBank()
  const streak = useStreak()
  // `pool` is already filtered by VocabPage; we just need to filter
  // `words` (the bank) for the same scope so the SRS round matches.
  const scopedWords = (() => {
    if (!scope) return words
    return words.filter((w) => {
      if (scope.subject !== 'all' && w.subject !== scope.subject) return false
      if (scope.slug !== 'all' && w.slug !== scope.slug) return false
      return true
    })
  })()
  const [round, setRound] = useState(() => makeRound(pool, scopedWords, ROUND_SIZE))
  const [picked, setPicked] = useState<{ side: Side; termId: string } | null>(null)
  const [matched, setMatched] = useState<Set<string>>(new Set())
  const [wrongFlash, setWrongFlash] = useState<{ side: Side; termId: string } | null>(null)
  const [done, setDone] = useState(false)

  if (round.terms.length < 2) {
    return (
      <p className="rounded-lg border border-dashed border-line bg-canvas p-6 text-center text-sm text-muted">
        <T value={VOCAB.gameEmpty} />
      </p>
    )
  }

  if (done) {
    return (
      <div className="rounded-xl border border-teal-600 bg-teal-50 p-6 text-center">
        <h3 className="text-lg font-semibold text-ink">
          <T value={VOCAB.gameMatchCleared} />
        </h3>
        <p className="mt-1 text-sm text-ink-soft">
          🔥 <span className="font-mono text-ink">{streakLabel(streak)}</span>
        </p>
        <button
          type="button"
          onClick={() => {
            setRound(makeRound(pool, scopedWords, ROUND_SIZE))
            setPicked(null)
            setMatched(new Set())
            setWrongFlash(null)
            setDone(false)
          }}
          className="mt-3 rounded-md bg-ink px-3 py-1.5 text-sm font-medium text-white hover:opacity-90"
        >
          <T value={VOCAB.gamePlayAgain} />
        </button>
      </div>
    )
  }

  const onTile = (tile: Tile) => {
    if (matched.has(tile.id)) return
    if (wrongFlash) return
    if (!picked) {
      setPicked({ side: tile.side, termId: tile.termId })
      return
    }
    if (picked.side === tile.side) {
      // Same side → switch selection
      setPicked({ side: tile.side, termId: tile.termId })
      return
    }
    if (picked.termId === tile.termId) {
      // Correct pair
      const termTileId = picked.side === 'term' ? picked.termId : tile.termId
      const defTileId = picked.side === 'def' ? picked.termId : tile.termId
      setMatched((s) => {
        const next = new Set(s)
        next.add(`term:${termTileId}`)
        next.add(`def:${defTileId}`)
        if (next.size === round.terms.length * 2) {
          setTimeout(() => {
            setDone(true)
            // Award XP for the whole round
            recordReview('know')
            // Mark all terms in the round as a success
            for (const t of round.terms) {
              const bankEntry = scopedWords.find((w) => w.termId === t.en)
              if (bankEntry) assess(bankEntry.termId, 'know')
            }
          }, 350)
        }
        return next
      })
      setPicked(null)
    } else {
      // Wrong pair
      setWrongFlash({ side: tile.side, termId: tile.termId })
      setTimeout(() => {
        setWrongFlash(null)
        setPicked(null)
      }, 600)
    }
  }

  return (
    <div className="space-y-3">
      <p className="text-xs text-muted">
        <T value={VOCAB.gameMatchInstructions} />
      </p>
      <div className="grid gap-2 sm:grid-cols-2">
        <ul className="space-y-2">
          {round.tiles
            .filter((t) => t.side === 'term')
            .map((t) => (
              <li key={t.id}>
                <TileBtn
                  tile={t}
                  picked={picked?.side === 'term' && picked.termId === t.termId}
                  matched={matched.has(t.id)}
                  wrong={wrongFlash?.side === 'term' && wrongFlash.termId === t.termId}
                  onClick={() => onTile(t)}
                />
              </li>
            ))}
        </ul>
        <ul className="space-y-2">
          {round.tiles
            .filter((t) => t.side === 'def')
            .map((t) => (
              <li key={t.id}>
                <TileBtn
                  tile={t}
                  picked={picked?.side === 'def' && picked.termId === t.termId}
                  matched={matched.has(t.id)}
                  wrong={wrongFlash?.side === 'def' && wrongFlash.termId === t.termId}
                  onClick={() => onTile(t)}
                />
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}

function TileBtn({
  tile,
  picked,
  matched,
  wrong,
  onClick,
}: {
  tile: Tile
  picked: boolean
  matched: boolean
  wrong: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={matched}
      className={
        'block w-full rounded-lg border p-2 text-left text-sm transition-colors ' +
        (matched
          ? 'border-teal-300 bg-teal-50 text-teal-800 opacity-60 line-through'
          : picked
          ? 'border-teal-600 bg-teal-100 text-ink'
          : wrong
          ? 'border-rose-500 bg-rose-100 text-rose-800'
          : 'border-line bg-surface text-ink-soft hover:border-teal-500 hover:bg-canvas')
      }
    >
      {tile.text}
    </button>
  )
}

interface Round {
  terms: Term[]
  tiles: Tile[]
}

function makeRound(pool: Array<{ term: Term }>, words: import('@/lib/vocabTypes').WordEntry[], size: number): Round {
  const poolByEn = new Map(pool.map((p) => [p.term.en, p.term]))
  const candidates: Term[] = []
  const inBank = new Set(words.filter((w) => w.status !== 'known').map((w) => w.termId))
  for (const w of words) {
    if (!inBank.has(w.termId)) continue
    const t = poolByEn.get(w.termId)
    if (t) candidates.push(t)
  }
  if (candidates.length < size) {
    for (const p of pool) {
      if (candidates.length >= size) break
      if (!candidates.find((c) => c.en === p.term.en)) candidates.push(p.term)
    }
  }
  const a = candidates.slice(0, size)
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j]!, a[i]!]
  }
  const tiles: Tile[] = []
  for (const t of a) {
    tiles.push({ id: `term:${t.en}`, side: 'term', termId: t.en, text: t.en })
    tiles.push({
      id: `def:${t.en}`,
      side: 'def',
      termId: t.en,
      // Show the full definition in the match-tile. Previous code
      // truncated at 80 chars + '…', which hid the discriminating
      // middle of similar definitions and made the game much harder
      // than intended. CSS wraps long text inside the tile, so this
      // stays scannable.
      text: t.definition.en,
    })
  }
  // Shuffle the def side independently
  const defs = tiles.filter((t) => t.side === 'def')
  for (let i = defs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[defs[i], defs[j]] = [defs[j]!, defs[i]!]
  }
  return { terms: a, tiles }
}
