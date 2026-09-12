/**
 * Supabase client singleton.
 *
 * The URL and anon key are public — they ship in the JS bundle and anyone
 * can read them. The RLS policies on every per-user table (profiles,
 * word_bank, mistakes, hook_ratings) are what actually keep data safe: a
 * key without a matching `auth.uid()` is worthless for read/write.
 *
 * If the env vars are missing, we still export a `supabase` object — but
 * with a dummy URL/key, so any auth call will fail fast and clearly in
 * the network tab. Better than crashing the whole app.
 */
import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL ?? 'https://missing.supabase.co'
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? 'missing-anon-key'

export const isSupabaseConfigured: boolean =
  url !== 'https://missing.supabase.co' && anonKey !== 'missing-anon-key'

export const supabase: SupabaseClient = createClient(url, anonKey, {
  auth: {
    // Persist the session in localStorage. Supabase's default is also
    // localStorage, but being explicit makes the contract obvious.
    storageKey: 'igcse.supabase.session',
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
})
