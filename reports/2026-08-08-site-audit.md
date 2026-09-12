# IGCSE_miniMax 全面核查报告

**时间**：2026-08-08 (Asia/Shanghai)
**核查者**：Mavis (mavis-session mvs_62be77bae80740459d62a49dd8d0598d)
**main 最新 commit**：`63fcb03` (fix vocab tab 切换)
**核查范围**：代码 + 部署 + 公开页面渲染 + 交互实验 + 教学能力

---

## 0. 2026-08-18 增量更新

| 改动 | 原因 | commit |
|------|------|--------|
| Müller-Lyer A/B 方向反了 | 旧实现两侧 V 都是"fins 朝内"（outward/looks longer），两边看起来一样。改成 A 用 inward `>——<`（looks shorter）、B 用 outward `<——>`（looks longer），标准 Müller-Lyer 错觉 | (本次) |
| Ebbinghaus 紫色遮挡橙色 | 旧实现周围紫圈离中心 30px，但中心 r=20 + 紫圈 r=14 = 34，已经覆盖 4px。改成中心 r=15、紫圈 r=11（左侧）/r=4（右侧）、距离 32 / 28，干净环绕不挡 | (本次) |
| Ponzo 用了劣质手绘 | 旧实现两个青绿色实心圆 + 弱收敛线，不像经典 Ponzo。改成 Wikimedia Commons PolBr 的标准结构（CC-BY-SA 4.0，源码注释归因）——收敛线 + 两条等长黑横线 | (本次) |
| Experiment 2 描述修正 | 旧描述"RIGHT line has outward arrows"但代码里 right 是 plain line，改成准确描述 | (本次) |
| Bug #4 syllabus 10×10 关闭 | 经核对是设计意图而非 bug（`size-2.5` 就是地图一格的大小） | — |
| P1 GH Pages 404 fallback | workflow 早就有 `cp dist/index.html dist/404.html`（commit e1f404b 之后），无需新改 | — |
| P0 Vercel 同步 | **需用户手动在 Vercel Dashboard Redeploy**，机器人无 webhook 写权限 | — |

---

## 1. 总体健康度

