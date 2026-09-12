import { useEffect, useState } from 'react'
import { T } from '@/components/i18n/T'
import { AUTH } from '@/lib/authStrings'
import { signIn, signUp } from '@/lib/authStore'
import { isSupabaseConfigured } from '@/lib/supabase'

/**
 * Sign-in / sign-up dialog. Single form, two modes (toggle at the top).
 * If Supabase is not configured (no env vars), the dialog stays open
 * with an explicit "not configured" message rather than silently failing.
 */
export function SignInDialog({ onClose }: { onClose: () => void }) {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [emoji, setEmoji] = useState('🐱')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setBusy(true)
    try {
      if (mode === 'signin') {
        const r = await signIn(email, password)
        if (!r.ok) setError(r.error)
        else onClose()
      } else {
        if (!displayName.trim()) {
          setError('Display name is required')
          return
        }
        if (password.length < 6) {
          setError('Password must be at least 6 characters')
          return
        }
        const r = await signUp({ email, password, displayName: displayName.trim(), emoji })
        if (!r.ok) setError(r.error)
        else onClose()
      }
    } finally {
      setBusy(false)
    }
  }

  if (!isSupabaseConfigured) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/30 p-4" onClick={onClose}>
        <div
          className="w-full max-w-md rounded-xl border border-line bg-surface p-6 shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-lg font-semibold text-ink">
            <T value={AUTH.notConfiguredTitle} />
          </h2>
          <p className="mt-2 text-sm text-ink-soft">
            <T value={AUTH.notConfiguredBody} />
          </p>
          <button
            type="button"
            onClick={onClose}
            className="mt-4 rounded-md border border-line bg-canvas px-3 py-1.5 text-sm"
          >
            OK
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/30 p-4" onClick={onClose}>
      <form
        onSubmit={submit}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-xl border border-line bg-surface p-6 shadow-lg"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-ink">
            {mode === 'signin' ? <T value={AUTH.signInHeading} /> : <T value={AUTH.signUpHeading} />}
          </h2>
          <button
            type="button"
            onClick={() => {
              setMode(mode === 'signin' ? 'signup' : 'signin')
              setError(null)
            }}
            className="text-xs text-accent hover:underline"
          >
            {mode === 'signin' ? <T value={AUTH.switchToSignUp} /> : <T value={AUTH.switchToSignIn} />}
          </button>
        </div>

        <div className="space-y-3">
          {mode === 'signup' && (
            <div className="flex gap-2">
              <label className="flex-1">
                <span className="text-xs text-muted">
                  <T value={AUTH.nameLabel} />
                </span>
                <input
                  type="text"
                  required
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="mt-1 w-full rounded-md border border-line bg-canvas px-2 py-1.5 text-sm"
                />
              </label>
              <label>
                <span className="text-xs text-muted">
                  <T value={AUTH.avatarLabel} />
                </span>
                <input
                  type="text"
                  value={emoji}
                  onChange={(e) => setEmoji(e.target.value.slice(0, 2))}
                  maxLength={2}
                  className="mt-1 w-14 rounded-md border border-line bg-canvas px-2 py-1.5 text-center text-lg"
                />
              </label>
            </div>
          )}

          <label className="block">
            <span className="text-xs text-muted">Email</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-md border border-line bg-canvas px-2 py-1.5 text-sm"
            />
          </label>

          <label className="block">
            <span className="text-xs text-muted">
              <T value={AUTH.passwordLabel} />
            </span>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-md border border-line bg-canvas px-2 py-1.5 text-sm"
            />
          </label>

          {error && (
            <p className="rounded-md border border-rose-200 bg-rose-50 px-2 py-1 text-xs text-rose-900">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-md bg-accent px-3 py-2 text-sm font-medium text-white hover:bg-accent/90 disabled:opacity-50"
          >
            {busy
              ? '...'
              : mode === 'signin'
                ? 'Sign in'
                : 'Create account'}
          </button>
        </div>

        <p className="mt-3 text-[10px] text-muted">
          <T value={AUTH.privacyNote} />
        </p>
      </form>
    </div>
  )
}
