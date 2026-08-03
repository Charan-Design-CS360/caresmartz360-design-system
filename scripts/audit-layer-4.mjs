import fs from "node:fs";
import path from "node:path";
import {
  listPortalManifests,
  readJson,
  relative,
  repositoryRoot,
} from "./portal-validation-lib.mjs";

const strict = process.env.DS_REQUIRE_LAYER_4 === "true";
const config = readJson(
  path.join(repositoryRoot, "config", "layer-4-sources.json"),
);
const keyPattern = /^[a-f0-9]{40}$/;
const nodePattern = /^[0-9]+:[0-9]+$/;
const jiraPattern = /^C360-[0-9]+$/;
const idPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
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

function nonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function validateItem(item, kind, manifest, seenIds) {
  const errors = [];
  const label = `${kind} "${item.name ?? item.id ?? "unknown"}"`;

  if (!idPattern.test(item.id ?? "")) errors.push(`${label}: invalid ID`);
  if (seenIds.has(item.id)) errors.push(`${label}: duplicate ID`);
  seenIds.add(item.id);

  if (!nonEmptyString(item.name)) errors.push(`${label}: name required`);
  if (!nonEmptyString(item.owner)) errors.push(`${label}: owner required`);
  if (!maturityValues.has(item.maturity)) {
    errors.push(`${label}: invalid maturity`);
  }
  if (!keyPattern.test(item.figmaKey ?? "")) {
    errors.push(`${label}: invalid Figma key`);
  }
  if (!nodePattern.test(item.nodeId ?? "")) {
    errors.push(`${label}: invalid node ID`);
  }
  if (!nonEmptyString(item.userGoal)) {
    errors.push(`${label}: user goal required`);
  }

  for (const field of [
    "whenToUse",
    "whenNotToUse",
    "componentDependencies",
    "semanticDependencies",
    "states",
    "contentRules",
  ]) {
    if (!Array.isArray(item[field]) || item[field].length === 0) {
      errors.push(`${label}: ${field} must not be empty`);
    }
  }

  const portalPrefix = `portals/${manifest.portal}/`;
  for (const dependency of [
    ...(item.componentDependencies ?? []),
    ...(item.semanticDependencies ?? []),
  ]) {
    if (
      dependency.includes("portals/") &&
      !dependency.startsWith(portalPrefix)
    ) {
      errors.push(`${label}: cross-portal dependency "${dependency}"`);
    }
  }

  if (!nonEmptyString(item.responsiveBehavior)) {
    errors.push(`${label}: responsive behavior required`);
  }
  if (!nonEmptyString(item.successSignal)) {
    errors.push(`${label}: success signal required`);
  }

  for (const field of ["keyboard", "screenReader", "focus", "touch"]) {
    if (!nonEmptyString(item.accessibility?.[field])) {
      errors.push(`${label}: accessibility.${field} required`);
    }
  }

  if (!jiraPattern.test(item.evidence?.jiraIssue ?? "")) {
    errors.push(`${label}: Jira evidence required`);
  }
  if (!nonEmptyString(item.evidence?.snapshotRef)) {
    errors.push(`${label}: snapshot evidence required`);
  }

  const usedInFlows = item.evidence?.usedInFlows;
  if (!Array.isArray(usedInFlows)) {
    errors.push(`${label}: usedInFlows must be an array`);
  }
  if (
    item.maturity === "pilot" &&
    (!Array.isArray(usedInFlows) || usedInFlows.length < 1)
  ) {
    errors.push(`${label}: Pilot requires at least one real flow`);
  }
  if (
    item.maturity === "stable" &&
    (!Array.isArray(usedInFlows) ||
      (usedInFlows.length < config.stableMinimumFlows &&
        !jiraPattern.test(item.evidence?.singleFlowException ?? "")))
  ) {
    errors.push(
      `${label}: Stable requires ${config.stableMinimumFlows} flows or a Jira exception`,
    );
  }

  return errors;
}

for (const manifestPath of listPortalManifests()) {
  const manifest = readJson(manifestPath);
  const filePath = path.join(
    repositoryRoot,
    "portals",
    manifest.portal,
    config.fileName,
  );
  const required = config.requiredForStatuses.includes(manifest.status);

  if (!fs.existsSync(filePath)) {
    reports.push({
      portal: manifest.portal,
      file: relative(filePath),
      status: "missing",
      patternCount: 0,
      templateCount: 0,
      releaseEligible: false,
    });
    if (strict && required) {
      strictErrors.push(
        `${manifest.portal}: Layer-4 index required for ${manifest.status}.`,
      );
    }
    continue;
  }

  const document = readJson(filePath);
  const errors = [];
  const seenIds = new Set();
  if (document.schemaVersion !== "1.0.0") {
    errors.push("unsupported schemaVersion");
  }
  if (document.portal !== manifest.portal) {
    errors.push("portal does not match manifest");
  }
  if (document.figmaFileKey !== manifest.figma?.fileKey) {
    errors.push("Figma file key does not match manifest");
  }
  if (!Array.isArray(document.patterns) || !Array.isArray(document.templates)) {
    errors.push("patterns and templates must be arrays");
  }

  for (const item of document.patterns ?? []) {
    errors.push(...validateItem(item, "Pattern", manifest, seenIds));
  }
  for (const item of document.templates ?? []) {
    errors.push(...validateItem(item, "Template", manifest, seenIds));
  }

  reports.push({
    portal: manifest.portal,
    file: relative(filePath),
    status: "audited",
    patternCount: document.patterns?.length ?? 0,
    templateCount: document.templates?.length ?? 0,
    errors,
    releaseEligible:
      errors.length === 0 &&
      (document.patterns?.length ?? 0) + (document.templates?.length ?? 0) > 0,
  });

  for (const error of errors) {
    strictErrors.push(`${relative(filePath)}: ${error}.`);
  }
}

console.log(JSON.stringify({ strict, reports }, null, 2));

if (strict && strictErrors.length > 0) {
  console.error(strictErrors.join("\n"));
  process.exit(1);
}

for (const error of strictErrors) console.warn(`NOTICE: ${error}`);
