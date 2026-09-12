import type { NarrationScript } from '@/content/types'

export const nutritionNarration: NarrationScript = {
  id: '7-1-nutrition',
  sections: [
    {
      id: 'intro',
      type: 'intro',
      title: { en: 'Food is not yet yours', zh: '食物还不属于你' },
      lines: [
        {
          id: 'intro-1',
          text: {
            en: 'A sandwich in your stomach is still outside your body. The gut is a tube running through you, open at both ends, and nothing in it counts as yours until it has crossed the wall into your blood.',
            zh: '胃里的三明治仍然在你的身体之外。消化道是一根贯穿全身、两端开口的管道，其中的任何东西，在穿过管壁进入血液之前，都还不属于你。',
          },
        },
        {
          id: 'intro-2',
          text: {
            en: 'That is the whole reason digestion exists. Starch and protein molecules are far too large and too insoluble to cross a cell membrane. Digestion is the business of cutting them down until they are small enough and soluble enough to get through.',
            zh: '这正是消化存在的全部理由。淀粉和蛋白质分子太大、太难溶，无法穿过细胞膜。消化就是把它们切小，直到足够小、足够可溶，能够通过为止。',
          },
        },
      ],
    },
    {
      id: 'diet',
      type: 'interaction',
      title: { en: 'A balanced diet is a list', zh: '均衡膳食是一张清单' },
      lines: [
        {
          id: 'diet-1',
          text: {
            en: 'A balanced diet means the right amount of each nutrient, in the right proportions, for that particular person. A labourer needs more energy than an office worker; a pregnant woman needs more iron and calcium; a growing child needs more protein per kilogram than an adult does.',
            zh: '均衡膳食是指对某个特定的人来说，各类营养素的量恰当、比例恰当。体力劳动者比办公室职员需要更多能量；孕妇需要更多铁和钙；正在生长的儿童按体重计需要比成人更多的蛋白质。',
          },
          action: { type: 'setParams', params: { stage: 1 } },
        },
        {
          id: 'diet-2',
          text: {
            en: 'Pair each nutrient with what it is for. Two of them are worth learning as diseases rather than as functions: too little vitamin C gives scurvy, with bleeding gums and wounds that will not close, and too little vitamin D gives rickets, with bones too soft to hold a child up straight.',
            zh: '把每种营养素与它的作用配对。其中有两种更值得当作疾病来记，而不是当作功能：维生素 C 不足会得坏血病，牙龈出血、伤口不愈；维生素 D 不足会得佝偻病，骨骼软得撑不住孩子的身体。',
          },
        },
        {
          id: 'diet-3',
          text: {
            en: 'Notice the trap in vitamin D. It does not build bone itself — it lets you absorb the calcium that does. A child can eat plenty of calcium and still get rickets if there is no vitamin D to let it in.',
            zh: '注意维生素 D 里的陷阱。它本身并不构成骨骼——它使你能够吸收构成骨骼的钙。孩子即使摄入大量的钙，若没有维生素 D 让钙进来，仍然会得佝偻病。',
          },
        },
        {
          id: 'diet-4',
          text: {
            en: 'And fibre is the odd one out: it is the one nutrient that is never digested and never absorbed. It is in the list precisely because it stays in the tube, giving the gut muscles something solid to grip and push against.',
            zh: '膳食纤维是个例外：它是唯一既不被消化也不被吸收的营养素。它之所以出现在清单上，正是因为它留在管道里，让肠道肌肉有实在的东西可以抓握和推动。',
          },
        },
      ],
    },
    {
      id: 'organs',
      type: 'interaction',
      title: { en: 'Following it down the tube', zh: '沿着管道一路向下' },
      lines: [
        {
          id: 'org-1',
          text: {
            en: 'Now the organs, in order. Chewing is physical digestion: it does not change a single molecule, it just breaks the food into smaller pieces — and smaller pieces have a far larger total surface area for the enzymes to work on. The stomach does the same job by churning.',
            zh: '现在按顺序看各个器官。咀嚼属于物理性消化：它不改变任何一个分子，只是把食物弄成更小的碎块——而更小的碎块拥有大得多的总表面积，供酶发挥作用。胃通过搅拌完成同样的工作。',
          },
          action: { type: 'setParams', params: { stage: 2 } },
        },
        {
          id: 'org-2',
          text: {
            en: 'Your teeth do it four ways. Incisors at the front bite and cut. Canines beside them grip and tear. Premolars and molars at the back, with their broad bumpy surfaces, grind. Each tooth is enamel outside, softer dentine beneath, and a living pulp cavity in the middle carrying nerves and blood vessels.',
            zh: '你的牙齿有四种做法。前方的门齿咬断、切割。旁边的犬齿抓握、撕扯。后方的前臼齿和臼齿表面宽阔而有隆起，负责研磨。每颗牙外层是釉质，其下是较软的牙本质，中央是含有神经和血管的活髓腔。',
          },
        },
        {
          id: 'org-3',
          text: {
            en: 'Two of these organs are constantly confused. The liver makes bile. The gall bladder only stores it. Say "the gall bladder produces bile" in an exam and you lose the mark.',
            zh: '其中有两个器官经常被混淆。肝脏生成胆汁，胆囊只是贮存它。考试中写"胆囊分泌胆汁"就会丢分。',
          },
        },
      ],
    },
    {
      id: 'enzymes',
      type: 'interaction',
      title: { en: 'Three enzymes and two impostors', zh: '三种酶和两个冒充者' },
      lines: [
        {
          id: 'enz-1',
          text: {
            en: 'Chemical digestion is done by enzymes, and there are really only three families to learn. Amylase takes starch to maltose. Protease takes protein to amino acids. Lipase takes fats to fatty acids and glycerol. Maltase finishes the first job off, maltose to glucose.',
            zh: '化学性消化由酶完成，真正需要记的只有三大类。淀粉酶把淀粉变成麦芽糖。蛋白酶把蛋白质变成氨基酸。脂肪酶把脂肪变成脂肪酸和甘油。麦芽糖酶完成第一项工作的最后一步：麦芽糖变葡萄糖。',
          },
          action: { type: 'setParams', params: { stage: 3 } },
        },
        {
          id: 'enz-2',
          text: {
            en: 'Two things in this exercise are not enzymes at all, and students lose marks calling them enzymes every year. Hydrochloric acid in the stomach kills bacteria in the food and gives the stomach protease the acidic pH it works best at — around pH two.',
            zh: '这个练习中有两样东西根本不是酶，而学生每年都因把它们称作酶而失分。胃里的盐酸杀灭食物中的细菌，并为胃蛋白酶提供其最适的酸性 pH——大约 pH 2。',
          },
        },
        {
          id: 'enz-3',
          text: {
            en: 'Bile does two things, and neither of them is chemical digestion. It emulsifies fat — breaks a large drop into many tiny ones, which is physical, and increases the surface area for lipase. And it is alkaline, so it neutralises the acid arriving from the stomach and brings the pH up to about eight, where the pancreatic enzymes work best.',
            zh: '胆汁做两件事，两件都不是化学性消化。它乳化脂肪——把大油滴打散成许多小油滴，这是物理过程，为脂肪酶增大了表面积。它还是碱性的，能中和从胃里来的酸，把 pH 提高到约 8，那正是胰酶工作最适的条件。',
          },
        },
        {
          id: 'enz-4',
          text: {
            en: 'That pH swing is worth holding onto: stomach protease wants acid, pancreatic enzymes want alkali, and bile is what moves the food from one condition to the other. It is the same optimum-pH curve you met with enzymes, applied twice in a row inside one body.',
            zh: '这个 pH 的变化值得记住：胃蛋白酶需要酸性，胰酶需要碱性，而胆汁正是把食物从一种条件带到另一种条件的东西。这就是你在酶那一课见过的最适 pH 曲线，在同一个身体里连用了两次。',
          },
        },
      ],
    },
    {
      id: 'absorb',
      type: 'interaction',
      title: { en: 'Crossing the wall', zh: '穿过肠壁' },
      lines: [
        {
          id: 'abs-1',
          text: {
            en: 'Absorption happens in the small intestine, and the whole design of it is one idea repeated: make the surface area enormous and the diffusion distance tiny. The wall is folded into villi; each villus cell is folded again into microvilli; the surface a meal meets is something like the area of a tennis court.',
            zh: '吸收发生在小肠，而它的整个设计只是同一个想法的反复：把表面积做到极大，把扩散距离做到极小。肠壁折叠成绒毛；每个绒毛细胞的表面又折叠成微绒毛；一餐食物所接触的表面，面积大约相当于一个网球场。',
          },
          action: { type: 'setParams', params: { stage: 4 } },
        },
        {
          id: 'abs-2',
          text: {
            en: 'Inside each villus are two separate transport systems, and which product goes into which is a favourite exam question. Glucose and amino acids are water-soluble, and go into the capillary — into the blood. Fatty acids and glycerol go into the lacteal — into the lymph.',
            zh: '每根绒毛内部有两套彼此独立的运输系统，哪种产物进入哪一套是考试的常见问题。葡萄糖和氨基酸是水溶性的，进入毛细血管——进入血液。脂肪酸和甘油进入乳糜管——进入淋巴。',
          },
        },
        {
          id: 'abs-3',
          text: {
            en: 'And the blood supply is not there only to carry things away. By removing absorbed glucose the moment it arrives, it keeps the concentration inside the villus low, which keeps the gradient steep, which keeps diffusion going. Take that away and absorption would stop as soon as the two sides equalised.',
            zh: '血液供应的作用不只是把东西运走。它在葡萄糖刚被吸收时就立即将其带离，使绒毛内部的浓度保持很低，从而维持陡峭的梯度，扩散因此得以持续。若没有这一点，两侧一旦浓度相等，吸收就会停止。',
          },
        },
        {
          id: 'abs-4',
          text: {
            en: 'What is left goes on to the colon, where water is absorbed from it, and out through the anus. That last step is egestion, not excretion — the material never entered your cells, so your body never made it.',
            zh: '剩下的进入结肠，水分在此被吸收，然后经肛门排出。最后这一步是排遗，不是排泄——这些物质从未进入你的细胞，因此并非你的身体所产生。',
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
            en: 'Physical digestion changes the size of the pieces; chemical digestion changes the molecules. Both exist for the same reason: surface area, and then solubility.',
            zh: '物理性消化改变碎块的大小，化学性消化改变分子本身。两者存在的理由相同：先是表面积，然后是溶解性。',
          },
        },
        {
          id: 'sum-2',
          text: {
            en: 'Amylase to maltose, maltase to glucose, protease to amino acids, lipase to fatty acids and glycerol. Bile and hydrochloric acid are not enzymes. The liver makes bile and the gall bladder stores it. And when you are asked why villi are the shape they are, the answer is always surface area and diffusion distance.',
            zh: '淀粉酶生成麦芽糖，麦芽糖酶生成葡萄糖，蛋白酶生成氨基酸，脂肪酶生成脂肪酸和甘油。胆汁和盐酸不是酶。肝脏生成胆汁，胆囊贮存胆汁。当被问到绒毛为什么长成那个样子时，答案永远是表面积和扩散距离。',
          },
        },
      ],
    },
  ],
}

export default nutritionNarration
