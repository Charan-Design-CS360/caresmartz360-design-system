/**
 * figma-sync.mjs
 * CareSmartz360 Design System — Figma <-> GitHub Sync Pipeline
 *
 * Processes Figma REST API export data and reconciles it against
 * on-disk design-system contracts. Detects drift (name, description,
 * property changes), auto-bumps patch versions, and writes sync
 * metadata so CI can surface stale components.
 *
 * Zero external dependencies — Node.js built-ins only (fs, path).
 */

import fs from "node:fs";
import path from "node:path";

// ── CLI argument parsing ────────────────────────────────────────────
const DEFAULTS = { scope: "all", portal: "agency", dryRun: false };

function parseArgs(argv) {
  const args = { ...DEFAULTS };
  const raw = argv.slice(2);
  for (let i = 0; i < raw.length; i++) {
    switch (raw[i]) {
      case "--figma-components": args.figmaComponents = raw[++i]; break;
      case "--figma-styles":     args.figmaStyles     = raw[++i]; break;
      case "--figma-nodes":      args.figmaNodes      = raw[++i]; break;
      case "--scope":            args.scope            = raw[++i]; break;
      case "--component":        args.component        = raw[++i]; break;
      case "--portal":           args.portal           = raw[++i]; break;
      case "--dry-run":          args.dryRun           = true;     break;
      default:
        console.error(`Unknown argument: ${raw[i]}`);
        process.exit(1);
    }
  }
  return args;
}

// ── Helpers ─────────────────────────────────────────────────────────

function readJSON(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch (err) {
    console.error(`  [error] Cannot read ${filePath}: ${err.message}`);
    return null;
  }
}

function writeJSON(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n", "utf-8");
}

function bumpPatch(version) {
  const parts = String(version || "0.0.0").split(".");
  parts[2] = String(Number(parts[2] || 0) + 1);
  return parts.join(".");
}

function timestamp() {
  return new Date().toISOString();
}

// ── Index builder ───────────────────────────────────────────────────

function indexByComponentKey(figmaComponents) {
  const index = new Map();
  const entries = Array.isArray(figmaComponents)
    ? figmaComponents
    : Object.values(figmaComponents || {});
  for (const comp of entries) {
    if (comp.key) index.set(comp.key, comp);
  }
  return index;
}

// ── Component sync ──────────────────────────────────────────────────

