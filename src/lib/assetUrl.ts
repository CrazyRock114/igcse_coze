/**
 * Resolve a public-asset path against the Vite base URL.
 *
 * Why this exists: paths like `/figures/3d/heart.glb` or
 * `/figures/g8/.../foo.png` are stored as absolute (leading `/`) strings
 * in the lesson content and component sources. On a root-domain host
 * (`https://igcse.xyz/`, localhost) the browser happily fetches them
 * as-is, but on GitHub Pages — where the project is served from
 * `/IGCSE_miniMax/` — the browser resolves them against
 * `https://<host>/` and 404s.
 *
 * Vite handles this for code-split JS/CSS via `base: process.env.DEPLOY_BASE`
 * in `vite.config.ts`, but the runtime strings we feed to `<img src=...>`,
 * `useGLTF(url)`, etc. don't go through the bundler. We prefix them with
 * `import.meta.env.BASE_URL` ourselves, which Vite substitutes at build
 * time. Local dev → `/` (so no change). GitHub Pages build → `/IGCSE_miniMax/`.
 *
 * Falls back to `/` when run outside Vite (Node.js content-loader scripts
 * under `tsx`), so the function is safe to call from `lesson.ts` data too.
 */
export function assetUrl(path: string): string {
  // `import.meta.env` is Vite-only. tsx (used by scripts/check-content-*.ts)
  // has `import.meta` but no `env` on it; the optional chain keeps it safe.
  const base: string =
    (import.meta as { env?: { BASE_URL?: string } }).env?.BASE_URL ?? '/'
  // Treat absolute (leading `/`) and relative inputs the same: stick them
  // onto the base, dropping the leading `/` to avoid `//figures/...`.
  if (path.startsWith('/')) {
    return base + path.slice(1)
  }
  return base + path
}
