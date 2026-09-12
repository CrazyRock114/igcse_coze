import { Suspense, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import type { DnaHelix3DExtra } from '@/content/types'
import { T } from '@/components/i18n/T'
import { DNA_HELIX_3D, HEART_ANATOMY } from '@/lib/lessonExtrasStrings'

/**
 * A procedurally drawn 3D DNA double helix for Chapter 17 (Inheritance).
 * No GLB needed — every strand, rung, and base is a R3F primitive, so
 * the file ships at <20 KB and the lesson pays nothing in network cost
 * (vs the 1-2 MB each organ GLB pulls).
 *
 * The geometry is the textbook B-form DNA silhouette, simplified:
 *   - two helical sugar-phosphate backbones (TubeGeometry along
 *     parametric helix curves)
 *   - N base-pair rungs (cylinder + sphere endpoints)
 *   - base letters A, T, G, C rendered as floating 3D-text above each
 *     rung
 *   - each rung colour-coded by the pair (A-T red/blue, G-C green/yellow)
 *
 * Click any rung to read the base pair in the side panel; hover to
 * highlight; auto-rotate spins the whole helix slowly.
 *
 * "position3d" in the lesson data is in [0, 1] of the helix's bounding
 * box, the same convention as `AnatomyOrgan.position3d` — the
 * Edit-mode calibration flow would work the same way if we ever ship
 * it for procedural models.
 */
export const HELIX_RADIUS = 1
export const HELIX_HEIGHT = 4
export const TURNS = 1.6

// Colour palette. Each base pair is shown with two contrasting colours
// so the eye can read the helix as two strands, not as a stack of
// unrelated rungs.
export const DNA_PALETTE: Record<string, { a: string; b: string }> = {
  'A-T': { a: '#ef4444', b: '#1d4ed8' },
  'T-A': { a: '#1d4ed8', b: '#ef4444' },
  'G-C': { a: '#16a34a', b: '#f59e0b' },
  'C-G': { a: '#f59e0b', b: '#16a34a' },
}

type BasePair = { left: string; right: string }

/**
 * Deterministic 14-base-pair sequence chosen for a clear visual mix —
 * not random, so the demo is stable across reloads. Half A-T, half G-C.
 * Exported so the fullscreen AnatomyPage view can fall back to the same
 * default sequence when the lesson doesn't supply one.
 */
export const DNA_DEFAULT_SEQUENCE: BasePair[] = [
  { left: 'A', right: 'T' },
  { left: 'T', right: 'A' },
  { left: 'G', right: 'C' },
  { left: 'C', right: 'G' },
  { left: 'A', right: 'T' },
  { left: 'G', right: 'C' },
  { left: 'T', right: 'A' },
  { left: 'C', right: 'G' },
  { left: 'A', right: 'T' },
  { left: 'G', right: 'C' },
  { left: 'T', right: 'A' },
  { left: 'A', right: 'T' },
  { left: 'C', right: 'G' },
  { left: 'G', right: 'C' },
]

export function DnaHelix3D({ extra }: { extra: DnaHelix3DExtra }) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(
    extra.initialIndex ?? 0
  )
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const { subject, slug } = useParams<{ subject: string; slug: string }>()

  const sequence = extra.sequence ?? DNA_DEFAULT_SEQUENCE
  const selected = selectedIdx != null ? (sequence[selectedIdx] ?? null) : null
  const selectedPair = selected
    ? `${selected.left}-${selected.right}`
    : null
  const selectedColors = selectedPair ? (DNA_PALETTE[selectedPair] ?? null) : null

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
                <T value={DNA_HELIX_3D.loading} />
              </div>
            }
          >
            <Canvas
              camera={{ position: [0, 0.6, 6.5], fov: 38 }}
              dpr={[1, 1.5]}
              gl={{ antialias: true, alpha: true }}
              shadows={false}
              frameloop="always"
            >
              <hemisphereLight args={['#fff4e6', '#dbeafe', 0.7]} />
              <ambientLight intensity={1.0} />
              <directionalLight position={[3, 4, 2]} intensity={1.4} color="#fff4e6" />
              <directionalLight position={[-3, -1, -2]} intensity={0.7} color="#dbeafe" />
              <directionalLight position={[0, 2, -3]} intensity={0.6} />

              <HelixScene
                sequence={sequence}
                selectedIdx={selectedIdx}
                hoveredIdx={hoveredIdx}
                onSelect={setSelectedIdx}
                onHover={setHoveredIdx}
                autoRotate={extra.autoRotate ?? true}
              />

              <OrbitControls
                enableDamping
                dampingFactor={0.08}
                minDistance={3}
                maxDistance={14}
                target={[0, 0, 0]}
                makeDefault
              />
            </Canvas>
          </Suspense>

          <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-canvas/85 px-3 py-1 text-[11px] text-ink-soft shadow-sm backdrop-blur">
            <T value={DNA_HELIX_3D.dragHint} />
          </div>

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
          selectedIdx={selectedIdx}
          sequence={sequence}
          selected={selected}
          pair={selectedPair}
          colors={selectedColors}
          baseDescriptions={extra.baseDescriptions}
        />
      </div>
    </article>
  )
}

