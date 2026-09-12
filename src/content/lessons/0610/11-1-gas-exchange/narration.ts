import type { NarrationScript } from '@/content/types'

export const gasExchangeNarration: NarrationScript = {
  id: '11-1-gas-exchange',
  sections: [
    {
      id: 'surfaces',
      type: 'intro',
      title: { en: 'What a gas exchange surface needs', zh: '气体交换表面需要什么' },
      lines: [
        {
          id: 'sf-1',
          text: {
            en: 'Every gas exchange surface in biology has the same four features, and you have met them all before. A large surface area. A thin wall, so the diffusion distance is short. A good blood supply, to keep the concentration gradient steep. And a moist surface, because gases dissolve before they cross.',
            zh: '生物学中的每一个气体交换表面都具备同样的四个特征，你之前都见过。大的表面积。薄的壁，使扩散距离短。良好的血液供应，以维持陡峭的浓度梯度。以及湿润的表面，因为气体要先溶解才能通过。',
          },
        },
        {
          id: 'sf-2',
          text: {
            en: 'The alveoli have all four. There are hundreds of millions of them, each wall one cell thick, each wrapped in capillaries, each lined with a film of moisture. Air comes in through the nose or mouth, down the trachea, into the bronchi, the bronchioles, and finally the alveoli.',
            zh: '肺泡四条全占。它们有数亿个，每个的壁只有一个细胞厚，每个都被毛细血管缠绕，每个内表面都覆有一层水膜。空气经鼻或口进入，沿气管下行，进入支气管、细支气管，最后到达肺泡。',
          },
        },
        {
          id: 'sf-3',
          text: {
            en: 'The trachea has rings of cartilage in its wall, and they are C-shaped rather than complete circles. They hold the airway open so it cannot collapse when you breathe in — and the gap at the back lets the oesophagus behind it bulge when you swallow.',
            zh: '气管壁内有软骨环，而且是 C 形的，不是完整的圆环。它们撑开气道，使你吸气时不至于塌陷——而后方的缺口则让位于其后的食道在吞咽时能够膨出。',
          },
        },
        {
          id: 'sf-4',
          text: {
            en: 'And the airway defends itself. Goblet cells secrete mucus, which traps dust and bacteria. Ciliated cells beat their cilia to sweep that mucus up towards the throat, where it is swallowed. Smoking paralyses those cilia, which is why a smoker coughs — the mucus has to be shifted somehow.',
            zh: '气道还会自我防御。杯状细胞分泌黏液，粘住灰尘和细菌。纤毛细胞摆动纤毛，把黏液向上扫到咽喉，随后被吞下。吸烟会麻痹这些纤毛，这就是吸烟者会咳嗽的原因——黏液总得靠什么方式清走。',
          },
        },
      ],
    },
    {
      id: 'breathing',
      type: 'concept',
      title: { en: 'How the air actually moves', zh: '空气究竟是怎么进出的' },
      lines: [
        {
          id: 'br-1',
          text: {
            en: 'Lungs have no muscle of their own. Breathing in: the external intercostal muscles contract and pull the ribs up and out, the diaphragm contracts and flattens downwards. The volume of the chest increases, so the pressure inside falls below atmospheric, and air flows in.',
            zh: '肺本身没有肌肉。吸气时：肋间外肌收缩，把肋骨向上向外拉；膈肌收缩并向下变平。胸腔容积增大，内部压力降到低于大气压，空气便流入。',
          },
        },
        {
          id: 'br-2',
          text: {
            en: 'Breathing out at rest is mostly passive: those muscles relax, the ribs drop, the diaphragm domes back up, volume falls, pressure rises, air flows out. Only when you breathe out forcefully do the internal intercostals contract to pull the ribs actively down.',
            zh: '静息时呼气基本是被动的：这些肌肉舒张，肋骨下落，膈重新拱起，容积减小，压力升高，空气流出。只有用力呼气时，肋间内肌才会收缩，主动把肋骨拉下。',
          },
        },
        {
          id: 'br-3',
          text: {
            en: 'Volume changes first and pressure follows. Answers that say "the lungs suck air in" have it backwards — nothing sucks, the air is pushed in by the atmosphere because the pressure inside has dropped.',
            zh: '先有容积变化，压力随之而变。写"肺把空气吸进来"是本末倒置——没有什么在"吸"，是因为内部压力下降，大气把空气压了进来。',
          },
        },
        {
          id: 'br-4',
          text: {
            en: 'Compare inspired and expired air and three things have changed. Less oxygen — about 21 per cent down to 16. More carbon dioxide — 0.04 per cent up to about 4, a hundredfold increase. And more water vapour, and warmer. The nitrogen is unchanged, because nothing uses it.',
            zh: '比较吸入与呼出的空气，有三点变化。氧气减少——约从 21% 降到 16%。二氧化碳增多——从 0.04% 升到约 4%，增加了一百倍。此外水蒸气更多、温度更高。氮气不变，因为没有生物利用它。',
          },
        },
        {
          id: 'br-5',
          text: {
            en: 'You can show the carbon dioxide with limewater: breathe out through a tube into limewater and it turns milky, and much faster than air drawn in from the room does. And the reason for all three changes is respiration in the cells, at the other end of the blood supply.',
            zh: '可以用石灰水显示二氧化碳：通过管子把气呼入石灰水，它会变浑浊，而且比从室内抽入的空气快得多。这三项变化的原因都是血液供应另一端、细胞里的呼吸作用。',
          },
        },
      ],
    },
    {
      id: 'respiration',
      type: 'interaction',
      title: { en: 'Two ways to release energy', zh: '释放能量的两条途径' },
      lines: [
        {
          id: 'rp-1',
          text: {
            en: 'Respiration is the release of energy from nutrient molecules, in every living cell, all the time. Not "making energy" — energy is not made. The energy is used for muscle contraction, for active transport, for building large molecules from small ones, for cell division, and in mammals and birds for maintaining a constant body temperature.',
            zh: '呼吸作用是从营养分子中释放能量，发生在每一个活细胞中，时刻不停。它不是"制造能量"——能量不会被制造出来。释放的能量用于肌肉收缩、主动运输、由小分子合成大分子、细胞分裂，在哺乳动物和鸟类中还用于维持恒定的体温。',
          },
          action: { type: 'setParams', params: { intensity: 60, duration: 4, fitness: 30 } },
        },
        {
          id: 'rp-2',
          text: {
            en: 'Aerobic respiration uses oxygen: glucose plus oxygen gives carbon dioxide plus water. At a gentle pace all the energy comes this way. Look at the graphs — the aerobic supply covers the whole demand and the anaerobic line stays on zero.',
            zh: '有氧呼吸利用氧：葡萄糖加氧生成二氧化碳和水。在较轻的强度下，全部能量都来自这条途径。看图——有氧供应覆盖了全部需求，无氧那条线一直是零。',
          },
        },
        {
          id: 'rp-3',
          text: {
            en: 'But delivering oxygen has a ceiling. Heart rate, stroke volume, breathing rate and depth all go up when you exercise — for exactly the reasons you met in the transport lesson — and eventually they run out of room. Now push the intensity past that ceiling.',
            zh: '但输送氧有一个上限。运动时心率、每搏输出量、呼吸频率和深度都会上升——原因你在运输那一课已经见过——但最终会到顶。现在把强度推过这个上限。',
          },
          action: { type: 'setParams', params: { intensity: 140, duration: 4, fitness: 30 } },
          pause: 1,
        },
        {
          id: 'rp-4',
          text: {
            en: 'The aerobic line flattens at the ceiling and the anaerobic line lifts off it. In muscle, anaerobic respiration converts glucose into lactic acid, and no oxygen is needed. So the exercise can continue — but at a price.',
            zh: '有氧那条线在上限处变平，无氧那条线随之抬起。在肌肉中，无氧呼吸把葡萄糖转化为乳酸，不需要氧。因此运动可以继续——但要付出代价。',
          },
        },
        {
          id: 'rp-5',
          text: {
            en: 'The price is in the note. Aerobic respiration gets about thirty-two molecules of ATP from one glucose; anaerobic gets two. So covering the same energy without oxygen burns sixteen times the glucose. That is what "much less energy per molecule" actually means.',
            zh: '代价写在提示里。有氧呼吸从一分子葡萄糖获得约 32 个 ATP，无氧呼吸只得 2 个。因此在无氧条件下提供同样的能量，要消耗 16 倍的葡萄糖。"每分子释放的能量少得多"就是这个意思。',
          },
        },
        {
          id: 'rp-6',
          text: {
            en: 'And lactic acid builds up in the muscles — that is the third graph. Now watch what happens when the exercise stops. The demand drops instantly. The lactic acid does not.',
            zh: '同时乳酸在肌肉中积累——这就是第三张图。现在看运动停止时发生了什么：需求立刻下降，乳酸却没有。',
          },
        },
        {
          id: 'rp-7',
          text: {
            en: 'It has to be broken down, and breaking it down needs oxygen — it is carried in the blood to the liver and oxidised there. The extra oxygen needed to do that is the oxygen debt, and it was built up during the exercise and is repaid afterwards.',
            zh: '乳酸必须被分解，而分解需要氧——它经血液运到肝脏并在那里被氧化。为此额外需要的氧就是氧债，它在运动中形成，在运动后偿还。',
          },
        },
        {
          id: 'rp-8',
          text: {
            en: 'Which answers a question people find odd: why do you keep panting after you have stopped running? Because the running is over and the debt is not. Try a harder effort and watch the recovery time grow.',
            zh: '这解答了一个大家常觉得奇怪的问题：为什么停下来之后还在喘？因为跑步结束了，债还没还完。试试更大的强度，看恢复时间如何变长。',
          },
          action: { type: 'setParams', params: { intensity: 150, duration: 8, fitness: 30 } },
        },
        {
          id: 'rp-9',
          text: {
            en: 'And raise the fitness. A fitter person has a higher aerobic ceiling — a stronger heart, more stroke volume, more oxygen delivered — so the same effort stays aerobic where it would have gone anaerobic. That is what training buys you.',
            zh: '再把体能调高。体能更好的人有更高的有氧上限——更强的心脏、更大的每搏输出量、更多的氧输送——因此同样的强度对他仍是有氧的，而对别人已经转入无氧。这就是训练带来的收益。',
          },
          action: { type: 'setParams', params: { intensity: 150, duration: 8, fitness: 100 } },
        },
        {
          id: 'rp-10',
          text: {
            en: 'One more thing. In yeast, anaerobic respiration gives a different product: glucose becomes ethanol and carbon dioxide. Same idea — release energy without oxygen — but different waste. That reaction makes bread rise and makes wine and beer, which is where this leads next.',
            zh: '还有一点。在酵母中，无氧呼吸的产物不同：葡萄糖变成乙醇和二氧化碳。原理相同——在无氧条件下释放能量——但废物不同。正是这个反应让面包发起来，也酿出了葡萄酒和啤酒，这也是接下来要讲的内容。',
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
            en: 'Aerobic: glucose + oxygen → carbon dioxide + water. Anaerobic in muscle: glucose → lactic acid. Anaerobic in yeast: glucose → ethanol + carbon dioxide. Learn all three word equations; they are quick marks.',
            zh: '有氧：葡萄糖 + 氧 → 二氧化碳 + 水。肌肉无氧：葡萄糖 → 乳酸。酵母无氧：葡萄糖 → 乙醇 + 二氧化碳。三个文字表达式都要背，这是容易拿的分。',
          },
        },
        {
          id: 'sum-2',
          text: {
            en: 'Breathing in: intercostal muscles and diaphragm contract, chest volume increases, pressure falls, air flows in. Volume first, pressure second. And the lungs do not suck.',
            zh: '吸气：肋间肌与膈收缩，胸腔容积增大，压力下降，空气流入。先容积，后压力。而且肺并不会"吸"。',
          },
        },
        {
          id: 'sum-3',
          text: {
            en: 'And the oxygen debt is the extra oxygen needed afterwards to break down the lactic acid built up during the exercise. That is why breathing stays fast and deep after you stop.',
            zh: '氧债是运动结束后为分解运动中积累的乳酸所额外需要的氧。这就是停下来之后呼吸依然又快又深的原因。',
          },
        },
      ],
    },
  ],
}

export default gasExchangeNarration
