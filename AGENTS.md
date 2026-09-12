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
- `src/lib/registry.ts`：**eager glob** 全量加载所有课程——首屏体积的主要来源；改动加载方式前先理解 `vite.config.ts` 的 `manualChunks` 分组（vendor-react / vendor-three / vendor-katex / vendor-uplot / content-06xx）。
- `src/lib/progressStore.ts`：`igcse.progress.v1` localStorage 存储；`src/lib/authStore.ts` + `SyncManager`：Supabase 登录/云同步。**未配置 Supabase 环境变量时全链路优雅降级到本地模式，禁止在未配置时抛错**。
- 教师看板 `/teacher`：登录门（`useCurrentUser`）+ passcode（`src/lib/teacher.ts`，与迁移 SQL 中共享口令一致）。
- 3D 组件（`three/@react-three` 系）**必须保持 lazy 引用**（Anatomy3D/DnaHelix3D/FoodWeb3D/两个全屏组件均已 lazy）；新增 3D 组件时同样走 `React.lazy`，否则 three.js 会回到首屏关键路径。
- `build.modulePreload` 保持 `false`：防止 Vite preload helper 被 Rollup 提升到含 three 的 chunk、把 1MB+ 的 3D 栈静态连回入口。

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

- 主 bundle 仍同步加载三个学科内容 chunk（eager registry 架构）；拆分懒加载是既定迭代项，见 README「Roadmap (post-audit)」。
- 沙箱/预览环境若未开通 Supabase，`/teacher` 将显示登录引导——这是预期行为，不是 bug。
