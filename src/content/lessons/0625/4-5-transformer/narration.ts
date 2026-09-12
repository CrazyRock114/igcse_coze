import type { NarrationScript } from '@/content/types'

export const transformerNarration: NarrationScript = {
  id: '4-5-transformer',
  sections: [
    {
      id: 'build',
      type: 'intro',
      title: { en: 'Two coils that never touch', zh: '两个从不接触的线圈' },
      lines: [
        {
          id: 'bu-1',
          text: {
            en: 'A transformer is two coils of insulated wire wound on the same soft iron core. The coil connected to the supply is the primary; the coil connected to whatever is being powered is the secondary. The two coils are not joined to each other anywhere — the only thing passing between them is a magnetic field in the iron.',
            zh: '变压器是绕在同一个软铁芯上的两个绝缘线圈。接电源的那个叫原线圈；接用电设备的那个叫副线圈。两个线圈之间没有任何电的连接——在它们之间传递的只有铁芯中的磁场。',
          },
        },
        {
          id: 'bu-2',
          text: {
            en: 'If the secondary has more turns than the primary, the voltage comes out higher and it is a step-up transformer. Fewer turns, and the voltage comes out lower: step-down. The phone charger on your desk is a step-down transformer; the one at the end of your street is too.',
            zh: '如果副线圈匝数多于原线圈，输出电压更高，这是升压变压器。匝数更少，输出电压更低，就是降压变压器。你桌上的手机充电器是降压变压器；街角的那台也是。',
          },
        },
      ],
    },
    {
      id: 'principle',
      type: 'concept',
      title: { en: 'Why alternating current is essential', zh: '为什么必须是交流电' },
      lines: [
        {
          id: 'pr-1',
          text: {
            en: 'Here is how it works. An alternating current in the primary makes a magnetic field that is constantly growing, collapsing and reversing. The soft iron core carries almost all of that field round to the secondary coil.',
            zh: '工作原理是这样的。原线圈中的交流电产生一个不断增强、消失、反向的磁场。软铁芯几乎把这个磁场全部导引到副线圈。',
          },
        },
        {
          id: 'pr-2',
          text: {
            en: 'The secondary now sits in a magnetic field that is changing all the time — and a changing field through a coil induces an e.m.f. So an alternating voltage appears across the secondary, at the same frequency, without a single electron crossing from one coil to the other.',
            zh: '副线圈此时处在一个不断变化的磁场中——而穿过线圈的磁场变化会产生感应电动势。于是副线圈两端出现同频率的交变电压，而没有一个电子从一个线圈跑到另一个线圈。',
          },
        },
        {
          id: 'pr-3',
          text: {
            en: 'Which tells you immediately why a transformer will not work on d.c. A steady current makes a steady field, a steady field is not a changing field, and nothing at all is induced in the secondary. Connect a transformer to a battery and you get one brief pulse as you switch on, then nothing.',
            zh: '这也立刻说明了变压器为什么不能用于直流。恒定电流产生恒定磁场，恒定磁场不是变化的磁场，副线圈中什么也感应不出来。把变压器接到电池上，只会在接通的一瞬间得到一个脉冲，之后一无所有。',
          },
        },
        {
          id: 'pr-4',
          text: {
            en: 'The core is soft iron for a reason too. Soft iron magnetises and demagnetises easily, so it can follow a field that reverses fifty times a second. Steel would hold its magnetism and fight every reversal, wasting energy as heat.',
            zh: '铁芯用软铁也是有原因的。软铁易于磁化也易于退磁，因此能跟上每秒反向五十次的磁场。钢会保留磁性，对抗每一次反向，把能量白白变成热。',
          },
        },
      ],
    },
    {
      id: 'ratio',
      type: 'interaction',
      title: { en: 'The two equations', zh: '两个公式' },
      lines: [
        {
          id: 'ra-1',
          text: {
            en: 'The first equation is just the turns ratio: V-p over V-s equals N-p over N-s. Voltage in the same ratio as turns. Start with a generator at twenty-five kilovolts, a hundred turns on the primary and sixteen hundred on the secondary, and out comes four hundred kilovolts.',
            zh: '第一个公式就是匝数比：Vp/Vs = Np/Ns。电压之比等于匝数之比。以 25 千伏的发电机为例，原线圈 100 匝、副线圈 1600 匝，输出就是 400 千伏。',
          },
          action: {
            type: 'setParams',
            params: {
              primaryVoltage: 25000,
              primaryTurns: 100,
              secondaryTurns: 1600,
              powerTransmitted: 100,
              cableResistance: 10,
            },
          },
        },
        {
          id: 'ra-2',
          text: {
            en: 'The second equation is the one that stops people believing in free electricity. For a perfect transformer, I-p V-p equals I-s V-s. Power in equals power out. So if the voltage is stepped up sixteen times, the current is divided by sixteen. A transformer trades one for the other; it never makes more of both.',
            zh: '第二个公式能让人不再相信"免费的电"。对理想变压器，IpVp = IsVs。输入功率等于输出功率。所以电压升高 16 倍，电流就变成原来的十六分之一。变压器是在两者之间做交换，绝不会让两者同时增加。',
          },
        },
        {
          id: 'ra-3',
          text: {
            en: 'Now step the ratio down instead and watch which way the current goes. This is the part that catches people in questions about mains adapters: the low-voltage side carries the larger current, which is why the thin wire is on the high-voltage side.',
            zh: '现在把变比改成降压，看看电流朝哪个方向变。这正是"电源适配器"类题目容易出错的地方：低压那一侧电流更大，所以细导线在高压那一侧。',
          },
          action: {
            type: 'setParams',
            params: {
              primaryVoltage: 25000,
              primaryTurns: 400,
              secondaryTurns: 100,
              powerTransmitted: 100,
              cableResistance: 10,
            },
          },
        },
      ],
    },
    {
      id: 'grid',
      type: 'interaction',
      title: { en: 'What the grid is buying', zh: '电网买到的是什么' },
      lines: [
        {
          id: 'gr-1',
          text: {
            en: 'Now the reason all of this exists. A hundred megawatts has to travel a long way down a cable with ten ohms of resistance, and any current in that cable heats it: P equals I squared R. That heat is power that never reaches anybody.',
            zh: '现在说说这一切存在的理由。100 兆瓦的电力要沿着电阻为 10 欧的电缆送到很远的地方，而电缆中的任何电流都会使它发热：P = I²R。这些热是永远送不到任何人手中的功率。',
          },
          action: {
            type: 'setParams',
            params: {
              primaryVoltage: 25000,
              primaryTurns: 100,
              secondaryTurns: 1600,
              powerTransmitted: 100,
              cableResistance: 10,
            },
          },
        },
        {
          id: 'gr-2',
          text: {
            en: 'At four hundred kilovolts the line needs only two hundred and fifty amps, and the loss is about six tenths of one per cent. Now look at the two graphs together, because they are not the same shape.',
            zh: '在 400 千伏下线路只需 250 安，损耗约为千分之六。现在把两幅图放在一起看，因为它们的形状并不相同。',
          },
        },
        {
          id: 'gr-3',
          text: {
            en: 'The current curve falls as one over the voltage — a steady, ordinary decline. The loss curve falls off a cliff, because it goes as one over the voltage squared. Double the voltage and you do not halve the loss, you quarter it. That squaring is the entire argument for high-voltage transmission.',
            zh: '电流曲线按电压的倒数下降——平稳而普通。损耗曲线则陡然坠落，因为它按电压平方的倒数下降。电压加倍，损耗不是减半，而是降到四分之一。这个"平方"就是高压输电的全部理由。',
          },
        },
        {
          id: 'gr-4',
          text: {
            en: 'Now try sending the same hundred megawatts at twenty-five kilovolts, straight from the generator with no step-up at all. Read the note underneath.',
            zh: '现在试着在 25 千伏下输送同样的 100 兆瓦，即直接从发电机输出、完全不升压。读一读下面的说明。',
          },
          action: {
            type: 'setParams',
            params: {
              primaryVoltage: 25000,
              primaryTurns: 100,
              secondaryTurns: 100,
              powerTransmitted: 100,
              cableResistance: 10,
            },
          },
        },
        {
          id: 'gr-5',
          text: {
            en: 'The arithmetic returns a loss bigger than the power being sent, which is of course impossible. Nothing is wrong with P equals I squared R. What has failed is the assumption hidden inside the question — that any cable could carry four thousand amps. It would melt. That is not a flaw in the model, it is the model telling you why the grid has to step up.',
            zh: '算出来的损耗比输送的功率还大，这当然是不可能的。P = I²R 本身没有问题。出问题的是题目里隐含的假设——认为随便哪根电缆都能承载 4000 安。它会熔断。这不是模型的缺陷，而是模型在告诉你电网为什么必须升压。',
          },
        },
        {
          id: 'gr-6',
          text: {
            en: 'So the grid steps up to hundreds of kilovolts for the journey, then steps down again in stages: to tens of kilovolts for a town, and finally to two hundred and thirty volts for a house. Cheaper too — a smaller current needs thinner, cheaper cable, which needs fewer and lighter pylons.',
            zh: '因此电网在长途输送时升压到几百千伏，之后再分级降压：为城镇降到几十千伏，最后为住宅降到 230 伏。这样也更省钱——电流更小就能用更细更便宜的电缆，铁塔也更少更轻。',
          },
          action: {
            type: 'setParams',
            params: {
              primaryVoltage: 25000,
              primaryTurns: 100,
              secondaryTurns: 1600,
              powerTransmitted: 100,
              cableResistance: 10,
            },
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
            en: 'Two insulated coils on a soft iron core. An alternating current in the primary makes a changing field in the core; the changing field through the secondary induces an alternating e.m.f. It cannot work on d.c., because a steady current gives an unchanging field.',
            zh: '软铁芯上的两个绝缘线圈。原线圈中的交流电在铁芯中产生变化的磁场；变化的磁场穿过副线圈，感应出交变电动势。它不能用于直流，因为恒定电流给出的是不变的磁场。',
          },
        },
        {
          id: 'sum-2',
          text: {
            en: 'Vp over Vs equals Np over Ns. And for a 100% efficient transformer, IpVp equals IsVs — so stepping the voltage up steps the current down by the same factor.',
            zh: 'Vp/Vs = Np/Ns。对效率为 100% 的变压器，IpVp = IsVs——所以电压升高多少倍，电流就降低多少倍。',
          },
        },
        {
          id: 'sum-3',
          text: {
            en: 'Transmit at high voltage so the current is small, because the power wasted heating the cable is I squared R. Write that equation down in the answer: it is the squared that earns the mark, not the phrase "less current means less loss".',
            zh: '用高压输电以减小电流，因为电缆发热浪费的功率是 I²R。答题时把这个公式写出来：得分的是那个"平方"，而不是"电流小损耗就小"这句话。',
          },
        },
      ],
    },
  ],
}

export default transformerNarration
