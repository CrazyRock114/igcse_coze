import type { NarrationScript } from '@/content/types'

export const nervousNarration: NarrationScript = {
  id: '14-1-nervous-system',
  sections: [
    {
      id: 'intro',
      type: 'intro',
      title: { en: 'Wires, and the gaps between them', zh: '线路，以及线路之间的缝隙' },
      lines: [
        {
          id: 'intro-1',
          text: {
            en: 'The mammalian nervous system comes in two parts. The central nervous system is the brain and the spinal cord. Everything else — every nerve running out to a muscle or in from a fingertip — is the peripheral nervous system. Its job is coordination: making the parts of the body act together, and regulating what they do.',
            zh: '哺乳动物的神经系统分为两部分。中枢神经系统是脑和脊髓。其余的一切——通往肌肉的每一条神经、从指尖传入的每一条神经——都属于外周神经系统。它的任务是协调：使身体各部分协同动作，并调节它们的活动。',
          },
        },
        {
          id: 'intro-2',
          text: {
            en: 'Information travels as electrical impulses along cells called neurones, and there are three kinds. Sensory neurones carry impulses from receptors inwards to the central nervous system. Relay neurones sit inside it and connect one to another. Motor neurones carry impulses outwards to muscles and glands — the effectors.',
            zh: '信息以电脉冲的形式沿着称为神经元的细胞传导，神经元有三类。感觉神经元把脉冲从感受器向内传入中枢神经系统。中间神经元位于中枢内部，把一个神经元与另一个连接起来。运动神经元把脉冲向外传到肌肉和腺体——也就是效应器。',
          },
        },
        {
          id: 'intro-3',
          text: {
            en: 'Sensory in, relay between, motor out. Learn them in that order and a reflex arc writes itself.',
            zh: '感觉传入、中间连接、运动传出。按这个顺序记住，反射弧就能自己写出来了。',
          },
        },
      ],
    },
    {
      id: 'shape',
      type: 'concept',
      title: { en: 'The shape of a neurone', zh: '神经元长什么样' },
      lines: [
        {
          id: 'shape-1',
          text: {
            en: 'Look at one neurone up close. There is a central cell body containing the nucleus. Out of it grow a few short, branched fibres called dendrites — they pick up signals from neighbouring cells. And then there is one single long fibre called the axon. The axon is the wire; the dendrites are the antennae.',
            zh: '把一条神经元凑近看。中间是胞体，里面装着细胞核。从胞体长出几根短而分支的纤维——树突——它从邻近的细胞那里接收信号。然后是一根单独的长纤维——轴突。轴突是"电线"，树突是"天线"。',
          },
        },
        {
          id: 'shape-2',
          text: {
            en: 'The axon can be more than a metre long. The cell body of a motor neurone sits inside the spinal cord; the tip of the axon reaches a muscle in the foot. Everything that happens between the cell body and the muscle has to travel that whole length as an electrical impulse — which is why the axon is wrapped in a fatty myelin sheath that lets the signal jump from gap to gap rather than crawl along smoothly.',
            zh: '轴突可以超过一米长。运动神经元的胞体在脊髓里；轴突末端却一直伸到脚上的肌肉。胞体到肌肉之间发生的一切，都必须以电脉冲的形式走完全程——这就是为什么轴突要包一层脂肪髓鞘，让信号从一个间隙跳到下一个，而不是沿全程慢慢爬。',
          },
        },
        {
          id: 'shape-3',
          text: {
            en: 'There are three kinds, and they are not three different shapes — they are three different positions. Sensory, relay, motor. The "sensory" one is a sensory neurone because the long fibre is on the receptor side. The "motor" one is a motor neurone because the long fibre is on the muscle side. The relay neurone is short on both sides because it is only connecting two cells inside the central nervous system.',
            zh: '神经元有三种，但并不是三种不同的形状——而是三种不同的位置：感觉、中间、运动。"感觉"神经元之所以是感觉神经元，是因为那条长纤维在感受器一侧；"运动"神经元之所以是运动神经元，是因为那条长纤维在肌肉一侧；中间神经元两边都短，因为它只在中枢神经系统内部连接两个细胞。',
          },
        },
      ],
    },
    {
      id: 'reflex',
      type: 'concept',
      title: { en: 'Fast because it does not ask', zh: '快，是因为它不去请示' },
      lines: [
        {
          id: 'ref-1',
          text: {
            en: 'Touch something hot and your hand is away before you know it was hot. That is a reflex action: automatic, rapid, and not decided on. The pathway it takes is the reflex arc.',
            zh: '碰到烫的东西，你的手在你意识到"烫"之前就已经缩回来了。这就是反射：自动、迅速，而且不经决定。它所走的通路就是反射弧。',
          },
        },
        {
          id: 'ref-2',
          text: {
            en: 'Stimulus: the heat. Receptor: a temperature receptor in the skin. Sensory neurone: carries the impulse to the spinal cord. Relay neurone: passes it straight across. Motor neurone: carries it out to the muscle. Effector: the muscle contracts. Response: the hand pulls back.',
            zh: '刺激：热。感受器：皮肤中的温度感受器。感觉神经元：把脉冲传到脊髓。中间神经元：直接把它转接过去。运动神经元：把它传到肌肉。效应器：肌肉收缩。反应：手缩回。',
          },
        },
        {
          id: 'ref-3',
          text: {
            en: 'Notice what is missing from that list. The brain. The impulse reaches the spinal cord and turns straight round, and that is precisely why it is fast — the shortest path is the one that does not go via a decision. You feel the pain a moment later, when a separate set of impulses reaches the brain, by which time your hand has already moved.',
            zh: '注意这个清单里少了什么——大脑。脉冲到达脊髓就直接折返，这正是它快的原因：最短的路径就是不经过"决定"的那一条。你稍后才感到疼，那是另一组脉冲到达大脑的时候，而那时你的手早就动了。',
          },
        },
        {
          id: 'ref-4',
          text: {
            en: 'Between one neurone and the next there is a gap — a synapse. The impulse cannot jump it, because it is electrical and the gap is not. So the message changes form: the end of the first neurone releases a chemical, a neurotransmitter, held ready in tiny vesicles.',
            zh: '一个神经元与下一个之间有一道缝隙——突触。脉冲无法跳过去，因为脉冲是电信号，而缝隙不是。于是信息改变了形式：第一个神经元的末端释放出一种化学物质——神经递质，它预先贮存在微小的小泡中。',
          },
        },
        {
          id: 'ref-5',
          text: {
            en: 'The neurotransmitter diffuses across the gap, binds to receptor proteins on the next neurone, and sets off a new impulse in it. Then it is broken down, so the signal does not go on forever.',
            zh: '神经递质扩散过缝隙，与下一个神经元上的受体蛋白结合，在其中引发新的脉冲。随后它被分解，以免信号无休止地持续下去。',
          },
        },
        {
          id: 'ref-6',
          text: {
            en: 'And here is the consequence worth the marks. The vesicles are only on one side, and the receptors are only on the other. So an impulse can cross a synapse in one direction and not the other — which is how a nervous system made of two-way wires ends up with one-way traffic.',
            zh: '接下来是真正值分的推论：小泡只在一侧，受体只在另一侧。因此脉冲只能沿一个方向跨过突触，反方向则不行——这就是为什么由双向"导线"构成的神经系统，最终却是单向通行。',
          },
        },
      ],
    },
    {
      id: 'pupil',
      type: 'interaction',
      title: { en: 'A reflex you can watch', zh: '一个看得见的反射' },
      lines: [
        {
          id: 'pup-1',
          text: {
            en: 'The pupil reflex is the same machinery in miniature, and it is the one reflex you can watch happening in someone else. The pupil is not a structure — it is the hole in the middle of the iris, and the iris is a ring of muscle.',
            zh: '瞳孔反射是同一套机制的缩微版，也是你能在别人身上亲眼看到的那个反射。瞳孔本身不是一个结构——它是虹膜中央的孔，而虹膜是一圈肌肉。',
          },
          action: { type: 'setParams', params: { light: 0.5, distance: 100, reflex: 100 } },
        },
        {
          id: 'pup-2',
          text: {
            en: 'Turn the light up and watch the diameter fall. Bright light: the circular muscles of the iris contract and the radial muscles relax, and the pupil constricts. Dim light: the radial muscles contract and the circular ones relax, and it dilates. The two sets are antagonistic — one pulls the hole shut, the other pulls it open.',
            zh: '把光调亮，看直径变小。强光下：虹膜的环行肌收缩、辐射肌舒张，瞳孔缩小。弱光下：辐射肌收缩、环行肌舒张，瞳孔放大。这两组肌肉是拮抗的——一组把孔拉小，另一组把孔拉开。',
          },
          action: { type: 'setParams', params: { light: 100, distance: 100, reflex: 100 } },
          pause: 1,
        },
        {
          id: 'pup-3',
          text: {
            en: 'Now look at the second reading, the light reaching the retina, and compare it with the first. The brightness went up ten thousandfold. The light on the retina went up several hundredfold. The reflex helped — but nothing like enough to cancel the change.',
            zh: '现在看第二个读数——到达视网膜的光——并与第一个比较。亮度上升了一万倍，视网膜上的光只上升了几百倍。反射起了作用——但远不足以抵消这个变化。',
          },
        },
        {
          id: 'pup-4',
          text: {
            en: 'And it cannot. The pupil runs from eight millimetres to two, and what matters is the area, not the width — so the most it can ever change the light by is four squared, which is sixteen. That is the whole budget of the reflex. Adjusting to a dark room takes minutes rather than the instant the pupil takes, because most of that adjustment happens chemically inside the rod cells, not in the iris at all.',
            zh: '它也做不到。瞳孔的范围是 8 毫米到 2 毫米，而起作用的是面积而不是宽度——所以它能改变光量的最大倍数是 4 的平方，即 16 倍。这就是这个反射的全部"预算"。适应黑暗的房间需要几分钟，而不是瞳孔所需的一瞬，因为那种适应大部分发生在视杆细胞内部的化学变化中，根本不在虹膜。',
          },
        },
        {
          id: 'pup-5',
          text: {
            en: 'Now set the reflex itself to zero — a fixed pupil. The diameter no longer moves, and the light on the retina now tracks the brightness exactly. This is what a doctor is testing when they shine a torch in your eye: a pupil that does not respond means the arc is broken somewhere.',
            zh: '现在把反射本身设为零——瞳孔固定不动。直径不再变化，视网膜上的光就完全跟着亮度走。医生用手电照你的眼睛，检查的正是这一点：瞳孔没有反应，意味着这条反射弧在某处断了。',
          },
          action: { type: 'setParams', params: { light: 100, distance: 100, reflex: 0 } },
        },
      ],
    },
    {
      id: 'eye',
      type: 'interaction',
      title: { en: 'Focusing with a lens that cannot move', zh: '用一枚不能移动的透镜聚焦' },
      lines: [
        {
          id: 'eye-1',
          text: {
            en: 'Light enters through the cornea, which does most of the bending, passes through the pupil, and is focused by the lens onto the retina at the back. The retina is where the receptor cells are; the optic nerve carries their impulses to the brain.',
            zh: '光从角膜进入——大部分折射由它完成——穿过瞳孔，再由晶状体聚焦到后方的视网膜上。视网膜是感受器细胞所在之处；视神经把它们的脉冲传到大脑。',
          },
          action: { type: 'setParams', params: { light: 50, distance: 300, reflex: 100 } },
        },
        {
          id: 'eye-2',
          text: {
            en: 'A camera focuses by moving the lens. Your eye cannot: the retina is a fixed distance behind it. So it changes the lens itself, and that is accommodation. Bring the object closer and watch the power the lens needs climb.',
            zh: '照相机靠移动镜头对焦。你的眼睛做不到：视网膜与晶状体之间的距离是固定的。于是它改变晶状体本身，这就是调节。把物体拉近，看看晶状体所需的屈光力如何攀升。',
          },
          action: { type: 'setParams', params: { light: 50, distance: 30, reflex: 100 } },
        },
        {
          id: 'eye-3',
          text: {
            en: 'For a distant object the ciliary muscles relax, the suspensory ligaments are pulled tight, and the lens is stretched thin — long focal length, low power. For a near object the ciliary muscles contract, which slackens the ligaments and lets the lens spring back into a fatter shape — short focal length, high power.',
            zh: '看远物时，睫状肌舒张，悬韧带被拉紧，晶状体被拉薄——焦距长、屈光力小。看近物时，睫状肌收缩，悬韧带因而松弛，晶状体得以回弹成更厚的形状——焦距短、屈光力大。',
          },
        },
        {
          id: 'eye-4',
          text: {
            en: 'That is the sentence students get backwards more than any other in the syllabus. The ciliary muscle contracting *slackens* the ligaments. A contracting muscle usually pulls something tight; this one is a ring, and when a ring tightens its own diameter gets smaller, so the ligaments attached around it go loose.',
            zh: '这是整份考纲中学生最常搞反的一句话：睫状肌收缩会使悬韧带*松弛*。收缩的肌肉通常是把东西拉紧的；但这块肌肉是个环，环收紧时自身的直径变小，因此连在环周的韧带反而松了。',
          },
        },
        {
          id: 'eye-5',
          text: {
            en: 'Push the object closer still and the spare power runs out. That point — about twenty-five centimetres in a young eye — is the near point, and it is not a rule someone made up. It is simply where the lens cannot get any fatter.',
            zh: '再把物体推近，多余的屈光力就用完了。这个点——年轻的眼睛约 25 厘米——就是近点，它并不是谁定下的规矩，只不过是晶状体再也无法变得更厚的地方。',
          },
          action: { type: 'setParams', params: { light: 50, distance: 12, reflex: 100 } },
          pause: 1,
        },
      ],
    },
    {
      id: 'retina',
      type: 'concept',
      title: { en: 'Two kinds of receptor', zh: '两类感受器' },
      lines: [
        {
          id: 'ret-1',
          text: {
            en: 'The retina holds two kinds of receptor cell. Rods work in dim light but cannot distinguish colour. Cones need brighter light and do distinguish colour — three types, sensitive to red, green and blue.',
            zh: '视网膜上有两类感受器细胞。视杆细胞在弱光下工作，但不能分辨颜色。视锥细胞需要较强的光，却能分辨颜色——共三种，分别对红、绿、蓝敏感。',
          },
        },
        {
          id: 'ret-2',
          text: {
            en: 'They are not spread evenly. The fovea, directly opposite the pupil, is packed with cones and has almost no rods, so it gives the sharpest and most colourful vision — which is why you turn your head to look straight at something. Further out towards the edges, rods take over.',
            zh: '它们的分布并不均匀。中央凹正对瞳孔，密布视锥细胞而几乎没有视杆细胞，因此视觉最清晰、色彩最丰富——这就是你要转头正视某物的原因。越往边缘，视杆细胞越占主导。',
          },
        },
        {
          id: 'ret-3',
          text: {
            en: 'Which explains something you can test tonight. A faint star vanishes when you look straight at it and reappears when you look slightly to one side — because looking straight at it puts its image on the fovea, where there are no rods, and rods are the only cells that work at that light level.',
            zh: '这也解释了一件你今晚就能验证的事：一颗暗淡的星星，你直视它时会消失，稍微偏开视线又会重现——因为直视会把它的像投在中央凹上，那里没有视杆细胞，而在那种光照下只有视杆细胞才工作。',
          },
        },
      ],
    },
    {
      id: 'summary',
      type: 'summary',
      title: { en: 'What to take into the exam', zh: '考场上要记住的' },
      lines: [
        {
          id: 'sum-1',
          text: {
            en: 'A reflex arc in order: stimulus, receptor, sensory neurone, relay neurone, motor neurone, effector, response. Write all seven; questions are marked on the chain.',
            zh: '按顺序写出反射弧：刺激、感受器、感觉神经元、中间神经元、运动神经元、效应器、反应。七个都要写；这类题按链条给分。',
          },
        },
        {
          id: 'sum-2',
          text: {
            en: 'A synapse is one-way because the vesicles are on one side and the receptors on the other. Bright light: circular muscles contract, pupil constricts. Near object: ciliary muscles contract, ligaments slacken, lens gets fatter.',
            zh: '突触是单向的，因为小泡在一侧而受体在另一侧。强光：环行肌收缩，瞳孔缩小。近物：睫状肌收缩，悬韧带松弛，晶状体变厚。',
          },
        },
      ],
    },
  ],
}

export default nervousNarration
