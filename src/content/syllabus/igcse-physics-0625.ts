/**
 * Cambridge IGCSE Physics 0625 — subject content map, 2026–2028 cycle.
 *
 * COMPLIANCE NOTE
 * ---------------
 * Statement *numbering* (e.g. 0625.1.2.6) and Core/Supplement *tiering* are factual
 * references to the published syllabus. The `label` strings below are **our own
 * paraphrases written for this course** — we do not reproduce the awarding body's
 * wording. The syllabus itself is © Cambridge University Press & Assessment; this
 * project is not endorsed by or affiliated with Cambridge.
 *
 * Source of structure: 0625 syllabus for examination in 2026, 2027 and 2028.
 * When the next cycle publishes, add a sibling file rather than editing this one —
 * lessons reference statement ids, so old and new cycles can coexist.
 */

import type { Bilingual, Syllabus, SyllabusStatement, SyllabusSubtopic, Tier } from '../types'

/** Authoring shorthand: [number, 'C' | 'S', English label, Chinese label] */
type Row = [number, 'C' | 'S', string, string]

function sub(id: string, en: string, zh: string, rows: Row[]): SyllabusSubtopic {
  const statements: SyllabusStatement[] = rows.map(([n, t, sen, szh]) => ({
    id: `0625.${id}.${n}`,
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
// 1 Motion, forces and energy
// ---------------------------------------------------------------------------

const topic1 = topic(1, { en: 'Motion, forces and energy', zh: '运动、力与能量' }, [
  sub('1.1', 'Physical quantities and measurement techniques', '物理量与测量方法', [
    [1, 'C', 'Measure length and volume with rulers and measuring cylinders', '用刻度尺和量筒测长度与体积'],
    [2, 'C', 'Measure time intervals with clocks and digital timers', '用钟表与电子计时器测时间间隔'],
    [3, 'C', 'Find an average for a small distance or short time by measuring multiples', '用多次测量求小距离、短时间的平均值'],
    [4, 'S', 'Distinguish scalar (magnitude only) from vector (magnitude and direction)', '区分标量与矢量'],
    [5, 'S', 'Identify which quantities are scalars', '识别哪些量是标量'],
    [6, 'S', 'Identify which quantities are vectors', '识别哪些量是矢量'],
    [7, 'S', 'Find the resultant of two perpendicular vectors by calculation or scale drawing', '用计算或作图法求两垂直矢量的合矢量'],
  ]),
  sub('1.2', 'Motion', '运动', [
    [1, 'C', 'Define speed and use v = s / t', '定义速度并使用 v = s / t'],
    [2, 'C', 'Define velocity as speed in a given direction', '定义速度为有方向的快慢'],
    [3, 'C', 'Use average speed = total distance / total time', '使用平均速度公式'],
    [4, 'C', 'Sketch, plot and interpret distance–time and speed–time graphs', '画出并解读位移–时间与速度–时间图像'],
    [5, 'C', 'Read off from a graph whether an object is at rest, at constant speed, accelerating or decelerating', '从图像判断静止、匀速、加速或减速'],
    [6, 'C', 'Find speed from the gradient of a distance–time graph', '由位移–时间图像的斜率求速度'],
    [7, 'C', 'Find distance from the area under a speed–time graph', '由速度–时间图像的面积求路程'],
    [8, 'C', 'Recall that g is about 9.8 m / s² near the Earth’s surface', '记住地表附近 g ≈ 9.8 m / s²'],
    [9, 'S', 'Define acceleration and use a = Δv / Δt', '定义加速度并使用 a = Δv / Δt'],
    [10, 'S', 'Tell constant from changing acceleration on a speed–time graph', '在速度–时间图像上区分匀变速与变加速'],
    [11, 'S', 'Find acceleration from the gradient of a speed–time graph', '由速度–时间图像的斜率求加速度'],
    [12, 'S', 'Treat deceleration as negative acceleration in calculations', '把减速当作负加速度参与计算'],
    [13, 'S', 'Describe falling with and without air resistance, including terminal velocity', '描述有无空气阻力时的下落，含收尾速度'],
  ]),
  sub('1.3', 'Mass and weight', '质量与重力', [
    [1, 'C', 'State that mass measures the quantity of matter in an object', '说明质量是物质多少的量度'],
    [2, 'C', 'State that weight is a gravitational force acting on a mass', '说明重力是作用在质量上的引力'],
    [3, 'C', 'Define gravitational field strength and use g = W / m', '定义重力场强度并使用 g = W / m'],
    [4, 'C', 'Compare weights and masses using a balance', '用天平比较重力与质量'],
    [5, 'S', 'Describe weight as the effect of a gravitational field on a mass', '把重力描述为引力场对质量的作用'],
  ]),
  sub('1.4', 'Density', '密度', [
    [1, 'C', 'Define density and use ρ = m / V', '定义密度并使用 ρ = m / V'],
    [2, 'C', 'Determine the density of a liquid, a regular solid and an irregular solid', '测定液体、规则固体与不规则固体的密度'],
    [3, 'C', 'Decide whether an object floats from density data', '由密度数据判断物体是否漂浮'],
    [4, 'S', 'Decide whether one liquid floats on another from density data', '由密度数据判断液体分层'],
  ]),
  sub('1.5.1', 'Effects of forces', '力的作用效果', [
    [1, 'C', 'State that forces can change the size and shape of an object', '说明力能改变物体的大小与形状'],
    [2, 'C', 'Sketch, plot and interpret load–extension graphs, and describe the experiment', '画出并解读载荷–伸长图像，并描述实验'],
    [3, 'C', 'Find the resultant of forces acting along the same straight line', '求同一直线上力的合力'],
    [4, 'C', 'State that an object stays at rest or at constant velocity without a resultant force', '说明无合力时物体保持静止或匀速直线运动'],
    [5, 'C', 'State that a resultant force can change an object’s speed or direction', '说明合力可改变速度大小或方向'],
    [6, 'C', 'Describe solid friction as a force that impedes motion and causes heating', '描述固体摩擦阻碍运动并生热'],
    [7, 'C', 'State that drag acts on an object moving through a liquid', '说明物体在液体中运动受阻力'],
    [8, 'C', 'State that drag acts on an object moving through a gas', '说明物体在气体中运动受阻力'],
    [9, 'S', 'Define the spring constant and use k = F / x', '定义劲度系数并使用 k = F / x'],
    [10, 'S', 'Identify the limit of proportionality on a load–extension graph', '在载荷–伸长图像上找出比例极限'],
    [11, 'S', 'Use F = ma, knowing force and acceleration share a direction', '使用 F = ma，力与加速度同向'],
    [12, 'S', 'Describe circular motion qualitatively in terms of a perpendicular force', '定性描述垂直于运动方向的力引起的圆周运动'],
  ]),
  sub('1.5.2', 'Turning effect of forces', '力的转动效果', [
    [1, 'C', 'Describe the moment of a force as its turning effect, with examples', '描述力矩为转动效果并举例'],
    [2, 'C', 'Use moment = force × perpendicular distance from the pivot', '使用 力矩 = 力 × 到支点的垂直距离'],
    [3, 'C', 'Apply the principle of moments with one force each side of the pivot', '对支点两侧各一个力应用力矩平衡'],
    [4, 'C', 'State the condition for equilibrium: no resultant force and no resultant moment', '说明平衡条件：合力与合力矩都为零'],
    [5, 'S', 'Apply the principle of moments with several forces each side', '对多力情形应用力矩平衡'],
    [6, 'S', 'Describe an experiment showing no resultant moment in equilibrium', '描述验证平衡时合力矩为零的实验'],
  ]),
  sub('1.5.3', 'Centre of gravity', '重心', [
    [1, 'C', 'State what is meant by centre of gravity', '说明什么是重心'],
    [2, 'C', 'Describe an experiment to find the centre of gravity of an irregular lamina', '描述测定不规则薄板重心的实验'],
    [3, 'C', 'Describe qualitatively how centre of gravity position affects stability', '定性说明重心位置对稳定性的影响'],
  ]),
  sub('1.6', 'Momentum', '动量', [
    [1, 'S', 'Define momentum and use p = mv', '定义动量并使用 p = mv'],
    [2, 'S', 'Define impulse and use impulse = FΔt = Δ(mv)', '定义冲量并使用 FΔt = Δ(mv)'],
    [3, 'S', 'Apply conservation of momentum to problems in one dimension', '用动量守恒解一维问题'],
    [4, 'S', 'Define resultant force as rate of change of momentum and use F = Δp / Δt', '定义合力为动量变化率并使用 F = Δp / Δt'],
  ]),
  sub('1.7.1', 'Energy', '能量', [
    [1, 'C', 'Name the energy stores: kinetic, gravitational, chemical, elastic, nuclear, electrostatic, internal', '列举各种能量储存形式'],
    [2, 'C', 'Describe how energy is transferred between stores', '描述能量在不同储存形式间的转移'],
    [3, 'C', 'Apply conservation of energy to simple cases, including flow diagrams', '对简单情形应用能量守恒，含流程图'],
    [4, 'S', 'Use Ek = ½mv²', '使用 Ek = ½mv²'],
    [5, 'S', 'Use ΔEp = mgΔh', '使用 ΔEp = mgΔh'],
    [6, 'S', 'Apply conservation of energy to multi-stage cases, including Sankey diagrams', '对多级过程应用能量守恒，含桑基图'],
  ]),
  sub('1.7.2', 'Work', '功', [
    [1, 'C', 'Understand that work done equals energy transferred', '理解做功等于能量转移'],
    [2, 'C', 'Use W = Fd = ΔE for mechanical work', '使用 W = Fd = ΔE'],
  ]),
  sub('1.7.3', 'Energy resources', '能源', [
    [1, 'C', 'Describe how useful energy or electrical power is obtained from each major resource', '描述各类能源如何产生有用能量或电能'],
    [2, 'C', 'Give advantages and disadvantages of each resource', '说出各类能源的优缺点'],
    [3, 'C', 'Understand efficiency of energy transfer qualitatively', '定性理解能量转移的效率'],
    [4, 'S', 'Know that the Sun is the source of most energy resources', '知道太阳是多数能源的来源'],
    [5, 'S', 'Know that nuclear fusion releases the Sun’s energy', '知道太阳能量来自核聚变'],
    [6, 'S', 'Know that fusion research aims at large-scale electricity generation', '知道聚变研究旨在大规模发电'],
    [7, 'S', 'Define and calculate percentage efficiency from energy or power', '定义并计算百分效率'],
  ]),
  sub('1.7.4', 'Power', '功率', [
    [1, 'C', 'Define power and use P = W / t and P = E / t', '定义功率并使用 P = W / t 与 P = E / t'],
  ]),
  sub('1.8', 'Pressure', '压强', [
    [1, 'C', 'Define pressure and use p = F / A', '定义压强并使用 p = F / A'],
    [2, 'C', 'Describe how pressure varies with force and area in everyday examples', '用日常例子说明压强随力与面积的变化'],
    [3, 'C', 'Describe qualitatively how liquid pressure varies with depth and density', '定性说明液体压强随深度与密度的变化'],
    [4, 'S', 'Use Δp = ρgΔh', '使用 Δp = ρgΔh'],
  ]),
])

// ---------------------------------------------------------------------------
// 2 Thermal physics
// ---------------------------------------------------------------------------

const topic2 = topic(2, { en: 'Thermal physics', zh: '热学' }, [
  sub('2.1.1', 'States of matter', '物质的状态', [
    [1, 'C', 'Know the distinguishing properties of solids, liquids and gases', '知道固、液、气三态的区别性质'],
    [2, 'C', 'Know the terms for changes of state', '知道各种物态变化的名称'],
  ]),
  sub('2.1.2', 'Particle model', '粒子模型', [
    [1, 'C', 'Describe the particle structure of the three states and draw particle diagrams', '描述三态的粒子结构并画粒子图'],
    [2, 'C', 'Relate particle motion to temperature, including absolute zero at −273 °C', '把粒子运动与温度联系，含绝对零度 −273 °C'],
    [3, 'C', 'Describe gas pressure in terms of particle motion and collisions with a surface', '用粒子运动与碰撞解释气体压强'],
    [4, 'C', 'Know that random motion of microscopic particles evidences the particle model', '知道微粒的无规则运动是粒子模型的证据'],
    [5, 'C', 'Describe and explain Brownian motion as random collisions', '用无规则碰撞描述并解释布朗运动'],
    [6, 'S', 'Relate forces and separations between particles to the properties of the three states', '把粒子间力与距离同三态性质联系'],
    [7, 'S', 'Explain gas pressure as force per unit area from particle collisions', '把气体压强解释为碰撞产生的单位面积上的力'],
    [8, 'S', 'Distinguish microscopic particles from the atoms or molecules that move them', '区分被撞的微粒与撞击它的原子或分子'],
  ]),
  sub('2.1.3', 'Gases and the absolute scale of temperature', '气体与热力学温标', [
    [1, 'C', 'Describe qualitatively how gas pressure changes with temperature or volume', '定性说明气体压强随温度或体积的变化'],
    [2, 'C', 'Convert between kelvin and degrees Celsius using T = θ + 273', '用 T = θ + 273 换算开尔文与摄氏度'],
    [3, 'S', 'Use pV = constant, including its graphical form', '使用 pV = 常数，含图像形式'],
  ]),
  sub('2.2.1', 'Thermal expansion of solids, liquids and gases', '固体、液体和气体的热膨胀', [
    [1, 'C', 'Describe thermal expansion qualitatively at constant pressure', '在恒压下定性描述热膨胀'],
    [2, 'C', 'Describe everyday applications and consequences of thermal expansion', '说明热膨胀的日常应用与后果'],
    [3, 'S', 'Explain the relative sizes of expansion using particle arrangement and motion', '用粒子排列与运动解释三态膨胀量级差异'],
  ]),
  sub('2.2.2', 'Specific heat capacity', '比热容', [
    [1, 'C', 'Know that raising temperature increases internal energy', '知道升温使内能增加'],
    [2, 'S', 'Describe a temperature rise as an increase in average particle kinetic energy', '把升温描述为粒子平均动能增大'],
    [3, 'S', 'Define specific heat capacity and use c = ΔE / (mΔθ)', '定义比热容并使用 c = ΔE / (mΔθ)'],
    [4, 'S', 'Describe experiments to measure the specific heat capacity of a solid and a liquid', '描述测定固体与液体比热容的实验'],
  ]),
  sub('2.2.3', 'Melting, boiling and evaporation', '熔化、沸腾与蒸发', [
    [1, 'C', 'Describe melting and boiling as energy input without temperature change', '把熔化与沸腾描述为吸热而温度不变'],
    [2, 'C', 'Know the melting and boiling temperatures of water at standard pressure', '知道标准大气压下水的熔点与沸点'],
    [3, 'C', 'Describe condensation and solidification in terms of particles', '用粒子描述凝结与凝固'],
    [4, 'C', 'Describe evaporation as escape of more energetic particles from the surface', '把蒸发描述为高能粒子从表面逸出'],
    [5, 'C', 'Know that evaporation cools the remaining liquid', '知道蒸发使剩余液体降温'],
    [6, 'S', 'Describe the differences between boiling and evaporation', '说明沸腾与蒸发的区别'],
    [7, 'S', 'Describe how temperature, surface area and air movement affect evaporation', '说明温度、表面积与空气流动对蒸发的影响'],
    [8, 'S', 'Explain the cooling of an object in contact with an evaporating liquid', '解释与蒸发液体接触的物体为何变冷'],
  ]),
  sub('2.3.1', 'Conduction', '热传导', [
    [1, 'C', 'Describe experiments comparing good and bad thermal conductors', '描述比较良导热体与绝热体的实验'],
    [2, 'S', 'Explain conduction using lattice vibrations and free electrons', '用晶格振动与自由电子解释热传导'],
    [3, 'S', 'Explain in terms of particles why gases and most liquids conduct badly', '用粒子解释气体与多数液体导热差'],
    [4, 'S', 'Know that some solids conduct better than insulators but worse than good conductors', '知道有些固体导热介于两者之间'],
  ]),
  sub('2.3.2', 'Convection', '对流', [
    [1, 'C', 'Know that convection transfers thermal energy in liquids and gases', '知道对流在液体与气体中传热'],
    [2, 'C', 'Explain convection using density changes and describe demonstrating experiments', '用密度变化解释对流并描述演示实验'],
  ]),
  sub('2.3.3', 'Radiation', '热辐射', [
    [1, 'C', 'Know that thermal radiation is infrared and that all objects emit it', '知道热辐射是红外线且所有物体都发射'],
    [2, 'C', 'Know that thermal radiation needs no medium', '知道热辐射不需要介质'],
    [3, 'C', 'Describe how surface colour and texture affect emission, absorption and reflection', '说明表面颜色与粗糙度对发射、吸收和反射的影响'],
    [4, 'S', 'Know that constant temperature requires equal rates of energy in and out', '知道恒温要求吸收与放出速率相等'],
    [5, 'S', 'Know what happens when the rates of energy in and out differ', '知道吸放速率不等时物体的变化'],
    [6, 'S', 'Know how the Earth’s temperature depends on the radiation balance', '知道地球温度取决于辐射平衡'],
    [7, 'C', 'Describe experiments distinguishing good and bad emitters of infrared', '描述区分红外良/劣发射体的实验'],
    [8, 'C', 'Describe experiments distinguishing good and bad absorbers of infrared', '描述区分红外良/劣吸收体的实验'],
    [9, 'S', 'Describe how emission rate depends on surface temperature and area', '说明辐射速率与表面温度及面积的关系'],
  ]),
  sub('2.3.4', 'Consequences of thermal energy transfer', '热传递的后果', [
    [1, 'C', 'Explain basic everyday applications of conduction, convection and radiation', '解释传导、对流与辐射的基本日常应用'],
    [2, 'S', 'Explain complex applications where more than one transfer mechanism matters', '解释多种传热方式同时起作用的复杂应用'],
  ]),
])

// ---------------------------------------------------------------------------
// 3 Waves
// ---------------------------------------------------------------------------

const topic3 = topic(3, { en: 'Waves', zh: '波' }, [
  sub('3.1', 'General properties of waves', '波的一般性质', [
    [1, 'C', 'Know that waves transfer energy without transferring matter', '知道波传递能量而不传递物质'],
    [2, 'C', 'Describe wave motion using ropes, springs and water waves', '用绳、弹簧与水波描述波动'],
    [3, 'C', 'Describe wavefront, wavelength, frequency, crest, trough, amplitude and wave speed', '描述波前、波长、频率、波峰、波谷、振幅与波速'],
    [4, 'C', 'Use v = fλ', '使用 v = fλ'],
    [5, 'C', 'Know that transverse waves vibrate at right angles to propagation', '知道横波振动方向垂直于传播方向'],
    [6, 'C', 'Know that longitudinal waves vibrate parallel to propagation', '知道纵波振动方向平行于传播方向'],
    [7, 'C', 'Describe reflection, refraction and diffraction of waves', '描述波的反射、折射与衍射'],
    [8, 'C', 'Describe ripple tank demonstrations of reflection, refraction and diffraction', '描述水波槽演示反射、折射与衍射'],
    [9, 'S', 'Describe how wavelength and gap size affect diffraction through a gap', '说明波长与缝宽对通过缝的衍射的影响'],
    [10, 'S', 'Describe how wavelength affects diffraction at an edge', '说明波长对边缘衍射的影响'],
  ]),
  sub('3.2.1', 'Reflection of light', '光的反射', [
    [1, 'C', 'Define and use normal, angle of incidence and angle of reflection', '定义并使用法线、入射角与反射角'],
    [2, 'C', 'Describe the image formed by a plane mirror and its characteristics', '描述平面镜成像及其特点'],
    [3, 'C', 'Use the fact that the angle of incidence equals the angle of reflection', '使用反射定律'],
    [4, 'S', 'Use constructions, measurements and calculations for plane mirrors', '用作图、测量与计算处理平面镜问题'],
  ]),
  sub('3.2.2', 'Refraction of light', '光的折射', [
    [1, 'C', 'Define and use normal, angle of incidence and angle of refraction', '定义并使用法线、入射角与折射角'],
    [2, 'C', 'Describe an experiment showing refraction through blocks of different shapes', '描述不同形状玻璃砖的折射实验'],
    [3, 'C', 'Describe the passage of light through a transparent material', '描述光通过透明介质的路径'],
    [4, 'C', 'State the meaning of critical angle', '说明临界角的含义'],
    [5, 'C', 'Describe internal reflection and total internal reflection with examples', '描述内反射与全反射并举例'],
    [6, 'S', 'Define refractive index as a ratio of wave speeds', '把折射率定义为波速之比'],
    [7, 'S', 'Use n = sin i / sin r', '使用 n = sin i / sin r'],
    [8, 'S', 'Use n = 1 / sin c', '使用 n = 1 / sin c'],
    [9, 'S', 'Describe the use of optical fibres in telecommunications', '说明光纤在通信中的应用'],
  ]),
  sub('3.2.3', 'Thin lenses', '薄透镜', [
    [1, 'C', 'Describe the action of converging and diverging lenses on a parallel beam', '描述凸透镜与凹透镜对平行光的作用'],
    [2, 'C', 'Define and use focal length, principal axis and principal focus', '定义并使用焦距、主光轴与焦点'],
    [3, 'C', 'Draw and use ray diagrams for a real image in a converging lens', '画凸透镜实像的光路图'],
    [4, 'C', 'Describe an image as enlarged/diminished, upright/inverted, real/virtual', '用放大/缩小、正立/倒立、实/虚描述像'],
    [5, 'C', 'Know that a virtual image comes from extrapolating diverging rays backwards', '知道虚像由发散光线反向延长得到'],
    [6, 'S', 'Draw and use ray diagrams for a virtual image in a converging lens', '画凸透镜虚像的光路图'],
    [7, 'S', 'Describe the use of a single lens as a magnifying glass', '说明单透镜作放大镜的用法'],
    [8, 'S', 'Describe lens correction of long- and short-sightedness', '说明透镜矫正远视与近视'],
  ]),
  sub('3.2.4', 'Dispersion of light', '光的色散', [
    [1, 'C', 'Describe dispersion of white light by a glass prism', '描述三棱镜对白光的色散'],
    [2, 'C', 'Know the seven colours of the visible spectrum in order', '按顺序知道可见光谱的七种颜色'],
    [3, 'S', 'Recall that light of a single frequency is monochromatic', '记住单一频率的光称为单色光'],
  ]),
  sub('3.3', 'Electromagnetic spectrum', '电磁波谱', [
    [1, 'C', 'Know the main regions of the electromagnetic spectrum in order', '按顺序知道电磁波谱的主要波段'],
    [2, 'C', 'Know that all electromagnetic waves travel at the same speed in a vacuum', '知道电磁波在真空中速度相同'],
    [3, 'C', 'Describe typical uses of each region of the spectrum', '说明各波段的典型用途'],
    [4, 'C', 'Describe harmful effects of excessive exposure to each region', '说明过量照射各波段的危害'],
    [5, 'C', 'Know that satellite communication mainly uses microwaves', '知道卫星通信主要用微波'],
    [6, 'S', 'Know that electromagnetic waves travel at 3.0 × 10⁸ m / s in a vacuum', '知道真空中电磁波速为 3.0 × 10⁸ m / s'],
    [7, 'S', 'Know which radiations underpin common communication systems and why', '知道常见通信系统所用的电磁波及原因'],
    [8, 'S', 'Know the difference between digital and analogue signals', '知道数字信号与模拟信号的区别'],
    [9, 'S', 'Know that sound can be transmitted digitally or as an analogue signal', '知道声音可以数字或模拟方式传输'],
    [10, 'S', 'Explain the benefits of digital signalling', '解释数字信号传输的优点'],
  ]),
  sub('3.4', 'Sound', '声', [
    [1, 'C', 'Describe how vibrating sources produce sound', '描述振动物体如何产生声音'],
    [2, 'C', 'Describe the longitudinal nature of sound waves', '描述声波的纵波性质'],
    [3, 'C', 'State the audible range as roughly 20 Hz to 20 000 Hz', '说出人耳听觉范围约 20 Hz 至 20 000 Hz'],
    [4, 'C', 'Know that sound needs a medium', '知道声音传播需要介质'],
    [5, 'C', 'Know that the speed of sound in air is about 330–350 m / s', '知道空气中声速约 330–350 m / s'],
    [6, 'C', 'Describe a method for determining the speed of sound in air', '描述测定空气中声速的方法'],
    [7, 'C', 'Describe how amplitude and frequency affect loudness and pitch', '说明振幅与频率如何影响响度与音调'],
    [8, 'C', 'Describe an echo as reflected sound', '把回声描述为声的反射'],
    [9, 'C', 'Define ultrasound as sound above 20 kHz', '把超声定义为高于 20 kHz 的声'],
    [10, 'S', 'Describe compression and rarefaction', '描述疏部与密部'],
    [11, 'S', 'Know that sound generally travels fastest in solids and slowest in gases', '知道声速一般固体>液体>气体'],
    [12, 'S', 'Describe uses of ultrasound, including depth and distance calculations', '说明超声的应用，含深度与距离计算'],
  ]),
])

// ---------------------------------------------------------------------------
// 4 Electricity and magnetism
// ---------------------------------------------------------------------------

const topic4 = topic(4, { en: 'Electricity and magnetism', zh: '电与磁' }, [
  sub('4.1', 'Simple phenomena of magnetism', '磁现象', [
    [1, 'C', 'Describe forces between poles and between magnets and magnetic materials', '描述磁极间以及磁体与磁性材料间的作用力'],
    [2, 'C', 'Describe induced magnetism', '描述磁化'],
    [3, 'C', 'State the differences between temporary and permanent magnets', '说出软磁与硬磁材料的区别'],
    [4, 'C', 'State the difference between magnetic and non-magnetic materials', '说出磁性与非磁性材料的区别'],
    [5, 'C', 'Describe a magnetic field as a region where a pole experiences a force', '把磁场描述为磁极受力的区域'],
    [6, 'C', 'Draw the pattern and direction of field lines around a bar magnet', '画条形磁铁周围磁感线的形状与方向'],
    [7, 'C', 'State that field direction is the force direction on an N pole', '说明磁场方向是北极受力方向'],
    [8, 'C', 'Describe plotting field lines with a compass or iron filings', '描述用小磁针或铁屑描绘磁感线'],
    [9, 'C', 'Describe uses of permanent magnets and electromagnets', '说明永磁体与电磁铁的用途'],
    [10, 'S', 'Explain magnetic forces as interactions between magnetic fields', '把磁力解释为磁场间的相互作用'],
    [11, 'S', 'Know that field line spacing represents relative field strength', '知道磁感线疏密表示磁场强弱'],
  ]),
  sub('4.2.1', 'Electric charge', '电荷', [
    [1, 'C', 'State that there are positive and negative charges', '说明电荷有正负两种'],
    [2, 'C', 'State that like charges repel and unlike charges attract', '说明同种电荷相斥、异种电荷相吸'],
    [3, 'C', 'Describe simple experiments producing and detecting electrostatic charge', '描述产生与检验静电荷的简单实验'],
    [4, 'C', 'Explain charging by friction as transfer of electrons only', '把摩擦起电解释为只转移电子'],
    [5, 'C', 'Describe an experiment distinguishing conductors from insulators', '描述区分导体与绝缘体的实验'],
    [6, 'C', 'Use a simple electron model to explain conductors and insulators', '用简单电子模型解释导体与绝缘体'],
    [7, 'S', 'State that charge is measured in coulombs', '说明电荷的单位是库仑'],
    [8, 'S', 'Describe an electric field as a region where a charge experiences a force', '把电场描述为电荷受力的区域'],
    [9, 'S', 'State that field direction is the force direction on a positive charge', '说明电场方向是正电荷受力方向'],
    [10, 'S', 'Describe simple electric field patterns and their directions', '描述简单电场分布及其方向'],
  ]),
  sub('4.2.2', 'Electric current', '电流', [
    [1, 'C', 'Know that current relates to the flow of charge', '知道电流与电荷流动有关'],
    [2, 'C', 'Describe the use of ammeters of different ranges', '说明不同量程电流表的使用'],
    [3, 'C', 'Describe conduction in metals as movement of free electrons', '把金属导电描述为自由电子的移动'],
    [4, 'C', 'Know the difference between direct and alternating current', '知道直流与交流的区别'],
    [5, 'S', 'Define current as charge per unit time and use I = Q / t', '把电流定义为单位时间内的电荷量并使用 I = Q / t'],
    [6, 'S', 'State the directions of conventional current and electron flow', '说明常规电流方向与电子流方向'],
  ]),
  sub('4.2.3', 'Electromotive force and potential difference', '电动势与电势差', [
    [1, 'C', 'Define e.m.f. as work done per unit charge around a complete circuit', '把电动势定义为单位电荷绕完整回路所做的功'],
    [2, 'C', 'Know that e.m.f. is measured in volts', '知道电动势的单位是伏特'],
    [3, 'C', 'Define p.d. as work done by a unit charge passing through a component', '把电势差定义为单位电荷通过元件所做的功'],
    [4, 'C', 'Know that p.d. is measured in volts', '知道电势差的单位是伏特'],
    [5, 'C', 'Describe the use of voltmeters of different ranges', '说明不同量程电压表的使用'],
    [6, 'S', 'Use E = W / Q for e.m.f.', '使用 E = W / Q'],
    [7, 'S', 'Use V = W / Q for p.d.', '使用 V = W / Q'],
  ]),
  sub('4.2.4', 'Resistance', '电阻', [
    [1, 'C', 'Use R = V / I', '使用 R = V / I'],
    [2, 'C', 'Describe an experiment determining resistance with a voltmeter and ammeter', '描述用电压表与电流表测电阻的实验'],
    [3, 'C', 'State qualitatively how wire resistance depends on length and cross-section', '定性说明导线电阻与长度和横截面积的关系'],
    [4, 'S', 'Sketch and explain I–V graphs for a resistor, a filament lamp and a diode', '画出并解释定值电阻、灯丝灯泡与二极管的伏安特性曲线'],
    [5, 'S', 'Use R ∝ l and R ∝ 1 / A for a metallic conductor', '对金属导体使用 R ∝ l 与 R ∝ 1 / A'],
  ]),
  sub('4.2.5', 'Electrical energy and electrical power', '电能与电功率', [
    [1, 'C', 'Understand that circuits transfer energy from a source to components and surroundings', '理解电路把能量从电源转移到元件与环境'],
    [2, 'C', 'Use P = IV', '使用 P = IV'],
    [3, 'C', 'Use E = IVt', '使用 E = IVt'],
    [4, 'C', 'Define the kilowatt-hour and calculate the cost of using appliances', '定义千瓦时并计算用电费用'],
  ]),
  sub('4.3.1', 'Circuit diagrams and circuit components', '电路图与元件', [
    [1, 'C', 'Draw and interpret circuit diagrams with the standard set of components', '画出并解读含标准元件的电路图'],
    [2, 'S', 'Draw and interpret circuit diagrams containing diodes and LEDs', '画出并解读含二极管与发光二极管的电路图'],
  ]),
  sub('4.3.2', 'Series and parallel circuits', '串联与并联电路', [
    [1, 'C', 'Know that current is the same at every point in a series circuit', '知道串联电路各处电流相同'],
    [2, 'C', 'Know how to construct and use series and parallel circuits', '会连接与使用串并联电路'],
    [3, 'C', 'Calculate the combined e.m.f. of sources in series', '计算串联电源的总电动势'],
    [4, 'C', 'Calculate the combined resistance of resistors in series', '计算串联电阻的总电阻'],
    [5, 'C', 'State that source current exceeds the current in each parallel branch', '说明干路电流大于各并联支路电流'],
    [6, 'C', 'State that two parallel resistors combine to less than either alone', '说明两并联电阻的总电阻小于任一支路'],
    [7, 'C', 'State the advantages of connecting lamps in parallel', '说明灯泡并联的优点'],
    [8, 'S', 'Use junction and p.d. relationships in calculations', '在计算中使用节点电流与电压关系'],
    [9, 'S', 'Explain that current into a junction equals current out', '解释流入节点的电流等于流出的电流'],
    [10, 'S', 'Calculate the combined resistance of two resistors in parallel', '计算两并联电阻的总电阻'],
  ]),
  sub('4.3.3', 'Action and use of circuit components', '元件的作用与应用', [
    [1, 'C', 'Know that p.d. across a conductor increases with resistance at constant current', '知道恒流时导体两端电压随电阻增大'],
    [2, 'S', 'Describe the action of a variable potential divider', '描述可调分压器的作用'],
    [3, 'S', 'Use R₁ / R₂ = V₁ / V₂ for a potential divider', '对分压器使用 R₁ / R₂ = V₁ / V₂'],
  ]),
  sub('4.4', 'Electrical safety', '用电安全', [
    [1, 'C', 'State the hazards of damaged insulation, overheating, damp and overloading', '说出绝缘破损、线路过热、潮湿与过载的危险'],
    [2, 'C', 'Know the live, neutral and earth wires and why switches go in the live wire', '知道火线、零线与地线，以及开关接火线的原因'],
    [3, 'C', 'Explain trip switches and fuses and choose appropriate ratings', '解释断路器与保险丝并选择合适规格'],
    [4, 'C', 'Explain why casings must be double-insulated or earthed', '解释外壳必须双重绝缘或接地的原因'],
    [5, 'C', 'State what a fuse protects in a double-insulated appliance', '说明双重绝缘电器中保险丝保护的对象'],
  ]),
  sub('4.5.1', 'Electromagnetic induction', '电磁感应', [
    [1, 'C', 'Know that relative motion or a changing field can induce an e.m.f.', '知道相对运动或磁场变化可产生感应电动势'],
    [2, 'C', 'Describe an experiment demonstrating electromagnetic induction', '描述演示电磁感应的实验'],
    [3, 'C', 'State the factors affecting the size of an induced e.m.f.', '说出影响感应电动势大小的因素'],
    [4, 'S', 'Know that an induced e.m.f. opposes the change causing it', '知道感应电动势阻碍引起它的变化'],
    [5, 'S', 'State and use the relative directions of force, field and induced current', '说明并使用力、磁场与感应电流的相对方向'],
  ]),
  sub('4.5.2', 'The a.c. generator', '交流发电机', [
    [1, 'S', 'Describe a simple a.c. generator, including slip rings and brushes', '描述简单交流发电机，含滑环与电刷'],
    [2, 'S', 'Sketch and interpret e.m.f.–time graphs and relate them to coil position', '画出并解读电动势–时间图像并与线圈位置对应'],
  ]),
  sub('4.5.3', 'Magnetic effect of a current', '电流的磁效应', [
    [1, 'C', 'Describe the field pattern and direction for straight wires and solenoids', '描述直导线与螺线管的磁场分布与方向'],
    [2, 'C', 'Describe an experiment identifying these field patterns', '描述确定这些磁场分布的实验'],
    [3, 'C', 'Describe the use of the magnetic effect in relays and loudspeakers', '说明磁效应在继电器与扬声器中的应用'],
    [4, 'S', 'State how field strength varies around straight wires and solenoids', '说明直导线与螺线管周围磁场强弱的变化'],
    [5, 'S', 'Describe the effect of changing current magnitude and direction on the field', '说明改变电流大小与方向对磁场的影响'],
  ]),
  sub('4.5.4', 'Force on a current-carrying conductor', '通电导体受到的力', [
    [1, 'C', 'Describe an experiment showing the force, including reversing current and field', '描述显示受力的实验，含反转电流与磁场'],
    [2, 'S', 'Use the relative directions of force, magnetic field and current', '使用力、磁场与电流的相对方向'],
    [3, 'S', 'Determine the force direction on beams of charged particles in a field', '判断磁场中带电粒子束的受力方向'],
  ]),
  sub('4.5.5', 'The d.c. motor', '直流电动机', [
    [1, 'C', 'Know that a current-carrying coil in a field turns, and what increases the effect', '知道磁场中通电线圈会转动及增强转动效果的因素'],
    [2, 'S', 'Describe motor operation, including the split-ring commutator and brushes', '描述电动机工作原理，含换向器与电刷'],
  ]),
  sub('4.5.6', 'The transformer', '变压器', [
    [1, 'C', 'Describe the construction of a simple soft-iron-cored transformer', '描述软铁芯变压器的构造'],
    [2, 'C', 'Use the terms primary, secondary, step-up and step-down', '使用原、副线圈与升压、降压等术语'],
    [3, 'C', 'Use Vp / Vs = Np / Ns', '使用 Vp / Vs = Np / Ns'],
    [4, 'C', 'Describe the use of transformers in high-voltage transmission', '说明变压器在高压输电中的应用'],
    [5, 'C', 'State the advantages of high-voltage transmission', '说明高压输电的优点'],
    [6, 'S', 'Explain the principle of operation of an iron-cored transformer', '解释铁芯变压器的工作原理'],
    [7, 'S', 'Use IpVp = IsVs for a 100% efficient transformer', '对理想变压器使用 IpVp = IsVs'],
    [8, 'S', 'Use P = I²R to explain why high-voltage transmission reduces losses', '用 P = I²R 解释高压输电减少损耗'],
  ]),
])

// ---------------------------------------------------------------------------
// 5 Nuclear physics
// ---------------------------------------------------------------------------

const topic5 = topic(5, { en: 'Nuclear physics', zh: '核物理' }, [
  sub('5.1.1', 'The atom', '原子', [
    [1, 'C', 'Describe atomic structure as a positive nucleus with orbiting electrons', '把原子结构描述为带正电的核与绕核电子'],
    [2, 'C', 'Know how atoms form positive and negative ions', '知道原子如何形成正、负离子'],
    [3, 'S', 'Describe how alpha scattering supports the nuclear model', '描述α粒子散射如何支持核式模型'],
  ]),
  sub('5.1.2', 'The nucleus', '原子核', [
    [1, 'C', 'Describe the nucleus as protons and neutrons', '把原子核描述为质子与中子'],
    [2, 'C', 'State the relative charges of protons, neutrons and electrons', '说出质子、中子与电子的相对电荷'],
    [3, 'C', 'Define proton number and nucleon number and calculate neutron number', '定义质子数与核子数并计算中子数'],
    [4, 'C', 'Use nuclide notation', '使用核素符号'],
    [5, 'C', 'Explain what an isotope is', '解释什么是同位素'],
    [6, 'S', 'Describe nuclear fission and fusion, including nuclide equations', '描述核裂变与核聚变，含核素方程'],
    [7, 'S', 'Relate proton number to the relative charge on a nucleus', '把质子数与核的相对电荷联系'],
    [8, 'S', 'Relate nucleon number to the relative mass of a nucleus', '把核子数与核的相对质量联系'],
  ]),
  sub('5.2.1', 'Detection of radioactivity', '放射性的探测', [
    [1, 'C', 'Know what is meant by background radiation', '知道什么是本底辐射'],
    [2, 'C', 'Know the significant sources of background radiation', '知道本底辐射的主要来源'],
    [3, 'C', 'Know that ionising radiation is measured with a detector and counter', '知道用探测器与计数器测量电离辐射'],
    [4, 'C', 'Use count rate in counts per second or per minute', '使用以每秒或每分钟计的计数率'],
    [5, 'S', 'Use background measurements to find a corrected count rate', '用本底测量求校正后的计数率'],
  ]),
  sub('5.2.2', 'The three types of nuclear emission', '三种核辐射', [
    [1, 'C', 'Describe nuclear emission as spontaneous and random in direction', '把核辐射描述为自发且方向随机'],
    [2, 'C', 'Identify alpha, beta and gamma by nature, ionising effect and penetration', '按性质、电离能力与穿透能力识别 α、β、γ'],
    [3, 'S', 'Describe deflection of the three emissions in electric and magnetic fields', '描述三种辐射在电场与磁场中的偏转'],
    [4, 'S', 'Explain relative ionising effects using kinetic energy and charge', '用动能与电荷解释相对电离能力'],
  ]),
  sub('5.2.3', 'Radioactive decay', '放射性衰变', [
    [1, 'C', 'Know that decay is a spontaneous, random change in an unstable nucleus', '知道衰变是不稳定核的自发随机变化'],
    [2, 'C', 'State that alpha or beta decay changes the element', '说明 α 或 β 衰变会改变元素种类'],
    [3, 'S', 'Know why isotopes may be radioactive', '知道同位素为何具有放射性'],
    [4, 'S', 'Describe the effect of each decay type on the nucleus', '描述各类衰变对原子核的影响'],
    [5, 'S', 'Use decay equations in nuclide notation', '用核素符号写衰变方程'],
  ]),
  sub('5.2.4', 'Half-life', '半衰期', [
    [1, 'C', 'Define half-life and use it in simple calculations, including decay curves', '定义半衰期并用于简单计算，含衰变曲线'],
    [2, 'S', 'Calculate half-life from data that still includes background radiation', '从含本底的数据计算半衰期'],
    [3, 'S', 'Explain how emission type and half-life determine an isotope’s application', '解释辐射类型与半衰期如何决定同位素用途'],
  ]),
  sub('5.2.5', 'Safety precautions', '安全防护', [
    [1, 'C', 'State the effects of ionising radiation on living things', '说出电离辐射对生物的影响'],
    [2, 'C', 'Describe safe movement, use and storage of radioactive materials', '描述放射性材料的安全搬运、使用与储存'],
    [3, 'S', 'Explain precautions in terms of time, distance and shielding', '用时间、距离与屏蔽解释防护措施'],
  ]),
])

// ---------------------------------------------------------------------------
// 6 Space physics
// ---------------------------------------------------------------------------

const topic6 = topic(6, { en: 'Space physics', zh: '空间物理' }, [
  sub('6.1.1', 'The Earth', '地球', [
    [1, 'C', 'Explain day and night from the Earth’s tilted daily rotation', '用地球倾斜自转解释昼夜'],
    [2, 'C', 'Explain the seasons from the Earth’s yearly orbit', '用地球公转解释四季'],
    [3, 'C', 'Explain the Moon’s phases from its monthly orbit', '用月球公转解释月相'],
    [4, 'S', 'Define and use average orbital speed v = 2πr / T', '定义并使用平均轨道速度 v = 2πr / T'],
  ]),
  sub('6.1.2', 'The Solar System', '太阳系', [
    [1, 'C', 'Describe the contents of the Solar System', '描述太阳系的组成'],
    [2, 'C', 'Contrast inner rocky and outer gaseous planets using an accretion model', '用吸积模型对比内侧岩质与外侧气态行星'],
    [3, 'C', 'Know how gravitational field strength depends on planet mass and distance', '知道重力场强度与行星质量及距离的关系'],
    [4, 'C', 'Calculate light travel time across Solar System distances', '计算光穿越太阳系距离所需时间'],
    [5, 'C', 'Know that the Sun holds most of the Solar System’s mass', '知道太阳占太阳系绝大部分质量'],
    [6, 'C', 'Know that gravitational attraction keeps objects in orbit around the Sun', '知道引力使天体绕太阳运行'],
    [7, 'S', 'Know that orbits are elliptical and the Sun is not at the centre', '知道轨道为椭圆且太阳不在中心'],
    [8, 'S', 'Analyse and interpret planetary data', '分析与解读行星数据'],
    [9, 'S', 'Know how the Sun’s field strength and planetary speeds fall with distance', '知道太阳引力与行星速度随距离减小'],
    [10, 'S', 'Explain faster motion near the Sun using conservation of energy', '用能量守恒解释近日点速度更快'],
  ]),
  sub('6.2.1', 'The Sun as a star', '作为恒星的太阳', [
    [1, 'C', 'Know the Sun’s size, composition and main emission regions', '知道太阳的大小、成分与主要辐射波段'],
    [2, 'S', 'Know that stable stars are powered by hydrogen fusing into helium', '知道稳定恒星由氢聚变为氦提供能量'],
  ]),
  sub('6.2.2', 'Stars', '恒星', [
    [1, 'C', 'State facts about galaxies, the Milky Way and the light-year', '说出关于星系、银河系与光年的事实'],
    [2, 'S', 'Know that one light-year is about 9.5 × 10¹⁵ m', '知道一光年约 9.5 × 10¹⁵ m'],
    [3, 'S', 'Describe the life cycle of a star', '描述恒星的一生'],
  ]),
  sub('6.2.3', 'The Universe', '宇宙', [
    [1, 'C', 'Know the scale of the Milky Way within the Universe', '知道银河系在宇宙中的尺度'],
    [2, 'C', 'Describe redshift as an increase in observed wavelength', '把红移描述为观测波长变长'],
    [3, 'C', 'Know that light from distant galaxies appears redshifted', '知道遥远星系的光发生红移'],
    [4, 'C', 'Know that redshift is evidence for an expanding Universe and the Big Bang', '知道红移是宇宙膨胀与大爆炸的证据'],
    [5, 'S', 'Know about cosmic microwave background radiation', '了解宇宙微波背景辐射'],
    [6, 'S', 'Explain the origin of the CMBR and its shift into the microwave region', '解释宇宙微波背景的来源及其红移到微波波段'],
    [7, 'S', 'Know that recession speed follows from the redshift of starlight', '知道退行速度可由星光红移求得'],
    [8, 'S', 'Know that supernova brightness gives the distance to a far galaxy', '知道超新星亮度可定遥远星系的距离'],
    [9, 'S', 'Define the Hubble constant and use H₀ = v / d', '定义哈勃常数并使用 H₀ = v / d'],
    [10, 'S', 'Know the current estimate of the Hubble constant', '知道哈勃常数的现行估计值'],
    [11, 'S', 'Know that 1 / H₀ estimates the age of the Universe', '知道 1 / H₀ 给出宇宙年龄的估计'],
  ]),
])

export const igcsePhysics0625: Syllabus = {
  code: '0625',
  title: { en: 'Cambridge IGCSE Physics', zh: '剑桥 IGCSE 物理' },
  shortName: { en: 'Physics', zh: '物理' },
  board: 'Cambridge International',
  cycle: [2026, 2028],
  guidedLearningHours: 130,
  topics: [topic1, topic2, topic3, topic4, topic5, topic6],
}

// ---------------------------------------------------------------------------
// Derived lookups
// ---------------------------------------------------------------------------

/** Every statement in the syllabus, flattened. */
export const allStatements: SyllabusStatement[] = igcsePhysics0625.topics.flatMap((t) =>
  t.subtopics.flatMap((s) => s.statements)
)

/** Statement lookup by id, e.g. `statementById.get('0625.1.2.6')`. */
export const statementById: ReadonlyMap<string, SyllabusStatement> = new Map(
  allStatements.map((s) => [s.id, s])
)

/** Subtopic lookup by the id a statement belongs to. */
export const subtopicByStatementId: ReadonlyMap<string, SyllabusSubtopic> = new Map(
  igcsePhysics0625.topics.flatMap((t) =>
    t.subtopics.flatMap((s) => s.statements.map((st) => [st.id, s] as const))
  )
)

export default igcsePhysics0625
