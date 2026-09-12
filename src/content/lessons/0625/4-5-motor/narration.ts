import type { NarrationScript } from '@/content/types'

export const motorNarration: NarrationScript = {
  id: '4-5-motor',
  sections: [
    {
      id: 'pattern',
      type: 'intro',
      title: { en: 'A current makes a field', zh: '电流产生磁场' },
      lines: [
        {
          id: 'pa-1',
          text: {
            en: 'Every current has a magnetic field around it. Around a long straight wire the field lines are circles, centred on the wire, lying in planes at right angles to it. Grip the wire with your right hand, thumb along the conventional current, and your fingers curl the way the field points.',
            zh: '每一段电流周围都有磁场。长直导线周围的磁感线是以导线为圆心的同心圆，位于与导线垂直的平面内。用右手握住导线，拇指指向常规电流方向，四指弯曲的方向就是磁场方向。',
          },
        },
        {
          id: 'pa-2',
          text: {
            en: 'Wind that wire into a solenoid and the circles add together. Inside the coil the field is strong and very nearly uniform, running straight along the axis. Outside, it spreads and looks exactly like the field of a bar magnet — one end behaving as a north pole, the other as a south.',
            zh: '把导线绕成螺线管，这些圆形磁场就叠加起来。线圈内部磁场很强且几乎均匀，沿轴向笔直穿过。外部磁场向外扩散，看起来与条形磁铁的磁场完全一样——一端表现为 N 极，另一端为 S 极。',
          },
        },
        {
          id: 'pa-3',
          text: {
            en: 'To find these patterns yourself: stand a wire vertically through a horizontal sheet of card, switch on a large current, sprinkle iron filings and tap the card. The filings settle into rings. To get the direction as well, put a plotting compass down at several points and mark where the needle points each time.',
            zh: '要自己找出这些图样：把导线竖直穿过一张水平硬纸板，接通较大电流，撒上铁屑并轻敲纸板。铁屑会排成一圈圈的环。若还要确定方向，就把小磁针放在若干位置上，每次记下针尖所指的方向。',
          },
        },
        {
          id: 'pa-4',
          text: {
            en: 'The field is not the same everywhere. Around a straight wire it is strongest close in and weakens as you move away — which is why the filing rings are packed tight near the wire and spread out further off. In a solenoid it is strongest inside, and strongest of all near the ends where the lines are concentrated.',
            zh: '磁场并非处处相同。直导线周围靠近导线处最强，越远越弱——这正是铁屑环在靠近导线处密集、远处稀疏的原因。螺线管中内部最强，而在磁感线最集中的两端附近最强。',
          },
        },
        {
          id: 'pa-5',
          text: {
            en: 'And it follows the current. Double the current and the field everywhere doubles in strength — the compass swings harder, the filings line up more sharply. Reverse the current and the pattern is unchanged in shape but every field line points the opposite way; the compass needle turns right round.',
            zh: '磁场随电流而变。电流加倍，各处磁场强度也加倍——小磁针偏转更有力，铁屑排列更清晰。电流反向，图样形状不变，但每条磁感线的方向都相反；小磁针会掉转一百八十度。',
          },
        },
      ],
    },
    {
      id: 'uses',
      type: 'concept',
      title: { en: 'Two things built on that', zh: '由此造出的两样东西' },
      lines: [
        {
          id: 'us-1',
          text: {
            en: 'A relay is a switch worked by an electromagnet. A small current through the coil magnetises a soft iron core, which attracts an iron armature, and the armature closes a second pair of contacts. So a small, safe current switches a large, dangerous one — a car starter motor draws hundreds of amps, and you would not want that running through the ignition switch in your hand.',
            zh: '继电器是由电磁铁带动的开关。线圈中的小电流使软铁芯磁化，铁芯吸引衔铁，衔铁闭合另一对触点。于是一个安全的小电流控制了一个危险的大电流——汽车起动机要取用几百安培，你不会希望这样的电流通过手里的点火开关。',
          },
        },
        {
          id: 'us-2',
          text: {
            en: 'A loudspeaker turns a varying current into sound. A coil sits in the gap of a permanent magnet and is attached to a paper cone. The current from the amplifier varies, the force on the coil varies with it, and the cone is pushed in and out — pushing the air and making a sound wave of the same frequency.',
            zh: '扬声器把变化的电流变成声音。线圈置于永磁体的磁隙中，并与纸盆相连。放大器送来的电流不断变化，线圈受到的力随之变化，纸盆被来回推动——推动空气，产生频率相同的声波。',
          },
        },
        {
          id: 'us-3',
          text: {
            en: 'Notice what the loudspeaker depends on. If the current reverses, the force must reverse too, or the cone could only ever be pushed one way and there would be no sound at all. That force on a current in a field is the next thing to pin down.',
            zh: '注意扬声器依赖于什么。如果电流反向，力也必须反向，否则纸盆只能朝一个方向被推，根本不会发出声音。磁场中电流所受的这个力，正是接下来要弄清的。',
          },
        },
      ],
    },
    {
      id: 'force',
      type: 'concept',
      title: { en: 'Two fields, pushing', zh: '两个磁场，相互推挤' },
      lines: [
        {
          id: 'fo-1',
          text: {
            en: 'Lay a stiff wire loosely across two rails between the poles of a magnet, and switch on. The wire jumps out sideways. Reverse the current and it jumps the other way. Turn the magnet round so the field is reversed and it jumps the other way again. Reverse both, and it goes back to the first direction.',
            zh: '把一根硬导线松松地架在磁铁两极之间的两条导轨上，接通电源。导线会向侧面跳出。把电流反向，它向相反方向跳。把磁铁掉转使磁场反向，它又向另一方向跳。两者同时反向，它就回到最初的方向。',
          },
        },
        {
          id: 'fo-2',
          text: {
            en: 'The force is there because the wire has its own circular field, and it is sitting in the magnet\'s field. On one side of the wire the two fields point the same way and add; on the other they oppose and cancel. The result is a stronger field on one side than the other, and the wire is pushed from the strong side to the weak. It is often drawn as a catapult field, and that is a fair picture of it.',
            zh: '之所以有力，是因为导线本身有环形磁场，而它又处在磁铁的磁场之中。在导线的一侧两个磁场方向相同而叠加；另一侧方向相反而抵消。结果是一侧磁场强、另一侧弱，导线被从强的一侧推向弱的一侧。这常被画成"弹弓磁场"，这个比喻是恰当的。',
          },
        },
        {
          id: 'fo-3',
          text: {
            en: 'Force, field and current are mutually at right angles, and Fleming\'s left-hand rule sorts out which is which. First finger: field, north to south. Second finger: conventional current. Thumb: the force, and therefore the motion. Hold them at right angles like the corner of a box.',
            zh: '力、磁场与电流三者互相垂直，左手定则能理清它们的对应关系。食指：磁场，由 N 指向 S。中指：常规电流。拇指：力，也就是运动方向。把三指像盒子的一角那样互相垂直地伸开。',
          },
        },
        {
          id: 'fo-4',
          text: {
            en: 'The same rule works on a beam of charged particles in a vacuum, because a moving charge is a current. But watch the sign. A beam of electrons travelling to the right is a conventional current to the left, so your second finger points against the beam. Get that wrong and you will deflect the beam exactly the wrong way — it is the single most common slip on this topic.',
            zh: '同一定则也适用于真空中的带电粒子束，因为运动的电荷就是电流。但要注意符号。向右运动的电子束，其常规电流方向向左，所以中指要指向与束流相反的方向。弄错这一点，偏转方向就会完全相反——这是本主题最常见的失误。',
          },
        },
      ],
    },
    {
      id: 'motor',
      type: 'interaction',
      title: { en: 'Why it keeps going round', zh: '它为什么能一直转下去' },
      lines: [
        {
          id: 'mo-1',
          text: {
            en: 'Put a coil carrying a current into a magnetic field, and the two sides of the coil are pushed in opposite directions — one up, one down — because the current runs along them in opposite directions. Opposite forces, either side of an axis, is a turning effect. The coil turns.',
            zh: '把通电线圈放入磁场，线圈的两条边会被推向相反的方向——一边向上，一边向下——因为电流在它们中的流向相反。转轴两侧受到方向相反的力，这就是转动效果。线圈转动起来。',
          },
          action: { type: 'setParams', params: { current: 2, fieldStrength: 1, turns: 20, angle: 90 } },
        },
        {
          id: 'mo-2',
          text: {
            en: 'Three things make it turn harder, and they are all on the sliders: more current, a stronger field, more turns on the coil. Try each. Notice the force on each side and the peak turning effect rise together — they are the same quantity seen twice.',
            zh: '有三个因素能让它转得更有力，滑块上都有：更大的电流、更强的磁场、更多的线圈匝数。逐一试试。注意每边所受的力与最大转动效果同步上升——它们其实是同一个量的两种呈现。',
          },
          action: { type: 'setParams', params: { current: 6, fieldStrength: 2, turns: 60, angle: 90 } },
        },
        {
          id: 'mo-3',
          text: {
            en: 'Now the problem. Look at the lower curve, the one with no commutator. It rises to a peak, comes back to zero after half a turn — and then goes negative. The coil is being pushed back the way it came. Left like this, a motor would rock back and forth and never complete a revolution.',
            zh: '现在看问题所在。看下面那条曲线，没有换向器的那条。它升到峰值，转过半圈后回到零——接着变成负值。线圈被推回原路。就这样放着，电动机只会来回摆动，永远转不满一圈。',
          },
          action: { type: 'setParams', params: { current: 2, fieldStrength: 1, turns: 20, angle: 225 } },
        },
        {
          id: 'mo-4',
          text: {
            en: 'The reason is simple once you see it. After half a turn the two sides of the coil have swapped places — the side that was on the left is now on the right. The forces on them have not changed direction at all, but they are now on the wrong sides of the axis, so they turn the coil backwards.',
            zh: '看明白了就很简单。转过半圈后，线圈的两条边互换了位置——原来在左边的那条现在到了右边。它们受力的方向丝毫没变，但如今位于转轴的另一侧，因此把线圈往回转。',
          },
        },
        {
          id: 'mo-5',
          text: {
            en: 'The fix is to swap the current over at the same moment the sides swap over. That is all a split-ring commutator is: the ring is cut into two halves, each connected to one end of the coil, with brushes pressing on it. As the coil turns past the halfway point, each brush slides from one half of the ring to the other and the current through the coil reverses.',
            zh: '解决办法是在两条边互换位置的同时把电流也换过来。换向器就是干这个的：环被切成两个半环，各接线圈的一端，电刷压在上面。线圈转过半圈时，每个电刷从一个半环滑到另一个半环，线圈中的电流随之反向。',
          },
        },
        {
          id: 'mo-6',
          text: {
            en: 'Set the angle to zero and read the note. The change-over happens at exactly the angle where the turning effect is zero — the coil is face-on to the field there. So nothing is interrupted and nothing jolts: the coil coasts through the dead point on its own momentum, and by the time it comes out the other side the current is already the right way round.',
            zh: '把角度设为 0，读一读说明。换接恰好发生在转动效果为零的角度——线圈此时正对磁场。因此没有任何中断，也不会有冲击：线圈靠自身惯性滑过这个死点，等它转到另一侧时，电流已经是正确的方向了。',
          },
          action: { type: 'setParams', params: { current: 2, fieldStrength: 1, turns: 20, angle: 0 } },
        },
        {
          id: 'mo-7',
          text: {
            en: 'Now compare the two curves over a full turn. The commutated one has its second lobe flipped up: the turning effect is always in the same sense, so the coil keeps accelerating round the same way. That single difference between the two curves is the whole job of the commutator.',
            zh: '现在把两条曲线在整整一圈上作比较。带换向器的那条，后半个波峰被翻了上来：转动效果始终朝同一方向，因此线圈不断朝同一方向被加速。两条曲线之间这一个差别，就是换向器的全部作用。',
          },
          action: { type: 'setParams', params: { current: 2, fieldStrength: 1, turns: 20, angle: 90 } },
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
            en: 'A current makes a field: circles round a straight wire, bar-magnet-like for a solenoid with a strong uniform field inside. It is stronger nearer the wire and with a bigger current, and reversing the current reverses every field line.',
            zh: '电流产生磁场：直导线周围是同心圆，螺线管则像条形磁铁且内部有很强的均匀磁场。靠近导线处更强，电流更大时更强，电流反向则每条磁感线的方向都反向。',
          },
        },
        {
          id: 'sum-2',
          text: {
            en: 'A current in a field feels a force, because the two fields add on one side and cancel on the other. Fleming\'s left hand: first finger field, second finger current, thumb force. For an electron beam, the conventional current is opposite to the beam.',
            zh: '磁场中的电流会受力，因为两个磁场在一侧叠加、在另一侧抵消。左手定则：食指磁场，中指电流，拇指力。对电子束而言，常规电流方向与束流方向相反。',
          },
        },
        {
          id: 'sum-3',
          text: {
            en: 'A motor coil turns because its two sides are pushed opposite ways. It turns harder with more current, a stronger field or more turns. And the split-ring commutator reverses the current every half turn so the turning effect never reverses — without it the coil would rock instead of rotate.',
            zh: '电动机线圈之所以转动，是因为两条边被推向相反方向。电流更大、磁场更强或匝数更多时转得更有力。换向器每半圈把电流反向一次，使转动效果不会反向——没有它，线圈只会摆动而不能旋转。',
          },
        },
      ],
    },
  ],
}

export default motorNarration
