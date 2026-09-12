/**
 * Cambridge IGCSE Chemistry 0620 — subject content map, 2026–2028 cycle.
 *
 * COMPLIANCE NOTE
 * ---------------
 * As with the physics map: statement *numbering* and Core/Supplement *tiering* are
 * factual references to the published syllabus, extracted from the official 2026–2028
 * PDF. The `label` strings are **our own paraphrases written for this course** — the
 * awarding body's wording is not reproduced. The syllabus is © Cambridge University
 * Press & Assessment; this project is not endorsed by or affiliated with Cambridge.
 */

import type { Bilingual, Syllabus, SyllabusStatement, SyllabusSubtopic, Tier } from '../types'

type Row = [number, 'C' | 'S', string, string]

function sub(id: string, en: string, zh: string, rows: Row[]): SyllabusSubtopic {
  const statements: SyllabusStatement[] = rows.map(([n, t, sen, szh]) => ({
    id: `0620.${id}.${n}`,
    n,
    tier: (t === 'C' ? 'core' : 'supplement') satisfies Tier as Tier,
    label: { en: sen, zh: szh },
  }))
  return { id, title: { en, zh }, statements }
}

function topic(
  number: number,
  title: Bilingual,
  subtopics: SyllabusSubtopic[]
): Syllabus['topics'][number] {
  return { number, title, subtopics }
}

// ---------------------------------------------------------------------------
// 1 States of matter
// ---------------------------------------------------------------------------

const topic1 = topic(1, { en: 'States of matter', zh: '物质的状态' }, [
  sub('1.1', 'Solids, liquids and gases', '固体、液体和气体', [
    [1, 'C', 'State the distinguishing properties of solids, liquids and gases', '说出固、液、气三态的区别性质'],
    [2, 'C', 'Describe the three states in terms of particle arrangement, separation and motion', '用粒子的排列、间距与运动描述三态'],
    [3, 'C', 'Describe changes of state: melting, boiling, evaporating, freezing, condensing', '描述熔化、沸腾、蒸发、凝固、凝结等物态变化'],
    [4, 'C', 'Describe the effect of temperature and pressure on the volume of a gas', '描述温度与压强对气体体积的影响'],
    [5, 'S', 'Explain changes of state using kinetic particle theory', '用分子动理论解释物态变化'],
    [6, 'S', 'Explain the effects of temperature and pressure on gas volume using particle theory', '用粒子理论解释温度与压强对气体体积的影响'],
  ]),
  sub('1.2', 'Diffusion', '扩散', [
    [1, 'C', 'Describe and explain diffusion using kinetic particle theory', '用分子动理论描述并解释扩散'],
    [2, 'S', 'Explain how relative molecular mass affects the rate of diffusion', '解释相对分子质量如何影响扩散速率'],
  ]),
])

// ---------------------------------------------------------------------------
// 2 Atoms, elements and compounds
// ---------------------------------------------------------------------------

