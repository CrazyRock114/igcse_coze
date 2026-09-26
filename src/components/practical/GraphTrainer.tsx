import { useMemo, useState, type MouseEvent as ReactMouseEvent } from 'react'
import { T } from '@/components/i18n/T'
import { gradePlot, bestFitLine, type PlotPoint } from '@/content/practical/kernel'
import { PLOT_TASKS, type PlotTask } from '@/content/practical/plotTasks'
import { PRACTICAL } from '@/lib/practicalStrings'

const CELL = 20 // px per small square
const PAD = 34 // px margin for axis labels

function toSvgX(task: PlotTask, x: number): number {
  return PAD + ((x - task.xMin) / task.xMinor) * CELL
}
function toSvgY(task: PlotTask, y: number): number {
  return PAD + ((task.yMax - y) / task.yMinor) * CELL
}
function fromSvg(task: PlotTask, px: number, py: number): PlotPoint {
  const x = task.xMin + ((px - PAD) / CELL) * task.xMinor
  const y = task.yMax - ((py - PAD) / CELL) * task.yMinor
  // snap to quarter of a small square so close clicks are forgiving
  const q = 0.25
  return {
    x: Math.round(x / q) * q,
    y: Math.round(y / q) * q,
  }
}

export function GraphTrainer() {
  const [taskIdx, setTaskIdx] = useState(0)
  const [plotted, setPlotted] = useState<PlotPoint[]>([])
  const [checked, setChecked] = useState(false)
  const task = PLOT_TASKS[taskIdx]!

  const width = PAD * 2 + ((task.xMax - task.xMin) / task.xMinor) * CELL
  const height = PAD * 2 + ((task.yMax - task.yMin) / task.yMinor) * CELL

  const myFit = useMemo(() => bestFitLine(plotted), [plotted])
  const idealFit = useMemo(() => bestFitLine(task.points), [task])
  const result = useMemo(() => (checked ? gradePlot(task, plotted) : null), [checked, task, plotted])

  function onClick(e: ReactMouseEvent<SVGSVGElement>) {
    if (checked) return
    const svg = e.currentTarget
    const rect = svg.getBoundingClientRect()
    const px = ((e.clientX - rect.left) / rect.width) * width
    const py = ((e.clientY - rect.top) / rect.height) * height
    if (px < PAD - 4 || py < PAD - 4 || px > width - PAD + 4 || py > height - PAD + 4) return
    setPlotted((prev) => [...prev, fromSvg(task, px, py)])
  }

  const yMajorLines: number[] = []
  for (let v = task.yMin; v <= task.yMax + 1e-9; v += task.yMinor * 2) yMajorLines.push(Number(v.toFixed(6)))
  const xMajorLines: number[] = []
  for (let v = task.xMin; v <= task.xMax + 1e-9; v += task.xMinor * 2) xMajorLines.push(Number(v.toFixed(6)))

  const fitPath = (fit: { m: number; b: number }) => {
    const x0 = task.xMin
    const x1 = task.xMax
    const y0 = fit.m * x0 + fit.b
    const y1 = fit.m * x1 + fit.b
    return `M ${toSvgX(task, x0)} ${toSvgY(task, y0)} L ${toSvgX(task, x1)} ${toSvgY(task, y1)}`
  }

  return (
    <section className="rounded-xl border border-line bg-surface p-5">
      <h3 className="text-lg font-semibold text-ink">
        <T value={PRACTICAL.graphHeading} />
      </h3>
      <p className="mt-1 text-sm text-ink/70" data-zh>
        <T value={PRACTICAL.graphIntro} />
      </p>

      <div className="mt-4 rounded-lg bg-white/5 p-4">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <p className="font-medium text-accent">
            {task.title.en} · {task.title.zh}
          </p>
          <button
            type="button"
            onClick={() => {
              setTaskIdx((taskIdx + 1) % PLOT_TASKS.length)
              setPlotted([])
              setChecked(false)
            }}
            className="rounded-md border border-line px-3 py-1 text-xs text-ink/80 hover:bg-white/10"
          >
            <T value={PRACTICAL.nextTask} />
          </button>
        </div>
        <p className="mt-1 text-sm text-ink/80">{task.prompt.en}</p>
        <p className="text-xs text-ink/60" data-zh>
          {task.prompt.zh}
        </p>
        <div className="mt-2 flex gap-4 font-mono text-xs text-ink/70">
          <span>{task.xLabel}</span>
          <span>·</span>
          <span>{task.yLabel}</span>
        </div>
      </div>

      <div className="mt-4 flex justify-center overflow-x-auto rounded-lg bg-white p-2">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="max-w-full cursor-crosshair"
          onClick={onClick}
          role="img"
          aria-label="graph paper"
        >
          {/* minor grid */}
          {Array.from({ length: Math.round((task.xMax - task.xMin) / task.xMinor) + 1 }, (_, i) => (
            <line key={`vm${i}`} x1={PAD + i * CELL} y1={PAD} x2={PAD + i * CELL} y2={height - PAD} stroke="#d4d4d8" strokeWidth="0.6" />
          ))}
          {Array.from({ length: Math.round((task.yMax - task.yMin) / task.yMinor) + 1 }, (_, i) => (
            <line key={`hm${i}`} x1={PAD} y1={PAD + i * CELL} x2={width - PAD} y2={PAD + i * CELL} stroke="#d4d4d8" strokeWidth="0.6" />
          ))}
          {/* major grid */}
          {xMajorLines.map((v) => (
            <line key={`vx${v}`} x1={toSvgX(task, v)} y1={PAD} x2={toSvgX(task, v)} y2={height - PAD} stroke="#a1a1aa" strokeWidth="1.2" />
          ))}
          {yMajorLines.map((v) => (
            <line key={`hy${v}`} x1={PAD} y1={toSvgY(task, v)} x2={width - PAD} y2={toSvgY(task, v)} stroke="#a1a1aa" strokeWidth="1.2" />
          ))}
          {/* axes */}
          <line x1={PAD} y1={PAD} x2={PAD} y2={height - PAD} stroke="#111827" strokeWidth="2" />
          <line x1={PAD} y1={height - PAD} x2={width - PAD} y2={height - PAD} stroke="#111827" strokeWidth="2" />
          {/* axis labels */}
          <text x={width / 2} y={height - 6} textAnchor="middle" fontSize="13" fill="#111827">
            {task.xLabel}
          </text>
          <text x={12} y={height / 2} textAnchor="middle" fontSize="13" fill="#111827" transform={`rotate(-90 12 ${height / 2})`}>
            {task.yLabel}
          </text>
          {xMajorLines.map((v) => (
            <text key={`tx${v}`} x={toSvgX(task, v)} y={height - PAD + 14} textAnchor="middle" fontSize="10" fill="#374151">
              {v}
            </text>
          ))}
          {yMajorLines.map((v) => (
            <text key={`ty${v}`} x={PAD - 5} y={toSvgY(task, v) + 3} textAnchor="end" fontSize="10" fill="#374151">
              {v}
            </text>
          ))}
          {/* ideal best-fit (after check) */}
          {checked && plotted.length >= 2 && (
            <path d={fitPath(myFit)} stroke="#2563eb" strokeWidth="1.5" strokeDasharray="6 3" fill="none" />
          )}
          {checked && (
            <path d={fitPath(idealFit)} stroke="#16a34a" strokeWidth="1.5" strokeDasharray="2 4" fill="none" />
          )}
          {/* missed expected points, revealed on check */}
          {result &&
            task.points.map((p, i) =>
              result.per[i] ? null : (
                <circle key={`miss${i}`} cx={toSvgX(task, p.x)} cy={toSvgY(task, p.y)} r="5" fill="none" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="3 2" />
              ),
            )}
          {/* plotted points */}
          {plotted.map((p, i) => {
            const hit = result?.per[plotted.indexOf(p)]
            return (
              <circle
                key={i}
                cx={toSvgX(task, p.x)}
                cy={toSvgY(task, p.y)}
                r="4"
                fill={result ? (hit ? '#16a34a' : '#dc2626') : '#2563eb'}
                stroke="#111827"
                strokeWidth="0.8"
              />
            )
          })}
        </svg>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="text-sm text-ink/70">
          {plotted.length} <T value={PRACTICAL.pointsPlotted} />
        </span>
        <button
          type="button"
          disabled={plotted.length === 0 || checked}
          onClick={() => setPlotted((prev) => prev.slice(0, -1))}
          className="rounded-md border border-line px-3 py-1 text-xs text-ink/80 hover:bg-white/10 disabled:opacity-40"
        >
          <T value={PRACTICAL.undoLast} />
        </button>
        <button
          type="button"
          disabled={plotted.length === 0}
          onClick={() => {
            setPlotted([])
            setChecked(false)
          }}
          className="rounded-md border border-line px-3 py-1 text-xs text-ink/80 hover:bg-white/10 disabled:opacity-40"
        >
          <T value={PRACTICAL.clearPoints} />
        </button>
        <button
          type="button"
          disabled={plotted.length < 3 || checked}
          onClick={() => setChecked(true)}
          className="rounded-md bg-ink px-4 py-1.5 text-xs font-medium text-white hover:opacity-90 disabled:opacity-40"
        >
          <T value={PRACTICAL.checkAnswers} />
        </button>
      </div>

      {result && (
        <div className="mt-3 rounded-lg border border-line bg-white/5 p-3 text-sm">
          <p className="font-medium text-ink">
            <T value={PRACTICAL.scoreLine} /> {result.per.filter(Boolean).length} <T value={PRACTICAL.of} /> {task.points.length}
            {result.extras > 0 && ` (+${result.extras} extra)`}
          </p>
          {result.score === 1 && result.extras === 0 ? (
            <p className="mt-1 text-emerald-500" data-zh>
              <T value={PRACTICAL.perfect} />
            </p>
          ) : (
            <p className="mt-1 text-ink/70" data-zh>
              <T value={PRACTICAL.tryAgain} />
            </p>
          )}
          {plotted.length >= 2 && (
            <p className="mt-1 text-xs text-ink/60">
              <T value={PRACTICAL.fitQuality} />: {myFit.r2.toFixed(3)}
              <span className="ml-3 inline-block h-2 w-4 rounded-sm bg-[#2563eb]" /> <T value={PRACTICAL.fitLine} />
              <span className="ml-3 inline-block h-2 w-4 rounded-sm bg-[#16a34a]" /> <T value={PRACTICAL.fitLineIdeal} />
            </p>
          )}
        </div>
      )}
    </section>
  )
}
