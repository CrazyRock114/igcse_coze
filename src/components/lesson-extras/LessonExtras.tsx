import { Suspense, lazy } from 'react'
import type { LessonExtra } from '@/content/types'
import { T } from '@/components/i18n/T'
import { DigestiveAnatomy } from './DigestiveAnatomy'
import { TeethAnatomy } from './TeethAnatomy'
import { VilliSurfaceArea } from './VilliSurfaceArea'
import { BileEmulsification } from './BileEmulsification'
import { BalancedPlate } from './BalancedPlate'
import { DigestionFlow } from './DigestionFlow'
import { VillusDetail } from './VillusDetail'
import { FoodEnergy } from './FoodEnergy'
import { DiseaseCards } from './DiseaseCards'
import { EnergyNeeds } from './EnergyNeeds'
import { HeartAnatomy } from './HeartAnatomy'
import { BloodComponents } from './BloodComponents'
import { BloodVesselsCompare } from './BloodVesselsCompare'
import { DoubleCirculation } from './DoubleCirculation'
import { RespirationCompare } from './RespirationCompare'
import { AirwayPathway } from './AirwayPathway'
import { GasExchangeFeatures } from './GasExchangeFeatures'
import { SmokingEffects } from './SmokingEffects'
import { ReflexArc } from './ReflexArc'
import { EyeAnatomy } from './EyeAnatomy'
import { GlucoseLoop } from './GlucoseLoop'
import { TemperatureControl } from './TemperatureControl'
import { ReproductiveAnatomy } from './ReproductiveAnatomy'
import { SpermVsEgg } from './SpermVsEgg'
import { FertilisationJourney } from './FertilisationJourney'
import { PlacentaExchange } from './PlacentaExchange'
import { DnaToProtein } from './DnaToProtein'
import { MitosisVsMeiosis } from './MitosisVsMeiosis'
import { PunnettGrid } from './PunnettGrid'
import { PedigreeTrace } from './PedigreeTrace'
import { FoodWeb } from './FoodWeb'
import { PyramidCompare } from './PyramidCompare'
import { NutrientCycle } from './NutrientCycle'
import { PopulationCurve } from './PopulationCurve'
import { OrganAnatomy } from './OrganAnatomy'
import { ConceptExplainer } from './ConceptExplainer'
import { VisualIllusions } from './VisualIllusions'
import { NeuroneStructure } from './NeuroneStructure'
import { ThreeNeurones } from './ThreeNeurones'

/**
 * Dispatches the lesson's `extras` to the right component.
 *
 * Each extra is its own section, with a title, hint, and a card. The wrapper just
 * does the dispatch and the chrome — the work lives in the per-type components.
 *
 * No Chinese literals in JSX: titles, hints and labels all come from the data layer
 * as `Bilingual` values, rendered through the `T` helper.
 */

// The two procedural-3D extras pull in three.js + @react-three (≈1.2 MB
// minified). Lazy-loading them keeps three.js out of the entry chunk — it is
// only fetched when a lesson actually renders one of these sections.
const DnaHelix3D = lazy(() =>
  import('./DnaHelix3D').then((m) => ({ default: m.DnaHelix3D }))
)
const FoodWeb3D = lazy(() =>
  import('./FoodWeb3D').then((m) => ({ default: m.FoodWeb3D }))
)

function Lazy3DFallback() {
  return (
    <div className="flex h-64 items-center justify-center rounded-lg bg-canvas text-sm text-muted">
      Loading 3D view…
    </div>
  )
}

export function LessonExtras({ extras }: { extras: LessonExtra[] }) {
  return (
    <section className="space-y-6">
      {extras.map((extra) => (
        <ExtraCard key={extra.id} extra={extra} />
      ))}
    </section>
  )
}

function ExtraCard({ extra }: { extra: LessonExtra }) {
  return (
    <article className="rounded-xl border border-line bg-surface p-4">
      <header className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-lg font-semibold text-ink">
          <T value={extra.title} />
        </h2>
        <p className="text-xs text-muted">
          <T value={extra.hint} />
        </p>
      </header>
      {renderExtra(extra)}
    </article>
  )
}

function renderExtra(extra: LessonExtra) {
  switch (extra.type) {
    case 'digestive-anatomy':
      return <DigestiveAnatomy extra={extra} />
    case 'teeth-anatomy':
      return <TeethAnatomy extra={extra} />
    case 'villi-surface-area':
      return <VilliSurfaceArea extra={extra} />
    case 'bile-emulsification':
      return <BileEmulsification extra={extra} />
    case 'balanced-plate':
      return <BalancedPlate extra={extra} />
    case 'digestion-flow':
      return <DigestionFlow extra={extra} />
    case 'villus-detail':
      return <VillusDetail extra={extra} />
    case 'food-energy':
      return <FoodEnergy extra={extra} />
    case 'disease-cards':
      return <DiseaseCards extra={extra} />
    case 'energy-needs':
      return <EnergyNeeds extra={extra} />
    case 'heart-anatomy':
      return <HeartAnatomy extra={extra} />
    case 'blood-components':
      return <BloodComponents extra={extra} />
    case 'blood-vessels-compare':
      return <BloodVesselsCompare extra={extra} />
    case 'double-circulation':
      return <DoubleCirculation extra={extra} />
    case 'respiration-compare':
      return <RespirationCompare extra={extra} />
    case 'airway-pathway':
      return <AirwayPathway extra={extra} />
    case 'gas-exchange-features':
      return <GasExchangeFeatures extra={extra} />
    case 'smoking-effects':
      return <SmokingEffects extra={extra} />
    case 'reflex-arc':
      return <ReflexArc extra={extra} />
    case 'eye-anatomy':
      return <EyeAnatomy extra={extra} />
    case 'glucose-loop':
      return <GlucoseLoop extra={extra} />
    case 'temperature-control':
      return <TemperatureControl extra={extra} />
    case 'reproductive-anatomy':
      return <ReproductiveAnatomy extra={extra} />
    case 'sperm-vs-egg':
      return <SpermVsEgg extra={extra} />
    case 'fertilisation-journey':
      return <FertilisationJourney extra={extra} />
    case 'placenta-exchange':
      return <PlacentaExchange extra={extra} />
    case 'dna-to-protein':
      return <DnaToProtein extra={extra} />
    case 'mitosis-vs-meiosis':
      return <MitosisVsMeiosis extra={extra} />
    case 'punnett-grid':
      return <PunnettGrid extra={extra} />
    case 'pedigree-trace':
      return <PedigreeTrace extra={extra} />
    case 'food-web':
      return <FoodWeb extra={extra} />
    case 'pyramid-compare':
      return <PyramidCompare extra={extra} />
    case 'nutrient-cycle':
      return <NutrientCycle extra={extra} />
    case 'population-curve':
      return <PopulationCurve extra={extra} />
    case 'organ-anatomy':
      return <OrganAnatomy extra={extra} />
    case 'dna-helix-3d':
      return (
        <Suspense fallback={<Lazy3DFallback />}>
          <DnaHelix3D extra={extra} />
        </Suspense>
      )
    case 'food-web-3d':
      return (
        <Suspense fallback={<Lazy3DFallback />}>
          <FoodWeb3D extra={extra} />
        </Suspense>
      )
    case 'concept-explainer':
      return <ConceptExplainer extra={extra} />
    case 'visual-illusions':
      return <VisualIllusions extra={extra} />
    case 'neurone-structure':
      return <NeuroneStructure extra={extra} />
    case 'three-neurones':
      return <ThreeNeurones extra={extra} />
  }
}
