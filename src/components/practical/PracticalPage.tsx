import { lazy, Suspense, useState } from 'react'
import { Link } from 'react-router-dom'
import { T } from '@/components/i18n/T'
import { APPARATUS } from '@/content/practical/apparatus'
import { checkReading, makeMeasuringTask } from '@/content/practical/kernel'
import { PRACTICAL } from '@/lib/practicalStrings'
import { ApparatusArt } from './ApparatusArt'

const GraphTrainer = lazy(() => import('./GraphTrainer').then((m) => ({ default: m.GraphTrainer })))

function MeasuringDrill() {
  const [seed, setSeed] = useState(1)
  const [answer, setAnswer] = useState('')
  const [result, setResult] = useState<'idle' | 'ok' | 'bad'>('idle')
  const [streak, setStreak] = useState(0)
  const task = makeMeasuringTask(seed)

  function check() {
    const v = Number.parseFloat(answer)
    if (Number.isNaN(v)) return
    const ok = checkReading(task, v)
    setResult(ok ? 'ok' : 'bad')
    if (ok) setStreak((s) => s + 1)
    else setStreak(0)
  }

  function next() {
    setSeed((s) => s + 1)
    setAnswer('')
    setResult('idle')
  }

  // scale geometry (shared by both instrument kinds)
  const H = 220
  const rel = (task.liquidValue - task.minValue) / (task.maxValue - task.minValue)
  const levelY = 16 + (1 - rel) * H

  const majors: number[] = []
  for (let v = task.minValue; v <= task.maxValue + 1e-9; v += task.majorEvery) majors.push(Number(v.toFixed(6)))
  const minors: number[] = []
  for (let v = task.minValue; v <= task.maxValue + 1e-9; v += task.minorValue) minors.push(Number(v.toFixed(6)))

  return (
    <section className="rounded-xl border border-line bg-surface p-5">
      <h3 className="text-lg font-semibold text-ink">
        <T value={PRACTICAL.drillHeading} />
      </h3>
      <p className="mt-1 text-sm text-ink/70" data-zh>
        <T value={PRACTICAL.drillIntro} />
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-6">
        <svg viewBox="0 0 120 260" className="h-64" role="img" aria-label={task.kind}>
          {task.kind === 'cylinder' ? (
            <>
              <path d="M40 20h40v200a6 6 0 0 1-6 6H46a6 6 0 0 1-6-6z" fill="none" stroke="currentColor" strokeWidth="2" />
              {minors.map((v) => (
                <line key={v} x1={majors.includes(v) ? 52 : 62} y1={16 + (1 - (v - task.minValue) / (task.maxValue - task.minValue)) * H} x2={80} y2={16 + (1 - (v - task.minValue) / (task.maxValue - task.minValue)) * H} stroke="currentColor" strokeWidth={majors.includes(v) ? 1.5 : 0.8} opacity="0.8" />
              ))}
              <rect x="41.5" y={levelY} width="37" height={226 - levelY} fill="#38bdf8" opacity="0.3" />
              <ellipse cx="60" cy={levelY} rx="18.5" ry="3" fill="#38bdf8" opacity="0.45" />
            </>
          ) : (
            <>
              <circle cx="60" cy="226" r="12" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M54 216V28a6 6 0 0 1 12 0v188" fill="none" stroke="currentColor" strokeWidth="2" />
              <rect x="58" y={levelY} width="4" height={210 - levelY} fill="#ef4444" opacity="0.75" />
              <circle cx="60" cy="226" r="8" fill="#ef4444" opacity="0.75" />
              {majors.map((v) => {
                const y = 16 + (1 - (v - task.minValue) / (task.maxValue - task.minValue)) * H
                return (
                  <g key={v}>
                    <line x1="66" y1={y} x2="78" y2={y} stroke="currentColor" strokeWidth="1.5" opacity="0.8" />
                    <text x="82" y={y + 4} fontSize="11" fill="currentColor" opacity="0.9">
                      {v}
                    </text>
                  </g>
                )
              })}
            </>
          )}
        </svg>

        <div className="flex flex-col gap-2">
          <label className="text-sm text-ink/80">
            <T value={PRACTICAL.yourReading} /> ({task.unitLabel}):
            <input
              type="number"
              step="any"
              value={answer}
              onChange={(e) => {
                setAnswer(e.target.value)
                if (result !== 'idle') setResult('idle')
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') check()
              }}
              className="ml-2 w-28 rounded-md border border-line bg-white/5 px-2 py-1 font-mono text-ink focus:border-accent focus:outline-none"
            />
          </label>
          <div className="flex items-center gap-2">
            {result === 'idle' && (
              <button type="button" onClick={check} className="rounded-md bg-ink px-4 py-1.5 text-sm font-medium text-white hover:opacity-90">
                <T value={PRACTICAL.submit} />
              </button>
            )}
            {result !== 'idle' && (
              <button type="button" onClick={next} className="rounded-md bg-ink px-4 py-1.5 text-sm font-medium text-white hover:opacity-90">
                <T value={PRACTICAL.next} />
              </button>
            )}
            {streak > 1 && (
              <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs text-emerald-500">
                {streak}× <T value={PRACTICAL.streak} />
              </span>
            )}
          </div>
          {result === 'ok' && (
            <p className="text-sm text-emerald-500" data-zh>
              <T value={PRACTICAL.correct} />
            </p>
          )}
          {result === 'bad' && (
            <p className="text-sm text-rose-500" data-zh>
              <T value={PRACTICAL.incorrect} /> <T value={PRACTICAL.expectedWas} /> <strong className="font-mono">{task.liquidValue} {task.unitLabel}</strong>
              <span className="ml-1 text-xs text-ink/60">(<T value={PRACTICAL.toleranceHint} />)</span>
            </p>
          )}
        </div>
      </div>
    </section>
  )
}

