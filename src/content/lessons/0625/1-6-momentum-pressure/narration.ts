import type { NarrationScript } from '@/content/types'

export const momentumNarration: NarrationScript = {
  id: '1-6-momentum-pressure',
  sections: [
    {
      id: 'momentum',
      type: 'interaction',
      title: { en: 'One quantity survives a crash', zh: '有一个量能在碰撞中幸存' },
      lines: [
        {
          id: 'mo-1',
          text: {
            en: 'Momentum is mass times velocity, in kilogram metres per second. Velocity is a vector, so momentum is a vector too — direction is part of it, and in one dimension that means a sign.',
            zh: '动量是质量乘以速度，单位为千克米每秒。速度是矢量，所以动量也是矢量——方向是它的一部分，在一维情形中就体现为正负号。',
          },
          action: {
            type: 'setParams',
            params: { massA: 1000, velocityA: 20, massB: 1500, velocityB: 0, stick: 1, contactTime: 0.1 },
          },
        },
        {
          id: 'mo-2',
          text: {
            en: 'A thousand-kilogram car at twenty metres per second runs into a stationary fifteen-hundred-kilogram lorry, and they lock together. Look at the two momentum readings: before, twenty thousand. After, twenty thousand. Nothing was lost.',
            zh: '一辆 1000 千克的汽车以 20 米每秒撞上静止的 1500 千克卡车，两者咬合在一起。看两个动量读数：碰撞前 20000，碰撞后 20000。一点也没有损失。',
          },
        },
        {
          id: 'mo-3',
          text: {
            en: 'Now look at the energy reading. A great deal of kinetic energy has gone — into bending metal, into heat, into sound. Momentum conserved and kinetic energy not, in the same collision. That contrast is the whole reason the two are taught together.',
            zh: '现在看能量读数：大量动能消失了——变成了金属形变、热和声音。同一次碰撞中，动量守恒而动能不守恒。这个对比正是把两者放在一起讲的全部理由。',
          },
        },
        {
          id: 'mo-4',
          text: {
            en: 'Now let them bounce apart instead. The momentum is still exactly twenty thousand — it does not care what the objects did. And this time the kinetic energy is unchanged too, which makes it an elastic collision.',
            zh: '现在让它们弹开而不是黏在一起。动量仍然恰好是 20000——它不在乎物体做了什么。而这一次动能也没有变化，这就是弹性碰撞。',
          },
          action: {
            type: 'setParams',
            params: { massA: 1000, velocityA: 20, massB: 1500, velocityB: 0, stick: 0, contactTime: 0.1 },
          },
          pause: 1,
        },
        {
          id: 'mo-5',
          text: {
            en: 'And now a head-on crash — give the second vehicle a negative velocity. This is where the vector nature bites: you must add the momenta with their signs. Treat momentum as a scalar here and the answer is not merely inaccurate, it is meaningless.',
            zh: '现在来一次迎面相撞——给第二辆车一个负速度。矢量性在这里显现出来：必须带着符号把动量相加。把动量当作标量处理，答案不只是不准确，而是毫无意义。',
          },
          action: {
            type: 'setParams',
            params: { massA: 1000, velocityA: 20, massB: 1500, velocityB: -15, stick: 1, contactTime: 0.1 },
          },
        },
        {
          id: 'mo-6',
          text: {
            en: 'The principle: in a closed system, the total momentum before an interaction equals the total momentum after it. Closed means no external resultant force — which is why the principle works for a collision lasting a fraction of a second, even though friction would eventually stop everything.',
            zh: '原理是：在封闭系统中，相互作用前的总动量等于作用后的总动量。"封闭"指没有外部合力——这就是为什么对于持续不到一秒的碰撞，这条原理成立，尽管摩擦最终会让一切停下来。',
          },
        },
      ],
    },
    {
      id: 'impulse',
      type: 'interaction',
      title: { en: 'Why a car is designed to crumple', zh: '汽车为什么被设计成会溃缩' },
      lines: [
        {
          id: 'im-1',
          text: {
            en: 'Newton’s second law is usually written F equals m a, but the deeper version is that the resultant force equals the rate of change of momentum: F equals delta p over delta t. Rearranged, F delta t equals delta m v — and F delta t is called the impulse.',
            zh: '牛顿第二定律通常写作 F = ma，但更本质的表述是：合力等于动量的变化率，即 F = Δp/Δt。变形后得到 FΔt = Δ(mv)——而 FΔt 称为冲量。',
          },
          action: {
            type: 'setParams',
            params: { massA: 1000, velocityA: 20, massB: 1500, velocityB: 0, stick: 1, contactTime: 0.05 },
          },
        },
        {
          id: 'im-2',
          text: {
            en: 'Now read that as a design problem. A car crashing has a certain amount of momentum, and all of it has to go. You cannot change that — it is fixed by the mass and the speed before the crash.',
            zh: '现在把它当作一个设计问题来读。碰撞中的汽车有一定的动量，而这些动量必须全部消失。你无法改变这一点——它由碰撞前的质量和速率所决定。',
          },
        },
        {
          id: 'im-3',
          text: {
            en: 'So the only thing left to change is how long the losing takes. Look at the graph: the force needed against the contact time. Watch what happens as the collision is made to last longer.',
            zh: '于是唯一还能改变的，就是"失去动量"这一过程持续多久。看这张图：所需的力随接触时间的变化。观察当碰撞被拉长时会怎样。',
          },
          action: {
            type: 'setParams',
            params: { massA: 1000, velocityA: 20, massB: 1500, velocityB: 0, stick: 1, contactTime: 0.6 },
          },
          pause: 1,
        },
        {
          id: 'im-4',
          text: {
            en: 'Double the time and you halve the force. That is a crumple zone: it does not absorb the momentum, it extends the time over which the momentum is lost, and the force falls in proportion. Airbags, seatbelts that stretch, crash barriers that deform, and a gymnast bending their knees on landing are all the same idea.',
            zh: '时间加倍，力就减半。这就是溃缩区：它并不吸收动量，而是把失去动量的过程拉长，力便按比例下降。安全气囊、可伸展的安全带、会变形的护栏，以及体操运动员落地时屈膝，都是同一个道理。',
          },
        },
        {
          id: 'im-5',
          text: {
            en: 'And it explains the opposite case too. A collision with something rigid — a concrete wall — happens in a very short time, so the force is enormous. Same momentum, same change, far less time.',
            zh: '这也解释了相反的情形。与刚性物体（比如混凝土墙）相撞发生在极短的时间内，因此力极大。同样的动量、同样的变化，时间却短得多。',
          },
        },
      ],
    },
    {
      id: 'pressure',
      type: 'concept',
      title: { en: 'The same force, spread differently', zh: '同样的力，分布不同' },
      lines: [
        {
          id: 'pr-1',
          text: {
            en: 'Pressure is force per unit area: p equals F over A, in pascals, where one pascal is one newton per square metre. The force is the same; what changes is how it is spread.',
            zh: '压强是单位面积上的力：p = F/A，单位为帕斯卡，1 帕即 1 牛每平方米。力是相同的，改变的是它如何分布。',
          },
        },
        {
          id: 'pr-2',
          text: {
            en: 'Which is why a drawing pin has a sharp point and a broad head: the same push gives an enormous pressure under the point and a comfortable one under your thumb. And why a tractor has wide tyres and a knife has a thin blade.',
            zh: '这就是图钉一端尖、一端有宽头的原因：同样的按压，在尖端下产生巨大的压强，在你拇指下则舒适得多。也是拖拉机用宽轮胎、刀有薄刃的原因。',
          },
        },
        {
          id: 'pr-3',
          text: {
            en: 'A liquid presses too, and the deeper you go the greater the pressure — because there is more liquid above you, and its weight is what does the pressing. A denser liquid presses harder at the same depth, for the same reason.',
            zh: '液体也会产生压强，而且越深压强越大——因为你上方的液体更多，正是这些液体的重量在施压。同样深度下，密度更大的液体压强更大，原因相同。',
          },
        },
        {
          id: 'pr-4',
          text: {
            en: 'The equation is delta p equals rho g delta h: the change in pressure is the density times the gravitational field strength times the change in depth. Notice what is not in it — the shape of the container, and the total amount of liquid. Only the depth matters, which surprises people and is worth remembering.',
            zh: '公式是 Δp = ρgΔh：压强的变化等于密度乘以重力场强度乘以深度的变化。注意其中没有什么——容器的形状，以及液体的总量。只有深度起作用，这常令人意外，值得记住。',
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
            en: 'Momentum is p = mv and it is a vector — in one dimension, choose a positive direction and give opposing velocities a negative sign. Total momentum before equals total momentum after.',
            zh: '动量是 p = mv，而且是矢量——在一维情形中，选定一个正方向，反向的速度取负号。碰撞前的总动量等于碰撞后的总动量。',
          },
        },
        {
          id: 'sum-2',
          text: {
            en: 'Momentum is conserved in every collision. Kinetic energy is not, unless the collision is elastic. Do not confuse the two, and do not assume that conserving one conserves the other.',
            zh: '任何碰撞中动量都守恒。动能则不然，除非是弹性碰撞。不要把两者混为一谈，也不要以为一个守恒另一个就守恒。',
          },
        },
        {
          id: 'sum-3',
          text: {
            en: 'For a safety question, say that the change in momentum is fixed, that increasing the contact time therefore decreases the force, and name the mechanism — crumple zone, airbag, bending knees.',
            zh: '遇到安全类问题，要写出：动量的变化是固定的，因此延长接触时间就减小了力，并说出具体机制——溃缩区、安全气囊、屈膝。',
          },
        },
        {
          id: 'sum-4',
          text: {
            en: 'And for liquid pressure, delta p equals rho g delta h. The shape of the vessel and the volume of liquid are irrelevant; only the depth counts.',
            zh: '至于液体压强，Δp = ρgΔh。容器的形状和液体的体积都无关紧要；只有深度起作用。',
          },
        },
      ],
    },
  ],
}

export default momentumNarration
