import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Whether the visitor has asked the system to reduce motion.
 *
 * Animated physics is the point of several of these lessons, so we do not disable it
 * outright — we start paused and let the student press play. That respects the
 * preference without hiding the content behind it.
 */
export function prefersReducedMotion(): boolean {
  if (typeof matchMedia === 'undefined') return false
  return matchMedia('(prefers-reduced-motion: reduce)').matches
}

interface AnimationClock {
  playing: boolean
  toggle: () => void
  /** Reset the driven parameter to the start of its loop. */
  reset: () => void
}

/**
 * Advances one simulation parameter from a real-time clock.
 *
 * The kernel remains a pure function — this only pushes a new value for the named
 * parameter each frame, exactly as a slider would. Elapsed time is measured from
 * timestamps rather than counted in frames, so the animation runs at the same speed
 * on a 60 Hz and a 120 Hz display.
 */
export function useAnimationFrame(
  enabled: boolean,
  onTick: (delta: number) => void,
  autoPlay = true
): AnimationClock {
  const [playing, setPlaying] = useState(enabled && autoPlay && !prefersReducedMotion())
  const onTickRef = useRef(onTick)
  const resetRef = useRef<(() => void) | null>(null)

  // Keep the latest callback without restarting the loop every render. Assigning in an
  // effect rather than during render — a ref write during render is a React violation
  // and can leave the loop calling a stale closure.
  useEffect(() => {
    onTickRef.current = onTick
  }, [onTick])

  useEffect(() => {
    if (!enabled || !playing) return

    let raf = 0
    let last = performance.now()

    const step = (now: number) => {
      // Clamp the step so a backgrounded tab does not resume with a huge jump.
      const delta = Math.min((now - last) / 1000, 0.05)
      last = now
      onTickRef.current(delta)
      raf = requestAnimationFrame(step)
    }

    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [enabled, playing])

  const toggle = useCallback(() => setPlaying((p) => !p), [])
  const reset = useCallback(() => resetRef.current?.(), [])

  return { playing, toggle, reset }
}

/**
 * Advance a looping parameter value by `delta` seconds at `speed` units per second,
 * wrapping at `loop` back to `min`.
 */
export function advanceLooping(
  current: number,
  delta: number,
  speed: number,
  loop: number,
  min = 0
): number {
  if (loop <= min) return current
  const span = loop - min
  const next = current + delta * speed
  return min + (((next - min) % span) + span) % span
}
