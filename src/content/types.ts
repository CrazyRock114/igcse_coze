/**
 * Content type system.
 *
 * Design rule that everything else follows from: **course copy is data, never JSX.**
 * A lesson is a `Lesson` object; the renderer is generic. This is the single biggest
 * departure from the reference projects (mathviz et al.), where each experiment was a
 * bespoke component with its copy hard-coded inside it — which made them untranslatable.
 */

/**
 * English is required, Chinese is optional.
 *
 * The asymmetry is deliberate and enforced by the type: this course is English-primary
 * (IGCSE is examined in English), with Chinese as scaffolding. You cannot author a
 * Chinese-only string without the compiler objecting.
 */
export interface Bilingual {
  en: string
  zh?: string
}

/** Core content is examined in Papers 1/3; Supplement content only in Papers 2/4. */
export type Tier = 'core' | 'supplement'

/** A lesson may cover Core only, or Core + Supplement material. */
export type LessonTier = 'core' | 'extended'

// ---------------------------------------------------------------------------
// Syllabus
// ---------------------------------------------------------------------------

/**
 * A single assessable statement, e.g. `0625.1.2.6`.
 *
 * `label` is **our own paraphrase**, not the awarding body's wording — we reference
 * statements by their official numbering but do not reproduce the syllabus text.
 */
export interface SyllabusStatement {
  /** Fully-qualified id, e.g. '0625.1.2.6' */
  id: string
  /** Statement number within its subtopic (continuous across Core and Supplement) */
  n: number
  tier: Tier
  label: Bilingual
}

export interface SyllabusSubtopic {
  /** e.g. '1.2' or '1.5.1' */
  id: string
  title: Bilingual
  statements: SyllabusStatement[]
}

export interface SyllabusTopic {
  /** 1..6 */
  number: number
  title: Bilingual
  subtopics: SyllabusSubtopic[]
}

export interface Syllabus {
  /** Awarding body code, e.g. '0625' */
  code: string
  title: Bilingual
  /**
   * Display name for narrow UI (filter chips, breadcrumb tails). Falls
   * back to `title` when not set; the `code` is shown as a secondary
   * marker so the awarding-body number is never lost.
   */
  shortName?: Bilingual
  board: string
  /** Exam years this cycle covers, e.g. [2026, 2028] */
  cycle: [number, number]
  guidedLearningHours: number
  topics: SyllabusTopic[]
}

// ---------------------------------------------------------------------------
// Simulation
// ---------------------------------------------------------------------------

/**
 * The ten reusable primitives that cover all of 0625. A lesson picks one and
 * configures it with data — it does not ship its own renderer.
 */
export type SimPrimitive =
  | 'plot2d'
  | 'atom'
  | 'molecule'
  | 'balance'
  | 'bonding'
  | 'chromatogram'
  | 'giant'
  | 'ladder'
  | 'lattice'
  | 'periodictable'
  | 'sort'
  | 'match'
  | 'punnett'
  | 'pyramid'
  | 'beam'
  | 'vectors'
  | 'particles'
  | 'waves'
  | 'raytrace'
  | 'circuit'
  | 'field2d'
  | 'scene3d'
  | 'apparatus'
  | 'graphpaper'

/** A named value for a discrete parameter, e.g. choosing a medium or a wave type. */
export interface ParamOption {
  value: number
  label: Bilingual
}

export interface ParamSpec {
  key: string
  label: Bilingual
  /** SI-ish unit string rendered next to the value, e.g. 'm / s' */
  unit: string
  min: number
  max: number
  step: number
  default: number
  /** Symbol rendered in KaTeX, e.g. 'v_0' */
  symbol?: string
  /**
   * When present the parameter renders as a row of buttons rather than a slider.
   * Use for genuinely discrete choices — a two-position slider is a poor control.
   */
  options?: ParamOption[]
  /**
   * Hide from the control panel. For parameters the student sets by dragging on the
   * canvas, or that the animation clock drives.
   */
  hidden?: boolean
}

export interface ReadoutSpec {
  key: string
  label: Bilingual
  unit: string
  /** Significant figures used when displaying. IGCSE cares about this. */
  sigFigs: number
  symbol?: string
  /**
   * Print the value as it is, rather than padding it to `sigFigs`.
   *
   * For quantities that are exact rather than measured: counts (electrons, protons,
   * product molecules) and sums of tabulated values (a relative molecular mass). "23.0
   * electrons" is nonsense, and so is an M_r of "30.0" — but chloromethane's really is
   * 50.5, so rounding to a whole number would be wrong too.
   */
  exact?: boolean
}

/**
 * Drives one parameter from an animation clock.
 *
 * The kernel stays a pure function of its parameters — the renderer simply advances
 * the named parameter each frame. So an animated simulation is still fully testable
 * by calling the kernel at chosen times.
 */
export interface AnimateSpec {
  /** Parameter to advance (must exist in `params`) */
  param: string
  /** Units of that parameter per real second */
  speed: number
  /** Value at which to wrap back to `min`, giving a seamless loop */
  loop: number
}

/**
 * A one-click scenario.
 *
 * Worth having because a slider does not tell a student *where to look*. "Just past
 * the critical angle" or "balanced" jumps straight to the configuration that makes
 * the point, and they can perturb it from there.
 */
export interface SimPreset {
  label: Bilingual
  params: Record<string, number>
}

export interface SimSpec {
  primitive: SimPrimitive
  /** Kernel module id, resolved through the registry (see lib/registry.ts) */
  kernel: string
  params: ParamSpec[]
  readouts: ReadoutSpec[]
  animate?: AnimateSpec
  /**
   * Parameters the student can set by dragging on the canvas. The primitive decides
   * what the gesture means; listing them here documents the intent and lets the
   * integrity check confirm they exist.
   */
  draggable?: string[]
  presets?: SimPreset[]
  /** One line telling the student what they can do with the canvas. */
  hint?: Bilingual
  /**
   * Primitive-specific mode. Lets one renderer serve related topics that share geometry
   * but not iconography — `field2d` draws magnets for 'magnetic' and charges for
   * 'electric', for instance.
   */
  variant?: string
}

/**
 * Every kernel is a pure function: params in, derived series and readouts out.
 * No side effects, no DOM, no React — so it can be unit-tested directly.
 * (Pattern borrowed from ChemAIForge's `react(Substance[], Conditions) => ReactionResult`.)
 */
export type SimKernel<P = Record<string, number>, R = SimResult> = (params: P) => R

/**
 * A reference line across a plot — a melting point, absolute zero, the temperature an
 * industrial plant actually runs at.
 *
 * Worth having because half the graphs in this course are read against a value that is not
 * on the curve. "The yield at 450 °C" means finding 450 on the axis and following it up by
 * eye, and a student who lands on 400 draws the wrong conclusion from a correct graph. The
 * line does the finding.
 *
 * The label is a plain string rather than `Bilingual`: what goes here is a value with its
 * unit — "0 °C", "450 °C, the industrial temperature" is too long for the space. Anything
 * needing prose belongs in a marker note under the plot.
 */
export interface SimGuide {
  /** `x` draws a vertical line at this value; `y` draws a horizontal one. */
  axis: 'x' | 'y'
  value: number
  label?: string
}

