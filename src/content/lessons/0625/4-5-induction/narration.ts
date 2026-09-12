import type { NarrationScript } from '@/content/types'

export const inductionNarration: NarrationScript = {
  id: '4-5-induction',
  sections: [
    {
      id: 'discovery',
      type: 'intro',
      title: { en: 'Electricity from movement', zh: '由运动产生的电' },
      lines: [
        {
          id: 'di-1',
          text: {
            en: 'Push a magnet into a coil of wire connected to a sensitive meter, and the needle flicks. Hold the magnet still inside the coil and the needle returns to zero. Pull it out and the needle flicks the other way.',
            zh: '把磁铁插入接有灵敏电流计的线圈，指针会偏转一下。让磁铁静止在线圈内，指针回到零。把磁铁抽出来，指针又向反方向偏转。',
          },
        },
        {
          id: 'di-2',
          text: {
            en: 'That is the whole of electromagnetic induction in one experiment, and the middle step is the important one. A magnet sitting inside a coil is still a magnet — the field is as strong as ever. But nothing is induced, because nothing is changing.',
            zh: '这一个实验就是电磁感应的全部，而中间那一步最关键。静止在线圈里的磁铁仍然是磁铁——磁场一点也没有减弱。但什么也没有产生，因为没有任何变化。',
          },
        },
        {
          id: 'di-3',
          text: {
            en: 'So the rule is: an e.m.f. is induced across a conductor when there is relative motion between the conductor and a magnetic field, or when the field through it changes. It is the change that induces, not the field.',
            zh: '所以规律是：当导体与磁场之间有相对运动，或穿过导体的磁场发生变化时，导体两端会产生感应电动势。产生感应的是"变化"，不是磁场本身。',
          },
        },
        {
          id: 'di-4',
          text: {
            en: 'Another way to say the same thing: the conductor has to cut magnetic field lines. Moving across the lines induces an e.m.f.; moving along them induces nothing. Keep that phrase — cutting field lines — because it explains the whole of the next graph.',
            zh: '换一种说法：导体必须切割磁感线。横切磁感线会产生电动势；沿着磁感线运动则什么也不产生。记住"切割磁感线"这个说法，因为它能解释接下来整幅图像。',
          },
        },
      ],
    },
    {
      id: 'size',
      type: 'concept',
      title: { en: 'What makes it bigger', zh: '什么会让它变大' },
      lines: [
        {
          id: 'si-1',
          text: {
            en: 'Three things increase the size of the induced e.m.f.: a stronger magnetic field, more turns on the coil, and faster relative movement. All three are on the sliders — try each one.',
            zh: '三个因素会增大感应电动势：更强的磁场、更多的线圈匝数、更快的相对运动。三者都在滑块上——逐一试试。',
          },
          action: { type: 'setParams', params: { turns: 50, fieldStrength: 1, frequency: 1, angle: 90 } },
        },
        {
          id: 'si-2',
          text: {
            en: 'Now set the rotation speed to zero. The field is still there and the turns are still there, and the e.m.f. drops to nothing at all. Speed is not just one factor among three — without movement, the other two multiply by zero.',
            zh: '现在把转速调到零。磁场还在，匝数也还在，而电动势完全变成零。速度不只是三个因素中的一个——没有运动，另外两个都要乘以零。',
          },
          action: { type: 'setParams', params: { turns: 200, fieldStrength: 3, frequency: 0, angle: 90 } },
        },
        {
          id: 'si-3',
          text: {
            en: 'There is also a direction rule, and it is a statement about energy. An induced current always flows in the direction that opposes the change producing it. Push a north pole into a coil and the coil turns into a north pole facing it, pushing back.',
            zh: '还有一条方向规律，它其实是关于能量的。感应电流的方向总是阻碍产生它的那个变化。把 N 极推入线圈，线圈靠近的那一端就变成 N 极，把磁铁往外推。',
          },
        },
        {
          id: 'si-4',
          text: {
            en: 'It has to be that way round. If the coil pulled the magnet in instead, the magnet would accelerate on its own, generating more current, pulling harder — free energy out of nothing. The opposition is exactly why you have to do work to generate electricity.',
            zh: '只能是这样。如果线圈反而把磁铁吸进去，磁铁就会自行加速，产生更多电流，吸得更紧——凭空得到能量。正是这种阻碍，才使得发电必须做功。',
          },
        },
      ],
    },
    {
      id: 'generator',
      type: 'interaction',
      title: { en: 'Where the peak is, and why', zh: '峰值在哪里，为什么' },
      lines: [
        {
          id: 'ge-1',
          text: {
            en: 'A generator turns a coil in a magnetic field. Each end of the coil is connected to a slip ring, and a carbon brush presses on each ring so that the current can leave a coil that is spinning.',
            zh: '发电机让线圈在磁场中转动。线圈两端各接一个滑环，每个滑环上压着一个碳刷，使电流能从旋转的线圈引出。',
          },
          action: { type: 'setParams', params: { turns: 50, fieldStrength: 1, frequency: 1, angle: 90 } },
        },
        {
          id: 'ge-2',
          text: {
            en: 'Slip rings are the detail that gets missed. Each end of the coil stays connected to its own ring throughout the turn, so as the coil flips over, the output flips with it. The connection never swaps — which is precisely what makes the output alternating.',
            zh: '滑环是最容易被忽略的细节。转动过程中线圈的每一端始终连在自己的那个环上，因此线圈翻转时，输出也跟着翻转。连接从不互换——这正是输出为交流的原因。',
          },
        },
        {
          id: 'ge-3',
          text: {
            en: 'Now the graph. Set the angle to zero — the coil is face-on to the field, so the greatest number of field lines are passing through it. Look at the readout: the field through the coil is at a hundred per cent. And the e.m.f. is zero.',
            zh: '现在看图像。把角度设为 0——线圈正面朝向磁场，此时穿过它的磁感线最多。看读数：穿过线圈的磁场是 100%。而电动势是零。',
          },
          action: { type: 'setParams', params: { turns: 50, fieldStrength: 1, frequency: 1, angle: 0 } },
        },
        {
          id: 'ge-4',
          text: {
            en: 'That is the sentence worth stopping on. The most field lines the coil will ever have passing through it, and no e.m.f. at all. Because for that instant the sides of the coil are sliding along the lines rather than across them — so they cut none.',
            zh: '这句话值得停下来想一想。穿过线圈的磁感线达到了最多，却完全没有电动势。因为这一瞬间线圈的两边是沿着磁感线滑动而不是横切它们——所以一根也没有切割。',
          },
        },
        {
          id: 'ge-5',
          text: {
            en: 'Now set it to ninety degrees. The coil is edge-on: the field through it has dropped to zero, and the e.m.f. is at its peak. The two readouts are exact opposites of each other, all the way round the turn.',
            zh: '现在把角度设为 90 度。线圈变成侧对磁场：穿过它的磁场降到了零，而电动势达到峰值。在整整一圈里，这两个读数始终完全相反。',
          },
          action: { type: 'setParams', params: { turns: 50, fieldStrength: 1, frequency: 1, angle: 90 } },
        },
        {
          id: 'ge-5b',
          text: {
            en: 'So read the graph this way: the peaks are where the coil is moving fastest across the lines, and the zeros are where it is momentarily moving along them. The e.m.f. depends on how fast lines are cut, not on how many are threading the coil — and those two are greatest in different places.',
            zh: '因此这样读图：峰值出现在线圈横切磁感线最快的位置，零点出现在它瞬时沿磁感线运动的位置。电动势取决于切割磁感线的快慢，而不是穿过线圈的磁感线有多少——而这两者的最大值出现在不同的位置。',
          },
        },
        {
          id: 'ge-6',
          text: {
            en: 'Follow one full turn on the curve. Zero, up to a peak, back through zero, down to a peak the other way, and back to zero. The curve crosses the axis twice per revolution because the two sides of the coil swap over — each side spends half a turn going up through the field and half going down.',
            zh: '沿曲线走完整整一圈。零、升到峰值、回到零、反向降到峰值、再回到零。曲线每转一圈两次穿过横轴，因为线圈的两条边互换了位置——每条边有半圈在磁场中向上运动，半圈向下。',
          },
          action: { type: 'setParams', params: { turns: 50, fieldStrength: 1, frequency: 1, angle: 270 } },
        },
        {
          id: 'ge-7',
          text: {
            en: 'Turn the speed up and two things change at once, which is worth watching for. The peaks get taller — faster cutting — and the cycles get shorter in time. In a real power station both are fixed by holding the turbine at exactly fifty revolutions per second.',
            zh: '把转速调高，会同时发生两件事，值得留意。峰值变高——切割更快——同时每个周期在时间上变短。在真实的电厂里，两者都靠把汽轮机严格保持在每秒 50 转来固定。',
          },
          action: { type: 'setParams', params: { turns: 50, fieldStrength: 1, frequency: 4, angle: 90 } },
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
            en: 'An e.m.f. is induced when a conductor and a magnetic field move relative to one another, or when the field through a coil changes. A stationary magnet in a coil induces nothing.',
            zh: '当导体与磁场发生相对运动，或穿过线圈的磁场发生变化时，就会产生感应电动势。静止在线圈中的磁铁不产生任何感应。',
          },
        },
        {
          id: 'sum-2',
          text: {
            en: 'The size increases with the strength of the field, the number of turns and the speed of the relative motion. The direction always opposes the change that is causing it.',
            zh: '其大小随磁场强度、线圈匝数与相对运动速度的增大而增大。其方向总是阻碍引起它的那个变化。',
          },
        },
        {
          id: 'sum-3',
          text: {
            en: 'On a generator graph, the peak is where the plane of the coil is parallel to the field — edge-on, cutting lines fastest — and the zero is where it is at right angles to the field, face-on. If you are asked to sketch it, label those two positions on the curve; that is usually where the marks are.',
            zh: '在发电机的图像上，峰值出现在线圈平面与磁场平行之处——侧对磁场，切割磁感线最快；零点出现在线圈平面与磁场垂直之处，即正面朝向磁场。若要求作图，请在曲线上标出这两个位置，分数通常就在这里。',
          },
        },
      ],
    },
  ],
}

export default inductionNarration
