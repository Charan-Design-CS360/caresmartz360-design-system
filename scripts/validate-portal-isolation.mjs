import fs from "node:fs";
import path from "node:path";
import {
  listPortalManifests,
  portalRoot,
  readJson,
  relative,
  walk,
} from "./portal-validation-lib.mjs";

const scannableExtensions = new Set([
  ".css",
  ".js",
  ".json",
  ".jsx",
  ".mjs",
  ".scss",
  ".ts",
  ".tsx",
]);

const ignoredFiles = new Set(["portal-manifest.json"]);
const errors = [];
let scannedFiles = 0;

for (const manifestPath of listPortalManifests()) {
  const manifest = readJson(manifestPath);
  const portalDirectory = path.join(portalRoot, manifest.portal);
  const forbidden = manifest.forbiddenDependencies ?? [];

  for (const filePath of walk(portalDirectory)) {
    if (
      ignoredFiles.has(path.basename(filePath)) ||
      !scannableExtensions.has(path.extname(filePath))
    ) {
      continue;
    }

    scannedFiles += 1;
    const content = fs.readFileSync(filePath, "utf8");

    for (const dependency of forbidden) {
      const importForms = [
        dependency,
        dependency.replace(/^portals\//, ""),
        `../${dependency.replace(/^portals\//, "")}`,
      ];

      if (importForms.some((candidate) => content.includes(candidate))) {
        errors.push(
          `${relative(filePath)}: "${manifest.portal}" references forbidden portal dependency "${dependency}".`,
        );
      }
    }
  }
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Portal isolation passed for ${scannedFiles} delivery files.`);