export interface SimSeries {
  key: string
  label: Bilingual
  /** Axis units, e.g. { x: 's', y: 'm' } */
  unit: { x: string; y: string }
  points: Array<[number, number]>
  /**
   * Reference lines drawn across the panel this series is on. Collected across every series
   * sharing the panel, so it does not matter which one carries them.
   */
  guides?: SimGuide[]
  /**
   * Fixed y-axis bounds, when the quantity has a natural range the data does not reach.
   * pH runs 0–14, so letting the axis round up to 20 would be wrong even though no point
   * exceeds it.
   *
   * Also the way to stop an axis rescaling as parameters change. Where a lesson asks the
   * student to compare two settings, a self-scaling axis quietly normalises away the very
   * difference being pointed at.
   */
  yBounds?: { min: number; max: number }
  /**
   * Fixed x-axis bounds. Mainly for counted quantities — five gridlines across 0–4 land
   * on the integers, where an auto-scaled 0–5 would put ticks at 1.25 and 3.75 and no
   * point on the curve would sit on a gridline.
   */
  xBounds?: { min: number; max: number }
}

/**
 * A drawable object in the simulation's own coordinate space — a gas particle, a
 * hanging weight, a wave medium particle. Distinct from `series` (which is a line)
 * and `markers` (which carry labels).
 */
export interface SimBody {
  x: number
  y: number
  /** Radius in simulation units; the primitive picks a sensible default if absent. */
  r?: number
  /** Free-form tag the primitive uses to style the body, e.g. 'fast' | 'weight'. */
  kind?: string
  /**
   * Text drawn on the body — an element symbol, an ionic charge, a component's value.
   *
   * Deliberately a plain string, not `Bilingual`: what goes here is notation rather than
   * prose. "Na" and "2+" are the same in every language, and a translated chemical symbol
   * would be wrong rather than merely unhelpful.
   */
  label?: string
}

/**
 * A connection between two bodies, by index into `bodies` — a covalent bond, a lattice
 * edge, a linkage in a mechanism.
 *
 * Bonds are a relation, not a body, so they live here rather than being faked as bodies
 * with a position. That keeps `bodies.length` equal to the number of atoms, which is what
 * lets a molecular formula be counted straight off the drawing.
 */
export interface SimLink {
  a: number
  b: number
  /** Bond order: 1 single, 2 double, 3 triple. Defaults to 1. */
  order?: number
  /** Free-form tag, e.g. 'functional' to pick out the group that drives the chemistry. */
  kind?: string
}

/**
 * An exercise where the student assigns items to targets.
 *
 * Sorting into categories and matching pairs are the same problem wearing different
 * clothes — put each item somewhere, and be right or wrong about it — so both primitives
 * read this one structure and differ only in how they draw it. `sort` shows the targets as
 * bins with the unplaced items pooled beneath; `match` shows two columns and joins them.
 *
 * The student's answers live in the simulation's parameters like any other input, one
 * hidden parameter per item, so the kernel stays a pure function and a test can drive the
 * exercise to any state without a browser.
 */
export interface SimAssignment {
  items: Array<{
    id: string
    label: Bilingual
    /** Id of the target this item actually belongs on. */
    target: string
    /** Where the student has put it. Absent while it is still unplaced. */
    placed?: string
  }>
  targets: Array<{ id: string; label: Bilingual; hint?: Bilingual }>
}

/**
 * A Punnett square: the gametes of one parent along the top, the other down the side, and
 * every combination of them in the cells.
 *
 * Deliberately free of genetics vocabulary. The renderer is told about columns, rows, cells
 * and groups; it is not told what an allele is. That is what lets the same grid draw a
 * monohybrid cross, a codominant one, sex determination and a sex-linked cross — four
 * things the syllabus treats separately and which are the same operation underneath.
 *
 * `groups` is the set of distinct outcomes in the order they should be listed and coloured,
 * and `groupOf` says which one each cell belongs to. Keeping that mapping in the data rather
 * than in the renderer is what makes codominance possible: three genotypes and three
 * phenotypes, where a dominant cross has three genotypes and two phenotypes.
 */
export interface SimGrid {
  /** Gametes forming the columns, and a heading naming the parent they came from. */
  columns: string[]
  columnsLabel: Bilingual
  /** Gametes forming the rows, and a heading naming that parent. */
  rows: string[]
  rowsLabel: Bilingual
  /** Offspring at `cells[row][column]`. */
  cells: string[][]
  /** Distinct outcomes, in display order. */
  groups: Array<{ id: string; label: Bilingual }>
  /** Which group each cell value belongs to. */
  groupOf: Record<string, string>
}

/**
 * An ecological pyramid: trophic levels stacked from the producers upwards.
 *
 * `value` is the real quantity and is printed on the bar. The bar *widths* are drawn on a
 * logarithmic scale, which needs saying out loud: a pyramid of numbers can run from one oak
 * tree to half a million insects, six orders of magnitude, and drawn to scale every level
 * above the first would be a hairline. Textbooks solve this by drawing pyramids of numbers
 * not to scale at all; a log scale is the same concession made honestly, and it keeps the
 * ordering — and so any inversion — visible, which is the whole thing the diagram is for.
 */
export interface SimPyramid {
  /** Levels from the bottom — the producers — upwards. */
  levels: Array<{ label: Bilingual; value: number; detail?: Bilingual }>
  /** Unit of `value`. Notation, so it is not translated. */
  unit: string
}

/**
 * A chemical equation with the coefficients the student has chosen, and the atom count on
 * each side worked out element by element.
 *
 * The tally is the whole exercise: balancing is not guessing coefficients until it looks
 * right, it is making two columns of numbers agree, and a student who cannot see the columns
 * has nothing to reason with.
 */
export interface SimEquation {
  left: Array<{ coefficient: number; formula: string; state: string }>
  right: Array<{ coefficient: number; formula: string; state: string }>
  tally: Array<{ element: string; left: number; right: number }>
}

/**
 * A developed chromatogram: a strip of paper with a baseline, a solvent front and the spots
 * between them.
 *
 * Distances are in centimetres from the baseline, and every spot carries its own Rf. Keeping
 * both means the picture and the arithmetic cannot disagree — which matters here, because the
 * whole point of Rf is that the distances change when the plate is run for longer and the
 * ratio does not.
 */
export interface SimChromatogram {
  /** How far the solvent front travelled from the baseline, in cm. */
  solventDistance: number
  lanes: Array<{
    label: Bilingual
    spots: Array<{ label: string; distance: number; rf: number; highlighted?: boolean }>
  }>
}

export interface SimResult {
  series: SimSeries[]
  /** Present only for the `sort` and `match` primitives. */
  assignment?: SimAssignment
  /** Present only for the `punnett` primitive. */
  grid?: SimGrid
  /** Present only for the `pyramid` primitive. */
  pyramid?: SimPyramid
  /** Present only for the `balance` primitive. */
  equation?: SimEquation
  /** Present only for the `chromatogram` primitive. */
  chromatogram?: SimChromatogram
  /** Keyed by ReadoutSpec.key */
  readouts: Record<string, number>
  /** Optional annotations the renderer may draw (markers, regions) */
  markers?: Array<{ x: number; y: number; label: Bilingual }>
  bodies?: SimBody[]
  links?: SimLink[]
  /**
   * Extent of the simulation's coordinate space, for primitives that draw in a
   * physical geometry rather than on graph axes.
   */
  bounds?: { xMin: number; xMax: number; yMin: number; yMax: number }
}

// ---------------------------------------------------------------------------
// Equations
// ---------------------------------------------------------------------------

export interface EquationBlock {
  /** KaTeX source, e.g. 'v = \\frac{s}{t}' */
  latex: string
  /** What the equation says, in words */
  meaning: Bilingual
  /**
   * Optional live substitution: the same equation with current values filled in.
   * Receives the current readouts so the student sees their numbers in the formula.
   */
  substitute?: (readouts: Record<string, number>) => string
}

