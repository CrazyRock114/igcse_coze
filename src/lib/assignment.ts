import type { Bilingual, ParamSpec, SimAssignment } from '@/content/types'

/**
 * Sorting and matching exercises, where the student assigns items to targets.
 *
 * The student's answers are held in the simulation's parameters — one hidden parameter per
 * item, `0` for unplaced and `n` for the nth target. That is not a trick to fit an existing
 * type: it means the exercise is a pure function of its inputs like every other kernel, so
 * a test can drive it to "all correct", "one wrong" or "half finished" and assert what the
 * student would see, without a browser.
 */

export interface AssignmentItem {
  id: string
  label: Bilingual
  /** Id of the target this item belongs on. */
  target: string
}

export interface AssignmentTarget {
  id: string
  label: Bilingual
  hint?: Bilingual
}

/** Parameter that records where the student has put an item. */
export function placementKey(id: string): string {
  return `place-${id}`
}

/**
 * Declares the hidden parameter for each item.
 *
 * A lesson spreads this into its `params`, so the integrity check sees real declared
 * parameters rather than keys invented at run time.
 */
export function placementParams(items: AssignmentItem[], targetCount: number): ParamSpec[] {
  return items.map((item) => ({
    key: placementKey(item.id),
    label: item.label,
    unit: '',
    min: 0,
    max: targetCount,
    step: 1,
    default: 0,
    // Set by clicking the exercise, not by a slider in the control panel.
    hidden: true,
  }))
}

/** Builds the assignment for the renderer from the definitions and the current answers. */
export function readAssignment(
  items: AssignmentItem[],
  targets: AssignmentTarget[],
  params: Record<string, number>
): SimAssignment {
  return {
    targets: targets.map((t) => ({ id: t.id, label: t.label, ...(t.hint ? { hint: t.hint } : {}) })),
    items: items.map((item) => {
      const raw = Math.round(params[placementKey(item.id)] ?? 0)
      const target = targets[raw - 1]
      return {
        id: item.id,
        label: item.label,
        target: item.target,
        ...(target ? { placed: target.id } : {}),
      }
    }),
  }
}

/** How many items the student has put somewhere. */
export function placedCount(assignment: SimAssignment): number {
  return assignment.items.filter((i) => i.placed !== undefined).length
}

/** How many are on the right target. */
export function correctCount(assignment: SimAssignment): number {
  return assignment.items.filter((i) => i.placed !== undefined && i.placed === i.target).length
}

/** True once every item is placed and every placement is right. */
export function isComplete(assignment: SimAssignment): boolean {
  return correctCount(assignment) === assignment.items.length
}
