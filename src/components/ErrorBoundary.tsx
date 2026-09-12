/**
 * ErrorBoundary — a tiny class component that catches render-time
 * errors in its children and renders a recovery message instead of
 * a white screen. The /vocab page in particular can hit a render
 * crash on stale localStorage from an older bundle (the SRS migration
 * from commit 518341f changed the WordEntry shape — entries written
 * by the old bundle won't have the new fields, and any code that
 * reads them can throw). Without a boundary the user sees nothing
 * and there's no way out except to clear site data manually.
 *
 * The boundary exposes two recovery actions:
 *   - "Hard refresh": just reloads the page. Picks up the new bundle.
 *   - "Reset vocab data": clears the three localStorage keys the
 *     vocab / mistake / progress stores use, so the next mount sees
 *     a clean slate. This is the nuclear option but it always
 *     recovers from a corrupted state.
 */
import { Component, type ErrorInfo, type ReactNode } from 'react'
import { T } from '@/components/i18n/T'
import { VOCAB } from '@/lib/vocabStrings'

const STORAGE_KEYS = [
  'igcse.vocab.wordbank.v1',
  'igcse.vocab.streak.v1',
  'igcse.mistakes.v1',
  'igcse.statement-progress.v1',
]

interface State {
  error: Error | null
}

interface Props {
  children: ReactNode
  /** What page broke. Surfaces in the recovery message. */
  label?: string
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('ErrorBoundary caught:', error, info)
  }

  private handleHardRefresh = (): void => {
    window.location.reload()
  }

  private handleResetVocab = (): void => {
    if (
      window.confirm(
        'This will clear your word bank, mistake log, study streak, and per-statement progress on this device. Continue?'
      )
    ) {
      for (const k of STORAGE_KEYS) {
        try {
          window.localStorage.removeItem(k)
        } catch {
          // ignore
        }
      }
      window.location.reload()
    }
  }

  render() {
    const { error } = this.state
    if (!error) return this.props.children
    return (
      <div className="rounded-xl border border-rose-300 bg-rose-50 p-6 text-rose-900">
        <h2 className="text-lg font-semibold">
          <T value={VOCAB.errorTitle} />
        </h2>
        <p className="mt-1 text-sm">
          <T value={VOCAB.errorBody} />
          {this.props.label ? ` (${this.props.label})` : null}
        </p>
        <pre className="mt-3 max-h-40 overflow-auto rounded-md bg-rose-100 p-2 text-[11px] text-rose-900">
          {error.message}
          {error.stack ? `\n\n${error.stack.split('\n').slice(0, 6).join('\n')}` : null}
        </pre>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={this.handleHardRefresh}
            className="rounded-md bg-ink px-3 py-1.5 text-sm font-medium text-white hover:opacity-90"
          >
            <T value={VOCAB.errorHardRefresh} />
          </button>
          <button
            type="button"
            onClick={this.handleResetVocab}
            className="rounded-md border border-rose-400 bg-white px-3 py-1.5 text-sm font-medium text-rose-700 hover:bg-rose-100"
          >
            <T value={VOCAB.errorReset} />
          </button>
        </div>
      </div>
    )
  }
}
