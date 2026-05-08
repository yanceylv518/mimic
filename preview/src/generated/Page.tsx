import React from "react";

export default function GeneratedPage() {
  const navItems = [
    { name: "总览", icon: "◈", active: true },
    { name: "任务运行", icon: "◎" },
    { name: "工作流", icon: "⎇" },
    { name: "爆款拆解", icon: "✦" },
    { name: "情报库", icon: "⌁" },
    { name: "知识库", icon: "▣" },
    { name: "发布包", icon: "▤" },
    { name: "流程编排", icon: "⇄" },
    { name: "入口助手", icon: "◌" },
    { name: "模型与插件", icon: "⚙" },
    { name: "系统日志", icon: "☰" },
    { name: "设置中心", icon: "⋯" },
  ];

  const opportunityCards = [
    {
      id: "01",
      title: "OpenClaw 自动发布全流程",
      source: "来源：情报库",
      desc: "适合做实操型内容，热度连续上升，适合配合自动化流程演示。",
      badge: "热度上升",
      badgeColor: "bg-blue-500/12 text-blue-200 border-blue-400/20",
      primary: "生成发布包",
      secondary: "加入待办",
      accent: "from-blue-500/25 to-cyan-400/10",
    },
    {
      id: "02",
      title: "GPT 视频生成实操技巧",
      source: "来源：热点",
      desc: "互动表现优于均值，适合做技巧合集与常见误区拆解。",
      badge: "高互动",
      badgeColor: "bg-violet-500/12 text-violet-200 border-violet-400/20",
      primary: "生成发布包",
      secondary: "加入待办",
      accent: "from-violet-500/25 to-fuchsia-400/10",
    },
    {
      id: "03",
      title: "AI 副业变现流程拆解",
      source: "来源：历史复盘",
      desc: "转化链路完整，适合复用高表现结构并补充案例拆解。",
      badge: "转化高",
      badgeColor: "bg-emerald-500/12 text-emerald-200 border-emerald-400/20",
      primary: "生成发布包",
      secondary: "加入待办",
      accent: "from-emerald-500/25 to-lime-400/10",
    },
  ];

  const stats = [
    {
      title: "正在生成",
      value: "1",
      desc: "1个任务进行中",
      icon: "◔",
      valueColor: "text-blue-200",
      iconBg: "bg-blue-500/15 text-blue-300",
      line: "from-blue-400/80 via-cyan-300/50 to-transparent",
    },
    {
      title: "待发布",
      value: "2",
      desc: "2 条内容待发布",
      icon: "▣",
      valueColor: "text-violet-200",
      iconBg: "bg-violet-500/15 text-violet-300",
      line: "from-violet-400/80 via-fuchsia-300/50 to-transparent",
    },
    {
      title: "失败任务",
      value: "1",
      desc: "查看并重试",
      icon: "!",
      valueColor: "text-rose-200",
      iconBg: "bg-rose-500/15 text-rose-300",
      line: "from-rose-400/80 via-orange-300/50 to-transparent",
    },
  ];

  const todoItems = [
    {
      title: "确认今日选题方向",
      desc: "已基于 AI 建议和情报库生成 3 个候选选题",
      action: "去处理",
      dot: "bg-blue-400",
    },
    {
      title: "优化 1 条发布包内容",
      desc: "《OpenClaw 自动发布全流程》待润色优化",
      action: "去优化",
      dot: "bg-violet-400",
    },
    {
      title: "发布 2 条待发布内容",
      desc: "还有 2 条内容等待发布到小红书 / 视频号",
      action: "去发布",
      dot: "bg-emerald-400",
    },
    {
      title: "复盘昨日最佳内容",
      desc: "分析数据表现，总结可复用的爆款要素",
      action: "查看复盘",
      dot: "bg-amber-400",
    },
  ];

  const statuses = [
    { label: "本地 API", state: "在线", icon: "◉", tone: "emerald" },
    { label: "Hermes 引擎", state: "可用", icon: "⚡", tone: "emerald" },
    { label: "Notion", state: "已配置", icon: "▤", tone: "blue" },
    { label: "微信入口", state: "active", icon: "◌", tone: "emerald" },
    { label: "网页后台入口", state: "active", icon: "⌘", tone: "emerald" },
    { label: "定时任务", state: "正常", icon: "⏱", tone: "amber" },
  ];

  const quickActions = [
    { name: "新建发布包", icon: "＋" },
    { name: "新建任务", icon: "◉" },
    { name: "情报库", icon: "⌁" },
    { name: "知识库", icon: "✦" },
    { name: "流程编排", icon: "⇄" },
    { name: "数据复盘", icon: "▣" },
  ];

  return (
    <div className="min-h-screen w-full bg-[#07101c] text-[#eaf1fd]">
      <div className="min-h-screen w-full bg-[radial-gradient(circle_at_top_left,rgba(47,107,255,0.14),transparent_26%),radial-gradient(circle_at_top_right,rgba(122,77,255,0.14),transparent_22%),linear-gradient(180deg,#07101c_0%,#0a1322_100%)]">
        <div className="grid min-h-screen w-full grid-cols-1 xl:grid-cols-[260px_minmax(0,1fr)_320px]">
          <aside className="border-r border-white/6 bg-[#0a1322]/95 px-3 py-3 xl:sticky xl:top-0 xl:h-screen">
            <div className="flex h-full flex-col">
              <div className="mb-4 flex items-center gap-2 rounded-2xl border border-white/5 bg-white/[0.025] px-3 py-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-orange-400 text-sm font-bold text-white shadow-[0_0_20px_rgba(239,68,68,0.35)]">
                  龙
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold text-white">小龙虾后台</div>
                  <div className="truncate text-[11px] text-slate-400">AI 内容生产系统</div>
                </div>
                <div className="text-slate-500">‹</div>
              </div>

              <nav className="space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    className={`flex h-8.5 w-full items-center gap-2 rounded-xl px-3 text-left text-[13px] transition ${
                      item.active
                        ? "border border-blue-400/20 bg-gradient-to-r from-[#2f6bff]/28 via-[#2f6bff]/14 to-[#7a4dff]/14 text-white shadow-[0_0_24px_rgba(47,107,255,0.14)]"
                        : "text-slate-300 hover:bg-white/[0.04] hover:text-white"
                    }`}
                  >
                    <span className="w-4 shrink-0 text-center text-[12px] opacity-90">{item.icon}</span>
                    <span className="flex-1">{item.name}</span>
                    {item.active && <span className="h-1.5 w-1.5 rounded-full bg-blue-300" />}
                  </button>
                ))}
              </nav>

              <div className="mt-auto pt-4">
                <div className="rounded-2xl border border-white/6 bg-[#0f1728] p-3 shadow-[0_10px_24px_rgba(0,0,0,0.22)]">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/80 to-violet-500/80 text-sm font-semibold text-white">
                      虾
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="truncate text-sm font-medium text-white">龙虾 Pro</span>
                        <span className="rounded-full border border-violet-400/20 bg-violet-500/10 px-1.5 py-0.5 text-[10px] text-violet-200">
                          Pro
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400">本地模式</div>
                    </div>
                    <span className="text-slate-500">⌄</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <div className="min-w-0 xl:col-span-2">
            <header className="sticky top-0 z-20 border-b border-white/6 bg-[linear-gradient(180deg,rgba(11,18,32,0.96),rgba(11,18,32,0.88))] backdrop-blur-xl">
              <div className="grid h-14 grid-cols-1 items-center gap-3 px-4 xl:grid-cols-[1fr_320px] xl:px-6">
                <div className="flex min-w-0 items-center">
                  <div className="relative w-full max-w-[560px]">
                    <input
                      type="text"
                      placeholder="搜索任务、发布包、知识库…"
                      className="h-9 w-full rounded-full border border-white/8 bg-white/[0.04] pl-10 pr-4 text-sm text-[#e5eefc] outline-none placeholder:text-slate-500 focus:border-blue-400/25"
                    />
                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                      ⌕
                    </span>
                  </div>
                </div>
                <div className="hidden xl:flex items-center justify-end gap-2">
                  <button className="rounded-full border border-white/8 bg-white/[0.04] px-3 py-1.5 text-xs text-slate-200 hover:bg-white/[0.07]">
                    刷新
                  </button>
                  <button className="rounded-full border border-white/8 bg-white/[0.04] px-3 py-1.5 text-xs text-slate-200 hover:bg-white/[0.07]">
                    设置
                  </button>
                  <div className="flex items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-500/10 px-3 py-1.5 text-xs text-emerald-300">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.85)]" />
                    系统正常
                  </div>
                </div>
              </div>
            </header>

            <div className="grid min-h-[calc(100vh-56px)] grid-cols-1 xl:grid-cols-[minmax(0,1fr)_320px]">
              <main className="space-y-4 p-4 xl:p-6">
                <section className="overflow-hidden rounded-[26px] border border-blue-400/18 bg-[linear-gradient(135deg,rgba(18,34,78,1)_0%,rgba(25,47,108,0.98)_42%,rgba(58,35,112,0.94)_100%)] shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_0_56px_rgba(47,107,255,0.14)]">
                  <div className="relative">
                    <div className="absolute left-20 top-10 h-44 w-44 rounded-full bg-blue-500/18 blur-3xl" />
                    <div className="absolute right-20 top-8 h-36 w-36 rounded-full bg-violet-500/18 blur-3xl" />
                    <div className="grid gap-4 p-5 lg:grid-cols-[1.5fr_0.82fr] lg:p-6">
                      <div className="grid gap-4 sm:grid-cols-[138px_1fr]">
                        <div className="relative flex min-h-[176px] items-center justify-center">
                          <div className="absolute h-28 w-28 rounded-full bg-cyan-400/20 blur-2xl" />
                          <div className="absolute h-24 w-24 rounded-full bg-blue-500/30 blur-2xl" />
                          <div className="relative h-28 w-28">
                            <div className="absolute inset-0 rounded-full border border-cyan-300/25 bg-[radial-gradient(circle_at_50%_45%,rgba(147,197,253,0.28),rgba(37,99,235,0.12)_46%,transparent_68%)] shadow-[0_0_40px_rgba(56,189,248,0.18)]" />
                            <div className="absolute left-5 top-6 h-6 w-6 rounded-full border border-cyan-200/40 bg-cyan-300/20" />
                            <div className="absolute right-5 top-6 h-6 w-6 rounded-full border border-cyan-200/40 bg-cyan-300/20" />
                            <div className="absolute left-9 top-10 h-10 w-10 rounded-full border border-blue-200/40 bg-blue-300/15" />
                            <div className="absolute left-4 top-14 h-7 w-7 rounded-full border border-cyan-200/30 bg-cyan-300/10" />
                            <div className="absolute right-4 top-14 h-7 w-7 rounded-full border border-cyan-200/30 bg-cyan-300/10" />
                            <div className="absolute left-8 bottom-6 h-6 w-6 rounded-full border border-cyan-200/30 bg-cyan-300/10" />
                            <div className="absolute right-8 bottom-6 h-6 w-6 rounded-full border border-cyan-200/30 bg-cyan-300/10" />
                            <div className="absolute left-[28px] top-[38px] h-px w-8 bg-cyan-200/40" />
                            <div className="absolute right-[28px] top-[38px] h-px w-8 bg-cyan-200/40" />
                            <div className="absolute left-[24px] top-[60px] h-px w-10 rotate-[26deg] bg-cyan-200/30" />
                            <div className="absolute right-[24px] top-[60px] h-px w-10 -rotate-[26deg] bg-cyan-200/30" />
                            <div className="absolute left-[36px] bottom-[28px] h-px w-14 bg-cyan-200/30" />
                          </div>
                        </div>

                        <div className="py-1">
                          <div className="mb-3 inline-flex rounded-full border border-white/12 bg-white/10 px-3 py-1 text-[11px] text-blue-50">
                            今日 AI 建议
                          </div>
                          <h1 className="max-w-2xl text-[28px] font-semibold leading-[1.15] text-white xl:text-[32px]">
                            优先制作 2 条 AI 工具实操内容
                          </h1>
                          <p className="mt-3 text-sm text-blue-50/90">
                            推荐方向：OpenClaw 自动发布、小红书流程自动化
                          </p>
                          <p className="mt-1.5 max-w-2xl text-sm leading-6 text-blue-100/70">
                            推荐原因：近期相关情报增长明显，历史发布效果良好，适合快速生成内容并进入发布流程。
                          </p>
                          <div className="mt-5 flex flex-wrap gap-2.5">
                            <button className="rounded-xl bg-[#2f6bff] px-4 py-2.5 text-sm font-medium text-white shadow-[0_0_28px_rgba(47,107,255,0.34)] hover:bg-[#3c76ff]">
                              开始生成内容
                            </button>
                            <button className="rounded-xl border border-white/14 bg-[#0c1630]/55 px-4 py-2.5 text-sm text-blue-50 hover:bg-white/10">
                              查看推荐依据
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-2xl border border-white/8 bg-[linear-gradient(180deg,rgba(8,16,34,0.44),rgba(7,14,28,0.62))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] backdrop-blur-sm">
                        <div className="mb-3 text-sm font-medium text-blue-50">预计收益</div>
                        <div className="space-y-2.5">
                          {[
                            ["预计播放量提升", "30%+"],
                            ["用户互动率提升", "20%+"],
                            ["爆款机会判断", "更高"],
                          ].map(([label, value]) => (
                            <div
                              key={label}
                              className="flex items-center justify-between rounded-xl border border-white/6 bg-[#0c1730]/70 px-3.5 py-3"
                            >
                              <div className="text-sm text-slate-300">{label}</div>
                              <div className="text-sm font-semibold text-white">{value}</div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-3 rounded-xl border border-emerald-400/12 bg-emerald-500/8 px-3.5 py-2.5 text-xs text-emerald-200">
                          更容易获得爆款机会
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="rounded-[24px] border border-white/6 bg-[#111a2b] p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_12px_34px_rgba(0,0,0,0.24)]">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <h2 className="text-lg font-semibold text-white">今日机会（最多 3 个）</h2>
                    <button className="text-sm text-blue-300 hover:text-blue-200">查看全部机会</button>
                  </div>

                  <div className="grid gap-3 lg:grid-cols-3">
                    {opportunityCards.map((card) => (
                      <div
                        key={card.id}
                        className="rounded-2xl border border-white/6 bg-[#0f1728] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex min-w-0 items-center gap-3">
                            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${card.accent} text-sm font-semibold text-white`}>
                              {card.id}
                            </div>
                            <div className="min-w-0">
                              <div className="truncate text-[14px] font-medium text-white">{card.title}</div>
                              <div className="mt-1 text-[11px] text-slate-400">{card.source}</div>
                            </div>
                          </div>
                          <div className="text-slate-500">⋯</div>
                        </div>

                        <div className="mt-3 flex items-center justify-between">
                          <span className={`rounded-full border px-2.5 py-1 text-[11px] ${card.badgeColor}`}>{card.badge}</span>
                        </div>

                        <p className="mt-3 min-h-[38px] text-[13px] leading-5 text-slate-300">{card.desc}</p>

                        <div className="mt-4 flex gap-2">
                          <button className="rounded-lg bg-blue-500/14 px-3 py-2 text-xs text-blue-200 hover:bg-blue-500/20">
                            {card.primary}
                          </button>
                          <button className="rounded-lg border border-white/8 bg-white/[0.04] px-3 py-2 text-xs text-slate-300 hover:bg-white/[0.08]">
                            {card.secondary}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="grid gap-3 md:grid-cols-3">
                  {stats.map((item, idx) => (
                    <div
                      key={item.title}
                      className="relative overflow-hidden rounded-2xl border border-white/6 bg-[#111a2b] p-4 shadow-[0_12px_28px_rgba(0,0,0,0.22)]"
                    >
                      <div className="mb-3 flex items-center justify-between">
                        <div className={`flex h-8 w-8 items-center justify-center rounded-full ${item.iconBg}`}>
                          {item.icon}
                        </div>
                        <div className="text-[11px] text-slate-500">{idx === 0 ? "实时" : idx === 1 ? "待处理" : "异常"}</div>
                      </div>
                      <div className="text-sm text-slate-400">{item.title}</div>
                      <div className={`mt-1 text-3xl font-semibold ${item.valueColor}`}>{item.value}</div>
                      <div className="mt-1 text-xs text-slate-500">{item.desc}</div>
                      <div className="mt-4 flex h-9 items-end gap-1.5">
                        {[10, 18, 13, 22, 16, 24, 19].map((h, i) => (
                          <div
                            key={i}
                            className={`w-full rounded-full bg-gradient-to-t ${item.line} opacity-${i === 6 ? "100" : "80"}`}
                            style={{ height: `${h}px` }}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </section>

                <section className="grid gap-4 xl:grid-cols-[1.35fr_0.95fr]">
                  <div className="rounded-[24px] border border-white/6 bg-[#111a2b] p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_12px_34px_rgba(0,0,0,0.24)]">
                    <div className="mb-3">
                      <h2 className="text-lg font-semibold text-white">待处理事项（行动清单）</h2>
                    </div>
                    <div className="space-y-2">
                      {todoItems.map((item) => (
                        <div
                          key={item.title}
                          className="flex items-center gap-3 rounded-2xl border border-white/6 bg-[#0f1728] px-3.5 py-3"
                        >
                          <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${item.dot}`} />
                          <div className="min-w-0 flex-1">
                            <div className="text-sm font-medium text-white">{item.title}</div>
                            <div className="mt-0.5 truncate text-xs text-slate-400">{item.desc}</div>
                          </div>
                          <button className="shrink-0 rounded-lg border border-white/8 bg-white/[0.04] px-3 py-1.5 text-xs text-blue-200 hover:bg-white/[0.08]">
                            {item.action}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[24px] border border-white/6 bg-[#111a2b] p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_12px_34px_rgba(0,0,0,0.24)]">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <h2 className="text-lg font-semibold text-white">最近结果（昨日）</h2>
                      <button className="text-xs text-slate-400 hover:text-blue-200">查看完整复盘</button>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-28 shrink-0 overflow-hidden rounded-2xl border border-white/8 bg-[#0d1626]">
                        <div className="relative h-36 overflow-hidden bg-[radial-gradient(circle_at_32%_22%,rgba(47,107,255,0.38),transparent_28%),radial-gradient(circle_at_72%_28%,rgba(122,77,255,0.24),transparent_34%),linear-gradient(180deg,#16233a_0%,#0e1728_100%)]">
                          <div className="absolute left-3 top-3 rounded-md bg-black/35 px-2 py-1 text-[10px] text-white">最佳内容</div>
                          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/55 to-transparent" />
                          <div className="absolute left-4 top-12 h-10 w-14 rounded-lg border border-white/10 bg-white/8" />
                          <div className="absolute right-4 top-10 h-14 w-8 rounded-lg border border-white/10 bg-white/8" />
                          <div className="absolute bottom-4 left-4 right-4 text-[11px] leading-4 text-white/90">
                            AI 自动发布
                            <br />
                            一天实操记录
                          </div>
                        </div>
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="text-xs text-slate-400">最佳内容</div>
                        <h3 className="mt-1 line-clamp-2 text-base font-semibold text-white">
                          普通人用 AI 做自动发布的一天
                        </h3>

                        <div className="mt-3 grid grid-cols-2 gap-2">
                          {["2.3w 播放", "1.2k 点赞", "156 评论", "312 收藏"].map((metric) => (
                            <div
                              key={metric}
                              className="rounded-xl border border-white/6 bg-[#0f1728] px-2.5 py-2 text-center text-xs text-slate-200"
                            >
                              {metric}
                            </div>
                          ))}
                        </div>

                        <div className="mt-3 rounded-2xl border border-violet-400/12 bg-gradient-to-r from-violet-500/10 to-blue-500/10 p-3">
                          <div className="text-xs font-medium text-white">AI 复盘总结</div>
                          <p className="mt-1.5 text-xs leading-5 text-slate-300">
                            标题场景感强，结构紧凑，实操节奏明确，适合继续延展自动化工具链相关选题。
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </main>

              <aside className="border-l border-white/6 p-4 xl:p-6">
                <div className="space-y-4">
                  <section className="rounded-[24px] border border-white/6 bg-[#111a2b] p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_12px_34px_rgba(0,0,0,0.24)]">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h2 className="text-lg font-semibold text-white">系统状态</h2>
                        <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300">
                          <span className="h-2 w-2 rounded-full bg-emerald-400" />
                          一切正常
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 space-y-2">
                      {statuses.map((item) => (
                        <div
                          key={item.label}
                          className="flex items-center justify-between rounded-xl border border-white/5 bg-[#0f1728] px-3 py-2.5"
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/[0.04] text-xs text-slate-300">
                              {item.icon}
                            </span>
                            <span className="text-sm text-slate-300">{item.label}</span>
                          </div>
                          <span
                            className={`rounded-full px-2.5 py-1 text-xs ${
                              item.tone === "amber"
                                ? "border border-amber-400/15 bg-amber-500/10 text-amber-300"
                                : item.tone === "blue"
                                ? "border border-blue-400/15 bg-blue-500/10 text-blue-300"
                                : "border border-emerald-400/15 bg-emerald-500/10 text-emerald-300"
                            }`}
                          >
                            {item.state}
                          </span>
                        </div>
                      ))}
                    </div>

                    <button className="mt-4 w-full rounded-xl border border-white/8 bg-white/[0.04] px-4 py-2.5 text-sm text-slate-200 hover:bg-white/[0.07]">
                      查看所有状态
                    </button>
                  </section>

                  <section className="rounded-[24px] border border-white/6 bg-[#111a2b] p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_12px_34px_rgba(0,0,0,0.24)]">
                    <h2 className="mb-4 text-lg font-semibold text-white">快捷入口</h2>
                    <div className="grid grid-cols-2 gap-2.5">
                      {quickActions.map((item) => (
                        <button
                          key={item.name}
                          className="rounded-2xl border border-white/6 bg-[#0f1728] px-3 py-3.5 text-center hover:border-blue-400/16 hover:bg-[#121d31]"
                        >
                          <div className="mx-auto mb-2.5 flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.05] text-sm text-blue-200">
                            {item.icon}
                          </div>
                          <div className="text-[13px] font-medium leading-5 text-slate-100">{item.name}</div>
                        </button>
                      ))}
                    </div>
                  </section>

                  <section className="overflow-hidden rounded-[24px] border border-white/6 bg-[#111a2b] shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_12px_34px_rgba(0,0,0,0.24)]">
                    <div className="grid grid-cols-[1fr_110px] items-center gap-3 p-4">
                      <div>
                        <h2 className="text-lg font-semibold text-white">小龙虾助手</h2>
                        <p className="mt-2 text-sm text-slate-400">有任何问题，随时召唤我~</p>
                        <button className="mt-4 rounded-xl bg-[#183b8f] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#204aa8]">
                          立即咨询
                        </button>
                      </div>

                      <div className="relative flex h-28 items-center justify-center">
                        <div className="absolute h-20 w-20 rounded-full bg-red-500/18 blur-2xl" />
                        <div className="relative h-20 w-20">
                          <div className="absolute left-1 top-3 h-6 w-6 rounded-full bg-red-400" />
                          <div className="absolute right-1 top-3 h-6 w-6 rounded-full bg-red-400" />
                          <div className="absolute left-2 right-2 top-5 h-12 rounded-[999px] bg-gradient-to-br from-red-500 to-orange-400" />
                          <div className="absolute left-5 top-9 h-3 w-3 rounded-full bg-white" />
                          <div className="absolute right-5 top-9 h-3 w-3 rounded-full bg-white" />
                          <div className="absolute left-7 top-10 h-1.5 w-1.5 rounded-full bg-slate-900" />
                          <div className="absolute right-7 top-10 h-1.5 w-1.5 rounded-full bg-slate-900" />
                          <div className="absolute left-3 top-13 h-6 w-4 rounded-full border-[4px] border-red-400 border-r-transparent border-t-transparent" />
                          <div className="absolute right-3 top-13 h-6 w-4 rounded-full border-[4px] border-red-400 border-l-transparent border-t-transparent" />
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}