// ---------------------------------------------------------------------------
// Internal: the helix scene
// ---------------------------------------------------------------------------

/** Public scene component, exported so the AnatomyPage fullscreen view
 *  can render the same helix at full viewport without duplicating the
 *  geometry / materials / state plumbing. */
export type HelixSceneProps = {
  sequence: BasePair[]
  selectedIdx: number | null
  hoveredIdx: number | null
  onSelect: (i: number) => void
  onHover: (i: number | null) => void
  autoRotate: boolean
}

export function HelixScene({
  sequence,
  selectedIdx,
  hoveredIdx,
  onSelect,
  onHover,
  autoRotate,
}: HelixSceneProps) {
  const groupRef = useFrameRef<THREE.Group>()

  useFrame((_, dt) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += dt * 0.4
    }
  })

  return (
    <group ref={groupRef}>
      {sequence.map((pair, i) => {
        const t = sequence.length === 1 ? 0.5 : i / (sequence.length - 1)
        const angle = t * Math.PI * 2 * TURNS
        // Vertical position centred on the origin: [-HELIX_HEIGHT/2, +HELIX_HEIGHT/2]
        const y = -HELIX_HEIGHT / 2 + t * HELIX_HEIGHT
        const cosA = Math.cos(angle)
        const sinA = Math.sin(angle)
        // Strand A
        const ax = cosA * HELIX_RADIUS
        const az = sinA * HELIX_RADIUS
        // Strand B is 180° opposite
        const bx = -ax
        const bz = -az
        const isSelected = selectedIdx === i
        const isHovered = hoveredIdx === i
        const pairKey = `${pair.left}-${pair.right}`
        const colors = DNA_PALETTE[pairKey] ?? DNA_PALETTE['A-T']!

        return (
          <BasePairRung
            key={i}
            ax={ax}
            ay={y}
            az={az}
            bx={bx}
            by={y}
            bz={bz}
            left={pair.left}
            right={pair.right}
            leftColor={colors.a}
            rightColor={colors.b}
            isSelected={isSelected}
            isHovered={isHovered}
            onSelect={() => onSelect(i)}
            onHover={(h) => onHover(h ? i : null)}
          />
        )
      })}

      <BackboneStrands turns={TURNS} />
    </group>
  )
}

/**
 * Wraps a useRef for a three.js Object3D in a useFrame loop. Lives in a
 * separate hook so the scene body stays readable.
 */
import { useRef } from 'react'
function useFrameRef<T extends THREE.Object3D>() {
  return useRef<T>(null)
}

function BackboneStrands({ turns }: { turns: number }) {
  const { lineA, lineB } = useMemo(() => {
    const samples = 200
    const a: number[] = []
    const b: number[] = []
    for (let i = 0; i <= samples; i++) {
      const t = i / samples
      const angle = t * Math.PI * 2 * turns
      const x = Math.cos(angle) * HELIX_RADIUS
      const z = Math.sin(angle) * HELIX_RADIUS
      const y = -HELIX_HEIGHT / 2 + t * HELIX_HEIGHT
      a.push(x, y, z)
      b.push(-x, y, -z)
    }
    return { lineA: a, lineB: b }
  }, [turns])
  return (
    <>
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array(lineA), 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#475569" linewidth={3} />
      </line>
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array(lineB), 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#475569" linewidth={3} />
      </line>
    </>
  )
}

