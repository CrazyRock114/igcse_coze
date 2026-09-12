import { useState } from 'react'
import type { PlacentaExchangeExtra, AnatomyOrgan, Bilingual } from '@/content/types'
import { T } from '@/components/i18n/T'
import { PLACENTA_EXCHANGE } from '@/lib/lessonExtrasStrings'
import { assetUrl } from '@/lib/assetUrl'

/**
 * The placenta and exchange between mother and fetus (G8 B11.09).
 *
 * Hotspots on the figure label the maternal and fetal sides — the
 * lining of the uterus, the space filled with the mother's blood, the
 * fetal capillaries, the umbilical cord with its artery and vein — and
 * the side panel describes each one.
 *
 * Below the figure, a "what crosses the placenta" card lists the
 * substances that pass in each direction, and a closing note explains
 * why the two bloods must not mix. This is the part most students lose
 * marks on in the exam.
 *
 * Coordinates: figure-b11-09 is 809 × 731 px.
 */
const IMG_W = 809
const IMG_H = 731

type Hotspot = { type: 'circle'; x: number; y: number; r: number }
  | { type: 'ellipse'; x: number; y: number; rx: number; ry: number }

const HOTSPOTS: Record<string, Hotspot> = {
  // The lining of the uterus — the orange/brown mass in the upper left
  // of the figure.
  'lining-of-uterus': { type: 'ellipse', x: 220, y: 180, rx: 180, ry: 150 },
  // The space filled with the mother's blood — between the uterus
  // lining and the fetal capillaries.
  'maternal-blood-space': { type: 'ellipse', x: 350, y: 320, rx: 180, ry: 100 },
  // The fetal capillaries — the finger-like projections in the middle
  // of the figure, separated from the maternal blood by a thin wall.
  'fetal-capillaries': { type: 'ellipse', x: 380, y: 350, rx: 90, ry: 110 },
  // The thin wall of placenta — labelled twice in the figure; one
  // hotspot covers both.
  'placental-wall': { type: 'ellipse', x: 290, y: 470, rx: 100, ry: 22 },
  // The umbilical cord — the long blue/red structure at the bottom.
  'umbilical-cord': { type: 'ellipse', x: 540, y: 580, rx: 130, ry: 22 },
  // The umbilical artery — carries deoxygenated blood from the fetus
  // to the placenta.
  'umbilical-artery': { type: 'ellipse', x: 700, y: 530, rx: 25, ry: 60 },
  // The umbilical vein — carries oxygenated blood from the placenta to
  // the fetus.
  'umbilical-vein': { type: 'ellipse', x: 580, y: 620, rx: 25, ry: 60 },
}

export function PlacentaExchange({ extra }: { extra: PlacentaExchangeExtra }) {
  const [selectedId, setSelectedId] = useState<string | null>('maternal-blood-space')
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const selected = extra.parts.find((p) => p.id === selectedId) ?? null

  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-[1fr_300px]">
        <div>
          <p className="mb-2 text-xs text-muted">
            <T value={PLACENTA_EXCHANGE.intro} />
          </p>

          <FigureWithHotspots
            image={assetUrl(extra.image)}
            imageSource={extra.imageSource}
            parts={extra.parts}
            selectedId={selectedId}
            hoveredId={hoveredId}
            onSelect={setSelectedId}
            onHover={setHoveredId}
          />
        </div>

        <aside className="rounded-lg border border-line bg-canvas p-3 text-sm">
          {selected ? <PartPanel part={selected} /> : null}
        </aside>
      </div>

      <ExchangeTable
        toFetus={extra.toFetus}
        toMother={extra.toMother}
        exchangeNote={extra.exchangeNote}
      />
    </div>
  )
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function PartPanel({ part }: { part: AnatomyOrgan }) {
  return (
    <div>
      <h3 className="mb-1 text-base font-semibold text-ink">
        <T value={part.name} />
      </h3>
      <p className="leading-relaxed text-ink-soft">
        <T value={part.description} />
      </p>
    </div>
  )
}

