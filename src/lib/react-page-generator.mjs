const sectionLabels = {
  navigation: "Navigation",
  header: "Header",
  hero: "Hero",
  "feature-grid": "Features",
  features: "Features",
  pricing: "Pricing",
  footer: "Footer",
  content: "Content",
  sidebar: "Sidebar"
};

export function generateReactPage(analysis) {
  const theme = normalizeTheme(analysis.theme);
  const sections =
    analysis.sections.length > 0 ? analysis.sections : [fallbackSection(analysis.pageType)];
  const isDashboard =
    analysis.pageType === "dashboard" || sections.some((section) => section.type === "sidebar");

  if (isDashboard) {
    return generateDashboardPage(analysis, sections);
  }

  return generateGenericPage(analysis, sections, theme);
}

function generateDashboardPage(analysis, sections) {
  const sidebarSections = sections.filter(
    (section) => section.position?.region === "left" || section.type === "sidebar"
  );
  const headerSection = sections.find(
    (section) => section.position?.region === "top" || section.type === "header"
  );
  const heroSection =
    sections.find((section) => section.position?.importance === "primary") ??
    sections.find((section) => section.type === "hero");
  const mainSections = sections.filter(
    (section) =>
      section !== headerSection &&
      section !== heroSection &&
      section.position?.region !== "left" &&
      section.position?.region !== "right" &&
      section.type !== "sidebar"
  ).sort(byPositionOrder);
  const rightSections = sections
    .filter((section) => section.position?.region === "right")
    .sort(byPositionOrder);
  const leftSidebar =
    sidebarSections.find((section) => section.position?.region === "left") ??
    sidebarSections[0] ??
    fallbackSection("sidebar");
  const layoutColumns = normalizeColumns(analysis.layout?.columns);
  const pageDensity = analysis.layout?.density || "medium";

  return `const leftSidebar = ${JSON.stringify(leftSidebar, null, 2)};
const headerSection = ${JSON.stringify(headerSection ?? fallbackSection("header"), null, 2)};
const heroSection = ${JSON.stringify(heroSection ?? fallbackSection("hero"), null, 2)};
const mainSections = ${JSON.stringify(mainSections, null, 2)};
const rightSections = ${JSON.stringify(rightSections, null, 2)};
const layoutColumns = ${JSON.stringify(layoutColumns)};
const pageDensity: string = ${JSON.stringify(pageDensity)};

export default function GeneratedPage() {
  return (
    <main className="min-h-screen bg-[#070b12] text-slate-100">
      <div
        className="hidden min-h-screen lg:grid"
        style={{ gridTemplateColumns: layoutColumns.join(" ") }}
      >
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

        <section className={pageDensity === "compact" ? "min-w-0 bg-[#0a101a] px-5 py-5" : "min-w-0 bg-[#0a101a] px-5 py-6 lg:px-8"}>
          <TopBar section={headerSection} />
          <Hero section={heroSection} summary="${escapeAttribute(analysis.summary || "")}" />
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
      <div className="block lg:hidden">
        <section className="bg-[#0a101a] px-5 py-5">
          <TopBar section={headerSection} />
          <Hero section={heroSection} summary="${escapeAttribute(analysis.summary || "")}" />
          <div className="mt-6 flex flex-col gap-5">
            {[leftSidebar, ...mainSections, ...rightSections].map((section, index) => (
              <Panel key={section.id + "-mobile-" + index} section={section} compact />
            ))}
          </div>
        </section>
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
  position?: {
    region?: string;
    order?: number;
    width?: string;
    height?: string;
    importance?: string;
    density?: string;
  };
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
  const importanceClass = importanceToClass(section.position?.importance, compact);

  return (
    <section
      className={radiusClass + " " + borderClass + " " + importanceClass + " shadow-xl shadow-black/20"}
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

function importanceToClass(importance?: string, compact?: boolean) {
  if (compact) {
    return "p-4";
  }

  if (importance === "primary") {
    return "p-6 xl:col-span-2";
  }

  if (importance === "utility") {
    return "p-4";
  }

  return "p-5";
}
`;
}

