import type { NarrationScript } from '@/content/types'

export const safetyNarration: NarrationScript = {
  id: '4-4-safety',
  sections: [
    {
      id: 'symbols',
      type: 'intro',
      title: { en: 'Reading a circuit diagram', zh: '读懂电路图' },
      lines: [
        {
          id: 'sy-1',
          text: {
            en: 'A circuit diagram uses standard symbols so that anyone can read it. Cell and battery, switch, lamp, resistor, variable resistor, ammeter and voltmeter, fuse, heater, motor, relay, thermistor and light-dependent resistor.',
            zh: '电路图使用标准符号，以便任何人都能读懂：电池与电池组、开关、灯、定值电阻、可变电阻、电流表与电压表、保险丝、电热器、电动机、继电器、热敏电阻和光敏电阻。',
          },
        },
        {
          id: 'sy-2',
          text: {
            en: 'Two are worth watching. A diode lets current through one way only — the triangle points the way the conventional current can flow, and the bar is the wall it meets going the other way. A light-emitting diode does the same and glows while it conducts.',
            zh: '有两个值得留意。二极管只允许电流单向通过——三角形指向常规电流可以流动的方向，而那条横杠是反方向上的"墙"。发光二极管作用相同，并在导通时发光。',
          },
        },
        {
          id: 'sy-3',
          text: {
            en: 'And the meters go in different places, which is a common slip. An ammeter is connected in series, because the current must pass through it. A voltmeter is connected in parallel across the component, because it compares two points.',
            zh: '两种电表接的位置不同，这是常见错误。电流表串联接入，因为电流必须流经它。电压表并联接在元件两端，因为它比较的是两点之间的差。',
          },
        },
      ],
    },
    {
      id: 'divider',
      type: 'interaction',
      title: { en: 'Sharing out a supply', zh: '把电源电压分掉' },
      lines: [
        {
          id: 'di-1',
          text: {
            en: 'Two resistors in series across a supply share the voltage between them, and they share it in the ratio of their resistances: V₁ over V₂ equals R₁ over R₂. That is a potential divider.',
            zh: '串联在电源两端的两个电阻会分掉电压，而且按各自阻值的比例分：V₁/V₂ = R₁/R₂。这就是分压器。',
          },
          action: { type: 'setParams', params: { supply: 12, r1: 100, r2: 200, fuseRating: 3 } },
        },
        {
          id: 'di-2',
          text: {
            en: 'A hundred ohms and two hundred ohms across twelve volts gives four volts and eight volts. Twice the resistance takes twice the share, because the same current flows through both and V equals I R.',
            zh: '100 欧和 200 欧接在 12 伏上，得到 4 伏和 8 伏。阻值大一倍就分得多一倍，因为流过两者的电流相同，而 V = IR。',
          },
        },
        {
          id: 'di-3',
          text: {
            en: 'Now raise the first resistance and watch both lines. As one voltage rises the other falls, and they always add to twelve. That constraint is the thing the ratio rule alone hides, and it is why getting one right and the other wrong is impossible.',
            zh: '现在提高第一个电阻，同时看两条线。一个电压升高，另一个就降低，两者之和始终是 12 伏。这个约束正是单看比例公式所看不到的，也是"一个算对另一个算错"不可能发生的原因。',
          },
          action: { type: 'setParams', params: { supply: 12, r1: 500, r2: 200, fuseRating: 3 } },
        },
        {
          id: 'di-4',
          text: {
            en: 'Make one of the resistors variable and you have a way of setting any output voltage between zero and the supply. Make it a thermistor and the output changes with temperature; make it an LDR and it changes with light. That is how a sensing circuit works, and it is the same divider throughout.',
            zh: '把其中一个电阻换成可变电阻，你就得到了一个能把输出电压设定在 0 到电源电压之间任意值的装置。换成热敏电阻，输出就随温度变化；换成光敏电阻，就随光照变化。传感电路就是这样工作的，而始终是同一个分压器。',
          },
        },
      ],
    },
    {
      id: 'safety',
      type: 'interaction',
      title: { en: 'A weak link, on purpose', zh: '有意做出的薄弱环节' },
      lines: [
        {
          id: 'sa-1',
          text: {
            en: 'Mains electricity is dangerous in four ways worth naming separately. Damaged insulation exposes a live conductor. Overheating cables can start a fire — usually because the cable is too thin for the current. Damp conditions let current pass through water to earth, and through you. And overloading sockets draws more current than the wiring was designed for.',
            zh: '市电有四种危险，值得分别说明。绝缘破损会露出带电导体。电缆过热可能引发火灾——通常是因为线径不足以承载电流。潮湿环境让电流经水流向大地，也会流经你的身体。而插座过载则会使电流超过线路的设计值。',
          },
        },
        {
          id: 'sa-2',
          text: {
            en: 'A mains cable has three wires. The live wire carries the alternating supply and is the dangerous one. The neutral completes the circuit and sits near earth potential. The earth wire connects the metal casing to the ground and normally carries no current at all.',
            zh: '市电电缆有三根线。火线传送交流电，是危险的那一根。零线构成回路，电位接近大地。地线把金属外壳接到大地，正常情况下完全不通电流。',
          },
        },
        {
          id: 'sa-3',
          text: {
            en: 'Switches and fuses must go in the live wire, and the reason is worth understanding rather than memorising. Put the switch in the neutral and turning it off would stop the current — but the appliance would still be connected to the live supply, so anyone opening it up would get a shock.',
            zh: '开关和保险丝必须接在火线上，其原因值得理解而不是死记。如果把开关接在零线上，关掉它确实能切断电流——但电器仍与火线相连，任何人打开它都会触电。',
          },
        },
        {
          id: 'sa-4',
          text: {
            en: 'Now the fuse itself: a thin wire that melts and breaks the circuit if the current gets too large. Choosing its rating has two sides, and students reliably remember only one.',
            zh: '再看保险丝本身：一段细导线，电流过大时会熔断并切断电路。选择其额定值有两方面的考虑，而学生通常只记得其中一方面。',
          },
          action: { type: 'setParams', params: { supply: 230, r1: 20, r2: 20, fuseRating: 1 } },
        },
        {
          id: 'sa-5',
          text: {
            en: 'Fit one rated below the working current and it blows every time you switch the appliance on. It has not protected anything — it has simply stopped the appliance working. So the rating must be above the normal current.',
            zh: '若装上额定值低于工作电流的保险丝，每次开机它都会熔断。它什么也没保护——只是让电器无法工作。因此额定值必须高于正常电流。',
          },
        },
        {
          id: 'sa-6',
          text: {
            en: 'But fit one far above it and it will sit there while the cable overheats. So the rule is: the smallest standard rating above the working current. Fuses are made in ones, threes, fives, tens and thirteens, so in practice you calculate the current and step up to the next one.',
            zh: '但若装上远高于工作电流的保险丝，电缆过热时它也无动于衷。因此规则是：取高于工作电流的最小标准额定值。保险丝的常见规格是 1、3、5、10、13 安，实际做法是算出电流后取下一档。',
          },
          action: { type: 'setParams', params: { supply: 230, r1: 20, r2: 20, fuseRating: 13 } },
          pause: 1,
        },
        {
          id: 'sa-7',
          text: {
            en: 'A trip switch does the same job electronically and can be reset rather than replaced, and it acts far faster than a fuse — which matters, because what harms a person is a current lasting long enough rather than a large one for an instant.',
            zh: '断路器以电子方式完成同样的工作，可以复位而不必更换，而且动作比保险丝快得多——这很重要，因为伤害人体的是持续足够久的电流，而不是瞬间的大电流。',
          },
        },
        {
          id: 'sa-8',
          text: {
            en: 'And the casing. A metal case must be earthed: if a live wire touches it, a very large current flows straight to earth, which blows the fuse and disconnects the supply before anyone can touch it. A double-insulated appliance has a plastic case and no exposed metal, so there is nothing for a live wire to make dangerous — which is why it needs no earth wire.',
            zh: '再说外壳。金属外壳必须接地：一旦火线碰到外壳，就会有很大的电流直接流入大地，从而熔断保险丝、在有人触碰之前切断电源。双重绝缘的电器有塑料外壳且没有裸露金属，火线无法使任何部件变得危险——这就是它不需要地线的原因。',
          },
        },
        {
          id: 'sa-9',
          text: {
            en: 'Which raises a question worth answering: what does the fuse protect in a double-insulated appliance, if there is no earth? The cable. The fuse is there to stop the flex overheating and catching fire if too much current is drawn — not to protect the user from the casing, which cannot become live.',
            zh: '这引出一个值得回答的问题：既然没有地线，双重绝缘电器中的保险丝在保护什么？保护电缆。保险丝的作用是在电流过大时防止软线过热起火——而不是保护使用者免受外壳带电的危险，因为外壳根本不可能带电。',
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
            en: 'A potential divider shares the supply in the ratio of the resistances, V₁/V₂ = R₁/R₂, and the two voltages always add to the supply. Check that they do — it catches most errors.',
            zh: '分压器按阻值比例分配电源电压，V₁/V₂ = R₁/R₂，且两个电压之和始终等于电源电压。核对这一点——它能查出大多数错误。',
          },
        },
        {
          id: 'sum-2',
          text: {
            en: 'A fuse rating must be above the working current and as little above it as possible. Calculate the current with I = P / V, then choose the next standard rating up.',
            zh: '保险丝的额定值必须高于工作电流，且尽可能接近它。先用 I = P/V 算出电流，再取上一档标准额定值。',
          },
        },
        {
          id: 'sum-3',
          text: {
            en: 'Switches and fuses go in the live wire so the appliance is isolated from the supply when off. An earthed metal case blows the fuse if it becomes live; a double-insulated appliance has no metal to become live, and its fuse protects the cable.',
            zh: '开关和保险丝接在火线上，使电器关闭时与电源隔离。接地的金属外壳一旦带电就会熔断保险丝；双重绝缘电器没有会带电的金属部件，其保险丝保护的是电缆。',
          },
        },
      ],
    },
  ],
}

export default safetyNarration
