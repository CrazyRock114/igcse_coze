import type { NarrationScript } from '@/content/types'

export const transportNarration: NarrationScript = {
  id: '9-1-transport-animals',
  sections: [
    {
      id: 'intro',
      type: 'intro',
      title: { en: 'A pump, some pipes and some valves', zh: '一个泵、一些管子和一些瓣膜' },
      lines: [
        {
          id: 'intro-1',
          text: {
            en: 'A circulatory system is three things: a pump to push the blood, vessels to carry it, and valves to make sure it only goes one way. Take the valves away and the pump would push the blood back and forth in the same tube and deliver nothing.',
            zh: '循环系统由三部分组成：推动血液的泵、输送血液的血管，以及确保血液只朝一个方向流动的瓣膜。若没有瓣膜，泵只会把血液在同一根管子里推来推去，什么也送不到。',
          },
        },
        {
          id: 'intro-2',
          text: {
            en: 'A fish has a single circulation: the blood passes through the heart once per circuit. Heart, then gills, then the rest of the body, then back. And there is the problem — after squeezing through the narrow gill capillaries the blood has lost most of its pressure, so it creeps round the body slowly.',
            zh: '鱼是单循环：血液每循环一周只经过心脏一次。心脏、鳃、身体其余部分，然后返回。问题就在这里——血液挤过狭窄的鳃毛细血管后，压力已所剩无几，因此只能缓慢地流经全身。',
          },
        },
        {
          id: 'intro-3',
          text: {
            en: 'A mammal has a double circulation: the blood passes through the heart twice per circuit. Once on the pulmonary circuit to the lungs and back, once on the systemic circuit to the body and back. Two loops, one heart, and the heart re-pressurises the blood between them.',
            zh: '哺乳动物是双循环：血液每循环一周经过心脏两次。一次是经肺循环到肺再回来，一次是经体循环到全身再回来。两个回路、一颗心脏，而心脏在两者之间重新为血液加压。',
          },
        },
        {
          id: 'intro-4',
          text: {
            en: 'So blood reaches the body at high pressure and travels fast. It can deliver oxygen and glucose more quickly to a mammal that needs a great deal of both — because a mammal keeps itself warm, and that costs energy every second of its life.',
            zh: '于是血液以高压到达身体各处并快速流动。它能更迅速地把氧气和葡萄糖送到需要大量二者的哺乳动物体内——因为哺乳动物要维持体温，而这在它生命的每一秒都在消耗能量。',
          },
        },
      ],
    },
    {
      id: 'heart',
      type: 'concept',
      title: { en: 'Four chambers and four valves', zh: '四个腔和四组瓣膜' },
      lines: [
        {
          id: 'hrt-1',
          text: {
            en: 'Blood always leaves the heart in an artery and returns in a vein. That is the definition, and it is about direction, not about oxygen — the pulmonary artery carries deoxygenated blood, and the pulmonary vein carries oxygenated blood. Both are named for which way they point.',
            zh: '血液离开心脏走的永远是动脉，回到心脏走的永远是静脉。这是定义，取决于方向而不是含氧量——肺动脉输送的是缺氧血，肺静脉输送的是含氧血。两者都是按流向命名的。',
          },
        },
        {
          id: 'hrt-2',
          text: {
            en: 'Deoxygenated blood comes back from the body in the vena cava into the right atrium, down into the right ventricle, and out through the pulmonary artery to the lungs. Oxygenated blood returns in the pulmonary vein to the left atrium, down into the left ventricle, and out through the aorta to the body.',
            zh: '缺氧血由上下腔静脉从全身返回，进入右心房，下行至右心室，再经肺动脉泵往肺。含氧血由肺静脉返回左心房，下行至左心室，再经主动脉泵往全身。',
          },
        },
        {
          id: 'hrt-3',
          text: {
            en: 'The left ventricle wall is much thicker than the right. Not because it holds more blood — the two hold the same — but because it pushes blood all the way round the body, while the right pushes it only to the lungs and back. More force needed, more muscle.',
            zh: '左心室壁比右心室厚得多。不是因为它容纳更多血液——两者容量相同——而是因为它要把血液推送到全身，而右心室只需推到肺再回来。需要更大的力，就需要更多的肌肉。',
          },
        },
        {
          id: 'hrt-4',
          text: {
            en: 'And the atria walls are thin, because an atrium only pushes blood down into the ventricle beneath it — a few centimetres, against almost no resistance.',
            zh: '心房壁很薄，因为心房只需把血液推入其下方的心室——只有几厘米，几乎不需要克服阻力。',
          },
        },
        {
          id: 'hrt-5',
          text: {
            en: 'The valves keep it all going forwards. Atrioventricular valves between each atrium and ventricle shut when the ventricle contracts, so blood cannot go back up. Semilunar valves in the aorta and pulmonary artery shut when the ventricle relaxes, so blood cannot fall back in. The two heart sounds are those two sets closing.',
            zh: '瓣膜使一切保持向前。房室瓣位于心房与心室之间，在心室收缩时关闭，血液便无法倒流回心房。半月瓣位于主动脉和肺动脉中，在心室舒张时关闭，血液便无法回落到心室。心跳的两个声音就是这两组瓣膜关闭的声音。',
          },
        },
        {
          id: 'hrt-6',
          text: {
            en: 'And the septum, the wall down the middle, keeps the two sides completely separate. Without it the oxygenated and deoxygenated blood would mix, and every organ in the body would be supplied with something less than fully oxygenated blood.',
            zh: '而位于中央的室间隔把左右两侧完全隔开。若没有它，含氧血与缺氧血就会混合，全身每个器官得到的都将是含氧量不足的血液。',
          },
        },
      ],
    },
    {
      id: 'exercise',
      type: 'interaction',
      title: { en: 'What exercise actually asks for', zh: '运动到底在要求什么' },
      lines: [
        {
          id: 'ex-1',
          text: {
            en: 'Here is the investigation the syllabus asks for, with one thing added that you cannot change in a classroom: how fit the subject is. Start with someone untrained, sitting still. Pulse about seventy-two.',
            zh: '这就是考纲要求的探究，只是多了一个在教室里无法改变的变量：受试者的体能水平。先看一个未受训练的人静坐时的情形，脉搏约为每分钟 72 次。',
          },
          action: { type: 'setParams', params: { intensity: 60, duration: 5, fitness: 0 } },
        },
        {
          id: 'ex-2',
          text: {
            en: 'Exercise starts at two minutes. The rate climbs — not instantly, but over about half a minute — and settles at a new level. Muscles are respiring faster, so they need oxygen and glucose delivered faster and carbon dioxide taken away faster. A faster heart does all three.',
            zh: '运动从第 2 分钟开始。心率上升——不是瞬间，而是在约半分钟内——然后稳定在一个新水平。肌肉呼吸作用加快，因此需要更快地送来氧气和葡萄糖、更快地带走二氧化碳。心跳加快同时做到了这三件事。',
          },
        },
        {
          id: 'ex-3',
          text: {
            en: 'Now look at the second graph. Cardiac output — the volume pumped per minute — is heart rate multiplied by stroke volume, the amount pushed out per beat. Both rise during exercise, so the output rises much more than the rate alone.',
            zh: '现在看第二张图。心输出量——每分钟泵出的血量——等于心率乘以每搏输出量，即每次搏动泵出的血量。运动时两者都上升，因此心输出量的增幅远大于心率本身。',
          },
        },
        {
          id: 'ex-4',
          text: {
            en: 'Now make the subject an athlete, and look at the resting pulse first. Forty-two. Their heart is beating thirty times a minute less than the untrained subject — and yet they are perfectly well.',
            zh: '现在把受试者换成运动员，先看静息脉搏：42。他的心脏每分钟比未训练者少跳 30 次——但他完全健康。',
          },
          action: { type: 'setParams', params: { intensity: 60, duration: 5, fitness: 100 } },
          pause: 1,
        },
        {
          id: 'ex-5',
          text: {
            en: 'Because look at the stroke volume beside it. One hundred and twenty millilitres against seventy. Multiply either pair together and you get the same five litres a minute. The athlete is not pumping less blood — they are pumping the same blood in fewer, bigger beats. Training builds the heart muscle, and a stronger heart empties more completely.',
            zh: '看它旁边的每搏输出量：120 毫升对 70 毫升。把每一对相乘，得到的都是每分钟约 5 升。运动员并没有泵出更少的血——他是用更少、更大的搏动泵出同样多的血。训练增强了心肌，而更强的心脏排空得更彻底。',
          },
        },
        {
          id: 'ex-6',
          text: {
            en: 'And their maximum rate is no higher than anybody else’s — that is set mostly by age, not by training. What training raises is the stroke volume, and so the maximum output: about twenty litres a minute untrained, over thirty for an athlete.',
            zh: '而他的最大心率并不比别人高——最大心率主要由年龄决定，而不是训练。训练提高的是每搏输出量，进而提高最大心输出量：未训练者约每分钟 20 升，运动员超过 30 升。',
          },
          action: { type: 'setParams', params: { intensity: 100, duration: 5, fitness: 100 } },
        },
        {
          id: 'ex-7',
          text: {
            en: 'Last, the reading that a real fitness test actually measures. Not how high the rate went — how quickly it came back. Set the fitness low and watch the recovery time; set it high and watch it halve. A heart that returns to resting quickly is the definition of a fit one.',
            zh: '最后是真正的体能测试实际测量的那个读数：不是心率升得多高，而是它降回来得多快。把体能调低，看恢复时间；再调高，看它缩短一半。能迅速回到静息水平的心脏，就是"体能好"的定义。',
          },
          action: { type: 'setParams', params: { intensity: 100, duration: 5, fitness: 0 } },
        },
      ],
    },
    {
      id: 'vessels',
      type: 'concept',
      title: { en: 'Three vessels, three pressures', zh: '三种血管，三种压力' },
      lines: [
        {
          id: 'ves-1',
          text: {
            en: 'Arteries carry blood away from the heart at high pressure, in surges. So they have thick walls with a great deal of muscle and elastic tissue, and a narrow lumen. The elastic tissue stretches with each surge and recoils between them, which smooths the flow.',
            zh: '动脉以高压、呈脉冲式把血液从心脏运出。因此它们管壁厚，含有大量肌肉和弹性组织，管腔狭窄。弹性组织随每次搏动扩张、在两次之间回缩，使血流变得平稳。',
          },
        },
        {
          id: 'ves-2',
          text: {
            en: 'Veins return blood at low pressure, so they need no thick wall — thin walls, a wide lumen, and little muscle. But low pressure will not push blood uphill from your feet, so veins have valves along them, and the leg muscles squeeze them as you walk.',
            zh: '静脉以低压把血液送回，因此不需要厚壁——壁薄、腔宽、肌肉少。但低压无法把血液从脚部往上推，因此静脉内有瓣膜，行走时腿部肌肉又会挤压它们。',
          },
        },
        {
          id: 'ves-3',
          text: {
            en: 'Capillaries are where the job actually gets done. Their walls are one cell thick, so the diffusion distance to a body cell is as short as it can be. They are narrow and there are enormous numbers of them, which gives a huge total surface area and slows the blood down — giving time for exchange.',
            zh: '毛细血管才是真正完成任务的地方。它们的壁只有一个细胞厚，因此到体细胞的扩散距离尽可能短。它们又细又极多，从而提供巨大的总表面积并使血流减慢——为物质交换留出时间。',
          },
        },
        {
          id: 'ves-4',
          text: {
            en: 'Learn the named vessels as pairs. Heart: vena cava in, aorta out. Lungs: pulmonary artery in, pulmonary vein out. Kidneys: renal artery in, renal vein out. Liver: hepatic artery in, hepatic vein out — and one extra, the hepatic portal vein, which brings blood from the gut to the liver so that everything absorbed is checked before it reaches the rest of you.',
            zh: '把这些血管成对记忆。心脏：腔静脉入、主动脉出。肺：肺动脉入、肺静脉出。肾：肾动脉入、肾静脉出。肝：肝动脉入、肝静脉出——还多一条肝门静脉，它把血液从消化道带到肝脏，使吸收进来的一切在到达身体其余部分之前先经过检查。',
          },
        },
      ],
    },
    {
      id: 'blood',
      type: 'concept',
      title: { en: 'What is actually in it', zh: '血液里究竟有什么' },
      lines: [
        {
          id: 'bld-1',
          text: {
            en: 'Blood is red cells, white cells, platelets and plasma. Plasma is the liquid, and it carries almost everything dissolved: carbon dioxide, digested food, urea, hormones and heat.',
            zh: '血液由红细胞、白细胞、血小板和血浆组成。血浆是液体部分，几乎所有溶解的物质都由它运输：二氧化碳、消化后的食物、尿素、激素和热量。',
          },
        },
        {
          id: 'bld-2',
          text: {
            en: 'Red cells carry oxygen, using haemoglobin. They have no nucleus, which leaves more room for haemoglobin, and they are biconcave discs, which gives a larger surface area for oxygen to diffuse across and lets them bend through a capillary narrower than they are.',
            zh: '红细胞借助血红蛋白运输氧气。它们没有细胞核，从而为血红蛋白腾出更多空间；它们呈双凹圆盘形，既增大了氧气扩散的表面积，又能弯曲着挤过比自身还窄的毛细血管。',
          },
        },
        {
          id: 'bld-3',
          text: {
            en: 'White cells defend the body, and there are two kinds worth telling apart. Phagocytes engulf and digest pathogens — they have a lobed nucleus and move about. Lymphocytes make antibodies, which are specific to one pathogen; they have a large round nucleus filling most of the cell.',
            zh: '白细胞保卫身体，其中有两类值得区分。吞噬细胞吞入并消化病原体——它们的细胞核分叶，能四处移动。淋巴细胞产生抗体，抗体对某一种病原体具有专一性；它们的细胞核大而圆，占据细胞的大部分。',
          },
        },
        {
          id: 'bld-4',
          text: {
            en: 'Platelets clot the blood. A clot stops you bleeding to death and seals the wound against pathogens getting in. The mechanism is a soluble protein in the plasma, fibrinogen, being converted into insoluble fibrin, which forms a mesh across the wound and traps red cells to make the clot.',
            zh: '血小板使血液凝固。血凝块既阻止你失血而死，也把伤口封住以防病原体进入。其机制是血浆中可溶的纤维蛋白原转变为不溶的纤维蛋白，后者在伤口上形成网状结构，网住红细胞而形成血凝块。',
          },
        },
      ],
    },
    {
      id: 'chd',
      type: 'concept',
      title: { en: 'When the heart’s own supply fails', zh: '当心脏自身的供血出问题' },
      lines: [
        {
          id: 'chd-1',
          text: {
            en: 'The heart is a muscle, and like any muscle it needs its own blood supply — the coronary arteries, running over its surface. Fatty deposits building up inside them narrow the lumen, and that is coronary heart disease.',
            zh: '心脏是一块肌肉，和任何肌肉一样需要自己的血液供应——分布在其表面的冠状动脉。脂肪沉积在其内部堆积，使管腔变窄，这就是冠心病。',
          },
        },
        {
          id: 'chd-2',
          text: {
            en: 'Less blood reaches the heart muscle, so it gets less oxygen and glucose. If a coronary artery blocks completely the muscle it supplies dies for want of oxygen — a heart attack.',
            zh: '到达心肌的血液减少，因此氧气和葡萄糖供应不足。如果冠状动脉完全堵塞，它所供应的那部分心肌就会因缺氧而坏死——这就是心肌梗死。',
          },
        },
        {
          id: 'chd-3',
          text: {
            en: 'The risk factors: a diet high in saturated fat and salt, smoking, being overweight, lack of exercise, stress, age, being male, and a family history of it. The last three you cannot do anything about; the first five you can.',
            zh: '风险因素包括：高饱和脂肪和高盐饮食、吸烟、超重、缺乏运动、压力、年龄、男性以及家族史。后三项无法改变，前五项则可以。',
          },
        },
        {
          id: 'chd-4',
          text: {
            en: 'Which is why the advice is always the same two things. Eat less saturated fat and salt, so fewer deposits build up. And exercise, which strengthens the heart muscle, lowers the resting rate, and helps keep weight and blood pressure down — the same effect you were just watching on the graph.',
            zh: '这就是为什么建议永远是那两条。少吃饱和脂肪和盐，使沉积减少。以及运动，它增强心肌、降低静息心率，并有助于控制体重和血压——正是你刚才在图上看到的那个效果。',
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
            en: 'Arteries carry blood away from the heart, veins towards it — direction, not oxygen. The left ventricle wall is thicker because it pumps to the whole body, not because it holds more blood.',
            zh: '动脉把血液运离心脏，静脉把血液送回心脏——看方向，不看含氧量。左心室壁更厚是因为它要泵向全身，而不是因为它容纳更多血液。',
          },
        },
        {
          id: 'sum-2',
          text: {
            en: 'Cardiac output is heart rate times stroke volume. When asked why an athlete’s resting pulse is low, say both halves: their stroke volume is larger, so the same output needs fewer beats.',
            zh: '心输出量等于心率乘以每搏输出量。被问到运动员静息脉搏为何很低时，两半都要答：他们的每搏输出量更大，因此同样的心输出量只需更少的搏动。',
          },
        },
        {
          id: 'sum-3',
          text: {
            en: 'And when asked why the rate rises during exercise, finish the chain: muscles respire more, so they need more oxygen and glucose and produce more carbon dioxide, so the blood must be delivered and removed faster. "Because you need more oxygen" is the first link of four.',
            zh: '被问到运动时心率为何上升，要把因果链答完：肌肉呼吸作用增强，因而需要更多氧气和葡萄糖并产生更多二氧化碳，所以血液必须更快地送达与带走。只写"因为需要更多氧气"，只答了四环中的第一环。',
          },
        },
      ],
    },
  ],
}

export default transportNarration
