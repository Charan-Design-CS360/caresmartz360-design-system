import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceRoot = path.resolve(
  process.env.DS_VARIABLE_SOURCE_DIR ?? "/Users/netsmartz/Documents/Variables",
);

const bundles = [
  {
    authority: "shared-primitives",
    archive: "Primitives.zip",
    destination: "shared/primitives/tokens",
    files: ["Mode 1.tokens.json"],
  },
  {
    authority: "agency-semantics",
    archive: "Agency/Color Modes.zip",
    destination: "portals/agency/semantics/color-modes",
    files: [
      "Light Mode (Default).tokens.json",
      "Dark Theme.tokens.json",
      "High Contrast.tokens.json",
      "Warm Dark.tokens.json",
      "HC Light.tokens.json",
    ],
  },
  {
    authority: "agency-semantics",
    archive: "Agency/Density Modes.zip",
    destination: "portals/agency/semantics/density-modes",
    files: ["Mode 1.tokens.json"],
  },
  {
    authority: "agency-semantics",
    archive: "Agency/General.zip",
    destination: "portals/agency/semantics/general",
    files: ["Mode 1.tokens.json"],
  },
  {
    authority: "caregiver-semantics",
    archive: "Caregiver/Color Theme.zip",
    destination: "portals/caregiver/semantics/color-theme",
    files: [
      "Light Mode (Default).tokens.json",
      "Soothing Dark.tokens.json",
      "High Contrast.tokens.json",
    ],
  },
  {
    authority: "caregiver-semantics",
    archive: "Caregiver/Density Modes.zip",
    destination: "portals/caregiver/semantics/density-modes",
    files: ["Default.tokens.json", "Large.tokens.json", "Small.tokens.json"],
  },
  {
    authority: "caregiver-semantics",
    archive: "Caregiver/General.zip",
    destination: "portals/caregiver/semantics/general",
    files: ["Mode 1.tokens.json"],
  },
];

function sha256(content) {
  return crypto.createHash("sha256").update(content).digest("hex");
}

function tokenCount(document) {
  let count = 0;
  function visit(value) {
    if (!value || typeof value !== "object" || Array.isArray(value)) return;
    if (Object.hasOwn(value, "$value")) {
      count += 1;
      return;
    }
    for (const [key, child] of Object.entries(value)) {
      if (!key.startsWith("$")) visit(child);
    }
  }
  visit(document);
  return count;
}

if (!fs.existsSync(sourceRoot)) {
  throw new Error(`Variable authority folder does not exist: ${sourceRoot}`);
}

const artifacts = [];
for (const bundle of bundles) {
  const archivePath = path.join(sourceRoot, bundle.archive);
  if (!fs.existsSync(archivePath)) throw new Error(`Missing export: ${archivePath}`);
  const archiveBytes = fs.readFileSync(archivePath);

  for (const file of bundle.files) {
    const bytes = execFileSync("unzip", ["-p", archivePath, file], {
      encoding: null,
      maxBuffer: 10 * 1024 * 1024,
    });
    const document = JSON.parse(bytes.toString("utf8"));
    const relativePath = path.posix.join(bundle.destination, file);
    const destinationPath = path.join(repositoryRoot, relativePath);
    fs.mkdirSync(path.dirname(destinationPath), { recursive: true });
    fs.writeFileSync(destinationPath, bytes);
    artifacts.push({
      authority: bundle.authority,
      sourceArchive: bundle.archive,
      sourceArchiveSha256: sha256(archiveBytes),
      sourceMember: file,
      repositoryPath: relativePath,
      sha256: sha256(bytes),
      tokenDefinitions: tokenCount(document),
    });
  }
}

const manifest = {
  schemaVersion: 1,
  authority: {
    input: "Owner-maintained exports downloaded from Figma",
    sourceFolder: "/Users/netsmartz/Documents/Variables",
    comparisonRule: "Repository variable files must byte-match the listed source members.",
    figmaQueryRequired: false,
  },
  logicalTotals: {
    sharedPrimitives: 264,
    agencySemantics: 251,
    caregiverSemantics: 171,
  },
  artifacts,
};

fs.writeFileSync(
  path.join(repositoryRoot, "config", "variable-export-manifest.json"),
  `${JSON.stringify(manifest, null, 2)}\n`,
);

console.log(JSON.stringify(manifest, null, 2));
