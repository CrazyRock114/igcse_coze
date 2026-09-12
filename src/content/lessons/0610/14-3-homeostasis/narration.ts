import type { NarrationScript } from '@/content/types'

export const homeostasisNarration: NarrationScript = {
  id: '14-3-homeostasis',
  sections: [
    {
      id: 'intro',
      type: 'intro',
      title: { en: 'Chemical messages in the blood', zh: '血液中的化学信使' },
      lines: [
        {
          id: 'intro-1',
          text: {
            en: 'A hormone is a chemical made by a gland, released into the blood, and carried to organs elsewhere in the body, where it changes what those organs do. The blood reaches everywhere, so the message goes everywhere — only the target organs are able to respond to it.',
            zh: '激素是由腺体产生、释放进血液、并被运送到身体其他部位器官的化学物质，它在那里改变这些器官的活动。血液遍布全身，因此信息也传遍全身——只有靶器官才能对它作出反应。',
          },
        },
        {
          id: 'intro-2',
          text: {
            en: 'That is the first thing to have straight: nervous and hormonal control differ in almost every way. Nerve impulses are electrical, travel along neurones to one precise place, arrive in milliseconds, and their effect stops the moment the impulses do. Hormones are chemical, travel in the blood to everywhere at once, take seconds or minutes to arrive, and go on working long after the gland has stopped.',
            zh: '首要弄清的一点是：神经调节和激素调节几乎在每个方面都不同。神经冲动是电信号，沿神经元传到某一确切的部位，以毫秒计到达，冲动一停作用立即消失。激素是化学物质，随血液同时到达各处，需要数秒到数分钟才起效，且在腺体停止分泌后仍长时间发挥作用。',
          },
        },
        {
          id: 'intro-3',
          text: {
            en: 'Adrenaline is the one to know by name. It is made by the adrenal glands, just above the kidneys, and it is released when you are frightened, angry or about to do something strenuous. It raises the heart rate and breathing rate, widens the pupils, and moves blood away from the gut and towards the muscles — and it raises the blood glucose, by making the liver break glycogen down.',
            zh: '肾上腺素是必须记住名字的那一个。它由肾脏上方的肾上腺产生，在你恐惧、愤怒或即将剧烈活动时释放。它提高心率和呼吸频率，扩大瞳孔，把血液从消化道调往肌肉——并通过促使肝脏分解糖原来升高血糖。',
          },
        },
        {
          id: 'intro-4',
          text: {
            en: 'Every one of those changes is preparing the body for sudden physical effort. That is why it is called the fight-or-flight hormone, and why a question about adrenaline is really a question about getting glucose and oxygen to muscle.',
            zh: '这些变化无一例外都在为身体的突发剧烈活动作准备。这正是它被称为"战或逃"激素的原因，也是为什么关于肾上腺素的题目，实质上都在问如何把葡萄糖和氧气送到肌肉。',
          },
        },
      ],
    },
    {
      id: 'feedback',
      type: 'interaction',
      title: { en: 'Chasing a number you cannot hold', zh: '追一个抓不住的数字' },
      lines: [
        {
          id: 'fb-1',
          text: {
            en: 'Homeostasis is keeping the internal environment roughly constant — temperature, water, and here, blood glucose. The set point is about five millimoles per cubic decimetre. Eat a meal and the glucose rises above it; the pancreas notices and secretes insulin; insulin makes the liver and the muscles take glucose out of the blood and store it as glycogen. The glucose falls back.',
            zh: '稳态就是把内环境维持在大致恒定——温度、水分，以及这里的血糖。设定点约为每立方分米 5 毫摩尔。进餐后血糖升到设定点以上；胰腺察觉后分泌胰岛素；胰岛素促使肝脏和肌肉把葡萄糖从血液中取走，以糖原的形式贮存。血糖于是回落。',
          },
          action: {
            type: 'setParams',
            params: { meal: 60, insulin: 100, injection: 0, delay: 10 },
          },
        },
        {
          id: 'fb-2',
          text: {
            en: 'That is negative feedback: the response opposes the change that caused it. Rise, and something acts to lower it. Fall below, and glucagon does the opposite — it makes the liver break glycogen back down into glucose and put it into the blood.',
            zh: '这就是负反馈：反应与引起它的变化方向相反。升高了，就有东西把它降下来；降到设定点以下，胰高血糖素则做相反的事——促使肝脏把糖原分解回葡萄糖，释放入血。',
          },
        },
        {
          id: 'fb-3',
          text: {
            en: 'Now look at the graph rather than the sentence. The glucose never sits at five. It rises, it is pulled back, and it approaches the set point without ever settling exactly on it. Homeostasis does not hold a value. It chases one.',
            zh: '现在别看句子，看图。血糖从不停在 5。它上升，被拉回，逼近设定点却从不恰好停在那里。稳态并不"保持"一个数值，它是在"追赶"一个数值。',
          },
        },
        {
          id: 'fb-4',
          text: {
            en: 'The reason is delay. The pancreas responds to the glucose it measured a few minutes ago, not the glucose now. Wind the delay up and watch what happens: the peak gets higher, because insulin arrives late, and then the glucose crashes straight through the set point, because insulin is still working on a problem that has already been solved.',
            zh: '原因是延迟。胰腺反应的是它几分钟前测到的血糖，而不是此刻的血糖。把延迟调大，看看会发生什么：峰值更高，因为胰岛素来得太迟；随后血糖直接冲破设定点向下，因为胰岛素仍在处理一个已经解决了的问题。',
          },
          action: {
            type: 'setParams',
            params: { meal: 60, insulin: 100, injection: 0, delay: 25 },
          },
          pause: 1,
        },
        {
          id: 'fb-5',
          text: {
            en: 'And now the glucagon trace, which was flat before, comes to life. The glucose has fallen below the set point, so the other half of the loop takes over and brings it back up. Two hormones, opposite effects, one set point between them.',
            zh: '而原本平直的胰高血糖素曲线现在活跃起来了。血糖已跌破设定点，于是回路的另一半接管，把它拉回来。两种激素，作用相反，中间是同一个设定点。',
          },
        },
      ],
    },
    {
      id: 'diabetes',
      type: 'interaction',
      title: { en: 'Taking the loop apart', zh: '把回路拆开' },
      lines: [
        {
          id: 'db-1',
          text: {
            en: 'Now break it. Set the insulin response to zero — that is Type 1 diabetes, where the immune system has destroyed the cells in the pancreas that make insulin. Eat the same meal.',
            zh: '现在把它弄坏。把胰岛素反应设为零——这就是 1 型糖尿病，免疫系统摧毁了胰腺中产生胰岛素的细胞。吃同样的一餐。',
          },
          action: {
            type: 'setParams',
            params: { meal: 60, insulin: 0, injection: 0, delay: 10 },
          },
        },
        {
          id: 'db-2',
          text: {
            en: 'The glucose climbs and does not come down. Past ten millimoles the kidneys can no longer reabsorb it all, so glucose appears in the urine — which is how the disease was diagnosed for centuries, and where its name comes from.',
            zh: '血糖一路上升，再也下不来。超过 10 毫摩尔后，肾脏无法把它全部重吸收，葡萄糖就出现在尿中——几个世纪以来，这正是诊断这种疾病的方法，也是它名称的由来。',
          },
        },
        {
          id: 'db-3',
          text: {
            en: 'Notice that the glucagon side is still intact. Type 1 diabetes destroys only the cells that make insulin; the ones that make glucagon carry on. The loop is not broken — half of it is missing, and it happens to be the half you need after a meal.',
            zh: '注意，胰高血糖素这一侧仍然完好。1 型糖尿病只摧毁产生胰岛素的细胞，产生胰高血糖素的细胞照常工作。回路并没有断——只是缺了一半，而缺的恰好是进餐后需要的那一半。',
          },
        },
        {
          id: 'db-4',
          text: {
            en: 'So treat it: inject insulin. Get the dose right and the curve looks almost normal again. This is what someone with Type 1 diabetes does several times a day — test the blood, judge the meal, and choose a dose.',
            zh: '那就治疗它：注射胰岛素。剂量合适时，曲线几乎恢复正常。这就是 1 型糖尿病患者每天要做好几次的事——测血糖、估算这一餐、然后决定剂量。',
          },
          action: {
            type: 'setParams',
            params: { meal: 60, insulin: 0, injection: 100, delay: 10 },
          },
        },
        {
          id: 'db-5',
          text: {
            en: 'But look carefully at what an injection is. It is not part of the loop. It works to a timetable, not to a measurement — it goes on removing glucose whether there is any left or not. Push the dose up and watch.',
            zh: '但要仔细看清注射究竟是什么。它不属于这个回路。它按时间表工作，而不是按测量结果工作——不管血糖还剩不剩，它都继续在清除葡萄糖。把剂量调大，看看会怎样。',
          },
          action: {
            type: 'setParams',
            params: { meal: 60, insulin: 0, injection: 250, delay: 10 },
          },
          pause: 1,
        },
        {
          id: 'db-6',
          text: {
            en: 'The glucose falls through the set point and keeps going. That is a hypo — hypoglycaemia — and it is dangerous quickly, because the brain can only run on glucose and has no store of its own. Shaking, confusion, and if it goes far enough, unconsciousness.',
            zh: '血糖跌破设定点后继续下降。这就是"低血糖"——而且危险来得很快，因为大脑只能靠葡萄糖供能，自身又没有贮备。发抖、意识模糊，若继续下去便会昏迷。',
          },
        },
        {
          id: 'db-7',
          text: {
            en: 'This is the difference between a controller and a replacement. A pancreas measures and responds. An injection only delivers. That is why treatment is a matter of constant judgement rather than simply topping up what is missing.',
            zh: '这就是"调控者"与"替代品"的区别。胰腺会测量并作出反应，注射只是投送。这正是为什么治疗需要不断地判断，而不是简单地"把缺的补上"。',
          },
        },
      ],
    },
    {
      id: 'temperature',
      type: 'concept',
      title: { en: 'The same loop, a different quantity', zh: '同一个回路，不同的量' },
      lines: [
        {
          id: 'temp-1',
          text: {
            en: 'Temperature control is the same idea with different machinery. The set point is thirty-seven degrees, and it is monitored by the hypothalamus in the brain, which checks the temperature of the blood flowing through it.',
            zh: '体温调节是同一个思路，只是机制不同。设定点是 37 °C，由脑中的下丘脑监测——它检测流经自身的血液温度。',
          },
        },
        {
          id: 'temp-2',
          text: {
            en: 'Too hot, and two things happen. Sweat glands in the dermis release sweat onto the skin, and as it evaporates it takes energy from the body with it. And the arterioles supplying the surface capillaries widen — vasodilation — so more blood flows near the surface and more energy is radiated away.',
            zh: '过热时会发生两件事。真皮中的汗腺把汗液排到皮肤表面，汗液蒸发时带走身体的热量。同时供应体表毛细血管的小动脉舒张——血管舒张——使更多血液流经浅表，辐射出更多热量。',
          },
        },
        {
          id: 'temp-3',
          text: {
            en: 'Be careful with vasodilation: the capillaries themselves do not move and do not have muscle. It is the arterioles leading to them that widen or narrow. Saying "the capillaries move closer to the surface" is a common answer and a wrong one.',
            zh: '血管舒张这一点要小心：毛细血管本身不会移动，也没有肌肉。舒张或收缩的是通向它们的小动脉。写"毛细血管移向皮肤表面"是常见答案，但它是错的。',
          },
        },
        {
          id: 'temp-4',
          text: {
            en: 'Too cold, and it runs in reverse. Vasoconstriction narrows those arterioles so less blood reaches the surface. Sweating stops. Hairs are pulled upright to trap a layer of still air. And shivering begins — muscles contracting rapidly and involuntarily, and respiration in them releases energy as heat.',
            zh: '过冷时则反过来。血管收缩使这些小动脉变窄，流到体表的血液减少。出汗停止。毛发竖起，以滞留一层静止的空气。同时开始寒战——肌肉快速而不自主地收缩，其中的呼吸作用把能量以热的形式释放出来。',
          },
        },
      ],
    },
    {
      id: 'tropisms',
      type: 'concept',
      title: { en: 'How a plant responds without nerves', zh: '植物没有神经，如何反应' },
      lines: [
        {
          id: 'trop-1',
          text: {
            en: 'A plant has no nervous system at all, and it still responds to its surroundings — by growing. A tropism is a growth response in which the direction of growth depends on the direction of the stimulus.',
            zh: '植物完全没有神经系统，却依然能对环境作出反应——通过生长。向性就是一种生长反应，其生长方向取决于刺激的方向。',
          },
        },
        {
          id: 'trop-2',
          text: {
            en: 'Phototropism is the response to light. Shoots grow towards it, because they need light to photosynthesise. Gravitropism is the response to gravity. Roots grow towards it, which takes them down into the soil, towards water and anchorage; shoots grow away from it.',
            zh: '向光性是对光的反应。茎朝向光生长，因为它们需要光来进行光合作用。向重力性是对重力的反应。根朝向重力生长，从而深入土壤，去获取水分与固着；茎则背离重力生长。',
          },
        },
        {
          id: 'trop-3',
          text: {
            en: 'The mechanism is chemical. Auxin is a plant hormone made at the tip of a shoot. Light causes it to move to the shaded side, so the shaded side ends up with more auxin than the lit side.',
            zh: '其机制是化学性的。生长素是在茎尖产生的植物激素。光使它向背光的一侧移动，因此背光侧的生长素比向光侧多。',
          },
        },
        {
          id: 'trop-4',
          text: {
            en: 'Auxin makes the cells of a shoot elongate. So the shaded side grows longer than the lit side, and a shoot that is longer on one side than the other bends — towards the light. The plant is not steering. It is growing unevenly, and bending is what uneven growth looks like.',
            zh: '生长素使茎的细胞伸长。于是背光侧比向光侧长得更长，而一侧比另一侧长的茎就会弯曲——朝向光源。植物并没有在"转向"，它只是长得不均匀，而不均匀的生长看起来就是弯曲。',
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
            en: 'Negative feedback: the response opposes the change. Insulin lowers blood glucose by making the liver store it as glycogen; glucagon raises it by making the liver break glycogen down. Both are made by the pancreas.',
            zh: '负反馈：反应与变化方向相反。胰岛素通过促使肝脏把葡萄糖以糖原形式贮存来降低血糖；胰高血糖素则通过促使肝脏分解糖原来升高血糖。两者都由胰腺产生。',
          },
        },
        {
          id: 'sum-2',
          text: {
            en: 'When you are asked to explain a control mechanism, name four things: the set point, what detects the change, what responds, and how that response opposes the change. An answer that names only the hormone has done a quarter of the work.',
            zh: '当题目要求解释一种调控机制时，要说出四样东西：设定点、由什么检测变化、由什么作出反应、以及该反应如何对抗变化。只写出激素名称的答案，只完成了四分之一。',
          },
        },
        {
          id: 'sum-3',
          text: {
            en: 'And for the plant: light moves auxin to the shaded side, auxin makes cells elongate, the shaded side grows longer, the shoot bends towards the light. Four steps, in that order, every time.',
            zh: '至于植物：光使生长素移向背光侧，生长素使细胞伸长，背光侧长得更长，茎因而朝光弯曲。每次都是这四步，按这个顺序。',
          },
        },
      ],
    },
  ],
}

export default homeostasisNarration
