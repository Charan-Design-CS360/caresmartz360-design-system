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
const auditScript = path.join(repositoryRoot, "scripts", "audit-layer-4.mjs");

function makeFixture(status = "active-audit") {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "caresmartz-layer4-"));
  fs.mkdirSync(path.join(root, "config"), { recursive: true });
  fs.mkdirSync(path.join(root, "portals", "agency"), { recursive: true });
  fs.writeFileSync(
    path.join(root, "config", "layer-4-sources.json"),
    JSON.stringify(
      {
        fileName: "layer-4-index.json",
        requiredForStatuses: ["pilot", "stable"],
        stableMinimumFlows: 2,
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

function validItem(maturity = "reviewed") {
  return {
    id: "search-filter-results",
    name: "Search Filter Results",
    owner: "Design System",
    maturity,
    figmaKey: "a".repeat(40),
    nodeId: "100:200",
    userGoal: "Find the correct record efficiently.",
    whenToUse: ["A user needs to narrow a record set."],
    whenNotToUse: ["The data set has fewer than five static items."],
    componentDependencies: [
      "portals/agency/components/search",
      "portals/agency/components/filter",
    ],
    semanticDependencies: ["portals/agency/semantics/surface"],
    states: ["default", "loading", "empty", "error", "results"],
    responsiveBehavior: "Collapses filters into a drawer on narrow screens.",
    contentRules: ["Use concrete filter labels."],
    accessibility: {
      keyboard: "All controls follow logical tab order.",
      screenReader: "Result counts are announced.",
      focus: "Focus returns to the invoking filter control.",
      touch: "Touch targets meet the portal minimum.",
    },
    successSignal: "Users reach a target record without clearing all filters.",
    evidence: {
      jiraIssue: "C360-44574",
      snapshotRef: "snapshots/agency/figma-snapshot.json@abc123",
      usedInFlows: [],
      singleFlowException: null,
    },
  };
}

function validIndex(item = validItem()) {
  return {
    schemaVersion: "1.0.0",
    portal: "agency",
    figmaFileKey: "agency-file",
    patterns: [item],
    templates: [],
  };
}

function writeIndex(root, document) {
  fs.writeFileSync(
    path.join(root, "portals", "agency", "layer-4-index.json"),
    JSON.stringify(document, null, 2),
  );
}

function run(root, strict = true) {
  return spawnSync(process.execPath, [auditScript], {
    cwd: repositoryRoot,
    encoding: "utf8",
    env: {
      ...process.env,
      DS_REPOSITORY_ROOT: root,
      DS_REQUIRE_LAYER_4: strict ? "true" : "false",
    },
  });
}

test("accepts a complete reviewed pattern contract", () => {
  const root = makeFixture();
  writeIndex(root, validIndex());

  const result = run(root);
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /"releaseEligible": true/);
});

test("rejects a cross-portal component dependency", () => {
  const root = makeFixture();
  const item = validItem();
  item.componentDependencies = ["portals/caregiver/components/search"];
  writeIndex(root, validIndex(item));

  const result = run(root);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /cross-portal dependency/);
});

test("rejects missing accessibility behavior", () => {
  const root = makeFixture();
  const item = validItem();
  item.accessibility.keyboard = "";
  writeIndex(root, validIndex(item));

  const result = run(root);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /accessibility.keyboard required/);
});

test("requires one real flow before Pilot", () => {
  const root = makeFixture();
  const item = validItem("pilot");
  writeIndex(root, validIndex(item));

  const result = run(root);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Pilot requires at least one real flow/);
});

test("requires two flows or a Jira exception before Stable", () => {
  const root = makeFixture();
  const item = validItem("stable");
  item.evidence.usedInFlows = ["Agency scheduling"];
  writeIndex(root, validIndex(item));

  const result = run(root);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Stable requires 2 flows or a Jira exception/);
});

test("accepts Stable with two real flows", () => {
  const root = makeFixture();
  const item = validItem("stable");
  item.evidence.usedInFlows = ["Agency scheduling", "Agency client list"];
  writeIndex(root, validIndex(item));

  const result = run(root);
  assert.equal(result.status, 0, result.stderr);
});

test("requires a Layer-4 index for a stable portal", () => {
  const root = makeFixture("stable");

  const result = run(root);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Layer-4 index required for stable/);
});
