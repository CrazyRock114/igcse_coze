import { useState } from 'react'
import { T } from '@/components/i18n/T'
import type { ConceptEnrichment } from '@/lib/vocabTypes'
import type { Term } from '@/content/types'
import { useWordBank } from '@/lib/useVocab'
import { useNow } from '@/lib/useNow'
import { VOCAB } from '@/lib/vocabStrings'
import { assetUrl } from '@/lib/assetUrl'
import { SpeakButton } from './SpeakButton'
import { RelatedChips } from './RelatedChips'

/**
 * The "concept card" — a rich display of a single glossary term.
 *
 * Three layers, from the most general to the most specific:
 *  1. The Term itself: English, Chinese, one-line definition (always present)
 *  2. The enrichment: image, mechanism, clinical details, related terms
 *  3. The user's state: in the word bank? known? still learning? when's
 *     the next review?
 *
 * Inline mode is collapsible; full mode shows everything. The card is also the
 * "front" of the study-mode flip, and the same data feeds the word bank list
 * and the game. One component, three jobs.
 */
export function ConceptCard({
  term,
  enrichment,
  variant = 'full',
  showBankControls = true,
}: {
  term: Term
  enrichment?: ConceptEnrichment
  variant?: 'full' | 'inline'
  showBankControls?: boolean
}) {
  const [open, setOpen] = useState(variant === 'full')
  const bank = useWordBank()
  const entry = bank.words.find((w) => w.termId === term.en)
  const inBank = !!entry
  const status = entry?.status ?? null

  return (
    <article
      className="rounded-xl border border-line bg-surface p-4"
      data-concept-term={term.en}
      id={`term-${term.en}`}
    >
      <header className="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <h3 className="text-lg font-semibold text-ink">
            <T value={{ en: term.en, zh: term.zh }} />
          </h3>
          <p className="text-xs text-muted">
            {enrichment ? (
              <>
                <T value={VOCAB.fromLesson} /> {enrichment.subject} · {enrichment.slug}
              </>
            ) : null}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <SpeakButton text={term.en} />
          {showBankControls && (
            <BankControls
              inBank={inBank}
              status={status}
              onAdd={() => enrichment && bank.add(term.en, enrichment.subject, enrichment.slug)}
              onRemove={() => bank.remove(term.en)}
              onMark={(s) => bank.setStatus(term.en, s)}
            />
          )}
        </div>
      </header>

      <p className="mt-2 text-sm text-ink-soft">
        <T value={term.definition} />
      </p>

      {entry && (
        <p className="mt-2 text-xs text-muted">
          <T value={VOCAB.srsNextReview} />:{' '}
          <span className="font-mono text-ink">
            <SrsSchedule entry={entry} />
          </span>
          {entry.lapses > 0 && (
            <span className="ml-2 rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-semibold text-rose-700">
              <T value={VOCAB.lapseBadge} params={{ count: String(entry.lapses) }} />
            </span>
          )}
        </p>
      )}

      {enrichment && (
        <div className="mt-3 grid gap-3 sm:grid-cols-[200px_1fr]">
          {enrichment.image && (
            <figure className="m-0 overflow-hidden rounded-lg border border-line bg-canvas">
              <img
                src={assetUrl(enrichment.image)}
                alt={term.en}
                className="h-40 w-full object-cover"
                loading="lazy"
              />
              {enrichment.imageSource && (
                <figcaption className="px-2 py-1 text-[10px] text-muted">
                  {enrichment.imageSource}
                </figcaption>
              )}
            </figure>
          )}
          <div>
            {enrichment.mechanism && (
              <div className="mb-2">
                <h4 className="text-[11px] font-semibold uppercase tracking-wide text-muted">
                  <T value={VOCAB.mechanismTitle} />
                </h4>
                <p className="text-sm text-ink-soft">
                  <T value={enrichment.mechanism} />
                </p>
              </div>
            )}
            {enrichment.clinicalDetails && (
              <div>
                <h4 className="text-[11px] font-semibold uppercase tracking-wide text-muted">
                  <T value={VOCAB.clinicalTitle} />
                </h4>
                <p className="text-sm text-ink-soft">
                  <T value={enrichment.clinicalDetails} />
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {enrichment && enrichment.relatedTerms && enrichment.relatedTerms.length > 0 && (
        <RelatedChips
          termIds={enrichment.relatedTerms}
          current={term.en}
        />
      )}

      {enrichment && (enrichment.mechanism || enrichment.clinicalDetails) && variant === 'inline' && (
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="mt-2 text-xs text-teal-700 hover:underline"
        >
          <T value={open ? VOCAB.collapse : VOCAB.expand} />
        </button>
      )}
    </article>
  )
}

function SrsSchedule({ entry }: { entry: { nextDue: number; status: string; interval: number } }) {
  const now = useNow()
  if (entry.nextDue === 0 || entry.status === 'new') {
    return <T value={VOCAB.srsNew} />
  }
  if (!now) return <T value={VOCAB.srsNew} />
  const days = Math.round((entry.nextDue - now) / (24 * 60 * 60 * 1000))
  if (days <= 0) return <T value={VOCAB.srsDueNow} />
  return <T value={VOCAB.srsInDays} params={{ n: String(days) }} />
}

function BankControls({
  inBank,
  status,
  onAdd,
  onRemove,
  onMark,
}: {
  inBank: boolean
  status: 'new' | 'learning' | 'known' | null
  onAdd: () => void
  onRemove: () => void
  onMark: (s: 'new' | 'learning' | 'known') => void
}) {
  if (!inBank) {
    return (
      <button
        type="button"
        onClick={onAdd}
        className="rounded-md border border-line bg-canvas px-2.5 py-1 text-xs font-medium text-ink-soft hover:border-teal-500 hover:text-teal-700"
      >
        <T value={VOCAB.addToBank} />
      </button>
    )
  }
  return (
    <div className="flex items-center gap-1.5">
      <span
        className={
          'rounded-full px-2 py-0.5 text-[10px] font-medium ' +
          (status === 'known'
            ? 'bg-emerald-100 text-emerald-800'
            : status === 'learning'
            ? 'bg-amber-100 text-amber-800'
            : 'bg-slate-100 text-slate-700')
        }
      >
        <T value={status === 'known' ? VOCAB.statusKnown : status === 'learning' ? VOCAB.statusLearning : VOCAB.statusNew} />
      </span>
      <button
        type="button"
        onClick={() => onMark('known')}
        className="rounded-md border border-line bg-surface px-2 py-0.5 text-[10px] text-ink-soft hover:border-emerald-500 hover:text-emerald-700"
      >
        <T value={VOCAB.markKnown} />
      </button>
      <button
        type="button"
        onClick={() => onMark('learning')}
        className="rounded-md border border-line bg-surface px-2 py-0.5 text-[10px] text-ink-soft hover:border-amber-500 hover:text-amber-700"
      >
        <T value={VOCAB.markLearning} />
      </button>
      <button
        type="button"
        onClick={onRemove}
        className="rounded-md border border-line bg-surface px-2 py-0.5 text-[10px] text-muted hover:border-rose-500 hover:text-rose-700"
        title="Remove from word bank"
      >
        <T value={VOCAB.removeFromBank} />
      </button>
    </div>
  )
}
