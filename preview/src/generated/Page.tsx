const leftSidebar = {
  "elements": [
    "logo",
    "product name",
    "subtitle",
    "nav menu",
    "active nav item",
    "user/workspace card"
  ],
  "id": "sidebar",
  "layout": "stacked",
  "style": {
    "background": "#0b1220",
    "spacing": "large"
  },
  "type": "sidebar"
};
const headerSection = {
  "elements": [
    "search bar",
    "refresh button",
    "settings button",
    "system status pill"
  ],
  "id": "header",
  "layout": "two-column",
  "style": {
    "background": "#0a101a",
    "spacing": "medium"
  },
  "type": "header"
};
const heroSection = {
  "elements": [
    "badge",
    "illustration",
    "headline",
    "supporting text",
    "primary cta",
    "secondary cta",
    "benefit panel"
  ],
  "id": "hero",
  "layout": "two-column",
  "style": {
    "background": "#142347",
    "spacing": "large"
  },
  "type": "hero"
};
const mainSections = [
  {
    "elements": [
      "section title",
      "link",
      "3 opportunity cards",
      "tags",
      "card actions"
    ],
    "id": "content",
    "layout": "grid",
    "style": {
      "background": "#0f1726",
      "spacing": "medium"
    },
    "type": "content"
  },
  {
    "elements": [
      "3 metric cards",
      "icons",
      "large numbers",
      "mini trend lines",
      "small action button"
    ],
    "id": "features",
    "layout": "grid",
    "style": {
      "background": "#0f1726",
      "spacing": "medium"
    },
    "type": "features"
  },
  {
    "elements": [
      "task list",
      "list rows",
      "status icons",
      "descriptions",
      "row action buttons"
    ],
    "id": "content",
    "layout": "stacked",
    "style": {
      "background": "#0f1726",
      "spacing": "medium"
    },
    "type": "content"
  },
  {
    "elements": [
      "section title",
      "link",
      "content preview card",
      "thumbnail",
      "engagement stats",
      "ai summary"
    ],
    "id": "content",
    "layout": "stacked",
    "style": {
      "background": "#0f1726",
      "spacing": "medium"
    },
    "type": "content"
  }
];
const rightSections = [
  {
    "elements": [
      "system status title",
      "status rows",
      "availability pills",
      "view all button"
    ],
    "id": "sidebar",
    "layout": "stacked",
    "style": {
      "background": "#0f1726",
      "spacing": "medium"
    },
    "type": "sidebar"
  },
  {
    "elements": [
      "quick access title",
      "icon tiles",
      "labels"
    ],
    "id": "sidebar",
    "layout": "grid",
    "style": {
      "background": "#0f1726",
      "spacing": "medium"
    },
    "type": "sidebar"
  },
  {
    "elements": [
      "assistant title",
      "support text",
      "cta button",
      "mascot illustration"
    ],
    "id": "sidebar",
    "layout": "two-column",
    "style": {
      "background": "#0f1726",
      "spacing": "medium"
    },
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
            <p className="mt-1 text-sm text-slate-400">AI operations dashboard</p>
          </div>
          <ElementList elements={leftSidebar.elements || []} variant="nav" />
        </aside>

        <section className="min-w-0 bg-[#0a101a] px-5 py-6 lg:px-8">
          <TopBar section={headerSection} />
          <Hero section={heroSection} summary="A dark-themed AI operations dashboard with a persistent left sidebar, top utility bar, a prominent recommendation hero, opportunity and task management cards in the main area, and a right sidebar for system status, shortcuts, and assistant support." />
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
  layout?: string;
  elements?: string[];
  style?: {
    background?: string;
    spacing?: string;
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
            Dark AI operations dashboard
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-blue-100/80">{summary}</p>
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

  return (
    <section className="rounded-2xl border border-white/10 bg-[#0f1726] p-5 shadow-xl shadow-black/20">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            {section.type}
          </p>
          <h3 className="mt-1 text-lg font-bold text-slate-100">{section.id}</h3>
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