const topic2 = topic(2, { en: 'Atoms, elements and compounds', zh: '原子、元素与化合物' }, [
  sub('2.1', 'Elements, compounds and mixtures', '元素、化合物与混合物', [
    [1, 'C', 'Describe the differences between elements, compounds and mixtures', '说明元素、化合物与混合物的区别'],
  ]),
  sub('2.2', 'Atomic structure and the Periodic Table', '原子结构与元素周期表', [
    [1, 'C', 'Describe the atom as a nucleus of protons and neutrons with electrons in shells', '把原子描述为质子中子构成的核与壳层中的电子'],
    [2, 'C', 'State the relative charges and masses of protons, neutrons and electrons', '说出质子、中子、电子的相对电荷与质量'],
    [3, 'C', 'Define proton number (atomic number)', '定义质子数（原子序数）'],
    [4, 'C', 'Define mass number (nucleon number)', '定义质量数（核子数）'],
    [5, 'C', 'Determine the electronic configuration of elements and their ions', '确定元素及其离子的电子排布'],
  ]),
  sub('2.3', 'Isotopes', '同位素', [
    [1, 'C', 'Define isotopes as atoms of the same element with different numbers of neutrons', '把同位素定义为中子数不同的同种元素原子'],
    [2, 'C', 'Interpret and use symbols for atoms and ions', '解读并使用原子与离子的符号'],
    [3, 'S', 'State that isotopes of an element have the same chemical properties', '说明同位素化学性质相同'],
    [4, 'S', 'Calculate relative atomic mass from relative abundances', '由相对丰度计算相对原子质量'],
  ]),
  sub('2.4', 'Ions and ionic bonds', '离子与离子键', [
    [1, 'C', 'Describe the formation of cations and anions by electron loss and gain', '描述失得电子形成阳离子与阴离子'],
    [2, 'C', 'State that an ionic bond is a strong electrostatic attraction between oppositely charged ions', '说明离子键是异号离子间的强静电引力'],
    [3, 'C', 'Describe the formation of ionic bonds between Group I and Group VII elements', '描述第 I 主族与第 VII 主族元素间离子键的形成'],
    [4, 'C', 'Describe the properties of ionic compounds', '描述离子化合物的性质'],
    [5, 'S', 'Describe the giant lattice structure of ionic compounds', '描述离子化合物的巨型晶格结构'],
    [6, 'S', 'Describe ionic bond formation between metallic and non-metallic elements generally', '一般性地描述金属与非金属元素间离子键的形成'],
    [7, 'S', 'Explain the properties of ionic compounds in terms of structure and bonding', '用结构与成键解释离子化合物的性质'],
  ]),
  sub('2.5', 'Simple molecules and covalent bonds', '简单分子与共价键', [
    [1, 'C', 'State that a covalent bond is a shared pair of electrons', '说明共价键是共用电子对'],
    [2, 'C', 'Describe covalent bond formation in simple molecules using dot-and-cross diagrams', '用电子式描述简单分子中共价键的形成'],
    [3, 'C', 'Describe the properties of simple molecular compounds in terms of structure and bonding', '用结构与成键描述简单分子化合物的性质'],
    [4, 'S', 'Describe covalent bond formation in more complex molecules', '描述较复杂分子中共价键的形成'],
    [5, 'S', 'Explain the properties of simple molecular compounds using intermolecular forces', '用分子间作用力解释简单分子化合物的性质'],
  ]),
  sub('2.6', 'Giant covalent structures', '巨型共价结构', [
    [1, 'C', 'Describe the giant covalent structures of graphite and diamond', '描述石墨与金刚石的巨型共价结构'],
    [2, 'C', 'Relate their structures and bonding to their uses', '把它们的结构与成键同用途联系起来'],
    [3, 'S', 'Describe the giant covalent structure of silicon(IV) oxide', '描述二氧化硅的巨型共价结构'],
  ]),
  sub('2.7', 'Metallic bonding', '金属键', [
    [1, 'S', 'Describe metallic bonding as attraction between positive ions and a sea of delocalised electrons', '把金属键描述为正离子与自由电子海之间的引力'],
    [2, 'S', 'Explain the properties of metals in terms of structure and bonding', '用结构与成键解释金属的性质'],
  ]),
])

// ---------------------------------------------------------------------------
// 3 Stoichiometry
// ---------------------------------------------------------------------------

const topic3 = topic(3, { en: 'Stoichiometry', zh: '化学计量' }, [
  sub('3.1', 'Formulae', '化学式', [
    [1, 'C', 'State the formulae of the elements and compounds named in the syllabus', '写出考纲中所列元素与化合物的化学式'],
    [2, 'C', 'Define the molecular formula of a compound', '定义化合物的分子式'],
    [3, 'C', 'Deduce a formula from the relative numbers of atoms or from a model', '由原子数目或模型推导化学式'],
    [4, 'C', 'Construct word equations and balanced symbol equations', '写出文字方程式与配平的符号方程式'],
    [5, 'S', 'Define the empirical formula as the simplest whole-number ratio of atoms', '把实验式定义为最简整数原子比'],
    [6, 'S', 'Deduce the formula of an ionic compound from the charges on its ions', '由离子电荷推导离子化合物的化学式'],
    [7, 'S', 'Construct symbol equations with state symbols, including ionic equations', '写出带状态符号的方程式，含离子方程式'],
    [8, 'S', 'Deduce symbol equations with state symbols for unfamiliar reactions', '为陌生反应写出带状态符号的方程式'],
  ]),
  sub('3.2', 'Relative masses of atoms and molecules', '原子与分子的相对质量', [
    [1, 'C', 'Describe relative atomic mass Ar as an average over isotopes', '把相对原子质量 Ar 描述为同位素的平均值'],
    [2, 'C', 'Define relative molecular mass Mr as the sum of relative atomic masses', '把相对分子质量 Mr 定义为相对原子质量之和'],
    [3, 'C', 'Calculate reacting masses in simple proportions', '按简单比例计算反应质量'],
  ]),
  sub('3.3', 'The mole and the Avogadro constant', '摩尔与阿伏加德罗常数', [
    [1, 'C', 'State that concentration can be measured in g / dm³ or mol / dm³', '说明浓度可用 g/dm³ 或 mol/dm³ 表示'],
    [2, 'S', 'State that the mole is the unit of amount of substance, containing 6.02 × 10²³ particles', '说明摩尔是物质的量的单位，含 6.02 × 10²³ 个微粒'],
    [3, 'S', 'Use the relationship between amount of substance, mass and molar mass', '使用物质的量、质量与摩尔质量的关系'],
    [4, 'S', 'Use the molar gas volume, taken as 24 dm³ at r.t.p.', '使用室温常压下 24 dm³ 的气体摩尔体积'],
    [5, 'S', 'Calculate stoichiometric reacting masses, limiting reactants and concentrations', '计算化学计量反应质量、限量反应物与浓度'],
  ]),
])

