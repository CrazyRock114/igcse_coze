import type { Lesson } from '@/content/types'
import narration from './narration'

const lesson: Lesson = {
  slug: '17-1-inheritance',
  subject: '0610',
  syllabus: [
    '0610.17.1.1',
    '0610.17.1.2',
    '0610.17.1.3',
    '0610.17.1.4',
    '0610.17.1.5',
    '0610.17.1.6',
    '0610.17.1.7',
    '0610.17.1.8',
    '0610.17.1.9',
    '0610.17.1.10',
    '0610.17.1.11',
    '0610.17.1.12',
    '0610.17.2.1',
    '0610.17.2.2',
    '0610.17.2.3',
    '0610.17.2.4',
    '0610.17.2.5',
    '0610.17.3.1',
    '0610.17.3.2',
    '0610.17.4.1',
    '0610.17.4.2',
    '0610.17.4.3',
    '0610.17.4.4',
    '0610.17.4.5',
    '0610.17.4.6',
    '0610.17.4.7',
    '0610.17.4.8',
    '0610.17.4.9',
    '0610.17.4.10',
    '0610.17.4.11',
    '0610.17.4.12',
    '0610.17.4.13',
    '0610.17.4.14',
    '0610.17.4.15',
    '0610.17.4.16',
    '0610.17.4.17',
    '0610.17.4.18',
  ],
  tier: 'extended',
  estimatedMinutes: 70,

  title: { en: 'Inheritance', zh: '遗传' },
  summary: {
    en: 'Three quarters of the offspring are red, but only half of them carry the white allele — and nothing about a red flower tells you which half it is in. That gap is the whole subject.',
    zh: '四分之三的子代开红花，但其中只有一半携带白花等位基因——而红花本身丝毫看不出它属于哪一半。这道落差，就是这一章的全部内容。',
  },

  objectives: [
    {
      en: 'State that chromosomes are made of DNA, and define a gene and an allele.',
      zh: '说明染色体由 DNA 构成，并给基因和等位基因下定义。',
    },
    {
      en: 'Describe the inheritance of sex in humans using the X and Y chromosomes.',
      zh: '用 X 和 Y 染色体描述人类性别的遗传。',
    },
    {
      en: 'Explain how a protein is made and how DNA controls cell function. (Extended)',
      zh: '解释蛋白质的合成过程，以及 DNA 如何控制细胞功能。（Extended）',
    },
    {
      en: 'Describe haploid and diploid nuclei, and the roles of mitosis and meiosis. (Extended)',
      zh: '描述单倍体核与二倍体核，以及有丝分裂与减数分裂的作用。（Extended）',
    },
    {
      en: 'Use genotype, phenotype, homozygous, heterozygous, dominant and recessive correctly.',
      zh: '正确使用基因型、表现型、纯合、杂合、显性与隐性等术语。',
    },
    {
      en: 'Use Punnett squares to predict the results of monohybrid crosses and calculate ratios.',
      zh: '用棋盘格法预测单基因杂交的结果并计算比例。',
    },
    { en: 'Interpret pedigree diagrams.', zh: '解读系谱图。' },
    {
      en: 'Explain how a test cross identifies an unknown genotype. (Extended)',
      zh: '解释测交如何确定未知基因型。（Extended）',
    },
    {
      en: 'Explain codominance, the inheritance of ABO blood groups, and sex linkage. (Extended)',
      zh: '解释共显性、ABO 血型的遗传以及伴性遗传。（Extended）',
    },
  ],

  glossary: [
    {
      en: 'gene',
      zh: '基因',
      definition: {
        en: 'A length of DNA that codes for one protein. Not for a feature — the feature is a consequence of the protein.',
        zh: '编码一种蛋白质的一段 DNA。它不编码某个特征——特征是蛋白质带来的结果。',
      },
      syllabus: ['0610.17.1.2'],
    },
    {
      en: 'allele',
      zh: '等位基因',
      definition: {
        en: 'One of the alternative versions of a gene. You carry two copies of every gene, and they need not be the same allele.',
        zh: '一个基因的不同版本之一。你的每个基因都有两个拷贝，而它们未必是同一个等位基因。',
      },
      syllabus: ['0610.17.1.3'],
    },
    {
      en: 'genotype',
      zh: '基因型',
      definition: {
        en: 'The alleles an organism carries. Not always visible: RR and Rr look identical.',
        zh: '生物所携带的等位基因。它未必看得见：RR 与 Rr 外表完全相同。',
      },
      syllabus: ['0610.17.4.2'],
    },
    {
      en: 'phenotype',
      zh: '表现型',
      definition: {
        en: 'The observable features of an organism — what the genotype produces.',
        zh: '生物可观察到的特征——即基因型所产生的结果。',
      },
      syllabus: ['0610.17.4.3'],
    },
    {
      en: 'test cross',
      zh: '测交',
      definition: {
        en: 'A cross with a homozygous recessive individual, used to find out whether an organism showing the dominant phenotype is homozygous or heterozygous.',
        zh: '与纯合隐性个体杂交，用来判断表现显性性状的个体是纯合还是杂合。',
      },
      syllabus: ['0610.17.4.13'],
    },
    {
      en: 'codominance',
      zh: '共显性',
      definition: {
        en: 'Where both alleles contribute to the phenotype, so the heterozygote has a phenotype of its own rather than resembling one parent.',
        zh: '两个等位基因都对表现型有贡献，因此杂合体具有自己独特的表现型，而不是像某一亲本。',
      },
      syllabus: ['0610.17.4.14'],
    },
    {
      en: 'sex-linked characteristic',
      zh: '伴性性状',
      definition: {
        en: 'One carried on a sex chromosome, in practice almost always the X. Males show recessive sex-linked conditions far more often, having no second X to mask them.',
        zh: '由性染色体携带的性状，实际上几乎总在 X 上。男性表现出隐性伴性病症的频率高得多，因为他们没有第二条 X 来掩盖它。',
      },
      syllabus: ['0610.17.4.16'],
    },
    {
      en: 'haploid',
      zh: '单倍体',
      definition: {
        en: 'Having one set of chromosomes. Gametes are haploid — 23 in a human — so that fertilisation restores the diploid 46.',
        zh: '只含一套染色体。配子是单倍体——人类为 23 条——使受精后恢复到二倍体的 46 条。',
      },
      syllabus: ['0610.17.1.10'],
    },
  ],

  equations: [],

  sim: {
    primitive: 'punnett',
    kernel: '17-1-inheritance',
    hint: {
      en: 'Set both parents to one copy and read the ratio. Then switch the cross and see the same four squares mean something different.',
      zh: '把双亲都设为一个拷贝，读出比例。然后切换杂交类型，看同样的四个格子如何有了不同的含义。',
    },
    params: [
      {
        key: 'cross',
        label: { en: 'Cross', zh: '杂交类型' },
        unit: '',
        min: 1,
        max: 3,
        step: 1,
        default: 1,
        options: [
          { value: 1, label: { en: 'Flower colour', zh: '花色' } },
          { value: 2, label: { en: 'Sickle cell', zh: '镰状细胞' } },
          { value: 3, label: { en: 'Colour blindness', zh: '色盲' } },
        ],
      },
      {
        key: 'father',
        label: { en: 'Father: copies of the allele', zh: '父本：该等位基因的拷贝数' },
        unit: '',
        min: 0,
        max: 2,
        step: 1,
        default: 1,
        options: [
          { value: 0, label: { en: 'None', zh: '没有' } },
          { value: 1, label: { en: 'One', zh: '一个' } },
          { value: 2, label: { en: 'Two', zh: '两个' } },
        ],
      },
      {
        key: 'mother',
        label: { en: 'Mother: copies of the allele', zh: '母本：该等位基因的拷贝数' },
        unit: '',
        min: 0,
        max: 2,
        step: 1,
        default: 1,
        options: [
          { value: 0, label: { en: 'None', zh: '没有' } },
          { value: 1, label: { en: 'One', zh: '一个' } },
          { value: 2, label: { en: 'Two', zh: '两个' } },
        ],
      },
    ],
    readouts: [
      {
        key: 'affected',
        label: { en: 'Chance of showing the trait', zh: '表现该性状的概率' },
        unit: '%',
        sigFigs: 3,
        exact: true,
      },
      {
        key: 'carrier',
        label: { en: 'Chance of carrying one copy', zh: '携带一个拷贝的概率' },
        unit: '%',
        sigFigs: 3,
        exact: true,
      },
      {
        key: 'unaffected',
        label: { en: 'Chance of not showing it', zh: '不表现该性状的概率' },
        unit: '%',
        sigFigs: 3,
        exact: true,
      },
      {
        key: 'outcomes',
        label: { en: 'Different phenotypes', zh: '不同表现型的数目' },
        unit: '',
        sigFigs: 1,
        exact: true,
      },
    ],
    presets: [
      {
        label: { en: 'Two heterozygotes: 3 : 1', zh: '两个杂合体：3∶1' },
        params: { cross: 1, father: 1, mother: 1 },
      },
      {
        label: { en: 'Test cross', zh: '测交' },
        params: { cross: 1, father: 1, mother: 2 },
      },
      {
        label: { en: 'Breeding true', zh: '稳定遗传' },
        params: { cross: 1, father: 0, mother: 0 },
      },
      {
        label: { en: 'Codominance: 1 : 2 : 1', zh: '共显性：1∶2∶1' },
        params: { cross: 2, father: 1, mother: 1 },
      },
      {
        label: { en: 'Sex determination', zh: '性别决定' },
        params: { cross: 3, father: 0, mother: 0 },
      },
      {
        label: { en: 'A carrier mother', zh: '携带者母亲' },
        params: { cross: 3, father: 0, mother: 1 },
      },
      {
        label: { en: 'A colour-blind daughter', zh: '色盲的女儿' },
        params: { cross: 3, father: 1, mother: 1 },
      },
    ],
  },

  narration,

  checkpoints: [
    {
      id: '0610-17-1-cp1',
      syllabus: ['0610.17.4.11', '0610.17.4.12'],
      tier: 'core',
      commandWord: 'Predict',
      marks: 4,
      stem: 'In pea plants, tall (T) is dominant to short (t). Two heterozygous tall plants are crossed. Draw a genetic diagram to predict the offspring, and state the expected phenotype ratio.',
      markScheme: [
        { text: 'Parental genotypes Tt × Tt, with gametes T and t from each', marks: 1 },
        { text: 'A completed Punnett square giving TT, Tt, Tt, tt', marks: 1 },
        { text: 'Phenotypes: three tall, one short', marks: 1 },
        { text: 'Ratio 3 : 1 tall to short', marks: 1 },
      ],
      examinerNote: {
        en: 'Marks are for the working. A bare "3 : 1" with no diagram throws away three of the four, however right it is.',
        zh: '分数是给推导过程的。只写一个"3∶1"而没有图，无论多正确都会丢掉四分中的三分。',
      },
    },
    {
      id: '0610-17-1-cp2',
      syllabus: ['0610.17.4.13'],
      tier: 'extended',
      commandWord: 'Describe',
      marks: 3,
      stem: 'A plant with red flowers may be homozygous or heterozygous. Describe how a test cross could be used to find out which, and state how the results would be interpreted.',
      markScheme: [
        { text: 'Cross it with a homozygous recessive plant — one with white flowers', marks: 1 },
        { text: 'If all the offspring have red flowers, the unknown plant is homozygous', marks: 1 },
        {
          text: 'If about half the offspring have white flowers, the unknown plant is heterozygous',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'It must be the homozygous recessive. Crossing with another red plant tells you nothing, because a dominant allele from either parent would hide the result.',
        zh: '必须与纯合隐性个体杂交。与另一株红花杂交毫无用处，因为任一亲本提供的显性等位基因都会掩盖结果。',
      },
    },
    {
      id: '0610-17-1-cp3',
      syllabus: ['0610.17.4.14', '0610.17.4.18'],
      tier: 'extended',
      commandWord: 'Explain',
      marks: 4,
      stem: 'Two people who each have sickle cell trait have a child. Explain the possible genotypes and phenotypes of the child, and give the probability of each.',
      markScheme: [
        { text: 'Both parents are heterozygous, and each can pass on either allele', marks: 1 },
        {
          text: 'The child may be homozygous normal (1 in 4), heterozygous (2 in 4) or homozygous sickle (1 in 4)',
          marks: 1,
        },
        {
          text: 'Because the alleles are codominant, the heterozygote has its own phenotype — sickle cell trait — rather than appearing normal',
          marks: 1,
        },
        {
          text: 'So the phenotype ratio is 1 : 2 : 1 unaffected to trait to sickle cell anaemia',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'The genotypes are the same 1 : 2 : 1 as any heterozygous cross. What codominance changes is that all three are visibly different, so the phenotype ratio is 1 : 2 : 1 and not 3 : 1.',
        zh: '基因型与任何杂合杂交一样都是 1∶2∶1。共显性改变的是这三者在外观上都不同，因此表现型比是 1∶2∶1 而不是 3∶1。',
      },
    },
    {
      id: '0610-17-1-cp4',
      syllabus: ['0610.17.4.16', '0610.17.4.17'],
      tier: 'extended',
      commandWord: 'Explain',
      marks: 3,
      stem: 'Red–green colour blindness is caused by a recessive allele carried on the X chromosome. Explain why the condition is much more common in males than in females.',
      markScheme: [
        {
          text: 'A male has only one X chromosome, so he has only one copy of the gene',
          marks: 1,
        },
        {
          text: 'The Y chromosome does not carry a matching allele, so a single recessive allele is expressed',
          marks: 1,
        },
        {
          text: 'A female has two X chromosomes, so a dominant allele on one masks a recessive allele on the other; she must inherit two recessive alleles to be affected',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'The Y is the key and is the part most often left out. "Males only have one X" is half of it — the mark is for saying the Y has no allele to mask it with.',
        zh: 'Y 染色体是关键，也是最常被漏掉的部分。"男性只有一条 X"只答了一半——得分点在于指出 Y 上没有可用来掩盖它的等位基因。',
      },
    },
    {
      id: '0610-17-1-cp5',
      syllabus: ['0610.17.1.4'],
      tier: 'core',
      commandWord: 'Explain',
      marks: 3,
      stem: 'Explain why approximately half of all babies born are male and half are female.',
      markScheme: [
        { text: 'A mother has two X chromosomes, so every egg carries an X', marks: 1 },
        {
          text: 'A father has an X and a Y, so half of his sperm carry X and half carry Y',
          marks: 1,
        },
        {
          text: 'Each type of sperm is equally likely to fertilise the egg, giving an equal chance of XX and XY',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'The sex of a child is decided by the father, because the mother has nothing but X to give. That is the point of the question.',
        zh: '孩子的性别由父亲决定，因为母亲只能提供 X。这正是本题的用意。',
      },
    },
    {
      id: '0610-17-1-cp6',
      syllabus: ['0610.17.1.5', '0610.17.1.6', '0610.17.1.8'],
      tier: 'extended',
      commandWord: 'Describe',
      marks: 4,
      stem: 'Describe how the base sequence of a gene determines the structure and function of a protein.',
      markScheme: [
        {
          text: 'The sequence of bases in the gene determines the sequence of amino acids in the protein',
          marks: 1,
        },
        {
          text: 'A copy of the gene is made as mRNA, which passes out of the nucleus to a ribosome',
          marks: 1,
        },
        {
          text: 'The ribosome assembles the amino acids in the order the mRNA specifies',
          marks: 1,
        },
        {
          text: 'The sequence of amino acids determines the shape the protein folds into, and its shape determines what it can do',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Finish on shape. A protein works by fitting something — an active site, a receptor — so a change in shape is a change in function, and that is the last link in the chain.',
        zh: '要落在"形状"上收尾。蛋白质靠契合来工作——活性位点、受体——因此形状的改变就是功能的改变，这是链条的最后一环。',
      },
    },
    {
      id: '0610-17-1-cp7',
      syllabus: ['0610.17.2.1', '0610.17.3.2'],
      tier: 'extended',
      commandWord: 'Compare',
      marks: 3,
      stem: 'Compare mitosis and meiosis in terms of the number and genetic make-up of the cells produced.',
      markScheme: [
        {
          text: 'Mitosis produces two cells; meiosis produces four',
          marks: 1,
        },
        {
          text: 'Mitosis keeps the chromosome number the same (diploid); meiosis halves it (haploid)',
          marks: 1,
        },
        {
          text: 'Mitosis gives cells genetically identical to the parent cell; meiosis gives cells that are genetically different',
          marks: 1,
        },
      ],
      examinerNote: {
        en: '"Compare" needs both sides in each point. Three facts about mitosis with nothing about meiosis scores nothing.',
        zh: '"Compare"要求每一点都写出两边。只写三条关于有丝分裂的事实而不提减数分裂，一分不得。',
      },
    },
    {
      id: '0610-17-1-cp8',
      syllabus: ['0610.17.4.10'],
      tier: 'core',
      commandWord: 'Deduce',
      marks: 2,
      stem: 'In a pedigree diagram, two unaffected parents have a daughter who is affected by a genetic condition. Deduce whether the allele causing the condition is dominant or recessive, and give a reason.',
      markScheme: [
        { text: 'The allele is recessive', marks: 1 },
        {
          text: 'Because both parents must carry it without showing it, which is only possible if it is masked by a dominant allele',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'This one comparison settles it. Two unaffected parents with an affected child means recessive, every time — and if the affected child is a daughter, it is probably not sex-linked either.',
        zh: '这一个对比就能定论。两个未患病的双亲生出患病的孩子，永远意味着隐性——而如果患病的是女儿，那多半也不是伴性遗传。',
      },
    },
  ],

  // Visual / interactive learning modules for Chapter 6 (17.1 —
  // inheritance). The G8 PDF available in this project covers only
  // B5–B11, so the diagrams here are hand-built SVG that mirrors
  // the G8 style. Each module is data-driven: the lesson.ts file
  // passes the labels and the rows, so the React code stays generic.
  extras: [
    // 1) The central dogma in two stages. The student switches
    //    between transcription (DNA → mRNA) and translation
    //    (mRNA → protein) and clicks any labelled point to read
    //    what is happening there.
    {
      type: 'dna-to-protein',
      id: 'dna-to-protein',
      title: { en: 'How a gene becomes a protein', zh: '基因如何变成蛋白质' },
      hint: {
        en: 'Two stages. Switch tabs to see what happens inside the nucleus (transcription) and what happens outside it (translation).',
        zh: '两个阶段。切换 tab 看核内（转录）和核外（翻译）分别发生了什么。',
      },
      initialStage: 'transcription',
      transcription: {
        title: { en: 'Transcription — DNA is copied to mRNA', zh: '转录——DNA 被复制成 mRNA' },
        intro: {
          en: 'Inside the nucleus, the DNA double helix unwinds. RNA uses one strand as a template to assemble a complementary mRNA strand. The mRNA then leaves the nucleus through a nuclear pore.',
          zh: '在细胞核内，DNA 双螺旋解开。RNA 以其中一条链为模板，合成与之互补的 mRNA。mRNA 随后通过核孔离开细胞核。',
        },
        parts: [
          {
            id: 'dna-gene',
            name: { en: 'The gene (DNA)', zh: '基因（DNA）' },
            description: {
              en: 'A length of DNA that codes for one protein. The two strands unwind at the start of transcription — only one strand is used as the template.',
              zh: '一段 DNA，编码一种蛋白质。转录起始时两条链解开——只有其中一条作为模板。',
            },
          },
          {
            id: 'mrna',
            name: { en: 'mRNA (the copy)', zh: 'mRNA（拷贝）' },
            description: {
              en: 'A short-lived single-stranded copy of the gene. Made of RNA, not DNA, so it can leave the nucleus. Each set of three bases (a codon) codes for one amino acid.',
              zh: '寿命较短的单链基因拷贝。由 RNA 而非 DNA 构成，所以它能离开细胞核。每三个碱基（一个密码子）编码一个氨基酸。',
            },
          },
        ],
      },
      translation: {
        title: { en: 'Translation — mRNA is read at the ribosome', zh: '翻译——mRNA 在核糖体上被读取' },
        intro: {
          en: 'In the cytoplasm, a ribosome assembles on the mRNA. Each tRNA brings the amino acid that matches the next codon. The amino acids are linked into a chain, which then folds into a protein.',
          zh: '在细胞质中，核糖体在 mRNA 上组装。每个 tRNA 带来与下一个密码子匹配的氨基酸。氨基酸被连接成链，随后折叠成蛋白质。',
        },
        parts: [
          {
            id: 'mrna-cyto',
            name: { en: 'mRNA in the cytoplasm', zh: '细胞质中的 mRNA' },
            description: {
              en: 'After leaving the nucleus, the mRNA is read three bases at a time. The ribosome moves along it codon by codon, from the start codon to the stop codon.',
              zh: '离开细胞核后，mRNA 一次被读三个碱基。核糖体沿 mRNA 一个密码子一个密码子地移动，从起始密码子到终止密码子。',
            },
          },
          {
            id: 'ribosome',
            name: { en: 'Ribosome', zh: '核糖体' },
            description: {
              en: 'The organelle that assembles proteins. It has two subunits that clamp around the mRNA. It reads the mRNA codon by codon and joins the amino acids into a chain.',
              zh: '负责装配蛋白质的细胞器。它由两个亚基组成，夹住 mRNA。它逐个读取密码子，并把氨基酸连成链。',
            },
          },
          {
            id: 'trna',
            name: { en: 'tRNA', zh: 'tRNA' },
            description: {
              en: 'A small RNA that carries one amino acid and has an anticodon that matches the mRNA codon. It reads the codon, drops off its amino acid, and leaves to fetch the next one.',
              zh: '一种小 RNA，携带一个氨基酸并带有与 mRNA 密码子配对反密码子。它读取密码子，放下所携氨基酸，然后离开去取下一个。',
            },
          },
          {
            id: 'protein',
            name: { en: 'Protein chain', zh: '蛋白质链' },
            description: {
              en: 'A chain of amino acids linked by peptide bonds. Once the chain is complete, it folds into a 3-D shape. The shape is what determines what the protein can do — a change in shape is a change in function.',
              zh: '由肽键连接的氨基酸链。链合后折叠成三维形状。正是形状决定了蛋白质能做什么——形状改变就是功能改变。',
            },
          },
        ],
      },
    },

    // 2) Mitosis vs meiosis — a side-by-side diagram and a
    //    comparison table. No figures, just SVG circles + X-shaped
    //    chromosome symbols.
    {
      type: 'mitosis-vs-meiosis',
      id: 'mitosis-vs-meiosis',
      title: { en: 'Mitosis vs meiosis', zh: '有丝分裂与减数分裂' },
      hint: {
        en: 'Two divisions, drawn side by side. Each row of the table is one feature; each column is one division.',
        zh: '两种分裂，并排绘制。表格的每一行是一项特征，每一列是一种分裂。',
      },
      intro: {
        en: 'Mitosis and meiosis look similar under the microscope but do very different jobs. The diagram shows the count and the number of cells each one produces; the table shows the rest.',
        zh: '有丝分裂和减数分裂在显微镜下看似相似，做的工作却完全不同。图示展示了它们分别产生多少细胞、每个细胞含多少染色体；表格展示了其它差别。',
      },
      mitosis: {
        heading: { en: 'Mitosis — growth and repair', zh: '有丝分裂——生长与修复' },
        outcome: {
          en: 'One parent cell (2n = 4) gives two daughter cells, each with the same chromosome number (2n = 4) and the same alleles as the parent.',
          zh: '一个母细胞（2n = 4）分裂为两个子细胞，每个子细胞的染色体数（2n = 4）和等位基因都与母细胞相同。',
        },
      },
      meiosis: {
        heading: { en: 'Meiosis — making gametes', zh: '减数分裂——产生配子' },
        outcome: {
          en: 'One parent cell (2n = 4) gives four daughter cells, each with half the chromosome number (n = 2). The alleles are reshuffled, so the four cells are genetically different.',
          zh: '一个母细胞（2n = 4）分裂为四个子细胞，每个子细胞的染色体数减半（n = 2）。等位基因经过重排，四个细胞在遗传上彼此不同。',
        },
      },
      rows: [
        {
          id: 'purpose',
          label: { en: 'Purpose', zh: '目的' },
          mitosis: { en: 'Growth and repair of body cells', zh: '身体细胞的生长与修复' },
          meiosis: { en: 'Production of gametes', zh: '产生配子' },
        },
        {
          id: 'divisions',
          label: { en: 'Number of divisions', zh: '分裂次数' },
          mitosis: { en: 'One', zh: '一次' },
          meiosis: { en: 'Two', zh: '两次' },
        },
        {
          id: 'daughter-cells',
          label: { en: 'Number of daughter cells', zh: '子细胞数' },
          mitosis: { en: 'Two', zh: '两个' },
          meiosis: { en: 'Four', zh: '四个' },
        },
        {
          id: 'chromosome-number',
          label: { en: 'Chromosome number in daughters', zh: '子细胞染色体数' },
          mitosis: { en: 'Same as parent (diploid, 2n)', zh: '与母细胞相同（二倍体，2n）' },
          meiosis: { en: 'Half of parent (haploid, n)', zh: '母细胞的一半（单倍体，n）' },
        },
        {
          id: 'genetic-variation',
          label: { en: 'Genetic variation in daughters', zh: '子细胞的遗传差异' },
          mitosis: { en: 'None — identical to parent', zh: '没有——与母细胞完全相同' },
          meiosis: { en: 'Yes — each daughter is genetically different', zh: '有——每个子细胞都彼此不同' },
        },
        {
          id: 'where',
          label: { en: 'Where it happens', zh: '发生位置' },
          mitosis: { en: 'In body cells (somatic cells)', zh: '在体细胞中' },
          meiosis: { en: 'In the reproductive organs (ovaries / testes)', zh: '在生殖器官中（卵巢/睾丸）' },
        },
      ],
    },

    // 3) Interactive Punnett square. The student picks the cross
    //    type and the two parents' genotypes; the grid updates live.
    {
      type: 'punnett-grid',
      id: 'punnett-grid',
      title: { en: 'Build a Punnett square', zh: '搭一个 Punnett 棋盘' },
      hint: {
        en: 'Pick the cross type and each parent\'s genotype. The grid updates as you change either. Try the same monohybrid cross with codominance to see why the ratio changes.',
        zh: '选择杂交类型和每个亲本的基因型。改变任一项，棋盘就会更新。同一单基因杂交换用共显性，看比例如何变化。',
      },
      intro: {
        en: 'A Punnett square is just a count of every possible combination of parental gametes. The proportions in the four squares are the probabilities an offspring has of carrying that genotype.',
        zh: 'Punnett 棋盘本质上就是对亲本配子所有可能组合的清点。四个格子中的比例就是子代拥有该基因型的概率。',
      },
      initialCross: 'monohybrid',
      initialFather: 'Aa',
      initialMother: 'Aa',
    },

    // 4) A 3-generation pedigree chart. The student clicks each
    //    person to see the deduction chain that fixes their
    //    genotype. The "sex-linked" toggle reinterprets the same
    //    chart as an X-linked condition.
    {
      type: 'pedigree-trace',
      id: 'pedigree-trace',
      title: { en: 'A pedigree, traced', zh: '一份家系图，逐人推断' },
      hint: {
        en: 'Click any individual to see what is known about them. The "deduction" panel explains the chain of reasoning that fixes their genotype. Switch to sex-linked to see why the same chart can be re-read as an X-linked condition.',
        zh: '点击任一个体查看已知信息。"推断"面板解释确定其基因型的推理链。切换到伴性，看同一份图如何被重新解读为 X 伴性遗传。',
      },
      intro: {
        en: 'A pedigree is a chart of who is related to whom, marked with who is affected. Reading it is mostly a question of working backwards from the affected individuals — the rest follows from the rules of inheritance.',
        zh: '家系图是标注了谁是患者、彼此有亲缘关系的图。读图主要是从患者反推——其余的根据遗传规律自然得出。',
      },
      initialMode: 'autosomal',
      initialSelected: 'g3-affected-son',
      individuals: [
        // Generation I — grandparents (top, x=300 and x=420)
        {
          id: 'g1-grandfather',
          name: { en: 'Grandfather (I-1)', zh: '祖父（I-1）' },
          description: {
            en: 'Affected with the condition. The pedigree convention is a filled symbol. Children of an affected parent inherit one copy of the allele.',
            zh: '患有该病。家系图惯例用实心符号标记。患病父母的孩子会继承一份该等位基因。',
          },
          deduction: {
            en: 'Affected, so the genotype is aa. Every child must receive one a from him, which is why all four children in generation II are at least carriers.',
            zh: '患病，基因型为 aa。他的每个孩子必定从他这里获得一个 a，因此第二代四个孩子至少都是携带者。',
          },
          sex: 'male',
          generation: 'I',
          autosomalStatus: 'affected',
          x: 300,
          y: 90,
        },
        {
          id: 'g1-grandmother',
          name: { en: 'Grandmother (I-2)', zh: '祖母（I-2）' },
          description: {
            en: 'Unaffected. She married into the family and is not a blood relative. Her status is unaffected, but to produce an affected grandchild, she must be a carrier.',
            zh: '未患病。她是嫁入这个家族的，与该家族无血缘关系。她自身未患病，但要生出患病的孙辈，她必须是携带者。',
          },
          deduction: {
            en: 'Affects appear in generation III. Two unaffected parents can only have an affected child if both carry the allele, so she is a carrier (Aa).',
            zh: '第三代出现患者。两个未患病的双亲只有都携带该等位基因时才能生出患病孩子，因此她是携带者（Aa）。',
          },
          sex: 'female',
          generation: 'I',
          autosomalStatus: 'carrier',
          x: 420,
          y: 90,
        },
        // Generation II — their 4 children + 3 spouses married in
        {
          id: 'g2-unaffected-daughter',
          name: { en: 'Daughter (II-1)', zh: '女儿（II-1）' },
          description: {
            en: 'A daughter of the grandparents. Unaffected, but must be a carrier because her father was affected.',
            zh: '祖父母的女儿。未患病，但因为父亲患病，她必然是携带者。',
          },
          deduction: {
            en: 'She got an a from her affected father. She did not get an a from her mother, so her genotype is Aa.',
            zh: '她从患病的父亲那里获得一个 a。她从母亲那里没得到 a，因此基因型为 Aa。',
          },
          sex: 'female',
          generation: 'II',
          autosomalStatus: 'unaffected',
          x: 80,
          y: 230,
        },
        {
          id: 'g2-son-in-law-1',
          name: { en: 'Spouse (II-2)', zh: '女婿（II-2）' },
          description: {
            en: 'Married into the family. Unaffected. From outside the family, so he is most likely AA — but the chart cannot rule out carrier status without an affected child.',
            zh: '家族外婚入。未患病。来自家族外，所以他最有可能是 AA——但在没有患病孩子的情况下，家系图本身不能排除他是携带者。',
          },
          deduction: {
            en: 'In the autosomal recessive case, an unaffected person who married into an affected family is usually taken as AA unless an affected child proves otherwise. Their two children are both unaffected, so the assumption holds.',
            zh: '在常染色体隐性的情形下，婚入患病家族而自身未患病的人通常被假定为 AA，除非有患病孩子反证。他们的两个孩子都未患病，因此这一假设成立。',
          },
          sex: 'male',
          generation: 'II',
          autosomalStatus: 'unaffected',
          x: 180,
          y: 230,
        },
        {
          id: 'g2-unaffected-son',
          name: { en: 'Son (II-3)', zh: '儿子（II-3）' },
          description: {
            en: 'A son of the grandparents. Unaffected, but must be a carrier because his father was affected.',
            zh: '祖父母的儿子。未患病，但因为父亲患病，他必然是携带者。',
          },
          deduction: {
            en: 'He got an a from his affected father. He is unaffected, so he got an A from his mother. Genotype Aa.',
            zh: '他从患病的父亲那里获得一个 a。他自身未患病，因此从母亲那里得到的是 A。基因型为 Aa。',
          },
          sex: 'male',
          generation: 'II',
          autosomalStatus: 'unaffected',
          x: 280,
          y: 230,
        },
        {
          id: 'g2-daughter-in-law-1',
          name: { en: 'Spouse (II-4)', zh: '儿媳（II-4）' },
          description: {
            en: 'Married into the family. Unaffected and from outside. Assumed AA unless an affected child proves otherwise.',
            zh: '家族外婚入。未患病。假定为 AA，除非有患病孩子反证。',
          },
          deduction: {
            en: 'Their one daughter is unaffected, so we cannot rule out a carrier status. The conventional reading is AA — but a textbook could leave this open.',
            zh: '他们的一个女儿未患病，因此无法排除她是携带者的可能。常规读法是 AA——但教材里也可以保留这种不确定性。',
          },
          sex: 'female',
          generation: 'II',
          autosomalStatus: 'unaffected',
          x: 380,
          y: 230,
        },
        {
          id: 'g2-affected-daughter',
          name: { en: 'Daughter (II-5)', zh: '女儿（II-5）' },
          description: {
            en: 'Affected. She got an a from her father and an a from her mother.',
            zh: '患病。她从父亲那里得到一个 a，从母亲那里又得到一个 a。',
          },
          deduction: {
            en: 'Affected, so genotype aa. Her mother must therefore be a carrier (Aa), not AA.',
            zh: '患病，基因型 aa。因此她的母亲必是携带者（Aa），不是 AA。',
          },
          sex: 'female',
          generation: 'II',
          autosomalStatus: 'affected',
          x: 480,
          y: 230,
        },
        {
          id: 'g2-son-in-law-2',
          name: { en: 'Spouse (II-6)', zh: '女婿（II-6）' },
          description: {
            en: 'Married the affected daughter. Unaffected. Must be a carrier — otherwise their children could not be affected.',
            zh: '与患病的女儿结婚。自身未患病。必是携带者——否则他们的孩子不可能患病。',
          },
          deduction: {
            en: 'Their child in generation III is affected. The child got an a from each parent. The mother (II-5) is aa, so she must have given an a. The father must have given an a too, so he is Aa.',
            zh: '第三代他们的孩子患病。这孩子从父母各得到一个 a。母亲（II-5）是 aa，所以她必然给出一个 a。父亲也必须给出一个 a，因此他是 Aa。',
          },
          sex: 'male',
          generation: 'II',
          autosomalStatus: 'unaffected',
          x: 580,
          y: 230,
        },
        // Generation III — grandchildren (5 of them)
        {
          id: 'g3-unaffected-girl-1',
          name: { en: 'Grandchild (III-1)', zh: '孙辈（III-1）' },
          description: {
            en: 'Daughter of II-1 and II-2. Unaffected. Could be AA or Aa — the chart cannot decide.',
            zh: 'II-1 与 II-2 的女儿。未患病。可能是 AA 或 Aa——家系图本身无法判断。',
          },
          deduction: {
            en: 'She got an A from her father (II-2, AA) and either A or a from her mother (II-1, Aa). Without an affected child, we cannot rule out Aa.',
            zh: '她从父亲（II-2, AA）得到一个 A，从母亲（II-1, Aa）得到 A 或 a。在没有患病孩子的前提下，无法排除她是 Aa 的可能。',
          },
          sex: 'female',
          generation: 'III',
          autosomalStatus: 'unaffected',
          x: 120,
          y: 340,
        },
        {
          id: 'g3-unaffected-boy-1',
          name: { en: 'Grandchild (III-2)', zh: '孙辈（III-2）' },
          description: {
            en: 'Son of II-1 and II-2. Unaffected. Must be Aa — the affected grandfather forces a onto all grandchildren through the II-1 line.',
            zh: 'II-1 与 II-2 的儿子。未患病。必是 Aa——患病的祖父通过 II-1 这一支把 a 传给了所有孙辈。',
          },
          deduction: {
            en: 'He got A from his father and a from his mother. So Aa. The "a" comes from the affected grandfather via II-1.',
            zh: '他从父亲那里得到 A，从母亲那里得到 a。基因型 Aa。这个 a 来自患病的祖父，经 II-1 传下来。',
          },
          sex: 'male',
          generation: 'III',
          autosomalStatus: 'unaffected',
          x: 200,
          y: 340,
        },
        {
          id: 'g3-unaffected-girl-2',
          name: { en: 'Grandchild (III-3)', zh: '孙辈（III-3）' },
          description: {
            en: 'Daughter of II-3 and II-4. Unaffected. Could be AA or Aa.',
            zh: 'II-3 与 II-4 的女儿。未患病。可能是 AA 或 Aa。',
          },
          deduction: {
            en: 'She got an A from her father (II-4, AA) and either A or a from her mother (II-3, Aa). Without an affected child, we cannot rule out Aa.',
            zh: '她从父亲（II-4, AA）得到一个 A，从母亲（II-3, Aa）得到 A 或 a。在没有患病孩子的前提下，无法排除她是 Aa 的可能。',
          },
          sex: 'female',
          generation: 'III',
          autosomalStatus: 'unaffected',
          x: 300,
          y: 340,
        },
        {
          id: 'g3-unaffected-boy-2',
          name: { en: 'Grandchild (III-4)', zh: '孙辈（III-4）' },
          description: {
            en: 'Son of II-3 and II-4. Unaffected. Must be Aa — same reasoning as III-2.',
            zh: 'II-3 与 II-4 的儿子。未患病。必是 Aa——推理同 III-2。',
          },
          deduction: {
            en: 'A from father, a from mother (II-3, Aa). The a traces back to the affected grandfather via II-3.',
            zh: '从父亲得到 A，从母亲（II-3, Aa）得到 a。这个 a 来自患病的祖父，经 II-3 传下来。',
          },
          sex: 'male',
          generation: 'III',
          autosomalStatus: 'unaffected',
          x: 380,
          y: 340,
        },
        {
          id: 'g3-affected-son',
          name: { en: 'Grandchild (III-5)', zh: '孙辈（III-5）' },
          description: {
            en: 'Son of II-5 and II-6. Affected. The chart is built around this one individual — the case that forces the rest.',
            zh: 'II-5 与 II-6 的儿子。患病。整个家系图都围绕这个孩子展开——正是他逼迫出其它所有人的基因型。',
          },
          deduction: {
            en: 'Affected, so aa. One a from his mother (II-5, aa) and one a from his father (II-6, Aa). The affected mother fixes her parents as carriers — which is how the whole chain closes.',
            zh: '患病，基因型 aa。一个 a 来自母亲（II-5, aa），另一个来自父亲（II-6, Aa）。患病的母亲反过来固定了她父母的基因型必为携带者——这就是整条推理链的闭环。',
          },
          sex: 'male',
          generation: 'III',
          autosomalStatus: 'affected',
          x: 540,
          y: 340,
        },
      ],
    },

    // 5) 3D DNA double helix — a procedural R3F rendering of the
    //    textbook B-form DNA silhouette. The 2D `DnaToProtein`
    //    diagram above already shows transcription and translation as
    //    a flat process; this view is the *shape* of the molecule
    //    that makes the process possible. The two sugar-phosphate
    //    backbones are grey tubes, the 14 base pairs are colour-coded
    //    (A-T red/blue, G-C green/yellow), and each rung is clickable
    //    so the side panel can read the base pair out loud.
    {
      type: 'dna-helix-3d',
      id: 'dna-helix-3d',
      title: { en: 'The DNA double helix, in 3D', zh: 'DNA 双螺旋，3D 展示' },
      hint: {
        en: 'Drag to rotate. Click any rung to read the base pair. The two grey tubes are the sugar-phosphate backbones; the coloured rungs are the four bases (A, T, G, C) — A always pairs with T, G always with C.',
        zh: '拖动旋转。点击任一碱基对查看说明。两条灰色管是糖-磷酸主链；彩色横杆是四种碱基（A、T、G、C）——A 必配 T，G 必配 C。',
      },
      intro: {
        en: 'DNA is a double helix — two strands wound around a common axis. Each strand is a chain of sugars and phosphates; the rungs between them are the four bases that carry the genetic code.',
        zh: 'DNA 是双螺旋——两条链缠绕在同一根轴上。每条链由糖和磷酸组成；连接它们的横杆是携带遗传密码的四种碱基。',
      },
      initialIndex: 0,
      baseDescriptions: {
        'A-T': {
          name: { en: 'Adenine — Thymine (A-T)', zh: '腺嘌呤 — 胸腺嘧啶（A-T）' },
          description: {
            en: 'Two hydrogen bonds hold the pair together. A and T are the only bases that pair with two bonds; this is what gives A-T pairs their characteristic lower bond count versus G-C.',
            zh: '两个氢键将它们拉在一起。A 和 T 是唯二以两个氢键配对的碱基；这就是 A-T 对比 G-C 键数更少的原因。',
          },
        },
        'T-A': {
          name: { en: 'Thymine — Adenine (T-A)', zh: '胸腺嘧啶 — 腺嘌呤（T-A）' },
          description: {
            en: 'Same pair as A-T, viewed from the other strand. The pairing is symmetric: an A on one strand always pulls a T across from it on the other.',
            zh: '与 A-T 同一对，只是从另一条链的视角看。配对是对称的：一条链上的 A 永远与另一条上的 T 相对。',
          },
        },
        'G-C': {
          name: { en: 'Guanine — Cytosine (G-C)', zh: '鸟嘌呤 — 胞嘧啶（G-C）' },
          description: {
            en: 'Three hydrogen bonds hold the pair together. G-C pairs are stronger than A-T pairs; regions of DNA rich in G-C need more energy to separate, which matters when DNA is being unzipped for transcription.',
            zh: '三个氢键将它们拉在一起。G-C 对比 A-T 更强；富含 G-C 的 DNA 区域需要更多能量才能分开，这在 DNA 解链进行转录时很重要。',
          },
        },
        'C-G': {
          name: { en: 'Cytosine — Guanine (C-G)', zh: '胞嘧啶 — 鸟嘌呤（C-G）' },
          description: {
            en: 'The same G-C pair from the other strand. Three bonds, same strength — the strand you read from does not change the chemistry.',
            zh: '与 G-C 同一对，只是从另一条链的视角看。三个键，强度相同——从哪条链读，化学性质都不变。',
          },
        },
      },
    },
    // 6) Why do our cells age? The telomere, Hayflick limit and HeLa — the
    //    "wait, that's why" story that came out of the 8/5 G8 17-1 lesson.
    //    Not on the IGCSE syllabus, but the kind of "cell immortality =
    //    cancer" connection the student remembers a year later.
    {
      type: 'concept-explainer',
      id: 'telomere-and-immortality',
      title: { en: 'Why do our cells age? Telomeres, Hayflick, HeLa', zh: '细胞为什么衰老？端粒、Hayflick 上限、HeLa 细胞' },
      hint: {
        en: 'A single idea that ties together why we age, why cancer is "immortal" cells, and a real cell line taken from a tumour in 1951 that is still growing in labs today.',
        zh: '一个想法把"我们为什么会老"、"癌症就是永生的细胞"和 1951 年从一个肿瘤里取出至今仍在实验室生长的细胞系串起来。',
      },
      blocks: [
        {
          id: 'telomere',
          title: { en: 'The end of every chromosome wears a cap — the telomere', zh: '每条染色体的末端都戴着一顶"帽子"——端粒' },
          hook: {
            en: 'In the 1950s Leonard Hayflick put normal human cells in a dish and watched them divide. They divided about 50 times, then stopped — even with plenty of food and space. The cell\'s internal clock had run out. But cancer cells from the same tissue kept dividing indefinitely.',
            zh: '20 世纪 50 年代，Leonard Hayflick 把正常人的细胞放进培养皿，看它们分裂。它们大约分裂 50 次后停止——哪怕食物和空间都很充足。细胞的内部时钟走完了。但同一组织来源的癌细胞却无限地分裂下去。',
          },
          mechanism: {
            en: 'A chromosome is a long DNA double helix, and the very last few letters at each end cannot be fully copied — DNA polymerase needs an RNA primer to start, and the primer at the very tip is removed and cannot be replaced. So every division shortens the chromosome a little. The body protects the important genes by adding a long stretch of throwaway repeats (TTAGGG in humans) at each end, called the telomere. When the telomere is gone, the next division damages real genes, and the cell stops dividing — it goes into senescence and dies.',
            zh: '染色体是一长串 DNA 双螺旋，每条链最末端的几个字母无法被完整复制——DNA 聚合酶需要 RNA 引物才能启动，而最末端的引物会被切掉且无法被补上。所以每分裂一次，染色体就短一点。身体把真正重要的基因用一长串可丢弃的重复序列（人类是 TTAGGG）保护起来，加在每条染色体的末端，这就是端粒。端粒用完后，下一次分裂就会伤到真正的基因，细胞停止分裂——进入衰老并死亡。',
          },
          whyItMatters: {
            en: 'This is the leading theory of ageing at the cellular level. It is also what cancer escapes: most cancer cells switch on an enzyme called telomerase that rebuilds the telomere after every division, so the cap never shortens, and the cell can divide forever.',
            zh: '这是细胞层面衰老的主流理论之一。也是癌症逃脱的机制：大多数癌细胞会启动一种叫端粒酶的酶，每次分裂后重建端粒，所以"帽子"永远不减，细胞得以无限分裂。',
          },
          teacherStory: {
            en: 'HeLa cells were taken from Henrietta Lacks\' cervical tumour in 1951, and they are still growing in labs around the world today. Her cells "achieved immortality" — a single line of human cells, dividing every 24 hours, for over 70 years and counting.',
            zh: 'HeLa 细胞是 1951 年从 Henrietta Lacks 的宫颈肿瘤中取出的，至今仍在世界各地的实验室中生长。她的细胞"实现了永生"——同一株人类细胞，每 24 小时分裂一次，已持续 70 多年并还在继续。',
          },
        },
      ],
    },
  ],
}

export default lesson