export default function PracticalPage() {
  const [tab, setTab] = useState<'apparatus' | 'graph'>('apparatus')

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-ink">
            <T value={PRACTICAL.heading} />
          </h1>
          <p className="mt-1 text-sm text-ink/70" data-zh>
            <T value={PRACTICAL.intro} />
          </p>
        </div>
        <Link to="/" className="shrink-0 rounded-md border border-line px-3 py-1.5 text-sm text-ink/80 hover:bg-white/10">
          <T value={PRACTICAL.backHome} />
        </Link>
      </div>

      <div className="mt-5 flex gap-2" role="tablist">
        {(['apparatus', 'graph'] as const).map((t) => (
          <button
            key={t}
            type="button"
            role="tab"
            aria-selected={tab === t}
            onClick={() => setTab(t)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              tab === t ? 'bg-ink text-white' : 'border border-line text-ink/70 hover:bg-white/10'
            }`}
          >
            <T value={t === 'apparatus' ? PRACTICAL.tabApparatus : PRACTICAL.tabGraph} />
          </button>
        ))}
      </div>

      {tab === 'apparatus' ? (
        <div className="mt-4 space-y-5">
          <section className="rounded-xl border border-line bg-surface p-5">
            <h3 className="text-lg font-semibold text-ink">
              <T value={PRACTICAL.apparatusHeading} />
            </h3>
            <p className="mt-1 text-sm text-ink/70" data-zh>
              <T value={PRACTICAL.apparatusIntro} />
            </p>
            <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {APPARATUS.map((a) => (
                <li key={a.id} className="rounded-lg border border-line bg-white/5 p-3">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 text-accent">
                      <ApparatusArt id={a.id} />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-ink">
                        {a.name.en}
                        <span className="ml-2 text-xs text-ink/50" data-zh>
                          {a.name.zh}
                        </span>
                      </p>
                      <p className="mt-0.5 text-xs text-ink/70">{a.purpose.en}</p>
                      <p className="text-xs text-ink/50" data-zh>
                        {a.purpose.zh}
                      </p>
                      <p className="mt-1 rounded bg-accent/10 px-2 py-1 text-xs text-accent" data-zh>
                        {a.tip.zh}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
          <MeasuringDrill />
        </div>
      ) : (
        <div className="mt-4">
          <Suspense fallback={<div className="h-64 animate-pulse rounded-xl bg-white/5" />}>
            <GraphTrainer />
          </Suspense>
        </div>
      )}
    </main>
  )
}
