# MVP1 开发计划

## 目标

构建一个本地命令行页面复刻 MVP：

1. 输入一张页面截图。
2. 自动或手动生成结构化的 `analysis.json`。
3. 根据 `analysis.json` 生成 React + Tailwind 页面。
4. 在本地预览。
5. 生成本地验证报告，便于和原图对比。

## 进度总览

| 步骤 | 名称 | 状态 | 输出 |
| --- | --- | --- | --- |
| 1 | 项目骨架 | 已完成 | 根配置、基础目录、提示词占位、检查脚本 |
| 2 | React + Tailwind 预览项目 | 已完成 | `preview/` Vite 预览应用，端口 `5174` |
| 3 | CLI 基础命令 | 已完成 | `generate` 命令、截图复制、metadata |
| 4 | 分析 schema 与导入命令 | 已完成 | `analysis.json` schema、模板、导入与校验 |
| 4B | 自动视觉分析 | 已完成 | `analyze:auto` 使用视觉模型生成 `analysis.json` |
| 4C | 布局位置分析 | 已完成 | `analysis.layout` 与 `section.position` |
| 4D | 视觉验证报告 | 已完成 | Playwright 截图与本地对比报告 |
| 5 | React 页面生成 | 已完成 | `page.tsx` 与预览同步 |
| 5B | 模型生成 TSX | 已完成 | `render:ai` 根据 `analysis.json` 生成页面代码 |
| 5C | AI 视觉反馈 | 已完成 | `feedback:ai` 对比原图和预览图并输出修正建议 |
| 5D | AI 页面补丁 | 已完成 | `patch:ai` 根据视觉反馈修正当前 TSX |
| 5E | 优化工作流 | 已完成 | `optimize:ai` 编排验证、反馈、补丁、构建和迭代记录 |
| 5F | 迭代接受 / 回退 | 已完成 | `iteration:accept` 与 `iteration:reject` |
| 6A | 本地 Web UI 产品雏形 | 已完成 | `studio:dev` 提供页面、迭代和 A/B/C 操作界面 |
| 6B | 上传截图与生成入口 | 已完成 | Studio 支持上传截图、创建任务、一键生成页面 |
| 6D | 项目偏好 / 全局规则 | 已完成 | `project-rules/dashboard.md` 自动注入模型链路 |
| 6 | MVP1 交付文档 | 已完成 | 中英文交付说明 |

## 关键说明

- `page-001` 是极小测试图生成的冒烟测试任务。
- `page-002` 是当前真实截图验证任务。
- `.env` 会自动加载，但不会提交到 git。
- `generated/`、`input/`、`validation/` 都是本地产物目录，默认不提交。

## Step 4B：自动视觉分析

真实调用：

```bash
npm run analyze:auto -- --page page-002
```

需要在 `.env` 中配置：

```text
OPENAI_API_KEY=your_api_key
OPENAI_BASE_URL=https://api.openai.com/v1
PAGE_MIMIC_OPENAI_MODEL=gpt-4.1-mini
```

## Step 4C：布局位置分析

新增页面级布局：

```json
{
  "layout": {
    "type": "dashboard",
    "columns": ["260px", "1fr", "320px"],
    "density": "medium"
  }
}
```

新增 section 位置：

```json
{
  "position": {
    "region": "left | top | main | right",
    "order": 1,
    "width": "260px | fluid | 320px",
    "height": "auto | fixed | full",
    "importance": "primary | secondary | utility",
    "density": "compact | medium | spacious"
  }
}
```

## Step 4D：视觉验证报告

运行：

```bash
npm run validate:visual -- --page page-002
```

输出：

```text
validation/page-002/report.md
validation/page-002/source-screenshot.png
validation/page-002/generated-preview.png
```

当前报告会检查：

- 预览页是否能打开
- 是否成功截图
- 控制台错误数量
- 页面类型、布局列、section 数量
- 供人工对照的检查清单

注意：这一步是人工对比报告，还不是像素级相似度评分。

## 常用命令