// ---------------------------------------------------------------------------
// 4 Electrochemistry
// ---------------------------------------------------------------------------

const topic4 = topic(4, { en: 'Electrochemistry', zh: '电化学' }, [
  sub('4.1', 'Electrolysis', '电解', [
    [1, 'C', 'Define electrolysis as the decomposition of an ionic compound by electricity', '把电解定义为用电流分解离子化合物'],
    [2, 'C', 'Identify the anode as positive and the cathode as negative', '辨认阳极为正极、阴极为负极'],
    [3, 'C', 'Identify the products at the electrodes for molten binary compounds', '判断熔融二元化合物在电极上的产物'],
    [4, 'C', 'State that metals or hydrogen form at the cathode and non-metals at the anode', '说明阴极生成金属或氢、阳极生成非金属'],
    [5, 'C', 'Predict the products of electrolysis for aqueous solutions', '预测水溶液电解的产物'],
    [6, 'C', 'State why metal objects are electroplated', '说明金属制品电镀的原因'],
    [7, 'C', 'Describe how metals are electroplated', '描述金属电镀的方法'],
    [8, 'S', 'Describe the transfer of charge during electrolysis', '描述电解过程中的电荷转移'],
    [9, 'S', 'Identify products using the reactivity series and concentration', '用活动性顺序与浓度判断产物'],
    [10, 'S', 'Write ionic half-equations for the reactions at each electrode', '写出各电极反应的离子半反应式'],
  ]),
  sub('4.2', 'Hydrogen–oxygen fuel cells', '氢氧燃料电池', [
    [1, 'C', 'State that a hydrogen–oxygen fuel cell produces electricity and water only', '说明氢氧燃料电池只产生电能和水'],
    [2, 'S', 'Describe the advantages and disadvantages of hydrogen–oxygen fuel cells', '说明氢氧燃料电池的优缺点'],
  ]),
])

// ---------------------------------------------------------------------------
// 5 Chemical energetics
// ---------------------------------------------------------------------------

const topic5 = topic(5, { en: 'Chemical energetics', zh: '化学能量学' }, [
  sub('5.1', 'Exothermic and endothermic reactions', '放热与吸热反应', [
    [1, 'C', 'State that an exothermic reaction transfers thermal energy to the surroundings', '说明放热反应向环境放出热能'],
    [2, 'C', 'State that an endothermic reaction takes in thermal energy from the surroundings', '说明吸热反应从环境吸收热能'],
    [3, 'C', 'Interpret reaction pathway diagrams for exothermic and endothermic reactions', '解读放热与吸热反应的能量变化图'],
    [4, 'S', 'State that the energy transfer is described by ΔH, negative for exothermic', '说明能量变化用 ΔH 表示，放热为负'],
    [5, 'S', 'Define activation energy Ea', '定义活化能 Ea'],
    [6, 'S', 'Draw and label reaction pathway diagrams including Ea and ΔH', '画出并标注含 Ea 与 ΔH 的能量变化图'],
    [7, 'S', 'State that bond breaking is endothermic and bond making is exothermic', '说明断键吸热、成键放热'],
    [8, 'S', 'Calculate the enthalpy change of a reaction using bond energies', '用键能计算反应的焓变'],
  ]),
])

// ---------------------------------------------------------------------------
// 6 Chemical reactions
// ---------------------------------------------------------------------------

