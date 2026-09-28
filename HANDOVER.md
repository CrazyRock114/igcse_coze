# HANDOVER — 交接说明（基线 v1.3.0）

> 交接对象：接手本项目的 Agent / 开发者。
> **必读顺序：本文件 → AGENTS.md（工程与架构约束）→ README.md**。
> 本文件只讲两件事：① 哪些改动是 Coze 沙箱环境特有的；② 迁移到 Vercel 部署需要做什么。其余架构、命令、代码规范以 AGENTS.md 为准，不在此重复。

## 0. 仓库与部署去向

- **本仓库（`igcse_coze`）= 开发主仓库**；原仓库 `Science_cc`（GitHub Pages）停止同步，不再作为发布目标。
- **目标部署平台：Vercel**（原 GitHub Pages 纯静态托管无法承载 Supabase + 动态 API 架构）。
- 基线：`v1.3.0` tag，**保留完整 git 历史**——历史中包含每轮回归的修复上下文（React 19 `use()` 缓存契约、registry `m.default` 提取、半格网格 bug 等），排障时先翻历史再动手。
- 仓库所有者交接操作：

  ```bash
  git tag v1.3.0 && git push origin main --tags
  # 在 Vercel 导入本仓库，Build Command 用默认 pnpm build（已含内容校验 + 类型检查 + bundle 预算）
  ```

- 导出到新仓库时可删除 `.coze`（沙箱专用，见下节）；`.gitignore` 中确认排除 `.preview`。

## 1. Coze 沙箱独有 —— 保留无害，但不要在别处尝试运行

| 项 | 说明 |
| --- | --- |
| `.coze` | 沙箱 TOML 启动配置（dev/deploy 的 build/run 命令）。其他环境直接 `pnpm dev` / `pnpm build`，无需此文件。`DEPLOY_RUN_PORT` 仅由沙箱注入，代码中禁止硬编码端口的约束仍然有效 |
| `scripts/gen-narration-audio.ts` | 依赖 `coze-coding-dev-sdk` 的 TTSClient，**只能在 Coze 环境运行**。`public/audio/` 下 236 个 mp3（en/zh 双语）是**已生成的产物**，当普通静态资产使用即可。新增课程需要补音频时：回到 Coze 环境跑 `pnpm run gen:narration`（幂等，已存在即跳过），或另行替换 TTS 供应商 |
| `scripts/qa-routes.mjs` 的 `page.evaluate` 点击 | 这是规避**沙箱 seccomp 对 headless_shell 输入管线的 SIGTRAP 限制**的 workaround。标准环境下 `locator.click()` 工作正常，可改回常规写法。该脚本还依赖本机 playwright 浏览器缓存，CI 不可移植（维持 AGENTS.md 既有结论） |

其余全部开箱即用：1654 个 kernel 单测、`check:content` 内容完整性、`check-bundle-budget` bundle 预算、`gen-lesson-index` 索引生成均为纯 Node 脚本，`pnpm build` 可直接作为 Vercel build command。

## 2. Vercel P0 —— AI 导师必须 Function 化（否则上线即坏）

**现状**：`tutor-plugin.mjs` 是 vite dev/preview 中间件（`configureServer` + `configurePreviewServer` 双挂载），`POST /api/tutor` SSE 端点**只存在于 dev server**。生产构建是纯静态产物 → **Vercel 上 AI 导师必定 404**。这是部署改造的第一优先级，不要误判为 bug。

**改造方案骨架**（保持契约不变，前端零改动）：

1. 新增 Vercel Function：`api/tutor.ts`（Node runtime 或 Edge，路径映射到 `/api/tutor`，与前端现有请求路径天然一致）。
2. 把 `coze-coding-dev-sdk` 的 `LLMClient.stream` 替换为 OpenAI 兼容的 `chat/completions`（`stream: true`）SSE 调用；model / key / base URL 全部走服务端环境变量，**不得出现在客户端 bundle**。
3. **SSE 帧格式保持不变**（`TutorPanel.tsx` 的解析器按此契约工作）：
   - 逐 token 帧：`data: {"content":"..."}\n\n`
   - 结束帧：`data: [DONE]\n\n`
   - 失败帧：`data: {"error":"..."}\n\n` —— 上游失败必须返回 error 帧，**禁止伪造成功响应**（此项为硬约束，AGENTS.md 同步记录）。
4. 请求体契约保持：`{ mode: 'explain' | 'mark', lang: 'en' | 'zh', question: {...}, studentAnswer?, markScheme? }`，系统提示词按 mode × lang 四选一（提示词文本在 `tutor-plugin.mjs` 内，迁移时原样搬运）。
5. （可选加固）前端 URL 改为 `import.meta.env.VITE_TUTOR_URL ?? '/api/tutor'`，便于 dev 插件与 prod function 分流。

**Vercel 环境变量清单**：

| 变量 | 必需 | 说明 |
| --- | --- | --- |
| `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` | 可选 | 缺失时全链路优雅降级本地模式（登录/云同步/教师看板不可用但不崩溃，`/teacher` 显示登录引导——**这是预期行为**） |
| `TUTOR_API_KEY` | Function 化后必需 | LLM 服务端密钥 |
| `TUTOR_BASE_URL` / `TUTOR_MODEL` | 建议 | OpenAI 兼容端点与模型名 |

**Supabase**：迁移 `supabase/migrations/0001-0005.sql` 已应用到当前连接的库（profiles / word_bank / mistakes / hook_ratings / statement_progress + RLS + 触发器）。新环境若连同一 Supabase 项目则无需操作；若是新库需重跑迁移。注意硬契约：`TEACHER_EMAIL`（`src/lib/teacher.ts`）必须与 `0004_teacher_by_email.sql` RLS 策略中的 email literal 一致，改一处必须同步另一处。

## 3. 验收基线（交接时状态，全部绿）

- `pnpm typecheck` / `pnpm lint`：0 错误
- `pnpm test`：1654 tests / 87 files 全过
- `pnpm build`：check:content（大纲覆盖率 100%）+ tsc + vite build + bundle 预算（entry 84.7 KB gzip / 400 KB 预算，vendor-three 不在入口闭包）
- `pnpm qa:routes`：8/8 路由交互冒烟（含 404、practical 双 tab）
- `POST /api/tutor` SSE：dev server 实测 token 级流式输出正常

任何一项在交接后变红，先查 git 历史中该文件的最近改动，不要凭空重写。
