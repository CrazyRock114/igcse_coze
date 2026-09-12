import type { NarrationScript } from '@/content/types'

export const statesNarration: NarrationScript = {
  id: '1-1-states-of-matter',
  sections: [
    {
      id: 'three',
      type: 'intro',
      title: { en: 'Three states, one difference', zh: '三态，一个区别' },
      lines: [
        {
          id: 'th-1',
          text: {
            en: 'A solid has a fixed shape and a fixed volume. A liquid has a fixed volume but takes the shape of its container. A gas has neither — it fills whatever it is put in, and unlike the other two it can be squeezed into a smaller space.',
            zh: '固体有固定的形状和固定的体积。液体有固定的体积，但形状随容器而定。气体两者都没有——它充满所放入的任何容器，而且与另外两者不同，它可以被压缩到更小的空间。',
          },
        },
        {
          id: 'th-2',
          text: {
            en: 'Every one of those properties comes from three things about the particles: how they are arranged, how far apart they are, and how they move. Nothing else changes. The particles themselves are identical in all three states — ice, water and steam are the same molecules.',
            zh: '所有这些性质都来自粒子的三个方面：如何排列、相距多远、如何运动。除此之外没有任何变化。三态中的粒子本身完全相同——冰、水和水蒸气是同样的分子。',
          },
        },
        {
          id: 'th-3',
          text: {
            en: 'In a solid the particles are packed closely in a regular pattern and can only vibrate about fixed positions. Closely packed gives the fixed volume; fixed positions give the fixed shape.',
            zh: '固体中粒子紧密排列成规则结构，只能在固定位置附近振动。紧密排列带来固定体积；位置固定带来固定形状。',
          },
        },
        {
          id: 'th-4',
          text: {
            en: 'In a liquid they are still close together — which is why the volume is still fixed — but the arrangement is now irregular and they can slide past one another. Sliding is what lets a liquid pour and take the shape of its container.',
            zh: '液体中粒子仍然靠得很近——所以体积仍然固定——但排列变得不规则，粒子可以相互滑动。正是这种滑动使液体能够倾倒并随容器改变形状。',
          },
        },
        {
          id: 'th-5',
          text: {
            en: 'In a gas they are far apart, randomly arranged, and moving quickly in all directions. Far apart is why a gas can be compressed: there is empty space to squeeze out. You cannot compress a liquid, because there is almost nothing between the particles to remove.',
            zh: '气体中粒子相距很远，排列随机，并向各个方向快速运动。相距远正是气体能被压缩的原因：有空隙可以挤掉。液体压不动，因为粒子之间几乎没有可以挤出的空间。',
          },
        },
      ],
    },
    {
      id: 'changes',
      type: 'interaction',
      title: { en: 'Why the thermometer stops', zh: '温度计为什么会停住' },
      lines: [
        {
          id: 'ch-1',
          text: {
            en: 'Melting is solid to liquid, freezing is liquid to solid, boiling is liquid to gas and condensing is gas to liquid. Evaporation is also liquid to gas, but it happens at the surface and at any temperature — only the fastest particles escape, which is why a puddle dries without ever reaching a hundred degrees.',
            zh: '熔化是固→液，凝固是液→固，沸腾是液→气，凝结是气→液。蒸发同样是液→气，但它只发生在表面且任何温度下都能发生——只有运动最快的粒子逃逸，所以水洼不必达到 100 度就能变干。',
          },
          action: {
            type: 'setParams',
            params: { meltingPoint: 0, boilingPoint: 100, temperature: 25, pressure: 1 },
          },
        },
        {
          id: 'ch-2',
          text: {
            en: 'Now look at the upper graph, which is a substance being heated steadily from cold. The temperature climbs, then stops dead. Climbs again, stops dead again. Those two flat stretches are the melting point and the boiling point, and they are the interesting part.',
            zh: '现在看上面那幅图，表示一种物质从低温开始被稳定加热。温度上升，然后突然停住。再上升，再停住。这两段水平线就是熔点和沸点，也正是有意思的地方。',
          },
        },
        {
          id: 'ch-3',
          text: {
            en: 'Energy is still going in during a flat stretch — the heater has not been turned off. So where is it going? Into pulling the particles apart, against the forces holding them together. And temperature is a measure of how fast the particles are moving, so while the energy is being spent on separating them rather than speeding them up, the temperature cannot rise at all.',
            zh: '在水平段里能量仍在输入——加热器并没有关掉。那能量去哪了？去克服粒子间的作用力、把粒子分开了。而温度衡量的是粒子运动的快慢，所以当能量被用于分离粒子而不是加速粒子时，温度根本无法上升。',
          },
        },
        {
          id: 'ch-4',
          text: {
            en: 'Notice how much longer the second flat stretch is. Melting only has to loosen the particles enough to slide; boiling has to separate them completely, and pull each one right out of the liquid. That takes several times as much energy, and it is why a pan takes minutes to boil dry after it reaches a hundred degrees.',
            zh: '注意第二段水平线长得多。熔化只需要把粒子松动到能够滑动；沸腾则必须把它们彻底分开，把每一个都从液体中拉出来。这需要数倍的能量，也正因如此，锅达到 100 度后还要好几分钟才会烧干。',
          },
        },
        {
          id: 'ch-5',
          text: {
            en: 'Try ethanol, which melts at minus a hundred and fourteen and boils at seventy-eight. The whole curve shifts, but the shape does not change at all — two flat stretches, the second much longer, whatever the substance.',
            zh: '试试乙醇，它在 −114 °C 熔化、78 °C 沸腾。整条曲线平移了，但形状完全没变——不论什么物质，都是两段水平线，而且第二段长得多。',
          },
          action: {
            type: 'setParams',
            params: { meltingPoint: -114, boilingPoint: 78, temperature: 25, pressure: 1 },
          },
        },
        {
          id: 'ch-6',
          text: {
            en: 'And oxygen, which melts at minus two hundred and eighteen and boils at minus a hundred and eighty-three. At room temperature it is well past the end of its curve, which is exactly why we meet it as a gas. There is nothing special about oxygen being a gas — it is simply a substance whose boiling point is a long way below the temperature we happen to live at.',
            zh: '再看氧，它在 −218 °C 熔化、−183 °C 沸腾。在室温下它已远远越过曲线的末端，这正是我们见到的它是气体的原因。氧是气体并没有什么特别之处——它只是一种沸点远低于我们所处温度的物质。',
          },
          action: {
            type: 'setParams',
            params: { meltingPoint: -218, boilingPoint: -183, temperature: 25, pressure: 1 },
          },
        },
      ],
    },
    {
      id: 'gas',
      type: 'interaction',
      title: { en: 'Squeezing and heating a gas', zh: '压缩与加热气体' },
      lines: [
        {
          id: 'ga-1',
          text: {
            en: 'The lower graph is a fixed amount of gas — one mole. Raise the temperature and the volume rises in a straight line. The particles are moving faster, so they hit the walls harder and more often, and they push the walls further out.',
            zh: '下面那幅图是一定量的气体——1 摩尔。提高温度，体积沿直线上升。粒子运动更快，撞击器壁更有力也更频繁，于是把器壁推得更远。',
          },
          action: {
            type: 'setParams',
            params: { meltingPoint: 0, boilingPoint: 100, temperature: 25, pressure: 1 },
          },
        },
        {
          id: 'ga-2',
          text: {
            en: 'Now double the pressure and the whole line drops to half its height. Squeezing harder pushes the particles closer together until they are hitting the walls often enough to push back just as hard. At twenty-five degrees and one atmosphere a mole of any gas takes up twenty-four cubic decimetres — a number worth remembering, because it comes back in the mole calculations.',
            zh: '现在把压强加倍，整条直线降到原来高度的一半。加大压力把粒子挤得更近，直到它们撞击器壁的频率足以产生同样大的反推力。在 25 °C、1 个大气压下，任何气体 1 摩尔都占 24 立方分米——这个数字值得记住，因为它在摩尔计算中还会出现。',
          },
          action: {
            type: 'setParams',
            params: { meltingPoint: 0, boilingPoint: 100, temperature: 25, pressure: 2 },
          },
        },
        {
          id: 'ga-3',
          text: {
            en: 'One caution about the left-hand end of that line. It runs down to zero volume at minus two hundred and seventy-three degrees, which is absolute zero — but no real gas ever gets there. It condenses to a liquid long before, and a liquid does not shrink to nothing. That part of the line is where the gas would be if it stayed a gas, which it does not.',
            zh: '关于这条线左端有一点要提醒。它一直降到 −273 °C 处体积为零，那就是绝对零度——但没有任何真实气体能到达那里。它远在此前就已凝结成液体，而液体不会缩成零。那一段表示的是"假如它仍是气体"的情形，而实际上并非如此。',
          },
          action: {
            type: 'setParams',
            params: { meltingPoint: 0, boilingPoint: 100, temperature: -200, pressure: 1 },
          },
        },
      ],
    },
    {
      id: 'diffusion',
      type: 'concept',
      title: { en: 'Why you can smell it from across the room', zh: '为什么隔着房间也能闻到' },
      lines: [
        {
          id: 'di-1',
          text: {
            en: 'Open a bottle of something strong-smelling at one end of a room and after a while it can be smelled at the other. That is diffusion: the net movement of particles from a region of higher concentration to a region of lower concentration, until they are spread evenly.',
            zh: '在房间一端打开一瓶气味浓烈的东西，过一会儿另一端也能闻到。这就是扩散：粒子从浓度较高处向浓度较低处的净移动，直到均匀分布。',
          },
        },
        {
          id: 'di-2',
          text: {
            en: 'Nothing is pushing them. Gas particles are moving quickly and randomly in all directions anyway, and with more of them on one side, more happen to wander outwards than inwards. Heat the gas and it happens faster, because the particles are moving faster.',
            zh: '并没有什么在推它们。气体粒子本来就在各个方向快速随机运动，而由于一侧的粒子更多，向外游走的就比向内的多。加热气体则更快，因为粒子运动得更快。',
          },
        },
        {
          id: 'di-3',
          text: {
            en: 'There is a neat consequence. At the same temperature, all gas particles have on average the same kinetic energy — so a heavier particle must be moving more slowly to have it. Lighter molecules therefore diffuse faster, and the lower the relative molecular mass, the faster the gas spreads.',
            zh: '由此有一个漂亮的推论。在相同温度下，所有气体粒子的平均动能相同——因此较重的粒子必然运动得较慢才能具有同样的动能。于是较轻的分子扩散更快，相对分子质量越小，气体扩散得越快。',
          },
        },
        {
          id: 'di-4',
          text: {
            en: 'The classic demonstration puts cotton wool soaked in concentrated ammonia at one end of a long glass tube and concentrated hydrochloric acid at the other. A white ring of ammonium chloride forms where the two meet — and it forms well past the middle, nearer the acid end, because ammonia has a relative molecular mass of seventeen and hydrogen chloride thirty-six and a half. The lighter gas travelled further in the same time.',
            zh: '经典演示是在长玻璃管一端放浸过浓氨水的棉花，另一端放浓盐酸。两者相遇处会生成白色的氯化铵环——而这个环明显偏离中点，靠近盐酸那一端，因为氨的相对分子质量是 17，而氯化氢是 36.5。在相同时间内，较轻的气体走得更远。',
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
            en: 'Describe each state by arrangement, separation and motion. Solid: regular, close, vibrating in place. Liquid: irregular, close, sliding. Gas: random, far apart, fast in all directions.',
            zh: '按排列、间距、运动来描述每一种状态。固体：规则、紧密、原位振动。液体：不规则、紧密、相互滑动。气体：随机、相距远、各方向快速运动。',
          },
        },
        {
          id: 'sum-2',
          text: {
            en: 'During a change of state the temperature stays constant because the energy is separating particles rather than speeding them up. Boiling needs far more energy than melting.',
            zh: '物态变化过程中温度保持不变，因为能量用于分离粒子而不是加速粒子。沸腾所需能量远多于熔化。',
          },
        },
        {
          id: 'sum-3',
          text: {
            en: 'Heating a gas increases its volume; increasing the pressure decreases it — explain both by what the particles are doing to the walls. And lighter molecules diffuse faster, because at the same temperature they move faster.',
            zh: '加热使气体体积增大，加压使其减小——两者都用粒子对器壁的作用来解释。较轻的分子扩散更快，因为在相同温度下它们运动得更快。',
          },
        },
      ],
    },
  ],
}

export default statesNarration