const topic6 = topic(6, { en: 'Chemical reactions', zh: '化学反应' }, [
  sub('6.1', 'Physical and chemical changes', '物理变化与化学变化', [
    [1, 'C', 'Identify physical and chemical changes and describe the differences', '识别物理变化与化学变化并说明区别'],
  ]),
  sub('6.2', 'Rate of reaction', '反应速率', [
    [1, 'C', 'Describe the effect of concentration, pressure, surface area and temperature on rate', '说明浓度、压强、表面积与温度对反应速率的影响'],
    [2, 'C', 'State that a catalyst increases rate and is unchanged at the end', '说明催化剂加快反应且反应后不变'],
    [3, 'C', 'Describe practical methods for investigating rate of reaction', '描述研究反应速率的实验方法'],
    [4, 'C', 'Interpret data and graphs from rate of reaction experiments', '解读速率实验的数据与图像'],
    [5, 'S', 'Describe collision theory in terms of collision frequency and energy', '用碰撞频率与能量描述碰撞理论'],
    [6, 'S', 'Explain the effect of each factor on rate using collision theory', '用碰撞理论解释各因素对速率的影响'],
    [7, 'S', 'State that a catalyst decreases the activation energy', '说明催化剂降低活化能'],
    [8, 'S', 'Evaluate practical methods for investigating rate of reaction', '评价研究反应速率的实验方法'],
  ]),
  sub('6.3', 'Reversible reactions and equilibrium', '可逆反应与平衡', [
    [1, 'C', 'State that some reactions are reversible, shown by ⇌', '说明有些反应可逆，用 ⇌ 表示'],
    [2, 'C', 'Describe how changing conditions changes the direction of a reversible reaction', '说明改变条件如何改变可逆反应的方向'],
    [3, 'S', 'State the characteristics of equilibrium in a closed system', '说出密闭体系中平衡的特征'],
    [4, 'S', 'Predict and explain how conditions shift the position of equilibrium', '预测并解释条件如何使平衡移动'],
    [5, 'S', 'State the equation and conditions for the Haber process', '写出哈伯法的方程式与条件'],
    [6, 'S', 'State the equation and conditions for the Contact process', '写出接触法的方程式与条件'],
  ]),
  sub('6.4', 'Redox', '氧化还原', [
    [1, 'C', 'Use Roman numerals to indicate oxidation number', '用罗马数字表示氧化数'],
    [2, 'C', 'Define redox as simultaneous oxidation and reduction', '把氧化还原定义为氧化与还原同时发生'],
    [3, 'C', 'Define oxidation as gain of oxygen and reduction as loss of oxygen', '把氧化定义为得氧、还原定义为失氧'],
    [4, 'C', 'Identify redox reactions by gain or loss of oxygen', '由得失氧识别氧化还原反应'],
    [5, 'C', 'Identify oxidation and reduction in a given redox reaction', '在给定反应中辨认氧化与还原'],
    [6, 'S', 'Define oxidation as loss of electrons or increase in oxidation number', '把氧化定义为失电子或氧化数升高'],
    [7, 'S', 'Define reduction as gain of electrons or decrease in oxidation number', '把还原定义为得电子或氧化数降低'],
    [8, 'S', 'Identify redox reactions by electron transfer', '由电子转移识别氧化还原反应'],
    [9, 'S', 'Identify redox reactions by changes in oxidation number', '由氧化数变化识别氧化还原反应'],
    [10, 'S', 'Identify redox reactions by the colour changes of common oxidising and reducing agents', '由常见氧化剂与还原剂的颜色变化识别氧化还原反应'],
    [11, 'S', 'Define an oxidising agent as a substance that oxidises another', '把氧化剂定义为使其他物质氧化的物质'],
    [12, 'S', 'Define a reducing agent as a substance that reduces another', '把还原剂定义为使其他物质还原的物质'],
    [13, 'S', 'Identify oxidising and reducing agents in redox reactions', '在氧化还原反应中辨认氧化剂与还原剂'],
  ]),
])

// ---------------------------------------------------------------------------
// 7 Acids, bases and salts
// ---------------------------------------------------------------------------

const topic7 = topic(7, { en: 'Acids, bases and salts', zh: '酸、碱与盐' }, [
  sub('7.1', 'The characteristic properties of acids and bases', '酸碱的特征性质', [
    [1, 'C', 'Describe the characteristic reactions of acids with metals, bases and carbonates', '描述酸与金属、碱和碳酸盐的特征反应'],
    [2, 'C', 'Describe the effect of acids on litmus, thymolphthalein and methyl orange', '描述酸对石蕊、百里酚酞与甲基橙的作用'],
    [3, 'C', 'State that bases are metal oxides or hydroxides, and alkalis are soluble bases', '说明碱是金属氧化物或氢氧化物，可溶性碱为强碱溶液'],
    [4, 'C', 'Describe the characteristic reactions of bases', '描述碱的特征反应'],
    [5, 'C', 'Describe the effect of alkalis on litmus, thymolphthalein and methyl orange', '描述碱对石蕊、百里酚酞与甲基橙的作用'],
    [6, 'C', 'State that acidic solutions contain H⁺ ions and alkaline solutions contain OH⁻ ions', '说明酸性溶液含 H⁺、碱性溶液含 OH⁻'],
    [7, 'C', 'Describe how to compare hydrogen ion concentration using the pH scale', '说明如何用 pH 比较氢离子浓度'],
    [8, 'C', 'Describe the neutralisation reaction between an acid and an alkali', '描述酸与碱的中和反应'],
    [9, 'S', 'Define acids as proton donors and bases as proton acceptors', '把酸定义为质子给体、碱定义为质子受体'],
    [10, 'S', 'Define a strong acid as fully dissociated and a weak acid as partially dissociated', '把强酸定义为完全电离、弱酸为部分电离'],
    [11, 'S', 'Describe how to distinguish a strong from a weak acid', '说明如何区分强酸与弱酸'],
    [12, 'S', 'Explain the difference in pH between strong and weak acids of the same concentration', '解释同浓度强弱酸的 pH 差异'],
  ]),
  sub('7.2', 'Oxides', '氧化物', [
    [1, 'C', 'Classify oxides as acidic or basic, related to metallic and non-metallic character', '按金属性与非金属性把氧化物分为酸性和碱性'],
    [2, 'S', 'Describe amphoteric oxides as reacting with both acids and alkalis', '把两性氧化物描述为既与酸又与碱反应'],
    [3, 'S', 'Classify Al₂O₃ and ZnO as amphoteric oxides', '把 Al₂O₃ 与 ZnO 归为两性氧化物'],
  ]),
  sub('7.3', 'Preparation of salts', '盐的制备', [
    [1, 'C', 'Describe the preparation, separation and purification of soluble salts', '描述可溶性盐的制备、分离与提纯'],
    [2, 'C', 'Describe the general solubility rules for salts', '说出盐的一般溶解性规律'],
    [3, 'C', 'Define a hydrated substance and an anhydrous substance', '定义结晶水合物与无水物'],
    [4, 'S', 'Describe the preparation of insoluble salts by precipitation', '描述用沉淀法制备难溶性盐'],
    [5, 'S', 'Define water of crystallisation', '定义结晶水'],
  ]),
])

