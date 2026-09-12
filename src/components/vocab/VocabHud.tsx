/**
 * Vocab page HUD — the "today" chip strip that sits in the page header.
 *
 * Shows the streak, today's review count, and lifetime totals. Clicks
 * jump to the right tab. The HUD is the entry point: a student who
 * only glances at /vocab should still see "12 due today, 5-day streak"
 * and know what to do next.
 */
import { useMemo } from 'react'
import { T } from '@/components/i18n/T'
import { useWordBank } from '@/lib/useVocab'
import { useStreak, streakLabel } from '@/lib/useStreak'
import { useNow } from '@/lib/useNow'
import { VOCAB } from '@/lib/vocabStrings'
import type { VocabScope } from '@/pages/VocabPage'

export function VocabHud({ scope }: { scope?: VocabScope }) {
  const { words, stats } = useWordBank()
  const streak = useStreak()
  const now = useNow()

  // Recompute "due today" against the in-scope words. The `now` tick
  // (set up in useNow) drives the refresh — never call Date.now()
  // during render.
  const scopedStats = useMemo(() => {
    if (!scope) return { due: stats.dueToday, total: stats.total }
    const scoped = words.filter((w) => {
      if (scope.subject !== 'all' && w.subject !== scope.subject) return false
      if (scope.slug !== 'all' && w.slug !== scope.slug) return false
      return true
    })
    return {
      due: now ? scoped.filter((w) => w.nextDue === 0 || w.nextDue <= now).length : 0,
      total: scoped.length,
    }
  }, [words, scope, stats.dueToday, stats.total, now])

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-lg border border-line bg-canvas px-3 py-1.5 text-xs">
      <span title="Day streak (≥1 review per day)" className="font-mono text-base">
        🔥 <span className="text-ink">{streakLabel(streak)}</span>
      </span>
      <span className="text-muted">
        <T value={VOCAB.statDueToday} />{' '}
        <span
          className={
            'font-mono ' + (scopedStats.due > 0 ? 'text-amber-700' : 'text-ink-soft')
          }
        >
          {scopedStats.due}
        </span>
        {scope && (scope.subject !== 'all' || scope.slug !== 'all') && (
          <span className="ml-1 text-[10px] text-muted">
            / {scopedStats.total}
          </span>
        )}
      </span>
      <span className="text-muted">
        XP <span className="font-mono text-ink">{streak.xp}</span>
      </span>
      {stats.lapsedCount > 0 && (
        <span className="rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-semibold text-rose-700">
          <T value={VOCAB.statLapsed} /> {stats.lapsedCount}
        </span>
      )}
    </div>
  )
}
