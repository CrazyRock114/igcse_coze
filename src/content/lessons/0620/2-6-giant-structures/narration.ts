import type { NarrationScript } from '@/content/types'

export const giantNarration: NarrationScript = {
  id: '2-6-giant-structures',
  sections: [
    {
      id: 'twins',
      type: 'interaction',
      title: { en: 'Two forms of one element', zh: '同一元素的两种形态' },
      lines: [
        {
          id: 'tw-1',
          text: {
            en: 'Diamond and graphite are both made of carbon and nothing else. No other atoms, no impurities, no difference in the particles at all. One is the hardest natural substance known and does not conduct electricity; the other is soft enough to write with and conducts like a metal. Everything that separates them is in the arrangement.',
            zh: '金刚石和石墨都只由碳构成，没有别的原子、没有杂质，粒子本身毫无差别。一个是已知最硬的天然物质且不导电；另一个软到可以书写，而且像金属一样导电。区分它们的一切都在于排列方式。',
          },
          action: { type: 'setParams', params: { structure: 0 } },
        },
        {
          id: 'tw-2',
          text: {
            en: 'Diamond first. Every carbon atom is joined by strong covalent bonds to four others, arranged tetrahedrally, and that pattern repeats right through the crystal. There are no molecules here — the whole diamond is effectively one molecule, which is what "giant covalent structure" means.',
            zh: '先看金刚石。每个碳原子通过强共价键与另外四个碳原子相连，呈四面体排列，这种结构贯穿整块晶体重复出现。这里没有分子——整块金刚石实际上就是一个分子，这正是"巨型共价结构"的含义。',
          },
        },
        {
          id: 'tw-3',
          text: {
            en: 'Two consequences follow directly. To scratch it you would have to break covalent bonds, and there is no direction in which they are weaker — so it is exceptionally hard, and used for cutting tools and drill tips. And all four outer electrons are held in bonds, so none is free to move: diamond does not conduct electricity.',
            zh: '由此直接得出两个结论。要刮伤它就必须打断共价键，而且在任何方向上这些键都不更弱——所以它异常坚硬，被用于切割工具和钻头。而且四个外层电子全部参与成键，没有一个能自由移动：金刚石不导电。',
          },
        },
        {
          id: 'tw-4',
          text: {
            en: 'Now graphite. Count the bonds on any atom: three, not four. The carbons form flat sheets of hexagons, and between the sheets there is nothing but weak forces of attraction.',
            zh: '现在看石墨。数一数任何一个原子上的键：三条，不是四条。碳原子形成六边形的平面片层，而片层之间只有微弱的吸引力。',
          },
          action: { type: 'setParams', params: { structure: 1 } },
        },
        {
          id: 'tw-5',
          text: {
            en: 'That fourth outer electron has to go somewhere, and it is not in a bond. It is delocalised — free to move through the structure. Those are the green dots between the layers, and they are why graphite conducts electricity while diamond does not. Free electrons carry current; that is the same reason metals conduct.',
            zh: '第四个外层电子总得有个去处，而它并不在键中。它是离域的——可以在结构中自由移动。图中层间的绿色小点就是它们，这正是石墨导电而金刚石不导电的原因。自由电子输运电流；金属导电也是同一个道理。',
          },
        },
        {
          id: 'tw-6',
          text: {
            en: 'And because only weak forces hold the layers together, the layers slide over one another with very little effort. That makes graphite soft and slippery — good as a lubricant, and good in a pencil, where the layers you rub off are what stays on the paper.',
            zh: '又因为层与层之间只有微弱作用力，稍加用力它们就能相互滑动。这使石墨柔软滑腻——适合作润滑剂，也适合作铅笔芯，被蹭下来的那些层就是留在纸上的痕迹。',
          },
        },
        {
          id: 'tw-7',
          text: {
            en: 'Note carefully what is weak and what is not. The covalent bonds inside a graphite layer are just as strong as those in diamond, which is why graphite still has an extremely high melting point. It is only the forces between layers that are weak. Writing "graphite has weak bonds" loses the mark; "weak forces between the layers" earns it.',
            zh: '要仔细分清什么弱、什么不弱。石墨层内的共价键与金刚石中的一样强，这正是石墨熔点依然极高的原因。弱的只是层与层之间的作用力。写"石墨的键弱"会丢分；写"层与层之间的作用力弱"才得分。',
          },
        },
      ],
    },
    {
      id: 'silica',
      type: 'interaction',
      title: { en: 'Sand, under a very good microscope', zh: '在极好的显微镜下看沙子' },
      lines: [
        {
          id: 'si-1',
          text: {
            en: 'Silicon(IV) oxide is the diamond structure with an oxygen atom inserted into every bond. Each silicon is still bonded to four things — now four oxygens — and each oxygen bridges exactly two silicons.',
            zh: '二氧化硅就是在金刚石结构的每一条键上插入一个氧原子。每个硅仍与四个原子成键——现在是四个氧——而每个氧恰好桥连两个硅。',
          },
          action: { type: 'setParams', params: { structure: 2 } },
        },
        {
          id: 'si-2',
          text: {
            en: 'Count them and the formula appears. Four bonds per silicon, two per oxygen, so there must be twice as many oxygens as silicons: SiO₂. The formula is not a fact to memorise, it is a consequence of the geometry.',
            zh: '数一数，化学式就出来了。每个硅四条键，每个氧两条键，因此氧原子数必然是硅的两倍：SiO₂。这个化学式不是要背的事实，而是几何结构的必然结果。',
          },
        },
        {
          id: 'si-3',
          text: {
            en: 'Being a rigid covalent network, it behaves like diamond: very hard, a very high melting point of about seventeen hundred degrees, insoluble in water, and no free electrons so it does not conduct. This is what sand and quartz are, and it is why glassmaking needs a furnace.',
            zh: '作为刚性共价网络，它的表现与金刚石类似：非常硬、熔点约 1700 度、不溶于水，且没有自由电子因而不导电。沙子和石英就是这种物质，玻璃制造之所以需要熔炉也正因如此。',
          },
        },
      ],
    },
    {
      id: 'metal',
      type: 'interaction',
      title: { en: 'Why a metal bends instead of shattering', zh: '金属为何会弯曲而不碎裂' },
      lines: [
        {
          id: 'me-1',
          text: {
            en: 'A metal is a lattice of positive ions sitting in a sea of delocalised electrons. Each atom has given up its outer electrons to the sea, which is why the ions are positive, and the bonding is the attraction between those positive ions and the negative electrons around them.',
            zh: '金属是浸在离域电子海中的正离子晶格。每个原子把外层电子交给了这片电子海，因此离子带正电，而金属键就是这些正离子与周围负电子之间的吸引。',
          },
          action: { type: 'setParams', params: { structure: 3 } },
        },
        {
          id: 'me-2',
          text: {
            en: 'The electrons belong to the whole piece of metal rather than to any one atom. Apply a voltage and they drift, which is why metals conduct electricity. They carry energy as they move, too, which is why metals conduct heat so well.',
            zh: '这些电子属于整块金属，而不属于任何单个原子。施加电压它们就会漂移，这正是金属导电的原因。它们移动时也带走能量，这也是金属导热良好的原因。',
          },
        },
        {
          id: 'me-3',
          text: {
            en: 'Now the property that separates a metal from an ionic solid. Because every ion in the lattice is identical, a layer can slide over the one below without ever bringing like charges together — the electron sea simply flows around and the bonding survives. So a metal bends, and can be hammered and drawn into shape.',
            zh: '现在说说金属区别于离子固体的性质。由于晶格中每个离子都完全相同，一层可以相对下面一层滑动而绝不会使同种电荷靠到一起——电子海只是随之流动，金属键依然存在。所以金属会弯曲，可以被锤打和拉伸成形。',
          },
        },
        {
          id: 'me-4',
          text: {
            en: 'Compare that with an ionic crystal, where sliding one layer brings positive next to positive. They repel, the crystal splits along that plane, and it shatters. Same push, opposite outcome, and the reason is entirely in what the layers are made of.',
            zh: '与离子晶体对比：滑动一层会使正离子紧邻正离子。它们相互排斥，晶体沿该平面裂开，于是碎裂。同样的作用力，相反的结果，原因完全在于层是由什么构成的。',
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
            en: 'Diamond: each carbon bonded to four others in a rigid covalent network. Very hard, very high melting point, does not conduct because no electrons are free.',
            zh: '金刚石：每个碳与另外四个碳在刚性共价网络中成键。非常硬、熔点很高、因没有自由电子而不导电。',
          },
        },
        {
          id: 'sum-2',
          text: {
            en: 'Graphite: each carbon bonded to only three, in layers. The fourth electron is delocalised, so it conducts. Weak forces between layers — not weak bonds — so the layers slide and it is soft.',
            zh: '石墨：每个碳只与另外三个成键，形成层状结构。第四个电子离域，因此导电。层与层之间是弱作用力——不是弱的键——所以层能滑动，石墨柔软。',
          },
        },
        {
          id: 'sum-3',
          text: {
            en: 'Silicon(IV) oxide: four bonds per silicon, two per oxygen, hence SiO₂, and diamond-like properties. A metal: positive ions in a sea of delocalised electrons — the electrons move so it conducts, and identical layers slide so it is malleable.',
            zh: '二氧化硅：每个硅四条键、每个氧两条键，故为 SiO₂，性质与金刚石类似。金属：正离子浸在离域电子海中——电子可移动因而导电，相同的层可滑动因而有延展性。',
          },
        },
      ],
    },
  ],
}

export default giantNarration
