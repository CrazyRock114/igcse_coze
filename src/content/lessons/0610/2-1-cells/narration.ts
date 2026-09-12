import type { NarrationScript } from '@/content/types'

export const cellsNarration: NarrationScript = {
  id: '2-1-cells',
  sections: [
    {
      id: 'intro',
      type: 'interaction',
      title: { en: 'Not "an animal cell plus extras"', zh: '不是"动物细胞加几样东西"' },
      lines: [
        {
          id: 'in-1',
          text: {
            en: 'Plant cells are usually taught as an animal cell with three things added. Sort them instead and the real shape appears: most structures are in every cell, and it is the differences that are the short lists.',
            zh: '植物细胞通常被讲成"动物细胞再加三样东西"。改用分类的方式来看，真实的格局就浮现出来了：大多数结构每种细胞都有，反倒是差异才是那几张短短的清单。',
          },
          action: { type: 'setParams', params: { stage: 1 } },
        },
        {
          id: 'in-2',
          text: {
            en: 'Every cell has a cell membrane controlling what enters and leaves, cytoplasm where the reactions happen, and ribosomes where proteins are made. Bacteria included — a bacterium is not a simplified animal cell, it is a different kind of cell.',
            zh: '每种细胞都有控制物质进出的细胞膜、进行各种反应的细胞质，以及合成蛋白质的核糖体。细菌也不例外——细菌不是"简化版的动物细胞"，而是另一类细胞。',
          },
        },
        {
          id: 'in-3',
          text: {
            en: 'A plant cell adds three: a cellulose cell wall for support and shape, chloroplasts containing chlorophyll for photosynthesis, and a large permanent vacuole of cell sap that keeps the cell turgid.',
            zh: '植物细胞多出三样：起支撑和定形作用的纤维素细胞壁、含叶绿素进行光合作用的叶绿体，以及维持细胞膨胀状态的大型永久液泡（内含细胞液）。',
          },
        },
        {
          id: 'in-4',
          text: {
            en: 'A bacterium is defined by what it does not have. No nucleus — its DNA is a circle lying free in the cytoplasm. No mitochondria, no chloroplasts, no membrane-bound organelles at all. It does have a cell wall, but not one made of cellulose, and it often has plasmids: small extra rings of DNA.',
            zh: '细菌的特征在于它"没有什么"。没有细胞核——它的 DNA 是游离在细胞质中的环状分子。没有线粒体、没有叶绿体，完全没有膜包被的细胞器。它确实有细胞壁，但不是纤维素的；它还常带有质粒：额外的小环状 DNA。',
          },
        },
        {
          id: 'in-5',
          text: {
            en: 'Those plasmids matter more than they look. They are the reason bacteria can be given a human gene and made to produce human insulin — and the reason antibiotic resistance can pass from one bacterium to another.',
            zh: '这些质粒的重要性超出其外表。正因为有它们，细菌才可以被导入人类基因、用来生产人胰岛素——也正因为有它们，抗生素耐药性才能在细菌之间传递。',
          },
        },
      ],
    },
    {
      id: 'levels',
      type: 'concept',
      title: { en: 'From one cell to an organism', zh: '从一个细胞到一个个体' },
      lines: [
        {
          id: 'lv-1',
          text: {
            en: 'New cells only ever come from the division of existing cells. And as an organism grows, most of its cells specialise — they take on a shape and a set of contents suited to one job, like a root hair cell, a red blood cell or a ciliated cell.',
            zh: '新细胞只能由已有细胞分裂而来。随着生物体生长，它的大多数细胞会特化——形成适合某一项工作的形状与内含物，例如根毛细胞、红细胞或纤毛细胞。',
          },
        },
        {
          id: 'lv-2',
          text: {
            en: 'Then the levels stack. A tissue is a group of cells of similar structure working together. An organ is several tissues working together for one function. An organ system is several organs working together. An organism is the whole thing.',
            zh: '接着层次叠加：组织是一群结构相似、共同工作的细胞；器官是若干组织为同一项功能共同工作；器官系统是若干器官共同工作；个体则是整体。',
          },
        },
        {
          id: 'lv-3',
          text: {
            en: 'Learn one example the whole way up and the definitions stop being abstract. Muscle cell, muscle tissue, the stomach, the digestive system, a human.',
            zh: '把一个例子从头到尾记一遍，这些定义就不再抽象了：肌细胞、肌肉组织、胃、消化系统、人。',
          },
        },
      ],
    },
    {
      id: 'size',
      type: 'concept',
      title: { en: 'Magnification, and the trap in it', zh: '放大倍数，以及其中的陷阱' },
      lines: [
        {
          id: 'sz-1',
          text: {
            en: 'Magnification is image size divided by actual size. Rearrange it however the question needs: actual size is image size divided by magnification.',
            zh: '放大倍数等于图像大小除以实际大小。按题目需要变形即可：实际大小 = 图像大小 ÷ 放大倍数。',
          },
        },
        {
          id: 'sz-2',
          text: {
            en: 'The trap is units. Measure the image in millimetres with a ruler, and the actual size will often be given in micrometres. A thousand micrometres in a millimetre — so convert before you divide, not after.',
            zh: '陷阱在于单位。你用尺子量出的图像大小是毫米，而实际大小常以微米给出。1 毫米 = 1000 微米——所以要在做除法之前换算，而不是之后。',
          },
        },
        {
          id: 'sz-3',
          text: {
            en: 'And magnification has no unit at all. It is a length divided by a length, so the units cancel. Writing "× 400 mm" is wrong, and writing nothing after the number is right.',
            zh: '而且放大倍数没有单位。它是长度除以长度，单位相互抵消。写成"×400 mm"是错的；数字后面什么都不写才是对的。',
          },
        },
      ],
    },
    {
      id: 'molecules',
      type: 'interaction',
      title: { en: 'Three families of molecule', zh: '三大类分子' },
      lines: [
        {
          id: 'mo-1',
          text: {
            en: 'Carbohydrates, fats and proteins are each built by joining small molecules into large ones. Sort these by what they are made of rather than by what they do — because several of them are named for their job and that is what makes them confusing.',
            zh: '糖类、脂肪和蛋白质都是把小分子连成大分子而形成的。按"由什么构成"而不是"起什么作用"来分类——因为其中有几种是按功能命名的，这正是它们容易被搞混的原因。',
          },
          action: { type: 'setParams', params: { stage: 2 } },
        },
        {
          id: 'mo-2',
          text: {
            en: 'Carbohydrates are made of simple sugars, and they contain carbon, hydrogen and oxygen. Starch, glycogen and cellulose are all long chains of glucose — the same building block, joined three different ways, giving a plant store, an animal store and a cell wall.',
            zh: '糖类由单糖构成，含碳、氢、氧。淀粉、糖原和纤维素都是葡萄糖的长链——同一种构件，以三种不同的方式连接，分别成为植物的贮存物、动物的贮存物和细胞壁。',
          },
        },
        {
          id: 'mo-3',
          text: {
            en: 'Fats are made of fatty acids and glycerol, and contain the same three elements but far less oxygen. Proteins are made of amino acids, and they contain nitrogen as well — nitrogen is how you spot a protein in a list of elements.',
            zh: '脂肪由脂肪酸和甘油构成，含同样的三种元素，但氧少得多。蛋白质由氨基酸构成，此外还含氮——在元素清单中，"氮"就是识别蛋白质的标志。',
          },
        },
        {
          id: 'mo-4',
          text: {
            en: 'Haemoglobin, amylase and antibodies are all proteins. They are named for what they do — carrying oxygen, digesting starch, fighting pathogens — and it is easy to file them as three separate kinds of thing. They are one kind of thing folded three ways.',
            zh: '血红蛋白、淀粉酶和抗体都是蛋白质。它们按功能命名——运输氧、消化淀粉、对抗病原体——因而很容易被当成三类不同的东西。其实它们是同一类东西，只是折叠成了三种形状。',
          },
        },
        {
          id: 'mo-5',
          text: {
            en: 'And DNA is a fourth kind: two strands wound into a double helix, held together by pairs of bases. The order of those bases is what carries the information.',
            zh: 'DNA 则是第四类：两条链绕成双螺旋，由成对的碱基连接在一起。碱基的排列顺序，就是所携带的信息。',
          },
        },
      ],
    },
    {
      id: 'tests',
      type: 'interaction',
      title: { en: 'Five tests and five colours', zh: '五种检验，五种颜色' },
      lines: [
        {
          id: 'tt-1',
          text: {
            en: 'Five food tests, and the marks are for the colour change, not just the reagent. Say what colour it starts and what colour it ends.',
            zh: '五种食物检验，得分点在于颜色变化，而不只是试剂名称。要说清起始颜色和最终颜色。',
          },
          action: { type: 'setParams', params: { stage: 3 } },
        },
        {
          id: 'tt-2',
          text: {
            en: 'Iodine for starch: orange-brown to blue-black. Benedict’s for reducing sugars: blue to green, yellow, orange or brick red depending on how much there is — and it needs heating. Biuret for protein: blue to purple, and no heating.',
            zh: '碘液检验淀粉：由橙棕色变蓝黑色。本尼迪克特试剂检验还原糖：由蓝色变为绿、黄、橙或砖红色，取决于含量多少——而且需要加热。双缩脲试剂检验蛋白质：由蓝色变紫色，不需加热。',
          },
        },
        {
          id: 'tt-3',
          text: {
            en: 'Ethanol for fats: dissolve the sample in ethanol, pour it into water, and a cloudy white emulsion forms. And DCPIP for vitamin C: the blue dye loses its colour, and the less vitamin C you need to add, the more concentrated the sample was.',
            zh: '乙醇检验脂肪：把样品溶于乙醇，再倒入水中，会形成白色浑浊乳浊液。DCPIP 检验维生素 C：蓝色染料褪色，而所需加入的量越少，说明样品浓度越高。',
          },
        },
        {
          id: 'tt-4',
          text: {
            en: 'Benedict’s is the one worth extra attention, because it is semi-quantitative: the colour tells you roughly how much sugar there is. Green is a little, brick red is a lot. Most food tests only say yes or no.',
            zh: '本尼迪克特试剂值得多留意，因为它是半定量的：颜色能大致反映糖的多少。绿色表示少，砖红色表示多。大多数食物检验只能给出"有"或"没有"。',
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
            en: 'A plant cell has three things an animal cell lacks: cellulose cell wall, chloroplasts, large permanent vacuole. A bacterium lacks a nucleus and every membrane-bound organelle, and has circular DNA and often plasmids.',
            zh: '植物细胞比动物细胞多三样：纤维素细胞壁、叶绿体、大型永久液泡。细菌则没有细胞核和任何膜包被的细胞器，具有环状 DNA，并常带质粒。',
          },
        },
        {
          id: 'sum-2',
          text: {
            en: 'Magnification is image over actual, it has no units, and you must convert millimetres to micrometres before dividing. For food tests, always give both colours.',
            zh: '放大倍数 = 图像大小 ÷ 实际大小，没有单位；做除法之前必须先把毫米换算成微米。食物检验则永远要写出前后两种颜色。',
          },
        },
      ],
    },
  ],
}

export default cellsNarration
