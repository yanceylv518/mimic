import React from "react";

export default function GeneratedPage() {
  const navItems = [
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
  ];

  const opportunityCards = [
    {
      id: "01",
      title: "OpenClaw 自动发布全流程",
      source: "来源：情报库",
      badge: "热度上升",
      badgeColor: "bg-blue-500/12 text-blue-300",
      desc: "适合做成工具实操类内容，近期相关讨论持续增长，历史同类内容表现稳定。",
      primary: "生成发布包",
      secondary: "加入待办",
    },
    {
      id: "02",
      title: "GPT 视频生成实操技巧",
      source: "来源：热点",
      badge: "高互动",
      badgeColor: "bg-violet-500/12 text-violet-300",
      desc: "适合做成短视频教程，用户对提示词、脚本结构和生成流程关注度较高。",
      primary: "查看详情",
      secondary: "加入待办",
    },
    {
      id: "03",
      title: "AI 副业变现流程拆解",
      source: "来源：历史复盘",
      badge: "转化高",
      badgeColor: "bg-emerald-500/12 text-emerald-300",
      desc: "适合延展为流程拆解内容，复盘显示这类题材更容易带来收藏与转化。",
      primary: "查看详情",
      secondary: "加入待办",
    },
  ];

  const stats = [
    {
      title: "正在生成",
      value: "1",
      desc: "1个任务进行中",
      valueColor: "text-blue-300",
      iconBg: "bg-blue-500/15 text-blue-300",
      line: "from-blue-400/60 via-cyan-300/30 to-transparent",
    },
    {
      title: "待发布",
      value: "2",
      desc: "条内容待发布",
      valueColor: "text-violet-300",
      iconBg: "bg-violet-500/15 text-violet-300",
      line: "from-violet-400/60 via-fuchsia-300/30 to-transparent",
    },
    {
      title: "失败任务",
      value: "1",
      desc: "1个任务失败",
      action: "查看并重试",
      valueColor: "text-red-300",
      iconBg: "bg-red-500/15 text-red-300",
      line: "from-red-400/60 via-orange-300/30 to-transparent",
    },
  ];

  const todoItems = [
    {
      title: "确认今日选题方向",
      desc: "已基于 AI 建议和情报库生成 3 个候选选题",
      action: "去处理",
    },
    {
      title: "优化 1 条发布包内容",
      desc: "《OpenClaw 自动发布全流程》待润色优化",
      action: "去优化",
    },
    {
      title: "发布 2 条待发布内容",
      desc: "还有 2 条内容等待发布到小红书 / 视频号",
      action: "去发布",
    },
    {
      title: "复盘昨日最佳内容",
      desc: "分析数据表现，总结可复用的爆款要素",
      action: "查看复盘",
    },
  ];

  const statuses = [
    ["◎", "本地 API", "在线"],
    ["◌", "Hermes 引擎", "可用"],
    ["N", "Notion", "已配置"],
    ["微", "微信入口", "active"],
    ["网", "网页后台入口", "active"],
    ["时", "定时任务", "正常"],
  ];

  const quickActions = [
    { icon: "＋", label: "新建发布包", color: "text-blue-300 bg-blue-500/12" },
    { icon: "◉", label: "新建任务", color: "text-violet-300 bg-violet-500/12" },
    { icon: "⌁", label: "情报库", color: "text-cyan-300 bg-cyan-500/12" },
    { icon: "✦", label: "知识库", color: "text-emerald-300 bg-emerald-500/12" },
    { icon: "⇄", label: "流程编排", color: "text-amber-300 bg-amber-500/12" },
    { icon: "▣", label: "数据复盘", color: "text-rose-300 bg-rose-500/12" },
  ];

  const benefitItems = [
    {
      icon: "▶",
      title: "预计播放量提升",
      sub: "更容易切中近期增长话题",
      gain: "30%+",
    },
    {
      icon: "♥",
      title: "用户互动率提升",
      sub: "教程型内容更容易获得评论与收藏",
      gain: "20%+",
    },
    {
      icon: "✦",
      title: "更容易获得爆款机会",
      sub: "方向更清晰，适合快速进入生产流程",
      gain: "推荐",
    },
  ];

  return (
    <div className="min-h-screen bg-[#07101c] text-[#eaf1fd]">
      <div className="min-h-screen bg-[radial-gradient(circle_at_top_right,rgba(122,77,255,0.14),transparent_25%),radial-gradient(circle_at_top_left,rgba(47,107,255,0.14),transparent_30%),linear-gradient(180deg,#08111d_0%,#0a1322_100%)]">
        <header className="sticky top-0 z-20 border-b border-white/6 bg-[#0b1220]/92 backdrop-blur">
          <div className="flex h-14 items-center justify-between px-4 md:px-6">
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <div className="hidden h-9 w-9 items-center justify-center rounded-lg bg-white/[0.04] text-blue-300 sm:flex">
                ✦
              </div>
              <div className="relative w-full max-w-2xl">
                <input
                  type="text"
                  placeholder="搜索任务、发布包、知识库…"
                  className="h-10 w-full rounded-lg border border-white/8 bg-white/[0.03] pl-10 pr-4 text-sm text-[#e5eefc] outline-none placeholder:text-slate-500 focus:border-blue-400/30 focus:bg-white/[0.05]"
                />
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                  ⌕
                </span>
              </div>
            </div>
            <div className="ml-4 flex items-center gap-2">
              <button className="rounded-lg border border-white/8 bg-white/[0.03] px-3 py-2 text-sm text-slate-300 transition hover:bg-white/[0.06]">
                刷新
              </button>
              <button className="rounded-lg border border-white/8 bg-white/[0.03] px-3 py-2 text-sm text-slate-300 transition hover:bg-white/[0.06]">
                设置
              </button>
              <div className="hidden items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs text-emerald-300 sm:flex">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(30,215,96,0.8)]" />
                系统正常
              </div>
            </div>
          </div>
        </header>

        <div className="mx-auto grid max-w-[1536px] grid-cols-1 gap-4 px-3 py-4 md:px-4 xl:grid-cols-[260px_minmax(0,1fr)_320px]">
          <aside className="border-r border-white/6 bg-[#0a1322] px-3 py-4 xl:sticky xl:top-14 xl:h-[calc(100vh-56px)]">
            <div className="mb-5 px-2">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#2f6bff] to-[#7a4dff] text-base font-semibold text-white shadow-[0_0_24px_rgba(47,107,255,0.28)]">
                  虾
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">小龙虾后台</div>
                  <div className="text-[11px] text-slate-500">AI 内容生产系统</div>
                </div>
              </div>
            </div>

            <nav className="space-y-1">
              {navItems.map((item, index) => {
                const active = index === 0;
                return (
                  <button
                    key={item}
                    className={`flex h-10 w-full items-center justify-between rounded-lg px-3 text-left text-sm transition ${
                      active
                        ? "bg-gradient-to-r from-blue-500/18 to-violet-500/10 text-white shadow-[inset_0_0_0_1px_rgba(96,165,250,0.18)]"
                        : "text-slate-400 hover:bg-white/[0.04] hover:text-slate-200"
                    }`}
                  >
                    <span>{item}</span>
                    {active && <span className="text-blue-300">•</span>}
                  </button>
                );
              })}
            </nav>

            <div className="mt-5 rounded-xl bg-gradient-to-br from-violet-500/10 to-blue-500/10 p-3 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]">
              <div className="text-sm font-medium text-white">龙虾 Pro</div>
              <div className="mt-1 text-xs leading-5 text-slate-400">解锁更强工作流与自动化能力</div>
              <div className="mt-3 inline-flex rounded-md bg-white/[0.05] px-2 py-1 text-[11px] text-violet-200">
                本地模式
              </div>
            </div>
          </aside>

          <main className="space-y-4">
            <section className="overflow-hidden rounded-2xl border border-blue-400/14 bg-[#182857] shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_0_40px_rgba(47,107,255,0.10)]">
              <div className="grid gap-4 p-5 lg:grid-cols-[220px_minmax(0,1fr)_300px]">
                <div className="relative flex items-center justify-center">
                  <div className="absolute h-40 w-40 rounded-full bg-blue-500/15 blur-2xl" />
                  <div className="absolute h-28 w-28 rounded-full bg-cyan-400/15 blur-xl" />
                  <div className="relative flex h-36 w-36 items-center justify-center rounded-full border border-blue-300/20 bg-[radial-gradient(circle_at_35%_35%,rgba(255,255,255,0.22),rgba(47,107,255,0.18)_35%,rgba(10,20,40,0.3)_70%)] shadow-[0_0_40px_rgba(47,107,255,0.28)]">
                    <div className="absolute h-24 w-24 rounded-full border border-cyan-300/20" />
                    <div className="absolute h-16 w-16 rounded-full border border-blue-200/20" />
                    <div className="relative grid grid-cols-2 gap-2">
                      <span className="h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.9)]" />
                      <span className="h-3 w-3 rounded-full bg-blue-300 shadow-[0_0_12px_rgba(96,165,250,0.9)]" />
                      <span className="h-3 w-3 rounded-full bg-indigo-300 shadow-[0_0_12px_rgba(129,140,248,0.9)]" />
                      <span className="h-3 w-3 rounded-full bg-sky-200 shadow-[0_0_12px_rgba(186,230,253,0.9)]" />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-center">
                  <div className="mb-3 inline-flex w-fit rounded-full bg-white/10 px-3 py-1 text-xs text-blue-100">
                    今日 AI 建议
                  </div>
                  <h1 className="text-2xl font-semibold tracking-tight text-white md:text-[30px]">
                    优先制作 2 条 AI 工具实操内容
                  </h1>
                  <p className="mt-3 text-sm leading-6 text-blue-100/85">
                    推荐方向：OpenClaw 自动发布、小红书流程自动化
                  </p>
                  <p className="mt-1 text-sm leading-6 text-blue-100/65">
                    推荐原因：近期相关情报增长明显，历史发布效果良好
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2.5">
                    <button className="rounded-lg bg-gradient-to-r from-[#2f6bff] to-[#7a4dff] px-4 py-2.5 text-sm font-medium text-white shadow-[0_0_24px_rgba(122,77,255,0.28)] transition hover:opacity-95">
                      开始生成内容
                    </button>
                    <button className="rounded-lg border border-white/10 bg-white/[0.05] px-4 py-2.5 text-sm text-blue-50 transition hover:bg-white/[0.08]">
                      查看推荐依据
                    </button>
                  </div>
                </div>

                <div className="rounded-xl bg-[#101a33]/85 p-4 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]">
                  <div className="text-sm font-medium text-blue-100">预计收益</div>
                  <div className="mt-3 space-y-2.5">
                    {benefitItems.map((item) => (
                      <div
                        key={item.title}
                        className="flex items-center gap-3 rounded-lg bg-white/[0.03] px-3 py-3"
                      >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/12 text-xs text-blue-200">
                          {item.icon}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-medium text-white">{item.title}</div>
                          <div className="truncate text-[11px] text-slate-400">{item.sub}</div>
                        </div>
                        <div className="text-sm font-semibold text-emerald-300">{item.gain}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-white/6 bg-[#111a2b] p-4 shadow-[0_10px_30px_rgba(0,0,0,0.22)]">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h2 className="text-lg font-semibold text-white">今日机会（最多 3 个）</h2>
                <button className="text-sm text-blue-300 hover:text-blue-200">查看全部机会</button>
              </div>
              <div className="grid gap-3 lg:grid-cols-3">
                {opportunityCards.map((card) => (
                  <div
                    key={card.id}
                    className="rounded-xl bg-white/[0.03] p-4 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)] transition hover:bg-white/[0.045]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="rounded-md bg-white/[0.05] px-2 py-1 text-xs font-semibold text-white/90">
                        {card.id}
                      </div>
                      <span className={`rounded-full px-2.5 py-1 text-[11px] ${card.badgeColor}`}>
                        {card.badge}
                      </span>
                    </div>
                    <div className="mt-3 text-[15px] font-medium leading-6 text-white">{card.title}</div>
                    <div className="mt-1 text-xs text-slate-400">{card.source}</div>
                    <div className="mt-2 text-xs leading-5 text-slate-400">{card.desc}</div>
                    <div className="mt-4 flex items-center justify-between gap-2">
                      <div className="flex flex-wrap gap-2">
                        <button className="rounded-md bg-blue-500/12 px-3 py-1.5 text-xs text-blue-200 hover:bg-blue-500/18">
                          {card.primary}
                        </button>
                        <button className="rounded-md bg-white/[0.05] px-3 py-1.5 text-xs text-slate-300 hover:bg-white/[0.08]">
                          {card.secondary}
                        </button>
                      </div>
                      <button className="text-slate-500 hover:text-slate-300">•••</button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="grid gap-3 md:grid-cols-3">
              {stats.map((item) => (
                <div
                  key={item.title}
                  className="relative overflow-hidden rounded-xl border border-white/6 bg-[#111a2b] p-4 shadow-[0_10px_24px_rgba(0,0,0,0.18)]"
                >
                  <div className="flex items-start justify-between">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-full ${item.iconBg}`}>
                      ●
                    </div>
                    <div className={`h-10 w-24 rounded-full bg-gradient-to-r ${item.line} opacity-80 blur-[1px]`} />
                  </div>
                  <div className={`mt-3 text-3xl font-semibold ${item.valueColor}`}>{item.value}</div>
                  <div className="mt-1 text-sm text-white">{item.title}</div>
                  <div className="mt-1 text-xs text-slate-400">{item.desc}</div>
                  {item.action && (
                    <button className="mt-2 text-xs text-red-300 hover:text-red-200">{item.action}</button>
                  )}
                </div>
              ))}
            </section>

            <section className="grid gap-4 xl:grid-cols-[minmax(0,1.25fr)_360px]">
              <div className="rounded-2xl border border-white/6 bg-[#111a2b] p-4 shadow-[0_10px_30px_rgba(0,0,0,0.22)]">
                <div className="mb-3">
                  <h2 className="text-lg font-semibold text-white">待处理事项（行动清单）</h2>
                </div>
                <div className="space-y-2.5">
                  {todoItems.map((item, index) => (
                    <div
                      key={item.title}
                      className="flex flex-col gap-3 rounded-xl bg-white/[0.03] px-3 py-3 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.045)] md:flex-row md:items-center md:justify-between"
                    >
                      <div className="flex min-w-0 items-start gap-3">
                        <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-[11px] text-blue-300">
                          {index + 1}
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-medium text-white">{item.title}</div>
                          <div className="mt-1 text-xs leading-5 text-slate-400">{item.desc}</div>
                        </div>
                      </div>
                      <div className="flex shrink-0 items-center">
                        <button className="rounded-md bg-blue-500/12 px-3 py-1.5 text-xs text-blue-200 hover:bg-blue-500/18">
                          {item.action}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <section className="rounded-2xl border border-white/6 bg-[#111a2b] p-4 shadow-[0_10px_30px_rgba(0,0,0,0.22)]">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <h2 className="text-lg font-semibold text-white">最近结果（昨日）</h2>
                  <button className="text-xs text-blue-300 hover:text-blue-200">查看完整复盘</button>
                </div>

                <div className="overflow-hidden rounded-xl bg-white/[0.03] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.045)]">
                  <div className="flex h-40 items-end bg-[radial-gradient(circle_at_30%_20%,rgba(47,107,255,0.35),transparent_30%),radial-gradient(circle_at_70%_30%,rgba(122,77,255,0.32),transparent_35%),linear-gradient(180deg,#1a2740,#0d1522)] p-3">
                    <div className="rounded-md bg-black/25 px-2 py-1 text-xs text-slate-200">最佳内容</div>
                  </div>
                  <div className="p-4">
                    <div className="text-xs text-slate-400">最佳内容</div>
                    <h3 className="mt-1 text-base font-semibold text-white">普通人用 AI 做自动发布的一天</h3>

                    <div className="mt-3 grid grid-cols-2 gap-2">
                      {["2.3w 播放", "1.2k 点赞", "156 评论", "312 收藏"].map((metric) => (
                        <div
                          key={metric}
                          className="rounded-lg bg-white/[0.04] px-3 py-2 text-center text-xs text-slate-200"
                        >
                          {metric}
                        </div>
                      ))}
                    </div>

                    <div className="mt-3 rounded-lg bg-gradient-to-r from-violet-500/10 to-blue-500/10 p-3 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]">
                      <div className="text-xs font-medium text-white">AI 复盘总结</div>
                      <p className="mt-1 text-xs leading-5 text-slate-300">
                        标题具备强场景感与低门槛代入感，内容结构清晰，适合继续延展自动化工具链相关选题。
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </section>
          </main>

          <aside className="space-y-4">
            <section className="rounded-2xl border border-white/6 bg-[#111a2b] p-4 shadow-[0_10px_30px_rgba(0,0,0,0.22)]">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">系统状态</h2>
                <div className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] text-emerald-300">
                  一切正常
                </div>
              </div>

              <div className="mt-4 space-y-2">
                {statuses.map(([icon, label, state]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between rounded-lg bg-white/[0.03] px-3 py-2.5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-7 w-7 items-center justify-center rounded-md bg-white/[0.05] text-[11px] text-slate-300">
                        {icon}
                      </div>
                      <span className="text-sm text-slate-300">{label}</span>
                    </div>
                    <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-[11px] text-emerald-300">
                      {state}
                    </span>
                  </div>
                ))}
              </div>

              <button className="mt-4 w-full rounded-lg bg-white/[0.04] px-4 py-2 text-sm text-slate-200 hover:bg-white/[0.07]">
                查看所有状态
              </button>
            </section>

            <section className="rounded-2xl border border-white/6 bg-[#111a2b] p-4 shadow-[0_10px_30px_rgba(0,0,0,0.22)]">
              <h2 className="mb-4 text-lg font-semibold text-white">快捷入口</h2>
              <div className="grid grid-cols-2 gap-2.5">
                {quickActions.map((item) => (
                  <button
                    key={item.label}
                    className="rounded-xl bg-white/[0.03] p-3 text-left transition hover:bg-white/[0.05] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]"
                  >
                    <div className={`mb-2 flex h-9 w-9 items-center justify-center rounded-lg text-sm ${item.color}`}>
                      {item.icon}
                    </div>
                    <div className="text-sm font-medium text-slate-100">{item.label}</div>
                  </button>
                ))}
              </div>
            </section>

            <section className="overflow-hidden rounded-2xl border border-white/6 bg-[#111a2b] shadow-[0_10px_30px_rgba(0,0,0,0.22)]">
              <div className="grid grid-cols-[1fr_116px] items-center gap-2 p-4">
                <div>
                  <h2 className="text-lg font-semibold text-white">小龙虾助手</h2>
                  <p className="mt-1 text-sm text-slate-400">有任何问题，随时召唤我~</p>
                  <button className="mt-4 rounded-lg bg-gradient-to-r from-[#2f6bff] to-[#7a4dff] px-4 py-2 text-sm font-medium text-white shadow-[0_0_24px_rgba(47,107,255,0.18)] hover:opacity-95">
                    立即咨询
                  </button>
                </div>
                <div className="relative flex h-28 items-end justify-center">
                  <div className="absolute bottom-2 h-16 w-16 rounded-full bg-red-500/20 blur-xl" />
                  <div className="relative">
                    <div className="mx-auto h-12 w-12 rounded-full bg-gradient-to-br from-red-400 to-rose-500" />
                    <div className="mx-auto -mt-1 h-14 w-16 rounded-t-[20px] rounded-b-[14px] bg-gradient-to-b from-red-400 to-red-600" />
                    <div className="absolute left-2 top-4 h-2 w-2 rounded-full bg-white" />
                    <div className="absolute right-2 top-4 h-2 w-2 rounded-full bg-white" />
                    <div className="absolute left-3 top-5 h-1 w-1 rounded-full bg-slate-900" />
                    <div className="absolute right-3 top-5 h-1 w-1 rounded-full bg-slate-900" />
                    <div className="absolute left-1 -top-1 h-3 w-3 rounded-full border-2 border-red-300" />
                    <div className="absolute right-1 -top-1 h-3 w-3 rounded-full border-2 border-red-300" />
                  </div>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}