function syncComponents(args, componentIndex, stats) {
  const portalDir = path.resolve("portals", args.portal, "components");
  if (!fs.existsSync(portalDir)) {
    console.log(`  [skip] Portal components dir not found: ${portalDir}`);
    return;
  }

  const componentDirs = fs
    .readdirSync(portalDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  for (const dirName of componentDirs) {
    if (args.component && dirName !== args.component) continue;

    const contractPath = path.join(portalDir, dirName, `${dirName}.json`);
    const contract = readJSON(contractPath);
    if (!contract?.$meta?.componentKeys) {
      stats.skipped++;
      continue;
    }

    stats.checked++;
    const drifts = [];

    for (const entry of contract.$meta.componentKeys) {
      // CRITICAL: field is `nodeId`, NOT `figmaNodeId`.
      const { nodeId, componentKey } = entry;
      const figma = componentIndex.get(componentKey);

      if (!figma) {
        drifts.push({ nodeId, componentKey, reason: "key_not_found" });
        continue;
      }

      if (figma.name && figma.name !== dirName) {
        drifts.push({
          nodeId, componentKey, reason: "name_mismatch",
          expected: dirName, actual: figma.name,
        });
      }

      if (figma.description !== undefined &&
          figma.description !== (contract.$meta.description ?? "")) {
        drifts.push({
          nodeId, componentKey, reason: "description_changed",
          actual: figma.description,
        });
      }
    }

    if (drifts.length === 0) continue;

    stats.drifted++;
    console.log(`  [drift] ${dirName}: ${drifts.length} issue(s)`);
    for (const d of drifts) console.log(`          - ${d.reason} (${d.componentKey.slice(0, 8)}...)`);

    if (args.dryRun) continue;

    contract.$meta.contractVersion = bumpPatch(contract.$meta.contractVersion);
    contract.$meta.lastFigmaSync = timestamp();
    contract.$meta.syncLog = contract.$meta.syncLog || [];
    contract.$meta.syncLog.push({ ts: timestamp(), drifts });

    writeJSON(contractPath, contract);
    stats.updated++;
    console.log(`  [write] ${contractPath} -> v${contract.$meta.contractVersion}`);
  }
}

// ── Brand validation ────────────────────────────────────────────────

function syncBrand(componentIndex, stats) {
  const logoPath = path.resolve("shared", "brand", "logo.json");
  const logo = readJSON(logoPath);
  if (!logo) {
    console.log("  [skip] No brand logo.json found.");
    return;
  }

  stats.checked++;
  const keys = logo.$meta?.componentKeys || logo.componentKeys || [];
  const mismatches = [];

  for (const entry of keys) {
    // CRITICAL: field is `nodeId`, NOT `figmaNodeId`.
    const { nodeId, componentKey } = entry;
    if (!componentIndex.has(componentKey)) {
      mismatches.push({ nodeId, componentKey, reason: "key_not_found" });
    }
  }

  if (mismatches.length) {
    stats.drifted++;
    console.log(`  [brand] ${mismatches.length} key mismatch(es) in logo.json`);
    for (const m of mismatches) {
      console.log(`          - ${m.reason}: ${m.componentKey.slice(0, 8)}... (nodeId: ${m.nodeId})`);
    }
  }
}

// ── Summary ─────────────────────────────────────────────────────────

function printSummary(stats) {
  console.log("\n┌──────────────────────────────────┐");
  console.log("│  Figma Sync Summary              │");
  console.log("├──────────────┬───────────────────┤");
  console.log(`│ Checked      │ ${String(stats.checked).padStart(17)} │`);
  console.log(`│ Skipped      │ ${String(stats.skipped).padStart(17)} │`);
  console.log(`│ Drifted      │ ${String(stats.drifted).padStart(17)} │`);
  console.log(`│ Updated      │ ${String(stats.updated).padStart(17)} │`);
  console.log("└──────────────┴───────────────────┘");
}

// ── Main ────────────────────────────────────────────────────────────

function main() {
  const args = parseArgs(process.argv);
  console.log(`figma-sync | scope=${args.scope} portal=${args.portal} dry-run=${args.dryRun}`);

  // Uses field `nodeId` throughout — NOT `figmaNodeId`.
  // Repo-side path fix 2026-09-16: the mapping lives under portals/, not at repo root
  const mapping = readJSON(path.resolve("portals/agency/components/component-mapping.json"));
  const mappingIndex = new Map();
  if (mapping?.components) {
    for (const c of mapping.components) {
      if (c.componentKey) mappingIndex.set(c.componentKey, c);
    }
  }

  let figmaComponentIndex = new Map();
  if (args.figmaComponents) {
    const raw = readJSON(args.figmaComponents);
    if (raw) {
      const payload = raw?.meta?.components ?? raw;
      figmaComponentIndex = indexByComponentKey(payload);
      console.log(`  Loaded ${figmaComponentIndex.size} Figma component(s).`);
    }
  }

  const stats = { checked: 0, skipped: 0, drifted: 0, updated: 0 };

  try {
    if (args.scope === "components" || args.scope === "all") {
      console.log("\n── Components ─────────────────────");
      syncComponents(args, figmaComponentIndex, stats);
    }
    if (args.scope === "brand" || args.scope === "all") {
      console.log("\n── Brand ──────────────────────────");
      syncBrand(figmaComponentIndex, stats);
    }
    if (args.scope === "tokens" || args.scope === "all") {
      console.log("\n── Tokens ─────────────────────────");
      console.log("  [info] Token sync is a placeholder — extend as needed.");
    }
  } catch (err) {
    console.error(`\n[fatal] ${err.message}`);
    printSummary(stats);
    process.exit(1);
  }

  printSummary(stats);
  process.exit(0);
}

main();
