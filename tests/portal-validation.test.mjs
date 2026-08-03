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

function run(script, fixtureRoot) {
  return spawnSync(process.execPath, [script], {
    cwd: repositoryRoot,
    encoding: "utf8",
    env: {
      ...process.env,
      DS_REPOSITORY_ROOT: fixtureRoot,
    },
  });
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
