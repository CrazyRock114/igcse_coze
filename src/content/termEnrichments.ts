/**
 * Term enrichment registry — image, mechanism, clinical details, related terms.
 *
 * A `Term` (in a lesson's `glossary`) gives the English + Chinese + one-line
 * definition. This file adds the things a textbook can give that a glossary
 * line cannot: a figure from the source material, the *why* (mechanism), the
 * *what does it look like* (clinical picture), and pointers to terms that
 * should be studied together.
 *
 * Kept separate from the lesson files so a future editor (the teacher) can
 * add enrichments without touching the lesson data, and so the vocab system
 * can be loaded without loading all 21 lessons.
 */

import type { ConceptEnrichment } from '@/lib/vocabTypes'

/**
 * Keyed by `${subject}/${slug}/${term.en.toLowerCase()}`. Slug form
 * because the term string is user-visible English ("rickets"), not an id.
 *
 * Adding a new enrichment: copy any entry below, change the key, fill the
 * fields. Image paths are under `/public/figures/g8/<subject>/` and are
 * served at `/figures/g8/<subject>/...`.
 */
export const termEnrichments: Record<string, ConceptEnrichment> = {
  // --- 7-1-nutrition: 6 disease + nutrition concept enrichments ---
  '0610/7-1-nutrition/rickets': {
    termId: 'rickets',
    subject: '0610',
    slug: '7-1-nutrition',
    image: '/figures/g8/7-1-nutrition/image-b5-07.png',
    imageSource: 'G8 Science · Vitamin D table',
    mechanism: {
      en: 'Vitamin D is needed for calcium to be absorbed from the gut into the blood. Without it, calcium in the diet passes through unabsorbed. Calcium is what gives bone its hardness — so without it, the bones of a growing child stay soft and bend under the body\'s weight.',
      zh: '维生素 D 是肠道吸收钙的必需物质。没有它，食物中的钙不能被吸收，钙是让骨骼变硬的原料——所以正在长身体的孩子如果缺维生素 D，骨头会一直软，承受不住体重就会弯曲。',
    },
    clinicalDetails: {
      en: 'Bones, especially in the legs, become soft and deformed. The knees bow outward, the ankles turn in, and the spine curves. In the past this was common in industrial cities where children rarely went outside — sunlight on the skin makes vitamin D, and oily fish is a dietary source.',
      zh: '骨骼（尤其是腿骨）变软变形。膝盖外翻（O 型腿）、踝内翻、脊柱弯曲。过去工业城市里少见阳光的孩子常发此病——阳光照在皮肤上能合成维生素 D，含油多的鱼是食物来源。',
    },
    relatedTerms: ['vitamin d', 'calcium', 'vitamin c', 'scurvy'],
  },
  '0610/7-1-nutrition/scurvy': {
    termId: 'scurvy',
    subject: '0610',
    slug: '7-1-nutrition',
    image: '/figures/g8/7-1-nutrition/image-b5-07.png',
    imageSource: 'G8 Science · Vitamin C table',
    mechanism: {
      en: 'Vitamin C is needed to make collagen, the stretchy protein that holds skin, blood-vessel walls, gums and connective tissue together. Without it, the body cannot maintain these tissues — they become fragile and any wound takes much longer to close.',
      zh: '维生素 C 是合成胶原蛋白的必需物质。胶原蛋白是把皮肤、血管壁、牙龈、结缔组织黏合起来的弹性蛋白。没有它，这些组织变得脆弱，伤口也很难愈合。',
    },
    clinicalDetails: {
      en: 'Bleeding gums, loose teeth, bruises appearing without injury, wounds that will not heal, joint and muscle pain, fatigue. Historically common in sailors on long voyages with no fresh fruit — it killed thousands on 18th-century ocean voyages. Lemon juice on the daily ration cured it.',
      zh: '牙龈出血、牙齿松动、无故淤青、伤口不愈、关节肌肉疼痛、疲倦。历史上常见于长期航行吃不到新鲜水果的水手——18 世纪远洋航行中因此病死亡者成千上万。后来在每日配给中加入柠檬汁治好了它。',
    },
    relatedTerms: ['vitamin c', 'collagen', 'vitamin d', 'rickets'],
  },
  '0610/7-1-nutrition/kwashiorkor': {
    termId: 'kwashiorkor',
    subject: '0610',
    slug: '7-1-nutrition',
    image: '/figures/g8/7-1-nutrition/image-b5-06.png',
    imageSource: 'G8 Science · p.10, Image B5.06',
    mechanism: {
      en: 'A diet that contains enough energy (carbohydrate, fat) but lacks enough protein. The liver cannot make enough of the blood proteins that hold fluid inside blood vessels, so fluid leaks into the tissues — this is why a kwashiorkor child has a swollen belly while still being underweight overall.',
      zh: '能量（碳水、脂肪）足够但严重缺蛋白的饮食。肝脏合成不出足够的血浆蛋白来锁住血管里的水分，于是液体渗到组织里——这就是恶性营养不良患儿肚子鼓胀但整体体重偏低的原因。',
    },
    clinicalDetails: {
      en: 'Swollen belly (oedema — fluid in the tissues), reddish or thinning hair, skin that flakes and tears easily, an enlarged liver. Common in children 9 months to 2 years who have been weaned off breast milk onto a low-protein diet. A high-protein diet usually reverses it.',
      zh: '腹部鼓胀（水肿——液体渗到组织中）、头发发红变稀、皮肤易剥落、肝脏肿大。常发生在 9 个月到 2 岁、断奶后改吃低蛋白食物的孩子。改吃高蛋白饮食通常能逆转。',
    },
    relatedTerms: ['marasmus', 'malnutrition', 'protein', 'balanced diet'],
  },
  '0610/7-1-nutrition/marasmus': {
    termId: 'marasmus',
    subject: '0610',
    slug: '7-1-nutrition',
    image: '/figures/g8/7-1-nutrition/image-b5-06.png',
    imageSource: 'G8 Science · p.10, severe malnutrition',
    mechanism: {
      en: 'A diet lacking both protein AND energy (overall starvation). The body, starved of both fuel and building blocks, breaks down its own muscle and fat. Unlike kwashiorkor, fluid balance is preserved — the child just wastes away.',
      zh: '蛋白质和能量都严重缺乏（整体饥饿）。身体既缺燃料又缺建材，只好分解自身的肌肉和脂肪。跟恶性营养不良不同，液体平衡没破——孩子就是单纯地消瘦下去。',
    },
    clinicalDetails: {
      en: 'A child who looks emaciated — no fat under the skin, muscles wasted, ribs and shoulder blades visible, "old man" face from loss of the fat pads under the skin. The most severe form of malnutrition. Recovery requires sustained re-feeding with both protein and energy.',
      zh: '患儿极度消瘦——皮下无脂肪、肌肉萎缩、肋骨和肩胛骨清晰可见、皮下脂肪垫消失导致"小老人"面容。营养不良的最严重形式。恢复需要持续补充蛋白质和能量。',
    },
    relatedTerms: ['kwashiorkor', 'malnutrition', 'protein', 'starvation'],
  },
  '0610/7-1-nutrition/coronary heart disease': {
    termId: 'coronary heart disease',
    subject: '0610',
    slug: '7-1-nutrition',
    mechanism: {
      en: 'The coronary arteries supply the heart muscle itself with blood. If a diet is high in saturated fat and cholesterol, fatty deposits build up on the inside walls of these arteries, making them stiffer and narrower. Less blood gets through, so the heart muscle runs short of oxygen and cannot work properly.',
      zh: '冠状动脉是为心肌本身供血的血管。如果饮食中饱和脂肪和胆固醇过多，脂肪沉积会堆积在这些动脉的内壁，让它们变硬变窄。血流减少，心肌缺氧，无法正常工作。',
    },
    clinicalDetails: {
      en: 'The deposits can also trigger a blood clot, which can suddenly block the artery entirely — this is a heart attack. Symptoms include chest pain (especially on exertion), breathlessness, and pain radiating down the left arm. Risk factors: high saturated-fat diet, smoking, lack of exercise, family history.',
      zh: '沉积物还可能引发血栓，突然完全堵住动脉——这就是心肌梗塞（心脏病发作）。症状包括胸痛（尤其在用力时）、气短、左臂放射性疼痛。危险因素：高饱和脂肪饮食、吸烟、缺乏运动、家族史。',
    },
    relatedTerms: ['saturated fat', 'cholesterol', 'obesity', 'heart'],
  },
  '0610/7-1-nutrition/obesity': {
    termId: 'obesity',
    subject: '0610',
    slug: '7-1-nutrition',
    image: '/figures/g8/7-1-nutrition/image-b5-05.png',
    imageSource: 'G8 Science · p.9, Image B5.05',
    mechanism: {
      en: 'Energy in, energy out. If a person takes in more food energy than they use up, the surplus is stored — mostly as fat under the skin and around the organs. Over months and years this accumulates to a level that is harmful to health.',
      zh: '能量进出平衡。如果一个人摄入的能量长期超过消耗，多余的部分就存起来——主要是皮下和内脏周围的脂肪。积月累年，到危害健康的程度就是肥胖。',
    },
    clinicalDetails: {
      en: 'Excess body fat, especially weight concentrated around the middle (the "apple" shape), is linked to a higher risk of coronary heart disease, strokes, type-2 diabetes, and joint problems in the knees and hips. Most people can control their weight with normal balanced meals and regular exercise — crash diets tend to fail because the weight comes back when the diet stops.',
      zh: '体内脂肪过多，尤其是脂肪集中在腰腹（"苹果形"体型）的人，患冠心病、中风、2 型糖尿病、膝髋关节问题的风险更高。多数人可以通过正常均衡饮食和规律运动来控制体重——快速节食往往失败，因为一旦停止，体重就回来了。',
    },
    relatedTerms: ['coronary heart disease', 'balanced diet', 'saturated fat'],
  },
  // Other 7-1 terms without figures but with mechanism
  '0610/7-1-nutrition/peristalsis': {
    termId: 'peristalsis',
    subject: '0610',
    slug: '7-1-nutrition',
    mechanism: {
      en: 'The walls of the alimentary canal contain circular and longitudinal muscles. A wave of contraction passes along the wall behind a lump of food, squeezing it forward. This works even if you are upside down — astronauts eat in space because of it.',
      zh: '消化道管壁含有环形肌和纵形肌。管壁在一团食物后方产生一波收缩，把食物向前挤。倒立时食物也能咽下去，宇航员在太空里也能正常吃东西，靠的就是蠕动。',
    },
    relatedTerms: ['oesophagus', 'stomach', 'fibre'],
  },
  '0610/7-1-nutrition/lacteal': {
    termId: 'lacteal',
    subject: '0610',
    slug: '7-1-nutrition',
    image: '/figures/g8/7-1-nutrition/figure-b5-09.png',
    imageSource: 'G8 Science · p.16, Figure B5.09',
    mechanism: {
      en: 'A lymph vessel in the centre of a villus. Fatty acids and glycerol, which are not soluble in water and so cannot enter the watery blood, are taken up by the lacteal instead. The lymph eventually drains into the bloodstream near the heart.',
      zh: '绒毛中央的淋巴管。脂肪酸和甘油不溶于水，进不了水性的血液，于是改由乳糜管吸收。淋巴最终在靠近心脏的位置汇入血液。',
    },
    relatedTerms: ['villus', 'capillary', 'absorption'],
  },
  '0610/7-1-nutrition/villus': {
    termId: 'villus',
    subject: '0610',
    slug: '7-1-nutrition',
    image: '/figures/g8/7-1-nutrition/figure-b5-09.png',
    imageSource: 'G8 Science · p.16, Figure B5.09',
    mechanism: {
      en: 'A finger-like fold of the small intestine wall. Each villus is about 1 mm long and there are millions of them, giving the inside of the small intestine a surface area roughly the size of a tennis court. The wall is one cell thick, with a capillary network and a lacteal inside.',
      zh: '小肠壁的指状皱褶。每根绒毛约 1 毫米长，有几百万根，使小肠内表面积达一个网球场大小。绒毛壁只有一个细胞厚，内含毛细血管网和一根乳糜管。',
    },
    relatedTerms: ['lacteal', 'capillary', 'microvilli', 'absorption'],
  },

  // --- 9-1-transport-animals: heart + blood enrichments ---
  '0610/9-1-transport-animals/red blood cell': {
    termId: 'red blood cell',
    subject: '0610',
    slug: '9-1-transport-animals',
    image: '/figures/g8/9-1-transport-animals/figure-b7-11a-rbc.png',
    imageSource: 'G8 Science · p.31 — doughnut-shaped red blood cell',
    mechanism: {
      en: 'A doughnut-shaped disc with a dimple on each side and no nucleus. The biconcave shape and the missing nucleus together leave room for more haemoglobin and let the cell bend enough to squeeze through capillaries that are narrower than the cell itself.',
      zh: '圆饼状、两面凹陷、没有细胞核。双凹形状加上无核，既容纳更多血红蛋白，也让细胞能弯曲得足以挤过比自己还窄的毛细血管。',
    },
    relatedTerms: ['haemoglobin', 'plasma', 'capillary', 'oxygenated blood'],
  },
  '0610/9-1-transport-animals/phagocyte': {
    termId: 'phagocyte',
    subject: '0610',
    slug: '9-1-transport-animals',
    image: '/figures/g8/9-1-transport-animals/figure-b7-12.png',
    imageSource: 'G8 Science · p.34 — phagocyte with a lobed nucleus',
    mechanism: {
      en: 'A white blood cell that engulfs and digests pathogens. It changes shape, flows around the bacterium, takes it inside the cell, and breaks it down with enzymes. Pus at a wound site is mostly dead phagocytes that have done this and then died.',
      zh: '能吞噬并分解病原体的白细胞。它改变形状，包围细菌，吞入细胞内，再用酶分解。伤口处的脓液主要是已经完成吞噬并死去的吞噬细胞。',
    },
    relatedTerms: ['lymphocyte', 'pathogen', 'white blood cell', 'antibody'],
  },
  '0610/9-1-transport-animals/lymphocyte': {
    termId: 'lymphocyte',
    subject: '0610',
    slug: '9-1-transport-animals',
    image: '/figures/g8/9-1-transport-animals/figure-b7-12a-lymphocyte.png',
    imageSource: 'G8 Science · p.33 — lymphocyte with a large nucleus',
    mechanism: {
      en: 'A white blood cell with a single large round nucleus. Makes antibodies — proteins that recognise specific pathogens and mark them for destruction. Some lymphocytes also remember past infections for decades, which is the basis of vaccination.',
      zh: '具有单个大而圆的细胞核的白细胞。它制造抗体——能识别特定病原体并标记它们以便清除的蛋白质。有些淋巴细胞还能把过去的感染记住几十年——这是疫苗的原理。',
    },
    relatedTerms: ['phagocyte', 'antibody', 'vaccination', 'white blood cell'],
  },
  '0610/9-1-transport-animals/pacemaker': {
    termId: 'pacemaker',
    subject: '0610',
    slug: '9-1-transport-animals',
    mechanism: {
      en: 'A small group of specialised muscle cells in the wall of the right atrium that sets the rate at which the heart beats. It produces a small electrical signal that spreads across both atria, making them contract together, then passes down to the ventricles.',
      zh: '右心房壁上一小组特化的肌肉细胞，决定心率。它们发出微小的电信号，扩散到两个心房使其同时收缩，再向下传导到心室。',
    },
    relatedTerms: ['right atrium', 'heart rate', 'cardiac output'],
  },
  '0610/9-1-transport-animals/coronary heart disease': {
    termId: 'coronary heart disease',
    subject: '0610',
    slug: '9-1-transport-animals',
    image: '/figures/g8/9-1-transport-animals/figure-b7-04.png',
    imageSource: 'G8 Science · p.25, Figure B7.04 — coronary artery on the outside of the heart',
    mechanism: {
      en: 'The coronary arteries sit on the outside of the heart and supply the heart muscle itself. If a diet is high in saturated fat and cholesterol, fatty deposits build up on the inside walls of these arteries, making them stiffer and narrower. Less blood gets through, so the heart muscle runs short of oxygen and cannot work properly.',
      zh: '冠状动脉位于心脏外面，为心肌本身供血。如果饮食中饱和脂肪和胆固醇过多，脂肪沉积会堆积在这些动脉的内壁，让它们变硬变窄。血流减少，心肌缺氧，无法正常工作。',
    },
    relatedTerms: ['coronary artery', 'saturated fat', 'aorta', 'left ventricle'],
  },
  '0610/9-1-transport-animals/double circulation': {
    termId: 'double circulation',
    subject: '0610',
    slug: '9-1-transport-animals',
    image: '/figures/g8/9-1-transport-animals/figure-b7-01.png',
    imageSource: 'G8 Science · p.21, Figure B7.01',
    mechanism: {
      en: 'In a double circulation the blood passes through the heart twice per circuit. Once from the right ventricle to the lungs and back, then again from the left ventricle to the body and back. This means the blood that reaches the body has just been re-pressurised by the left ventricle — it is at high pressure, so oxygen and glucose are delivered fast. Fish have a single circulation: heart → gills → body → heart, and the pressure that the gill capillaries soak up is never replaced, so the body receives the blood slowly.',
      zh: '双循环中血液每循环一周经过心脏两次：先从右心室到肺再回来，再从左心室到全身再回来。到达全身的血液刚被左心室重新加压——处于高压，氧和葡萄糖被快速送达。鱼是单循环：心→鳃→全身→心，鳃毛细血管吸收的压力不会再补回来，所以全身得到的血液较慢。',
    },
    relatedTerms: ['pulmonary circulation', 'systemic circulation', 'single circulation', 'heart'],
  },

  // --- 11-1-gas-exchange: gas exchange + smoking enrichments ---
  '0610/11-1-gas-exchange/aerobic respiration': {
    termId: 'aerobic respiration',
    subject: '0610',
    slug: '11-1-gas-exchange',
    image: '/figures/g8/11-1-gas-exchange/figure-b8-04.png',
    imageSource: 'G8 Science · p.39, Figure B8.04 — alveolus with red cells in capillary',
    mechanism: {
      en: 'Glucose is broken down completely — the carbon in it ends up as CO₂, the hydrogen as H₂O, and about 32 ATP per glucose molecule is captured. Aerobic respiration can only happen where oxygen is supplied fast enough to keep up with demand, which is why the heart and breathing rate rise during exercise: they are delivering oxygen to muscle cells at a higher rate.',
      zh: '葡萄糖被彻底分解——其中的碳变成 CO₂，氢变成 H₂O，每分子葡萄糖捕获约 32 个 ATP。有氧呼吸只能发生在供氧跟得上需求的地方——这也是运动时心率和呼吸频率上升的原因：它们是在以更高速度向肌细胞输送氧气。',
    },
    relatedTerms: ['anaerobic respiration', 'oxygen debt', 'alveolus', 'mitochondrion'],
  },
  '0610/11-1-gas-exchange/anaerobic respiration': {
    termId: 'anaerobic respiration',
    subject: '0610',
    slug: '11-1-gas-exchange',
    mechanism: {
      en: 'When oxygen cannot reach the muscle fast enough — a sprint, holding the breath under water, sudden heavy lifting — the cells fall back on anaerobic respiration. Glucose is split only partway, releasing just 2 ATP per glucose (against 32 for aerobic) and leaving lactic acid behind. The lactic acid is what makes muscles burn and eventually stops them working; the "oxygen debt" is the extra oxygen the body needs afterwards to break that lactic acid down.',
      zh: '当氧来不及送达肌肉时——冲刺、潜水憋气、突然大力举重——细胞切换到无氧呼吸。葡萄糖只被部分分解，每分子只释放 2 个 ATP（有氧时为 32 个），并留下乳酸。乳酸就是肌肉发酸发烫、最终无法继续工作的原因；"氧债"则是之后身体为分解这些乳酸而额外需要的氧。',
    },
    relatedTerms: ['aerobic respiration', 'oxygen debt', 'lactic acid', 'fermentation'],
  },
  '0610/11-1-gas-exchange/trachea': {
    termId: 'trachea',
    subject: '0610',
    slug: '11-1-gas-exchange',
    image: '/figures/g8/11-1-gas-exchange/figure-b8-03.png',
    imageSource: 'G8 Science · p.38, Figure B8.03 — cilia, goblet cell, mucus',
    mechanism: {
      en: 'The main airway from the larynx down to where it splits into the two bronchi. It is held open by C-shaped rings of cartilage — the rings do not form a complete circle because the back of the trachea lies against the oesophagus and needs to give way when food passes down. The lining is ciliated epithelium with goblet cells.',
      zh: '从喉向下到分为两条支气管处的主气道。它由 C 形软骨环撑开——软骨环不形成完整的圆，因为气管背面贴着食道，要让食物通过时能凹进去。内壁是带纤毛的上皮和杯状细胞。',
    },
    relatedTerms: ['bronchus', 'bronchiole', 'cilium', 'mucus', 'larynx'],
  },
  '0610/11-1-gas-exchange/mucus': {
    termId: 'mucus',
    subject: '0610',
    slug: '11-1-gas-exchange',
    image: '/figures/g8/11-1-gas-exchange/figure-b8-03.png',
    imageSource: 'G8 Science · p.38, Figure B8.03 — yellow blob of mucus on top of a goblet cell',
    mechanism: {
      en: 'A sticky secretion made by goblet cells. It sits in a thin layer on top of the cilia, with dust, soot, bacteria and viruses caught in it. The cilia beat in a synchronised wave that moves this mucus blanket upwards towards the throat, where it is swallowed and the trapped pathogens are destroyed by stomach acid.',
      zh: '由杯状细胞分泌的黏性物质。它在纤毛之上形成薄薄一层，灰尘、煤烟、细菌和病毒都被粘住。纤毛同步摆动，把这层黏液毯向上推往喉咙，最终被吞下，其中困住的病原体被胃酸消灭。',
    },
    relatedTerms: ['goblet cell', 'cilium', 'trachea', 'bronchus'],
  },
  '0610/11-1-gas-exchange/cilium': {
    termId: 'cilium',
    subject: '0610',
    slug: '11-1-gas-exchange',
    image: '/figures/g8/11-1-gas-exchange/figure-b8-03.png',
    imageSource: 'G8 Science · p.38, Figure B8.03 — fine hair-like cilia on the airway cell',
    mechanism: {
      en: 'A tiny hair-like extension on the surface of a ciliated cell. Each ciliated cell in the airway carries dozens of cilia, and they all beat in the same direction, in a synchronised wave. The effect is a moving conveyor belt of mucus — the "mucociliary escalator" — that pushes trapped material up and out of the lungs. Tobacco smoke paralyses the cilia; with the escalator stopped, mucus and the bacteria in it pool in the lungs, and chest infections follow.',
      zh: '纤毛细胞表面的微小毛状突起。气道中每个纤毛细胞都长着几十根纤毛，它们方向一致地同步摆动。其效果是一条移动的黏液传送带——"黏液-纤毛自动梯"——把黏住的东西向上推出肺。烟草烟雾会让纤毛瘫痪；自动梯一旦停转，黏液和其中的细菌就在肺里积聚，胸腔感染随之而来。',
    },
    relatedTerms: ['goblet cell', 'mucus', 'trachea', 'nicotine', 'smoking'],
  },
  '0610/11-1-gas-exchange/nicotine': {
    termId: 'nicotine',
    subject: '0610',
    slug: '11-1-gas-exchange',
    image: '/figures/g8/11-1-gas-exchange/figure-b8-07.png',
    imageSource: 'G8 Science · p.45, Figure B8.07 — what is in cigarette smoke',
    mechanism: {
      en: 'The addictive substance in tobacco. Within seconds of inhaling, nicotine reaches the brain and triggers the release of dopamine — the same reward signal that makes food and social contact feel good. The brain rewires itself around this signal: in its absence the smoker feels irritable, anxious and unable to concentrate, which is why stopping is so hard. Nicotine also narrows small blood vessels and raises blood pressure, putting extra load on the heart.',
      zh: '烟草中的成瘾物质。吸入后几秒钟内，尼古丁就到达大脑，触发多巴胺释放——跟食物和社交带来愉悦感的是同一种奖赏信号。大脑围绕这个信号重新布线：一旦缺失，吸烟者就会烦躁、焦虑、无法集中注意力——这就是戒烟如此困难的原因。尼古丁还会收缩小血管、升高血压，给心脏增添额外负担。',
    },
    relatedTerms: ['tar', 'carbon monoxide', 'coronary heart disease', 'lung cancer'],
  },
  '0610/11-1-gas-exchange/carbon monoxide': {
    termId: 'carbon monoxide',
    subject: '0610',
    slug: '11-1-gas-exchange',
    image: '/figures/g8/11-1-gas-exchange/figure-b8-07.png',
    imageSource: 'G8 Science · p.45, Figure B8.07 — what is in cigarette smoke',
    mechanism: {
      en: 'A poisonous gas that binds to haemoglobin in red blood cells about 200 times more tightly than oxygen does. A smoker with 10% of their haemoglobin occupied by carbon monoxide is effectively anaemic — their blood cannot carry as much oxygen as it should. During pregnancy, the same effect on the mother\'s blood starves the developing baby of oxygen, leading to low birth weight.',
      zh: '一种有毒气体，与血红蛋白的结合力约为氧气的 200 倍。一个吸烟者如果有 10% 的血红蛋白被一氧化碳占据，就相当于贫血——血液运氧能力下降。孕期母亲血液的同样效应会让发育中的胎儿缺氧，导致出生体重偏低。',
    },
    relatedTerms: ['nicotine', 'tar', 'red blood cell', 'haemoglobin'],
  },
  '0610/11-1-gas-exchange/emphysema': {
    termId: 'emphysema',
    subject: '0610',
    slug: '11-1-gas-exchange',
    image: '/figures/g8/11-1-gas-exchange/image-b8-03.png',
    imageSource: 'G8 Science · p.46, Image B8.03 — healthy lung (a) vs emphysema lung (b)',
    mechanism: {
      en: 'Long-term exposure to cigarette smoke inflames the alveoli and the enzymes in the inflammatory response slowly digest the alveolar walls. Many small air sacs merge into a few large ones, and the total surface area available for gas exchange drops. The lungs also lose their elastic recoil, so expelling air becomes an effort. The patient gets breathless walking across a room.',
      zh: '长期吸入香烟烟雾会让肺泡发炎，炎症反应中的酶逐渐消化掉肺泡壁。许多小气腔合并成几个大气腔，气体交换的总表面积下降。肺也失去弹性回缩力，呼气变得吃力。患者走几步路就会气喘。',
    },
    relatedTerms: ['alveolus', 'lung cancer', 'nicotine', 'tar', 'chronic bronchitis'],
  },
  '0610/11-1-gas-exchange/lung cancer': {
    termId: 'lung cancer',
    subject: '0610',
    slug: '11-1-gas-exchange',
    image: '/figures/g8/11-1-gas-exchange/figure-b8-07.png',
    imageSource: 'G8 Science · p.45, Figure B8.07 — what is in cigarette smoke',
    mechanism: {
      en: 'Tar — the sticky brown residue of cigarette smoke — settles on the lining of the bronchi and contains dozens of chemicals that damage DNA. Most damage is repaired, but a single unrepaired mutation in a gene that controls cell division can start a cell dividing out of control. The resulting tumour grows into the air passage and spreads to other parts of the body. Lung cancer is the leading cause of cancer death in many countries, and the risk is roughly proportional to the number of cigarettes smoked per day.',
      zh: '焦油——香烟烟雾中的褐色黏稠残留物——沉积在支气管内壁上，其中含有数十种会损伤 DNA 的化学物质。大多数损伤会被修复，但只要有一个控制细胞分裂的基因没被修好，一个突变就足以让细胞失控分裂。形成的肿瘤长入气道，并扩散到身体其他部位。肺癌在许多国家是癌症死亡的首要原因，其风险大致与每日吸烟量成正比。',
    },
    relatedTerms: ['tar', 'nicotine', 'bronchus', 'alveolus', 'smoking'],
  },

  // --- 13 medical terms added after the 8/3-8/5 classroom transcript review ---
  // Each is paired with a `Term` in the relevant lesson's `glossary` array.

  // 7-1 nutrition
  '0610/7-1-nutrition/night blindness': {
    termId: 'night blindness',
    subject: '0610',
    slug: '7-1-nutrition',
    image: '/figures/g8/7-1-nutrition/image-b5-07.png',
    imageSource: 'G8 Science · Vitamin A table',
    mechanism: {
      en: 'The rod cells at the back of the retina use a pigment called retinal to detect dim light. Retinal is made from vitamin A. Without enough vitamin A, the pigment cannot be regenerated after it absorbs a photon, so the rod cells effectively run out of "ammunition" in dim light.',
      zh: '视网膜深处的杆状细胞利用一种叫视黄醛的色素感受弱光。视黄醛由维生素 A 转化而来。维生素 A 不足时，色素在吸收光子后就无法再生，杆状细胞在弱光下等于"打光了子弹"。',
    },
    clinicalDetails: {
      en: 'In dim light (dusk, a dark room) vision is poor; in bright light it is normal. A classical public-health marker for vitamin A deficiency in children in low-income countries, where it remains a leading cause of preventable blindness.',
      zh: '在黄昏、黑暗房间等弱光下视力差；强光下正常。它是低收入国家儿童维生素 A 缺乏的经典公共卫生标志，仍是当地可预防失明的主要原因之一。',
    },
    relatedTerms: ['vitamin a', 'rod cell', 'retina', 'scurvy'],
  },
  '0610/7-1-nutrition/dental caries': {
    termId: 'dental caries',
    subject: '0610',
    slug: '7-1-nutrition',
    image: '/figures/g8/7-1-nutrition/figure-b5-08.png',
    imageSource: 'G8 Science · p.31, Figure B5.08 — tooth structure',
    mechanism: {
      en: 'Bacteria in the mouth (especially Streptococcus mutans) ferment sugars from food and release lactic acid as a waste product. The acid dissolves the calcium phosphate of the enamel — once lost, enamel cannot regrow. Below the enamel, the dentine is softer and decays faster, which is why a small surface hole can become a deep cavity quickly.',
      zh: '口腔细菌（尤其是变形链球菌）发酵食物中的糖，副产物是乳酸。酸溶解牙釉质中的磷酸钙——一旦损失便无法再生。釉质下方的牙本质更软，龋坏更快，所以表面的小洞很快会变成深洞。',
    },
    clinicalDetails: {
      en: 'Brown or black spots on the tooth, then a hole, then pain when the decay reaches the dentine. A deep cavity reaching the pulp causes severe, throbbing pain and risks an abscess at the root tip.',
      zh: '牙齿上出现棕黑色斑点，然后成洞，龋坏到达牙本质时开始疼痛。深龋累及牙髓会引起剧烈跳痛，并可能在牙根尖形成脓肿。',
    },
    relatedTerms: ['enamel', 'dentine', 'pulp', 'calcium', 'fluoride'],
  },
  '0610/7-1-nutrition/fatty liver': {
    termId: 'fatty liver',
    subject: '0610',
    slug: '7-1-nutrition',
    image: '/figures/g8/7-1-nutrition/image-b5-05.png',
    imageSource: 'G8 Science · p.18, Image B5.05 — coronary heart disease, obesity',
    mechanism: {
      en: 'The liver\'s first job with surplus glucose is to store it as glycogen. Once glycogen stores are full, the rest is converted to fat (triglyceride) and stored inside the liver cells themselves. If the surplus is sustained, fat builds up faster than it can be exported, and the liver swells with intracellular fat droplets.',
      zh: '肝脏处理多余葡萄糖的首要方式是把它存为糖原。糖原库满后，余下的就转成脂肪（甘油三酯）存于肝细胞内。如果长期营养过剩，脂肪堆积的速度超过它被运走的速度，肝细胞内就充满脂肪滴，肝脏肿大。',
    },
    clinicalDetails: {
      en: 'Often silent in early stages — discovered on an ultrasound scan done for other reasons. If sustained, the fat-filled cells become inflamed (steatohepatitis) and may progress to scarring (cirrhosis) over years. Reversible in the early fat-only stage by sustained calorie reduction.',
      zh: '早期常无症状——做其他检查的超声时偶然发现。若持续，充脂细胞会发炎（脂肪性肝炎），数年内可能进展为纤维化（肝硬化）。早期单纯性脂肪肝通过持续减少热量摄入可以逆转。',
    },
    relatedTerms: ['glycogen', 'insulin', 'obesity', 'liver'],
  },
  '0610/7-1-nutrition/gallstone': {
    termId: 'gallstone',
    subject: '0610',
    slug: '7-1-nutrition',
    image: '/figures/g8/7-1-nutrition/figure-b5-08.png',
    imageSource: 'G8 Science · p.31, Figure B5.08 — tooth / gall bladder context',
    mechanism: {
      en: 'Bile is a mixture of bile salts, cholesterol and bilirubin. If the cholesterol rises above what the bile salts can keep dissolved, it comes out of solution as crystals that can grow into stones. Most gallstones are cholesterol stones; a smaller fraction are pigment stones made from bilirubin.',
      zh: '胆汁是胆盐、胆固醇和胆红素的混合物。当胆固醇浓度超过胆盐能溶解的极限，便析出结晶并长大成结石。多数胆结石是胆固醇结石；少数是胆红素构成的色素结石。',
    },
    clinicalDetails: {
      en: 'Many gallstones cause no symptoms and are found by accident. The dangerous ones lodge in the bile duct and trigger "biliary colic" — a severe, constant pain in the upper right abdomen, often after a fatty meal, sometimes with jaundice if the duct is fully blocked.',
      zh: '许多胆结石无症状、偶然发现。危险的是卡在胆管里的结石，会诱发"胆绞痛"——右上腹持续剧痛，常在油腻餐后出现；若胆管完全梗阻可伴黄疸。',
    },
    relatedTerms: ['bile', 'cholesterol', 'gall bladder', 'liver'],
  },

  // 9-1 transport
  '0610/9-1-transport-animals/myocardial infarction': {
    termId: 'myocardial infarction',
    subject: '0610',
    slug: '9-1-transport-animals',
    image: '/figures/g8/9-1-transport-animals/figure-b7-04.png',
    imageSource: 'G8 Science · p.53, Figure B7.04 — the heart and its coronary arteries',
    mechanism: {
      en: 'A coronary artery is the only blood supply to the heart muscle itself. If a clot forms on top of a cholesterol-rich plaque and blocks the artery, the heart-muscle cells downstream are starved of oxygen. Within 20-30 minutes they start to die, and the dead tissue scars over. Cardiac muscle does not regrow — what is lost is lost.',
      zh: '冠状动脉是心肌自身的唯一血供。如果胆固醇斑块上形成血栓并阻塞动脉，远端的心肌细胞即缺氧。20-30 分钟内细胞开始死亡，坏死组织随后形成瘢痕。心肌不能再生——损失的就是损失了。',
    },
    clinicalDetails: {
      en: 'A heavy, crushing pain in the centre of the chest that may spread to the left arm, jaw or back, often with sweating, breathlessness and nausea. Many hospitals run a "chest pain centre" that fast-tracks these patients because every minute of delay kills more heart muscle.',
      zh: '胸前正中沉重、压榨样疼痛，可放射至左臂、下颌或背部，常伴出汗、气短、恶心。许多医院设有"胸痛中心"对这类患者优先抢救——每延迟一分钟就损失更多心肌。',
    },
    relatedTerms: ['coronary artery', 'coronary heart disease', 'platelet', 'cholesterol'],
  },
  '0610/9-1-transport-animals/cerebral infarction': {
    termId: 'cerebral infarction',
    subject: '0610',
    slug: '9-1-transport-animals',
    image: '/figures/g8/9-1-transport-animals/figure-b7-01.png',
    imageSource: 'G8 Science · p.49, Figure B7.01 — double circulation',
    mechanism: {
      en: 'A cerebral artery is blocked, usually by a clot that has formed in the heart or a major neck artery and travelled to the brain. The brain cells in the territory served by that artery are starved of glucose and oxygen. Neurons start to die within minutes and — unlike many other cells — cannot be replaced.',
      zh: '脑动脉被阻塞，多因心脏或颈部大动脉形成的血栓随血流到达脑部。该动脉供血区内的脑细胞因缺糖缺氧而受损。神经元几分钟内开始死亡——而且不像许多其他细胞，它们不能被替代。',
    },
    clinicalDetails: {
      en: 'Sudden weakness or numbness on one side of the body, slurred speech, loss of vision in one eye, sudden severe headache with no cause, or loss of balance. The exact symptoms depend on which artery is blocked. Time to treatment is the single biggest determinant of how much function is recovered.',
      zh: '突然出现单侧肢体无力或麻木、口齿不清、单眼失明、突发剧烈头痛或平衡失调。具体症状取决于哪条动脉被堵。从发病到治疗的时间是决定功能恢复程度的最重要因素。',
    },
    relatedTerms: ['coronary heart disease', 'platelet', 'neurone', 'cerebral artery'],
  },
  '0610/9-1-transport-animals/varicose vein': {
    termId: 'varicose vein',
    subject: '0610',
    slug: '9-1-transport-animals',
    image: '/figures/g8/9-1-transport-animals/figure-b7-10.png',
    imageSource: 'G8 Science · p.55, Figure B7.10 — vein valves',
    mechanism: {
      en: 'Veins in the legs carry blood back up to the heart against gravity. They do this with one-way valves every few centimetres, plus the pumping action of the surrounding calf muscles. If a valve fails, blood falls back through the gap with each beat, pools below it, and stretches the vein. The stretched valve cannot close any more, and the damage spreads down the leg.',
      zh: '腿部静脉要克服重力把血液送回心脏。每隔几厘米有一组单向瓣膜，配合小腿肌肉的挤压来推动血流。如果某个瓣膜失效，血液会随每次搏动倒流回下方，淤积在瓣膜之下，并把这段静脉撑大。撑大的瓣膜无法再合拢，损害会沿腿向下蔓延。',
    },
    clinicalDetails: {
      en: 'Buldging, twisted veins visible under the skin of the calf; the leg feels heavy and aches after standing. In advanced cases the skin over the veins becomes thin and discoloured, and a minor scratch can bleed heavily or ulcerate.',
      zh: '小腿皮下可见鼓起、扭曲的静脉；站立后腿部沉重、酸痛。重症时表面皮肤变薄、变色，轻微划伤即可大量出血或形成溃疡。',
    },
    relatedTerms: ['vein', 'valve', 'capillary', 'blood pressure'],
  },
  '0610/9-1-transport-animals/anaemia': {
    termId: 'anaemia',
    subject: '0610',
    slug: '9-1-transport-animals',
    image: '/figures/g8/9-1-transport-animals/figure-b7-11.png',
    imageSource: 'G8 Science · p.56, Figure B7.11 — red blood cells',
    mechanism: {
      en: 'The red cells carry oxygen, and they do it via haemoglobin — a protein whose active site is a single iron atom. If the diet is short of iron, the body cannot make enough haemoglobin; the red cells produced are small and pale, and each one carries less oxygen. The blood\'s oxygen capacity falls and the body tires easily.',
      zh: '红细胞通过血红蛋白运氧——每个血红蛋白分子的活性中心是一个铁原子。饮食缺铁时，身体造不出足够的血红蛋白；产生的红细胞小而色淡，每个携带的氧气也更少。血液运氧能力下降，人容易疲倦。',
    },
    clinicalDetails: {
      en: 'Tiredness, breathlessness on exertion, pale inner eyelids and nail beds, dizziness on standing. In children, iron-deficiency anaemia impairs learning. Most common cause worldwide is dietary iron shortage; in women of reproductive age, menstrual blood loss is a major contributor.',
      zh: '疲倦、劳力性气促、眼睑内面和甲床苍白、起立性头晕。儿童缺铁性贫血会影响学习。全球最常见的原因是膳食铁不足；育龄女性月经失血是另一大主因。',
    },
    relatedTerms: ['red blood cell', 'haemoglobin', 'iron', 'diet'],
  },

  // 11-1 gas exchange
  '0610/11-1-gas-exchange/asthma': {
    termId: 'asthma',
    subject: '0610',
    slug: '11-1-gas-exchange',
    image: '/figures/g8/11-1-gas-exchange/figure-b8-03.png',
    imageSource: 'G8 Science · p.41, Figure B8.03 — trachea, bronchi, bronchioles',
    mechanism: {
      en: 'In asthma, the smooth muscle wrapped around the bronchioles is hyper-reactive. When triggered (commonly by an allergen, cold air, exercise or infection), that muscle contracts hard, the airway narrows sharply, and air whistles as it forces through. The lining of the airway also swells and produces extra mucus, which makes things worse.',
      zh: '哮喘患者细支气管周围的平滑肌反应性过高。受诱因（常为过敏原、冷空气、运动或感染）刺激时，平滑肌强烈收缩，气道急剧变窄，气流强行通过时发出哮鸣音。气道黏膜同时水肿并分泌过多黏液，使情况更糟。',
    },
    clinicalDetails: {
      en: 'Recurrent episodes of wheezing, chest tightness, breathlessness and cough — often at night or in the early morning. A reliever inhaler (salbutamol / albuterol) relaxes the muscle and reopens the airway within minutes; a preventer inhaler (low-dose steroid) calms the underlying inflammation over days and weeks.',
      zh: '反复发作的喘鸣、胸闷、气促和咳嗽——常在夜间或清晨出现。缓解型吸入剂（沙丁胺醇）数分钟内放松平滑肌、打开气道；预防型吸入剂（小剂量激素）需数日到数周才能平息底层炎症。',
    },
    relatedTerms: ['bronchiole', 'mucus', 'cilium', 'allergen'],
  },

  // 14-3 homeostasis
  '0610/14-3-homeostasis/diabetes mellitus': {
    termId: 'diabetes mellitus',
    subject: '0610',
    slug: '14-3-homeostasis',
    image: '/figures/g8/14-3-homeostasis/figure-b9-17.png',
    imageSource: 'G8 Science · p.78, Figure B9.17 — glucose regulation',
    mechanism: {
      en: 'Blood glucose is held within a tight range by two pancreatic hormones working in opposition: insulin, which makes cells take up glucose and store it as glycogen, and glucagon, which makes the liver release glucose from its glycogen stores back into the blood. Diabetes is what happens when this two-way control breaks down.',
      zh: '血糖由胰腺分泌的两种激素在相反方向上共同维持稳定：胰岛素促使细胞摄取葡萄糖并以糖原形式储存；胰高血糖素促使肝脏把糖原分解为葡萄糖释放入血。糖尿病正是这种双向调节失灵的结果。',
    },
    clinicalDetails: {
      en: 'Persistent high blood glucose. In Type 1 the immune system destroys the insulin-producing cells, so insulin must be injected. In Type 2 the body\'s cells stop responding to insulin properly; it usually starts in middle age and is linked to being overweight. Both, uncontrolled for years, damage the eyes, kidneys and nerves.',
      zh: '血糖持续偏高。1 型是免疫系统破坏产胰岛素细胞，须注射胰岛素。2 型是体细胞对胰岛素反应迟钝；多在中年起病，与超重相关。两者若长期失控，都会损伤眼睛、肾脏和神经。',
    },
    relatedTerms: ['insulin', 'glucagon', 'pancreas', 'glycogen', 'liver'],
  },
  '0610/14-3-homeostasis/hyperthyroidism': {
    termId: 'hyperthyroidism',
    subject: '0610',
    slug: '14-3-homeostasis',
    image: '/figures/g8/14-3-homeostasis/figure-b9-18.png',
    imageSource: 'G8 Science · p.79, Figure B9.18 — thyroid',
    mechanism: {
      en: 'The thyroid gland in the neck releases thyroxine, a hormone that sets the body\'s baseline metabolic rate — the speed at which all the cells tick over when you are at rest. In hyperthyroidism, too much thyroxine is released. Every cell runs hot: heart beats faster, the body burns more energy, the person loses weight without trying.',
      zh: '颈部的甲状腺分泌甲状腺素（thyroxine），它设定身体的基础代谢率——即静息时所有细胞运转的"怠速"。甲亢时甲状腺素分泌过多，每个细胞都"高转"：心跳加快、能耗增加，人不刻意也会消瘦。',
    },
    clinicalDetails: {
      en: 'Resting heart rate noticeably high (over 90), tremor in the hands, weight loss despite eating well, anxiety, heat intolerance, and a visible swelling in the front of the neck (goitre). The most common cause is Graves\' disease, where antibodies wrongly stimulate the thyroid.',
      zh: '静息心率明显升高（>90 次/分）、手抖、吃得多反而消瘦、焦虑、怕热、颈前可见肿大（甲状腺肿）。最常见的原因是格雷夫斯病——抗体错误地持续刺激甲状腺。',
    },
    relatedTerms: ['thyroid', 'thyroxine', 'metabolic rate', 'goitre', 'iodine'],
  },
  '0610/14-3-homeostasis/hypothyroidism': {
    termId: 'hypothyroidism',
    subject: '0610',
    slug: '14-3-homeostasis',
    image: '/figures/g8/14-3-homeostasis/figure-b9-18.png',
    imageSource: 'G8 Science · p.79, Figure B9.18 — thyroid',
    mechanism: {
      en: 'Too little thyroxine — the opposite of hyperthyroidism. The body\'s idle speed drops. Cells burn less fuel, the heart beats slower, the person feels cold, sluggish and mentally dull. In childhood, untreated hypothyroidism causes cretinism: stunted growth and severe developmental delay.',
      zh: '甲状腺素分泌过少——与甲亢相反。身体"怠速"降低：细胞耗能减少、心跳变慢、人怕冷、迟钝、精神不振。儿童期若未治疗，可致呆小症：身材矮小、智力严重落后。',
    },
    clinicalDetails: {
      en: 'Tiredness, weight gain, feeling cold, constipation, dry skin, slow heart rate, depression. In iodine-deficient inland regions of the world it remains common. Treatment is straightforward — daily thyroxine tablets — and the symptoms reverse.',
      zh: '疲倦、体重增加、怕冷、便秘、皮肤干燥、心率慢、抑郁。在缺碘的内陆地区仍较常见。治疗简单——每日服用甲状腺素片——症状即可逆转。',
    },
    relatedTerms: ['thyroid', 'thyroxine', 'iodine', 'goitre', 'cretinism'],
  },
}

/**
 * Look up the enrichment for a term, if any. Returns undefined when the term
 * is in a lesson glossary but the teacher hasn't added a figure or
 * mechanism for it yet.
 */
export function getEnrichment(subject: string, slug: string, termEn: string): ConceptEnrichment | undefined {
  const key = `${subject}/${slug}/${termEn.toLowerCase()}`
  return termEnrichments[key]
}
