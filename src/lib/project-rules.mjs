import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const defaultRuleNames = ["dashboard.md"];

export async function loadProjectRules({
  cwd = process.cwd(),
  ruleNames = defaultRuleNames
} = {}) {
  const rulesDir = path.join(cwd, "project-rules");
  const rules = [];

  for (const ruleName of ruleNames) {
    try {
      const rulePath = path.join(rulesDir, ruleName);
      const content = await readFile(rulePath, "utf8");
      rules.push({
        content,
        name: ruleName,
        path: path.relative(cwd, rulePath).replaceAll("\\", "/")
      });
    } catch (error) {
      if (!error || error.code !== "ENOENT") {
        throw error;
      }
    }
  }

  return rules;
}

export async function listProjectRules({ cwd = process.cwd() } = {}) {
  const rulesDir = path.join(cwd, "project-rules");
  let entries = [];

  try {
    entries = await readdir(rulesDir, { withFileTypes: true });
  } catch (error) {
    if (!error || error.code !== "ENOENT") {
      throw error;
    }
  }

  const rules = [];

  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith(".md")) {
      continue;
    }

    const rulePath = path.join(rulesDir, entry.name);
    rules.push({
      content: await readFile(rulePath, "utf8"),
      name: entry.name,
      path: path.relative(cwd, rulePath).replaceAll("\\", "/")
    });
  }

  return rules.sort((left, right) => left.name.localeCompare(right.name));
}

export function appendProjectRules(instructions, rules) {
  if (!rules.length) {
    return instructions;
  }

  return [
    instructions.trim(),
    "",
    "# Project Rules",
    "",
    "Follow these persistent project rules unless the current screenshot clearly contradicts them.",
    "",
    ...rules.flatMap((rule) => [`## ${rule.name}`, "", rule.content.trim(), ""])
  ].join("\n");
}
