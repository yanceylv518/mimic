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
npm run validate:visual -- --page page-002
npm run feedback:ai -- --page page-002
npm run patch:ai -- --page page-002
npm run optimize:ai -- --page page-002 --max-rounds 1 --note "页面应该左右结构，撑满页面"
npm run iteration:accept -- --page page-002 --iteration 2
npm run iteration:reject -- --page page-002 --iteration 2
npm run studio:dev
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

生成 AI 视觉反馈：

```bash
npm run feedback:ai -- --page page-002
```

反馈位置：

```text
validation/page-002/ai-feedback.md
```

应用一轮 AI 页面补丁：

```bash
npm run patch:ai -- --page page-002
npm run preview:build
npm run validate:visual -- --page page-002
```

一键运行优化工作流：

```bash
npm run optimize:ai -- --page page-002 --max-rounds 1 --note "页面应该左右结构，撑满页面"
```

每轮记录位置：

```text
validation/page-002/iterations/iteration-*/
```

接受或回退某一轮：

```bash
npm run iteration:accept -- --page page-002 --iteration 2 --note "人工确认可接受"
npm run iteration:reject -- --page page-002 --iteration 2 --note "这一轮不接受"
```

对应人工选择：

```text
A 接受：iteration:accept
B 继续优化：optimize:ai
C 回退：iteration:reject
```

启动本地 Studio：

```bash
npm run studio:dev
```

打开：

```text
http://127.0.0.1:5180/
```

Studio 当前支持：

- 查看页面任务。
- 上传截图并创建新页面。
- 查看原图和生成图。
- 查看迭代记录。
- 输入优化提示。
- 点击 A 接受、B 继续优化、C 回退。

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
- 能让视觉模型对比原图和预览图，输出下一轮修正建议。
- 能根据 `ai-feedback.md` 对当前页面应用一轮受控 TSX 补丁。
- 能一键编排验证、反馈、补丁、构建和迭代记录。
- 能接受或回退某一轮优化结果。
- 能通过本地 Web UI 操作已有页面任务。
- 能通过 Studio 上传截图并触发生成 workflow。

## 当前限制

- 还不是像素级复刻。
- 模型生成结果仍需要人工对照和迭代。
- 视觉验证报告目前是人工对比，不是自动评分。
- 上传并生成当前是长请求，缺少细粒度进度展示。
- 还没有组件沉淀能力。

## 下一步建议

建议进入 **Step 6C：生成进度与错误展示**。

也就是把上传生成过程拆成可观察状态，让用户知道当前在分析、渲染、构建还是验证。
