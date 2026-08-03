import fs from "node:fs";
import path from "node:path";
import {
  readJson,
  repositoryRoot,
} from "./portal-validation-lib.mjs";

const strict = process.env.DS_REQUIRE_DTCG_TOKENS === "true";
const configPath = path.join(repositoryRoot, "config", "token-sources.json");
const config = readJson(configPath);
const reports = [];
const strictErrors = [];

function getPath(document, dottedPath) {
  if (dottedPath === "$document") return document;
  return dottedPath
    .split(".")
    .reduce((value, segment) => value?.[segment], document);
}

function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function isModeValue(value) {
  return (
    isObject(value) &&
    Object.hasOwn(value, "value") &&
    Object.keys(value).every((key) => ["value", "alias"].includes(key))
  );
}

function isLegacyLeaf(value, modeNames) {
  if (!isObject(value) || Object.hasOwn(value, "$value")) return false;
  if (isModeValue(value)) return true;
  if (Object.hasOwn(value, "$type")) return true;

  const children = Object.values(value);
  if (children.length === 0) return false;

  return (
    children.every((child) => !isObject(child)) ||
    (children.every((child) => isModeValue(child)) &&
      Object.keys(value).every((key) => modeNames.has(key)))
  );
}

function inspect(root, pathSegments = [], state) {
  if (!isObject(root)) return;

  if (Object.hasOwn(root, "$value")) {
    state.dtcgTokens += 1;
    state.definitionPaths.push(pathSegments.join("."));
    const value = root.$value;
    if (typeof value === "string") {
      const match = value.match(/^\{(.+)\}$/);
      if (match) state.aliases.set(pathSegments.join("."), match[1]);
    }
    return;
  }

  if (isLegacyLeaf(root, state.modeNames)) {
    state.legacyDefinitions += 1;
    state.definitionPaths.push(pathSegments.join("."));

    if (isModeValue(root)) {
      if (root.alias === "-") state.placeholderAliases += 1;
      if (!root.alias) state.rawModeValues += 1;
    }

    for (const child of Object.values(root)) {
      if (isModeValue(child)) {
        if (child.alias === "-") state.placeholderAliases += 1;
        if (!child.alias) state.rawModeValues += 1;
      }
    }
    return;
  }

  for (const [key, value] of Object.entries(root)) {
    if (key.startsWith("$")) continue;
    inspect(value, [...pathSegments, key], state);
  }
}

function findCycles(aliases) {
  const cycles = [];

  for (const start of aliases.keys()) {
    const seen = new Map();
    let current = start;
    const chain = [];

    while (aliases.has(current)) {
      if (seen.has(current)) {
        cycles.push([...chain.slice(seen.get(current)), current]);
        break;
      }
      seen.set(current, chain.length);
      chain.push(current);
      current = aliases.get(current);
    }
  }

  return cycles;
}

for (const source of config.sources) {
  const filePath = path.join(repositoryRoot, source.file);
  if (!fs.existsSync(filePath)) {
    const report = {
      id: source.id,
      portal: source.portal,
      file: source.file,
      status: "missing",
    };
    reports.push(report);
    strictErrors.push(`${source.id}: source file is missing.`);
    continue;
  }

  const document = readJson(filePath);
  const state = {
    dtcgTokens: 0,
    legacyDefinitions: 0,
    placeholderAliases: 0,
    rawModeValues: 0,
    aliases: new Map(),
    definitionPaths: [],
    modeNames: new Set(source.modeNames ?? []),
  };

  for (const rootPath of source.roots) {
    const root = getPath(document, rootPath);
    if (root === undefined) {
      strictErrors.push(`${source.id}: configured root "${rootPath}" is missing.`);
      continue;
    }
    inspect(root, rootPath === "$document" ? [] : [rootPath], state);
  }

  const actualDefinitions = state.dtcgTokens + state.legacyDefinitions;
  const claimedTotal =
    source.claimedTotal ??
    getPath(document, source.claimedTotalPath ?? "") ??
    null;
  const countDelta =
    Number.isInteger(claimedTotal) ? actualDefinitions - claimedTotal : null;
  const cycles = findCycles(state.aliases);

  const report = {
    id: source.id,
    portal: source.portal,
    file: source.file,
    status: "audited",
    claimedTotal,
    actualDefinitions,
    countDelta,
    dtcgTokens: state.dtcgTokens,
    legacyDefinitions: state.legacyDefinitions,
    placeholderAliases: state.placeholderAliases,
    rawModeValues: state.rawModeValues,
    aliasCycles: cycles,
  };
  reports.push(report);

  if (state.legacyDefinitions > 0) {
    strictErrors.push(
      `${source.id}: ${state.legacyDefinitions} definitions do not use DTCG $value leaves.`,
    );
  }
  if (countDelta !== null && countDelta !== 0) {
    strictErrors.push(
      `${source.id}: claimed ${claimedTotal}, found ${actualDefinitions} definitions.`,
    );
  }
  if (state.placeholderAliases > 0) {
    strictErrors.push(
      `${source.id}: ${state.placeholderAliases} placeholder aliases remain.`,
    );
  }
  if (cycles.length > 0) {
    strictErrors.push(`${source.id}: ${cycles.length} alias cycles found.`);
  }
}

console.log(JSON.stringify({ strict, reports }, null, 2));

if (strict && strictErrors.length > 0) {
  console.error(strictErrors.join("\n"));
  process.exit(1);
}

for (const error of strictErrors) console.warn(`NOTICE: ${error}`);
