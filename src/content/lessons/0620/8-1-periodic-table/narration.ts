import type { NarrationScript } from '@/content/types'

export const periodicNarration: NarrationScript = {
  id: '8-1-periodic-table',
  sections: [
    {
      id: 'intro',
      type: 'intro',
      title: { en: 'The table is a picture of electrons', zh: '周期表是一幅电子排布图' },
      lines: [
        {
          id: 'intro-1',
          text: {
            en: 'The Periodic Table looks like a reference chart, something to look things up in. It is not. It is a picture of how electrons are arranged, and once you see that, most of this topic answers itself.',
            zh: '周期表看起来像一张查阅用的参照表。它不是。它是一幅电子排布的图，一旦看懂这一点，本主题的大部分问题都会自己给出答案。',
          },
          action: { type: 'setParams', params: { protonNumber: 1 } },
        },
        {
          id: 'intro-2',
          text: {
            en: 'The elements are laid out in order of proton number — one, two, three, all the way along. Nothing clever about the order. What is clever is where the rows break.',
            zh: '元素按质子数排列——1、2、3，一路排下去。排序本身没什么巧妙之处。巧妙的是换行的位置。',
          },
        },
        {
          id: 'intro-3',
          text: {
            en: 'Watch as I slide along. Hydrogen, helium — and then a new row starts. Because the first shell holds two electrons, and after two it is full. The row broke exactly where the shell filled up.',
            zh: '看我滑动时的变化。氢、氦——然后换到新的一行。因为第一层只能容纳两个电子，填满两个就满了。行的断点，正好是电子层填满的地方。',
          },
          action: { type: 'setParams', params: { protonNumber: 3 } },
          pause: 1,
        },
      ],
    },
    {
      id: 'address',
      type: 'interaction',
      title: { en: 'Reading an element’s address', zh: '读懂元素的"地址"' },
      lines: [
        {
          id: 'addr-1',
          text: {
            en: 'Sodium. Two electrons, then eight, then one — 2,8,1. Three shells, so Period 3. One electron in the outer shell, so Group I. Its position in the table and its electronic configuration are the same information written two ways.',
            zh: '钠。先 2 个、再 8 个、最后 1 个——2,8,1。三层，所以是第 3 周期。最外层 1 个电子，所以是第 I 主族。它在表中的位置和它的电子排布，是同一件事的两种写法。',
          },
          action: { type: 'setParams', params: { protonNumber: 11 } },
        },
        {
          id: 'addr-2',
          text: {
            en: 'That works both ways, and the exam uses it both ways. Given the configuration, you can place the element. Given the position, you can write the configuration. You never have to memorise a single one.',
            zh: '这个关系是双向的，考试两个方向都会考。给你电子排布，你能定位元素；给你位置，你能写出电子排布。一个都不需要死记。',
          },
        },
        {
          id: 'addr-3',
          text: {
            en: 'Now chlorine: 2,8,7. Group VII, Period 3. Seven outer electrons, one short of full — so it gains one and forms a one-minus ion. The group number tells you the charge straight away.',
            zh: '再看氯：2,8,7。第 VII 主族、第 3 周期。最外层 7 个电子，差一个就满——所以它得到一个电子，形成 1− 的离子。族数直接告诉你离子的电荷。',
          },
          action: { type: 'setParams', params: { protonNumber: 17 } },
          pause: 1,
        },
        {
          id: 'addr-4',
          text: {
            en: 'Groups I, II and III lose that many electrons and form plus one, plus two, plus three. Groups V, VI and VII gain three, two and one, forming minus three, minus two, minus one. Group IV would have to move four either way, so it shares instead.',
            zh: '第 I、II、III 主族失去相应数目的电子，形成 +1、+2、+3。第 V、VI、VII 主族分别得到 3、2、1 个电子，形成 −3、−2、−1。第 IV 主族两边都得移动四个电子，所以它选择共用。',
          },
        },
      ],
    },
    {
      id: 'across',
      type: 'concept',
      title: { en: 'Across a period', zh: '横跨一个周期' },
      lines: [
        {
          id: 'across-1',
          text: {
            en: 'Move along Period 3 from left to right. Sodium, magnesium, aluminium — metals, on the left. Then silicon, on the borderline. Then phosphorus, sulfur, chlorine — non-metals, on the right.',
            zh: '沿第 3 周期从左往右走。钠、镁、铝——金属，在左侧。然后是硅，处在分界线上。再往后是磷、硫、氯——非金属，在右侧。',
          },
          action: { type: 'setParams', params: { protonNumber: 14 } },
        },
        {
          id: 'across-2',
          text: {
            en: 'Metallic character falls as you cross a period. And notice it is a gradual change, not a line — silicon sits between the two and has some properties of each. Any exam answer that says "there is a line" is overstating it.',
            zh: '横跨周期时金属性逐渐减弱。注意这是渐变而不是突变——硅介于两者之间，兼有双方的一些性质。答题时说"有一条明确的分界线"就说过头了。',
          },
        },
      ],
    },
    {
      id: 'down',
      type: 'interaction',
      title: { en: 'Down a group', zh: '沿族向下' },
      lines: [
        {
          id: 'down-1',
          text: {
            en: 'Now go down instead. Lithium, sodium, potassium — all Group I, all with one outer electron. They behave alike for exactly that reason: chemistry is decided by the outer shell, and theirs is identical.',
            zh: '现在改为向下走。锂、钠、钾——都在第 I 主族，最外层都只有一个电子。它们性质相似的原因正在于此：化学性质由最外层决定，而它们的最外层完全相同。',
          },
          action: { type: 'setParams', params: { protonNumber: 19 } },
        },
        {
          id: 'down-2',
          text: {
            en: 'That is what a group *is*. Not a category someone invented — a column of elements that share an outer-shell count, and therefore share their chemistry.',
            zh: '这就是"族"的本质。它不是谁凭空发明的分类——而是最外层电子数相同、因而化学性质相同的一列元素。',
          },
        },
      ],
    },
    {
      id: 'blocks',
      type: 'concept',
      title: { en: 'The two special blocks', zh: '两个特殊的区' },
      lines: [
        {
          id: 'block-1',
          text: {
            en: 'Right at the end of every period sit the noble gases: helium, neon, argon, krypton. Full outer shells, all of them. There is nothing to be gained by losing, gaining or sharing an electron, so they do not react. They do not even pair up — they exist as single atoms.',
            zh: '每个周期的末尾都是稀有气体：氦、氖、氩、氪。它们的最外层全都填满了。失去、得到或共用电子都无利可图，所以它们不反应。它们甚至不成对——以单原子形式存在。',
          },
          action: { type: 'setParams', params: { protonNumber: 18 } },
          pause: 1,
        },
        {
          id: 'block-2',
          text: {
            en: 'And in the middle of Period 4, that block of ten. Scandium through zinc — the transition elements. Iron, copper, nickel, chromium: the metals you have actually held.',
            zh: '而在第 4 周期中间，是那一块十个元素。从钪到锌——过渡元素。铁、铜、镍、铬：你真正拿在手里过的那些金属。',
          },
          action: { type: 'setParams', params: { protonNumber: 26 } },
        },
        {
          id: 'block-3',
          text: {
            en: 'Four things to remember about them. Dense and hard, with high melting points. They form coloured compounds — copper sulfate is blue, potassium manganate purple. They have variable oxidation numbers, so iron can be two-plus or three-plus. And they make good catalysts.',
            zh: '关于它们要记住四点：密度大、硬度高、熔点高；形成有色化合物——硫酸铜是蓝色，高锰酸钾是紫色；具有可变氧化数，所以铁可以是 +2 也可以是 +3；而且是良好的催化剂。',
          },
        },
        {
          id: 'block-4',
          text: {
            en: 'Compare that with a Group I metal, which is soft enough to cut with a knife and forms only white compounds. Those four differences are the answer to any "compare a transition element with a Group I metal" question.',
            zh: '把这些和第 I 主族金属对比：后者软到能用小刀切开，而且只形成白色化合物。这四点差别就是任何"比较过渡元素与第 I 主族金属"题目的答案。',
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
          id: 'summary-1',
          text: {
            en: 'Period equals the number of shells. Group equals the number of outer electrons. Group number gives the ionic charge. Learn those three and you can derive almost everything else in this topic on the spot.',
            zh: '周期数等于电子层数。族数等于最外层电子数。族数给出离子电荷。把这三条记住，本主题其余几乎所有内容都能当场推出来。',
          },
        },
        {
          id: 'summary-2',
          text: {
            en: 'And when asked *why* a group behaves alike, the answer is always the outer shell — not "they are in the same group", which just repeats the question back.',
            zh: '当被问到某一族*为什么*性质相似时，答案永远是最外层电子——而不是"因为它们在同一族"，那只是把问题重复了一遍。',
          },
        },
      ],
    },
  ],
}

export default periodicNarration
