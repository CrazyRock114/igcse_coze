import { useEffect, useRef, useState } from 'react'
import { T } from '@/components/i18n/T'
import type { VisualIllusionsExtra } from '@/content/types'

/**
 * Why your eyes play tricks on you — supplementary material for the
 * 14-1 eye section. Two halves:
 *
 *   1. A gallery of five classic visual illusions (pure SVG, no image
 *      files needed) with a short "what you see" + "why" block.
 *   2. Three hands-on experiments with explanations of the underlying
 *      vision-science principle. Each experiment is interactive —
 *      the user does something, then sees the result.
 */
export function VisualIllusions({ extra }: { extra: VisualIllusionsExtra }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-2 text-sm font-semibold tracking-wide text-muted uppercase">
          Illusion gallery
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          {extra.illusions.map((ill) => (
            <IllusionCard key={ill.id} illusion={ill} />
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-2 text-sm font-semibold tracking-wide text-muted uppercase">
          Try it yourself
        </h3>
        <div className="space-y-4">
          {extra.experiments.map((exp) => (
            <ExperimentCard key={exp.id} experiment={exp} />
          ))}
        </div>
      </div>
    </div>
  )
}

function IllusionCard({
  illusion,
}: {
  illusion: VisualIllusionsExtra['illusions'][number]
}) {
  return (
    <div className="rounded-lg border border-line bg-canvas/50 p-3">
      <p className="mb-2 text-sm font-semibold text-ink">
        <T value={illusion.title} />
      </p>
      <div className="mb-2 rounded-md bg-white p-3">
        <IllusionSVG id={illusion.id} />
      </div>
      <p className="text-xs text-ink-soft">
        <span className="font-semibold text-muted">What you see: </span>
        <T value={illusion.whatYouSee} />
      </p>
      <p className="mt-1.5 text-xs text-ink-soft">
        <span className="font-semibold text-muted">Why: </span>
        <T value={illusion.why} />
      </p>
    </div>
  )
}

function ExperimentCard({
  experiment,
}: {
  experiment: VisualIllusionsExtra['experiments'][number]
}) {
  return (
    <div className="rounded-lg border border-line bg-canvas/50 p-4">
      <p className="mb-2 text-sm font-semibold text-ink">
        <T value={experiment.title} />
      </p>
      <p className="mb-2 text-xs text-ink-soft">
        <span className="font-semibold text-muted">How: </span>
        <T value={experiment.instructions} />
      </p>
      <div className="my-3 rounded-md bg-white p-4">
        <ExperimentDemo id={experiment.id} />
      </div>
      <p className="text-xs text-ink-soft">
        <span className="font-semibold text-muted">Why: </span>
        <T value={experiment.principle} />
      </p>
    </div>
  )
}

// ============================================================================
// SVG illustrations — drawn inline so the project has no image-file
// dependencies. Each one is the minimal reproduction of the classic
// illusion, with generous margin so the figure is the focus.
// ============================================================================

function IllusionSVG({ id }: { id: string }) {
  switch (id) {
    case 'hermann-grid':
      return <HermannGrid />
    case 'muller-lyer':
      return <MullerLyer />
    case 'ponzo':
      return <Ponzo />
    case 'ebbinghaus':
      return <Ebbinghaus />
    case 'afterimage':
      return <AfterimageSquare />
    default:
      return <span className="text-xs text-muted">No illustration</span>
  }
}

function HermannGrid() {
  // 5×5 grid of black bars on white, with white gaps. Grey dots appear
  // at intersections when the eye scans but vanish when you fixate.
  const cell = 30
  const gap = 8
  const bars: { x: number; y: number; w: number; h: number }[] = []
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 5; col++) {
      bars.push({
        x: col * (cell + gap),
        y: row * (cell + gap),
        w: cell,
        h: cell,
      })
    }
  }
  const size = 5 * cell + 4 * gap
  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="block h-32 w-full">
      <rect width={size} height={size} fill="#ffffff" />
      {bars.map((b, i) => (
        <rect key={i} x={b.x} y={b.y} width={b.w} height={b.h} fill="#000000" />
      ))}
    </svg>
  )
}

