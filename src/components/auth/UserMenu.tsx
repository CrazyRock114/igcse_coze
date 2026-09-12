import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { T } from '@/components/i18n/T'
import { AUTH } from '@/lib/authStrings'
import { TEACHER } from '@/lib/teacherStrings'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { signOut } from '@/lib/authStore'
import { SignInDialog } from './SignInDialog'

/**
 * Header widget — "Sign in" pill when no session, emoji + dropdown when
 * signed in. The dropdown has a link to the teacher dashboard (only
 * shown when the signed-in user is the designated teacher, which is
 * determined by JWT email claim — not by any user-toggleable flag).
 *
 * The button is intentionally small. Auth should not dominate the page.
 */
export function UserMenu() {
  const { session, ready } = useCurrentUser()
  const [open, setOpen] = useState(false)
  const [showSignIn, setShowSignIn] = useState(false)

  // Close dropdown on outside click.
  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest('[data-user-menu]')) setOpen(false)
    }
    window.addEventListener('mousedown', onDown)
    return () => window.removeEventListener('mousedown', onDown)
  }, [open])

  if (!ready) {
    return <div className="h-8 w-20 animate-pulse rounded-full bg-canvas" aria-hidden="true" />
  }

  if (!session) {
    return (
      <>
        <button
          type="button"
          onClick={() => setShowSignIn(true)}
          className="rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium text-ink-soft hover:border-teal-500 hover:text-teal-700"
        >
          <T value={AUTH.signInLabel} />
        </button>
        {showSignIn && <SignInDialog onClose={() => setShowSignIn(false)} />}
      </>
    )
  }

  return (
    <div className="relative" data-user-menu>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 rounded-full border border-line bg-surface px-2 py-1 text-xs text-ink-soft hover:border-teal-500"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <span className="text-base leading-none">{session.emoji}</span>
        <span className="max-w-[120px] truncate font-medium">{session.displayName}</span>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-1 w-56 overflow-hidden rounded-lg border border-line bg-surface shadow-lg"
        >
          <div className="border-b border-line bg-canvas px-3 py-2">
            <p className="truncate text-xs font-medium text-ink">{session.displayName}</p>
            <p className="truncate text-[10px] text-muted">{session.email}</p>
          </div>

          {session.isTeacher && (
            <Link
              to="/teacher"
              onClick={() => setOpen(false)}
              className="block border-b border-line px-3 py-2 text-sm text-ink-soft hover:bg-canvas"
              role="menuitem"
            >
              <T value={TEACHER.teacherDashboardLink} /> →
            </Link>
          )}

          <button
            type="button"
            onClick={async () => {
              setOpen(false)
              await signOut()
            }}
            className="block w-full px-3 py-2 text-left text-sm text-ink-soft hover:bg-canvas"
            role="menuitem"
          >
            <T value={AUTH.signOutLabel} />
          </button>
        </div>
      )}
    </div>
  )
}