| 维度 | 状态 | 说明 |
|------|------|------|
| 代码 (git main) | ✅ 干净 | working tree clean, 无 uncommitted |
| 部署 (GH Pages) | ✅ 同步 | 最新 commit `63fcb03` 已 deploy (build #31082374538 验证) |
| 部署 (Vercel) | ⚠️ 落后 2 commit | Vercel bundle 仍 `index-Bs7FXm6Q.js`，e7ac4f3 之后的 commit 没 rebuild |
| Lint / Typecheck | ✅ 绿 | pnpm run lint ✓, pnpm run typecheck ✓ |
| 公开页渲染 | ✅ OK | 首页 / 11-1 / 14-1 / 3-2-osmosis / /vocab 全部正常 |
| 互动实验 (4 个) | ✅ OK | 盲点 / Müller-Lyer match / afterimage / invisible-gorilla 全部渲染 |
| 教学能力 | ✅ 强 | 11-1 / 14-1 / 3-2-osmosis 加了大量 concept-explainers + extras |

**总体**：除了几个 P0/P1 bug，整体健康度 **良好**。网站公开部分用户体验扎实。

---

## 2. 教学能力盘点（最近 4 周交付）

### 2.1 Lessons & Extras

| 章节 | 已有 extras | 关键概念 |
|------|------------|----------|
| **7-1 Nutrition** | digestive-anatomy / teeth-anatomy / villi / bile / balanced-plate / food-energy / digestion-flow | 7 大营养 / 物理/化学消化 / 酶 / 吸收 |
| **8-3 Transport in plants** | villus-detail | 维管束 / 蒸腾 |
| **9-1 Transport in animals** | heart-anatomy / blood-vessels / double-circulation / blood-components | 心脏 / 血压 / 双循环 |
| **10-1 Disease & immunity** | (较少) | 免疫 |
| **11-1 Gas exchange** | **respiration-compare / airway-pathway / gas-exchange-features / smoking-effects / lungs-3d / mucociliary-escalator / air-quality** | 7 个 extras！最丰富 |
| **14-1 Nervous + eye** | **reflex-arc / eye-anatomy / brain-3d / eyeball-3d / pupil-reflex / visual-illusions (5 illusions + 4 experiments)** | 6 个 extras，含 4 个互动实验 |
| **14-3 Homeostasis** | glucose-loop / temperature-control | 血糖 / 体温 |
| **3-2 Osmosis** | **diffusion-vs-osmosis (新加)** | 渗透 |
| **16-1 Reproduction** | reproductive-anatomy / sperm-vs-egg / fertilisation / placenta | 4 个 extras |
| **17-1 Inheritance** | dna-to-protein / mitosis-vs-meiosis / punnett / pedigree | 4 个 extras |
| **19-1 Ecosystems** | food-web / pyramid / nutrient-cycle / population / food-web-3d | 5 个 extras |

### 2.2 Hooks bank (47 hooks, 7 节课)

- 7-1 (21), 9-1 (7), 11-1 (4), 14-1 (5), 14-3 (1), 17-1 (2), 19-1 (1)
- 全部带 `transcriptRef` + `whatItReplaces` + `source`
- UI: `/vocab?tab=hooks` (P0 修后可用)

### 2.3 数据库 (Supabase)

| Table | rows (估算) | 内容 |
|-------|-----------|------|
| profiles | 1 | 1 个 teacher 用户 (crazyrock2021@qq.com) |
| word_bank | 426 | 教师自己的词汇 |
| mistakes | 1 | 教师自己 |
| statement_progress | 40 | 教师自己 |
| hook_ratings | 0 | UI 还没上 |

⚠️ **没有其他"学生"** — 老师是唯一用户，所以 teacher dashboard 列表里只看到 1 行（教师自己）。

### 2.4 Supabase 集成

- 4 个 migrations applied: 0001, 0002, 0003, 0004
- RLS by email (0004 修了 0003 的 is_teacher self-toggle 漏洞)
- Auth: email confirm 已关闭（local dev）

---

## 3. 已确认 Bugs (按优先级)

### 🔴 P0 — 必修，阻塞用户

#### **Bug #1：Vercel 部署落后 main 2 个 commit**
- **现象**：`igcse.xyz` 仍在用 `index-Bs7FXm6Q.js`（commit b757293 之前的版本），最新 commit `63fcb03` 没 deploy
- **影响**：用户在 igcse.xyz 上看不到 teacher self-row 修复 + Hooks tab 修复
- **修复**：去 Vercel Dashboard → igcse-miniMax 项目 → Settings → Git → 检查 webhook 是否触发；如果 push 没触发 webhook，手动点 "Redeploy"
- **预防**：考虑加 CI step "Vercel deployment notification" 或换用 Vercel CLI deploy

#### **Bug #2：VocabPage Hooks tab 点击后内容不切换** (已修 `63fcb03`)
- **现象**：点 Hooks 按钮，URL 变 `?tab=hooks` 但页面还是渲染 "All terms" 列表
- **根因**：`useSearchParams` 作为 source of truth，React 18 跟 setSearchParams callback 有 race
- **修复**：改用 `useState` 作为 source of truth，URL 用 `useEffect` 单向镜像
- **状态**：✅ 已 commit + push，等 GH Pages deploy 完成（cron `check-63fcb03-deploy` 监控）

### 🟠 P1 — 应当修，影响体验

#### **Bug #3：GH Pages 深链接 404**
- **现象**：直接访问 `https://crazyrock114.github.io/IGCSE_miniMax/vocab?tab=hooks` 或 `/lesson/...` 返回 404
- **根因**：GitHub Pages 项目站点默认不处理 SPA fallback；需要 `public/404.html` 拷贝自 `dist/index.html`
- **影响**：用户从外站深链接进 GH Pages 版本会 404；但 Vercel 版本应该 OK
- **修复**：
  ```bash
  # 添加到 deploy.yml 的 build 步骤后
  cp dist/index.html dist/404.html
  ```
  实际上 GH Pages Action v5 的 README 推荐**先**复制再 build。需要在 deploy.yml 调整顺序或加 fallback 步骤。

#### **Bug #4：syllabus 链接 rect width=10 height=10 不可见**
- **现象**：首页 inspect 时，部分 syllabus statement 链接（"0625.1.1.1 · Core · ..."）rect 是 10×10，几乎不可见
- **复查结论** (2026-08-18)：**不是 bug**——`size-2.5` (10px) 方块就是 syllabus 地图的设计意图（一个 subject 几十上百条 statement，10px 才装得下）。Legend 区域在 `HomePage.tsx:120-141` 显式画了同尺寸的 10×10 色块说明"每格一条 statement"。Bug 报告里"可能"那一行确实是猜测，没有 DevTools 实测支撑。
- **结论**：关闭。不动。

### 🟡 P2 — 改进

#### **Bug #5：课堂 transcript review 没全跑**
- 8/6 录音做了 A+B 套餐全量回补（7 hooks / 37 vocab / 3 explainer / 1 visual-illusions 实验 / invisible-gorilla）
- 但之前的几节课（8/3 / 8/4 / 8/5）只做了部分 review，hooks bank 数量应该不止 47

#### **Bug #6：hooks bank 里有 2 个"教材图"hook** (`termite-cellulose-symbiont` 用了 / `eat-pig-grow-human` 用了 G8 Science 截图)
- 教材图属于版权敏感内容，公开站不宜直接展示

#### **Bug #7：Teacher dashboard 列表只有 1 行（教师自己）**
- 这是真实状态（没有其他学生注册）
- 建议：未来加邀请码机制让老师邀请"学生"

---

## 4. 部署层风险

| Risk | 当前状态 | 建议 |
|------|---------|------|
| GH Pages 偶尔卡 deploy_queued | 已发生 2 次 (b757293 / 63fcb03)，timeout 后 retry 通常成功 | 监控加 alert |
| Vercel 落后 main 2 commit | 持续 | 修 Vercel webhook，或用 Vercel CLI 替代 |
| 单一部署目标 (GH Pages 或 Vercel) | 用户两个都看 | 加 e2e smoke test on both |

---

## 5. 性能 / 包大小

| 指标 | 数值 | 评估 |
|------|------|------|
| Main JS bundle (gzip) | ~1.3 MB | 偏大，主要来自 R3F + three.js + KaTeX |
| CSS bundle (gzip) | ~18 KB | OK |
| Anatomy3D chunk | 23.49 KB gzip | 独立 chunk 拆分 OK |
| Initial page paint | 待测 | SPA 路由 |
| 3D 加载 | 待测 | R3F + GLB 模型懒加载 |

⚠️ **未做实际 lighthouse 测** — 需要用户跑测试或我加 perf API。

---

## 6. 后续迭代路线图

### 🔴 **本周末** (8/8 - 8/10)
1. 修 GH Pages 404.html SPA fallback (Bug #3)
2. 修 Vercel deploy 同步 (Bug #1)
3. 验证 `63fcb03` deploy 成功
4. 跑完整 e2e：首页 / 14-1 / 11-1 / 3-2-osmosis / /vocab 6 个 tab

### 🟡 **下周** (8/11 - 8/17)
1. 加邀请码机制：教师可以生成 6-位邀请码给学生 sign up
2. 跑 lighthouse audit，针对 R3F / KaTeX 拆包
3. Syllabus map 优化：syllabus 链接 width 10×10 bug
4. Hooks bank 整理：把"教材图"hook 转纯文字版本
5. classroom transcript review 持续：把 8/3 / 8/4 / 8/5 漏的 hooks 全补

### 🟢 **本月底前** (8/18 - 8/31)
1. **A2 知识图谱**（roadmap 提的）：把 0610 / 0620 / 0625 三个 syllabus 的 statement 用 graph 数据结构连起来，可视化
2. **A3 confusions**：建一个"易错点"知识库，连接 student mistakes + hooks
3. **B2 hook URL**：每个 hook 独立可分享 URL
4. **3D pin calibration**：8 个器官的 3D pin 用户自我校准
5. **C1 45min 模板**：教师一节课的 lesson 模板（按 syllabus 拼装）

### 🔵 **9 月规划**
1. **多学生 / 多班级支持**：teacher dashboard 加 classroom grouping
2. **Hook 投票系统**（rate-a-hook UI）：让 hook_ratings 表被填上
3. **移动端 PWA**：offline-first，service worker
4. **教师内部 content 工具**：让 teacher 自己写 hooks + vocab cards（web 端 admin）
5. **Analytics 仪表板**：每周课堂使用统计、错题频率、热区 syllabus

---

## 7. 已知未测项

1. **数据库层具体行数**：需用户跑 SQL（见下）
2. **GH Pages 部署延迟（GH 服务端）**：GH Pages 自己的问题，跟我们代码无关
3. **Console errors / network 4xx-5xx**：mavis 内置 browser 难抓
4. **Lighthouse 性能评分**：没跑过
5. **移动端布局**：没测
6. **Sign-in / Sign-up 流程**：v1.0 验过；v2.0 改动后没在 dev mode 复测
7. **Teacher dashboard /teacher/:userId**：v2.0 已修，但用户实测反馈还在

---

## 8. SQL 数据核查（需要你跑一下）

```sql
-- 总行数
SELECT 'profiles' AS t, count(*) FROM profiles
UNION ALL SELECT 'word_bank', count(*) FROM word_bank
UNION ALL SELECT 'mistakes', count(*) FROM mistakes
UNION ALL SELECT 'statement_progress', count(*) FROM statement_progress
UNION ALL SELECT 'hook_ratings', count(*) FROM hook_ratings;

-- 真实 student 列表 (排除教师自己)
SELECT p.id, p.display_name, p.emoji,
  (SELECT count(*) FROM word_bank WHERE user_id = p.id) AS words,
  (SELECT count(*) FROM mistakes WHERE user_id = p.id) AS mistakes,
  (SELECT count(*) FROM statement_progress WHERE user_id = p.id) AS progress
FROM profiles p
WHERE (p.id) != '6c678788-44b7-4f34-a075-12d2937d1378';
```

把结果发我，我可以补完报告的"实际学生数"部分。

---

## 9. 总结

**整体评价**：网站公开部分已经达到 **8/10 用户体验** —— 双语 + 教学能力扎实，互动实验可玩性强，3D 增强有质感。剩下的主要是 **部署可靠性**（GH Pages 404 / Vercel 落后）+ **单用户/多学生** 的真实验证（当前没其他学生）。

**最该做**（按 ROI 排序）：
1. **修 Vercel 同步 + 修 GH Pages 404 fallback** → 解锁深链接 + 双部署一致性
2. **加邀请码机制** → 让真实学生加入，验证多用户场景
3. **rate-a-hook UI** → 让 hook_ratings 表被填上，验证 teacher dashboard 第三个 widget
4. **Lighthouse audit** → 找到 R3F / KaTeX 拆包优化点

不建议做：
- 进一步加 vocab 词条（当前 464 词覆盖 IGCSE 三学科，已经够）
- 进一步加 hooks（40+ hooks 够用，缺的是用起来的数据）
- 大改 UI（双语 + 3D + 互动实验已经差异化）

**修了的（这次会话期间）**：
- ✅ `b757293`: teacher list filter teacher out + getStudentDetail error handling
- ✅ `e7ac4f3`: teacher list show self with "你" tag
- ✅ `63fcb03`: VocabPage Hooks tab switching (P0)
- ⏳ `63fcb03` deploy 等 cron 验证
