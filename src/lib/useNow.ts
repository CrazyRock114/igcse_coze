/**
 * `useNow` — a "now" tick that the renderer can safely read.
 *
 * Calls `Date.now()` on the server-snapshot and then refreshes in
 * the browser on the given interval. Default is once a minute — fine
 * for "in 3 days" type displays that change on the order of hours.
 *
 * The tick is set up in an effect (the right place for "external
 * system" subscriptions like a clock), so we never call `Date.now`
 * during render.
 */
import { useEffect, useState } from 'react'

export function useNow(intervalMs = 60_000): number {
  const [now, setNow] = useState<number>(() =>
    typeof window === 'undefined' ? 0 : Date.now()
  )

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), intervalMs)
    return () => window.clearInterval(id)
  }, [intervalMs])

  return now
}
