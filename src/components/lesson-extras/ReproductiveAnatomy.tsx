import { useState } from 'react'
import type { ReproductiveAnatomyExtra, AnatomyOrgan, Bilingual } from '@/content/types'
import { T } from '@/components/i18n/T'
import { REPRODUCTIVE_ANATOMY } from '@/lib/lessonExtrasStrings'
import { assetUrl } from '@/lib/assetUrl'

/**
 * The male and female human reproductive systems, in two tabs.
 *
 * Each tab is a small standalone hotspot viewer (the same pattern as
 * `ReflexArc`, but with its own figure and its own coordinate space).
 * The two figures cannot share coordinates — the layouts are different
 * and the labelled parts are on different sides of the body — so each
 * tab keeps its own `HOTSPOTS` map.
 *
 * - Female: G8 Figure B11.01 (front view, uterus in the centre, ovaries
 *   to either side). Image is 809 × 953 px.
 * - Male: G8 Figure B11.03 (front view, testes below, bladder above).
 *   Image is 809 × 889 px.
 *
 * Hotspot positions are in image-pixel space against the viewBox, so
 * they scale with the figure. Initial positions were estimated by eye;
 * expect the same multi-round nudge that the other organs got.
 */

const IMG_FEMALE_W = 809
const IMG_FEMALE_H = 953
const IMG_MALE_W = 809
const IMG_MALE_H = 889

type Hotspot = { type: 'circle'; x: number; y: number; r: number }
  | { type: 'ellipse'; x: number; y: number; rx: number; ry: number }

// Female (G8 B11.01) — the labels in the figure are: oviduct/Fallopian
// tube (top-left + top-right), ovary (right), uterus wall, uterus lining
// (endometrium), cervix, vagina. The body silhouette is in the bottom
// left corner.
const FEMALE_HOTSPOTS: Record<string, Hotspot> = {
  'oviduct-fallopian-tube': { type: 'ellipse', x: 170, y: 160, rx: 80, ry: 30 },
  ovary: { type: 'ellipse', x: 660, y: 200, rx: 50, ry: 30 },
  'uterus-wall': { type: 'ellipse', x: 405, y: 320, rx: 80, ry: 30 },
  'uterus-lining-endometrium': { type: 'ellipse', x: 405, y: 410, rx: 70, ry: 50 },
  cervix: { type: 'ellipse', x: 405, y: 580, rx: 35, ry: 25 },
  vagina: { type: 'ellipse', x: 405, y: 750, rx: 50, ry: 80 },
}

// Male (G8 B11.03) — labels: bladder, urethra, prostate gland, sperm
// duct, epididymis, testis, scrotum, penis, erectile tissue.
const MALE_HOTSPOTS: Record<string, Hotspot> = {
  bladder: { type: 'ellipse', x: 405, y: 130, rx: 80, ry: 60 },
  urethra: { type: 'ellipse', x: 405, y: 290, rx: 12, ry: 130 },
  'prostate-gland': { type: 'ellipse', x: 405, y: 270, rx: 60, ry: 30 },
  'sperm-duct': { type: 'ellipse', x: 270, y: 200, rx: 130, ry: 25 },
  epididymis: { type: 'ellipse', x: 200, y: 480, rx: 25, ry: 110 },
  testis: { type: 'ellipse', x: 220, y: 540, rx: 50, ry: 80 },
  scrotum: { type: 'ellipse', x: 220, y: 650, rx: 70, ry: 60 },
  penis: { type: 'ellipse', x: 405, y: 620, rx: 60, ry: 100 },
  'erectile-tissue': { type: 'ellipse', x: 405, y: 480, rx: 35, ry: 80 },
}

export function ReproductiveAnatomy({ extra }: { extra: ReproductiveAnatomyExtra }) {
  const [tab, setTab] = useState<'female' | 'male'>(extra.initialTab ?? 'female')
  const [selectedId, setSelectedId] = useState<string | null>(extra.initialPart ?? null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const isFemale = tab === 'female'
  const group = isFemale ? extra.female : extra.male
  const imgW = isFemale ? IMG_FEMALE_W : IMG_MALE_W
  const imgH = isFemale ? IMG_FEMALE_H : IMG_MALE_H
  const hotspots = isFemale ? FEMALE_HOTSPOTS : MALE_HOTSPOTS
  const selected = group.parts.find((p) => p.id === selectedId) ?? null

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_300px]">
      <div>
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <ModeButton active={isFemale} onClick={() => { setTab('female'); setSelectedId(null) }}>
            <T value={REPRODUCTIVE_ANATOMY.tabFemale} />
          </ModeButton>
          <ModeButton active={!isFemale} onClick={() => { setTab('male'); setSelectedId(null) }}>
            <T value={REPRODUCTIVE_ANATOMY.tabMale} />
          </ModeButton>
        </div>

        <FigureWithHotspots
          image={assetUrl(group.image)}
          imageSource={group.imageSource}
          parts={group.parts}
          hotspots={hotspots}
          imgW={imgW}
          imgH={imgH}
          selectedId={selectedId}
          hoveredId={hoveredId}
          onSelect={setSelectedId}
          onHover={setHoveredId}
        />
      </div>

      <aside className="rounded-lg border border-line bg-canvas p-3 text-sm">
        {selected ? (
          <PartPanel part={selected} />
        ) : (
          <p className="text-muted">
            <T value={isFemale ? REPRODUCTIVE_ANATOMY.emptyFemale : REPRODUCTIVE_ANATOMY.emptyMale} />
          </p>
        )}
      </aside>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function ModeButton({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        'rounded-md px-2.5 py-1 text-xs font-medium transition-colors ' +
        (active
          ? 'bg-ink text-white'
          : 'border border-line bg-surface text-muted hover:bg-canvas hover:text-ink-soft')
      }
    >
      {children}
    </button>
  )
}

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

// ---------------------------------------------------------------------------
// Figure + hotspot overlay
// ---------------------------------------------------------------------------

function FigureWithHotspots({
  image,
  imageSource,
  parts,
  hotspots,
  imgW,
  imgH,
  selectedId,
  hoveredId,
  onSelect,
  onHover,
}: {
  image: string
  imageSource: Bilingual
  parts: AnatomyOrgan[]
  hotspots: Record<string, Hotspot>
  imgW: number
  imgH: number
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
        viewBox={`0 0 ${imgW} ${imgH}`}
        className="absolute inset-0 h-full w-full"
        style={{ pointerEvents: 'none' }}
        aria-hidden="true"
      >
        {parts.map((p) => {
          const h = hotspots[p.id]
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
      data-repro-hotspot={label}
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
