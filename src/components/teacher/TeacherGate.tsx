import { Link } from 'react-router-dom'
import { T } from '@/components/i18n/T'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { TEACHER } from '@/lib/teacherStrings'

/**
 * Wraps the teacher dashboard. Three states:
 *   1. Not signed in → "sign in" prompt
 *   2. Signed in, is_teacher=false → "enable teacher mode" prompt
 *   3. Signed in, is_teacher=true → render children
 *
 * Loading is folded into the not-ready branch (skeleton).
 */
export function TeacherGate({ children }: { children: React.ReactNode }) {
  const { session, ready } = useCurrentUser()

  if (!ready) {
    return <div className="h-48 animate-pulse rounded-xl border border-line bg-canvas" aria-hidden="true" />
  }

  if (!session) {
    return (
      <Notice>
        <h2 className="text-lg font-semibold text-ink">
          <T value={TEACHER.gateSignInTitle} />
        </h2>
        <p className="mt-2 text-sm text-ink-soft">
          <Link to="/" className="text-accent hover:underline">
            ← Home
          </Link>
        </p>
      </Notice>
    )
  }

  if (!session.isTeacher) {
    return (
      <Notice>
        <h2 className="text-lg font-semibold text-ink">
          <T value={TEACHER.gateNotTeacherTitle} />
        </h2>
        <p className="mt-2 text-sm text-ink-soft">
          <T value={TEACHER.gateNotTeacherBody} />
        </p>
      </Notice>
    )
  }

  return <>{children}</>
}

function Notice({ children }: { children: React.ReactNode }) {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <div className="rounded-xl border border-line bg-surface p-6">{children}</div>
    </main>
  )
}
