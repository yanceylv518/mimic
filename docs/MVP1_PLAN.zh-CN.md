# MVP1 开发计划

## 目标

构建一个本地命令行页面复刻 MVP：

1. 输入一张页面截图。
2. 生成结构化的 `analysis.json`。
3. 生成 React + Tailwind 页面。
4. 在本地预览。
5. 生成结果可以被开发者继续人工修改。

## 范围

MVP1 包含：

- 单张截图输入。
- 单页面输出。
- 本地文件存储。
- React + Tailwind 预览。
- 基础 CLI 流程。

MVP1 不包含：

- Web 工作台 UI。
- 多轮修改。
- 组件库抽取。
- 真实项目导入。
- OpenClaw 接入。
- Figma API。
- 自动视觉评分。

## 进度总览

| 步骤 | 名称 | 状态 | 输出 |
| --- | --- | --- | --- |
| 1 | 项目骨架 | 已完成 | 根 `package.json`、基础目录、提示词占位文件、检查脚本 |
| 2 | React + Tailwind 预览项目 | 已完成 | `preview/` 下的 Vite 预览应用，本地预览端口 `5174` |
| 3 | CLI 基础命令 | 已完成 | CLI 入口、图片输入处理、生成目录 |
| 4 | 页面分析提示词与 `analysis.json` | 已完成 | 稳定的分析 schema 和分析结果文件 |
| 4B | 自动视觉分析 | 已实现，待 API 实跑验证 | 使用 OpenAI Responses API 的 `analyze:auto` 命令 |
| 5 | 根据 `analysis.json` 生成 React 页面 | 已完成 | `page.tsx` 和同步后的预览页面 |
| 6 | 本地预览与 MVP1 交付 | 已完成 | 完整的截图到预览流程，以及生成结果说明 |

## 已完成步骤

- Step 1：项目骨架，提交 `4d43afd Initialize MVP1 project skeleton`
- Step 2：React + Tailwind 预览项目，提交 `1212f4a Add React Tailwind preview app`
- Step 3：CLI 基础命令，提交 `a841630 Add CLI base generation command`
- Step 4：页面分析 schema、模板、导入和校验，提交 `4027983 Add page analysis command`
- Step 5：根据 `analysis.json` 生成 React 页面，提交 `eb13735 Add analysis based page renderer`
- Step 6：MVP1 交付文档和预览检查，提交 `1c0c548 Add MVP1 handoff documentation`

## Step 4 的边界说明

Step 4 完成的是 `analysis.json` 的格式、模板、导入命令和校验。它本身不自动理解截图。

`examples/page-analysis.example.json` 是演示数据，其中的布局、颜色、间距和字体风格是人工写好的占位内容，不是从截图提取出来的。

## Step 4B：自动视觉分析

### 目标

使用多模态模型，直接从 `screenshot.png` 生成 `analysis.json`。

### 已实现内容

- 新增 `analyze:auto` CLI 命令。
- 从 `metadata.json` 读取截图路径。
- 将截图和 `prompts/analyze-page.md` 发送给支持视觉能力的模型。
- 要求模型返回符合页面分析 schema 的结构化 JSON。
- 写入 `generated/<page-id>/analysis.json` 前先校验返回结果。
- 没有 API key 时，已有 MVP1 流程仍然可以运行。

### 输出

```text
src/commands/analyze-auto.mjs
src/lib/openai-vision-analysis.mjs
src/lib/page-analysis-json-schema.mjs
.env.example
```

### 已完成验证

```bash
npm run analyze:auto -- --page page-002 --dry-run
npm run cli -- check
npm run preview:build
```

缺少 `OPENAI_API_KEY` 时会给出清晰错误。

### 待验证

配置真实 API key 后运行：

```powershell
$env:OPENAI_API_KEY="..."
npm run analyze:auto -- --page page-002
```

可选模型覆盖：

```powershell
$env:PAGE_MIMIC_OPENAI_MODEL="gpt-4.1-mini"
```

### 当前结果

已实现，待 API 实跑验证。

提交：

```text
e60f01c Add automatic vision analysis command
```

## 更新规则

每完成一个步骤后：

1. 更新进度总览表。
2. 记录提交 hash。
3. 记录验证命令。
4. 明确标记下一步。
5. 等待确认后再开始下一步。
