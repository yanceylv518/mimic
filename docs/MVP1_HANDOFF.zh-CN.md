# MVP1 交付说明

MVP1 是一个本地优先的“截图到预览”流程。它证明项目已经可以创建页面任务、绑定分析数据、生成 React + Tailwind 代码，并在本地预览结果。

## 当前已验证页面

当前验证对象是：

```text
generated/page-002/
```

它包含：

```text
screenshot.png
metadata.json
analysis.json
page.tsx
README.md
```

`page-001` 只是极小测试图片生成的冒烟测试任务。`page-002` 才是用户提供截图对应的任务。

## 运行 MVP1 流程

在仓库根目录运行：

```bash
npm run cli -- check
npm run generate -- --image input/screenshot.png
npm run analyze -- --page page-002 --analysis examples/page-analysis.example.json
npm run render -- --page page-002
npm run preview:build
npm run preview:dev
```

然后打开：

```text
http://127.0.0.1:5174/
```

检查预览服务是否可访问：

```bash
npm run preview:check
```

## MVP1 证明了什么

- 截图可以被登记成一个生成页面任务。
- 每个页面任务可以保存截图、metadata、analysis 和生成代码。
- `analysis.json` 可以被校验，并作为 React 页面生成的输入。
- 生成的 React + Tailwind 代码可以同步到预览应用。
- 预览应用可以在本地构建和运行。

## 重要限制

MVP1 还不能自动理解截图。

当前 `page-002` 的 `analysis.json` 来自：

```text
examples/page-analysis.example.json
```

这个文件是演示分析数据。里面的布局、颜色、间距、字体风格都是人工写好的占位内容，不是从截图中自动提取的。自动视觉分析应作为后续 Step 4B 接入。

## 下一步建议

进入 MVP2 前，可以先选择一个方向：

1. 增加 Step 4B：调用多模态模型，从 `screenshot.png` 自动生成 `analysis.json`。
2. 增强 Step 5：让当前规则生成器能从 schema 生成更丰富的页面。
3. 开始 MVP2：围绕现有 CLI 流程搭建本地 Web 工作台。
