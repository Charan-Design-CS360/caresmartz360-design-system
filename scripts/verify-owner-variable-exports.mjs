import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceRoot = path.resolve(
  process.env.DS_VARIABLE_SOURCE_DIR ?? "/Users/netsmartz/Documents/Variables",
);
const manifest = JSON.parse(
  fs.readFileSync(path.join(root, "config", "variable-export-manifest.json"), "utf8"),
);
const errors = [];
const report = [];
const hash = (bytes) => crypto.createHash("sha256").update(bytes).digest("hex");

for (const artifact of manifest.artifacts) {
  const archive = path.join(sourceRoot, artifact.sourceArchive);
  const destination = path.join(root, artifact.repositoryPath);
  if (!fs.existsSync(archive) || !fs.existsSync(destination)) {
    errors.push(`Missing source or repository artifact: ${artifact.repositoryPath}`);
    continue;
  }
  const source = execFileSync("unzip", ["-p", archive, artifact.sourceMember], {
    encoding: null,
    maxBuffer: 10 * 1024 * 1024,
  });
  const repository = fs.readFileSync(destination);
  const matches = source.equals(repository);
  const sourceSha256 = hash(source);
  const repositorySha256 = hash(repository);
  report.push({ path: artifact.repositoryPath, matches, sourceSha256, repositorySha256 });
  if (!matches || sourceSha256 !== artifact.sha256) {
    errors.push(`Authority mismatch: ${artifact.repositoryPath}`);
  }
}

console.log(JSON.stringify({ sourceRoot, report }, null, 2));
if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
