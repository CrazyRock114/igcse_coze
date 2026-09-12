/**
 * Game picker — chooses which of the three vocabulary games to play.
 *
 * Each card is a tappable tile; the chosen game renders below. Keeps
 * the rest of the page tidy and lets the student switch between modes
 * without leaving the page. The selection persists in component state
 * (resets on navigation away) — fine, because the picker is the
 * first thing the user sees when they hit the tab anyway.
 */
import { useState } from 'react'
import { T } from '@/components/i18n/T'
import { VOCAB } from '@/lib/vocabStrings'
import type { ConceptEnrichment } from '@/lib/vocabTypes'
import type { Term } from '@/content/types'
import type { VocabScope } from '@/pages/VocabPage'
import { WordGame } from './WordGame'
import { TypeTheTerm } from './TypeTheTerm'
import { MatchPairs } from './MatchPairs'

type GameId = 'multi' | 'type' | 'match'

const GAMES: ReadonlyArray<{ id: GameId; label: typeof VOCAB.gameMultiChoice; desc: typeof VOCAB.gameMultiChoiceDesc; color: string }> = [
  { id: 'multi', label: VOCAB.gameMultiChoice, desc: VOCAB.gameMultiChoiceDesc, color: 'teal' },
  { id: 'type', label: VOCAB.gameTypeTerm, desc: VOCAB.gameTypeTermDesc, color: 'amber' },
  { id: 'match', label: VOCAB.gameMatchPairs, desc: VOCAB.gameMatchPairsDesc, color: 'rose' },
]

export function GamePicker({
  resolve,
  pool,
  scope,
}: {
  resolve: (termId: string, subject: string, slug: string) => { term: Term; enrichment?: ConceptEnrichment } | null
  pool: Array<{ term: Term }>
  scope?: VocabScope
}) {
  const [picked, setPicked] = useState<GameId | null>(null)

  if (!picked) {
    return (
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-ink-soft">
          <T value={VOCAB.gamePickerTitle} />
        </h3>
        <ul className="grid gap-3 sm:grid-cols-3">
          {GAMES.map((g) => (
            <li key={g.id}>
              <button
                type="button"
                onClick={() => setPicked(g.id)}
                className="block w-full rounded-xl border border-line bg-surface p-4 text-left transition-colors hover:border-teal-500 hover:bg-canvas"
              >
                <h4
                  className={
                    'text-base font-semibold ' +
                    (g.color === 'teal'
                      ? 'text-teal-700'
                      : g.color === 'amber'
                      ? 'text-amber-700'
                      : 'text-rose-700')
                  }
                >
                  <T value={g.label} />
                </h4>
                <p className="mt-1 text-xs text-ink-soft">
                  <T value={g.desc} />
                </p>
              </button>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setPicked(null)}
          className="text-xs text-teal-700 hover:underline"
        >
          ← <T value={VOCAB.gamePickerTitle} />
        </button>
      </div>
      {picked === 'multi' && <WordGame resolve={resolve} pool={pool} />}
      {picked === 'type' && (
        <TypeTheTerm resolve={resolve} pool={pool} {...(scope ? { scope } : {})} />
      )}
      {picked === 'match' && (
        <MatchPairs pool={pool} {...(scope ? { scope } : {})} />
      )}
    </div>
  )
}
