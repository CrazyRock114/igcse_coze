-- 0002_statement_progress.sql
-- IGCSE Science — per-user progress on syllabus statements.
--
-- One row per (user, statement_id). Tracks whether the student has
-- SEEN the statement (opened a lesson that covers it) and whether they
-- have PRACTICED it (attempted a question, with wrong counts).
--
-- Backs the "Your study so far" card and the user-coloured overlay on
-- the HomePage syllabus map. Without this, the map shows "course has a
-- lesson for this statement" — that is a developer-side fact, not a
-- student-side fact. With this table, the same map can show two layers
-- at once: outer ring = course, inner fill = the student.
--
-- Run after 0001_init.sql. Idempotent within a fresh project.

-- ============================================================================
-- 1. statement_progress — per-user state on each syllabus statement
-- ============================================================================
create table public.statement_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  -- The IGCSE statement id, e.g. '7.1.1' or 'B1.1'. Matches lesson.syllabus[].
  statement_id text not null,
  -- Subject code, e.g. '0610'. Used so the same student can later
  -- have progress in multiple syllabuses.
  subject text not null,

  -- "I have opened a lesson that covers this"
  first_seen_at timestamptz,
  last_seen_at timestamptz,
  seen_count integer not null default 0,

  -- "I have practised a question in this lesson"
  attempts integer not null default 0,
  wrong_count integer not null default 0,
  last_attempt_at timestamptz,
  last_wrong_at timestamptz,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  -- One row per (user, statement). Re-engagement updates the row in place.
  unique (user_id, statement_id)
);

create index statement_progress_user_idx
  on public.statement_progress (user_id);

create index statement_progress_recent_idx
  on public.statement_progress (user_id, last_seen_at desc);

comment on table public.statement_progress is
  'Per-user progress on each syllabus statement. Tracks seen + attempts + wrong so the home page can show a real personal view of the syllabus map, not just course coverage.';

-- ============================================================================
-- 2. Row Level Security
-- ============================================================================
alter table public.statement_progress enable row level security;

create policy "Statement progress: full access to own"
  on public.statement_progress for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ============================================================================
-- 3. updated_at trigger (reuses set_updated_at from 0001)
-- ============================================================================
create trigger statement_progress_updated_at
  before update on public.statement_progress
  for each row execute function public.set_updated_at();
