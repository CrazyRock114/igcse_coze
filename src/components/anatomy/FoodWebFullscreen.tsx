import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import type { FoodWeb3DExtra, FoodWebNode, Lesson } from '@/content/types'
import { T } from '@/components/i18n/T'
import { ANATOMY_3D, FOOD_WEB_3D } from '@/lib/lessonExtrasStrings'
import {
  stablePosition,
  TROPHIC_COLOR,
  TROPHIC_Y,
  WebScene,
} from '@/components/lesson-extras/FoodWeb3D'

/**
 * Fullscreen 3D food web viewer. Same scene as the in-lesson `FoodWeb3D`
 * card, but the canvas fills the viewport and the side panel floats over
 * it. The model is the heart anatomy viewer's layout: a back link +
 * lesson title in the top-left, an auto-rotate toggle in the top-right,
 * and a side panel for the selected species.
 */
export function FoodWebFullscreen({
  lesson,
  extra,
}: {
  lesson: Lesson
  extra: FoodWeb3DExtra
}) {
  const [selectedId, setSelectedId] = useState<string | null>(
    extra.initialSelected ?? extra.nodes[0]?.id ?? null
  )
  const [autoRotate, setAutoRotate] = useState(extra.autoRotate ?? true)

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
    <div className="relative h-screen w-screen overflow-hidden bg-canvas">
      <div className="absolute inset-0">
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
            autoRotate={autoRotate}
          />

          {(['producer', 'primary', 'secondary', 'tertiary'] as const).map(
            (level) => (
              <mesh
                key={level}
                position={[0, TROPHIC_Y[level] - 0.55, 0]}
                rotation={[-Math.PI / 2, 0, 0]}
              >
                <ringGeometry args={[3.6, 3.7, 64]} />
                <meshBasicMaterial
                  color={TROPHIC_COLOR[level]}
                  transparent
                  opacity={0.18}
                />
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
      </div>

      <FullscreenHeader
        lesson={lesson}
        autoRotate={autoRotate}
        onAutoRotateChange={setAutoRotate}
      />

      <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-canvas/85 px-3 py-1 text-[11px] text-ink-soft shadow-sm backdrop-blur">
        <T value={FOOD_WEB_3D.dragHint} />
      </div>

      <SidePanel selected={selected} />
    </div>
  )
}

// ---------------------------------------------------------------------------
// Header
// ---------------------------------------------------------------------------

function FullscreenHeader({
  lesson,
  autoRotate,
  onAutoRotateChange,
}: {
  lesson: Lesson
  autoRotate: boolean
  onAutoRotateChange: (v: boolean) => void
}) {
  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-[80] flex flex-wrap items-start justify-between gap-2 p-3">
      <div className="pointer-events-auto max-w-[60%] rounded-lg border border-line bg-canvas/85 px-3 py-1.5 shadow-sm backdrop-blur">
        <Link
          to={`/lesson/${lesson.subject}/${lesson.slug}`}
          className="text-[11px] text-accent hover:underline"
        >
          ← Back to lesson
        </Link>
        <h1 className="text-sm font-semibold text-ink">
          <T value={lesson.title} />
        </h1>
      </div>

      <div className="pointer-events-auto flex flex-wrap items-center gap-1.5">
        <button
          type="button"
          onClick={() => onAutoRotateChange(!autoRotate)}
          aria-pressed={autoRotate}
          className={
            'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-xs font-medium shadow-sm backdrop-blur transition-colors ' +
            (autoRotate
              ? 'border-accent bg-accent text-white'
              : 'border-line bg-canvas/85 text-ink-soft hover:bg-surface')
          }
          title="Spin the web on its own"
        >
          <span aria-hidden="true">{autoRotate ? '⏸' : '↻'}</span>
          <span className="hidden sm:inline">
            {autoRotate
              ? ANATOMY_3D.pauseRotate.en
              : ANATOMY_3D.startRotate.en}
          </span>
        </button>
      </div>
    </header>
  )
}

// ---------------------------------------------------------------------------
// Side panel
// ---------------------------------------------------------------------------

function SidePanel({ selected }: { selected: FoodWebNode | null }) {
  if (!selected) {
    return (
      <aside className="pointer-events-auto absolute right-4 top-20 z-10 w-[min(320px,calc(100vw-2rem))] rounded-xl border border-line bg-canvas/95 p-4 shadow-lg backdrop-blur">
        <p className="text-sm text-muted">
          <T value={FOOD_WEB_3D.tapNodeHint} />
        </p>
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
    <aside className="pointer-events-auto absolute right-4 top-20 z-10 w-[min(320px,calc(100vw-2rem))] rounded-xl border border-line bg-canvas/95 p-4 shadow-lg backdrop-blur">
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
            <T value={FOOD_WEB_3D.eatsLabel} />
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
            <T value={FOOD_WEB_3D.eatenByLabel} />
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