// ---------------------------------------------------------------------------
// Glossary — the main vehicle for Chinese scaffolding
// ---------------------------------------------------------------------------

export interface Term {
  /** The English term as it appears in exams — this is what students must learn */
  en: string
  /** Chinese gloss, shown on hover/inline depending on the assist level */
  zh: string
  definition: Bilingual
  /** Statement ids where this term is assessed */
  syllabus?: string[]
}

// ---------------------------------------------------------------------------
// Assessment
// ---------------------------------------------------------------------------

/** The 15 command words defined by the 0625 syllabus. */
export type CommandWord =
  | 'Calculate'
  | 'Comment'
  | 'Compare'
  | 'Deduce'
  | 'Define'
  | 'Describe'
  | 'Determine'
  | 'Explain'
  | 'Give'
  | 'Identify'
  | 'Justify'
  | 'Predict'
  | 'Sketch'
  | 'State'
  | 'Suggest'

export interface MarkPoint {
  /** The creditworthy point, in English — this is mark-scheme language */
  text: string
  marks: number
  /** Equally acceptable alternative wordings */
  alternatives?: string[]
}

export interface Question {
  id: string
  syllabus: string[]
  tier: LessonTier
  commandWord: CommandWord
  marks: number
  /**
   * Question stem — **English only, by design**. Students must practise reading and
   * answering in the language of the exam, so we deliberately do not translate stems.
   */
  stem: string
  /** For multiple-choice items (Papers 1 and 2 are 4-option MCQ) */
  options?: string[]
  answerIndex?: number
  markScheme: MarkPoint[]
  /** Why candidates lose marks here — Chinese is welcome in this field */
  examinerNote?: Bilingual
}

// ---------------------------------------------------------------------------
// Narration
// ---------------------------------------------------------------------------

export type NarrationSectionType =
  | 'intro'
  | 'concept'
  | 'equation'
  | 'animation'
  | 'interaction'
  | 'worked-example'
  | 'application'
  | 'summary'

/**
 * A narration line may drive the simulation, so that the explanation and the canvas
 * stay in step. (Model adapted from mathviz's `narrations/types.ts`.)
 */
export interface NarrationAction {
  type: 'setParams' | 'play' | 'pause' | 'reset' | 'highlight'
  params?: Record<string, number>
  /** CSS selector of the UI element to highlight */
  target?: string
}

export interface NarrationLine {
  id: string
  text: Bilingual
  /** Related formula shown while this line plays */
  latex?: string
  action?: NarrationAction
  /** Seconds to pause after this line */
  pause?: number
}

export interface NarrationSection {
  id: string
  type: NarrationSectionType
  title: Bilingual
  lines: NarrationLine[]
}

export interface NarrationScript {
  /** Matches the lesson slug */
  id: string
  sections: NarrationSection[]
}

// ---------------------------------------------------------------------------
// Lesson
// ---------------------------------------------------------------------------

export interface Lesson {
  slug: string
  /**
   * Awarding-body code of the subject this lesson belongs to, e.g. '0625' or '0620'.
   * Must match the directory it lives in: `content/lessons/<subject>/<slug>/`.
   */
  subject: string
  /** Statement ids this lesson teaches. Required — every lesson is anchored to the syllabus. */
  syllabus: string[]
  tier: LessonTier
  title: Bilingual
  summary: Bilingual
  /** Our own learning outcomes, aligned to but not copied from the syllabus */
  objectives: Bilingual[]
  glossary: Term[]
  equations: EquationBlock[]
  sim?: SimSpec
  narration: NarrationScript
  /** Formative checks shown inline in the lesson */
  checkpoints: Question[]
  /** id of a related Paper 5/6 practical, if any */
  practical?: string
  /** Rough teaching time in minutes */
  estimatedMinutes: number
  /**
   * Visual / interactive learning modules — anatomy explorers, animations, mini-games.
   *
   * Why a separate field rather than packing everything into the sim: the `sim` is one
   * `primitive` (a renderer) wired to one kernel (pure function). These are bespoke,
   * data-driven interactive modules that do not fit the series/assignment/grid/pyramid
   * shape, so they live alongside it. The renderer dispatches on `type` and the lesson
   * author picks the order.
   */
  extras?: LessonExtra[]
}

// ---------------------------------------------------------------------------
// Lesson extras — visual / interactive learning modules
// ---------------------------------------------------------------------------

/**
 * A single visual or interactive module rendered as its own section in the lesson.
 *
 * The `type` is a discriminator the renderer uses to pick a component. Each variant
 * carries only the data that component needs; we do not try to homogenise them.
 */
export type LessonExtra =
  | DigestiveAnatomyExtra
  | TeethAnatomyExtra
  | VilliSurfaceAreaExtra
  | BileEmulsificationExtra
  | BalancedPlateExtra
  | DigestionFlowExtra
  | VillusDetailExtra
  | FoodEnergyExtra
  | DiseaseCardsExtra
  | EnergyNeedsExtra
  | HeartAnatomyExtra
  | BloodComponentsExtra
  | BloodVesselsCompareExtra
  | DoubleCirculationExtra
  | RespirationCompareExtra
  | AirwayPathwayExtra
  | GasExchangeFeaturesExtra
  | SmokingEffectsExtra
  | ReflexArcExtra
  | EyeAnatomyExtra
  | GlucoseLoopExtra
  | TemperatureControlExtra
  | ReproductiveAnatomyExtra
  | SpermVsEggExtra
  | FertilisationJourneyExtra
  | PlacentaExchangeExtra
  | DnaToProteinExtra
  | MitosisVsMeiosisExtra
  | PunnettGridExtra
  | PedigreeTraceExtra
  | FoodWebExtra
  | PyramidCompareExtra
  | NutrientCycleExtra
  | PopulationCurveExtra
  | OrganAnatomyExtra
  | DnaHelix3DExtra
  | FoodWeb3DExtra
  | ConceptExplainerExtra
  | VisualIllusionsExtra
  | NeuroneStructureExtra
  | ThreeNeuronesExtra

/** What to show in the side panel when an organ is selected. */
export interface AnatomyOrgan {
  /** Stable id, used as the React key and as the click target on the SVG. */
  id: string
  /** Display name. */
  name: Bilingual
  /** What happens here, in one or two short paragraphs. */
  description: Bilingual
  /** Key secretions or events, rendered as a small chip row under the description. */
  secretions?: Bilingual[]
  /**
   * Approximate stop number on the "follow the food" timeline (1-based). Used to
   * sequence organs mouth→anus in the animated trace. Organs without a stop number
   * (liver, gall bladder, pancreas — they contribute, not the food passes through) are
   * left out of the timeline.
   */
  stop?: number
  /**
   * Normalised 3D position for the hotspot, used when this organ is rendered
   * inside a 3D model (e.g. the heart in `HeartAnatomy`'s 3D tab). Each
   * coordinate is in [0, 1] relative to the loaded GLB's bounding box —
   * 0 is the minimum, 1 the maximum. Ignored by the 2D renderer; absent means
   * the 3D renderer skips the hotspot for this part.
   */
  position3d?: [number, number, number]
}

export interface DigestiveAnatomyExtra {
  type: 'digestive-anatomy'
  id: string
  title: Bilingual
  /** What the user is meant to notice, in one line. */
  hint: Bilingual
  /**
   * The organs shown in the body silhouette, in display order. Each becomes a clickable
   * hotspot; the matching side panel describes what happens there.
   */
  organs: AnatomyOrgan[]
  /**
   * Which organ to highlight on first render. Optional — if absent, no organ is
   * selected and the panel shows the intro hint instead.
   */
  initialOrgan?: string
}

