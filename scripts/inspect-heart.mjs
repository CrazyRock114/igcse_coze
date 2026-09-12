// scripts/inspect-heart.mjs — drop-in inspector for any GLB in public/figures/3d/
// Usage: node scripts/inspect-heart.mjs heart.glb
// Patches `self` so three's WebP texture extension can run in plain Node, then
// prints the scene tree and the model bounding box. Used during authoring to
// pick normalised 3D hotspot positions; not part of the bundle.
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { Box3, Vector3 } from 'three'
import fs from 'fs'

if (typeof globalThis.self === 'undefined') {
  globalThis.self = globalThis
}

const file = process.argv[2] || 'heart.glb'
const buffer = fs.readFileSync(`./public/figures/3d/${file}`).buffer
const loader = new GLTFLoader()
loader.parse(
  buffer,
  '',
  (gltf) => {
    console.log('=== scene children ===')
    gltf.scene.traverse((o) => {
      if (o.isMesh || o.isGroup) {
        const box = new Box3().setFromObject(o)
        const size = new Vector3()
        const center = new Vector3()
        box.getSize(size)
        box.getCenter(center)
        console.log(
          `  ${o.type.padEnd(5)} "${o.name}" pos=(${o.position.x.toFixed(2)},${o.position.y.toFixed(2)},${o.position.z.toFixed(2)}) size=(${size.x.toFixed(2)},${size.y.toFixed(2)},${size.z.toFixed(2)}) center=(${center.x.toFixed(2)},${center.y.toFixed(2)},${center.z.toFixed(2)})`
        )
      }
    })
    const sceneBox = new Box3().setFromObject(gltf.scene)
    const sceneSize = new Vector3()
    const sceneCenter = new Vector3()
    sceneBox.getSize(sceneSize)
    sceneBox.getCenter(sceneCenter)
    console.log('\n=== scene bbox ===')
    console.log(
      `  size:   (${sceneSize.x.toFixed(2)}, ${sceneSize.y.toFixed(2)}, ${sceneSize.z.toFixed(2)})`
    )
    console.log(
      `  center: (${sceneCenter.x.toFixed(2)}, ${sceneCenter.y.toFixed(2)}, ${sceneCenter.z.toFixed(2)})`
    )
  },
  (err) => {
    console.error('parse error:', err.message ?? err)
  }
)