function MullerLyer() {
  // Two vertical lines of identical length. The trick: the arrows at
  // each end are *opposite* on the two lines.
  //
  //   A (left)  — `>——<` analog: the V apex sits AT the shaft endpoint,
  //               and the two legs of the V extend OUTSIDE the shaft
  //               (above the top, below the bottom). This is the
  //               "inward" version — the line LOOKS SHORTER.
  //   B (right) — `<——>` analog: the V apex sits AT the shaft endpoint
  //               and the two legs extend INTO the shaft region
  //               (below the top, above the bottom). This is the
  //               "outward" version — the line LOOKS LONGER.
  //
  // ViewBox 0 0 200 220 (extra height for B's fins that extend
  // *above* the shaft top and *below* the shaft bottom).
  const len = 120
  const left = 50
  const right = 150
  const arrow = 16
  const topY = 50
  const bottomY = topY + len
  return (
    <svg viewBox="0 0 200 220" className="block h-32 w-full">
      {/* A — inward (><) — V apex at the shaft, legs go OUTSIDE */}
      <line x1={left} y1={topY} x2={left} y2={bottomY} stroke="#222" strokeWidth="3" />
      <polyline
        points={`${left - arrow},${topY - arrow} ${left},${topY} ${left + arrow},${topY - arrow}`}
        fill="none"
        stroke="#222"
        strokeWidth="3"
      />
      <polyline
        points={`${left - arrow},${bottomY + arrow} ${left},${bottomY} ${left + arrow},${
          bottomY + arrow
        }`}
        fill="none"
        stroke="#222"
        strokeWidth="3"
      />
      {/* B — outward (<>) — V apex at the shaft, legs go INSIDE */}
      <line x1={right} y1={topY} x2={right} y2={bottomY} stroke="#222" strokeWidth="3" />
      <polyline
        points={`${right - arrow},${topY + arrow} ${right},${topY} ${right + arrow},${
          topY + arrow
        }`}
        fill="none"
        stroke="#222"
        strokeWidth="3"
      />
      <polyline
        points={`${right - arrow},${bottomY - arrow} ${right},${bottomY} ${right + arrow},${
          bottomY - arrow
        }`}
        fill="none"
        stroke="#222"
        strokeWidth="3"
      />
      <text x={left} y={200} textAnchor="middle" className="fill-muted" fontSize="11">
        A
      </text>
      <text x={right} y={200} textAnchor="middle" className="fill-muted" fontSize="11">
        B
      </text>
      <text x={100} y={214} textAnchor="middle" className="fill-muted" fontSize="10">
        exactly the same length
      </text>
    </svg>
  )
}

