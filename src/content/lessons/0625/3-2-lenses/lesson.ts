import type { Lesson } from '@/content/types'
import narration from './narration'

const lesson: Lesson = {
  slug: '3-2-lenses',
  subject: '0625',
  syllabus: [
    '0625.3.2.1.1',
    '0625.3.2.1.2',
    '0625.3.2.1.3',
    '0625.3.2.1.4',
    '0625.3.2.3.1',
    '0625.3.2.3.2',
    '0625.3.2.3.3',
    '0625.3.2.3.4',
    '0625.3.2.3.5',
    '0625.3.2.3.6',
    '0625.3.2.3.7',
    '0625.3.2.3.8',
    '0625.3.2.4.1',
    '0625.3.2.4.2',
    '0625.3.2.4.3',
  ],
  tier: 'extended',
  estimatedMinutes: 60,

  title: { en: 'Reflection, lenses and dispersion', zh: '反射、透镜与色散' },
  summary: {
    en: 'Walk the object across the principal focus and the image flips from real and inverted to virtual and upright. All four descriptions follow from that one distance.',
    zh: '把物体移过焦点，像就从实像倒立翻转为虚像正立。四项描述全都由这一个距离决定。',
  },

  objectives: [
    {
      en: 'Define and use normal, angle of incidence and angle of reflection, and use the law of reflection.',
      zh: '定义并使用法线、入射角与反射角，并应用反射定律。',
    },
    {
      en: 'Describe the image formed by a plane mirror and use constructions for it. (Extended)',
      zh: '描述平面镜所成的像，并用作图法处理平面镜问题。（Extended）',
    },
    {
      en: 'Describe the action of converging and diverging lenses, and define focal length, principal axis and principal focus.',
      zh: '描述凸透镜与凹透镜的作用，并定义焦距、主光轴与焦点。',
    },
    {
      en: 'Draw and use ray diagrams for real and virtual images in a converging lens. (Extended)',
      zh: '绘制并使用凸透镜成实像与虚像的光路图。（Extended）',
    },
    {
      en: 'Describe an image as enlarged or diminished, upright or inverted, real or virtual.',
      zh: '把像描述为放大或缩小、正立或倒立、实像或虚像。',
    },
    {
      en: 'Describe the use of a single lens as a magnifying glass, and lens correction of long- and short-sightedness. (Extended)',
      zh: '描述单透镜作为放大镜的用途，以及用透镜矫正远视与近视。（Extended）',
    },
    {
      en: 'Describe dispersion of white light by a prism and know the seven colours in order.',
      zh: '描述棱镜对白光的色散，并按顺序掌握七种颜色。',
    },
  ],

  glossary: [
    {
      en: 'normal',
      zh: '法线',
      definition: {
        en: 'The line perpendicular to a surface at the point where a ray meets it. Every angle in optics is measured from it.',
        zh: '在光线与表面相交处垂直于表面的直线。光学中所有的角都从它量起。',
      },
      syllabus: ['0625.3.2.1.1'],
    },
    {
      en: 'principal focus',
      zh: '焦点',
      definition: {
        en: 'The point at which a converging lens brings a parallel beam together. Its distance from the lens is the focal length.',
        zh: '凸透镜把平行光束会聚到的那一点。它到透镜的距离就是焦距。',
      },
      syllabus: ['0625.3.2.3.2'],
    },
    {
      en: 'real image',
      zh: '实像',
      definition: {
        en: 'One where the rays actually meet, so it can be caught on a screen. Always inverted with a single converging lens.',
        zh: '光线真正相交处所成的像，可以用屏幕接收。单个凸透镜所成的实像总是倒立的。',
      },
      syllabus: ['0625.3.2.3.3'],
    },
    {
      en: 'virtual image',
      zh: '虚像',
      definition: {
        en: 'One found by extrapolating diverging rays backwards. No light is there, so it cannot be caught on a screen.',
        zh: '把发散的光线反向延长所确定的像。那里没有光，因此无法用屏幕接收。',
      },
      syllabus: ['0625.3.2.3.5'],
    },
    {
      en: 'dispersion',
      zh: '色散',
      definition: {
        en: 'The splitting of white light into colours by a prism, because each colour is refracted by a different amount.',
        zh: '棱镜把白光分成各种颜色，因为每种颜色被折射的程度不同。',
      },
      syllabus: ['0625.3.2.4.1'],
    },
    {
      en: 'monochromatic',
      zh: '单色的',
      definition: {
        en: 'Light of a single frequency. A prism cannot disperse it, because there is nothing to separate.',
        zh: '单一频率的光。棱镜无法使它色散，因为没有什么可以分开。',
      },
      syllabus: ['0625.3.2.4.3'],
    },
  ],

  equations: [
    {
      latex: '\\dfrac{1}{f} = \\dfrac{1}{u} + \\dfrac{1}{v}',
      meaning: {
        en: 'The thin lens equation. A negative v means the image is virtual — on the same side as the object, where no light actually is.',
        zh: '薄透镜公式。v 为负表示成虚像——与物体同侧，而那里实际上没有光。',
      },
      substitute: (r) =>
        `v = ${r['imageDistance'] ?? 0}\\ \\mathrm{cm} \\quad f = ${r['focalPoint'] ?? 0}\\ \\mathrm{cm}`,
    },
    {
      latex: 'm = \\dfrac{v}{u} = \\dfrac{h_{i}}{h_{o}}',
      meaning: {
        en: 'Magnification. Greater than one means enlarged, less than one diminished — and the sign carries whether it is inverted.',
        zh: '放大率。大于 1 为放大，小于 1 为缩小——正负号则表示是否倒立。',
      },
      substitute: (r) =>
        `m = ${r['magnification'] ?? 0} \\quad h_{i} = ${r['imageHeight'] ?? 0}\\ \\mathrm{cm}`,
    },
  ],

  sim: {
    primitive: 'plot2d',
    kernel: '3-2-lenses',
    hint: {
      en: 'Bring the object in from far away, past 2f, past f — and watch the image distance go negative.',
      zh: '把物体从远处逐渐移近，越过 2f，再越过 f——看像距如何变为负值。',
    },
    params: [
      {
        key: 'objectDistance',
        label: { en: 'Distance from object to lens', zh: '物体到透镜的距离' },
        unit: 'cm',
        min: 1,
        max: 100,
        step: 1,
        default: 30,
      },
      {
        key: 'focalLength',
        label: { en: 'Focal length of the lens', zh: '透镜的焦距' },
        unit: 'cm',
        min: 2,
        max: 40,
        step: 1,
        default: 10,
      },
      {
        key: 'objectHeight',
        label: { en: 'Height of the object', zh: '物体的高度' },
        unit: 'cm',
        min: 0.5,
        max: 10,
        step: 0.5,
        default: 2,
      },
    ],
    readouts: [
      {
        key: 'imageDistance',
        label: { en: 'Image distance', zh: '像距' },
        unit: 'cm',
        sigFigs: 4,
        exact: true,
      },
      {
        key: 'magnification',
        label: { en: 'Magnification', zh: '放大率' },
        unit: '×',
        sigFigs: 3,
        exact: true,
      },
      {
        key: 'imageHeight',
        label: { en: 'Height of the image', zh: '像的高度' },
        unit: 'cm',
        sigFigs: 3,
        exact: true,
      },
      {
        key: 'focalPoint',
        label: { en: 'Focal length', zh: '焦距' },
        unit: 'cm',
        sigFigs: 3,
        exact: true,
      },
    ],
    presets: [
      {
        label: { en: 'Beyond 2f: the camera', zh: '2f 之外：照相机' },
        params: { objectDistance: 40, focalLength: 10, objectHeight: 2 },
      },
      {
        label: { en: 'At exactly 2f', zh: '恰好在 2f' },
        params: { objectDistance: 20, focalLength: 10, objectHeight: 2 },
      },
      {
        label: { en: 'Between f and 2f: the projector', zh: 'f 与 2f 之间：投影仪' },
        params: { objectDistance: 15, focalLength: 10, objectHeight: 2 },
      },
      {
        label: { en: 'At the focus: no image', zh: '在焦点上：不成像' },
        params: { objectDistance: 10, focalLength: 10, objectHeight: 2 },
      },
      {
        label: { en: 'Inside f: the magnifying glass', zh: 'f 以内：放大镜' },
        params: { objectDistance: 5, focalLength: 10, objectHeight: 2 },
      },
      {
        label: { en: 'A very distant object', zh: '非常遥远的物体' },
        params: { objectDistance: 100, focalLength: 10, objectHeight: 2 },
      },
    ],
  },

  narration,

  checkpoints: [
    {
      id: '0625-3-2-cp1',
      syllabus: ['0625.3.2.3.4', '0625.3.2.3.5'],
      tier: 'extended',
      commandWord: 'Describe',
      marks: 4,
      stem: 'An object is placed 6 cm from a converging lens of focal length 10 cm. Describe the image formed, giving four characteristics, and explain why it cannot be caught on a screen.',
      markScheme: [
        { text: 'The image is virtual', marks: 1 },
        { text: 'It is upright and magnified', marks: 1 },
        { text: 'It is on the same side of the lens as the object', marks: 1 },
        {
          text: 'The refracted rays diverge and never actually meet, so no light arrives at the image position — it is found by extrapolating the rays backwards',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'The object is inside the focal length, which settles everything. And draw the construction rays behind the lens as dashed lines, because no light is there.',
        zh: '物体位于焦距以内，这就决定了一切。另外透镜后方的作图光线要画成虚线，因为那里没有光。',
      },
    },
    {
      id: '0625-3-2-cp2',
      syllabus: ['0625.3.2.3.3'],
      tier: 'core',
      commandWord: 'Describe',
      marks: 3,
      stem: 'An object is placed 30 cm from a converging lens of focal length 10 cm. Describe how you would draw a ray diagram to locate the image, naming the two rays you would use.',
      markScheme: [
        {
          text: 'Draw a ray from the top of the object parallel to the principal axis, which refracts through the principal focus on the far side',
          marks: 1,
        },
        {
          text: 'Draw a second ray from the top of the object through the centre of the lens, which continues undeviated',
          marks: 1,
        },
        {
          text: 'The top of the image is where the two refracted rays cross; drop a perpendicular to the axis to complete it',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Two rays are enough to locate a point; a third is a check. The ray through the centre goes straight on, which is what makes it the easy one to draw.',
        zh: '两条光线就足以确定一个点，第三条用于检验。过光心的光线沿直线前进，因此最容易画。',
      },
    },
    {
      id: '0625-3-2-cp3',
      syllabus: ['0625.3.2.1.2', '0625.3.2.1.4'],
      tier: 'extended',
      commandWord: 'Describe',
      marks: 4,
      stem: 'Describe the image formed by a plane mirror, giving four characteristics.',
      markScheme: [
        { text: 'The same size as the object', marks: 1 },
        { text: 'The same distance behind the mirror as the object is in front', marks: 1 },
        { text: 'Virtual — it cannot be caught on a screen', marks: 1 },
        { text: 'Laterally inverted — left and right are swapped', marks: 1 },
      ],
      examinerNote: {
        en: 'Four separate marks for four separate properties. "It looks the same" is not one of them.',
        zh: '四个不同的性质对应四个不同的得分点。"看起来一样"不算其中之一。',
      },
    },
    {
      id: '0625-3-2-cp4',
      syllabus: ['0625.3.2.3.8'],
      tier: 'extended',
      commandWord: 'Explain',
      marks: 3,
      stem: 'A short-sighted person cannot focus on distant objects. Explain the cause and how a lens corrects it.',
      markScheme: [
        {
          text: 'Light from a distant object is brought to a focus in front of the retina rather than on it',
          marks: 1,
        },
        {
          text: 'because the eyeball is too long, or the eye lens is too powerful',
          marks: 1,
        },
        {
          text: 'A diverging lens spreads the light out slightly before it enters the eye, so the focus moves back onto the retina',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Ask which way the focus needs to move and which lens moves it that way. Short sight focuses too early, so the correction must delay the focus.',
        zh: '要问：焦点需要往哪个方向移，哪种透镜能这样移动它。近视是聚焦得太早，因此矫正必须推迟聚焦。',
      },
    },
    {
      id: '0625-3-2-cp5',
      syllabus: ['0625.3.2.4.1', '0625.3.2.4.2'],
      tier: 'core',
      commandWord: 'Explain',
      marks: 3,
      stem: 'A narrow beam of white light passes through a glass prism and emerges as a band of colours. Explain what is happening, and state which colour is deviated most.',
      markScheme: [
        {
          text: 'White light is a mixture of all the colours of the visible spectrum',
          marks: 1,
        },
        {
          text: 'Each colour is refracted by a different amount as it enters and leaves the glass, so they emerge travelling in slightly different directions and separate — this is dispersion',
          marks: 1,
        },
        { text: 'Violet is deviated the most; red the least', marks: 1 },
      ],
      examinerNote: {
        en: 'The prism separates colours that were already there — it does not create them. And red least, violet most, which also tells you the order in the band.',
        zh: '棱镜分开的是本来就存在的颜色——它并不制造颜色。红光偏折最少、紫光最多，这也决定了光带中的排列顺序。',
      },
    },
    {
      id: '0625-3-2-cp6',
      syllabus: ['0625.3.2.3.7'],
      tier: 'extended',
      commandWord: 'Explain',
      marks: 2,
      stem: 'Explain why a converging lens used as a magnifying glass must be held closer to the object than its focal length.',
      markScheme: [
        {
          text: 'Only inside the focal length do the refracted rays diverge, so that the eye sees a virtual image',
          marks: 1,
        },
        {
          text: 'That virtual image is upright and magnified; beyond the focal length the image would be real and inverted instead',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'It is the one arrangement that gives an upright magnified image, which is the only kind useful for looking at something closely.',
        zh: '这是唯一能给出正立放大像的配置，而只有这种像才适合用来近距离观察。',
      },
    },
  ],
}

export default lesson
