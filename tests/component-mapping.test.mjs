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
const auditScript = path.join(
  repositoryRoot,
  "scripts",
  "audit-component-mappings.mjs",
);

function makeFixture(status = "active-audit") {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "caresmartz-components-"));
  fs.mkdirSync(path.join(root, "config"), { recursive: true });
  fs.mkdirSync(path.join(root, "portals", "agency", "components"), {
    recursive: true,
  });
  fs.writeFileSync(
    path.join(root, "config", "component-mapping-sources.json"),
    JSON.stringify(
      {
        legacyFiles: [],
        portalFileName: "component-mapping.json",
        requiredForStatuses: ["pilot", "stable"],
      },
      null,
      2,
    ),
  );
  fs.writeFileSync(
    path.join(root, "portals", "agency", "portal-manifest.json"),
    JSON.stringify(
      {
        portal: "agency",
        status,
        figma: { fileKey: "agency-file" },
      },
      null,
      2,
    ),
  );
  return root;
}

function validMapping() {
  return {
    schemaVersion: "1.0.0",
    portal: "agency",
    figmaFileKey: "agency-file",
    components: [
      {
        name: "button",
        componentKey: "a".repeat(40),
        nodeId: "5703:7087",
        maturity: "reviewed",
        semanticDependencies: ["portals/agency/semantics/action"],
        contractPath: "portals/agency/components/button",
        jiraIssue: "C360-44256",
        snapshotRef: "snapshots/agency/figma-snapshot.json@abc123",
      },
    ],
  };
}

function writeMapping(root, mapping) {
  fs.writeFileSync(
    path.join(
      root,
      "portals",
      "agency",
      "components",
      "component-mapping.json",
    ),
    JSON.stringify(mapping, null, 2),
  );
}

function run(root, strict = true) {
  return spawnSync(process.execPath, [auditScript], {
    cwd: repositoryRoot,
    encoding: "utf8",
    env: {
      ...process.env,
      DS_REPOSITORY_ROOT: root,
      DS_REQUIRE_COMPONENT_MAPPINGS: strict ? "true" : "false",
    },
  });
}

test("accepts a verified portal component mapping", () => {
  const root = makeFixture();
  writeMapping(root, validMapping());

  const result = run(root);
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /"releaseEligible": true/);
});

test("rejects a round-number placeholder node ID", () => {
  const root = makeFixture();
  const mapping = validMapping();
  mapping.components[0].nodeId = "1:100";
  writeMapping(root, mapping);

  const result = run(root);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /placeholder nodeId/);
});

test("rejects duplicate component keys and node IDs", () => {
  const root = makeFixture();
  const mapping = validMapping();
  mapping.components.push({
    ...mapping.components[0],
    name: "button-copy",
    contractPath: "portals/agency/components/button-copy",
  });
  writeMapping(root, mapping);

  const result = run(root);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /duplicate componentKey/);
  assert.match(result.stderr, /duplicate nodeId/);
});

test("rejects a cross-portal semantic dependency", () => {
  const root = makeFixture();
  const mapping = validMapping();
  mapping.components[0].semanticDependencies = [
    "portals/caregiver/semantics/action",
  ];
  writeMapping(root, mapping);

  const result = run(root);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /cross-portal or invalid semantic dependency/);
});

test("requires a mapping for a stable portal", () => {
  const root = makeFixture("stable");

  const result = run(root);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /component mapping required for stable/);
});
