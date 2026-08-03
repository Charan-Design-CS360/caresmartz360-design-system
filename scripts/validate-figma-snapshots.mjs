import fs from "node:fs";
import path from "node:path";
import {
  listPortalManifests,
  readJson,
  relative,
  repositoryRoot,
} from "./portal-validation-lib.mjs";

const sha256Pattern = /^[a-f0-9]{64}$/;
const jiraPattern = /^C360-[0-9]+$/;
const strict = process.env.DS_REQUIRE_FRESH_SNAPSHOTS === "true";
const now = process.env.DS_VALIDATION_NOW
  ? new Date(process.env.DS_VALIDATION_NOW)
  : new Date();
const errors = [];
const notices = [];
let validatedSnapshots = 0;

if (Number.isNaN(now.getTime())) {
  console.error("DS_VALIDATION_NOW must be an ISO date-time.");
  process.exit(1);
}

for (const manifestPath of listPortalManifests()) {
  const manifest = readJson(manifestPath);
  const snapshotPath = path.join(
    repositoryRoot,
    "snapshots",
    manifest.portal,
    "figma-snapshot.json",
  );
  const required =
    manifest.snapshotPolicy?.requiredForStatuses?.includes(manifest.status) ??
    false;

  if (!fs.existsSync(snapshotPath)) {
    const message = `${manifest.portal}: no attested Figma snapshot found.`;
    if (strict && required) errors.push(message);
    else notices.push(message);
    continue;
  }

  let snapshot;
  try {
    snapshot = readJson(snapshotPath);
  } catch (error) {
    errors.push(`${relative(snapshotPath)}: invalid JSON (${error.message})`);
    continue;
  }

  validatedSnapshots += 1;

  if (snapshot.schemaVersion !== "1.0.0") {
    errors.push(`${relative(snapshotPath)}: unsupported schemaVersion.`);
  }

  if (snapshot.portal !== manifest.portal) {
    errors.push(`${relative(snapshotPath)}: portal does not match manifest.`);
  }

  if (snapshot.figma?.fileKey !== manifest.figma?.fileKey) {
    errors.push(`${relative(snapshotPath)}: Figma file key does not match manifest.`);
  }

  if (
    snapshot.figma?.exportedBy !== "Figma AI" ||
    snapshot.figma?.sourceAuthority !== "figma"
  ) {
    errors.push(`${relative(snapshotPath)}: Figma authority fields are invalid.`);
  }

  const exportedAt = new Date(snapshot.figma?.exportedAt);
  if (Number.isNaN(exportedAt.getTime())) {
    errors.push(`${relative(snapshotPath)}: exportedAt is not a valid date-time.`);
  } else {
    const ageMilliseconds = now.getTime() - exportedAt.getTime();
    const ageDays = ageMilliseconds / 86_400_000;
    const maxAgeDays = manifest.snapshotPolicy?.maxAgeDays;

    if (ageMilliseconds < -300_000) {
      errors.push(`${relative(snapshotPath)}: exportedAt is in the future.`);
    } else if (ageDays > maxAgeDays) {
      const message =
        `${manifest.portal}: snapshot is stale (${Math.floor(ageDays)} days; maximum ${maxAgeDays}).`;
      if (strict && required) errors.push(message);
      else notices.push(message);
    }
  }

  if (
    !Array.isArray(snapshot.inventory?.collections) ||
    !Array.isArray(snapshot.inventory?.components)
  ) {
    errors.push(`${relative(snapshotPath)}: inventory arrays are required.`);
  }

  if (
    snapshot.checksums?.algorithm !== "sha256" ||
    !sha256Pattern.test(snapshot.checksums?.tokens ?? "") ||
    !sha256Pattern.test(snapshot.checksums?.components ?? "")
  ) {
    errors.push(`${relative(snapshotPath)}: SHA-256 checksums are invalid.`);
  }

  if (
    snapshot.attestation?.status !== "attested" ||
    snapshot.attestation?.attestedBy !== "Figma AI" ||
    !snapshot.attestation?.statement ||
    !jiraPattern.test(snapshot.attestation?.jiraIssue ?? "")
  ) {
    errors.push(`${relative(snapshotPath)}: Figma AI attestation is invalid.`);
  }
}

for (const notice of notices) console.warn(`NOTICE: ${notice}`);

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Validated ${validatedSnapshots} attested Figma snapshots.`);