/** A single tooth type — its count, shape and what it does. */
export interface ToothKind {
  id: string
  name: Bilingual
  /** How many of this kind an adult has. */
  count: number
  /** What it is for. */
  role: Bilingual
  /**
   * A short shape description used as a fallback in the gallery when no SVG path is
   * provided. The default is a generic "molar-like" silhouette.
   */
  shape?: Bilingual
}

export interface TeethAnatomyExtra {
  type: 'teeth-anatomy'
  id: string
  title: Bilingual
  hint: Bilingual
  /** Layers of a tooth, drawn outside-in. */
  layers: Array<{
    id: string
    name: Bilingual
    /** What this layer is made of / what it does. */
    description: Bilingual
  }>
  kinds: ToothKind[]
}

export interface VilliSurfaceAreaExtra {
  type: 'villi-surface-area'
  id: string
  title: Bilingual
  hint: Bilingual
  /** Inner radius of the small intestine in mm. Used as the basis for the area math. */
  radiusMm: number
  /** Length of the segment shown, in mm. */
  lengthMm: number
  /**
   * Recommended number of villi per cm² for the syllabus-friendly "×N" factor. The
   * kernel multiplies the unfolded area by this and rounds to a tidy number; the slider
   * just lets the student perturb it and see the result.
   */
  baselineVilliPerCm2: number
}

export interface BileEmulsificationExtra {
  type: 'bile-emulsification'
  id: string
  title: Bilingual
  hint: Bilingual
}

export interface BalancedPlateExtra {
  type: 'balanced-plate'
  id: string
  title: Bilingual
  hint: Bilingual
  /**
   * Foods the student can put on their plate. Categorised so the renderer can colour
   * them and the scoring can check coverage.
   */
  foods: Array<{
    id: string
    name: Bilingual
    /** Group on the plate — drives the section colour and the scoring. */
    group: 'carb' | 'protein' | 'veg' | 'fruit' | 'dairy' | 'fat'
    /** Hand-drawn emoji or glyph used as a quick visual on the food card. */
    glyph: string
  }>
  /**
   * Minimum recommended servings per group. The check lights up green when each
   * group has at least this many. Designed to be generous — half a plate of veg
   * is the lesson, not a precise calorie count.
   */
  targets: Record<'carb' | 'protein' | 'veg' | 'fruit' | 'dairy' | 'fat', number>
}

/**
 * The chain of events from a sandwich in the mouth to a faeces at the anus, plus the
 * six formal terms the syllabus uses for each step.
 *
 * Drawn as a horizontal flowchart with the terms as labelled boxes, the definitions
 * as togglable cards beneath. Same pattern as the other "data, then reveal"
 * interactive modules.
 */
export interface DigestionFlowExtra {
  type: 'digestion-flow'
  id: string
  title: Bilingual
  hint: Bilingual
  /** Ordered pipeline of stages the food actually passes through. */
  stages: Array<{
    id: string
    label: Bilingual
    /** One-line summary shown on the flow box. */
    summary: Bilingual
  }>
  /** Definitions the lesson author wants the student to remember. */
  definitions: Array<{
    id: string
    term: Bilingual
    definition: Bilingual
  }>
}

/**
 * A labelled cross-section of a single villus. More detail than `VilliSurfaceArea`
 * (which is a numeric "how big is the multiplier" exercise): this one shows the
 * named structures — epithelium, capillary network, lacteal, microvilli — and the
 * direction each type of nutrient takes across the wall.
 */
export interface VillusDetailExtra {
  type: 'villus-detail'
  id: string
  title: Bilingual
  hint: Bilingual
  /** Layers, outside-in. Click to highlight. */
  parts: Array<{
    id: string
    name: Bilingual
    description: Bilingual
    /** Which side of the wall this structure is on, used to position the label. */
    side: 'outside' | 'inside' | 'core' | 'surface'
  }>
  /** Nutrients crossing the wall, with where they go. */
  transport: Array<{
    id: string
    name: Bilingual
    destination: Bilingual
  }>
}

/**
 * Energy content of foods, kJ per 100 g. The point is *comparison*: the same
 * mass of fat carries more than twice the energy of the same mass of carbohydrate
 * or protein, which is the explanation for the obesity / fried-food line in
 * Chapter 1.1.
 */
export interface FoodEnergyExtra {
  type: 'food-energy'
  id: string
  title: Bilingual
  hint: Bilingual
  foods: Array<{
    id: string
    name: Bilingual
    /** kJ per 100 g. */
    energy: number
    /** Coarse grouping, drives the row colour. */
    group: 'carb' | 'protein' | 'fat' | 'fruit-veg' | 'dairy' | 'mixed'
  }>
}

/**
 * A grid of disease/condition cards: real clinical photographs, the mechanism
 * (how/why it happens), the clinical picture (symptoms), and the term in EN+ZH.
 *
 * Modeled on the G8 Science chapter-1.5 lifestyle-diseases block: rickets,
 * scurvy, kwashiorkor, marasmus, coronary heart disease, obesity. The pictures
 * are real medical/photojournalism images, not stylised illustrations — a
 * six-year-old's photo of a kwashiorkor belly tells a student more than any
 * drawn diagram.
 */
export interface DiseaseCardEntry {
  id: string
  /** Term English (matches a glossary entry). */
  term: Bilingual
  /** Why it happens — the mechanism. */
  mechanism: Bilingual
  /** What it looks like — symptoms, signs, clinical picture. */
  clinical: Bilingual
  /** Path under /public — the lesson's own images live under /figures/<source>/<lesson>/. */
  image: string
  /** Source attribution. */
  imageSource: Bilingual
  /** Optional callout colour, drives the card border. */
  severity?: 'deficiency' | 'lifestyle' | 'severe'
}

export interface DiseaseCardsExtra {
  type: 'disease-cards'
  id: string
  title: Bilingual
  hint: Bilingual
  cards: DiseaseCardEntry[]
}

/**
 * The energy-needs table (Figure B5.01 style). Three columns: demographic,
 * daily energy, the actual number. The point: energy needs depend on age, sex
 * and activity — there is no single "daily requirement" for a person.
 */
export interface EnergyNeedsRow {
  demographic: Bilingual
  activity: Bilingual
  energyKj: number
}

export interface EnergyNeedsExtra {
  type: 'energy-needs'
  id: string
  title: Bilingual
  hint: Bilingual
  rows: EnergyNeedsRow[]
  /**
   * Source for the energy figures — e.g. 'G8 Science Figure B5.01'.
   * The numbers are a re-presentation; the unit is kJ per day.
   */
  source: Bilingual
}

// ---------------------------------------------------------------------------
// 9-1 Transport in animals — Chapter 2 (B7) extras
// ---------------------------------------------------------------------------

/**
 * The mammalian heart, in one picture. Same shape as `DigestiveAnatomy`:
 * a base image with SVG hotspots, side panel that follows selection, optional
 * "follow the blood" mode that animates a dot through the chambers in
 * circulation order.
 *
 * The blood colours are the convention: red = oxygenated (left side of
 * heart and arteries leaving it), blue = deoxygenated (right side and
 * pulmonary artery). Veins carry the opposite colour of the artery that
 * parallels them — that is the whole point of the figure.
 */
