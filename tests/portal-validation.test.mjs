import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";
import { fileURLToPath } from "node:url";

const repositoryRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);

const manifestValidator = path.join(
  repositoryRoot,
  "scripts/validate-portal-manifests.mjs",
);

const isolationValidator = path.join(
  repositoryRoot,
  "scripts/validate-portal-isolation.mjs",
);

const snapshotValidator = path.join(
  repositoryRoot,
  "scripts/validate-figma-snapshots.mjs",
);

function makeFixture() {
  const fixtureRoot = fs.mkdtempSync(
    path.join(os.tmpdir(), "caresmartz-ds-validation-"),
  );

  for (const portal of ["agency", "caregiver"]) {
    for (const layer of [
      "semantics",
      "components",
      "patterns",
      "templates",
    ]) {
      fs.mkdirSync(path.join(fixtureRoot, "portals", portal, layer), {
        recursive: true,
      });
    }

    const otherPortal = portal === "agency" ? "caregiver" : "agency";
    fs.writeFileSync(
      path.join(fixtureRoot, "portals", portal, "portal-manifest.json"),
      JSON.stringify(
        {
          portal,
          status: "active-audit",
          figma: {
            fileKey: `${portal}-file`,
            semanticJira: "C360-1",
            componentJira: "C360-2",
            patternJira: null,
          },
          layers: {
            semantics: `portals/${portal}/semantics`,
            components: `portals/${portal}/components`,
            patterns: `portals/${portal}/patterns`,
            templates: `portals/${portal}/templates`,
          },
          allowedDependencies: ["shared/primitives", `portals/${portal}`],
          forbiddenDependencies: [`portals/${otherPortal}`],
          snapshotPolicy: {
            requiredForStatuses: ["pilot", "stable"],
            maxAgeDays: 30,
          },
        },
        null,
        2,
      ),
    );
  }

  fs.mkdirSync(path.join(fixtureRoot, "shared", "primitives"), {
    recursive: true,
  });

  return fixtureRoot;
}

function run(script, fixtureRoot, extraEnvironment = {}) {
  return spawnSync(process.execPath, [script], {
    cwd: repositoryRoot,
    encoding: "utf8",
    env: {
      ...process.env,
      DS_REPOSITORY_ROOT: fixtureRoot,
      ...extraEnvironment,
    },
  });
}

function writeSnapshot(fixtureRoot, portal, exportedAt = "2026-08-01T00:00:00Z") {
  const snapshotDirectory = path.join(fixtureRoot, "snapshots", portal);
  fs.mkdirSync(snapshotDirectory, { recursive: true });
  fs.writeFileSync(
    path.join(snapshotDirectory, "figma-snapshot.json"),
    JSON.stringify(
      {
        schemaVersion: "1.0.0",
        portal,
        figma: {
          fileKey: `${portal}-file`,
          libraryKey: `${portal}-library`,
          exportedAt,
          exportedBy: "Figma AI",
          sourceAuthority: "figma",
        },
        inventory: {
          collections: [
            {
              name: "Semantic",
              key: `${portal}-semantic`,
              modes: ["Default"],
              variableCount: 1,
            },
          ],
          components: [
            {
              name: "Button",
              componentKey: `${portal}-button`,
              nodeId: "1:2",
            },
          ],
        },
        checksums: {
          algorithm: "sha256",
          tokens: "a".repeat(64),
          components: "b".repeat(64),
        },
        attestation: {
          status: "attested",
          attestedBy: "Figma AI",
          statement: "This snapshot represents the exported Figma state.",
          jiraIssue: "C360-44574",
        },
      },
      null,
      2,
    ),
  );
}

test("accepts complete portal manifests", () => {
  const fixtureRoot = makeFixture();
  const result = run(manifestValidator, fixtureRoot);

  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /Validated 2 portal manifests/);
});

test("rejects a cross-portal allowed dependency", () => {
  const fixtureRoot = makeFixture();
  const manifestPath = path.join(
    fixtureRoot,
    "portals",
    "agency",
    "portal-manifest.json",
  );
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  manifest.allowedDependencies.push("portals/caregiver");
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

  const result = run(manifestValidator, fixtureRoot);

  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /cross-portal allowed dependency/);
});

test("rejects a delivery file that references another portal", () => {
  const fixtureRoot = makeFixture();
  fs.writeFileSync(
    path.join(
      fixtureRoot,
      "portals",
      "agency",
      "components",
      "invalid.ts",
    ),
    'import "portals/caregiver/components/button";\n',
  );

  const result = run(isolationValidator, fixtureRoot);

  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /references forbidden portal dependency/);
});

test("accepts own-portal and shared-primitive references", () => {
  const fixtureRoot = makeFixture();
  fs.writeFileSync(
    path.join(
      fixtureRoot,
      "portals",
      "agency",
      "components",
      "valid.ts",
    ),
    [
      'import "shared/primitives/colors";',
      'import "portals/agency/semantics/action";',
      "",
    ].join("\n"),
  );

  const result = run(isolationValidator, fixtureRoot);

  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /Portal isolation passed/);
});

test("accepts a fresh Figma-AI-attested snapshot", () => {
  const fixtureRoot = makeFixture();
  writeSnapshot(fixtureRoot, "agency");

  const result = run(snapshotValidator, fixtureRoot, {
    DS_VALIDATION_NOW: "2026-08-03T00:00:00Z",
  });

  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /Validated 1 attested Figma snapshots/);
});

test("rejects a snapshot whose file key does not match the portal manifest", () => {
  const fixtureRoot = makeFixture();
  writeSnapshot(fixtureRoot, "agency");
  const snapshotPath = path.join(
    fixtureRoot,
    "snapshots",
    "agency",
    "figma-snapshot.json",
  );
  const snapshot = JSON.parse(fs.readFileSync(snapshotPath, "utf8"));
  snapshot.figma.fileKey = "wrong-file";
  fs.writeFileSync(snapshotPath, JSON.stringify(snapshot, null, 2));

  const result = run(snapshotValidator, fixtureRoot, {
    DS_VALIDATION_NOW: "2026-08-03T00:00:00Z",
  });

  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Figma file key does not match manifest/);
});

test("reports an old snapshot but keeps historical evidence readable", () => {
  const fixtureRoot = makeFixture();
  writeSnapshot(fixtureRoot, "agency", "2026-01-01T00:00:00Z");

  const result = run(snapshotValidator, fixtureRoot, {
    DS_VALIDATION_NOW: "2026-08-03T00:00:00Z",
  });

  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stderr, /NOTICE: agency: snapshot is stale/);
});

test("blocks a release when a required snapshot is stale", () => {
  const fixtureRoot = makeFixture();
  const manifestPath = path.join(
    fixtureRoot,
    "portals",
    "agency",
    "portal-manifest.json",
  );
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  manifest.status = "stable";
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  writeSnapshot(fixtureRoot, "agency", "2026-01-01T00:00:00Z");

  const result = run(snapshotValidator, fixtureRoot, {
    DS_REQUIRE_FRESH_SNAPSHOTS: "true",
    DS_VALIDATION_NOW: "2026-08-03T00:00:00Z",
  });

  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /snapshot is stale/);
});
