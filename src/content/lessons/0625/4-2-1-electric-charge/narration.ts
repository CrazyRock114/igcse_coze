import type { NarrationScript } from '@/content/types'

export const electricNarration: NarrationScript = {
  id: '4-2-1-electric-charge',
  sections: [
    {
      id: 'intro',
      type: 'intro',
      title: { en: 'Only electrons move', zh: '移动的只有电子' },
      lines: [
        {
          id: 'intro-1',
          text: {
            en: 'There are two kinds of charge, positive and negative. Like charges repel, unlike charges attract. But when you charge something by rubbing it, only one of them actually moves — electrons.',
            zh: '电荷有正负两种。同种相斥，异种相吸。但摩擦起电时真正移动的只有一种——电子。',
          },
          action: { type: 'setParams', params: { setup: 0, lineCount: 10, charge: 1 } },
        },
        {
          id: 'intro-2',
          text: {
            en: 'Rub a polythene rod with a cloth and electrons transfer from the cloth to the rod. The rod becomes negative and the cloth positive. Protons never move — they are locked in the nuclei. Saying "positive charge moved across" loses marks.',
            zh: '用布摩擦聚乙烯棒，电子从布转移到棒上。棒带负电，布带正电。质子从不移动——它们被锁在原子核里。答"正电荷转移过去"会失分。',
          },
        },
      ],
    },
    {
      id: 'field',
      type: 'concept',
      title: { en: 'A field is a region of force', zh: '场是受力的区域' },
      lines: [
        {
          id: 'field-1',
          text: {
            en: 'An electric field is a region where a charge feels a force. We draw it with field lines, and the direction is defined as the force on a *positive* charge — so the lines point away from positive and towards negative.',
            zh: '电场是电荷会受力的区域。我们用电场线表示它，方向定义为正电荷所受的力——所以电场线从正电荷指出、指向负电荷。',
          },
        },
        {
          id: 'field-2',
          text: {
            en: 'Look how the lines spread apart as they get further from the charge. That spreading is the field getting weaker — exactly the same convention as magnetic field lines.',
            zh: '注意电场线离电荷越远越分散。这种分散表示场在减弱——和磁感线的约定完全一样。',
          },
        },
      ],
    },
    {
      id: 'sphere',
      type: 'interaction',
      title: { en: 'Inside a conductor, nothing', zh: '导体内部没有场' },
      lines: [
        {
          id: 'sphere-1',
          text: {
            en: 'Now a charged metal sphere. Outside it, the pattern is identical to a point charge — you could not tell them apart from the field alone.',
            zh: '现在换成带电金属球。在它外部，场的分布和点电荷完全相同——单看电场你分辨不出两者。',
          },
          action: { type: 'setParams', params: { setup: 1, lineCount: 10, charge: 1 } },
        },
        {
          id: 'sphere-2',
          text: {
            en: 'But the lines start at the surface, not at the centre. Inside a charged conductor there is no field at all, because the charges spread out over the outside and their fields cancel within.',
            zh: '但电场线起始于表面，而不是球心。带电导体内部完全没有电场，因为电荷都分布在外表面，其场在内部相互抵消。',
          },
          pause: 1,
        },
      ],
    },
    {
      id: 'plates',
      type: 'application',
      title: { en: 'Parallel plates make it uniform', zh: '平行板产生匀强电场' },
      lines: [
        {
          id: 'plates-1',
          text: {
            en: 'Here is the arrangement that matters most. Two parallel plates, one positive and one negative. Between them the lines are straight, parallel and evenly spaced.',
            zh: '这是最重要的装置。两块平行板，一正一负。它们之间的电场线是直的、平行的、间距均匀的。',
          },
          action: { type: 'setParams', params: { setup: 3, lineCount: 10, charge: 1 } },
        },
        {
          id: 'plates-2',
          text: {
            en: 'Evenly spaced means the field has the same strength everywhere between them. That is a uniform field, and the readings confirm it — the strength at the centre and off to one side agree.',
            zh: '间距均匀意味着两板之间各处场强相同。这就是匀强电场，读数也证实了这一点——中心与偏侧的场强一致。',
          },
        },
        {
          id: 'plates-3',
          text: {
            en: 'Look at the very edges, though, where the lines bulge outwards. That is fringing, and it is why the syllabus says end effects will not be examined — the uniform result only holds well inside.',
            zh: '不过看最边缘，电场线向外鼓出。这是边缘效应，也是考纲说明不考端部效应的原因——匀强的结论只在内部成立。',
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
            en: 'Charging is always electron transfer. Field lines run from positive to negative, never cross, and spread out where the field is weaker. Between parallel plates they are straight, parallel and evenly spaced.',
            zh: '起电永远是电子转移。电场线从正到负、永不相交、场弱处更疏。平行板之间的电场线是直的、平行的、间距均匀的。',
          },
        },
      ],
    },
  ],
}

export default electricNarration