export interface HeartAnatomyExtra {
  type: 'heart-anatomy'
  id: string
  title: Bilingual
  hint: Bilingual
  /**
   * Heart parts shown on the figure, in display order. Each becomes a
   * clickable hotspot; the matching side panel describes it.
   *
   * `stop` is used by the "follow the blood" mode to sequence parts along
   * the pulmonary + systemic loops. `position3d` is the 3D tab's hotspot
   * anchor (see `AnatomyOrgan`).
   */
  parts: AnatomyOrgan[]
  /**
   * Which part to highlight on first render. Optional.
   */
  initialPart?: string
  /**
   * Optional path under /public to a `.glb` 3D model. When set, the
   * `HeartAnatomy` viewer adds a "3D" tab alongside the 2D figure so the
   * student can rotate the heart and click the same hotspots in 3D.
   */
  model3d?: string
}

/**
 * Which organ model the 3D viewer should load. The slug matches the
 * filenames under `public/figures/3d/<organ>.glb` and the illustration
 * set under `public/figures/3d/<organ>/`.
 */
export type OrganSlug =
  | 'heart'
  | 'brain'
  | 'lungs'
  | 'liver'
  | 'kidneys'
  | 'eyeball'
  | 'intestine'
  | 'pancreas'
  | 'skin'

/**
 * The 3D anatomy viewer for any organ with a GLB model. Re-uses the same
 * R3F viewer that powers `HeartAnatomy`'s 3D tab, but standalone — no
 * 2D figure needed. The student rotates, zooms, and clicks hotspots.
 *
 * The hotspot data is built in `organData.ts` and the lesson.ts file
 * just selects which organ + which parts to show. The component picks
 * the matching `system` label (cardiovascular / nervous / etc.) and the
 * side panel copy for each part.
 */
export interface OrganAnatomyExtra {
  type: 'organ-anatomy'
  id: string
  title: Bilingual
  hint: Bilingual
  /** Which organ model to load. */
  organ: OrganSlug
  /** Which body system the organ belongs to (used in the side panel). */
  system: Bilingual
  /** Optional one-line caption shown above the canvas. */
  intro?: Bilingual
  /** Parts to show as hotspots. Their `position3d` is the 3D anchor. */
  parts: AnatomyOrgan[]
  /** Which part to highlight on first render. */
  initialPart?: string
}

/**
 * A single base pair in the 3D DNA helix. `name` is the public label
 * shown in the side panel; `description` is the explanatory text.
 */
export interface DnaBaseDescription {
  name: Bilingual
  description: Bilingual
}

/**
 * Procedurally drawn 3D DNA double helix (Chapter 17, Inheritance).
 * No GLB — every strand and base pair is a R3F primitive, so the
 * component ships at <20 KB. The 14-rung demo sequence below gives
 * a stable, photogenic mix of A-T and G-C pairs.
 */
export interface DnaHelix3DExtra {
  type: 'dna-helix-3d'
  id: string
  title: Bilingual
  hint: Bilingual
  /** Optional one-line caption shown above the canvas. */
  intro?: Bilingual
  /**
   * The base-pair sequence shown along the helix. Defaults to a
   * 14-pair demo if not provided. Each entry is `{ left, right }` —
   * the two strands (A always pairs with T, G always with C).
   */
  sequence?: { left: string; right: string }[]
  /**
   * Per-pair descriptions keyed by `"A-T"`, `"T-A"`, `"G-C"`, `"C-G"`.
   * Used in the side panel when a rung is selected.
   */
  baseDescriptions?: Record<string, DnaBaseDescription>
  /** Which rung (0-indexed) to highlight on first render. */
  initialIndex?: number
  /** Auto-rotate the helix while the user is not interacting. */
  autoRotate?: boolean
}

/**
 * A 3D, R3F-procedural rendering of a food web for Chapter 19 (Ecosystems).
 * The same node + edge data shape as the 2D `FoodWeb` extra, but stacked
 * by trophic level on the Y axis and rotated so the student sees both
 * the producer floor and the tertiary-consumer ceiling.
 *
 * Re-uses `FoodWebNode` / `FoodWebEdge` so the lesson file can keep one
 * source of truth for the species list.
 */
export interface FoodWeb3DExtra {
  type: 'food-web-3d'
  id: string
  title: Bilingual
  hint: Bilingual
  /** Which species to highlight on first render. */
  initialSelected?: string
  /** The species to plot. `x` / `y` are ignored — the 3D version
   *  re-lays out by trophic level and a stable hash of the id. */
  nodes: FoodWebNode[]
  edges: FoodWebEdge[]
  /** Auto-rotate the web while the user is not interacting. */
  autoRotate?: boolean
}

/**
 * One self-contained block of a `ConceptExplainer` extra: a real-world
 * hook, the underlying science, why it matters outside the textbook, and
 * (optionally) a classroom anecdote.
 *
 * Designed for "lesson extensions that came out of the teacher's own
 * classroom" — e.g. the telomere / Hayflick / HeLa story from a
 * 8/5 17-1 lesson, the hygiene hypothesis from 14-1, the PM2.5 / fog /
 * haze distinction from 11-1. They are too long to live in a single
 * `Term` definition and too factual to be a vocab card, but they are
 * the kind of "wait, that's why" fact the student remembers a year
 * later.
 */
export interface ConceptExplainerBlock {
  id: string
  title: Bilingual
  /** A story, question or fact that pulls the reader in. */
  hook: Bilingual
  /** The actual science — what's happening at the molecular / cellular / system level. */
  mechanism: Bilingual
  /** Why this matters in real life: clinical, public-health, exam relevance. */
  whyItMatters: Bilingual
  /** Optional anecdote from the classroom, a memorable image, a metaphor. */
  teacherStory?: Bilingual
}

/**
 * A vertical stack of concept blocks. Each lesson uses one of these to
 * package a single "big idea" (one block) or a small family of related
 * ideas (multiple blocks — e.g. fog vs haze vs PM2.5 vs PM10).
 */
export interface ConceptExplainerExtra {
  type: 'concept-explainer'
  id: string
  title: Bilingual
  hint: Bilingual
  blocks: ConceptExplainerBlock[]
  /**
   * Optional hero figure — a real G8 PDF figure that anchors the whole
   * explainer in one picture. Used by 11-1 mucociliary-escalator
   * (G8 Figure B8.03 — goblet cell / cilia / mucus) so the student sees
   * the three cell types before reading the mechanism.
   */
  heroImage?: string
  heroImageSource?: Bilingual
}

/**
 * A gallery of classic visual illusions plus a few hands-on
 * experiments. Used in 14-1 (eye section) as supplementary material
 * — the textbook doesn't cover this, but the user asked for it
 * because it makes the lesson's "the eye is a real measurement
 * device, not a camera" point land.
 */
export interface VisualIllusion {
  id: string
  title: Bilingual
  /** Reference to the SVG file under /public/figures/illusions/. */
  image: { en: string; zh: string }
  whatYouSee: Bilingual
  why: Bilingual
}

export interface VisualIllusionExperiment {
  id: string
  title: Bilingual
  /** The user-facing instructions, 1-2 short sentences. */
  instructions: Bilingual
  /** The vision-science principle the experiment demonstrates. */
  principle: Bilingual
}

export interface VisualIllusionsExtra {
  type: 'visual-illusions'
  id: string
  title: Bilingual
  hint: Bilingual
  illusions: VisualIllusion[]
  experiments: VisualIllusionExperiment[]
}

