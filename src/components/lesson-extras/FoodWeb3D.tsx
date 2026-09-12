import { Suspense, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html, Line, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import type { FoodWeb3DExtra, FoodWebNode } from '@/content/types'
import { T } from '@/components/i18n/T'
import { FOOD_WEB_3D, HEART_ANATOMY } from '@/lib/lessonExtrasStrings'

/**
 * A 3D, R3F-procedural rendering of a food web for Chapter 19 (Ecosystems).
 * The 2D `FoodWeb` diagram above already lays the network out flat; this
 * view stacks the same species by trophic level on the Y axis and
 * auto-rotates so the student sees both the producer floor and the
 * tertiary-customer ceiling at once.
 *
 * Each node is a small sphere coloured by trophic level. Edges are
 * straight lines from prey to predator. Click a node to read the
 * species' description in the side panel; the focused node's incident
 * edges (what it eats + what eats it) glow.
 *
 * Same data shape as the 2D `FoodWeb` extra (we share the
 * FoodWebNode / FoodWebEdge types), so the lesson file can keep one
 * source of truth and just reference the same list of species.
 *
 * No GLB, no network cost — the component ships at <12 KB.
 */

// Trophic-level colour palette. Same convention as the 2D `FoodWeb`
// component so a student looking at the 2D and 3D versions side by
// side sees the same level in the same colour.
export const TROPHIC_COLOR: Record<FoodWebNode['trophic'], string> = {
  producer: '#86efac',
  primary: '#60a5fa',
  secondary: '#fbbf24',
  tertiary: '#f87171',
}

// Trophic-level Y position. Producer at the bottom (-3), tertiary at
// the top (+3). Tighter than that and the spheres overlap.
export const TROPHIC_Y: Record<FoodWebNode['trophic'], number> = {
  producer: -3,
  primary: -1,
  secondary: 1,
  tertiary: 3,
}

export const NODE_RADIUS = 0.32

// Pseudo-random but deterministic layout: a 32-bit integer hash mixed
// from the species id gives each node a stable (x, z) position so the
// scene is identical on every reload.
export function stablePosition(id: string, slot: number): { x: number; z: number } {
  let h = 2166136261
  for (let i = 0; i < id.length; i++) {
    h ^= id.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  h ^= slot * 2654435761
  const a = ((h >>> 0) % 1000) / 1000
  h = Math.imul(h ^ (h >>> 13), 1597334677)
  const b = ((h >>> 0) % 1000) / 1000
  // Spread the nodes inside a circle of radius 3.5 around the origin
  const r = 1.0 + a * 2.5
  const angle = b * Math.PI * 2
  return { x: Math.cos(angle) * r, z: Math.sin(angle) * r }
}

export function FoodWeb3D({ extra }: { extra: FoodWeb3DExtra }) {
  const [selectedId, setSelectedId] = useState<string | null>(
    extra.initialSelected ?? extra.nodes[0]?.id ?? null
  )
  const { subject, slug } = useParams<{ subject: string; slug: string }>()

  const positions = useMemo(() => {
    const map: Record<string, THREE.Vector3> = {}
    extra.nodes.forEach((node, i) => {
      const { x, z } = stablePosition(node.id, i)
      map[node.id] = new THREE.Vector3(x, TROPHIC_Y[node.trophic], z)
    })
    return map
  }, [extra.nodes])

  const selected = extra.nodes.find((n) => n.id === selectedId) ?? null
  const connectedIds = useMemo(() => {
    if (!selectedId) return new Set<string>()
    const out = new Set<string>([selectedId])
    extra.edges.forEach((edge) => {
      if (edge.from === selectedId) out.add(edge.to)
      if (edge.to === selectedId) out.add(edge.from)
    })
    return out
  }, [extra.edges, selectedId])

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
              <div className="flex h-[460px] items-center justify-center text-sm text-muted">
                <T value={FOOD_WEB_3D.loading} />
              </div>
            }
          >
            <Canvas
              camera={{ position: [0, 2.5, 9], fov: 42 }}
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

              <WebScene
                nodes={extra.nodes}
                edges={extra.edges}
                positions={positions}
                selectedId={selectedId}
                connectedIds={connectedIds}
                onSelect={setSelectedId}
                autoRotate={extra.autoRotate ?? true}
              />

              {/* Faint trophic-level guide planes — give the eye the
                  "floor" and "ceilings" without overpowering the nodes. */}
              {(['producer', 'primary', 'secondary', 'tertiary'] as const).map(
                (level) => (
                  <mesh
                    key={level}
                    position={[0, TROPHIC_Y[level] - 0.55, 0]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  >
                    <ringGeometry args={[3.6, 3.7, 64]} />
                    <meshBasicMaterial color={TROPHIC_COLOR[level]} transparent opacity={0.18} />
                  </mesh>
                )
              )}

              <OrbitControls
                enableDamping
                dampingFactor={0.08}
                minDistance={4}
                maxDistance={20}
                target={[0, 0, 0]}
                makeDefault
              />
            </Canvas>
          </Suspense>

          <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-canvas/85 px-3 py-1 text-[11px] text-ink-soft shadow-sm backdrop-blur">
            <T value={FOOD_WEB_3D.dragHint} />
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

        <SidePanel selected={selected} />
      </div>
    </article>
  )
}

// ---------------------------------------------------------------------------
// Scene
// ---------------------------------------------------------------------------

/** Public scene component, exported so the AnatomyPage fullscreen view
 *  can render the same web at full viewport without duplicating the
 *  geometry / state plumbing. */
export type WebSceneProps = {
  nodes: FoodWebNode[]
  edges: { from: string; to: string }[]
  positions: Record<string, THREE.Vector3>
  selectedId: string | null
  connectedIds: Set<string>
  onSelect: (id: string) => void
  autoRotate: boolean
}

export function WebScene({
  nodes,
  edges,
  positions,
  selectedId,
  connectedIds,
  onSelect,
  autoRotate,
}: WebSceneProps) {
  const groupRef = useFrameRef<THREE.Group>()

  useFrame((_, dt) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += dt * 0.3
    }
  })

  return (
    <group ref={groupRef}>
      {edges.map((edge, i) => {
        const from = positions[edge.from]
        const to = positions[edge.to]
        if (!from || !to) return null
        // Highlight edges that touch the selected node
        const isHot =
          selectedId != null &&
          (edge.from === selectedId || edge.to === selectedId)
        const dim = selectedId != null && !isHot
        return (
          <Line
            key={i}
            points={[from.toArray(), to.toArray()]}
            color={isHot ? '#0d9488' : '#94a3b8'}
            lineWidth={isHot ? 2.5 : 1.4}
            transparent
            opacity={dim ? 0.18 : 0.85}
          />
        )
      })}

      {nodes.map((node) => {
        const pos = positions[node.id]
        if (!pos) return null
        const isSelected = selectedId === node.id
        const isConnected = connectedIds.has(node.id)
        const dim = selectedId != null && !isConnected
        return (
          <group key={node.id} position={pos.toArray()}>
            <mesh
              onClick={(e) => {
                e.stopPropagation()
                onSelect(node.id)
              }}
              onPointerOver={(e) => {
                e.stopPropagation()
                document.body.style.cursor = 'pointer'
              }}
              onPointerOut={() => {
                document.body.style.cursor = ''
              }}
            >
              <sphereGeometry
                args={[isSelected ? NODE_RADIUS * 1.3 : NODE_RADIUS, 24, 24]}
              />
              <meshStandardMaterial
                color={TROPHIC_COLOR[node.trophic]}
                emissive={isSelected ? TROPHIC_COLOR[node.trophic] : '#000000'}
                emissiveIntensity={isSelected ? 0.4 : 0}
                transparent
                opacity={dim ? 0.35 : 1}
                roughness={0.45}
                metalness={0.1}
              />
            </mesh>

            {/* Floating short label above each node. Html
                distanceFactor keeps the label roughly the same
                pixel size regardless of zoom. */}
            <Html
              position={[0, NODE_RADIUS + 0.4, 0]}
              center
              distanceFactor={6}
              style={{ pointerEvents: 'none' }}
            >
              <div
                className="select-none whitespace-nowrap rounded-md bg-canvas/85 px-2 py-0.5 text-[11px] font-semibold shadow-sm backdrop-blur"
                style={{ color: isSelected ? '#0d9488' : '#0f172a' }}
              >
                {node.shortLabel}
              </div>
            </Html>
          </group>
        )
      })}
    </group>
  )
}

