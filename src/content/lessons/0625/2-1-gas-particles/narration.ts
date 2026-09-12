import type { NarrationScript } from '@/content/types'

export const gasNarration: NarrationScript = {
  id: '2-1-gas-particles',
  sections: [
    {
      id: 'states',
      type: 'concept',
      title: { en: 'Three ways to arrange the same particles', zh: '同样的粒子，三种排布方式' },
      lines: [
        {
          id: 'st-1',
          text: {
            en: 'A solid has a fixed shape and a fixed volume. Its particles are packed closely in a regular pattern, held by strong forces, and they can only vibrate about fixed positions — they cannot move past one another, which is why the shape holds.',
            zh: '固体有固定的形状和固定的体积。其粒子紧密堆积成规则排列，被强作用力束缚，只能在固定位置附近振动——它们无法彼此越过，形状因此得以保持。',
          },
        },
        {
          id: 'st-2',
          text: {
            en: 'A liquid keeps a fixed volume but takes the shape of its container. The particles are still close together, but the forces are weaker and they can slide past one another — so it flows, and it still cannot be squashed much.',
            zh: '液体体积固定，形状则随容器而定。粒子之间仍然靠得很近，但作用力较弱，可以相互滑过——因此它能流动，同时仍然很难被压缩。',
          },
        },
        {
          id: 'st-3',
          text: {
            en: 'A gas has neither a fixed shape nor a fixed volume. The particles are far apart with almost no forces between them, moving quickly in all directions — so a gas fills whatever it is put in, and unlike the other two it can be compressed a great deal, because most of it is empty space.',
            zh: '气体既没有固定形状也没有固定体积。粒子相距很远、彼此间几乎没有作用力，朝各个方向快速运动——因此气体会充满任何容器；而且与前两者不同，它能被大幅压缩，因为其中大部分是空隙。',
          },
        },
        {
          id: 'st-4',
          text: {
            en: 'The changes between them have names, and the pairs are worth learning together. Solid to liquid is melting, liquid to solid is solidifying — often called freezing. Liquid to gas is boiling or evaporating, gas to liquid is condensing. And solid straight to gas, missing the liquid out entirely, is sublimation.',
            zh: '这些状态之间的变化各有名称，成对记忆最好。固体变液体是熔化，液体变固体是凝固——常称为结冰。液体变气体是沸腾或蒸发，气体变液体是凝结。而固体直接变成气体、完全跳过液态，则是升华。',
          },
        },
        {
          id: 'st-5',
          text: {
            en: 'Boiling and evaporating are not the same thing, and the difference is worth having straight. Boiling happens throughout the liquid, at one particular temperature. Evaporation happens only at the surface, at any temperature, and it is the fastest particles that escape — which is why what is left behind is cooler.',
            zh: '沸腾和蒸发不是一回事，这个区别值得弄清。沸腾发生在液体内部各处，且只在某一特定温度发生。蒸发只发生在表面，任何温度下都能进行，而逃逸的是速度最快的粒子——这就是剩下的液体会变凉的原因。',
          },
        },
      ],
    },
    {
      id: 'intro',
      type: 'intro',
      title: { en: 'What pressure really is', zh: '压强究竟是什么' },
      lines: [
        {
          id: 'intro-1',
          text: {
            en: 'A gas has no pressure sitting inside it waiting to be measured. Pressure is what you get when billions of particles drum against the walls. Every collision gives the wall a tiny push, and the pushes add up.',
            zh: '气体内部并没有一个等着被测量的"压强"。压强来自数十亿粒子不断敲打容器壁。每次碰撞都给壁一个微小的推力，无数推力叠加起来就是压强。',
          },
          action: { type: 'setParams', params: { temperature: 300, volume: 1, count: 40 } },
        },
        {
          id: 'intro-2',
          text: {
            en: 'The particles move in random directions at random speeds. The red ones happen to be moving faster than average — in a real gas there is always a spread.',
            zh: '粒子朝各个方向随机运动，速度也各不相同。红色的恰好比平均速度更快——真实气体中速度总是有分布的。',
          },
        },
      ],
    },
    {
      id: 'temperature',
      type: 'concept',
      title: { en: 'Heating speeds them up', zh: '加热让粒子更快' },
      lines: [
        {
          id: 'temp-1',
          text: {
            en: 'Now I raise the temperature. The particles speed up, hit the walls harder and more often, and the pressure gauge climbs — with the container exactly the same size.',
            zh: '现在我升高温度。粒子速度变快，撞击更猛、更频繁，压强表随之上升——而容器大小完全没变。',
          },
          action: { type: 'setParams', params: { temperature: 900, volume: 1, count: 40 } },
          pause: 1,
        },
        {
          id: 'temp-2',
          text: {
            en: 'Cool it right down instead and the motion nearly stops. At minus two hundred and seventy-three degrees Celsius — absolute zero — the particles would have the least kinetic energy possible. That is why the kelvin scale starts there.',
            zh: '反过来把它冷却下来，运动几乎停止。在零下二百七十三摄氏度——绝对零度——粒子的动能达到可能的最小值。这就是开尔文温标从这里起算的原因。',
          },
          action: { type: 'setParams', params: { temperature: 30, volume: 1, count: 40 } },
        },
      ],
    },
    {
      id: 'volume',
      type: 'interaction',
      title: { en: 'Squeezing without heating', zh: '不加热，只压缩' },
      lines: [
        {
          id: 'vol-1',
          text: {
            en: 'Back to room temperature, and this time I push the piston in. The particles are not moving any faster — but the walls are closer, so each particle hits them more often. Pressure rises again.',
            zh: '回到室温，这次我把活塞推进去。粒子速度并没有变快——但壁更近了，所以每个粒子撞壁更频繁。压强又上升了。',
          },
          action: { type: 'setParams', params: { temperature: 300, volume: 0.4, count: 40 } },
        },
        {
          id: 'vol-2',
          text: {
            en: 'Watch the p times V readout as I move the piston. Pressure changes, volume changes, but their product stays put. That is Boyle’s law, and you are watching the reason for it.',
            zh: '在我移动活塞时注意 p 乘 V 这个读数。压强在变，体积在变，但它们的乘积不变。这就是玻意耳定律——你正看着它成立的原因。',
          },
          pause: 1,
        },
      ],
    },
    {
      id: 'brownian',
      type: 'application',
      title: { en: 'Evidence you can see', zh: '看得见的证据' },
      lines: [
        {
          id: 'brownian-1',
          text: {
            en: 'Nobody has ever seen an air molecule. The evidence for all of this is Brownian motion: smoke particles under a microscope jitter about randomly, because invisible air molecules keep knocking into them from every side.',
            zh: '没有人见过空气分子。这一切的证据是布朗运动：显微镜下的烟尘颗粒无规则地颤动，因为看不见的空气分子从各个方向不断撞击它们。',
          },
        },
        {
          id: 'brownian-2',
          text: {
            en: 'Be careful with the wording in exams. The smoke particles are the microscopic particles you observe; the air molecules are what hit them. Swapping those two loses marks.',
            zh: '考试中措辞要小心。烟尘颗粒是你观察到的微粒；空气分子是撞击它们的东西。把两者说反会失分。',
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
          id: 'summary-1',
          text: {
            en: 'Explain gas pressure with collisions, always. Higher temperature means faster particles, so harder and more frequent collisions. Smaller volume means the same particles hit the walls more often. Never say the particles themselves expand.',
            zh: '解释气体压强，永远用碰撞来说。温度越高粒子越快，碰撞更猛更频繁；体积越小，同样的粒子撞壁更频繁。绝不要说粒子本身膨胀了。',
          },
        },
      ],
    },
  ],
}

export default gasNarration
