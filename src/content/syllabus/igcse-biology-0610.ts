/**
 * Cambridge IGCSE Biology 0610 — subject content map, 2026–2028 cycle.
 *
 * COMPLIANCE NOTE
 * ---------------
 * As with the physics and chemistry maps: statement *numbering* and Core/Supplement
 * *tiering* are factual references to the published syllabus, extracted from the official
 * 2026–2028 PDF. The `label` strings are **our own paraphrases written for this course** —
 * the awarding body's wording is not reproduced. The syllabus is © Cambridge University
 * Press & Assessment; this project is not endorsed by or affiliated with Cambridge.
 *
 * Numbering runs continuously through a subtopic: Core statements first, then Supplement
 * carrying on from the same sequence. So 5.1 has Core 1–5 and Supplement 6–9, and a
 * reference to `0610.5.1.7` is unambiguous without saying which tier it belongs to.
 */

import type { Bilingual, Syllabus, SyllabusStatement, SyllabusSubtopic, Tier } from '../types'

type Row = [number, 'C' | 'S', string, string]

function sub(id: string, en: string, zh: string, rows: Row[]): SyllabusSubtopic {
  const statements: SyllabusStatement[] = rows.map(([n, t, sen, szh]) => ({
    id: `0610.${id}.${n}`,
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
// 1 Characteristics and classification of living organisms
// ---------------------------------------------------------------------------

const topic1 = topic(
  1,
  { en: 'Characteristics and classification of living organisms', zh: '生物的特征与分类' },
  [
    sub('1.1', 'Characteristics of living organisms', '生物的特征', [
      [1, 'C', 'Describe the seven characteristics shared by all living organisms', '描述所有生物共有的七个特征'],
    ]),
    sub('1.2', 'Concept and uses of classification systems', '分类系统的概念与用途', [
      [1, 'C', 'State that organisms are classified into groups by the features they share', '说明生物按共有特征分类成群'],
      [2, 'C', 'Define a species as organisms that can breed to give fertile offspring', '把物种定义为能交配产生可育后代的生物'],
      [3, 'C', 'Describe the binomial system for naming species', '描述物种命名的双名法'],
      [4, 'C', 'Construct and use dichotomous keys from observable features', '根据可观察特征构建并使用二歧检索表'],
      [5, 'S', 'Explain that classification aims to reflect evolutionary relationships', '解释分类的目标是反映进化关系'],
      [6, 'S', 'Explain how DNA base sequences are used in classification', '解释如何用 DNA 碱基序列进行分类'],
      [7, 'S', 'Explain that a more recent common ancestor means more similar base sequences', '解释共同祖先越近，碱基序列越相似'],
    ]),
    sub('1.3', 'Features of organisms', '生物的特征分类', [
      [1, 'C', 'State the features used to place organisms in the animal and plant kingdoms', '说出用于把生物划入动物界与植物界的特征'],
      [2, 'C', 'State the features used to group organisms within the animal kingdom', '说出动物界内分组所用的特征'],
      [3, 'C', 'Classify organisms using those features', '用上述特征对生物进行分类'],
      [4, 'S', 'State the features used to place organisms in the five kingdoms', '说出把生物划入五界所用的特征'],
      [5, 'S', 'State the features used to group organisms within the plant kingdom', '说出植物界内分组所用的特征'],
      [6, 'S', 'Classify organisms using the five-kingdom and plant-group features', '用五界与植物类群的特征对生物分类'],
      [7, 'S', 'State the features of viruses: a protein coat and genetic material', '说出病毒的特征：蛋白质外壳与遗传物质'],
    ]),
  ]
)

// ---------------------------------------------------------------------------
// 2 Organisation of the organism
// ---------------------------------------------------------------------------

const topic2 = topic(2, { en: 'Organisation of the organism', zh: '生物体的组成层次' }, [
  sub('2.1', 'Cell structure', '细胞结构', [
    [1, 'C', 'Describe and compare the structures of a plant cell and an animal cell', '描述并比较植物细胞与动物细胞的结构'],
    [2, 'C', 'Describe the structure of a bacterial cell', '描述细菌细胞的结构'],
    [3, 'C', 'Identify cell structures in diagrams and images', '在图示与照片中识别细胞结构'],
    [4, 'C', 'Describe the functions of the structures in plant, animal and bacterial cells', '描述植物、动物与细菌细胞中各结构的功能'],
    [5, 'C', 'State that new cells are produced by division of existing cells', '说明新细胞由已有细胞分裂产生'],
    [6, 'C', 'State that specialised cells have specific functions', '说明特化细胞具有特定功能'],
    [7, 'C', 'Describe the terms cell, tissue, organ, organ system and organism', '说明细胞、组织、器官、器官系统与个体的含义'],
  ]),
  sub('2.2', 'Size of specimens', '标本的大小', [
    [1, 'C', 'State and use the formula magnification = image size ÷ actual size', '写出并使用公式：放大倍数 = 图像大小 ÷ 实际大小'],
    [2, 'C', 'Calculate magnification and specimen size using millimetres', '用毫米为单位计算放大倍数与标本大小'],
    [3, 'S', 'Convert measurements between millimetres and micrometres', '在毫米与微米之间换算'],
  ]),
])

// ---------------------------------------------------------------------------
// 3 Movement into and out of cells
// ---------------------------------------------------------------------------

const topic3 = topic(3, { en: 'Movement into and out of cells', zh: '物质进出细胞' }, [
  sub('3.1', 'Diffusion', '扩散', [
    [1, 'C', 'Describe diffusion as net movement down a concentration gradient', '把扩散描述为沿浓度梯度的净移动'],
    [2, 'C', 'State that the energy for diffusion comes from random particle motion', '说明扩散的能量来自粒子的随机运动'],
    [3, 'C', 'State that some substances cross the cell membrane by diffusion', '说明某些物质通过扩散穿过细胞膜'],
    [4, 'C', 'Describe the importance of diffusion of gases and solutes in organisms', '描述气体与溶质扩散对生物的重要性'],
    [5, 'C', 'Investigate the factors that influence the rate of diffusion', '探究影响扩散速率的因素'],
  ]),
  sub('3.2', 'Osmosis', '渗透', [
    [1, 'C', 'Describe the role of water as a solvent in organisms', '描述水在生物体内作为溶剂的作用'],
    [2, 'C', 'State that water diffuses through partially permeable membranes by osmosis', '说明水通过半透膜的扩散称为渗透'],
    [3, 'C', 'State that water moves into and out of cells by osmosis', '说明水通过渗透进出细胞'],
    [4, 'C', 'Investigate osmosis using dialysis tubing or similar materials', '用透析袋等材料探究渗透'],
    [5, 'C', 'Investigate the effect of different solution concentrations on plant tissue', '探究不同浓度溶液对植物组织的影响'],
    [6, 'C', 'State that turgor pressure against the cell wall supports plants', '说明细胞内水压顶住细胞壁为植物提供支撑'],
    [7, 'S', 'Describe osmosis in terms of water potential across a partially permeable membrane', '用水势描述水分子跨半透膜的渗透'],
    [8, 'S', 'Explain the effects on plant cells using turgid, plasmolysis and flaccid', '用膨胀、质壁分离与萎蔫解释对植物细胞的影响'],
    [9, 'S', 'Explain the importance of water potential in water uptake and loss', '解释水势在水分吸收与散失中的重要性'],
  ]),
  sub('3.3', 'Active transport', '主动运输', [
    [1, 'C', 'Describe active transport as movement against a concentration gradient using energy', '把主动运输描述为消耗能量逆浓度梯度的移动'],
    [2, 'S', 'Explain the importance of active transport, including ion uptake by root hairs', '解释主动运输的重要性，包括根毛吸收离子'],
    [3, 'S', 'State that protein carriers move molecules or ions across the membrane', '说明载体蛋白把分子或离子运过膜'],
  ]),
])

// ---------------------------------------------------------------------------
// 4 Biological molecules
// ---------------------------------------------------------------------------

const topic4 = topic(4, { en: 'Biological molecules', zh: '生物大分子' }, [
  sub('4.1', 'Biological molecules', '生物大分子', [
    [1, 'C', 'List the chemical elements in carbohydrates, fats and proteins', '列出糖类、脂肪与蛋白质所含的化学元素'],
    [2, 'C', 'State which small molecules make up starch, glycogen, cellulose, fats and proteins', '说出构成淀粉、糖原、纤维素、脂肪与蛋白质的小分子'],
    [3, 'C', 'Describe the food tests for starch, reducing sugars, protein, fats and vitamin C', '描述淀粉、还原糖、蛋白质、脂肪与维生素 C 的检验'],
    [4, 'S', 'Describe the structure of DNA as a double helix of paired bases', '把 DNA 的结构描述为碱基配对的双螺旋'],
  ]),
])

// ---------------------------------------------------------------------------
// 5 Enzymes
// ---------------------------------------------------------------------------

const topic5 = topic(5, { en: 'Enzymes', zh: '酶' }, [
  sub('5.1', 'Enzymes', '酶', [
    [1, 'C', 'Describe a catalyst as speeding up a reaction without being changed by it', '把催化剂描述为加快反应而自身不变的物质'],
    [2, 'C', 'Describe enzymes as proteins acting as biological catalysts', '把酶描述为作为生物催化剂的蛋白质'],
    [3, 'C', 'Describe why enzymes are essential to sustain life', '说明酶对维持生命为何必不可少'],
    [4, 'C', 'Describe enzyme action using the active site and its complementary substrate', '用活性位点及与之互补的底物描述酶的作用'],
    [5, 'C', 'Investigate the effect of temperature and pH on enzyme activity', '探究温度和 pH 对酶活性的影响'],
    [6, 'S', 'Explain enzyme action using the enzyme–substrate complex', '用酶—底物复合物解释酶的作用'],
    [7, 'S', 'Explain enzyme specificity in terms of complementary shape and fit', '用形状互补与契合解释酶的专一性'],
    [8, 'S', 'Explain the effect of temperature using kinetic energy and denaturation', '用动能与变性解释温度的影响'],
    [9, 'S', 'Explain the effect of pH in terms of shape, fit and denaturation', '用形状、契合与变性解释 pH 的影响'],
  ]),
])

// ---------------------------------------------------------------------------
// 6 Plant nutrition
// ---------------------------------------------------------------------------

const topic6 = topic(6, { en: 'Plant nutrition', zh: '植物的营养' }, [
  sub('6.1', 'Photosynthesis', '光合作用', [
    [1, 'C', 'Describe photosynthesis as making carbohydrates using energy from light', '把光合作用描述为利用光能合成糖类'],
    [2, 'C', 'State the word equation for photosynthesis', '写出光合作用的文字表达式'],
    [3, 'C', 'State that chlorophyll is a green pigment found in chloroplasts', '说明叶绿素是存在于叶绿体中的绿色色素'],
    [4, 'C', 'State that chlorophyll transfers light energy into chemical energy', '说明叶绿素把光能转化为化学能'],
    [5, 'C', 'Outline how the carbohydrates made are used and stored', '概述所合成糖类的利用与贮存'],
    [6, 'C', 'Explain why plants need nitrate ions and magnesium ions', '解释植物为何需要硝酸根离子和镁离子'],
    [7, 'C', 'Investigate the need for chlorophyll, light and carbon dioxide', '探究叶绿素、光和二氧化碳的必要性'],
    [8, 'C', 'Investigate the effect of light intensity, carbon dioxide and temperature on rate', '探究光照强度、二氧化碳与温度对速率的影响'],
    [9, 'C', 'Investigate gas exchange in an aquatic plant in light and dark', '探究水生植物在光照与黑暗下的气体交换'],
    [10, 'S', 'State the balanced chemical equation for photosynthesis', '写出光合作用的化学方程式'],
    [11, 'S', 'Identify and explain the limiting factors of photosynthesis', '找出并解释光合作用的限制因素'],
  ]),
  sub('6.2', 'Leaf structure', '叶的结构', [
    [1, 'C', 'Explain how a large, thin leaf is adapted for photosynthesis', '解释宽而薄的叶片如何适应光合作用'],
    [2, 'C', 'Identify the internal structures of a dicotyledonous leaf', '识别双子叶植物叶片的内部结构'],
    [3, 'C', 'Explain how those structures adapt the leaf for photosynthesis', '解释这些结构如何使叶片适应光合作用'],
  ]),
])

// ---------------------------------------------------------------------------
// 7 Human nutrition
// ---------------------------------------------------------------------------

const topic7 = topic(7, { en: 'Human nutrition', zh: '人体的营养' }, [
  sub('7.1', 'Diet', '膳食', [
    [1, 'C', 'Describe what is meant by a balanced diet', '说明什么是均衡膳食'],
    [2, 'C', 'State the dietary sources and importance of each nutrient group', '说出各类营养素的膳食来源与重要性'],
    [3, 'C', 'State the causes of scurvy and rickets', '说出坏血病与佝偻病的成因'],
  ]),
  sub('7.2', 'Digestive system', '消化系统', [
    [1, 'C', 'Identify the main organs of the digestive system', '识别消化系统的主要器官'],
    [2, 'C', 'Describe the functions of those organs in digestion and egestion', '描述这些器官在消化与排遗中的功能'],
  ]),
  sub('7.3', 'Physical digestion', '物理性消化', [
    [1, 'C', 'Describe physical digestion as breaking food into smaller pieces', '把物理性消化描述为把食物分成更小的碎块'],
    [2, 'C', 'State that physical digestion increases the surface area for enzymes', '说明物理性消化增大了供酶作用的表面积'],
    [3, 'C', 'Identify the four types of human teeth', '识别人类四种牙齿'],
    [4, 'C', 'Describe the structure of a human tooth', '描述人牙的结构'],
    [5, 'C', 'Describe the functions of each type of tooth', '描述各类牙齿的功能'],
    [6, 'C', 'Describe the function of the stomach in physical digestion', '描述胃在物理性消化中的作用'],
    [7, 'S', 'Outline the role of bile in emulsifying fats and oils', '概述胆汁乳化脂肪的作用'],
  ]),
  sub('7.4', 'Chemical digestion', '化学性消化', [
    [1, 'C', 'Describe chemical digestion as breaking large insoluble molecules into small soluble ones', '把化学性消化描述为把大的不溶分子分解为小的可溶分子'],
    [2, 'C', 'State the role of chemical digestion in producing absorbable molecules', '说明化学性消化在产生可吸收分子中的作用'],
    [3, 'C', 'Describe the functions of amylase, protease and lipase', '描述淀粉酶、蛋白酶与脂肪酶的功能'],
    [4, 'C', 'State where these enzymes are secreted and where they act', '说出这些酶的分泌部位与作用部位'],
    [5, 'C', 'Describe the functions of hydrochloric acid in gastric juice', '描述胃液中盐酸的作用'],
    [6, 'S', 'Describe the digestion of starch to glucose in the digestive system', '描述淀粉在消化道中被分解为葡萄糖'],
    [7, 'S', 'Describe the digestion of protein to amino acids by proteases', '描述蛋白酶把蛋白质分解为氨基酸'],
    [8, 'S', 'Explain that bile neutralises stomach acid to give enzymes their optimum pH', '解释胆汁中和胃酸以提供酶的最适 pH'],
  ]),
  sub('7.5', 'Absorption', '吸收', [
    [1, 'C', 'State that the small intestine is where nutrients are absorbed', '说明小肠是吸收营养物质的部位'],
    [2, 'C', 'State that water is absorbed in the small intestine and the colon', '说明水在小肠和结肠中被吸收'],
    [3, 'S', 'Explain how villi and microvilli increase the absorbing surface area', '解释绒毛与微绒毛如何增大吸收面积'],
    [4, 'S', 'Describe the structure of a villus', '描述绒毛的结构'],
    [5, 'S', 'Describe the roles of capillaries and lacteals in a villus', '描述绒毛中毛细血管与乳糜管的作用'],
  ]),
])

// ---------------------------------------------------------------------------
// 8 Transport in plants
// ---------------------------------------------------------------------------

const topic8 = topic(8, { en: 'Transport in plants', zh: '植物体内的运输' }, [
  sub('8.1', 'Xylem and phloem', '木质部与韧皮部', [
    [1, 'C', 'State the functions of xylem and phloem', '说出木质部与韧皮部的功能'],
    [2, 'C', 'Identify the positions of xylem and phloem in root, stem and leaf sections', '在根、茎、叶的切面中识别木质部与韧皮部的位置'],
    [3, 'S', 'Relate the structure of xylem vessels to their function', '把导管的结构与功能联系起来'],
  ]),
  sub('8.2', 'Water uptake', '水分的吸收', [
    [1, 'C', 'Identify root hair cells and state their function', '识别根毛细胞并说出其功能'],
    [2, 'C', 'State that the large surface area of root hairs increases uptake', '说明根毛的大表面积增加了吸收'],
    [3, 'C', 'Outline the pathway of water through root, stem and leaf', '概述水分经根、茎、叶的路径'],
    [4, 'C', 'Investigate the pathway of water using a suitable stain', '用合适的染色剂探究水分的运输路径'],
  ]),
  sub('8.3', 'Transpiration', '蒸腾作用', [
    [1, 'C', 'Describe transpiration as the loss of water vapour from leaves', '把蒸腾作用描述为叶片散失水蒸气'],
    [2, 'C', 'State that water evaporates from mesophyll cells and diffuses out of stomata', '说明水从叶肉细胞蒸发并经气孔扩散出去'],
    [3, 'C', 'Investigate the effects of temperature and wind speed on transpiration', '探究温度与风速对蒸腾的影响'],
    [4, 'S', 'Explain how leaf structure relates to the rate of water vapour loss', '解释叶的结构与水蒸气散失速率的关系'],
    [5, 'S', 'Explain how water moves up the xylem by the transpiration pull', '解释蒸腾拉力如何使水在木质部中上升'],
    [6, 'S', 'Explain the effects of temperature, humidity, light and wind on transpiration rate', '解释温度、湿度、光照与风对蒸腾速率的影响'],
    [7, 'S', 'Explain how and why wilting occurs', '解释萎蔫如何发生及其原因'],
  ]),
  sub('8.4', 'Translocation', '有机物的运输', [
    [1, 'S', 'Describe translocation as movement of sucrose and amino acids in phloem', '把有机物运输描述为蔗糖与氨基酸在韧皮部中的移动'],
    [2, 'S', 'Describe sources and sinks in a plant', '描述植物体内的源与库'],
    [3, 'S', 'Explain why a part of a plant may be a source at one time and a sink at another', '解释植物同一部位为何有时是源、有时是库'],
  ]),
])

// ---------------------------------------------------------------------------
// 9 Transport in animals
// ---------------------------------------------------------------------------

const topic9 = topic(9, { en: 'Transport in animals', zh: '动物体内的运输' }, [
  sub('9.1', 'Circulatory systems', '循环系统', [
    [1, 'C', 'Describe a circulatory system as vessels, a pump and valves giving one-way flow', '把循环系统描述为血管、泵与瓣膜构成的单向流动系统'],
    [2, 'S', 'Describe the single circulation of a fish', '描述鱼的单循环'],
    [3, 'S', 'Describe the double circulation of a mammal', '描述哺乳动物的双循环'],
    [4, 'S', 'Explain the advantages of a double circulation', '解释双循环的优点'],
  ]),
  sub('9.2', 'Heart', '心脏', [
    [1, 'C', 'Identify the structures of the mammalian heart', '识别哺乳动物心脏的结构'],
    [2, 'C', 'State that blood leaves the heart in arteries and returns in veins', '说明血液经动脉离开心脏、经静脉返回'],
    [3, 'C', 'State how heart activity is monitored', '说出监测心脏活动的方法'],
    [4, 'C', 'Investigate and describe the effect of physical activity on heart rate', '探究并描述体力活动对心率的影响'],
    [5, 'C', 'Describe coronary heart disease and state its risk factors', '描述冠心病并说出其风险因素'],
    [6, 'C', 'Discuss the roles of diet and exercise in reducing risk', '讨论饮食与运动在降低风险中的作用'],
    [7, 'S', 'Identify the atrioventricular and semilunar valves', '识别房室瓣与半月瓣'],
    [8, 'S', 'Explain the relative thickness of the ventricle and atrium walls', '解释心室与心房壁厚薄的差异'],
    [9, 'S', 'Explain the importance of the septum', '解释室间隔的重要性'],
    [10, 'S', 'Describe the functioning of the heart in terms of muscle contraction and valves', '用肌肉收缩与瓣膜描述心脏的工作过程'],
    [11, 'S', 'Explain the effect of physical activity on heart rate', '解释体力活动对心率的影响'],
  ]),
  sub('9.3', 'Blood vessels', '血管', [
    [1, 'C', 'Describe the structure of arteries, veins and capillaries', '描述动脉、静脉与毛细血管的结构'],
    [2, 'C', 'State the functions of capillaries', '说出毛细血管的功能'],
    [3, 'C', 'Identify the main blood vessels to and from the heart, lungs and kidneys', '识别进出心、肺、肾的主要血管'],
    [4, 'S', 'Explain how artery and vein structure relates to blood pressure', '解释动脉与静脉的结构如何与血压相适应'],
    [5, 'S', 'Explain how capillary structure relates to its function', '解释毛细血管的结构如何与功能相适应'],
    [6, 'S', 'Identify the main blood vessels to and from the liver', '识别进出肝脏的主要血管'],
  ]),
  sub('9.4', 'Blood', '血液', [
    [1, 'C', 'List the components of blood', '列出血液的组成成分'],
    [2, 'C', 'Identify red and white blood cells in images', '在图像中识别红细胞与白细胞'],
    [3, 'C', 'State the functions of red cells, white cells, platelets and plasma', '说出红细胞、白细胞、血小板与血浆的功能'],
    [4, 'C', 'State the roles of blood clotting', '说出血液凝固的作用'],
    [5, 'S', 'Identify lymphocytes and phagocytes in images', '在图像中识别淋巴细胞与吞噬细胞'],
    [6, 'S', 'State the functions of lymphocytes and phagocytes', '说出淋巴细胞与吞噬细胞的功能'],
    [7, 'S', 'Describe clotting as fibrinogen converting to fibrin to trap red cells', '把凝血描述为纤维蛋白原转变为纤维蛋白网住红细胞'],
  ]),
])

// ---------------------------------------------------------------------------
// 10 Diseases and immunity
// ---------------------------------------------------------------------------

const topic10 = topic(10, { en: 'Diseases and immunity', zh: '疾病与免疫' }, [
  sub('10.1', 'Diseases and immunity', '疾病与免疫', [
    [1, 'C', 'Describe a pathogen as a disease-causing organism', '把病原体描述为致病生物'],
    [2, 'C', 'Describe a transmissible disease as one passed from host to host', '把传染病描述为可在宿主间传播的疾病'],
    [3, 'C', 'State the routes by which a pathogen is transmitted', '说出病原体的传播途径'],
    [4, 'C', 'Describe the body defences against pathogens', '描述身体对病原体的防御'],
    [5, 'C', 'Explain how hygiene and waste disposal control the spread of disease', '解释卫生与废物处理如何控制疾病传播'],
    [6, 'S', 'Describe active immunity as defence by antibody production in the body', '把主动免疫描述为体内产生抗体的防御'],
    [7, 'S', 'State that each pathogen has its own antigens with specific shapes', '说明每种病原体都有形状特异的抗原'],
    [8, 'S', 'Describe antibodies as proteins that bind to antigens', '把抗体描述为与抗原结合的蛋白质'],
    [9, 'S', 'State that antibodies have shapes complementary to specific antigens', '说明抗体的形状与特定抗原互补'],
    [10, 'S', 'Explain that active immunity follows infection or vaccination', '解释主动免疫来自感染或接种疫苗'],
    [11, 'S', 'Outline the process of vaccination', '概述接种疫苗的过程'],
    [12, 'S', 'Explain the role of vaccination in controlling the spread of disease', '解释接种疫苗在控制疾病传播中的作用'],
    [13, 'S', 'Explain passive immunity as short-term defence by antibodies from elsewhere', '把被动免疫解释为由外来抗体提供的短期防御'],
    [14, 'S', 'Explain the importance of breast-feeding for passive immunity in infants', '解释母乳喂养对婴儿被动免疫的重要性'],
    [15, 'S', 'State that memory cells are not produced in passive immunity', '说明被动免疫不产生记忆细胞'],
    [16, 'S', 'Describe cholera as a bacterial disease transmitted in contaminated water', '把霍乱描述为经污染水传播的细菌性疾病'],
    [17, 'S', 'Explain how the cholera toxin causes diarrhoea and dehydration', '解释霍乱毒素如何引起腹泻与脱水'],
  ]),
])

// ---------------------------------------------------------------------------
// 11 Gas exchange in humans
// ---------------------------------------------------------------------------

const topic11 = topic(11, { en: 'Gas exchange in humans', zh: '人体的气体交换' }, [
  sub('11.1', 'Gas exchange in humans', '人体的气体交换', [
    [1, 'C', 'Describe the features of gas exchange surfaces', '描述气体交换表面的特征'],
    [2, 'C', 'Identify the parts of the breathing system', '识别呼吸系统的组成部分'],
    [3, 'C', 'Investigate the difference between inspired and expired air using limewater', '用石灰水探究吸入与呼出气体的差异'],
    [4, 'C', 'Describe the differences in composition between inspired and expired air', '描述吸入与呼出气体成分的差异'],
    [5, 'C', 'Investigate the effect of physical activity on the rate and depth of breathing', '探究体力活动对呼吸频率与深度的影响'],
    [6, 'S', 'Identify the internal and external intercostal muscles', '识别肋间内肌与肋间外肌'],
    [7, 'S', 'State the function of cartilage in the trachea', '说出气管中软骨的功能'],
    [8, 'S', 'Explain the roles of the ribs, intercostal muscles and diaphragm in breathing', '解释肋骨、肋间肌与膈在呼吸中的作用'],
    [9, 'S', 'Explain the differences in composition between inspired and expired air', '解释吸入与呼出气体成分差异的原因'],
    [10, 'S', 'Explain the link between physical activity and rate and depth of breathing', '解释体力活动与呼吸频率、深度之间的联系'],
    [11, 'S', 'Explain the role of goblet cells, mucus and ciliated cells in protection', '解释杯状细胞、黏液与纤毛细胞的保护作用'],
  ]),
])

// ---------------------------------------------------------------------------
// 12 Respiration
// ---------------------------------------------------------------------------

const topic12 = topic(12, { en: 'Respiration', zh: '呼吸作用' }, [
  sub('12.1', 'Respiration', '呼吸作用', [
    [1, 'C', 'State the uses of energy released by respiration in living organisms', '说出呼吸作用释放的能量在生物体内的用途'],
    [2, 'C', 'Investigate and describe the effect of temperature on respiration in yeast', '探究并描述温度对酵母呼吸作用的影响'],
  ]),
  sub('12.2', 'Aerobic respiration', '有氧呼吸', [
    [1, 'C', 'Describe aerobic respiration as using oxygen to release energy from glucose', '把有氧呼吸描述为利用氧从葡萄糖释放能量'],
    [2, 'C', 'State the word equation for aerobic respiration', '写出有氧呼吸的文字表达式'],
    [3, 'S', 'State the balanced chemical equation for aerobic respiration', '写出有氧呼吸的化学方程式'],
  ]),
  sub('12.3', 'Anaerobic respiration', '无氧呼吸', [
    [1, 'C', 'Describe anaerobic respiration as releasing energy without oxygen', '把无氧呼吸描述为在无氧条件下释放能量'],
    [2, 'C', 'State that anaerobic respiration releases much less energy per glucose molecule', '说明无氧呼吸每分子葡萄糖释放的能量少得多'],
    [3, 'C', 'State the word equation for anaerobic respiration in yeast', '写出酵母无氧呼吸的文字表达式'],
    [4, 'C', 'State the word equation for anaerobic respiration in muscles', '写出肌肉无氧呼吸的文字表达式'],
    [5, 'S', 'State the balanced chemical equation for anaerobic respiration in yeast', '写出酵母无氧呼吸的化学方程式'],
    [6, 'S', 'State that lactic acid builds up during vigorous exercise, causing an oxygen debt', '说明剧烈运动时乳酸积累形成氧债'],
    [7, 'S', 'Outline how the oxygen debt is removed after exercise', '概述运动后氧债如何被偿还'],
  ]),
])

// ---------------------------------------------------------------------------
// 13 Excretion in humans
// ---------------------------------------------------------------------------

const topic13 = topic(13, { en: 'Excretion in humans', zh: '人体的排泄' }, [
  sub('13.1', 'Excretion in humans', '人体的排泄', [
    [1, 'C', 'State that carbon dioxide is excreted through the lungs', '说明二氧化碳经肺排出'],
    [2, 'C', 'State that the kidneys excrete urea and excess water and ions', '说明肾脏排出尿素以及多余的水和离子'],
    [3, 'C', 'Identify the kidneys, ureters, bladder and urethra', '识别肾、输尿管、膀胱与尿道'],
    [4, 'S', 'Identify the cortex and medulla in the structure of the kidney', '识别肾的皮质与髓质'],
    [5, 'S', 'Outline the structure and function of a nephron and its blood vessels', '概述肾单位及其血管的结构与功能'],
    [6, 'S', 'Describe the role of the liver in the assimilation of amino acids', '描述肝脏在氨基酸同化中的作用'],
    [7, 'S', 'State that urea is formed in the liver from excess amino acids', '说明尿素在肝脏由过量氨基酸生成'],
    [8, 'S', 'Describe deamination as removing the nitrogen-containing part of amino acids', '把脱氨基描述为去除氨基酸的含氮部分'],
    [9, 'S', 'Explain the importance of excretion in terms of the toxicity of urea', '用尿素的毒性解释排泄的重要性'],
  ]),
])

// ---------------------------------------------------------------------------
// 14 Coordination and response
// ---------------------------------------------------------------------------

const topic14 = topic(14, { en: 'Coordination and response', zh: '协调与反应' }, [
  sub('14.1', 'Coordination and response', '协调与反应', [
    [1, 'C', 'State that electrical impulses travel along neurones', '说明电脉冲沿神经元传导'],
    [2, 'C', 'Describe the mammalian nervous system as the CNS and peripheral nerves', '把哺乳动物神经系统描述为中枢神经系统与外周神经'],
    [3, 'C', 'Describe the role of the nervous system in coordination and regulation', '描述神经系统在协调与调节中的作用'],
    [4, 'C', 'Identify sensory, relay and motor neurones', '识别感觉神经元、中间神经元与运动神经元'],
    [5, 'C', 'Describe a simple reflex arc', '描述简单的反射弧'],
    [6, 'C', 'Describe a reflex action as automatic and rapid', '把反射描述为自动而迅速的反应'],
    [7, 'C', 'Describe a synapse as a junction between two neurones', '把突触描述为两个神经元之间的连接'],
    [8, 'S', 'Describe the structure of a synapse, including neurotransmitter vesicles', '描述突触的结构，包括含神经递质的小泡'],
    [9, 'S', 'Describe the events at a synapse', '描述突触处发生的过程'],
    [10, 'S', 'State that synapses ensure impulses travel in one direction only', '说明突触保证脉冲只能单向传导'],
  ]),
  sub('14.2', 'Sense organs', '感觉器官', [
    [1, 'C', 'Describe sense organs as groups of receptor cells responding to stimuli', '把感觉器官描述为对刺激作出反应的感受器细胞群'],
    [2, 'C', 'Identify the structures of the eye', '识别眼的结构'],
    [3, 'C', 'Describe the function of each part of the eye', '描述眼各部分的功能'],
    [4, 'C', 'Explain the pupil reflex in terms of light intensity and pupil diameter', '用光照强度与瞳孔直径解释瞳孔反射'],
    [5, 'S', 'Explain the pupil reflex using the antagonistic circular and radial muscles', '用环行肌与辐射肌的拮抗作用解释瞳孔反射'],
    [6, 'S', 'Explain accommodation for near and distant objects', '解释看近物与远物时的调节'],
    [7, 'S', 'Describe the distribution of rods and cones in the retina', '描述视杆细胞与视锥细胞在视网膜上的分布'],
    [8, 'S', 'Outline the functions of rods and cones', '概述视杆细胞与视锥细胞的功能'],
    [9, 'S', 'Identify the fovea and state its function', '识别中央凹并说出其功能'],
  ]),
  sub('14.3', 'Hormones', '激素', [
    [1, 'C', 'Describe a hormone as a chemical made by a gland and carried in the blood', '把激素描述为由腺体产生、经血液运输的化学物质'],
    [2, 'C', 'Identify endocrine glands and state the hormones they secrete', '识别内分泌腺并说出其分泌的激素'],
    [3, 'C', 'Describe adrenaline as the fight-or-flight hormone and state its effects', '把肾上腺素描述为"战或逃"激素并说明其作用'],
    [4, 'C', 'Compare nervous and hormonal control', '比较神经调节与激素调节'],
    [5, 'S', 'State that glucagon is secreted by the pancreas', '说明胰高血糖素由胰腺分泌'],
    [6, 'S', 'Describe the role of adrenaline in controlling metabolic activity', '描述肾上腺素在控制代谢活动中的作用'],
  ]),
  sub('14.4', 'Homeostasis', '稳态', [
    [1, 'C', 'Describe homeostasis as maintaining a constant internal environment', '把稳态描述为维持内环境的相对恒定'],
    [2, 'C', 'State that insulin decreases blood glucose concentration', '说明胰岛素降低血糖浓度'],
    [3, 'S', 'Explain homeostatic control by negative feedback around a set point', '用围绕设定点的负反馈解释稳态调控'],
    [4, 'S', 'Describe the control of blood glucose by insulin and glucagon', '描述胰岛素与胰高血糖素对血糖的调控'],
    [5, 'S', 'Outline the treatment of Type 1 diabetes', '概述 1 型糖尿病的治疗'],
    [6, 'S', 'Identify the structures of the skin', '识别皮肤的结构'],
    [7, 'S', 'Describe temperature control by sweating, vasodilation and vasoconstriction', '用出汗、血管舒张与收缩描述体温调节'],
    [8, 'S', 'Describe the roles of shivering and the hypothalamus in temperature control', '描述寒战与下丘脑在体温调节中的作用'],
  ]),
  sub('14.5', 'Tropic responses', '向性反应', [
    [1, 'C', 'Describe gravitropism as growth towards or away from gravity', '把向重力性描述为朝向或背离重力的生长'],
    [2, 'C', 'Describe phototropism as growth towards or away from light', '把向光性描述为朝向或背离光的生长'],
    [3, 'C', 'Investigate gravitropism and phototropism in shoots and roots', '探究茎与根的向重力性和向光性'],
    [4, 'S', 'Explain phototropism and gravitropism as chemical control of growth', '把向光性与向重力性解释为对生长的化学调控'],
    [5, 'S', 'Explain the role of auxin in controlling shoot growth', '解释生长素在控制茎生长中的作用'],
  ]),
])

// ---------------------------------------------------------------------------
// 15 Drugs
// ---------------------------------------------------------------------------

const topic15 = topic(15, { en: 'Drugs', zh: '药物' }, [
  sub('15.1', 'Drugs', '药物', [
    [1, 'C', 'Describe a drug as a substance taken into the body that modifies chemical reactions', '把药物描述为进入体内改变化学反应的物质'],
    [2, 'C', 'Describe the use of antibiotics to treat bacterial infections', '描述抗生素用于治疗细菌感染'],
    [3, 'C', 'State that antibiotic resistance reduces the effectiveness of antibiotics', '说明抗生素耐药性降低了抗生素的有效性'],
    [4, 'C', 'State that antibiotics kill bacteria but do not affect viruses', '说明抗生素能杀死细菌但对病毒无效'],
    [5, 'S', 'Explain how using antibiotics only when essential limits resistance', '解释仅在必要时使用抗生素如何限制耐药性发展'],
  ]),
])

// ---------------------------------------------------------------------------
// 16 Reproduction
// ---------------------------------------------------------------------------

const topic16 = topic(16, { en: 'Reproduction', zh: '生殖' }, [
  sub('16.1', 'Asexual reproduction', '无性生殖', [
    [1, 'C', 'Describe asexual reproduction as producing genetically identical offspring from one parent', '把无性生殖描述为由一个亲本产生遗传上完全相同的后代'],
    [2, 'C', 'Identify examples of asexual reproduction', '识别无性生殖的实例'],
    [3, 'S', 'Discuss the advantages and disadvantages of asexual reproduction', '讨论无性生殖的优点与缺点'],
  ]),
  sub('16.2', 'Sexual reproduction', '有性生殖', [
    [1, 'C', 'Describe sexual reproduction as the fusion of the nuclei of two gametes', '把有性生殖描述为两个配子细胞核的融合'],
    [2, 'C', 'Describe fertilisation as the fusion of gamete nuclei', '把受精描述为配子细胞核的融合'],
    [3, 'S', 'State that gamete nuclei are haploid and a zygote nucleus is diploid', '说明配子核为单倍体、合子核为二倍体'],
    [4, 'S', 'Discuss the advantages and disadvantages of sexual reproduction', '讨论有性生殖的优点与缺点'],
  ]),
  sub('16.3', 'Sexual reproduction in plants', '植物的有性生殖', [
    [1, 'C', 'Identify and draw the parts of an insect-pollinated flower', '识别并画出虫媒花的各部分'],
    [2, 'C', 'State the functions of those flower structures', '说出这些花部结构的功能'],
    [3, 'C', 'Identify and describe the anthers and stigmas of a wind-pollinated flower', '识别并描述风媒花的花药与柱头'],
    [4, 'C', 'Distinguish between insect-pollinated and wind-pollinated pollen grains', '区分虫媒花与风媒花的花粉粒'],
    [5, 'C', 'Describe pollination as the transfer of pollen from anther to stigma', '把传粉描述为花粉由花药转移到柱头'],
    [6, 'C', 'State that fertilisation occurs when a pollen nucleus fuses with an ovule nucleus', '说明受精是花粉核与胚珠中的核融合'],
    [7, 'C', 'Describe the structural adaptations of insect- and wind-pollinated flowers', '描述虫媒花与风媒花的结构适应'],
    [8, 'C', 'Investigate the environmental conditions that affect seed germination', '探究影响种子萌发的环境条件'],
    [9, 'S', 'Describe self-pollination', '描述自花传粉'],
    [10, 'S', 'Describe cross-pollination', '描述异花传粉'],
    [11, 'S', 'Discuss the effects of self- and cross-pollination on a population', '讨论自花与异花传粉对种群的影响'],
    [12, 'S', 'Describe the growth of the pollen tube and fertilisation of the ovule', '描述花粉管的生长与胚珠的受精'],
  ]),
  sub('16.4', 'Sexual reproduction in humans', '人的有性生殖', [
    [1, 'C', 'Identify the parts of the male reproductive system and state their functions', '识别男性生殖系统各部分并说出其功能'],
    [2, 'C', 'Identify the parts of the female reproductive system and state their functions', '识别女性生殖系统各部分并说出其功能'],
    [3, 'C', 'Describe fertilisation as the fusion of sperm and egg nuclei', '把受精描述为精子核与卵细胞核的融合'],
    [4, 'C', 'Explain the adaptive features of sperm', '解释精子的适应性特征'],
    [5, 'C', 'Explain the adaptive features of egg cells', '解释卵细胞的适应性特征'],
    [6, 'C', 'Compare male and female gametes', '比较雄配子与雌配子'],
    [7, 'C', 'State that the zygote forms an embryo that implants in the uterus lining', '说明合子形成胚胎并植入子宫内膜'],
    [8, 'C', 'Identify and state the functions of the placenta, umbilical cord and amniotic sac', '识别胎盘、脐带与羊膜囊并说出其功能'],
    [9, 'S', 'Describe the exchange of materials at the placenta', '描述胎盘处物质的交换'],
    [10, 'S', 'State that some pathogens and toxins can cross the placenta', '说明某些病原体和毒素能穿过胎盘'],
  ]),
  sub('16.5', 'Sex hormones in humans', '人的性激素', [
    [1, 'C', 'Describe the roles of testosterone and oestrogen', '描述睾酮与雌激素的作用'],
    [2, 'C', 'Describe the menstrual cycle in terms of the ovaries and the uterus lining', '用卵巢与子宫内膜的变化描述月经周期'],
    [3, 'S', 'Describe where oestrogen and progesterone are produced during the cycle', '描述月经周期中雌激素与孕激素的产生部位'],
    [4, 'S', 'Explain the hormonal control of the menstrual cycle and pregnancy', '解释月经周期与妊娠的激素调控'],
  ]),
  sub('16.6', 'Sexually transmitted infections', '性传播感染', [
    [1, 'C', 'Describe an STI as an infection transmitted through sexual contact', '把性传播感染描述为通过性接触传播的感染'],
    [2, 'C', 'State that HIV is a pathogen that causes an STI', '说明 HIV 是引起性传播感染的病原体'],
    [3, 'C', 'State that HIV infection may lead to AIDS', '说明 HIV 感染可能发展为艾滋病'],
    [4, 'C', 'Describe the methods of transmission of HIV', '描述 HIV 的传播途径'],
    [5, 'C', 'Explain how the spread of STIs is controlled', '解释如何控制性传播感染的扩散'],
  ]),
])

// ---------------------------------------------------------------------------
// 17 Inheritance
// ---------------------------------------------------------------------------

const topic17 = topic(17, { en: 'Inheritance', zh: '遗传' }, [
  sub('17.1', 'Chromosomes, genes and proteins', '染色体、基因与蛋白质', [
    [1, 'C', 'State that chromosomes are made of DNA carrying genetic information as genes', '说明染色体由 DNA 构成，以基因的形式携带遗传信息'],
    [2, 'C', 'Define a gene as a length of DNA that codes for a protein', '把基因定义为编码一种蛋白质的一段 DNA'],
    [3, 'C', 'Define an allele as an alternative form of a gene', '把等位基因定义为基因的不同形式'],
    [4, 'C', 'Describe the inheritance of sex in humans using X and Y chromosomes', '用 X 和 Y 染色体描述人类性别的遗传'],
    [5, 'S', 'State that the base sequence of a gene determines the sequence of amino acids', '说明基因的碱基序列决定氨基酸的排列顺序'],
    [6, 'S', 'Explain that different amino acid sequences give proteins different shapes', '解释不同的氨基酸序列使蛋白质具有不同的形状'],
    [7, 'S', 'Explain that DNA controls cell function by controlling protein production', '解释 DNA 通过控制蛋白质的合成来控制细胞功能'],
    [8, 'S', 'Explain how a protein is made, including the role of mRNA', '解释蛋白质的合成过程，包括 mRNA 的作用'],
    [9, 'S', 'Explain that most cells have the same genes but only some are expressed', '解释大多数细胞含有相同基因，但只有部分被表达'],
    [10, 'S', 'Describe a haploid nucleus as containing a single set of chromosomes', '把单倍体核描述为含有一套染色体'],
    [11, 'S', 'Describe a diploid nucleus as containing two sets of chromosomes', '把二倍体核描述为含有两套染色体'],
    [12, 'S', 'State that a human diploid cell has 23 pairs of chromosomes', '说明人的二倍体细胞有 23 对染色体'],
  ]),
  sub('17.2', 'Mitosis', '有丝分裂', [
    [1, 'S', 'Describe mitosis as nuclear division giving genetically identical cells', '把有丝分裂描述为产生遗传上相同细胞的核分裂'],
    [2, 'S', 'State the role of mitosis in growth, repair and asexual reproduction', '说出有丝分裂在生长、修复与无性生殖中的作用'],
    [3, 'S', 'State that chromosomes are replicated exactly before mitosis', '说明染色体在有丝分裂前精确复制'],
    [4, 'S', 'State that chromosome copies separate, maintaining the chromosome number', '说明染色体的复制体分离，保持染色体数目不变'],
    [5, 'S', 'Describe stem cells as unspecialised cells that divide to give specialised cells', '把干细胞描述为可分裂产生特化细胞的未分化细胞'],
  ]),
  sub('17.3', 'Meiosis', '减数分裂', [
    [1, 'S', 'State that meiosis is involved in the production of gametes', '说明减数分裂参与配子的形成'],
    [2, 'S', 'Describe meiosis as a reduction division halving the chromosome number', '把减数分裂描述为使染色体数目减半的分裂'],
  ]),
  sub('17.4', 'Monohybrid inheritance', '单基因遗传', [
    [1, 'C', 'Describe inheritance as the transmission of genetic information between generations', '把遗传描述为遗传信息在世代间的传递'],
    [2, 'C', 'Describe genotype as the alleles an organism carries', '把基因型描述为生物所携带的等位基因'],
    [3, 'C', 'Describe phenotype as the observable features of an organism', '把表现型描述为生物可观察到的特征'],
    [4, 'C', 'Describe homozygous as having two identical alleles of a gene', '把纯合描述为具有一个基因的两个相同等位基因'],
    [5, 'C', 'State that two identical homozygous individuals breed true', '说明两个相同的纯合个体杂交能稳定遗传'],
    [6, 'C', 'Describe heterozygous as having two different alleles of a gene', '把杂合描述为具有一个基因的两个不同等位基因'],
    [7, 'C', 'State that a heterozygous individual will not breed true', '说明杂合个体不能稳定遗传'],
    [8, 'C', 'Describe a dominant allele as one expressed whenever it is present', '把显性等位基因描述为只要存在就会表达的等位基因'],
    [9, 'C', 'Describe a recessive allele as one expressed only without a dominant allele', '把隐性等位基因描述为只有在没有显性等位基因时才表达'],
    [10, 'C', 'Interpret pedigree diagrams', '解读系谱图'],
    [11, 'C', 'Use genetic diagrams to predict monohybrid crosses and calculate ratios', '用遗传图解预测单基因杂交结果并计算比例'],
    [12, 'C', 'Use Punnett squares to work out and show the results of crosses', '用棋盘格法推算并展示杂交结果'],
    [13, 'S', 'Explain how a test cross identifies an unknown genotype', '解释测交如何确定未知基因型'],
    [14, 'S', 'Describe codominance as both alleles contributing to the phenotype', '把共显性描述为两个等位基因共同影响表现型'],
    [15, 'S', 'Explain the inheritance of ABO blood groups', '解释 ABO 血型的遗传'],
    [16, 'S', 'Describe a sex-linked characteristic as one carried on a sex chromosome', '把伴性性状描述为由性染色体携带的性状'],
    [17, 'S', 'Describe red-green colour blindness as an example of sex linkage', '把红绿色盲作为伴性遗传的实例'],
    [18, 'S', 'Use genetic diagrams for crosses involving codominance and sex linkage', '用遗传图解处理涉及共显性与伴性遗传的杂交'],
  ]),
])

// ---------------------------------------------------------------------------
// 18 Variation and selection
// ---------------------------------------------------------------------------

const topic18 = topic(18, { en: 'Variation and selection', zh: '变异与选择' }, [
  sub('18.1', 'Variation', '变异', [
    [1, 'C', 'Describe variation as differences between individuals of the same species', '把变异描述为同种个体之间的差异'],
    [2, 'C', 'State that continuous variation gives a range of phenotypes between two extremes', '说明连续变异在两个极端之间形成连续的表现型'],
    [3, 'C', 'State that discontinuous variation gives a limited number of phenotypes', '说明不连续变异只形成有限的几种表现型'],
    [4, 'C', 'State that discontinuous variation is genetic and continuous variation is also environmental', '说明不连续变异由基因决定，连续变异还受环境影响'],
    [5, 'C', 'Investigate examples of continuous and discontinuous variation', '探究连续变异与不连续变异的实例'],
    [6, 'C', 'Describe mutation as a genetic change', '把突变描述为遗传物质的改变'],
    [7, 'C', 'State that mutation is how new alleles arise', '说明突变是新等位基因产生的途径'],
    [8, 'C', 'State that ionising radiation and some chemicals raise the mutation rate', '说明电离辐射与某些化学物质会提高突变率'],
    [9, 'S', 'Describe gene mutation as a random change in the DNA base sequence', '把基因突变描述为 DNA 碱基序列的随机改变'],
    [10, 'S', 'State the sources of genetic variation in populations', '说出种群中遗传变异的来源'],
  ]),
  sub('18.2', 'Adaptive features', '适应性特征', [
    [1, 'C', 'Describe an adaptive feature as an inherited feature that aids survival and reproduction', '把适应性特征描述为有助于生存与繁殖的遗传特征'],
    [2, 'C', 'Interpret information about a species to describe its adaptive features', '解读物种信息以描述其适应性特征'],
    [3, 'S', 'Explain the adaptive features of hydrophytes and xerophytes', '解释水生植物与旱生植物的适应性特征'],
  ]),
  sub('18.3', 'Selection', '选择', [
    [1, 'C', 'Describe natural selection from variation, competition and inherited advantage', '用变异、竞争与可遗传优势描述自然选择'],
    [2, 'C', 'Describe selective breeding as humans choosing which individuals reproduce', '把选择育种描述为由人选择哪些个体繁殖'],
    [3, 'C', 'Outline how selective breeding is carried out over many generations', '概述选择育种如何经过许多世代进行'],
    [4, 'S', 'Describe adaptation as the process by which populations become suited to their environment', '把适应描述为种群逐渐与环境相适应的过程'],
    [5, 'S', 'Describe antibiotic-resistant bacteria as an example of natural selection', '把抗生素耐药菌作为自然选择的实例'],
    [6, 'S', 'Outline the differences between natural and artificial selection', '概述自然选择与人工选择的区别'],
  ]),
])

// ---------------------------------------------------------------------------
// 19 Organisms and their environment
// ---------------------------------------------------------------------------

const topic19 = topic(19, { en: 'Organisms and their environment', zh: '生物与环境' }, [
  sub('19.1', 'Energy flow', '能量流动', [
    [1, 'C', 'State that the Sun is the principal source of energy for biological systems', '说明太阳是生物系统的主要能量来源'],
    [2, 'C', 'Describe the flow of energy through living organisms', '描述能量在生物之间的流动'],
  ]),
  sub('19.2', 'Food chains and food webs', '食物链与食物网', [
    [1, 'C', 'Describe a food chain as showing energy transfer from one organism to the next', '把食物链描述为表示能量在生物间传递的链条'],
    [2, 'C', 'Construct and interpret simple food chains', '构建并解读简单食物链'],
    [3, 'C', 'Describe a food web as interconnected food chains, and interpret food webs', '把食物网描述为相互连接的食物链并加以解读'],
    [4, 'C', 'Describe a producer as an organism that makes its own organic nutrients', '把生产者描述为能自己制造有机养料的生物'],
    [5, 'C', 'Describe a consumer as an organism that feeds on other organisms', '把消费者描述为以其他生物为食的生物'],
    [6, 'C', 'State that consumers may be primary, secondary, tertiary or quaternary', '说明消费者可分为初级、次级、三级和四级'],
    [7, 'C', 'Describe a herbivore as an animal that eats plants', '把植食动物描述为以植物为食的动物'],
    [8, 'C', 'Describe a carnivore as an animal that eats other animals', '把肉食动物描述为以其他动物为食的动物'],
    [9, 'C', 'Describe a decomposer as an organism that feeds on dead or waste organic matter', '把分解者描述为以死亡或废弃有机物为食的生物'],
    [10, 'C', 'Use food chains and webs to describe the impact of overharvesting and introduced species', '用食物链与食物网说明过度捕捞与引入物种的影响'],
    [11, 'C', 'Draw, describe and interpret pyramids of numbers and of biomass', '绘制、描述并解读数量金字塔与生物量金字塔'],
    [12, 'C', 'Discuss the advantages of a pyramid of biomass over a pyramid of numbers', '讨论生物量金字塔相对数量金字塔的优点'],
    [13, 'C', 'Describe a trophic level as an organism’s position in a food chain', '把营养级描述为生物在食物链中的位置'],
    [14, 'C', 'Identify producers, consumers and decomposers as trophic levels', '把生产者、消费者与分解者识别为营养级'],
    [15, 'S', 'Draw, describe and interpret pyramids of energy', '绘制、描述并解读能量金字塔'],
    [16, 'S', 'Discuss the advantages of a pyramid of energy over the other pyramids', '讨论能量金字塔相对其他金字塔的优点'],
    [17, 'S', 'Explain why energy transfer between trophic levels is inefficient', '解释营养级之间能量传递为何效率不高'],
    [18, 'S', 'Explain why food chains usually have fewer than five trophic levels', '解释食物链为何通常少于五个营养级'],
    [19, 'S', 'Explain why eating crop plants is more energy efficient than eating livestock', '解释为何食用作物比食用牲畜更节能'],
  ]),
  sub('19.3', 'Nutrient cycles', '物质循环', [
    [1, 'C', 'Describe the carbon cycle', '描述碳循环'],
    [2, 'S', 'Describe the nitrogen cycle', '描述氮循环'],
    [3, 'S', 'State the roles of microorganisms in the nitrogen cycle', '说出微生物在氮循环中的作用'],
  ]),
  sub('19.4', 'Populations', '种群', [
    [1, 'C', 'Describe a population as one species living in the same area at the same time', '把种群描述为同一时间生活在同一区域的同种生物'],
    [2, 'C', 'Describe a community as all the populations in an ecosystem', '把群落描述为生态系统中所有的种群'],
    [3, 'C', 'Describe an ecosystem as a community together with its environment', '把生态系统描述为群落及其环境构成的整体'],
    [4, 'C', 'Identify the factors affecting the rate of population growth', '找出影响种群增长速率的因素'],
    [5, 'C', 'Identify the lag, exponential, stationary and death phases of a sigmoid curve', '识别 S 形曲线的延滞期、指数期、稳定期与衰亡期'],
    [6, 'C', 'Interpret graphs and diagrams of population growth', '解读种群增长的图表'],
    [7, 'S', 'Explain the factors that lead to each phase of the sigmoid growth curve', '解释导致 S 形增长曲线各阶段的因素'],
  ]),
])

// ---------------------------------------------------------------------------
// 20 Human influences on ecosystems
// ---------------------------------------------------------------------------

const topic20 = topic(20, { en: 'Human influences on ecosystems', zh: '人类对生态系统的影响' }, [
  sub('20.1', 'Food supply', '粮食供应', [
    [1, 'C', 'Describe how humans have increased food production', '描述人类提高粮食产量的方式'],
    [2, 'C', 'Describe the advantages and disadvantages of large-scale monocultures', '描述大规模单一栽培的优点与缺点'],
    [3, 'C', 'Describe the advantages and disadvantages of intensive livestock production', '描述集约化畜牧的优点与缺点'],
  ]),
  sub('20.2', 'Habitat destruction', '栖息地破坏', [
    [1, 'C', 'Describe biodiversity as the number of different species living in an area', '把生物多样性描述为某地区不同物种的数目'],
    [2, 'C', 'Describe the reasons for habitat destruction', '描述栖息地被破坏的原因'],
    [3, 'C', 'State that altering food chains and webs can have a negative impact on ecosystems', '说明改变食物链与食物网会对生态系统产生负面影响'],
    [4, 'C', 'Explain the undesirable effects of deforestation', '解释砍伐森林造成的不良后果'],
  ]),
  sub('20.3', 'Pollution', '污染', [
    [1, 'C', 'Describe the effects of untreated sewage and excess fertiliser on aquatic ecosystems', '描述未处理污水与过量化肥对水生生态系统的影响'],
    [2, 'C', 'Describe the effects of non-biodegradable plastics on ecosystems', '描述不可降解塑料对生态系统的影响'],
    [3, 'C', 'Describe the sources and effects of methane and carbon dioxide pollution', '描述甲烷与二氧化碳污染的来源与影响'],
    [4, 'S', 'Explain the process of eutrophication', '解释水体富营养化的过程'],
  ]),
  sub('20.4', 'Conservation', '保护', [
    [1, 'C', 'Describe a sustainable resource as one replaced as fast as it is removed', '把可持续资源描述为消耗多少就能补充多少的资源'],
    [2, 'C', 'State that forests and fish stocks can be conserved and managed sustainably', '说明森林与鱼类资源可以被保护并可持续管理'],
    [3, 'C', 'Explain why organisms become endangered or extinct', '解释生物为何濒危或灭绝'],
    [4, 'C', 'Describe how endangered species can be conserved', '描述如何保护濒危物种'],
    [5, 'S', 'Explain how forests can be conserved', '解释如何保护森林'],
    [6, 'S', 'Explain how fish stocks can be conserved', '解释如何保护鱼类资源'],
    [7, 'S', 'Describe the reasons for conservation programmes', '描述开展保护计划的原因'],
    [8, 'S', 'Describe the use of artificial insemination and IVF in captive breeding', '描述人工授精与试管受精在圈养繁育中的应用'],
    [9, 'S', 'Explain the risks to a species of losing genetic variation', '解释物种失去遗传变异所带来的风险'],
  ]),
])

// ---------------------------------------------------------------------------
// 21 Biotechnology and genetic modification
// ---------------------------------------------------------------------------

const topic21 = topic(
  21,
  { en: 'Biotechnology and genetic modification', zh: '生物技术与基因改造' },
  [
    sub('21.1', 'Biotechnology and genetic modification', '生物技术与基因改造', [
      [1, 'C', 'State that bacteria are useful in biotechnology because they reproduce rapidly', '说明细菌因繁殖迅速而在生物技术中有用'],
      [2, 'S', 'Discuss why bacteria are useful in biotechnology and genetic modification', '讨论细菌为何在生物技术与基因改造中有用'],
    ]),
    sub('21.2', 'Biotechnology', '生物技术', [
      [1, 'C', 'Describe the role of anaerobic respiration in yeast in making ethanol', '描述酵母无氧呼吸在制取乙醇中的作用'],
      [2, 'C', 'Describe the role of anaerobic respiration in yeast in bread-making', '描述酵母无氧呼吸在面包制作中的作用'],
      [3, 'C', 'Describe the use of pectinase in fruit juice production', '描述果胶酶在果汁生产中的应用'],
      [4, 'C', 'Investigate the use of biological washing powders containing enzymes', '探究含酶生物洗衣粉的作用'],
      [5, 'S', 'Explain the use of lactase to produce lactose-free milk', '解释用乳糖酶生产无乳糖牛奶'],
      [6, 'S', 'Describe how fermenters are used for large-scale production', '描述发酵罐如何用于大规模生产'],
      [7, 'S', 'Describe and explain the conditions controlled in a fermenter', '描述并解释发酵罐中需要控制的条件'],
    ]),
    sub('21.3', 'Genetic modification', '基因改造', [
      [1, 'C', 'Describe genetic modification as changing an organism’s genetic material', '把基因改造描述为改变生物的遗传物质'],
      [2, 'C', 'Outline examples of genetic modification', '概述基因改造的实例'],
      [3, 'S', 'Outline the process of genetic modification using bacteria to make a human protein', '概述利用细菌生产人类蛋白质的基因改造过程'],
      [4, 'S', 'Discuss the advantages and disadvantages of genetically modifying crops', '讨论转基因作物的优点与缺点'],
    ]),
  ]
)

export const igcseBiology0610: Syllabus = {
  code: '0610',
  title: { en: 'Cambridge IGCSE Biology', zh: '剑桥 IGCSE 生物' },
  shortName: { en: 'Biology', zh: '生物' },
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
    topic13,
    topic14,
    topic15,
    topic16,
    topic17,
    topic18,
    topic19,
    topic20,
    topic21,
  ],
}