function ExchangeTable({
  toFetus,
  toMother,
  exchangeNote,
}: {
  toFetus: Bilingual[]
  toMother: Bilingual[]
  exchangeNote: Bilingual
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-line bg-surface">
      <div className="grid gap-0 sm:grid-cols-2">
        <div className="border-b border-line p-3 sm:border-b-0 sm:border-r">
          <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-emerald-700">
            <T value={PLACENTA_EXCHANGE.toFetusHeading} />
          </div>
          <ul className="space-y-1 text-sm text-ink-soft">
            {toFetus.map((item, i) => (
              <li key={i}>
                · <T value={item} />
              </li>
            ))}
          </ul>
        </div>
        <div className="p-3">
          <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-rose-700">
            <T value={PLACENTA_EXCHANGE.toMotherHeading} />
          </div>
          <ul className="space-y-1 text-sm text-ink-soft">
            {toMother.map((item, i) => (
              <li key={i}>
                · <T value={item} />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-line bg-canvas px-3 py-3 text-xs leading-relaxed text-ink-soft">
        <T value={exchangeNote} />
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Figure + hotspot overlay
// ---------------------------------------------------------------------------

function FigureWithHotspots({
  image,
  imageSource,
  parts,
  selectedId,
  hoveredId,
  onSelect,
  onHover,
}: {
  image: string
  imageSource: Bilingual
  parts: AnatomyOrgan[]
  selectedId: string | null
  hoveredId: string | null
  onSelect: (id: string) => void
  onHover: (id: string | null) => void
}) {
  return (
    <figure className="relative m-0 overflow-hidden rounded-lg border border-line bg-canvas">
      <img
        src={image}
        alt={imageSource.en}
        className="block w-full"
        draggable={false}
      />
      <figcaption className="border-t border-line bg-canvas px-3 py-1.5 text-[11px] text-muted">
        <T value={imageSource} />
      </figcaption>

      <svg
        viewBox={`0 0 ${IMG_W} ${IMG_H}`}
        className="absolute inset-0 h-full w-full"
        style={{ pointerEvents: 'none' }}
        aria-hidden="true"
      >
        {parts.map((p) => {
          const h = HOTSPOTS[p.id]
          if (!h) return null
          const isSelected = selectedId === p.id
          const isHovered = hoveredId === p.id
          return (
            <HotspotShape
              key={p.id}
              h={h}
              isSelected={isSelected}
              isHovered={isHovered}
              label={p.name.en}
              onSelect={() => onSelect(p.id)}
              onHover={(v) => onHover(v ? p.id : null)}
            />
          )
        })}
      </svg>
    </figure>
  )
}

function HotspotShape({
  h,
  isSelected,
  isHovered,
  label,
  onSelect,
  onHover,
}: {
  h: Hotspot
  isSelected: boolean
  isHovered: boolean
  label: string
  onSelect: () => void
  onHover: (v: boolean) => void
}) {
  const showRing = isSelected || isHovered
  const ringStroke = isSelected ? '#0d9488' : '#0f172a'
  const ringFill = isSelected ? 'rgba(13,148,136,0.18)' : 'rgba(15,23,42,0.06)'
  const labelBg = isSelected ? '#0d9488' : '#0f172a'

  return (
    <g
      onClick={onSelect}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      style={{ cursor: 'pointer', pointerEvents: 'auto' }}
      data-placenta-hotspot={label}
    >
      {h.type === 'circle' ? (
        <circle
          cx={h.x}
          cy={h.y}
          r={showRing ? h.r : Math.max(h.r - 4, 6)}
          fill={showRing ? ringFill : 'transparent'}
          stroke={showRing ? ringStroke : 'transparent'}
          strokeWidth={2}
        />
      ) : (
        <ellipse
          cx={h.x}
          cy={h.y}
          rx={showRing ? h.rx : Math.max(h.rx - 3, 10)}
          ry={showRing ? h.ry : Math.max(h.ry - 3, 10)}
          fill={showRing ? ringFill : 'transparent'}
          stroke={showRing ? ringStroke : 'transparent'}
          strokeWidth={2}
        />
      )}

      {(isSelected || isHovered) && (
        <g style={{ pointerEvents: 'none' }}>
          <LabelTag hotspot={h} label={label} labelBg={labelBg} />
        </g>
      )}
    </g>
  )
}

function LabelTag({
  hotspot,
  label,
  labelBg,
}: {
  hotspot: Hotspot
  label: string
  labelBg: string
}) {
  const top = hotspot.type === 'circle' ? hotspot.y - hotspot.r : hotspot.y - hotspot.ry
  return (
    <>
      <rect x={hotspot.x - 60} y={top - 28} width="120" height="22" rx="4" fill={labelBg} />
      <text x={hotspot.x} y={top - 13} textAnchor="middle" fontSize="11" fontWeight="600" fill="white">
        {label}
      </text>
    </>
  )
}
