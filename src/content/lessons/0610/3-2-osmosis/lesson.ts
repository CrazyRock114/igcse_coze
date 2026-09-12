import type { Lesson } from '@/content/types'
import narration from './narration'

const lesson: Lesson = {
  slug: '3-2-osmosis',
  subject: '0610',
  syllabus: [
    '0610.3.2.1',
    '0610.3.2.2',
    '0610.3.2.3',
    '0610.3.2.4',
    '0610.3.2.5',
    '0610.3.2.6',
    '0610.3.2.7',
    '0610.3.2.8',
    '0610.3.2.9',
  ],
  tier: 'extended',
  estimatedMinutes: 45,

  title: { en: 'Osmosis', zh: '渗透' },
  summary: {
    en: 'Where the line crosses zero is the concentration inside the cell — you measure something you never get access to, by finding the point where nothing happens.',
    zh: '直线穿过零点之处，就是细胞内部的浓度——你通过找到"什么都没发生"的那一点，测出了一个你从未接触到的量。',
  },

  objectives: [
    { en: 'Describe the role of water as a solvent in organisms.', zh: '描述水在生物体内作为溶剂的作用。' },
    {
      en: 'State that water diffuses through partially permeable membranes by osmosis, into and out of cells.',
      zh: '说明水通过半透膜的扩散称为渗透，并以此进出细胞。',
    },
    {
      en: 'Investigate osmosis using dialysis tubing and using plant tissue in different concentrations.',
      zh: '用透析袋以及置于不同浓度溶液中的植物组织探究渗透。',
    },
    {
      en: 'State that turgor pressure against the cell wall supports plants.',
      zh: '说明细胞内压顶住细胞壁为植物提供支撑。',
    },
    {
      en: 'Describe osmosis in terms of water potential across a partially permeable membrane. (Extended)',
      zh: '用水势描述水分子跨半透膜的渗透。（Extended）',
    },
    {
      en: 'Explain the effects on plant cells using the terms turgid, flaccid and plasmolysed. (Extended)',
      zh: '用膨胀、萎蔫与质壁分离解释对植物细胞的影响。（Extended）',
    },
    {
      en: 'Explain the importance of water potential in water uptake and loss. (Extended)',
      zh: '解释水势在水分吸收与散失中的重要性。（Extended）',
    },
  ],

  glossary: [
    {
      en: 'osmosis',
      zh: '渗透',
      definition: {
        en: 'The diffusion of water from a higher water potential to a lower one, through a partially permeable membrane.',
        zh: '水通过半透膜，由水势较高处向水势较低处的扩散。',
      },
      syllabus: ['0610.3.2.2', '0610.3.2.7'],
    },
    {
      en: 'water potential',
      zh: '水势',
      definition: {
        en: 'A measure of how free the water is to move. Pure water has the highest; adding solute lowers it.',
        zh: '衡量水分子移动自由程度的量。纯水的水势最高；加入溶质会使它降低。',
      },
      syllabus: ['0610.3.2.7'],
    },
    {
      en: 'partially permeable',
      zh: '半透（性）',
      definition: {
        en: 'Letting some molecules through but not others — water through, dissolved sucrose not.',
        zh: '只允许某些分子通过而阻止另一些——水可通过，溶解的蔗糖不可。',
      },
      syllabus: ['0610.3.2.2'],
    },
    {
      en: 'turgid',
      zh: '膨胀（的）',
      definition: {
        en: 'Full of water, with the contents pressing hard against the cell wall. That pressure is what holds a non-woody plant up.',
        zh: '充满水分，内容物紧紧顶住细胞壁。这种压力正是支撑非木质植物直立的力量。',
      },
      syllabus: ['0610.3.2.6', '0610.3.2.8'],
    },
    {
      en: 'plasmolysis',
      zh: '质壁分离',
      definition: {
        en: 'When so much water has left a plant cell that the membrane pulls away from the cell wall.',
        zh: '植物细胞失水过多，以致细胞膜从细胞壁上分离开来。',
      },
      syllabus: ['0610.3.2.8'],
    },
    // ---- added 8/6 (G8 11-1 review: "diffusion vs osmosis" recap) ----
    {
      en: 'diffusion',
      zh: '扩散',
      definition: {
        en: 'The net movement of particles from a region of higher concentration to a region of lower concentration, down a concentration gradient. Passive — no energy from the cell is required. The gases O₂ and CO₂ cross the alveolar wall this way.',
        zh: '粒子从浓度较高的区域向浓度较低的区域、顺浓度梯度的净移动。被动过程——细胞不需提供能量。O₂ 与 CO₂ 就是这样穿过肺泡壁的。',
      },
      syllabus: ['0610.3.2.1'],
    },
    {
      en: 'concentration gradient',
      zh: '浓度梯度',
      definition: {
        en: 'A difference in concentration between two adjacent regions. Diffusion goes down the gradient — high to low — until the concentrations equalise and the gradient disappears.',
        zh: '两个相邻区域之间的浓度差。扩散顺梯度进行——从高到低——直到两侧浓度相等、梯度消失。',
      },
      syllabus: ['0610.3.2.1'],
    },
  ],

  equations: [
    {
      latex: '\\%\\ \\text{change} = \\dfrac{m_{\\text{final}} - m_{\\text{initial}}}{m_{\\text{initial}}} \\times 100',
      meaning: {
        en: 'Percentage rather than raw mass, because the cylinders were not all the same size to begin with. Without this the results cannot be compared at all.',
        zh: '用百分比而不是原始质量，因为各个圆柱起初的大小并不相同。不这样做，结果根本无法比较。',
      },
      substitute: (r) =>
        `\\text{change } ${r['change'] ?? 0}\\%\\quad \\text{at equilibrium } ${r['final'] ?? 0}\\%`,
    },
  ],

  sim: {
    primitive: 'plot2d',
    kernel: '3-2-osmosis',
    hint: {
      en: 'Find where the first line crosses zero, then change the cell sap concentration and watch the crossing follow it.',
      zh: '找出第一条线穿过零点的位置，然后改变细胞液浓度，看那个交点如何随之移动。',
    },
    params: [
      {
        key: 'external',
        label: { en: 'Sucrose outside the cylinder', zh: '圆柱外的蔗糖浓度' },
        unit: 'mol/dm³',
        min: 0,
        max: 1,
        step: 0.025,
        default: 0.2,
      },
      {
        key: 'cellSap',
        label: { en: 'Concentration of the cell sap', zh: '细胞液的浓度' },
        unit: 'mol/dm³',
        min: 0.05,
        max: 0.8,
        step: 0.05,
        default: 0.3,
      },
      {
        key: 'minutes',
        label: { en: 'Time in the solution', zh: '在溶液中的时间' },
        unit: 'min',
        min: 0,
        max: 60,
        step: 5,
        default: 60,
      },
    ],
    readouts: [
      {
        key: 'change',
        label: { en: 'Change in mass so far', zh: '目前的质量变化' },
        unit: '%',
        sigFigs: 3,
        exact: true,
      },
      {
        key: 'final',
        label: { en: 'Change once it settles', zh: '最终稳定后的变化' },
        unit: '%',
        sigFigs: 3,
        exact: true,
      },
      {
        key: 'difference',
        label: { en: 'Concentration difference', zh: '浓度差' },
        unit: 'mol/dm³',
        sigFigs: 3,
        exact: true,
      },
      {
        key: 'intercept',
        label: { en: 'Where the line crosses zero', zh: '直线穿过零点之处' },
        unit: 'mol/dm³',
        sigFigs: 3,
        exact: true,
      },
    ],
    presets: [
      {
        label: { en: 'Distilled water: gains mass', zh: '蒸馏水：质量增加' },
        params: { external: 0, cellSap: 0.3, minutes: 60 },
      },
      {
        label: { en: 'Concentrated: loses mass', zh: '浓溶液：质量减少' },
        params: { external: 0.8, cellSap: 0.3, minutes: 60 },
      },
      {
        label: { en: 'No change: the answer', zh: '无变化：即答案' },
        params: { external: 0.3, cellSap: 0.3, minutes: 60 },
      },
      {
        label: { en: 'A more concentrated cell sap', zh: '细胞液浓度更高时' },
        params: { external: 0.3, cellSap: 0.55, minutes: 60 },
      },
      {
        label: { en: 'Only ten minutes in', zh: '仅浸泡十分钟' },
        params: { external: 0, cellSap: 0.3, minutes: 10 },
      },
    ],
  },

  narration,

  checkpoints: [
    {
      id: '0610-3-2-cp1',
      syllabus: ['0610.3.2.7'],
      tier: 'extended',
      commandWord: 'Define',
      marks: 2,
      stem: 'Define osmosis.',
      markScheme: [
        {
          text: 'The net movement of water molecules from a region of higher water potential to a region of lower water potential',
          marks: 1,
        },
        { text: 'through a partially permeable membrane', marks: 1 },
        ],
      examinerNote: {
        en: 'Both halves are needed. "Water moving from high to low concentration" loses the mark, because it is the *water* potential that matters and the membrane must be named.',
        zh: '两半都要写。写"水从高浓度移向低浓度"会失分，因为关键是"水势"，而且必须点出半透膜。',
      },
    },
    {
      id: '0610-3-2-cp2',
      syllabus: ['0610.3.2.5'],
      tier: 'core',
      commandWord: 'Explain',
      marks: 3,
      stem: 'In an experiment, potato cylinders are placed in a range of sucrose concentrations and the percentage change in mass is plotted against concentration. Explain why the line crosses the zero line at one particular concentration, and state what that concentration tells you.',
      markScheme: [
        {
          text: 'At that concentration the solution and the cell sap have the same water potential',
          marks: 1,
        },
        {
          text: 'so there is no net movement of water into or out of the cells, and the mass does not change',
          marks: 1,
        },
        {
          text: 'That concentration is therefore equal to the concentration of the cell sap inside the potato cells',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'The third mark is the point of the whole experiment. Explaining why the mass does not change without saying what it lets you measure answers only two thirds of the question.',
        zh: '第三个得分点是整个实验的意义所在。只解释质量为何不变，而不说明它让你测出了什么，只答了三分之二。',
      },
    },
    {
      id: '0610-3-2-cp3',
      syllabus: ['0610.3.2.5'],
      tier: 'core',
      commandWord: 'Suggest',
      marks: 2,
      stem: 'The results are plotted as percentage change in mass rather than as change in mass in grams. Suggest why.',
      markScheme: [
        { text: 'The cylinders were not all exactly the same mass at the start', marks: 1 },
        {
          text: 'so a percentage change allows a fair comparison between them',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'This is an experimental-design mark, and it turns up in Paper 6 constantly. Any measurement compared between samples of different starting size has to be normalised.',
        zh: '这是实验设计的得分点，在 Paper 6 中反复出现。凡是要在起始大小不同的样品之间比较的测量，都必须做归一化处理。',
      },
    },
    {
      id: '0610-3-2-cp4',
      syllabus: ['0610.3.2.6', '0610.3.2.8'],
      tier: 'extended',
      commandWord: 'Explain',
      marks: 4,
      stem: 'A plant that has not been watered for several days wilts. Explain, in terms of osmosis and the cells, why this happens.',
      markScheme: [
        {
          text: 'Water is lost from the cells by osmosis, because the soil solution has a lower water potential than the cell sap',
          marks: 1,
        },
        { text: 'The vacuole shrinks and the cells become flaccid', marks: 1 },
        {
          text: 'so the contents no longer press against the cell wall and the turgor pressure is lost',
          marks: 1,
        },
        {
          text: 'It is that pressure that supports a non-woody stem, so without it the plant droops',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Finish on the support. "The cells lose water" describes it; the marks are for the chain from water loss to loss of pressure to loss of support.',
        zh: '要落在"支撑"上收尾。写"细胞失水"只是描述；得分点在于从失水到压力丧失、再到支撑丧失的这条链。',
      },
    },
    {
      id: '0610-3-2-cp5',
      syllabus: ['0610.3.2.3', '0610.3.2.9'],
      tier: 'extended',
      commandWord: 'Predict',
      marks: 3,
      stem: 'A red blood cell and a plant cell are both placed in distilled water. Predict what happens to each, and explain the difference.',
      markScheme: [
        {
          text: 'Water enters both cells by osmosis, because distilled water has a higher water potential than the cell contents',
          marks: 1,
        },
        {
          text: 'The plant cell becomes turgid: the cell wall resists the pressure and stops further water entering',
          marks: 1,
        },
        {
          text: 'The red blood cell has no cell wall, so it swells and bursts',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'The cell wall is the whole difference. Both cells do the same thing osmotically; only one of them survives it.',
        zh: '细胞壁就是全部差别所在。从渗透的角度看两种细胞的行为相同；只不过其中一种能挺过来。',
      },
    },
  ],

  // The 8/6 G8 11-1 review opened with a long aside on "diffusion vs
  // osmosis". The chapter's glossary already covers both, but the
  // mechanism that ties them together — particles moving down a
  // gradient, with the membrane deciding which particles may cross —
  // is the part students forget. This explainer states it once, with
  // the everyday example (soaking in the bath) used in class.
  extras: [
    {
    type: 'concept-explainer',
    id: 'diffusion-vs-osmosis',
    title: { en: 'Diffusion and osmosis: same logic, different particles', zh: '扩散与渗透：同一逻辑，不同的粒子' },
    hint: {
      en: 'Both processes are particles moving down a concentration gradient, with no energy spent. The only difference is which particles can cross the membrane: in diffusion, the solute moves; in osmosis, only the water does.',
        zh: '两个过程都是粒子顺浓度梯度运动、不消耗能量。区别只在于膜允许哪种粒子通过：扩散是溶质在过膜；渗透是只有水在过膜。',
    },
    blocks: [
      {
        id: 'same-logic',
        title: { en: 'Same logic, different particles', zh: '同一逻辑，不同的粒子' },
        hook: {
          en: 'Soak in a bath for half an hour. Your fingertips wrinkle — not because they lose skin, but because the outer skin layer is a partial barrier. Water inside the bath (low in salts) is more dilute than the water inside you (rich in salts and proteins). The membrane cannot pass the salts out, so water moves IN. The fingertips swell, the skin has nowhere to go, and the result is the prune.',
          zh: '在浴缸里泡半小时，你的手指尖会起皱——不是因为丢了皮肤，而是因为最外层皮肤是一道半透膜。浴缸里的水（盐分少）比你身体内部的水（盐分、蛋白质都多）"稀"。膜过不去盐，所以水反而往里走。指尖胀大，皮肤没地方去，结果就是起皱。',
        },
        mechanism: {
          en: 'Both diffusion and osmosis are passive: no ATP, no active transport, particles move down their own concentration gradient. Diffusion = the solute particles themselves (oxygen, carbon dioxide, glucose) move from where they are more concentrated to where they are less. Osmosis = the SOLVENT (water) moves, because the solute cannot. The membrane is the line. If the solute can pass, you get diffusion; if it cannot, the water moves instead, and the result is called osmosis. Either way, the system ends up closer to equilibrium — that is the whole point.',
          zh: '扩散和渗透都是被动的：不耗 ATP、不靠主动运输、粒子顺自身的浓度梯度走。扩散 = 溶质粒子（氧、二氧化碳、葡萄糖）从浓度高的地方向浓度低的地方移动。渗透 = 溶剂（水）在移动，因为溶质过不去膜。膜就是分界线。溶质过得去，是扩散；溶质过不去，水就去代替它移动，结果叫渗透。无论哪种，系统都会更接近平衡——这就是全部逻辑。',
        },
        whyItMatters: {
          en: 'In the lung, both processes run at the same time and at the same wall. O₂ and CO₂ cross by diffusion (their molecules are small enough). Water moves by osmosis. The body needs both. In the kidney, the same membrane that lets glucose through by diffusion later stops it, and water alone crosses by osmosis — that is how the kidney concentrates urine. The same two ideas, used in different proportions, do most of the work of keeping a body alive.',
          zh: '在肺里，两个过程同时、同一面壁地发生。O₂ 和 CO₂ 通过扩散穿过（分子小到过得去）。水通过渗透穿过。身体两个都需要。在肾脏里，先用扩散把葡萄糖放过去，再把葡萄糖挡在膜外，让水单独通过渗透——这就是肾脏浓缩尿液的机制。同样的两个想法，按不同比例使用，承担了让人活着的绝大部分工作。',
        },
        teacherStory: {
          en: 'A common wrong answer: "osmosis is when water moves toward a higher concentration of water." It sounds intuitive but it is the opposite of what happens. Water moves TOWARD the side that has more SOLUTE in it — because the side with more solute has less free water. Saying it that way keeps the gradient the right way round and stops the intuition from flipping.',
          zh: '一个常见错答："渗透是水向水浓度更高的一侧移动。"听起来很直觉，但恰恰相反。水是向溶质更多的一侧移动——因为溶质多的那一侧"自由水"少。这样说，梯度的方向就对了，直觉就不会翻车。',
        },
      },
    ],
  },
  ],
}

export default lesson
