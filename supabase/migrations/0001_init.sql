-- 0001_init.sql
-- IGCSE Science — Supabase schema for per-user state.
--
-- This migration sets up three tables that back the localStorage stores
-- we built first (vocab bank, mistake log, hook ratings). Every row is
-- scoped to a Supabase auth user via Row Level Security — students can
-- only read and write their own data, period.
--
-- Run this in the Supabase SQL Editor after creating the project. The
-- project needs Auth enabled (it's on by default for new projects).

-- ============================================================================
-- 1. profiles — public-side metadata for each auth user
-- ============================================================================
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null,
  emoji text not null default '👤',
  -- The lesson subject this account focuses on (e.g. '0610' for Biology).
  -- Optional; if null the app defaults to Biology 0610.
  subject text,
  -- Free-form, in case we want to add per-user preferences later.
  preferences jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.profiles is
  'Public profile data for each signed-in user. One row per auth.users row.';

-- A trigger to keep updated_at fresh, and to auto-create a profile row
-- when a new auth user signs up.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name, emoji)
  values (new.id, coalesce(new.raw_user_meta_data->>'display_name', 'New user'), '👤')
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================================
-- 2. word_bank — the user's saved vocab terms (per-lesson)
-- ============================================================================
create table public.word_bank (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  term_id text not null,
  -- The lesson the term came from, e.g. '0610' / '7-1-nutrition'.
  subject text not null,
  slug text not null,
  status text not null default 'new'
    check (status in ('new', 'learning', 'known')),
  note text,
  added_at timestamptz not null default now(),
  last_reviewed timestamptz,
  review_count integer not null default 0,
  -- One row per (user, term, lesson). Re-saving the same term does not
  -- create a second row.
  unique (user_id, subject, slug, term_id)
);

create index word_bank_user_idx on public.word_bank (user_id);
create index word_bank_status_idx on public.word_bank (user_id, status);

comment on table public.word_bank is
  'Vocabulary terms the user has saved, scoped to a lesson.';

-- ============================================================================
-- 3. mistakes — every wrong checkpoint answer
-- ============================================================================
create table public.mistakes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  question_id text not null,
  subject text not null,
  slug text not null,
  picked_index integer not null,
  picked_text text not null,
  correct_index integer not null,
  correct_text text not null,
  first_seen timestamptz not null default now(),
  last_seen timestamptz not null default now(),
  attempt_count integer not null default 1,
  resolved boolean not null default false,
  resolved_at timestamptz,
  -- One row per (user, question). Re-wrong updates the row in place.
  unique (user_id, question_id)
);

create index mistakes_user_idx on public.mistakes (user_id);
create index mistakes_unresolved_idx
  on public.mistakes (user_id, resolved, last_seen desc);

comment on table public.mistakes is
  'Every wrong checkpoint answer the user has made. One row per questionId.';

-- ============================================================================
-- 4. hook_ratings — optional, for when we wire the hook bank to UI
-- ============================================================================
create table public.hook_ratings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  hook_id text not null,
  -- thumbs up / down. Lets the teacher see which hooks actually land.
  rating text not null check (rating in ('up', 'down')),
  rated_at timestamptz not null default now(),
  unique (user_id, hook_id)
);

create index hook_ratings_user_idx on public.hook_ratings (user_id);

comment on table public.hook_ratings is
  'Per-user thumbs up/down on classroom hooks. Used to surface what actually lands.';

-- ============================================================================
-- 5. Row Level Security — every table is per-user
-- ============================================================================
alter table public.profiles     enable row level security;
alter table public.word_bank    enable row level security;
alter table public.mistakes     enable row level security;
alter table public.hook_ratings enable row level security;

create policy "Profiles: read own"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Profiles: update own"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

create policy "Word bank: full access to own"
  on public.word_bank for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Mistakes: full access to own"
  on public.mistakes for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Hook ratings: full access to own"
  on public.hook_ratings for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ============================================================================
-- 6. updated_at trigger
-- ============================================================================
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();
