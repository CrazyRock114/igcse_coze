import type { NarrationScript } from '@/content/types'

export const magnetismNarration: NarrationScript = {
  id: '4-1-magnetism',
  sections: [
    {
      id: 'intro',
      type: 'intro',
      title: { en: 'Field lines are a map', zh: '磁感线是一张地图' },
      lines: [
        {
          id: 'intro-1',
          text: {
            en: 'A magnetic field is a region where a magnetic pole feels a force. We draw it as field lines, and they are a map with two pieces of information in them: direction, and strength.',
            zh: '磁场是磁极会受到力的区域。我们用磁感线来表示它，这张地图包含两条信息：方向和强弱。',
          },
          action: { type: 'setParams', params: { setup: 0, lineCount: 8, strength: 1 } },
        },
        {
          id: 'intro-2',
          text: {
            en: 'Direction first. By convention the lines run out of the north pole and into the south pole — the direction of the force on a north pole placed at that point. The arrows are not decoration; exam questions ask you to add them.',
            zh: '先说方向。按约定，磁感线从北极出发、进入南极——也就是放在该点的北极所受力的方向。箭头不是装饰；考题会要求你把它画上。',
          },
        },
      ],
    },
    {
      id: 'spacing',
      type: 'concept',
      title: { en: 'Crowded lines mean a strong field', zh: '线密表示磁场强' },
      lines: [
        {
          id: 'spacing-1',
          text: {
            en: 'Now the second piece. Look at how tightly packed the lines are close to each pole, and how they spread out further away. That spacing is the field strength — crowded lines mean a strong field.',
            zh: '再说第二条。注意靠近磁极处磁感线多么密集，而远离时又如何散开。这个疏密就代表磁场强弱——线越密，磁场越强。',
          },
        },
        {
          id: 'spacing-2',
          text: {
            en: 'The readings confirm it: the field just off a pole is several times stronger than the field well away from the magnet. That is why the lines had to be drawn unevenly.',
            zh: '读数证实了这一点：紧靠磁极处的磁场比远离磁体处强好几倍。这就是磁感线必须画得疏密不均的原因。',
          },
        },
      ],
    },
    {
      id: 'poles',
      type: 'interaction',
      title: { en: 'Like poles repel', zh: '同极相斥' },
      lines: [
        {
          id: 'poles-1',
          text: {
            en: 'Put two north poles facing each other. The lines curve sharply away from each other and never cross — they cannot, because a compass at any point can only point one way.',
            zh: '把两个北极相对放置。磁感线急剧地互相避开，永不相交——它们不可能相交，因为任一点的小磁针只能指向一个方向。',
          },
          action: { type: 'setParams', params: { setup: 1, lineCount: 8, strength: 1 } },
        },
        {
          id: 'poles-2',
          text: {
            en: 'Between them is a neutral point, where the two fields cancel exactly. A compass placed there would not know which way to turn.',
            zh: '两者之间有一个中性点，两个磁场在此完全抵消。放在那里的小磁针不知该指向哪边。',
          },
          pause: 1,
        },
        {
          id: 'poles-3',
          text: {
            en: 'Swap one to a south pole and the picture changes completely. Now the lines run straight across from one pole to the other — that is attraction.',
            zh: '把一个换成南极，图像完全变了。现在磁感线从一极直接跨到另一极——这就是吸引。',
          },
          action: { type: 'setParams', params: { setup: 2, lineCount: 8, strength: 1 } },
        },
      ],
    },
    {
      id: 'current',
      type: 'application',
      title: { en: 'A current makes a field too', zh: '电流也能产生磁场' },
      lines: [
        {
          id: 'current-1',
          text: {
            en: 'Magnets are not the only source. A current in a straight wire makes a field of concentric circles round it. Point your right thumb along the current and your fingers curl the way the field goes.',
            zh: '磁体不是唯一的来源。直导线中的电流会在周围产生同心圆磁场。右手拇指指向电流方向，四指弯曲的方向就是磁场方向。',
          },
          action: { type: 'setParams', params: { setup: 3, lineCount: 5, strength: 1 } },
        },
        {
          id: 'current-2',
          text: {
            en: 'Notice the rings get further apart as they get bigger — the field weakens as you move away from the wire, just as it did with the magnet.',
            zh: '注意圆环越大间距越宽——离导线越远磁场越弱，和磁体的情形一样。',
          },
        },
        {
          id: 'current-3',
          text: {
            en: 'Now wind that wire into a coil. A solenoid gives a strong, almost uniform field down the middle, and outside it looks exactly like a bar magnet. That is an electromagnet — and unlike a permanent magnet, you can switch it off.',
            zh: '现在把导线绕成线圈。螺线管在内部产生强而近乎均匀的磁场，外部看起来则完全像一根条形磁铁。这就是电磁铁——与永磁体不同，它可以断电关闭。',
          },
          action: { type: 'setParams', params: { setup: 4, lineCount: 9, strength: 1 } },
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
            en: 'When you draw a field: arrows from N to S, lines closer together where the field is stronger, and never let two lines cross or touch. Those three things carry most of the marks.',
            zh: '画磁场时：箭头从 N 指向 S，磁场强处线更密，且绝不让两条线相交或接触。这三点占了大部分分数。',
          },
        },
      ],
    },
  ],
}

export default magnetismNarration
