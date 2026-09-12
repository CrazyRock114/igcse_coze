import type { SimResult, SimSpec } from '@/content/types'
import { PlotGrid } from './plot2d/PlotGrid'
import { RayTrace } from './raytrace/RayTrace'
import { Beam } from './beam/Beam'
import { Particles } from './particles/Particles'
import { Waves } from './waves/Waves'
import { Circuit } from './circuit/Circuit'
import { Field2D } from './field2d/Field2D'
import { Atom } from './atom/Atom'
import { Molecule } from './molecule/Molecule'
import { Bonding } from './bonding/Bonding'
import { Ladder } from './ladder/Ladder'
import { Lattice } from './lattice/Lattice'
import { PeriodicTable } from './periodictable/PeriodicTable'
import { Sort } from './sort/Sort'
import { Match } from './match/Match'
import { Punnett } from './punnett/Punnett'
import { Pyramid } from './pyramid/Pyramid'
import { Balance } from './balance/Balance'
import { Chromatogram } from './chromatogram/Chromatogram'
import { Giant } from './giant/Giant'
import { Vectors } from './vectors/Vectors'

export interface SimViewProps {
  result: SimResult
  params: Record<string, number>
  /** Lets a primitive write a parameter back — dragging a ray, a weight, a handle. */
  onParamChange: (key: string, value: number) => void
  spec: SimSpec
}

/**
 * Chooses the renderer for a simulation.
 *
 * Every lesson goes through here, so `LessonPage` never learns about individual
 * primitives. Adding a primitive means adding a case, not touching the lesson page.
 */
export function SimStage(props: SimViewProps) {
  switch (props.spec.primitive) {
    case 'raytrace':
      return <RayTrace {...props} />
    case 'beam':
      return <Beam {...props} />
    case 'particles':
      return <Particles {...props} />
    case 'waves':
      return <Waves {...props} />
    case 'circuit':
      return <Circuit {...props} />
    case 'field2d':
      return <Field2D {...props} />
    case 'atom':
      return <Atom {...props} />
    case 'molecule':
      return <Molecule {...props} />
    case 'bonding':
      return <Bonding {...props} />
    case 'giant':
      return <Giant {...props} />
    case 'balance':
      return <Balance {...props} />
    case 'chromatogram':
      return <Chromatogram {...props} />
    case 'ladder':
      return <Ladder {...props} />
    case 'lattice':
      return <Lattice {...props} />
    case 'periodictable':
      return <PeriodicTable {...props} />
    case 'sort':
      return <Sort {...props} />
    case 'match':
      return <Match {...props} />
    case 'punnett':
      return <Punnett {...props} />
    case 'pyramid':
      return <Pyramid {...props} />
    case 'vectors':
      return <Vectors {...props} />
    case 'plot2d':
      return (
        <PlotGrid
          series={props.result.series}
          notes={(props.result.markers ?? []).map((m) => m.label)}
        />
      )
    default:
      // A lesson referencing a primitive that has not been built yet should say so
      // rather than render an empty box.
      return (
        <p className="rounded-lg border border-dashed border-line px-4 py-8 text-center text-sm text-muted">
          The “{props.spec.primitive}” visualisation has not been built yet.
        </p>
      )
  }
}
