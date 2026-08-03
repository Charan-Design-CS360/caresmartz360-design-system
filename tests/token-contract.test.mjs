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
  "audit-token-contract.mjs",
);

function fixture(document, claimedTotal = 1) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "caresmartz-token-audit-"));
  fs.mkdirSync(path.join(root, "config"), { recursive: true });
  fs.mkdirSync(path.join(root, "tokens"), { recursive: true });
  fs.writeFileSync(
    path.join(root, "tokens", "tokens.json"),
    JSON.stringify(document, null, 2),
  );
  fs.writeFileSync(
    path.join(root, "config", "token-sources.json"),
    JSON.stringify(
      {
        sources: [
          {
            id: "test",
            portal: "agency",
            file: "tokens/tokens.json",
            roots: ["tokens"],
            claimedTotal,
          },
        ],
      },
      null,
      2,
    ),
  );
  return root;
}

function run(root, strict = false) {
  return spawnSync(process.execPath, [auditScript], {
    cwd: repositoryRoot,
    encoding: "utf8",
    env: {
      ...process.env,
      DS_REPOSITORY_ROOT: root,
      DS_REQUIRE_DTCG_TOKENS: strict ? "true" : "false",
    },
  });
}

test("accepts a count-matched DTCG token source in strict mode", () => {
  const root = fixture({
    tokens: {
      action: {
        primary: {
          $type: "color",
          $value: "#0077ff",
        },
      },
    },
  });

  const result = run(root, true);
  assert.equal(result.status, 0, result.stderr);
});

test("reports legacy definitions in audit mode", () => {
  const root = fixture({
    tokens: {
      action: {
        primary: {
          $type: "color",
          light: { value: "#0077ff", alias: "Brandblue-600" },
        },
      },
    },
  });

  const result = run(root);
  assert.equal(result.status, 0, result.stderr);
  assert.equal(
    `${result.stdout}\n${result.stderr}`.includes(
      "definitions do not use DTCG",
    ),
    true,
  );
});

test("rejects legacy definitions in strict mode", () => {
  const root = fixture({
    tokens: {
      action: {
        primary: {
          $type: "color",
          light: { value: "#0077ff", alias: "-" },
        },
      },
    },
  });

  const result = run(root, true);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /placeholder aliases remain/);
});

test("rejects claimed-versus-actual count drift", () => {
  const root = fixture(
    {
      tokens: {
        first: { $type: "color", $value: "#000000" },
      },
    },
    2,
  );

  const result = run(root, true);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /claimed 2, found 1 definitions/);
});

test("rejects DTCG alias cycles", () => {
  const root = fixture(
    {
      tokens: {
        first: { $type: "color", $value: "{tokens.second}" },
        second: { $type: "color", $value: "{tokens.first}" },
      },
    },
    2,
  );

  const result = run(root, true);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /alias cycles found/);
});
