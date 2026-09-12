/**
 * Auth — sign-up / sign-in / sign-out + a snapshot of the current user.
 *
 * Supabase manages the actual session (token + refresh). This module
 * exposes a small read-friendly view of it (`AuthSession`) plus the
 * three actions the UI needs: signUp, signIn, signOut.
 *
 * The session is also mirrored to localStorage under a small key so the
 * header can render the right "Sign in" / "Signed in as X" state on
 * first paint, before Supabase has had a chance to read its cookie.
 *
 * Errors are returned as `string` (not thrown) so the UI can surface
 * them inline without try/catch noise.
 */

import type { AuthSession, SignUpInput } from './authTypes'
import { supabase } from './supabase'
import { TEACHER_EMAIL } from './teacher'

const SESSION_CACHE_KEY = 'igcse.auth.cached.v1'

interface CachedSession {
  userId: string
  email: string
  displayName: string
  emoji: string
  isTeacher: boolean
}

function readCache(): AuthSession | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(SESSION_CACHE_KEY)
    if (!raw) return null
    const c = JSON.parse(raw) as CachedSession
    if (!c.userId || !c.email) return null
    return c
  } catch {
    return null
  }
}

function writeCache(s: AuthSession | null): void {
  if (typeof window === 'undefined') return
  try {
    if (s) {
      window.localStorage.setItem(SESSION_CACHE_KEY, JSON.stringify(s))
    } else {
      window.localStorage.removeItem(SESSION_CACHE_KEY)
    }
  } catch {
    // Quota / private mode — silently degrade.
  }
}

const SESSION_CHANGED_EVENT = 'igcse:auth-changed'

/** Read the current session (cached snapshot, no network call). */
export function getCachedSession(): AuthSession | null {
  return readCache()
}

/** Notify subscribers that the session has changed. */
export function emitAuthChanged(): void {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(SESSION_CHANGED_EVENT))
  }
}

export const SESSION_EVENT = SESSION_CHANGED_EVENT

function profileToSession(
  userId: string,
  email: string,
  profile: { display_name: string; emoji: string } | null
): AuthSession {
  return {
    userId,
    email,
    displayName: profile?.display_name ?? email.split('@')[0] ?? 'User',
    emoji: profile?.emoji ?? '👤',
    // Teacher status is decided by the JWT email claim, not a stored
    // column. See migrations/0004_teacher_by_email.sql for the RLS
    // counterpart — both must agree.
    isTeacher: email === TEACHER_EMAIL,
  }
}

/**
 * Fetch the current session from Supabase (network call) and update the
 * cache. Returns null if no one is signed in.
 */
export async function loadSession(): Promise<AuthSession | null> {
  const { data, error } = await supabase.auth.getSession()
  if (error) {
    writeCache(null)
    return null
  }
  const session = data.session
  if (!session) {
    writeCache(null)
    return null
  }
  const userId = session.user.id
  const email = session.user.email ?? ''
  // The on-signup trigger creates a profile row; read it.
  // Note: we deliberately do NOT read is_teacher — that column is gone
  // (see 0004). Teacher status is decided by the JWT email claim.
  const { data: profile } = await supabase
    .from('profiles')
    .select('display_name, emoji')
    .eq('id', userId)
    .maybeSingle()
  const s = profileToSession(userId, email, profile)
  writeCache(s)
  return s
}

export async function signIn(email: string, password: string): Promise<{ ok: true; session: AuthSession } | { ok: false; error: string }> {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) return { ok: false, error: error.message }
  if (!data.session) return { ok: false, error: 'No session returned' }
  const session = await loadSession()
  if (!session) return { ok: false, error: 'Could not load profile' }
  emitAuthChanged()
  return { ok: true, session }
}

export async function signUp(input: SignUpInput): Promise<{ ok: true; session: AuthSession } | { ok: false; error: string }> {
  const { data, error } = await supabase.auth.signUp({
    email: input.email,
    password: input.password,
    options: {
      // The handle_new_user() trigger reads display_name from here to
      // populate the profiles row. emoji is patched in below.
      data: { display_name: input.displayName, emoji: input.emoji },
    },
  })
  if (error) return { ok: false, error: error.message }
  // The classic Supabase gotcha: if "Confirm email" is ON in the dashboard,
  // signUp creates the user but does NOT return a session until they click
  // the confirmation link. We detect this by `user` being non-null while
  // `session` is null, and tell the user what to do.
  if (!data.session) {
    if (data.user) {
      return {
        ok: false,
        error:
          'Account created, but email confirmation is required. Check ' +
          'your inbox (and spam) for a confirmation link, then sign in. ' +
          'For local dev you can disable this in Supabase → Authentication → ' +
          'Providers → Email → "Confirm email".',
      }
    }
    return { ok: false, error: 'Sign-up succeeded but no session was returned.' }
  }
  // The trigger may not have fired yet (it depends on timing). Patch the
  // emoji explicitly so the row has the user-picked value.
  const { error: profileErr } = await supabase
    .from('profiles')
    .update({ display_name: input.displayName, emoji: input.emoji })
    .eq('id', data.session.user.id)
  if (profileErr) {
    // Non-fatal — the trigger row exists; the user can change emoji later.
    console.warn('Failed to patch profile:', profileErr.message)
  }
  const session = await loadSession()
  if (!session) return { ok: false, error: 'Could not load profile' }
  emitAuthChanged()
  return { ok: true, session }
}

export async function signOut(): Promise<void> {
  await supabase.auth.signOut()
  writeCache(null)
  emitAuthChanged()
}

/** Update the user's display name and emoji. */
export async function updateProfile(patch: { displayName?: string; emoji?: string }): Promise<{ ok: boolean; error?: string }> {
  const session = readCache()
  if (!session) return { ok: false, error: 'Not signed in' }
  const db: Record<string, string> = {}
  if (patch.displayName !== undefined) db.display_name = patch.displayName
  if (patch.emoji !== undefined) db.emoji = patch.emoji
  const { error } = await supabase.from('profiles').update(db).eq('id', session.userId)
  if (error) return { ok: false, error: error.message }
  // Refresh the cache. isTeacher is left as-is because it's derived
  // from the JWT email and only changes when the user signs in/out.
  const next: AuthSession = {
    ...session,
    ...(patch.displayName !== undefined ? { displayName: patch.displayName } : {}),
    ...(patch.emoji !== undefined ? { emoji: patch.emoji } : {}),
  }
  writeCache(next)
  emitAuthChanged()
  return { ok: true }
}
