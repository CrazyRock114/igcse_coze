/**
 * Auth types — the minimal user-facing identity we care about.
 *
 * We don't expose Supabase's User object directly because the app only
 * needs a handful of fields. Decoupling the type from Supabase also
 * means swapping auth provider is a 30-line change.
 */

export interface AuthSession {
  userId: string
  email: string
  displayName: string
  emoji: string
  /** Whether this user has teacher privileges (read-only access to all
   *  students' learning data). Set via the UserMenu toggle. */
  isTeacher: boolean
}

/** What the user typed into the sign-up form. */
export interface SignUpInput {
  email: string
  password: string
  displayName: string
  emoji: string
}
