import { useState, useMemo } from 'react'
import type { TemperatureControlExtra, AnatomyOrgan } from '@/content/types'
import { T } from '@/components/i18n/T'
import { TEMPERATURE_CONTROL } from '@/lib/lessonExtrasStrings'
import { assetUrl } from '@/lib/assetUrl'

/**
 * Temperature control. G8 Figure B9.17 — a section through human skin.
 *
 * The skin has four effector knobs: arterioles (vasodilation / constriction),
 * sweat glands, hair + erector muscles, and skeletal muscle (shivering).
 * The hypothalamus in the brain watches the temperature of the blood and
 * turns each knob up or down depending on which side of 37 °C the body is
 * on.
 *
 * Three modes:
 *   - hot:   arterioles dilate (more blood to the surface), sweat
 *            evaporates (latent heat lost), hairs lie flat (less insulation).
 *            No shivering.
 *   - cold:  arterioles constrict (less blood to the surface), no sweat,
 *            hairs pulled up (more trapped air), shivering produces heat
 *            in the muscles.
 *   - normal: all four at baseline.
 *
 * The base image (b9-17) is the same in all three modes — the four knobs
 * are visible in the figure and the side panel tells you which way each
 * one has been turned. For the "too cold" mode we *also* show G8 Figure
 * B9.18 (the cold-state diagram) as a secondary image, because it is the
 * one that visually shows the hairs up and the arterioles narrow.
 *
 * Coordinates: figure-b9-17 is 809 × 506 px.
 */
const IMG_W = 809
const IMG_H = 506

type Mode = 'hot' | 'normal' | 'cold'

type Hotspot = { type: 'circle'; x: number; y: number; r: number }
  | { type: 'ellipse'; x: number; y: number; rx: number; ry: number }

const HOTSPOTS: Record<string, Hotspot> = {
  // The sweat pore and sweat gland — the coiled tube on the right side of
  // the figure.
  'sweat-gland': { type: 'ellipse', x: 580, y: 380, rx: 35, ry: 80 },
  // The hair follicle + hair — the long black structure in the middle.
  'hair-follicle': { type: 'ellipse', x: 400, y: 280, rx: 30, ry: 200 },
  // The hair erector muscle — the small triangle of muscle attached to
  // the follicle.
  'erector-muscle': { type: 'ellipse', x: 360, y: 290, rx: 35, ry: 22 },
  // The arteriole — the small red vessel at the bottom of the dermis.
  arteriole: { type: 'ellipse', x: 380, y: 460, rx: 110, ry: 18 },
  // The blood capillary — the looped vessel above the arteriole.
  'blood-capillary': { type: 'ellipse', x: 220, y: 360, rx: 40, ry: 18 },
  // The temperature receptor — the small branching structure on the left.
  'temperature-receptor': { type: 'circle', x: 90, y: 220, r: 18 },
  // The dermis — the lower layer of the skin.
  dermis: { type: 'ellipse', x: 400, y: 350, rx: 380, ry: 130 },
  // The epidermis — the upper layer of the skin.
  epidermis: { type: 'ellipse', x: 400, y: 100, rx: 380, ry: 70 },
}

