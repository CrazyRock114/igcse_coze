-- 0003_teacher_role.sql
-- IGCSE Science — adds the "teacher" role so a signed-in user can see
-- (but not modify) every other user's learning data.
--
-- How it works:
--   * profiles.is_teacher is a boolean flag, default false. A user with
--     this flag set on their own row can SELECT from the per-user
--     tables (word_bank, mistakes, statement_progress, hook_ratings)
--     and can SELECT from profiles across all users.
--   * The flag is toggled in the app via a UserMenu dropdown — a single
--     UPDATE on the user's own profiles row. RLS already allows that.
--   * Teachers can READ across all users but cannot WRITE/DELETE
--     others' rows. The existing per-user policies still apply for
--     INSERT / UPDATE / DELETE.
--
-- Run after 0001_init.sql and 0002_statement_progress.sql. Idempotent
-- within a fresh project.

-- ============================================================================
-- 1. profiles.is_teacher
-- ============================================================================
alter table public.profiles
  add column if not exists is_teacher boolean not null default false;

comment on column public.profiles.is_teacher is
  'When true, this user can SELECT (read-only) every other user''s learning data via the teacher dashboard. Toggle in the UserMenu; only affects SELECT, never INSERT/UPDATE/DELETE.';

-- ============================================================================
-- 2. profiles SELECT — let teachers see every other user
-- ============================================================================
create policy "Profiles: teachers can read all"
  on public.profiles for select
  using (
    exists (
      select 1 from public.profiles me
      where me.id = auth.uid() and me.is_teacher = true
    )
  );

-- The original "Profiles: read own" policy is still in place from 0001;
-- both apply together (RLS OR-s the policies).

-- ============================================================================
-- 3. per-user tables — add a teacher-read SELECT policy to each
-- ============================================================================

-- word_bank: teacher can SELECT every row.
create policy "Word bank: teachers can read all"
  on public.word_bank for select
  using (
    exists (
      select 1 from public.profiles me
      where me.id = auth.uid() and me.is_teacher = true
    )
  );

-- mistakes: same.
create policy "Mistakes: teachers can read all"
  on public.mistakes for select
  using (
    exists (
      select 1 from public.profiles me
      where me.id = auth.uid() and me.is_teacher = true
    )
  );

-- statement_progress: same.
create policy "Statement progress: teachers can read all"
  on public.statement_progress for select
  using (
    exists (
      select 1 from public.profiles me
      where me.id = auth.uid() and me.is_teacher = true
    )
  );

-- hook_ratings: same.
create policy "Hook ratings: teachers can read all"
  on public.hook_ratings for select
  using (
    exists (
      select 1 from public.profiles me
      where me.id = auth.uid() and me.is_teacher = true
    )
  );

-- The existing per-user SELECT/INSERT/UPDATE/DELETE policies from 0001
-- and 0002 still apply — teachers gain read access but never write
-- access to other users' rows.

-- ============================================================================
-- 4. Helpful index — speeding up the teacher-read filter
-- ============================================================================
-- The EXISTS subquery in every teacher policy scans profiles to find
-- the caller's row. With many users this could slow down SELECTs; a
-- tiny index keeps the inner lookup O(1).
create index if not exists profiles_teacher_idx
  on public.profiles (id) where is_teacher = true;
