// validate-links.mjs — the "links must work" gate (forensic audit 2026-09-14).
//
// Guards the failure modes that actually occurred:
//   - contracts with no Figma deep link at all (found: 8 of 18)
//   - Figma links pointing at the wrong file key
//   - internal relative markdown links that 404 after a rename
//     (found: field-type-2/3.md hyperlinks living on after the 2026-09-11 rename)
//   - mapping contractPaths that do not exist on disk
//
// Always strict: any finding exits 1. Scope: every contract file referenced by
// the portal mappings and the root index, plus the relative links inside them.

import fs from "node:fs";
import path from "node:path";
import { readJson, relative, repositoryRoot } from "./portal-validation-lib.mjs";

const errors = [];
const checkedContracts = new Set();

const figmaLinkPattern =
  /https:\/\/www\.figma\.com\/design\/([A-Za-z0-9]+)\/[^)\s"'<>]*/g;
// Markdown inline links: [text](target). Skips images, anchors, and absolute URLs.
const relativeLinkPattern = /\]\((?!https?:\/\/|#|mailto:)([^)\s]+)\)/g;

function checkContract(contractPath, expectedFileKey, requireFigmaLink) {
  if (checkedContracts.has(contractPath)) return;
  checkedContracts.add(contractPath);

  const absolute = path.join(repositoryRoot, contractPath);
  if (!fs.existsSync(absolute)) {
    errors.push(`${contractPath}: referenced by a mapping but missing on disk`);
    return;
  }
  if (!contractPath.endsWith(".md")) return;
  const text = fs.readFileSync(absolute, "utf8");

  const figmaLinks = [...text.matchAll(figmaLinkPattern)];
  if (requireFigmaLink && figmaLinks.length === 0) {
    errors.push(`${contractPath}: no Figma deep link (every contract must link its measured node)`);
  }
  for (const match of figmaLinks) {
    if (expectedFileKey && match[1] !== expectedFileKey) {
      errors.push(
        `${contractPath}: Figma link uses file key ${match[1]}, expected ${expectedFileKey}`,
      );
    }
  }

  for (const match of text.matchAll(relativeLinkPattern)) {
    const target = match[1].split("#")[0];
    if (!target) continue;
    const resolved = path.resolve(path.dirname(absolute), target);
    if (!resolved.startsWith(repositoryRoot)) continue;
    if (!fs.existsSync(resolved)) {
      errors.push(`${contractPath}: dead relative link -> ${match[1]}`);
    }
  }
}

// Portal mappings: contract must exist AND carry a Figma link with the portal's file key.
for (const portalDir of fs.readdirSync(path.join(repositoryRoot, "portals"))) {
  const mappingPath = path.join(
    repositoryRoot,
    "portals",
    portalDir,
    "components",
    "component-mapping.json",
  );
  if (!fs.existsSync(mappingPath)) continue;
  const mapping = readJson(mappingPath);
  for (const component of mapping.components ?? []) {
    checkContract(component.contractPath, mapping.figmaFileKey, true);
  }
}

// Root index: existence + key correctness; patterns are not required to carry a
// Figma link (some are composition docs), so requireFigmaLink=false for extras.
const rootPath = path.join(repositoryRoot, "components", "component-mapping.json");
if (fs.existsSync(rootPath)) {
  const root = readJson(rootPath);
  const fileKey = root.$metadata?.figmaFileKey;
  for (const section of root.sections ?? []) {
    for (const contractPath of section.contractPaths ?? []) {
      checkContract(contractPath, fileKey, false);
    }
  }
}

console.log(
  JSON.stringify(
    { checkedContracts: checkedContracts.size, errors },
    null,
    2,
  ),
);

if (errors.length > 0) {
  console.error(errors.map((e) => `LINK ERROR: ${e}`).join("\n"));
  process.exit(1);
}
console.log(`Validated links in ${checkedContracts.size} contract files.`);
