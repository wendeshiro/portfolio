import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";

// CI guardrail: detect duplicate DOM ids within each route page (page.tsx).
// This is page-scoped, not repo-scoped.
const ROOT = process.cwd();
const APP_DIR = path.join(ROOT, "src", "app");

// Components that always render a fixed id internally.
// Rule: do not render the same fixed-id component more than once in a page.
const FIXED_ID_COMPONENTS = [
  {
    componentName: "ProjectOverview",
    fixedId: "overview",
  },
];

const ID_PATTERNS = [
  /\bid\s*=\s*"([^"]+)"/g,
  /\bid\s*=\s*'([^']+)'/g,
  /\bid\s*=\s*\{\s*"([^"]+)"\s*\}/g,
  /\bid\s*=\s*\{\s*'([^']+)'\s*\}/g,
];

function collectPageFiles(dir) {
  const entries = readdirSync(dir, { withFileTypes: true });
  const pageFiles = [];

  for (const entry of entries) {
    const entryPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      pageFiles.push(...collectPageFiles(entryPath));
      continue;
    }

    if (entry.isFile() && entry.name === "page.tsx") {
      pageFiles.push(entryPath);
    }
  }

  return pageFiles;
}

function lineFromIndex(content, index) {
  let line = 1;
  for (let i = 0; i < index; i += 1) {
    if (content[i] === "\n") {
      line += 1;
    }
  }
  return line;
}

function addOccurrence(map, id, occurrence) {
  if (!map.has(id)) {
    map.set(id, []);
  }
  map.get(id).push(occurrence);
}

function checkPageIds(pagePath) {
  const source = readFileSync(pagePath, "utf8");
  const pageRelPath = path.relative(ROOT, pagePath);
  // Collect id usage for this single page only.
  const idOccurrences = new Map();
  const fixedComponentFailures = [];

  for (const pattern of ID_PATTERNS) {
    pattern.lastIndex = 0;
    let match = pattern.exec(source);
    while (match) {
      const idValue = match[1];
      const line = lineFromIndex(source, match.index);
      addOccurrence(idOccurrences, idValue, {
        line,
        reason: `static id="${idValue}"`,
      });
      match = pattern.exec(source);
    }
  }

  for (const { componentName, fixedId } of FIXED_ID_COMPONENTS) {
    const regex = new RegExp(`<${componentName}\\b`, "g");
    const lines = [];
    let match = regex.exec(source);

    while (match) {
      const line = lineFromIndex(source, match.index);
      lines.push(line);
      addOccurrence(idOccurrences, fixedId, {
        line,
        reason: `<${componentName}> -> id="${fixedId}"`,
      });
      match = regex.exec(source);
    }

    if (lines.length > 1) {
      fixedComponentFailures.push(
        `${componentName} rendered ${lines.length} times (lines: ${lines.join(", ")})`,
      );
    }
  }

  const duplicateIdFailures = [];
  for (const [id, occurrences] of idOccurrences.entries()) {
    if (occurrences.length <= 1) {
      continue;
    }
    const details = occurrences
      .map((occurrence) => `line ${occurrence.line}: ${occurrence.reason}`)
      .join(" | ");
    duplicateIdFailures.push(`id "${id}" appears ${occurrences.length} times -> ${details}`);
  }

  if (fixedComponentFailures.length === 0 && duplicateIdFailures.length === 0) {
    return null;
  }

  return {
    pageRelPath,
    fixedComponentFailures,
    duplicateIdFailures,
  };
}

function main() {
  const pageFiles = collectPageFiles(APP_DIR);
  const failures = [];

  for (const pagePath of pageFiles) {
    const result = checkPageIds(pagePath);
    if (result) {
      failures.push(result);
    }
  }

  if (failures.length === 0) {
    console.log(`check:ids passed (${pageFiles.length} page files checked).`);
    return;
  }

  console.error(`check:ids failed in ${failures.length} page file(s):`);
  for (const failure of failures) {
    console.error(`\n- ${failure.pageRelPath}`);

    for (const message of failure.fixedComponentFailures) {
      console.error(`  [fixed-component] ${message}`);
    }

    for (const message of failure.duplicateIdFailures) {
      console.error(`  [duplicate-id] ${message}`);
    }
  }

  process.exitCode = 1;
}

main();