function Ponzo() {
  // Two converging diagonal lines (the "railway tracks receding into
  // the distance") plus two horizontal lines of EXACTLY the same
  // length. The top horizontal line sits in the narrow part of the
  // wedge — the brain reads "far away" — and so it APPEARS longer
  // than the bottom line, which sits in the wide part of the wedge
  // and reads as "close".
  //
  // Layout (viewBox 0 0 200 240):
  //   - Converging lines: meet at vanishing point (100, 20), fan out
  //     to (10, 220) and (190, 220). The wedge gets wider as it goes
  //     down, mimicking linear perspective.
  //   - Top horizontal line at y=80, length 60, sitting inside the
  //     wedge where the gap is ~54 wide. Reads as "far".
  //   - Bottom horizontal line at y=170, length 60 (same!), inside the
  //     wedge where the gap is ~135 wide. Reads as "near".
  //
  // Attribution: based on the structure of PolBr's "Ponzo illusion"
  // (Wikimedia Commons, CC-BY-SA 4.0). Recreated inline so the site
  // has no image-file dependencies; geometry and stroke widths are
  // the same as the original SVG.
  return (
    <svg viewBox="0 0 200 240" className="block h-32 w-full">
      {/* Converging lines (the "tracks") */}
      <line x1="100" y1="20" x2="10" y2="220" stroke="#111" strokeWidth="3" strokeLinecap="round" />
      <line x1="100" y1="20" x2="190" y2="220" stroke="#111" strokeWidth="3" strokeLinecap="round" />
      {/* Two equal horizontal lines */}
      <line x1="70" y1="80" x2="130" y2="80" stroke="#111" strokeWidth="3" strokeLinecap="round" />
      <line x1="70" y1="170" x2="130" y2="170" stroke="#111" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

function Ebbinghaus() {
  // Two identical orange circles, one surrounded by big purple circles
  // (looks SMALLER), one surrounded by small ones (looks LARGER). The
  // geometry is the standard Titchener version: surrounding circles
  // sit JUST OUTSIDE the central one — they touch but never overlap.
  //
  // Earlier versions of this SVG placed the surrounding circles too
  // close to the centre, so the purple covered parts of the orange
  // and the illusion stopped working. The numbers below are chosen so
  // central radius + surround radius is comfortably less than the
  // surround distance for every position.
  const orangeR = 15
  const big = 11
  const small = 4
  // Distance from centre to surrounding-circle centre.
  const bigDist = 32
  const smallDist = 28
  // 8 surrounding positions: 4 cardinal + 4 diagonal at 45°.
  // Diagonal offsets are dist / √2 so every circle is the same radial
  // distance from the centre.
  const d = Math.SQRT1_2 // 1/√2
  const positionsLeft: Array<[number, number]> = [
    [-bigDist, 0],
    [bigDist, 0],
    [0, -bigDist],
    [0, bigDist],
    [-bigDist * d, -bigDist * d],
    [bigDist * d, bigDist * d],
    [-bigDist * d, bigDist * d],
    [bigDist * d, -bigDist * d],
  ]
  const positionsRight: Array<[number, number]> = [
    [-smallDist, 0],
    [smallDist, 0],
    [0, -smallDist],
    [0, smallDist],
    [-smallDist * d, -smallDist * d],
    [smallDist * d, smallDist * d],
    [-smallDist * d, smallDist * d],
    [smallDist * d, -smallDist * d],
  ]
  return (
    <svg viewBox="0 0 240 100" className="block h-32 w-full">
      {/* Left side: surrounded by big circles (looks SMALLER) */}
      <circle cx={60} cy={50} r={orangeR} fill="#fb923c" />
      {positionsLeft.map(([dx, dy], i) => (
        <circle
          key={i}
          cx={60 + dx}
          cy={50 + dy}
          r={big}
          fill="#a78bfa"
        />
      ))}
      {/* Right side: surrounded by small circles (looks LARGER) */}
      <circle cx={180} cy={50} r={orangeR} fill="#fb923c" />
      {positionsRight.map(([dx, dy], i) => (
        <circle
          key={i}
          cx={180 + dx}
          cy={50 + dy}
          r={small}
          fill="#a78bfa"
        />
      ))}
    </svg>
  )
}

function AfterimageSquare() {
  // A solid red square with a fixating dot in the centre. After staring
  // for the experiment, the user looks at a grey area and sees cyan.
  return (
    <svg viewBox="0 0 100 100" className="block h-32 w-full">
      <rect width="100" height="100" fill="#dc2626" />
      <circle cx="50" cy="50" r="3" fill="#000" />
    </svg>
  )
}

// ============================================================================
// Interactive experiments — each one is a small stateful React component
// inline. They keep their own state so re-rendering the gallery doesn't
// reset them.
// ============================================================================

function ExperimentDemo({ id }: { id: string }) {
  switch (id) {
    case 'blind-spot':
      return <BlindSpotExperiment />
    case 'muller-lyer-match':
      return <MullerLyerMatchExperiment />
    case 'afterimage-demo':
      return <AfterimageExperiment />
    case 'invisible-gorilla':
      return <InvisibleGorillaExperiment />
    default:
      return <span className="text-xs text-muted">No demo</span>
  }
}

function BlindSpotExperiment() {
  // The classical Marigold fixating test. A small ✕ on the left, a
  // coloured dot on the right. When the page sits at the right distance
  // from the right eye, the dot falls on the optic disc and disappears.
  // The browser can't actually enforce eye position, so we expose a
  // distance slider and tell the user to close one eye, fixate, and
  // move the page (or their head) until the dot disappears.
  const [dotX, setDotX] = useState(220)
  return (
    <div className="flex flex-col items-center gap-2">
      <svg viewBox="0 0 400 80" className="w-full">
        <text x={50} y={50} textAnchor="middle" fontSize="32" className="fill-ink">
          ✕
        </text>
        <circle
          cx={dotX}
          cy={40}
          r="14"
          fill="#dc2626"
          className="transition-all"
        />
      </svg>
      <label className="flex w-full items-center gap-2 text-xs text-muted">
        <span className="shrink-0">dot position:</span>
        <input
          type="range"
          min={130}
          max={380}
          value={dotX}
          onChange={(e) => setDotX(parseInt(e.target.value, 10))}
          className="w-full accent-teal-600"
        />
      </label>
      <p className="text-center text-[10px] text-muted">
        Close your LEFT eye. With your RIGHT eye, fixate on ✕. Slide the red dot
        until it disappears — that is your blind spot, the place where the optic
        nerve leaves the eye.
      </p>
    </div>
  )
}

function MullerLyerMatchExperiment() {
  // Left line has INWARD arrows (><) so it LOOKS SHORTER, right line
  // is a plain red line the user drags. The trick: even when you
  // know the lines are the same length, the inward arrows pull your
  // length estimate down by 10-20%, so you have to make the right
  // line noticeably longer before it "looks" the same.
  //
  // Inward pattern (V apex at shaft endpoint, V opens AWAY from
  // shaft): same convention as the gallery's A line. Earlier this
  // experiment used the OUTWARD pattern with an inward-arrow label
  // — the SVG and the text disagreed, so the demo was confusing.
  const [rightLen, setRightLen] = useState(80)
  const baseLen = 120
  const arrow = 14
  const topY = 30
  // ViewBox 0 0 280 180 — extra height for the reference line's
  // bottom fin (which extends to y = 150 + 14 = 164).
  return (
    <div className="flex flex-col items-center gap-2">
      <svg viewBox="0 0 280 180" className="w-full">
        {/* Left: INWARD arrows (><) — V opens AWAY from shaft */}
        <g transform="translate(60, 0)">
          <line x1="0" y1={topY} x2="0" y2={topY + baseLen} stroke="#222" strokeWidth="3" />
          <polyline
            points={`${-arrow},${topY - arrow} 0,${topY} ${arrow},${topY - arrow}`}
            fill="none"
            stroke="#222"
            strokeWidth="3"
          />
          <polyline
            points={`${-arrow},${topY + baseLen + arrow} 0,${
              topY + baseLen
            } ${arrow},${topY + baseLen + arrow}`}
            fill="none"
            stroke="#222"
            strokeWidth="3"
          />
          <text x="0" y="15" textAnchor="middle" className="fill-muted" fontSize="10">
            reference ({'>'}{'<'})
          </text>
        </g>
        {/* Right: user-controlled plain red line (no arrows) */}
        <g transform={`translate(180, ${topY})`}>
          <line x1="0" y1="0" x2="0" y2={rightLen} stroke="#dc2626" strokeWidth="3" />
          <text x="0" y="-8" textAnchor="middle" className="fill-muted" fontSize="10">
            your line
          </text>
        </g>
      </svg>
      <label className="flex w-full items-center gap-2 text-xs text-muted">
        <span className="shrink-0">length:</span>
        <input
          type="range"
          min={50}
          max={150}
          value={rightLen}
          onChange={(e) => setRightLen(parseInt(e.target.value, 10))}
          className="w-full accent-teal-600"
        />
        <span className="font-mono text-xs text-ink">{rightLen}px</span>
      </label>
      <p className="text-center text-[10px] text-muted">
        Make the red line look the same length as the reference. Hit "answer" to
        see how biased your visual system is.
        <ShowAnswerButton
          onClick={() => setRightLen(Math.round(baseLen * 1.12))}
          label="Show the bias (112%)"
        />
      </p>
    </div>
  )
}

function ShowAnswerButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="ml-2 rounded border border-line bg-surface px-2 py-0.5 text-[10px] font-medium text-ink-soft hover:border-teal-500 hover:text-teal-700"
    >
      {label}
    </button>
  )
}

