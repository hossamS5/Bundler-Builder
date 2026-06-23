import { createContext, useContext } from "react";

import type { BundleCatalog } from "@/types";

export const CatalogContext = createContext<BundleCatalog | null>(null);

export function useCatalog(): BundleCatalog {
  const catalog = useContext(CatalogContext);

  if (!catalog) {
    throw new Error("useCatalog must be used within a CatalogProvider");
  }

  return catalog;
}
