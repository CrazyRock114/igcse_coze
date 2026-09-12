-- 0005_word_bank_srs.sql
-- IGCSE Science — add SRS (SM-2 lite) fields to word_bank.
--
-- The vocabulary module now spaces reviews using SM-2. Each row gets:
--   interval      days until next review (0 = new, no schedule yet)
--   ease          multiplier on interval, default 2.5
--   repetitions   consecutive correct reviews since last lapse
--   lapses        total times the user has answered "don't know"
--   next_due      when this word should next appear in the review queue
--
-- Existing rows get sensible defaults: treated as a fresh word (interval=0,
-- repetitions=0) unless they have a last_reviewed timestamp, in which case
-- they're spaced to one week out — same as the old client-side heuristic.

alter table public.word_bank
  add column if not exists interval integer not null default 0,
  add column if not exists ease double precision not null default 2.5,
  add column if not exists repetitions integer not null default 0,
  add column if not exists lapses integer not null default 0,
  add column if not exists next_due timestamptz;

-- Backfill: rows that have been reviewed at least once get a 6-day
-- interval, putting their next review one week after their last review.
update public.word_bank
  set
    interval = 6,
    ease = 2.5,
    repetitions = 2,
    next_due = last_reviewed + interval '6 days'
  where last_reviewed is not null and next_due is null;

create index if not exists word_bank_due_idx
  on public.word_bank (user_id, next_due);
