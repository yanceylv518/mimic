# MVP1 开发计�?
## 目标

构建一个本地命令行页面复刻 MVP�?
1. 输入一张页面截图�?2. 生成结构化的 `analysis.json`�?3. 生成 React + Tailwind 页面�?4. 在本地预览�?5. 生成结果可以被开发者继续人工修改�?
## 范围

MVP1 包含�?
- 单张截图输入�?- 单页面输出�?- 本地文件存储�?- React + Tailwind 预览�?- 基础 CLI 流程�?
MVP1 不包含：

- Web 工作�?UI�?- 多轮修改�?- 组件库抽取�?- 真实项目导入�?- OpenClaw 接入�?- Figma API�?- 自动视觉评分�?
## 进度总览

| 步骤 | 名称 | 状�?| 输出 |
| --- | --- | --- | --- |
| 1 | 项目骨架 | 已完�?| �?`package.json`、基础目录、提示词占位文件、检查脚�?|
| 2 | React + Tailwind 预览项目 | 已完�?| `preview/` 下的 Vite 预览应用，本地预览端�?`5174` |
| 3 | CLI 基础命令 | 已完�?| CLI 入口、图片输入处理、生成目�?|
| 4 | 页面分析提示词与 `analysis.json` | 下一�?| 稳定的分�?schema 和分析结果文�?|
| 5 | 根据 `analysis.json` 生成 React 页面 | 待开�?| `page.tsx` 和同步后的预览页�?|
| 6 | 本地预览�?MVP1 交付 | 待开�?| 完整的截图到预览流程，以及生成结果说�?|

## Step 1：项目骨�?
### 目标

创建项目基础结构和基础脚本�?
### 计划工作

- 创建根目�?`package.json`�?- 创建 `input/`、`generated/`、`prompts/`、`preview/`、`scripts/`�?- 添加提示词占位文件�?- 添加基础项目检查脚本�?
### 输出

```text
package.json
input/
generated/
prompts/
  analyze-page.md
  generate-page.md
preview/
scripts/
  check.mjs
  status.mjs
```

### 验收标准

- `npm run check` 可以通过�?- 仓库具备清晰�?MVP1 基础骨架�?
### 当前结果

已完成�?
提交�?
```text
4d43afd Initialize MVP1 project skeleton
```

## Step 2：React + Tailwind 预览项目

### 目标

创建一个可以渲染生成页面的本地预览应用�?
### 计划工作

- �?`preview/` 中搭�?Vite + React�?- 配置 Tailwind CSS�?- 创建 `preview/src/generated/Page.tsx`，作为生成页面插槽�?- �?`preview/src/App.tsx` 渲染生成页面�?- 添加根目录预览脚本�?
### 输出

```text
preview/
  index.html
  package.json
  vite.config.ts
  tailwind.config.js
  postcss.config.js
  src/
    App.tsx
    main.tsx
    index.css
    generated/
      Page.tsx
```

### 验收标准

- `npm run preview:build` 可以通过�?- `npm run preview:dev` 可以启动预览应用�?- 预览应用可以通过 `http://127.0.0.1:5174/` 访问�?- 占位页面可以看到 Tailwind 样式生效�?
### 当前结果

已完成�?
提交�?
```text
1212f4a Add React Tailwind preview app
```

备注�?
- `5173` 端口已被现有小龙虾后台占用，所�?Page Mimic 使用 `5174` 端口�?
## Step 3：CLI 基础命令

### 目标

创建 MVP1 生成任务的命令行入口�?
### 计划工作

- 添加 CLI 入口文件�?- 添加命令模块�?- 支持 `check` 命令�?- 支持 `generate` 占位命令�?- 读取图片路径，例�?`input/screenshot.png`�?- 创建生成页面目录，例�?`generated/page-001/`�?- 将源截图复制到生成目录�?- 创建基础 `metadata.json`�?
### 预期输出

```text
src/
  cli.ts
  commands/
    check.ts
    generate.ts
generated/
  page-001/
    screenshot.png
    metadata.json
```

### 验收标准

- CLI 可以从项目根目录运行�?- CLI 可以校验图片路径是否存在�?- CLI 可以创建稳定的生成页面目录�?- 生成目录中包含复制后的截图和 metadata�?
### 当前结果

已完成�?
提交�?
```text
b068ee3 Add CLI base generation command
```

验证�?
```bash
npm run cli -- check
npm run generate -- --image input/screenshot.png
```

## Step 4：页面分析提示词�?`analysis.json`

### 目标

将截图分析结果稳定为结构化数据�?
### 计划工作

- 完善 `prompts/analyze-page.md`�?- 定义最小版 `analysis.json` schema�?- 添加 CLI 写入 `analysis.json` 的能力�?- 第一版保持简单，允许使用手动或模型返回的分析内容�?
### 预期输出

```text
generated/
  page-001/
    analysis.json
prompts/
  analyze-page.md
```

### 最�?Schema

```json
{
  "pageType": "landing-page",
  "sections": [],
  "theme": {
    "colors": [],
    "fontStyle": "",
    "spacing": "",
    "radius": ""
  }
}
```

### 验收标准

- 每次生成任务都有 `analysis.json`�?- schema 足够稳定，可以支撑页面生成�?- 后续步骤可以依赖这个文件�?
### 当前结果

下一步�?
## Step 5：根�?`analysis.json` 生成 React 页面

### 目标

将结构化页面分析转换为可运行�?React 页面�?
### 计划工作

- 完善 `prompts/generate-page.md`�?- 生成 `generated/page-001/page.tsx`�?- 同步生成页面�?`preview/src/generated/Page.tsx`�?- 确认预览项目仍然可以构建�?
### 预期输出

```text
generated/
  page-001/
    page.tsx
preview/
  src/
    generated/
      Page.tsx
```

### 验收标准

- 生成页面可以在预览应用中渲染�?- 没有 React、TypeScript �?Vite 运行错误�?- 布局能够表达 `analysis.json` 中的结构�?
### 当前结果

待开始�?
## Step 6：本地预览与 MVP1 交付

### 目标

完成 MVP1 从截图到预览的完整闭环�?
### 计划工作

- 启动预览应用�?- 确认生成页面可见�?- 保存生成结果 README�?- 记录完整 MVP1 使用流程�?
### 预期输出

```text
generated/page-001/
  screenshot.png
  metadata.json
  analysis.json
  page.tsx
  README.md
```

### 验收标准

- 一张截图可以生成一个可预览页面�?- 生成结果易于检查和人工修改�?- 开发者可以根据文档命令重新运行流程�?
### 当前结果

待开始�?
## 更新规则

每完成一个步骤后�?
1. 更新进度总览表�?2. 记录提交 hash�?3. 记录验证命令�?4. 明确标记下一步�?5. 等待确认后再开始下一步�?