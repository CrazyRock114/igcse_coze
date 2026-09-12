import { useEffect, useMemo, useState } from 'react'
import type { EyeAnatomyExtra, AnatomyOrgan } from '@/content/types'
import { T } from '@/components/i18n/T'
import { EYE_ANATOMY } from '@/lib/lessonExtrasStrings'
import { assetUrl } from '@/lib/assetUrl'

/**
 * The human eye in section. G8 Figure B9.06 — the same labelled diagram
 * every IGCSE student has to label in the exam.
 *
 * Same pattern as `AirwayPathway` and `ReflexArc`: base image with an SVG
 * overlay of clickable hotspots, side panel describing the selected part,
 * and a "follow the light" mode that animates a dot along the optical path
 * from cornea to optic nerve.
 *
 * Three modes:
 *   - "explore" — click any of the 12 hotspots in the figure to read about it
 *   - "follow"  — auto-walk a dot along the optical path
 *   - "protect" — read about the four protection structures (orbit,
 *                conjunctiva, tear gland, eyelids). These are NOT in
 *                Figure B9.06, so the figure stays put and the side
 *                panel turns into a list.
 *
 * The 12 hotspots are: cornea, aqueous humour, iris, pupil, lens, ciliary
 * muscle, suspensory ligament, vitreous humour, retina, fovea, blind spot,
 * optic nerve. The sclera and choroid are intentionally left out — the
 * G8 syllabus note in Section B9.03 says they are "for interest" only and
 * don't need to be labelled.
 *
 * Coordinates: figure-b9-06 is 809 × 476 px. Overlay SVG uses the same
 * viewBox so hotspot positions are in image-pixel space and scale with
 * the figure.
 */
const IMG_W = 809
const IMG_H = 476

/**
 * The four protection parts from G8 B9.03 that are outside Figure B9.06
 * (a section through the eye). They are listed in the "protect" mode of
 * the side panel, since there is nowhere in the section image to click
 * for "the orbit" or "the eyelid".
 */
const PROTECTION_IDS = ['orbit', 'conjunctiva', 'tear-gland', 'eyelids'] as const

type Hotspot = { type: 'circle'; x: number; y: number; r: number }
  | { type: 'ellipse'; x: number; y: number; rx: number; ry: number }

const HOTSPOTS: Record<string, Hotspot> = {
  // The cornea is the transparent front curve of the eye.
  cornea: { type: 'ellipse', x: 145, y: 220, rx: 22, ry: 50 },
  // Aqueous humour fills the small chamber between the cornea and the lens.
  'aqueous-humour': { type: 'ellipse', x: 185, y: 235, rx: 18, ry: 35 },
  // The iris is the coloured ring around the pupil.
  iris: { type: 'ellipse', x: 200, y: 245, rx: 25, ry: 45 },
  // The pupil is the hole at the centre of the iris.
  pupil: { type: 'circle', x: 210, y: 250, r: 10 },
  // The lens is the biconvex structure just behind the pupil.
  lens: { type: 'ellipse', x: 240, y: 250, rx: 22, ry: 50 },
  // The ciliary muscle wraps around the lens and is attached to the
  // suspensory ligaments.
  'ciliary-muscle': { type: 'ellipse', x: 230, y: 340, rx: 60, ry: 30 },
  // Suspensory ligaments run from the ciliary muscle to the edge of the lens.
  'suspensory-ligament': { type: 'ellipse', x: 270, y: 310, rx: 50, ry: 40 },
  // Vitreous humour fills the large main chamber between the lens and the
  // retina.
  'vitreous-humour': { type: 'ellipse', x: 480, y: 240, rx: 220, ry: 110 },
  // The retina is the lining at the back of the eye.
  retina: { type: 'ellipse', x: 680, y: 240, rx: 50, ry: 130 },
  // The fovea is a small spot on the retina where cones are most concentrated.
  fovea: { type: 'circle', x: 680, y: 235, r: 10 },
  // The blind spot is where the optic nerve leaves the eye — no receptor cells.
  'blind-spot': { type: 'circle', x: 710, y: 250, r: 14 },
  // The optic nerve carries impulses from the retina to the brain.
  'optic-nerve': { type: 'ellipse', x: 760, y: 270, rx: 50, ry: 30 },
}

