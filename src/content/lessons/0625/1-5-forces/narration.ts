import type { NarrationScript } from '@/content/types'

export const forcesNarration: NarrationScript = {
  id: '1-5-forces',
  sections: [
    {
      id: 'what',
      type: 'intro',
      title: { en: 'What a force can do', zh: '力能做什么' },
      lines: [
        {
          id: 'wh-1',
          text: {
            en: 'A force can change the size or the shape of an object — stretch it, squash it, bend it. And a force can change how an object moves. Those are two different jobs and questions ask about them separately.',
            zh: '力可以改变物体的大小或形状——拉伸、压缩、弯曲。力也可以改变物体的运动状态。这是两项不同的作用，题目会分别考查。',
          },
        },
        {
          id: 'wh-2',
          text: {
            en: 'When several forces act along the same straight line, add them with their directions — forces one way positive, the other way negative. The single force that has the same effect is the resultant.',
            zh: '当几个力沿同一直线作用时，要带方向相加——一个方向为正，相反方向为负。产生相同效果的那个单一的力就是合力。',
          },
        },
        {
          id: 'wh-3',
          text: {
            en: 'And here is the rule that surprises people. With no resultant force, an object stays at rest — or carries on at constant velocity. Not "slows down". Constant velocity needs no force at all; it is changing velocity that does.',
            zh: '接下来是一条常让人意外的规律：没有合力时，物体保持静止——或者以恒定速度继续运动。不是"慢下来"。匀速运动完全不需要力；需要力的是"速度发生改变"。',
          },
        },
        {
          id: 'wh-4',
          text: {
            en: 'Which is why a resultant force changes an object’s speed, its direction, or both. Friction is a force that opposes motion between surfaces and produces heating. Drag is the same idea in a fluid — air resistance in a gas, and drag in a liquid.',
            zh: '因此，合力会改变物体的速率、方向，或两者。摩擦力是阻碍表面间相对运动并产生热的力。阻力是流体中的同一回事——在气体中是空气阻力，在液体中是液体阻力。',
          },
        },
      ],
    },
    {
      id: 'hooke',
      type: 'interaction',
      title: { en: 'Straight, until it is not', zh: '先是直线，然后就不是了' },
      lines: [
        {
          id: 'ho-1',
          text: {
            en: 'Hang masses from a spring, measure the extension for each load, and plot extension against load. The experiment is simple and the graph is the point.',
            zh: '在弹簧下挂上砝码，测出每个载荷对应的伸长量，画出伸长量对载荷的图。实验很简单，关键在这张图。',
          },
          action: {
            type: 'setParams',
            params: { mode: 1, springConstant: 25, limitOfProportionality: 10, mass: 70, drag: 0.25 },
          },
        },
        {
          id: 'ho-2',
          text: {
            en: 'At first the line is straight through the origin: the extension is proportional to the load. That is Hooke’s law, and the gradient gives the spring constant — k equals F over x, in newtons per metre. A stiff spring has a large k and a small extension.',
            zh: '起初是一条过原点的直线：伸长量与载荷成正比。这就是胡克定律，其梯度给出弹簧常数——k = F/x，单位是牛每米。刚度大的弹簧 k 值大、伸长量小。',
          },
        },
        {
          id: 'ho-3',
          text: {
            en: 'Then follow the line further. It bends away. The point where it stops being straight is the limit of proportionality, and past it the spring stretches more for each extra newton than it used to.',
            zh: '再往后看这条线，它弯离了直线。它不再保持直线的那一点就是比例极限；越过它之后，每增加一牛顿所引起的伸长量比之前更大。',
          },
        },
        {
          id: 'ho-4',
          text: {
            en: 'That is worth dwelling on, because a student who has only met F equals kx believes a spring obeys it forever. It does not — and the reason the limit has a name is precisely that it does not. Look at the reading: double the load past the limit and the extension more than doubles.',
            zh: '这一点值得多停留一会儿，因为只学过 F = kx 的学生会以为弹簧永远遵守它。它并不遵守——比例极限之所以有名字，恰恰是因为它不遵守。看读数：越过极限后把载荷加倍，伸长量增加得比一倍还多。',
          },
        },
        {
          id: 'ho-5',
          text: {
            en: 'And a practical note that costs marks: the spring constant is found from the gradient of the straight part only. Taking F over x at a point beyond the limit gives an answer that is simply wrong.',
            zh: '还有一个会丢分的实验要点：弹簧常数只能由直线部分的梯度求得。在超过比例极限的某一点用 F/x 计算，得到的答案根本就是错的。',
          },
        },
      ],
    },
    {
      id: 'falling',
      type: 'interaction',
      title: { en: 'Terminal velocity is not a rule', zh: '终极速度不是一条规定' },
      lines: [
        {
          id: 'fa-1',
          text: {
            en: 'Now the other experiment. A skydiver steps out of an aircraft. Watch the speed graph and the resultant force graph together — the second one explains the first.',
            zh: '现在看另一个实验。一位跳伞者跳出飞机。把速率图和合力图放在一起看——后者解释了前者。',
          },
          action: {
            type: 'setParams',
            params: { mode: 2, springConstant: 25, limitOfProportionality: 10, mass: 70, drag: 0.25 },
          },
        },
        {
          id: 'fa-2',
          text: {
            en: 'At the moment of stepping out the speed is zero, so the air resistance is zero, so the only force is the weight. The resultant equals the weight and the acceleration is the full nine point eight metres per second squared.',
            zh: '刚跳出时速率为零，因此空气阻力为零，唯一的力就是重力。合力等于重力，加速度是完整的 9.8 米每二次方秒。',
          },
        },
        {
          id: 'fa-3',
          text: {
            en: 'As the speed rises the air resistance grows with it. The weight has not changed — it cannot, the mass and gravity are the same — so the resultant shrinks. And F equals m a, so the acceleration shrinks too. The skydiver is still speeding up, but less and less quickly.',
            zh: '随着速率上升，空气阻力也随之增大。重力没有变——它不可能变，质量和重力场都没变——因此合力在减小。而 F = ma，所以加速度也在减小。跳伞者仍在加速，但越来越慢。',
          },
        },
        {
          id: 'fa-4',
          text: {
            en: 'Eventually the air resistance has grown until it equals the weight. Now the resultant is zero. And with no resultant force there is no acceleration, so the speed stops changing — that is terminal velocity.',
            zh: '最终空气阻力增大到与重力相等。此时合力为零。没有合力就没有加速度，速率于是停止变化——这就是终极速度。',
          },
          pause: 1,
        },
        {
          id: 'fa-5',
          text: {
            en: 'Notice what did not happen. Nothing in this model was ever told about terminal velocity. It is just F equals m a with a force that grows as you go, and the levelling off falls out of the arithmetic. Terminal velocity is not a separate rule to memorise — it is what happens when a resultant reaches zero.',
            zh: '注意没有发生什么：这个模型从未被告知"终极速度"这回事。它只是 F = ma，加上一个随速度增大的力，速率变平是算出来的结果。终极速度不是一条需要单独背下来的规则——它就是合力归零时发生的事。',
          },
        },
        {
          id: 'fa-6',
          text: {
            en: 'Now open the parachute — turn the drag right up. The drag suddenly exceeds the weight, so the resultant points upwards and the skydiver decelerates, until the speed has fallen enough for drag and weight to balance again at a new, much lower terminal velocity.',
            zh: '现在打开降落伞——把阻力大幅调高。阻力骤然超过重力，合力于是向上，跳伞者减速，直到速率降到足以让阻力与重力重新平衡，达到一个新的、低得多的终极速度。',
          },
          action: {
            type: 'setParams',
            params: { mode: 2, springConstant: 25, limitOfProportionality: 10, mass: 70, drag: 6 },
          },
        },
        {
          id: 'fa-7',
          text: {
            en: 'And turn the drag off altogether. Without air resistance the resultant stays equal to the weight forever, the acceleration never changes, and the speed rises without limit. On the Moon, with no atmosphere, a feather and a hammer fall exactly together.',
            zh: '再把阻力完全关掉。没有空气阻力时，合力永远等于重力，加速度不变，速率无限上升。在没有大气的月球上，羽毛和锤子下落得完全一样快。',
          },
          action: {
            type: 'setParams',
            params: { mode: 2, springConstant: 25, limitOfProportionality: 10, mass: 70, drag: 0 },
          },
        },
      ],
    },
    {
      id: 'circular',
      type: 'concept',
      title: { en: 'Turning without speeding up', zh: '转弯却不加速' },
      lines: [
        {
          id: 'ci-1',
          text: {
            en: 'An object moving in a circle at a steady speed is accelerating, which sounds wrong until you remember that velocity is a vector. The speed is constant but the direction is changing every instant, so the velocity is changing.',
            zh: '以恒定速率做圆周运动的物体是在加速的。这听起来不对，直到你想起速度是矢量：速率不变，但方向每时每刻都在改变，所以速度在变。',
          },
        },
        {
          id: 'ci-2',
          text: {
            en: 'Changing velocity needs a resultant force, and that force acts towards the centre of the circle — perpendicular to the motion. Perpendicular is the key word: a force along the motion would change the speed, and this one does not.',
            zh: '速度改变需要合力，而这个力指向圆心——与运动方向垂直。"垂直"是关键词：沿运动方向的力会改变速率，而这个力不会。',
          },
        },
        {
          id: 'ci-3',
          text: {
            en: 'A larger mass, a faster speed or a smaller radius all need a larger force. Take the force away — cut the string — and the object does not fly outwards; it carries straight on along the tangent, because with no resultant force it keeps the velocity it had.',
            zh: '质量更大、速率更快或半径更小，都需要更大的力。撤掉这个力——把绳剪断——物体并不会向外飞出，而是沿切线笔直前进，因为没有合力时它保持原有的速度。',
          },
        },
      ],
    },
    {
      id: 'gravity',
      type: 'concept',
      title: { en: 'Where the weight acts', zh: '重力作用在哪里' },
      lines: [
        {
          id: 'cg-1',
          text: {
            en: 'The centre of gravity is the point at which the whole weight of an object may be taken to act. For a uniform object it is at the geometrical centre; for anything else it is wherever the mass is concentrated.',
            zh: '重心是可以认为物体全部重力集中作用的那一点。对均匀物体，它在几何中心；对其他物体，它在质量集中之处。',
          },
        },
        {
          id: 'cg-2',
          text: {
            en: 'To find it for an irregular lamina: hang it from a pin so it swings freely, hang a plumb line from the same pin and draw the vertical. Repeat from a different point. Where the lines cross is the centre of gravity — and a third line is worth drawing as a check.',
            zh: '要找出不规则薄板的重心：用针把它悬起使其自由摆动，从同一点挂下铅垂线并画出这条竖直线。换一个悬点重复一次。两线交点就是重心——再画第三条线作为检验是值得的。',
          },
        },
        {
          id: 'cg-3',
          text: {
            en: 'And stability follows from it. An object is stable if its centre of gravity is low and its base is wide, because tilting it then raises the centre of gravity and the weight acts to bring it back. Tilt it far enough that the centre of gravity passes outside the base, and the weight now turns it further over instead — it topples.',
            zh: '稳定性由此而来。重心低、底面宽的物体更稳定，因为倾斜时重心升高，重力会把它拉回去。若倾斜到重心越出底面之外，重力反而会使它继续翻转——于是倾倒。',
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
            en: 'No resultant force means at rest or at constant velocity — not slowing down. A resultant force changes speed or direction, and F = ma with the force and acceleration in the same direction.',
            zh: '没有合力意味着静止或匀速运动——不是减速。合力改变速率或方向，F = ma，且力与加速度方向相同。',
          },
        },
        {
          id: 'sum-2',
          text: {
            en: 'For a load–extension graph: straight through the origin up to the limit of proportionality, and take the spring constant from the gradient of the straight part only.',
            zh: '对于伸长量—载荷图：在比例极限以内是过原点的直线，弹簧常数只能取直线部分的梯度。',
          },
        },
        {
          id: 'sum-3',
          text: {
            en: 'And for terminal velocity, answer it as a force story in three stages: weight only, so full acceleration; drag growing, so resultant and acceleration shrinking; drag equal to weight, so resultant zero and speed constant. Never say the weight decreases — it does not.',
            zh: '对于终极速度，要按三个阶段的"受力故事"来答：只有重力，故加速度最大；阻力增大，故合力与加速度减小；阻力等于重力，故合力为零、速率恒定。绝不要说重力减小了——它没有。',
          },
        },
      ],
    },
  ],
}

export default forcesNarration