// ---------------------------------------------------------------------------
// 8 The Periodic Table
// ---------------------------------------------------------------------------

const topic8 = topic(8, { en: 'The Periodic Table', zh: '元素周期表' }, [
  sub('8.1', 'Arrangement of elements', '元素的排列', [
    [1, 'C', 'Describe the Periodic Table as an arrangement in order of proton number', '把周期表描述为按质子数排列的元素表'],
    [2, 'C', 'Describe the change from metallic to non-metallic character across a period', '描述同周期从金属性到非金属性的变化'],
    [3, 'C', 'Relate group number to the charge on the ions formed', '把族数与所形成离子的电荷联系'],
    [4, 'C', 'Explain similarities within a group in terms of outer-shell electrons', '用最外层电子解释同族性质的相似性'],
    [5, 'C', 'Explain how position in the Periodic Table relates to electronic configuration', '解释在周期表中的位置与电子排布的关系'],
    [6, 'S', 'Identify trends in groups from given information about the elements', '由给定信息找出族内的变化趋势'],
  ]),
  sub('8.2', 'Group I properties', '第 I 主族性质', [
    [1, 'C', 'Describe the Group I alkali metals and their reactions with water', '描述第 I 主族碱金属及其与水的反应'],
    [2, 'C', 'Predict the properties of other Group I elements from trends', '由趋势预测第 I 主族其他元素的性质'],
  ]),
  sub('8.3', 'Group VII properties', '第 VII 主族性质', [
    [1, 'C', 'Describe the Group VII halogens and their trends in colour and density', '描述第 VII 主族卤素及其颜色与密度的变化趋势'],
    [2, 'C', 'State the appearance of chlorine, bromine and iodine at r.t.p.', '说出室温常压下氯、溴、碘的外观'],
    [3, 'C', 'Describe and explain the displacement reactions of halogens with halide ions', '描述并解释卤素与卤离子的置换反应'],
    [4, 'C', 'Predict the properties of other Group VII elements from trends', '由趋势预测第 VII 主族其他元素的性质'],
  ]),
  sub('8.4', 'Transition elements', '过渡元素', [
    [1, 'C', 'Describe the transition elements as metals with high density and coloured compounds', '把过渡元素描述为密度大、化合物有颜色的金属'],
    [2, 'S', 'Describe transition elements as having variable oxidation numbers and acting as catalysts', '说明过渡元素有可变氧化数并可作催化剂'],
  ]),
  sub('8.5', 'Noble gases', '稀有气体', [
    [1, 'C', 'Describe the noble gases as unreactive, monatomic gases', '把稀有气体描述为不活泼的单原子气体'],
    [2, 'C', 'Explain their lack of reactivity in terms of full outer electron shells', '用最外层电子已充满解释其不活泼性'],
  ]),
])

// ---------------------------------------------------------------------------
// 9 Metals
// ---------------------------------------------------------------------------

