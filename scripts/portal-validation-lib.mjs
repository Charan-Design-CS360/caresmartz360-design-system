import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const repositoryRoot = process.env.DS_REPOSITORY_ROOT
  ? path.resolve(process.env.DS_REPOSITORY_ROOT)
  : path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

export const portalRoot = path.join(repositoryRoot, "portals");

export function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

export function listPortalManifests() {
  return fs
    .readdirSync(portalRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(portalRoot, entry.name, "portal-manifest.json"))
    .filter((filePath) => fs.existsSync(filePath))
    .sort();
}

export function relative(filePath) {
  return path.relative(repositoryRoot, filePath);
}

export function walk(directory) {
  if (!fs.existsSync(directory)) return [];

  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(entryPath) : [entryPath];
  });
}