export function EyeAnatomy({ extra }: { extra: EyeAnatomyExtra }) {
  const parts = extra.parts
  const [selectedId, setSelectedId] = useState<string | null>(extra.initialPart ?? null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [mode, setMode] = useState<'explore' | 'follow' | 'protect'>('explore')
  const [followStep, setFollowStep] = useState(0)

  const orderedForFollow = useMemo(
    () => parts.filter((p) => typeof p.stop === 'number').sort((a, b) => a.stop! - b.stop!),
    [parts]
  )

  // The four protection structures from G8 B9.03 (orbit, conjunctiva,
  // tear gland, eyelids). They live in `parts` too, but they have no
  // figure hotspot — they are listed in the side panel when the user
  // switches to "protect" mode. Computed from the parts data so the
  // component does not own the content.
  const protectionParts = useMemo(
    () => PROTECTION_IDS.flatMap((id) => {
      const p = parts.find((x) => x.id === id)
      return p ? [p] : []
    }),
    [parts]
  )

  const selected = useMemo(
    () => parts.find((p) => p.id === selectedId) ?? null,
    [parts, selectedId]
  )

  useEffect(() => {
    if (mode !== 'follow') return
    if (orderedForFollow.length === 0) return
    const id = setInterval(() => {
      setFollowStep((s) => {
        const next = s + 1
        if (next >= orderedForFollow.length) {
          setTimeout(() => {
            setMode('explore')
            setSelectedId(null)
          }, 2500)
          return s
        }
        setSelectedId(orderedForFollow[next]?.id ?? null)
        return next
      })
    }, 1800)
    return () => clearInterval(id)
  }, [mode, orderedForFollow])

  const startFollow = () => {
    setFollowStep(0)
    setSelectedId(orderedForFollow[0]?.id ?? null)
    setMode('follow')
  }
  const startProtect = () => {
    setSelectedId(protectionParts[0]?.id ?? null)
    setMode('protect')
  }
  const stopFollow = () => {
    setMode('explore')
    setSelectedId(null)
  }
  const stopProtect = () => {
    setMode('explore')
    setSelectedId(null)
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_300px]">
      <div>
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <ModeButton active={mode === 'explore'} onClick={stopFollow}>
            <T value={EYE_ANATOMY.modeExplore} />
          </ModeButton>
          <ModeButton active={mode === 'follow'} onClick={startFollow}>
            <T value={EYE_ANATOMY.modeFollow} />
          </ModeButton>
          <ModeButton active={mode === 'protect'} onClick={mode === 'protect' ? stopProtect : startProtect}>
            <T value={EYE_ANATOMY.modeProtect} />
          </ModeButton>
          {mode === 'follow' && (
            <span className="text-xs text-muted">
              <T value={EYE_ANATOMY.followPrompt} />
            </span>
          )}
          {mode === 'protect' && (
            <span className="text-xs text-muted">
              <T value={EYE_ANATOMY.protectPrompt} />
            </span>
          )}
        </div>

        <FigureWithHotspots
          parts={parts}
          selectedId={mode === 'protect' ? null : selectedId}
          hoveredId={mode === 'protect' ? null : hoveredId}
          onSelect={(id) => {
            setMode('explore')
            setSelectedId(id)
          }}
          onHover={setHoveredId}
          followStep={followStep}
          orderedForFollow={orderedForFollow}
        />
      </div>

      <aside className="rounded-lg border border-line bg-canvas p-3 text-sm">
        {mode === 'protect' ? (
          <ProtectPanel
            parts={protectionParts}
            selectedId={selectedId}
            onSelect={(id) => setSelectedId(id)}
          />
        ) : selected ? (
          <PartPanel part={selected} />
        ) : (
          <p className="text-muted">
            <T value={EYE_ANATOMY.empty} />
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

/**
 * The "protect" side panel. A clickable list of the four protection
 * structures (orbit, conjunctiva, tear gland, eyelids), with the
 * selected one showing its description. Used in place of the
 * figure-driven part panel because these structures are outside
 * Figure B9.06.
 */
function ProtectPanel({
  parts,
  selectedId,
  onSelect,
}: {
  parts: AnatomyOrgan[]
  selectedId: string | null
  onSelect: (id: string) => void
}) {
  const selected = parts.find((p) => p.id === selectedId) ?? parts[0] ?? null
  if (!selected) {
    return (
      <p className="text-muted">
        <T value={EYE_ANATOMY.protectEmpty} />
      </p>
    )
  }
  return (
    <div>
      <ul className="mb-3 flex flex-wrap gap-1.5">
        {parts.map((p) => {
          const isActive = p.id === selected.id
          return (
            <li key={p.id}>
              <button
                type="button"
                onClick={() => onSelect(p.id)}
                className={
                  'rounded-md px-2 py-1 text-xs font-medium transition-colors ' +
                  (isActive
                    ? 'bg-ink text-white'
                    : 'border border-line bg-surface text-muted hover:bg-canvas hover:text-ink-soft')
                }
              >
                <T value={p.name} />
              </button>
            </li>
          )
        })}
      </ul>
      <h3 className="mb-1 text-base font-semibold text-ink">
        <T value={selected.name} />
      </h3>
      <p className="leading-relaxed text-ink-soft">
        <T value={selected.description} />
      </p>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Figure + hotspot overlay
// ---------------------------------------------------------------------------

function FigureWithHotspots({
  parts,
  selectedId,
  hoveredId,
  onSelect,
  onHover,
  followStep,
  orderedForFollow,
}: {
  parts: AnatomyOrgan[]
  selectedId: string | null
  hoveredId: string | null
  onSelect: (id: string) => void
  onHover: (id: string | null) => void
  followStep: number
  orderedForFollow: AnatomyOrgan[]
}) {
  const followTarget = orderedForFollow[Math.min(followStep, Math.max(0, orderedForFollow.length - 1))]
  const followHotspot = followTarget ? HOTSPOTS[followTarget.id] : null

  return (
    <figure className="relative m-0 overflow-hidden rounded-lg border border-line bg-canvas">
      <img
        src={assetUrl('/figures/g8/14-1-nervous-system/figure-b9-06.png')}
        alt="A section through a human eye, showing the cornea, iris, pupil, lens, retina and other parts"
        className="block w-full"
        draggable={false}
      />
      <figcaption className="border-t border-line bg-canvas px-3 py-1.5 text-[11px] text-muted">
        G8 Science · p.52, Figure B9.06 · click a part to read about it
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

        {followHotspot && <FollowDot hotspot={followHotspot} />}
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
      data-eye-hotspot={label}
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

function FollowDot({ hotspot }: { hotspot: Hotspot }) {
  return (
    <g style={{ pointerEvents: 'none' }}>
      <circle cx={hotspot.x} cy={hotspot.y} r="11" fill="#fbbf24" stroke="#92400e" strokeWidth="2">
        <animate attributeName="r" values="11;15;11" dur="1.4s" repeatCount="indefinite" />
      </circle>
      <circle cx={hotspot.x} cy={hotspot.y} r="4" fill="white" />
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
