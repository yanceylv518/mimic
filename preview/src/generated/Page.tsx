const leftSidebar = {
  "description": "Left vertical navigation sidebar with brand, main menu items, and user profile at the bottom.",
  "elements": [
    "小龙虾后台",
    "AI 内容生产系统",
    "总览",
    "任务运行",
    "工作流",
    "爆款拆解",
    "情报库",
    "知识库",
    "发布包",
    "流程编排",
    "入口助手",
    "模型与插件",
    "系统日志",
    "设置中心",
    "龙虾 Pro",
    "本地模式"
  ],
  "id": "sidebar",
  "layout": "stacked",
  "style": {
    "background": "#0b1220",
    "border": "subtle",
    "foreground": "#e5eefc",
    "radius": "0px",
    "spacing": "medium"
  },
  "title": "主导航",
  "type": "sidebar"
};
const headerSection = {
  "description": "Top horizontal bar with a large search input and utility actions on the right.",
  "elements": [
    "搜索任务、发布包、知识库…",
    "刷新",
    "设置",
    "系统正常"
  ],
  "id": "header",
  "layout": "two-column",
  "style": {
    "background": "#0a1020",
    "border": "subtle",
    "foreground": "#eaf1ff",
    "radius": "12px",
    "spacing": "medium"
  },
  "title": "顶部工具栏",
  "type": "header"
};
const heroSection = {
  "description": "Primary recommendation banner featuring a large AI suggestion, illustration, key recommendation text, CTAs, and expected benefit stats.",
  "elements": [
    "今日 AI 建议",
    "优先制作 2 条 AI 工具实操内容",
    "推荐方向：OpenClaw 自动发布、小红书流程自动化",
    "推荐原因：近期相关情报增长明显，历史发布效果良好",
    "开始生成内容",
    "查看推荐依据",
    "预计收益",
    "预计播放量提升 30%+",
    "用户互动率提升 20%+",
    "更容易获得爆款机会"
  ],
  "id": "hero",
  "layout": "two-column",
  "style": {
    "background": "#182a63",
    "border": "subtle",
    "foreground": "#f3f7ff",
    "radius": "16px",
    "spacing": "large"
  },
  "title": "优先制作 2 条 AI 工具实操内容",
  "type": "hero"
};
const mainSections = [
  {
    "description": "Main opportunity list showing three highlighted content ideas as compact cards with badges and action buttons.",
    "elements": [
      "今日机会（最多 3 个）",
      "查看全部机会",
      "01 OpenClaw 自动发布全流程",
      "来源：情报库",
      "热度上升",
      "生成发布包",
      "加入待办",
      "02 GPT 视频生成实操技巧",
      "来源：热点",
      "高互动",
      "03 AI 副业变现流程拆解",
      "来源：历史复盘",
      "转化高"
    ],
    "id": "features",
    "layout": "grid",
    "style": {
      "background": "#0f1727",
      "border": "subtle",
      "foreground": "#e8f0ff",
      "radius": "14px",
      "spacing": "medium"
    },
    "title": "今日机会",
    "type": "features"
  },
  {
    "description": "Three summary cards for in-progress, pending publish, and failed tasks with large numeric counts and sparkline-style visuals.",
    "elements": [
      "正在生成",
      "1",
      "1个任务进行中",
      "待发布",
      "2",
      "条内容待发布",
      "失败任务",
      "1",
      "1个任务失败",
      "查看并重试"
    ],
    "id": "content",
    "layout": "grid",
    "style": {
      "background": "#0f1727",
      "border": "subtle",
      "foreground": "#eef4ff",
      "radius": "14px",
      "spacing": "medium"
    },
    "title": "任务概览",
    "type": "content"
  },
  {
    "description": "Left lower panel listing actionable todo items with status icons and right-aligned buttons.",
    "elements": [
      "待处理事项（行动清单）",
      "确认今日选题方向",
      "已基于 AI 建议和情报库生成 3 个候选选题",
      "去处理",
      "优化 1 条发布包内容",
      "《OpenClaw 自动发布全流程》待润色优化",
      "去优化",
      "发布 2 条待发布内容",
      "还有 2 条内容等待发布到小红书 / 视频号",
      "去发布",
      "复盘昨日最佳内容",
      "分析数据表现，总结可复用的爆款要素",
      "查看复盘"
    ],
    "id": "content-tasks",
    "layout": "stacked",
    "style": {
      "background": "#0f1727",
      "border": "subtle",
      "foreground": "#eaf1ff",
      "radius": "14px",
      "spacing": "medium"
    },
    "title": "待处理事项",
    "type": "content"
  },
  {
    "description": "Right lower main panel showing a recent result card with thumbnail, engagement metrics, and AI summary text.",
    "elements": [
      "最近结果（昨日）",
      "查看完整复盘",
      "最佳内容",
      "普通人用 AI 做自动发布的一天",
      "2.3w 播放",
      "1.2k 点赞",
      "156 评论",
      "312 收藏",
      "AI 复盘总结",
      "标题包含“普通人”更容易引发共鸣，实操步骤清晰，下次增加对比效果和时间收益类内容。"
    ],
    "id": "content-results",
    "layout": "stacked",
    "style": {
      "background": "#0f1727",
      "border": "subtle",
      "foreground": "#edf3ff",
      "radius": "14px",
      "spacing": "medium"
    },
    "title": "最近结果",
    "type": "content"
  }
];
const rightSections = [
  {
    "description": "Right sidebar status panel listing multiple system integrations and health badges, with a button to view all statuses.",
    "elements": [
      "系统状态",
      "一切正常",
      "本地 API",
      "在线",
      "Hermes 引擎",
      "可用",
      "Notion",
      "已配置",
      "微信入口",
      "active",
      "网页后台入口",
      "active",
      "定时任务",
      "正常",
      "查看所有状态"
    ],
    "id": "sidebar-status",
    "layout": "stacked",
    "style": {
      "background": "#111827",
      "border": "subtle",
      "foreground": "#eef4ff",
      "radius": "16px",
      "spacing": "medium"
    },
    "title": "系统状态",
    "type": "sidebar"
  },
  {
    "description": "Shortcut entry panel with six icon tiles for common actions.",
    "elements": [
      "快捷入口",
      "新建发布包",
      "新建任务",
      "情报库",
      "知识库",
      "流程编排",
      "数据复盘"
    ],
    "id": "sidebar-shortcuts",
    "layout": "grid",
    "style": {
      "background": "#111827",
      "border": "subtle",
      "foreground": "#ecf2ff",
      "radius": "16px",
      "spacing": "medium"
    },
    "title": "快捷入口",
    "type": "sidebar"
  },
  {
    "description": "Assistant support card with brief help text, CTA button, and mascot illustration.",
    "elements": [
      "小龙虾助手",
      "有任何问题，随时召唤我~",
      "立即咨询"
    ],
    "id": "sidebar-assistant",
    "layout": "two-column",
    "style": {
      "background": "#111827",
      "border": "subtle",
      "foreground": "#eef4ff",
      "radius": "16px",
      "spacing": "medium"
    },
    "title": "小龙虾助手",
    "type": "sidebar"
  }
];

