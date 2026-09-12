import { Link } from 'react-router-dom'
import { T } from '@/components/i18n/T'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { useProgressSnapshot, formatRelativeTime } from '@/hooks/useProgressSnapshot'
import { VOCAB } from '@/lib/vocabStrings'
import { statementFillClass } from '@/lib/progressTypes'

/**
 * "Your study so far" — Tier 1 of the personal-progress layer.
 *
 * Shows the user the size of their local data, the most recent activity,
 * and a small visual map of how the syllabus map will colour for them.
 * This card is the first thing a signed-in student should see on the
 * home page; it answers "have I been doing anything?" without making
 * them dig into /vocab.
 */
export function ProgressCard() {
  const { session, ready: authReady } = useCurrentUser()
  const snap = useProgressSnapshot()

  if (!authReady) {
    return <div className="h-32 animate-pulse rounded-xl border border-line bg-canvas" aria-hidden="true" />
  }

  if (!session) {
    return (
      <div className="rounded-xl border border-line bg-surface p-4">
        <h2 className="text-sm font-medium text-ink-soft">
          <T value={VOCAB.progressTitle} />
        </h2>
        <p className="mt-2 text-sm text-ink-soft">
          <T value={VOCAB.progressSignedOutBody} />
        </p>
      </div>
    )
  }

  const lastSeen = snap.lastActivityAt > 0 ? formatRelativeTime(snap.lastActivityAt) : null
  const touched = snap.touchedStatementCount
  const mastered = snap.byStatus.mastered
  const struggling = snap.byStatus.struggling
  const hasData = snap.wordCount > 0 || snap.mistakeCount > 0 || touched > 0

  return (
    <div className="rounded-xl border border-line bg-surface p-4">
      <div className="flex items-baseline justify-between">
        <h2 className="text-sm font-medium text-ink-soft">
          <T value={VOCAB.progressTitle} />
        </h2>
        {lastSeen && (
          <span className="text-xs text-muted">
            <T value={VOCAB.progressLastSeen} params={{ time: lastSeen }} />
          </span>
        )}
      </div>

      {snap.dueTodayCount > 0 && (
        <a
          href="/vocab?tab=study"
          className="mt-3 flex items-center justify-between rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm hover:border-amber-400"
        >
          <span className="text-ink">
            <T value={VOCAB.statDueToday} />:{' '}
            <span className="font-mono text-base font-semibold text-amber-700">
              {snap.dueTodayCount}
            </span>
          </span>
          <span className="text-xs text-amber-700">→ <T value={VOCAB.statStartReview} /></span>
        </a>
      )}

      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        <Stat
          label={<T value={VOCAB.progressWords} />}
          value={snap.wordCount}
          {...(snap.wordCount > 0
            ? { cta: { to: '/vocab?tab=bank', label: <T value={VOCAB.progressOpenBank} /> } }
            : {})}
        />
        <Stat
          label={<T value={VOCAB.progressMistakes} />}
          value={snap.mistakeCount}
          {...(snap.unresolvedMistakeCount > 0
            ? { hint: `${snap.unresolvedMistakeCount} still wrong` }
            : snap.mistakeCount > 0
              ? { hint: 'all resolved' }
              : {})}
          {...(snap.mistakeCount > 0
            ? { cta: { to: '/vocab?tab=mistakes', label: <T value={VOCAB.progressOpenMistakes} /> } }
            : {})}
        />
        <Stat
          label={<T value={VOCAB.progressStatements} />}
          value={touched}
          {...(touched > 0
            ? { hint: `${mastered} mastered · ${struggling} struggling` }
            : { hint: 'Open any lesson to start tracking.' })}
        />
      </div>

      {hasData && (
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted">
          <span>
            <T value={VOCAB.progressMapLegend} />
          </span>
          <Swatch className={statementFillClass('untouched')} />
          <Swatch className={statementFillClass('seen')} />
          <Swatch className={statementFillClass('practising')} />
          <Swatch className={statementFillClass('struggling')} />
          <Swatch className={statementFillClass('mastered')} />
        </div>
      )}
    </div>
  )
}

interface StatProps {
  label: React.ReactNode
  value: number
  hint?: string | null
  cta?: { to: string; label: React.ReactNode } | undefined
}

function Stat({ label, value, hint, cta }: StatProps) {
  return (
    <div className="rounded-lg border border-line bg-canvas/50 p-3">
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-1 font-mono text-2xl font-semibold text-ink">{value}</p>
      {hint && <p className="mt-0.5 text-xs text-muted">{hint}</p>}
      {cta && (
        <Link to={cta.to} className="mt-2 inline-block text-xs text-accent hover:underline">
          {cta.label} →
        </Link>
      )}
    </div>
  )
}

function Swatch({ className }: { className: string }) {
  return <span className={`inline-block size-2.5 rounded-sm ${className}`} aria-hidden="true" />
}