function AfterimageExperiment() {
  // Two phases. Phase 1: a red square with a black dot in the centre
  // (stare here). Phase 2: a grey square with a black dot in the
  // centre (look here) — a faint cyan image of the red square floats.
  //
  // The browser can't actually trigger the photoreceptor fatigue, but
  // we can simulate the visual: show a real afterimage in phase 2.
  const [phase, setPhase] = useState<'stare' | 'look'>('stare')
  const [seconds, setSeconds] = useState(0)
  const intervalRef = useRef<number | null>(null)

  useEffect(() => {
    if (phase !== 'stare') return
    // Reset on the first tick, then increment — avoids calling setState
    // directly in the effect body, and the user sees "0" for the first
    // second which is honest ("you've been staring for 0 seconds").
    let firstTick = true
    intervalRef.current = window.setInterval(() => {
      if (firstTick) {
        setSeconds(0)
        firstTick = false
      } else {
        setSeconds((s) => s + 1)
      }
    }, 1000)
    return () => {
      if (intervalRef.current !== null) window.clearInterval(intervalRef.current)
    }
  }, [phase])

  return (
    <div className="flex flex-col items-center gap-2">
      {phase === 'stare' ? (
        <StarePhase seconds={seconds} onDone={() => setPhase('look')} />
      ) : (
        <LookPhase onReset={() => setPhase('stare')} />
      )}
    </div>
  )
}