export default function GeneratedPage() {
  return (
    <main className="min-h-screen bg-[#070b12] text-slate-100">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)_300px]">
        <aside className="border-r border-white/10 bg-[#0b1220] px-5 py-6">
          <div className="mb-8">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500 text-lg font-bold shadow-lg shadow-blue-500/20">
              M
            </div>
            <h1 className="mt-4 text-xl font-bold">Mimic Console</h1>
            <p className="mt-1 text-sm text-slate-400">{leftSidebar.title || "AI operations dashboard"}</p>
          </div>
          <ElementList elements={leftSidebar.elements || []} variant="nav" />
        </aside>

        <section className="min-w-0 bg-[#0a101a] px-5 py-6 lg:px-8">
          <TopBar section={headerSection} />
          <Hero section={heroSection} summary="A dark-themed AI content operations dashboard with a left navigation rail, top search/action bar, a prominent recommendation hero, opportunity cards, task summaries, actionable work lists, recent performance results, and a right sidebar for system status, shortcuts, and assistant help." />
          <div className="mt-6 grid gap-5 xl:grid-cols-2">
            {mainSections.map((section, index) => (
              <Panel key={section.id + "-" + index} section={section} />
            ))}
          </div>
        </section>

        <aside className="border-l border-white/10 bg-[#0b1220] px-5 py-6">
          <div className="mb-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-300">Assistant</p>
            <h2 className="mt-2 text-lg font-bold">Right rail</h2>
          </div>
          <div className="flex flex-col gap-5">
            {rightSections.map((section, index) => (
              <Panel key={section.id + "-right-" + index} section={section} compact />
            ))}
          </div>
        </aside>
      </div>
    </main>
  );
}

