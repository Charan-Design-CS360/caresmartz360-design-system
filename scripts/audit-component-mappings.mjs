import fs from "node:fs";
import path from "node:path";
import {
  listPortalManifests,
  readJson,
  relative,
  repositoryRoot,
} from "./portal-validation-lib.mjs";

const strict = process.env.DS_REQUIRE_COMPONENT_MAPPINGS === "true";
const config = readJson(
  path.join(repositoryRoot, "config", "component-mapping-sources.json"),
);
const componentKeyPattern = /^[a-f0-9]{40}$/;
const nodeIdPattern = /^[0-9]+:[0-9]+$/;
const roundPlaceholderPattern = /^1:[1-9][0-9]*00$/;
const jiraPattern = /^C360-[0-9]+$/;
const placeholderPattern = /verify|not yet checked|placeholder|fabricated/i;
const maturityValues = new Set([
  "discovered",
  "draft",
  "reviewed",
  "pilot",
  "stable",
  "deprecated",
]);
const reports = [];
const strictErrors = [];

function auditLegacy(file) {
  const filePath = path.join(repositoryRoot, file);
  if (!fs.existsSync(filePath)) return;

  const document = readJson(filePath);
  const entries = Object.entries(document.components ?? {});
  let placeholderNodeIds = 0;
  let placeholderTextRecords = 0;

  for (const [, component] of entries) {
    if (roundPlaceholderPattern.test(component.figmaNodeId ?? "")) {
      placeholderNodeIds += 1;
    }
    if (placeholderPattern.test(JSON.stringify(component))) {
      placeholderTextRecords += 1;
    }
  }

  reports.push({
    file,
    format: "legacy-unscoped",
    componentCount: entries.length,
    placeholderNodeIds,
    placeholderTextRecords,
    releaseEligible: false,
  });

  strictErrors.push(
    `${file}: legacy unscoped mapping cannot satisfy portal release readiness.`,
  );
  if (placeholderNodeIds > 0) {
    strictErrors.push(
      `${file}: ${placeholderNodeIds} placeholder node IDs remain.`,
    );
  }
}

function auditPortal(manifest, filePath) {
  const document = readJson(filePath);
  const errors = [];
  const seenKeys = new Set();
  const seenNodes = new Set();
  const components = document.components ?? [];

  if (document.schemaVersion !== "1.0.0") {
    errors.push("unsupported schemaVersion");
  }
  if (document.portal !== manifest.portal) {
    errors.push("portal does not match directory manifest");
  }
  if (document.figmaFileKey !== manifest.figma?.fileKey) {
    errors.push("Figma file key does not match portal manifest");
  }
  if (!Array.isArray(components)) {
    errors.push("components must be an array");
  }

  for (const [index, component] of components.entries()) {
    const label = component.name || `component[${index}]`;
    if (!componentKeyPattern.test(component.componentKey ?? "")) {
      errors.push(`${label}: invalid componentKey`);
    }
    if (!nodeIdPattern.test(component.nodeId ?? "")) {
      errors.push(`${label}: invalid nodeId`);
    }
    if (roundPlaceholderPattern.test(component.nodeId ?? "")) {
      errors.push(`${label}: placeholder nodeId`);
    }
    if (seenKeys.has(component.componentKey)) {
      errors.push(`${label}: duplicate componentKey`);
    }
    if (seenNodes.has(component.nodeId)) {
      errors.push(`${label}: duplicate nodeId`);
    }
    seenKeys.add(component.componentKey);
    seenNodes.add(component.nodeId);

    if (!maturityValues.has(component.maturity)) {
      errors.push(`${label}: invalid maturity`);
    }
    if (!jiraPattern.test(component.jiraIssue ?? "")) {
      errors.push(`${label}: invalid Jira evidence key`);
    }
    if (
      !Array.isArray(component.semanticDependencies) ||
      component.semanticDependencies.some(
        (dependency) =>
          dependency.includes("portals/") &&
          !dependency.startsWith(`portals/${manifest.portal}/`),
      )
    ) {
      errors.push(`${label}: cross-portal or invalid semantic dependency`);
    }
    if (
      component.contractPath !==
        `portals/${manifest.portal}/components/${component.name}` &&
      !component.contractPath?.startsWith(
        `portals/${manifest.portal}/components/`,
      )
    ) {
      errors.push(`${label}: contractPath is outside its portal`);
    }
    if (placeholderPattern.test(JSON.stringify(component))) {
      errors.push(`${label}: placeholder text remains`);
    }
  }

  reports.push({
    file: relative(filePath),
    format: "portal-v1",
    portal: manifest.portal,
    componentCount: components.length,
    errors,
    releaseEligible: errors.length === 0 && components.length > 0,
  });

  for (const error of errors) {
    strictErrors.push(`${relative(filePath)}: ${error}.`);
  }
}

for (const file of config.legacyFiles ?? []) auditLegacy(file);

for (const manifestPath of listPortalManifests()) {
  const manifest = readJson(manifestPath);
  const mappingPath = path.join(
    repositoryRoot,
    "portals",
    manifest.portal,
    "components",
    config.portalFileName,
  );
  const required = config.requiredForStatuses.includes(manifest.status);

  if (!fs.existsSync(mappingPath)) {
    reports.push({
      file: relative(mappingPath),
      format: "portal-v1",
      portal: manifest.portal,
      status: "missing",
      releaseEligible: false,
    });
    if (strict && required) {
      strictErrors.push(
        `${manifest.portal}: component mapping required for ${manifest.status}.`,
      );
    }
    continue;
  }

  auditPortal(manifest, mappingPath);
}

console.log(JSON.stringify({ strict, reports }, null, 2));

if (strict && strictErrors.length > 0) {
  console.error(strictErrors.join("\n"));
  process.exit(1);
}

for (const error of strictErrors) console.warn(`NOTICE: ${error}`);
