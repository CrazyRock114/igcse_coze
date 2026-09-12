import type { NarrationScript } from '@/content/types'

export const excretionNarration: NarrationScript = {
  id: '13-1-excretion',
  sections: [
    {
      id: 'intro',
      type: 'intro',
      title: { en: 'Getting rid of what you made', zh: '排出你自己造出来的东西' },
      lines: [
        {
          id: 'in-1',
          text: {
            en: 'Excretion is the removal of the waste products of metabolism, toxic materials, and substances in excess of requirements. The key word is metabolism: these are things your own reactions made. Faeces are egested, not excreted, because that material never entered your cells.',
            zh: '排泄是排出代谢废物、有毒物质以及超出需要的物质。关键词是"代谢"：这些都是你自身反应产生的东西。粪便是排遗而不是排泄，因为那些物质从未进入你的细胞。',
          },
        },
        {
          id: 'in-2',
          text: {
            en: 'Two organs do most of it. The lungs excrete carbon dioxide, made by respiration in every cell. The kidneys excrete urea, and excess water and ions.',
            zh: '主要由两个器官完成。肺排出二氧化碳，那是每个细胞呼吸作用的产物。肾排出尿素，以及多余的水和离子。',
          },
        },
        {
          id: 'in-3',
          text: {
            en: 'The urea comes from the liver, and the reason is worth knowing. You can store excess carbohydrate as glycogen and excess fat as fat, but there is no store for excess amino acids. So the liver deaminates them: it removes the nitrogen-containing part, and the rest is used for energy.',
            zh: '尿素来自肝脏，其中的原因值得了解。多余的糖类可以贮存为糖原，多余的脂肪可以贮存为脂肪，但氨基酸没有贮存的形式。因此肝脏对它们进行脱氨基：去掉含氮的部分，其余部分用于供能。',
          },
        },
        {
          id: 'in-4',
          text: {
            en: 'That nitrogen-containing part becomes ammonia, which is extremely toxic, so the liver immediately converts it to urea, which is far less so. Urea is still toxic if it builds up — which is exactly why it has to be excreted, and why kidney failure is fatal without treatment.',
            zh: '那部分含氮物质会变成氨，而氨的毒性极强，因此肝脏立即把它转化为毒性小得多的尿素。尿素若积累仍有毒——这正是它必须被排出的原因，也是肾衰竭若不治疗会致命的原因。',
          },
        },
      ],
    },
    {
      id: 'nephron',
      type: 'interaction',
      title: { en: 'Not a filter', zh: '它不是一个滤器' },
      lines: [
        {
          id: 'np-1',
          text: {
            en: 'The kidney is usually described as a filter, and a filter is the wrong picture. A filter separates once and keeps what it caught. A nephron filters almost everything out of the blood and then takes most of it back, deciding substance by substance what to keep.',
            zh: '肾常被描述为滤器，而"滤器"这个比喻是错的。滤器只分离一次，并留下它拦住的东西。肾单位则是先把血液中几乎所有的小分子都滤出来，再把大部分收回去，逐一决定哪些留下。',
          },
          action: { type: 'setParams', params: { water: 100, protein: 100, damage: 0 } },
        },
        {
          id: 'np-2',
          text: {
            en: 'Blood arrives at the glomerulus, a knot of capillaries inside a capsule, under high pressure. That pressure forces small molecules through the capillary wall into the capsule — water, glucose, urea, ions. This is ultrafiltration, and it selects by size alone.',
            zh: '血液以高压到达肾小球——包在肾小囊中的一团毛细血管。这个压力把小分子挤过毛细血管壁进入肾小囊——水、葡萄糖、尿素、离子。这就是超滤，它只按分子大小来筛选。',
          },
        },
        {
          id: 'np-3',
          text: {
            en: 'Look at the glucose line. It is in the blood, and it goes straight into the filtrate — all of it. Filtration cannot help it: glucose is small, so it goes through. And glucose is far too valuable to lose.',
            zh: '看葡萄糖那条线。它在血液中，然后原封不动地进入滤液——全部进去。滤过阶段无能为力：葡萄糖分子小，所以会通过。而葡萄糖又太宝贵，不能丢。',
          },
        },
        {
          id: 'np-4',
          text: {
            en: 'So the tubule takes it all back — selective reabsorption, by active transport, using energy. Follow the line to the end: zero glucose in urine. Which is why finding glucose in someone urine is a sign of diabetes: the blood level was so high that the tubule could not keep up.',
            zh: '于是肾小管把它全部收回——选择性重吸收，通过主动运输，消耗能量。把线一直看到末端：尿中葡萄糖为零。这也是为什么在尿中发现葡萄糖是糖尿病的信号：血糖高到肾小管来不及全部回收。',
          },
        },
        {
          id: 'np-5',
          text: {
            en: 'Now the urea line. Filtered out, and hardly any taken back. That is the whole job — the kidney is not removing urea by picking it out of the blood, it is removing everything and then declining to reclaim the urea.',
            zh: '再看尿素那条线：被滤出后几乎不被收回。这就是肾脏的全部工作——它并不是从血液中把尿素挑出来，而是把一切都滤出去，然后拒绝把尿素收回来。',
          },
        },
        {
          id: 'np-6',
          text: {
            en: 'Water is the adjustable one. Drink a lot and less is reabsorbed, so the urine is dilute and there is plenty of it. Drink little and almost all of it comes back, so the urine is scant and dark. Try both.',
            zh: '水是可调节的那一个。喝得多，重吸收就少，尿液稀且量多；喝得少，几乎全部收回，尿液少而色深。两种都试试。',
          },
          action: { type: 'setParams', params: { water: 190, protein: 100, damage: 0 } },
        },
        {
          id: 'np-7',
          text: {
            en: 'But notice it never reaches zero. Some water always leaves, because the urea has to leave in something. A kidney that reclaimed every drop would poison the body it was protecting.',
            zh: '但要注意它从不会降到零。总有一部分水必须离开，因为尿素得溶在什么东西里排出去。一个把每一滴水都收回的肾，会毒死它本要保护的身体。',
          },
          action: { type: 'setParams', params: { water: 15, protein: 100, damage: 0 } },
        },
      ],
    },
    {
      id: 'protein',
      type: 'interaction',
      title: { en: 'The one that never gets in', zh: '那个根本进不去的' },
      lines: [
        {
          id: 'pr-1',
          text: {
            en: 'Now the protein line, and it is different from all three. It never enters the filtrate at all. Protein molecules are too large to pass through the capillary wall, so ultrafiltration excludes them at the first step.',
            zh: '现在看蛋白质那条线，它与前三者都不同：它根本没有进入滤液。蛋白质分子太大，无法穿过毛细血管壁，因此在超滤的第一步就被挡在外面。',
          },
          action: { type: 'setParams', params: { water: 100, protein: 100, damage: 0 } },
        },
        {
          id: 'pr-2',
          text: {
            en: 'Which makes protein in urine a very useful sign. It cannot be a reabsorption problem, because there was nothing to reabsorb. It means the glomerulus itself is letting through what it should be holding back. Turn the damage up.',
            zh: '因此，尿中出现蛋白质是一个非常有用的信号。它不可能是重吸收出了问题，因为压根就没有东西需要重吸收。它意味着肾小球本身正在放过它本应拦住的东西。把损伤程度调高看看。',
          },
          action: { type: 'setParams', params: { water: 100, protein: 100, damage: 70 } },
          pause: 1,
        },
        {
          id: 'pr-3',
          text: {
            en: 'And now raise the dietary protein instead, with the kidney healthy. The urea goes up — more amino acids deaminated — but the urinary protein stays at zero. Eating protein does not put protein in your urine, and confusing those two is the commonest wrong answer to this question.',
            zh: '现在把肾恢复健康，改为提高膳食蛋白。尿素上升了——脱氨基的氨基酸更多——但尿蛋白仍然是零。吃蛋白质并不会让尿里出现蛋白质，把这两者混为一谈是这类题最常见的错误答案。',
          },
          action: { type: 'setParams', params: { water: 100, protein: 190, damage: 0 } },
        },
      ],
    },
    {
      id: 'structure',
      type: 'concept',
      title: { en: 'Where all this happens', zh: '这一切发生在哪里' },
      lines: [
        {
          id: 'st-1',
          text: {
            en: 'The urinary system: two kidneys, a ureter from each carrying urine down to the bladder, which stores it, and the urethra carrying it out. Two ureters, one urethra — the spelling is nearly the same and the marks are not.',
            zh: '泌尿系统：两个肾，各连一条输尿管把尿液送到膀胱贮存，再由尿道排出。两条输尿管、一条尿道——英文拼写几乎一样，但分数可不一样。',
          },
        },
        {
          id: 'st-2',
          text: {
            en: 'Cut a kidney across and there are two regions: an outer cortex and an inner medulla. The glomeruli and capsules are all in the cortex; the loops of the tubules run down into the medulla, which is where most of the water is reclaimed.',
            zh: '把肾横切开，可见两个区域：外层的皮质和内层的髓质。肾小球和肾小囊都在皮质中；肾小管的袢向下深入髓质，大部分水正是在那里被回收的。',
          },
        },
        {
          id: 'st-3',
          text: {
            en: 'And each nephron has its own blood supply running alongside it the whole way — which it must, because everything reabsorbed has to go back into the blood, and it has to be collected all along the tubule rather than at one point.',
            zh: '每个肾单位都有自己的血管全程伴行——这是必须的，因为被重吸收的一切都要回到血液中，而且必须沿肾小管全程收集，而不是在某一点收集。',
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
            en: 'Ultrafiltration selects by size and happens at the glomerulus. Selective reabsorption decides what to keep and happens along the tubule. Two different stages doing two different jobs — name the right one.',
            zh: '超滤按分子大小筛选，发生在肾小球。选择性重吸收决定留下什么，沿肾小管进行。这是两个不同阶段、两项不同工作——要说对是哪一个。',
          },
        },
        {
          id: 'sum-2',
          text: {
            en: 'Glucose: filtered, fully reabsorbed, none in urine. Urea: filtered, not reabsorbed. Water: filtered, variably reabsorbed. Protein: never filtered — so protein in urine means the glomerulus is damaged.',
            zh: '葡萄糖：被滤出、完全重吸收、尿中没有。尿素：被滤出、不重吸收。水：被滤出、重吸收量可变。蛋白质：根本不被滤出——因此尿中有蛋白质意味着肾小球受损。',
          },
        },
        {
          id: 'sum-3',
          text: {
            en: 'And urea is made in the liver, not in the kidney. The kidney only removes it. That distinction is worth a mark on its own.',
            zh: '还有：尿素在肝脏产生，不在肾脏产生。肾只负责把它排出。这个区别本身就值一分。',
          },
        },
      ],
    },
  ],
}

export default excretionNarration
