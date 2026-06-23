import type { BundleCatalog } from "@/types";

import { apiGet } from "./client";
import { bundleCatalogSchema } from "./schemas";

/**
 * Fetches the bundle catalog and validates it at runtime. The parsed result is
 * structurally guaranteed to satisfy `BundleCatalog`.
 */
export async function fetchCatalog(
  signal?: AbortSignal,
): Promise<BundleCatalog> {
  const data = await apiGet<unknown>("/catalog", signal);
  return bundleCatalogSchema.parse(data) as BundleCatalog;
}
