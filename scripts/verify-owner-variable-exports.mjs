import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(
  process.env.DS_REPOSITORY_ROOT ?? path.join(path.dirname(fileURLToPath(import.meta.url)), ".."),
);
const sourceRoot = path.resolve(
  process.env.DS_VARIABLE_SOURCE_DIR ?? "/Users/netsmartz/Documents/Variables",
);
const manifest = JSON.parse(
  fs.readFileSync(path.join(root, "config", "variable-export-manifest.json"), "utf8"),
);
const errors = [];
const report = [];
const hash = (bytes) => crypto.createHash("sha256").update(bytes).digest("hex");
const sourceAvailable = fs.existsSync(sourceRoot);
const requireLocalAuthority = process.env.DS_REQUIRE_LOCAL_AUTHORITY === "true";
const countDefinitions = (value) => {
  if (!value || typeof value !== "object") return 0;
  if (Object.hasOwn(value, "$value")) return 1;
  return Object.values(value).reduce((total, child) => total + countDefinitions(child), 0);
};

if (!sourceAvailable && requireLocalAuthority) {
  errors.push(`Local variable authority is required but unavailable: ${sourceRoot}`);
}

for (const artifact of manifest.artifacts) {
  const archive = path.join(sourceRoot, artifact.sourceArchive);
  const destination = path.join(root, artifact.repositoryPath);
  if (!fs.existsSync(destination)) {
    errors.push(`Missing repository artifact: ${artifact.repositoryPath}`);
    continue;
  }
  const repository = fs.readFileSync(destination);
  const repositorySha256 = hash(repository);
  let tokenDefinitions;
  try {
    tokenDefinitions = countDefinitions(JSON.parse(repository.toString("utf8")));
  } catch (error) {
    errors.push(`Invalid JSON: ${artifact.repositoryPath} (${error.message})`);
  }
  if (repositorySha256 !== artifact.sha256) {
    errors.push(`Manifest hash mismatch: ${artifact.repositoryPath}`);
  }
  if (tokenDefinitions !== undefined && tokenDefinitions !== artifact.tokenDefinitions) {
    errors.push(`Token count mismatch: ${artifact.repositoryPath}`);
  }

  const item = {
    path: artifact.repositoryPath,
    repositorySha256,
    tokenDefinitions,
    manifestVerified:
      repositorySha256 === artifact.sha256 && tokenDefinitions === artifact.tokenDefinitions,
    localAuthorityChecked: false,
  };

  if (sourceAvailable) {
    if (!fs.existsSync(archive)) {
      errors.push(`Missing authority archive: ${artifact.sourceArchive}`);
    } else {
      const archiveSha256 = hash(fs.readFileSync(archive));
      if (archiveSha256 !== artifact.sourceArchiveSha256) {
        errors.push(`Authority archive hash mismatch: ${artifact.sourceArchive}`);
      }
      try {
        const source = execFileSync("unzip", ["-p", archive, artifact.sourceMember], {
          encoding: null,
          maxBuffer: 10 * 1024 * 1024,
        });
        item.localAuthorityChecked = true;
        item.sourceSha256 = hash(source);
        item.byteExact = source.equals(repository);
        if (!item.byteExact || item.sourceSha256 !== artifact.sha256) {
          errors.push(`Authority mismatch: ${artifact.repositoryPath}`);
        }
      } catch (error) {
        errors.push(`Cannot read authority member: ${artifact.sourceArchive} :: ${artifact.sourceMember}`);
      }
    }
  }
  report.push(item);
}

if (!sourceAvailable) {
  console.error(
    `NOTICE: Local authority folder unavailable at ${sourceRoot}; validated committed artifacts against the locked manifest only.`,
  );
}
console.log(
  JSON.stringify(
    {
      verificationMode: sourceAvailable ? "authority-and-manifest" : "manifest-only",
      sourceRoot,
      localAuthorityChecked: sourceAvailable,
      report,
    },
    null,
    2,
  ),
);
if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
