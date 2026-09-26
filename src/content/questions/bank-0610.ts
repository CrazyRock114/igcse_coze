/**
 * Standalone question bank for Biology 0610 — Paper 1/2 style items that are
 * not tied to a single lesson checkpoint. Referenced by MistakeList review
 * sessions and the AI tutor. Syllabus ids must exist in igcse-biology-0610.ts.
 */
import type { Question } from '@/content/types'

const bank: Question[] = [
  {
    id: 'b0610-001',
    syllabus: ['0610.1.2.2'],
    tier: 'core',
    commandWord: 'Identify',
    marks: 1,
    stem: 'Which characteristic of living organisms is shown by a plant shoot growing towards light?',
    options: ['excretion', 'growth', 'nutrition', 'sensitivity'],
    answerIndex: 3,
    markScheme: [{ text: 'sensitivity (response to a stimulus)', marks: 1 }],
    examinerNote: {
      en: 'Candidates often confuse growth with sensitivity here; the key word is "towards light" — a directional response.',
      zh: '考生常把生长和感光性混淆；关键词是"朝向光"——方向性反应。',
    },
  },
  {
    id: 'b0610-002',
    syllabus: ['0610.1.2.3'],
    tier: 'core',
    commandWord: 'State',
    marks: 1,
    stem: 'Which process excretes carbon dioxide from a mammal?',
    options: ['breathing', 'egestion', 'sweating', 'urination'],
    answerIndex: 0,
    markScheme: [{ text: 'breathing (gas exchange removes CO2)', marks: 1 }],
    examinerNote: {
      en: 'Excretion is removal of metabolic waste; egestion (faeces) is not excretion.',
      zh: '排泄指排出代谢废物；排遗（粪便）不算排泄。',
    },
  },
  {
    id: 'b0610-003',
    syllabus: ['0610.2.1.1'],
    tier: 'core',
    commandWord: 'Identify',
    marks: 1,
    stem: 'Which organelle releases energy from glucose during respiration?',
    options: ['nucleus', 'mitochondrion', 'chloroplast', 'ribosome'],
    answerIndex: 1,
    markScheme: [{ text: 'mitochondrion', marks: 1 }],
  },
  {
    id: 'b0610-004',
    syllabus: ['0610.3.2.1'],
    tier: 'extended',
    commandWord: 'Predict',
    marks: 1,
    stem: 'A plant cell is placed in a concentrated sugar solution. What happens to the cell?',
    options: [
      'it gains water and bursts',
      'it loses water and becomes flaccid',
      'it loses water and the membrane pulls away from the wall',
      'nothing changes',
    ],
    answerIndex: 2,
    markScheme: [{ text: 'water leaves by osmosis; plasmolysis — membrane pulls away from the wall', marks: 1 }],
    examinerNote: {
      en: 'Option B is tempting but "flaccid" alone does not describe the visible plasmolysis the question asks to predict.',
      zh: '选项 B 有迷惑性，但"变软"没有答出题目要求的质壁分离现象。',
    },
  },
  {
    id: 'b0610-005',
    syllabus: ['0610.5.1.1'],
    tier: 'extended',
    commandWord: 'Explain',
    marks: 2,
    stem: 'Explain why an enzyme stops working above its optimum temperature.',
    markScheme: [
      { text: 'the active site changes shape / denatures', marks: 1 },
      { text: 'substrate no longer fits', marks: 1, alternatives: ['enzyme-substrate complexes cannot form'] },
    ],
  },
  {
    id: 'b0610-006',
    syllabus: ['0610.6.1.1'],
    tier: 'core',
    commandWord: 'State',
    marks: 1,
    stem: 'Which gas is used as the carbon source for photosynthesis?',
    options: ['oxygen', 'carbon dioxide', 'nitrogen', 'hydrogen'],
    answerIndex: 1,
    markScheme: [{ text: 'carbon dioxide', marks: 1 }],
  },
  {
    id: 'b0610-007',
    syllabus: ['0610.11.1.2'],
    tier: 'core',
    commandWord: 'Identify',
    marks: 1,
    stem: 'In the gas exchange system, where does most gaseous exchange take place?',
    options: ['trachea', 'bronchi', 'alveoli', 'diaphragm'],
    answerIndex: 2,
    markScheme: [{ text: 'alveoli', marks: 1 }],
  },
  {
    id: 'b0610-008',
    syllabus: ['0610.14.3.2'],
    tier: 'extended',
    commandWord: 'Explain',
    marks: 3,
    stem: 'Explain how insulin restores blood glucose concentration after a meal rich in carbohydrate.',
    markScheme: [
      { text: 'insulin is secreted by the pancreas', marks: 1 },
      { text: 'liver / muscle cells take up glucose', marks: 1 },
      { text: 'glucose converted to glycogen for storage', marks: 1 },
    ],
  },
  {
    id: 'b0610-009',
    syllabus: ['0610.17.1.2'],
    tier: 'extended',
    commandWord: 'Deduce',
    marks: 1,
    stem: 'A heterozygous tall pea plant (Tt) is crossed with a homozygous short plant (tt). What is the expected ratio of tall to short offspring?',
    options: ['1:0', '3:1', '1:1', '9:7'],
    answerIndex: 2,
    markScheme: [{ text: '1:1 (Tt, Tt, tt, tt)', marks: 1 }],
    examinerNote: {
      en: '3:1 is the classic trap — that ratio only comes from two heterozygous parents.',
      zh: '3:1 是经典陷阱——该比例只在两个杂合亲本杂交时出现。',
    },
  },
  {
    id: 'b0610-010',
    syllabus: ['0610.19.1.2'],
    tier: 'core',
    commandWord: 'Describe',
    marks: 2,
    stem: 'Describe how energy from the Sun reaches a top carnivore in a food web.',
    markScheme: [
      { text: 'light energy absorbed by producers during photosynthesis', marks: 1 },
      { text: 'passed along food chains through feeding', marks: 1, alternatives: ['producer -> primary consumer -> ...'] },
    ],
  },
]

export default bank
