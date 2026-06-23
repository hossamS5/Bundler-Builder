import { useQuery } from "@tanstack/react-query";

import { fetchCatalog } from "@/api";

export const catalogQueryKey = ["catalog"] as const;

/**
 * Loads the bundle catalog from the backend via React Query (server-state
 * cache, retries, and refetch handled centrally).
 */
export function useCatalogQuery() {
  return useQuery({
    queryKey: catalogQueryKey,
    queryFn: ({ signal }) => fetchCatalog(signal),
    staleTime: 5 * 60 * 1000,
  });
}
