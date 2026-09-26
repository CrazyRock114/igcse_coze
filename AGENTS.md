# AGENTS.md

## 项目概览

IGCSE 双语（英文主、中文脚手架）互动科学课程站。技术栈：Vite 7 + React 19 + TypeScript（strict）+ Tailwind + Supabase（可选后端）。核心设计是「内容即数据」：课程/教学大纲/题目全部为 TypeScript 数据文件，含 kernel 纯函数（驱动 SVG 模拟）与逐课单测。

## 常用命令

| 命令 | 作用 |
| --- | --- |
| `pnpm dev` | 开发服务器（端口取 `DEPLOY_RUN_PORT`） |
| `pnpm build` | `check:content` + `tsc -b` + `vite build`（内容完整性检查内置于构建） |
| `pnpm test` | vitest 全量单测（kernel 测试为主） |
| `pnpm typecheck` / `pnpm lint` | 类型检查 / ESLint |
| `pnpm check:content` | 课程完整性 + 大纲覆盖率检查 |
| `pnpm qa:routes` | 无头 Chromium 真实路由冒烟（依赖本机 playwright 浏览器缓存，CI 不可移植） |

## 架构要点

- `src/content/lessons/<subject>/<slug>/`：`lesson.ts`（数据+extras）、`kernel.ts`（模拟纯函数，禁 DOM/React）、`kernel.test.ts`。subject 必须与目录一致，完整性脚本强制校验。
- `src/lib/registry.ts`：**lazy glob** 按学科异步加载课程（`use()` 消费缓存的 Promise，禁止在渲染期创建新 Promise——React 19 会永久 suspend）。同步索引见 `src/content/lesson-index.generated.ts`（由 `scripts/gen-lesson-index.ts` 生成）。chunk 分组见 `vite.config.ts` 的 `manualChunks`（vendor-react / vendor-three / vendor-katex / vendor-uplot / content-06xx）。
- `src/lib/progressStore.ts`：`igcse.progress.v1` localStorage 存储；`src/lib/authStore.ts` + `SyncManager`：Supabase 登录/云同步。**未配置 Supabase 环境变量时全链路优雅降级到本地模式，禁止在未配置时抛错**。
- 教师看板 `/teacher`：登录门（`useCurrentUser`）+ email-based RBAC——`TEACHER_EMAIL`（`src/lib/teacher.ts`）必须与 `supabase/migrations/0004_teacher_by_email.sql` 中 RLS 策略的 email literal 保持一致，改一处必须同步另一处。
- 3D 组件（`three/@react-three` 系）**必须保持 lazy 引用**（Anatomy3D/DnaHelix3D/FoodWeb3D/两个全屏组件均已 lazy）；新增 3D 组件时同样走 `React.lazy`，否则 three.js 会回到首屏关键路径。
- `build.modulePreload` 保持 `false`：防止 Vite preload helper 被 Rollup 提升到含 three 的 chunk、把 1MB+ 的 3D 栈静态连回入口。
- v1.3 模块：`/practical`（器材参考 + 读数/描点训练，纯函数 kernel 在 `src/content/practical/`，带单测）；独立题库 `src/content/questions/bank-*.ts`（受 `check:content` 校验，题目 id 以科目代码开头）+ 错题复习流 `ReviewSession`；AI 导师 `TutorPanel` 可从题卡（explain）与复习（mark）进入。
- `tutor-plugin.mjs`（vite 插件，configureServer + configurePreviewServer 双挂载）提供 `POST /api/tutor` SSE 端点（帧格式 `data: {"content":...}` + 结束帧 `data: [DONE]`）；**修改插件后必须重启 dev server**，插件不在 HMR 范围。前端 fetch + getReader 打字机渲染；SDK 失败时端点返回 error 帧，禁止伪造成功响应。调用方需传 lang（en/zh）选择系统提示词。
- 旁白音频：`public/audio/{en,zh}/<scriptId>/<lineId>.mp3` 由 `scripts/gen-narration-audio.ts`（`pnpm run gen:narration`，参数 `--only/--langs/--max`）离线生成，幂等（已存在即跳过）；新增课程后重跑即可补齐。NarrationPlayer 按该路径回退播放。

## 环境变量

- `DEPLOY_RUN_PORT`：服务监听端口（沙箱注入，禁止硬编码）。
- `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY`：可选。缺失时应用以本地模式运行（登录/云同步/教师看板不可用但不崩溃）。

## 代码风格

- TypeScript strict；函数组件 + hooks；路径别名 `@/`。
- 文案走 `<T value={...} />` 双语组件（英文为主，`data-zh` 中文脚手架）。
- 全角标点仅允许出现在中文字符串内容里。
- 新增依赖前先评估体积与是否可 lazy。

## 测试与验证

- kernel 行为变更必须带 `kernel.test.ts` 更新。
- 内容类 PR 跑 `pnpm check:content`（覆盖率必须保持 100%）。
- 路由级回归可跑 `pnpm qa:routes`（需本机 Chromium headless shell）。

## 已知限制

- Supabase HTTP 凭证（VITE_SUPABASE_URL/ANON_KEY）未在沙箱注入时，登录/云同步/教师看板走本地降级；迁移已通过 SQL 工具应用到数据库，端到端联调需先开通 Supabase 集成。
- 沙箱/预览环境若未开通 Supabase，`/teacher` 将显示登录引导——这是预期行为，不是 bug。
