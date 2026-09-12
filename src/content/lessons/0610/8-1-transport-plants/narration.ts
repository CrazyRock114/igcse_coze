import type { NarrationScript } from '@/content/types'

export const transportPlantsNarration: NarrationScript = {
  id: '8-1-transport-plants',
  sections: [
    {
      id: 'intro',
      type: 'intro',
      title: { en: 'Two pipes, going opposite ways', zh: '两条管道，方向相反' },
      lines: [
        {
          id: 'in-1',
          text: {
            en: 'A plant has two transport tissues. Xylem carries water and dissolved mineral ions upwards, from the roots to the leaves, and only upwards. Phloem carries sucrose and amino acids, and it goes in whichever direction the plant needs.',
            zh: '植物有两种运输组织。木质部把水和溶解的矿质离子向上运输，从根到叶，而且只向上。韧皮部运输蔗糖和氨基酸，方向则视植物的需要而定。',
          },
        },
        {
          id: 'in-2',
          text: {
            en: 'Their positions are worth learning as a picture. In a root the xylem is a star at the very centre. In a stem they are in bundles near the outside, with the xylem on the inside of each bundle and the phloem outside it. In a leaf they are the veins, xylem on top.',
            zh: '它们的位置值得当作图像来记。在根中，木质部呈星状位于最中央。在茎中，它们成束靠近外缘，每束中木质部在内、韧皮部在外。在叶中，它们就是叶脉，木质部在上方。',
          },
        },
        {
          id: 'in-3',
          text: {
            en: 'A xylem vessel is a remarkable thing: a column of dead cells with their end walls dissolved away, making a continuous hollow tube. No cytoplasm to get in the way, and walls thickened with lignin so they do not collapse under the tension of the water being pulled up them.',
            zh: '导管是很了不起的结构：一串死细胞，端壁已被溶解，形成连续的中空管道。没有细胞质阻碍水流，管壁又被木质素加厚，因而不会在水被向上拉的张力下塌陷。',
          },
        },
      ],
    },
    {
      id: 'uptake',
      type: 'concept',
      title: { en: 'In at the roots', zh: '从根部进入' },
      lines: [
        {
          id: 'up-1',
          text: {
            en: 'Water enters through root hair cells. Each one is a single cell drawn out into a long thin projection, and there are enormous numbers of them — which gives a very large surface area for absorption. It is the same trick as villi and alveoli.',
            zh: '水通过根毛细胞进入。每个根毛都是单个细胞延伸成的细长突起，数量极多——这提供了非常大的吸收表面积。这与绒毛和肺泡用的是同一招。',
          },
        },
        {
          id: 'up-2',
          text: {
            en: 'Water enters by osmosis, down a water potential gradient. Mineral ions are different: they are often more concentrated inside the root than in the soil, so they have to be taken in by active transport, against the gradient, using energy from respiration.',
            zh: '水通过渗透进入，沿水势梯度移动。矿质离子则不同：它们在根内的浓度往往高于土壤，因此必须通过主动运输逆浓度梯度吸收，消耗呼吸作用提供的能量。',
          },
        },
        {
          id: 'up-3',
          text: {
            en: 'From there the path is: root hair, root cortex, xylem, up the stem, into the leaf, into the mesophyll cells. You can see it by standing a white flower or a stick of celery in dye and cutting it across afterwards — the xylem is stained and nothing else is.',
            zh: '之后的路径是：根毛、根皮层、木质部、沿茎上行、进入叶片、进入叶肉细胞。把白花或芹菜梗插入染液，过后横切开来就能看到——只有木质部被染上颜色，其余部分都没有。',
          },
        },
      ],
    },
    {
      id: 'transpiration',
      type: 'interaction',
      title: { en: 'Pulled up by evaporation', zh: '由蒸发拉上去' },
      lines: [
        {
          id: 'tr-1',
          text: {
            en: 'Transpiration is the loss of water vapour from the leaves. Water evaporates from the surfaces of the mesophyll cells into the air spaces inside the leaf, and then diffuses out through the stomata, down a concentration gradient.',
            zh: '蒸腾作用是叶片散失水蒸气。水从叶肉细胞的表面蒸发到叶内的气腔中，再沿浓度梯度经气孔扩散出去。',
          },
          action: { type: 'setParams', params: { temperature: 20, humidity: 50, wind: 0, light: 60 } },
        },
        {
          id: 'tr-2',
          text: {
            en: 'And that loss is what pulls the whole column of water up the plant. Water molecules stick to each other, so as one leaves the top of the column the whole column is drawn up behind it. That is the transpiration pull, and it works because the xylem is a continuous tube of dead cells and the lignin stops it collapsing.',
            zh: '而这种散失正是把整根水柱向上拉的动力。水分子彼此相互吸引，因此当顶端有一个分子离开，整根水柱就被向上拉一分。这就是蒸腾拉力；它之所以有效，是因为木质部是由死细胞构成的连续管道，而木质素使它不至于塌陷。',
          },
        },
        {
          id: 'tr-3',
          text: {
            en: 'Now the four conditions. Raise the temperature: molecules have more kinetic energy so more of them evaporate, and warm air holds more water vapour. The rate climbs and keeps climbing.',
            zh: '现在看四个条件。升高温度：分子动能增大，蒸发的分子更多，而且暖空气能容纳更多水蒸气。速率上升，而且持续上升。',
          },
          action: { type: 'setParams', params: { temperature: 38, humidity: 50, wind: 0, light: 60 } },
        },
        {
          id: 'tr-4',
          text: {
            en: 'Now the humidity. Push it to a hundred per cent and transpiration stops completely — however hot, however windy. There is no gradient left: the air outside is as wet as the air inside, so nothing diffuses. Diffusion needs a difference, and there is no longer one.',
            zh: '现在看湿度。把它推到 100%，蒸腾就完全停止——无论多热、风多大。梯度已经不存在了：外面的空气和里面一样湿，因此没有扩散发生。扩散需要差异，而差异已经没有了。',
          },
          action: { type: 'setParams', params: { temperature: 38, humidity: 100, wind: 5, light: 60 } },
          pause: 1,
        },
        {
          id: 'tr-5',
          text: {
            en: 'Wind works by removing the humid air that collects just outside the stomata, keeping the gradient steep. Notice that the first breath of wind helps far more than the tenth — once that layer of still air has gone, there is nothing more for the wind to do.',
            zh: '风的作用是把聚集在气孔外侧的潮湿空气带走，从而维持陡峭的梯度。注意，最初的一点风比第十级风的作用大得多——一旦那层静止空气被吹散，风就再没有什么可做的了。',
          },
          action: { type: 'setParams', params: { temperature: 25, humidity: 40, wind: 8, light: 60 } },
        },
        {
          id: 'tr-6',
          text: {
            en: 'And light is the odd one out, because it does not act on the evaporation at all. It acts on the stomata: light makes the guard cells open them. So the light curve rises and then flattens — once the stomata are fully open, more light cannot open them further.',
            zh: '光则是例外，因为它根本不作用于蒸发，而是作用于气孔：光使保卫细胞把气孔打开。因此光照曲线先上升、然后变平——气孔一旦完全张开，再多的光也无法让它开得更大。',
          },
          action: { type: 'setParams', params: { temperature: 25, humidity: 40, wind: 2, light: 100 } },
        },
        {
          id: 'tr-7',
          text: {
            en: 'Which sets up the plant’s real problem. Turn the light right down so the stomata close. Water loss almost stops — but look at the photosynthesis reading beside it. It has stopped too, because the same holes that let water out are the ones that let carbon dioxide in.',
            zh: '这就引出了植物真正的两难。把光调到很低，让气孔关闭。失水几乎停止了——但看旁边的光合作用读数：它也停止了，因为让水出去的正是让二氧化碳进来的那些孔。',
          },
          action: { type: 'setParams', params: { temperature: 25, humidity: 40, wind: 2, light: 2 } },
          pause: 1,
        },
        {
          id: 'tr-8',
          text: {
            en: 'That is the trade every land plant lives with. Open the stomata and you photosynthesise but you dry out; close them and you keep your water but you starve. A cactus has chosen one side of that trade, and a rainforest plant the other.',
            zh: '这就是每一种陆生植物都必须面对的取舍。张开气孔就能光合作用，但会失水；关闭气孔能保住水分，却会挨饿。仙人掌选择了这一边，雨林植物选择了另一边。',
          },
        },
        {
          id: 'tr-9',
          text: {
            en: 'And if the leaves lose water faster than the roots can replace it, the cells go flaccid, they stop pressing against their walls, and the plant wilts. Wilting is not damage in itself — it is the plant reducing its exposed surface area, which slows further loss.',
            zh: '如果叶片失水的速度超过根系补充的速度，细胞就会变软，不再顶住细胞壁，植物便萎蔫。萎蔫本身并不是损伤——那是植物在减少暴露的表面积，从而减缓进一步的失水。',
          },
        },
      ],
    },
    {
      id: 'translocation',
      type: 'concept',
      title: { en: 'Sugar goes both ways', zh: '糖的运输是双向的' },
      lines: [
        {
          id: 'tl-1',
          text: {
            en: 'Translocation is the movement of sucrose and amino acids through the phloem. Unlike the xylem it is not one-way, and unlike the xylem the cells are alive.',
            zh: '有机物运输是指蔗糖和氨基酸经韧皮部的移动。与木质部不同，它不是单向的；也与木质部不同，其细胞是活的。',
          },
        },
        {
          id: 'tl-2',
          text: {
            en: 'A source is a part that releases sucrose into the phloem. A sink is a part that takes it out and uses or stores it. Sucrose moves from source to sink — which is why the direction changes.',
            zh: '源是把蔗糖释放进韧皮部的部位；库是把蔗糖取走并利用或贮存的部位。蔗糖由源流向库——方向之所以会变，原因就在这里。',
          },
        },
        {
          id: 'tl-3',
          text: {
            en: 'And the same organ can be either at different times. A potato tuber in summer is a sink: the leaves are photosynthesising and sending sugar down to be stored as starch. The following spring, before there are any leaves, that same tuber is the source — sending sugar up to grow the new shoot.',
            zh: '同一个器官在不同时期可以扮演不同角色。夏天的马铃薯块茎是库：叶片进行光合作用，把糖送下来贮存为淀粉。到了第二年春天，在长出叶片之前，同一个块茎则成了源——把糖向上送去长出新芽。',
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
            en: 'Xylem: water and mineral ions, upwards only, dead cells with lignified walls. Phloem: sucrose and amino acids, source to sink, living cells.',
            zh: '木质部：运输水和矿质离子，只向上，由具木质化壁的死细胞构成。韧皮部：运输蔗糖和氨基酸，由源到库，由活细胞构成。',
          },
        },
        {
          id: 'sum-2',
          text: {
            en: 'For any condition affecting transpiration, explain it through the gradient. Higher humidity means a smaller difference in water vapour between leaf and air, so slower diffusion out. That is the sentence pattern the marks are for.',
            zh: '解释任何影响蒸腾的条件，都要通过"梯度"来说明。湿度升高意味着叶内与空气之间的水蒸气差变小，因此向外扩散变慢。这就是给分的句式。',
          },
        },
        {
          id: 'sum-3',
          text: {
            en: 'And light is the exception: it works by opening the stomata, not by speeding evaporation, which is why its curve levels off and the others do not.',
            zh: '光是例外：它通过打开气孔起作用，而不是加快蒸发，这正是它的曲线会变平、而其他曲线不会的原因。',
          },
        },
      ],
    },
  ],
}

export default transportPlantsNarration