/**
 * A single motor neurone in section, G8 Figure B9.01. The user clicks a
 * region of the diagram (cell body, nucleus, dendrites, axon, myelin
 * sheath, axon terminals) and the side panel describes what is there and
 * what it does. Same shape as `EyeAnatomy`'s hotspot-based parts, but
 * the figure is inline SVG rather than a bitmap — drawing it inline
 * keeps the project self-contained (no image-file dependency) and lets
 * the hotspots scale crisply.
 *
 * Hotspot coordinates are in the SVG viewBox of the figure. The renderer
 * owns the viewBox dimensions; the data just tells it where each part
 * sits in that viewBox.
 */
export interface NeuronePart {
  id: string
  name: Bilingual
  description: Bilingual
  /**
   * Where the part sits in the figure. The renderer draws an invisible
   * click-target at this position. The figure's own visible artwork
   * (cell-body outline, axon line, myelin segments, etc.) is rendered by
   * the component — hotspots are only for clicks.
   */
  hotspot:
    | { type: 'circle'; cx: number; cy: number; r: number }
    | { type: 'ellipse'; cx: number; cy: number; rx: number; ry: number }
    | { type: 'rect'; x: number; y: number; width: number; height: number }
}

export interface NeuroneStructureExtra {
  type: 'neurone-structure'
  id: string
  title: Bilingual
  hint: Bilingual
  parts: NeuronePart[]
  /**
   * Width and height of the inline-SVG viewBox. The component draws the
   * visible artwork using these dimensions; hotspots use the same
   * coordinate space. Defaults to 400 × 200 if omitted.
   */
  viewBox?: { width: number; height: number }
}

/**
 * The three types of neurone side by side, G8 Figure B9.05. The user
 * picks one of the three (sensory / relay / motor) and the side panel
 * describes its structure and what makes it different from the other
 * two. The renderer draws the three neurones at fixed positions inside
 * a single SVG and toggles which one is "active" — that one gets a
 * colour highlight on its key structural feature (e.g. the long axon
 * of the motor neurone).
 */
export interface NeuroneProfile {
  id: 'sensory' | 'relay' | 'motor'
  name: Bilingual
  description: Bilingual
  /**
   * The single structural feature that distinguishes this neurone type
   * from the other two. Shown as a labelled callout on the diagram and
   * quoted in the side panel.
   */
  distinguishingFeature: Bilingual
}

export interface ThreeNeuronesExtra {
  type: 'three-neurones'
  id: string
  title: Bilingual
  hint: Bilingual
  neurones: NeuroneProfile[]
}

/**
 * A grid of the four blood components: plasma, red cells, white cells
 * (lymphocytes + phagocytes), platelets. Each card has a real figure from
 * the G8 PDF and a one-paragraph function.
 *
 * Same shape as `DiseaseCards` (cards with image + mechanism + clinical)
 * but applied to components rather than conditions, so we re-use that
 * `DiseaseCardEntry` shape under a different extra type id.
 */
export interface BloodComponentsExtra {
  type: 'blood-components'
  id: string
  title: Bilingual
  hint: Bilingual
  cards: DiseaseCardEntry[]
}

/**
 * A three-way compare of artery, capillary and vein. Same pattern as the
 * `VilliSurfaceArea` "before / after" idea but with three columns. The
 * figure shows the cross-section of each, the table shows wall / lumen /
 * valves / direction / pressure, and the third column is a one-line
 * function.
 *
 * Card carries the same `Bilingual` shape as other enrichments, so the
 * data is fully in lesson.ts.
 */
export interface BloodVesselSpec {
  id: string
  name: Bilingual
  /** Wall thickness note, e.g. 'thick, with muscle and elastic fibres' */
  wall: Bilingual
  /** Lumen diameter note, e.g. 'narrow' */
  lumen: Bilingual
  /** Whether valves are present (only in veins) */
  hasValves: boolean
  /** Direction of blood flow relative to the heart */
  direction: Bilingual
  /** Blood pressure at typical points */
  pressure: Bilingual
  /** Function — what role does this vessel type play */
  function: Bilingual
  /** Image path under /public */
  image: string
  imageSource: Bilingual
}

export interface BloodVesselsCompareExtra {
  type: 'blood-vessels-compare'
  id: string
  title: Bilingual
  hint: Bilingual
  vessels: BloodVesselSpec[]
}

/**
 * The double circulation as a flowchart, modelled on `DigestionFlow`.
 * Each "station" on the loop is a place blood passes through, and the
 * side panel describes what happens there. "Follow the blood" mode
 * highlights each station in turn.
 */
export interface DoubleCirculationExtra {
  type: 'double-circulation'
  id: string
  title: Bilingual
  hint: Bilingual
  /** Ordered stations of the pulmonary + systemic loop, in flow order. */
  stations: Array<{
    id: string
    label: Bilingual
    /** One-line summary shown on the flow box. */
    summary: Bilingual
    /** `oxygenated` (red) or `deoxygenated` (blue) — drives box colour. */
    bloodState: 'oxygenated' | 'deoxygenated' | 'mixed'
    /** Loop this station belongs to: 'pulmonary' (heart ↔ lungs) or 'systemic' (heart ↔ body). */
    loop: 'pulmonary' | 'systemic'
  }>
  /** Definitions for the formal terms the syllabus uses (e.g. 'double circulation'). */
  definitions: Array<{
    id: string
    term: Bilingual
    definition: Bilingual
  }>
  /** Image path for the static figure shown above the flowchart. */
  image: string
  imageSource: Bilingual
}

// ---------------------------------------------------------------------------
// 11-1 Gas exchange and respiration — Chapter 3 (B8) extras
// ---------------------------------------------------------------------------

/**
 * A side-by-side comparison of aerobic and anaerobic respiration.
 *
 * Same shape as `BloodVesselsCompare`: a column per option, with rows for
 * each comparison axis. Plus the word equations below the table so the
 * student sees the chemistry, not just the words.
 */
export interface RespirationCompareExtra {
  type: 'respiration-compare'
  id: string
  title: Bilingual
  hint: Bilingual
  /** Rows of the comparison. Each row's `kind` decides how the value renders. */
  rows: Array<{
    id: string
    label: Bilingual
    aerobic: Bilingual
    anaerobic: Bilingual
  }>
  /** Word equations, one per kind. */
  equations: Array<{
    id: string
    /** 'aerobic' / 'anaerobic-muscle' / 'anaerobic-yeast' */
    kind: 'aerobic' | 'anaerobic-muscle' | 'anaerobic-yeast'
    latex: string
    meaning: Bilingual
  }>
  /** Source attribution (e.g. 'G8 Science p.36, Section B8.01'). */
  source: Bilingual
}

/**
 * The airways of the human gas-exchange system, with clickable hotspots
 * over the G8 Figure B8.01. Each labelled part (larynx, trachea, bronchus,
 * bronchiole, alveoli, diaphragm, ribs, pleural membranes) becomes a
 * clickable region with a side panel explaining its job.
 *
 * Same shape as `HeartAnatomy` / `DigestiveAnatomy`.
 */
export interface AirwayPathwayExtra {
  type: 'airway-pathway'
  id: string
  title: Bilingual
  hint: Bilingual
  parts: AnatomyOrgan[]
  initialPart?: string
}

/**
 * A reflex arc, shown on G8 Figure B9.04 (the hand-on-a-hot-plate diagram).
 *
 * Same shape as `AirwayPathway`: a base image with SVG hotspots and a side
 * panel. The "follow the impulse" mode is a key extra — the impulse must
 * visit the parts in the right order (receptor → sensory neurone → relay
 * neurone → motor neurone → effector), and the cycle does *not* go through
 * the brain. That single fact is the most-missed mark in the chapter.
 */
