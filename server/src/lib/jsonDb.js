import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

import { dataDir } from "./paths.js";

/**
 * Minimal JSON-file "database".
 *
 * Reads/writes a JSON document from the `data/` directory. This is a stand-in
 * until a real database is connected — the service layer depends only on these
 * functions, so swapping the implementation later requires no API changes.
 */

function resolveCollectionPath(collection) {
  return resolve(dataDir, `${collection}.json`);
}

export async function readJson(collection) {
  const filePath = resolveCollectionPath(collection);
  const raw = await readFile(filePath, "utf-8");
  return JSON.parse(raw);
}

export async function writeJson(collection, data) {
  const filePath = resolveCollectionPath(collection);
  await writeFile(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf-8");
  return data;
}
