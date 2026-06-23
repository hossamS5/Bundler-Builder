import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const currentDir = dirname(fileURLToPath(import.meta.url));

// server/src/lib -> server
export const serverRoot = resolve(currentDir, "..", "..");

export const dataDir = resolve(serverRoot, "data");
export const publicDir = resolve(serverRoot, "public");