const topic9 = topic(9, { en: 'Metals', zh: '金属' }, [
  sub('9.1', 'Properties of metals', '金属的性质', [
    [1, 'C', 'Compare the general physical properties of metals and non-metals', '比较金属与非金属的一般物理性质'],
    [2, 'C', 'Describe the general chemical properties of metals', '描述金属的一般化学性质'],
  ]),
  sub('9.2', 'Uses of metals', '金属的用途', [
    [1, 'C', 'Describe the uses of metals in terms of their physical properties', '用物理性质说明金属的用途'],
  ]),
  sub('9.3', 'Alloys and their properties', '合金及其性质', [
    [1, 'C', 'Describe an alloy as a mixture of a metal with other elements', '把合金描述为金属与其他元素的混合物'],
    [2, 'C', 'State that alloys can be harder and stronger than the pure metals', '说明合金可比纯金属更硬更强'],
    [3, 'C', 'Describe the uses of alloys in terms of their physical properties', '用物理性质说明合金的用途'],
    [4, 'C', 'Identify alloys from diagrams of their structure', '由结构图识别合金'],
    [5, 'S', 'Explain in terms of structure why alloys are harder and stronger', '用结构解释合金为何更硬更强'],
  ]),
  sub('9.4', 'Reactivity series', '金属活动性顺序', [
    [1, 'C', 'State the order of the reactivity series', '说出金属活动性顺序'],
    [2, 'C', 'Describe the reactions of metals with water, steam and dilute acids', '描述金属与水、水蒸气和稀酸的反应'],
    [3, 'C', 'Deduce an order of reactivity from experimental results', '由实验结果推出活动性顺序'],
    [4, 'S', 'Explain relative reactivity in terms of the tendency to form positive ions', '用形成正离子的倾向解释相对活动性'],
    [5, 'S', 'Explain the apparent unreactivity of aluminium in terms of its oxide layer', '用氧化膜解释铝表观上的不活泼'],
  ]),
  sub('9.5', 'Corrosion of metals', '金属的腐蚀', [
    [1, 'C', 'State the conditions required for the rusting of iron', '说出铁生锈所需的条件'],
    [2, 'C', 'State common barrier methods of rust prevention', '说出常见的隔离防锈方法'],
    [3, 'C', 'Describe how barrier methods prevent rusting', '说明隔离法如何防锈'],
    [4, 'S', 'Describe galvanising as both a barrier method and sacrificial protection', '把镀锌描述为隔离与牺牲保护的结合'],
    [5, 'S', 'Explain sacrificial protection using the reactivity series', '用活动性顺序解释牺牲阳极保护'],
  ]),
  sub('9.6', 'Extraction of metals', '金属的冶炼', [
    [1, 'C', 'Relate the ease of extracting a metal to its position in the reactivity series', '把冶炼难易与金属在活动性顺序中的位置联系'],
    [2, 'C', 'Describe the extraction of iron from hematite in the blast furnace', '描述高炉中由赤铁矿炼铁'],
    [3, 'C', 'State that aluminium is extracted from bauxite by electrolysis', '说明铝由铝土矿电解制取'],
    [4, 'S', 'State the symbol equations for the extraction of iron in the blast furnace', '写出高炉炼铁的化学方程式'],
  ]),
])

// ---------------------------------------------------------------------------
// 10 Chemistry of the environment
// ---------------------------------------------------------------------------

const topic10 = topic(10, { en: 'Chemistry of the environment', zh: '环境化学' }, [
  sub('10.1', 'Water', '水', [
    [1, 'C', 'Describe chemical tests for water using anhydrous cobalt(II) chloride and copper(II) sulfate', '描述用无水氯化钴与硫酸铜检验水'],
    [2, 'C', 'Describe how to test the purity of water using melting and boiling points', '说明如何用熔沸点检验水的纯度'],
    [3, 'C', 'Explain why distilled water is used in practical chemistry', '解释实验化学中为何使用蒸馏水'],
    [4, 'C', 'State that natural water may contain dissolved substances', '说明天然水中可能含有溶解物质'],
    [5, 'C', 'State which of these substances are beneficial', '说出其中哪些物质有益'],
    [6, 'C', 'State which of these substances are potentially harmful', '说出其中哪些物质可能有害'],
    [7, 'C', 'Describe the treatment of the domestic water supply', '描述生活用水的处理过程'],
  ]),
  sub('10.2', 'Fertilisers', '化肥', [
    [1, 'C', 'State that ammonium salts and nitrates are used as fertilisers', '说明铵盐和硝酸盐用作化肥'],
    [2, 'C', 'Describe the use of NPK fertilisers', '说明 NPK 复合肥的用途'],
  ]),
  sub('10.3', 'Air quality and climate', '空气质量与气候', [
    [1, 'C', 'State the composition of clean, dry air', '说出洁净干燥空气的组成'],
    [2, 'C', 'State the sources and adverse effects of common air pollutants', '说出常见空气污染物的来源与危害'],
    [3, 'C', 'State that carbon dioxide and methane are greenhouse gases', '说明二氧化碳和甲烷是温室气体'],
    [4, 'C', 'Describe the greenhouse effect and its link to climate change', '描述温室效应及其与气候变化的联系'],
    [5, 'C', 'Describe strategies to reduce the effects of climate change', '描述减缓气候变化影响的措施'],
    [6, 'C', 'Describe the use of catalytic converters in reducing pollution', '描述催化转化器在减排中的作用'],
    [7, 'S', 'State the symbol equations for the reactions in a catalytic converter', '写出催化转化器中反应的化学方程式'],
    [8, 'S', 'Explain how photochemical smog and acid rain are formed', '解释光化学烟雾与酸雨的形成'],
  ]),
])