function BasePairRung({
  ax,
  ay,
  az,
  bx,
  by,
  bz,
  left,
  right,
  leftColor,
  rightColor,
  isSelected,
  isHovered,
  onSelect,
  onHover,
}: {
  ax: number
  ay: number
  az: number
  bx: number
  by: number
  bz: number
  left: string
  right: string
  leftColor: string
  rightColor: string
  isSelected: boolean
  isHovered: boolean
  onSelect: () => void
  onHover: (hover: boolean) => void
}) {
  // Cylinder connecting strand A and strand B. Default cylinder is along Y,
  // so we compute the midpoint and align the cylinder to the AB axis.
  const midX = (ax + bx) / 2
  const midY = (ay + by) / 2
  const midZ = (az + bz) / 2
  const dx = bx - ax
  const dy = by - ay
  const dz = bz - az
  const length = Math.hypot(dx, dy, dz) || 1
  const orientation = useMemo(() => {
    const up = new THREE.Vector3(0, 1, 0)
    const dir = new THREE.Vector3(dx, dy, dz).normalize()
    const quat = new THREE.Quaternion().setFromUnitVectors(up, dir)
    const euler = new THREE.Euler().setFromQuaternion(quat)
    return euler
  }, [dx, dy, dz])

  const ringSize = isSelected ? 22 : isHovered ? 18 : 12
  const ringColor = isSelected
    ? '#0d9488'
    : isHovered
      ? '#0f172a'
      : '#0f172acc'

  return (
    <group position={[0, 0, 0]}>
      {/* The rung */}
      <mesh
        position={[midX, midY, midZ]}
        rotation={orientation}
        onClick={(e) => {
          e.stopPropagation()
          onSelect()
        }}
        onPointerOver={(e) => {
          e.stopPropagation()
          onHover(true)
        }}
        onPointerOut={() => onHover(false)}
      >
        <cylinderGeometry args={[0.07, 0.07, length, 12]} />
        <meshStandardMaterial color={isSelected ? '#0d9488' : '#94a3b8'} />
      </mesh>

      {/* Endpoint atoms */}
      <mesh position={[ax, ay, az]}>
        <sphereGeometry args={[0.18, 18, 18]} />
        <meshStandardMaterial color={leftColor} />
      </mesh>
      <mesh position={[bx, by, bz]}>
        <sphereGeometry args={[0.18, 18, 18]} />
        <meshStandardMaterial color={rightColor} />
      </mesh>

      {/* Clickable hotspot HTML — small dot, visible always */}
      <Html
        position={[midX, midY, midZ]}
        center
        distanceFactor={6}
        style={{ pointerEvents: 'none' }}
      >
        <div
          className="rounded-full border-2 border-white shadow-md transition-transform"
          style={{
            width: ringSize,
            height: ringSize,
            background: ringColor,
          }}
          aria-hidden="true"
        />
      </Html>

      {/* Base letter labels — always visible, slightly above the rung */}
      <Html
        position={[ax, ay + 0.35, az]}
        center
        distanceFactor={5}
        style={{ pointerEvents: 'none' }}
      >
        <div
          className="select-none text-sm font-bold"
          style={{ color: leftColor, textShadow: '0 1px 2px rgba(0,0,0,0.4)' }}
        >
          {left}
        </div>
      </Html>
      <Html
        position={[bx, by + 0.35, bz]}
        center
        distanceFactor={5}
        style={{ pointerEvents: 'none' }}
      >
        <div
          className="select-none text-sm font-bold"
          style={{ color: rightColor, textShadow: '0 1px 2px rgba(0,0,0,0.4)' }}
        >
          {right}
        </div>
      </Html>
    </group>
  )
}

// ---------------------------------------------------------------------------
// Side panel
// ---------------------------------------------------------------------------

function SidePanel({
  selectedIdx,
  sequence,
  selected,
  pair,
  colors,
  baseDescriptions,
}: {
  selectedIdx: number | null
  sequence: BasePair[]
  selected: BasePair | null
  pair: string | null
  colors: { a: string; b: string } | null
  baseDescriptions?: DnaHelix3DExtra['baseDescriptions']
}) {
  if (selectedIdx == null || !selected) {
    return (
      <aside className="rounded-lg border border-line bg-surface p-4">
        <p className="text-sm text-muted">{DNA_HELIX_3D.tapRungHint.en}</p>
      </aside>
    )
  }
  const desc = baseDescriptions?.[pair ?? '']
  return (
    <aside className="rounded-lg border border-line bg-surface p-4">
      <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted">
        <T value={DNA_HELIX_3D.pairLabel} />
        {' · '}
        <span className="text-muted-foreground">#{selectedIdx + 1}</span>
      </div>
      <div className="mb-3 flex items-baseline gap-2 text-sm font-medium text-ink">
        {colors ? (
          <>
            <span style={{ color: colors.a }}>{selected.left}</span>
            <span className="text-muted">—</span>
            <span style={{ color: colors.b }}>{selected.right}</span>
          </>
        ) : (
          <span>{pair}</span>
        )}
      </div>
      {desc ? (
        <>
          <h3 className="mb-1 text-sm font-semibold text-ink">
            <T value={desc.name} />
          </h3>
          <p className="text-sm text-ink-soft">
            <T value={desc.description} />
          </p>
        </>
      ) : (
        <p className="text-sm text-ink-soft">
          <T value={DNA_HELIX_3D.pairDefault} />
        </p>
      )}
      <p className="mt-3 text-xs text-muted">
        <T value={DNA_HELIX_3D.positionLabel} />
        {' '}
        {selectedIdx + 1} / {sequence.length}
      </p>
    </aside>
  )
}
