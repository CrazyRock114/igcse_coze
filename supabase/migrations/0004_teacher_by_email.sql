-- 0004_teacher_by_email.sql
-- IGCSE Science — replaces the per-user "is_teacher" flag with an
-- email-based check, so a user can no longer self-promote to teacher.
--
-- The previous model (migrations/0003) let any signed-in user set
-- their own profiles.is_teacher column via a UserMenu toggle, and the
-- RLS policies granted "teacher" access to anyone with that flag. The
-- flag itself is the bug: anyone can flip their own row.
--
-- The new model: the teacher is whoever's auth.users.email matches a
-- single hard-coded value. RLS policies use the JWT's email claim to
-- decide, so a non-teacher signed-in user physically cannot SELECT
-- other students' data — the database refuses, not the UI.
--
-- If the teacher email ever changes, edit the literal in this file and
-- re-run. RLS policies recreate with the new value.
--
-- Run after 0001, 0002, 0003. Idempotent within a fresh project.

-- ============================================================================
-- 1. Drop the policies that referenced profiles.is_teacher
-- ============================================================================
drop policy if exists "Profiles: teachers can read all" on public.profiles;
drop policy if exists "Word bank: teachers can read all" on public.word_bank;
drop policy if exists "Mistakes: teachers can read all" on public.mistakes;
drop policy if exists "Statement progress: teachers can read all" on public.statement_progress;
drop policy if exists "Hook ratings: teachers can read all" on public.hook_ratings;

-- ============================================================================
-- 2. Re-create with email-based check via the JWT
-- ============================================================================
-- `auth.jwt()` returns the current request's claims. The `email` claim is
-- set by Supabase Auth at sign-in time. This works for RLS because the
-- JWT is verified on every request, and `auth.jwt()` is a stable,
-- security-definer accessor that returns the calling user's claims.
--
-- Only this single email can SELECT across all rows in any per-user
-- table. No one — not even an admin via the SQL editor — can grant
-- themselves teacher access without first editing this file.

create policy "Profiles: teachers can read all"
  on public.profiles for select
  using ((auth.jwt() ->> 'email') = 'crazyrock2021@qq.com');

create policy "Word bank: teachers can read all"
  on public.word_bank for select
  using ((auth.jwt() ->> 'email') = 'crazyrock2021@qq.com');

create policy "Mistakes: teachers can read all"
  on public.mistakes for select
  using ((auth.jwt() ->> 'email') = 'crazyrock2021@qq.com');

create policy "Statement progress: teachers can read all"
  on public.statement_progress for select
  using ((auth.jwt() ->> 'email') = 'crazyrock2021@qq.com');

create policy "Hook ratings: teachers can read all"
  on public.hook_ratings for select
  using ((auth.jwt() ->> 'email') = 'crazyrock2021@qq.com');

-- ============================================================================
-- 3. Drop the is_teacher column — it was the vulnerability surface
-- ============================================================================
alter table public.profiles drop column if exists is_teacher;
drop index if exists profiles_teacher_idx;