export interface ReflexArcExtra {
  type: 'reflex-arc'
  id: string
  title: Bilingual
  hint: Bilingual
  parts: AnatomyOrgan[]
  initialPart?: string
}

/**
 * The human eye in section. G8 Figure B9.06 — the same labelled diagram
 * every IGCSE student has to label in the exam.
 *
 * The 12 hotspots are: cornea, aqueous humour, iris, pupil, lens, ciliary
 * muscle, suspensory ligament, vitreous humour, retina, fovea, blind spot,
 * optic nerve. The sclera and choroid are intentionally left out — the
 * syllabus note in G8 says they are "for interest" and don't need to be
 * labelled.
 */
export interface EyeAnatomyExtra {
  type: 'eye-anatomy'
  id: string
  title: Bilingual
  hint: Bilingual
  parts: AnatomyOrgan[]
  initialPart?: string
}

/**
 * Blood glucose regulation, in one picture. G8 Figure B9.20 — the loop
 * pancreas ↔ liver ↔ blood, with arrows for "high" (insulin, red) and
 * "low" (glucagon, blue).
 *
 * Three modes: high (after a meal — insulin dominates), normal (set
 * point), low (after exercise — glucagon dominates). The "active" set of
 * arrows is highlighted; the rest fade. This is the canonical negative-
 * feedback example and worth showing in both directions.
 */
export interface GlucoseLoopExtra {
  type: 'glucose-loop'
  id: string
  title: Bilingual
  hint: Bilingual
  parts: AnatomyOrgan[]
}

/**
 * Temperature control. The skin (G8 Figure B9.17), with three modes —
 * body too hot, normal, body too cold — and the four effector responses
 * that change in each mode: vasodilation / vasoconstriction of skin
 * arterioles, sweating, hair position, shivering. The "too hot" view also
 * uses G8 Figure B9.18; the steady-state loop is a separate
 * `TemperatureLoop` part.
 */
export interface TemperatureControlExtra {
  type: 'temperature-control'
  id: string
  title: Bilingual
  hint: Bilingual
  parts: AnatomyOrgan[]
}

/**
 * The male and female human reproductive systems, side by side. Two tabs
 * (female / male), each with its own G8 figure (B11.01 / B11.03) and its
 * own set of labelled parts as hotspots. The side panel describes the
 * selected part.
 *
 * The two figures cannot share coordinates — the layouts are different
 * and the body silhouette is on opposite sides — so each tab keeps its
 * own `HOTSPOTS` map inside the component.
 */
export interface ReproductiveAnatomyExtra {
  type: 'reproductive-anatomy'
  id: string
  title: Bilingual
  hint: Bilingual
  initialTab?: 'female' | 'male'
  initialPart?: string
  female: { image: string; imageSource: Bilingual; parts: AnatomyOrgan[] }
  male: { image: string; imageSource: Bilingual; parts: AnatomyOrgan[] }
}

/**
 * The human sperm and egg, side by side. The two figures (G8 B11.04 egg,
 * B11.05 sperm) are real and the differences between them are what the
 * syllabus asks for: the cell biology of the gametes and how each is
 * shaped for its function.
 *
 * A side-by-side card grid: each row is one feature, with a left
 * (sperm) and right (egg) cell. The feature list comes from the lesson
 * — size, motility, cytoplasm, food store, acrosome, production rate.
 */
export interface SpermVsEggExtra {
  type: 'sperm-vs-egg'
  id: string
  title: Bilingual
  hint: Bilingual
  spermImage: string
  spermImageSource: Bilingual
  eggImage: string
  eggImageSource: Bilingual
  rows: Array<{
    id: string
    feature: Bilingual
    sperm: Bilingual
    egg: Bilingual
  }>
}

/**
 * The journey from intercourse to implantation, in three G8 figures.
 * Step 1 (G8 B11.06): how sperm get to the egg — the long swim up the
 * female tract. Step 2 (G8 B11.07): fertilisation — the sperm reaches
 * the egg, the acrosome releases enzymes, the nuclei fuse. Step 3
 * (G8 B11.08): implantation — the embryo embeds in the uterus lining.
 *
 * The figures stay on screen the whole time, but only the active one is
 * highlighted; the others fade. The student reads the matching
 * description in the side panel.
 */
export interface FertilisationJourneyExtra {
  type: 'fertilisation-journey'
  id: string
  title: Bilingual
  hint: Bilingual
  steps: Array<{
    id: string
    image: string
    imageSource: Bilingual
    title: Bilingual
    body: Bilingual
  }>
}

/**
 * The placenta and exchange between mother and fetus (G8 B11.09).
 *
 * Hotspots on the figure label the maternal and fetal sides (the lining
 * of the uterus, the space filled with the mother's blood, the fetal
 * capillaries, the umbilical cord) and the side panel describes each
 * one. A separate "what crosses the placenta" card lists the substances
 * that pass in each direction — the part most students lose marks on
 * in the exam.
 */
export interface PlacentaExchangeExtra {
  type: 'placenta-exchange'
  id: string
  title: Bilingual
  hint: Bilingual
  image: string
  imageSource: Bilingual
  parts: AnatomyOrgan[]
  toFetus: Bilingual[]
  toMother: Bilingual[]
  exchangeNote: Bilingual
}

/**
 * The four features that make the alveolus a good gas-exchange surface,
 * one card per feature. Modelled on `DiseaseCards` but applied to a
 * "good design" story rather than a "bad disease" story.
 */
export interface GasExchangeFeatureEntry {
  id: string
  term: Bilingual
  /** The feature itself (e.g. 'thin wall — one cell thick'). */
  mechanism: Bilingual
  /** Why it matters for gas exchange. */
  clinical: Bilingual
  image: string
  imageSource: Bilingual
}

export interface GasExchangeFeaturesExtra {
  type: 'gas-exchange-features'
  id: string
  title: Bilingual
  hint: Bilingual
  features: GasExchangeFeatureEntry[]
}

/**
 * The harm smoking does, in two halves: the substances in the smoke
 * (nicotine, tar, CO, particulates) as labelled arrows over the G8
 * Figure B8.07, and the resulting diseases (chronic bronchitis, lung
 * cancer, emphysema, CHD) with real figures from the G8 PDF.
 */
export interface SmokingEffectEntry {
  id: string
  term: Bilingual
  /** What the substance does / what the disease is. */
  mechanism: Bilingual
  /** Symptoms or clinical picture. */
  clinical: Bilingual
  image: string
  imageSource: Bilingual
}

export interface SmokingEffectsExtra {
  type: 'smoking-effects'
  id: string
  title: Bilingual
  hint: Bilingual
  /** Substance cards (nicotine, tar, CO, particulates). */
  substances: SmokingEffectEntry[]
  /** Disease cards (lung cancer, emphysema, chronic bronchitis, CHD). */
  diseases: SmokingEffectEntry[]
  /** Optional hero figure — usually the "what's in cigarette smoke" diagram. */
  heroImage?: string
  heroImageSource?: Bilingual
  /**
   * Optional closing "the evidence" panel. G8 Figure B8.09 — Doll's
   * correlation between annual cigarette consumption and annual lung-cancer
   * deaths in the UK, 1911–2001, for males and females separately. The card
   * is what turns the rest of the section from "this is bad" into "this is
   * measurable", and the lag (consumption rises, then deaths rise 20 years
   * later) is the actual proof of causation.
   */
  evidence?: {
    image: string
    imageSource: Bilingual
    heading: Bilingual
    body: Bilingual
    lagNote: Bilingual
  }
}

