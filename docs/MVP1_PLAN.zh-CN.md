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
npm run preview:build
npm run preview:check
npm run validate:visual -- --page page-002
```

## 下一步建议

下一步建议进入 **Step 5B：让代码模型参与页面生成**。

当前规则渲染器已经能根据结构生成 dashboard，但还不够精细。Step 5B 可以让模型读取 `analysis.json`，直接生成更接近截图的 TSX。