export function TemperatureControl({ extra }: { extra: TemperatureControlExtra }) {
  const [mode, setMode] = useState<Mode>('normal')
  const [selectedId, setSelectedId] = useState<string | null>('hypothalamus')
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const selected = useMemo(
    () => extra.parts.find((p) => p.id === selectedId) ?? null,
    [extra.parts, selectedId]
  )

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_300px]">
      <div>
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <ModeButton active={mode === 'hot'} onClick={() => setMode('hot')}>
            <T value={TEMPERATURE_CONTROL.modeHot} />
          </ModeButton>
          <ModeButton active={mode === 'normal'} onClick={() => setMode('normal')}>
            <T value={TEMPERATURE_CONTROL.modeNormal} />
          </ModeButton>
          <ModeButton active={mode === 'cold'} onClick={() => setMode('cold')}>
            <T value={TEMPERATURE_CONTROL.modeCold} />
          </ModeButton>
        </div>

        <p className="mb-2 text-xs text-muted">
          <T value={TEMPERATURE_CONTROL.intro} />
        </p>

        <FigureWithOverlay
          parts={extra.parts}
          mode={mode}
          selectedId={selectedId}
          hoveredId={hoveredId}
          onSelect={setSelectedId}
          onHover={setHoveredId}
        />

        {/* In cold mode, also show G8 Figure B9.18 — the textbook's own
            "body too cold" diagram, with the hairs up and the arterioles
            narrow. The two figures reinforce each other. */}
        {mode === 'cold' && (
          <figure className="mt-3 overflow-hidden rounded-lg border border-line bg-surface">
            <img
              src={assetUrl('/figures/g8/14-3-homeostasis/figure-b9-18.png')}
              alt="When the body is too cold: hairs stand up, arterioles in the skin constrict"
              className="block w-full"
              loading="lazy"
            />
            <figcaption className="border-t border-line bg-canvas px-3 py-1 text-[10px] text-muted">
              G8 Science · p.56, Figure B9.18 — the body's response to cold
            </figcaption>
          </figure>
        )}

        <MechanismList mode={mode} />
      </div>

      <aside className="rounded-lg border border-line bg-canvas p-3 text-sm">
        {selected ? (
          <PartPanel part={selected} mode={mode} />
        ) : (
          <p className="text-muted">
            <T value={TEMPERATURE_CONTROL.hypothalamus} />
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

function PartPanel({ part, mode }: { part: AnatomyOrgan; mode: Mode }) {
  // For the four "knob" organs, also surface what the knob is doing in
  // the current mode — that's the part the student is meant to learn.
  const mechanism = getMechanismForMode(part.id, mode)
  return (
    <div>
      <h3 className="mb-1 text-base font-semibold text-ink">
        <T value={part.name} />
      </h3>
      <p className="mb-2 leading-relaxed text-ink-soft">
        <T value={part.description} />
      </p>
      {mechanism && (
        <div className="mt-2 border-t border-line pt-2 text-xs">
          <p
            className={
              mode === 'hot'
                ? 'font-semibold text-rose-700'
                : mode === 'cold'
                  ? 'font-semibold text-sky-700'
                  : 'text-muted'
            }
          >
            {mechanism}
          </p>
        </div>
      )}
    </div>
  )
}

function getMechanismForMode(partId: string, mode: Mode): string | null {
  const map: Record<string, Record<Mode, string>> = {
    arteriole: {
      hot: 'Vasodilation — widens. More blood flows near the skin surface, so more heat is lost to the air.',
      cold: 'Vasoconstriction — narrows. Less blood flows near the skin surface, so less heat is lost.',
      normal: 'Mid-range. Blood flow to the surface is between the two extremes.',
    },
    'sweat-gland': {
      hot: 'Active. Sweat spreads on the skin and evaporates; the latent heat taken from the body is the main cooling mechanism.',
      cold: 'Inactive. No sweat on the skin means no evaporative cooling — important, because otherwise the body would keep losing heat.',
      normal: 'Quiet. A little sweat at rest, but not the cooling kind.',
    },
    'erector-muscle': {
      hot: 'Relaxed. Hairs lie flat, so they do not trap a layer of still air next to the skin.',
      cold: 'Contracted. Hairs stand on end, trapping a layer of still air (a good insulator) next to the skin. In humans this is "goose pimples"; in a furry animal it is a serious insulator.',
      normal: 'Mid-position. Some hairs up, some down.',
    },
    'blood-capillary': {
      hot: 'Dilated (vasodilation has reached this layer too). More blood close to the surface — more heat lost.',
      cold: 'Constricted. The arteriole feeding these capillaries narrows first; the capillary bed is supplied with much less blood.',
      normal: 'Normal flow.',
    },
  }
  return map[partId]?.[mode] ?? null
}

function MechanismList({ mode }: { mode: Mode }) {
  if (mode === 'normal') return null
  return (
    <div className="mt-3 rounded-md border border-line bg-canvas p-2 text-xs">
      <div className="mb-1 font-semibold uppercase tracking-wide text-muted">
        {mode === 'hot' ? 'What the body is doing to lose heat' : 'What the body is doing to keep heat in'}
      </div>
      <ul className="space-y-1 text-ink-soft">
        {mode === 'hot' ? (
          <>
            <li>· Arterioles in the skin dilate — more blood at the surface, more heat lost.</li>
            <li>· Sweat glands secrete sweat — evaporation takes latent heat from the body.</li>
            <li>· Erector muscles relax — hairs lie flat, less trapped air.</li>
            <li>· No shivering — muscles are not asked to do extra work.</li>
          </>
        ) : (
          <>
            <li>· Arterioles in the skin constrict — less blood at the surface, less heat lost.</li>
            <li>· Sweat glands are quiet — no evaporative cooling.</li>
            <li>· Erector muscles contract — hairs stand up, trapping insulating air.</li>
            <li>· Skeletal muscles shiver — respiration in muscle releases heat, warming the blood.</li>
          </>
        )}
      </ul>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Figure + hotspot overlay
// ---------------------------------------------------------------------------

function FigureWithOverlay({
  parts,
  mode,
  selectedId,
  hoveredId,
  onSelect,
  onHover,
}: {
  parts: AnatomyOrgan[]
  mode: Mode
  selectedId: string | null
  hoveredId: string | null
  onSelect: (id: string) => void
  onHover: (id: string | null) => void
}) {
  return (
    <figure className="relative m-0 overflow-hidden rounded-lg border border-line bg-canvas">
      <img
        src={assetUrl('/figures/g8/14-3-homeostasis/figure-b9-17.png')}
        alt="A section through human skin, showing the epidermis, dermis, hair follicle, sweat gland, and blood vessels"
        className="block w-full"
        draggable={false}
      />
      <figcaption className="border-t border-line bg-canvas px-3 py-1.5 text-[11px] text-muted">
        G8 Science · p.55, Figure B9.17 · click a part to read about it
      </figcaption>

      <svg
        viewBox={`0 0 ${IMG_W} ${IMG_H}`}
        className="absolute inset-0 h-full w-full"
        style={{ pointerEvents: 'none' }}
        aria-hidden="true"
      >
        {/* Mode wash — subtle red for hot, subtle blue for cold. Normal is
            unchanged. The base image already shows all the anatomical
            details, so the wash is just a mood cue, not a diagram layer. */}
        {mode === 'hot' && (
          <g style={{ pointerEvents: 'none' }} opacity="0.10">
            <rect x="0" y="0" width={IMG_W} height={IMG_H} fill="#dc2626" />
          </g>
        )}
        {mode === 'cold' && (
          <g style={{ pointerEvents: 'none' }} opacity="0.10">
            <rect x="0" y="0" width={IMG_W} height={IMG_H} fill="#2563eb" />
          </g>
        )}

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
      data-temp-hotspot={label}
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
