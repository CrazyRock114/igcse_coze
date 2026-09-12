/**
 * `useCurrentUser` — React hook that returns the current session, plus a
 * stable way to re-render when it changes.
 *
 * On mount: synchronously reads the localStorage cache for the first
 * paint, then asynchronously fetches the Supabase session to refresh
 * the cache (and re-render if it changed).
 *
 * On sign-in / sign-out / profile update: the authStore dispatches an
 * `igcse:auth-changed` window event, this hook re-reads the cache.
 */

import { useEffect, useState } from 'react'
import { getCachedSession, loadSession, SESSION_EVENT } from '@/lib/authStore'
import type { AuthSession } from '@/lib/authTypes'

export function useCurrentUser(): {
  session: AuthSession | null
  ready: boolean
} {
  // Initial paint = the cache. Cheap, no network.
  const [session, setSession] = useState<AuthSession | null>(() => getCachedSession())
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let cancelled = false

    const onChange = () => setSession(getCachedSession())
    window.addEventListener(SESSION_EVENT, onChange)

    // First network refresh: pulls the real session from Supabase.
    void loadSession().then((s) => {
      if (cancelled) return
      if (s) setSession(s)
      setReady(true)
    })

    return () => {
      cancelled = true
      window.removeEventListener(SESSION_EVENT, onChange)
    }
  }, [])

  return { session, ready }
}
