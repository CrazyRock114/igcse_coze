import type { NarrationScript } from '@/content/types'

export const densityNarration: NarrationScript = {
  id: '1-3-mass-density',
  sections: [
    {
      id: 'massweight',
      type: 'interaction',
      title: { en: 'One of them travels, one does not', zh: '一个会变，一个不会' },
      lines: [
        {
          id: 'mw-1',
          text: {
            en: 'Mass is the quantity of matter in an object. It is measured in kilograms, and it is a property of the object itself — how much stuff is there.',
            zh: '质量是物体中物质的多少，以千克为单位。它是物体自身的属性——里面有多少东西。',
          },
          action: {
            type: 'setParams',
            params: { mass: 2, volume: 250, gravity: 9.8, fluidDensity: 1 },
          },
        },
        {
          id: 'mw-2',
          text: {
            en: 'Weight is not that. Weight is a force — the force of gravity acting on that mass — so it is measured in newtons, and it depends on where the object is.',
            zh: '重力不是这个。重力是一种力——重力场作用在质量上的力——因此以牛顿为单位，而且取决于物体所在的位置。',
          },
        },
        {
          id: 'mw-3',
          text: {
            en: 'Take the object to the Moon. Watch both graphs. The weight falls to about a sixth. The mass line does not move at all — and that flat line is the whole point, because it is easy to say "mass does not change" and quite another thing to see it beside a line that does.',
            zh: '把物体带到月球，看两张图。重力降到约六分之一。质量那条线纹丝不动——那条平直的线正是关键，因为嘴上说"质量不变"很容易，而把它放在一条确实在变的线旁边看，则是另一回事。',
          },
          action: {
            type: 'setParams',
            params: { mass: 2, volume: 250, gravity: 1.6, fluidDensity: 1 },
          },
          pause: 1,
        },
        {
          id: 'mw-4',
          text: {
            en: 'Now take it into free space, far from any star or planet. The weight is zero. The mass is still exactly what it was — there is still precisely as much matter there, and it would still be just as hard to push.',
            zh: '现在把它带到远离任何恒星或行星的自由空间。重力为零。质量却完全没变——那里的物质一点也没少，推动它依然一样费力。',
          },
          action: {
            type: 'setParams',
            params: { mass: 2, volume: 250, gravity: 0, fluidDensity: 1 },
          },
        },
        {
          id: 'mw-5',
          text: {
            en: 'The relationship is W equals m g, where g is the gravitational field strength — the force per unit mass, in newtons per kilogram. On Earth that is about 9.8, on the Moon 1.6, on Jupiter nearly 25.',
            zh: '它们的关系是 W = mg，其中 g 是重力场强度——单位质量所受的力，单位是牛每千克。地球上约为 9.8，月球上是 1.6，木星上接近 25。',
          },
        },
        {
          id: 'mw-6',
          text: {
            en: 'And there is a neat consequence for measuring. A balance that compares two masses — a beam balance — gives the same reading on the Moon, because gravity pulls on both pans equally and cancels out. A spring balance measures force, so it reads a sixth. Which instrument you use decides which quantity you get.',
            zh: '这带来一个巧妙的推论。比较两个质量的天平——杠杆天平——在月球上读数不变，因为重力对两个托盘的作用相同、彼此抵消。弹簧秤测的是力，因此读数变为六分之一。用哪种仪器，决定了你测到的是哪个量。',
          },
        },
      ],
    },
    {
      id: 'density',
      type: 'interaction',
      title: { en: 'Mass packed into a space', zh: '装进一块空间里的质量' },
      lines: [
        {
          id: 'de-1',
          text: {
            en: 'Density is mass per unit volume: rho equals m over V. It says how tightly the matter is packed, and unlike weight it does not care where the object is — neither mass nor volume changes when you move it.',
            zh: '密度是单位体积的质量：ρ = m/V。它表示物质被装得有多紧密；与重力不同，它不在乎物体在哪里——移动物体既不改变质量也不改变体积。',
          },
          action: {
            type: 'setParams',
            params: { mass: 2, volume: 250, gravity: 9.8, fluidDensity: 1 },
          },
        },
        {
          id: 'de-2',
          text: {
            en: 'Measuring it depends on the shape. A liquid: weigh an empty measuring cylinder, pour in a known volume, weigh again, subtract. A regular solid: measure its dimensions and calculate the volume. An irregular solid: displacement — put it in water and read the rise.',
            zh: '测量方法取决于形状。液体：先称空量筒，倒入已知体积，再称一次，相减即可。规则固体：量出各边长度算出体积。不规则固体：用排水法——放进水中读取水面上升。',
          },
        },
        {
          id: 'de-3',
          text: {
            en: 'Watch the units, because this is where marks go. Mass in grams and volume in cubic centimetres gives grams per cubic centimetre. Two kilograms in two hundred and fifty cubic centimetres is eight grams per cubic centimetre — not nought point zero zero eight. Convert first.',
            zh: '要注意单位，因为这里最容易丢分。质量用克、体积用立方厘米，得到的是克每立方厘米。2 千克装在 250 立方厘米中，是 8 克每立方厘米——不是 0.008。要先换算。',
          },
        },
        {
          id: 'de-4',
          text: {
            en: 'Now floating. This object sinks in water. Change the fluid to mercury, at 13.6 grams per cubic centimetre, and it floats — and nothing about the object changed at all.',
            zh: '现在看浮沉。这个物体在水中下沉。把流体换成密度 13.6 克每立方厘米的汞，它就浮起来了——而物体本身丝毫未变。',
          },
          action: {
            type: 'setParams',
            params: { mass: 2, volume: 250, gravity: 9.8, fluidDensity: 13.6 },
          },
          pause: 1,
        },
        {
          id: 'de-5',
          text: {
            en: 'So the rule is never "denser than one" — it is denser than the fluid it is in. An object floats if its density is less than the fluid, sinks if it is greater. Steel sinks in water and floats on mercury. Oil floats on water. Ice floats on its own liquid, which is unusual and is why lakes freeze from the top.',
            zh: '因此规则从来不是"密度大于 1"——而是"密度大于它所处的流体"。物体的密度小于流体就浮，大于就沉。钢在水中下沉，在汞上漂浮。油浮在水上。冰浮在自己的液态之上，这很不寻常，也正是湖泊从表面开始结冰的原因。',
          },
        },
        {
          id: 'de-6',
          text: {
            en: 'And when it does float, the fraction submerged is the ratio of the densities. Ice is 0.92 and water is 1.00, so ice floats with ninety-two per cent below the surface. That is the iceberg, and it is why only a ninth of one shows.',
            zh: '当它确实浮起来时，浸没的比例等于两者密度之比。冰是 0.92，水是 1.00，所以冰浮在水中时有 92% 在水面以下。这就是冰山，也是它只露出约九分之一的原因。',
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
            en: 'Mass in kilograms, a property of the object, unchanged by where it is. Weight in newtons, a force, W = mg. Never give a weight in kilograms.',
            zh: '质量以千克为单位，是物体的属性，与所在位置无关。重力以牛顿为单位，是一种力，W = mg。绝不要用千克表示重力。',
          },
        },
        {
          id: 'sum-2',
          text: {
            en: 'Density is m over V. Convert the units before dividing, and quote the unit you actually used — g/cm³ or kg/m³, and they differ by a factor of a thousand.',
            zh: '密度是 m/V。做除法之前先换算单位，并写出你实际使用的单位——g/cm³ 或 kg/m³，两者相差一千倍。',
          },
        },
        {
          id: 'sum-3',
          text: {
            en: 'And floating is always a comparison with the fluid. If a question gives you two densities, it is asking you to compare them — that is the entire answer.',
            zh: '浮沉永远是与流体的比较。如果题目给了你两个密度，它就是在要你比较它们——这就是全部答案。',
          },
        },
      ],
    },
  ],
}

export default densityNarration