type Section = {
  id: string;
  type: string;
  title?: string;
  description?: string;
  layout?: string;
  elements?: string[];
  style?: {
    background?: string;
    foreground?: string;
    spacing?: string;
    radius?: string;
    border?: string;
  };
};

function TopBar({ section }: { section: Section }) {
  const elements = Array.isArray(section.elements) ? section.elements : [];

  return (
    <header className="flex flex-col gap-4 border-b border-white/10 pb-5 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-blue-300">Dashboard</p>
        <h2 className="mt-1 text-2xl font-bold">Page structure recognized</h2>
      </div>
      <div className="flex flex-wrap gap-2">
        {elements.map((element, index) => (
          <span
            key={element + "-" + index}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300"
          >
            {element}
          </span>
        ))}
      </div>
    </header>
  );
}

function Hero({ section, summary }: { section: Section; summary: string }) {
  const elements = Array.isArray(section.elements) ? section.elements : [];

  return (
    <section className="mt-6 overflow-hidden rounded-2xl border border-blue-400/20 bg-[#142347] p-6 shadow-2xl shadow-blue-950/30">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_260px] lg:items-center">
        <div>
          <p className="inline-flex rounded-full bg-blue-400/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-200">
            {section.layout || "two-column"}
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight text-white">
            {section.title || "Dark AI operations dashboard"}
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-blue-100/80">
            {section.description || summary}
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            {elements.slice(0, 4).map((element, index) => (
              <span
                key={element + "-hero-" + index}
                className="rounded-lg bg-white/10 px-3 py-2 text-sm text-blue-50"
              >
                {element}
              </span>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
          <div className="h-32 rounded-xl bg-gradient-to-br from-blue-400 via-violet-500 to-emerald-400 opacity-90" />
          <p className="mt-4 text-sm text-blue-50/80">Hero visual / recommendation module</p>
        </div>
      </div>
    </section>
  );
}

function Panel({ section, compact = false }: { section: Section; compact?: boolean }) {
  const elements = Array.isArray(section.elements) ? section.elements : [];
  const background = section.style?.background || "#0f1726";
  const borderClass = borderToClass(section.style?.border);
  const radiusClass = radiusToClass(section.style?.radius);

  return (
    <section
      className={radiusClass + " " + borderClass + " p-5 shadow-xl shadow-black/20"}
      style={{ backgroundColor: background }}
    >
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            {section.type}
          </p>
          <h3 className="mt-1 text-lg font-bold text-slate-100">
            {section.title || section.id}
          </h3>
          {section.description ? (
            <p className="mt-2 max-w-md text-sm leading-5 text-slate-400">{section.description}</p>
          ) : null}
        </div>
        <span className="rounded-full bg-blue-400/10 px-3 py-1 text-xs text-blue-200">
          {section.layout || "layout"}
        </span>
      </div>
      <ElementList elements={elements} variant={compact ? "compact" : "card"} />
    </section>
  );
}

function ElementList({ elements, variant }: { elements: string[]; variant: "nav" | "card" | "compact" }) {
  if (elements.length === 0) {
    return <p className="text-sm text-slate-500">No elements described yet.</p>;
  }

  if (variant === "nav") {
    return (
      <nav className="flex flex-col gap-2">
        {elements.map((element, index) => (
          <div
            key={element + "-nav-" + index}
            className={
              "rounded-xl px-3 py-2 text-sm " +
              (index === 3 ? "bg-blue-500 text-white" : "text-slate-300 hover:bg-white/5")
            }
          >
            {element}
          </div>
        ))}
      </nav>
    );
  }

  return (
    <div className={variant === "compact" ? "flex flex-col gap-2" : "grid gap-3 sm:grid-cols-2"}>
      {elements.map((element, index) => (
        <div
          key={element + "-item-" + index}
          className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-300"
        >
          {element}
        </div>
      ))}
    </div>
  );
}

function borderToClass(border?: string) {
  if (!border || border === "none") {
    return "border border-white/5";
  }

  if (border.includes("strong")) {
    return "border border-blue-300/30";
  }

  if (border.includes("glow")) {
    return "border border-blue-400/30 ring-1 ring-blue-400/20";
  }

  return "border border-white/10";
}

function radiusToClass(radius?: string) {
  if (!radius || radius === "0px") {
    return "rounded-none";
  }

  if (radius.includes("full")) {
    return "rounded-full";
  }

  if (radius.includes("12") || radius.includes("16") || radius.includes("large")) {
    return "rounded-2xl";
  }

  return "rounded-xl";
}