// ---------------------------------------------------------------------------
// 11 Organic chemistry
// ---------------------------------------------------------------------------

const topic11 = topic(11, { en: 'Organic chemistry', zh: '有机化学' }, [
  sub('11.1', 'Formulae, functional groups and terminology', '化学式、官能团与术语', [
    [1, 'C', 'Draw and interpret displayed formulae of molecules', '画出并解读分子的结构式'],
    [2, 'C', 'Write and interpret general formulae of homologous series', '写出并解读同系物的通式'],
    [3, 'C', 'Identify a functional group as the atoms that determine chemical properties', '把官能团定义为决定化学性质的原子团'],
    [4, 'C', 'Define a homologous series', '定义同系物'],
    [5, 'C', 'Describe the characteristics of a homologous series', '描述同系物的特征'],
    [6, 'C', 'State the type of compound present given a functional group', '由官能团判断化合物类别'],
    [7, 'S', 'Define structural isomers as compounds with the same molecular formula but different structures', '把结构异构体定义为分子式相同、结构不同的化合物'],
  ]),
  sub('11.2', 'Naming organic compounds', '有机物命名', [
    [1, 'C', 'Name and draw the displayed formulae of the first four alkanes, alkenes and alcohols, and ethanoic acid', '命名并画出前四种烷烃、烯烃、醇及乙酸的结构式'],
    [2, 'C', 'Name and draw unbranched compounds up to four carbon atoms', '命名并画出四个碳以内的直链化合物'],
    [3, 'S', 'Name and draw structural isomers of compounds up to four carbon atoms', '命名并画出四个碳以内化合物的结构异构体'],
  ]),
  sub('11.3', 'Fuels', '燃料', [
    [1, 'C', 'Name the fossil fuels: coal, natural gas and petroleum', '说出化石燃料：煤、天然气与石油'],
    [2, 'C', 'Name methane as the main constituent of natural gas', '说明甲烷是天然气的主要成分'],
    [3, 'C', 'Describe petroleum as a mixture separated by fractional distillation', '把石油描述为可用分馏分离的混合物'],
    [4, 'C', 'Name the fractions and their uses', '说出各馏分及其用途'],
    [5, 'C', 'Describe the trend in properties of the fractions', '描述各馏分性质的变化趋势'],
  ]),
  sub('11.4', 'Alkanes', '烷烃', [
    [1, 'C', 'State that alkanes contain only single covalent bonds and are saturated', '说明烷烃只含单键、为饱和烃'],
    [2, 'C', 'Describe alkanes as generally unreactive except in combustion', '说明烷烃除燃烧外一般不活泼'],
    [3, 'S', 'State that a substitution reaction replaces one atom or group with another', '说明取代反应是一个原子或基团被另一个替换'],
    [4, 'S', 'Describe the substitution reaction of alkanes with chlorine in ultraviolet light', '描述烷烃在紫外光下与氯的取代反应'],
  ]),
  sub('11.5', 'Alkenes', '烯烃', [
    [1, 'C', 'State that alkenes contain a carbon–carbon double bond and are unsaturated', '说明烯烃含碳碳双键、为不饱和烃'],
    [2, 'C', 'Describe the manufacture of alkenes by cracking', '描述用裂化法制取烯烃'],
    [3, 'C', 'Describe the reasons for cracking larger alkane molecules', '说明裂化大分子烷烃的原因'],
    [4, 'C', 'Describe the bromine water test for unsaturation', '描述用溴水检验不饱和烃'],
    [5, 'S', 'State that an addition reaction gives only one product', '说明加成反应只生成一种产物'],
    [6, 'S', 'Describe the addition reactions of alkenes with bromine, hydrogen and steam', '描述烯烃与溴、氢和水蒸气的加成反应'],
  ]),
  sub('11.6', 'Alcohols', '醇', [
    [1, 'C', 'Describe the manufacture of ethanol by fermentation and by catalytic addition', '描述发酵法与催化加成法制乙醇'],
    [2, 'C', 'Describe the combustion of ethanol', '描述乙醇的燃烧'],
    [3, 'C', 'State the uses of ethanol', '说出乙醇的用途'],
    [4, 'S', 'Describe the advantages and disadvantages of the two manufacturing methods', '说明两种制乙醇方法的优缺点'],
  ]),
  sub('11.7', 'Carboxylic acids', '羧酸', [
    [1, 'C', 'Describe the reactions of ethanoic acid with metals, bases and carbonates', '描述乙酸与金属、碱和碳酸盐的反应'],
    [2, 'S', 'Describe the formation of ethanoic acid by the oxidation of ethanol', '描述乙醇氧化生成乙酸'],
    [3, 'S', 'Describe the reaction of a carboxylic acid with an alcohol to form an ester', '描述羧酸与醇反应生成酯'],
  ]),
  sub('11.8', 'Polymers', '聚合物', [
    [1, 'C', 'Define polymers as large molecules built from many monomers', '把聚合物定义为由许多单体构成的大分子'],
    [2, 'C', 'Describe the formation of poly(ethene) as addition polymerisation', '把聚乙烯的生成描述为加成聚合'],
    [3, 'C', 'State that plastics are made from polymers', '说明塑料由聚合物制成'],
    [4, 'C', 'Describe how the properties of plastics cause environmental problems', '说明塑料的性质如何造成环境问题'],
    [5, 'C', 'Describe the environmental problems caused by disposal of plastics', '描述塑料废弃处理造成的环境问题'],
    [6, 'S', 'Draw and interpret the structures of addition polymers from their monomers', '由单体画出并解读加聚物的结构'],
    [7, 'S', 'Deduce the monomer from a section of an addition polymer', '由加聚物片段推出单体'],
    [8, 'S', 'Describe condensation polymerisation as joining monomers with loss of a small molecule', '把缩聚描述为单体结合并失去小分子'],
    [9, 'S', 'Describe the formation of nylon and PET as condensation polymers', '描述尼龙与 PET 作为缩聚物的生成'],
  ]),
])