function StarePhase({ seconds, onDone }: { seconds: number; onDone: () => void }) {
  // After 30 seconds, auto-advance. The user can also click "I'm done staring".
  useEffect(() => {
    if (seconds >= 30) onDone()
  }, [seconds, onDone])
  return (
    <>
      <div className="relative">
        <div className="h-32 w-32 bg-[#dc2626]" />
        <div className="absolute left-1/2 top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black" />
      </div>
      <p className="text-center text-[10px] text-muted">
        Phase 1 — stare at the black dot for 30 seconds ({seconds}/30).
        <br />
        <button
          type="button"
          onClick={onDone}
          className="mt-1 rounded border border-line bg-surface px-2 py-0.5 text-[10px] font-medium text-ink-soft hover:border-teal-500 hover:text-teal-700"
        >
          skip — go to phase 2
        </button>
      </p>
    </>
  )
}

function LookPhase({ onReset }: { onReset: () => void }) {
  // A grey square with a black fixation dot. The "afterimage" is a
  // translucent cyan square of the same size — your brain's prediction,
  // painted on top.
  return (
    <>
      <div className="relative">
        <div className="h-32 w-32 bg-[#d4d4d8]" />
        <div
          className="absolute inset-0 bg-[#06b6d4] opacity-60 mix-blend-difference"
          aria-hidden="true"
        />
        <div className="absolute left-1/2 top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black" />
      </div>
      <p className="text-center text-[10px] text-muted">
        Phase 2 — look at the black dot on the grey square. A cyan ghost of the
        red square should be visible for a few seconds. (In the actual
        experiment the afterimage is faint; here we paint it on so the
        mechanism is obvious.)
        <br />
        <button
          type="button"
          onClick={onReset}
          className="mt-1 rounded border border-line bg-surface px-2 py-0.5 text-[10px] font-medium text-ink-soft hover:border-teal-500 hover:text-teal-700"
        >
          reset
        </button>
      </p>
    </>
  )
}

// ============================================================================
// Experiment 4: The invisible gorilla — selective attention.
// A simplified version of Simons & Chabris' 1999 experiment, played in
// the 8/6 G8 class. The student is asked to count the white team's
// passes; a dark "gorilla" walks across the scene while they count.
// In the original video, about half the viewers miss the gorilla
// entirely. This in-app version compresses the timing and uses simple
// shapes, but the mechanism is the same: attention is a spotlight,
// and what is outside it does not enter conscious perception.
// ============================================================================

