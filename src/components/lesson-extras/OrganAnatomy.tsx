import { Suspense, lazy, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import type { OrganAnatomyExtra, Bilingual } from '@/content/types'
import { T } from '@/components/i18n/T'
import { HEART_ANATOMY, ORGAN_ANATOMY } from '@/lib/lessonExtrasStrings'
import { assetUrl } from '@/lib/assetUrl'

const Anatomy3D = lazy(() =>
  import('@/components/lesson-extras/Anatomy3D').then((m) => ({ default: m.Anatomy3D }))
)

/**
 * Standalone 3D anatomy viewer for any of the 8 non-heart organs.
 * The same R3F canvas that powers `HeartAnatomy`'s 3D tab, but no 2D
 * figure — the model is the focus. The student drags to rotate,
 * scrolls to zoom, and clicks the dots to read about each part.
 *
 * Hotspot data lives in `organData.ts` and the `organ` field on the
 * extra selects which dataset to use. The lesson file just sets the
 * title, hint, initial part, and an optional intro.
 */
export function OrganAnatomy({ extra }: { extra: OrganAnatomyExtra }) {
  const [selectedId, setSelectedId] = useState<string | null>(
    extra.initialPart ?? extra.parts[0]?.id ?? null
  )
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const { subject, slug } = useParams<{ subject: string; slug: string }>()

  const selected = useMemo(
    () => extra.parts.find((p) => p.id === selectedId) ?? null,
    [extra.parts, selectedId]
  )

  return (
    <article className="rounded-xl border border-line bg-surface p-4">
      <header className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-lg font-semibold text-ink">
          <T value={extra.title} />
        </h2>
        <p className="text-xs text-muted">
          <T value={extra.hint} />
        </p>
      </header>

      <div className="grid gap-4 lg:grid-cols-[1fr_300px]">
        <div className="relative overflow-hidden rounded-lg border border-line bg-canvas">
          <Suspense
            fallback={
              <div className="flex h-[420px] items-center justify-center text-sm text-muted">
                <T value={ORGAN_ANATOMY.loading} />
              </div>
            }
          >
            <Anatomy3D
              modelUrl={assetUrl(`/figures/3d/${extra.organ}.glb`)}
              parts={extra.parts}
              selectedId={selectedId}
              hoveredId={hoveredId}
              onSelect={setSelectedId}
              onHover={setHoveredId}
              followStep={0}
              orderedForFollow={[]}
              autoRotate
            />
          </Suspense>
          {subject && slug && (
            <Link
              to={`/anatomy/${subject}/${slug}`}
              target="_blank"
              rel="noopener"
              className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-md border border-line bg-canvas/90 px-2.5 py-1 text-[11px] font-medium text-ink-soft shadow-sm transition-colors hover:bg-surface hover:text-ink"
              title="Open the fullscreen 3D viewer in a new tab"
            >
              <span aria-hidden="true">⛶</span>
              <T value={HEART_ANATOMY.openFullscreen} />
            </Link>
          )}
        </div>

        <SidePanel
          selected={selected}
          system={extra.system}
          intro={extra.intro ?? null}
        />
      </div>
    </article>
  )
}

function SidePanel({
  selected,
  system,
  intro,
}: {
  selected: { name: Bilingual; description: Bilingual } | null
  system: Bilingual
  intro: Bilingual | null
}) {
  return (
    <aside className="rounded-lg border border-line bg-surface p-4">
      <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted">
        <T value={ORGAN_ANATOMY.systemLabel} />
      </div>
      <div className="mb-3 text-sm font-medium text-ink">
        <T value={system} />
      </div>

      {selected ? (
        <>
          <h3 className="mb-2 text-base font-semibold text-ink">
            <T value={selected.name} />
          </h3>
          <p className="text-sm text-ink-soft">
            <T value={selected.description} />
          </p>
        </>
      ) : intro ? (
        <p className="text-sm text-ink-soft">
          <T value={intro} />
        </p>
      ) : null}
    </aside>
  )
}