```bash
npm run cli -- check
npm run analyze:auto -- --page page-002
npm run render -- --page page-002
npm run render:ai -- --page page-002
npm run preview:build
npm run preview:check
npm run validate:visual -- --page page-002
npm run feedback:ai -- --page page-002
npm run patch:ai -- --page page-002
npm run optimize:ai -- --page page-002 --max-rounds 1 --note "页面应该左右结构，撑满页面"
npm run iteration:accept -- --page page-002 --iteration 2
npm run iteration:reject -- --page page-002 --iteration 2
npm run studio:dev
```

## Step 5B：模型生成 TSX

运行：

```bash
npm run render:ai -- --page page-002
```

这一步会读取：

```text
generated/page-002/analysis.json
prompts/generate-page.md
```

然后调用 `.env` 中配置的 OpenAI 兼容接口，生成：

```text
generated/page-002/page.tsx
preview/src/generated/Page.tsx
```

当前验收：

- `render:ai` 可以完成真实模型调用。
- 生成的 TSX 可以通过 Vite 构建。
- 预览健康检查通过。
- 视觉验证报告可以继续生成。

注意：`generated/page-002/` 和 `validation/page-002/` 仍是本地产物，不提交到 git。

## 下一步建议

## Step 5C：AI 视觉反馈

运行：

```bash
npm run feedback:ai -- --page page-002
```

这一步会读取：

```text
validation/page-002/source-screenshot.png
validation/page-002/generated-preview.png
validation/page-002/report.md
prompts/visual-feedback.md
```

然后输出：

```text
validation/page-002/ai-feedback.md
```

当前验收：

- `feedback:ai --dry-run` 可以检查本地验证产物是否齐全。
- `feedback:ai` 可以真实调用模型生成中文视觉反馈。
- 反馈内容包含主要差异、推荐修正和下一轮补丁范围。
- 这一步只产出建议，不直接改 TSX。

## 下一步建议

## Step 5D：AI 页面补丁

运行：

```bash
npm run patch:ai -- --page page-002
```

这一步会读取：

```text
generated/page-002/analysis.json
validation/page-002/ai-feedback.md
preview/src/generated/Page.tsx
prompts/patch-page.md
```

然后输出：

```text
generated/page-002/page.tsx
preview/src/generated/Page.tsx
generated/page-002/patches/before-*.tsx
```

当前验收：

- `patch:ai --dry-run` 可以检查输入是否齐全。
- `patch:ai` 可以真实调用模型生成一轮 TSX 修正。
- 旧版本 TSX 会备份到本地 `patches/`。
- 补丁后的页面通过 `preview:build`。
- 补丁后的页面可以继续生成视觉验证报告。

注意：这一步会修改当前预览页，因此每次运行后都应该跑：

```bash
npm run preview:build
npm run validate:visual -- --page page-002
```

## 下一步建议

## Step 5E：优化工作流

运行：

```bash
npm run optimize:ai -- --page page-002 --max-rounds 1 --note "页面应该左右结构，撑满页面"
```

这一步会自动执行：

```text
validate:visual
feedback:ai
patch:ai
preview:build
validate:visual
```

同时生成：

```text
validation/page-002/iterations/iteration-001/
  before.png
  after.png
  feedback.md
  note.txt
  before.tsx
  after.tsx
  report-before.md
  report-after.md
  01-validate-before.log
  02-feedback.log
  03-patch.log
  04-build.log
  05-validate-after.log
  result.json
```

当前验收：

- `optimize:ai --dry-run` 可以验证参数和本地页面。
- `optimize:ai` 可以跑完一轮真实优化。
- 每轮都有独立 iteration 目录。
- 每轮记录用户 `--note`、前后截图、前后 TSX、模型反馈、构建日志和结果 JSON。
- workflow 函数位于 `src/workflows/`，后续 Web UI 可以直接调用。

## 下一步建议

## Step 5F：迭代接受 / 回退命令

接受某一轮：

```bash
npm run iteration:accept -- --page page-002 --iteration 2 --note "人工确认可接受"
```

