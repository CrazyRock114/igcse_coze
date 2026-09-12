import type { Lesson } from '@/content/types'
import narration from './narration'

const lesson: Lesson = {
  slug: '2-6-giant-structures',
  subject: '0620',
  syllabus: ['0620.2.6.1', '0620.2.6.2', '0620.2.6.3', '0620.2.7.1', '0620.2.7.2'],
  tier: 'extended',
  estimatedMinutes: 40,

  title: { en: 'Giant covalent structures and metallic bonding', zh: '巨型共价结构与金属键' },
  summary: {
    en: 'Diamond and graphite are both pure carbon. One is the hardest substance known and an insulator; the other is soft enough to write with and conducts. Count the bonds and you can see why.',
    zh: '金刚石和石墨都是纯碳。一个是已知最硬的物质且不导电；另一个软到能书写而且导电。数一数键的数目就明白了。',
  },

  objectives: [
    {
      en: 'Describe the giant covalent structures of graphite and diamond.',
      zh: '描述石墨与金刚石的巨型共价结构。',
    },
    {
      en: 'Relate the structure and bonding of graphite and diamond to their uses.',
      zh: '把石墨与金刚石的结构和成键与它们的用途联系起来。',
    },
    { en: 'Describe the giant covalent structure of silicon(IV) oxide. (Extended)', zh: '描述二氧化硅的巨型共价结构。（Extended）' },
    {
      en: 'Describe metallic bonding as the attraction between a lattice of positive ions and a sea of delocalised electrons. (Extended)',
      zh: '把金属键描述为正离子晶格与离域电子海之间的吸引。（Extended）',
    },
    {
      en: 'Explain the electrical conductivity and malleability of metals in terms of their structure and bonding. (Extended)',
      zh: '用金属的结构与成键解释其导电性与延展性。（Extended）',
    },
  ],

  glossary: [
    {
      en: 'giant covalent structure',
      zh: '巨型共价结构',
      definition: {
        en: 'A network of atoms held together by covalent bonds running right through the crystal, with no separate molecules. Melting one means breaking covalent bonds, so the melting point is very high.',
        zh: '由贯穿整块晶体的共价键连接而成的原子网络，其中不存在单独的分子。熔化它意味着打断共价键，因此熔点非常高。',
      },
      syllabus: ['0620.2.6.1'],
    },
    {
      en: 'delocalised electron',
      zh: '离域电子',
      definition: {
        en: 'An electron not held in any one bond or by any one atom, free to move through the whole structure. Found in graphite and in every metal, and the reason both conduct.',
        zh: '不被任何单个键或单个原子束缚、可在整个结构中自由移动的电子。石墨和所有金属中都有，也是两者导电的原因。',
      },
      syllabus: ['0620.2.7.1'],
    },
    {
      en: 'metallic bonding',
      zh: '金属键',
      definition: {
        en: 'The electrostatic attraction between a lattice of positive metal ions and the sea of delocalised electrons around them.',
        zh: '正金属离子晶格与其周围离域电子海之间的静电吸引。',
      },
      syllabus: ['0620.2.7.1'],
    },
    {
      en: 'malleable',
      zh: '有延展性的',
      definition: {
        en: 'Able to be hammered or bent into shape without breaking. Metals are malleable because their identical layers of ions can slide without ever bringing like charges together.',
        zh: '能被锤打或弯折成形而不破裂。金属之所以有延展性，是因为其相同的离子层可以滑动而不会使同种电荷靠到一起。',
      },
      syllabus: ['0620.2.7.2'],
    },
  ],

  equations: [
    {
      latex: '\\text{properties} \\leftarrow \\text{structure and bonding}',
      meaning: {
        en: 'The direction of every answer in this topic. Start from how the atoms are joined, then say what that allows or prevents — hardness, conduction, sliding — and only then name the use.',
        zh: '本主题所有答案的推理方向。先说原子如何连接，再说这允许或阻止了什么——硬度、导电、滑动——最后才说用途。',
      },
      substitute: (r) =>
        `\\text{bonds per atom} = ${r['bondsPerAtom'] ?? 0} \\quad \\text{atoms drawn} = ${r['atomsShown'] ?? 0}`,
    },
  ],

  sim: {
    primitive: 'giant',
    kernel: '2-6-giant-structures',
    hint: {
      en: 'Count the bonds on one atom in diamond, then in graphite. Four against three is the whole difference between them.',
      zh: '数一数金刚石中一个原子上有几条键，再数石墨的。四条与三条，就是它们的全部区别。',
    },
    params: [
      {
        key: 'structure',
        label: { en: 'Structure', zh: '结构' },
        unit: '',
        min: 0,
        max: 3,
        step: 1,
        default: 0,
        options: [
          { value: 0, label: { en: 'Diamond', zh: '金刚石' } },
          { value: 1, label: { en: 'Graphite', zh: '石墨' } },
          { value: 2, label: { en: 'Silicon(IV) oxide', zh: '二氧化硅' } },
          { value: 3, label: { en: 'A metal', zh: '金属' } },
        ],
      },
    ],
    readouts: [
      {
        key: 'bondsPerAtom',
        label: { en: 'Covalent bonds per atom', zh: '每个原子的共价键数' },
        unit: '',
        sigFigs: 2,
        exact: true,
      },
      {
        key: 'atomsShown',
        label: { en: 'Atoms drawn', zh: '所画原子数' },
        unit: '',
        sigFigs: 3,
        exact: true,
      },
      {
        key: 'bondsShown',
        label: { en: 'Bonds drawn', zh: '所画键数' },
        unit: '',
        sigFigs: 3,
        exact: true,
      },
      {
        key: 'delocalisedElectrons',
        label: { en: 'Delocalised electrons drawn', zh: '所画离域电子数' },
        unit: '',
        sigFigs: 3,
        exact: true,
      },
    ],
    presets: [
      { label: { en: 'Diamond', zh: '金刚石' }, params: { structure: 0 } },
      { label: { en: 'Graphite', zh: '石墨' }, params: { structure: 1 } },
      { label: { en: 'Silicon(IV) oxide', zh: '二氧化硅' }, params: { structure: 2 } },
      { label: { en: 'A metal', zh: '金属' }, params: { structure: 3 } },
    ],
  },

  narration,

  checkpoints: [
    {
      id: '0620-2-6-cp1',
      syllabus: ['0620.2.6.1', '0620.2.6.2'],
      tier: 'core',
      commandWord: 'Explain',
      marks: 4,
      stem: 'Diamond and graphite are both forms of carbon. Explain, in terms of structure and bonding, why diamond is used in cutting tools while graphite is used as a lubricant.',
      markScheme: [
        {
          text: 'In diamond each carbon atom is covalently bonded to four others in a rigid three-dimensional network',
          marks: 1,
        },
        {
          text: 'so scratching or cutting it would require breaking many strong covalent bonds, making it extremely hard',
          marks: 1,
        },
        {
          text: 'In graphite each carbon is covalently bonded to only three others, forming flat layers',
          marks: 1,
        },
        {
          text: 'with only weak forces of attraction between the layers, so the layers slide over one another easily',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Say "weak forces between the layers", never "weak bonds". The covalent bonds inside a graphite layer are as strong as those in diamond, which is why graphite still has a very high melting point.',
        zh: '要写"层与层之间的作用力弱"，绝不要写"键弱"。石墨层内的共价键与金刚石中的一样强，这正是石墨熔点仍然很高的原因。',
      },
    },
    {
      id: '0620-2-6-cp2',
      syllabus: ['0620.2.6.2'],
      tier: 'core',
      commandWord: 'Explain',
      marks: 3,
      stem: 'Graphite conducts electricity but diamond does not, even though both contain only carbon atoms. Explain why.',
      markScheme: [
        {
          text: 'In graphite each carbon atom uses only three of its four outer electrons in covalent bonds',
          marks: 1,
        },
        {
          text: 'so the fourth electron is delocalised and free to move through the structure, carrying charge',
          marks: 1,
        },
        {
          text: 'In diamond all four outer electrons of every carbon atom are used in covalent bonds, so there are no free electrons to carry a current',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'The mark is in the counting: three bonds leaves one electron over, four bonds leaves none. An answer that says graphite "has free electrons" without saying where they came from has skipped the reasoning.',
        zh: '得分点在于数电子：三条键剩下一个电子，四条键一个不剩。只写石墨"有自由电子"而不说明它们从何而来，就跳过了推理。',
      },
    },
    {
      id: '0620-2-6-cp3',
      syllabus: ['0620.2.6.3'],
      tier: 'extended',
      commandWord: 'Describe',
      marks: 3,
      stem: 'Describe the structure of silicon(IV) oxide, and explain how its structure gives rise to the formula SiO₂.',
      markScheme: [
        {
          text: 'A giant covalent structure in which every atom is joined by strong covalent bonds throughout the crystal',
          marks: 1,
        },
        { text: 'Each silicon atom is bonded to four oxygen atoms', marks: 1 },
        {
          text: 'and each oxygen atom is bonded to two silicon atoms, so there are twice as many oxygen atoms as silicon atoms, giving SiO₂',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'The formula follows from the two bond counts. Four bonds each on silicon and two each on oxygen can only balance if oxygen atoms outnumber silicon two to one.',
        zh: '化学式由两个成键数推出。硅各四条键、氧各两条键，只有当氧原子数是硅的两倍时才能相配。',
      },
    },
    {
      id: '0620-2-6-cp4',
      syllabus: ['0620.2.7.1', '0620.2.7.2'],
      tier: 'extended',
      commandWord: 'Explain',
      marks: 4,
      stem: 'Describe metallic bonding, and explain why metals conduct electricity and can be bent into shape, whereas an ionic solid such as sodium chloride shatters when struck.',
      markScheme: [
        {
          text: 'Metallic bonding is the electrostatic attraction between a lattice of positive metal ions and a sea of delocalised electrons',
          marks: 1,
        },
        {
          text: 'The delocalised electrons are free to move through the structure, so they carry charge when a voltage is applied',
          marks: 1,
        },
        {
          text: 'The ions in the lattice are all identical, so a layer can slide over the one below without bringing like charges together, and the bonding is unaffected — the metal changes shape rather than breaking',
          marks: 1,
        },
        {
          text: 'In an ionic solid, sliding a layer brings ions of the same charge next to one another; they repel and the crystal splits along that plane',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'The contrast is the answer. Both structures are lattices of ions and both are strongly bonded — what differs is whether sliding one layer puts like charges next to each other.',
        zh: '对比本身就是答案。两种结构都是离子晶格，也都有很强的键合——不同之处在于滑动一层后是否会让同种电荷相邻。',
      },
    },
    {
      id: '0620-2-6-cp5',
      syllabus: ['0620.2.6.1', '0620.2.6.3'],
      tier: 'extended',
      commandWord: 'Suggest',
      marks: 2,
      stem: 'Diamond, graphite and silicon(IV) oxide all have melting points above 1500 °C. Suggest why all three melt at such high temperatures.',
      markScheme: [
        {
          text: 'All three are giant covalent structures in which every atom is joined to its neighbours by strong covalent bonds',
          marks: 1,
        },
        {
          text: 'so melting requires breaking a very large number of these strong bonds, which takes a great deal of energy',
          marks: 1,
        },
      ],
      examinerNote: {
        en: 'Graphite is included on purpose. The weak forces between its layers do not lower its melting point, because melting means breaking the covalent bonds inside the layers.',
        zh: '题目特意包含了石墨。层间的弱作用力并不会降低它的熔点，因为熔化意味着打断层内的共价键。',
      },
    },
  ],
}

export default lesson
