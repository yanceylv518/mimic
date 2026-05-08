# MVP1 交付说明

MVP1 已完成本地“截图到预览”的基本闭环：

```text
截图任务目录
→ analysis.json
→ page.tsx
→ 本地预览
→ 视觉验证报告
```

## 当前验证对象

```text
generated/page-002/
```

该目录本地包含：

```text
screenshot.png
metadata.json
analysis.json
page.tsx
README.md
```

这些生成产物不会提交到远程仓库。

## 运行流程

```bash
npm run cli -- check
npm run analyze:auto -- --page page-002
npm run render -- --page page-002
npm run render:ai -- --page page-002
npm run preview:build
npm run preview:dev
```

打开：

```text
http://127.0.0.1:5174/
```

检查预览：

```bash
npm run preview:check
```

生成视觉验证报告：

```bash
npm run validate:visual -- --page page-002
```

报告位置：

```text
validation/page-002/report.md
```

## 环境变量

本地 `.env`：

```text
OPENAI_API_KEY=your_api_key
OPENAI_BASE_URL=https://api.openai.com/v1
PAGE_MIMIC_OPENAI_MODEL=gpt-4.1-mini
```

`.env` 不会提交到 git。

## 当前能力

- 能登记截图任务。
- 能调用视觉模型生成结构化 `analysis.json`。
- 能识别 dashboard 的左栏、顶栏、主内容、右侧栏。
- 能保留部分真实中文文案。
- 能生成 React + Tailwind 预览页面。
- 能让代码模型基于 `analysis.json` 生成 TSX。
- 能生成本地视觉验证报告。

## 当前限制

- 还不是像素级复刻。
- 模型生成结果仍需要人工对照和迭代。
- 视觉验证报告目前是人工对比，不是自动评分。
- 还没有多轮修改能力。
- 还没有组件沉淀能力。

## 下一步建议

建议进入 **Step 5C：视觉反馈修正循环**。

也就是把原截图、预览截图和验证报告交给模型，让模型输出具体差异和下一轮 TSX 修改。
