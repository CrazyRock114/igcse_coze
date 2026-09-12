import type { Lesson } from '@/content/types'
import narration from './narration'

const lesson: Lesson = {
  slug: '9-1-transport-animals',
  subject: '0610',
  syllabus: [
    '0610.9.1.1',
    '0610.9.1.2',
    '0610.9.1.3',
    '0610.9.1.4',
    '0610.9.2.1',
    '0610.9.2.2',
    '0610.9.2.3',
    '0610.9.2.4',
    '0610.9.2.5',
    '0610.9.2.6',
    '0610.9.2.7',
    '0610.9.2.8',
    '0610.9.2.9',
    '0610.9.2.10',
    '0610.9.2.11',
    '0610.9.3.1',
    '0610.9.3.2',
    '0610.9.3.3',
    '0610.9.3.4',
    '0610.9.3.5',
    '0610.9.3.6',
    '0610.9.4.1',
    '0610.9.4.2',
    '0610.9.4.3',
    '0610.9.4.4',
    '0610.9.4.5',
    '0610.9.4.6',
    '0610.9.4.7',
  ],
  tier: 'extended',
  estimatedMinutes: 65,

  title: { en: 'Transport in animals', zh: '动物体内的运输' },
  summary: {
    en: 'An athlete’s heart beats thirty times a minute slower than yours and pumps exactly as much blood. Multiply rate by stroke volume and both come to five litres.',
    zh: '运动员的心脏每分钟比你少跳三十次，却泵出同样多的血液。把心率乘以每搏输出量，两者都是每分钟五升。',
  },

  objectives: [
    {
      en: 'Describe a circulatory system as vessels, a pump and valves giving one-way flow.',
      zh: '把循环系统描述为由血管、泵与瓣膜构成的单向流动系统。',
    },
    {
      en: 'Describe the single circulation of a fish and the double circulation of a mammal, and explain the advantages of a double circulation. (Extended)',
      zh: '描述鱼的单循环与哺乳动物的双循环，并解释双循环的优点。（Extended）',
    },
    {
      en: 'Identify the structures of the mammalian heart, including the valves and the septum, and explain the relative thickness of the walls. (Extended)',
      zh: '识别哺乳动物心脏的结构，包括瓣膜与室间隔，并解释各壁厚薄的差异。（Extended）',
    },
    {
      en: 'Investigate, describe and explain the effect of physical activity on heart rate.',
      zh: '探究、描述并解释体力活动对心率的影响。',
    },
    {
      en: 'Describe coronary heart disease, its risk factors, and the roles of diet and exercise in reducing risk.',
      zh: '描述冠心病及其风险因素，以及饮食与运动在降低风险中的作用。',
    },
    {
      en: 'Describe the structure of arteries, veins and capillaries, and relate each to its function. (Extended)',
      zh: '描述动脉、静脉与毛细血管的结构，并把各自结构与功能联系起来。（Extended）',
    },
    {
      en: 'Identify the main blood vessels to and from the heart, lungs, kidneys and liver.',
      zh: '识别进出心、肺、肾与肝的主要血管。',
    },
    {
      en: 'List the components of blood and state the functions of each, including lymphocytes and phagocytes. (Extended)',
      zh: '列出血液的组成成分并说出各自的功能，包括淋巴细胞与吞噬细胞。（Extended）',
    },
  ],

  glossary: [
    {
      en: 'double circulation',
      zh: '双循环',
      definition: {
        en: 'A system in which the blood passes through the heart twice per circuit — once to the lungs, once to the body — so it is re-pressurised between them.',
        zh: '血液每循环一周经过心脏两次的系统——一次到肺，一次到全身——因此在两者之间被重新加压。',
      },
      syllabus: ['0610.9.1.3'],
    },
    {
      en: 'cardiac output',
      zh: '心输出量',
      definition: {
        en: 'The volume of blood pumped by a ventricle in one minute: heart rate × stroke volume. About 5 dm³/min at rest, in anybody.',
        zh: '心室每分钟泵出的血量：心率 × 每搏输出量。任何人在静息时都约为 5 dm³/min。',
      },
      syllabus: ['0610.9.2.11'],
    },
    {
      en: 'stroke volume',
      zh: '每搏输出量',
      definition: {
        en: 'The volume pushed out by a ventricle in one beat. Training increases it, which is why a trained heart can beat more slowly.',
        zh: '心室每搏动一次泵出的血量。训练会使它增大，这正是受过训练的心脏可以跳得更慢的原因。',
      },
      syllabus: ['0610.9.2.11'],
    },
    {
      en: 'septum',
      zh: '室间隔',
      definition: {
        en: 'The wall separating the two sides of the heart, keeping oxygenated and deoxygenated blood from mixing.',
        zh: '分隔心脏左右两侧的壁，防止含氧血与缺氧血混合。',
      },
      syllabus: ['0610.9.2.9'],
    },
    {
      en: 'hepatic portal vein',
      zh: '肝门静脉',
      definition: {
        en: 'The vessel carrying blood from the gut to the liver, so that everything absorbed is processed before reaching the rest of the body.',
        zh: '把血液从消化道运送到肝脏的血管，使吸收进来的一切在到达身体其余部分之前先被处理。',
      },
      syllabus: ['0610.9.3.6'],
    },
    {
      en: 'coronary heart disease',
      zh: '冠心病',
      definition: {
        en: 'Narrowing of the coronary arteries by fatty deposits, so less oxygen reaches the heart muscle itself.',
        zh: '冠状动脉因脂肪沉积而变窄，使到达心肌本身的氧气减少。',
      },
      syllabus: ['0610.9.2.5'],
    },
    {
      en: 'fibrin',
      zh: '纤维蛋白',
      definition: {
        en: 'The insoluble protein formed from fibrinogen during clotting. It forms a mesh that traps red cells and seals the wound.',
        zh: '凝血过程中由纤维蛋白原形成的不溶性蛋白。它形成网状结构，网住红细胞并封闭伤口。',
      },
      syllabus: ['0610.9.4.7'],
    },
    {
      en: 'atrioventricular valve',
      zh: '房室瓣',
      definition: {
        en: 'A one-way valve between an atrium and a ventricle. The right side has the tricuspid valve (three flaps), the left has the bicuspid or mitral valve (two flaps). They close when the ventricle contracts, stopping blood from flowing back into the atrium.',
        zh: '心房与心室之间的单向瓣膜。右侧为三尖瓣（三片瓣叶），左侧为二尖瓣/僧帽瓣（两片瓣叶）。心室收缩时它们关闭，防止血液回流到心房。',
      },
      syllabus: ['0610.9.2.8'],
    },
    {
      en: 'semilunar valve',
      zh: '半月瓣',
      definition: {
        en: 'A one-way valve at the exit of each ventricle, where the blood leaves the heart. There is one at the start of the pulmonary artery and one at the start of the aorta. They close after the ventricle has squeezed, stopping blood from falling back into the ventricle.',
        zh: '位于心室出口（血液离开心脏之处）的单向瓣膜。肺动脉起点有一个，主动脉起点有一个。心室泵血后它们关闭，防止血液倒流回心室。',
      },
      syllabus: ['0610.9.2.8'],
    },
    {
      en: 'pacemaker',
      zh: '起搏点',
      definition: {
        en: 'A small group of specialised muscle cells in the wall of the right atrium that sets the rate at which the heart beats. It produces a small electrical signal that spreads across both atria, making them contract together, then passes down to the ventricles.',
        zh: '右心房壁上一小组特化的肌肉细胞，决定心率。它们发出微小的电信号，扩散到两个心房使其同时收缩，再向下传导到心室。',
      },
      syllabus: ['0610.9.2.10'],
    },
    {
      en: 'single circulation',
      zh: '单循环',
      definition: {
        en: 'A circulatory system in which the blood passes through the heart only once per circuit of the body. Fish have this: heart → gills → body → heart. The blood loses pressure going through the gill capillaries before it reaches the body, so flow is slow.',
        zh: '血液每循环一周只经过心脏一次的循环系统。鱼就是这种：心→鳃→全身→心。血液在鳃毛细血管中损失了压力，到达全身时流速较慢。',
      },
      syllabus: ['0610.9.1.3'],
    },
    {
      en: 'oxygenated blood',
      zh: '含氧血',
      definition: {
        en: 'Blood that has just picked up oxygen at the lungs (in mammals) or gills (in fish). In diagrams it is drawn red; in the body it is bright red, not the dark red of deoxygenated blood.',
        zh: '刚从肺（哺乳动物）或鳃（鱼）获取了氧气的血液。图中画成红色；在体内颜色是鲜红色，与缺氧血的暗红色不同。',
      },
      syllabus: ['0610.9.1.3'],
    },
    {
      en: 'plasma',
      zh: '血浆',
      definition: {
        en: 'The pale yellow liquid part of blood, in which the cells and platelets are suspended. It is mostly water, and carries dissolved substances around: carbon dioxide, digested food, hormones, antibodies, and urea.',
        zh: '血液中淡黄色的液体部分，血细胞和血小板悬浮其中。它大部分是水，把溶解的物质运送全身：二氧化碳、已消化的食物、激素、抗体和尿素。',
      },
      syllabus: ['0610.9.4.1'],
    },
    {
      en: 'red blood cell',
      zh: '红细胞',
      definition: {
        en: 'A small doughnut-shaped blood cell with no nucleus. The shape and the missing nucleus together make room for millions of molecules of haemoglobin, the red pigment that carries oxygen from the lungs to every cell in the body.',
        zh: '小而呈圆饼状（中央凹入）、没有细胞核的血细胞。这种形状加上没有细胞核，使细胞内容纳下几百万个血红蛋白分子——正是这种红色色素把氧从肺部运到全身每个细胞。',
      },
      syllabus: ['0610.9.4.2'],
    },
    {
      en: 'phagocyte',
      zh: '吞噬细胞',
      definition: {
        en: 'A type of white blood cell that engulfs and digests pathogens. It changes shape, flows around the bacterium, takes it inside the cell, and breaks it down with enzymes. Pus at a wound site is mostly dead phagocytes that have done this and then died.',
        zh: '一种能吞噬并分解病原体的白细胞。它改变形状，包围细菌，把它吞进细胞内，再用酶分解。伤口处的脓液主要是已经完成吞噬并死去的吞噬细胞。',
      },
      syllabus: ['0610.9.4.5'],
    },
    {
      en: 'lymphocyte',
      zh: '淋巴细胞',
      definition: {
        en: 'A type of white blood cell with a large round nucleus. Lymphocytes make antibodies — proteins that recognise and bind to specific pathogens, marking them for destruction by phagocytes. They are also the cells that "remember" past infections, which is how vaccination works.',
        zh: '一种有大而圆的细胞核的白细胞。淋巴细胞制造抗体——能识别并结合特定病原体的蛋白质，标记它们以便吞噬细胞破坏。它们也是"记住"过去感染的细胞，这正是疫苗能起作用的原理。',
      },
      syllabus: ['0610.9.4.6'],
    },
    {
      en: 'myocardial infarction',
      zh: '心肌梗死',
      definition: {
        en: 'Death of heart-muscle cells from a blocked coronary artery. The part of the heart muscle downstream of the blockage is starved of oxygen and dies — "a heart attack". Time is muscle: every minute of delay loses more cardiac cells that do not regrow.',
        zh: '因冠状动脉阻塞而导致的心肌细胞死亡。阻塞远端的心肌因缺氧而死亡——俗称"心梗"。时间就是心肌：每延迟一分钟就损失更多不能再生心肌细胞。',
      },
      syllabus: ['0610.9.3.6'],
    },
    {
      en: 'cerebral infarction',
      zh: '脑梗死',
      definition: {
        en: 'Death of brain cells from a blocked artery in the brain — one of the two kinds of "stroke". The brain cells lost do not regrow, so the abilities those cells carried (movement, speech, memory) may be lost permanently. The other kind of stroke is haemorrhagic, where a vessel bursts.',
        zh: '因脑内动脉阻塞而导致的脑细胞死亡——"中风"的两类之一。损失的脑细胞不能再生，所以它们负责的功能（运动、语言、记忆）可能永久丧失。另一类中风是出血性，由血管破裂引起。',
      },
      syllabus: ['0610.9.3.6'],
    },
    {
      en: 'varicose vein',
      zh: '静脉曲张',
      definition: {
        en: 'A vein whose internal valves no longer close properly, so blood falls back down under gravity and pools. Common in the legs, where blood has to climb back to the heart against gravity. The vein bulges, the leg aches, and slow-flowing blood can clot.',
        zh: '瓣膜无法正常闭合的静脉，血液在重力作用下回流、淤积。多见于腿部，因为下肢血液要克服重力回到心脏。静脉鼓起、腿部酸痛，缓慢流动的血液还可能形成血栓。',
      },
      syllabus: ['0610.9.3.4'],
    },
    {
      en: 'anaemia',
      zh: '贫血',
      definition: {
        en: 'A reduced capacity of the blood to carry oxygen, usually from too little haemoglobin or too few red blood cells. The most common cause worldwide is iron deficiency — iron is the atom at the centre of each haemoglobin molecule that actually grips the oxygen.',
        zh: '血液运氧能力下降，通常是血红蛋白不足或红细胞过少所致。全球最常见的原因是缺铁——铁是每个血红蛋白分子中央真正抓住氧气的那个原子。',
      },
      syllabus: ['0610.9.4.1'],
    },
  ],

  equations: [
    {
      latex: '\\text{cardiac output} = \\text{heart rate} \\times \\text{stroke volume}',
      meaning: {
        en: 'Two ways to move more blood: beat faster, or push more out per beat. Exercise does both; training raises the second so that resting needs less of the first.',
        zh: '输送更多血液有两条途径：跳得更快，或每次搏动泵出更多。运动两者兼用；训练提高后者，从而使静息时不必依赖前者。',
      },
      substitute: (r) =>
        `${r['resting'] ?? 0} \\times ${r['stroke'] ?? 0}\\ \\mathrm{cm^3} \\approx 5\\ \\mathrm{dm^3\\,min^{-1}}\\ \\text{at rest}`,
    },
    {
      latex: '\\text{peak} = \\text{HR}_{\\max} \\times \\text{SV}_{\\max}',
      meaning: {
        en: 'Maximum heart rate is set by age and barely changes with training. The whole gain from training is in the stroke volume.',
        zh: '最大心率主要由年龄决定，几乎不随训练改变。训练带来的全部提升都在每搏输出量上。',
      },
      substitute: (r) =>
        `\\text{peak } ${r['peak'] ?? 0}\\ \\mathrm{min^{-1}} \\rightarrow ${r['peakOutput'] ?? 0}\\ \\mathrm{dm^3\\,min^{-1}} \\quad \\text{recovery } ${r['recovery'] ?? 0}\\ \\mathrm{min}`,
    },
  ],

  sim: {
    primitive: 'plot2d',
    kernel: '9-1-transport-animals',
    hint: {
      en: 'Run the same exercise on an untrained subject and on an athlete. Compare the resting pulse, then the recovery time.',
      zh: '让未受训练者和运动员做同样的运动。先比较静息脉搏，再比较恢复时间。',
    },
    params: [
      {
        key: 'intensity',
        label: { en: 'How hard the exercise is', zh: '运动强度' },
        unit: '%',
        min: 0,
        max: 100,
        step: 5,
        default: 60,
      },
      {
        key: 'duration',
        label: { en: 'How long it lasts', zh: '持续时间' },
        unit: 'min',
        min: 0,
        max: 10,
        step: 1,
        default: 5,
      },
      {
        key: 'fitness',
        label: { en: 'How well trained the subject is', zh: '受试者的训练程度' },
        unit: '%',
        min: 0,
        max: 100,
        step: 5,
        default: 0,
      },
    ],
    readouts: [
      {
        key: 'resting',
        label: { en: 'Resting heart rate', zh: '静息心率' },
        unit: 'min⁻¹',
        sigFigs: 3,
        exact: true,
      },
      {
        key: 'stroke',
        label: { en: 'Resting stroke volume', zh: '静息每搏输出量' },
        unit: 'cm³',
        sigFigs: 3,
        exact: true,
      },
      {
        key: 'peak',
        label: { en: 'Peak heart rate', zh: '峰值心率' },
        unit: 'min⁻¹',
        sigFigs: 3,
        exact: true,
      },
      {
        key: 'peakOutput',
        label: { en: 'Peak cardiac output', zh: '峰值心输出量' },
        unit: 'dm³/min',
        sigFigs: 3,
        exact: true,
      },
      {
        key: 'recovery',
        label: { en: 'Time to recover', zh: '恢复所需时间' },
        unit: 'min',
        sigFigs: 3,
        exact: true,
      },
    ],
    presets: [
      {
        label: { en: 'Untrained, moderate', zh: '未训练，中等强度' },
        params: { intensity: 60, duration: 5, fitness: 0 },
      },
      {
        label: { en: 'Athlete, same exercise', zh: '运动员，同样的运动' },
        params: { intensity: 60, duration: 5, fitness: 100 },
      },
      {
        label: { en: 'Untrained, flat out', zh: '未训练，全力' },
        params: { intensity: 100, duration: 5, fitness: 0 },
      },
      {
        label: { en: 'Athlete, flat out', zh: '运动员，全力' },
        params: { intensity: 100, duration: 5, fitness: 100 },
      },
      {
        label: { en: 'A long steady run', zh: '长时间匀速跑' },
        params: { intensity: 55, duration: 10, fitness: 60 },
      },
      {
        label: { en: 'Sitting still', zh: '静坐不动' },
        params: { intensity: 0, duration: 5, fitness: 0 },
      },
    ],
  },

  narration,

  checkpoints: [
    {
      id: '0610-9-1-cp1',
      syllabus: ['0610.9.2.11'],
      tier: 'extended',
      commandWord: 'Explain',
      marks: 4,
      stem: 'Explain why a person’s heart rate increases during vigorous exercise.',
      markScheme: [
        { text: 'The muscles are respiring faster to release more energy for contraction', marks: 1 },
        {
          text: 'so they need oxygen and glucose delivered to them more quickly',
          marks: 1,
        },
        { text: 'and the carbon dioxide they produce must be removed more quickly', marks: 1 },
        {
          text: 'A faster heart rate increases the cardiac output, so blood circulates faster and does all of this',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Four links in the chain. "Because the muscles need more oxygen" is the first one only, and on its own it is a quarter of the answer.',
        zh: '因果链有四环。"因为肌肉需要更多氧气"只是第一环，单独写只答了四分之一。',
      },
    },
    {
      id: '0610-9-1-cp2',
      syllabus: ['0610.9.2.11'],
      tier: 'extended',
      commandWord: 'Suggest',
      marks: 3,
      stem: 'A trained athlete has a resting heart rate of 45 beats per minute. An untrained person of the same age has a resting heart rate of 72 beats per minute. Both have the same resting cardiac output. Suggest an explanation.',
      markScheme: [
        { text: 'Cardiac output is heart rate multiplied by stroke volume', marks: 1 },
        {
          text: 'The athlete has a larger stroke volume, because training has strengthened the heart muscle so each contraction empties the ventricle more completely',
          marks: 1,
        },
        {
          text: 'So the same volume per minute is pumped in fewer, larger beats',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'The stem tells you the outputs are equal, so the answer must be about stroke volume. "The athlete is fitter" restates the question without explaining anything.',
        zh: '题干已告诉你两者的心输出量相同，因此答案必须落在每搏输出量上。写"运动员体能更好"只是把题目复述一遍，什么也没解释。',
      },
    },
    {
      id: '0610-9-1-cp3',
      syllabus: ['0610.9.1.4'],
      tier: 'extended',
      commandWord: 'Explain',
      marks: 3,
      stem: 'A mammal has a double circulation and a fish has a single circulation. Explain the advantage of a double circulation.',
      markScheme: [
        {
          text: 'In a single circulation the blood loses pressure passing through the gill capillaries and travels slowly to the body',
          marks: 1,
        },
        {
          text: 'In a double circulation the blood returns to the heart after the lungs and is pumped again, so it reaches the body at high pressure',
          marks: 1,
        },
        {
          text: 'So oxygen and glucose are delivered faster, which a mammal needs because it maintains a constant body temperature',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'The comparison is with the fish, so say what happens in the fish too. And finish on why a mammal in particular needs the speed.',
        zh: '这是与鱼的对比，因此也要说明鱼的情况。最后还要说清为什么偏偏是哺乳动物需要这种速度。',
      },
    },
    {
      id: '0610-9-1-cp4',
      syllabus: ['0610.9.2.8'],
      tier: 'extended',
      commandWord: 'Explain',
      marks: 2,
      stem: 'The wall of the left ventricle is much thicker than the wall of the right ventricle. Explain why.',
      markScheme: [
        {
          text: 'The left ventricle pumps blood all the way round the body, while the right pumps it only to the lungs',
          marks: 1,
        },
        {
          text: 'so it must generate a higher pressure, which requires more muscle',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Not because it holds more blood — the two ventricles hold the same volume, and must, or blood would pile up on one side.',
        zh: '不是因为它容纳更多血液——两个心室容量相同，也必须相同，否则血液会在一侧淤积。',
      },
    },
    {
      id: '0610-9-1-cp5',
      syllabus: ['0610.9.3.4', '0610.9.3.5'],
      tier: 'extended',
      commandWord: 'Compare',
      marks: 3,
      stem: 'Compare the structure of an artery with that of a vein, and relate each difference to the blood pressure in the vessel.',
      markScheme: [
        {
          text: 'An artery has a thick wall with much muscle and elastic tissue; a vein has a thin wall with little',
          marks: 1,
        },
        {
          text: 'because an artery must withstand and smooth out the high pressure surges from the heart, while a vein carries blood at low pressure',
          marks: 1,
        },
        {
          text: 'An artery has a narrow lumen and no valves; a vein has a wide lumen and valves along it to stop the low-pressure blood flowing backwards',
          marks: 1,
        },
      ],
      examinerNote: {
        en: '"Relate to blood pressure" is the instruction. Listing structural differences without tying each to the pressure gets about half.',
        zh: '"与血压联系起来"是题目的要求。只罗列结构差异而不把每一条与压力联系起来，大约只能拿一半分。',
      },
    },
    {
      id: '0610-9-1-cp6',
      syllabus: ['0610.9.4.7'],
      tier: 'extended',
      commandWord: 'Describe',
      marks: 3,
      stem: 'Describe how blood clots at a wound, and state two reasons why clotting is important.',
      markScheme: [
        {
          text: 'Platelets trigger the conversion of the soluble protein fibrinogen into insoluble fibrin',
          marks: 1,
        },
        {
          text: 'Fibrin forms a mesh across the wound which traps red blood cells, forming the clot',
          marks: 1,
        },
        {
          text: 'It prevents further loss of blood, and it seals the wound so that pathogens cannot enter',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Name both proteins and get them the right way round: fibrinogen is the soluble one already in the plasma, fibrin the insoluble mesh.',
        zh: '两种蛋白都要说出并且不能弄反：纤维蛋白原是血浆中原本就有的可溶蛋白，纤维蛋白才是不溶的网状结构。',
      },
    },
    {
      id: '0610-9-1-cp7',
      syllabus: ['0610.9.2.5', '0610.9.2.6'],
      tier: 'core',
      commandWord: 'Describe',
      marks: 3,
      stem: 'Describe what happens to a coronary artery in coronary heart disease, and state two changes to lifestyle that reduce the risk.',
      markScheme: [
        {
          text: 'Fatty deposits build up inside the artery, narrowing the lumen and reducing blood flow to the heart muscle',
          marks: 1,
        },
        {
          text: 'so the heart muscle receives less oxygen and glucose, and may die if the artery is blocked completely',
          marks: 1,
        },
        {
          text: 'Two from: eat less saturated fat, eat less salt, stop smoking, take regular exercise, lose excess weight',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'The coronary arteries supply the heart muscle itself. Answering about blood inside the chambers misses what the disease actually is.',
        zh: '冠状动脉供应的是心肌本身。回答心腔内的血液，就没有抓住这种疾病的实质。',
      },
    },
    {
      id: '0610-9-1-cp8',
      syllabus: ['0610.9.4.6'],
      tier: 'extended',
      commandWord: 'State',
      marks: 2,
      stem: 'State the function of a phagocyte and the function of a lymphocyte.',
      markScheme: [
        { text: 'A phagocyte engulfs and digests pathogens', marks: 1 },
        { text: 'A lymphocyte produces antibodies, which are specific to one pathogen', marks: 1 },
      ],
      examinerNote: {
        en: 'Both are white blood cells, so "it fights disease" does not distinguish them and scores nothing.',
        zh: '两者都是白细胞，因此写"它抵抗疾病"无法区分二者，不得分。',
      },
    },
  ],

  // Visual / interactive learning modules for Chapter 2 (B7 Transport in
  // mammals). See src/content/types.ts for the `LessonExtra` shape.
  // Each module uses a real figure extracted from the G8 PDF so the
  // student sees the textbook picture, not a hand-drawn approximation.
  extras: [
    // 1) The heart in one picture — 11 hotspots over the G8 Figure B7.03,
    //    plus the matching 3D model with the same hotspots anchored in 3D.
    {
      type: 'heart-anatomy',
      id: 'anatomy',
      title: { en: 'The heart, in one picture', zh: '一张图看心脏' },
      hint: {
        en: 'Click any chamber, valve or great vessel. "Follow the blood" animates a red cell body → right heart → lungs → left heart → body. Switch to 3D to rotate the heart and click the same hotspots in space.',
        zh: '点击任一心腔、瓣膜或大血管。点"跟着血液走一遍"会动画演示一个红细胞从全身→右心→肺→左心→全身的旅程。切到 3D 可以旋转心脏,在三维空间里点同一组热点。',
      },
      initialPart: 'left-ventricle',
      model3d: '/figures/3d/heart.glb',
      parts: [
        {
          id: 'vena-cava',
          name: { en: 'Vena cava', zh: '腔静脉' },
          stop: 1,
          position3d: [0.30, 0.85, 0.65],
          description: {
            en: 'The two largest veins in the body. The superior vena cava brings blood back from the head and arms, the inferior from the lower body. Both dump deoxygenated blood into the right atrium.',
            zh: '人体最大的两条静脉。上腔静脉收集来自头和手臂的血液，下腔静脉收集来自下半身的血液。两条都把缺氧血注入右心房。',
          },
        },
        {
          id: 'right-atrium',
          name: { en: 'Right atrium', zh: '右心房' },
          stop: 2,
          position3d: [0.35, 0.62, 0.70],
          description: {
            en: 'The thin-walled upper-right chamber. It receives deoxygenated blood from the venae cavae and, when full, contracts to push it down into the right ventricle through the tricuspid valve.',
            zh: '壁薄的上右侧心腔。它接收来自腔静脉的缺氧血，满了之后收缩，把血液经三尖瓣推入右心室。',
          },
          secretions: [{ en: 'Receives from venae cavae', zh: '接收腔静脉的血液' }],
        },
        {
          id: 'tricuspid-valve',
          name: { en: 'Tricuspid (AV) valve', zh: '三尖瓣（房室瓣）' },
          position3d: [0.40, 0.50, 0.70],
          description: {
            en: 'The one-way valve between the right atrium and the right ventricle. It has three flaps (hence "tri-"). When the right ventricle contracts, the flaps snap shut, preventing blood from being pushed back into the atrium.',
            zh: '位于右心房和右心室之间的单向瓣膜。它有三片瓣叶（故名"三尖"）。右心室收缩时，瓣叶啪地关闭，防止血液被推回心房。',
          },
        },
        {
          id: 'right-ventricle',
          name: { en: 'Right ventricle', zh: '右心室' },
          stop: 3,
          position3d: [0.40, 0.32, 0.70],
          description: {
            en: 'The lower-right chamber. Its wall is muscular but thinner than the left ventricle — it only has to pump blood to the lungs, which are right next door. The blood leaves through the pulmonary artery.',
            zh: '右下方的心腔。壁有肌肉但比左心室薄——它只需把血液泵到隔壁的肺。血液从肺动脉离开。',
          },
        },
        {
          id: 'pulmonary-artery',
          name: { en: 'Pulmonary artery', zh: '肺动脉' },
          stop: 4,
          position3d: [0.48, 0.88, 0.60],
          description: {
            en: 'The only artery in the body that carries deoxygenated blood. It splits into two, one branch going to each lung. At its start, just after the right ventricle, is the pulmonary semilunar valve.',
            zh: '人体中唯一一条运输缺氧血的动脉。它分成两支，分别进入左肺和右肺。在它起点——紧接右心室之后——是肺动脉半月瓣。',
          },
        },
        {
          id: 'pulmonary-vein',
          name: { en: 'Pulmonary vein', zh: '肺静脉' },
          stop: 5,
          position3d: [0.80, 0.82, 0.60],
          description: {
            en: 'The only vein in the body that carries oxygenated blood — it is bringing the blood back from the lungs to the left atrium, freshly loaded with oxygen.',
            zh: '人体中唯一一条运输含氧血的静脉——它把从肺中新鲜充氧的血液送回左心房。',
          },
        },
        {
          id: 'left-atrium',
          name: { en: 'Left atrium', zh: '左心房' },
          stop: 6,
          position3d: [0.72, 0.62, 0.70],
          description: {
            en: 'The thin-walled upper-left chamber. It receives oxygenated blood from the pulmonary veins and pushes it down into the left ventricle through the bicuspid (mitral) valve.',
            zh: '壁薄的上左侧心腔。它接收来自肺静脉的含氧血，再通过二尖瓣（僧帽瓣）推入左心室。',
          },
        },
        {
          id: 'bicuspid-valve',
          name: { en: 'Bicuspid (mitral) valve', zh: '二尖瓣（僧帽瓣）' },
          position3d: [0.62, 0.50, 0.65],
          description: {
            en: 'The one-way valve between the left atrium and the left ventricle. Two flaps, hence "bi-". Closes with a louder "lub" than the tricuspid — that is the first of the two sounds you hear through a stethoscope.',
            zh: '左心房与左心室之间的单向瓣膜。两片瓣叶，故名"二尖"。关闭时发出的"扑"比三尖瓣响——这正是听诊器听到的第一个心音。',
          },
        },
        {
          id: 'left-ventricle',
          name: { en: 'Left ventricle', zh: '左心室' },
          stop: 7,
          position3d: [0.62, 0.30, 0.65],
          description: {
            en: 'The lower-left chamber, and the strongest muscle in the body. Its wall is about three times thicker than the right ventricle — it has to pump blood all the way round the body, not just to the next room. Blood leaves through the aorta.',
            zh: '左下方的心腔，也是人体最强壮的肌肉。其壁厚约为右心室的三倍——它要把血液泵到全身各处，而非仅一墙之隔的肺。血液从主动脉离开。',
          },
        },
        {
          id: 'aorta',
          name: { en: 'Aorta', zh: '主动脉' },
          stop: 8,
          position3d: [0.65, 0.88, 0.55],
          description: {
            en: 'The largest artery in the body, leaving the left ventricle and arching over the top of the heart. It carries oxygenated blood at high pressure, and its first branches feed the heart muscle itself (the coronary arteries).',
            zh: '人体最大的动脉，从左心室发出，向上弓形越过心脏顶部。它以高压运输含氧血，第一批分支供应心肌本身（冠状动脉）。',
          },
        },
        {
          id: 'septum',
          name: { en: 'Septum', zh: '室间隔' },
          position3d: [0.50, 0.40, 0.50],
          description: {
            en: 'The muscular wall down the middle of the heart. It completely separates the two sides — oxygenated and deoxygenated blood never mix. A hole in the septum (a "hole in the heart") is a congenital defect.',
            zh: '心脏中央的肌肉壁。它把左右两侧完全隔开——含氧血和缺氧血永远不混合。间隔上的孔（"心脏有洞"）是先天缺陷。',
          },
        },
      ],
    },

    // 2) The four blood components as figure-cards
    {
      type: 'blood-components',
      id: 'components',
      title: { en: 'What blood is made of', zh: '血液的成分' },
      hint: {
        en: 'Real figures from the textbook: a red cell, a white cell (lymphocyte), a phagocyte, and a platelet. Each card has the function and the appearance.',
        zh: '讲义里的真实图：红细胞、淋巴细胞、吞噬细胞、血小板。每张卡有功能与形态描述。',
      },
      cards: [
        {
          id: 'plasma',
          term: { en: 'Plasma', zh: '血浆' },
          mechanism: {
            en: 'The liquid in which the blood cells float. It is mostly water, and carries dissolved substances around: digested food (glucose, amino acids), carbon dioxide, hormones, antibodies, and waste such as urea.',
            zh: '血液细胞悬浮其中的液体。它大部分是水，把溶解的物质运送到全身：已消化的食物（葡萄糖、氨基酸）、二氧化碳、激素、抗体和尿素等废物。',
          },
          clinical: {
            en: 'Pale yellow, slightly sticky. Makes up just over half the volume of blood. If you spin a sample in a centrifuge, the cells pile up at the bottom and the plasma stays on top.',
            zh: '淡黄色、略带黏性。占血液容量的略多于一半。把血样放进离心机旋转，细胞沉到底部，血浆留在上层。',
          },
          image: '/figures/g8/9-1-transport-animals/figure-b7-11a-rbc.png',
          imageSource: { en: 'G8 Science · Table B7.03 — plasma as the matrix of blood', zh: 'G8 Science · 表 B7.03 — 血液的基质' },
        },
        {
          id: 'red-cell',
          term: { en: 'Red blood cell', zh: '红细胞' },
          mechanism: {
            en: 'Carries oxygen from the lungs to every cell in the body. The cell is packed with haemoglobin, a red pigment that binds oxygen where it is plentiful (the lungs) and lets it go where it is needed (the respiring tissues).',
            zh: '把氧从肺部运到全身每个细胞。细胞内充满血红蛋白——一种红色色素，在氧气充足的地方（肺）与氧结合，在需要氧气的地方（正在呼吸的组织）释放氧。',
          },
          clinical: {
            en: 'A small doughnut-shaped disc with a dimple on each side and no nucleus. The biconcave shape and the missing nucleus together leave room for more haemoglobin, and make the cell flexible enough to squeeze through the tiniest capillaries.',
            zh: '小而呈圆饼状、两面凹陷的细胞，没有细胞核。双凹的形状加上无核，既容纳更多血红蛋白，也让细胞足够柔韧，能挤过最窄的毛细血管。',
          },
          image: '/figures/g8/9-1-transport-animals/figure-b7-11a-rbc.png',
          imageSource: { en: 'G8 Science · p.31 — doughnut-shaped red blood cell', zh: 'G8 Science · p.31 — 圆饼状红细胞' },
        },
        {
          id: 'lymphocyte',
          term: { en: 'Lymphocyte', zh: '淋巴细胞' },
          mechanism: {
            en: 'Makes antibodies — proteins that recognise and bind to specific pathogens (one type of antibody per lymphocyte, by chance). The antibody tags the pathogen so a phagocyte can find and destroy it. Some lymphocytes also remember past infections for decades.',
            zh: '制造抗体——能识别并结合特定病原体的蛋白质（每个淋巴细胞碰巧只识别一种）。抗体给病原体打上标记，让吞噬细胞能找到并消灭它。有些淋巴细胞还能把过去的感染记住几十年。',
          },
          clinical: {
            en: 'A round white cell with a single large nucleus that almost fills the cell, leaving only a thin ring of cytoplasm. Smaller than the phagocyte, with a smooth round outline rather than a lobed one.',
            zh: '圆形白细胞，有一个几乎占满整个细胞的大细胞核，细胞质只剩薄薄一圈。比吞噬细胞小，轮廓平滑呈圆形，细胞核不分裂成叶。',
          },
          image: '/figures/g8/9-1-transport-animals/figure-b7-12a-lymphocyte.png',
          imageSource: { en: 'G8 Science · p.33 — lymphocyte with a large nucleus', zh: 'G8 Science · p.33 — 具大核的淋巴细胞' },
        },
        {
          id: 'phagocyte',
          term: { en: 'Phagocyte', zh: '吞噬细胞' },
          mechanism: {
            en: 'Engulfs and digests pathogens. It changes shape, flows around the bacterium, takes it inside the cell, and breaks it down with enzymes. Each phagocyte can eat several bacteria in succession before it dies.',
            zh: '能吞噬并消化病原体。它改变形状，包围细菌，吞入细胞内，再用酶分解。每个吞噬细胞能连续吞下几个细菌后才死去。',
          },
          clinical: {
            en: 'An irregularly shaped white cell with a lobed nucleus (usually two to five lobes joined by thin strands). The shape-shifting on the job is what makes them look "blobby" in textbook drawings.',
            zh: '形状不规则的白细胞，细胞核分裂成叶（通常 2-5 片，以细丝相连）。在工作时不断变形，让它们在课本插图中看起来"凹凸不平"。',
          },
          image: '/figures/g8/9-1-transport-animals/figure-b7-12.png',
          imageSource: { en: 'G8 Science · p.34 — phagocyte with a lobed nucleus', zh: 'G8 Science · p.34 — 具分叶核的吞噬细胞' },
        },
        {
          id: 'platelet',
          term: { en: 'Platelet', zh: '血小板' },
          mechanism: {
            en: 'Triggers blood clotting at a wound. When a blood vessel is damaged, platelets stick to the broken edge and to each other, forming a temporary plug. They also release chemicals that start the conversion of soluble fibrinogen into insoluble fibrin, which forms a permanent mesh.',
            zh: '在伤口处触发凝血。血管受损时，血小板黏附到破损边缘并互相粘连，形成临时的塞子。它们还释放化学物质，把可溶性的纤维蛋白原转化成不溶的纤维蛋白，形成永久的网状封口。',
          },
          clinical: {
            en: 'Tiny cell fragments — not full cells, with no nucleus. Made in the bone marrow from larger cells that have broken apart. About a third the size of a red blood cell.',
            zh: '微小的细胞碎片——并非完整的细胞，没有细胞核。在骨髓中由较大的细胞碎裂而成。约为红细胞大小的三分之一。',
          },
          image: '/figures/g8/9-1-transport-animals/figure-b7-11.png',
          imageSource: { en: 'G8 Science · p.32 — platelets, fragments of cells', zh: 'G8 Science · p.32 — 血小板，细胞碎片' },
        },
      ],
    },

    // 3) Artery / capillary / vein side by side
    {
      type: 'blood-vessels-compare',
      id: 'vessels',
      title: { en: 'Artery, capillary, vein — side by side', zh: '动脉、毛细血管、静脉 —— 并排比较' },
      hint: {
        en: 'Each vessel type is built for the pressure it carries. Read the cards, then the table below.',
        zh: '每种血管都按所承受的压力结构来设计。先看卡片，再看下方对比表。',
      },
      vessels: [
        {
          id: 'artery',
          name: { en: 'Artery', zh: '动脉' },
          wall: {
            en: 'Thick, with a lot of muscle and elastic fibres. The wall stretches when the heart pumps, then springs back to push the blood on.',
            zh: '壁厚，含大量肌肉和弹性纤维。心脏泵血时管壁扩张，再弹回把血液继续向前推。',
          },
          lumen: {
            en: 'Narrow. The thick wall + narrow lumen keeps blood under high pressure.',
            zh: '管腔窄。厚壁+窄腔使血液维持高压。',
          },
          hasValves: false,
          direction: {
            en: 'Away from the heart (except the pulmonary artery, which leaves the right heart).',
            zh: '离心的（肺动脉除外——它从右心发出）。',
          },
          pressure: {
            en: 'High, surging with each heartbeat.',
            zh: '高压，随心跳起伏。',
          },
          function: {
            en: 'Carries blood away from the heart at high pressure. The elastic wall smooths the surges so the flow is less jerky by the time the blood reaches the capillaries.',
            zh: '把血液以高压从心脏运出。弹性管壁把搏动式血流变得较平稳，让血液到达毛细血管时不再是一股一股的。',
          },
          image: '/figures/g8/9-1-transport-animals/figure-b7-06.png',
          imageSource: { en: 'G8 Science · p.28, Figure B7.06 (top — thick wall, small lumen)', zh: 'G8 Science · p.28, 图 B7.06（上 —— 厚壁、小腔）' },
        },
        {
          id: 'capillary',
          name: { en: 'Capillary', zh: '毛细血管' },
          wall: {
            en: 'One cell thick. Just thin enough for oxygen, glucose, carbon dioxide and other small molecules to diffuse straight through.',
            zh: '只有一个细胞厚。薄到氧气、葡萄糖、二氧化碳等小分子可以直接穿过。',
          },
          lumen: {
            en: 'So narrow that red blood cells have to squeeze through single file.',
            zh: '极窄，红细胞只能一个个排队挤过。',
          },
          hasValves: false,
          direction: {
            en: 'From artery side to vein side. The blood slows almost to a crawl, which is exactly what exchange needs.',
            zh: '从动脉端流向静脉端。血流几乎减慢到爬行——这正是物质交换需要的。',
          },
          pressure: {
            en: 'Low and steady — the pressure has been soaked up by the artery walls.',
            zh: '低压平稳——压力已经被动脉壁吸收了。',
          },
          function: {
            en: 'The site of exchange. Oxygen and food leave the blood, carbon dioxide and waste enter it. Branch into a dense network so every cell is within a hair\'s breadth of a capillary.',
            zh: '物质交换的场所。氧和食物离开血液，二氧化碳和废物进入血液。它们分支成密集的网络，让每个细胞都距毛细血管不到一根头发直径的距离。',
          },
          image: '/figures/g8/9-1-transport-animals/figure-b7-07.png',
          imageSource: { en: 'G8 Science · p.28, Figure B7.07 — capillary network', zh: 'G8 Science · p.28, 图 B7.07 — 毛细血管网' },
        },
        {
          id: 'vein',
          name: { en: 'Vein', zh: '静脉' },
          wall: {
            en: 'Thin. There is little pressure here, so the wall does not need to be strong.',
            zh: '壁薄。这里的压力低，所以管壁无需厚实。',
          },
          lumen: {
            en: 'Wide. A big opening means the blood can flow back to the heart easily despite the low pressure.',
            zh: '管腔宽。大口径让血液在低压下仍能顺畅流回心脏。',
          },
          hasValves: true,
          direction: {
            en: 'Toward the heart (except the pulmonary vein, which enters the left heart).',
            zh: '回心的（肺静脉除外——它进入左心）。',
          },
          pressure: {
            en: 'Low, almost no surge.',
            zh: '低压，几乎无搏动。',
          },
          function: {
            en: 'Returns blood to the heart at low pressure. The valves stop it from flowing backwards between breaths or heartbeats — important in the legs, where the blood has to climb up against gravity.',
            zh: '把血液以低压送回心脏。瓣膜防止血液在呼吸或心跳间歇时倒流——这对腿部尤其重要，那里的血液要逆着重力向上流。',
          },
          image: '/figures/g8/9-1-transport-animals/figure-b7-08.png',
          imageSource: { en: 'G8 Science · p.29, Figure B7.08 — valves in a vein', zh: 'G8 Science · p.29, 图 B7.08 — 静脉瓣' },
        },
      ],
    },

    // 4) The double circulation as a flowchart
    {
      type: 'double-circulation',
      id: 'circulation',
      title: { en: 'The double circulation', zh: '双循环' },
      hint: {
        en: 'Two loops: body → right heart → lungs → left heart → body. The heart pumps twice per circuit, which is why the blood in a mammal arrives at the body at high pressure.',
        zh: '两个环：全身 → 右心 → 肺 → 左心 → 全身。心脏每次循环泵两次，这就是哺乳动物的血液到达全身时仍是高压的原因。',
      },
      image: '/figures/g8/9-1-transport-animals/figure-b7-01.png',
      imageSource: { en: 'G8 Science · p.21, Figure B7.01 — the general layout of the human circulatory system', zh: 'G8 Science · p.21, 图 B7.01 — 人体循环系统总图' },
      stations: [
        {
          id: 'body-tissues',
          label: { en: 'Body tissues', zh: '身体组织' },
          summary: { en: 'O₂ used, CO₂ produced', zh: '消耗 O₂，产生 CO₂' },
          bloodState: 'mixed',
          loop: 'systemic',
        },
        {
          id: 'vena-cava-2',
          label: { en: 'Vena cava', zh: '腔静脉' },
          summary: { en: 'deoxygenated', zh: '缺氧血' },
          bloodState: 'deoxygenated',
          loop: 'systemic',
        },
        {
          id: 'right-heart',
          label: { en: 'Right heart', zh: '右心' },
          summary: { en: 'pumps to lungs', zh: '泵向肺' },
          bloodState: 'deoxygenated',
          loop: 'pulmonary',
        },
        {
          id: 'pulmonary-artery-2',
          label: { en: 'Pulmonary artery', zh: '肺动脉' },
          summary: { en: 'deoxygenated', zh: '缺氧血' },
          bloodState: 'deoxygenated',
          loop: 'pulmonary',
        },
        {
          id: 'lungs',
          label: { en: 'Lungs (gas exchange)', zh: '肺（气体交换）' },
          summary: { en: 'CO₂ out, O₂ in', zh: '排出 CO₂，吸入 O₂' },
          bloodState: 'mixed',
          loop: 'pulmonary',
        },
        {
          id: 'pulmonary-vein-2',
          label: { en: 'Pulmonary vein', zh: '肺静脉' },
          summary: { en: 'oxygenated', zh: '含氧血' },
          bloodState: 'oxygenated',
          loop: 'pulmonary',
        },
        {
          id: 'left-heart',
          label: { en: 'Left heart', zh: '左心' },
          summary: { en: 'pumps to body', zh: '泵向全身' },
          bloodState: 'oxygenated',
          loop: 'systemic',
        },
        {
          id: 'aorta-2',
          label: { en: 'Aorta', zh: '主动脉' },
          summary: { en: 'oxygenated', zh: '含氧血' },
          bloodState: 'oxygenated',
          loop: 'systemic',
        },
      ],
      definitions: [
        {
          id: 'double-circulation',
          term: { en: 'double circulation', zh: '双循环' },
          definition: {
            en: 'A system in which the blood passes through the heart twice per circuit. The pressure that the arteries lose going through the lungs is replaced by the left ventricle before the blood goes on to the body.',
            zh: '血液每循环一周经过心脏两次的系统。血液在肺部失去的动脉压力，由左心室在送往全身之前重新加上。',
          },
        },
        {
          id: 'pulmonary-circulation',
          term: { en: 'pulmonary circulation', zh: '肺循环' },
          definition: {
            en: 'The half of the double circulation that goes between the heart and the lungs. The right ventricle pumps deoxygenated blood to the lungs, and the pulmonary vein brings it back oxygenated to the left atrium.',
            zh: '双循环中在心脏与肺之间运行的那一半。右心室把缺氧血泵到肺，肺静脉把含氧血送回左心房。',
          },
        },
        {
          id: 'systemic-circulation',
          term: { en: 'systemic circulation', zh: '体循环' },
          definition: {
            en: 'The half of the double circulation that goes between the heart and the rest of the body. The left ventricle pumps oxygenated blood out through the aorta, and the venae cavae return deoxygenated blood to the right atrium.',
            zh: '双循环中在心脏与身体其余部分之间运行的那一半。左心室把含氧血经主动脉泵出，腔静脉把缺氧血送回右心房。',
          },
        },
        {
          id: 'atrium',
          term: { en: 'atrium (pl. atria)', zh: '心房' },
          definition: {
            en: 'One of the two upper chambers of the heart. Thin-walled. Receives blood returning to the heart and pushes it down into the ventricle below.',
            zh: '心脏上方的两个心腔之一。壁薄。接收返回心脏的血液，再向下推入下方的心室。',
          },
        },
        {
          id: 'ventricle',
          term: { en: 'ventricle', zh: '心室' },
          definition: {
            en: 'One of the two lower chambers of the heart. Thick-walled and muscular. Pumps blood out of the heart — to the lungs from the right, to the body from the left.',
            zh: '心脏下方的两个心腔之一。壁厚、肌肉发达。把血液泵出心脏——右心室去肺，左心室去全身。',
          },
        },
        {
          id: 'coronary-artery',
          term: { en: 'coronary artery', zh: '冠状动脉' },
          definition: {
            en: 'A network of arteries on the outside of the heart that supplies the heart muscle itself with blood. The heart is full of blood, but the muscle wall is too thick for oxygen to diffuse in from inside — so it has its own supply.',
            zh: '心脏外面的一组动脉，为心肌本身供血。心脏内部充满血液，但肌肉壁太厚，氧气无法从内部扩散进来——所以心肌有自己专属的供血系统。',
          },
        },
      ],
    },
  ],
}

export default lesson
