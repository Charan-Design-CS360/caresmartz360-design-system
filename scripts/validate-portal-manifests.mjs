import fs from "node:fs";
import path from "node:path";
import {
  listPortalManifests,
  readJson,
  relative,
  repositoryRoot,
} from "./portal-validation-lib.mjs";

const allowedStatuses = new Set([
  "awaiting-source-registration",
  "active-audit",
  "pilot",
  "stable",
  "deprecated",
]);

const requiredFigmaFields = [
  "fileKey",
  "semanticJira",
  "componentJira",
  "patternJira",
];

const requiredLayers = ["semantics", "components", "patterns", "templates"];
const errors = [];
const manifests = listPortalManifests();
const portalNames = new Set();

if (manifests.length === 0) {
  errors.push("No portal manifests found.");
}

for (const manifestPath of manifests) {
  let manifest;
  try {
    manifest = readJson(manifestPath);
  } catch (error) {
    errors.push(`${relative(manifestPath)}: invalid JSON (${error.message})`);
    continue;
  }

  const portal = manifest.portal;
  const portalDirectory = path.basename(path.dirname(manifestPath));

  if (!portal || portal !== portalDirectory) {
    errors.push(
      `${relative(manifestPath)}: portal must match directory "${portalDirectory}".`,
    );
  }

  if (portalNames.has(portal)) {
    errors.push(`${relative(manifestPath)}: duplicate portal "${portal}".`);
  }
  portalNames.add(portal);

  if (!allowedStatuses.has(manifest.status)) {
    errors.push(`${relative(manifestPath)}: unsupported status "${manifest.status}".`);
  }

  for (const field of requiredFigmaFields) {
    if (!Object.hasOwn(manifest.figma ?? {}, field)) {
      errors.push(`${relative(manifestPath)}: missing figma.${field}.`);
    }
  }

  for (const layer of requiredLayers) {
    const layerPath = manifest.layers?.[layer];
    const expected = `portals/${portal}/${layer}`;
    if (layerPath !== expected) {
      errors.push(
        `${relative(manifestPath)}: layers.${layer} must equal "${expected}".`,
      );
      continue;
    }

    if (!fs.existsSync(path.join(repositoryRoot, layerPath))) {
      errors.push(`${relative(manifestPath)}: missing directory "${layerPath}".`);
    }
  }

  const allowed = new Set(manifest.allowedDependencies ?? []);
  if (!allowed.has("shared/primitives") || !allowed.has(`portals/${portal}`)) {
    errors.push(
      `${relative(manifestPath)}: allowedDependencies must contain shared/primitives and its own portal.`,
    );
  }

  for (const dependency of allowed) {
    if (
      dependency.startsWith("portals/") &&
      dependency !== `portals/${portal}`
    ) {
      errors.push(
        `${relative(manifestPath)}: cross-portal allowed dependency "${dependency}".`,
      );
    }
  }

  const snapshotPolicy = manifest.snapshotPolicy;
  if (
    !snapshotPolicy ||
    !Array.isArray(snapshotPolicy.requiredForStatuses) ||
    !Number.isInteger(snapshotPolicy.maxAgeDays) ||
    snapshotPolicy.maxAgeDays < 1
  ) {
    errors.push(
      `${relative(manifestPath)}: invalid or missing snapshotPolicy.`,
    );
  }

  if (manifest.status === "awaiting-source-registration") {
    const registered = requiredFigmaFields.some(
      (field) => manifest.figma?.[field] !== null,
    );
    if (registered) {
      errors.push(
        `${relative(manifestPath)}: awaiting-source-registration requires null Figma/Jira sources.`,
      );
    }
  }
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Validated ${manifests.length} portal manifests.`);
