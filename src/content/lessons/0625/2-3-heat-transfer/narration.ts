import type { NarrationScript } from '@/content/types'

export const coolingNarration: NarrationScript = {
  id: '2-3-heat-transfer',
  sections: [
    {
      id: 'intro',
      type: 'intro',
      title: { en: 'Three ways energy escapes', zh: '能量逃逸的三条路' },
      lines: [
        {
          id: 'intro-1',
          text: {
            en: 'Leave a hot drink on the table and it cools. Energy is leaving it three ways at once: conduction through whatever it touches, convection in the air above it, and radiation straight off its surface.',
            zh: '把热饮放在桌上，它会变凉。能量同时通过三条路离开：经接触物的传导、上方空气的对流，以及直接从表面发出的辐射。',
          },
          action: {
            type: 'setParams',
            params: { startTemp: 80, roomTemp: 20, surface: 0, area: 1, lagging: 0, duration: 40 },
          },
        },
        {
          id: 'intro-2',
          text: {
            en: 'Notice the shape. It falls steeply at first, then flattens out. The bigger the temperature difference from the room, the faster the energy escapes — so cooling slows down as it goes.',
            zh: '注意曲线形状：先陡降，后趋平。与室温的温差越大，能量逃逸越快——所以冷却过程会越来越慢。',
          },
        },
      ],
    },
    {
      id: 'conduction',
      type: 'concept',
      title: { en: 'Conduction needs contact', zh: '传导需要接触' },
      lines: [
        {
          id: 'cond-1',
          text: {
            en: 'In conduction, energy passes along without the material itself moving. In all solids the particles vibrate and jostle their neighbours. In metals there is a second, much faster route: free electrons carrying energy through the lattice.',
            zh: '传导中能量沿物质传递，而物质本身不移动。所有固体中粒子都在振动并推挤邻近粒子。金属还有第二条快得多的通道：自由电子在晶格中携带能量。',
          },
        },
        {
          id: 'cond-2',
          text: {
            en: 'That second route is why metals feel cold — they conduct energy out of your hand fast. Gases conduct badly because their particles are far apart and rarely collide, which is why trapped air is such a good insulator.',
            zh: '正是这第二条通道让金属摸起来发凉——它把能量迅速从你手上导走。气体导热差，因为粒子相距远、碰撞少，所以封闭空气是极好的绝热材料。',
          },
        },
        {
          id: 'cond-3',
          text: {
            en: 'Add lagging and watch the curve flatten. The lagging works by trapping still air, not by being special in itself.',
            zh: '加上保温层，看曲线变平。保温层起作用靠的是封住不流动的空气，而不是材料本身有什么特别。',
          },
          action: {
            type: 'setParams',
            params: { startTemp: 80, roomTemp: 20, surface: 0, area: 1, lagging: 1, duration: 40 },
          },
          pause: 1,
        },
      ],
    },
    {
      id: 'convection',
      type: 'concept',
      title: { en: 'Convection carries the fluid', zh: '对流靠流体本身搬运' },
      lines: [
        {
          id: 'conv-1',
          text: {
            en: 'Convection only happens in liquids and gases, because the material itself has to move. Warm the air near the cup and it expands, so it becomes less dense, so it rises. Cooler air sinks to replace it and a convection current forms.',
            zh: '对流只发生在液体和气体中，因为物质本身必须移动。杯边的空气受热膨胀、密度变小而上升，较冷的空气下沉补充，形成对流。',
          },
        },
        {
          id: 'conv-2',
          text: {
            en: 'This is why radiators go under windows and freezer compartments sit at the top. It also explains why convection cannot happen in a solid — the particles are locked in place.',
            zh: '这就是暖气片装在窗下、冷冻室置于顶部的原因。这也解释了固体中为何不能发生对流——粒子被固定在原位。',
          },
        },
      ],
    },
    {
      id: 'radiation',
      type: 'interaction',
      title: { en: 'Radiation needs nothing at all', zh: '辐射什么都不需要' },
      lines: [
        {
          id: 'rad-1',
          text: {
            en: 'Radiation is infrared, and it is the only one of the three that crosses a vacuum. That is how the Sun’s energy reaches us across empty space.',
            zh: '辐射就是红外线，也是三者中唯一能穿过真空的。太阳的能量正是这样穿越空旷空间抵达我们。',
          },
        },
        {
          id: 'rad-2',
          text: {
            en: 'Now switch the surface to shiny silver. The grey reference curve is still the dull black one, and look at the gap — the silver object stays clearly hotter for the whole experiment.',
            zh: '现在把表面换成光亮银色。灰色参照线仍是粗糙黑色的曲线，看两者的差距——银色物体在整个实验中都明显更热。',
          },
          action: {
            type: 'setParams',
            params: { startTemp: 80, roomTemp: 20, surface: 1, area: 1, lagging: 0, duration: 40 },
          },
        },
        {
          id: 'rad-3',
          text: {
            en: 'Two things matter, and you must keep them apart: colour and texture. Dark beats light, and dull beats shiny. Shiny silver loses on both counts, which is exactly why a vacuum flask is silvered inside.',
            zh: '有两个因素，必须分开讨论：颜色和粗糙度。深色胜过浅色，粗糙胜过光亮。光亮银色两项都最差——这正是保温瓶内壁镀银的原因。',
          },
        },
        {
          id: 'rad-4',
          text: {
            en: 'Surface area matters too. Triple the area and the cooling gets much faster, which is why radiators have fins and elephants have large ears.',
            zh: '表面积同样重要。面积增至三倍，冷却快得多——这就是散热器带散热片、大象长着大耳朵的原因。',
          },
          action: {
            type: 'setParams',
            params: { startTemp: 80, roomTemp: 20, surface: 0, area: 3, lagging: 0, duration: 40 },
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
            en: 'Name the mechanism and say why it applies. Conduction needs contact, convection needs a fluid that can move, radiation needs nothing. And for a surface question, always deal with colour and texture separately.',
            zh: '说出传热方式并说明理由。传导需要接触，对流需要能流动的流体，辐射什么都不需要。遇到表面问题，颜色和粗糙度一定要分开讨论。',
          },
        },
      ],
    },
  ],
}

export default coolingNarration
