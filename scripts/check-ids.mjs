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

// Only match id attributes inside opening JSX tags.
// This avoids matching unrelated id="..." text outside tag context.
const STATIC_ID_ATTR_PATTERN =
  /<(?!\/)[^>]*\bid\s*=\s*(?:"([^"]+)"|'([^']+)'|\{\s*"([^"]+)"\s*\}|\{\s*'([^']+)'\s*\})/g;

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

function createLineResolver(content) {
  const lineStarts = [0];
  for (let i = 0; i < content.length; i += 1) {
    if (content[i] === "\n") {
      lineStarts.push(i + 1);
    }
  }

  return (index) => {
    let low = 0;
    let high = lineStarts.length - 1;

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      if (lineStarts[mid] <= index) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }

    return high + 1;
  };
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
  const lineFromIndex = createLineResolver(source);
  // Collect id usage for this single page only.
  const idOccurrences = new Map();

  for (const match of source.matchAll(STATIC_ID_ATTR_PATTERN)) {
    const idValue = match[1] ?? match[2] ?? match[3] ?? match[4];
    if (!idValue) {
      continue;
    }

    const attrOffset = match[0].search(/\bid\s*=/);
    const baseIndex = match.index ?? 0;
    const idAttrIndex = attrOffset >= 0 ? baseIndex + attrOffset : baseIndex;

    addOccurrence(idOccurrences, idValue, {
      line: lineFromIndex(idAttrIndex),
      reason: `static id="${idValue}"`,
    });
  }

  for (const { componentName, fixedId } of FIXED_ID_COMPONENTS) {
    const regex = new RegExp(`<${componentName}\\b`, "g");
    for (const match of source.matchAll(regex)) {
      const line = lineFromIndex(match.index ?? 0);
      addOccurrence(idOccurrences, fixedId, {
        line,
        reason: `<${componentName}> -> id="${fixedId}"`,
      });
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

  if (duplicateIdFailures.length === 0) {
    return null;
  }

  return {
    pageRelPath,
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

    for (const message of failure.duplicateIdFailures) {
      console.error(`  [duplicate-id] ${message}`);
    }
  }

  process.exitCode = 1;
}

main();
