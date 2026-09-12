import type { NarrationScript } from '@/content/types'

export const lensNarration: NarrationScript = {
  id: '3-2-lenses',
  sections: [
    {
      id: 'reflection',
      type: 'intro',
      title: { en: 'Angles measured from the normal', zh: '从法线量起的角' },
      lines: [
        {
          id: 're-1',
          text: {
            en: 'The normal is the line drawn perpendicular to the surface at the point where the ray hits it. Every angle in optics is measured from the normal, never from the surface — and getting that wrong turns a 30 degree answer into 60.',
            zh: '法线是在光线入射点处垂直于表面所作的直线。光学中的每一个角都是从法线量起的，绝不从表面量起——弄错这一点，30 度的答案就变成了 60 度。',
          },
        },
        {
          id: 're-2',
          text: {
            en: 'The angle of incidence is between the incoming ray and the normal; the angle of reflection is between the reflected ray and the normal. And the law is simply that they are equal.',
            zh: '入射角是入射光线与法线的夹角，反射角是反射光线与法线的夹角。定律很简单：两者相等。',
          },
        },
        {
          id: 're-3',
          text: {
            en: 'The image in a plane mirror has four properties, and all four are marks. It is the same size as the object. It is the same distance behind the mirror as the object is in front. It is virtual — no light actually comes from it. And it is laterally inverted: left and right are swapped, which is why text held up to a mirror reads backwards.',
            zh: '平面镜成像有四个性质，四个都是得分点。像与物大小相同。像在镜后的距离等于物在镜前的距离。像是虚像——并没有光真正从那里发出。像左右颠倒：左右互换，这就是把文字对着镜子看会反过来的原因。',
          },
        },
        {
          id: 're-4',
          text: {
            en: 'To construct it: drop a perpendicular from the object to the mirror, continue it the same distance behind, and that is where the image is. Rays from the object reflect off the mirror and appear to your eye to be coming from that point — so the construction lines behind the mirror are always drawn dashed, because no light is there.',
            zh: '作图方法：从物点向镜面作垂线，在镜后延长相同距离，那里就是像的位置。来自物体的光线经镜面反射后，在你眼中就像是从那一点发出的——因此镜后的作图辅助线永远画成虚线，因为那里没有光。',
          },
        },
      ],
    },
    {
      id: 'lenses',
      type: 'interaction',
      title: { en: 'Everything turns on one distance', zh: '一切都取决于一个距离' },
      lines: [
        {
          id: 'le-1',
          text: {
            en: 'A converging lens is thicker in the middle, and it brings a parallel beam to a point. That point is the principal focus, and its distance from the lens is the focal length. A diverging lens is thinner in the middle and spreads a parallel beam out, so its principal focus is the point the rays appear to come from.',
            zh: '凸透镜中间较厚，能把平行光束会聚到一点。这一点是焦点，它到透镜的距离是焦距。凹透镜中间较薄，会把平行光束发散开，因此它的焦点是光线看上去发出的那一点。',
          },
          action: { type: 'setParams', params: { objectDistance: 40, focalLength: 10, objectHeight: 2 } },
        },
        {
          id: 'le-2',
          text: {
            en: 'The principal axis is the line through the centre of the lens perpendicular to it, and everything is measured along it. Start with the object a long way out — well beyond twice the focal length.',
            zh: '主光轴是过透镜中心且与之垂直的直线，一切距离都沿它量取。先把物体放在很远处——远超过两倍焦距。',
          },
        },
        {
          id: 'le-3',
          text: {
            en: 'The image is real, inverted and diminished. Real means the rays actually meet there, so you could catch it on a screen. That is the arrangement in a camera and in your eye — a small inverted image of a large distant world.',
            zh: '此时成实像、倒立、缩小。"实"意味着光线真的在那里相交，因此可以用屏幕接收。这正是照相机和你眼睛中的情形——把广阔的远景缩成一个倒立的小像。',
          },
        },
        {
          id: 'le-4',
          text: {
            en: 'Now bring the object in to between one and two focal lengths. Still real, still inverted — but now magnified. That is a projector, and it is why a projector lens sits just outside the focal length of the slide.',
            zh: '现在把物体移到 1 倍与 2 倍焦距之间。仍是实像、仍然倒立——但现在放大了。这就是投影仪，也是投影镜头恰好位于胶片焦距之外一点的原因。',
          },
          action: { type: 'setParams', params: { objectDistance: 15, focalLength: 10, objectHeight: 2 } },
        },
        {
          id: 'le-5',
          text: {
            en: 'Keep going, right to the focal point itself. Look at what happens: no image at all. The rays leave the lens exactly parallel, so they never meet, and there is nowhere for an image to be.',
            zh: '继续靠近，一直到焦点本身。看看发生了什么：完全不成像。光线离开透镜时恰好平行，永不相交，因此没有任何位置可以成像。',
          },
          action: { type: 'setParams', params: { objectDistance: 10, focalLength: 10, objectHeight: 2 } },
          pause: 1,
        },
        {
          id: 'le-6',
          text: {
            en: 'And now step inside the focal length. Something different happens: the refracted rays diverge. They are spreading apart, so they will never meet, and there is no real image.',
            zh: '现在跨进焦距以内。情况变了：折射后的光线是发散的。它们越来越远，永不相交，因此没有实像。',
          },
          action: { type: 'setParams', params: { objectDistance: 5, focalLength: 10, objectHeight: 2 } },
        },
        {
          id: 'le-7',
          text: {
            en: 'But your eye does not know that. It receives diverging rays, and diverging rays are what it would receive from an object nearby — so it sees an image where those rays would have come from, by extrapolating them backwards. That is a virtual image: upright, magnified, and on the same side as the object. It is a magnifying glass.',
            zh: '但你的眼睛并不知道这一点。它接收到发散的光线，而发散光线正是近处物体所发出的——于是它把光线反向延长，在光线"本应来自"的地方看到一个像。这就是虚像：正立、放大，且与物体同侧。这就是放大镜。',
          },
        },
        {
          id: 'le-8',
          text: {
            en: 'Notice the image distance reading has gone negative. That negative sign is not a modelling accident — it is exactly what the word virtual means: the image is on the wrong side of the lens for light to be there, so the construction lines are drawn dashed.',
            zh: '注意像距的读数变成了负值。这个负号不是模型的意外——它恰恰就是"虚"字的含义：像位于光线不可能到达的那一侧，因此作图辅助线要画成虚线。',
          },
        },
        {
          id: 'le-9',
          text: {
            en: 'So four descriptions, and every image question wants all four: real or virtual, upright or inverted, magnified or diminished, and where it is. And all four follow from one thing — where the object sits relative to the principal focus.',
            zh: '于是有四项描述，每道成像题都要全部答出：实像还是虚像、正立还是倒立、放大还是缩小、以及位置在哪。而这四点都取决于一件事——物体相对于焦点的位置。',
          },
        },
      ],
    },
    {
      id: 'sight',
      type: 'concept',
      title: { en: 'Correcting an eye', zh: '矫正视力' },
      lines: [
        {
          id: 'si-1',
          text: {
            en: 'A short-sighted eye focuses distant objects in front of the retina rather than on it — the eyeball is too long, or the lens too strong. A diverging lens spreads the light out a little before it enters, so the focus moves back onto the retina.',
            zh: '近视眼把远处物体成像在视网膜之前而不是其上——眼球太长，或晶状体屈光力太强。凹透镜在光线进入之前先把它稍微发散，焦点便后移到视网膜上。',
          },
        },
        {
          id: 'si-2',
          text: {
            en: 'A long-sighted eye is the opposite: near objects focus behind the retina, because the eyeball is too short or the lens cannot become fat enough. A converging lens brings the light together a little sooner, moving the focus forward onto the retina.',
            zh: '远视眼正好相反：近处物体成像在视网膜之后，因为眼球太短或晶状体无法变得足够厚。凸透镜使光线提前会聚，把焦点前移到视网膜上。',
          },
        },
        {
          id: 'si-3',
          text: {
            en: 'The way to keep them straight is to ask which way the focus needs to move and which lens moves it that way. Short sight focuses too early, so you need the lens that delays the focus — the diverging one.',
            zh: '分清两者的办法是问：焦点需要往哪个方向移动，哪种透镜能把它往那个方向移。近视是聚焦得太早，因此需要能推迟聚焦的透镜——凹透镜。',
          },
        },
      ],
    },
    {
      id: 'dispersion',
      type: 'concept',
      title: { en: 'Splitting white light', zh: '把白光分开' },
      lines: [
        {
          id: 'di-1',
          text: {
            en: 'Send a narrow beam of white light through a triangular glass prism and it emerges spread into a band of colours. That is dispersion, and it happens because the glass refracts each colour by a slightly different amount.',
            zh: '让一束细白光通过三棱镜，射出时会展开成一条彩色的光带。这就是色散，其原因是玻璃对每种颜色的折射程度略有不同。',
          },
        },
        {
          id: 'di-2',
          text: {
            en: 'Red is refracted least and violet most, so violet ends up at the bottom of the spectrum and red at the top. The order is red, orange, yellow, green, blue, indigo, violet — and it is worth knowing which end is which, because questions ask.',
            zh: '红光折射最少，紫光最多，因此紫色在光谱的一端、红色在另一端。顺序是红、橙、黄、绿、蓝、靛、紫——值得记住哪一端是哪种颜色，因为题目会问。',
          },
        },
        {
          id: 'di-3',
          text: {
            en: 'White light is therefore not a colour at all — it is all of them together, and the prism does not add anything. It only separates what was already there, which is what a rainbow does with raindrops.',
            zh: '因此白光根本不是一种颜色——它是所有颜色的混合，棱镜并没有添加任何东西。它只是把原本就在其中的成分分开，彩虹用雨滴做的正是同一件事。',
          },
        },
        {
          id: 'di-4',
          text: {
            en: 'And light of a single frequency is called monochromatic. A laser is close to it; a filter gets partway there by absorbing the rest. Monochromatic light is not dispersed by a prism, because there is nothing to separate.',
            zh: '单一频率的光称为单色光。激光接近单色；滤光片则通过吸收其余成分来接近它。单色光经过棱镜不会发生色散，因为没有什么可以分开。',
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
            en: 'Every angle is measured from the normal. A plane mirror image is the same size, the same distance behind, virtual and laterally inverted — all four are marks.',
            zh: '所有角都从法线量起。平面镜成像与物等大、距离相等、是虚像、且左右颠倒——四点都是得分点。',
          },
        },
        {
          id: 'sum-2',
          text: {
            en: 'For a converging lens: beyond 2f gives real, inverted, diminished; between f and 2f gives real, inverted, magnified; inside f gives virtual, upright, magnified. Learn the three cases by where the object is relative to f.',
            zh: '对凸透镜：2f 之外成实像、倒立、缩小；f 与 2f 之间成实像、倒立、放大；f 以内成虚像、正立、放大。按物体相对于 f 的位置来记这三种情形。',
          },
        },
        {
          id: 'sum-3',
          text: {
            en: 'Draw virtual images and their construction rays as dashed lines, because no light is actually there. And in dispersion, red is refracted least and violet most.',
            zh: '虚像及其作图光线要画成虚线，因为那里实际上没有光。色散中，红光折射最少，紫光最多。',
          },
        },
      ],
    },
  ],
}

export default lensNarration
