import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const registryPath = (cwd) => path.join(cwd, "components", "registry.json");
const dashboardSpecPath = (cwd) => path.join(cwd, "components", "specs", "dashboard.json");

export async function extractComponentCandidatesFromAnalysis({
  analysis,
  cwd = process.cwd(),
  pageId
}) {
  const spec = JSON.parse(await readFile(dashboardSpecPath(cwd), "utf8"));
  const sections = Array.isArray(analysis.sections) ? analysis.sections : [];
  const candidates = [];

  if (analysis.layout?.type === "dashboard") {
    candidates.push(createCandidate(spec, "dashboard-shell", pageId, {
      sourceSectionIds: sections.map((section) => section.id).filter(Boolean),
      signals: ["layout.type=dashboard", `columns=${(analysis.layout.columns ?? []).join("/")}`]
    }));
  }

  for (const section of sections) {
    const family = matchFamily(spec.families, section);

    if (!family) {
      continue;
    }

    candidates.push(createCandidate(spec, family.id, pageId, {
      sourceSectionIds: [section.id].filter(Boolean),
      signals: [
        `section.type=${section.type ?? "unknown"}`,
        `section.region=${section.position?.region ?? "unknown"}`,
        ...(section.elements ?? []).slice(0, 6)
      ]
    }));
  }

  return dedupeCandidates(candidates);
}

export async function mergeComponentCandidates({
  candidates,
  cwd = process.cwd()
}) {
  const registry = await readRegistry(cwd);
  const now = new Date().toISOString();

  for (const candidate of candidates) {
    const existing = registry.components.find((component) => component.id === candidate.id);

    if (!existing) {
      registry.components.push({
        ...candidate,
        createdAt: now,
        lastSeenAt: now,
        maturity: "candidate",
        seenInPages: candidate.seenInPages
      });
      continue;
    }

    existing.lastSeenAt = now;
    existing.sourceSectionIds = unique([...(existing.sourceSectionIds ?? []), ...candidate.sourceSectionIds]);
    existing.signals = unique([...(existing.signals ?? []), ...candidate.signals]).slice(0, 16);
    existing.seenInPages = unique([...(existing.seenInPages ?? []), ...candidate.seenInPages]);
  }

  registry.components.sort((left, right) => left.id.localeCompare(right.id));
  await writeRegistry(cwd, registry);
  return registry;
}

export async function readComponentRegistry({ cwd = process.cwd() } = {}) {
  return readRegistry(cwd);
}

async function readRegistry(cwd) {
  try {
    return JSON.parse(await readFile(registryPath(cwd), "utf8"));
  } catch (error) {
    if (error && error.code === "ENOENT") {
      return {
        schemaVersion: 1,
        components: []
      };
    }

    throw error;
  }
}

async function writeRegistry(cwd, registry) {
  const targetPath = registryPath(cwd);
  await mkdir(path.dirname(targetPath), { recursive: true });
  await writeFile(targetPath, `${JSON.stringify(registry, null, 2)}\n`);
}

function matchFamily(families, section) {
  const type = String(section.type ?? "").toLowerCase();
  const id = String(section.id ?? "").toLowerCase();
  const title = String(section.title ?? "").toLowerCase();
  const region = String(section.position?.region ?? "").toLowerCase();

  if (id === "header" || type === "header" || title.includes("toolbar")) {
    return familyById(families, "top-toolbar");
  }

  if (id === "sidebar" && region === "left") {
    return familyById(families, "sidebar-nav");
  }

  if (id === "status" || (region === "right" && title.includes("状态"))) {
    return familyById(families, "status-list");
  }

  if (id === "quick-actions" || title.includes("快捷")) {
    return familyById(families, "quick-action-grid");
  }

  if (id === "hero" || type === "hero") {
    return familyById(families, "hero-recommendation");
  }

  if (id === "features" || title.includes("机会")) {
    return familyById(families, "opportunity-card-grid");
  }

  if (id === "stats" || title.includes("概览")) {
    return familyById(families, "metric-card-row");
  }

  return families.find((family) =>
    family.sectionTypes.some((sectionType) => type === sectionType.toLowerCase() || id === sectionType.toLowerCase())
  );
}

function familyById(families, id) {
  return families.find((family) => family.id === id);
}

function createCandidate(spec, familyId, pageId, details) {
  const family = spec.families.find((item) => item.id === familyId);

  return {
    description: family.description,
    id: family.id,
    name: family.name,
    seenInPages: [pageId],
    signals: unique(details.signals.filter(Boolean)),
    sourceSectionIds: unique(details.sourceSectionIds),
    spec: "components/specs/dashboard.json"
  };
}

function dedupeCandidates(candidates) {
  const byId = new Map();

  for (const candidate of candidates) {
    const existing = byId.get(candidate.id);

    if (!existing) {
      byId.set(candidate.id, candidate);
      continue;
    }

    existing.signals = unique([...existing.signals, ...candidate.signals]);
    existing.sourceSectionIds = unique([...existing.sourceSectionIds, ...candidate.sourceSectionIds]);
    existing.seenInPages = unique([...existing.seenInPages, ...candidate.seenInPages]);
  }

  return Array.from(byId.values());
}

function unique(values) {
  return Array.from(new Set(values.filter(Boolean)));
}
