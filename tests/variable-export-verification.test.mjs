import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";
import { fileURLToPath } from "node:url";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const script = path.join(repositoryRoot, "scripts", "verify-owner-variable-exports.mjs");
const missingSource = path.join(os.tmpdir(), "design-system-authority-intentionally-absent");

const run = (root = repositoryRoot, extraEnv = {}) =>
  spawnSync(process.execPath, [script], {
    encoding: "utf8",
    env: {
      ...process.env,
      DS_REPOSITORY_ROOT: root,
      DS_VARIABLE_SOURCE_DIR: missingSource,
      ...extraEnv,
    },
  });

test("manifest-only mode verifies committed artifacts when local authority is unavailable", () => {
  const result = run();
  assert.equal(result.status, 0, result.stderr);
  assert.equal(JSON.parse(result.stdout).verificationMode, "manifest-only");
  assert.match(result.stderr, /local authority folder unavailable/i);
});

test("local authority can be required explicitly", () => {
  const result = run(repositoryRoot, { DS_REQUIRE_LOCAL_AUTHORITY: "true" });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /local variable authority is required/i);
});

test("manifest-only mode rejects a changed repository artifact", () => {
  const fixture = fs.mkdtempSync(path.join(os.tmpdir(), "ds-variable-verifier-"));
  const manifest = JSON.parse(
    fs.readFileSync(path.join(repositoryRoot, "config", "variable-export-manifest.json"), "utf8"),
  );
  const artifact = manifest.artifacts[0];
  fs.mkdirSync(path.join(fixture, "config"), { recursive: true });
  fs.mkdirSync(path.dirname(path.join(fixture, artifact.repositoryPath)), { recursive: true });
  fs.writeFileSync(
    path.join(fixture, "config", "variable-export-manifest.json"),
    JSON.stringify({ ...manifest, artifacts: [artifact] }),
  );
  fs.writeFileSync(path.join(fixture, artifact.repositoryPath), "{}\n");

  const result = run(fixture);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /manifest hash mismatch/i);
});