// ---------------------------------------------------------------------------
// 12 Experimental techniques and chemical analysis
// ---------------------------------------------------------------------------

const topic12 = topic(
  12,
  { en: 'Experimental techniques and chemical analysis', zh: '实验技术与化学分析' },
  [
    sub('12.1', 'Experimental design', '实验设计', [
      [1, 'C', 'Name appropriate apparatus for measuring time, temperature, mass and volume', '说出测量时间、温度、质量与体积的合适仪器'],
      [2, 'C', 'Suggest advantages and disadvantages of experimental methods', '说出实验方法的优缺点'],
      [3, 'C', 'Describe the terms solvent, solute, solution and saturated solution', '说明溶剂、溶质、溶液与饱和溶液'],
    ]),
    sub('12.2', 'Acid–base titrations', '酸碱滴定', [
      [1, 'C', 'Describe an acid–base titration using a burette, pipette and indicator', '描述用滴定管、移液管与指示剂进行酸碱滴定'],
      [2, 'C', 'Describe how to identify the end-point using an indicator', '说明如何用指示剂判断滴定终点'],
    ]),
    sub('12.3', 'Chromatography', '色谱法', [
      [1, 'C', 'Describe how paper chromatography separates mixtures of soluble coloured substances', '说明纸色谱如何分离可溶有色物质的混合物'],
      [2, 'C', 'Interpret simple chromatograms', '解读简单的色谱图'],
      [3, 'S', 'Describe how a locating agent is used for colourless substances', '说明如何用显色剂处理无色物质'],
      [4, 'S', 'State and use the equation for Rf', '写出并使用 Rf 的计算式'],
    ]),
    sub('12.4', 'Separation and purification', '分离与提纯', [
      [1, 'C', 'Describe and explain methods of separation and purification', '描述并解释分离与提纯的方法'],
      [2, 'C', 'Suggest suitable techniques given information about the substances', '根据物质信息选择合适的分离技术'],
      [3, 'C', 'Identify substances and assess purity using melting and boiling points', '用熔沸点鉴定物质并评估纯度'],
    ]),
    sub('12.5', 'Identification of ions and gases', '离子与气体的检验', [
      [1, 'C', 'Describe tests to identify common anions', '描述常见阴离子的检验方法'],
      [2, 'C', 'Describe tests for cations using aqueous sodium hydroxide and ammonia', '描述用氢氧化钠溶液与氨水检验阳离子'],
      [3, 'C', 'Describe tests to identify common gases', '描述常见气体的检验方法'],
      [4, 'C', 'Describe the use of flame tests to identify cations', '描述用焰色反应检验阳离子'],
    ]),
  ]
)

export const igcseChemistry0620: Syllabus = {
  code: '0620',
  title: { en: 'Cambridge IGCSE Chemistry', zh: '剑桥 IGCSE 化学' },
  shortName: { en: 'Chemistry', zh: '化学' },
  board: 'Cambridge International',
  cycle: [2026, 2028],
  guidedLearningHours: 130,
  topics: [
    topic1,
    topic2,
    topic3,
    topic4,
    topic5,
    topic6,
    topic7,
    topic8,
    topic9,
    topic10,
    topic11,
    topic12,
  ],
}

export default igcseChemistry0620
