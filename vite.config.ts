/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'
import { tutorPlugin } from './tutor-plugin.mjs'

export default defineConfig({
  // GitHub Pages serves a project site from /<repo>/, so assets need that prefix. Local
  // dev and any root-domain host use '/', selected by the DEPLOY_BASE env var in CI.
  base: process.env['DEPLOY_BASE'] ?? '/',
  plugins: [react(), tailwindcss(), tutorPlugin()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  build: {
    // Content-heavy site: text chunks compress 4-5x (an ~850 KB subject chunk
    // is ~200-300 KB gzipped). The Vite default warns at 500 kB, which every
    // subject chunk trips — raise the bar to keep `vite build` output clean.
    // vendor-three (~1 MB raw / ~320 KB gzip) is a *lazy* chunk, fetched only
    // when a student opens a 3D view, so its size never touches first load.
    // (Deeper first-load diet: make registry.ts lazy — see iteration plan.)
    chunkSizeWarningLimit: 1300,
    rollupOptions: {
      output: {
        // Split the 4+ MB single bundle into cacheable, parallel-downloadable chunks.
        // Heaviest offenders: three.js + @react-three (only needed by 3D sims, so it
        // must NOT be reachable from the entry chunk), katex, uplot, and the
        // per-subject course content. React itself is pinned into its own chunk so
        // Rollup's shared-module placement cannot leak reconciler internals into
        // vendor-three (which would force the entry chunk to import all of three.js).
        manualChunks(id: string) {
          // Vite 7 injects its __vitePreload helper (used by every lazy())
          // as a virtual module. Rollup then decides where to place it, and
          // with the chunk map below it picked vendor-three — creating a
          // STATIC import edge from the entry chunk to ALL of three.js.
          // Pin the helper into vendor-react so dynamic imports never pull
          // the 3D stack onto the critical path.
          if (id === '\0vite/preload-helper.js' || id.includes('vite/preload-helper')) {
            return 'vendor-react'
          }
          if (id.includes('node_modules')) {
            // Extract the bare package name from the id. pnpm nests dependencies
            // under .pnpm/<pkg>@<ver>/node_modules/<pkg>/…, so take the segment
            // right after the LAST node_modules/; scoped names keep both parts.
            const seg = (id.split('node_modules/').pop() ?? '').split('/')
            const PKG = seg[0]!.startsWith('@') ? `${seg[0]}/${seg[1]}` : seg[0]!
            if (PKG === 'three' || PKG.startsWith('three-') || PKG.startsWith('@react-three/'))
              return 'vendor-three'
            if (
              PKG === 'react' ||
              PKG === 'react-dom' ||
              PKG === 'scheduler' ||
              PKG === 'zustand' ||
              PKG === 'use-sync-external-store'
            )
              return 'vendor-react'
            if (PKG === 'katex') return 'vendor-katex'
            if (PKG === 'uplot') return 'vendor-uplot'
            return undefined
          }
          if (id.includes('/src/content/lessons/0625/')) return 'content-0625'
          if (id.includes('/src/content/lessons/0620/')) return 'content-0620'
          if (id.includes('/src/content/lessons/0610/')) return 'content-0610'
          if (id.includes('/src/content/questions/')) return 'content-questions'
          return undefined
        },
      },
    },
  },
  server: {
    // Vite's default binds to IPv6 loopback only, so http://127.0.0.1:5173 is
    // refused when the browser resolves `localhost` to IPv4. Binding to all
    // interfaces makes both loopback families work — and also exposes the dev
    // server on the local network, which is what lets you open it on a phone to
    // check the mobile layout. Change to '127.0.0.1' if you'd rather it stayed
    // private to this machine.
    host: true,
    // Fail loudly instead of silently moving to 5174 when the port is taken.
    strictPort: true,
  },
  test: {
    environment: 'node',
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
  },
})
