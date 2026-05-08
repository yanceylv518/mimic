const sectionLabels = {
  navigation: "Navigation",
  hero: "Hero",
  "feature-grid": "Features",
  pricing: "Pricing",
  footer: "Footer",
  content: "Content",
  sidebar: "Sidebar"
};

export function generateReactPage(analysis) {
  const theme = normalizeTheme(analysis.theme);
  const sections =
    analysis.sections.length > 0 ? analysis.sections : [fallbackSection(analysis.pageType)];

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
      <h1 className="mt-3 max-w-4xl text-4xl font-bold leading-tight text-slate-950 sm:text-5xl">
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
          <h2 className="mt-2 text-2xl font-bold text-slate-950">
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
                key={\`\${section.id}-\${element}-\${index}\`}
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
  return hasDarkText
    ? "min-h-screen bg-slate-50 text-slate-950"
    : "min-h-screen bg-white text-slate-950";
}

function fallbackSection(pageType) {
  return {
    id: "content",
    type: "content",
    layout: "stacked",
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
