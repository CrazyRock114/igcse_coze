import type { Lesson } from '@/content/types'
import narration from './narration'

const lesson: Lesson = {
  slug: '4-5-motor',
  subject: '0625',
  syllabus: [
    '0625.4.5.3.2',
    '0625.4.5.3.3',
    '0625.4.5.3.4',
    '0625.4.5.3.5',
    '0625.4.5.4.1',
    '0625.4.5.4.2',
    '0625.4.5.4.3',
    '0625.4.5.5.1',
    '0625.4.5.5.2',
  ],
  tier: 'extended',
  estimatedMinutes: 55,

  title: { en: 'The magnetic effect of a current and the d.c. motor', zh: '电流的磁效应与直流电动机' },
  summary: {
    en: 'Without a commutator a motor coil is pushed forwards for half a turn and backwards for the next. Two curves side by side show what the split ring is actually for.',
    zh: '没有换向器，电动机线圈前半圈被向前推，后半圈就被往回推。并排的两条曲线让换向器的真正作用一目了然。',
  },

  objectives: [
    {
      en: 'Describe experiments that identify the field patterns around a straight wire and a solenoid.',
      zh: '描述确定直导线与螺线管周围磁场分布的实验。',
    },
    {
      en: 'Describe how the magnetic effect of a current is used in a relay and in a loudspeaker.',
      zh: '说明电流的磁效应在继电器与扬声器中的应用。',
    },
    {
      en: 'State how the field strength varies around a straight wire and a solenoid, and what changing the current does to it. (Extended)',
      zh: '说明直导线与螺线管周围磁场强弱的变化，以及改变电流对磁场的影响。（Extended）',
    },
    {
      en: 'Describe an experiment showing the force on a current-carrying conductor, including the effect of reversing the current and the field.',
      zh: '描述显示通电导体受力的实验，包括反转电流与磁场的效果。',
    },
    {
      en: 'Use the relative directions of force, magnetic field and current, and apply them to beams of charged particles. (Extended)',
      zh: '使用力、磁场与电流的相对方向，并将其应用于带电粒子束。（Extended）',
    },
    {
      en: 'Know that a current-carrying coil in a field turns, and what increases the turning effect.',
      zh: '知道磁场中通电线圈会转动，以及哪些因素能增强转动效果。',
    },
    {
      en: 'Describe how a d.c. motor works, including the split-ring commutator and brushes. (Extended)',
      zh: '描述直流电动机的工作原理，包括换向器与电刷。（Extended）',
    },
  ],

  glossary: [
    {
      en: 'solenoid',
      zh: '螺线管',
      definition: {
        en: 'A long coil of wire. The field inside is strong and nearly uniform along the axis; outside it looks like the field of a bar magnet.',
        zh: '绕成长筒的线圈。内部沿轴向的磁场很强且几乎均匀；外部磁场则与条形磁铁的相似。',
      },
      syllabus: ['0625.4.5.3.4'],
    },
    {
      en: 'relay',
      zh: '继电器',
      definition: {
        en: 'A switch worked by an electromagnet, so that a small safe current can switch on a much larger one.',
        zh: '由电磁铁带动的开关，使很小的安全电流能够接通大得多的电流。',
      },
      syllabus: ['0625.4.5.3.3'],
    },
    {
      en: "Fleming's left-hand rule",
      zh: '左手定则',
      definition: {
        en: 'First finger field (N to S), second finger conventional current, thumb force. The three are mutually at right angles.',
        zh: '食指指磁场（由 N 到 S），中指指常规电流，拇指指力。三者互相垂直。',
      },
      syllabus: ['0625.4.5.4.2'],
    },
    {
      en: 'split-ring commutator',
      zh: '换向器',
      definition: {
        en: 'A ring cut into two halves, one on each end of the motor coil. It reverses the current through the coil every half turn, so the turning effect never reverses.',
        zh: '切成两个半环的环，分别接电动机线圈的两端。它每半圈使线圈中的电流反向一次，从而使转动效果不会反向。',
      },
      syllabus: ['0625.4.5.5.2'],
    },
  ],

  equations: [
    {
      latex: '\\text{turning effect} \\propto N B I',
      meaning: {
        en: 'Not a formula to substitute into at IGCSE, but the three things a question will ask you to change. More turns, a stronger field or a bigger current all make the coil turn harder.',
        zh: 'IGCSE 阶段不需要代入计算，但题目要你改变的正是这三样。更多匝数、更强磁场或更大电流，都会让线圈转得更有力。',
      },
      substitute: (r) =>
        `\\text{peak } ${r['peakTurning'] ?? 0} \\quad \\text{now } ${r['turningNow'] ?? 0}`,
    },
  ],

  sim: {
    primitive: 'plot2d',
    kernel: '4-5-motor',
    hint: {
      en: 'Compare the two curves over a full turn. The lower one goes negative — that is a motor with no commutator, being pushed back the way it came.',
      zh: '在整整一圈上比较两条曲线。下面那条会变成负值——那是没有换向器的电动机，正被推回原路。',
    },
    params: [
      {
        key: 'current',
        label: { en: 'Current in the coil', zh: '线圈中的电流' },
        unit: 'A',
        min: 0,
        max: 10,
        step: 0.5,
        default: 2,
      },
      {
        key: 'fieldStrength',
        label: { en: 'Strength of the field', zh: '磁场强度' },
        unit: '',
        min: 0,
        max: 3,
        step: 0.1,
        default: 1,
      },
      {
        key: 'turns',
        label: { en: 'Turns on the coil', zh: '线圈匝数' },
        unit: '',
        min: 1,
        max: 100,
        step: 1,
        default: 20,
      },
      {
        key: 'angle',
        label: { en: 'Angle turned', zh: '已转过的角度' },
        unit: '°',
        min: 0,
        max: 360,
        step: 5,
        default: 90,
      },
    ],
    readouts: [
      {
        key: 'forceOnSide',
        label: { en: 'Force on each side', zh: '每条边所受的力' },
        unit: 'N',
        sigFigs: 3,
        exact: true,
      },
      {
        key: 'turningNow',
        label: { en: 'Turning effect now', zh: '当前的转动效果' },
        unit: 'N cm',
        sigFigs: 3,
        exact: true,
      },
      {
        key: 'turningNoCommutator',
        label: { en: 'Turning effect with no commutator', zh: '无换向器时的转动效果' },
        unit: 'N cm',
        sigFigs: 3,
        exact: true,
      },
      {
        key: 'peakTurning',
        label: { en: 'Greatest turning effect', zh: '最大转动效果' },
        unit: 'N cm',
        sigFigs: 3,
        exact: true,
      },
    ],
    presets: [
      {
        label: { en: 'Coil edge-on — greatest turning effect', zh: '线圈侧对磁场——转动效果最大' },
        params: { current: 2, fieldStrength: 1, turns: 20, angle: 90 },
      },
      {
        label: { en: 'The dead point, where the ring changes over', zh: '死点，换向器在此换接' },
        params: { current: 2, fieldStrength: 1, turns: 20, angle: 0 },
      },
      {
        label: { en: 'Second half turn — pushed backwards without a ring', zh: '后半圈——无换向器时被往回推' },
        params: { current: 2, fieldStrength: 1, turns: 20, angle: 225 },
      },
      {
        label: { en: 'A more powerful motor', zh: '更有力的电动机' },
        params: { current: 6, fieldStrength: 2, turns: 60, angle: 90 },
      },
      {
        label: { en: 'No current at all', zh: '完全没有电流' },
        params: { current: 0, fieldStrength: 3, turns: 100, angle: 90 },
      },
      {
        label: { en: 'No field at all', zh: '完全没有磁场' },
        params: { current: 10, fieldStrength: 0, turns: 100, angle: 90 },
      },
    ],
  },

  narration,

  checkpoints: [
    {
      id: '0625-4-5-5-cp1',
      syllabus: ['0625.4.5.3.2'],
      tier: 'core',
      commandWord: 'Describe',
      marks: 4,
      stem: 'A vertical wire passes through a horizontal sheet of card. Describe how a student could use this apparatus to find both the shape and the direction of the magnetic field around the wire.',
      markScheme: [
        { text: 'Pass a large current through the wire', marks: 1 },
        {
          text: 'Sprinkle iron filings on the card and tap it gently; the filings settle into concentric circles centred on the wire, showing the shape of the field',
          marks: 1,
        },
        {
          text: 'Place a plotting compass on the card at several points around the wire',
          marks: 1,
        },
        {
          text: 'Record the direction the needle points at each position; this gives the direction of the field, which reverses if the current is reversed',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Iron filings give the shape but never the direction — they have no north end. If the question asks for direction as well, a compass has to appear somewhere in the answer.',
        zh: '铁屑只能显示形状，不能显示方向——它们没有 N 极。若题目还问方向，答案中就必须出现小磁针。',
      },
    },
    {
      id: '0625-4-5-5-cp2',
      syllabus: ['0625.4.5.3.3'],
      tier: 'core',
      commandWord: 'Explain',
      marks: 3,
      stem: 'The starter motor of a car draws a current of about 200 A. It is switched on by a relay rather than directly by the ignition switch. Explain how the relay works and why one is used.',
      markScheme: [
        {
          text: 'A small current through the relay coil magnetises a soft iron core, which attracts an iron armature',
          marks: 1,
        },
        {
          text: 'The armature closes a second pair of contacts, completing the high-current circuit to the starter motor',
          marks: 1,
        },
        {
          text: 'This means only a small, safe current has to pass through the ignition switch and the wiring in the cabin; a 200 A current there would need very thick cable and would be dangerous',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Two circuits are involved and the answer has to keep them apart: a small one that does the controlling, and a large one that does the work.',
        zh: '这里涉及两个电路，答案必须把它们区分开：一个是起控制作用的小电流回路，一个是真正做功的大电流回路。',
      },
    },
    {
      id: '0625-4-5-5-cp3',
      syllabus: ['0625.4.5.3.4', '0625.4.5.3.5'],
      tier: 'extended',
      commandWord: 'State',
      marks: 3,
      stem: 'State how the strength of the magnetic field around a long straight current-carrying wire varies with distance from the wire, and state the effect on the field pattern of (i) doubling the current and (ii) reversing the current.',
      markScheme: [
        { text: 'The field is strongest close to the wire and becomes weaker with distance from it', marks: 1 },
        { text: 'Doubling the current makes the field stronger everywhere / doubles the field strength at any point', marks: 1 },
        {
          text: 'Reversing the current leaves the shape of the pattern unchanged but reverses the direction of the field everywhere',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Reversing the current does not change the shape of the pattern. The circles stay circles; only the arrows on them turn round.',
        zh: '电流反向不会改变图样的形状。同心圆还是同心圆，只是上面的箭头掉转方向。',
      },
    },
    {
      id: '0625-4-5-5-cp4',
      syllabus: ['0625.4.5.4.1'],
      tier: 'core',
      commandWord: 'Describe',
      marks: 3,
      stem: 'Describe an experiment that shows there is a force on a current-carrying conductor in a magnetic field, and describe what is observed when the current is reversed and when the magnetic field is reversed.',
      markScheme: [
        {
          text: 'Rest a stiff wire loosely across two horizontal rails between the poles of a magnet, connected to a power supply, so that the wire is free to move',
          marks: 1,
        },
        {
          text: 'When the current is switched on, the wire moves sideways, at right angles to both the current and the field',
          marks: 1,
        },
        {
          text: 'Reversing the current reverses the direction of the movement, and reversing the field also reverses it; reversing both together gives the original direction again',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'The wire must be free to move, and the last mark needs both reversals. Reversing both at once returns the motion to its original direction, which is worth stating.',
        zh: '导线必须能自由移动，最后一分需要写出两种反向情况。两者同时反向会使运动方向回到最初，值得写上。',
      },
    },
    {
      id: '0625-4-5-5-cp5',
      syllabus: ['0625.4.5.4.3'],
      tier: 'extended',
      commandWord: 'Determine',
      marks: 3,
      stem: 'A narrow beam of electrons travels horizontally from left to right across a page. A magnetic field is directed into the page. Determine the direction in which the beam is deflected, and explain how you obtained your answer.',
      markScheme: [
        {
          text: 'The electrons are negative, so the conventional current is from right to left — opposite to the direction the beam is travelling',
          marks: 1,
        },
        {
          text: "Applying Fleming's left-hand rule with the first finger into the page and the second finger pointing from right to left",
          marks: 1,
        },
        { text: 'gives a force, and therefore a deflection, downwards', marks: 1 },
      ],
      examinerNote: {
        en: 'The whole question turns on the sign. Point your second finger along the beam instead of against it and every subsequent step is right while the answer is upside down.',
        zh: '整道题的关键在于符号。若把中指顺着束流方向而不是逆着它，后面每一步都对，答案却正好颠倒。',
      },
    },
    {
      id: '0625-4-5-5-cp6',
      syllabus: ['0625.4.5.5.1', '0625.4.5.5.2'],
      tier: 'extended',
      commandWord: 'Explain',
      marks: 4,
      stem: 'A simple d.c. motor consists of a coil in a magnetic field connected to a supply through a split-ring commutator and two brushes. Explain why the coil turns, and explain why it would fail to rotate continuously if the split ring were replaced by two slip rings.',
      markScheme: [
        {
          text: 'The current runs in opposite directions along the two sides of the coil, so the forces on them are in opposite directions — one up, one down',
          marks: 1,
        },
        {
          text: 'These two opposite forces on either side of the axis produce a turning effect, so the coil rotates',
          marks: 1,
        },
        {
          text: 'After half a turn the two sides have swapped over, so with slip rings the forces would now turn the coil the opposite way and it would rock back and forth instead of rotating',
          marks: 1,
        },
        {
          text: 'The split ring reverses the current through the coil every half turn, at the moment when the plane of the coil is at right angles to the field and the turning effect is momentarily zero, so the turning effect is always in the same sense',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'It is not enough to say the commutator "reverses the current". The mark is for saying what would go wrong without it: the sides swap over, so the current has to swap over too.',
        zh: '只写换向器"使电流反向"是不够的。得分点在于说明没有它会出什么问题：两条边互换了位置，所以电流也必须跟着换。',
      },
    },
    {
      id: '0625-4-5-5-cp7',
      syllabus: ['0625.4.5.4.2'],
      tier: 'extended',
      commandWord: 'State',
      marks: 2,
      stem: 'A horizontal wire carries a conventional current towards the north. It lies in a magnetic field directed vertically downwards. State the direction of the force on the wire and state the rule you used.',
      markScheme: [
        { text: 'The force is horizontal and directed towards the west', marks: 1 },
        {
          text: "Fleming's left-hand rule: first finger along the field (downwards), second finger along the conventional current (north), thumb gives the force",
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Left hand for the motor effect, right hand for induction. Using the wrong hand gives an answer that is exactly reversed and looks perfectly reasoned.',
        zh: '电动机效应用左手，电磁感应用右手。用错手会得到完全相反的答案，而推理过程看上去毫无破绽。',
      },
    },
  ],
}

export default lesson
