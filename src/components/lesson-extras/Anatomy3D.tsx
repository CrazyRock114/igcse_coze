// R3F 9.x auto-registers its `JSX.IntrinsicElements` augmentation when this
// module is loaded. Keep the import for that side-effect even if no symbol
// from it is used at the top of the file.
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Html, OrbitControls, useGLTF } from '@react-three/drei'
import { Suspense, useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import type { AnatomyOrgan } from '@/content/types'
import { T } from '@/components/i18n/T'
import { ANATOMY_3D } from '@/lib/lessonExtrasStrings'

/**
 * 3D anatomy viewer used both inside the in-lesson 3D tab and on the
 * fullscreen `/anatomy/:subject/:slug` page.
 *
 * The container fills its parent — the parent decides the size:
 * - in-lesson tab: an `aspect-[951/564] w-full` box (matches the 2D figure's
 *   visual height on the same page)
 * - fullscreen page: `h-screen w-screen` so the canvas is the entire page
 *
 * The camera fits the model's bounding sphere at load time so the organ
 * fills ~70% of the viewport height. `position3d` is normalised to the bbox
 * and converted to world space, so the author only ever writes a [0,1]
 * triple regardless of how big the GLB actually is.
 *
 * Optional `autoRotate` spins the model. The auto-rotate toggle button
 * itself is owned by the parent page (in its Header) so the two surfaces
 * that mount this viewer don't have to coordinate button placement.
 *
 * `onSelectedScreenPos` reports the screen position of the currently
 * selected part every frame, so the parent page can draw a leader line
 * from the floating callout to the dot in the model. Set to `undefined`
 * when no part is selected.
 *
 * `pinOverrides` lets the parent replace the lesson's `position3d` for
 * any part — the viewer uses the override if present, otherwise the
 * lesson value. Used by the Edit Mode panel on the fullscreen page: the
 * student nudges a slider and the dot moves in real time without a
 * rebuild.
 *
 * `editMode` swaps the click handler: instead of selecting a part it
 * reports `onPinAdjust` so the parent can drop that part into the
 * editor panel.
 */
export function Anatomy3D({
  modelUrl,
  parts,
  selectedId,
  hoveredId,
  onSelect,
  onHover,
  followStep = -1,
  orderedForFollow = [],
  autoRotate = false,
  onSelectedScreenPos,
  pinOverrides,
  editMode = false,
  onPinAdjust,
}: {
  modelUrl: string
  parts: AnatomyOrgan[]
  selectedId: string | null
  hoveredId: string | null
  onSelect: (id: string) => void
  onHover: (id: string | null) => void
  followStep?: number
  orderedForFollow?: AnatomyOrgan[]
  autoRotate?: boolean
  onSelectedScreenPos?: ((pos: { x: number; y: number } | null) => void) | undefined
  pinOverrides?: Record<string, [number, number, number]> | undefined
  editMode?: boolean | undefined
  onPinAdjust?: ((id: string) => void) | undefined
}) {
  return (
    <div className="relative aspect-[951/564] w-full overflow-hidden bg-canvas">
      <Canvas
        camera={{ position: [0, 0.4, 3.5], fov: 38 }}
        // dpr=[1,1.5]: was [1,2]. On a Retina display 2× DPR doubles
        // fragment-shader work for every pixel, which competes with the
        // slider's pointer events for the main thread on slower hardware.
        // 1.5× is visually indistinguishable from 2× for a 4-light lit
        // organ and halves the GPU cost on heavy scenes.
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, preserveDrawingBuffer: false }}
        shadows={false}
        // Force a render every frame. The default 'demand' loop only redraws
        // when OrbitControls dispatches a change event, which means a slider
        // drag that mutates `pinOverrides` does NOT trigger a redraw — the
        // dot only moves on the next frame OrbitControls invalidates. With
        // 'always' the canvas runs at vsync, so the dot tracks the slider
        // 1:1. (autoRotate is on by default so this isn't a fresh cost — we
        // were already rendering every frame.)
        frameloop="always"
      >
        {/* Four-light setup: hemisphere (sky/ground ambient) + ambient base
            + warm key (upper-right front) + cool fill (lower-left) + cool
            rim (back). Brighter than a textbook diagram because the page
            background is off-white — a 1.0 default reads as muddy by
            comparison. */}
        <hemisphereLight args={['#fff4e6', '#dbeafe', 0.6]} />
        <ambientLight intensity={1.1} />
        <directionalLight position={[3, 4, 2]} intensity={1.8} color="#fff4e6" />
        <directionalLight position={[-3, -1, -2]} intensity={0.85} color="#dbeafe" />
        <directionalLight position={[0, 2, -3]} intensity={0.7} />

        <Suspense fallback={null}>
          <ModelWithHotspots
            modelUrl={modelUrl}
            parts={parts}
            selectedId={selectedId}
            hoveredId={hoveredId}
            onSelect={onSelect}
            onHover={onHover}
            followStep={followStep}
            orderedForFollow={orderedForFollow}
            autoRotate={autoRotate}
            onSelectedScreenPos={onSelectedScreenPos}
            pinOverrides={pinOverrides}
            editMode={editMode}
            onPinAdjust={onPinAdjust}
          />
        </Suspense>

        <OrbitControls
          enableDamping
          dampingFactor={0.08}
          minDistance={0.5}
          maxDistance={20}
          target={[0, 0, 0]}
          makeDefault
        />
      </Canvas>

      {/* Auto-rotate and the drag hint both live in the Header overlay
          (rendered by the parent page). The viewer itself only owns the
          canvas, so a future mount in a different chrome (lesson tab,
          quiz prompt, …) doesn't drag the buttons along. */}

      <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-canvas/85 px-3 py-1 text-[11px] text-ink-soft shadow-sm backdrop-blur">
        <T value={ANATOMY_3D.dragHint} />
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Internal: load the GLB, compute the bbox once, render the model + pins.
// ---------------------------------------------------------------------------

// Stable fallback position for parts without a 3D position. Reusing the
// same Vector3 reference (instead of a fresh `[0,0,0]` literal) keeps
// drei's Html prop diffing honest: a different array reference would
// look like the pin moved to the origin, which it didn't.
const FALLBACK_POS = new THREE.Vector3(0, 0, 0)

function ModelWithHotspots({
  modelUrl,
  parts,
  selectedId,
  hoveredId,
  onSelect,
  onHover,
  followStep,
  orderedForFollow,
  autoRotate,
  onSelectedScreenPos,
  pinOverrides,
  editMode,
  onPinAdjust,
}: {
  modelUrl: string
  parts: AnatomyOrgan[]
  selectedId: string | null
  hoveredId: string | null
  onSelect: (id: string) => void
  onHover: (id: string | null) => void
  followStep: number
  orderedForFollow: AnatomyOrgan[]
  autoRotate: boolean
  onSelectedScreenPos?: ((pos: { x: number; y: number } | null) => void) | undefined
  pinOverrides?: Record<string, [number, number, number]> | undefined
  editMode?: boolean | undefined
  onPinAdjust?: ((id: string) => void) | undefined
}) {
  const gltf = useGLTF(modelUrl)
  const scene = useMemo(() => gltf.scene.clone(true), [gltf])
  const groupRef = useRef<THREE.Group>(null)

  // Bounding box + bounding sphere. We use the sphere for camera fit (it
  // gives a perfectly-fitted view from any angle) and the box for hotspot
  // coordinate conversion.
  const bbox = useMemo(() => new THREE.Box3().setFromObject(scene), [scene])
  const sphere = useMemo(() => {
    const s = new THREE.Sphere()
    bbox.getBoundingSphere(s)
    return s
  }, [bbox])
  const { center, sphereRadius } = useMemo(
    () => ({ center: sphere.center, sphereRadius: sphere.radius || 1 }),
    [sphere]
  )

  // Normalisation: scale the model so its bounding-sphere radius is 1. The
  // camera then sits at `1 / tan(fov/2)` units away, which makes the model
  // fill the viewport height. A small multiplier leaves breathing room.
  const scale = useMemo(() => 1 / sphereRadius, [sphereRadius])

  // Fit the camera to the now-scaled sphere. Sphere radius is 1 in world
  // units after the scale above; the camera is placed on the +Z axis at the
  // distance that just barely contains the sphere, with a 1.4× margin so
  // the model has air around it.
  const { camera, size } = useThree()
  useEffect(() => {
    const fov = (camera as THREE.PerspectiveCamera).fov * (Math.PI / 180)
    const fitDist = 1 / Math.tan(fov / 2)
    // 1.4 = ~70% of viewport height; tune up for "tighter", down for "looser"
    const dist = fitDist * 1.4
    camera.position.set(0, 0.2, dist)
    camera.lookAt(0, 0, 0)
    camera.updateProjectionMatrix()
  }, [camera, size.width, size.height])

  // Resolve the effective [0,1] position for each part: lesson value
  // unless an override is present. Pinned to a memo over the actual
  // values (not just the key set — key-only deps miss value changes
  // and drei's <Html> won't re-project the dot, so the user sees
  // "first drag works, subsequent drags freeze" with the dot only
  // moving when some other state change happens to re-render the tree).
  // Stringify the relevant slice (≤11 parts × 3 floats) for a cheap
  // primitive dep that the memo can compare by Object.is.
  const overrideFingerprint = pinOverrides
    ? Object.keys(pinOverrides)
        .sort()
        .map((k) => {
          // noUncheckedIndexedAccess flags this as possibly undefined;
          // the loop is over Object.keys so it can't be, but TS doesn't
          // know. Help it.
          const v = pinOverrides[k]
          return v ? `${k}:${v.join(',')}` : k
        })
        .join('|')
    : ''
  const pinsWithPos = useMemo(
    () =>
      parts
        .filter((p) => p.position3d || pinOverrides?.[p.id])
        .map((p) => {
          const pos = pinOverrides?.[p.id] ?? p.position3d!
          // Convert [0,1] bbox coords to world space (after our centre+scale).
          const localX = (pos[0] - 0.5) * (sphereRadius * 2) + center.x
          const localY = (pos[1] - 0.5) * (sphereRadius * 2) + center.y
          const localZ = (pos[2] - 0.5) * (sphereRadius * 2) + center.z
          return {
            id: p.id,
            name: p.name,
            worldPos: new THREE.Vector3(
              (localX - center.x) * scale,
              (localY - center.y) * scale,
              (localZ - center.z) * scale
            ) as THREE.Vector3,
          }
        }),
    // `overrideFingerprint` covers every value change. The values
    // themselves are read inside the body but only the fingerprint
    // string is needed for the dep.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [parts, center, sphereRadius, scale, overrideFingerprint]
  )

  // Auto-rotate: spin the *group* (not the scene) about Y. Pins are
  // children of the same group, so they rotate with the model.
  useFrame((_, dt) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += dt * 0.35
    }
  })

  // Report the selected part's screen position to the parent (used by
  // the fullscreen page to draw a leader line from the callout to the
  // dot). Skipped if the part is behind the camera or out of the viewport.
  // Kept as a separate effect so its update frequency is independent of
  // the auto-rotate's rAF cadence.
  //
  // CRITICAL: bail out when nothing changed. The default behaviour of
  // setState on a new object reference re-renders the parent, which
  // re-renders this whole subtree, which re-runs the React render path
  // for every Html pin — at 60 Hz, that storm drowned out the Edit
  // panel's slider input. The parent only passes a real callback in
  // read mode, so edit mode hits the `!onSelectedScreenPos` early
  // return; this bailout is the second line of defence for read mode
  // (no rotation, no drag, no selection change → no re-render).
  const lastReportedPosRef = useRef<{ x: number; y: number } | null>(null)
  useFrame(() => {
    if (!onSelectedScreenPos) return
    if (!selectedId) {
      if (lastReportedPosRef.current !== null) {
        onSelectedScreenPos(null)
        lastReportedPosRef.current = null
      }
      return
    }
    const pin = pinsWithPos.find((p) => p.id === selectedId)
    if (!pin) {
      if (lastReportedPosRef.current !== null) {
        onSelectedScreenPos(null)
        lastReportedPosRef.current = null
      }
      return
    }
    // World point = group rotation * pin world position
    const worldPoint = pin.worldPos.clone()
    if (groupRef.current) worldPoint.applyMatrix4(groupRef.current.matrixWorld)
    // Project to NDC, then to canvas pixels
    const ndc = worldPoint.clone().project(camera as THREE.PerspectiveCamera)
    if (ndc.z > 1 || ndc.z < -1) {
      if (lastReportedPosRef.current !== null) {
        onSelectedScreenPos(null)
        lastReportedPosRef.current = null
      }
      return
    }
    const next = {
      x: (ndc.x * 0.5 + 0.5) * size.width,
      y: (-ndc.y * 0.5 + 0.5) * size.height,
    }
    const last = lastReportedPosRef.current
    // 0.5 px tolerance: a stationary dot or a slider drag below this
    // resolution would otherwise re-render the parent every frame.
    if (last && Math.abs(last.x - next.x) < 0.5 && Math.abs(last.y - next.y) < 0.5) {
      return
    }
    lastReportedPosRef.current = next
    onSelectedScreenPos(next)
  })

  // Filter to parts that actually have a 3D position (lesson or override).
  const partsWithPos = useMemo(
    () => parts.filter((p) => p.position3d || pinOverrides?.[p.id]),
    [parts, pinOverrides]
  )

  // Resolve which part is being "followed" right now.
  const followTarget = orderedForFollow[Math.min(Math.max(0, followStep), Math.max(0, orderedForFollow.length - 1))]
  const followPos3d = followTarget?.position3d

  return (
    <group
      ref={groupRef}
      scale={scale}
      // Recentre the model on the origin so auto-rotate spins around its
      // visual centre, not its GLB-local centre.
      position={[-center.x * scale, -center.y * scale, -center.z * scale]}
    >
      <primitive object={scene} />

      {partsWithPos.map((p) => {
        const isSelected = selectedId === p.id
        const isHovered = hoveredId === p.id
        const isAdjusted = Boolean(pinOverrides?.[p.id])
        const showRing = isSelected || isHovered
        // In edit mode every pin should be obviously pickable: same size,
        // slightly stronger ring, and an outline ring on the one being
        // adjusted to remind the user that an override is in place.
        const size = editMode ? 14 : showRing ? 16 : 12
        // Pass the Vector3 directly (drei accepts Vector3 | [x,y,z]).
        // Calling `.toArray()` here would allocate a fresh array on
        // every React render — and parent re-renders happen often in
        // this tree, so we'd churn the GC and confuse drei's prop
        // diffing into thinking the pin moved every frame.
        const pin = pinsWithPos.find((q) => q.id === p.id)
        return (
          <Html
            key={p.id}
            position={pin?.worldPos ?? FALLBACK_POS}
            center
            distanceFactor={5}
            zIndexRange={[40, 0]}
            style={{ pointerEvents: 'auto' }}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                if (editMode && onPinAdjust) onPinAdjust(p.id)
                else onSelect(p.id)
              }}
              onMouseEnter={() => onHover(p.id)}
              onMouseLeave={() => onHover(null)}
              data-3d-hotspot={p.id}
              data-pin-adjusted={isAdjusted ? 'true' : undefined}
              className="block rounded-full transition-transform"
              style={{
                width: size,
                height: size,
                background: isSelected ? '#0d9488' : isHovered ? '#0f172a' : '#0f172acc',
                border: isAdjusted ? '2px solid #f59e0b' : '1.5px solid white',
                boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
                cursor: 'pointer',
                padding: 0,
              }}
              aria-label={p.name.en}
            />
          </Html>
        )
      })}

      {followPos3d && (
        <FollowDot3D
          position={followPos3d}
          center={center}
          sphereRadius={sphereRadius}
          scale={scale}
        />
      )}

      {/* In edit mode, draw a large labelled marker around the selected
          pin so the user can see *which* dot the sliders are driving.
          The base pin is 12-14px; this marker is 44px with a dashed ring
          and the part's name above it — impossible to miss. */}
      {editMode && selectedId && (() => {
        const pin = pinsWithPos.find((p) => p.id === selectedId)
        const part = parts.find((p) => p.id === selectedId)
        if (!pin || !part) return null
        return (
          <Html
            position={pin.worldPos.toArray()}
            center
            distanceFactor={3}
            zIndexRange={[60, 0]}
            style={{ pointerEvents: 'none' }}
          >
            <div
              className="relative flex items-center justify-center"
              data-edit-marker={selectedId}
            >
              <div
                className="absolute h-11 w-11 animate-pulse rounded-full border-2 border-dashed border-amber-500"
                style={{ animationDuration: '1.6s' }}
              />
              <div className="absolute -top-7 whitespace-nowrap rounded-md bg-amber-500 px-2 py-0.5 text-[10px] font-semibold text-white shadow">
                {part.name.en}
              </div>
            </div>
          </Html>
        )
      })()}
    </group>
  )
}

function FollowDot3D({
  position,
  center,
  sphereRadius,
  scale,
}: {
  position: [number, number, number]
  center: THREE.Vector3
  sphereRadius: number
  scale: number
}) {
  const ref = useRef<THREE.Mesh>(null)
  const localX = (position[0] - 0.5) * (sphereRadius * 2) + center.x
  const localY = (position[1] - 0.5) * (sphereRadius * 2) + center.y
  const localZ = (position[2] - 0.5) * (sphereRadius * 2) + center.z
  const worldX = (localX - center.x) * scale
  const worldY = (localY - center.y) * scale
  const worldZ = (localZ - center.z) * scale

  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime()
      const s = 1 + 0.3 * Math.sin(t * 4)
      ref.current.scale.setScalar(s * 0.04)
    }
  })

  return (
    <mesh ref={ref} position={[worldX, worldY, worldZ]}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshBasicMaterial color="#dc2626" />
    </mesh>
  )
}
