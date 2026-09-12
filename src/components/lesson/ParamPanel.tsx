import type { ParamSpec, SimPreset } from '@/content/types'
import { T } from '@/components/i18n/T'
import { formatSigFigs } from '@/lib/units'
import { ui } from '@/lib/ui-strings'

interface ParamPanelProps {
  params: ParamSpec[]
  values: Record<string, number>
  onChange: (key: string, value: number) => void
  presets?: SimPreset[]
  onPreset?: (params: Record<string, number>) => void
}

/** Controls for the simulation's independent variables, plus any one-click scenarios. */
export function ParamPanel({ params, values, onChange, presets, onPreset }: ParamPanelProps) {
  const visible = params.filter((p) => !p.hidden)

  return (
    <div className="space-y-4">
      {presets && presets.length > 0 && onPreset && (
        <div className="border-b border-line pb-3">
          {/* Labelled, because an unlabelled row of pills does not tell a student that
              these jump straight to the configurations worth looking at. */}
          <p className="mb-1.5 text-xs font-medium text-ink-soft">
            <T value={ui.presetsLabel} />
          </p>
          <div className="flex flex-wrap gap-1.5">
            {presets.map((preset, i) => (
              <button
                key={i}
                type="button"
                onClick={() => onPreset(preset.params)}
                className="rounded-full border border-line bg-canvas px-2.5 py-1 text-xs font-medium text-ink-soft transition-colors hover:border-teal-500 hover:text-teal-800"
              >
                <T value={preset.label} />
              </button>
            ))}
          </div>
        </div>
      )}

      {visible.map((p) => {
        const value = values[p.key] ?? p.default

        // Discrete choices get buttons — a two-position slider is a bad control.
        if (p.options) {
          return (
            <div key={p.key}>
              <span className="mb-1 block text-sm font-medium text-ink-soft">
                <T value={p.label} />
              </span>
              <div className="flex flex-wrap gap-1" role="radiogroup">
                {p.options.map((o) => (
                  <button
                    key={o.value}
                    type="button"
                    role="radio"
                    aria-checked={value === o.value}
                    onClick={() => onChange(p.key, o.value)}
                    className={
                      'rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors ' +
                      (value === o.value
                        ? 'border-teal-600 bg-teal-50 text-teal-900'
                        : 'border-line text-muted hover:bg-canvas')
                    }
                  >
                    <T value={o.label} />
                  </button>
                ))}
              </div>
            </div>
          )
        }

        // Slider step implies the precision worth showing: 0.1 → 1 d.p.
        const decimals = p.step < 1 ? (String(p.step).split('.')[1]?.length ?? 1) : 0
        return (
          <div key={p.key}>
            <div className="mb-1 flex items-baseline justify-between gap-2">
              <label htmlFor={`param-${p.key}`} className="text-sm font-medium text-ink-soft">
                <T value={p.label} />
                {p.symbol && <span className="ml-1 font-mono text-xs text-muted">{p.symbol}</span>}
              </label>
              <span className="font-mono text-sm tabular-nums text-ink">
                {value.toFixed(decimals)} <span className="text-muted">{p.unit}</span>
              </span>
            </div>
            <input
              id={`param-${p.key}`}
              type="range"
              min={p.min}
              max={p.max}
              step={p.step}
              value={value}
              onChange={(e) => onChange(p.key, Number(e.target.value))}
              className="w-full accent-teal-600"
              aria-valuetext={`${formatSigFigs(value, 3)} ${p.unit}`}
            />
          </div>
        )
      })}
    </div>
  )
}
