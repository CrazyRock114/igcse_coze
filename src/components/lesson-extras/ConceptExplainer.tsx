import { T } from '@/components/i18n/T'
import type { Bilingual, ConceptExplainerExtra } from '@/content/types'
import { assetUrl } from '@/lib/assetUrl'
import { CONCEPT_EXPLAINER } from '@/lib/lessonExtrasStrings'

/**
 * A vertical stack of "hook → science → why-it-matters" blocks. Each block
 * tells one story: a memorable opening, the actual science, why it matters
 * outside the textbook, and (optionally) a classroom anecdote.
 *
 * Designed for the kind of content that came out of the 8/3-8/5 G8
 * classroom transcript review — facts too long for a single `Term`
 * definition and too factually dense for a vocab card, but the kind of
 * "wait, that's why" moments the student remembers a year later.
 *
 *   - 17-1: telomere / Hayflick limit / HeLa (one block, why cells age)
 *   - 14-1: the hygiene hypothesis (one block, why allergies are rising)
 *   - 11-1: fog / haze / PM2.5 / PM10 (three blocks, what is in the air)
 *   - 11-1: mucociliary-escalator (G8 Figure B8.03 hero, three cells)
 */
export function ConceptExplainer({ extra }: { extra: ConceptExplainerExtra }) {
  return (
    <div className="space-y-4">
      {extra.heroImage && (
        <figure className="overflow-hidden rounded-lg border border-line bg-surface">
          <img
            src={assetUrl(extra.heroImage)}
            alt={CONCEPT_EXPLAINER.heroAlt.en}
            className="block w-full bg-canvas"
            loading="lazy"
          />
          {extra.heroImageSource && (
            <figcaption className="border-t border-line bg-canvas px-3 py-1 text-[10px] text-muted">
              <T value={extra.heroImageSource} />
            </figcaption>
          )}
        </figure>
      )}
      {extra.blocks.map((b) => (
        <article
          key={b.id}
          data-concept-block={b.id}
          className="overflow-hidden rounded-lg border border-line bg-surface"
        >
          <header className="border-b border-line bg-canvas px-4 py-2">
            <h3 className="text-base font-semibold text-ink">
              <T value={b.title} />
            </h3>
          </header>

          <div className="space-y-3 px-4 py-3 text-sm leading-relaxed">
            <Block
              label={<T value={CONCEPT_EXPLAINER.sectionHook} />}
              accent="text-amber-700"
              value={b.hook}
            />
            <Block
              label={<T value={CONCEPT_EXPLAINER.sectionMechanism} />}
              accent="text-accent"
              value={b.mechanism}
            />
            <Block
              label={<T value={CONCEPT_EXPLAINER.sectionWhy} />}
              accent="text-emerald-700"
              value={b.whyItMatters}
            />
            {b.teacherStory && (
              <Block
                label={<T value={CONCEPT_EXPLAINER.sectionStory} />}
                accent="text-sky-700"
                value={b.teacherStory}
                italic
              />
            )}
          </div>
        </article>
      ))}
    </div>
  )
}

function Block({
  label,
  accent,
  value,
  italic,
}: {
  label: React.ReactNode
  accent: string
  value: Bilingual
  italic?: boolean
}) {
  return (
    <div>
      <h4
        className={
          'mb-1 text-[10px] font-semibold uppercase tracking-wide ' + accent
        }
      >
        {label}
      </h4>
      <p
        className={
          'text-ink-soft ' + (italic ? 'italic text-ink-soft/90' : '')
        }
      >
        <T value={value} />
      </p>
    </div>
  )
}
