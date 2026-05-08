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

下一步建议进入 **Step 5E：补丁前后对比与迭代记录**。

现在系统已经能“生成页面 -> 对比反馈 -> 应用补丁”。Step 5E 应该把每轮补丁的反馈、前后截图、构建结果记录成一个迭代日志，方便后续多轮微调和人工回看。
