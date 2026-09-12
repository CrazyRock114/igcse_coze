/**
 * Bilingual interface copy.
 *
 * Chrome — button labels, panel headings, fallback guidance — as opposed to course
 * content, which lives in `src/content/`. It sits here rather than inside the
 * components because an ESLint rule forbids CJK literals in `src/components/**` and
 * `src/sim/**`: copy embedded in a component is copy that cannot be translated later.
 */

import type { Bilingual } from '@/content/types'

export const ui = {
  /** Shown in the controls panel when a lesson does not supply its own hint. */
  controlsHintFallback: {
    en: 'Drag a slider and watch the readings change.',
    zh: '拖动滑块，观察读数如何变化。',
  },
  /** Heads the row of one-click scenario buttons. */
  presetsLabel: {
    en: 'Jump to a scenario',
    zh: '一键跳到典型情形',
  },

  // --- sorting and matching exercises ---
  sortChooseItem: {
    en: 'Pick an item, then click the group it belongs to.',
    zh: '先选一个条目，再点击它所属的类别。',
  },
  sortChooseTarget: {
    en: 'Now click the group it belongs to. Click a placed item to take it back.',
    zh: '现在点击它所属的类别。点击已放置的条目可取回。',
  },
  sortPool: {
    en: 'Still to place',
    zh: '待归类',
  },
  matchChooseItem: {
    en: 'Pick one on the left, then click its partner on the right.',
    zh: '先选左侧的一项，再点击右侧与之配对的一项。',
  },
  matchChooseTarget: {
    en: 'Now click its partner on the right. Click a paired item to undo it.',
    zh: '现在点击右侧与之配对的一项。点击已配对的条目可取消。',
  },

  // --- Punnett squares ---
  punnettHint: {
    en: 'Every gamete from one parent, paired with every gamete from the other.',
    zh: '一个亲本的每个配子，与另一亲本的每个配子两两组合。',
  },
  punnettCaption: {
    en: 'Punnett square: the gametes of each parent along the edges, and the possible offspring in the cells.',
    zh: '庞纳特方格：两侧为各亲本的配子，格中为可能的子代。',
  },

  // --- ecological pyramids ---
  pyramidScale: {
    en: 'Bar widths are on a logarithmic scale — the numbers span too many orders of magnitude to draw to scale. The figure on each bar is the real value.',
    zh: '条形的宽度采用对数刻度——这些数值跨越的数量级太多，无法按比例绘制。每根条形上的数字才是真实数值。',
  },

  // --- vector diagrams ---
  vectorsHint: {
    en: 'Each arrow starts at the origin. The dashed lines complete the rectangle, which is where the right angle comes from.',
    zh: '每个箭头都从原点出发。虚线补全了矩形——直角正是从这里来的。',
  },
} satisfies Record<string, Bilingual>
