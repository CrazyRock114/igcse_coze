import type { NarrationScript } from '@/content/types'

export const inheritanceNarration: NarrationScript = {
  id: '17-1-inheritance',
  sections: [
    {
      id: 'intro',
      type: 'intro',
      title: { en: 'Four words, in the right order', zh: '四个词，按正确的顺序' },
      lines: [
        {
          id: 'intro-1',
          text: {
            en: 'Chromosomes are made of DNA. A gene is a length of that DNA which codes for one protein. An allele is one of the alternative versions a gene can come in — brown eyes or blue, red flowers or white. Chromosome, DNA, gene, allele: each one is part of the one before it.',
            zh: '染色体由 DNA 构成。基因是这段 DNA 中编码一种蛋白质的一部分。等位基因则是同一个基因可能存在的不同版本——棕眼或蓝眼、红花或白花。染色体、DNA、基因、等位基因：每一个都是前一个的组成部分。',
          },
        },
        {
          id: 'intro-2',
          text: {
            en: 'A human body cell has forty-six chromosomes, in twenty-three pairs. Two sets, one from each parent, which is what diploid means. A gamete — a sperm or an egg — has one set of twenty-three, and that is haploid.',
            zh: '人的体细胞有 46 条染色体，组成 23 对。两套，每个亲本各一套，这就是二倍体的含义。配子——精子或卵子——只有一套 23 条，这就是单倍体。',
          },
        },
        {
          id: 'intro-3',
          text: {
            en: 'Because the chromosomes come in pairs, the genes do too. You have two copies of every gene, one on each chromosome of the pair — and the two copies need not be the same allele. That single fact is where the whole of this topic comes from.',
            zh: '因为染色体成对存在，基因也成对存在。你的每个基因都有两个拷贝，分别位于这对染色体的各一条上——而这两个拷贝未必是同一个等位基因。整个这一章的内容，都源自这一个事实。',
          },
        },
      ],
    },
    {
      id: 'protein',
      type: 'concept',
      title: { en: 'What a gene actually does', zh: '基因究竟做什么' },
      lines: [
        {
          id: 'pro-1',
          text: {
            en: 'A gene does not code for a feature. It codes for a protein, and the feature is a consequence. The sequence of bases in the gene determines the sequence of amino acids in the protein, and the sequence of amino acids determines the shape the protein folds into.',
            zh: '基因并不编码某个特征。它编码一种蛋白质，特征只是随之而来的结果。基因中的碱基序列决定蛋白质中氨基酸的排列顺序，而氨基酸的顺序又决定蛋白质折叠成的形状。',
          },
        },
        {
          id: 'pro-2',
          text: {
            en: 'Shape is everything, because a protein works by fitting something. You have met that twice already — an enzyme with an active site the substrate fits into, and a receptor on a neurone that a neurotransmitter fits into. Change one amino acid and the shape changes and the fit fails.',
            zh: '形状就是一切，因为蛋白质靠"契合"来工作。你已经见过两次了——酶有底物能嵌入的活性位点，神经元上有神经递质能结合的受体。改变一个氨基酸，形状就变了，契合也就失效了。',
          },
        },
        {
          id: 'pro-3',
          text: {
            en: 'The making happens in two places. DNA cannot leave the nucleus, so a copy of the gene is made as messenger RNA, which passes out through a pore into the cytoplasm. There it goes to a ribosome, and the ribosome assembles amino acids in the order the mRNA specifies.',
            zh: '合成发生在两个地方。DNA 不能离开细胞核，因此基因被转录成信使 RNA，经核孔进入细胞质。它到达核糖体，核糖体按 mRNA 指定的顺序把氨基酸连接起来。',
          },
        },
        {
          id: 'pro-4',
          text: {
            en: 'And here is the thing worth pausing on. Almost every cell in your body contains every one of your genes. A liver cell has the gene for the protein in a rod cell of your retina, and never uses it. Cells differ because different genes are switched on in them, not because they were given different instructions.',
            zh: '这里有一点值得停下来想想：你体内几乎每个细胞都含有你的全部基因。肝细胞里也有编码视网膜视杆细胞中那种蛋白质的基因，只是从不使用它。细胞之所以不同，是因为其中开启的基因不同，而不是因为它们拿到了不同的指令。',
          },
        },
      ],
    },
    {
      id: 'division',
      type: 'concept',
      title: { en: 'Two ways for a nucleus to divide', zh: '细胞核分裂的两种方式' },
      lines: [
        {
          id: 'div-1',
          text: {
            en: 'Mitosis produces two cells genetically identical to the parent cell and to each other. Before it happens, every chromosome is copied exactly; then the copies separate, one to each new cell. The chromosome number is unchanged — forty-six in, forty-six in each cell out.',
            zh: '有丝分裂产生两个与亲代细胞、彼此之间在遗传上完全相同的细胞。分裂前每条染色体都被精确复制；随后复制体分离，各进入一个新细胞。染色体数目不变——进去 46 条，出来的每个细胞仍是 46 条。',
          },
        },
        {
          id: 'div-2',
          text: {
            en: 'That is what growth needs, and repair, and asexual reproduction. It is also what a stem cell does — an unspecialised cell that divides and whose daughters can become specialised into whatever the body needs.',
            zh: '生长需要的正是这个，修复和无性生殖也是。干细胞做的也是这件事——未分化的细胞进行分裂，其子细胞可以特化成身体所需要的任何类型。',
          },
        },
        {
          id: 'div-3',
          text: {
            en: 'Meiosis is the other one, and it makes gametes. It is a reduction division: the chromosome number is halved, forty-six to twenty-three. Which has to happen, because at fertilisation two gametes fuse — and if each carried forty-six, every generation would double.',
            zh: '减数分裂是另一种，它产生配子。这是一种"减数"的分裂：染色体数目减半，从 46 条变为 23 条。这是必须的，因为受精时两个配子融合——如果每个都带 46 条，每一代都会翻倍。',
          },
        },
      ],
    },
    {
      id: 'monohybrid',
      type: 'interaction',
      title: { en: 'Working it out on a grid', zh: '在方格上算出来' },
      lines: [
        {
          id: 'mono-1',
          text: {
            en: 'Six words first, and they are worth being exact about. Genotype is the alleles an organism carries. Phenotype is what you can actually see. Homozygous means the two alleles are the same; heterozygous means they differ. A dominant allele is expressed whenever it is there; a recessive one only when there is no dominant allele to hide it.',
            zh: '先说六个词，值得逐字弄准。基因型是生物所携带的等位基因。表现型是你真正看得见的特征。纯合指两个等位基因相同，杂合指两者不同。显性等位基因只要存在就表达；隐性等位基因只有在没有显性等位基因掩盖它时才表达。',
          },
          action: { type: 'setParams', params: { cross: 1, father: 1, mother: 1 } },
        },
        {
          id: 'mono-2',
          text: {
            en: 'A Punnett square works all of it out mechanically. Along the top, the two alleles the father can put into a gamete. Down the side, the mother’s. Each cell is one possible offspring — and because every combination is equally likely, counting the cells gives you the ratio.',
            zh: '棋盘格法可以把这一切机械地算出来。顶端是父本可能放入配子的两个等位基因，侧边是母本的。每一格是一种可能的子代——由于每种组合的概率相等，数格子就得到比例。',
          },
        },
        {
          id: 'mono-3',
          text: {
            en: 'Two heterozygous parents give three red to one white. Three of the four squares contain at least one R, and one R is enough. That three to one is the most recognisable number in genetics, and it is worth knowing that it comes from counting squares rather than from memory.',
            zh: '两个杂合亲本得到三红一白。四格中有三格至少含一个 R，而一个 R 就够了。这个 3∶1 是遗传学中最容易辨认的数字，值得记住的是：它来自数格子，而不是来自背诵。',
          },
        },
        {
          id: 'mono-4',
          text: {
            en: 'Now look at the two readings underneath. Three quarters of the offspring show red. But only half of them carry the white allele — and there is nothing about a red flower that tells you which half it is in. Genotype and phenotype are not the same thing, and this is where you can see the gap.',
            zh: '现在看下面的两个读数。四分之三的子代开红花，但其中只有一半携带白花的等位基因——而红花本身丝毫看不出它属于哪一半。基因型与表现型不是一回事，在这里你能看见它们之间的落差。',
          },
        },
        {
          id: 'mono-5',
          text: {
            en: 'Which raises a real problem. You have a red plant and you need to know its genotype. Cross it with a white one — a homozygous recessive, so it can only contribute r. If your plant is homozygous, every offspring is red. If it is heterozygous, half come out white. Try both.',
            zh: '这引出一个实际问题：你有一株红花植株，需要知道它的基因型。把它与白花植株杂交——白花是纯合隐性的，只能提供 r。如果你的植株是纯合的，子代全为红花；如果是杂合的，就有一半是白花。两种都试试看。',
          },
          action: { type: 'setParams', params: { cross: 1, father: 0, mother: 2 } },
          pause: 1,
        },
        {
          id: 'mono-6',
          text: {
            en: 'That is a test cross, and it is the only way to tell. The recessive parent contributes nothing that could hide anything, so whatever the unknown parent is carrying has to show up.',
            zh: '这就是测交，也是唯一能分辨的办法。隐性亲本不会提供任何能掩盖别的东西的等位基因，因此未知亲本携带的一切都必然显现出来。',
          },
          action: { type: 'setParams', params: { cross: 1, father: 1, mother: 2 } },
        },
      ],
    },
    {
      id: 'codominance',
      type: 'interaction',
      title: { en: 'When neither allele backs down', zh: '当两个等位基因谁也不让' },
      lines: [
        {
          id: 'cod-1',
          text: {
            en: 'Dominant and recessive is not the only arrangement. In codominance both alleles contribute to the phenotype, so the heterozygote is not like either parent — it has a phenotype of its own.',
            zh: '显性与隐性并不是唯一的情形。在共显性中，两个等位基因都对表现型有贡献，因此杂合体既不像这个亲本也不像那个——它有自己独特的表现型。',
          },
          action: { type: 'setParams', params: { cross: 2, father: 1, mother: 1 } },
        },
        {
          id: 'cod-2',
          text: {
            en: 'Sickle cell is the standard example. Two normal alleles: ordinary red blood cells. Two sickle alleles: sickle cell anaemia, in which the cells collapse into a curved shape and block capillaries. One of each: sickle cell trait, where some cells sickle and most do not — a third phenotype, not a blend and not a hiding.',
            zh: '镰状细胞是标准例子。两个正常等位基因：普通的红细胞。两个镰状等位基因：镰状细胞贫血，红细胞塌陷成弯钩状并堵塞毛细血管。各一个：镰状细胞性状，部分细胞镰变而多数不会——这是第三种表现型，既不是混合，也不是掩盖。',
          },
        },
        {
          id: 'cod-3',
          text: {
            en: 'So the grid gives three outcomes, in one to two to one. Not three to one. Count them: one square unaffected, two with the trait, one with the anaemia. The genotype ratio was always one to two to one; with a dominant allele two of those squares look the same, and here they do not.',
            zh: '于是方格给出三种结果，比例为 1∶2∶1，而不是 3∶1。数一数：一格未受影响、两格有性状、一格患贫血。基因型比例本来就一直是 1∶2∶1；在显性的情形下其中两格看起来一样，而在这里不一样。',
          },
        },
        {
          id: 'cod-4',
          text: {
            en: 'Human blood groups work the same way with one extra twist: there are three alleles in the population, not two. A and B are codominant with each other, and both are dominant over O. So group AB is a codominant heterozygote, while group A can be AA or AO — and once again you cannot tell which from the blood group alone.',
            zh: '人类血型的机制相同，只多了一个转折：群体中有三个等位基因，而不是两个。A 与 B 相互共显性，两者都对 O 显性。因此 AB 型是共显性杂合体，而 A 型可能是 AA 或 AO——同样地，仅凭血型无法分辨是哪一种。',
          },
        },
      ],
    },
    {
      id: 'sexlinked',
      type: 'interaction',
      title: { en: 'The chromosome that is missing a piece', zh: '缺了一块的那条染色体' },
      lines: [
        {
          id: 'sex-1',
          text: {
            en: 'Twenty-two of your twenty-three pairs are matched. The last pair is the sex chromosomes: two X chromosomes make a female, an X and a Y make a male. A mother can only put an X into an egg. A father puts in an X or a Y — so the sex of a child is decided entirely by the father, with an equal chance either way.',
            zh: '你的 23 对染色体中有 22 对是配对相同的。最后一对是性染色体：两条 X 为女性，一条 X 和一条 Y 为男性。母亲只能把 X 放进卵子。父亲放进的是 X 或 Y——因此孩子的性别完全由父亲决定，两种可能性相等。',
          },
          action: { type: 'setParams', params: { cross: 3, father: 0, mother: 0 } },
        },
        {
          id: 'sex-2',
          text: {
            en: 'But the Y chromosome is much smaller than the X, and it does not carry most of the genes the X does. A sex-linked characteristic is one carried on a sex chromosome — in practice, almost always on the X.',
            zh: '但 Y 染色体比 X 小得多，X 上的大多数基因它并不携带。伴性性状是指由性染色体携带的性状——实际上几乎总是在 X 上。',
          },
        },
        {
          id: 'sex-3',
          text: {
            en: 'Red–green colour blindness is one. A female has two X chromosomes, so a normal allele on one can mask a faulty allele on the other, and she is a carrier. A male has one X and a Y, and the Y has no matching allele to mask anything with. One faulty allele and he is colour blind.',
            zh: '红绿色盲就是其中之一。女性有两条 X，其中一条上的正常等位基因可以掩盖另一条上的缺陷等位基因，她就成为携带者。男性有一条 X 和一条 Y，而 Y 上没有可用来掩盖的对应等位基因。只要有一个缺陷等位基因，他就是色盲。',
          },
          action: { type: 'setParams', params: { cross: 3, father: 0, mother: 1 } },
        },
        {
          id: 'sex-4',
          text: {
            en: 'A carrier mother and a father with normal vision. Look at the four squares: both daughters can see normally, though one of them is a carrier. One son is normal and the other is colour blind. Half the sons, none of the daughters — and the allele came from a mother who has no sign of it herself.',
            zh: '携带者母亲与色觉正常的父亲。看这四格：两个女儿都色觉正常，但其中一个是携带者；一个儿子正常，另一个色盲。儿子中有一半，女儿中一个也没有——而这个等位基因来自本人毫无表现的母亲。',
          },
        },
        {
          id: 'sex-5',
          text: {
            en: 'Now try to make the father a carrier — turn his control up to two copies. It refuses, and tells you why: he has one X. There is no second one for a second copy to sit on. A man is never a carrier of a sex-linked condition; he either has it or he does not.',
            zh: '现在试着让父亲成为携带者——把他的控制调到两个拷贝。系统拒绝了，并告诉你原因：他只有一条 X，没有第二条来放第二个拷贝。男性从不会是伴性遗传病的携带者；他要么患病，要么不患。',
          },
          action: { type: 'setParams', params: { cross: 3, father: 2, mother: 1 } },
          pause: 1,
        },
        {
          id: 'sex-6',
          text: {
            en: 'And a colour-blind daughter? Set the father to colour blind and keep the mother as a carrier. There she is — rare, but possible, and it takes an affected father and at least a carrier mother. Students often say it cannot happen at all. The grid says otherwise.',
            zh: '那么色盲的女儿呢？把父亲设为色盲，母亲保持为携带者。她出现了——罕见，但可能，条件是父亲患病且母亲至少是携带者。学生常说这根本不可能，而方格给出了相反的答案。',
          },
          action: { type: 'setParams', params: { cross: 3, father: 1, mother: 1 } },
        },
      ],
    },
    {
      id: 'pedigree',
      type: 'concept',
      title: { en: 'Reading a family tree', zh: '读懂一张系谱图' },
      lines: [
        {
          id: 'ped-1',
          text: {
            en: 'A pedigree diagram is the same information for a real family. Squares are males, circles are females, a horizontal line joins parents and a vertical one drops to their children. Shaded means affected.',
            zh: '系谱图是同样的信息，只不过针对真实的家庭。方形代表男性，圆形代表女性，横线连接双亲，竖线向下连到子女。涂黑表示患病。',
          },
        },
        {
          id: 'ped-2',
          text: {
            en: 'Two questions unlock nearly all of them. First: do two unaffected parents ever have an affected child? If so the allele must be recessive, because it was in both of them and hidden in both.',
            zh: '两个问题几乎能解开所有系谱题。第一：有没有两个未患病的双亲生出患病的孩子？如果有，那么这个等位基因一定是隐性的，因为它存在于双亲体内却都被掩盖了。',
          },
        },
        {
          id: 'ped-3',
          text: {
            en: 'Second: is it mostly males? A recessive condition on the X chromosome shows up far more often in males, for the reason you just saw — they have no second X to mask it. A lot of affected sons and almost no affected daughters is the signature of sex linkage.',
            zh: '第二：患者是不是以男性居多？X 染色体上的隐性病症在男性中出现得频繁得多，原因你刚才已经看到了——他们没有第二条 X 来掩盖它。患病的儿子很多而几乎没有患病的女儿，正是伴性遗传的特征。',
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
            en: 'Always draw the square. Write the parents’ genotypes, circle the gametes, fill the four cells, then read the phenotypes off. Marks are given for the working, and a bare ratio with no diagram throws most of them away.',
            zh: '一定要把方格画出来。写出双亲的基因型，圈出配子，填满四格，然后读出表现型。分数是给推导过程的；只写一个比例而没有图，会白白丢掉大部分分数。',
          },
        },
        {
          id: 'sum-2',
          text: {
            en: 'Two heterozygotes give 3 : 1 with a dominant allele and 1 : 2 : 1 with codominance — the genotypes are the same both times, and only the phenotypes differ. A test cross against the homozygous recessive is how an unknown genotype is found.',
            zh: '两个杂合体在显性时给出 3∶1，在共显性时给出 1∶2∶1——两种情况下基因型完全相同，不同的只是表现型。与纯合隐性个体测交，是确定未知基因型的方法。',
          },
        },
        {
          id: 'sum-3',
          text: {
            en: 'And say "chance", not "will". A 3 : 1 ratio is a probability for each offspring, not a promise about four of them. Four children of two carriers can perfectly well all be affected — the ratio describes the odds, not the outcome.',
            zh: '还要说"概率"，而不是"一定"。3∶1 是对每个后代而言的概率，而不是对四个后代的承诺。两个携带者的四个孩子完全可能全部患病——比例描述的是可能性，不是结果。',
          },
        },
      ],
    },
  ],
}

export default inheritanceNarration
