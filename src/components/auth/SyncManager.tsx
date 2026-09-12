/**
 * Side-effect-only component — watches the auth state and starts/stops
 * the Supabase sync. Renders nothing. Mount it once near the top of the
 * React tree (e.g. in `App.tsx`).
 */

import { useEffect } from 'react'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { startSyncForUser, stopSync } from '@/lib/syncManager'

export function SyncManager() {
  const { session, ready } = useCurrentUser()

  useEffect(() => {
    if (!ready) return
    if (session) {
      void startSyncForUser(session.userId)
    } else {
      stopSync()
    }
    return () => {
      // On unmount (e.g. during HMR), don't leave the sync running.
      // The next mount will re-establish it if there's still a session.
    }
  }, [session, ready])

  return null
}
