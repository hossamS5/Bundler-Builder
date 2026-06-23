import type { BundleCatalog, Product } from "@/types";

/**
 * Catalog access helpers.
 *
 * The catalog is now loaded from the backend at runtime, so these are pure
 * functions that operate on a `BundleCatalog` passed in by the caller — there
 * is no module-level singleton anymore.
 */

export function getProductById(
  catalog: BundleCatalog,
  productId: string,
): Product | undefined {
  return catalog.products.find((product) => product.id === productId);
}

export function getProductsForStep(
  catalog: BundleCatalog,
  stepIndex: number,
): Product[] {
  const step = catalog.steps[stepIndex];

  if (!step) {
    return [];
  }

  return step.productIds
    .map((productId) => getProductById(catalog, productId))
    .filter((product): product is Product => product !== undefined);
}

export function getStepCount(catalog: BundleCatalog): number {
  return catalog.steps.length;
}