// ---------------------------------------------------------------------------
// Chapter 6 (17 Inheritance) extras
//
// G8 has no real PDF figures for this chapter in the unit's PDF — the
// 2026-2027 G8 textbook covers up to B11 (Reproduction) only. The
// extras therefore use hand-built SVG diagrams driven by data, the same
// data-driven approach used by `MitosisVsMeiosis` and `PunnettGrid`.
// ---------------------------------------------------------------------------

/** Single labelled region in a DNA-to-protein scene. */
export interface DnaToProteinPart {
  id: string
  name: Bilingual
  description: Bilingual
}

/** One stage of the central-dogma diagram. */
export interface DnaToProteinStage {
  /** Title shown above the diagram. */
  title: Bilingual
  /** Short caption shown in the side panel when nothing is selected. */
  intro: Bilingual
  parts: DnaToProteinPart[]
}

export interface DnaToProteinExtra {
  type: 'dna-to-protein'
  id: string
  title: Bilingual
  hint: Bilingual
  initialStage: 'transcription' | 'translation'
  transcription: DnaToProteinStage
  translation: DnaToProteinStage
}

/** A single row in the mitosis vs meiosis comparison. */
export interface MitosisVsMeiosisRow {
  id: string
  label: Bilingual
  mitosis: Bilingual
  meiosis: Bilingual
}

export interface MitosisVsMeiosisExtra {
  type: 'mitosis-vs-meiosis'
  id: string
  title: Bilingual
  hint: Bilingual
  intro: Bilingual
  mitosis: {
    heading: Bilingual
    /** Short outcome description shown under the diagram. */
    outcome: Bilingual
  }
  meiosis: {
    heading: Bilingual
    outcome: Bilingual
  }
  rows: MitosisVsMeiosisRow[]
}

/**
 * The genotype codes a parent can carry, depending on the cross.
 * For autosomal crosses: AA, Aa, aa.
 * For sex-linked: XY, Xy, XX, Xx, xx (mother contributes one X; father
 * contributes an X or a Y).
 */
export type PunnettParentGenotype =
  | 'AA' | 'Aa' | 'aa'
  | 'XY' | 'Xy' | 'XX' | 'Xx' | 'xx'

export type PunnettCross = 'monohybrid' | 'codominant' | 'sex-linked'

/** A single gamete written as a short string. */
export type PunnettGamete = 'A' | 'a' | 'X' | 'Y' | 'x'

export interface PunnettGridExtra {
  type: 'punnett-grid'
  id: string
  title: Bilingual
  hint: Bilingual
  intro: Bilingual
  initialCross: PunnettCross
  initialFather: PunnettParentGenotype
  initialMother: PunnettParentGenotype
}

/** A person on a pedigree chart. */
export interface PedigreeIndividual {
  id: string
  /** Display name shown in the side panel. */
  name: Bilingual
  /** Short description of what is known about this person. */
  description: Bilingual
  /**
   * The reasoning that fixes this person's genotype. For the autosomal
   * recessive case, the deduction chain is "if two unaffected parents
   * have an affected child, both parents must be carriers, etc."
   */
  deduction: Bilingual
  /** 'male' → square, 'female' → circle. */
  sex: 'male' | 'female'
  /** Generation tag shown in the side panel (I, II, III). */
  generation: 'I' | 'II' | 'III'
  /** Status in the autosomal recessive case. */
  autosomalStatus: 'affected' | 'carrier' | 'unaffected' | 'unknown'
  /** SVG x coordinate. */
  x: number
  /** SVG y coordinate. */
  y: number
  /** Optional small letter drawn inside the symbol (e.g. 'A'). */
  label?: string
}

export interface PedigreeTraceExtra {
  type: 'pedigree-trace'
  id: string
  title: Bilingual
  hint: Bilingual
  intro: Bilingual
  initialMode: 'autosomal' | 'sex-linked'
  initialSelected?: string
  individuals: PedigreeIndividual[]
}

// ---------------------------------------------------------------------------
// Chapter 7 (19 Organisms and their environment) extras
// ---------------------------------------------------------------------------

/** A short label in the food-web diagram (e.g. "oak", "rabbit"). */
export type FoodWebLabel = { id: string; label: Bilingual }

export interface FoodWebNode {
  id: string
  shortLabel: string
  name: Bilingual
  description: Bilingual
  trophic: 'producer' | 'primary' | 'secondary' | 'tertiary'
  /** What this organism eats (empty for producers). */
  eats: FoodWebLabel[]
  /** What eats this organism (empty for top predators). */
  eatenBy: FoodWebLabel[]
  x: number
  y: number
}

export interface FoodWebEdge {
  from: string
  to: string
}

export interface FoodWebExtra {
  type: 'food-web'
  id: string
  title: Bilingual
  hint: Bilingual
  intro: Bilingual
  initialSelected?: string
  /** Ids of the species that drive the two "remove a species" scenarios. */
  foxId: string
  rabbitId: string
  nodes: FoodWebNode[]
  edges: FoodWebEdge[]
}

/** One bar in a pyramid of numbers / biomass / energy. */
export interface PyramidLevel {
  /** Trophic-level label, e.g. "Tertiary consumers" or "Primary consumers". */
  label: string
  /** Numeric value, drawn proportionally to the max value across the chart. */
  value: number
  /** Fill colour for the bar. */
  color: string
}

export interface PyramidData {
  title: Bilingual
  /** Unit shown next to the value, e.g. "individuals", "kg", "kJ m⁻² yr⁻¹". */
  unit: string
  caption: Bilingual
  whyUseful: Bilingual
  /** What the chart can't show — usually a caveat for the syllabus. */
  limit: Bilingual
  levels: PyramidLevel[]
}

export interface PyramidCompareExtra {
  type: 'pyramid-compare'
  id: string
  title: Bilingual
  hint: Bilingual
  intro: Bilingual
  initialActive: 'numbers' | 'biomass' | 'energy'
  pyramids: {
    numbers: PyramidData
    biomass: PyramidData
    energy: PyramidData
  }
}

export interface NutrientReservoir {
  id: string
  label: Bilingual
  /** Stock description, e.g. "≈ 65 000 Gt as atmospheric CO₂". */
  stock: Bilingual
  x: number
  y: number
  color: string
}

export interface NutrientProcess {
  id: string
  label: Bilingual
  description: Bilingual
  /** Optional concrete example (e.g. "burning coal at 1 Gt C/yr"). */
  example?: Bilingual
  from: string
  to: string
  color: string
  /** Dashed if it's a slower / less direct process. */
  dashed?: boolean
}

export interface NutrientCycleExtra {
  type: 'nutrient-cycle'
  id: string
  title: Bilingual
  hint: Bilingual
  intro: Bilingual
  initialSelected?: string
  reservoirs: NutrientReservoir[]
  processes: NutrientProcess[]
}

export interface PopulationPoint {
  phase: 'lag' | 'exponential' | 'stationary' | 'decline'
  label: Bilingual
  description: Bilingual
  factors?: Bilingual[]
  x: number
  y: number
}

export interface PopulationCurveExtra {
  type: 'population-curve'
  id: string
  title: Bilingual
  hint: Bilingual
  intro: Bilingual
  initialPhase?: PopulationPoint['phase']
  xAxisLabel: string
  yAxisLabel: string
  /** Optional y-value to draw the carrying-capacity line at. */
  carryingCapacity?: number
  points: PopulationPoint[]
}
