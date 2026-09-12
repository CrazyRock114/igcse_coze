import type { Lesson } from '@/content/types'
import { placementParams } from '@/lib/assignment'
import { ALL_ITEMS, MAX_TARGETS } from './kernel'
import narration from './narration'

const lesson: Lesson = {
  slug: '2-1-cells',
  subject: '0610',
  syllabus: [
    '0610.2.1.1',
    '0610.2.1.2',
    '0610.2.1.3',
    '0610.2.1.4',
    '0610.2.1.5',
    '0610.2.1.6',
    '0610.2.1.7',
    '0610.2.2.1',
    '0610.2.2.2',
    '0610.2.2.3',
    '0610.4.1.1',
    '0610.4.1.2',
    '0610.4.1.3',
    '0610.4.1.4',
  ],
  tier: 'extended',
  estimatedMinutes: 50,

  title: { en: 'Cells and biological molecules', zh: '细胞与生物大分子' },
  summary: {
    en: 'A plant cell is not an animal cell with extras. Sort the structures and most of them turn out to be in every cell — a bacterium is defined by what it lacks.',
    zh: '植物细胞并不是"动物细胞加几样东西"。把结构分一分类就会发现，大多数结构每种细胞都有——而细菌的特征恰恰在于它缺什么。',
  },

  objectives: [
    {
      en: 'Describe and compare the structures of plant, animal and bacterial cells, and state the functions of those structures.',
      zh: '描述并比较植物、动物与细菌细胞的结构，并说出各结构的功能。',
    },
    {
      en: 'State that new cells come from division of existing cells, and that specialised cells have specific functions.',
      zh: '说明新细胞由已有细胞分裂产生，特化细胞具有特定功能。',
    },
    {
      en: 'Describe the terms cell, tissue, organ, organ system and organism.',
      zh: '说明细胞、组织、器官、器官系统与个体的含义。',
    },
    {
      en: 'State and use magnification = image size ÷ actual size, converting between millimetres and micrometres. (Extended)',
      zh: '写出并使用"放大倍数 = 图像大小 ÷ 实际大小"，并在毫米与微米之间换算。（Extended）',
    },
    {
      en: 'List the elements in carbohydrates, fats and proteins, and the small molecules that build each.',
      zh: '列出糖类、脂肪与蛋白质所含的元素，以及构成各自的小分子。',
    },
    {
      en: 'Describe the food tests for starch, reducing sugars, protein, fats and vitamin C.',
      zh: '描述淀粉、还原糖、蛋白质、脂肪与维生素 C 的检验方法。',
    },
    {
      en: 'Describe the structure of DNA as a double helix of paired bases. (Extended)',
      zh: '把 DNA 的结构描述为碱基配对的双螺旋。（Extended）',
    },
  ],

  glossary: [
    {
      en: 'organelle',
      zh: '细胞器',
      definition: {
        en: 'A structure inside a cell with its own job. Bacteria have no membrane-bound organelles at all.',
        zh: '细胞内部具有特定功能的结构。细菌完全没有膜包被的细胞器。',
      },
      syllabus: ['0610.2.1.2'],
    },
    {
      en: 'plasmid',
      zh: '质粒',
      definition: {
        en: 'A small extra ring of DNA in a bacterium. How genes are put into bacteria, and how antibiotic resistance spreads between them.',
        zh: '细菌中额外的小环状 DNA。它既是把基因导入细菌的途径，也是抗生素耐药性在细菌间传播的方式。',
      },
      syllabus: ['0610.2.1.2'],
    },
    {
      en: 'tissue',
      zh: '组织',
      definition: {
        en: 'A group of cells of similar structure working together on one function.',
        zh: '一群结构相似、共同完成同一功能的细胞。',
      },
      syllabus: ['0610.2.1.7'],
    },
    {
      en: 'magnification',
      zh: '放大倍数',
      definition: {
        en: 'Image size divided by actual size. A length over a length, so it has no units.',
        zh: '图像大小除以实际大小。长度除以长度，因此没有单位。',
      },
      syllabus: ['0610.2.2.1'],
    },
    {
      en: 'reducing sugar',
      zh: '还原糖',
      definition: {
        en: 'A sugar that gives a positive Benedict’s test — blue to green, yellow, orange or brick red on heating.',
        zh: '能使本尼迪克特试验呈阳性的糖——加热后由蓝色变为绿、黄、橙或砖红色。',
      },
      syllabus: ['0610.4.1.3'],
    },
    {
      en: 'double helix',
      zh: '双螺旋',
      definition: {
        en: 'The shape of DNA: two strands wound round each other, held together by pairs of bases.',
        zh: 'DNA 的形状：两条链相互缠绕，由成对的碱基连接在一起。',
      },
      syllabus: ['0610.4.1.4'],
    },
  ],

  equations: [
    {
      latex: 'M = \\dfrac{\\text{image size}}{\\text{actual size}}',
      meaning: {
        en: 'A length divided by a length, so magnification has no units. Convert millimetres to micrometres before dividing, not after — there are 1000 micrometres in a millimetre.',
        zh: '长度除以长度，因此放大倍数没有单位。要在做除法之前把毫米换算成微米，而不是之后——1 毫米等于 1000 微米。',
      },
    },
  ],

  sim: {
    primitive: 'sort',
    kernel: '2-1-cells',
    hint: {
      en: 'Read the features on each group first. A wrong placement stays put and is marked — click it to take it back.',
      zh: '先读每个类别上的说明。放错的会留在原处并被标出——点击它即可取回。',
    },
    params: [
      {
        key: 'stage',
        label: { en: 'Exercise', zh: '练习' },
        unit: '',
        min: 1,
        max: 3,
        step: 1,
        default: 1,
        options: [
          { value: 1, label: { en: 'Cell structures', zh: '细胞结构' } },
          { value: 2, label: { en: 'Building blocks', zh: '构成单元' } },
          { value: 3, label: { en: 'Food tests', zh: '食物检验' } },
        ],
      },
      ...placementParams(ALL_ITEMS, MAX_TARGETS),
    ],
    readouts: [
      { key: 'correct', label: { en: 'Correct', zh: '正确' }, unit: '', sigFigs: 2, exact: true },
      { key: 'placed', label: { en: 'Placed', zh: '已放置' }, unit: '', sigFigs: 2, exact: true },
      { key: 'total', label: { en: 'Items', zh: '条目总数' }, unit: '', sigFigs: 2, exact: true },
    ],
  },

  narration,

  checkpoints: [
    {
      id: '0610-2-1-cp1',
      syllabus: ['0610.2.1.1', '0610.2.1.2'],
      tier: 'core',
      commandWord: 'Compare',
      marks: 3,
      stem: 'Compare the structure of a bacterial cell with that of a plant cell. Give three differences.',
      markScheme: [
        {
          text: 'A bacterial cell has no nucleus — its DNA is a circular loop free in the cytoplasm — while a plant cell has a nucleus',
          marks: 1,
        },
        {
          text: 'A bacterial cell has no chloroplasts or mitochondria, or no membrane-bound organelles at all',
          marks: 1,
        },
        {
          text: 'A bacterial cell wall is not made of cellulose, and a bacterium may have plasmids while a plant cell does not; or a plant cell has a large permanent vacuole',
          marks: 1,
        },
      ],
      examinerNote: {
        en: '"Compare" needs both sides of each difference. And a bacterium does have a cell wall, cytoplasm, a membrane and ribosomes — saying it has "no cell wall" is a common and costly error.',
        zh: '"Compare"要求每条差异都写出两边。另外，细菌确实有细胞壁、细胞质、细胞膜和核糖体——写"它没有细胞壁"是常见且代价不小的错误。',
      },
    },
    {
      id: '0610-2-1-cp2',
      syllabus: ['0610.2.2.2', '0610.2.2.3'],
      tier: 'extended',
      commandWord: 'Calculate',
      marks: 3,
      stem: 'A drawing of a cell is 60 mm long. The actual cell is 30 micrometres long. Calculate the magnification of the drawing. Show your working.',
      markScheme: [
        { text: 'Converts to the same unit: 60 mm = 60 000 µm (or 30 µm = 0.03 mm)', marks: 1 },
        { text: 'Magnification = image size ÷ actual size = 60 000 ÷ 30', marks: 1 },
        { text: '= × 2000, with no units', marks: 1 },
      ],
      examinerNote: {
        en: 'Convert first. Dividing 60 by 30 without converting gives × 2 and throws away every mark. And magnification carries no unit.',
        zh: '先换算。不换算就用 60 除以 30 会得到 ×2，所有分数全丢。另外，放大倍数不带单位。',
      },
    },
    {
      id: '0610-2-1-cp3',
      syllabus: ['0610.4.1.3'],
      tier: 'core',
      commandWord: 'Describe',
      marks: 4,
      stem: 'A student is given a solution and asked to find out whether it contains starch and whether it contains a reducing sugar. Describe the two tests, including the results that would be positive.',
      markScheme: [
        { text: 'Add iodine solution to a sample', marks: 1 },
        { text: 'A positive result is a colour change from orange-brown to blue-black', marks: 1 },
        { text: 'To a separate sample add Benedict’s solution and heat it in a water bath', marks: 1 },
        {
          text: 'A positive result is a colour change from blue to green, yellow, orange or brick red',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Give both colours for each test, and do not forget that Benedict’s must be heated. Use separate samples — you cannot run both tests in the same tube.',
        zh: '每种检验都要写出前后两种颜色，并且不要忘记本尼迪克特试剂必须加热。要用分开的样品——两种检验不能在同一支试管里做。',
      },
    },
    {
      id: '0610-2-1-cp4',
      syllabus: ['0610.4.1.1', '0610.4.1.2'],
      tier: 'core',
      commandWord: 'State',
      marks: 3,
      stem: 'State the small molecules from which starch, protein and fat are built, and state which of the three contains nitrogen.',
      markScheme: [
        { text: 'Starch is built from simple sugars (glucose)', marks: 1 },
        { text: 'Protein is built from amino acids; fat from fatty acids and glycerol', marks: 1 },
        { text: 'Protein is the one that contains nitrogen', marks: 1 },
      ],
      examinerNote: {
        en: 'Nitrogen is how you identify a protein from a list of elements, and it is why a plant needs nitrate ions from the soil.',
        zh: '"含氮"是从元素清单中辨认蛋白质的依据，也是植物需要从土壤中吸收硝酸根离子的原因。',
      },
    },
    {
      id: '0610-2-1-cp5',
      syllabus: ['0610.2.1.6', '0610.2.1.7'],
      tier: 'core',
      commandWord: 'Explain',
      marks: 2,
      stem: 'Using an example, explain the difference between a tissue and an organ.',
      markScheme: [
        {
          text: 'A tissue is a group of cells of similar structure working together — for example muscle tissue',
          marks: 1,
        },
        {
          text: 'An organ is several different tissues working together for one function — for example the stomach, which contains muscle, glandular and epithelial tissue',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'The distinction is "one kind of cell" against "several kinds of tissue". An example makes it concrete and the question asks for one.',
        zh: '区别在于"一种细胞"与"多种组织"。举例能让它变得具体，而题目正要求举例。',
      },
    },
  ],
}

export default lesson