function generateGenericPage(analysis, sections, theme) {
  return `const sectionLabels: Record<string, string> = ${JSON.stringify(sectionLabels, null, 2)};

const sections = ${JSON.stringify(sections, null, 2)};

export default function GeneratedPage() {
  return (
    <main className="${pageClass(theme)}">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-8 sm:px-8 lg:px-10">
        <PageHeader pageType="${escapeAttribute(analysis.pageType)}" summary="${escapeAttribute(
          analysis.summary || "Generated from page analysis"
        )}" />
        <div className="mt-10 flex flex-col gap-8">
          {sections.map((section) => (
            <SectionBlock key={section.id} section={section} />
          ))}
        </div>
      </div>
    </main>
  );
}

function PageHeader({ pageType, summary }: { pageType: string; summary: string }) {
  return (
    <header className="border-b border-slate-200 pb-8">
      <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
        {pageType || "unknown page"}
      </p>
      <h1 className="mt-3 max-w-4xl text-4xl font-bold leading-tight sm:text-5xl">
        Generated React + Tailwind page
      </h1>
      <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
        {summary}
      </p>
    </header>
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

function SectionBlock({ section }: { section: Section }) {
  const elements = Array.isArray(section.elements) ? section.elements : [];
  const background = section.style?.background || "#ffffff";

  return (
    <section
      className="rounded-xl border border-slate-200 p-6 shadow-sm"
      style={{ backgroundColor: background }}
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            {section.type}
          </p>
          <h2 className="mt-2 text-2xl font-bold">
            {sectionLabel(section)}
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Layout: {section.layout || "unknown"} - Spacing: {section.style?.spacing || "unknown"}
          </p>
        </div>
        <div className="grid w-full gap-3 sm:grid-cols-2 lg:max-w-md">
          {elements.length > 0 ? (
            elements.map((element, index) => (
              <div
                key={section.id + "-" + element + "-" + index}
                className="rounded-lg border border-slate-200 bg-white/80 px-4 py-3 text-sm font-medium text-slate-700"
              >
                {element}
              </div>
            ))
          ) : (
            <div className="rounded-lg border border-dashed border-slate-300 bg-white/70 px-4 py-3 text-sm text-slate-500">
              No elements described yet.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function sectionLabel(section: Section) {
  return sectionLabels[section.type as keyof typeof sectionLabels] || section.id || "Section";
}
`;
}

function normalizeTheme(theme) {
  return {
    colors: Array.isArray(theme?.colors) ? theme.colors : [],
    spacing: theme?.spacing || "",
    radius: theme?.radius || "",
    fontStyle: theme?.fontStyle || ""
  };
}

function pageClass(theme) {
  const hasDarkText = theme.colors.includes("#0f172a") || theme.colors.includes("#111827");
  const hasDarkBackground = theme.colors.some((color) =>
    ["#0b1220", "#0f1726", "#070b12", "#0a101a"].includes(String(color).toLowerCase())
  );

  if (hasDarkBackground) {
    return "min-h-screen bg-[#070b12] text-slate-100";
  }

  return hasDarkText
    ? "min-h-screen bg-slate-50 text-slate-950"
    : "min-h-screen bg-white text-slate-950";
}

function fallbackSection(pageType) {
  return {
    id: "content",
    type: "content",
    layout: "stacked",
    position: {
      region: "main",
      order: 1,
      width: "full",
      height: "auto",
      importance: "secondary",
      density: "medium"
    },
    elements: [pageType || "unknown"],
    style: {
      background: "#ffffff",
      spacing: "medium"
    }
  };
}

function escapeAttribute(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function byPositionOrder(a, b) {
  return (a.position?.order ?? 999) - (b.position?.order ?? 999);
}

function normalizeColumns(columns) {
  if (!Array.isArray(columns) || columns.length === 0) {
    return ["260px", "minmax(0,1fr)", "300px"];
  }

  if (columns.length === 1) {
    return [columns[0]];
  }

  return columns.map((column) => {
    if (column === "1fr") {
      return "minmax(0,1fr)";
    }

    return column;
  });
}