回退某一轮：

```bash
npm run iteration:reject -- --page page-002 --iteration 2 --note "这一轮不接受"
```

命令行为：

- `accept` 会把该轮 `after.tsx` 同步到当前预览页和 `generated/page-002/page.tsx`。
- `reject` 会把该轮 `before.tsx` 同步到当前预览页和 `generated/page-002/page.tsx`。
- 两个命令都会在对应 iteration 目录生成 `decision.json`。
- 两个命令都支持 `--dry-run`。

这一步对应产品里的人工选择：

```text
A 接受  -> iteration:accept
C 回退  -> iteration:reject
B 继续优化 -> optimize:ai
```

## 下一步建议

## Step 6A：本地 Web UI 产品雏形

运行：

```bash
npm run studio:dev
```

打开：

```text
http://127.0.0.1:5180/
```

当前 UI 能力：

- 查看已有页面任务。
- 上传新截图并生成新页面任务。
- 打开当前预览页。
- 查看原图和当前预览截图。
- 查看迭代记录。
- 对通过的迭代执行 A 接受、B 继续优化、C 回退。
- 输入人工提示后运行一轮优化。

当前后端接口：

```text
GET  /api/pages
POST /api/pages
GET  /api/pages/:pageId
POST /api/pages/:pageId/generate
POST /api/pages/:pageId/optimize
POST /api/pages/:pageId/iterations/:iteration/accept
POST /api/pages/:pageId/iterations/:iteration/reject
GET  /artifacts/*
```

当前验收：

- Studio 服务可以启动在 `5180`。
- `/api/pages/page-002` 可以返回页面状态和迭代列表。
- artifact 路由可以返回本地截图。
- 页面无浏览器控制台错误。
- 失败迭代不显示接受 / 回退按钮。

## 下一步建议

## Step 6B：上传截图与生成页面入口

Studio 新增“上传截图并生成”入口。

用户操作：

```text
选择截图 -> 点击“上传并生成页面”
```

后台执行：

```text
保存上传图片
创建 generated/page-xxx
analyze:auto
render:ai
preview:build
validate:visual
刷新 Studio 状态
```

新增 workflow：

```text
src/workflows/create-page-workflow.mjs
src/workflows/generate-page-workflow.mjs
```

当前验收：

- 上传图片保存逻辑通过临时目录测试。
- 创建任务 workflow 可以生成 `metadata.json`。
- 生成 workflow dry-run 可以通过 `analyze:auto` 和 `render:ai`。
- Studio 页面能看到上传区域。
- Studio API 仍能返回已有页面列表。

## 下一步建议

下一步建议进入 **Step 6C：生成进度与错误展示**。

当前“上传并生成页面”是一个长请求。下一步应该把它拆成可观察任务状态，至少在 UI 中展示当前执行到分析、渲染、构建还是验证，以及失败原因。

## Step 6D：项目偏好 / 全局规则

新增规则文件：

```text
project-rules/dashboard.md
```

该规则会自动注入：

```text
render:ai
feedback:ai
patch:ai
optimize:ai
Studio 上传生成 workflow
```

当前规则重点解决：

- 后台页面必须撑满浏览器，不要整体居中。
- 默认三栏结构：左侧导航、中间主内容、右侧状态工具栏。
- 右侧栏固定宽度，独立于主内容区。
- 刷新 / 设置 / 系统正常等工具按钮不能只在窄父级里 `ml-auto`。
- 如果存在右侧状态卡，工具栏应与右侧状态卡边缘对齐。

Studio 会在侧栏显示当前启用规则。

当前验收：

- `render:ai --dry-run` 显示规则已加载。
- `patch:ai --dry-run` 显示规则已加载。
- `feedback:ai --dry-run` 显示规则已加载。
- `/api/rules` 可以返回 `dashboard.md`。
- Studio 页面能显示 `dashboard.md`。

## 下一步建议

下一步建议进入 **Step 6C：生成进度与错误展示**。
