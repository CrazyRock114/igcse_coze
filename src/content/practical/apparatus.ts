/**
 * Apparatus catalogue for the Paper 5/6 practical-skills module.
 *
 * Data only — the inline SVG art for each instrument lives in the component
 * (`ApparatusArt.tsx`), keyed by `id`. Add a new instrument by adding a row
 * here and a matching SVG entry there.
 */
import type { Bilingual } from '@/content/types'

export interface ApparatusItem {
  id: string
  name: Bilingual
  purpose: Bilingual
  /** Paper 5 style exam tip — what examiners actually look for. */
  tip: Bilingual
}

export const APPARATUS: ApparatusItem[] = [
  {
    id: 'beaker',
    name: { en: 'Beaker', zh: '烧杯' },
    purpose: { en: 'Holding, mixing and heating liquids roughly — never for measuring volume.', zh: '粗略盛放、混合和加热液体——绝不用于量取体积。' },
    tip: { en: 'In a plan it is fine as a container; quoting a beaker as the measuring instrument loses the mark.', zh: '实验方案里可作容器；把烧杯当作量具会失分。' },
  },
  {
    id: 'measuring-cylinder',
    name: { en: 'Measuring cylinder', zh: '量筒' },
    purpose: { en: 'Measuring a volume of liquid to ±half the smallest division.', zh: '量取液体体积，精确到最小刻度的一半。' },
    tip: { en: 'Read the bottom of the meniscus at eye level on a flat bench.', zh: '在水平桌面上平视读取凹液面底部。' },
  },
  {
    id: 'thermometer',
    name: { en: 'Thermometer', zh: '温度计' },
    purpose: { en: 'Measuring temperature; typical resolution 1 °C.', zh: '测量温度；常见分辨率 1 °C。' },
    tip: { en: 'Wait until the reading stops moving, and keep the bulb in the middle of the liquid.', zh: '待示数稳定后读数，液泡应位于液体中央。' },
  },
  {
    id: 'ruler',
    name: { en: 'Ruler', zh: '刻度尺' },
    purpose: { en: 'Measuring length to ±1 mm (or better with a vernier).', zh: '测量长度，精确到 ±1 mm（游标卡尺更精）。' },
    tip: { en: 'State the resolution when you describe the measurement — examiners ask for it.', zh: '描述测量时要写出分辨率——考官常问。' },
  },
  {
    id: 'stopwatch',
    name: { en: 'Stopwatch', zh: '停表' },
    purpose: { en: 'Timing to ±0.1 s or better; human reaction adds ~0.2 s.', zh: '计时精确到 ±0.1 s 或更好；人的反应时间约 0.2 s。' },
    tip: { en: 'Time several repeats and average — say so in the method.', zh: '多次重复取平均——方法里要写明。' },
  },
  {
    id: 'balance',
    name: { en: 'Balance', zh: '天平' },
    purpose: { en: 'Measuring mass to ±0.01 g on a typical school balance.', zh: '常见学校天平测质量，精确到 ±0.01 g。' },
    tip: { en: 'Tare (zero) with the empty container before adding the sample.', zh: '加样前先把空容器去皮归零。' },
  },
  {
    id: 'burette',
    name: { en: 'Burette', zh: '滴定管' },
    purpose: { en: 'Delivering a variable volume precisely (±0.05 cm³).', zh: '精确放出可变体积液体（±0.05 cm³）。' },
    tip: { en: 'Read to 0.05 cm³ — two decimal places, and top to bottom scale.', zh: '读到 0.05 cm³——两位小数，刻度上大下小。' },
  },
  {
    id: 'pipette',
    name: { en: 'Pipette', zh: '移液管' },
    purpose: { en: 'Transferring one fixed volume very accurately.', zh: '非常精确地转移一个固定体积。' },
    tip: { en: 'One pipette = one fixed volume; choose the right size in the plan.', zh: '一支移液管对应一个固定体积；方案中要选对规格。' },
  },
]
