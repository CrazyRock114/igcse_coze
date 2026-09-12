import { Link } from 'react-router-dom'
import { T } from '@/components/i18n/T'
import { ui } from '@/lib/ui-strings'

/**
 * Rendered for every URL that does not match a route. Replaces the old
 * behaviour of silently falling back to the home page, which made broken
 * deep links invisible (and hurt SEO, since unknown URLs returned real
 * content instead of a distinct "not found" view).
 */
export function NotFoundPage() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-6 py-16 text-center">
      <p className="font-mono text-6xl font-semibold text-accent" aria-hidden>
        404
      </p>
      <h1 className="mt-4 text-2xl font-semibold text-ink">
        <T value={ui.notFoundTitle} />
      </h1>
      <p className="mt-3 text-sm text-ink/70" data-zh>
        <T value={ui.notFoundBody} />
      </p>
      <Link
        to="/"
        className="mt-8 rounded-md bg-ink px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
      >
        <T value={ui.notFoundCta} />
      </Link>
    </main>
  )
}