function InvisibleGorillaExperiment() {
  // Four phases: ready (button) → watching (gorilla walks) → question
  // (white-team pass count) → reveal (gorilla path highlighted).
  const [phase, setPhase] = useState<'ready' | 'watching' | 'question' | 'reveal'>('ready')
  // gorillaX is the gorilla's horizontal position in viewBox units.
  // Starts off-screen at -20; reaches 320 (also off-screen right) when
  // the walk is done.
  const [gorillaX, setGorillaX] = useState(-20)
  const [selected, setSelected] = useState<number | null>(null)
  // The "correct" pass count. Six — the user can verify by counting
  // the white circles in the scene.
  const CORRECT_PASSES = 6

  const startWatching = () => {
    setSelected(null)
    setGorillaX(-20)
    setPhase('watching')
  }

  // Drive the watching-phase animation. We do not call setState
  // synchronously in the effect body — instead setTimeout / RAF
  // callbacks are the only places state mutates.
  useEffect(() => {
    if (phase !== 'watching') return
    // 1.4s after watching starts, the gorilla walks from left to
    // right. The walk itself takes 2s. We end the watching phase
    // 0.8s after the gorilla has cleared the right edge.
    const enterTimer = setTimeout(() => {
      const startTime = Date.now()
      const walkDuration = 2000
      const tick = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / walkDuration, 1)
        // -20 → 320 over 2s; the gorilla is fully off-screen on both
        // ends, so the "appearing in plain sight" surprise still works.
        setGorillaX(-20 + progress * 340)
        if (progress < 1) {
          requestAnimationFrame(tick)
        }
      }
      requestAnimationFrame(tick)
    }, 1400)
    const questionTimer = setTimeout(() => setPhase('question'), 4200)
    return () => {
      clearTimeout(enterTimer)
      clearTimeout(questionTimer)
    }
  }, [phase])

  return (
    <div className="space-y-3">
      {phase === 'ready' && (
        <div className="space-y-2">
          <p className="text-[11px] text-ink-soft">
            You will see two teams — white and dark. A gorilla will walk through
            the scene. Count only the white team&apos;s passes.
          </p>
          <button
            type="button"
            onClick={startWatching}
            className="rounded border border-line bg-surface px-3 py-1 text-xs font-medium text-ink-soft hover:border-teal-500 hover:text-teal-700"
          >
            Start — count the white team
          </button>
        </div>
      )}

      {phase === 'watching' && <GorillaScene gorillaX={gorillaX} showGorilla={false} />}

      {phase === 'question' && (
        <div className="space-y-2">
          <p className="text-xs text-ink-soft">
            How many passes did the white team make?
          </p>
          <div className="flex flex-wrap gap-2">
            {[4, 5, 6, 7].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => {
                  setSelected(n)
                  setPhase('reveal')
                }}
                className="rounded border border-line bg-surface px-3 py-1 text-xs font-medium text-ink-soft hover:border-teal-500 hover:text-teal-700"
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      )}

      {phase === 'reveal' && (
        <div className="space-y-2">
          <p className="text-xs text-ink-soft">
            {selected === CORRECT_PASSES ? (
              <>You counted correctly. But did you see the dark shape walk through?</>
            ) : (
              <>
                The white team actually made {CORRECT_PASSES} passes. But did you
                see the dark shape walk through?
              </>
            )}
          </p>
          <GorillaScene gorillaX={170} showGorilla={true} highlighted={true} />
          <p className="text-[10px] text-muted">
            The dark shape — the &quot;gorilla&quot; — was in the scene the whole time.
            Most people miss it because attention is a spotlight, not a wide-angle
            lens.
          </p>
          <button
            type="button"
            onClick={startWatching}
            className="rounded border border-line bg-surface px-3 py-1 text-xs font-medium text-ink-soft hover:border-teal-500 hover:text-teal-700"
          >
            Try again — this time watch for it
          </button>
        </div>
      )}
    </div>
  )
}

function GorillaScene({
  gorillaX,
  showGorilla,
  highlighted,
}: {
  gorillaX: number
  showGorilla: boolean
  highlighted?: boolean
}) {
  // 6 white circles (left half) + 4 dark circles (right half), spaced
  // so a viewer counting the whites can plausibly keep a tally. The
  // gorilla is a small dark shape — head + body — that walks across
  // the middle of the scene.
  const white: Array<[number, number]> = [
    [25, 30],
    [55, 55],
    [85, 25],
    [115, 60],
    [145, 35],
    [175, 55],
  ]
  const dark: Array<[number, number]> = [
    [210, 30],
    [240, 55],
    [270, 30],
    [295, 60],
  ]
  return (
    <svg viewBox="0 0 320 100" className="block h-28 w-full rounded border border-line/50 bg-canvas">
      <rect width="320" height="100" fill="#fafafa" />
      {white.map(([cx, cy], i) => (
        <circle key={`w${i}`} cx={cx} cy={cy} r="7" fill="#ffffff" stroke="#222" strokeWidth="1.5" />
      ))}
      {dark.map(([cx, cy], i) => (
        <circle key={`b${i}`} cx={cx} cy={cy} r="7" fill="#222" />
      ))}
      {showGorilla && (
        <g
          transform={`translate(${gorillaX}, 78)`}
          opacity={highlighted ? 1 : 0.4}
        >
          {highlighted && (
            <ellipse
              cx="0"
              cy="-2"
              rx="14"
              ry="20"
              fill="#fde68a"
              opacity="0.5"
            />
          )}
          <circle cx="0" cy="-12" r="8" fill="#1f2937" />
          <rect x="-9" y="-6" width="18" height="16" rx="3" fill="#1f2937" />
        </g>
      )}
    </svg>
  )
}
