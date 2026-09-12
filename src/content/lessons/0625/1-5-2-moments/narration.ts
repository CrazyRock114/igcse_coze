import type { NarrationScript } from '@/content/types'

export const momentsNarration: NarrationScript = {
  id: '1-5-2-moments',
  sections: [
    {
      id: 'intro',
      type: 'intro',
      title: { en: 'Distance matters as much as force', zh: '距离和力一样重要' },
      lines: [
        {
          id: 'intro-1',
          text: {
            en: 'A small child can balance a heavy adult on a see-saw — as long as the child sits far enough out. Turning effect does not depend on force alone; it depends on force and distance together.',
            zh: '一个小孩可以在跷跷板上把大人跷起来——只要他坐得足够远。转动效果不只取决于力，而取决于力与距离的乘积。',
          },
          action: {
            type: 'setParams',
            params: { leftMass: 2, leftDistance: 0.2, rightMass: 1, rightDistance: 0.4 },
          },
        },
        {
          id: 'intro-2',
          text: {
            en: 'The beam is level right now, but the two masses are different — two kilograms on the left, one on the right. The lighter mass sits twice as far out, and that is enough.',
            zh: '现在杠杆是水平的，但两边质量不同——左边两千克，右边一千克。较轻的质量位置远了一倍，这就足够了。',
          },
        },
      ],
    },
    {
      id: 'definition',
      type: 'equation',
      title: { en: 'Moment of a force', zh: '力矩' },
      lines: [
        {
          id: 'def-1',
          text: {
            en: 'The moment of a force is the force multiplied by the perpendicular distance from the pivot. Two kilograms weighs about twenty newtons, so at nought point two metres that is a moment of about four newton metres — the same on both sides.',
            zh: '力矩等于力乘以到支点的垂直距离。两千克重约二十牛顿，在零点二米处力矩约为四牛顿米——两边相同。',
          },
          latex: '\\text{moment} = F \\times d',
        },
      ],
    },
    {
      id: 'unbalance',
      type: 'interaction',
      title: { en: 'Break the balance', zh: '打破平衡' },
      lines: [
        {
          id: 'unbal-1',
          text: {
            en: 'Watch what happens when I slide the right-hand mass inwards without changing its weight at all. The beam tips left, because the right-hand moment has shrunk.',
            zh: '看我把右边的质量向内移动，完全不改变它的重量。杠杆向左倾斜，因为右边的力矩变小了。',
          },
          action: {
            type: 'setParams',
            params: { leftMass: 2, leftDistance: 0.2, rightMass: 1, rightDistance: 0.15 },
          },
        },
        {
          id: 'unbal-2',
          text: {
            en: 'Nothing about the masses changed — only a distance. That is the whole idea behind spanners, wheelbarrows, scissors and door handles: move the force further from the pivot and you get more turning effect for free.',
            zh: '质量没有任何变化——只改了距离。这就是扳手、独轮车、剪刀和门把手背后的道理：让力离支点更远，就能免费得到更大的转动效果。',
          },
          pause: 1,
        },
      ],
    },
    {
      id: 'equilibrium',
      type: 'concept',
      title: { en: 'The condition for equilibrium', zh: '平衡的条件' },
      lines: [
        {
          id: 'eq-1',
          text: {
            en: 'An object is in equilibrium when there is no resultant force and no resultant moment. For this beam, that means the clockwise moment equals the anticlockwise moment.',
            zh: '当合力为零且合力矩为零时，物体处于平衡。对这根杠杆来说，就是顺时针力矩等于逆时针力矩。',
          },
          action: {
            type: 'setParams',
            params: { leftMass: 3, leftDistance: 0.1, rightMass: 1, rightDistance: 0.3 },
          },
        },
        {
          id: 'eq-2',
          text: {
            en: 'In an exam this becomes an equation you can solve. Write down both moments, set them equal, and make the unknown the only thing left.',
            zh: '在考试中这会变成一个可解的方程。写出两边力矩，令其相等，把未知量单独留下。',
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
            en: 'Always use the perpendicular distance from the pivot, and always convert centimetres to metres before you multiply. Then set clockwise equal to anticlockwise and solve.',
            zh: '一定用到支点的垂直距离，一定先把厘米换成米再相乘。然后令顺时针等于逆时针，解出未知量。',
          },
        },
      ],
    },
  ],
}

export default momentsNarration
