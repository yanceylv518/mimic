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
      badgeColor: "bg-blue-500/15 text-blue-300 border-blue-400/30",
      primary: "生成发布包",
      secondary: "加入待办",
    },
    {
      id: "02",
      title: "GPT 视频生成实操技巧",
      source: "来源：热点",
      badge: "高互动",
      badgeColor: "bg-violet-500/15 text-violet-300 border-violet-400/30",
      primary: "查看详情",
      secondary: "加入待办",
    },
    {
      id: "03",
      title: "AI 副业变现流程拆解",
      source: "来源：历史复盘",
      badge: "转化高",
      badgeColor: "bg-emerald-500/15 text-emerald-300 border-emerald-400/30",
      primary: "查看详情",
      secondary: "加入待办",
    },
  ];

  const stats = [
    {
      title: "正在生成",
      value: "1",
      desc: "1个任务进行中",
      glow: "from-blue-500/20 to-cyan-400/10",
      valueColor: "text-blue-300",
    },
    {
      title: "待发布",
      value: "2",
      desc: "条内容待发布",
      glow: "from-violet-500/20 to-fuchsia-400/10",
      valueColor: "text-violet-300",
    },
    {
      title: "失败任务",
      value: "1",
      desc: "1个任务失败",
      action: "查看并重试",
      glow: "from-red-500/20 to-orange-400/10",
      valueColor: "text-red-300",
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
    ["本地 API", "在线"],
    ["Hermes 引擎", "可用"],
    ["Notion", "已配置"],
    ["微信入口", "active"],
    ["网页后台入口", "active"],
    ["定时任务", "正常"],
  ];

  const quickActions = [
    "新建发布包",
    "新建任务",
    "情报库",
    "知识库",
    "流程编排",
    "数据复盘",
  ];

  return (
    <div className="min-h-screen bg-[#07101c] text-[#eaf1fd]">
      <div className="min-h-screen bg-[radial-gradient(circle_at_top_right,rgba(122,77,255,0.16),transparent_25%),radial-gradient(circle_at_top_left,rgba(47,107,255,0.14),transparent_30%),linear-gradient(180deg,#08111d_0%,#0a1322_100%)]">
        <header className="sticky top-0 z-20 border-b border-white/10 bg-[#0b1220]/90 backdrop-blur">
          <div className="flex h-16 items-center justify-between px-4 md:px-6">
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <div className="hidden h-9 w-9 items-center justify-center rounded-xl border border-blue-400/30 bg-blue-500/10 text-blue-300 shadow-[0_0_20px_rgba(47,107,255,0.15)] sm:flex">
                ✦
              </div>
              <div className="relative w-full max-w-xl">
                <input
                  type="text"
                  placeholder="搜索任务、发布包、知识库…"
                  className="h-10 w-full rounded-xl border border-white/10 bg-white/5 pl-10 pr-4 text-sm text-[#e5eefc] outline-none placeholder:text-slate-400 focus:border-blue-400/40 focus:bg-white/[0.07]"
                />
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  ⌕
                </span>
              </div>
            </div>
            <div className="ml-4 flex items-center gap-2">
              <button className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200 transition hover:bg-white/10">
                刷新
              </button>
              <button className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200 transition hover:bg-white/10">
                设置
              </button>
              <div className="hidden items-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-300 sm:flex">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(30,215,96,0.8)]" />
                系统正常
              </div>
            </div>
          </div>
        </header>

        <div className="mx-auto grid max-w-[1536px] grid-cols-1 gap-4 p-4 md:p-6 xl:grid-cols-[260px_minmax(0,1fr)_320px]">
          <aside className="rounded-2xl border border-white/10 bg-[#0a1322] p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_12px_40px_rgba(0,0,0,0.35)] xl:sticky xl:top-24 xl:h-[calc(100vh-7rem)]">
            <div className="mb-6">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2f6bff] to-[#7a4dff] text-lg font-semibold shadow-[0_0_24px_rgba(122,77,255,0.35)]">
                  虾
                </div>
                <div>
                  <div className="text-base font-semibold text-white">小龙虾后台</div>
                  <div className="text-xs text-slate-400">AI 内容生产系统</div>
                </div>
              </div>
            </div>

            <nav className="space-y-1">
              {navItems.map((item, index) => {
                const active = index === 0;
                return (
                  <button
                    key={item}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition ${
                      active
                        ? "border border-blue-400/25 bg-gradient-to-r from-blue-500/20 to-violet-500/10 text-white shadow-[0_0_18px_rgba(47,107,255,0.16)]"
                        : "text-slate-300 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span>{item}</span>
                    {active && <span className="text-blue-300">•</span>}
                  </button>
                );
              })}
            </nav>

            <div className="mt-6 rounded-2xl border border-violet-400/20 bg-gradient-to-br from-violet-500/10 to-blue-500/10 p-4">
              <div className="text-sm font-medium text-white">龙虾 Pro</div>
              <div className="mt-1 text-xs text-slate-300">解锁更强工作流与自动化能力</div>
              <div className="mt-3 inline-flex rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-violet-200">
                本地模式
              </div>
            </div>
          </aside>

          <main className="space-y-4">
            <section className="overflow-hidden rounded-2xl border border-blue-400/20 bg-[#182857] shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_0_40px_rgba(47,107,255,0.12)]">
              <div className="grid gap-6 p-6 lg:grid-cols-[1.3fr_0.9fr]">
                <div>
                  <div className="mb-3 inline-flex rounded-full border border-blue-300/20 bg-white/10 px-3 py-1 text-xs text-blue-100">
                    今日 AI 建议
                  </div>
                  <h1 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
                    优先制作 2 条 AI 工具实操内容
                  </h1>
                  <p className="mt-4 text-sm leading-6 text-blue-100/85">
                    推荐方向：OpenClaw 自动发布、小红书流程自动化
                  </p>
                  <p className="mt-2 text-sm leading-6 text-blue-100/70">
                    推荐原因：近期相关情报增长明显，历史发布效果良好
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <button className="rounded-xl bg-gradient-to-r from-[#2f6bff] to-[#7a4dff] px-4 py-2.5 text-sm font-medium text-white shadow-[0_0_24px_rgba(122,77,255,0.35)] transition hover:opacity-95">
                      开始生成内容
                    </button>
                    <button className="rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-blue-50 transition hover:bg-white/10">
                      查看推荐依据
                    </button>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/10 p-5 backdrop-blur-sm">
                  <div className="text-sm font-medium text-blue-100">预计收益</div>
                  <div className="mt-4 space-y-3">
                    <div className="rounded-xl border border-white/8 bg-white/5 p-3">
                      <div className="text-lg font-semibold text-white">预计播放量提升 30%+</div>
                    </div>
                    <div className="rounded-xl border border-white/8 bg-white/5 p-3">
                      <div className="text-lg font-semibold text-white">用户互动率提升 20%+</div>
                    </div>
                    <div className="rounded-xl border border-white/8 bg-white/5 p-3">
                      <div className="text-lg font-semibold text-white">更容易获得爆款机会</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-white/10 bg-[#111a2b] p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_10px_30px_rgba(0,0,0,0.25)]">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-white">今日机会（最多 3 个）</h2>
                </div>
                <button className="text-sm text-blue-300 hover:text-blue-200">查看全部机会</button>
              </div>
              <div className="grid gap-4 lg:grid-cols-3">
                {opportunityCards.map((card) => (
                  <div
                    key={card.id}
                    className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.02] p-4 transition hover:border-blue-400/20 hover:bg-white/[0.05]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="text-2xl font-semibold tracking-tight text-white/90">{card.id}</div>
                      <span className={`rounded-full border px-2.5 py-1 text-xs ${card.badgeColor}`}>
                        {card.badge}
                      </span>
                    </div>
                    <div className="mt-4 text-base font-medium leading-6 text-white">{card.title}</div>
                    <div className="mt-2 text-sm text-slate-400">{card.source}</div>
                    <div className="mt-5 flex flex-wrap gap-2">
                      <button className="rounded-lg bg-blue-500/15 px-3 py-2 text-sm text-blue-200 hover:bg-blue-500/20">
                        {card.primary}
                      </button>
                      <button className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-300 hover:bg-white/10">
                        {card.secondary}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="grid gap-4 md:grid-cols-3">
              {stats.map((item) => (
                <div
                  key={item.title}
                  className={`rounded-2xl border border-white/10 bg-[#111a2b] p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_10px_30px_rgba(0,0,0,0.25)]`}
                >
                  <div className={`rounded-xl bg-gradient-to-r ${item.glow} p-4`}>
                    <div className="text-sm text-slate-300">{item.title}</div>
                    <div className={`mt-2 text-4xl font-semibold ${item.valueColor}`}>{item.value}</div>
                    <div className="mt-2 text-sm text-slate-400">{item.desc}</div>
                    {item.action && (
                      <button className="mt-4 text-sm text-red-300 hover:text-red-200">{item.action}</button>
                    )}
                  </div>
                </div>
              ))}
            </section>

            <section className="rounded-2xl border border-white/10 bg-[#111a2b] p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_10px_30px_rgba(0,0,0,0.25)]">
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-white">待处理事项（行动清单）</h2>
              </div>
              <div className="space-y-3">
                {todoItems.map((item) => (
                  <div
                    key={item.title}
                    className="flex flex-col gap-4 rounded-2xl border border-white/8 bg-white/[0.03] p-4 md:flex-row md:items-center md:justify-between"
                  >
                    <div className="min-w-0">
                      <div className="text-base font-medium text-white">{item.title}</div>
                      <div className="mt-1 text-sm text-slate-400">{item.desc}</div>
                    </div>
                    <div className="flex shrink-0 items-center">
                      <button className="rounded-xl border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-200 hover:bg-blue-500/15">
                        {item.action}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-white/10 bg-[#111a2b] p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_10px_30px_rgba(0,0,0,0.25)]">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h2 className="text-lg font-semibold text-white">最近结果（昨日）</h2>
                <button className="text-sm text-blue-300 hover:text-blue-200">查看完整复盘</button>
              </div>

              <div className="grid gap-5 lg:grid-cols-[220px_1fr]">
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-800 to-slate-900">
                  <div className="flex h-56 items-center justify-center bg-[radial-gradient(circle_at_30%_20%,rgba(47,107,255,0.35),transparent_30%),radial-gradient(circle_at_70%_30%,rgba(122,77,255,0.35),transparent_35%),linear-gradient(180deg,#18253b,#0d1522)] text-center">
                    <div>
                      <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-xl">
                        ▶
                      </div>
                      <div className="text-sm text-slate-300">最佳内容</div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-between">
                  <div>
                    <div className="text-sm text-slate-400">最佳内容</div>
                    <h3 className="mt-2 text-xl font-semibold text-white">普通人用 AI 做自动发布的一天</h3>

                    <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                      {[
                        "2.3w 播放",
                        "1.2k 点赞",
                        "156 评论",
                        "312 收藏",
                      ].map((metric) => (
                        <div
                          key={metric}
                          className="rounded-xl border border-white/8 bg-white/[0.04] p-3 text-center text-sm text-slate-200"
                        >
                          {metric}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 rounded-2xl border border-violet-400/15 bg-gradient-to-r from-violet-500/10 to-blue-500/10 p-4">
                    <div className="text-sm font-medium text-white">AI 复盘总结</div>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      标题具备强场景感与低门槛代入感，内容结构清晰，实操节奏紧凑，适合继续延展自动化工具链相关选题。
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </main>

          <aside className="space-y-4">
            <section className="rounded-2xl border border-white/10 bg-[#111a2b] p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_10px_30px_rgba(0,0,0,0.25)]">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-white">系统状态</h2>
                  <div className="mt-1 text-sm text-emerald-300">一切正常</div>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-500/10 text-emerald-300">
                  ✓
                </div>
              </div>

              <div className="mt-4 space-y-3">
                {statuses.map(([label, state]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between rounded-xl border border-white/8 bg-white/[0.03] px-3 py-3"
                  >
                    <span className="text-sm text-slate-300">{label}</span>
                    <span className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-2.5 py-1 text-xs text-emerald-300">
                      {state}
                    </span>
                  </div>
                ))}
              </div>

              <button className="mt-4 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-slate-200 hover:bg-white/10">
                查看所有状态
              </button>
            </section>

            <section className="rounded-2xl border border-white/10 bg-[#111a2b] p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_10px_30px_rgba(0,0,0,0.25)]">
              <h2 className="mb-4 text-lg font-semibold text-white">快捷入口</h2>
              <div className="grid grid-cols-2 gap-3">
                {quickActions.map((item, index) => (
                  <button
                    key={item}
                    className="group rounded-2xl border border-white/8 bg-white/[0.03] p-4 text-left transition hover:border-blue-400/20 hover:bg-white/[0.05]"
                  >
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-violet-500/20 text-lg text-blue-200">
                      {["＋", "◉", "⌁", "✦", "⇄", "▣"][index]}
                    </div>
                    <div className="text-sm font-medium text-slate-100">{item}</div>
                  </button>
                ))}
              </div>
            </section>

            <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#111a2b] shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_10px_30px_rgba(0,0,0,0.25)]">
              <div className="grid gap-4 p-5 sm:grid-cols-[80px_1fr] xl:grid-cols-1 2xl:grid-cols-[80px_1fr]">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2f6bff]/25 to-[#7a4dff]/30 text-3xl shadow-[0_0_30px_rgba(122,77,255,0.2)]">
                  🦞
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-white">小龙虾助手</h2>
                  <p className="mt-2 text-sm text-slate-400">有任何问题，随时召唤我~</p>
                  <button className="mt-4 rounded-xl bg-gradient-to-r from-[#2f6bff] to-[#7a4dff] px-4 py-2.5 text-sm font-medium text-white shadow-[0_0_24px_rgba(47,107,255,0.2)] hover:opacity-95">
                    立即咨询
                  </button>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}