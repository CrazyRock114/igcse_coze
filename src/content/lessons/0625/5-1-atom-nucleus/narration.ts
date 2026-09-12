import type { NarrationScript } from '@/content/types'

export const nuclideNarration: NarrationScript = {
  id: '5-1-atom-nucleus',
  sections: [
    {
      id: 'structure',
      type: 'intro',
      title: { en: 'Almost entirely empty', zh: '几乎完全是空的' },
      lines: [
        {
          id: 'st-1',
          text: {
            en: 'An atom is a very small, very dense nucleus with a positive charge, surrounded by negatively charged electrons in orbits around it. The nucleus holds almost all the mass and takes up almost none of the room.',
            zh: '原子由一个非常小、非常致密的带正电原子核，以及绕核运动的带负电电子组成。原子核占了几乎全部质量，却几乎不占空间。',
          },
        },
        {
          id: 'st-2',
          text: {
            en: 'Some numbers, because they are hard to believe otherwise. An atom is about ten to the minus ten metres across; its nucleus is about ten to the minus fifteen. The atom is a hundred thousand times wider than its nucleus. Scale the nucleus up to a marble on the centre spot of a football stadium, and the nearest electrons are somewhere up in the back row.',
            zh: '这里给几个数字，否则很难相信。原子直径约为 10⁻¹⁰ 米，原子核约为 10⁻¹⁵ 米。原子的宽度是原子核的十万倍。若把原子核放大成足球场中圈的一颗弹珠，最近的电子大约在看台最后一排。',
          },
        },
        {
          id: 'st-3',
          text: {
            en: 'Inside the nucleus are protons and neutrons, together called nucleons. A proton has a relative charge of plus one, an electron minus one, and a neutron is neutral — zero. Protons and neutrons each have a relative mass of one; an electron is about two thousand times lighter, which is why we treat its mass as negligible.',
            zh: '原子核内是质子和中子，统称核子。质子的相对电荷为 +1，电子为 −1，中子为中性——0。质子和中子的相对质量都是 1；电子约轻两千倍，因此把它的质量视为可忽略。',
          },
        },
        {
          id: 'st-4',
          text: {
            en: 'A neutral atom has as many electrons as protons, so the charges cancel exactly. Remove one or more electrons and what is left has a net positive charge — a positive ion. Add electrons and you get a negative ion. In both cases the nucleus is untouched: making an ion means moving electrons, never changing the nucleus.',
            zh: '中性原子的电子数与质子数相同，电荷恰好抵消。移走一个或多个电子，剩下的部分带净正电——就是正离子。得到电子则形成负离子。两种情况下原子核都未被触动：形成离子是移动电子，绝不是改变原子核。',
          },
        },
      ],
    },
    {
      id: 'scattering',
      type: 'concept',
      title: { en: 'How anyone knew', zh: '人们是怎么知道的' },
      lines: [
        {
          id: 'sc-1',
          text: {
            en: 'None of that is obvious, and the experiment that established it is worth knowing in detail. A thin gold foil was bombarded with alpha particles — which are positively charged and comparatively heavy — and a detector was moved around the foil to count how many arrived in each direction.',
            zh: '这些都不是显而易见的，确立它们的那个实验值得细致了解。用α粒子——带正电、质量相对较大——轰击金箔，并把探测器绕金箔移动，统计各个方向上到达的粒子数目。',
          },
        },
        {
          id: 'sc-2',
          text: {
            en: 'Three results. The great majority of alpha particles went straight through with no deflection at all. A small number were deflected through noticeable angles. And a very few — about one in eight thousand — came back towards the source.',
            zh: '有三个结果。绝大多数α粒子径直穿过，完全没有偏转。少数被偏转了明显的角度。而极少数——大约八千分之一——被弹回到源的方向。',
          },
        },
        {
          id: 'sc-3',
          text: {
            en: 'Now read each result as evidence. Most went straight through, so the atom must be mostly empty space. Some were deflected, so there is something positively charged in there repelling them. And a few came almost straight back — which needs that positive charge to be concentrated in a tiny volume and to be massive enough not to be shoved aside.',
            zh: '现在把每个结果都当作证据来读。大多数径直穿过，说明原子内部大部分是空的。有些被偏转，说明其中有带正电的东西在排斥它们。而少数几乎原路返回——这就要求那些正电荷集中在极小的体积内，并且质量大到不会被撞开。',
          },
        },
        {
          id: 'sc-4',
          text: {
            en: 'That last one is the decisive result, and it is the one to quote in an answer. The model it replaced had the positive charge spread evenly through the atom, and spread-out charge cannot turn a fast alpha particle round. Only a tiny, dense, massive, positively charged nucleus can. The rarity of the bounce-back is itself the measure of how small the nucleus is.',
            zh: '最后这一条是决定性的结果，也是答题时应当引用的。被它推翻的那个模型认为正电荷均匀分布在整个原子中，而分散的电荷无法把高速α粒子掉转回来。只有一个微小、致密、质量大且带正电的核才能做到。弹回现象之稀少，本身就衡量了原子核有多小。',
          },
        },
      ],
    },
    {
      id: 'notation',
      type: 'interaction',
      title: { en: 'Three sliders, three different things', zh: '三个滑块，三件不同的事' },
      lines: [
        {
          id: 'no-1',
          text: {
            en: 'The proton number, Z, is the number of protons in the nucleus. The nucleon number, A, is the total number of protons and neutrons. So the number of neutrons is A minus Z — that subtraction is the single most common calculation in this topic.',
            zh: '质子数 Z 是核内质子的数目。核子数 A 是质子与中子的总数。因此中子数是 A 减 Z——这个减法是本主题中最常见的计算。',
          },
          action: { type: 'setParams', params: { protonNumber: 6, neutrons: 6, charge: 0 } },
        },
        {
          id: 'no-2',
          text: {
            en: 'They are written as a nuclide symbol: the chemical symbol with the nucleon number above and the proton number below. Carbon-12 is written as C with twelve above and six below. Read it and you know everything about the nucleus — six protons, six neutrons.',
            zh: '它们写成核素符号：元素符号左侧上方是核子数，下方是质子数。碳-12 写作 C，上标 12，下标 6。读懂它就知道了核的全部信息——6 个质子，6 个中子。',
          },
        },
        {
          id: 'no-3',
          text: {
            en: 'Now add two neutrons and watch what happens to the name. Nothing. It is still carbon, because it still has six protons — the proton number is what makes an element that element. What you have made is carbon-14, an isotope: same proton number, different nucleon number.',
            zh: '现在加两个中子，看看名称有什么变化。没有变化。它仍是碳，因为仍有 6 个质子——质子数决定了一种元素是什么元素。你得到的是碳-14，一种同位素：质子数相同，核子数不同。',
          },
          action: { type: 'setParams', params: { protonNumber: 6, neutrons: 8, charge: 0 } },
        },
        {
          id: 'no-4',
          text: {
            en: 'And notice the electrons did not change either. Six, before and after. That is why isotopes of an element are chemically identical — chemistry is entirely about electrons, and adding a neutron does not touch them. Carbon-14 is radioactive and carbon-12 is not, but a plant cannot tell them apart.',
            zh: '还要注意电子也没有变。前后都是 6 个。这正是同一元素的各同位素化学性质完全相同的原因——化学只关乎电子，而增加中子不会影响它们。碳-14 有放射性而碳-12 没有，但植物无法区分二者。',
          },
        },
        {
          id: 'no-5',
          text: {
            en: 'Now change the charge instead, to plus two. Two electrons come off, so the particle is a positive ion. Look at the nucleus though — six protons and eight neutrons, exactly as before. Its relative charge is still plus six and its relative mass is still fourteen. An ion is an atom that has lost or gained electrons; nothing has happened to the nucleus at all.',
            zh: '现在改为改变电荷，设为 +2。移走两个电子，粒子成为正离子。但看原子核——仍是 6 个质子和 8 个中子，与之前完全一样。它的相对电荷仍是 +6，相对质量仍是 14。离子是失去或得到电子的原子；原子核毫无变化。',
          },
          action: { type: 'setParams', params: { protonNumber: 6, neutrons: 8, charge: 2 } },
        },
        {
          id: 'no-6',
          text: {
            en: 'That gives two facts worth stating plainly. The relative charge on a nucleus equals the proton number, because each proton carries plus one and neutrons carry nothing. And the relative mass of a nucleus equals the nucleon number, because each proton and each neutron has a relative mass of one.',
            zh: '由此得到两个值得明确说出的事实。原子核的相对电荷等于质子数，因为每个质子带 +1 而中子不带电。原子核的相对质量等于核子数，因为每个质子和每个中子的相对质量都是 1。',
          },
        },
        {
          id: 'no-7',
          text: {
            en: 'Move the proton slider now and the name finally changes. That is the whole hierarchy: protons decide what it is, neutrons decide which isotope of it, electrons decide its charge.',
            zh: '现在移动质子滑块，名称终于变了。整个层次就是这样：质子决定它是什么，中子决定它是哪一种同位素，电子决定它的电荷。',
          },
          action: { type: 'setParams', params: { protonNumber: 7, neutrons: 7, charge: 0 } },
        },
      ],
    },
    {
      id: 'fission',
      type: 'concept',
      title: { en: 'Splitting and joining', zh: '分裂与结合' },
      lines: [
        {
          id: 'fi-1',
          text: {
            en: 'Nuclear fission is a large nucleus splitting into two smaller ones. A uranium-235 nucleus absorbs a slow neutron, becomes unstable, and breaks apart — releasing energy and, crucially, two or three more neutrons, which can go on to split further nuclei. That is the chain reaction a reactor controls and a bomb does not.',
            zh: '核裂变是大核分裂成两个较小的核。铀-235 核吸收一个慢中子后变得不稳定并裂开——放出能量，而且关键是放出两三个中子，这些中子又能继续使别的核裂变。这就是反应堆加以控制、而炸弹不加控制的链式反应。',
          },
        },
        {
          id: 'fi-2',
          text: {
            en: 'A typical equation: uranium-235 plus a neutron gives barium-141, krypton-92 and three neutrons. Check it the way an examiner will. Nucleon numbers: 235 plus 1 is 236, and 141 plus 92 plus 3 is also 236. Proton numbers: 92 plus 0 is 92, and 56 plus 36 plus 0 is 92. Both sides balance, and both must.',
            zh: '一个典型方程：铀-235 加一个中子，生成钡-141、氪-92 和 3 个中子。按考官的方式核对一下。核子数：235 + 1 = 236，而 141 + 92 + 3 = 236。质子数：92 + 0 = 92，而 56 + 36 + 0 = 92。两边都平衡，也都必须平衡。',
          },
        },
        {
          id: 'fi-3',
          text: {
            en: 'Nuclear fusion is the opposite: two very light nuclei joining to make a heavier one. Two isotopes of hydrogen, deuterium and tritium, fuse to give helium-4 and a neutron. Nucleon numbers, 2 plus 3 is 5, and 4 plus 1 is 5. Proton numbers, 1 plus 1 is 2, and 2 plus 0 is 2. Same check, every time.',
            zh: '核聚变则相反：两个很轻的核结合成一个较重的核。氢的两种同位素氘和氚聚变生成氦-4 和一个中子。核子数：2 + 3 = 5，4 + 1 = 5。质子数：1 + 1 = 2，2 + 0 = 2。每次都是同样的核对方法。',
          },
        },
        {
          id: 'fi-4',
          text: {
            en: 'Fusion is what powers the Sun, and it needs enormous temperatures and pressures — because two nuclei are both positive and repel each other fiercely, and they have to be thrown together hard enough to overcome that. Fission needs no such conditions, which is why we have fission power stations and are still trying to build a fusion one.',
            zh: '聚变是太阳的能量来源，它需要极高的温度和压强——因为两个原子核都带正电、彼此强烈排斥，必须以足够大的力量撞到一起才能克服排斥。裂变不需要这样的条件，这正是我们已有裂变电站而仍在努力建造聚变电站的原因。',
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
            en: 'A tiny dense positive nucleus of protons and neutrons, with electrons in orbits around it. Relative charges: proton plus one, electron minus one, neutron zero. Relative masses: proton and neutron one each, electron negligible.',
            zh: '一个由质子和中子组成的微小致密带正电的核，电子绕核运动。相对电荷：质子 +1，电子 −1，中子 0。相对质量：质子和中子各为 1，电子可忽略。',
          },
        },
        {
          id: 'sum-2',
          text: {
            en: 'Proton number Z, nucleon number A, neutrons A minus Z. Isotopes have the same Z and different A, so they are chemically identical. The relative charge on a nucleus is Z and its relative mass is A.',
            zh: '质子数 Z，核子数 A，中子数为 A − Z。同位素 Z 相同而 A 不同，因此化学性质完全相同。原子核的相对电荷为 Z，相对质量为 A。',
          },
        },
        {
          id: 'sum-3',
          text: {
            en: 'For alpha scattering, quote all three observations and what each one shows — especially the few that came back, which is what proves the nucleus is tiny, dense and charged. And in any nuclide equation, check that the nucleon numbers balance and the proton numbers balance before you write anything else.',
            zh: 'α散射实验要写出全部三个现象及各自说明的问题——尤其是少数被弹回的粒子，正是它证明了原子核微小、致密且带电。而在任何核素方程中，先核对核子数与质子数两边是否平衡，再写别的。',
          },
        },
      ],
    },
  ],
}

export default nuclideNarration
