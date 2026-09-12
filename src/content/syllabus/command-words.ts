/**
 * The 15 command words used in Cambridge IGCSE Physics 0625 assessment.
 *
 * These matter more than students expect: the command word tells you how much to write
 * and what kind of answer earns marks. "State" and "Explain" on the same physics get
 * very different mark schemes. Definitions are paraphrased for this course.
 */

import type { Bilingual, CommandWord } from '../types'

export interface CommandWordEntry {
  word: CommandWord
  /** What the examiner is asking for */
  meaning: Bilingual
  /** Practical guidance we add — not from the syllabus */
  advice: Bilingual
  /** Rough marks these questions usually carry */
  typicalMarks: string
}

export const commandWords: CommandWordEntry[] = [
  {
    word: 'Calculate',
    meaning: {
      en: 'Work out a numerical answer from given facts, figures or information.',
      zh: '根据给出的事实、数据或信息算出数值答案。',
    },
    advice: {
      en: 'Show the equation, then the substitution, then the answer with a unit. You can earn method marks even if the arithmetic slips.',
      zh: '先写公式，再代入数值，最后写带单位的答案。即使算错，过程也能拿分。',
    },
    typicalMarks: '2–4',
  },
  {
    word: 'Comment',
    meaning: { en: 'Give an informed opinion.', zh: '给出有依据的看法。' },
    advice: {
      en: 'Say what the data shows and why it matters — do not just restate the numbers.',
      zh: '说明数据表明了什么以及为何重要，不要只复述数字。',
    },
    typicalMarks: '1–3',
  },
  {
    word: 'Compare',
    meaning: {
      en: 'Identify or comment on similarities and/or differences.',
      zh: '指出或评论相同点和/或不同点。',
    },
    advice: {
      en: 'Write linked statements: "A is …, whereas B is …". A list of facts about A followed by a list about B usually loses marks.',
      zh: '写成对照句："A 是……，而 B 是……"。先罗列 A 再罗列 B 往往拿不到分。',
    },
    typicalMarks: '2–4',
  },
  {
    word: 'Deduce',
    meaning: { en: 'Draw a conclusion from the information available.', zh: '由已有信息推出结论。' },
    advice: {
      en: 'State the conclusion and the reasoning that led to it. The reasoning is usually where the marks are.',
      zh: '写出结论和推理过程。分数通常在推理上。',
    },
    typicalMarks: '2–3',
  },
  {
    word: 'Define',
    meaning: { en: 'Give the precise meaning.', zh: '给出准确定义。' },
    advice: {
      en: 'Use the standard wording. "Speed is distance per unit time" earns the mark; "speed is how fast something goes" does not.',
      zh: '使用标准表述。"速度是单位时间内通过的距离"得分；"速度是物体多快"不得分。',
    },
    typicalMarks: '1–2',
  },
  {
    word: 'Describe',
    meaning: {
      en: 'State the main points or characteristics of something.',
      zh: '说出主要内容或特征。',
    },
    advice: {
      en: 'Say what happens, not why. Saying why is Explain — it wastes time here and earns nothing extra.',
      zh: '只说"发生了什么"，不说"为什么"。说原因是 Explain 的任务，在这里既费时又不加分。',
    },
    typicalMarks: '2–4',
  },
  {
    word: 'Determine',
    meaning: {
      en: 'Establish an answer using the information available.',
      zh: '利用已有信息确定答案。',
    },
    advice: {
      en: 'Usually means read values off a graph or table first, then calculate. Show both stages.',
      zh: '通常先从图表读数，再计算。两步都要写出来。',
    },
    typicalMarks: '2–4',
  },
  {
    word: 'Explain',
    meaning: {
      en: 'Give reasons or make relationships clear, supported by relevant evidence.',
      zh: '给出原因或说清关系，并有相关依据支持。',
    },
    advice: {
      en: 'Every statement needs a "because". Use connectives: so, therefore, which means that.',
      zh: '每句话都要有"因为"。多用连接词：所以、因此、这意味着。',
    },
    typicalMarks: '2–5',
  },
  {
    word: 'Give',
    meaning: { en: 'Produce an answer from a source or from recall.', zh: '从给定材料或记忆中给出答案。' },
    advice: {
      en: 'Short answer, no working needed. Do not over-write.',
      zh: '简短作答，无需过程。不要写多。',
    },
    typicalMarks: '1',
  },
  {
    word: 'Identify',
    meaning: { en: 'Name, select or recognise.', zh: '命名、选出或辨认。' },
    advice: { en: 'One word or phrase is enough.', zh: '一个词或短语即可。' },
    typicalMarks: '1',
  },
  {
    word: 'Justify',
    meaning: { en: 'Support a case with evidence or argument.', zh: '用证据或论证支持某一说法。' },
    advice: {
      en: 'State your position, then give the evidence. A position without evidence scores zero.',
      zh: '先表明立场，再给证据。只有立场没有证据得零分。',
    },
    typicalMarks: '2–3',
  },
  {
    word: 'Predict',
    meaning: {
      en: 'Suggest what may happen, based on the available information.',
      zh: '根据已有信息推测可能发生什么。',
    },
    advice: {
      en: 'Say what will happen and, if asked, the pattern or relationship you based it on.',
      zh: '说出将会发生什么；若有要求，说明你所依据的规律或关系。',
    },
    typicalMarks: '1–2',
  },
  {
    word: 'Sketch',
    meaning: {
      en: 'Make a simple freehand drawing showing key features, with care over proportions.',
      zh: '徒手画出关键特征，注意比例。',
    },
    advice: {
      en: 'Label the axes, get the shape right and mark any intercepts or asymptotes. Neatness is not marked; correctness is.',
      zh: '标注坐标轴，画对形状，标出截距或渐近线。评分看正确性，不看美观。',
    },
    typicalMarks: '1–3',
  },
  {
    word: 'State',
    meaning: { en: 'Express in clear terms.', zh: '用清楚的语言表述。' },
    advice: {
      en: 'One sentence, no justification. Do not explain unless asked.',
      zh: '一句话，不需要理由。未要求就不要解释。',
    },
    typicalMarks: '1–2',
  },
  {
    word: 'Suggest',
    meaning: {
      en: 'Apply knowledge to a situation where several answers are valid.',
      zh: '把知识应用到有多个合理答案的情境中。',
    },
    advice: {
      en: 'Signals an unfamiliar context. You are not expected to recall the answer — apply a principle you know.',
      zh: '这标志着陌生情境。不要求你背出答案，而要用已知原理去分析。',
    },
    typicalMarks: '1–3',
  },
]

export const commandWordByName: ReadonlyMap<CommandWord, CommandWordEntry> = new Map(
  commandWords.map((c) => [c.word, c])
)

/**
 * Assessment objective weightings for the qualification as a whole.
 * AO3 is examined entirely in Papers 5 and 6 — which is why the practical module
 * is a first-class part of this course rather than an afterthought.
 */
export const assessmentObjectives = [
  { code: 'AO1', title: { en: 'Knowledge with understanding', zh: '知识与理解' }, weight: 50 },
  {
    code: 'AO2',
    title: { en: 'Handling information and problem-solving', zh: '信息处理与问题解决' },
    weight: 30,
  },
  {
    code: 'AO3',
    title: { en: 'Experimental skills and investigations', zh: '实验技能与探究' },
    weight: 20,
  },
] as const
