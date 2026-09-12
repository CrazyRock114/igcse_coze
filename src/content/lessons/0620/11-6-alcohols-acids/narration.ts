import type { NarrationScript } from '@/content/types'

export const alcoholsNarration: NarrationScript = {
  id: '11-6-alcohols-acids',
  sections: [
    {
      id: 'isomers',
      type: 'interaction',
      title: { en: 'Same formula, different substance', zh: '同一化学式，不同物质' },
      lines: [
        {
          id: 'is-1',
          text: {
            en: 'Here is butane: four carbons in a row, ten hydrogens, C₄H₁₀. Count the bonds on every carbon and you will find four each, as always.',
            zh: '这是丁烷：4 个碳排成一列，10 个氢，C₄H₁₀。数一数每个碳上的键，一如既往都是 4 条。',
          },
          action: { type: 'setParams', params: { structure: 0 } },
        },
        {
          id: 'is-2',
          text: {
            en: 'Now the same atoms, joined differently. Three carbons in the chain and the fourth branching off the middle one. Count them: still four carbons, still ten hydrogens, still C₄H₁₀ — and yet this is a different substance, with its own boiling point and its own name, methylpropane.',
            zh: '现在是同样的原子，但连接方式不同。链上 3 个碳，第 4 个从中间那个碳分出来。数一数：仍是 4 个碳、10 个氢，仍是 C₄H₁₀——然而这是另一种物质，有自己的沸点和自己的名称，甲基丙烷。',
          },
          action: { type: 'setParams', params: { structure: 1 } },
        },
        {
          id: 'is-3',
          text: {
            en: 'Compounds like these are structural isomers: same molecular formula, different arrangement of the atoms. Which means a molecular formula does not identify a compound. C₄H₁₀ tells you what is in the box, not how it is put together.',
            zh: '这样的化合物叫结构异构体：分子式相同，原子排列不同。这意味着分子式并不能确定一种化合物。C₄H₁₀ 只告诉你盒子里有什么，不告诉你它是怎么组装的。',
          },
        },
        {
          id: 'is-4',
          text: {
            en: 'The same happens with a functional group. Propan-1-ol has the –OH on an end carbon. Propan-2-ol has it on the middle one. Both are C₃H₈O, and the only difference is which carbon the group sits on.',
            zh: '官能团也有同样的情况。丙-1-醇的 –OH 在末端碳上。丙-2-醇的在中间碳上。两者都是 C₃H₈O，唯一的区别是官能团接在哪个碳上。',
          },
          action: { type: 'setParams', params: { structure: 2 } },
        },
        {
          id: 'is-5',
          text: {
            en: 'Which is what the number in the name is for. It is not decoration — it says which carbon carries the group, counting from the end that gives the smaller number. Switch to propan-2-ol and watch the –OH move to the middle.',
            zh: '这正是名称中那个数字的用途。它不是装饰——它说明官能团接在第几个碳上，从能得到较小编号的一端数起。切换到丙-2-醇，看 –OH 移到中间。',
          },
          action: { type: 'setParams', params: { structure: 3 } },
        },
      ],
    },
    {
      id: 'ethanol',
      type: 'concept',
      title: { en: 'Two ways to make the same alcohol', zh: '制取同一种醇的两条路' },
      lines: [
        {
          id: 'et-1',
          text: {
            en: 'Ethanol is made industrially in two completely different ways, and comparing them is a favourite question.',
            zh: '工业上制乙醇有两条完全不同的路线，比较它们是常考的题目。',
          },
        },
        {
          id: 'et-2',
          text: {
            en: 'Fermentation uses yeast to convert glucose from a plant crop into ethanol and carbon dioxide, at about thirty degrees, without air. Warm enough for the enzymes in the yeast to work, but not so warm that they are denatured.',
            zh: '发酵法用酵母把作物中的葡萄糖转化为乙醇和二氧化碳，温度约 30 度，隔绝空气。温度要够高让酵母中的酶起作用，但又不能高到使酶变性。',
          },
        },
        {
          id: 'et-3',
          text: {
            en: 'Catalytic addition takes ethene from cracked petroleum and adds steam across the double bond, over a catalyst at about three hundred degrees and sixty atmospheres. One reaction, one product, no leftovers.',
            zh: '催化加成法取用裂化石油得到的乙烯，在催化剂作用下于约 300 度、60 个大气压下与水蒸气加成。一步反应，一种产物，没有残余。',
          },
        },
        {
          id: 'et-4',
          text: {
            en: 'Now compare them properly, because each has a real advantage. Fermentation uses a renewable crop and runs at low temperature and pressure, so the equipment is cheap and the energy cost is low. But it is a batch process — set it up, wait, clean out, start again — it is slow, and the ethanol comes out impure and dilute, needing distillation.',
            zh: '现在认真比较，因为各有真正的优势。发酵法使用可再生的作物，在低温低压下进行，设备便宜、能耗低。但它是间歇式的——装料、等待、清理、再开始——速度慢，而且得到的乙醇不纯、浓度低，需要蒸馏。',
          },
        },
        {
          id: 'et-5',
          text: {
            en: 'Catalytic addition is continuous and fast, and gives pure ethanol directly. But it needs a high temperature and a very high pressure, so the energy cost is large, and it starts from petroleum — a finite resource that will one day run out.',
            zh: '催化加成法是连续的、快速的，直接得到纯乙醇。但它需要高温和很高的压强，能耗大，而且原料是石油——一种终将耗尽的有限资源。',
          },
        },
        {
          id: 'et-6',
          text: {
            en: 'Ethanol burns completely in plenty of air to give carbon dioxide and water, releasing a good deal of energy — which is why it is used as a fuel, on its own or blended into petrol. It is also a solvent, in perfumes, inks and medicines, and it is the alcohol in alcoholic drinks.',
            zh: '乙醇在充足空气中完全燃烧生成二氧化碳和水，放出大量能量——这就是它被用作燃料的原因，可单独使用或掺入汽油。它也是溶剂，用于香水、油墨和药品，而且它就是酒精饮料中的酒精。',
          },
        },
      ],
    },
    {
      id: 'acids',
      type: 'concept',
      title: { en: 'Leave the wine open too long', zh: '酒放久了会怎样' },
      lines: [
        {
          id: 'ac-1',
          text: {
            en: 'Leave ethanol exposed to air and it slowly oxidises to ethanoic acid — which is what has happened when wine turns to vinegar. In the laboratory the same conversion is done deliberately, by warming ethanol with an oxidising agent such as acidified potassium manganate(VII).',
            zh: '把乙醇暴露在空气中，它会慢慢被氧化成乙酸——酒变成醋就是这个过程。实验室里则是有意进行这个转化：把乙醇与酸化高锰酸钾(VII)等氧化剂共热。',
          },
        },
        {
          id: 'ac-2',
          text: {
            en: 'Ethanoic acid is a carboxylic acid, and it behaves like the acids met in topic 7 — just more weakly. With a reactive metal such as magnesium it gives a salt and hydrogen. With a base such as sodium hydroxide it gives a salt and water. With a carbonate it gives a salt, water and carbon dioxide, which fizzes.',
            zh: '乙酸是羧酸，其表现与主题 7 中的酸相同——只是弱一些。与镁等活泼金属反应生成盐和氢气。与氢氧化钠等碱反应生成盐和水。与碳酸盐反应生成盐、水和二氧化碳，会冒泡。',
          },
        },
        {
          id: 'ac-3',
          text: {
            en: 'The salts are called ethanoates — sodium ethanoate, magnesium ethanoate. The naming follows the acid, exactly as sulfuric acid gives sulfates.',
            zh: '这些盐叫乙酸盐——乙酸钠、乙酸镁。命名跟着酸走，正如硫酸生成硫酸盐一样。',
          },
        },
        {
          id: 'ac-4',
          text: {
            en: 'And one reaction that only carboxylic acids do. Warm a carboxylic acid with an alcohol and a little concentrated sulfuric acid as catalyst, and you get an ester and water. Ethanoic acid plus ethanol gives ethyl ethanoate.',
            zh: '还有一个只有羧酸才有的反应。把羧酸与醇及少量浓硫酸作催化剂共热，得到酯和水。乙酸加乙醇生成乙酸乙酯。',
          },
        },
        {
          id: 'ac-5',
          text: {
            en: 'Esters smell strongly of fruit and flowers, and that is not a curiosity — it is why they are made. Most artificial fruit flavourings and many perfumes are esters. Note the name has two halves: the alcohol gives the first part, the acid the second.',
            zh: '酯有浓郁的果香和花香，这不是趣闻——正是制取它们的原因。大多数人造水果香精和许多香水都是酯。注意酯的名称分两部分：前半来自醇，后半来自酸。',
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
            en: 'Structural isomers have the same molecular formula and a different structure. Butane and methylpropane are both C₄H₁₀; propan-1-ol and propan-2-ol are both C₃H₈O. The number in the name says which carbon carries the group.',
            zh: '结构异构体分子式相同、结构不同。丁烷和甲基丙烷都是 C₄H₁₀；丙-1-醇和丙-2-醇都是 C₃H₈O。名称中的数字表示官能团接在第几个碳上。',
          },
        },
        {
          id: 'sum-2',
          text: {
            en: 'Ethanol by fermentation: yeast, glucose, about 30 °C, no air — renewable and cheap, but slow, batch and impure. By catalytic addition: ethene plus steam, catalyst, about 300 °C and 60 atm — fast, continuous and pure, but energy-hungry and from a finite resource.',
            zh: '发酵法制乙醇：酵母、葡萄糖、约 30 °C、隔绝空气——可再生且便宜，但慢、间歇、不纯。催化加成法：乙烯与水蒸气、催化剂、约 300 °C、60 atm——快、连续、纯净，但耗能大且原料有限。',
          },
        },
        {
          id: 'sum-3',
          text: {
            en: 'Ethanol oxidises to ethanoic acid. Ethanoic acid reacts with metals to give a salt and hydrogen, with bases to give a salt and water, and with carbonates to give a salt, water and carbon dioxide. Acid plus alcohol gives an ester plus water.',
            zh: '乙醇被氧化为乙酸。乙酸与金属反应生成盐和氢气，与碱反应生成盐和水，与碳酸盐反应生成盐、水和二氧化碳。酸与醇反应生成酯和水。',
          },
        },
      ],
    },
  ],
}

export default alcoholsNarration