import { useRef } from 'react'
function useFrameRef<T extends THREE.Object3D>() {
  return useRef<T>(null)
}

// ---------------------------------------------------------------------------
// Side panel
// ---------------------------------------------------------------------------

function SidePanel({ selected }: { selected: FoodWebNode | null }) {
  if (!selected) {
    return (
      <aside className="rounded-lg border border-line bg-surface p-4">
        <p className="text-sm text-muted">{FOOD_WEB_3D.tapNodeHint.en}</p>
      </aside>
    )
  }
  const trophicLabel: Record<FoodWebNode['trophic'], { en: string; zh: string }> = {
    producer: FOOD_WEB_3D.trophic.producer,
    primary: FOOD_WEB_3D.trophic.primary,
    secondary: FOOD_WEB_3D.trophic.secondary,
    tertiary: FOOD_WEB_3D.trophic.tertiary,
  }
  return (
    <aside className="rounded-lg border border-line bg-surface p-4">
      <div className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted">
        <span
          aria-hidden="true"
          className="inline-block h-2.5 w-2.5 rounded-full"
          style={{ background: TROPHIC_COLOR[selected.trophic] }}
        />
        <T value={trophicLabel[selected.trophic]} />
      </div>
      <h3 className="mb-2 text-base font-semibold text-ink">
        <T value={selected.name} />
      </h3>
      <p className="text-sm text-ink-soft">
        <T value={selected.description} />
      </p>

      {selected.eats.length > 0 && (
        <div className="mt-3">
          <div className="text-xs font-semibold uppercase tracking-wide text-muted">
            {FOOD_WEB_3D.eatsLabel.en}
          </div>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {selected.eats.map((e) => (
              <span
                key={e.id}
                className="rounded-full bg-canvas px-2 py-0.5 text-[11px] text-ink"
              >
                <T value={e.label} />
              </span>
            ))}
          </div>
        </div>
      )}

      {selected.eatenBy.length > 0 && (
        <div className="mt-3">
          <div className="text-xs font-semibold uppercase tracking-wide text-muted">
            {FOOD_WEB_3D.eatenByLabel.en}
          </div>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {selected.eatenBy.map((e) => (
              <span
                key={e.id}
                className="rounded-full bg-canvas px-2 py-0.5 text-[11px] text-ink"
              >
                <T value={e.label} />
              </span>
            ))}
          </div>
        </div>
      )}
    </aside>
  )
}
