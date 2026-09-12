import type { Lesson } from '@/content/types'
import narration from './narration'

const lesson: Lesson = {
  slug: '14-1-nervous-system',
  subject: '0610',
  syllabus: [
    '0610.14.1.1',
    '0610.14.1.2',
    '0610.14.1.3',
    '0610.14.1.4',
    '0610.14.1.5',
    '0610.14.1.6',
    '0610.14.1.7',
    '0610.14.1.8',
    '0610.14.1.9',
    '0610.14.1.10',
    '0610.14.2.1',
    '0610.14.2.2',
    '0610.14.2.3',
    '0610.14.2.4',
    '0610.14.2.5',
    '0610.14.2.6',
    '0610.14.2.7',
    '0610.14.2.8',
    '0610.14.2.9',
  ],
  tier: 'extended',
  estimatedMinutes: 60,

  title: { en: 'The nervous system and the eye', zh: '神经系统与眼' },
  summary: {
    en: 'Your hand is off the hotplate before you know it was hot, because the impulse never went to the brain. A reflex is fast for exactly the reason it is stupid.',
    zh: '在你意识到烫之前，手已经离开了热盘，因为脉冲根本没有传到大脑。反射之所以快，恰恰就是它之所以"笨"的原因。',
  },

  objectives: [
    {
      en: 'Describe the mammalian nervous system as the central nervous system and peripheral nerves, and its role in coordination.',
      zh: '把哺乳动物神经系统描述为中枢神经系统与外周神经，并说明其在协调中的作用。',
    },
    {
      en: 'Identify sensory, relay and motor neurones, and describe a simple reflex arc.',
      zh: '识别感觉、中间与运动神经元，并描述简单的反射弧。',
    },
    {
      en: 'Describe the structure of a synapse and the events at it, and explain why impulses travel one way only. (Extended)',
      zh: '描述突触的结构及其处发生的过程，并解释脉冲为何只能单向传导。（Extended）',
    },
    {
      en: 'Identify the structures of the eye and describe the function of each.',
      zh: '识别眼的结构并描述各部分的功能。',
    },
    {
      en: 'Explain the pupil reflex, including the antagonistic circular and radial muscles. (Extended)',
      zh: '解释瞳孔反射，包括环行肌与辐射肌的拮抗作用。（Extended）',
    },
    {
      en: 'Explain accommodation for near and distant objects. (Extended)',
      zh: '解释看近物与远物时的调节。（Extended）',
    },
    {
      en: 'Describe the distribution and functions of rods and cones, and identify the fovea. (Extended)',
      zh: '描述视杆细胞与视锥细胞的分布与功能，并识别中央凹。（Extended）',
    },
  ],

  glossary: [
    {
      en: 'reflex action',
      zh: '反射',
      definition: {
        en: 'An automatic, rapid response that is not consciously decided on. Fast because the impulse turns round at the spinal cord instead of going to the brain.',
        zh: '一种自动、迅速、无需有意识决定的反应。它之所以快，是因为脉冲在脊髓折返，而不去大脑。',
      },
      syllabus: ['0610.14.1.5', '0610.14.1.6'],
    },
    {
      en: 'synapse',
      zh: '突触',
      definition: {
        en: 'The junction between two neurones. The impulse cannot cross the gap electrically, so a neurotransmitter carries it across chemically.',
        zh: '两个神经元之间的连接处。脉冲无法以电的形式跨过缝隙，因此由神经递质以化学方式把它传过去。',
      },
      syllabus: ['0610.14.1.7', '0610.14.1.8'],
    },
    {
      en: 'neurotransmitter',
      zh: '神经递质',
      definition: {
        en: 'The chemical released from vesicles on one side of a synapse. It diffuses across, binds to receptors on the other side, and starts a new impulse.',
        zh: '由突触一侧的小泡释放的化学物质。它扩散过去，与另一侧的受体结合，引发新的脉冲。',
      },
      syllabus: ['0610.14.1.9'],
    },
    {
      en: 'accommodation',
      zh: '（视觉）调节',
      definition: {
        en: 'Changing the shape of the lens to focus on objects at different distances. Necessary because the retina cannot move.',
        zh: '改变晶状体的形状，以看清不同距离的物体。之所以必要，是因为视网膜无法移动。',
      },
      syllabus: ['0610.14.2.6'],
    },
    {
      en: 'fovea',
      zh: '中央凹',
      definition: {
        en: 'The part of the retina directly opposite the pupil, packed with cones and almost free of rods. It gives the sharpest, most colourful vision.',
        zh: '视网膜上正对瞳孔的部位，密布视锥细胞而几乎没有视杆细胞。它提供最清晰、色彩最丰富的视觉。',
      },
      syllabus: ['0610.14.2.9'],
    },
    {
      en: 'antagonistic muscles',
      zh: '拮抗肌',
      definition: {
        en: 'A pair that pull in opposite directions, so one must relax as the other contracts. The circular and radial muscles of the iris are a pair.',
        zh: '一对方向相反的肌肉，一块收缩时另一块必须舒张。虹膜的环行肌与辐射肌就是这样一对。',
      },
      syllabus: ['0610.14.2.5'],
    },
    // ---- added 8/6 (G8 14-1 lesson, nervous system + visual perception) ----
    {
      en: 'neurone',
      zh: '神经元',
      definition: {
        en: 'A nerve cell. It carries an electrical impulse along its length and passes it to the next cell across a synapse. The brain contains about 86 billion of them.',
        zh: '一种神经细胞。它把电脉冲沿自身传递，并通过突触把信号交给下一个细胞。大脑约有 860 亿个神经元。',
      },
      syllabus: ['0610.14.1.1', '0610.14.1.2'],
    },
    {
      en: 'central nervous system (CNS)',
      zh: '中枢神经系统（CNS）',
      definition: {
        en: 'The brain and the spinal cord. The part of the nervous system where decisions are made and reflexes turn round.',
        zh: '脑和脊髓。神经系统里做决定、也是反射弧折返的地方。',
      },
      syllabus: ['0610.14.1.1'],
    },
    {
      en: 'peripheral nervous system (PNS)',
      zh: '外周神经系统（PNS）',
      definition: {
        en: 'Every nerve outside the brain and spinal cord. Sensory nerves bring signals in, motor nerves carry commands out.',
        zh: '脑和脊髓以外的所有神经。感觉神经把信号传入，运动神经把命令传出。',
      },
      syllabus: ['0610.14.1.1'],
    },
    {
      en: 'spinal cord',
      zh: '脊髓',
      definition: {
        en: 'The long bundle of nervous tissue running inside the vertebral column. Reflex arcs turn round here, which is why a hand can be off a hotplate before the brain knows the plate was hot.',
        zh: '在椎管内纵向走行的一束神经组织。反射弧就在这里折返——这就是为什么手已经在离热盘时大脑还不知道热盘是热的。',
      },
      syllabus: ['0610.14.1.1', '0610.14.1.6'],
    },
    {
      en: 'sensory neurone',
      zh: '感觉神经元',
      definition: {
        en: 'A neurone that carries impulses from a receptor inwards, towards the central nervous system.',
        zh: '把脉冲从感受器向内、传向中枢神经系统的神经元。',
      },
      syllabus: ['0610.14.1.2'],
    },
    {
      en: 'relay neurone',
      zh: '中间神经元',
      definition: {
        en: 'A short neurone that connects a sensory neurone to a motor neurone. Its cell body sits in the central nervous system — usually the spinal cord for a reflex.',
        zh: '把感觉神经元和运动神经元连接起来的短神经元。胞体在中枢神经系统内——反射时通常在脊髓。',
      },
      syllabus: ['0610.14.1.2'],
    },
    {
      en: 'motor neurone',
      zh: '运动神经元',
      definition: {
        en: 'A neurone that carries impulses outwards, from the central nervous system to an effector (a muscle or a gland).',
        zh: '把脉冲从中枢神经系统向外、传到效应器（肌肉或腺体）的神经元。',
      },
      syllabus: ['0610.14.1.2'],
    },
    {
      en: 'receptor',
      zh: '感受器',
      definition: {
        en: 'A cell (or part of a cell) that detects a specific stimulus — touch, heat, light, chemical — and turns it into an electrical impulse in a sensory neurone.',
        zh: '探测特定刺激（触、热、光、化学物质）并把它变成感觉神经元电脉冲的细胞（或细胞的一部分）。',
      },
      syllabus: ['0610.14.1.4'],
    },
    {
      en: 'effector',
      zh: '效应器',
      definition: {
        en: 'A muscle or gland that responds to an impulse from a motor neurone — by contracting or by secreting.',
        zh: '响应运动神经元脉冲的肌肉或腺体——以收缩或分泌作出反应。',
      },
      syllabus: ['0610.14.1.4'],
    },
    {
      en: 'cornea',
      zh: '角膜',
      definition: {
        en: 'The transparent front of the eye. It does most of the bending of light that focuses an image on the retina — about two-thirds of the total refractive power.',
        zh: '眼前端的透明部分。完成把像聚焦到视网膜上所需的大部分屈光——约占总屈光力的三分之二。',
      },
      syllabus: ['0610.14.2.1'],
    },
    {
      en: 'iris',
      zh: '虹膜',
      definition: {
        en: 'The coloured ring of muscle that controls how much light enters the eye, by changing the size of the pupil.',
        zh: '控制进光量的有色肌肉环，通过改变瞳孔大小来工作。',
      },
      syllabus: ['0610.14.2.3'],
    },
    {
      en: 'pupil',
      zh: '瞳孔',
      definition: {
        en: 'The hole in the middle of the iris. It is not a structure — its size is set by the iris muscles. Diameter runs from about 2 mm in bright light to about 8 mm in the dark.',
        zh: '虹膜中央的孔。它本身不是结构——大小由虹膜肌肉决定。直径从强光下的约 2 mm 到黑暗中的约 8 mm。',
      },
      syllabus: ['0610.14.2.3'],
    },
    {
      en: 'lens',
      zh: '晶状体',
      definition: {
        en: 'A flexible, transparent disc behind the iris. Ciliary muscles change its shape to focus on objects at different distances.',
        zh: '虹膜后方柔韧透明的盘状结构。睫状肌改变其形状以看清不同距离的物体。',
      },
      syllabus: ['0610.14.2.6'],
    },
    {
      en: 'ciliary muscle',
      zh: '睫状肌',
      definition: {
        en: 'A ring of muscle that changes the shape of the lens. When it contracts, the ring gets smaller, the suspensory ligaments slacken, and the lens fattens under its own elasticity.',
        zh: '改变晶状体形状的环形肌肉。收缩时环变小，悬韧带松弛，晶状体在自身弹性下变厚。',
      },
      syllabus: ['0610.14.2.6'],
    },
    {
      en: 'vitreous humour',
      zh: '玻璃体',
      definition: {
        en: 'The clear jelly that fills the main chamber of the eye and holds the retina against the back wall. Light passes through it on its way to the retina.',
        zh: '填充主眼室的透明胶状物，把视网膜压向眼球后壁。光穿过它到达视网膜。',
      },
      syllabus: ['0610.14.2.8'],
    },
    {
      en: 'retina',
      zh: '视网膜',
      definition: {
        en: 'The light-sensitive layer at the back of the eye. It contains the photoreceptor cells — rods (for dim light) and cones (for colour and detail).',
        zh: '眼球后壁的感光层。包含感光细胞——视杆细胞（暗光下工作）与视锥细胞（色觉与细节）。',
      },
      syllabus: ['0610.14.2.8'],
    },
    {
      en: 'optic nerve',
      zh: '视神经',
      definition: {
        en: 'The bundle of about a million nerve fibres that carries impulses from the retina to the visual cortex at the back of the brain.',
        zh: '由约一百万根神经纤维组成的束，把脉冲从视网膜送到大脑后部的视觉皮层。',
      },
      syllabus: ['0610.14.2.10'],
    },
    {
      en: 'blind spot',
      zh: '盲点',
      definition: {
        en: 'The small region of the retina where the optic nerve fibres exit the eyeball. There are no photoreceptors there — any light that lands on it produces no signal. The other eye normally covers for it.',
        zh: '视神经纤维离开眼球的那个小区域。这里没有感光细胞——光落上去不产生信号。另一只眼通常会代偿。',
      },
      syllabus: ['0610.14.2.10'],
    },
    {
      en: 'rod cell',
      zh: '视杆细胞',
      definition: {
        en: 'A photoreceptor cell that works in dim light but cannot distinguish colour. Densely packed around the edges of the retina, almost absent from the fovea.',
        zh: '在弱光下工作、但不能分辨颜色的感光细胞。在视网膜边缘密集分布，中央凹几乎不存在。',
      },
      syllabus: ['0610.14.2.9'],
    },
    {
      en: 'cone cell',
      zh: '视锥细胞',
      definition: {
        en: 'A photoreceptor cell that needs bright light and distinguishes colour. There are three types, sensitive to red, green or blue. Packed densely in the fovea.',
        zh: '需要强光、能分辨颜色的感光细胞。分三种，分别对红、绿、蓝敏感。密集分布在中央凹。',
      },
      syllabus: ['0610.14.2.9'],
    },
    {
      en: 'colour blindness',
      zh: '色盲',
      definition: {
        en: 'A condition in which one or more types of cone cell are missing or non-functional. The most common form is red–green colour blindness, caused by a defect on the X chromosome — about 8% of boys, 0.5% of girls.',
        zh: '一种或多种视锥细胞缺失或失能的状况。最常见的是红绿色盲，由 X 染色体上的缺陷导致——约 8% 的男孩、0.5% 的女孩。',
      },
      syllabus: ['0610.14.2.9'],
    },
    {
      en: 'adrenaline',
      zh: '肾上腺素',
      definition: {
        en: 'A hormone released by the adrenal glands in "fight-or-flight" moments. It widens the pupils, raises the heart rate, diverts blood to the muscles, and releases glucose from the liver.',
        zh: '"战或逃"时刻由肾上腺释放的激素。它使瞳孔放大、心率上升、血液转向肌肉、并从肝脏释放葡萄糖。',
      },
      syllabus: ['0610.14.1.10', '0610.14.2.5'],
    },
    {
      en: 'prefrontal cortex',
      zh: '前额叶皮层',
      definition: {
        en: 'The part of the frontal lobe at the very front of the brain. Seat of planning, decision-making, voluntary movement and personality — the part most clearly "you".',
        zh: '大脑额叶的最前部。负责计划、决策、随意运动与人格——最像"你"的那部分。',
      },
      syllabus: ['0610.14.1.10'],
    },
    {
      en: 'corpus callosum',
      zh: '胼胝体',
      definition: {
        en: 'The thick bundle of nerve fibres connecting the two cerebral hemispheres. Cutting it — historically done to treat severe epilepsy — reveals that the two halves can operate surprisingly independently.',
        zh: '连接两个大脑半球的粗大神经纤维束。切断它——历史上曾用于治疗严重癫痫——揭示出两个半球能够惊人地独立工作。',
      },
      syllabus: ['0610.14.1.10'],
    },
    {
      en: 'epilepsy',
      zh: '癫痫',
      definition: {
        en: 'A condition in which groups of brain neurons fire out of control, producing seizures. The cause is electrical misfiring, not a personality or mood problem.',
        zh: '一组大脑神经元失控放电、引发癫痫发作的疾病。原因是电信号失灵，不是人格或情绪问题。',
      },
      syllabus: ['0610.14.1.10'],
    },
    {
      en: 'selective attention',
      zh: '选择注意',
      definition: {
        en: 'The brain\'s ability to focus on one thing while ignoring others. The "invisible gorilla" experiment shows that what is outside the focus can pass straight through conscious vision unnoticed.',
        zh: '大脑集中注意一件事、忽略其他事物的能力。"看不见的大猩猩"实验说明：焦点之外的东西可以完全穿过意识视野而不被察觉。',
      },
      syllabus: ['0610.14.2.10'],
    },
    {
      en: 'change blindness',
      zh: '变化盲',
      definition: {
        en: 'The failure to notice a large change that happens in plain view, because attention is elsewhere. The classic example: the missing puzzle piece sitting on a face — five minutes of staring, and still missed.',
        zh: '视野正中央出现明显变化却没注意到的现象——因为注意力在别处。经典例子：缺失的拼图块就摆在脸上——盯五分钟还是看不见。',
      },
      syllabus: ['0610.14.2.10'],
    },
    {
      en: 'visual completion',
      zh: '视觉补全',
      definition: {
        en: 'The brain\'s habit of filling in missing information with the most likely pattern. It is what hides the blind spot — and what makes change blindness so embarrassing when it kicks in at the wrong moment.',
        zh: '大脑用最可能的模式把缺失信息补全的习惯。它是隐藏盲点的原因——也是变化盲在错误时刻发生时让人如此尴尬的原因。',
      },
      syllabus: ['0610.14.2.10'],
    },
    {
      en: 'brain–computer interface (BCI)',
      zh: '脑机接口（BCI）',
      definition: {
        en: 'A device that lets the brain talk directly to an external machine — or vice versa — by reading or writing electrical signals. BrainPort, which routes camera images to the tongue, is one early example.',
        zh: '让大脑与外部机器直接交流（或反过来）的设备——通过读取或写入电信号。BrainPort 把摄像头图像传到舌头上，是早期例子之一。',
      },
      syllabus: ['0610.14.1.10'],
    },
    // ---- 2026-08-18 Chapter 4 PDF gap-fill ----
    // Section 4.1 — coordination in animals (the textbook's framing chapter)
    {
      en: 'sensitivity',
      zh: '感应性',
      definition: {
        en: 'The characteristic of all living things that lets them detect and respond to changes in their environment. A reflex pulling your hand off a hotplate is one example; a plant root growing towards water is another.',
        zh: '所有生物共有的特性——能够察觉并对环境中的变化作出反应。手从热盘上缩回来是其中一例；植物的根向水源方向生长也是。',
      },
      syllabus: ['0610.14.1.1'],
    },
    {
      en: 'stimulus (plural: stimuli)',
      zh: '刺激（复数：stimuli）',
      definition: {
        en: 'A change in the environment that a receptor can detect — light, sound, heat, pressure, a chemical, a touch. Plural: stimuli.',
        zh: '环境中能被感受器察觉到的变化——光、声、热、压、化学物质、触碰等。复数为 stimuli。',
      },
      syllabus: ['0610.14.1.4'],
    },
    {
      en: 'voluntary action',
      zh: '随意动作',
      definition: {
        en: 'A response that you decide to make. Reading this sentence is a voluntary action — the brain has decided to send the right impulses. Contrast with reflex (involuntary).',
        zh: '由你决定做出的反应。读这一句话就是随意动作——大脑决定发出相应的脉冲。与反射（不随意）相对。',
      },
      syllabus: ['0610.14.1.5'],
    },
    {
      en: 'involuntary action',
      zh: '不随意动作',
      definition: {
        en: 'A response that happens without you deciding to make it — and usually without you being aware of it. A reflex action (pulling your hand off a hotplate) is the textbook example. The brain is told afterwards, not asked first.',
        zh: '你没决定就发生的反应——通常你也没有意识到。反射动作（手从热盘上缩回）是教科书例子。大脑是事后被告知的，不是事先被请示的。',
      },
      syllabus: ['0610.14.1.5'],
    },
    // Section 4.2 — the structure of a neurone (Figure B9.01)
    {
      en: 'axon',
      zh: '轴突',
      definition: {
        en: 'The long fibre stretching out from the cell body of a neurone. In a motor neurone it can be more than a metre long — the cell body sits in the spinal cord, the axon tip reaches a muscle in the foot. The signal travels along the axon as an electrical impulse.',
        zh: '从神经元胞体伸出的一条长纤维。在运动神经元中长度可超过一米——胞体在脊髓里，轴突末端却一直伸到脚上的肌肉。信号以电脉冲的形式沿轴突传导。',
      },
      syllabus: ['0610.14.1.2'],
    },
    {
      en: 'dendrite',
      zh: '树突',
      definition: {
        en: 'A short, branched fibre coming out of the cell body of a neurone. Dendrites pick up electrical signals from neighbouring neurones and pass them to the cell body. (A single motor neurone can have hundreds of dendrites; the axon is the one long fibre.)',
        zh: '从神经元胞体伸出的短而分支的纤维。树突从邻近的神经元那里接收电信号，并把它传给胞体。（一个运动神经元可以有数百根树突；轴突只有那一条长纤维。）',
      },
      syllabus: ['0610.14.1.2'],
    },
    {
      en: 'cell body',
      zh: '胞体',
      definition: {
        en: 'The central part of a neurone that contains the nucleus. All the dendrites and the axon grow out of it. In a motor neurone the cell body sits in the spinal cord; in a sensory neurone it sits in a swelling just outside the cord.',
        zh: '神经元含细胞核的中央部分。所有树突和轴突都从这里长出。运动神经元的胞体在脊髓里；感觉神经元的胞体在脊髓外的一个膨大处。',
      },
      syllabus: ['0610.14.1.2'],
    },
    // Section 4.3 — eye protection (a third of the textbook's B9.03 page)
    {
      en: 'orbit',
      zh: '眼眶',
      definition: {
        en: 'The bony socket in the skull that the eye sits in. Everything except the very front of the eye is surrounded by bone, so a blow to the side of the head cannot reach the retina.',
        zh: '眼球所在的颅骨窝。除了最前端，眼球其余部分都被骨头包着——侧面的击打够不到视网膜。',
      },
      syllabus: ['0610.14.2.1'],
    },
    {
      en: 'conjunctiva',
      zh: '结膜',
      definition: {
        en: 'A thin, transparent membrane that covers the front of the eye and the inside of the eyelids. It is the surface dirt and bacteria land on, and it is the surface the tear fluid washes across when you blink.',
        zh: '覆盖眼球前端和眼睑内面的薄而透明的膜。灰尘和细菌就落在这层膜上；你眨眼时，泪液也是从这层膜上洗过去的。',
      },
      syllabus: ['0610.14.2.1'],
    },
    {
      en: 'tear gland',
      zh: '泪腺',
      definition: {
        en: 'A small gland under the upper eyelid that secretes the watery fluid spread across the eye when you blink. The fluid carries dissolved oxygen and nutrients to the cornea (which has no blood supply) and washes debris to the corner of the eye.',
        zh: '上眼睑下方的小腺体，分泌眨眼时铺展在眼球表面的水样液体。这种液体给没有血管的角膜带去溶解氧和营养，并把碎屑冲到眼角。',
      },
      syllabus: ['0610.14.2.1'],
    },
    {
      en: 'lysozyme',
      zh: '溶菌酶',
      definition: {
        en: 'An enzyme in the tear fluid that breaks down the cell walls of bacteria. The eye is one of the few parts of the body exposed directly to the air, so it has a chemical rather than an immune defence sitting on the surface.',
        zh: '泪液中的一种酶，能破坏细菌的细胞壁。眼睛是身体少数几个直接暴露在空气中的部位之一，所以它在表面用化学方式而不是免疫方式防御。',
      },
      syllabus: ['0610.14.2.1'],
    },
    {
      en: 'eyelid',
      zh: '眼睑',
      definition: {
        en: 'The flap of skin that closes over the eye. Blinking spreads tear fluid across the conjunctiva; a fast reflex closure (when something flies at your face) protects the cornea from impact. Eyelashes at the lid edge catch large debris before it lands on the eye.',
        zh: '盖在眼球上的皮瓣。眨眼把泪液铺在结膜上；当有东西飞向面部时，快速的反射性闭合能保护角膜免受撞击。睑缘的睫毛把大块碎屑挡在落到眼球之前。',
      },
      syllabus: ['0610.14.2.1'],
    },
    // Section 4.3 — "optional labels" (the textbook says they are not required,
    // but it draws them on Figure B9.06 so students see them).
    {
      en: 'sclera',
      zh: '巩膜',
      definition: {
        en: 'The tough, white outer coat of the eyeball. It is the part you see as "the white of the eye". The sclera is what the eye muscles attach to; it is the same kind of tough connective tissue as the cornea, just not transparent.',
        zh: '眼球坚韧的白色外膜。也就是你看到的"眼白"。眼肌就附着在巩膜上；它的材料和角膜一样坚韧，只是不透光。',
      },
      syllabus: ['0610.14.2.1'],
    },
    {
      en: 'choroid',
      zh: '脉络膜',
      definition: {
        en: 'A dark, pigmented layer between the sclera and the retina. Its job is to absorb any light that gets past the retina, so reflections off the back of the eye do not blur the image. The dark colour is the pigment.',
        zh: '巩膜和视网膜之间的深色色素层。它的工作是吸收穿过视网膜的杂散光，防止光线在眼球后壁反射而把像变模糊。深色就是这层色素。',
      },
      syllabus: ['0610.14.2.1'],
    },
  ],

  equations: [
    {
      latex: 'P = \\dfrac{1}{v} + \\dfrac{1}{u}',
      meaning: {
        en: 'The power the lens must have, with v the distance to the retina and u the distance to the object, both in metres. The eye cannot change v, so every change in u must be met by the lens.',
        zh: '晶状体所需的屈光力，其中 v 是到视网膜的距离、u 是到物体的距离，单位均为米。眼睛无法改变 v，因此 u 的每一次变化都必须由晶状体来应对。',
      },
      substitute: (r) =>
        `P = ${r['power'] ?? 0}\\ \\mathrm{D} \\quad \\text{spare} = ${r['spare'] ?? 0}\\ \\mathrm{D}`,
    },
    {
      latex: 'I_{\\text{retina}} \\;\\propto\\; I \\times \\pi r^{2}',
      meaning: {
        en: 'Light reaching the retina depends on the area of the pupil, not its width. Halving the diameter quarters the light — which is also why the reflex can only ever change it sixteenfold.',
        zh: '到达视网膜的光取决于瞳孔的面积而非宽度。直径减半，光量降为四分之一——这也正是该反射最多只能改变 16 倍的原因。',
      },
      substitute: (r) =>
        `d = ${r['pupil'] ?? 0}\\ \\mathrm{mm} \\quad I_{\\text{retina}} = ${r['retina'] ?? 0}`,
    },
  ],

  sim: {
    primitive: 'plot2d',
    kernel: '14-1-nervous-system',
    hint: {
      en: 'Take the light from almost nothing to full daylight and watch both readings — the pupil, and what actually reaches the retina. Then set the reflex to zero.',
      zh: '把光照从几乎为零调到全日照，同时观察两个读数——瞳孔直径，以及真正到达视网膜的光。然后把反射设为零。',
    },
    params: [
      {
        key: 'light',
        label: { en: 'Light intensity', zh: '光照强度' },
        unit: '%',
        min: 0,
        max: 100,
        step: 0.5,
        default: 50,
      },
      {
        key: 'distance',
        label: { en: 'Distance to the object', zh: '到物体的距离' },
        unit: 'cm',
        min: 5,
        max: 300,
        step: 5,
        default: 100,
      },
      {
        key: 'reflex',
        label: { en: 'Iris muscles working', zh: '虹膜肌肉的功能' },
        unit: '%',
        min: 0,
        max: 100,
        step: 5,
        default: 100,
      },
    ],
    readouts: [
      {
        key: 'pupil',
        label: { en: 'Pupil diameter', zh: '瞳孔直径' },
        unit: 'mm',
        sigFigs: 3,
        exact: true,
      },
      {
        key: 'retina',
        label: { en: 'Light reaching the retina', zh: '到达视网膜的光' },
        unit: '',
        sigFigs: 3,
        exact: true,
      },
      {
        key: 'power',
        label: { en: 'Lens power needed', zh: '所需晶状体屈光力' },
        unit: 'D',
        sigFigs: 4,
        exact: true,
      },
      {
        key: 'spare',
        label: { en: 'Spare accommodation', zh: '剩余调节力' },
        unit: 'D',
        sigFigs: 3,
        exact: true,
      },
    ],
    presets: [
      {
        label: { en: 'A dim room', zh: '昏暗的房间' },
        params: { light: 0.5, distance: 100, reflex: 100 },
      },
      {
        label: { en: 'Full daylight', zh: '全日照' },
        params: { light: 100, distance: 100, reflex: 100 },
      },
      {
        label: { en: 'Reading, close up', zh: '近距离阅读' },
        params: { light: 60, distance: 25, reflex: 100 },
      },
      {
        label: { en: 'Looking into the distance', zh: '眺望远方' },
        params: { light: 60, distance: 300, reflex: 100 },
      },
      {
        label: { en: 'Too close to focus', zh: '太近，无法聚焦' },
        params: { light: 60, distance: 10, reflex: 100 },
      },
      {
        label: { en: 'A pupil that will not respond', zh: '没有反应的瞳孔' },
        params: { light: 100, distance: 100, reflex: 0 },
      },
    ],
  },

  narration,

  checkpoints: [
    {
      id: '0610-14-1-cp1',
      syllabus: ['0610.14.1.5', '0610.14.1.6'],
      tier: 'core',
      commandWord: 'Describe',
      marks: 4,
      stem: 'A person touches a hot object and immediately pulls their hand away. Describe the pathway taken by the impulses, naming the structures involved in order.',
      markScheme: [
        { text: 'A receptor in the skin detects the stimulus (the heat)', marks: 1 },
        { text: 'A sensory neurone carries impulses to the spinal cord', marks: 1 },
        { text: 'A relay neurone in the spinal cord passes them to a motor neurone', marks: 1 },
        {
          text: 'The motor neurone carries impulses to the effector — a muscle in the arm — which contracts and moves the hand away',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'The order is the answer. And do not route it through the brain: the impulse turns round at the spinal cord, which is why the response beats the sensation of pain.',
        zh: '顺序本身就是答案。也不要让它经过大脑：脉冲在脊髓折返，这正是为什么反应比疼痛的感觉更快。',
      },
    },
    {
      id: '0610-14-1-cp2',
      syllabus: ['0610.14.1.8', '0610.14.1.9', '0610.14.1.10'],
      tier: 'extended',
      commandWord: 'Explain',
      marks: 4,
      stem: 'Explain how an impulse crosses a synapse, and why it can only travel in one direction across it.',
      markScheme: [
        {
          text: 'The impulse causes vesicles in the first neurone to release a neurotransmitter into the gap',
          marks: 1,
        },
        { text: 'The neurotransmitter diffuses across the synaptic gap', marks: 1 },
        {
          text: 'It binds to receptor proteins on the second neurone and triggers a new impulse in it',
          marks: 1,
        },
        {
          text: 'The vesicles are only in the first neurone and the receptors only on the second, so transmission is possible in one direction only',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'The one-way mark depends on naming both asymmetries — vesicles on one side, receptors on the other. "Because that is the way the neurone points" is not an explanation.',
        zh: '"单向"这一分取决于同时说出两处不对称——小泡在一侧、受体在另一侧。写"因为神经元就是朝那个方向的"不算解释。',
      },
    },
    {
      id: '0610-14-1-cp3',
      syllabus: ['0610.14.2.4', '0610.14.2.5'],
      tier: 'extended',
      commandWord: 'Explain',
      marks: 3,
      stem: 'Explain what happens to the iris and the pupil when a person walks from a dim room into bright sunlight, and why this response is useful.',
      markScheme: [
        { text: 'The circular muscles of the iris contract and the radial muscles relax', marks: 1 },
        { text: 'The pupil constricts, so less light enters the eye', marks: 1 },
        { text: 'This protects the retina from being damaged by very bright light', marks: 1 },
      ],
      examinerNote: {
        en: 'Both muscle sets, in the same sentence — they are antagonistic, so naming one without the other is half an answer. And the pupil is a hole: it cannot itself contract.',
        zh: '两组肌肉要写在同一句里——它们是拮抗的，只说一组只答了一半。另外，瞳孔是一个孔：它本身不会收缩。',
      },
    },
    {
      id: '0610-14-1-cp4',
      syllabus: ['0610.14.2.6'],
      tier: 'extended',
      commandWord: 'Describe',
      marks: 4,
      stem: 'Describe what happens in the eye when a person looks up from a book to a distant object.',
      markScheme: [
        { text: 'The ciliary muscles relax', marks: 1 },
        { text: 'The suspensory ligaments are pulled tight', marks: 1 },
        { text: 'The lens is pulled thinner, so its power decreases and its focal length increases', marks: 1 },
        {
          text: 'Light from the distant object is brought to a focus on the retina rather than in front of it',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'This is the sentence most often reversed. The ciliary muscle is a ring: contracting it makes its diameter smaller and *slackens* the ligaments. Relaxing it lets the ring widen and pulls them tight.',
        zh: '这是最常被写反的一句。睫状肌是一个环：收缩会使其直径变小，从而使悬韧带*松弛*；舒张则让环变宽，把韧带拉紧。',
      },
    },
    {
      id: '0610-14-1-cp5',
      syllabus: ['0610.14.2.7', '0610.14.2.8', '0610.14.2.9'],
      tier: 'extended',
      commandWord: 'Suggest',
      marks: 3,
      stem: 'An astronomer looking at a very faint star finds that it disappears when they look directly at it, but is visible when they look slightly to one side. Suggest an explanation.',
      markScheme: [
        {
          text: 'Looking directly at the star focuses its image on the fovea',
          marks: 1,
        },
        {
          text: 'The fovea contains almost only cones, and cones need bright light to respond',
          marks: 1,
        },
        {
          text: 'Looking to one side focuses the image on a part of the retina rich in rods, which do respond in dim light',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Three facts assembled into an argument: where the image lands, what is there, and what that cell type can do. Listing the differences between rods and cones without applying them scores one at most.',
        zh: '把三个事实组织成一条论证：像落在哪里、那里有什么细胞、这类细胞能做什么。只罗列视杆与视锥的区别而不加以应用，最多得一分。',
      },
    },
    {
      id: '0610-14-1-cp6',
      syllabus: ['0610.14.1.4'],
      tier: 'core',
      commandWord: 'State',
      marks: 2,
      stem: 'State the function of a sensory neurone and the function of a motor neurone.',
      markScheme: [
        {
          text: 'A sensory neurone carries impulses from a receptor to the central nervous system',
          marks: 1,
        },
        {
          text: 'A motor neurone carries impulses from the central nervous system to an effector (a muscle or a gland)',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Give the direction and both ends. "It senses things" describes the receptor, not the neurone, and earns nothing.',
        zh: '要写出方向和两端。写"它感受事物"描述的是感受器而不是神经元，不得分。',
      },
    },
  ],

  // Visual / interactive learning modules for Chapter 4a (14.1 + 14.2 — the
  // nervous system and the eye). See src/content/types.ts for the
  // `LessonExtra` shape. Each module uses a real figure extracted from the
  // G8 PDF so the student sees the textbook picture, not a hand-drawn
  // approximation.
  extras: [
    // 0) Coordination in animals — the framing chapter (G8 B9.01). The
    //    textbook puts this FIRST because it sets up the rest of the
    //    chapter: animals have two ways to coordinate receptors and
    //    effectors (nerves for fast stuff, hormones for slow stuff), and
    //    glands are effectors too, not just muscles. Most of the rest of
    //    the lesson dives into the "nerves" half; the "hormones" half
    //    lives in 14-3. This card gives the student a single mental model
    //    of the whole chapter before the details arrive.
    {
      type: 'concept-explainer',
      id: 'coordination-intro',
      title: {
        en: 'Coordination in animals — two ways to send a message',
        zh: '动物的协调——两种传递信息的方式',
      },
      hint: {
        en: 'A small framing chapter before the detail. Two ways to coordinate receptors and effectors: the nervous system (fast, electrical, short-lived) and the endocrine system (slow, chemical, longer-lasting).',
        zh: '细节之前先建立总框架。感受器和效应器之间有两种协调方式：神经系统（快、电信号、作用短暂）和内分泌系统（慢、化学信号、作用持久）。',
      },
      blocks: [
        {
          id: 'two-systems',
          title: {
            en: 'Nerves and hormones — the two channels of coordination',
            zh: '神经与激素——协调的两条通道',
          },
          hook: {
            en: 'You spot a dog running at you, and you are off the pavement before you have finished the thought. Five minutes later your heart is still thumping and your mouth is dry. The first reaction came through nerves; the second came through hormones — two different channels running the same job.',
            zh: '你看到一只狗朝你冲过来，还没想完就已经跳下了人行道。五分钟后你的心还在狂跳，嘴巴发干。第一次反应走的是神经；第二次走的是激素——两条不同的通道，干着同一件事。',
          },
          mechanism: {
            en: 'Animals need a way to link receptors (cells that detect stimuli) to effectors (cells that respond). Most animals have two such links, and they are very different. Nerves send electrical impulses along specialised cells called neurones — extremely fast, lasting milliseconds, hitting one precise target. Hormones are chemicals made by glands, released into the blood, and carried everywhere at once — slower, lasting seconds or longer, and reaching the whole body. The fast channel handles "right now"; the slow channel handles "for the next few minutes".',
            zh: '动物需要一种方式把感受器（察觉刺激的细胞）和效应器（作出反应的细胞）连接起来。大多数动物有两条这样的连接，而且差异很大。神经是把电脉冲沿神经元这种特化细胞传过去——极快，只持续毫秒，精确命中一个目标。激素是腺体产生、释放入血、被运到全身的化学物质——更慢，持续数秒或更长，到达整个身体。快速通道处理"现在"；慢速通道处理"接下来几分钟"。',
          },
          whyItMatters: {
            en: 'Most exam questions on this chapter fall into one of two camps: how a nerve signal travels (reflexes, the eye, the brain) or how a hormone signal travels (adrenaline, insulin). Knowing there are two channels, and that they have opposite trade-offs, is the frame that makes the rest of the chapter make sense.',
            zh: '本章大多数考题分属两类：神经信号怎么传（反射、眼、脑），激素信号怎么传（肾上腺素、胰岛素）。知道存在两条通道、且它们的取舍正相反，是让本章其余部分讲得通的"框架"。',
          },
          teacherStory: {
            en: 'If a student ever asks "why do we need TWO systems?", point out that the nervous system can only do "right now" — by the time a nerve impulse gets to a muscle and back, the moment has often passed. Hormones are slow, but they are also persistent: adrenaline released in a fright will still be acting half an hour later. The two systems are not redundant; they are a fast/short pair plus a slow/long pair, which is exactly the trade-off a designer would pick.',
            zh: '如果学生问"为什么需要两套系统"，可以告诉他们：神经系统只能处理"现在"——神经脉冲到达肌肉再返回时，那个瞬间往往已经过去了。激素虽慢，但胜在持久：恐惧时释放的肾上腺素，半小时后还在起作用。两套系统并非冗余，而是"快/短"加"慢/长"的一对——这正是任何设计师都会选的取舍。',
          },
        },
        {
          id: 'glands-are-effectors',
          title: {
            en: 'Effectors are not just muscles — glands are effectors too',
            zh: '效应器不只是肌肉——腺体也是效应器',
          },
          hook: {
            en: 'You smell food cooking. Before you are conscious of being hungry, your salivary glands have already released saliva into your mouth. That is an effector response — and the effector is a gland, not a muscle.',
            zh: '你闻到了做饭的香味。在你意识到自己饿了之前，你的唾液腺已经把唾液送进了嘴里。这是一次效应器反应——而这个效应器是腺体，不是肌肉。',
          },
          mechanism: {
            en: 'In a reflex the motor neurone carries an impulse to a muscle, and the muscle contracts. But the same motor neurone can also carry an impulse to a gland, and the gland responds by secreting. Salivary glands, sweat glands, tear glands, glands in the lining of the stomach, glands that make hormones — they are all effectors of the same kind. "Effector" is a job description, not a tissue type. Two jobs: contract or secrete.',
            zh: '在反射中，运动神经元把脉冲送到肌肉，肌肉收缩。但同样的运动神经元也可以把脉冲送到腺体，腺体以分泌作反应。唾液腺、汗腺、泪腺、胃壁里的腺体、分泌激素的腺体——它们都是同一类效应器。"效应器"是工作描述，不是组织类型。两件事：收缩或分泌。',
          },
          whyItMatters: {
            en: 'Many exam questions name a "gland" without explaining what it does. The student is expected to know that a gland-as-effector responds to a motor-nerve impulse by secreting, and that a gland-as-endocrine-organ responds to a blood-borne signal by secreting into the blood. The two roles look similar from the outside but answer to different signals.',
            zh: '很多考题直接点出某个"腺体"而不解释它是干什么的。学生需要知道：作为效应器的腺体，响应运动神经的脉冲而分泌；作为内分泌器官的腺体，响应血液中的信号而分泌入血。两个角色从外面看像，但响应的是不同的信号。',
          },
          teacherStory: {
            en: 'A good one-line summary to give a struggling student: "an effector is whatever the brain or spinal cord talks to when it wants something to happen — usually a muscle, sometimes a gland." Memorise the two jobs (contract, secrete) and the rest follows.',
            zh: '给记不住的学生一句总结："效应器就是大脑或脊髓想要让某件事发生时去对话的对象——通常是肌肉，有时是腺体。"记住这两件事（收缩、分泌），其余就顺了。',
          },
        },
        {
          id: 'voluntary-involuntary',
          title: {
            en: 'Voluntary and involuntary — the same machinery, different routes',
            zh: '随意与不随意——同一套装置，两条路径',
          },
          hook: {
            en: 'You are reading this sentence because you decided to. Your heart is beating in the same chest, and you did not decide that. Both are coordinated by the nervous system, but one is voluntary and the other is not. The difference is where the decision happens.',
            zh: '你读这一句话是你决定的。你的心脏就在同一个胸腔里跳，你并没有决定它跳。两者都由神经系统协调，但一个随意、一个不随意。差别在"决定"发生的地方。',
          },
          mechanism: {
            en: 'A voluntary action — reaching for a cup, saying a word, looking at a question — starts in the cerebral cortex, where you become aware that you have decided to act. The decision becomes a signal that travels down through the brain and out along motor neurones to the muscles. An involuntary action — the heart beating, the gut pushing food along, a reflex like pulling your hand off a hotplate — does not start in the cortex. It starts lower down: in the medulla, the spinal cord, or a reflex arc. You are not consulted first, and you are often not aware of the action until it has already happened.',
            zh: '随意动作——伸手拿杯子、说一句话、看一道题——起始于大脑皮层，你在这里"意识到"自己决定行动了。这个决定变成信号向下传到脑，再沿运动神经元传到肌肉。不随意动作——心脏跳动、肠道推进食物、像手从热盘上缩回来这样的反射——不是从皮层开始的，而是从更低的位置开始：延髓、脊髓，或一个反射弧。你事先没被征询，而且通常在动作已经发生之后你才意识到。',
          },
          whyItMatters: {
            en: '"Describe the difference between a voluntary action and a reflex" is a one-sentence exam question worth two marks. The answer is not "reflexes are fast" (they are, but so are some voluntary actions). The answer is the route: voluntary goes through the cortex and you decide; reflex turns round at the spinal cord and you are not in the loop.',
            zh: '"描述随意动作和反射的区别"是一道值两分的一句话考题。答案不是"反射更快"（反射确实快，但有些随意动作也快）。答案是路径：随意动作经皮层、你来决定；反射在脊髓折返、你不在环里。',
          },
          teacherStory: {
            en: 'A useful image for a student: a voluntary action is a letter you write and post; an involuntary action is a text message your body sends without asking you. The mechanism is the same — nerves, muscles, glands — but one of them shows you the draft.',
            zh: '对学生有用的比喻：随意动作是你写好寄出的信；不随意动作是你的身体没问你就发出的短信。机制是同一套——神经、肌肉、腺体——只是前者会把草稿给你看。',
          },
        },
      ],
    },

    // 1) The reflex arc in one picture — G8 Figure B9.04 (hand on a hot
    //    plate) with 6 hotspots: pain receptor, sensory neurone, relay
    //    neurone, motor neurone, effector, spinal cord. "Follow the
    //    impulse" mode animates a dot through the arc in the right order,
    //    which is the most-missed fact in the chapter: the reflex turns
    //    round at the spinal cord, and never visits the brain.
    {
      type: 'reflex-arc',
      id: 'reflex-arc',
      title: { en: 'A reflex, step by step', zh: '反射，一步步看清' },
      hint: {
        en: 'Click any part of the reflex arc on the left. "Follow the impulse" walks through receptor → sensory → relay → motor → effector.',
        zh: '点击左侧反射弧的任一部分。点"跟着脉冲走"会从感受器→感觉→中间→运动→效应器一步步走完。',
      },
      initialPart: 'pain-receptor',
      parts: [
        {
          id: 'pain-receptor',
          name: { en: 'pain receptor', zh: '痛觉感受器' },
          description: {
            en: 'A nerve ending in the skin that responds to a stimulus — heat, in this case. It converts the stimulus into an electrical impulse, which is the only signal a neurone can carry. Most reflexes begin with a receptor like this.',
            zh: '皮肤里的神经末梢，对刺激（这里是热）作出反应。它把刺激转成电脉冲——这是神经元唯一能传的信号。多数反射都从这里开始。',
          },
          stop: 1,
        },
        {
          id: 'sensory-neurone',
          name: { en: 'sensory neurone', zh: '感觉神经元' },
          description: {
            en: 'Carries the impulse from the receptor towards the central nervous system. Its long axon runs in a peripheral nerve. In a reflex arc the impulse goes from the skin, up the arm, into the spinal cord.',
            zh: '把脉冲从感受器带到中枢神经系统。它的长轴突走行在外周神经里。反射弧中，脉冲从皮肤上行到脊髓。',
          },
          stop: 2,
        },
        {
          id: 'relay-neurone',
          name: { en: 'relay neurone', zh: '中间神经元' },
          description: {
            en: 'A short neurone whose cell body sits in the spinal cord. It receives the impulse from the sensory neurone and passes it on to a motor neurone. This is where the impulse turns round — the reflex never visits the brain, which is why it can outrun the sensation of pain.',
            zh: '细胞体在脊髓里的短神经元。它从感觉神经元接过脉冲，再传给运动神经元。脉冲就在这里折返——反射从不去大脑，这正是它能跑赢痛觉的原因。',
          },
          stop: 3,
        },
        {
          id: 'motor-neurone',
          name: { en: 'motor neurone', zh: '运动神经元' },
          description: {
            en: 'Carries the impulse from the central nervous system out to the effector. Its axon runs in a peripheral nerve and ends at a muscle (or, for some reflexes, a gland).',
            zh: '把脉冲从中枢神经系统带到效应器。它的轴突走行在外周神经里，终止于肌肉（或在某些反射中是腺体）。',
          },
          stop: 4,
        },
        {
          id: 'effector',
          name: { en: 'effector (muscle)', zh: '效应器（肌肉）' },
          description: {
            en: 'The muscle that responds to the impulse by contracting. In this example it is the bicep — contracting it bends the arm and pulls the hand off the hot plate. The whole reflex, from stimulus to response, takes a small fraction of a second.',
            zh: '对脉冲作出反应而收缩的肌肉。例子里是肱二头肌——收缩时弯曲手臂把手拉离热盘。整个反射从刺激到反应，只需不到一秒。',
          },
          stop: 5,
        },
        {
          id: 'spinal-cord',
          name: { en: 'spinal cord', zh: '脊髓' },
          description: {
            en: 'Part of the central nervous system. The relay neurone lives inside it, which is why the reflex arc turns round here and not in the brain. The brain is informed a moment later — the conscious "ouch!" is much slower than the hand withdrawal.',
            zh: '中枢神经系统的一部分。中间神经元就在它里面，所以反射在这里折返，而不去大脑。大脑晚一点才收到信息——有意识的"哎哟"比手缩回来慢得多。',
          },
        },
      ],
    },

    // 1b) The motor neurone in section — G8 Figure B9.01. One neurone,
    //     six clickable parts: cell body, nucleus, dendrites, axon,
    //     myelin sheath, axon terminals. Drawn inline in SVG so the
    //     project has no image-file dependency. The diagram is the
    //     standard "dendrites fanning out on the left, cell body,
    //     long axon with myelin segments, terminals on the right" —
    //     the same shape the textbook draws on Figure B9.01.
    {
      type: 'neurone-structure',
      id: 'neurone-structure',
      title: {
        en: 'A motor neurone, in section',
        zh: '运动神经元，剖面',
      },
      hint: {
        en: 'Click any of the six regions of the neurone to read what is there and what it does. The textbook Figure B9.01 is the same drawing — just labelled.',
        zh: '点击神经元的任一区域，查看那里是什么、做什么。这是讲义图 B9.01 的同款——只是标了名。',
      },
      viewBox: { width: 400, height: 200 },
      parts: [
        {
          id: 'cell-body',
          name: { en: 'cell body', zh: '胞体' },
          description: {
            en: 'The central bulge of the neurone. It contains the nucleus and most of the cell\'s machinery. All the dendrites and the axon grow out of the cell body. In a motor neurone the cell body sits inside the spinal cord, with the long axon reaching out to a muscle.',
            zh: '神经元中央的膨大。它装着细胞核和细胞大部分的"机器"。所有树突和轴突都从这里长出。运动神经元的胞体在脊髓内，而那条长的轴突则一路伸到肌肉。',
          },
          hotspot: { type: 'ellipse', cx: 110, cy: 105, rx: 45, ry: 38 },
        },
        {
          id: 'nucleus',
          name: { en: 'nucleus', zh: '细胞核' },
          description: {
            en: 'The control centre of the cell, sitting inside the cell body. It carries the DNA that codes for every protein the neurone needs to build and to maintain itself — including the ion pumps that keep the membrane ready to fire an electrical impulse.',
            zh: '细胞的控制中心，位于胞体内。它装着编码神经元所需全部蛋白质的 DNA——包括维持膜电位、准备放电所需的离子泵。',
          },
          hotspot: { type: 'circle', cx: 105, cy: 108, r: 16 },
        },
        {
          id: 'dendrites',
          name: { en: 'dendrites', zh: '树突' },
          description: {
            en: 'The short, branched fibres coming out of the cell body on the left. They pick up electrical signals from neighbouring neurones and pass them inwards to the cell body. A single motor neurone can have hundreds of dendrites — what makes a cell body look "spidery" under a microscope.',
            zh: '从胞体左端伸出的短而分支的纤维。它们从邻近的神经元接收电信号，并把它向内传到胞体。一个运动神经元可以有数百根树突——这正是胞体在显微镜下看起来"多刺"的原因。',
          },
          hotspot: { type: 'rect', x: 0, y: 10, width: 75, height: 180 },
        },
        {
          id: 'axon',
          name: { en: 'axon', zh: '轴突' },
          description: {
            en: 'The single long fibre stretching out to the right. In a motor neurone the axon can be more than a metre long — the cell body sits in the spinal cord, the tip of the axon reaches a muscle in the foot. The signal travels along the axon as an electrical impulse, much faster than any chemical signal could.',
            zh: '向右伸出的那一条长纤维。在运动神经元中，轴突长度可超过一米——胞体在脊髓里，轴突末端却一直伸到脚上的肌肉。信号以电脉冲的形式沿轴突传导，比任何化学信号都快。',
          },
          hotspot: { type: 'rect', x: 165, y: 90, width: 170, height: 20 },
        },
        {
          id: 'myelin-sheath',
          name: { en: 'myelin sheath', zh: '髓鞘' },
          description: {
            en: 'The five oval segments wrapping the axon. They are made of fat (lipid), laid down by supporting cells called Schwann cells, and they act as electrical insulation. The impulse "jumps" from one gap between segments (Node of Ranvier) to the next, which is much faster than travelling the whole length smoothly. Damage to the myelin sheath is what makes multiple sclerosis slow down nerve signals.',
            zh: '包裹轴突的 5 个椭圆形节段。它们由支持细胞（施旺细胞）制造的脂肪（脂质）构成，作用是电绝缘。脉冲在节段间的空隙（郎飞结）之间"跳跃"，比沿全长平稳传导要快得多。髓鞘受损是导致多发性硬化症神经信号变慢的原因。',
          },
          hotspot: { type: 'rect', x: 175, y: 88, width: 150, height: 24 },
        },
        {
          id: 'axon-terminals',
          name: { en: 'axon terminals', zh: '轴突末梢' },
          description: {
            en: 'The spray of fine branches at the right-hand end of the axon. Each terminal sits close to the next cell (a muscle fibre, for a motor neurone) and holds tiny vesicles full of neurotransmitter. When the impulse arrives, the vesicles release their contents into the gap, and the next cell either fires or relaxes.',
            zh: '轴突右端的细分支丛。每一根末梢都紧贴着下一个细胞（对运动神经元来说是肌纤维），里面装满装着神经递质的小泡。脉冲到达时，小泡把内容物释放到缝隙中，下一个细胞或被激活或被抑制。',
          },
          hotspot: { type: 'rect', x: 320, y: 60, width: 80, height: 80 },
        },
      ],
    },

    // 1c) The three types of neurone side by side — G8 Figure B9.05.
    //     Sensory / relay / motor, each with its own distinguishing
    //     feature highlighted. The textbook draws the three in a row
    //     so the student can compare them; we do the same, with the
    //     long fibre of the selected one turning teal.
    {
      type: 'three-neurones',
      id: 'three-neurones',
      title: {
        en: 'Sensory, relay, motor — the same family, three different jobs',
        zh: '感觉、中间、运动——同一家族，三种不同的活',
      },
      hint: {
        en: 'Pick a neurone type to see what makes it different. The diagram highlights the long fibre of the selected one — that is the "feature" the rest of the chapter assumes you can name.',
        zh: '选一种神经元查看它的"特长"。图会把所选那条的长纤维高亮成青绿色——这正是本章其余部分假设你能叫出来的那条。',
      },
      neurones: [
        {
          id: 'sensory',
          name: { en: 'sensory neurone', zh: '感觉神经元' },
          distinguishingFeature: {
            en: 'The long fibre is the DENDRITE — it carries the signal from a receptor (in the skin, the eye, the ear) towards the cell body. The cell body sits on a side branch off the main fibre.',
            zh: '那条长纤维是**树突**——它把信号从感受器（皮肤、眼睛、耳朵）传向胞体。胞体位于主纤维的一个侧支上。',
          },
          description: {
            en: 'A sensory neurone has its cell body on a side branch off the main fibre, with the long fibre being the dendrite (receptor → cell body) and a short fibre being the axon (cell body → spinal cord). The textbook\'s classic example: touch something hot, and the long dendrite carries the impulse from your fingertip up your arm to the spinal cord.',
            zh: '感觉神经元的胞体在主纤维的侧支上；长的是树突（感受器→胞体），短的是轴突（胞体→脊髓）。讲义的经典例子：碰到烫的东西，那条长的树突就把脉冲从指尖沿手臂一路送到脊髓。',
          },
        },
        {
          id: 'relay',
          name: { en: 'relay neurone', zh: '中间神经元' },
          distinguishingFeature: {
            en: 'Both fibres are SHORT — the cell body sits right in the middle. Its only job is to connect one neurone to the next, so it does not need to be long.',
            zh: '两条纤维都**很短**——胞体就在正中间。它唯一的工作就是把一条神经元和另一条连接起来，所以根本不需要长。',
          },
          description: {
            en: 'A relay neurone is a short neurone whose cell body sits in the central nervous system. It receives an impulse from a sensory or another relay neurone and passes it on to a motor or another relay neurone. The cell body is right in the middle of the line, and the two fibres go in opposite directions. Most of the brain and spinal cord is made of relay neurones.',
            zh: '中间神经元是一条短神经元，胞体在中枢神经系统内。它从感觉或另一条中间神经元接收脉冲，再传给运动或另一条中间神经元。胞体正好在中间，两条纤维朝相反方向延伸。大脑和脊髓大部分由中间神经元组成。',
          },
        },
        {
          id: 'motor',
          name: { en: 'motor neurone', zh: '运动神经元' },
          distinguishingFeature: {
            en: 'The long fibre is the AXON — it carries the signal from the cell body in the central nervous system out to a muscle (or a gland). The cell body sits at the start of the axon, with short dendrites branching in.',
            zh: '那条长纤维是**轴突**——它把信号从中枢神经系统内的胞体一直送到肌肉（或腺体）。胞体就在轴突的起点，几根短的树突从这里伸入。',
          },
          description: {
            en: 'A motor neurone carries impulses OUT of the central nervous system to an effector (a muscle or a gland). The cell body sits at the start of the long axon, with short dendrites branching in from the relay neurones that feed it. The axon can be more than a metre long, ending in axon terminals that release neurotransmitter onto the muscle fibre.',
            zh: '运动神经元把脉冲从中枢神经系统**向外**传到效应器（肌肉或腺体）。胞体在长轴突的起点，几根短的树突从这里接收来自中间神经元的输入。轴突可超过一米长，末端是释放神经递质到肌纤维的轴突末梢。',
          },
        },
      ],
    },

    // 2) The eye in section — G8 Figure B9.06 with 12 hotspots. "Follow
    //    the light" mode walks cornea → pupil → lens → retina → optic nerve.
    {
      type: 'eye-anatomy',
      id: 'eye',
      title: { en: 'The eye, in section', zh: '眼的剖面' },
      hint: {
        en: 'Click any part of the eye. "Follow the light" traces the path from cornea to optic nerve.',
        zh: '点击眼的任一部分。点"跟着光走"会从角膜一路追到视神经。',
      },
      initialPart: 'cornea',
      parts: [
        {
          id: 'cornea',
          name: { en: 'cornea', zh: '角膜' },
          description: {
            en: 'The transparent front of the eye. It does most of the focusing — about two-thirds of the eye\'s total refractive power — before the light has even reached the lens. Damaged corneas can be replaced by transplant; this is one of the most successful transplant operations.',
            zh: '眼前端的透明部分。在光线到达晶状体之前，它就完成了眼大约三分之二的屈光。角膜受损可以通过移植替换——这是最成功的移植手术之一。',
          },
          stop: 1,
        },
        {
          id: 'aqueous-humour',
          name: { en: 'aqueous humour', zh: '房水' },
          description: {
            en: 'A watery fluid between the cornea and the lens. It keeps the front of the eye inflated and carries nutrients to the lens and cornea, which have no blood supply (blood would block the light).',
            zh: '角膜与晶状体之间的水样液体。它维持眼前部充盈，并为没有血管的角膜和晶状体提供养分——血管会挡光。',
          },
          stop: 2,
        },
        {
          id: 'iris',
          name: { en: 'iris', zh: '虹膜' },
          description: {
            en: 'The coloured ring of muscle that controls how much light enters the eye. It has two sets of muscle fibres — circular (which constrict the pupil) and radial (which dilate it) — and the two are antagonistic.',
            zh: '控制进光量的有色肌肉环。它有两组肌纤维——环行的（使瞳孔缩小）和辐射状的（使瞳孔放大）——两者是拮抗的。',
          },
        },
        {
          id: 'pupil',
          name: { en: 'pupil', zh: '瞳孔' },
          description: {
            en: 'The hole in the middle of the iris. It is a hole, not a structure — it cannot itself contract. Its size is set by the iris muscles. In bright light it can be 2 mm across; in the dark, 8 mm. That is a sixteen-fold change in the *area* of the hole.',
            zh: '虹膜中央的孔。它本身不是一个结构——它自己不会收缩。它的大小由虹膜肌肉决定。强光下约 2 mm，黑暗中约 8 mm。这是孔*面积*的 16 倍变化。',
          },
          stop: 3,
        },
        {
          id: 'lens',
          name: { en: 'lens', zh: '晶状体' },
          description: {
            en: 'A flexible, biconvex structure that fine-tunes the focus. The ciliary muscles change its shape — fatter for close objects, thinner for distant ones. With age, the lens stiffens and the near point moves out: that is why older people need reading glasses.',
            zh: '柔软的凸透镜结构，做精细调焦。睫状肌改变它的形状——看近物时变厚，看远物时变薄。随年龄增长，晶状体变硬，近点后退——这就是老年人需要老花镜的原因。',
          },
          stop: 4,
        },
        {
          id: 'ciliary-muscle',
          name: { en: 'ciliary muscle', zh: '睫状肌' },
          description: {
            en: 'A ring of muscle that changes the shape of the lens. When it contracts, the ring gets smaller, the suspensory ligaments slacken, and the lens fattens under its own elasticity. When it relaxes, the ring widens, the ligaments pull the lens thin.',
            zh: '改变晶状体形状的环形肌肉。收缩时环变小，悬韧带松弛，晶状体在自身弹性下变厚；舒张时环变大，悬韧带把晶状体拉薄。',
          },
        },
        {
          id: 'suspensory-ligament',
          name: { en: 'suspensory ligament', zh: '悬韧带' },
          description: {
            en: 'Holds the lens in place and transmits the pull of the ciliary muscle. When the ciliary muscle contracts, the ligaments slacken and the lens fattens; when it relaxes, the ligaments pull the lens thin.',
            zh: '把晶状体固定在位，并把睫状肌的拉力传过去。睫状肌收缩时韧带松弛、晶状体变厚；睫状肌舒张时韧带把晶状体拉薄。',
          },
        },
        {
          id: 'vitreous-humour',
          name: { en: 'vitreous humour', zh: '玻璃体' },
          description: {
            en: 'A clear jelly that fills the main chamber of the eye and holds the retina against the back wall. Without it, the eye would collapse. The light passes through it on its way to the retina.',
            zh: '填充主眼室的透明胶状物，把视网膜压向眼球后壁。没有它眼就会塌陷。光穿过它到达视网膜。',
          },
          stop: 5,
        },
        {
          id: 'retina',
          name: { en: 'retina', zh: '视网膜' },
          description: {
            en: 'The light-sensitive layer at the back of the eye. It contains the receptor cells — rods (for dim light, no colour) and cones (for colour, need bright light). The image is upside down and back to front here; the brain flips it.',
            zh: '眼球后壁的光敏层。含感受器细胞——视杆细胞（弱光下工作，无色觉）和视锥细胞（有色觉，需强光）。像在视网膜上是倒置的——是大脑把它翻正的。',
          },
          stop: 6,
        },
        {
          id: 'fovea',
          name: { en: 'fovea', zh: '中央凹' },
          description: {
            en: 'The small spot on the retina directly opposite the pupil. Packed with cones and almost free of rods. Gives the sharpest, most colourful vision — which is why you turn your head to look at something rather than just moving your eyes.',
            zh: '视网膜上正对瞳孔的小区域。密布视锥细胞，几乎没有视杆细胞。提供最清晰、色彩最丰富的视觉——所以你要看某物时会把头转过去，而不是只用眼睛。',
          },
        },
        {
          id: 'blind-spot',
          name: { en: 'blind spot', zh: '盲点' },
          description: {
            en: 'The place where the optic nerve leaves the eye. There are no receptor cells here, so any light that falls on it produces no signal. You do not notice the gap because the brain fills it in from the other eye.',
            zh: '视神经离开眼球的地方。这里没有感受器细胞，所以光落上去不产生信号。你感觉不到这个"洞"，因为大脑会用另一只眼的信息把它填上。',
          },
        },
        {
          id: 'optic-nerve',
          name: { en: 'optic nerve', zh: '视神经' },
          description: {
            en: 'Carries the impulses from the retina to the visual cortex at the back of the brain. The optic nerves from the two eyes meet at the optic chiasma, where fibres from the left half of each retina cross to the right side of the brain, and vice versa.',
            zh: '把脉冲从视网膜送到大脑后部的视觉皮层。两眼的视神经在视交叉处汇合——每只眼视网膜左半的纤维交叉到大脑右侧，右半交叉到左侧。',
          },
          stop: 7,
        },
        // ---- 2026-08-18 Chapter 4 PDF gap-fill ----
        // Section 4.3 of the textbook spends a whole paragraph on how the
        // eye is protected from dirt and bacteria: orbit, conjunctiva,
        // tear glands, eyelids. These parts are NOT inside the section
        // through the eye (Figure B9.06), so they have no figure hotspots
        // — they show up only in the "Protect the eye" mode of the side
        // panel.
        {
          id: 'orbit',
          name: { en: 'orbit (bony socket)', zh: '眼眶（骨性窝）' },
          description: {
            en: 'The cup of bone in the skull that the eyeball sits in. Everything except the very front of the eye is surrounded by bone, so a blow to the side of the head cannot reach the retina or the lens. The orbit also provides the surface the eye muscles anchor to.',
            zh: '颅骨里装着眼球的骨杯。除了最前端，眼球其余部分都被骨头包着——侧面的击打够不到视网膜或晶状体。眼眶还为眼外肌提供锚点。',
          },
        },
        {
          id: 'conjunctiva',
          name: { en: 'conjunctiva', zh: '结膜' },
          description: {
            en: 'A thin, transparent membrane that covers the white of the eye (sclera) and the inside of the eyelids. It is the surface dirt and bacteria land on, and it is the surface the tear fluid washes across when you blink. When it gets inflamed — by dust, by infection, by allergy — the eye goes pink. That is "conjunctivitis", named after this membrane.',
            zh: '覆盖眼白（巩膜）和眼睑内面的薄而透明的膜。灰尘和细菌就落在这层膜上；眨眼时，泪液也是从这层膜上洗过去的。一旦它发炎（灰尘、感染、过敏），眼睛就发红——所谓的"结膜炎"就是以这层膜命名的。',
          },
        },
        {
          id: 'tear-gland',
          name: { en: 'tear gland (with lysozyme)', zh: '泪腺（含溶菌酶）' },
          description: {
            en: 'A small gland under the upper eyelid that secretes the watery fluid spread across the conjunctiva when you blink. The fluid carries dissolved oxygen and nutrients to the cornea (which has no blood supply, because blood vessels would block the light). It also contains lysozyme, an enzyme that breaks down the cell walls of bacteria — the eye is one of the few parts of the body exposed directly to the air, so it defends itself chemically rather than immunologically.',
            zh: '上眼睑下方的小腺体，分泌眨眼时铺展在结膜上的水样液体。这种液体给没有血管的角膜带去溶解氧和营养（血管会挡光，所以角膜不能有血管）。液体里还含有溶菌酶——一种能破坏细菌细胞壁的酶。眼睛是身体少数直接暴露在空气中的部位之一，所以它在表面用化学方式而不是免疫方式防御。',
          },
        },
        {
          id: 'eyelids',
          name: { en: 'eyelids, lashes and brows', zh: '眼睑、睫毛、眉毛' },
          description: {
            en: 'Three layers of mechanical defence outside the conjunctiva. Eyelids close reflexively when something approaches the eye, and the blink that happens every few seconds spreads tear fluid evenly. Eyelashes at the lid edge are angled outwards so large debris is deflected before it can land on the cornea. Eyebrows channel sweat and rain away from the eye so the fluid does not run straight in.',
            zh: '结膜之外的三层物理防线。有东西逼近时，眼睑会反射性闭合；每隔几秒一次的眨眼把泪液均匀铺开。睑缘的睫毛向外翘起，大块碎屑在落到角膜之前就被弹开。眉毛把汗和雨水从眼睛方向引开，免得液体直接流入眼内。',
          },
        },
      ],
    },

    // 3D brain + 3D eyeball. The 2D figures show the structures in
    // cross-section; the 3D models show their actual 3D shape, which
    // is the only way to grasp "frontal lobe at the front, occipital
    // lobe at the back" as actual positions rather than abstract
    // labels.
    {
      type: 'organ-anatomy',
      id: 'brain-3d',
      title: { en: 'The brain, in 3D', zh: '大脑 3D 解剖' },
      hint: {
        en: 'Drag to rotate. The frontal lobe is at the front, the occipital lobe at the back, the temporal lobes on the sides, and the cerebellum tucked under the back.',
        zh: '拖动旋转。额叶在前，枕叶在后，颞叶在两侧，小脑蜷在后部下方。',
      },
      intro: {
        en: 'The brain is the body\'s command centre — billions of neurons integrating sensation, memory, emotion and movement.',
        zh: '大脑是人体的指挥中心——数十亿神经元整合感觉、记忆、情绪与运动。',
      },
      organ: 'brain',
      system: { en: 'Nervous system', zh: '神经系统' },
      initialPart: 'frontal',
      parts: [
        {
          id: 'frontal',
          name: { en: 'frontal lobe', zh: '额叶' },
          description: {
            en: 'At the front of the brain, behind the forehead. Seat of planning, decision-making, voluntary movement, and personality.',
            zh: '位于大脑前部，额头之后。是计划、决策、随意运动与人格的所在。',
          },
          position3d: [-0.7, 0.65, 0.8],
        },
        {
          id: 'parietal',
          name: { en: 'parietal lobe', zh: '顶叶' },
          description: {
            en: 'At the top of the brain. Seat of body sense — touch, temperature, pain, and awareness of limb position.',
            zh: '位于大脑顶部。是身体感觉的中枢——触觉、温度、疼痛与肢体位置感知。',
          },
          position3d: [0.15, 1.1, 0.65],
        },
        {
          id: 'temporal',
          name: { en: 'temporal lobe', zh: '颞叶' },
          description: {
            en: 'On the side of the brain, behind the temple. Seat of hearing and of forming new memories.',
            zh: '位于大脑侧部，太阳穴之后。是听觉与新记忆形成的中枢。',
          },
          position3d: [0.75, -0.1, 0.82],
        },
        {
          id: 'occipital',
          name: { en: 'occipital lobe', zh: '枕叶' },
          description: {
            en: 'At the back of the brain. Primary visual cortex — the first place that signals from the eyes are interpreted as shapes, colours, and movement.',
            zh: '位于大脑后部。是初级视觉皮层——来自眼睛的信号最早在这里被解读为形状、颜色与运动。',
          },
          position3d: [0.0, -0.95, 0.55],
        },
        {
          id: 'cerebellum',
          name: { en: 'cerebellum', zh: '小脑' },
          description: {
            en: 'Under the back of the brain. Coordinates balance, posture, and the fine timing of movement.',
            zh: '位于大脑后部下方。协调平衡、姿势与动作的精确计时。',
          },
          position3d: [0.72, -0.9, 0.55],
        },
      ],
    },
    {
      type: 'organ-anatomy',
      id: 'eyeball-3d',
      title: { en: 'The eye, in 3D', zh: '眼睛 3D 解剖' },
      hint: {
        en: 'Drag to rotate. The cornea and lens bend the light, the iris controls how much enters, the retina at the back converts it to nerve signals, and the optic nerve carries those signals to the brain.',
        zh: '拖动旋转。角膜和晶状体屈光，虹膜控制进光量，底部视网膜把光转为神经信号，视神经把信号送入大脑。',
      },
      intro: {
        en: 'The eye is a precision sensory organ — a living camera that converts focused light into neural signals interpreted as vision.',
        zh: '眼睛是一个精密的感觉器官——一台活的相机，把聚焦的光转化为神经信号，解读为视觉。',
      },
      organ: 'eyeball',
      system: { en: 'Sensory system', zh: '感觉系统' },
      initialPart: 'cornea',
      parts: [
        {
          id: 'cornea',
          name: { en: 'cornea', zh: '角膜' },
          description: {
            en: 'The clear dome at the front. Does most of the bending of light that focuses an image. Has no blood vessels.',
            zh: '最前端的透明圆顶。负责把光线会聚成像——这是屈光的大部分工作。没有血管。',
          },
          position3d: [-0.94, 0.05, 1.47],
        },
        {
          id: 'iris',
          name: { en: 'iris', zh: '虹膜' },
          description: {
            en: 'The coloured ring. Its muscles change the pupil size — wide in dim light, narrow in bright light.',
            zh: '彩色环。其肌肉改变瞳孔大小——暗处放大、亮处缩小。',
          },
          position3d: [-1.22, -0.53, 1.15],
        },
        {
          id: 'lens',
          name: { en: 'lens', zh: '晶状体' },
          description: {
            en: 'A flexible, transparent disc behind the iris. Tiny muscles change its shape to focus light from near or far objects.',
            zh: '虹膜后方柔韧透明的盘状结构。睫状肌改变其形状，把远近物体的光聚焦。',
          },
          position3d: [-0.5, -0.5, 1.1],
        },
        {
          id: 'retina',
          name: { en: 'retina', zh: '视网膜' },
          description: {
            en: 'The light-sensitive layer at the back. Contains the photoreceptors — cones for colour and detail, rods for dim light.',
            zh: '眼球后部感光的一层。包含感光细胞——锥体感色与细节，杆体感暗光。',
          },
          position3d: [1.0, 0.2, 0.0],
        },
        {
          id: 'optic-nerve',
          name: { en: 'optic nerve', zh: '视神经' },
          description: {
            en: 'A bundle of about a million nerve fibres leaving the back of the eye. Carries the visual signal to the visual cortex.',
            zh: '眼球后部约一百万根神经纤维组成的束，把视觉信号送到视觉皮层。',
          },
          position3d: [1.61, -0.18, 0.54],
        },
      ],
    },

    // The pupil reflex — a one-shot reflex arc that lives in the eye
    // itself, no brain involvement. The textbook mentions it indirectly
    // (B9.04 notes that adrenaline widens the pupil) but does not spell
    // out the actual reflex pathway. The site has no dedicated
    // explainer, so we add one here, right next to the eye anatomy.
    // (Negative feedback: the iris adjusts how much light enters.)
  {
    type: 'concept-explainer',
    id: 'pupil-reflex',
    title: { en: 'The pupil reflex — the eye adjusting its own aperture', zh: '瞳孔反射——眼睛自己调光圈' },
    hint: {
      en: 'The iris is a ring of muscle that changes the size of the pupil without you thinking about it. Bright light → pupil shrinks. Dim light → pupil widens. It is one of the few reflex arcs that has nothing to do with the spinal cord or the brain.',
      zh: '虹膜是一圈肌肉，在你不知不觉中改变瞳孔大小。强光下瞳孔缩小，暗光下瞳孔放大。它是少有的不经过脊髓或大脑的反射弧之一。',
    },
    blocks: [
      {
        id: 'reflex',
        title: { en: 'A reflex arc that lives entirely in the brainstem', zh: '整条反射弧都在脑干里' },
        hook: {
          en: 'Walk out of a dark cinema into bright sunlight and your eyes do not blow out with white — they tighten within a second. Walk back inside and they dilate again. None of this is voluntary. The iris is doing the equivalent of an automatic camera aperture, and the wiring is one of the fastest reflexes in the body.',
          zh: '从黑漆漆的电影院走到阳光刺眼的走廊，眼睛不会瞬间被白光打瞎——一秒钟内瞳孔就收紧了。再走回影院，瞳孔又放大。这一切都不是你主动控制的。虹膜相当于一台相机的自动光圈，整套电路是人体最快的反射之一。',
        },
        mechanism: {
          en: 'Bright light entering the eye hits the retina. A small region of the midbrain called the pretectal area senses the light level via the optic nerve. It sends signals to the sphincter pupillae muscle in the iris, which contracts and shrinks the pupil. The round trip — light in, pupil smaller — happens in about 0.3 seconds. In dim light the same pathway runs the other way, activating the dilator pupillae muscle instead, and the pupil widens. Both branches use the same set of nerve cells, so the same wiring handles both directions.',
          zh: '强光进入眼睛，照射到视网膜。中脑一个叫"顶盖前区"的小区域通过视神经感知亮度，再把信号发给虹膜里的瞳孔括约肌，让它收缩、瞳孔缩小。从光进入，到瞳孔变小，整个回路大约 0.3 秒。暗光下同一通路反向运行，激活瞳孔开大肌，瞳孔放大。两路用同一组神经元，所以同一套电路同时负责放大和缩小。',
        },
        whyItMatters: {
          en: 'This is one of the few reflex arcs the doctor checks with a penlight. A pupil that does not constrict to light is a sign of serious brainstem damage — a key test in an emergency room. Adrenaline overrides the reflex: in a "fight-or-flight" moment the pupil widens regardless of light, because seeing more of the surroundings is more useful than seeing sharply. The two systems (reflex and hormonal) work at different speeds and on different timescales.',
          zh: '这是医生用小手电检查的少数反射之一。瞳孔对光不收缩，是脑干严重受损的信号——急诊室里的关键检查项目。肾上腺素会"覆盖"这个反射：战或逃的瞬间，无论光线如何瞳孔都放大，因为看清更多周围比看清细节更重要。两套系统（反射和激素）速度不同、作用时间尺度也不同。',
        },
        teacherStory: {
          en: 'A quick in-class check: shine a phone flashlight into one eye and watch the other pupil constrict too — the consensual light reflex. Both pupils are wired to the same pretectal area, so shining light in one eye sends the constrict signal to both. This is why doctors check both pupils: a difference between them is a clinical sign of trouble.',
          zh: '一个快速的课堂检查：把手机闪光灯照进一只眼睛，看另一只瞳孔也同时收缩——这就是"同感性对光反射"。两只瞳孔都连到同一个顶盖前区，所以照一只眼睛时收缩信号会同时传给两只。这也是医生为什么要同时检查两只瞳孔——两侧反应不一致就是临床异常信号。',
        },
      },
    ],
  },


  // Why your eyes play tricks on you — visual illusions. This is
  // supplementary material (not in the textbook) but the user asked
  // for it explicitly: classic illusion images plus 2-3 interactive
  // experiments with explanations of the underlying principle.
  {
    type: 'visual-illusions',
    id: 'visual-illusions',
    title: { en: 'Why your eyes play tricks on you', zh: '为什么眼睛会骗你' },
    hint: {
      en: 'Five classic visual illusions and three hands-on experiments. None of them are about bad eyesight — they reveal how the visual cortex fills in, makes assumptions, and shortcuts the work of "seeing".',
      zh: '五个经典视觉错觉加三个可动手的小实验。都不是眼睛有问题——它们揭示了视觉皮层在"填补"、在"假设"、在"走捷径"地看见世界。',
    },
    illusions: [
      // 1. Hermann grid — gray dots at the intersections of black bars
      {
        id: 'hermann-grid',
        title: { en: 'Hermann grid — phantom dots you cannot unsee', zh: '赫尔曼栅格——你无法不看见的幽灵黑点' },
        image: { en: '/figures/illusions/hermann-grid.svg', zh: '/figures/illusions/hermann-grid.svg' },
        whatYouSee: {
          en: 'A grid of thick black bars on a white background. Grey blobs appear at the intersections — but only when you are NOT looking directly at them. The instant you fixate on one, it disappears.',
          zh: '白底上的黑色粗线栅格。在每个交叉点都能看到灰色斑点——但只有在你没直接盯着它的时候。你一盯，斑点就消失。',
        },
        why: {
          en: 'The phenomenon is called "lateral inhibition". Each retinal ganglion cell reports how much light is at the centre of its receptive field versus the surrounding ring. At a black-bar intersection, the surrounding ring is mostly black, so the cell reports a smaller-than-it-should signal. At a non-intersection (a black bar between two white gaps), the surrounding ring has a lot of white, so the cell reports a larger signal. The brain subtracts: intersection cells look DIMMER than non-intersection cells. The illusion is your brain doing its job, not failing at it.',
          zh: '这叫"侧抑制"。每个视网膜神经节细胞都报告自己感受野中心 vs 周围一圈的光强差。在黑色交叉点，周围一圈大半是黑的，所以细胞报告的信号偏小；在普通黑条位置（两头都是白），周围一圈有不少白，信号偏大。大脑做减法：交叉点的细胞比非交叉点的看起来更暗。错觉是大脑在好好工作，而不是出了错。',
        },
      },
      // 2. Müller-Lyer — two lines, same length, look different
      {
        id: 'muller-lyer',
        title: { en: 'Müller-Lyer — same length, different arrows', zh: '缪勒-莱尔错觉——等长的两条线' },
        image: { en: '/figures/illusions/muller-lyer.svg', zh: '/figures/illusions/muller-lyer.svg' },
        whatYouSee: {
          en: 'Two vertical lines of identical length. The one with inward-pointing arrows (><) looks shorter; the one with outward-pointing arrows (<>) looks longer.',
          zh: '两条等长的竖线。箭头朝内（><）的看起来短，箭头朝外（<>）的看起来长。',
        },
        why: {
          en: 'The arrows are depth cues. The inward arrows make the line look like the inside corner of a room (concave, far away); the outward arrows make it look like the outside corner of a building (convex, close). The brain applies size constancy — distant things must be bigger on the retina to be the same size in the world — so the "far" line is judged longer. The illusion is automatic, cross-cultural, and hard to suppress even with a ruler in your hand.',
          zh: '箭头是深度线索。箭头朝内看上去像房间的内墙角（凹面，远处），箭头朝外像建筑的外墙角（凸面，近处）。大脑用"大小恒常性"——远处的东西要在视网膜上更大，才算"实际一样大"——所以"远"的那条被判得更长。这个错觉自动出现，跨文化一致，哪怕你手里拿着尺子也压不住。',
        },
      },
      // 3. Ponzo — two equal circles look different sizes
      {
        id: 'ponzo',
        title: { en: 'Ponzo — equal circles, unequal sizes', zh: '庞氏错觉——两个一样大的圆' },
        image: { en: '/figures/illusions/ponzo.svg', zh: '/figures/illusions/ponzo.svg' },
        whatYouSee: {
          en: 'Two identical circles sitting between two converging lines. The upper circle looks bigger than the lower one.',
          zh: '两个完全相同的圆放在两条向远处汇聚的线之间。上面的圆看上去比下面的大。',
        },
        why: {
          en: 'Converging lines are a strong depth cue for "the upper one is further away". Size constancy again: if two retinal images are the same size, the brain decides the "further" one is bigger in the world. The illusion goes away instantly if you remove the converging lines.',
          zh: '汇聚的线条是一个很强的深度线索——"上面的圆更远"。又是大小恒常性在起作用：两个视网膜上的像一样大，大脑就判断"更远"的那个在世界里更大。把汇聚线去掉，错觉立刻消失。',
        },
      },
      // 4. Ebbinghaus — two equal circles, different surround
      {
        id: 'ebbinghaus',
        title: { en: 'Ebbinghaus — same circle, smaller-feeling inside big circles', zh: '艾宾浩斯错觉——同一个圆，周围都是大圆时显得小' },
        image: { en: '/figures/illusions/ebbinghaus.svg', zh: '/figures/illusions/ebbinghaus.svg' },
        whatYouSee: {
          en: 'Two identical orange circles. The one surrounded by big purple circles looks smaller than the one surrounded by small purple circles.',
          zh: '两个完全相同的橙色圆。周围都是大紫色圆的，看起来比周围都是小紫色圆的小。',
        },
        why: {
          en: 'Pure relative-size judgment. The brain does not measure "absolute size" of a circle, it compares to its neighbours. Big neighbours make the centre look small; small neighbours make it look big. This is the same machinery that lets you tell whether a friend in the distance is an adult or a child — you compare to the lamp post next to them.',
          zh: '纯粹的相对大小判断。大脑不是量"绝对大小"，而是跟邻居比。邻居大，中心就显得小；邻居小，中心就显得大。同一套机制让你能判断远处站着的那个朋友是大人还是小孩——你拿他旁边的路灯当参照。',
        },
      },
      // 5. Color afterimage — stare and see the opposite
      {
        id: 'afterimage',
        title: { en: 'Afterimage — stare, then look at white', zh: '后像——盯住看，然后看白色' },
        image: { en: '/figures/illusions/afterimage.svg', zh: '/figures/illusions/afterimage.svg' },
        whatYouSee: {
          en: 'A solid red square. Stare at the dot in its centre for 30 seconds without moving your eyes, then look at a blank white wall. A cyan-blue square of the same size floats in front of you for a few seconds.',
          zh: '一个纯红色的方块。盯住中心黑点 30 秒眼睛别动，然后看一面白墙。一个同尺寸的青蓝色方块会在你眼前漂浮几秒钟。',
        },
        why: {
          en: 'The retina has three types of colour photoreceptor — red, green, and blue cones. Staring at a red field tires out the red cones, so they temporarily stop firing. When you then look at a white wall, the wall sends red, green AND blue signals — but the red signal is muted. The brain compares: red−0, green−100, blue−100. The leftover green+blue reads as cyan. The afterimage fades as the red cones recover, in a few seconds.',
          zh: '视网膜有三种色觉感光细胞——红、绿、蓝锥体细胞。盯着红色看会让红锥体疲劳，短暂停止工作。这时再看白墙，白墙发来红、绿、蓝三种信号，但红的减弱了。大脑做减法：红−0，绿−100，蓝−100。剩下的绿+蓝就读作青蓝。几秒钟后红锥体恢复，后像消失。',
        },
      },
    ],
    experiments: [
      // 1. Blind spot test
      {
        id: 'blind-spot',
        title: { en: 'Experiment 1: Find your blind spot', zh: '实验 1：找你的盲点' },
        instructions: {
          en: 'Close your LEFT eye. With your RIGHT eye, fixate on the ✕ at the left. The dot to the right will disappear when it lands on your blind spot. To find the exact distance, slowly move the page (or your head) towards and away from the screen. The dot will vanish at one specific distance and reappear if you go closer or further.',
          zh: '闭上左眼。用右眼盯住左边的 ✕。右边的圆点会消失——它正好落在你的盲点上。要找到准确距离，慢慢让页面（或你的头）前后移动。在某个特定距离圆点会消失，离屏幕更近或更远时又会重新出现。',
        },
        principle: {
          en: 'Every retina has a small region with no photoreceptors — the place where the optic nerve fibres exit the eyeball on their way to the brain. Light landing there produces no signal at all. We never notice the gap because (a) the corresponding region in the OTHER eye covers it, and (b) the brain fills in the missing spot with whatever pattern surrounds it. Close one eye and the brain can no longer hide it.',
          zh: '每只视网膜都有一小块没有感光细胞的区域——视神经纤维离开眼球走向大脑的那个点。光落在这里根本不产生信号。我们平时注意不到这个洞，因为：(a) 另一只眼的对应区域会补上，(b) 大脑用周围的图案把缺失的点"补全"。闭上一只眼，大脑就藏不住了。',
        },
      },
      // 2. Müller-Lyer interactive length-match
      {
        id: 'muller-lyer-match',
        title: { en: 'Experiment 2: Beat the Müller-Lyer', zh: '实验 2：打败缪勒-莱尔' },
        instructions: {
          en: 'The LEFT line has inward arrows (><) — the fins point AWAY from the shaft at both ends. The RIGHT line is plain (no arrows). The two lines are EXACTLY the same length. Drag the slider to make the right line look the same length as the left — and watch how badly your visual system guesses.',
          zh: '左边线是箭头朝内（><）——两端的鳍向外张开。右边线是**纯线**（无箭头）。两条线**完全等长**。拖动滑块让右边的线和左边一样长——看看你的视觉系统会错得有多离谱。',
        },
        principle: {
          en: 'Even when you know the lines are the same, the arrows push your perception of length up or down by 10-20%. Children under 10 are not yet fooled — the illusion develops as the brain learns to apply size constancy. The point: knowing is not seeing. Cognitive knowledge and visual perception are separate systems, and the visual one usually wins.',
          zh: '即使你明知道两条线一样长，箭头依然能让你的长度判断偏差 10-20%。10 岁以下的孩子还不会被骗——错觉是随着大脑学会应用大小恒常性才出现的。重点是："知道"不等于"看见"。认知知识和视觉感知是两套系统，而视觉那套通常赢。',
        },
      },
      // 3. Afterimage demo
      {
        id: 'afterimage-demo',
        title: { en: 'Experiment 3: Make a coloured afterimage', zh: '实验 3：造一个彩色后像' },
        instructions: {
          en: 'Stare at the dot in the centre of the coloured square for 30 seconds without moving your eyes. When the square turns grey, look at the centre of the grey square. A faint image in the COMPLEMENTARY colour will float on the grey for a few seconds. Red → cyan. Green → magenta. Blue → yellow.',
          zh: '盯住彩色方块中心的黑点 30 秒，眼睛别动。方块变灰时看灰方块的中心。一个淡淡的、**互补色**的图像会在灰色上漂浮几秒钟。红 → 青。绿 → 品红。蓝 → 黄。',
        },
        principle: {
          en: 'Prolonged staring tires out the photoreceptors of one colour (e.g. the red cones for a red image). When the image turns grey, all three cone types are stimulated equally by the white background — but the tired red cones fire less. Your brain subtracts: red − muted red = cyan. The illusion is the visual system reporting the difference, not the absolute signal. Same mechanism as the Hermann grid, just at a different stage of the visual pipeline.',
          zh: '长时间盯着看会让某一种颜色的感光细胞疲劳（红方块就让红锥体疲劳）。图像变灰时，白背景均匀地刺激三种锥体，但疲劳的那一组反应弱。大脑做减法：红−减弱的红=青。和赫尔曼栅格错觉是同一类机制，只是发生在视觉通路的另一个环节。',
        },
      },
      // 4. Invisible gorilla — selective attention, played in the 8/6
      //    G8 class. The student is asked to count the white team's
      //    passes; a dark "gorilla" walks across the scene while they
      //    count. Most people miss the gorilla — the mechanism is the
      //    same as the Hermann grid, but applied to attention rather
      //    than to local contrast.
      {
        id: 'invisible-gorilla',
        title: { en: 'Experiment 4: Beat the invisible gorilla', zh: '实验 4：抓住那只"看不见"的大猩猩' },
        instructions: {
          en: 'Click "Start — count the white team". Two teams of circles will appear, plus a dark shape that walks across the scene. Count only the white circles. After the scene, you will be asked how many passes the white team made. Then the gorilla will be revealed — and the question is whether you saw it the first time.',
          zh: '点"开始——数白队"。屏幕会出现两队圆，外加一个深色形状会走过场景。只数白色圆。场景结束后，题目会问你白队传了几次球。然后大猩猩会被揭示——问题是你第一次有没有看见它。',
        },
        principle: {
          en: 'The Simons & Chabris "invisible gorilla" experiment, 1999. About half of viewers, when asked to count the white team\'s passes, completely miss a person in a gorilla suit walking through the middle of the scene, thumping their chest. Attention is a resource with a narrow bandwidth: what falls outside the current task does not enter conscious perception — even when it is in plain view. This is the same machinery as change blindness, but applied to a single event rather than a difference over time.',
          zh: '1999 年 Simons 与 Chabris 的"看不见的大猩猩"实验。约一半观众在数白队传球时，完全没注意到一个穿大猩猩戏服的人走过场景中央、拍打胸脯。注意力是带宽有限的资源——落在当前任务之外的东西进不了意识，即使它就在视野正中央。这和变化盲是同一套机制，但用在"单个事件"而不是"时间上的差异"上。',
        },
      },
    ],
  },

  // The brain is plastic — the same "100 billion neurons" can route
  // themselves around missing or damaged input. The textbook mentions
  // this only in passing; the classroom story of hemispherectomy and
  // the blind person's enhanced hearing makes it concrete.
  {
    type: 'concept-explainer',
    id: 'brain-compensation',
    title: { en: 'How the brain rewires itself', zh: '大脑是怎么"重新接线"的' },
    hint: {
      en: 'Take away one input to the brain and the brain does not sit idle — it reassigns the freed-up neurons to other jobs. That is why a blind person\'s hearing gets sharper, and that is why someone can live a normal life with half a brain removed.',
      zh: '拿掉大脑的某一路输入，它不会闲着——会把空出来的神经元重新分配到别的工作上。这就是为什么盲人的听觉会变灵敏，也是一个人切掉半个大脑还能正常生活的原因。',
    },
    blocks: [
      {
        id: 'plasticity',
        title: { en: 'Free workers find new jobs', zh: '"失业"的神经元会自己找新活儿干' },
        hook: {
          en: 'A child is born with severe epilepsy. By age seven, surgeons remove the entire left half of their brain. The child recovers. They go to school, learn to read, play sports, finish college. The right hemisphere — normally language, but here everything — takes over the missing half\'s work. This is not miraculous. It is what the brain does when given years and a reason.',
          zh: '一个孩子出生就有严重癫痫。七岁时外科医生切掉了整个左半球。孩子活了下来，读书、运动、上大学。右半球——正常情况只管语言，但这里接管了全部——把左半球的工作全揽了过来。这不是奇迹，是大脑被给足了时间和理由之后会做的事。',
        },
        mechanism: {
          en: 'The brain has roughly 100 billion neurones, and the figure that matters is not the total but the surplus. At any one time, many of those neurones are not doing much — they are available to be recruited. Block a sensory input (blindness, deafness) or remove tissue (hemispherectomy, hemispheric stroke) and the freed-up neurones start responding to other inputs. A blind person\'s visual cortex, for instance, gets pulled into auditory and tactile processing — which is why their hearing and Braille-reading speed can exceed a sighted person\'s.',
          zh: '大脑约有 1000 亿个神经元，关键数字不是总数，而是富余量。任何时刻，其中很多神经元都没有"满负荷"——可以被征用。一旦某个感觉输入被阻断（失明、失聪）或某块组织被切除（半球切除术、半球性中风），被释放出来的神经元就会开始响应别的输入。比如盲人的视觉皮层，会被拉去处理听觉和触觉——这就是为什么他们的听觉和盲文阅读速度能超过视力正常的人。',
        },
        whyItMatters: {
          en: 'Brain plasticity is the single biggest reason stroke patients can recover function. The adult brain is less plastic than a child\'s, but the principle is the same: uninjured tissue near the damage can be coaxed into taking over the lost role. Rehabilitation is, in effect, a course of "re-wiring" — the therapist is teaching undamaged neurones a new job. The window is wider in children, narrower in adults, but it does not close completely.',
          zh: '脑的可塑性是脑卒中患者能恢复功能的最主要原因。成人大脑的可塑性比孩子差，但原理相同：受损区域附近未受伤的组织能被"哄"去接管失去的功能。康复治疗本质上就是"重新接线"的训练——治疗师在教未受损的神经元一个新工作。这个窗口在儿童期更宽，在成年期更窄，但不会完全关上。',
        },
        teacherStory: {
          en: 'Tell a blind person\'s "echolocation" anecdote in class: a few blind people have learned to make mouth clicks and listen to the echoes, navigating by reflected sound. The clicks are not magic — the underlying hearing apparatus is unchanged. What changed is the wiring. With years of practice, the blind person\'s auditory cortex started doing a job that in a sighted person belongs to the visual cortex. Same neurons, different job description.',
          zh: '在课堂上讲一个盲人"回声定位"的真实故事：少数盲人学会了嘴里发出咔哒声、听回声、用反射声来导航。咔哒声本身并不神奇——耳朵结构没变。变的是接线。经过多年练习，盲人的听觉皮层开始做一件在视力正常的人那里属于视觉皮层的工作。同样的神经元，不同的工作内容。',
        },
      },
    ],
  },

  // The classroom played the "invisible gorilla" video and the
  // "missing piece on the face" puzzle. Both reveal the same lesson:
  // seeing is not the same as paying attention, and the brain fills
  // in what it expects to see — even when "expected" is wrong.
  {
    type: 'concept-explainer',
    id: 'change-blindness',
    title: { en: 'Why your eyes miss what is in plain sight', zh: '为什么眼睛会"看不见"明明摆着的东西' },
    hint: {
      en: 'Two classic experiments — Simons & Chabris\' "invisible gorilla" and the face puzzle with the missing piece in the middle. Both show that attention, not vision, decides what reaches consciousness. "Seeing" is partly construction.',
      zh: '两个经典实验——Simons 与 Chabris 的"看不见的大猩猩"以及人脸拼图中间缺失一块。两个实验都说明：决定什么进入意识的不是视觉，而是注意力。"看见"有一部分是构建出来的。',
    },
    blocks: [
      {
        id: 'selective-attention',
        title: { en: 'Attention is a narrow spotlight — not a wide-angle lens', zh: '注意力是窄聚光灯，不是广角镜头' },
        hook: {
          en: 'In Simons & Chabris\' 1999 experiment, viewers watch a short video of two teams passing basketballs. Half are asked to count the white team\'s passes. The other half count the black team\'s. Halfway through, a person in a gorilla suit walks into the middle of the game, faces the camera, thumps their chest, and walks off. About half the viewers in each group miss the gorilla. Not because their eyes failed. Because their attention was elsewhere.',
          zh: '在 Simons 与 Chabris 1999 年的实验里，观众看一段两队传球的短视频。一半人要求数白队的传球次数，另一半数黑队。视频中途，一个穿大猩猩戏服的人走进赛场中央，面对镜头，拍了一下胸脯，然后走开。每一组中大约一半的观众没看见大猩猩——不是因为眼睛失灵，而是因为注意力在别处。',
        },
        mechanism: {
          en: 'Attention is a resource with a narrow bandwidth. The visual system throws away most of what the retina sees — the brain cannot afford to process every pixel every moment. What gets through the bottleneck is whatever the current "task set" cares about: counting white shirts, looking for a word, listening for a specific sound. Everything else, even if it is in plain view, is filtered out before it reaches conscious perception. This is not a flaw — it is what lets you read a book in a noisy café. The cost is that you do not see things that you were not looking for, even when they are obvious.',
          zh: '注意力是一种带宽有限的资源。视觉系统会丢掉视网膜接收的大部分信息——大脑负担不起逐像素逐刻地处理一切。能在瓶颈中通过的是当前"任务集"关心的内容：数白球衣、找某个词、听某个声音。其他所有东西，即便在视野正中央，也会在进入意识前被过滤掉。这不是缺陷——这正是你在嘈杂咖啡馆里还能读书的原因。代价是你看不到你没在找的东西，哪怕它很显眼。',
        },
        whyItMatters: {
          en: 'Change blindness is the same machinery, applied to differences over time rather than to differences in space. A change that happens while you blink, while you turn your head, while a film cuts between shots — even a large one, even one you are looking right at — can be invisible. The practical consequence: eyewitness testimony after a 30-second event is far less reliable than people think. The brain remembers the gist, fills in plausible detail, and is not aware of doing so.',
          zh: '变化盲是同一套机制，只是用在"时间上的差异"而非"空间上的差异"。一次眨眼间、一次转头间、一次镜头切换间发生的变化——哪怕很大、哪怕你正盯着看——也看不见。实际后果是：30 秒事件后的目击证词远没有人们以为的那么可靠。大脑记住大意，填进合理的细节，而且自己不觉得这有什么问题。',
        },
        teacherStory: {
          en: 'The face-puzzle demonstration: show a photograph of a person sitting in a chair. Tell the class one piece of the picture is missing. Ask them to find it. Most people scan for five minutes and never find it — because the missing piece is on the person\'s face, large and central, the size of a hand. Their visual system knows what faces look like, fills in the gap with the expected pattern, and does not flag the absence. The student\'s reaction is always the same: "But I was looking right at it." That sentence is the lesson.',
          zh: '人脸拼图演示：展示一张人坐在椅子上的照片，告诉全班"图中少了一块"，请他们找出来。大多数人扫五分钟找不到——因为缺失的那块就摆在人脸上，又大、又在正中央、有巴掌大。他们的视觉系统知道脸长什么样，用预期模式把缺口填上了，根本没标出"这里有缺失"。学生的反应总是一样的："但我明明在看那儿啊。"这句话本身就是这一课。',
        },
      },
    ],
  },
]
}

export default lesson
