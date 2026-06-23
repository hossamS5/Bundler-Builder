import { useEffect, type ReactNode } from "react";

import { useBundleStore } from "@/store";
import type { BundleCatalog } from "@/types";

import { CatalogContext } from "./catalogContext";

interface CatalogProviderProps {
  catalog: BundleCatalog;
  children: ReactNode;
}

/**
 * Makes the loaded catalog available to the whole feature tree and hydrates the
 * store with it (sets step count + reconciles persisted selections). Rendered
 * only once the catalog has successfully loaded, so `useCatalog` is always safe.
 */
export function CatalogProvider({ catalog, children }: CatalogProviderProps) {
  const hydrateFromCatalog = useBundleStore((state) => state.hydrateFromCatalog);

  useEffect(() => {
    hydrateFromCatalog(catalog);
  }, [catalog, hydrateFromCatalog]);

  return (
    <CatalogContext.Provider value={catalog}>
      {children}
    </CatalogContext.Provider>
  );
}
