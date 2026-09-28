/**
 * Zero-dependency static file server for the built site (dist/).
 *
 * Replaces `vite preview` in the deployment runtime: vite bundles its config
 * file before serving and writes the bundle to node_modules/.vite-temp, which
 * the veFaaS runtime cannot create (ENOENT). This server uses only node
 * built-ins, serves dist/ with SPA fallback (react-router deep links) and
 * correct MIME types — everything vite preview did for this site.
 *
 * The port comes from DEPLOY_RUN_PORT (injected by the platform); 5000 is the
 * local default. Listens on all interfaces, like `vite preview --host`.
 */
import { createServer } from 'node:http'
import { createReadStream, existsSync, statSync } from 'node:fs'
import { extname, join, normalize, resolve, sep } from 'node:path'

const ROOT = resolve(process.cwd(), 'dist')
const PORT = Number(process.env.DEPLOY_RUN_PORT ?? 5000)

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.webmanifest': 'application/manifest+json',
  '.txt': 'text/plain; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
}

function send(res, status, body, headers = {}) {
  res.writeHead(status, headers)
  res.end(body)
}

function streamFile(res, filePath, status = 200) {
  const type = MIME[extname(filePath).toLowerCase()] ?? 'application/octet-stream'
  // Vite fingerprints files under assets/, so they can be cached forever.
  // Everything else (index.html, audio) gets revalidation-friendly caching.
  const immutable = filePath.includes(`${sep}assets${sep}`)
  res.writeHead(status, {
    'Content-Type': type,
    'Content-Length': statSync(filePath).size,
    'Cache-Control': immutable ? 'public, max-age=31536000, immutable' : 'public, max-age=0, must-revalidate',
  })
  createReadStream(filePath).pipe(res)
}

const server = createServer((req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    send(res, 405, 'Method Not Allowed', { Allow: 'GET, HEAD' })
    return
  }

  // Decode and confine the path inside ROOT (no directory traversal).
  let pathname
  try {
    pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname)
  } catch {
    send(res, 400, 'Bad Request')
    return
  }
  const filePath = resolve(join(ROOT, normalize(pathname).replace(/^(\.\.[/\\])+/, '')))
  if (filePath !== ROOT && !filePath.startsWith(ROOT + sep)) {
    send(res, 403, 'Forbidden')
    return
  }

  const exact = existsSync(filePath) && statSync(filePath).isFile() ? filePath : null
  if (exact) {
    streamFile(res, exact)
    return
  }

  // SPA fallback: route paths (no extension) and unknown HTML navigations get
  // index.html so react-router can take over; missing real assets stay 404.
  const wantsHtml = !extname(pathname) || pathname === '/'
  if (wantsHtml) {
    const index = join(ROOT, 'index.html')
    if (existsSync(index)) {
      streamFile(res, index)
      return
    }
    send(res, 500, 'dist/index.html missing — run `pnpm build` first')
    return
  }
  send(res, 404, 'Not Found')
})

server.listen(PORT, '0.0.0.0', () => {
  console.log(`[serve-dist] serving ${ROOT} on http://0.0.0.0:${PORT}`)
})
